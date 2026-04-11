# Practice Hub Design Spec

## Goal

Replace the 6 fragmented practice pages with a unified Practice Hub that uses the existing smart algorithm for personalized question selection. Wrong answers recycle until answered correctly. The hub follows Duolingo's practice page layout with a featured card and collections.

## Practice Hub Page (`/practice`)

Dark-themed hub with two sections:

### "Today's Practice" (featured card)

- Dark gradient card (navy-to-purple) with "PERSONALIZED" label
- "Smart Practice" title, subtitle: "Questions picked just for you based on what you need most"
- "START" button (Duolingo-style 3D press effect)
- Illustration placeholder on the right
- **Free for all users**

### "Your collections" (card list)

Three collection cards, each with icon, title, description, and illustration:

1. **Mistakes** (Pro-gated) — "Practice the questions you got wrong recently." Red badge shows unresolved mistake count. Links to a mistakes practice session that only surfaces previously-wrong questions.
2. **Daily Challenge** (Free) — "5 themed questions, new every day." Links to existing `/practice/daily`.
3. **Review** (Pro-gated) — "Revisit topics before you forget them." Links to existing `/practice/review`.

Pro-gated cards show the UpgradeGate modal when tapped by free users.

## Smart Practice Session Flow

### Question Selection

Wire `selectSmartPracticeQuestions` from `src/lib/practice-algorithm.ts` into the store's `selectQuestionsForSession` when session type is `smart-practice`. The algorithm:

- Picks 10 questions weighted by weakness (6 weak, 2 medium, 2 strong)
- Adapts difficulty to user level (beginner/intermediate/advanced)
- Prioritizes novel topics with a 1.5x weight bonus
- Excludes recently-answered questions
- Falls back to random selection if insufficient data

Inputs come from the store's `topicProgress` and `sessionHistory` via the existing `buildPerformance` helper.

### Wrong-Answer Recycling

When the user answers a question wrong, that question is re-inserted into the session queue at a random position 2-4 slots later. The session only completes when all questions have been answered correctly.

Track `retryCount` on the session to count total wrong answers during the session. The progress bar shows progress against the original question count (10), not the extended count.

### XP Scaling

Base XP for practice is the standard session XP. Retries reduce the XP awarded proportionally. A perfect run (0 retries) gets full XP. Each retry reduces XP slightly (cap at 50% of base).

### Session Summary

After completing a practice session, show the existing `SessionSummary` component. The summary should reflect:
- Total questions answered (including retries)
- Number of retries (0 = "Perfect!" badge)
- Topics covered (revealed after completion)
- XP earned

## Mistakes Collection

Track questions the user gets wrong across all sessions (practice and course). Store up to 50 recent mistake question IDs in the engagement store. When the user starts a Mistakes session, pull those questions and run them as a practice session with the same wrong-answer recycling. Questions are removed from the mistakes list once answered correctly in a Mistakes session.

## Navigation Changes

- Uncomment the Practice tab in `MobileBottomNav.tsx` and `DesktopSideNav.tsx`
- The Practice tab links to `/practice` (the new hub)
- Icon: brain emoji or a dumbbell icon (matching Duolingo's practice tab)

## Pages to Remove

Delete these pages (they are absorbed into Smart Practice):
- `/practice/smart`
- `/practice/adaptive`
- `/practice/interview`
- `/practice/weak-areas`
- `/practice/real-world`
- `/practice/topics`

Keep these pages (linked from collection cards):
- `/practice/daily` (Daily Challenge)
- `/practice/review` (Spaced Review)

## Pro Gating

| Mode | Access |
|------|--------|
| Smart Practice | Free |
| Mistakes | Pro |
| Daily Challenge | Free |
| Review | Pro |

Use the existing `UpgradeGate` component and subscription store for gating.

## Dark Theme

The Practice Hub page uses a dark background (`#131F24`) with dark cards (`#1A2C32`, border `#2A3C42`). This matches Duolingo's practice hub aesthetic and contrasts with the rest of the app's light theme. The dark theme is local to this page only, not a global theme switch.

## Files Overview

| Action | File |
|--------|------|
| Create | `src/app/(app)/practice/page.tsx` (the hub) |
| Modify | `src/store/useStore.ts` (wire smart algorithm, add retry queue, add mistakes tracking) |
| Modify | `src/components/layout/MobileBottomNav.tsx` (uncomment Practice tab) |
| Modify | `src/components/layout/DesktopSideNav.tsx` (uncomment Practice tab) |
| Modify | `src/store/useEngagementStore.ts` (add mistakes list state) |
| Delete | `src/app/(app)/practice/smart/page.tsx` |
| Delete | `src/app/(app)/practice/adaptive/page.tsx` |
| Delete | `src/app/(app)/practice/interview/page.tsx` |
| Delete | `src/app/(app)/practice/weak-areas/page.tsx` |
| Delete | `src/app/(app)/practice/real-world/page.tsx` |
| Delete | `src/app/(app)/practice/topics/page.tsx` |
