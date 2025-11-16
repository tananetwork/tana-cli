/**
 * Tana Identity Service
 *
 * Main entry point for the authentication API server
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

// Import routes
import authRoutes from './api/routes/auth'

// Import session cleanup
import { cleanupExpiredSessions } from './auth/session'

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
    service: 'tana-identity',
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

app.route('/auth', authRoutes)

// User events endpoint
app.get('/users/:userId/events', async (c) => {
  try {
    const userId = c.req.param('userId')
    const limit = parseInt(c.req.query('limit') || '10')

    const { db } = await import('./db')
    const { authSessions } = await import('./db/schema')
    const { desc, eq } = await import('drizzle-orm')

    // Get approved auth sessions for this user
    const sessions = await db
      .select({
        id: authSessions.id,
        appName: authSessions.appName,
        appIcon: authSessions.appIcon,
        createdAt: authSessions.createdAt,
        approvedAt: authSessions.approvedAt,
      })
      .from(authSessions)
      .where(eq(authSessions.userId, userId))
      .orderBy(desc(authSessions.approvedAt))
      .limit(limit)

    // Map to event format
    const events = sessions.map(session => ({
      id: session.id,
      type: 'login',
      description: `Logged into ${session.appName || 'application'}`,
      appName: session.appName,
      appIcon: session.appIcon,
      timestamp: session.approvedAt || session.createdAt,
    }))

    return c.json({ events })
  } catch (error: any) {
    console.error('Failed to fetch user events:', error)
    return c.json({ events: [] }, 500)
  }
})

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
// SESSION CLEANUP
// ============================================================================

/**
 * Periodically clean up expired sessions
 * Runs every minute
 */
function startCleanupTask() {
  setInterval(async () => {
    try {
      const expired = await cleanupExpiredSessions()
      if (expired > 0) {
        console.log('Cleaned up', expired, 'expired sessions')
      }
    } catch (error) {
      console.error('Error cleaning up expired sessions:', error)
    }
  }, 60 * 1000) // Every 60 seconds
}

// ============================================================================
// START SERVER
// ============================================================================

const port = parseInt(process.env.IDENTITY_PORT || process.env.PORT || '8090')

console.log('Tana Identity Service starting on port', port)
console.log('Database:', process.env.IDENTITY_DB_URL || process.env.DATABASE_URL || 'Using default connection')

// Start cleanup task
startCleanupTask()
console.log('Session cleanup task started')

export default {
  port,
  fetch: app.fetch,
}
