/**
 * Money Transfer Core Contract
 *
 * Handles peer-to-peer money transfers between users.
 *
 * Requirements:
 * - Caller must have sufficient balance
 * - Recipient must exist
 * - Amount must be positive
 * - Currency must be valid
 *
 * This contract validates the transfer and returns balance update operations
 * for the block producer to execute.
 */

import { console } from 'tana/core'
import { context } from 'tana/context'
import { block } from 'tana/block'

export async function contract() {
  console.log('💸 Money Transfer Contract')
  console.log('==========================\n')

  // Get input from transaction
  const input = context.input()

  // Validate input
  if (!input || !input.from || !input.to || !input.amount || !input.currencyCode) {
    return { error: 'Invalid transfer input: missing required fields' }
  }

  const { from, to, amount, currencyCode } = input

  // Validate amount is positive
  const amountNum = parseFloat(amount)
  if (isNaN(amountNum) || amountNum <= 0) {
    return { error: `Invalid amount: ${amount}` }
  }

  console.log(`📋 Transfer Details:`)
  console.log(`   From: ${from}`)
  console.log(`   To: ${to}`)
  console.log(`   Amount: ${amount} ${currencyCode}\n`)

  // 1. Verify caller matches sender
  const caller = context.caller()
  if (!caller || caller.id !== from) {
    return { error: 'Caller must be the sender of the transfer' }
  }

  // 2. Verify sender exists
  console.log('1️⃣  Verifying sender...')
  const sender = await block.getUser(from)
  if (!sender) {
    return { error: `Sender not found: ${from}` }
  }
  console.log(`   ✓ Sender: ${sender.username}`)

  // 3. Verify recipient exists
  console.log('\n2️⃣  Verifying recipient...')
  const recipient = await block.getUser(to)
  if (!recipient) {
    return { error: `Recipient not found: ${to}` }
  }
  console.log(`   ✓ Recipient: ${recipient.username}`)

  // 4. Check sender balance
  console.log('\n3️⃣  Checking sender balance...')
  const senderBalance = await block.getBalance(from, currencyCode)

  if (!senderBalance) {
    return { error: `Sender has no ${currencyCode} balance` }
  }

  const balanceNum = parseFloat(senderBalance.amount)
  console.log(`   Current balance: ${balanceNum} ${currencyCode}`)

  if (balanceNum < amountNum) {
    return {
      error: `Insufficient balance: sender has ${balanceNum} ${currencyCode}, needs ${amountNum}`
    }
  }

  // 5. Calculate new balances
  console.log('\n4️⃣  Calculating new balances...')
  const newSenderBalance = (balanceNum - amountNum).toFixed(8)

  // Get recipient's current balance (may be 0)
  const recipientBalance = await block.getBalance(to, currencyCode)
  const recipientBalanceNum = recipientBalance ? parseFloat(recipientBalance.amount) : 0
  const newRecipientBalance = (recipientBalanceNum + amountNum).toFixed(8)

  console.log(`   Sender new balance: ${newSenderBalance} ${currencyCode}`)
  console.log(`   Recipient new balance: ${newRecipientBalance} ${currencyCode}`)

  // 6. Return balance update operations
  console.log('\n✅ Transfer authorized')
  console.log(`   ${sender.username} → ${recipient.username}`)
  console.log(`   Amount: ${amount} ${currencyCode}`)

  return {
    success: true,
    balanceUpdates: [
      {
        userId: from,
        currencyCode,
        oldAmount: senderBalance.amount,
        newAmount: newSenderBalance,
        operation: 'debit'
      },
      {
        userId: to,
        currencyCode,
        oldAmount: recipientBalance?.amount || '0',
        newAmount: newRecipientBalance,
        operation: 'credit'
      }
    ]
  }
}
