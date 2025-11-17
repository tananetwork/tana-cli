/**
 * Transaction API Routes
 */

import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { randomUUID } from 'crypto'
import * as transactionService from '../../transactions'
import { createTransactionSchema, confirmTransactionSchema } from '../schemas'
import { isSovereign } from '../../accounts/users'
import { queueTransaction, publishNewTransaction } from '@tananetwork/queue'

const app = new Hono()

// GET /transactions - Get all transactions
app.get('/', async (c) => {
  const limit = parseInt(c.req.query('limit') || '100')
  const offset = parseInt(c.req.query('offset') || '0')

  const transactions = await transactionService.getAllTransactions(limit, offset)
  return c.json(transactions)
})

// POST /transactions - Submit new transaction
// NOTE: Transactions are NOT written to PostgreSQL until confirmed in a block
// Redis queue is the single source of truth for pending transactions
app.post('/', zValidator('json', createTransactionSchema), async (c) => {
  const body = c.req.valid('json')

  try {
    // Validate transaction (signature, nonce, balance, etc.)
    const validation = await transactionService.validateTransaction(body)
    if (!validation.valid) {
      return c.json({ error: validation.error }, 400)
    }

    // Generate transaction ID
    const txId = randomUUID()

    // Queue transaction to Redis (ONLY place pending transactions exist)
    const streamId = await queueTransaction({
      txId,
      type: body.type,
      from: body.from,
      to: body.to,
      amount: body.amount?.toString(),
      currencyCode: body.currencyCode,
      signature: body.signature,
      timestamp: body.timestamp,
      nonce: body.nonce,
      contractId: body.contractId,
      contractInput: body.contractInput,
      payload: body
    })

    // Notify validators via pub/sub (optional, for instant notifications)
    await publishNewTransaction(txId)

    return c.json({
      id: txId,
      status: 'queued', // Not 'pending' - it's in Redis queue
      streamId,
      type: body.type,
      from: body.from,
      to: body.to,
      timestamp: body.timestamp,
      message: 'Transaction queued for inclusion in next block'
    }, 201)
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
})

// GET /transactions/:id - Get transaction
app.get('/:id', async (c) => {
  const { id } = c.req.param()
  const transaction = await transactionService.getTransaction(id)

  if (!transaction) {
    return c.json({ error: 'Transaction not found' }, 404)
  }

  return c.json(transaction)
})

// POST /transactions/:id/confirm - Confirm transaction
app.post('/:id/confirm', zValidator('json', confirmTransactionSchema), async (c) => {
  const body = c.req.valid('json')

  try {
    // Get transaction to check type
    const transaction = await transactionService.getTransaction(body.id)
    if (!transaction) {
      return c.json({ error: 'Transaction not found' }, 404)
    }

    // Only sovereign can confirm deposit/withdraw transactions
    if (transaction.type === 'deposit' || transaction.type === 'withdraw') {
      const confirmerId = body.confirmerId || transaction.from
      const hasSovereignRole = await isSovereign(confirmerId)

      if (!hasSovereignRole) {
        return c.json({
          error: 'Only sovereign users can confirm deposit/withdraw transactions'
        }, 403)
      }
    }

    const confirmedTransaction = await transactionService.confirmTransaction(body)
    return c.json(confirmedTransaction)
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
})

// GET /transactions/pending - Get pending transactions
app.get('/pending', async (c) => {
  const limit = parseInt(c.req.query('limit') || '100')
  const transactions = await transactionService.getPendingTransactions(limit)
  return c.json(transactions)
})

// GET /transactions/pending/deposits - Get pending deposit requests (sovereign review queue)
app.get('/pending/deposits', async (c) => {
  const limit = parseInt(c.req.query('limit') || '100')
  const deposits = await transactionService.getPendingDeposits(limit)
  return c.json(deposits)
})

// GET /transactions/pending/withdraws - Get pending withdraw requests (sovereign review queue)
app.get('/pending/withdraws', async (c) => {
  const limit = parseInt(c.req.query('limit') || '100')
  const withdraws = await transactionService.getPendingWithdraws(limit)
  return c.json(withdraws)
})

// GET /transactions/pending/sovereign - Get all pending deposit/withdraw requests (sovereign dashboard)
app.get('/pending/sovereign', async (c) => {
  const limit = parseInt(c.req.query('limit') || '100')
  const requests = await transactionService.getPendingDepositWithdrawRequests(limit)
  return c.json(requests)
})

// GET /transactions/account/:accountId - Get account transactions
app.get('/account/:accountId', async (c) => {
  const { accountId } = c.req.param()
  const limit = parseInt(c.req.query('limit') || '50')
  const offset = parseInt(c.req.query('offset') || '0')

  const transactions = await transactionService.getAccountTransactions(accountId, limit, offset)
  return c.json(transactions)
})

export default app
