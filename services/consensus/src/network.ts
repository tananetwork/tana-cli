import { WebSocket, WebSocketServer } from 'ws'
import type { ConsensusMessage } from '../contracts/consensus'

export class P2PNetwork {
  private server: WebSocketServer
  private peers: Map<string, WebSocket> = new Map()
  private messageHandlers: Map<string, (msg: any) => Promise<void>> = new Map()

  constructor(private port: number, private validatorId: string) {
    this.server = new WebSocketServer({ port })
    this.setupServer()
  }

  private setupServer() {
    this.server.on('connection', (ws: WebSocket, req) => {
      console.log(`[P2P] Incoming connection from ${req.socket.remoteAddress}`)

      ws.on('message', async (data) => {
        try {
          const msg = JSON.parse(data.toString()) as ConsensusMessage
          await this.handleMessage(msg, ws)
        } catch (err) {
          console.error('[P2P] Failed to parse message:', err)
        }
      })

      ws.on('close', () => {
        // Remove from peers map
        for (const [id, socket] of this.peers) {
          if (socket === ws) {
            this.peers.delete(id)
            console.log(`[P2P] Peer ${id} disconnected`)
          }
        }
      })

      ws.on('error', (err) => {
        console.error('[P2P] WebSocket error:', err)
      })
    })

    console.log(`[P2P] WebSocket server listening on port ${this.port}`)
  }

  async connectToPeer(peerId: string, wsUrl: string) {
    if (this.peers.has(peerId)) {
      console.log(`[P2P] Already connected to ${peerId}`)
      return
    }

    const ws = new WebSocket(wsUrl)

    ws.on('open', () => {
      console.log(`[P2P] Connected to peer ${peerId} at ${wsUrl}`)
      this.peers.set(peerId, ws)

      // Send initial heartbeat
      this.sendToPeer(peerId, {
        type: 'HEARTBEAT',
        validatorId: this.validatorId,
        currentHeight: 0,  // TODO: Get from ledger
        timestamp: Date.now(),
      })
    })

    ws.on('message', async (data) => {
      try {
        const msg = JSON.parse(data.toString()) as ConsensusMessage
        await this.handleMessage(msg, ws)
      } catch (err) {
        console.error(`[P2P] Failed to parse message from ${peerId}:`, err)
      }
    })

    ws.on('error', (err) => {
      console.error(`[P2P] Connection error with ${peerId}:`, err)
    })

    ws.on('close', () => {
      console.log(`[P2P] Disconnected from ${peerId}`)
      this.peers.delete(peerId)

      // Reconnect after 5 seconds
      setTimeout(() => {
        console.log(`[P2P] Reconnecting to ${peerId}...`)
        this.connectToPeer(peerId, wsUrl)
      }, 5000)
    })
  }

  on(messageType: string, handler: (msg: any) => Promise<void>) {
    this.messageHandlers.set(messageType, handler)
  }

  private async handleMessage(msg: ConsensusMessage, ws: WebSocket) {
    const handler = this.messageHandlers.get(msg.type)
    if (handler) {
      await handler(msg)
    } else {
      console.warn(`[P2P] No handler for message type: ${msg.type}`)
    }
  }

  broadcast(message: ConsensusMessage) {
    const data = JSON.stringify(message)
    let sent = 0

    for (const [peerId, ws] of this.peers) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data)
        sent++
      }
    }

    console.log(`[P2P] Broadcasted ${message.type} to ${sent} peers`)
  }

  sendToPeer(peerId: string, message: ConsensusMessage) {
    const ws = this.peers.get(peerId)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    } else {
      console.warn(`[P2P] Cannot send to ${peerId} - not connected`)
    }
  }

  getPeerCount(): number {
    return this.peers.size
  }

  getConnectedPeers(): string[] {
    return Array.from(this.peers.keys())
  }
}
