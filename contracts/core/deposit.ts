/**
 * Deposit Request Core Contract
 *
 * Handles fiat on-ramp requests (e-transfer deposits).
 *
 * Requirements:
 * - User must exist
 * - Amount must be positive
 * - Creates a pending deposit transaction
 * - Sovereign confirms after receiving e-transfer
 *
 * This contract validates the deposit request and creates a pending state.
 * The sovereign later confirms it to credit the user's balance.
 */

import { console } from 'tana/core'
import { context } from 'tana/context'
import { block } from 'tana/block'

export async function contract() {
  console.log('💰 Deposit Request Contract')
  console.log('============================\n')

  // Get input from transaction
  const input = context.input()

  // Validate input
  if (!input || !input.userId || !input.amount || !input.currencyCode) {
    return { error: 'Invalid deposit input: missing required fields' }
  }

  const { userId, amount, currencyCode } = input

  // Validate amount is positive
  const amountNum = parseFloat(amount)
  if (isNaN(amountNum) || amountNum <= 0) {
    return { error: `Invalid amount: ${amount}` }
  }

  console.log(`📋 Deposit Request:`)
  console.log(`   User: ${userId}`)
  console.log(`   Amount: ${amount} ${currencyCode}\n`)

  // 1. Verify caller matches user
  const caller = context.caller()
  if (!caller || caller.id !== userId) {
    return { error: 'Caller must be the deposit recipient' }
  }

  // 2. Verify user exists
  console.log('1️⃣  Verifying user...')
  const user = await block.getUser(userId)
  if (!user) {
    return { error: `User not found: ${userId}` }
  }
  console.log(`   ✓ User: ${user.username}`)

  // 3. Return pending deposit status
  console.log('\n✅ Deposit request created')
  console.log(`   User: ${user.username}`)
  console.log(`   Amount: ${amount} ${currencyCode}`)
  console.log(`   Status: Pending sovereign confirmation`)

  return {
    success: true,
    status: 'pending',
    pendingDeposit: {
      userId,
      amount,
      currencyCode,
      requestedAt: Date.now(),
      status: 'awaiting_etransfer'
    }
  }
}
