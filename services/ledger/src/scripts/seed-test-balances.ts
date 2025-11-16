/**
 * Seed Test Balances
 *
 * Quick script to give existing test accounts some balance for testing transfers
 */

import { db, users, balances, currencies } from '../db'
import { eq } from 'drizzle-orm'
import { getCurrency, createCurrency } from '../balances'

async function seedTestBalances() {
  console.log('\n💰 === SEEDING TEST BALANCES ===\n')

  // Ensure CAD currency exists
  console.log('1️⃣  Checking for CAD currency...')
  let cad = await getCurrency('CAD')
  if (!cad) {
    cad = await createCurrency({
      code: 'CAD',
      type: 'fiat',
      decimals: 2,
      name: 'Canadian Dollar',
      symbol: '$',
      verified: true
    })
    console.log('   ✅ Created CAD currency\n')
  } else {
    console.log('   ✅ CAD currency exists\n')
  }

  // Get all users
  console.log('2️⃣  Finding all users...')
  const allUsers = await db.select().from(users)
  console.log(`   ✅ Found ${allUsers.length} user(s)\n`)

  if (allUsers.length === 0) {
    console.log('   ⚠️  No users found. Create some accounts in the mobile app first!')
    process.exit(0)
  }

  // Give each user 1000 CAD
  console.log('3️⃣  Setting balances...')
  for (const user of allUsers) {
    // Check if balance already exists
    const [existingBalance] = await db
      .select()
      .from(balances)
      .where(
        eq(balances.ownerId, user.id)
      )
      .limit(1)

    if (existingBalance) {
      // Update existing balance to 1000 CAD
      await db
        .update(balances)
        .set({
          amount: '1000.00',
          currencyCode: 'CAD',
          ownerType: 'user',
          updatedAt: new Date()
        })
        .where(eq(balances.id, existingBalance.id))

      console.log(`   ✅ ${user.username}: Updated to $1000.00 CAD`)
    } else {
      // Create new balance
      await db
        .insert(balances)
        .values({
          ownerId: user.id,
          ownerType: 'user',
          currencyCode: 'CAD',
          amount: '1000.00'
        })

      console.log(`   ✅ ${user.username}: Created with $1000.00 CAD`)
    }
  }

  console.log('\n✅ === BALANCE SEEDING COMPLETE ===\n')
  console.log('🎉 All users now have $1000.00 CAD to test with!\n')

  process.exit(0)
}

seedTestBalances().catch((error) => {
  console.error('❌ Failed to seed balances:', error)
  process.exit(1)
})
