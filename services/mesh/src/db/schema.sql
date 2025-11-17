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
