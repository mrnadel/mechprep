# Gap 10: Daily Reward Calendar with Escalating Rewards

## Overview & Motivation

Currently, rewards are quest-gated and flat: `dailyChestReward = { xp: 50, gems: 10 }` and `weeklyChestReward = { xp: 150, gems: 40 }`. Users must complete all 3 daily quests to earn a chest. There is no daily login incentive, no escalating reward structure, and no visual anticipation of upcoming rewards. Duolingo's daily reward calendar creates a strong reason to open the app every day by showing escalating prizes for consecutive days, with a reset penalty for missing.

**Goal:** Add a 7-day visual reward calendar that:
- Shows escalating daily prizes (Day 1: 3 gems, Day 7: 25 gems + mystery item)
- Displays upcoming rewards as locked (creates anticipation)
- Resets the cycle on a missed day (additional retention pressure)
- Shows "Claim today's reward!" modal on first login each day

---

## Current State Analysis

| Component | File | Behavior |
|---|---|---|
| Chest rewards | `src/data/quests.ts:5-6` | Flat: `dailyChestReward = { xp: 50, gems: 10 }`, `weeklyChestReward = { xp: 150, gems: 40 }` |
| Quest board | `src/components/engagement/QuestBoard.tsx` | Shows daily/weekly quests + chest claim button |
| Chest animation | `src/components/engagement/ChestAnimation.tsx` | Animated reward reveal modal |
| Engagement state | `src/data/engagement-types.ts:229-244` | `dailyChestClaimed`, `weeklyChestClaimed` booleans |
| Engagement store | `src/store/useEngagementStore.ts` | `claimChest()` action, requires all quests complete |
| Gem economy | `src/store/useEngagementStore.ts:748-769` | `addGems()` with transaction ledger |
| Sound system | `src/lib/sounds.ts` | `claimReward`, `chestOpen` sounds exist |
| Engagement init | `src/lib/engagement-init.ts` | Runs on app open, initializes quests/league/comeback |
| Home page overlays | `src/app/(app)/page.tsx:249-254` | WelcomeBack, LeagueWinner, StreakFreeze modals |
| FullScreenModal | `src/components/ui/FullScreenModal.tsx` | Reusable full-screen modal with fx/footer |
| MascotWithGlow | `src/components/ui/MascotWithGlow.tsx` | Animated mascot component |
| DB sync | `src/hooks/useDbSync.ts` | Syncs engagement store to server |
| Feature flags | `src/lib/db/schema.ts:622-628` | `feature_flags` table for toggling features |

---

## Implementation Plan

### Phase 1: Data Layer — Reward Calendar Definition

#### 1.1 New File: `src/data/daily-rewards.ts`

Defines the 7-day escalating reward schedule.

```typescript
export interface DailyRewardTier {
  day: number;         // 1-7
  gems: number;
  xp: number;
  /** Optional bonus item on milestone days */
  bonusType?: 'streak_freeze' | 'double_xp' | 'mystery_frame';
  bonusLabel?: string;
  /** Visual styling */
  icon: string;        // emoji or path
  glowColor: string;
  isMilestone: boolean;
}

export const DAILY_REWARD_CYCLE: DailyRewardTier[] = [
  { day: 1, gems: 3,  xp: 10, icon: '🎁', glowColor: 'rgba(59,130,246,0.3)',  isMilestone: false },
  { day: 2, gems: 5,  xp: 15, icon: '🎁', glowColor: 'rgba(59,130,246,0.3)',  isMilestone: false },
  { day: 3, gems: 7,  xp: 20, icon: '🎁', glowColor: 'rgba(16,185,129,0.3)',  isMilestone: false },
  { day: 4, gems: 10, xp: 25, icon: '🎁', glowColor: 'rgba(16,185,129,0.3)',  isMilestone: true,
    bonusType: 'streak_freeze', bonusLabel: 'Streak Freeze' },
  { day: 5, gems: 12, xp: 30, icon: '🎁', glowColor: 'rgba(245,158,11,0.3)', isMilestone: false },
  { day: 6, gems: 18, xp: 40, icon: '🎁', glowColor: 'rgba(245,158,11,0.3)', isMilestone: false },
  { day: 7, gems: 25, xp: 50, icon: '🏆', glowColor: 'rgba(168,85,247,0.5)', isMilestone: true,
    bonusType: 'mystery_frame', bonusLabel: 'Mystery Reward' },
];

/** Total gems in a full 7-day cycle */
export const TOTAL_CYCLE_GEMS = DAILY_REWARD_CYCLE.reduce((sum, r) => sum + r.gems, 0); // 80

/** After claiming Day 7, the cycle resets to Day 1 */
export const REWARD_CYCLE_LENGTH = 7;
```

**Design rationale:**
- Days 1-3: Small but growing (3, 5, 7 gems) — low commitment threshold
- Day 4: First milestone bonus (streak freeze) — mid-week incentive
- Days 5-6: Building toward big payoff (12, 18 gems)
- Day 7: Grand prize (25 gems + mystery frame) — strong weekly goal
- Total cycle: 80 gems + 1 streak freeze + 1 mystery frame = significantly more than the current flat 10 gems/day chest

---

### Phase 2: State Management

#### 2.1 Modify `src/data/engagement-types.ts`

**Add new state interface (after `ComebackState`):**

```typescript
export interface DailyRewardCalendarState {
  /** Current day in the 7-day cycle (1-7). Resets to 1 on miss or after Day 7. */
  currentDay: number;
  /** ISO date of last claimed reward */
  lastClaimDate: string | null;
  /** Whether today's reward has been claimed */
  todayClaimed: boolean;
  /** ISO date when the current cycle started */
  cycleStartDate: string | null;
  /** Total cycles completed (lifetime stat) */
  cyclesCompleted: number;
}
```

**Add to `EngagementState` interface:**

```typescript
export interface EngagementState {
  // ... existing fields ...
  dailyRewardCalendar: DailyRewardCalendarState;  // NEW
}
```

#### 2.2 Modify `src/store/useEngagementStore.ts`

**Add default state factory:**

```typescript
function getDefaultDailyRewardCalendar(): DailyRewardCalendarState {
  return {
    currentDay: 1,
    lastClaimDate: null,
    todayClaimed: false,
    cycleStartDate: null,
    cyclesCompleted: 0,
  };
}
```

**Add to `getDefaultState()` return:**
```typescript
dailyRewardCalendar: getDefaultDailyRewardCalendar(),
```

**Add new actions to `EngagementActions` interface:**

```typescript
/** Check if daily reward cycle needs reset (called on app open) */
checkDailyRewardCalendar: () => void;
/** Claim today's daily reward */
claimDailyReward: () => { gems: number; xp: number; bonusType?: string } | null;
```

**Implement `checkDailyRewardCalendar` action:**

```typescript
checkDailyRewardCalendar: () => {
  const state = get();
  const today = getTodayDate();
  const cal = state.dailyRewardCalendar;

  // Already claimed today — no state change needed
  if (cal.todayClaimed && cal.lastClaimDate === today) return;

  // New day: reset todayClaimed flag
  if (cal.lastClaimDate && cal.lastClaimDate !== today) {
    // Check if user missed a day (broke the streak)
    const lastClaim = new Date(cal.lastClaimDate + 'T00:00:00Z');
    const todayD = new Date(today + 'T00:00:00Z');
    const daysSinceLastClaim = Math.floor(
      (todayD.getTime() - lastClaim.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysSinceLastClaim === 1) {
      // Consecutive day — advance to next day in cycle
      const nextDay = cal.currentDay >= REWARD_CYCLE_LENGTH ? 1 : cal.currentDay + 1;
      const cyclesCompleted = cal.currentDay >= REWARD_CYCLE_LENGTH
        ? cal.cyclesCompleted + 1
        : cal.cyclesCompleted;

      set({
        dailyRewardCalendar: {
          ...cal,
          currentDay: nextDay,
          todayClaimed: false,
          cycleStartDate: nextDay === 1 ? today : cal.cycleStartDate,
          cyclesCompleted,
        },
      });
    } else {
      // Missed one or more days — reset cycle to Day 1
      set({
        dailyRewardCalendar: {
          currentDay: 1,
          lastClaimDate: cal.lastClaimDate, // preserve for display
          todayClaimed: false,
          cycleStartDate: null, // will be set on next claim
          cyclesCompleted: cal.cyclesCompleted,
        },
      });
    }
  }
  // If lastClaimDate is null (first time), keep defaults (day 1, unclaimed)
},
```

**Implement `claimDailyReward` action:**

```typescript
claimDailyReward: () => {
  const state = get();
  const today = getTodayDate();
  const cal = state.dailyRewardCalendar;

  // Already claimed today
  if (cal.todayClaimed && cal.lastClaimDate === today) return null;

  const reward = DAILY_REWARD_CYCLE[cal.currentDay - 1];
  if (!reward) return null;

  // Award gems
  get().addGems(reward.gems, 'daily_reward_calendar');

  // Handle bonus items
  if (reward.bonusType === 'streak_freeze') {
    // Grant streak freeze (respect max cap)
    const currentFreezes = state.streak.freezesOwned;
    if (currentFreezes < MAX_STREAK_FREEZES) {
      set((s) => ({
        streak: {
          ...s.streak,
          freezesOwned: s.streak.freezesOwned + 1,
        },
      }));
    } else {
      // If at cap, give extra gems instead
      get().addGems(15, 'daily_reward_bonus_overflow');
    }
  }
  // 'double_xp' and 'mystery_frame' handled by caller (UI animation first)

  // Update calendar state
  set({
    dailyRewardCalendar: {
      ...cal,
      lastClaimDate: today,
      todayClaimed: true,
      cycleStartDate: cal.cycleStartDate ?? today,
    },
  });

  return {
    gems: reward.gems,
    xp: reward.xp,
    bonusType: reward.bonusType,
  };
},
```

**Update `partialize` and `merge` in persist config to include `dailyRewardCalendar`.**

**Add selector hooks:**

```typescript
export const useDailyRewardCalendar = () =>
  useEngagementStore(useShallow((s) => s.dailyRewardCalendar));
```

---

### Phase 3: Initialization

#### 3.1 Modify `src/lib/engagement-init.ts`

**After the `checkComebackFlow()` call (line ~94), add:**

```typescript
useEngagementStore.getState().checkDailyRewardCalendar();
```

This ensures the calendar state is evaluated on every app open.

---

### Phase 4: UI Components

#### 4.1 New File: `src/components/engagement/DailyRewardCalendar.tsx`

A visual 7-day calendar strip showing reward progression.

**Props:**
```typescript
interface DailyRewardCalendarProps {
  /** If true, renders in compact mode (e.g., inside quest board) */
  compact?: boolean;
}
```

**Visual design — 7 circles in a horizontal row:**

```
  Day 1    Day 2    Day 3    Day 4    Day 5    Day 6    Day 7
   [3]      [5]      [7]     [10]     [12]     [18]     [25]
    *        *        *       ----     ----     ----     ----
  claimed  claimed  TODAY    locked   locked   locked   locked
```

- **Claimed days:** Filled circle with checkmark, gem count, green tint
- **Today (unclaimed):** Pulsing golden border, "Claim!" label, bouncing animation
- **Future days:** Dimmed/locked circle, gem count visible but grayed, lock icon overlay
- **Milestone days (4, 7):** Slightly larger circle, star/sparkle decoration, bonus label below
- **Day 7:** Special crown/trophy styling, purple glow

**Component structure:**
```tsx
export function DailyRewardCalendar({ compact = false }: DailyRewardCalendarProps) {
  const calendar = useDailyRewardCalendar();
  const isDark = useIsDark();

  return (
    <div className="w-full">
      {!compact && (
        <div className="flex items-center justify-between px-1 mb-3">
          <h3 className="text-sm font-extrabold text-gray-800 dark:text-surface-50">
            Daily Rewards
          </h3>
          <span className="text-xs font-semibold text-gray-400 dark:text-surface-500">
            Day {calendar.currentDay} of 7
          </span>
        </div>
      )}

      {/* 7-day strip */}
      <div className="flex items-center justify-between gap-1">
        {DAILY_REWARD_CYCLE.map((tier) => (
          <DayCircle
            key={tier.day}
            tier={tier}
            status={getDayStatus(tier.day, calendar)}
            isCurrent={tier.day === calendar.currentDay && !calendar.todayClaimed}
          />
        ))}
      </div>

      {/* Connecting line behind circles */}
      {/* Implemented via absolute-positioned bar with z-index layering */}
    </div>
  );
}

function getDayStatus(day: number, cal: DailyRewardCalendarState):
  'claimed' | 'current' | 'locked' {
  if (cal.todayClaimed && day <= cal.currentDay) return 'claimed';
  if (!cal.todayClaimed && day < cal.currentDay) return 'claimed';
  if (day === cal.currentDay && !cal.todayClaimed) return 'current';
  return 'locked';
}
```

**DayCircle sub-component:**
```tsx
function DayCircle({ tier, status, isCurrent }: {
  tier: DailyRewardTier;
  status: 'claimed' | 'current' | 'locked';
  isCurrent: boolean;
}) {
  // Claimed: green bg, checkmark
  // Current: golden pulsing border, bouncing, "Claim!" tooltip
  // Locked: gray bg, lock icon, dimmed gem count
  // Milestone: star decoration, bonus label
}
```

**Animations (Framer Motion):**
- Current day: `animate={{ scale: [1, 1.08, 1] }}` with `repeat: Infinity`, `duration: 2`
- Claimed checkmark: `initial={{ scale: 0 }} animate={{ scale: 1 }}` spring
- Golden glow on current: CSS `box-shadow` animation via `@keyframes pulse-gold`

#### 4.2 New File: `src/components/engagement/DailyRewardClaimModal.tsx`

Full-screen modal shown on first login each day, prompting the user to claim their reward.

**Trigger:** Shown when `dailyRewardCalendar.todayClaimed === false` on app open.

**Design (using existing FullScreenModal):**

```tsx
export function DailyRewardClaimModal() {
  const calendar = useDailyRewardCalendar();
  const { claimDailyReward } = useEngagementActions();
  const [claimedReward, setClaimedReward] = useState<{...} | null>(null);
  const [showResult, setShowResult] = useState(false);

  const today = getTodayDate();
  const shouldShow = !calendar.todayClaimed || calendar.lastClaimDate !== today;
  // Don't show if user has never claimed before and just installed
  const isFirstTime = calendar.lastClaimDate === null;

  if (!shouldShow || isFirstTime) return null;

  const currentReward = DAILY_REWARD_CYCLE[calendar.currentDay - 1];

  const handleClaim = () => {
    const result = claimDailyReward();
    if (result) {
      playSound('claimReward');
      setClaimedReward(result);
      setShowResult(true);
    }
  };

  // Phase 1: Show calendar + claim button
  // Phase 2: Show reward reveal animation
}
```

**Modal layout:**

```
Phase 1 (Claim):
  ┌──────────────────────────────┐
  │                              │
  │    [Mascot happy pose]       │
  │                              │
  │    "Day 4 Reward!"           │
  │                              │
  │    [ Calendar strip ]        │
  │    (current day highlighted) │
  │                              │
  │    ┌──────────────────┐      │
  │    │  Claim Reward!   │      │
  │    └──────────────────┘      │
  └──────────────────────────────┘

Phase 2 (Reveal):
  ┌──────────────────────────────┐
  │                              │
  │    [Chest opening anim]      │
  │                              │
  │    +10 gems   +25 XP        │
  │    + Streak Freeze!          │
  │                              │
  │    ┌──────────────────┐      │
  │    │    Continue       │      │
  │    └──────────────────┘      │
  └──────────────────────────────┘
```

**Props for FullScreenModal:**
- `bg`: `"#1E293B"` (dark blue-gray)
- `fx`: `"confetti"` on Day 4 and Day 7 milestones, `"sparkle"` on other days
- Sound: `claimReward` on claim, `chestOpen` on Day 7

#### 4.3 Modify `src/components/engagement/QuestBoard.tsx`

**Add DailyRewardCalendar above the daily quests section:**

```tsx
import { DailyRewardCalendar } from './DailyRewardCalendar';

// Inside the return, before the Daily Quests section:
<DailyRewardCalendar compact />
```

This gives the calendar persistent visibility on the quests page.

#### 4.4 Modify `src/app/(app)/page.tsx`

**Add lazy import for the claim modal:**
```typescript
const DailyRewardClaimModal = lazy(() =>
  import('@/components/engagement/DailyRewardClaimModal')
    .then(m => ({ default: m.DailyRewardClaimModal }))
);
```

**Add to the overlays section (after WelcomeBack, before LeagueWinner):**
```tsx
<Suspense fallback={null}>
  <DailyRewardClaimModal />
</Suspense>
```

**Rendering order matters:** The claim modal should NOT show when WelcomeBack is active. Add a guard:
```tsx
{!comeback.isInComebackFlow && <DailyRewardClaimModal />}
```

---

### Phase 5: Mystery Reward System (Day 7 Bonus)

#### 5.1 Modify `src/data/daily-rewards.ts` — Add mystery pool

```typescript
export interface MysteryReward {
  id: string;
  type: 'frame' | 'title' | 'double_xp' | 'gems_bonus';
  label: string;
  icon: string;
  /** For frame/title types: the item ID to grant */
  itemId?: string;
  /** For gems_bonus type: extra gems on top of Day 7 base */
  gemsAmount?: number;
  /** For double_xp type: duration in ms */
  durationMs?: number;
  rarity: 'common' | 'rare' | 'epic';
}

export const MYSTERY_REWARD_POOL: MysteryReward[] = [
  { id: 'mystery-gems-20', type: 'gems_bonus', label: '+20 Bonus Gems', icon: '💎',
    gemsAmount: 20, rarity: 'common' },
  { id: 'mystery-gems-35', type: 'gems_bonus', label: '+35 Bonus Gems', icon: '💎',
    gemsAmount: 35, rarity: 'rare' },
  { id: 'mystery-double-xp', type: 'double_xp', label: '30min Double XP', icon: '⚡',
    durationMs: 30 * 60 * 1000, rarity: 'common' },
  { id: 'mystery-frame-calendar', type: 'frame', label: 'Calendar Collector Frame', icon: '📅',
    itemId: 'reward-frame-calendar-collector', rarity: 'epic' },
];
```

#### 5.2 Add the reward frame to `src/data/gem-shop.ts`

Add to `rewardFrames` array:
```typescript
{
  id: 'reward-frame-calendar-collector',
  name: 'Calendar Collector',
  icon: '📅',
  frameStyle: 'calendar-collector',
  source: 'Day 7 Mystery Reward',
  borderColor: '#8B5CF6',
  glowColor: 'rgba(139,92,246,0.4)',
},
```

#### 5.3 Mystery reward selection

In `claimDailyReward` action, when `bonusType === 'mystery_frame'`:

```typescript
if (reward.bonusType === 'mystery_frame') {
  // Deterministic selection based on cycle count for consistency
  const pool = MYSTERY_REWARD_POOL;
  const seed = hashString(`mystery-${cal.cyclesCompleted}-${today}`);
  const idx = seed % pool.length;
  const mystery = pool[idx];

  // Apply the mystery reward
  switch (mystery.type) {
    case 'gems_bonus':
      get().addGems(mystery.gemsAmount!, 'mystery_reward');
      break;
    case 'double_xp':
      get().activateDoubleXp(mystery.durationMs!);
      break;
    case 'frame':
      if (mystery.itemId) {
        set((s) => {
          const frames = s.gems.inventory.activeFrames;
          if (frames.includes(mystery.itemId!)) return {};
          return {
            gems: {
              ...s.gems,
              inventory: {
                ...s.gems.inventory,
                activeFrames: [...frames, mystery.itemId!],
              },
            },
          };
        });
      }
      break;
  }

  // Return mystery info for UI reveal animation
  return { gems: reward.gems, xp: reward.xp, bonusType: 'mystery', mystery };
}
```

---

### Phase 6: Sounds

#### 6.1 Modify `src/lib/sounds.ts`

**Add new sound to `SoundName` union:**
```typescript
| 'dailyRewardClaim'
```

**Add sound definition:**
```typescript
dailyRewardClaim() {
  // Cheerful ascending arpeggio + sparkle
  tone(523, 0.1, 'sine', 0, 0.2);       // C5
  tone(659, 0.1, 'sine', 0.08, 0.2);    // E5
  tone(784, 0.1, 'sine', 0.16, 0.2);    // G5
  tone(1047, 0.2, 'sine', 0.24, 0.25);  // C6
  noise(0.04, 0.24, 4000, 0.06);        // sparkle
},
```

Use `dailyRewardClaim` for regular days, reuse `chestOpen` for Day 7.

---

### Phase 7: Database Schema Changes

#### 7.1 No new DB tables required

The daily reward calendar state is managed entirely in the client-side Zustand store (persisted to localStorage) and synced to the server via the existing `useDbSync` engagement sync mechanism.

#### 7.2 Modify `src/hooks/useDbSync.ts` — Include calendar in sync payload

In the `syncEngagement` function, add `dailyRewardCalendar` to the engagement sync payload:

```typescript
const payload: Record<string, unknown> = {
  // ... existing fields ...
  dailyRewardCalendar: {
    currentDay: eng.dailyRewardCalendar.currentDay,
    lastClaimDate: eng.dailyRewardCalendar.lastClaimDate,
    todayClaimed: eng.dailyRewardCalendar.todayClaimed,
    cycleStartDate: eng.dailyRewardCalendar.cycleStartDate,
    cyclesCompleted: eng.dailyRewardCalendar.cyclesCompleted,
  },
};
```

#### 7.3 Modify `src/app/api/engagement/route.ts`

**In the POST handler,** accept and persist `dailyRewardCalendar` as part of the engagement state saved to the `user_progress` table (or a new JSON column).

**Option A (preferred):** Add a `daily_reward_calendar` JSONB column to `user_progress`:

```typescript
// In schema.ts, add to userProgress table:
dailyRewardCalendar: jsonb('daily_reward_calendar')
  .$type<DailyRewardCalendarState>()
  .default({ currentDay: 1, lastClaimDate: null, todayClaimed: false, cycleStartDate: null, cyclesCompleted: 0 }),
```

**Option B (simpler):** Store within the existing engagement sync endpoint as a nested JSON field in `quest_progress` or a new dedicated table. Given the engagement API already handles gems, streak, hearts, and quests, adding calendar state is natural.

**In the GET handler,** return `dailyRewardCalendar` so the hydration logic in `useDbSync` can merge it.

#### 7.4 Modify `src/hooks/useDbSync.ts` — Hydrate calendar from server

In the engagement hydration section (around line 169):

```typescript
// Hydrate daily reward calendar from DB
if (eng.dailyRewardCalendar) {
  const dbCal = eng.dailyRewardCalendar;
  const localCal = localEng.dailyRewardCalendar;
  // Use the fresher state (higher cycle count or more recent claim date)
  const useDb = (dbCal.lastClaimDate ?? '') > (localCal.lastClaimDate ?? '');
  if (useDb) {
    useEngagementStore.setState({ dailyRewardCalendar: dbCal });
  }
}
```

---

### Phase 8: Edge Cases

1. **First-time user:** `lastClaimDate === null`. No claim modal shown on first install. Calendar appears on quests page with Day 1 highlighted. User claims their first reward when they visit the quests page or on second app open.

2. **User claims reward then clears localStorage:** DB hydration restores `dailyRewardCalendar` state via `useDbSync`. The merge logic uses the fresher `lastClaimDate`.

3. **User misses a day:** `checkDailyRewardCalendar()` detects `daysSinceLastClaim > 1` and resets to Day 1. Previous claimed days are visually cleared. This is the key retention mechanic.

4. **User misses multiple days (3+):** WelcomeBack modal takes priority (checked first in `engagement-init.ts`). After dismissing WelcomeBack, the calendar shows reset to Day 1.

5. **Day 7 → Day 1 transition:** After claiming Day 7, `cyclesCompleted` increments. Next day's `checkDailyRewardCalendar()` advances to Day 1 of a new cycle. If the user misses the day after Day 7, cycle resets to Day 1 anyway (same behavior).

6. **Streak freeze vs. calendar:** The calendar tracks its own consecutive-claim days independently from the practice streak. They are separate systems. A streak freeze protects the practice streak but NOT the reward calendar. This is intentional: the calendar is a simpler, daily-login incentive.

7. **Day 4 bonus: streak freeze at cap:** If user already has 2 streak freezes (MAX_STREAK_FREEZES), the bonus converts to 15 gems instead.

8. **Day 7 mystery: duplicate frame:** If the user already owns the `reward-frame-calendar-collector`, the `grantInventoryItem` helper returns unchanged state (no-op). The mystery pool selection can be weighted to avoid already-owned items in a future iteration.

9. **Multiple claims on same day (race condition):** `todayClaimed` is checked before granting. `lastClaimDate === today` guard prevents double-claiming.

10. **Timezone:** Uses `getTodayDate()` (local time), consistent with all other date logic in the app.

11. **Offline / PWA:** Calendar state persists in localStorage. Claims work offline; gems are added client-side and synced to server when connectivity returns.

12. **Modal ordering:** `DailyRewardClaimModal` must NOT show when WelcomeBack or StreakFreeze modals are active. Implementation guards: `!comeback.isInComebackFlow && !streak.repairAvailable`.

---

### Phase 9: Testing Strategy

#### Unit Tests (Vitest)

**New file: `src/__tests__/critical/daily-reward-calendar.test.ts`**

1. **Consecutive claims advance day:** Claim Day 1, simulate next day, check `currentDay === 2`
2. **Missed day resets to Day 1:** Claim Day 3, simulate 2 days later, check `currentDay === 1`
3. **Day 7 cycles back to Day 1:** Claim through Day 7, check `cyclesCompleted` increments
4. **Double-claim prevention:** Claim today, call `claimDailyReward()` again, returns null
5. **Streak freeze bonus at cap:** Set `freezesOwned = 2`, claim Day 4, check bonus converted to gems
6. **Mystery reward selection is deterministic:** Same `cyclesCompleted` + date = same mystery
7. **First-time user:** `lastClaimDate === null`, modal should not show
8. **Gems are correctly awarded:** Claim Day 1, verify `gems.balance` increased by 3
9. **Gem transaction logged:** After claim, verify transaction with source `'daily_reward_calendar'`
10. **Calendar state survives persist/restore cycle:** Write to localStorage, read back, verify

**New file: `src/__tests__/components/DailyRewardCalendar.test.tsx`**

1. Renders 7 day circles
2. Claimed days show checkmarks
3. Current day has pulsing animation class
4. Locked days show lock icon
5. Milestone days (4, 7) show bonus label
6. Compact mode hides header

**New file: `src/__tests__/components/DailyRewardClaimModal.test.tsx`**

1. Shows when `todayClaimed === false` and `lastClaimDate !== null`
2. Hidden when `todayClaimed === true`
3. Hidden during comeback flow
4. Claim button calls `claimDailyReward` and plays sound
5. Reward reveal shows correct gem + XP amounts
6. Day 7 shows mystery reward reveal
7. Day 4 shows streak freeze bonus

---

### Phase 10: Implementation Order

1. **Data definition** — `src/data/daily-rewards.ts` (15 min)
2. **Types** — `engagement-types.ts` add `DailyRewardCalendarState` (5 min)
3. **Store** — `useEngagementStore.ts` state + actions + selectors (45 min)
4. **Init** — `engagement-init.ts` add `checkDailyRewardCalendar()` (2 min)
5. **DB schema** — add `daily_reward_calendar` JSONB column to `user_progress` (10 min)
6. **API sync** — update `api/engagement/route.ts` GET/POST (20 min)
7. **DB sync** — update `useDbSync.ts` hydration + sync payload (15 min)
8. **Sound** — `sounds.ts` add `dailyRewardClaim` (5 min)
9. **Calendar component** — `DailyRewardCalendar.tsx` (60 min)
10. **Claim modal** — `DailyRewardClaimModal.tsx` (60 min)
11. **Mystery rewards** — `daily-rewards.ts` pool + `gem-shop.ts` reward frame (15 min)
12. **QuestBoard integration** — add calendar to quest board (10 min)
13. **Home page integration** — add claim modal to overlays (5 min)
14. **Tests** — unit + component tests (90 min)
15. **Modal gallery** — add entries to `modal-gallery.html` (15 min)
16. **Schema push** — run `npm run db:push` for the new column (5 min)

---

### Interaction with Existing Systems

| System | Impact |
|---|---|
| **Existing quest chests** | Daily/weekly chest rewards remain unchanged. The calendar is additive, not a replacement. Users can earn both quest chest gems and calendar gems. |
| **Gem economy** | Calendar adds ~80 gems per 7-day cycle (vs. current 70 gems/week from daily chests). This is a ~14% increase in gem income. Monitor for inflation via admin analytics. |
| **Offline / PWA** | Calendar state in localStorage. Claims work offline. Server sync on reconnect. |
| **Subscription gating** | Calendar rewards are free-tier friendly. No Pro gating needed — this is a retention tool. |
| **Dual stores** | Calendar lives entirely in `useEngagementStore`. No cross-store writes to `useStore` or `useCourseStore`. |
| **useDbSync** | New sync field in engagement payload. Hydration merges server state. |
| **WelcomeBack flow** | Claim modal hidden during comeback flow. Both systems co-exist: WelcomeBack on Day 3+, calendar reset independently. |
| **Streak system** | Independent from practice streak. Calendar tracks its own consecutive-claim days. Streak freeze does NOT protect calendar. |
| **Dark mode** | All new components must use `dark:` Tailwind classes and `useIsDark()` where needed. |
| **Feature flags** | Gate behind a new `daily_reward_calendar` feature flag in the `feature_flags` table. Check with `useFlagStore` in the UI. |
| **Modal gallery** | Add `DailyRewardClaimModal` (both claim and reveal states) + `DailyRewardCalendar` to `modal-gallery.html`. |

---

## Critic Resolutions

The following issues were identified during critical review and are now resolved in this plan.

### CR-1 [CRITICAL] `addGems` source `'daily_reward_calendar'` rejected by server allowlist

**Issue:** Verified. `VALID_GEM_SOURCES` in `api/engagement/route.ts` (lines 61-73) does NOT include `daily_reward_calendar`, `daily_reward_bonus_overflow`, or `mystery_reward`. These transactions would be silently dropped by `validateTransactions()`, meaning gems appear client-side but are never persisted to the DB.

**Resolution:** Add a prerequisite step (BEFORE any implementation) to update `VALID_GEM_SOURCES` in `src/app/api/engagement/route.ts`:

```typescript
const VALID_GEM_SOURCES: Record<string, { maxEarn: number; maxSpend: number }> = {
  // ... existing sources ...
  // Daily Reward Calendar (Plan 10)
  daily_reward_calendar:       { maxEarn: 25,  maxSpend: 0 },
  daily_reward_bonus_overflow: { maxEarn: 15,  maxSpend: 0 },
  mystery_reward:              { maxEarn: 50,  maxSpend: 0 },
};
```

This is a shared prerequisite with Plans 11 (story_unlock) and is listed in `MASTER-PLAN.md` as a cross-cutting step.

### CR-2 [CRITICAL] `engagementSyncSchema` Zod validation strips unknown keys

**Issue:** Verified. The Zod schema in `validation.ts` uses `z.object()` which in Zod 4 strips unknown keys by default. A `dailyRewardCalendar` field in the sync payload would be silently removed, never reaching the DB.

**Resolution:** Update `src/lib/validation.ts` to include `dailyRewardCalendar` in the `engagementSyncSchema`:

```typescript
export const engagementSyncSchema = z.object({
  // ... existing fields ...
  dailyRewardCalendar: z.object({
    currentDay: z.number().int().min(1).max(7),
    lastClaimDate: z.string().nullable(),
    todayClaimed: z.boolean(),
    cycleStartDate: z.string().nullable(),
    cyclesCompleted: z.number().int().min(0),
  }).optional(),
});
```

The `.optional()` ensures backward compatibility — clients that don't have the calendar yet won't fail validation.

### CR-3 [CRITICAL] DB column `daily_reward_calendar` doesn't exist on `user_progress`

**Issue:** Verified. The plan mentions adding the column but doesn't show the full API handler changes.

**Resolution:** Complete the 5-step integration:

1. **Schema** (`src/lib/db/schema.ts`): Add `dailyRewardCalendar` JSONB column to `userProgress`:
   ```typescript
   dailyRewardCalendar: jsonb('daily_reward_calendar').$type<DailyRewardCalendarState>(),
   ```

2. **Validation** (`src/lib/validation.ts`): Already covered in CR-2 above.

3. **API POST** (`src/app/api/engagement/route.ts`): In the upsert handler, include `dailyRewardCalendar` from the validated body:
   ```typescript
   const engagementData = {
     // ... existing fields ...
     dailyRewardCalendar: body.dailyRewardCalendar ?? undefined,
   };
   ```

4. **API GET** (`src/app/api/engagement/route.ts`): Return `dailyRewardCalendar` in the response:
   ```typescript
   return NextResponse.json({
     // ... existing fields ...
     dailyRewardCalendar: row.dailyRewardCalendar,
   });
   ```

5. **DB Sync** (`src/hooks/useDbSync.ts`): Include in sync payload (already described in Phase 7.2) and add hydration (already described in Phase 7.4).

6. **Run `npm run db:push`** to push the schema change.

### CR-4 [IMPORTANT] `hashString` function — import path

**Issue:** The critic said `hashString` doesn't exist. Verified: it DOES exist and is exported from `src/lib/quest-engine.ts` (line 41).

**Resolution:** Import it explicitly:
```typescript
import { hashString } from '@/lib/quest-engine';
```

No custom implementation needed. The critic was partially wrong on this one — the function exists and is exported.

### CR-5 [IMPORTANT] 7-day grid overflow on narrow screens

**Issue:** On screens narrower than 375px, 7 circles with milestone labels may overflow.

**Resolution:** Add responsive safeguards to `DayCircle`:
```tsx
<div className="flex items-center justify-between gap-0.5 sm:gap-1 min-w-0">
  {DAILY_REWARD_CYCLE.map((tier) => (
    <DayCircle key={tier.day} className="min-w-0 flex-1" ... />
  ))}
</div>
```

Each `DayCircle` should use `min-w-0 flex-1` and the gem count text should use `text-[10px] sm:text-xs` for smaller screens. Bonus labels on milestone days should be hidden below 360px: `hidden xs:block` or use a tooltip instead. Add `overflow-x-auto` as a safety fallback on the container.

### CR-6 [IMPORTANT] Calendar resets independently from practice streak — user confusion

**Issue:** A streak freeze protects the practice streak but NOT the reward calendar. Users won't understand the distinction.

**Resolution:** Tie the calendar to consecutive login days (claims), NOT to the practice streak. Add a clear UI explanation:

1. In `DailyRewardCalendar.tsx`, when the cycle has been reset (detected by `currentDay === 1 && cycleStartDate === null && cyclesCompleted > 0`), show a one-time tooltip: "Daily rewards reset when you miss a day. Claim every day to reach Day 7!"

2. In the `DailyRewardClaimModal` header, always show: "Day {n} of 7 — claim every day!"

3. **Do NOT tie to streak freeze.** The calendar is a simpler, separate system. Streak freezes are a paid/earned item for practice streaks — coupling them adds complexity without clarity. The explanation text handles user confusion.

### CR-7 [IMPORTANT] Gem economy inflation (+114%)

**Issue:** The plan adds ~80 gems/week from the calendar on top of ~70/week from chests.

**Resolution:** The plan's math in the "Interaction with Existing Systems" table is already wrong — it says 14% increase but 80+70 = 150 vs 70 is actually +114%. Correct the table. However, the calendar's actual weekly yield assumes a user claims ALL 7 days, which is the ideal case. Realistic completion rates will be lower.

**Product decision needed:** Should the calendar REPLACE the daily chest or STACK with it? Recommendation for MVP: **Stack for now**, but add an admin analytics dashboard widget showing gems-earned-per-user-per-week. If inflation becomes a problem, either raise shop prices or convert the daily chest into the calendar (making them the same system). Document this as an open product question.

Updated table row:
```
| **Gem economy** | Calendar adds up to ~80 gems per 7-day cycle on top of existing ~70 gems/week from chests. This is a potential +114% increase for users who complete both. Monitor via admin analytics. **Product decision pending:** calendar may replace daily chests in a future iteration. |
```

### CR-8 [MINOR] `isFirstTime` logic prevents Day 1 claim for new users

**Issue:** New users with `lastClaimDate === null` never see the claim modal.

**Resolution:** The current behavior is intentional for MVP — new users discover the calendar on the quests page. However, add a first-time introduction flow:

When `lastClaimDate === null` AND user visits quests page, the `DailyRewardCalendar` component shows a subtle "New! Claim daily rewards" badge. Tapping a DayCircle with status `'current'` directly claims the reward with a mini-animation (no full-screen modal for first claim). After the first claim, all subsequent days use the full `DailyRewardClaimModal`.

### CR-9 [MINOR] `useIsDark()` import location

**Resolution:** Import from `@/store/useThemeStore`:
```typescript
import { useIsDark } from '@/store/useThemeStore';
```

### CR-10 [CROSS-CUTTING] Merge function in `useEngagementStore` persist config

**Issue:** Adding `dailyRewardCalendar` to state but not to the merge function means it's lost on every app reload.

**Resolution:** Add to the merge function (line ~907 of `useEngagementStore.ts`):

```typescript
dailyRewardCalendar: persisted.dailyRewardCalendar
  ? { ...defaults.dailyRewardCalendar, ...persisted.dailyRewardCalendar }
  : defaults.dailyRewardCalendar,
```

This is critical and must not be forgotten during implementation.

### CR-11 [CROSS-CUTTING] Modal ordering

**Resolution:** `DailyRewardClaimModal` renders with these guards in `page.tsx`:

```tsx
{!comeback.isInComebackFlow && !showWelcomeBack && (
  <Suspense fallback={null}>
    <DailyRewardClaimModal />
  </Suspense>
)}
```

Priority order on the home page (highest to lowest):
1. WelcomeBack (comeback flow)
2. DailyRewardClaimModal (daily reward)
3. LeagueWinner
4. StreakFreeze / StreakContinued / StreakMilestone
5. LevelUpCelebration
6. BlueprintCelebration / CourseCompleteCelebration
7. StreakNudgeBanner (NOT a modal — always below)

### CR-12 [CROSS-CUTTING] Dark mode colors

**Resolution:** Specify dark mode colors for new components:

**DailyRewardCalendar:**
- Light bg: `bg-white` | Dark bg: `dark:bg-surface-800`
- Header text: `text-gray-800 dark:text-surface-50`
- Subtext: `text-gray-400 dark:text-surface-500`
- Claimed circle: `bg-green-500 dark:bg-green-600`
- Current circle border: `border-yellow-400 dark:border-yellow-500`
- Locked circle: `bg-gray-200 dark:bg-surface-700`

**DailyRewardClaimModal:**
- Background: `#1E293B` (works in both themes — it's a full-screen modal with its own bg)
- Text: white on dark bg (both themes)

### CR-13 [CROSS-CUTTING] AvatarFrame for mystery reward

**Open product question:** Does the `AvatarFrame` rendering system support custom frame styles like `'calendar-collector'`? The `rewardFrames` array in `gem-shop.ts` defines frames with `borderColor` and `glowColor`. The `AvatarFrame` component would need to read these properties. Verify that `src/components/ui/AvatarFrame.tsx` (or equivalent) supports rendering custom frames from the `activeFrames` inventory. If not, implement a simple border+glow renderer based on the frame definition's `borderColor` and `glowColor`.
