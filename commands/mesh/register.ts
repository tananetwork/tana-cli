/**
 * tana mesh register
 *
 * Register current machine with mesh coordinator
 */

import { Command } from 'commander'
import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import os from 'os'
import * as ed from '@noble/ed25519'
import { signMessage } from '../../utils/crypto'

const MESH_URL = process.env.MESH_URL || 'http://mesh:8190'
const CONFIG_DIR = path.join(os.homedir(), '.config', 'tana')
const NODE_KEY_PATH = path.join(CONFIG_DIR, 'node-key.json')

interface NodeKey {
  nodeId: string
  publicKey: string
  privateKey: string
}

/**
 * Generate Ed25519 keypair
 */
async function generateKeypair(): Promise<{ publicKey: string; privateKey: string }> {
  const privateKeyBytes = ed.utils.randomPrivateKey()
  const publicKeyBytes = await ed.getPublicKeyAsync(privateKeyBytes)

  const privateKey = Buffer.from(privateKeyBytes).toString('hex')
  const publicKey = Buffer.from(publicKeyBytes).toString('hex')

  return {
    publicKey: `ed25519_${publicKey}`,
    privateKey: `ed25519_${privateKey}`
  }
}

/**
 * Get or generate node keypair
 */
async function getOrGenerateNodeKey(nodeId: string): Promise<NodeKey> {
  // Ensure config directory exists
  mkdirSync(CONFIG_DIR, { recursive: true })

  // Check if key exists
  if (existsSync(NODE_KEY_PATH)) {
    const existing = JSON.parse(readFileSync(NODE_KEY_PATH, 'utf-8'))
    console.log(`✓ Using existing node key: ${existing.publicKey.slice(0, 16)}...`)
    return existing
  }

  // Generate new keypair
  console.log('⚙️  Generating new node keypair...')
  const keypair = await generateKeypair()

  const nodeKey: NodeKey = {
    nodeId,
    publicKey: keypair.publicKey,
    privateKey: keypair.privateKey
  }

  writeFileSync(NODE_KEY_PATH, JSON.stringify(nodeKey, null, 2))
  console.log(`✓ Node key generated: ${nodeKey.publicKey.slice(0, 16)}...`)

  return nodeKey
}

/**
 * Get or generate service keypair
 */
async function getOrGenerateServiceKey(serviceType: string): Promise<{ publicKey: string, privateKey: string }> {
  const keyPath = path.join(CONFIG_DIR, `${serviceType}-key.json`)

  if (existsSync(keyPath)) {
    const existing = JSON.parse(readFileSync(keyPath, 'utf-8'))
    return existing
  }

  console.log(`⚙️  Generating ${serviceType} service key...`)
  const keypair = await generateKeypair()
  writeFileSync(keyPath, JSON.stringify(keypair, null, 2))

  return keypair
}

/**
 * Detect Tailscale hostname and IP
 */
function detectTailscale(): { hostname: string, ip: string } | null {
  try {
    // Try to get Tailscale status
    const status = execSync('tailscale status --json', { encoding: 'utf-8' })
    const data = JSON.parse(status)

    // Get self info
    const self = data.Self
    if (!self) {
      return null
    }

    return {
      hostname: self.DNSName.replace(/\.$/, ''), // Remove trailing dot
      ip: self.TailscaleIPs?.[0] || ''
    }
  } catch (err) {
    return null
  }
}

/**
 * Register command
 */
export const registerCommand = new Command('register')
  .description('Register this machine with mesh coordinator')
  .option('--role <role>', 'Node role (validator, observer)', 'validator')
  .option('--node-id <id>', 'Custom node ID (default: auto-generated)')
  .action(async (options) => {
    console.log('')
    console.log('🌐 Registering with mesh coordinator...')
    console.log('')

    // 1. Detect Tailscale
    console.log('1. Detecting Tailscale configuration...')
    const tailscale = detectTailscale()

    if (!tailscale) {
      console.error('❌ Tailscale not detected or not running')
      console.error('   Run: tailscale up --hostname=<your-hostname>')
      process.exit(1)
    }

    console.log(`   ✓ Tailscale hostname: ${tailscale.hostname}`)
    console.log(`   ✓ Tailscale IP: ${tailscale.ip}`)
    console.log('')

    // 2. Generate node ID
    const nodeId = options.nodeId || `validator-${tailscale.hostname.split('.')[0]}`
    console.log(`2. Node ID: ${nodeId}`)
    console.log('')

    // 3. Load or generate keys
    console.log('3. Loading cryptographic keys...')
    const nodeKey = await getOrGenerateNodeKey(nodeId)

    // Generate service keys
    const services = [
      { type: 'ledger', port: 8080 },
      { type: 't4', port: 8180 }
    ]

    const serviceKeys = await Promise.all(
      services.map(async s => ({
        ...s,
        ...(await getOrGenerateServiceKey(s.type))
      }))
    )

    console.log(`   ✓ ${serviceKeys.length} service keys ready`)
    console.log('')

    // 4. Build registration payload
    console.log('4. Building registration payload...')
    const registration = {
      nodeId,
      publicKey: nodeKey.publicKey,
      tailscaleHostname: tailscale.hostname,
      tailscaleIP: tailscale.ip,
      services: serviceKeys.map(s => ({
        type: s.type,
        port: s.port,
        publicKey: s.publicKey
      }))
    }

    // 5. Sign registration
    console.log('5. Signing registration...')
    const message = JSON.stringify({
      nodeId: registration.nodeId,
      publicKey: registration.publicKey,
      tailscaleHostname: registration.tailscaleHostname
    })

    const signature = await signMessage(message, nodeKey.privateKey)
    console.log(`   ✓ Signature: ${signature.slice(0, 32)}...`)
    console.log('')

    // 6. Submit to mesh
    console.log(`6. Submitting to ${MESH_URL}/register...`)

    try {
      const response = await fetch(`${MESH_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...registration, signature })
      })

      const result = await response.json()

      if (!response.ok) {
        console.error(`❌ Registration failed: ${result.error || response.statusText}`)
        process.exit(1)
      }

      console.log('')
      console.log('━'.repeat(60))
      console.log('✅ Registration successful!')
      console.log('━'.repeat(60))
      console.log('')
      console.log('  Node ID:', result.nodeId)
      console.log('  Status:', result.status)
      console.log('  Tailscale:', tailscale.hostname)
      console.log('')
      console.log('  Services:')
      serviceKeys.forEach(s => {
        console.log(`    - ${s.type.padEnd(10)} port ${s.port}`)
      })
      console.log('')

      if (result.status === 'pending') {
        console.log('⏳ Awaiting sovereign approval...')
        console.log('')
        console.log('  Next steps:')
        console.log('    1. Sovereign runs: tana mesh approve', nodeId)
        console.log('    2. Check status: tana mesh status')
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
