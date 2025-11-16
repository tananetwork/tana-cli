-- Create user_role enum
CREATE TYPE "user_role" AS ENUM('sovereign', 'staff', 'user');

-- Add role column to users table with default 'user'
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'user' NOT NULL;

-- Create index on role for efficient role-based queries
CREATE INDEX IF NOT EXISTS "idx_users_role" ON "users"("role");
