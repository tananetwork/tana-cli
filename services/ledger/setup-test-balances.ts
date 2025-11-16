/**
 * Setup initial test balances for @droid
 */

import { sql } from 'drizzle-orm'
import { db } from './src/db'
import { eq } from 'drizzle-orm'
import { users } from './src/db/schema'

async function setupBalances() {
  console.log('Setting up test balances...\n')

  // Get @droid's user ID
  const [droid] = await db
    .select()
    .from(users)
    .where(eq(users.username, '@droid'))
    .limit(1)

  if (!droid) {
    console.error('✗ User @droid not found')
    process.exit(1)
  }

  console.log(`Found @droid: ${droid.id}`)

  // Give @droid $500 CAD
  await db.execute(sql`
    INSERT INTO balances (owner_id, owner_type, currency_code, amount)
    VALUES (${droid.id}, 'user', 'CAD', '500.00')
    ON CONFLICT (owner_id, currency_code)
    DO UPDATE SET amount = '500.00'
  `)

  console.log('✓ Set @droid balance to $500.00 CAD')
  console.log('\nReady to test transfers!')

  process.exit(0)
}

setupBalances().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
