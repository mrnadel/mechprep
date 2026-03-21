# Engagement System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-subsystem engagement loop (quests, gems, leagues, continuation hooks, streak enhancements, comeback mechanics, nudge cards) that drives users to complete more lessons and return daily.

**Architecture:** New `useEngagementStore` Zustand store (persisted to `mechready-engagement`) manages all engagement state. Three library modules (`quest-engine`, `league-simulator`, `nudge-engine`) contain pure logic. UI components live in `src/components/engagement/`. The store integrates with existing `useStore` (canonical XP/streak source) and `useCourseStore` (lesson position) via calls at lesson/session completion and dashboard load.

**Tech Stack:** Next.js 16, React 19, TypeScript, Zustand 5 with persist middleware, Framer Motion, Tailwind CSS 4, lucide-react icons, Drizzle ORM + PostgreSQL.

**Spec:** `docs/superpowers/specs/2026-03-21-engagement-system-design.md`

**Note:** No test framework is configured in this project. Steps focus on implementation and manual verification. If a test framework is added later, tests can be backfilled.

---

## File Structure

### New Files (28 files)

> **Spec deviations:** `src/data/engagement-types.ts` and `src/lib/engagement-init.ts` are new files not in the spec — extracted for cleaner separation of concerns. All spec-listed files are covered.

**Data & Types:**
- `src/data/engagement-types.ts` — All engagement type definitions (Quest, GemsState, LeagueState, etc.) *[extracted from inline spec types]*
- `src/data/quests.ts` — Daily and weekly quest pool definitions
- `src/data/league.ts` — League tiers, competitor name pool, tier XP ranges
- `src/data/gem-shop.ts` — Shop items with costs and metadata
- `src/data/streak-milestones.ts` — Milestone thresholds, gem rewards, badge names
- `src/data/nudge-cards.ts` — Nudge card type definitions and priority config

**Libraries (pure logic, no React):**
- `src/lib/quest-engine.ts` — Quest selection, progress tracking, reset logic
- `src/lib/league-simulator.ts` — Seeded PRNG, competitor generation, XP simulation
- `src/lib/nudge-engine.ts` — Nudge card selection, priority ranking, filtering
- `src/lib/engagement-init.ts` — App-load initialization hook (streak freeze, quest/league setup) *[spec puts this in useStore.ts; extracted for clarity]*

**Store:**
- `src/store/useEngagementStore.ts` — Full Zustand store with persist middleware

**Components:**
- `src/components/engagement/QuestCard.tsx` — Single quest with progress bar
- `src/components/engagement/QuestBoard.tsx` — Daily + weekly quest container with chest (also renders comeback quests when in comeback flow)
- `src/components/engagement/ChestAnimation.tsx` — Chest opening reward animation
- `src/components/engagement/GemCounter.tsx` — Top bar gem display with fly animation
- `src/components/engagement/GemShop.tsx` — Shop grid with buy buttons
- `src/components/engagement/LeagueCard.tsx` — Dashboard league summary card
- `src/components/engagement/LeagueBoard.tsx` — Full scrollable leaderboard
- `src/components/engagement/LeaguePromotion.tsx` — Promotion/demotion animation overlay
- `src/components/engagement/ContinuationHooks.tsx` — Post-lesson nudge cards
- `src/components/engagement/DoubleXpTimer.tsx` — Countdown timer with urgency styling
- `src/components/engagement/StreakFreeze.tsx` — Freeze purchase + repair modal
- `src/components/engagement/StreakMilestone.tsx` — Milestone celebration overlay
- `src/components/engagement/WelcomeBack.tsx` — Comeback welcome screen
- `src/components/engagement/NudgeCards.tsx` — Dashboard nudge card list

**Pages:**
- `src/app/(app)/league/page.tsx` — Full league leaderboard page
- `src/app/(app)/shop/page.tsx` — Gem shop page

> **Note on `ComebackQuests.tsx`:** The spec lists this as a separate file, but the comeback quest rendering is handled inside `QuestBoard.tsx` — when `comeback.isInComebackFlow` is true, QuestBoard swaps in comeback quests from `src/data/quests.ts` instead of regular daily quests. No separate component needed.

### Modified Files (9 files)
- `src/data/types.ts` — Import/re-export engagement types
- `src/store/useStore.ts` — Add streak freeze hook on streak reset
- `src/components/layout/TopBar.tsx` — Add gem counter + league badge
- `src/components/layout/Sidebar.tsx` — Add League + Shop nav items
- `src/components/lesson/ResultScreen.tsx` — Add continuation hooks + quest/league updates
- `src/components/session/SessionSummary.tsx` — Add continuation hooks + quest/league updates
- `src/app/(app)/page.tsx` — Add quest board, nudge cards, league card, comeback flow
- `src/lib/db/schema.ts` — Add 3 new tables + 4 columns to userProgress
- `src/app/api/progress/route.ts` — Sync engagement data (gems, quests, league) to database

---

## Task 1: Engagement Types & Constants

**Files:**
- Create: `src/data/engagement-types.ts`

- [ ] **Step 1: Create the engagement types file**

```typescript
// src/data/engagement-types.ts

// === Constants ===
export const FAST_ANSWER_THRESHOLD_MS = 30000
export const MAX_STREAK_FREEZES = 2
export const MAX_GEM_TRANSACTIONS_CLIENT = 100
export const DOUBLE_XP_FREE_DURATION_MS = 10 * 60 * 1000 // 10 minutes (post-lesson hook offer)
export const DOUBLE_XP_SHOP_DURATION_MS = 30 * 60 * 1000 // 30 minutes (shop purchase)
export const COMEBACK_THRESHOLD_DAYS = 3
export const STALE_TOPIC_DAYS = 7

// === Quest Types ===
export type QuestTrackingKey =
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
  | 'fast_answers'
  | 'stale_topic_practiced'

export type QuestDifficulty = 'easy' | 'medium' | 'stretch'

export interface QuestDefinition {
  id: string
  title: string
  description: string
  icon: string
  trackingKey: QuestTrackingKey
  target: number
  difficulty: QuestDifficulty
  reward: { xp: number; gems: number }
  filter?: Record<string, string> // e.g., { unitId: '__CURRENT__' }
}

export interface Quest {
  definitionId: string
  type: 'daily' | 'weekly'
  title: string
  description: string
  icon: string
  target: number
  progress: number
  reward: { xp: number; gems: number }
  trackingKey: QuestTrackingKey
  filter?: Record<string, string>
  completed: boolean
  claimed: boolean
}

// === Gems Types ===
export interface GemTransaction {
  id: string
  amount: number
  source: string
  timestamp: number
}

export interface GemsState {
  balance: number
  totalEarned: number
  transactions: GemTransaction[]
  inventory: {
    activeTitles: string[]
    activeFrames: string[]
  }
}

export interface ShopItem {
  id: string
  name: string
  description: string
  icon: string
  cost: number
  category: 'consumable' | 'cosmetic'
  type: 'streak_freeze' | 'streak_repair' | 'double_xp' | 'title' | 'frame'
  metadata?: Record<string, string> // e.g., { titleText: 'Thermal King' }
}

// === League Types ===
export interface LeagueCompetitor {
  id: string
  name: string
  avatarInitial: string
  countryFlag: string
  weeklyXp: number
  dailyXpRate: number
  variance: number
}

export interface LeagueWeekResult {
  rank: number
  promoted: boolean
  demoted: boolean
  tier: number
}

export interface LeagueState {
  currentTier: 1 | 2 | 3 | 4 | 5
  weeklyXp: number
  weekStartDate: string
  competitors: LeagueCompetitor[]
  lastWeekResult: LeagueWeekResult | null
  resultSeen: boolean
}

export interface LeagueTier {
  tier: 1 | 2 | 3 | 4 | 5
  name: string
  icon: string
  color: string
  promoteCount: number
  demoteCount: number
  xpRange: { min: number; max: number } // competitor daily XP range for this tier
}

// === Streak Types ===
export interface StreakEnhancements {
  freezesOwned: number
  freezeUsedToday: boolean
  lastStreakBreakDate: string | null
  lastStreakValueBeforeBreak: number
  repairAvailable: boolean
  milestonesReached: number[]
}

export interface StreakMilestoneDefinition {
  days: number
  gems: number
  badgeName: string
  badgeIcon: string
  hasFrame?: boolean
  hasTitle?: boolean
  titleText?: string
}

// === Comeback Types ===
export interface ComebackState {
  isInComebackFlow: boolean
  comebackQuestsCompleted: number
  daysAway: number
}

// === Nudge Types ===
export type NudgeType =
  | 'streak_warning'
  | 'quest_proximity'
  | 'league_alert'
  | 'course_progress'
  | 'achievement_proximity'
  | 'neglected_topic'

export interface NudgeCard {
  type: NudgeType
  title: string
  message: string
  ctaLabel: string
  ctaHref: string
  priority: number
  icon: string
}

// === Continuation Hook Types ===
export type HookType =
  | 'streak'
  | 'quest'
  | 'unit_proximity'
  | 'xp_level'
  | 'league'
  | 'double_xp'

export interface ContinuationHook {
  type: HookType
  message: string
  ctaLabel: string
  ctaHref?: string
  priority: number
  icon: string
}

// === Full Engagement State ===
export interface EngagementState {
  // Gems
  gems: GemsState

  // Quests
  dailyQuests: Quest[]
  weeklyQuests: Quest[]
  dailyQuestDate: string
  weeklyQuestDate: string
  dailyChestClaimed: boolean
  weeklyChestClaimed: boolean
  lastDailyQuestIds: string[] // to avoid repeats
  lastWeeklyQuestIds: string[]

  // League
  league: LeagueState

  // Streak enhancements
  streak: StreakEnhancements

  // Comeback
  comeback: ComebackState

  // Nudges
  dismissedNudges: Record<string, string>

  // Double XP
  doubleXpExpiry: number | null
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd "C:/Users/mrnad/OneDrive/Desktop/Mechanical Practice" && npx tsc --noEmit src/data/engagement-types.ts 2>&1 | head -20`

(If TypeScript strict mode flags issues, fix them. This file has no imports so should compile cleanly.)

- [ ] **Step 3: Re-export from src/data/types.ts**

Add to the bottom of `src/data/types.ts`:
```typescript
// Engagement system types
export * from './engagement-types'
```

This ensures existing import patterns (`import { ... } from '@/data/types'`) work for engagement types too.

- [ ] **Step 4: Commit**

```bash
git add src/data/engagement-types.ts src/data/types.ts
git commit -m "feat: add engagement system type definitions and constants"
```

---

## Task 2: Quest Pool Definitions

**Files:**
- Create: `src/data/quests.ts`

- [ ] **Step 1: Create the quest pool data file**

```typescript
// src/data/quests.ts
import { QuestDefinition } from './engagement-types'

export const dailyQuestPool: QuestDefinition[] = [
  {
    id: 'dq-complete-lessons',
    title: 'Lesson Learner',
    description: 'Complete 2 course lessons',
    icon: '📚',
    trackingKey: 'lessons_completed',
    target: 2,
    difficulty: 'medium',
    reward: { xp: 25, gems: 5 },
  },
  {
    id: 'dq-accuracy-80',
    title: 'Sharp Shooter',
    description: 'Get 80%+ accuracy on any session',
    icon: '🎯',
    trackingKey: 'accuracy_above_threshold',
    target: 1,
    difficulty: 'medium',
    reward: { xp: 25, gems: 5 },
    filter: { threshold: '80' },
  },
  {
    id: 'dq-stale-topic',
    title: 'Dust Off',
    description: 'Practice a topic you haven\'t touched in 7+ days',
    icon: '🧹',
    trackingKey: 'stale_topic_practiced',
    target: 1,
    difficulty: 'easy',
    reward: { xp: 25, gems: 5 },
  },
  {
    id: 'dq-daily-challenge',
    title: 'Daily Warrior',
    description: 'Complete today\'s Daily Challenge',
    icon: '⚔️',
    trackingKey: 'daily_challenges_completed',
    target: 1,
    difficulty: 'easy',
    reward: { xp: 25, gems: 5 },
  },
  {
    id: 'dq-answer-15',
    title: 'Question Crusher',
    description: 'Answer 15 questions correctly',
    icon: '💪',
    trackingKey: 'questions_correct',
    target: 15,
    difficulty: 'stretch',
    reward: { xp: 25, gems: 5 },
  },
  {
    id: 'dq-earn-100xp',
    title: 'XP Hunter',
    description: 'Earn 100 XP today',
    icon: '⭐',
    trackingKey: 'xp_earned',
    target: 100,
    difficulty: 'medium',
    reward: { xp: 25, gems: 5 },
  },
  {
    id: 'dq-3-stars',
    title: 'Star Collector',
    description: 'Get 3 stars on any lesson',
    icon: '🌟',
    trackingKey: 'stars_earned',
    target: 1,
    difficulty: 'stretch',
    reward: { xp: 25, gems: 5 },
    filter: { minStars: '3' },
  },
  {
    id: 'dq-current-unit',
    title: 'Unit Focus',
    description: 'Complete a lesson in your current unit',
    icon: '📖',
    trackingKey: 'lessons_completed',
    target: 1,
    difficulty: 'easy',
    reward: { xp: 25, gems: 5 },
    filter: { unitId: '__CURRENT__' },
  },
  {
    id: 'dq-fast-answers',
    title: 'Quick Draw',
    description: 'Answer 5 questions correctly in under 30 seconds each',
    icon: '⚡',
    trackingKey: 'fast_answers',
    target: 5,
    difficulty: 'stretch',
    reward: { xp: 25, gems: 5 },
  },
  {
    id: 'dq-perfect-session',
    title: 'Flawless',
    description: 'Complete a session with no wrong answers',
    icon: '💎',
    trackingKey: 'perfect_sessions',
    target: 1,
    difficulty: 'stretch',
    reward: { xp: 25, gems: 5 },
  },
]

export const weeklyQuestPool: QuestDefinition[] = [
  {
    id: 'wq-5-lessons',
    title: 'Dedicated Student',
    description: 'Complete 5 course lessons this week',
    icon: '📚',
    trackingKey: 'lessons_completed',
    target: 5,
    difficulty: 'medium',
    reward: { xp: 75, gems: 20 },
  },
  {
    id: 'wq-500-xp',
    title: 'XP Marathon',
    description: 'Earn 500 XP this week',
    icon: '🏃',
    trackingKey: 'xp_earned',
    target: 500,
    difficulty: 'stretch',
    reward: { xp: 75, gems: 20 },
  },
  {
    id: 'wq-3-star-lessons',
    title: 'Triple Star',
    description: 'Get 3 stars on 3 different lessons',
    icon: '⭐',
    trackingKey: 'stars_earned',
    target: 3,
    difficulty: 'stretch',
    reward: { xp: 75, gems: 20 },
    filter: { minStars: '3' },
  },
  {
    id: 'wq-4-topics',
    title: 'Well Rounded',
    description: 'Practice 4 different topics this week',
    icon: '🔄',
    trackingKey: 'topics_practiced',
    target: 4,
    difficulty: 'medium',
    reward: { xp: 75, gems: 20 },
  },
  {
    id: 'wq-all-dailies',
    title: 'Challenge Champion',
    description: 'Complete all 7 daily challenges this week',
    icon: '🏆',
    trackingKey: 'daily_challenges_completed',
    target: 7,
    difficulty: 'stretch',
    reward: { xp: 75, gems: 20 },
  },
  {
    id: 'wq-7-day-streak',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    trackingKey: 'streak_days',
    target: 7,
    difficulty: 'stretch',
    reward: { xp: 75, gems: 20 },
  },
  {
    id: 'wq-3-unit-lessons',
    title: 'Unit Grinder',
    description: 'Complete 3 lessons in your current unit',
    icon: '📖',
    trackingKey: 'lessons_completed',
    target: 3,
    difficulty: 'medium',
    reward: { xp: 75, gems: 20 },
    filter: { unitId: '__CURRENT__' },
  },
  {
    id: 'wq-50-correct',
    title: 'Half Century',
    description: 'Answer 50 questions correctly this week',
    icon: '💯',
    trackingKey: 'questions_correct',
    target: 50,
    difficulty: 'stretch',
    reward: { xp: 75, gems: 20 },
  },
  {
    id: 'wq-finish-unit',
    title: 'Unit Complete',
    description: 'Finish an entire unit',
    icon: '🎓',
    trackingKey: 'lessons_completed',
    target: 1,
    difficulty: 'stretch',
    reward: { xp: 75, gems: 20 },
    filter: { type: 'unit_completion' },
  },
  {
    id: 'wq-90-accuracy',
    title: 'Precision Engineer',
    description: 'Score 90%+ on 3 sessions',
    icon: '🎯',
    trackingKey: 'accuracy_above_threshold',
    target: 3,
    difficulty: 'stretch',
    reward: { xp: 75, gems: 20 },
    filter: { threshold: '90' },
  },
]

export const dailyChestReward = { xp: 50, gems: 15 }
export const weeklyChestReward = { xp: 150, gems: 50 }

export const comebackQuests: QuestDefinition[] = [
  {
    id: 'cb-warmup',
    title: 'Warm Up',
    description: 'Answer 5 questions',
    icon: '🔥',
    trackingKey: 'questions_correct',
    target: 5,
    difficulty: 'easy',
    reward: { xp: 30, gems: 10 },
  },
  {
    id: 'cb-lesson',
    title: 'Back in the Saddle',
    description: 'Complete 1 lesson',
    icon: '📚',
    trackingKey: 'lessons_completed',
    target: 1,
    difficulty: 'easy',
    reward: { xp: 30, gems: 10 },
  },
  {
    id: 'cb-accuracy',
    title: 'Still Got It',
    description: 'Get 70%+ on a session',
    icon: '🎯',
    trackingKey: 'accuracy_above_threshold',
    target: 1,
    difficulty: 'easy',
    reward: { xp: 30, gems: 10 },
    filter: { threshold: '70' },
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/quests.ts
git commit -m "feat: add daily, weekly, and comeback quest pool definitions"
```

---

## Task 3: League, Shop & Streak Milestone Data

**Files:**
- Create: `src/data/league.ts`
- Create: `src/data/gem-shop.ts`
- Create: `src/data/streak-milestones.ts`

- [ ] **Step 1: Create league data**

```typescript
// src/data/league.ts
import { LeagueTier } from './engagement-types'

export const leagueTiers: LeagueTier[] = [
  { tier: 1, name: 'Bronze', icon: '🥉', color: '#CD7F32', promoteCount: 5, demoteCount: 0, xpRange: { min: 20, max: 120 } },
  { tier: 2, name: 'Silver', icon: '🥈', color: '#C0C0C0', promoteCount: 5, demoteCount: 5, xpRange: { min: 40, max: 160 } },
  { tier: 3, name: 'Gold', icon: '🥇', color: '#FFD700', promoteCount: 5, demoteCount: 5, xpRange: { min: 60, max: 200 } },
  { tier: 4, name: 'Diamond', icon: '💎', color: '#00CED1', promoteCount: 3, demoteCount: 5, xpRange: { min: 80, max: 250 } },
  { tier: 5, name: 'Masters', icon: '👑', color: '#9B59B6', promoteCount: 0, demoteCount: 3, xpRange: { min: 100, max: 300 } },
]

export const competitorNames = [
  'Alex Chen', 'Maria Garcia', 'James Wilson', 'Yuki Tanaka', 'Priya Sharma',
  'Lucas Schmidt', 'Fatima Al-Hassan', 'David Kim', 'Sofia Petrov', 'Omar Hassan',
  'Emma Johnson', 'Wei Zhang', 'Isabella Costa', 'Raj Patel', 'Anna Müller',
  'Carlos Mendez', 'Aisha Mohammed', 'Tom Anderson', 'Mei Lin', 'Kofi Asante',
  'Julia Santos', 'Ahmed Ibrahim', 'Sarah O\'Connor', 'Hiroshi Sato', 'Elena Volkov',
  'Marcus Brown', 'Lena Johansson', 'Arjun Reddy', 'Chloe Martin', 'Pavel Novak',
  'Diana Torres', 'Felix Weber', 'Nadia Popov', 'Ryan Taylor', 'Zara Khan',
  'Miguel Fernandez', 'Hana Yoshida', 'Leo Rossi', 'Amara Okafor', 'Erik Larsen',
  'Rina Nakamura', 'Hugo Dupont', 'Leila Mahmoud', 'Oscar Rivera', 'Freya Nielsen',
  'Vikram Singh', 'Clara Berg', 'Tomas Horvat', 'Mia Thompson', 'Andrei Kozlov',
  'Layla Bakr', 'Noah Davis', 'Ingrid Svensson', 'Ravi Gupta', 'Sophie Leroy',
  'Hassan Yilmaz', 'Lucia Morales', 'Daniel Park', 'Alina Dragomir', 'Ben Cooper',
]

export const competitorFlags = [
  '🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇯🇵', '🇮🇳', '🇧🇷', '🇰🇷', '🇮🇹', '🇪🇸',
  '🇨🇦', '🇦🇺', '🇳🇱', '🇸🇪', '🇳🇴', '🇵🇱', '🇹🇷', '🇲🇽', '🇿🇦', '🇳🇬',
  '🇪🇬', '🇸🇬', '🇮🇱', '🇨🇿', '🇷🇴', '🇭🇷', '🇵🇹', '🇨🇭', '🇦🇹', '🇫🇮',
]

export const COMPETITORS_PER_LEAGUE = 30 // including the user = 29 simulated
export const LEAGUE_GEM_REWARD_PROMOTION = 25
```

- [ ] **Step 2: Create gem shop data**

```typescript
// src/data/gem-shop.ts
import { ShopItem } from './engagement-types'

export const shopItems: ShopItem[] = [
  {
    id: 'shop-streak-freeze',
    name: 'Streak Freeze',
    description: 'Protect your streak for 1 missed day. Hold up to 2.',
    icon: '🧊',
    cost: 30,
    category: 'consumable',
    type: 'streak_freeze',
  },
  {
    id: 'shop-streak-repair',
    name: 'Streak Repair',
    description: 'Restore a broken streak. Available for 1 day after breaking.',
    icon: '🔧',
    cost: 50,
    category: 'consumable',
    type: 'streak_repair',
  },
  {
    id: 'shop-double-xp',
    name: 'Double XP (30 min)',
    description: '2x XP for 30 minutes of practice.',
    icon: '⚡',
    cost: 40,
    category: 'consumable',
    type: 'double_xp',
  },
  {
    id: 'shop-title-thermal-king',
    name: 'Thermal King',
    description: 'Unlock the "Thermal King" profile title.',
    icon: '🔥',
    cost: 20,
    category: 'cosmetic',
    type: 'title',
    metadata: { titleText: 'Thermal King' },
  },
  {
    id: 'shop-title-stress-master',
    name: 'Stress Master',
    description: 'Unlock the "Stress Master" profile title.',
    icon: '💪',
    cost: 20,
    category: 'cosmetic',
    type: 'title',
    metadata: { titleText: 'Stress Master' },
  },
  {
    id: 'shop-title-flow-guru',
    name: 'Flow Guru',
    description: 'Unlock the "Flow Guru" profile title.',
    icon: '🌊',
    cost: 20,
    category: 'cosmetic',
    type: 'title',
    metadata: { titleText: 'Flow Guru' },
  },
  {
    id: 'shop-frame-gold',
    name: 'Gold Frame',
    description: 'A golden frame for your profile avatar.',
    icon: '🖼️',
    cost: 35,
    category: 'cosmetic',
    type: 'frame',
    metadata: { frameId: 'gold' },
  },
  {
    id: 'shop-frame-diamond',
    name: 'Diamond Frame',
    description: 'A sparkling diamond frame for your profile avatar.',
    icon: '💎',
    cost: 35,
    category: 'cosmetic',
    type: 'frame',
    metadata: { frameId: 'diamond' },
  },
]
```

- [ ] **Step 3: Create streak milestones data**

```typescript
// src/data/streak-milestones.ts
import { StreakMilestoneDefinition } from './engagement-types'

export const streakMilestones: StreakMilestoneDefinition[] = [
  { days: 7, gems: 10, badgeName: 'Consistent', badgeIcon: '🌱' },
  { days: 14, gems: 25, badgeName: 'Dedicated', badgeIcon: '🌿' },
  { days: 30, gems: 50, badgeName: 'Committed', badgeIcon: '🌳', hasFrame: true },
  { days: 60, gems: 100, badgeName: 'Relentless', badgeIcon: '⚡' },
  { days: 100, gems: 200, badgeName: 'Legendary', badgeIcon: '👑', hasTitle: true, titleText: 'Streak Legend' },
]
```

- [ ] **Step 4: Commit**

```bash
git add src/data/league.ts src/data/gem-shop.ts src/data/streak-milestones.ts
git commit -m "feat: add league tiers, gem shop items, and streak milestone data"
```

---

## Task 4: Quest Engine Library

**Files:**
- Create: `src/lib/quest-engine.ts`

This module contains pure functions (no React, no store imports) for quest selection and daily/weekly reset logic.

- [ ] **Step 1: Create quest engine**

```typescript
// src/lib/quest-engine.ts
import { Quest, QuestDefinition, QuestDifficulty } from '@/data/engagement-types'
import { dailyQuestPool, weeklyQuestPool } from '@/data/quests'

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Get Monday of the current week as ISO string
 */
export function getCurrentWeekMonday(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

/**
 * Simple hash function for deterministic quest selection
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

/**
 * Select N quests from a pool, ensuring variety in difficulty.
 * At least 1 easy, at most 2 stretch. Avoids repeating lastIds.
 */
export function selectQuests(
  pool: QuestDefinition[],
  count: number,
  dateSeed: string,
  lastIds: string[],
): QuestDefinition[] {
  // Filter out quests that were selected last time
  const available = pool.filter(q => !lastIds.includes(q.id))
  // If not enough available after filtering, fall back to full pool
  const source = available.length >= count ? available : pool

  const hash = hashString(dateSeed)
  const shuffled = [...source].sort((a, b) => {
    const ha = hashString(a.id + dateSeed)
    const hb = hashString(b.id + dateSeed)
    return ha - hb
  })

  // Ensure difficulty balance: at least 1 easy quest, at least 1 stretch
  const easy = shuffled.filter(q => q.difficulty === 'easy')
  const medium = shuffled.filter(q => q.difficulty === 'medium')
  const stretch = shuffled.filter(q => q.difficulty === 'stretch')

  const selected: QuestDefinition[] = []

  // Pick 1 easy (if available)
  if (easy.length > 0) selected.push(easy[0])
  // Pick 1 stretch (if available)
  if (stretch.length > 0) selected.push(stretch[0])
  // Fill remaining from all shuffled, avoiding duplicates
  for (const q of shuffled) {
    if (selected.length >= count) break
    if (!selected.find(s => s.id === q.id)) {
      selected.push(q)
    }
  }

  return selected.slice(0, count)
}

/**
 * Create active Quest instances from definitions
 */
export function createQuests(
  definitions: QuestDefinition[],
  type: 'daily' | 'weekly',
): Quest[] {
  return definitions.map(def => ({
    definitionId: def.id,
    type,
    title: def.title,
    description: def.description,
    icon: def.icon,
    target: def.target,
    progress: 0,
    reward: def.reward,
    trackingKey: def.trackingKey,
    filter: def.filter,
    completed: false,
    claimed: false,
  }))
}

/**
 * Check if daily quests need reset (different day)
 */
export function needsDailyReset(storedDate: string): boolean {
  return storedDate !== getTodayDate()
}

/**
 * Check if weekly quests need reset (different week)
 */
export function needsWeeklyReset(storedMonday: string): boolean {
  return storedMonday !== getCurrentWeekMonday()
}

/**
 * Select 3 daily quests for today
 */
export function selectDailyQuests(lastIds: string[]): QuestDefinition[] {
  return selectQuests(dailyQuestPool, 3, getTodayDate(), lastIds)
}

/**
 * Select 3 weekly quests for this week
 */
export function selectWeeklyQuests(lastIds: string[]): QuestDefinition[] {
  return selectQuests(weeklyQuestPool, 3, getCurrentWeekMonday(), lastIds)
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/quest-engine.ts
git commit -m "feat: add quest engine with selection, reset, and difficulty balancing"
```

---

## Task 5: League Simulator Library

**Files:**
- Create: `src/lib/league-simulator.ts`

Pure functions for deterministic competitor XP simulation using a seeded PRNG.

- [ ] **Step 1: Create league simulator**

```typescript
// src/lib/league-simulator.ts
import { LeagueCompetitor, LeagueTier } from '@/data/engagement-types'
import { leagueTiers, competitorNames, competitorFlags, COMPETITORS_PER_LEAGUE } from '@/data/league'

/**
 * Seeded pseudo-random number generator (mulberry32)
 * Returns a function that produces deterministic random numbers 0-1
 */
function seededRandom(seed: number): () => number {
  return function() {
    seed |= 0
    seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

/**
 * Hash a string into a numeric seed
 */
function hashSeed(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/**
 * Generate 29 simulated competitors for a league week
 */
export function generateCompetitors(
  weekStartDate: string,
  tier: 1 | 2 | 3 | 4 | 5,
): LeagueCompetitor[] {
  const tierConfig = leagueTiers.find(t => t.tier === tier)!
  const baseSeed = hashSeed(weekStartDate + tier)
  const rng = seededRandom(baseSeed)

  const competitors: LeagueCompetitor[] = []
  const usedNameIndices = new Set<number>()

  for (let i = 0; i < COMPETITORS_PER_LEAGUE - 1; i++) {
    // Pick unique name
    let nameIdx: number
    do {
      nameIdx = Math.floor(rng() * competitorNames.length)
    } while (usedNameIndices.has(nameIdx))
    usedNameIndices.add(nameIdx)

    const name = competitorNames[nameIdx]
    const flagIdx = Math.floor(rng() * competitorFlags.length)

    // Distribute competitors into activity buckets
    const bucket = rng()
    let dailyXpRate: number
    let variance: number

    if (bucket < 0.2) {
      // Light user (20%)
      dailyXpRate = tierConfig.xpRange.min * 0.3
      variance = tierConfig.xpRange.min * 0.2
    } else if (bucket < 0.6) {
      // Moderate user (40%)
      dailyXpRate = (tierConfig.xpRange.min + tierConfig.xpRange.max) / 2 * 0.6
      variance = tierConfig.xpRange.min * 0.4
    } else {
      // Active user (40%)
      dailyXpRate = tierConfig.xpRange.max * 0.7
      variance = tierConfig.xpRange.max * 0.3
    }

    competitors.push({
      id: `comp-${weekStartDate}-${i}`,
      name,
      avatarInitial: name[0],
      countryFlag: competitorFlags[flagIdx],
      weeklyXp: 0,
      dailyXpRate: Math.round(dailyXpRate),
      variance: Math.round(variance),
    })
  }

  return competitors
}

/**
 * Simulate competitor XP for all elapsed days since week start.
 * Deterministic: same inputs always produce same outputs.
 */
export function simulateCompetitorXp(
  competitors: LeagueCompetitor[],
  weekStartDate: string,
): LeagueCompetitor[] {
  const weekStart = new Date(weekStartDate)
  const now = new Date()
  const elapsedDays = Math.min(
    7,
    Math.floor((now.getTime() - weekStart.getTime()) / (24 * 60 * 60 * 1000))
  )

  return competitors.map(comp => {
    let totalXp = 0
    for (let day = 0; day < elapsedDays; day++) {
      const daySeed = hashSeed(comp.id + day.toString())
      const dayRng = seededRandom(daySeed)
      const dayRandom = dayRng()

      // Some competitors skip days (10% chance per day)
      if (dayRandom < 0.1) continue

      const xpGain = comp.dailyXpRate + (dayRandom - 0.5) * 2 * comp.variance
      totalXp += Math.max(0, Math.round(xpGain))
    }

    return { ...comp, weeklyXp: totalXp }
  })
}

/**
 * Get the user's rank in the league (1-based)
 */
export function getUserRank(userXp: number, competitors: LeagueCompetitor[]): number {
  const higherCount = competitors.filter(c => c.weeklyXp > userXp).length
  return higherCount + 1
}

/**
 * Determine promotion/demotion based on rank
 */
export function getWeekResult(
  rank: number,
  currentTier: 1 | 2 | 3 | 4 | 5,
): { promoted: boolean; demoted: boolean; newTier: 1 | 2 | 3 | 4 | 5 } {
  const tierConfig = leagueTiers.find(t => t.tier === currentTier)!
  const totalParticipants = COMPETITORS_PER_LEAGUE

  const promoted = tierConfig.promoteCount > 0 && rank <= tierConfig.promoteCount
  const demoted = tierConfig.demoteCount > 0 && rank > totalParticipants - tierConfig.demoteCount

  let newTier = currentTier
  if (promoted && currentTier < 5) newTier = (currentTier + 1) as 1 | 2 | 3 | 4 | 5
  if (demoted && currentTier > 1) newTier = (currentTier - 1) as 1 | 2 | 3 | 4 | 5

  return { promoted, demoted, newTier }
}

/**
 * Get league tier config by tier number
 */
export function getTierConfig(tier: number): LeagueTier {
  return leagueTiers.find(t => t.tier === tier) ?? leagueTiers[0]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/league-simulator.ts
git commit -m "feat: add league simulator with seeded PRNG and deterministic XP simulation"
```

---

## Task 6: Nudge Engine Library & Nudge Card Data

**Files:**
- Create: `src/data/nudge-cards.ts`
- Create: `src/lib/nudge-engine.ts`

The `nudge-cards.ts` file contains the priority configuration and card template definitions. The `nudge-engine.ts` file contains the pure logic for selecting and ranking cards.

- [ ] **Step 0: Create nudge card data file**

```typescript
// src/data/nudge-cards.ts
import { NudgeType } from './engagement-types'

// Priority map (lower = higher priority)
export const nudgePriority: Record<NudgeType, number> = {
  streak_warning: 1,
  quest_proximity: 2,
  league_alert: 3,
  course_progress: 4,
  achievement_proximity: 5,
  neglected_topic: 6,
}

export const MAX_NUDGE_CARDS = 3
export const STREAK_WARNING_HOUR = 18 // Show after 6pm
```

Pure functions for computing which nudge cards and continuation hooks to display.

- [ ] **Step 1: Create nudge engine**

```typescript
// src/lib/nudge-engine.ts
import { NudgeCard, NudgeType, ContinuationHook, HookType, Quest } from '@/data/engagement-types'
import { STALE_TOPIC_DAYS } from '@/data/engagement-types'

// Priority map for nudge cards (lower = higher priority)
const NUDGE_PRIORITY: Record<NudgeType, number> = {
  streak_warning: 1,
  quest_proximity: 2,
  league_alert: 3,
  course_progress: 4,
  achievement_proximity: 5,
  neglected_topic: 6,
}

// Priority map for continuation hooks
const HOOK_PRIORITY: Record<HookType, number> = {
  streak: 1,
  quest: 2,
  unit_proximity: 3,
  xp_level: 4,
  league: 5,
  double_xp: 6,
}

interface NudgeContext {
  currentStreak: number
  lastActiveDate: string
  todayDate: string
  currentHour: number
  dailyQuests: Quest[]
  leagueRank: number
  leagueTier: number
  courseProgressPercent: number
  currentUnitLessonsRemaining: number
  currentUnitTitle: string
  achievementProximity: { name: string; remaining: number } | null
  neglectedTopic: { name: string; daysSince: number } | null
  dismissedNudges: Record<string, string>
}

/**
 * Generate nudge cards based on current user context.
 * Returns at most 3 cards, sorted by priority.
 */
export function generateNudgeCards(ctx: NudgeContext): NudgeCard[] {
  const cards: NudgeCard[] = []
  const today = ctx.todayDate

  // Skip dismissed nudges for today
  const isDismissed = (type: NudgeType) => ctx.dismissedNudges[type] === today

  // 1. Streak warning (after 6pm if haven't practiced today)
  if (
    !isDismissed('streak_warning') &&
    ctx.currentStreak > 0 &&
    ctx.lastActiveDate !== today &&
    ctx.currentHour >= 18
  ) {
    cards.push({
      type: 'streak_warning',
      title: 'Streak at Risk!',
      message: `Don't forget — practice today to keep your ${ctx.currentStreak}-day streak alive!`,
      ctaLabel: 'Practice Now',
      ctaHref: '/',
      priority: NUDGE_PRIORITY.streak_warning,
      icon: '🔥',
    })
  }

  // 2. Quest proximity (any quest within 1 of completion)
  const nearQuest = ctx.dailyQuests.find(q => !q.completed && q.target - q.progress === 1)
  if (nearQuest && !isDismissed('quest_proximity')) {
    cards.push({
      type: 'quest_proximity',
      title: 'Almost There!',
      message: `${nearQuest.title}: just 1 more to complete this quest and earn your reward!`,
      ctaLabel: 'Finish Quest',
      ctaHref: '/',
      priority: NUDGE_PRIORITY.quest_proximity,
      icon: nearQuest.icon,
    })
  }

  // 3. League alert (rank 6-7, within striking distance of top 5)
  if (ctx.leagueRank > 5 && ctx.leagueRank <= 7 && !isDismissed('league_alert')) {
    cards.push({
      type: 'league_alert',
      title: 'League Push!',
      message: `You're in ${ctx.leagueRank}th place — a few lessons could put you in the promotion zone!`,
      ctaLabel: 'Earn XP',
      ctaHref: '/league',
      priority: NUDGE_PRIORITY.league_alert,
      icon: '🏆',
    })
  }

  // 4. Course progress
  if (
    ctx.currentUnitLessonsRemaining > 0 &&
    ctx.currentUnitLessonsRemaining <= 3 &&
    !isDismissed('course_progress')
  ) {
    cards.push({
      type: 'course_progress',
      title: 'Keep Going!',
      message: `You're ${Math.round(ctx.courseProgressPercent)}% through ${ctx.currentUnitTitle} — just ${ctx.currentUnitLessonsRemaining} lessons left!`,
      ctaLabel: 'Continue',
      ctaHref: '/',
      priority: NUDGE_PRIORITY.course_progress,
      icon: '📚',
    })
  }

  // 5. Achievement proximity
  if (ctx.achievementProximity && !isDismissed('achievement_proximity')) {
    cards.push({
      type: 'achievement_proximity',
      title: 'Achievement Close!',
      message: `${ctx.achievementProximity.remaining} more to unlock "${ctx.achievementProximity.name}"!`,
      ctaLabel: 'Keep Going',
      ctaHref: '/achievements',
      priority: NUDGE_PRIORITY.achievement_proximity,
      icon: '🏅',
    })
  }

  // 6. Neglected topic
  if (ctx.neglectedTopic && !isDismissed('neglected_topic')) {
    cards.push({
      type: 'neglected_topic',
      title: 'Time to Review',
      message: `You haven't practiced ${ctx.neglectedTopic.name} in ${ctx.neglectedTopic.daysSince} days.`,
      ctaLabel: 'Practice Now',
      ctaHref: '/practice/topics',
      priority: NUDGE_PRIORITY.neglected_topic,
      icon: '📖',
    })
  }

  // Sort by priority and return top 3
  return cards.sort((a, b) => a.priority - b.priority).slice(0, 3)
}

interface HookContext {
  // Streak
  currentStreak: number
  lastActiveDate: string
  todayDate: string
  // Quest
  dailyQuests: Quest[]
  // Unit
  lessonsRemainingInUnit: number
  nextLessonId: string | null
  unitTitle: string
  // XP/Level
  xpToNextLevel: number
  nextLevelNumber: number
  // League
  leagueRank: number
  // Double XP
  doubleXpActive: boolean
}

/**
 * Generate continuation hooks for the post-lesson result screen.
 * Returns at most 2 hooks + optional double XP offer.
 */
export function generateContinuationHooks(ctx: HookContext): ContinuationHook[] {
  const hooks: ContinuationHook[] = []

  // 1. Streak
  if (ctx.currentStreak > 0 && ctx.lastActiveDate !== ctx.todayDate) {
    hooks.push({
      type: 'streak',
      message: `Keep your ${ctx.currentStreak}-day streak alive!`,
      ctaLabel: 'Continue',
      priority: HOOK_PRIORITY.streak,
      icon: '🔥',
    })
  }

  // 2. Quest proximity
  const nearQuest = ctx.dailyQuests.find(q => !q.completed && q.target - q.progress <= 1)
  if (nearQuest) {
    hooks.push({
      type: 'quest',
      message: `One more to finish "${nearQuest.title}" quest!`,
      ctaLabel: 'Finish Quest',
      priority: HOOK_PRIORITY.quest,
      icon: nearQuest.icon,
    })
  }

  // 3. Unit proximity
  if (ctx.lessonsRemainingInUnit > 0 && ctx.lessonsRemainingInUnit <= 2) {
    hooks.push({
      type: 'unit_proximity',
      message: `${ctx.lessonsRemainingInUnit} lesson${ctx.lessonsRemainingInUnit > 1 ? 's' : ''} to complete ${ctx.unitTitle}!`,
      ctaLabel: 'Keep Going',
      priority: HOOK_PRIORITY.unit_proximity,
      icon: '📚',
    })
  }

  // 4. XP/Level proximity
  if (ctx.xpToNextLevel <= 50) {
    hooks.push({
      type: 'xp_level',
      message: `Just ${ctx.xpToNextLevel} XP to reach Level ${ctx.nextLevelNumber}!`,
      ctaLabel: 'Level Up',
      priority: HOOK_PRIORITY.xp_level,
      icon: '⬆️',
    })
  }

  // 5. League promotion
  if (ctx.leagueRank > 5 && ctx.leagueRank <= 7) {
    hooks.push({
      type: 'league',
      message: `You're ${ctx.leagueRank}th — one more lesson could get you promoted!`,
      ctaLabel: 'Climb',
      priority: HOOK_PRIORITY.league,
      icon: '🏆',
    })
  }

  // Sort by priority, take top 2
  const topHooks = hooks.sort((a, b) => a.priority - b.priority).slice(0, 2)

  // Always add double XP offer if not already active
  if (!ctx.doubleXpActive) {
    topHooks.push({
      type: 'double_xp',
      message: 'Start the next lesson now for 10 minutes of Double XP!',
      ctaLabel: 'Activate 2x XP',
      priority: HOOK_PRIORITY.double_xp,
      icon: '⚡',
    })
  }

  return topHooks
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/nudge-engine.ts
git commit -m "feat: add nudge engine for dashboard cards and continuation hooks"
```

---

## Task 7: Engagement Store

**Files:**
- Create: `src/store/useEngagementStore.ts`

This is the largest single file. It contains all engagement state and actions, following the existing Zustand persist pattern from `useStore.ts`.

- [ ] **Step 1: Create the engagement store**

Create `src/store/useEngagementStore.ts` with the full store implementation. The store must:

1. Define `EngagementState` + actions interface
2. Initialize with safe defaults for new users (migration strategy)
3. Implement all actions from the spec:
   - `initDailyQuests()` / `initWeeklyQuests()` — check date, reset if needed, select new quests
   - `updateQuestProgress(key, value, filter)` — increment matching quests, auto-complete when target reached
   - `claimQuestReward(questId)` — mark claimed, add gems + XP
   - `claimChest(type)` — award chest bonus, mark claimed
   - `purchaseItem(itemId)` — deduct gems, update inventory, return success boolean
   - `useStreakFreeze()` — decrement freezesOwned, set freezeUsedToday
   - `repairStreak()` — check repair window (next calendar day), deduct gems, return success
   - `simulateLeagueWeek()` — check if new week, resolve old week (promote/demote), generate new competitors
   - `updateLeagueXp(xp)` — add to weeklyXp, re-simulate competitors
   - `checkComebackFlow()` — read lastActiveDate from useStore, compute daysAway, set isInComebackFlow
   - `dismissNudge(type)` — store dismissal with today's date
   - `activateDoubleXp()` — set expiry timestamp
   - `addGems(amount, source)` — add gems, create transaction, prune old transactions (max 100 client-side)
   - `completeComebackQuest()` — increment comebackQuestsCompleted
   - `recordStreakBreak(previousStreakValue)` — set `streak.lastStreakBreakDate = today`, `streak.lastStreakValueBeforeBreak = previousStreakValue`, `streak.repairAvailable = true` (called by engagement-init when streak breaks)
   - `activateDoubleXp(duration)` — set expiry timestamp; accepts duration param to support both free (10min) and shop (30min) durations

4. Use persist middleware with:
   - `name: 'mechready-engagement'`
   - `version: 1`
   - `partialize` to exclude computed/transient state
   - `merge` with safe defaults

5. Export selector hooks:
   - `useGems()` — gems state
   - `useDailyQuests()` — daily quests array
   - `useWeeklyQuests()` — weekly quests array
   - `useLeague()` — league state
   - `useStreak()` — streak enhancements
   - `useComeback()` — comeback state
   - `useEngagementActions()` — all actions via useShallow

Key implementation detail: The store reads from `useStore` for `lastActiveDate`, `currentStreak`, and `totalXp` but does NOT duplicate that state. It calls `useStore.getState()` inside actions when needed (e.g., `checkComebackFlow` reads `useStore.getState().progress.lastActiveDate`).

- [ ] **Step 2: Verify the store compiles**

Run: `cd "C:/Users/mrnad/OneDrive/Desktop/Mechanical Practice" && npx tsc --noEmit 2>&1 | head -30`

Fix any TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/store/useEngagementStore.ts
git commit -m "feat: add useEngagementStore with quests, gems, league, streak, and comeback state"
```

---

## Task 8: Quest Board UI

**Files:**
- Create: `src/components/engagement/QuestCard.tsx`
- Create: `src/components/engagement/QuestBoard.tsx`
- Create: `src/components/engagement/ChestAnimation.tsx`

- [ ] **Step 1: Create QuestCard component**

A single quest row showing icon, title, progress bar, and claim button. Props:
- `quest: Quest` — the quest data
- `onClaim: (questId: string) => void` — called when user claims reward

UI: horizontal card with icon on left, title + progress bar in center, gem reward badge on right. When completed but unclaimed, show "Claim" button with pulse animation. When claimed, show checkmark.

Use Tailwind for styling, `motion.div` from framer-motion for the claim animation.

- [ ] **Step 2: Create ChestAnimation component**

A modal overlay showing an animated chest opening with gems/XP flying out. Props:
- `type: 'daily' | 'weekly'`
- `reward: { xp: number; gems: number }`
- `onClose: () => void`

Use framer-motion `AnimatePresence` for enter/exit. Chest icon (use 🎁 emoji or custom), scale animation on open, particle-like gem animations.

- [ ] **Step 3: Create QuestBoard component**

Container that renders:
- Section header "Daily Quests" with reset countdown (time until midnight)
- 3 QuestCard components for daily quests
- "Chest" indicator (locked until all 3 complete, then clickable)
- Expandable "Weekly Quests" section below with same pattern

Reads from `useEngagementStore` via `useDailyQuests()`, `useWeeklyQuests()`, and `useEngagementActions()`.

Calls `initDailyQuests()` and `initWeeklyQuests()` in a `useEffect` on mount.

- [ ] **Step 4: Commit**

```bash
git add src/components/engagement/QuestCard.tsx src/components/engagement/QuestBoard.tsx src/components/engagement/ChestAnimation.tsx
git commit -m "feat: add quest board UI with quest cards and chest animation"
```

---

## Task 9: Gem Counter & Gem Shop

**Files:**
- Create: `src/components/engagement/GemCounter.tsx`
- Create: `src/components/engagement/GemShop.tsx`
- Create: `src/app/(app)/shop/page.tsx`

- [ ] **Step 1: Create GemCounter component**

Small inline component for the top bar. Shows diamond emoji + gem count. Styled like the existing XP badge in TopBar.tsx (amber background, rounded pill). Use purple/blue tint to differentiate from XP.

```typescript
// Reads from useEngagementStore
const { balance } = useGems()
```

On gem earn events, the count should briefly scale up (use `motion.span` with `key={balance}` to trigger animation on change).

- [ ] **Step 2: Create GemShop component**

Grid of shop items. Each item card shows: icon, name, description, cost (with gem icon), and buy button. Buy button disabled + grayed when insufficient balance (shows "Need X more" tooltip).

Reads from `useGems()` for balance, `useEngagementActions()` for `purchaseItem`. Also reads `useStreak()` to check `freezesOwned < MAX_STREAK_FREEZES` for streak freeze availability.

For consumables (streak freeze, double XP): show current inventory count.
For cosmetics (titles, frames): show "Owned" badge if already purchased, disable buy button.

- [ ] **Step 3: Create shop page**

```typescript
// src/app/(app)/shop/page.tsx
'use client'
import { GemShop } from '@/components/engagement/GemShop'

export default function ShopPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gem Shop</h1>
      <GemShop />
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/engagement/GemCounter.tsx src/components/engagement/GemShop.tsx src/app/\(app\)/shop/page.tsx
git commit -m "feat: add gem counter, gem shop component, and shop page"
```

---

## Task 10: League UI

**Files:**
- Create: `src/components/engagement/LeagueCard.tsx`
- Create: `src/components/engagement/LeagueBoard.tsx`
- Create: `src/components/engagement/LeaguePromotion.tsx`
- Create: `src/app/(app)/league/page.tsx`

- [ ] **Step 1: Create LeagueCard component**

Dashboard summary card showing:
- Current tier badge (icon + name + color)
- User's rank (e.g., "#6 of 30")
- Mini top-5 list (name + XP, user highlighted if in top 5)
- "View Full Leaderboard" link to /league

Reads from `useLeague()` and `useEngagementActions()` (for simulating competitor XP on mount).

- [ ] **Step 2: Create LeagueBoard component**

Full scrollable leaderboard. Shows all 30 entries sorted by weeklyXp descending. Each row: rank number, avatar initial in circle, name, country flag, XP. User's row highlighted with primary color. Promotion zone (top 5) has subtle green background. Demotion zone (bottom 5) has subtle red background.

- [ ] **Step 3: Create LeaguePromotion component**

Full-screen overlay shown when user first visits after a league week ends and they haven't seen the result. Shows:
- If promoted: celebration animation, confetti, "Promoted to Silver!" with tier icon
- If demoted: consolation message, "Moved to Bronze" with encouragement
- If stayed: "Stayed in Gold — nice consistency!" neutral tone
- Gem reward display if promoted
- "Continue" button dismisses and marks `resultSeen: true`

- [ ] **Step 4: Create league page**

```typescript
// src/app/(app)/league/page.tsx
'use client'
import { LeagueBoard } from '@/components/engagement/LeagueBoard'
import { LeaguePromotion } from '@/components/engagement/LeaguePromotion'

export default function LeaguePage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <LeagueBoard />
      <LeaguePromotion />
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/engagement/LeagueCard.tsx src/components/engagement/LeagueBoard.tsx src/components/engagement/LeaguePromotion.tsx src/app/\(app\)/league/page.tsx
git commit -m "feat: add league UI with leaderboard, tier card, and promotion animations"
```

---

## Task 11: Continuation Hooks & Double XP

**Files:**
- Create: `src/components/engagement/ContinuationHooks.tsx`
- Create: `src/components/engagement/DoubleXpTimer.tsx`

- [ ] **Step 1: Create ContinuationHooks component**

Renders a list of hook cards below the lesson result / session summary. Each hook card: icon, message, CTA button. Double XP hook has a countdown timer.

Props:
- `nextLessonId: string | null` — for "Continue" button navigation
- `xpEarned: number` — for computing what changed
- `accuracy: number` — for accuracy-based quest tracking

Internally uses `generateContinuationHooks()` from `src/lib/nudge-engine.ts`, passing context from `useEngagementStore`, `useStore`, and `useCourseStore`.

The component calls `useEngagementActions().activateDoubleXp()` when user clicks the double XP hook.

- [ ] **Step 2: Create DoubleXpTimer component**

Shows a countdown timer when double XP is active. Displays "2x XP" badge + remaining time (mm:ss). Uses `useEffect` with `setInterval` to tick every second. Reads `doubleXpExpiry` from engagement store.

When timer expires, show brief "Double XP ended" toast and clear `doubleXpExpiry`.

Styling: urgent yellow/amber background, pulsing animation when < 2 minutes remaining.

- [ ] **Step 3: Commit**

```bash
git add src/components/engagement/ContinuationHooks.tsx src/components/engagement/DoubleXpTimer.tsx
git commit -m "feat: add continuation hooks and double XP timer components"
```

---

## Task 12: Streak Enhancement UI

**Files:**
- Create: `src/components/engagement/StreakFreeze.tsx`
- Create: `src/components/engagement/StreakMilestone.tsx`

- [ ] **Step 1: Create StreakFreeze component**

Two modes:
1. **Freeze notification** (shown on dashboard load if freeze was consumed): Banner saying "Your streak freeze saved your X-day streak yesterday!" with ice crystal icon. Dismissible.
2. **Repair modal** (shown on first visit after streak break, if within repair window): Modal with "Your streak broke!" message, previous streak value, cost to repair (50 gems), and Repair / Skip buttons. Calls `useEngagementActions().repairStreak()`.

Reads from `useStreak()` for freeze/repair state, `useGems()` for balance check.

- [ ] **Step 2: Create StreakMilestone component**

Full-screen celebration overlay shown when a streak milestone is reached (7, 14, 30, 60, 100 days). Shows:
- Milestone badge icon and name (e.g., "Committed 🌳")
- Gem reward amount with gem shower animation
- "Keep going!" message with next milestone target
- If milestone grants a frame or title, show it

Triggered from the engagement store when `currentStreak` (from useStore) crosses a milestone threshold that isn't in `milestonesReached`.

- [ ] **Step 3: Commit**

```bash
git add src/components/engagement/StreakFreeze.tsx src/components/engagement/StreakMilestone.tsx
git commit -m "feat: add streak freeze notification, repair modal, and milestone celebration"
```

---

## Task 13: Comeback Mechanics UI

**Files:**
- Create: `src/components/engagement/WelcomeBack.tsx`

- [ ] **Step 1: Create WelcomeBack component**

Full-screen overlay shown when `comeback.isInComebackFlow` is true AND `comeback.comebackQuestsCompleted === 0` (first visit after 3+ days away).

Shows:
- Friendly welcome message: "Welcome back! We missed you."
- Days away count
- If streak broke: gentle acknowledgment + repair offer (if available)
- Comeback quest chain preview (3 easy quests with rewards)
- "Let's Go!" button dismisses overlay

After dismissing, the comeback quests replace daily quests in the QuestBoard for that day. The QuestBoard component checks `comeback.isInComebackFlow` and shows comeback quests from `src/data/quests.ts` instead of regular daily quests.

- [ ] **Step 2: Commit**

```bash
git add src/components/engagement/WelcomeBack.tsx
git commit -m "feat: add welcome back overlay for comeback flow"
```

---

## Task 14: Dashboard Nudge Cards

**Files:**
- Create: `src/components/engagement/NudgeCards.tsx`

- [ ] **Step 1: Create NudgeCards component**

Renders up to 3 contextual nudge cards above the course map on the dashboard. Each card: colored left border (based on priority), icon, message, CTA button, dismiss (X) button.

Uses `generateNudgeCards()` from `src/lib/nudge-engine.ts`, passing context gathered from:
- `useStore` — streak, XP, achievements, topic progress
- `useCourseStore` — unit progress, lessons remaining
- `useEngagementStore` — quests, league, dismissed nudges

Dismiss calls `useEngagementActions().dismissNudge(type)`.

Link/button navigation uses Next.js `useRouter().push()`.

- [ ] **Step 2: Commit**

```bash
git add src/components/engagement/NudgeCards.tsx
git commit -m "feat: add dashboard nudge cards component"
```

---

## Task 15: Integrate Dashboard Page

**Files:**
- Modify: `src/app/(app)/page.tsx`

- [ ] **Step 1: Read current dashboard page**

Read `src/app/(app)/page.tsx` to see exact current structure.

- [ ] **Step 2: Add engagement components to dashboard**

Add imports and render new components. The updated structure should be:

```
<WelcomeBack />                    {/* Full-screen overlay, only shows when comeback flow active */}
<LeaguePromotion />                {/* Full-screen overlay, only shows on league week transition */}
<StreakMilestone />                 {/* Full-screen overlay, only shows on milestone */}
<StreakFreeze />                    {/* Banner/modal for freeze notification or repair */}
<CourseHeader />                    {/* Existing */}
<NudgeCards />                      {/* New: contextual motivation cards */}
<QuestBoard />                      {/* New: daily + weekly quests */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    <CourseMap />                    {/* Existing */}
  </div>
  <div>
    <LeagueCard />                  {/* New: league summary sidebar */}
  </div>
</div>
{activeLesson && <LessonView />}    {/* Existing */}
{lessonResult && <ResultScreen />}  {/* Existing */}
```

**DO NOT** add initialization `useEffect` calls here. All initialization (`initDailyQuests`, `initWeeklyQuests`, `checkComebackFlow`, `simulateLeagueWeek`) is handled by `useEngagementInit()` in Task 19, which runs at the app layout level. Adding them here too would cause double-initialization. The dashboard page only renders components — the init hook in the layout ensures data is ready before the page renders.

- [ ] **Step 3: Verify the page renders**

Run: `cd "C:/Users/mrnad/OneDrive/Desktop/Mechanical Practice" && npm run build 2>&1 | tail -20`

Fix any build errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(app\)/page.tsx
git commit -m "feat: integrate engagement components into dashboard page"
```

---

## Task 16: Integrate TopBar & Sidebar

**Files:**
- Modify: `src/components/layout/TopBar.tsx`
- Modify: `src/components/layout/Sidebar.tsx`

- [ ] **Step 1: Read current TopBar and Sidebar**

Read both files to see exact current content.

- [ ] **Step 2: Add GemCounter and league badge to TopBar**

In `TopBar.tsx`:
- Import `GemCounter` and `DoubleXpTimer`
- Add `<GemCounter />` after the XP badge (after the amber XP display, around line 53)
- Add league tier badge after the level progress bar (small icon showing current tier)
- Add `<DoubleXpTimer />` as a floating element or inline badge when active

- [ ] **Step 3: Add League and Shop to Sidebar**

In `Sidebar.tsx`:
- Import `Crown` and `ShoppingBag` icons from lucide-react
- Add to `navItems` array, before the divider:
  ```typescript
  { href: '/league', label: 'League', icon: Crown },
  ```
- Add after the divider, before Pricing:
  ```typescript
  { href: '/shop', label: 'Gem Shop', icon: ShoppingBag },
  ```

- [ ] **Step 4: Verify navigation works**

Run: `npm run build 2>&1 | tail -20`

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/TopBar.tsx src/components/layout/Sidebar.tsx
git commit -m "feat: add gem counter and league badge to top bar, league and shop to sidebar"
```

---

## Task 17: Integrate ResultScreen

**Files:**
- Modify: `src/components/lesson/ResultScreen.tsx`

- [ ] **Step 1: Read current ResultScreen**

Read `src/components/lesson/ResultScreen.tsx` to see exact structure (323 lines).

- [ ] **Step 2: Add engagement hooks to ResultScreen**

After the existing content (achievement badges section, around line 286) and before the "Continue" button (around line 289), insert:

```typescript
<ContinuationHooks
  nextLessonId={/* derive from useCourseStore */}
  xpEarned={lessonResult.xpEarned}
  accuracy={lessonResult.accuracy}
/>
```

Add a `useEffect` that fires when `lessonResult` becomes non-null, calling:
```typescript
const { updateQuestProgress, updateLeagueXp, addGems } = useEngagementActions()

useEffect(() => {
  if (lessonResult) {
    // Core quest tracking
    updateQuestProgress('lessons_completed', 1)
    updateLeagueXp(lessonResult.xpEarned)
    updateQuestProgress('xp_earned', lessonResult.xpEarned)

    // Accuracy-based quests
    if (lessonResult.accuracy >= 80) {
      updateQuestProgress('accuracy_above_threshold', 1)
    }
    if (lessonResult.accuracy === 100 && lessonResult.totalQuestions >= 3) {
      updateQuestProgress('perfect_sessions', 1)
    }

    // Star-based quests
    if (lessonResult.stars === 3) {
      updateQuestProgress('stars_earned', 1)
    }

    // Topic tracking (derive topic from lesson/unit data)
    updateQuestProgress('topics_practiced', 1)

    // Stale topic check (check if topic's lastAttempted was > 7 days ago)
    // Read from useStore.getState().progress.topicProgress to check dates
    const topicProgress = useStore.getState().progress.topicProgress
    // The topic for this lesson can be derived from the unit data
    // If the topic was stale (>7 days), emit:
    // updateQuestProgress('stale_topic_practiced', 1)

    // Gem awards for first-time 3-star and first-time unit completion
    if (lessonResult.isFirstCompletion && lessonResult.stars === 3) {
      addGems(10, '3_star_first_time')
    }
    // Check if this lesson completed a unit (all lessons in unit done)
    // If so: addGems(50, 'unit_completion')
  }
}, [lessonResult])
```

**Note on stale topic and unit completion:** The exact implementation depends on data available from `useCourseStore`. The engineer must:
1. Derive the topic from the lesson's unit (e.g., Unit 1 = statics topic)
2. Check `topicProgress[topic].lastAttempted` to determine if stale
3. Check if all lessons in the current unit are now complete for unit gem award

- [ ] **Step 3: Commit**

```bash
git add src/components/lesson/ResultScreen.tsx
git commit -m "feat: integrate quest progress, league XP, and continuation hooks into ResultScreen"
```

---

## Task 18: Integrate SessionSummary

**Files:**
- Modify: `src/components/session/SessionSummary.tsx`

- [ ] **Step 1: Read current SessionSummary**

Read `src/components/session/SessionSummary.tsx` (109 lines).

- [ ] **Step 2: Add engagement hooks to SessionSummary**

Add a `useEffect` that fires on mount with the session summary data:
```typescript
const { updateQuestProgress, updateLeagueXp } = useEngagementActions()

useEffect(() => {
  // Core tracking
  updateQuestProgress('sessions_completed', 1)
  updateQuestProgress('questions_correct', summary.questionsCorrect)
  updateLeagueXp(summary.xpEarned)
  updateQuestProgress('xp_earned', summary.xpEarned)

  // Accuracy-based
  if (summary.accuracy >= 80) {
    updateQuestProgress('accuracy_above_threshold', 1)
  }
  if (summary.accuracy === 100 && summary.questionsAttempted >= 3) {
    updateQuestProgress('perfect_sessions', 1)
  }

  // Topic tracking — session summary includes topics practiced
  // The session's topic(s) can be derived from session type + questions
  updateQuestProgress('topics_practiced', 1)

  // Stale topic check — same pattern as ResultScreen:
  // check topicProgress[topic].lastAttempted vs STALE_TOPIC_DAYS
  // if stale: updateQuestProgress('stale_topic_practiced', 1)

  // Daily challenge tracking
  if (summary.type === 'daily-challenge') {
    updateQuestProgress('daily_challenges_completed', 1)
  }

  // Fast answers — count questions answered correctly in < 30 seconds
  // Read from session data (summary includes per-question timing if available)
  // For each fast correct answer: updateQuestProgress('fast_answers', 1)

  // Streak days — read current streak from useStore
  const currentStreak = useStore.getState().progress.currentStreak
  if (currentStreak > 0) {
    updateQuestProgress('streak_days', currentStreak)
  }
}, [])
```

**Note on `fast_answers`:** The existing `useStore` tracks `xpPerQuestion` per answer in `ActiveSession.xpPerQuestion` (line 25 of useStore.ts). Time-per-question is not currently tracked. To support `fast_answers`, the `answerQuestion` action in `useStore` must be modified to record answer timestamps. The engineer should add `answerTimestamps: number[]` to `ActiveSession` and push `Date.now()` on each answer.

Add `<ContinuationHooks />` between the action buttons and the stats section, or below the action buttons as a "One more?" section.

- [ ] **Step 3: Commit**

```bash
git add src/components/session/SessionSummary.tsx
git commit -m "feat: integrate quest progress, league XP, and continuation hooks into SessionSummary"
```

---

## Task 19: Integrate Streak Freeze on App Load

**Files:**
- Modify: `src/store/useStore.ts` (or create a provider component)

- [ ] **Step 1: Read useStore.ts streak logic**

Read `src/store/useStore.ts` lines 323-413 to understand streak reset logic in `completeSession`.

- [ ] **Step 2: Add streak freeze integration**

The best integration point is a React provider or layout component that runs on app load. Create or modify the app layout to include a `useEffect` that:

1. Reads `lastActiveDate` from `useStore`
2. If today is 2+ days after `lastActiveDate` AND `streak.freezesOwned > 0`:
   - Consume one freeze (`useEngagementActions().useStreakFreeze()`)
   - Preserve streak in `useStore` (set `lastActiveDate` to yesterday so next session continues streak)
3. If streak broke (gap > 1 day, no freeze available):
   - Set `streak.lastStreakBreakDate` and `streak.lastStreakValueBeforeBreak`
   - Set `streak.repairAvailable = true`

This requires reading from both stores and coordinating. The cleanest approach is a `useEngagementInit()` hook called once in the app layout.

- [ ] **Step 3: Create `src/lib/engagement-init.ts` with the initialization hook**

```typescript
'use client'
import { useEffect, useRef } from 'react'
import { useStore } from '@/store/useStore'
import { useEngagementStore } from '@/store/useEngagementStore'

function getYesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

export function useEngagementInit() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const progress = useStore.getState().progress
    const engagement = useEngagementStore.getState()
    const today = new Date().toISOString().split('T')[0]

    // Check streak freeze / break on load
    if (progress.lastActiveDate && progress.lastActiveDate !== today) {
      const lastActive = new Date(progress.lastActiveDate)
      const todayDate = new Date(today)
      const daysDiff = Math.floor((todayDate.getTime() - lastActive.getTime()) / (24 * 60 * 60 * 1000))

      if (daysDiff === 1 && engagement.streak.freezesOwned > 0) {
        // Missed exactly 1 day — consume a freeze to protect the streak
        // Set lastActiveDate to yesterday so the next session's streak logic
        // sees a continuous streak (it checks yesterday vs lastActiveDate)
        useEngagementStore.getState().useStreakFreeze()
        useStore.setState(state => ({
          progress: { ...state.progress, lastActiveDate: getYesterday() }
        }))
      } else if (daysDiff >= 2 && engagement.streak.freezesOwned > 0) {
        // Missed 2+ days — freeze can only cover 1 day, so streak is still broken.
        // A single freeze cannot bridge a multi-day gap.
        // Record the break for repair offer.
        useEngagementStore.getState().recordStreakBreak(progress.currentStreak)
      } else if (daysDiff >= 1 && engagement.streak.freezesOwned === 0) {
        // No freeze available — streak will break on next session.
        // Record the break date and value for the repair window.
        if (progress.currentStreak > 0) {
          useEngagementStore.getState().recordStreakBreak(progress.currentStreak)
        }
      }
    }

    // Initialize quests and league on load
    // NOTE: Dashboard page (Task 15) must NOT duplicate these calls.
    // All initialization happens here in the layout, not in page-level useEffects.
    useEngagementStore.getState().initDailyQuests()
    useEngagementStore.getState().initWeeklyQuests()
    useEngagementStore.getState().simulateLeagueWeek()
    useEngagementStore.getState().checkComebackFlow()
  }, [])
}
```

**Important:** The `recordStreakBreak(previousStreakValue)` action must be added to the engagement store (Task 7). It sets `streak.lastStreakBreakDate = today`, `streak.lastStreakValueBeforeBreak = previousStreakValue`, and `streak.repairAvailable = true`.

- [ ] **Step 4: Add the hook to the app layout**

In the main layout or a client wrapper component, call `useEngagementInit()`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/engagement-init.ts src/store/useStore.ts
git commit -m "feat: add engagement initialization hook with streak freeze and quest/league setup"
```

---

## Task 20: Database Schema Additions

**Files:**
- Modify: `src/lib/db/schema.ts`

- [ ] **Step 1: Read current schema**

Read `src/lib/db/schema.ts` to see exact import patterns and table definitions.

- [ ] **Step 2: Add new tables and columns**

Add the three new tables (`gemTransactions`, `questProgress`, `leagueState`) following the exact Drizzle patterns from the spec. Add four new columns to the existing `userProgress` table definition.

Ensure imports include `integer`, `jsonb`, `boolean` from `drizzle-orm/pg-core` (check which are already imported).

- [ ] **Step 3: Commit**

```bash
git add src/lib/db/schema.ts
git commit -m "feat: add engagement database schema (gems, quests, league tables)"
```

---

## Task 21: API Route Sync

**Files:**
- Modify: `src/app/api/progress/route.ts`

- [ ] **Step 1: Read current progress API route**

Read `src/app/api/progress/route.ts` to understand the existing sync pattern.

- [ ] **Step 2: Add engagement data sync**

Extend the existing POST handler to accept and persist engagement data alongside the existing progress data. The route should:

1. Accept optional engagement fields in the request body:
   - `gems: { balance, totalEarned }` — sync gem state
   - `leagueTier: number` — sync league tier
   - `streakFreezes: number` — sync freeze count
   - `streakMilestones: number[]` — sync reached milestones

2. Write to the new database tables:
   - Update `userProgress` columns: `gemsBalance`, `gemsTotalEarned`, `streakFreezes`, `streakMilestones`
   - Upsert `leagueState` row for the user

3. For gem transactions: batch-insert new transactions to `gemTransactions` table (the client sends only new transactions since last sync)

4. For quest progress: the client sends completed quest IDs; the server stores them in `questProgress` for history/analytics

Follow the existing pattern in the route for auth checks, error handling, and response format.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/progress/route.ts
git commit -m "feat: add engagement data sync to progress API route"
```

---

## Task 22: Final Build Verification

- [ ] **Step 1: Run full build**

```bash
cd "C:/Users/mrnad/OneDrive/Desktop/Mechanical Practice" && npm run build
```

Fix any TypeScript errors, missing imports, or build failures.

- [ ] **Step 2: Manual smoke test**

Start the dev server (`npm run dev`) and verify:
1. Dashboard shows quest board, nudge cards, and league card
2. Top bar shows gem counter
3. Sidebar shows League and Shop links
4. `/shop` page renders with items
5. `/league` page renders with leaderboard
6. Complete a lesson → see continuation hooks on result screen
7. Quest progress updates after lesson completion

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "fix: resolve build errors and finalize engagement system integration"
```

---

## Dependency Order

```
Task 1 (types + re-export)
  ├→ Task 2 (quest data)
  ├→ Task 3 (league/shop/streak data)
  ├→ Task 4 (quest engine) ──────┐
  ├→ Task 5 (league simulator) ──┤
  └→ Task 6 (nudge data+engine) ─┤
                                  ▼
                          Task 7 (engagement store)
                                  │
              ┌───────────────────┼───────────────────┐
              ▼                   ▼                   ▼
    Task 8 (quest UI)    Task 9 (gem UI)    Task 10 (league UI)
    Task 11 (hooks)      Task 12 (streak)   Task 13 (comeback)
    Task 14 (nudge UI)
              │                   │                   │
              └───────────────────┼───────────────────┘
                                  ▼
                    Task 19 (engagement-init) ← MUST run first in this group
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
          Task 15 (dashboard)  Task 16    Task 17 (ResultScreen)
          Task 18 (SessionSummary)        Task 20 (schema)
                    Task 21 (API sync)
                    │             │             │
                    └─────────────┼─────────────┘
                                  ▼
                    Task 22 (build verification)
```

Tasks 2-6 can run in parallel after Task 1.
Tasks 8-14 can run in parallel after Task 7.
**Task 19 must run before Tasks 15-18** (dashboard must not duplicate init calls).
Tasks 15-18, 20-21 can run in parallel after Task 19.
Task 22 runs last.
