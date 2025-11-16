-- Add role_change to transaction_type enum
ALTER TYPE "transaction_type" ADD VALUE IF NOT EXISTS 'role_change';
