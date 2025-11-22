# CLAUDE.md - Tana CLI Development Guide

This file provides guidance to Claude Code when working with the Tana CLI project.

**Last Updated:** November 22, 2025
**MVP Progress:** ~80% complete (Genesis ✅)
**Target:** Mid-December 2025

---

## 🎯 IMMEDIATE NEXT STEPS (Priority Order)

### Phase 1: Genesis Integration ✅ **COMPLETED (Nov 22, 2025)**

**Genesis initialization is now fully automated via `tana start --genesis`!**

**What Works:**
- ✅ Automatic database drop/recreate for fresh genesis
- ✅ All 14 migrations applied via standalone script
- ✅ Genesis block created (height 0)
- ✅ Sovereign user created with role assignment
- ✅ All services start successfully
- ✅ Validator auto-configured on first run

**Key Files Modified:**
- `services/ledger/scripts/run-migrations.ts` - New standalone migration runner
- `services/ledger/src/index.ts` - Removed duplicate migration logic
- `services/startup-manager.ts` - Integrated migration script, database recreation
- `docker-compose.yml` - Fixed Postgres username to match application code

**Migration System:**
- **Old approach:** Drizzle's migrate() with journal metadata (broken - only ran 3/14 migrations)
- **New approach:** Direct SQL file execution in alphabetical order (simple, reliable)
- **Location:** All 14 SQL migration files in `services/ledger/migrations/`
- **Execution:** Standalone script runs BEFORE services start

**Testing Genesis:**
```bash
# Clean start with genesis initialization
bun run dev start --genesis

# Verify genesis block
curl http://localhost:8080/blocks

# Verify sovereign user
curl http://localhost:8080/users
```

### Phase 2: Testing & Edge Cases (Current Phase)

**1. Test TUI and WebUI Modes** 🔄 **IN PROGRESS**
- **Task:** Verify all three interfaces work with genesis
- **Commands to test:**
  ```bash
  bun run dev start           # CLI mode
  bun run dev start tui       # Terminal UI
  bun run dev start webui     # Browser dashboard
  ```
- **What to verify:**
  - Genesis initialization works in all modes
  - Service startup progresses correctly
  - Error messages display properly
  - All services become healthy

**2. Find Edge Cases During Startup**
- **Task:** Test failure scenarios and recovery
- **Scenarios:**
  - Docker not running
  - Redis connection failure
  - Postgres authentication failure
  - Port conflicts (8080, 8090, etc. already in use)
  - Missing validator config
  - Database already exists (non-genesis mode)
  - Interrupted genesis initialization

**3. Block Production Testing**
- **File:** `services/ledger/src/scripts/produce-block.ts`
- **Task:** Verify block production works after genesis
- **Testing:**
  - Manual block production
  - Automatic block production via consensus
  - Transaction inclusion in blocks
  - State root calculation

### Phase 3: Smart Contract Runtime (3-5 days)
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

### Phase 3: Multi-Validator Consensus (5-7 days) - ✅ PARTIALLY COMPLETE

**6. Automatic Validator Initialization** ✅ **COMPLETED (Nov 22, 2025)**
- **Files Modified:**
  - `services/startup-manager.ts` (added `ensureValidator()` method)
  - `commands/init/validator.ts` (fixed validator ID generation)
- **Implementation:**
  - ✅ Validators now auto-create on `tana start` if missing
  - ✅ Generates Ed25519 keypair using noble/ed25519
  - ✅ Creates `~/.config/tana/validator.json` with defaults:
    - Auto-generated validator ID (e.g., `val_386dd37a`)
    - WS port: 9000, HTTP API port: 9001
    - No peers (standalone mode)
  - ✅ Configured noble/ed25519 with SHA512 hash function
  - ✅ Fixed validator ID to properly skip "ed25519_" prefix
- **Result:** Validators are now a built-in part of every node (perfect for local dev/testnet)

**7. Multi-Validator Network & BFT** 🔄 **REMAINING**
- **Files:**
  - `services/consensus/` (already exists)
  - `services/ledger/src/scripts/produce-block.ts` (consensus already integrated)
- **Task:** Test and validate multi-validator consensus
- **Implementation:**
  - ✅ Consensus service exists and is wired to startup-manager
  - ✅ Automatic activation when validatorCount >= 2 (already implemented)
  - ✅ Leader rotation based on `height % validatorCount`
  - 🔄 Test with 3-validator network locally
  - 🔄 Verify block proposals and quorum voting
  - 🔄 Test Byzantine fault tolerance
- **Testing:**
  - Start 3-validator network locally (use `tana init validator --peers`)
  - Verify block proposals reach quorum
  - Test leader rotation across heights
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

### ✅ Completed (Nov 22, 2025)

**Genesis Integration:** ✅ **FULLY WORKING**
- Genesis block creation (height 0)
- Sovereign account creation with role assignment
- Database migrations (all 14 SQL files)
- Automatic database drop/recreate for --genesis mode
- Validator auto-configuration
- All services start successfully after genesis

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

**Database Migrations:**
- Standalone migration script (bypasses Drizzle journal)
- All 14 SQL migrations applied automatically
- Runs BEFORE services start (not during)
- Postgres username fixed (postgres, not tana)

### ⏳ In Progress (Next Session)

**Interface Testing:**
- Test TUI mode with genesis
- Test WebUI mode with genesis
- Verify error handling in all modes

**Edge Case Testing:**
- Docker not running scenario
- Port conflict handling
- Database connection failures
- Recovery from interrupted genesis

### 🔜 Not Started

**Block Production:**
- Manual block production testing
- Automatic block production via consensus
- Transaction inclusion verification

**Smart Contract Runtime:**
- WASM execution integration
- Gas metering
- State updates from contract results

**Multi-Validator Consensus:**
- BFT implementation (code exists, needs testing)
- Leader rotation verification
- Fault tolerance testing (3+ validators)

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

### ✅ Fixed (Nov 22, 2025)

**Drizzle Migration Journal Out of Sync** - RESOLVED
- **Issue:** Journal only tracked 3/14 migrations, causing incomplete schema
- **Impact:** Missing columns (transactions, state_changes, content_refs) in blocks table
- **Fix:** Created standalone migration script that directly executes all SQL files
- **Files:** `services/ledger/scripts/run-migrations.ts`

**Postgres Username Mismatch** - RESOLVED
- **Issue:** docker-compose.yml used `POSTGRES_USER: tana` but code expected `postgres`
- **Impact:** Database authentication failures
- **Fix:** Changed docker-compose.yml to use `postgres` username

**Duplicate Migration Logic** - RESOLVED
- **Issue:** Both startup-manager and ledger service tried to run migrations
- **Impact:** Race conditions, confusing logs
- **Fix:** Removed migration logic from ledger service, only runs via standalone script

### Active Issues

**Core Contracts Not Deploying** 🔄
- **Issue:** Genesis creates block and sovereign user, but contracts array is empty
- **Impact:** No core contracts available after genesis
- **Investigation needed:** Check if contracts directory exists, verify deployment logic
- **File:** `services/ledger/src/scripts/create-genesis.ts:254`

**Consensus Not Wired to Block Production**
- **Issue:** Consensus service exists but not integrated with ledger
- **Impact:** Single-validator only, no BFT finality
- **Next:** Test multi-validator setup (3+ nodes)

**Smart Contract Execution**
- **Issue:** Runtime exists (Rust) but not callable from ledger API
- **Impact:** Contracts can be deployed but not executed
- **Next:** Wire WASM runtime to contract execution endpoint

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
