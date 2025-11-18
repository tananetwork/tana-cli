/**
 * mesh Database Client
 *
 * SQLite database for network registry
 */

import { Database } from 'bun:sqlite'
import path from 'path'

const DB_PATH = process.env.MESH_DB_PATH || path.join(process.cwd(), 'mesh.db')

// Initialize database
export const db = new Database(DB_PATH, { create: true })

// Inlined schema (for compiled binary compatibility)
const schema = `
-- mesh Network Registry Database Schema
-- SQLite database for network topology and node discovery

-- Nodes table - Registered validators/nodes in the network
CREATE TABLE IF NOT EXISTS nodes (
  id TEXT PRIMARY KEY,                    -- node_id (e.g., "validator-001")
  public_key TEXT NOT NULL UNIQUE,        -- Ed25519 public key
  tailscale_hostname TEXT NOT NULL,       -- Tailscale DNS name
  tailscale_ip TEXT,                      -- Tailscale IP address
  status TEXT NOT NULL DEFAULT 'pending', -- pending, active, denied, offline

  -- Registration metadata
  registered_at INTEGER NOT NULL,         -- Unix timestamp
  approved_at INTEGER,                    -- Unix timestamp (null if pending)
  approved_by TEXT,                       -- Sovereign user ID

  -- Health tracking
  last_heartbeat INTEGER,                 -- Unix timestamp of last heartbeat

  -- Signature (proves node owns the private key)
  registration_signature TEXT NOT NULL,

  CONSTRAINT valid_status CHECK (status IN ('pending', 'active', 'denied', 'offline'))
);

-- Services table - Services offered by each node
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  node_id TEXT NOT NULL,                  -- References nodes(id)
  service_type TEXT NOT NULL,             -- ledger, t4, identity, etc.
  port INTEGER NOT NULL,                  -- Service port
  public_key TEXT NOT NULL,               -- Service's Ed25519 public key

  -- Metadata
  created_at INTEGER NOT NULL,

  FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE,
  CONSTRAINT unique_node_service UNIQUE (node_id, service_type)
);

-- Heartbeats table - Track node liveness
CREATE TABLE IF NOT EXISTS heartbeats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  node_id TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  tailscale_ip TEXT,                      -- IP at heartbeat time (may change)

  FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE
);

-- Sovereign keys table - Who can approve nodes
CREATE TABLE IF NOT EXISTS sovereign_keys (
  public_key TEXT PRIMARY KEY,
  description TEXT,
  added_at INTEGER NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_nodes_status ON nodes(status);
CREATE INDEX IF NOT EXISTS idx_nodes_last_heartbeat ON nodes(last_heartbeat);
CREATE INDEX IF NOT EXISTS idx_services_node_id ON services(node_id);
CREATE INDEX IF NOT EXISTS idx_heartbeats_node_id ON heartbeats(node_id);
CREATE INDEX IF NOT EXISTS idx_heartbeats_timestamp ON heartbeats(timestamp);
`

// Execute schema (idempotent - uses IF NOT EXISTS)
db.exec(schema)

console.log(`📊 mesh database initialized: ${DB_PATH}`)

// Node management queries
export const queries = {
  // Register new node
  registerNode: db.prepare(`
    INSERT INTO nodes (id, public_key, tailscale_hostname, tailscale_ip, status, registered_at, registration_signature)
    VALUES (?, ?, ?, ?, 'pending', ?, ?)
  `),

  // Get node by ID
  getNode: db.prepare(`
    SELECT * FROM nodes WHERE id = ?
  `),

  // Get all nodes by status
  getNodesByStatus: db.prepare(`
    SELECT * FROM nodes WHERE status = ?
  `),

  // Approve node
  approveNode: db.prepare(`
    UPDATE nodes
    SET status = 'active', approved_at = ?, approved_by = ?
    WHERE id = ? AND status = 'pending'
  `),

  // Deny node
  denyNode: db.prepare(`
    UPDATE nodes
    SET status = 'denied'
    WHERE id = ? AND status = 'pending'
  `),

  // Update heartbeat
  updateHeartbeat: db.prepare(`
    UPDATE nodes
    SET last_heartbeat = ?
    WHERE id = ?
  `),

  // Insert heartbeat record
  insertHeartbeat: db.prepare(`
    INSERT INTO heartbeats (node_id, timestamp, tailscale_ip)
    VALUES (?, ?, ?)
  `),

  // Mark node offline (no heartbeat for X minutes)
  markOffline: db.prepare(`
    UPDATE nodes
    SET status = 'offline'
    WHERE status = 'active' AND last_heartbeat < ?
  `),

  // Register service
  registerService: db.prepare(`
    INSERT INTO services (node_id, service_type, port, public_key, created_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT (node_id, service_type) DO UPDATE SET
      port = excluded.port,
      public_key = excluded.public_key
  `),

  // Get services for node
  getNodeServices: db.prepare(`
    SELECT * FROM services WHERE node_id = ?
  `),

  // Get all nodes with services (JOIN)
  getAllNodesWithServices: db.prepare(`
    SELECT
      n.*,
      json_group_array(
        json_object(
          'type', s.service_type,
          'port', s.port,
          'publicKey', s.public_key
        )
      ) as services
    FROM nodes n
    LEFT JOIN services s ON n.id = s.node_id
    WHERE n.status = 'active'
    GROUP BY n.id
  `),

  // Add sovereign key
  addSovereignKey: db.prepare(`
    INSERT INTO sovereign_keys (public_key, description, added_at)
    VALUES (?, ?, ?)
    ON CONFLICT (public_key) DO NOTHING
  `),

  // Check if key is sovereign
  isSovereignKey: db.prepare(`
    SELECT 1 FROM sovereign_keys WHERE public_key = ?
  `)
}

// Helper to check if sovereign
export function isSovereign(publicKey: string): boolean {
  return queries.isSovereignKey.get(publicKey) !== undefined
}
