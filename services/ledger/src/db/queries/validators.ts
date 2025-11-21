/**
 * Validator and Block Vote Database Queries
 *
 * Queries for managing validators and their votes in consensus
 */

import { db } from '../index'
import { validators, blockVotes } from '../schema'
import { eq, and } from 'drizzle-orm'
import type { BlockVote } from '../../../../contracts/consensus'

/**
 * Get all active validators
 */
export async function getActiveValidators() {
  return db.select()
    .from(validators)
    .where(eq(validators.status, 'active'))
}

/**
 * Get a validator by ID
 */
export async function getValidator(id: string) {
  return db.query.validators.findFirst({
    where: eq(validators.id, id)
  })
}

/**
 * Upsert a validator (insert or update if exists)
 */
export async function upsertValidator(data: {
  id: string
  publicKey: string
  wsUrl: string
  status: string
}) {
  return db.insert(validators)
    .values({
      ...data,
      lastSeen: new Date(),
    })
    .onConflictDoUpdate({
      target: validators.id,
      set: {
        wsUrl: data.wsUrl,
        status: data.status,
        lastSeen: new Date(),
      }
    })
}

/**
 * Record a vote in the database
 */
export async function recordVote(vote: {
  id: string
  blockHash: string
  validatorId: string
  approve: boolean
  signature: string
}) {
  return db.insert(blockVotes).values(vote)
}

/**
 * Get all votes for a specific block
 */
export async function getVotesForBlock(blockHash: string) {
  return db.select()
    .from(blockVotes)
    .where(eq(blockVotes.blockHash, blockHash))
}

/**
 * Check if a block has reached quorum
 * Quorum = 2/3+ of total validators voting approve
 */
export async function hasQuorum(blockHash: string, totalValidators: number): Promise<boolean> {
  const votes = await getVotesForBlock(blockHash)
  const approveVotes = votes.filter(v => v.approve).length
  const required = Math.ceil(totalValidators * 2 / 3)
  return approveVotes >= required
}
