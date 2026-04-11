# Plan: Shareable Certificates & LinkedIn Integration (Gap 8)

> **Author:** Planner Agent | **Date:** 2026-04-07 | **Status:** Ready for implementation
>
> **Estimated effort:** ~8 hours | **Risk:** Low (builds on proven patterns already in codebase)

---

## 0. Current State Assessment

**Contrary to the gap analysis statement ("No certificate generation exists"), a substantial certificate system is already in place.** This plan documents what exists, identifies concrete remaining gaps, and proposes targeted improvements rather than a ground-up build.

### Already implemented

| Feature | Location | Status |
|---------|----------|--------|
| Certificate PNG generation (1200x630) | `src/app/api/certificate/route.tsx` | Working, Edge runtime, `ImageResponse` from `next/og` |
| Certificate URL builder | `src/lib/certificate.ts` `getCertificateUrl()` | Working |
| Download certificate as PNG | `src/lib/certificate.ts` `downloadCertificate()` | Working |
| Share via Web Share API (with image file) | `src/lib/certificate.ts` `shareCertificate()` | Working, with text-only and download fallbacks |
| LinkedIn share URL builder | `src/lib/certificate.ts` `getLinkedInShareUrl()` | Working |
| Download + Share + LinkedIn buttons on course completion | `src/components/engagement/CourseCompleteCelebration.tsx` | Working |
| "Share Score" button on Skills page readiness ring | `src/app/(app)/skills/page.tsx` lines 211-229 | Working, calls `shareCertificate()` |

### Remaining gaps (this plan addresses)

1. **Certificate design is minimal** — no mascot, no decorative elements, no certificate ID, generic layout
2. **No authentication** — anyone can generate certificates with arbitrary names via query params
3. **No caching** — each certificate request re-renders the full image
4. **No certificate persistence** — no DB record, no verifiable certificate ID, no certificate history page
5. **LinkedIn URL uses deprecated `summary` parameter** — the `share-offsite` endpoint only accepts `url`
6. **No fallback feedback** — when Web Share API is unavailable, the download fallback gives no visual feedback to the user
7. **Skills page "Share Score" has no LinkedIn button** — only the generic `shareCertificate()` call
8. **Name truncation** — very long display names overflow the certificate layout

---

## 1. Certificate Design Improvements

### 1.1 Enhanced certificate layout

Upgrade `src/app/api/certificate/route.tsx` to a richer design. The current route uses `ImageResponse` from `next/og` with Satori rendering, which works well and should be kept.

**New layout (1200x630):**

```
+------------------------------------------------------------------+
|                                                                    |
|  [decorative corner flourish]        [decorative corner flourish]  |
|                                                                    |
|           [profession icon]  CERTIFICATE OF COMPLETION             |
|           ──────────────────────────────────                       |
|                                                                    |
|                    [user display name]                             |
|                   has successfully completed                       |
|                                                                    |
|              ┌─────────────────────────────┐                       |
|              │   [profession course name]  │                       |
|              └─────────────────────────────┘                       |
|                                                                    |
|       Readiness Score         Course Progress                      |
|           87%                    100%                               |
|                                                                    |
|     [date]    ·    Octokeen    ·    ID: OKC-A1B2C3                 |
|                                                                    |
|  [decorative corner flourish]        [decorative corner flourish]  |
+------------------------------------------------------------------+
```

**Specific design changes:**

1. **Decorative corner flourishes** — Four L-shaped corner accents using the profession color at 30% opacity. Implemented as absolutely positioned `<div>` elements with border-left/border-top combinations. No images needed (Satori doesn't support local images without base64).

2. **Certificate ID** — A short, deterministic ID derived from user name + profession + date. Format: `OKC-XXXXXX` (6 uppercase alphanumeric characters). Generated via simple hash, not cryptographically secure (it's decorative, not a proof of completion).

3. **Mascot** — Satori supports `<img>` with `src` as an absolute URL or base64 data URI. The mascot PNG at `/mascot/celebrating.png` can be fetched within the route handler and converted to base64:

```tsx
// Inside the GET handler, before returning ImageResponse:
const mascotUrl = new URL('/mascot/celebrating.png', req.nextUrl.origin);
const mascotRes = await fetch(mascotUrl);
const mascotBuffer = await mascotRes.arrayBuffer();
const mascotBase64 = `data:image/png;base64,${Buffer.from(mascotBuffer).toString('base64')}`;
```

Then use in JSX: `<img src={mascotBase64} width={80} height={80} />` positioned in the top-right area.

**Important:** This fetch adds latency (~50-100ms). Acceptable since certificates are infrequent and the result will be cached (see section 4). If the fetch fails (e.g., during build), omit the mascot gracefully with a try-catch.

4. **Name handling** — Truncate names longer than 30 characters with ellipsis. Reduce font size from 52px to 40px when name exceeds 20 characters.

```tsx
const truncatedName = name.length > 30 ? name.slice(0, 27) + '...' : name;
const nameFontSize = name.length > 20 ? 40 : 52;
```

### 1.2 Profession-themed color mapping

The current implementation already accepts a `color` query param from the profession's `color` field. This is correct. The profession colors from `src/data/professions.ts`:

| Profession | Color | Icon |
|------------|-------|------|
| Mechanical Engineering | `#3B82F6` (blue) | gear |
| Personal Finance | `#10B981` (emerald) | moneybag |
| Psychology | `#A78BFA` (violet) | brain |
| Space & Astronomy | `#818CF8` (indigo) | rocket |

The background gradient already uses the profession color. No change needed here — the existing `background: linear-gradient(145deg, ${color}15 0%, #ffffff 30%, #ffffff 70%, ${color}10 100%)` pattern works well.

### 1.3 Certificate ID generation

Add a deterministic certificate ID function to `src/lib/certificate.ts`:

```ts
/**
 * Generate a short deterministic certificate ID from user + profession + date.
 * Format: OKC-XXXXXX (6 uppercase alphanumeric chars).
 * NOT cryptographically secure — decorative only.
 */
export function generateCertificateId(name: string, profession: string, date: string): string {
  const input = `${name}:${profession}:${date}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No 0/O/1/I confusion
  let id = '';
  let h = Math.abs(hash);
  for (let i = 0; i < 6; i++) {
    id += chars[h % chars.length];
    h = Math.floor(h / chars.length);
  }
  return `OKC-${id}`;
}
```

Pass the certificate ID as a new query parameter from the client, or compute it server-side in the route handler from the existing name/profession/date params.

**Decision: compute server-side.** This avoids adding a new query param and ensures consistency.

---

## 2. Authentication & Validation

### 2.1 Problem

The current `GET /api/certificate` endpoint reads all data from query parameters with no authentication. Anyone can generate `GET /api/certificate?name=Elon%20Musk&profession=...` and produce a fake certificate.

### 2.2 Recommended approach: Accept the risk (no auth change)

**Rationale:**
- The certificate is clearly branded "Octokeen" — impersonation risk is minimal for an EdTech platform
- Adding auth would break the "Share Score" flow on the Skills page, which currently constructs the URL client-side and passes it to `navigator.share()`
- The Web Share API with file needs to `fetch()` the URL — adding auth headers to this flow adds complexity for minimal security benefit
- The `/api/certificate` route runs on Edge, where NextAuth session cookies may not be easily accessible without additional configuration
- Rate limiting is more appropriate than auth for abuse prevention

### 2.3 Rate limiting (optional, low priority)

If abuse becomes an issue, add a simple rate limiter using the request IP:

```tsx
// At top of GET handler:
const ip = req.headers.get('x-forwarded-for') || 'unknown';
// Use Vercel's Edge Config or a simple in-memory Map with TTL
// Limit: 20 certificate renders per IP per minute
```

This is NOT required for launch — only if abuse is observed. Note it in the code as a TODO comment.

---

## 3. LinkedIn Integration Fix

### 3.1 Problem

The current `getLinkedInShareUrl()` in `src/lib/certificate.ts`:

```ts
export function getLinkedInShareUrl(params: CertificateParams, appUrl: string): string {
  const text = `I just completed the ${params.profession} course on ${APP_NAME} with a ${Math.round(params.score)}% readiness score! ...\n\n${appUrl}`;
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}&summary=${encodeURIComponent(text)}`;
}
```

The `summary` parameter is **not supported** by the `share-offsite` endpoint. LinkedIn's share URL only accepts `url` — the shared content preview is pulled from the target page's Open Graph tags, not from the `summary` parameter.

### 3.2 Fix

**Option A (simple):** Remove the `summary` param and just use `url`:

```ts
export function getLinkedInShareUrl(params: CertificateParams, appUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;
}
```

The `appUrl` should point to a page with OG tags that include the certificate image. Currently `appUrl` is `window.location.origin` (the home page), whose OG image is the generic Octokeen branding — NOT the user's certificate.

**Option B (better):** Create a shareable certificate page that has dynamic OG tags.

### 3.3 Shareable certificate page (Option B — recommended)

Create `src/app/certificate/page.tsx` — a lightweight public page that:
1. Reads certificate params from the URL search params
2. Sets dynamic OG meta tags pointing to `/api/certificate?...` as the `og:image`
3. Renders a minimal page showing the certificate with download/share buttons

**Route:** `src/app/certificate/page.tsx`

```tsx
// This is a Server Component (no 'use client')
import type { Metadata } from 'next';
import { APP_NAME, APP_URL } from '@/lib/constants';
import { CertificatePageClient } from './CertificatePageClient';

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const name = sp.name || 'Learner';
  const profession = sp.profession || 'Course';
  const score = sp.score || '0';

  const certUrl = new URL('/api/certificate', APP_URL);
  for (const [k, v] of Object.entries(sp)) {
    if (v) certUrl.searchParams.set(k, v);
  }

  return {
    title: `${name}'s ${profession} Certificate — ${APP_NAME}`,
    description: `${name} completed the ${profession} course on ${APP_NAME} with a ${score}% readiness score.`,
    openGraph: {
      title: `${name}'s ${profession} Certificate`,
      description: `${name} completed the ${profession} course with a ${score}% readiness score.`,
      images: [{ url: certUrl.toString(), width: 1200, height: 630, alt: `${APP_NAME} Certificate` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name}'s ${profession} Certificate`,
      description: `${name} completed the ${profession} course with a ${score}% readiness score.`,
      images: [certUrl.toString()],
    },
  };
}

export default async function CertificatePage({ searchParams }: Props) {
  const sp = await searchParams;
  return <CertificatePageClient params={sp} />;
}
```

**Client component:** `src/app/certificate/CertificatePageClient.tsx`

A simple page that displays the certificate image (as an `<img>` pointing to `/api/certificate?...`) and provides Download / Share / LinkedIn buttons.

This page serves two purposes:
1. **LinkedIn preview** — When shared on LinkedIn, the crawler reads the OG tags and shows the certificate image as a rich preview card.
2. **Shareable link** — Anyone who receives the link sees the certificate rendered on a branded page.

### 3.4 Updated LinkedIn share URL builder

```ts
export function getLinkedInShareUrl(params: CertificateParams, appUrl: string): string {
  const certPageUrl = new URL('/certificate', appUrl);
  certPageUrl.searchParams.set('name', params.name);
  certPageUrl.searchParams.set('profession', params.profession);
  certPageUrl.searchParams.set('professionIcon', params.professionIcon);
  certPageUrl.searchParams.set('color', params.color);
  certPageUrl.searchParams.set('score', String(Math.round(params.score)));
  if (params.date) certPageUrl.searchParams.set('date', params.date);

  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certPageUrl.toString())}`;
}
```

Now when a user clicks "LinkedIn", the shared URL points to `/certificate?name=...&profession=...` which has OG tags with the certificate image. LinkedIn's crawler renders a rich card.

---

## 4. Caching Strategy

### 4.1 Edge caching for certificate images

Add cache headers to the `/api/certificate` route response:

```tsx
export async function GET(req: NextRequest) {
  // ... existing param parsing ...

  const imageResponse = new ImageResponse(/* ... JSX ... */, { ...SIZE });

  // Cache for 1 hour at edge, stale-while-revalidate for 24 hours
  // Certificates are deterministic (same params = same image), so caching is safe
  imageResponse.headers.set(
    'Cache-Control',
    'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
  );

  return imageResponse;
}
```

**Why these values:**
- `max-age=3600` — Browser caches for 1 hour (handles repeated Share taps)
- `s-maxage=3600` — CDN/Edge caches for 1 hour
- `stale-while-revalidate=86400` — Serve stale for 24h while revalidating in background

Certificates don't change after generation (same params always produce the same image), so aggressive caching is safe. If the user's name or score changes, the URL params change, busting the cache automatically.

### 4.2 Certificate page caching

The `/certificate` page itself should NOT be cached aggressively because it serves personalized content. The default Next.js dynamic rendering behavior is correct here. The OG image URL (pointing to `/api/certificate`) benefits from edge caching.

---

## 5. Share Utility Improvements

### 5.1 Share result feedback

The current `shareCertificate()` function returns `Promise<void>` — callers cannot distinguish between "shared successfully", "user cancelled", or "fell back to download". This matters for UI feedback.

**Change return type in `src/lib/certificate.ts`:**

```ts
export type ShareResult = 'shared' | 'copied' | 'downloaded' | 'cancelled';

export async function shareCertificate(params: CertificateParams): Promise<ShareResult> {
  const url = getCertificateUrl(params);

  // Try Web Share API with file
  if (navigator.canShare) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], 'certificate.png', { type: 'image/png' });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${APP_NAME} Certificate`,
          text: `I completed the ${params.profession} course on ${APP_NAME} with a ${Math.round(params.score)}% readiness score!`,
          files: [file],
        });
        return 'shared';
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled';
      // Fall through to text-only share
    }
  }

  // Fallback: text-only share
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${APP_NAME} Certificate`,
        text: `I completed the ${params.profession} course on ${APP_NAME} with a ${Math.round(params.score)}% readiness score!`,
      });
      return 'shared';
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled';
      // Fall through to download
    }
  }

  // Final fallback: download
  await downloadCertificate(params);
  return 'downloaded';
}
```

### 5.2 Skills page "Share Score" LinkedIn button

The Skills page currently only has a generic "Share Score" button calling `shareCertificate()`. Add a LinkedIn button next to it.

**File:** `src/app/(app)/skills/page.tsx`

**Current (lines 211-229):**
```tsx
{readiness > 0 && (
  <button onClick={() => shareCertificate({...})} ...>
    <Share2 /> Share Score
  </button>
)}
```

**New:**
```tsx
{readiness > 0 && (
  <div className="mt-4 flex items-center gap-2">
    <button
      onClick={async () => {
        const result = await shareCertificate(certParams);
        // Optionally show toast on 'downloaded' result
      }}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
      style={{
        background: `${ringColor}15`,
        color: ringColor,
        border: `1.5px solid ${ringColor}30`,
      }}
    >
      <Share2 style={{ width: 14, height: 14 }} /> Share
    </button>
    <button
      onClick={() => {
        const url = getLinkedInShareUrl(certParams, window.location.origin);
        window.open(url, '_blank', 'noopener,noreferrer');
      }}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors bg-[#0A66C2] text-white hover:bg-[#004182]"
    >
      <Linkedin style={{ width: 14, height: 14 }} /> LinkedIn
    </button>
    <button
      onClick={() => downloadCertificate(certParams)}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
      style={{
        background: `${ringColor}15`,
        color: ringColor,
        border: `1.5px solid ${ringColor}30`,
      }}
    >
      <Download style={{ width: 14, height: 14 }} /> Download
    </button>
  </div>
)}
```

**New imports needed:** `Download`, `Linkedin` from `lucide-react`; `getLinkedInShareUrl`, `downloadCertificate` from `@/lib/certificate`.

The `certParams` object must be constructed in the component. Add this before the return statement:

```tsx
const certParams = {
  name: displayName || 'Learner',
  profession: profession?.name || 'Course',
  professionIcon: profession?.icon || '🎓',
  color: profession?.color || '#6366f1',
  score: readiness,
};
```

Note: `displayName` is already read at line 42, and `profession` at line 43.

---

## 6. CourseCompleteCelebration Improvements

### 6.1 Share feedback states

The existing `CourseCompleteCelebration.tsx` (lines 72-91) has Download/Share/LinkedIn buttons but no loading or success states. When the user taps "Share", there's a delay while the certificate image is fetched — the button should show a spinner.

**Add state tracking:**

```tsx
const [shareState, setShareState] = useState<'idle' | 'loading' | 'done'>('idle');

const handleShare = useCallback(async () => {
  setShareState('loading');
  try {
    const result = await shareCertificate(certParams);
    if (result !== 'cancelled') {
      setShareState('done');
      setTimeout(() => setShareState('idle'), 2000);
    } else {
      setShareState('idle');
    }
  } catch {
    setShareState('idle');
  }
}, [certParams]);
```

**Button visual:**
```tsx
<button onClick={handleShare} disabled={shareState === 'loading'} ...>
  {shareState === 'loading' && <LoadingSpinner size={14} />}
  {shareState === 'done' && <Check className="w-3.5 h-3.5" />}
  {shareState === 'idle' && <Share2 className="w-3.5 h-3.5" />}
  {shareState === 'done' ? 'Shared!' : 'Share'}
</button>
```

Import `Check` from `lucide-react` (already available in the project).

### 6.2 Certificate preview

Show a small preview of the certificate image in the celebration modal, above the action buttons. This gives users a sense of what they're sharing before they tap "Share".

```tsx
// Inside the footer section, above the button row:
<div className="mb-3 rounded-xl overflow-hidden border-2 border-white/20 mx-auto" style={{ maxWidth: 320 }}>
  <img
    src={getCertificateUrl(certParams)}
    alt="Your certificate"
    className="w-full h-auto"
    loading="eager"
  />
</div>
```

Note: This fetches the certificate image inside the modal. Since the modal appears after completing an entire course (rare, high-impact moment), the extra network request is acceptable. The image will also warm the edge cache for subsequent share/download actions.

---

## 7. Shareable Certificate Page

### 7.1 Files to create

| File | Purpose |
|------|---------|
| `src/app/certificate/page.tsx` | Server component with dynamic OG metadata |
| `src/app/certificate/CertificatePageClient.tsx` | Client component with certificate display and action buttons |

### 7.2 CertificatePageClient implementation

```tsx
'use client';

import { useState, useMemo } from 'react';
import { Download, Share2, Linkedin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getCertificateUrl, shareCertificate, downloadCertificate, getLinkedInShareUrl } from '@/lib/certificate';
import { APP_NAME } from '@/lib/constants';
import { generateCertificateId } from '@/lib/certificate';

interface Props {
  params: { [key: string]: string | undefined };
}

export function CertificatePageClient({ params }: Props) {
  const certParams = useMemo(() => ({
    name: params.name || 'Learner',
    profession: params.profession || 'Course',
    professionIcon: params.professionIcon || '🎓',
    color: params.color || '#6366f1',
    score: Number(params.score) || 0,
    date: params.date,
  }), [params]);

  const certUrl = getCertificateUrl(certParams);
  const certId = generateCertificateId(certParams.name, certParams.profession, certParams.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));

  const [shareState, setShareState] = useState<'idle' | 'loading' | 'done'>('idle');

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to {APP_NAME}
        </Link>

        {/* Certificate image */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-6">
          <img src={certUrl} alt={`${certParams.name}'s ${certParams.profession} certificate`} className="w-full h-auto" />
        </div>

        {/* Certificate ID */}
        <p className="text-center text-xs font-mono text-gray-400 mb-4">Certificate {certId}</p>

        {/* Action buttons */}
        <div className="flex justify-center gap-3">
          <button onClick={() => downloadCertificate(certParams)} className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Download
          </button>
          <button
            onClick={async () => {
              setShareState('loading');
              const result = await shareCertificate(certParams);
              setShareState(result !== 'cancelled' ? 'done' : 'idle');
              if (result !== 'cancelled') setTimeout(() => setShareState('idle'), 2000);
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors"
            style={{ background: certParams.color }}
          >
            <Share2 className="w-4 h-4" /> {shareState === 'done' ? 'Shared!' : 'Share'}
          </button>
          <button
            onClick={() => {
              const url = getLinkedInShareUrl(certParams, window.location.origin);
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 7.3 Middleware consideration

The `/certificate` page must be accessible WITHOUT authentication — it's a public shareable page. Check `src/middleware.ts` to ensure `/certificate` is NOT in the `authRequiredPrefixes` array. Since the route is under `src/app/certificate/` (not `src/app/(app)/certificate/`), it should be outside the auth-protected layout. Verify this.

---

## 8. Edge Cases

### 8.1 User with no display name

Both `CourseCompleteCelebration` (line 24) and Skills page (line 42) already handle this:
```tsx
const displayName = useStore((s) => s.progress.displayName);
// Used as: displayName || 'Learner'
```

The `'Learner'` fallback is fine. The certificate route also defaults: `const name = searchParams.get('name') || 'Learner';`

**Cross-store concern (from critique section 4.1):** The `displayName` in `useStore.progress` may be stale if the user registered via Google OAuth and only does course lessons. However, both `CourseCompleteCelebration` and the Skills page already read from `useStore`, and this is consistent. A future improvement could create a `getDisplayName()` utility that checks `useStore`, `useCourseStore`, and the NextAuth session, but this is out of scope for this plan.

### 8.2 Very long names

Handled by truncation logic in section 1.1. Names over 30 characters get ellipsis; names over 20 characters get smaller font.

### 8.3 Web Share API not supported (desktop browsers)

Current fallback chain in `shareCertificate()`:
1. `navigator.canShare` with file (mobile Chrome, Safari) -> native share sheet with PNG
2. `navigator.share` text-only (some desktop browsers) -> share dialog without image
3. `downloadCertificate()` -> downloads PNG file directly

This is a good fallback chain. The improvement (section 5.1) adds return values so the UI can show "Downloaded!" when the download fallback fires, instead of the user seeing nothing happen.

### 8.4 Mobile vs desktop share UX

- **Mobile:** Web Share API typically available. Share sheet includes WhatsApp, Messages, etc. with the certificate image attached as a file.
- **Desktop:** Most browsers lack Web Share API. Falls through to download. The Download button is always visible alongside Share, so desktop users have a clear primary action.

No additional work needed here — the existing pattern handles this well.

### 8.5 Certificate image fetch failure

If the `fetch()` to `/api/certificate` fails inside `shareCertificate()`, the try-catch falls through to text-only share, then to download. If the download also fails, the function returns silently. Add a console.warn for debugging:

```ts
} catch (e) {
  console.warn('[certificate] Image fetch failed, falling back:', e);
  // Fall through
}
```

### 8.6 Special characters in query params

Profession names with `&` (e.g., "Psychology & Human Behavior") are URL-encoded by `URLSearchParams`. The certificate route decodes them via `searchParams.get()`. This works correctly — no fix needed.

---

## 9. Mixpanel Analytics

Track certificate interactions for measuring feature effectiveness:

```ts
// In CourseCompleteCelebration and Skills page:
analytics.track('certificate_action', {
  action: 'download' | 'share' | 'linkedin',
  profession: certParams.profession,
  score: certParams.score,
  source: 'course_complete' | 'skills_page',
  share_result: 'shared' | 'copied' | 'downloaded' | 'cancelled', // for share action
});
```

Add these calls in the click handlers. The `analytics` import is already available in the home page (`src/app/(app)/page.tsx` line 13).

For the Skills page, add `import { analytics } from '@/lib/mixpanel';` if not already present.

---

## 10. Testing Strategy

### 10.1 Unit tests

**File:** `src/__tests__/lib/certificate.test.ts`

```ts
import { getCertificateUrl, generateCertificateId, getLinkedInShareUrl } from '@/lib/certificate';

describe('getCertificateUrl', () => {
  it('builds correct URL with all params', () => {
    const url = getCertificateUrl({
      name: 'Alice',
      profession: 'Personal Finance',
      professionIcon: '💰',
      color: '#10B981',
      score: 87,
    });
    expect(url).toContain('/api/certificate?');
    expect(url).toContain('name=Alice');
    expect(url).toContain('score=87');
  });

  it('handles special characters in profession name', () => {
    const url = getCertificateUrl({
      name: 'Bob',
      profession: 'Psychology & Human Behavior',
      professionIcon: '🧠',
      color: '#A78BFA',
      score: 45,
    });
    expect(url).toContain('Psychology+%26+Human+Behavior');
  });
});

describe('generateCertificateId', () => {
  it('returns OKC-XXXXXX format', () => {
    const id = generateCertificateId('Alice', 'Finance', '2026-04-07');
    expect(id).toMatch(/^OKC-[A-Z2-9]{6}$/);
  });

  it('is deterministic for same inputs', () => {
    const id1 = generateCertificateId('Alice', 'Finance', '2026-04-07');
    const id2 = generateCertificateId('Alice', 'Finance', '2026-04-07');
    expect(id1).toBe(id2);
  });

  it('differs for different inputs', () => {
    const id1 = generateCertificateId('Alice', 'Finance', '2026-04-07');
    const id2 = generateCertificateId('Bob', 'Finance', '2026-04-07');
    expect(id1).not.toBe(id2);
  });
});

describe('getLinkedInShareUrl', () => {
  it('points to /certificate page, not api route', () => {
    const url = getLinkedInShareUrl(
      { name: 'Alice', profession: 'Finance', professionIcon: '💰', color: '#10B981', score: 87 },
      'https://octokeen.com'
    );
    expect(url).toContain('linkedin.com/sharing/share-offsite');
    expect(url).toContain(encodeURIComponent('https://octokeen.com/certificate'));
    expect(url).not.toContain('summary=');
  });
});
```

### 10.2 API route test

The `/api/certificate` route returns an `ImageResponse`. Testing the full image rendering requires an Edge-like environment, which is complex. Instead, test the response status and content-type:

```ts
// src/__tests__/api/certificate.test.ts (or inline in a Playwright E2E test)
// This test can only run in an integration/E2E context with the dev server running.
// For unit tests, validate the helper functions only (above).
```

### 10.3 Manual testing checklist

- [ ] Visit Skills page, click "Share" — verify Web Share API fires (on mobile) or download triggers (on desktop)
- [ ] Visit Skills page, click "LinkedIn" — verify LinkedIn share dialog opens with certificate page URL
- [ ] Complete a course, verify CourseCompleteCelebration shows Download/Share/LinkedIn buttons
- [ ] Click "Download" — verify PNG downloads with correct filename
- [ ] Visit `/certificate?name=Test&profession=Finance&score=85` directly — verify page renders with certificate image and OG tags
- [ ] Share the `/certificate` URL in a LinkedIn post preview tool — verify rich card with certificate image
- [ ] Test with a very long name (30+ characters) — verify truncation
- [ ] Test with no display name — verify "Learner" fallback
- [ ] Test "Share" on desktop Chrome (no Web Share API) — verify download fallback
- [ ] Verify `/certificate` page is accessible without login

---

## 11. Modal Gallery

Per CLAUDE.md: "Every new screen, modal, or overlay must be added to `modal-gallery.html`."

Add an entry for the `/certificate` page:

```html
<!-- Certificate page (public, shareable) -->
<div class="gallery-entry">
  <h3>Certificate Page</h3>
  <p>Public page showing a user's course completion certificate with download, share, and LinkedIn buttons.</p>
  <img src="/api/certificate?name=Jane+Doe&profession=Personal+Finance&professionIcon=💰&color=%2310B981&score=87" />
</div>
```

---

## 12. Implementation Order

This plan is incremental — each phase is independently shippable and testable.

### Phase 1: Certificate design upgrade (~2h)
1. Update `src/app/api/certificate/route.tsx`:
   - Add corner flourishes
   - Add mascot via base64 fetch (with try-catch fallback)
   - Add certificate ID to footer
   - Add name truncation and font size adjustment
   - Add `Cache-Control` header
2. Add `generateCertificateId()` to `src/lib/certificate.ts`
3. Test: verify improved certificate renders correctly at `/api/certificate?name=...`

### Phase 2: LinkedIn fix + shareable page (~2h)
1. Create `src/app/certificate/page.tsx` (Server Component with OG metadata)
2. Create `src/app/certificate/CertificatePageClient.tsx`
3. Update `getLinkedInShareUrl()` in `src/lib/certificate.ts` to use `/certificate` page URL
4. Verify middleware does NOT block `/certificate` route
5. Test: share `/certificate?...` URL on LinkedIn preview tool, verify rich card

### Phase 3: Share utility improvements (~1.5h)
1. Update `shareCertificate()` return type to `Promise<ShareResult>`
2. Update `CourseCompleteCelebration.tsx`:
   - Add loading/success states to Share button
   - Add certificate preview image in modal
3. Test: tap Share button, verify spinner + success feedback

### Phase 4: Skills page enhancements (~1h)
1. Update `src/app/(app)/skills/page.tsx`:
   - Replace single "Share Score" button with Share + LinkedIn + Download row
   - Add `certParams` construction
   - Add necessary imports
2. Test: all three buttons work correctly

### Phase 5: Analytics + tests (~1.5h)
1. Add Mixpanel tracking to certificate action handlers
2. Write unit tests for `certificate.ts` functions
3. Add certificate page to `modal-gallery.html`
4. Run `npm test` to verify no regressions

---

## 13. Files Modified (Summary)

| File | Change |
|------|--------|
| `src/app/api/certificate/route.tsx` | Enhanced design, mascot, cert ID, cache headers |
| `src/lib/certificate.ts` | `generateCertificateId()`, fix `getLinkedInShareUrl()`, `ShareResult` type |
| `src/app/certificate/page.tsx` | **NEW** — public shareable certificate page with OG tags |
| `src/app/certificate/CertificatePageClient.tsx` | **NEW** — client component for certificate page |
| `src/components/engagement/CourseCompleteCelebration.tsx` | Share loading states, certificate preview |
| `src/app/(app)/skills/page.tsx` | LinkedIn + Download buttons alongside existing Share |
| `modal-gallery.html` | Add certificate page entry |
| `src/__tests__/lib/certificate.test.ts` | **NEW** — unit tests |

---

## 14. What This Plan Does NOT Cover

1. **Certificate persistence in DB** — No `certificates` table or server-side verification. Certificates are rendered on-demand from URL parameters. A future improvement could store certificate records and issue verification URLs (`/verify/OKC-A1B2C3`), but this is unnecessary for MVP.

2. **Section-level certificates** — Only course completion certificates exist. Adding per-section/per-unit certificates is a future feature (would require defining what "completing a section" means in terms of readiness).

3. **Custom certificate templates per profession** — The current design uses profession color + icon for theming. Fully custom layouts per profession (e.g., a space-themed certificate for Space & Astronomy) is a polish item.

4. **Share cards for other celebrations** — Streak milestones, league promotions, level-ups, etc. These are covered by the separate Gap 12 plan (`docs/plans/plan-celebration-sharing.md`). This plan focuses specifically on course completion certificates and the Skills page readiness score.

5. **Email certificate delivery** — Sending the certificate via email (Resend is already in the dependency list) could be added later as a "Email my certificate" button.

---

## Critic Resolutions (42-Issue Audit)

The following addresses all issues raised in `critique-high-priority.md` for Gap 8:

### CR-4.1 [CRITICAL — Downgraded] `shareCertificate` return type change

**Critic says:** Changing from `Promise<void>` to `Promise<ShareResult>` is a breaking API change.

**Critic's own resolution:** "Not actually critical. Downgrading." The change is backward-compatible since existing callers that ignore the return value continue to work. No fix needed.

### CR-4.2 [CRITICAL] `Buffer.from()` not available in Edge Runtime

**Critic says:** The certificate route uses `export const runtime = 'edge'` (confirmed at line 4 of `route.tsx`). `Buffer` is not available in Edge.

**Verification:** Confirmed. The plan's mascot base64 conversion uses `Buffer.from(mascotBuffer).toString('base64')` which will fail in Edge.

**Resolution:** Use the Web API approach with chunked encoding to avoid stack overflow for larger images:

```typescript
const mascotBuffer = await mascotRes.arrayBuffer();
const bytes = new Uint8Array(mascotBuffer);
let binary = '';
const chunkSize = 8192;
for (let i = 0; i < bytes.length; i += chunkSize) {
  binary += String.fromCharCode(...bytes.slice(i, i + chunkSize));
}
const mascotBase64 = `data:image/png;base64,${btoa(binary)}`;
```

The chunked approach prevents `RangeError: Maximum call stack size exceeded` that occurs with `String.fromCharCode(...new Uint8Array(largeBuffer))` for images larger than ~64KB. The mascot PNG at `/mascot/celebrating.png` is small enough for a single spread, but the chunked approach is safer for future-proofing.

### CR-4.3 [IMPORTANT] LinkedIn share URL uses raw query params (ugly URL)

**Critic says:** Emojis and hex colors in the URL create ugly LinkedIn share links.

**Resolution:** Use profession slug instead of full params:

```typescript
export function getLinkedInShareUrl(params: CertificateParams, appUrl: string): string {
  const certPageUrl = new URL('/certificate', appUrl);
  certPageUrl.searchParams.set('name', params.name);
  certPageUrl.searchParams.set('profession', params.profession.toLowerCase().replace(/\s+&?\s*/g, '-'));
  certPageUrl.searchParams.set('score', String(Math.round(params.score)));
  if (params.date) certPageUrl.searchParams.set('date', params.date);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certPageUrl.toString())}`;
}
```

The `/certificate` page resolves the slug back to full profession data via `src/data/professions.ts`:

```typescript
// In certificate/page.tsx:
import { PROFESSIONS } from '@/data/professions';
const profession = PROFESSIONS.find(p => p.name.toLowerCase().replace(/\s+&?\s*/g, '-') === sp.profession)
  || { name: sp.profession || 'Course', icon: '🎓', color: '#6366f1' };
```

This produces clean URLs like `/certificate?name=Alice&profession=personal-finance&score=87`.

### CR-4.4 [IMPORTANT] Middleware references `middleware.ts` but file is `proxy.ts`

**Verification:** Confirmed. `src/proxy.ts` exists. `src/middleware.ts` does not. Next.js 16 renamed middleware to proxy.

**Resolution:** Update all references in the plan from `src/middleware.ts` to `src/proxy.ts`. The analysis is otherwise correct: `/certificate` is NOT in `authRequiredPrefixes`, so unauthenticated users pass through.

### CR-4.5 [IMPORTANT] Certificate ID hash quality

**Critic says:** The djb2 hash with sequential division produces clustering for small hashes.

**Resolution:** The critic confirms this is acceptable for a decorative ID. No code change needed. Add a comment:

```typescript
// NOTE: Hash distribution is not perfectly uniform — some last characters
// cluster around early alphabet values. Acceptable for decorative IDs.
```

### CR-4.6 [IMPORTANT] Certificate preview adds latency to celebration modal

**Resolution:** Change the image loading strategy:

```tsx
// Use lazy loading + skeleton placeholder:
<div className="mb-3 rounded-xl overflow-hidden border-2 border-white/20 mx-auto relative bg-surface-100 dark:bg-surface-800" style={{ maxWidth: 320, aspectRatio: '1200/630' }}>
  <img
    src={getCertificateUrl(certParams)}
    alt="Your certificate"
    className="w-full h-auto transition-opacity duration-300"
    loading="lazy"
    onLoad={(e) => (e.currentTarget.style.opacity = '1')}
    style={{ opacity: 0 }}
  />
</div>
```

This shows a placeholder skeleton while the image loads, then fades it in. No layout shift because the container has a fixed aspect ratio.

### CR-4.7 [IMPORTANT] `CertificateParams` type not exported

**Verification:** Confirmed. `src/lib/certificate.ts` line 7: `interface CertificateParams` — no `export` keyword.

**Resolution:** Add export:

```typescript
export interface CertificateParams {
  name: string;
  profession: string;
  professionIcon: string;
  color: string;
  score: number;
  date?: string;
}
```

### CR-4.8 [MINOR] `Linkedin` icon import

**Resolution:** The icon name `Linkedin` is correct for lucide-react 0.577+. Verified via the project's existing lucide-react imports. No change needed.

### CR-4.9 [MINOR] No dark mode for certificate page

**Resolution:** Add dark mode support to the certificate page:

```tsx
<div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex flex-col items-center px-4 py-8">
  {/* ... */}
  <div className="rounded-2xl overflow-hidden shadow-lg border border-surface-200 dark:border-surface-700 mb-6">
  {/* ... */}
  <p className="text-center text-xs font-mono text-surface-400 dark:text-surface-500 mb-4">
```

Use the app's existing `surface-*` color tokens throughout.

### CR-5.3 [IMPORTANT] Cross-plan: Share utility consolidation with Gap 12

**Critic says:** Both `shareCertificate()` (Gap 8) and `shareCard()` (Gap 12) implement share-with-fallback logic.

**Resolution:** Extract common logic into `src/lib/share-utils.ts`:

```typescript
export type ShareResult = 'shared' | 'copied' | 'downloaded' | 'cancelled';

/**
 * Share an image URL via Web Share API with fallback chain:
 * 1. Web Share with file (mobile)
 * 2. Web Share text-only (desktop with share API)
 * 3. Download file
 */
export async function shareImage(
  imageUrl: string,
  shareText: string,
  fileName: string,
): Promise<ShareResult> {
  // ... shared implementation ...
}
```

Both `shareCertificate` and `shareCard` become thin wrappers:

```typescript
// certificate.ts:
export async function shareCertificate(params: CertificateParams): Promise<ShareResult> {
  const url = getCertificateUrl(params);
  const text = `I completed the ${params.profession} course on ${APP_NAME} with a ${Math.round(params.score)}% readiness score!`;
  return shareImage(url, text, `${APP_NAME}-certificate.png`);
}
```

Gap 12 must be implemented BEFORE or SIMULTANEOUSLY with Gap 8's share improvements. If Gap 8 ships first, implement `share-utils.ts` as part of Gap 8 and have Gap 12's `shareCard` use it.

### CR-5.7 [IMPORTANT] Cross-plan: Both Gap 8 and Gap 12 modify `CourseCompleteCelebration.tsx`

**Resolution:** Implement Gap 12's `ShareButton` component first. Then Gap 8 uses `<ShareButton>` in `CourseCompleteCelebration.tsx` instead of inline share buttons. This avoids duplicate implementations.

Implementation order: Gap 12 `ShareButton` -> Gap 8 certificate improvements (uses `ShareButton`).

### CR-6.2 Cross-plan: Accessibility for certificate page

**Resolution:** Add to Phase 2 (certificate page):
- Semantic headings: `<h1>` for certificate title
- Image alt text: already included (`{name}'s {profession} certificate`)
- Share/Download buttons: `aria-label` attributes
- Focus-visible rings on all interactive elements
- LinkedIn button: `aria-label="Share on LinkedIn" rel="noopener noreferrer"`
