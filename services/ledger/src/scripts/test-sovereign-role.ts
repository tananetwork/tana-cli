/**
 * Test Script: Sovereign Role and Deposit/Withdraw
 *
 * This script demonstrates the sovereign role system:
 * 1. Creates a sovereign user
 * 2. Creates a regular user
 * 3. Performs deposit (mint) operation
 * 4. Performs withdraw (burn) operation
 * 5. Tests authorization (regular user cannot deposit/withdraw)
 */

import { randomBytes, createHash } from 'crypto'
import { getUserByUsername, isSovereign, getSovereigns } from '../accounts/users'
import { createTransaction, validateTransaction, confirmTransaction, getTransaction } from '../transactions'
import { getBalance } from '../balances'
import { db, users } from '../db'

const SYSTEM_ID = '00000000-0000-0000-0000-000000000000'

// Helper function to generate a simple signature
function generateSignature(data: any): string {
  return createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex')
}

async function runTest() {
  console.log('\n=== SOVEREIGN ROLE TEST ===\n')

  // Step 1: Create a sovereign user
  console.log('1. Creating sovereign user...')
  const sovereignPublicKey = randomBytes(32).toString('hex')
  const sovereignUsername = '@sovereign_test'

  // Check if user exists, if so delete
  const existingSovereign = await getUserByUsername(sovereignUsername)
  if (existingSovereign) {
    await db.delete(users).where({ id: existingSovereign.id })
    console.log('   Deleted existing sovereign user')
  }

  const [sovereign] = await db
    .insert(users)
    .values({
      publicKey: sovereignPublicKey,
      username: sovereignUsername,
      displayName: 'Sovereign Tester',
      role: 'sovereign',
      stateHash: generateSignature({ user: 'sovereign' })
    })
    .returning()

  console.log(`   ✅ Created sovereign: ${sovereign.username} (${sovereign.id})`)
  console.log(`   Role: ${sovereign.role}`)

  // Verify sovereign status
  const isSov = await isSovereign(sovereign.id)
  console.log(`   Is sovereign: ${isSov}\n`)

  // Step 2: Create a regular user
  console.log('2. Creating regular user...')
  const regularPublicKey = randomBytes(32).toString('hex')
  const regularUsername = '@regular_test'

  const existingRegular = await getUserByUsername(regularUsername)
  if (existingRegular) {
    await db.delete(users).where({ id: existingRegular.id })
    console.log('   Deleted existing regular user')
  }

  const [regularUser] = await db
    .insert(users)
    .values({
      publicKey: regularPublicKey,
      username: regularUsername,
      displayName: 'Regular User',
      role: 'user',
      stateHash: generateSignature({ user: 'regular' })
    })
    .returning()

  console.log(`   ✅ Created user: ${regularUser.username} (${regularUser.id})`)
  console.log(`   Role: ${regularUser.role}\n`)

  // Step 3: Test deposit (mint) by sovereign
  console.log('3. Testing deposit (mint) by sovereign...')
  const depositAmount = '1000.00'
  const currency = 'USD'

  const depositTx = await createTransaction({
    from: sovereign.id,
    to: regularUser.id,
    amount: depositAmount,
    currencyCode: currency,
    type: 'deposit',
    signature: generateSignature({ type: 'deposit', from: sovereign.id, to: regularUser.id, amount: depositAmount })
  })

  console.log(`   ✅ Created deposit transaction: ${depositTx.id}`)
  console.log(`   Type: ${depositTx.type}`)
  console.log(`   Amount: ${depositTx.amount} ${depositTx.currencyCode}`)
  console.log(`   Status: ${depositTx.status}\n`)

  // Confirm deposit
  console.log('4. Confirming deposit transaction...')
  const confirmedDeposit = await confirmTransaction({
    id: depositTx.id
  })

  console.log(`   ✅ Deposit confirmed!`)
  console.log(`   Status: ${confirmedDeposit.status}\n`)

  // Check balance
  console.log('5. Checking balance after deposit...')
  const balanceAfterDeposit = await getBalance({
    ownerId: regularUser.id,
    ownerType: 'user',
    currencyCode: currency
  })

  console.log(`   Balance: ${balanceAfterDeposit?.amount} ${currency}\n`)

  // Step 4: Test withdraw (burn) by sovereign
  console.log('6. Testing withdraw (burn) by sovereign...')
  const withdrawAmount = '250.00'

  const withdrawTx = await createTransaction({
    from: regularUser.id,
    to: sovereign.id,
    amount: withdrawAmount,
    currencyCode: currency,
    type: 'withdraw',
    signature: generateSignature({ type: 'withdraw', from: sovereign.id, to: regularUser.id, amount: withdrawAmount })
  })

  console.log(`   ✅ Created withdraw transaction: ${withdrawTx.id}`)
  console.log(`   Type: ${withdrawTx.type}`)
  console.log(`   Amount: ${withdrawTx.amount} ${withdrawTx.currencyCode}`)
  console.log(`   Status: ${withdrawTx.status}\n`)

  // Confirm withdraw
  console.log('7. Confirming withdraw transaction...')
  const confirmedWithdraw = await confirmTransaction({
    id: withdrawTx.id
  })

  console.log(`   ✅ Withdraw confirmed!`)
  console.log(`   Status: ${confirmedWithdraw.status}\n`)

  // Check balance
  console.log('8. Checking balance after withdraw...')
  const balanceAfterWithdraw = await getBalance({
    ownerId: regularUser.id,
    ownerType: 'user',
    currencyCode: currency
  })

  console.log(`   Balance: ${balanceAfterWithdraw?.amount} ${currency}`)
  console.log(`   Expected: ${parseFloat(depositAmount) - parseFloat(withdrawAmount)}.00\n`)

  // Step 5: Test authorization (regular user cannot deposit)
  console.log('9. Testing authorization (regular user trying to deposit)...')
  try {
    const unauthorizedDeposit = await createTransaction({
      from: regularUser.id,
      to: sovereign.id,
      amount: '500.00',
      currencyCode: currency,
      type: 'deposit',
      signature: generateSignature({ type: 'deposit', from: regularUser.id })
    })

    // This should fail validation
    const validation = await validateTransaction({
      from: regularUser.id,
      to: sovereign.id,
      amount: '500.00',
      currencyCode: currency,
      type: 'deposit',
      signature: generateSignature({ type: 'deposit' })
    })

    if (!validation.valid) {
      console.log(`   ✅ Authorization check worked!`)
      console.log(`   Error: ${validation.error}\n`)
    } else {
      console.log(`   ❌ Authorization check failed - regular user was allowed to deposit!\n`)
    }
  } catch (error: any) {
    console.log(`   ✅ Authorization check worked!`)
    console.log(`   Error: ${error.message}\n`)
  }

  // List all sovereigns
  console.log('10. Listing all sovereign users...')
  const sovereigns = await getSovereigns()
  console.log(`   Found ${sovereigns.length} sovereign user(s):`)
  for (const sov of sovereigns) {
    console.log(`   - ${sov.username} (${sov.id})`)
  }

  console.log('\n=== TEST COMPLETE ===\n')

  process.exit(0)
}

runTest().catch((error) => {
  console.error('Test failed:', error)
  process.exit(1)
})
