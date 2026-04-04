# Course Expansion Progress Tracker

> This file tracks what's been done and what's next. Read this at the start of every session to know where to continue.
>
> **How to use:** At the start of any new chat session, say: "Continue the course expansion from where we left off. Read docs/expansion-progress.md"

---

## Current Status: PHASE 2 IN PROGRESS (Sprints 1-10a done, S1 expansions done, S2 in progress)

**Last updated:** 2026-04-04
**Last completed step:** Sprint 10a fully integrated + seeded. Finance S1, Psychology S1, Space S1 also expanded + seeded. All verified working.
**Next step:** Expand remaining single-unit sections (Finance S2 next, then S3, S4, S6-S12; Psychology S4, S6-S9, S14; Space S2-S3, S5, S8-S11, S14). Then Sprints 11-13.
**Deferred to future:** Adaptive placement test, section checkpoints UI

### What needs to happen next session:
1. Continue expanding single-unit sections sequentially by course
2. Sprint 11: Add calculation questions to sections 5+
3. Sprint 12: Capstone sections (section 15 for each course)
4. Sprint 13: QA pass and polish

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
| 1 | Psychology Section 2 (Sensation & Perception) | DONE (9 units) |
| 2 | Space Section 4 (Light & Telescopes) | DONE (12 units) |
| 3 | Finance Section 13 (Estate Planning) | DONE (11 units) |
| 4 | Psychology Section 10 (Developmental) | DONE (11 units) |
| 5 | Space Section 12 (Amateur Astronomy) | DONE (11 units) |
| 6 | Finance Section 14 (Business) | DONE (11 units) |
| 7 | Psychology Section 11 (Mental Health) | DONE (15 units) |
| 8 | Psychology Section 12 (Therapy) | DONE (13 units) |
| 9 | Space Section 7 (Black Holes) | DONE (10 units) |
| 10a | Integrate written files: Psych 3,5,13 + Space 6,13 + Finance 5 | DONE (integrated + seeded) |
| — | **Sequential expansion (sections 1→15 per course, skipping done)** | |
| 10b | Finance S1 (What Is Money?) | DONE (8 units, seeded) |
| 10c | Finance S2 (Spending & Budgeting) | IN PROGRESS |
| 10d | Finance S3 (Saving & Emergency Planning) | NOT STARTED |
| 10e | Finance S4 (Banking & Financial Systems) | NOT STARTED |
| 10f | Finance S6 (Debt Mastery) | NOT STARTED |
| 10g | Finance S7 (Credit System) | NOT STARTED |
| 10h | Finance S8 (Investing Fundamentals) | NOT STARTED |
| 10i | Finance S9 (Advanced Investing) | NOT STARTED |
| 10j | Finance S10 (Real Estate) | NOT STARTED |
| 10k | Finance S11 (Insurance & Risk) | NOT STARTED |
| 10l | Finance S12 (Retirement Planning) | NOT STARTED |
| 10m | Psychology S1 (Welcome to Your Mind) | DONE (8 units, seeded) |
| 10n | Psychology S4 (Memory) | NOT STARTED |
| 10o | Psychology S6 (Cognitive Biases) | NOT STARTED |
| 10p | Psychology S7 (Emotions & Motivation) | NOT STARTED |
| 10q | Psychology S8 (Social Psychology) | NOT STARTED |
| 10r | Psychology S9 (Personality) | NOT STARTED |
| 10s | Psychology S14 (Research Methods) | NOT STARTED |
| 10t | Space S1 (Looking Up) | DONE (8 units, seeded) |
| 10u | Space S2 (The Solar System) | NOT STARTED |
| 10v | Space S3 (Earth & Moon) | NOT STARTED |
| 10w | Space S5 (Stars) | NOT STARTED |
| 10x | Space S8 (Cosmology) | NOT STARTED |
| 10y | Space S9 (Rockets & Orbital Mechanics) | NOT STARTED |
| 10z | Space S10 (Space Exploration History) | NOT STARTED |
| 10aa | Space S11 (Exoplanets & Astrobiology) | NOT STARTED |
| 10ab | Space S14 (Space Frontiers) | NOT STARTED |
| 11 | Add calculation questions (all courses) | NOT STARTED |
| 12 | Capstone sections S15 (all courses) | NOT STARTED |
| 13 | QA pass and polish | NOT STARTED |

### Sprint 10a: COMPLETED
All 12 content files integrated into meta.ts and course-meta.ts loaders. Seeded and verified 2026-04-04.

### Per-Course Section Status

#### Personal Finance

| Section | Title | Status | Notes |
|---------|-------|--------|-------|
| 1 | What Is Money? | DONE | 8 units, seeded |
| 2 | Spending & Budgeting | IN PROGRESS | expanding from 1 unit |
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
| 1 | Welcome to Your Mind | DONE | 8 units, seeded |
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
| 1 | Looking Up | DONE | 8 units, seeded |
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

### Current totals (seeded as of 2026-04-04)

| Course | Units | Lessons | Questions |
|--------|-------|---------|-----------|
| ME | 11 | 195 | 2,119 |
| Personal Finance | 56 | 376 | 3,128 |
| Psychology | 96 | 491 | 4,105 |
| Space & Astronomy | 71 | 375 | 3,297 |
| **Total** | **234** | **1,437** | **12,649** |

---

## How to Continue After a Chat Restart

1. Read this file: `docs/expansion-progress.md`
2. Read the plan: `docs/course-expansion-plan.md`
3. Read the writing rules: `docs/content-writing-guide.md`
4. **FIRST PRIORITY:** Integrate the 12 "FILES WRITTEN" section files into meta.ts + course-meta.ts + seed
5. Then continue with Sprint 10b (deepen existing sections), Sprint 11-13
6. Update this file with status changes as you go
