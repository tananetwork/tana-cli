/**
 * Authentication API Routes
 *
 * Handles QR code authentication flow
 */

import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import * as sessionService from '../../auth/session'
import * as crypto from '../../auth/crypto'
import * as sse from '../../utils/sse'

const app = new Hono()

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const createSessionSchema = z.object({
  returnUrl: z.string().optional(),
  appName: z.string().min(1).max(100).optional(),
  appIcon: z.string().url().optional(),
})

const approveSessionSchema = z.object({
  userId: z.string().min(1),
  username: z.string().min(1),
  publicKey: z.string().min(1),
  signature: z.string().min(1),
  message: z.string().min(1),
})

const rejectSessionSchema = z.object({
  reason: z.string().optional(),
})

// ============================================================================
// ROUTES
// ============================================================================

/**
 * POST /auth/session/create
 *
 * Create a new authentication session and return QR code data
 */
app.post('/session/create', zValidator('json', createSessionSchema), async (c) => {
  try {
    const body = c.req.valid('json')

    // Create session
    const session = await sessionService.createSession({
      returnUrl: body.returnUrl,
      appName: body.appName,
      appIcon: body.appIcon,
    })

    // Calculate expiration time in seconds
    const expiresIn = Math.floor(
      (session.expiresAt.getTime() - session.createdAt.getTime()) / 1000
    )

    // Get server URL from request or environment
    const serverUrl = process.env.IDENTITY_SERVER_URL ||
      process.env.SERVER_URL ||
      c.req.url.split('/auth')[0]

    // Return session data and QR code payload
    return c.json({
      sessionId: session.id,
      challenge: session.challenge,
      qrData: {
        protocol: 'tana',
        type: 'auth',
        version: '1',
        sessionId: session.id,
        challenge: session.challenge,
        server: serverUrl,
        appName: session.appName,
        appIcon: session.appIcon,
      },
      expiresIn,
      expiresAt: session.expiresAt.toISOString(),
    }, 201)
  } catch (error: any) {
    console.error('Error creating session:', error)
    return c.json({ error: 'Failed to create session', details: error.message }, 500)
  }
})

/**
 * GET /auth/session/verify
 *
 * Verify a session token and return user info
 * IMPORTANT: Must be before /session/:id to avoid route collision
 */
app.get('/session/verify', async (c) => {
  // Get token from Authorization header
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Missing or invalid Authorization header' }, 401)
  }

  const token = authHeader.substring(7) // Remove 'Bearer '

  try {
    const result = await sessionService.verifySessionToken(token)

    if (!result.valid) {
      return c.json({ error: result.reason || 'Invalid token' }, 401)
    }

    return c.json({
      valid: true,
      userId: result.userId,
      username: result.username,
      publicKey: result.publicKey,
      expiresAt: result.expiresAt?.toISOString(),
    })
  } catch (error: any) {
    console.error('Error verifying token:', error)
    return c.json({ error: 'Failed to verify token', details: error.message }, 500)
  }
})

/**
 * GET /auth/session/:id/events
 *
 * Server-Sent Events stream for session status updates
 */
app.get('/session/:id/events', async (c) => {
  const { id } = c.req.param()

  // Verify session exists
  const session = await sessionService.getSession(id)
  if (!session) {
    return c.json({ error: 'Session not found' }, 404)
  }

  // Check if session is already expired
  if (sessionService.isSessionExpired(session)) {
    // Mark as expired and notify
    await sessionService.expireSession(id)
    sse.notifyExpired(id)
  }

  // Create and return SSE stream
  return sse.createSSEStream(c, id)
})

/**
 * GET /auth/session/:id
 *
 * Get session details (without sensitive data like challenge)
 */
app.get('/session/:id', async (c) => {
  const { id } = c.req.param()

  const session = await sessionService.getSession(id)
  if (!session) {
    return c.json({ error: 'Session not found' }, 404)
  }

  // Include session token and user data if approved
  if (session.status === 'approved' && session.sessionToken) {
    return c.json({
      sessionId: session.id,
      status: session.status,
      appName: session.appName,
      appIcon: session.appIcon,
      createdAt: session.createdAt.toISOString(),
      expiresAt: session.expiresAt.toISOString(),
      approvedAt: session.approvedAt?.toISOString(),
      sessionToken: session.sessionToken,
      userId: session.userId,
      username: session.username,
    })
  }

  // Return non-sensitive session data for non-approved sessions
  return c.json({
    sessionId: session.id,
    status: session.status,
    appName: session.appName,
    appIcon: session.appIcon,
    createdAt: session.createdAt.toISOString(),
    expiresAt: session.expiresAt.toISOString(),
    approvedAt: session.approvedAt?.toISOString(),
  })
})

/**
 * POST /auth/session/:id/scan
 *
 * Mark session as scanned (called when mobile app opens QR code)
 */
app.post('/session/:id/scan', async (c) => {
  const { id } = c.req.param()

  // Get session
  const session = await sessionService.getSession(id)
  if (!session) {
    return c.json({ error: 'Session not found' }, 404)
  }

  // Check if expired
  if (sessionService.isSessionExpired(session)) {
    await sessionService.expireSession(id)
    sse.notifyExpired(id)
    return c.json({ error: 'Session expired' }, 400)
  }

  // Mark as scanned
  const updated = await sessionService.markSessionScanned(id)
  if (updated) {
    sse.notifyStatusUpdate(id, 'scanned')
  }

  return c.json({
    success: true,
    sessionId: id,
    challenge: session.challenge,
    appName: session.appName,
  })
})

/**
 * POST /auth/session/:id/approve
 *
 * Approve session with signed credentials from mobile app
 */
app.post('/session/:id/approve', zValidator('json', approveSessionSchema), async (c) => {
  const { id } = c.req.param()
  const body = c.req.valid('json')

  try {
    // Get session
    const session = await sessionService.getSession(id)
    if (!session) {
      return c.json({ error: 'Session not found' }, 404)
    }

    // Check if session can be approved
    if (!sessionService.canApproveSession(session)) {
      if (sessionService.isSessionExpired(session)) {
        await sessionService.expireSession(id)
        sse.notifyExpired(id)
        return c.json({ error: 'Session expired' }, 400)
      }
      return c.json({
        error: 'Session cannot be approved',
        status: session.status
      }, 400)
    }

    // Parse the signed message
    let messageData: any
    try {
      messageData = JSON.parse(body.message)
    } catch (error) {
      return c.json({ error: 'Invalid message format' }, 400)
    }

    // Verify message contains required fields
    if (
      !messageData.sessionId ||
      !messageData.challenge ||
      !messageData.userId ||
      !messageData.username ||
      !messageData.timestamp
    ) {
      return c.json({ error: 'Message missing required fields' }, 400)
    }

    // Verify sessionId and challenge match
    if (messageData.sessionId !== id) {
      return c.json({ error: 'Session ID mismatch' }, 400)
    }

    if (messageData.challenge !== session.challenge) {
      return c.json({ error: 'Challenge mismatch' }, 400)
    }

    // Verify userId and username match the provided data
    if (messageData.userId !== body.userId || messageData.username !== body.username) {
      return c.json({ error: 'User data mismatch' }, 400)
    }

    // Verify timestamp is recent (within 5 minutes)
    const timestampAge = Date.now() - messageData.timestamp
    if (timestampAge > 5 * 60 * 1000 || timestampAge < -60 * 1000) {
      return c.json({ error: 'Timestamp out of acceptable range' }, 400)
    }

    // Verify the signature
    const isValid = await crypto.verifySignature(
      body.message,
      body.signature,
      body.publicKey
    )

    if (!isValid) {
      return c.json({ error: 'Invalid signature' }, 401)
    }

    // Approve the session
    const approved = await sessionService.approveSession(id, {
      userId: body.userId,
      username: body.username,
      publicKey: body.publicKey,
    })

    if (!approved) {
      return c.json({ error: 'Failed to approve session' }, 500)
    }

    // Notify SSE listeners
    sse.notifyApproved(id, {
      sessionToken: approved.sessionToken,
      userId: approved.userId,
      username: approved.username,
    })

    // Return session token
    return c.json({
      success: true,
      sessionToken: approved.sessionToken,
      userId: approved.userId,
      username: approved.username,
    })
  } catch (error: any) {
    console.error('Error approving session:', error)
    return c.json({ error: 'Failed to approve session', details: error.message }, 500)
  }
})

/**
 * POST /auth/session/:id/reject
 *
 * Reject session (user denied authentication)
 */
app.post('/session/:id/reject', zValidator('json', rejectSessionSchema), async (c) => {
  const { id } = c.req.param()
  const body = c.req.valid('json')

  try {
    // Get session
    const session = await sessionService.getSession(id)
    if (!session) {
      return c.json({ error: 'Session not found' }, 404)
    }

    // Reject the session
    const rejected = await sessionService.rejectSession(id, body.reason)

    if (!rejected) {
      return c.json({ error: 'Failed to reject session' }, 500)
    }

    // Notify SSE listeners
    sse.notifyRejected(id, body.reason)

    return c.json({ success: true })
  } catch (error: any) {
    console.error('Error rejecting session:', error)
    return c.json({ error: 'Failed to reject session', details: error.message }, 500)
  }
})

export default app
