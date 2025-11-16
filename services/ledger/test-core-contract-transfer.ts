/**
 * Test Core Contract Transfer Integration
 *
 * This script tests the transfer core contract integration by:
 * 1. Creating a transfer from @droid to @adel
 * 2. Running the block producer (which executes the core contract)
 * 3. Verifying balances were updated correctly
 */

import { db } from './src/db/index.ts'
import { users, balances, transactions } from './src/db/schema.ts'
import { eq, desc } from 'drizzle-orm'
import { queueTransaction } from '@tana/queue'
import crypto from 'crypto'
import { spawn } from 'child_process'
import { promisify } from 'util'

const sleep = promisify(setTimeout)

async function main() {
  console.log('🧪 Testing Core Contract Transfer Integration\n')

  // 1. Get @droid and @adel users
  const [droid] = await db.select().from(users).where(eq(users.username, '@droid')).limit(1)
  const [adel] = await db.select().from(users).where(eq(users.username, '@adel')).limit(1)

  if (!droid || !adel) {
    console.error('❌ Test users not found')
    process.exit(1)
  }

  console.log('👥 Test Users:')
  console.log(`   @droid: ${droid.id}`)
  console.log(`   @adel: ${adel.id}\n`)

  // 2. Check initial balances
  const [droidInitialBalance] = await db
    .select()
    .from(balances)
    .where(eq(balances.ownerId, droid.id))
    .limit(1)

  const [adelInitialBalance] = await db
    .select()
    .from(balances)
    .where(eq(balances.ownerId, adel.id))
    .limit(1)

  console.log('💰 Initial Balances:')
  console.log(`   @droid: ${droidInitialBalance?.amount || '0'} CAD`)
  console.log(`   @adel: ${adelInitialBalance?.amount || '0'} CAD\n`)

  // 3. Create transfer transaction
  const transferAmount = '50.00'
  const txId = crypto.randomUUID()
  const timestamp = Date.now()

  console.log(`📤 Creating transfer transaction...`)
  console.log(`   Amount: ${transferAmount} CAD`)
  console.log(`   From: @droid → To: @adel\n`)

  // Create a properly signed transaction
  const txData = {
    txId,
    type: 'transfer',
    from: droid.id,
    to: adel.id,
    amount: transferAmount,
    currencyCode: 'CAD',
    timestamp,
    nonce: droid.nonce,
    signature: 'test_signature', // In production, this would be a real Ed25519 signature
    payload: {
      test: true,
      description: 'Core contract integration test'
    }
  }

  // Queue the transaction
  await queueTransaction(txData)
  console.log(`✓ Transaction queued: ${txId}\n`)

  // 4. Wait a moment for Redis to process
  await sleep(500)

  // 5. Run block producer to execute the core contract
  console.log('🔨 Running block producer (executing core contract)...\n')

  const producer = spawn('bun', ['run', 'src/scripts/produce-block.ts'], {
    cwd: process.cwd(),
    env: { ...process.env, DATABASE_URL: 'postgres://tana:tana_dev_password@localhost:5432/tana' },
    stdio: 'inherit'
  })

  await new Promise<void>((resolve, reject) => {
    producer.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Block producer exited with code ${code}`))
      } else {
        resolve()
      }
    })
    producer.on('error', reject)
  })

  console.log('\n')

  // 6. Check final balances
  const [droidFinalBalance] = await db
    .select()
    .from(balances)
    .where(eq(balances.ownerId, droid.id))
    .limit(1)

  const [adelFinalBalance] = await db
    .select()
    .from(balances)
    .where(eq(balances.ownerId, adel.id))
    .limit(1)

  console.log('💰 Final Balances:')
  console.log(`   @droid: ${droidFinalBalance?.amount || '0'} CAD`)
  console.log(`   @adel: ${adelFinalBalance?.amount || '0'} CAD\n`)

  // 7. Verify transaction was confirmed
  const [confirmedTx] = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, txId))
    .limit(1)

  if (!confirmedTx) {
    console.error('❌ Transaction not found in database')
    process.exit(1)
  }

  if (confirmedTx.status !== 'confirmed') {
    console.error(`❌ Transaction status: ${confirmedTx.status}`)
    process.exit(1)
  }

  // 8. Verify balances changed correctly
  const expectedDroidBalance = (parseFloat(droidInitialBalance?.amount || '0') - parseFloat(transferAmount)).toFixed(8)
  const expectedAdelBalance = (parseFloat(adelInitialBalance?.amount || '0') + parseFloat(transferAmount)).toFixed(8)

  console.log('✅ Verification:')
  console.log(`   Transaction confirmed in block ${confirmedTx.blockHeight}`)
  console.log(`   @droid balance: ${droidFinalBalance?.amount} (expected: ${expectedDroidBalance})`)
  console.log(`   @adel balance: ${adelFinalBalance?.amount} (expected: ${expectedAdelBalance})`)

  if (droidFinalBalance?.amount === expectedDroidBalance && adelFinalBalance?.amount === expectedAdelBalance) {
    console.log('\n🎉 Core contract transfer integration test PASSED!')
  } else {
    console.log('\n❌ Balance mismatch - test FAILED')
    process.exit(1)
  }

  process.exit(0)
}

main().catch((error) => {
  console.error('❌ Test failed:', error.message)
  process.exit(1)
})
