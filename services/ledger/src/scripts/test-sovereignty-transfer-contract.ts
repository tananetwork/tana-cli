/**
 * Test Script: Sovereignty Transfer via Smart Contract
 *
 * This demonstrates governance via smart contracts instead of API endpoints.
 * The sovereignty transfer logic is transparent, auditable, and on-chain.
 */

import { randomBytes, createHash } from 'crypto'
import { getUserByUsername, getSovereigns } from '../accounts/users'
import { createTransaction, getTransaction } from '../transactions'
import { db, users, transactions } from '../db'
import { eq } from 'drizzle-orm'
import { readFileSync } from 'fs'
import { join } from 'path'

function generateSignature(data: any): string {
  return createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex')
}

async function runTest() {
  console.log('\n👑 === SOVEREIGNTY TRANSFER VIA SMART CONTRACT ===\n')

  // Step 1: Create two users - current sovereign and future sovereign
  console.log('📋 SETUP: Creating test users...\n')

  const timestamp = Date.now().toString().slice(-6)

  // Create current sovereign
  const [currentSovereign] = await db
    .insert(users)
    .values({
      publicKey: randomBytes(32).toString('hex'),
      username: `@sovereign_${timestamp}`,
      displayName: 'Current Sovereign',
      role: 'sovereign',
      stateHash: generateSignature({ user: 'sovereign' })
    })
    .returning()

  console.log(`✅ Created current sovereign: ${currentSovereign.username}`)
  console.log(`   Role: ${currentSovereign.role} 👑\n`)

  // Create future sovereign (currently regular user)
  const [futureS overeign] = await db
    .insert(users)
    .values({
      publicKey: randomBytes(32).toString('hex'),
      username: `@alice_${timestamp}`,
      displayName: 'Alice (Future Sovereign)',
      role: 'user',
      stateHash: generateSignature({ user: 'alice' })
    })
    .returning()

  console.log(`✅ Created future sovereign: ${futureSovereign.username}`)
  console.log(`   Role: ${futureSovereign.role} 👤\n`)

  // Step 2: Deploy the sovereignty transfer contract
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📜 DEPLOY: Sovereignty Transfer Contract')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // Read contract source
  const contractSource = readFileSync(
    join(process.cwd(), '..', 'contracts', 'core', 'transfer-sovereignty.ts'),
    'utf-8'
  )

  const contractCodeHash = createHash('sha256')
    .update(contractSource)
    .digest('hex')

  // Create contract deployment transaction
  const contractId = crypto.randomUUID()

  const deploymentTx = await createTransaction({
    from: currentSovereign.id,
    to: contractId,
    type: 'contract_deployment',
    signature: generateSignature({ type: 'deploy', source: contractSource }),
    contractInput: {
      name: 'transfer-sovereignty',
      sourceCode: contractSource,
      codeHash: contractCodeHash,
      version: '1.0.0',
      description: 'Atomic sovereignty transfer between users'
    }
  })

  console.log(`✅ Contract deployment transaction created`)
  console.log(`   Contract ID: ${contractId}`)
  console.log(`   Transaction: ${deploymentTx.id}`)
  console.log(`   Status: ${deploymentTx.status}\n`)

  console.log('⏳ Note: Contract will be deployed when next block is produced\n')

  // Step 3: Execute sovereignty transfer via contract call
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🔄 EXECUTE: Transfer Sovereignty')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  console.log(`📋 Current sovereign: ${currentSovereign.username}`)
  console.log(`📋 Future sovereign: ${futureSovereign.username}\n`)

  // Create contract call transaction
  const callTx = await createTransaction({
    from: currentSovereign.id,
    to: futureSovereign.id, // Target of the transfer
    type: 'contract_call',
    signature: generateSignature({ type: 'call', contract: contractId }),
    contractId: contractId,
    contractInput: {
      newSovereignId: futureSovereign.id
    }
  })

  console.log(`✅ Contract call transaction created`)
  console.log(`   Transaction: ${callTx.id}`)
  console.log(`   Status: ${callTx.status}`)
  console.log(`   Contract: ${contractId}\n`)

  console.log('⏳ Contract will execute during block production\n')

  // Step 4: Show what will happen
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 EXPECTED OUTCOME')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  console.log('When block is produced, the contract will:')
  console.log('1. Verify caller is current sovereign ✓')
  console.log('2. Verify new sovereign user exists ✓')
  console.log('3. Create role_change transactions:')
  console.log(`   → Demote ${currentSovereign.username}: sovereign → user`)
  console.log(`   → Promote ${futureSovereign.username}: user → sovereign`)
  console.log('4. Block producer executes role changes atomically\n')

  // Step 5: Show next steps
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🎯 NEXT STEPS')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  console.log('To complete the transfer:')
  console.log('1. Run: bun src/scripts/produce-block.ts')
  console.log('2. The block producer will:')
  console.log('   - Deploy the contract')
  console.log('   - Execute the contract call')
  console.log('   - Apply role changes')
  console.log('3. Verify: Check that sovereignty was transferred\n')

  // Show pending transactions
  const pending = await db
    .select()
    .from(transactions)
    .where(eq(transactions.status, 'pending'))

  console.log(`📊 Pending transactions: ${pending.length}`)
  for (const tx of pending) {
    console.log(`   - ${tx.type} (${tx.id.slice(0, 8)})`)
  }
  console.log()

  console.log('✅ Smart contract governance setup complete!')
  console.log('   All logic is transparent and on-chain\n')

  process.exit(0)
}

runTest().catch((error) => {
  console.error('❌ Test failed:', error)
  process.exit(1)
})
