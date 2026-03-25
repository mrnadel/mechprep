import type { TopicId } from '../types';

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'teaching' | 'sort-buckets' | 'match-pairs' | 'order-steps' | 'multi-select' | 'slider-estimate' | 'scenario' | 'category-swipe' | 'rank-order' | 'pick-the-best' | 'image-tap';

export interface CourseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  // Multiple-choice
  options?: string[];
  correctIndex?: number;
  // True-false
  correctAnswer?: boolean;
  // Fill-blank (Duolingo word-bank style)
  blanks?: string[];       // correct answer for each _____ in order
  wordBank?: string[];     // all word choices (correct + distractors), shuffled at render
  acceptedAnswers?: string[]; // legacy fallback
  // Sort-buckets
  buckets?: string[];          // bucket labels (e.g. ["Need", "Want"])
  correctBuckets?: number[];   // correct bucket index for each option
  // Match-pairs
  matchTargets?: string[];     // right column items
  correctMatches?: number[];   // options[i] matches matchTargets[correctMatches[i]]
  // Order-steps
  steps?: string[];              // items to reorder
  correctOrder?: number[];       // correct sequence (indices into steps[])
  // Multi-select
  correctIndices?: number[];     // all correct option indices (uses options[])
  // Slider-estimate
  sliderMin?: number;
  sliderMax?: number;
  correctValue?: number;
  tolerance?: number;            // % tolerance (e.g. 10 = within 10% is correct)
  unit?: string;                 // display unit ("$", "%", "years", etc.)
  // Scenario
  scenario?: string;             // the situation/story text (uses options[] + correctIndex)
  // Category-swipe (reuses options[], buckets[0]=left, buckets[1]=right, correctBuckets[])
  // Rank-order (reuses steps[], correctOrder[])
  rankCriteria?: string;         // e.g. "Risk level: lowest → highest"
  // Pick-the-best (reuses options[], correctIndex — all options are valid, one is BEST)
  // Image-tap
  tapZones?: { id: string; label: string; x: number; y: number; w: number; h: number }[];
  correctZoneId?: string;
  // Common
  explanation: string;
  hint?: string;
  diagram?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  questions: CourseQuestion[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  topicId?: TopicId;
  lessons: Lesson[];
}

interface LessonProgress {
  stars: number;       // 1-3 based on successful attempt count (not accuracy)
  bestAccuracy: number;
  attempts: number;    // incremented on every completion
  lastAttempted: string;
  passed: boolean;                // true once user completes the lesson
  golden: boolean;                // achieved golden mastery
  answeredQuestionIds: string[];  // questions seen across all attempts
  correctQuestionIds: string[];   // questions answered correctly at least once
}

export interface CourseProgress {
  displayName: string;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  activeDays: string[];  // YYYY-MM-DD dates of recent activity (last 14 days, local only)
  completedLessons: Record<string, LessonProgress>;
}

export interface ActiveLesson {
  unitIndex: number;
  lessonIndex: number;
  currentQuestionIndex: number;
  answers: { questionId: string; correct: boolean }[];
  startTime: number;
  sessionQuestionIds: string[];
  isGolden: boolean;
}

export interface LessonResult {
  lessonId: string;
  unitTitle: string;
  lessonTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  accuracy: number;
  stars: number;
  passed: boolean;        // always true (completing = passing)
  isFlawless: boolean;    // true if 100% accuracy with >= 3 questions
  isNewBest: boolean;
  isFirstCompletion: boolean;
  isGolden: boolean;
}

// ─── Placement Test ──────────────────────────────────────────────

export interface PlacementTest {
  targetUnitIndex: number;
  fromUnitIndex: number;       // first skipped unit
  questions: CourseQuestion[];
  currentQuestionIndex: number;
  answers: { questionId: string; correct: boolean }[];
  mistakes: number;
  maxMistakes: number;
  startTime: number;
}

export interface PlacementTestResult {
  passed: boolean;
  targetUnitIndex: number;
  targetUnitTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  mistakes: number;
  maxMistakes: number;
  unitsSkipped: number;
}
