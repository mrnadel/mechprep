import type { Question, TopicId, Difficulty, TopicProgress } from '@/data/types';
import type { CourseQuestion, Unit } from '@/data/course/types';
import { course } from '@/data/course';
import { shuffleArray } from '@/lib/utils';

// --- Types ---

interface UserPerformance {
  topicProgress: TopicProgress[];
  sessionHistory: { date: string; topicsCovered: TopicId[] }[];
  answeredQuestionIds: Set<string>;
  recentCorrectIds: Set<string>;
}

interface ScoredQuestion {
  question: Question;
  weight: number;
  bucket: 'weak' | 'medium' | 'strong';
  sourceType: 'practice' | 'course';
  courseLessonId?: string;
}

// --- Helpers ---

function getUserLevel(topicProgress: TopicProgress[]): Difficulty {
  const totalAttempted = topicProgress.reduce((s, t) => s + t.questionsAttempted, 0);
  const totalCorrect = topicProgress.reduce((s, t) => s + t.questionsCorrect, 0);
  if (totalAttempted < 10) return 'beginner';
  const accuracy = totalCorrect / totalAttempted;
  if (accuracy >= 0.75) return 'advanced';
  if (accuracy >= 0.5) return 'intermediate';
  return 'beginner';
}

function getSubtopicAccuracy(
  topicProgress: TopicProgress[],
  topicId: TopicId,
  subtopic: string
): number | null {
  const tp = topicProgress.find(t => t.topicId === topicId);
  if (!tp) return null;
  const sub = tp.subtopicBreakdown[subtopic];
  if (!sub || sub.attempted === 0) return null;
  return sub.correct / sub.attempted;
}

function getTopicAccuracy(topicProgress: TopicProgress[], topicId: TopicId): number | null {
  const tp = topicProgress.find(t => t.topicId === topicId);
  if (!tp || tp.questionsAttempted === 0) return null;
  return tp.questionsCorrect / tp.questionsAttempted;
}

function classifyBucket(accuracy: number | null): 'weak' | 'medium' | 'strong' {
  if (accuracy === null) return 'strong';
  if (accuracy < 0.5) return 'weak';
  if (accuracy < 0.8) return 'medium';
  return 'strong';
}

function scoreQuestion(
  question: Question,
  performance: UserPerformance,
  userLevel: Difficulty,
): ScoredQuestion {
  const { topicProgress, answeredQuestionIds, recentCorrectIds } = performance;

  const subtopicAcc = getSubtopicAccuracy(topicProgress, question.topic, question.subtopic);
  const topicAcc = getTopicAccuracy(topicProgress, question.topic);
  const accuracy = subtopicAcc ?? topicAcc;

  let weaknessWeight: number;
  if (accuracy === null) weaknessWeight = 2;
  else if (accuracy < 0.5) weaknessWeight = 5;
  else if (accuracy < 0.65) weaknessWeight = 3;
  else if (accuracy < 0.8) weaknessWeight = 1;
  else weaknessWeight = 0.5;

  if (answeredQuestionIds.has(question.id)) {
    return { question, weight: 0, bucket: classifyBucket(accuracy), sourceType: 'practice' };
  }
  if (recentCorrectIds.has(question.id)) {
    weaknessWeight *= 0.5;
  }

  const diffLevels: Record<Difficulty, number> = { beginner: 0, intermediate: 1, advanced: 2 };
  const userLvl = diffLevels[userLevel];
  const qLvl = diffLevels[question.difficulty];
  const diff = Math.abs(userLvl - qLvl);
  const diffMultiplier = diff === 0 ? 2 : diff === 1 ? 1.5 : 0.5;

  const noveltyMultiplier = accuracy === null ? 1.5 : 1;

  const weight = weaknessWeight * diffMultiplier * noveltyMultiplier;
  const bucket = classifyBucket(accuracy);

  return { question, weight, bucket, sourceType: 'practice' };
}

// --- Course Question Adapter ---

function adaptCourseQuestions(courseData: Unit[]): { question: Question; lessonId: string }[] {
  const adapted: { question: Question; lessonId: string }[] = [];

  for (const unit of courseData) {
    const topicId = unit.topicId;
    if (!topicId) continue;

    for (const lesson of unit.lessons) {
      for (const cq of lesson.questions) {
        if (cq.type !== 'multiple-choice' || !cq.options || cq.correctIndex === undefined) continue;

        const q: Question = {
          id: cq.id,
          type: 'multiple-choice',
          topic: topicId,
          subtopic: lesson.title.toLowerCase().replace(/\s+/g, '-'),
          difficulty: 'beginner' as Difficulty,
          question: cq.question,
          options: cq.options.map((text, i) => ({ id: String.fromCharCode(97 + i), text })),
          correctAnswer: String.fromCharCode(97 + cq.correctIndex),
          explanation: cq.explanation,
          interviewInsight: '',
          commonMistake: '',
          tags: [],
          diagram: cq.diagram,
        } as Question;
        adapted.push({ question: q, lessonId: lesson.id });
      }
    }
  }

  return adapted;
}

// --- Main Selection Function ---

interface SmartPracticeOptions {
  topicId?: TopicId;
  subtopic?: string;
  count?: number;
}

interface SelectedQuestion {
  question: Question;
  sourceType: 'practice' | 'course';
  courseLessonId?: string;
}

export function selectSmartPracticeQuestions(
  practiceQuestions: Question[],
  courseData: Unit[],
  performance: UserPerformance,
  options: SmartPracticeOptions = {},
): SelectedQuestion[] {
  const count = options.count ?? 10;
  const userLevel = getUserLevel(performance.topicProgress);

  const scored: (ScoredQuestion & { courseLessonId?: string })[] = [];

  let practicePool = practiceQuestions;
  if (options.topicId) practicePool = practicePool.filter(q => q.topic === options.topicId);
  if (options.subtopic) practicePool = practicePool.filter(q => q.subtopic === options.subtopic);

  for (const q of practicePool) {
    const s = scoreQuestion(q, performance, userLevel);
    if (s.weight > 0) scored.push({ ...s, sourceType: 'practice' });
  }

  let courseAdapted = adaptCourseQuestions(courseData);
  if (options.topicId) courseAdapted = courseAdapted.filter(c => c.question.topic === options.topicId);

  for (const { question, lessonId } of courseAdapted) {
    const s = scoreQuestion(question, performance, userLevel);
    if (s.weight > 0) scored.push({ ...s, sourceType: 'course', courseLessonId: lessonId });
  }

  if (scored.length === 0) return [];

  const weak = scored.filter(s => s.bucket === 'weak').sort((a, b) => b.weight - a.weight);
  const medium = scored.filter(s => s.bucket === 'medium').sort((a, b) => b.weight - a.weight);
  const strong = scored.filter(s => s.bucket === 'strong').sort((a, b) => b.weight - a.weight);

  const selected: typeof scored = [];

  function pickFromBucket(bucket: typeof scored, target: number) {
    const shuffled = shuffleWeighted(bucket.filter(s => !selected.includes(s)));
    for (let i = 0; i < Math.min(target, shuffled.length); i++) {
      selected.push(shuffled[i]);
    }
  }

  pickFromBucket(weak, 6);
  pickFromBucket(medium, 2);
  pickFromBucket(strong, 2);

  if (selected.length < count) {
    const remaining = scored.filter(s => !selected.includes(s)).sort((a, b) => b.weight - a.weight);
    for (const s of remaining) {
      if (selected.length >= count) break;
      selected.push(s);
    }
  }

  const final = shuffleArray(selected.slice(0, count));

  return final.map(s => ({
    question: s.question,
    sourceType: s.sourceType,
    courseLessonId: s.courseLessonId,
  }));
}

function shuffleWeighted<T extends { weight: number }>(items: T[]): T[] {
  const result: T[] = [];
  const remaining = [...items];

  while (remaining.length > 0) {
    const totalWeight = remaining.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    let pickedIndex = 0;

    for (let i = 0; i < remaining.length; i++) {
      random -= remaining[i].weight;
      if (random <= 0) {
        pickedIndex = i;
        break;
      }
    }

    result.push(remaining[pickedIndex]);
    remaining.splice(pickedIndex, 1);
  }

  return result;
}

// --- Performance Builder ---

export function buildPerformance(
  topicProgress: TopicProgress[],
  sessionHistory: { date: string; topicsCovered: TopicId[] }[],
): UserPerformance {
  return {
    topicProgress,
    sessionHistory,
    answeredQuestionIds: new Set(),
    recentCorrectIds: new Set(),
  };
}
