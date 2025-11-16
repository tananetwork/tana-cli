-- Add extracted function fields to contracts table
ALTER TABLE "contracts" ADD COLUMN "init_code" text;
ALTER TABLE "contracts" ADD COLUMN "contract_code" text NOT NULL DEFAULT '';
ALTER TABLE "contracts" ADD COLUMN "get_code" text;
ALTER TABLE "contracts" ADD COLUMN "post_code" text;

-- Add function availability flags
ALTER TABLE "contracts" ADD COLUMN "has_init" boolean DEFAULT false NOT NULL;
ALTER TABLE "contracts" ADD COLUMN "has_get" boolean DEFAULT false NOT NULL;
ALTER TABLE "contracts" ADD COLUMN "has_post" boolean DEFAULT false NOT NULL;

-- Remove the temporary default from contract_code
ALTER TABLE "contracts" ALTER COLUMN "contract_code" DROP DEFAULT;
