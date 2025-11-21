import { useEffect, useState, useRef } from 'react'
import ForceGraph2D from 'react-force-graph-2d'

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

interface GraphNode {
  id: string
  name: string
  healthy: boolean
  height: number
  isLeader: boolean
  peerCount: number
  color: string
}

interface GraphLink {
  source: string
  target: string
  type: string
}

function App() {
  const [networkState, setNetworkState] = useState<NetworkState | null>(null)
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting')
  const [selectedValidator, setSelectedValidator] = useState<string>('')
  const [chaosMessage, setChaosMessage] = useState<string>('')
  const [selectedTx, setSelectedTx] = useState<PendingTransaction | null>(null)
  const [viewMode, setViewMode] = useState<'text' | 'graph'>('text')
  const wsRef = useRef<WebSocket | null>(null)
  const graphRef = useRef<any>(null)

  // Connect to WebSocket
  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8191')
      wsRef.current = ws

      ws.onopen = () => {
        console.log('[Visualizer] WebSocket connected')
        setWsStatus('connected')
      }

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.type === 'network_update') {
          setNetworkState(message.data)
        }
      }

      ws.onerror = (error) => {
        console.error('[Visualizer] WebSocket error:', error)
        setWsStatus('disconnected')
      }

      ws.onclose = () => {
        console.log('[Visualizer] WebSocket disconnected')
        setWsStatus('disconnected')

        // Reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000)
      }
    }

    connectWebSocket()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  // Chaos engineering handlers
  const handleChaos = async (action: string, params: any = {}) => {
    try {
      const response = await fetch(`http://localhost:3001/api/chaos/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
      const result = await response.json()
      setChaosMessage(result.message || result.error)
      setTimeout(() => setChaosMessage(''), 5000)
    } catch (error: any) {
      setChaosMessage(`Error: ${error.message}`)
      setTimeout(() => setChaosMessage(''), 5000)
    }
  }

  // Transform network state into graph data (only used in graph view mode)
  const graphData = {
    nodes: networkState?.validators.map((v): GraphNode => ({
      id: v.id,
      name: v.id,
      healthy: v.healthy,
      height: v.currentHeight,
      isLeader: v.isLeader,
      peerCount: v.peerCount,
      color: v.isLeader ? '#f59e0b' : v.healthy ? '#10b981' : '#ef4444',
    })) || [],
    links: networkState?.edges.map((e): GraphLink => ({
      source: e.source,
      target: e.target,
      type: e.type,
    })) || [],
  }

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'online': return '🟢'
      case 'offline': return '🔴'
      case 'leader': return '👑'
      case 'follower': return '👤'
      case 'block': return '📦'
      case 'recovered': return '✅'
      case 'unhealthy': return '⚠️'
      default: return '•'
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tana Network Dashboard</h1>
        <div className="header-stats">
          <div className="stat-chip">
            <span className="stat-label">Validators</span>
            <span className="stat-value">{networkState?.validators.length || 0}</span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">Height</span>
            <span className="stat-value">{Math.max(...(networkState?.validators.map(v => v.currentHeight) || [0]))}</span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">Pending TX</span>
            <span className="stat-value">{networkState?.pendingTransactions.length || 0}</span>
          </div>
          <div className={`stat-chip connection-${wsStatus}`}>
            <span className="stat-label">Status</span>
            <span className="stat-value">{wsStatus === 'connected' ? '●' : '○'}</span>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Left Column - Pending Transactions */}
        <div className="left-column">
          <div className="panel pending-tx-panel">
            <h2>Pending Transactions</h2>
            <div className="tx-list">
              {networkState?.pendingTransactions.length === 0 ? (
                <div className="empty-state">No pending transactions</div>
              ) : (
                networkState?.pendingTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="tx-item"
                    onClick={() => setSelectedTx(tx)}
                  >
                    <span className="tx-id">{tx.id}</span>
                    <span className="tx-type">{tx.type}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - 3 Panels */}
        <div className="right-column">
          {/* Validator List with Toggle */}
          <div className="panel validator-panel">
            <div className="panel-header">
              <h2>Validators</h2>
              <div className="view-toggle">
                <button
                  className={viewMode === 'text' ? 'active' : ''}
                  onClick={() => setViewMode('text')}
                >
                  Text
                </button>
                <button
                  className={viewMode === 'graph' ? 'active' : ''}
                  onClick={() => setViewMode('graph')}
                >
                  Graph
                </button>
              </div>
            </div>

            {viewMode === 'text' ? (
              <div className="validator-list">
                {networkState?.validators.map((validator) => (
                  <div key={validator.id} className="validator-item">
                    <div className="validator-row">
                      <span className="validator-id">{validator.id}</span>
                      <span className={`validator-badge ${validator.isLeader ? 'leader' : validator.healthy ? 'healthy' : 'unhealthy'}`}>
                        {validator.isLeader ? '👑 LEADER' : validator.healthy ? '✓ HEALTHY' : '✗ UNHEALTHY'}
                      </span>
                    </div>
                    <div className="validator-stats">
                      <span>Height: {validator.currentHeight}</span>
                      <span>Peers: {validator.peerCount}</span>
                      <span>Seen: {new Date(validator.lastSeen).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="graph-view">
                <ForceGraph2D
                  ref={graphRef}
                  graphData={graphData}
                  width={600}
                  height={300}
                  nodeLabel="name"
                  nodeColor="color"
                  nodeRelSize={6}
                  nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
                    const label = node.name
                    const fontSize = 10 / globalScale

                    // Draw node circle
                    ctx.beginPath()
                    ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false)
                    ctx.fillStyle = node.color
                    ctx.fill()

                    // Draw leader crown
                    if (node.isLeader) {
                      ctx.fillStyle = '#f59e0b'
                      ctx.font = '12px Sans-Serif'
                      ctx.fillText('👑', node.x - 6, node.y - 12)
                    }

                    // Draw label
                    ctx.font = `${fontSize}px Sans-Serif`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'top'
                    ctx.fillStyle = '#e2e8f0'
                    ctx.fillText(label, node.x, node.y + 10)
                  }}
                  linkColor={() => '#475569'}
                  linkWidth={1}
                  linkDirectionalParticles={1}
                  linkDirectionalParticleWidth={2}
                  linkDirectionalParticleSpeed={0.003}
                  backgroundColor="#0f172a"
                  warmupTicks={50}
                  cooldownTicks={0}
                />
              </div>
            )}
          </div>

          {/* Event Log */}
          <div className="panel event-log-panel">
            <h2>Event Log</h2>
            <div className="event-list">
              {networkState?.events.length === 0 ? (
                <div className="empty-state">No events yet</div>
              ) : (
                networkState?.events.map((event) => (
                  <div key={event.id} className="event-item">
                    <span className="event-icon">{getEventIcon(event.event)}</span>
                    <div className="event-content">
                      <div className="event-header">
                        <span className="event-validator">{event.validatorId}</span>
                        <span className="event-time">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="event-details">{event.details}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chaos Panel */}
          <div className="panel chaos-panel">
            <h2>⚡ Chaos Engineering</h2>
            <div className="chaos-content">
              <div className="chaos-left">
                <select
                  className="validator-select"
                  value={selectedValidator}
                  onChange={(e) => setSelectedValidator(e.target.value)}
                >
                  <option value="">Select Validator</option>
                  {networkState?.validators.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.id} {v.isLeader ? '👑' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="chaos-right">
                <button
                  className="chaos-btn kill"
                  onClick={() => selectedValidator && handleChaos('kill-validator', { validatorId: selectedValidator })}
                  disabled={!selectedValidator}
                  title="Kill Validator"
                >
                  💀 Kill
                </button>
                <button
                  className="chaos-btn partition"
                  onClick={() => handleChaos('network-partition', { validatorIds: [selectedValidator] })}
                  disabled={!selectedValidator}
                  title="Network Partition"
                >
                  🌐 Partition
                </button>
                <button
                  className="chaos-btn corrupt"
                  onClick={() => selectedValidator && handleChaos('corrupt-data', { validatorId: selectedValidator, dataType: 'blocks' })}
                  disabled={!selectedValidator}
                  title="Corrupt Data"
                >
                  💥 Corrupt
                </button>
                <button
                  className="chaos-btn latency"
                  onClick={() => selectedValidator && handleChaos('inject-latency', { validatorId: selectedValidator, latencyMs: 1000 })}
                  disabled={!selectedValidator}
                  title="Inject Latency"
                >
                  ⏱️ Lag
                </button>
                <button
                  className="chaos-btn byzantine"
                  onClick={() => selectedValidator && handleChaos('byzantine-behavior', { validatorId: selectedValidator, behaviorType: 'double-vote' })}
                  disabled={!selectedValidator}
                  title="Byzantine Behavior"
                >
                  🤖 Byzantine
                </button>
                <button
                  className="chaos-btn recover"
                  onClick={() => handleChaos('recover-all')}
                  title="Recover All"
                >
                  ✨ Recover
                </button>
              </div>
            </div>
            {chaosMessage && (
              <div className="chaos-message">{chaosMessage}</div>
            )}
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <div className="modal-overlay" onClick={() => setSelectedTx(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Transaction Details</h3>
              <button className="modal-close" onClick={() => setSelectedTx(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">ID:</span>
                <span className="detail-value">{selectedTx.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{selectedTx.type}</span>
              </div>
              {selectedTx.from && (
                <div className="detail-row">
                  <span className="detail-label">From:</span>
                  <span className="detail-value">{selectedTx.from}</span>
                </div>
              )}
              {selectedTx.to && (
                <div className="detail-row">
                  <span className="detail-label">To:</span>
                  <span className="detail-value">{selectedTx.to}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">Timestamp:</span>
                <span className="detail-value">
                  {new Date(selectedTx.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
