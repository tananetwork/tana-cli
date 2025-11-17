# mesh - Network Discovery & Coordination

**Quarterbacks the Tana validator network.**

## Purpose

mesh is the coordination service that manages network topology without being on-chain:

- ✅ Node registration & admission control
- ✅ Service discovery
- ✅ Health monitoring (heartbeats)
- ✅ Sovereign approval workflow
- ✅ Network topology mapping

## Why Not On-Chain?

mesh coordinates **what goes on the chain**, not what **is on the chain**. Keeping network topology off-chain prevents:

- ❌ Circular dependencies (chain needs network, network needs chain)
- ❌ Bad failure modes (network down = can't register nodes = network can't recover)
- ❌ Blockchain bloat (network changes don't need permanent history)
- ❌ Finality delays (instant network updates vs. waiting for blocks)

## Architecture

```
┌──────────────────────────────────────────────┐
│         mesh.tailscale.ts.net:8190          │
│                                              │
│  SQLite Database:                            │
│    - nodes (registry)                        │
│    - services (what each node offers)        │
│    - heartbeats (liveness tracking)          │
│    - sovereign_keys (who can approve)        │
└──────────────────────────────────────────────┘

           Registration Flow:

1. New Validator joins Tailscale
   └─> Gets: validator-new.ts.net

2. Validator → POST /register to mesh
   └─> Includes: node ID, pubkey, services, Tailscale name
   └─> Status: "pending"

3. Sovereign → POST /approve/:nodeId
   └─> Signature verification
   └─> Status: "pending" → "active"

4. All validators → GET /nodes
   └─> Discover active peers
   └─> Connect via Tailscale network
```

## API Reference

### Registration

```bash
# Register new node
POST /register
{
  "nodeId": "validator-002",
  "publicKey": "abc123...",
  "tailscaleHostname": "validator-b.ts.net",
  "tailscaleIP": "100.64.0.5",
  "services": [
    { "type": "ledger", "port": 8080, "publicKey": "def456..." },
    { "type": "t4", "port": 8180, "publicKey": "ghi789..." }
  ],
  "signature": "..."  # Self-signed to prove key ownership
}

# Response
{
  "success": true,
  "nodeId": "validator-002",
  "status": "pending",
  "message": "Registration successful. Awaiting sovereign approval."
}
```

### Discovery

```bash
# List all active nodes
GET /nodes?status=active

# Response
{
  "nodes": [
    {
      "id": "validator-001",
      "public_key": "abc123...",
      "tailscale_hostname": "validator-a.ts.net",
      "tailscale_ip": "100.64.0.1",
      "status": "active",
      "services": [
        { "type": "ledger", "port": 8080, "publicKey": "..." },
        { "type": "t4", "port": 8180, "publicKey": "..." }
      ]
    }
  ]
}

# Get specific node
GET /nodes/validator-001

# Get full network topology
GET /topology
```

### Sovereign Approval

```bash
# Approve node (sovereign only)
POST /approve/validator-002
{
  "approverPublicKey": "sovereign_key...",
  "signature": "..."  # sign("approve:validator-002")
}

# Deny node
POST /deny/validator-002
{
  "approverPublicKey": "sovereign_key...",
  "signature": "..."  # sign("deny:validator-002")
}
```

### Health Monitoring

```bash
# Send heartbeat (every 2 minutes)
POST /heartbeat
{
  "nodeId": "validator-001",
  "tailscaleIP": "100.64.0.1",
  "signature": "..."  # sign("heartbeat:validator-001:{timestamp}")
}

# Nodes with no heartbeat for 5+ minutes → marked "offline"
```

### Sovereign Keys

```bash
# Add sovereign key
POST /sovereign/add
{
  "publicKey": "sovereign_abc123...",
  "description": "Primary sovereign key"
}
```

## Database Schema

### nodes table
```sql
- id (text) - Node ID
- public_key (text) - Ed25519 public key
- tailscale_hostname (text) - Tailscale DNS name
- tailscale_ip (text) - Tailscale IP
- status (text) - pending, active, denied, offline
- registered_at (integer) - Unix timestamp
- approved_at (integer) - Unix timestamp
- approved_by (text) - Sovereign public key
- last_heartbeat (integer) - Unix timestamp
- registration_signature (text) - Ed25519 signature
```

### services table
```sql
- node_id (text) - References nodes(id)
- service_type (text) - ledger, t4, identity, etc.
- port (integer) - Service port
- public_key (text) - Service's Ed25519 key
```

### heartbeats table
```sql
- node_id (text) - References nodes(id)
- timestamp (integer) - Unix timestamp
- tailscale_ip (text) - IP at heartbeat time
```

### sovereign_keys table
```sql
- public_key (text) - Ed25519 public key
- description (text) - Description
- added_at (integer) - Unix timestamp
```

## Integration Examples

### Node Registration (TypeScript)

```typescript
import { signMessage } from '@tana/crypto'

async function registerNode() {
  const registration = {
    nodeId: 'validator-002',
    publicKey: NODE_PUBLIC_KEY,
    tailscaleHostname: 'validator-b.ts.net',
    tailscaleIP: '100.64.0.5',
    services: [
      { type: 'ledger', port: 8080, publicKey: LEDGER_PUBLIC_KEY },
      { type: 't4', port: 8180, publicKey: T4_PUBLIC_KEY }
    ]
  }

  const message = JSON.stringify({
    nodeId: registration.nodeId,
    publicKey: registration.publicKey,
    tailscaleHostname: registration.tailscaleHostname
  })

  const signature = await signMessage(message, NODE_PRIVATE_KEY)

  const response = await fetch('http://mesh.ts.net:8190/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...registration, signature })
  })

  const result = await response.json()
  console.log('Registration:', result)
}
```

### Peer Discovery

```typescript
async function discoverPeers() {
  const response = await fetch('http://mesh.ts.net:8190/nodes?status=active')
  const { nodes } = await response.json()

  for (const node of nodes) {
    console.log(`Validator: ${node.id}`)
    console.log(`  Tailscale: ${node.tailscale_hostname}`)
    console.log(`  Services:`, node.services)

    // Connect to peer's services
    const ledgerUrl = `http://${node.tailscale_hostname}:8080`
    const t4Url = `http://${node.tailscale_hostname}:8180`
  }

  return nodes
}
```

### Heartbeat Loop

```typescript
setInterval(async () => {
  const heartbeat = {
    nodeId: 'validator-001',
    tailscaleIP: '100.64.0.1'
  }

  const message = `heartbeat:${heartbeat.nodeId}:${Date.now()}`
  const signature = await signMessage(message, NODE_PRIVATE_KEY)

  await fetch('http://mesh.ts.net:8190/heartbeat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...heartbeat, signature })
  })
}, 2 * 60 * 1000) // Every 2 minutes
```

## Configuration

Environment variables:

- `MESH_PORT` - Port to listen on (default: 8190)
- `MESH_DB_PATH` - SQLite database path (default: ./mesh.db)

## Running

```bash
# Development
bun run dev

# Production
bun run start

# With custom config
MESH_PORT=8190 MESH_DB_PATH=/var/lib/tana/mesh.db bun run start
```

## Security Model

### Tailscale = First Layer
- Node must be on Tailscale network to reach mesh
- Tailscale provides encrypted mesh networking
- DNS names are stable identifiers

### Signature = Second Layer
- All requests require Ed25519 signatures
- Proves node owns the private key
- Prevents impersonation

### Sovereign = Third Layer
- Only sovereign keys can approve nodes
- Admission control prevents unauthorized nodes
- Sovereign is cryptographically verified

## Workflow Example

### 1. Bootstrap (Genesis Validator)

```bash
# Sovereign adds their key to mesh
curl -X POST http://mesh:8190/sovereign/add \
  -H "Content-Type: application/json" \
  -d '{
    "publicKey": "sovereign_abc123...",
    "description": "Genesis sovereign"
  }'

# Genesis validator registers (auto-approved or manually approved)
# ...now mesh knows validator-001
```

### 2. New Validator Joins

```bash
# Step 1: Join Tailscale network
tailscale up --hostname=validator-002

# Step 2: Register with mesh
curl -X POST http://mesh:8190/register \
  -H "Content-Type: application/json" \
  -d '{
    "nodeId": "validator-002",
    "publicKey": "...",
    "tailscaleHostname": "validator-002.ts.net",
    "services": [...],
    "signature": "..."
  }'

# Response: "pending approval"

# Step 3: Sovereign approves
curl -X POST http://mesh:8190/approve/validator-002 \
  -H "Content-Type: application/json" \
  -d '{
    "approverPublicKey": "sovereign_abc123...",
    "signature": "..."
  }'

# Response: "active"

# Step 4: All validators discover new peer
curl http://mesh:8190/nodes?status=active
# Returns validator-001, validator-002
```

### 3. Validator Disconnects

```bash
# If validator-002 stops sending heartbeats for 5+ minutes:
# mesh automatically marks it "offline"

# Other validators can filter:
GET /nodes?status=active  # Only returns validator-001
```

## Future Enhancements

- [ ] Staking requirements (must stake X tokens to register)
- [ ] Reputation scores (track validator performance)
- [ ] Automatic denial after X failed heartbeats
- [ ] Geo-distribution tracking (where are validators located?)
- [ ] Service-level health checks (ping each service)
- [ ] Event stream (WebSocket for real-time network changes)

---

**mesh keeps the network coordinated so the blockchain can focus on state.**
