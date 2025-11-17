/**
 * mesh Database Client
 *
 * SQLite database for network registry
 */

import { Database } from 'bun:sqlite'
import { readFileSync } from 'fs'
import path from 'path'

const DB_PATH = process.env.MESH_DB_PATH || path.join(process.cwd(), 'mesh.db')

// Initialize database
export const db = new Database(DB_PATH, { create: true })

// Load schema
const schemaPath = path.join(import.meta.dir, 'schema.sql')
const schema = readFileSync(schemaPath, 'utf-8')

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
