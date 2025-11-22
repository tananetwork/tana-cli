/**
 * Currency Creation Core Contract
 *
 * Handles creation of new currencies on the blockchain.
 *
 * Requirements:
 * - Only sovereign can create currencies
 * - Currency code must be unique
 * - Valid currency type (fiat | crypto)
 * - Decimals between 0-18
 *
 * This contract validates currency creation and returns currency data
 * for the block producer to insert into the database.
 */

import { console } from 'tana/core'
import { context } from 'tana/context'
import { block } from 'tana/block'

export async function contract() {
  console.log('💱 Currency Creation Contract')
  console.log('==============================\n')

  // Get input from transaction
  const input = context.input()

  // Validate input
  if (!input || !input.code || !input.type || input.decimals === undefined) {
    return { error: 'Invalid currency creation input: missing required fields' }
  }

  const { code, type, decimals, name, symbol, verified } = input

  console.log(`📋 Currency Creation Request:`)
  console.log(`   Code: ${code}`)
  console.log(`   Type: ${type}`)
  console.log(`   Decimals: ${decimals}\n`)

  // 1. Verify caller is sovereign
  console.log('1️⃣  Verifying authorization...')
  const caller = context.caller()
  if (!caller) {
    return { error: 'Caller not found' }
  }

  // TODO: Add block.getSovereign() to runtime
  // For now, check if caller has sovereign role
  const callerUser = await block.getUser(caller.id)
  if (!callerUser || callerUser.role !== 'sovereign') {
    return { error: 'Only sovereign can create currencies' }
  }
  console.log(`   ✓ Caller is sovereign: ${callerUser.username}`)

  // 2. Validate currency code format
  console.log('\n2️⃣  Validating currency code...')
  if (!/^[A-Z]{3,10}$/.test(code)) {
    return { error: 'Currency code must be 3-10 uppercase letters' }
  }
  console.log(`   ✓ Currency code format valid: ${code}`)

  // 3. Validate currency type
  console.log('\n3️⃣  Validating currency type...')
  if (type !== 'fiat' && type !== 'crypto') {
    return { error: 'Currency type must be "fiat" or "crypto"' }
  }
  console.log(`   ✓ Currency type: ${type}`)

  // 4. Validate decimals
  console.log('\n4️⃣  Validating decimals...')
  const decimalsNum = parseInt(decimals)
  if (isNaN(decimalsNum) || decimalsNum < 0 || decimalsNum > 18) {
    return { error: 'Decimals must be between 0 and 18' }
  }
  console.log(`   ✓ Decimals: ${decimalsNum}`)

  // 5. Check if currency already exists
  console.log('\n5️⃣  Checking currency uniqueness...')
  // TODO: Add block.getCurrency() to runtime
  // For now, currency uniqueness is checked by the block producer
  console.log(`   ⏭️  Currency uniqueness check deferred to block producer`)

  // 6. Return currency creation operation
  console.log('\n✅ Currency creation authorized')
  console.log(`   Code: ${code}`)
  console.log(`   Type: ${type}`)
  console.log(`   Decimals: ${decimalsNum}`)
  console.log(`   Name: ${name || 'N/A'}`)

  return {
    success: true,
    currencyData: {
      code,
      type,
      decimals: decimalsNum,
      name: name || null,
      symbol: symbol || null,
      verified: verified || false,
      createdAt: new Date().toISOString()
    }
  }
}
