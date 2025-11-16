/**
 * Database connection for notifications service
 */

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Get database URL from environment
const connectionString = process.env.NOTIFICATIONS_DB_URL || process.env.DATABASE_URL || 'postgres://tana:tana_dev_password@localhost:5432/tana'

// Create postgres connection
const client = postgres(connectionString)

// Create drizzle instance
export const db = drizzle(client, { schema })
