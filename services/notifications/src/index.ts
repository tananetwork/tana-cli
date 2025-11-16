/**
 * Tana Notifications Service
 *
 * Handles push notifications for mobile devices
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

// Import routes
import devicesRoutes from './api/routes/devices'
import sendRoutes from './api/routes/send'

const app = new Hono()

// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
  origin: '*', // Allow all origins in development
  credentials: true,
}))

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get('/', (c) => {
  return c.json({
    service: 'tana-notifications',
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

app.route('/devices', devicesRoutes)
app.route('/notifications', sendRoutes)

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.onError((err, c) => {
  console.error('Error:', err.message)
  console.error(err.stack)

  return c.json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  }, 500)
})

// ============================================================================
// START SERVER
// ============================================================================

const port = parseInt(process.env.NOTIFICATIONS_PORT || process.env.PORT || '8091')

console.log('Tana Notifications Service starting on port', port)
console.log('Database:', process.env.NOTIFICATIONS_DB_URL || process.env.DATABASE_URL || 'Using default connection')

export default {
  port,
  fetch: app.fetch,
}
