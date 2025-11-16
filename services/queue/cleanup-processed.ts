/**
 * Cleanup Script: Remove already-processed transactions from Redis queue
 *
 * This script checks which transactions in the Redis pending queue are already
 * on the blockchain and removes them.
 */

import { getRedisClient, STREAM_PENDING_TX, CONSUMER_GROUP } from './src/index'

async function main() {
  const redis = getRedisClient()

  console.log('🔍 Checking for processed transactions in Redis queue...\n')

  // Get all messages from the stream (including already delivered ones)
  const allMessages = await redis.xrange(STREAM_PENDING_TX, '-', '+')

  console.log(`Found ${allMessages.length} total messages in stream\n`)

  // These are the transaction IDs that are already on the blockchain
  const processedTxIds = [
    'a6737461-a5e6-43b7-8585-906ed00a4557', // Block 13
    '55c1dc7b-4ab0-4562-9221-08f3373b2b70', // Block 13
    'e63e1217-2d02-42fd-ba79-0679118ce3f3', // Block 13
    'b3569ff1-04b1-458b-847a-d8cdab5b49be', // Block 14
    '9c256a8c-38d4-45fb-9494-88ed3bf1686f', // Block 15
    '6b2e14a1-c56e-42d1-9110-37c01a68ef4d', // Block 15
    '610ccf87-11fd-4797-9001-dff7ec71065a', // Block 16
    '7a3deb74-219a-4e1e-9acc-f937d162c31d', // Block 17
    'fb669075-d9b1-4a03-b36f-916682ed3a2e', // Block 18
    '5a88ec54-eb83-410d-bd10-bf865fbaeefd', // Block 19
    '4394a377-93a3-42a7-b7ae-ac75b2010e98', // Block 20
    'a8cf4a18-2bbd-4bf2-a129-e34d60df231a', // Block 21
    'f26dab17-be7e-4268-8881-cdaf636d917f', // Block 22
  ]

  const streamIdsToAck: string[] = []
  const streamIdsToDel: string[] = []

  // Find stream IDs for these transactions
  for (const [streamId, fields] of allMessages) {
    const data: any = {}
    for (let i = 0; i < fields.length; i += 2) {
      data[fields[i]] = fields[i + 1]
    }

    if (processedTxIds.includes(data.txId)) {
      console.log(`✓ Found processed transaction: ${data.txId} (stream ID: ${streamId})`)
      streamIdsToAck.push(streamId)
      streamIdsToDel.push(streamId)
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`   - Total messages in stream: ${allMessages.length}`)
  console.log(`   - Already processed: ${streamIdsToAck.length}`)
  console.log(`   - To be cleaned up: ${streamIdsToDel.length}\n`)

  if (streamIdsToAck.length > 0) {
    // First, acknowledge these messages in the consumer group
    console.log('🧹 Acknowledging processed messages in consumer group...')
    const ackCount = await redis.xack(
      STREAM_PENDING_TX,
      CONSUMER_GROUP,
      ...streamIdsToAck
    )
    console.log(`   Acknowledged ${ackCount} messages\n`)

    // Then delete them from the stream
    console.log('🗑️  Deleting processed messages from stream...')
    for (const streamId of streamIdsToDel) {
      await redis.xdel(STREAM_PENDING_TX, streamId)
    }
    console.log(`   Deleted ${streamIdsToDel.length} messages\n`)

    // Show final stream length
    const finalLength = await redis.xlen(STREAM_PENDING_TX)
    console.log(`✅ Cleanup complete! Stream now has ${finalLength} messages\n`)
  } else {
    console.log('✨ No cleanup needed - queue is clean!\n')
  }

  await redis.quit()
}

main().catch(console.error)
