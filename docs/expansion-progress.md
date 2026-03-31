# Course Expansion Progress Tracker

> This file tracks what's been done and what's next. Read this at the start of every session to know where to continue.
>
> **How to use:** At the start of any new chat session, say: "Continue the course expansion from where we left off. Read docs/expansion-progress.md"

---

## Current Status: NOT STARTED

**Last updated:** 2026-04-01
**Last completed step:** Plan finalized, infrastructure built (variant system, country selector)
**Next step:** Phase 0, Batch 1

---

## Phase 0: Upgrade Existing Content

### Batch 1: Fix critical quality issues
| Task | Course | Status | Notes |
|------|--------|--------|-------|
| Fix correctIndex bias | Psychology | NOT STARTED | Run fix-correct-index.js script |
| Fix correctIndex bias | Space | NOT STARTED | Run fix-correct-index.js script |
| Add question type variety | Psychology | NOT STARTED | Add match-pairs, sort-buckets, order-steps |
| Add question type variety | Space | NOT STARTED | Add match-pairs, sort-buckets, order-steps |
| Build QA automation script | All | NOT STARTED | scripts/qa-content.ts |

### Batch 2: Globalization and structure
| Task | Course | Status | Notes |
|------|--------|--------|-------|
| Add country variants | Finance (Banking & Taxes) | NOT STARTED | Heavy: tax system variants |
| Add country variants | Finance (Debt & Credit) | NOT STARTED | Heavy: credit score variants |
| Add country variants | Finance (Retirement) | NOT STARTED | Heavy: 401k/pension/super variants |
| Add country variants | Finance (Insurance) | NOT STARTED | Heavy: health system variants |
| Add country variants | Finance (other sections) | NOT STARTED | Minor: currency, brokerage |
| Add review units | Finance | NOT STARTED | 1 review unit per 4 existing units |
| Add review units | Psychology | NOT STARTED | Same |
| Add review units | Space | NOT STARTED | Same |
| Add section checkpoints | All 3 | NOT STARTED | 1 checkpoint per section |
| Add WEIRD caveats | Psychology | NOT STARTED | ~10-15 teaching cards |
| Add global agencies + Southern sky | Space | NOT STARTED | ESA, ISRO, CNSA, JAXA, Southern Cross |

### Batch 3: Naming and misconceptions
| Task | Course | Status | Notes |
|------|--------|--------|-------|
| Rename units to outcome-based | Finance | NOT STARTED | |
| Rename units to outcome-based | Psychology | NOT STARTED | |
| Rename units to outcome-based | Space | NOT STARTED | |
| Add misconception teaching cards | Finance | NOT STARTED | 9 misconceptions from plan |
| Add misconception teaching cards | Psychology | NOT STARTED | 10 misconceptions from plan |
| Add misconception teaching cards | Space | NOT STARTED | 9 misconceptions from plan |

### Batch 4: Final audit
| Task | Course | Status | Notes |
|------|--------|--------|-------|
| Difficulty audit + fix | Finance | NOT STARTED | Easy after teaching cards |
| Difficulty audit + fix | Psychology | NOT STARTED | |
| Difficulty audit + fix | Space | NOT STARTED | |
| Add calculation questions | Psychology | NOT STARTED | Sections 5+ need slider-estimate |
| Add calculation questions | Space | NOT STARTED | Sections 4+ need slider-estimate |
| Em dash audit | Psychology | NOT STARTED | |
| Em dash audit | Space | NOT STARTED | |
| Run QA automation script | All | NOT STARTED | Final pass |

---

## Phase 1: Infrastructure

| Task | Status | Notes |
|------|--------|-------|
| Section metadata data model | NOT STARTED | Group existing units into sections |
| Section checkpoints UI | NOT STARTED | Gate progression between sections |
| Adaptive placement test | NOT STARTED | 15-20 questions, CAT-like |
| Glossary data structure | NOT STARTED | Per-course glossary.ts |

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
