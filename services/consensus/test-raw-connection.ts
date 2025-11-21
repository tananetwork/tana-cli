import postgres from 'postgres'

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:tana_dev_password@localhost:5432/tana_ledger_val1'
console.log('Testing connection to:', DATABASE_URL.replace(/:[^:@]+@/, ':***@'))

const sql = postgres(DATABASE_URL)

try {
  const result = await sql`
    INSERT INTO validators (id, public_key, ws_url, status)
    VALUES ('test_raw', 'key', 'ws://test', 'active')
    RETURNING *
  `
  console.log('✅ Insert successful:', result)
} catch (error: any) {
  console.error('❌ Insert failed:')
  console.error('  Message:', error.message)
  console.error('  Code:', error.code)
}

await sql.end()
process.exit(0)
