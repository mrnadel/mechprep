# Plan: Celebration Share Moments (Gap 12)

## Overview & Motivation

Currently, `CourseCompleteCelebration.tsx` has download/share/LinkedIn buttons for certificates, but all other celebration modals (streak milestones, league promotions, level-ups, chapter completions, achievement unlocks) have NO share functionality. Users who hit a 30-day streak or get promoted to Gold league have no way to share their accomplishment, missing a major organic growth and engagement opportunity.

**Goal:** Add "Share" buttons on ALL celebration modals with branded PNG share card generation using canvas, reusing the existing Web Share API pattern from `InviteShare.tsx` and the `ImageResponse` (next/og) pattern from `/api/certificate`.

---

## 1. Share Card Generation Architecture

### Approach: Server-rendered PNG via `next/og` (ImageResponse)

The existing `/api/certificate/route.tsx` already uses `ImageResponse` from `next/og` to generate 1200x630 PNG images on the Edge runtime. This pattern works well, produces high-quality images, and handles font rendering automatically.

**Why not client-side canvas?**
- `ImageResponse` already proven in this codebase
- No need to load canvas libraries or manage font rendering
- Edge-cached, shareable as URLs
- Same image works for og:image meta tags if needed later

### New API route: `src/app/api/share-card/route.tsx`

A single, parameterized endpoint that generates share cards for ALL celebration types.

**URL pattern:**
```
GET /api/share-card?type=streak&days=30&badgeName=Iron+Will&userName=Alex
GET /api/share-card?type=league&tier=Gold&rank=3&userName=Alex
GET /api/share-card?type=level&level=15&title=Senior+Engineer&userName=Alex
GET /api/share-card?type=chapter&unitTitle=Investing+Basics&accuracy=92&lessons=5&userName=Alex
GET /api/share-card?type=achievement&name=Centurion&icon=💯&category=knowledge&userName=Alex
GET /api/share-card?type=course&profession=Personal+Finance&score=87&userName=Alex
```

**Image size:** 1200 x 630 (standard og:image / social share size)

**Route implementation structure:**

```tsx
// src/app/api/share-card/route.tsx
import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const SIZE = { width: 1200, height: 630 };

type CardType = 'streak' | 'league' | 'level' | 'chapter' | 'achievement' | 'course';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get('type') as CardType;
  const userName = searchParams.get('userName') || 'Learner';

  // Route to the correct card renderer based on type
  switch (type) {
    case 'streak': return renderStreakCard(searchParams, userName);
    case 'league': return renderLeagueCard(searchParams, userName);
    case 'level': return renderLevelCard(searchParams, userName);
    case 'chapter': return renderChapterCard(searchParams, userName);
    case 'achievement': return renderAchievementCard(searchParams, userName);
    case 'course': return renderCourseCard(searchParams, userName);
    default: return new Response('Invalid card type', { status: 400 });
  }
}
```

Each renderer returns an `ImageResponse` with a branded layout following this template:

```
┌──────────────────────────────────────────────┐
│  [Octokeen logo/text]              [mascot]  │
│                                              │
│      🔥  30-Day Streak!                     │
│      ═══════════════════                     │
│      Alex  •  Iron Will                      │
│                                              │
│      octokeen.com                            │
└���─────────────────────────────────────────────┘
```

**Design constants for all card types:**

| Element | Style |
|---------|-------|
| Background | Gradient using the celebration's theme color (e.g., #FF9600 for streaks, #58A700 for league promotion) |
| Branding | "Octokeen" text in top-left, `APP_URL` in bottom-center |
| Main visual | Large emoji/icon center-left (the streak flame, league badge, level number, etc.) |
| Headline | Bold white text, 48-60px |
| User name | Medium white text, 24px |
| Secondary stat | Smaller white/semi-transparent text |
| Border | Subtle white/transparent inner border (matching certificate style) |

---

## 2. Share Utility Library

### New file: `src/lib/share-card.ts`

Centralized share logic, modeled after `src/lib/certificate.ts`:

```ts
import { APP_NAME, APP_URL } from '@/lib/constants';

// ─── Card types ───────────────────────────

export type ShareCardType = 'streak' | 'league' | 'level' | 'chapter' | 'achievement' | 'course';

export interface ShareCardParams {
  type: ShareCardType;
  userName: string;
  [key: string]: string | number | undefined;
}

// ─── URL builder ──────────────────────────

export function getShareCardUrl(params: ShareCardParams): string {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) sp.set(key, String(value));
  }
  return `/api/share-card?${sp.toString()}`;
}

// ─── Share text generators ────────────────

function getShareText(params: ShareCardParams): string {
  switch (params.type) {
    case 'streak':
      return `I just hit a ${params.days}-day streak on ${APP_NAME}! 🔥`;
    case 'league':
      return `I got promoted to the ${params.tier} League on ${APP_NAME}! 🏆`;
    case 'level':
      return `I reached Level ${params.level} on ${APP_NAME}! ⭐`;
    case 'chapter':
      return `I completed "${params.unitTitle}" on ${APP_NAME} with ${params.accuracy}% accuracy! 📚`;
    case 'achievement':
      return `I unlocked the "${params.name}" achievement on ${APP_NAME}! ${params.icon}`;
    case 'course':
      return `I completed the ${params.profession} course on ${APP_NAME} with a ${params.score}% readiness score! 🎓`;
    default:
      return `Check out my progress on ${APP_NAME}!`;
  }
}

// ─── Share with PNG file ──────────────────

export async function shareCard(params: ShareCardParams): Promise<void> {
  const url = getShareCardUrl(params);
  const text = getShareText(params);

  // Try Web Share API with file (same pattern as certificate.ts)
  if (navigator.canShare) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], `octokeen-${params.type}.png`, { type: 'image/png' });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ title: APP_NAME, text, files: [file] });
        return;
      }
    } catch {
      // Fall through to text-only share
    }
  }

  // Fallback: text-only share
  if (navigator.share) {
    try {
      await navigator.share({ title: APP_NAME, text, url: APP_URL });
      return;
    } catch {
      // Fall through to clipboard
    }
  }

  // Final fallback: copy text to clipboard
  try {
    await navigator.clipboard.writeText(`${text}\n${APP_URL}`);
  } catch {
    // Silent fail — nothing else to try
  }
}

// ─── Download PNG ─────────────────────────

export async function downloadShareCard(params: ShareCardParams): Promise<void> {
  const url = getShareCardUrl(params);
  const res = await fetch(url);
  const blob = await res.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `octokeen-${params.type}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}
```

---

## 3. Reusable Share Button Component

### New file: `src/components/ui/ShareButton.tsx`

A small, reusable button that handles the share action with loading state and success feedback.

```tsx
interface ShareButtonProps {
  params: ShareCardParams;
  /** Button style variant — matches celebration modal backgrounds */
  variant?: 'light' | 'dark';
  className?: string;
}
```

**Behavior:**
1. User taps "Share" button
2. Button shows a small spinner (200ms minimum to prevent flash)
3. Calls `shareCard(params)` from `src/lib/share-card.ts`
4. On success: button briefly shows a checkmark, then resets
5. On failure (user cancelled, no API): button resets silently

**Visual:**
- Icon: `<Share2 />` from lucide-react (already used in `InviteShare.tsx`)
- Text: "Share" (or just icon on small screens)
- Style: `bg-white/15 text-white rounded-xl px-4 py-2` (matches existing CourseCompleteCelebration button style)

---

## 4. Modifications to Each Celebration Modal

### 4a. `src/components/engagement/StreakMilestone.tsx`

**Current:** No share button. Shows badge, gem reward, and "Continue" button.

**Change:** Add a share button row above the footer `GameButton`:

```tsx
// In the footer prop of FullScreenModal:
<div className="space-y-3">
  <div className="flex justify-center">
    <ShareButton params={{
      type: 'streak',
      userName: displayName,
      days: milestone.days,
      badgeName: milestone.badgeName,
    }} />
  </div>
  <GameButton variant="gold" onClick={onClose}>Continue</GameButton>
</div>
```

**Additional change:** Add `displayName` to component props or read from `useStore`:
```tsx
const displayName = useStore((s) => s.progress.displayName) || 'Learner';
```

### 4b. `src/components/engagement/LeaguePromotion.tsx`

**Current:** No share button. Shows league badge, rank, gems earned.

**Change:** Add share button in footer (only when promoted — not for demotion or stay):

```tsx
// Inside footer, only when isPromoted:
{isPromoted && (
  <div className="flex justify-center mb-3">
    <ShareButton params={{
      type: 'league',
      userName: displayName,
      tier: currentTier.name,
      rank: result.rank,
    }} />
  </div>
)}
<GameButton variant={content.buttonVariant} onClick={setResultSeen}>Continue</GameButton>
```

### 4c. `src/components/engagement/LevelUpCelebration.tsx`

**Current:** No share button. Shows level badge, gem reward, and cosmetic unlocks.

**Change:** Add share button in footer:

```tsx
<div className="space-y-3">
  <div className="flex justify-center">
    <ShareButton params={{
      type: 'level',
      userName: displayName,
      level: reward.level,
      title: levelDef?.title,
    }} />
  </div>
  <GameButton variant={isMilestone ? 'goldDark' : 'indigo'} onClick={onClose}>
    Claim & Continue
  </GameButton>
</div>
```

### 4d. `src/components/engagement/BlueprintCelebration.tsx`

**Current:** No share button. Shows unit stats (lessons, accuracy, XP).

**Change:** Add share button in footer:

```tsx
<div className="space-y-3">
  <div className="flex justify-center">
    <ShareButton params={{
      type: 'chapter',
      userName: displayName,
      unitTitle: unitTitle,
      accuracy: chapterStats.accuracy,
      lessons: chapterStats.lessons,
    }} />
  </div>
  <GameButton variant="gold" onClick={handleDismiss}>CONTINUE</GameButton>
</div>
```

### 4e. `src/components/engagement/CourseCompleteCelebration.tsx`

**Current:** Already has Download, Share, LinkedIn buttons using `src/lib/certificate.ts`.

**Change:** No structural change needed. The existing implementation already covers this celebration type. Optionally, refactor to use the new `ShareButton` component for consistency, but this is NOT required — the current implementation works fine.

### 4f. Achievement Unlock Celebrations

**Discovery needed:** The current codebase checks achievements in `useStore.checkNewAchievements()` but there may not be a dedicated full-screen achievement celebration modal. If achievements are shown as toast notifications or inline UI:

**Option A (if no modal exists):** Create a new `AchievementCelebration.tsx` component with share button — follows the same `FullScreenModal` pattern.

**Option B (if shown as toast/banner):** Add a small share icon next to the achievement toast. On tap, calls `shareCard()` directly without a full-screen flow.

**Investigation step:** Search for where `checkNewAchievements` results are displayed. The share button goes wherever the achievement UI lives.

---

## 5. Share Card Visual Designs (Per Type)

### 5a. Streak Card

```
Background: linear-gradient(135deg, #FF9600, #E8850C)
Center: Large flame emoji (🔥) at 120px
Headline: "{days}-Day Streak!"
Subline: "{userName} • {badgeName}"
Bottom: "octokeen.com"
```

### 5b. League Promotion Card

```
Background: linear-gradient(135deg, tier.color, darken(tier.color))
Center: League tier emoji/icon at 120px
Headline: "Promoted to {tierName}!"
Subline: "{userName} • Rank #{rank}"
Bottom: "octokeen.com"
```

### 5c. Level Up Card

```
Background: linear-gradient(135deg, #5B4FCF, #3C4D6B)
Center: Level number in a circle badge at 100px
Headline: "Level {level}"
Subline: "{userName} • {title}"
Bottom: "octokeen.com"
```

### 5d. Chapter Complete Card

```
Background: linear-gradient(135deg, #58A700, #4A8F00)
Center: Checkmark badge at 100px
Headline: "{unitTitle}"
Stats row: "{lessons} Lessons • {accuracy}% Accuracy"
Subline: "{userName}"
Bottom: "octokeen.com"
```

### 5e. Achievement Card

```
Background: linear-gradient(135deg, category-color, darken)
Center: Achievement icon/emoji at 100px
Headline: "{achievementName}"
Subline: "{userName} • {category}"
Bottom: "octokeen.com"
```

### 5f. Course Complete Card

**Already exists** at `/api/certificate`. The existing certificate design is used for this type. The `share-card` route can redirect to `/api/certificate` for `type=course`, or duplicate the design. Recommendation: redirect to keep one source of truth.

---

## 6. Edge Cases

| Case | Handling |
|------|----------|
| Browser doesn't support Web Share API | Falls through to `navigator.clipboard.writeText()`. User sees a "Copied!" toast instead of native share sheet. |
| Browser doesn't support `navigator.canShare` with files | Falls through to text-only share, then clipboard. |
| Mobile Safari share sheet | Works — `navigator.share({ files: [...] })` is supported in Safari 15+. Older versions get text-only. |
| Desktop browsers | Most desktop browsers don't support Web Share API. Falls through to clipboard copy. Consider adding explicit "Copy Image" button as well. |
| Share card API fails (network error) | `shareCard()` catches fetch errors and falls through to text-only share. |
| User cancels share sheet | `navigator.share()` throws `AbortError` — silently caught, button resets. |
| Share button on demotion/stay in league | Only show share button for promotions — nobody wants to share a demotion. |
| User has no display name set | Default to "Learner" (already handled in each celebration component). |
| Slow image generation | ShareButton shows loading spinner. The `next/og` ImageResponse is fast (~100-200ms on Edge) but spinner provides feedback. |
| Accessibility | ShareButton has `aria-label="Share your achievement"`. Loading state uses `aria-busy`. |

---

## 7. Testing Strategy

### Unit tests (Vitest):

1. **`src/__tests__/lib/share-card.test.ts`**
   - `getShareCardUrl()` builds correct URL for each card type
   - `getShareText()` returns appropriate text for each type (private function — test via module export or test `shareCard` behavior)
   - All required params produce valid URLs (no undefined in query string)

2. **`src/__tests__/critical/share-card-api.test.ts`**
   - Each card type returns 200 status from the API route
   - Response content-type is `image/png`
   - Invalid `type` param returns 400
   - Missing required params return sensible defaults (not crash)

### Manual testing checklist:

- [ ] Streak milestone: share button appears, generates correct card
- [ ] League promotion: share button appears only on promotion
- [ ] Level up: share button appears, shows correct level and title
- [ ] Chapter complete: share button appears with correct stats
- [ ] Course complete: existing share flow still works
- [ ] Mobile: Web Share API opens native share sheet with PNG
- [ ] Desktop: falls back to clipboard, shows "Copied" feedback
- [ ] Offline/error: graceful degradation to text share

---

## 8. Implementation Order

| Step | Task | Files | Depends On |
|------|------|-------|------------|
| 1 | Create share card API route with all 6 card type renderers | `src/app/api/share-card/route.tsx` | — |
| 2 | Create share utility library | `src/lib/share-card.ts` | Step 1 |
| 3 | Create `ShareButton` component | `src/components/ui/ShareButton.tsx` | Step 2 |
| 4 | Add ShareButton to `StreakMilestone.tsx` | `src/components/engagement/StreakMilestone.tsx` | Step 3 |
| 5 | Add ShareButton to `LeaguePromotion.tsx` | `src/components/engagement/LeaguePromotion.tsx` | Step 3 |
| 6 | Add ShareButton to `LevelUpCelebration.tsx` | `src/components/engagement/LevelUpCelebration.tsx` | Step 3 |
| 7 | Add ShareButton to `BlueprintCelebration.tsx` | `src/components/engagement/BlueprintCelebration.tsx` | Step 3 |
| 8 | Investigate achievement celebration UI and add share | Find achievement display location | Step 3 |
| 9 | Write unit tests for share-card lib | `src/__tests__/lib/share-card.test.ts` | Steps 1, 2 |
| 10 | Write API route tests | `src/__tests__/critical/share-card-api.test.ts` | Step 1 |
| 11 | Add ShareButton to `modal-gallery.html` | `modal-gallery.html` | Step 3 |
| 12 | Manual QA across mobile/desktop | — | Steps 4-8 |

---

## 9. Interaction with Existing Systems

| System | Interaction |
|--------|-------------|
| **Certificate API** (`/api/certificate`) | Not modified. `type=course` in share-card route can redirect to certificate API, or the existing CourseCompleteCelebration continues using `src/lib/certificate.ts` directly. |
| **InviteShare pattern** | Reused: same `navigator.share` → `navigator.clipboard` fallback chain. New code in `src/lib/share-card.ts` follows identical pattern. |
| **FullScreenModal** | Not modified. Share buttons are added to the `footer` prop of existing celebrations. |
| **Zustand stores** | Read-only: `useStore` for `displayName`, `useEngagementStore` for league/streak data. No new state needed. |
| **DB sync** | No new sync needed — sharing is stateless (no tracking of what was shared). |
| **Mixpanel analytics** | Optional: fire `track('share_card', { type, ... })` when share is initiated. Uses existing `mixpanel.ts` wrapper. |
| **CSP headers** | `/api/share-card` is a same-origin route — no CSP changes needed. |
| **Offline** | If offline, `fetch('/api/share-card')` fails. Falls through to text-only share or clipboard. Works gracefully. |

---

## 10. What This Plan Does NOT Include

- **No social media deep links** beyond the existing LinkedIn share in CourseCompleteCelebration. Adding Twitter/Instagram/Facebook share buttons is a separate effort.
- **No share analytics dashboard** — just Mixpanel events. A dedicated "virality" dashboard is a separate feature.
- **No share preview/edit screen** — the card is auto-generated, not customizable. User taps "Share" and gets the native sheet immediately.
- **No mascot on share cards** — the mascot is a PNG and cannot be easily embedded in `ImageResponse` JSX (which uses Satori, no `<img>` support for local files). If mascot embedding is desired, the mascot SVG would need to be inlined. This is a polish item for later.
- **No "share to feed" social feature** — this is about sharing to external platforms, not an internal activity feed.

---

## Critic Resolutions

The following issues were identified during critical review and are now resolved in this plan.

### CR-1 [CRITICAL] `displayName` source is unreliable across stores

**Issue:** The plan reads `useStore((s) => s.progress.displayName)` in `StreakMilestone.tsx`. But `displayName` may be empty in the practice store if the user only does course lessons or registered with Google OAuth (where `displayName` is set on the course store at registration). `useStore.progress.displayName` defaults to `'Engineer'` (hardcoded default), which is not the user's actual name.

**Resolution:** Create a shared utility that provides a reliable display name with fallback chain:

```typescript
// In src/lib/utils.ts (or a new src/lib/user-utils.ts):
export function getDisplayName(): string {
  // Priority: 1) Course store (set at registration)
  //           2) Practice store
  //           3) Fallback
  const courseDisplayName = useCourseStore.getState().progress.displayName;
  const practiceDisplayName = useStore.getState().progress.displayName;

  // 'Engineer' is the hardcoded default in useStore — skip it
  if (courseDisplayName && courseDisplayName !== 'Engineer') return courseDisplayName;
  if (practiceDisplayName && practiceDisplayName !== 'Engineer') return practiceDisplayName;
  return 'Learner';
}
```

Use this in all celebration components instead of reading directly from a single store:
```typescript
const displayName = getDisplayName();
```

Note: This is a pure function reading from Zustand stores (not a hook), so it can be called from any context including event handlers and non-React code.

### CR-2 [IMPORTANT] Share card API route lacks authentication

**Issue:** `GET /api/share-card?userName=...` takes `userName` as a query parameter. Anyone can generate cards with any text, enabling impersonation or abuse.

**Resolution:** Accept the risk for MVP — this is consistent with the existing `/api/certificate` route which has the same pattern. The generated image clearly shows "octokeen.com" branding and is not an official credential. The `userName` is just text on a card, not a verified identity.

For future hardening (not MVP): read `userName` from the authenticated session instead of query params. Add rate limiting via the existing `rate-limit.ts` pattern.

### CR-3 [IMPORTANT] Achievement celebration UI needs investigation

**Issue:** The plan says "Investigation step: Search for where `checkNewAchievements` results are displayed" without actually investigating.

**Resolution:** Achievement unlocks are handled in the session/lesson completion flow. `checkNewAchievements()` returns newly unlocked achievements. The results are displayed in the `ResultScreen.tsx` component as part of the lesson result (achievements section). There is NO dedicated full-screen `AchievementCelebration` modal.

**Decision:** Use Option B — add a share icon next to each newly unlocked achievement in the `ResultScreen`. When the user taps the share icon, call `shareCard()` directly:

```tsx
// In ResultScreen.tsx, in the achievements section:
{newAchievements.map((achievement) => (
  <div key={achievement.id} className="flex items-center gap-3">
    <span className="text-2xl">{achievement.icon}</span>
    <div className="flex-1">
      <p className="font-bold">{achievement.name}</p>
      <p className="text-xs text-white/60">{achievement.description}</p>
    </div>
    <ShareButton
      params={{
        type: 'achievement',
        userName: getDisplayName(),
        name: achievement.name,
        icon: achievement.icon,
        category: achievement.category,
      }}
      variant="dark"
    />
  </div>
))}
```

This avoids creating a new modal and integrates naturally with the existing flow.

### CR-4 [IMPORTANT] No Satori `<img>` support for mascot in share cards

**Issue:** Satori (used by `next/og`) doesn't support local `<img>` tags. Share cards without the mascot look generic.

**Resolution:** For MVP, proceed without the mascot. The share cards use large emoji icons which are distinctive enough. For future polish: the mascot PNGs can be served from a public URL and fetched within the `ImageResponse` handler via `fetch()`. Satori supports `<img>` with `src` set to a URL or base64 data URI:

```tsx
// Future enhancement:
const mascotUrl = `${process.env.NEXT_PUBLIC_APP_URL}/mascot/celebrating.png`;
const mascotData = await fetch(mascotUrl).then(r => r.arrayBuffer());
// Use in ImageResponse JSX:
<img src={mascotUrl} width={80} height={80} />
```

### CR-5 [MINOR] Clipboard fallback doesn't show user feedback

**Issue:** When `navigator.clipboard.writeText` is used as the last fallback, the user gets no visual feedback.

**Resolution:** Change `shareCard()` to return a status:

```typescript
export async function shareCard(params: ShareCardParams): Promise<'shared' | 'copied' | 'failed'> {
  // ... Web Share API attempt ...
  // ... text-only share attempt ...

  // Final fallback: clipboard
  try {
    await navigator.clipboard.writeText(`${text}\n${APP_URL}`);
    return 'copied';
  } catch {
    return 'failed';
  }
}
```

Update `ShareButton` to show feedback:
```tsx
const handleShare = async () => {
  setLoading(true);
  const result = await shareCard(params);
  setLoading(false);

  if (result === 'copied') {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};

// In render:
{copied ? (
  <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Copied!</span>
) : (
  <span className="flex items-center gap-1"><Share2 className="w-4 h-4" /> Share</span>
)}
```

### CR-6 [MINOR] Desktop users can't download the share card image

**Issue:** Desktop browsers mostly don't support Web Share API. Users just get text copied, with no way to see or download the card image.

**Resolution:** Add a "Download" button alongside "Share" on desktop. Use the existing `downloadShareCard()` function from `src/lib/share-card.ts`:

```tsx
// In ShareButton.tsx:
const isDesktop = typeof window !== 'undefined' && !('ontouchstart' in window);

return (
  <div className="flex gap-2">
    <button onClick={handleShare}>
      <Share2 className="w-4 h-4" /> Share
    </button>
    {isDesktop && (
      <button onClick={() => downloadShareCard(params)}>
        <Download className="w-4 h-4" /> Download
      </button>
    )}
  </div>
);
```

### CR-7 [CROSS-CUTTING] Mixpanel analytics for share events

**Resolution:** Fire analytics events in `ShareButton`:

```typescript
trackEvent('share_card_initiated', { type: params.type });
// After result:
trackEvent('share_card_result', { type: params.type, result }); // 'shared' | 'copied' | 'failed'
```
