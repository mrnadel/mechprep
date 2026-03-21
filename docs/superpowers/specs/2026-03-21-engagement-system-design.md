# Engagement System Design

**Date:** 2026-03-21
**Status:** Draft
**Goal:** Build a comprehensive engagement loop that drives users to complete more course lessons, return daily, and stay motivated long-term.

## Context

MechReady is a Duolingo-style Mechanical Engineering interview prep app built with Next.js 16, React 19, Zustand, and PostgreSQL. It already has: XP, 30 levels, 24 achievements, streaks, stars (1-3 per lesson), daily challenges, 6 practice modes, and a 10-unit structured course.

**Problem:** Users finish a session and leave. Retention drops after initial excitement. Users avoid harder topics. There's no short-term goal system, no competitive element, no secondary economy, and no "one more lesson" hooks.

**Design philosophy:** Soft scarcity + positive reinforcement. Never block users from learning. Create urgency through time-limited bonuses, rotating goals, and weekly competitive resets.

## System Overview

Seven interconnected subsystems:

1. **Quest System** — daily/weekly rotating missions (the core engagement engine)
2. **Gems Currency** — secondary economy for streak protection and cosmetics
3. **League System** — weekly competitive rankings with promotion/demotion
4. **Session Continuation Hooks** — contextual "one more" nudges after each lesson
5. **Streak Enhancements** — freeze, repair, and milestone rewards
6. **Comeback Mechanics** — re-engagement flow for lapsed users
7. **Dashboard Nudge Cards** — smart contextual motivation on the home screen

---

## 1. Quest System

### Purpose
Give users concrete short-term goals that rotate, creating daily and weekly reasons to return and complete lessons. This is the primary engagement driver.

### Daily Quests
- **Count:** 3 quests per day
- **Reset:** Midnight local time
- **Quest pool** (system picks 3 randomly each day):
  - "Complete 2 lessons" (only course lessons count; practice sessions do not count toward this quest)
  - "Get 80%+ accuracy on any session"
  - "Practice a topic you haven't touched in 7+ days"
  - "Complete today's Daily Challenge"
  - "Answer 15 questions correctly"
  - "Earn 100 XP today"
  - "Get 3 stars on any lesson"
  - "Complete a lesson in [specific unit user is currently on]"
  - "Answer 5 questions in under 30 seconds each"
  - "Complete a practice session with no wrong answers"
- **Rewards per quest:** 25 bonus XP + 5 gems
- **All 3 completed bonus:** Treasure chest containing 50 XP + 15 gems

### Weekly Quests
- **Count:** 3 quests per week
- **Reset:** Monday 00:00 local time
- **Quest pool** (system picks 3 randomly each week):
  - "Complete 5 course lessons"
  - "Earn 500 XP this week"
  - "Get 3 stars on 3 different lessons"
  - "Practice 4 different topics"
  - "Complete all 7 daily challenges this week"
  - "Maintain a 7-day streak"
  - "Complete 3 lessons in [current unit]"
  - "Answer 50 questions correctly"
  - "Finish a unit"
  - "Score 90%+ on 3 sessions"
- **Rewards per quest:** 75 XP + 20 gems
- **All 3 completed bonus:** 150 XP + 50 gems

### Data Model

```typescript
interface Quest {
  id: string
  type: 'daily' | 'weekly'
  title: string
  description: string
  icon: string // emoji
  target: number // e.g., 2 for "complete 2 lessons"
  progress: number // current progress
  reward: { xp: number; gems: number }
  trackingKey: QuestTrackingKey // what event increments progress
  filter?: Record<string, string> // optional filters (e.g., topicId, unitId)
}

type QuestTrackingKey =
  | 'lessons_completed'
  | 'sessions_completed'
  | 'questions_correct'
  | 'accuracy_above_threshold'
  | 'topics_practiced'
  | 'xp_earned'
  | 'stars_earned'
  | 'daily_challenges_completed'
  | 'streak_days'
  | 'perfect_sessions'
  | 'fast_answers' // question answered correctly in under 30 seconds (threshold constant: FAST_ANSWER_THRESHOLD_MS = 30000)
  | 'stale_topic_practiced' // practiced a topic with lastAttempted > 7 days ago
```

### Quest Selection Algorithm
1. Each day/week, randomly select 3 from the pool
2. Weight toward quests relevant to user's current course position
3. Never repeat the same quest two days/weeks in a row
4. At least 1 quest should be easily achievable (low target)
5. At least 1 quest should push the user (stretch goal)

### UI Location
- **Dashboard:** Quest card widget showing 3 daily quests with progress bars
- **Weekly quests:** Expandable section below daily quests
- **Completion:** Confetti animation + XP/gem reward toast
- **Chest:** Animated chest opening when all 3 daily/weekly quests completed

---

## 2. Gems Currency

### Purpose
Secondary economy that gives tangible value to engagement milestones and creates a spending loop (earn → spend → earn more to spend more).

### Earning Gems

| Source | Gems |
|--------|------|
| Daily quest completion | 5 each |
| Daily quest chest (all 3) | 15 bonus |
| Weekly quest completion | 20 each |
| Weekly quest chest (all 3) | 50 bonus |
| 3-star lesson (first time) | 10 |
| League promotion | 25 |
| Streak milestone (7 days) | 10 |
| Streak milestone (14 days) | 25 |
| Streak milestone (30 days) | 50 |
| Streak milestone (60 days) | 100 |
| Streak milestone (100 days) | 200 |
| Unit completion (first time) | 50 |

### Spending Gems

| Item | Cost | Description |
|------|------|-------------|
| Streak Freeze | 30 gems | Pre-purchase protection for 1 missed day |
| Streak Repair | 50 gems | Restore broken streak within 24 hours |
| Double XP (30 min) | 40 gems | 2x XP for 30 minutes |
| Profile Title | 20 gems | Unlock custom titles (e.g., "Thermal King", "Stress Master") |
| Avatar Frame | 35 gems | Decorative frame for profile avatar |

### Data Model

```typescript
interface GemsState {
  balance: number
  totalEarned: number
  // Only keep last 100 transactions client-side to prevent localStorage bloat.
  // Older transactions are persisted server-side in gem_transactions table.
  transactions: GemTransaction[] // max 100, oldest pruned on new entry
  inventory: {
    activeTitles: string[] // unlocked title IDs
    activeFrames: string[] // unlocked frame IDs
  }
}

interface GemTransaction {
  id: string
  amount: number // positive = earned, negative = spent
  source: string // e.g., 'daily_quest', 'streak_freeze_purchase'
  timestamp: number
}
```

**Note:** Streak freezes are tracked in `StreakEnhancements.freezesOwned` (single source of truth). Double XP expiry is tracked in the top-level `EngagementState.doubleXpExpiry` (single source of truth). Neither is duplicated in GemsState.

### UI Location
- **Top bar:** Gem count next to XP (diamond icon)
- **Gem shop:** Accessible from profile or dashboard
- **Earn animations:** Gems fly to counter on earn events

---

## 3. League System

### Purpose
Weekly competitive motivation. Users earn XP and are ranked against competitors. Top performers promote to higher leagues; bottom performers demote. Creates weekly stakes and social comparison.

### League Tiers

| Tier | Name | Icon | Promotion | Demotion |
|------|------|------|-----------|----------|
| 1 | Bronze | 🥉 | Top 5 → Silver | — |
| 2 | Silver | 🥈 | Top 5 → Gold | Bottom 5 → Bronze |
| 3 | Gold | 🥇 | Top 5 → Diamond | Bottom 5 → Silver |
| 4 | Diamond | 💎 | Top 3 → Masters | Bottom 5 → Gold |
| 5 | Masters | 👑 | — | Bottom 3 → Diamond |

### Simulated Competitors
Since the app may not have a large user base, competitors are simulated:
- **30 competitors per league** (including the user)
- Each competitor has: display name, avatar initial, country flag
- XP accumulation follows realistic daily patterns:
  - Active users: 50-200 XP/day with variance
  - Moderate users: 20-80 XP/day
  - Light users: 0-30 XP/day
  - Some users skip days
- Competitor intensity scales with league tier (Masters competitors earn more)
- Names drawn from a pool of ~200 realistic international names

**Simulation determinism:** Competitor XP is calculated deterministically using a seeded PRNG based on `weekStartDate + competitorId`. This ensures:
- Same competitor state on page reload (no flickering rankings)
- Retroactive XP accumulation for days the user didn't open the app
- Reproducible rankings across sessions

**Seeding algorithm:**
1. On Monday (or first visit of the week), generate 29 competitors with `dailyXpRate` and `variance` based on league tier
2. Competitor seed = `hash(weekStartDate + competitorId)`
3. For each elapsed day, compute that competitor's XP gain: `dailyXpRate + seededRandom(seed + dayIndex) * variance`
4. Sum all days to get current `weeklyXp`

### Weekly Cycle
1. **Monday 00:00:** New league week starts, XP resets to 0
2. **During week:** All XP earned counts toward league ranking
3. **Sunday 23:59:** Week ends, promotions/demotions calculated
4. **Results screen:** Show final ranking, promotion/demotion animation

### Data Model

```typescript
interface LeagueState {
  currentTier: 1 | 2 | 3 | 4 | 5
  weeklyXp: number
  weekStartDate: string // ISO date
  competitors: LeagueCompetitor[]
  lastWeekResult: {
    rank: number
    promoted: boolean
    demoted: boolean
    tier: number
  } | null
}

interface LeagueCompetitor {
  id: string
  name: string
  avatarInitial: string
  countryFlag: string
  weeklyXp: number
  dailyXpRate: number // base rate for simulation
  variance: number // randomness factor
}
```

### UI Location
- **Dashboard:** League card showing current tier, rank, and top 5
- **Full leaderboard page:** Scrollable list of all 30 competitors
- **Promotion/demotion:** Full-screen celebration or consolation animation at week's end
- **Top bar:** Small league badge icon

---

## 4. Session Continuation Hooks

### Purpose
The moment after completing a lesson is the highest-intent moment. Intercept it with personalized nudges to start the next lesson immediately.

### Hook Types (shown on lesson result screen)

1. **Proximity nudge:** "You're 1 lesson away from completing Unit 3!" (when close to unit completion)
2. **XP nudge:** "Just 30 more XP to reach Level 12!" (when close to leveling up)
3. **Quest nudge:** "Complete one more lesson to finish today's quest!" (when quest is close)
4. **League nudge:** "You're in 6th place — one more lesson could put you in the promotion zone!" (when near top 5)
5. **Streak nudge:** "Keep your 14-day streak alive — you haven't practiced enough today!" (if daily minimum not met)
6. **Double XP hook:** After completing a lesson, offer 10-minute double XP countdown for the next lesson. Visible countdown timer creates urgency.

### Priority Logic
Show at most 2 nudges. Priority order:
1. Streak nudge (if user hasn't met daily minimum and streak is at risk)
2. Quest completion proximity (within 1 action of completing)
3. Unit completion proximity (1-2 lessons away)
4. Level up proximity (within 50 XP)
5. League promotion proximity (within top 7, not yet top 5)
6. Double XP offer (always shown as secondary, does not count toward the 2-nudge limit)

### UI
- Nudges appear as cards below the result summary
- "Continue" button is prominent and pre-loaded with the next lesson
- Double XP shows an animated countdown timer
- Subtle pulse animation on the continue button

---

## 5. Streak Enhancements

### Purpose
Extend the existing streak system with protection mechanics and milestone celebrations, making streaks more valuable and recoverable.

### New Features

**Streak Freeze:**
- Pre-purchased with gems (30 gems)
- User can hold up to 2 freezes at a time
- Automatically consumed if user misses a day
- Visual: Ice crystal icon overlay on streak flame
- Notification: "Your streak freeze saved your 14-day streak yesterday!"

**Streak Repair:**
- Available until the end of the next calendar day after a streak breaks (e.g., streak breaks March 15 → repair available through end of March 16). Uses date-level granularity to match existing `lastActiveDate` format.
- Costs 50 gems
- Restores the streak to its previous value
- One-time offer per break (can't repair the same break twice)
- UI: Modal on first visit after streak break

**Streak Milestones:**
- Beyond existing achievements, add gem rewards:
  - 7 days → 10 gems + "Consistent" badge
  - 14 days → 25 gems + "Dedicated" badge
  - 30 days → 50 gems + "Committed" badge + special profile frame
  - 60 days → 100 gems + "Relentless" badge
  - 100 days → 200 gems + "Legendary" badge + exclusive title
- Celebration: Full-screen milestone animation with gem shower

### Data Model Additions

```typescript
interface StreakEnhancements {
  freezesOwned: number // 0-2
  freezeUsedToday: boolean
  lastStreakBreakDate: string | null // for repair window
  repairAvailable: boolean
  milestonesReached: number[] // [7, 14, 30, ...]
}
```

---

## 6. Comeback Mechanics

### Purpose
Re-engage users who've been away for 3+ days. Reduce the psychological barrier of returning after a lapse.

### Flow

1. **Detection:** If `daysSinceLastSession >= 3`, trigger comeback flow on next visit
2. **Welcome Back Screen:**
   - Friendly message: "Welcome back! We missed you."
   - Show what happened while they were away (new daily challenges, quest resets)
   - If streak broke: offer streak repair (if within 24h) or acknowledge it gently
3. **Comeback Quest Chain** (replaces daily quests for that day):
   - Quest 1: "Answer 5 questions" (very easy, warm-up)
   - Quest 2: "Complete 1 lesson" (re-establish habit)
   - Quest 3: "Get 70%+ on a session" (confidence builder)
   - Rewards are slightly higher than normal daily quests (30 XP + 10 gems each)
4. **Reduced Difficulty (optional):**
   - First session back starts with questions from topics user is strongest in
   - Gradually reintroduces harder material

### Data Model

```typescript
interface ComebackState {
  isInComebackFlow: boolean
  comebackQuestsCompleted: number
  // No lastSessionDate here — reads from existing useStore.userProgress.lastActiveDate
  // to avoid duplicating state across stores
  daysAway: number
}
```

---

## 7. Dashboard Nudge Cards

### Purpose
Surface personalized, actionable motivation on the dashboard so the user always knows what to do next and why.

### Card Types

1. **Neglected Topic:** "You haven't practiced Thermodynamics in 5 days — it's your weakest topic."
   - CTA: "Practice Now" → links to topic deep dive
2. **Achievement Proximity:** "3 more correct answers until 'Centurion' achievement!"
   - CTA: "Keep Going" → links to adaptive practice
3. **Course Progress:** "You're 60% through Unit 3 — just 4 lessons left!"
   - CTA: "Continue" → links to next lesson
4. **Quest Status:** "2/3 daily quests done — complete one more lesson to earn your chest!"
   - CTA: "View Quests" → scrolls to quest widget
5. **League Alert:** "You dropped to 7th place — 2 lessons would put you back in top 5!"
   - CTA: "Earn XP" → links to next course lesson
6. **Streak Warning:** "Don't forget — practice today to keep your 12-day streak alive!"
   - Shown after 6pm if user hasn't practiced today

### Display Rules
- Show at most 3 nudge cards at a time
- Priority: streak warning > quest proximity > league alert > course progress > achievement proximity > neglected topic
- Don't repeat the same card type two days in a row
- Dismiss button hides card for the rest of the day
- Cards appear above the existing Quick Actions grid

---

## State Management

All new state lives in a new Zustand store: `useEngagementStore`, persisted to localStorage under key `mechready-engagement`.

```typescript
interface EngagementState {
  // Gems
  gems: GemsState

  // Quests
  dailyQuests: Quest[]
  weeklyQuests: Quest[]
  dailyQuestDate: string // ISO date, for reset detection
  weeklyQuestDate: string // ISO date of Monday
  dailyChestClaimed: boolean
  weeklyChestClaimed: boolean

  // League
  league: LeagueState

  // Streak enhancements
  streak: StreakEnhancements

  // Comeback
  comeback: ComebackState

  // Nudges
  dismissedNudges: Record<string, string> // nudgeType → dismissDate

  // Double XP
  doubleXpExpiry: number | null

  // Actions
  initDailyQuests: () => void
  initWeeklyQuests: () => void
  updateQuestProgress: (key: QuestTrackingKey, value?: number, filter?: Record<string, string>) => void
  claimQuestReward: (questId: string) => void
  claimChest: (type: 'daily' | 'weekly') => void
  purchaseItem: (itemId: string) => boolean
  useStreakFreeze: () => void
  repairStreak: () => boolean
  simulateLeagueWeek: () => void
  updateLeagueXp: (xp: number) => void
  checkComebackFlow: () => void
  dismissNudge: (nudgeType: string) => void
  activateDoubleXp: () => void
}
```

### Resolving the Dual-Store Architecture

The existing app has two independent stores that track XP and streaks:
- `useStore` (`mechready-storage`) — used by practice sessions, tracks `totalXp`, `currentStreak`, `lastActiveDate`
- `useCourseStore` (`mechready-course`) — used by course lessons, tracks its own `totalXp`, `currentStreak`, `lastActiveDate`

**Decision: `useStore` is the canonical source for XP, streaks, and level.**

The engagement store reads XP and streak data exclusively from `useStore`. Course lesson completions already call into `useStore` to award XP. If there are code paths in `useCourseStore` that independently modify XP/streak without going through `useStore`, those must be refactored to delegate to `useStore` as part of this work.

**League XP** aggregates from `useStore.userProgress.totalXp` only.
**Streak checks** read from `useStore.userProgress.currentStreak` and `useStore.userProgress.lastActiveDate` only.

### Integration Points

The engagement store must be updated from existing flows:

1. **After lesson completion** (`ResultScreen`):
   - `ResultScreen` consumes from both `useCourseStore` (lesson result, unit progress, lesson position for continuation hooks) and `useEngagementStore` (quest progress, league rank, double XP state)
   - Call `updateQuestProgress('lessons_completed', 1)`
   - Call `updateLeagueXp(xpEarned)` — where `xpEarned` comes from `useStore`
   - Show continuation hooks using: `useCourseStore` unit/lesson position + `useEngagementStore` quest/league/XP proximity data
   - Check/offer double XP

2. **After session completion** (`SessionSummary`):
   - Call `updateQuestProgress('sessions_completed', 1)`
   - Call `updateQuestProgress('questions_correct', correctCount)`
   - Call `updateLeagueXp(xpEarned)`
   - Update accuracy-based quests
   - Show continuation hooks (same multi-store pattern as ResultScreen)

3. **On dashboard load** (`page.tsx`):
   - Call `initDailyQuests()` (handles reset detection)
   - Call `initWeeklyQuests()` (handles reset detection)
   - Call `checkComebackFlow()` — reads `lastActiveDate` from `useStore`
   - Simulate league competitor XP for elapsed time
   - Render nudge cards

4. **On app load** (layout or provider):
   - Read `lastActiveDate` from `useStore` to detect missed days
   - If missed day detected and `streakEnhancements.freezesOwned > 0`: consume freeze, preserve streak in `useStore`
   - Check streak repair window (if streak broke and within repair calendar window)

### Database Schema Additions

All schema changes use Drizzle ORM definitions (consistent with existing `src/lib/db/schema.ts` which uses `text()` for IDs, not UUID):

```typescript
// Add to src/lib/db/schema.ts

// Gems ledger
export const gemTransactions = pgTable('gem_transactions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id).notNull(),
  amount: integer('amount').notNull(),
  source: text('source').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Quest progress (server-side sync)
export const questProgress = pgTable('quest_progress', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id).notNull(),
  questDate: text('quest_date').notNull(), // ISO date string
  questType: text('quest_type').notNull(), // 'daily' | 'weekly'
  quests: jsonb('quests').notNull(),
  chestClaimed: boolean('chest_claimed').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// League state
export const leagueState = pgTable('league_state', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id).notNull(),
  tier: integer('tier').default(1),
  weeklyXp: integer('weekly_xp').default(0),
  weekStart: text('week_start').notNull(),
  competitors: jsonb('competitors').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Add columns to existing userProgress table:
// streakFreezes: integer('streak_freezes').default(0)
// gemsBalance: integer('gems_balance').default(0)
// gemsTotalEarned: integer('gems_total_earned').default(0)
// streakMilestones: jsonb('streak_milestones').default([])
```

### Migration Strategy for Existing Users

When the engagement system is deployed, existing users will have localStorage data in `mechready-storage` and `mechready-course` but no `mechready-engagement` key. On first load of the new version:

1. **Gems:** Initialize `balance: 0`, `totalEarned: 0`. No retroactive gem awards — gems start fresh.
2. **Quests:** Generate fresh daily/weekly quests as if it's a new day.
3. **League:** Place user in Bronze league, generate competitors, start fresh week.
4. **Streak enhancements:** `freezesOwned: 0`, no milestones reached. Existing streak value is read from `useStore` and respected — but past milestones (e.g., user already has a 45-day streak) are NOT retroactively awarded gems. Only future milestones trigger rewards.
5. **Comeback:** Not triggered on first load of new version (even if user was away), since it would be confusing alongside new feature discovery.
6. **Double XP:** Not active.

This is handled by the Zustand `persist` middleware's default values — when the `mechready-engagement` key doesn't exist, the store initializes with defaults and runs `initDailyQuests()` / `initWeeklyQuests()` on first dashboard load.

### Insufficient Gems Handling

When a user attempts to purchase an item with insufficient gem balance:
- The buy button is **disabled** when `gems.balance < item.cost`
- Button shows grayed-out state with tooltip: "Need X more gems"
- No error toast needed — the disabled state prevents the action

---

## Files to Create/Modify

### New Files
- `src/store/useEngagementStore.ts` — Zustand store for all engagement state
- `src/data/quests.ts` — Quest pool definitions
- `src/data/league.ts` — League tiers, competitor name pool, simulation config
- `src/data/gem-shop.ts` — Shop items and prices
- `src/data/streak-milestones.ts` — Milestone thresholds and rewards
- `src/data/nudge-cards.ts` — Nudge card definitions and priority
- `src/components/engagement/QuestCard.tsx` — Individual quest with progress bar
- `src/components/engagement/QuestBoard.tsx` — Daily + weekly quest container
- `src/components/engagement/ChestAnimation.tsx` — Chest opening animation
- `src/components/engagement/LeagueCard.tsx` — Dashboard league summary
- `src/components/engagement/LeagueBoard.tsx` — Full leaderboard page
- `src/components/engagement/LeaguePromotion.tsx` — Promotion/demotion animation
- `src/components/engagement/GemCounter.tsx` — Top bar gem display
- `src/components/engagement/GemShop.tsx` — Shop UI
- `src/components/engagement/ContinuationHooks.tsx` — Post-lesson nudges
- `src/components/engagement/DoubleXpTimer.tsx` — Countdown timer
- `src/components/engagement/NudgeCards.tsx` — Dashboard nudge cards
- `src/components/engagement/WelcomeBack.tsx` — Comeback screen
- `src/components/engagement/ComebackQuests.tsx` — Comeback quest chain
- `src/components/engagement/StreakFreeze.tsx` — Freeze/repair UI
- `src/components/engagement/StreakMilestone.tsx` — Milestone celebration
- `src/app/(app)/league/page.tsx` — Full league leaderboard page
- `src/app/(app)/shop/page.tsx` — Gem shop page
- `src/lib/quest-engine.ts` — Quest selection, tracking, and reset logic
- `src/lib/league-simulator.ts` — Competitor XP simulation
- `src/lib/nudge-engine.ts` — Nudge card selection and priority logic

### Modified Files
- `src/components/layout/TopBar.tsx` — Add gem counter, league badge
- `src/components/layout/Sidebar.tsx` — Add League and Shop nav items
- `src/components/lesson/ResultScreen.tsx` — Add continuation hooks
- `src/components/session/SessionSummary.tsx` — Add quest progress updates, continuation hooks
- `src/app/(app)/page.tsx` — Add quest board, nudge cards, league summary
- `src/store/useStore.ts` — Add hooks to emit events to engagement store
- `src/lib/db/schema.ts` — Add new tables
- `src/app/api/progress/route.ts` — Sync engagement data

---

## Success Criteria

1. Users see 3 daily quests every day and can track progress in real-time
2. Weekly quests provide longer-term goals that reset each Monday
3. Completing all daily/weekly quests triggers a chest reward animation
4. Gems are earned and can be spent in the shop
5. League leaderboard updates in real-time as user earns XP
6. Weekly league promotions/demotions with celebration animations
7. After each lesson, at least 1 contextual nudge encourages the next lesson
8. Double XP timer creates visible urgency to continue immediately
9. Streak freezes and repairs are purchasable and functional
10. Comeback flow triggers after 3+ days away
11. Dashboard shows prioritized, dismissible nudge cards
12. All engagement state persists in localStorage and syncs to database
