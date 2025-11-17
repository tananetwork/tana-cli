# Service Auth Tokens (SAT)

JWT-like authentication for inter-service communication using Ed25519 signatures.

## Features

- ✅ Ed25519 cryptographic signatures (no shared secrets)
- ✅ Service key registry (in-memory pub key storage)
- ✅ Token expiration (default: 1 hour)
- ✅ Hono middleware for easy integration
- ✅ Timestamp validation (replay attack protection)

## Installation

```bash
bun add @tana/service-auth
```

## Usage

### Generate a Token

```typescript
import { generateToken, encodeToken } from '@tana/service-auth'

// Load service private key
const privateKey = 'ed25519_...'

// Generate token
const token = await generateToken(
  'ledger',           // serviceId
  'validator-1',      // nodeId
  privateKey,
  { action: 'write' } // optional payload
)

// Encode for HTTP header
const authHeader = encodeToken(token)
// "Bearer eyJ0eXAiOiJKV1QiLCJhbG..."

// Send request
await fetch('http://t4:8180/content/abc123', {
  method: 'PUT',
  headers: { 'Authorization': authHeader },
  body: data
})
```

### Verify a Token (Hono middleware)

```typescript
import { Hono } from 'hono'
import { serviceAuth, ServiceKeyRegistry } from '@tana/service-auth'

const app = new Hono()

// Create registry and register known services
const registry = new ServiceKeyRegistry()
registry.register('ledger', 'validator-1', 'ed25519_...')
registry.register('mesh', 'validator-1', 'ed25519_...')

// Protect all /content/* endpoints
app.use('/content/*', serviceAuth(registry))

// Only ledger can write
app.put('/content/:hash', requireService('ledger'), async (c) => {
  const auth = getAuthContext(c)
  console.log(`Write from ${auth.serviceId} @ ${auth.nodeId}`)
  // ...
})

// Anyone can read
app.get('/content/:hash', async (c) => {
  // ...
})
```

### Health Checks (Optional Auth)

```typescript
// Allow health checks without auth
app.get('/health', serviceAuth(registry, { optional: true }), async (c) => {
  return c.json({ status: 'ok' })
})
```

### Service-Specific Endpoints

```typescript
import { requireService } from '@tana/service-auth'

// Only mesh service can call this
app.post('/internal/sync',
  serviceAuth(registry),
  requireService('mesh'),
  async (c) => {
    // ...
  }
)
```

## API Reference

### `generateToken(serviceId, nodeId, privateKey, payload?, ttl?)`

Generate a service auth token.

**Parameters:**
- `serviceId`: Service identifier ('ledger', 't4', 'mesh', etc.)
- `nodeId`: Node identifier
- `privateKey`: Ed25519 private key (hex)
- `payload`: Optional payload data
- `ttl`: Time-to-live in milliseconds (default: 3600000 = 1 hour)

**Returns:** `ServiceAuthToken`

### `verifyToken(token, publicKey)`

Verify a token's signature and expiry.

**Parameters:**
- `token`: Service auth token
- `publicKey`: Ed25519 public key (hex)

**Returns:** `Promise<boolean>`

### `encodeToken(token)` / `decodeToken(authHeader)`

Encode/decode tokens for HTTP headers.

### `ServiceKeyRegistry`

In-memory registry for service public keys.

**Methods:**
- `register(serviceId, nodeId, publicKey)`: Add a service
- `get(serviceId, nodeId)`: Get public key
- `has(serviceId, nodeId)`: Check if registered
- `remove(serviceId, nodeId)`: Remove a service
- `all()`: Get all registered services
- `clear()`: Clear all keys

### Middleware

- `serviceAuth(registry, options?)`: Hono middleware for SAT verification
- `requireService(...serviceIds)`: Require specific service IDs
- `requireNode(nodeId)`: Require specific node ID
- `getAuthContext(c)`: Get auth context from Hono context

## Security

- Tokens expire after 1 hour by default
- Timestamp validation prevents replay attacks (1-minute tolerance)
- Ed25519 signatures provide 128-bit security
- No shared secrets - each service has unique keypair
- Public key registry allows verification without database queries

## Integration Pattern

For a multi-validator mesh network:

1. **On registration**: Each node generates service keypairs (ledger, t4, mesh)
2. **On approval**: Sovereign adds service public keys to mesh database
3. **On startup**: Each service loads its private key + fetches peer public keys
4. **On request**: Caller generates token with private key
5. **On verification**: Receiver checks signature with public key from registry

This ensures only approved services can communicate within the mesh.
