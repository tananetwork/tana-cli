#!/usr/bin/env bun

/**
 * Standalone migration runner script
 * Runs database migrations before services start
 *
 * Applies all SQL migration files manually because the Drizzle journal is out of sync
 */

import postgres from 'postgres'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:tana_dev_password@localhost:5432/tana'
const sql = postgres(dbUrl)

try {
  console.log('Running ledger database migrations...')

  // Find migrations directory
  const migrationsPath = join(import.meta.dir, '../migrations')

  // Get all SQL files (excluding .skip files)
  const migrationFiles = readdirSync(migrationsPath)
    .filter(f => f.endsWith('.sql') && !f.endsWith('.skip'))
    .sort() // Apply in order: 0000, 0001, 0002, etc.

  if (migrationFiles.length === 0) {
    console.log('⚠️  No migrations found')
    process.exit(0)
  }

  console.log(`📄 Found ${migrationFiles.length} migration(s)`)

  // Apply each migration
  for (const file of migrationFiles) {
    const filePath = join(migrationsPath, file)
    const migrationSQL = readFileSync(filePath, 'utf-8')

    // Execute the migration SQL
    await sql.unsafe(migrationSQL)
    console.log(`  ✅ ${file}`)
  }

  await sql.end()

  console.log('✓ Migrations complete')
  process.exit(0)
} catch (error: any) {
  console.error('✗ Migration failed:', error.message)
  await sql.end()
  process.exit(1)
}
