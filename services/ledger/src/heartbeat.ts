/**
 * Heartbeat automation for mesh network coordination
 *
 * Sends periodic heartbeats to the mesh coordinator to maintain
 * active validator status and service health monitoring.
 */

import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { homedir } from 'os'
import path from 'path'
import { signMessage } from '../../../utils/crypto'

// Configuration
const HEARTBEAT_INTERVAL = 2 * 60 * 1000 // 2 minutes
const MESH_URL = process.env.MESH_URL || 'http://localhost:8190'
const T4_URL = process.env.T4_URL || 'http://localhost:8180'

interface NodeKey {
  nodeId: string
  publicKey: string
  privateKey: string
  tailscaleIP?: string
}

interface ServiceHealth {
  type: string
  healthy: boolean
  lastCheck: number
}

/**
 * Load node key from config directory
 */
async function loadNodeKey(): Promise<NodeKey | null> {
  const configDir = path.join(homedir(), '.config', 'tana')
  const keyPath = path.join(configDir, 'node-key.json')

  if (!existsSync(keyPath)) {
    console.warn('⚠️  No node key found - heartbeat disabled')
    console.warn('   Run: tana mesh register')
    return null
  }

  try {
    const keyData = await readFile(keyPath, 'utf-8')
    return JSON.parse(keyData)
  } catch (err: any) {
    console.error('Failed to load node key:', err.message)
    return null
  }
}

/**
 * Check if ledger service is healthy
 */
async function checkLedgerHealth(): Promise<boolean> {
  try {
    const port = process.env.PORT || '8080'
    const response = await fetch(`http://localhost:${port}/health`, {
      signal: AbortSignal.timeout(2000)
    })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Check if t4 service is healthy
 */
async function checkT4Health(): Promise<boolean> {
  try {
    const response = await fetch(`${T4_URL}/health`, {
      signal: AbortSignal.timeout(2000)
    })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Send heartbeat to mesh coordinator
 */
async function sendHeartbeat(nodeKey: NodeKey): Promise<boolean> {
  try {
    // Check service health
    const [ledgerHealthy, t4Healthy] = await Promise.all([
      checkLedgerHealth(),
      checkT4Health()
    ])

    const services: ServiceHealth[] = [
      { type: 'ledger', healthy: ledgerHealthy, lastCheck: Date.now() },
      { type: 't4', healthy: t4Healthy, lastCheck: Date.now() }
    ]

    // Create heartbeat message
    const timestamp = Date.now()
    const message = `heartbeat:${nodeKey.nodeId}:${timestamp}`
    const signature = await signMessage(message, nodeKey.privateKey)

    // Send to mesh
    const response = await fetch(`${MESH_URL}/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nodeId: nodeKey.nodeId,
        timestamp,
        tailscaleIP: nodeKey.tailscaleIP,
        services,
        signature
      }),
      signal: AbortSignal.timeout(5000)
    })

    if (!response.ok) {
      const error = await response.text()
      console.error(`❌ Heartbeat failed (${response.status}):`, error)
      return false
    }

    const result = await response.json()

    // Log health status
    const healthStatus = services.map(s =>
      `${s.type}:${s.healthy ? '✓' : '✗'}`
    ).join(' ')

    console.log(`💓 Heartbeat sent [${healthStatus}]`)

    return true

  } catch (err: any) {
    console.error('❌ Heartbeat error:', err.message)
    return false
  }
}

/**
 * Start heartbeat automation
 */
export async function startHeartbeat() {
  const nodeKey = await loadNodeKey()

  if (!nodeKey) {
    console.log('⏸️  Heartbeat automation disabled (no node key)')
    return
  }

  console.log(`💓 Heartbeat automation started`)
  console.log(`   Node ID: ${nodeKey.nodeId}`)
  console.log(`   Interval: ${HEARTBEAT_INTERVAL / 1000}s`)
  console.log(`   Mesh URL: ${MESH_URL}`)

  // Send initial heartbeat
  await sendHeartbeat(nodeKey)

  // Schedule periodic heartbeats
  setInterval(async () => {
    await sendHeartbeat(nodeKey)
  }, HEARTBEAT_INTERVAL)
}
