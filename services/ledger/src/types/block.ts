/**
 * Block Types
 *
 * Type definitions for self-contained blocks
 */

// ============================================================================
// TRANSACTION DATA (stored in block)
// ============================================================================

export interface BlockTransaction {
  id: string
  from: string
  to: string
  amount: string | null
  currencyCode: string | null
  type: 'transfer' | 'deposit' | 'withdraw' | 'contract_call' | 'user_creation' | 'contract_deployment' | 'role_change'
  signature: string
  message: string
  nonce: number
  timestamp: number
  contractId?: string | null
  contractInput?: any
  metadata?: any
}

// ============================================================================
// STATE CHANGES (before/after snapshots)
// ============================================================================

export interface BalanceChange {
  type: 'balance_update'
  userId: string
  currencyCode: string
  before: string | null  // null if balance didn't exist
  after: string
}

export interface UserCreation {
  type: 'user_created'
  userId: string
  username: string
  publicKey: string
  role: 'sovereign' | 'staff' | 'user'
}

export interface ContractDeployment {
  type: 'contract_deployed'
  contractId: string
  ownerId: string
  name: string
  codeHash: string
}

export interface RoleChange {
  type: 'role_changed'
  userId: string
  before: 'sovereign' | 'staff' | 'user'
  after: 'sovereign' | 'staff' | 'user'
}

export type StateChange = BalanceChange | UserCreation | ContractDeployment | RoleChange

// ============================================================================
// CONTENT REFERENCES (for large data)
// ============================================================================

export interface ContentReference {
  type: 'kv_data' | 'contract_code' | 'file_upload'
  hash: string      // SHA256 of content
  size: number      // Size in bytes
  owner: string     // User ID who owns this content
  metadata?: {
    filename?: string
    mimeType?: string
    contractName?: string
    key?: string
  }
}

// ============================================================================
// BLOCK DATA
// ============================================================================

export interface BlockData {
  // Identification
  height: number
  hash: string
  previousHash: string

  // Metadata
  timestamp: Date
  producer: string

  // Full transaction data
  transactions: BlockTransaction[]

  // State changes
  stateChanges: StateChange[]

  // Content references
  contentRefs: ContentReference[]

  // Merkle commitments
  txRoot: string
  stateRoot: string

  // Execution
  txCount: number
  gasUsed: number
  gasLimit: number

  // Signature
  signature: string

  // Timestamps
  createdAt: Date
  finalizedAt: Date | null
}

// ============================================================================
// BLOCK VERIFICATION RESULT
// ============================================================================

export interface BlockVerificationResult {
  valid: boolean
  errors: string[]
  checks: {
    hashValid: boolean
    txRootValid: boolean
    stateRootValid: boolean
    signaturesValid: boolean
    producerSignatureValid: boolean
    stateChangesValid: boolean
  }
}
