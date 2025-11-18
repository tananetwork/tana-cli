/**
 * Database connection and client
 */

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as schema from './schema'
import * as fs from 'fs'
import * as path from 'path'

// Database connection string
const connectionString = process.env.DATABASE_URL || 'postgres://tana:tana_dev_password@localhost:5432/tana'

// Create postgres client
export const client = postgres(connectionString)

// Create drizzle instance
export const db = drizzle(client, { schema })

/**
 * Run database migrations
 *
 * This function applies all pending SQL migrations from the migrations folder.
 * It's safe to call multiple times - already-applied migrations are skipped.
 */
export async function runMigrations() {
  try {
    // Find migrations directory
    const migrationsPath = path.join(import.meta.dir, '../migrations')

    // Check if migrations directory exists
    if (!fs.existsSync(migrationsPath)) {
      console.log('⚠️  No migrations directory found, skipping...')
      return
    }

    console.log('🔄 Running database migrations...')

    // Run migrations
    await migrate(db, { migrationsFolder: migrationsPath })

    console.log('✓ Database migrations complete')
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message)
    throw error
  }
}

// Export schema for use in queries
export * from './schema'
