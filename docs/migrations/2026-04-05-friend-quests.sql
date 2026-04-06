-- Friend Quests & Activity Feed tables
-- Apply via: npm run db:push (Drizzle will auto-detect schema changes)
-- Or run this SQL directly in Supabase SQL Editor.

-- Friend Quests
CREATE TABLE IF NOT EXISTS friend_quests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  quest_week TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  partner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quest_type TEXT NOT NULL,
  target INTEGER NOT NULL,
  progress_user INTEGER NOT NULL DEFAULT 0,
  progress_partner INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  reward_claimed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS friend_quests_week_pair_idx ON friend_quests (quest_week, user_id, partner_id);
CREATE INDEX IF NOT EXISTS friend_quests_user_idx ON friend_quests (user_id);
CREATE INDEX IF NOT EXISTS friend_quests_partner_idx ON friend_quests (partner_id);

-- Activity Feed
CREATE TABLE IF NOT EXISTS activity_feed (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS activity_feed_user_idx ON activity_feed (user_id);
CREATE INDEX IF NOT EXISTS activity_feed_created_idx ON activity_feed (created_at);

-- Activity Reactions (high-fives)
CREATE TABLE IF NOT EXISTS activity_reactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  activity_id TEXT NOT NULL REFERENCES activity_feed(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL DEFAULT '🙌',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS activity_reactions_unique_idx ON activity_reactions (activity_id, user_id);
CREATE INDEX IF NOT EXISTS activity_reactions_activity_idx ON activity_reactions (activity_id);
