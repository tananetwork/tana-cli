/**
 * Deposit Confirmation Core Contract
 *
 * Handles sovereign confirmation of e-transfer deposit receipt.
 *
 * Requirements:
 * - Only sovereign can confirm deposits
 * - Deposit request must exist and be pending
 * - Amount must match or be verified by sovereign
 *
 * This contract completes the deposit flow:
 * 1. User creates deposit request (deposit.ts)
 * 2. User sends e-transfer to sovereign
 * 3. Sovereign confirms receipt (this contract)
 * 4. User's balance is credited
 */

import { console } from 'tana/core'
import { context } from 'tana/context'
import { block } from 'tana/block'

export async function contract() {
  console.log('✅ Deposit Confirmation Contract')
  console.log('==================================\n')

  // Get input from transaction
  const input = context.input()

  // Validate input
  if (!input || !input.depositRequestId || !input.userId || !input.amount || !input.currencyCode) {
    return { error: 'Invalid deposit confirmation input: missing required fields' }
  }

  const { depositRequestId, userId, amount, currencyCode } = input

  // Validate amount is positive
  const amountNum = parseFloat(amount)
  if (isNaN(amountNum) || amountNum <= 0) {
    return { error: `Invalid amount: ${amount}` }
  }

  console.log(`📋 Deposit Confirmation:`)
  console.log(`   Request ID: ${depositRequestId}`)
  console.log(`   User: ${userId}`)
  console.log(`   Amount: ${amount} ${currencyCode}\n`)

  // 1. Verify caller is sovereign
  console.log('1️⃣  Verifying authorization...')
  const caller = context.caller()
  if (!caller) {
    return { error: 'Caller not found' }
  }

  const callerUser = await block.getUser(caller.id)
  if (!callerUser || callerUser.role !== 'sovereign') {
    return { error: 'Only sovereign can confirm deposits' }
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
  const currentAmount = currentBalance ? parseFloat(currentBalance.amount) : 0
  const newAmount = (currentAmount + amountNum).toFixed(8)

  console.log(`   Current balance: ${currentAmount} ${currencyCode}`)
  console.log(`   Deposit amount: ${amountNum} ${currencyCode}`)
  console.log(`   New balance: ${newAmount} ${currencyCode}`)

  // 4. Return deposit confirmation operation
  console.log('\n✅ Deposit confirmed by sovereign')
  console.log(`   E-transfer received from ${user.username}`)
  console.log(`   Crediting ${amount} ${currencyCode}`)

  return {
    success: true,
    balanceUpdates: [
      {
        userId,
        currencyCode,
        oldAmount: currentBalance?.amount || '0',
        newAmount,
        operation: 'credit'
      }
    ],
    depositUpdate: {
      requestId: depositRequestId,
      status: 'completed',
      confirmedBy: caller.id,
      confirmedAt: Date.now(),
      amount,
      currencyCode
    }
  }
}
