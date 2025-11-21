/**
 * Block Validation Logic
 *
 * Validates proposed blocks for consensus
 */

import { db } from '../db'
import { blocks } from '../db/schema'
import { desc } from 'drizzle-orm'
import { computeBlockHash } from '../utils/merkle'
import type { BlockContent } from '../utils/merkle'

/**
 * Validate a proposed block
 * Returns { valid: true } or { valid: false, reason: string }
 */
export async function validateBlock(block: any): Promise<{ valid: boolean; reason?: string }> {
  try {
    // 1. Check block height is next in sequence
    const latestBlock = await db.query.blocks.findFirst({
      orderBy: [desc(blocks.height)],
    })

    const expectedHeight = (latestBlock?.height || 0) + 1
    if (block.height !== expectedHeight) {
      return {
        valid: false,
        reason: `Invalid height: expected ${expectedHeight}, got ${block.height}`
      }
    }

    // 2. Check previous hash matches
    const expectedPrevHash = latestBlock?.hash || 'genesis'
    if (block.previousHash !== expectedPrevHash) {
      return {
        valid: false,
        reason: `Previous hash mismatch: expected ${expectedPrevHash}, got ${block.previousHash}`
      }
    }

    // 3. Verify block hash
    const blockContent: BlockContent = {
      height: block.height,
      previousHash: block.previousHash,
      timestamp: block.timestamp,
      producer: block.producer,
      transactions: block.transactions,
      stateChanges: block.stateChanges,
      contentRefs: block.contentRefs,
      txRoot: block.txRoot,
      stateRoot: block.stateRoot,
      gasUsed: block.gasUsed,
      gasLimit: block.gasLimit,
    }

    const calculatedHash = computeBlockHash(blockContent)
    if (block.hash !== calculatedHash) {
      return {
        valid: false,
        reason: `Block hash mismatch: expected ${calculatedHash}, got ${block.hash}`
      }
    }

    // 4. Validate timestamp (not too far in future)
    const maxFutureTime = Date.now() + 60000  // 1 minute tolerance
    const blockTime = typeof block.timestamp === 'string'
      ? new Date(block.timestamp).getTime()
      : block.timestamp

    if (blockTime > maxFutureTime) {
      return {
        valid: false,
        reason: 'Block timestamp too far in future'
      }
    }

    // 5. Validate transactions
    // TODO: Add transaction signature verification
    // TODO: Check sender has sufficient balance
    // TODO: Verify nonces

    return { valid: true }
  } catch (error: any) {
    return {
      valid: false,
      reason: `Validation error: ${error.message}`
    }
  }
}

/**
 * Calculate block hash (wrapper for merkle utility)
 */
export function calculateBlockHash(block: any): string {
  const blockContent: BlockContent = {
    height: block.height,
    previousHash: block.previousHash,
    timestamp: block.timestamp,
    producer: block.producer,
    transactions: block.transactions,
    stateChanges: block.stateChanges,
    contentRefs: block.contentRefs,
    txRoot: block.txRoot,
    stateRoot: block.stateRoot,
    gasUsed: block.gasUsed,
    gasLimit: block.gasLimit,
  }

  return computeBlockHash(blockContent)
}
