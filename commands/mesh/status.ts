/**
 * tana mesh status
 *
 * Check registration status of current node or specific node
 */

import { Command } from 'commander'
import { existsSync, readFileSync } from 'fs'
import path from 'path'
import os from 'os'

const MESH_URL = process.env.MESH_URL || 'http://mesh:8190'
const CONFIG_DIR = path.join(os.homedir(), '.config', 'tana')
const NODE_KEY_PATH = path.join(CONFIG_DIR, 'node-key.json')

interface NodeKey {
  nodeId: string
  publicKey: string
  privateKey: string
}

/**
 * Status command
 */
export const statusCommand = new Command('status')
  .description('Check registration status of node')
  .argument('[nodeId]', 'Node ID to check (defaults to current node)')
  .action(async (nodeId) => {
    console.log('')
    console.log('🔍 Checking node status...')
    console.log('')

    // Determine which node to check
    let targetNodeId = nodeId

    if (!targetNodeId) {
      // Load current node ID
      if (!existsSync(NODE_KEY_PATH)) {
        console.error('❌ Node not registered')
        console.error('')
        console.error('   Run: tana mesh register')
        process.exit(1)
      }

      const nodeKey = JSON.parse(readFileSync(NODE_KEY_PATH, 'utf-8')) as NodeKey
      targetNodeId = nodeKey.nodeId
    }

    console.log(`   Checking: ${targetNodeId}`)
    console.log('')

    // Query mesh
    try {
      const response = await fetch(`${MESH_URL}/nodes/${targetNodeId}`)

      if (!response.ok) {
        if (response.status === 404) {
          console.error('❌ Node not found in mesh registry')
          console.error('')
          console.error('   The node may not be registered yet.')
          console.error('   Run: tana mesh register')
          process.exit(1)
        }

        const result = await response.json()
        console.error(`❌ Error: ${result.error || response.statusText}`)
        process.exit(1)
      }

      const { node } = await response.json()

      console.log('━'.repeat(60))
      console.log('📊 Node Status')
      console.log('━'.repeat(60))
      console.log('')
      console.log('  Node ID:', node.id)
      console.log('  Status:', getStatusEmoji(node.status), node.status.toUpperCase())
      console.log('  Public Key:', node.public_key.slice(0, 16) + '...')
      console.log('')
      console.log('  Tailscale:')
      console.log('    Hostname:', node.tailscale_hostname)
      console.log('    IP:', node.tailscale_ip || 'N/A')
      console.log('')
      console.log('  Timeline:')
      console.log('    Registered:', new Date(node.registered_at).toISOString())
      if (node.approved_at) {
        console.log('    Approved:', new Date(node.approved_at).toISOString())
        console.log('    Approved by:', node.approved_by?.slice(0, 16) + '...')
      }
      if (node.last_heartbeat) {
        console.log('    Last heartbeat:', new Date(node.last_heartbeat).toISOString())
      }
      console.log('')

      if (node.services && node.services.length > 0) {
        console.log('  Services:')
        node.services.forEach((s: any) => {
          console.log(`    - ${s.service_type.padEnd(10)} port ${s.port}`)
        })
        console.log('')
      }

      // Status-specific guidance
      if (node.status === 'pending') {
        console.log('⏳ Awaiting sovereign approval...')
        console.log('')
        console.log('  Next steps:')
        console.log('    1. Sovereign runs: tana mesh approve', node.id)
        console.log('    2. Check again: tana mesh status')
      } else if (node.status === 'active') {
        console.log('✅ Node is active and participating in the network')
      } else if (node.status === 'offline') {
        console.log('⚠️  Node is offline (no recent heartbeat)')
        console.log('')
        console.log('  The node has not sent a heartbeat in the last 5 minutes.')
        console.log('  Check if services are running.')
      } else if (node.status === 'denied') {
        console.log('❌ Node registration was denied by sovereign')
      }

      console.log('')

    } catch (err: any) {
      console.error('❌ Network error:', err.message)
      console.error('')
      console.error('   Is mesh coordinator running?')
      console.error(`   Check: ${MESH_URL}/health`)
      process.exit(1)
    }
  })

function getStatusEmoji(status: string): string {
  switch (status) {
    case 'pending': return '⏳'
    case 'active': return '✅'
    case 'offline': return '⚠️'
    case 'denied': return '❌'
    default: return '❓'
  }
}
