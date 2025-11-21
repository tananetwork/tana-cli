import { db } from './src/db/index'
import { validators } from './src/db/schema'

console.log('Testing database connection...')
console.log('DATABASE_URL:', process.env.DATABASE_URL)

try {
  const result = await db.insert(validators).values({
    id: 'test123',
    publicKey: 'test_key',
    wsUrl: 'ws://test',
    status: 'active',
  })
  console.log('Insert successful:', result)
} catch (error) {
  console.error('Insert failed:', error)
}
