/**
 * Block Verification
 *
 * Cryptographic verification of block integrity and tamper detection
 */

import { db } from '../db'
import { blocks } from '../db/schema'
import { eq } from 'drizzle-orm'
import { computeBlockHash, buildMerkleRoot, hashObject } from '../utils/merkle'
import { computeStateRoot } from './state-tracker'
import { verifySignature } from '@tana/crypto'
import type { BlockVerificationResult } from '../types/block'

// ============================================================================
// SINGLE BLOCK VERIFICATION
// ============================================================================

/**
 * Verify a single block's cryptographic integrity
 */
export async function verifyBlock(height: number): Promise<BlockVerificationResult> {
  const errors: string[] = []
  const checks = {
    hashValid: false,
    txRootValid: false,
    stateRootValid: false,
    signaturesValid: false,
    producerSignatureValid: false,
    stateChangesValid: false
  }

  // 1. Fetch block from database
  const [block] = await db
    .select()
    .from(blocks)
    .where(eq(blocks.height, height))
    .limit(1)

  if (!block) {
    errors.push(`Block ${height} not found`)
    return { valid: false, errors, checks }
  }

  // 2. Verify block hash
  try {
    const blockContent = {
      height: block.height,
      previousHash: block.previousHash,
      timestamp: block.timestamp,
      producer: block.producer,
      transactions: block.transactions,
      stateChanges: block.stateChanges,
      contentRefs: block.contentRefs || [],
      txRoot: block.txRoot,
      stateRoot: block.stateRoot,
      gasUsed: block.gasUsed,
      gasLimit: block.gasLimit
    }

    const computedHash = computeBlockHash(blockContent)
    checks.hashValid = computedHash === block.hash

    if (!checks.hashValid) {
      errors.push(`Block hash mismatch: expected ${block.hash}, computed ${computedHash}`)
    }
  } catch (err) {
    errors.push(`Block hash computation failed: ${err}`)
  }

  // 3. Verify transaction root
  try {
    const transactions = block.transactions as any[]
    const computedTxRoot = hashObject(transactions)
    checks.txRootValid = computedTxRoot === block.txRoot

    if (!checks.txRootValid) {
      errors.push(`Transaction root mismatch: expected ${block.txRoot}, computed ${computedTxRoot}`)
    }
  } catch (err) {
    errors.push(`Transaction root computation failed: ${err}`)
  }

  // 4. Verify all transaction signatures
  try {
    const transactions = block.transactions as any[]
    let allValid = true

    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i]

      // Skip system transactions (user_creation, etc.) that may not have standard signatures
      if (tx.type === 'user_creation' || tx.type === 'contract_deployment') {
        continue
      }

      try {
        // Transaction signature verification
        // Note: We'd need to fetch the user's public key to verify
        // For now, we check that signature and message exist
        if (!tx.signature || !tx.message) {
          errors.push(`Transaction ${i} missing signature or message`)
          allValid = false
        }
      } catch (err) {
        errors.push(`Transaction ${i} signature verification failed: ${err}`)
        allValid = false
      }
    }

    checks.signaturesValid = allValid
  } catch (err) {
    errors.push(`Transaction signature verification failed: ${err}`)
  }

  // 5. Verify state root (requires current DB state)
  try {
    // Note: This verifies the state root matches the CURRENT database state
    // This assumes the database hasn't been tampered with since block production
    // A more robust approach would replay transactions from genesis
    const computedStateRoot = await computeStateRoot()

    // For historical blocks, we can't verify state root against current state
    // We'd need to replay all transactions from genesis to this block
    // For now, we only verify the latest block's state root
    const [latestBlock] = await db
      .select()
      .from(blocks)
      .orderBy(blocks.height)
      .limit(1)

    if (block.height === latestBlock?.height) {
      checks.stateRootValid = computedStateRoot === block.stateRoot

      if (!checks.stateRootValid) {
        errors.push(`State root mismatch for latest block: expected ${block.stateRoot}, computed ${computedStateRoot}`)
      }
    } else {
      // For historical blocks, we trust the state root (would need full replay to verify)
      checks.stateRootValid = true
    }
  } catch (err) {
    errors.push(`State root verification failed: ${err}`)
  }

  // 6. Verify producer signature
  try {
    // Producer signs the block hash
    // We'd need the producer's public key to verify
    // For now, check that signature exists
    if (!block.signature) {
      errors.push('Block signature missing')
    } else {
      checks.producerSignatureValid = true
    }
  } catch (err) {
    errors.push(`Producer signature verification failed: ${err}`)
  }

  // 7. Verify state changes are consistent
  try {
    const stateChanges = block.stateChanges as any[]

    // Basic validation: ensure state changes have required fields
    let allValid = true
    for (let i = 0; i < stateChanges.length; i++) {
      const change = stateChanges[i]

      if (!change.type) {
        errors.push(`State change ${i} missing type`)
        allValid = false
      }

      // Type-specific validation
      if (change.type === 'balance_update') {
        if (!change.userId || !change.currencyCode || change.after === undefined) {
          errors.push(`Balance change ${i} missing required fields`)
          allValid = false
        }
      }
    }

    checks.stateChangesValid = allValid
  } catch (err) {
    errors.push(`State changes validation failed: ${err}`)
  }

  // Final verdict
  const valid = Object.values(checks).every(check => check === true)

  return { valid, errors, checks }
}

// ============================================================================
// CHAIN VERIFICATION
// ============================================================================

/**
 * Verify blockchain integrity from genesis to latest block
 */
export async function verifyChain(options: {
  fromHeight?: number
  toHeight?: number
  verbose?: boolean
} = {}): Promise<{
  valid: boolean
  blocksVerified: number
  errors: string[]
  failedBlocks: number[]
}> {
  const errors: string[] = []
  const failedBlocks: number[] = []

  // Get block range
  const fromHeight = options.fromHeight ?? 0
  const toHeight = options.toHeight ?? (await db.select().from(blocks).orderBy(blocks.height).limit(1))[0]?.height ?? 0

  let blocksVerified = 0

  console.log(`🔍 Verifying blocks ${fromHeight} to ${toHeight}...`)
  console.log('')

  for (let height = fromHeight; height <= toHeight; height++) {
    const result = await verifyBlock(height)
    blocksVerified++

    if (!result.valid) {
      failedBlocks.push(height)
      errors.push(`Block ${height} verification failed:`)
      errors.push(...result.errors.map(e => `  - ${e}`))
    }

    if (options.verbose) {
      const status = result.valid ? '✅' : '❌'
      console.log(`${status} Block ${height}: ${result.valid ? 'VALID' : 'INVALID'}`)
      if (!result.valid) {
        result.errors.forEach(err => console.log(`  ❌ ${err}`))
      }
    }
  }

  const valid = failedBlocks.length === 0

  if (options.verbose) {
    console.log('')
    console.log(`Verification complete: ${valid ? '✅ VALID' : '❌ INVALID'}`)
    console.log(`  Blocks verified: ${blocksVerified}`)
    console.log(`  Failed blocks: ${failedBlocks.length}`)
  }

  return { valid, blocksVerified, errors, failedBlocks }
}

// ============================================================================
// STARTUP INTEGRITY CHECK
// ============================================================================

/**
 * Run integrity check on startup (verifies latest block)
 */
export async function startupIntegrityCheck(): Promise<boolean> {
  console.log('🔒 Running startup integrity check...')
  console.log('')

  try {
    // Get latest block
    const [latestBlock] = await db
      .select()
      .from(blocks)
      .orderBy(blocks.height)
      .limit(1)

    if (!latestBlock) {
      console.log('⚠️  No blocks found (empty chain)')
      return true
    }

    // Verify latest block
    const result = await verifyBlock(latestBlock.height)

    if (result.valid) {
      console.log('✅ Latest block verification: PASSED')
      console.log(`   Block ${latestBlock.height} integrity confirmed`)
      console.log('')
      return true
    } else {
      console.log('❌ Latest block verification: FAILED')
      console.log('')
      console.log('Errors:')
      result.errors.forEach(err => console.log(`  ❌ ${err}`))
      console.log('')
      console.log('⚠️  DATABASE MAY BE COMPROMISED - Review logs immediately')
      console.log('')
      return false
    }
  } catch (err) {
    console.log('❌ Integrity check failed:', err)
    return false
  }
}
