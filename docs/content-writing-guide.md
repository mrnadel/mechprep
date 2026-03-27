# MechReady — Content Writing Guide

> This is the style guide for writing course content (lessons, questions, explanations, hints, teaching cards). Follow these rules when creating or editing any content in `src/data/course/`.

---

## Principles

### Why
We're here to make professional knowledge accessible to everyone. This once involved expensive degrees, dense textbooks, and years of trial and error. MechReady kicked open the door. Now all you need is a screen, a few minutes a day, and the motivation to grow. Knowledge belongs to everyone. With MechReady, so does learning.

### What
The junior engineer who aced their interview. The career switcher who finally understood financial basics. The student who made thermodynamics click in 5 minutes instead of 5 hours. MechReady makes all this happen. We're everyone's favorite way to master professional skills, and mastering skills makes anything possible.

### How
Learning should feel like play, not pain. We combine technology with bite-sized lessons based on learning science. MechReady is effective, but it's never a chore.

**Everyone can MechReady.**

---

## Brand Personality

| Trait | What it means for content |
|-------|--------------------------|
| **Inspiring** | Every lesson unlocks a new ability. Frame knowledge as power, not obligation. |
| **Inclusive** | Write for everyone — from first-year students to career changers. Never assume prior knowledge unless the course structure guarantees it. |
| **Can-do** | Root for the learner. They can do this. We bring the energy so they bring their A-game. |
| **Curious** | Make learners want to know more. Tease the "why" before giving the answer. |
| **Quirky** | Put the fun in fundamentals. Learning doesn't have to be boring or intimidating. |

---

## Content Structure Rules

### Start easy — always
Like Duolingo, the first questions of every lesson should be almost impossible to get wrong. Build confidence before introducing complexity.

**Progression pattern:**
1. Teaching card introduces the concept simply
2. Easy question that reinforces the teaching (true/false or obvious multiple choice)
3. Slightly harder question
4. Teaching card deepens the concept
5. Medium questions (fill-blank, sort-buckets, match-pairs)
6. Teaching card with nuance or real-world application
7. Harder questions that combine concepts
8. Final question that ties the lesson together

### Teaching cards
- **Maximum 2 sentences** for the explanation. If you need more, split into two teaching cards.
- Lead with the concept, not the backstory. No "Did you know...?" or "Here's the thing..."
- `options` (key takeaway bullets): maximum 3, keep each under 12 words.
- `hint`: one sentence. Practical, not philosophical.

### Questions
- Question text: one sentence. Maximum two short sentences if absolutely needed.
- Options: short and scannable. Each option should be under 15 words.
- Explanations: 1-2 sentences max. State the fact, not a lecture.
- Hints: one short sentence. Direct the learner toward the answer without giving it away.

### Lesson length
- 8-12 questions per lesson (including teaching cards)
- 2-3 teaching cards per lesson
- Teaching cards should be spaced between questions, not clumped together

---

## Voice and Tone

### We are
- Helpful, motivating, supportive, positive
- Clear, direct, conversational
- Slightly playful — but never at the learner's expense

### We are NOT
- Preachy, condescending, or sarcastic
- Overly academic or textbook-like
- Passive-aggressive or guilt-tripping

### Banned phrases and patterns

| Don't write | Why | Write instead |
|-------------|-----|---------------|
| "Obviously!" / "Of course!" | Condescending — if it were obvious, they wouldn't need the lesson | State the fact directly |
| "Nope!" / "Wrong!" | Negative and discouraging | "Not quite." or just state the correct answer |
| "Classic mistake" / "Classic excuse" | Judgmental | State why it doesn't work |
| "Spoiler:" / "Here's the thing:" | Filler that adds nothing | Just say the thing |
| "You'd never..." / "You've spent more on worse things" | Preachy, assumes behavior | Stick to facts |
| "Not even close" | Harsh | "Most people..." or restate the fact |
| "Did you know?" | Overused, filler | Lead with the fact directly |
| "Let me explain..." | Filler | Just explain |
| Long rhetorical questions | Wastes space | State the point |

### Tone in explanations

**After correct answers:** Brief positive reinforcement + the key fact.
```
Good: "Yes — net pay is always smaller because deductions are removed first."
Bad: "Exactly right! You're a genius! Net pay is indeed always smaller than gross because, you see, the government and other entities take their share before..."
```

**After wrong answers:** Neutral correction + the right answer.
```
Good: "Not quite. Net pay is what you take home — it's always less than gross."
Bad: "Nope! That's wrong. Obviously net pay is less because deductions are taken out first. Everyone knows that."
```

---

## Writing Style

### Keep it short
- Use the fewest words that fully convey the idea.
- If a sentence has more than 20 words, split it or cut it.
- Prefer simple words over complex ones ("use" not "utilize", "buy" not "purchase").

### Use contractions
- "You're" not "You are", "it's" not "it is", "don't" not "do not"
- Exception: for emphasis, spell it out: "This is not optional."

### Numbers
- Write all numbers as numerals: "3 dogs", "500 dollars", "20%"
- If a number starts a sentence, spell it out. If it's large (5,678), rewrite the sentence.
- Use $ or relevant currency symbols, not "dollars": "$500" not "500 dollars" in options/short text.
- For amounts over 999, include a comma: "$1,200" not "$1200".
- XP amounts: no comma: "2567 XP"

### Punctuation
- Don't punctuate headlines or question titles, except with ! or ?
- Use the Oxford comma: "food, shelter, and transportation"
- Avoid semicolons — use two sentences instead.
- Avoid em dashes (—) in explanations. Use two sentences instead. Em dashes are okay in teaching card titles.
- Ellipses: use sparingly. No space before, space after if followed by a new sentence.

### Capitalization
- Sentence case for everything (question text, options, explanations, hints)
- Don't capitalize common terms: "gross pay", "net pay", "emergency fund"
- Capitalize proper nouns and product names only

---

## Terminology

| Term | Usage |
|------|-------|
| Learners | People who use MechReady. Never "users." |
| Lessons | A set of teaching cards and questions on one topic. |
| Questions | The interactive exercises within a lesson (multiple-choice, true-false, etc.) |
| Teaching cards | Explanation cards between questions (type: "teaching") |
| Units | A collection of lessons on a broad topic. |
| XP | Experience points. "You earn XP." |
| Streak | Days in a row you've practiced. |
| Gems | In-app currency. |

---

## Content by Question Type

### `teaching` cards
- `question` field: short title with one emoji at the start. Keep under 8 words.
- `explanation`: 1-2 sentences. The core concept, nothing more.
- `options`: 2-3 key takeaway bullets. Short phrases, not sentences.
- `hint`: one practical sentence.

### `true-false`
- Statement should be clear and unambiguous.
- Explanation: state the correct answer and why in one sentence.

### `multiple-choice`
- One clearly correct answer. Three plausible-but-wrong distractors.
- Wrong options should be wrong for different reasons (don't make two say the same wrong thing).
- Keep all options roughly the same length — the correct one shouldn't be noticeably longer.

### `fill-blank`
- Blanks should be key vocabulary, not filler words.
- Word bank: include the correct word(s) plus 3-4 distractors.
- Keep the sentence around the blank simple.

### `sort-buckets`
- 6 items, split evenly between buckets (3 per bucket).
- Items should be clearly in one bucket, not debatable.

### `match-pairs`
- 4 pairs. Each pair should be a clear 1:1 mapping.
- Don't make pairs that could logically match multiple targets.

### `conversation` lessons
- Keep dialogue natural and casual.
- Speaker messages: 1-2 sentences max.
- Response options: 3 choices (great / okay / poor quality).
- Feedback for each choice: one sentence explaining why it's good/okay/poor.

### `speed-round` lessons
- Questions: short, one-line, factual recall.
- Options: 4 choices, each 1-4 words.
- No explanations needed (speed focus).

---

## Final Checklist

Before submitting content, verify:

- [ ] First question is easy enough that a new learner can't get it wrong
- [ ] Teaching cards have max 2-sentence explanations
- [ ] No preachy, condescending, or guilt-tripping language
- [ ] All explanations are 1-2 sentences
- [ ] Numbers are written as numerals
- [ ] Contractions used where natural
- [ ] Options are short and scannable (under 15 words each)
- [ ] Correct option isn't noticeably longer than wrong ones
- [ ] Hints are one sentence, practical, not philosophical
- [ ] Lesson has 8-12 questions with 2-3 teaching cards spaced between them
- [ ] Re-run seed script after changes: `npx tsx scripts/seed-content.ts`
