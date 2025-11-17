# t4 - Content-Addressable Storage

Simple HTTP server for storing and retrieving content by SHA256 hash.

## Design Philosophy

**t4 is intentionally dumb.** It has:
- ✅ Zero networking logic
- ✅ Zero replication logic
- ✅ Zero blockchain knowledge
- ✅ Just file I/O via HTTP

The **blockchain determines what content exists**. t4 just serves files.

## API

### Store Content
```bash
PUT /content/{sha256-hash}
Body: <binary data>

# Response
{
  "hash": "abc123...",
  "size": 1024,
  "stored": true
}
```

### Retrieve Content
```bash
GET /content/{sha256-hash}

# Response: binary data
# Headers:
#   X-Content-Hash: abc123...
#   X-Content-Size: 1024
```

### Check Existence
```bash
HEAD /content/{sha256-hash}

# Response: 200 if exists, 404 if not
# Headers:
#   X-Content-Hash: abc123...
#   X-Content-Size: 1024
```

### Delete Content
```bash
DELETE /content/{sha256-hash}

# Response
{
  "hash": "abc123...",
  "deleted": true
}
```

### Health Check
```bash
GET /health

# Response
{
  "status": "ok",
  "service": "t4",
  "contentDir": "/var/lib/tana/content"
}
```

## Configuration

Environment variables:

- `T4_PORT` - Port to listen on (default: 8180)
- `CONTENT_DIR` - Directory to store content (default: /var/lib/tana/content)

## Content Organization

Files are sharded by the first 2 characters of the hash:

```
/var/lib/tana/content/
  ab/
    abc123def456...  (64-char SHA256 hash)
  cd/
    cdef789...
```

This prevents directory size issues at scale.

## Multi-Validator Pattern

When validator nodes see a block with content references:

1. **Block finalized on-chain** with contentRefs array
2. **Validator checks local t4**: Does content exist?
3. **If missing**: Fetch from block producer's t4
4. **Store locally**: PUT to own t4
5. **Verify hash**: SHA256 must match

The blockchain tracks which validator produced each block, so nodes know where to fetch content from.

## Security

- **Hash verification on PUT** - Rejects data if SHA256 doesn't match URL
- **Hash verification on GET** - Client verifies after fetch
- **Content-addressed** - Files are immutable (hash = content)
- **No authentication** - Relies on blockchain for access control

## Running

```bash
# Development
bun run dev

# Production
bun run start

# With custom config
T4_PORT=8180 CONTENT_DIR=/mnt/storage/tana bun run start
```

## Testing

```bash
# Store content
echo "Hello, World!" | curl -X PUT \
  --data-binary @- \
  http://localhost:8180/content/$(echo -n "Hello, World!" | shasum -a 256 | cut -d' ' -f1)

# Retrieve content
curl http://localhost:8180/content/dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f

# Check existence
curl -I http://localhost:8180/content/dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f

# Health check
curl http://localhost:8180/health
```

## Integration with Ledger

The ledger service uses `ContentClient` to interact with t4:

```typescript
import { contentClient } from './content/client'

// Store large contract code
const code = "export async function contract() { ... }"
const hash = await contentClient.store(Buffer.from(code))

// Add hash to block's contentRefs
block.contentRefs.push({
  hash,
  size: code.length,
  type: 'contract_code',
  owner: userId
})

// Later, retrieve content
const data = await contentClient.fetch(hash)
```

## Garbage Collection

Content should only be deleted if it's not referenced in any finalized block. The ledger service is responsible for:

1. Tracking which hashes exist in contentRefs
2. Periodically scanning for orphaned content
3. Calling `contentClient.delete()` for unreferenced hashes

This will be implemented as part of the block finalization process.
