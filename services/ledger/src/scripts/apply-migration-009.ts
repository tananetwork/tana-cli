/**
 * Apply Migration 009: Auth Sessions
 *
 * Adds auth_sessions table for mobile QR code authentication
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { db } from '../db'
import { sql } from 'drizzle-orm'

async function applyMigration() {
  console.log('Applying migration 009: Auth Sessions...')

  try {
    // Read migration file
    const migrationSQL = readFileSync(
      join(__dirname, '../../migrations/0009_auth_sessions.sql'),
      'utf-8'
    )

    // Execute migration
    await db.execute(sql.raw(migrationSQL))

    console.log('✓ Migration 009 applied successfully')
    console.log('  - Created auth_sessions table')
    console.log('  - Added auth_session_status enum')
    console.log('  - Created indexes for efficient queries')

    process.exit(0)
  } catch (error: any) {
    console.error('✗ Migration 009 failed:', error.message)
    console.error(error)
    process.exit(1)
  }
}

applyMigration()
