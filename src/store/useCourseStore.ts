'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { course } from '@/data/course';
import type { CourseProgress, ActiveLesson, LessonResult } from '@/data/course/types';

interface CourseState {
  progress: CourseProgress;
  activeLesson: ActiveLesson | null;
  lessonResult: LessonResult | null;

  // Actions
  startLesson: (unitIndex: number, lessonIndex: number) => void;
  submitAnswer: (questionId: string, correct: boolean) => void;
  nextQuestion: () => void;
  completeLesson: () => void;
  exitLesson: () => void;
  dismissResult: () => void;

  // Helpers
  isLessonUnlocked: (unitIndex: number, lessonIndex: number) => boolean;
  getCompletedCount: () => number;
  getTotalXp: () => number;
}

function getDefaultProgress(): CourseProgress {
  return {
    displayName: 'Engineer',
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    completedLessons: {},
  };
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function calculateStars(accuracy: number): number {
  if (accuracy >= 90) return 3;
  if (accuracy >= 70) return 2;
  return 1;
}

/**
 * Given a flat linear index, return the previous lesson's ID.
 * Unit 0, Lesson 0 has no predecessor.
 */
function getPreviousLessonId(unitIndex: number, lessonIndex: number): string | null {
  if (unitIndex === 0 && lessonIndex === 0) return null;

  if (lessonIndex > 0) {
    return course[unitIndex].lessons[lessonIndex - 1].id;
  }

  // First lesson of a unit -> last lesson of previous unit
  const prevUnit = course[unitIndex - 1];
  return prevUnit.lessons[prevUnit.lessons.length - 1].id;
}

export const useCourseStore = create<CourseState>()(
  subscribeWithSelector(
  persist(
    (set, get) => ({
      progress: getDefaultProgress(),
      activeLesson: null,
      lessonResult: null,

      startLesson: (unitIndex: number, lessonIndex: number) => {
        set({
          activeLesson: {
            unitIndex,
            lessonIndex,
            currentQuestionIndex: 0,
            answers: [],
            startTime: Date.now(),
          },
          lessonResult: null,
        });
      },

      submitAnswer: (questionId: string, correct: boolean) => {
        set((state) => {
          if (!state.activeLesson) return state;

          return {
            activeLesson: {
              ...state.activeLesson,
              answers: [
                ...state.activeLesson.answers,
                { questionId, correct },
              ],
            },
          };
        });
      },

      nextQuestion: () => {
        set((state) => {
          if (!state.activeLesson) return state;

          const unit = course[state.activeLesson.unitIndex];
          const lesson = unit.lessons[state.activeLesson.lessonIndex];
          const nextIndex = state.activeLesson.currentQuestionIndex + 1;

          if (nextIndex >= lesson.questions.length) {
            return state; // No more questions; use completeLesson instead
          }

          return {
            activeLesson: {
              ...state.activeLesson,
              currentQuestionIndex: nextIndex,
            },
          };
        });
      },

      completeLesson: () => {
        const state = get();
        if (!state.activeLesson) return;

        const { unitIndex, lessonIndex, answers } = state.activeLesson;
        const unit = course[unitIndex];
        const lesson = unit.lessons[lessonIndex];

        const totalQuestions = lesson.questions.length;
        const correctAnswers = answers.filter((a) => a.correct).length;
        const accuracy = totalQuestions > 0
          ? Math.round((correctAnswers / totalQuestions) * 100)
          : 0;
        const stars = calculateStars(accuracy);
        const xpEarned = lesson.xpReward * stars;

        // Check if this is a new best or first completion
        const existingProgress = state.progress.completedLessons[lesson.id];
        const isFirstCompletion = !existingProgress;
        const isNewBest = isFirstCompletion || accuracy > existingProgress.bestAccuracy;

        // Build updated lesson progress
        const updatedLessonProgress = {
          stars: existingProgress ? Math.max(existingProgress.stars, stars) : stars,
          bestAccuracy: existingProgress ? Math.max(existingProgress.bestAccuracy, accuracy) : accuracy,
          attempts: existingProgress ? existingProgress.attempts + 1 : 1,
          lastAttempted: getTodayString(),
        };

        // Update streak
        const today = getTodayString();
        const yesterday = getYesterdayString();
        const lastActive = state.progress.lastActiveDate;

        let newStreak = state.progress.currentStreak;
        if (lastActive !== today) {
          if (lastActive === yesterday) {
            newStreak += 1;
          } else if (!lastActive) {
            newStreak = 1;
          } else {
            newStreak = 1; // Streak broken
          }
        }
        // If lastActive === today, keep current streak unchanged

        const newTotalXp = state.progress.totalXp + xpEarned;

        const result: LessonResult = {
          lessonId: lesson.id,
          unitTitle: unit.title,
          lessonTitle: lesson.title,
          totalQuestions,
          correctAnswers,
          xpEarned,
          accuracy,
          stars,
          isNewBest,
          isFirstCompletion,
        };

        set({
          activeLesson: null,
          lessonResult: result,
          progress: {
            ...state.progress,
            totalXp: newTotalXp,
            currentStreak: newStreak,
            longestStreak: Math.max(state.progress.longestStreak, newStreak),
            lastActiveDate: today,
            completedLessons: {
              ...state.progress.completedLessons,
              [lesson.id]: updatedLessonProgress,
            },
          },
        });
      },

      exitLesson: () => {
        set({ activeLesson: null });
      },

      dismissResult: () => {
        set({ lessonResult: null });
      },

      isLessonUnlocked: (unitIndex: number, lessonIndex: number) => {
        // First lesson is always unlocked
        if (unitIndex === 0 && lessonIndex === 0) return true;

        const prevLessonId = getPreviousLessonId(unitIndex, lessonIndex);
        if (!prevLessonId) return true;

        const { progress } = get();
        return prevLessonId in progress.completedLessons;
      },

      getCompletedCount: () => {
        return Object.keys(get().progress.completedLessons).length;
      },

      getTotalXp: () => {
        return get().progress.totalXp;
      },
    }),
    {
      name: 'mechprep-course',
      version: 1,
      partialize: (state) => ({ progress: state.progress }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<Pick<CourseState, 'progress'>> | undefined;
        if (!persisted?.progress) return currentState;

        const defaults = getDefaultProgress();
        return {
          ...currentState,
          progress: {
            displayName: persisted.progress.displayName ?? defaults.displayName,
            totalXp: persisted.progress.totalXp ?? defaults.totalXp,
            currentStreak: persisted.progress.currentStreak ?? defaults.currentStreak,
            longestStreak: persisted.progress.longestStreak ?? defaults.longestStreak,
            lastActiveDate: persisted.progress.lastActiveDate ?? defaults.lastActiveDate,
            completedLessons: persisted.progress.completedLessons ?? defaults.completedLessons,
          },
        };
      },
    }
  ))
);
