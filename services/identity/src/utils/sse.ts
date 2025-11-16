/**
 * Server-Sent Events (SSE) utilities
 *
 * Manages real-time updates for authentication sessions
 */

import { EventEmitter } from 'events'
import type { Context } from 'hono'

// Global event emitter for session updates
// In production, use Redis pub/sub for multi-instance deployments
const sessionEmitter = new EventEmitter()

// Increase max listeners (default is 10, we may have many concurrent sessions)
sessionEmitter.setMaxListeners(1000)

/**
 * Session event types
 */
export interface SessionEvent {
  type: 'status_update' | 'approved' | 'rejected' | 'expired'
  sessionId: string
  status?: string
  timestamp: string
  sessionToken?: string
  userId?: string
  username?: string
  reason?: string
}

/**
 * Emit a session event
 *
 * This notifies all SSE listeners for a specific session
 */
export function emitSessionEvent(sessionId: string, event: SessionEvent) {
  sessionEmitter.emit(sessionId, event)
}

/**
 * Create an SSE stream for a session
 *
 * Returns a Hono response that streams events to the client
 */
export function createSSEStream(c: Context, sessionId: string) {
  console.log('[SSE] Creating stream for session:', sessionId)

  // Set SSE headers
  c.header('Content-Type', 'text/event-stream')
  c.header('Cache-Control', 'no-cache')
  c.header('Connection', 'keep-alive')

  let heartbeatInterval: NodeJS.Timeout | null = null
  let isClosing = false

  // Create a readable stream
  const stream = new ReadableStream({
    start(controller) {
      console.log('[SSE] Stream started for session:', sessionId)

      // Send initial connection event
      try {
        const initialEvent = formatSSE({
          type: 'connected',
          sessionId,
          timestamp: new Date().toISOString(),
        })
        controller.enqueue(new TextEncoder().encode(initialEvent))
        console.log('[SSE] Sent connected event')
      } catch (error) {
        console.error('[SSE] Error sending connected event:', error)
      }

      // Handler for session events
      const eventHandler = (event: SessionEvent) => {
        if (isClosing) {
          console.log('[SSE] Skipping event (closing):', event.type)
          return
        }

        try {
          console.log('[SSE] Sending event:', event.type, 'for session:', sessionId)
          const formattedEvent = formatSSE(event)
          controller.enqueue(new TextEncoder().encode(formattedEvent))

          // Close connection if session is in terminal state
          if (
            event.type === 'approved' ||
            event.type === 'rejected' ||
            event.type === 'expired'
          ) {
            console.log('[SSE] Terminal state reached, closing stream')
            isClosing = true
            // Send a final event and close
            setTimeout(() => {
              if (heartbeatInterval) {
                clearInterval(heartbeatInterval)
                heartbeatInterval = null
              }
              try {
                controller.close()
                console.log('[SSE] Stream closed for session:', sessionId)
              } catch (error) {
                console.error('[SSE] Error closing stream:', error)
              }
            }, 100)
          }
        } catch (error) {
          console.error('[SSE] Error sending event:', error)
        }
      }

      // Listen for events on this session
      sessionEmitter.on(sessionId, eventHandler)
      console.log('[SSE] Listening for events on session:', sessionId)

      // Heartbeat to keep connection alive (every 15 seconds)
      heartbeatInterval = setInterval(() => {
        if (isClosing) return
        try {
          const heartbeat = ': heartbeat\n\n'
          controller.enqueue(new TextEncoder().encode(heartbeat))
          console.log('[SSE] Heartbeat sent for session:', sessionId)
        } catch (error) {
          console.error('[SSE] Heartbeat error:', error)
          // Connection closed, clean up
          if (heartbeatInterval) {
            clearInterval(heartbeatInterval)
            heartbeatInterval = null
          }
        }
      }, 15000) // Reduced from 30s to 15s

      // Cleanup on connection close
      const abortHandler = () => {
        console.log('[SSE] Connection aborted for session:', sessionId)
        isClosing = true
        sessionEmitter.off(sessionId, eventHandler)
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval)
          heartbeatInterval = null
        }
        try {
          controller.close()
        } catch (error) {
          console.error('[SSE] Error closing on abort:', error)
        }
      }

      c.req.raw.signal?.addEventListener('abort', abortHandler)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'X-Accel-Buffering': 'no', // Disable buffering in nginx/proxies
    },
  })
}

/**
 * Format an event as SSE data
 *
 * SSE format:
 * data: {"key": "value"}\n\n
 */
function formatSSE(event: any): string {
  return 'data: ' + JSON.stringify(event) + '\n\n'
}

/**
 * Notify session status update
 */
export function notifyStatusUpdate(
  sessionId: string,
  status: string
) {
  emitSessionEvent(sessionId, {
    type: 'status_update',
    sessionId,
    status,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Notify session approved
 */
export function notifyApproved(
  sessionId: string,
  data: {
    sessionToken: string
    userId: string
    username: string
  }
) {
  emitSessionEvent(sessionId, {
    type: 'approved',
    sessionId,
    status: 'approved',
    sessionToken: data.sessionToken,
    userId: data.userId,
    username: data.username,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Notify session rejected
 */
export function notifyRejected(sessionId: string, reason?: string) {
  emitSessionEvent(sessionId, {
    type: 'rejected',
    sessionId,
    status: 'rejected',
    reason,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Notify session expired
 */
export function notifyExpired(sessionId: string) {
  emitSessionEvent(sessionId, {
    type: 'expired',
    sessionId,
    status: 'expired',
    timestamp: new Date().toISOString(),
  })
}

/**
 * Get active listener count for a session
 * (useful for debugging)
 */
export function getListenerCount(sessionId: string): number {
  return sessionEmitter.listenerCount(sessionId)
}
