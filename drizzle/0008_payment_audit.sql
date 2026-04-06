-- Payment audit table — stores archived payment records that survive
-- user account deletion (no FK to users table).

CREATE TABLE IF NOT EXISTS "payment_audit" (
  "id" text PRIMARY KEY NOT NULL,
  "original_user_id" text NOT NULL,
  "email" text,
  "paddle_customer_id" text,
  "paddle_subscription_id" text,
  "paddle_transaction_id" text,
  "amount_cents" integer,
  "currency" text,
  "status" text,
  "description" text,
  "deleted_at" timestamp DEFAULT now() NOT NULL,
  "original_created_at" timestamp
);

CREATE INDEX IF NOT EXISTS "payment_audit_user_idx" ON "payment_audit" ("original_user_id");
CREATE INDEX IF NOT EXISTS "payment_audit_email_idx" ON "payment_audit" ("email");

-- Enable RLS (consistent with all other tables)
ALTER TABLE public.payment_audit ENABLE ROW LEVEL SECURITY;
