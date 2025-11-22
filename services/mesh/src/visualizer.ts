/**
 * Real-Time Network Visualizer (WebSocket)
 *
 * Streams network state to WebUI dashboard:
 * - Validator health & status (from mesh registry)
 * - Blockchain state (polled from validators)
 * - P2P network topology
 * - Pending transactions
 *
 * Replaces the standalone topology service by integrating directly into mesh.
 */

import { WebSocketServer, WebSocket } from 'ws'
import { queries } from './db'

const WS_PORT = 8191
const POLL_INTERVAL = 2000 // 2 seconds
const LEDGER_URL = 'http://localhost:8080'

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

interface PendingTransaction {
  id: string
  type: string
  from?: string
  to?: string
  timestamp: number
}

interface NetworkState {
  validators: ValidatorStatus[]
  edges: NetworkEdge[]
  mesh: {
    nodes: any[]
    nodeCount: { pending: number; active: number; offline: number; total: number }
    lastUpdate: number
  }
  pendingTransactions: PendingTransaction[]
  events: Array<{
    id: string
    timestamp: number
    validatorId: string
    event: string
    details?: string
  }>
  lastUpdate: number
}

// WebSocket clients
const wsClients: Set<WebSocket> = new Set()

// Network state cache
let networkState: NetworkState = {
  validators: [],
  edges: [],
  mesh: {
    nodes: [],
    nodeCount: { pending: 0, active: 0, offline: 0, total: 0 },
    lastUpdate: Date.now()
  },
  pendingTransactions: [],
  events: [],
  lastUpdate: Date.now()
}

/**
 * Get consensus port from validator ID
 * Validators follow pattern: val_00000001 → port 9001, val_00000002 → port 9011, etc.
 */
function getConsensusPort(validatorId: string): number {
  // Extract numeric part from val_XXXXXXXX
  const match = validatorId.match(/val_0*(\d+)/)
  if (!match) return 9001 // default

  const num = parseInt(match[1], 10)
  return 9001 + (num - 1) * 10
}

/**
 * Fetch validator status from consensus API
 */
async function fetchValidatorStatus(validatorId: string): Promise<ValidatorStatus | null> {
  try {
    const port = getConsensusPort(validatorId)
    const consensusUrl = `http://localhost:${port}`

    // Get consensus health
    const healthRes = await fetch(`${consensusUrl}/health`, {
      signal: AbortSignal.timeout(1000)
    })

    if (!healthRes.ok) {
      return {
        id: validatorId,
        healthy: false,
        currentHeight: 0,
        peerCount: 0,
        isLeader: false,
        lastSeen: Date.now()
      }
    }

    const health = await healthRes.json()

    // Get latest block height from shared ledger
    let currentHeight = 0
    try {
      const blockRes = await fetch(`${LEDGER_URL}/blocks/latest`, {
        signal: AbortSignal.timeout(1000)
      })
      if (blockRes.ok) {
        const block = await blockRes.json()
        currentHeight = block.height || 0
      }
    } catch (err) {
      // Ledger not available
    }

    return {
      id: validatorId,
      healthy: health.status === 'healthy',
      currentHeight,
      peerCount: health.peers || 0,
      isLeader: false, // TODO: Determine from height % validator count
      lastSeen: Date.now()
    }
  } catch (error) {
    return {
      id: validatorId,
      healthy: false,
      currentHeight: 0,
      peerCount: 0,
      isLeader: false,
      lastSeen: Date.now()
    }
  }
}

/**
 * Fetch P2P network edges
 */
async function fetchNetworkEdges(validatorId: string): Promise<NetworkEdge[]> {
  try {
    const port = getConsensusPort(validatorId)
    const peersRes = await fetch(`http://localhost:${port}/peers`, {
      signal: AbortSignal.timeout(1000)
    })

    if (!peersRes.ok) return []

    const { peers } = await peersRes.json()

    return peers.map((peer: { id: string }) => ({
      source: validatorId,
      target: peer.id,
      type: 'peer' as const
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
    const response = await fetch(`${LEDGER_URL}/pending`, {
      signal: AbortSignal.timeout(1000)
    })

    if (!response.ok) return []

    const data = await response.json()

    return (data.transactions || []).map((tx: any) => ({
      id: tx.id,
      type: tx.type,
      from: tx.from,
      to: tx.to,
      timestamp: Date.parse(tx.timestamp) || Date.now()
    }))
  } catch (error) {
    return []
  }
}

/**
 * Update network state by polling validators
 */
async function updateNetworkState() {
  // Get active validators from mesh database
  const activeValidators = queries.getNodesByStatus.all('active') as any[]

  // Filter to only validators (nodes with last_heartbeat in last 30 seconds)
  const recentCutoff = Date.now() - 30000
  const validators = activeValidators.filter(v =>
    v.id.startsWith('val_') && (v.last_heartbeat || 0) > recentCutoff
  )

  // Fetch all validator statuses in parallel
  const statuses = await Promise.all(
    validators.map(v => fetchValidatorStatus(v.id))
  )

  // Fetch all network edges in parallel
  const edgesArrays = await Promise.all(
    validators.map(v => fetchNetworkEdges(v.id))
  )
  const edges = edgesArrays.flat()

  // Fetch pending transactions
  const pendingTx = await fetchPendingTransactions()

  // Get mesh state
  const pending = queries.getNodesByStatus.all('pending')
  const active = queries.getNodesByStatus.all('active')
  const offline = queries.getNodesByStatus.all('offline')

  const allNodes = queries.getAllNodesWithServices.all() as any[]

  // Update network state
  networkState = {
    validators: statuses.filter(Boolean) as ValidatorStatus[],
    edges,
    mesh: {
      nodes: allNodes.map((n: any) => ({
        ...n,
        services: JSON.parse(n.services)
      })),
      nodeCount: {
        pending: pending.length,
        active: active.length,
        offline: offline.length,
        total: pending.length + active.length + offline.length
      },
      lastUpdate: Date.now()
    },
    pendingTransactions: pendingTx,
    events: networkState.events, // Preserve events
    lastUpdate: Date.now()
  }

  // Broadcast to all WebSocket clients
  broadcast(networkState)
}

/**
 * Broadcast message to all connected WebSocket clients
 */
function broadcast(message: any) {
  const data = JSON.stringify(message)

  wsClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

/**
 * Start WebSocket server and polling
 */
export function startVisualizer() {
  // Create WebSocket server
  const wss = new WebSocketServer({ port: WS_PORT })

  wss.on('connection', (ws: WebSocket) => {
    console.log('[Visualizer] WebSocket client connected')
    wsClients.add(ws)

    // Send current state immediately
    ws.send(JSON.stringify(networkState))

    ws.on('close', () => {
      console.log('[Visualizer] WebSocket client disconnected')
      wsClients.delete(ws)
    })

    ws.on('error', (err) => {
      console.error('[Visualizer] WebSocket error:', err)
      wsClients.delete(ws)
    })
  })

  // Start polling validators
  setInterval(updateNetworkState, POLL_INTERVAL)

  // Initial update
  updateNetworkState()

  console.log(`[Visualizer] WebSocket server listening on port ${WS_PORT}`)
  console.log(`[Visualizer] Polling validators every ${POLL_INTERVAL}ms`)
}
