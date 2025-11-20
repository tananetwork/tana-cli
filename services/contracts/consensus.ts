/**
 * Consensus Service Contracts
 *
 * This file defines all interfaces for multi-validator consensus.
 * Agents 1, 2, 3 implement against these contracts.
 */

// ============================================================================
// Message Types (P2P WebSocket Messages)
// ============================================================================

export type ConsensusMessage =
  | BlockProposal
  | BlockVote
  | Heartbeat
  | SyncRequest
  | SyncResponse

export interface BlockProposal {
  type: 'BLOCK_PROPOSAL'
  block: {
    height: number
    hash: string
    previousHash: string
    timestamp: number
    transactions: any[]
    proposerId: string
  }
  proposerId: string
  signature: string
}

export interface BlockVote {
  type: 'BLOCK_VOTE'
  blockHash: string
  blockHeight: number
  validatorId: string
  approve: boolean  // true = approve, false = reject
  signature: string
  timestamp: number
}

export interface Heartbeat {
  type: 'HEARTBEAT'
  validatorId: string
  currentHeight: number
  timestamp: number
}

export interface SyncRequest {
  type: 'SYNC_REQUEST'
  fromHeight: number
  toHeight: number
  requesterId: string
}

export interface SyncResponse {
  type: 'SYNC_RESPONSE'
  blocks: Array<{
    height: number
    hash: string
    data: any
  }>
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface ValidatorConfig {
  id: string
  publicKey: string
  privateKey: string  // Encrypted in production
  wsPort: number
  wsUrl: string
  peers: Array<{
    id: string
    wsUrl: string
  }>
}

// ============================================================================
// Consensus Service Interface (Agent 1 implements)
// ============================================================================

export interface IConsensusService {
  /**
   * Propose a new block to the network
   * Only the leader for this height should call this
   */
  proposeBlock(block: any): Promise<void>

  /**
   * Handle incoming block proposal from peer
   */
  handleBlockProposal(proposal: BlockProposal): Promise<void>

  /**
   * Handle incoming vote from peer
   */
  handleBlockVote(vote: BlockVote): Promise<void>

  /**
   * Get current leader for given height
   */
  getLeaderForHeight(height: number): string

  /**
   * Check if this validator is leader for height
   */
  isLeader(height: number): boolean

  /**
   * Get number of connected peers
   */
  getPeerCount(): number
}

// ============================================================================
// Ledger Integration Interface (Agent 2 implements)
// ============================================================================

export interface ILedgerIntegration {
  /**
   * Validate a proposed block
   * Returns { valid: true } or { valid: false, reason: string }
   */
  validateBlock(block: any): Promise<{ valid: boolean; reason?: string }>

  /**
   * Commit block to database (only called after quorum)
   */
  commitBlock(block: any): Promise<void>

  /**
   * Record a vote in the database
   */
  recordVote(vote: BlockVote): Promise<void>

  /**
   * Check if block has reached quorum
   */
  hasQuorum(blockHash: string, totalValidators: number): Promise<boolean>

  /**
   * Get all active validators
   */
  getActiveValidators(): Promise<Array<{ id: string; publicKey: string; wsUrl: string }>>

  /**
   * Get votes for a specific block
   */
  getVotesForBlock(blockHash: string): Promise<Array<{
    validatorId: string
    approve: boolean
    signature: string
  }>>
}

// ============================================================================
// HTTP API Contracts
// ============================================================================

/**
 * Consensus Service API (Agent 1 implements)
 * Default Port: 9000
 */
export namespace ConsensusAPI {
  /**
   * POST /propose
   * Ledger calls this to propose a new block
   */
  export interface ProposeRequest {
    block: any
  }

  export interface ProposeResponse {
    success: boolean
    error?: string
  }

  /**
   * GET /quorum/:blockHash
   * Check quorum status for a block
   */
  export interface QuorumResponse {
    blockHash: string
    totalValidators: number
    votes: number
    approveVotes: number
    rejectVotes: number
    hasQuorum: boolean
  }

  /**
   * GET /peers
   * Get connected peer list
   */
  export interface PeersResponse {
    peers: Array<{
      id: string
      wsUrl: string
      connected: boolean
    }>
  }
}

/**
 * Ledger Consensus Endpoints (Agent 2 implements)
 * Default Port: 8080
 */
export namespace LedgerConsensusAPI {
  /**
   * POST /consensus/validate
   * Consensus service calls this to validate a block
   */
  export interface ValidateRequest {
    block: any
  }

  export interface ValidateResponse {
    valid: boolean
    reason?: string
  }

  /**
   * POST /consensus/votes
   * Consensus service calls this to record a vote
   */
  export interface RecordVoteRequest {
    vote: BlockVote
  }

  export interface RecordVoteResponse {
    success: boolean
  }

  /**
   * GET /consensus/quorum/:blockHash
   * Check quorum status in database
   */
  export interface QuorumStatusResponse {
    blockHash: string
    totalValidators: number
    votes: number
    quorum: boolean
  }

  /**
   * GET /consensus/blocks/:fromHeight/:toHeight
   * Peer sync - get blocks by height range
   */
  export interface BlockRangeResponse {
    blocks: Array<{
      height: number
      hash: string
      previousHash: string
      timestamp: number
      transactions: any[]
    }>
  }

  /**
   * GET /consensus/block/:hash
   * Get block by hash
   */
  export interface BlockByHashResponse {
    block: any | null
  }
}

// ============================================================================
// Database Schema (SQL)
// ============================================================================

/**
 * NOTE: These are TypeScript definitions for reference.
 * Actual SQL migrations will be generated by Agent 1 or Agent 2.
 */

export interface ValidatorRow {
  id: string              // "val_abc123"
  publicKey: string       // Ed25519 public key
  wsUrl: string          // "ws://validator-1:9000"
  status: string         // "active" | "offline"
  lastSeen: Date | null
  createdAt: Date
}

export interface BlockVoteRow {
  id: string             // "vote_{blockHash}_{validatorId}"
  blockHash: string      // SHA256 hash of block
  validatorId: string    // Foreign key to validators.id
  approve: boolean       // true = approve, false = reject
  signature: string      // Ed25519 signature
  createdAt: Date
}

/**
 * SQL Schema (for reference):
 *
 * CREATE TABLE validators (
 *   id TEXT PRIMARY KEY,
 *   public_key TEXT NOT NULL UNIQUE,
 *   ws_url TEXT NOT NULL,
 *   status TEXT NOT NULL,
 *   last_seen TIMESTAMP,
 *   created_at TIMESTAMP DEFAULT NOW() NOT NULL
 * );
 *
 * CREATE TABLE block_votes (
 *   id TEXT PRIMARY KEY,
 *   block_hash TEXT NOT NULL,
 *   validator_id TEXT NOT NULL REFERENCES validators(id),
 *   approve BOOLEAN NOT NULL,
 *   signature TEXT NOT NULL,
 *   created_at TIMESTAMP DEFAULT NOW() NOT NULL
 * );
 *
 * CREATE INDEX block_votes_block_hash_idx ON block_votes(block_hash);
 * CREATE INDEX block_votes_validator_idx ON block_votes(validator_id);
 */
