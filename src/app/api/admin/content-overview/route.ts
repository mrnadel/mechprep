import { NextResponse } from 'next/server';
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

    // 4. Question accuracy from mastery_events (questions with >= 10 attempts)
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
      questionQuality: [...questionQuality],
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
