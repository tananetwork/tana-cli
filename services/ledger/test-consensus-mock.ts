/**
 * Mock Consensus Service for Testing
 *
 * Simple HTTP server that always approves blocks for testing ledger integration
 */

import { serve } from 'bun'
import { Hono } from 'hono'

const app = new Hono()

app.post('/propose', (c) => {
  console.log('[MOCK CONSENSUS] Block proposed')
  return c.json({ success: true })
})

app.get('/quorum/:hash', (c) => {
  const hash = c.req.param('hash')
  console.log(`[MOCK CONSENSUS] Quorum check for ${hash.slice(0, 8)}...`)
  return c.json({
    blockHash: hash,
    totalValidators: 3,
    votes: 3,
    approveVotes: 3,
    rejectVotes: 0,
    hasQuorum: true
  })
})

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

const port = parseInt(process.env.HTTP_PORT || '9001')

serve({
  port,
  fetch: app.fetch,
})

console.log(`[MOCK CONSENSUS] Service listening on port ${port}`)
console.log('[MOCK CONSENSUS] Will auto-approve all blocks for testing')
