import { upsertValidator } from './src/db/queries'

console.log('Testing upsertValidator...')

try {
  await upsertValidator({
    id: 'val_test',
    publicKey: 'test_key',
    wsUrl: 'ws://test',
    status: 'active',
  })
  console.log('✅ Upsert successful!')
} catch (error) {
  console.error('❌ Upsert failed:', error)
}

process.exit(0)
