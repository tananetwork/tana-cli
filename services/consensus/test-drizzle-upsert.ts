import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { validators } from './src/db/schema'

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:tana_dev_password@localhost:5432/tana_ledger_val1'
console.log('Testing Drizzle upsert to:', DATABASE_URL.replace(/:[^:@]+@/, ':***@'))

const client = postgres(DATABASE_URL)
const db = drizzle(client)

try {
  const result = await db.insert(validators)
    .values({
      id: 'test_drizzle',
      publicKey: 'key',
      wsUrl: 'ws://test',
      status: 'active',
    })
    .onConflictDoUpdate({
      target: validators.id,
      set: {
        wsUrl: 'ws://test',
        status: 'active',
        lastSeen: new Date(),
      }
    })
  console.log('✅ Drizzle upsert successful:', result)
} catch (error: any) {
  console.error('❌ Drizzle upsert failed:')
  console.error('  Message:', error.message)
  console.error('  Code:', error.code)
}

await client.end()
process.exit(0)
