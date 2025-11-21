import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://tana_ledger_user:ledger_dev_password@localhost:5432/tana_ledger'

console.log('[Consensus DB] Connecting to:', DATABASE_URL.replace(/:[^:@]+@/, ':***@'))

const client = postgres(DATABASE_URL)
export const db = drizzle(client, { schema })
