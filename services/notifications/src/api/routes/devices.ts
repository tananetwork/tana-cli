/**
 * Device registration API routes
 */

import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from '../../db'
import { deviceTokens } from '../../db/schema'
import { eq, and } from 'drizzle-orm'
import { isValidExpoPushToken } from '../../utils/expo-push'

const app = new Hono()

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const registerDeviceSchema = z.object({
  userId: z.string().min(1),
  username: z.string().min(1),
  publicKey: z.string().min(1),
  deviceToken: z.string().min(1),
  platform: z.enum(['ios', 'android']),
  deviceName: z.string().optional(),
  preferences: z.object({
    balanceUpdates: z.boolean(),
    moneyRequests: z.boolean(),
    paymentReceived: z.boolean(),
    contractEvents: z.boolean(),
    securityAlerts: z.boolean(),
  }).optional(),
})

const updatePreferencesSchema = z.object({
  balanceUpdates: z.boolean().optional(),
  moneyRequests: z.boolean().optional(),
  paymentReceived: z.boolean().optional(),
  contractEvents: z.boolean().optional(),
  securityAlerts: z.boolean().optional(),
})

// ============================================================================
// ROUTES
// ============================================================================

/**
 * POST /devices/register
 *
 * Register a device for push notifications
 */
app.post('/register', zValidator('json', registerDeviceSchema), async (c) => {
  try {
    const body = c.req.valid('json')

    // Validate Expo push token
    if (!isValidExpoPushToken(body.deviceToken)) {
      return c.json({ error: 'Invalid Expo push token format' }, 400)
    }

    // Check if device token already exists
    const existing = await db
      .select()
      .from(deviceTokens)
      .where(eq(deviceTokens.deviceToken, body.deviceToken))
      .limit(1)

    if (existing.length > 0) {
      // Update existing record
      const [updated] = await db
        .update(deviceTokens)
        .set({
          userId: body.userId,
          username: body.username,
          publicKey: body.publicKey,
          platform: body.platform,
          deviceName: body.deviceName,
          preferences: body.preferences || existing[0].preferences,
          lastSeenAt: new Date(),
          isActive: true,
        })
        .where(eq(deviceTokens.id, existing[0].id))
        .returning()

      return c.json({
        success: true,
        deviceId: updated.id,
        message: 'Device token updated',
      })
    }

    // Create new device record
    const deviceId = `dev_${Math.random().toString(36).substring(2, 15)}`

    const [created] = await db
      .insert(deviceTokens)
      .values({
        id: deviceId,
        userId: body.userId,
        username: body.username,
        publicKey: body.publicKey,
        deviceToken: body.deviceToken,
        platform: body.platform,
        deviceName: body.deviceName,
        preferences: body.preferences || {
          balanceUpdates: true,
          moneyRequests: true,
          paymentReceived: true,
          contractEvents: true,
          securityAlerts: true,
        },
      })
      .returning()

    return c.json({
      success: true,
      deviceId: created.id,
      message: 'Device registered successfully',
    }, 201)
  } catch (error: any) {
    console.error('Error registering device:', error)
    return c.json({ error: 'Failed to register device', details: error.message }, 500)
  }
})

/**
 * DELETE /devices/:deviceToken
 *
 * Unregister a device (disable notifications)
 */
app.delete('/:deviceToken', async (c) => {
  try {
    const { deviceToken } = c.req.param()

    const [updated] = await db
      .update(deviceTokens)
      .set({ isActive: false })
      .where(eq(deviceTokens.deviceToken, deviceToken))
      .returning()

    if (!updated) {
      return c.json({ error: 'Device not found' }, 404)
    }

    return c.json({ success: true, message: 'Device unregistered' })
  } catch (error: any) {
    console.error('Error unregistering device:', error)
    return c.json({ error: 'Failed to unregister device', details: error.message }, 500)
  }
})

/**
 * PUT /devices/:deviceToken/preferences
 *
 * Update notification preferences for a device
 */
app.put('/:deviceToken/preferences', zValidator('json', updatePreferencesSchema), async (c) => {
  try {
    const { deviceToken } = c.req.param()
    const body = c.req.valid('json')

    // Get current device
    const [device] = await db
      .select()
      .from(deviceTokens)
      .where(eq(deviceTokens.deviceToken, deviceToken))
      .limit(1)

    if (!device) {
      return c.json({ error: 'Device not found' }, 404)
    }

    // Merge preferences
    const newPreferences = {
      ...device.preferences,
      ...body,
    }

    // Update preferences
    const [updated] = await db
      .update(deviceTokens)
      .set({ preferences: newPreferences })
      .where(eq(deviceTokens.id, device.id))
      .returning()

    return c.json({
      success: true,
      preferences: updated.preferences,
    })
  } catch (error: any) {
    console.error('Error updating preferences:', error)
    return c.json({ error: 'Failed to update preferences', details: error.message }, 500)
  }
})

/**
 * GET /devices/:deviceToken
 *
 * Get a specific device by token (including preferences)
 */
app.get('/:deviceToken', async (c) => {
  try {
    const { deviceToken } = c.req.param()

    const [device] = await db
      .select({
        id: deviceTokens.id,
        userId: deviceTokens.userId,
        username: deviceTokens.username,
        platform: deviceTokens.platform,
        deviceName: deviceTokens.deviceName,
        preferences: deviceTokens.preferences,
        createdAt: deviceTokens.createdAt,
        lastSeenAt: deviceTokens.lastSeenAt,
        isActive: deviceTokens.isActive,
      })
      .from(deviceTokens)
      .where(eq(deviceTokens.deviceToken, deviceToken))
      .limit(1)

    if (!device) {
      return c.json({ error: 'Device not found' }, 404)
    }

    return c.json(device)
  } catch (error: any) {
    console.error('Error fetching device:', error)
    return c.json({ error: 'Failed to fetch device', details: error.message }, 500)
  }
})

/**
 * GET /devices/user/:userId
 *
 * Get all devices for a user
 */
app.get('/user/:userId', async (c) => {
  try {
    const { userId } = c.req.param()

    const devices = await db
      .select({
        id: deviceTokens.id,
        deviceToken: deviceTokens.deviceToken,
        platform: deviceTokens.platform,
        deviceName: deviceTokens.deviceName,
        preferences: deviceTokens.preferences,
        createdAt: deviceTokens.createdAt,
        lastSeenAt: deviceTokens.lastSeenAt,
        isActive: deviceTokens.isActive,
      })
      .from(deviceTokens)
      .where(and(
        eq(deviceTokens.userId, userId),
        eq(deviceTokens.isActive, true)
      ))

    return c.json(devices)
  } catch (error: any) {
    console.error('Error fetching devices:', error)
    return c.json({ error: 'Failed to fetch devices', details: error.message }, 500)
  }
})

export default app
