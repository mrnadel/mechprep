import {
  pgTable,
  text,
  timestamp,
  integer,
  jsonb,
  real,
  primaryKey,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

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
