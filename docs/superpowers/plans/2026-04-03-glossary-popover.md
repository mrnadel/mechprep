# Glossary Popover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Duolingo-style tap-to-define glossary system that auto-detects terms in lesson text and shows a popover with the definition. Works for Personal Finance, Psychology, and Space & Astronomy courses (ME has no glossary).

**Architecture:** A `GlossaryMatcher` class compiles a regex from glossary entries at load time. `GlossaryText` (replacing the no-op `MoneyText`) and `EngagingText` use it to detect terms at render time and wrap them in tappable `GlossaryTerm` buttons that show a `GlossaryPopover`. Scoped by `sectionIndex` to keep matches small (~15-20 terms per screen).

**Tech Stack:** React 19, TypeScript, Zustand (useCourseStore for activeProfession), Tailwind CSS 4, Framer Motion (popover animation), Vitest

**Spec:** `docs/superpowers/specs/2026-04-03-glossary-popover-design.md`

---

## File Structure

### New files

| File | Responsibility |
|------|----------------|
| `src/data/course/glossary.ts` | Central barrel — `getGlossary(professionId)`, lazy loads + caches per-profession glossary |
| `src/lib/glossary-matcher.ts` | `GlossaryMatcher` class — compiles regex, finds terms in text, looks up entries |
| `src/components/ui/GlossaryText.tsx` | Replaces `MoneyText` — detects glossary terms and renders `GlossaryTerm` spans |
| `src/components/ui/GlossaryTerm.tsx` | Inline tappable term button with dotted underline + accent color |
| `src/components/ui/GlossaryPopover.tsx` | Positioned popover showing definition + related terms |
| `src/__tests__/lib/glossary-matcher.test.ts` | Unit tests for GlossaryMatcher |
| `src/__tests__/critical/glossary-text.test.ts` | Component tests for GlossaryText |

### Modified files

| File | Change |
|------|--------|
| `src/components/lesson/EngagingText.tsx` | Accept `sectionIndex` prop, integrate glossary detection into word renderer |
| `src/components/lesson/TeachingCard.tsx` | Pass `sectionIndex` to EngagingText |
| `src/components/lesson/LessonView.tsx` | Derive `sectionIndex` from current unit, pass to TeachingCard and question cards |
| `src/components/lesson/QuestionCard.tsx` | Import `GlossaryText` instead of `MoneyText`, accept + pass `sectionIndex` |
| 12 other lesson card components | Same import swap (`MoneyText` → `GlossaryText`) |
| `src/data/course/professions/personal-finance/glossary.ts` | Remove duplicate `GlossaryEntry` interface, import from shared location |
| `src/data/course/professions/psychology/glossary.ts` | Same |
| `src/data/course/professions/space-astronomy/glossary.ts` | Same |

### Deleted files

| File | Reason |
|------|--------|
| `src/components/ui/MoneyText.tsx` | Replaced by `GlossaryText.tsx` |

---

## Task 1: GlossaryEntry type + central glossary barrel

**Files:**
- Modify: `src/data/course/types.ts`
- Create: `src/data/course/glossary.ts`
- Modify: `src/data/course/professions/personal-finance/glossary.ts`
- Modify: `src/data/course/professions/psychology/glossary.ts`
- Modify: `src/data/course/professions/space-astronomy/glossary.ts`

- [ ] **Step 1: Add GlossaryEntry to shared types**

Add to the end of `src/data/course/types.ts`:

```ts
export interface GlossaryEntry {
  term: string;
  definition: string;
  sectionIndex: number;
  relatedTerms?: string[];
}
```

- [ ] **Step 2: Update the 3 glossary files to import from shared types**

In each of the 3 glossary files (`personal-finance/glossary.ts`, `psychology/glossary.ts`, `space-astronomy/glossary.ts`), replace:

```ts
export interface GlossaryEntry {
  term: string;
  definition: string;
  sectionIndex: number;
  relatedTerms?: string[];
}
```

with:

```ts
import type { GlossaryEntry } from '../../types';
```

Keep the `export` on the array (`export const financeGlossary`, etc.) unchanged.

- [ ] **Step 3: Create the central glossary barrel**

Create `src/data/course/glossary.ts`:

```ts
import type { GlossaryEntry } from './types';
import { PROFESSION_ID } from '@/data/professions';

const cache = new Map<string, GlossaryEntry[]>();

/**
 * Load the glossary for a given profession.
 * Returns null for professions without a glossary (e.g., ME).
 * Caches after first load.
 */
export async function getGlossary(professionId: string): Promise<GlossaryEntry[] | null> {
  if (professionId === PROFESSION_ID.MECHANICAL_ENGINEERING) return null;

  const cached = cache.get(professionId);
  if (cached) return cached;

  let entries: GlossaryEntry[];

  switch (professionId) {
    case PROFESSION_ID.PERSONAL_FINANCE: {
      const mod = await import('./professions/personal-finance/glossary');
      entries = mod.financeGlossary;
      break;
    }
    case PROFESSION_ID.PSYCHOLOGY: {
      const mod = await import('./professions/psychology/glossary');
      entries = mod.psychologyGlossary;
      break;
    }
    case PROFESSION_ID.SPACE_ASTRONOMY: {
      const mod = await import('./professions/space-astronomy/glossary');
      entries = mod.spaceGlossary;
      break;
    }
    default:
      return null;
  }

  cache.set(professionId, entries);
  return entries;
}
```

- [ ] **Step 4: Verify types compile**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors related to glossary files.

- [ ] **Step 5: Commit**

```bash
git add src/data/course/types.ts src/data/course/glossary.ts \
  src/data/course/professions/personal-finance/glossary.ts \
  src/data/course/professions/psychology/glossary.ts \
  src/data/course/professions/space-astronomy/glossary.ts
git commit -m "feat(glossary): add shared GlossaryEntry type and central glossary barrel"
```

---

## Task 2: GlossaryMatcher with tests (TDD)

**Files:**
- Create: `src/__tests__/lib/glossary-matcher.test.ts`
- Create: `src/lib/glossary-matcher.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/__tests__/lib/glossary-matcher.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { GlossaryMatcher } from '@/lib/glossary-matcher';
import type { GlossaryEntry } from '@/data/course/types';

const entries: GlossaryEntry[] = [
  { term: 'solar system', definition: 'The Sun and everything bound to it.', sectionIndex: 0 },
  { term: 'star', definition: 'A massive ball of hot gas.', sectionIndex: 0, relatedTerms: ['planet'] },
  { term: 'planet', definition: 'A large body that orbits a star.', sectionIndex: 0 },
  { term: 'nebula', definition: 'A cloud of gas and dust.', sectionIndex: 3 },
  { term: 'Milky Way', definition: 'Our home galaxy.', sectionIndex: 0, relatedTerms: ['galaxy'] },
];

describe('GlossaryMatcher', () => {
  const matcher = new GlossaryMatcher(entries);

  describe('findTerms', () => {
    it('finds a single-word term', () => {
      const matches = matcher.findTerms('A star is a ball of gas.');
      expect(matches).toHaveLength(1);
      expect(matches[0].term).toBe('star');
      expect(matches[0].start).toBe(2);
      expect(matches[0].end).toBe(6);
    });

    it('finds multi-word terms and prioritizes longest match', () => {
      const matches = matcher.findTerms('Our solar system has one star.');
      const terms = matches.map(m => m.term);
      expect(terms).toContain('solar system');
      expect(terms).toContain('star');
      // "solar" alone should NOT match — only "solar system"
      expect(terms).not.toContain('solar');
    });

    it('is case-insensitive', () => {
      const matches = matcher.findTerms('The milky way is huge.');
      expect(matches).toHaveLength(1);
      expect(matches[0].term).toBe('Milky Way');
    });

    it('does not match partial words', () => {
      const matches = matcher.findTerms('Starting a new journey.');
      // "star" should NOT match inside "Starting"
      expect(matches).toHaveLength(0);
    });

    it('filters by sectionIndex', () => {
      const matches = matcher.findTerms('A star near a nebula.', 0);
      const terms = matches.map(m => m.term);
      expect(terms).toContain('star');
      expect(terms).not.toContain('nebula'); // sectionIndex 3, filtered out
    });

    it('returns all terms when no sectionIndex filter', () => {
      const matches = matcher.findTerms('A star near a nebula.');
      const terms = matches.map(m => m.term);
      expect(terms).toContain('star');
      expect(terms).toContain('nebula');
    });

    it('returns matches sorted by position', () => {
      const matches = matcher.findTerms('A planet orbits a star.');
      expect(matches[0].term).toBe('planet');
      expect(matches[1].term).toBe('star');
      expect(matches[0].start).toBeLessThan(matches[1].start);
    });

    it('returns empty array for text with no terms', () => {
      const matches = matcher.findTerms('Hello world.');
      expect(matches).toHaveLength(0);
    });

    it('includes definition and relatedTerms in matches', () => {
      const matches = matcher.findTerms('A star shines.');
      expect(matches[0].definition).toBe('A massive ball of hot gas.');
      expect(matches[0].relatedTerms).toEqual(['planet']);
    });
  });

  describe('lookupTerm', () => {
    it('finds a term by exact name (case-insensitive)', () => {
      const entry = matcher.lookupTerm('milky way');
      expect(entry).toBeDefined();
      expect(entry!.term).toBe('Milky Way');
    });

    it('returns undefined for unknown terms', () => {
      expect(matcher.lookupTerm('quasar')).toBeUndefined();
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/__tests__/lib/glossary-matcher.test.ts 2>&1 | tail -20`
Expected: FAIL — module `@/lib/glossary-matcher` not found.

- [ ] **Step 3: Implement GlossaryMatcher**

Create `src/lib/glossary-matcher.ts`:

```ts
import type { GlossaryEntry } from '@/data/course/types';

export interface GlossaryMatch {
  term: string;
  definition: string;
  relatedTerms?: string[];
  start: number;
  end: number;
}

export class GlossaryMatcher {
  private entries: GlossaryEntry[];
  private lookupMap: Map<string, GlossaryEntry>; // lowercase term → entry
  private sectionEntries: Map<number, GlossaryEntry[]>; // sectionIndex → entries

  constructor(entries: GlossaryEntry[]) {
    this.entries = entries;
    this.lookupMap = new Map();
    this.sectionEntries = new Map();

    for (const entry of entries) {
      this.lookupMap.set(entry.term.toLowerCase(), entry);

      const list = this.sectionEntries.get(entry.sectionIndex);
      if (list) {
        list.push(entry);
      } else {
        this.sectionEntries.set(entry.sectionIndex, [entry]);
      }
    }
  }

  /**
   * Build a regex from a list of terms.
   * Terms are sorted longest-first so multi-word terms match before their sub-parts.
   */
  private buildRegex(terms: string[]): RegExp | null {
    if (terms.length === 0) return null;

    const sorted = [...terms].sort((a, b) => b.length - a.length);
    const escaped = sorted.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = `\\b(${escaped.join('|')})\\b`;
    return new RegExp(pattern, 'gi');
  }

  findTerms(text: string, sectionIndex?: number): GlossaryMatch[] {
    const pool = sectionIndex !== undefined
      ? (this.sectionEntries.get(sectionIndex) ?? [])
      : this.entries;

    const regex = this.buildRegex(pool.map(e => e.term));
    if (!regex) return [];

    const matches: GlossaryMatch[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const entry = this.lookupMap.get(match[1].toLowerCase());
      if (entry) {
        matches.push({
          term: entry.term,
          definition: entry.definition,
          relatedTerms: entry.relatedTerms,
          start: match.index,
          end: match.index + match[0].length,
        });
      }
    }

    return matches.sort((a, b) => a.start - b.start);
  }

  lookupTerm(term: string): GlossaryEntry | undefined {
    return this.lookupMap.get(term.toLowerCase());
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/__tests__/lib/glossary-matcher.test.ts 2>&1 | tail -20`
Expected: All 9 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/glossary-matcher.ts src/__tests__/lib/glossary-matcher.test.ts
git commit -m "feat(glossary): add GlossaryMatcher with TDD tests"
```

---

## Task 3: GlossaryPopover component

**Files:**
- Create: `src/components/ui/GlossaryPopover.tsx`

- [ ] **Step 1: Create GlossaryPopover**

Create `src/components/ui/GlossaryPopover.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { GlossaryEntry } from '@/data/course/types';

interface GlossaryPopoverProps {
  entry: { term: string; definition: string; relatedTerms?: string[] };
  anchorRect: DOMRect;
  accentColor: string;
  onClose: () => void;
  onRelatedTermClick: (term: string) => void;
}

export function GlossaryPopover({
  entry,
  anchorRect,
  accentColor,
  onClose,
  onRelatedTermClick,
}: GlossaryPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<'above' | 'below'>('below');

  // Compute placement on mount
  useEffect(() => {
    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const spaceAbove = anchorRect.top;
    setPlacement(spaceBelow < 180 && spaceAbove > spaceBelow ? 'above' : 'below');
  }, [anchorRect]);

  // Close on outside click, scroll, or Escape
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    function handleScroll() {
      onClose();
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [onClose]);

  const top = placement === 'below'
    ? anchorRect.bottom + 6
    : anchorRect.top - 6;

  // Center horizontally on the anchor, clamped to viewport
  const rawLeft = anchorRect.left + anchorRect.width / 2 - 140;
  const left = Math.max(8, Math.min(rawLeft, window.innerWidth - 288));

  return (
    <div
      ref={ref}
      role="tooltip"
      style={{
        position: 'fixed',
        top: placement === 'below' ? top : undefined,
        bottom: placement === 'above' ? window.innerHeight - top : undefined,
        left,
        zIndex: 9999,
      }}
      className="w-[280px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 shadow-lg animate-in fade-in duration-150"
    >
      {/* Arrow */}
      <div
        style={{
          position: 'absolute',
          [placement === 'below' ? 'top' : 'bottom']: -6,
          left: Math.min(Math.max(anchorRect.left + anchorRect.width / 2 - left - 6, 8), 264),
          width: 12,
          height: 12,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRight: 'none',
          borderBottom: placement === 'below' ? 'none' : undefined,
          borderTop: placement === 'above' ? 'none' : undefined,
          transform: placement === 'below' ? 'rotate(45deg)' : 'rotate(-135deg)',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
        }}
      />

      <p className="text-sm font-bold" style={{ color: accentColor }}>
        {entry.term}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {entry.definition}
      </p>

      {entry.relatedTerms && entry.relatedTerms.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {entry.relatedTerms.map(rt => (
            <button
              key={rt}
              type="button"
              onClick={() => onRelatedTermClick(rt)}
              className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-border)]"
            >
              {rt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/GlossaryPopover.tsx
git commit -m "feat(glossary): add GlossaryPopover component"
```

---

## Task 4: GlossaryTerm component

**Files:**
- Create: `src/components/ui/GlossaryTerm.tsx`

- [ ] **Step 1: Create GlossaryTerm**

Create `src/components/ui/GlossaryTerm.tsx`:

```tsx
'use client';

import { useCallback, useRef } from 'react';

interface GlossaryTermProps {
  /** The visible text rendered inline */
  children: React.ReactNode;
  /** Accent color for the dotted underline */
  accentColor: string;
  /** Called when the user taps this term. Parent manages popover state. */
  onTap: (rect: DOMRect) => void;
}

export function GlossaryTerm({ children, accentColor, onTap }: GlossaryTermProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    if (ref.current) {
      onTap(ref.current.getBoundingClientRect());
    }
  }, [onTap]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className="glossary-term"
      style={{
        // Inline text that blends in
        display: 'inline',
        padding: 0,
        margin: 0,
        background: 'none',
        font: 'inherit',
        lineHeight: 'inherit',
        cursor: 'pointer',
        borderBottom: `1.5px dotted ${accentColor}40`,
        color: `color-mix(in oklch, currentColor 80%, ${accentColor})`,
        transition: 'color 0.15s, border-color 0.15s',
      }}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/GlossaryTerm.tsx
git commit -m "feat(glossary): add GlossaryTerm inline button component"
```

---

## Task 5: GlossaryText (replaces MoneyText) + glossary context provider

**Files:**
- Create: `src/components/ui/GlossaryText.tsx`
- Delete: `src/components/ui/MoneyText.tsx`
- Create: `src/components/lesson/GlossaryContext.tsx`

The glossary needs shared state (active popover, matcher instance, accent color) across both `GlossaryText` and `EngagingText`. A small React context avoids prop-drilling and keeps popover singleton logic in one place.

- [ ] **Step 1: Create GlossaryContext**

Create `src/components/lesson/GlossaryContext.tsx`:

```tsx
'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { GlossaryMatcher, type GlossaryMatch } from '@/lib/glossary-matcher';
import { getGlossary } from '@/data/course/glossary';
import { GlossaryPopover } from '@/components/ui/GlossaryPopover';
import { useCourseStore } from '@/store/useCourseStore';

interface GlossaryContextValue {
  matcher: GlossaryMatcher | null;
  sectionIndex: number | undefined;
  accentColor: string;
  openPopover: (entry: { term: string; definition: string; relatedTerms?: string[] }, rect: DOMRect) => void;
}

const Ctx = createContext<GlossaryContextValue>({
  matcher: null,
  sectionIndex: undefined,
  accentColor: '#3B82F6',
  openPopover: () => {},
});

export function useGlossary() {
  return useContext(Ctx);
}

interface GlossaryProviderProps {
  sectionIndex: number | undefined;
  accentColor: string;
  children: ReactNode;
}

export function GlossaryProvider({ sectionIndex, accentColor, children }: GlossaryProviderProps) {
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const [matcher, setMatcher] = useState<GlossaryMatcher | null>(null);
  const [popover, setPopover] = useState<{
    entry: { term: string; definition: string; relatedTerms?: string[] };
    rect: DOMRect;
  } | null>(null);

  // Load glossary when profession changes
  useEffect(() => {
    let cancelled = false;
    getGlossary(activeProfession).then(entries => {
      if (cancelled) return;
      setMatcher(entries ? new GlossaryMatcher(entries) : null);
    });
    return () => { cancelled = true; };
  }, [activeProfession]);

  const openPopover = useCallback(
    (entry: { term: string; definition: string; relatedTerms?: string[] }, rect: DOMRect) => {
      setPopover({ entry, rect });
    },
    [],
  );

  const closePopover = useCallback(() => setPopover(null), []);

  const handleRelatedTermClick = useCallback(
    (term: string) => {
      if (!matcher) return;
      const entry = matcher.lookupTerm(term);
      if (!entry) return;
      // Keep same rect position (the related term chip is close enough)
      setPopover(prev => prev ? { entry, rect: prev.rect } : null);
    },
    [matcher],
  );

  return (
    <Ctx.Provider value={{ matcher, sectionIndex, accentColor, openPopover }}>
      {children}
      {popover && (
        <GlossaryPopover
          entry={popover.entry}
          anchorRect={popover.rect}
          accentColor={accentColor}
          onClose={closePopover}
          onRelatedTermClick={handleRelatedTermClick}
        />
      )}
    </Ctx.Provider>
  );
}
```

- [ ] **Step 2: Create GlossaryText**

Create `src/components/ui/GlossaryText.tsx`:

```tsx
'use client';

import type { ReactNode } from 'react';
import { useGlossary } from '@/components/lesson/GlossaryContext';
import { GlossaryTerm } from '@/components/ui/GlossaryTerm';

export function GlossaryText({ text }: { text: string }): ReactNode {
  const { matcher, sectionIndex, accentColor, openPopover } = useGlossary();

  if (!text) return null;
  if (!matcher) return <>{text}</>;

  const matches = matcher.findTerms(text, sectionIndex);
  if (matches.length === 0) return <>{text}</>;

  // Build segments: alternating plain text and glossary terms
  const segments: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    // Plain text before this match
    if (match.start > cursor) {
      segments.push(text.slice(cursor, match.start));
    }

    // The glossary term
    const matchedText = text.slice(match.start, match.end);
    segments.push(
      <GlossaryTerm
        key={`${match.term}-${match.start}`}
        accentColor={accentColor}
        onTap={(rect) => openPopover(match, rect)}
      >
        {matchedText}
      </GlossaryTerm>,
    );

    cursor = match.end;
  }

  // Remaining plain text
  if (cursor < text.length) {
    segments.push(text.slice(cursor));
  }

  return <>{segments}</>;
}
```

- [ ] **Step 3: Delete MoneyText**

Delete `src/components/ui/MoneyText.tsx`.

- [ ] **Step 4: Verify types compile**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: Errors about MoneyText imports in 16 files — expected, we fix these in Task 6.

- [ ] **Step 5: Commit**

```bash
git add src/components/lesson/GlossaryContext.tsx src/components/ui/GlossaryText.tsx
git rm src/components/ui/MoneyText.tsx
git commit -m "feat(glossary): add GlossaryContext, GlossaryText; remove MoneyText"
```

---

## Task 6: Rename MoneyText → GlossaryText across all imports

**Files (16 files to update):**
- Modify: `src/components/lesson/TeachingCard.tsx`
- Modify: `src/components/lesson/LessonView.tsx`
- Modify: `src/components/lesson/QuestionCard.tsx`
- Modify: `src/components/lesson/SortBucketsCard.tsx`
- Modify: `src/components/lesson/SliderEstimateCard.tsx`
- Modify: `src/components/lesson/ScenarioCard.tsx`
- Modify: `src/components/lesson/RankOrderCard.tsx`
- Modify: `src/components/lesson/OrderStepsCard.tsx`
- Modify: `src/components/lesson/MatchPairsCard.tsx`
- Modify: `src/components/lesson/CategorySwipeCard.tsx`
- Modify: `src/components/lesson/ImageTapCard.tsx`
- Modify: `src/components/lesson/MultiSelectCard.tsx`
- Modify: `src/components/lesson/PickTheBestCard.tsx`
- Modify: `src/components/lesson/types/TimelineView.tsx`
- Modify: `src/components/lesson/types/ConversationView.tsx`
- Modify: `src/components/lesson/types/CaseStudyView.tsx`

- [ ] **Step 1: Replace all MoneyText imports and usages**

In every file listed above, make two replacements:

1. Replace the import line:
   ```ts
   import { MoneyText } from '@/components/ui/MoneyText';
   ```
   with:
   ```ts
   import { GlossaryText } from '@/components/ui/GlossaryText';
   ```

2. Replace all `<MoneyText` with `<GlossaryText` in JSX (component name only, props stay the same — they both take `text: string`).

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors.

- [ ] **Step 3: Also update CLAUDE.md**

In `CLAUDE.md`, the UI Components section references `MoneyText`. Replace that reference with `GlossaryText` and update the description.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: rename MoneyText → GlossaryText across all lesson components"
```

---

## Task 7: Wire GlossaryProvider into LessonView

**Files:**
- Modify: `src/components/lesson/LessonView.tsx`

This is where sectionIndex gets derived from the current unit and the GlossaryProvider wraps the lesson content.

- [ ] **Step 1: Add GlossaryProvider to LessonView**

In `src/components/lesson/LessonView.tsx`:

Add import at the top:
```ts
import { GlossaryProvider } from '@/components/lesson/GlossaryContext';
```

Derive `sectionIndex` from the current unit. Near the existing `unitTheme` derivation (around line 118 where `const unit = courseData[activeLesson.unitIndex]` is computed), add:

```ts
const currentSectionIndex = unit?.sectionIndex;
```

Then wrap the lesson content (the main card rendering area) with `GlossaryProvider`:

```tsx
<GlossaryProvider sectionIndex={currentSectionIndex} accentColor={unitColor}>
  {/* existing lesson content JSX */}
</GlossaryProvider>
```

The exact insertion point: find the outermost container div that holds both TeachingCard and QuestionCard renders (typically the main lesson card area). Wrap that entire block.

If LessonView also renders in adapter/practice mode, the provider should still wrap the content — it will just have `sectionIndex={undefined}` when there's no unit context, which means all glossary terms for the profession match (acceptable for practice mode).

- [ ] **Step 2: Verify types compile and dev server renders**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors.

Run: `npm run dev` and navigate to a lesson in one of the non-ME courses. Verify:
- The lesson still renders correctly
- No console errors about GlossaryContext

- [ ] **Step 3: Commit**

```bash
git add src/components/lesson/LessonView.tsx
git commit -m "feat(glossary): wire GlossaryProvider into LessonView"
```

---

## Task 8: Integrate glossary into EngagingText

**Files:**
- Modify: `src/components/lesson/EngagingText.tsx`

EngagingText does word-by-word rendering. We need to detect glossary terms that may span multiple words and wrap them in a `GlossaryTerm`.

- [ ] **Step 1: Update EngagingText to use glossary context**

Modify `src/components/lesson/EngagingText.tsx`:

Add imports:
```ts
import { useGlossary } from '@/components/lesson/GlossaryContext';
import { GlossaryTerm } from '@/components/ui/GlossaryTerm';
```

Inside the `EngagingText` function, read glossary context:
```ts
const { matcher, sectionIndex, accentColor: glossaryAccent, openPopover } = useGlossary();
```

The strategy: after computing the full plain text, run `matcher.findTerms()` on it. Build a set of character ranges that are glossary terms. During the word-by-word rendering loop, check if the current word falls within a glossary match range. If it does, wrap the word spans for that term in a `<GlossaryTerm>`.

Implementation approach in the `renderParagraph` function:

1. Before rendering words, compute glossary matches on the paragraph's plain text.
2. Track the current char offset as you render words.
3. When a word starts within a glossary match range, begin collecting word spans into a group.
4. When the group completes (char offset passes the match end), wrap the collected spans in `<GlossaryTerm>`.
5. Add an `animationEnd` listener so terms only become tappable after fade-in completes (use a `pointerEvents: 'none'` that switches to `'auto'` after the last word in the term finishes animating).

Key detail: the `EngagingText` component must remain a named function (not arrow) wrapped in `memo()` for the existing export to work. The `useGlossary` hook call means it stays a client component (it already is one via `'use client'`).

- [ ] **Step 2: Test manually**

Run dev server, navigate to a Space & Astronomy lesson with teaching cards. Verify:
- Teaching card text still has word-by-word animation
- Glossary terms (e.g., "star", "planet", "solar system") appear with dotted underline + color shift
- Tapping a term shows the popover with definition
- Related term chips in the popover work
- Popover dismisses on outside tap, scroll, or Escape
- Terms are NOT tappable during the fade-in animation

- [ ] **Step 3: Commit**

```bash
git add src/components/lesson/EngagingText.tsx
git commit -m "feat(glossary): integrate glossary term detection into EngagingText"
```

---

## Task 9: GlossaryText component test

**Files:**
- Create: `src/__tests__/critical/glossary-text.test.ts`

- [ ] **Step 1: Write integration tests**

Create `src/__tests__/critical/glossary-text.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GlossaryMatcher } from '@/lib/glossary-matcher';
import type { GlossaryEntry } from '@/data/course/types';

/**
 * Test the glossary matching logic that GlossaryText relies on.
 * We test the matcher directly rather than rendering the component,
 * since the rendering depends on GlossaryContext which requires
 * store setup. The matcher is the critical logic.
 */

const entries: GlossaryEntry[] = [
  { term: 'compound interest', definition: 'Interest on interest.', sectionIndex: 0 },
  { term: 'interest', definition: 'Money charged for borrowing.', sectionIndex: 0 },
  { term: 'budget', definition: 'A spending plan.', sectionIndex: 1 },
  { term: 'APY', definition: 'Annual percentage yield.', sectionIndex: 0, relatedTerms: ['compound interest'] },
];

describe('GlossaryText matching behavior', () => {
  const matcher = new GlossaryMatcher(entries);

  it('prefers longer term over shorter overlapping term', () => {
    const matches = matcher.findTerms('Compound interest grows your money.', 0);
    const terms = matches.map(m => m.term);
    expect(terms).toContain('compound interest');
    // "interest" alone should NOT also match within "compound interest"
    expect(terms).toHaveLength(1);
  });

  it('matches standalone shorter term when longer term is absent', () => {
    const matches = matcher.findTerms('The interest rate is 5%.', 0);
    expect(matches).toHaveLength(1);
    expect(matches[0].term).toBe('interest');
  });

  it('handles abbreviations', () => {
    const matches = matcher.findTerms('Your APY is 4.5%.', 0);
    expect(matches).toHaveLength(1);
    expect(matches[0].term).toBe('APY');
  });

  it('returns no matches for ME course (null matcher scenario)', () => {
    // When matcher is null (ME course), GlossaryText renders plain text.
    // This test documents the expected behavior.
    const emptyMatcher = new GlossaryMatcher([]);
    const matches = emptyMatcher.findTerms('Any text here.');
    expect(matches).toHaveLength(0);
  });

  it('handles multiple terms in one sentence', () => {
    const matches = matcher.findTerms('Your budget affects compound interest growth.');
    const terms = matches.map(m => m.term);
    // budget is section 1, compound interest is section 0
    // Without section filter, both match
    expect(terms).toContain('budget');
    expect(terms).toContain('compound interest');
  });

  it('section filter excludes out-of-section terms', () => {
    const matches = matcher.findTerms('Your budget affects compound interest growth.', 0);
    const terms = matches.map(m => m.term);
    expect(terms).toContain('compound interest');
    expect(terms).not.toContain('budget'); // section 1, filtered out
  });
});
```

- [ ] **Step 2: Run tests**

Run: `npx vitest run src/__tests__/critical/glossary-text.test.ts 2>&1 | tail -15`
Expected: All tests PASS.

- [ ] **Step 3: Run full test suite**

Run: `npm test 2>&1 | tail -20`
Expected: All existing tests still pass + new glossary tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/__tests__/critical/glossary-text.test.ts
git commit -m "test(glossary): add GlossaryText matching behavior tests"
```

---

## Task 10: Manual verification + final polish

- [ ] **Step 1: Test all 3 courses with glossary**

Start dev server (`npm run dev`) and test each course:

1. **Space & Astronomy** — Start a lesson in Section 0 (Looking Up). Verify:
   - Terms like "star", "planet", "solar system", "Milky Way" are highlighted
   - Tapping shows popover with correct definition
   - Related terms chips work (e.g., tap "star" → see "planet" chip → tap it → see planet definition)
   - Popover dismisses correctly (outside tap, scroll, Escape)

2. **Psychology** — Start a lesson in Section 0 (Your Amazing Brain). Verify:
   - Terms like "neuron", "synapse", "cerebrum" are highlighted
   - Multi-word terms like "frontal lobe" highlight as one unit

3. **Personal Finance** — Start a lesson in Section 0 (Welcome to Money). Verify:
   - Terms like "income", "budget", "emergency fund" are highlighted

4. **Mechanical Engineering** — Start any lesson. Verify:
   - NO glossary terms appear (no highlighting, no dotted underlines)
   - Lessons render exactly as before

- [ ] **Step 2: Test edge cases**

- Rapidly tap multiple terms — only one popover should be open at a time
- Tap a term, then scroll — popover should close
- Navigate to next question — popover should close (unmount)
- Teaching card word-by-word animation — terms should NOT be tappable during animation
- Resize browser window — popover positioning should stay reasonable

- [ ] **Step 3: Add glossary entry to modal gallery**

Per CLAUDE.md instructions, add a new entry to `modal-gallery.html` showing the glossary popover state.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat(glossary): complete glossary popover feature with all courses wired"
```
