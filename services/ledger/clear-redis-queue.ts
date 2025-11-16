#!/usr/bin/env bun
/**
 * Clear Redis Transaction Queue
 *
 * Removes all pending transactions from the Redis stream
 */

import { createClient } from 'redis'

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
const STREAM_KEY = 'tx:pending'  // Must match @tana/queue STREAM_PENDING_TX

async function clearQueue() {
  const client = createClient({ url: REDIS_URL })

  try {
    await client.connect()
    console.log('✓ Connected to Redis')

    // Get stream info
    const length = await client.xLen(STREAM_KEY)
    console.log(`\nStream "${STREAM_KEY}" has ${length} messages\n`)

    if (length === 0) {
      console.log('Queue is already empty!')
      return
    }

    // Option 1: Delete entire stream
    console.log('Clearing stream...')
    await client.del(STREAM_KEY)
    console.log('✓ Stream deleted')

    // Recreate consumer group (if needed)
    try {
      await client.xGroupCreate(STREAM_KEY, 'validators', '0', { MKSTREAM: true })
      console.log('✓ Consumer group recreated')
    } catch (error: any) {
      if (!error.message.includes('BUSYGROUP')) {
        console.warn('Could not recreate consumer group:', error.message)
      }
    }

    // Verify
    const newLength = await client.xLen(STREAM_KEY)
    console.log(`\nFinal stream length: ${newLength}`)
    console.log('✓ Queue cleared successfully!')

  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  } finally {
    await client.quit()
  }
}

clearQueue()
