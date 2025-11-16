/**
 * Cryptography utilities for Ed25519 signing and verification
 */

import * as ed from '@noble/ed25519'
import { createHash } from 'crypto'

/**
 * Sign a message with Ed25519 private key
 *
 * @param message - The message to sign (will be hashed with SHA-256)
 * @param privateKeyHex - The private key in hex format (with or without 'ed25519_' prefix)
 * @returns Signature as hex string with 'ed25519_' prefix
 */
export async function signMessage(message: string, privateKeyHex: string): Promise<string> {
  // Remove 'ed25519_' prefix if present
  const cleanKey = privateKeyHex.startsWith('ed25519_')
    ? privateKeyHex.substring(8)
    : privateKeyHex

  // Hash the message with SHA-256 (standard practice for Ed25519)
  const messageHash = createHash('sha256').update(message).digest()

  // Sign the hash with the private key
  const privateKeyBytes = Buffer.from(cleanKey, 'hex')
  const signature = await ed.signAsync(messageHash, privateKeyBytes)

  // Return signature as hex string with prefix
  return `ed25519_${Buffer.from(signature).toString('hex')}`
}

/**
 * Verify an Ed25519 signature
 *
 * @param message - The original message
 * @param signatureHex - The signature in hex format (with or without 'ed25519_' prefix)
 * @param publicKeyHex - The public key in hex format (with or without 'ed25519_' prefix)
 * @returns True if signature is valid
 */
export async function verifySignature(
  message: string,
  signatureHex: string,
  publicKeyHex: string
): Promise<boolean> {
  try {
    // Remove 'ed25519_' prefix if present
    const cleanSignature = signatureHex.startsWith('ed25519_')
      ? signatureHex.substring(8)
      : signatureHex
    const cleanPublicKey = publicKeyHex.startsWith('ed25519_')
      ? publicKeyHex.substring(8)
      : publicKeyHex

    // Hash the message with SHA-256
    const messageHash = createHash('sha256').update(message).digest()

    // Verify the signature
    const signatureBytes = Buffer.from(cleanSignature, 'hex')
    const publicKeyBytes = Buffer.from(cleanPublicKey, 'hex')

    return await ed.verifyAsync(signatureBytes, messageHash, publicKeyBytes)
  } catch (error) {
    // Invalid signature format or verification failed
    return false
  }
}

/**
 * Create a canonical message for transaction signing
 *
 * This creates a deterministic string representation of a transaction
 * that can be signed. The order of fields matters for consistency.
 *
 * @param tx - Transaction data to sign
 * @returns Canonical message string
 */
export function createTransactionMessage(tx: {
  type: string
  from: string
  to: string
  amount?: string | null
  currencyCode?: string | null
  timestamp: number
  nonce: number
  contractInput?: any
  metadata?: any
}): string {
  // Create a deterministic ordered object
  const canonical: any = {
    type: tx.type,
    from: tx.from,
    to: tx.to,
    timestamp: tx.timestamp,
    nonce: tx.nonce,
  }

  // Add optional fields in order
  if (tx.amount !== undefined && tx.amount !== null) {
    canonical.amount = tx.amount
  }
  if (tx.currencyCode !== undefined && tx.currencyCode !== null) {
    canonical.currencyCode = tx.currencyCode
  }
  if (tx.contractInput !== undefined) {
    canonical.contractInput = tx.contractInput
  }
  if (tx.metadata !== undefined) {
    canonical.metadata = tx.metadata
  }

  // Return stringified JSON (keys already ordered)
  return JSON.stringify(canonical)
}

/**
 * Extract public key from private key
 *
 * @param privateKeyHex - Private key in hex format (with or without 'ed25519_' prefix)
 * @returns Public key as hex string with 'ed25519_' prefix
 */
export async function getPublicKeyFromPrivate(privateKeyHex: string): Promise<string> {
  // Remove 'ed25519_' prefix if present
  const cleanKey = privateKeyHex.startsWith('ed25519_')
    ? privateKeyHex.substring(8)
    : privateKeyHex

  const privateKeyBytes = Buffer.from(cleanKey, 'hex')
  const publicKeyBytes = await ed.getPublicKeyAsync(privateKeyBytes)

  return `ed25519_${Buffer.from(publicKeyBytes).toString('hex')}`
}
