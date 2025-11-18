/**
 * Database connection and client
 */

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Database connection string
const connectionString = process.env.IDENTITY_DB_URL ||
  process.env.DATABASE_URL ||
  'postgres://tana_identity_user:identity_dev_password@localhost:5432/tana_identity'

// Create postgres client
export const client = postgres(connectionString)

// Create drizzle instance
export const db = drizzle(client, { schema })

// Export schema for use in queries
export * from './schema'
