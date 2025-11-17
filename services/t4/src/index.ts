/**
 * t4 - Content-Addressable Storage Server
 *
 * Simple HTTP server for storing and retrieving content by SHA256 hash.
 * No networking logic, no replication - just serves files.
 * The blockchain determines what content exists.
 */

import { serve } from 'bun'
import { createHash } from 'crypto'
import { mkdir, writeFile, readFile, stat, rm } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Configuration
const CONTENT_DIR = process.env.CONTENT_DIR || '/var/lib/tana/content'
const PORT = parseInt(process.env.T4_PORT || '8180', 10)

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

    // GET /content/{hash} - Retrieve content
    if (req.method === 'GET') {
      try {
        const data = await readFile(filePath)

        return new Response(data, {
          headers: {
            'Content-Type': 'application/octet-stream',
            'X-Content-Hash': hash,
            'X-Content-Size': data.length.toString(),
            'Cache-Control': 'public, max-age=31536000, immutable' // Content-addressed = immutable
          }
        })
      } catch (err) {
        return new Response('Content not found', { status: 404 })
      }
    }

    // HEAD /content/{hash} - Check existence and get metadata
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

    // PUT /content/{hash} - Store content (with hash verification)
    if (req.method === 'PUT') {
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

    // DELETE /content/{hash} - Remove content
    if (req.method === 'DELETE') {
      try {
        await rm(filePath)

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
console.log('')
console.log('  Endpoints:')
console.log('    GET    /content/{hash}  - Retrieve content')
console.log('    HEAD   /content/{hash}  - Check existence')
console.log('    PUT    /content/{hash}  - Store content')
console.log('    DELETE /content/{hash}  - Remove content')
console.log('    GET    /health          - Health check')
console.log('')
console.log('━'.repeat(60))
console.log('')
