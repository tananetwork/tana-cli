/**
 * tana mesh approve
 *
 * Approve a pending node registration (sovereign only)
 */

import { Command } from 'commander'
import { signMessage } from '../../utils/crypto'
import { existsSync, readFileSync } from 'fs'
import path from 'path'
import os from 'os'

const MESH_URL = process.env.MESH_URL || 'http://mesh:8190'
const CONFIG_DIR = path.join(os.homedir(), '.config', 'tana')
const SOVEREIGN_KEY_PATH = path.join(CONFIG_DIR, 'sovereign-key.json')

interface SovereignKey {
  publicKey: string
  privateKey: string
}

/**
 * Load sovereign key
 */
function loadSovereignKey(): SovereignKey | null {
  if (!existsSync(SOVEREIGN_KEY_PATH)) {
    return null
  }

  return JSON.parse(readFileSync(SOVEREIGN_KEY_PATH, 'utf-8'))
}

/**
 * Approve command
 */
export const approveCommand = new Command('approve')
  .description('Approve a pending node registration (sovereign only)')
  .argument('<nodeId>', 'Node ID to approve (e.g., validator-002)')
  .action(async (nodeId) => {
    console.log('')
    console.log('✅ Approving node registration...')
    console.log('')

    // 1. Load sovereign key
    console.log('1. Loading sovereign key...')
    const sovereignKey = loadSovereignKey()

    if (!sovereignKey) {
      console.error('❌ Sovereign key not found')
      console.error('')
      console.error('   This command requires sovereign privileges.')
      console.error('   Key should be at:', SOVEREIGN_KEY_PATH)
      console.error('')
      console.error('   If you are the sovereign, ensure your key is properly configured.')
      process.exit(1)
    }

    console.log(`   ✓ Sovereign key: ${sovereignKey.publicKey.slice(0, 16)}...`)
    console.log('')

    // 2. Sign approval message
    console.log('2. Signing approval...')
    const message = `approve:${nodeId}`
    const signature = await signMessage(message, sovereignKey.privateKey)
    console.log(`   ✓ Signature: ${signature.slice(0, 32)}...`)
    console.log('')

    // 3. Submit to mesh
    console.log(`3. Submitting to ${MESH_URL}/approve/${nodeId}...`)

    try {
      const response = await fetch(`${MESH_URL}/approve/${nodeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approverPublicKey: sovereignKey.publicKey,
          signature
        })
      })

      const result = await response.json()

      if (!response.ok) {
        console.error(`❌ Approval failed: ${result.error || response.statusText}`)
        process.exit(1)
      }

      console.log('')
      console.log('━'.repeat(60))
      console.log('✅ Node approved successfully!')
      console.log('━'.repeat(60))
      console.log('')
      console.log('  Node ID:', result.nodeId)
      console.log('  Status:', result.status)
      console.log('')
      console.log('  The node is now active and can participate in the network.')
      console.log('')

    } catch (err: any) {
      console.error('❌ Network error:', err.message)
      console.error('')
      console.error('   Is mesh coordinator running?')
      console.error(`   Check: ${MESH_URL}/health`)
      process.exit(1)
    }
  })
