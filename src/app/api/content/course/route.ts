import { NextRequest, NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseUnits, courseLessons, courseQuestions } from '@/lib/db/schema';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rl = rateLimit(`content-course:${ip}`, { limit: 30, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
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

  // Assemble the Unit[] structure
  const course = units.map((unit) => ({
    id: unit.id,
    title: unit.title,
    description: unit.description,
    color: unit.color,
    icon: unit.icon,
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
        explanation: q.explanation,
        ...(q.hint != null ? { hint: q.hint } : {}),
        ...(q.diagram != null ? { diagram: q.diagram } : {}),
      })),
    })),
  }));

  return NextResponse.json({ course });
}
