import { config } from 'dotenv';
config({ path: '.env.local' });

import postgres from 'postgres';
import { course } from '../src/data/course/index';

const sql = postgres(process.env.POSTGRES_URL!, { prepare: false });

async function updateBlanks() {
  let updated = 0;
  let skipped = 0;

  for (const unit of course) {
    for (const lesson of unit.lessons) {
      for (const q of lesson.questions) {
        if (q.type === 'fill-blank' && q.blanks && q.wordBank) {
          await sql`
            UPDATE course_questions
            SET blanks = ${JSON.stringify(q.blanks)}::jsonb,
                word_bank = ${JSON.stringify(q.wordBank)}::jsonb
            WHERE id = ${q.id}
          `;
          updated++;
        } else {
          skipped++;
        }
      }
    }
  }

  console.log('Updated:', updated, 'fill-blank questions with blanks + wordBank');
  console.log('Skipped:', skipped, 'non-fill-blank questions');
  await sql.end();
}

updateBlanks().catch((e) => {
  console.error(e);
  process.exit(1);
});
