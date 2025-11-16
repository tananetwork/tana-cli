# Tana Identity Service

Production-ready QR code authentication backend for the Tana blockchain project.

## Overview

This service provides mobile-first authentication where users scan QR codes with their mobile app (similar to WhatsApp Web). The mobile app holds Ed25519 private keys and signs challenges - desktop/web browsers never see the private keys.

## Features

- QR Code-based authentication flow
- Ed25519 cryptographic signature verification
- Real-time status updates via Server-Sent Events (SSE)
- Session token management (24-hour expiration)
- Automatic session cleanup (5-minute QR code expiration)
- Type-safe database schema with Drizzle ORM
- Built with Hono (fast, lightweight web framework)

## Architecture

```
Desktop/Web          Mobile App          Identity Service
    |                    |                      |
    | 1. Create Session  |                      |
    |-------------------------------------------->|
    |<--------------------------------------------| (returns QR data)
    |                    |                      |
    | 2. Display QR      |                      |
    | 3. Listen SSE ------>                      |
    |                    |                      |
    |                    | 4. Scan QR           |
    |                    |---------------------->|
    |<-------------------|                      | (SSE: scanned)
    |                    |                      |
    |                    | 5. Sign & Approve    |
    |                    |---------------------->|
    |<-------------------|                      | (SSE: approved + token)
    |                    |                      |
    | 6. Use token       |                      |
    |-------------------------------------------->|
    |<--------------------------------------------| (verify & respond)
```

## Quick Start

### 1. Install Dependencies

```bash
cd cli/services/identity
bun install
```

### 2. Set Environment Variables

```bash
export DATABASE_URL='postgres://tana:tana_dev_password@localhost:5432/tana'
export PORT=8090
```

### 3. Apply Database Migrations

The auth_sessions table already exists in the ledger database, so migrations are optional. If starting fresh:

```bash
bun run migration:apply
```

### 4. Start the Service

```bash
# Development mode with hot reload
bun run dev

# Production mode
bun run start
```

The service will start on `http://localhost:8090`

### 5. Test the Service

```bash
# Run the full authentication flow test
bun test-auth-flow.ts
```

## API Endpoints

### POST /auth/session/create

Create a new authentication session and get QR code data.

**Request:**
```bash
curl -X POST http://localhost:8090/auth/session/create \
  -H "Content-Type: application/json" \
  -d '{
    "appName": "My App",
    "returnUrl": "https://myapp.com/dashboard"
  }'
```

**Response:**
```json
{
  "sessionId": "sess_abc123xyz",
  "challenge": "66e2b4b7f82dcfb8431fadc51121fd75...",
  "qrData": {
    "protocol": "tana",
    "type": "auth",
    "version": "1",
    "sessionId": "sess_abc123xyz",
    "challenge": "66e2b4b7f82dcfb8431fadc51121fd75...",
    "server": "http://localhost:8090",
    "appName": "My App",
    "appIcon": null
  },
  "expiresIn": 300,
  "expiresAt": "2025-11-14T23:48:31.671Z"
}
```

### GET /auth/session/:id/events

Server-Sent Events stream for real-time session status updates.

**Request:**
```bash
curl -N http://localhost:8090/auth/session/sess_abc123xyz/events
```

**Response (SSE stream):**
```
data: {"type":"connected","sessionId":"sess_abc123xyz","timestamp":"2025-11-14T23:43:31.671Z"}

data: {"type":"status_update","sessionId":"sess_abc123xyz","status":"scanned","timestamp":"2025-11-14T23:43:35.123Z"}

data: {"type":"approved","sessionId":"sess_abc123xyz","status":"approved","sessionToken":"40a3d8e43ec271deee...","userId":"550e8400-e29b-41d4-a716-446655440000","username":"alice","timestamp":"2025-11-14T23:43:37.456Z"}
```

### GET /auth/session/:id

Get session details (without sensitive data).

**Request:**
```bash
curl http://localhost:8090/auth/session/sess_abc123xyz
```

**Response:**
```json
{
  "sessionId": "sess_abc123xyz",
  "status": "waiting",
  "appName": "My App",
  "appIcon": null,
  "createdAt": "2025-11-14T23:43:31.671Z",
  "expiresAt": "2025-11-14T23:48:31.671Z"
}
```

### POST /auth/session/:id/scan

Mark session as scanned (called when mobile app opens QR code).

**Request:**
```bash
curl -X POST http://localhost:8090/auth/session/sess_abc123xyz/scan
```

**Response:**
```json
{
  "success": true,
  "sessionId": "sess_abc123xyz",
  "challenge": "66e2b4b7f82dcfb8431fadc51121fd75...",
  "appName": "My App"
}
```

### POST /auth/session/:id/approve

Approve session with signed credentials from mobile app.

**Request:**
```bash
curl -X POST http://localhost:8090/auth/session/sess_abc123xyz/approve \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "username": "alice",
    "publicKey": "ed25519_17956be6b8d4af0841d05ee4099a2f6f19a11a733b059f13998b6eff4b2d5660",
    "signature": "ed25519_8e37f97007de1646e1a2fae880511461b853772c6e095af777afd1178d8193993b709957ec006e51dd7fc9c734cef2d2c35b2d714f223469638aaf30c63caa0a",
    "message": "{\"sessionId\":\"sess_abc123xyz\",\"challenge\":\"66e2b4b7f82dcfb8431fadc51121fd75...\",\"userId\":\"550e8400-e29b-41d4-a716-446655440000\",\"username\":\"alice\",\"timestamp\":1763164237675}"
  }'
```

**Response:**
```json
{
  "success": true,
  "sessionToken": "aaaeb5dee9532f61427af51d63e560ab67c0624ca355563038372edea2910b0b",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "alice"
}
```

### POST /auth/session/:id/reject

Reject session (user denied authentication).

**Request:**
```bash
curl -X POST http://localhost:8090/auth/session/sess_abc123xyz/reject \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "User cancelled"
  }'
```

**Response:**
```json
{
  "success": true
}
```

### GET /auth/session/verify

Verify a session token and return user info.

**Request:**
```bash
curl http://localhost:8090/auth/session/verify \
  -H "Authorization: Bearer aaaeb5dee9532f61427af51d63e560ab67c0624ca355563038372edea2910b0b"
```

**Response:**
```json
{
  "valid": true,
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "username": "alice",
  "publicKey": "ed25519_17956be6b8d4af0841d05ee4099a2f6f19a11a733b059f13998b6eff4b2d5660",
  "expiresAt": "2025-11-15T23:50:37.708Z"
}
```

## Authentication Flow Details

### 1. Desktop/Web Creates Session

The desktop/web application creates a session and displays the QR code data:

```javascript
const response = await fetch('http://localhost:8090/auth/session/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    appName: 'My App',
    returnUrl: 'https://myapp.com/dashboard',
  }),
})

const { qrData, sessionId } = await response.json()
// Display qrData as QR code
// Open SSE connection to listen for approval
```

### 2. Desktop/Web Listens for Updates

```javascript
const eventSource = new EventSource(
  `http://localhost:8090/auth/session/${sessionId}/events`
)

eventSource.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)
  
  if (data.type === 'approved') {
    // Store the session token
    localStorage.setItem('sessionToken', data.sessionToken)
    // Redirect to app
    window.location.href = returnUrl
  }
})
```

### 3. Mobile App Scans QR Code

The mobile app extracts the session ID and challenge from the QR code, then:

```javascript
// Notify that QR was scanned
await fetch(`http://localhost:8090/auth/session/${sessionId}/scan`, {
  method: 'POST',
})
```

### 4. Mobile App Signs and Approves

```javascript
// Create message to sign
const message = JSON.stringify({
  sessionId,
  challenge,
  userId: user.id,
  username: user.username,
  timestamp: Date.now(),
})

// Sign with Ed25519 private key (kept secure on mobile device)
const signature = await signMessage(message, privateKey)

// Approve the session
const response = await fetch(`http://localhost:8090/auth/session/${sessionId}/approve`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: user.id,
    username: user.username,
    publicKey: user.publicKey,
    signature,
    message,
  }),
})

const { sessionToken } = await response.json()
```

### 5. Using the Session Token

Once authenticated, use the session token for API requests:

```javascript
const response = await fetch('http://localhost:8090/api/protected-route', {
  headers: {
    'Authorization': `Bearer ${sessionToken}`,
  },
})
```

## Security Considerations

1. **Private Keys Never Leave Mobile Device**: Desktop/web never sees the Ed25519 private key
2. **Challenge-Response**: Each session has a unique challenge to prevent replay attacks
3. **Timestamp Validation**: Signed messages must be recent (within 5 minutes)
4. **Session Expiration**: 
   - QR codes expire after 5 minutes
   - Session tokens expire after 24 hours
5. **Signature Verification**: All approvals are cryptographically verified with Ed25519
6. **HTTPS Required**: In production, use HTTPS to prevent MITM attacks

## Database Schema

The service uses a single table `auth_sessions`:

```sql
CREATE TABLE auth_sessions (
  id TEXT PRIMARY KEY,                    -- sess_xxxxx
  challenge TEXT NOT NULL UNIQUE,         -- Random 32-byte hex
  status auth_session_status NOT NULL,    -- waiting, scanned, approved, rejected, expired
  
  -- User info (after approval)
  user_id TEXT,
  username TEXT,
  public_key TEXT,
  
  -- Session token
  session_token TEXT UNIQUE,
  
  -- App info
  return_url TEXT NOT NULL,
  app_name TEXT,
  app_icon TEXT,
  
  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  approved_at TIMESTAMP,
  scanned_at TIMESTAMP
);
```

## File Structure

```
cli/services/identity/
├── src/
│   ├── index.ts                 # Main server entry point
│   ├── db/
│   │   ├── index.ts             # Database connection
│   │   └── schema.ts            # Drizzle ORM schema
│   ├── api/
│   │   └── routes/
│   │       └── auth.ts          # Authentication endpoints
│   ├── auth/
│   │   ├── session.ts           # Session management logic
│   │   └── crypto.ts            # Ed25519 verification
│   ├── utils/
│   │   └── sse.ts               # Server-Sent Events helpers
│   └── scripts/
│       └── apply-migrations.ts  # Migration script
├── migrations/
│   └── 0001_auth_sessions.sql   # Database schema
├── package.json
├── tsconfig.json
├── drizzle.config.ts
├── test-auth-flow.ts            # Full flow test
├── generate-keypair.ts          # Test keypair generator
└── README.md
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgres://tana:tana_dev_password@localhost:5432/tana` | PostgreSQL connection string |
| `IDENTITY_DB_URL` | Same as DATABASE_URL | Alternative DB URL variable |
| `PORT` | `8090` | HTTP server port |
| `IDENTITY_PORT` | Same as PORT | Alternative port variable |

## Production Deployment

### 1. Use Production Database

```bash
export DATABASE_URL='postgresql://user:pass@prod-db.example.com:5432/tana'
```

### 2. Enable HTTPS

Use a reverse proxy (Nginx, Caddy) or deploy to a platform with automatic HTTPS:

```nginx
server {
  listen 443 ssl;
  server_name auth.tana.network;
  
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;
  
  location / {
    proxy_pass http://localhost:8090;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### 3. Multi-Instance Deployment

For multi-instance deployments, replace the in-memory EventEmitter with Redis Pub/Sub in `src/utils/sse.ts`:

```typescript
// Use Redis pub/sub instead of EventEmitter
import Redis from 'ioredis'

const publisher = new Redis(process.env.REDIS_URL)
const subscriber = new Redis(process.env.REDIS_URL)

export function emitSessionEvent(sessionId: string, event: SessionEvent) {
  publisher.publish(`session:${sessionId}`, JSON.stringify(event))
}
```

### 4. Monitoring

Add health check monitoring:

```bash
curl http://localhost:8090/health
```

Expected response:
```json
{"status":"ok"}
```

## Testing

### Run Full Authentication Flow

```bash
bun test-auth-flow.ts
```

This simulates:
1. Creating a session (desktop)
2. Scanning the QR code (mobile)
3. Signing the challenge (mobile)
4. Approving the session (mobile)
5. Verifying the token (desktop)

### Generate Test Keypair

```bash
bun generate-keypair.ts
```

Outputs a valid Ed25519 keypair for testing.

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 8090
lsof -ti:8090 | xargs kill -9
```

### Database Connection Failed

Ensure PostgreSQL is running and credentials are correct:

```bash
psql $DATABASE_URL -c '\dt'
```

### SSE Not Working

Ensure your client supports Server-Sent Events and the connection isn't blocked by a firewall.

### Signature Verification Failed

- Ensure the private key and public key match
- Check that the message is exactly as expected (JSON.stringify order matters)
- Verify timestamp is recent (within 5 minutes)

## Contributing

This service follows the patterns established by the ledger service:
- Clean, modular architecture
- Type-safe with TypeScript and Drizzle ORM
- Security-first design
- Production-ready error handling

## License

Part of the Tana blockchain project.
