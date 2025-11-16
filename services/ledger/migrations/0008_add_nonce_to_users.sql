-- Migration: Add nonce field to users table for replay protection
-- Description: Add a nonce field that increments with each transaction to prevent replay attacks

ALTER TABLE users ADD COLUMN nonce BIGINT NOT NULL DEFAULT 0;

-- Add index for faster nonce lookups
CREATE INDEX idx_users_nonce ON users(nonce);

-- Add comment
COMMENT ON COLUMN users.nonce IS 'Transaction nonce for replay protection - increments with each signed transaction';
