/**
 * Apply Migration 0008: Add nonce field to users table
 *
 * This migration adds a nonce field for replay protection
 */

import postgres from 'postgres'

async function main() {
  // Load environment variables
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set')
    console.log('\nSet it in .env file:')
    console.log('DATABASE_URL="postgres://tana:tana_dev_password@localhost:5432/tana"')
    process.exit(1)
  }

  console.log('📦 Applying Migration 0008: Add nonce field to users')
  console.log('━'.repeat(60))

  const sql = postgres(databaseUrl)

  try {
    // Check if nonce column already exists
    const columns = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'nonce'
    `

    if (columns.length > 0) {
      console.log('✓ Nonce column already exists, skipping migration')
      await sql.end()
      return
    }

    console.log('\n1. Adding nonce column to users table...')
    await sql`
      ALTER TABLE users ADD COLUMN nonce BIGINT NOT NULL DEFAULT 0
    `
    console.log('✓ Added nonce column')

    console.log('\n2. Creating index on nonce column...')
    await sql`
      CREATE INDEX idx_users_nonce ON users(nonce)
    `
    console.log('✓ Created index')

    console.log('\n3. Adding column comment...')
    await sql`
      COMMENT ON COLUMN users.nonce IS 'Transaction nonce for replay protection - increments with each signed transaction'
    `
    console.log('✓ Added comment')

    console.log('\n━'.repeat(60))
    console.log('✅ Migration 0008 applied successfully!')
    console.log('\nNext steps:')
    console.log('  • All new transactions will use Ed25519 signatures')
    console.log('  • Nonce will be validated for replay protection')
    console.log('  • Existing users have nonce initialized to 0')

  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message)
    throw error
  } finally {
    await sql.end()
  }
}

main().catch(console.error)
