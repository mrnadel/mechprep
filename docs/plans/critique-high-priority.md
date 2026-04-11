# High-Priority Implementation Plan Critique

> **Reviewer:** Critic Agent | **Date:** 2026-04-07 | **Scope:** 4 high-priority gap plans (4, 5, 6, 8)

Severity key: **[CRITICAL]** = will cause bugs/crashes/data loss, **[IMPORTANT]** = will cause UX problems or wasted work, **[MINOR]** = polish / best-practice issue.

---

## 1. Plan: Mid-Session Difficulty Adaptation (Gap 4)

### 1.1 [CRITICAL] `submitAnswer` signature change breaks existing call sites silently

The plan adds an optional third parameter `cruisingBonus?: boolean` to `useCourseStore.submitAnswer`. The current signature at line 328 is `submitAnswer: (questionId: string, correct: boolean)` and the `CourseState` interface at line 100 defines `submitAnswer: (questionId: string, correct: boolean) => void`.

The plan updates both locations, but **every existing caller of `submitAnswer` must be audited**. Looking at the codebase:

- `LessonView.tsx` line 416: `_submitAnswer(currentQuestion.id, correct)` -- the plan says to update this. Good.
- `LessonView.tsx` line 342: `_submitAnswer(questionId, correct)` inside `handleTypeAnswer` -- **NOT UPDATED by the plan**. This is the callback for non-standard lesson types (conversation, speed-round, timeline, case-study). Since the param is optional, it won't crash, but these calls will never pass `cruisingBonus: true`, meaning non-standard types can never earn cruising XP even if they are later integrated with adaptive tracking. This is fine for now, but the plan should **explicitly mention** `handleTypeAnswer` as a call site that intentionally does not pass the cruising flag.
- `LessonView.tsx` line 517: `_submitAnswer(currentQuestion.id, true)` inside `handleTeachingGotIt` -- also not updated, which is correct (teaching cards should not get cruising bonus). Should be documented.

**Fix:** Add explicit documentation in the plan about all three call sites of `_submitAnswer` and why only `handleAnswer` passes the cruising flag.

### 1.2 [CRITICAL] Cruising mode check uses STALE `adaptiveMode` in `handleAnswer`

In `handleAnswer` (line 441), the cruising bonus is applied using the current `adaptiveMode` state:

```typescript
const cruiseBonus = adaptiveMode === 'cruising' ? CRUISING_XP_BONUS : 1;
```

But the `recentAnswers` update happens in the same callback, ABOVE this line (line 432-438). React's `useState` setter is batched -- `setRecentAnswers` schedules an update but `adaptiveMode` (derived from `useMemo`) won't reflect the new answers until the next render. This means:

- When the user answers their 5th question correctly (entering cruising), `adaptiveMode` is still `'normal'` from the previous render. The cruising bonus is NOT applied to that 5th answer.
- When the user answers incorrectly after cruising (leaving cruising), `adaptiveMode` is still `'cruising'` from the previous render. The cruising bonus IS applied to the wrong answer (the plan checks `correct` in the store but the local `xpGain` state gets the bonus).

For the **store-level** fix, the plan correctly passes `adaptiveMode === 'cruising' && correct` to `_submitAnswer`. But this also uses the stale `adaptiveMode`. The fix should either:
1. Compute the new adaptive mode inline within `handleAnswer` before passing the flag, or
2. Accept the one-question lag as a feature (entering cruising on Q5 applies bonus starting Q6), which is actually the existing behavior and arguably correct -- you earn the bonus starting from the NEXT question after entering cruising mode.

**Fix:** Document that the cruising bonus applies with a one-question lag due to React state batching, and that this is intentional (you see the "cruising!" toast, THEN start earning bonus XP on subsequent questions). Or compute the adaptive mode eagerly: `const nextMode = getAdaptiveMode([...recentAnswers, correct])`.

### 1.3 [IMPORTANT] `game-config.ts` already exists but plan says "New constants"

The plan's Phase 1 says to add adaptive difficulty constants to `src/lib/game-config.ts`. This file already exists (verified at `D:\Work\Octokeen\src\lib\game-config.ts`, 81 lines) and already contains game constants including `DOUBLE_XP_BUFFER_MS`. The plan's description of "New file" / "New constants" is misleading -- it should say "Add to existing `game-config.ts`."

More importantly, the plan proposes constants like `ADAPTIVE_CRUISING_XP_BONUS = 1.5` but the existing `LessonView.tsx` uses `CRUISING_XP_BONUS = 1.5`. The plan's import alias `ADAPTIVE_CRUISING_XP_BONUS as CRUISING_XP_BONUS` works but is unnecessarily convoluted. Just name the constant `CRUISING_XP_BONUS` in game-config since there's no collision.

**Fix:** Simplify constant names. Export `CRUISING_XP_BONUS` (not `ADAPTIVE_CRUISING_XP_BONUS`) from game-config since the `ADAPTIVE_` prefix is redundant when in a section clearly labeled "Adaptive Difficulty."

### 1.4 [IMPORTANT] `ADAPTIVE_MIN_ANSWERS` is 3 in the plan but `getAdaptiveMode` already hardcodes 3

The plan introduces `ADAPTIVE_MIN_ANSWERS = 3` as a new constant and says to "Update `getAdaptiveMode` to use `ADAPTIVE_MIN_ANSWERS` instead of the hardcoded `3`." But `getAdaptiveMode` on line 53 reads: `if (recentAnswers.length < 3) return 'normal';`.

The cruising check on line 57 also requires `window.length >= ROLLING_WINDOW` (5). So the effective minimum for cruising is 5, not 3. The `ADAPTIVE_MIN_ANSWERS = 3` constant only applies to struggling mode. This is confusing -- a single `MIN_ANSWERS` constant suggests it controls both modes, but cruising has its own implicit minimum of `ROLLING_WINDOW`.

**Fix:** Either (a) rename to `ADAPTIVE_MIN_ANSWERS_STRUGGLING` and add `ADAPTIVE_MIN_ANSWERS_CRUISING = ROLLING_WINDOW`, or (b) document that `MIN_ANSWERS` only gates struggling mode and cruising naturally requires `ROLLING_WINDOW` answers.

### 1.5 [IMPORTANT] XP bonus formula has an inconsistency between the plan text and the code

The plan describes two different formulas:

- Phase 1 code: `cruisingBonusXp = xpReward * (CRUISING_XP_BONUS - 1) * (cruisingCorrectCount / totalQuestions)` -- so `xpReward * 0.5 * (cruisingCorrectCount / totalQuestions)`
- Phase 2 stacking rules: `cruisingBonusXp = xpReward * 0.5 * (cruisingCorrectCount / totalQuestions)`

These match. Good. But the Phase 2 example says:

> "If a user answers all 10 questions correctly while in cruising mode... at most 5 of 10 questions get the bonus... `cruisingBonusXp = xpReward * 0.5 * 0.5 = xpReward * 0.25`"

This is WRONG. If cruising starts after Q5 (the 5th answer establishes the perfect window), then questions Q6-Q10 (5 questions) get the bonus if also correct. But the plan passes `cruisingBonus: true` using the STALE `adaptiveMode` (see issue 1.2). If we accept the one-question lag, then Q7-Q10 get the bonus (4 questions), so `cruisingCorrectCount = 4`, and `cruisingBonusXp = xpReward * 0.5 * (4/10) = xpReward * 0.2`. The plan's example is off.

**Fix:** Recalculate the example accounting for the state-lag, or fix the lag per issue 1.2.

### 1.6 [IMPORTANT] Plan references `playSound('streakMilestone')` but doesn't verify this sound exists

Phase 3 says: `playSound('streakMilestone');` when entering cruising mode. The plan should verify that `'streakMilestone'` is a valid `SoundName` in `src/lib/sounds.ts`. If it doesn't exist, the call will either silently fail or throw a TypeScript error.

**Fix:** Verify `'streakMilestone'` exists in the `SoundName` type union. If not, use an existing celebratory sound or add one.

### 1.7 [IMPORTANT] AdaptiveToast XP bonus text is misleading for the store-level formula

Phase 7.3 proposes showing "+5 XP per Q" or "+10 XP per Q" in cruising messages. But the actual bonus is NOT "+5 per question." The formula is `xpReward * 0.5 * (cruisingCorrectCount / totalQuestions)`, which is a proportional bonus applied at lesson completion, not per-question. For a 10 XP lesson with 5 cruising answers out of 10, the total bonus is `10 * 0.5 * 0.5 = 2.5 XP`, or roughly +0.5 XP per cruising question. The toast message "+5 XP per Q" promises far more than what's delivered.

**Fix:** Either (a) change the toast message to something vague like "Bonus XP active!" or "Extra XP for perfect streak!", or (b) change the formula to actually deliver per-question bonuses (which the plan explicitly chose NOT to do for economic reasons).

### 1.8 [MINOR] Test case 6 may be incorrect depending on `ADAPTIVE_MIN_ANSWERS`

Test case 6: "Does NOT return 'cruising' with 4 answers even if all correct." This asserts `getAdaptiveMode([true, true, true, true]) === 'normal'`. This is correct because `window.length >= ROLLING_WINDOW` (4 < 5). But if `ADAPTIVE_MIN_ANSWERS` were ever increased to 5, the struggling check would also change behavior. The test should be explicit about which guard prevents cruising (window size, not min answers).

### 1.9 [MINOR] No interaction with `useHeartsStore` documented

The plan doesn't mention the 6th store `useHeartsStore` (imported at `LessonView.tsx` line 30). Hearts are lost when the user answers incorrectly (line 444: `loseHeart()`). When the user is in struggling mode, they're losing hearts rapidly. The plan should note that struggling mode + hearts can quickly lead to an `OutOfHeartsModal`, breaking the adaptive flow. Consider adding a note about this interaction.

---

## 2. Plan: Friend Quests, Shared Streaks & Activity Feed (Gap 5)

### 2.1 [CRITICAL] `rewardClaimed` schema change is a DESTRUCTIVE migration

The plan replaces `rewardClaimed: boolean` with `rewardClaimedUser: boolean` + `rewardClaimedPartner: boolean`. Running `npm run db:push` with Drizzle Kit will attempt to DROP the `reward_claimed` column and ADD two new ones. On a production database with existing rows:

- Any quests with `rewardClaimed = true` will LOSE that information -- both new columns default to `false`.
- If any quests were legitimately claimed, the users can now claim them again (double-claiming).

This is a data migration, not just a schema migration. Drizzle Kit's `push` does NOT run data migrations.

**Fix:** This requires a multi-step migration:
1. ADD `reward_claimed_user` and `reward_claimed_partner` columns (both default `false`)
2. Run a data migration: `UPDATE friend_quests SET reward_claimed_user = reward_claimed, reward_claimed_partner = reward_claimed WHERE reward_claimed = true`
3. DROP the `reward_claimed` column

Alternatively, since the `friend_quests` table is new and likely empty in production, explicitly verify this assumption and document that the plan is only safe for initial deployment.

### 2.2 [CRITICAL] `sendPushToUser` does NOT exist in `src/lib/push.ts`

The plan's Phase 6 imports `sendPushToUser` from `@/lib/push`. Looking at the actual `src/lib/push.ts` (verified), it exports only `sendPushNotification(subscription, payload)` -- a low-level function that takes a raw push subscription object, not a userId. The `sendPushToUser` wrapper that queries `pushSubscriptions` table does not exist.

The plan acknowledges this ("If it doesn't exist with that exact signature, create a wrapper") and provides implementation code, but:
- The code references a `pushSubscriptions` table import from schema. Let me verify... `src/lib/db/schema.ts` does define `pushSubscriptions` (found via grep).
- The code queries `sub.p256dh` and `sub.auth` which are column names -- these need to be verified against the actual schema.

**Fix:** The plan must explicitly state this is a NEW function to create in `src/lib/push.ts`, not an import. Also verify the `pushSubscriptions` schema column names match (`p256dh`, `auth`, `endpoint`).

### 2.3 [CRITICAL] Race condition in friend quest progress update

The plan's `POST /api/friends/quests/progress` endpoint reads a quest row, computes new progress, then writes it back in a separate UPDATE. If both friends submit progress simultaneously:

1. User A reads: `progressUser = 400, progressPartner = 50`
2. User B reads: `progressUser = 400, progressPartner = 50`
3. User A writes: `progressUser = 450` (added 50 XP)
4. User B writes: `progressPartner = 100` (added 50 XP)

This works because each user updates a different column. But for the `completed` flag:

1. User A computes: `450 + 50 = 500 >= 500 target, completed = true` -- writes `progressUser = 450, completed = true`
2. User B computes: `400 + 100 = 500 >= 500 target, completed = true` -- writes `progressPartner = 100, completed = true`

Wait -- User B computed `completed` using the STALE `progressUser = 400`, getting `400 + 100 = 500 >= 500`. This happens to be correct because User A also reached 500. But consider:

1. User A reads: `progressUser = 400, progressPartner = 0`
2. User B reads: `progressUser = 400, progressPartner = 0`
3. User A writes: `progressUser = 450, completed = false` (450 + 0 = 450 < 500)
4. User B writes: `progressPartner = 100, completed = true` (400 + 100 = 500 >= 500)

User B set `completed = true` using stale `progressUser = 400`. But User A already updated it to 450. The final state: `progressUser = 450, progressPartner = 100, completed = true` -- which is correct! The race happens to be benign for additive quests because progress only increases.

However, User A's update in step 3 set `completed = false`, potentially OVERWRITING User B's `completed = true` from step 4 if the writes happen in opposite order. The `WHERE completed = false` guard doesn't help because at the time of User A's read, completed WAS false.

**Fix:** Use an atomic SQL update instead of read-compute-write:
```sql
UPDATE friend_quests
SET progress_user = LEAST(progress_user + $increment, target),
    completed = CASE WHEN progress_user + $increment + progress_partner >= target THEN true ELSE completed END
WHERE id = $id AND completed = false
```
This ensures each update is atomic and uses the DB's current values, not stale reads.

### 2.4 [CRITICAL] `combined_accuracy` quest type has a broken completion model

The plan's progress endpoint handles accuracy quests like this:
```
if (event === 'accuracy_report' && value >= quest.target) increment = 1;
```

And completion:
```
completed = newProgress >= 1 && otherProgress >= 1;
```

This means: each user needs just ONE session with accuracy >= 80% to complete their side. But the quest definition says "Both maintain 80%+ accuracy this week" (description with `{target}` replaced by 80). "Maintain" implies consistent accuracy, not a single qualifying session. The implementation turns a week-long challenge into a trivially easy one -- complete ONE lesson with 80%+ accuracy and you're done.

The plan's own "Known Limitations" (Appendix D, item 6) acknowledges this: "The current implementation counts 'sessions where accuracy >= target%' rather than tracking running accuracy." But the plan sets `target = 80` on the quest definition, while the progress check compares `newProgress >= 1`. So the target means "80% accuracy" for the threshold check but "1 qualifying session" for the completion check. This is confusing and likely wrong.

**Fix:** Either (a) change the target for accuracy quests to a session count (e.g., target = 3, meaning both need 3 sessions at 80%+), or (b) track running average accuracy (sum of accuracies / session count) and complete when both users' averages exceed the target. Option (a) is simpler and the plan already suggested it in the appendix.

### 2.5 [IMPORTANT] Activity feed de-duplication has a logic flaw

Phase 4.2 adds rate limiting:
```typescript
if (recent.length > 0 && type === 'lesson_complete') return;
```

This only de-duplicates `lesson_complete` activities. But `streak_milestone` and `level_up` can also fire multiple times in quick succession (e.g., user levels up twice in one session via XP boosts). The guard should apply to all activity types, not just `lesson_complete`.

More importantly, the SQL query uses `now() - interval '1 hour'`, which is PostgreSQL server time (UTC). But the user may be completing lessons rapidly in their local evening while the server clock says a different hour. This is fine -- UTC consistency is correct for rate limiting.

**Fix:** Apply de-duplication to all activity types, or at minimum to `lesson_complete` and `level_up`.

### 2.6 [IMPORTANT] Auto-created quests use sorted user IDs but the plan's progress endpoint doesn't

In `GET /api/friends/quests` line 53-54, quests are created with sorted IDs:
```typescript
const [sortedA, sortedB] = [userId, partnerId].sort();
await db.insert(friendQuests).values({
  userId: sortedA,
  partnerId: sortedB,
```

This means `userId` on the quest row is the LEXICOGRAPHICALLY SMALLER ID, not the user who triggered quest creation. The plan's progress endpoint correctly handles this with `const isUserA = quest.userId === userId`, so progress is attributed to the right column. Good.

But the **claim** endpoint (Phase 1.2) references `rewardClaimed` as a single boolean (before the schema change). After the schema change to `rewardClaimedUser` / `rewardClaimedPartner`, the claim code must use the same `isUserA` logic:
```typescript
const isUserA = quest.userId === userId;
const claimCol = isUserA ? 'rewardClaimedUser' : 'rewardClaimedPartner';
```

The plan says this in Phase 1.3 but the claim code in Phase 1.2 was written BEFORE the schema amendment was decided. The claim code at line 233-237 still uses the old single `rewardClaimed`:
```typescript
await db.update(friendQuests).set({ rewardClaimed: true }).where(eq(friendQuests.id, questId));
```

**Fix:** Update the claim code in Phase 1.2 to use the per-user columns (`rewardClaimedUser` / `rewardClaimedPartner`) from the start. Don't present code that references the old schema and then amend it later in Phase 1.3.

### 2.7 [IMPORTANT] XP reward from friend quests is never actually awarded

The claim endpoint returns `rewardXp` in the response, but the plan never shows code that awards this XP. The gems are handled (server-side ledger insert + client-side `addGems`), but XP needs to be:
1. Added to `useStore.progress.totalXp` (practice store) or `useCourseStore.progress.totalXp` (course store)
2. Synced to the DB via `user_progress` or `course_progress` table

The plan shows `return NextResponse.json({ ok: true, rewardXp: def.rewardXp, rewardGems: def.rewardGems })` but neither the server nor the client actually adds the XP to any store.

**Fix:** Either (a) add server-side XP award in the claim endpoint (update `user_progress.totalXp` or `course_progress.totalXp`), or (b) add client-side XP update after a successful claim (call the appropriate store's XP increment), or (c) remove `rewardXp` from friend quest definitions since it's unused (simplest).

### 2.8 [IMPORTANT] `reportFriendQuestProgress` fires 3 separate HTTP requests after every lesson

Phase 2.2 adds to `ResultScreen.tsx`:
```typescript
reportFriendQuestProgress('xp_earned', lessonResult.xpEarned);
reportFriendQuestProgress('lesson_completed', 1);
reportFriendQuestProgress('accuracy_report', lessonResult.accuracy);
```

This fires 3 POST requests after every lesson completion. Most users have 0 active friend quests. These are fire-and-forget but still create unnecessary server load and 3 DB queries each (even just to discover there are no active quests).

**Fix:** Batch the 3 events into a single request:
```typescript
// POST /api/friends/quests/progress
// Body: { events: [{ event: 'xp_earned', value: 150 }, { event: 'lesson_completed', value: 1 }, ...] }
```
Or gate the calls: check if the user has friends (client-side via SWR cache) before firing progress reports.

### 2.9 [IMPORTANT] No Zod validation on the progress or claim endpoint request bodies

The plan's new endpoints parse `req.json()` directly with no Zod validation. The existing pattern in the codebase (e.g., `progressSyncSchema`, `engagementSyncSchema` in `validation.ts`) uses Zod for all API inputs. The new endpoints accept arbitrary JSON and only check `typeof value !== 'number'` for the progress endpoint.

This is inconsistent with the codebase pattern and misses:
- String injection in `questId` (claim endpoint accepts any string)
- Event values outside the `MAX_VALUES` cap could be NaN, Infinity, or negative
- Missing `Content-Type` header check

**Fix:** Add Zod schemas:
```typescript
const progressSchema = z.object({
  event: z.enum(['xp_earned', 'lesson_completed', 'accuracy_report']),
  value: z.number().positive().max(5000),
});
const claimSchema = z.object({
  questId: z.string().uuid(),
});
```

### 2.10 [MINOR] `modal-gallery.html` does not exist

Phase 9 says "No new modals or overlays are created in this plan... No gallery entries needed." However, the claim flow in `FriendQuestCard.tsx` likely triggers a celebration animation when a quest is claimed (confetti, gem award popup). If any such visual state exists, it should be catalogued. The plan should verify whether `FriendQuestCard` has any overlay states.

Also: `modal-gallery.html` does not exist in the repository (verified via glob search). All plans reference it, but no plan creates it. Someone needs to create the gallery file before any plan can add entries to it.

### 2.11 [MINOR] `pickFriendQuest` signature mismatch in claim endpoint

The claim endpoint calls `pickFriendQuest(quest.userId, quest.partnerId, quest.questWeek)`. But `pickFriendQuest`'s third parameter is `week?: string` with default `getCurrentWeekMonday()`. Since `quest.questWeek` is always defined (it's `notNull()` in the schema), this works fine. However, the quest type returned by `pickFriendQuest` may not match the quest's `questType` column if the `FRIEND_QUEST_POOL` changes between the week the quest was created and the week it's claimed (e.g., a deployment that adds/removes/reorders pool entries changes the hash-to-index mapping).

**Fix:** Store `rewardXp` and `rewardGems` on the `friend_quests` table row at creation time, rather than re-deriving them from the pool at claim time. This future-proofs against pool changes.

---

## 3. Plan: Time-Limited XP Events (Gap 6)

### 3.1 [CRITICAL] `useStore.answerQuestion` does NOT import `useSubscriptionStore` -- and adding it creates a circular dependency risk

Phase 1 says: "Add import for `useSubscriptionStore` if not already present (check -- it is NOT currently imported in `useStore.ts`)."

Verified: `useStore.ts` line 14 imports `useSubscriptionStore` from `@/hooks/useSubscription`:
```typescript
import { useSubscriptionStore } from '@/hooks/useSubscription';
```

Wait -- actually, looking more carefully at line 14 of `useStore.ts`: `import { useSubscriptionStore } from '@/hooks/useSubscription';`. **This IS already imported.** The plan says it's NOT imported, which is wrong. This means the plan's instruction to "add import" is unnecessary, but the underlying observation is incorrect.

The actual import IS there. So Phase 1's code change to add `const isPro = useSubscriptionStore.getState().tier === 'pro';` inside `answerQuestion` will work. But note: calling `useSubscriptionStore.getState()` inside a synchronous store action is a cross-store read, which is a common pattern in this codebase (e.g., `useCourseStore` already reads from `useEngagementStore` and `useSubscriptionStore`).

**Fix:** Remove the incorrect statement that `useSubscriptionStore` is not imported. It is already imported at line 14.

### 3.2 [IMPORTANT] Practice-mode XP integration refactors the tamper validation unnecessarily

The plan's Phase 1 shows "Before" and "After" code blocks for `answerQuestion`. The "After" code restructures the entire double-XP validation logic to extract `shopDoubleXp` as a boolean, then combines it with `eventMultiplier`. This is a significant refactor of existing, working code (lines 567-586).

The simpler approach: keep the existing `xp *= 2` for shop double XP, then add a SEPARATE block for event multiplier:
```typescript
// After existing shop double XP block:
const isPro = useSubscriptionStore.getState().tier === 'pro';
const eventMultiplier = getEventXpMultiplier(isPro);
if (eventMultiplier > 1) {
  xp = Math.round(xp * eventMultiplier / (shopDoubleXp ? 2 : 1)) // Back out shop, apply combined
}
```

Actually, the plan's approach (extracting `shopDoubleXp` boolean and computing combined `totalBoostMultiplier`) mirrors the pattern already used in `useCourseStore.completeLesson()` lines 438-446. This is the RIGHT approach for consistency. The only risk is introducing a bug during the refactor of working code.

**Fix:** The plan's approach is correct in principle but should note the risk of refactoring working code. Add a test that verifies existing behavior (shop double XP without events) is preserved after the refactor.

### 3.3 [IMPORTANT] `ResultScreen` XP breakdown shows events active NOW, not events active WHEN the lesson was completed

Phase 4 acknowledges this: "This shows the current events, not the events that were active when the lesson was completed." And dismisses it: "Since lessons are short (2-5 minutes), this is almost always correct."

But practice sessions can be much longer (10+ minutes with pauses), and the user might complete a lesson at 8:58 PM (during Power Hour), see the ResultScreen at 9:01 PM (after Power Hour ends), and the breakdown would show NO event bonus -- even though the XP was correctly boosted.

Worse, the formula `result.xpEarned * (1 - 1/eventMultiplier)` computes bonus XP from the result's actual XP. If `eventMultiplier` at display time is 1 (no events), the math produces `result.xpEarned * (1 - 1) = 0`, and the conditional `eventMultiplier > 1` prevents the breakdown from showing at all. So the user gets boosted XP but sees no explanation of why it's higher than usual. Confusing but not harmful.

**Fix:** Store the active event multiplier and event names on the `LessonResult` type at completion time. Add `eventMultiplier?: number` and `eventNames?: string[]` to `LessonResult` (in `src/data/course/types.ts`). Populate in `completeLesson()`. Display in `ResultScreen`.

### 3.4 [IMPORTANT] Stacking cap of 3.75x is higher than the plan claims is safe

The plan says the theoretical max is 3.75x (shop 2x + weekend 2x + power hour 1.5x + league sprint 1.25x). For practice mode, the per-question XP with `calculateXP` can produce up to ~70 XP for an advanced difficulty question with speed bonus and confidence bonus. At 3.75x, that's ~262 XP per question. A 10-question practice session could yield ~2,620 XP. For reference, a normal lesson gives 10-40 XP total.

This is a huge economy inflation for practice-mode power users. The existing `completeLesson()` applies the multiplier to the lesson's `xpReward` (10-40), keeping the absolute numbers reasonable. But `answerQuestion()` applies it to per-question XP which can be much higher.

**Fix:** Add a per-answer cap in `answerQuestion` after applying the total boost multiplier: `xp = Math.min(xp, 200)` or similar. Or apply the event multiplier only to the base portion of XP (excluding speed/confidence bonuses) to keep the stacking reasonable.

### 3.5 [IMPORTANT] `scheduleEventNotifications` has timer leak potential

Phase 6 uses `setTimeout` to schedule notifications up to 30-60 minutes in the future. These timers are created in `engagement-init.ts` (likely called from a `useEffect`). If the component re-renders or the user navigates away and back, `engagement-init.ts` may be called again, scheduling duplicate timers.

The `Notification.tag` property prevents duplicate notifications from showing, so the user won't see duplicates. But the timers themselves accumulate in memory. In a long session with multiple page navigations, this could create hundreds of unused timers.

**Fix:** Track scheduled timers in a module-level `Set` and clear them before scheduling new ones:
```typescript
const scheduledTimers = new Set<ReturnType<typeof setTimeout>>();
export function scheduleEventNotifications(isPro: boolean): void {
  scheduledTimers.forEach(clearTimeout);
  scheduledTimers.clear();
  // ... schedule new timers, add to scheduledTimers
}
```

### 3.6 [MINOR] `POWER_HOUR_START` constant is referenced but not exported from `xp-events.ts`

Phase 6 uses `POWER_HOUR_START` in the notification scheduling code. Looking at `src/lib/xp-events.ts` line 44, `POWER_HOUR_START` is declared as a module-level constant but is NOT exported. The scheduling code is in a new function in the same file, so this is fine. But if the scheduling code is in `engagement-init.ts` (as the plan also suggests), it would need the constant exported.

**Fix:** Keep `scheduleEventNotifications` in `xp-events.ts` (not `engagement-init.ts`) so it can access the private constants. Call it from `engagement-init.ts`.

### 3.7 [MINOR] Phase 9 says `modal-gallery.html` "does not currently exist in the repo"

Verified: `modal-gallery.html` does not exist (glob search returned no results). The plan correctly identifies this. But it still says "If it is created before this plan is implemented, add an entry." All 10 plans reference this file. It should be created as a prerequisite task.

---

## 4. Plan: Shareable Certificates & LinkedIn (Gap 8)

### 4.1 [CRITICAL] `shareCertificate` return type change is a BREAKING API change

Phase 5.1 changes `shareCertificate()` from `Promise<void>` to `Promise<ShareResult>`. Looking at the existing callers:

- `src/components/engagement/CourseCompleteCelebration.tsx` (line 72-91): calls `shareCertificate(certParams)` as fire-and-forget (no `await`, no return value used).
- `src/app/(app)/skills/page.tsx` (line 211-229): calls `shareCertificate(...)` in an `onClick` handler.

Changing the return type from `Promise<void>` to `Promise<ShareResult>` is backward-compatible since existing callers that ignore the return value will continue to work. **This is not actually breaking.**

However, the plan's updated `shareCertificate` code in Phase 5.1 changes the function's behavior: it no longer falls through from text-only share to download when text-only share succeeds. The old code returns after successful text-only share. The new code also returns `'shared'`. This is correct behavior but the catch clause now catches `AbortError` and returns `'cancelled'` instead of falling through. This means if the text-only share throws a non-AbortError exception, it falls through to download -- same as before. Good.

**Not actually critical.** Downgrading from the header.

### 4.2 [CRITICAL] Certificate page `Buffer.from()` is NOT available in Edge Runtime

Phase 1.1 proposes fetching the mascot image and converting to base64:
```tsx
const mascotBuffer = await mascotRes.arrayBuffer();
const mascotBase64 = `data:image/png;base64,${Buffer.from(mascotBuffer).toString('base64')}`;
```

The certificate route uses `export const runtime = 'edge';` (verified at line 4). In the Edge Runtime, Node.js `Buffer` is NOT available. The Edge Runtime has `ArrayBuffer` but not `Buffer.from().toString('base64')`.

**Fix:** Use the Web API equivalent:
```typescript
const mascotBuffer = await mascotRes.arrayBuffer();
const mascotBase64 = `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(mascotBuffer)))}`;
```
Or use `Uint8Array` + manual base64 encoding. For large images, the spread approach can hit stack limits, so use a chunked approach or import a base64 utility.

### 4.3 [IMPORTANT] LinkedIn `share-offsite` `summary` parameter is indeed unsupported -- but the fix has its own problem

The plan correctly identifies that LinkedIn's `share-offsite` endpoint only accepts `url`. The fix (Option B) creates a public `/certificate` page with OG tags. This is the right approach.

However, the new `getLinkedInShareUrl` function in Phase 3.4 passes ALL certificate params as URL search params:
```
/certificate?name=Alice&profession=Personal+Finance&professionIcon=💰&color=%2310B981&score=87
```

This URL is shared publicly on LinkedIn. The `professionIcon` parameter contains an emoji (`💰`), which will be URL-encoded as `%F0%9F%92%B0`. While functional, this creates an ugly URL in the LinkedIn post. More importantly, the `color` parameter (hex code with `#`) requires encoding as `%23`.

**Fix:** Consider using slugified profession IDs instead of full names/colors/icons in the URL. The certificate page can resolve `?profession=personal-finance` to the full name, icon, and color from `src/data/professions.ts`. This makes the shared URL cleaner: `/certificate?name=Alice&profession=personal-finance&score=87`.

### 4.4 [IMPORTANT] Certificate page is NOT in `authRequiredPrefixes` but the middleware matcher WILL intercept it

The plan says: "The `/certificate` page must be accessible WITHOUT authentication. Check `src/middleware.ts`... Since the route is under `src/app/certificate/` (not `src/app/(app)/certificate/`), it should be outside the auth-protected layout."

Looking at `src/proxy.ts` (the actual middleware file, NOT `middleware.ts`):
- `authRequiredPrefixes` does NOT include `/certificate`. Good.
- The middleware matcher regex: `'/((?!api|_next|favicon\\.ico|...)).*)'` -- this WILL match `/certificate`. The middleware will run.
- But the middleware only redirects if `!isLoggedIn && authRequiredPrefixes.some(...)`. Since `/certificate` is not in the list, unauthenticated users will NOT be redirected. They pass through to `NextResponse.next()`.

So the page IS accessible without login. The plan's analysis is correct, even though it references `middleware.ts` which doesn't exist (the file is `proxy.ts`).

**Fix:** The plan should reference `src/proxy.ts`, not `src/middleware.ts`.

### 4.5 [IMPORTANT] `generateCertificateId` hash function produces collisions for similar inputs

The hash function uses the standard djb2 algorithm:
```typescript
hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
```

With only 6 characters from a 30-char alphabet (`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`), there are 30^6 = 729 million possible IDs. However, the hash distribution after `Math.abs(hash)` and repeated `% chars.length` is NOT uniform. The division-based extraction (`h = Math.floor(h / chars.length)`) quickly drives `h` to 0 for small hashes, causing the last characters to cluster around `'A'`.

For a decorative certificate ID, this is acceptable -- it doesn't need to be unique or evenly distributed. But the plan calls this "NOT cryptographically secure -- decorative only," which is the right framing.

**Fix:** No change needed, but the hash quality could be improved by using `Math.abs(hash) % (chars.length ** 6)` and extracting digits from a single large number, rather than dividing sequentially. Minor polish.

### 4.6 [IMPORTANT] Certificate preview in `CourseCompleteCelebration` adds latency to an already-expensive modal

Phase 6.2 adds `<img src={getCertificateUrl(certParams)} />` inside the celebration modal. This triggers a fetch to `/api/certificate` which runs `ImageResponse` on Edge -- generating a PNG in real-time. The celebration modal already has heavy Framer Motion animations and confetti effects. Adding an image generation request may cause:

1. Visual jank: the image loads asynchronously, causing a layout shift when it appears.
2. Increased time-to-interactive: the browser queues the image fetch alongside other resources.

**Fix:** Use `loading="lazy"` (the plan uses `loading="eager"`) or add `fetchPriority="low"`. Better: show a skeleton/placeholder while the image loads, then fade it in with a transition.

### 4.7 [IMPORTANT] `CertificateParams` type is NOT exported from `certificate.ts`

The plan's Phase 5.2 uses `certParams` of type `CertificateParams` across multiple files (`skills/page.tsx`, `CourseCompleteCelebration.tsx`). Looking at `src/lib/certificate.ts` line 7: `interface CertificateParams` -- this is NOT exported (no `export` keyword).

The existing code works because `shareCertificate`, `downloadCertificate`, and `getCertificateUrl` all accept the interface inline. But the plan adds `getLinkedInShareUrl` calls from components that need to construct `CertificateParams` objects. Without the exported type, callers can't type-annotate their `certParams` const.

**Fix:** Export the `CertificateParams` interface from `certificate.ts`:
```typescript
export interface CertificateParams { ... }
```

### 4.8 [MINOR] `Linkedin` icon import from lucide-react may not exist

Phase 5.2 imports `Linkedin` from `lucide-react`. The correct icon name in lucide-react is `Linkedin` (capital L, lowercase inkedin). This should exist in the project's lucide-react version (0.577+), but should be verified. If not, `LinkedinIcon` is an alternative.

### 4.9 [MINOR] No dark mode considerations for the certificate page

The `/certificate` page uses hardcoded light colors: `bg-[#FAFAFA]`, `border-gray-200`, `text-gray-500`, etc. The rest of the app supports dark mode via Tailwind's `dark:` classes. When a user shares a certificate link to someone who has dark mode enabled system-wide, the page will be a jarring bright white.

**Fix:** Add `dark:` variants to the certificate page styles, or use the app's existing color tokens (`bg-surface-50 dark:bg-surface-900`).

---

## 5. Cross-Cutting Concerns

### 5.1 [CRITICAL] Adaptive difficulty cruising bonus + XP events = unexpected stacking

The adaptive difficulty plan (Gap 4) makes the cruising bonus ADDITIVE on top of the multiplied base:
```
totalXp = (xpReward * accuracyMultiplier * totalBoostMultiplier) + cruisingBonusXp
```

The XP events plan (Gap 6) defines `totalBoostMultiplier` as additive stacking of shop + events.

These interact correctly -- the cruising bonus is additive on TOP of the event-boosted base, so they don't multiply each other. The maximum lesson XP with all boosts active:

- 10 XP base lesson, flawless (4x accuracy), shop (2x) + weekend (2x) + power hour (1.5x) + league sprint (1.25x) = totalBoostMultiplier 3.75x
- Base XP: 10 * 4 * 3.75 = 150 XP
- Cruising bonus: 10 * 0.5 * (5/10) = 2.5 XP
- **Total: 152.5 XP** from a single 10 XP lesson

For practice mode, the numbers are much higher since per-question XP can be 70+ and the event multiplier applies to each question (see issue 3.4 above).

**No fix needed for lesson mode** -- the 2.5 XP cruising bonus is negligible. But the cross-plan stacking documentation should exist somewhere so future developers understand the full XP formula.

### 5.2 [CRITICAL] Friend quest `friend_quest_reward` gem source needs `VALID_GEM_SOURCES` update -- plan addresses this correctly

The friend quests plan explicitly adds `friend_quest_reward: { maxEarn: 30, maxSpend: 0 }` to `VALID_GEM_SOURCES`. This matches the highest reward in the pool (XP Sprint = 30 gems). This is correct and well-documented.

**Shared prerequisite with medium-priority plans:** The daily rewards plan also needs `daily_reward_calendar`, `daily_reward_bonus_overflow`, and `mystery_reward`. The story narrative plan needs `story_unlock`. **A single coordinated update to `VALID_GEM_SOURCES` should cover ALL plans.** The friend quests plan should not add its source in isolation -- it should be done as part of a shared prerequisite step.

### 5.3 [IMPORTANT] Celebration sharing (Gap 12) `ShareButton` vs Certificate plan's share buttons -- redundant implementations

The celebration sharing plan (`plan-celebration-sharing.md`) creates a new `ShareButton` component and `share-card.ts` utility. The certificate plan creates share buttons inline in `CourseCompleteCelebration.tsx` and `skills/page.tsx`. Both implement share-with-fallback logic.

The certificate plan's `shareCertificate()` is specifically for certificate images. The celebration plan's `shareCard()` is for generic share cards (streak, league, level, etc.). But both:
- Fetch an image from an API route
- Try Web Share API with file
- Fall back to text-only share
- Fall back to download

These should share a common `shareImage(url, shareText)` utility rather than duplicating the logic.

**Fix:** Extract the image-share-with-fallback logic into a shared `src/lib/share-utils.ts`. Both `shareCertificate` and `shareCard` become thin wrappers that construct URLs and pass them to the shared utility.

### 5.4 [IMPORTANT] Friend quest progress reporting fires from `ResultScreen` which is ALSO where XP events bonus is displayed

The XP events plan (Gap 6, Phase 4) adds event bonus breakdown to `ResultScreen`. The friend quests plan (Gap 5, Phase 2.2) adds `reportFriendQuestProgress` calls to `ResultScreen`. Both modify the same `useEffect` block (lines 64-78 in `ResultScreen.tsx`). The existing `useEffect` uses a `ref` guard (`engagementTracked.current`).

When both plans are implemented, the `useEffect` will contain:
1. Solo quest updates (`updateQuestProgress`)
2. League XP update (`updateLeagueXp`)
3. Gem award for 3-star first completion
4. **Friend quest progress reports** (Gap 5)
5. **Event bonus display computation** (Gap 6, though this is in the render, not the effect)

This effect is getting bloated. Consider extracting the friend quest reporting into its own `useEffect` with its own ref guard.

### 5.5 [IMPORTANT] Micro-celebrations (Gap 13) toasts + adaptive difficulty toasts -- acknowledged but coordination is vague

The adaptive difficulty plan (Gap 4, Phase 8) says:
> "When `adaptiveMode === 'cruising'`, suppress the streak-type MicroCelebration."

The micro-celebrations plan (Gap 13) says:
> "They should never overlap because AdaptiveToast disappears when the user answers, and MicroCelebration appears after."

The previous critique (Gap 13, issue 5.2) correctly identified this is not accurate -- both can be visible simultaneously. The adaptive plan adds a coordination note but relies on the Gap 13 implementer to respect it. There's no enforced mechanism.

**Fix:** The coordination should be enforced in code, not via documentation. Add to LessonView: `const suppressStreakCelebration = adaptiveMode === 'cruising';` and pass it as a prop or use it as a guard before triggering the streak micro-celebration.

### 5.6 [IMPORTANT] Adaptive difficulty cruising bonus counts toward friend quest "XP earned" progress

When a user earns XP during cruising mode, the total XP includes the cruising bonus. The friend quest progress report sends `lessonResult.xpEarned` to the server. This means cruising mode accelerates friend quest completion for `combined_xp` quests.

Is this intended? If yes, it creates a positive feedback loop: users in cruising mode earn more XP, completing friend quests faster, earning gem rewards, which they can spend on double XP, which further accelerates progress. This is probably fine for engagement but should be a conscious design decision.

**Fix:** Document this as intentional behavior. No code change needed.

### 5.7 [IMPORTANT] Certificate plan + celebration sharing plan both modify `CourseCompleteCelebration.tsx`

The certificate plan (Gap 8, Phase 6) adds share loading states and a certificate preview image to `CourseCompleteCelebration.tsx`. The celebration sharing plan (Gap 12) says "No structural change needed" for course completion but "optionally refactor to use the new `ShareButton` component."

If both are implemented, the component will have:
- Certificate-specific share buttons (from Gap 8)
- Generic `ShareButton` component (from Gap 12)
- Loading states, preview image, LinkedIn button

These should be unified. The Gap 8 changes should use the Gap 12 `ShareButton` component rather than implementing inline share buttons.

**Fix:** Implement Gap 12's `ShareButton` first, then use it in Gap 8's certificate work.

### 5.8 [MINOR] All 4 plans add new test files but none update the CI test command

The plans create:
- `src/__tests__/critical/adaptive-difficulty.test.ts`
- `src/__tests__/lib/xp-events.test.ts`
- `src/__tests__/lib/friend-quests.test.ts`
- `src/__tests__/critical/friend-quests-api.test.ts`
- `src/__tests__/lib/certificate.test.ts`

These will be automatically discovered by Vitest's glob pattern. No CI change needed. Just noting for completeness.

### 5.9 [MINOR] No plan considers the interaction between daily rewards (Gap 10) gems + friend quest (Gap 5) gems on the gem economy

The daily rewards plan adds ~80 gems/week. The friend quest plan adds up to 90 gems/week (3 quests * max 30 gems). Combined with existing sources (~70 gems/week from quests/leagues), total weekly gem income could reach ~240 gems/week. Shop prices remain unchanged. The engagement store has a `MAX_GEM_TRANSACTIONS_CLIENT` limit but no balance cap.

**Fix:** This is a product decision. Document the new gem income ceiling and consider adjusting shop prices in a follow-up.

---

## 6. Missing Features / Considerations

### 6.1 No plan mentions `modal-gallery.html` creation

All 10 plans (6 medium + 4 high) reference `modal-gallery.html` per CLAUDE.md requirements. But the file does not exist. One plan must create it. This should be a shared prerequisite.

### 6.2 Accessibility (Gap 14) implications for new components

The accessibility plan covers existing components but all 4 high-priority plans add new interactive elements:
- Adaptive difficulty: `AdaptiveToast` (already has `AnimatePresence` but no `role="status" aria-live="polite"`)
- Friend quests: `FriendQuestCard` claim button, `ActivityFeed` high-five button
- XP events: `ActiveEventBanner` (countdown timer needs `aria-live`)
- Certificates: Share/Download/LinkedIn buttons, public certificate page

None of the 4 plans mention ARIA attributes, focus management, or keyboard navigation for their new components.

**Fix:** Each plan should include an accessibility checklist:
- Toasts/banners: `role="status"` + `aria-live="polite"`
- Interactive buttons: `aria-label`, focus ring visibility
- Countdown timers: `aria-label` or `aria-live="polite"` region
- Certificate page: semantic headings, image alt text (the plan does include alt text, good)

### 6.3 Content seed script updates

The adaptive difficulty and XP events plans make no content changes, so no seed script update needed. The friend quests plan modifies DB tables directly via API routes (no seed). The certificate plan has no content changes. None of the 4 plans require `npx tsx scripts/seed-content.ts` updates.

### 6.4 Multi-device sync for friend quest claims

Friend quests are server-authoritative (good). But the client-side `addGems('friend_quest_reward')` creates a local gem transaction that may conflict with the server-side ledger on the next engagement sync. The engagement sync uses `computeGemBalanceFromLedger()` as the authority, so the client balance will be corrected on next sync. But there may be a brief period where the client shows a higher balance than the server (double-counted).

**Fix:** After calling `addGems` client-side, trigger a re-sync or mark the local transaction as "pending server confirmation." Or simply accept the brief inconsistency since it resolves on next sync.

---

## 7. Questions Needing Product Decisions

1. **Gap 4 + Gap 6:** Should the cruising XP bonus apply during XP events? Currently it stacks additively which is fine, but the cruising bonus (+2.5 XP on a 10 XP lesson) is negligible compared to event bonuses (up to 3.75x). Is it worth the complexity?

2. **Gap 5:** Should friend quest rewards include XP (currently returned but never awarded) or only gems? If XP is awarded, which store does it go into (`useStore` vs `useCourseStore`)?

3. **Gap 5:** The `combined_accuracy` quest needs a better completion model. Should it require a minimum number of qualifying sessions (e.g., 3 sessions at 80%+), or track running average accuracy?

4. **Gap 5:** What happens to incomplete friend quests at week end? Are they simply abandoned, or should there be a "quest expired" UI state?

5. **Gap 8:** Should the certificate page be indexable by search engines? Currently the `generateMetadata` function creates OG tags but doesn't add `noindex`. If indexed, arbitrary user names appear in Google results.

6. **Gap 8:** Should certificate IDs be verifiable? The current decorative ID has no server-side record. A future `/verify/OKC-A1B2C3` route would need a `certificates` table. Is this a requirement?

7. **All plans:** `modal-gallery.html` does not exist. Which plan/developer creates it?

8. **Gap 4 + Gap 13:** When adaptive mode is cruising AND a streak micro-celebration triggers, which takes priority? The plan says suppress streak celebrations during cruising, but what about halfway/last-question celebrations? Should those also be suppressed?

9. **Gap 5 + Gap 12:** When a friend quest is completed, should it generate a shareable card (via Gap 12's `ShareButton`)? The friend quests plan creates an activity feed entry but no share moment.

10. **Gap 6:** Power Hour is hardcoded to 7-9 PM local time. Should this be configurable per user (via settings), or should it follow the user's daily goal commitment time? A user who practices at 6 AM will never benefit from Power Hour.
