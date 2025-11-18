/**
 * Deposit from Sovereign (Development Only)
 *
 * Creates REAL blockchain transactions from sovereign account to users.
 * Unlike seed-test-balances.ts, this goes through the proper transaction system:
 * - Signs transactions with sovereign private key
 * - Submits to transaction queue
 * - Block producer processes them
 * - Creates audit trail in transactions table
 *
 * Usage:
 * 1. Load sovereign credentials: source /path/to/dev-env/local/.env.sovereign
 * 2. Run: bun run src/scripts/deposit-from-sovereign.ts <username> <amount> <currency>
 *
 * Example: bun run src/scripts/deposit-from-sovereign.ts @mac 1000 USD
 */

import { db, users } from '../db'
import { eq } from 'drizzle-orm'
import { signMessage } from '@tananetwork/crypto'

async function depositFromSovereign() {
  const sovereignPrivateKey = process.env.SOVEREIGN_PRIVATE_KEY
  const sovereignPublicKey = process.env.SOVEREIGN_PUBLIC_KEY
  const sovereignUsername = process.env.SOVEREIGN_USERNAME || '@sovereign'

  // Parse arguments
  const targetUsername = process.argv[2]
  const amount = parseFloat(process.argv[3])
  const currencyCode = process.argv[4] || 'USD'

  // Validate arguments
  if (!targetUsername || !amount || isNaN(amount)) {
    console.error('❌ Usage: bun run deposit-from-sovereign.ts <username> <amount> [currency]')
    console.error('   Example: bun run deposit-from-sovereign.ts @mac 1000 USD')
    process.exit(1)
  }

  if (!sovereignPrivateKey || !sovereignPublicKey) {
    console.error('❌ Sovereign credentials not found!')
    console.error('   Load .env.sovereign: source /path/to/dev-env/local/.env.sovereign')
    console.error('   Or set: SOVEREIGN_PRIVATE_KEY and SOVEREIGN_PUBLIC_KEY')
    process.exit(1)
  }

  console.log('\n💸 === SOVEREIGN DEPOSIT ===\n')

  try {
    // Get sovereign user
    const [sovereign] = await db
      .select()
      .from(users)
      .where(eq(users.username, sovereignUsername))
      .limit(1)

    if (!sovereign) {
      console.error(`❌ Sovereign user ${sovereignUsername} not found!`)
      console.error('   Run genesis with sovereign credentials first.')
      process.exit(1)
    }

    // Get target user
    const [targetUser] = await db
      .select()
      .from(users)
      .where(eq(users.username, targetUsername))
      .limit(1)

    if (!targetUser) {
      console.error(`❌ User ${targetUsername} not found!`)
      process.exit(1)
    }

    console.log('📋 Transaction Details:')
    console.log(`  From: ${sovereignUsername} (sovereign)`)
    console.log(`  To: ${targetUsername}`)
    console.log(`  Amount: ${amount} ${currencyCode}`)
    console.log(`  Type: deposit\n`)

    // Create transaction message
    const timestamp = Date.now()
    const nonce = sovereign.nonce + 1 // Increment nonce

    const transactionData = {
      type: 'deposit',
      from: sovereign.id,
      to: targetUser.id,
      amount,
      currencyCode,
      nonce,
      timestamp
    }

    const message = JSON.stringify(transactionData)

    console.log('🔐 Signing transaction with sovereign key...')

    // Sign with sovereign private key
    const signature = await signMessage(message, sovereignPrivateKey)

    console.log('  ✅ Transaction signed\n')

    // Submit to ledger API
    console.log('📤 Submitting to ledger API...')

    const ledgerUrl = process.env.LEDGER_API_URL || 'http://localhost:8080'
    const response = await fetch(`${ledgerUrl}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...transactionData,
        signature,
        message
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('❌ Failed to submit transaction:', error)
      process.exit(1)
    }

    const result = await response.json()
    console.log('  ✅ Transaction submitted to queue\n')

    console.log('📦 Transaction Details:')
    console.log(`  ID: ${result.id}`)
    console.log(`  Status: ${result.status}`)
    console.log(`  Signature: ${signature.substring(0, 32)}...`)
    console.log('')

    console.log('⏳ Waiting for block producer to process transaction...')
    console.log('   (Block producer runs every 6 seconds)')
    console.log('')
    console.log('✅ === DEPOSIT COMPLETE ===')
    console.log('')
    console.log('📊 To verify:')
    console.log(`   1. Check transaction status: curl ${ledgerUrl}/transactions/${result.id}`)
    console.log(`   2. Check ${targetUsername} balance: curl ${ledgerUrl}/balances?userId=${targetUser.id}`)
    console.log(`   3. Check blockchain: curl ${ledgerUrl}/blocks?limit=1`)
    console.log('')

  } catch (error: any) {
    console.error('❌ Error creating deposit:', error.message)
    process.exit(1)
  }

  process.exit(0)
}

depositFromSovereign()
