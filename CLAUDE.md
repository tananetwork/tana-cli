# CLAUDE.md - Tana CLI Development Guide

This file provides guidance to Claude Code when working with the Tana CLI project.

**Last Updated:** November 21, 2025
**MVP Progress:** ~70% complete
**Target:** Mid-December 2025

---

## 🎯 IMMEDIATE NEXT STEPS (Priority Order)

### Phase 1: Genesis Integration (1-2 days)

**1. Wire Genesis Validation to Startup Manager**
- **File:** `services/startup-manager.ts`
- **Task:** Add genesis validation step after Docker checks, before service startup
- **Implementation:**
  ```typescript
  // In startAll() method, after checkDockerRunning():
  if (chainConfig?.isGenesis) {
    await this.initializeGenesis()
  }
  ```
- **What to validate:**
  - Chain config has `isGenesis: true`
  - Sovereign user exists (first user created)
  - Core contracts directory exists and has contracts
  - Genesis block doesn't already exist (check ledger DB)

**2. Deploy Core Contracts on Genesis**
- **File:** `services/ledger/src/scripts/create-genesis.ts` (or new genesis service)
- **Task:** Scan contracts directory, compile, and deploy to DB
- **Implementation:**
  - Read `chainConfig.coreContracts.dir` (default: `./contracts`)
  - Scan for `*.ts` files in `core/` subdirectory
  - For each contract:
    - Compile to WASM (use existing runtime)
    - Insert into `contracts` table with `isCore: true`
    - Set `creator` to sovereign public key
  - Log each deployed contract

**3. Create Sovereign Account On-Chain**
- **File:** `services/ledger/src/scripts/create-genesis.ts`
- **Task:** After genesis block creation, insert sovereign user
- **Implementation:**
  - Get sovereign user via `getSovereignUser()` from config utils
  - Insert into `users` table:
    - publicKey, username, displayName from user config
    - role: 'sovereign' (hardcoded for first user)
    - stateHash: deterministic based on genesis
    - nonce: 0
  - Initialize balances for all base currencies (USD, BTC, ETH)
  - Log sovereign account creation

**4. Test End-to-End Genesis Flow**
- **Task:** Manual testing of complete genesis sequence
- **Test Steps:**
  ```bash
  # Clean slate
  cd cli/services/ledger
  bun run src/scripts/flush-blockchain.ts

  # Create first user (sovereign)
  cd ../..
  tana new user alice

  # Create genesis chain
  tana new chain test-genesis

  # Start and verify
  tana start webui

  # Expected results:
  # ✓ Genesis block created (height 0)
  # ✓ Sovereign account exists (alice)
  # ✓ Core contracts deployed (check contracts table)
  # ✓ All services running
  ```
- **Verification Queries:**
  ```sql
  SELECT * FROM blocks WHERE height = 0;
  SELECT * FROM users WHERE role = 'sovereign';
  SELECT * FROM contracts WHERE "isCore" = true;
  SELECT * FROM balances WHERE "publicKey" = '<alice_pubkey>';
  ```

---

### Phase 2: Smart Contract Runtime (3-5 days)

**5. Wire WASM Runtime to Ledger**
- **Files:**
  - `services/ledger/src/api/routes/contracts.ts`
  - Integration with `../runtime/` (Rust WASM executor)
- **Task:** Enable contract execution in transactions
- **Implementation:**
  - Add contract execution endpoint: `POST /contracts/:id/execute`
  - Accept parameters, call Rust runtime via FFI/subprocess
  - Return execution result + gas used
  - Update blockchain state based on contract output
- **Testing:**
  - Deploy test contract
  - Execute with various parameters
  - Verify state changes persisted
  - Check gas metering works

---

### Phase 3: Multi-Validator Consensus (5-7 days)

**6. Multi-Validator Consensus Integration**
- **Files:**
  - `services/consensus/` (already exists)
  - `services/ledger/src/events/block-listener.ts`
- **Task:** Enable BFT consensus for block finalization
- **Implementation:**
  - Configure multiple validators (3-6 nodes)
  - Wire consensus service to ledger
  - Implement leader rotation
  - Add vote collection and finalization
  - Handle Byzantine faults (up to f=1 for 4 validators)
- **Testing:**
  - Start 3-validator network locally
  - Verify block proposals
  - Test leader rotation
  - Inject Byzantine behavior (kill validator, network partition)
  - Verify recovery and continued finality

---

### Phase 4: End-to-End Validation (2-3 days)

**7. End-to-End Transaction Testing**
- **Task:** Complete user journey from account creation to fund transfer
- **Flow:**
  ```bash
  # 1. Genesis initialization (already tested in step 4)

  # 2. Create additional users
  tana new user bob
  tana deploy user bob

  # 3. Execute core contracts
  # Transfer funds (alice → bob)
  curl -X POST http://localhost:8080/contracts/transfer \
    -H "Content-Type: application/json" \
    -d '{
      "from": "<alice_pubkey>",
      "to": "<bob_pubkey>",
      "amount": "100",
      "currency": "USD"
    }'

  # 4. Verify balances
  tana balance alice --currency USD
  tana balance bob --currency USD

  # 5. Check blockchain state
  curl http://localhost:8080/blocks/latest
  curl http://localhost:8080/transactions
  ```
- **Success Criteria:**
  - ✓ User creation works
  - ✓ Transfer contract executes
  - ✓ Balances update correctly
  - ✓ Transaction appears in block
  - ✓ Block is finalized by consensus
  - ✓ State is queryable via API

---

## 📋 Current System State

### ✅ Completed (Nov 21, 2025)

**Configuration System:**
- Top-level service objects (just URL, no flags)
- Required vs optional services (hardcoded validation)
- Distributed deployment support (Tailscale, multi-server, hybrid)
- Helpful error messages with examples
- Config examples for all scenarios

**Sovereign System:**
- First user created = sovereign (automatic)
- Auto-detection on genesis
- Core contracts configuration (default: `./contracts`)

**Three Interfaces:**
- CLI mode (`tana start`) - spinners and logs
- TUI mode (`tana start tui`) - OpenTUI terminal dashboard
- WebUI mode (`tana start webui`) - React browser dashboard
- Shared startup logic (startup-manager.ts)

**Repository Structure:**
- WebUI integrated (`cli/webui/`)
- Topology backend moved (`cli/services/topology/`)
- Legacy code removed (orchestrator.ts)
- tana-topology repo ready for deletion

### ⏳ In Progress

**Genesis Integration:**
- Genesis block creation ✅ (exists in ledger service)
- Sovereign account creation 🔄 (needs wiring to startup)
- Core contracts deployment 🔄 (needs implementation)

### 🔜 Not Started

**Smart Contract Runtime:**
- WASM execution integration
- Gas metering
- State updates from contract results

**Multi-Validator Consensus:**
- BFT implementation (code exists, needs wiring)
- Leader rotation
- Fault tolerance testing

---

## 🏗️ Architecture Overview

### Repository Structure

```
cli/
├── commands/              # CLI command implementations
│   ├── new/              # tana new chain/user/contract
│   ├── service/          # tana start/stop/status
│   │   ├── start.ts          # Router (CLI/TUI/WebUI)
│   │   ├── start-cli.ts      # CLI interface
│   │   ├── start-tui.ts      # TUI interface
│   │   └── start-web.ts      # WebUI interface
│   └── tui/              # TUI components (OpenTUI + React)
│
├── services/             # Backend services
│   ├── startup-manager.ts    # ← SHARED STARTUP LOGIC
│   ├── ledger/              # Blockchain state (port 8080)
│   ├── mesh/                # Network registry (port 8190)
│   ├── t4/                  # Content storage (port 8180)
│   ├── identity/            # Authentication (port 8090)
│   ├── notifications/       # Push (port 8091)
│   ├── topology/            # Visualization backend (port 3001, WS 8191)
│   └── consensus/           # Multi-validator (port 9000+)
│
├── webui/                # Browser dashboard (React + Vite)
│   ├── src/
│   │   ├── App.tsx          # Dashboard component
│   │   └── main.tsx         # Entry point
│   └── dist/                # Built files (production)
│
└── utils/
    └── config.ts            # ~/.config/tana/ management
```

### Startup Flow

```
User runs: tana start webui
    ↓
main.ts → start.ts (router) → start-web.ts
    ↓
Creates StartupManager(chainConfig)
    ↓
StartupManager.startAll():
  1. Validate config (required services present)
  2. Check Docker running
  3. [NEW] Initialize genesis (if isGenesis: true)
  4. Start postgres, redis (Docker)
  5. Start mesh, t4, ledger, identity, notifications, topology (Tana)
  6. Start Vite dev server (or serve dist/)
  7. Open browser to http://localhost:5173
  8. Emit 'complete' event
```

### Configuration File

`~/.config/tana/chains/<chain-name>.json`:

```json
{
  "name": "mychain",
  "type": "local",
  "isGenesis": true,
  "createdAt": "2025-11-21T...",
  "genesisBlock": "0xabc123...",

  "coreContracts": {
    "dir": "./contracts"
  },

  "postgres": { "url": "postgres://localhost:5432" },
  "redis": { "url": "redis://localhost:6379" },
  "mesh": { "url": "http://localhost:8190" },
  "t4": { "url": "http://localhost:8180" },
  "ledger": { "url": "http://localhost:8080" },
  "identity": { "url": "http://localhost:8090" },
  "notifications": { "url": "http://localhost:8091" },
  "topology": { "url": "http://localhost:3001" }
}
```

---

## 🔧 Development Workflow

### Local Development

```bash
# Start all services with WebUI
cd cli
bun run dev start webui

# Or with TUI
bun run dev start tui

# Or CLI mode
bun run dev start
```

### Testing Genesis

```bash
# Clean database
cd cli/services/ledger
bun run src/scripts/flush-blockchain.ts

# Create sovereign user
cd ../..
tana new user alice

# Create genesis chain
tana new chain mychain

# Start and test
tana start webui
```

### Database Access

```bash
# PostgreSQL
DATABASE_URL='postgres://postgres:tana_dev_password@localhost:5432/tana' psql

# Useful queries
SELECT * FROM blocks ORDER BY height DESC LIMIT 10;
SELECT * FROM users;
SELECT * FROM contracts WHERE "isCore" = true;
SELECT * FROM balances;
```

---

## 📚 Key Documentation

**User Guides:**
- `CONFIG-EXAMPLES.md` - Deployment configurations
- `GENESIS.md` - Genesis initialization
- `README-TUI.md` - Terminal interface

**Developer Guides:**
- `CHANGELOG.md` - Recent changes
- `MVP-STATUS.md` - Progress tracking
- `ARCHITECTURE.md` - System overview (needs update)

**Migration Guides:**
- `MIGRATION-TOPOLOGY.md` - Topology repo migration

---

## 🧪 Testing Checklist

### Pre-Commit Tests

- [ ] `bun test` passes (unit tests)
- [ ] Config validation works (try removing required service)
- [ ] All three interfaces start (`tana start`, `tana start tui`, `tana start webui`)
- [ ] Genesis block creates (check DB)

### Integration Tests

- [ ] Full genesis flow (step 4 above)
- [ ] Multi-service startup
- [ ] Service health checks
- [ ] WebUI connects and displays data

---

## 🐛 Known Issues

### Genesis Integration

**Issue:** Genesis block creation not wired to startup-manager
**Impact:** Genesis runs via manual script, not automatic on `tana start`
**Fix:** Implement step 1-3 above

### Consensus

**Issue:** Consensus service exists but not integrated with ledger
**Impact:** Single-validator only, no BFT finality
**Fix:** Implement step 6 above

### Smart Contracts

**Issue:** Runtime exists (Rust) but not callable from ledger
**Impact:** Contracts can be deployed but not executed
**Fix:** Implement step 5 above

---

## 💡 Coding Guidelines

### Style

- **TypeScript:** Use strict mode, prefer interfaces over types
- **Async/await:** Preferred over promises
- **Error handling:** Always wrap in try/catch, emit errors via EventEmitter
- **Logging:** Use console.log for dev, emit events for production

### File Organization

- **Commands:** One file per command in `commands/<command>/`
- **Services:** Each service is self-contained in `services/<name>/`
- **Shared logic:** Put in `utils/` or `services/` (not in commands)

### Testing

- **Unit tests:** Alongside source files (`*.test.ts`)
- **Integration tests:** In `tests/` directory
- **Manual tests:** Document in CLAUDE.md

---

## 🚀 Quick Reference

**Create user:**
```bash
tana new user <username>
```

**Create chain:**
```bash
tana new chain <name>
```

**Start services:**
```bash
tana start [mode]  # mode: tui | webui
```

**Deploy user:**
```bash
tana deploy user <username>
```

**Check status:**
```bash
tana status
```

**View logs:**
```bash
# Services log to stdout
# Or check /tmp/<service>.log
```

---

## 📞 Help & Support

**Documentation:** Start with MVP-STATUS.md for progress overview

**Common Issues:**
1. Docker not running → `open -a Docker` (macOS)
2. Port conflicts → Check `lsof -i :8080` etc.
3. Genesis errors → Check sovereign user exists (`tana new user` first)
4. Service crashes → Check service logs in /tmp/

**Next Session:** Focus on steps 1-4 (genesis integration)

---

**Last Updated:** November 21, 2025
**Contributors:** Built with Claude Code (Anthropic)
**License:** MIT
