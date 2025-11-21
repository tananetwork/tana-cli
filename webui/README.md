# Tana WebUI (Embedded)

This directory contains the web-based dashboard for Tana Network, embedded in the main CLI binary.

## Overview

The WebUI provides a browser-based interface for:
- Real-time validator monitoring
- Network topology visualization
- Pending transaction tracking
- Event log streaming
- Chaos engineering controls

**Previously:** Separate `tana-topology` repository
**Now:** Embedded in `tana-cli` at `cli/webui/`

## Usage

```bash
# Start services with WebUI (opens browser automatically)
tana start webui
```

This will:
1. Start all Tana services (using startup-manager)
2. Start WebUI frontend server (Vite dev or serve built files)
3. Open default browser to http://localhost:5173
4. Connect WebSocket to topology backend (port 8191)

## Development

### Standalone Development

```bash
cd webui
npm install
npm run dev
```

Frontend runs on http://localhost:5173
Backend must be running separately (topology service on port 8191)

### Integrated Development

```bash
cd ..  # Back to cli/
bun run dev start webui
```

Starts all services + WebUI in one command.

## Build for Production

```bash
cd webui
npm run build  # Creates dist/ folder
```

The `tana start webui` command will automatically serve built files if `dist/` exists.

## Architecture

```
cli/
├── commands/service/
│   └── start-web.ts      ← Launches WebUI + services
├── webui/                ← Embedded WebUI (this directory)
│   ├── src/
│   │   ├── App.tsx       ← Main dashboard component
│   │   ├── main.tsx      ← Entry point
│   │   └── index.css     ← Styles
│   ├── dist/             ← Built files (production)
│   └── package.json
└── services/
    ├── topology/         ← Backend (WebSocket + HTTP API)
    │   └── src/
    │       └── index.ts  ← Topology service
    └── startup-manager.ts ← Starts all services
```

### Data Flow

```
startup-manager.ts
      ↓
  cli/services/topology/ (backend)
      ↓ WebSocket (8191) + HTTP (3001)
  cli/webui/ (frontend)
      ↓ Browser (5173)
    User
```

## Migration from tana-topology

This WebUI was migrated from the separate `tana-topology` repository:

**Old:** `tana-topology/` (standalone repo)
**New:** `tana-cli/webui/` (embedded)

**Benefits:**
- Single binary distribution
- Shared startup logic
- Consistent versioning
- Simpler development workflow

The `tana-topology` repository will be deprecated and archived.

## Backend Service

The WebUI backend (WebSocket + HTTP API) is located at `cli/services/topology/` and started automatically by `startup-manager.ts`:

- **Location:** `cli/services/topology/src/index.ts`
- **WebSocket:** ws://localhost:8191 (real-time updates)
- **HTTP API:** http://localhost:3001 (chaos engineering)
- **Install:** `cd cli/services/topology && bun install`
- **Run standalone:** `bun run start` (from topology directory)

## Frontend Stack

- **React** - UI components
- **TypeScript** - Type safety
- **Vite** - Dev server & build tool
- **WebSocket** - Real-time data streaming
- **Force Graph** - Network visualization

## Configuration

No configuration needed - WebUI uses environment defaults:

```env
WS_URL=ws://localhost:8191
API_URL=http://localhost:3001
```

## Chaos Engineering

The WebUI includes chaos engineering controls:
- Kill validator
- Network partition
- Corrupt data (simulated)
- Inject latency (simulated)
- Byzantine behavior (simulated)
- Recover all

In production, these require sovereign Ed25519 signature authentication.

## License

MIT
