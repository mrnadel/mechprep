'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { courseMeta, loadUnitData } from '@/data/course/course-meta';
import { topics } from '@/data/topics';
import { shuffleArray, toLocalDateString, getYesterdayString } from '@/lib/utils';
import { LIMITS, isUnitUnlocked } from '@/lib/pricing';
import { useSubscriptionStore } from '@/hooks/useSubscription';
import { useMasteryStore } from '@/store/useMasteryStore';
import { useStore } from '@/store/useStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import type { CourseProgress, ActiveLesson, LessonResult, Unit } from '@/data/course/types';
import type { AnswerEvent } from '@/data/mastery';
import type { TopicId } from '@/data/types';
import { awardStreakMilestones } from '@/lib/streak-rewards';

interface ChapterCompletion {
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

  // Practice bridging
  creditPracticeAnswer: (questionId: string, correct: boolean) => void;

  // Debug
  debugSetProgress: (lessonCount: number, goldenCount?: number) => void;

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
    activeDays: [],
    completedLessons: {},
  };
}

function getTodayString(): string {
  return toLocalDateString(new Date());
}

const PASSING_ACCURACY = 70;
const SESSION_SIZE = 10;

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
    const unit = courseData[unitIndex];
    if (!unit?.lessons) return null;
    return unit.lessons[lessonIndex - 1]?.id ?? null;
  }

  // First lesson of a unit -> last lesson of previous unit
  const prevUnit = courseData[unitIndex - 1];
  if (!prevUnit?.lessons?.length) return null;
  return prevUnit.lessons[prevUnit.lessons.length - 1].id;
}

export const useCourseStore = create<CourseState>()(
  subscribeWithSelector(
  persist(
    (set, get) => ({
      progress: getDefaultProgress(),
      courseData: courseMeta as Unit[],
      activeLesson: null,
      lessonResult: null,
      chapterJustCompleted: null,
      courseJustCompleted: false,

      setCourseData: (data: Unit[]) => set({ courseData: data }),

      startLesson: (unitIndex: number, lessonIndex: number, golden?: boolean) => {
        // ── Client-side unit access check ──
        // Free users can only access unit 0; Pro users can access all units.
        const subStore = useSubscriptionStore.getState();
        const isDev = process.env.NODE_ENV === 'development';
        const activeTier = isDev && subStore.debugTierOverride ? subStore.debugTierOverride : subStore.tier;
        const isTrialing = subStore.status === 'trialing';
        const isPastDue = subStore.status === 'past_due';
        const effectiveTier = (isTrialing || isPastDue) ? 'pro' : activeTier;
        if (!isUnitUnlocked(LIMITS[effectiveTier].unlockedUnits, unitIndex)) {
          return; // Unit is locked for this tier
        }

        const unit = get().courseData[unitIndex];
        const lesson = unit.lessons[lessonIndex];

        // If questions are not loaded yet (lightweight metadata), load the
        // full unit data dynamically and then retry.
        if (lesson.questions.length === 0) {
          loadUnitData(unitIndex).then((fullUnit) => {
            // Patch courseData with the loaded unit
            const updated = [...get().courseData];
            updated[unitIndex] = fullUnit;
            set({ courseData: updated });
            // Retry with full data now available
            get().startLesson(unitIndex, lessonIndex, golden);
          });
          return;
        }

        const allIds = lesson.questions.map((q) => q.id);
        const isGolden = golden === true;
        const existing = get().progress.completedLessons[lesson.id];

        let sessionQuestionIds: string[];

        if (isGolden) {
          // Golden session: pick questions the user hasn't seen before
          const seen = new Set(existing?.answeredQuestionIds ?? []);
          const unseen = allIds.filter((id) => !seen.has(id));
          // If fewer than 5 unseen, use all questions as comprehensive review
          const pool = unseen.length >= 5 ? unseen : allIds;
          sessionQuestionIds = shuffleArray(pool).slice(0, Math.min(SESSION_SIZE, pool.length));
        } else if (existing && existing.answeredQuestionIds.length > 0) {
          // Retry session: focus on questions not yet answered correctly
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
        const passed = accuracy >= PASSING_ACCURACY;
        const wasPreviouslyPassed = existingProgress?.passed ?? false;
        const isFirstCompletion = !wasPreviouslyPassed && passed;
        const isNewBest = !existingProgress || accuracy > existingProgress.bestAccuracy;

        // Merge answered question IDs (always, even on failure — for retry pool)
        const previousAnswered = existingProgress?.answeredQuestionIds ?? [];
        const mergedAnswered = [...new Set([...previousAnswered, ...sessionQuestionIds])];

        // Merge correct question IDs (questions answered correctly at least once)
        const previousCorrect = existingProgress?.correctQuestionIds ?? [];
        const newCorrect = answers.filter((a) => a.correct).map((a) => a.questionId);
        const mergedCorrect = [...new Set([...previousCorrect, ...newCorrect])];

        // Only increment attempts on passing attempts — stars = successful attempt count
        const prevAttempts = existingProgress?.attempts ?? 0;
        const newAttempts = passed ? prevAttempts + 1 : prevAttempts;
        const stars = isGolden
          ? 3 // Golden always shows 3 stars
          : Math.min(newAttempts, 3);

        // XP based on accuracy performance within this session
        const isFlawless = accuracy === 100 && totalQuestions >= 3;
        const accuracyMultiplier = isFlawless ? 4 : calculateStars(accuracy); // 4x flawless, 1-3 otherwise
        // Double XP check with tamper validation
        const engState = useEngagementStore.getState();
        const doubleXpExpiry = engState.doubleXpExpiry;
        let isDoubleXp = false;
        if (doubleXpExpiry) {
          const expiry = new Date(doubleXpExpiry).getTime();
          const now = Date.now();
          if (!isNaN(expiry) && expiry > now && expiry <= now + 30 * 60 * 1000 + 5000) {
            const recentCutoff = now - (30 * 60 * 1000 + 5 * 60 * 1000);
            isDoubleXp = engState.gems.transactions.some(
              (t) => t.source === 'shop_purchase' && t.amount < 0 && new Date(t.timestamp).getTime() > recentCutoff
            );
          }
        }
        const xpEarned = lesson.xpReward * accuracyMultiplier * (isDoubleXp ? 2 : 1);

        // Build updated lesson progress
        const updatedLessonProgress = {
          stars,
          bestAccuracy: existingProgress ? Math.max(existingProgress.bestAccuracy, accuracy) : accuracy,
          attempts: newAttempts,
          lastAttempted: getTodayString(),
          passed: passed || wasPreviouslyPassed,
          golden: isGolden ? true : (existingProgress?.golden ?? false),
          answeredQuestionIds: mergedAnswered,
          correctQuestionIds: mergedCorrect,
        };

        // Update streak (with freeze support)
        const today = getTodayString();
        const yesterday = getYesterdayString();
        const lastActive = state.progress.lastActiveDate;

        let newStreak = state.progress.currentStreak;
        let streakFrozen = false;
        if (lastActive !== today) {
          if (lastActive === yesterday) {
            newStreak += 1;
          } else if (!lastActive) {
            newStreak = 1;
          } else {
            // Missed day(s) — check for streak freeze
            if (engState.streak.freezesOwned > 0 && newStreak > 0) {
              // Use a freeze to preserve the streak
              engState.useStreakFreeze();
              streakFrozen = true;
              newStreak += 1; // Continue as if no break
            } else {
              // Record the break for repair window
              if (newStreak > 0) {
                engState.recordStreakBreak(newStreak);
              }
              newStreak = 1; // Streak broken
            }
          }
        }
        // If lastActive === today, keep current streak unchanged

        // Track active days for week tracker (keep last 14 days)
        const existingDays = state.progress.activeDays ?? [];
        const updatedActiveDays = existingDays.includes(today)
          ? existingDays
          : [...existingDays, today].slice(-14);

        // Check and award streak milestones
        if (newStreak > (state.progress.currentStreak || 0)) {
          awardStreakMilestones(newStreak);
        }

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
          passed,
          isFlawless,
          isNewBest,
          isFirstCompletion,
          isGolden,
        };

        const newCompletedLessons = {
          ...state.progress.completedLessons,
          [lesson.id]: updatedLessonProgress,
        };

        // Detect chapter (unit) completion:
        // All lessons in this unit must be passed (>=70% accuracy)
        const allUnitLessonsCompleted = unit.lessons.every(
          (l) => newCompletedLessons[l.id]?.passed
        );

        // Check if this lesson was the one that completed the chapter
        // (it wasn't completed before, or it just went golden and now all are golden)
        const wasAlreadyAllCompleted = unit.lessons.every(
          (l) => state.progress.completedLessons[l.id]?.passed
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
            u.lessons.every((l) => newCompletedLessons[l.id]?.passed)
          );
        }

        set({
          lessonResult: result,
          chapterJustCompleted,
          courseJustCompleted: courseJustCompleted || state.courseJustCompleted,
          progress: {
            ...state.progress,
            totalXp: newTotalXp,
            currentStreak: newStreak,
            longestStreak: Math.max(state.progress.longestStreak, newStreak),
            lastActiveDate: today,
            activeDays: updatedActiveDays,
            completedLessons: newCompletedLessons,
          },
        });

        // Cross-store sync: keep practice store's streak in lockstep so
        // streak freeze/repair and comeback detection stay consistent
        // regardless of which mode the user practices in.
        useStore.setState((ps) => {
          const psActiveDays = ps.progress.activeDays ?? [];
          return {
            progress: {
              ...ps.progress,
              currentStreak: newStreak,
              longestStreak: Math.max(ps.progress.longestStreak, newStreak),
              lastActiveDate: today,
              activeDays: psActiveDays.includes(today)
                ? psActiveDays
                : [...psActiveDays, today].slice(-14),
            },
          };
        });
      },

      exitLesson: () => {
        set({ activeLesson: null });
      },

      dismissResult: () => {
        set({ lessonResult: null, activeLesson: null });
      },

      dismissChapterCompletion: () => {
        set({ chapterJustCompleted: null });
      },

      dismissCourseCompletion: () => {
        set({ courseJustCompleted: false });
      },

      creditPracticeAnswer: (questionId: string, correct: boolean) => {
        const courseData = get().courseData;
        let targetLessonId: string | null = null;

        for (const unit of courseData) {
          for (const lesson of unit.lessons) {
            if (lesson.questions.some(q => q.id === questionId)) {
              targetLessonId = lesson.id;
              break;
            }
          }
          if (targetLessonId) break;
        }

        if (!targetLessonId) return;

        set(state => {
          const existing = state.progress.completedLessons[targetLessonId!];

          const prevAnswered = existing?.answeredQuestionIds ?? [];
          const prevCorrect = existing?.correctQuestionIds ?? [];
          const newAnswered = prevAnswered.includes(questionId) ? prevAnswered : [...prevAnswered, questionId];
          const newCorrect = correct && !prevCorrect.includes(questionId)
            ? [...prevCorrect, questionId]
            : prevCorrect;

          if (!existing) {
            return state;
          }

          return {
            progress: {
              ...state.progress,
              completedLessons: {
                ...state.progress.completedLessons,
                [targetLessonId!]: {
                  ...existing,
                  answeredQuestionIds: newAnswered,
                  correctQuestionIds: newCorrect,
                },
              },
            },
          };
        });
      },

      debugSetProgress: (lessonCount: number, goldenCount?: number) => {
        // Load all unit data before running debug — units may still be lightweight metadata
        const courseData = get().courseData;
        const needsLoad = courseData.some(u => u.lessons.some(l => l.questions.length === 0));
        if (needsLoad) {
          Promise.all(courseData.map((_, i) => loadUnitData(i))).then((fullUnits) => {
            set({ courseData: fullUnits });
            // Retry with full data
            get().debugSetProgress(lessonCount, goldenCount);
          });
          return;
        }

        const completedLessons: CourseProgress['completedLessons'] = {};
        let xp = 0;
        let count = 0;
        const today = getTodayString();

        // Track per-topic question counts for downstream stores
        const topicCounts: Record<string, { attempted: number; correct: number }> = {};
        const masteryEvents: AnswerEvent[] = [];

        // Golden count: if explicitly provided, use it; otherwise auto-derive
        const effectiveGolden = goldenCount !== undefined ? goldenCount : Math.max(0, lessonCount - 6);

        for (const unit of courseData) {
          for (const lesson of unit.lessons) {
            if (count >= lessonCount) break;

            const isGolden = count < effectiveGolden;
            completedLessons[lesson.id] = {
              stars: isGolden ? 3 : Math.min(count + 1, 3),
              bestAccuracy: 95,
              attempts: isGolden ? 4 : Math.min(count + 1, 3),
              lastAttempted: today,
              passed: true,
              golden: isGolden,
              answeredQuestionIds: isGolden
                ? lesson.questions.map(q => q.id)
                : lesson.questions.slice(0, SESSION_SIZE).map(q => q.id),
              correctQuestionIds: isGolden
                ? lesson.questions.map(q => q.id)
                : lesson.questions.slice(0, SESSION_SIZE - 1).map(q => q.id),
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
        return progress.completedLessons[prevLessonId]?.passed === true;
      },

      getCompletedCount: () => {
        return Object.values(get().progress.completedLessons).filter(lp => lp.passed).length;
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
            passed: (lp as any).passed ?? (lp.attempts > 0),
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
            activeDays: (persisted.progress as any).activeDays ?? defaults.activeDays,
            completedLessons: migratedLessons,
          },
        };
      },
    }
  ))
);
