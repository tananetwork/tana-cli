/**
 * Withdrawal Request Core Contract
 *
 * Handles fiat off-ramp requests (e-transfer withdrawals).
 *
 * Requirements:
 * - User must exist
 * - User must have sufficient balance
 * - Amount must be positive
 * - Reserves balance immediately
 * - Sovereign approves and sends e-transfer
 *
 * This contract validates the withdrawal request and reserves the balance.
 * The sovereign later confirms sending the e-transfer.
 */

import { console } from 'tana/core'
import { context } from 'tana/context'
import { block } from 'tana/block'

export async function contract() {
  console.log('💸 Withdrawal Request Contract')
  console.log('===============================\n')

  // Get input from transaction
  const input = context.input()

  // Validate input
  if (!input || !input.userId || !input.amount || !input.currencyCode) {
    return { error: 'Invalid withdrawal input: missing required fields' }
  }

  const { userId, amount, currencyCode } = input

  // Validate amount is positive
  const amountNum = parseFloat(amount)
  if (isNaN(amountNum) || amountNum <= 0) {
    return { error: `Invalid amount: ${amount}` }
  }

  console.log(`📋 Withdrawal Request:`)
  console.log(`   User: ${userId}`)
  console.log(`   Amount: ${amount} ${currencyCode}\n`)

  // 1. Verify caller matches user
  const caller = context.caller()
  if (!caller || caller.id !== userId) {
    return { error: 'Caller must be the withdrawal requester' }
  }

  // 2. Verify user exists
  console.log('1️⃣  Verifying user...')
  const user = await block.getUser(userId)
  if (!user) {
    return { error: `User not found: ${userId}` }
  }
  console.log(`   ✓ User: ${user.username}`)

  // 3. Check user balance
  console.log('\n2️⃣  Checking balance...')
  const balance = await block.getBalance(userId, currencyCode)

  if (!balance) {
    return { error: `User has no ${currencyCode} balance` }
  }

  const balanceNum = parseFloat(balance.amount)
  console.log(`   Current balance: ${balanceNum} ${currencyCode}`)

  if (balanceNum < amountNum) {
    return {
      error: `Insufficient balance: user has ${balanceNum} ${currencyCode}, needs ${amountNum}`
    }
  }

  // 4. Reserve balance (deduct immediately, sovereign confirms later)
  console.log('\n3️⃣  Reserving balance...')
  const newBalance = (balanceNum - amountNum).toFixed(8)
  console.log(`   New balance: ${newBalance} ${currencyCode}`)

  // 5. Return withdrawal operation
  console.log('\n✅ Withdrawal request created')
  console.log(`   User: ${user.username}`)
  console.log(`   Amount: ${amount} ${currencyCode}`)
  console.log(`   Status: Awaiting sovereign approval`)

  return {
    success: true,
    status: 'pending',
    balanceUpdates: [
      {
        userId,
        currencyCode,
        oldAmount: balance.amount,
        newAmount: newBalance,
        operation: 'debit'
      }
    ],
    pendingWithdrawal: {
      userId,
      amount,
      currencyCode,
      requestedAt: Date.now(),
      status: 'awaiting_sovereign_approval'
    }
  }
}
