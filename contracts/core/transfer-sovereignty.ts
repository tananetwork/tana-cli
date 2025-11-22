/**
 * Sovereignty Transfer Smart Contract
 *
 * This contract handles the transfer of sovereignty from one user to another.
 * Only the current sovereign can execute this contract.
 *
 * Requirements:
 * - Caller must be the current sovereign
 * - New sovereign must be an existing user
 * - New sovereign cannot already be sovereign
 * - Atomic operation: old sovereign demoted to 'user', new user promoted to 'sovereign'
 *
 * This ensures there is always exactly ONE sovereign on the blockchain.
 */

import { block } from 'tana/block'
import { core } from 'tana/core'

// Contract input (passed via contract_call transaction)
interface TransferInput {
  newSovereignId: string
}

// Get input from contract call
declare const input: TransferInput

async function main() {
  core.console.log('🔄 Sovereignty Transfer Contract')
  core.console.log('================================\n')

  // Validate input
  if (!input || !input.newSovereignId) {
    throw new Error('Missing newSovereignId in contract input')
  }

  const newSovereignId = input.newSovereignId
  core.console.log(`📋 Request: Transfer sovereignty to ${newSovereignId}`)

  // 1. Get current sovereign (query blockchain state)
  core.console.log('\n1️⃣  Querying current sovereign...')

  // Use block.executor to check if caller is sovereign
  // The executor is the user who initiated the contract_call transaction
  const caller = await block.getUser(block.executor)

  if (!caller) {
    throw new Error('Caller not found')
  }

  if (caller.role !== 'sovereign') {
    throw new Error(`Only sovereign can transfer sovereignty. Caller role: ${caller.role}`)
  }

  core.console.log(`   ✓ Caller is sovereign: ${caller.username} (${caller.id})`)

  // 2. Verify new sovereign exists and is not already sovereign
  core.console.log('\n2️⃣  Verifying new sovereign...')

  const newSovereign = await block.getUser(newSovereignId)

  if (!newSovereign) {
    throw new Error(`New sovereign user not found: ${newSovereignId}`)
  }

  if (newSovereign.role === 'sovereign') {
    throw new Error(`User ${newSovereign.username} is already sovereign`)
  }

  core.console.log(`   ✓ New sovereign: ${newSovereign.username} (${newSovereign.role})`)

  // 3. Create role_change transactions
  // These will be executed by the block producer
  core.console.log('\n3️⃣  Staging role changes...')

  // Note: In current architecture, we can't directly call tx.updateUserRole()
  // Instead, we indicate success and the calling code will create role_change transactions
  // This is a limitation of the current runtime that will be fixed in future versions

  core.console.log(`   → Demote: ${caller.username} (sovereign → user)`)
  core.console.log(`   → Promote: ${newSovereign.username} (${newSovereign.role} → sovereign)`)

  // 4. Return success with role change data
  core.console.log('\n✅ Sovereign transfer authorized')
  core.console.log(`   From: ${caller.username}`)
  core.console.log(`   To: ${newSovereign.username}`)

  // Return data that the block producer will use to create role_change transactions
  return {
    success: true,
    roleChanges: [
      { userId: caller.id, oldRole: 'sovereign', newRole: 'user' },
      { userId: newSovereignId, oldRole: newSovereign.role, newRole: 'sovereign' }
    ]
  }
}

// Execute contract
main()
