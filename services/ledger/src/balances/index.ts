/**
 * Balance Management Service
 *
 * Multi-currency balance tracking for users and teams
 */

import { eq, and } from 'drizzle-orm'
import { db, balances, currencies } from '../db'

export interface CreateCurrencyInput {
  code: string
  type: 'fiat' | 'crypto'
  decimals: number
  name?: string
  symbol?: string
  verified?: boolean
}

export interface GetBalanceInput {
  userId: string
  currencyCode: string
}

export interface UpdateBalanceInput extends GetBalanceInput {
  amount: string // Decimal string
}

// ============================================================================
// CURRENCY MANAGEMENT
// ============================================================================

/**
 * Create a new currency
 */
export async function createCurrency(input: CreateCurrencyInput) {
  const [currency] = await db
    .insert(currencies)
    .values({
      code: input.code.toUpperCase(),
      type: input.type,
      decimals: input.decimals.toString(),
      name: input.name,
      symbol: input.symbol,
      verified: input.verified || false,
    })
    .returning()

  return currency
}

/**
 * Get currency by code
 */
export async function getCurrency(code: string) {
  const [currency] = await db
    .select()
    .from(currencies)
    .where(eq(currencies.code, code.toUpperCase()))
    .limit(1)

  return currency || null
}

/**
 * List all currencies
 */
export async function listCurrencies() {
  return await db.select().from(currencies)
}

/**
 * Seed default currencies
 */
export async function seedCurrencies() {
  const defaultCurrencies: CreateCurrencyInput[] = [
    { code: 'USD', type: 'fiat', decimals: 2, name: 'US Dollar', symbol: '$', verified: true },
    { code: 'EUR', type: 'fiat', decimals: 2, name: 'Euro', symbol: '€', verified: true },
    { code: 'GBP', type: 'fiat', decimals: 2, name: 'British Pound', symbol: '£', verified: true },
    { code: 'BTC', type: 'crypto', decimals: 8, name: 'Bitcoin', symbol: '₿', verified: true },
    { code: 'ETH', type: 'crypto', decimals: 18, name: 'Ethereum', symbol: 'Ξ', verified: true },
  ]

  for (const currency of defaultCurrencies) {
    const existing = await getCurrency(currency.code)
    if (!existing) {
      await createCurrency(currency)
    }
  }
}

// ============================================================================
// BALANCE MANAGEMENT
// ============================================================================

/**
 * Get balance for user and currency
 */
export async function getBalance(input: GetBalanceInput) {
  const [balance] = await db
    .select()
    .from(balances)
    .where(
      and(
        eq(balances.userId, input.userId),
        eq(balances.currencyCode, input.currencyCode.toUpperCase())
      )
    )
    .limit(1)

  return balance || null
}

/**
 * Get all balances for a user
 */
export async function getBalances(userId: string) {
  return await db
    .select()
    .from(balances)
    .where(eq(balances.userId, userId))
}

/**
 * Get all balances in the system
 */
export async function getAllBalances() {
  return await db.select().from(balances)
}

/**
 * Set balance (creates if doesn't exist)
 */
export async function setBalance(input: UpdateBalanceInput) {
  // Verify currency exists
  const currency = await getCurrency(input.currencyCode)
  if (!currency) {
    throw new Error(`Currency ${input.currencyCode} not found`)
  }

  // Check if balance exists
  const existing = await getBalance(input)

  if (existing) {
    // Update existing
    const [updated] = await db
      .update(balances)
      .set({
        amount: input.amount,
        updatedAt: new Date(),
      })
      .where(eq(balances.id, existing.id))
      .returning()

    return updated
  } else {
    // Create new
    const [created] = await db
      .insert(balances)
      .values({
        userId: input.userId,
        currencyCode: input.currencyCode.toUpperCase(),
        amount: input.amount,
      })
      .returning()

    return created
  }
}

/**
 * Add to balance
 */
export async function addToBalance(input: UpdateBalanceInput) {
  const current = await getBalance(input)
  const currentAmount = current ? parseFloat(current.amount) : 0
  const addAmount = parseFloat(input.amount)
  const newAmount = (currentAmount + addAmount).toString()

  return await setBalance({ ...input, amount: newAmount })
}

/**
 * Subtract from balance
 */
export async function subtractFromBalance(input: UpdateBalanceInput) {
  const current = await getBalance(input)
  const currentAmount = current ? parseFloat(current.amount) : 0
  const subtractAmount = parseFloat(input.amount)

  if (currentAmount < subtractAmount) {
    throw new Error('Insufficient balance')
  }

  const newAmount = (currentAmount - subtractAmount).toString()
  return await setBalance({ ...input, amount: newAmount })
}

/**
 * Transfer between user accounts
 */
export async function transferBalance(
  fromUserId: string,
  toUserId: string,
  currencyCode: string,
  amount: string
) {
  // Subtract from sender
  await subtractFromBalance({
    userId: fromUserId,
    currencyCode,
    amount,
  })

  // Add to receiver
  await addToBalance({
    userId: toUserId,
    currencyCode,
    amount,
  })

  return true
}
