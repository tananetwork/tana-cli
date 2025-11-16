/**
 * Apply migration 0010 - Add contract function fields
 */

import postgres from 'postgres'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://tana:tana_dev_password@localhost:5432/tana'

async function main() {
  const sql = postgres(DATABASE_URL)

  console.log('📦 Applying migration 0010_add_contract_functions...\n')

  try {
    // Read migration file
    const migrationPath = join(__dirname, '../../migrations/0010_add_contract_functions.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')

    // Split by semicolons and execute each statement
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 60)}...`)
      await sql.unsafe(statement)
      console.log('✓ Success\n')
    }

    console.log('✅ Migration 0010 applied successfully!')
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

main()
