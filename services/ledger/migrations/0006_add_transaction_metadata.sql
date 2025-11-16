-- Add metadata column to transactions table
ALTER TABLE "transactions" ADD COLUMN "metadata" jsonb;

-- Add index for faster queries on deposit/withdraw transactions
CREATE INDEX IF NOT EXISTS "idx_transactions_type_status" ON "transactions"("type", "status");
