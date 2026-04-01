# Course Expansion Progress Tracker

> This file tracks what's been done and what's next. Read this at the start of every session to know where to continue.
>
> **How to use:** At the start of any new chat session, say: "Continue the course expansion from where we left off. Read docs/expansion-progress.md"

---

## Current Status: PHASE 2 IN PROGRESS (Sprints 1-9 done, Sprint 10 partially done)

**Last updated:** 2026-04-01
**Last completed step:** Sprint 10 Batch A content files written (not yet integrated into meta/loaders)
**Next step:** Integrate Sprint 10 Batch A files into meta.ts + course-meta.ts, then seed. Then continue Sprint 10 (expand existing 1-unit sections) + Sprints 11-13.
**Deferred to future:** Adaptive placement test, section checkpoints UI

### What needs to happen next session:
1. Integrate 12 new section files into meta.ts and course-meta.ts lazy loaders (files exist but aren't wired up yet)
2. Seed to verify
3. Continue Sprint 10: expand existing sections that still have only 1 unit each
4. Sprint 11: Add calculation questions to sections 5+
5. Sprint 12: Capstone sections (section 15 for each course)
6. Sprint 13: QA pass and polish

---

## Phase 0: Upgrade Existing Content

### Batch 1: Fix critical quality issues
| Task | Course | Status | Notes |
|------|--------|--------|-------|
| Fix correctIndex bias | Psychology | DONE | 206 questions randomized, 21/29/28/22% distribution |
| Fix correctIndex bias | Space | DONE | 212 questions randomized, 25/27/27/21% distribution |
| Add question type variety | Psychology | DONE | 50 new: 20 sort-buckets, 20 order-steps, 10 scenarios |
| Add question type variety | Space | DONE | 56 new: 23 order-steps, 21 scenarios, 12 slider-estimates |
| Build QA automation script | All | DONE | scripts/qa-content.ts, found 910 violations to fix later |

### Batch 2: Globalization and structure
| Task | Course | Status | Notes |
|------|--------|--------|-------|
| Add country variants | Finance (Banking & Taxes) | DONE | 21 variants added |
| Add country variants | Finance (Debt & Credit) | DONE | 7 variants added |
| Add country variants | Finance (Retirement) | DONE | 16 variants added |
| Add country variants | Finance (Insurance) | DONE | 18 variants added |
| Add country variants | Finance (Credit Scores) | DONE | 16 variants added |
| Add country variants | Finance (other sections) | DEFERRED | Will add during expansion |
| Add review units | Finance | DONE | 3 review lessons added |
| Add review units | Psychology | DONE | 2 review lessons added |
| Add review units | Space | DONE | 2 review lessons added |
| Add section checkpoints | All 3 | DEFERRED | Will add with section infrastructure in Phase 1 |
| Add WEIRD caveats | Psychology | DONE | 15 caveats added across 5 units |
| Add global agencies + Southern sky | Space | DONE | 25+ additions, new "Space Goes Global" lesson |

### Batch 3: Naming and misconceptions
| Task | Course | Status | Notes |
|------|--------|--------|-------|
| Rename units to outcome-based | Finance | DONE | 7 unit renames |
| Rename units to outcome-based | Psychology | DONE | 8 unit + 8 lesson renames |
| Rename units to outcome-based | Space | DONE | 8 unit + 12 lesson renames |
| Add misconception teaching cards | Finance | DONE | 8 myth-busting cards across 6 unit files |
| Add misconception teaching cards | Psychology | DONE | 9 myth-busting cards across 5 unit files |
| Add misconception teaching cards | Space | DONE | 9 myth-busting cards across 5 unit files |

### Batch 4: Final audit
| Task | Course | Status | Notes |
|------|--------|--------|-------|
| Difficulty audit + fix | Finance | DONE | 17 fixes across 11 files |
| Difficulty audit + fix | Psychology | DONE | 2 fixes |
| Difficulty audit + fix | Space | DONE | 25+ fixes across 10 files |
| Add calculation questions | Psychology | DONE | 4 slider-estimate questions added |
| Add calculation questions | Space | DONE | 59 slider-estimate questions across sections 4-10 |
| Em dash audit | Psychology | DONE | 0 em dashes remaining |
| Em dash audit | Space | DONE | 0 em dashes remaining |
| Run QA automation script | All | DONE | ME has 623 pre-existing violations (not expansion scope). Non-ME courses clean. |

---

## Phase 1: Infrastructure

| Task | Status | Notes |
|------|--------|-------|
| Section metadata data model | DONE | sectionIndex + sectionTitle on all 33 units + metas |
| Section checkpoints UI | DEFERRED | Visual feature, will add when content expansion creates enough sections |
| Adaptive placement test | DEFERRED | Needs more content sections first |
| Glossary data structure | DONE | 180 finance + 139 psychology + 150 space terms |

---

## Phase 2: Content Expansion

### Sprint Status

| Sprint | Description | Status |
|--------|-------------|--------|
| 1 | Psychology Section 2 (Sensation & Perception) | DONE (9 units, previous session) |
| 2 | Space Section 4 (Light & Telescopes) | DONE (12 units, previous session) |
| 3 | Finance Section 13 (Estate Planning) | DONE (11 units, previous session) |
| 4 | Psychology Section 10 (Developmental) | DONE (11 units, seeded) |
| 5 | Space Section 12 (Amateur Astronomy) | DONE (11 units, seeded) |
| 6 | Finance Section 14 (Business) | DONE (11 units, seeded) |
| 7 | Psychology Section 11 (Mental Health) | DONE (15 units, seeded) |
| 8 | Psychology Section 12 (Therapy) | DONE (13 units, seeded) |
| 9 | Space Section 7 (Black Holes) | DONE (10 units, seeded) |
| 10a | New sections: Psych 3, 5, 13 + Space 6, 13 + Finance 5 | FILES WRITTEN, NOT INTEGRATED |
| 10b | Deepen existing 1-unit sections | NOT STARTED |
| 11 | Add calculation questions | NOT STARTED |
| 12 | Capstone sections (section 15) | NOT STARTED |
| 13 | QA pass and polish | NOT STARTED |

### Sprint 10a: Files written but need integration

These 12 content files exist but are NOT yet wired into meta.ts or course-meta.ts loaders. Next session must integrate them, then seed.

**Psychology (30 new units in 6 files):**
- `section-3-learning-part1.ts` (psySection3Part1, 5 units) + `section-3-learning-part2.ts` (psySection3Part2, 4 units) → Section 3, sectionIndex: 2
- `section-5-intelligence-part1.ts` (psySection5Part1, 5 units) + `section-5-intelligence-part2.ts` (psySection5Part2, 5 units) → Section 5, sectionIndex: 4
- `section-13-applied-part1.ts` (psySection13Part1, 6 units) + `section-13-applied-part2.ts` (psySection13Part2, 5 units) → Section 13, sectionIndex: 12

**Space (20 new units in 4 files):**
- `section-6-galaxies-part1.ts` (spaceSection6Part1, 5 units) + `section-6-galaxies-part2.ts` (spaceSection6Part2, 5 units) → Section 6, sectionIndex: 5
- `section-13-tech-part1.ts` (spaceSection13Part1, 5 units) + `section-13-tech-part2.ts` (spaceSection13Part2, 5 units) → Section 13, sectionIndex: 12

**Finance (13 new units in 2 files):**
- `section-5-taxes-part1.ts` (finSection5Part1, 7 units) + `section-5-taxes-part2.ts` (finSection5Part2, 6 units) → Section 5, sectionIndex: 4

### Per-Course Section Status

#### Personal Finance

| Section | Title | Status | Notes |
|---------|-------|--------|-------|
| 1 | What Is Money? | existing (1 unit) | needs deepening |
| 2 | Spending & Budgeting | existing (1 unit) | needs deepening |
| 3 | Saving & Emergency Planning | existing (1 unit) | needs deepening |
| 4 | Banking & Financial Systems | existing (1 unit) | needs deepening |
| 5 | Taxes | FILES WRITTEN | 13 units, needs meta integration |
| 6 | Debt Mastery | existing (1 unit) | needs deepening |
| 7 | Credit System | existing (1 unit) | needs deepening |
| 8 | Investing Fundamentals | existing (1 unit) | needs deepening |
| 9 | Advanced Investing | existing (1 unit) | needs deepening |
| 10 | Real Estate | existing (1 unit) | needs deepening |
| 11 | Insurance & Risk | existing (1 unit) | needs deepening |
| 12 | Retirement Planning | existing (1 unit) | needs deepening |
| 13 | Estate Planning | DONE | 11 units, seeded |
| 14 | Business & Self-Employment | DONE | 11 units, seeded |
| 15 | Financial Mastery (Capstone) | NOT STARTED | |

#### Psychology

| Section | Title | Status | Notes |
|---------|-------|--------|-------|
| 1 | Welcome to Your Mind | existing (1 unit) | needs deepening |
| 2 | Sensation & Perception | DONE | 9 units, seeded |
| 3 | Learning | FILES WRITTEN | 9 units, needs meta integration |
| 4 | Memory | existing (1 unit) | needs deepening |
| 5 | Thinking & Intelligence | FILES WRITTEN | 10 units, needs meta integration |
| 6 | Cognitive Biases | existing (2 units) | needs deepening |
| 7 | Emotions & Motivation | existing (1 unit) | needs deepening |
| 8 | Social Psychology | existing (1 unit) | needs deepening |
| 9 | Personality | existing (1 unit) | needs deepening |
| 10 | Developmental Psychology | DONE | 11 units, seeded |
| 11 | Mental Health & Abnormal | DONE | 15 units, seeded |
| 12 | Therapy & Treatment | DONE | 13 units, seeded |
| 13 | Applied & Industrial | FILES WRITTEN | 11 units, needs meta integration |
| 14 | Research Methods | existing (1 unit) | needs deepening |
| 15 | Influence & Dark Patterns (Capstone) | existing (1 unit) | needs deepening |

#### Space & Astronomy

| Section | Title | Status | Notes |
|---------|-------|--------|-------|
| 1 | Looking Up | existing (1 unit) | needs deepening |
| 2 | The Solar System | existing (1 unit) | needs deepening |
| 3 | Earth & Moon | existing (1 unit) | needs deepening |
| 4 | Light & Telescopes | DONE | 12 units, seeded |
| 5 | Stars | existing (1 unit) | needs deepening |
| 6 | Galaxies | FILES WRITTEN | 10 units, needs meta integration |
| 7 | Black Holes & Extreme Physics | DONE | 10 units, seeded |
| 8 | Cosmology | existing (1 unit) | needs deepening |
| 9 | Rockets & Orbital Mechanics | existing (1 unit) | needs deepening |
| 10 | Space Exploration History | existing (1 unit) | needs deepening |
| 11 | Exoplanets & Astrobiology | existing (1 unit) | needs deepening |
| 12 | Astrophotography & Amateur Astronomy | DONE | 11 units, seeded |
| 13 | Space Technology & Engineering | FILES WRITTEN | 10 units, needs meta integration |
| 14 | Space Frontiers | existing (1 unit) | needs deepening |
| 15 | Mastery & Synthesis (Capstone) | NOT STARTED | |

### Current totals (seeded as of 2026-04-01)

| Course | Units | Lessons | Questions |
|--------|-------|---------|-----------|
| ME | 11 | 195 | 2,119 |
| Personal Finance | 35 | 281 | 2,338 |
| Psychology | 58 | 315 | 2,607 |
| Space & Astronomy | 43 | 242 | 2,153 |
| **Total** | **147** | **1,033** | **9,217** |

After integrating Sprint 10a files: +63 units, est. +315 lessons, est. +3,000 questions.

---

## How to Continue After a Chat Restart

1. Read this file: `docs/expansion-progress.md`
2. Read the plan: `docs/course-expansion-plan.md`
3. Read the writing rules: `docs/content-writing-guide.md`
4. **FIRST PRIORITY:** Integrate the 12 "FILES WRITTEN" section files into meta.ts + course-meta.ts + seed
5. Then continue with Sprint 10b (deepen existing sections), Sprint 11-13
6. Update this file with status changes as you go
