-- Consensus Multi-Validator Tables
-- Generated: 2025-11-20

-- Validators registry
CREATE TABLE IF NOT EXISTS validators (
  id TEXT PRIMARY KEY,
  public_key TEXT NOT NULL UNIQUE,
  ws_url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'offline')),
  last_seen TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Block votes for consensus
CREATE TABLE IF NOT EXISTS block_votes (
  id TEXT PRIMARY KEY,
  block_hash TEXT NOT NULL,
  validator_id TEXT NOT NULL REFERENCES validators(id),
  approve BOOLEAN NOT NULL,
  signature TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS block_votes_block_hash_idx ON block_votes(block_hash);
CREATE INDEX IF NOT EXISTS block_votes_validator_idx ON block_votes(validator_id);
CREATE INDEX IF NOT EXISTS validators_status_idx ON validators(status);

-- Comments
COMMENT ON TABLE validators IS 'Registry of all validators in the network';
COMMENT ON TABLE block_votes IS 'Consensus votes for block proposals';
