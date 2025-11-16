import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.IDENTITY_DB_URL ||
      process.env.DATABASE_URL ||
      'postgres://tana:tana_dev_password@localhost:5432/tana',
  },
} satisfies Config
