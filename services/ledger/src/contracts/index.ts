/**
 * Smart Contract Service
 *
 * Handles contract deployment and management with security
 */

import { eq } from 'drizzle-orm'
import { db, contracts, transactions, users } from '../db'
import { randomUUID, createHash } from 'crypto'
import { verifyTransactionSignature } from '../utils/crypto'

const SYSTEM_ID = '00000000-0000-0000-0000-000000000000'

// Security: Maximum contract size (500KB)
const MAX_CONTRACT_SIZE = 500 * 1024

export interface DeployContractInput {
  ownerUsername: string
  name: string
  sourceCode: string
  codeHash: string

  // Extracted functions (pre-extracted by CLI)
  initCode?: string | null
  contractCode: string // Required
  getCode?: string | null
  postCode?: string | null

  // Function availability flags
  hasInit: boolean
  hasGet: boolean
  hasPost: boolean

  version?: string
  description?: string
  metadata?: Record<string, any>
  signature: string
  timestamp: number
  nonce: number
}

/**
 * Deploy a new smart contract (creates pending transaction)
 *
 * Security measures:
 * - Verifies Ed25519 signature
 * - Validates code hash
 * - Checks contract size limits
 * - Validates nonce sequence
 * - Checks timestamp freshness
 */
export async function deployContract(input: DeployContractInput) {
  // 1. Verify timestamp is recent (within 5 minutes)
  const now = Date.now()
  const timeDiff = Math.abs(now - input.timestamp)
  if (timeDiff > 5 * 60 * 1000) {
    throw new Error('Transaction timestamp is too old or too far in the future')
  }

  // 2. Security: Validate contract size
  const sourceSize = Buffer.byteLength(input.sourceCode, 'utf-8')
  if (sourceSize > MAX_CONTRACT_SIZE) {
    throw new Error(`Contract size ${sourceSize} bytes exceeds maximum ${MAX_CONTRACT_SIZE} bytes`)
  }

  // 3. Security: Verify code hash matches source code
  const calculatedHash = createHash('sha256').update(input.sourceCode).digest('hex')
  if (calculatedHash !== input.codeHash) {
    throw new Error('Code hash verification failed. Source code has been tampered with.')
  }

  // 4. Get owner user
  const owner = await db
    .select()
    .from(users)
    .where(eq(users.username, input.ownerUsername))
    .limit(1)

  if (!owner || owner.length === 0) {
    throw new Error(`User ${input.ownerUsername} not found`)
  }

  const ownerUser = owner[0]

  // 5. Verify nonce matches expected value
  const expectedNonce = ownerUser.nonce + 1
  if (input.nonce !== expectedNonce) {
    throw new Error(`Invalid nonce. Expected ${expectedNonce}, got ${input.nonce}`)
  }

  // 6. Create transaction data for signature verification
  const transactionData = {
    type: 'contract_deployment',
    from: ownerUser.id,
    to: SYSTEM_ID, // Will be replaced with actual contract ID
    timestamp: input.timestamp,
    nonce: input.nonce,
    contractInput: {
      name: input.name,
      sourceCode: input.sourceCode,
      codeHash: input.codeHash,
      // Extracted functions
      initCode: input.initCode,
      contractCode: input.contractCode,
      getCode: input.getCode,
      postCode: input.postCode,
      // Function availability
      hasInit: input.hasInit,
      hasGet: input.hasGet,
      hasPost: input.hasPost,
      version: input.version || '1.0.0',
      description: input.description,
      metadata: input.metadata,
      author: input.ownerUsername
    }
  }

  // 7. Security: Verify Ed25519 signature
  const isValidSignature = await verifyTransactionSignature(
    transactionData,
    ownerUser.publicKey,
    input.signature
  )

  if (!isValidSignature) {
    throw new Error('Invalid transaction signature. Signature verification failed.')
  }

  // 8. Check if contract name is unique for this owner (optional - can allow duplicates)
  const existing = await db
    .select()
    .from(contracts)
    .where(eq(contracts.name, input.name))
    .where(eq(contracts.ownerId, ownerUser.id))
    .limit(1)

  if (existing.length > 0) {
    throw new Error(`Contract "${input.name}" already exists for this owner`)
  }

  // 9. Generate contract ID upfront
  const contractId = randomUUID()

  // 10. Create contract_deployment transaction
  const [transaction] = await db
    .insert(transactions)
    .values({
      type: 'contract_deployment',
      from: ownerUser.id,
      to: contractId, // Contract ID
      amount: null,
      currencyCode: null,
      contractId,
      contractInput: {
        name: input.name,
        sourceCode: input.sourceCode,
        codeHash: input.codeHash,
        // Extracted functions
        initCode: input.initCode,
        contractCode: input.contractCode,
        getCode: input.getCode,
        postCode: input.postCode,
        // Function availability
        hasInit: input.hasInit,
        hasGet: input.hasGet,
        hasPost: input.hasPost,
        version: input.version || '1.0.0',
        description: input.description,
        metadata: input.metadata,
        author: input.ownerUsername
      },
      signature: input.signature,
      status: 'pending'
    })
    .returning()

  return {
    contractId,
    transactionId: transaction.id,
    status: 'pending',
    message: 'Contract deployment transaction created. Contract will be deployed when the next block is produced.',
    codeHash: input.codeHash,
    size: sourceSize
  }
}

/**
 * Get contract by ID
 */
export async function getContract(id: string) {
  const [contract] = await db
    .select()
    .from(contracts)
    .where(eq(contracts.id, id))
    .limit(1)

  return contract || null
}

/**
 * Get contracts by owner
 */
export async function getContractsByOwner(ownerId: string, limit = 50, offset = 0) {
  return await db
    .select()
    .from(contracts)
    .where(eq(contracts.ownerId, ownerId))
    .limit(limit)
    .offset(offset)
}

/**
 * List all contracts (paginated)
 */
export async function listContracts(limit = 50, offset = 0) {
  return await db
    .select()
    .from(contracts)
    .limit(limit)
    .offset(offset)
}

/**
 * Deactivate a contract
 */
export async function deactivateContract(id: string) {
  const [updated] = await db
    .update(contracts)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(contracts.id, id))
    .returning()

  return updated || null
}
