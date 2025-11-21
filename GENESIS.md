# Genesis Block & Core Contracts

This document explains how Tana initializes the genesis block with sovereign accounts and core contracts.

## Philosophy

**Keep business logic in contracts, not binaries.** Core system mechanisms (transfers, deposits, role assignments, etc.) are implemented as smart contracts that are deployed with the genesis block. This ensures:

- **Transparency**: All logic is visible on-chain
- **Upgradability**: Contracts can be replaced via sovereignty transfer
- **Auditability**: Changes are recorded in the blockchain

## Genesis Initialization Sequence

When you run `tana start` on a genesis chain (where `isGenesis: true`), the following happens:

### 1. Pre-flight Checks
```
✓ Validate chain configuration
✓ Check required services have URLs
✓ Verify Docker is running
```

### 2. Infrastructure Startup
```
✓ Start postgres (required)
✓ Start redis (required)
```

### 3. Genesis Block Creation

**If genesis block doesn't exist** (height 0 not in database):

```typescript
// Block #0 created with:
{
  height: 0,
  previousHash: '0'.repeat(64),
  timestamp: genesisTimestamp,
  producer: '00000000-0000-0000-0000-000000000000',
  transactions: [],
  stateChanges: [],
  txRoot: hashObject([]),
  stateRoot: hashString('empty-tree'),
  gasUsed: 0,
  gasLimit: 1000000
}
```

### 4. Base Currencies Initialization

Immediately after genesis block:

```typescript
await db.insert(currencies).values([
  { code: 'USD', type: 'fiat', decimals: '2' },
  { code: 'BTC', type: 'crypto', decimals: '8' },
  { code: 'ETH', type: 'crypto', decimals: '8' }
])
```

### 5. Sovereign Account Creation

**From chain config** (`~/.config/tana/chains/<chain>.json`):

```json
{
  "sovereignUser": "alice"
}
```

**Reads user config** from `~/.config/tana/users/alice.json`:

```json
{
  "username": "alice",
  "publicKey": "0x...",
  "privateKey": "0x...",
  "displayName": "Alice",
  "role": "sovereign"
}
```

**Creates on-chain account**:

```typescript
await db.insert(users).values({
  publicKey: sovereignConfig.publicKey,
  username: sovereignConfig.username,
  displayName: sovereignConfig.displayName,
  role: 'sovereign',
  stateHash: hashString('sovereign_genesis_state'),
  nonce: 0
})

// Initialize balances for all base currencies
for (const currency of ['USD', 'BTC', 'ETH']) {
  await db.insert(balances).values({
    publicKey: sovereignConfig.publicKey,
    currency,
    amount: '0'
  })
}
```

### 6. Core Contracts Deployment

**From chain config**:

```json
{
  "coreContracts": {
    "dir": "./contracts"
  }
}
```

**Scans directory** for contract files:

```
./contracts/core/
├── balance-adjustment.ts
├── currency-creation.ts
├── deposit-confirmation.ts
├── deposit.ts
├── role-assignment.ts
├── transfer-sovereignty.ts
├── transfer.ts
├── user-creation.ts
├── withdraw.ts
└── withdrawal-confirmation.ts
```

**Compiles and deploys each**:

```typescript
for (const contract of coreContracts) {
  const compiled = await compileContract(contract)

  await db.insert(contracts).values({
    id: generateContractId(contract.name),
    name: contract.name,
    code: compiled.wasmBytes,
    abi: compiled.abi,
    creator: sovereignPublicKey,
    createdAt: genesisTimestamp,
    version: '1.0.0',
    isCore: true
  })
}
```

### 7. Tana Services Startup

```
✓ Start mesh (network coordination)
✓ Start t4 (storage)
✓ Start ledger (blockchain)
✓ Start identity (optional)
✓ Start notifications (optional)
✓ Start topology (optional)
```

### 8. Ready State

```
✓ All services running
✓ Genesis block finalized
✓ Sovereign account active
✓ Core contracts deployed
✓ Ready to accept transactions
```

---

## Configuration Examples

### Minimal (Auto-detect Sovereign)

Create sovereign user first:

```bash
tana new user alice --role sovereign
```

Then create chain (auto-detects alice):

```bash
tana new chain mychain
```

**Generated config**:

```json
{
  "name": "mychain",
  "isGenesis": true,
  "sovereignUser": "alice",
  "coreContracts": {
    "dir": "./contracts"
  }
}
```

### Explicit Sovereign

Specify sovereign in config manually:

```bash
# Edit ~/.config/tana/chains/mychain.json
{
  "name": "mychain",
  "sovereignUser": "bob",
  "coreContracts": {
    "dir": "./contracts"
  }
}
```

### Custom Core Contracts Directory

Use contracts from a different location:

```json
{
  "name": "mainnet",
  "sovereignUser": "network-admin",
  "coreContracts": {
    "dir": "/opt/tana/production-contracts"
  }
}
```

### No Sovereign (Error)

If no sovereign user is configured:

```
✗ Genesis Error: No sovereign user configured

A genesis block requires a sovereign user to manage the network.

Create one with:
  tana new user <username> --role sovereign

Then add to your chain config (~/.config/tana/chains/mychain.json):
  {
    "sovereignUser": "<username>"
  }
```

---

## Core Contracts Reference

### Transfer (transfer.ts)

Handles user-to-user transfers of currencies.

```typescript
interface TransferParams {
  from: string      // Public key
  to: string        // Public key
  amount: string    // Decimal string
  currency: string  // Currency code
}
```

### Deposit (deposit.ts)

Records external deposits (fiat/crypto → Tana).

```typescript
interface DepositParams {
  publicKey: string
  amount: string
  currency: string
  externalTxId: string  // Off-chain transaction ID
}
```

### Withdraw (withdraw.ts)

Initiates withdrawals (Tana → fiat/crypto).

```typescript
interface WithdrawParams {
  publicKey: string
  amount: string
  currency: string
  destination: string  // External address
}
```

### User Creation (user-creation.ts)

Creates new user accounts.

```typescript
interface UserCreationParams {
  publicKey: string
  username: string
  displayName: string
  role?: 'user' | 'staff' | 'sovereign'
}
```

### Role Assignment (role-assignment.ts)

Changes user roles (sovereign only).

```typescript
interface RoleAssignmentParams {
  publicKey: string
  newRole: 'user' | 'staff' | 'sovereign'
  reason: string
}
```

### Transfer Sovereignty (transfer-sovereignty.ts)

Transfers sovereign control to another user.

```typescript
interface TransferSovereigntyParams {
  fromPublicKey: string  // Current sovereign
  toPublicKey: string    // New sovereign
  reason: string
}
```

### Currency Creation (currency-creation.ts)

Adds new currencies to the system (sovereign only).

```typescript
interface CurrencyCreationParams {
  code: string       // e.g., "USDC"
  type: 'fiat' | 'crypto'
  decimals: string   // e.g., "6"
  name: string       // e.g., "USD Coin"
  symbol: string     // e.g., "$"
}
```

### Balance Adjustment (balance-adjustment.ts)

Direct balance modifications (sovereign only, for corrections).

```typescript
interface BalanceAdjustmentParams {
  publicKey: string
  currency: string
  adjustment: string  // Can be negative
  reason: string
}
```

---

## Sovereign User Workflow

### 1. Create Sovereign Account

```bash
tana new user alice --role sovereign --name "Alice (Network Admin)"
```

This creates `~/.config/tana/users/alice.json`:

```json
{
  "username": "alice",
  "publicKey": "0x1234...",
  "privateKey": "0xabcd...",
  "displayName": "Alice (Network Admin)",
  "role": "sovereign",
  "createdAt": "2025-11-21T12:00:00.000Z",
  "chains": []
}
```

### 2. Create Genesis Chain

```bash
tana new chain mainnet
```

Auto-detects alice as sovereign and adds to config.

### 3. Start Chain

```bash
tana start
```

Genesis initialization runs:
- ✓ Genesis block created
- ✓ Alice becomes on-chain sovereign
- ✓ Core contracts deployed
- ✓ Ready for transactions

### 4. Manage Network

Alice can now:
- Create new users via `user-creation` contract
- Assign roles via `role-assignment` contract
- Add currencies via `currency-creation` contract
- Transfer sovereignty via `transfer-sovereignty` contract

---

## Best Practices

1. **Backup sovereign keys** - Store `~/.config/tana/users/<sovereign>.json` securely
2. **Test with test sovereign first** - Create test-sovereign user for development
3. **Use different sovereigns per environment** - dev-sovereign, staging-sovereign, prod-sovereign
4. **Version control contracts** - Keep core contracts in git
5. **Audit contract changes** - Review all changes to core contracts before deployment

---

## Troubleshooting

### No Sovereign User Found

```
✗ Genesis Error: No sovereign user configured
```

**Solution:** Create sovereign user first:

```bash
tana new user admin --role sovereign
```

### Sovereign User Not Found

```
✗ Genesis Error: Sovereign user 'alice' not found in ~/.config/tana/users/
```

**Solution:** Check username spelling or create the user:

```bash
tana new user alice --role sovereign
```

### Core Contracts Directory Missing

```
✗ Genesis Error: Core contracts directory not found: ./contracts
```

**Solution:** Either:
- Create `./contracts/core/` and add contract files
- Change config to point to existing directory
- Copy from dev-env: `cp -r /path/to/tana/dev-env/contracts ./`

### Genesis Block Already Exists

```
⚠️  Genesis block already exists!
```

This is normal if you've started the chain before. Genesis only runs once.

To recreate (⚠️ **destroys all data**):

```bash
cd cli/services/ledger
bun run src/scripts/flush-blockchain.ts
```

---

## Next Steps

After genesis initialization:

```bash
# Check status
tana status

# View genesis block
curl http://localhost:8080/blocks/0

# Create additional users
tana new user bob
tana deploy user bob

# Test core contracts
curl -X POST http://localhost:8080/contracts/transfer \
  -H "Content-Type: application/json" \
  -d '{"from":"0x...","to":"0x...","amount":"100","currency":"USD"}'
```
