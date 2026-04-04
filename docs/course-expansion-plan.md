# Course Expansion Plan: Professional-Level Mastery Courses

> Goal: Take each course from its current size to Duolingo-scale depth, producing learners with genuine professional-level knowledge. Someone completing a course should be able to work in the field, advise others, and think critically at an expert level.

---

## Table of Contents

**Vision & Direction**
1. [The Experience We're Building](#the-experience-were-building) - Promise, feelings, fun vs school, professional vs toy, voice, brand, writing rules
2. [Academic Foundations](#academic-foundations) - University curricula and professional standards backing each course
3. [Competitive Differentiation](#competitive-differentiation) - Why Octokeen, not Khan/Brilliant/Coursera

**Scale & Structure**
4. [Duolingo's Actual Scale](#duolingos-actual-scale) - Their numbers and how we map to them
5. [What "Professional Level" Means](#what-professional-level-means) - Graduate outcomes per course
6. [Structure Rules](#structure-rules-for-professional-level-courses) - Section arc, unit rules, pacing, Bloom's progression
7. [Naming Convention](#naming-convention-what-learners-see) - How names evolve with learner knowledge

**Per-Course Plans**
8. [Personal Finance](#course-1-personal-finance-professional-financial-advisor-level) - 15 sections, 181 units
9. [Psychology](#course-2-psychology-professional-behavioral-science-level) - 15 sections, 175 units
10. [Space & Astronomy](#course-3-space--astronomy-professional-science-communicator-level) - 15 sections, 166 units
11. [Summary Targets](#summary-professional-level-targets) - Numbers at a glance

**Learner Experience**
12. [Learner Personas](#learner-personas) - Who takes each course and what they want
13. [Retention Strategy](#retention-strategy-preventing-drop-off) - 5 danger zones, aha moments, misconception pedagogy
14. [Reward & Motivation Curve](#reward-and-motivation-curve) - XP, levels, celebrations, surprise rewards, loss aversion
15. [Misconception Lists](#misconception-lists-must-address-per-course) - Must-bust myths per course

**Content Design**
16. [Spaced Repetition Design](#spaced-repetition-design) - Review units, checkpoints, cross-section callbacks
17. [Difficulty Calibration](#difficulty-calibration) - Optimal error rate, Bloom's mapping, per-question indicators
18. [Calculation Questions](#calculation-questions-per-course) - What math each course teaches, by section
19. [Diagram & Visual Strategy](#diagram-and-visual-strategy) - When visuals are required, rules
20. [Assumed Vocabulary](#assumed-vocabulary-per-section-boundary) - What terms learners know at each section boundary

**Globalization**
21. [Globalization Strategy](#globalization-strategy-building-for-the-world) - Personalized variants, country selection, what's universal vs localized
22. [Existing Content Assessment](#existing-content-rewrite-assessment) - What needs updating for global audience

**Operations**
23. [Placement Test Design](#placement-test-design) - Adaptive test specs
24. [Content Dependencies](#content-dependencies) - Prerequisites and cross-course links
25. [QA & Review Process](#qa-and-review-process) - Pre-ship checks, post-launch monitoring
26. [QA Automation Script](#content-qa-automation-script) - 16 automated checks
27. [Glossary Strategy](#glossary-strategy) - Per-course term management
28. [Content Maintenance](#content-update-and-maintenance) - Volatile content, versioning
29. [Accessibility](#accessibility) - WCAG, color blindness, screen readers, reading levels
30. [Mobile-First Design](#mobile-first-design) - Touch targets, session length, diagrams
31. [Success Metrics](#success-metrics) - Retention, completion, accuracy targets
32. [Production Schedule](#production-schedule) - Per-section timeline, full course timeline

**Samples**
33. [Sample Standard Lesson](#sample-lesson-what-the-output-looks-like) - Finance emergency fund lesson (full code)
34. [Sample Conversation Lesson](#sample-conversation-lesson) - Psychology persuasion lesson (full code)
35. [Sample Speed-Round Lesson](#sample-speed-round-lesson) - Space stellar evolution (full code)

**Implementation**
36. [Implementation Order](#implementation-order-final) - Phase 0-3, sprint-by-sprint priority

---

## The Experience We're Building

### The promise

You open Octokeen knowing nothing about a subject. 8 months later, you can hold your own with professionals. Not because you crammed, but because you played 5 minutes a day and didn't want to stop.

### How it should feel

**Session by session:** Every 3-5 minute session ends with the learner feeling smarter than when they started. Not exhausted. Not lectured at. Smarter. They should think "I just learned something real" and "that was kind of fun."

**Week by week:** Learners start noticing the subject in their daily life. The finance learner reads a news headline about interest rates and actually understands it. The psychology learner catches themselves anchoring in a negotiation. The space learner looks up at the night sky and knows what they're seeing. The course leaks into their real life.

**Month by month:** Confidence builds. They can explain concepts to friends. They start forming opinions. They're not just memorizing, they're thinking. They feel like they're becoming someone who knows this stuff, not someone who's studying it.

**By the end:** They don't feel like they finished a course. They feel like they gained a superpower. They can analyze, evaluate, and create. They can teach others. They went from "I know nothing about this" to "I'm actually good at this."

### What makes it fun (not school)

| School feels like... | Octokeen feels like... |
|---------------------|----------------------|
| Long lectures before any interaction | You're doing something within 10 seconds |
| One question type (essay or MC) for an hour | 7+ question types, never the same thing twice in a row |
| You find out you failed weeks later | Instant feedback on every answer, with a clear explanation |
| Boring textbook tone | Conversational, slightly cheeky, never condescending |
| Isolated study | Streaks, leagues, XP, gems. Your friends are doing it too. |
| "Read chapter 14 by Thursday" | "You've got a 47-day streak. Keep going." |
| One massive exam at the end | Tiny wins every session. Stars, celebrations, level-ups. |
| No connection to real life | "Try this now: check your credit score" / "Go outside and find Orion" |

### What makes it professional (not a toy)

| Toy apps... | Octokeen... |
|------------|-------------|
| Teach trivia and fun facts | Teaches frameworks, calculations, and professional judgment |
| Stop at "good to know" | Goes to "I can do this job" |
| Avoid math and complexity | Introduces real calculations from Section 5 onward |
| Have no progression beyond intermediate | Has 15 sections reaching graduate-intro level |
| Make you feel smart without being smart | Makes you actually smart, verified by harder and harder challenges |
| Are based on vibes | Are based on MIT OCW, CFP curriculum, APA standards, and real university syllabi |

### The 3 feelings every lesson must create

1. **"I get it."** The teaching card made the concept click. Not confused. Not overwhelmed. Clear.
2. **"I got it right."** The easy question after the teaching card confirms understanding. Dopamine hit. Confidence.
3. **"That was interesting."** At least one question per lesson should make the learner think "huh, I didn't know that" or "that's actually cool." Curiosity is the fuel.

### What we're NOT building

- **Not a textbook with buttons.** If it reads like a textbook, it's wrong. Every word should feel like a conversation.
- **Not a quiz app.** If there's no teaching, it's just testing. Every lesson must teach something new before asking about it.
- **Not a casual game.** The content is real, rigorous, and professionally accurate. The packaging is fun, but the substance is serious.
- **Not a shortcut.** 8 months is 8 months. We don't promise mastery in a weekend. We promise that every day is worth it.

### The Octokeen voice

| Trait | In practice |
|-------|------------|
| **Warm but direct** | "Compound interest is your money earning money. The longer you wait, the more you miss." Not "Compound interest, often referred to as the eighth wonder of the world by sources attributed to Einstein..." |
| **Confident but humble** | We state facts clearly. We don't hedge with "some experts say." But when something is genuinely debated, we say so. |
| **Playful but never dumb** | A finance lesson can reference coffee habits. A psychology lesson can mention Netflix binges. But the core concept is always rigorous. |
| **Encouraging but honest** | "Not quite. The answer is B because..." Not "Great try! You're almost there! The answer happens to be B because..." |
| **Short** | If a sentence is longer than 20 words, it's too long. Split it or cut it. Every word earns its place. |

### Brand personality

| Trait | What it means for content |
|-------|--------------------------|
| **Inspiring** | Every lesson unlocks a new ability. Frame knowledge as power, not obligation. "After this lesson, you'll be able to..." |
| **Inclusive** | Write for everyone: students, career changers, curious retirees. Never assume prior knowledge unless the course structure guarantees it. No jargon without definition. |
| **Can-do** | Root for the learner. They can do this. "You now know more about investing than 90% of people." |
| **Curious** | Make learners want to know more. Tease the "why" before the answer. "Why does losing $100 hurt more than gaining $100 feels good?" |
| **Quirky** | Put the fun in fundamentals. A teaching card about black holes can say "A teaspoon weighs a billion tons." A finance card can say "Your future self is silently judging your savings rate." |

### Writing rules (summary, full rules in content-writing-guide.md)

- **Never use em dashes.** Periods, commas, or colons only. No exceptions.
- **Max 20 words per sentence.** Split or cut.
- **Use contractions.** "You're" not "You are."
- **Numbers as numerals.** "3 planets" not "three planets."
- **No banned phrases:** "Obviously", "Did you know?", "Nope!", "Classic mistake", "Here's the thing", "Let me explain"
- **Teaching card explanations:** Max 2 sentences.
- **Question explanations:** Max 2 sentences.
- **Options:** Under 15 words each. Roughly equal length. Correct answer not noticeably longer.
- **correctIndex:** Distributed across 0-3 across the course. Never always 0.
- **Hints:** One sentence. Practical, not philosophical.
- **Country-agnostic** where possible. Note country-specific content: "Details vary by country, but the concept applies everywhere."

### Real-world connection rules

Every course must connect to the learner's actual life. This is what makes it stick.

| Section phase | Real-world connection style |
|--------------|---------------------------|
| Discovery (1-2) | "Try this now:" hints. "Check your bank balance." "Go outside and find a bright steady dot, that's a planet." |
| Foundations (3-4) | Scenarios using everyday situations. "Your friend says all debt is bad. What do you say?" |
| Application (5-7) | Case studies with real numbers. "The Ramirez family earns $75,000/year. Build their budget." |
| Depth (8-10) | Professional scenarios. "Your client wants to retire in 15 years. Evaluate their plan." |
| Professional (11-13) | Industry simulations. "You're the financial advisor. What do you recommend and why?" |
| Mastery (14-15) | Teach-back. "Explain this concept to someone who's never heard of it." Conversation lessons that simulate real professional interactions. |

---

## Academic Foundations

Every course syllabus is built on real university curricula and professional certification standards, not invented content. The AI writing the content must research these sources to ensure accuracy, completeness, and proper sequencing.

### Personal Finance
| Source | What it provides |
|--------|-----------------|
| **CFP (Certified Financial Planner) exam curriculum** | The actual professional certification topics: financial planning, insurance, investments, tax, retirement, estate planning. This defines "professional level." |
| **CFA Level 1 curriculum (ethics + portfolio sections)** | Investment analysis, portfolio theory, ethical standards |
| **Yale ECON 252: Financial Markets** (Robert Shiller) | Market structure, behavioral finance, risk management, derivatives |
| **Duke Behavioral Finance** | Psychology of money decisions, biases in investing |
| **Khan Academy Personal Finance** | Well-structured beginner-to-intermediate progression |
| **IRS Publication 17** | Authoritative US tax reference (for tax sections) |
| **FINRA Investor Education** | Brokerage, fraud prevention, investment literacy |

**Professional equivalence target:** Someone who passes all 15 sections has the knowledge base to sit for the CFP exam (minus the experience requirement and ethics course).

### Psychology
| Source | What it provides |
|--------|-----------------|
| **MIT OCW 9.00: Introduction to Psychology** | Gold-standard university intro covering all core areas |
| **Yale PSYC 110: Introduction to Psychology** (Paul Bloom) | Highly structured lecture series covering perception through clinical |
| **APA undergraduate learning goals** | What the American Psychological Association says every psych graduate must know |
| **AP Psychology curriculum (College Board)** | Standardized topic list: biological bases, sensation, learning, cognition, development, abnormal, social, research methods |
| **Kaplan GRE Psychology Subject Test prep** | Defines professional-level knowledge boundaries across all subfields |
| **DSM-5-TR diagnostic categories** | Authoritative reference for mental health section (not for diagnosis, but for understanding) |
| **APA Ethics Code** | Professional ethics and research standards |

**Professional equivalence target:** Someone who passes all 15 sections has undergraduate psychology knowledge equivalent to a BA/BS, sufficient to enter a graduate program or work in behavioral research, HR, UX, or counseling support roles.

### Space & Astronomy
| Source | What it provides |
|--------|-----------------|
| **MIT OCW 8.282: Introduction to Astronomy** | University-level coverage from observational basics through cosmology |
| **University of Arizona Astronomy Specialization** (Coursera) | 4-course sequence: naked eye to cosmology, well-sequenced |
| **ASP (Astronomical Society of the Pacific) standards** | What astronomy educators agree everyone should know |
| **IAU educational framework** | International Astronomical Union's recommended topic coverage |
| **NASA STEM engagement curriculum** | Practical space science, mission design, current programs |
| **Fundamentals of Astronomy** (Karttunen et al.) | Standard university textbook: coordinates, optics, stellar physics, galaxies, cosmology |
| **The Planetary Society educational resources** | Exoplanet science, astrobiology, space policy |

**Professional equivalence target:** Someone who passes all 15 sections could work as a planetarium educator, science journalist, amateur research contributor, or space industry communicator. They could read and understand Sky & Telescope, follow arxiv astro-ph abstracts, and operate telescope equipment.

### How Sources Map to Sections

When building content for each section, the content writer must:
1. **Cross-reference the academic source** that covers that topic (e.g., Section 11 "Mental Health" maps to DSM-5-TR categories + AP Psychology abnormal unit + Yale PSYC 110 lectures 18-20)
2. **Verify no major topic is missing** by checking the source's table of contents against our unit list
3. **Match difficulty level** to where the section falls in the course arc (Sections 1-4 = intro textbook level, Sections 5-10 = upper undergrad, Sections 11-15 = professional/graduate intro)
4. **Use the source for accuracy**, not for copying. Our voice is Octokeen's (conversational, short, gamified), but the facts must match the academic source.

---

## Duolingo's Actual Scale

Duolingo's Spanish course (their gold standard):
- **8-10 sections** (major topic areas)
- **~40 units per section** (sub-topic clusters of 3-7 lessons)
- **~200+ total units** across the course
- **~1,000+ total lessons**
- **~15,000+ questions**
- **Completion: 6-12 months** at 5-10 min/day
- **Outcome: B2 professional working proficiency**

### How Their Structure Maps to Ours

| Duolingo | Octokeen equivalent | Size |
|----------|-------------------|------|
| Section | **Section** (groups units by topic area) | 12-15 per course |
| Unit | **Unit** (sub-topic cluster) | 8-15 per section |
| Lesson | **Lesson** (single 3-5 min session) | 3-7 per unit |

### Our Targets Per Course

| Metric | Current avg | Target | Multiplier |
|--------|------------|--------|-----------|
| Sections | 1 (flat) | 12-15 | New layer |
| Units | 10-13 | 130-180 | 12-15x |
| Lessons | 80-168 | 600-900 | 5-8x |
| Questions | 650-1,350 | 6,000-9,000 | 7-10x |
| Question types | 8-17 | 14+ (all types) | Full coverage |
| Completion time | 3-6 weeks | 6-12 months | 8-12x |
| Outcome level | Intermediate hobbyist | **Professional-level expert** | Transformative |

---

## What "Professional Level" Means

### Per course

| Course | Graduate can... | Real-world equivalent |
|--------|----------------|----------------------|
| **Finance** | Build financial plans, manage portfolios, advise clients, analyze investments, understand tax strategy, evaluate business financials | Financial advisor (minus licensing exam), CFP knowledge base |
| **Psychology** | Apply behavioral frameworks, understand clinical conditions, design basic studies, counsel using evidence-based approaches, teach psychology | Graduate psych student, counselor foundation, behavioral researcher |
| **Space** | Run planetarium programs, write science journalism, conduct amateur research, use telescopes professionally, interpret astronomical data | Science communicator, planetarium educator, serious amateur astronomer |

### What separates professional from hobbyist

| Hobbyist knows | Professional also knows |
|---------------|----------------------|
| What things are called | How to calculate and solve problems |
| Facts and definitions | When and why to apply frameworks |
| What happened historically | How to analyze new situations using principles |
| Surface-level explanations | Edge cases, exceptions, and when rules break down |
| What experts say | How to evaluate claims critically and form own conclusions |
| Concepts in isolation | How concepts interconnect across domains |

---

## Structure Rules for Professional-Level Courses

### Section Arc (12-15 sections per course)

Every course follows this arc. The first 6 sections build knowledge. The last 6-9 sections build professional capability.

| Phase | Sections | Purpose | Question style |
|-------|----------|---------|---------------|
| **Discovery** | 1-2 | "What is this field? Why does it matter?" Zero assumed knowledge. Build vocabulary and curiosity. | Recognition: T/F, easy MC, matching |
| **Foundations** | 3-4 | Core concepts, essential frameworks, key relationships | Understanding: MC, fill-blank, sort-buckets |
| **Application** | 5-7 | Apply knowledge to real scenarios. Combine concepts. First calculations. | Application: scenarios, order-steps, sliders, case studies |
| **Depth** | 8-10 | Advanced topics, edge cases, professional knowledge. Real math and analysis. | Analysis: multi-step scenarios, calculations, rank-order, pick-the-best |
| **Professional** | 11-13 | Industry practice, methodology, ethics, real workflows. Teach-back and explanation. | Synthesis: case studies, conversations simulating professional situations |
| **Mastery** | 14-15 | Capstone challenges. Cross-domain synthesis. "You could now work in this field." | Expert: comprehensive scenarios requiring knowledge from all sections |

### How sections work (technical decision, resolved)

Sections are NOT a new data layer. They are visual groupings rendered as banners on the course map, matching how Duolingo implements them.

**Data model:** Each Unit has optional `sectionIndex` (number, 1-15) and `sectionTitle` (string) fields. Units with the same sectionIndex are grouped together. The course map renders a full-width banner when sectionTitle changes between consecutive units.

**File organization:** One TypeScript file per section (15 files per course). Each file exports an array of units for that section. Example: `professions/personal-finance/sections/section-01-money-basics.ts` exports 8 units.

**Course map UI:** The existing course map auto-renders section headers when it detects a `sectionTitle` change between units. No separate screen, no tabs. Just a scrolling path with visual dividers, exactly like Duolingo.

**Performance:** For courses with 150-180 units, the course map will need virtualized scrolling (react-window or similar) in the future. For now, the existing rendering is fine up to ~50 units. We'll add virtualization when a course exceeds that.

### Unit Structure (8-15 units per section)

Each unit teaches one sub-topic through 3-7 lessons.

**Every 4th unit is a review unit** that mixes questions from previous units in the section. This builds spaced repetition into the course path.

**Every section ends with a checkpoint** (harder test covering the full section).

### Pacing Rules

1. **No more than 3 new concepts per unit.** Split if more.
2. **Review unit every 4th unit.** Pulls from all previous units in the section.
3. **Section checkpoint at end of every section.** Must pass to continue.
4. **Difficulty never jumps more than 1 level between consecutive units.**
5. **Calculation/estimation questions increase from Section 5 onward.** Early sections are conceptual. Later sections require working through problems.
6. **Cross-section references start in Section 5.** Teaching cards that say "In Section 2 you learned X. Now see how it applies to Y."

### Question Difficulty Progression Across The Course

| Sections | Bloom's level | Question example |
|----------|--------------|-----------------|
| 1-2 | **Remember** | "What is compound interest?" (MC) |
| 3-4 | **Understand** | "Why does compound interest grow faster over time?" (MC with explanation) |
| 5-7 | **Apply** | "You invest $5,000 at 7%. Estimate the value after 10 years." (slider-estimate) |
| 8-10 | **Analyze** | "Compare these 3 investment portfolios. Which has the best risk-adjusted return?" (pick-the-best with scenario) |
| 11-13 | **Evaluate** | "Your client wants to retire in 15 years with $1M. Evaluate their current plan and identify gaps." (case study) |
| 14-15 | **Create** | "Design a complete financial plan for this family. Prioritize the steps." (order-steps + conversation) |

---

## Course 1: Personal Finance (Professional Financial Advisor Level)

### Current State
- 13 units, 168 lessons, 1,352 questions
- Stops at intermediate investor level

### Target: 15 sections, ~150 units, ~700 lessons, ~7,000 questions

**Section 1: What Is Money? (Discovery)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 1 | Welcome to your financial life | 4 | Expand |
| 2 | How money works | 4 | Expand |
| 3 | Earning: jobs, wages, salary | 5 | NEW |
| 4 | Review: money basics | 3 | NEW |
| 5 | Your bank account | 5 | Expand |
| 6 | Digital money: cards, apps, crypto preview | 4 | NEW |
| 7 | The money lifecycle: earn, save, spend, invest | 4 | NEW |
| 8 | Review + checkpoint | 4 | NEW |

**Section 2: Spending & Budgeting (Foundations)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 9 | Where your money actually goes | 5 | Expand |
| 10 | Needs vs wants | 5 | Expand |
| 11 | The paycheck breakdown | 5 | Expand |
| 12 | Review: spending awareness | 3 | NEW |
| 13 | The 50/30/20 budget | 5 | Expand |
| 14 | Zero-based budgeting | 5 | NEW |
| 15 | Envelope and app-based methods | 4 | NEW |
| 16 | Tracking spending in practice | 5 | NEW |
| 17 | The psychology of spending | 5 | NEW |
| 18 | Review + checkpoint | 4 | NEW |

**Section 3: Saving & Emergency Planning (Foundations)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 19 | Why saving feels impossible | 5 | Expand |
| 20 | Your first $500 | 4 | Expand |
| 21 | Emergency fund: how much and where | 5 | Expand |
| 22 | Review: saving fundamentals | 3 | NEW |
| 23 | High-yield savings and CDs | 5 | Expand |
| 24 | Automating your savings | 5 | Expand |
| 25 | Sinking funds for goals | 4 | Expand |
| 26 | Lifestyle inflation trap | 5 | Expand |
| 27 | Windfalls and bonuses | 4 | Expand |
| 28 | Saving calculations: time to goal | 5 | NEW (slider-estimate) |
| 29 | Review + checkpoint | 4 | NEW |

**Section 4: Banking & Financial Systems (Application)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 30 | Checking vs savings deep dive | 5 | Expand |
| 31 | Banks vs credit unions vs online | 5 | Expand |
| 32 | Fees: how banks make money off you | 5 | Expand |
| 33 | Review: banking basics | 3 | NEW |
| 34 | Digital wallets and P2P payments | 5 | Expand |
| 35 | Wire transfers, ACH, and international money | 5 | NEW |
| 36 | Banking safety and fraud defense | 5 | Expand |
| 37 | FDIC, NCUA, and how deposits are protected | 4 | NEW |
| 38 | Interest rates: how banks set them | 5 | NEW |
| 39 | The Federal Reserve and monetary policy | 5 | NEW |
| 40 | Review + checkpoint | 4 | NEW |

**Section 5: Taxes (Application)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 41 | Why taxes exist | 4 | Expand |
| 42 | Tax brackets and marginal rates | 5 | Expand |
| 43 | W-2 vs 1099: employee vs contractor | 5 | Expand |
| 44 | Review: tax foundations | 3 | NEW |
| 45 | Standard vs itemized deductions | 5 | Expand |
| 46 | Tax credits that save real money | 5 | Expand |
| 47 | Filing step by step | 5 | Expand |
| 48 | Self-employment and freelancer taxes | 5 | NEW |
| 49 | Capital gains and investment taxes | 5 | NEW |
| 50 | Tax-advantaged accounts (HSA, 529, FSA) | 5 | NEW |
| 51 | Common tax mistakes | 5 | Expand |
| 52 | Tax planning: strategies to pay less legally | 5 | NEW |
| 53 | Review + checkpoint | 4 | NEW |

**Section 6: Debt Mastery (Application)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 54 | Good debt vs bad debt | 5 | Expand |
| 55 | How interest compounds against you | 5 | Expand |
| 56 | Credit cards: the complete guide | 5 | Expand |
| 57 | Review: debt basics | 3 | NEW |
| 58 | Student loans: federal, private, forgiveness | 5 | Expand |
| 59 | Car loans: dealer tricks and smart buying | 5 | Expand |
| 60 | Mortgages: the biggest debt of your life | 5 | Expand |
| 61 | The minimum payment trap (with calculations) | 5 | Expand |
| 62 | Snowball vs avalanche (with calculations) | 5 | Expand |
| 63 | Review: debt strategies | 3 | NEW |
| 64 | Consolidation and refinancing | 5 | Expand |
| 65 | Debt-to-income ratio: why lenders care | 5 | NEW |
| 66 | Bankruptcy: last resort explained | 4 | NEW |
| 67 | Review + checkpoint | 4 | NEW |

**Section 7: Credit System (Depth)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 68 | What is a credit score? | 5 | Expand |
| 69 | The 5 FICO factors deep dive | 5 | Expand |
| 70 | Credit utilization math | 5 | Expand |
| 71 | Review: credit foundations | 3 | NEW |
| 72 | Building credit from zero | 5 | Expand |
| 73 | Credit reports: reading and disputing | 5 | Expand |
| 74 | Hard vs soft pulls | 5 | Expand |
| 75 | Credit score optimization strategies | 5 | Expand |
| 76 | Credit monitoring and identity protection | 5 | NEW |
| 77 | Business credit: a separate system | 5 | NEW |
| 78 | Review + checkpoint | 4 | NEW |

**Section 8: Investing Fundamentals (Depth)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 79 | Why invest: inflation destroys cash | 5 | Expand |
| 80 | Compound interest: the math that changes everything | 5 | Expand |
| 81 | Stocks: owning companies | 5 | Expand |
| 82 | Bonds: lending your money | 5 | Expand |
| 83 | Review: investment vehicles | 3 | NEW |
| 84 | Index funds: beating 90% of pros | 5 | Expand |
| 85 | ETFs vs mutual funds | 5 | Expand |
| 86 | Risk tolerance and asset allocation | 5 | Expand |
| 87 | Your first brokerage account | 5 | Expand |
| 88 | Dollar-cost averaging | 5 | Expand |
| 89 | Review: investing practice | 3 | NEW |
| 90 | Dividends and reinvesting | 5 | Expand |
| 91 | Market crashes: history and psychology | 5 | Expand |
| 92 | Investment fees and their compounding cost | 5 | NEW |
| 93 | Review + checkpoint | 4 | NEW |

**Section 9: Advanced Investing (Professional)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 94 | How the stock market actually works | 5 | Expand |
| 95 | Reading stock charts and patterns | 5 | Expand |
| 96 | Valuation: P/E, P/B, DCF basics | 6 | Expand |
| 97 | Growth vs value investing | 5 | Expand |
| 98 | Review: stock analysis | 3 | NEW |
| 99 | Sector analysis and rotation | 5 | Expand |
| 100 | Options basics: calls and puts | 6 | NEW |
| 101 | Options strategies: covered calls, spreads | 6 | NEW |
| 102 | Futures and commodities | 5 | NEW |
| 103 | International and emerging markets | 5 | NEW |
| 104 | Review: advanced instruments | 3 | NEW |
| 105 | Portfolio construction theory (Markowitz) | 6 | NEW |
| 106 | Rebalancing and tax-loss harvesting | 5 | NEW |
| 107 | Alternative investments: PE, VC, hedge funds | 5 | NEW |
| 108 | Behavioral investing: biases that cost money | 5 | NEW |
| 109 | Review + checkpoint | 4 | NEW |

**Section 10: Real Estate (Professional)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 110 | Renting vs buying: the real math | 5 | Expand |
| 111 | Mortgages: types, rates, amortization | 6 | Expand |
| 112 | The home buying process A-Z | 6 | Expand |
| 113 | Review: home buying | 3 | NEW |
| 114 | Property taxes, HOA, maintenance costs | 5 | Expand |
| 115 | Refinancing: when and how | 5 | Expand |
| 116 | Real estate as investment: rental properties | 6 | Expand |
| 117 | REITs and real estate crowdfunding | 5 | Expand |
| 118 | Landlord math: cash flow, cap rate, ROI | 6 | NEW |
| 119 | Commercial real estate basics | 5 | NEW |
| 120 | Review + checkpoint | 4 | NEW |

**Section 11: Insurance & Risk (Professional)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 121 | Insurance principles: how risk pooling works | 5 | Expand |
| 122 | Health insurance: HMO, PPO, HDHP decoded | 6 | Expand |
| 123 | Deductibles, copays, premiums: the math | 5 | Expand |
| 124 | Review: health insurance | 3 | NEW |
| 125 | Auto insurance optimization | 5 | Expand |
| 126 | Homeowner's and renter's insurance | 5 | Expand |
| 127 | Life insurance: term vs whole, how much | 6 | Expand |
| 128 | Disability and umbrella insurance | 5 | Expand |
| 129 | Long-term care insurance | 5 | NEW |
| 130 | Review: full coverage strategy | 3 | NEW |
| 131 | Insurance shopping and comparison | 5 | Expand |
| 132 | Identity theft and cyber insurance | 5 | Expand |
| 133 | Review + checkpoint | 4 | NEW |

**Section 12: Retirement Planning (Professional)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 134 | Retirement math: how much do you need? | 6 | Expand |
| 135 | 401(k) deep dive: contributions, vesting, loans | 6 | Expand |
| 136 | IRA showdown: Roth vs Traditional with calculations | 6 | Expand |
| 137 | Review: retirement accounts | 3 | NEW |
| 138 | Employer match strategies | 5 | Expand |
| 139 | Target-date and lifecycle funds | 5 | Expand |
| 140 | Social Security: how it works, what to expect | 5 | Expand |
| 141 | The 4% rule and safe withdrawal rates | 6 | Expand |
| 142 | Review: retirement income | 3 | NEW |
| 143 | Early retirement and FIRE | 6 | Expand |
| 144 | Catch-up contributions and late starters | 5 | Expand |
| 145 | Required minimum distributions (RMDs) | 5 | NEW |
| 146 | Retirement account mistakes that cost thousands | 5 | Expand |
| 147 | Review + checkpoint | 4 | NEW |

**Section 13: Estate Planning & Wealth Transfer (Professional)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 148 | Why everyone needs an estate plan | 5 | NEW |
| 149 | Wills: types and how to create one | 5 | NEW |
| 150 | Trusts: revocable, irrevocable, and why | 6 | NEW |
| 151 | Review: wills and trusts | 3 | NEW |
| 152 | Powers of attorney and healthcare directives | 5 | NEW |
| 153 | Beneficiary designations: the overlooked step | 5 | NEW |
| 154 | Inheritance and estate taxes | 6 | NEW |
| 155 | Gifting strategies | 5 | NEW |
| 156 | Charitable giving and donor-advised funds | 5 | NEW |
| 157 | Teaching kids about money | 5 | NEW |
| 158 | Review + checkpoint | 4 | NEW |

**Section 14: Business & Self-Employment Finance (Professional)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 159 | Freelancer and side hustle finances | 5 | Expand |
| 160 | Business structures: LLC, S-Corp, sole prop | 6 | NEW |
| 161 | Business banking and bookkeeping | 5 | NEW |
| 162 | Review: business basics | 3 | NEW |
| 163 | Revenue, profit, and cash flow | 6 | NEW |
| 164 | Business taxes and quarterly payments | 6 | NEW |
| 165 | Payroll and hiring your first employee | 5 | NEW |
| 166 | Business insurance and liability | 5 | NEW |
| 167 | Business credit and financing | 5 | NEW |
| 168 | Reading financial statements (P&L, balance sheet) | 6 | NEW |
| 169 | Review + checkpoint | 4 | NEW |

**Section 15: Financial Mastery (Capstone)**
| # | Unit | Lessons | Status |
|---|------|---------|--------|
| 170 | Negotiating salary and raises | 5 | Expand |
| 171 | Marriage, divorce, and money | 6 | Expand |
| 172 | Money psychology and behavioral finance | 6 | Expand |
| 173 | Review: life money skills | 3 | NEW |
| 174 | Crypto and digital assets deep dive | 6 | Expand |
| 175 | International finance and currency | 5 | NEW |
| 176 | Economic cycles: recession, inflation, recovery | 6 | NEW |
| 177 | Building multiple income streams | 5 | Expand |
| 178 | Financial independence roadmap | 6 | Expand |
| 179 | Review: advanced topics | 3 | NEW |
| 180 | Your complete financial plan | 6 | Expand |
| 181 | Final capstone: comprehensive challenge | 6 | NEW |

**Finance totals: 15 sections, 181 units, ~880 lessons, ~8,800 questions**

---

## Course 2: Psychology (Professional Behavioral Science Level)

### Current State
- 10 units, 81 lessons, 657 questions

### Target: 15 sections, ~170 units, ~800 lessons, ~8,000 questions

**Section 1: Welcome to Your Mind (Discovery)**
| # | Unit | Lessons |
|---|------|---------|
| 1 | What is psychology? | 4 |
| 2 | A brief history: Freud to fMRI | 5 |
| 3 | Brain anatomy: the 3-pound universe | 5 |
| 4 | Review | 3 |
| 5 | Neurons, synapses, and neurotransmitters | 5 |
| 6 | Left brain/right brain: myth vs reality | 5 |
| 7 | The conscious and unconscious mind | 5 |
| 8 | Review + checkpoint | 4 |

**Section 2: Sensation & Perception (Foundations)**
| # | Unit | Lessons |
|---|------|---------|
| 9 | How your senses work | 5 |
| 10 | Vision: from photons to perception | 5 |
| 11 | Hearing, touch, taste, smell | 5 |
| 12 | Review | 3 |
| 13 | Optical illusions and perceptual tricks | 5 |
| 14 | Attention: the spotlight in your brain | 5 |
| 15 | Change blindness and inattention | 5 |
| 16 | Pain, pleasure, and the body | 5 |
| 17 | Review + checkpoint | 4 |

**Section 3: Learning (Foundations)**
| # | Unit | Lessons |
|---|------|---------|
| 18 | Classical conditioning: Pavlov's dogs | 5 |
| 19 | Operant conditioning: Skinner's box | 5 |
| 20 | Reinforcement schedules | 5 |
| 21 | Review | 3 |
| 22 | Observational learning: Bandura's Bobo doll | 5 |
| 23 | Habituation and sensitization | 4 |
| 24 | Habits: formation, loops, and breaking them | 5 |
| 25 | Learning transfer and generalization | 5 |
| 26 | Review + checkpoint | 4 |

**Section 4: Memory (Application)**
| # | Unit | Lessons |
|---|------|---------|
| 27 | How memories form: encoding | 5 |
| 28 | Short-term and working memory | 5 |
| 29 | Long-term memory: explicit vs implicit | 5 |
| 30 | Review | 3 |
| 31 | The forgetting curve and interference | 5 |
| 32 | Spaced repetition and active recall | 5 |
| 33 | False memories and eyewitness testimony | 5 |
| 34 | Memory and sleep | 5 |
| 35 | Memory disorders: amnesia and Alzheimer's | 5 |
| 36 | Review + checkpoint | 4 |

**Section 5: Thinking & Intelligence (Application)**
| # | Unit | Lessons |
|---|------|---------|
| 37 | What is intelligence? Theories and debates | 5 |
| 38 | IQ tests: what they measure and don't | 5 |
| 39 | Multiple intelligences and creativity | 5 |
| 40 | Review | 3 |
| 41 | Problem solving and reasoning | 5 |
| 42 | Language and thought (Sapir-Whorf) | 5 |
| 43 | Language acquisition: how babies learn to talk | 5 |
| 44 | Consciousness: what is it? | 5 |
| 45 | Altered states: sleep, dreams, meditation, hypnosis | 5 |
| 46 | Review + checkpoint | 4 |

**Section 6: Cognitive Biases & Decision Making (Application)**
| # | Unit | Lessons |
|---|------|---------|
| 47 | What are cognitive biases? | 5 |
| 48 | Confirmation bias | 5 |
| 49 | Anchoring and framing effects | 5 |
| 50 | Availability and representativeness | 5 |
| 51 | Review | 3 |
| 52 | Dunning-Kruger and overconfidence | 5 |
| 53 | Sunk cost and escalation of commitment | 5 |
| 54 | System 1 and System 2 thinking | 5 |
| 55 | Heuristics: useful shortcuts gone wrong | 5 |
| 56 | Review | 3 |
| 57 | Prospect theory and loss aversion | 5 |
| 58 | Choice architecture and nudges | 5 |
| 59 | The paradox of choice | 5 |
| 60 | Debiasing: how to think more clearly | 5 |
| 61 | Review + checkpoint | 4 |

**Section 7: Emotions & Motivation (Depth)**
| # | Unit | Lessons |
|---|------|---------|
| 62 | What are emotions? Theories (James-Lange, Cannon-Bard, Schachter) | 5 |
| 63 | The big six universal emotions | 5 |
| 64 | Stress: the biology and psychology | 5 |
| 65 | Review | 3 |
| 66 | Emotional regulation strategies | 5 |
| 67 | Intrinsic vs extrinsic motivation | 5 |
| 68 | Dopamine, reward circuits, and addiction | 6 |
| 69 | Flow states (Csikszentmihalyi) | 5 |
| 70 | Review | 3 |
| 71 | Procrastination: causes and cures | 5 |
| 72 | Self-determination theory (Deci & Ryan) | 5 |
| 73 | Emotional intelligence (Goleman) | 5 |
| 74 | Positive emotions and the broaden-and-build theory | 5 |
| 75 | Review + checkpoint | 4 |

**Section 8: Social Psychology (Depth)**
| # | Unit | Lessons |
|---|------|---------|
| 76 | Social influence: why others change your behavior | 5 |
| 77 | Conformity: Asch line experiments | 5 |
| 78 | Obedience: Milgram's shocking study | 5 |
| 79 | Review | 3 |
| 80 | The bystander effect and diffusion of responsibility | 5 |
| 81 | First impressions: the halo effect and thin-slicing | 5 |
| 82 | Stereotypes, prejudice, and discrimination | 6 |
| 83 | Attribution theory: explaining others' behavior | 5 |
| 84 | Review | 3 |
| 85 | Groupthink and group polarization | 5 |
| 86 | Persuasion: Cialdini's 6 principles | 6 |
| 87 | Aggression: theories and triggers | 5 |
| 88 | Prosocial behavior and altruism | 5 |
| 89 | Attraction and close relationships | 5 |
| 90 | Review + checkpoint | 4 |

**Section 9: Personality (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 91 | Personality theories: trait vs type vs dynamic | 5 |
| 92 | The Big Five (OCEAN) deep dive | 6 |
| 93 | Myers-Briggs: popularity vs scientific validity | 5 |
| 94 | Review | 3 |
| 95 | Psychoanalytic theory: Freud's legacy | 5 |
| 96 | Humanistic psychology: Maslow and Rogers | 5 |
| 97 | Nature vs nurture: twin studies and genetics | 6 |
| 98 | Self-concept, self-esteem, and identity | 5 |
| 99 | Growth mindset vs fixed mindset (Dweck) | 5 |
| 100 | Review + checkpoint | 4 |

**Section 10: Developmental Psychology (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 101 | Prenatal development and newborn capabilities | 5 |
| 102 | Piaget's stages of cognitive development | 6 |
| 103 | Attachment theory: Bowlby and Ainsworth | 6 |
| 104 | Review | 3 |
| 105 | Vygotsky and the zone of proximal development | 5 |
| 106 | Erikson's 8 psychosocial stages | 6 |
| 107 | Moral development: Kohlberg and Gilligan | 5 |
| 108 | Adolescent brain and identity formation | 5 |
| 109 | Adult development and aging | 5 |
| 110 | Death, dying, and grief (Kubler-Ross) | 5 |
| 111 | Review + checkpoint | 4 |

**Section 11: Mental Health & Abnormal Psychology (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 112 | What is mental illness? The DSM and diagnosis | 5 |
| 113 | Anxiety disorders: GAD, panic, phobias | 6 |
| 114 | Depression: causes, biology, and experience | 6 |
| 115 | Review | 3 |
| 116 | Bipolar disorder | 5 |
| 117 | PTSD and trauma | 6 |
| 118 | OCD and related disorders | 5 |
| 119 | Schizophrenia and psychotic disorders | 5 |
| 120 | Review | 3 |
| 121 | Personality disorders: clusters A, B, C | 6 |
| 122 | Eating disorders | 5 |
| 123 | Substance use disorders and addiction | 6 |
| 124 | Neurodevelopmental: ADHD, autism spectrum | 5 |
| 125 | Stigma and mental health advocacy | 5 |
| 126 | Review + checkpoint | 4 |

**Section 12: Therapy & Treatment (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 127 | History of mental health treatment | 5 |
| 128 | Cognitive Behavioral Therapy (CBT) | 6 |
| 129 | Dialectical Behavior Therapy (DBT) | 5 |
| 130 | Review | 3 |
| 131 | Psychodynamic therapy | 5 |
| 132 | Humanistic and person-centered therapy | 5 |
| 133 | Group therapy and family systems | 5 |
| 134 | Psychopharmacology: SSRIs, SNRIs, antipsychotics | 6 |
| 135 | Review | 3 |
| 136 | When to seek help and how to find a therapist | 5 |
| 137 | Evidence-based practice: what works | 5 |
| 138 | Positive psychology interventions | 5 |
| 139 | Review + checkpoint | 4 |

**Section 13: Applied & Industrial Psychology (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 140 | Behavioral economics: irrational consumers | 5 |
| 141 | Pricing psychology and marketing | 5 |
| 142 | Mental accounting and financial behavior | 5 |
| 143 | Review | 3 |
| 144 | Workplace psychology: motivation and leadership | 5 |
| 145 | Organizational behavior and team dynamics | 5 |
| 146 | Hiring, performance, and feedback psychology | 5 |
| 147 | UX psychology and design | 5 |
| 148 | Sports psychology | 5 |
| 149 | Health psychology: behavior change | 5 |
| 150 | Review + checkpoint | 4 |

**Section 14: Research Methods & Critical Thinking (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 151 | The scientific method in psychology | 5 |
| 152 | Experimental design: variables and controls | 6 |
| 153 | Correlation vs causation deep dive | 5 |
| 154 | Review | 3 |
| 155 | Sampling and population generalization | 5 |
| 156 | Statistical basics: mean, median, standard deviation | 6 |
| 157 | p-values, significance, and the replication crisis | 6 |
| 158 | Ethics in psychological research | 5 |
| 159 | Review | 3 |
| 160 | First principles thinking | 5 |
| 161 | Logical fallacies complete guide | 6 |
| 162 | Base rate neglect and Bayesian reasoning | 5 |
| 163 | Media literacy and misinformation defense | 5 |
| 164 | Review + checkpoint | 4 |

**Section 15: Influence, Dark Patterns & Mastery (Capstone)**
| # | Unit | Lessons |
|---|------|---------|
| 165 | Advertising and emotional manipulation | 5 |
| 166 | Social media: dopamine loops and attention hijacking | 5 |
| 167 | Propaganda and political persuasion | 5 |
| 168 | Review | 3 |
| 169 | Dark UX patterns: confirmshaming, hidden fees | 5 |
| 170 | Cults, radicalization, and extreme influence | 5 |
| 171 | Building your psychological defense system | 5 |
| 172 | Cross-cultural psychology | 5 |
| 173 | Famous experiments: full analysis | 6 |
| 174 | Review | 3 |
| 175 | Psychology capstone: comprehensive challenge | 6 |

**Psychology totals: 15 sections, 175 units, ~850 lessons, ~8,500 questions**

---

## Course 3: Space & Astronomy (Professional Science Communicator Level)

### Current State
- 10 units, 79 lessons, 644 questions

### Target: 15 sections, ~165 units, ~800 lessons, ~8,000 questions

**Section 1: Looking Up (Discovery)**
| # | Unit | Lessons |
|---|------|---------|
| 1 | Welcome to the universe | 4 |
| 2 | Stars, planets, and satellites by eye | 5 |
| 3 | Constellations and the celestial sphere | 5 |
| 4 | Review | 3 |
| 5 | Cosmic distances: AU, light-year, parsec | 5 |
| 6 | Your first stargazing session | 5 |
| 7 | Sky motion: why stars rise and set | 5 |
| 8 | Review + checkpoint | 4 |

**Section 2: The Solar System (Foundations)**
| # | Unit | Lessons |
|---|------|---------|
| 9 | The Sun: nuclear fusion and the solar wind | 5 |
| 10 | Mercury and Venus: scorched worlds | 5 |
| 11 | Earth: why it's special | 5 |
| 12 | Mars: the red planet | 5 |
| 13 | Review | 3 |
| 14 | Jupiter: king of planets | 5 |
| 15 | Saturn: rings and moons | 5 |
| 16 | Uranus and Neptune: ice giants | 5 |
| 17 | Dwarf planets: Pluto, Ceres, Eris | 5 |
| 18 | Review | 3 |
| 19 | Moons: Europa, Titan, Enceladus, Io | 5 |
| 20 | Asteroids, comets, and meteor showers | 5 |
| 21 | The Kuiper Belt and Oort Cloud | 5 |
| 22 | Comparative planetology: what makes planets different | 5 |
| 23 | Review + checkpoint | 4 |

**Section 3: Earth & Moon (Foundations)**
| # | Unit | Lessons |
|---|------|---------|
| 24 | Why we have seasons (axial tilt) | 5 |
| 25 | Moon phases from new to full | 5 |
| 26 | Eclipses: solar and lunar | 5 |
| 27 | Review | 3 |
| 28 | Tides and gravitational interaction | 5 |
| 29 | Earth's magnetic field and auroras | 5 |
| 30 | Earth's atmosphere and the greenhouse effect | 5 |
| 31 | The Moon's origin and geology | 5 |
| 32 | Review + checkpoint | 4 |

**Section 4: Light & Telescopes (Application)**
| # | Unit | Lessons |
|---|------|---------|
| 33 | What is light? Waves, photons, speed | 5 |
| 34 | The electromagnetic spectrum: radio to gamma | 6 |
| 35 | How telescopes work: refractors | 5 |
| 36 | Reflectors and compound telescopes | 5 |
| 37 | Review | 3 |
| 38 | Telescope specs: aperture, focal length, magnification | 6 |
| 39 | Radio telescopes and interferometry | 5 |
| 40 | Space telescopes: Hubble, Spitzer, Chandra, JWST | 6 |
| 41 | Spectroscopy: reading starlight like a barcode | 6 |
| 42 | Redshift, blueshift, and the Doppler effect | 5 |
| 43 | Choosing your first telescope | 5 |
| 44 | Review + checkpoint | 4 |

**Section 5: Stars (Application)**
| # | Unit | Lessons |
|---|------|---------|
| 45 | How stars are born: nebulae and protostars | 5 |
| 46 | Nuclear fusion: what powers stars | 6 |
| 47 | Star classification: O B A F G K M | 5 |
| 48 | The Hertzsprung-Russell diagram | 6 |
| 49 | Review | 3 |
| 50 | Main sequence life and stellar structure | 5 |
| 51 | Red giants and planetary nebulae | 5 |
| 52 | White dwarfs and type Ia supernovae | 5 |
| 53 | Core-collapse supernovae | 5 |
| 54 | Review | 3 |
| 55 | Neutron stars and pulsars | 5 |
| 56 | Magnetars: the most magnetic objects | 5 |
| 57 | Binary stars and stellar evolution | 5 |
| 58 | Variable stars and distance measurement | 5 |
| 59 | Stellar nucleosynthesis: where elements come from | 5 |
| 60 | Review + checkpoint | 4 |

**Section 6: Galaxies (Depth)**
| # | Unit | Lessons |
|---|------|---------|
| 61 | The Milky Way: structure and our place in it | 5 |
| 62 | Types of galaxies: spiral, elliptical, irregular | 5 |
| 63 | Galaxy formation and evolution | 5 |
| 64 | Review | 3 |
| 65 | Galaxy collisions and mergers | 5 |
| 66 | The Local Group and galaxy clusters | 5 |
| 67 | Active galactic nuclei and quasars | 6 |
| 68 | Deep sky objects: nebulae, clusters, galaxies | 5 |
| 69 | The cosmic distance ladder | 6 |
| 70 | Review + checkpoint | 4 |

**Section 7: Black Holes & Extreme Physics (Depth)**
| # | Unit | Lessons |
|---|------|---------|
| 71 | What is a black hole? Formation and types | 5 |
| 72 | Event horizons, singularities, and spacetime | 6 |
| 73 | Spaghettification and Hawking radiation | 5 |
| 74 | Review | 3 |
| 75 | Supermassive black holes: galaxy engines | 5 |
| 76 | The first black hole image (Event Horizon Telescope) | 5 |
| 77 | Gravitational waves: LIGO and Virgo | 6 |
| 78 | General relativity: gravity as curved spacetime | 6 |
| 79 | Time dilation and gravitational lensing | 5 |
| 80 | Review + checkpoint | 4 |

**Section 8: Cosmology (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 81 | The Big Bang: evidence and timeline | 6 |
| 82 | Cosmic microwave background: the baby picture | 5 |
| 83 | Inflation: the first fraction of a second | 5 |
| 84 | Review | 3 |
| 85 | Dark matter: evidence and candidates | 6 |
| 86 | Dark energy and the accelerating expansion | 6 |
| 87 | The geometry and fate of the universe | 5 |
| 88 | Hubble's law and measuring expansion | 5 |
| 89 | The Hubble tension: a crisis in cosmology | 5 |
| 90 | Multiverse theories and speculative physics | 5 |
| 91 | Review + checkpoint | 4 |

**Section 9: Rockets & Orbital Mechanics (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 92 | Newton's laws and rocket propulsion | 5 |
| 93 | The rocket equation (Tsiolkovsky) | 6 |
| 94 | Escape velocity calculations | 5 |
| 95 | Review | 3 |
| 96 | Orbital mechanics: Kepler's laws | 6 |
| 97 | Types of orbits: LEO, MEO, GEO, polar, Molniya | 5 |
| 98 | Rocket staging and fuel types | 5 |
| 99 | Gravity assists and transfer orbits | 6 |
| 100 | Reusable rockets: SpaceX and the economics | 5 |
| 101 | Launch windows and mission design | 5 |
| 102 | Review + checkpoint | 4 |

**Section 10: Space Exploration History (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 103 | The space race: Sputnik to Gagarin | 5 |
| 104 | Mercury, Gemini, and Apollo programs | 6 |
| 105 | Walking on the Moon: Apollo 11-17 | 5 |
| 106 | Review | 3 |
| 107 | Space Shuttle era | 5 |
| 108 | The International Space Station | 5 |
| 109 | Mars exploration: every rover and lander | 6 |
| 110 | Voyager: humanity's farthest reach | 5 |
| 111 | New Horizons, Cassini, Juno | 5 |
| 112 | Review + checkpoint | 4 |

**Section 11: Exoplanets & Astrobiology (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 113 | Finding exoplanets: transit method | 5 |
| 114 | Finding exoplanets: radial velocity and direct imaging | 5 |
| 115 | The habitable zone and water worlds | 5 |
| 116 | Review | 3 |
| 117 | Types of exoplanets: hot Jupiters to super-Earths | 5 |
| 118 | Famous exoplanets: TRAPPIST-1, Proxima b, Kepler-442b | 6 |
| 119 | Atmospheric characterization with JWST | 5 |
| 120 | What is life? Biochemistry basics | 5 |
| 121 | Review | 3 |
| 122 | Biosignatures: what to look for | 5 |
| 123 | Extremophiles: life in impossible places | 5 |
| 124 | The Drake equation with real numbers | 6 |
| 125 | SETI: methods and history | 5 |
| 126 | The Fermi Paradox: where is everyone? | 5 |
| 127 | Review + checkpoint | 4 |

**Section 12: Astrophotography & Amateur Astronomy (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 128 | Planning an observation night | 5 |
| 129 | Telescope setup and alignment | 5 |
| 130 | Finding objects: star hopping and GoTo mounts | 5 |
| 131 | Review | 3 |
| 132 | Smartphone and DSLR astrophotography | 5 |
| 133 | Long exposure and stacking techniques | 5 |
| 134 | Deep sky imaging: nebulae and galaxies | 5 |
| 135 | Filters and accessories | 5 |
| 136 | Light pollution and dark sky sites | 5 |
| 137 | Citizen science: contributing real data | 5 |
| 138 | Review + checkpoint | 4 |

**Section 13: Space Technology & Engineering (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 139 | Spacecraft design: power, propulsion, communication | 6 |
| 140 | Life support systems | 5 |
| 141 | Satellite technology: GPS, weather, communication | 5 |
| 142 | Review | 3 |
| 143 | Space debris and Kessler syndrome | 5 |
| 144 | Deep space communication: the Deep Space Network | 5 |
| 145 | Ion drives, solar sails, and advanced propulsion | 5 |
| 146 | Space stations: past, present, and future | 5 |
| 147 | Space suits and EVA | 5 |
| 148 | Review + checkpoint | 4 |

**Section 14: Space Frontiers (Professional)**
| # | Unit | Lessons |
|---|------|---------|
| 149 | Artemis and the return to the Moon | 5 |
| 150 | Moon bases: science and engineering | 5 |
| 151 | Mars colonization: the full challenge | 6 |
| 152 | Review | 3 |
| 153 | Space tourism and commercial spaceflight | 5 |
| 154 | Asteroid mining and space resources | 5 |
| 155 | Space law and treaties | 5 |
| 156 | Interstellar travel: realistic vs fiction | 6 |
| 157 | Generation ships and worldships | 5 |
| 158 | Review + checkpoint | 4 |

**Section 15: Mastery & Synthesis (Capstone)**
| # | Unit | Lessons |
|---|------|---------|
| 159 | Explaining space to others: science communication | 5 |
| 160 | Evaluating space news and claims | 5 |
| 161 | The overview effect: space and philosophy | 5 |
| 162 | Review | 3 |
| 163 | Space careers: how to work in the field | 5 |
| 164 | Cross-domain synthesis: physics + chemistry + biology in space | 6 |
| 165 | The biggest unsolved questions in astronomy | 5 |
| 166 | Final capstone: comprehensive challenge | 6 |

**Space totals: 15 sections, 166 units, ~820 lessons, ~8,200 questions**

---

## Summary: Professional-Level Targets

| Course | Sections | Units | Lessons | Questions | Duration (5 min/day) |
|--------|----------|-------|---------|-----------|---------------------|
| **Finance** | 15 | 181 | ~880 | ~8,800 | 8-12 months |
| **Psychology** | 15 | 175 | ~850 | ~8,500 | 8-12 months |
| **Space** | 15 | 166 | ~820 | ~8,200 | 8-12 months |
| **Total** | 45 | 522 | ~2,550 | ~25,500 | - |

### What Changed vs Previous Plan

| Metric | Previous plan | Professional plan | Difference |
|--------|-------------|-------------------|-----------|
| Sections per course | 10 | 15 | +50% |
| Units per course | ~100 | ~175 | +75% |
| Lessons per course | ~450 | ~850 | +90% |
| Questions per course | ~4,500 | ~8,500 | +90% |
| Completion time | 4-8 months | 8-12 months | +100% |

### What makes it professional-level

1. **Calculation questions from Section 5 onward** using slider-estimate, not just conceptual understanding
2. **Research methodology sections** in every course (how to evaluate evidence, not just consume it)
3. **Professional practice sections**: ethics, real workflows, advising others, industry standards
4. **Case studies that simulate professional decisions**, not textbook examples
5. **Bloom's taxonomy progression** from Remember (Sections 1-2) through Create (Sections 14-15)
6. **15 sections instead of 10** to reach true depth in specialized areas
7. **Every 4th unit is a review unit** for built-in spaced repetition
8. **Section checkpoints** that verify mastery before advancing

---

## Naming Convention: What Learners See

Unit and lesson names evolve with the learner. Early names assume zero vocabulary. Late names use professional terms the learner has already mastered.

### Naming by section phase

| Sections | Assumed knowledge | Naming style | Examples |
|----------|------------------|-------------|---------|
| 1-2 | Zero. Learner knows nothing. | Curiosity hooks, everyday language, outcome-focused | "Where Does Your Money Go?", "Why Your Brain Tricks You", "What's That Bright Dot?" |
| 3-4 | Basic vocabulary from Sections 1-2 | Introduce real terms alongside casual descriptions | "Build Your Emergency Fund", "The Anchoring Trap", "How Stars Are Born" |
| 5-7 | Core vocabulary owned | Mix professional terms with benefits | "Compound Interest and the Rule of 72", "System 1 vs System 2", "The Hertzsprung-Russell Diagram" |
| 8-10 | Intermediate, thinks like a student | Full professional language is fine | "Risk-Adjusted Returns", "Cognitive Behavioral Therapy Basics", "Spectroscopy and Stellar Classification" |
| 11-13 | Advanced, thinks like a practitioner | Names reflect professional activities | "Portfolio Rebalancing and Tax-Loss Harvesting", "Designing a Research Study", "Atmospheric Characterization with JWST" |
| 14-15 | Expert, thinks like a professional | Names describe what professionals do | "Build a Client's Financial Plan", "Evaluate a Clinical Presentation", "Run a Planetarium Show" |

### Naming rules

1. **Name by outcome, not by topic.** "Why Losing Hurts More" not "Prospect Theory." (Exception: Sections 8+ where learners own the vocabulary.)
2. **The learner should read the title and want to start.** If a title feels like a textbook chapter, rewrite it.
3. **Never use roman numerals or "Part X".** Every sub-lesson gets a unique descriptive name.
4. **Section names are aspirational.** "Master the Stock Market" not "Advanced Investing Module 3."

---

## Learner Personas

Each course serves multiple personas. Content should be written for all of them, not just one.

### Personal Finance

| Persona | Age | Situation | What they want |
|---------|-----|-----------|---------------|
| **Fresh grad** | 22-26 | First real job, first paycheck, no financial education | "Tell me what to do with my money" |
| **Career changer** | 30-40 | Making more money, worried about debt and retirement | "Am I on track? What am I missing?" |
| **Parent** | 35-50 | Managing family finances, saving for college, mortgage | "How do I protect my family financially?" |
| **Late starter** | 45-60 | Barely saved, worried about retirement | "Is it too late? What do I do now?" |

### Psychology

| Persona | Age | Situation | What they want |
|---------|-----|-----------|---------------|
| **Curious mind** | 18-30 | Loves learning, watches psychology YouTube | "I want to really understand this, not just know trivia" |
| **Self-improver** | 25-45 | Wants to make better decisions, manage emotions | "How do I use this to improve my life?" |
| **Manager/leader** | 30-50 | Manages people, needs to understand motivation | "How do I lead and communicate better?" |
| **Pre-grad student** | 20-25 | Considering psychology as a career | "Can I learn enough to know if this field is for me?" |

### Space & Astronomy

| Persona | Age | Situation | What they want |
|---------|-----|-----------|---------------|
| **Night sky newbie** | Any age | Looked up, felt wonder, knows nothing | "What am I looking at?" |
| **Science enthusiast** | 20-40 | Reads space news, watches launches | "I want to understand the science, not just the headlines" |
| **Parent/teacher** | 30-50 | Kids ask space questions they can't answer | "Help me explain this to my kids" |
| **Aspiring communicator** | 25-40 | Wants to work in science outreach, planetarium, journalism | "I need professional-level knowledge" |

---

## Retention Strategy: Preventing Drop-off

Research shows education app retention follows a steep curve: ~50% Day 1 → ~25% Day 7 → ~10% Day 30. Duolingo's streaks, leagues, and notifications fight this. Our content design must also fight it.

### The 5 drop-off danger zones

| When | Why they quit | How we prevent it |
|------|-------------|-------------------|
| **Day 1-3** | "This isn't for me" or "too easy/hard" | First lesson must be engaging AND successful. Placement test for experienced learners. |
| **Week 2-3** | "The novelty wore off" | Introduce speed-rounds and conversations by Unit 3. Variety prevents boredom. |
| **Month 1-2 (Section 3-4 cliff)** | "It's getting harder and I'm not sure I'm learning" | Review units prove how much they've learned. "You just answered 20 questions about X. A month ago you knew nothing." |
| **Month 3-4 (mid-course wall)** | "This is a lot. Am I even going to finish?" | Section checkpoints celebrate milestones. "You've completed 50% of the course." |
| **Month 6+ (advanced fatigue)** | "The content is harder and less fun" | Professional scenarios and case studies feel rewarding. "You're now thinking like a [financial advisor / psychologist / astronomer]." |

### Content-level retention mechanics

1. **"Aha moments" per section.** Each section has at least one mind-blowing fact or realization that makes the learner want to tell someone. These are the viral moments.

| Course | Section | Aha moment |
|--------|---------|-----------|
| Finance | 2 | "Your $5/day coffee habit costs $55,000 over 30 years with investing" |
| Finance | 8 | "An index fund beats 90% of professional investors. You're better off doing nothing." |
| Psychology | 2 | "Harvard students got the seasons question wrong. Your brain doesn't work the way you think." |
| Psychology | 6 | "Paying people sometimes makes them perform WORSE" (overjustification effect) |
| Space | 1 | "When you look at Andromeda, you're seeing 2.5 million years into the past" |
| Space | 5 | "Every atom in your body heavier than hydrogen was made inside a star that exploded" |

2. **Misconception-first pedagogy.** Research shows presenting the myth, letting the learner commit to an answer, then revealing the truth is more effective than just teaching facts. Every section should have at least 2 misconception-busting moments.

3. **1-3 month engagement modules.** Research shows gamification works best in focused 1-3 month modules. Structure sections so every ~2 months feels like a complete mini-achievement with a celebration.

---

## Spaced Repetition Design

### Review unit specs

Every 4th unit in a section is a review unit. Here's how they work:

| Rule | Spec |
|------|------|
| **Frequency** | Every 4th unit within a section |
| **Question source** | 50% from the 3 preceding units, 30% from earlier in the section, 20% from previous sections |
| **Question selection** | Prioritize concepts the learner got wrong in earlier lessons (tracked via `correctQuestionIds` in progress) |
| **Length** | 10-12 questions (standard lesson length) |
| **Question types** | Heavier on recall types: fill-blank, match-pairs, order-steps. Less multiple-choice. |
| **Teaching cards** | None. Review units are pure practice. |
| **Difficulty** | Mixed. Start easy (Section 1 concepts) and end hard (recent concepts). |

### Section checkpoint specs

| Rule | Spec |
|------|------|
| **Length** | 15 questions |
| **Pass rate** | 80% (12/15) to advance to next section |
| **Failure** | Can retry immediately. Different question selection each attempt. |
| **Question source** | Spans the entire section, weighted toward later units |
| **Question types** | All types. Emphasis on application (scenarios, order-steps, pick-the-best). |
| **No teaching cards** | Checkpoints test, they don't teach. |

### Cross-section spaced repetition

Starting from Section 5, each new section includes 2-3 "callback questions" per unit that reference concepts from earlier sections. These are NOT in review units. They appear in regular lessons, mixed with new content. This mirrors Duolingo's approach of mixing old vocabulary into new lessons.

---

## Difficulty Calibration

### Optimal error rate

Research on "desirable difficulty" (Bjork, 1994) shows the optimal error rate for learning is **15-25%**. If learners get everything right, it's too easy (no learning). If they get more than 30% wrong, it's too hard (frustration).

### How we calibrate

| Method | How it works |
|--------|-------------|
| **Author tagging** | Content writers tag each question as easy/medium/hard when creating it |
| **Target distribution per lesson** | Easy: 25%, Medium: 50%, Hard: 25% |
| **Post-launch adjustment** | Track actual correct-answer rates. If a "medium" question has 95% accuracy, it's actually easy. Retag. |
| **Bloom's level mapping** | Sections 1-2 = Remember/Understand. 3-7 = Apply/Analyze. 8-12 = Analyze/Evaluate. 13-15 = Evaluate/Create. |

### Per-question difficulty indicators

| Difficulty | Bloom's level | Correct rate target | Question characteristics |
|-----------|--------------|--------------------|-----------------------|
| Easy | Remember, Understand | 85-95% | Single concept, recognition, obvious answer |
| Medium | Apply, Analyze | 60-80% | Combine 2 concepts, requires reasoning |
| Hard | Evaluate, Create | 40-65% | Multi-concept, edge cases, professional judgment |

---

## Calculation Questions Per Course

### Personal Finance

| Section | Calculations introduced | Question type |
|---------|----------------------|--------------|
| 3 | Simple interest, savings goal timeline | slider-estimate |
| 5 | Tax bracket math (marginal vs effective rate) | slider-estimate, fill-blank |
| 6 | Loan interest, minimum payment cost over time | slider-estimate, scenario |
| 8 | Compound interest (A = P(1+r/n)^nt), Rule of 72 | slider-estimate, fill-blank |
| 9 | P/E ratio, dividend yield, CAGR | slider-estimate, fill-blank |
| 10 | Mortgage amortization, rent vs buy break-even | slider-estimate, scenario |
| 12 | Retirement needs (accumulation math), 4% withdrawal | slider-estimate, scenario |
| 14 | Business cash flow, profit margin | slider-estimate, scenario |

### Psychology

| Section | Calculations introduced | Question type |
|---------|----------------------|--------------|
| 5 | Probability and base rates (Bayes) | slider-estimate, scenario |
| 7 | Emotional arousal scales, stress inventory scoring | slider-estimate |
| 14 | Mean, standard deviation, p-values (conceptual), effect size | slider-estimate, fill-blank |
| 14 | Sample size reasoning, statistical significance | scenario, pick-the-best |

### Space & Astronomy

| Section | Calculations introduced | Question type |
|---------|----------------------|--------------|
| 4 | Inverse square law (brightness), telescope magnification | slider-estimate, fill-blank |
| 5 | Stefan-Boltzmann (luminosity from temp), Wien's law (peak wavelength) | slider-estimate |
| 6 | Hubble's law (recession velocity from distance) | slider-estimate |
| 7 | Schwarzschild radius | slider-estimate |
| 8 | Age of universe from expansion rate | slider-estimate |
| 9 | Kepler's 3rd law (P^2 = a^3), escape velocity | slider-estimate, fill-blank |

---

## Diagram and Visual Strategy

### When visuals are required

| Course | Must-have visuals |
|--------|-----------------|
| **Finance** | Compound interest growth curves, amortization charts, pie charts (budget, asset allocation), tax bracket diagrams, supply/demand |
| **Psychology** | Brain anatomy, neuron structure, classical conditioning diagram, Maslow's pyramid, Milgram experiment setup, stress response diagram, DSM category tree |
| **Space** | Solar system scale, planet comparison, stellar lifecycle, HR diagram, galaxy types, orbit types, electromagnetic spectrum, telescope optics, Moon phases, eclipse geometry |

### Visual rules

1. **Every section must have at least 5 diagram questions.** Visuals prevent text fatigue.
2. **Diagrams must NEVER reveal the answer.** Labels are for orientation, not hints.
3. **Use SVG format** (inline in the `diagram` field). ViewBox: `0 0 80 80`.
4. **Progressive complexity.** Section 1 diagrams are simple (labeled arrows, basic shapes). Section 10+ diagrams are professional (HR diagrams with axes, circuit-style flow charts).
5. **Accessibility.** Every diagram-based question must be answerable from the question text alone. The diagram supplements, never replaces.

---

## Placement Test Design

For 15-section courses, the placement test must be sophisticated.

| Rule | Spec |
|------|------|
| **Algorithm** | Adaptive (CAT-like). Start at Section 5 difficulty. If correct, jump to Section 8. If wrong, drop to Section 3. Converge on the right level. |
| **Questions** | 15-20 questions |
| **Duration** | ~5 minutes |
| **Coverage** | 1-2 questions per section, spanning all major topics |
| **Placement result** | "You can skip to Section X." All lessons before that section are unlocked but not completed. |
| **Floor** | Everyone starts at Section 1 minimum (no skipping Section 1). |
| **Ceiling** | Maximum skip to Section 10. Sections 11-15 must be earned. |

---

## Content Dependencies

### Within a course

Each unit file must declare its prerequisites as a comment at the top:

```typescript
// Prerequisites: u47 (System 1 & 2), u35 (Sunk cost fallacy)
// Concepts assumed known: heuristic, loss aversion, reference point
```

### Cross-course connections

| When Finance mentions... | Link to Psychology... |
|-------------------------|---------------------|
| Behavioral investing biases | Section 6 (Cognitive Biases) |
| Money psychology | Section 7 (Emotions & Motivation) |
| Negotiation psychology | Section 8 (Social Psychology) |

| When Space mentions... | Could link to... |
|----------------------|-----------------|
| Nuclear fusion | (Physics, not covered by our courses, so teach it inline) |
| Perception and scale | Psychology Section 2 (Perception) |

Cross-course links are **optional "did you know" hints**, not hard prerequisites. A learner should be able to complete any course independently.

---

## QA and Review Process

### Before content ships

| Step | Who/What | Checks |
|------|----------|--------|
| 1. Automated | Script | No em dashes, correctIndex distribution, teaching card count, question type variety, ID format, no duplicate IDs |
| 2. Accuracy review | AI with academic source | Every fact cross-referenced against the academic source for that section |
| 3. Voice review | AI with writing guide | Tone, length, banned phrases, contractions, sentence length |
| 4. Difficulty review | AI | Bloom's level matches section phase, easy question after every teaching card |
| 5. Seed test | Script | `npx tsx scripts/seed-content.ts` passes without errors |

### Post-launch monitoring

| Metric | Action threshold |
|--------|-----------------|
| Question accuracy rate <40% | Question is too hard. Review and simplify or add better teaching. |
| Question accuracy rate >95% | Question is too easy. May need to increase difficulty or replace. |
| Lesson completion rate <70% | Lesson is too long or too frustrating. Split or add more teaching. |
| Section drop-off >50% | Section cliff. Add more engagement (conversations, aha moments). |

---

## Glossary Strategy

Each course builds a glossary as content is written.

| Rule | Spec |
|------|------|
| **Format** | One glossary file per course: `glossary.ts` |
| **Entries** | Every technical term used in the course, with a 1-sentence plain-English definition |
| **First use** | Every term must be defined in a teaching card BEFORE it appears in a question |
| **Learner access** | Glossary is searchable in the app (future feature). For now, it serves as a content QA tool. |
| **Section tagging** | Each glossary entry is tagged with the section where it's first introduced |

---

## Content Update and Maintenance

### Content that changes

| Type | Frequency | Examples | Strategy |
|------|-----------|---------|---------|
| **Facts that update yearly** | Annual review | Tax brackets, contribution limits, mission updates, new exoplanet discoveries | Tag these questions with `volatile: true`. Review every January. |
| **Facts that update rarely** | Review every 2-3 years | FICO scoring model changes, DSM updates, major scientific revisions | Watch for major announcements in each field. |
| **Facts that don't change** | Never | Kepler's laws, cognitive biases, compound interest formula | No maintenance needed. |

### Versioning

When a lesson is updated, learners who already completed it keep their progress. The updated content appears if they revisit the lesson (practice mode) or encounter review questions.

---

## Accessibility

| Requirement | Implementation |
|-------------|---------------|
| **Color blindness** | Never use color alone to convey meaning. Always pair with text labels or patterns. Unit theme colors are decorative, not informational. |
| **Screen readers** | All questions must be fully answerable from text. Diagram questions include the key information in the question text. `aria-label` on all interactive elements. |
| **Motor accessibility** | All question types must work with keyboard navigation. Tap targets minimum 44x44px. |
| **Cognitive load** | Max 20 words per sentence. Max 2 sentences per teaching card. No more than 3 new concepts per unit. These rules serve both clarity and accessibility. |
| **Reading level** | Sections 1-4 target a Grade 8 reading level. Sections 5-10 target Grade 10-12. Sections 11-15 target college level (Flesch-Kincaid). |

---

## Mobile-First Design

85% of Duolingo usage is mobile. We design for mobile first.

| Rule | Spec |
|------|------|
| **Session length** | 3-5 minutes. 8-12 items per lesson. |
| **Touch targets** | Minimum 44px. Options must be easily tappable. |
| **Scrolling** | Minimize scrolling within a question. Question text + options should fit on one screen. |
| **Question types** | Sort-buckets and match-pairs use drag gestures. Must work on small screens. |
| **Diagrams** | Must be legible at mobile viewport width (~375px). Use large labels, simple shapes. |
| **Offline** | Lesson data for the current section should be cacheable for offline play. |

---

## Competitive Differentiation

### Why Octokeen, not...

| Competitor | Their strength | Their weakness | Our advantage |
|-----------|---------------|---------------|--------------|
| **Khan Academy** | Free, comprehensive video lectures | Passive watching, no gamification, no streak motivation | Active learning with gamification. You DO things, not watch things. |
| **Brilliant** | Beautiful interactive problems, great for STEM | Expensive ($25/mo), limited to STEM, no social features | Broader subjects, social competition, free tier |
| **Coursera/edX** | University-backed certificates, deep content | Long courses (weeks per module), requires sitting at a computer | 5 min/day mobile-first. Professional-level without the time commitment. |
| **Duolingo** | Best gamification, massive user base | Only teaches languages | Same addictive format, but for professional knowledge |
| **YouTube** | Infinite free content on any topic | No structure, no verification, no progression, no accountability | Structured path from zero to professional, with verification at every step |

**Our one-line pitch:** "Duolingo's addictive format, but for real-world professional skills."

---

## Success Metrics

### How we know the course works

| Metric | Target | How to measure |
|--------|--------|---------------|
| **Day 7 retention** | >30% | % of new learners who return after 7 days |
| **Day 30 retention** | >15% | % still active after 30 days |
| **Course completion** | >5% | % who finish all 15 sections (Duolingo's completion rate for Spanish is ~5-8%) |
| **Section completion** | >40% per section | % who finish each section after starting it |
| **Average accuracy** | 70-80% | If below 60%, content is too hard. If above 90%, too easy. |
| **Session length** | 4-7 minutes | Matches our 3-5 min target with buffer for streaks/celebrations |
| **Streak length** | Median 7+ days | Indicates habit formation |
| **NPS** | >50 | "Would you recommend Octokeen?" |

### How we know the learner learned

| Level | Verification method |
|-------|-------------------|
| Section checkpoint passed (80%+) | They know the section's content |
| Course completed with >70% avg accuracy | They have breadth across all topics |
| Capstone section passed | They can synthesize and apply |
| "Can explain it to someone else" (conversation lessons) | They have genuine understanding, not just recognition |

---

## Production Schedule

### Per-section production

| Step | Duration | Output |
|------|----------|--------|
| Research: cross-reference academic sources for the section | 1 day | Section syllabus with learning objectives per unit |
| Content writing: teaching cards + questions for all units | 3-5 days per section | Complete unit files |
| QA: automated checks + accuracy review + voice review | 1 day | QA report, fixes applied |
| Seed and test | 0.5 day | Content live in DB |
| **Total per section** | **~1 week** | |

### Full course timeline

| Phase | Duration | What |
|-------|----------|------|
| Phase 1: Fix existing (correctIndex, question types) | 1-2 weeks | All 3 courses fixed |
| Phase 2: Section infrastructure (data model, UI) | 1 week | Section layer, checkpoints, review units working |
| Phase 3: Expand Finance (15 sections) | ~15 weeks | ~880 lessons, ~8,800 questions |
| Phase 4: Expand Psychology (15 sections) | ~15 weeks | ~850 lessons, ~8,500 questions |
| Phase 5: Expand Space (15 sections) | ~15 weeks | ~820 lessons, ~8,200 questions |
| **Total** | **~48 weeks** | All 3 courses at professional level |

Sections can be built in parallel across courses. With 3 agents working simultaneously (one per course), total time drops to ~17 weeks.

### Build order within each course

1. Fix existing content first (Sections that already have content)
2. Build entirely new sections next (highest impact)
3. Deepen existing sections last (more units, more review)

---

## Sample Lesson: What the Output Looks Like

### Personal Finance, Section 3, Unit 21: "Your Emergency Fund"

```typescript
{
  id: 'pf-u21-L1',
  title: 'How Much Do You Need?',
  description: 'Calculate your personal emergency fund target based on your expenses.',
  icon: '📝',
  xpReward: 20,
  levels: 4,
  questions: [
    {
      id: 'pf-u21-L1-T1',
      type: 'teaching',
      question: 'The emergency fund rule',
      explanation: "An emergency fund covers 3-6 months of essential expenses. Not income, expenses. If you spend $3,000/month on rent, food, and bills, you need $9,000-$18,000 saved.",
      hint: 'Try this now: add up your rent, groceries, utilities, and insurance. That is your monthly essential expenses.',
    },
    {
      id: 'pf-u21-L1-Q1',
      type: 'true-false',
      question: 'Your emergency fund should cover 3-6 months of expenses, not income.',
      correctAnswer: true,
      explanation: "Expenses, not income. If you earn $5,000 but spend $3,000, your fund targets $9,000-$18,000.",
    },
    {
      id: 'pf-u21-L1-Q2',
      type: 'multiple-choice',
      question: 'You spend $2,500/month on essentials. What is a 3-month emergency fund?',
      options: ['$2,500', '$5,000', '$7,500', '$10,000'],
      correctIndex: 2,
      explanation: "$2,500 x 3 months = $7,500. That is the minimum target.",
    },
    {
      id: 'pf-u21-L1-T2',
      type: 'teaching',
      question: 'Who needs 6 months vs 3?',
      explanation: "Freelancers, single-income households, and people in volatile industries should aim for 6 months. Dual-income households with stable jobs can start with 3.",
      hint: 'If losing your job would take more than 3 months to replace, aim for 6.',
    },
    {
      id: 'pf-u21-L1-Q3',
      type: 'sort-buckets',
      question: 'Sort these people by how much emergency fund they need:',
      options: ['Freelance designer', 'Dual-income couple at tech companies', 'Single parent, one income', 'Government employee with tenure', 'Seasonal restaurant worker', 'Teacher with union contract'],
      buckets: ['3 months is fine', 'Aim for 6 months'],
      correctBuckets: [1, 0, 1, 0, 1, 0],
      explanation: "Unstable or single-income situations need more buffer. Stable dual-income or tenured jobs can get by with less.",
    },
    {
      id: 'pf-u21-L1-Q4',
      type: 'slider-estimate',
      question: 'Your monthly essentials are $4,200. What is a 6-month emergency fund?',
      sliderMin: 10000,
      sliderMax: 40000,
      correctValue: 25200,
      tolerance: 5,
      unit: '$',
      explanation: "$4,200 x 6 = $25,200. This is your safety net target.",
    },
    {
      id: 'pf-u21-L1-Q5',
      type: 'match-pairs',
      question: 'Match each situation to the right emergency fund strategy:',
      options: ['Just starting out', 'Have $1,000 saved', 'Have 3 months saved', 'Have 6 months saved'],
      matchTargets: ['Save $1,000 as fast as possible', 'Build to 3 months gradually', 'Decide if you need 6 based on risk', 'You are done. Invest the rest.'],
      correctMatches: [0, 1, 2, 3],
      explanation: "The emergency fund has stages. Once you hit 6 months, redirect savings to investing.",
    },
    {
      id: 'pf-u21-L1-Q6',
      type: 'multiple-choice',
      question: 'Where should you keep your emergency fund?',
      options: ['High-yield savings account', 'Stock market index fund', 'Under your mattress', 'Checking account'],
      correctIndex: 0,
      explanation: "A high-yield savings account is accessible, earns interest, and is FDIC insured. Stocks are too volatile. Cash loses to inflation. Checking earns nothing.",
    },
    {
      id: 'pf-u21-L1-T3',
      type: 'teaching',
      question: 'What counts as an emergency?',
      explanation: "Job loss, medical bills, car breakdown, urgent home repair. Not vacations, sales, or impulse purchases. If you can plan for it, it's not an emergency.",
    },
    {
      id: 'pf-u21-L1-Q7',
      type: 'sort-buckets',
      question: 'Is this a real emergency?',
      options: ['Your car engine dies', 'A great deal on a TV', 'You break your arm', 'Your friend is getting married', 'Your roof starts leaking', 'New shoes are on sale'],
      buckets: ['Real emergency', 'Not an emergency'],
      correctBuckets: [0, 1, 0, 1, 0, 1],
      explanation: "Emergencies are unexpected and necessary. Sales and planned events are not emergencies.",
    },
  ],
}
```

This sample shows: 3 teaching cards, 7 questions, 5 different types (T/F, MC, sort-buckets, slider-estimate, match-pairs), difficulty ramp (easy T/F first, calculation later), real-world connection ("Try this now"), and 10 total items.

---

---

## Globalization Strategy: Building for the World

Octokeen is global from day one. Content must work for learners in any country. This means teaching universal principles, not country-specific implementations.

### Impact on existing content

| Course | Rewrite needed? | Why |
|--------|----------------|-----|
| **Finance** | **YES, significant.** 700+ US-specific references (IRS, 401k, FICO, W-2, Social Security, Roth IRA). | Core financial principles are universal, but current content teaches US implementations as if they're the only way. |
| **Psychology** | **Minor additions only.** Content is 95% universal. | Need to address the WEIRD problem (Western, Educated, Industrialized, Rich, Democratic bias) and add cross-cultural examples. |
| **Space** | **Minor additions only.** Astronomy is inherently global. | Need to add Southern Hemisphere sky, non-Western astronomical traditions, and global space agencies (ESA, ISRO, CNSA, JAXA). |

### The personalized approach: one course, localized examples

Making content generic ("employer retirement account") makes it useless for everyone. An American wants to learn about their 401(k). A Brit wants to learn about their workplace pension. An Israeli wants to learn about their keren pensia.

**The solution: teach the universal principle, but show examples and details from the learner's country.**

During onboarding, the learner selects their country. This determines which version of country-specific teaching cards and examples they see. The core questions test the CONCEPT, not the country-specific name.

**Example: Retirement accounts**

The teaching card has multiple versions stored in a `localizedExplanation` field:

| Country | What the learner sees |
|---------|---------------------|
| US | "Your 401(k) is a tax-advantaged retirement account. Your employer matches your contributions up to a percentage. If you contribute 6% and they match 50%, that's 3% free money." |
| UK | "Your workplace pension is a tax-advantaged retirement account. Your employer must contribute at least 3% on top of your own contribution." |
| Australia | "Your super (superannuation) is a tax-advantaged retirement account. Your employer contributes 11.5% of your salary automatically." |
| Canada | "Your RRSP is a tax-advantaged retirement account. Contributions are tax-deductible, and you pay tax when you withdraw in retirement." |
| Israel | "Your keren pensia is a tax-advantaged retirement account. Your employer contributes 6.5% and you contribute 6% of your salary." |
| Default | "Most countries have tax-advantaged retirement accounts. Your employer may contribute money on top of what you save. The names differ by country, but the principle is the same." |

The QUESTION that follows tests the concept, not the local name:
> "Why should you always contribute at least enough to get your employer's full match?"
> Options: "It's free money", "It reduces your salary", "Your employer requires it", "It increases your tax bracket"

This question works for everyone regardless of country.

**What this means for content design:**

1. **Teaching cards** that explain country-specific systems need a `variants` field with multiple country versions
2. **Questions** should test the universal concept, not the local implementation name
3. **Onboarding** asks the learner's country (or auto-detects). Default to "International" if not set.
4. **Phase 1 countries:** US, UK, Australia, Canada, Israel, EU (generic), International (default)
5. **The American experience gets MORE specific, not less.** They see 401(k), Roth IRA, FICO, W-2 with real numbers and real advice. Going global doesn't dilute the US content, it adds parallel tracks for others.

### What needs localization vs what's universal

Only Personal Finance has significant localization needs. Psychology and Space are 95%+ universal.

**Finance: what needs country variants**

| Topic | Needs variants | Universal question approach |
|-------|---------------|---------------------------|
| Retirement accounts | Yes (401k, pension, super, RRSP, keren pensia) | Test the concept: matching, tax advantage, compound growth |
| Tax system | Yes (brackets, forms, filing) | Test the concept: marginal rates, deductions, credits |
| Credit scores | Yes (FICO, Experian UK, no system in Japan) | Test the concept: creditworthiness, building credit, utilization |
| Insurance | Yes (HMO/PPO vs NHS vs public systems) | Test the concept: premiums, deductibles, risk pooling |
| Banking | Mostly universal (some country-specific fees/regulations) | Test the concept: account types, fees, FDIC/equivalent |
| Investing | Mostly universal (brokerage details vary) | Test the concept: stocks, bonds, diversification, compound interest |
| Budgeting | Universal | No variants needed |
| Debt | Mostly universal (student loan specifics vary) | Test the concept: interest, payoff strategies, good vs bad debt |
| Estate planning | Yes (laws vary dramatically) | Test the concept: wills, beneficiaries, why it matters |

**Implementation approach:**

```typescript
// Teaching card with country variants
{
  id: 'pf-u87-L1-T1',
  type: 'teaching',
  question: 'Your employer retirement account',
  explanation: 'Default explanation for international learners.',
  variants: {
    US: 'Your 401(k) lets you save for retirement with pre-tax dollars. Your employer often matches part of your contribution. Always contribute enough to get the full match.',
    UK: 'Your workplace pension is automatically enrolled. Your employer must contribute at least 3%. You contribute 5%. That is 8% total going toward your future.',
    AU: 'Your super (superannuation) gets 11.5% of your salary from your employer automatically. You can add extra voluntary contributions for tax benefits.',
    CA: 'Your RRSP lets you save for retirement with tax-deductible contributions. Many employers offer matching through a group RRSP.',
    IL: 'Your keren pensia gets contributions from both you (6%) and your employer (6.5%). This is mandatory for all employees in Israel.',
  },
  hint: 'Check your latest pay stub to see how much your employer contributes.',
}
```

The renderer picks the right variant based on the learner's country setting. If no variant exists for their country, it shows the default.

### What this does NOT mean

- **NOT separate courses per country.** One course, one question bank, localized teaching examples.
- **NOT watered-down content.** Americans still learn about 401(k) specifics. Brits still learn about workplace pensions. Everyone gets content that's relevant to their life.
- **NOT translating to other languages (yet).** All content is in English. Country variants are in English for the learner's country.
- **NOT every question needs variants.** Only ~20-30% of finance teaching cards need variants. Questions test concepts and are universal.

### Universal vs country-specific by topic

**Personal Finance:**

| Universal (teach to everyone) | Country-specific (tag and contextualize) |
|------------------------------|----------------------------------------|
| Budgeting, needs vs wants, spending tracking | Tax brackets, filing process, specific forms |
| Compound interest, time value of money | 401(k), IRA, Roth (US), ISA (UK), Super (AU), RRSP (CA) |
| Debt mechanics, interest, amortization | Student loan programs, bankruptcy laws |
| Credit concepts, creditworthiness | FICO (US), Experian 0-999 (UK), per-bank assessment (JP) |
| Insurance principles, risk pooling | HMO/PPO (US), NHS (UK), Medicare (AU) |
| Investing: stocks, bonds, diversification | Brokerage account types, tax-advantaged investing rules |
| Emergency fund, saving automation | Specific account types, interest rates |
| Estate planning principles | Wills/trusts laws (vary dramatically by country) |

**Psychology:**

| Universal | Needs cultural context |
|-----------|---------------------|
| Brain anatomy, neurons, neurotransmitters | Mental health stigma (varies hugely by culture) |
| Classical/operant conditioning | Parenting practices, reinforcement norms |
| Memory, forgetting curve, study techniques | Educational system differences |
| Cognitive biases (anchoring, confirmation, etc.) | Individualism vs collectivism framing |
| Emotions: big six, stress response | Emotional expression norms (vary by culture) |
| Social psychology experiments (Milgram, Asch) | Note: mostly replicated cross-culturally, but add context |
| Personality: Big Five | MBTI popularity varies by country (huge in Japan/Korea) |
| Decision making, prospect theory | Risk attitudes differ across cultures |
| Mental disorders: symptoms and categories | Therapy approaches, medication access, stigma |

**The WEIRD problem:** Most classic psychology research was done on Western, Educated, Industrialized, Rich, Democratic populations. The plan must explicitly note when findings may not generalize. Add teaching cards like: "This study was done with American college students. Research in collectivist cultures shows different results."

**Space & Astronomy:**

| Universal | Regional additions needed |
|-----------|------------------------|
| Physics, stellar evolution, cosmology | All universal |
| Solar system, exoplanets, black holes | All universal |
| Constellations | Southern Hemisphere has different visible constellations (Southern Cross, Magellanic Clouds) |
| Space history | Currently US-centric. Add: ESA (Rosetta, Huygens), ISRO (Chandrayaan, Mangalyaan), CNSA (Chang'e, Tiangong), JAXA (Hayabusa) |
| Space policy | Currently NASA-focused. Add: Artemis Accords international context, ESA role, commercial space globally |
| Astronomical traditions | Add: Arabic star names (many are already Arabic), Chinese constellations, Polynesian navigation, Aboriginal astronomy |

### Currency and measurement

| Rule | Implementation |
|------|---------------|
| **Currency** | Use generic amounts ("1,000/month") in explanations. Use $ only in clearly US-tagged examples. |
| **Measurement** | Use metric as default. Add imperial in parentheses for US-tagged content. "The ISS orbits at 408 km (253 miles)." |
| **Dates** | Use ISO format or spell out: "March 15" not "3/15" or "15/3" |
| **Temperature** | Celsius as default. Fahrenheit in parentheses for US context. |

### Languages and future translation

**Phase 1 (English):** Build all content in English. Use simple, clear language that translates well. Avoid idioms, slang, and culturally loaded metaphors.

**Phase 2 (future):** Priority languages for translation based on Duolingo's largest markets and EdTech demand:
1. Spanish (Latin America + Spain)
2. Portuguese (Brazil)
3. French
4. German
5. Japanese
6. Korean
7. Hindi
8. Arabic
9. Hebrew
10. Chinese (Simplified)

**Translation-friendly writing rules:**
- Avoid idioms ("break the bank", "hit the nail on the head")
- Avoid cultural references that don't translate ("Super Bowl", "Thanksgiving")
- Keep sentences short (max 20 words, already a rule)
- Use concrete nouns, not abstract metaphors

### Gamification across cultures

Research shows leaderboards and competition work differently across cultures:
- **Individualist cultures** (US, UK, Australia): Leaderboards and personal rankings are highly motivating
- **Collectivist cultures** (Japan, Korea, China): Group achievements and collaborative goals may be more effective
- **Current approach:** Keep leagues and leaderboards (they work broadly), but add future option for "team challenges" and "study groups" as social features expand

---

## Reward and Motivation Curve

Based on behavioral psychology research (Skinner, Kahneman, Deci & Ryan) and Duolingo's documented reward system.

### XP Design

| Rule | Spec | Why |
|------|------|-----|
| **Base XP per lesson** | 10 XP, flat across all sections | Prevents inflation. Consistent unit of progress. |
| **Accuracy bonus** | 0-5 XP based on % correct | Rewards quality, not just completion |
| **Speed bonus** | 0-3 XP for fast completion | Rewards fluency |
| **Perfect lesson bonus** | +5 XP for 100% accuracy | Celebration moment |
| **Difficulty multiplier** | Sections 1-5: 1.0x, Sections 6-10: 1.2x, Sections 11-15: 1.5x | Later, harder content should feel more rewarding |
| **Maximum per lesson** | ~23 XP (base 15 x 1.5 + bonuses) | Caps prevent farming |

### Level Curve

Levels use exponential scaling: early levels come fast (instant gratification), later levels slow down (user is already committed).

| Level | XP needed | Lessons to reach (~) | Timeline |
|-------|-----------|---------------------|----------|
| 1 | 0 | Start | Day 1 |
| 5 | 200 | ~15 lessons | Week 1 |
| 10 | 800 | ~60 lessons | Month 1 |
| 15 | 2,000 | ~150 lessons | Month 2 |
| 20 | 4,000 | ~300 lessons | Month 3 |
| 30 | 10,000 | ~600 lessons | Month 6 |
| 40 | 20,000 | ~800 lessons | Month 9 |
| 50 | 35,000 | ~900 (complete) | Month 12 |

Formula: `XP_needed = floor(50 * level^1.6)`

### Celebration Milestones

| Milestone | When | Celebration level | What happens |
|-----------|------|------------------|-------------|
| First lesson complete | 3 min | Medium-high | Confetti, "+10 XP" animation, "You just took your first step!" |
| First perfect lesson | ~10 min | Medium | Special star animation, achievement unlock |
| Day 3 streak | Day 3 | Medium | Streak fire animation, free streak freeze gift |
| Day 7 streak | Day 7 | High | Full-screen celebration, "Week Warrior" badge |
| First unit complete | ~1 week | High | Unit summary stats, share card |
| Level 5 | ~1 week | Medium | Level-up animation with new number |
| First section complete | ~2-3 weeks | Very high | Section summary, "You've mastered [topic]!" certificate |
| Day 30 streak | Month 1 | Very high | Special badge, gem reward |
| 25% course complete | ~Month 2 | High | Progress visualization, "Look how far you've come" |
| 50% course complete | ~Month 4 | Very high | Halfway celebration, "More than most people ever learn" |
| Day 100 streak | ~Month 3.5 | Very high | Triple-digit milestone, profile badge |
| 75% course complete | ~Month 7 | High | "Home stretch" framing |
| Course completion | ~Month 10-12 | **Maximum** | Full-screen animation, certificate, profile badge, stat summary, share card |

### Surprise Rewards (Variable Ratio)

Unpredictable rewards every 3-7 lessons. These activate dopamine pathways more than fixed rewards.

| Type | Frequency | Example |
|------|-----------|---------|
| **Bonus XP drop** | Every 3-5 lessons | "Bonus! +8 XP" with treasure chest animation |
| **Gem reward** | Every 5-7 lessons | "You found 5 gems!" |
| **Hidden achievement** | ~10% of achievements | Unlocks unexpectedly ("Night Owl: completed a lesson after midnight") |
| **Streak bonus** | Random days | "Double XP day!" (announced at session start) |

### Loss Aversion Introduction (Gradual)

Research shows loss mechanics should only appear after the learner has something worth protecting.

| Timing | Mechanic | Why now |
|--------|----------|--------|
| Day 1-7 | **Pure gain.** XP, achievements, celebrations. No penalties. | Build positive association. First week is all encouragement. |
| Day 7 | **Streak appears.** Gentle: "You've practiced 7 days in a row!" | They now have something to lose. |
| Day 7 | **Free streak freeze gifted.** | Safety net reduces anxiety about the new mechanic. |
| Day 14 | **League placement.** Bronze league, 30 users. | Social comparison motivation. Demotion threat is mild at Bronze. |
| Day 30+ | **Hearts system active.** 5 hearts, lose 1 per wrong answer. | User has formed the habit. Accuracy pressure improves learning. |
| Always | **Recovery available.** Streak repair, heart refills from practice, gem purchases. | Loss without recovery causes permanent churn. Always provide a way back. |

### The Motivation Dip Countermeasures

Research shows a predictable motivation curve: peak at Day 1, cliff at Week 2, desert at Month 1-2, recovery at Month 3+.

| Danger zone | When | Content design countermeasure |
|-------------|------|------------------------------|
| **Novelty fade** | Day 4-7 | Introduce speed-round and conversation lessons by Unit 3. New question types keep it fresh. |
| **Reality check** | Week 2-3 | First section checkpoint proves progress. "You just passed Section 1!" |
| **The desert** | Month 1-2 | Review units show how much they've learned. Case studies and real-world scenarios make it feel practical. "You now know more about [topic] than 90% of people." |
| **Plateau feeling** | Month 2-3 | Introduce calculation questions (new challenge). Professional scenarios make it feel like they're leveling up. |
| **Routine fatigue** | Month 4+ | New lesson types (timelines, case studies). Cross-section callbacks show how everything connects. |
| **Final stretch drag** | Month 8+ | Goal gradient effect kicks in. Show "85% complete, just 2 sections left!" Capstone content feels rewarding. |

---

## Misconception Lists (Must-Address Per Course)

Research shows that misconceptions not explicitly addressed survive the course. Each misconception below must appear as a teaching card that presents the myth, lets the learner commit, then reveals the truth.

### Personal Finance Misconceptions

| Misconception | Truth | Section to address |
|--------------|-------|-------------------|
| "I don't make enough to save" | Even $25/month compounds significantly over time | 3 (Saving) |
| "All debt is bad" | Mortgage and student loans can build wealth | 6 (Debt) |
| "I need to pick stocks to invest" | Index funds beat 90% of stock pickers | 8 (Investing) |
| "I'm in the 22% tax bracket so I pay 22% on everything" | Marginal brackets: only income above the threshold is taxed at that rate | 5 (Taxes) |
| "Renting is throwing money away" | Renting can be financially optimal in many markets | 10 (Real Estate) |
| "You need a lot of money to start investing" | Many brokerages have $0 minimums and fractional shares | 8 (Investing) |
| "Credit cards are always bad" | Responsible use builds credit and earns rewards | 6 (Debt) |
| "Paying off your mortgage early is always smart" | Low-rate mortgage debt may be better left alone while investing the difference | 10 (Real Estate) |
| "Financial advisors always have your best interest" | Fee-only fiduciaries do. Commission-based may not. | 15 (Mastery) |

### Psychology Misconceptions

| Misconception | Truth | Section to address |
|--------------|-------|-------------------|
| "We only use 10% of our brain" | Brain imaging shows all regions are active. Damage to any area causes deficits. | 1 (Brain) |
| "Learning styles (visual, auditory) are real" | No evidence that matching instruction to "style" improves learning | 4 (Memory) |
| "Left-brain = logical, right-brain = creative" | Both hemispheres contribute to all functions. Lateralization exists but not in the pop-science way. | 1 (Brain) |
| "Schizophrenia means split personality" | Schizophrenia involves psychosis (hallucinations, delusions). Split personality is DID, a separate condition. | 11 (Mental Health) |
| "Opposites attract" | Research consistently shows similarity predicts attraction | 8 (Social) |
| "Psychology is just common sense" | Common sense contradicts itself. Psychology provides empirical evidence. | 1 (Brain) |
| "You can tell if someone is lying by their body language" | No reliable behavioral cue for deception. Even experts perform at chance. | 8 (Social) |
| "Venting anger helps reduce it" | Research shows venting often increases anger (catharsis myth) | 7 (Emotions) |
| "People grieve in 5 stages" | Kubler-Ross stages were for dying patients, not universal grief. Grief is nonlinear. | 10 (Development) |
| "Therapy means lying on a couch talking about your childhood" | Most evidence-based therapy (CBT, DBT) is structured, present-focused, and skill-building | 12 (Therapy) |

### Space & Astronomy Misconceptions

| Misconception | Truth | Section to address |
|--------------|-------|-------------------|
| "Seasons are caused by Earth being closer to the Sun" | Axial tilt (23.5 degrees) causes seasons. Earth is actually closest to the Sun in Northern winter. | 3 (Earth & Moon) |
| "Moon phases are caused by Earth's shadow" | Phases are caused by the changing angle of sunlight. Earth's shadow only causes eclipses. | 3 (Earth & Moon) |
| "The Sun is yellow" | The Sun is white. Atmosphere scatters blue light, making it appear yellow from the surface. | 2 (Solar System) |
| "Astronauts float because there's no gravity in space" | ISS astronauts experience ~90% of surface gravity. They float because they're in freefall (orbit). | 9 (Rockets) |
| "The Big Bang was an explosion in space" | It was an expansion of space itself. There was no pre-existing void for it to explode into. | 8 (Cosmology) |
| "Black holes are cosmic vacuum cleaners" | They only pull objects that come close enough. From a distance, they have the same gravity as the star they replaced. | 7 (Black Holes) |
| "Stars twinkle because they pulse" | Twinkling (scintillation) is caused by Earth's atmosphere bending starlight. In space, stars don't twinkle. | 1 (Looking Up) |
| "There's a dark side of the Moon" | All sides get sunlight. The "far side" faces away from Earth but is fully illuminated during new moon. | 3 (Earth & Moon) |
| "Sound travels in space" | Space is a vacuum. No medium, no sound. Explosions in space are silent. | 9 (Rockets) |

---

## Assumed Vocabulary Per Section Boundary

Content writers must know which terms learners have already mastered at each section boundary. Using a term before it's been taught violates the "never assume prior knowledge" rule.

### Personal Finance: Vocabulary Progression

| After Section | Learner knows these terms |
|--------------|--------------------------|
| 1-2 | Income, expense, budget, saving, spending, bank account, checking, savings, debit card, credit card, interest (basic concept) |
| 3-4 | Emergency fund, high-yield savings, compound interest, inflation, sinking fund, checking vs savings, overdraft, FDIC, tax, tax bracket, deduction, credit (concept), W-2, 1099 |
| 5-6 | Marginal tax rate, standard deduction, tax credit, APR, minimum payment, principal, amortization, secured vs unsecured debt, refinancing, consolidation, snowball, avalanche |
| 7-8 | Credit score, FICO, credit utilization, hard pull, soft pull, credit report, stock, bond, index fund, ETF, mutual fund, diversification, risk tolerance, brokerage, dollar-cost averaging, dividend, capital gain |
| 9-10 | P/E ratio, market cap, valuation, expense ratio, asset allocation, rebalancing, mortgage, amortization schedule, down payment, escrow, PMI, closing costs, REIT, cap rate |
| 11-12 | Premium, deductible, copay, coinsurance, HMO, PPO, term life, whole life, disability insurance, 401(k), IRA, Roth, employer match, vesting, RMD, Social Security, 4% rule |
| 13-14 | Will, trust, beneficiary, estate tax, power of attorney, probate, LLC, S-Corp, revenue, profit, cash flow, P&L statement, balance sheet, quarterly taxes |
| 15 | All terms. Professional-level vocabulary assumed. |

### Psychology: Vocabulary Progression

| After Section | Learner knows these terms |
|--------------|--------------------------|
| 1-2 | Neuron, synapse, neurotransmitter, cerebrum, cerebellum, brain stem, hemisphere, consciousness, attention, sensation, perception, stimulus |
| 3-4 | Classical conditioning, operant conditioning, reinforcement, punishment, habituation, encoding, retrieval, short-term memory, long-term memory, working memory, forgetting curve, spaced repetition |
| 5-6 | Heuristic, cognitive bias, confirmation bias, anchoring, availability heuristic, System 1, System 2, loss aversion, prospect theory, nudge, framing effect |
| 7-8 | Emotion, motivation, intrinsic, extrinsic, dopamine, fight-or-flight, EQ, conformity, obedience, bystander effect, groupthink, persuasion, stereotype, attribution |
| 9-10 | Big Five (OCEAN), nature vs nurture, self-concept, growth mindset, Piaget stages, attachment theory, Erikson stages, moral development |
| 11-12 | DSM, anxiety disorder, depression, PTSD, OCD, schizophrenia, personality disorder, CBT, DBT, psychodynamic, psychopharmacology, evidence-based treatment |
| 13-14 | Behavioral economics, mental accounting, endowment effect, I-O psychology, experimental design, control group, variable, p-value, effect size, correlation, causation, statistical significance |
| 15 | All terms. Professional-level vocabulary assumed. |

### Space & Astronomy: Vocabulary Progression

| After Section | Learner knows these terms |
|--------------|--------------------------|
| 1-2 | Star, planet, constellation, light-year, AU, satellite, orbit, gravity, solar system, asteroid, comet, moon, dwarf planet |
| 3-4 | Axial tilt, eclipse, tide, aurora, magnetic field, electromagnetic spectrum, wavelength, frequency, telescope, refractor, reflector, spectroscopy, redshift, blueshift |
| 5-6 | Nuclear fusion, main sequence, red giant, white dwarf, supernova, neutron star, HR diagram, spectral class, luminosity, galaxy, spiral, elliptical, quasar, dark matter |
| 7-8 | Black hole, event horizon, singularity, Schwarzschild radius, gravitational wave, general relativity, spacetime, Big Bang, cosmic microwave background, inflation, dark energy, Hubble's law |
| 9-10 | Escape velocity, orbital mechanics, Kepler's laws, delta-v, gravity assist, LEO, GEO, staging, thrust, specific impulse |
| 11-12 | Exoplanet, transit method, radial velocity, habitable zone, biosignature, Drake equation, Fermi Paradox, astrophotography, right ascension, declination, mount types |
| 13-14 | Spacecraft bus, telemetry, Deep Space Network, ion propulsion, solar sail, Kessler syndrome, Lagrange point, delta-v budget, life support |
| 15 | All terms. Professional-level vocabulary assumed. |

---

## Sample Conversation Lesson

### Psychology, Section 8, Unit 86: "The Office Persuader"

```typescript
{
  id: 'psy-u86-L-conv',
  title: 'The Office Persuader',
  description: 'Spot Cialdini\'s persuasion principles being used on you at work.',
  icon: '💬',
  type: 'conversation',
  xpReward: 25,
  questions: [],
  conversationStartNodeId: 'psy-u86-conv-C1',
  conversationNodes: [
    {
      id: 'psy-u86-conv-C1',
      speaker: 'Marcus',
      message: 'Hey, can I ask you something? My coworker keeps getting me to agree to things and I can\'t figure out how.',
      nextNodeId: 'psy-u86-conv-C2',
    },
    {
      id: 'psy-u86-conv-C2',
      speaker: 'Marcus',
      message: 'Last week she brought me coffee, then asked me to cover her shift. I felt like I had to say yes. What happened?',
      options: [
        {
          text: 'That\'s reciprocity. She gave you something first, so you felt obligated to return the favor.',
          nextNodeId: 'psy-u86-conv-C3',
          quality: 'great',
          feedback: 'Reciprocity is one of Cialdini\'s 6 principles. A small gift creates a sense of obligation.',
        },
        {
          text: 'She\'s just being nice. Don\'t overthink it.',
          nextNodeId: 'psy-u86-conv-C3',
          quality: 'poor',
          feedback: 'It might be genuine, but the pattern of giving before asking is classic reciprocity.',
        },
        {
          text: 'That\'s the authority principle. She\'s asserting dominance.',
          nextNodeId: 'psy-u86-conv-C3',
          quality: 'okay',
          feedback: 'Authority is a different principle. This is reciprocity: give first, then ask.',
        },
      ],
    },
    {
      id: 'psy-u86-conv-C3',
      speaker: 'Marcus',
      message: 'Today she said "Everyone on the team already signed up for the volunteer event." Now I feel like I should too.',
      nextNodeId: 'psy-u86-conv-C4',
    },
    {
      id: 'psy-u86-conv-C4',
      speaker: 'Marcus',
      message: 'Is that another trick?',
      options: [
        {
          text: 'That\'s social proof. "Everyone is doing it" makes you feel like you should too.',
          nextNodeId: 'psy-u86-conv-C5',
          quality: 'great',
          feedback: 'Social proof is powerful. We look to others\' behavior when we\'re uncertain.',
        },
        {
          text: 'That\'s scarcity. She\'s making it seem like spots are limited.',
          nextNodeId: 'psy-u86-conv-C5',
          quality: 'okay',
          feedback: 'Scarcity would be "only 2 spots left!" This is social proof: what others are doing.',
        },
        {
          text: 'She\'s just sharing information. Nothing manipulative about it.',
          nextNodeId: 'psy-u86-conv-C5',
          quality: 'poor',
          feedback: 'Stating what "everyone" is doing is a textbook social proof technique.',
        },
      ],
    },
    {
      id: 'psy-u86-conv-C5',
      speaker: 'Marcus',
      message: 'She also asked me to just "review one page" of her report. I said sure. Then she asked me to review the whole thing. I was already in, so I did it.',
      nextNodeId: 'psy-u86-conv-C6',
    },
    {
      id: 'psy-u86-conv-C6',
      speaker: 'Marcus',
      message: 'What\'s that one called?',
      options: [
        {
          text: 'Commitment and consistency. You said yes to the small ask, so saying no to the bigger ask would feel inconsistent.',
          nextNodeId: 'psy-u86-conv-C7',
          quality: 'great',
          feedback: 'The foot-in-the-door technique. Once you commit to a small action, you want to stay consistent.',
        },
        {
          text: 'That\'s the liking principle. You helped because you like her.',
          nextNodeId: 'psy-u86-conv-C7',
          quality: 'okay',
          feedback: 'Liking helps, but the escalation from small to large request is commitment and consistency.',
        },
        {
          text: 'That\'s just poor boundaries on your part.',
          nextNodeId: 'psy-u86-conv-C7',
          quality: 'poor',
          feedback: 'It\'s a well-documented psychological principle, not a personal failing. Awareness is the defense.',
        },
      ],
    },
    {
      id: 'psy-u86-conv-C7',
      speaker: 'Marcus',
      message: 'So now that I know these, how do I actually say no?',
      nextNodeId: 'psy-u86-conv-C8',
    },
    {
      id: 'psy-u86-conv-C8',
      speaker: 'Narrator',
      message: 'You identified 3 of Cialdini\'s 6 principles: reciprocity, social proof, and commitment/consistency. Recognizing the technique is the first step to deciding freely.',
    },
  ],
}
```

## Sample Speed-Round Lesson

### Space, Section 5, Unit 60: "Stars Blitz"

```typescript
{
  id: 'sp-u60-L-speed',
  title: 'Stars Speed Round',
  description: 'Race the clock on stellar birth, life, and death.',
  icon: '⚡',
  type: 'speed-round',
  xpReward: 25,
  questions: [],
  speedTimeLimit: 60,
  speedQuestions: [
    { id: 'sp-u60-SQ1', question: 'Stars are powered by:', options: ['Nuclear fusion', 'Combustion', 'Electricity', 'Dark energy'], correctIndex: 0 },
    { id: 'sp-u60-SQ2', question: 'The hottest stars are:', options: ['Blue', 'Red', 'Yellow', 'Green'], correctIndex: 0 },
    { id: 'sp-u60-SQ3', question: 'Our Sun is classified as a:', options: ['G-type star', 'Red giant', 'Neutron star', 'White dwarf'], correctIndex: 0 },
    { id: 'sp-u60-SQ4', question: 'Stars form inside:', options: ['Nebulae', 'Black holes', 'Asteroids', 'Moons'], correctIndex: 0 },
    { id: 'sp-u60-SQ5', question: 'A dying massive star becomes a:', options: ['Supernova', 'Comet', 'Planet', 'Asteroid'], correctIndex: 0 },
    { id: 'sp-u60-SQ6', question: 'The HR diagram plots:', options: ['Luminosity vs temperature', 'Mass vs age', 'Size vs distance', 'Color vs speed'], correctIndex: 0 },
    { id: 'sp-u60-SQ7', question: 'A teaspoon of neutron star weighs:', options: ['A billion tons', 'A kilogram', 'Nothing', 'A million grams'], correctIndex: 0 },
    { id: 'sp-u60-SQ8', question: 'The Sun will eventually become a:', options: ['White dwarf', 'Black hole', 'Neutron star', 'Red dwarf'], correctIndex: 0 },
    { id: 'sp-u60-SQ9', question: 'Heavier elements are created by:', options: ['Supernovae', 'Planets', 'Moons', 'Comets'], correctIndex: 0 },
    { id: 'sp-u60-SQ10', question: 'OBAFGKM classifies stars by:', options: ['Temperature', 'Size', 'Age', 'Distance'], correctIndex: 0 },
    { id: 'sp-u60-SQ11', question: 'Binary stars are:', options: ['Two stars orbiting each other', 'Stars with two colors', 'Dying stars', 'Newborn stars'], correctIndex: 0 },
    { id: 'sp-u60-SQ12', question: 'A pulsar is a spinning:', options: ['Neutron star', 'Black hole', 'White dwarf', 'Red giant'], correctIndex: 0 },
    { id: 'sp-u60-SQ13', question: 'Stellar parallax measures:', options: ['Distance', 'Temperature', 'Mass', 'Age'], correctIndex: 0 },
    { id: 'sp-u60-SQ14', question: 'Red giants are:', options: ['Cool and large', 'Hot and small', 'Cool and small', 'Hot and large'], correctIndex: 0 },
    { id: 'sp-u60-SQ15', question: 'Iron in a star\'s core signals:', options: ['Imminent collapse', 'Long life ahead', 'Planet formation', 'Stability'], correctIndex: 0 },
  ],
}
```

*Note: correctIndex values in this sample are all 0 for readability. In actual content, they MUST be randomized across 0-3 using the fix-correct-index script.*

---

## Existing Content Rewrite Assessment

### What needs updating vs expanding

| Course | Update existing? | Expand with new? | Details |
|--------|-----------------|------------------|---------|
| **Finance** | **Yes, add country variants to ~20-30% of teaching cards.** Existing US content stays as-is for US learners. Add `variants` field with UK/AU/CA/IL/default versions. Refactor questions to test concepts, not US-specific names. | Yes, ~70% is new sections. | Tax, retirement, credit, and insurance teaching cards need the most variants. Questions should already test concepts and mostly don't need changes. |
| **Psychology** | **Minor, 5-10%.** | Yes, ~75% is new sections. | Add WEIRD caveat teaching cards. Add cross-cultural examples to social psychology. Note when studies were only replicated in Western samples. |
| **Space** | **Minor, 10-15%.** | Yes, ~70% is new sections. | Add Southern Hemisphere sky content. Add ESA, ISRO, CNSA, JAXA missions alongside NASA. Add non-Western astronomical traditions (Arabic star names, Polynesian navigation, Aboriginal astronomy). |

### Finance variant priority

| Existing section | Variant work needed | What changes |
|-----------------|-------------------|-------------|
| Welcome to Money | None | Already universal |
| Budgeting & Saving | Minor | Currency examples need variants ($, £, A$, etc.) |
| Banking & Taxes | **Heavy** | Tax system teaching cards need full variants per country. Questions should test marginal-rate concept, not "what's the IRS" |
| Debt & Credit | **Heavy** | Credit score teaching cards need variants (FICO, Experian UK, etc.). Questions test the concept of creditworthiness. |
| Investing | Minor | Mostly universal. Brokerage details need minor variants. |
| Retirement | **Heavy** | Every retirement account teaching card needs variants (401k, pension, super, RRSP, keren pensia). Questions test matching, compound growth. |
| Real Estate | Moderate | Mortgage concepts are universal. Home buying process details need variants. |
| Insurance | **Heavy** | Health insurance is completely different per country. Must teach the principle (risk pooling, premiums, deductibles) then show country system. |

### Full existing content upgrade (before expansion)

Globalization is only one part. Existing content must also be brought up to the full quality spec before we build new sections on top of it. Here's everything that needs to happen to existing content:

**All 3 courses:**

| Task | Finance | Psychology | Space |
|------|---------|------------|-------|
| Fix correctIndex bias | Already done | Needs fixing (90% at 0) | Needs fixing (100% at 0) |
| Add question type variety | Already has 17 types | Needs match-pairs, sort-buckets, order-steps, scenarios | Needs order-steps, scenarios, slider-estimate |
| Add review units | None exist. Add 1 per 4 units. | Same | Same |
| Add section checkpoints | None exist. Add 1 per section. | Same | Same |
| Rename units/lessons | Some need outcome-based names | Many academic-style names need updating | Some need updating |
| Difficulty audit | Check easy-after-teaching rule | Check easy-after-teaching rule | Check easy-after-teaching rule |
| Add misconception teaching cards | 9 misconceptions from the list | 10 misconceptions from the list | 9 misconceptions from the list |
| Add calculation questions | Has slider-estimate | Zero slider-estimate. Needs for Sections 5+ | Zero slider-estimate. Needs for Sections 4+ |
| Add "aha moment" teaching cards | 2 per section minimum | 2 per section minimum | 2 per section minimum |
| Add "Try this now" hints | Some exist | Verify 2+ per unit | Verify 2+ per unit |
| Em dash audit | Clean | Needs check | Needs check |

**Finance only:**

| Task | Scope |
|------|-------|
| Add country variants to teaching cards | ~100-150 teaching cards need `variants` field |
| Refactor US-name-testing questions | Questions that test "what is a 401k" should test "why max your employer match" |
| Add country-agnostic hints | "Details vary by country" notes on US-specific content |

**Psychology only:**

| Task | Scope |
|------|-------|
| Add WEIRD caveats | ~10-15 teaching cards noting Western sample bias |
| Add cross-cultural examples | Social psychology and personality sections |
| Add non-Western therapy mentions | Brief notes in any future therapy content |

**Space only:**

| Task | Scope |
|------|-------|
| Add Southern Hemisphere sky | Constellation content needs both hemispheres |
| Add global space agencies | ESA, ISRO, CNSA, JAXA alongside NASA references |
| Add non-Western astronomy | Arabic star names, Polynesian navigation, Aboriginal astronomy |

### Upgrade before or after expansion?

**Upgrade existing content FIRST, then expand.** Three reasons:
1. New sections should be built with the variant system, review units, and naming conventions from the start.
2. Existing sections set the quality bar. If Section 1 is low quality while Section 13 is polished, the learner notices the inconsistency.
3. The QA automation script should be running before any new content is written, catching issues in existing and new content equally.

### Existing content upgrade agent count

| Task | Agents needed | Notes |
|------|--------------|-------|
| Fix correctIndex (Psychology + Space) | 2 | Script-based, like ME fix |
| Add question types (Psychology + Space) | 4 (2 per course) | Each agent handles 5 units |
| Add review units + checkpoints (all 3) | 3 (1 per course) | Programmatic: generate review lessons from existing questions |
| Add Finance country variants | 3 | Each agent handles 4-5 existing sections |
| Rename units/lessons (all 3) | 3 (1 per course) | Update meta + unit files |
| Add misconception teaching cards (all 3) | 3 (1 per course) | Insert ~9-10 new teaching cards per course |
| Difficulty + em dash + calculation audit (all 3) | 3 (1 per course) | Review + fix pass |
| Psychology WEIRD + Space global additions | 2 | 1 per course |
| **Total** | **~23 agents** | Can run in batches of 5-8 |

---

## Content QA Automation Script

A script should run before every seed to catch common violations automatically.

### Checks to automate

```
1. No em dashes (—) or double dashes (--) in visible content
2. correctIndex distributed across 0-3 (flag if >35% at any position)
3. Every lesson has 2-3 teaching cards
4. Teaching cards have NO options array
5. Teaching cards have max 2-sentence explanations
6. Every 4th unit in a section is a review unit
7. Every section ends with a checkpoint
8. No duplicate question IDs
9. Match-pairs have exactly 4 pairs
10. Sort-buckets have exactly 6 items and 2 buckets
11. Order-steps have 4-5 items
12. Speed-rounds have exactly 15 questions and 60s timer
13. Conversations have exactly 3 decision points
14. All question types have required fields
15. No option text exceeds 15 words
16. Country-specific content has region tag
```

Save as `scripts/qa-content.ts` and run before seed.

---

## Implementation Order (Final)

**Phase 0: Upgrade all existing content to full quality spec** (2-3 weeks, ~23 agents in batches)

Batch 1 (5 agents, parallel):
- Fix correctIndex bias in Psychology and Space (2 agents, script-based)
- Add question type variety to Psychology and Space (2 agents, each handles 5 units)
- Build QA automation script (1 agent)

Batch 2 (8 agents, parallel):
- Add Finance country variants (3 agents, each handles 4-5 sections)
- Add review units and section checkpoints to all 3 courses (3 agents, 1 per course)
- Add Psychology WEIRD caveats (1 agent)
- Add Space global agencies + Southern Hemisphere content (1 agent)

Batch 3 (6 agents, parallel):
- Rename units/lessons to outcome-based names (3 agents, 1 per course)
- Add misconception teaching cards (3 agents, 1 per course)

Batch 4 (4 agents, parallel):
- Difficulty audit + em dash fix + calculation questions (3 agents, 1 per course)
- Final QA pass using automation script (1 agent)

**Phase 1: Build section infrastructure** (1-2 weeks)
- Add section metadata layer to the data model
- Implement section checkpoints and review units
- Build adaptive placement test
- Add glossary data structure
- Build QA automation script
- Implement reward/celebration system per milestone spec

**Phase 2: Expand courses, section by section** (ongoing)

| Sprint | Course | Section | Status / Notes |
|--------|--------|---------|----------------|
| 1 | Psychology | 2 (Sensation & Perception) | DONE |
| 2 | Space | 4 (Light & Telescopes) | DONE |
| 3 | Finance | 13 (Estate Planning) | DONE |
| 4 | Psychology | 10 (Developmental) | DONE |
| 5 | Space | 12 (Amateur Astronomy) | DONE |
| 6 | Finance | 14 (Business) | DONE |
| 7 | Psychology | 11 (Mental Health) | DONE |
| 8 | Psychology | 12 (Therapy) | DONE |
| 9 | Space | 7 (Black Holes) | DONE |
| 10a | All | Integrate written files (Psych 3,5,13 + Space 6,13 + Finance 5) | FILES WRITTEN, NOT INTEGRATED |
| — | | **Sequential expansion resumes below (sections 1→15 per course)** | |
| 10b | Finance | 1 (What Is Money?) | Deepen from 1 unit |
| 10c | Finance | 2 (Spending & Budgeting) | Deepen from 1 unit |
| 10d | Finance | 3 (Saving & Emergency Planning) | Deepen from 1 unit |
| 10e | Finance | 4 (Banking & Financial Systems) | Deepen from 1 unit |
| 10f | Finance | 6 (Debt Mastery) | Deepen from 1 unit |
| 10g | Finance | 7 (Credit System) | Deepen from 1 unit |
| 10h | Finance | 8 (Investing Fundamentals) | Deepen from 1 unit |
| 10i | Finance | 9 (Advanced Investing) | Deepen from 1 unit |
| 10j | Finance | 10 (Real Estate) | Deepen from 1 unit |
| 10k | Finance | 11 (Insurance & Risk) | Deepen from 1 unit |
| 10l | Finance | 12 (Retirement Planning) | Deepen from 1 unit |
| 10m | Psychology | 1 (Welcome to Your Mind) | Deepen from 1 unit |
| 10n | Psychology | 4 (Memory) | Deepen from 1 unit |
| 10o | Psychology | 6 (Cognitive Biases) | Deepen from 2 units |
| 10p | Psychology | 7 (Emotions & Motivation) | Deepen from 1 unit |
| 10q | Psychology | 8 (Social Psychology) | Deepen from 1 unit |
| 10r | Psychology | 9 (Personality) | Deepen from 1 unit |
| 10s | Psychology | 14 (Research Methods) | Deepen from 1 unit |
| 10t | Space | 1 (Looking Up) | Deepen from 1 unit |
| 10u | Space | 2 (The Solar System) | Deepen from 1 unit |
| 10v | Space | 3 (Earth & Moon) | Deepen from 1 unit |
| 10w | Space | 5 (Stars) | Deepen from 1 unit |
| 10x | Space | 8 (Cosmology) | Deepen from 1 unit |
| 10y | Space | 9 (Rockets & Orbital Mechanics) | Deepen from 1 unit |
| 10z | Space | 10 (Space Exploration History) | Deepen from 1 unit |
| 10aa | Space | 11 (Exoplanets & Astrobiology) | Deepen from 1 unit |
| 10ab | Space | 14 (Space Frontiers) | Deepen from 1 unit |
| 11 | All | Add calculation questions | Sections 5+ get slider-estimate and real math |
| 12 | All | Capstone sections (15) | Final professional-level challenges |
| 13 | All | QA pass and polish | Voice consistency, difficulty calibration, misconception coverage |
