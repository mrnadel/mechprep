'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { course } from '@/data/course';
import { topics } from '@/data/topics';
import { shuffleArray } from '@/lib/utils';
import { useMasteryStore } from '@/store/useMasteryStore';
import { useStore } from '@/store/useStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import type { CourseProgress, ActiveLesson, LessonResult, Unit } from '@/data/course/types';
import type { AnswerEvent } from '@/data/mastery';
import type { TopicId } from '@/data/types';

export interface ChapterCompletion {
  unitIndex: number;
  isGolden: boolean;
}

interface CourseState {
  progress: CourseProgress;
  courseData: Unit[];
  activeLesson: ActiveLesson | null;
  lessonResult: LessonResult | null;
  chapterJustCompleted: ChapterCompletion | null;
  courseJustCompleted: boolean;

  // Actions — Content
  setCourseData: (data: Unit[]) => void;

  // Actions
  startLesson: (unitIndex: number, lessonIndex: number, golden?: boolean) => void;
  submitAnswer: (questionId: string, correct: boolean) => void;
  nextQuestion: () => void;
  completeLesson: () => void;
  exitLesson: () => void;
  dismissResult: () => void;
  dismissChapterCompletion: () => void;
  dismissCourseCompletion: () => void;

  // Debug
  debugSetProgress: (lessonCount: number) => void;

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
function getPreviousLessonId(courseData: Unit[], unitIndex: number, lessonIndex: number): string | null {
  if (unitIndex === 0 && lessonIndex === 0) return null;

  if (lessonIndex > 0) {
    return courseData[unitIndex].lessons[lessonIndex - 1].id;
  }

  // First lesson of a unit -> last lesson of previous unit
  const prevUnit = courseData[unitIndex - 1];
  return prevUnit.lessons[prevUnit.lessons.length - 1].id;
}

export const useCourseStore = create<CourseState>()(
  subscribeWithSelector(
  persist(
    (set, get) => ({
      progress: getDefaultProgress(),
      courseData: course as Unit[],
      activeLesson: null,
      lessonResult: null,
      chapterJustCompleted: null,
      courseJustCompleted: false,

      setCourseData: (data: Unit[]) => set({ courseData: data }),

      startLesson: (unitIndex: number, lessonIndex: number, golden?: boolean) => {
        const unit = get().courseData[unitIndex];
        const lesson = unit.lessons[lessonIndex];
        const allIds = lesson.questions.map((q) => q.id);
        const isGolden = golden === true;
        const existing = get().progress.completedLessons[lesson.id];

        let sessionQuestionIds: string[];
        const SESSION_SIZE = 10;

        if (isGolden) {
          // Golden session: pick questions the user hasn't seen before
          const seen = new Set(existing?.answeredQuestionIds ?? []);
          const unseen = allIds.filter((id) => !seen.has(id));
          // If fewer than 5 unseen, use all questions as comprehensive review
          const pool = unseen.length >= 5 ? unseen : allIds;
          sessionQuestionIds = shuffleArray(pool).slice(0, Math.min(SESSION_SIZE, pool.length));
        } else if (existing && existing.attempts > 0) {
          // Retry session (attempt 2 or 3): focus on questions not yet answered correctly
          const correctSet = new Set(existing.correctQuestionIds ?? []);
          const incorrectPool = allIds.filter((id) => !correctSet.has(id));
          // If enough incorrect questions, use those; otherwise pad with all
          const pool = incorrectPool.length >= 5 ? incorrectPool : allIds;
          const shuffled = shuffleArray(pool);
          sessionQuestionIds = shuffled.slice(0, Math.min(SESSION_SIZE, shuffled.length));
        } else {
          // First attempt: 10 random questions
          const shuffled = shuffleArray(allIds);
          sessionQuestionIds = shuffled.slice(0, Math.min(SESSION_SIZE, shuffled.length));
        }

        set({
          activeLesson: {
            unitIndex,
            lessonIndex,
            currentQuestionIndex: 0,
            answers: [],
            startTime: Date.now(),
            sessionQuestionIds,
            isGolden,
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

          const nextIndex = state.activeLesson.currentQuestionIndex + 1;

          if (nextIndex >= state.activeLesson.sessionQuestionIds.length) {
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

        const { unitIndex, lessonIndex, answers, sessionQuestionIds, isGolden } = state.activeLesson;
        const unit = get().courseData[unitIndex];
        const lesson = unit.lessons[lessonIndex];

        const totalQuestions = sessionQuestionIds.length;
        const correctAnswers = answers.filter((a) => a.correct).length;
        const accuracy = totalQuestions > 0
          ? Math.round((correctAnswers / totalQuestions) * 100)
          : 0;

        // Check if this is a new best or first completion
        const existingProgress = state.progress.completedLessons[lesson.id];
        const isFirstCompletion = !existingProgress;
        const isNewBest = isFirstCompletion || accuracy > existingProgress.bestAccuracy;

        // Merge answered question IDs
        const previousAnswered = existingProgress?.answeredQuestionIds ?? [];
        const mergedAnswered = [...new Set([...previousAnswered, ...sessionQuestionIds])];

        // Merge correct question IDs (questions answered correctly at least once)
        const previousCorrect = existingProgress?.correctQuestionIds ?? [];
        const newCorrect = answers.filter((a) => a.correct).map((a) => a.questionId);
        const mergedCorrect = [...new Set([...previousCorrect, ...newCorrect])];

        // Stars = attempt count (capped at 3), not accuracy
        const newAttempts = existingProgress ? existingProgress.attempts + 1 : 1;
        const stars = isGolden
          ? 3 // Golden always shows 3 stars
          : Math.min(newAttempts, 3);

        // XP based on accuracy performance within this session
        const accuracyMultiplier = calculateStars(accuracy); // 1-3 based on accuracy
        const xpEarned = lesson.xpReward * accuracyMultiplier;

        // Build updated lesson progress
        const updatedLessonProgress = {
          stars,
          bestAccuracy: existingProgress ? Math.max(existingProgress.bestAccuracy, accuracy) : accuracy,
          attempts: newAttempts,
          lastAttempted: getTodayString(),
          golden: isGolden ? true : (existingProgress?.golden ?? false),
          answeredQuestionIds: mergedAnswered,
          correctQuestionIds: mergedCorrect,
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
          isGolden,
        };

        const newCompletedLessons = {
          ...state.progress.completedLessons,
          [lesson.id]: updatedLessonProgress,
        };

        // Detect chapter (unit) completion:
        // All lessons in this unit must be completed
        const allUnitLessonsCompleted = unit.lessons.every(
          (l) => l.id in newCompletedLessons
        );

        // Check if this lesson was the one that completed the chapter
        // (it wasn't completed before, or it just went golden and now all are golden)
        const wasAlreadyAllCompleted = unit.lessons.every(
          (l) => l.id in state.progress.completedLessons
        );
        const allGolden = allUnitLessonsCompleted && unit.lessons.every(
          (l) => newCompletedLessons[l.id]?.golden
        );
        const wasAlreadyAllGolden = wasAlreadyAllCompleted && unit.lessons.every(
          (l) => state.progress.completedLessons[l.id]?.golden
        );

        // Trigger chapter completion if:
        // 1. All lessons just became completed (wasn't all-completed before), OR
        // 2. All lessons just became golden (wasn't all-golden before)
        let chapterJustCompleted: ChapterCompletion | null = null;
        if (allUnitLessonsCompleted && !wasAlreadyAllCompleted) {
          chapterJustCompleted = { unitIndex, isGolden: allGolden };
        } else if (allGolden && !wasAlreadyAllGolden) {
          chapterJustCompleted = { unitIndex, isGolden: true };
        }

        // Detect full course completion: all lessons across all units done
        let courseJustCompleted = false;
        if (chapterJustCompleted) {
          const allCourseData = get().courseData;
          courseJustCompleted = allCourseData.every((u) =>
            u.lessons.every((l) => l.id in newCompletedLessons)
          );
        }

        set({
          activeLesson: null,
          lessonResult: result,
          chapterJustCompleted,
          courseJustCompleted: courseJustCompleted || state.courseJustCompleted,
          progress: {
            ...state.progress,
            totalXp: newTotalXp,
            currentStreak: newStreak,
            longestStreak: Math.max(state.progress.longestStreak, newStreak),
            lastActiveDate: today,
            completedLessons: newCompletedLessons,
          },
        });
      },

      exitLesson: () => {
        set({ activeLesson: null });
      },

      dismissResult: () => {
        set({ lessonResult: null });
      },

      dismissChapterCompletion: () => {
        set({ chapterJustCompleted: null });
      },

      dismissCourseCompletion: () => {
        set({ courseJustCompleted: false });
      },

      debugSetProgress: (lessonCount: number) => {
        const completedLessons: CourseProgress['completedLessons'] = {};
        let xp = 0;
        let count = 0;
        const today = getTodayString();
        const courseData = get().courseData;

        // Track per-topic question counts for downstream stores
        const topicCounts: Record<string, { attempted: number; correct: number }> = {};
        const masteryEvents: AnswerEvent[] = [];

        for (const unit of courseData) {
          for (const lesson of unit.lessons) {
            if (count >= lessonCount) break;

            const GOLDEN_OFFSET = 6;
            const isGolden = count + GOLDEN_OFFSET < lessonCount;
            completedLessons[lesson.id] = {
              stars: isGolden ? 3 : Math.min(count + 1, 3),
              bestAccuracy: 95,
              attempts: isGolden ? 4 : Math.min(count + 1, 3),
              lastAttempted: today,
              golden: isGolden,
              answeredQuestionIds: isGolden
                ? lesson.questions.map(q => q.id)
                : lesson.questions.slice(0, 10).map(q => q.id),
              correctQuestionIds: isGolden
                ? lesson.questions.map(q => q.id)
                : lesson.questions.slice(0, 9).map(q => q.id),
            };
            xp += lesson.xpReward * 3;

            // Generate per-question data for mastery & skills
            if (unit.topicId) {
              if (!topicCounts[unit.topicId]) {
                topicCounts[unit.topicId] = { attempted: 0, correct: 0 };
              }

              for (let i = 0; i < lesson.questions.length; i++) {
                const q = lesson.questions[i];
                const correct = (i % 20) !== 19; // ~95% accuracy

                topicCounts[unit.topicId].attempted += 1;
                if (correct) topicCounts[unit.topicId].correct += 1;

                masteryEvents.push({
                  id: `debug-${q.id}`,
                  questionId: q.id,
                  topicId: unit.topicId as TopicId,
                  difficulty: 'intermediate',
                  correct,
                  source: 'course',
                  answeredAt: new Date().toISOString(),
                });
              }
            }

            count++;
          }
          if (count >= lessonCount) break;
        }

        // Build topic progress with subtopic distribution
        const topicProgress = Object.entries(topicCounts).map(([topicId, counts]) => {
          const topic = topics.find(t => t.id === topicId);
          const subtopicBreakdown: Record<string, { attempted: number; correct: number }> = {};

          if (topic && topic.subtopics.length > 0) {
            const n = topic.subtopics.length;
            const perSub = Math.floor(counts.attempted / n);
            const perSubCorrect = Math.floor(counts.correct / n);
            let remainderAttempted = counts.attempted - perSub * n;
            let remainderCorrect = counts.correct - perSubCorrect * n;

            for (const sub of topic.subtopics) {
              const extra = remainderAttempted > 0 ? 1 : 0;
              const extraCorrect = remainderCorrect > 0 ? 1 : 0;
              subtopicBreakdown[sub.name] = {
                attempted: perSub + extra,
                correct: perSubCorrect + extraCorrect,
              };
              remainderAttempted -= extra;
              remainderCorrect -= extraCorrect;
            }
          }

          return {
            topicId: topicId as TopicId,
            questionsAttempted: counts.attempted,
            questionsCorrect: counts.correct,
            averageConfidence: 0,
            lastAttempted: today,
            subtopicBreakdown,
          };
        });

        const totalQuestions = Object.values(topicCounts).reduce((sum, c) => sum + c.attempted, 0);
        const totalCorrect = Object.values(topicCounts).reduce((sum, c) => sum + c.correct, 0);
        const gemsEarned = lessonCount * 10;
        const streak = lessonCount > 0 ? Math.min(Math.ceil(lessonCount / 2), 14) : 0;

        // 1. Update course progress
        set({
          progress: {
            ...get().progress,
            totalXp: xp,
            completedLessons,
            lastActiveDate: lessonCount > 0 ? today : '',
            currentStreak: streak,
            longestStreak: Math.max(get().progress.longestStreak, streak),
          },
        });

        // 2. Sync mastery events
        useMasteryStore.getState().debugSetEvents(masteryEvents);

        // 3. Sync main store (skills, achievements, level)
        useStore.getState().debugSetFromCourse({
          topicProgress,
          totalQuestions,
          totalCorrect,
          totalXp: xp,
          streak,
        });

        // 4. Sync engagement (gems, league XP)
        useEngagementStore.getState().debugSetFromCourse({
          gems: gemsEarned,
          leagueXp: xp,
        });
      },

      isLessonUnlocked: (unitIndex: number, lessonIndex: number) => {
        // First lesson is always unlocked
        if (unitIndex === 0 && lessonIndex === 0) return true;

        const prevLessonId = getPreviousLessonId(get().courseData, unitIndex, lessonIndex);
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
      name: 'mechready-course',
      version: 1,
      partialize: (state) => ({ progress: state.progress }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<Pick<CourseState, 'progress'>> | undefined;
        if (!persisted?.progress) return currentState;

        const defaults = getDefaultProgress();
        // Migrate old lesson progress entries that lack golden/answeredQuestionIds
        const completedLessons = persisted.progress.completedLessons ?? defaults.completedLessons;
        const migratedLessons: Record<string, typeof completedLessons[string]> = {};
        for (const [id, lp] of Object.entries(completedLessons)) {
          migratedLessons[id] = {
            ...lp,
            golden: lp.golden ?? false,
            answeredQuestionIds: lp.answeredQuestionIds ?? [],
            correctQuestionIds: (lp as any).correctQuestionIds ?? [],
          };
        }

        return {
          ...currentState,
          progress: {
            displayName: persisted.progress.displayName ?? defaults.displayName,
            totalXp: persisted.progress.totalXp ?? defaults.totalXp,
            currentStreak: persisted.progress.currentStreak ?? defaults.currentStreak,
            longestStreak: persisted.progress.longestStreak ?? defaults.longestStreak,
            lastActiveDate: persisted.progress.lastActiveDate ?? defaults.lastActiveDate,
            completedLessons: migratedLessons,
          },
        };
      },
    }
  ))
);
