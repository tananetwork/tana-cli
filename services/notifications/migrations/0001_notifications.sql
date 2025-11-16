-- Device Tokens Table
CREATE TABLE IF NOT EXISTS "device_tokens" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "username" text NOT NULL,
  "public_key" text NOT NULL,
  "device_token" text NOT NULL UNIQUE,
  "platform" text NOT NULL,
  "device_name" text,
  "preferences" jsonb NOT NULL DEFAULT '{"balanceUpdates":true,"moneyRequests":true,"paymentReceived":true,"contractEvents":true,"securityAlerts":true}'::jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "last_seen_at" timestamp DEFAULT now() NOT NULL,
  "is_active" boolean DEFAULT true NOT NULL
);

-- Notification History Table
CREATE TABLE IF NOT EXISTS "notification_history" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "device_token_id" text NOT NULL,
  "type" text NOT NULL,
  "title" text NOT NULL,
  "body" text NOT NULL,
  "data" jsonb,
  "status" text NOT NULL,
  "error" text,
  "sent_at" timestamp DEFAULT now() NOT NULL,
  "received_at" timestamp
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS "idx_device_tokens_user_id" ON "device_tokens" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_device_tokens_active" ON "device_tokens" ("is_active");
CREATE INDEX IF NOT EXISTS "idx_notification_history_user_id" ON "notification_history" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_notification_history_sent_at" ON "notification_history" ("sent_at");
