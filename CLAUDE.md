# Octokeen — Project Instructions

## First Steps
Before making changes, read `docs/project-overview.md` for full project context (tech stack, architecture, database schema, API routes, stores, content structure, auth, engagement systems, gotchas). This saves significant exploration time.

## Key Facts
- **Next.js 16 App Router** with Turbopack, TypeScript strict mode, React 19
- **Zustand 5** with 5 persisted stores (localStorage). Cross-store dependencies exist — see §7 in project-overview.md
- **Drizzle ORM** with PostgreSQL (18 tables). Schema at `src/lib/db/schema.ts`
- **NextAuth v5** (Google + Credentials). Config at `src/lib/auth.ts`
- **Paddle** for payments. Two-layer subscription gating (client Zustand + server access-control.ts)
- **Tailwind CSS 4** with custom design system — no shadcn/ui
- **Course content** is static TypeScript files in `src/data/course/professions/`, NOT from DB. See `docs/courses.md` for active courses (sourced from `src/data/professions.ts`)
- **Vitest** for testing. Run `npm test` before committing

## Content Writing
- **Read `docs/content-writing-guide.md` before writing or editing any course content.** It defines tone, structure, question formatting, and banned patterns.
- After changing content, always re-run the seed: `npx tsx scripts/seed-content.ts`

## Modal Gallery
- **Every new screen, modal, or overlay must be added to `modal-gallery.html`** so all UI states are catalogued in one place. After building a new screen, add a corresponding entry to the gallery file.

## UI Components
- **Always check `src/components/ui/` for existing reusable components before writing inline UI.** Key components:
  - `PageHeader` — sticky header with back button, title, subtitle, icon
  - `UserAvatar` — avatar circle with image or initials fallback
  - `LeaderboardRow` — rank + avatar + name + XP display
  - `EmptyState` — centered icon + title + subtitle + optional CTA
  - `ErrorRetry` — error card with retry button
  - `LoadingSpinner` — centered spinner, with or without card wrapper
  - `TabToggle` — two-or-more-button tab switcher with optional badge
  - `ProgressBar` — animated fill bar with auto-coloring
  - `AnimatedCounter`, `GameButton`, `HeartDisplay`, `UpgradeGate`, `CoinIcon`, `GlossaryText` -- inline text with auto-detected glossary term popovers
- **When building new UI, look for repeated patterns.** If you're about to copy-paste similar markup across files, extract it into a component in `src/components/ui/` instead.
- CSS utility classes (`card`, `card-hover`, `btn-primary`, `btn-secondary`, `badge-*`, `stat-card`, `progress-bar`) are defined in `globals.css` — use them before writing one-off styles.

## Common Gotchas
- Dual progress stores: `useStore` (practice) and `useCourseStore` (course) — update both when needed
- Friendships table has CHECK constraint: `user_id < friend_id` — always use `sortFriendPair()`
- Course data loads lazily (~5MB with SVG diagrams) — `course-meta.ts` is lightweight metadata only
- SSR guard needed for any code touching sessionStorage/localStorage
- League competitors are a hybrid of real users and simulated bots (bots backfill when not enough real users)
