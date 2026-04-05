import type { TopicId, Difficulty } from './types';

export interface AnswerEvent {
  id: string;
  questionId: string;
  topicId: TopicId;
  subtopic?: string;
  difficulty: Difficulty;
  correct: boolean;
  source: 'practice' | 'course';
  answeredAt: string;
  /** Original option index the user selected (for distractor analytics). */
  selectedIndex?: number;
}

interface MasteryScore {
  topicId: TopicId;
  score: number;
  level: MasteryLevel;
  eventCount: number;
  lastPracticed: string | null;
}

type MasteryLevel = 'strong' | 'developing' | 'needs-work' | 'not-started';

const HALF_LIFE_DAYS = 14;
const CONFIDENCE_THRESHOLD = 8;
const DIFFICULTY_WEIGHTS: Record<Difficulty, number> = {
  beginner: 0.6,
  intermediate: 1.0,
  advanced: 1.5,
};

export function computeMastery(events: AnswerEvent[]): number {
  if (events.length === 0) return 0;

  const now = Date.now();
  let totalWeight = 0;
  let correctWeight = 0;

  for (const event of events) {
    const daysSince =
      (now - new Date(event.answeredAt).getTime()) / (1000 * 60 * 60 * 24);
    const recency = Math.pow(0.5, daysSince / HALF_LIFE_DAYS);
    const diffWeight = DIFFICULTY_WEIGHTS[event.difficulty];
    const weight = recency * diffWeight;

    totalWeight += weight;
    if (event.correct) correctWeight += weight;
  }

  const rawAccuracy = correctWeight / totalWeight;
  const confidence = Math.min(totalWeight / CONFIDENCE_THRESHOLD, 1.0);
  return Math.round(rawAccuracy * confidence * 100);
}

export function getMasteryLevel(score: number, eventCount: number): MasteryLevel {
  if (eventCount === 0) return 'not-started';
  if (score >= 75) return 'strong';
  if (score >= 40) return 'developing';
  return 'needs-work';
}

export function computeAllMastery(
  events: AnswerEvent[],
  topicIds: TopicId[]
): MasteryScore[] {
  return topicIds.map((topicId) => {
    const topicEvents = events.filter((e) => e.topicId === topicId);
    const score = computeMastery(topicEvents);
    const lastEvent = [...topicEvents]
      .sort((a, b) => new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime())[0];

    return {
      topicId,
      score,
      level: getMasteryLevel(score, topicEvents.length),
      eventCount: topicEvents.length,
      lastPracticed: lastEvent?.answeredAt?.split('T')[0] ?? null,
    };
  });
}
