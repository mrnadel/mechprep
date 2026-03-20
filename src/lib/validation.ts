import { z } from 'zod';

// Password: 8+ chars, 1 uppercase, 1 number, 1 special character
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: passwordSchema,
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be at most 50 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be at most 50 characters'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
});

export const progressSyncSchema = z.object({
  progress: z.object({
    displayName: z.string().optional(),
    totalXp: z.number().int().min(0),
    currentStreak: z.number().int().min(0),
    longestStreak: z.number().int().min(0),
    lastActiveDate: z.string(),
    completedLessons: z.record(z.string(), z.unknown()).optional(),
    currentLevel: z.number().int().min(1).optional(),
    achievementsUnlocked: z.array(z.string()).optional(),
    dailyChallengesCompleted: z.number().int().min(0).optional(),
    totalQuestionsAttempted: z.number().int().min(0).optional(),
    totalQuestionsCorrect: z.number().int().min(0).optional(),
    bookmarkedQuestions: z.array(z.string()).optional(),
    weakAreas: z.array(z.string()).optional(),
    strongAreas: z.array(z.string()).optional(),
    topicProgress: z
      .array(
        z.object({
          topicId: z.string(),
          questionsAttempted: z.number().int().min(0),
          questionsCorrect: z.number().int().min(0),
          averageConfidence: z.number().min(0).max(1),
          lastAttempted: z.string(),
          subtopicBreakdown: z.record(
            z.string(),
            z.object({
              attempted: z.number().int().min(0),
              correct: z.number().int().min(0),
            })
          ),
        })
      )
      .optional(),
    sessionHistory: z
      .array(
        z.object({
          id: z.string(),
          date: z.string(),
          durationMinutes: z.number().int().min(0),
          questionsAttempted: z.number().int().min(0),
          questionsCorrect: z.number().int().min(0),
          topicsCovered: z.array(z.string()),
          xpEarned: z.number().int().min(0),
        })
      )
      .optional(),
  }),
});

// Helper to extract the first validation error message
export function getValidationError(result: { success: false; error: { issues: Array<{ message: string }> } } | { success: true }): string | null {
  if (result.success) return null;
  return result.error.issues[0]?.message ?? 'Invalid input';
}
