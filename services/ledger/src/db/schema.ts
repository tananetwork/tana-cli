/**
 * Tana Ledger Database Schema
 *
 * Core tables for users, teams, channels, balances, and transactions
 */

import { pgTable, text, timestamp, jsonb, decimal, boolean, uuid, varchar, pgEnum, bigint, unique } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ============================================================================
// ENUMS
// ============================================================================

export const currencyTypeEnum = pgEnum('currency_type', ['fiat', 'crypto'])
export const userRoleEnum = pgEnum('user_role', ['sovereign', 'staff', 'user'])
export const transactionTypeEnum = pgEnum('transaction_type', ['transfer', 'deposit', 'withdraw', 'contract_call', 'user_creation', 'contract_deployment', 'role_change'])
export const transactionStatusEnum = pgEnum('transaction_status', ['pending', 'confirmed', 'failed'])

// ============================================================================
// USERS
// ============================================================================

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  publicKey: text('public_key').notNull().unique(), // Ed25519 public key
  username: varchar('username', { length: 50 }).notNull().unique(), // @alice
  displayName: varchar('display_name', { length: 100 }).notNull(),

  // Role
  role: userRoleEnum('role').notNull().default('user'), // user, staff, or sovereign

  // Metadata
  bio: text('bio'),
  avatarData: text('avatar_data'), // Base64 small image or null
  avatarHash: varchar('avatar_hash', { length: 64 }), // Content hash if stored off-chain

  // Security & replay protection
  nonce: bigint('nonce', { mode: 'number' }).notNull().default(0), // Transaction nonce for replay protection

  // State tracking
  stateHash: varchar('state_hash', { length: 64 }).notNull(), // Merkle root of account state

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ============================================================================
// CURRENCIES
// ============================================================================

export const currencies = pgTable('currencies', {
  code: varchar('code', { length: 10 }).primaryKey(), // "USD", "BTC", "ETH"
  type: currencyTypeEnum('type').notNull(),
  decimals: decimal('decimals', { precision: 2 }).notNull(), // Precision (2 for USD, 8 for BTC)
  verified: boolean('verified').notNull().default(false), // Is this officially supported?

  // Metadata
  name: varchar('name', { length: 100 }), // "US Dollar", "Bitcoin"
  symbol: varchar('symbol', { length: 10 }), // "$", "₿"

  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ============================================================================
// BALANCES
// ============================================================================

export const balances = pgTable('balances', {
  id: uuid('id').primaryKey().defaultRandom(),

  // Owner (user only - teams removed)
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // Currency and amount
  currencyCode: varchar('currency_code', { length: 10 }).notNull().references(() => currencies.code),
  amount: decimal('amount', { precision: 20, scale: 8 }).notNull().default('0'), // Up to 8 decimals

  // Timestamps
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  // Unique constraint: one balance per user+currency combination
  uniqueUserCurrency: unique().on(table.userId, table.currencyCode),
}))

// ============================================================================
// TRANSACTIONS
// ============================================================================

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(), // Also serves as tx hash

  // From/To
  from: uuid('from').notNull(), // User or Team ID
  to: uuid('to').notNull(), // User or Team ID

  // Amount (optional - only for transfer/deposit/withdraw types)
  amount: decimal('amount', { precision: 20, scale: 8 }),
  currencyCode: varchar('currency_code', { length: 10 }).references(() => currencies.code),

  // Type
  type: transactionTypeEnum('type').notNull(),

  // Contract call data (optional)
  contractId: uuid('contract_id'), // Smart contract ID if type is contract_call
  contractInput: jsonb('contract_input'), // Arguments passed to contract

  // Metadata (e-transfer instructions, reference codes, etc.)
  metadata: jsonb('metadata'),

  // Signature
  signature: text('signature').notNull(), // Ed25519 signature

  // Status
  status: transactionStatusEnum('status').notNull().default('pending'),
  blockHeight: bigint('block_height', { mode: 'number' }), // Block inclusion

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  confirmedAt: timestamp('confirmed_at'),
})

// ============================================================================
// BLOCKS
// ============================================================================

export const blocks = pgTable('blocks', {
  // Block identification
  height: bigint('height', { mode: 'number' }).primaryKey(), // 0 for genesis, then 1, 2, 3...
  hash: varchar('hash', { length: 64 }).notNull().unique(), // SHA256 of block contents
  previousHash: varchar('previous_hash', { length: 64 }).notNull(), // Hash of previous block (0x00... for genesis)

  // Block metadata
  timestamp: timestamp('timestamp').notNull(), // Block creation time
  producer: uuid('producer').notNull(), // Node/user that produced this block

  // FULL TRANSACTION DATA (self-contained)
  transactions: jsonb('transactions').notNull(), // Array of complete transaction objects with signatures

  // STATE CHANGES (before/after snapshots)
  stateChanges: jsonb('state_changes').notNull(), // Array of state transitions for this block

  // CONTENT REFERENCES (for large data > 10KB)
  contentRefs: jsonb('content_refs'), // Array of SHA256 hashes to content-addressed storage

  // Merkle commitments
  txRoot: varchar('tx_root', { length: 64 }).notNull(), // Hash of transactions array (tamper detection)
  stateRoot: varchar('state_root', { length: 64 }).notNull(), // Merkle root of state after this block

  // Transaction count (derived)
  txCount: bigint('tx_count', { mode: 'number' }).notNull().default(0),

  // Execution
  gasUsed: bigint('gas_used', { mode: 'number' }).notNull().default(0), // Total gas consumed in block
  gasLimit: bigint('gas_limit', { mode: 'number' }).notNull(), // Maximum gas allowed

  // Producer signature
  signature: text('signature').notNull(), // Ed25519 signature of block hash

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  finalizedAt: timestamp('finalized_at'), // When block became final (after consensus)
})

// ============================================================================
// CONTRACTS
// ============================================================================

export const contracts = pgTable('contracts', {
  id: uuid('id').primaryKey().defaultRandom(),

  // Owner and naming
  ownerId: uuid('owner_id').notNull().references(() => users.id), // Who deployed it
  name: varchar('name', { length: 100 }).notNull(), // Contract name

  // Source code
  sourceCode: text('source_code').notNull(), // Original TypeScript source

  // Extracted functions (TypeScript - not transpiled)
  initCode: text('init_code'), // Optional - runs once on deployment
  contractCode: text('contract_code').notNull(), // Required - runs on contract execution
  getCode: text('get_code'), // Optional - HTTP GET handler
  postCode: text('post_code'), // Optional - HTTP POST handler

  // Function availability flags
  hasInit: boolean('has_init').notNull().default(false),
  hasGet: boolean('has_get').notNull().default(false),
  hasPost: boolean('has_post').notNull().default(false),

  // Version and state
  version: varchar('version', { length: 20 }).notNull().default('1.0.0'),
  isActive: boolean('is_active').notNull().default(true),

  // Deployment info
  deployedInBlock: bigint('deployed_in_block', { mode: 'number' }).notNull(),
  deploymentTxId: uuid('deployment_tx_id').notNull(),

  // Metadata
  description: text('description'),
  metadata: jsonb('metadata'), // Tags, documentation, etc.

  // Code hash for verification
  codeHash: varchar('code_hash', { length: 64 }).notNull(),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ============================================================================
// CONTRACT STORAGE (KV Store for Smart Contracts)
// ============================================================================

export const contractStorage = pgTable('contract_storage', {
  id: uuid('id').primaryKey().defaultRandom(),

  // Contract namespace
  contractName: varchar('contract_name', { length: 100 }).notNull(),

  // Key-value pair
  key: varchar('key', { length: 255 }).notNull(),
  value: text('value').notNull(), // JSON-serialized value

  // Metering metadata
  sizeBytes: bigint('size_bytes', { mode: 'number' }).notNull(),
  valueType: varchar('value_type', { length: 20 }), // 'string', 'number', 'object', 'array', 'boolean'

  // Access tracking for gas optimization
  accessCount: bigint('access_count', { mode: 'number' }).notNull().default(0),
  lastAccessedAt: timestamp('last_accessed_at'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  // Ensure each contract can only have one value per key
  uniqueContractKey: unique().on(table.contractName, table.key),
}))


// ============================================================================
// RELATIONS (for Drizzle ORM queries)
// ============================================================================

export const transactionsRelations = relations(transactions, ({ one }) => ({
  currency: one(currencies, {
    fields: [transactions.currencyCode],
    references: [currencies.code],
  }),
}))
