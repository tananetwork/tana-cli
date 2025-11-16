/**
 * Apply Migration 006
 *
 * Adds metadata column to transactions table
 */

import postgres from 'postgres'
import { readFileSync } from 'fs'
import { join } from 'path'

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://tana:tana_dev_password@localhost:5432/tana'

async function applyMigration() {
  console.log('Applying migration 006: Transaction metadata...')

  const sql = postgres(DATABASE_URL)

  try {
    const migrationSQL = readFileSync(
      join(process.cwd(), 'migrations', '0006_add_transaction_metadata.sql'),
      'utf-8'
    )

    await sql.unsafe(migrationSQL)

    console.log('✅ Migration 006 applied successfully!')
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      console.log('✅ Migration already applied')
    } else {
      console.error('❌ Error applying migration:', error)
      process.exit(1)
    }
  } finally {
    await sql.end()
  }
}

applyMigration()
