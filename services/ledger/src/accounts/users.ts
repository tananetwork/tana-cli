/**
 * User Account Service
 *
 * CRUD operations for user accounts
 */

import { eq } from 'drizzle-orm'
import { db, users, transactions } from '../db'
import { createHash, randomUUID } from 'crypto'
import { verifyUserCreationSignature } from '../utils/crypto'
import { queueTransaction } from '@tana/queue'

const SYSTEM_ID = '00000000-0000-0000-0000-000000000000'

export interface CreateUserInput {
  publicKey: string
  username: string
  displayName: string
  bio?: string
  avatarData?: string
  role?: 'sovereign' | 'staff' | 'user'
  signature: string // Ed25519 signature (required)
  timestamp: number // Unix timestamp in milliseconds
  nonce: number // Nonce for replay protection (0 for user creation)
}

export interface UpdateUserInput {
  displayName?: string
  bio?: string
  avatarData?: string
  landingPageId?: string
  role?: 'sovereign' | 'staff' | 'user'
}

/**
 * Create a new user account (transaction-based)
 *
 * This creates a pending user_creation transaction that will be
 * executed when the next block is produced.
 *
 * Returns the transaction ID and the pre-generated user ID.
 */
export async function createUser(input: CreateUserInput) {
  // 1. Validate username format (@alice)
  if (!input.username.startsWith('@')) {
    throw new Error('Username must start with @')
  }

  // 2. Verify timestamp is recent (within 5 minutes)
  const now = Date.now()
  const timeDiff = Math.abs(now - input.timestamp)
  if (timeDiff > 5 * 60 * 1000) {
    throw new Error('Transaction timestamp is too old or too far in the future')
  }

  // 3. Verify nonce is 0 for user creation
  if (input.nonce !== 0) {
    throw new Error('Nonce must be 0 for user creation transactions')
  }

  // 4. Verify signature
  const isValidSignature = await verifyUserCreationSignature(input)
  if (!isValidSignature) {
    throw new Error('Invalid transaction signature. Signature verification failed.')
  }

  // 5. Check if username already exists or is pending
  const existingUser = await getUserByUsername(input.username)
  if (existingUser) {
    throw new Error(`Username ${input.username} is already taken`)
  }

  // SOVEREIGN UNIQUENESS CHECK: Only allow ONE sovereign per blockchain
  if (input.role === 'sovereign') {
    // Check if a sovereign already exists
    const existingSovereigns = await getSovereigns()
    if (existingSovereigns.length > 0) {
      throw new Error(
        'A sovereign already exists on this blockchain. ' +
        'Only one sovereign is allowed. ' +
        `Current sovereign: ${existingSovereigns[0].username}`
      )
    }

    // NOTE: We don't check pending transactions in PostgreSQL anymore
    // Redis queue handles pending state, and duplicate sovereign checks
    // will be enforced at block production time
  }

  // NOTE: We don't check for pending transactions in PostgreSQL anymore
  // Redis queue is the source of truth for pending transactions
  // Duplicate username checks will be handled at block production time

  // Generate user ID upfront (will be used when block is produced)
  const userId = randomUUID()

  // Generate transaction ID
  const txId = randomUUID()

  // Use the client-provided signature (already verified above)
  const signature = input.signature

  // Queue user_creation transaction to Redis
  const streamId = await queueTransaction({
    txId,
    type: 'user_creation',
    from: SYSTEM_ID, // System creates users
    to: userId, // The new user's pre-generated ID
    signature,
    timestamp: input.timestamp,
    nonce: input.nonce,
    contractInput: {
      username: input.username,
      displayName: input.displayName,
      publicKey: input.publicKey,
      bio: input.bio,
      avatarData: input.avatarData,
      role: input.role || 'user', // Store role in transaction
    },
    payload: {
      userAgent: 'mobile-app',
      apiVersion: '1.0.0'
    }
  })

  console.log(`✓ Queued user_creation transaction: ${txId} (stream ID: ${streamId})`)

  return {
    transactionId: txId,
    userId,
    status: 'queued',
    message: 'User creation transaction queued. User will be created when the next block is produced.'
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1)
  return user || null
}

/**
 * Get user by username
 */
export async function getUserByUsername(username: string) {
  // Normalize username to always have @ prefix for database lookup
  const normalizedUsername = username.startsWith('@') ? username : `@${username}`
  const [user] = await db.select().from(users).where(eq(users.username, normalizedUsername)).limit(1)
  return user || null
}

/**
 * Get user by public key
 */
export async function getUserByPublicKey(publicKey: string) {
  const [user] = await db.select().from(users).where(eq(users.publicKey, publicKey)).limit(1)
  return user || null
}

/**
 * Update user
 */
export async function updateUser(id: string, input: UpdateUserInput) {
  const [updated] = await db
    .update(users)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning()

  return updated || null
}

/**
 * Delete user
 */
export async function deleteUser(id: string) {
  const [deleted] = await db.delete(users).where(eq(users.id, id)).returning()
  return deleted || null
}

/**
 * List all users (paginated)
 */
export async function listUsers(limit = 50, offset = 0) {
  return await db.select().from(users).limit(limit).offset(offset)
}

/**
 * Calculate state hash for user
 * This is a simplified version - in production would include all account state
 */
function calculateStateHash(data: Record<string, any>): string {
  const hash = createHash('sha256')
  hash.update(JSON.stringify(data))
  return hash.digest('hex')
}

// ============================================================================
// AUTHORIZATION HELPERS
// ============================================================================

/**
 * Role hierarchy for user roles
 * sovereign (3) > staff (2) > user (1)
 */
const USER_ROLE_HIERARCHY: Record<string, number> = {
  sovereign: 3,
  staff: 2,
  user: 1,
}

/**
 * Check if a user has a specific role or higher
 *
 * @param userId - User ID to check
 * @param requiredRole - Minimum role required
 * @returns true if user has required role or higher
 */
export async function hasUserRole(
  userId: string,
  requiredRole: 'sovereign' | 'staff' | 'user'
): Promise<boolean> {
  const user = await getUserById(userId)
  if (!user) return false

  const userRoleLevel = USER_ROLE_HIERARCHY[user.role] || 0
  const requiredRoleLevel = USER_ROLE_HIERARCHY[requiredRole] || 0

  return userRoleLevel >= requiredRoleLevel
}

/**
 * Check if a user is a sovereign
 */
export async function isSovereign(userId: string): Promise<boolean> {
  const user = await getUserById(userId)
  return user?.role === 'sovereign'
}

/**
 * Check if a user is staff or higher
 */
export async function isStaff(userId: string): Promise<boolean> {
  return await hasUserRole(userId, 'staff')
}

/**
 * Get all sovereign users
 */
export async function getSovereigns() {
  return await db.select().from(users).where(eq(users.role, 'sovereign'))
}

/**
 * Require sovereign role or throw error
 */
export async function requireSovereign(userId: string) {
  if (!(await isSovereign(userId))) {
    throw new Error('This operation requires sovereign privileges')
  }
}
