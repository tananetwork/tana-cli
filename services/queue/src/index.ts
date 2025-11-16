/**
 * Redis Transaction Queue Service
 *
 * High-performance transaction queue using Redis Streams
 * Designed for millisecond-level block times
 */

import Redis from 'ioredis'

// Stream names
export const STREAM_PENDING_TX = 'tx:pending'
export const CONSUMER_GROUP = 'validators'

// Singleton Redis client
let redisClient: Redis | null = null

/**
 * Get or create Redis client
 */
export function getRedisClient(): Redis {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      // High-performance settings
      enableOfflineQueue: true,
      lazyConnect: false,
      // Connection pool
      connectionName: 'tana-ledger',
    })

    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err)
    })

    redisClient.on('connect', () => {
      console.log('✓ Redis connected')
    })
  }

  return redisClient
}

/**
 * Initialize Redis streams and consumer groups
 */
export async function initializeRedisStreams() {
  const redis = getRedisClient()

  try {
    // Create consumer group if it doesn't exist
    try {
      await redis.xgroup(
        'CREATE',
        STREAM_PENDING_TX,
        CONSUMER_GROUP,
        '$', // Start from end (only new messages)
        'MKSTREAM' // Create stream if doesn't exist
      )
      console.log(`✓ Created consumer group: ${CONSUMER_GROUP}`)
    } catch (error: any) {
      // Group already exists - that's fine
      if (!error.message.includes('BUSYGROUP')) {
        throw error
      }
    }

    return true
  } catch (error) {
    console.error('Failed to initialize Redis streams:', error)
    throw error
  }
}

/**
 * Add transaction to pending queue
 *
 * @returns Stream entry ID (timestamp-sequence)
 */
export async function queueTransaction(transaction: {
  txId: string
  type: string
  from: string
  to: string
  amount?: string
  currencyCode?: string
  signature: string
  timestamp: number
  nonce: number
  contractId?: string
  contractInput?: any
  payload: any
}): Promise<string> {
  const redis = getRedisClient()

  // Use XADD to add to stream
  // '*' means auto-generate ID (timestamp-sequence)
  const streamId = await redis.xadd(
    STREAM_PENDING_TX,
    '*',
    'txId', transaction.txId,
    'type', transaction.type,
    'from', transaction.from,
    'to', transaction.to,
    'amount', transaction.amount || '',
    'currencyCode', transaction.currencyCode || '',
    'contractId', transaction.contractId || '',
    'contractInput', transaction.contractInput ? JSON.stringify(transaction.contractInput) : '',
    'signature', transaction.signature,
    'timestamp', transaction.timestamp.toString(),
    'nonce', transaction.nonce.toString(),
    'payload', JSON.stringify(transaction.payload)
  )

  return streamId
}

/**
 * Read pending transactions (for validators)
 *
 * @param consumerId - Unique ID for this consumer (e.g., "validator-1")
 * @param count - Number of transactions to read
 * @param blockMs - Time to block waiting for new messages (0 = no block)
 */
export async function consumeTransactions(
  consumerId: string,
  count: number = 100,
  blockMs: number = 1000
): Promise<Array<{
  id: string
  txId: string
  type: string
  from: string
  to: string
  amount?: string
  currencyCode?: string
  contractId?: string
  contractInput?: any
  signature: string
  timestamp: number
  nonce: number
  payload: any
}>> {
  const redis = getRedisClient()

  // XREADGROUP reads from stream as part of consumer group
  // '>' means "messages never delivered to other consumers"
  const results = await redis.xreadgroup(
    'GROUP',
    CONSUMER_GROUP,
    consumerId,
    'COUNT',
    count,
    'BLOCK',
    blockMs,
    'STREAMS',
    STREAM_PENDING_TX,
    '>' // Only new messages
  )

  if (!results || results.length === 0) {
    return []
  }

  const transactions = []
  for (const [_streamName, messages] of results) {
    for (const [id, fields] of messages) {
      // Parse Redis stream entry
      const data: any = {}
      for (let i = 0; i < fields.length; i += 2) {
        data[fields[i]] = fields[i + 1]
      }

      transactions.push({
        id, // Stream entry ID
        txId: data.txId,
        type: data.type,
        from: data.from,
        to: data.to,
        amount: data.amount || undefined,
        currencyCode: data.currencyCode || undefined,
        contractId: data.contractId || undefined,
        contractInput: data.contractInput ? JSON.parse(data.contractInput) : undefined,
        signature: data.signature,
        timestamp: parseInt(data.timestamp),
        nonce: parseInt(data.nonce),
        payload: JSON.parse(data.payload)
      })
    }
  }

  return transactions
}

/**
 * Acknowledge transaction after block inclusion
 *
 * This removes the transaction from pending and marks it as processed
 */
export async function acknowledgeTransaction(streamId: string): Promise<number> {
  const redis = getRedisClient()

  return await redis.xack(
    STREAM_PENDING_TX,
    CONSUMER_GROUP,
    streamId
  )
}

/**
 * Acknowledge multiple transactions at once (batch)
 */
export async function acknowledgeTransactions(streamIds: string[]): Promise<number> {
  const redis = getRedisClient()

  if (streamIds.length === 0) return 0

  return await redis.xack(
    STREAM_PENDING_TX,
    CONSUMER_GROUP,
    ...streamIds
  )
}

/**
 * Get pending transaction count
 */
export async function getPendingCount(): Promise<number> {
  const redis = getRedisClient()

  const info = await redis.xpending(
    STREAM_PENDING_TX,
    CONSUMER_GROUP
  )

  // info[0] is the total pending count
  return parseInt(info[0] as string)
}

/**
 * Get stream length (total messages, including ACKed)
 */
export async function getStreamLength(): Promise<number> {
  const redis = getRedisClient()

  return await redis.xlen(STREAM_PENDING_TX)
}

/**
 * List pending transactions without consuming them
 * Returns only NEW transactions that haven't been delivered to any consumer yet
 *
 * @param count - Maximum number of transactions to return
 */
export async function listPendingTransactions(
  count: number = 100
): Promise<Array<{
  id: string
  txId: string
  type: string
  from: string
  to: string
  amount?: string
  currencyCode?: string
  contractId?: string
  contractInput?: any
  signature: string
  timestamp: number
  nonce: number
  payload: any
}>> {
  const redis = getRedisClient()

  try {
    // Get the last delivered ID for the consumer group
    // This tells us which messages are truly new/unprocessed
    const groupInfo: any = await redis.xinfo('GROUPS', STREAM_PENDING_TX)
    let lastDeliveredId = '0-0'

    for (let i = 0; i < groupInfo.length; i++) {
      const group = groupInfo[i]
      if (Array.isArray(group)) {
        for (let j = 0; j < group.length; j += 2) {
          if (group[j] === 'name' && group[j + 1] === CONSUMER_GROUP) {
            // Found our group, get the last-delivered-id
            for (let k = 0; k < group.length; k += 2) {
              if (group[k] === 'last-delivered-id') {
                lastDeliveredId = group[k + 1]
                break
              }
            }
            break
          }
        }
      }
    }

    // Use XRANGE to read messages after the last delivered ID
    // This gives us only NEW messages that haven't been processed yet
    const results = await redis.xrange(
      STREAM_PENDING_TX,
      lastDeliveredId === '0-0' ? '-' : `(${lastDeliveredId}`, // Exclusive of last delivered
      '+',
      'COUNT',
      count
    )

    if (!results || results.length === 0) {
      return []
    }

    const transactions = []
    for (const [id, fields] of results) {
      // Parse Redis stream entry
      const data: any = {}
      for (let i = 0; i < fields.length; i += 2) {
        data[fields[i]] = fields[i + 1]
      }

      transactions.push({
        id, // Stream entry ID
        txId: data.txId,
        type: data.type,
        from: data.from,
        to: data.to,
        amount: data.amount || undefined,
        currencyCode: data.currencyCode || undefined,
        contractId: data.contractId || undefined,
        contractInput: data.contractInput ? JSON.parse(data.contractInput) : undefined,
        signature: data.signature,
        timestamp: parseInt(data.timestamp),
        nonce: parseInt(data.nonce),
        payload: JSON.parse(data.payload)
      })
    }

    return transactions
  } catch (error: any) {
    console.error('Failed to list pending transactions:', error)
    return []
  }
}

/**
 * Trim old messages from stream
 * Keeps stream size manageable
 *
 * @param maxLength - Maximum number of entries to keep (approximate)
 */
export async function trimStream(maxLength: number = 100000): Promise<number> {
  const redis = getRedisClient()

  // MAXLEN ~ uses approximate trimming (more efficient)
  return await redis.xtrim(
    STREAM_PENDING_TX,
    'MAXLEN',
    '~',
    maxLength
  )
}

/**
 * Pub/Sub: Notify validators of new transactions
 * (Optional - for instant notifications without polling)
 */
export async function publishNewTransaction(txId: string): Promise<number> {
  const redis = getRedisClient()

  return await redis.publish('tx:new', txId)
}

/**
 * Subscribe to new transaction notifications
 */
export async function subscribeToNewTransactions(
  callback: (txId: string) => void
): Promise<Redis> {
  const subscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

  subscriber.subscribe('tx:new', (err) => {
    if (err) {
      console.error('Failed to subscribe:', err)
    }
  })

  subscriber.on('message', (channel, message) => {
    if (channel === 'tx:new') {
      callback(message)
    }
  })

  return subscriber
}

/**
 * Health check
 */
export async function ping(): Promise<boolean> {
  const redis = getRedisClient()
  const result = await redis.ping()
  return result === 'PONG'
}

/**
 * Close Redis connection
 */
export async function closeRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit()
    redisClient = null
  }
}
