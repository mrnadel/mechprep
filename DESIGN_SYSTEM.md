# Octokeen — Complete Design System

> Design Specification v1.0
> Learning Experience + Gamification Architecture
> Target: A smart gamified learning platform -- motivating, professional, effective.
> See `docs/courses.md` for active courses.
>
> **Note:** Examples in this doc may reference Mechanical Engineering topics from the original single-course era. The design patterns (loops, gamification, progression) apply to all courses.

---

# PART A: LEARNING EXPERIENCE DESIGN

---

## 1. Core Learning Loops

### 1.1 Single Question Loop

```
TRIGGER:    User selects or is presented a question
ACTION:     Read question -> Select answer / Write response -> Submit
REWARD:     Immediate correctness indicator + XP popup + explanation reveal
REINFORCE:  "Interview Insight" panel shows WHY interviewers ask this,
            what they evaluate, and how a top answer differs from an average one.
```

**Detailed Flow:**

| Step | UI Element | Duration | Notes |
|------|-----------|----------|-------|
| 1. Question Presented | Card with topic badge, difficulty indicator, question type icon | -- | Confidence slider appears: "How sure are you?" (1-5 scale) |
| 2. User Attempts | Answer input (varies by type) | Untimed by default; timer visible in Interview Sim mode | No peeking at hints unless requested (costs XP) |
| 3. Submit | Confirm button with micro-animation | -- | Disabled until answer is provided |
| 4. Result Reveal | Green pulse / amber pulse / red pulse on card border | 0.8s animation | Partial credit shown for partial answers |
| 5. Explanation | Expandable panel below question | User-controlled | Three tabs: "Quick Answer" / "Deep Explanation" / "Interview Insight" |
| 6. Confidence Calibration | Small badge: "Good call!" or "Overconfident" or "You knew more than you thought!" | 0.5s fade-in | Only appears if user set a confidence rating |
| 7. XP Award | Floating XP number rises from card | 1s animation | Amount varies by difficulty, correctness, and confidence calibration |
| 8. Next Action | "Next Question" button + optional "Add to Review" bookmark | -- | Auto-advances after 3s in speed modes |

### 1.2 Session Loop

```
TRIGGER:    User starts any session type
ACTION:     Warm-up (2 easy) -> Core Challenge (variable) -> Cool-down Review -> Summary
REWARD:     Session completion XP bonus + session stats card + achievement checks
REINFORCE:  "Session Insight" -- what improved, what to revisit, streak update
```

**Detailed Flow:**

| Phase | Purpose | Question Count | Difficulty |
|-------|---------|---------------|------------|
| Warm-up | Build confidence, activate prior knowledge | 2 questions | Easy (topics user knows) |
| Ramp-up | Transition to challenge | 1-2 questions | Medium (mixed) |
| Core Challenge | Primary learning zone | 3-10 questions (varies by session type) | Adaptive (targets 65-75% success rate) |
| Cool-down | Reinforce key takeaways | 1-2 questions | Medium-easy (revisit missed concepts from session) |
| Summary | Reflect and plan | -- | N/A (review screen) |

### 1.3 Daily Loop

```
TRIGGER:    App open / push notification at user's preferred time
ACTION:     Daily Challenge (unique curated set) -> Regular practice -> Progress check
REWARD:     Streak maintenance + daily XP bonus + progress graph update
REINFORCE:  "Daily Snapshot" -- 3 numbers: streak count, questions today, accuracy today
```

**Flow:**
1. **Open app** -> "Welcome back" with streak count prominently displayed
2. **Daily Challenge available** -> Highlighted card at top (3-5 curated questions, unique each day)
3. **Complete Daily Challenge** -> Earn "Daily Complete" badge for the calendar, streak increments
4. **Optional continued practice** -> Any session type, contributes to daily stats
5. **Progress check** -> Automated at session end: "This week you've improved in [Topic] by X%"

### 1.4 Weekly Loop

```
TRIGGER:    Monday / first app open of the week
ACTION:     Weekly Review prompt -> Weak area recovery -> Milestone check -> Topic unlock
REWARD:     Weekly summary report + milestone achievements + new content access
REINFORCE:  "Weekly Report Card" -- visual progress across all topic areas
```

**Flow:**
1. **Week start** -> "Weekly Focus" recommendation based on past week's performance
2. **Mid-week** -> Subtle nudge if weak areas haven't been practiced: "Your [Topic] skills could use a refresh"
3. **Week end** -> Weekly Report: topics practiced, accuracy trends, time invested, XP earned
4. **Milestone check** -> If a topic crosses a mastery threshold, celebrate and unlock next tier
5. **Topic unlock** -> New advanced subtopics or question formats become available based on demonstrated competence

---

## 2. Adaptive Progression Model

### 2.1 Difficulty Adjustment Algorithm

**Inputs:**
| Signal | Weight | Measurement |
|--------|--------|-------------|
| Recent accuracy (last 10 questions in topic) | 0.35 | Percentage correct |
| Response time vs. expected time | 0.15 | Ratio (actual / expected) |
| Confidence calibration accuracy | 0.15 | Correlation between confidence and correctness |
| Streak within topic (consecutive correct) | 0.15 | Count |
| Historical accuracy in topic | 0.10 | Lifetime percentage |
| Session performance trend | 0.10 | Slope of accuracy over last 3 sessions |

**Difficulty Levels:** 1 through 10 (mapped to display as Easy 1-3, Medium 4-6, Hard 7-9, Expert 10)

**Adjustment Rules:**

```
IF recent_accuracy > 0.80 AND confidence_calibration > 0.70:
    difficulty += 1 (cap at 10)

IF recent_accuracy > 0.90 AND streak >= 5:
    difficulty += 2 (cap at 10)

IF recent_accuracy < 0.50:
    difficulty -= 1 (floor at 1)

IF recent_accuracy < 0.35 AND confidence_was_high:
    difficulty -= 2 (floor at 1)
    flag_topic_as_weak()

IF response_time_ratio > 2.0 AND answer_correct:
    difficulty stays (user is struggling but getting there)

IF response_time_ratio < 0.5 AND answer_correct:
    difficulty += 1 (too easy, user is breezing through)
```

**Target Zone:** The system aims for a 65-75% success rate per session. This is the "desirable difficulty" sweet spot -- challenging enough to learn, not so hard as to frustrate.

### 2.2 Topic Selection Algorithm

**Weighted Random Selection per question slot:**

```
topic_weight = base_weight
             * weakness_multiplier      // 1.0 (strong) to 3.0 (weak)
             * recency_decay            // 1.0 (not seen recently) to 0.3 (just practiced)
             * spaced_repetition_due    // 2.0 (overdue) to 0.5 (not yet due)
             * user_preference_boost    // 1.2 (user favorited) to 1.0 (neutral)
             * interview_relevance      // 1.0 to 1.5 (high-frequency interview topics)
```

Topics are selected probabilistically based on these weights. Even strong topics appear occasionally to maintain knowledge.

**Topic Categories with Sub-topics:**

| Category | Sub-topics (examples) |
|----------|----------------------|
| Statics & Dynamics | Free body diagrams, equilibrium, friction, kinematics, energy methods |
| Mechanics of Materials | Stress/strain, Mohr's circle, beam bending, torsion, buckling |
| Thermodynamics | Laws, cycles, entropy, heat transfer modes, psychrometrics |
| Fluid Mechanics | Bernoulli, pipe flow, boundary layers, drag/lift, pump curves |
| Machine Design | Gears, bearings, fasteners, welds, fatigue, shaft design |
| Manufacturing | Casting, machining, forming, joining, tolerancing, GD&T |
| Materials Science | Phase diagrams, heat treatment, material selection, failure modes |
| Controls & Vibrations | Feedback systems, natural frequency, damping, stability |
| Engineering Economics | Time value, NPV, depreciation, break-even |
| Professional Practice | Ethics, FE/PE exam concepts, standards, safety factors |

### 2.3 Question Format Variation

The system rotates through formats to prevent pattern memorization and build diverse skills:

| Format | When Used | Cognitive Skill Tested |
|--------|-----------|----------------------|
| Multiple Choice (4 options) | All levels | Recognition, elimination |
| Multiple Select (choose all that apply) | Medium+ | Comprehensive understanding |
| True / False with Justification | All levels | Critical evaluation |
| Numerical Entry | Medium+ | Calculation, application |
| Free Text (short answer) | Medium+ | Recall, articulation |
| Ranking / Ordering | Medium+ | Process understanding, prioritization |
| Matching (pairs) | All levels | Association, categorization |
| Scenario / Case Study | Hard+ | Analysis, synthesis, judgment |
| Diagram Interpretation | Medium+ | Visual-spatial reasoning |
| "Spot the Error" | Medium+ | Debugging, critical analysis |
| Fill in the Blank (equation) | Medium+ | Recall under pressure |
| Compare & Contrast | Hard+ | Deep understanding |

**Format Selection Rule:** Each session includes at least 2 different formats. The system tracks which formats a user excels at and which they avoid, and ensures balanced exposure.

### 2.4 Confidence Calibration System

**How it works:**
- Before answering, user optionally rates confidence: 1 (guessing) to 5 (certain)
- After answering, the system compares confidence to outcome
- Over time, a calibration score emerges

**Calibration States:**

| State | Definition | System Response |
|-------|-----------|-----------------|
| Well-Calibrated | Confidence correlates with accuracy (r > 0.6) | "Your instincts are solid" -- slight XP bonus |
| Overconfident | High confidence on wrong answers frequently | "Challenge: slow down on [Topic]" -- serve harder questions to create productive struggle |
| Underconfident | Low confidence on correct answers frequently | "You know more than you think!" -- encouraging feedback, show mastery stats |
| Uncalibrated | No correlation (new user or inconsistent) | Neutral -- keep collecting data |

**Feedback Messages (examples):**
- Confident + Correct: "Nailed it. Your confidence was well-placed."
- Confident + Wrong: "Interesting -- you were confident here. This is a common misconception. Here's why..."
- Unsure + Correct: "You got it right! Trust your knowledge on [Topic] more."
- Unsure + Wrong: "Good instinct to be cautious. Here's the concept to review..."

### 2.5 Spaced Repetition Integration

**Algorithm: Modified SM-2 (SuperMemo 2)**

Each topic-difficulty pair has:
- `ease_factor`: starts at 2.5, adjusted per review (min 1.3)
- `interval`: days until next review
- `repetitions`: consecutive successful recalls

**After each topic interaction:**
```
IF correct:
    IF repetitions == 0: interval = 1 day
    IF repetitions == 1: interval = 3 days
    IF repetitions >= 2: interval = previous_interval * ease_factor
    ease_factor += 0.1 (capped at 3.0)
    repetitions += 1

IF incorrect:
    repetitions = 0
    interval = 0.5 days (resurface same day or next session)
    ease_factor -= 0.2 (floored at 1.3)
```

**Integration with Topic Selection:** Topics overdue for spaced repetition get a 2x weight boost in the topic selection algorithm.

---

## 3. Feedback Architecture

### 3.1 Multiple Choice Feedback

```
┌─────────────────────────────────────────────┐
│  ✓ CORRECT  (+15 XP)                        │
│                                              │
│  Your answer: B) Poisson's ratio             │
│                                              │
│  ── Quick Answer ──                          │
│  Poisson's ratio relates lateral strain to   │
│  axial strain. For most metals: 0.25-0.35.   │
│                                              │
│  ── Why Other Options Are Wrong ──           │
│  A) Young's modulus: relates stress to       │
│     strain, not lateral to axial strain.     │
│  C) Bulk modulus: relates pressure to        │
│     volumetric strain.                       │
│  D) Shear modulus: relates shear stress to   │
│     shear strain.                            │
│                                              │
│  ── Interview Insight ──                     │
│  Interviewers ask this to verify you         │
│  understand the physical meaning, not just   │
│  the formula. Be ready to explain what       │
│  happens physically when a bar is stretched. │
└─────────────────────────────────────────────┘
```

### 3.2 Free Text Feedback

```
┌─────────────────────────────────────────────┐
│  EVALUATED  (12/15 points, +18 XP)          │
│                                              │
│  ── Model Answer ──                          │
│  [Ideal response text]                       │
│                                              │
│  ── Key Points Checklist ──                  │
│  ✓  Mentioned thermal expansion              │
│  ✓  Identified material mismatch issue       │
│  ✗  Did not mention stress concentration     │
│  ✗  Missing: factor of safety consideration  │
│                                              │
│  ── Evaluation Criteria ──                   │
│  Technical accuracy:     4/5                 │
│  Completeness:           3/5                 │
│  Communication clarity:  5/5                 │
│                                              │
│  ── Interview Insight ──                     │
│  For this type of question, interviewers     │
│  look for structured thinking. Start with    │
│  failure mode, then cause, then prevention.  │
└─────────────────────────────────────────────┘
```

### 3.3 Ranking / Ordering Feedback

```
┌─────────────────────────────────────────────┐
│  PARTIAL CREDIT  (3/5 correct, +10 XP)      │
│                                              │
│  Your Order:          Correct Order:         │
│  1. Design review     1. Requirements def.   │
│  2. Requirements ←→   2. Design review       │
│  3. Prototyping       3. Prototyping    ✓    │
│  4. Testing           4. Testing        ✓    │
│  5. Production        5. Production     ✓    │
│                                              │
│  ── Why This Order ──                        │
│  Requirements must precede design review     │
│  because you cannot evaluate a design        │
│  against criteria that haven't been defined. │
│                                              │
│  ── Common Misconception ──                  │
│  Many people conflate "design review" with   │
│  "requirements gathering." In practice,      │
│  they are distinct gates in the process.     │
└─────────────────────────────────────────────┘
```

### 3.4 Scenario / Case Study Feedback

```
┌─────────────────────────────────────────────┐
│  ANALYSIS COMPLETE  (+25 XP)                 │
│                                              │
│  ── Your Reasoning Assessment ──             │
│  Problem identification:    Strong           │
│  Root cause analysis:       Developing       │
│  Solution approach:         Strong           │
│  Trade-off consideration:   Needs work       │
│  Communication structure:   Strong           │
│                                              │
│  ── What You Did Well ──                     │
│  You correctly identified fatigue failure    │
│  as the primary concern and proposed stress  │
│  relief as a solution.                       │
│                                              │
│  ── What to Strengthen ──                    │
│  Consider cost vs. performance trade-offs.   │
│  An interviewer would want to hear: "We      │
│  could do X (cheaper, less reliable) or Y    │
│  (more expensive, robust). I'd recommend Y   │
│  because..."                                 │
│                                              │
│  ── What Interviewers Evaluate Here ──       │
│  1. Structured problem decomposition         │
│  2. Awareness of real-world constraints      │
│  3. Ability to justify engineering decisions  │
└─────────────────────────────────────────────┘
```

### 3.5 Confidence-Rated Feedback (Overlay)

This is an additional feedback layer that appears on TOP of the format-specific feedback when the user has set a confidence rating:

```
┌─────────────────────────────────────────────┐
│  CONFIDENCE CHECK                            │
│                                              │
│  You said: ★★★★☆ (Confident)                │
│  Result: Incorrect                           │
│                                              │
│  ⚠ This is a calibration signal. Topics      │
│  where you feel confident but answer wrong   │
│  are the most dangerous in interviews.       │
│  This concept has been flagged for review.   │
│                                              │
│  Your calibration score: 62% (Fair)          │
│  [═══════════░░░░] -- needs improvement      │
│                                              │
│  Tip: In interviews, it's better to say      │
│  "I believe X but I'd want to verify"        │
│  than to state something wrong confidently.  │
└─────────────────────────────────────────────┘
```

---

## 4. Weak Topic Recovery Flow

### 4.1 Detection

A topic is classified as **Weak** when ANY of these trigger:

| Trigger | Threshold |
|---------|-----------|
| Rolling accuracy (last 10 questions) | Below 40% |
| Accuracy drop | 25%+ decline from historical average |
| Consecutive wrong | 3+ incorrect in a row within topic |
| Confidence-accuracy mismatch | High confidence + wrong, 3+ times in topic |
| Avoidance signal | User skips or exits questions in this topic 2+ times |

### 4.2 Recovery Process

**Phase 1: Gentle Re-introduction (Days 1-3)**
- Reduce difficulty to one level below where user was struggling
- Serve 1-2 questions per session from weak topic (mixed in naturally, not called out)
- Use format types the user is most comfortable with
- Provide extra-detailed feedback with links to concept refreshers

**Phase 2: Structured Recovery (Days 4-7)**
- Offer a "Deep Dive" session specifically for the weak topic
- Gradually increase difficulty as user demonstrates improvement
- Introduce format variety
- Present concept summary cards before questions begin

**Phase 3: Reintegration (Days 8-14)**
- Return topic to normal rotation with standard weighting
- Monitor closely -- if accuracy drops again, return to Phase 1
- Celebrate recovery: "You've improved your [Topic] accuracy by X%!"

### 4.3 Reclassification Criteria

| Status | Criteria to Enter | Criteria to Exit |
|--------|------------------|-----------------|
| Weak | See detection triggers above | N/A (starting state) |
| Recovering | Automatic after entering recovery Phase 1 | 5+ correct in topic at medium difficulty |
| Improving | 5+ correct at medium difficulty | 10+ questions at adaptive difficulty with 65%+ accuracy |
| Competent | Meets "Improving" exit criteria | Normal ongoing assessment |
| Strong | 80%+ accuracy over 20+ questions, multiple formats | Drops below 60% over 10 questions |

### 4.4 UI Presentation -- Motivating, Not Punishing

**What the user sees:**

```
┌─────────────────────────────────────────────┐
│  SKILL RADAR                                 │
│                                              │
│  Mechanics of Materials                      │
│  [████████████████████░░░░] 78%  Strong      │
│                                              │
│  Thermodynamics                              │
│  [████████████░░░░░░░░░░░░] 52%  Building    │
│  ↑ Up 8% this week -- nice work!             │
│                                              │
│  Fluid Mechanics                             │
│  [████████░░░░░░░░░░░░░░░░] 35%  Focus Area │
│  💡 "Try a Deep Dive session to level up"    │
│                                              │
│  Manufacturing                               │
│  [██████████████████░░░░░░] 71%  Solid       │
│                                              │
└─────────────────────────────────────────────┘
```

**Language Rules:**
- NEVER say "weak" or "failing" or "bad" to the user
- USE: "Focus Area," "Building," "Growth Opportunity," "Developing"
- Always pair a gap observation with an actionable suggestion
- Always show trajectory (improving, stable, etc.) not just current state
- Celebrate recovery prominently

---

## 5. Session Types

### 5.1 Quick Practice

| Attribute | Value |
|-----------|-------|
| Duration | 5 minutes |
| Questions | 5-8 |
| Topic Mix | Adaptive (weighted toward recently studied + weak areas) |
| Difficulty | Adaptive, starts at user's current level |
| Format Mix | 80% multiple choice, 20% other quick formats |
| Scoring | Standard XP per question |
| Feedback | Immediate after each question (brief mode) |
| Timer | Per-question suggested time (30-45s), non-punitive |
| Best For | Morning warm-up, quick review, maintaining streaks |

### 5.2 Deep Dive

| Attribute | Value |
|-----------|-------|
| Duration | 15-20 minutes |
| Questions | 10-15 |
| Topic Mix | Single topic selected by user OR recommended by system |
| Difficulty | Progressive: starts Easy, ramps to Hard based on performance |
| Format Mix | Varied -- at least 4 different formats per session |
| Scoring | Standard XP + "Deep Dive Completion" bonus (50 XP) |
| Feedback | Detailed after each question, with concept links |
| Timer | No timer (thoroughness over speed) |
| Best For | Focused study, weak area improvement, deep understanding |

**Unique Mechanic:** "Concept Chain" -- questions build on each other. Getting Q3 right unlocks a harder Q4 that extends the same concept. Getting Q3 wrong triggers a scaffolding question that re-teaches the concept before trying a similar Q4.

### 5.3 Interview Simulation

| Attribute | Value |
|-----------|-------|
| Duration | 30 minutes |
| Questions | 15-20 |
| Topic Mix | Mixed across 4-6 topics (mirrors real interviews) |
| Difficulty | Mixed: 30% Easy, 40% Medium, 20% Hard, 10% Expert |
| Format Mix | 40% MC, 20% scenario, 15% free text, 15% numerical, 10% other |
| Scoring | Scored out of 100 (weighted by difficulty). Graded: A/B/C/D/F |
| Feedback | DELAYED -- all feedback shown after session completes (realistic) |
| Timer | Strict per-question timer (varies by type: 30s MC, 120s scenario, 90s free text) |
| Best For | Interview readiness assessment, pressure practice |

**Unique Mechanic:** "Interview Pressure" -- a visible timer, no going back to previous questions, and a final score that tracks improvement over time. Post-session debrief is comprehensive.

**Grading Scale:**
| Score | Grade | Message |
|-------|-------|---------|
| 90-100 | A | "Interview Ready -- you'd impress." |
| 80-89 | B | "Strong performance. Polish a few areas and you're set." |
| 70-79 | C | "Solid foundation. Keep practicing the topics you missed." |
| 60-69 | D | "Getting there. Focus on [weakest topic from sim]." |
| 0-59 | F | "More practice needed. Try Deep Dive sessions on [topics]." |

### 5.4 Daily Challenge

| Attribute | Value |
|-----------|-------|
| Duration | 3-7 minutes |
| Questions | 3-5 (exactly) |
| Topic Mix | Curated daily (same for all users; rotates through topics on a 30-day cycle) |
| Difficulty | Mixed: 1 Easy, 2 Medium, 1 Hard (+1 Expert on weekends) |
| Format Mix | Varies daily (theme days: "Multiple Choice Monday," "Scenario Saturday") |
| Scoring | Daily Challenge XP bonus (25 XP for completion, bonus for perfection) |
| Feedback | Immediate, detailed |
| Timer | Suggested but not enforced |
| Best For | Streak maintenance, consistent daily engagement, breadth |

**Unique Mechanic:** "Daily Streak Chain" -- completing the Daily Challenge counts toward streak. A perfect Daily Challenge (all correct) awards a gold star for that calendar day.

### 5.5 Weak Area Recovery

| Attribute | Value |
|-----------|-------|
| Duration | 10-15 minutes |
| Questions | 8-12 |
| Topic Mix | Focused on 1-2 identified weak topics |
| Difficulty | Starts 1-2 levels below struggle point, ramps adaptively |
| Format Mix | Starts with user's strongest formats, introduces weaker formats gradually |
| Scoring | Standard XP + "Recovery Bonus" (1.5x multiplier on weak topic questions) |
| Feedback | Extra detailed, includes concept refresher cards before challenging questions |
| Timer | No timer |
| Best For | Targeted improvement on struggling areas |

**Unique Mechanic:** "Concept Scaffold" -- before each question, a brief (2-3 sentence) concept reminder appears. User can dismiss it or read it. As accuracy improves, scaffolds appear less frequently.

### 5.6 Real-World Explorer

| Attribute | Value |
|-----------|-------|
| Duration | 10-15 minutes |
| Questions | 6-10 |
| Topic Mix | Themed around a real-world mechanism or system (e.g., "How a Turbocharger Works") |
| Difficulty | Progressive, medium baseline |
| Format Mix | Heavy on scenarios (40%), diagrams (20%), MC (20%), free text (20%) |
| Scoring | Standard XP + "Explorer Bonus" (30 XP for completion) |
| Feedback | Rich context: photos/diagrams of real components, industry applications |
| Timer | No timer |
| Best For | Building intuition, connecting theory to practice, interview storytelling |

**Unique Mechanic:** "Engineering Story" -- the session follows a narrative: you're analyzing a real system from intake to output. Each question explores a different aspect of the same system.

---

---

# PART B: GAMIFICATION DESIGN

---

## 6. XP System

### 6.1 Base XP per Question

| Difficulty | Correct | Partial Credit | Incorrect (attempted) | Skipped |
|-----------|---------|---------------|----------------------|---------|
| Easy (1-3) | 10 XP | 5 XP | 2 XP | 0 XP |
| Medium (4-6) | 20 XP | 10 XP | 3 XP | 0 XP |
| Hard (7-9) | 35 XP | 18 XP | 5 XP | 0 XP |
| Expert (10) | 50 XP | 25 XP | 8 XP | 0 XP |

> Incorrect answers still give small XP to reward engagement and learning from mistakes. Skipping gives nothing.

### 6.2 Format Multipliers

| Question Format | XP Multiplier | Rationale |
|----------------|---------------|-----------|
| Multiple Choice | 1.0x | Baseline |
| Multiple Select | 1.1x | Slightly harder |
| True/False + Justification | 1.15x | Requires reasoning |
| Numerical Entry | 1.2x | Calculation effort |
| Free Text | 1.3x | Articulation effort |
| Ranking | 1.15x | Ordering complexity |
| Matching | 1.05x | Association |
| Scenario / Case Study | 1.5x | Highest cognitive load |
| Diagram Interpretation | 1.2x | Visual reasoning |
| Spot the Error | 1.25x | Critical analysis |

**XP Calculation:** `base_xp * format_multiplier * streak_multiplier * session_bonus`

### 6.3 Streak Multipliers

| Streak Length | Multiplier |
|--------------|------------|
| 1 day | 1.0x |
| 2 days | 1.05x |
| 3 days | 1.10x |
| 5 days | 1.15x |
| 7 days (1 week) | 1.25x |
| 14 days (2 weeks) | 1.35x |
| 21 days (3 weeks) | 1.40x |
| 30 days (1 month) | 1.50x (cap) |

The multiplier applies to ALL XP earned during that session. Cap at 1.5x to prevent runaway inflation.

### 6.4 Bonus XP Triggers

| Trigger | Bonus | Frequency |
|---------|-------|-----------|
| Perfect Session (all correct) | +50 XP | Per session |
| Speed Demon (avg time < 50% of expected) | +20 XP | Per session |
| Confidence Master (all confidence ratings accurate) | +30 XP | Per session |
| First Question of the Day | +5 XP | Daily |
| Daily Challenge Complete | +25 XP | Daily |
| Daily Challenge Perfect | +50 XP (replaces the 25) | Daily |
| Deep Dive Complete | +50 XP | Per session |
| Interview Sim Complete | +75 XP | Per session |
| Interview Sim Grade A | +100 XP (replaces the 75) | Per session |
| Weak Area Recovery Complete | +40 XP | Per session |
| Explorer Complete | +30 XP | Per session |
| 100 Questions Answered (milestone) | +200 XP | Once |
| 500 Questions Answered | +500 XP | Once |
| 1000 Questions Answered | +1000 XP | Once |
| Come Back After 3+ Day Absence | +25 XP ("Welcome Back") | Per return |

### 6.5 XP Sinks / Costs (Optional Mechanic)

| Action | Cost | Effect |
|--------|------|--------|
| Request Hint | -5 XP | Reveals a hint but reduces question XP by 50% |
| Skip Question | 0 XP earned | No penalty, but no reward |
| Streak Freeze | -100 XP | Protects streak for 1 day |

---

## 7. Level System

### 7.1 Level Count and Curve

**Total Levels: 40**

XP thresholds follow a modified exponential curve with diminishing acceleration to prevent late levels from feeling impossible:

| Level | Title | Total XP Required | XP for This Level |
|-------|-------|-------------------|-------------------|
| 1 | Apprentice Draftsman | 0 | 0 |
| 2 | Junior Draftsman | 100 | 100 |
| 3 | Draftsman | 250 | 150 |
| 4 | Senior Draftsman | 450 | 200 |
| 5 | Design Intern | 700 | 250 |
| 6 | Junior Analyst | 1,050 | 350 |
| 7 | Analyst | 1,500 | 450 |
| 8 | Senior Analyst | 2,050 | 550 |
| 9 | Associate Engineer | 2,750 | 700 |
| 10 | Engineer I | 3,600 | 850 |
| 11 | Engineer II | 4,600 | 1,000 |
| 12 | Engineer III | 5,800 | 1,200 |
| 13 | Design Engineer | 7,200 | 1,400 |
| 14 | Project Engineer | 8,800 | 1,600 |
| 15 | Systems Engineer | 10,700 | 1,900 |
| 16 | Lead Engineer | 12,900 | 2,200 |
| 17 | Senior Engineer I | 15,400 | 2,500 |
| 18 | Senior Engineer II | 18,300 | 2,900 |
| 19 | Senior Engineer III | 21,600 | 3,300 |
| 20 | Staff Engineer | 25,400 | 3,800 |
| 21 | Principal Analyst | 29,700 | 4,300 |
| 22 | Principal Engineer I | 34,500 | 4,800 |
| 23 | Principal Engineer II | 39,900 | 5,400 |
| 24 | Technical Specialist | 46,000 | 6,100 |
| 25 | Senior Specialist | 52,800 | 6,800 |
| 26 | Technical Lead | 60,400 | 7,600 |
| 27 | Engineering Manager | 68,800 | 8,400 |
| 28 | Senior Technical Lead | 78,200 | 9,400 |
| 29 | Chief Analyst | 88,600 | 10,400 |
| 30 | Chief Engineer I | 100,000 | 11,400 |
| 31 | Chief Engineer II | 113,000 | 13,000 |
| 32 | Engineering Director | 127,500 | 14,500 |
| 33 | VP of Engineering | 143,500 | 16,000 |
| 34 | Distinguished Engineer I | 161,000 | 17,500 |
| 35 | Distinguished Engineer II | 180,000 | 19,000 |
| 36 | Fellow Engineer | 201,000 | 21,000 |
| 37 | Senior Fellow | 224,000 | 23,000 |
| 38 | Technical Fellow | 250,000 | 26,000 |
| 39 | Engineering Luminary | 280,000 | 30,000 |
| 40 | Mechanical Sage | 315,000 | 35,000 |

### 7.2 Level Tier Unlocks

| Tier | Levels | Unlocks |
|------|--------|---------|
| Foundation | 1-5 | All basic session types, Quick Practice, Daily Challenge |
| Developing | 6-10 | Deep Dive sessions, Weak Area Recovery, basic skill tree visible |
| Professional | 11-15 | Interview Simulation, Real-World Explorer, advanced question formats |
| Advanced | 16-20 | Expert difficulty questions, detailed analytics dashboard |
| Expert | 21-25 | Custom session builder, mentor tips, advanced scenario questions |
| Master | 26-30 | All content unlocked, performance benchmarking |
| Elite | 31-35 | Prestige challenges, timed expert trials |
| Legendary | 36-40 | Full mastery view, title customization, all cosmetic options |

### 7.3 Level-Up Celebration

When a user levels up:
1. Full-screen brief animation (1.5s): level number with engineering blueprint aesthetic
2. New title displayed prominently
3. If a tier boundary is crossed: expanded celebration showing what's unlocked
4. XP progress bar resets visually (satisfying "fill and reset" loop)

---

## 8. Achievement System

### 8.1 Knowledge Achievements (7)

| # | Name | Description | Icon Concept | Unlock Condition |
|---|------|-------------|-------------|-----------------|
| 1 | **Statics Scholar** | Master the fundamentals of equilibrium | Balance scale | 80%+ accuracy in Statics over 30+ questions |
| 2 | **Thermo Theorist** | Command the laws of thermodynamics | Flame/snowflake dual icon | 80%+ accuracy in Thermodynamics over 30+ questions |
| 3 | **Fluid Dynamics Pro** | Navigate the complexities of flow | Water streamlines | 80%+ accuracy in Fluid Mechanics over 30+ questions |
| 4 | **Material Master** | Know your materials inside and out | Crystal lattice | 80%+ accuracy in Materials Science over 30+ questions |
| 5 | **Machine Designer** | Gears, bearings, and shafts -- your domain | Gear assembly | 80%+ accuracy in Machine Design over 30+ questions |
| 6 | **Manufacturing Maven** | From raw stock to finished part | CNC tool path | 80%+ accuracy in Manufacturing over 30+ questions |
| 7 | **Renaissance Engineer** | Competent across all topics | Da Vinci Vitruvian sketch | 70%+ accuracy in ALL topic categories (min 20 questions each) |

### 8.2 Consistency Achievements (6)

| # | Name | Description | Icon Concept | Unlock Condition |
|---|------|-------------|-------------|-----------------|
| 8 | **First Gear** | Start your engine | Single gear turning | Complete first session |
| 9 | **Week Warrior** | 7 days without stopping | Calendar with 7 check marks | 7-day streak |
| 10 | **Fortnight Focus** | Two weeks of dedication | Calendar with shield | 14-day streak |
| 11 | **Monthly Machine** | 30 days of consistent practice | Factory with smoke | 30-day streak |
| 12 | **Century Mark** | 100 questions answered | Odometer at 100 | Answer 100 total questions |
| 13 | **Thousand Strong** | The dedication is real | Odometer at 1000 | Answer 1,000 total questions |

### 8.3 Challenge Achievements (5)

| # | Name | Description | Icon Concept | Unlock Condition |
|---|------|-------------|-------------|-----------------|
| 14 | **Interview Ready** | Score an A on your first sim | Handshake | Score 90+ on Interview Simulation |
| 15 | **Under Pressure** | Perfect score on a timed sim | Diamond | 100% on Interview Simulation |
| 16 | **Comeback Kid** | Improve a sim score by 20+ points | Rising graph arrow | Improve Interview Sim score by 20+ from previous attempt |
| 17 | **Speed Demon** | Complete a Quick Practice in under 3 minutes, all correct | Lightning bolt | Perfect Quick Practice under 3 min |
| 18 | **Deep Thinker** | Score 90%+ on a Deep Dive | Brain with gears | 90%+ on any Deep Dive session |

### 8.4 Exploration Achievements (4)

| # | Name | Description | Icon Concept | Unlock Condition |
|---|------|-------------|-------------|-----------------|
| 19 | **Explorer** | Try every session type | Compass rose | Complete at least 1 of each session type |
| 20 | **Topic Tourist** | Practice in every topic category | World map with pins | Answer at least 5 questions in every topic |
| 21 | **Format Collector** | Experience every question format | Swiss army knife | Answer at least 1 question of every format type |
| 22 | **Real-World Ready** | Complete 5 Explorer sessions | Factory floor | Complete 5 Real-World Explorer sessions |

### 8.5 Mastery Achievements (4)

| # | Name | Description | Icon Concept | Unlock Condition |
|---|------|-------------|-------------|-----------------|
| 23 | **Expert Operator** | Answer 10 Expert questions correctly | Precision caliper | 10 correct Expert-level answers |
| 24 | **Sharpshooter** | 90%+ accuracy over 50 consecutive questions | Crosshair | 90%+ rolling accuracy over 50 questions |
| 25 | **Calibrated Mind** | Confidence calibration score above 80% | Level/bubble instrument | Confidence calibration > 80% over 30+ rated questions |
| 26 | **Zero Defects** | 5 perfect sessions in a row | Quality stamp | 5 consecutive sessions with 100% accuracy |

### 8.6 Hidden / Surprise Achievements (5)

| # | Name | Description (hidden until earned) | Icon Concept | Unlock Condition |
|---|------|----------------------------------|-------------|-----------------|
| 27 | **Night Owl** | "Engineering doesn't sleep" | Owl with safety goggles | Complete a session between midnight and 5 AM |
| 28 | **Early Bird** | "First shift, best shift" | Rooster with hard hat | Complete a session before 6 AM |
| 29 | **Redemption Arc** | "From focus area to mastery" | Phoenix | Move a topic from Weak to Strong classification |
| 30 | **The Streak Saver** | "That was close" | Fire extinguisher | Use a streak freeze on a day you would have lost the streak |
| 31 | **Hat Trick** | "Three perfects in one day" | Top hat with three stars | 3 perfect sessions in a single day |

**Total: 31 achievements**

### 8.7 Achievement Display

- Achievements displayed in a grid organized by category
- Locked achievements show greyed-out icon + "???" description (hidden ones show nothing)
- Unlocked achievements show full color icon + earned date
- Progress toward incomplete achievements shown as progress bar where applicable
- "Nearest Achievement" widget on home screen shows closest-to-unlocking achievement

---

## 9. Skill Map / Skill Tree

### 9.1 Structure

The Skill Tree is organized as an **engineering blueprint** layout -- nodes connected by lines on a grid background that resembles a technical drawing.

```
                    ┌─────────────────┐
                    │   MECHANICAL    │
                    │   ENGINEERING   │
                    │   MASTERY       │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────┴───┐  ┌──────┴─────┐  ┌────┴────────┐
     │  MECHANICS  │  │  THERMAL &  │  │  DESIGN &   │
     │  & SOLIDS   │  │  FLUIDS     │  │  PRACTICE   │
     └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
            │                │                │
    ┌───────┼───────┐  ┌─────┼─────┐  ┌───────┼───────┐
    │       │       │  │     │     │  │       │       │
 Statics Dynamics MoM Thermo Fluids  MfgD  MachDes  Controls
    │       │       │  │     │     │  │       │       │
   [sub]   [sub]  [sub][sub][sub] [sub][sub]  [sub]  [sub]
```

### 9.2 Node States

| State | Visual | Meaning |
|-------|--------|---------|
| **Locked** | Grey outline, dashed border, lock icon | Prerequisites not met |
| **Available** | White outline, solid border, subtle pulse | Ready to start |
| **In Progress** | Partial fill (percentage-based), blue tone | User has begun practicing |
| **Competent** | Full fill, green tone, single check mark | 70%+ accuracy over 20+ questions |
| **Mastered** | Full fill with glow effect, gold tone, double check mark, star | 85%+ accuracy over 40+ questions, multiple formats |

### 9.3 Node Detail (on click/tap)

```
┌─────────────────────────────────────┐
│  BEAM BENDING                       │
│  Category: Mechanics of Materials   │
│                                     │
│  Status: In Progress (62%)          │
│  [████████████░░░░░░░░] 62%         │
│                                     │
│  Questions Attempted: 18 / 30 min   │
│  Accuracy: 67%                      │
│  Avg Difficulty: 5.2 / 10           │
│  Formats Practiced: 3 / 5 required  │
│                                     │
│  To reach Competent:                │
│  - Answer 12 more questions         │
│  - Reach 70% accuracy               │
│  - Try "Numerical Entry" format     │
│                                     │
│  [Start Deep Dive] [Add to Focus]   │
└─────────────────────────────────────┘
```

### 9.4 Connections Between Topics

Lines between nodes represent **conceptual dependencies**:
- **Solid line:** Direct prerequisite (must be Competent before unlocking)
- **Dashed line:** Related concept (not required, but helpful; shown as "Recommended")
- **Glow on connection:** When both connected nodes are mastered

**Example connections:**
- Statics -> Mechanics of Materials (prerequisite)
- Mechanics of Materials -> Machine Design (prerequisite)
- Thermodynamics -> Fluid Mechanics (recommended)
- Materials Science -> Manufacturing (recommended)
- Controls -> Machine Design (recommended)

### 9.5 Mastery Percentage Calculation

```
topic_mastery = (
    accuracy_score * 0.40          // 0-100 based on rolling accuracy
  + question_count_score * 0.20    // 0-100 based on questions answered (100 at 40+)
  + format_diversity_score * 0.15  // 0-100 based on formats attempted/required
  + difficulty_score * 0.15        // 0-100 based on avg difficulty of correct answers
  + recency_score * 0.10          // 0-100 based on how recently practiced (decays)
)
```

---

## 10. Streak & Consistency Mechanics

### 10.1 Streak Definition

**To maintain a streak, the user must complete at least ONE of the following each calendar day (in user's timezone):**
- Complete a Daily Challenge
- Complete any full session (any type)
- Answer at least 10 questions in any combination

**Streak resets at midnight** if none of the above conditions are met (unless a Streak Freeze is active).

### 10.2 Streak Rewards

| Milestone | Reward |
|-----------|--------|
| 3-day streak | "Getting Rolling" badge + 25 bonus XP |
| 7-day streak | "Week Warrior" achievement + XP multiplier increases to 1.25x |
| 14-day streak | "Fortnight Focus" achievement + 100 bonus XP |
| 21-day streak | "Three Weeks Strong" badge + 150 bonus XP |
| 30-day streak | "Monthly Machine" achievement + 300 bonus XP + streak shield (auto-freeze 1 day) |
| 50-day streak | "Half Century" badge + 500 bonus XP |
| 100-day streak | "Century" badge + 1000 bonus XP + permanent 1.1x XP boost |
| 365-day streak | "The Perpetual Engine" badge + 5000 bonus XP |

### 10.3 Streak Freeze

- **Earning freezes:** 1 free Streak Freeze per week (resets Monday)
- **Purchasing freezes:** Additional freezes cost 100 XP each (max 2 stored)
- **Auto-shield:** At 30-day streak milestone, user earns 1 auto-applied freeze
- **Application:** Can be pre-applied ("I know I'll miss tomorrow") or auto-applied at midnight if streak would break and a freeze is available
- **Visibility:** Streak counter shows a snowflake icon on frozen days

### 10.4 Streak Recovery

If a streak breaks:
- "Welcome back!" message (never shaming)
- Show what the streak was: "Your previous streak: 12 days -- impressive!"
- Recovery incentive: "Build a 3-day streak to earn a comeback bonus of 50 XP"
- Previous streak history is preserved in stats (best streak, all-time total)

### 10.5 Weekly & Monthly Tracking

**Weekly Tracking:**
- 7-slot visual bar (Mon-Sun), each day fills when requirements met
- "Weekly Goal" target: user sets how many days/week they want to practice (default: 5)
- Completing weekly goal earns 50 bonus XP

**Monthly Tracking:**
- Calendar heat map showing practice intensity per day
- Color coding: no practice (grey), light (pale blue), moderate (blue), heavy (deep blue)
- Monthly summary stat card at month end

---

## 11. Session Completion Mechanics

### 11.1 Summary Screen Design

```
┌──────────────────────────────────────────────┐
│             SESSION COMPLETE                  │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │  SCORE: 85%  (17/20 correct)           │  │
│  │  ★★★★☆                                 │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  ┌──────────┬───────────┬──────────────────┐  │
│  │ XP EARNED│  TIME     │  ACCURACY        │  │
│  │  +347    │  12:34    │  85%             │  │
│  │  ↑ 1.25x │           │  ↑ from 78%     │  │
│  │  streak  │           │  last session    │  │
│  └──────────┴───────────┴──────────────────┘  │
│                                               │
│  TOPICS COVERED                               │
│  Statics ........... 5/5 ✓ (100%)            │
│  Thermodynamics .... 4/5   (80%)             │
│  Fluid Mechanics ... 3/5   (60%)             │
│  Machine Design .... 5/5 ✓ (100%)            │
│                                               │
│  ── KEY TAKEAWAYS ──                          │
│  • Your Statics knowledge is strong           │
│  • Review: Bernoulli equation applications    │
│  • Confidence calibration: 78% (improving!)   │
│                                               │
│  ── STREAK ──                                 │
│  🔥 Day 8  |  XP Multiplier: 1.25x           │
│                                               │
│  [Review Missed Questions]  [Start New Session]│
│                              [Back to Home]    │
└──────────────────────────────────────────────┘
```

### 11.2 Celebration Moments

**Tier 1: Micro-celebrations (every session)**
- XP counter animates upward like a slot machine
- Accuracy percentage fills like a gauge
- Stars fill in based on performance (1-5)

**Tier 2: Notable events**
| Event | Celebration |
|-------|-------------|
| Perfect session | Stars burst animation, "PERFECT" banner, confetti particles |
| New personal best accuracy | "NEW RECORD" badge slides in |
| Streak milestone (7, 14, 30) | Full-width banner with milestone number, brief animation |
| Topic reaches "Competent" | Topic icon animates from grey to green with a pulse |
| Topic reaches "Mastered" | Gold burst animation around topic icon |

**Tier 3: Major milestones**
| Event | Celebration |
|-------|-------------|
| Level up | Full-screen overlay: old level -> new level transition, new title displayed |
| Achievement unlocked | Achievement card flies in from side, icon does a spin animation |
| Tier unlock (every 5 levels) | Extended celebration: blueprint "unrolling" animation showing new features |
| First Interview Sim "A" grade | Special "Interview Ready" full-screen badge |

### 11.3 "What's Next" Recommendation

After every session, show one smart recommendation:

**Algorithm:**
```
IF weak_topic_detected AND NOT just_did_recovery:
    recommend "Deep Dive: [weak topic]"
ELSE IF streak_at_risk (late in day, haven't hit daily minimum):
    recommend "Quick Practice to lock in your streak"
ELSE IF new_session_type_unlocked:
    recommend "Try [new session type]!"
ELSE IF spaced_repetition_topic_due:
    recommend "Review: [topic] (last practiced X days ago)"
ELSE IF interview_sim_not_tried_in_7_days:
    recommend "Interview Simulation -- test your readiness"
ELSE:
    recommend next logical session based on study plan
```

### 11.4 Share-Worthy Moments

Generate shareable summary cards (image format for social media) at:
- Level-up milestones (every 5 levels)
- Achievement unlocks
- 30-day streak
- Interview Sim "A" grade
- Topic mastery

**Card Format:**
```
┌─────────────────────────────┐
│  MECHANICAL PREP             │
│                              │
│  [User's Level Title]        │
│  Level 15 -- Systems Engineer│
│                              │
│  🔥 14-day streak            │
│  📊 78% overall accuracy     │
│  📚 847 questions answered   │
│                              │
│  Preparing for excellence.   │
└─────────────────────────────┘
```

---

## 12. Motivational Patterns

### 12.1 Progress Visualization Approaches

| Visualization | Location | Purpose |
|--------------|----------|---------|
| **XP Progress Bar** | Top of every screen | Shows progress to next level, always visible |
| **Skill Radar Chart** | Home screen / Profile | Spider chart showing relative strength across all topics |
| **Streak Counter** | Home screen, top-right | Fire icon + day count, always visible |
| **Weekly Activity Bar** | Home screen | 7-day bar chart showing daily activity |
| **Monthly Heat Map** | Profile / Stats | Calendar view with intensity coloring |
| **Accuracy Trend Line** | Profile / Stats | Line graph showing accuracy over time (overall + per topic) |
| **Topic Mastery Bars** | Skill tree + home widget | Horizontal progress bars per topic |
| **Session History** | Profile / Stats | List of past sessions with scores |
| **Interview Readiness Gauge** | Home screen | Circular gauge (0-100) based on sim scores + overall mastery |

### 12.2 Micro-celebrations

| Moment | Animation / Sound Concept |
|--------|--------------------------|
| Correct answer | Card border flashes green, subtle "ding" sound, XP floats up |
| Streak continues (session start) | Fire icon pulses, counter increments with bounce |
| Question streak (3 in a row) | "On fire!" text briefly appears above question card |
| Question streak (5 in a row) | Larger "UNSTOPPABLE" text with particle trail |
| XP milestone (every 500 XP) | XP bar shimmers gold briefly |
| Returning after absence | Warm "Welcome back" with motivational engineering quote |
| Completing last question of session | Screen edges glow, "Session Complete" swoops in |

**Sound Design Principles:**
- All sounds optional (settings toggle)
- Engineering-themed: mechanical clicks, precision instrument sounds, pneumatic releases
- Subtle and satisfying, never jarring
- Different tones for different events (users learn to associate sound = outcome)

### 12.3 Social Proof Elements (Without Real Users)

Since the app may not initially have multiplayer or social features, create perceived social context:

| Element | Implementation |
|---------|---------------|
| **"X% of engineers get this right"** | Shown after answering; simulated difficulty percentages based on question difficulty rating |
| **"This is a common interview question at [Company Type]"** | Tag certain questions with industry relevance |
| **"Top performers answer in under X seconds"** | Benchmark time after answering timed questions |
| **"Engineers who master this topic earn X% higher interview scores"** | Motivational stat on topic intro screens |
| **Daily Challenge leaderboard position** | "You scored in the top X%" (simulated percentile based on score) |

**Important:** All simulated social proof must be clearly reasonable and based on actual difficulty calibration, not fabricated to mislead. As real user data accumulates, transition to actual statistics.

### 12.4 Comeback Mechanics (Re-engagement)

**When user hasn't practiced in 3+ days:**

| Days Absent | Response |
|-------------|----------|
| 3-6 days | "Welcome back! Your streak is waiting. Jump back in with a Quick Practice." |
| 7-13 days | "We saved your progress. Here's a custom Recovery Session based on what you were working on." Show last session stats. |
| 14-29 days | "Good to see you again. A lot of engineers take breaks -- what matters is coming back. Here's a refresher session." Offer easy warm-up session. |
| 30+ days | "Welcome back, [Title]. Let's see where you stand." Offer a brief diagnostic (10 questions, mixed) to re-calibrate difficulty before resuming normal practice. |

**Comeback Bonus XP:** 25 XP bonus for first session after 3+ day absence. Stacks with other bonuses.

**No guilt mechanics:** The app NEVER says "you missed X days" or "your streak broke." It focuses on what's ahead, not what was missed.

### 12.5 "Just Right" Difficulty -- Flow State Targeting

The entire adaptive system is designed to keep the user in a **flow state** (Csikszentmihalyi's flow channel):

```
    HIGH  |         ANXIETY
          |        /
 CHALLENGE|       /
          |      /   ← TARGET: 65-75% success rate
          |     /     (challenging but achievable)
          |    /
          |   /  FLOW ZONE
          |  /
          | /
          |/        BOREDOM
    LOW   |________________________
          LOW                  HIGH
                  SKILL
```

**Implementation:**
- After each question, the algorithm adjusts to target 65-75% success rate
- If 3 questions in a row are correct: next question is harder
- If 2 questions in a row are wrong: next question is easier
- Format variety prevents pattern recognition even at the same difficulty
- Session pacing alternates harder and easier questions (not strictly ascending)

**"Goldilocks Zone" Indicators:**
- If user's session accuracy is in 65-75%: system is well-calibrated (no adjustment)
- If accuracy is 85%+: system is too easy -> increase difficulty
- If accuracy is below 50%: system is too hard -> decrease difficulty, offer encouragement

---

## Appendix A: Data Model Summary

Key entities the frontend needs to track (for state management):

```
User {
  id, name, level, total_xp, current_streak, best_streak,
  streak_freezes_available, last_practice_date,
  confidence_calibration_score, overall_accuracy,
  created_at, settings
}

TopicProgress {
  user_id, topic_id, sub_topic_id,
  mastery_percentage, accuracy, questions_attempted,
  difficulty_level, status (locked/available/in_progress/competent/mastered),
  ease_factor, interval, next_review_date, last_practiced
}

SessionHistory {
  id, user_id, session_type, started_at, completed_at,
  questions_count, correct_count, xp_earned,
  topics_covered[], accuracy, grade (for sims)
}

QuestionAttempt {
  id, user_id, question_id, session_id,
  answer_given, is_correct, partial_credit_score,
  confidence_rating, time_taken, difficulty_at_time,
  feedback_viewed
}

Achievement {
  id, user_id, achievement_type, unlocked_at, progress_current, progress_target
}

DailyLog {
  user_id, date, streak_maintained, questions_answered,
  sessions_completed, xp_earned, daily_challenge_completed,
  daily_challenge_perfect
}

StreakHistory {
  user_id, start_date, end_date, length, freeze_days_used
}
```

## Appendix B: Frontend Implementation Priority

**Phase 1 (MVP):**
- Single question loop with feedback
- Quick Practice and Daily Challenge session types
- Basic XP system and level progression
- Streak tracking (daily counter)
- 3-4 topic categories with MC questions only

**Phase 2:**
- All session types
- Adaptive difficulty algorithm
- Confidence calibration
- Achievement system (first 15 achievements)
- Skill tree (basic view)
- Multiple question formats

**Phase 3:**
- Full skill tree with connections and unlocking
- Interview Simulation with grading
- Weak area detection and recovery
- Complete achievement system
- Spaced repetition
- Real-World Explorer sessions

**Phase 4:**
- Share cards
- Advanced analytics
- Comeback mechanics
- Sound design
- Custom session builder
- Performance benchmarking
