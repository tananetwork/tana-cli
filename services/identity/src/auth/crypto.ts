/**
 * Cryptography utilities for Identity Service
 *
 * This module re-exports functions from the centralized @tana/crypto package
 * and provides identity-specific verification helpers.
 */

import {
  verifySignature as verifySignatureCore,
  verifyAuthSignature,
  createAuthMessage,
  type AuthMessage,
  type SignatureVerificationResult
} from '@tananetwork/crypto'

/**
 * Verify an Ed25519 signature
 *
 * @param message - The original message that was signed
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
    label: 'identity'
  })

  if (!result.valid) {
    console.error('[identity:crypto] Signature verification failed:', result.error)
    if (result.details) {
      console.error('[identity:crypto] Details:', result.details)
    }
  }

  return result.valid
}

/**
 * Create canonical message for authentication session approval
 *
 * This creates a deterministic string representation that the mobile app
 * will sign to prove ownership of the private key.
 *
 * @param data - Authentication data to sign
 * @returns Canonical message string
 */
export function createAuthMessage(data: {
  sessionId: string
  challenge: string
  userId: string
  username: string
  timestamp: number
}): string {
  return createAuthMessage(data as AuthMessage)
}

/**
 * Verify authentication approval signature
 *
 * This combines message creation and signature verification for the
 * specific use case of session approval.
 *
 * @param sessionId - The session ID being approved
 * @param challenge - The challenge from the session
 * @param userId - The user ID approving the session
 * @param username - The username approving the session
 * @param timestamp - When the approval was signed
 * @param signature - The Ed25519 signature (hex)
 * @param publicKey - The user's Ed25519 public key (hex)
 * @returns True if the signature is valid
 */
export async function verifyAuthApproval(
  sessionId: string,
  challenge: string,
  userId: string,
  username: string,
  timestamp: number,
  signature: string,
  publicKey: string
): Promise<boolean> {
  const result = await verifyAuthSignature(
    {
      sessionId,
      challenge,
      userId,
      username,
      timestamp
    },
    signature,
    publicKey,
    { debug: process.env.DEBUG_CRYPTO === 'true' }
  )

  if (!result.valid) {
    console.error('[identity:crypto] Auth approval verification failed:', result.error)
    if (result.details) {
      console.error('[identity:crypto] Details:', result.details)
    }
  }

  return result.valid
}

/**
 * Hash a string with SHA-256
 *
 * @param data - String to hash
 * @returns Hex-encoded hash
 */
export function sha256(data: string): string {
  // Re-export from crypto package
  const { sha256Hex } = require('@tananetwork/crypto')
  return sha256Hex(data)
}

/**
 * Convert hex string to bytes
 */
export function hexToBytes(hex: string): Uint8Array {
  // Re-export from crypto package
  const { hexToBytes } = require('@tananetwork/crypto')
  return hexToBytes(hex)
}

/**
 * Convert bytes to hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
  // Re-export from crypto package
  const { bytesToHex } = require('@tananetwork/crypto')
  return bytesToHex(bytes)
}
