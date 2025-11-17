/**
 * t4 Content Storage Client
 *
 * Client for interacting with the t4 content-addressable storage service
 */

import { createHash } from 'crypto'

export interface ContentMetadata {
  hash: string
  size: number
  type: 'kv_data' | 'contract_code' | 'file_upload'
  owner: string
  metadata?: {
    filename?: string
    mimeType?: string
    contractName?: string
    key?: string
  }
}

/**
 * Client for t4 content storage
 */
export class ContentClient {
  constructor(
    private t4Url: string = process.env.T4_URL || 'http://localhost:8180'
  ) {}

  /**
   * Store content and return SHA256 hash
   */
  async store(data: Buffer): Promise<string> {
    const hash = createHash('sha256').update(data).digest('hex')

    const res = await fetch(`${this.t4Url}/content/${hash}`, {
      method: 'PUT',
      body: data
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(`Failed to store content: ${error}`)
    }

    return hash
  }

  /**
   * Retrieve content by hash
   * Optionally fetch from a specific node
   */
  async fetch(hash: string, fromNode?: string): Promise<Buffer> {
    const url = fromNode
      ? `http://${fromNode}:8180/content/${hash}`
      : `${this.t4Url}/content/${hash}`

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Content not found: ${hash}`)
    }

    const data = Buffer.from(await res.arrayBuffer())

    // Verify hash to detect tampering/corruption
    const computedHash = createHash('sha256').update(data).digest('hex')
    if (computedHash !== hash) {
      throw new Error('Content hash mismatch - data corrupted or tampered')
    }

    return data
  }

  /**
   * Check if content exists
   */
  async exists(hash: string): Promise<boolean> {
    const res = await fetch(`${this.t4Url}/content/${hash}`, {
      method: 'HEAD'
    })

    return res.ok
  }

  /**
   * Get content metadata (size, etc.)
   */
  async metadata(hash: string): Promise<{ size: number } | null> {
    const res = await fetch(`${this.t4Url}/content/${hash}`, {
      method: 'HEAD'
    })

    if (!res.ok) return null

    const size = parseInt(res.headers.get('X-Content-Size') || '0', 10)

    return { size }
  }

  /**
   * Delete content
   * WARNING: Only delete content not referenced in finalized blocks
   */
  async delete(hash: string): Promise<void> {
    const res = await fetch(`${this.t4Url}/content/${hash}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      throw new Error(`Failed to delete content: ${hash}`)
    }
  }

  /**
   * Sync content from another validator
   * Used when a block references content we don't have
   */
  async syncFromNode(hash: string, nodeAddress: string): Promise<void> {
    // Fetch from remote node
    const data = await this.fetch(hash, nodeAddress)

    // Store locally
    await this.store(data)
  }

  /**
   * Health check
   */
  async health(): Promise<boolean> {
    try {
      const res = await fetch(`${this.t4Url}/health`)
      return res.ok
    } catch {
      return false
    }
  }
}

/**
 * Singleton instance
 */
export const contentClient = new ContentClient()
