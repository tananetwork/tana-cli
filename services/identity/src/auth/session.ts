/**
 * Session Management
 *
 * Handles creation, retrieval, and updates of authentication sessions
 */

import { db, authSessions } from '../db'
import { eq, and, gt, lt } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'
import { randomBytes } from 'crypto'

// Custom nanoid for session IDs (readable, URL-safe)
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16)

// Session configuration
const SESSION_EXPIRY_MS = 10 * 60 * 1000 // 10 minutes (extended for better UX)
const SESSION_TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Generate a random challenge string (32 bytes = 64 hex chars)
 */
export function generateChallenge(): string {
  return randomBytes(32).toString('hex')
}

/**
 * Generate a session token (used after approval)
 * This is a simple random token approach. For JWT, use jsonwebtoken or jose library.
 */
export function generateSessionToken(): string {
  return randomBytes(32).toString('hex')
}

/**
 * Create a new authentication session
 */
export async function createSession(options: {
  returnUrl?: string
  appName?: string
  appIcon?: string
}) {
  const sessionId = 'sess_' + nanoid()
  const challenge = generateChallenge()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + SESSION_EXPIRY_MS)

  const [session] = await db.insert(authSessions).values({
    id: sessionId,
    challenge,
    status: 'waiting',
    returnUrl: options.returnUrl || 'https://tana.network',
    appName: options.appName || null,
    appIcon: options.appIcon || null,
    createdAt: now,
    expiresAt,
  }).returning()

  return session
}

/**
 * Get session by ID
 */
export async function getSession(sessionId: string) {
  const [session] = await db
    .select()
    .from(authSessions)
    .where(eq(authSessions.id, sessionId))
    .limit(1)

  return session || null
}

/**
 * Get session by challenge (for mobile app lookup)
 */
export async function getSessionByChallenge(challenge: string) {
  const [session] = await db
    .select()
    .from(authSessions)
    .where(eq(authSessions.challenge, challenge))
    .limit(1)

  return session || null
}

/**
 * Get session by token (for API authentication)
 */
export async function getSessionByToken(token: string) {
  const [session] = await db
    .select()
    .from(authSessions)
    .where(eq(authSessions.sessionToken, token))
    .limit(1)

  return session || null
}

/**
 * Check if session is expired
 */
export function isSessionExpired(session: { expiresAt: Date }): boolean {
  return new Date() > session.expiresAt
}

/**
 * Check if session is valid for approval
 */
export function canApproveSession(session: {
  status: string
  expiresAt: Date
}): boolean {
  if (isSessionExpired(session)) {
    return false
  }

  // Can only approve sessions that are waiting or scanned
  return session.status === 'waiting' || session.status === 'scanned'
}

/**
 * Mark session as scanned (mobile app opened the QR code)
 */
export async function markSessionScanned(sessionId: string) {
  const [updated] = await db
    .update(authSessions)
    .set({
      status: 'scanned',
      scannedAt: new Date(),
    })
    .where(eq(authSessions.id, sessionId))
    .returning()

  return updated || null
}

/**
 * Approve session with user credentials
 */
export async function approveSession(
  sessionId: string,
  userData: {
    userId: string
    username: string
    publicKey: string
  }
) {
  const sessionToken = generateSessionToken()
  const now = new Date()

  const [updated] = await db
    .update(authSessions)
    .set({
      status: 'approved',
      userId: userData.userId,
      username: userData.username,
      publicKey: userData.publicKey,
      sessionToken,
      approvedAt: now,
    })
    .where(eq(authSessions.id, sessionId))
    .returning()

  return updated || null
}

/**
 * Reject session
 */
export async function rejectSession(sessionId: string, reason?: string) {
  const [updated] = await db
    .update(authSessions)
    .set({
      status: 'rejected',
    })
    .where(eq(authSessions.id, sessionId))
    .returning()

  return updated || null
}

/**
 * Mark session as expired (cleanup job)
 */
export async function expireSession(sessionId: string) {
  const [updated] = await db
    .update(authSessions)
    .set({
      status: 'expired',
    })
    .where(eq(authSessions.id, sessionId))
    .returning()

  return updated || null
}

/**
 * Clean up expired sessions (batch operation)
 * Should be run periodically (e.g., every minute)
 */
export async function cleanupExpiredSessions() {
  const now = new Date() // Pass Date object, not string

  const expired = await db
    .update(authSessions)
    .set({ status: 'expired' })
    .where(
      and(
        lt(authSessions.expiresAt, now),
        eq(authSessions.status, 'waiting')
      )
    )
    .returning()

  return expired.length
}

/**
 * Verify session token is valid
 */
export async function verifySessionToken(token: string) {
  const session = await getSessionByToken(token)

  if (!session) {
    return { valid: false, reason: 'Session not found' }
  }

  if (session.status !== 'approved') {
    return { valid: false, reason: 'Session not approved' }
  }

  // Check if session token is expired (24 hours from approval)
  if (session.approvedAt) {
    const tokenExpiresAt = new Date(
      session.approvedAt.getTime() + SESSION_TOKEN_EXPIRY_MS
    )

    if (new Date() > tokenExpiresAt) {
      return { valid: false, reason: 'Session token expired' }
    }
  }

  return {
    valid: true,
    userId: session.userId,
    username: session.username,
    publicKey: session.publicKey,
    expiresAt: session.approvedAt
      ? new Date(session.approvedAt.getTime() + SESSION_TOKEN_EXPIRY_MS)
      : null,
  }
}
