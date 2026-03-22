# Fake User Pool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace disposable weekly league competitors with a persistent pool of ~250 fake users that have varied identities, DiceBear avatars, profile depth, and weekly progression.

**Architecture:** A new `fake-user-generator.ts` module handles pool creation, weekly progression, and competitor drawing. The pool is stored in localStorage under `mechready-fake-users`, separate from the engagement store. The existing `simulateCompetitorXp()` function continues to handle intra-week XP simulation unchanged. A new `CompetitorPreview` bottom sheet shows fake user profiles when tapping leaderboard rows.

**Tech Stack:** TypeScript, Zustand (existing store), DiceBear (client-side SVG avatars), Framer Motion (bottom sheet animation), localStorage persistence.

**Spec:** `docs/superpowers/specs/2026-03-22-fake-user-pool-design.md`

**No test framework exists in this project.** Verification is via `npm run build` (type checks) and manual testing with `npm run dev`.

---

### Task 1: Add Types and Interfaces

**Files:**
- Modify: `src/data/engagement-types.ts`

- [ ] **Step 1: Add `FakeUser` and `FakeUserPool` interfaces to `engagement-types.ts`**

Add after the existing `LeagueTier` interface (around line 137):

```typescript
// --------------- Fake User Pool ---------------

export interface FakeUser {
  id: string;
  name: string;
  nameQuality: 1 | 2 | 3 | 4 | 5;
  avatarType: 'none' | 'dicebear';
  avatarStyle?: string;
  avatarSeed: string;
  countryFlag: string;
  joinDate: string;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  achievementsUnlocked: string[];
  topicMastery: {
    topicId: string;
    masteryLevel: 'not-started' | 'needs-work' | 'developing' | 'strong';
  }[];
  currentTier: 1 | 2 | 3 | 4 | 5;
  activityLevel: number;
  consistency: number;
  lastProgressedWeek: string;
}

export interface FakeUserPool {
  version: number;
  pool: FakeUser[];
  lastWeekProcessed: string;
}
```

- [ ] **Step 2: Add `fakeUserId` to `LeagueCompetitor`**

In the existing `LeagueCompetitor` interface (~line 100-108), add the optional field:

```typescript
export interface LeagueCompetitor {
  id: string;
  name: string;
  avatarInitial: string;
  countryFlag: string;
  weeklyXp: number;
  dailyXpRate: number;
  variance: number;
  fakeUserId?: string;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/engagement-types.ts
git commit -m "feat(league): add FakeUser and FakeUserPool type definitions"
```

---

### Task 2: Create Fake Names Data File

**Files:**
- Create: `src/data/fake-names.ts`

- [ ] **Step 1: Create `src/data/fake-names.ts` with 250 names across 5 quality tiers**

Each name has a `quality` field (1-5). ~50 names per quality tier. Names are diverse across Israeli, American, European, Asian, Latin American, and Middle Eastern/African origins.

```typescript
export interface FakeName {
  name: string;
  quality: 1 | 2 | 3 | 4 | 5;
}

export const fakeNames: FakeName[] = [
  // ═══════════════ QUALITY 1 — Gamertags (50) ═══════════════
  // ME-themed
  { name: 'ThermoKing', quality: 1 },
  { name: 'StressStrain99', quality: 1 },
  { name: 'GearHead42', quality: 1 },
  { name: 'TorqueMonster', quality: 1 },
  { name: 'FluidDynamo', quality: 1 },
  { name: 'BoltBoy', quality: 1 },
  { name: 'PressureDrop_Kid', quality: 1 },
  { name: 'CADmonkey', quality: 1 },
  { name: 'BendingMoment', quality: 1 },
  { name: 'ShearForce_Pro', quality: 1 },
  { name: 'NozzleNerd', quality: 1 },
  { name: 'PistonHead', quality: 1 },
  { name: 'WeldMaster3000', quality: 1 },
  { name: 'CrankShaftKing', quality: 1 },
  { name: 'TurboBlade', quality: 1 },
  { name: 'FailureMode', quality: 1 },
  { name: 'ReynoldsNum', quality: 1 },
  { name: 'MohrCircle_Fan', quality: 1 },
  { name: 'VonMises420', quality: 1 },
  { name: 'BucklingBoss', quality: 1 },
  // Generic internet names
  { name: 'xX_Dan_Xx', quality: 1 },
  { name: 'CoolGuy99', quality: 1 },
  { name: 'n00b_eng', quality: 1 },
  { name: 'ProPlayer_IL', quality: 1 },
  { name: 'DarkKnight_ME', quality: 1 },
  { name: 'ninja_calc', quality: 1 },
  { name: 'ShadowEng', quality: 1 },
  { name: 'SkillzMaster', quality: 1 },
  { name: 'EpicFail_404', quality: 1 },
  { name: 'NotABot_', quality: 1 },
  { name: 'LazyEngineer', quality: 1 },
  { name: 'coffee_driven', quality: 1 },
  { name: 'ctrl_alt_eng', quality: 1 },
  { name: 'MatlabHater', quality: 1 },
  { name: 'SolidWorks_bro', quality: 1 },
  { name: 'FEA_noob', quality: 1 },
  { name: 'HeatSink_69', quality: 1 },
  { name: 'Valve_Guy', quality: 1 },
  { name: 'Drafting_Dude', quality: 1 },
  { name: 'AxialForce', quality: 1 },
  { name: 'RocketFuel_x', quality: 1 },
  { name: 'Spring_Constant', quality: 1 },
  { name: 'Derp_Engineer', quality: 1 },
  { name: 'BearingLife', quality: 1 },
  { name: 'Fatigue_Limit', quality: 1 },
  { name: 'Yield_Stress', quality: 1 },
  { name: 'CNC_wizard', quality: 1 },
  { name: 'Flux_Core', quality: 1 },
  { name: 'GCode_King', quality: 1 },
  { name: 'toleranceZone', quality: 1 },

  // ═══════════════ QUALITY 2 — Casual/Lazy (50) ═══════════════
  { name: 'danny', quality: 2 },
  { name: 'Sara M', quality: 2 },
  { name: 'mike_t', quality: 2 },
  { name: 'noa r', quality: 2 },
  { name: 'amit k', quality: 2 },
  { name: 'priya s', quality: 2 },
  { name: 'wei z', quality: 2 },
  { name: 'carlos h', quality: 2 },
  { name: 'yael', quality: 2 },
  { name: 'omar h', quality: 2 },
  { name: 'tomer', quality: 2 },
  { name: 'Ren', quality: 2 },
  { name: 'sofia m', quality: 2 },
  { name: 'james c', quality: 2 },
  { name: 'lucas m', quality: 2 },
  { name: 'elena p', quality: 2 },
  { name: 'diego f', quality: 2 },
  { name: 'gal', quality: 2 },
  { name: 'oren k', quality: 2 },
  { name: 'maya f', quality: 2 },
  { name: 'ryo t', quality: 2 },
  { name: 'arjun p', quality: 2 },
  { name: 'aisha d', quality: 2 },
  { name: 'tyler a', quality: 2 },
  { name: 'rachel m', quality: 2 },
  { name: 'kevin n', quality: 2 },
  { name: 'jae', quality: 2 },
  { name: 'Pooja', quality: 2 },
  { name: 'valentina', quality: 2 },
  { name: 'mateo v', quality: 2 },
  { name: 'natalia r', quality: 2 },
  { name: 'khalid m', quality: 2 },
  { name: 'zara n', quality: 2 },
  { name: 'hen b', quality: 2 },
  { name: 'lior s', quality: 2 },
  { name: 'chen w', quality: 2 },
  { name: 'dan l', quality: 2 },
  { name: 'Ali', quality: 2 },
  { name: 'Mia', quality: 2 },
  { name: 'sam k', quality: 2 },
  { name: 'rotem', quality: 2 },
  { name: 'shir', quality: 2 },
  { name: 'ido g', quality: 2 },
  { name: 'yuki s', quality: 2 },
  { name: 'pieter v', quality: 2 },
  { name: 'ingrid l', quality: 2 },
  { name: 'tariq a', quality: 2 },
  { name: 'amara t', quality: 2 },
  { name: 'cam r', quality: 2 },
  { name: 'seb l', quality: 2 },

  // ═══════════════ QUALITY 3 — Normal (50) ═══════════════
  { name: 'Dan Katz', quality: 3 },
  { name: 'Sarah Chen', quality: 3 },
  { name: 'Amit Levi', quality: 3 },
  { name: 'Tyler W.', quality: 3 },
  { name: 'Ryo Tanaka', quality: 3 },
  { name: 'Maria G.', quality: 3 },
  { name: 'Noam B.', quality: 3 },
  { name: 'Kevin N.', quality: 3 },
  { name: 'Elena P.', quality: 3 },
  { name: 'Lucas M.', quality: 3 },
  { name: 'Noa Mizrahi', quality: 3 },
  { name: 'Omar Hassan', quality: 3 },
  { name: 'Gal Peretz', quality: 3 },
  { name: 'Ashley D.', quality: 3 },
  { name: 'Luca B.', quality: 3 },
  { name: 'Mei Lin', quality: 3 },
  { name: 'Carlos H.', quality: 3 },
  { name: 'Yael Cohen', quality: 3 },
  { name: 'Priya Nair', quality: 3 },
  { name: 'Ryan W.', quality: 3 },
  { name: 'Diego F.', quality: 3 },
  { name: 'Anna K.', quality: 3 },
  { name: 'Jae Kim', quality: 3 },
  { name: 'Shira Gold', quality: 3 },
  { name: 'Fang Liu', quality: 3 },
  { name: 'Oren Katz', quality: 3 },
  { name: 'Jessica L.', quality: 3 },
  { name: 'Henrik A.', quality: 3 },
  { name: 'Camila R.', quality: 3 },
  { name: 'Tal Weiss', quality: 3 },
  { name: 'Divya M.', quality: 3 },
  { name: 'Khalid M.', quality: 3 },
  { name: 'Lucia G.', quality: 3 },
  { name: 'Eitan S.', quality: 3 },
  { name: 'Pooja Nair', quality: 3 },
  { name: 'Andrés M.', quality: 3 },
  { name: 'Maya Fried', quality: 3 },
  { name: 'Yusuf O.', quality: 3 },
  { name: 'Isabella S.', quality: 3 },
  { name: 'Pieter B.', quality: 3 },
  { name: 'Valentina C.', quality: 3 },
  { name: 'Michael T.', quality: 3 },
  { name: 'Rachel M.', quality: 3 },
  { name: 'Ingrid L.', quality: 3 },
  { name: 'Aisha Diallo', quality: 3 },
  { name: 'Layla K.', quality: 3 },
  { name: 'Emily Chen', quality: 3 },
  { name: 'Arjun Patel', quality: 3 },
  { name: 'Zara N.', quality: 3 },
  { name: 'Mateo V.', quality: 3 },

  // ═══════════════ QUALITY 4 — Full Names (50) ═══════════════
  { name: 'Daniel Kowalski', quality: 4 },
  { name: 'Priya Ramaswamy', quality: 4 },
  { name: 'Eitan Goldberg', quality: 4 },
  { name: 'Sofia Moretti', quality: 4 },
  { name: 'Andrés Morales', quality: 4 },
  { name: 'James Carter', quality: 4 },
  { name: 'Yael Friedman', quality: 4 },
  { name: 'Lucas Müller', quality: 4 },
  { name: 'Fatima Khalil', quality: 4 },
  { name: 'Thomas Dupont', quality: 4 },
  { name: 'Noam Ben-David', quality: 4 },
  { name: 'Emily Rodriguez', quality: 4 },
  { name: 'Henrik Andersen', quality: 4 },
  { name: 'Valentina Cruz', quality: 4 },
  { name: 'Wei Zhang', quality: 4 },
  { name: 'Sarah Johnson', quality: 4 },
  { name: 'Ryo Nakamura', quality: 4 },
  { name: 'Maria García', quality: 4 },
  { name: 'Ahmed Al-Rashid', quality: 4 },
  { name: 'Shira Goldberg', quality: 4 },
  { name: 'Kevin Nguyen', quality: 4 },
  { name: 'Isabella Santos', quality: 4 },
  { name: 'Pieter van den Berg', quality: 4 },
  { name: 'Amara Traoré', quality: 4 },
  { name: 'Camila Fernández', quality: 4 },
  { name: 'Michael Torres', quality: 4 },
  { name: 'Divya Menon', quality: 4 },
  { name: 'Luca Bianchi', quality: 4 },
  { name: 'Tariq Al-Amin', quality: 4 },
  { name: 'Anna Kowalski', quality: 4 },
  { name: 'Sebastián López', quality: 4 },
  { name: 'Noa Mizrahi-Levi', quality: 4 },
  { name: 'Rachel Martinez', quality: 4 },
  { name: 'Yuki Watanabe', quality: 4 },
  { name: 'Diego Fernández', quality: 4 },
  { name: 'Ingrid Larsson', quality: 4 },
  { name: 'Arjun Ramasamy', quality: 4 },
  { name: 'Natalia Reyes', quality: 4 },
  { name: 'Omar Ben-Haim', quality: 4 },
  { name: 'Elena Petrov', quality: 4 },
  { name: 'Mateo Vargas', quality: 4 },
  { name: 'Aisha Ibrahim', quality: 4 },
  { name: 'Tyler Anderson', quality: 4 },
  { name: 'Lucia Gómez', quality: 4 },
  { name: 'Jae-won Park', quality: 4 },
  { name: 'Khalid Mansour', quality: 4 },
  { name: 'Ashley Williams', quality: 4 },
  { name: 'Carlos Herrera', quality: 4 },
  { name: 'Zara Okonkwo', quality: 4 },
  { name: 'Tal Shapiro', quality: 4 },

  // ═══════════════ QUALITY 5 — Polished/Professional (50) ═══════════════
  { name: 'Dr. Sarah Martinez', quality: 5 },
  { name: 'Eng. Wei Zhang', quality: 5 },
  { name: 'Daniel K., PE', quality: 5 },
  { name: 'Prof. Ryo Tanaka', quality: 5 },
  { name: 'Dr. Priya Sharma', quality: 5 },
  { name: 'Eng. Eitan Levy', quality: 5 },
  { name: 'Dr. Elena Kuznetsova', quality: 5 },
  { name: 'Prof. Henrik Johansson', quality: 5 },
  { name: 'Dr. Ahmed Mansour', quality: 5 },
  { name: 'Eng. Sofia Moretti', quality: 5 },
  { name: 'Dr. James Whitfield', quality: 5 },
  { name: 'Prof. Yael Ben-Ari', quality: 5 },
  { name: 'Dr. Lucas Durand', quality: 5 },
  { name: 'Eng. Fatima Al-Rashid', quality: 5 },
  { name: 'Dr. Noam Shapiro', quality: 5 },
  { name: 'Prof. Maria Rossi', quality: 5 },
  { name: 'Dr. Kevin Tran', quality: 5 },
  { name: 'Eng. Valentina Reyes', quality: 5 },
  { name: 'Dr. Arjun Krishnan', quality: 5 },
  { name: 'Prof. Anna Schmidt', quality: 5 },
  { name: 'Dr. Omar Fahmy', quality: 5 },
  { name: 'Eng. Camila Rojas', quality: 5 },
  { name: 'Dr. Thomas Richter', quality: 5 },
  { name: 'Prof. Divya Rao', quality: 5 },
  { name: 'Dr. Pieter Visser', quality: 5 },
  { name: 'Eng. Isabella Santos', quality: 5 },
  { name: 'Dr. Diego Morales', quality: 5 },
  { name: 'Prof. Mei-Ling Chen', quality: 5 },
  { name: 'Dr. Khalid Al-Sabah', quality: 5 },
  { name: 'Eng. Natalia Sokolova', quality: 5 },
  { name: 'Dr. Tyler Richardson', quality: 5 },
  { name: 'Prof. Aisha Okafor', quality: 5 },
  { name: 'Dr. Jae-Hyun Kim', quality: 5 },
  { name: 'Eng. Shira Cohen', quality: 5 },
  { name: 'Dr. Carlos Mendoza', quality: 5 },
  { name: 'Prof. Ingrid Eriksen', quality: 5 },
  { name: 'Dr. Yuki Hashimoto', quality: 5 },
  { name: 'Eng. Rachel Torres', quality: 5 },
  { name: 'Dr. Luca Ferretti', quality: 5 },
  { name: 'Prof. Tariq Hassan', quality: 5 },
  { name: 'Dr. Emily Blackwell', quality: 5 },
  { name: 'Eng. Andrés Gutiérrez', quality: 5 },
  { name: 'Dr. Amara Diallo', quality: 5 },
  { name: 'Prof. Sebastian Berger', quality: 5 },
  { name: 'Dr. Noa Avraham', quality: 5 },
  { name: 'Eng. Mateo Salazar', quality: 5 },
  { name: 'Dr. Zara Okonkwo', quality: 5 },
  { name: 'Prof. Ryan Callahan', quality: 5 },
  { name: 'Dr. Layla Nasser', quality: 5 },
  { name: 'Eng. Tal Ben-Ami', quality: 5 },
];
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/fake-names.ts
git commit -m "feat(league): add 250 fake user names across 5 quality tiers"
```

---

### Task 3: Install DiceBear and Create Avatar Utility

**Files:**
- Create: `src/lib/fake-avatar.ts`

- [ ] **Step 1: Install DiceBear packages**

```bash
npm install @dicebear/core @dicebear/adventurer @dicebear/avataaars @dicebear/lorelei @dicebear/thumbs
```

Import individual style packages (not `@dicebear/collection`) to minimize bundle size (~50-80KB vs 300KB+).

**Note:** After installation, verify DiceBear import patterns match the installed version. The `import *` syntax below works for DiceBear v9 — if the API differs, adjust to default imports (e.g., `import { adventurer } from '@dicebear/adventurer'`).

- [ ] **Step 2: Create `src/lib/fake-avatar.ts`**

```typescript
import { createAvatar } from '@dicebear/core';
import * as adventurer from '@dicebear/adventurer';
import * as avataaars from '@dicebear/avataaars';
import * as lorelei from '@dicebear/lorelei';
import * as thumbs from '@dicebear/thumbs';
import type { FakeUser } from '@/data/engagement-types';
import { hashSeed } from '@/lib/league-simulator';

const STYLES = [
  { key: 'adventurer', style: adventurer },
  { key: 'avataaars', style: avataaars },
  { key: 'lorelei', style: lorelei },
  { key: 'thumbs', style: thumbs },
] as const;

// Palette for initials-only avatars (Tailwind 500 values)
const INITIALS_COLORS = [
  '#64748b', // slate
  '#71717a', // zinc
  '#78716c', // stone
  '#f59e0b', // amber
  '#10b981', // emerald
  '#0ea5e9', // sky
  '#8b5cf6', // violet
  '#f43f5e', // rose
];

/**
 * Get the DiceBear SVG data URL for a fake user, or null if they have no avatar.
 */
export function getFakeAvatarUrl(user: FakeUser): string | null {
  if (user.avatarType === 'none') return null;

  const styleEntry = STYLES.find((s) => s.key === user.avatarStyle) ?? STYLES[0];
  const avatar = createAvatar(styleEntry.style, {
    seed: user.avatarSeed,
    size: 64,
  });
  return avatar.toDataUri();
}

/**
 * Get the background color for an initials-only avatar.
 */
export function getInitialsColor(userId: string): string {
  const idx = hashSeed(userId) % INITIALS_COLORS.length;
  return INITIALS_COLORS[idx];
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: No errors. DiceBear types resolve correctly.

- [ ] **Step 4: Commit**

```bash
git add src/lib/fake-avatar.ts package.json package-lock.json
git commit -m "feat(league): add DiceBear avatar utility for fake user profiles"
```

---

### Task 4: Create Fake User Generator — Pool Creation

**Files:**
- Create: `src/lib/fake-user-generator.ts`

This is the core module. It will be built across Tasks 4-6.

- [ ] **Step 1: Create `src/lib/fake-user-generator.ts` with pool creation logic**

```typescript
import type { FakeUser, FakeUserPool, LeagueCompetitor } from '@/data/engagement-types';
import { fakeNames } from '@/data/fake-names';
import { competitorFlags, leagueTiers } from '@/data/league';
import { achievements } from '@/data/achievements';
import { topics } from '@/data/topics';
import { seededRandom, hashSeed, getTierConfig } from '@/lib/league-simulator';
import { getCurrentWeekMonday } from '@/lib/quest-engine';
import { getLevelForXp } from '@/data/levels';

// --------------- Constants ---------------

const POOL_VERSION = 1;
const POOL_STORAGE_KEY = 'mechready-fake-users';
const MAX_POOL_SIZE = 300;

const TIER_POOL_SIZES: Record<number, number> = {
  1: 80, 2: 70, 3: 50, 4: 30, 5: 20,
};

// Name quality distribution per tier: [Q1%, Q2%, Q3%, Q4%, Q5%]
const NAME_QUALITY_DIST: Record<number, number[]> = {
  1: [0.30, 0.30, 0.30, 0.10, 0.00],
  2: [0.10, 0.25, 0.40, 0.20, 0.05],
  3: [0.05, 0.10, 0.30, 0.45, 0.10],
  4: [0.00, 0.05, 0.15, 0.50, 0.30],
  5: [0.00, 0.00, 0.10, 0.40, 0.50],
};

// Avatar probability (chance of having a DiceBear avatar) per tier
const AVATAR_PROBABILITY: Record<number, number> = {
  1: 0.50, 2: 0.65, 3: 0.80, 4: 0.90, 5: 0.95,
};

const DICEBEAR_STYLES = ['adventurer', 'avataaars', 'lorelei', 'thumbs'];

// XP ranges per tier (aligned with levels.ts)
const TIER_XP_RANGES: Record<number, { min: number; max: number }> = {
  1: { min: 0, max: 850 },
  2: { min: 850, max: 7100 },
  3: { min: 7100, max: 20300 },
  4: { min: 20300, max: 52000 },
  5: { min: 52000, max: 100000 },
};

const STREAK_RANGES: Record<number, { min: number; max: number; zeroWeight: number }> = {
  1: { min: 0, max: 5, zeroWeight: 0.6 },
  2: { min: 0, max: 14, zeroWeight: 0.2 },
  3: { min: 2, max: 30, zeroWeight: 0.0 },
  4: { min: 5, max: 60, zeroWeight: 0.0 },
  5: { min: 14, max: 200, zeroWeight: 0.0 },
};

const LONGEST_STREAK_RANGES: Record<number, { min: number; max: number }> = {
  1: { min: 0, max: 7 },
  2: { min: 3, max: 21 },
  3: { min: 7, max: 45 },
  4: { min: 14, max: 90 },
  5: { min: 30, max: 365 },
};

const ACHIEVEMENT_COUNTS: Record<number, { min: number; max: number }> = {
  1: { min: 0, max: 3 },
  2: { min: 2, max: 8 },
  3: { min: 5, max: 15 },
  4: { min: 8, max: 22 },
  5: { min: 12, max: 27 },
};

const TOPIC_COUNTS: Record<number, { min: number; max: number }> = {
  1: { min: 0, max: 3 },
  2: { min: 2, max: 5 },
  3: { min: 4, max: 8 },
  4: { min: 6, max: 10 },
  5: { min: 8, max: 11 },
};

// Achievement tiers: base achievements available at each tier (always in the eligible pool)
const ACHIEVEMENT_TIERS: Record<number, string[]> = {
  1: ['ach-first-correct', 'ach-first-topic', 'ach-streak-3'],
  2: ['ach-ten-correct', 'ach-streak-7', 'ach-daily-challenge-5', 'ach-five-topics'],
  3: ['ach-fifty-correct', 'ach-streak-14', 'ach-perfect-session', 'ach-topic-master', 'ach-all-types', 'ach-all-advanced'],
  4: ['ach-hundred-correct', 'ach-streak-30', 'ach-speed-round', 'ach-multi-master', 'ach-all-topics'],
  5: ['ach-interview-ready', 'ach-hard-streak', 'ach-scenario-master'],
};

// Probability-gated achievements: only added if rng() < probability AND tier >= minTier
const TIER_GATED_ACHIEVEMENTS = [
  { id: 'ach-estimation-ace', minTier: 2, probability: 0.15 },
  { id: 'ach-flaw-finder', minTier: 2, probability: 0.15 },
  { id: 'ach-confidence-calibrated', minTier: 3, probability: 0.20 },
  { id: 'ach-weakness-conquered', minTier: 3, probability: 0.15 },
];

// Sprinkle achievements (any tier, with probability)
const SPRINKLE_ACHIEVEMENTS = [
  { id: 'ach-weekend-warrior', probability: 0.20 },
  { id: 'ach-bookworm', probability: 0.25 },
  { id: 'ach-night-owl', probability: 0.10 },
  { id: 'ach-early-bird', probability: 0.10 },
  { id: 'ach-wrong-five', probability: 0.10 },
];

// Critical topics get 2x draw weight
const CRITICAL_TOPICS = new Set([
  'engineering-mechanics',
  'strength-of-materials',
  'materials-engineering',
  'design-tolerancing',
]);

const MASTERY_LEVELS = ['needs-work', 'developing', 'strong'] as const;

// Mastery level weights per tier (higher tiers = more "strong")
const MASTERY_WEIGHTS: Record<number, number[]> = {
  1: [0.70, 0.25, 0.05],   // mostly needs-work
  2: [0.40, 0.45, 0.15],   // needs-work + developing
  3: [0.15, 0.50, 0.35],   // developing + some strong
  4: [0.05, 0.40, 0.55],   // developing to strong
  5: [0.00, 0.20, 0.80],   // mostly strong
};

// --------------- Helper ---------------

function randInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randFloat(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

function pickWeighted(rng: () => number, weights: number[]): number {
  const r = rng();
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (r < cumulative) return i;
  }
  return weights.length - 1;
}

function shuffleArray<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function daysAgoToISO(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

// getCurrentWeekMonday is imported from @/lib/quest-engine (not redefined)

// --------------- Pool Generation ---------------

function pickNameQuality(rng: () => number, tier: number): 1 | 2 | 3 | 4 | 5 {
  const dist = NAME_QUALITY_DIST[tier];
  return (pickWeighted(rng, dist) + 1) as 1 | 2 | 3 | 4 | 5;
}

function generateAchievements(
  rng: () => number,
  tier: number,
  count: number,
): string[] {
  // Collect all eligible achievements up to this tier
  const eligible: string[] = [];
  for (let t = 1; t <= tier; t++) {
    eligible.push(...(ACHIEVEMENT_TIERS[t] ?? []));
  }

  const shuffled = shuffleArray(eligible, rng);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Add tier-gated achievements (probability-based, per spec)
  for (const gated of TIER_GATED_ACHIEVEMENTS) {
    if (tier >= gated.minTier && rng() < gated.probability && !selected.includes(gated.id)) {
      selected.push(gated.id);
    }
  }

  // Add sprinkle achievements (any tier)
  for (const sprinkle of SPRINKLE_ACHIEVEMENTS) {
    if (rng() < sprinkle.probability && !selected.includes(sprinkle.id)) {
      selected.push(sprinkle.id);
    }
  }

  return selected;
}

function generateTopicMastery(
  rng: () => number,
  tier: number,
  count: number,
): FakeUser['topicMastery'] {
  // Build weighted topic list (critical topics appear twice)
  const weightedTopics: string[] = [];
  for (const topic of topics) {
    weightedTopics.push(topic.id);
    if (CRITICAL_TOPICS.has(topic.id)) {
      weightedTopics.push(topic.id); // 2x weight
    }
  }

  const shuffled = shuffleArray(weightedTopics, rng);
  // Deduplicate while preserving order
  const seen = new Set<string>();
  const selected: string[] = [];
  for (const id of shuffled) {
    if (!seen.has(id)) {
      seen.add(id);
      selected.push(id);
    }
    if (selected.length >= count) break;
  }

  const weights = MASTERY_WEIGHTS[tier];
  return selected.map((topicId) => ({
    topicId,
    masteryLevel: MASTERY_LEVELS[pickWeighted(rng, weights)],
  }));
}

function generateFakeUser(
  rng: () => number,
  tier: 1 | 2 | 3 | 4 | 5,
  index: number,
  name: string,
  nameQuality: 1 | 2 | 3 | 4 | 5,
): FakeUser {
  const id = `fake-${String(index).padStart(3, '0')}`;
  const flag = competitorFlags[Math.floor(rng() * competitorFlags.length)];

  // Avatar
  const hasAvatar = rng() < AVATAR_PROBABILITY[tier];
  const avatarStyle = DICEBEAR_STYLES[Math.floor(rng() * DICEBEAR_STYLES.length)];

  // Join date: tier determines how long ago
  const joinDaysRanges: Record<number, { min: number; max: number }> = {
    1: { min: 0, max: 30 },
    2: { min: 7, max: 84 },
    3: { min: 21, max: 168 },
    4: { min: 42, max: 280 },
    5: { min: 84, max: 365 },
  };
  const joinRange = joinDaysRanges[tier];
  const joinDaysAgo = randInt(rng, joinRange.min, joinRange.max);

  // XP
  const xpRange = TIER_XP_RANGES[tier];
  const totalXp = randInt(rng, xpRange.min, xpRange.max);

  // Streak
  const streakRange = STREAK_RANGES[tier];
  let currentStreak: number;
  if (rng() < streakRange.zeroWeight) {
    currentStreak = randInt(rng, 0, 1);
  } else {
    currentStreak = randInt(rng, streakRange.min, streakRange.max);
  }

  const longestStreakRange = LONGEST_STREAK_RANGES[tier];
  const longestStreak = Math.max(
    currentStreak,
    randInt(rng, longestStreakRange.min, longestStreakRange.max),
  );

  // Achievements
  const achRange = ACHIEVEMENT_COUNTS[tier];
  const achCount = randInt(rng, achRange.min, achRange.max);
  const achievementsUnlocked = generateAchievements(rng, tier, achCount);

  // Topic mastery
  const topicRange = TOPIC_COUNTS[tier];
  const topicCount = randInt(rng, topicRange.min, topicRange.max);
  const topicMastery = generateTopicMastery(rng, tier, topicCount);

  // Activity/consistency params
  const activityLevel = randFloat(rng, 0.1, 1.0);
  const consistency = randFloat(rng, 0.2, 0.95);

  return {
    id,
    name,
    nameQuality,
    avatarType: hasAvatar ? 'dicebear' : 'none',
    avatarStyle: hasAvatar ? avatarStyle : undefined,
    avatarSeed: `${id}-avatar`,
    countryFlag: flag,
    joinDate: daysAgoToISO(joinDaysAgo),
    totalXp,
    currentStreak,
    longestStreak,
    achievementsUnlocked,
    topicMastery,
    currentTier: tier,
    activityLevel,
    consistency,
    lastProgressedWeek: getCurrentWeekMonday(),
  };
}

export function generateFakeUserPool(): FakeUserPool {
  const rng = seededRandom(hashSeed('mechready-fake-pool-v1'));
  const pool: FakeUser[] = [];
  let index = 0;

  // Group names by quality
  const namesByQuality: Record<number, string[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const entry of fakeNames) {
    namesByQuality[entry.quality].push(entry.name);
  }
  // Shuffle each quality pool
  for (const q of [1, 2, 3, 4, 5]) {
    namesByQuality[q] = shuffleArray(namesByQuality[q], rng);
  }
  const nameCounters: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const tier of [1, 2, 3, 4, 5] as const) {
    const count = TIER_POOL_SIZES[tier];
    for (let i = 0; i < count; i++) {
      const quality = pickNameQuality(rng, tier);
      const qualityPool = namesByQuality[quality];
      const nameIdx = nameCounters[quality] % qualityPool.length;
      const name = qualityPool[nameIdx];
      nameCounters[quality]++;

      pool.push(generateFakeUser(rng, tier, index, name, quality));
      index++;
    }
  }

  return {
    version: POOL_VERSION,
    pool,
    lastWeekProcessed: getCurrentWeekMonday(),
  };
}

// --------------- Storage ---------------

export function getFakeUserPool(): FakeUserPool | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(POOL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FakeUserPool;
    if (parsed.version !== POOL_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveFakeUserPool(pool: FakeUserPool): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(POOL_STORAGE_KEY, JSON.stringify(pool));
}

export function initFakeUserPool(): FakeUserPool {
  const existing = getFakeUserPool();
  if (existing) return existing;
  const pool = generateFakeUserPool();
  saveFakeUserPool(pool);
  return pool;
}

/**
 * Look up a FakeUser by ID from the pool in localStorage.
 */
export function getFakeUserById(id: string): FakeUser | null {
  const pool = getFakeUserPool();
  if (!pool) return null;
  return pool.pool.find((u) => u.id === id) ?? null;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/fake-user-generator.ts
git commit -m "feat(league): add fake user pool generation with tier-correlated profiles"
```

---

### Task 5: Add Weekly Progression to Fake User Generator

**Files:**
- Modify: `src/lib/fake-user-generator.ts`

- [ ] **Step 1: Add `progressFakeUsers()` function**

Append to the bottom of `src/lib/fake-user-generator.ts` (before the closing of the module, after `getFakeUserById`):

```typescript
// --------------- Weekly Progression ---------------

/**
 * Advance all fake users by one week if a new Monday has started.
 * Call this on app mount, before simulateLeagueWeek().
 */
export function progressFakeUsers(): void {
  const pool = getFakeUserPool();
  if (!pool) return;

  const currentMonday = getCurrentWeekMonday();
  if (pool.lastWeekProcessed === currentMonday) return; // Already progressed this week

  const rng = seededRandom(hashSeed(`progress-${currentMonday}`));

  for (const user of pool.pool) {
    progressSingleUser(user, rng);
  }

  // Tier movement
  simulateTierMovement(pool.pool, rng);

  // Churn: 5% of Bronze go semi-inactive
  const bronzeUsers = pool.pool.filter((u) => u.currentTier === 1);
  for (const user of bronzeUsers) {
    if (rng() < 0.05) {
      user.activityLevel *= 0.3;
    }
  }

  // Churn: 2% chance to add a new Bronze user (replacing most inactive)
  if (rng() < 0.02 && pool.pool.length < MAX_POOL_SIZE) {
    const mostInactive = pool.pool
      .filter((u) => u.currentTier === 1)
      .sort((a, b) => a.activityLevel - b.activityLevel)[0];

    if (mostInactive && mostInactive.activityLevel < 0.05) {
      // Replace the most inactive user
      const newIndex = pool.pool.length;
      const quality = pickNameQuality(rng, 1);
      const qualityNames = fakeNames.filter((n) => n.quality === quality);
      const name = qualityNames[Math.floor(rng() * qualityNames.length)]?.name ?? 'New User';
      const newUser = generateFakeUser(rng, 1, newIndex, name, quality);
      const idx = pool.pool.indexOf(mostInactive);
      pool.pool[idx] = newUser;
    }
  }

  pool.lastWeekProcessed = currentMonday;
  saveFakeUserPool(pool);
}

function progressSingleUser(user: FakeUser, rng: () => number): void {
  const tierConfig = getTierConfig(user.currentTier);
  const xpRange = tierConfig.xpRange;
  const midpointXp = (xpRange.min + xpRange.max) / 2;

  // Weekly XP gain
  const weeklyXpGain = Math.round(midpointXp * user.activityLevel * (0.5 + rng()));
  user.totalXp += weeklyXpGain;

  // Streak: simulate 7 individual days
  let consecutiveFromEnd = 0;
  let streakBroken = false;
  const dailyResults: boolean[] = [];
  for (let day = 0; day < 7; day++) {
    dailyResults.push(rng() < user.consistency);
  }
  // Count consecutive active days from end of week
  for (let day = 6; day >= 0; day--) {
    if (dailyResults[day]) {
      consecutiveFromEnd++;
    } else {
      streakBroken = true;
      break;
    }
  }

  if (streakBroken || consecutiveFromEnd === 0) {
    // Streak was broken at some point
    user.currentStreak = consecutiveFromEnd; // Could be 0
  } else {
    // All 7 days active — streak continues
    user.currentStreak += 7;
  }
  user.longestStreak = Math.max(user.longestStreak, user.currentStreak);

  // Achievements: check milestones based on updated stats
  const achChecks: { id: string; condition: () => boolean }[] = [
    { id: 'ach-streak-7', condition: () => user.longestStreak >= 7 },
    { id: 'ach-streak-14', condition: () => user.longestStreak >= 14 },
    { id: 'ach-streak-30', condition: () => user.longestStreak >= 30 },
    { id: 'ach-ten-correct', condition: () => user.totalXp >= 1000 },
    { id: 'ach-fifty-correct', condition: () => user.totalXp >= 5000 },
    { id: 'ach-hundred-correct', condition: () => user.totalXp >= 12000 },
  ];
  for (const check of achChecks) {
    if (check.condition() && !user.achievementsUnlocked.includes(check.id)) {
      user.achievementsUnlocked.push(check.id);
    }
  }

  // Topic mastery: 15% chance to advance one topic
  if (rng() < 0.15 && user.topicMastery.length > 0) {
    const topicIdx = Math.floor(rng() * user.topicMastery.length);
    const topic = user.topicMastery[topicIdx];
    if (topic.masteryLevel === 'needs-work') {
      topic.masteryLevel = 'developing';
    } else if (topic.masteryLevel === 'developing') {
      topic.masteryLevel = 'strong';
    }
  }

  // Maybe start a new topic
  if (rng() < 0.05 && user.topicMastery.length < 11) {
    const existingTopics = new Set(user.topicMastery.map((t) => t.topicId));
    const available = topics.filter((t) => !existingTopics.has(t.id));
    if (available.length > 0) {
      const newTopic = available[Math.floor(rng() * available.length)];
      user.topicMastery.push({ topicId: newTopic.id, masteryLevel: 'needs-work' });
    }
  }

  user.lastProgressedWeek = getCurrentWeekMonday();
}

function simulateTierMovement(pool: FakeUser[], rng: () => number): void {
  // Group by tier
  const byTier: Record<number, FakeUser[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const user of pool) {
    byTier[user.currentTier].push(user);
  }

  for (const tier of [1, 2, 3, 4, 5] as const) {
    const tierConfig = getTierConfig(tier);
    const group = byTier[tier];
    if (group.length === 0) continue;

    // Assign simulated weekly XP for ranking
    const ranked = group
      .map((u) => ({
        user: u,
        simulatedXp: (tierConfig.xpRange.min + tierConfig.xpRange.max) / 2 * u.activityLevel * (0.5 + rng()),
      }))
      .sort((a, b) => b.simulatedXp - a.simulatedXp);

    // Proportional promote/demote counts
    const promoteCount = Math.ceil(group.length * tierConfig.promoteCount / 30);
    const demoteCount = Math.ceil(group.length * tierConfig.demoteCount / 30);

    for (let i = 0; i < ranked.length; i++) {
      const user = ranked[i].user;
      if (i < promoteCount && tier < 5) {
        user.currentTier = (tier + 1) as 1 | 2 | 3 | 4 | 5;
      } else if (i >= ranked.length - demoteCount && demoteCount > 0 && tier > 1) {
        user.currentTier = (tier - 1) as 1 | 2 | 3 | 4 | 5;
      }
    }
  }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/fake-user-generator.ts
git commit -m "feat(league): add weekly progression and tier movement for fake users"
```

---

### Task 6: Add Competitor Drawing to Fake User Generator

**Files:**
- Modify: `src/lib/fake-user-generator.ts`

- [ ] **Step 1: Add `drawCompetitorsFromPool()` function**

Append to `src/lib/fake-user-generator.ts`. Note: `LeagueCompetitor` is already imported at the top of the file (added in Task 4's combined import).

```typescript
// --------------- League Drawing ---------------

/**
 * Draw 29 competitors from the fake user pool for the given week and tier.
 * Replaces the old generateCompetitors() function.
 */
export function drawCompetitorsFromPool(
  weekStartDate: string,
  tier: 1 | 2 | 3 | 4 | 5,
): LeagueCompetitor[] {
  const pool = getFakeUserPool();
  if (!pool) {
    // Fallback: create pool on the fly
    const newPool = generateFakeUserPool();
    saveFakeUserPool(newPool);
    return drawFromPool(newPool.pool, weekStartDate, tier);
  }
  return drawFromPool(pool.pool, weekStartDate, tier);
}

function drawFromPool(
  pool: FakeUser[],
  weekStartDate: string,
  tier: 1 | 2 | 3 | 4 | 5,
): LeagueCompetitor[] {
  const tierConfig = getTierConfig(tier);
  const rng = seededRandom(hashSeed(`${weekStartDate}-${tier}`));

  // Filter by tier
  let candidates = pool.filter((u) => u.currentTier === tier);

  // Backfill from adjacent tier if insufficient
  if (candidates.length < 29) {
    const adjacentTier = tier > 1 ? tier - 1 : tier + 1;
    const adjacent = pool.filter((u) => u.currentTier === adjacentTier);
    candidates = [...candidates, ...adjacent];
  }

  // Shuffle and take 29
  const shuffled = shuffleArray(candidates, rng);
  const selected = shuffled.slice(0, 29);

  const { min: xpMin, max: xpMax } = tierConfig.xpRange;
  const midpointXp = (xpMin + xpMax) / 2;

  return selected.map((user) => {
    const baseDailyRate = (midpointXp / 7) * user.activityLevel;
    const dailyXpRate = baseDailyRate * (0.8 + rng() * 0.4);
    const variance = dailyXpRate * 0.3;

    return {
      id: user.id,
      name: user.name,
      avatarInitial: user.name.charAt(0).toUpperCase(),
      countryFlag: user.countryFlag,
      weeklyXp: 0,
      dailyXpRate,
      variance,
      fakeUserId: user.id,
    };
  });
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/fake-user-generator.ts
git commit -m "feat(league): add drawCompetitorsFromPool to replace generateCompetitors"
```

---

### Task 7: Integration — Store, Simulator, and Init

**Files:**
- Modify: `src/store/useEngagementStore.ts`
- Modify: `src/lib/engagement-init.ts`
- Modify: `src/lib/league-simulator.ts` (export only, no logic change)

- [ ] **Step 1: Update imports in `useEngagementStore.ts`**

Replace the `generateCompetitors` import with `drawCompetitorsFromPool`:

```typescript
// Old:
import { generateCompetitors, simulateCompetitorXp, getUserRank, getWeekResult, getTierConfig } from '@/lib/league-simulator';

// New:
import { simulateCompetitorXp, getUserRank, getWeekResult, getTierConfig } from '@/lib/league-simulator';
import { drawCompetitorsFromPool } from '@/lib/fake-user-generator';
```

- [ ] **Step 2: Replace all 3 calls to `generateCompetitors` in `useEngagementStore.ts`**

**Call 1 — `getDefaultLeague()` (~line 61):**
```typescript
// Old:
competitors: generateCompetitors(monday, 1),
// New:
competitors: drawCompetitorsFromPool(monday, 1),
```

**Call 2 — `simulateLeagueWeek` action (~line 440):**
```typescript
// Old:
const newCompetitors = generateCompetitors(monday, result.newTier);
// New:
const newCompetitors = drawCompetitorsFromPool(monday, result.newTier);
```

**Call 3 — `debugSetLeagueTier` action (~line 587):**
```typescript
// Old:
competitors: generateCompetitors(state.league.weekStartDate, clamped),
// New:
competitors: drawCompetitorsFromPool(state.league.weekStartDate, clamped),
```

- [ ] **Step 3: Update `engagement-init.ts` to call fake user pool init**

Add imports and calls before `simulateLeagueWeek()`:

```typescript
import { initFakeUserPool, progressFakeUsers } from '@/lib/fake-user-generator';
```

In the `useEffect`, add the two new calls before the existing initialization sequence:

```typescript
// Initialize fake user pool (must happen before league simulation)
initFakeUserPool();
progressFakeUsers();

// Initialize all engagement systems (existing code)
useEngagementStore.getState().initDailyQuests();
useEngagementStore.getState().initWeeklyQuests();
useEngagementStore.getState().simulateLeagueWeek();
useEngagementStore.getState().checkComebackFlow();
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: No errors. The old `generateCompetitors` function is no longer imported by the store (it still exists in `league-simulator.ts` but is now unused — leave it for now as a reference).

**Migration note:** Existing users who already have `mechready-engagement` in localStorage will see old-style competitors (without `fakeUserId`) until the next Monday rollover, when `simulateLeagueWeek()` detects a new week and calls `drawCompetitorsFromPool()`. This is expected and harmless — the old competitors work fine for the remaining days of the current week.

- [ ] **Step 5: Manual smoke test**

Run: `npm run dev`
1. Open the app in the browser
2. Navigate to the league page
3. Verify 29 competitors appear with names from the fake pool
4. Check browser localStorage for `mechready-fake-users` key — should contain ~250 users
5. Check that competitor names include varied quality (gamertags, casual, professional)

- [ ] **Step 6: Commit**

```bash
git add src/store/useEngagementStore.ts src/lib/engagement-init.ts
git commit -m "feat(league): integrate fake user pool into league simulation and init"
```

---

### Task 8: Avatar Rendering in LeagueBoard and LeagueCard

**Files:**
- Modify: `src/components/engagement/LeagueBoard.tsx`
- Modify: `src/components/engagement/LeagueCard.tsx`

- [ ] **Step 1: Create a shared avatar component**

Create `src/components/engagement/CompetitorAvatar.tsx`:

```typescript
'use client';

import { useMemo } from 'react';
import { getFakeUserById } from '@/lib/fake-user-generator';
import { getFakeAvatarUrl, getInitialsColor } from '@/lib/fake-avatar';

interface CompetitorAvatarProps {
  fakeUserId?: string;
  avatarInitial: string;
  isUser: boolean;
  size?: number; // px, default 32
}

export function CompetitorAvatar({
  fakeUserId,
  avatarInitial,
  isUser,
  size = 32,
}: CompetitorAvatarProps) {
  const avatarUrl = useMemo(() => {
    if (isUser || !fakeUserId) return null;
    const user = getFakeUserById(fakeUserId);
    if (!user) return null;
    return getFakeAvatarUrl(user);
  }, [fakeUserId, isUser]);

  const bgColor = useMemo(() => {
    if (isUser) return '#4F46E5';
    if (avatarUrl) return 'transparent';
    return fakeUserId ? getInitialsColor(fakeUserId) : '#6B7280';
  }, [isUser, avatarUrl, fakeUserId]);

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt=""
        className="rounded-full flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: bgColor,
        fontSize: size * 0.4,
      }}
    >
      {avatarInitial}
    </div>
  );
}
```

- [ ] **Step 2: Update `LeagueBoard.tsx` to use `CompetitorAvatar`**

Replace the inline avatar `<div>` (~line 113-118) with the new component:

```typescript
import { CompetitorAvatar } from './CompetitorAvatar';
```

In the map function, replace the avatar div with:

```tsx
<CompetitorAvatar
  fakeUserId={entry.fakeUserId}
  avatarInitial={entry.avatarInitial}
  isUser={isUser}
  size={32}
/>
```

The `entry` objects need `fakeUserId`. Update the mapping code near line 24-33 to include it:

```typescript
const allEntries = [
  ...league.competitors.map((c) => ({
    id: c.id,
    name: c.name,
    avatarInitial: c.avatarInitial,
    countryFlag: c.countryFlag,
    weeklyXp: c.weeklyXp,
    fakeUserId: c.fakeUserId,
  })),
  userEntry,
].sort((a, b) => b.weeklyXp - a.weeklyXp);
```

- [ ] **Step 3: Update `LeagueCard.tsx` to use `CompetitorAvatar`**

Same approach — import `CompetitorAvatar` and replace the inline avatar div (~line 73-77):

```typescript
import { CompetitorAvatar } from './CompetitorAvatar';
```

Replace the avatar div with:

```tsx
<CompetitorAvatar
  fakeUserId={entry.fakeUserId}
  avatarInitial={entry.avatarInitial}
  isUser={isUser}
  size={24}
/>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: No errors.

- [ ] **Step 5: Manual smoke test**

Run: `npm run dev`
1. Navigate to league page — competitors should show varied avatars (cartoon faces, illustrations, colored initials)
2. Dashboard league card should also show varied avatars in top 5
3. User's avatar should still be indigo

- [ ] **Step 6: Commit**

```bash
git add src/components/engagement/CompetitorAvatar.tsx src/components/engagement/LeagueBoard.tsx src/components/engagement/LeagueCard.tsx
git commit -m "feat(league): add DiceBear avatar rendering for fake users in leaderboard"
```

---

### Task 9: Competitor Profile Preview Bottom Sheet

**Files:**
- Create: `src/components/engagement/CompetitorPreview.tsx`
- Modify: `src/components/engagement/LeagueBoard.tsx`

- [ ] **Step 1: Create `CompetitorPreview.tsx`**

Uses the same Framer Motion pattern as `UpgradeModal.tsx` (backdrop + slide-up panel):

```typescript
'use client';

import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getFakeUserById } from '@/lib/fake-user-generator';
import { getFakeAvatarUrl, getInitialsColor } from '@/lib/fake-avatar';
import { getLevelForXp } from '@/data/levels';
import { leagueTiers } from '@/data/league';
import { achievements } from '@/data/achievements';
import { topics } from '@/data/topics';

interface CompetitorPreviewProps {
  fakeUserId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const MASTERY_COLORS: Record<string, string> = {
  'not-started': '#D1D5DB',
  'needs-work': '#F87171',
  'developing': '#FBBF24',
  'strong': '#34D399',
};

const MASTERY_LABELS: Record<string, string> = {
  'not-started': 'Not started',
  'needs-work': 'Needs work',
  'developing': 'Developing',
  'strong': 'Strong',
};

export function CompetitorPreview({ fakeUserId, isOpen, onClose }: CompetitorPreviewProps) {
  const user = useMemo(() => {
    if (!fakeUserId) return null;
    return getFakeUserById(fakeUserId);
  }, [fakeUserId]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!user) return null;

  const level = getLevelForXp(user.totalXp);
  const tier = leagueTiers.find((t) => t.tier === user.currentTier) ?? leagueTiers[0];
  const avatarUrl = getFakeAvatarUrl(user);
  const initialsColor = getInitialsColor(user.id);

  const joinDate = new Date(user.joinDate);
  const daysAgo = Math.floor((Date.now() - joinDate.getTime()) / 86400000);
  const joinLabel =
    daysAgo === 0 ? 'Joined today' :
    daysAgo === 1 ? 'Joined yesterday' :
    daysAgo < 7 ? `Joined ${daysAgo} days ago` :
    daysAgo < 30 ? `Joined ${Math.floor(daysAgo / 7)} weeks ago` :
    `Joined ${Math.floor(daysAgo / 30)} months ago`;

  const userAchievements = user.achievementsUnlocked
    .map((id) => achievements.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const userTopics = user.topicMastery
    .map((tm) => {
      const topic = topics.find((t) => t.id === tm.topicId);
      return topic ? { ...tm, name: topic.name, icon: topic.icon } : null;
    })
    .filter(<T,>(t: T): t is NonNullable<T> => Boolean(t));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[80vh] overflow-y-auto shadow-xl"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>

            <div className="px-5 pb-6 pt-2 space-y-5">
              {/* Header: avatar + name */}
              <div className="flex items-center gap-3">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="w-14 h-14 rounded-full" />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{ background: initialsColor }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {user.countryFlag} {joinLabel}
                  </p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">{level.level}</p>
                  <p className="text-xs text-gray-500">Level</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {user.currentStreak > 0 ? `🔥 ${user.currentStreak}` : '—'}
                  </p>
                  <p className="text-xs text-gray-500">Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {user.totalXp >= 1000 ? `${(user.totalXp / 1000).toFixed(1)}K` : user.totalXp}
                  </p>
                  <p className="text-xs text-gray-500">Total XP</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold" style={{ color: tier.color }}>
                    {tier.icon}
                  </p>
                  <p className="text-xs text-gray-500">{tier.name}</p>
                </div>
              </div>

              {/* Achievements */}
              {userAchievements.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {userAchievements.map((ach) => (
                      <div
                        key={ach.id}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg"
                        title={ach.description}
                      >
                        <span className="text-sm">{ach.icon}</span>
                        <span className="text-xs font-medium text-gray-600">{ach.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Topic Mastery */}
              {userTopics.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">Topics</h4>
                  <div className="space-y-1.5">
                    {userTopics.map((topic) => (
                      <div key={topic.topicId} className="flex items-center gap-2">
                        <span className="text-sm w-5">{topic.icon}</span>
                        <span className="text-sm text-gray-700 flex-1 truncate">{topic.name}</span>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: `${MASTERY_COLORS[topic.masteryLevel]}20`,
                            color: MASTERY_COLORS[topic.masteryLevel],
                          }}
                        >
                          {MASTERY_LABELS[topic.masteryLevel]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Wire CompetitorPreview into LeagueBoard**

In `LeagueBoard.tsx`, add state and the click handler:

Add imports:
```typescript
import { useState } from 'react';
import { CompetitorPreview } from './CompetitorPreview';
```

Add state at the top of the component:
```typescript
const [previewUserId, setPreviewUserId] = useState<string | null>(null);
```

Make competitor rows clickable — add `onClick` and `cursor-pointer` to non-user rows (~line 83-93):

```tsx
<div
  key={entry.id}
  className={`flex items-center gap-3 px-4 py-2.5 border-b border-gray-50 last:border-0 ${
    !isUser ? 'cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors' : ''
  }`}
  onClick={() => {
    if (!isUser && entry.fakeUserId) {
      setPreviewUserId(entry.fakeUserId);
    }
  }}
  style={{ ... }}
>
```

Add the preview component at the end of the return, just before the closing `</div>`:

```tsx
<CompetitorPreview
  fakeUserId={previewUserId}
  isOpen={previewUserId !== null}
  onClose={() => setPreviewUserId(null)}
/>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: No errors.

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev`
1. Navigate to league leaderboard
2. Tap a competitor row — bottom sheet should slide up with their profile
3. Verify: avatar, name, flag, join date, level, streak, XP, tier, achievements, topics all display
4. Tap backdrop or X to close
5. Verify user's own row is NOT clickable

- [ ] **Step 5: Commit**

```bash
git add src/components/engagement/CompetitorPreview.tsx src/components/engagement/LeagueBoard.tsx
git commit -m "feat(league): add competitor profile preview bottom sheet"
```

---

### Task 10: Final Verification and Cleanup

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: No errors, no warnings related to our changes.

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: No new lint errors.

- [ ] **Step 3: Manual end-to-end verification**

Run: `npm run dev`

Checklist:
1. League board shows 29 competitors with varied avatars (mix of cartoon faces, illustrations, colored initials)
2. Names include variety: some gamertags ("ThermoKing"), some casual ("danny"), some professional ("Dr. Sarah Martinez")
3. Tapping a competitor opens bottom sheet with full profile
4. Profile shows: avatar, name+flag, join date, level, streak, XP, tier icon, achievements, topic mastery
5. Bottom sheet closes on backdrop tap, X button, and Escape key
6. Dashboard's LeagueCard mini-leaderboard also shows varied avatars
7. User's row remains indigo and is not clickable
8. Check localStorage `mechready-fake-users` — should contain ~250 users with diverse tiers
9. Promotion zone and demotion zone indicators still display correctly

- [ ] **Step 4: Check localStorage size**

Open browser DevTools → Application → Local Storage → `mechready-fake-users`.
Expected: ~100-200KB of data (acceptable).

- [ ] **Step 5: Commit any final fixes**

If any fixes were needed, commit them:
```bash
git add -A
git commit -m "fix(league): polish fake user pool integration"
```
