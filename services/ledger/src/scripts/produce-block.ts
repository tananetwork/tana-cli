/**
 * Redis-based Block Production Script
 *
 * Consumes pending transactions from Redis queue and produces a new block
 *
 * Usage: bun run src/scripts/produce-block.ts
 */

import { db } from '../db'
import { blocks, transactions, users, balances, currencies, contracts, contractStorage } from '../db/schema'
import { eq, and, isNull, sql } from 'drizzle-orm'
import crypto from 'crypto'
import { consumeTransactions, acknowledgeTransactions } from '@tananetwork/queue'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { join } from 'path'
import { validateJsonReturn } from '../../../../utils/contract-validator'
import { executeContractSecurely } from '../../../../commands/run/contract'
import { StateTracker, computeStateRoot } from '../blockchain/state-tracker'
import { computeBlockHash, hashObject } from '../utils/merkle'
import type { BlockTransaction, StateChange, ContentReference } from '../types/block'
import { signMessage } from '@tananetwork/crypto'

const SYSTEM_PRODUCER_ID = '00000000-0000-0000-0000-000000000000'

// KV Storage constants (Cloudflare-inspired limits)
const MAX_KEY_LENGTH = 512                  // bytes
const MAX_VALUE_SIZE = 25 * 1024 * 1024     // 25 MB
const MAX_STORAGE_PER_CONTRACT = 1024 * 1024 * 1024  // 1 GB

// KV Gas costs
const STORAGE_WRITE_GAS = 20000   // Per KV.put() operation
const STORAGE_READ_GAS = 5000     // Per KV.get() operation
const STORAGE_DELETE_GAS = 5000   // Per KV.delete() operation
const STORAGE_LIST_GAS = 1000     // Per KV.list() operation
const STORAGE_BYTE_GAS = 10       // Per byte stored

// Removed: Now using computeStateRoot from state-tracker.ts
// Removed: Now using computeBlockHash from merkle.ts

/**
 * Increment user's nonce after successful transaction
 */
async function incrementUserNonce(userId: string) {
  await db.execute(sql`
    UPDATE users
    SET nonce = nonce + 1
    WHERE id = ${userId}
  `)
}

/**
 * Load a core contract from the filesystem
 */
async function loadCoreContract(contractName: string): Promise<string> {
  // Core contracts are at ../../../contracts/core from cli/services/ledger
  const contractPath = join(process.cwd(), '../../../contracts/core', `${contractName}.ts`)
  return await readFile(contractPath, 'utf-8')
}

async function produceBlock() {
  console.log('🔨 Producing new block...')
  console.log('')

  try {
    // 1. Get latest block
    const [latestBlock] = await db
      .select()
      .from(blocks)
      .orderBy(sql`${blocks.height} DESC`)
      .limit(1)

    if (!latestBlock) {
      console.error('❌ No genesis block found. Run: bun run blockchain:genesis')
      process.exit(1)
    }

    console.log('Latest block:', latestBlock.height)

    // 2. Consume pending transactions from Redis queue
    // NOTE: Redis is the ONLY source of pending transactions
    // Transactions don't exist in PostgreSQL until they're confirmed in a block
    const consumerId = 'validator-' + Math.random().toString(36).substring(7)
    const pendingTxs = await consumeTransactions(
      consumerId,
      1000, // Max transactions per block
      5000  // Wait up to 5 seconds for transactions
    )

    if (pendingTxs.length === 0) {
      console.log('⚠️  No pending transactions in queue')

      // Clean up any stale acknowledged messages before exiting
      try {
        const { getRedisClient, STREAM_PENDING_TX } = await import('@tananetwork/queue')
        const redis = getRedisClient()

        // Get all messages from the stream
        const allMessages = await redis.xrange(STREAM_PENDING_TX, '-', '+')

        if (allMessages.length > 0) {
          console.log(`🧹 Found ${allMessages.length} stale message(s) in stream`)
          const staleStreamIds: string[] = []

          // Check each message to see if its transaction is already on-chain
          for (const [streamId, fields] of allMessages) {
            const data: any = {}
            for (let i = 0; i < fields.length; i += 2) {
              data[fields[i]] = fields[i + 1]
            }

            // Check if this transaction exists in our database (already processed)
            const [existingTx] = await db
              .select()
              .from(transactions)
              .where(eq(transactions.id, data.txId))
              .limit(1)

            if (existingTx) {
              staleStreamIds.push(streamId)
            }
          }

          if (staleStreamIds.length > 0) {
            // Delete stale messages from stream
            for (const streamId of staleStreamIds) {
              await redis.xdel(STREAM_PENDING_TX, streamId)
            }
            console.log(`🧹 Cleaned up ${staleStreamIds.length} already-processed message(s)`)
          } else {
            console.log('   No cleanup needed - all messages are valid')
          }
        }
      } catch (cleanupError: any) {
        console.warn('⚠️  Cleanup warning:', cleanupError.message)
      }

      console.log('   Waiting for new transactions...')
      process.exit(0)
    }

    console.log(`Consumed ${pendingTxs.length} transaction(s) from Redis queue`)

    // CRITICAL: Sort transactions by Redis stream ID for deterministic ordering
    // This ensures all validators process transactions in the same order
    // Stream IDs format: "<timestamp>-<sequence>"
    pendingTxs.sort((a, b) => {
      const [timeA, seqA] = a.id.split('-').map(Number)
      const [timeB, seqB] = b.id.split('-').map(Number)

      // First sort by timestamp
      if (timeA !== timeB) return timeA - timeB
      // Then by sequence number
      return seqA - seqB
    })

    console.log(`✓ Transactions sorted by stream ID (deterministic ordering)`)

    // Keep track of stream IDs for acknowledgment
    const streamIds = pendingTxs.map(tx => tx.id)
    console.log('')

    // 3. Initialize state tracker and transaction collector
    const stateTracker = new StateTracker()
    const fullTransactions: BlockTransaction[] = []
    const contentRefs: ContentReference[] = []

    let gasUsed = 0
    const GAS_PER_TX = 21000 // Base gas per transaction

    for (const tx of pendingTxs) {
      console.log(`Processing transaction ${tx.txId} (${tx.type})...`)

      try {
        // Execute based on type
        switch (tx.type) {
          case 'user_creation': {
            // Get user data from contractInput
            const userData = tx.contractInput as any

            if (!userData || !userData.username || !userData.displayName || !userData.publicKey) {
              throw new Error('Invalid user_creation transaction: missing user data')
            }

            // Create the user with the transaction's "to" ID
            await db.insert(users).values({
              id: tx.to,
              username: userData.username,
              displayName: userData.displayName,
              publicKey: userData.publicKey,
              role: userData.role || 'user', // Apply role from transaction
              bio: userData.bio,
              avatarData: userData.avatarData,
              stateHash: crypto.createHash('sha256')
                .update(JSON.stringify(userData))
                .digest('hex')
            })

            // Record state change
            stateTracker.recordUserCreation(
              tx.to,
              userData.username,
              userData.publicKey,
              userData.role || 'user'
            )

            const roleLabel = userData.role === 'sovereign' ? '👑 sovereign' : userData.role === 'staff' ? '⭐ staff' : 'user'
            console.log(`  ✓ Created ${roleLabel} user: ${userData.username} (${tx.to})`)
            gasUsed += GAS_PER_TX
            break
          }

          case 'contract_deployment': {
            // Get contract data from contractInput
            const contractData = tx.contractInput as any

            if (!contractData || !contractData.name || !contractData.sourceCode || !contractData.codeHash) {
              throw new Error('Invalid contract_deployment transaction: missing contract data')
            }

            // Get the block height we're creating
            const newBlockHeight = latestBlock.height + 1

            // Extract function codes from transaction
            const initCode = contractData.initCode
            const contractCode = contractData.contractCode
            const getCode = contractData.getCode
            const postCode = contractData.postCode

            if (!contractCode) {
              throw new Error('Contract deployment missing required contractCode')
            }

            // Get owner user for init() execution
            const [ownerUser] = await db
              .select()
              .from(users)
              .where(eq(users.id, tx.from))
              .limit(1)

            if (!ownerUser) {
              throw new Error(`Owner user not found: ${tx.from}`)
            }

            // Execute init() function if present
            if (initCode) {
              console.log(`  ⚙️  Executing init() function securely (isolated subprocess)...`)

              // Build execution context for init()
              const initContext = {
                owner: {
                  id: ownerUser.id,
                  username: ownerUser.username,
                  publicKey: ownerUser.publicKey
                },
                caller: null, // init() has no caller
                block: {
                  height: newBlockHeight,
                  timestamp: Date.now(),
                  hash: '', // Will be calculated after block creation
                  producer: SYSTEM_PRODUCER_ID
                },
                input: null,
                contractName: contractData.name
              }

              // Execute init() via secure tana-runtime subprocess
              const initResult = await executeContractSecurely(initCode, initContext)

              if (!initResult.success) {
                throw new Error(`init() execution failed: ${initResult.error}`)
              }

              // Track gas from execution
              if (initResult.gasUsed) {
                gasUsed += initResult.gasUsed
              }

              // Validate result is JSON-serializable (or void for init)
              const validation = validateJsonReturn(initResult.result, 'init')
              if (!validation.valid) {
                throw new Error(`init() validation failed: ${validation.error}`)
              }

              console.log(`  ✓ init() executed successfully (isolated)`)
            }

            // Deploy the contract with all fields
            await db.insert(contracts).values({
              id: tx.to, // Contract ID from transaction
              ownerId: tx.from,
              name: contractData.name,
              sourceCode: contractData.sourceCode,
              // Add extracted function codes
              initCode: initCode || null,
              contractCode: contractCode,
              getCode: getCode || null,
              postCode: postCode || null,
              // Add availability flags
              hasInit: contractData.hasInit || false,
              hasGet: contractData.hasGet || false,
              hasPost: contractData.hasPost || false,
              version: contractData.version || '1.0.0',
              isActive: true,
              deployedInBlock: newBlockHeight,
              deploymentTxId: tx.txId,
              description: contractData.description,
              metadata: contractData.metadata,
              codeHash: contractData.codeHash
            })

            // Write HTTP handler functions to filesystem
            const contractDir = join(process.cwd(), 'contracts', tx.to!)
            await mkdir(contractDir, { recursive: true })

            if (getCode) {
              await writeFile(join(contractDir, 'get.ts'), getCode, 'utf-8')
              console.log(`  ✓ Wrote get.ts to filesystem`)
            }

            if (postCode) {
              await writeFile(join(contractDir, 'post.ts'), postCode, 'utf-8')
              console.log(`  ✓ Wrote post.ts to filesystem`)
            }

            // Record state change
            stateTracker.recordContractDeployment(
              tx.to!,
              tx.from,
              contractData.name,
              contractData.codeHash
            )

            console.log(`  ✓ Deployed contract: ${contractData.name} (${tx.to})`)
            gasUsed += GAS_PER_TX * 3 // Contracts cost more gas
            break
          }

          case 'contract_call': {
            // Get contract call data
            const callData = tx.contractInput as any

            if (!tx.contractId) {
              throw new Error('Invalid contract_call: missing contractId')
            }

            // Verify contract exists and is active
            const [contract] = await db
              .select()
              .from(contracts)
              .where(eq(contracts.id, tx.contractId))
              .limit(1)

            if (!contract) {
              throw new Error(`Contract not found: ${tx.contractId}`)
            }

            if (!contract.isActive) {
              throw new Error(`Contract is not active: ${tx.contractId}`)
            }

            if (!contract.contractCode) {
              throw new Error(`Contract has no executable code: ${tx.contractId}`)
            }

            // Get the block height we're creating
            const newBlockHeight = latestBlock.height + 1

            // Get caller user
            const [caller] = await db
              .select()
              .from(users)
              .where(eq(users.id, tx.from))
              .limit(1)

            if (!caller) {
              throw new Error(`Caller user not found: ${tx.from}`)
            }

            // Get contract owner
            const [owner] = await db
              .select()
              .from(users)
              .where(eq(users.id, contract.ownerId))
              .limit(1)

            if (!owner) {
              throw new Error(`Contract owner not found: ${contract.ownerId}`)
            }

            console.log(`  ⚙️  Executing contract securely (isolated subprocess): ${contract.name}`)

            // Build execution context
            const contractContext = {
              owner: {
                id: owner.id,
                username: owner.username,
                publicKey: owner.publicKey
              },
              caller: {
                id: caller.id,
                username: caller.username,
                publicKey: caller.publicKey,
                nonce: caller.nonce
              },
              block: {
                height: newBlockHeight,
                timestamp: Date.now(),
                hash: '', // Will be calculated after block creation
                producer: SYSTEM_PRODUCER_ID
              },
              input: tx.contractInput || null,
              contractName: contract.name
            }

            // Execute contract() function via secure tana-runtime subprocess
            const contractResult = await executeContractSecurely(contract.contractCode, contractContext)

            if (!contractResult.success) {
              throw new Error(`contract() execution failed: ${contractResult.error}`)
            }

            // Track gas from execution
            if (contractResult.gasUsed) {
              gasUsed += contractResult.gasUsed
            } else {
              gasUsed += GAS_PER_TX * 5 // Fallback: Contract calls cost more gas
            }

            // Validate JSON return
            const validation = validateJsonReturn(contractResult.result, 'contract')
            if (!validation.valid) {
              throw new Error(`contract() validation failed: ${validation.error}`)
            }

            console.log(`  ✓ Contract executed successfully (isolated): ${contract.name}`)
            break
          }

          case 'transfer': {
            if (!tx.amount || !tx.currencyCode) {
              throw new Error('Invalid transfer: missing amount or currency')
            }

            console.log(`  🔄 Executing core transfer contract securely (isolated subprocess)...`)

            // Load and execute core transfer contract
            const transferContractCode = await loadCoreContract('transfer')

            // Get caller user for context
            const [caller] = await db
              .select()
              .from(users)
              .where(eq(users.id, tx.from))
              .limit(1)

            if (!caller) {
              throw new Error(`Caller user not found: ${tx.from}`)
            }

            // Build execution context for core contract
            const contractContext = {
              owner: {
                id: SYSTEM_PRODUCER_ID,
                username: 'system',
                publicKey: 'system'
              },
              caller: {
                id: caller.id,
                username: caller.username,
                publicKey: caller.publicKey,
                nonce: caller.nonce
              },
              block: {
                height: latestBlock.height + 1,
                timestamp: Date.now(),
                hash: '',
                producer: SYSTEM_PRODUCER_ID
              },
              input: {
                from: tx.from,
                to: tx.to,
                amount: tx.amount.toString(),
                currencyCode: tx.currencyCode
              },
              contractName: 'transfer'
            }

            // Execute core contract via secure tana-runtime subprocess
            const coreContractResult = await executeContractSecurely(transferContractCode, contractContext)

            if (!coreContractResult.success) {
              throw new Error(`Transfer contract execution failed: ${coreContractResult.error}`)
            }

            // Track gas from execution
            if (coreContractResult.gasUsed) {
              gasUsed += coreContractResult.gasUsed
            }

            const contractResult = coreContractResult.result

            if (!contractResult || !contractResult.success) {
              throw new Error('Transfer contract did not return success')
            }

            if (!contractResult.balanceUpdates || contractResult.balanceUpdates.length === 0) {
              throw new Error('Transfer contract did not return balance updates')
            }

            // Apply balance updates returned by contract
            for (const update of contractResult.balanceUpdates) {
              if (update.operation === 'debit') {
                // Capture before state
                const before = await stateTracker.captureBalanceBefore(update.userId, update.currencyCode!)

                // Deduct from sender
                await db.execute(sql`
                  UPDATE balances
                  SET amount = ${update.newAmount}
                  WHERE user_id = ${update.userId} AND currency_code = ${update.currencyCode}
                `)

                // Record state change
                await stateTracker.recordBalanceChange(update.userId, update.currencyCode!, before)

              } else if (update.operation === 'credit') {
                // Capture before state
                const before = await stateTracker.captureBalanceBefore(update.userId, update.currencyCode!)

                // Add to receiver (UPSERT)
                await db.execute(sql`
                  INSERT INTO balances (user_id, currency_code, amount)
                  VALUES (${update.userId}, ${update.currencyCode}, ${update.newAmount})
                  ON CONFLICT (user_id, currency_code)
                  DO UPDATE SET amount = ${update.newAmount}
                `)

                // Record state change
                await stateTracker.recordBalanceChange(update.userId, update.currencyCode!, before)
              }
            }

            console.log(`  ✓ Transferred ${tx.amount} ${tx.currencyCode} (via core contract)`)
            gasUsed += GAS_PER_TX
            break
          }

          case 'role_change': {
            // Get role change data from contractInput
            const roleData = tx.contractInput as any

            if (!roleData || !roleData.userId || !roleData.newRole || !roleData.oldRole) {
              throw new Error('Invalid role_change transaction: missing role data')
            }

            // Verify authorization: Only current sovereign can change roles
            const [caller] = await db
              .select()
              .from(users)
              .where(eq(users.id, tx.from))
              .limit(1)

            if (!caller || caller.role !== 'sovereign') {
              throw new Error('Only sovereign can change user roles')
            }

            // If transferring sovereignty, ensure there's only one sovereign
            if (roleData.newRole === 'sovereign') {
              // The old sovereign should be demoted in the same transaction
              // This is handled by the smart contract creating both role changes

              // Verify target user exists
              const [targetUser] = await db
                .select()
                .from(users)
                .where(eq(users.id, roleData.userId))
                .limit(1)

              if (!targetUser) {
                throw new Error(`Target user not found: ${roleData.userId}`)
              }

              if (targetUser.role === 'sovereign') {
                throw new Error('User is already sovereign')
              }
            }

            // Record state change BEFORE applying
            stateTracker.recordRoleChange(
              roleData.userId,
              roleData.oldRole,
              roleData.newRole
            )

            // Apply role change
            await db
              .update(users)
              .set({
                role: roleData.newRole,
                updatedAt: new Date()
              })
              .where(eq(users.id, roleData.userId))

            const roleEmoji = roleData.newRole === 'sovereign' ? '👑' : roleData.newRole === 'staff' ? '⭐' : '👤'
            console.log(`  ✓ Changed role: ${roleData.userId} → ${roleEmoji} ${roleData.newRole}`)
            gasUsed += GAS_PER_TX
            break
          }

          default:
            console.log(`  ⚠️  Skipping unsupported transaction type: ${tx.type}`)
        }

        // Build full transaction data for block (self-contained)
        const fullTxData: BlockTransaction = {
          id: tx.txId,
          from: tx.from,
          to: tx.to,
          amount: tx.amount,
          currencyCode: tx.currencyCode || null,
          type: tx.type,
          signature: tx.signature,
          message: tx.message || '', // Original signed message
          nonce: tx.nonce,
          timestamp: tx.timestamp,
          contractId: tx.contractId || null,
          contractInput: tx.contractInput || null,
          metadata: tx.payload || null
        }
        fullTransactions.push(fullTxData)

        // Create transaction in database as confirmed
        // NOTE: This is the ONLY place transactions are written to PostgreSQL
        // Convert decimal amounts to smallest unit (8 decimals) for BigInt storage
        let amountBigInt: bigint | null = null
        if (tx.amount) {
          const amountDecimal = parseFloat(tx.amount)
          amountBigInt = BigInt(Math.round(amountDecimal * 100000000))
        }

        await db.insert(transactions).values({
          id: tx.txId,
          type: tx.type,
          from: tx.from,
          to: tx.to,
          amount: amountBigInt,
          currencyCode: tx.currencyCode || null,
          contractId: tx.contractId || null,
          contractInput: tx.contractInput || null,
          signature: tx.signature,
          timestamp: tx.timestamp,
          nonce: tx.nonce,
          status: 'confirmed',
          confirmedAt: new Date(),
          blockHeight: null, // Will be set when linking to block
          metadata: tx.payload
        })

        // Increment nonce for the sender (except for user_creation which has no sender yet)
        if (tx.type !== 'user_creation' && tx.from !== SYSTEM_PRODUCER_ID) {
          await incrementUserNonce(tx.from)
        }

      } catch (error: any) {
        console.error(`  ❌ Transaction ${tx.txId} failed:`, error.message)

        // Create transaction in database as failed
        // Convert decimal amounts to smallest unit (8 decimals) for BigInt storage
        let amountBigInt: bigint | null = null
        if (tx.amount) {
          const amountDecimal = parseFloat(tx.amount)
          amountBigInt = BigInt(Math.round(amountDecimal * 100000000))
        }

        await db.insert(transactions).values({
          id: tx.txId,
          type: tx.type,
          from: tx.from,
          to: tx.to,
          amount: amountBigInt,
          currencyCode: tx.currencyCode || null,
          contractId: tx.contractId || null,
          contractInput: tx.contractInput || null,
          signature: tx.signature, // Add signature from transaction
          timestamp: tx.timestamp, // Add timestamp from transaction
          nonce: tx.nonce, // Add nonce from transaction
          status: 'failed',
          confirmedAt: null,
          blockHeight: null,
          metadata: { error: error.message, ...tx.payload }
        })
      }
    }

    console.log('')

    // 4. Create new block with self-contained data and Merkle commitments
    const newHeight = latestBlock.height + 1
    const timestamp = new Date()

    // Get all state changes from tracker
    const stateChanges = stateTracker.getChanges()

    // Compute transaction root (hash of full transaction array)
    const txRoot = hashObject(fullTransactions)
    console.log(`✓ Computed transaction root: ${txRoot}`)

    // Compute state root (Merkle root of ALL current state)
    console.log('Computing Merkle state root...')
    const stateRoot = await computeStateRoot()
    console.log(`✓ Computed state root: ${stateRoot}`)

    // Build block content (for hashing and signing)
    const blockContent = {
      height: newHeight,
      previousHash: latestBlock.hash,
      timestamp,
      producer: SYSTEM_PRODUCER_ID,
      transactions: fullTransactions,
      stateChanges,
      contentRefs,
      txRoot,
      stateRoot,
      gasUsed,
      gasLimit: latestBlock.gasLimit
    }

    // Compute deterministic block hash
    const hash = computeBlockHash(blockContent)
    console.log(`✓ Computed block hash: ${hash}`)

    // Sign the block (using system producer for now)
    // In production, this would use the actual validator's key
    const signature = hash // Placeholder - would be: await signMessage(hash, producerPrivateKey)

    // Insert self-contained block
    await db.insert(blocks).values({
      height: newHeight,
      hash,
      previousHash: latestBlock.hash,
      timestamp,
      producer: SYSTEM_PRODUCER_ID,
      transactions: fullTransactions as any, // JSONB - full transaction data
      stateChanges: stateChanges as any,     // JSONB - before/after snapshots
      contentRefs: contentRefs as any,       // JSONB - content references
      txRoot,
      stateRoot,
      txCount: fullTransactions.length,
      gasUsed,
      gasLimit: latestBlock.gasLimit,
      signature,
      finalizedAt: timestamp
    })

    // 5. Link transactions to block
    for (const tx of pendingTxs) {
      await db
        .update(transactions)
        .set({ blockHeight: newHeight })
        .where(eq(transactions.id, tx.txId))
    }

    // 6. Acknowledge and delete transactions from Redis queue
    // This is done atomically to prevent stale messages from accumulating
    const ackedCount = await acknowledgeTransactions(streamIds)
    console.log(`✓ Acknowledged ${ackedCount} transaction(s) in Redis queue`)

    // Immediately delete the acknowledged messages to prevent accumulation
    try {
      const { getRedisClient, STREAM_PENDING_TX } = await import('@tananetwork/queue')
      const redis = getRedisClient()

      // Delete all processed messages from the stream
      if (streamIds.length > 0) {
        for (const streamId of streamIds) {
          await redis.xdel(STREAM_PENDING_TX, streamId)
        }
        console.log(`🧹 Deleted ${streamIds.length} processed message(s) from stream`)
      }
    } catch (deleteError: any) {
      console.warn('⚠️  Warning: Could not delete messages from stream:', deleteError.message)
      console.log('   Messages are acknowledged but may accumulate in Redis.')
      console.log('   Run `bun run queue:clear` to clean up if needed.')
    }
    console.log('')

    console.log('✅ Block produced successfully!')
    console.log('')
    console.log('Block Details:')
    console.log('  Height:', newHeight)
    console.log('  Hash:', hash)
    console.log('  Previous Hash:', latestBlock.hash)
    console.log('  Transactions:', fullTransactions.length, '(self-contained)')
    console.log('  State Changes:', stateChanges.length)
    console.log('  TX Root:', txRoot)
    console.log('  State Root:', stateRoot)
    console.log('  Gas Used:', gasUsed, '/', latestBlock.gasLimit)
    console.log('  Timestamp:', timestamp.toISOString())
    console.log('')
    console.log('🔒 Cryptographic Verification:')
    console.log('  ✓ Block contains full transaction data with signatures')
    console.log('  ✓ State changes captured (before/after snapshots)')
    console.log('  ✓ Transaction root computed (tamper detection)')
    console.log('  ✓ State root computed (Merkle tree of all state)')
    console.log('  ✓ Block hash is deterministic and verifiable')
    console.log('')

  } catch (error: any) {
    console.error('❌ Error producing block:', error.message)
    console.error(error.stack)
    process.exit(1)
  }

  process.exit(0)
}

produceBlock()
