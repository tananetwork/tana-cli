/**
 * Tana Ledger Service
 *
 * Main entry point for the ledger API server
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

// Import routes
import usersRoutes from './api/routes/users'
import balancesRoutes from './api/routes/balances'
import transactionsRoutes from './api/routes/transactions'
import blocksRoutes from './api/routes/blocks'
import contractsRoutes from './api/routes/contracts'

// Import Redis queue initialization
import { initializeRedisStreams, listPendingTransactions, getStreamLength } from '@tana/queue'

// Import heartbeat automation
import { startHeartbeat } from './heartbeat'

const app = new Hono()

// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
  origin: '*',  // Allow all origins in development
  credentials: true,
}))

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get('/', (c) => {
  return c.json({
    service: 'tana-ledger',
    version: '0.1.0',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  })
})

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

// ============================================================================
// API ROUTES
// ============================================================================

app.route('/users', usersRoutes)
app.route('/balances', balancesRoutes)
app.route('/transactions', transactionsRoutes)
app.route('/blocks', blocksRoutes)
app.route('/contracts', contractsRoutes)

// Pending transactions queue status
app.get('/pending', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '100')
    const transactions = await listPendingTransactions(limit)
    const count = await getStreamLength()

    return c.json({
      count,
      transactions: transactions.map(tx => ({
        id: tx.txId,
        type: tx.type,
        from: tx.from,
        to: tx.to,
        amount: tx.amount,
        currencyCode: tx.currencyCode,
        signature: tx.signature,
        timestamp: new Date(tx.timestamp).toISOString(),
        status: 'pending',
        data: tx.payload
      }))
    })
  } catch (error: any) {
    console.error('Failed to fetch pending queue:', error)
    return c.json({
      count: 0,
      transactions: [],
      error: error.message
    }, 500)
  }
})

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.onError((err, c) => {
  console.error(`Error: ${err.message}`)
  console.error(err.stack)

  return c.json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  }, 500)
})

// ============================================================================
// START SERVER
// ============================================================================

const port = parseInt(process.env.PORT || '8080')

console.log(`🚀 Tana Ledger Service starting on port ${port}`)
console.log(`📊 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Using default connection'}`)

// Initialize Redis streams for transaction queue
initializeRedisStreams()
  .then(() => {
    console.log(`✓ Transaction queue initialized`)
  })
  .catch((err) => {
    console.error('Failed to initialize Redis streams:', err)
    console.error('Transactions will not be queued. Please check Redis connection.')
  })

// Start heartbeat automation for mesh network coordination
startHeartbeat()
  .then(() => {
    console.log(`✓ Heartbeat automation ready`)
  })
  .catch((err) => {
    console.error('Failed to start heartbeat:', err)
    console.error('Mesh network coordination disabled.')
  })

export default {
  port,
  fetch: app.fetch,
}
