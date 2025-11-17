import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgres://tana_ledger_user:ledger_dev_password@localhost:5432/tana_ledger',
  },
} satisfies Config
