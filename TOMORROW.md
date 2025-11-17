# Tomorrow's Priorities - November 18, 2024

## ✅ Completed Today (November 17)
- End-to-end mesh network testing (registration → approval → activation)
- Fixed 3 critical bugs:
  - Keypair generation (Bun compatibility)
  - Multi-validator key collision (node-specific keys)
  - Hono v4 API compatibility (`c.req.param()`)
- Successfully tested 2-validator dev mode workflow
- All changes committed and pushed

## 🎯 Top Priorities for Tomorrow

### 1. Heartbeat Automation (HIGH PRIORITY)
**Why:** Validators don't automatically announce they're alive

**Implementation:**
- Location: `cli/services/ledger/src/index.ts`
- Add background job that sends `POST /heartbeat` to mesh every 2 minutes
- Include service health status (ledger OK, t4 OK, etc.)

**Code Pattern:**
```typescript
// In ledger service startup
setInterval(async () => {
  const nodeKey = loadNodeKey()
  const message = `heartbeat:${Date.now()}`
  const signature = await signMessage(message, nodeKey.privateKey)

  await fetch('http://mesh:8190/heartbeat', {
    method: 'POST',
    body: JSON.stringify({
      nodeId: nodeKey.nodeId,
      signature,
      services: [
        { type: 'ledger', healthy: true },
        { type: 't4', healthy: await checkT4Health() }
      ]
    })
  })
}, 120000) // 2 minutes
```

### 2. Service Auth Tokens (SAT) (HIGH PRIORITY)
**Why:** t4 and mesh have no authentication - anyone can add/delete files

**Implementation:**
- Create new package: `packages/service-auth/`
- JWT-like tokens with Ed25519 signatures
- Registry of service public keys
- Add middleware to t4 and mesh

**Files to Create:**
- `packages/service-auth/src/index.ts` - Token generation/verification
- `packages/service-auth/src/middleware.ts` - Hono middleware
- Update `services/t4/src/index.ts` - Add auth middleware
- Update `services/mesh/src/index.ts` - Add auth to sensitive endpoints

### 3. Integrate mesh into `tana start` (MEDIUM PRIORITY)
**Why:** mesh should auto-start with other services

**Files to Update:**
- `cli/commands/service/start.ts`
- Launch mesh before ledger/t4
- Add health checks before marking "ready"
- Update mprocs.yaml to include mesh

### 4. VM Testing Preparation (MEDIUM PRIORITY)
**Why:** Need to test in real multi-validator environment

**Options:**
1. **Docker Compose** (quickest for testing)
   - 3 containers with Tailscale
   - Test locally before cloud deployment

2. **Real VMs** (most realistic)
   - DigitalOcean, AWS, Hetzner (different providers)
   - Install via: `curl -fsSL https://raw.githubusercontent.com/tananetwork/tana/main/install.sh | bash`

**Decide:** Docker first or straight to VMs?

## 📋 Quick Reference Commands

```bash
# Start mesh service
cd cli/services/mesh && bun run dev

# Register validators (dev mode)
cd cli
MESH_URL=http://localhost:8190 ./dist/tana mesh register --dev --node-id validator-1
MESH_URL=http://localhost:8190 ./dist/tana mesh register --dev --node-id validator-2 --port-offset 100

# Approve validators
./dist/tana mesh approve validator-1
./dist/tana mesh approve validator-2

# List network
./dist/tana mesh list
```

## 🔑 Key Files to Reference

**Mesh Network:**
- `cli/commands/mesh/register.ts` - Registration logic
- `cli/services/mesh/src/index.ts` - Mesh HTTP API
- `cli/services/mesh/README.md` - Full API docs

**Crypto:**
- `cli/utils/crypto.ts` - Ed25519 signing/verification
- `~/.config/tana/node-key-{nodeId}.json` - Node keypairs
- `~/.config/tana/sovereign-key.json` - Sovereign key

## ❓ Questions to Resolve Tomorrow

1. **Consensus Mechanism:** PBFT? Tendermint? Custom?
2. **Service Startup Order:** Should mesh run as separate daemon or part of ledger?
3. **Testing Strategy:** Docker Compose first or straight to cloud VMs?
4. **npm Organization:** Publish under personal account or create @tananetwork org?

## 🐛 Known Issues

- [ ] Heartbeat automation not implemented (validators go offline after 5 min)
- [ ] No inter-service authentication (SAT tokens needed)
- [ ] mesh not integrated into `tana start` command
- [ ] Block production still manual (`npm run pending`)
- [ ] No consensus mechanism (multi-validator will diverge)

## 📊 Current State

**Working:**
- ✅ Mesh network registration & approval
- ✅ Dev mode multi-validator testing
- ✅ Ed25519 cryptographic signatures
- ✅ CLI commands (register, approve, status, list)
- ✅ SQLite mesh database
- ✅ Service discovery

**Needs Work:**
- ⏳ Heartbeat automation
- ⏳ Service auth tokens
- ⏳ Auto-start mesh coordinator
- ⏳ VM deployment & testing
- ⏳ Consensus mechanism

---

**Last Updated:** November 17, 2024, 7:30 PM PST
**Session Commits:** 2 (56e320f, f2dfa67)
