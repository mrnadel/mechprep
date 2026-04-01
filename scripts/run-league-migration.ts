import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import fs from 'fs';

const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('No POSTGRES_URL or DATABASE_URL found in .env.local or .env');
  process.exit(1);
}

const client = postgres(dbUrl, { max: 1 });
const db = drizzle(client);

const migration = fs.readFileSync('./drizzle/0006_league_groups_and_profile_public.sql', 'utf-8');
const statements = migration.split(';').map((s) => s.trim()).filter((s) => s.length > 0);

async function run() {
  for (const stmt of statements) {
    try {
      await db.execute(sql.raw(stmt));
      console.log('OK:', stmt.substring(0, 70));
    } catch (e: any) {
      console.error('ERR:', e.message?.substring(0, 120), '\n  ---', stmt.substring(0, 60));
    }
  }
  console.log('\nMigration complete');
  await client.end();
  process.exit(0);
}

run();
