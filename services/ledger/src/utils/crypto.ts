/**
 * Cryptography utilities for Ledger Service
 *
 * This module re-exports functions from the centralized @tana/crypto package
 * and provides ledger-specific verification helpers.
 */

import {
  verifySignature as verifySignatureCore,
  verifyTransactionSignature as verifyTransactionSignatureCore,
  createTransactionMessage as createTransactionMessageCore,
  type TransactionMessage,
  type SignatureVerificationResult
} from '@tana/crypto'

/**
 * Verify an Ed25519 signature
 *
 * @param message - The original message
 * @param signatureHex - The signature in hex format (with or without prefix)
 * @param publicKeyHex - The public key in hex format (with or without prefix)
 * @returns True if signature is valid
 */
export async function verifySignature(
  message: string,
  signatureHex: string,
  publicKeyHex: string
): Promise<boolean> {
  const result = await verifySignatureCore(message, signatureHex, publicKeyHex, {
    debug: process.env.DEBUG_CRYPTO === 'true',
    label: 'ledger'
  })

  if (!result.valid) {
    console.error('[ledger:crypto] Signature verification failed:', result.error)
    if (result.details) {
      console.error('[ledger:crypto] Details:', result.details)
    }
  }

  return result.valid
}

/**
 * Create a canonical message for transaction signing/verification
 *
 * This creates a deterministic string representation of a transaction
 * that can be verified. The order of fields matters for consistency.
 *
 * @param tx - Transaction data to verify
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
  return createTransactionMessageCore(tx as TransactionMessage)
}

/**
 * Verify a user creation transaction signature
 *
 * @param input - User creation input with signature
 * @returns True if signature is valid
 */
export async function verifyUserCreationSignature(input: {
  username: string
  displayName: string
  publicKey: string
  bio?: string
  role?: string
  signature: string
  timestamp: number
  nonce: number
}): Promise<boolean> {
  // Recreate the transaction message that was signed
  const transactionData: TransactionMessage = {
    type: 'user_creation',
    from: '00000000-0000-0000-0000-000000000000',
    to: '00000000-0000-0000-0000-000000000000',
    timestamp: input.timestamp,
    nonce: input.nonce,
    contractInput: {
      username: input.username,
      displayName: input.displayName,
      publicKey: input.publicKey,
      bio: input.bio || '',
      role: input.role || 'user'
    }
  }

  const result = await verifyTransactionSignatureCore(
    transactionData,
    input.signature,
    input.publicKey,
    { debug: process.env.DEBUG_CRYPTO === 'true' }
  )

  if (!result.valid) {
    console.error('[ledger:crypto] User creation signature verification failed:', result.error)
    if (result.details) {
      console.error('[ledger:crypto] Details:', result.details)
    }
  }

  return result.valid
}

/**
 * Verify a transaction signature (transfer, deposit, withdraw, etc.)
 *
 * @param input - Transaction input with signature
 * @param publicKey - Public key of the signer
 * @returns True if signature is valid
 */
export async function verifyTransactionSignature(
  input: {
    type: string
    from: string
    to: string
    amount?: string | null
    currencyCode?: string | null
    timestamp: number
    nonce: number
    contractId?: string
    contractInput?: any
    metadata?: any
  },
  publicKey: string,
  signature: string
): Promise<boolean> {
  // Recreate the transaction message that was signed
  const transactionData: TransactionMessage = {
    type: input.type,
    from: input.from,
    to: input.to,
    timestamp: input.timestamp,
    nonce: input.nonce,
    amount: input.amount,
    currencyCode: input.currencyCode,
    contractId: input.contractId,
    contractInput: input.contractInput,
    metadata: input.metadata,
  }

  const result = await verifyTransactionSignatureCore(
    transactionData,
    signature,
    publicKey,
    { debug: process.env.DEBUG_CRYPTO === 'true' }
  )

  if (!result.valid) {
    console.error(`[ledger:crypto] Transaction signature verification failed (${input.type}):`, result.error)
    if (result.details) {
      console.error('[ledger:crypto] Details:', result.details)
    }
  }

  return result.valid
}
