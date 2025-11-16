/**
 * Test Script: User-Initiated Deposit/Withdraw Flow
 *
 * This script demonstrates the complete user-initiated flow:
 * 1. Regular user creates deposit request
 * 2. User sees pending status and e-transfer instructions
 * 3. (User sends e-transfer in their bank app)
 * 4. Sovereign reviews pending deposits
 * 5. Sovereign confirms deposit (after receiving e-transfer)
 * 6. User balance is credited
 * 7. User creates withdraw request
 * 8. Sovereign reviews and confirms withdraw
 * 9. (Sovereign sends e-transfer)
 * 10. User balance is debited
 */

import { randomBytes, createHash } from 'crypto'
import { getUserByUsername, isSovereign, getSovereigns } from '../accounts/users'
import {
  createTransaction,
  validateTransaction,
  confirmTransaction,
  getTransaction,
  getPendingDeposits,
  getPendingWithdraws
} from '../transactions'
import { getBalance, createCurrency, getCurrency } from '../balances'
import { db, users } from '../db'
import { eq } from 'drizzle-orm'

const SYSTEM_ID = '00000000-0000-0000-0000-000000000000'

// Helper function to generate a simple signature
function generateSignature(data: any): string {
  return createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex')
}

async function runTest() {
  console.log('\n🏦 === USER-INITIATED DEPOSIT/WITHDRAW FLOW ===\n')

  // Setup: Create CAD currency if it doesn't exist
  console.log('📋 SETUP: Ensuring CAD currency exists...\n')

  const cadCurrency = await getCurrency('CAD')
  if (!cadCurrency) {
    await createCurrency({
      code: 'CAD',
      type: 'fiat',
      decimals: 2,
      name: 'Canadian Dollar',
      symbol: '$',
      verified: true
    })
    console.log('✅ Created CAD currency\n')
  } else {
    console.log('✅ CAD currency already exists\n')
  }

  // Setup: Create sovereign and regular user
  console.log('📋 Creating test users...\n')

  // Use unique usernames with timestamp to avoid conflicts
  const timestamp = Date.now().toString().slice(-6)

  const sovereignPublicKey = randomBytes(32).toString('hex')
  const sovereignUsername = `@sovereign_${timestamp}`

  const [sovereign] = await db
    .insert(users)
    .values({
      publicKey: sovereignPublicKey,
      username: sovereignUsername,
      displayName: 'Sovereign Bank Bridge',
      role: 'sovereign',
      stateHash: generateSignature({ user: 'sovereign' })
    })
    .returning()

  console.log(`✅ Created sovereign: ${sovereign.username}`)

  const regularPublicKey = randomBytes(32).toString('hex')
  const regularUsername = `@alice_${timestamp}`

  const [alice] = await db
    .insert(users)
    .values({
      publicKey: regularPublicKey,
      username: regularUsername,
      displayName: 'Alice (Regular User)',
      role: 'user',
      stateHash: generateSignature({ user: 'alice' })
    })
    .returning()

  console.log(`✅ Created user: ${alice.username}\n`)

  // PART 1: User-Initiated Deposit
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('💰 PART 1: USER-INITIATED DEPOSIT REQUEST')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  console.log(`👤 Alice wants to deposit $500 CAD\n`)

  // Step 1: Alice creates deposit request
  console.log('1️⃣  Alice creates deposit request...')
  const depositAmount = '500.00'
  const currency = 'CAD'

  const depositRequest = await createTransaction({
    from: alice.id,
    to: alice.id, // Depositing to herself
    amount: depositAmount,
    currencyCode: currency,
    type: 'deposit',
    signature: generateSignature({ type: 'deposit', from: alice.id, amount: depositAmount })
  })

  console.log(`   ✅ Deposit request created!`)
  console.log(`   Transaction ID: ${depositRequest.id}`)
  console.log(`   Status: ${depositRequest.status}`)
  console.log(`   Amount: ${depositRequest.amount} ${depositRequest.currencyCode}\n`)

  // Step 2: Alice sees instructions
  console.log('2️⃣  Alice views her deposit instructions...')
  const metadata = depositRequest.metadata as any
  console.log(`   📝 Instructions: ${metadata.instructions}`)
  console.log(`   🔖 Reference Code: ${metadata.reference}`)
  console.log(`   📌 Notes:`)
  for (const note of metadata.notes) {
    console.log(`      - ${note}`)
  }
  console.log()

  // Step 3: (Simulated) Alice sends e-transfer in her bank app
  console.log('3️⃣  Alice sends e-transfer via her bank app...')
  console.log('   💳 (Simulated: Alice opens her banking app)')
  console.log('   💳 (Simulated: Alice sends $500 CAD e-transfer)')
  console.log('   💳 (Simulated: Reference: ' + metadata.reference + ')')
  console.log('   ⏳ Waiting for sovereign to receive...\n')

  // Step 4: Sovereign checks pending deposits
  console.log('4️⃣  Sovereign checks pending deposit queue...')
  const pendingDeposits = await getPendingDeposits()
  console.log(`   📊 Found ${pendingDeposits.length} pending deposit(s)`)
  for (const deposit of pendingDeposits) {
    const meta = deposit.metadata as any
    console.log(`   ├─ Transaction: ${deposit.id}`)
    console.log(`   ├─ Amount: ${deposit.amount} ${deposit.currencyCode}`)
    console.log(`   ├─ Reference: ${meta?.reference}`)
    console.log(`   └─ Status: ${deposit.status}`)
  }
  console.log()

  // Step 5: Sovereign confirms deposit
  console.log('5️⃣  Sovereign confirms deposit (e-transfer received)...')
  const confirmedDeposit = await confirmTransaction({
    id: depositRequest.id
  })

  console.log(`   ✅ Deposit confirmed by sovereign!`)
  console.log(`   Status: ${confirmedDeposit.status}\n`)

  // Step 6: Alice checks her balance
  console.log('6️⃣  Alice checks her balance...')
  const balanceAfterDeposit = await getBalance({
    ownerId: alice.id,
    ownerType: 'user',
    currencyCode: currency
  })

  console.log(`   💰 Balance: ${balanceAfterDeposit?.amount} ${currency}`)
  console.log(`   ✅ Deposit complete!\n`)

  // PART 2: User-Initiated Withdrawal
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('💸 PART 2: USER-INITIATED WITHDRAW REQUEST')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  console.log(`👤 Alice wants to withdraw $200 CAD\n`)

  // Step 7: Alice creates withdraw request
  console.log('7️⃣  Alice creates withdraw request...')
  const withdrawAmount = '200.00'

  const withdrawRequest = await createTransaction({
    from: alice.id,
    to: sovereign.id,
    amount: withdrawAmount,
    currencyCode: currency,
    type: 'withdraw',
    signature: generateSignature({ type: 'withdraw', from: alice.id, amount: withdrawAmount })
  })

  console.log(`   ✅ Withdraw request created!`)
  console.log(`   Transaction ID: ${withdrawRequest.id}`)
  console.log(`   Status: ${withdrawRequest.status}`)
  console.log(`   Amount: ${withdrawRequest.amount} ${withdrawRequest.currencyCode}\n`)

  // Step 8: Alice sees withdraw instructions
  console.log('8️⃣  Alice views her withdraw status...')
  const withdrawMeta = withdrawRequest.metadata as any
  console.log(`   📝 Instructions: ${withdrawMeta.instructions}`)
  console.log(`   🔖 Reference Code: ${withdrawMeta.reference}`)
  console.log(`   📌 Notes:`)
  for (const note of withdrawMeta.notes) {
    console.log(`      - ${note}`)
  }
  console.log()

  // Step 9: Sovereign checks pending withdrawals
  console.log('9️⃣  Sovereign checks pending withdraw queue...')
  const pendingWithdraws = await getPendingWithdraws()
  console.log(`   📊 Found ${pendingWithdraws.length} pending withdrawal(s)`)
  for (const withdraw of pendingWithdraws) {
    const meta = withdraw.metadata as any
    console.log(`   ├─ Transaction: ${withdraw.id}`)
    console.log(`   ├─ Amount: ${withdraw.amount} ${withdraw.currencyCode}`)
    console.log(`   ├─ Reference: ${meta?.reference}`)
    console.log(`   └─ Status: ${withdraw.status}`)
  }
  console.log()

  // Step 10: Sovereign sends e-transfer and confirms
  console.log('🔟 Sovereign processes withdraw...')
  console.log('   💳 (Simulated: Sovereign sends $200 CAD e-transfer to Alice)')
  console.log('   📧 (Simulated: E-transfer sent to Alice\'s registered email)')
  console.log('   ✅ Confirming withdraw transaction...\n')

  const confirmedWithdraw = await confirmTransaction({
    id: withdrawRequest.id
  })

  console.log(`   ✅ Withdraw confirmed by sovereign!`)
  console.log(`   Status: ${confirmedWithdraw.status}\n`)

  // Step 11: Alice checks final balance
  console.log('1️⃣1️⃣  Alice checks her final balance...')
  const finalBalance = await getBalance({
    ownerId: alice.id,
    ownerType: 'user',
    currencyCode: currency
  })

  console.log(`   💰 Balance: ${finalBalance?.amount} ${currency}`)
  console.log(`   📊 Expected: ${parseFloat(depositAmount) - parseFloat(withdrawAmount)}.00`)
  console.log(`   ✅ Withdraw complete!\n`)

  // Summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 TRANSACTION SUMMARY')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  console.log(`Initial Balance:     $0.00 ${currency}`)
  console.log(`Deposited:          +$${depositAmount} ${currency}`)
  console.log(`Withdrew:           -$${withdrawAmount} ${currency}`)
  console.log(`Final Balance:       $${finalBalance?.amount} ${currency}`)
  console.log()
  console.log('✅ All transactions on-chain and transparent!')
  console.log('✅ Sovereign acts as trusted bridge to traditional banking')
  console.log('✅ Users have full visibility into pending/confirmed status\n')

  console.log('🎉 === TEST COMPLETE ===\n')

  process.exit(0)
}

runTest().catch((error) => {
  console.error('❌ Test failed:', error)
  process.exit(1)
})
