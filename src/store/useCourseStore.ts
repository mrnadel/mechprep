'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { loadUnitData, getCourseMetaForProfession } from '@/data/course/course-meta';
import { PROFESSION_ID } from '@/data/professions';
import { SESSION_SIZE as SESSION_SIZE_CONFIG, STAR_THRESHOLDS, DOUBLE_XP_BUFFER_MS, DOUBLE_XP_RECENT_PURCHASE_WINDOW_MS } from '@/lib/game-config';
import { STORAGE_KEYS } from '@/lib/storage-keys';
import { topics } from '@/data/topics';
import { toLocalDateString, getYesterdayString, shuffleArray } from '@/lib/utils';
import { LIMITS, isUnitUnlocked } from '@/lib/pricing';
import { useSubscriptionStore } from '@/hooks/useSubscription';
import { useMasteryStore } from '@/store/useMasteryStore';
import { useStore } from '@/store/useStore';
import { useEngagementStore, grantTitle, grantFrame } from '@/store/useEngagementStore';
import type { CourseProgress, CourseIntroData, ActiveLesson, LessonResult, PlacementTest, PlacementTestResult, Unit, Lesson } from '@/data/course/types';
import { generatePlacementQuestions, getFirstIncompleteUnitIndex, getMaxMistakes, PLACEMENT_TEST_CONFIG } from '@/lib/placement-test';
import type { AnswerEvent } from '@/data/mastery';
import type { TopicId } from '@/data/types';
import { awardStreakMilestones } from '@/lib/streak-rewards';
import { DOUBLE_XP_SHOP_DURATION_MS } from '@/data/engagement-types';
import { getLevelForXp } from '@/data/levels';
import { getLevelReward, type LevelReward } from '@/data/level-rewards';
import { DEBUG_ALL_TYPES_UNIT } from '@/data/debug-all-question-types';

/** Check if a lesson's content is loaded (not just lightweight metadata). */
function isLessonContentLoaded(lesson: Lesson): boolean {
  const type = lesson.type ?? 'standard';
  switch (type) {
    case 'conversation':
      return (lesson.conversationNodes?.length ?? 0) > 0;
    case 'speed-round':
      return (lesson.speedQuestions?.length ?? 0) > 0;
    case 'timeline':
      return (lesson.timelineStages?.length ?? 0) > 0;
    case 'case-study':
      return (lesson.caseStudySections?.length ?? 0) > 0;
    default:
      return lesson.questions.length > 0;
  }
}

const MAX_SESSION_QUESTIONS = SESSION_SIZE_CONFIG;

/** Get gradable item IDs for the session based on lesson type. */
function getSessionIds(lesson: Lesson): string[] {
  const type = lesson.type ?? 'standard';
  switch (type) {
    case 'conversation':
      return (lesson.conversationNodes ?? [])
        .filter((n) => n.options && n.options.length > 0)
        .map((n) => n.id);
    case 'speed-round':
      return (lesson.speedQuestions ?? []).map((q) => q.id);
    case 'timeline':
      return (lesson.timelineStages ?? [])
        .filter((s) => s.choices && s.choices.length > 0)
        .map((s) => s.id);
    case 'case-study':
      return (lesson.caseStudySections ?? [])
        .filter((s) => s.checkpoint)
        .map((s) => s.checkpoint!.id);
    default:
      return lesson.questions.map((q) => q.id);
  }
}

interface ChapterCompletion {
  unitIndex: number;
  isGolden: boolean;
}

export type CelebrationEvent =
  | { type: 'level-up'; reward: LevelReward }
  | { type: 'streak-continued'; streak: number };

interface CourseState {
  progress: CourseProgress;
  courseData: Unit[];
  activeProfession: string;
  activeLesson: ActiveLesson | null;
  lessonResult: LessonResult | null;
  chapterJustCompleted: ChapterCompletion | null;
  courseJustCompleted: boolean;
  pendingCelebrations: CelebrationEvent[];
  contentLoadError: string | null;

  // Placement test state
  activePlacementTest: PlacementTest | null;
  placementTestResult: PlacementTestResult | null;

  // Actions — Content
  setCourseData: (data: Unit[]) => void;
  setActiveProfession: (id: string) => void;

  // Actions
  startLesson: (unitIndex: number, lessonIndex: number, golden?: boolean) => void;
  submitAnswer: (questionId: string, correct: boolean) => void;
  nextQuestion: () => void;
  completeLesson: () => void;
  exitLesson: () => void;
  dismissResult: () => void;
  dismissChapterCompletion: () => void;
  dismissCourseCompletion: () => void;
  dismissNextCelebration: () => void;
  dismissContentLoadError: () => void;

  // Placement test actions
  startPlacementTest: (targetUnitIndex: number) => void;
  submitPlacementAnswer: (questionId: string, correct: boolean) => void;
  nextPlacementQuestion: () => void;
  completePlacementTest: () => void;
  exitPlacementTest: () => void;
  dismissPlacementResult: () => void;

  // Course intro
  completeCourseIntro: (professionId: string, data: CourseIntroData) => void;
  hasCourseIntro: (professionId: string) => boolean;

  // Practice bridging
  creditPracticeAnswer: (questionId: string, correct: boolean) => void;

  // Debug
  debugSetProgress: (lessonCount: number, goldenCount?: number) => void;
  /** @internal — called by debugSetProgress after data is loaded */
  _applyDebugProgress: (lessonCount: number, goldenCount?: number) => void;
  debugSkipToUnit: (targetUnitIndex: number) => void;
  debugSkipToLesson: (unitIndex: number, lessonIndex: number) => void;
  debugStartAllTypes: () => void;

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

const SESSION_SIZE = SESSION_SIZE_CONFIG;

function calculateStars(accuracy: number): number {
  if (accuracy >= STAR_THRESHOLDS.THREE_STARS) return 3;
  if (accuracy >= STAR_THRESHOLDS.TWO_STARS) return 2;
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
      courseData: getCourseMetaForProfession(PROFESSION_ID.MECHANICAL_ENGINEERING) as Unit[],
      activeProfession: PROFESSION_ID.MECHANICAL_ENGINEERING,
      activeLesson: null,
      lessonResult: null,
      chapterJustCompleted: null,
      courseJustCompleted: false,
      pendingCelebrations: [],
      contentLoadError: null,
      activePlacementTest: null,
      placementTestResult: null,

      setCourseData: (data: Unit[]) => set({ courseData: data }),

      setActiveProfession: (id: string) => {
        const meta = getCourseMetaForProfession(id);
        set((s) => {
          // Restore per-profession placement (or clear if none)
          const introPlacement = s.progress.courseIntros?.[id]?.placementUnitIndex;
          return {
            activeProfession: id,
            courseData: meta as Unit[],
            activeLesson: null,
            lessonResult: null,
            chapterJustCompleted: null,
            courseJustCompleted: false,
            pendingCelebrations: [],
            contentLoadError: null,
            progress: { ...s.progress, placementUnitIndex: introPlacement },
          };
        });
      },

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

        // If content is not loaded yet (lightweight metadata), load the
        // full unit data dynamically and then retry.
        if (!isLessonContentLoaded(lesson)) {
          set({ contentLoadError: null });
          loadUnitData(unitIndex, get().activeProfession).then((fullUnit) => {
            // Patch courseData with the loaded unit
            const updated = [...get().courseData];
            updated[unitIndex] = fullUnit;
            set({ courseData: updated });
            // Verify data actually loaded before retrying (prevents infinite recursion)
            const loadedLesson = fullUnit.lessons[lessonIndex];
            if (loadedLesson && isLessonContentLoaded(loadedLesson)) {
              get().startLesson(unitIndex, lessonIndex, golden);
            } else {
              console.error('[startLesson] Unit data loaded but lesson content still empty:', unitIndex, lessonIndex);
              set({ contentLoadError: 'Lesson content could not be loaded. Please try again.' });
            }
          }).catch((err) => {
            console.error('[startLesson] Failed to load unit data:', err);
            set({ contentLoadError: 'Failed to load lesson. Check your connection and try again.' });
          });
          return;
        }

        const isGolden = golden === true;

        // Generate session IDs based on lesson type, capped at MAX_SESSION_QUESTIONS
        // Teaching cards are always included and placed at their natural position (front).
        const allIds = getSessionIds(lesson);
        const lessonType = lesson.type ?? 'standard';

        // Separate teaching IDs (preserve order) from regular question IDs
        const teachingIds = lessonType === 'standard'
          ? allIds.filter(id => lesson.questions.find(q => q.id === id)?.type === 'teaching')
          : [];
        const questionIds = lessonType === 'standard'
          ? allIds.filter(id => lesson.questions.find(q => q.id === id)?.type !== 'teaching')
          : allIds;

        let sessionQuestionIds: string[];
        const questionSlots = MAX_SESSION_QUESTIONS - teachingIds.length;

        if (questionIds.length <= questionSlots) {
          // All questions fit, keep teaching cards at front
          sessionQuestionIds = [...teachingIds, ...questionIds];
        } else {
          const existing = get().progress.completedLessons[lesson.id];
          const answered = new Set(existing?.answeredQuestionIds ?? []);
          const correct = new Set(existing?.correctQuestionIds ?? []);
          let selectedQuestions: string[];

          if (isGolden) {
            const unseen = questionIds.filter((id) => !answered.has(id));
            const seen = questionIds.filter((id) => answered.has(id));
            selectedQuestions = [...shuffleArray(unseen), ...shuffleArray(seen)].slice(0, questionSlots);
          } else if (existing && existing.attempts > 0) {
            const incorrect = questionIds.filter((id) => answered.has(id) && !correct.has(id));
            const rest = questionIds.filter((id) => !incorrect.includes(id));
            selectedQuestions = [...shuffleArray(incorrect), ...shuffleArray(rest)].slice(0, questionSlots);
          } else {
            selectedQuestions = shuffleArray(questionIds).slice(0, questionSlots);
          }

          sessionQuestionIds = [...teachingIds, ...selectedQuestions];
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

          const { unitIndex, lessonIndex } = state.activeLesson;
          const lesson = state.courseData[unitIndex]?.lessons[lessonIndex];
          const lessonType = lesson?.type ?? 'standard';

          // Re-queue wrong answers so the user must answer them correctly to finish
          const shouldRequeue = !correct && lessonType === 'standard';

          return {
            activeLesson: {
              ...state.activeLesson,
              answers: [
                ...state.activeLesson.answers,
                { questionId, correct },
              ],
              sessionQuestionIds: shouldRequeue
                ? [...state.activeLesson.sessionQuestionIds, questionId]
                : state.activeLesson.sessionQuestionIds,
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

        // Accuracy based on first attempt per unique question (excluding teaching cards).
        // Questions answered wrong get re-queued, so we only grade the first try.
        const questionMap = new Map(lesson.questions.map((q) => [q.id, q]));
        const firstAttempts = new Map<string, boolean>();
        for (const a of answers) {
          const q = questionMap.get(a.questionId);
          if (q?.type === 'teaching') continue;
          if (!firstAttempts.has(a.questionId)) {
            firstAttempts.set(a.questionId, a.correct);
          }
        }
        const totalQuestions = firstAttempts.size;
        const correctAnswers = [...firstAttempts.values()].filter(Boolean).length;
        const accuracy = totalQuestions > 0
          ? Math.round((correctAnswers / totalQuestions) * 100)
          : 0;

        // Check if this is a new best or first completion
        const existingProgress = state.progress.completedLessons[lesson.id];
        const passed = true; // Completing a lesson = passing (hearts gate progression)
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

        const prevAttempts = existingProgress?.attempts ?? 0;
        const newAttempts = prevAttempts + 1;
        const maxLevels = lesson.levels ?? 1;
        const stars = isGolden
          ? maxLevels // Golden = mastered, always max stars
          : Math.min(newAttempts, maxLevels);

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
          if (!isNaN(expiry) && expiry > now && expiry <= now + DOUBLE_XP_SHOP_DURATION_MS + DOUBLE_XP_BUFFER_MS) {
            const recentCutoff = now - (DOUBLE_XP_SHOP_DURATION_MS + DOUBLE_XP_RECENT_PURCHASE_WINDOW_MS);
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

        // Streak continued celebration (first lesson of the day)
        const celebrations: CelebrationEvent[] = [];
        const streakContinued = lastActive !== today && newStreak >= 2 && passed;
        if (streakContinued) {
          celebrations.push({ type: 'streak-continued', streak: newStreak });
        }

        // Detect level-up from XP gain
        const oldLevel = getLevelForXp(state.progress.totalXp);
        const newLevel = getLevelForXp(newTotalXp);
        if (newLevel.level > oldLevel.level) {
          // Check every level crossed (handles multi-level jumps)
          for (let lvl = oldLevel.level + 1; lvl <= newLevel.level; lvl++) {
            const reward = getLevelReward(lvl);
            if (reward) celebrations.push({ type: 'level-up', reward });
          }
        }

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
        // All lessons in this unit must be completed
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
          activeLesson: null,
          lessonResult: result,
          pendingCelebrations: celebrations,
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

      dismissNextCelebration: () => {
        const celebrations = get().pendingCelebrations;
        const current = celebrations[0];

        // Award rewards for the celebration being dismissed
        if (current?.type === 'level-up') {
          const { reward } = current;
          useEngagementStore.getState().addGems(reward.gems, `level_up_${reward.level}`);
          if (reward.streakFreeze) {
            useEngagementStore.setState((s) => ({
              streak: { ...s.streak, freezesOwned: s.streak.freezesOwned + 1 },
            }));
          }
          if (reward.titleId) grantTitle(reward.titleId);
          if (reward.frameId) grantFrame(reward.frameId);
        }

        set({ pendingCelebrations: celebrations.slice(1) });
      },

      dismissContentLoadError: () => {
        set({ contentLoadError: null });
      },

      // ── Placement Test Actions ────────────────────────────────────

      startPlacementTest: (targetUnitIndex: number) => {
        const { courseData, activeProfession, progress } = get();
        const fromUnit = getFirstIncompleteUnitIndex(courseData, progress.completedLessons);

        if (fromUnit >= targetUnitIndex) return; // nothing to skip

        // Ensure all units in the test range have their questions loaded
        const needsLoad: number[] = [];
        for (let i = fromUnit; i < targetUnitIndex; i++) {
          if (courseData[i]?.lessons.some((l) => l.questions.length === 0)) {
            needsLoad.push(i);
          }
        }

        if (needsLoad.length > 0) {
          Promise.all(
            needsLoad.map((i) =>
              loadUnitData(i, activeProfession).catch(() => null),
            ),
          ).then((loaded) => {
            const updated = [...get().courseData];
            needsLoad.forEach((unitIdx, j) => {
              if (loaded[j]) {
                updated[unitIdx] = loaded[j];
              }
            });
            set({ courseData: updated });

            // Proceed directly to question generation (no retry loop).
            // If some units still lack content, generatePlacementQuestions
            // will simply return fewer or zero questions, and the auto-pass
            // path below handles the empty case.
            const freshState = get();
            const questions = generatePlacementQuestions(
              freshState.courseData,
              freshState.progress.completedLessons,
              targetUnitIndex,
            );

            if (questions.length === 0) {
              // No testable content: auto-pass
              const today = getTodayString();
              const newCompleted = { ...freshState.progress.completedLessons };
              for (let ui = fromUnit; ui < targetUnitIndex; ui++) {
                for (const lesson of freshState.courseData[ui].lessons) {
                  if (!newCompleted[lesson.id]?.passed) {
                    newCompleted[lesson.id] = {
                      stars: 0, bestAccuracy: 0, attempts: 0,
                      lastAttempted: today, passed: true, golden: false,
                      answeredQuestionIds: [], correctQuestionIds: [],
                    };
                  }
                }
              }
              set({
                progress: { ...freshState.progress, completedLessons: newCompleted },
                placementTestResult: {
                  passed: true,
                  targetUnitIndex,
                  targetUnitTitle: freshState.courseData[targetUnitIndex]?.title ?? '',
                  totalQuestions: 0, correctAnswers: 0, mistakes: 0,
                  maxMistakes: getMaxMistakes(targetUnitIndex - fromUnit),
                  unitsSkipped: targetUnitIndex - fromUnit,
                  xpEarned: 0,
                  accuracy: 0,
                },
              });
              return;
            }

            set({
              activePlacementTest: {
                targetUnitIndex,
                fromUnitIndex: fromUnit,
                questions,
                currentQuestionIndex: 0,
                answers: [],
                mistakes: 0,
                maxMistakes: getMaxMistakes(targetUnitIndex - fromUnit),
                startTime: Date.now(),
              },
            });
          });
          return;
        }

        const questions = generatePlacementQuestions(
          courseData,
          progress.completedLessons,
          targetUnitIndex,
        );

        // No questions available (content not written yet) → auto-pass
        if (questions.length === 0) {
          const today = getTodayString();
          const newCompleted = { ...progress.completedLessons };
          for (let ui = fromUnit; ui < targetUnitIndex; ui++) {
            for (const lesson of courseData[ui].lessons) {
              if (!newCompleted[lesson.id]?.passed) {
                newCompleted[lesson.id] = {
                  stars: 0,
                  bestAccuracy: 0,
                  attempts: 0,
                  lastAttempted: today,
                  passed: true,
                  golden: false,
                  answeredQuestionIds: [],
                  correctQuestionIds: [],
                };
              }
            }
          }
          set({
            progress: { ...progress, completedLessons: newCompleted },
            placementTestResult: {
              passed: true,
              targetUnitIndex,
              targetUnitTitle: courseData[targetUnitIndex]?.title ?? '',
              totalQuestions: 0,
              correctAnswers: 0,
              mistakes: 0,
              maxMistakes: getMaxMistakes(targetUnitIndex - fromUnit),
              unitsSkipped: targetUnitIndex - fromUnit,
              xpEarned: 0,
              accuracy: 0,
            },
          });
          return;
        }

        set({
          activePlacementTest: {
            targetUnitIndex,
            fromUnitIndex: fromUnit,
            questions,
            currentQuestionIndex: 0,
            answers: [],
            mistakes: 0,
            maxMistakes: getMaxMistakes(targetUnitIndex - fromUnit),
            startTime: Date.now(),
          },
        });
      },

      submitPlacementAnswer: (questionId: string, correct: boolean) => {
        set((state) => {
          if (!state.activePlacementTest) return state;
          return {
            activePlacementTest: {
              ...state.activePlacementTest,
              answers: [
                ...state.activePlacementTest.answers,
                { questionId, correct },
              ],
              mistakes: state.activePlacementTest.mistakes + (correct ? 0 : 1),
            },
          };
        });
      },

      nextPlacementQuestion: () => {
        set((state) => {
          if (!state.activePlacementTest) return state;
          const next = state.activePlacementTest.currentQuestionIndex + 1;
          if (next >= state.activePlacementTest.questions.length) return state;
          return {
            activePlacementTest: {
              ...state.activePlacementTest,
              currentQuestionIndex: next,
            },
          };
        });
      },

      completePlacementTest: () => {
        const state = get();
        const test = state.activePlacementTest;
        if (!test) return;

        const correct = test.answers.filter((a) => a.correct).length;
        const passed = test.mistakes < test.maxMistakes;
        const accuracy = test.questions.length > 0
          ? Math.round((correct / test.questions.length) * 100)
          : 0;

        // XP: 10 per correct answer, bonus for high accuracy
        const baseXp = correct * 10;
        const xpEarned = passed
          ? (accuracy === 100 && test.questions.length >= 3 ? baseXp * 2 : baseXp)
          : Math.round(baseXp * 0.25);

        const { courseData, progress } = state;

        // On pass: mark all skipped lessons as passed
        let newCompleted = progress.completedLessons;
        if (passed) {
          const today = getTodayString();
          newCompleted = { ...progress.completedLessons };
          for (let ui = test.fromUnitIndex; ui < test.targetUnitIndex; ui++) {
            for (const lesson of courseData[ui].lessons) {
              if (!newCompleted[lesson.id]?.passed) {
                newCompleted[lesson.id] = {
                  stars: 0,
                  bestAccuracy: 0,
                  attempts: 0,
                  lastAttempted: today,
                  passed: true,
                  golden: false,
                  answeredQuestionIds: [],
                  correctQuestionIds: [],
                };
              }
            }
          }
        }

        const newTotalXp = progress.totalXp + xpEarned;

        set({
          activePlacementTest: null,
          placementTestResult: {
            passed,
            targetUnitIndex: test.targetUnitIndex,
            targetUnitTitle: courseData[test.targetUnitIndex]?.title ?? '',
            totalQuestions: test.questions.length,
            correctAnswers: correct,
            mistakes: test.mistakes,
            maxMistakes: test.maxMistakes,
            unitsSkipped: test.targetUnitIndex - test.fromUnitIndex,
            xpEarned,
            accuracy,
          },
          progress: passed
            ? { ...progress, completedLessons: newCompleted, totalXp: newTotalXp }
            : { ...progress, totalXp: newTotalXp },
        });
      },

      exitPlacementTest: () => {
        set({ activePlacementTest: null });
      },

      dismissPlacementResult: () => {
        set({ placementTestResult: null });
      },

      completeCourseIntro: (professionId: string, data: CourseIntroData) => {
        const { progress } = get();
        set({
          progress: {
            ...progress,
            courseIntros: {
              ...(progress.courseIntros ?? {}),
              [professionId]: data,
            },
          },
        });
      },

      hasCourseIntro: (professionId: string) => {
        return !!get().progress.courseIntros?.[professionId];
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
            // Lesson not formally started yet. Create a minimal entry so
            // practice-mode answers aren't silently lost.
            return {
              progress: {
                ...state.progress,
                completedLessons: {
                  ...state.progress.completedLessons,
                  [targetLessonId!]: {
                    stars: 0,
                    bestAccuracy: 0,
                    attempts: 0,
                    lastAttempted: new Date().toISOString().split('T')[0],
                    passed: false as boolean,
                    golden: false,
                    answeredQuestionIds: newAnswered,
                    correctQuestionIds: newCorrect,
                  },
                },
              },
            };
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
        // Load full unit data before running debug — units may still be lightweight metadata.
        // Some professions have units without content files; those stay lightweight.
        const courseData = get().courseData;
        const hasEmpty = courseData.some(u => u.lessons.some(l => l.questions.length === 0));

        if (hasEmpty) {
          Promise.all(
            courseData.map((u, i) =>
              u.lessons.some(l => l.questions.length === 0)
                ? loadUnitData(i, get().activeProfession).catch(() => u)
                : Promise.resolve(u)
            )
          ).then((fullUnits) => {
            set({ courseData: fullUnits });
            // Call the inner logic directly — never recurse to avoid infinite loops
            // when some units genuinely have no content files
            get()._applyDebugProgress(lessonCount, goldenCount);
          }).catch(() => {
            // Loading failed — apply progress with whatever data we have
            get()._applyDebugProgress(lessonCount, goldenCount);
          });
          return;
        }

        get()._applyDebugProgress(lessonCount, goldenCount);
      },

      _applyDebugProgress: (lessonCount: number, goldenCount?: number) => {
        const courseData = get().courseData;
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

      debugSkipToUnit: (targetUnitIndex: number) => {
        const { courseData, progress } = get();
        const fromUnit = getFirstIncompleteUnitIndex(courseData, progress.completedLessons);
        if (fromUnit >= targetUnitIndex) return;

        const today = getTodayString();
        const newCompleted = { ...progress.completedLessons };
        for (let ui = fromUnit; ui < targetUnitIndex; ui++) {
          for (const lesson of courseData[ui].lessons) {
            if (!newCompleted[lesson.id]?.passed) {
              newCompleted[lesson.id] = {
                stars: 0,
                bestAccuracy: 0,
                attempts: 0,
                lastAttempted: today,
                passed: true,
                golden: false,
                answeredQuestionIds: [],
                correctQuestionIds: [],
              };
            }
          }
        }
        set({ progress: { ...progress, completedLessons: newCompleted } });
      },

      debugSkipToLesson: (unitIndex: number, lessonIndex: number) => {
        const { courseData, progress } = get();
        const today = getTodayString();
        const newCompleted = { ...progress.completedLessons };
        // Mark all lessons in this unit up to (not including) the target as passed
        for (let li = 0; li < lessonIndex; li++) {
          const lesson = courseData[unitIndex]?.lessons[li];
          if (lesson && !newCompleted[lesson.id]?.passed) {
            newCompleted[lesson.id] = {
              stars: 0,
              bestAccuracy: 0,
              attempts: 0,
              lastAttempted: today,
              passed: true,
              golden: false,
              answeredQuestionIds: [],
              correctQuestionIds: [],
            };
          }
        }
        set({ progress: { ...progress, completedLessons: newCompleted } });
      },

      debugStartAllTypes: () => {
        const debugUnit = DEBUG_ALL_TYPES_UNIT;
        const debugUnitIndex = get().courseData.length;
        const updated = [...get().courseData, debugUnit];
        set({
          courseData: updated,
          activeLesson: {
            unitIndex: debugUnitIndex,
            lessonIndex: 0,
            currentQuestionIndex: 0,
            answers: [],
            startTime: Date.now(),
            sessionQuestionIds: debugUnit.lessons[0].questions.map(q => q.id),
            isGolden: false,
          },
          lessonResult: null,
        });
      },

      isLessonUnlocked: (unitIndex: number, lessonIndex: number) => {
        // First lesson of every unit is always unlocked
        if (lessonIndex === 0) return true;

        const { progress, courseData } = get();

        // Placement unlock: all lessons in units before placementUnitIndex are accessible,
        // plus the first lesson of the placement unit itself.
        const placement = progress.placementUnitIndex ?? 0;
        if (placement > 0) {
          if (unitIndex < placement) return true;
          if (unitIndex === placement && lessonIndex === 0) return true;
        }

        const prevLessonId = getPreviousLessonId(courseData, unitIndex, lessonIndex);
        if (!prevLessonId) return true;

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
      name: STORAGE_KEYS.COURSE,
      version: 1,
      partialize: (state) => ({ progress: state.progress, activeProfession: state.activeProfession }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<Pick<CourseState, 'progress' | 'activeProfession'>> | undefined;
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

        // Migrate split lessons: if original lesson is passed, also mark b/c sub-lessons as passed
        const splitMigrations: Record<string, string[]> = {
          'u1-L1': ['u1-L1b', 'u1-L1c'],
          'u1-L2': ['u1-L2b', 'u1-L2c'],
          'u1-L3': ['u1-L3b', 'u1-L3c'],
          'u1-L4': ['u1-L4b', 'u1-L4c'],
          'u1-L5': ['u1-L5b', 'u1-L5c'],
          'u2-L1': ['u2-L1b', 'u2-L1c'],
          'u2-L2': ['u2-L2b', 'u2-L2c'],
          'u2-L3': ['u2-L3b', 'u2-L3c'],
          'u2-L4': ['u2-L4b', 'u2-L4c'],
          'u2-L5': ['u2-L5b', 'u2-L5c'],
          'u2-L6': ['u2-L6b', 'u2-L6c'],
          'u3-L1': ['u3-L1b', 'u3-L1c'],
          'u3-L2': ['u3-L2b', 'u3-L2c'],
          'u3-L3': ['u3-L3b', 'u3-L3c'],
          'u3-L4': ['u3-L4b', 'u3-L4c'],
          'u3-L5': ['u3-L5b', 'u3-L5c'],
          'u3-L6': ['u3-L6b', 'u3-L6c'],
          'u3-L7': ['u3-L7b', 'u3-L7c'],
          'u4-L1': ['u4-L1b', 'u4-L1c'],
          'u4-L2': ['u4-L2b', 'u4-L2c'],
          'u4-L3': ['u4-L3b', 'u4-L3c'],
          'u4-L4': ['u4-L4b', 'u4-L4c'],
          'u4-L5': ['u4-L5b', 'u4-L5c'],
          'u5-L1': ['u5-L1b', 'u5-L1c'],
          'u5-L2': ['u5-L2b', 'u5-L2c'],
          'u5-L3': ['u5-L3b', 'u5-L3c'],
          'u5-L4': ['u5-L4b', 'u5-L4c'],
          'u5-L5': ['u5-L5b', 'u5-L5c'],
          'u5-L6': ['u5-L6b', 'u5-L6c'],
          'u6-L1': ['u6-L1b', 'u6-L1c'],
          'u6-L2': ['u6-L2b', 'u6-L2c'],
          'u6-L3': ['u6-L3b', 'u6-L3c'],
          'u6-L4': ['u6-L4b', 'u6-L4c'],
          'u6-L5': ['u6-L5b', 'u6-L5c'],
          'u7-L1': ['u7-L1b', 'u7-L1c'],
          'u7-L2': ['u7-L2b', 'u7-L2c'],
          'u7-L3': ['u7-L3b', 'u7-L3c'],
          'u7-L4': ['u7-L4b', 'u7-L4c'],
          'u7-L5': ['u7-L5b', 'u7-L5c'],
          'u7-L6': ['u7-L6b', 'u7-L6c'],
          'u8-L1': ['u8-L1b', 'u8-L1c'],
          'u8-L2': ['u8-L2b', 'u8-L2c'],
          'u8-L3': ['u8-L3b', 'u8-L3c'],
          'u8-L4': ['u8-L4b', 'u8-L4c'],
          'u8-L5': ['u8-L5b', 'u8-L5c'],
          'u9-L1': ['u9-L1b', 'u9-L1c'],
          'u9-L2': ['u9-L2b', 'u9-L2c'],
          'u9-L3': ['u9-L3b', 'u9-L3c'],
          'u9-L4': ['u9-L4b', 'u9-L4c'],
          'u9-L5': ['u9-L5b', 'u9-L5c'],
          'u10-L1': ['u10-L1b', 'u10-L1c'],
          'u10-L2': ['u10-L2b', 'u10-L2c'],
          'u10-L3': ['u10-L3b', 'u10-L3c'],
          'u10-L4': ['u10-L4b', 'u10-L4c'],
          'u10-L5': ['u10-L5b', 'u10-L5c'],
          'u10-L6': ['u10-L6b', 'u10-L6c'],
        };
        for (const [original, splits] of Object.entries(splitMigrations)) {
          if (migratedLessons[original]?.passed) {
            for (const splitId of splits) {
              if (!migratedLessons[splitId]) {
                migratedLessons[splitId] = { ...migratedLessons[original] };
              }
            }
          }
        }

        const restoredProfession = persisted.activeProfession ?? PROFESSION_ID.MECHANICAL_ENGINEERING;

        return {
          ...currentState,
          activeProfession: restoredProfession,
          courseData: getCourseMetaForProfession(restoredProfession) as Unit[],
          progress: {
            displayName: persisted.progress.displayName ?? defaults.displayName,
            totalXp: persisted.progress.totalXp ?? defaults.totalXp,
            currentStreak: persisted.progress.currentStreak ?? defaults.currentStreak,
            longestStreak: persisted.progress.longestStreak ?? defaults.longestStreak,
            lastActiveDate: persisted.progress.lastActiveDate ?? defaults.lastActiveDate,
            activeDays: (persisted.progress as any).activeDays ?? defaults.activeDays,
            completedLessons: migratedLessons,
            courseIntros: (persisted.progress as any).courseIntros ?? undefined,
            placementUnitIndex: (persisted.progress as any).placementUnitIndex ?? undefined,
          },
        };
      },
    }
  ))
);
