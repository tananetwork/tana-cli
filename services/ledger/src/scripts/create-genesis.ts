/**
 * Create Genesis Block (Block #0)
 *
 * Creates the first block in the Tana blockchain
 *
 * Usage: bun run src/scripts/create-genesis.ts
 */

import { db } from '../db'
import { blocks, currencies, users, balances } from '../db/schema'
import { sql } from 'drizzle-orm'
import { computeBlockHash, hashObject, hashString } from '../utils/merkle'

async function createGenesisBlock() {
  console.log('🌱 Creating Genesis Block (Block #0)...')
  console.log('')

  try {
    // Check if genesis block already exists
    const existing = await db.execute(sql`SELECT height FROM blocks WHERE height = 0`)
    if (existing.length > 0) {
      console.log('⚠️  Genesis block already exists!')
      console.log('If you want to recreate it, run: bun run src/scripts/flush-blockchain.ts')
      process.exit(0)
    }

    const genesisTimestamp = new Date('2024-11-03T00:00:00Z')
    const producer = '00000000-0000-0000-0000-000000000000' // Special genesis producer UUID

    // Genesis block has no transactions or state changes
    const transactions: any[] = []
    const stateChanges: any[] = []
    const contentRefs: any[] = []

    // Calculate roots using hashObject for consistency with verification
    const txRoot = hashObject(transactions) // Empty transaction array hash
    const stateRoot = hashString('empty-tree') // Empty state tree (no accounts yet)

    // Build block content for hashing
    const blockContent = {
      height: 0,
      previousHash: '0'.repeat(64),
      timestamp: genesisTimestamp,
      producer,
      transactions,
      stateChanges,
      contentRefs,
      txRoot,
      stateRoot,
      gasUsed: 0,
      gasLimit: 1000000
    }

    // Calculate block hash
    const hash = computeBlockHash(blockContent)

    // Insert genesis block
    await db.insert(blocks).values({
      height: 0,
      hash,
      previousHash: '0'.repeat(64),
      timestamp: genesisTimestamp,
      producer,
      transactions: transactions as any, // JSONB - empty array
      stateChanges: stateChanges as any, // JSONB - empty array
      contentRefs: contentRefs as any,   // JSONB - empty array
      txRoot,
      stateRoot,
      txCount: 0,
      gasUsed: 0,
      gasLimit: 1000000,
      signature: 'genesis_signature',
      finalizedAt: genesisTimestamp // Genesis is immediately final
    })

    console.log('✅ Genesis block created!')
    console.log('')
    console.log('Block Details:')
    console.log('  Height:', 0)
    console.log('  Hash:', hash)
    console.log('  Previous Hash:', '0'.repeat(64))
    console.log('  Timestamp:', genesisTimestamp.toISOString())
    console.log('  Transactions:', 0, '(self-contained)')
    console.log('  State Changes:', 0)
    console.log('  TX Root:', txRoot)
    console.log('  State Root:', stateRoot)
    console.log('  Gas Limit:', 1000000)
    console.log('')
    console.log('🔒 Cryptographic Verification:')
    console.log('  ✓ Block is self-contained (empty genesis state)')
    console.log('  ✓ Transaction root computed (empty tree)')
    console.log('  ✓ State root computed (empty tree)')
    console.log('  ✓ Block hash is deterministic and verifiable')
    console.log('')

    // Initialize base currencies
    console.log('Initializing base currencies...')

    await db.insert(currencies).values([
      {
        code: 'USD',
        type: 'fiat',
        decimals: '2',
        verified: true,
        name: 'US Dollar',
        symbol: '$'
      },
      {
        code: 'BTC',
        type: 'crypto',
        decimals: '8',
        verified: true,
        name: 'Bitcoin',
        symbol: '₿'
      },
      {
        code: 'ETH',
        type: 'crypto',
        decimals: '8',
        verified: true,
        name: 'Ethereum',
        symbol: 'Ξ'
      }
    ]).onConflictDoNothing()

    console.log('✅ Base currencies initialized')
    console.log('')

    // Create sovereign account if credentials are provided
    const sovereignPublicKey = process.env.SOVEREIGN_PUBLIC_KEY
    const sovereignUsername = process.env.SOVEREIGN_USERNAME || '@sovereign'
    const sovereignDisplayName = process.env.SOVEREIGN_DISPLAY_NAME || 'Network Sovereign'

    if (sovereignPublicKey) {
      console.log('👑 Creating sovereign account...')

      // Create sovereign user
      const [sovereign] = await db.insert(users).values({
        publicKey: sovereignPublicKey,
        username: sovereignUsername,
        displayName: sovereignDisplayName,
        role: 'sovereign',
        stateHash: hashString('sovereign_genesis_state'),
        nonce: 0
      }).returning()

      console.log(`  ✅ Sovereign user created: ${sovereignUsername}`)
      console.log(`  📋 User ID: ${sovereign.id}`)
      console.log(`  🔑 Public Key: ${sovereignPublicKey}`)
      console.log('')

      // Create sovereign balances
      console.log('💰 Allocating sovereign initial balances...')

      const initialUSD = parseInt(process.env.SOVEREIGN_INITIAL_USD || '1000000000')
      const initialBTC = parseInt(process.env.SOVEREIGN_INITIAL_BTC || '100000')
      const initialETH = parseInt(process.env.SOVEREIGN_INITIAL_ETH || '1000000')

      await db.insert(balances).values([
        {
          userId: sovereign.id,
          currencyCode: 'USD',
          amount: initialUSD.toString()
        },
        {
          userId: sovereign.id,
          currencyCode: 'BTC',
          amount: initialBTC.toString()
        },
        {
          userId: sovereign.id,
          currencyCode: 'ETH',
          amount: initialETH.toString()
        }
      ])

      console.log(`  ✅ ${initialUSD.toLocaleString()} USD`)
      console.log(`  ✅ ${initialBTC.toLocaleString()} BTC`)
      console.log(`  ✅ ${initialETH.toLocaleString()} ETH`)
      console.log('')
    } else {
      console.log('⚠️  No sovereign credentials provided (SOVEREIGN_PUBLIC_KEY not set)')
      console.log('   Sovereign account not created - you can add one later')
      console.log('')
    }

    console.log('🎉 Blockchain initialized successfully!')

  } catch (error: any) {
    console.error('❌ Error creating genesis block:', error.message)
    process.exit(1)
  }

  process.exit(0)
}

createGenesisBlock()
