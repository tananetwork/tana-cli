/**
 * Network Visualizer WebSocket Server
 *
 * Aggregates data from all validators and streams to visualization dashboard:
 * - Validator health and status
 * - P2P connections (network topology)
 * - Block proposals and votes
 * - Current blockchain height per validator
 * - Leader rotation
 */

import { serve } from 'bun'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { WebSocketServer, WebSocket } from 'ws'

const app = new Hono()

// Enable CORS for frontend
app.use('*', cors())

// Validator endpoints to poll
const VALIDATORS = [
  { id: 'val_1', consensusUrl: 'http://localhost:9001', ledgerUrl: 'http://localhost:8080' },
  { id: 'val_2', consensusUrl: 'http://localhost:9011', ledgerUrl: 'http://localhost:8081' },
  { id: 'val_3', consensusUrl: 'http://localhost:9021', ledgerUrl: 'http://localhost:8082' },
  { id: 'val_4', consensusUrl: 'http://localhost:9031', ledgerUrl: 'http://localhost:8083' },
  { id: 'val_5', consensusUrl: 'http://localhost:9041', ledgerUrl: 'http://localhost:8084' },
  { id: 'val_6', consensusUrl: 'http://localhost:9051', ledgerUrl: 'http://localhost:8085' },
]

interface MeshNode {
  id: string
  status: string
  services: Array<{ service_type: string; port: number }>
  last_heartbeat: number | null
}

interface MeshState {
  nodes: MeshNode[]
  nodeCount: {
    pending: number
    active: number
    offline: number
    total: number
  }
  lastUpdate: number
}

interface PendingTransaction {
  id: string
  type: string
  from?: string
  to?: string
  timestamp: number
}

interface ValidatorEvent {
  id: string
  timestamp: number
  validatorId: string
  event: string
  details?: string
}

interface NetworkState {
  validators: ValidatorStatus[]
  edges: NetworkEdge[]
  mesh: MeshState
  pendingTransactions: PendingTransaction[]
  events: ValidatorEvent[]
  lastUpdate: number
}

interface ValidatorStatus {
  id: string
  healthy: boolean
  currentHeight: number
  peerCount: number
  isLeader: boolean
  lastSeen: number
}

interface NetworkEdge {
  source: string
  target: string
  type: 'peer' | 'proposal' | 'vote'
}

let networkState: NetworkState = {
  validators: [],
  edges: [],
  mesh: {
    nodes: [],
    nodeCount: { pending: 0, active: 0, offline: 0, total: 0 },
    lastUpdate: Date.now(),
  },
  pendingTransactions: [],
  events: [],
  lastUpdate: Date.now(),
}

// Event log storage (keep last 100 events)
const MAX_EVENTS = 100
let eventIdCounter = 0

// WebSocket connections
const wsClients: Set<WebSocket> = new Set()

/**
 * Fetch validator status from consensus and ledger services
 */
async function fetchValidatorStatus(validator: typeof VALIDATORS[0]): Promise<ValidatorStatus | null> {
  try {
    // Get consensus health
    const consensusRes = await fetch(`${validator.consensusUrl}/health`, {
      signal: AbortSignal.timeout(2000)
    })

    if (!consensusRes.ok) {
      return {
        id: validator.id,
        healthy: false,
        currentHeight: 0,
        peerCount: 0,
        isLeader: false,
        lastSeen: Date.now(),
      }
    }

    const consensusHealth = await consensusRes.json()

    // Get ledger blocks for height
    const ledgerRes = await fetch(`${validator.ledgerUrl}/blocks/latest`, {
      signal: AbortSignal.timeout(2000)
    })
    const currentHeight = ledgerRes.ok ? (await ledgerRes.json()).height || 0 : 0

    // Determine if this validator is the current leader
    const leaderIndex = currentHeight % VALIDATORS.length
    const isLeader = VALIDATORS[leaderIndex].id === validator.id

    return {
      id: validator.id,
      healthy: true,
      currentHeight,
      peerCount: consensusHealth.peers || 0,
      isLeader,
      lastSeen: Date.now(),
    }
  } catch (error) {
    return {
      id: validator.id,
      healthy: false,
      currentHeight: 0,
      peerCount: 0,
      isLeader: false,
      lastSeen: Date.now(),
    }
  }
}

/**
 * Fetch P2P connections from validators
 */
async function fetchNetworkEdges(validator: typeof VALIDATORS[0]): Promise<NetworkEdge[]> {
  try {
    const peersRes = await fetch(`${validator.consensusUrl}/peers`, {
      signal: AbortSignal.timeout(2000)
    })

    if (!peersRes.ok) return []

    const { peers } = await peersRes.json()

    return peers.map((peer: { id: string, connected: boolean }) => ({
      source: validator.id,
      target: peer.id,
      type: 'peer' as const,
    }))
  } catch (error) {
    return []
  }
}

/**
 * Fetch pending transactions from ledger
 */
async function fetchPendingTransactions(): Promise<PendingTransaction[]> {
  try {
    // Try first validator's ledger (assuming shared queue)
    const response = await fetch('http://localhost:8080/queue/pending', {
      signal: AbortSignal.timeout(2000)
    })

    if (!response.ok) return []

    const data = await response.json()

    // Transform to simplified format
    return (data.transactions || []).map((tx: any) => ({
      id: tx.id,
      type: tx.type,
      from: tx.from,
      to: tx.to,
      timestamp: tx.timestamp || Date.now()
    }))
  } catch (error) {
    return []
  }
}

/**
 * Add event to log
 */
function addEvent(validatorId: string, event: string, details?: string) {
  const newEvent: ValidatorEvent = {
    id: `evt_${++eventIdCounter}`,
    timestamp: Date.now(),
    validatorId,
    event,
    details
  }

  networkState.events.unshift(newEvent)

  // Keep only last MAX_EVENTS
  if (networkState.events.length > MAX_EVENTS) {
    networkState.events = networkState.events.slice(0, MAX_EVENTS)
  }
}

/**
 * Fetch mesh network state
 */
async function fetchMeshState(): Promise<MeshState> {
  try {
    const [infoRes, nodesRes] = await Promise.all([
      fetch('http://localhost:8190/info', { signal: AbortSignal.timeout(2000) }),
      fetch('http://localhost:8190/nodes', { signal: AbortSignal.timeout(2000) })
    ])

    if (!infoRes.ok || !nodesRes.ok) {
      return {
        nodes: [],
        nodeCount: { pending: 0, active: 0, offline: 0, total: 0 },
        lastUpdate: Date.now(),
      }
    }

    const info = await infoRes.json()
    const nodesData = await nodesRes.json()

    return {
      nodes: nodesData.nodes || [],
      nodeCount: info.nodes || { pending: 0, active: 0, offline: 0, total: 0 },
      lastUpdate: Date.now(),
    }
  } catch (error) {
    return {
      nodes: [],
      nodeCount: { pending: 0, active: 0, offline: 0, total: 0 },
      lastUpdate: Date.now(),
    }
  }
}

/**
 * Poll all validators and update network state
 */
async function updateNetworkState() {
  // Store previous state for comparison
  const previousValidators = networkState.validators

  // Fetch all validator statuses in parallel
  const statuses = await Promise.all(
    VALIDATORS.map(v => fetchValidatorStatus(v))
  )

  // Fetch all network edges in parallel
  const edgesArrays = await Promise.all(
    VALIDATORS.map(v => fetchNetworkEdges(v))
  )

  // Fetch mesh state and pending transactions
  const [meshState, pendingTx] = await Promise.all([
    fetchMeshState(),
    fetchPendingTransactions()
  ])

  // Detect validator state changes and emit events
  const newValidators = statuses.filter(Boolean) as ValidatorStatus[]
  for (const validator of newValidators) {
    const previous = previousValidators.find(v => v.id === validator.id)

    if (!previous) {
      addEvent(validator.id, 'online', 'Validator came online')
    } else {
      // Check for state changes
      if (previous.healthy !== validator.healthy) {
        addEvent(
          validator.id,
          validator.healthy ? 'recovered' : 'unhealthy',
          validator.healthy ? 'Validator recovered' : 'Validator became unhealthy'
        )
      }

      if (!previous.isLeader && validator.isLeader) {
        addEvent(validator.id, 'leader', 'Became network leader')
      } else if (previous.isLeader && !validator.isLeader) {
        addEvent(validator.id, 'follower', 'No longer leader')
      }

      if (previous.currentHeight < validator.currentHeight) {
        addEvent(validator.id, 'block', `New block: ${validator.currentHeight}`)
      }
    }
  }

  // Check for validators going offline
  for (const previous of previousValidators) {
    if (!newValidators.find(v => v.id === previous.id)) {
      addEvent(previous.id, 'offline', 'Validator went offline')
    }
  }

  // Update state
  networkState = {
    validators: newValidators,
    edges: edgesArrays.flat(),
    mesh: meshState,
    pendingTransactions: pendingTx,
    events: networkState.events, // Preserve events
    lastUpdate: Date.now(),
  }

  // Broadcast to all WebSocket clients
  const message = JSON.stringify({
    type: 'network_update',
    data: networkState,
  })

  for (const client of wsClients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  }
}

// HTTP endpoints
app.get('/health', (c) => {
  return c.json({ status: 'healthy', clients: wsClients.size })
})

app.get('/api/network', (c) => {
  return c.json(networkState)
})

// ============================================================================
// CHAOS ENGINEERING ENDPOINTS
// ============================================================================

// Track killed validators for recovery
const killedValidators = new Set<string>()

// Chaos authentication middleware
const REQUIRE_CHAOS_AUTH = process.env.NODE_ENV === 'production'

async function verifyChaosAuth(signature: string | undefined, message: string): Promise<boolean> {
  if (!REQUIRE_CHAOS_AUTH) {
    return true // Skip verification in development
  }

  if (!signature) {
    return false
  }

  // In production, verify signature against sovereign keys from mesh
  try {
    const response = await fetch('http://localhost:8190/sovereign/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature })
    })
    return response.ok
  } catch (error) {
    console.error('[Chaos] Auth verification failed:', error)
    return false
  }
}

app.post('/api/chaos/kill-validator', async (c) => {
  const { validatorId, signature } = await c.req.json()

  // Verify sovereign authorization in production
  const message = `chaos:kill:${validatorId}:${Date.now()}`
  const authorized = await verifyChaosAuth(signature, message)
  if (!authorized) {
    return c.json({ error: 'Unauthorized - requires sovereign signature' }, 403)
  }

  try {
    const validator = VALIDATORS.find(v => v.id === validatorId)
    if (!validator) {
      return c.json({ error: 'Validator not found' }, 404)
    }

    // Extract port numbers from URLs
    const consensusPort = validator.consensusUrl.split(':').pop()!
    const ledgerPort = validator.ledgerUrl.split(':').pop()!

    // Kill processes by port
    const killConsensus = Bun.spawn(['sh', '-c', `lsof -ti:${consensusPort} | xargs kill -9 2>/dev/null || true`])
    await killConsensus.exited

    const killLedger = Bun.spawn(['sh', '-c', `lsof -ti:${ledgerPort} | xargs kill -9 2>/dev/null || true`])
    await killLedger.exited

    killedValidators.add(validatorId)
    console.log(`[Chaos] 💀 Killed validator: ${validatorId} (ports ${consensusPort}, ${ledgerPort})`)

    return c.json({
      success: true,
      message: `Killed validator ${validatorId}`,
      validatorId,
      consensusPort: parseInt(consensusPort),
      ledgerPort: parseInt(ledgerPort),
      action: 'kill'
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 500)
  }
})

app.post('/api/chaos/network-partition', async (c) => {
  const { validatorIds, signature } = await c.req.json()

  // Verify sovereign authorization in production
  const message = `chaos:partition:${validatorIds.join(',')}:${Date.now()}`
  const authorized = await verifyChaosAuth(signature, message)
  if (!authorized) {
    return c.json({ error: 'Unauthorized - requires sovereign signature' }, 403)
  }

  // For local testing, we can't easily partition network
  // But we can kill all validators except the partition group
  const validatorsToKill = VALIDATORS.filter(v => !validatorIds.includes(v.id))

  for (const validator of validatorsToKill) {
    const consensusPort = validator.consensusUrl.split(':').pop()!
    const ledgerPort = validator.ledgerUrl.split(':').pop()!

    const killConsensus = Bun.spawn(['sh', '-c', `lsof -ti:${consensusPort} | xargs kill -9 2>/dev/null || true`])
    await killConsensus.exited

    const killLedger = Bun.spawn(['sh', '-c', `lsof -ti:${ledgerPort} | xargs kill -9 2>/dev/null || true`])
    await killLedger.exited

    killedValidators.add(validator.id)
  }

  console.log(`[Chaos] 🌐 Network partition: kept ${validatorIds.join(', ')}, killed ${validatorsToKill.map(v => v.id).join(', ')}`)

  return c.json({
    success: true,
    message: `Created network partition: ${validatorIds.join(', ')}`,
    kept: validatorIds,
    killed: validatorsToKill.map(v => v.id),
    action: 'partition'
  })
})

app.post('/api/chaos/corrupt-data', async (c) => {
  const { validatorId, dataType } = await c.req.json()

  // For database corruption, we'd need to modify PostgreSQL directly
  // This is dangerous for local testing, so keeping it simulated
  console.log(`[Chaos] ⚠️  Simulated data corruption: ${dataType} for ${validatorId}`)

  return c.json({
    success: true,
    message: `Simulated ${dataType} corruption for ${validatorId}`,
    note: 'Database corruption disabled for safety - use manual psql commands if needed',
    action: 'corrupt',
    simulated: true
  })
})

app.post('/api/chaos/inject-latency', async (c) => {
  const { validatorId, latencyMs } = await c.req.json()

  // Latency injection would require modifying the consensus service
  // or using tc/netem, which requires root privileges
  console.log(`[Chaos] 🐌 Simulated latency: ${latencyMs}ms for ${validatorId}`)

  return c.json({
    success: true,
    message: `Simulated ${latencyMs}ms latency for ${validatorId}`,
    note: 'Latency injection requires tc/netem or code modification',
    action: 'latency',
    simulated: true
  })
})

app.post('/api/chaos/byzantine-behavior', async (c) => {
  const { validatorId, behaviorType } = await c.req.json()

  // Byzantine behavior requires modifying the validator code
  console.log(`[Chaos] 🎭 Simulated Byzantine behavior: ${behaviorType} for ${validatorId}`)

  return c.json({
    success: true,
    message: `Simulated ${behaviorType} Byzantine behavior for ${validatorId}`,
    note: 'Byzantine behavior requires validator code modification',
    action: 'byzantine',
    simulated: true
  })
})

app.post('/api/chaos/recover-all', async (c) => {
  const { signature } = await c.req.json().catch(() => ({}))

  // Verify sovereign authorization in production
  const message = `chaos:recover:${Date.now()}`
  const authorized = await verifyChaosAuth(signature, message)
  if (!authorized) {
    return c.json({ error: 'Unauthorized - requires sovereign signature' }, 403)
  }

  try {
    const recovered: string[] = []

    // Restart all killed validators
    for (const validatorId of killedValidators) {
      const validator = VALIDATORS.find(v => v.id === validatorId)
      if (!validator) continue

      const valIndex = VALIDATORS.indexOf(validator)
      const consensusPort = 9000 + (valIndex * 10)
      const httpPort = 9001 + (valIndex * 10)
      const ledgerPort = 8080 + valIndex
      const dbName = `tana_ledger_${validatorId}`

      // Build peers list (all validators except this one)
      const peers = VALIDATORS
        .filter(v => v.id !== validatorId)
        .map((v, i) => ({
          id: v.id,
          wsUrl: `ws://localhost:${9000 + (VALIDATORS.indexOf(v) * 10)}`
        }))

      // Start consensus service
      const consensusProc = Bun.spawn([
        'bun', 'run', 'start'
      ], {
        cwd: '/Users/samifouad/Projects/tana/cli/services/consensus',
        env: {
          ...process.env,
          DATABASE_URL: `postgres://postgres:tana_dev_password@localhost:5432/${dbName}`,
          VALIDATOR_ID: validatorId,
          CONSENSUS_PORT: consensusPort.toString(),
          HTTP_PORT: httpPort.toString(),
          PEERS: JSON.stringify(peers)
        },
        stdout: Bun.file(`/tmp/${validatorId}-consensus.log`),
        stderr: Bun.file(`/tmp/${validatorId}-consensus.log`)
      })

      // Start ledger service
      const ledgerProc = Bun.spawn([
        'bun', 'run', 'start'
      ], {
        cwd: '/Users/samifouad/Projects/tana/cli/services/ledger',
        env: {
          ...process.env,
          DATABASE_URL: `postgres://postgres:tana_dev_password@localhost:5432/${dbName}`,
          REDIS_URL: 'redis://localhost:6379',
          CONSENSUS_ENABLED: 'true',
          VALIDATOR_ID: validatorId,
          CONSENSUS_URL: `http://localhost:${httpPort}`,
          PORT: ledgerPort.toString()
        },
        stdout: Bun.file(`/tmp/${validatorId}-ledger.log`),
        stderr: Bun.file(`/tmp/${validatorId}-ledger.log`)
      })

      recovered.push(validatorId)
      console.log(`[Chaos] ✅ Recovered validator: ${validatorId}`)
    }

    killedValidators.clear()

    return c.json({
      success: true,
      message: `Recovered ${recovered.length} validator(s)`,
      recovered,
      action: 'recover'
    })
  } catch (error: any) {
    console.error('[Chaos] Recovery error:', error)
    return c.json({ error: error.message }, 500)
  }
})

// Start polling
setInterval(updateNetworkState, 1000) // Update every second

// Initial update
updateNetworkState()

// WebSocket server
const wss = new WebSocketServer({ port: 8191 })

wss.on('connection', (ws: WebSocket) => {
  console.log('[Visualizer] Client connected')
  wsClients.add(ws)

  // Send current state immediately
  ws.send(JSON.stringify({
    type: 'network_update',
    data: networkState,
  }))

  ws.on('close', () => {
    console.log('[Visualizer] Client disconnected')
    wsClients.delete(ws)
  })

  ws.on('error', (err) => {
    console.error('[Visualizer] WebSocket error:', err)
    wsClients.delete(ws)
  })
})

// HTTP server
serve({
  port: 3001,
  fetch: app.fetch,
})

console.log('[Visualizer] HTTP server listening on port 3001')
console.log('[Visualizer] WebSocket server listening on port 8191')
console.log(`[Visualizer] Monitoring ${VALIDATORS.length} validators`)
