/**
 * Quick script to check balances for debugging
 */

import { db } from './src/db'
import { users, balances } from './src/db/schema'
import { eq, or } from 'drizzle-orm'

async function checkBalances() {
  console.log('Checking balances for @droid and @adel...\n')

  // Get users
  const targetUsers = await db
    .select()
    .from(users)
    .where(or(eq(users.username, '@droid'), eq(users.username, '@adel')))

  console.log('Users found:')
  for (const user of targetUsers) {
    console.log(`  ${user.username} (${user.id})`)
  }
  console.log()

  // Get balances
  console.log('Balances:')
  for (const user of targetUsers) {
    const userBalances = await db
      .select()
      .from(balances)
      .where(eq(balances.userId, user.id))

    console.log(`  ${user.username}:`)
    if (userBalances.length === 0) {
      console.log('    No balances found')
    } else {
      for (const balance of userBalances) {
        console.log(`    ${balance.currencyCode}: ${balance.amount}`)
      }
    }
  }

  process.exit(0)
}

checkBalances().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
