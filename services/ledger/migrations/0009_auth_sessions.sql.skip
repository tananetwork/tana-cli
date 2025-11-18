-- Mobile Authentication Sessions
-- For QR code-based login and transaction approval

CREATE TABLE IF NOT EXISTS auth_sessions (
  id TEXT PRIMARY KEY,
  challenge TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'waiting',
  user_id TEXT,
  username TEXT,
  public_key TEXT,
  session_token TEXT UNIQUE,
  return_url TEXT NOT NULL,
  app_name TEXT,
  app_icon TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  approved_at TIMESTAMP,
  scanned_at TIMESTAMP,
  CONSTRAINT fk_auth_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for efficient queries
CREATE INDEX idx_auth_sessions_status ON auth_sessions(status);
CREATE INDEX idx_auth_sessions_expires ON auth_sessions(expires_at);
CREATE INDEX idx_auth_sessions_user ON auth_sessions(user_id);
CREATE INDEX idx_auth_sessions_created ON auth_sessions(created_at DESC);

-- Enum check constraint for status
ALTER TABLE auth_sessions ADD CONSTRAINT chk_auth_sessions_status
  CHECK (status IN ('waiting', 'scanned', 'approved', 'rejected', 'expired'));

-- Comments for documentation
COMMENT ON TABLE auth_sessions IS 'Mobile authentication sessions for QR code login';
COMMENT ON COLUMN auth_sessions.id IS 'Session ID (sess_...)';
COMMENT ON COLUMN auth_sessions.challenge IS 'Random challenge that must be signed by mobile app';
COMMENT ON COLUMN auth_sessions.status IS 'Session status: waiting, scanned, approved, rejected, expired';
COMMENT ON COLUMN auth_sessions.session_token IS 'JWT or secure token for authenticated web sessions';
COMMENT ON COLUMN auth_sessions.return_url IS 'URL to redirect after successful authentication';
