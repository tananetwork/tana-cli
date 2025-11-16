/**
 * Send notification API routes
 */

import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from '../../db'
import { deviceTokens, notificationHistory } from '../../db/schema'
import { eq, and, inArray } from 'drizzle-orm'
import { sendPushNotification } from '../../utils/expo-push'

const app = new Hono()

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const sendNotificationSchema = z.object({
  userId: z.string().min(1),
  type: z.enum(['balance_update', 'money_request', 'payment_received', 'contract_event', 'security_alert']),
  title: z.string().min(1),
  body: z.string().min(1),
  data: z.record(z.any()).optional(),
})

const sendBatchSchema = z.object({
  userIds: z.array(z.string()).min(1),
  type: z.enum(['balance_update', 'money_request', 'payment_received', 'contract_event', 'security_alert']),
  title: z.string().min(1),
  body: z.string().min(1),
  data: z.record(z.any()).optional(),
})

// ============================================================================
// ROUTES
// ============================================================================

/**
 * POST /send/user
 *
 * Send notification to a specific user (all their devices)
 */
app.post('/user', zValidator('json', sendNotificationSchema), async (c) => {
  try {
    const body = c.req.valid('json')

    // Get user's active devices
    const devices = await db
      .select()
      .from(deviceTokens)
      .where(and(
        eq(deviceTokens.userId, body.userId),
        eq(deviceTokens.isActive, true)
      ))

    if (devices.length === 0) {
      return c.json({
        success: false,
        message: 'No active devices found for user',
      })
    }

    // Filter devices based on notification preferences
    const eligibleDevices = devices.filter((device) => {
      const prefs = device.preferences as any
      switch (body.type) {
        case 'balance_update':
          return prefs.balanceUpdates
        case 'money_request':
          return prefs.moneyRequests
        case 'payment_received':
          return prefs.paymentReceived
        case 'contract_event':
          return prefs.contractEvents
        case 'security_alert':
          return prefs.securityAlerts
        default:
          return true
      }
    })

    if (eligibleDevices.length === 0) {
      return c.json({
        success: false,
        message: 'User has disabled this type of notification',
      })
    }

    // Send notifications
    const tokens = eligibleDevices.map((d) => d.deviceToken)
    const result = await sendPushNotification({
      to: tokens,
      title: body.title,
      body: body.body,
      data: {
        type: body.type,
        ...body.data,
      },
    })

    // Save to history
    const historyEntries = eligibleDevices.map((device) => ({
      id: `notif_${Math.random().toString(36).substring(2, 15)}`,
      userId: body.userId,
      deviceTokenId: device.id,
      type: body.type,
      title: body.title,
      body: body.body,
      data: body.data || {},
      status: result.success ? 'sent' : 'failed',
      error: result.error,
    }))

    await db.insert(notificationHistory).values(historyEntries)

    return c.json({
      success: result.success,
      sentToDevices: eligibleDevices.length,
      tickets: result.tickets,
    })
  } catch (error: any) {
    console.error('Error sending notification:', error)
    return c.json({ error: 'Failed to send notification', details: error.message }, 500)
  }
})

/**
 * POST /send/batch
 *
 * Send notification to multiple users
 */
app.post('/batch', zValidator('json', sendBatchSchema), async (c) => {
  try {
    const body = c.req.valid('json')

    // Get all active devices for these users
    const devices = await db
      .select()
      .from(deviceTokens)
      .where(and(
        inArray(deviceTokens.userId, body.userIds),
        eq(deviceTokens.isActive, true)
      ))

    if (devices.length === 0) {
      return c.json({
        success: false,
        message: 'No active devices found for any users',
      })
    }

    // Filter by preferences
    const eligibleDevices = devices.filter((device) => {
      const prefs = device.preferences as any
      switch (body.type) {
        case 'balance_update':
          return prefs.balanceUpdates
        case 'money_request':
          return prefs.moneyRequests
        case 'payment_received':
          return prefs.paymentReceived
        case 'contract_event':
          return prefs.contractEvents
        case 'security_alert':
          return prefs.securityAlerts
        default:
          return true
      }
    })

    if (eligibleDevices.length === 0) {
      return c.json({
        success: false,
        message: 'All users have disabled this type of notification',
      })
    }

    // Send notifications
    const tokens = eligibleDevices.map((d) => d.deviceToken)
    const result = await sendPushNotification({
      to: tokens,
      title: body.title,
      body: body.body,
      data: {
        type: body.type,
        ...body.data,
      },
    })

    // Save to history
    const historyEntries = eligibleDevices.map((device) => ({
      id: `notif_${Math.random().toString(36).substring(2, 15)}`,
      userId: device.userId,
      deviceTokenId: device.id,
      type: body.type,
      title: body.title,
      body: body.body,
      data: body.data || {},
      status: result.success ? 'sent' : 'failed',
      error: result.error,
    }))

    await db.insert(notificationHistory).values(historyEntries)

    return c.json({
      success: result.success,
      sentToDevices: eligibleDevices.length,
      tickets: result.tickets,
    })
  } catch (error: any) {
    console.error('Error sending batch notification:', error)
    return c.json({ error: 'Failed to send batch notification', details: error.message }, 500)
  }
})

/**
 * GET /history/user/:userId
 *
 * Get notification history for a user
 */
app.get('/history/user/:userId', async (c) => {
  try {
    const { userId } = c.req.param()
    const limit = parseInt(c.req.query('limit') || '50')
    const offset = parseInt(c.req.query('offset') || '0')

    const history = await db
      .select()
      .from(notificationHistory)
      .where(eq(notificationHistory.userId, userId))
      .orderBy(notificationHistory.sentAt)
      .limit(limit)
      .offset(offset)

    return c.json({ history })
  } catch (error: any) {
    console.error('Error fetching notification history:', error)
    return c.json({ error: 'Failed to fetch history', details: error.message }, 500)
  }
})

export default app
