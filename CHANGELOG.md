# Changelog - Configuration & Genesis System

**Date:** November 21, 2025
**Focus:** Simplified configuration, distributed deployments, genesis initialization

---

## Major Changes

### 1. Simplified Service Configuration

**Before:** Overcomplicated with `enabled` and `required` flags
```json
{
  "postgres": {
    "url": "postgres://...",
    "enabled": true,
    "required": true
  }
}
```

**After:** Just URL - simple and clean
```json
{
  "postgres": {
    "url": "postgres://..."
  }
}
```

**Rules:**
- If service has URL → Start it
- If service has no URL → Skip it (optional services only)
- If REQUIRED service has no URL → Error with helpful message

**Required services:** postgres, redis, mesh, t4, ledger
**Optional services:** identity, notifications, topology

---

### 2. Top-Level Service Objects

**Why:** Future extensibility for per-service configuration

```json
{
  "postgres": { "url": "..." },
  "redis": { "url": "..." },
  "mesh": {
    "url": "...",
    "timeout": 5000,  // Future option
    "retries": 3      // Future option
  }
}
```

Each service is a top-level field, not nested under `services: {}`.

---

### 3. Distributed Deployment Support

**Problem:** All hardcoded to localhost
**Solution:** Configure any service URL

**Examples:**

**Local Dev:**
```json
{
  "postgres": { "url": "postgres://localhost:5432" },
  "ledger": { "url": "http://localhost:8080" }
}
```

**Production:**
```json
{
  "postgres": { "url": "postgres://db.internal.tana.network:5432" },
  "ledger": { "url": "https://ledger.tana.network" }
}
```

**Tailscale:**
```json
{
  "postgres": { "url": "postgres://db-server.team.ts.net:5432" },
  "ledger": { "url": "http://ledger-node.team.ts.net:8080" }
}
```

**Hybrid:**
```json
{
  "postgres": { "url": "postgres://10.0.1.50:5432" },
  "redis": { "url": "redis://10.0.1.51:6379" },
  "ledger": { "url": "http://localhost:8080" }
}
```

---

### 4. Simplified Sovereign System

**Rule:** First user created = Sovereign (automatic, no configuration)

**Before:** Complex role flags and configuration
```bash
tana new user alice --role sovereign
# Edit config to specify sovereignUser: "alice"
```

**After:** Just create a user
```bash
tana new user alice  # ← alice becomes sovereign (first user)
```

**How it works:**
1. User creates first account with `tana new user alice`
2. Alice's config saved to `~/.config/tana/users/alice.json` with timestamp
3. When genesis runs, finds user with earliest `createdAt` → sovereign
4. User secures `alice.json` (contains private key)

**Additional users (not sovereign):**
```bash
tana new user bob     # bob is not sovereign
tana new user charlie # charlie is not sovereign
```

---

### 5. Core Contracts Configuration

**Purpose:** Keep business logic in contracts, not binaries

**Config:**
```json
{
  "coreContracts": {
    "dir": "./contracts"  // Default: contracts in current directory
  }
}
```

**What happens on genesis:**
1. Scans `./contracts/core/` directory
2. Compiles each contract to WASM
3. Deploys to genesis block
4. Marks as `isCore: true` in database

**Core contracts included:**
- `transfer.ts` - User-to-user transfers
- `deposit.ts` - External deposits
- `withdraw.ts` - Withdrawals
- `user-creation.ts` - Create accounts
- `role-assignment.ts` - Change roles
- `transfer-sovereignty.ts` - Transfer sovereign control
- `currency-creation.ts` - Add currencies
- `balance-adjustment.ts` - Manual corrections

---

## File Changes

### New Files

- `cli/CONFIG-EXAMPLES.md` - Configuration examples for all scenarios
- `cli/GENESIS.md` - Genesis initialization documentation
- `cli/CHANGELOG.md` - This file
- `cli/services/topology/` - Moved backend from webui/src/
- `cli/services/topology/package.json` - Topology service dependencies

### Modified Files

**Configuration System:**
- `cli/utils/config.ts`
  - Added `ServiceConfig` interface (just url)
  - Added `REQUIRED_SERVICES` and `OPTIONAL_SERVICES` constants
  - Added `validateRequiredServices()` function
  - Added `getSovereignUser()` - finds first user created
  - Added `getCoreContractsDir()` - returns contracts directory
  - Updated `ChainConfig` interface with genesis fields

**Chain Creation:**
- `cli/commands/new/chain.ts`
  - Auto-detects sovereign user (first created)
  - Adds `coreContracts` config with default `./contracts`
  - Shows genesis configuration in output
  - Guides user to create first user if none exists

**Startup Manager:**
- `cli/services/startup-manager.ts`
  - Added `validateConfig()` - checks required services
  - Shows helpful error with example config if services missing
  - Accepts `ChainConfig` in constructor
  - Removed references to removed `orchestrator.ts`

**WebUI Integration:**
- `cli/webui/README.md` - Updated architecture documentation
- `cli/webui/src/` - Now only contains frontend (App.tsx, main.tsx, index.css)
- `MIGRATION-TOPOLOGY.md` - Updated with correct structure

### Deleted Files

- `cli/services/orchestrator.ts` - Legacy code (replaced by startup-manager)
- `cli/webui/src/server.ts` - Moved to services/topology/src/index.ts

---

## Breaking Changes

### Configuration Format

**Old configs still work** via fallback to defaults, but **new chains require explicit service URLs**.

**Migration:**

Old config (missing services):
```json
{
  "name": "mychain",
  "type": "local"
}
```

New config (explicit services):
```json
{
  "name": "mychain",
  "type": "local",
  "postgres": { "url": "postgres://localhost:5432" },
  "redis": { "url": "redis://localhost:6379" },
  "mesh": { "url": "http://localhost:8190" },
  "t4": { "url": "http://localhost:8180" },
  "ledger": { "url": "http://localhost:8080" }
}
```

**Auto-migration:** Run `tana new chain <name>` to generate with all defaults.

---

## Three-Interface System (Unchanged)

All three interfaces use the same `StartupManager`:

```bash
tana start        # CLI mode (spinners, logs)
tana start tui    # Terminal dashboard (OpenTUI)
tana start webui  # Browser dashboard (React + Vite)
```

**Architecture:**
```
startup-manager.ts (shared logic)
    ↓         ↓         ↓
  CLI       TUI      WebUI
(spinners) (terminal) (browser)
```

---

## Testing Checklist

- [ ] Create chain with `tana new chain test`
- [ ] Create first user with `tana new user alice`
- [ ] Verify alice shown as sovereign in chain output
- [ ] Start chain with `tana start webui`
- [ ] Verify config validation error if postgres missing
- [ ] Verify genesis block created
- [ ] Verify sovereign account created on-chain
- [ ] Verify core contracts deployed
- [ ] Test with custom contracts dir
- [ ] Test with remote service URLs (Tailscale)

---

## Documentation

**User-facing:**
- `CONFIG-EXAMPLES.md` - Configuration examples
- `GENESIS.md` - Genesis initialization guide

**Developer:**
- `ARCHITECTURE.md` - System overview (needs update)
- `MIGRATION-TOPOLOGY.md` - Topology migration guide
- `CHANGELOG.md` - This file

---

## Next Steps

1. **Test genesis initialization** with actual ledger service
2. **Implement core contracts deployment** in genesis script
3. **Add sovereign validation** on contract execution
4. **Update ARCHITECTURE.md** with new config system
5. **Add integration tests** for genesis flow

---

## Credits

Inspired by:
- **package.json** - Top-level dependency objects
- **Kubernetes** - Service URL configuration
- **Tailscale** - Secure mesh networking examples
