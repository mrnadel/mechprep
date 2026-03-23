import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calculateXP, calculateMastery } from '@/lib/utils';
import { getLevelForXp, getXpToNextLevel, levels } from '@/data/levels';
import type { MultipleChoiceQuestion, Difficulty } from '@/data/types';

// --- Fixtures ---

function makeQuestion(
  difficulty: Difficulty = 'intermediate',
  type: string = 'multiple-choice',
): MultipleChoiceQuestion {
  return {
    id: `q-test-${difficulty}`,
    type: 'multiple-choice',
    topic: 'thermodynamics',
    subtopic: 'basics',
    difficulty,
    question: 'Test question',
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

// ==============================================================
// XP CALCULATIONS — COMPREHENSIVE TESTS
// ==============================================================

describe('XP Calculations', () => {
  describe('calculateXP — base XP by difficulty', () => {
    it('awards ~20 base XP for beginner correct answer (no bonuses)', () => {
      const q = makeQuestion('beginner');
      const xp = calculateXP(q, true, 60); // slow answer, no speed bonus
      expect(xp).toBe(20);
    });

    it('awards ~35 base XP for intermediate correct answer (no bonuses)', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 60);
      expect(xp).toBe(35);
    });

    it('awards ~55 base XP for advanced correct answer (no bonuses)', () => {
      const q = makeQuestion('advanced');
      const xp = calculateXP(q, true, 60);
      expect(xp).toBe(55);
    });
  });

  describe('calculateXP — incorrect answers', () => {
    it('awards 15% of base for incorrect beginner answer', () => {
      const q = makeQuestion('beginner');
      const xp = calculateXP(q, false, 60);
      expect(xp).toBe(Math.round(20 * 0.15)); // 3
    });

    it('awards 15% of base for incorrect intermediate answer', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, false, 60);
      expect(xp).toBe(Math.round(35 * 0.15)); // 5
    });

    it('awards 15% of base for incorrect advanced answer', () => {
      const q = makeQuestion('advanced');
      const xp = calculateXP(q, false, 60);
      expect(xp).toBe(Math.round(55 * 0.15)); // 8
    });

    it('awards same partial XP regardless of speed when incorrect', () => {
      const q = makeQuestion('intermediate');
      const xpFast = calculateXP(q, false, 5);
      const xpSlow = calculateXP(q, false, 120);
      expect(xpFast).toBe(xpSlow);
    });
  });

  describe('calculateXP — speed bonus', () => {
    it('awards 30% speed bonus for answers under 15 seconds', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 10);
      expect(xp).toBe(Math.round(35 * 1.3)); // 46
    });

    it('awards 15% speed bonus for answers between 15-30 seconds', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 20);
      expect(xp).toBe(Math.round(35 * 1.15)); // 40
    });

    it('awards no speed bonus for answers at exactly 30 seconds', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 30);
      // 30 seconds does NOT trigger the < 30 condition, so no speed bonus
      expect(xp).toBe(35);
    });

    it('awards no speed bonus for answers over 30 seconds', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 60);
      expect(xp).toBe(35);
    });

    it('awards 30% bonus at exactly 0 seconds', () => {
      const q = makeQuestion('advanced');
      const xp = calculateXP(q, true, 0);
      expect(xp).toBe(Math.round(55 * 1.3)); // 72
    });

    it('awards 30% bonus at exactly 14 seconds', () => {
      const q = makeQuestion('beginner');
      const xp = calculateXP(q, true, 14);
      expect(xp).toBe(Math.round(20 * 1.3)); // 26
    });

    it('awards 15% bonus at exactly 15 seconds', () => {
      const q = makeQuestion('beginner');
      const xp = calculateXP(q, true, 15);
      expect(xp).toBe(Math.round(20 * 1.15)); // 23
    });

    it('awards 15% bonus at exactly 29 seconds', () => {
      const q = makeQuestion('beginner');
      const xp = calculateXP(q, true, 29);
      expect(xp).toBe(Math.round(20 * 1.15)); // 23
    });
  });

  describe('calculateXP — confidence calibration bonus', () => {
    it('awards 10% bonus for high confidence (4+) correct answer', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 60, 4);
      expect(xp).toBe(Math.round(35 * 1.1)); // 39
    });

    it('awards 10% bonus for max confidence (5) correct answer', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 60, 5);
      expect(xp).toBe(Math.round(35 * 1.1)); // 39
    });

    it('awards 20% bonus for low confidence (1-2) correct answer (learning moment)', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 60, 1);
      expect(xp).toBe(Math.round(35 * 1.2)); // 42
    });

    it('awards 20% bonus for confidence=2 correct answer', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 60, 2);
      expect(xp).toBe(Math.round(35 * 1.2)); // 42
    });

    it('awards no confidence bonus for middle confidence (3)', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 60, 3);
      expect(xp).toBe(35);
    });

    it('stacks speed and confidence bonuses', () => {
      const q = makeQuestion('intermediate');
      // Fast (30% bonus) + high confidence (10% bonus)
      const xp = calculateXP(q, true, 10, 4);
      expect(xp).toBe(Math.round(35 * 1.3 * 1.1)); // 50
    });

    it('stacks speed and learning moment bonuses', () => {
      const q = makeQuestion('advanced');
      // Fast (30% bonus) + low confidence (20% bonus)
      const xp = calculateXP(q, true, 5, 1);
      expect(xp).toBe(Math.round(55 * 1.3 * 1.2)); // 86
    });

    it('does not apply confidence bonus to incorrect answers', () => {
      const q = makeQuestion('intermediate');
      const xpNoConf = calculateXP(q, false, 60);
      const xpWithConf = calculateXP(q, false, 60, 5);
      expect(xpNoConf).toBe(xpWithConf);
    });
  });

  describe('calculateXP — undefined confidence', () => {
    it('awards no confidence bonus when confidence is undefined', () => {
      const q = makeQuestion('intermediate');
      const xp = calculateXP(q, true, 60, undefined);
      expect(xp).toBe(35);
    });
  });

  describe('calculateMastery', () => {
    it('returns 0 when no questions attempted', () => {
      expect(calculateMastery(0, 0)).toBe(0);
    });

    it('returns 100 with 20+ questions and 100% accuracy', () => {
      expect(calculateMastery(20, 20)).toBe(100);
    });

    it('returns 50 with 20+ questions and 50% accuracy', () => {
      expect(calculateMastery(20, 10)).toBe(50);
    });

    it('returns lower value for fewer questions (volume factor)', () => {
      // 5 out of 5 correct, but only 5/20 volume = 25% volume
      const result = calculateMastery(5, 5);
      expect(result).toBe(Math.round(1.0 * 0.25 * 1 * 100)); // 25
    });

    it('volume factor caps at 20 questions', () => {
      const at20 = calculateMastery(20, 20);
      const at40 = calculateMastery(40, 40);
      expect(at20).toBe(at40); // both should be 100
    });

    it('applies recency factor', () => {
      const fullRecency = calculateMastery(20, 20, 1.0);
      const halfRecency = calculateMastery(20, 20, 0.5);
      expect(fullRecency).toBe(100);
      expect(halfRecency).toBe(50);
    });

    it('returns 0 with 0% accuracy even with many questions', () => {
      expect(calculateMastery(20, 0)).toBe(0);
    });

    it('handles single question correctly', () => {
      const result = calculateMastery(1, 1);
      // accuracy=1, volume=1/20=0.05, recency=1
      expect(result).toBe(Math.round(1.0 * 0.05 * 1 * 100)); // 5
    });
  });

  describe('Level-up thresholds', () => {
    it('level 1 requires 0 XP', () => {
      expect(getLevelForXp(0).level).toBe(1);
    });

    it('level 2 requires exactly 100 XP', () => {
      expect(getLevelForXp(99).level).toBe(1);
      expect(getLevelForXp(100).level).toBe(2);
    });

    it('level 5 requires exactly 850 XP', () => {
      expect(getLevelForXp(849).level).toBe(4);
      expect(getLevelForXp(850).level).toBe(5);
    });

    it('level 10 requires exactly 4500 XP', () => {
      expect(getLevelForXp(4499).level).toBe(9);
      expect(getLevelForXp(4500).level).toBe(10);
    });

    it('level 15 requires exactly 12500 XP', () => {
      expect(getLevelForXp(12500).level).toBe(15);
    });

    it('level 20 requires exactly 27000 XP', () => {
      expect(getLevelForXp(27000).level).toBe(20);
    });

    it('level 30 (max) requires exactly 100000 XP', () => {
      expect(getLevelForXp(100000).level).toBe(30);
    });

    it('caps at level 30 even with enormous XP', () => {
      expect(getLevelForXp(1000000).level).toBe(30);
    });

    it('XP-to-next-level returns 0 xpNeeded at max', () => {
      const result = getXpToNextLevel(100000);
      expect(result.xpNeeded).toBe(0);
      expect(result.next).toBeNull();
    });

    it('progress is between 0 and 1 for mid-level XP', () => {
      const result = getXpToNextLevel(5100); // between 4500 (lvl 10) and 5700 (lvl 11)
      expect(result.progress).toBeGreaterThanOrEqual(0);
      expect(result.progress).toBeLessThanOrEqual(1);
      expect(result.progress).toBeCloseTo(0.5);
    });

    it('all level thresholds are monotonically increasing', () => {
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i].xpRequired).toBeGreaterThan(levels[i - 1].xpRequired);
      }
    });

    it('there are exactly 30 levels', () => {
      expect(levels).toHaveLength(30);
      expect(levels[0].level).toBe(1);
      expect(levels[29].level).toBe(30);
    });
  });
});
