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
import { consumeTransactions, acknowledgeTransactions } from '@tana/queue'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { join } from 'path'
import { validateJsonReturn } from '../../../../utils/contract-validator'

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

function calculateStateRoot(blockHeight: number): string {
  // Simple state root calculation
  // In production, this would be a merkle root of all account states
  const stateData = {
    blockHeight,
    timestamp: Date.now(),
    version: '0.1.0'
  }

  return crypto.createHash('sha256')
    .update(JSON.stringify(stateData))
    .digest('hex')
}

function calculateBlockHash(blockData: any, stateRoot: string): string {
  const data = JSON.stringify({
    height: blockData.height,
    previousHash: blockData.previousHash,
    timestamp: blockData.timestamp.toISOString(),
    txCount: blockData.txCount,
    stateRoot,
    gasUsed: blockData.gasUsed,
    producer: blockData.producer
  })

  return crypto.createHash('sha256').update(data).digest('hex')
}

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

/**
 * Execute contract code using Bun's VM
 * This provides the tana:* modules and execution context
 */
async function executeContract(
  code: string,
  context: {
    owner: { id: string; username: string; publicKey: string }
    caller: { id: string; username: string; publicKey: string; nonce: number } | null
    block: { height: number; timestamp: number; hash: string; producer: string }
    input: any
    contractName: string  // Added for KV namespace isolation
  },
  gasTracker: { gasUsed: number }  // Track gas consumption during execution
): Promise<any> {
  // Create tana/block module with database-backed operations
  const blockModule = {
    async getUser(userId: string) {
      const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
      if (!user) return null
      return {
        id: user.id,
        username: user.username,
        publicKey: user.publicKey,
        displayName: user.displayName,
        role: user.role,
      }
    },

    async getBalance(userId: string, currencyCode: string) {
      const [balance] = await db
        .select()
        .from(balances)
        .where(and(eq(balances.ownerId, userId), eq(balances.currencyCode, currencyCode)))
        .limit(1)

      if (!balance) return null
      return {
        amount: balance.amount,
        currencyCode: balance.currencyCode,
        ownerId: balance.ownerId,
      }
    },
  }

  // Create tana/context module
  const contextModule = {
    owner: () => context.owner,
    caller: () => context.caller,
    block: () => context.block,
    input: () => context.input,
  }

  // Create tana/core module with console utilities
  const coreModule = {
    log(...args: any[]) {
      console.log(...args)
    },
  }

  // Create tana/kv module (Cloudflare KV-inspired API)
  const kvModule = {
    /**
     * Get a value from the KV store
     * @param key - The key to retrieve
     * @param type - Optional return type: 'text' (default), 'json', 'arrayBuffer', 'stream'
     * @returns The value, or null if not found
     */
    async get(key: string, type: 'text' | 'json' | 'arrayBuffer' | 'stream' = 'json'): Promise<any> {
      // Validate key length
      const keyBytes = new TextEncoder().encode(key).length
      if (keyBytes > MAX_KEY_LENGTH) {
        throw new Error(`Key too long: ${keyBytes} bytes (max ${MAX_KEY_LENGTH})`)
      }

      // Query the database
      const [result] = await db
        .select()
        .from(contractStorage)
        .where(
          and(
            eq(contractStorage.contractName, context.contractName),
            eq(contractStorage.key, key)
          )
        )
        .limit(1)

      if (!result) return null

      // Update access tracking
      await db
        .update(contractStorage)
        .set({
          accessCount: sql`${contractStorage.accessCount} + 1`,
          lastAccessedAt: new Date(),
        })
        .where(eq(contractStorage.id, result.id))

      // Track gas
      gasTracker.gasUsed += STORAGE_READ_GAS

      // Parse and return based on type
      if (type === 'text') {
        return result.value
      } else if (type === 'json') {
        try {
          return JSON.parse(result.value)
        } catch {
          return result.value
        }
      } else if (type === 'arrayBuffer') {
        return new TextEncoder().encode(result.value).buffer
      } else if (type === 'stream') {
        // For streams, return a ReadableStream-like object
        // In practice, this would be more complex
        return result.value
      }

      return JSON.parse(result.value)
    },

    /**
     * Store a key-value pair
     * @param key - The key to store
     * @param value - The value (string, object, or anything JSON-serializable)
     * @param options - Optional metadata (expirationTtl, etc.)
     */
    async put(key: string, value: any, options?: { expirationTtl?: number }): Promise<void> {
      // Validate key length
      const keyBytes = new TextEncoder().encode(key).length
      if (keyBytes > MAX_KEY_LENGTH) {
        throw new Error(`Key too long: ${keyBytes} bytes (max ${MAX_KEY_LENGTH})`)
      }

      // Serialize value
      const valueStr = typeof value === 'string' ? value : JSON.stringify(value)
      const valueBytes = new TextEncoder().encode(valueStr).length

      // Validate value size
      if (valueBytes > MAX_VALUE_SIZE) {
        throw new Error(`Value too large: ${valueBytes} bytes (max ${MAX_VALUE_SIZE} bytes)`)
      }

      // Check total storage for this contract
      const [storageStats] = await db
        .select({ total: sql<number>`COALESCE(SUM(${contractStorage.sizeBytes}), 0)` })
        .from(contractStorage)
        .where(eq(contractStorage.contractName, context.contractName))

      const currentStorage = storageStats?.total || 0
      if (currentStorage + valueBytes > MAX_STORAGE_PER_CONTRACT) {
        throw new Error(
          `Contract storage limit exceeded: ${currentStorage + valueBytes} bytes (max ${MAX_STORAGE_PER_CONTRACT} bytes)`
        )
      }

      // Determine value type
      const valueType = typeof value === 'string' ? 'string' : Array.isArray(value) ? 'array' : typeof value

      // Upsert to database
      await db
        .insert(contractStorage)
        .values({
          contractName: context.contractName,
          key,
          value: valueStr,
          sizeBytes: valueBytes,
          valueType,
          accessCount: 1,
          lastAccessedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: [contractStorage.contractName, contractStorage.key],
          set: {
            value: valueStr,
            sizeBytes: valueBytes,
            valueType,
            accessCount: sql`${contractStorage.accessCount} + 1`,
            lastAccessedAt: new Date(),
            updatedAt: new Date(),
          },
        })

      // Track gas
      gasTracker.gasUsed += STORAGE_WRITE_GAS + valueBytes * STORAGE_BYTE_GAS
    },

    /**
     * Delete a key from the KV store
     * @param key - The key to delete
     */
    async delete(key: string): Promise<void> {
      await db
        .delete(contractStorage)
        .where(
          and(
            eq(contractStorage.contractName, context.contractName),
            eq(contractStorage.key, key)
          )
        )

      // Track gas
      gasTracker.gasUsed += STORAGE_DELETE_GAS
    },

    /**
     * List all keys in the KV store
     * @param options - Optional prefix filter and cursor for pagination
     * @returns Object with keys array and optional cursor for pagination
     */
    async list(options?: {
      prefix?: string
      limit?: number
      cursor?: string
    }): Promise<{ keys: Array<{ name: string; metadata?: any }>; list_complete: boolean; cursor?: string }> {
      const limit = options?.limit || 1000
      const prefix = options?.prefix

      // Build query
      let query = db
        .select({
          key: contractStorage.key,
          sizeBytes: contractStorage.sizeBytes,
          createdAt: contractStorage.createdAt,
        })
        .from(contractStorage)
        .where(eq(contractStorage.contractName, context.contractName))
        .limit(limit + 1) // Get one extra to determine if there are more

      // Add prefix filter if provided
      if (prefix) {
        query = query.where(sql`${contractStorage.key} LIKE ${prefix + '%'}`)
      }

      // Execute query
      const results = await query

      // Check if there are more results
      const hasMore = results.length > limit
      const keys = (hasMore ? results.slice(0, limit) : results).map(r => ({
        name: r.key,
        metadata: {
          size: r.sizeBytes,
          createdAt: r.createdAt,
        },
      }))

      // Track gas
      gasTracker.gasUsed += STORAGE_LIST_GAS * keys.length

      return {
        keys,
        list_complete: !hasMore,
        cursor: hasMore ? keys[keys.length - 1].name : undefined,
      }
    },
  }

  // Create tana modules
  const tanaModules = {
    'tana/context': { context: contextModule },
    'tana/block': { block: blockModule },
    'tana/core': { console: coreModule },
    'tana/kv': { kv: kvModule },
  }

  // Import resolver
  function __tanaImport(spec: string) {
    const mod = (tanaModules as any)[spec]
    if (!mod) throw new Error(`Unknown module: ${spec}`)
    return mod
  }

  // Rewrite import statements and strip TypeScript-only syntax
  const rewrittenCode = code
    .split('\n')
    .map(line => {
      // Strip TypeScript type imports (import type ...)
      if (line.match(/^\s*import\s+type\s+/)) {
        return ''
      }

      // Strip export keyword from function declarations
      if (line.match(/^\s*export\s+(async\s+)?function\s+/)) {
        return line.replace(/^\s*export\s+/, '')
      }

      // Match tana/ import formats and convert to variable assignment
      const match = line.match(/^\s*import\s+\{([^}]+)\}\s+from\s+["'](tana\/[^"']+)["'];?\s*$/)
      if (!match) return line
      const names = match[1].trim()
      const spec = match[2].trim()
      return `const {${names}} = __tanaImport('${spec}');`
    })
    .filter(line => line.length > 0) // Remove empty lines
    .join('\n')

  try {
    // Execute contract code
    // The contract exports a function, so we need to evaluate the code and call the exported function
    const AsyncFunction = (async function () {}).constructor as any
    const fn = new AsyncFunction('__tanaImport', `
      ${rewrittenCode}
      return await contract();
    `)
    const result = await fn(__tanaImport)
    return result
  } catch (error: any) {
    throw new Error(`Contract execution failed: ${error.message}`)
  }
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
        const { getRedisClient, STREAM_PENDING_TX } = await import('@tana/queue')
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

    // 3. Execute transactions
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
              console.log(`  ⚙️  Executing init() function...`)

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
                input: null
              }

              // Execute init() via runtime
              const initResult = await executeContract(initCode, initContext)

              // Validate result is JSON-serializable (or void for init)
              const validation = validateJsonReturn(initResult, 'init')
              if (!validation.valid) {
                throw new Error(`init() validation failed: ${validation.error}`)
              }

              console.log(`  ✓ init() executed successfully`)
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

            console.log(`  ⚙️  Executing contract: ${contract.name}`)

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
              input: tx.contractInput || null
            }

            // Execute contract() function
            const result = await executeContract(contract.contractCode, contractContext)

            // Validate JSON return
            const validation = validateJsonReturn(result, 'contract')
            if (!validation.valid) {
              throw new Error(`contract() validation failed: ${validation.error}`)
            }

            console.log(`  ✓ Contract executed successfully: ${contract.name}`)
            gasUsed += GAS_PER_TX * 5 // Contract calls cost more gas
            break
          }

          case 'transfer': {
            if (!tx.amount || !tx.currencyCode) {
              throw new Error('Invalid transfer: missing amount or currency')
            }

            console.log(`  🔄 Executing core transfer contract...`)

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
              }
            }

            // Execute core contract
            const contractResult = await executeContract(transferContractCode, contractContext)

            if (!contractResult || !contractResult.success) {
              throw new Error('Transfer contract did not return success')
            }

            if (!contractResult.balanceUpdates || contractResult.balanceUpdates.length === 0) {
              throw new Error('Transfer contract did not return balance updates')
            }

            // Apply balance updates returned by contract
            for (const update of contractResult.balanceUpdates) {
              if (update.operation === 'debit') {
                // Deduct from sender
                await db.execute(sql`
                  UPDATE balances
                  SET amount = ${update.newAmount}
                  WHERE owner_id = ${update.userId} AND currency_code = ${update.currencyCode}
                `)
              } else if (update.operation === 'credit') {
                // Add to receiver (UPSERT)
                await db.execute(sql`
                  INSERT INTO balances (owner_id, owner_type, currency_code, amount)
                  VALUES (${update.userId}, 'user', ${update.currencyCode}, ${update.newAmount})
                  ON CONFLICT (owner_id, currency_code)
                  DO UPDATE SET amount = ${update.newAmount}
                `)
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
          signature: tx.signature, // Add signature from transaction
          timestamp: tx.timestamp, // Add timestamp from transaction
          nonce: tx.nonce, // Add nonce from transaction
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

    // 4. Create new block
    const newHeight = latestBlock.height + 1
    const timestamp = new Date()

    const blockData = {
      height: newHeight,
      previousHash: latestBlock.hash,
      timestamp,
      producer: SYSTEM_PRODUCER_ID,
      txCount: pendingTxs.length,
      gasUsed,
      gasLimit: latestBlock.gasLimit
    }

    const stateRoot = calculateStateRoot(newHeight)
    const hash = calculateBlockHash(blockData, stateRoot)

    await db.insert(blocks).values({
      height: blockData.height,
      hash,
      previousHash: blockData.previousHash,
      timestamp: blockData.timestamp,
      producer: blockData.producer,
      txCount: blockData.txCount,
      stateRoot,
      txRoot: null,
      gasUsed: blockData.gasUsed,
      gasLimit: blockData.gasLimit,
      metadata: {
        transactions: pendingTxs.map(tx => tx.txId),
        producedBy: 'manual-script'
      },
      signature: 'manual_block_signature',
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
      const { getRedisClient, STREAM_PENDING_TX } = await import('@tana/queue')
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
    console.log('  Previous Hash:', blockData.previousHash)
    console.log('  Transactions:', pendingTxs.length)
    console.log('  Gas Used:', gasUsed, '/', blockData.gasLimit)
    console.log('  Timestamp:', timestamp.toISOString())
    console.log('')

  } catch (error: any) {
    console.error('❌ Error producing block:', error.message)
    console.error(error.stack)
    process.exit(1)
  }

  process.exit(0)
}

produceBlock()
