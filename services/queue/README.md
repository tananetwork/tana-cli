# Tana Transaction Queue Service

High-performance transaction queue using Redis Streams, designed for millisecond-level block production.

## Architecture

The queue service provides a central location for transaction submission and consumption by validators:

```
Client → POST /transactions → Ledger API
                                    ↓
                              Queue to Redis Streams
                                    ↓
                          Redis (tx:pending stream)
                                    ↓
                     Validators consume via XREADGROUP
                                    ↓
                         Block Producer executes
                                    ↓
                         XACK acknowledges processed
```

## Features

- **High Throughput**: O(1) transaction adds, capable of 100,000+ tx/sec
- **Consumer Groups**: Multiple validators can consume from the same stream
- **Exactly-once Processing**: XREADGROUP ensures each transaction is delivered to only one consumer
- **Pub/Sub Notifications**: Optional instant notifications for new transactions
- **Fault Tolerance**: Pending entries list (PEL) prevents transaction loss
- **Stream Management**: Automatic trimming to prevent unbounded growth

## Configuration

### Environment Variables

```bash
# Redis connection URL (default: redis://localhost:6379)
REDIS_URL=redis://localhost:6379
```

### Stream Names

- **tx:pending** - Pending transaction stream
- **validators** - Consumer group name

## Usage

### Queueing Transactions

```typescript
import { queueTransaction, publishNewTransaction } from '@tana/queue'

const streamId = await queueTransaction({
  txId: '123-456-789',
  type: 'transfer',
  from: 'user-a',
  to: 'user-b',
  amount: '100',
  currencyCode: 'USD',
  signature: 'ed25519_...',
  timestamp: Date.now(),
  nonce: 1,
  payload: { /* full transaction data */ }
})

// Notify validators (optional)
await publishNewTransaction('123-456-789')
```

### Consuming Transactions (Validators)

```typescript
import { consumeTransactions, acknowledgeTransactions } from '@tana/queue'

// Unique consumer ID for this validator
const consumerId = 'validator-1'

// Consume up to 100 transactions, block for 1 second if none available
const transactions = await consumeTransactions(consumerId, 100, 1000)

// Process transactions...
for (const tx of transactions) {
  // Execute transaction
  console.log(`Processing tx: ${tx.txId}`)
}

// Acknowledge processed transactions
const streamIds = transactions.map(tx => tx.id)
await acknowledgeTransactions(streamIds)
```

### Stream Management

```typescript
import {
  getPendingCount,
  getStreamLength,
  trimStream,
  ping
} from '@tana/queue'

// Check pending transaction count
const pending = await getPendingCount()
console.log(`Pending: ${pending}`)

// Check total stream length
const total = await getStreamLength()
console.log(`Total: ${total}`)

// Trim old messages (keep last 100k)
await trimStream(100000)

// Health check
const healthy = await ping()
console.log(`Redis: ${healthy ? 'OK' : 'DOWN'}`)
```

## Performance Characteristics

- **Write Latency**: < 1ms (O(1) XADD operation)
- **Read Latency**: < 1ms (O(1) XREADGROUP operation)
- **Throughput**: 100,000+ transactions/second on modern hardware
- **Block Time**: Capable of millisecond-level block production
- **Memory**: ~1KB per transaction in stream

## Consumer Groups

Redis Streams consumer groups ensure:

1. **Load Balancing**: Transactions distributed across validators
2. **Fault Tolerance**: If a validator crashes, its pending entries can be claimed by others
3. **Exactly-once**: Each transaction delivered to only one validator
4. **Ordering**: Transactions consumed in order within the stream

## Monitoring

### Check Consumer Group Status

```bash
# View consumer group info
redis-cli XINFO GROUPS tx:pending

# View pending entries
redis-cli XPENDING tx:pending validators

# View stream length
redis-cli XLEN tx:pending
```

### Production Recommendations

1. **Persistence**: Enable AOF (Append-Only File) in Redis for durability
2. **Replication**: Use Redis replicas for high availability
3. **Monitoring**: Track stream length, pending count, and consumer lag
4. **Trimming**: Regularly trim old entries to prevent unbounded growth
5. **Backpressure**: Implement rate limiting on transaction submission if queue grows too large

## Integration

The queue service is automatically initialized when the ledger service starts:

```typescript
// cli/services/ledger/src/index.ts
import { initializeRedisStreams } from '@tana/queue'

await initializeRedisStreams()
```

Transactions are automatically queued when submitted via the API:

```typescript
// POST /transactions
const transaction = await transactionService.createTransaction(body)
await queueTransaction({ ...transaction })
```

Validators consume from the queue during block production:

```bash
# Run block producer
bun run src/scripts/produce-block.ts
```

## See Also

- [Redis Streams Documentation](https://redis.io/docs/data-types/streams/)
- [Transaction Signing Guide](../../../websites/docs/src/content/docs/guides/transaction-signing.md)
- [Block Production](../ledger/src/scripts/produce-block.ts)
