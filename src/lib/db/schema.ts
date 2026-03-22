import {
  pgTable,
  text,
  timestamp,
  integer,
  jsonb,
  real,
  boolean,
  primaryKey,
  uniqueIndex,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ─── Auth.js required tables ───────────────────────────────────

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  // Custom fields
  passwordHash: text('password_hash'),
  displayName: text('display_name'),
  joinedDate: text('joined_date'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const accounts = pgTable(
  'accounts',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

// ─── Custom app tables ─────────────────────────────────────────

export const userProgress = pgTable('user_progress', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  currentLevel: integer('current_level').default(1).notNull(),
  totalXp: integer('total_xp').default(0).notNull(),
  currentStreak: integer('current_streak').default(0).notNull(),
  longestStreak: integer('longest_streak').default(0).notNull(),
  lastActiveDate: text('last_active_date').default(''),
  achievementsUnlocked: jsonb('achievements_unlocked')
    .$type<string[]>()
    .default([]),
  dailyChallengesCompleted: integer('daily_challenges_completed')
    .default(0)
    .notNull(),
  totalQuestionsAttempted: integer('total_questions_attempted')
    .default(0)
    .notNull(),
  totalQuestionsCorrect: integer('total_questions_correct')
    .default(0)
    .notNull(),
  bookmarkedQuestions: jsonb('bookmarked_questions')
    .$type<string[]>()
    .default([]),
  weakAreas: jsonb('weak_areas').$type<string[]>().default([]),
  strongAreas: jsonb('strong_areas').$type<string[]>().default([]),
  streakFreezes: integer('streak_freezes').default(0),
  gemsBalance: integer('gems_balance').default(0),
  gemsTotalEarned: integer('gems_total_earned').default(0),
  streakMilestones: jsonb('streak_milestones').default([]),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const topicProgress = pgTable(
  'topic_progress',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    topicId: text('topic_id').notNull(),
    questionsAttempted: integer('questions_attempted').default(0).notNull(),
    questionsCorrect: integer('questions_correct').default(0).notNull(),
    averageConfidence: real('average_confidence').default(0).notNull(),
    lastAttempted: text('last_attempted').default(''),
    subtopicBreakdown: jsonb('subtopic_breakdown')
      .$type<Record<string, { attempted: number; correct: number }>>()
      .default({}),
  },
  (table) => [
    uniqueIndex('topic_progress_user_topic_idx').on(
      table.userId,
      table.topicId
    ),
  ]
);

export const sessionHistory = pgTable('session_history', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  sessionId: text('session_id').notNull(),
  date: text('date').notNull(),
  durationMinutes: integer('duration_minutes').default(0).notNull(),
  questionsAttempted: integer('questions_attempted').default(0).notNull(),
  questionsCorrect: integer('questions_correct').default(0).notNull(),
  topicsCovered: jsonb('topics_covered').$type<string[]>().default([]),
  xpEarned: integer('xp_earned').default(0).notNull(),
});

export const courseProgress = pgTable('course_progress', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  totalXp: integer('total_xp').default(0).notNull(),
  currentStreak: integer('current_streak').default(0).notNull(),
  longestStreak: integer('longest_streak').default(0).notNull(),
  lastActiveDate: text('last_active_date').default(''),
  completedLessons: jsonb('completed_lessons')
    .$type<
      Record<
        string,
        {
          stars: number;
          bestAccuracy: number;
          attempts: number;
          lastAttempted: string;
        }
      >
    >()
    .default({}),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

// ─── Subscription tables ──────────────────────────────────────

export const subscriptions = pgTable('subscriptions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  tier: text('tier').notNull().default('free'),           // 'free' | 'pro'
  status: text('status').notNull().default('active'),     // SubscriptionStatus
  paddleCustomerId: text('paddle_customer_id'),
  paddleSubscriptionId: text('paddle_subscription_id').unique(),
  paddlePriceId: text('paddle_price_id'),
  billingInterval: text('billing_interval'),              // 'month' | 'year'
  currentPeriodStart: text('current_period_start'),
  currentPeriodEnd: text('current_period_end'),
  trialStart: text('trial_start'),
  trialEnd: text('trial_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const paymentHistory = pgTable('payment_history', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  paddleTransactionId: text('paddle_transaction_id').unique(),
  amountCents: integer('amount_cents').notNull(),
  currency: text('currency').notNull().default('usd'),
  status: text('status').notNull(),                       // 'succeeded' | 'failed' | 'pending'
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
});

// ─── Pro Waitlist ────────────────────────────────────────────

export const proWaitlist = pgTable('pro_waitlist', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
});

// ─── Daily usage tracking (for free-tier limits) ──────────────

export const dailyUsage = pgTable(
  'daily_usage',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    date: text('date').notNull(),                           // YYYY-MM-DD
    questionsUsed: integer('questions_used').default(0).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  },
  (table) => [
    uniqueIndex('daily_usage_user_date_idx').on(table.userId, table.date),
  ]
);

// ─── Content Feedback ───────────────────────────────────────

export const contentFeedback = pgTable(
  'content_feedback',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    contentType: text('content_type').notNull(),
    contentId: text('content_id').notNull(),
    reason: text('reason').notNull(),
    comment: text('comment'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  },
  (table) => [
    uniqueIndex('content_feedback_user_content_idx').on(
      table.userId,
      table.contentType,
      table.contentId
    ),
  ]
);

export const contentFeedbackDismissals = pgTable(
  'content_feedback_dismissals',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    contentType: text('content_type').notNull(),
    contentId: text('content_id').notNull(),
    dismissedAt: timestamp('dismissed_at', { mode: 'date' }).defaultNow(),
  },
  (table) => [
    uniqueIndex('content_feedback_dismissal_idx').on(
      table.contentType,
      table.contentId
    ),
  ]
);

// ─── Engagement system tables ─────────────────────────────────

// Gems ledger
export const gemTransactions = pgTable('gem_transactions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  amount: integer('amount').notNull(),
  source: text('source').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
})

// Quest progress (server-side sync)
export const questProgress = pgTable('quest_progress', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  questDate: text('quest_date').notNull(),
  questType: text('quest_type').notNull(),
  quests: jsonb('quests').notNull(),
  chestClaimed: boolean('chest_claimed').default(false),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
})

// League state
export const leagueState = pgTable('league_state', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tier: integer('tier').default(1),
  weeklyXp: integer('weekly_xp').default(0),
  weekStart: text('week_start').notNull(),
  competitors: jsonb('competitors').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

// ─── Content Management ──────────────────────────────────────

export const courseUnits = pgTable('course_units', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  color: text('color').notNull(),
  icon: text('icon').notNull(),
  orderIndex: integer('order_index').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const courseLessons = pgTable('course_lessons', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  unitId: text('unit_id').notNull().references(() => courseUnits.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  xpReward: integer('xp_reward').notNull().default(10),
  orderIndex: integer('order_index').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const courseQuestions = pgTable('course_questions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  lessonId: text('lesson_id').notNull().references(() => courseLessons.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  question: text('question').notNull(),
  options: jsonb('options').$type<string[]>(),
  correctIndex: integer('correct_index'),
  correctAnswer: text('correct_answer'),
  acceptedAnswers: jsonb('accepted_answers').$type<string[]>(),
  explanation: text('explanation').notNull(),
  hint: text('hint'),
  diagram: text('diagram'),
  orderIndex: integer('order_index').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const practiceQuestions = pgTable('practice_questions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  type: text('type').notNull(),
  topic: text('topic').notNull(),
  subtopic: text('subtopic').notNull(),
  difficulty: text('difficulty').notNull(),
  question: text('question').notNull(),
  explanation: text('explanation').notNull(),
  interviewInsight: text('interview_insight').notNull(),
  realWorldConnection: text('real_world_connection'),
  commonMistake: text('common_mistake').notNull(),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  typeData: jsonb('type_data').notNull().default({}),
  orderIndex: integer('order_index').notNull().default(0),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

// ── Mastery Events ──────────────────────────────────────────
export const masteryEvents = pgTable('mastery_events', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  questionId: text('question_id').notNull(),
  topicId: text('topic_id').notNull(),
  subtopic: text('subtopic'),
  difficulty: text('difficulty').notNull(),
  correct: boolean('correct').notNull(),
  source: text('source').notNull(),
  answeredAt: timestamp('answered_at', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
}, (table) => [
  index('mastery_events_user_topic_idx').on(table.userId, table.topicId),
]);

// ─── Friends system ─────────────────────────────────────────

export const friendships = pgTable(
  'friendships',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    friendId: text('friend_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  },
  (table) => [
    uniqueIndex('friendships_pair_idx').on(table.userId, table.friendId),
    index('friendships_user_idx').on(table.userId),
    index('friendships_friend_idx').on(table.friendId),
    check('friendship_order_check', sql`user_id < friend_id`),
  ]
);

export const friendRequests = pgTable(
  'friend_requests',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    receiverId: text('receiver_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    status: text('status').notNull().default('pending'), // 'pending' | 'accepted' | 'declined'
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
  },
  (table) => [
    uniqueIndex('friend_requests_pair_idx').on(table.senderId, table.receiverId),
    index('friend_requests_receiver_idx').on(table.receiverId),
  ]
);
