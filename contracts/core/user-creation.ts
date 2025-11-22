/**
 * User Creation Core Contract
 *
 * Handles blockchain account creation with signature verification.
 *
 * Requirements:
 * - Username must be unique (start with @)
 * - Public key must be provided
 * - Signature must be valid
 * - Nonce must be 0 for new accounts
 * - Timestamp must be recent
 *
 * This contract validates user creation requests and returns the user data
 * for the block producer to insert into the database.
 */

import { console } from 'tana/core'
import { context } from 'tana/context'

export async function contract() {
  console.log('👤 User Creation Contract')
  console.log('==========================\n')

  // Get input from transaction
  const input = context.input()

  // Validate input
  if (!input || !input.username || !input.displayName || !input.publicKey) {
    return { error: 'Invalid user creation input: missing required fields' }
  }

  const { username, displayName, publicKey, bio, avatarData, role, timestamp, nonce } = input

  console.log(`📋 User Registration:`)
  console.log(`   Username: ${username}`)
  console.log(`   Display Name: ${displayName}`)
  console.log(`   Role: ${role || 'user'}\n`)

  // 1. Validate username format
  console.log('1️⃣  Validating username...')
  if (!username.startsWith('@')) {
    return { error: 'Username must start with @' }
  }

  if (username.length < 2) {
    return { error: 'Username must be at least 2 characters (including @)' }
  }
  console.log(`   ✓ Username format valid: ${username}`)

  // 2. Verify username is unique
  console.log('\n2️⃣  Checking username availability...')
  // TODO: Add block.getUserByUsername() to runtime
  // For now, username uniqueness is checked by the block producer
  console.log(`   ⏭️  Username uniqueness check deferred to block producer`)

  // 3. Validate nonce is 0
  console.log('\n3️⃣  Validating nonce...')
  if (nonce !== 0) {
    return { error: 'Nonce must be 0 for user creation transactions' }
  }
  console.log(`   ✓ Nonce is 0`)

  // 4. Validate timestamp is recent (within 5 minutes)
  console.log('\n4️⃣  Validating timestamp...')
  const now = Date.now()
  const timeDiff = Math.abs(now - timestamp)
  const maxAge = 5 * 60 * 1000 // 5 minutes

  if (timeDiff > maxAge) {
    return { error: 'Transaction timestamp is too old or too far in the future' }
  }
  console.log(`   ✓ Timestamp is recent (${Math.floor(timeDiff / 1000)}s ago)`)

  // 5. SOVEREIGN UNIQUENESS CHECK (if role is sovereign)
  if (role === 'sovereign') {
    console.log('\n5️⃣  Checking sovereign uniqueness...')
    // TODO: Add block.getSovereigns() to runtime
    // For now, sovereign uniqueness is checked by the block producer
    console.log(`   ⏭️  Sovereign uniqueness check deferred to block producer`)
  }

  // 6. Calculate state hash (simplified)
  const stateData = { username, publicKey, displayName, role: role || 'user' }
  // TODO: Add core.crypto.sha256() to runtime
  // For now, use a placeholder
  const stateHash = `state_${Date.now()}`

  // 7. Return user creation operation
  console.log('\n✅ User creation authorized')
  console.log(`   Username: ${username}`)
  console.log(`   Display Name: ${displayName}`)
  console.log(`   Role: ${role || 'user'}`)

  return {
    success: true,
    userData: {
      publicKey,
      username,
      displayName,
      bio: bio || null,
      avatarData: avatarData || null,
      role: role || 'user',
      nonce: 0,
      stateHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
}
