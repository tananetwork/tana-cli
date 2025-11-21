# Tana Chain Configuration Examples

This document shows example configurations for different deployment scenarios.

## Configuration File Location

Chain configs are stored at: `~/.config/tana/chains/<chain-name>.json`

## Simple Rules

1. **If a service has a URL** → Start it
2. **If a service has no URL** → Skip it (only works for optional services)
3. **If a REQUIRED service has no URL** → Error on startup with helpful message

**Required services:** postgres, redis, mesh, t4, ledger
**Optional services:** identity, notifications, topology

---

## Default Local Development

When you run `tana new chain mychain`, this is the generated config:

```json
{
  "name": "mychain",
  "type": "local",
  "url": "http://localhost:8080",
  "port": 8080,
  "isGenesis": true,
  "createdAt": "2025-11-21T12:00:00.000Z",
  "genesisBlock": "0xabc123...",
  "postgres": {
    "url": "postgres://postgres:tana_dev_password@localhost:5432"
  },
  "redis": {
    "url": "redis://localhost:6379"
  },
  "mesh": {
    "url": "http://localhost:8190"
  },
  "t4": {
    "url": "http://localhost:8180"
  },
  "ledger": {
    "url": "http://localhost:8080"
  },
  "identity": {
    "url": "http://localhost:8090"
  },
  "notifications": {
    "url": "http://localhost:8091"
  },
  "topology": {
    "url": "http://localhost:3001"
  }
}
```

**Use case:** Local development on a single machine

---

## Production: Distributed Services

For production deployments where services run on separate servers:

```json
{
  "name": "mainnet",
  "type": "remote",
  "url": "https://ledger.tana.network",
  "port": 443,
  "isGenesis": false,
  "createdAt": "2025-11-21T12:00:00.000Z",
  "genesisBlock": "0xabc123...",
  "postgres": {
    "url": "postgres://tana:prod_password@db.internal.tana.network:5432"
  },
  "redis": {
    "url": "redis://cache.internal.tana.network:6379"
  },
  "mesh": {
    "url": "https://mesh.tana.network"
  },
  "t4": {
    "url": "https://storage.tana.network"
  },
  "ledger": {
    "url": "https://ledger.tana.network"
  },
  "identity": {
    "url": "https://identity.tana.network"
  },
  "notifications": {
    "url": "https://notifications.tana.network"
  },
  "topology": {
    "url": "https://topology.tana.network"
  }
}
```

**Use case:** Production deployment with dedicated servers for each service

---

## Tailscale Mesh Network

For secure private networks using Tailscale:

```json
{
  "name": "dev-team",
  "type": "local",
  "url": "http://ledger.my-company.ts.net:8080",
  "port": 8080,
  "isGenesis": true,
  "createdAt": "2025-11-21T12:00:00.000Z",
  "genesisBlock": "0xabc123...",
  "postgres": {
    "url": "postgres://postgres:secure_password@db-server.my-company.ts.net:5432"
  },
  "redis": {
    "url": "redis://cache-server.my-company.ts.net:6379"
  },
  "mesh": {
    "url": "http://mesh-node.my-company.ts.net:8190"
  },
  "t4": {
    "url": "http://storage-node.my-company.ts.net:8180"
  },
  "ledger": {
    "url": "http://ledger-node.my-company.ts.net:8080"
  },
  "identity": {
    "url": "http://identity-node.my-company.ts.net:8090"
  },
  "notifications": {
    "url": "http://notif-node.my-company.ts.net:8091"
  },
  "topology": {
    "url": "http://topology-node.my-company.ts.net:3001"
  }
}
```

**Use case:** Development team with services spread across different machines in a Tailscale network

---

## Hybrid: Shared Infrastructure + Local Services

Database/cache on shared servers, Tana services local:

```json
{
  "name": "staging",
  "type": "local",
  "url": "http://localhost:8080",
  "port": 8080,
  "isGenesis": false,
  "createdAt": "2025-11-21T12:00:00.000Z",
  "genesisBlock": "0xabc123...",
  "postgres": {
    "url": "postgres://staging_user:password@10.0.1.50:5432"
  },
  "redis": {
    "url": "redis://10.0.1.51:6379"
  },
  "mesh": {
    "url": "http://localhost:8190"
  },
  "t4": {
    "url": "http://localhost:8180"
  },
  "ledger": {
    "url": "http://localhost:8080"
  },
  "identity": {
    "url": "http://localhost:8090"
  },
  "notifications": {
    "url": "http://localhost:8091"
  },
  "topology": {
    "url": "http://localhost:3001"
  }
}
```

**Use case:** Staging environment with shared infrastructure but local application services

---

## Minimal Configuration (Skip Optional Services)

For testing or resource-constrained environments, just omit optional services:

```json
{
  "name": "minimal",
  "type": "local",
  "url": "http://localhost:8080",
  "port": 8080,
  "isGenesis": true,
  "createdAt": "2025-11-21T12:00:00.000Z",
  "genesisBlock": "0xabc123...",
  "postgres": {
    "url": "postgres://postgres:tana_dev_password@localhost:5432"
  },
  "redis": {
    "url": "redis://localhost:6379"
  },
  "mesh": {
    "url": "http://localhost:8190"
  },
  "t4": {
    "url": "http://localhost:8180"
  },
  "ledger": {
    "url": "http://localhost:8080"
  }
}
```

**Use case:** CI/CD testing where you only need core services (no identity, notifications, or topology)

---

## Field Reference

### ServiceConfig

```typescript
interface ServiceConfig {
  url: string
  // Future fields: timeout?: number, retries?: number, etc.
}
```

### Required Services

These **must** have URLs defined or startup will fail:

- **postgres** - PostgreSQL database
- **redis** - Redis cache
- **mesh** - Network coordination service
- **t4** - T4 storage service
- **ledger** - Blockchain ledger

### Optional Services

These can be omitted entirely from the config:

- **identity** - Identity service
- **notifications** - Notification service
- **topology** - Network topology visualization

### URL Formats

| Service       | URL Format                                    | Example                                   |
|---------------|-----------------------------------------------|-------------------------------------------|
| postgres      | `postgres://user:pass@host:port/db`           | `postgres://user:pass@localhost:5432/db`  |
| redis         | `redis://host:port` or `redis://user:pass@host:port` | `redis://localhost:6379`                  |
| mesh          | `http://host:port` or `https://host:port`     | `http://mesh.company.ts.net:8190`        |
| t4            | `http://host:port` or `https://host:port`     | `https://storage.tana.network`           |
| ledger        | `http://host:port` or `https://host:port`     | `http://10.0.0.5:8080`                   |
| identity      | `http://host:port` or `https://host:port`     | `http://localhost:8090`                  |
| notifications | `http://host:port` or `https://host:port`     | `http://localhost:8091`                  |
| topology      | `http://host:port` or `https://host:port`     | `http://localhost:3001`                  |

---

## Error Messages

### Missing Required Service

If you forget to define a required service URL:

```
✗ Configuration Error: Missing required services

The following required services have no URL defined:
  • postgres
  • redis

Please add these to ~/.config/tana/chains/mychain.json:

{
  "postgres": {
    "url": "postgres://user:pass@host:5432"
  },
  "redis": {
    "url": "redis://host:6379"
  }
}
```

---

## Common Scenarios

### Change Database Server

Edit `~/.config/tana/chains/<chain>.json`:

```json
"postgres": {
  "url": "postgres://user:pass@new-db-server.com:5432"
}
```

### Disable Topology Dashboard

Just remove it from the config entirely:

```json
{
  "name": "mychain",
  "postgres": { "url": "..." },
  "redis": { "url": "..." },
  "mesh": { "url": "..." },
  "t4": { "url": "..." },
  "ledger": { "url": "..." }
  // topology omitted - won't start
}
```

### Connect to Remote Ledger

```json
"ledger": {
  "url": "https://mainnet.tana.network"
}
```

### Add Future Config Options

```json
"mesh": {
  "url": "http://localhost:8190",
  "timeout": 5000,
  "retries": 3
}
```

---

## Best Practices

1. **Use DNS names in production** - Makes it easy to move services
2. **Keep passwords out of configs** - Use environment variables or secrets management
3. **Omit optional services** you don't need - Cleaner and faster startup
4. **Use Tailscale for security** - Encrypted mesh networking without VPN complexity
5. **Top-level service objects** - Easily extensible for future config options

---

## Next Steps

After configuring services, start your chain:

```bash
# CLI mode (logs and spinners)
tana start

# Terminal dashboard
tana start tui

# Web dashboard
tana start webui
```

The startup manager will validate your config and connect to the configured service URLs.
