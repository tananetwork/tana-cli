/**
 * Apply database migrations
 *
 * Runs all SQL migrations in the migrations folder
 */

import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { client } from '../db'

async function applyMigrations() {
  try {
    console.log('Applying database migrations...')

    // Get migrations directory
    const migrationsDir = join(import.meta.dir, '../../migrations')

    // Read all migration files
    const files = await readdir(migrationsDir)
    const sqlFiles = files
      .filter(f => f.endsWith('.sql'))
      .sort() // Apply in alphabetical order

    console.log('Found', sqlFiles.length, 'migration files')

    // Apply each migration
    for (const file of sqlFiles) {
      console.log('Applying migration:', file)

      const filePath = join(migrationsDir, file)
      const sql = await readFile(filePath, 'utf-8')

      await client.unsafe(sql)

      console.log('Applied:', file)
    }

    console.log('All migrations applied successfully!')

    // Close connection
    await client.end()
    process.exit(0)
  } catch (error) {
    console.error('Error applying migrations:', error)
    await client.end()
    process.exit(1)
  }
}

applyMigrations()
