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

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
});

// Reasonable caps to prevent client-side cheating
const MAX_XP = 500_000;
const MAX_LEVEL = 50;
const MAX_STREAK = 3650; // 10 years
const MAX_QUESTIONS = 100_000;
const MAX_GEMS = 100_000;

export const progressSyncSchema = z.object({
  progress: z.object({
    displayName: z.string().min(2).max(50).optional(),
    totalXp: z.number().int().min(0).max(MAX_XP),
    currentStreak: z.number().int().min(0).max(MAX_STREAK),
    longestStreak: z.number().int().min(0).max(MAX_STREAK),
    lastActiveDate: z.string(),
    completedLessons: z.record(z.string(), z.unknown()).optional(),
    currentLevel: z.number().int().min(1).max(MAX_LEVEL).optional(),
    achievementsUnlocked: z.array(z.string()).max(100).optional(),
    dailyChallengesCompleted: z.number().int().min(0).max(MAX_QUESTIONS).optional(),
    totalQuestionsAttempted: z.number().int().min(0).max(MAX_QUESTIONS).optional(),
    totalQuestionsCorrect: z.number().int().min(0).max(MAX_QUESTIONS).optional(),
    bookmarkedQuestions: z.array(z.string()).max(500).optional(),
    weakAreas: z.array(z.string()).max(20).optional(),
    strongAreas: z.array(z.string()).max(20).optional(),
    activeDays: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).max(14).optional(),
    topicProgress: z
      .array(
        z.object({
          topicId: z.string(),
          questionsAttempted: z.number().int().min(0).max(MAX_QUESTIONS),
          questionsCorrect: z.number().int().min(0).max(MAX_QUESTIONS),
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
      .max(20)
      .optional(),
    sessionHistory: z
      .array(
        z.object({
          id: z.string(),
          date: z.string(),
          durationMinutes: z.number().int().min(0).max(600),
          questionsAttempted: z.number().int().min(0).max(200),
          questionsCorrect: z.number().int().min(0).max(200),
          topicsCovered: z.array(z.string()),
          xpEarned: z.number().int().min(0).max(5000),
        })
      )
      .max(50)
      .optional(),
  }),
  engagement: z.object({
    gems: z.object({
      balance: z.number().int().min(0).max(MAX_GEMS),
      totalEarned: z.number().int().min(0).max(MAX_GEMS),
    }).optional(),
    leagueTier: z.number().int().min(0).max(10).optional(),
    streakFreezes: z.number().int().min(0).max(10).optional(),
    streakMilestones: z.array(z.string()).max(20).optional(),
    weeklyXp: z.number().int().min(0).max(MAX_XP).optional(),
    weekStart: z.string().optional(),
    competitors: z.array(z.object({
      name: z.string().max(50),
      xp: z.number().int().min(0).max(MAX_XP),
      avatar: z.string().max(200).optional(),
      country: z.string().max(10).optional(),
    })).max(30).optional(),
    newGemTransactions: z.array(z.object({
      amount: z.number().int().min(-1000).max(1000),
      source: z.string().max(50),
    })).max(50).optional(),
  }).optional(),
});

export const courseProgressSyncSchema = z.object({
  progress: z.object({
    displayName: z.string().max(50).optional(),
    totalXp: z.number().int().min(0).max(MAX_XP),
    currentStreak: z.number().int().min(0).max(MAX_STREAK),
    longestStreak: z.number().int().min(0).max(MAX_STREAK),
    lastActiveDate: z.string(),
    placementUnitIndex: z.number().int().min(0).max(100).optional(),
    completedLessons: z.record(z.string(), z.object({
      stars: z.number().int().min(0).max(10),
      bestAccuracy: z.number().min(0).max(100),
      attempts: z.number().int().min(0),
      lastAttempted: z.string(),
    }).passthrough()).optional(),
    courseIntros: z.record(z.string(), z.unknown()).optional(),
  }).passthrough(),
  activeProfession: z.string().max(50).optional(),
});

// ── Engagement sync (dedicated /api/engagement endpoint) ──────────
export const engagementSyncSchema = z.object({
  gems: z.object({
    balance: z.number().int().min(0).max(MAX_GEMS),
    totalEarned: z.number().int().min(0).max(MAX_GEMS),
    inventory: z.object({
      activeTitles: z.array(z.string().max(100)).max(50),
      activeFrames: z.array(z.string().max(100)).max(50),
    }),
    selectedTitle: z.string().max(100).nullable(),
    selectedFrame: z.string().max(100).nullable(),
  }),
  streak: z.object({
    freezesOwned: z.number().int().min(0).max(10),
    milestonesReached: z.array(z.number().int().min(0)).max(50),
  }),
  hearts: z.object({
    current: z.number().int().min(0).max(10),
    lastRechargeAt: z.number().int().min(0),
  }),
  doubleXpExpiry: z.string().nullable(),
  quests: z.object({
    dailyQuests: z.array(z.unknown()).max(10),
    weeklyQuests: z.array(z.unknown()).max(10),
    dailyQuestDate: z.string().nullable(),
    weeklyQuestDate: z.string().nullable(),
    dailyChestClaimed: z.boolean(),
    weeklyChestClaimed: z.boolean(),
  }).optional(),
  newGemTransactions: z.array(z.object({
    amount: z.number().int().min(-1000).max(1000),
    source: z.string().max(50),
  })).max(50).optional(),
  // Gap 10: Daily reward calendar state
  dailyRewardCalendar: z.object({
    day: z.number().int().min(1).max(7),
    lastClaimDate: z.string().nullable(),
    weekStartDate: z.string(),
    claimedDays: z.array(z.number().int().min(1).max(7)).max(7),
  }).optional(),
});

// ── Friend quest endpoints (Gap 5) ──────────────────────────
export const friendQuestProgressSchema = z.object({
  events: z.array(z.object({
    event: z.enum(['xp_earned', 'lesson_completed', 'accuracy_report']),
    value: z.number().min(0).max(5000),
  })).min(1).max(5),
});

export const friendQuestClaimSchema = z.object({
  questId: z.string().uuid(),
});

// Helper to extract the first validation error message
export function getValidationError(result: { success: false; error: { issues: Array<{ message: string }> } } | { success: true }): string | null {
  if (result.success) return null;
  return result.error.issues[0]?.message ?? 'Invalid input';
}
