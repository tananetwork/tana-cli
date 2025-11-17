/**
 * t4 - Content-Addressable Storage Server
 *
 * Simple HTTP server for storing and retrieving content by SHA256 hash.
 * Uses Service Auth Tokens (SAT) to protect write/delete operations.
 * The blockchain determines what content exists.
 */

import { serve } from 'bun'
import { createHash } from 'crypto'
import { mkdir, writeFile, readFile, stat, rm } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import {
  decodeToken,
  verifySATToken,
  ServiceKeyRegistry
} from '@tananetwork/crypto'

// Configuration
const CONTENT_DIR = process.env.CONTENT_DIR || '/var/lib/tana/content'
const PORT = parseInt(process.env.T4_PORT || '8180', 10)

// Service key registry for authentication
const registry = new ServiceKeyRegistry()

// TODO: In production, fetch service keys from mesh coordinator
// For now, we'll allow any valid SAT token (verification happens at signature level)
// The mesh coordinator will provide the registry of approved service public keys

// Ensure content directory exists
await mkdir(CONTENT_DIR, { recursive: true })

/**
 * Get file path for a given hash (sharded by first 2 chars)
 */
function hashPath(hash: string): string {
  return path.join(CONTENT_DIR, hash.slice(0, 2), hash)
}

/**
 * Verify SHA256 hash matches data
 */
function verifyHash(data: Buffer, expectedHash: string): boolean {
  const computedHash = createHash('sha256').update(data).digest('hex')
  return computedHash === expectedHash
}

/**
 * Verify Service Auth Token from Authorization header
 *
 * @param authHeader - Authorization header value
 * @param registry - Service key registry
 * @returns Service ID if valid, null otherwise
 */
async function verifySAT(
  authHeader: string | null,
  registry: ServiceKeyRegistry
): Promise<string | null> {
  if (!authHeader) {
    return null
  }

  // Decode token
  const token = decodeToken(authHeader)
  if (!token) {
    console.warn('[t4] Invalid token format')
    return null
  }

  // Get public key from registry
  const publicKey = registry.get(token.serviceId, token.nodeId)
  if (!publicKey) {
    // Allow tokens from any service for now (development mode)
    // In production, we'd require pre-registered services
    console.warn(`[t4] Service not in registry: ${token.serviceId}@${token.nodeId}`)
    // TODO: Fetch public key from mesh coordinator
    return null
  }

  // Verify token signature
  const valid = await verifySATToken(token, publicKey)
  if (!valid) {
    console.warn('[t4] Invalid token signature or expired')
    return null
  }

  return token.serviceId
}

/**
 * HTTP Server
 */
const server = serve({
  port: PORT,

  async fetch(req) {
    const url = new URL(req.url)

    // Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        service: 't4',
        contentDir: CONTENT_DIR
      }), {
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Match /content/{hash} pattern (64 hex chars)
    const match = url.pathname.match(/^\/content\/([a-f0-9]{64})$/)

    if (!match) {
      return new Response('Not Found - Use /content/{sha256-hash}', {
        status: 404
      })
    }

    const hash = match[1]
    const filePath = hashPath(hash)

    // GET /content/{hash} - Retrieve content (public, no auth required)
    if (req.method === 'GET') {
      try {
        const data = await readFile(filePath)

        return new Response(data, {
          headers: {
            'Content-Type': 'application/octet-stream',
            'X-Content-Hash': hash,
            'X-Content-Size': data.length.toString(),
            'Cache-Control': 'public, max-age=31536000, immutable'
          }
        })
      } catch (err) {
        return new Response('Content not found', { status: 404 })
      }
    }

    // HEAD /content/{hash} - Check existence (public, no auth required)
    if (req.method === 'HEAD') {
      try {
        const stats = await stat(filePath)

        return new Response(null, {
          headers: {
            'Content-Length': stats.size.toString(),
            'X-Content-Hash': hash,
            'X-Content-Size': stats.size.toString()
          }
        })
      } catch (err) {
        return new Response('Content not found', { status: 404 })
      }
    }

    // PUT /content/{hash} - Store content (requires authentication)
    if (req.method === 'PUT') {
      // Verify SAT
      const authHeader = req.headers.get('Authorization')
      const serviceId = await verifySAT(authHeader, registry)

      if (!serviceId) {
        return new Response(JSON.stringify({
          error: 'Authentication required',
          hint: 'Provide valid Service Auth Token in Authorization header'
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Only ledger service can write content (it's the source of truth)
      if (serviceId !== 'ledger') {
        return new Response(JSON.stringify({
          error: 'Only ledger service can store content',
          actual: serviceId
        }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      try {
        const data = Buffer.from(await req.arrayBuffer())

        // Verify SHA256 matches the hash in URL
        if (!verifyHash(data, hash)) {
          return new Response('Hash mismatch - computed SHA256 does not match URL', {
            status: 400
          })
        }

        // Write to disk (create directory if needed)
        const dir = path.dirname(filePath)
        await mkdir(dir, { recursive: true })
        await writeFile(filePath, data)

        console.log(`✓ Content stored: ${hash.substring(0, 12)}... (${data.length} bytes) by ${serviceId}`)

        return new Response(JSON.stringify({
          hash,
          size: data.length,
          stored: true
        }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'X-Content-Hash': hash,
            'X-Content-Size': data.length.toString()
          }
        })
      } catch (err: any) {
        return new Response(`Storage error: ${err.message}`, {
          status: 500
        })
      }
    }

    // DELETE /content/{hash} - Remove content (requires authentication)
    if (req.method === 'DELETE') {
      // Verify SAT
      const authHeader = req.headers.get('Authorization')
      const serviceId = await verifySAT(authHeader, registry)

      if (!serviceId) {
        return new Response(JSON.stringify({
          error: 'Authentication required',
          hint: 'Provide valid Service Auth Token in Authorization header'
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Only ledger service can delete content (garbage collection)
      if (serviceId !== 'ledger') {
        return new Response(JSON.stringify({
          error: 'Only ledger service can delete content',
          actual: serviceId
        }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      try {
        await rm(filePath)

        console.log(`✓ Content deleted: ${hash.substring(0, 12)}... by ${serviceId}`)

        return new Response(JSON.stringify({
          hash,
          deleted: true
        }), {
          headers: { 'Content-Type': 'application/json' }
        })
      } catch (err) {
        return new Response('Content not found', { status: 404 })
      }
    }

    return new Response('Method Not Allowed', { status: 405 })
  }
})

console.log('')
console.log('🗄️  t4 content storage server')
console.log('━'.repeat(60))
console.log('')
console.log('  Status: Running')
console.log('  Port:', PORT)
console.log('  Content Directory:', CONTENT_DIR)
console.log('  Auth: Service Auth Tokens (SAT) required for PUT/DELETE')
console.log('')
console.log('  Endpoints:')
console.log('    GET    /content/{hash}  - Retrieve content (public)')
console.log('    HEAD   /content/{hash}  - Check existence (public)')
console.log('    PUT    /content/{hash}  - Store content (ledger only)')
console.log('    DELETE /content/{hash}  - Remove content (ledger only)')
console.log('    GET    /health          - Health check')
console.log('')
console.log('━'.repeat(60))
console.log('')
