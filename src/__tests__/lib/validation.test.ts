import { describe, it, expect } from 'vitest';
import {
  registerSchema,
  changePasswordSchema,
  progressSyncSchema,
  getValidationError,
} from '@/lib/validation';

// ============================================================
// registerSchema
// ============================================================

describe('registerSchema', () => {
  const validData = {
    email: 'test@example.com',
    password: 'Pass1234!',
    displayName: 'John',
  };

  it('accepts valid registration data', () => {
    expect(registerSchema.safeParse(validData).success).toBe(true);
  });

  // --- email ---

  it('rejects missing email', () => {
    const { success } = registerSchema.safeParse({ ...validData, email: undefined });
    expect(success).toBe(false);
  });

  it('rejects invalid email format', () => {
    const { success } = registerSchema.safeParse({ ...validData, email: 'notanemail' });
    expect(success).toBe(false);
  });

  it('rejects empty email', () => {
    const { success } = registerSchema.safeParse({ ...validData, email: '' });
    expect(success).toBe(false);
  });

  // --- password ---

  it('rejects password shorter than 8 chars', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'Pa1!' });
    expect(result.success).toBe(false);
  });

  it('rejects password without uppercase', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'pass1234!' });
    expect(result.success).toBe(false);
  });

  it('rejects password without number', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'Password!' });
    expect(result.success).toBe(false);
  });

  it('rejects password without special character', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'Password1' });
    expect(result.success).toBe(false);
  });

  it('accepts password with all requirements', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'MyP@ss99' });
    expect(result.success).toBe(true);
  });

  // --- displayName ---

  it('rejects displayName shorter than 2 chars', () => {
    const result = registerSchema.safeParse({ ...validData, displayName: 'A' });
    expect(result.success).toBe(false);
  });

  it('rejects displayName longer than 50 chars', () => {
    const result = registerSchema.safeParse({ ...validData, displayName: 'A'.repeat(51) });
    expect(result.success).toBe(false);
  });

  it('accepts displayName at min boundary (2 chars)', () => {
    const result = registerSchema.safeParse({ ...validData, displayName: 'AB' });
    expect(result.success).toBe(true);
  });

  it('accepts displayName at max boundary (50 chars)', () => {
    const result = registerSchema.safeParse({ ...validData, displayName: 'A'.repeat(50) });
    expect(result.success).toBe(true);
  });
});


// ============================================================
// changePasswordSchema
// ============================================================

describe('changePasswordSchema', () => {
  it('accepts valid change password data', () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: 'anything',
      newPassword: 'NewP@ss1',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty currentPassword', () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: '',
      newPassword: 'NewP@ss1',
    });
    expect(result.success).toBe(false);
  });

  it('enforces password rules on newPassword', () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: 'old',
      newPassword: 'weak',
    });
    expect(result.success).toBe(false);
  });
});


// ============================================================
// progressSyncSchema
// ============================================================

describe('progressSyncSchema', () => {
  const minValid = {
    progress: {
      totalXp: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: '2025-01-01',
    },
  };

  it('accepts minimal valid progress', () => {
    expect(progressSyncSchema.safeParse(minValid).success).toBe(true);
  });

  it('rejects negative totalXp', () => {
    const data = { progress: { ...minValid.progress, totalXp: -1 } };
    expect(progressSyncSchema.safeParse(data).success).toBe(false);
  });

  it('rejects negative currentStreak', () => {
    const data = { progress: { ...minValid.progress, currentStreak: -1 } };
    expect(progressSyncSchema.safeParse(data).success).toBe(false);
  });

  it('rejects non-integer totalXp', () => {
    const data = { progress: { ...minValid.progress, totalXp: 1.5 } };
    expect(progressSyncSchema.safeParse(data).success).toBe(false);
  });

  it('accepts full progress with optional fields', () => {
    const full = {
      progress: {
        ...minValid.progress,
        displayName: 'Test',
        currentLevel: 5,
        achievementsUnlocked: ['a1', 'a2'],
        dailyChallengesCompleted: 3,
        totalQuestionsAttempted: 100,
        totalQuestionsCorrect: 80,
        bookmarkedQuestions: ['q1'],
        weakAreas: ['thermodynamics'],
        strongAreas: ['materials'],
        topicProgress: [
          {
            topicId: 'thermo',
            questionsAttempted: 10,
            questionsCorrect: 8,
            averageConfidence: 0.75,
            lastAttempted: '2025-01-15',
            subtopicBreakdown: {
              'first-law': { attempted: 5, correct: 4 },
            },
          },
        ],
        sessionHistory: [
          {
            id: 's1',
            date: '2025-01-15',
            durationMinutes: 15,
            questionsAttempted: 10,
            questionsCorrect: 8,
            topicsCovered: ['thermo'],
            xpEarned: 200,
          },
        ],
      },
    };
    expect(progressSyncSchema.safeParse(full).success).toBe(true);
  });

  it('rejects currentLevel < 1', () => {
    const data = { progress: { ...minValid.progress, currentLevel: 0 } };
    expect(progressSyncSchema.safeParse(data).success).toBe(false);
  });

  it('rejects topicProgress with averageConfidence > 1', () => {
    const data = {
      progress: {
        ...minValid.progress,
        topicProgress: [
          {
            topicId: 'thermo',
            questionsAttempted: 10,
            questionsCorrect: 8,
            averageConfidence: 1.5,
            lastAttempted: '2025-01-15',
            subtopicBreakdown: {},
          },
        ],
      },
    };
    expect(progressSyncSchema.safeParse(data).success).toBe(false);
  });

  it('rejects topicProgress with negative averageConfidence', () => {
    const data = {
      progress: {
        ...minValid.progress,
        topicProgress: [
          {
            topicId: 'thermo',
            questionsAttempted: 10,
            questionsCorrect: 8,
            averageConfidence: -0.1,
            lastAttempted: '2025-01-15',
            subtopicBreakdown: {},
          },
        ],
      },
    };
    expect(progressSyncSchema.safeParse(data).success).toBe(false);
  });
});

// ============================================================
// getValidationError()
// ============================================================

describe('getValidationError()', () => {
  it('returns null for successful result', () => {
    expect(getValidationError({ success: true })).toBeNull();
  });

  it('returns first error message for failed result', () => {
    const result = registerSchema.safeParse({ email: 'bad', password: 'x', displayName: '' });
    if (!result.success) {
      expect(getValidationError(result)).toBeTruthy();
      expect(typeof getValidationError(result)).toBe('string');
    }
  });

  it('returns "Invalid input" when issues array is empty', () => {
    const fakeResult = { success: false as const, error: { issues: [] } };
    expect(getValidationError(fakeResult)).toBe('Invalid input');
  });
});
