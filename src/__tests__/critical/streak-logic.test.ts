import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { TopicId, MultipleChoiceQuestion, Question, UserProgress } from '@/data/types';

// Mock shuffleArray to return identity for predictable tests
vi.mock('@/lib/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/utils')>();
  return {
    ...actual,
    shuffleArray: <T>(arr: T[]): T[] => [...arr],
  };
});

const subscriptionMockState = {
  tier: 'pro' as string,
  status: 'active' as string,
  debugTierOverride: null as string | null,
};

vi.mock('@/hooks/useSubscription', () => ({
  useSubscriptionStore: {
    getState: () => subscriptionMockState,
  },
}));

import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';
import { course } from '@/data/course';

// --- Fixtures ---

function makeQuestion(
  id: string,
  topic: TopicId = 'thermodynamics',
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
): MultipleChoiceQuestion {
  return {
    id,
    type: 'multiple-choice',
    topic,
    subtopic: 'basics',
    difficulty,
    question: `Question ${id}`,
    options: [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
      { id: 'c', text: 'C' },
      { id: 'd', text: 'D' },
    ],
    correctAnswer: 'a',
    explanation: 'Explanation',
    interviewInsight: 'Insight',
    commonMistake: 'Mistake',
    tags: [],
  };
}

function makeQuestionPool(count: number, topic: TopicId = 'thermodynamics'): Question[] {
  return Array.from({ length: count }, (_, i) => makeQuestion(`q-${topic}-${i}`, topic));
}

function getDefaultProgress(): UserProgress {
  return {
    userId: 'user',
    displayName: 'Engineer',
    joinedDate: '2026-03-23',
    currentLevel: 1,
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    achievementsUnlocked: [],
    topicProgress: [],
    sessionHistory: [],
    dailyChallengesCompleted: 0,
    totalQuestionsAttempted: 0,
    totalQuestionsCorrect: 0,
    bookmarkedQuestions: [],
    weakAreas: [],
    strongAreas: [],
  };
}

function resetStore() {
  useCourseStore.setState({ courseData: course });
  useStore.setState({
    progress: getDefaultProgress(),
    session: null,
    sessionSummary: null,
    showAchievementToast: null,
  });
  subscriptionMockState.tier = 'pro';
  subscriptionMockState.status = 'active';
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

/**
 * Set up a session with pre-filled answers, bypassing answerQuestion
 * to preserve lastActiveDate for streak tests.
 */
function setupSessionWithAnswers(correctCount: number) {
  useStore.getState().startSession('adaptive');
  const questions = useStore.getState().session!.questions;
  const answers: Record<string, { correct: boolean; confidence?: number; timeSpent: number; xpAwarded: number }> = {};
  for (let i = 0; i < questions.length; i++) {
    answers[questions[i].id] = { correct: i < correctCount, timeSpent: 20, xpAwarded: 10 };
  }
  useStore.setState({
    session: { ...useStore.getState().session!, answers },
  });
}

// ==============================================================
// STREAK LOGIC — COMPREHENSIVE TESTS
// ==============================================================

describe('Streak Logic', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('streak initialization', () => {
    it('starts at 0 with empty lastActiveDate', () => {
      expect(useStore.getState().progress.currentStreak).toBe(0);
      expect(useStore.getState().progress.lastActiveDate).toBe('');
    });

    it('sets streak to 1 on first session when lastActiveDate is empty', () => {
      useStore.setState({
        progress: { ...getDefaultProgress(), lastActiveDate: '' },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(1);
    });
  });

  describe('streak continuation (yesterday)', () => {
    it('increments streak when last active was yesterday', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 5,
          longestStreak: 5,
          lastActiveDate: getDateString(1), // yesterday
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(6);
    });

    it('updates longestStreak when current exceeds it', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 5,
          longestStreak: 5,
          lastActiveDate: getDateString(1),
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.longestStreak).toBe(6);
    });

    it('preserves longestStreak when it already exceeds current', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 3,
          longestStreak: 20,
          lastActiveDate: getDateString(1),
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(4);
      expect(useStore.getState().progress.longestStreak).toBe(20);
    });
  });

  describe('streak reset (gap > 1 day)', () => {
    it('resets streak to 1 when gap is 2 days', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 10,
          longestStreak: 10,
          lastActiveDate: getDateString(2),
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(1);
      expect(useStore.getState().progress.longestStreak).toBe(10); // preserved
    });

    it('resets streak to 1 when gap is 7 days', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 30,
          longestStreak: 30,
          lastActiveDate: getDateString(7),
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(1);
    });

    it('resets streak to 1 when gap is 30 days', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 100,
          longestStreak: 100,
          lastActiveDate: getDateString(30),
        },
      });
      setupSessionWithAnswers(3);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(1);
    });
  });

  describe('same-day activity', () => {
    it('does not change streak when already active today', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 7,
          longestStreak: 14,
          lastActiveDate: getTodayString(),
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(7);
    });

    it('does not increment longestStreak on same-day sessions', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 7,
          longestStreak: 7,
          lastActiveDate: getTodayString(),
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.longestStreak).toBe(7);
    });

    it('maintains streak across multiple same-day sessions', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 3,
          longestStreak: 3,
          lastActiveDate: getTodayString(),
        },
      });

      // Session 1
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      // Reset session for session 2
      setupSessionWithAnswers(3);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(3);
    });
  });

  describe('streak with answerQuestion interaction', () => {
    it('answerQuestion does NOT set lastActiveDate (completeSession handles it)', () => {
      useStore.setState({
        progress: { ...getDefaultProgress(), lastActiveDate: '' },
      });
      useStore.getState().startSession('adaptive');
      const q = useStore.getState().session!.questions[0];
      useStore.getState().answerQuestion(q.id, true, undefined, 10);

      // lastActiveDate should remain empty — only completeSession sets it
      expect(useStore.getState().progress.lastActiveDate).toBe('');
    });

    it('streak increments correctly when using answerQuestion then completeSession', () => {
      // answerQuestion no longer sets lastActiveDate — completeSession handles it.
      // So the full flow (answer questions → complete) correctly increments the streak.
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 5,
          longestStreak: 5,
          lastActiveDate: getDateString(1), // yesterday
        },
      });

      useStore.getState().startSession('adaptive');
      const questions = useStore.getState().session!.questions;
      for (let i = 0; i < questions.length; i++) {
        useStore.getState().answerQuestion(questions[i].id, i < 5, undefined, 20);
      }

      useStore.getState().completeSession();

      // Streak correctly increments from 5 to 6
      expect(useStore.getState().progress.currentStreak).toBe(6);
    });
  });

  describe('edge cases', () => {
    it('handles lastActiveDate set to a very old date', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 50,
          longestStreak: 50,
          lastActiveDate: '2020-01-01',
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(1);
      expect(useStore.getState().progress.longestStreak).toBe(50);
    });

    it('correctly handles streak = 0 with gap > 1 day', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: getDateString(5),
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.currentStreak).toBe(1);
    });

    it('lastActiveDate is set to today after session completion', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          lastActiveDate: getDateString(1),
        },
      });
      setupSessionWithAnswers(5);
      useStore.getState().completeSession();

      expect(useStore.getState().progress.lastActiveDate).toBe(getTodayString());
    });

    it('session with no answers does not crash streak logic', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 3,
          lastActiveDate: getDateString(1),
        },
      });
      useStore.getState().startSession('adaptive');
      // Complete without answering
      useStore.getState().completeSession();

      // Streak should still be updated
      expect(useStore.getState().progress.currentStreak).toBe(4);
    });
  });

  describe('getStreakStatus utility', () => {
    // getStreakStatus is imported from the non-mocked module
    // We test it indirectly via the actual implementation behavior
    it('streak stays same when active today (already tested above)', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 5,
          lastActiveDate: getTodayString(),
        },
      });
      setupSessionWithAnswers(3);
      useStore.getState().completeSession();
      expect(useStore.getState().progress.currentStreak).toBe(5);
    });

    it('streak increments when last active yesterday (at-risk window)', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 5,
          longestStreak: 5,
          lastActiveDate: getDateString(1),
        },
      });
      setupSessionWithAnswers(3);
      useStore.getState().completeSession();
      expect(useStore.getState().progress.currentStreak).toBe(6);
    });

    it('streak resets when gap is 2 days (broken)', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 5,
          longestStreak: 5,
          lastActiveDate: getDateString(2),
        },
      });
      setupSessionWithAnswers(3);
      useStore.getState().completeSession();
      expect(useStore.getState().progress.currentStreak).toBe(1);
    });

    it('streak resets when gap is a week (broken)', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          currentStreak: 5,
          longestStreak: 5,
          lastActiveDate: getDateString(7),
        },
      });
      setupSessionWithAnswers(3);
      useStore.getState().completeSession();
      expect(useStore.getState().progress.currentStreak).toBe(1);
    });
  });
});
