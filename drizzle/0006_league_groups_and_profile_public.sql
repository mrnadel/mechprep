-- Add profile_public column to users table
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "profile_public" boolean DEFAULT true NOT NULL;

-- Create league_groups table
CREATE TABLE IF NOT EXISTS "league_groups" (
  "id" text PRIMARY KEY NOT NULL,
  "tier" integer NOT NULL,
  "week_start" text NOT NULL,
  "real_user_count" integer DEFAULT 0 NOT NULL,
  "finalized" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "league_groups_tier_week_idx" ON "league_groups" ("tier", "week_start");

-- Create league_memberships table
CREATE TABLE IF NOT EXISTS "league_memberships" (
  "id" text PRIMARY KEY NOT NULL,
  "group_id" text NOT NULL REFERENCES "league_groups"("id") ON DELETE CASCADE,
  "user_id" text REFERENCES "users"("id") ON DELETE CASCADE,
  "fake_user_id" text,
  "display_name" text NOT NULL,
  "avatar_initial" text NOT NULL,
  "country_flag" text,
  "weekly_xp" integer DEFAULT 0 NOT NULL,
  "daily_xp_rate" real DEFAULT 0 NOT NULL,
  "variance" real DEFAULT 0 NOT NULL,
  "is_real" boolean DEFAULT false NOT NULL,
  "frame_style" text,
  "created_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "league_memberships_group_idx" ON "league_memberships" ("group_id");
CREATE INDEX IF NOT EXISTS "league_memberships_user_idx" ON "league_memberships" ("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "league_memberships_group_user_idx" ON "league_memberships" ("group_id", "user_id");
