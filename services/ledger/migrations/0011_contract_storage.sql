-- Create contract_storage table for KV store
CREATE TABLE IF NOT EXISTS "contract_storage" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "contract_name" varchar(100) NOT NULL,
  "key" varchar(255) NOT NULL,
  "value" text NOT NULL,
  "size_bytes" bigint NOT NULL,
  "value_type" varchar(20),
  "access_count" bigint DEFAULT 0 NOT NULL,
  "last_accessed_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "contract_storage_contract_name_key_unique" UNIQUE("contract_name", "key")
);
CREATE INDEX IF NOT EXISTS "idx_contract_storage_contract_key" ON "contract_storage"("contract_name", "key");
CREATE INDEX IF NOT EXISTS "idx_contract_storage_contract_prefix" ON "contract_storage"("contract_name", "key" text_pattern_ops);
CREATE INDEX IF NOT EXISTS "idx_contract_storage_size_bytes" ON "contract_storage"("size_bytes");
CREATE INDEX IF NOT EXISTS "idx_contract_storage_access_count" ON "contract_storage"("access_count");
