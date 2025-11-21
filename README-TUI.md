# Tana CLI - TUI Integration

This document explains how the TUI (Terminal User Interface) is integrated into the main Tana CLI binary.

## Single Binary Architecture

The TUI is **embedded directly** into the `tana` CLI binary - there is no separate `tana-tui` executable.

```
tana binary contains:
├── CLI commands (new, deploy, transfer, etc.)
├── Service startup logic (startup-manager.ts)
├── CLI interface (start-cli.ts)
└── TUI interface (start-tui.ts + components/)
```

## Usage

```bash
# CLI mode (spinners, logs)
$ tana start

# TUI mode (interactive dashboard)
$ tana start tui
```

Both modes use the **exact same startup logic** (`services/startup-manager.ts`).

## File Structure

```
cli/
├── commands/
│   ├── service/
│   │   ├── start.ts           # Router: CLI vs TUI
│   │   ├── start-cli.ts       # CLI consumer
│   │   └── start-tui.ts       # TUI consumer
│   └── tui/                   # TUI components (embedded)
│       ├── components/
│       │   ├── StartupSequence.tsx
│       │   ├── Dashboard.tsx
│       │   ├── ServiceTicker.tsx
│       │   ├── PendingTxPanel.tsx
│       │   ├── ValidatorPanel.tsx
│       │   ├── EventLogPanel.tsx
│       │   └── ChaosPanel.tsx
│       └── types.ts
└── services/
    └── startup-manager.ts      # Shared logic
```

## Dependencies

TUI components use **OpenTUI** (React for terminals):

```json
{
  "dependencies": {
    "@opentui/core": "^0.1.47",
    "@opentui/react": "^0.1.47",
    "react": "^18.3.1"
  }
}
```

These are added to `cli/package.json` and bundled into the main binary.

## Build Process

```bash
# Build main binary (includes TUI)
bun build ./main.ts --compile --outfile dist/tana
```

Bun's `--compile` flag creates a standalone executable with:
- All TypeScript/JavaScript code
- All dependencies (including OpenTUI)
- Node.js runtime
- No external dependencies needed

## Separate tana-tui Repository

The `tana-tui/` repository remains as a **development workspace**:
- Faster iteration (no CLI rebuild)
- Independent testing
- Component development
- Documentation

**Production use:** TUI is embedded in main `tana` binary via `cli/commands/tui/`

## Development Workflow

### Option 1: Standalone TUI Development

```bash
cd tana-tui
bun run dev
```

Fast iteration, but services must be started separately.

### Option 2: Integrated Testing

```bash
cd cli
bun run dev start tui
```

Tests the integrated experience with full startup sequence.

### Syncing Changes

When TUI components are updated:

```bash
# Copy from tana-tui to cli
cp -r tana-tui/src/components/* cli/commands/tui/components/
cp tana-tui/src/types.ts cli/commands/tui/types.ts
```

Or develop directly in `cli/commands/tui/` for production changes.

## Benefits of Single Binary

1. **Simpler distribution** - One binary instead of two
2. **Shared dependencies** - No duplication (startup-manager, config, etc.)
3. **Consistent versioning** - CLI and TUI always match
4. **Smaller total size** - Shared Bun runtime and node_modules
5. **Easier installation** - `npm install -g @tananetwork/tana` (no separate TUI package)

## Mode Detection

The router in `commands/service/start.ts` detects mode:

```typescript
export async function start(options: { tui?: boolean; chain?: string }) {
  if (options.tui) {
    await startTUI(options.chain)  // OpenTUI renderer
  } else {
    await startCLI(options.chain)  // Spinners and logs
  }
}
```

Both call `StartupManager` with different event handlers.

## Future Enhancements

- [ ] Web dashboard mode (`tana start web`)
- [ ] API server mode (`tana start api`)
- [ ] Mixed mode (CLI + web dashboard on localhost:3000)

All would use the same `StartupManager` with different renderers.
