# Octokeen Content Architecture Guide

> The complete rulebook for building courses that take learners from zero knowledge to mastery. Every course, unit, lesson, and question must follow these rules.

---

## Philosophy

### Why
Professional knowledge used to require expensive degrees, dense textbooks, and years of trial and error. Octokeen makes it accessible to everyone. A screen, a few minutes a day, and the motivation to grow. That's all you need.

### How
Learning should feel like play, not pain. We combine bite-sized lessons, spaced repetition, and game mechanics to make learning effective without making it a chore. Every session should end with the learner feeling smarter than when they started.

**Everyone can Octokeen.**

### Brand personality

| Trait | What it means |
|-------|---------------|
| **Inspiring** | Every lesson unlocks a new ability. Knowledge is power, not obligation. |
| **Inclusive** | Write for everyone. Never assume prior knowledge unless the course guarantees it. |
| **Can-do** | Root for the learner. They can do this. |
| **Curious** | Make learners want to know more. Tease the "why" before the answer. |
| **Quirky** | Put the fun in fundamentals. Never boring, never intimidating. |

---

## Level 1: Course Architecture

A course is a complete learning journey on one subject. It takes someone from knowing absolutely nothing to being genuinely knowledgeable, confident, and able to apply what they've learned.

### Course structure

| Rule | Requirement |
|------|-------------|
| **Units** | 10-15 units per course |
| **Total lessons** | 150-250 lessons (after splitting into bite-sized pieces) |
| **Total questions** | 1,500-2,500 questions |
| **Completion time** | 3-6 months at 5-10 min/day |
| **Progression** | Linear path. Each unit builds on the previous. |

### Course arc: the 4 phases

Every course must follow this arc, regardless of subject:

**Phase 1: Foundations (Units 1-3)**
- Teach the vocabulary and mental models of the field
- Define every term before using it
- Use simple, concrete examples (everyday life, not textbook)
- Build confidence. The learner should think "I can do this"
- Questions are mostly recognition: true/false, obvious multiple-choice, matching
- Heavy teaching card usage (3 per lesson)

**Phase 2: Core Knowledge (Units 4-7)**
- Introduce the main concepts and frameworks
- Connect ideas across topics ("remember when we learned X? Now see how it connects to Y")
- Start requiring application, not just recall
- Introduce harder question types: scenarios, order-steps, fill-blank
- Teaching cards shift from "what is X" to "how does X work" and "why does X matter"

**Phase 3: Depth & Nuance (Units 8-10)**
- Explore edge cases, exceptions, and real-world complexity
- Combine concepts from multiple earlier units
- Questions require judgment, not just memorization
- Conversations and case studies become more complex
- Teaching cards cover "when does X NOT apply" and "common mistakes"

**Phase 4: Mastery & Application (Units 11-15)**
- Synthesis: tie everything together
- Professional scenarios and real-world problem solving
- The learner should be able to explain concepts to others
- Questions simulate real decisions, interviews, or professional situations
- Final unit should feel like a capstone: "you now know enough to..."

### Course completeness checklist

Before a course ships, verify:

- [ ] Unit 1 Lesson 1 is understandable by someone with zero knowledge of the subject
- [ ] Every term is defined before it's used in a question
- [ ] No unit assumes knowledge that wasn't taught in a previous unit
- [ ] The final unit tests synthesis across the entire course
- [ ] Major sub-topics of the field are covered (compare against a university syllabus)
- [ ] At least 3 "real-world application" lessons exist
- [ ] Placement test covers all units so experienced learners can skip ahead

---

## Level 2: Unit Architecture

A unit is a collection of lessons on one broad topic. It should feel like a "chapter" that has a clear beginning, middle, and end.

### Unit structure

| Rule | Requirement |
|------|-------------|
| **Lessons per unit** | 12-20 standard lessons |
| **Special lessons** | 1 conversation + 1 speed-round (minimum) |
| **Teaching cards** | 2-3 per standard lesson |
| **Question types** | At least 5 different types used across the unit |
| **Difficulty** | First lesson is accessible. Last lesson is challenging. |
| **XP rewards** | Lower for early lessons (15-20), higher for later (25-35) |

### Unit lesson sequence

Every unit follows this pattern:

```
1-3.   Foundation lessons (easy, build vocabulary)
4-8.   Core concept lessons (medium, build understanding)
9-12.  Application lessons (harder, combine concepts)
13-15. Advanced lessons (challenging, edge cases, nuance)
16.    Conversation lesson (apply knowledge in dialogue)
17.    Speed-round lesson (rapid recall of the full unit)
```

### Unit rules

1. **The first lesson of every unit must start with a teaching card** that explains what this unit is about and why it matters. A learner should know what they're about to learn.

2. **The last standard lesson should be the hardest.** It should combine concepts from earlier lessons in the unit and optionally reference earlier units.

3. **Every unit needs bridge lessons.** When a concept from Unit 3 is needed in Unit 7, add a teaching card that says "In Unit 3 you learned X. Now we'll use that to understand Y."

4. **Conversation lessons come near the end** because they require applying multiple concepts from the unit.

5. **Speed-round lessons are always last** because they test recall of everything in the unit.

### Unit metadata

```typescript
{
  id: 'u1-statics',          // u[number]-[slug]
  title: 'Statics & Equilibrium',
  description: 'One sentence that tells the learner what they will be able to do after this unit.',
  color: '#10B981',           // unique per unit
  icon: '⚖️',                // one emoji
  topicId: 'engineering-mechanics',
}
```

---

## Level 3: Lesson Architecture

A lesson is a single learning session. It should take 3-5 minutes and teach exactly one sub-topic. After completing a lesson, the learner should be able to state what they just learned in one sentence.

### Lesson types

| Type | Purpose | When to use |
|------|---------|-------------|
| **Standard** | Teach + quiz on one sub-topic | 90% of lessons |
| **Conversation** | Apply knowledge in a realistic dialogue | 1 per unit (near end) |
| **Speed-round** | Rapid recall under time pressure | 1 per unit (last lesson) |
| **Timeline** | Decision-making with consequences over time | Optional. Great for finance, career topics. |
| **Case study** | Deep analysis of a real-world example | Optional. Great for advanced units. |

### Standard lesson structure

Every standard lesson has exactly this structure:

```
TEACHING CARD 1 — introduces the concept (position 1)
  Easy question — reinforces teaching card (almost impossible to get wrong)
  Easy question — slightly harder, still straightforward
  Medium question — requires understanding, not just recall

TEACHING CARD 2 — deepens or extends the concept (position 5-6)
  Medium question — different question type (match-pairs, sort-buckets, etc.)
  Medium question — applies concept to a scenario
  Hard question — combines concepts or requires judgment

TEACHING CARD 3 — adds nuance or real-world context (position 9-10, optional)
  Hard question — synthesis or tricky edge case
  Final question — ties the lesson together
```

### Standard lesson rules

| Rule | Requirement |
|------|-------------|
| **Total items** | 8-12 (teaching cards + questions) |
| **Teaching cards** | 2-3, spaced evenly (never clumped together) |
| **Question types** | At least 3 different types per lesson |
| **Difficulty** | Easy (2-3) → Medium (3-4) → Hard (2-3) |
| **After teaching cards** | The next question MUST be trivially easy |
| **Question type mix** | No more than 3 multiple-choice in a row |

### Question type targets per lesson

| Type | Target count | Notes |
|------|-------------|-------|
| Teaching cards | 2-3 | Spaced between questions |
| Multiple-choice | 2-4 | Backbone, but don't overuse |
| True/false | 1-2 | Great for easy questions after teaching |
| Fill-blank | 1 | Tests vocabulary recall |
| Match-pairs | 0-1 | Great for relationships and definitions |
| Sort-buckets | 0-1 | Great for categorization |
| Order-steps | 0-1 | Great for processes and sequences |

### Conversation lesson rules

| Rule | Requirement |
|------|-------------|
| **Decision points** | Exactly 3 |
| **Options per decision** | 3 (great / okay / poor quality) |
| **Scenario** | Realistic, related to the unit's topic |
| **Speaker messages** | 1-2 sentences max |
| **Feedback per option** | 1 sentence explaining why great/okay/poor |
| **Ending** | Narrator summarizes what was learned |
| **Total nodes** | 7-10 conversation nodes |

### Speed-round lesson rules

| Rule | Requirement |
|------|-------------|
| **Questions** | Exactly 15 |
| **Time limit** | 60 seconds |
| **Question text** | One short line, factual recall only |
| **Options** | 4 choices, each 1-4 words |
| **No explanations** | Speed focus, not teaching |
| **Coverage** | Questions should span the entire unit |
| **correctIndex** | Distributed roughly evenly across 0-3 |

### Timeline lesson rules (optional)

Timelines are branching narratives where choices have consequences over time. Great for finance (investment decisions), career topics, and project management.

| Rule | Requirement |
|------|-------------|
| **Stages** | 4-6 stages with narrative text |
| **Choices per stage** | 2-3 choices with impact descriptions |
| **Outcomes** | 2-3 possible endings (great / good / poor) |
| **Realism** | Scenarios should reflect real decisions with realistic consequences |

### Case-study lesson rules (optional)

Case studies are narrative-driven lessons with embedded question checkpoints. Great for advanced units where learners analyze real-world situations.

| Rule | Requirement |
|------|-------------|
| **Sections** | 3-5 narrative sections |
| **Checkpoints** | 1 question per section (any type) |
| **Narrative** | 2-3 sentences per section. Concrete, not abstract. |
| **Title** | Specific: "The Challenger Disaster" not "A Case Study" |

### Cross-unit references

When a later unit builds on an earlier concept:
- Add a teaching card that explicitly says: "In [Unit Name] you learned [concept]. Now we'll see how it connects to [new concept]."
- Never assume the learner remembers. Remind them.
- If a concept from Unit 2 is critical in Unit 8, briefly re-teach it. Don't just reference it.

### Review and repetition

The app handles spaced repetition through the mastery/practice system, but course content should also reinforce earlier learning:
- Later units should include 1-2 questions that test earlier unit concepts in a new context
- Speed-round lessons can include 2-3 questions from earlier units
- The final unit's conversation lesson should require knowledge from multiple earlier units

### Lesson metadata

```typescript
{
  id: 'u1-L1',               // u[unit]-L[lesson][optional: b, c]
  title: 'Forces as Vectors', // descriptive, specific to the sub-topic
  description: 'What this mini-lesson teaches in one sentence.',
  icon: '📝',                // 📝 for standard, 💬 for conversation, ⚡ for speed-round
  xpReward: 20,              // 15-35 based on difficulty
  levels: 4,                 // mastery stacks (1-4)
  questions: [...],
}
```

**Title rules:**
- Must describe the specific sub-topic, not the parent topic
- Good: "Thermal Stress, Composites & Toughness"
- Bad: "Stress & Strain Fundamentals II"
- Never use roman numerals, numbers, or "Part X" in titles

---

## Level 4: Question Architecture

### Teaching cards

Teaching cards are the most important element. They're how the app teaches. Every concept tested MUST be introduced in a teaching card first, either in the same lesson or in a prerequisite lesson.

```typescript
{
  id: 'u1-L1-T1',
  type: 'teaching',
  question: 'Short title under 8 words',  // no emojis, no punctuation except ? or !
  explanation: 'One or two sentences. The core concept, nothing more.',
  hint: 'One practical sentence.',
}
```

| Rule | Requirement |
|------|-------------|
| **Title** | Under 8 words. No emojis (mascot replaces them). Sentence case. |
| **Explanation** | Maximum 2 sentences. If you need more, use 2 teaching cards. |
| **Hint** | One sentence. Practical, not philosophical. Optional. |
| **No `options`** | Teaching cards render numbered pills that look clickable but aren't. |
| **No `diagram`** | Teaching cards are text-only. Diagrams go on the question that follows. |
| **"Try this now:"** | At least 2 per unit should include a real-world action in the hint. |

### Multiple-choice

The most common type. One clearly correct answer with 3 plausible-but-wrong distractors.

```typescript
{
  id: 'u1-L1-Q1',
  type: 'multiple-choice',
  question: 'One sentence question?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctIndex: 2,  // MUST be distributed across 0-3, not always 0
  explanation: 'One sentence explanation.',
  hint: 'One sentence hint.',
  diagram: '<svg>...</svg>',  // optional
}
```

| Rule | Requirement |
|------|-------------|
| **Options** | Exactly 4. Under 15 words each. Roughly equal length. |
| **Correct option** | Must NOT be noticeably longer than wrong options. |
| **Distractors** | Each wrong for a different reason. No two say the same wrong thing. |
| **correctIndex** | Must be distributed roughly 25% per position across the course. Never always 0. |
| **Explanation** | 1-2 sentences. State the fact, not a lecture. |

### True/false

Quick validation of a concept. Great for easy questions after teaching cards.

```typescript
{
  id: 'u1-L1-Q2',
  type: 'true-false',
  question: 'Clear, unambiguous statement.',
  correctAnswer: true,  // or false
  explanation: 'One sentence: the correct answer and why.',
}
```

| Rule | Requirement |
|------|-------------|
| **Statement** | Clear and unambiguous. No double negatives. |
| **Balance** | Roughly 50/50 true/false across the course. |

### Fill-blank

Tests vocabulary recall with a word bank. Blanks should test key terms, not filler words.

```typescript
{
  id: 'u1-L1-Q3',
  type: 'fill-blank',
  question: 'The _____ of a force is the perpendicular distance from the pivot to the line of action.',
  blanks: ['moment arm'],
  wordBank: ['moment arm', 'fulcrum', 'torque', 'lever', 'resultant'],
  explanation: 'The moment arm is the perpendicular distance used to calculate moment.',
}
```

| Rule | Requirement |
|------|-------------|
| **Blanks** | Key vocabulary, not filler words ("the", "a", "is"). |
| **Word bank** | Correct word(s) plus 3-4 plausible distractors. |
| **Sentence** | Simple. The blank should be guessable from context + teaching. |

### Sort-buckets

Sort 6 items into 2 categories. Tests classification and pattern recognition.

```typescript
{
  id: 'u1-L1-Q4',
  type: 'sort-buckets',
  question: 'Sort these into the correct category:',
  options: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  buckets: ['Category A', 'Category B'],
  correctBuckets: [0, 0, 0, 1, 1, 1],
  explanation: 'Brief explanation of the sorting logic.',
}
```

| Rule | Requirement |
|------|-------------|
| **Items** | Exactly 6, split evenly (3 per bucket). |
| **Buckets** | Exactly 2 with clear, short labels. |
| **Clarity** | Each item should clearly belong to one bucket, not debatable. |

### Match-pairs

Match 4 items on the left to 4 items on the right. Tests relationships and definitions.

```typescript
{
  id: 'u1-L1-Q5',
  type: 'match-pairs',
  question: 'Match each concept to its definition:',
  options: ['Left 1', 'Left 2', 'Left 3', 'Left 4'],
  matchTargets: ['Right 1', 'Right 2', 'Right 3', 'Right 4'],
  correctMatches: [0, 1, 2, 3],
  explanation: 'Brief explanation.',
}
```

| Rule | Requirement |
|------|-------------|
| **Pairs** | Exactly 4. Clear 1:1 mapping. |
| **No ambiguity** | No pair should logically match multiple targets. |
| **Items** | Short (under 8 words each). |

### Order-steps

Put 4-5 items in the correct sequence. Tests process understanding.

```typescript
{
  id: 'u1-L1-Q6',
  type: 'order-steps',
  question: 'Put these steps in the correct order:',
  steps: ['Step A', 'Step B', 'Step C', 'Step D', 'Step E'],
  correctOrder: [0, 1, 2, 3, 4],
  explanation: 'Brief explanation of the sequence.',
}
```

| Rule | Requirement |
|------|-------------|
| **Steps** | 4-5 items. Clear, unambiguous order. |
| **Items** | Short (under 12 words each). |

### Scenario

A story-based question with context. Tests application of concepts.

```typescript
{
  id: 'u1-L1-Q7',
  type: 'scenario',
  question: 'What should you do?',
  scenario: 'You are designing a bracket that must support 500 N. The bracket keeps bending at the mounting point.',
  options: ['Add a fillet to reduce stress concentration', 'Make the bracket thinner', 'Remove the mounting bolts', 'Paint the bracket'],
  correctIndex: 0,
  explanation: 'Fillets reduce stress concentration at sharp corners.',
}
```

### Other types

| Type | When to use |
|------|-------------|
| **multi-select** | When 2+ options are correct. "Select all that apply." |
| **slider-estimate** | For numerical estimation. "Approximately how many...?" |
| **category-swipe** | Mobile-friendly sorting. Like sort-buckets but one item at a time. |
| **rank-order** | Like order-steps but ranking by a criteria ("lowest to highest risk"). |
| **pick-the-best** | All options are valid, but one is BEST. Tests judgment. |

---

## Level 5: Diagrams & Visuals

### When to use diagrams

| Use a diagram when... | Don't use a diagram when... |
|----------------------|---------------------------|
| The concept is spatial (forces, circuits, anatomy) | The question is purely verbal/conceptual |
| A chart or graph helps understanding | The diagram would just be decoration |
| The question asks about a physical system | The teaching card explains the concept clearly with words |
| Comparing visual differences matters | You're testing vocabulary, not visual understanding |

### Diagram rules

| Rule | Requirement |
|------|-------------|
| **Format** | Inline SVG in the `diagram` field |
| **Size** | `viewBox="0 0 80 80"` standard. Keep simple. |
| **Colors** | Use the unit's theme color. Green tones (#58CC02, #3B8700) for primary. |
| **Text in diagrams** | Labels only (F1, R2, x, y). Never answer text. |
| **Answer reveals** | A diagram must NEVER reveal or hint at the correct answer. |
| **Animations** | Subtle, purposeful. Use CSS `animate` for motion concepts only. |
| **Accessibility** | Diagrams supplement, never replace, the question text. |

### Diagram on teaching cards

Teaching cards have NO `diagram` field. If a concept needs a visual, put the diagram on the question that follows the teaching card.

---

## Level 6: Writing Style

### Voice

| We are | We are NOT |
|--------|-----------|
| Helpful, motivating, supportive | Preachy, condescending, sarcastic |
| Clear, direct, conversational | Overly academic or textbook-like |
| Slightly playful, never at learner's expense | Passive-aggressive or guilt-tripping |

### Banned phrases

| Don't write | Write instead |
|-------------|---------------|
| "Obviously!" / "Of course!" | State the fact directly |
| "Nope!" / "Wrong!" | "Not quite." or just state the correct answer |
| "Classic mistake" | State why it doesn't work |
| "Spoiler:" / "Here's the thing:" | Just say the thing |
| "Not even close" | Restate the fact |
| "Did you know?" | Lead with the fact |
| "Let me explain..." | Just explain |
| Long rhetorical questions | State the point |

### Tone in explanations

After correct answers: brief positive + the key fact.
```
Good: "Yes, net pay is always smaller because deductions are removed first."
Bad:  "Exactly right! You're a genius! Net pay is indeed always smaller..."
```

After wrong answers: neutral correction + the right answer.
```
Good: "Not quite. Net pay is what you take home. It's always less than gross."
Bad:  "Nope! Obviously net pay is less because deductions are taken out first."
```

### Keep it short

- Maximum 20 words per sentence. If longer, split it or cut it.
- Prefer simple words: "use" not "utilize", "buy" not "purchase".
- Use contractions: "you're" not "you are", "it's" not "it is".
- Exception for emphasis: "This is not optional."

### Numbers

- Write all numbers as numerals: "3 dogs", "500 N", "20%"
- Use $ or relevant currency symbols: "$500" not "500 dollars"
- Comma for amounts over 999: "$1,200" not "$1200"
- XP amounts: no comma: "2567 XP"

### Punctuation

- Don't punctuate headlines or question titles except with ! or ?
- Use the Oxford comma: "food, shelter, and transportation"
- Avoid semicolons. Use two sentences instead.
- **Never use em dashes.** Use periods, commas, or colons. No exceptions.
- **Never use double dashes** (--). Same rule as em dashes.

### Capitalization

- Sentence case for everything.
- Don't capitalize common terms: "gross pay", "stress concentration", "black hole"
- Capitalize proper nouns and product names only.

### Country-agnostic content

- Teach concepts, not country-specific details.
- When country-specific details are unavoidable (401k, FICO), add a hint: "Details vary by country, but the concept applies everywhere."
- Use generic currency ("1,000/month") where possible.

---

## Level 7: Terminology

| Term | Usage |
|------|-------|
| **Learners** | People who use Octokeen. Never "users." |
| **Lessons** | A set of teaching cards and questions on one sub-topic. |
| **Questions** | The interactive exercises within a lesson. |
| **Teaching cards** | Explanation cards between questions (type: "teaching"). |
| **Units** | A collection of lessons on a broad topic. |
| **Course** | A complete learning journey on one subject. |
| **XP** | Experience points. "You earn XP." |
| **Streak** | Days in a row you've practiced. |
| **Gems** | In-app currency. |

---

## Level 8: ID Conventions

### Naming patterns

| Element | Pattern | Example |
|---------|---------|---------|
| Unit | `u[N]-[slug]` | `u1-statics` |
| Lesson | `u[N]-L[N]` | `u1-L1`, `u1-L1b`, `u1-L1c` |
| Teaching card | `u[N]-L[N]-T[N]` | `u1-L1-T1` |
| Question | `u[N]-L[N]-Q[N]` | `u1-L1-Q1` |
| Conversation | `u[N]-L-conv` | `u1-L-conv` |
| Conv node | `u[N]-L-conv-C[N]` | `u1-L-conv-C1` |
| Speed-round | `u[N]-L-speed` | `u1-L-speed` |
| Speed question | `u[N]-L-speed-SQ[N]` | `u1-L-speed-SQ1` |

### Sub-lesson splitting

When a lesson needs to be split into smaller pieces, use the `b`/`c` suffix:
- `u1-L1` = first sub-lesson (keeps original ID for backward compatibility)
- `u1-L1b` = second sub-lesson
- `u1-L1c` = third sub-lesson

Each sub-lesson gets its own title and description (never "Part 2" or roman numerals).

---

## Level 9: Content Lifecycle

### Before writing content

1. Read this guide fully
2. Read `docs/course-expansion-plan.md` for course structure, section plans, naming conventions, assumed vocabulary per section, and globalization rules
3. Read `docs/expansion-progress.md` for what's already been built
4. Check what concepts are taught in earlier units/lessons
5. Never test a concept that hasn't been taught yet

### After writing content

1. Run the final checklist below
2. Re-run the seed script: `npx tsx scripts/seed-content.ts`
3. Verify no errors in the seed output

### Final checklist

**Course level:**
- [ ] 10-15 units covering the full subject
- [ ] Unit 1 Lesson 1 is understandable by someone with zero background
- [ ] Every term is defined before it's tested
- [ ] Final unit tests synthesis across the full course

**Unit level:**
- [ ] 12-20 standard lessons per unit
- [ ] 1 conversation lesson + 1 speed-round lesson per unit
- [ ] At least 5 question types used across the unit
- [ ] First lesson is accessible, last lesson is challenging
- [ ] At least 2 teaching cards per unit include "Try this now:" in the hint

**Lesson level:**
- [ ] 8-12 items per lesson (teaching cards + questions)
- [ ] 2-3 teaching cards per lesson, spaced between questions
- [ ] At least 3 different question types per lesson
- [ ] Question after each teaching card is trivially easy
- [ ] Difficulty ramps: easy → medium → hard
- [ ] No more than 3 multiple-choice in a row

**Question level:**
- [ ] Teaching cards: max 2-sentence explanation, no options, no diagram
- [ ] Teaching card titles: under 8 words, no emojis
- [ ] Multiple-choice: 4 options, equal length, correctIndex distributed across 0-3
- [ ] True/false: clear, unambiguous, roughly 50/50 balance
- [ ] Fill-blank: key vocabulary in blanks, not filler words
- [ ] Sort-buckets: exactly 6 items, 2 buckets, 3 per bucket
- [ ] Match-pairs: exactly 4 pairs, clear 1:1 mapping
- [ ] Order-steps: 4-5 steps, unambiguous order
- [ ] Diagrams never reveal the correct answer

**Writing quality:**
- [ ] No em dashes or double dashes anywhere
- [ ] All explanations are 1-2 sentences
- [ ] Contractions used naturally
- [ ] Numbers as numerals
- [ ] No banned phrases
- [ ] Options under 15 words each
- [ ] Hints are one sentence, practical
- [ ] Country-specific content noted as such
