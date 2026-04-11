> **HISTORICAL DOCUMENT** — This spec was written when Octokeen was a single-course Mechanical Engineering app (codename "MechReady"). The platform is now multi-course. See `docs/courses.md` for active courses and `docs/project-overview.md` for current architecture.

# Mechanical Engineering Interview Prep App - Complete Specification

> **Codename:** MechReady
> **Stack:** Next.js 14+ (App Router) | React 18+ | TypeScript | Tailwind CSS | Zustand | LocalStorage
> **Design Philosophy:** Duolingo's engagement + Brilliant's learning feel + Linear's polish + Stripe's premium quality

---

# PART 1: UX/UI DESIGNER OUTPUTS

---

## 1. Design Language

### 1.1 Color Palette

```
PRIMARY PALETTE
─────────────────────────────────────────────
Primary:          #2563EB  (Royal Blue — actions, progress bars, CTAs)
Primary Hover:    #1D4ED8
Primary Light:    #DBEAFE  (backgrounds, subtle highlights)
Primary Dark:     #1E40AF

Secondary:        #7C3AED  (Violet — accents, premium features, streaks)
Secondary Hover:  #6D28D9
Secondary Light:  #EDE9FE

SEMANTIC COLORS
─────────────────────────────────────────────
Success:          #059669  (Correct answers, mastery)
Success Light:    #D1FAE5
Success Dark:     #047857

Error:            #DC2626  (Wrong answers, critical alerts)
Error Light:      #FEE2E2
Error Dark:       #B91C1C

Warning:          #D97706  (Caution, weak areas)
Warning Light:    #FEF3C7
Warning Dark:     #B45309

Info:             #0891B2  (Tips, hints, neutral info)
Info Light:       #CFFAFE

BACKGROUNDS
─────────────────────────────────────────────
BG Base:          #F8FAFC  (page background — slate-50)
BG Elevated:      #FFFFFF  (cards, modals, surfaces)
BG Subtle:        #F1F5F9  (secondary sections — slate-100)
BG Inset:         #E2E8F0  (input fields, inset areas — slate-200)

SURFACES
─────────────────────────────────────────────
Surface:          #FFFFFF
Surface Hover:    #F8FAFC
Surface Active:   #F1F5F9
Surface Border:   #E2E8F0  (slate-200)

TEXT
─────────────────────────────────────────────
Text Primary:     #0F172A  (slate-900 — headings, body)
Text Secondary:   #475569  (slate-600 — descriptions, labels)
Text Muted:       #94A3B8  (slate-400 — placeholders, disabled)
Text Inverse:     #FFFFFF  (on dark/colored backgrounds)
Text Link:        #2563EB  (matches primary)
```

### Tailwind Config Extensions

```js
// tailwind.config.ts colors
colors: {
  brand: {
    50:  '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',  // PRIMARY
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  accent: {
    50:  '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',  // SECONDARY
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
}
```

### 1.2 Typography

```
FONT FAMILY
─────────────────────────────────────────────
Primary:     Inter (Google Fonts) — clean, geometric, excellent readability
Mono:        JetBrains Mono (Google Fonts) — for equations, code, technical values
Fallback:    system-ui, -apple-system, sans-serif

HEADING SCALE
─────────────────────────────────────────────
h1:  text-3xl  (30px)  font-bold     tracking-tight   line-height: 1.2
h2:  text-2xl  (24px)  font-semibold tracking-tight   line-height: 1.3
h3:  text-xl   (20px)  font-semibold                  line-height: 1.4
h4:  text-lg   (18px)  font-medium                    line-height: 1.4

BODY
─────────────────────────────────────────────
Body:        text-base (16px) font-normal  leading-relaxed (1.625)
Body Small:  text-sm   (14px) font-normal  leading-normal  (1.5)

UTILITY
─────────────────────────────────────────────
Caption:     text-xs   (12px) font-medium  tracking-wide uppercase
Label:       text-sm   (14px) font-medium
Overline:    text-xs   (12px) font-semibold tracking-widest uppercase

FONT WEIGHTS USED
─────────────────────────────────────────────
400 (normal)    — body text
500 (medium)    — labels, emphasis, nav items
600 (semibold)  — headings h2-h4, stats
700 (bold)      — h1, XP numbers, key metrics
```

### Tailwind Font Config

```js
// tailwind.config.ts
fontFamily: {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
}
```

### 1.3 Spacing & Layout

```
BASE UNIT: 4px (Tailwind default)
─────────────────────────────────────────────
Micro:           4px   (space-1)    — icon gaps, inline spacing
Small:           8px   (space-2)    — tight element grouping
Medium:          16px  (space-4)    — standard element spacing
Large:           24px  (space-6)    — section internal padding
XLarge:          32px  (space-8)    — between sections
XXLarge:         48px  (space-12)   — major section breaks
Huge:            64px  (space-16)   — page-level vertical rhythm

CARD PADDING
─────────────────────────────────────────────
Compact Card:    p-4   (16px)
Standard Card:   p-6   (24px)
Spacious Card:   p-8   (32px)

CONTENT WIDTHS
─────────────────────────────────────────────
Narrow:          max-w-2xl  (672px)   — question cards, focused reading
Medium:          max-w-4xl  (896px)   — dashboard content
Wide:            max-w-6xl  (1152px)  — full dashboard with stats
Full:            max-w-7xl  (1280px)  — app shell max width

GRID
─────────────────────────────────────────────
Dashboard:       grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
Stats Row:       grid grid-cols-2 md:grid-cols-4 gap-4
Question Area:   single column, max-w-2xl mx-auto
Sidebar Width:   w-64 (256px) — collapsible to w-16 (64px)
```

### 1.4 Border & Shadow

```
BORDER RADIUS
─────────────────────────────────────────────
Small:     rounded-md    (6px)     — buttons, inputs, badges
Medium:    rounded-lg    (8px)     — cards, dropdowns
Large:     rounded-xl    (12px)    — modals, feature cards
XLarge:    rounded-2xl   (16px)    — hero sections, large panels
Full:      rounded-full            — avatars, circular progress

SHADOWS
─────────────────────────────────────────────
Shadow SM:   shadow-sm
             0 1px 2px 0 rgb(0 0 0 / 0.05)
             → subtle lift for buttons, inputs

Shadow MD:   shadow-md
             0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
             → cards at rest

Shadow LG:   shadow-lg
             0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
             → cards on hover, dropdowns

Shadow XL:   shadow-xl
             0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
             → modals, popups

CARD STYLES
─────────────────────────────────────────────
Default Card:
  bg-white rounded-xl border border-slate-200 shadow-sm
  hover:shadow-md transition-shadow duration-200

Interactive Card:
  bg-white rounded-xl border border-slate-200 shadow-sm
  hover:shadow-lg hover:border-brand-300 transition-all duration-200 cursor-pointer

Selected Card:
  bg-brand-50 rounded-xl border-2 border-brand-600 shadow-md

Correct Card:
  bg-emerald-50 rounded-xl border-2 border-emerald-500 shadow-md

Incorrect Card:
  bg-red-50 rounded-xl border-2 border-red-500 shadow-md
```

### 1.5 Motion & Animation

```
DURATIONS
─────────────────────────────────────────────
Instant:     75ms    — color changes, opacity toggles
Fast:        150ms   — button states, micro-interactions
Normal:      200ms   — card transitions, expand/collapse
Moderate:    300ms   — page transitions, panel slides
Slow:        500ms   — celebration animations, complex transitions

EASING
─────────────────────────────────────────────
Default:     ease-out                 (for most transitions)
Enter:       cubic-bezier(0, 0, 0.2, 1)   — elements appearing
Exit:        cubic-bezier(0.4, 0, 1, 1)    — elements leaving
Bounce:      cubic-bezier(0.34, 1.56, 0.64, 1)  — celebration, XP gain
Spring:      cubic-bezier(0.175, 0.885, 0.32, 1.275) — playful interactions

ANIMATION PRINCIPLES
─────────────────────────────────────────────
1. Correct answer:   Quick green pulse → confetti particles (300ms)
2. Incorrect answer: Subtle shake → red highlight (200ms)
3. XP gain:          Number counter animation + floating "+XP" text (500ms)
4. Level up:         Modal with radial burst + badge reveal (800ms)
5. Streak:           Fire icon pulse animation (loop while active)
6. Card hover:       Translate-y -2px + shadow increase (200ms)
7. Page transition:  Fade in from opacity-0 (200ms)
8. Progress bar:     Width transition with ease-out (500ms)
9. Drag reorder:     Smooth spring physics (300ms)
10. Sidebar toggle:  Width transition + content fade (200ms)

TAILWIND ANIMATION UTILITIES
─────────────────────────────────────────────
transition-all duration-200 ease-out          — default
transition-colors duration-150                — color-only changes
transition-shadow duration-200                — shadow changes
transition-transform duration-200             — movement
animate-pulse                                 — loading states
animate-bounce                                — attention
```

---

## 2. Page Map & Routes

### Complete Route Structure

```
ROUTE                              PURPOSE
─────────────────────────────────────────────────────────────────
/                                  Landing page (→ /dashboard if returning user)
/dashboard                         Main hub — stats, recommendations, quick actions
/practice/adaptive                 AI-driven adaptive practice session
/practice/topic/[topicId]          Practice specific topic (e.g., thermodynamics)
/practice/interview-sim            Timed interview simulation mode
/practice/daily-challenge          Daily challenge (1 per day, streak-based)
/practice/real-world               Real-world scenario-based problems
/practice/weak-areas               Auto-generated from lowest-scoring topics
/question/[questionId]             Standalone question view (shareable)
/session/[sessionId]/summary       Post-session results & review
/progress                          Progress overview dashboard
/progress/skills                   Skill tree / topic mastery map
/progress/analytics                Detailed performance analytics
/achievements                      Badges, milestones, unlocks
/settings                          User preferences, reset data, theme
```

### Page Specifications

#### `/` — Landing Page
**Purpose:** Welcome new users, present value proposition, start practicing immediately.
**Layout:** Full-width hero → features grid → social proof → CTA
**Key Components:**
- Hero section with animated engineering illustrations
- "Start Practicing Now" CTA button (no signup required)
- Feature cards: Adaptive Learning, Interview Sim, Progress Tracking, 500+ Questions
- Topic preview carousel
- If returning user (localStorage has data): auto-redirect to `/dashboard`

**Visual:** Clean white background, centered content max-w-6xl, generous whitespace, hero gradient from brand-50 to white.

---

#### `/dashboard` — Main Hub
**Purpose:** Central command center. Show progress, suggest next actions, motivate.
**Layout:** Sidebar + main content. Main content is a responsive grid.
**Key Components:**
- `StatsOverview` — 4-column stat cards (XP, Level, Streak, Questions Answered)
- `ReadinessScore` — circular progress ring (0-100 interview readiness)
- `DailyChallengeCard` — prominent CTA if not completed today
- `NextRecommendation` — algorithmically suggested next practice
- `WeakAreasCard` — top 3 weakest topics with quick-start buttons
- `RecentActivity` — last 5 sessions timeline
- `TopicMasteryCard` — grid of topic progress rings

**Visual:**
```
┌──────────┬─────────────────────────────────────────┐
│          │  Stats Overview (4 cards in row)         │
│          ├─────────────────────┬───────────────────┤
│ Sidebar  │  Readiness Score    │  Daily Challenge  │
│  (nav)   │  (large ring)       │  (CTA card)       │
│          ├─────────────────────┴───────────────────┤
│          │  Next Recommendation                     │
│          ├─────────────────────┬───────────────────┤
│          │  Weak Areas         │  Recent Activity   │
│          ├─────────────────────┴───────────────────┤
│          │  Topic Mastery Grid                      │
└──────────┴─────────────────────────────────────────┘
```

---

#### `/practice/adaptive` — Adaptive Practice
**Purpose:** Smart question selection based on performance history.
**Layout:** Focused single-column, question-centered.
**Key Components:**
- `SessionHeader` — question count, timer (optional), progress bar, exit button
- `QuestionCard` — renders appropriate question type
- `ConfidenceRating` — pre-answer confidence slider
- Feedback components after submission
- "Next Question" / "End Session" controls

**Behavior:**
- Starts with medium difficulty
- Adjusts based on correctness + confidence calibration
- Prioritizes weak areas with spaced repetition
- Session length: user-configurable (5, 10, 15, 20 questions)

---

#### `/practice/topic/[topicId]` — Topic Practice
**Purpose:** Focused practice on a specific topic/subtopic.
**Layout:** Topic header + question flow (same as adaptive).
**Key Components:**
- Topic header with icon, name, mastery %, question count
- Subtopic selector tabs
- Same question flow as adaptive, but filtered to topic
- Topic completion progress

---

#### `/practice/interview-sim` — Interview Simulation
**Purpose:** Timed, pressured environment mimicking real interviews.
**Layout:** Fullscreen-feeling, minimal chrome, prominent timer.
**Key Components:**
- `SessionHeader` with countdown timer (45 min default)
- Question mix across topics (weighted by interview frequency)
- No immediate feedback (shown at end)
- `QuestionNavigator` — numbered dots to jump between questions
- "Submit Interview" button
- Post-interview: detailed `SessionSummary` with per-question review

**Visual:** Slightly darker background (slate-100), red timer when < 5 min remaining.

---

#### `/practice/daily-challenge` — Daily Challenge
**Purpose:** One curated challenge per day to maintain streaks.
**Layout:** Centered card, celebratory on completion.
**Key Components:**
- Date display + streak counter
- Single question (often scenario-based or estimation)
- Completion celebration animation
- Share result prompt
- Calendar view of past daily challenges

---

#### `/practice/real-world` — Real-World Scenarios
**Purpose:** Complex multi-step engineering scenarios.
**Layout:** Scenario narrative panel + question panel (side-by-side on desktop).
**Key Components:**
- Scenario description with diagrams/images (markdown rendered)
- Multi-part question sequence
- Reference data panel (material properties, formulas)
- Progressive hint system

---

#### `/practice/weak-areas` — Weak Areas Practice
**Purpose:** Targeted practice on lowest-performing topics.
**Layout:** Same as adaptive, with weak areas banner.
**Key Components:**
- List of identified weak areas with scores
- Auto-generated practice session from weak topics
- Before/after comparison on session end

---

#### `/question/[questionId]` — Standalone Question
**Purpose:** View/practice a single question (bookmarkable, shareable).
**Layout:** Centered question card with full explanation.
**Key Components:**
- `QuestionCard` with full metadata (topic, difficulty, type)
- Answer interface
- Full explanation panel (always visible after answering)
- Related questions links

---

#### `/session/[sessionId]/summary` — Session Summary
**Purpose:** Post-session review, learning reinforcement.
**Layout:** Scrollable report with sections.
**Key Components:**
- `SessionSummary` header — score, time, XP earned
- Per-question review cards (expandable)
- Topic performance breakdown (bar chart)
- Key takeaways / concepts to review
- "Practice Again" / "Review Weak Areas" CTAs
- XP + achievement animations

**Visual:**
```
┌─────────────────────────────────────────────┐
│  Session Complete!            Score: 8/10    │
│  ████████████████████░░░░  80%   +240 XP    │
├─────────────────────────────────────────────┤
│  Topic Breakdown                             │
│  Thermo: ███████░  85%                       │
│  Fluids: █████░░░  62%                       │
│  Statics: ████████ 100%                      │
├─────────────────────────────────────────────┤
│  Q1 ✓  Q2 ✓  Q3 ✗  Q4 ✓  ...  (expandable)│
├─────────────────────────────────────────────┤
│  [Review Weak Areas]  [Practice Again]       │
└─────────────────────────────────────────────┘
```

---

#### `/progress` — Progress Overview
**Purpose:** High-level view of all progress metrics.
**Layout:** Dashboard-style grid.
**Key Components:**
- Overall stats (total XP, level, questions answered, time spent)
- Progress chart (last 30 days activity)
- Topic mastery overview (radar/spider chart)
- Recent achievements

---

#### `/progress/skills` — Skill Tree
**Purpose:** Visual map of topic mastery and learning paths.
**Layout:** Full-width interactive tree/grid.
**Key Components:**
- `SkillTreeNode` for each topic — shows mastery level (0-5 stars)
- Visual connections between prerequisite topics
- Lock/unlock states
- Click to drill into subtopics
- Color-coded by mastery level

---

#### `/progress/analytics` — Detailed Analytics
**Purpose:** Deep performance insights.
**Layout:** Multi-section scrollable analytics page.
**Key Components:**
- Accuracy over time (line chart)
- Time per question distribution
- Difficulty progression
- Strongest/weakest topics comparison
- Confidence calibration chart (confidence vs actual accuracy)
- Question type performance breakdown
- Interview readiness trend

---

#### `/achievements` — Achievement Gallery
**Purpose:** Gamification hub, motivation through unlockables.
**Layout:** Grid of achievement cards, categorized.
**Key Components:**
- `AchievementCard` for each achievement
- Categories: Consistency, Mastery, Speed, Exploration, Special
- Locked achievements shown as silhouettes with hints
- Progress bars on partially completed achievements
- Share functionality

---

#### `/settings` — Settings
**Purpose:** User preferences.
**Layout:** Form sections.
**Key Components:**
- Session preferences (default question count, timer settings)
- Difficulty preference
- Topic focus selection
- Data management (export/import JSON, reset progress)
- About / attribution

---

## 3. Component System

### 3.1 Layout Components

#### `AppShell`
```
Props: { children: ReactNode }
Behavior: Wraps entire app. Contains Sidebar (desktop), TopBar (mobile),
          and main content area. Handles responsive layout switching.
Visual:   flex h-screen. Sidebar on left (desktop), bottom nav (mobile).
          Main content scrollable with overflow-y-auto.
Tailwind: flex h-screen bg-slate-50
```

#### `Sidebar`
```
Props: {
  collapsed: boolean;
  onToggle: () => void;
}
Behavior: Desktop navigation. Shows nav items with icons + labels.
          Collapsible to icon-only mode. Highlights active route.
          Shows user level/XP at bottom.
Visual:   w-64 (expanded) / w-16 (collapsed). White bg, right border.
          Nav items: rounded-lg hover:bg-slate-100 with left accent on active.
Items:
  - Dashboard (LayoutDashboard icon)
  - Practice (Play icon) — expandable submenu
  - Progress (BarChart3 icon) — expandable submenu
  - Achievements (Trophy icon)
  - Settings (Settings icon)
  - [Bottom] User level badge + XP bar
Tailwind:
  Container: h-screen bg-white border-r border-slate-200 flex flex-col
             transition-all duration-200
  Nav Item:  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
             text-slate-600 hover:bg-slate-100 hover:text-slate-900
             transition-colors duration-150
  Active:    bg-brand-50 text-brand-700 border-l-2 border-brand-600
```

#### `TopBar`
```
Props: {
  title?: string;
  showBack?: boolean;
  actions?: ReactNode;
}
Behavior: Mobile header. Shows title, back button, and action buttons.
          On desktop: minimal — just breadcrumb + actions.
Visual:   h-14, white bg, bottom border, sticky top-0.
Tailwind: sticky top-0 z-30 h-14 bg-white border-b border-slate-200
          flex items-center justify-between px-4
```

#### `MobileBottomNav`
```
Props: { }
Behavior: Mobile-only (md:hidden). Five-tab bottom navigation.
          Tabs: Home, Practice, Progress, Achievements, Settings.
          Active tab highlighted with brand color.
Visual:   Fixed bottom, white bg, top border, safe area padding.
Tailwind: fixed bottom-0 left-0 right-0 z-40 bg-white border-t
          border-slate-200 flex justify-around items-center h-16
          pb-safe md:hidden
Tab:      flex flex-col items-center gap-0.5 text-xs font-medium
          text-slate-400 active:text-brand-600
```

---

### 3.2 Question Components

#### `QuestionCard`
```
Props: {
  question: Question;          // Union type of all question types
  onAnswer: (answer: Answer) => void;
  onSkip?: () => void;
  showFeedback: boolean;
  isCorrect?: boolean;
  disabled?: boolean;
}
Behavior: Wrapper that renders the correct question type component.
          Shows topic badge, difficulty indicator, question number.
          Handles answer submission and feedback display transitions.
Visual:   White card, rounded-xl, p-6 md:p-8, max-w-2xl mx-auto.
          Question text in text-lg font-medium.
          Topic badge top-left, difficulty dots top-right.
Tailwind: bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8
          max-w-2xl mx-auto w-full
```

#### `MultipleChoiceQuestion`
```
Props: {
  question: MultipleChoiceQuestionType;
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
  showFeedback: boolean;
  correctAnswer?: string;
  disabled?: boolean;
}
Behavior: Displays 4-5 options as selectable cards. Single selection.
          On select: highlight with brand border. On feedback: green/red.
Visual:   Options as vertical list of rounded-lg cards with radio-style
          indicator on left. Gap-3 between options.
Option Tailwind:
  Default:  flex items-center gap-4 p-4 rounded-lg border border-slate-200
            hover:border-brand-300 hover:bg-brand-50 cursor-pointer
            transition-all duration-150
  Selected: border-2 border-brand-600 bg-brand-50
  Correct:  border-2 border-emerald-500 bg-emerald-50
  Wrong:    border-2 border-red-500 bg-red-50
```

#### `TwoChoiceTradeoff`
```
Props: {
  question: TradeoffQuestionType;
  selectedChoice: 'A' | 'B' | null;
  onSelect: (choice: 'A' | 'B') => void;
  showFeedback: boolean;
  disabled?: boolean;
}
Behavior: Two large cards side by side (stacked on mobile).
          "Would you choose A or B?" engineering tradeoff questions.
          Both can be "correct" — feedback explains tradeoffs.
Visual:   Two equal-width cards with "VS" badge between them.
          Selected card gets elevated shadow + brand border.
Tailwind: grid grid-cols-1 md:grid-cols-2 gap-4
Card:     p-6 rounded-xl border-2 border-slate-200 hover:border-brand-400
          hover:shadow-md cursor-pointer transition-all duration-200
          text-center
VS Badge: absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-slate-900 text-white rounded-full w-10 h-10 flex items-center
          justify-center font-bold text-sm z-10
```

#### `MultiSelectQuestion`
```
Props: {
  question: MultiSelectQuestionType;
  selectedOptions: string[];
  onToggle: (optionId: string) => void;
  showFeedback: boolean;
  correctAnswers?: string[];
  disabled?: boolean;
}
Behavior: Like MultipleChoice but allows multiple selections.
          Shows checkbox-style indicators. "Select all that apply" label.
Visual:   Same as MultipleChoice but with square checkboxes instead of
          radio circles. Counter shows "X of Y selected".
Checkbox: w-5 h-5 rounded border-2 border-slate-300
          checked: bg-brand-600 border-brand-600 with check icon
```

#### `RankingQuestion`
```
Props: {
  question: RankingQuestionType;
  currentOrder: string[];
  onReorder: (newOrder: string[]) => void;
  showFeedback: boolean;
  correctOrder?: string[];
  disabled?: boolean;
}
Behavior: Drag-and-drop reordering of items. Shows position numbers.
          On mobile: up/down buttons alongside drag handle.
          Feedback shows correct positions highlighted.
Visual:   Numbered list items with drag handles (grip dots on left).
          Active drag item has shadow-xl and slight scale.
Item Tailwind:
  Default:  flex items-center gap-3 p-4 rounded-lg border border-slate-200
            bg-white cursor-grab active:cursor-grabbing
  Dragging: shadow-xl scale-[1.02] opacity-90 z-50
  Number:   w-8 h-8 rounded-full bg-slate-100 flex items-center
            justify-center text-sm font-semibold text-slate-600
  Correct Position:  bg-emerald-50 border-emerald-300
  Wrong Position:    bg-red-50 border-red-300
```

#### `ScenarioQuestion`
```
Props: {
  question: ScenarioQuestionType;
  answer: Answer | null;
  onAnswer: (answer: Answer) => void;
  showFeedback: boolean;
  disabled?: boolean;
}
Behavior: Long-form scenario with narrative text, possibly with data tables
          or diagrams. Multi-part questions that build on the scenario.
          Can contain sub-questions of any type.
Visual:   Two-panel on desktop: left panel for scenario text (scrollable),
          right panel for question. Single column stacked on mobile.
          Scenario panel has slightly different bg (slate-50).
Tailwind:
  Container: grid grid-cols-1 lg:grid-cols-2 gap-6
  Scenario:  bg-slate-50 rounded-xl p-6 border border-slate-200
             overflow-y-auto max-h-[600px] prose prose-sm
  Question:  bg-white rounded-xl p-6 border border-slate-200
```

#### `FreeTextQuestion`
```
Props: {
  question: FreeTextQuestionType;
  answer: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  showFeedback: boolean;
  modelAnswer?: string;
  disabled?: boolean;
}
Behavior: Open-ended text response. Shows character count.
          Feedback shows model answer for self-assessment.
          User rates own answer (0-5 scale) after seeing model.
Visual:   Large textarea with clean border. Submit button below.
          Model answer in a distinct "Model Answer" card on feedback.
Textarea Tailwind:
  w-full min-h-[150px] p-4 rounded-lg border border-slate-300
  focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
  resize-y text-base leading-relaxed
```

#### `SpotTheFlawQuestion`
```
Props: {
  question: SpotTheFlawQuestionType;
  selectedFlaws: string[];
  onToggleFlaw: (flawId: string) => void;
  showFeedback: boolean;
  disabled?: boolean;
}
Behavior: Presents a design/solution/calculation with intentional flaws.
          User clicks on highlighted/selectable sections to mark flaws.
          Similar to multi-select but within a technical context.
Visual:   "Passage" or diagram with clickable highlighted regions.
          Selected flaws get underline + red highlight.
Flaw Region:
  Default:  px-1 rounded bg-yellow-100 border-b-2 border-yellow-300
            cursor-pointer hover:bg-yellow-200 transition-colors
  Selected: bg-red-100 border-b-2 border-red-500
  Correct:  bg-emerald-100 border-b-2 border-emerald-500
  Missed:   bg-yellow-100 border-b-2 border-yellow-400 animate-pulse
```

#### `EstimationQuestion`
```
Props: {
  question: EstimationQuestionType;
  estimate: number | null;
  unit: string;
  onChange: (value: number) => void;
  onSubmit: () => void;
  showFeedback: boolean;
  disabled?: boolean;
}
Behavior: "Estimate the value of X" — user enters a number.
          Feedback shows acceptable range and how close they were.
          Slider + manual input for order-of-magnitude estimates.
Visual:   Number input with unit label. Optional slider for range.
          Feedback shows a number line with acceptable range highlighted
          and user's answer marked.
Input Tailwind:
  flex items-center gap-2
  Input: w-40 px-4 py-3 rounded-lg border border-slate-300 text-right
         text-lg font-mono focus:border-brand-500
  Unit:  text-lg font-medium text-slate-500
```

#### `ConfidenceRating`
```
Props: {
  value: number;            // 1-5
  onChange: (value: number) => void;
  disabled?: boolean;
}
Behavior: Pre-answer confidence meter. 5 levels: "Guessing" → "Certain".
          Affects XP: higher confidence + correct = more XP.
Visual:   5 selectable pills in a row. Selected pill is filled with
          gradient color (red→yellow→green based on level).
Tailwind:
  Container: flex items-center gap-2
  Pill:      px-3 py-1.5 rounded-full text-xs font-medium border
             cursor-pointer transition-all duration-150
  Unselected: border-slate-300 text-slate-500 hover:border-slate-400
  Selected:   (varies by level) — e.g., level 5: bg-emerald-100
              border-emerald-500 text-emerald-700
Labels: ["Guessing", "Unsure", "Maybe", "Likely", "Certain"]
```

---

### 3.3 Feedback Components

#### `CorrectFeedback`
```
Props: {
  xpEarned: number;
  message?: string;
  confidenceBonus?: number;
}
Behavior: Shown when answer is correct. Brief celebration animation.
          Shows XP earned with floating animation. Auto-transitions
          to explanation after 1.5s or on click.
Visual:   Green banner at top of question card. Checkmark icon with
          scale-in animation. "+XP" floats up and fades.
Tailwind: bg-emerald-50 border border-emerald-200 rounded-lg p-4
          flex items-center gap-3
Icon:     w-8 h-8 rounded-full bg-emerald-500 text-white flex
          items-center justify-center animate-scale-in
```

#### `IncorrectFeedback`
```
Props: {
  correctAnswer: string;
  message?: string;
  xpEarned?: number;   // partial XP for close answers
}
Behavior: Shown when answer is wrong. Subtle shake animation on card.
          Shows what the correct answer was. Encouraging tone.
Visual:   Red banner, X icon. Shows correct answer highlighted in green.
Tailwind: bg-red-50 border border-red-200 rounded-lg p-4
          flex items-center gap-3
```

#### `ExplanationPanel`
```
Props: {
  explanation: string;       // markdown content
  keyPoints: string[];
  commonMistakes?: string[];
  interviewTip?: string;
  relatedTopics?: string[];
}
Behavior: Expandable detailed explanation panel. Always shown after
          answering. Renders markdown. Collapsible sections.
Visual:   Card with sections: "Explanation", "Key Points" (checklist),
          "Common Mistakes" (warning boxes), "Interview Tip" (blue callout).
Tailwind: bg-white rounded-xl border border-slate-200 p-6 space-y-4
Section:  border-l-4 border-brand-500 pl-4
Tip:      bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3
```

#### `InterviewInsight`
```
Props: {
  insight: string;
  frequency: 'common' | 'occasional' | 'rare';
  companies?: string[];
}
Behavior: Shows how this concept appears in real interviews.
Visual:   Accent-colored callout card with briefcase icon.
Tailwind: bg-accent-50 border border-accent-200 rounded-lg p-4
```

#### `ModelAnswer`
```
Props: {
  answer: string;      // markdown
  selfAssessment?: boolean;
  onSelfRate?: (rating: number) => void;
}
Behavior: For free-text questions. Shows ideal answer.
          If selfAssessment: shows 0-5 rating scale for user to self-grade.
Visual:   Distinguished card with "Model Answer" header badge.
Tailwind: bg-slate-50 rounded-xl border border-slate-200 p-6
Badge:    inline-flex items-center px-2 py-0.5 rounded-full text-xs
          font-medium bg-brand-100 text-brand-700
```

#### `KeyPointsChecklist`
```
Props: {
  points: { text: string; covered: boolean }[];
}
Behavior: For free-text self-assessment. User checks off points
          they covered in their answer.
Visual:   Checklist with green checkmarks / empty circles.
Tailwind: space-y-2
Item:     flex items-start gap-3 text-sm
Check:    w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5
          covered: bg-emerald-500 border-emerald-500 text-white
          uncovered: border-slate-300
```

---

### 3.4 Progress & Gamification Components

#### `XPBar`
```
Props: {
  currentXP: number;
  maxXP: number;           // XP needed for next level
  level: number;
  animated?: boolean;
}
Behavior: Shows XP progress toward next level. Animates on XP gain.
          Bar fills with transition. Overflow triggers level-up.
Visual:   Horizontal bar with level badge on left, XP numbers on right.
Tailwind:
  Container: flex items-center gap-3
  Bar BG:    flex-1 h-3 bg-slate-200 rounded-full overflow-hidden
  Bar Fill:  h-full bg-gradient-to-r from-brand-500 to-brand-600
             rounded-full transition-all duration-500 ease-out
  Level:     w-8 h-8 rounded-full bg-brand-600 text-white text-sm
             font-bold flex items-center justify-center
  Numbers:   text-xs font-medium text-slate-500
```

#### `LevelBadge`
```
Props: {
  level: number;
  size: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}
Behavior: Displays user level. Color changes with level tiers.
          1-5: Bronze (amber), 6-10: Silver (slate), 11-20: Gold (yellow),
          21+: Diamond (brand gradient).
Visual:   Circular badge with level number, optional "Level X" label.
Tailwind: (md size)
  w-12 h-12 rounded-full flex items-center justify-center
  font-bold text-lg shadow-md
  Bronze:  bg-gradient-to-br from-amber-400 to-amber-600 text-white
  Silver:  bg-gradient-to-br from-slate-300 to-slate-500 text-white
  Gold:    bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900
  Diamond: bg-gradient-to-br from-brand-400 to-accent-500 text-white
```

#### `StreakCounter`
```
Props: {
  currentStreak: number;
  longestStreak: number;
  isActiveToday: boolean;
}
Behavior: Shows current daily streak. Fire icon animates when active.
          Faded when streak at risk (not active today).
Visual:   Fire icon + number. Glowing effect when streak > 7.
Tailwind:
  Container: flex items-center gap-2
  Fire Icon: text-2xl (🔥 or SVG) — animate-pulse when active
  Number:    text-2xl font-bold text-slate-900
  Label:     text-xs text-slate-500 "day streak"
  At Risk:   opacity-50 with "Complete today!" tooltip
```

#### `TopicMasteryCard`
```
Props: {
  topic: Topic;
  mastery: number;           // 0-100
  questionsAnswered: number;
  totalQuestions: number;
}
Behavior: Shows mastery for one topic. Clickable → topic practice.
Visual:   Card with topic icon, name, progress ring, question count.
Tailwind:
  Card: bg-white rounded-xl border border-slate-200 p-4
        hover:shadow-md hover:border-brand-300 cursor-pointer
        transition-all duration-200
  Ring: w-14 h-14 (SVG circular progress)
```

#### `SkillTreeNode`
```
Props: {
  topic: Topic;
  mastery: 0 | 1 | 2 | 3 | 4 | 5;  // star rating
  locked: boolean;
  prerequisites: string[];
}
Behavior: Single node in the skill tree. Shows mastery stars.
          Locked nodes are grayed out with lock icon.
          Clicking unlocked node → practice that topic.
Visual:   Hexagonal or circular node with topic icon + mastery stars.
Tailwind:
  Unlocked: w-20 h-20 rounded-2xl bg-white border-2 border-slate-200
            shadow-sm flex flex-col items-center justify-center gap-1
            hover:border-brand-400 hover:shadow-md cursor-pointer
  Locked:   opacity-40 grayscale cursor-not-allowed
  Stars:    flex gap-0.5 — filled: text-yellow-400, empty: text-slate-300
```

#### `AchievementCard`
```
Props: {
  achievement: Achievement;
  unlocked: boolean;
  progress?: number;          // 0-100 for progressive achievements
  unlockedAt?: Date;
}
Behavior: Shows achievement with icon, title, description.
          Locked: silhouette with "???" and hint text.
          Progressive: shows progress bar.
Visual:   Card with large icon, title, description, unlock date.
Tailwind:
  Unlocked: bg-white rounded-xl border border-slate-200 p-4
            shadow-sm hover:shadow-md transition-shadow
  Locked:   bg-slate-100 rounded-xl border border-slate-200 p-4
            opacity-60
  Icon:     w-12 h-12 rounded-xl bg-gradient-to-br shadow-md
            flex items-center justify-center text-2xl
```

#### `ProgressRing`
```
Props: {
  value: number;              // 0-100
  size: 'sm' | 'md' | 'lg';  // 40px, 64px, 96px
  strokeWidth?: number;
  color?: string;
  showValue?: boolean;
  label?: string;
}
Behavior: SVG circular progress indicator. Animates on mount.
Visual:   Circular ring, background track in slate-200,
          fill in brand-600 (or color prop). Value text centered.
```

---

### 3.5 Dashboard Components

#### `StatsOverview`
```
Props: {
  totalXP: number;
  level: number;
  streak: number;
  questionsAnswered: number;
}
Behavior: Four stat cards in a row. Each with icon, value, label.
          Animated number counters on mount.
Visual:   Grid of 4 cards, each with colored icon, big number, label.
Tailwind: grid grid-cols-2 md:grid-cols-4 gap-4
Card:     bg-white rounded-xl border border-slate-200 p-4 shadow-sm
          flex flex-col items-center text-center gap-2
Icon:     w-10 h-10 rounded-lg flex items-center justify-center
          (each card has its own icon bg color)
Value:    text-2xl font-bold text-slate-900
Label:    text-sm text-slate-500
```

#### `ReadinessScore`
```
Props: {
  score: number;             // 0-100
  previousScore?: number;
  breakdown: { topic: string; score: number }[];
}
Behavior: Large circular progress showing interview readiness.
          Score breakdown by topic below. Trend indicator.
Visual:   Large ProgressRing (lg) centered. Score in bold inside ring.
          "Interview Ready" label. Breakdown as mini bars below.
Tailwind: bg-white rounded-xl border border-slate-200 p-6 shadow-sm
          flex flex-col items-center gap-4
```

#### `WeakAreasCard`
```
Props: {
  weakAreas: WeakArea[];      // top 3
  onPractice: (topicId: string) => void;
}
Behavior: Shows top 3 weakest topics with accuracy % and quick-start
          practice button for each.
Visual:   Card with list of weak topics, each with colored bar and CTA.
Tailwind: bg-white rounded-xl border border-slate-200 p-6 shadow-sm
Topic:    flex items-center justify-between py-3 border-b last:border-0
Bar:      h-2 rounded-full bg-red-200 — fill: bg-red-500
CTA:      text-sm font-medium text-brand-600 hover:text-brand-700
```

#### `DailyChallengeCard`
```
Props: {
  completed: boolean;
  challenge?: DailyChallenge;
  streak: number;
  onStart: () => void;
}
Behavior: Prominent CTA if not completed. Celebration state if done.
          Shows streak + what's at stake.
Visual:   Gradient border card. Large "Daily Challenge" title.
          If incomplete: pulsing CTA button. If complete: green check + XP.
Tailwind:
  Wrapper: bg-gradient-to-r from-brand-600 to-accent-600 p-[2px]
           rounded-xl
  Inner:   bg-white rounded-[10px] p-6
  CTA:     w-full py-3 rounded-lg bg-brand-600 text-white font-semibold
           hover:bg-brand-700 transition-colors shadow-md
           shadow-brand-600/25
```

#### `NextRecommendation`
```
Props: {
  recommendation: {
    type: 'topic' | 'weakArea' | 'newConcept' | 'review';
    title: string;
    description: string;
    route: string;
    reason: string;
  };
  onStart: () => void;
}
Behavior: AI-suggested next practice based on user history.
          Shows reasoning ("You haven't practiced X in 5 days").
Visual:   Horizontal card with icon, text, and arrow CTA.
Tailwind: bg-brand-50 rounded-xl border border-brand-200 p-5
          flex items-center gap-4 hover:bg-brand-100 cursor-pointer
          transition-colors
```

#### `RecentActivity`
```
Props: {
  sessions: SessionSummary[];  // last 5
}
Behavior: Timeline of recent practice sessions. Each shows date,
          topic, score, XP earned. Clickable → session summary.
Visual:   Vertical timeline with dots and connecting line.
Tailwind: space-y-4
Item:     flex gap-4
Dot:      w-3 h-3 rounded-full bg-brand-500 mt-1.5 flex-shrink-0
Line:     border-l-2 border-slate-200 ml-1.5 (via pseudo-element)
```

---

### 3.6 Session Components

#### `SessionHeader`
```
Props: {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining?: number;       // seconds, for interview sim
  mode: 'practice' | 'interview' | 'daily';
  onExit: () => void;
}
Behavior: Top bar during a practice session. Shows progress, timer,
          exit button. Timer turns red at < 5 min.
Visual:   Sticky top bar with progress bar spanning full width below.
Tailwind: sticky top-0 z-30 bg-white border-b border-slate-200
Progress: h-1 bg-slate-200 — fill: bg-brand-600 transition-all duration-500
Timer:    font-mono text-lg font-semibold
          normal: text-slate-700   warning: text-red-600 animate-pulse
```

#### `SessionSummary`
```
Props: {
  session: SessionResult;
  questions: AnsweredQuestion[];
  xpEarned: number;
  achievements?: Achievement[];
  onReviewQuestion: (questionId: string) => void;
  onPracticeAgain: () => void;
  onGoHome: () => void;
}
Behavior: Full summary page after session. Animated score reveal.
          Per-question expandable review. Topic breakdown chart.
          New achievements showcased. CTA buttons at bottom.
Visual:   Centered scrollable page with celebration header,
          stats grid, question list, and actions.
```

#### `QuestionNavigator`
```
Props: {
  questions: { id: string; answered: boolean; flagged: boolean }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}
Behavior: Numbered dot grid for interview sim. Click to jump.
          Shows answered/unanswered/flagged states.
Visual:   Grid of numbered circles. Row of 10.
Tailwind:
  Grid:      flex flex-wrap gap-2
  Dot:       w-8 h-8 rounded-full flex items-center justify-center
             text-xs font-medium cursor-pointer transition-colors
  Current:   bg-brand-600 text-white
  Answered:  bg-brand-100 text-brand-700
  Unanswered: bg-slate-100 text-slate-500
  Flagged:   bg-yellow-100 text-yellow-700 ring-2 ring-yellow-400
```

---

## 4. Responsive Behavior

### Breakpoints (Tailwind defaults)

```
sm:   640px   — Small tablets
md:   768px   — Tablets (sidebar → bottom nav transition)
lg:   1024px  — Small desktops (scenario side-by-side)
xl:   1280px  — Full desktop
2xl:  1536px  — Large screens (max content width applies)
```

### Mobile Strategy (< 768px)

```
NAVIGATION:
  - Sidebar hidden → MobileBottomNav (5 tabs)
  - TopBar shows page title + back button
  - Hamburger menu for secondary nav items

DASHBOARD:
  - Stats: 2-column grid instead of 4
  - Cards: single column stack
  - ReadinessScore: smaller ring, breakdown below

QUESTIONS:
  - QuestionCard: full-width, p-4 instead of p-6
  - Options: slightly smaller padding (p-3)
  - ScenarioQuestion: stacked (scenario above, question below)
  - RankingQuestion: up/down buttons visible, drag still works
  - TwoChoiceTradeoff: stacked vertically

SESSION:
  - SessionHeader: compact — question count + timer only
  - QuestionNavigator: horizontally scrollable row

PROGRESS:
  - SkillTree: horizontally scrollable
  - Analytics charts: simplified, single column

INTERACTIONS:
  - All hover states also work as active states (touch)
  - Drag-and-drop: uses touch events, larger hit targets
  - Swipe gestures: left/right to navigate questions (optional)
  - Pull-to-refresh on session pages (optional)
```

### Tablet Strategy (768px - 1023px)

```
- Sidebar: collapsed by default (icon-only, w-16)
- Dashboard: 2-column grid
- Questions: centered, max-w-xl
- Scenario: can show side-by-side with narrower panels
```

### Desktop Strategy (1024px+)

```
- Full sidebar expanded (w-64)
- Dashboard: up to 3-column grid
- Questions: centered max-w-2xl with generous whitespace
- Scenario: full side-by-side
- All hover effects active
```

---

# PART 2: FRONTEND ARCHITECT OUTPUTS

---

## 5. Tech Architecture

### Stack Details

```
FRAMEWORK & RENDERING
─────────────────────────────────────────────
Next.js 14.2+       App Router, Server Components by default
React 18.3+         Client Components where needed (interactivity)
TypeScript 5.3+     Strict mode enabled

STYLING
─────────────────────────────────────────────
Tailwind CSS 3.4+   Utility-first, custom design tokens
tailwind-merge      Conditional class merging (cn utility)
clsx                Class name composition
@tailwindcss/typography   For markdown rendering (prose classes)

STATE MANAGEMENT
─────────────────────────────────────────────
Zustand 4.5+        Lightweight, TypeScript-first
zustand/middleware   persist (localStorage), devtools
immer               For complex nested state updates

DRAG & DROP
─────────────────────────────────────────────
@dnd-kit/core       Accessible drag-and-drop for ranking questions
@dnd-kit/sortable   Sortable preset

UTILITIES
─────────────────────────────────────────────
date-fns            Date formatting (lightweight)
nanoid              ID generation (small, fast)
react-markdown      Rendering explanations with markdown
recharts            Charts for analytics (lightweight, React-native)
framer-motion       Animations (celebrations, transitions)
lucide-react        Icon library (tree-shakeable, consistent)

DEV TOOLS
─────────────────────────────────────────────
ESLint              Next.js + TypeScript config
Prettier            Code formatting
```

### Key Architectural Decisions

```
1. NO BACKEND — All data persisted in localStorage via Zustand persist middleware.
   Data can be exported/imported as JSON for backup.

2. SERVER COMPONENTS DEFAULT — Pages are Server Components.
   Interactive elements (questions, forms, charts) wrapped in Client Components.
   Layout components (AppShell, Sidebar) are Client Components (need state).

3. QUESTION CONTENT AS STATIC DATA — All questions stored in typed JSON files
   in src/data/. Loaded at build time. No API calls needed.

4. ADAPTIVE ALGORITHM runs client-side — uses user progress data + question
   metadata to select next question. Implemented in useAdaptive hook.

5. SESSION-BASED PRACTICE — Each practice run creates a Session object.
   Questions are drawn from the pool, answered in sequence, and results
   stored in SessionHistory.

6. GAMIFICATION COMPUTED, NOT STORED — XP, level, achievements derived
   from session history. Computed in hooks/selectors. Only raw data stored.
```

---

## 6. Folder Structure

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (fonts, providers, metadata)
│   ├── page.tsx                      # Landing page (/)
│   ├── globals.css                   # Tailwind imports + custom CSS
│   ├── providers.tsx                 # Client-side providers wrapper
│   │
│   ├── dashboard/
│   │   ├── page.tsx                  # Dashboard page
│   │   └── loading.tsx               # Dashboard skeleton
│   │
│   ├── practice/
│   │   ├── layout.tsx                # Practice session layout (minimal chrome)
│   │   ├── adaptive/
│   │   │   └── page.tsx              # Adaptive practice session
│   │   ├── topic/
│   │   │   └── [topicId]/
│   │   │       └── page.tsx          # Topic-specific practice
│   │   ├── interview-sim/
│   │   │   └── page.tsx              # Interview simulation
│   │   ├── daily-challenge/
│   │   │   └── page.tsx              # Daily challenge
│   │   ├── real-world/
│   │   │   └── page.tsx              # Real-world scenarios
│   │   └── weak-areas/
│   │       └── page.tsx              # Weak areas focused practice
│   │
│   ├── question/
│   │   └── [questionId]/
│   │       └── page.tsx              # Single question view
│   │
│   ├── session/
│   │   └── [sessionId]/
│   │       └── summary/
│   │           └── page.tsx          # Session summary/review
│   │
│   ├── progress/
│   │   ├── page.tsx                  # Progress overview
│   │   ├── skills/
│   │   │   └── page.tsx              # Skill tree
│   │   └── analytics/
│   │       └── page.tsx              # Detailed analytics
│   │
│   ├── achievements/
│   │   └── page.tsx                  # Achievements gallery
│   │
│   └── settings/
│       └── page.tsx                  # Settings page
│
├── components/
│   ├── ui/                           # Base UI primitives
│   │   ├── button.tsx                # Button variants
│   │   ├── card.tsx                  # Card wrapper
│   │   ├── badge.tsx                 # Badge/tag component
│   │   ├── input.tsx                 # Text input
│   │   ├── textarea.tsx              # Textarea
│   │   ├── select.tsx                # Select dropdown
│   │   ├── slider.tsx                # Range slider
│   │   ├── toggle.tsx                # Toggle switch
│   │   ├── tooltip.tsx               # Tooltip
│   │   ├── modal.tsx                 # Modal dialog
│   │   ├── toast.tsx                 # Toast notification
│   │   ├── skeleton.tsx              # Loading skeleton
│   │   ├── progress-bar.tsx          # Linear progress bar
│   │   ├── progress-ring.tsx         # Circular progress (SVG)
│   │   ├── tabs.tsx                  # Tab navigation
│   │   ├── accordion.tsx             # Expandable sections
│   │   └── empty-state.tsx           # Empty state placeholder
│   │
│   ├── layout/                       # App layout components
│   │   ├── app-shell.tsx             # Main layout wrapper
│   │   ├── sidebar.tsx               # Desktop sidebar navigation
│   │   ├── top-bar.tsx               # Top header bar
│   │   ├── mobile-bottom-nav.tsx     # Mobile bottom tab bar
│   │   └── page-header.tsx           # Page title + description header
│   │
│   ├── questions/                    # Question type components
│   │   ├── question-card.tsx         # Universal question wrapper
│   │   ├── multiple-choice.tsx       # Multiple choice (single select)
│   │   ├── two-choice-tradeoff.tsx   # A vs B tradeoff
│   │   ├── multi-select.tsx          # Multiple correct answers
│   │   ├── ranking.tsx               # Drag-to-reorder
│   │   ├── scenario.tsx              # Long-form scenario
│   │   ├── free-text.tsx             # Open-ended text
│   │   ├── spot-the-flaw.tsx         # Find errors in content
│   │   ├── estimation.tsx            # Numerical estimation
│   │   └── confidence-rating.tsx     # Pre-answer confidence
│   │
│   ├── feedback/                     # Answer feedback components
│   │   ├── correct-feedback.tsx      # Correct answer celebration
│   │   ├── incorrect-feedback.tsx    # Wrong answer feedback
│   │   ├── explanation-panel.tsx     # Detailed explanation
│   │   ├── interview-insight.tsx     # Interview relevance callout
│   │   ├── model-answer.tsx          # Model answer for free-text
│   │   └── key-points-checklist.tsx  # Self-assessment checklist
│   │
│   ├── progress/                     # Progress & gamification
│   │   ├── xp-bar.tsx                # XP progress bar
│   │   ├── level-badge.tsx           # Level display badge
│   │   ├── streak-counter.tsx        # Streak display
│   │   ├── topic-mastery-card.tsx    # Topic progress card
│   │   ├── skill-tree-node.tsx       # Skill tree node
│   │   ├── achievement-card.tsx      # Achievement display
│   │   └── readiness-score.tsx       # Interview readiness ring
│   │
│   ├── dashboard/                    # Dashboard-specific components
│   │   ├── stats-overview.tsx        # 4-stat card row
│   │   ├── weak-areas-card.tsx       # Weak areas list
│   │   ├── recent-activity.tsx       # Activity timeline
│   │   ├── daily-challenge-card.tsx  # Daily challenge CTA
│   │   └── next-recommendation.tsx   # AI recommendation
│   │
│   ├── session/                      # Practice session components
│   │   ├── session-header.tsx        # Session top bar (progress, timer)
│   │   ├── session-summary.tsx       # Post-session results
│   │   ├── question-navigator.tsx    # Interview sim question dots
│   │   └── session-config.tsx        # Pre-session config (question count, etc.)
│   │
│   └── charts/                       # Data visualization
│       ├── accuracy-chart.tsx        # Line chart — accuracy over time
│       ├── topic-radar.tsx           # Radar/spider chart — topic coverage
│       ├── activity-heatmap.tsx      # Calendar heatmap — daily activity
│       └── difficulty-chart.tsx      # Bar chart — difficulty distribution
│
├── lib/                              # Utilities and helpers
│   ├── utils.ts                      # cn() helper, general utilities
│   ├── constants.ts                  # App-wide constants
│   ├── adaptive-engine.ts            # Adaptive difficulty algorithm
│   ├── xp-calculator.ts             # XP calculation logic
│   ├── achievement-checker.ts        # Achievement unlock logic
│   ├── readiness-calculator.ts       # Interview readiness score
│   ├── analytics-engine.ts           # Analytics computation
│   ├── question-selector.ts          # Question selection logic
│   ├── spaced-repetition.ts          # Spaced repetition scheduler
│   └── local-storage.ts              # localStorage helpers
│
├── data/                             # Static content data
│   ├── topics.ts                     # Topic definitions & hierarchy
│   ├── questions/                    # Question banks by topic
│   │   ├── index.ts                  # Aggregates all questions
│   │   ├── thermodynamics.ts         # Thermodynamics questions
│   │   ├── fluid-mechanics.ts        # Fluid mechanics questions
│   │   ├── statics.ts               # Statics questions
│   │   ├── dynamics.ts              # Dynamics questions
│   │   ├── materials-science.ts      # Materials science questions
│   │   ├── machine-design.ts         # Machine design questions
│   │   ├── manufacturing.ts          # Manufacturing processes questions
│   │   ├── heat-transfer.ts          # Heat transfer questions
│   │   ├── mechanics-of-materials.ts # Strength of materials questions
│   │   └── engineering-math.ts       # Engineering math questions
│   ├── achievements.ts              # Achievement definitions
│   ├── levels.ts                    # Level thresholds & titles
│   └── daily-challenges.ts          # Pre-defined daily challenges
│
├── store/                            # Zustand state management
│   ├── index.ts                      # Store exports
│   ├── user-store.ts                 # User progress, settings, stats
│   ├── session-store.ts              # Active session state
│   └── ui-store.ts                   # UI state (sidebar, modals, toasts)
│
├── hooks/                            # Custom React hooks
│   ├── use-session.ts                # Practice session flow management
│   ├── use-question.ts               # Question state & answer handling
│   ├── use-progress.ts               # Progress tracking & updates
│   ├── use-adaptive.ts               # Adaptive difficulty algorithm
│   ├── use-timer.ts                  # Countdown timer
│   ├── use-achievements.ts           # Achievement checking & unlocking
│   ├── use-analytics.ts              # Dashboard analytics computation
│   ├── use-daily-challenge.ts        # Daily challenge state
│   ├── use-media-query.ts            # Responsive breakpoint hook
│   └── use-local-storage.ts          # localStorage hook wrapper
│
└── types/                            # TypeScript type definitions
    ├── index.ts                      # Re-exports
    ├── questions.ts                  # Question type interfaces
    ├── topics.ts                     # Topic interfaces
    ├── progress.ts                   # Progress & stats interfaces
    ├── session.ts                    # Session interfaces
    ├── gamification.ts               # XP, levels, achievements
    └── analytics.ts                  # Analytics interfaces
```

---

## 7. Data Model / Schema

### 7.1 Topics

```typescript
// src/types/topics.ts

export interface Topic {
  id: string;                        // e.g., 'thermodynamics'
  name: string;                      // e.g., 'Thermodynamics'
  description: string;
  icon: string;                      // Lucide icon name
  color: string;                     // Tailwind color key, e.g., 'red'
  subtopics: SubTopic[];
  prerequisites: string[];           // topic IDs
  interviewWeight: number;           // 0-1, how often it appears in interviews
  totalQuestions: number;            // total questions available
}

export interface SubTopic {
  id: string;                        // e.g., 'first-law'
  name: string;                      // e.g., 'First Law of Thermodynamics'
  parentTopicId: string;
  description: string;
  questionCount: number;
}
```

### 7.2 Questions

```typescript
// src/types/questions.ts

export type QuestionType =
  | 'multiple-choice'
  | 'two-choice-tradeoff'
  | 'multi-select'
  | 'ranking'
  | 'scenario'
  | 'free-text'
  | 'spot-the-flaw'
  | 'estimation';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface BaseQuestion {
  id: string;                        // nanoid
  type: QuestionType;
  topicId: string;
  subtopicId: string;
  difficulty: Difficulty;
  title: string;                     // Short question title for navigation
  questionText: string;              // Full question (supports markdown)
  explanation: string;               // Detailed explanation (markdown)
  keyPoints: string[];               // Key learning points
  commonMistakes?: string[];         // Common errors students make
  interviewTip?: string;             // How this appears in interviews
  interviewFrequency: 'common' | 'occasional' | 'rare';
  tags: string[];                    // e.g., ['carnot-cycle', 'efficiency']
  timeEstimate: number;              // seconds expected to answer
  xpBase: number;                    // base XP for correct answer (10-50)
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export interface TwoChoiceTradeoffQuestion extends BaseQuestion {
  type: 'two-choice-tradeoff';
  choiceA: {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
  };
  choiceB: {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
  };
  bestChoice: 'A' | 'B' | 'either';  // 'either' if both are valid
  tradeoffExplanation: string;
}

export interface MultiSelectQuestion extends BaseQuestion {
  type: 'multi-select';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;            // why this option is/isn't correct
  }[];
  minCorrect: number;                // minimum correct answers to select
  maxCorrect: number;                // maximum correct answers
}

export interface RankingQuestion extends BaseQuestion {
  type: 'ranking';
  items: {
    id: string;
    text: string;
  }[];
  correctOrder: string[];            // array of item IDs in correct order
  rankingCriteria: string;           // e.g., "Rank by thermal conductivity (highest to lowest)"
  partialCreditThreshold: number;    // how many can be wrong for partial credit (0-items.length)
}

export interface ScenarioQuestion extends BaseQuestion {
  type: 'scenario';
  scenarioText: string;              // Long narrative (markdown)
  scenarioData?: {                   // Optional data tables
    label: string;
    headers: string[];
    rows: string[][];
  }[];
  subQuestions: (
    | Omit<MultipleChoiceQuestion, 'type' | keyof BaseQuestion> & { type: 'multiple-choice' }
    | Omit<FreeTextQuestion, 'type' | keyof BaseQuestion> & { type: 'free-text' }
    | Omit<EstimationQuestion, 'type' | keyof BaseQuestion> & { type: 'estimation' }
  )[];
  // Each sub-question has its own type, text, and answer
}

export interface FreeTextQuestion extends BaseQuestion {
  type: 'free-text';
  modelAnswer: string;               // Ideal answer (markdown)
  keyPointsToHit: {
    id: string;
    point: string;
    weight: number;                  // importance weight 1-5
  }[];
  minLength?: number;                // minimum character count
  maxLength?: number;                // maximum character count
}

export interface SpotTheFlawQuestion extends BaseQuestion {
  type: 'spot-the-flaw';
  content: string;                   // The passage/solution with flaws
  flaws: {
    id: string;
    startIndex: number;              // character index in content
    endIndex: number;
    flawText: string;                // the flawed text
    correction: string;              // what it should be
    explanation: string;             // why it's wrong
  }[];
  distractors?: {                    // sections that look wrong but aren't
    id: string;
    startIndex: number;
    endIndex: number;
    text: string;
    whyCorrect: string;
  }[];
}

export interface EstimationQuestion extends BaseQuestion {
  type: 'estimation';
  correctValue: number;
  unit: string;                      // e.g., 'MPa', 'kW', 'm/s'
  acceptableRange: {
    min: number;
    max: number;
  };
  orderOfMagnitudeCredit: boolean;   // partial credit for right magnitude
  hints?: string[];                  // progressive hints
  referenceValues?: {                // helpful reference data
    label: string;
    value: string;
  }[];
}

// Union type for all questions
export type Question =
  | MultipleChoiceQuestion
  | TwoChoiceTradeoffQuestion
  | MultiSelectQuestion
  | RankingQuestion
  | ScenarioQuestion
  | FreeTextQuestion
  | SpotTheFlawQuestion
  | EstimationQuestion;

// Answer types
export type Answer =
  | { type: 'multiple-choice'; selectedOptionId: string }
  | { type: 'two-choice-tradeoff'; selectedChoice: 'A' | 'B' }
  | { type: 'multi-select'; selectedOptionIds: string[] }
  | { type: 'ranking'; orderedItemIds: string[] }
  | { type: 'scenario'; subAnswers: Answer[] }
  | { type: 'free-text'; text: string; selfRating?: number }
  | { type: 'spot-the-flaw'; selectedFlawIds: string[] }
  | { type: 'estimation'; estimate: number };
```

### 7.3 User Progress

```typescript
// src/types/progress.ts

export interface UserProgress {
  userId: string;                    // generated on first visit
  createdAt: string;                 // ISO date
  lastActiveAt: string;              // ISO date

  // Global stats
  totalXP: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  totalSessionsCompleted: number;
  totalTimeSpent: number;            // seconds

  // Streaks
  currentStreak: number;             // consecutive days
  longestStreak: number;
  lastPracticeDate: string;          // ISO date (YYYY-MM-DD)

  // Per-topic progress
  topicProgress: Record<string, TopicProgress>;

  // Per-question history
  questionHistory: Record<string, QuestionHistory>;

  // Session history
  sessions: SessionRecord[];

  // Daily challenge
  dailyChallenges: Record<string, DailyChallengeRecord>; // keyed by date

  // Achievements
  unlockedAchievements: string[];    // achievement IDs
  achievementProgress: Record<string, number>; // progressive achievement progress

  // Settings
  settings: UserSettings;
}

export interface TopicProgress {
  topicId: string;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;                  // 0-100
  mastery: number;                   // 0-100 (weighted by difficulty + recency)
  lastPracticed: string;             // ISO date
  subtopicProgress: Record<string, SubtopicProgress>;
  difficultyDistribution: {
    easy: { attempted: number; correct: number };
    medium: { attempted: number; correct: number };
    hard: { attempted: number; correct: number };
    expert: { attempted: number; correct: number };
  };
}

export interface SubtopicProgress {
  subtopicId: string;
  questionsAttempted: number;
  questionsCorrect: number;
  accuracy: number;
  mastery: number;
}

export interface QuestionHistory {
  questionId: string;
  attempts: QuestionAttempt[];
  lastAttempted: string;             // ISO date
  nextReviewDate: string;            // ISO date (spaced repetition)
  easeFactor: number;                // SM-2 ease factor (default 2.5)
  interval: number;                  // days until next review
}

export interface QuestionAttempt {
  timestamp: string;                 // ISO date
  answer: Answer;
  isCorrect: boolean;
  confidence: number;                // 1-5
  timeSpent: number;                 // seconds
  xpEarned: number;
  sessionId: string;
}

export interface DailyChallengeRecord {
  date: string;                      // YYYY-MM-DD
  questionId: string;
  completed: boolean;
  isCorrect?: boolean;
  xpEarned?: number;
}

export interface UserSettings {
  defaultSessionLength: number;      // questions per session (5, 10, 15, 20)
  defaultDifficulty: Difficulty | 'adaptive';
  interviewTimerMinutes: number;     // default 45
  showConfidenceRating: boolean;
  showHints: boolean;
  focusTopics: string[];             // topic IDs to prioritize
  soundEnabled: boolean;
}
```

### 7.4 Sessions

```typescript
// src/types/session.ts

export type SessionMode =
  | 'adaptive'
  | 'topic'
  | 'interview-sim'
  | 'daily-challenge'
  | 'real-world'
  | 'weak-areas';

export type SessionStatus = 'configuring' | 'active' | 'paused' | 'completed' | 'abandoned';

export interface SessionConfig {
  mode: SessionMode;
  topicId?: string;                  // for 'topic' mode
  questionCount: number;
  difficulty: Difficulty | 'adaptive';
  timerEnabled: boolean;
  timerDuration?: number;            // seconds
}

export interface Session {
  id: string;                        // nanoid
  config: SessionConfig;
  status: SessionStatus;
  startedAt: string;                 // ISO date
  completedAt?: string;              // ISO date
  currentQuestionIndex: number;
  questions: SessionQuestion[];
  timeRemaining?: number;            // seconds (for timed sessions)
}

export interface SessionQuestion {
  questionId: string;
  answered: boolean;
  flagged: boolean;                  // for interview sim
  answer?: Answer;
  isCorrect?: boolean;
  confidence?: number;
  timeSpent: number;                 // seconds on this question
  xpEarned: number;
}

export interface SessionRecord {
  id: string;
  config: SessionConfig;
  startedAt: string;
  completedAt: string;
  questionsAnswered: number;
  questionsCorrect: number;
  accuracy: number;                  // 0-100
  totalXPEarned: number;
  totalTimeSpent: number;            // seconds
  topicBreakdown: {
    topicId: string;
    questionsAnswered: number;
    questionsCorrect: number;
  }[];
  questions: SessionQuestion[];      // full record for review
}
```

### 7.5 Gamification

```typescript
// src/types/gamification.ts

export interface Level {
  level: number;
  title: string;                     // e.g., "Apprentice Engineer"
  minXP: number;                     // XP threshold for this level
  maxXP: number;                     // XP needed for next level
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export type AchievementCategory =
  | 'consistency'    // Streak, daily challenges
  | 'mastery'        // Topic mastery, difficulty
  | 'speed'          // Quick answers, timed sessions
  | 'exploration'    // Trying all topics, question types
  | 'special';       // Easter eggs, milestones

export interface Achievement {
  id: string;
  name: string;                      // e.g., "Thermodynamics Master"
  description: string;               // How to unlock
  hint: string;                      // Shown when locked
  category: AchievementCategory;
  icon: string;                      // Emoji or icon name
  xpReward: number;                  // XP bonus on unlock
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  condition: AchievementCondition;
}

export type AchievementCondition =
  | { type: 'streak'; days: number }
  | { type: 'totalQuestions'; count: number }
  | { type: 'topicMastery'; topicId: string; mastery: number }
  | { type: 'allTopicsMastery'; mastery: number }
  | { type: 'perfectSession'; questionCount: number }
  | { type: 'totalXP'; xp: number }
  | { type: 'dailyChallengeStreak'; days: number }
  | { type: 'speedAnswer'; seconds: number; difficulty: Difficulty }
  | { type: 'questionTypeExplorer'; typesUsed: number }
  | { type: 'level'; level: number }
  | { type: 'totalSessions'; count: number }
  | { type: 'accuracyAbove'; accuracy: number; minQuestions: number };

export interface XPCalculation {
  base: number;                      // from question.xpBase
  difficultyMultiplier: number;      // easy: 1, medium: 1.5, hard: 2, expert: 3
  confidenceBonus: number;           // high confidence + correct = bonus
  streakMultiplier: number;          // 1 + (streak * 0.1), max 2x
  speedBonus: number;                // answered faster than timeEstimate
  total: number;
}
```

### 7.6 Analytics

```typescript
// src/types/analytics.ts

export interface PerformanceAnalytics {
  // Overall
  overallAccuracy: number;           // 0-100
  interviewReadinessScore: number;   // 0-100

  // Trends (last 30 days)
  dailyActivity: {
    date: string;                    // YYYY-MM-DD
    questionsAnswered: number;
    accuracy: number;
    xpEarned: number;
    timeSpent: number;               // seconds
  }[];

  // Topic performance
  topicPerformance: {
    topicId: string;
    accuracy: number;
    mastery: number;
    questionsAnswered: number;
    averageTimePerQuestion: number;  // seconds
    trend: 'improving' | 'stable' | 'declining';
  }[];

  // Difficulty performance
  difficultyPerformance: {
    difficulty: Difficulty;
    accuracy: number;
    questionsAnswered: number;
    averageTime: number;
  }[];

  // Confidence calibration
  confidenceCalibration: {
    confidenceLevel: number;         // 1-5
    actualAccuracy: number;          // 0-100
    sampleSize: number;
  }[];

  // Weak areas
  weakAreas: WeakArea[];

  // Question type performance
  questionTypePerformance: {
    type: QuestionType;
    accuracy: number;
    questionsAnswered: number;
  }[];
}

export interface WeakArea {
  topicId: string;
  topicName: string;
  subtopicId?: string;
  subtopicName?: string;
  accuracy: number;                  // 0-100
  questionsAttempted: number;
  lastPracticed: string;             // ISO date
  suggestedAction: string;           // e.g., "Review fundamentals"
  priority: 'high' | 'medium' | 'low';
}
```

---

## 8. State Management

### 8.1 User Store

```typescript
// src/store/user-store.ts

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserState {
  // Data
  progress: UserProgress;

  // Actions — Progress
  initializeUser: () => void;
  updateLastActive: () => void;

  // Actions — Questions
  recordAnswer: (
    questionId: string,
    sessionId: string,
    answer: Answer,
    isCorrect: boolean,
    confidence: number,
    timeSpent: number,
    xpEarned: number,
  ) => void;

  // Actions — Sessions
  completeSession: (session: SessionRecord) => void;

  // Actions — XP & Streaks
  addXP: (amount: number) => void;
  updateStreak: () => void;

  // Actions — Daily Challenge
  completeDailyChallenge: (date: string, questionId: string, isCorrect: boolean, xp: number) => void;

  // Actions — Achievements
  unlockAchievement: (achievementId: string) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;

  // Actions — Settings
  updateSettings: (settings: Partial<UserSettings>) => void;

  // Actions — Data Management
  exportData: () => string;          // JSON string
  importData: (json: string) => void;
  resetProgress: () => void;

  // Computed (derived state via selectors)
  getLevel: () => Level;
  getTopicMastery: (topicId: string) => number;
  getWeakAreas: () => WeakArea[];
  getInterviewReadiness: () => number;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      immer((set, get) => ({
        progress: createInitialProgress(),

        // ... implementation
      })),
      {
        name: 'mechready-user-progress',
        version: 1,
      }
    )
  )
);
```

### 8.2 Session Store

```typescript
// src/store/session-store.ts

interface SessionState {
  // Data
  activeSession: Session | null;

  // Actions — Session Lifecycle
  startSession: (config: SessionConfig, questionIds: string[]) => string; // returns sessionId
  endSession: () => SessionRecord;
  abandonSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;

  // Actions — Question Flow
  answerQuestion: (answer: Answer) => void;
  skipQuestion: () => void;
  flagQuestion: () => void;
  navigateToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;

  // Actions — Timer
  updateTimer: (secondsRemaining: number) => void;

  // Computed
  getCurrentQuestion: () => SessionQuestion | null;
  getProgress: () => { current: number; total: number; answered: number };
  isSessionComplete: () => boolean;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    immer((set, get) => ({
      activeSession: null,
      // ... implementation
    }))
  )
);
```

### 8.3 UI Store

```typescript
// src/store/ui-store.ts

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'achievement';
  title: string;
  description?: string;
  duration?: number;               // ms, default 5000
}

interface UIState {
  // Sidebar
  sidebarCollapsed: boolean;
  sidebarOpen: boolean;              // mobile: open/closed
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Modals
  activeModal: string | null;        // modal ID
  modalData: Record<string, unknown>;
  openModal: (id: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  // Loading
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // Achievement celebration
  celebratingAchievement: Achievement | null;
  setCelebratingAchievement: (achievement: Achievement | null) => void;

  // Level up celebration
  levelUpData: { oldLevel: number; newLevel: number } | null;
  setLevelUpData: (data: { oldLevel: number; newLevel: number } | null) => void;
}

export const useUIStore = create<UIState>()(
  devtools((set) => ({
    sidebarCollapsed: false,
    sidebarOpen: false,
    // ... implementation
  }))
);
```

---

## 9. Key Hooks

### `useSession`

```typescript
// src/hooks/use-session.ts

interface UseSessionReturn {
  // State
  session: Session | null;
  currentQuestion: Question | null;
  isActive: boolean;
  isComplete: boolean;
  progress: { current: number; total: number; answered: number };

  // Actions
  startSession: (config: SessionConfig) => void;
  submitAnswer: (answer: Answer, confidence: number) => void;
  skipQuestion: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  flagQuestion: () => void;
  endSession: () => SessionRecord;
  abandonSession: () => void;

  // Feedback state
  showingFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  xpEarned: number;
  dismissFeedback: () => void;
}

/**
 * Manages the complete practice session lifecycle.
 *
 * Flow:
 * 1. startSession(config) → selects questions via useAdaptive/useQuestionSelector
 * 2. Renders currentQuestion
 * 3. submitAnswer(answer, confidence) → evaluates, shows feedback, records progress
 * 4. nextQuestion() → advances to next
 * 5. endSession() → computes summary, records to user store, returns SessionRecord
 *
 * Handles:
 * - Question selection based on mode
 * - Answer evaluation (delegates to question-type-specific logic)
 * - XP calculation
 * - Progress recording
 * - Session completion detection
 */
```

### `useQuestion`

```typescript
// src/hooks/use-question.ts

interface UseQuestionReturn {
  // State
  question: Question;
  answer: Answer | null;
  confidence: number;
  isAnswered: boolean;
  isCorrect: boolean | null;
  timeSpent: number;                 // seconds elapsed

  // Actions
  setAnswer: (answer: Answer) => void;
  setConfidence: (level: number) => void;
  submitAnswer: () => { isCorrect: boolean; xpEarned: number };
  resetQuestion: () => void;

  // Computed
  canSubmit: boolean;                // has valid answer
}

/**
 * Manages state for a single question interaction.
 *
 * - Tracks answer state for any question type
 * - Tracks time spent (auto-timer)
 * - Evaluates correctness based on question type
 * - Computes XP via xp-calculator
 */
```

### `useProgress`

```typescript
// src/hooks/use-progress.ts

interface UseProgressReturn {
  // Overall stats
  totalXP: number;
  level: Level;
  currentStreak: number;
  questionsAnswered: number;

  // Topic progress
  getTopicProgress: (topicId: string) => TopicProgress;
  getTopicMastery: (topicId: string) => number;   // 0-100
  getAllTopicMasteries: () => { topicId: string; mastery: number }[];

  // Interview readiness
  interviewReadiness: number;        // 0-100

  // Weak areas
  weakAreas: WeakArea[];

  // Helpers
  hasCompletedDailyChallenge: (date: string) => boolean;
  getQuestionHistory: (questionId: string) => QuestionHistory | null;
}

/**
 * Read-only hook for accessing user progress data.
 * Computes derived values from the user store.
 * Used by dashboard, progress pages, and session configuration.
 */
```

### `useAdaptive`

```typescript
// src/hooks/use-adaptive.ts

interface UseAdaptiveReturn {
  selectQuestions: (config: {
    mode: SessionMode;
    count: number;
    topicId?: string;
    difficulty?: Difficulty | 'adaptive';
  }) => Question[];

  getNextDifficulty: (
    recentResults: { isCorrect: boolean; difficulty: Difficulty; confidence: number }[]
  ) => Difficulty;
}

/**
 * Adaptive difficulty engine.
 *
 * Algorithm:
 * 1. Start at user's average difficulty level
 * 2. After correct + high confidence → increase difficulty
 * 3. After correct + low confidence → maintain difficulty
 * 4. After incorrect + high confidence → maintain (miscalibrated)
 * 5. After incorrect + low confidence → decrease difficulty
 * 6. Apply spaced repetition: prioritize questions due for review
 * 7. Topic weighting: prioritize weak areas (inversely weighted by mastery)
 * 8. Variety: ensure mix of question types within session
 * 9. No immediate repeats: exclude recently answered questions
 *
 * Question Selection Priority:
 * 1. Spaced repetition due items (highest priority)
 * 2. Weak area questions (weighted by weakness severity)
 * 3. Unseen questions in target difficulty range
 * 4. Random from remaining pool
 */
```

### `useTimer`

```typescript
// src/hooks/use-timer.ts

interface UseTimerReturn {
  // State
  timeRemaining: number;            // seconds
  isRunning: boolean;
  isExpired: boolean;
  isWarning: boolean;                // < 5 minutes remaining

  // Formatted
  displayTime: string;               // "MM:SS" or "HH:MM:SS"

  // Actions
  start: (durationSeconds: number) => void;
  pause: () => void;
  resume: () => void;
  reset: (durationSeconds: number) => void;
  stop: () => void;
}

/**
 * Countdown timer for interview simulation mode.
 * - Ticks every second via setInterval
 * - Persists remaining time in session store
 * - Triggers warning state at configurable threshold (default 5 min)
 * - Calls onExpire callback when time reaches 0
 * - Cleanup on unmount
 */
```

### `useAchievements`

```typescript
// src/hooks/use-achievements.ts

interface UseAchievementsReturn {
  // State
  unlockedAchievements: Achievement[];
  lockedAchievements: Achievement[];
  recentUnlocks: Achievement[];      // unlocked in last session

  // Actions
  checkAchievements: () => Achievement[];  // returns newly unlocked
  getProgress: (achievementId: string) => number; // 0-100

  // Computed
  totalAchievements: number;
  unlockedCount: number;
  completionPercentage: number;
}

/**
 * Achievement checking and unlocking system.
 *
 * Called after:
 * - Each answer submission
 * - Session completion
 * - Streak update
 * - XP milestone
 *
 * Checks all locked achievements against current progress.
 * Triggers celebration UI via UI store when new unlock detected.
 */
```

### `useAnalytics`

```typescript
// src/hooks/use-analytics.ts

interface UseAnalyticsReturn {
  analytics: PerformanceAnalytics;
  isCalculating: boolean;

  // Specific computations
  getAccuracyTrend: (days: number) => { date: string; accuracy: number }[];
  getTopicRadar: () => { topic: string; mastery: number }[];
  getConfidenceCalibration: () => { confidence: number; accuracy: number }[];
  getActivityHeatmap: (days: number) => { date: string; count: number }[];
  getTimePerQuestionTrend: () => { date: string; avgTime: number }[];
  getDifficultyProgression: () => { date: string; avgDifficulty: number }[];
}

/**
 * Computes all analytics from raw session/question history.
 * Memoized heavily — recalculates only when underlying data changes.
 * Used by /progress/analytics page and dashboard widgets.
 */
```

### `useDailyChallenge`

```typescript
// src/hooks/use-daily-challenge.ts

interface UseDailyChallengeReturn {
  todaysChallenge: Question | null;
  isCompleted: boolean;
  streak: number;                    // daily challenge specific streak

  startChallenge: () => void;
  completeChallenge: (answer: Answer, isCorrect: boolean) => void;

  // Calendar data
  getChallengeHistory: (month: number, year: number) => {
    date: string;
    completed: boolean;
    correct?: boolean;
  }[];
}

/**
 * Manages daily challenge state.
 * - Selects a question deterministically based on date (seeded random)
 * - Tracks completion per day
 * - Integrates with streak system
 */
```

### `useMediaQuery`

```typescript
// src/hooks/use-media-query.ts

function useMediaQuery(query: string): boolean;

// Convenience hooks
function useIsMobile(): boolean;     // max-width: 767px
function useIsTablet(): boolean;     // 768px - 1023px
function useIsDesktop(): boolean;    // min-width: 1024px

/**
 * Reactive media query hook for responsive behavior.
 * Updates on window resize. SSR-safe (defaults to false).
 */
```

---

## 10. Routing Structure

### Next.js App Router Layout Hierarchy

```
app/
├── layout.tsx              ← ROOT LAYOUT (html, body, fonts, providers)
│   │                         Server Component
│   │                         - Loads Inter + JetBrains Mono fonts
│   │                         - Wraps in <Providers> (client)
│   │                         - Sets metadata (title, description, OG)
│   │
│   ├── page.tsx            ← LANDING PAGE (/)
│   │                         Server Component
│   │                         - Checks localStorage for returning user (client check)
│   │                         - Hero, features, CTA
│   │
│   ├── (app)/              ← GROUP LAYOUT (dashboard, progress, achievements, settings)
│   │   ├── layout.tsx        Client Component — AppShell wrapper
│   │   │                     - Sidebar (desktop)
│   │   │                     - TopBar
│   │   │                     - MobileBottomNav
│   │   │                     - Main content area with scroll
│   │   │
│   │   ├── dashboard/
│   │   │   ├── page.tsx      Client Component — Dashboard
│   │   │   └── loading.tsx   Skeleton loader
│   │   │
│   │   ├── progress/
│   │   │   ├── page.tsx      Client Component — Progress Overview
│   │   │   ├── skills/
│   │   │   │   └── page.tsx  Client Component — Skill Tree
│   │   │   └── analytics/
│   │   │       └── page.tsx  Client Component — Analytics
│   │   │
│   │   ├── achievements/
│   │   │   └── page.tsx      Client Component — Achievements Gallery
│   │   │
│   │   └── settings/
│   │       └── page.tsx      Client Component — Settings Form
│   │
│   ├── (practice)/         ← GROUP LAYOUT (practice sessions)
│   │   ├── layout.tsx        Client Component — Minimal chrome layout
│   │   │                     - NO sidebar
│   │   │                     - SessionHeader only
│   │   │                     - Full-width content area
│   │   │                     - Exit button → confirm modal → dashboard
│   │   │
│   │   ├── practice/
│   │   │   ├── adaptive/
│   │   │   │   └── page.tsx  Client Component — Adaptive Session
│   │   │   ├── topic/
│   │   │   │   └── [topicId]/
│   │   │   │       └── page.tsx  Client Component — Topic Session
│   │   │   ├── interview-sim/
│   │   │   │   └── page.tsx  Client Component — Interview Sim
│   │   │   ├── daily-challenge/
│   │   │   │   └── page.tsx  Client Component — Daily Challenge
│   │   │   ├── real-world/
│   │   │   │   └── page.tsx  Client Component — Real-World Scenarios
│   │   │   └── weak-areas/
│   │   │       └── page.tsx  Client Component — Weak Areas Session
│   │   │
│   │   ├── question/
│   │   │   └── [questionId]/
│   │   │       └── page.tsx  Client Component — Single Question View
│   │   │
│   │   └── session/
│   │       └── [sessionId]/
│   │           └── summary/
│   │               └── page.tsx  Client Component — Session Summary
│   │
│   └── globals.css           Tailwind imports + custom animations
```

### Layout Component Details

#### Root Layout (`app/layout.tsx`)
```typescript
// Server Component
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'MechReady — Mechanical Engineering Interview Prep',
  description: 'Master mechanical engineering concepts with adaptive practice, interview simulations, and gamified learning.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

#### Providers (`app/providers.tsx`)
```typescript
'use client';

// Wraps children with any client-side providers needed
// Currently: just a passthrough, but ready for toast provider, etc.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
      <AchievementCelebration />
      <LevelUpCelebration />
    </>
  );
}
```

#### App Group Layout (`app/(app)/layout.tsx`)
```typescript
'use client';

// Full app shell with navigation
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}

// AppShell renders:
// - Sidebar (desktop: left side, collapsible)
// - TopBar (always visible)
// - MobileBottomNav (mobile only)
// - Main content area: <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
```

#### Practice Group Layout (`app/(practice)/layout.tsx`)
```typescript
'use client';

// Minimal layout for practice sessions — no sidebar, no bottom nav
export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* SessionHeader rendered by individual pages */}
      <main className="flex-1 flex items-start justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  );
}
```

### Loading & Error States

```
Every route group should have:

loading.tsx — Skeleton UI matching the page layout
  - Dashboard: skeleton stat cards + skeleton content cards
  - Practice: skeleton question card
  - Progress: skeleton charts + skeleton cards

error.tsx — Error boundary
  - Friendly error message
  - "Try Again" button
  - "Go Home" link

not-found.tsx — 404 page
  - "Question not found" / "Session not found"
  - Link back to dashboard
```

### Navigation Flow

```
LANDING (/)
  │
  ├──→ /dashboard (main entry point)
  │     │
  │     ├──→ /practice/adaptive (Start Practice CTA)
  │     ├──→ /practice/topic/[id] (from topic mastery cards)
  │     ├──→ /practice/interview-sim (from nav or dashboard)
  │     ├──→ /practice/daily-challenge (from daily challenge card)
  │     ├──→ /practice/weak-areas (from weak areas card)
  │     ├──→ /progress (from nav)
  │     └──→ /achievements (from nav)
  │
  ├──→ /practice/* (session flow)
  │     │
  │     └──→ /session/[id]/summary (on session complete)
  │           │
  │           ├──→ /dashboard (Go Home)
  │           ├──→ /practice/* (Practice Again)
  │           └──→ /practice/weak-areas (Review Weak Areas)
  │
  └──→ /settings (from nav)
```

---

## Appendix A: Global CSS & Custom Animations

```css
/* src/app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-slate-200;
  }

  body {
    @apply bg-slate-50 text-slate-900;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  /* Safe area padding for mobile bottom nav */
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

@layer components {
  /* Custom animation keyframes */
  @keyframes scale-in {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes float-up {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-20px); opacity: 0; }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  @keyframes confetti-burst {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
    100% { transform: scale(0) rotate(360deg); opacity: 0; }
  }

  @keyframes progress-fill {
    from { width: 0%; }
  }

  @keyframes slide-up {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-scale-in {
    animation: scale-in 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .animate-float-up {
    animation: float-up 500ms ease-out forwards;
  }

  .animate-shake {
    animation: shake 200ms ease-in-out;
  }

  .animate-slide-up {
    animation: slide-up 200ms ease-out forwards;
  }

  .animate-fade-in {
    animation: fade-in 200ms ease-out forwards;
  }

  .animate-progress-fill {
    animation: progress-fill 500ms ease-out forwards;
  }
}
```

## Appendix B: Utility Functions

```typescript
// src/lib/utils.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Generate a nanoid */
export { nanoid } from 'nanoid';

/** Format seconds to MM:SS or HH:MM:SS */
export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/** Format number with commas */
export function formatNumber(n: number): string {
  return n.toLocaleString();
}

/** Get today's date as YYYY-MM-DD */
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

/** Calculate percentage */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

## Appendix C: XP Calculation

```typescript
// src/lib/xp-calculator.ts

import { Difficulty, XPCalculation } from '@/types/gamification';

const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
  easy: 1,
  medium: 1.5,
  hard: 2,
  expert: 3,
};

const CONFIDENCE_BONUSES = [0, 2, 4, 6, 8, 10]; // index = confidence level

export function calculateXP(params: {
  baseXP: number;
  difficulty: Difficulty;
  isCorrect: boolean;
  confidence: number;        // 1-5
  streak: number;
  timeSpent: number;         // seconds
  timeEstimate: number;      // seconds
}): XPCalculation {
  const { baseXP, difficulty, isCorrect, confidence, streak, timeSpent, timeEstimate } = params;

  if (!isCorrect) {
    // Partial XP for attempting
    return {
      base: Math.round(baseXP * 0.1),
      difficultyMultiplier: 1,
      confidenceBonus: 0,
      streakMultiplier: 1,
      speedBonus: 0,
      total: Math.round(baseXP * 0.1),
    };
  }

  const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[difficulty];
  const confidenceBonus = CONFIDENCE_BONUSES[confidence] || 0;
  const streakMultiplier = Math.min(1 + streak * 0.1, 2); // max 2x
  const speedBonus = timeSpent < timeEstimate ? Math.round((1 - timeSpent / timeEstimate) * 10) : 0;

  const total = Math.round(
    (baseXP * difficultyMultiplier + confidenceBonus + speedBonus) * streakMultiplier
  );

  return {
    base: baseXP,
    difficultyMultiplier,
    confidenceBonus,
    streakMultiplier,
    speedBonus,
    total,
  };
}
```

## Appendix D: Level Definitions

```typescript
// src/data/levels.ts

import { Level } from '@/types/gamification';

export const LEVELS: Level[] = [
  { level: 1,  title: 'Freshman',              minXP: 0,      maxXP: 100,    tier: 'bronze' },
  { level: 2,  title: 'Sophomore',             minXP: 100,    maxXP: 250,    tier: 'bronze' },
  { level: 3,  title: 'Junior',                minXP: 250,    maxXP: 500,    tier: 'bronze' },
  { level: 4,  title: 'Senior',                minXP: 500,    maxXP: 850,    tier: 'bronze' },
  { level: 5,  title: 'Graduate',              minXP: 850,    maxXP: 1300,   tier: 'bronze' },
  { level: 6,  title: 'Junior Engineer',       minXP: 1300,   maxXP: 1900,   tier: 'silver' },
  { level: 7,  title: 'Engineer',              minXP: 1900,   maxXP: 2600,   tier: 'silver' },
  { level: 8,  title: 'Senior Engineer',       minXP: 2600,   maxXP: 3500,   tier: 'silver' },
  { level: 9,  title: 'Lead Engineer',         minXP: 3500,   maxXP: 4600,   tier: 'silver' },
  { level: 10, title: 'Staff Engineer',        minXP: 4600,   maxXP: 6000,   tier: 'silver' },
  { level: 11, title: 'Principal Engineer',    minXP: 6000,   maxXP: 7800,   tier: 'gold' },
  { level: 12, title: 'Distinguished Engineer', minXP: 7800,  maxXP: 10000,  tier: 'gold' },
  { level: 13, title: 'Engineering Fellow',    minXP: 10000,  maxXP: 12800,  tier: 'gold' },
  { level: 14, title: 'Chief Engineer',        minXP: 12800,  maxXP: 16200,  tier: 'gold' },
  { level: 15, title: 'VP of Engineering',     minXP: 16200,  maxXP: 20000,  tier: 'gold' },
  { level: 16, title: 'Engineering Director',  minXP: 20000,  maxXP: 25000,  tier: 'gold' },
  { level: 17, title: 'CTO',                   minXP: 25000,  maxXP: 31000,  tier: 'gold' },
  { level: 18, title: 'Engineering Legend',     minXP: 31000,  maxXP: 38000,  tier: 'gold' },
  { level: 19, title: 'Engineering Visionary',  minXP: 38000, maxXP: 46000,  tier: 'gold' },
  { level: 20, title: 'Engineering Titan',      minXP: 46000, maxXP: 55000,  tier: 'gold' },
  { level: 21, title: 'Euler',                  minXP: 55000, maxXP: 65000,  tier: 'diamond' },
  { level: 22, title: 'Newton',                 minXP: 65000, maxXP: 76000,  tier: 'diamond' },
  { level: 23, title: 'Da Vinci',               minXP: 76000, maxXP: 88000,  tier: 'diamond' },
  { level: 24, title: 'Tesla',                  minXP: 88000, maxXP: 101000, tier: 'diamond' },
  { level: 25, title: 'Engineering Deity',      minXP: 101000, maxXP: Infinity, tier: 'diamond' },
];

export function getLevelForXP(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}
```

## Appendix E: Topic Definitions

```typescript
// src/data/topics.ts

import { Topic } from '@/types/topics';

export const TOPICS: Topic[] = [
  {
    id: 'thermodynamics',
    name: 'Thermodynamics',
    description: 'Laws of thermodynamics, cycles, entropy, and energy conversion.',
    icon: 'Flame',
    color: 'red',
    prerequisites: [],
    interviewWeight: 0.15,
    totalQuestions: 60,
    subtopics: [
      { id: 'first-law', name: 'First Law', parentTopicId: 'thermodynamics', description: 'Energy conservation, work, heat.', questionCount: 12 },
      { id: 'second-law', name: 'Second Law', parentTopicId: 'thermodynamics', description: 'Entropy, irreversibility, Carnot.', questionCount: 12 },
      { id: 'power-cycles', name: 'Power Cycles', parentTopicId: 'thermodynamics', description: 'Rankine, Brayton, Otto, Diesel.', questionCount: 15 },
      { id: 'refrigeration', name: 'Refrigeration Cycles', parentTopicId: 'thermodynamics', description: 'Vapor compression, COP.', questionCount: 10 },
      { id: 'thermo-properties', name: 'Properties & States', parentTopicId: 'thermodynamics', description: 'Phase diagrams, ideal gas, steam tables.', questionCount: 11 },
    ],
  },
  {
    id: 'fluid-mechanics',
    name: 'Fluid Mechanics',
    description: 'Fluid statics, dynamics, Bernoulli, pipe flow, turbomachinery.',
    icon: 'Droplets',
    color: 'blue',
    prerequisites: [],
    interviewWeight: 0.15,
    totalQuestions: 55,
    subtopics: [
      { id: 'fluid-statics', name: 'Fluid Statics', parentTopicId: 'fluid-mechanics', description: 'Pressure, buoyancy, manometry.', questionCount: 10 },
      { id: 'fluid-dynamics', name: 'Fluid Dynamics', parentTopicId: 'fluid-mechanics', description: 'Bernoulli, continuity, momentum.', questionCount: 15 },
      { id: 'pipe-flow', name: 'Pipe Flow', parentTopicId: 'fluid-mechanics', description: 'Laminar, turbulent, losses, Moody.', questionCount: 12 },
      { id: 'dimensional-analysis', name: 'Dimensional Analysis', parentTopicId: 'fluid-mechanics', description: 'Buckingham Pi, similitude.', questionCount: 8 },
      { id: 'turbomachinery', name: 'Turbomachinery', parentTopicId: 'fluid-mechanics', description: 'Pumps, turbines, specific speed.', questionCount: 10 },
    ],
  },
  {
    id: 'statics',
    name: 'Statics',
    description: 'Force equilibrium, moments, trusses, frames, friction.',
    icon: 'Triangle',
    color: 'green',
    prerequisites: [],
    interviewWeight: 0.10,
    totalQuestions: 45,
    subtopics: [
      { id: 'equilibrium', name: 'Equilibrium', parentTopicId: 'statics', description: 'Free body diagrams, force balance.', questionCount: 10 },
      { id: 'trusses', name: 'Trusses', parentTopicId: 'statics', description: 'Method of joints, method of sections.', questionCount: 10 },
      { id: 'centroids', name: 'Centroids & Inertia', parentTopicId: 'statics', description: 'Area moments, mass moments.', questionCount: 10 },
      { id: 'friction', name: 'Friction', parentTopicId: 'statics', description: 'Dry friction, wedges, belts.', questionCount: 8 },
      { id: 'frames-machines', name: 'Frames & Machines', parentTopicId: 'statics', description: 'Multi-body analysis.', questionCount: 7 },
    ],
  },
  {
    id: 'dynamics',
    name: 'Dynamics',
    description: "Newton's laws, kinematics, energy methods, vibrations.",
    icon: 'Activity',
    color: 'orange',
    prerequisites: ['statics'],
    interviewWeight: 0.10,
    totalQuestions: 50,
    subtopics: [
      { id: 'kinematics', name: 'Kinematics', parentTopicId: 'dynamics', description: 'Motion analysis, relative motion.', questionCount: 12 },
      { id: 'kinetics', name: 'Kinetics', parentTopicId: 'dynamics', description: "Newton's second law, mass-acceleration.", questionCount: 12 },
      { id: 'work-energy', name: 'Work & Energy', parentTopicId: 'dynamics', description: 'Work-energy theorem, conservation.', questionCount: 10 },
      { id: 'impulse-momentum', name: 'Impulse & Momentum', parentTopicId: 'dynamics', description: 'Linear/angular momentum, collisions.', questionCount: 8 },
      { id: 'vibrations', name: 'Vibrations', parentTopicId: 'dynamics', description: 'Free and forced vibrations, resonance.', questionCount: 8 },
    ],
  },
  {
    id: 'materials-science',
    name: 'Materials Science',
    description: 'Material properties, selection, failure modes, phase diagrams.',
    icon: 'Gem',
    color: 'purple',
    prerequisites: [],
    interviewWeight: 0.12,
    totalQuestions: 50,
    subtopics: [
      { id: 'material-properties', name: 'Material Properties', parentTopicId: 'materials-science', description: 'Stress-strain, hardness, toughness.', questionCount: 12 },
      { id: 'material-selection', name: 'Material Selection', parentTopicId: 'materials-science', description: 'Ashby charts, design criteria.', questionCount: 10 },
      { id: 'failure-modes', name: 'Failure Modes', parentTopicId: 'materials-science', description: 'Fatigue, creep, fracture, corrosion.', questionCount: 12 },
      { id: 'phase-diagrams', name: 'Phase Diagrams', parentTopicId: 'materials-science', description: 'Iron-carbon, binary systems.', questionCount: 8 },
      { id: 'heat-treatment', name: 'Heat Treatment', parentTopicId: 'materials-science', description: 'Annealing, quenching, tempering.', questionCount: 8 },
    ],
  },
  {
    id: 'machine-design',
    name: 'Machine Design',
    description: 'Shafts, bearings, gears, fasteners, springs, factor of safety.',
    icon: 'Cog',
    color: 'slate',
    prerequisites: ['statics', 'materials-science'],
    interviewWeight: 0.12,
    totalQuestions: 50,
    subtopics: [
      { id: 'shaft-design', name: 'Shaft Design', parentTopicId: 'machine-design', description: 'Bending, torsion, combined loading.', questionCount: 10 },
      { id: 'bearings', name: 'Bearings', parentTopicId: 'machine-design', description: 'Selection, life calculation, lubrication.', questionCount: 8 },
      { id: 'gears', name: 'Gears', parentTopicId: 'machine-design', description: 'Spur, helical, bevel, gear trains.', questionCount: 10 },
      { id: 'fasteners', name: 'Fasteners', parentTopicId: 'machine-design', description: 'Bolted joints, preload, fatigue.', questionCount: 8 },
      { id: 'springs', name: 'Springs', parentTopicId: 'machine-design', description: 'Helical, leaf, design calculations.', questionCount: 7 },
      { id: 'factor-of-safety', name: 'Factor of Safety', parentTopicId: 'machine-design', description: 'Design criteria, reliability.', questionCount: 7 },
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing Processes',
    description: 'Machining, casting, forming, joining, additive manufacturing.',
    icon: 'Factory',
    color: 'amber',
    prerequisites: ['materials-science'],
    interviewWeight: 0.08,
    totalQuestions: 45,
    subtopics: [
      { id: 'machining', name: 'Machining', parentTopicId: 'manufacturing', description: 'Turning, milling, drilling, grinding.', questionCount: 10 },
      { id: 'casting', name: 'Casting', parentTopicId: 'manufacturing', description: 'Sand, die, investment casting.', questionCount: 8 },
      { id: 'forming', name: 'Forming', parentTopicId: 'manufacturing', description: 'Rolling, forging, extrusion, drawing.', questionCount: 8 },
      { id: 'joining', name: 'Joining', parentTopicId: 'manufacturing', description: 'Welding, brazing, adhesives.', questionCount: 8 },
      { id: 'additive', name: 'Additive Manufacturing', parentTopicId: 'manufacturing', description: 'FDM, SLA, SLS, DMLS.', questionCount: 6 },
      { id: 'tolerancing', name: 'GD&T', parentTopicId: 'manufacturing', description: 'Geometric dimensioning & tolerancing.', questionCount: 5 },
    ],
  },
  {
    id: 'heat-transfer',
    name: 'Heat Transfer',
    description: 'Conduction, convection, radiation, heat exchangers.',
    icon: 'Thermometer',
    color: 'rose',
    prerequisites: ['thermodynamics'],
    interviewWeight: 0.10,
    totalQuestions: 45,
    subtopics: [
      { id: 'conduction', name: 'Conduction', parentTopicId: 'heat-transfer', description: "Fourier's law, fins, transient.", questionCount: 12 },
      { id: 'convection', name: 'Convection', parentTopicId: 'heat-transfer', description: 'Natural, forced, Nusselt, correlations.', questionCount: 12 },
      { id: 'radiation', name: 'Radiation', parentTopicId: 'heat-transfer', description: 'Stefan-Boltzmann, view factors, shields.', questionCount: 10 },
      { id: 'heat-exchangers', name: 'Heat Exchangers', parentTopicId: 'heat-transfer', description: 'LMTD, NTU, types, design.', questionCount: 11 },
    ],
  },
  {
    id: 'mechanics-of-materials',
    name: 'Mechanics of Materials',
    description: 'Stress, strain, beams, torsion, columns, combined loading.',
    icon: 'Columns3',
    color: 'teal',
    prerequisites: ['statics'],
    interviewWeight: 0.12,
    totalQuestions: 50,
    subtopics: [
      { id: 'stress-strain', name: 'Stress & Strain', parentTopicId: 'mechanics-of-materials', description: 'Axial, shear, thermal, Poisson.', questionCount: 12 },
      { id: 'beam-bending', name: 'Beam Bending', parentTopicId: 'mechanics-of-materials', description: 'Shear/moment diagrams, stress, deflection.', questionCount: 12 },
      { id: 'torsion', name: 'Torsion', parentTopicId: 'mechanics-of-materials', description: 'Circular shafts, power transmission.', questionCount: 8 },
      { id: 'combined-loading', name: 'Combined Loading', parentTopicId: 'mechanics-of-materials', description: "Mohr's circle, principal stresses.", questionCount: 10 },
      { id: 'columns', name: 'Columns & Buckling', parentTopicId: 'mechanics-of-materials', description: 'Euler buckling, effective length.', questionCount: 8 },
    ],
  },
  {
    id: 'engineering-math',
    name: 'Engineering Mathematics',
    description: 'Calculus, differential equations, linear algebra, numerical methods.',
    icon: 'Calculator',
    color: 'indigo',
    prerequisites: [],
    interviewWeight: 0.06,
    totalQuestions: 40,
    subtopics: [
      { id: 'calculus', name: 'Calculus', parentTopicId: 'engineering-math', description: 'Integration, differentiation, series.', questionCount: 10 },
      { id: 'diff-equations', name: 'Differential Equations', parentTopicId: 'engineering-math', description: 'ODEs, PDEs, Laplace transforms.', questionCount: 10 },
      { id: 'linear-algebra', name: 'Linear Algebra', parentTopicId: 'engineering-math', description: 'Matrices, eigenvalues, systems.', questionCount: 10 },
      { id: 'numerical-methods', name: 'Numerical Methods', parentTopicId: 'engineering-math', description: 'Root finding, integration, FEA basics.', questionCount: 10 },
    ],
  },
];
```

## Appendix F: Achievement Definitions (Sample)

```typescript
// src/data/achievements.ts

import { Achievement } from '@/types/gamification';

export const ACHIEVEMENTS: Achievement[] = [
  // CONSISTENCY
  {
    id: 'streak-3',
    name: 'Getting Started',
    description: 'Maintain a 3-day practice streak',
    hint: 'Practice for 3 days in a row',
    category: 'consistency',
    icon: '🔥',
    xpReward: 50,
    rarity: 'common',
    condition: { type: 'streak', days: 3 },
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day practice streak',
    hint: 'Keep the fire burning for a full week',
    category: 'consistency',
    icon: '⚡',
    xpReward: 100,
    rarity: 'uncommon',
    condition: { type: 'streak', days: 7 },
  },
  {
    id: 'streak-30',
    name: 'Iron Will',
    description: 'Maintain a 30-day practice streak',
    hint: 'A month of dedication',
    category: 'consistency',
    icon: '🏆',
    xpReward: 500,
    rarity: 'epic',
    condition: { type: 'streak', days: 30 },
  },

  // MASTERY
  {
    id: 'thermo-master',
    name: 'Thermodynamics Master',
    description: 'Reach 90% mastery in Thermodynamics',
    hint: 'Master the laws of energy',
    category: 'mastery',
    icon: '🔥',
    xpReward: 200,
    rarity: 'rare',
    condition: { type: 'topicMastery', topicId: 'thermodynamics', mastery: 90 },
  },
  {
    id: 'all-topics-50',
    name: 'Renaissance Engineer',
    description: 'Reach 50% mastery in all topics',
    hint: 'A well-rounded engineer',
    category: 'mastery',
    icon: '🌟',
    xpReward: 300,
    rarity: 'rare',
    condition: { type: 'allTopicsMastery', mastery: 50 },
  },
  {
    id: 'perfect-10',
    name: 'Perfect 10',
    description: 'Score 100% on a 10-question session',
    hint: 'Flawless victory',
    category: 'mastery',
    icon: '💎',
    xpReward: 150,
    rarity: 'uncommon',
    condition: { type: 'perfectSession', questionCount: 10 },
  },

  // SPEED
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Answer a hard question correctly in under 30 seconds',
    hint: 'Lightning fast and accurate',
    category: 'speed',
    icon: '⚡',
    xpReward: 100,
    rarity: 'uncommon',
    condition: { type: 'speedAnswer', seconds: 30, difficulty: 'hard' },
  },

  // EXPLORATION
  {
    id: 'type-explorer',
    name: 'Question Connoisseur',
    description: 'Answer every question type at least once',
    hint: 'Try all the flavors',
    category: 'exploration',
    icon: '🧭',
    xpReward: 100,
    rarity: 'uncommon',
    condition: { type: 'questionTypeExplorer', typesUsed: 8 },
  },

  // MILESTONES
  {
    id: 'first-100',
    name: 'Century',
    description: 'Answer 100 questions',
    hint: 'Keep practicing',
    category: 'special',
    icon: '💯',
    xpReward: 100,
    rarity: 'common',
    condition: { type: 'totalQuestions', count: 100 },
  },
  {
    id: 'first-500',
    name: 'Half K',
    description: 'Answer 500 questions',
    hint: 'Halfway to a thousand',
    category: 'special',
    icon: '🎯',
    xpReward: 250,
    rarity: 'rare',
    condition: { type: 'totalQuestions', count: 500 },
  },
  {
    id: 'level-10',
    name: 'Staff Engineer',
    description: 'Reach Level 10',
    hint: 'Climb the ranks',
    category: 'special',
    icon: '🏅',
    xpReward: 200,
    rarity: 'rare',
    condition: { type: 'level', level: 10 },
  },
  {
    id: 'level-20',
    name: 'Engineering Titan',
    description: 'Reach Level 20',
    hint: 'Only the most dedicated reach this height',
    category: 'special',
    icon: '👑',
    xpReward: 500,
    rarity: 'legendary',
    condition: { type: 'level', level: 20 },
  },
  {
    id: 'accuracy-90',
    name: 'Precision Engineer',
    description: 'Maintain 90%+ accuracy over 50 questions',
    hint: 'Accuracy above all',
    category: 'mastery',
    icon: '🎯',
    xpReward: 200,
    rarity: 'rare',
    condition: { type: 'accuracyAbove', accuracy: 90, minQuestions: 50 },
  },
];
```

---

*End of Specification*
