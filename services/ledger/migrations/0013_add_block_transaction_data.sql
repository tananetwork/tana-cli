-- Add missing columns to blocks table to match current schema
-- Schema expects full transaction data stored in blocks for self-contained block history

-- Add transactions JSONB column (stores full transaction objects)
ALTER TABLE blocks ADD COLUMN IF NOT EXISTS transactions JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Add state_changes JSONB column (stores state transitions)
ALTER TABLE blocks ADD COLUMN IF NOT EXISTS state_changes JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Add content_refs JSONB column (for large data references)
ALTER TABLE blocks ADD COLUMN IF NOT EXISTS content_refs JSONB;

-- Add metadata JSONB column if it doesn't exist
ALTER TABLE blocks ADD COLUMN IF NOT EXISTS metadata JSONB;

-- Update tx_root to be NOT NULL if it isn't already
ALTER TABLE blocks ALTER COLUMN tx_root SET NOT NULL;

-- Add comment
COMMENT ON COLUMN blocks.transactions IS 'Full transaction objects with signatures (self-contained block history)';
COMMENT ON COLUMN blocks.state_changes IS 'State transitions for this block (before/after snapshots)';
COMMENT ON COLUMN blocks.content_refs IS 'SHA256 hashes to content-addressed storage for large data (>10KB)';
