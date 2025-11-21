/**
 * Consensus API Routes
 *
 * HTTP endpoints for multi-validator consensus integration
 */

import { Hono } from 'hono'
import { validateBlock } from '../../validation/block'
import { recordVote, getVotesForBlock, hasQuorum, getActiveValidators } from '../../db/queries'
import { blocks } from '../../db/schema'
import { db } from '../../db'
import { eq, and, gte, lte, asc } from 'drizzle-orm'
import type { BlockVote } from '../../../../contracts/consensus'

const app = new Hono()

// ============================================================================
// BLOCK VALIDATION
// ============================================================================

/**
 * POST /consensus/validate
 * Consensus service calls this to validate a block
 */
app.post('/validate', async (c) => {
  try {
    const { block } = await c.req.json()

    if (!block) {
      return c.json({ valid: false, reason: 'No block provided' }, 400)
    }

    const result = await validateBlock(block)
    return c.json(result)
  } catch (error: any) {
    return c.json({
      valid: false,
      reason: `Validation error: ${error.message}`
    }, 500)
  }
})

// ============================================================================
// VOTE RECORDING
// ============================================================================

/**
 * POST /consensus/votes
 * Consensus service calls this to record a vote
 */
app.post('/votes', async (c) => {
  try {
    const vote = await c.req.json() as BlockVote

    // TODO: Verify signature

    await recordVote({
      id: `vote_${vote.blockHash}_${vote.validatorId}`,
      blockHash: vote.blockHash,
      validatorId: vote.validatorId,
      approve: vote.approve,
      signature: vote.signature,
    })

    return c.json({ success: true })
  } catch (error: any) {
    console.error('Failed to record vote:', error)
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// ============================================================================
// QUORUM STATUS
// ============================================================================

/**
 * GET /consensus/quorum/:blockHash
 * Check quorum status in database
 */
app.get('/quorum/:blockHash', async (c) => {
  try {
    const blockHash = c.req.param('blockHash')
    const validators = await getActiveValidators()
    const votes = await getVotesForBlock(blockHash)
    const quorum = await hasQuorum(blockHash, validators.length)

    return c.json({
      blockHash,
      totalValidators: validators.length,
      votes: votes.length,
      quorum,
    })
  } catch (error: any) {
    console.error('Failed to check quorum:', error)
    return c.json({
      error: error.message
    }, 500)
  }
})

// ============================================================================
// PEER SYNCHRONIZATION
// ============================================================================

/**
 * GET /consensus/blocks/:fromHeight/:toHeight
 * Peer sync - get blocks by height range
 */
app.get('/blocks/:fromHeight/:toHeight', async (c) => {
  try {
    const fromHeight = parseInt(c.req.param('fromHeight'))
    const toHeight = parseInt(c.req.param('toHeight'))

    if (isNaN(fromHeight) || isNaN(toHeight)) {
      return c.json({ error: 'Invalid height parameters' }, 400)
    }

    if (toHeight < fromHeight) {
      return c.json({ error: 'toHeight must be >= fromHeight' }, 400)
    }

    // Limit to 100 blocks per request to prevent DOS
    const limit = Math.min(toHeight - fromHeight + 1, 100)

    const blockList = await db.select()
      .from(blocks)
      .where(
        and(
          gte(blocks.height, fromHeight),
          lte(blocks.height, fromHeight + limit - 1)
        )
      )
      .orderBy(asc(blocks.height))

    return c.json({ blocks: blockList })
  } catch (error: any) {
    console.error('Failed to fetch blocks:', error)
    return c.json({
      error: error.message
    }, 500)
  }
})

/**
 * GET /consensus/block/:hash
 * Get block by hash (for peer verification)
 */
app.get('/block/:hash', async (c) => {
  try {
    const hash = c.req.param('hash')
    const block = await db.query.blocks.findFirst({
      where: eq(blocks.hash, hash),
    })

    if (!block) {
      return c.json({ error: 'Block not found' }, 404)
    }

    return c.json({ block })
  } catch (error: any) {
    console.error('Failed to fetch block:', error)
    return c.json({
      error: error.message
    }, 500)
  }
})

export default app
