import { NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseUnits, courseLessons, courseQuestions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { canAccessUnit } from '@/lib/access-control';
import { LIMITS, isUnitUnlocked } from '@/lib/pricing';
import { getCourseMetaForProfession } from '@/data/course/course-meta';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profession = searchParams.get('profession') || 'mechanical-engineering';

  // DB currently only stores ME course content; other professions use static data
  if (profession !== 'mechanical-engineering') {
    return NextResponse.json({ course: [] });
  }

  // Run all DB queries in parallel instead of sequentially
  const [units, lessons, questions, userId] = await Promise.all([
    db.select().from(courseUnits).orderBy(asc(courseUnits.orderIndex)),
    db.select().from(courseLessons).orderBy(asc(courseLessons.orderIndex)),
    db.select().from(courseQuestions).orderBy(asc(courseQuestions.orderIndex)),
    getAuthUserId(),
  ]);

  // Determine user's accessible units — single subscription lookup instead of per-unit
  let accessibleUnitIndices: Set<number>;

  if (userId) {
    const { allowed: _ignored, tier } = await canAccessUnit(userId, 0);
    const unlockedUnits = LIMITS[tier].unlockedUnits;
    accessibleUnitIndices = unlockedUnits === 'all'
      ? new Set(units.map((_, i) => i))
      : new Set(unlockedUnits as number[]);
  } else {
    const freeUnits = LIMITS.free.unlockedUnits;
    accessibleUnitIndices = freeUnits === 'all'
      ? new Set(units.map((_, i) => i))
      : new Set(freeUnits);
  }

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

  // Assemble the Unit[] structure
  // For locked units: return metadata (title, icon, etc.) but strip question content
  const course = units.map((unit, unitIndex) => {
    const isAccessible = accessibleUnitIndices.has(unitIndex);

    return {
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
        // Only include question content for accessible units
        questions: isAccessible
          ? (questionsByLesson.get(lesson.id) ?? []).map((q) => ({
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
            }))
          : [], // Locked unit: no questions served
      })),
    };
  });

  return NextResponse.json({ course });
}
