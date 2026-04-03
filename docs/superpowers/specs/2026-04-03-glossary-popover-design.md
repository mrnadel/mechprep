# Glossary Popover Feature — Design Spec

> **Date:** 2026-04-03
> **Status:** Approved
> **Scope:** Build a Duolingo-style tap-to-define glossary system that auto-detects terms in lesson text and shows a popover with the definition.

---

## 1. Overview

Courses that ship with a glossary file get automatic inline term highlighting. When a user taps a highlighted term, a small popover shows the definition. The ME course has no glossary and is unaffected.

### Courses with glossary data

| Course | Glossary file | Approx. terms |
|---|---|---|
| Personal Finance | `src/data/course/professions/personal-finance/glossary.ts` | ~168 |
| Psychology | `src/data/course/professions/psychology/glossary.ts` | ~195 |
| Space & Astronomy | `src/data/course/professions/space-astronomy/glossary.ts` | ~195 |
| Mechanical Engineering | none | 0 |

### Existing glossary entry shape (unchanged)

```ts
interface GlossaryEntry {
  term: string;
  definition: string;
  sectionIndex: number;
  relatedTerms?: string[];
}
```

---

## 2. Data Layer

### 2.1 Central glossary barrel — `src/data/course/glossary.ts`

New file. Exports:

```ts
function getGlossary(professionId: string): GlossaryEntry[] | null
```

- Returns the glossary array for the given profession via lazy `import()`.
- Returns `null` for ME (no glossary exists).
- Cached after first load — subsequent calls return the same array.

### 2.2 Glossary matcher — `src/lib/glossary-matcher.ts`

New file. Builds a compiled regex + lookup map from a `GlossaryEntry[]`.

**Key behaviors:**

- **Word-boundary matching:** Uses `\b` to prevent partial-word hits ("star" won't match inside "starting").
- **Longest-first sorting:** Multi-word terms like "solar system" are matched before single-word "solar".
- **Case-insensitive:** "Milky Way" matches "milky way" in text.
- **Section scoping:** `findTerms(text, sectionIndex?)` accepts an optional section filter. When provided, only terms with that `sectionIndex` are active — keeps the regex to ~15-20 terms per screen.
- **Compiled once:** The regex is built on glossary load, not per render.

**Exported API:**

```ts
interface GlossaryMatch {
  term: string;
  definition: string;
  relatedTerms?: string[];
  start: number;  // char offset in source text
  end: number;
}

class GlossaryMatcher {
  constructor(entries: GlossaryEntry[])
  findTerms(text: string, sectionIndex?: number): GlossaryMatch[]
  lookupTerm(term: string): GlossaryEntry | undefined  // full glossary lookup for related terms
}
```

---

## 3. Components

### 3.1 Rename `MoneyText` → `GlossaryText`

`MoneyText` (`src/components/ui/MoneyText.tsx`) is currently a no-op pass-through with a misleading name. It wraps all question text, answer options, hints, and explanations across 17 files.

**Refactor:**
- Rename file to `GlossaryText.tsx`
- Rename component to `GlossaryText`
- Update all 17 import sites
- Delete `MoneyText.tsx`

### 3.2 `GlossaryText` — `src/components/ui/GlossaryText.tsx`

Replaces `MoneyText`. Props:

```ts
{ text: string; sectionIndex?: number }
```

**Behavior:**
- Reads `activeProfession` from `useCourseStore`
- If no glossary for this profession → renders `<>{text}</>` (zero overhead, same as old `MoneyText`)
- Otherwise: runs `matcher.findTerms(text, sectionIndex)` and renders a mix of plain text spans and `<GlossaryTerm>` components for matches

### 3.3 `GlossaryTerm` — `src/components/ui/GlossaryTerm.tsx`

Inline tappable term. Renders as a `<button>` styled to look like inline text.

**Visual treatment:**
- Dotted underline (`border-bottom: 1px dotted`)
- Subtle color shift toward the unit's accent color
- Same font size/weight as surrounding text — blends in but is discoverable

**Interaction:**
- Tap/click → opens `<GlossaryPopover>`
- Keyboard: Enter/Space to open, Escape to close
- `role="button"`, `tabIndex={0}` for accessibility

### 3.4 `GlossaryPopover` — `src/components/ui/GlossaryPopover.tsx`

Lightweight definition popup.

**Content:**
- **Term** in bold
- **Definition** (1-2 sentences)
- **Related terms** (if any) as small tappable chips

**Positioning:**
- Absolute-positioned relative to the triggering term
- Smart placement: measures viewport bounds, renders above or below
- No portal needed (lesson content doesn't overflow-clip)

**Dismiss triggers:**
- Tap outside the popover
- Scroll
- Escape key
- Navigate to next question (LessonView unmounts/remounts)

**Constraints:**
- Only one popover open at a time — opening a new one closes the previous
- Tapping a related-term chip closes current popover, opens a new one for that term (looks up from full glossary via `matcher.lookupTerm()`, not section-filtered)

### 3.5 `EngagingText` integration

`EngagingText` does word-by-word animated rendering and cannot simply wrap `GlossaryText`. Instead:

- After parsing markdown and splitting into words, check each word/phrase against the glossary matcher.
- Multi-word terms (e.g., "solar system") get grouped into a single `<GlossaryTerm>` wrapper around those animated word spans.
- The word-by-word fade-in animation is preserved.
- **Terms become tappable only after the animation completes** — prevents interaction during the word reveal.

**New props on `EngagingText`:**

```ts
{ text: string; accentColor: string; sectionIndex?: number }
```

---

## 4. Integration Points

### 4.1 Where glossary terms appear

All 6 text surfaces in lessons:

| Surface | Component | Integration method |
|---|---|---|
| Teaching card explanations | `EngagingText` | Glossary detection in word rendering loop |
| Teaching card hints | `EngagingText` | Same |
| Question prompts | `GlossaryText` | Direct (was `MoneyText`) |
| Answer options | `GlossaryText` | Direct |
| Post-answer explanations | `GlossaryText` | Direct |
| Pre-answer hints | `GlossaryText` | Direct |

### 4.2 `sectionIndex` flow

`LessonView` knows the current `unitIndex`. This is passed as `sectionIndex` to both `GlossaryText` and `EngagingText` so only the ~15-20 terms relevant to the current unit are matched.

### 4.3 When glossary is active vs inactive

| Course | Active? |
|---|---|
| Personal Finance | Yes |
| Psychology | Yes |
| Space & Astronomy | Yes |
| Mechanical Engineering | No (no glossary file, renders plain text) |

---

## 5. Visual Design

### Highlighted term (inline)
- Dotted underline, subtle accent color shift
- Same font size/weight as surrounding text
- Cursor: pointer on desktop

### Popover
- Small card: white background (dark mode: dark surface), subtle shadow, rounded corners
- Max width: ~280px
- Term in bold at top, definition below
- Related terms as small pill-shaped chips at bottom
- Smooth fade-in animation (120ms)
- Arrow/caret pointing to the source term

---

## 6. Files Changed

### New files
| File | Purpose |
|---|---|
| `src/data/course/glossary.ts` | Central barrel — `getGlossary(professionId)` |
| `src/lib/glossary-matcher.ts` | Regex builder + match engine |
| `src/components/ui/GlossaryText.tsx` | Replaces `MoneyText`, renders glossary terms |
| `src/components/ui/GlossaryTerm.tsx` | Inline tappable term button |
| `src/components/ui/GlossaryPopover.tsx` | Definition popover |

### Modified files
| File | Change |
|---|---|
| `src/components/lesson/EngagingText.tsx` | Add glossary detection to word renderer, accept `sectionIndex` prop |
| `src/components/lesson/TeachingCard.tsx` | Pass `sectionIndex` to `EngagingText` |
| `src/components/lesson/LessonView.tsx` | Pass `sectionIndex` to question card components |
| `src/components/lesson/QuestionCard.tsx` | Update `MoneyText` → `GlossaryText` import |
| 13 other lesson card components | Update `MoneyText` → `GlossaryText` import |

### Deleted files
| File | Reason |
|---|---|
| `src/components/ui/MoneyText.tsx` | Replaced by `GlossaryText` |

---

## 7. Non-Goals

- No glossary for ME course (not in scope)
- No standalone glossary page / dictionary view
- Practice mode (SessionView) feeds questions through the same LessonView via adapter — glossary will work there automatically if the adapter passes `sectionIndex`. No extra wiring needed, but no special effort either.
- No admin UI for editing glossary terms
- No persistence of "terms the user has looked up"
