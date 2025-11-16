/**
 * Expo Push Notification utilities
 */

import { Expo, ExpoPushMessage, ExpoPushTicket, ExpoPushReceipt } from 'expo-server-sdk'

// Create Expo SDK client
const expo = new Expo({
  // Optional: Enable batching for better performance
  useFcmV1: true,
})

export interface SendNotificationParams {
  to: string | string[] // Expo push token(s)
  title: string
  body: string
  data?: Record<string, any>
  sound?: 'default' | null
  badge?: number
  priority?: 'default' | 'normal' | 'high'
  channelId?: string
}

/**
 * Send a push notification to one or more devices
 */
export async function sendPushNotification(params: SendNotificationParams): Promise<{
  success: boolean
  tickets?: ExpoPushTicket[]
  error?: string
}> {
  try {
    // Ensure 'to' is an array
    const tokens = Array.isArray(params.to) ? params.to : [params.to]

    // Filter out invalid tokens
    const validTokens = tokens.filter((token) => Expo.isExpoPushToken(token))

    if (validTokens.length === 0) {
      return {
        success: false,
        error: 'No valid Expo push tokens provided',
      }
    }

    // Build messages
    const messages: ExpoPushMessage[] = validTokens.map((token) => ({
      to: token,
      sound: params.sound ?? 'default',
      title: params.title,
      body: params.body,
      data: params.data,
      badge: params.badge,
      priority: params.priority ?? 'high',
      channelId: params.channelId,
    }))

    // Send notifications in chunks (Expo recommends batching)
    const chunks = expo.chunkPushNotifications(messages)
    const tickets: ExpoPushTicket[] = []

    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
        tickets.push(...ticketChunk)
      } catch (error) {
        console.error('Error sending push notification chunk:', error)
      }
    }

    // Check for errors in tickets
    const errors = tickets.filter((ticket) => ticket.status === 'error')
    if (errors.length > 0) {
      console.error('Push notification errors:', errors)
    }

    return {
      success: tickets.length > 0,
      tickets,
    }
  } catch (error: any) {
    console.error('Error in sendPushNotification:', error)
    return {
      success: false,
      error: error.message || 'Unknown error',
    }
  }
}

/**
 * Verify push notification receipts
 * Call this periodically to check if notifications were delivered
 */
export async function verifyReceipts(receiptIds: string[]): Promise<{
  [id: string]: ExpoPushReceipt
}> {
  try {
    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds)
    const receipts: { [id: string]: ExpoPushReceipt } = {}

    for (const chunk of receiptIdChunks) {
      try {
        const receiptChunk = await expo.getPushNotificationReceiptsAsync(chunk)
        Object.assign(receipts, receiptChunk)
      } catch (error) {
        console.error('Error fetching receipts:', error)
      }
    }

    return receipts
  } catch (error) {
    console.error('Error in verifyReceipts:', error)
    return {}
  }
}

/**
 * Check if a token is a valid Expo push token
 */
export function isValidExpoPushToken(token: string): boolean {
  return Expo.isExpoPushToken(token)
}
