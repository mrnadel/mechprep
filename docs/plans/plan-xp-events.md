# Gap 6: Time-Limited XP Events

## Overview & Motivation

Duolingo uses time-limited XP multiplier events to create urgency and spike engagement at predictable intervals. Users return during Power Hours, log in on weekends for double XP, and push harder during League Sprint finals. Currently, Octokeen has the foundational infrastructure for XP events (`src/lib/xp-events.ts`, `src/components/ui/ActiveEventBanner.tsx`) and integration into `useCourseStore.completeLesson()`, but several critical gaps remain:

1. **`useStore.answerQuestion()` does NOT apply event multipliers** -- practice-mode XP ignores all events
2. **No tests exist** for any XP event logic
3. **The banner is functional but visually basic** -- no light-mode colors, no pulsing countdown, no stacked-event display logic
4. **No Mixpanel analytics** for event engagement tracking
5. **No push notifications** when events start
6. **Edge cases are unhandled** -- lesson started before event, DST transitions, midnight rollover

This plan addresses all six gaps to bring the feature to production quality.

---

## Current State Assessment

### Already Implemented

| Component | File | Status |
|---|---|---|
| Event detection (weekend, power hour, league sprint) | `src/lib/xp-events.ts` | Done -- `getActiveXpEvents()`, `getEventXpMultiplier()`, `formatEventTimeLeft()` |
| Additive stacking | `src/lib/xp-events.ts` L131-138 | Done -- `1 + sum(multiplier - 1)` prevents multiplicative explosion |
| ActiveEventBanner (basic) | `src/components/ui/ActiveEventBanner.tsx` | Done -- shows cards, 30s refresh, AnimatePresence |
| Banner placement on home page | `src/app/(app)/page.tsx` L263-266 | Done -- renders below CourseHeader |
| Course-mode XP integration | `src/store/useCourseStore.ts` L438-446 | Done -- `getEventXpMultiplier(isPro)` applied in `completeLesson()` |
| Shop double XP stacking with events | `src/store/useCourseStore.ts` L443-446 | Done -- additive: `1 + (shopMultiplier - 1) + (eventMultiplier - 1)` |
| Pro feature flag | `src/lib/pricing.ts` L23 | Done -- `FEATURES.DOUBLE_XP_WEEKENDS` defined |
| Subscription hook | `src/hooks/useSubscription.ts` | Done -- `isProUser` exposed |

### NOT Implemented (Gaps)

| Gap | Priority | Effort |
|---|---|---|
| Practice-mode XP integration (`useStore.answerQuestion`) | **CRITICAL** | 30 min |
| Unit tests for `xp-events.ts` | **CRITICAL** | 1 hr |
| Banner visual polish (light mode, dark mode, stacking UX) | IMPORTANT | 1 hr |
| Countdown timer (per-second, not per-30-seconds) | IMPORTANT | 30 min |
| Mixpanel analytics events | IMPORTANT | 30 min |
| Push notification for event start | MODERATE | 1 hr |
| Edge case: lesson-spans-event-boundary | MODERATE | 30 min |
| `modal-gallery.html` entry | MINOR | 15 min |
| ResultScreen XP breakdown showing event bonus | IMPORTANT | 45 min |

---

## Design Principles

- **No new database tables or columns.** Events are purely time-based and computed on the client. No user-specific event state needs persistence.
- **No new Zustand store state.** Event detection is a pure function of `Date.now()` + `isPro`. No need to store active events.
- **Additive stacking cap.** The existing additive formula `1 + sum(bonus - 1)` is correct. Maximum possible stack: Weekend (2x) + Power Hour (1.5x) + League Sprint (1.25x) = 1 + 1 + 0.5 + 0.25 = **2.75x** (not 3.75x from multiplicative). With shop double XP: 1 + 1 + 0.5 + 0.25 + 1 = **3.75x**. This is the theoretical max and requires Pro + shop purchase + Sunday 7-9 PM + last 24h of league week.
- **Event applies at answer/completion time, not at lesson start.** This is how it already works in `completeLesson()` and should be consistent in `answerQuestion()`.
- **All time checks use local time** except league week boundaries which use the existing `getCurrentWeekMonday()` convention (local time via `getSimulatedNow()`).

---

## Implementation Plan

### Phase 1: Practice-Mode XP Integration (CRITICAL)

**File:** `src/store/useStore.ts`

The `answerQuestion` action (line 560) currently applies the shop double-XP boost but does NOT apply event multipliers. This means Power Hour, Weekend Double XP, and League Sprint have zero effect on practice-mode sessions.

**Changes:**

1. Add import at top of file:
```ts
import { getEventXpMultiplier } from '@/lib/xp-events';
```

2. In `answerQuestion` (line 560-613), after the existing shop double-XP check block (line 572-586), add event multiplier logic. Replace the direct `xp *= 2` with the same additive stacking pattern used in `useCourseStore.completeLesson()`:

**Before (current code, lines 567-586):**
```ts
let xp = calculateXP(question, correct, timeSpent, confidence);

// Apply double XP boost if active (with tamper validation)
const engState = useEngagementStore.getState();
const doubleXpExpiry = engState.doubleXpExpiry;
if (doubleXpExpiry) {
  // ... tamper validation ...
  if (hasRecentPurchase) {
    xp *= 2;
  }
}
```

**After (new code):**
```ts
let xp = calculateXP(question, correct, timeSpent, confidence);

// Apply double XP boost if active (with tamper validation)
const engState = useEngagementStore.getState();
const doubleXpExpiry = engState.doubleXpExpiry;
let shopDoubleXp = false;
if (doubleXpExpiry) {
  const expiry = new Date(doubleXpExpiry).getTime();
  const now = Date.now();
  if (!isNaN(expiry) && expiry > now && expiry <= now + DOUBLE_XP_SHOP_DURATION_MS + DOUBLE_XP_BUFFER_MS) {
    const recentCutoff = now - (DOUBLE_XP_SHOP_DURATION_MS + DOUBLE_XP_RECENT_PURCHASE_WINDOW_MS);
    shopDoubleXp = engState.gems.transactions.some(
      (t) => t.source === 'shop_purchase' && t.amount < 0 && new Date(t.timestamp).getTime() > recentCutoff
    );
  }
}

// Time-limited XP events (weekend 2x, power hour, league sprint)
const isPro = useSubscriptionStore.getState().tier === 'pro';
const eventMultiplier = getEventXpMultiplier(isPro);
const shopMultiplier = shopDoubleXp ? 2 : 1;
// Shop boost and event boost stack additively
const totalBoostMultiplier = shopMultiplier === 1 && eventMultiplier === 1
  ? 1
  : 1 + (shopMultiplier - 1) + (eventMultiplier - 1);
xp = Math.round(xp * totalBoostMultiplier);
```

This mirrors the exact same stacking logic already in `useCourseStore.completeLesson()` (lines 438-446).

3. Add import for `useSubscriptionStore` if not already present (check -- it is NOT currently imported in `useStore.ts`):
```ts
import { useSubscriptionStore } from '@/hooks/useSubscription';
```

**Why this matters:** Without this change, a Pro user playing during Power Hour + Weekend gets 2.5x XP on course lessons but only 2x (shop) or 1x (no shop) on practice questions. This is a visible inconsistency.

---

### Phase 2: Unit Tests for xp-events.ts (CRITICAL)

**New file:** `src/__tests__/lib/xp-events.test.ts`

Test coverage for all event detection and multiplier logic. All tests must mock `Date` to control time.

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getActiveXpEvents, getEventXpMultiplier, formatEventTimeLeft } from '@/lib/xp-events';

// Helper to mock Date.now() and new Date() to a specific time
function mockDate(isoString: string) {
  const fixed = new Date(isoString);
  vi.useFakeTimers();
  vi.setSystemTime(fixed);
}

afterEach(() => {
  vi.useRealTimers();
});
```

**Test cases:**

1. **Weekend detection:**
   - Saturday 10 AM local -> `isWeekend = true`
   - Sunday 11:59 PM local -> `isWeekend = true`
   - Friday 11:59 PM local -> `isWeekend = false`
   - Monday 12:00 AM local -> `isWeekend = false`

2. **Weekend Double XP (Pro only):**
   - Saturday + isPro=true -> event present with multiplier 2
   - Saturday + isPro=false -> event NOT present
   - Tuesday + isPro=true -> event NOT present

3. **Power Hour detection:**
   - 7:00 PM local -> active
   - 8:59 PM local -> active
   - 6:59 PM local -> NOT active
   - 9:00 PM local -> NOT active

4. **League Sprint detection:**
   - Sunday 1:00 AM (within last 24h of Mon-Sun week) -> active
   - Saturday 11:00 PM (within last 24h) -> depends on exact hour threshold
   - Monday 10:00 AM -> NOT active

5. **Additive stacking:**
   - Single event (Power Hour 1.5x) -> `getEventXpMultiplier(false) = 1.5`
   - Weekend + Power Hour (Pro, Sunday 7 PM) -> `1 + 1 + 0.5 = 2.5`
   - All three (Pro, Sunday 7 PM, last day of week) -> `1 + 1 + 0.5 + 0.25 = 2.75`
   - No events -> `getEventXpMultiplier(true) = 1`

6. **Weekend end calculation:**
   - Saturday -> endsAt is Sunday 23:59:59
   - Sunday -> endsAt is Sunday 23:59:59

7. **formatEventTimeLeft:**
   - 2 hours remaining -> "2h 0m left"
   - 45 minutes remaining -> "45m left"
   - 0 or negative -> "Ending soon"

8. **Edge case -- midnight rollover:**
   - Saturday 11:59 PM -> weekend active
   - Sunday 11:59 PM -> weekend active
   - Monday 12:00 AM -> weekend NOT active (no event)

9. **Edge case -- DST transition:**
   - Mock a time during DST spring-forward (2 AM -> 3 AM skip)
   - Verify power hour detection still uses local time correctly
   - This is inherently handled by `Date.getHours()` which returns local time

**Mocking strategy:** Use `vi.useFakeTimers()` + `vi.setSystemTime()` to control `new Date()` and `Date.now()`. The `getCurrentWeekMonday()` function from quest-engine also uses `new Date()`, so it will be affected by the mock. However, `getCurrentWeekMonday` uses a debug offset mechanism (`_debugDayOffset`). Tests should NOT use that mechanism -- they should use Vitest's fake timers instead, which is cleaner.

**Important:** `getCurrentWeekMonday()` is imported from `@/lib/quest-engine`. The league sprint detection in `xp-events.ts` calls it. Ensure the mock time is consistent so that `getCurrentWeekMonday()` returns the expected Monday for the mocked date.

---

### Phase 3: ActiveEventBanner Visual Polish (IMPORTANT)

**File:** `src/components/ui/ActiveEventBanner.tsx`

The current banner works but has visual gaps:

#### 3a. Add light-mode color support

Current gradients only use dark-mode-friendly colors (e.g., `text-purple-300`). In light mode these are nearly invisible.

**Replace the gradient/color maps with responsive classes:**

```ts
const gradients: Record<string, string> = {
  'weekend-double-xp': 'from-purple-100 to-indigo-100 border-purple-300 dark:from-purple-500/20 dark:to-indigo-500/20 dark:border-purple-400/30',
  'power-hour': 'from-amber-100 to-orange-100 border-amber-300 dark:from-amber-500/20 dark:to-orange-500/20 dark:border-amber-400/30',
  'league-sprint': 'from-emerald-100 to-teal-100 border-emerald-300 dark:from-emerald-500/20 dark:to-teal-500/20 dark:border-emerald-400/30',
};

const textColors: Record<string, string> = {
  'weekend-double-xp': 'text-purple-700 dark:text-purple-300',
  'power-hour': 'text-amber-700 dark:text-amber-300',
  'league-sprint': 'text-emerald-700 dark:text-emerald-300',
};
```

#### 3b. Per-second countdown timer

The current 30-second refresh interval means the countdown can be up to 30 seconds stale. For events ending soon, this creates a poor UX.

**Change:** When any event has less than 10 minutes remaining, switch to a 1-second refresh interval for the countdown display. Keep the 30-second interval for event detection (to avoid re-running `getActiveXpEvents` every second).

```tsx
function EventCard({ event }: { event: ActiveXpEvent }) {
  const [timeLeft, setTimeLeft] = useState(formatEventTimeLeft(event.endsAt));

  useEffect(() => {
    const updateTime = () => setTimeLeft(formatEventTimeLeft(event.endsAt));
    // Use 1-second updates when <10 min remaining, else 30s
    const msRemaining = new Date(event.endsAt).getTime() - Date.now();
    const intervalMs = msRemaining < 10 * 60 * 1000 ? 1000 : 30_000;
    const interval = setInterval(updateTime, intervalMs);
    return () => clearInterval(interval);
  }, [event.endsAt]);

  // ... rest unchanged
}
```

#### 3c. Multiplier badge emphasis

Add a prominent multiplier badge to make the XP bonus immediately scannable:

```tsx
<div className="flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-white/10 px-2.5 py-1">
  <span className="text-xs font-black tabular-nums">{event.multiplier}x</span>
  <span className="text-[10px] font-semibold text-surface-500">XP</span>
</div>
```

This replaces the current plain-text "2x XP on all questions" with a scannable badge on the right side + the descriptive text under the event name.

#### 3d. Stacked events display

When multiple events are active simultaneously, the current layout stacks them vertically. This is fine but could use a combined multiplier indicator at the top:

```tsx
export function ActiveEventBanner() {
  // ... existing state ...

  if (events.length === 0) return null;

  const totalMultiplier = events.reduce((sum, e) => sum + (e.multiplier - 1), 1);

  return (
    <div className="space-y-2 mb-4">
      {events.length > 1 && (
        <div className="text-center text-xs font-bold text-surface-500 dark:text-surface-400">
          Combined: {totalMultiplier.toFixed(1)}x XP
        </div>
      )}
      <AnimatePresence>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </AnimatePresence>
    </div>
  );
}
```

---

### Phase 4: ResultScreen XP Breakdown (IMPORTANT)

**File:** `src/components/lesson/ResultScreen.tsx`

After completing a lesson during an active event, the user should see the bonus breakdown, not just the final number. This reinforces the value of events and creates urgency for future events.

**Approach:** The `LessonResult` type (in `src/data/course/types.ts`) currently has `xpEarned: number`. We do NOT change this type -- `xpEarned` already includes the event multiplier (it's calculated in `completeLesson()`). Instead, we compute the breakdown at display time:

In ResultScreen, after rendering the `xpEarned` value, add a conditional breakdown:

```tsx
// Compute what the XP would have been without events
const events = getActiveXpEvents(isProUser);
const eventMultiplier = events.length > 0
  ? events.reduce((sum, e) => sum + (e.multiplier - 1), 1)
  : 1;

// Only show breakdown if events were active
{eventMultiplier > 1 && (
  <div className="text-xs text-surface-400 mt-1">
    <span className="text-primary-500 font-semibold">+{Math.round(result.xpEarned * (1 - 1/eventMultiplier))} bonus XP</span>
    {' '}from {events.map(e => e.name).join(' + ')}
  </div>
)}
```

**Caveat:** This shows the current events, not the events that were active when the lesson was completed. Since lessons are short (2-5 minutes), this is almost always correct. The rare edge case (event ends during lesson) would show a slightly wrong breakdown, but the total XP is always correct because it was computed at `completeLesson()` time. Acceptable tradeoff.

---

### Phase 5: Mixpanel Analytics (IMPORTANT)

**File:** `src/lib/xp-events.ts` (add export) + integration points

Track these events via Mixpanel:

| Event Name | Properties | When |
|---|---|---|
| `xp_event_active` | `{ event_id, event_name, multiplier }` | When user first sees an event banner on the home page |
| `xp_event_bonus_earned` | `{ event_ids: string[], total_multiplier, base_xp, bonus_xp }` | On `completeLesson()` or `completeSession()` when `eventMultiplier > 1` |

**Implementation in ActiveEventBanner:**

```tsx
// In ActiveEventBanner component
useEffect(() => {
  if (events.length > 0) {
    events.forEach(event => {
      analytics.track('xp_event_active', {
        event_id: event.id,
        event_name: event.name,
        multiplier: event.multiplier,
      });
    });
  }
}, [events.map(e => e.id).join(',')]); // re-track only when event set changes
```

**Implementation in useCourseStore.completeLesson():**

After the XP calculation block (line 446), add:

```ts
if (eventMultiplier > 1) {
  const activeEvents = getActiveXpEvents(isPro);
  // We can't import analytics in the store (it's a client-side lib and stores are also client)
  // Instead, store the event info on the LessonResult for the ResultScreen to track
  // Actually: we CAN import Mixpanel in client stores. It's already done elsewhere.
}
```

Better approach: Add tracking in the ResultScreen component where events are already being read for the breakdown display. This keeps the store pure and puts side effects (analytics) in the component layer.

---

### Phase 6: Push Notification for Event Start (MODERATE)

**Prerequisite:** The `PushPrompt` component already exists at `src/components/engagement/PushPrompt.tsx`, which means the push notification infrastructure (service worker, subscription) is already set up.

**Approach:** Since XP events are time-based and predictable, push notifications can be scheduled client-side using the `Notification` API or via the service worker's `setTimeout`/`setInterval`. However, true scheduled push requires a server-side cron.

**Simpler approach for MVP:** In `engagement-init.ts`, after the existing initialization sequence, check if there is an upcoming event within the next 30 minutes that hasn't been notified. If so, use `setTimeout` to fire a local notification at the event start time.

**Implementation in `src/lib/engagement-init.ts`:**

Add after the `checkComebackFlow()` call (line 93):

```ts
// Schedule push notification for upcoming XP events
scheduleEventNotifications(isPro);
```

**New helper function (add to `src/lib/xp-events.ts`):**

```ts
/**
 * Schedule browser notifications for upcoming XP events.
 * Only schedules within the current browser session (no persistence needed).
 */
export function scheduleEventNotifications(isPro: boolean): void {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const now = new Date();

  // Power Hour: notify 5 minutes before 7 PM if user is active
  const powerHourStart = new Date(now);
  powerHourStart.setHours(POWER_HOUR_START, 0, 0, 0);
  const msUntilPowerHour = powerHourStart.getTime() - now.getTime() - 5 * 60 * 1000;

  if (msUntilPowerHour > 0 && msUntilPowerHour < 30 * 60 * 1000) {
    setTimeout(() => {
      new Notification('Power Hour starts in 5 minutes!', {
        body: 'Earn 1.5x XP on all questions from 7-9 PM',
        icon: '/favicons/favicon-192x192.png',
        tag: 'xp-event-power-hour', // prevents duplicate notifications
      });
    }, msUntilPowerHour);
  }

  // Weekend Double XP: notify on Friday evening if Pro
  if (isPro) {
    const day = now.getDay();
    if (day === 5) { // Friday
      const saturdayMidnight = new Date(now);
      saturdayMidnight.setDate(now.getDate() + 1);
      saturdayMidnight.setHours(0, 0, 0, 0);
      const msUntilWeekend = saturdayMidnight.getTime() - now.getTime() - 30 * 60 * 1000;
      if (msUntilWeekend > 0 && msUntilWeekend < 60 * 60 * 1000) {
        setTimeout(() => {
          new Notification('Weekend Double XP starts soon!', {
            body: 'Earn 2x XP all weekend as a Pro member',
            icon: '/favicons/favicon-192x192.png',
            tag: 'xp-event-weekend',
          });
        }, msUntilWeekend);
      }
    }
  }
}
```

**Notes:**
- Uses the `tag` property to prevent duplicate notifications if the user refreshes the page
- Only schedules notifications for events within the next 30-60 minutes (not all future events)
- Gracefully degrades if notifications are not permitted
- No server-side cron needed for MVP -- this is a client-side enhancement

---

### Phase 7: Edge Cases

#### 7a. Lesson started before event, completed during event

**Current behavior:** `completeLesson()` calls `getEventXpMultiplier(isPro)` at completion time. This means if a user starts a lesson at 6:55 PM and finishes at 7:05 PM (Power Hour start), they get the 1.5x bonus. This is **intentional and correct** -- it matches Duolingo's behavior and rewards the user for being active when the event starts.

**No change needed.** Document this as intentional behavior.

#### 7b. Event ends during a lesson

If a user starts a lesson during Power Hour at 8:55 PM and finishes at 9:05 PM, `getEventXpMultiplier()` at 9:05 PM returns 1 (no Power Hour). The user loses the bonus. This is also **intentional** -- the event ended. The alternative (recording events at start time) adds complexity for minimal gain.

**No change needed.** The per-second countdown timer in the banner (Phase 3b) provides sufficient warning.

#### 7c. Midnight rollover / timezone

All event detection uses `new Date()` which returns local time. This is correct:
- Power Hour (7-9 PM) should be in the user's local timezone
- Weekend detection uses `getDay()` which returns the local day
- League Sprint uses `getCurrentWeekMonday()` from quest-engine, which also uses local time

**No change needed.** The existing implementation is correct.

#### 7d. DST transition

During a DST "spring forward" (2 AM -> 3 AM), if Power Hour is 7-9 PM, there is no impact because the time jump happens at 2 AM, not during the event window. During a DST "fall back" (2 AM -> 1 AM), the user effectively gets an extra hour of weekend, which is fine.

The only risk is if a user is in a timezone where DST transitions happen during 7-9 PM (no standard timezone does this). **No change needed.**

#### 7e. Debug day offset

The quest engine has `_debugDayOffset` for admin "Skip day" functionality. The `getCurrentWeekMonday()` function respects this offset, so league sprint detection also respects it. However, `isWeekend()` and `isPowerHour()` in `xp-events.ts` use raw `new Date()`, NOT `getSimulatedNow()`.

**Change needed:** Update `xp-events.ts` to use `getSimulatedNow()` from quest-engine so that debug day skipping also affects event detection. This is a minor change:

```ts
// In xp-events.ts, replace:
import { getCurrentWeekMonday } from '@/lib/quest-engine';
// With:
import { getCurrentWeekMonday, getTodayDate } from '@/lib/quest-engine';

// And add a helper that gets the simulated "now" for consistency:
// Actually, getSimulatedNow is not exported. We need to either export it or
// accept that debug offset doesn't affect event detection.
```

**Decision:** For MVP, accept that debug day offset does not affect weekend/power-hour detection. The league sprint detection already works via `getCurrentWeekMonday()`. If needed later, export `getSimulatedNow()` from quest-engine.

---

### Phase 8: How Shop Double XP Interacts with Events

This is already implemented correctly in `useCourseStore.completeLesson()`. The stacking formula:

```
totalBoostMultiplier = 1 + (shopMultiplier - 1) + (eventMultiplier - 1)
```

Examples:
| Shop | Event | Total |
|---|---|---|
| No shop (1x) | No events (1x) | 1x |
| Shop 2x | No events (1x) | 2x |
| No shop (1x) | Power Hour (1.5x) | 1.5x |
| Shop 2x | Power Hour (1.5x) | 2.5x |
| Shop 2x | Weekend (2x) + Power Hour (1.5x) | 3.5x |
| Shop 2x | All three (2.75x) | 3.75x |

The shop boost is NOT an "event" in `getActiveXpEvents()` -- it's handled separately with tamper validation. The additive stacking happens at the call site (`completeLesson` / `answerQuestion`), not inside `getEventXpMultiplier()`. This is correct because the shop boost requires tamper validation (checking transaction history) while events are pure time checks.

**No change needed** to the stacking formula. Phase 1 ensures `answerQuestion` uses the same formula.

---

### Phase 9: modal-gallery.html Entry

Per CLAUDE.md: "Every new screen, modal, or overlay must be added to `modal-gallery.html`."

The `modal-gallery.html` file does not currently exist in the repo. If it is created before this plan is implemented, add an entry for the ActiveEventBanner. The banner is not a modal or overlay -- it's an inline component. However, it has three visual states (weekend, power hour, league sprint) and a stacked state (multiple events) that should be catalogued.

**Entry to add:**
```html
<!-- ActiveEventBanner: XP Events -->
<section>
  <h3>ActiveEventBanner — Single Event (Power Hour)</h3>
  <!-- Screenshot of amber gradient card with "Power Hour" + "1.5x XP" badge -->

  <h3>ActiveEventBanner — Single Event (Weekend Double XP)</h3>
  <!-- Screenshot of purple gradient card with "Weekend Double XP" + "2x XP" badge -->

  <h3>ActiveEventBanner — Single Event (League Sprint)</h3>
  <!-- Screenshot of emerald gradient card with "League Sprint" + "1.25x XP" badge -->

  <h3>ActiveEventBanner — Stacked Events</h3>
  <!-- Screenshot showing two cards stacked with "Combined: 2.5x XP" header -->
</section>
```

---

## Files Changed Summary

| File | Change | Phase |
|---|---|---|
| `src/store/useStore.ts` | Add event multiplier to `answerQuestion()`, import `getEventXpMultiplier` and `useSubscriptionStore` | 1 |
| `src/__tests__/lib/xp-events.test.ts` | **NEW** -- comprehensive unit tests | 2 |
| `src/components/ui/ActiveEventBanner.tsx` | Light/dark mode colors, per-second countdown, multiplier badge, stacked display | 3 |
| `src/components/lesson/ResultScreen.tsx` | XP breakdown showing event bonus | 4 |
| `src/components/ui/ActiveEventBanner.tsx` | Mixpanel tracking on event visibility | 5 |
| `src/lib/xp-events.ts` | Add `scheduleEventNotifications()` export | 6 |
| `src/lib/engagement-init.ts` | Call `scheduleEventNotifications()` during init | 6 |
| `modal-gallery.html` | Add ActiveEventBanner entries (if file exists) | 9 |

**No new Zustand state fields.** No database changes. No API route changes. No Zod schema changes.

---

## Implementation Order

```
Phase 1 (30 min) - Practice-mode XP integration  [CRITICAL - do first]
    |
Phase 2 (1 hr)  - Unit tests                     [CRITICAL - validates Phase 1 + existing]
    |
Phase 3 (1 hr)  - Banner visual polish            [IMPORTANT - user-visible]
    |
Phase 4 (45 min) - ResultScreen XP breakdown       [IMPORTANT - reinforces event value]
    |
Phase 5 (30 min) - Mixpanel analytics              [IMPORTANT - measures effectiveness]
    |
Phase 6 (1 hr)  - Push notifications               [MODERATE - engagement boost]
    |
Phase 7 (none)  - Edge cases                       [documented, no code changes needed]
    |
Phase 9 (15 min) - modal-gallery entry             [MINOR]
```

**Total estimated effort: ~5 hours**

---

## Testing Strategy

### Unit Tests (Phase 2)

All tests in `src/__tests__/lib/xp-events.test.ts` use `vi.useFakeTimers()` + `vi.setSystemTime()` to control time.

**Test matrix:**

| Scenario | Mocked Time | isPro | Expected Events | Expected Multiplier |
|---|---|---|---|---|
| Weekday, no event | Tue 3 PM | false | [] | 1 |
| Weekday, power hour | Tue 7:30 PM | false | [power-hour] | 1.5 |
| Weekday, power hour, Pro | Tue 7:30 PM | true | [power-hour] | 1.5 |
| Weekend, free user | Sat 10 AM | false | [] | 1 |
| Weekend, Pro user | Sat 10 AM | true | [weekend-double-xp] | 2 |
| Weekend power hour, Pro | Sat 7:30 PM | true | [weekend-double-xp, power-hour] | 2.5 |
| League sprint only | Sun 2 AM | false | [league-sprint] | 1.25 |
| All three, Pro | Sun 7:30 PM (last 24h) | true | [weekend, power-hour, league-sprint] | 2.75 |
| Just before power hour | Tue 6:59 PM | false | [] | 1 |
| Just after power hour | Tue 9:00 PM | false | [] | 1 |
| Weekend boundary - Friday 11:59 PM | Fri 11:59 PM | true | [] | 1 |
| Weekend boundary - Saturday 12:00 AM | Sat 12:00 AM | true | [weekend-double-xp] | 2 |

### Integration Test for answerQuestion

In `src/__tests__/store/` or alongside the existing store tests, add a test that:
1. Mocks time to Power Hour
2. Mocks `useSubscriptionStore` to `tier: 'free'`
3. Calls `answerQuestion()` with a correct answer
4. Verifies the XP awarded is 1.5x the base XP

### Manual QA Checklist

- [ ] Visit home page during a normal weekday, verify no banner shows
- [ ] Visit home page between 7-9 PM, verify Power Hour banner appears
- [ ] Visit home page on Saturday/Sunday as Pro user, verify Weekend banner appears
- [ ] Visit home page on Saturday/Sunday as free user, verify NO Weekend banner (Power Hour still shows if in window)
- [ ] Complete a lesson during Power Hour, verify XP on ResultScreen is 1.5x normal
- [ ] Complete a lesson with shop double XP + Power Hour, verify additive (2.5x not 3x)
- [ ] Check banner in light mode and dark mode for all three event types
- [ ] Check banner countdown updates per-second when < 10 min remaining
- [ ] Check stacked event display (set clock to Sunday 7 PM in last week of league)

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Event multiplier makes XP inflation too aggressive | Medium | Medium | Monitor via admin analytics. The theoretical max (3.75x) requires very specific conditions. Typical boost is 1.5x for 2 hours/day. |
| League sprint bonus creates unfair advantage for players who time their sessions | Low | Low | League competitors are simulated bots, not real players. The "unfairness" is against AI opponents. |
| Push notifications annoy users | Medium | Low | Notifications are conservative (5 min before Power Hour, 30 min before weekend). The `tag` property prevents duplicates. |
| `formatEventTimeLeft` shows stale time between refreshes | Low | Low | Phase 3b switches to 1-second updates when < 10 min remaining. Users won't notice a 30-second lag otherwise. |

---

## What This Plan Does NOT Cover

1. **Server-side event validation.** All XP is calculated client-side. A malicious user could modify `getEventXpMultiplier()` to always return 10x. This is an existing limitation of the client-first architecture (noted in project-overview.md section 15.1). Server-side XP validation is a separate, larger initiative.

2. **Custom/ad-hoc events.** This system only supports the three hardcoded event types (Weekend, Power Hour, League Sprint). An admin-configurable event system (e.g., "Holiday Triple XP" for Christmas) would require a database table and API route. This is a potential future enhancement.

3. **Event-specific quests.** e.g., "Earn 500 XP during Power Hour" quests. These would require adding a new `QuestTrackingKey` and quest definitions. Potential future enhancement.

4. **Visual celebration on first event encounter.** A "first time seeing Power Hour" modal/celebration to explain the feature. Users must discover it via the banner. If adoption is low, consider adding an educational modal.

---

## Critic Resolutions (42-Issue Audit)

The following addresses all issues raised in `critique-high-priority.md` for Gap 6:

### CR-3.1 [CRITICAL] `useSubscriptionStore` import claim is wrong

**Critic says:** The plan states `useSubscriptionStore` is NOT imported in `useStore.ts`, but it actually IS (line 14).

**Verification:** Confirmed. `src/store/useStore.ts` line 14: `import { useSubscriptionStore } from '@/hooks/useSubscription';`. The plan's claim is incorrect.

**Resolution:** Remove the incorrect statement. The import already exists. The Phase 1 code change to add `const isPro = useSubscriptionStore.getState().tier === 'pro';` inside `answerQuestion` will work with the existing import. No circular dependency risk — this is the same cross-store read pattern already used by `useCourseStore.completeLesson()`.

### CR-3.2 [IMPORTANT] Practice-mode refactor risk

**Critic says:** The Phase 1 restructuring of the double-XP validation block is a significant refactor of working code.

**Resolution:** The plan's approach (extracting `shopDoubleXp` boolean, computing combined `totalBoostMultiplier`) mirrors the exact pattern in `useCourseStore.completeLesson()` (lines 438-446, verified). This is the correct approach for consistency. However, add a dedicated test to preserve existing behavior:

```typescript
// In xp-events.test.ts:
it('answerQuestion with shop double XP and no events matches pre-refactor behavior', () => {
  // Mock: no events active, shop double XP on
  // Assert: xp === baseXp * 2 (same as the old `xp *= 2`)
});
```

### CR-3.3 [IMPORTANT] ResultScreen shows events at display time, not completion time

**Critic says:** If Power Hour ends during a lesson, the breakdown shows no bonus even though XP was boosted.

**Resolution:** Store event information on the `LessonResult` type at completion time. Add to `src/data/course/types.ts`:

```typescript
export interface LessonResult {
  // ... existing fields ...
  /** Event multiplier applied at completion time (1 = no events). */
  eventMultiplier?: number;
  /** Names of active events at completion time. */
  eventNames?: string[];
}
```

In `useCourseStore.completeLesson()`, populate these fields:

```typescript
const activeEvents = getActiveXpEvents(isPro);
const eventMultiplier = activeEvents.length > 0
  ? activeEvents.reduce((sum, e) => sum + (e.multiplier - 1), 1) : 1;

// In the LessonResult object:
eventMultiplier: eventMultiplier > 1 ? eventMultiplier : undefined,
eventNames: eventMultiplier > 1 ? activeEvents.map(e => e.name) : undefined,
```

In `ResultScreen`, use `result.eventMultiplier` and `result.eventNames` instead of re-computing from `getActiveXpEvents()`.

### CR-3.4 [IMPORTANT] Practice-mode XP inflation at 3.75x cap

**Critic says:** Per-question practice XP can be ~70 XP. At 3.75x, that's ~262 XP per question. A 10-question session yields ~2,620 XP vs normal lesson's 10-40 XP.

**Resolution:** Add a per-answer XP cap in `answerQuestion` after applying the boost:

```typescript
xp = Math.round(xp * totalBoostMultiplier);
// Cap per-question XP to prevent extreme inflation during event stacking
xp = Math.min(xp, 200);
```

The cap of 200 XP per question means the theoretical max per 10-question session is 2,000 XP. This is still generous during triple-stack events but prevents truly absurd numbers. Normal gameplay (no events) typically produces 20-70 XP per question, well under the cap.

### CR-3.5 [IMPORTANT] Timer leak in `scheduleEventNotifications`

**Resolution:** Track scheduled timers in a module-level Set and clear on re-call:

```typescript
const scheduledTimers = new Set<ReturnType<typeof setTimeout>>();

export function scheduleEventNotifications(isPro: boolean): void {
  // Clear any previously scheduled timers
  scheduledTimers.forEach(clearTimeout);
  scheduledTimers.clear();

  if (typeof window === 'undefined') return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  // ... scheduling logic unchanged ...
  // When creating timers:
  const timerId = setTimeout(() => { /* ... */ }, msUntilPowerHour);
  scheduledTimers.add(timerId);
}
```

### CR-3.6 [MINOR] `POWER_HOUR_START` not exported

**Verification:** Confirmed. `POWER_HOUR_START` is a module-level `const` (not exported) at line 44 of `xp-events.ts`.

**Resolution:** Keep `scheduleEventNotifications` in `xp-events.ts` (same file as `POWER_HOUR_START`), so it can access the private constant. Export only the function, not the constant. Call it from `engagement-init.ts`:

```typescript
// engagement-init.ts:
import { scheduleEventNotifications } from '@/lib/xp-events';
// After checkComebackFlow():
scheduleEventNotifications(isPro);
```

### CR-3.7 [MINOR] `modal-gallery.html` does not exist

**Resolution:** Gallery file creation is moved to shared Phase 0 prerequisites in the MASTER-PLAN.

### CR-5.1 [CRITICAL] Cross-plan: Cruising bonus + XP events stacking

**Resolution:** No code change needed for lesson mode. The stacking is additive by design and the cruising bonus (+3 XP max) is negligible compared to event multipliers. Full formula documented in the adaptive difficulty plan's CR-5.1 resolution.

### CR-6.2 Cross-plan: Accessibility for ActiveEventBanner

**Resolution:** Add to Phase 3:
- Banner container: `role="region" aria-label="Active XP events"`
- Countdown timer: wrap in `<span aria-live="polite" aria-atomic="true">`
- Multiplier badge: `aria-label="{multiplier}x XP multiplier"`
