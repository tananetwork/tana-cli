/**
 * Transaction Service
 *
 * Create and manage blockchain transactions
 */

import { eq } from 'drizzle-orm'
import { db, transactions } from '../db'
import { transferBalance, getBalance, addToBalance, subtractFromBalance } from '../balances'
import { isSovereign, getUserById } from '../accounts/users'
import { verifyTransactionSignature } from '../utils/crypto'
import crypto from 'crypto'

export interface CreateTransactionInput {
  from: string // User or Team ID
  to: string // User or Team ID
  amount?: string
  currencyCode?: string
  type: 'transfer' | 'deposit' | 'withdraw' | 'contract_call' | 'user_creation' | 'contract_deployment'
  signature: string // Ed25519 signature (required)
  timestamp: number // Unix timestamp in milliseconds
  nonce: number // Nonce for replay protection
  contractId?: string
  contractInput?: Record<string, any>
  metadata?: Record<string, any> // For deposit/withdraw instructions, e-transfer reference, etc.
}

export interface ConfirmTransactionInput {
  id: string
  blockId?: string
}

/**
 * Generate e-transfer instructions for deposit
 */
function generateDepositInstructions(transactionId: string, amount: string, currencyCode: string): Record<string, any> {
  return {
    type: 'deposit',
    instructions: `Send an e-transfer of ${amount} ${currencyCode} to the sovereign's registered email.`,
    reference: `DEPOSIT-${transactionId.slice(0, 8).toUpperCase()}`,
    notes: [
      'Use the reference code in your e-transfer message',
      'Once the sovereign receives your e-transfer, they will confirm this transaction',
      'Your balance will be credited once confirmed'
    ]
  }
}

/**
 * Generate withdraw instructions for user
 */
function generateWithdrawInstructions(transactionId: string, amount: string, currencyCode: string): Record<string, any> {
  return {
    type: 'withdraw',
    instructions: `The sovereign will send you an e-transfer of ${amount} ${currencyCode}.`,
    reference: `WITHDRAW-${transactionId.slice(0, 8).toUpperCase()}`,
    notes: [
      'Ensure your registered email is correct',
      'The sovereign will process your withdrawal request',
      'Your balance will be debited once the e-transfer is sent and confirmed'
    ]
  }
}

/**
 * Create a new transaction
 */
export async function createTransaction(input: CreateTransactionInput) {
  // Auto-generate instructions for deposit/withdraw if not provided
  let metadata = input.metadata || {}

  // Generate a temporary ID for instructions (we'll use the real one after insert)
  const tempId = crypto.randomUUID()

  if (input.type === 'deposit' && !metadata.instructions) {
    metadata = {
      ...metadata,
      ...generateDepositInstructions(tempId, input.amount || '0', input.currencyCode || 'USD')
    }
  } else if (input.type === 'withdraw' && !metadata.instructions) {
    metadata = {
      ...metadata,
      ...generateWithdrawInstructions(tempId, input.amount || '0', input.currencyCode || 'USD')
    }
  }

  const [transaction] = await db
    .insert(transactions)
    .values({
      from: input.from,
      to: input.to,
      amount: input.amount || null,
      currencyCode: input.currencyCode ? input.currencyCode.toUpperCase() : null,
      type: input.type,
      signature: input.signature,
      contractId: input.contractId,
      contractInput: input.contractInput as any,
      metadata: metadata as any,
      status: 'pending',
    })
    .returning()

  // Update with correct transaction ID in instructions
  if (transaction.type === 'deposit' || transaction.type === 'withdraw') {
    const updatedMetadata = transaction.metadata as any
    if (updatedMetadata?.reference) {
      updatedMetadata.reference = updatedMetadata.reference.replace(tempId.slice(0, 8).toUpperCase(), transaction.id.slice(0, 8).toUpperCase())

      await db
        .update(transactions)
        .set({ metadata: updatedMetadata })
        .where(eq(transactions.id, transaction.id))
    }
  }

  return transaction
}

/**
 * Get transaction by ID
 */
export async function getTransaction(id: string) {
  const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id)).limit(1)
  return transaction || null
}

/**
 * Get transactions for an account
 */
export async function getAccountTransactions(accountId: string, limit = 50, offset = 0) {
  // This is simplified - would need OR condition for from/to
  return await db.select().from(transactions).where(eq(transactions.from, accountId)).limit(limit).offset(offset)
}

/**
 * Confirm a transaction (execute the transfer)
 */
export async function confirmTransaction(input: ConfirmTransactionInput) {
  const transaction = await getTransaction(input.id)
  if (!transaction) {
    throw new Error('Transaction not found')
  }

  if (transaction.status !== 'pending') {
    throw new Error(`Transaction already ${transaction.status}`)
  }

  try {
    // TODO: Verify signature

    // Execute the transfer based on type
    if (transaction.type === 'transfer') {
      await transferBalance(
        { ownerId: transaction.from, ownerType: 'user' }, // TODO: Handle teams
        { ownerId: transaction.to, ownerType: 'user' },
        transaction.currencyCode,
        transaction.amount
      )
    } else if (transaction.type === 'deposit') {
      // Deposit: Mint currency into the target account
      // Only sovereign can confirm deposits (create currency from nothing)
      // This represents fiat currency entering the blockchain from traditional banking
      if (!transaction.amount || !transaction.currencyCode) {
        throw new Error('Deposit requires amount and currency')
      }

      await addToBalance({
        ownerId: transaction.to,
        ownerType: 'user', // TODO: Handle teams
        currencyCode: transaction.currencyCode,
        amount: transaction.amount
      })
    } else if (transaction.type === 'withdraw') {
      // Withdraw: Burn currency from the source account
      // Only sovereign can confirm withdrawals (destroy currency)
      // This represents fiat currency leaving the blockchain to traditional banking
      if (!transaction.amount || !transaction.currencyCode) {
        throw new Error('Withdraw requires amount and currency')
      }

      await subtractFromBalance({
        ownerId: transaction.from,
        ownerType: 'user', // TODO: Handle teams
        currencyCode: transaction.currencyCode,
        amount: transaction.amount
      })
    } else if (transaction.type === 'contract_call') {
      // TODO: Implement contract call logic
      throw new Error('Contract call not yet implemented')
    }

    // Update transaction status
    const [confirmed] = await db
      .update(transactions)
      .set({
        status: 'confirmed',
        blockId: input.blockId,
        confirmedAt: new Date(),
      })
      .where(eq(transactions.id, input.id))
      .returning()

    return confirmed
  } catch (error) {
    // Mark as failed
    await db
      .update(transactions)
      .set({
        status: 'failed',
      })
      .where(eq(transactions.id, input.id))

    throw error
  }
}

/**
 * Validate a transaction before submission
 */
export async function validateTransaction(input: CreateTransactionInput): Promise<{ valid: boolean; error?: string }> {
  // 1. Verify timestamp is recent (within 5 minutes)
  const now = Date.now()
  const timeDiff = Math.abs(now - input.timestamp)
  if (timeDiff > 5 * 60 * 1000) {
    return { valid: false, error: 'Transaction timestamp is too old or too far in the future' }
  }

  // 2. Get user and verify signature (for all non-user-creation transactions)
  if (input.type !== 'user_creation') {
    const user = await getUserById(input.from)
    if (!user) {
      return { valid: false, error: 'Sender user not found' }
    }

    // Verify nonce matches expected value (currentNonce + 1)
    const expectedNonce = user.nonce + 1
    if (input.nonce !== expectedNonce) {
      return { valid: false, error: `Invalid nonce. Expected ${expectedNonce}, got ${input.nonce}` }
    }

    // Verify signature
    const isValidSignature = await verifyTransactionSignature(
      input,
      user.publicKey,
      input.signature
    )

    if (!isValidSignature) {
      return { valid: false, error: 'Invalid transaction signature. Signature verification failed.' }
    }
  }

  // Skip balance check for non-monetary transactions
  if (input.type === 'user_creation' || input.type === 'contract_deployment' || input.type === 'contract_call') {
    return { valid: true }
  }

  // Validation for deposit/withdraw REQUESTS (anyone can create these)
  if (input.type === 'deposit' || input.type === 'withdraw') {
    // Deposits and withdraws require amount and currency
    if (!input.amount || !input.currencyCode) {
      return { valid: false, error: 'Amount and currency are required for deposit/withdraw requests' }
    }

    // For withdrawal requests, verify the account has sufficient balance
    // (We check this at request time, not just at confirmation time)
    if (input.type === 'withdraw') {
      const balance = await getBalance({
        ownerId: input.from,
        ownerType: 'user',
        currencyCode: input.currencyCode,
      })

      if (!balance) {
        return { valid: false, error: 'You have no balance for this currency' }
      }

      const currentBalance = parseFloat(balance.amount)
      const withdrawAmount = parseFloat(input.amount)

      if (currentBalance < withdrawAmount) {
        return { valid: false, error: `Insufficient balance: ${currentBalance} ${input.currencyCode}` }
      }
    }

    // Deposits don't need balance check (they will create currency when confirmed by sovereign)
    // Deposit requests are valid for any user
    return { valid: true }
  }

  // For regular transfers, check balance
  if (!input.amount || !input.currencyCode) {
    return { valid: false, error: 'Amount and currency are required for transfer transactions' }
  }

  const balance = await getBalance({
    ownerId: input.from,
    ownerType: 'user', // TODO: Handle teams
    currencyCode: input.currencyCode,
  })

  if (!balance) {
    return { valid: false, error: 'Sender has no balance for this currency' }
  }

  const currentBalance = parseFloat(balance.amount)
  const transferAmount = parseFloat(input.amount)

  if (currentBalance < transferAmount) {
    return { valid: false, error: `Insufficient balance: ${currentBalance} ${input.currencyCode}` }
  }

  // TODO: Verify signature
  // TODO: Check if accounts exist
  // TODO: Validate transaction type specific rules

  return { valid: true }
}

/**
 * Get all transactions
 */
export async function getAllTransactions(limit = 100, offset = 0) {
  return await db.select().from(transactions).limit(limit).offset(offset)
}

/**
 * List all pending transactions
 */
export async function getPendingTransactions(limit = 100) {
  return await db.select().from(transactions).where(eq(transactions.status, 'pending')).limit(limit)
}

/**
 * Get pending deposit requests (for sovereign review)
 */
export async function getPendingDeposits(limit = 100) {
  return await db
    .select()
    .from(transactions)
    .where(eq(transactions.type, 'deposit'))
    .where(eq(transactions.status, 'pending'))
    .limit(limit)
}

/**
 * Get pending withdraw requests (for sovereign review)
 */
export async function getPendingWithdraws(limit = 100) {
  return await db
    .select()
    .from(transactions)
    .where(eq(transactions.type, 'withdraw'))
    .where(eq(transactions.status, 'pending'))
    .limit(limit)
}

/**
 * Get all pending deposit/withdraw requests (sovereign queue)
 */
export async function getPendingDepositWithdrawRequests(limit = 100) {
  return await db
    .select()
    .from(transactions)
    .where(eq(transactions.status, 'pending'))
    .limit(limit)
    .then(txs => txs.filter(tx => tx.type === 'deposit' || tx.type === 'withdraw'))
}
