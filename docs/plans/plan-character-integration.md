# Character Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make course characters (Alex, Jordan, Dr. Maya, Sam, Captain Nova, Kai) a persistent, Duolingo-style presence throughout lessons and the course map — not just in post-section modals.

**Architecture:** Characters are associated with course sections via a new `sectionCharacterMap` in each course's characters.ts. Characters appear in 4 integration points: (1) teaching card narration, (2) mid-lesson character reactions, (3) course map character bubbles on unit headers, (4) result screen character comments. All character data lazy-loads per existing pattern.

**Tech Stack:** React 19, Framer Motion, Zustand, existing Mascot/TeachingCard/MicroCelebration components, existing CharacterArc data model.

---

## File Structure

| File | Responsibility |
|------|---------------|
| **Create:** `src/data/course/character-lines.ts` | Type definitions for character dialogue lines (teaching, reaction, result) |
| **Create:** `src/data/course/professions/personal-finance/character-lines.ts` | PF character dialogue lines |
| **Create:** `src/data/course/professions/psychology/character-lines.ts` | Psych character dialogue lines |
| **Create:** `src/data/course/professions/space-astronomy/character-lines.ts` | Space character dialogue lines |
| **Modify:** `src/data/course/character-arcs.ts` | Add `sectionCharacterMap` type |
| **Modify:** `src/data/course/professions/*/characters.ts` | Add section-to-character mapping |
| **Modify:** `src/lib/story-utils.ts` | Add `getCharacterForSection()`, `loadCharacterLines()` |
| **Modify:** `src/components/lesson/TeachingCard.tsx` | Accept optional character prop, show character emoji + name instead of mascot |
| **Modify:** `src/components/lesson/MicroCelebration.tsx` | Accept optional character, use character emoji + personalized text |
| **Modify:** `src/components/lesson/LessonView.tsx` | Load active character for current unit's section, pass to TeachingCard + MicroCelebration |
| **Modify:** `src/components/lesson/ResultScreen.tsx` | Show character comment based on score |
| **Modify:** `src/components/course/UnitHeader.tsx` | Show character emoji badge on units |
| **Modify:** `src/components/course/CourseMap.tsx` | Load characters, pass to UnitHeader |
| **Create:** `src/__tests__/lib/character-lines.test.ts` | Validate character line data |

---

### Task 1: Define Character Line Types and Section Mapping

**Files:**
- Modify: `src/data/course/character-arcs.ts`
- Create: `src/data/course/character-lines.ts`

- [ ] **Step 1: Add section-to-character mapping type to character-arcs.ts**

In `src/data/course/character-arcs.ts`, add after the existing interfaces:

```typescript
/**
 * Maps section indices to the primary character for that section.
 * Characters alternate or are assigned thematically.
 */
export type SectionCharacterMap = Record<number, string>; // sectionIndex → characterId
```

- [ ] **Step 2: Create character-lines.ts with dialogue types**

Create `src/data/course/character-lines.ts`:

```typescript
import type { CharacterArc } from './character-arcs';

/** A character's comment on a teaching card. */
export interface CharacterTeachingLine {
  /** Regex or substring match against the teaching card's question text. null = default/fallback line. */
  match: string | null;
  /** What the character says instead of showing the generic mascot. */
  line: string;
}

/** A character's reaction to lesson results. */
export interface CharacterResultLine {
  /** Minimum accuracy to trigger this line (0-100). Lines checked high-to-low. */
  minAccuracy: number;
  line: string;
}

/** A character's mid-lesson reaction (replaces generic micro-celebration text). */
export interface CharacterCelebrationLine {
  type: 'halfway' | 'last-question' | 'streak';
  line: string;
}

/** All dialogue lines for one character. */
export interface CharacterLines {
  characterId: string;
  teachingLines: CharacterTeachingLine[];
  resultLines: CharacterResultLine[];
  celebrationLines: CharacterCelebrationLine[];
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/course/character-arcs.ts src/data/course/character-lines.ts
git commit -m "feat(story): add character line types and section mapping"
```

---

### Task 2: Add Section-Character Mappings to Each Course

**Files:**
- Modify: `src/data/course/professions/personal-finance/characters.ts`
- Modify: `src/data/course/professions/psychology/characters.ts`
- Modify: `src/data/course/professions/space-astronomy/characters.ts`

- [ ] **Step 1: Add section map to Personal Finance characters.ts**

Add after the `financeCharacters` array:

```typescript
import type { SectionCharacterMap } from '../../character-arcs';

/** Alex handles odd sections, Jordan handles even sections. */
export const financeSectionCharacterMap: SectionCharacterMap = {
  1: 'pf-alex',    // What Is Money?
  2: 'pf-jordan',  // Spending & Budgeting
  3: 'pf-alex',    // Saving & Emergency Planning
  4: 'pf-jordan',  // Banking & Financial Systems
  5: 'pf-alex',    // Credit & Debt
  6: 'pf-jordan',  // Taxes & Insurance
  7: 'pf-alex',    // Investing
};
```

- [ ] **Step 2: Add section map to Psychology characters.ts**

```typescript
import type { SectionCharacterMap } from '../../character-arcs';

/** Dr. Maya teaches core theory sections, Sam handles applied/personal sections. */
export const psychologySectionCharacterMap: SectionCharacterMap = {
  1: 'psy-maya',   // Welcome to Your Mind
  2: 'psy-sam',    // How You Sense the World
  3: 'psy-maya',   // Learning
  4: 'psy-sam',    // How Your Memory Works
  5: 'psy-maya',   // Thinking & Intelligence
  6: 'psy-sam',    // Motivation & Emotion
  7: 'psy-maya',   // Development
  8: 'psy-sam',    // Social Psychology
  9: 'psy-maya',   // Psychological Disorders
};
```

- [ ] **Step 3: Add section map to Space characters.ts**

```typescript
import type { SectionCharacterMap } from '../../character-arcs';

/** Captain Nova handles observational/technical sections, Kai handles exploration/wonder sections. */
export const spaceSectionCharacterMap: SectionCharacterMap = {
  1: 'space-kai',    // Looking Up
  2: 'space-kai',    // The Solar System
  3: 'space-nova',   // Earth & Moon
  4: 'space-nova',   // Light & Telescopes
  5: 'space-kai',    // Stars
  6: 'space-nova',   // Galaxies
  7: 'space-kai',    // Black Holes & Exotics
  8: 'space-nova',   // Cosmology
  9: 'space-kai',    // Rockets & Spaceflight
  10: 'space-nova',  // Space Exploration History
  11: 'space-kai',   // Exoplanets
  12: 'space-nova',  // Astrophotography
  13: 'space-kai',   // Space Frontiers
  14: 'space-nova',  // Communication & Perspective
};
```

- [ ] **Step 4: Commit**

```bash
git add src/data/course/professions/*/characters.ts
git commit -m "feat(story): add section-character maps to all courses"
```

---

### Task 3: Write Character Dialogue Lines for All Courses

**Files:**
- Create: `src/data/course/professions/personal-finance/character-lines.ts`
- Create: `src/data/course/professions/psychology/character-lines.ts`
- Create: `src/data/course/professions/space-astronomy/character-lines.ts`

- [ ] **Step 1: Create Personal Finance character lines**

Create `src/data/course/professions/personal-finance/character-lines.ts`:

```typescript
import type { CharacterLines } from '../../character-lines';

export const financeCharacterLines: CharacterLines[] = [
  {
    characterId: 'pf-alex',
    teachingLines: [
      { match: 'budget', line: "OK so budgets aren't as boring as I thought. Let me break this down." },
      { match: 'save', line: "Saving money? Me? Yeah I know, plot twist. But check this out." },
      { match: 'credit', line: "I learned this the hard way. Credit scores are no joke." },
      { match: 'invest', line: "Future Alex is gonna thank us for learning this." },
      { match: 'tax', line: "Taxes are confusing but stick with me here." },
      { match: 'bank', line: "I used to stuff cash in my sock drawer. This is better." },
      { match: 'spend', line: "I feel personally attacked by this lesson but here we go." },
      { match: null, line: "Alright, pay attention. This one actually matters." },
    ],
    resultLines: [
      { minAccuracy: 100, line: "Perfect?! OK who are you and what did you do with me?" },
      { minAccuracy: 90, line: "Dude, you're crushing this. I'm almost jealous." },
      { minAccuracy: 70, line: "Solid work. Better than my first credit card application." },
      { minAccuracy: 50, line: "We'll get there. Took me 3 tries to understand APR." },
      { minAccuracy: 0, line: "Hey, showing up is step one. I believe in us." },
    ],
    celebrationLines: [
      { type: 'halfway', line: "Halfway! That's further than I got with my budget last month." },
      { type: 'last-question', line: "Last one! Don't choke like I did on my tax return." },
      { type: 'streak', line: "You're on fire! My wallet is impressed." },
    ],
  },
  {
    characterId: 'pf-jordan',
    teachingLines: [
      { match: 'budget', line: "I track every dollar. Here's why it changed everything for me." },
      { match: 'save', line: "When you have kids, saving isn't optional. Let me show you." },
      { match: 'debt', line: "I've stared at $38,000 in loans. This part? I know it cold." },
      { match: 'emergency', line: "My emergency fund saved us when the car broke down. Trust me on this." },
      { match: 'invest', line: "I was terrified to invest. Then I ran the numbers." },
      { match: null, line: "Here's what I wish someone had told me 10 years ago." },
    ],
    resultLines: [
      { minAccuracy: 100, line: "Perfect score. You just did what I couldn't at 22." },
      { minAccuracy: 90, line: "Excellent. You clearly take this seriously." },
      { minAccuracy: 70, line: "Good progress. The details will stick with practice." },
      { minAccuracy: 50, line: "Don't worry. Financial literacy is a marathon, not a sprint." },
      { minAccuracy: 0, line: "Rough round, but you showed up. That's what matters." },
    ],
    celebrationLines: [
      { type: 'halfway', line: "Halfway there. Steady progress wins the race." },
      { type: 'last-question', line: "One more. Focus. You've got this." },
      { type: 'streak', line: "That streak! Consistency is everything." },
    ],
  },
];
```

- [ ] **Step 2: Create Psychology character lines**

Create `src/data/course/professions/psychology/character-lines.ts`:

```typescript
import type { CharacterLines } from '../../character-lines';

export const psychologyCharacterLines: CharacterLines[] = [
  {
    characterId: 'psy-maya',
    teachingLines: [
      { match: 'brain', line: "The brain is the only organ that studies itself. Think about that." },
      { match: 'memory', line: "Memory isn't a recording. It's a reconstruction. Every single time." },
      { match: 'Pavlov', line: "Pavlov's dogs are famous, but the real lesson is about your phone." },
      { match: 'bias', line: "We all have biases. The question is whether you can catch yours." },
      { match: 'emotion', line: "Emotions aren't the opposite of logic. They're data." },
      { match: 'perception', line: "You don't see reality. You see your brain's best guess." },
      { match: null, line: "Let me share something from my research that might surprise you." },
    ],
    resultLines: [
      { minAccuracy: 100, line: "Flawless. You'd do well in my graduate seminar." },
      { minAccuracy: 90, line: "Impressive recall. Your encoding strategies are working." },
      { minAccuracy: 70, line: "Good foundation. The nuances come with spaced repetition." },
      { minAccuracy: 50, line: "The forgetting curve is real. Review and you'll retain more." },
      { minAccuracy: 0, line: "Interesting pattern. Let's figure out where the confusion is." },
    ],
    celebrationLines: [
      { type: 'halfway', line: "Halfway through. Your working memory is performing well." },
      { type: 'last-question', line: "Final question. Trust your retrieval process." },
      { type: 'streak', line: "Beautiful streak. That's deep encoding in action." },
    ],
  },
  {
    characterId: 'psy-sam',
    teachingLines: [
      { match: 'brain', line: "Wait, so my brain has been lying to me this whole time?" },
      { match: 'memory', line: "I always thought I had a great memory. Turns out... nope." },
      { match: 'social', line: "This explains so much about group chats. Seriously." },
      { match: 'habit', line: "I've been trying to break a habit for years. This actually helps." },
      { match: 'attention', line: "They say I have the attention span of a goldfish. Let's test that." },
      { match: null, line: "No way. This is actually wild. Check this out." },
    ],
    resultLines: [
      { minAccuracy: 100, line: "PERFECT. I'm literally texting my friends about this." },
      { minAccuracy: 90, line: "Dude, we're basically psychology experts now." },
      { minAccuracy: 70, line: "Not bad! I got a similar score on my midterm. We're fine." },
      { minAccuracy: 50, line: "OK so maybe I zoned out. Let's try that again sometime." },
      { minAccuracy: 0, line: "Rough one. But hey, we just learned about growth mindset right?" },
    ],
    celebrationLines: [
      { type: 'halfway', line: "Halfway! My attention span is holding. Barely." },
      { type: 'last-question', line: "Last one! Don't let confirmation bias trick you." },
      { type: 'streak', line: "Streak! My dopamine system is very happy right now." },
    ],
  },
];
```

- [ ] **Step 3: Create Space character lines**

Create `src/data/course/professions/space-astronomy/character-lines.ts`:

```typescript
import type { CharacterLines } from '../../character-lines';

export const spaceCharacterLines: CharacterLines[] = [
  {
    characterId: 'space-nova',
    teachingLines: [
      { match: 'telescope', line: "When I first looked through a space telescope's data feed, I forgot to breathe." },
      { match: 'star', line: "Every star you see is a sun. Some with planets. Some already dead." },
      { match: 'Earth', line: "From 400 km up, Earth has no borders. Just ocean, land, and clouds." },
      { match: 'galaxy', line: "The Milky Way has 200 billion stars. We've studied maybe a million." },
      { match: 'light', line: "Light is the only messenger from the cosmos. Learning to read it changes everything." },
      { match: 'orbit', line: "In orbit, you fall around the Earth. That's all an orbit is. Falling and missing." },
      { match: null, line: "Let me tell you what this looks like from up there." },
    ],
    resultLines: [
      { minAccuracy: 100, line: "Flawless navigation. Mission control would be proud." },
      { minAccuracy: 90, line: "Excellent work. You'd pass the astronaut knowledge exam." },
      { minAccuracy: 70, line: "Solid. Every astronaut started exactly where you are." },
      { minAccuracy: 50, line: "Space is vast and so is the learning curve. Stay with it." },
      { minAccuracy: 0, line: "Even the best missions have rough patches. Debrief and try again." },
    ],
    celebrationLines: [
      { type: 'halfway', line: "Halfway through. Steady trajectory." },
      { type: 'last-question', line: "Final approach. Maintain focus." },
      { type: 'streak', line: "Outstanding streak. Mission is go." },
    ],
  },
  {
    characterId: 'space-kai',
    teachingLines: [
      { match: 'planet', line: "Dude, there are planets made of DIAMOND out there. Just saying." },
      { match: 'telescope', line: "My Dobsonian cost less than a PS5 and I can see Saturn's rings. Best trade ever." },
      { match: 'star', line: "That's insane. Stars are basically giant nuclear explosions that last billions of years." },
      { match: 'moon', line: "I tracked the moon phases for a month. It's actually way cooler than I expected." },
      { match: 'light', line: "So when I look at Andromeda I'm seeing 2.5 million year old light? My brain hurts." },
      { match: null, line: "OK this blew my mind. You gotta see this." },
    ],
    resultLines: [
      { minAccuracy: 100, line: "PERFECT. I'm literally shaking. We're space geniuses." },
      { minAccuracy: 90, line: "That's insane! We crushed it!" },
      { minAccuracy: 70, line: "Pretty solid! Better than my first astronomy quiz for sure." },
      { minAccuracy: 50, line: "Space is hard, man. But we're learning." },
      { minAccuracy: 0, line: "OK that was rough. But dude, even NASA had failed missions." },
    ],
    celebrationLines: [
      { type: 'halfway', line: "Halfway! We're cruising through the cosmos!" },
      { type: 'last-question', line: "Last one! Don't let the gravity of the moment get you. Ha." },
      { type: 'streak', line: "STREAK! We're going interstellar!" },
    ],
  },
];
```

- [ ] **Step 4: Commit**

```bash
git add src/data/course/professions/*/character-lines.ts
git commit -m "feat(story): add character dialogue lines for all 6 characters"
```

---

### Task 4: Add Character Loading to story-utils.ts

**Files:**
- Modify: `src/lib/story-utils.ts`

- [ ] **Step 1: Add loadSectionCharacterMap and loadCharacterLines loaders**

Add to `src/lib/story-utils.ts` after the existing `loadStoryUnlocks` function:

```typescript
import type { SectionCharacterMap } from '@/data/course/character-arcs';
import type { CharacterLines } from '@/data/course/character-lines';

export async function loadSectionCharacterMap(professionId: string): Promise<SectionCharacterMap> {
  switch (professionId) {
    case PROFESSION_ID.PERSONAL_FINANCE: {
      const m = await import('@/data/course/professions/personal-finance/characters');
      return m.financeSectionCharacterMap;
    }
    case PROFESSION_ID.PSYCHOLOGY: {
      const m = await import('@/data/course/professions/psychology/characters');
      return m.psychologySectionCharacterMap;
    }
    case PROFESSION_ID.SPACE_ASTRONOMY: {
      const m = await import('@/data/course/professions/space-astronomy/characters');
      return m.spaceSectionCharacterMap;
    }
    default:
      return {};
  }
}

export async function loadCharacterLines(professionId: string): Promise<CharacterLines[]> {
  switch (professionId) {
    case PROFESSION_ID.PERSONAL_FINANCE: {
      const m = await import('@/data/course/professions/personal-finance/character-lines');
      return m.financeCharacterLines;
    }
    case PROFESSION_ID.PSYCHOLOGY: {
      const m = await import('@/data/course/professions/psychology/character-lines');
      return m.psychologyCharacterLines;
    }
    case PROFESSION_ID.SPACE_ASTRONOMY: {
      const m = await import('@/data/course/professions/space-astronomy/character-lines');
      return m.spaceCharacterLines;
    }
    default:
      return [];
  }
}

/** Get the character for a given section index from the section map. */
export function getCharacterForSection(
  sectionIndex: number | undefined,
  sectionMap: SectionCharacterMap,
  characters: CharacterArc[],
): CharacterArc | null {
  if (sectionIndex === undefined) return null;
  const charId = sectionMap[sectionIndex];
  if (!charId) return null;
  return characters.find((c) => c.id === charId) ?? null;
}

/** Find the best matching teaching line for a question. */
export function getTeachingLine(
  questionText: string,
  characterId: string,
  allLines: CharacterLines[],
): string | null {
  const charLines = allLines.find((cl) => cl.characterId === characterId);
  if (!charLines) return null;
  // Try matching lines first
  for (const tl of charLines.teachingLines) {
    if (tl.match && questionText.toLowerCase().includes(tl.match.toLowerCase())) {
      return tl.line;
    }
  }
  // Fallback to default (match: null)
  const fallback = charLines.teachingLines.find((tl) => tl.match === null);
  return fallback?.line ?? null;
}

/** Get result comment based on accuracy. */
export function getResultLine(
  accuracy: number,
  characterId: string,
  allLines: CharacterLines[],
): string | null {
  const charLines = allLines.find((cl) => cl.characterId === characterId);
  if (!charLines) return null;
  // Lines are sorted high-to-low by minAccuracy
  const sorted = [...charLines.resultLines].sort((a, b) => b.minAccuracy - a.minAccuracy);
  for (const rl of sorted) {
    if (accuracy >= rl.minAccuracy) return rl.line;
  }
  return null;
}

/** Get celebration line for a specific type. */
export function getCelebrationLine(
  type: 'halfway' | 'last-question' | 'streak',
  characterId: string,
  allLines: CharacterLines[],
): string | null {
  const charLines = allLines.find((cl) => cl.characterId === characterId);
  if (!charLines) return null;
  return charLines.celebrationLines.find((cl) => cl.type === type)?.line ?? null;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/story-utils.ts
git commit -m "feat(story): add character line loaders and matchers"
```

---

### Task 5: Integrate Characters into TeachingCard

**Files:**
- Modify: `src/components/lesson/TeachingCard.tsx`

- [ ] **Step 1: Add optional character prop and render character instead of mascot**

Add to the `TeachingCardProps` interface:

```typescript
interface TeachingCardProps {
  question: CourseQuestion;
  unitColor: string;
  onGotIt: () => void;
  hasBackground?: boolean;
  bgTheme?: 'dark' | 'light' | null;
  /** Course character for this section (replaces generic mascot). */
  character?: { emoji: string; name: string } | null;
  /** Character's contextual line for this teaching card. */
  characterLine?: string | null;
}
```

Replace the mascot rendering block (lines 112-132) with:

```tsx
{/* Character or Mascot */}
<motion.div
  initial={{ scale: 0.5, rotate: -10 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.05 }}
>
  {character ? (
    <div className="flex flex-col items-center gap-1">
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: tc.isGlass
            ? `radial-gradient(circle, ${tc.accentSoft}30 0%, transparent 70%)`
            : `radial-gradient(circle, ${unitColor}18 0%, transparent 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
        }}
        aria-hidden="true"
      >
        {character.emoji}
      </div>
      <span style={{ fontSize: 11, fontWeight: 800, color: tc.accentSoft, letterSpacing: 0.5 }}>
        {character.name}
      </span>
    </div>
  ) : (
    <div
      style={{
        width: 120, height: 120, borderRadius: '50%',
        background: tc.isGlass
          ? `radial-gradient(circle, ${tc.accentSoft}30 0%, transparent 70%)`
          : `radial-gradient(circle, ${unitColor}18 0%, transparent 70%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Mascot pose={pose} size={84} />
    </div>
  )}
</motion.div>
```

Replace the one-liner section to show `characterLine` when available. Before the existing one-liner `<motion.div>`, add:

```tsx
{/* Character line (replaces one-liner when character is present) */}
{character && characterLine && (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.3 }}
    style={{
      fontSize: 13,
      fontWeight: 700,
      color: tc.accentSoft,
      fontStyle: 'italic',
      maxWidth: 300,
      marginBottom: -4,
    }}
  >
    &ldquo;{characterLine}&rdquo;
  </motion.div>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/lesson/TeachingCard.tsx
git commit -m "feat(story): teaching cards show character emoji + dialogue line"
```

---

### Task 6: Integrate Characters into MicroCelebration

**Files:**
- Modify: `src/components/lesson/MicroCelebration.tsx`

- [ ] **Step 1: Add optional character prop**

Update the interface and rendering:

```typescript
interface MicroCelebrationProps {
  type: CelebrationType;
  streakCount?: number;
  /** Course character for personalized celebration text. */
  character?: { emoji: string; name: string } | null;
  /** Character's line for this celebration type. */
  characterLine?: string | null;
  onDismiss?: () => void;
}
```

In the component, when `character` and `characterLine` are provided, replace the mascot and text:

```tsx
{character ? (
  <span className="text-2xl flex-shrink-0" aria-hidden="true">{character.emoji}</span>
) : (
  <Mascot pose={config.pose} size={36} />
)}
<span className="text-sm font-bold" style={{ color: config.textColor }}>
  {characterLine || config.text}
</span>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/lesson/MicroCelebration.tsx
git commit -m "feat(story): micro-celebrations show character emoji + personalized text"
```

---

### Task 7: Wire Characters into LessonView

**Files:**
- Modify: `src/components/lesson/LessonView.tsx`

This is the main wiring task. LessonView needs to:
1. Know the current unit's `sectionIndex`
2. Load the character for that section
3. Load character lines
4. Pass character + line to TeachingCard and MicroCelebration

- [ ] **Step 1: Add character state and loading**

Add state near the top of the component (after existing state declarations):

```typescript
const [lessonCharacter, setLessonCharacter] = useState<{ emoji: string; name: string } | null>(null);
const [characterLines, setCharacterLines] = useState<import('@/data/course/character-lines').CharacterLines[] | null>(null);
const characterIdRef = useRef<string | null>(null);
```

Add a useEffect to load character data when the lesson starts:

```typescript
// Load character for this lesson's section
useEffect(() => {
  if (!activeLesson || !courseMeta) return;
  const unit = courseMeta[activeLesson.unitIndex];
  if (!unit?.sectionIndex) return;

  let cancelled = false;
  (async () => {
    const { loadCharacters, loadSectionCharacterMap, loadCharacterLines, getCharacterForSection } = await import('@/lib/story-utils');
    const profId = useCourseStore.getState().activeProfession;
    const [characters, sectionMap, lines] = await Promise.all([
      loadCharacters(profId),
      loadSectionCharacterMap(profId),
      loadCharacterLines(profId),
    ]);
    if (cancelled) return;
    const char = getCharacterForSection(unit.sectionIndex, sectionMap, characters);
    if (char) {
      setLessonCharacter({ emoji: char.emoji, name: char.name });
      characterIdRef.current = char.id;
      setCharacterLines(lines);
    }
  })();
  return () => { cancelled = true; };
}, [activeLesson?.unitIndex]); // eslint-disable-line react-hooks/exhaustive-deps
```

- [ ] **Step 2: Compute teaching line for current question**

Add a memo:

```typescript
const teachingLine = useMemo(() => {
  if (!lessonCharacter || !characterLines || !characterIdRef.current) return null;
  if (displayQuestion?.type !== 'teaching') return null;
  const { getTeachingLine } = require('@/lib/story-utils');
  return getTeachingLine(displayQuestion.question, characterIdRef.current, characterLines);
}, [lessonCharacter, characterLines, displayQuestion]);
```

- [ ] **Step 3: Pass character to TeachingCard**

Where `<TeachingCard>` is rendered, add the character props:

```tsx
<TeachingCard
  question={displayQuestion}
  unitColor={unitColor}
  onGotIt={handleTeachingGotIt}
  hasBackground={!!lesson?.background}
  bgTheme={bgTheme}
  character={lessonCharacter}
  characterLine={teachingLine}
/>
```

- [ ] **Step 4: Compute celebration line and pass to MicroCelebration**

Add a memo for celebration line:

```typescript
const celebrationLine = useMemo(() => {
  if (!lessonCharacter || !characterLines || !characterIdRef.current || !celebration) return null;
  const { getCelebrationLine } = require('@/lib/story-utils');
  return getCelebrationLine(celebration.type, characterIdRef.current, characterLines);
}, [lessonCharacter, characterLines, celebration]);
```

Pass to MicroCelebration:

```tsx
<MicroCelebration
  type={celebration.type}
  streakCount={celebration.type === 'streak' ? celebration.value : undefined}
  character={lessonCharacter}
  characterLine={celebrationLine}
  onDismiss={() => setCelebration(null)}
/>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/lesson/LessonView.tsx
git commit -m "feat(story): wire character into teaching cards + micro-celebrations"
```

---

### Task 8: Add Character Comments to ResultScreen

**Files:**
- Modify: `src/components/lesson/ResultScreen.tsx`

- [ ] **Step 1: Accept character props and show comment**

Add props to ResultScreen (or read from a context/store). The simplest approach: store the active character in `useCourseStore` when a lesson starts, read it in ResultScreen.

Add to the `ResultScreenProps` interface (or read from store):

```typescript
// At top of ResultScreen, read character from parent or store
const [resultCharacter, setResultCharacter] = useState<{ emoji: string; name: string; line: string } | null>(null);
```

Add a useEffect that loads the character comment on mount:

```typescript
useEffect(() => {
  (async () => {
    const profId = useCourseStore.getState().activeProfession;
    const unitIndex = useCourseStore.getState().lastCompletedUnitIndex;
    const courseMeta = getCourseMetaForProfession(profId);
    const unit = courseMeta?.[unitIndex ?? 0];
    if (!unit?.sectionIndex) return;

    const { loadCharacters, loadSectionCharacterMap, loadCharacterLines, getCharacterForSection, getResultLine }
      = await import('@/lib/story-utils');
    const [characters, sectionMap, lines] = await Promise.all([
      loadCharacters(profId),
      loadSectionCharacterMap(profId),
      loadCharacterLines(profId),
    ]);
    const char = getCharacterForSection(unit.sectionIndex, sectionMap, characters);
    if (!char) return;
    const line = getResultLine(lessonResult.accuracy, char.id, lines);
    if (line) setResultCharacter({ emoji: char.emoji, name: char.name, line });
  })();
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

Render the character comment below the stats cards:

```tsx
{resultCharacter && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="flex items-center gap-3 rounded-2xl px-4 py-3 mx-4 mt-4"
    style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.15)' }}
  >
    <span className="text-3xl flex-shrink-0" aria-hidden="true">{resultCharacter.emoji}</span>
    <div>
      <div className="text-xs font-bold text-white/50 uppercase tracking-wider">{resultCharacter.name}</div>
      <div className="text-sm font-semibold text-white/90">&ldquo;{resultCharacter.line}&rdquo;</div>
    </div>
  </motion.div>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/lesson/ResultScreen.tsx
git commit -m "feat(story): result screen shows character comment based on accuracy"
```

---

### Task 9: Add Character Badge to Course Map UnitHeader

**Files:**
- Modify: `src/components/course/UnitHeader.tsx`
- Modify: `src/components/course/CourseMap.tsx`

- [ ] **Step 1: Add character prop to UnitHeader**

Add to `UnitHeaderProps`:

```typescript
/** Character emoji for this unit's section. */
characterEmoji?: string | null;
```

Render it as a small badge on the unit illustration. In the top-right of the illustration area, add:

```tsx
{characterEmoji && (
  <div
    style={{
      position: 'absolute',
      top: -4,
      right: -4,
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'white',
      border: `2px solid ${bg}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      zIndex: 2,
      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    }}
    aria-hidden="true"
  >
    {characterEmoji}
  </div>
)}
```

Make the illustration container `position: relative` if it isn't already.

- [ ] **Step 2: Load characters in CourseMap and pass to UnitHeader**

In CourseMap, add a state + effect to load the section character map:

```typescript
const [charEmojiMap, setCharEmojiMap] = useState<Record<number, string>>({});

useEffect(() => {
  (async () => {
    const { loadCharacters, loadSectionCharacterMap, getCharacterForSection } = await import('@/lib/story-utils');
    const profId = useCourseStore.getState().activeProfession;
    const [characters, sectionMap] = await Promise.all([
      loadCharacters(profId),
      loadSectionCharacterMap(profId),
    ]);
    const map: Record<number, string> = {};
    for (const [secIdx, charId] of Object.entries(sectionMap)) {
      const char = characters.find(c => c.id === charId);
      if (char) map[Number(secIdx)] = char.emoji;
    }
    setCharEmojiMap(map);
  })();
}, []);
```

When rendering `<UnitHeader>`, pass the emoji:

```tsx
<UnitHeader
  {...existingProps}
  characterEmoji={charEmojiMap[unit.sectionIndex ?? -1] ?? null}
/>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/course/UnitHeader.tsx src/components/course/CourseMap.tsx
git commit -m "feat(story): show character emoji badge on course map units"
```

---

### Task 10: Write Data Validation Tests

**Files:**
- Create: `src/__tests__/lib/character-lines.test.ts`

- [ ] **Step 1: Write validation tests**

```typescript
import { describe, it, expect } from 'vitest';

describe('Character lines data validation', () => {
  it('all personal finance characters have complete lines', async () => {
    const { financeCharacterLines } = await import('@/data/course/professions/personal-finance/character-lines');
    const { financeCharacters } = await import('@/data/course/professions/personal-finance/characters');

    for (const char of financeCharacters) {
      const lines = financeCharacterLines.find(cl => cl.characterId === char.id);
      expect(lines, `Missing lines for ${char.id}`).toBeDefined();
      expect(lines!.teachingLines.length).toBeGreaterThanOrEqual(2);
      expect(lines!.resultLines.length).toBeGreaterThanOrEqual(3);
      expect(lines!.celebrationLines.length).toBe(3);
      // Must have a fallback teaching line (match: null)
      expect(lines!.teachingLines.some(tl => tl.match === null)).toBe(true);
      // Result lines must cover 0% accuracy
      expect(lines!.resultLines.some(rl => rl.minAccuracy === 0)).toBe(true);
    }
  });

  it('all psychology characters have complete lines', async () => {
    const { psychologyCharacterLines } = await import('@/data/course/professions/psychology/character-lines');
    const { psychologyCharacters } = await import('@/data/course/professions/psychology/characters');

    for (const char of psychologyCharacters) {
      const lines = psychologyCharacterLines.find(cl => cl.characterId === char.id);
      expect(lines, `Missing lines for ${char.id}`).toBeDefined();
      expect(lines!.teachingLines.length).toBeGreaterThanOrEqual(2);
      expect(lines!.resultLines.length).toBeGreaterThanOrEqual(3);
      expect(lines!.celebrationLines.length).toBe(3);
      expect(lines!.teachingLines.some(tl => tl.match === null)).toBe(true);
      expect(lines!.resultLines.some(rl => rl.minAccuracy === 0)).toBe(true);
    }
  });

  it('all space characters have complete lines', async () => {
    const { spaceCharacterLines } = await import('@/data/course/professions/space-astronomy/character-lines');
    const { spaceCharacters } = await import('@/data/course/professions/space-astronomy/characters');

    for (const char of spaceCharacters) {
      const lines = spaceCharacterLines.find(cl => cl.characterId === char.id);
      expect(lines, `Missing lines for ${char.id}`).toBeDefined();
      expect(lines!.teachingLines.length).toBeGreaterThanOrEqual(2);
      expect(lines!.resultLines.length).toBeGreaterThanOrEqual(3);
      expect(lines!.celebrationLines.length).toBe(3);
      expect(lines!.teachingLines.some(tl => tl.match === null)).toBe(true);
      expect(lines!.resultLines.some(rl => rl.minAccuracy === 0)).toBe(true);
    }
  });

  it('section character maps reference valid character IDs', async () => {
    const { financeCharacters, financeSectionCharacterMap } = await import('@/data/course/professions/personal-finance/characters');
    const { psychologyCharacters, psychologySectionCharacterMap } = await import('@/data/course/professions/psychology/characters');
    const { spaceCharacters, spaceSectionCharacterMap } = await import('@/data/course/professions/space-astronomy/characters');

    const validIds = new Set([
      ...financeCharacters.map(c => c.id),
      ...psychologyCharacters.map(c => c.id),
      ...spaceCharacters.map(c => c.id),
    ]);

    for (const charId of Object.values(financeSectionCharacterMap)) {
      expect(validIds.has(charId), `Invalid char ID: ${charId}`).toBe(true);
    }
    for (const charId of Object.values(psychologySectionCharacterMap)) {
      expect(validIds.has(charId), `Invalid char ID: ${charId}`).toBe(true);
    }
    for (const charId of Object.values(spaceSectionCharacterMap)) {
      expect(validIds.has(charId), `Invalid char ID: ${charId}`).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npm test -- --reporter=verbose src/__tests__/lib/character-lines.test.ts
```

Expected: All 4 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/__tests__/lib/character-lines.test.ts
git commit -m "test(story): validate character lines data completeness"
```

---

## Summary

| Integration Point | What Changes | User Experience |
|---|---|---|
| **Teaching cards** | Character emoji + name replaces generic mascot; character says a contextual line | "Kai says: That's insane. Stars are giant nuclear explosions." |
| **Micro-celebrations** | Character emoji replaces mascot; personalized streak/halfway text | "Halfway! We're cruising through the cosmos!" (with Kai emoji) |
| **Result screen** | Character comment bubble below stats | "Pretty solid! Better than my first astronomy quiz." |
| **Course map** | Character emoji badge on each unit header | Users see which character "owns" each section |

**Total new files:** 4 (character-lines types + 3 course data files + 1 test file)
**Total modified files:** 7 (story-utils, TeachingCard, MicroCelebration, LessonView, ResultScreen, UnitHeader, CourseMap)
**Estimated effort:** ~4 hours
