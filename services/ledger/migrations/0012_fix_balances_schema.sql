-- Fix balances table to match current schema
-- Change from owner_id/owner_type to user_id

-- Drop old constraint if exists
ALTER TABLE balances DROP CONSTRAINT IF EXISTS balances_owner_id_owner_type_currency_code_unique;

-- Rename owner_id to user_id
ALTER TABLE balances RENAME COLUMN owner_id TO user_id;

-- Drop owner_type column (no longer needed)
ALTER TABLE balances DROP COLUMN IF EXISTS owner_type;

-- Add unique constraint for user_id + currency_code
ALTER TABLE balances ADD CONSTRAINT balances_user_id_currency_code_unique UNIQUE (user_id, currency_code);

-- Add foreign key constraint
ALTER TABLE balances ADD CONSTRAINT balances_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
