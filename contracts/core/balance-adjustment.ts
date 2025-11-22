/**
 * Balance Adjustment Core Contract
 *
 * Handles manual balance adjustments for recovery or administrative purposes.
 *
 * Requirements:
 * - Only sovereign can adjust balances
 * - Explicit reason required for audit trail
 * - User must exist
 * - Amount must be valid
 *
 * This contract is for emergency recovery and administrative corrections.
 * All adjustments are logged on-chain for full transparency.
 */

import { console } from 'tana/core'
import { context } from 'tana/context'
import { block } from 'tana/block'

export async function contract() {
  console.log('⚙️  Balance Adjustment Contract')
  console.log('================================\n')

  // Get input from transaction
  const input = context.input()

  // Validate input
  if (!input || !input.userId || !input.currencyCode || !input.amount || !input.reason) {
    return { error: 'Invalid balance adjustment input: missing required fields' }
  }

  const { userId, currencyCode, amount, reason } = input

  // Validate amount is valid
  const amountNum = parseFloat(amount)
  if (isNaN(amountNum) || amountNum < 0) {
    return { error: `Invalid amount: ${amount}` }
  }

  console.log(`📋 Balance Adjustment Request:`)
  console.log(`   User: ${userId}`)
  console.log(`   Currency: ${currencyCode}`)
  console.log(`   New Amount: ${amount}`)
  console.log(`   Reason: ${reason}\n`)

  // 1. Verify caller is sovereign
  console.log('1️⃣  Verifying authorization...')
  const caller = context.caller()
  if (!caller) {
    return { error: 'Caller not found' }
  }

  const callerUser = await block.getUser(caller.id)
  if (!callerUser || callerUser.role !== 'sovereign') {
    return { error: 'Only sovereign can adjust balances' }
  }
  console.log(`   ✓ Caller is sovereign: ${callerUser.username}`)

  // 2. Verify user exists
  console.log('\n2️⃣  Verifying user...')
  const user = await block.getUser(userId)
  if (!user) {
    return { error: `User not found: ${userId}` }
  }
  console.log(`   ✓ User: ${user.username}`)

  // 3. Get current balance
  console.log('\n3️⃣  Checking current balance...')
  const currentBalance = await block.getBalance(userId, currencyCode)
  const oldAmount = currentBalance?.amount || '0'
  console.log(`   Current balance: ${oldAmount} ${currencyCode}`)

  // 4. Validate reason is substantive
  console.log('\n4️⃣  Validating reason...')
  if (reason.length < 10) {
    return { error: 'Reason must be at least 10 characters for audit purposes' }
  }
  console.log(`   ✓ Reason provided: ${reason.substring(0, 50)}${reason.length > 50 ? '...' : ''}`)

  // 5. Return balance adjustment operation
  console.log('\n⚠️  MANUAL BALANCE ADJUSTMENT')
  console.log(`   User: ${user.username} (${userId})`)
  console.log(`   Currency: ${currencyCode}`)
  console.log(`   Old Amount: ${oldAmount}`)
  console.log(`   New Amount: ${amount}`)
  console.log(`   Change: ${(amountNum - parseFloat(oldAmount)).toFixed(8)}`)
  console.log(`   Reason: ${reason}`)
  console.log(`   By: ${callerUser.username}`)

  return {
    success: true,
    balanceUpdates: [
      {
        userId,
        currencyCode,
        oldAmount,
        newAmount: amountNum.toFixed(8),
        operation: 'set',
        reason
      }
    ],
    auditLog: {
      action: 'balance_adjustment',
      performedBy: caller.id,
      targetUser: userId,
      oldAmount,
      newAmount: amount,
      reason,
      timestamp: Date.now()
    }
  }
}
