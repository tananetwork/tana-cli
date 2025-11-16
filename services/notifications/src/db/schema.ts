/**
 * Database schema for notifications service
 */

import { pgTable, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core'

/**
 * Device tokens for push notifications
 * Stores encrypted device tokens associated with user accounts
 */
export const deviceTokens = pgTable('device_tokens', {
  id: text('id').primaryKey(), // UUID
  userId: text('user_id').notNull(), // Blockchain user ID
  username: text('username').notNull(), // For easy reference
  publicKey: text('public_key').notNull(), // User's public key

  // Device information
  deviceToken: text('device_token').notNull().unique(), // Expo push token
  platform: text('platform').notNull(), // 'ios' | 'android'
  deviceName: text('device_name'), // Optional device name

  // Notification preferences
  preferences: jsonb('preferences').$type<{
    balanceUpdates: boolean
    moneyRequests: boolean
    paymentReceived: boolean
    contractEvents: boolean
    securityAlerts: boolean
  }>().notNull().default({
    balanceUpdates: true,
    moneyRequests: true,
    paymentReceived: true,
    contractEvents: true,
    securityAlerts: true,
  }),

  // Metadata
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastSeenAt: timestamp('last_seen_at').notNull().defaultNow(),
  isActive: boolean('is_active').notNull().default(true),
})

/**
 * Notification history
 * Keeps track of sent notifications for audit and debugging
 */
export const notificationHistory = pgTable('notification_history', {
  id: text('id').primaryKey(), // UUID
  userId: text('user_id').notNull(),
  deviceTokenId: text('device_token_id').notNull(),

  // Notification details
  type: text('type').notNull(), // 'balance_update' | 'money_request' | etc.
  title: text('title').notNull(),
  body: text('body').notNull(),
  data: jsonb('data'), // Additional payload data

  // Status
  status: text('status').notNull(), // 'sent' | 'failed' | 'pending'
  error: text('error'), // Error message if failed

  // Timestamps
  sentAt: timestamp('sent_at').notNull().defaultNow(),
  receivedAt: timestamp('received_at'), // When device acknowledged receipt
})
