# Multi-Validator Consensus

Tana implements Byzantine Fault Tolerant (BFT) consensus that **activates automatically** when 2+ validators are enrolled.

## Quick Start - Single Validator

### 1. Create Your Chain

```bash
tana new chain mychain
```

### 2. Start Services

```bash
tana start
```

That's it! Consensus is ready but won't activate until a second validator joins.

### 3. Produce Blocks

```bash
tana produce
```

Output (single validator):
```
[Single Validator Mode] Skipping consensus (1 validator)
[Single Validator Mode] Committing block directly
✓ Block height 1 committed
```

---

## Multi-Validator Setup (Production)

### Validator 1 (Primary)

```bash
# Create chain
tana new chain prodchain

# Initialize validator (generates keys, sets up config)
tana init validator

# Start services
tana start
```

### Validator 2 (Join Network)

```bash
# Initialize validator with peer connection
tana init validator --peers ws://validator1.example.com:9000

# Start services
tana start
```

### Validator 3 (Join Network)

```bash
# Initialize validator with peer connections
tana init validator --peers ws://validator1.example.com:9000,ws://validator2.example.com:9000

# Start services
tana start
```

**That's all!** Consensus activates automatically when the second validator starts.

---

## How It Works

### Automatic Consensus Activation

```
Validator Count → Mode
────────────────────────
     1          → Single validator (no consensus overhead)
     2+         → BFT consensus (2/3 quorum required)
```

**No configuration needed** - the system detects enrolled validators and switches modes automatically.

### Block Production

With 3+ validators, blocks rotate through leaders:

```bash
# From validator 1 (leader for height 1)
tana produce

# From validator 2 (leader for height 2)
tana produce

# From validator 3 (leader for height 3)
tana produce
```

Output (multi-validator):
```
[Consensus] Multi-validator network detected (3 validators)
[Consensus] Proposing block abc123... to network
[Consensus] Validator: val_a1b2c3d4
[Consensus] Block proposed successfully
[Consensus] Waiting for quorum...
[Consensus] ✅ Block abc123... reached quorum (3/3 votes, required 2)
```

### Leader Rotation

Leaders are determined by: `height % validatorCount`

- Height 1 → Validator 1
- Height 2 → Validator 2
- Height 3 → Validator 3
- Height 4 → Validator 1 (rotation repeats)

All validators compute the same leader deterministically.

---

## Configuration

### View Validator Config

```bash
cat ~/.config/tana/validator.json
```

Example output:
```json
{
  "validatorId": "val_a1b2c3d4",
  "publicKey": "a1b2c3d4e5f6...",
  "privateKey": "encrypted_key_here",
  "wsPort": 9000,
  "httpPort": 9001,
  "wsUrl": "ws://localhost:9000",
  "peers": [
    { "id": "peer_0", "wsUrl": "ws://validator2.example.com:9000" }
  ],
  "createdAt": "2025-11-21T12:34:56.789Z"
}
```

### Validator Commands

```bash
# Initialize new validator
tana init validator

# Initialize with peers
tana init validator --peers ws://val1:9000,ws://val2:9000

# Initialize with custom ports
tana init validator --port 9010 --http-port 9011
```

---

## Consensus API

Consensus service exposes an HTTP API for monitoring:

### `GET /health`

```bash
curl http://localhost:9001/health
```

Response:
```json
{
  "status": "healthy",
  "validatorId": "val_a1b2c3d4",
  "peers": 2,
  "currentHeight": 5
}
```

### `GET /peers`

```bash
curl http://localhost:9001/peers
```

Response:
```json
{
  "peers": [
    {"id": "val_b2c3d4e5", "connected": true},
    {"id": "val_c3d4e5f6", "connected": true}
  ],
  "count": 2
}
```

### `GET /quorum/:blockHash`

```bash
curl http://localhost:9001/quorum/0xabc123...
```

Response:
```json
{
  "blockHash": "0xabc123...",
  "totalValidators": 3,
  "total": 3,
  "approve": 3,
  "reject": 0,
  "required": 2,
  "hasQuorum": true
}
```

---

## Troubleshooting

### Blocks Not Reaching Quorum

**Problem:** Blocks timeout waiting for votes.

**Check:**
```bash
# Verify peer connections
curl http://localhost:9001/peers

# Check quorum status
curl http://localhost:9001/quorum/<blockHash>
```

**Solution:** Ensure all validators are running and can reach each other via WebSocket.

### Validator Not Joining Network

**Problem:** New validator doesn't connect to peers.

**Check:**
```bash
# View validator config
cat ~/.config/tana/validator.json

# Check peer URLs are correct
```

**Solution:** Verify `peers` array has correct WebSocket URLs and ports are open.

### Leader Not Proposing

**Problem:** Non-leader tries to propose blocks.

**Output:**
```
[Consensus] Not leader for this height
```

**Solution:** This is expected - only the leader for each height can propose blocks. Rotation happens automatically.

---

## Production Deployment

### Multi-Server Setup

**Server 1 (Validator 1):**
```bash
# On validator1.example.com
tana init validator --peers wss://validator2.example.com:9000,wss://validator3.example.com:9000
tana start
```

**Server 2 (Validator 2):**
```bash
# On validator2.example.com
tana init validator --peers wss://validator1.example.com:9000,wss://validator3.example.com:9000
tana start
```

**Server 3 (Validator 3):**
```bash
# On validator3.example.com
tana init validator --peers wss://validator1.example.com:9000,wss://validator2.example.com:9000
tana start
```

### Security Checklist

- [ ] Use TLS/SSL for WebSocket connections (wss://)
- [ ] Firewall rules to restrict consensus ports (9000, 9001)
- [ ] VPN or Tailscale for private validator network
- [ ] Encrypt private keys in validator.json
- [ ] Regular database backups
- [ ] Monitoring/alerting for validator health

---

## Next Steps

After setting up consensus:

1. **Deploy Users** - `tana deploy user <username>`
2. **Deploy Contracts** - `tana deploy contract ./mycontract.ts`
3. **Transfer Funds** - `tana transfer alice bob 100 USD`
4. **Monitor Blockchain** - `tana start webui` (opens browser dashboard)

---

**Last Updated:** November 21, 2025
**Built with Claude Code (Anthropic)**
