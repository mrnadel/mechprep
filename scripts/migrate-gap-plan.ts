import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('No POSTGRES_URL found in env');
  process.exit(1);
}

const sql = postgres(connectionString);

async function migrate() {
  console.log('Running gap plan migrations...\n');

  // 1. Add dailyRewardCalendar column to user_progress
  try {
    await sql`
      ALTER TABLE user_progress
      ADD COLUMN IF NOT EXISTS daily_reward_calendar jsonb
      DEFAULT '{"currentDay":1,"lastClaimDate":null,"todayClaimed":false,"cycleStartDate":null,"cyclesCompleted":0}'::jsonb
    `;
    console.log('✓ Added daily_reward_calendar column to user_progress');
  } catch (e: unknown) {
    console.log('  (daily_reward_calendar already exists or error:', (e as Error).message, ')');
  }

  // 2. Add new columns to friend_quests
  try {
    await sql`ALTER TABLE friend_quests ADD COLUMN IF NOT EXISTS reward_claimed_user boolean NOT NULL DEFAULT false`;
    await sql`ALTER TABLE friend_quests ADD COLUMN IF NOT EXISTS reward_claimed_partner boolean NOT NULL DEFAULT false`;
    await sql`ALTER TABLE friend_quests ADD COLUMN IF NOT EXISTS reward_gems integer NOT NULL DEFAULT 0`;
    console.log('✓ Added reward_claimed_user, reward_claimed_partner, reward_gems to friend_quests');
  } catch (e: unknown) {
    console.log('  (friend_quests columns error:', (e as Error).message, ')');
  }

  // 3. Drop old reward_claimed column if it exists
  try {
    await sql`ALTER TABLE friend_quests DROP COLUMN IF EXISTS reward_claimed`;
    console.log('✓ Dropped old reward_claimed column from friend_quests');
  } catch (e: unknown) {
    console.log('  (drop reward_claimed error:', (e as Error).message, ')');
  }

  // 4. Ensure activity_feed table exists
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS activity_feed (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type text NOT NULL,
        data jsonb DEFAULT '{}'::jsonb,
        created_at timestamp DEFAULT now()
      )
    `;
    console.log('✓ Ensured activity_feed table exists');
  } catch (e: unknown) {
    console.log('  (activity_feed error:', (e as Error).message, ')');
  }

  // 5. Ensure activity_reactions table exists
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS activity_reactions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        activity_id uuid NOT NULL REFERENCES activity_feed(id) ON DELETE CASCADE,
        user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type text NOT NULL DEFAULT 'high_five',
        created_at timestamp DEFAULT now()
      )
    `;
    console.log('✓ Ensured activity_reactions table exists');
  } catch (e: unknown) {
    console.log('  (activity_reactions error:', (e as Error).message, ')');
  }

  // 6. Ensure push_subscriptions table exists (needed by push.ts)
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        endpoint text NOT NULL,
        keys jsonb NOT NULL,
        created_at timestamp DEFAULT now()
      )
    `;
    console.log('✓ Ensured push_subscriptions table exists');
  } catch (e: unknown) {
    console.log('  (push_subscriptions error:', (e as Error).message, ')');
  }

  console.log('\n✓ Migration complete!');
  await sql.end();
  process.exit(0);
}

migrate().catch((e) => {
  console.error('Migration failed:', e);
  process.exit(1);
});
