/**
 * Generate a test Ed25519 keypair
 */

import * as ed from '@noble/ed25519'
import { randomBytes } from 'crypto'

async function generateKeypair() {
  // Generate random private key
  const privateKeyBytes = randomBytes(32)
  
  // Get corresponding public key
  const publicKeyBytes = await ed.getPublicKeyAsync(privateKeyBytes)
  
  const privateKey = 'ed25519_' + Buffer.from(privateKeyBytes).toString('hex')
  const publicKey = 'ed25519_' + Buffer.from(publicKeyBytes).toString('hex')
  
  console.log('Generated Ed25519 Keypair:')
  console.log('Private Key:', privateKey)
  console.log('Public Key:', publicKey)
  console.log('\nCopy these into your test script!')
}

generateKeypair()
