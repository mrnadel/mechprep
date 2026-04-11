import 'dotenv/config';
import postgres from 'postgres';

const connStr = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
if (!connStr) { console.error('No DB URL'); process.exit(1); }

const sql = postgres(connStr);

async function main() {
  console.log('Creating friend_quests table...');
  await sql`
    CREATE TABLE IF NOT EXISTS friend_quests (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id text NOT NULL,
      partner_id text NOT NULL,
      quest_type text NOT NULL,
      quest_week text NOT NULL,
      target integer NOT NULL DEFAULT 0,
      progress_user integer NOT NULL DEFAULT 0,
      progress_partner integer NOT NULL DEFAULT 0,
      completed boolean NOT NULL DEFAULT false,
      reward_claimed_user boolean NOT NULL DEFAULT false,
      reward_claimed_partner boolean NOT NULL DEFAULT false,
      reward_gems integer NOT NULL DEFAULT 0,
      created_at timestamp DEFAULT now()
    )
  `;
  console.log('Done: friend_quests');

  // Verify
  const tables = await sql`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public' AND tablename IN ('friend_quests', 'activity_feed', 'activity_reactions', 'push_subscriptions')
    ORDER BY tablename
  `;
  console.log('Verified tables:', tables.map(t => t.tablename).join(', '));

  const cols = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'user_progress' AND column_name = 'daily_reward_calendar'
  `;
  console.log('daily_reward_calendar exists:', cols.length > 0);

  await sql.end();
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
