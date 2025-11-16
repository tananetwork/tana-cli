/**
 * Apply database migration
 */

import postgres from 'postgres'
import { readFileSync } from 'fs'
import { join } from 'path'

const connectionString = process.env.NOTIFICATIONS_DB_URL || process.env.DATABASE_URL || 'postgres://tana:tana_dev_password@localhost:5432/tana'

async function applyMigration() {
  console.log('Connecting to database...')
  const sql = postgres(connectionString)

  try {
    console.log('Reading migration file...')
    const migrationPath = join(import.meta.dir, '../../migrations/0001_notifications.sql')
    const migration = readFileSync(migrationPath, 'utf-8')

    console.log('Applying migration...')
    await sql.unsafe(migration)

    console.log('✓ Migration applied successfully!')
  } catch (error) {
    console.error('Error applying migration:', error)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

applyMigration()
