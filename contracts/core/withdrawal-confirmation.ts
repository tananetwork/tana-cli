/**
 * Withdrawal Confirmation Core Contract
 *
 * Handles sovereign confirmation of e-transfer withdrawal sent.
 *
 * Requirements:
 * - Only sovereign can confirm withdrawals
 * - Withdrawal request must exist and be pending
 * - Balance was already deducted in withdraw.ts
 *
 * This contract completes the withdrawal flow:
 * 1. User creates withdrawal request (withdraw.ts) - balance deducted
 * 2. Sovereign reviews request
 * 3. Sovereign sends e-transfer to user
 * 4. Sovereign confirms completion (this contract)
 */

import { console } from 'tana/core'
import { context } from 'tana/context'
import { block } from 'tana/block'

export async function contract() {
  console.log('💸 Withdrawal Confirmation Contract')
  console.log('=====================================\n')

  // Get input from transaction
  const input = context.input()

  // Validate input
  if (!input || !input.withdrawalRequestId || !input.userId) {
    return { error: 'Invalid withdrawal confirmation input: missing required fields' }
  }

  const { withdrawalRequestId, userId, transactionReference } = input

  console.log(`📋 Withdrawal Confirmation:`)
  console.log(`   Request ID: ${withdrawalRequestId}`)
  console.log(`   User: ${userId}`)
  if (transactionReference) {
    console.log(`   Transaction Ref: ${transactionReference}`)
  }
  console.log('')

  // 1. Verify caller is sovereign
  console.log('1️⃣  Verifying authorization...')
  const caller = context.caller()
  if (!caller) {
    return { error: 'Caller not found' }
  }

  const callerUser = await block.getUser(caller.id)
  if (!callerUser || callerUser.role !== 'sovereign') {
    return { error: 'Only sovereign can confirm withdrawals' }
  }
  console.log(`   ✓ Caller is sovereign: ${callerUser.username}`)

  // 2. Verify user exists
  console.log('\n2️⃣  Verifying user...')
  const user = await block.getUser(userId)
  if (!user) {
    return { error: `User not found: ${userId}` }
  }
  console.log(`   ✓ User: ${user.username}`)

  // 3. Verify withdrawal request exists
  console.log('\n3️⃣  Verifying withdrawal request...')
  // TODO: Add block.getPendingWithdrawal() to runtime
  // For now, withdrawal request verification is done by block producer
  console.log(`   ⏭️  Withdrawal request verification deferred to block producer`)

  // 4. Return withdrawal confirmation operation
  console.log('\n✅ Withdrawal confirmed by sovereign')
  console.log(`   E-transfer sent to ${user.username}`)
  console.log(`   Status: Completed`)

  return {
    success: true,
    withdrawalUpdate: {
      requestId: withdrawalRequestId,
      status: 'completed',
      confirmedBy: caller.id,
      confirmedAt: Date.now(),
      transactionReference: transactionReference || null
    }
  }
}
