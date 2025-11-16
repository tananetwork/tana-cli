-- Tana Identity Service - Auth Sessions Migration
-- Creates the auth_sessions table for QR code authentication

-- Create enum for session status if it doesn't exist
DO $$ BEGIN
  CREATE TYPE auth_session_status AS ENUM (
    'waiting',
    'scanned',
    'approved',
    'rejected',
    'expired'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create auth_sessions table
CREATE TABLE IF NOT EXISTS auth_sessions (
  id TEXT PRIMARY KEY,
  challenge TEXT NOT NULL UNIQUE,
  status auth_session_status NOT NULL DEFAULT 'waiting',
  
  -- User info (populated after approval)
  user_id TEXT,
  username TEXT,
  public_key TEXT,
  
  -- Session token (generated after approval)
  session_token TEXT UNIQUE,
  
  -- App info
  return_url TEXT,
  app_name TEXT,
  app_icon TEXT,
  
  -- Metadata
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  approved_at TIMESTAMP,
  scanned_at TIMESTAMP,
  rejected_at TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_auth_sessions_status ON auth_sessions(status);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_expires_at ON auth_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_token ON auth_sessions(session_token) WHERE session_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_auth_sessions_challenge ON auth_sessions(challenge);

-- Add comment
COMMENT ON TABLE auth_sessions IS 'QR code authentication sessions for mobile-first authentication';
