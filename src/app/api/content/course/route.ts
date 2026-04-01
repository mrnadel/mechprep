import { NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseUnits, courseLessons, courseQuestions } from '@/lib/db/schema';
import { getCourseMetaForProfession, loadUnitData } from '@/data/course/course-meta';

// Cache headers: CDN caches for 1 hour, serves stale for 24h while revalidating.
// Course content changes only when we re-seed, so this is safe.
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profession = searchParams.get('profession') || 'mechanical-engineering';

  // Non-ME professions: load full data from static files
  if (profession !== 'mechanical-engineering') {
    const meta = getCourseMetaForProfession(profession);
    const course = await Promise.all(
      meta.map((_, i) => loadUnitData(i, profession))
    );
    return NextResponse.json({ course }, { headers: CACHE_HEADERS });
  }

  // Run all DB queries in parallel
  const [units, lessons, questions] = await Promise.all([
    db.select().from(courseUnits).orderBy(asc(courseUnits.orderIndex)),
    db.select().from(courseLessons).orderBy(asc(courseLessons.orderIndex)),
    db.select().from(courseQuestions).orderBy(asc(courseQuestions.orderIndex)),
  ]);

  // Group questions by lessonId
  const questionsByLesson = new Map<string, typeof questions>();
  for (const q of questions) {
    const list = questionsByLesson.get(q.lessonId) ?? [];
    list.push(q);
    questionsByLesson.set(q.lessonId, list);
  }

  // Group lessons by unitId
  const lessonsByUnit = new Map<string, typeof lessons>();
  for (const l of lessons) {
    const list = lessonsByUnit.get(l.unitId) ?? [];
    list.push(l);
    lessonsByUnit.set(l.unitId, list);
  }

  // Build topicId lookup from static courseMeta (DB doesn't store topicId)
  const professionMeta = getCourseMetaForProfession(profession);
  const topicIdByUnitId = new Map(professionMeta.map(u => [u.id, u.topicId]));

  // Filter to only units belonging to this profession (DB stores all professions together)
  const validUnitIds = new Set(professionMeta.map(u => u.id));
  const professionUnits = units.filter(u => validUnitIds.has(u.id));

  // Assemble the Unit[] structure
  // Serve full content to everyone (access gating is client-side, like non-ME courses).
  // This makes the response cacheable at the CDN: one DB hit per hour for all users.
  const course = professionUnits.map((unit) => ({
    id: unit.id,
    title: unit.title,
    description: unit.description,
    color: unit.color,
    icon: unit.icon,
    topicId: topicIdByUnitId.get(unit.id),
    lessons: (lessonsByUnit.get(unit.id) ?? []).map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      icon: lesson.icon,
      xpReward: lesson.xpReward,
      questions: (questionsByLesson.get(lesson.id) ?? []).map((q) => ({
        id: q.id,
        type: q.type,
        question: q.question,
        ...(q.options != null ? { options: q.options } : {}),
        ...(q.correctIndex != null ? { correctIndex: q.correctIndex } : {}),
        ...(q.correctAnswer != null
          ? { correctAnswer: q.correctAnswer === 'true' }
          : {}),
        ...(q.acceptedAnswers != null
          ? { acceptedAnswers: q.acceptedAnswers }
          : {}),
        ...(q.blanks != null ? { blanks: q.blanks } : {}),
        ...(q.wordBank != null ? { wordBank: q.wordBank } : {}),
        ...(q.buckets != null ? { buckets: q.buckets } : {}),
        ...(q.correctBuckets != null ? { correctBuckets: q.correctBuckets } : {}),
        ...(q.matchTargets != null ? { matchTargets: q.matchTargets } : {}),
        ...(q.correctMatches != null ? { correctMatches: q.correctMatches } : {}),
        ...(q.steps != null ? { steps: q.steps } : {}),
        ...(q.correctOrder != null ? { correctOrder: q.correctOrder } : {}),
        ...(q.correctIndices != null ? { correctIndices: q.correctIndices } : {}),
        ...(q.sliderMin != null ? { sliderMin: q.sliderMin } : {}),
        ...(q.sliderMax != null ? { sliderMax: q.sliderMax } : {}),
        ...(q.correctValue != null ? { correctValue: q.correctValue } : {}),
        ...(q.tolerance != null ? { tolerance: q.tolerance } : {}),
        ...(q.unit != null ? { unit: q.unit } : {}),
        ...(q.scenario != null ? { scenario: q.scenario } : {}),
        ...(q.rankCriteria != null ? { rankCriteria: q.rankCriteria } : {}),
        ...(q.tapZones != null ? { tapZones: q.tapZones } : {}),
        ...(q.correctZoneId != null ? { correctZoneId: q.correctZoneId } : {}),
        explanation: q.explanation,
        ...(q.hint != null ? { hint: q.hint } : {}),
        ...(q.diagram != null ? { diagram: q.diagram } : {}),
      })),
    })),
  }));

  return NextResponse.json({ course }, { headers: CACHE_HEADERS });
}
