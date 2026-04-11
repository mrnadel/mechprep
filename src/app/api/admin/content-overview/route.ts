import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';
import { masteryEvents, contentFeedback, contentFeedbackDismissals } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth-utils';
import { runContentQA, type CourseInput } from '@/lib/content-qa';
import { getCourseMetaForProfession, loadUnitData } from '@/data/course/course-meta';
import { PROFESSIONS } from '@/data/professions';
import type { Unit } from '@/data/course/types';

// ─── Types ────────────────────────────────────────────────────

interface CourseStats {
  courseId: string;
  courseName: string;
  unitCount: number;
  lessonCount: number;
  questionCount: number;
  teachingCount: number;
  totalCards: number;
  typeCounts: Record<string, number>;
}

interface LessonAudioCoverage {
  lessonId: string;
  lessonTitle: string;
  unitTitle: string;
  expected: number;
  actual: number;
}

interface AudioCoverage {
  courseId: string;
  courseName: string;
  expectedFiles: number;
  actualFiles: number;
  coveragePct: number;
  lessonCoverage: LessonAudioCoverage[];
}

interface IndexBias {
  courseId: string;
  courseName: string;
  distribution: number[];
  total: number;
}

// ─── Helpers ──────────────────────────────────────────────────

/** Load all units with full question content for every active profession. */
async function loadAllCourses(): Promise<{ id: string; name: string; units: Unit[] }[]> {
  const activeProfessions = PROFESSIONS.filter(p => !p.isComingSoon);
  const courses: { id: string; name: string; units: Unit[] }[] = [];

  for (const p of activeProfessions) {
    const meta = getCourseMetaForProfession(p.id);
    const fullUnits = await Promise.all(
      meta.map((_, i) => loadUnitData(i, p.id))
    );
    courses.push({ id: p.id, name: p.name, units: fullUnits });
  }

  return courses;
}

/** Build per-course stats: lesson/question/teaching counts and type distribution. */
function buildCourseStats(courses: { id: string; name: string; units: Unit[] }[]): CourseStats[] {
  return courses.map(c => {
    const typeCounts: Record<string, number> = {};
    let lessonCount = 0;
    let questionCount = 0;
    let teachingCount = 0;
    let totalCards = 0;

    for (const unit of c.units) {
      for (const lesson of unit.lessons) {
        lessonCount++;
        for (const q of lesson.questions) {
          totalCards++;
          typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
          if (q.type === 'teaching') {
            teachingCount++;
          } else {
            questionCount++;
          }
        }
      }
    }

    return {
      courseId: c.id,
      courseName: c.name,
      unitCount: c.units.length,
      lessonCount,
      questionCount,
      teachingCount,
      totalCards,
      typeCounts,
    };
  });
}

/**
 * Scan `public/audio/tts/` for audio file coverage.
 *
 * Convention:
 *  - Teaching cards: `{cardId}.ogg`
 *  - Questions: `{cardId}-q.ogg` (question text) and `{cardId}-exp.ogg` (explanation)
 */
function buildAudioCoverage(courses: { id: string; name: string; units: Unit[] }[]): AudioCoverage[] {
  const ttsDir = path.join(process.cwd(), 'public', 'audio', 'tts');
  const ttsExists = fs.existsSync(ttsDir);

  // Build a set of all actual audio files for fast lookup
  const actualFiles = new Set<string>();
  if (ttsExists) {
    try {
      const lessonDirs = fs.readdirSync(ttsDir, { withFileTypes: true });
      for (const entry of lessonDirs) {
        if (entry.isDirectory()) {
          const lessonPath = path.join(ttsDir, entry.name);
          const files = fs.readdirSync(lessonPath);
          for (const file of files) {
            // Store as "lessonId/filename" for lookup
            actualFiles.add(`${entry.name}/${file}`);
          }
        }
      }
    } catch {
      // Directory unreadable — treat as empty
    }
  }

  return courses.map(c => {
    let expectedFiles = 0;
    let actualCount = 0;
    const lessonCoverage: LessonAudioCoverage[] = [];

    for (const unit of c.units) {
      for (const lesson of unit.lessons) {
        let lessonExpected = 0;
        let lessonActual = 0;

        for (const q of lesson.questions) {
          if (q.type === 'teaching') {
            // Teaching card: 1 file ({cardId}.ogg)
            lessonExpected++;
            if (actualFiles.has(`${lesson.id}/${q.id}.ogg`)) {
              lessonActual++;
            }
          } else {
            // Question card: 2 files ({cardId}-q.ogg + {cardId}-exp.ogg)
            lessonExpected += 2;
            if (actualFiles.has(`${lesson.id}/${q.id}-q.ogg`)) {
              lessonActual++;
            }
            if (actualFiles.has(`${lesson.id}/${q.id}-exp.ogg`)) {
              lessonActual++;
            }
          }
        }

        if (lessonExpected > 0) {
          lessonCoverage.push({
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            unitTitle: unit.title,
            expected: lessonExpected,
            actual: lessonActual,
          });
        }

        expectedFiles += lessonExpected;
        actualCount += lessonActual;
      }
    }

    return {
      courseId: c.id,
      courseName: c.name,
      expectedFiles,
      actualFiles: actualCount,
      coveragePct: expectedFiles > 0 ? Math.round((actualCount / expectedFiles) * 1000) / 10 : 0,
      lessonCoverage,
    };
  });
}

/** Build correctIndex distribution (A/B/C/D bias) per course. */
function buildIndexBias(courses: { id: string; name: string; units: Unit[] }[]): IndexBias[] {
  return courses.map(c => {
    const counts = [0, 0, 0, 0];
    let total = 0;

    for (const unit of c.units) {
      for (const lesson of unit.lessons) {
        for (const q of lesson.questions) {
          if (
            (q.type === 'multiple-choice' || q.type === 'scenario' || q.type === 'pick-the-best') &&
            q.correctIndex !== undefined &&
            q.correctIndex !== null
          ) {
            if (q.correctIndex >= 0 && q.correctIndex < 4) {
              counts[q.correctIndex]++;
              total++;
            }
          }
        }
      }
    }

    return {
      courseId: c.id,
      courseName: c.name,
      distribution: counts,
      total,
    };
  });
}

// ─── Route handler ────────────────────────────────────────────

export async function GET() {
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    // 1. Load all course data with full questions
    const courses = await loadAllCourses();

    // 2. Run static QA checks
    const qaInput: CourseInput[] = courses.map(c => ({
      id: c.id,
      name: c.name,
      units: c.units,
    }));
    const qaViolations = runContentQA(qaInput);

    // 3. Build course stats
    const courseStats = buildCourseStats(courses);

    // 4. Audio coverage scan
    const audioCoverage = buildAudioCoverage(courses);

    // 5. Question accuracy from mastery_events (questions with >= 10 attempts)
    const questionQuality = await db.execute<{
      question_id: string;
      attempts: number;
      correct_count: number;
      accuracy_pct: number;
    }>(sql`
      SELECT
        question_id,
        COUNT(*)::int AS attempts,
        COUNT(*) FILTER (WHERE correct)::int AS correct_count,
        ROUND(COUNT(*) FILTER (WHERE correct)::numeric / NULLIF(COUNT(*), 0) * 100, 1)::float AS accuracy_pct
      FROM mastery_events
      GROUP BY question_id
      HAVING COUNT(*) >= 10
      ORDER BY accuracy_pct ASC
      LIMIT 200
    `);

    // 6. User reports — recent feedback, excluding dismissed
    const allFeedback = await db
      .select({
        contentId: contentFeedback.contentId,
        contentType: contentFeedback.contentType,
        reason: contentFeedback.reason,
        comment: contentFeedback.comment,
        createdAt: contentFeedback.createdAt,
      })
      .from(contentFeedback);

    const dismissals = await db
      .select({
        contentType: contentFeedbackDismissals.contentType,
        contentId: contentFeedbackDismissals.contentId,
        dismissedAt: contentFeedbackDismissals.dismissedAt,
      })
      .from(contentFeedbackDismissals);

    const dismissalSet = new Set(
      dismissals.map(d => `${d.contentType}:${d.contentId}`)
    );

    const userReports = allFeedback
      .filter(r => !dismissalSet.has(`${r.contentType}:${r.contentId}`))
      .sort((a, b) => {
        const da = a.createdAt ? a.createdAt.getTime() : 0;
        const db2 = b.createdAt ? b.createdAt.getTime() : 0;
        return db2 - da;
      })
      .slice(0, 100);

    // 7. Index bias
    const indexBias = buildIndexBias(courses);

    return NextResponse.json({
      courseStats,
      qaViolations,
      audioCoverage,
      questionQuality: questionQuality.rows,
      userReports,
      indexBias,
    });
  } catch (error) {
    console.error('[content-overview] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
