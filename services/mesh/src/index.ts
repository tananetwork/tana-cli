/**
 * mesh - Network Discovery & Coordination Service
 *
 * Quarterbacks the Tana network:
 * - Node registration & admission control
 * - Service discovery
 * - Health monitoring
 * - Sovereign approval workflow
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { db, queries, isSovereign } from './db'
import { verifySignature } from '@tananetwork/crypto'

const PORT = parseInt(process.env.MESH_PORT || '8190', 10)
const HEARTBEAT_TIMEOUT = 5 * 60 * 1000 // 5 minutes

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors())

// ============================================================================
// HEALTH & INFO
// ============================================================================

app.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'mesh' })
})

app.get('/info', (c) => {
  const pending = queries.getNodesByStatus.all('pending')
  const active = queries.getNodesByStatus.all('active')
  const offline = queries.getNodesByStatus.all('offline')

  return c.json({
    service: 'mesh',
    nodes: {
      pending: pending.length,
      active: active.length,
      offline: offline.length,
      total: pending.length + active.length + offline.length
    }
  })
})

// ============================================================================
// NODE REGISTRATION
// ============================================================================

interface RegisterRequest {
  nodeId: string
  publicKey: string
  tailscaleHostname: string
  tailscaleIP?: string
  services: Array<{
    type: string
    port: number
    publicKey: string
  }>
  signature: string // Self-signed to prove key ownership
}

app.post('/register', async (c) => {
  try {
    const body = await c.req.json() as RegisterRequest

    // Validate required fields
    if (!body.nodeId || !body.publicKey || !body.tailscaleHostname || !body.signature) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // Verify signature (proves node owns the private key)
    const message = JSON.stringify({
      nodeId: body.nodeId,
      publicKey: body.publicKey,
      tailscaleHostname: body.tailscaleHostname
    })

    const valid = await verifySignature(message, body.signature, body.publicKey)
    if (!valid) {
      return c.json({ error: 'Invalid signature' }, 401)
    }

    // Check if node already exists
    const existing = queries.getNode.get(body.nodeId)
    if (existing) {
      return c.json({ error: 'Node already registered' }, 409)
    }

    // Register node (pending status)
    const now = Date.now()
    queries.registerNode.run(
      body.nodeId,
      body.publicKey,
      body.tailscaleHostname,
      body.tailscaleIP || null,
      now,
      body.signature
    )

    // Register services
    for (const service of body.services) {
      queries.registerService.run(
        body.nodeId,
        service.type,
        service.port,
        service.publicKey,
        now
      )
    }

    console.log(`📝 New node registered: ${body.nodeId} (pending approval)`)

    return c.json({
      success: true,
      nodeId: body.nodeId,
      status: 'pending',
      message: 'Registration successful. Awaiting sovereign approval.'
    }, 201)

  } catch (err: any) {
    console.error('Registration error:', err)
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================================
// NODE DISCOVERY
// ============================================================================

app.get('/nodes', (c) => {
  const status = c.req.query('status') || 'active'
  const nodes = queries.getNodesByStatus.all(status)

  // Include services for each node
  const nodesWithServices = nodes.map((node: any) => {
    const services = queries.getNodeServices.all(node.id)
    return { ...node, services }
  })

  return c.json({ nodes: nodesWithServices })
})

app.get('/nodes/:id', (c) => {
  const nodeId = c.param('id')
  const node = queries.getNode.get(nodeId)

  if (!node) {
    return c.json({ error: 'Node not found' }, 404)
  }

  const services = queries.getNodeServices.all(nodeId)

  return c.json({ node: { ...node, services } })
})

// Full network topology
app.get('/topology', (c) => {
  const nodes = queries.getAllNodesWithServices.all()

  return c.json({
    nodes: nodes.map((n: any) => ({
      ...n,
      services: JSON.parse(n.services)
    }))
  })
})

// ============================================================================
// SOVEREIGN APPROVAL
// ============================================================================

interface ApprovalRequest {
  approverPublicKey: string
  signature: string
}

app.post('/approve/:nodeId', async (c) => {
  try {
    const nodeId = c.req.param('nodeId')
    const body = await c.req.json() as ApprovalRequest

    // Verify approver is sovereign
    if (!isSovereign(body.approverPublicKey)) {
      return c.json({ error: 'Unauthorized - not a sovereign key' }, 403)
    }

    // Verify signature
    const message = `approve:${nodeId}`
    const valid = await verifySignature(message, body.signature, body.approverPublicKey)
    if (!valid) {
      return c.json({ error: 'Invalid signature' }, 401)
    }

    // Approve node
    const result = queries.approveNode.run(Date.now(), body.approverPublicKey, nodeId)

    if (result.changes === 0) {
      return c.json({ error: 'Node not found or already processed' }, 404)
    }

    console.log(`✅ Node approved: ${nodeId} by ${body.approverPublicKey.slice(0, 8)}...`)

    return c.json({
      success: true,
      nodeId,
      status: 'active'
    })

  } catch (err: any) {
    console.error('Approval error:', err)
    return c.json({ error: err.message }, 500)
  }
})

app.post('/deny/:nodeId', async (c) => {
  try {
    const nodeId = c.req.param('nodeId')
    const body = await c.req.json() as ApprovalRequest

    // Verify approver is sovereign
    if (!isSovereign(body.approverPublicKey)) {
      return c.json({ error: 'Unauthorized - not a sovereign key' }, 403)
    }

    // Verify signature
    const message = `deny:${nodeId}`
    const valid = await verifySignature(message, body.signature, body.approverPublicKey)
    if (!valid) {
      return c.json({ error: 'Invalid signature' }, 401)
    }

    // Deny node
    const result = queries.denyNode.run(nodeId)

    if (result.changes === 0) {
      return c.json({ error: 'Node not found or already processed' }, 404)
    }

    console.log(`❌ Node denied: ${nodeId}`)

    return c.json({
      success: true,
      nodeId,
      status: 'denied'
    })

  } catch (err: any) {
    console.error('Denial error:', err)
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================================
// HEARTBEAT & HEALTH MONITORING
// ============================================================================

interface ServiceHealth {
  type: string
  healthy: boolean
  lastCheck: number
}

interface HeartbeatRequest {
  nodeId: string
  timestamp: number
  tailscaleIP?: string
  services?: ServiceHealth[]
  signature: string
}

app.post('/heartbeat', async (c) => {
  try {
    const body = await c.req.json() as HeartbeatRequest

    // Get node
    const node = queries.getNode.get(body.nodeId) as any

    if (!node) {
      return c.json({ error: 'Node not registered' }, 404)
    }

    if (node.status !== 'active') {
      return c.json({ error: 'Node not active' }, 403)
    }

    // Verify timestamp is recent (within 1 minute)
    const now = Date.now()
    const timeDiff = Math.abs(now - body.timestamp)
    if (timeDiff > 60000) {
      return c.json({ error: 'Timestamp too old or invalid' }, 400)
    }

    // Verify signature using timestamp from request
    const message = `heartbeat:${body.nodeId}:${body.timestamp}`
    const valid = await verifySignature(message, body.signature, node.public_key)
    if (!valid) {
      return c.json({ error: 'Invalid signature' }, 401)
    }

    // Update heartbeat
    queries.updateHeartbeat.run(now, body.nodeId)
    queries.insertHeartbeat.run(body.nodeId, now, body.tailscaleIP || null)

    // Log service health if provided
    if (body.services && body.services.length > 0) {
      const healthStatus = body.services.map(s =>
        `${s.type}:${s.healthy ? '✓' : '✗'}`
      ).join(' ')
      console.log(`💓 Heartbeat from ${body.nodeId} [${healthStatus}]`)
    }

    return c.json({ success: true, timestamp: now })

  } catch (err: any) {
    console.error('Heartbeat error:', err)
    return c.json({ error: err.message }, 500)
  }
})

// Background task: Mark nodes offline if no heartbeat
setInterval(() => {
  const timeout = Date.now() - HEARTBEAT_TIMEOUT
  const result = queries.markOffline.run(timeout)

  if (result.changes > 0) {
    console.log(`⚠️  Marked ${result.changes} node(s) offline (no heartbeat)`)
  }
}, 60 * 1000) // Check every minute

// ============================================================================
// VALIDATOR REGISTRY (For Multi-Validator Consensus)
// ============================================================================

// Get all active validators (for consensus)
app.get('/validators/active', (c) => {
  const validators = queries.getNodesByStatus.all('active')

  return c.json({
    validators: validators.map((v: any) => ({
      id: v.id,
      publicKey: v.public_key,
      wsUrl: v.tailscale_hostname, // Can be used for WebSocket connection
      lastSeen: v.last_heartbeat
    }))
  })
})

// Register validator (alias for /register with validator type)
app.post('/validators', async (c) => {
  try {
    const body = await c.req.json()

    // Add validator service type if not present
    if (!body.services) {
      body.services = []
    }

    // Ensure validator has consensus service
    const hasConsensus = body.services.some((s: any) => s.type === 'consensus')
    if (!hasConsensus && body.wsUrl) {
      const url = new URL(body.wsUrl)
      body.services.push({
        type: 'consensus',
        port: parseInt(url.port) || 9000,
        publicKey: body.publicKey
      })
    }

    // Register as a node
    const now = Date.now()
    queries.registerNode.run(
      body.id,
      body.publicKey,
      body.wsUrl,
      null, // tailscale IP not needed for local validators
      now,
      body.signature || 'TODO' // TODO: Verify signature
    )

    // Register services
    for (const service of body.services) {
      queries.registerService.run(
        body.id,
        service.type,
        service.port,
        service.publicKey,
        now
      )
    }

    console.log(`🔐 Validator registered: ${body.id}`)

    return c.json({
      success: true,
      validatorId: body.id,
      status: 'pending',
      message: 'Validator registered. Awaiting approval.'
    }, 201)

  } catch (err: any) {
    console.error('Validator registration error:', err)
    return c.json({ error: err.message }, 500)
  }
})

// Validator heartbeat (update last seen, auto-create if needed)
app.post('/validators/:id/heartbeat', async (c) => {
  try {
    const id = c.req.param('id')
    const now = Date.now()

    // Check if validator exists
    const existing = queries.getNode.get(id)

    if (!existing) {
      // Auto-create validator node (active by default for local validators)
      console.log(`[Mesh] Auto-registering validator: ${id}`)
      queries.registerNode.run(
        id,
        `auto_${id}_${Date.now()}`, // placeholder public key
        `${id}.local`,               // placeholder hostname
        '127.0.0.1',                 // localhost
        now,                         // registered_at
        `auto_signature_${id}`       // placeholder signature
      )

      // Auto-approve for local development
      queries.approveNode.run(now, 'auto-sovereign', id)
    }

    queries.updateHeartbeat.run(now, id)
    queries.insertHeartbeat.run(id, now, '127.0.0.1')

    return c.json({ success: true, timestamp: now, registered: !existing })

  } catch (err: any) {
    console.error('[Mesh] Validator heartbeat error:', err)
    return c.json({ error: err.message }, 500)
  }
})

// Get validator by ID
app.get('/validators/:id', (c) => {
  const id = c.req.param('id')
  const validator = queries.getNode.get(id)

  if (!validator) {
    return c.json({ error: 'Validator not found' }, 404)
  }

  const services = queries.getNodeServices.all(id)

  return c.json({
    validator: {
      ...validator,
      services
    }
  })
})

// ============================================================================
// SOVEREIGN KEY MANAGEMENT
// ============================================================================

// Verify sovereign signature
app.post('/sovereign/verify', async (c) => {
  try {
    const { message, signature, publicKey } = await c.req.json()

    if (!message || !signature) {
      return c.json({ error: 'Missing message or signature' }, 400)
    }

    // If publicKey provided, check if it's sovereign
    if (publicKey) {
      if (!isSovereign(publicKey)) {
        return c.json({ error: 'Not a sovereign key' }, 403)
      }

      // Verify signature
      const valid = await verifySignature(message, signature, publicKey)
      if (!valid) {
        return c.json({ error: 'Invalid signature' }, 401)
      }

      return c.json({ valid: true, publicKey })
    }

    // If no publicKey, try all sovereign keys (slower but works for chaos TUI)
    const sovereignKeys = db.prepare('SELECT public_key FROM sovereign_keys').all() as Array<{ public_key: string }>

    for (const key of sovereignKeys) {
      const valid = await verifySignature(message, signature, key.public_key)
      if (valid) {
        return c.json({ valid: true, publicKey: key.public_key })
      }
    }

    return c.json({ error: 'Invalid signature or unknown sovereign' }, 401)

  } catch (err: any) {
    console.error('Sovereign verify error:', err)
    return c.json({ error: err.message }, 500)
  }
})

app.post('/sovereign/add', async (c) => {
  try {
    const { publicKey, description, adminSignature } = await c.req.json()

    // TODO: Add admin authentication
    // For now, anyone can add sovereign keys (will fix with proper auth)

    const now = Date.now()
    queries.addSovereignKey.run(publicKey, description || null, now)

    console.log(`🔑 Sovereign key added: ${publicKey.slice(0, 8)}...`)

    return c.json({ success: true })

  } catch (err: any) {
    console.error('Add sovereign key error:', err)
    return c.json({ error: err.message }, 500)
  }
})

// ============================================================================
// START SERVER
// ============================================================================

console.log('')
console.log('🌐 mesh - Network Discovery & Coordination')
console.log('━'.repeat(60))
console.log('')
console.log('  Status: Running')
console.log('  Port:', PORT)
console.log('')
console.log('  Endpoints:')
console.log('    POST   /register              - Register new node')
console.log('    GET    /nodes                 - List nodes')
console.log('    GET    /nodes/:id             - Get node info')
console.log('    GET    /topology              - Network topology')
console.log('    POST   /approve/:id           - Approve node (sovereign)')
console.log('    POST   /deny/:id              - Deny node (sovereign)')
console.log('    POST   /heartbeat             - Node heartbeat')
console.log('    GET    /validators/active     - List active validators')
console.log('    POST   /validators            - Register validator')
console.log('    POST   /validators/:id/heartbeat - Validator heartbeat')
console.log('    GET    /validators/:id        - Get validator info')
console.log('    POST   /sovereign/add         - Add sovereign key')
console.log('    GET    /health                - Health check')
console.log('    GET    /info                  - Service info')
console.log('')
console.log('━'.repeat(60))
console.log('')

export default {
  port: PORT,
  fetch: app.fetch
}
