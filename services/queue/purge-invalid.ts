/**
 * Purge the remaining invalid transaction
 */
import { getRedisClient, STREAM_PENDING_TX, CONSUMER_GROUP } from './src/index'

async function main() {
  const redis = getRedisClient()
  
  console.log('🗑️  Purging invalid transaction c27ba076-7d8e-4207-b72b-403b01dadf72...\n')
  
  // Get all messages
  const allMessages = await redis.xrange(STREAM_PENDING_TX, '-', '+')
  
  for (const [streamId, fields] of allMessages) {
    const data: any = {}
    for (let i = 0; i < fields.length; i += 2) {
      data[fields[i]] = fields[i + 1]
    }
    
    if (data.txId === 'c27ba076-7d8e-4207-b72b-403b01dadf72') {
      console.log(`Found orphaned transaction (stream ID: ${streamId})`)
      await redis.xdel(STREAM_PENDING_TX, streamId)
      console.log('✅ Deleted\n')
      break
    }
  }
  
  const finalLength = await redis.xlen(STREAM_PENDING_TX)
  console.log(`Queue now has ${finalLength} messages\n`)
  
  await redis.quit()
}

main().catch(console.error)
