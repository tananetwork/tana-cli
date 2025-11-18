/**
 * Apply All Migrations Script
 *
 * Runs all migration files in order (0000-0011)
 */

import postgres from 'postgres'
import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://tana_ledger_user:ledger_dev_password@localhost:5432/tana_ledger'

async function main() {
  const sql = postgres(DATABASE_URL)

  console.log('📦 Applying all migrations...\n')
  console.log(`Database: ${DATABASE_URL.split('@')[1]}\n`)

  try {
    const migrationsDir = join(__dirname, '../../migrations')
    const files = readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort()

    for (const file of files) {
      console.log(`\n▶ Applying ${file}...`)

      const migrationPath = join(migrationsDir, file)
      const migrationSQL = readFileSync(migrationPath, 'utf-8')

      try {
        // Execute entire migration file at once
        await sql.unsafe(migrationSQL)
      } catch (error: any) {
        // Ignore "already exists" errors
        if (error.message?.includes('already exists')) {
          console.log(`  ⚠️  Object already exists, skipping...`)
        } else {
          throw error
        }
      }

      console.log(`  ✅ ${file} applied`)
    }

    console.log('\n🎉 All migrations completed successfully!')
  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

main()
