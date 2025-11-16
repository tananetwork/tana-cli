/**
 * Apply migration 0011 - Add contract_storage table (KV store)
 */

import postgres from 'postgres'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://tana:tana_dev_password@localhost:5432/tana'

async function main() {
  const sql = postgres(DATABASE_URL)

  console.log('📦 Applying migration 0011_contract_storage...\n')

  try {
    // Read migration file
    const migrationPath = join(__dirname, '../../migrations/0011_contract_storage.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')

    // Remove comments and split by semicolons
    const cleanedSQL = migrationSQL
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n')

    const statements = cleanedSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 80)}...`)
      await sql.unsafe(statement)
      console.log('✓ Success\n')
    }

    console.log('✅ Migration 0011 applied successfully!')
    console.log('\n📝 Contract storage table created with:')
    console.log('   - KV store for smart contracts')
    console.log('   - Gas metering metadata (size_bytes, access_count)')
    console.log('   - Indexes for efficient queries')
    console.log('   - Unique constraint per contract+key')
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

main()
