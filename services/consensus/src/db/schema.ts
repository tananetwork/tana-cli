import { pgTable, text, boolean, timestamp, index } from 'drizzle-orm/pg-core'

export const validators = pgTable('validators', {
  id: text('id').primaryKey(),
  publicKey: text('public_key').notNull().unique(),
  wsUrl: text('ws_url').notNull(),
  status: text('status').notNull(),
  lastSeen: timestamp('last_seen'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const blockVotes = pgTable('block_votes', {
  id: text('id').primaryKey(),
  blockHash: text('block_hash').notNull(),
  validatorId: text('validator_id').notNull().references(() => validators.id),
  approve: boolean('approve').notNull(),
  signature: text('signature').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  blockHashIdx: index('block_votes_block_hash_idx').on(table.blockHash),
  validatorIdx: index('block_votes_validator_idx').on(table.validatorId),
}))
