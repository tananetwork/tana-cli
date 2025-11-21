import { serve } from 'bun'
import { Hono } from 'hono'
import { P2PNetwork } from './network'
import { LeaderSelector } from './leader'
import { VoteCollector } from './voting'
import { upsertValidator, recordVote } from './db/queries'
import type { BlockProposal, BlockVote, Heartbeat } from '../contracts/consensus'

const VALIDATOR_ID = process.env.VALIDATOR_ID || 'val_default'
const WS_PORT = parseInt(process.env.CONSENSUS_PORT || '9000')
const HTTP_PORT = parseInt(process.env.HTTP_PORT || '9001')
const PEERS = JSON.parse(process.env.PEERS || '[]')

class ConsensusService {
  private network: P2PNetwork
  private leader: LeaderSelector
  private votes: VoteCollector
  private currentHeight: number = 0
  private app: Hono

  constructor() {
    this.network = new P2PNetwork(WS_PORT, VALIDATOR_ID)
    this.leader = new LeaderSelector([VALIDATOR_ID])
    this.votes = new VoteCollector()
    this.app = new Hono()

    this.setupMessageHandlers()
    this.setupHttpApi()
    this.connectToPeers()
    this.startHeartbeat()
  }

  private setupMessageHandlers() {
    // Handle block proposals from peers
    this.network.on('BLOCK_PROPOSAL', async (msg: BlockProposal) => {
      console.log(`[Consensus] Received block proposal for height ${msg.block.height}`)

      // TODO: Call ledger to validate block
      // For now, auto-approve
      const isValid = true

      // Create and broadcast vote
      const vote: BlockVote = {
        type: 'BLOCK_VOTE',
        blockHash: msg.block.hash,
        blockHeight: msg.block.height,
        validatorId: VALIDATOR_ID,
        approve: isValid,
        signature: 'TODO',  // TODO: Sign with Ed25519
        timestamp: Date.now(),
      }

      this.network.broadcast(vote)
      this.votes.addVote(vote)

      // Record vote in database
      await recordVote({
        id: `vote_${vote.blockHash}_${vote.validatorId}`,
        blockHash: vote.blockHash,
        validatorId: vote.validatorId,
        approve: vote.approve,
        signature: vote.signature,
      })

      // Check quorum
      if (this.votes.hasQuorum(msg.block.hash, this.leader.getValidatorCount())) {
        console.log(`[Consensus] Block ${msg.block.hash.slice(0, 8)}... reached quorum`)
        // TODO: Notify ledger to commit
      }
    })

    // Handle votes from peers
    this.network.on('BLOCK_VOTE', async (msg: BlockVote) => {
      console.log(`[Consensus] Received vote from ${msg.validatorId}`)
      this.votes.addVote(msg)

      // Record in database
      await recordVote({
        id: `vote_${msg.blockHash}_${msg.validatorId}`,
        blockHash: msg.blockHash,
        validatorId: msg.validatorId,
        approve: msg.approve,
        signature: msg.signature,
      })

      // Check if quorum reached
      if (this.votes.hasQuorum(msg.blockHash, this.leader.getValidatorCount())) {
        console.log(`[Consensus] Block ${msg.blockHash.slice(0, 8)}... reached quorum`)
      }
    })

    // Handle heartbeats
    this.network.on('HEARTBEAT', async (msg: Heartbeat) => {
      console.log(`[Consensus] Heartbeat from ${msg.validatorId} at height ${msg.currentHeight}`)

      // Update validator in database
      await upsertValidator({
        id: msg.validatorId,
        publicKey: 'TODO',  // TODO: Get from handshake
        wsUrl: 'TODO',
        status: 'active',
      })
    })
  }

  private setupHttpApi() {
    // POST /propose - Ledger calls this to propose block
    this.app.post('/propose', async (c) => {
      const { block } = await c.req.json()

      if (!this.leader.isLeader(VALIDATOR_ID, block.height)) {
        return c.json({ error: 'Not leader for this height' }, 400)
      }

      const proposal: BlockProposal = {
        type: 'BLOCK_PROPOSAL',
        block,
        proposerId: VALIDATOR_ID,
        signature: 'TODO',  // TODO: Sign block
      }

      console.log(`[Consensus] Proposing block at height ${block.height}`)
      this.network.broadcast(proposal)

      return c.json({ success: true })
    })

    // GET /quorum/:blockHash
    this.app.get('/quorum/:blockHash', (c) => {
      const blockHash = c.req.param('blockHash')
      const status = this.votes.getQuorumStatus(blockHash, this.leader.getValidatorCount())

      return c.json({
        blockHash,
        totalValidators: this.leader.getValidatorCount(),
        ...status,
      })
    })

    // GET /peers
    this.app.get('/peers', (c) => {
      const peers = this.network.getConnectedPeers()
      return c.json({
        peers: peers.map(id => ({ id, connected: true })),
        count: peers.length,
      })
    })

    // GET /health
    this.app.get('/health', (c) => {
      return c.json({
        status: 'healthy',
        validatorId: VALIDATOR_ID,
        peers: this.network.getPeerCount(),
        currentHeight: this.currentHeight,
      })
    })
  }

  private async connectToPeers() {
    for (const peer of PEERS) {
      await this.network.connectToPeer(peer.id, peer.wsUrl)
    }
  }

  private startHeartbeat() {
    setInterval(() => {
      this.network.broadcast({
        type: 'HEARTBEAT',
        validatorId: VALIDATOR_ID,
        currentHeight: this.currentHeight,
        timestamp: Date.now(),
      })
    }, 10000)  // Every 10 seconds
  }

  start() {
    serve({
      port: HTTP_PORT,
      fetch: this.app.fetch,
    })

    console.log(`[Consensus] HTTP API listening on port ${HTTP_PORT}`)
  }
}

// Start service
const service = new ConsensusService()
service.start()

console.log(`[Consensus] Service started for validator ${VALIDATOR_ID}`)
console.log(`[Consensus] WebSocket port: ${WS_PORT}`)
console.log(`[Consensus] HTTP API port: ${HTTP_PORT}`)

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('[Consensus] Shutting down...')
  process.exit(0)
})
