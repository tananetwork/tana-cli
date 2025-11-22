# AT Protocol Integration Feasibility Study

**Date:** November 22, 2025
**Status:** Design Phase
**Goal:** Integrate Tana ledger with Bluesky's AT Protocol for federated identity and portable social commerce data

---

## Executive Summary

This document explores integrating Tana's blockchain-based commerce ledger with the AT Protocol (Bluesky) federation. The proposed architecture uses a **two-layer hybrid model**:

- **Layer 1: Blockchain** - Immutable financial truth (transactions, balances, blocks)
- **Layer 2: AT Protocol** - Portable user data (profiles, products, invoices, reviews)

**Key Insight:** Lexicons serve as the unified API schema for both layers, while data storage remains heterogeneous (blockchain vs PDS).

---

## Table of Contents

1. [Why AT Protocol?](#why-at-protocol)
2. [Architecture Overview](#architecture-overview)
3. [Lexicon Designs](#lexicon-designs)
4. [Smart Contract Bridge](#smart-contract-bridge)
5. [Implementation Phases](#implementation-phases)
6. [Benefits & Trade-offs](#benefits--trade-offs)
7. [Open Questions](#open-questions)
8. [Technical References](#technical-references)

---

## Why AT Protocol?

### Current Tana System

- **Identity:** Ed25519 keypairs, custom usernames (`@alice`)
- **Auth:** Custom QR-based authentication flow
- **Data:** Centralized in Tana's database
- **User Base:** Starting from zero

### What AT Protocol Offers

- **10M+ existing users** from Bluesky
- **Decentralized identity** (DIDs) that users own
- **Portable data** - users can switch PDS providers
- **Federation** - interoperability with Bluesky apps
- **OAuth-like auth** - familiar "Sign in with Bluesky" flow

### The Vision

Users authenticate with their Bluesky account, their commerce profile and product listings live in their Personal Data Server (PDS), but all financial transactions happen on Tana's blockchain. This separates concerns perfectly:

- **Social/commerce metadata** → User controls (can migrate)
- **Financial truth** → Blockchain controls (immutable, public)

---

## Architecture Overview

### Two-Layer Model

```
┌─────────────────────────────────────────────────────────────┐
│                    AT PROTOCOL LAYER                        │
│              (Portable, User-Controlled)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User's PDS (at://did:plc:alice456/)                       │
│  ├─ com.tana.profile        → Profile, shop settings       │
│  ├─ com.tana.product        → Product listings             │
│  ├─ com.tana.invoice.draft  → Unpaid invoices              │
│  ├─ com.tana.review         → Reviews written              │
│  ├─ com.tana.message        → DMs with merchants/buyers    │
│  └─ app.bsky.feed.post      → Social posts                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              ↕
                    Identity Bridge (DID ↔ Public Key)
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                   BLOCKCHAIN LAYER                          │
│              (Immutable, Public Truth)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tana Blockchain (ledger.tana.network)                     │
│  ├─ Blocks              → Sequential, signed by validators  │
│  ├─ Transactions        → All transfers, confirmed          │
│  ├─ Balances            → Derived from transactions         │
│  ├─ Smart Contracts     → TypeScript execution + state      │
│  └─ Validators          → Consensus participants            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Identity Bridge

**Database Schema:**
```sql
-- In blockchain database (users table)
users {
  publicKey: '0xabc123...',     -- Ed25519 public key
  did: 'did:plc:alice456',      -- AT Protocol DID (NEW FIELD)
  username: 'alice',
  nonce: 42,
  stateHash: '0xdef...'
}
```

**Bidirectional Mapping:**
```typescript
// DID → Blockchain address
GET /xrpc/com.tana.ledger.resolveDidToAddress?did=did:plc:alice456
→ { blockchainAddress: '0xabc123...' }

// Blockchain address → DID
GET /xrpc/com.tana.ledger.resolveAddressToDid?address=0xabc123
→ { did: 'did:plc:alice456' }
```

---

## Lexicon Designs

### Philosophy

Lexicons are **API schemas**, not storage formats. Both layers use Lexicon-compliant APIs:

- **PDS Lexicons** → Data stored in MST (Merkle Search Tree)
- **Ledger Lexicons** → Data stored on blockchain (PostgreSQL + blocks)

Same interface, different guarantees.

### PDS Lexicons (Portable User Data)

#### `com.tana.profile`

User's commerce profile with shop settings:

```json
{
  "lexicon": 1,
  "id": "com.tana.profile",
  "defs": {
    "main": {
      "type": "record",
      "key": "self",
      "record": {
        "type": "object",
        "required": ["blockchainAddress", "displayName"],
        "properties": {
          "blockchainAddress": {
            "type": "string",
            "description": "Ed25519 public key on Tana blockchain"
          },
          "displayName": {"type": "string"},
          "bio": {"type": "string"},
          "avatar": {"type": "blob"},
          "shopSettings": {
            "type": "object",
            "properties": {
              "shopName": {"type": "string"},
              "acceptedCurrencies": {"type": "array"},
              "businessHours": {"type": "string"}
            }
          }
        }
      }
    }
  }
}
```

**Example URI:** `at://did:plc:bob123/com.tana.profile/self`

#### `com.tana.product`

Product listings in merchant's PDS:

```json
{
  "lexicon": 1,
  "id": "com.tana.product",
  "defs": {
    "main": {
      "type": "record",
      "key": "tid",
      "record": {
        "type": "object",
        "required": ["name", "price", "currencyCode"],
        "properties": {
          "name": {"type": "string"},
          "description": {"type": "string"},
          "images": {"type": "array", "items": {"type": "blob"}},
          "price": {"type": "string"},
          "currencyCode": {"type": "string"},
          "category": {"type": "string"},
          "inventory": {"type": "integer"}
        }
      }
    }
  }
}
```

**Example URI:** `at://did:plc:bob123/com.tana.product/coffee-beans-123`

#### `com.tana.invoice.draft`

Unpaid invoices (moves to blockchain when paid):

```json
{
  "lexicon": 1,
  "id": "com.tana.invoice.draft",
  "defs": {
    "main": {
      "type": "record",
      "key": "tid",
      "record": {
        "type": "object",
        "required": ["to", "amount", "currencyCode", "status"],
        "properties": {
          "to": {"type": "string", "format": "did"},
          "amount": {"type": "string"},
          "currencyCode": {"type": "string"},
          "description": {"type": "string"},
          "lineItems": {"type": "array"},
          "status": {
            "type": "string",
            "enum": ["draft", "sent", "paid", "cancelled"]
          },
          "blockchainTxHash": {
            "type": "string",
            "description": "Set when paid"
          }
        }
      }
    }
  }
}
```

**Lifecycle:**
1. Merchant creates invoice in PDS (`status: "draft"`)
2. Merchant sends to customer (`status: "sent"`)
3. Customer pays via blockchain transaction
4. Invoice updated with `blockchainTxHash` (`status: "paid"`)

#### `com.tana.review`

Reviews with verified purchase proof:

```json
{
  "lexicon": 1,
  "id": "com.tana.review",
  "defs": {
    "main": {
      "type": "record",
      "key": "tid",
      "record": {
        "type": "object",
        "required": ["subject", "rating", "text"],
        "properties": {
          "subject": {
            "type": "union",
            "refs": ["#productSubject", "#merchantSubject"]
          },
          "rating": {"type": "integer", "minimum": 1, "maximum": 5},
          "text": {"type": "string"},
          "verifiedPurchase": {"type": "boolean"},
          "blockchainTxHash": {
            "type": "string",
            "description": "Proof of purchase from blockchain"
          }
        }
      }
    }
  }
}
```

**Example:** Review with verified purchase badge via blockchain transaction reference.

---

### Ledger Lexicons (Blockchain Queries)

These are **procedures and queries**, not records. Data lives on blockchain.

#### `com.tana.ledger.getBalance`

Query blockchain for balance:

```json
{
  "lexicon": 1,
  "id": "com.tana.ledger.getBalance",
  "defs": {
    "main": {
      "type": "query",
      "parameters": {
        "type": "params",
        "required": ["address", "currencyCode"],
        "properties": {
          "address": {
            "type": "string",
            "description": "Ed25519 public key or DID"
          },
          "currencyCode": {"type": "string"}
        }
      },
      "output": {
        "encoding": "application/json",
        "schema": {
          "type": "object",
          "properties": {
            "address": {"type": "string"},
            "currencyCode": {"type": "string"},
            "amount": {"type": "string"},
            "locked": {"type": "string"},
            "blockHeight": {"type": "integer"}
          }
        }
      }
    }
  }
}
```

**Usage:**
```typescript
GET /xrpc/com.tana.ledger.getBalance?address=did:plc:alice&currencyCode=USD
→ { amount: "95.00", locked: "5.00", blockHeight: 12345 }
```

#### `com.tana.ledger.submitTransaction`

Submit signed transaction to blockchain:

```json
{
  "lexicon": 1,
  "id": "com.tana.ledger.submitTransaction",
  "defs": {
    "main": {
      "type": "procedure",
      "input": {
        "encoding": "application/json",
        "schema": {
          "type": "object",
          "required": ["transaction", "signature"],
          "properties": {
            "transaction": {
              "type": "object",
              "required": ["from", "to", "amount", "currencyCode", "nonce"]
            },
            "signature": {"type": "string"}
          }
        }
      },
      "output": {
        "encoding": "application/json",
        "schema": {
          "type": "object",
          "properties": {
            "txHash": {"type": "string"},
            "status": {"type": "string"},
            "blockHeight": {"type": "integer"}
          }
        }
      }
    }
  }
}
```

#### `com.tana.ledger.listTransactions`

Query transaction history:

```json
{
  "lexicon": 1,
  "id": "com.tana.ledger.listTransactions",
  "defs": {
    "main": {
      "type": "query",
      "parameters": {
        "type": "params",
        "required": ["address"],
        "properties": {
          "address": {"type": "string"},
          "limit": {"type": "integer", "default": 50},
          "cursor": {"type": "string"}
        }
      },
      "output": {
        "encoding": "application/json",
        "schema": {
          "type": "object",
          "properties": {
            "transactions": {"type": "array"},
            "cursor": {"type": "string"}
          }
        }
      }
    }
  }
}
```

---

## Smart Contract Bridge

### Runtime APIs

Smart contracts can access **both layers**:

#### Blockchain APIs (`tana/block`)

```typescript
import { block } from 'tana/block'

// Query blockchain state
const user = await block.getUser(userId)
const balance = await block.getBalance(userId, 'USD')
const tx = await block.getTransaction(txHash)
const userByDid = await block.getUserByDid('did:plc:alice456')
```

#### AT Protocol APIs (`tana/atproto`)

```typescript
import { atproto } from 'tana/atproto'

// Query PDS data
const invoice = await atproto.getRecord('at://did:plc:bob/com.tana.invoice.draft/xyz')
const products = await atproto.listRecords({
  repo: 'did:plc:bob',
  collection: 'com.tana.product',
  limit: 20
})

// Create records in user's PDS
const reviewUri = await atproto.createRecord({
  repo: caller.did,
  collection: 'com.tana.review',
  record: {
    subject: { productUri: '...' },
    rating: 5,
    verifiedPurchase: true,
    blockchainTxHash: txHash
  }
})
```

### Example: Invoice Payment Contract

This contract bridges both layers:

```typescript
/**
 * invoice-payment.ts
 *
 * 1. Customer provides invoice URI from merchant's PDS
 * 2. Contract fetches invoice from AT Protocol
 * 3. Contract executes transfer on blockchain
 * 4. Returns txHash for merchant to update invoice
 */

import { console } from 'tana/core'
import { context } from 'tana/context'
import { block } from 'tana/block'
import { atproto } from 'tana/atproto'

export async function contract() {
  const input = context.input()
  const { invoiceUri } = input // at://did:plc:merchant/com.tana.invoice.draft/xyz
  const caller = context.caller()

  console.log(`💳 Processing invoice payment`)

  // 1. Fetch invoice from AT Protocol PDS
  const invoice = await atproto.getRecord(invoiceUri)

  if (!invoice || invoice.status !== 'sent') {
    return { error: 'Invoice not found or not ready for payment' }
  }

  // 2. Verify caller is the invoice recipient
  if (caller.did !== invoice.to) {
    return { error: 'Only invoice recipient can pay' }
  }

  // 3. Resolve merchant DID to blockchain address
  const merchantDid = atproto.parseUri(invoiceUri).repo
  const merchantUser = await block.getUserByDid(merchantDid)

  // 4. Check customer balance (blockchain)
  const balance = await block.getBalance(caller.id, invoice.currencyCode)
  if (parseFloat(balance.amount) < parseFloat(invoice.amount)) {
    return { error: 'Insufficient balance' }
  }

  // 5. Calculate new balances
  const newCustomerBalance = (
    parseFloat(balance.amount) - parseFloat(invoice.amount)
  ).toFixed(8)

  const merchantBalance = await block.getBalance(
    merchantUser.id,
    invoice.currencyCode
  )
  const newMerchantBalance = (
    parseFloat(merchantBalance?.amount || '0') + parseFloat(invoice.amount)
  ).toFixed(8)

  // 6. Return state changes for blockchain to apply
  return {
    success: true,
    invoiceUri, // Merchant uses this to update invoice status
    balanceUpdates: [
      {
        userId: caller.id,
        currencyCode: invoice.currencyCode,
        oldAmount: balance.amount,
        newAmount: newCustomerBalance,
        operation: 'debit'
      },
      {
        userId: merchantUser.id,
        currencyCode: invoice.currencyCode,
        oldAmount: merchantBalance?.amount || '0',
        newAmount: newMerchantBalance,
        operation: 'credit'
      }
    ],
    metadata: {
      invoiceUri,
      lineItems: invoice.lineItems,
      description: invoice.description
    }
  }
}
```

**What this enables:**
- Invoices live in merchant's PDS (portable)
- Payment happens on blockchain (immutable)
- Contract bridges both worlds seamlessly

---

## Implementation Phases

### Phase 1: Auth-Only Integration (2-3 days) ⭐ **Quickest Value**

**Goal:** Replace custom QR auth with Bluesky OAuth

**Changes:**
```typescript
// services/identity/src/api/routes/bluesky-auth.ts
app.get('/bluesky/authorize', (c) => {
  // Redirect to Bluesky OAuth
})

app.get('/bluesky/callback', async (c) => {
  const { code } = c.req.query()

  // Exchange code for access token
  const { access_token, did } = await exchangeCodeForToken(code)

  // Resolve DID to get profile
  const profile = await resolveDID(did)

  // Create or update user in blockchain
  const user = await createOrUpdateUser({
    did,
    blueskyHandle: profile.handle,
    displayName: profile.displayName,
    publicKey: generateEd25519Key() // Generate blockchain key
  })

  // Issue Tana session token
  const sessionToken = await createSessionToken(user.id)

  return c.redirect(`/dashboard?token=${sessionToken}`)
})
```

**Database migration:**
```sql
ALTER TABLE users ADD COLUMN did TEXT UNIQUE;
ALTER TABLE users ADD COLUMN bluesky_handle TEXT;
```

**Benefits:**
- ✅ Instant access to Bluesky's 10M+ users
- ✅ No mobile app needed
- ✅ Familiar "Sign in with Bluesky" flow
- ✅ Minimal changes to ledger

---

### Phase 2: Identity Bridging (1 week)

**Goal:** Map Bluesky identity to blockchain identity

**Schema:**
```typescript
users {
  did: "did:plc:abc123",              // Bluesky DID (canonical)
  blueskyHandle: "@alice.bsky.social", // AT Protocol handle
  publicKey: "ed25519_...",            // Blockchain key
  blueskyKey: "secp256k1_...",         // Bluesky key (optional)
  username: "alice",                   // Tana username
}
```

**Features:**
- Sync profile data (avatar, bio) from Bluesky
- Support both Bluesky handle and custom handle
- DID resolution endpoints

---

### Phase 3: Lexicon API Layer (2-3 weeks)

**Goal:** Implement Lexicon-compliant APIs for ledger

**Files to create:**
```
services/ledger/src/api/routes/xrpc/
├── getBalance.ts
├── getTransaction.ts
├── listTransactions.ts
├── submitTransaction.ts
├── deployContract.ts
└── resolveDidToAddress.ts
```

**Example implementation:**
```typescript
// services/ledger/src/api/routes/xrpc/getBalance.ts
app.get('/xrpc/com.tana.ledger.getBalance', async (c) => {
  let { address, currencyCode } = c.req.query()

  // Resolve DID to blockchain address if needed
  if (address.startsWith('did:')) {
    const user = await db.query.users.findFirst({
      where: eq(users.did, address)
    })
    address = user.publicKey
  }

  // Query balance from blockchain
  const balance = await db.query.balances.findFirst({
    where: and(
      eq(balances.publicKey, address),
      eq(balances.currencyCode, currencyCode)
    )
  })

  return c.json({
    address,
    currencyCode,
    amount: balance?.amount || '0.00',
    blockHeight: await getCurrentBlockHeight()
  })
})
```

**Benefits:**
- Unified API surface
- Compatible with AT Protocol tooling
- Self-documenting (Lexicon schemas)

---

### Phase 4: PDS Integration (3-4 weeks)

**Goal:** Support AT Protocol records for commerce metadata

**Option A: Run your own PDS**
```bash
# Deploy Bluesky PDS for Tana users
git clone https://github.com/bluesky-social/pds
# Configure for tana.network domain
# Add custom Lexicons (com.tana.*)
```

**Option B: Use existing PDSs**
- Users keep their Bluesky PDS
- Tana creates commerce records in their existing repo
- More decentralized, less control

**Lexicons to implement:**
- `com.tana.profile` ✓
- `com.tana.product` ✓
- `com.tana.invoice.draft` ✓
- `com.tana.review` ✓
- `com.tana.message` ✓

---

### Phase 5: Smart Contract Bridge (2-3 weeks)

**Goal:** Enable contracts to query AT Protocol data

**Runtime additions:**
```typescript
// services/ledger/src/runtime/atproto.ts
export const atprotoAPI = {
  async getRecord(uri: string) {
    const { repo, collection, rkey } = parseAtUri(uri)
    const pdsUrl = await resolveDIDtoPDS(repo)

    const response = await fetch(
      `${pdsUrl}/xrpc/com.atproto.repo.getRecord?repo=${repo}&collection=${collection}&rkey=${rkey}`
    )

    return response.json()
  },

  async createRecord({ repo, collection, record }) {
    // Requires user's PDS auth token
    // Contract execution context must have this
  }
}
```

**Inject into contract runtime:**
```typescript
// services/ledger/src/contracts/runtime.ts
const contractGlobals = {
  console: consoleAPI,
  context: contextAPI,
  block: blockAPI,
  storage: storageAPI,
  atproto: atprotoAPI // NEW
}
```

---

### Phase 6: Full Federation (Optional, 4+ weeks)

**Goal:** Participate fully in AT Protocol federation

**Requirements:**
- Implement PDS interface completely
- Support data portability (user can migrate)
- Implement AppView for Tana-specific feeds
- Support firehose subscriptions

**Benefits:**
- True decentralization
- Users fully own their data
- Interop with entire Bluesky ecosystem

**Trade-offs:**
- Significant engineering effort
- Less control over user experience
- Privacy considerations (public data)

---

## Benefits & Trade-offs

### Benefits

#### User Acquisition
- ✅ **10M+ potential users** from Bluesky
- ✅ **No onboarding friction** - users already have accounts
- ✅ **Familiar auth flow** - "Sign in with Bluesky"

#### Data Ownership
- ✅ **Users control metadata** - can switch PDS providers
- ✅ **Portable commerce profiles** - not locked to Tana
- ✅ **Censorship resistant** - no single point of control

#### Developer Experience
- ✅ **Unified API** - Lexicons for both layers
- ✅ **Standard tooling** - AT Protocol SDK
- ✅ **Self-documenting** - Lexicon schemas

#### Interoperability
- ✅ **Bluesky integration** - commerce posts in social feeds
- ✅ **Third-party apps** - others can build on Tana data
- ✅ **Composability** - new apps can use your ledger

---

### Trade-offs

#### Complexity
- ⚠️ **Two identity systems** - DID + blockchain address
- ⚠️ **Key management** - secp256k1 (Bluesky) + Ed25519 (blockchain)
- ⚠️ **Data synchronization** - PDS updates ↔ blockchain events

#### Privacy
- ⚠️ **Transaction amounts public** - unless using ZK proofs
- ⚠️ **Limited privacy controls** - AT Protocol is designed for public data
- ⚠️ **Metadata leakage** - social graph visible

#### Dependencies
- ⚠️ **External PDS reliability** - if using existing PDSs
- ⚠️ **DID resolution** - relies on Bluesky infrastructure
- ⚠️ **Protocol changes** - AT Protocol still evolving

#### Performance
- ⚠️ **Cross-layer queries** - contracts querying PDSs add latency
- ⚠️ **Network requests** - fetching AT Protocol data is slower than local DB
- ⚠️ **Caching complexity** - need to cache PDS responses

---

## Open Questions

### 1. Cryptography

**Question:** Should we support both key types or migrate to one?

**Options:**
- **Option A:** Dual keys (secp256k1 for AT Protocol, Ed25519 for blockchain)
- **Option B:** Migrate blockchain to secp256k1 (more work)
- **Option C:** Use Bluesky key for auth only, separate blockchain key

**Recommendation:** Start with Option C (Phase 1), evaluate later.

---

### 2. Privacy

**Question:** Should transaction amounts be public or encrypted?

**Options:**
- **Public (like Bitcoin):** Fully auditable, transparent
- **Encrypted:** Better privacy, but limits blockchain queries
- **Hybrid:** Public balances, encrypted transaction details

**Considerations:**
- Commerce transparency vs user privacy
- Regulatory compliance (KYC/AML)
- Technical complexity of ZK proofs

---

### 3. PDS Hosting

**Question:** Should Tana run its own PDS or use existing ones?

**Options:**
- **Run own PDS:**
  - ✅ Full control
  - ✅ Better performance
  - ⚠️ More infrastructure
  - ⚠️ Centralization risk

- **Use existing PDSs:**
  - ✅ More decentralized
  - ✅ Less infrastructure
  - ⚠️ Depends on third parties
  - ⚠️ Privacy concerns

**Recommendation:** Start with Option 1 (own PDS), support Option 2 later.

---

### 4. Smart Contract Data Access

**Question:** How should contracts access PDS data securely?

**Challenges:**
- Contracts run on validators, not user devices
- PDS data may require authentication
- Network requests add latency/unpredictability

**Potential Solutions:**
- Only allow reading public PDS records
- Require users to include PDS data in transaction input
- Use oracles for off-chain data

---

### 5. Consensus & Finality

**Question:** How do we handle double-spends in a federated environment?

**Considerations:**
- Blockchain provides finality
- But PDS updates are eventually consistent
- Need to prevent invoice double-payment

**Recommendation:**
- Blockchain is source of truth for payments
- Invoice status in PDS is metadata only
- Contracts verify blockchain state, not PDS state

---

## Technical References

### AT Protocol Documentation
- **Specs:** https://atproto.com/specs/overview
- **Lexicon Guide:** https://atproto.com/specs/lexicon
- **OAuth Guide:** https://docs.bsky.app/docs/advanced-guides/oauth-client
- **DID Resolution:** https://atproto.com/specs/did

### Bluesky Resources
- **API Docs:** https://docs.bsky.app/
- **PDS Repo:** https://github.com/bluesky-social/pds
- **SDK:** `@atproto/api` npm package

### Tana Resources
- **Current Architecture:** [ARCHITECTURE.md](./ARCHITECTURE.md)
- **MVP Status:** [MVP-STATUS.md](./MVP-STATUS.md)
- **Genesis Setup:** [GENESIS.md](./GENESIS.md)

---

## Next Steps

### Immediate Actions

1. **Prototype Phase 1** (Auth-only integration)
   - Set up Bluesky OAuth credentials
   - Implement callback handler
   - Test with real Bluesky accounts

2. **Design Lexicon Schemas**
   - Finalize `com.tana.*` Lexicons
   - Submit to AT Protocol Lexicon registry
   - Get community feedback

3. **Proof of Concept Contract**
   - Build invoice payment contract
   - Test bridging PDS + blockchain
   - Measure performance

### Long-term Roadmap

- **Q1 2026:** Phase 1-2 (Auth + Identity bridging)
- **Q2 2026:** Phase 3-4 (Lexicon APIs + PDS integration)
- **Q3 2026:** Phase 5 (Smart contract bridge)
- **Q4 2026:** Phase 6 (Full federation) - optional

---

## Conclusion

Integrating AT Protocol with Tana's blockchain creates a **powerful hybrid system** that combines:

- **Immutable financial truth** (blockchain)
- **Portable social identity** (AT Protocol)
- **User data ownership** (PDS)
- **Decentralized commerce** (Lexicons + smart contracts)

The two-layer architecture cleanly separates concerns while enabling seamless interaction through smart contracts that bridge both worlds.

**Recommended approach:** Start with Phase 1 (auth-only) for immediate value, then evaluate user adoption before committing to full federation.

---

**Document Status:** Living document, will be updated as design evolves
**Last Updated:** November 22, 2025
**Contributors:** Built with Claude Code (Anthropic)
