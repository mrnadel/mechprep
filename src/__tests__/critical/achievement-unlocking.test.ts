import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { TopicId, MultipleChoiceQuestion, Question, UserProgress, TopicProgress } from '@/data/types';

// Mock shuffleArray for predictable tests
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
import { achievements } from '@/data/achievements';

// --- Fixtures ---

function makeQuestion(
  id: string,
  overrides: Partial<MultipleChoiceQuestion> = {},
): MultipleChoiceQuestion {
  return {
    id,
    type: 'multiple-choice' as const,
    topic: 'thermodynamics' as TopicId,
    subtopic: 'basics',
    difficulty: 'intermediate' as const,
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
    ...overrides,
  } as MultipleChoiceQuestion;
}

function makeQuestionPool(count: number, topic: TopicId = 'thermodynamics'): Question[] {
  return Array.from({ length: count }, (_, i) => makeQuestion(`q-${topic}-${i}`, { topic }));
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

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

function resetStore(questionPool?: Question[]) {
  const questions = questionPool || [
    ...makeQuestionPool(30, 'thermodynamics'),
    ...makeQuestionPool(30, 'fluid-mechanics'),
    ...makeQuestionPool(30, 'strength-of-materials'),
  ];
  useStore.setState({
    progress: getDefaultProgress(),
    questions,
    session: null,
    sessionSummary: null,
    sidebarOpen: false,
    showAchievementToast: null,
  });
}

/**
 * Start session, set answers directly (bypasses answerQuestion to control lastActiveDate),
 * and include the correct totalQuestionsCorrect/Attempted in progress so achievement
 * checks work correctly.
 */
function setupAndComplete(
  correctCount: number,
  progressOverrides: Partial<UserProgress> = {},
) {
  // Build progress with correct counters
  const baseProgress = { ...getDefaultProgress(), ...progressOverrides };

  useStore.setState({ progress: baseProgress });

  useStore.getState().startSession('adaptive');
  const questions = useStore.getState().session!.questions;
  const answers: Record<string, { correct: boolean; confidence?: number; timeSpent: number; xpAwarded: number }> = {};
  for (let i = 0; i < questions.length; i++) {
    answers[questions[i].id] = { correct: i < correctCount, timeSpent: 20, xpAwarded: 10 };
  }
  useStore.setState({
    session: { ...useStore.getState().session!, answers },
  });

  useStore.getState().completeSession();
}

// ==============================================================
// ACHIEVEMENT UNLOCKING — COMPREHENSIVE TESTS
// ==============================================================

describe('Achievement Unlocking', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('Achievement data integrity', () => {
    it('has at least 25 achievements defined', () => {
      expect(achievements.length).toBeGreaterThanOrEqual(25);
    });

    it('all achievements have unique IDs', () => {
      const ids = achievements.map(a => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('all achievements have positive XP rewards', () => {
      for (const ach of achievements) {
        expect(ach.xpReward).toBeGreaterThan(0);
      }
    });

    it('achievements span all 6 categories', () => {
      const categories = new Set(achievements.map(a => a.category));
      expect(categories).toContain('knowledge');
      expect(categories).toContain('consistency');
      expect(categories).toContain('challenge');
      expect(categories).toContain('exploration');
      expect(categories).toContain('mastery');
      expect(categories).toContain('hidden');
    });

    it('all achievements have non-empty name and description', () => {
      for (const ach of achievements) {
        expect(ach.name.length).toBeGreaterThan(0);
        expect(ach.description.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Knowledge achievements', () => {
    it('unlocks ach-first-correct on first correct answer', () => {
      // Set totalQuestionsCorrect to simulate having answered 1 question correctly
      // (normally done by answerQuestion, but we bypass it for lastActiveDate control)
      setupAndComplete(1, {
        lastActiveDate: getYesterday(),
        totalQuestionsCorrect: 1,
        totalQuestionsAttempted: 10,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-first-correct');
    });

    it('unlocks ach-ten-correct at 10 total correct answers', () => {
      setupAndComplete(5, {
        totalQuestionsCorrect: 10,
        totalQuestionsAttempted: 15,
        lastActiveDate: getYesterday(),
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-ten-correct');
    });

    it('does NOT unlock ach-ten-correct at 9 correct answers', () => {
      setupAndComplete(5, {
        totalQuestionsCorrect: 9,
        totalQuestionsAttempted: 15,
        lastActiveDate: getYesterday(),
      });
      expect(useStore.getState().progress.achievementsUnlocked).not.toContain('ach-ten-correct');
    });

    it('unlocks ach-fifty-correct at 50 correct answers', () => {
      setupAndComplete(5, {
        totalQuestionsCorrect: 50,
        totalQuestionsAttempted: 60,
        lastActiveDate: getYesterday(),
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-fifty-correct');
    });

    it('unlocks ach-hundred-correct at 100 correct answers', () => {
      setupAndComplete(5, {
        totalQuestionsCorrect: 100,
        totalQuestionsAttempted: 120,
        lastActiveDate: getYesterday(),
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-hundred-correct');
    });

    it('unlocks ach-perfect-session with 5+ all-correct answers in session', () => {
      setupAndComplete(10, {
        lastActiveDate: getYesterday(),
        totalQuestionsCorrect: 10,
        totalQuestionsAttempted: 10,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-perfect-session');
    });

    it('does NOT unlock ach-perfect-session with even one wrong answer', () => {
      setupAndComplete(9, {
        lastActiveDate: getYesterday(),
        totalQuestionsCorrect: 9,
        totalQuestionsAttempted: 10,
      });
      expect(useStore.getState().progress.achievementsUnlocked).not.toContain('ach-perfect-session');
    });
  });

  describe('Consistency achievements (streak-based)', () => {
    it('unlocks ach-streak-3 when streak reaches 3', () => {
      setupAndComplete(5, {
        currentStreak: 2,
        longestStreak: 2,
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 10,
        totalQuestionsCorrect: 5,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-streak-3');
    });

    it('unlocks ach-streak-7 when streak reaches 7', () => {
      setupAndComplete(5, {
        currentStreak: 6,
        longestStreak: 6,
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 10,
        totalQuestionsCorrect: 5,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-streak-7');
    });

    it('unlocks ach-streak-14 when longestStreak reaches 14', () => {
      setupAndComplete(5, {
        currentStreak: 13,
        longestStreak: 13,
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 10,
        totalQuestionsCorrect: 5,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-streak-14');
    });

    it('unlocks ach-streak-30 when longestStreak reaches 30', () => {
      setupAndComplete(5, {
        currentStreak: 29,
        longestStreak: 29,
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 10,
        totalQuestionsCorrect: 5,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-streak-30');
    });

    it('unlocks ach-daily-challenge-5 at 5 daily challenges', () => {
      useStore.setState({
        progress: {
          ...getDefaultProgress(),
          dailyChallengesCompleted: 4,
          lastActiveDate: getYesterday(),
          totalQuestionsAttempted: 10,
          totalQuestionsCorrect: 5,
        },
      });
      useStore.getState().startSession('daily-challenge');
      const questions = useStore.getState().session!.questions;
      const answers: Record<string, { correct: boolean; confidence?: number; timeSpent: number; xpAwarded: number }> = {};
      for (const q of questions) {
        answers[q.id] = { correct: true, timeSpent: 20, xpAwarded: 10 };
      }
      useStore.setState({
        session: { ...useStore.getState().session!, answers },
      });
      useStore.getState().completeSession();

      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-daily-challenge-5');
    });
  });

  describe('Exploration achievements', () => {
    it('unlocks ach-first-topic when totalQuestionsAttempted >= 1', () => {
      setupAndComplete(1, {
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 1,
        totalQuestionsCorrect: 1,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-first-topic');
    });

    it('unlocks ach-five-topics when 5 topics have been attempted', () => {
      const topics: TopicId[] = [
        'thermodynamics', 'fluid-mechanics', 'strength-of-materials',
        'heat-transfer', 'materials-engineering',
      ];

      const topicProgress: TopicProgress[] = topics.map(t => ({
        topicId: t,
        questionsAttempted: 5,
        questionsCorrect: 3,
        averageConfidence: 0,
        lastAttempted: '2026-03-23',
        subtopicBreakdown: {},
      }));

      setupAndComplete(5, {
        topicProgress,
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 25,
        totalQuestionsCorrect: 15,
      });

      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-five-topics');
    });

    it('does NOT unlock ach-five-topics with only 4 topics', () => {
      const topics: TopicId[] = [
        'thermodynamics', 'fluid-mechanics', 'strength-of-materials',
        'heat-transfer',
      ];

      const topicProgress: TopicProgress[] = topics.map(t => ({
        topicId: t,
        questionsAttempted: 5,
        questionsCorrect: 3,
        averageConfidence: 0,
        lastAttempted: '2026-03-23',
        subtopicBreakdown: {},
      }));

      setupAndComplete(5, {
        topicProgress,
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 20,
        totalQuestionsCorrect: 12,
      });

      expect(useStore.getState().progress.achievementsUnlocked).not.toContain('ach-five-topics');
    });

    it('unlocks ach-bookworm with 10+ bookmarks', () => {
      setupAndComplete(5, {
        bookmarkedQuestions: Array.from({ length: 10 }, (_, i) => `bm-${i}`),
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 10,
        totalQuestionsCorrect: 5,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-bookworm');
    });

    it('does NOT unlock ach-bookworm with 9 bookmarks', () => {
      setupAndComplete(5, {
        bookmarkedQuestions: Array.from({ length: 9 }, (_, i) => `bm-${i}`),
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 10,
        totalQuestionsCorrect: 5,
      });
      expect(useStore.getState().progress.achievementsUnlocked).not.toContain('ach-bookworm');
    });
  });

  describe('Mastery achievements', () => {
    it('unlocks ach-topic-master with 80%+ accuracy in a topic (10+ questions)', () => {
      setupAndComplete(5, {
        topicProgress: [{
          topicId: 'thermodynamics',
          questionsAttempted: 10,
          questionsCorrect: 9,
          averageConfidence: 0,
          lastAttempted: '2026-03-23',
          subtopicBreakdown: {},
        }],
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 10,
        totalQuestionsCorrect: 9,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-topic-master');
    });

    it('does NOT unlock ach-topic-master with <80% accuracy', () => {
      setupAndComplete(5, {
        topicProgress: [{
          topicId: 'thermodynamics',
          questionsAttempted: 10,
          questionsCorrect: 7,
          averageConfidence: 0,
          lastAttempted: '2026-03-23',
          subtopicBreakdown: {},
        }],
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 10,
        totalQuestionsCorrect: 7,
      });
      expect(useStore.getState().progress.achievementsUnlocked).not.toContain('ach-topic-master');
    });

    it('does NOT unlock ach-topic-master with <10 questions', () => {
      setupAndComplete(5, {
        topicProgress: [{
          topicId: 'thermodynamics',
          questionsAttempted: 5,
          questionsCorrect: 5,
          averageConfidence: 0,
          lastAttempted: '2026-03-23',
          subtopicBreakdown: {},
        }],
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 5,
        totalQuestionsCorrect: 5,
      });
      expect(useStore.getState().progress.achievementsUnlocked).not.toContain('ach-topic-master');
    });

    it('unlocks ach-multi-master with 5 topics at 80%+ accuracy', () => {
      const topics: TopicId[] = [
        'thermodynamics', 'fluid-mechanics', 'strength-of-materials',
        'heat-transfer', 'materials-engineering',
      ];

      const topicProgress: TopicProgress[] = topics.map(t => ({
        topicId: t,
        questionsAttempted: 10,
        questionsCorrect: 9,
        averageConfidence: 0,
        lastAttempted: '2026-03-23',
        subtopicBreakdown: {},
      }));

      setupAndComplete(5, {
        topicProgress,
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 50,
        totalQuestionsCorrect: 45,
      });

      expect(useStore.getState().progress.achievementsUnlocked).toContain('ach-multi-master');
    });

    it('does NOT unlock ach-multi-master with only 4 mastered topics', () => {
      const topics: TopicId[] = [
        'thermodynamics', 'fluid-mechanics', 'strength-of-materials',
        'heat-transfer',
      ];

      const topicProgress: TopicProgress[] = topics.map(t => ({
        topicId: t,
        questionsAttempted: 10,
        questionsCorrect: 9,
        averageConfidence: 0,
        lastAttempted: '2026-03-23',
        subtopicBreakdown: {},
      }));

      setupAndComplete(5, {
        topicProgress,
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 40,
        totalQuestionsCorrect: 36,
      });

      expect(useStore.getState().progress.achievementsUnlocked).not.toContain('ach-multi-master');
    });
  });

  describe('Achievement XP rewards', () => {
    it('achievement XP is added to total XP on unlock', () => {
      setupAndComplete(5, {
        lastActiveDate: getYesterday(),
        totalQuestionsCorrect: 1,
        totalQuestionsAttempted: 10,
      });

      const progress = useStore.getState().progress;
      // At least ach-first-correct and ach-first-topic should unlock
      const achievementIds = progress.achievementsUnlocked;
      expect(achievementIds.length).toBeGreaterThan(0);

      const achievementXp = achievementIds.reduce((sum, id) => {
        const ach = achievements.find(a => a.id === id);
        return sum + (ach?.xpReward ?? 0);
      }, 0);
      expect(achievementXp).toBeGreaterThan(0);
      // totalXp should include achievement XP + session xpAwarded
      expect(progress.totalXp).toBeGreaterThanOrEqual(achievementXp);
    });

    it('level updates when achievement XP pushes past threshold', () => {
      // Set XP just below level 2 threshold (100)
      setupAndComplete(10, {
        lastActiveDate: getYesterday(),
        totalXp: 90,
        totalQuestionsCorrect: 1,
        totalQuestionsAttempted: 10,
      });

      const progress = useStore.getState().progress;
      // ach-first-correct gives 50 XP, so 90 + 50 + session XP should push past 100
      if (progress.totalXp >= 100) {
        expect(progress.currentLevel).toBeGreaterThanOrEqual(2);
      }
    });
  });

  describe('No duplicate achievements', () => {
    it('does not award the same achievement twice', () => {
      setupAndComplete(5, {
        achievementsUnlocked: ['ach-first-correct', 'ach-first-topic'],
        totalQuestionsCorrect: 50,
        totalQuestionsAttempted: 60,
        lastActiveDate: getYesterday(),
      });

      const unlocked = useStore.getState().progress.achievementsUnlocked;
      const counts = unlocked.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      for (const [id, count] of Object.entries(counts)) {
        expect(count).toBe(1);
      }
    });

    it('pre-existing achievements are preserved', () => {
      setupAndComplete(5, {
        achievementsUnlocked: ['ach-first-correct', 'ach-first-topic'],
        totalQuestionsCorrect: 50,
        totalQuestionsAttempted: 60,
        lastActiveDate: getYesterday(),
      });

      const unlocked = useStore.getState().progress.achievementsUnlocked;
      expect(unlocked).toContain('ach-first-correct');
      expect(unlocked).toContain('ach-first-topic');
    });
  });

  describe('Achievement toast', () => {
    it('sets showAchievementToast to first new achievement', () => {
      setupAndComplete(5, {
        lastActiveDate: getYesterday(),
        totalQuestionsCorrect: 1,
        totalQuestionsAttempted: 10,
      });
      const toast = useStore.getState().showAchievementToast;
      // Should have a toast since achievements were unlocked
      expect(toast).not.toBeNull();
    });

    it('dismissAchievementToast clears the toast', () => {
      useStore.setState({ showAchievementToast: 'ach-first-correct' });
      useStore.getState().dismissAchievementToast();
      expect(useStore.getState().showAchievementToast).toBeNull();
    });
  });

  describe('Edge cases', () => {
    it('handles empty achievementsUnlocked array gracefully', () => {
      setupAndComplete(1, {
        achievementsUnlocked: [],
        lastActiveDate: getYesterday(),
        totalQuestionsCorrect: 1,
        totalQuestionsAttempted: 10,
      });
      expect(Array.isArray(useStore.getState().progress.achievementsUnlocked)).toBe(true);
    });

    it('handles empty topicProgress gracefully', () => {
      setupAndComplete(1, {
        topicProgress: [],
        lastActiveDate: getYesterday(),
        totalQuestionsCorrect: 1,
        totalQuestionsAttempted: 10,
      });
      expect(useStore.getState().progress.achievementsUnlocked).toBeDefined();
    });

    it('completeSession with no session does nothing', () => {
      useStore.setState({ session: null });
      useStore.getState().completeSession();
      expect(useStore.getState().progress.achievementsUnlocked).toEqual([]);
    });

    it('achievement check does not crash on zero-division for topic accuracy', () => {
      setupAndComplete(5, {
        topicProgress: [{
          topicId: 'thermodynamics',
          questionsAttempted: 0,
          questionsCorrect: 0,
          averageConfidence: 0,
          lastAttempted: '',
          subtopicBreakdown: {},
        }],
        lastActiveDate: getYesterday(),
        totalQuestionsAttempted: 10,
        totalQuestionsCorrect: 5,
      });
      // Should not crash
      expect(useStore.getState().progress).toBeDefined();
    });
  });
});
