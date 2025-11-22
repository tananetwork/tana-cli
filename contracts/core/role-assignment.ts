/**
 * Role Assignment Core Contract
 *
 * Handles assignment of user roles (staff, user).
 *
 * Requirements:
 * - Only sovereign can assign roles
 * - Cannot assign sovereign role (use transfer-sovereignty.ts)
 * - User must exist
 * - Valid role (staff | user)
 *
 * This contract manages non-sovereign role assignments.
 * For sovereignty transfer, use transfer-sovereignty.ts contract.
 */

import { console } from 'tana/core'
import { context } from 'tana/context'
import { block } from 'tana/block'

export async function contract() {
  console.log('👤 Role Assignment Contract')
  console.log('============================\n')

  // Get input from transaction
  const input = context.input()

  // Validate input
  if (!input || !input.userId || !input.newRole) {
    return { error: 'Invalid role assignment input: missing required fields' }
  }

  const { userId, newRole } = input

  console.log(`📋 Role Assignment Request:`)
  console.log(`   User: ${userId}`)
  console.log(`   New Role: ${newRole}\n`)

  // 1. Verify caller is sovereign
  console.log('1️⃣  Verifying authorization...')
  const caller = context.caller()
  if (!caller) {
    return { error: 'Caller not found' }
  }

  const callerUser = await block.getUser(caller.id)
  if (!callerUser || callerUser.role !== 'sovereign') {
    return { error: 'Only sovereign can assign roles' }
  }
  console.log(`   ✓ Caller is sovereign: ${callerUser.username}`)

  // 2. Validate new role
  console.log('\n2️⃣  Validating role...')
  if (newRole === 'sovereign') {
    return { error: 'Cannot assign sovereign role. Use transfer-sovereignty contract instead.' }
  }

  if (newRole !== 'staff' && newRole !== 'user') {
    return { error: 'Invalid role. Must be "staff" or "user"' }
  }
  console.log(`   ✓ Valid role: ${newRole}`)

  // 3. Verify user exists
  console.log('\n3️⃣  Verifying user...')
  const user = await block.getUser(userId)
  if (!user) {
    return { error: `User not found: ${userId}` }
  }
  console.log(`   ✓ User: ${user.username}`)

  // 4. Check if user is currently sovereign
  console.log('\n4️⃣  Checking current role...')
  if (user.role === 'sovereign') {
    return { error: 'Cannot change sovereign role. Use transfer-sovereignty contract instead.' }
  }
  console.log(`   Current role: ${user.role}`)

  // 5. Check if role is already set
  if (user.role === newRole) {
    return { error: `User already has role: ${newRole}` }
  }

  // 6. Return role assignment operation
  const roleEmoji = newRole === 'staff' ? '⭐' : '👤'
  console.log(`\n✅ Role assignment authorized`)
  console.log(`   User: ${user.username}`)
  console.log(`   ${user.role} → ${roleEmoji} ${newRole}`)

  return {
    success: true,
    roleUpdate: {
      userId,
      username: user.username,
      oldRole: user.role,
      newRole,
      updatedBy: caller.id,
      updatedAt: Date.now()
    }
  }
}
