import type { TopicId } from '../types';

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';

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

export interface LessonProgress {
  stars: number;       // 1-3 based on attempt count (not accuracy)
  bestAccuracy: number;
  attempts: number;
  lastAttempted: string;
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
  isNewBest: boolean;
  isFirstCompletion: boolean;
  isGolden: boolean;
}
