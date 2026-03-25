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

  const units = await db
    .select()
    .from(courseUnits)
    .orderBy(asc(courseUnits.orderIndex));

  const lessons = await db
    .select()
    .from(courseLessons)
    .orderBy(asc(courseLessons.orderIndex));

  const questions = await db
    .select()
    .from(courseQuestions)
    .orderBy(asc(courseQuestions.orderIndex));

  // Determine user's accessible units
  const userId = await getAuthUserId();
  let accessibleUnitIndices: Set<number>;

  if (userId) {
    // Check each unit index against the user's subscription
    const checks = await Promise.all(
      units.map((_, idx) => canAccessUnit(userId, idx))
    );
    accessibleUnitIndices = new Set(
      checks.map((c, idx) => (c.allowed ? idx : -1)).filter((i) => i >= 0)
    );
  } else {
    // Unauthenticated: only free-tier units
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
