# MechReady — Project Instructions

## First Steps
Before making changes, read `docs/project-overview.md` for full project context (tech stack, architecture, database schema, API routes, stores, content structure, auth, engagement systems, gotchas). This saves significant exploration time.

## Key Facts
- **Next.js 16 App Router** with Turbopack, TypeScript strict mode, React 19
- **Zustand 5** with 5 persisted stores (localStorage). Cross-store dependencies exist — see §7 in project-overview.md
- **Drizzle ORM** with PostgreSQL (18 tables). Schema at `src/lib/db/schema.ts`
- **NextAuth v5** (Google + Credentials). Config at `src/lib/auth.ts`
- **Paddle** for payments. Two-layer subscription gating (client Zustand + server access-control.ts)
- **Tailwind CSS 4** with custom design system — no shadcn/ui
- **Course content** is static TypeScript files in `src/data/course/units/`, NOT from DB
- **Vitest** for testing. Run `npm test` before committing

## Common Gotchas
- Dual progress stores: `useStore` (practice) and `useCourseStore` (course) — update both when needed
- Friendships table has CHECK constraint: `user_id < friend_id` — always use `sortFriendPair()`
- Course data loads lazily (~5MB with SVG diagrams) — `course-meta.ts` is lightweight metadata only
- SSR guard needed for any code touching sessionStorage/localStorage
- League competitors are simulated (fake users), not real multiplayer
