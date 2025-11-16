/**
 * Add unique constraint to balances table
 *
 * Fixes: ON CONFLICT error preventing transfers from working
 */

import { sql } from 'drizzle-orm'
import { db } from './src/db'

async function addConstraint() {
  console.log('Adding unique constraint to balances table...')

  try {
    // Add the unique constraint
    await db.execute(sql`
      ALTER TABLE balances
      ADD CONSTRAINT balances_owner_id_currency_code_unique
      UNIQUE (owner_id, currency_code)
    `)

    console.log('✓ Successfully added unique constraint')
    console.log('  Constraint: balances_owner_id_currency_code_unique')
    console.log('  Columns: (owner_id, currency_code)')

  } catch (error: any) {
    // Check if constraint already exists
    if (error.message && error.message.includes('already exists')) {
      console.log('✓ Constraint already exists, skipping')
      process.exit(0)
    }

    console.error('✗ Failed to add constraint:', error.message)
    process.exit(1)
  }

  process.exit(0)
}

addConstraint()
