# University-Level Content Expansion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Progress Tracker

| Task | Status | Notes |
|---|---|---|
| 1. Section 16: Portfolio Theory (Finance) | **DONE** | 10 units, ~430 questions, fully wired |
| 2. Section 17: Security Valuation (Finance) | **DONE** | 10 units, ~380 questions, fully wired |
| 3. Section 18: Macro & Behavioral (Finance) | **DONE** | 10 units, ~375 questions, fully wired |
| 4. Section 19: Advanced Strategy (Finance) | **DONE** | 10 units, ~450 questions, fully wired |
| 5. Finance infrastructure finalization | **DONE** | professions.ts updated (19 sections, 2988 questions) |
| 6. Section 16: Neuroscience (Psychology) | **DONE** | 10 units, ~355 questions, fully wired |
| 7. Section 17: Statistics (Psychology) | **DONE** | 10 units, ~369 questions, fully wired |
| 8. Section 18: Specialized Fields (Psychology) | **DONE** | 10 units, ~385 questions, fully wired |
| 9. Psychology infrastructure finalization | **DONE** | professions.ts updated (18 sections, 1766 questions) |
| 10. Section 16: Physics of Space (Space) | Pending | |
| 11. Section 17: Extreme Universe (Space) | Pending | |
| 12. Section 18: Galaxies & Beyond (Space) | Pending | |
| 13. Quantitative retrofit (Space) | Pending | |
| 14. Space infrastructure finalization | Pending | |
| 15-31. Mechanical Engineering (full build) | Pending | |

**Goal:** Close content gaps across all four courses so completers gain university-equivalent knowledge (minus credentials/lab work).

**Architecture:** Each course gets new sections inserted into the existing 15-section structure (either replacing shallow capstone units or extending past section 15). New content follows the exact same file patterns, ID conventions, and content-writing-guide rules as existing content. Infrastructure files (meta.ts, course-meta.ts, professions.ts) are updated per phase.

**Tech Stack:** TypeScript data files, Zustand stores, Next.js dynamic imports. No new dependencies.

**Content rules:** Follow `docs/content-writing-guide.md` exactly. Every standard lesson: 2-3 teaching cards, 8-12 questions, 3+ question types, scenario-based questions for advanced topics. Every unit: 1 conversation lesson + 1 speed-round. Teaching cards must be ultra-simple (no walls of text per project feedback).

---

## Scope & Phasing

| Phase | Course | New Sections | New Units (est.) | New Questions (est.) |
|---|---|---|---|---|
| 1 | Personal Finance | 4 new sections (16-19) | ~40 units | ~600 |
| 2 | Psychology | 3 new sections (16-18) | ~30 units | ~450 |
| 3 | Space & Astronomy | 3 new sections (16-18) + quantitative upgrades to existing | ~30 units + retrofits | ~500 |
| 4 | Mechanical Engineering | Full rebuild into profession directory (15 sections) | ~150 units | ~1700 |

Total estimated: ~250 new units, ~3,250 new questions.

**Execution order:** Phase 1 first (biggest user base, smallest gap). Phase 4 last (largest effort, gated course).

---

## File Conventions Reference

All courses follow the same pattern. For a new section N in course X:

```
src/data/course/professions/{course-id}/
  meta.ts                         -- Add new Unit[] entries (lessons with empty questions[])
  units/section-{N}-{topic}-part1.ts  -- First half of units (full questions)
  units/section-{N}-{topic}-part2.ts  -- Second half of units (full questions)
```

**ID patterns by course:**
| Course | Unit ID | Lesson ID | Question ID | Teaching ID |
|---|---|---|---|---|
| Personal Finance | `fin-sec{N}-u{N}` | `fin-sec{N}-u{N}-L{N}` | `fin-sec{N}-u{N}-L{N}-Q{N}` | `fin-sec{N}-u{N}-L{N}-T{N}` |
| Psychology | `psy-sec{N}-u{N}` | `psy-sec{N}-u{N}-L{N}` | `psy-sec{N}-u{N}-L{N}-Q{N}` | `psy-sec{N}-u{N}-L{N}-T{N}` |
| Space & Astronomy | `sp-sec{N}-u{N}` | `sp-sec{N}-u{N}-L{N}` | `sp-sec{N}-u{N}-L{N}-Q{N}` | `sp-sec{N}-u{N}-L{N}-T{N}` |

**Export naming:** `{prefix}Section{N}Part{1|2}` (e.g., `finSection16Part1`)

**Import in unit files:**
```typescript
import type { Unit } from '../../../types';
```

**Each unit must have:**
- `sectionIndex` and `sectionTitle` matching its section
- `color` (hex) coordinated within the section
- 12-20 standard lessons + 1 conversation + 1 speed-round
- Lessons: 2-3 teaching cards + 5-9 questions per lesson, 3+ question types

---

## Phase 1: Personal Finance — Advanced Content

### Task 1: Section 16 — Portfolio Theory & Asset Allocation

**Files:**
- Create: `src/data/course/professions/personal-finance/units/section-16-portfolio-part1.ts`
- Create: `src/data/course/professions/personal-finance/units/section-16-portfolio-part2.ts`
- Modify: `src/data/course/professions/personal-finance/meta.ts` (add unit metadata)
- Modify: `src/data/course/course-meta.ts` (add dynamic import loaders)
- Modify: `src/data/professions.ts` (update unitCount, questionCount)

**Section config:** `sectionIndex: 16`, `sectionTitle: "Portfolio Theory"`, color palette: `#6366F1` range (indigo)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `fin-sec16-u1` | Risk & Return Basics | Risk-return tradeoff, standard deviation as risk measure, historical returns by asset class, risk tolerance |
| 2 | `fin-sec16-u2` | Correlation & Diversification Math | Correlation coefficient (-1 to +1), how uncorrelated assets reduce portfolio risk, diversification benefit calculation |
| 3 | `fin-sec16-u3` | Modern Portfolio Theory | Markowitz efficient frontier, optimal portfolios, risk-free asset combination, capital market line |
| 4 | `fin-sec16-u4` | CAPM & Beta | Systematic vs unsystematic risk, beta coefficient, expected return formula, market risk premium |
| 5 | `fin-sec16-u5` | Asset Allocation Models | Age-based rules, risk-profile-based allocation, strategic vs tactical allocation, rebalancing triggers |
| 6 | `fin-sec16-u6` | Factor Investing | Value, growth, momentum, size factors, factor premiums, smart beta ETFs |
| 7 | `fin-sec16-u7` | Portfolio Construction | Core-satellite approach, tax-efficient placement, asset location vs allocation |
| 8 | `fin-sec16-u8` | Measuring Performance | Sharpe ratio, Sortino ratio, alpha, benchmark comparison, time-weighted vs money-weighted returns |
| 9 | `fin-sec16-u9` | Rebalancing & Maintenance | Calendar vs threshold rebalancing, tax-loss harvesting during rebalancing, drift monitoring |
| 10 | `fin-sec16-u10` | Portfolio Theory in Practice | Case studies: retirement portfolio, young investor, conservative pre-retiree, inheritance windfall |

**Question type emphasis:** slider-estimate (for numerical concepts like beta, Sharpe ratio), scenario (portfolio construction decisions), sort-buckets (systematic vs unsystematic risk), match-pairs (factor-to-definition)

- [x] **Step 1:** Create `section-16-portfolio-part1.ts` with units 1-5 (3,269 lines, ~200 questions)
- [x] **Step 2:** Create `section-16-portfolio-part2.ts` with units 6-10 (~230 questions)
- [x] **Step 3:** Add unit metadata entries to `meta.ts` (10 units with lesson metadata)
- [x] **Step 4:** Add dynamic import loaders to `loadFinanceUnit()` in `course-meta.ts`
- [ ] **Step 5:** Run `npx tsx scripts/seed-content.ts` to verify content loads
- [x] **Step 6:** Committed in multiple commits

---

### Task 2: Section 17 — Security Valuation & Analysis

**Files:**
- Create: `src/data/course/professions/personal-finance/units/section-17-valuation-part1.ts`
- Create: `src/data/course/professions/personal-finance/units/section-17-valuation-part2.ts`
- Modify: `src/data/course/professions/personal-finance/meta.ts`
- Modify: `src/data/course/course-meta.ts`

**Section config:** `sectionIndex: 17`, `sectionTitle: "Security Valuation"`, color palette: `#8B5CF6` range (violet)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `fin-sec17-u1` | Reading Financial Statements | Balance sheet, income statement, cash flow statement, what each reveals about a company |
| 2 | `fin-sec17-u2` | Valuation Ratios | P/E ratio, P/B ratio, PEG ratio, EV/EBITDA, when each is useful |
| 3 | `fin-sec17-u3` | Earnings & Revenue Analysis | Revenue growth, profit margins, earnings per share, earnings quality |
| 4 | `fin-sec17-u4` | Dividend Analysis | Dividend yield, payout ratio, dividend growth model, dividend aristocrats |
| 5 | `fin-sec17-u5` | Discounted Cash Flow | Time value of money, present value, DCF model walkthrough, terminal value |
| 6 | `fin-sec17-u6` | Bond Valuation Deep Dive | Yield to maturity, current yield, duration, convexity, yield curve shapes |
| 7 | `fin-sec17-u7` | Credit & Bond Ratings | Moody's/S&P scales, investment grade vs junk, credit spreads, default risk |
| 8 | `fin-sec17-u8` | Value vs Growth Investing | Value traps, growth at reasonable price (GARP), contrarian investing, margin of safety |
| 9 | `fin-sec17-u9` | Sector & Industry Analysis | Cyclical vs defensive sectors, sector rotation, competitive moats, industry life cycles |
| 10 | `fin-sec17-u10` | Building an Investment Thesis | Putting it all together: research process, conviction levels, position sizing, when to sell |

**Question type emphasis:** slider-estimate (P/E calculations, yield estimates), fill-blank (financial statement terms), scenario (stock analysis decisions), order-steps (DCF calculation steps)

- [x] **Step 1:** Create `section-17-valuation-part1.ts` with units 1-5 (~185 questions)
- [x] **Step 2:** Create `section-17-valuation-part2.ts` with units 6-10 (~195 questions)
- [x] **Step 3:** Add unit metadata to `meta.ts`
- [x] **Step 4:** Add loaders to `course-meta.ts`
- [ ] **Step 5:** Seed and verify: `npx tsx scripts/seed-content.ts`
- [x] **Step 6:** Committed in multiple commits

---

### Task 3: Section 18 — Macroeconomics & Behavioral Finance

**Files:**
- Create: `src/data/course/professions/personal-finance/units/section-18-macro-part1.ts`
- Create: `src/data/course/professions/personal-finance/units/section-18-macro-part2.ts`
- Modify: `src/data/course/professions/personal-finance/meta.ts`
- Modify: `src/data/course/course-meta.ts`

**Section config:** `sectionIndex: 18`, `sectionTitle: "Economics & Behavior"`, color palette: `#EC4899` range (pink)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `fin-sec18-u1` | How the Economy Works | GDP, economic output, circular flow of money, sectors of the economy |
| 2 | `fin-sec18-u2` | Inflation & Deflation | CPI, causes of inflation (demand-pull, cost-push, monetary), deflation spiral, real vs nominal |
| 3 | `fin-sec18-u3` | The Federal Reserve | Fed structure, dual mandate, open market operations, federal funds rate, quantitative easing |
| 4 | `fin-sec18-u4` | Economic Cycles | Expansion, peak, contraction, trough, leading/lagging indicators, recession triggers |
| 5 | `fin-sec18-u5` | Interest Rates & You | How rates affect mortgages/savings/stocks/bonds, yield curve inversion, rate expectations |
| 6 | `fin-sec18-u6` | Behavioral Finance: Your Brain on Money | Loss aversion, anchoring, mental accounting, sunk cost fallacy, endowment effect |
| 7 | `fin-sec18-u7` | Cognitive Biases in Investing | Confirmation bias, recency bias, overconfidence, herding, disposition effect |
| 8 | `fin-sec18-u8` | Market Psychology | Fear & greed cycles, market bubbles anatomy, panic selling, FOMO investing |
| 9 | `fin-sec18-u9` | Debiasing Your Decisions | Pre-commitment strategies, systematic investing rules, checklists, cooling-off periods |
| 10 | `fin-sec18-u10` | Fiscal Policy & Global Economy | Government spending, national debt, trade deficits, currency basics, how global events affect your portfolio |

**Question type emphasis:** scenario (market psychology situations), category-swipe (bias identification), match-pairs (indicator-to-meaning), slider-estimate (inflation/rate calculations)

- [x] **Step 1:** Create `section-18-macro-part1.ts` with units 1-5 (~175 questions, 3,122 lines)
- [x] **Step 2:** Create `section-18-macro-part2.ts` with units 6-10 (~200 questions)
- [x] **Step 3:** Add unit metadata to `meta.ts`
- [x] **Step 4:** Add loaders to `course-meta.ts`
- [ ] **Step 5:** Seed and verify
- [x] **Step 6:** Committed in multiple commits

---

### Task 4: Section 19 — Advanced Tax & Estate Strategy

**Files:**
- Create: `src/data/course/professions/personal-finance/units/section-19-strategy-part1.ts`
- Create: `src/data/course/professions/personal-finance/units/section-19-strategy-part2.ts`
- Modify: `src/data/course/professions/personal-finance/meta.ts`
- Modify: `src/data/course/course-meta.ts`

**Section config:** `sectionIndex: 19`, `sectionTitle: "Advanced Strategy"`, color palette: `#F59E0B` range (amber)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `fin-sec19-u1` | Tax Bracket Management | Marginal vs effective rate optimization, Roth conversion ladders, income timing, bracket filling |
| 2 | `fin-sec19-u2` | Charitable Giving Strategy | Donor-advised funds, bunching deductions, appreciated stock donation, QCD from IRA |
| 3 | `fin-sec19-u3` | Trust Fundamentals | Revocable vs irrevocable trusts, grantor trusts, trust taxation, when a trust makes sense |
| 4 | `fin-sec19-u4` | Estate Tax Planning | Federal estate exemption, portability, step-up in basis, gifting strategies, annual exclusion |
| 5 | `fin-sec19-u5` | Equity Compensation | Stock options (ISO vs NSO), RSUs, vesting schedules, exercise strategies, tax implications |
| 6 | `fin-sec19-u6` | Business Entity Strategy | LLC vs S-corp vs C-corp tax comparison, reasonable salary, pass-through deduction (QBI) |
| 7 | `fin-sec19-u7` | Real Estate Tax Strategy | 1031 exchanges, depreciation, cost segregation, passive loss rules, real estate professional status |
| 8 | `fin-sec19-u8` | Social Security Optimization | Claiming age analysis, spousal benefits, survivor benefits, WEP/GPO, break-even calculations |
| 9 | `fin-sec19-u9` | Comprehensive Financial Planning | Needs analysis framework, goal prioritization, cash flow projections, scenario modeling |
| 10 | `fin-sec19-u10` | Derivatives & Alternative Investments | Options basics (calls/puts), covered calls, REITs, commodities, private equity basics, hedge fund structures |

- [ ] **Step 1:** Create `section-19-strategy-part1.ts` with units 1-5
- [ ] **Step 2:** Create `section-19-strategy-part2.ts` with units 6-10
- [ ] **Step 3:** Add unit metadata to `meta.ts`
- [ ] **Step 4:** Add loaders to `course-meta.ts`
- [ ] **Step 5:** Seed and verify
- [ ] **Step 6:** Commit: `feat(finance): add section 19 — advanced tax & estate strategy`

---

### Task 5: Personal Finance — Infrastructure Finalization

**Files:**
- Modify: `src/data/professions.ts` (update counts)
- Modify: `src/data/course/professions/personal-finance/glossary.ts` (add new terms)

- [ ] **Step 1:** Update `professions.ts` — set `unitCount` and `questionCount` to actual counts after all sections are built
- [ ] **Step 2:** Add glossary entries for new terms: CAPM, beta, Sharpe ratio, efficient frontier, DCF, duration, convexity, P/E ratio, GDP, CPI, QBI, 1031 exchange, donor-advised fund, RSU, ISO, etc.
- [ ] **Step 3:** Run full seed: `npx tsx scripts/seed-content.ts`
- [ ] **Step 4:** Run `npm test` to verify no regressions
- [ ] **Step 5:** Commit: `feat(finance): finalize university-level expansion — update counts & glossary`

---

## Phase 2: Psychology — Depth Expansion

### Task 6: Section 16 — Neuroscience & Biological Psychology

**Files:**
- Create: `src/data/course/professions/psychology/units/section-16-neuroscience-part1.ts`
- Create: `src/data/course/professions/psychology/units/section-16-neuroscience-part2.ts`
- Modify: `src/data/course/professions/psychology/meta.ts`
- Modify: `src/data/course/course-meta.ts`

**Section config:** `sectionIndex: 16`, `sectionTitle: "Neuroscience Deep Dive"`, color palette: `#14B8A6` range (teal)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `psy-sec16-u1` | Brain Architecture | Cortical regions (frontal, parietal, temporal, occipital), subcortical structures, white matter tracts |
| 2 | `psy-sec16-u2` | The Limbic System | Amygdala, hippocampus, hypothalamus, cingulate cortex, emotion-memory circuit |
| 3 | `psy-sec16-u3` | Neurotransmitter Systems | Dopamine pathways, serotonin, norepinephrine, GABA, glutamate, acetylcholine — what each does |
| 4 | `psy-sec16-u4` | Synaptic Plasticity | Long-term potentiation, long-term depression, Hebbian learning, critical periods, neurogenesis |
| 5 | `psy-sec16-u5` | Neuroimaging Methods | fMRI (BOLD signal), PET, EEG/ERP, MEG, TMS — what each measures, strengths, limitations |
| 6 | `psy-sec16-u6` | Hormones & Behavior | HPA axis, cortisol and stress, oxytocin, testosterone, thyroid hormones, endocrine-behavior link |
| 7 | `psy-sec16-u7` | Sleep Neurophysiology | Sleep stages (NREM/REM), circadian rhythms, SCN, melatonin, sleep disorders, memory consolidation |
| 8 | `psy-sec16-u8` | Pain & Sensation | Gate control theory, nociceptors, phantom limb, chronic pain neuroscience, pain modulation |
| 9 | `psy-sec16-u9` | Psychopharmacology | Drug classification, receptor agonists/antagonists, pharmacokinetics, SSRIs, antipsychotics, anxiolytics |
| 10 | `psy-sec16-u10` | Brain Disorders & Damage | Lesion studies, split-brain, aphasia types, agnosia, case studies (Phineas Gage, H.M., Clive Wearing) |

**Question type emphasis:** match-pairs (brain region-to-function), sort-buckets (neurotransmitter categorization), scenario (interpreting neuroimaging results), image-tap (brain anatomy if diagrams available)

- [ ] **Step 1:** Create `section-16-neuroscience-part1.ts` with units 1-5
- [ ] **Step 2:** Create `section-16-neuroscience-part2.ts` with units 6-10
- [ ] **Step 3:** Add metadata to `meta.ts`, add loaders to `course-meta.ts`
- [ ] **Step 4:** Seed and verify
- [ ] **Step 5:** Commit: `feat(psychology): add section 16 — neuroscience deep dive`

---

### Task 7: Section 17 — Statistics & Research Design

**Files:**
- Create: `src/data/course/professions/psychology/units/section-17-statistics-part1.ts`
- Create: `src/data/course/professions/psychology/units/section-17-statistics-part2.ts`
- Modify: `src/data/course/professions/psychology/meta.ts`
- Modify: `src/data/course/course-meta.ts`

**Section config:** `sectionIndex: 17`, `sectionTitle: "Statistics & Methods"`, color palette: `#F97316` range (orange)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `psy-sec17-u1` | Descriptive Statistics | Mean, median, mode, range, standard deviation, variance, distributions, z-scores |
| 2 | `psy-sec17-u2` | Probability & Sampling | Probability basics, sampling distributions, central limit theorem, sampling bias types |
| 3 | `psy-sec17-u3` | Hypothesis Testing | Null/alternative hypotheses, p-values, significance levels, Type I/II errors, power |
| 4 | `psy-sec17-u4` | t-Tests & ANOVA | Independent/paired t-tests, one-way ANOVA, post-hoc tests, when to use each |
| 5 | `psy-sec17-u5` | Correlation & Regression | Pearson r, Spearman rho, simple regression, multiple regression, correlation vs causation |
| 6 | `psy-sec17-u6` | Effect Sizes & Confidence Intervals | Cohen's d, eta-squared, confidence intervals, practical vs statistical significance |
| 7 | `psy-sec17-u7` | Advanced Research Designs | Factorial designs, mixed designs, longitudinal vs cross-sectional, quasi-experiments |
| 8 | `psy-sec17-u8` | Qualitative Methods | Interviews, focus groups, thematic analysis, grounded theory, mixed methods |
| 9 | `psy-sec17-u9` | The Replication Crisis | Publication bias, p-hacking, pre-registration, open science, file drawer problem |
| 10 | `psy-sec17-u10` | Reading & Evaluating Research | Anatomy of a paper (abstract, methods, results, discussion), spotting weak methodology, meta-analysis basics |

**Question type emphasis:** slider-estimate (statistical values), order-steps (hypothesis testing procedure), scenario (choosing the right test), fill-blank (statistical terminology)

- [ ] **Step 1:** Create `section-17-statistics-part1.ts` with units 1-5
- [ ] **Step 2:** Create `section-17-statistics-part2.ts` with units 6-10
- [ ] **Step 3:** Add metadata and loaders
- [ ] **Step 4:** Seed and verify
- [ ] **Step 5:** Commit: `feat(psychology): add section 17 — statistics & research design`

---

### Task 8: Section 18 — Specialized Psychology

**Files:**
- Create: `src/data/course/professions/psychology/units/section-18-specialized-part1.ts`
- Create: `src/data/course/professions/psychology/units/section-18-specialized-part2.ts`
- Modify: `src/data/course/professions/psychology/meta.ts`
- Modify: `src/data/course/course-meta.ts`

**Section config:** `sectionIndex: 18`, `sectionTitle: "Specialized Fields"`, color palette: `#EF4444` range (red)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `psy-sec18-u1` | Evolutionary Psychology | Natural selection, sexual selection, kin selection, evolutionary mismatch, evolved heuristics |
| 2 | `psy-sec18-u2` | Health Psychology | Biopsychosocial model, health behavior change (transtheoretical model), psychoneuroimmunology |
| 3 | `psy-sec18-u3` | Forensic Psychology | Criminal profiling validity, eyewitness reliability, false confessions, risk assessment tools |
| 4 | `psy-sec18-u4` | Clinical Assessment | Structured interviews, neuropsychological batteries, projective tests (validity debate), case formulation |
| 5 | `psy-sec18-u5` | Cross-Cultural Psychology | Individualism-collectivism, cultural syndromes, etic vs emic approaches, WEIRD problem |
| 6 | `psy-sec18-u6` | Consciousness & Philosophy of Mind | Hard problem, qualia, theories (global workspace, IIT), free will debate, self-awareness |
| 7 | `psy-sec18-u7` | Positive Psychology | Strengths-based approach, flow, grit, resilience factors, well-being models (PERMA) |
| 8 | `psy-sec18-u8` | Ecological & Systems Psychology | Bronfenbrenner's model, systems thinking, community psychology, prevention science |
| 9 | `psy-sec18-u9` | Psychology & Technology | Digital mental health, AI in therapy, social media effects, screen time research, digital ethics |
| 10 | `psy-sec18-u10` | Ethics & Professional Practice | APA ethics code, informed consent, dual relationships, cultural competence, ethical dilemmas |

- [ ] **Step 1:** Create `section-18-specialized-part1.ts` with units 1-5
- [ ] **Step 2:** Create `section-18-specialized-part2.ts` with units 6-10
- [ ] **Step 3:** Add metadata and loaders
- [ ] **Step 4:** Seed and verify
- [ ] **Step 5:** Commit: `feat(psychology): add section 18 — specialized fields`

---

### Task 9: Psychology — Infrastructure Finalization

- [ ] **Step 1:** Update `professions.ts` counts for psychology
- [ ] **Step 2:** Add glossary entries: fMRI, BOLD, LTP, HPA axis, Cohen's d, p-value, ANOVA, effect size, WEIRD, IIT, PERMA, etc.
- [ ] **Step 3:** Seed and test
- [ ] **Step 4:** Commit: `feat(psychology): finalize university-level expansion`

---

## Phase 3: Space & Astronomy — Quantitative Upgrade + New Sections

### Task 10: Section 16 — The Physics Behind Astronomy

This section fills the biggest gap: math and physics foundations that university astronomy requires.

**Files:**
- Create: `src/data/course/professions/space-astronomy/units/section-16-physics-part1.ts`
- Create: `src/data/course/professions/space-astronomy/units/section-16-physics-part2.ts`
- Modify: `src/data/course/professions/space-astronomy/meta.ts`
- Modify: `src/data/course/course-meta.ts`

**Section config:** `sectionIndex: 16`, `sectionTitle: "The Physics of Space"`, color palette: `#F59E0B` range (amber)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `sp-sec16-u1` | Gravity Deep Dive | Newton's law of gravitation, gravitational field strength, escape velocity calculations, surface gravity |
| 2 | `sp-sec16-u2` | Orbital Mechanics Math | Kepler's laws (quantitative), orbital velocity, orbital period, vis-viva equation, Hohmann transfers |
| 3 | `sp-sec16-u3` | Light & Electromagnetic Spectrum | Wavelength-frequency-energy relationship, photon energy, Wien's law, Stefan-Boltzmann law |
| 4 | `sp-sec16-u4` | Spectroscopy & Doppler Math | Doppler shift formula, redshift z, spectral line identification, radial velocity calculation |
| 5 | `sp-sec16-u5` | Stellar Luminosity & Distance | Inverse square law, apparent vs absolute magnitude, distance modulus, parallax calculation |
| 6 | `sp-sec16-u6` | Nuclear Physics of Stars | E=mc2, proton-proton chain energy, CNO cycle, mass-energy conversion efficiency, binding energy |
| 7 | `sp-sec16-u7` | Stellar Structure | Hydrostatic equilibrium (concept), pressure-temperature relationship, energy transport (radiation vs convection) |
| 8 | `sp-sec16-u8` | General Relativity Essentials | Spacetime curvature (conceptual), gravitational time dilation, gravitational lensing, frame-dragging |
| 9 | `sp-sec16-u9` | Cosmological Calculations | Hubble's law (v=Hd), age of universe from H0, critical density, Friedmann equation (conceptual) |
| 10 | `sp-sec16-u10` | The Cosmic Distance Ladder | Parallax, Cepheid variables, Type Ia supernovae, Tully-Fisher, redshift — chain of methods |

**Question type emphasis:** slider-estimate (escape velocity, orbital period, magnitudes), order-steps (distance ladder sequence), fill-blank (equations), scenario (choose the right measurement technique)

- [ ] **Step 1:** Create `section-16-physics-part1.ts` with units 1-5
- [ ] **Step 2:** Create `section-16-physics-part2.ts` with units 6-10
- [ ] **Step 3:** Add metadata and loaders
- [ ] **Step 4:** Seed and verify
- [ ] **Step 5:** Commit: `feat(space): add section 16 — the physics of space`

---

### Task 11: Section 17 — High-Energy Astrophysics & Transients

**Files:**
- Create: `src/data/course/professions/space-astronomy/units/section-17-highenergy-part1.ts`
- Create: `src/data/course/professions/space-astronomy/units/section-17-highenergy-part2.ts`
- Modify: `src/data/course/professions/space-astronomy/meta.ts`
- Modify: `src/data/course/course-meta.ts`

**Section config:** `sectionIndex: 17`, `sectionTitle: "Extreme Universe"`, color palette: `#EF4444` range (red)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `sp-sec17-u1` | Supernova Physics | Core collapse mechanism, thermonuclear (Type Ia), neutrino burst, light curves, remnants |
| 2 | `sp-sec17-u2` | Neutron Star Interiors | Degeneracy pressure, neutron star structure, equation of state, TOV limit, quark matter |
| 3 | `sp-sec17-u3` | Pulsar Science | Lighthouse model, timing precision, millisecond pulsars, pulsar timing arrays |
| 4 | `sp-sec17-u4` | Accretion Physics | Accretion disks, Eddington luminosity, X-ray binaries, accretion power, jets |
| 5 | `sp-sec17-u5` | Active Galactic Nuclei | Unified AGN model, Seyfert galaxies, blazars, radio galaxies, quasar evolution |
| 6 | `sp-sec17-u6` | Gravitational Wave Astronomy | LIGO/Virgo detectors, strain measurement, merger signals (BBH, BNS), multi-messenger astronomy |
| 7 | `sp-sec17-u7` | Gamma-Ray Bursts | Short vs long GRBs, collapsar model, afterglows, cosmological probes |
| 8 | `sp-sec17-u8` | Cosmic Rays & Neutrinos | Cosmic ray spectrum, air showers, IceCube neutrino detection, sources |
| 9 | `sp-sec17-u9` | Nucleosynthesis | Big Bang nucleosynthesis, stellar nucleosynthesis, r-process, s-process, element origins |
| 10 | `sp-sec17-u10` | Time-Domain Astronomy | Transient surveys (ZTF, Rubin), tidal disruption events, fast radio bursts, kilonova |

- [ ] **Step 1:** Create `section-17-highenergy-part1.ts` with units 1-5
- [ ] **Step 2:** Create `section-17-highenergy-part2.ts` with units 6-10
- [ ] **Step 3:** Add metadata and loaders
- [ ] **Step 4:** Seed and verify
- [ ] **Step 5:** Commit: `feat(space): add section 17 — extreme universe`

---

### Task 12: Section 18 — Galactic & Extragalactic Astrophysics

**Files:**
- Create: `src/data/course/professions/space-astronomy/units/section-18-galactic-part1.ts`
- Create: `src/data/course/professions/space-astronomy/units/section-18-galactic-part2.ts`
- Modify: `src/data/course/professions/space-astronomy/meta.ts`
- Modify: `src/data/course/course-meta.ts`

**Section config:** `sectionIndex: 18`, `sectionTitle: "Galaxies & Beyond"`, color palette: `#8B5CF6` range (violet)

**Units to create (10 units):**

| Unit | ID | Title | Key Concepts |
|---|---|---|---|
| 1 | `sp-sec18-u1` | Galaxy Dynamics | Rotation curves, dark matter evidence, galaxy mass measurement, Tully-Fisher relation |
| 2 | `sp-sec18-u2` | Spiral Structure | Density wave theory, spiral arm formation, bar instabilities, flocculent vs grand-design spirals |
| 3 | `sp-sec18-u3` | Elliptical Galaxies | Formation through mergers, stellar populations, velocity dispersion, fundamental plane |
| 4 | `sp-sec18-u4` | Galaxy Formation & Evolution | Hierarchical assembly, downsizing, galaxy mergers, morphological transformation |
| 5 | `sp-sec18-u5` | The Intergalactic Medium | Hot gas in clusters, Sunyaev-Zel'dovich effect, Lyman-alpha forest, cosmic web |
| 6 | `sp-sec18-u6` | Star Formation | Molecular clouds, Jeans mass, protostars, T Tauri stars, IMF, star formation rate |
| 7 | `sp-sec18-u7` | Planet Formation | Protoplanetary disks, planetesimal accretion, pebble accretion, migration, disk dispersal |
| 8 | `sp-sec18-u8` | Exoplanet Characterization | Transmission spectroscopy, atmosphere detection, biosignature gases, direct imaging challenges |
| 9 | `sp-sec18-u9` | Large-Scale Structure | Galaxy clusters, superclusters, voids, BAO, power spectrum, dark energy probes |
| 10 | `sp-sec18-u10` | Unsolved Problems | Dark matter candidates, dark energy nature, Hubble tension, galaxy missing satellites, matter-antimatter asymmetry |

- [ ] **Step 1:** Create `section-18-galactic-part1.ts` with units 1-5
- [ ] **Step 2:** Create `section-18-galactic-part2.ts` with units 6-10
- [ ] **Step 3:** Add metadata and loaders
- [ ] **Step 4:** Seed and verify
- [ ] **Step 5:** Commit: `feat(space): add section 18 — galaxies & beyond`

---

### Task 13: Retrofit Quantitative Questions Into Existing Space Sections

Add slider-estimate and calculation-based questions to existing units that currently only have conceptual coverage.

**Files to modify (add 2-3 quantitative questions per unit):**
- `src/data/course/professions/space-astronomy/units/section-5-stars-part1.ts` — Add magnitude calculations, luminosity comparisons
- `src/data/course/professions/space-astronomy/units/section-5-stars-part2.ts` — Add H-R diagram position estimates
- `src/data/course/professions/space-astronomy/units/section-7-blackholes-part1.ts` — Add Schwarzschild radius estimates
- `src/data/course/professions/space-astronomy/units/section-8-cosmology-part1.ts` — Add Hubble's law calculations
- `src/data/course/professions/space-astronomy/units/section-9-rockets-part1.ts` — Add orbital velocity calculations

**Per unit, add:**
- 1 slider-estimate question with a numerical answer (e.g., "Estimate the Schwarzschild radius of a 10 solar mass black hole in km")
- 1 fill-blank question with a formula (e.g., "The escape velocity formula is v = sqrt(2 × _____ × M / r)")
- 1 order-steps question for a calculation procedure

- [ ] **Step 1:** Add quantitative questions to stars section (part1 and part2)
- [ ] **Step 2:** Add quantitative questions to black holes section
- [ ] **Step 3:** Add quantitative questions to cosmology section
- [ ] **Step 4:** Add quantitative questions to rockets section
- [ ] **Step 5:** Seed and verify all changes load correctly
- [ ] **Step 6:** Commit: `feat(space): add quantitative questions to existing units`

---

### Task 14: Space — Infrastructure Finalization

- [ ] **Step 1:** Update `professions.ts` counts for space-astronomy
- [ ] **Step 2:** Add glossary entries: Schwarzschild radius, Eddington luminosity, Jeans mass, BAO, IMF, accretion, kilonova, etc.
- [ ] **Step 3:** Seed and test
- [ ] **Step 4:** Commit: `feat(space): finalize university-level expansion`

---

## Phase 4: Mechanical Engineering — Full Course Build

The ME course has metadata in `course-meta.ts` but NO content files. The legacy units at `src/data/course/units/` use a different structure. This phase creates the full profession directory from scratch.

### Task 15: ME Course Scaffold

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/meta.ts`
- Create: `src/data/course/professions/mechanical-engineering/glossary.ts`
- Create: `src/data/course/professions/mechanical-engineering/characters.ts`
- Create: `src/data/course/professions/mechanical-engineering/character-lines.ts`
- Create: `src/data/course/professions/mechanical-engineering/story-unlocks.ts`
- Modify: `src/data/course/course-meta.ts` (add `loadMechEngUnit()` function using new profession directory)

**Notes:** The existing `loadEngineeringUnit()` in course-meta.ts references the old `units/unit-*.ts` files. Either update it to point to the new profession directory, or create a new loader and swap the reference. Don't break existing admin-gated access.

- [ ] **Step 1:** Create the profession directory structure
- [ ] **Step 2:** Create `meta.ts` with all unit/lesson metadata (empty questions) for sections 1-15
- [ ] **Step 3:** Create `glossary.ts` with core ME terms
- [ ] **Step 4:** Create character files (reuse pattern from finance/psychology)
- [ ] **Step 5:** Update `course-meta.ts` to use new profession directory imports
- [ ] **Step 6:** Seed and verify scaffold loads
- [ ] **Step 7:** Commit: `feat(mech-eng): scaffold profession directory and metadata`

---

### Task 16: ME Section 1 — Statics & Equilibrium

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-1-statics-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-1-statics-part2.ts`

**Section config:** `sectionIndex: 1`, `sectionTitle: "Statics & Equilibrium"`, color: `#3B82F6` (blue)

**Units (10 units):** Forces as vectors, moments and couples, equilibrium equations, free body diagrams, support reactions, beam analysis, truss fundamentals, method of joints, method of sections, friction (static, wedges, belt), centroids, moment of inertia, composite sections

**Question type emphasis:** slider-estimate (force/moment calculations), order-steps (FBD drawing procedure), match-pairs (support type to reaction), fill-blank (equilibrium equations), scenario (structural analysis)

- [ ] **Step 1:** Create part1 with units 1-5
- [ ] **Step 2:** Create part2 with units 6-10
- [ ] **Step 3:** Update meta.ts and course-meta.ts loaders
- [ ] **Step 4:** Seed and verify
- [ ] **Step 5:** Commit: `feat(mech-eng): add section 1 — statics & equilibrium`

---

### Task 17: ME Section 2 — Dynamics & Kinematics

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-2-dynamics-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-2-dynamics-part2.ts`

**Section config:** `sectionIndex: 2`, `sectionTitle: "Dynamics & Kinematics"`, color: `#2563EB`

**Units (10 units):** Position/velocity/acceleration, curvilinear motion, projectiles, Newton's laws, circular motion, work-energy theorem, conservation of energy, momentum and impulse, collisions, angular momentum, gyroscopes, vibrations (free, forced, isolation)

- [ ] **Step 1-5:** Same pattern as Task 16
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 2 — dynamics & kinematics`

---

### Task 18: ME Section 3 — Strength of Materials

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-3-strength-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-3-strength-part2.ts`

**Section config:** `sectionIndex: 3`, `sectionTitle: "Strength of Materials"`, color: `#1D4ED8`

**Units (10 units):** Stress and strain, thermal stress, stress concentrations, beam bending, I-beams and section modulus, deflection, shear/bending diagrams, torsion, Mohr's circle, combined loading, failure theories (von Mises, Tresca), fatigue and S-N curves, column buckling, pressure vessels

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 3 — strength of materials`

---

### Task 19: ME Section 4 — Thermodynamics

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-4-thermo-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-4-thermo-part2.ts`

**Section config:** `sectionIndex: 4`, `sectionTitle: "Thermodynamics"`, color: `#DC2626` (red)

**Units (10 units):** Properties and state, phases, ideal gas law, first law (closed/open systems), second law (entropy), Rankine cycle, Otto/Diesel/Brayton, combined cycles, refrigeration, real-world systems (AC, heat pumps)

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 4 — thermodynamics`

---

### Task 20: ME Section 5 — Heat Transfer

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-5-heat-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-5-heat-part2.ts`

**Section config:** `sectionIndex: 5`, `sectionTitle: "Heat Transfer"`, color: `#B91C1C`

**Units (10 units):** Conduction (Fourier's law), composite walls, cylinders, convection fundamentals, dimensionless numbers (Re, Nu, Pr), convection correlations, radiation (Stefan-Boltzmann, view factors), radiation shields, heat exchangers (LMTD, NTU), fins, transient conduction

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 5 — heat transfer`

---

### Task 21: ME Section 6 — Fluid Mechanics

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-6-fluids-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-6-fluids-part2.ts`

**Section config:** `sectionIndex: 6`, `sectionTitle: "Fluid Mechanics"`, color: `#0891B2` (cyan)

**Units (10 units):** Fluid properties, fluid statics (pressure, buoyancy), Bernoulli equation, energy equation, pipe flow (laminar/turbulent), major/minor losses, pumps and system curves, turbomachinery, dimensional analysis, boundary layers and drag

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 6 — fluid mechanics`

---

### Task 22: ME Section 7 — Materials & Manufacturing

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-7-materials-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-7-materials-part2.ts`

**Section config:** `sectionIndex: 7`, `sectionTitle: "Materials & Manufacturing"`, color: `#65A30D` (lime)

**Units (10 units):** Mechanical properties (tensile test), hardness/creep/fatigue, fracture toughness, iron-carbon diagram, heat treatment, casting, forming, machining (turning/milling/drilling), CNC and process planning, additive manufacturing, injection molding, welding, DFM

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 7 — materials & manufacturing`

---

### Task 23: ME Section 8 — Machine Design

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-8-design-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-8-design-part2.ts`

**Section config:** `sectionIndex: 8`, `sectionTitle: "Machine Design"`, color: `#4D7C0F`

**Units (10 units):** Shaft design (fatigue), bearing types and selection, lubrication, gear fundamentals, gear tooth design, bolt design and analysis, welded/adhesive joints, spring design, seals and couplings, design integration project

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 8 — machine design`

---

### Task 24: ME Section 9 — GD&T & Tolerancing

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-9-gdt-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-9-gdt-part2.ts`

**Section config:** `sectionIndex: 9`, `sectionTitle: "GD&T & Tolerancing"`, color: `#7C3AED` (violet)

**Units (10 units):** Tolerance fundamentals, ISO fit system, GD&T basics (14 symbols), orientation and position tolerances, datums, tolerance stack-up (worst case, RSS, Monte Carlo), surface roughness, metrology, drawing review

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 9 — GD&T & tolerancing`

---

### Task 25: ME Section 10 — How Things Work

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-10-mechanisms-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-10-mechanisms-part2.ts`

**Section config:** `sectionIndex: 10`, `sectionTitle: "How Things Work"`, color: `#6D28D9`

**Units (10 units):** Linkages and mechanisms, cam design, hydraulic systems, pneumatic systems, engines (4-stroke, diesel), electric motors, HVAC systems, power transmission, everyday machines teardown, electromechanical integration

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 10 — how things work`

---

### Task 26: ME Section 11 — Control Systems (NEW — fills university gap)

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-11-controls-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-11-controls-part2.ts`

**Section config:** `sectionIndex: 11`, `sectionTitle: "Control Systems"`, color: `#059669` (emerald)

**Units (10 units):** Open vs closed loop systems, transfer functions, block diagrams, system response (first/second order), stability (Routh-Hurwitz), root locus basics, Bode plots, PID controllers, tuning methods, control system design project

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 11 — control systems`

---

### Task 27: ME Section 12 — CAD, FEA & Computational Methods (NEW — fills university gap)

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-12-computational-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-12-computational-part2.ts`

**Section config:** `sectionIndex: 12`, `sectionTitle: "Computational Methods"`, color: `#047857`

**Units (10 units):** CAD fundamentals (parametric modeling, assemblies, drawings), FEA concepts (mesh, elements, boundary conditions), FEA interpretation (stress results, convergence), CFD basics (mesh, turbulence models, boundary conditions), numerical methods (Newton-Raphson, Euler), optimization basics, simulation workflow, verification and validation

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 12 — computational methods`

---

### Task 28: ME Section 13 — Energy Systems & Sustainability (NEW — fills university gap)

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-13-energy-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-13-energy-part2.ts`

**Section config:** `sectionIndex: 13`, `sectionTitle: "Energy & Sustainability"`, color: `#16A34A` (green)

**Units (10 units):** Combined cycle power plants, solar thermal systems, wind turbine mechanics, battery and energy storage, fuel cells, nuclear power basics, HVAC energy analysis, lifecycle assessment, sustainable design, energy economics

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 13 — energy & sustainability`

---

### Task 29: ME Section 14 — Reliability, Quality & Professional Practice (NEW — fills university gap)

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-14-professional-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-14-professional-part2.ts`

**Section config:** `sectionIndex: 14`, `sectionTitle: "Professional Practice"`, color: `#EA580C` (orange)

**Units (10 units):** FMEA methodology, statistical process control, Six Sigma basics, Weibull analysis, product development process, requirements engineering, project management for engineers, engineering ethics, professional licensure (FE/PE), technical communication

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 14 — professional practice`

---

### Task 30: ME Section 15 — Mastery & Capstone

**Files:**
- Create: `src/data/course/professions/mechanical-engineering/units/section-15-capstone-part1.ts`
- Create: `src/data/course/professions/mechanical-engineering/units/section-15-capstone-part2.ts`

**Section config:** `sectionIndex: 15`, `sectionTitle: "Mastery & Capstone"`, color: `#C2410C`

**Units (8 units):** Cross-domain problem solving, interview estimation problems, failure diagnosis cases, design review simulation, real-world system analysis, engineering judgment, career paths in ME, capstone challenge

- [ ] **Step 1-5:** Same pattern
- [ ] **Step 6:** Commit: `feat(mech-eng): add section 15 — mastery & capstone`

---

### Task 31: ME Course — Infrastructure Finalization

- [ ] **Step 1:** Update `professions.ts` — set accurate `unitCount` and `questionCount`
- [ ] **Step 2:** Verify `requiresAccess: true` is still set (admin-gated)
- [ ] **Step 3:** Clean up legacy unit files at `src/data/course/units/` if fully replaced (or keep as fallback — check with user)
- [ ] **Step 4:** Run full seed: `npx tsx scripts/seed-content.ts`
- [ ] **Step 5:** Run `npm test`
- [ ] **Step 6:** Commit: `feat(mech-eng): finalize full course build — update counts and verify`

---

## Summary

| Task | Course | Deliverable | Est. Questions |
|---|---|---|---|
| 1 | Finance | Section 16: Portfolio Theory | ~150 |
| 2 | Finance | Section 17: Security Valuation | ~150 |
| 3 | Finance | Section 18: Macro & Behavioral | ~150 |
| 4 | Finance | Section 19: Advanced Strategy | ~150 |
| 5 | Finance | Infrastructure finalization | — |
| 6 | Psychology | Section 16: Neuroscience | ~150 |
| 7 | Psychology | Section 17: Statistics | ~150 |
| 8 | Psychology | Section 18: Specialized Fields | ~150 |
| 9 | Psychology | Infrastructure finalization | — |
| 10 | Space | Section 16: Physics of Space | ~150 |
| 11 | Space | Section 17: Extreme Universe | ~150 |
| 12 | Space | Section 18: Galaxies & Beyond | ~150 |
| 13 | Space | Quantitative retrofit to existing | ~50 |
| 14 | Space | Infrastructure finalization | — |
| 15 | Mech Eng | Course scaffold | — |
| 16-30 | Mech Eng | Sections 1-15 (full build) | ~1700 |
| 31 | Mech Eng | Infrastructure finalization | — |

**Post-expansion course totals (estimated):**
| Course | Current Questions | Added | New Total | University Coverage |
|---|---|---|---|---|
| Personal Finance | 1,352 | ~600 | ~1,950 | ~90% |
| Psychology | 657 | ~450 | ~1,100 | ~85% |
| Space & Astronomy | 644 | ~500 | ~1,150 | ~75% (math ceiling) |
| Mechanical Engineering | 0 | ~1,700 | ~1,700 | ~85% |
