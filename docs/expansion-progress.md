# Course Expansion Progress Tracker

> This file tracks what's been done and what's next. Read this at the start of every session to know where to continue.
>
> **How to use:** At the start of any new chat session, say: "Continue the course expansion from where we left off. Read docs/expansion-progress.md"

---

## Current Status: PHASE 0 + PHASE 1 COMPLETE, READY FOR PHASE 2

**Last updated:** 2026-04-01
**Last completed step:** Phase 0 Batch 4 final audit + Phase 1 infrastructure
**Next step:** Phase 2, Section 1 of Personal Finance ("What Is Money?")
**Deferred to future:** Adaptive placement test (needs more content first), section checkpoints UI (visual feature, not blocking content)

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

### Personal Finance (15 sections, 181 units target)

| Section | Title | Units (current) | Units (target) | Status |
|---------|-------|----------------|----------------|--------|
| 1 | What Is Money? | 3 (existing) | 8 | NOT STARTED |
| 2 | Spending & Budgeting | 9 (existing) | 10 | NOT STARTED |
| 3 | Saving & Emergency Planning | 13 (existing) | 11 | NOT STARTED |
| 4 | Banking & Financial Systems | 14 (existing) | 11 | NOT STARTED |
| 5 | Taxes | (partial, in Banking) | 13 | NOT STARTED |
| 6 | Debt Mastery | 13 (existing) | 14 | NOT STARTED |
| 7 | Credit System | 13 (existing) | 11 | NOT STARTED |
| 8 | Investing Fundamentals | 15 (existing) | 15 | NOT STARTED |
| 9 | Advanced Investing | 15 (existing) | 16 | NOT STARTED |
| 10 | Real Estate | 15 (existing) | 11 | NOT STARTED |
| 11 | Insurance & Risk | 10 (existing) | 13 | NOT STARTED |
| 12 | Retirement Planning | 14 (existing) | 14 | NOT STARTED |
| 13 | Estate Planning & Wealth Transfer | 0 (NEW) | 11 | NOT STARTED |
| 14 | Business & Self-Employment | 0 (NEW) | 11 | NOT STARTED |
| 15 | Financial Mastery (Capstone) | 5 (existing) | 12 | NOT STARTED |

### Psychology (15 sections, 175 units target)

| Section | Title | Units (current) | Units (target) | Status |
|---------|-------|----------------|----------------|--------|
| 1 | Welcome to Your Mind | 6 (existing) | 8 | NOT STARTED |
| 2 | Sensation & Perception | 0 (NEW) | 9 | NOT STARTED |
| 3 | Learning | 0 (NEW) | 9 | NOT STARTED |
| 4 | Memory | 8 (existing) | 10 | NOT STARTED |
| 5 | Thinking & Intelligence | 0 (NEW) | 10 | NOT STARTED |
| 6 | Cognitive Biases & Decision Making | 16 (existing, from U2+U7) | 15 | NOT STARTED |
| 7 | Emotions & Motivation | 8 (existing) | 14 | NOT STARTED |
| 8 | Social Psychology | 9 (existing) | 15 | NOT STARTED |
| 9 | Personality | 8 (existing) | 10 | NOT STARTED |
| 10 | Developmental Psychology | 0 (NEW) | 11 | NOT STARTED |
| 11 | Mental Health & Abnormal | 0 (NEW) | 15 | NOT STARTED |
| 12 | Therapy & Treatment | 0 (NEW) | 13 | NOT STARTED |
| 13 | Applied & Industrial Psychology | 0 (NEW) | 11 | NOT STARTED |
| 14 | Research Methods & Critical Thinking | 8 (existing, from U9) | 14 | NOT STARTED |
| 15 | Influence & Dark Patterns (Capstone) | 6 (existing) | 11 | NOT STARTED |

### Space & Astronomy (15 sections, 166 units target)

| Section | Title | Units (current) | Units (target) | Status |
|---------|-------|----------------|----------------|--------|
| 1 | Looking Up | 7 (existing) | 8 | NOT STARTED |
| 2 | The Solar System | 8 (existing) | 15 | NOT STARTED |
| 3 | Earth & Moon | 7 (existing) | 9 | NOT STARTED |
| 4 | Light & Telescopes | 0 (NEW) | 12 | NOT STARTED |
| 5 | Stars | 8 (existing) | 16 | NOT STARTED |
| 6 | Galaxies | 0 (partially from U8) | 10 | NOT STARTED |
| 7 | Black Holes & Extreme Physics | 0 (partially from U8) | 10 | NOT STARTED |
| 8 | Cosmology | 7 (existing, from U9) | 11 | NOT STARTED |
| 9 | Rockets & Orbital Mechanics | 9 (existing) | 11 | NOT STARTED |
| 10 | Space Exploration History | 8 (existing) | 10 | NOT STARTED |
| 11 | Exoplanets & Astrobiology | 8 (existing) | 15 | NOT STARTED |
| 12 | Astrophotography & Amateur Astronomy | 0 (NEW) | 11 | NOT STARTED |
| 13 | Space Technology & Engineering | 0 (NEW) | 10 | NOT STARTED |
| 14 | Space Frontiers | 8 (existing) | 10 | NOT STARTED |
| 15 | Mastery & Synthesis (Capstone) | 0 (NEW) | 8 | NOT STARTED |

---

## How to Continue After a Chat Restart

1. Read this file: `docs/expansion-progress.md`
2. Read the plan: `docs/course-expansion-plan.md`
3. Read the writing rules: `docs/content-writing-guide.md`
4. Find the first NOT STARTED task in the current phase
5. Execute it
6. Update this file with DONE status
7. Repeat

**Never skip a phase.** Phase 0 must complete before Phase 1. Phase 1 must complete before Phase 2. Within Phase 2, sections within a course must be built in order (Section 1 before Section 2).
