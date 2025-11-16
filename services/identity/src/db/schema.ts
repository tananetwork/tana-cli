/**
 * Tana Identity Service Database Schema
 *
 * Authentication sessions for QR code-based mobile authentication
 */

import { pgTable, text, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core'

// ============================================================================
// ENUMS
// ============================================================================

export const authSessionStatusEnum = pgEnum('auth_session_status', [
  'waiting',
  'scanned',
  'approved',
  'rejected',
  'expired'
])

// ============================================================================
// AUTH SESSIONS
// ============================================================================

/**
 * Auth Sessions Table
 *
 * Manages QR code authentication sessions for mobile-first authentication.
 * Desktop/web generates a session, displays QR code, mobile app scans and approves.
 */
export const authSessions = pgTable('auth_sessions', {
  // Session identification
  id: text('id').primaryKey(), // sess_xxxxx format
  challenge: text('challenge').notNull().unique(), // Random 32-byte hex string to be signed

  // Session status
  status: authSessionStatusEnum('status').notNull().default('waiting'),

  // User info (populated after approval)
  userId: text('user_id'), // Blockchain user ID
  username: text('username'), // Blockchain username
  publicKey: text('public_key'), // Ed25519 public key (hex)

  // Session token (generated after approval for subsequent API calls)
  sessionToken: text('session_token').unique(),

  // App info (provided by the requesting application)
  returnUrl: text('return_url').notNull(), // Where to redirect after login
  appName: text('app_name'), // Name of the app requesting auth
  appIcon: text('app_icon'), // Optional app icon URL

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at').notNull(), // 5 minutes from creation
  approvedAt: timestamp('approved_at'),
  scannedAt: timestamp('scanned_at'),
})

// Indexes for performance
// Note: In a real migration, these would be separate CREATE INDEX statements
// export const authSessionsStatusIdx = index('idx_auth_sessions_status').on(authSessions.status)
// export const authSessionsExpiresAtIdx = index('idx_auth_sessions_expires_at').on(authSessions.expiresAt)
// export const authSessionsTokenIdx = index('idx_auth_sessions_token').on(authSessions.sessionToken)
