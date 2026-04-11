# Content Overview Admin Dashboard — Design Spec

## Goal

Add a "Content" overview tab to the admin panel that surfaces content health, quality, and completeness at a glance — so broken questions, missing audio, and quality outliers are caught without running CLI scripts or guessing.

## Context

- 4 courses: ME (1,700 Qs), Personal Finance (1,352 Qs), Psychology (657 Qs), Space & Astronomy (644 Qs) — ~4,353 total questions
- `scripts/qa-content.ts` already runs 14 static checks (em dashes, required fields, item counts, etc.) but only via CLI
- `masteryEvents` table tracks every answer: `questionId`, `correct`, `topicId`, `difficulty`, `answeredAt`
- `contentFeedback` table stores user-reported issues per question
- TTS audio files live in `public/audio/tts/{lessonId}/`. Only Personal Finance has audio (~409 folders). Psychology, Space, ME have ~0
- Existing admin has 6 tabs: Feedback, Analytics, Users, Content (editor), Subs, Flags

## Architecture

### Route & Navigation

- New admin page at `/admin/content-overview`
- Add "Overview" tab to admin layout nav (before the existing "Content" editor tab)
- Server-side API route at `/api/admin/content-overview` that computes all static analysis + aggregates DB data
- Page is a client component that fetches from the API on load

### API Response Shape

```ts
interface ContentOverviewData {
  courses: CourseOverview[];
  qaViolations: QAViolation[];
  audioCoverage: AudioCoverage[];
  questionQuality: QuestionQuality[];
  userReports: UserReport[];
  distribution: ContentDistribution;
}
```

## Sections

### 1. Course Health Summary

Top-level cards, one per course. Each card shows:

| Field | Source |
|-------|--------|
| Course name + icon | `professions.ts` |
| Units / Lessons / Questions count | Static content files |
| QA violations count | Static analysis (same 14 checks as `qa-content.ts`) |
| Audio coverage % | File system scan vs content card count |
| User-reported issues count | `contentFeedback` table (non-dismissed) |
| Status badge | Green (0 violations, >80% audio) / Yellow (1-5 violations or 50-80% audio) / Red (>5 violations or <50% audio) |

Clicking a course card scrolls to / filters the sections below for that course.

### 2. QA Violations

Port the 14 checks from `qa-content.ts` into a shared module (`src/lib/content-qa.ts`) so both the CLI script and the API route can use the same logic.

Display as a table:

| Column | Description |
|--------|-------------|
| Severity | Error (broken question) vs Warning (style issue) |
| Check | e.g. "CHECK 14: correctIndex out of bounds" |
| Course | Which course |
| Location | Unit > Lesson > Question ID |
| Detail | Human-readable violation message |

**Severity classification:**
- **Error** (red): CHECK 6 (duplicate IDs), CHECK 7/8/9 (wrong item counts), CHECK 13 (missing required fields), CHECK 14 (correctIndex OOB)
- **Warning** (yellow): CHECK 1 (em dashes), CHECK 2 (answer bias), CHECK 3 (teaching card count), CHECK 4/5 (teaching card format), CHECK 10/11 (lesson type constraints), CHECK 12 (long options)

Filterable by course and severity. Sorted errors-first.

### 3. Audio Coverage

Per-course breakdown showing:

| Field | How computed |
|-------|-------------|
| Total cards needing audio | Count all questions + teaching cards in content files |
| Expected files | Teaching cards = 1 file (`{id}.ogg`), Questions = 2 files (`{id}-q.ogg`, `{id}-exp.ogg`) |
| Actual files | Scan `public/audio/tts/` directories |
| Coverage % | actual / expected |

Drill-down: expandable per-unit rows showing which lessons are missing audio entirely vs partially covered.

Color coding: green (100%), yellow (partial), red (0%).

### 4. Question Quality (Live Data)

Query `masteryEvents` aggregated per question:

| Metric | Flag threshold | What it means |
|--------|---------------|---------------|
| Accuracy rate | <30% | Possibly broken, confusing, or incorrectly keyed |
| Accuracy rate | >95% | Trivially easy — not teaching anything |
| Attempt count | 0 | Dead content nobody has reached |
| User reports | >0 | From `contentFeedback` — show reason + comment |

Display as a sortable table: Question ID, Type, Course > Unit > Lesson, Accuracy %, Attempts, Reports.

**Minimum attempts threshold**: Only flag accuracy outliers for questions with >=10 attempts (avoid noise from low sample sizes).

Default sort: worst accuracy first. Filterable by course and flag type.

### 5. Content Distribution

Summary stats to spot structural imbalances:

**Question type breakdown** — per course, show count and % for each of the 14 question types. Flag if any single type exceeds 40% of a course (over-reliance on one format).

**Teaching card ratio** — per lesson, flag if 0 teaching cards (no instruction before questions) or >3 (too much reading). Show as a list of violating lessons.

**correctIndex position bias** — for MC questions per course, show distribution of correct answer positions (A/B/C/D). Flag if any position >35% (students learn to guess).

## Implementation Notes

### Shared QA module

Extract check logic from `scripts/qa-content.ts` into `src/lib/content-qa.ts`:

```ts
export interface QAViolation {
  check: string;        // "CHECK 1", "CHECK 14", etc.
  severity: 'error' | 'warning';
  questionId: string;
  courseId: string;
  unitTitle: string;
  lessonTitle: string;
  message: string;
}

export function runContentQA(courses: LoadedCourse[]): QAViolation[];
```

The CLI script (`scripts/qa-content.ts`) imports from this module and formats for terminal output. The API route imports it and returns JSON.

### Audio scan

File system scan at API request time. Since this is admin-only and infrequent, performance is acceptable. Scan `public/audio/tts/` directory, group by lesson ID prefix, compare against content file card IDs.

### DB queries

For question quality, aggregate `masteryEvents`:

```sql
SELECT question_id,
       COUNT(*) as attempts,
       COUNT(*) FILTER (WHERE correct) as correct_count,
       ROUND(COUNT(*) FILTER (WHERE correct)::numeric / COUNT(*) * 100, 1) as accuracy_pct
FROM mastery_events
GROUP BY question_id
```

Join with `contentFeedback` for user reports.

### Caching

No caching needed — this is an admin-only page loaded on demand. If performance becomes an issue later, add a simple in-memory cache with 5-minute TTL.

## Out of Scope

- Editing/fixing content from this page (that's what the existing Content editor tab is for)
- Per-user question analytics (that's the Analytics tab)
- Automated content fixing or AI-powered suggestions
- Historical trend tracking (e.g. "violations over time")

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/lib/content-qa.ts` | Create — shared QA check logic |
| `scripts/qa-content.ts` | Modify — import from shared module |
| `src/app/api/admin/content-overview/route.ts` | Create — API endpoint |
| `src/app/(app)/admin/content-overview/page.tsx` | Create — dashboard UI |
| `src/app/(app)/admin/layout.tsx` | Modify — add Overview tab |
