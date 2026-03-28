# Octokeen — Brownfield Project Documentation

> **Generated:** 2026-03-24 | **Scan Level:** Deep | **Project Type:** Web (Monolith)
>
> This document is the single source of truth for AI agents working on this codebase.
> Read this first before exploring the code.

---

## 1. What Is This Project?

**Octokeen** is a Duolingo-style gamified mechanical engineering interview prep web application. It helps mechanical engineers practice core ME topics through structured courses, adaptive practice sessions, and engagement systems (streaks, XP, leagues, quests, achievements, gems).

- **Domain:** EdTech / Engineering interview preparation
- **URL:** https://octokeen.com
- **Monetization:** Freemium SaaS — Free tier (Unit 1 + 5 daily questions) / Pro tier ($9/mo or $79/yr via Paddle)
- **Target Users:** Mechanical engineers preparing for technical interviews

---

## 2. Tech Stack

| Category | Technology | Version | Notes |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 16.2+ | Turbopack for dev, `src/` directory layout |
| **Language** | TypeScript | 5.9+ | Strict mode enabled |
| **React** | React | 19.2+ | Server Components + Client Components |
| **Styling** | Tailwind CSS | 4.2+ | PostCSS plugin, custom design system (no shadcn) |
| **State Management** | Zustand | 5.0+ | 5 stores with `persist` + `subscribeWithSelector` middleware |
| **Database** | PostgreSQL | — | Via `postgres` (postgres.js) driver, Supabase-hosted |
| **ORM** | Drizzle ORM | 0.45+ | Schema-first, `drizzle-kit push` for migrations |
| **Auth** | NextAuth.js v5 | 5.0-beta.30 | Google OAuth + Email/Password credentials, JWT sessions |
| **Payments** | Paddle | — | `@paddle/paddle-js` (client) + `@paddle/paddle-node-sdk` (server) |
| **Analytics** | Mixpanel | — | `mixpanel-browser`, cookie consent gated |
| **Animation** | Framer Motion | 12+ | For celebrations, transitions, engagement UI |
| **Icons** | Lucide React | 0.577+ | — |
| **Data Fetching** | SWR | 2.4+ | Client-side data fetching with caching |
| **Validation** | Zod | 4.3+ | Request/response validation |
| **Testing** | Vitest | 4.1+ | + Testing Library (React), jsdom environment |
| **Fonts** | Nunito + JetBrains Mono | — | via `next/font/google` |

---

## 3. Architecture Overview

### 3.1 Application Structure

```
Monolith: Single Next.js App Router application
├── Server Components (default) — pages, layouts
├── Client Components ('use client') — interactive UI, stores
├── API Route Handlers — /api/* endpoints
├── Middleware — auth-based route protection
└── Static Data Files — course content, achievements, topics
```

### 3.2 Key Architectural Patterns

- **Hybrid State:** Client-side Zustand stores (`persist` to localStorage) synced to server-side PostgreSQL via API routes. The client is the source of truth for sessions; the server is the source of truth for subscriptions, usage limits, and friends.
- **Lazy Course Loading:** Course metadata (~lightweight) loads at startup; full question data (~5 MB with SVG diagrams) loads on-demand per unit via dynamic `import()`.
- **Dual Progress Systems:** `useStore` tracks practice-mode progress (topics, XP, achievements); `useCourseStore` tracks course-mode progress (lessons, stars, streaks). They cross-bridge via `creditPracticeAnswer`.
- **Freemium Gating:** Two-layer enforcement — client-side fast checks (Zustand subscription store) + server-side validation (access-control.ts queries DB). Server always has final authority.
- **Engagement Engine:** Separate `useEngagementStore` manages gems, leagues, quests, streaks, and comeback mechanics — all client-side with server sync via `useDbSync` hook.

### 3.3 Data Flow

```
User Action → Client Component → Zustand Store → localStorage (persist)
                                      ↓
                               useDbSync hook → API Route → Drizzle ORM → PostgreSQL
                                      ↑
                               SWR / fetch ← API Response
```

---

## 4. Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (app)/                    # Authenticated app routes (layout with nav)
│   │   ├── achievements/         # Achievement gallery
│   │   ├── checkout/success/     # Post-payment success
│   │   ├── contact/              # Contact page
│   │   ├── friends/              # Friends list & requests
│   │   ├── league/               # Weekly league board
│   │   ├── onboarding/           # New user onboarding
│   │   ├── practice/             # Practice modes (adaptive, daily, interview, etc.)
│   │   ├── pricing/              # Pricing page
│   │   ├── privacy/              # Privacy policy
│   │   ├── profile/              # User profile
│   │   ├── progress/             # Progress dashboard
│   │   ├── quests/               # Daily/weekly quests
│   │   ├── settings/             # Settings + billing
│   │   ├── shop/                 # Gem shop
│   │   ├── skills/               # Skills/mastery view
│   │   ├── user/[id]/            # Public user profile
│   │   └── page.tsx              # Home (course map)
│   ├── (auth)/                   # Auth routes (separate layout, no nav)
│   │   ├── login/
│   │   └── register/
│   ├── admin/                    # Admin panel (content, users, analytics, feedback)
│   ├── api/                      # API route handlers (see §6)
│   ├── get-started/              # Landing/marketing page for unauthenticated users
│   ├── invite/[code]/            # Invite link handler
│   └── layout.tsx                # Root layout (fonts, providers, SEO, JSON-LD)
│
├── components/
│   ├── calculator/               # Engineering calculator (calcEngine + UI)
│   ├── course/                   # CourseMap, LessonNode, UnitHeader, PracticeCard
│   ├── dev/                      # DebugTierToggle (dev-only)
│   ├── engagement/               # Celebrations, leaderboard, quests, streaks, shop
│   ├── feedback/                 # Content flagging (FlagButton)
│   ├── friends/                  # Friend cards, search, invites
│   ├── landing/                  # LandingPage component
│   ├── layout/                   # DesktopSideNav, MobileBottomNav, Footer
│   ├── lesson/                   # LessonView, QuestionCard, ResultScreen, ProgressBar
│   ├── providers/                # SessionProvider (NextAuth), MixpanelProvider
│   ├── session/                  # SessionView, SessionSummary (practice mode)
│   └── ui/                       # AvatarFrame, CookieConsent, DailyLimitBanner, UpgradeGate/Modal
│
├── data/
│   ├── course/                   # Course content
│   │   ├── course-meta.ts        # Lightweight unit/lesson metadata (no questions)
│   │   ├── index.ts              # Barrel export for full course data
│   │   ├── types.ts              # CourseQuestion, Unit, Lesson, CourseProgress types
│   │   └── units/                # Full unit data files with questions + SVG diagrams
│   │       ├── unit-1-statics.ts
│   │       ├── unit-2-dynamics.ts
│   │       ├── unit-3-strength.ts
│   │       ├── unit-4-thermo.ts
│   │       ├── unit-5-heat.ts
│   │       ├── unit-6-fluids.ts
│   │       ├── unit-7-materials.ts
│   │       ├── unit-7-how-things-work.ts  # "How Things Work" supplemental unit
│   │       ├── unit-8-machine.ts
│   │       ├── unit-9-gdt.ts
│   │       ├── unit-10-interview.ts
│   │       └── htw-L*.ts         # "How Things Work" lesson data files
│   ├── achievements.ts           # Achievement definitions (25+ achievements)
│   ├── blueprints.ts             # Blueprint/schematic data
│   ├── daily-challenges.ts       # Daily challenge configurations
│   ├── engagement-types.ts       # Engagement system type definitions
│   ├── fake-names.ts             # Fake user names for league competitors
│   ├── gem-shop.ts               # Shop item definitions
│   ├── league.ts                 # League tier definitions
│   ├── levels.ts                 # XP → Level progression table
│   ├── mastery.ts                # Mastery system types and calculations
│   ├── quests.ts                 # Quest definitions (daily/weekly)
│   ├── seed-progress.ts          # Demo progress data
│   ├── streak-milestones.ts      # Streak milestone rewards
│   ├── topics.ts                 # Topic definitions with subtopics (11 ME topics)
│   └── types.ts                  # Core type system (Question variants, Progress, etc.)
│
├── hooks/
│   ├── useBackHandler.ts         # Browser back/popstate handling
│   ├── useDbSync.ts              # Syncs client stores → server database
│   └── useSubscription.ts        # Subscription state store + hook
│
├── lib/
│   ├── auth.ts                   # NextAuth configuration (Google + Credentials)
│   ├── auth-utils.ts             # Auth helper functions
│   ├── access-control.ts         # Server-side subscription/usage gating
│   ├── db/
│   │   ├── index.ts              # Drizzle client initialization (postgres.js)
│   │   ├── schema.ts             # Full database schema (18 tables)
│   │   └── friends.ts            # Friend-specific DB queries
│   ├── engagement-init.ts        # Engagement system initialization
│   ├── env.ts                    # Environment variable validation
│   ├── fake-avatar.ts            # Avatar generation for fake competitors
│   ├── fake-user-generator.ts    # Fake league competitor generation
│   ├── league-simulator.ts       # League XP simulation logic
│   ├── mixpanel.ts               # Mixpanel analytics wrapper
│   ├── paddle.ts                 # Paddle server SDK setup
│   ├── paddle-client.ts          # Paddle client-side initialization
│   ├── practice-algorithm.ts     # Adaptive practice question selection
│   ├── pricing.ts                # Pricing tiers, feature flags, limits
│   ├── quest-engine.ts           # Quest selection and progress tracking
│   ├── rate-limit.ts             # Login rate limiting (in-memory)
│   ├── subscription.ts           # Subscription type definitions
│   ├── unitThemes.ts             # Unit color/theme mappings
│   ├── utils.ts                  # Utility functions (shuffleArray, getTodayString, calculateXP)
│   └── validation.ts             # Zod validation schemas
│
├── store/
│   ├── useStore.ts               # Main practice store (progress, sessions, achievements)
│   ├── useCourseStore.ts         # Course progression store (lessons, stars, streaks)
│   ├── useEngagementStore.ts     # Engagement store (gems, leagues, quests, streaks)
│   ├── useFeedbackStore.ts       # Content feedback/flagging store
│   └── useMasteryStore.ts        # Topic mastery tracking store
│
├── __tests__/                    # Test files (Vitest + Testing Library)
│   ├── critical/                 # Critical path tests (achievements, gems, leagues, etc.)
│   ├── data/                     # Data validation tests
│   ├── hooks/                    # Hook tests
│   ├── lib/                      # Library function tests
│   └── store/                    # Store logic tests
│
├── middleware.ts                 # NextAuth middleware for route protection
└── types/
    └── next-auth.d.ts            # NextAuth type augmentation
```

### Non-src files:
```
drizzle/                          # Drizzle migration snapshots
drizzle.config.ts                 # Drizzle Kit configuration
scripts/
  └── seed-content.ts             # Content seeding script
public/                           # Static assets (favicons, manifest, OG images, mascot)
designs/                          # Design assets
```

---

## 5. Database Schema (18 Tables)

### Auth Tables (NextAuth)
| Table | Purpose |
|---|---|
| `users` | User accounts (+ custom: passwordHash, displayName, joinedDate, inviteCode) |
| `accounts` | OAuth provider accounts (Google, etc.) |

### Progress Tables
| Table | Purpose |
|---|---|
| `user_progress` | Main practice progress (XP, streak, achievements, weak/strong areas) |
| `topic_progress` | Per-topic accuracy tracking with subtopic breakdown |
| `session_history` | Practice session records (date, duration, accuracy, XP) |
| `course_progress` | Course-mode progress (completedLessons JSON, streak, XP) |
| `mastery_events` | Individual question answer events for mastery calculation |

### Subscription & Billing Tables
| Table | Purpose |
|---|---|
| `subscriptions` | Paddle subscription state (tier, status, billing interval, trial) |
| `payment_history` | Transaction records (amount, currency, status) |
| `daily_usage` | Daily question count per user (for free-tier limits) |
| `pro_waitlist` | Email waitlist for Pro tier |

### Engagement Tables
| Table | Purpose |
|---|---|
| `gem_transactions` | Gems ledger (amount, source, timestamp) |
| `quest_progress` | Daily/weekly quest state (quests JSON, chest claimed) |
| `league_state` | League tier, weekly XP, competitors JSON |

### Content Tables
| Table | Purpose |
|---|---|
| `course_units` | Unit metadata (title, description, color, icon, order) |
| `course_lessons` | Lesson metadata (title, description, XP reward, order) |
| `course_questions` | Course questions (type, options, answer, explanation, diagram) |
| `practice_questions` | Practice-mode questions (topic, subtopic, difficulty, tags) |

### Social Tables
| Table | Purpose |
|---|---|
| `friendships` | Friend pairs (ordered user_id < friend_id constraint) |
| `friend_requests` | Pending/accepted/declined friend requests |
| `content_feedback` | User-reported content issues |
| `content_feedback_dismissals` | Admin-dismissed feedback items |

---

## 6. API Routes

### Auth
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers (login, callback, session) |
| `/api/auth/register` | POST | Email/password registration |
| `/api/auth/change-password` | POST | Password change |

### Content
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/content/course` | GET | Fetch course structure |
| `/api/content/questions` | GET | Fetch practice questions |
| `/api/content-feedback` | POST | Submit content feedback |

### Progress
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/progress` | GET/POST | Sync user progress (practice store ↔ DB) |
| `/api/course-progress` | GET/POST | Sync course progress |
| `/api/mastery` | GET/POST | Mastery event tracking |
| `/api/session/validate` | POST | Server-side session type validation |

### Subscription (Paddle)
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/paddle/checkout` | POST | Create Paddle checkout session |
| `/api/paddle/subscription` | GET | Get current subscription state |
| `/api/paddle/portal` | POST | Generate Paddle customer portal URL |
| `/api/paddle/webhook` | POST | Paddle webhook handler (subscription events) |

### Social
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/friends` | GET | List friends |
| `/api/friends/[id]` | DELETE | Remove friend |
| `/api/friends/request` | POST | Send friend request |
| `/api/friends/request/[id]` | PATCH/DELETE | Accept/decline friend request |
| `/api/friends/requests` | GET | List pending requests |
| `/api/friends/requests/count` | GET | Get pending request count |
| `/api/friends/weekly-xp` | GET | Friends' weekly XP for leaderboard |
| `/api/invite/code` | GET | Get user's invite code |
| `/api/invite/code/regenerate` | POST | Regenerate invite code |
| `/api/invite/accept` | POST | Accept invite |
| `/api/invite/set-cookie` | POST | Set invite referral cookie |

### User
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/user/profile` | GET/PATCH | Get/update own profile |
| `/api/user/[id]/profile` | GET | Get another user's public profile |
| `/api/user/reset-progress` | POST | Reset all user progress |
| `/api/waitlist` | POST | Join Pro waitlist |

### Admin
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/admin/analytics` | GET | Platform analytics |
| `/api/admin/users` | GET | User management |
| `/api/admin/subscriptions` | GET | Subscription management |
| `/api/admin/grant-pro` | POST | Manually grant Pro access |
| `/api/admin/content/*` | CRUD | Content management (units, lessons, questions) |
| `/api/admin/content-feedback` | GET | View content feedback |
| `/api/admin/content-feedback/dismiss` | POST | Dismiss feedback |

### Analytics
| Endpoint | Method | Purpose |
|---|---|---|
| `/api/mp/[...path]` | POST | Mixpanel proxy (avoids ad blockers) |

---

## 7. Zustand Stores (5 Stores)

| Store | File | localStorage Key | Purpose |
|---|---|---|---|
| `useStore` | `store/useStore.ts` | `octokeen-storage` | Practice progress, sessions, achievements, XP, levels |
| `useCourseStore` | `store/useCourseStore.ts` | `octokeen-course` | Course lessons, stars, completion, streaks |
| `useEngagementStore` | `store/useEngagementStore.ts` | `octokeen-engagement` | Gems, leagues, quests, streak freezes, comeback |
| `useFeedbackStore` | `store/useFeedbackStore.ts` | `octokeen-feedback` | Content flagging state |
| `useMasteryStore` | `store/useMasteryStore.ts` | `octokeen-mastery` | Per-question mastery events |

**Cross-store communication:**
- `useCourseStore.completeLesson()` → reads from `useEngagementStore` (double XP, streak freezes)
- `useCourseStore.creditPracticeAnswer()` ← called by `useStore.answerQuestion()` for course questions
- `useCourseStore.debugSetProgress()` → syncs to `useMasteryStore`, `useStore`, `useEngagementStore`
- `useStore.answerQuestion()` → reads `useEngagementStore` (double XP boost)
- `useSubscriptionStore` (in hooks/) → read by both `useStore` and `useCourseStore` for tier gating

---

## 8. Course Content Structure

### Units (10 core + "How Things Work" supplemental)
| # | Unit ID | Title | Topic |
|---|---|---|---|
| 1 | u1-statics | Statics & Equilibrium | engineering-mechanics |
| 2 | u2-dynamics | Dynamics & Kinematics | engineering-mechanics |
| 3 | u3-strength | Strength of Materials | strength-of-materials |
| 4 | u4-thermo | Thermodynamics | thermodynamics |
| 5 | u5-heat | Heat Transfer | heat-transfer |
| 6 | u6-fluids | Fluid Mechanics | fluid-mechanics |
| 7 | u7-materials | Materials Engineering | materials-engineering |
| 8 | u8-machine | Machine Elements | machine-elements |
| 9 | u9-gdt | GD&T | design-tolerancing |
| 10 | u10-interview | Interview Mastery | (mixed) |
| HTW | u7-htw | How Things Work | real-world-mechanisms |

### Question Types (Course)
- `multiple-choice` — 4 options, one correct
- `true-false` — Boolean answer
- `fill-blank` — Duolingo-style word bank (blanks + wordBank arrays)

### Question Types (Practice — legacy/extended)
11 types including: multiple-choice, two-choice-tradeoff, multi-select, ranking, scenario, spot-the-flaw, estimation, confidence-rated, what-fails-first, design-decision, material-selection

### Content Loading Strategy
1. `course-meta.ts` loads at startup — unit/lesson titles, IDs, icons only (questions: [])
2. Full unit files load on-demand via `loadUnitData(unitIndex)` → dynamic `import()`
3. Full data is ~5 MB due to inline SVG diagrams in questions

---

## 9. Authentication & Authorization

### Auth Flow
- **NextAuth v5** with JWT session strategy (30-day expiry)
- **Providers:** Google OAuth + Email/Password (bcrypt hashed)
- **Middleware:** `src/middleware.ts` protects routes needing auth, redirects unauthenticated users to `/login`
- **Rate Limiting:** In-memory tracking of failed login attempts (`src/lib/rate-limit.ts`)
- **Invite System:** On sign-in callback, checks for `invite_ref` cookie to auto-friend the inviter

### Subscription Gating (Two Layers)
1. **Client-side (fast):** `useSubscriptionStore` checked in store actions (`startSession`, `startLesson`). Prevents UI interaction for non-Pro features.
2. **Server-side (authoritative):** `src/lib/access-control.ts` queries `subscriptions` table. Used by API routes (`/api/session/validate`, etc.).

### Tiers
| Tier | Daily Questions | Units | Practice Modes | Price |
|---|---|---|---|---|
| Free | 5 | Unit 1 only | topic-deep-dive, daily-challenge, real-world, smart-practice | $0 |
| Pro | Unlimited | All 10 | + adaptive, interview-sim, weak-areas | $9/mo or $79/yr |

---

## 10. Engagement Systems

### XP & Levels
- XP earned per question based on correctness, difficulty, time, confidence
- Double XP boost available via gem shop
- Level progression defined in `data/levels.ts`

### Streaks
- Daily streak tracking (practice in consecutive days)
- Streak freezes (Pro only, purchasable with gems)
- Streak repair window after break
- Streak milestones with gem rewards

### Leagues
- Weekly competition tiers (simulated competitors from fake user pool)
- Weekly XP ranking determines promotion/demotion
- Gem rewards for promotion

### Quests
- Daily quests (reset at midnight) + weekly quests (reset Monday)
- Quest types: answer questions, earn XP, maintain streak, etc.
- Treasure chest rewards on completion

### Gems
- Virtual currency earned through gameplay (streaks, quests, leagues, achievements)
- Spent in gem shop on: streak freezes, double XP boosts, cosmetics (titles, avatar frames)
- Full transaction ledger in `gem_transactions` table

### Achievements
- 25+ achievements across 6 categories: Knowledge, Consistency, Challenge, Exploration, Mastery, Hidden
- Checked at session completion via `checkNewAchievements()`
- XP rewards on unlock

---

## 11. Testing

- **Framework:** Vitest 4.1 + Testing Library React + jsdom
- **Test files:** `src/__tests__/` with subdirectories: critical/, data/, hooks/, lib/, store/
- **Critical tests:** Achievement unlocking, gems economy, league system, lesson progression, streak logic, XP calculations
- **Commands:**
  - `npm test` — run all tests
  - `npm run test:watch` — watch mode
  - `npm run test:coverage` — coverage report
- **No E2E tests** currently

---

## 12. Development Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (Next.js + Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run db:push` | Push schema to database (Drizzle Kit) |
| `npm run db:studio` | Open Drizzle Studio (DB browser) |
| `npm test` | Run Vitest tests |

---

## 13. Environment Variables Required

### Auth
- `AUTH_SECRET` — NextAuth secret
- `AUTH_GOOGLE_ID` — Google OAuth client ID
- `AUTH_GOOGLE_SECRET` — Google OAuth client secret

### Database
- `POSTGRES_URL` — PostgreSQL connection string (pooled)
- `POSTGRES_URL_NON_POOLING` — PostgreSQL direct connection (for migrations)

### Payments
- `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` — Paddle client token
- `NEXT_PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID` — Monthly price ID
- `NEXT_PUBLIC_PADDLE_PRO_YEARLY_PRICE_ID` — Yearly price ID
- `PADDLE_API_KEY` — Paddle server API key
- `PADDLE_WEBHOOK_SECRET` — Paddle webhook verification secret
- `NEXT_PUBLIC_PADDLE_ENV` — `sandbox` or `production`

### Analytics
- `NEXT_PUBLIC_MIXPANEL_TOKEN` — Mixpanel project token

### Admin
- `ADMIN_EMAILS` — Comma-separated admin email addresses

---

## 14. Security Configuration

### Next.js Security Headers (next.config.ts)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` with preload
- `Content-Security-Policy` — restricts scripts, styles, images, connections, frames
- `Permissions-Policy` — disables camera, microphone, geolocation
- `poweredByHeader: false`

### Auth Security
- Password hashing via bcrypt
- Login rate limiting (in-memory, per-email)
- JWT sessions (not database sessions)
- Invite friend limit: max 50 friends per user

---

## 15. Key Design Decisions & Gotchas

1. **Client-first architecture:** Most game state lives in localStorage via Zustand persist. Server sync happens via `useDbSync` hook. This means:
   - Clearing browser data = losing local progress
   - Multiple devices won't auto-sync without explicit sync
   - The server DB may lag behind the client

2. **Course data is static TypeScript files**, not database content. The admin panel has CRUD for `course_units`, `course_lessons`, `course_questions` tables, but the actual course is served from `src/data/course/units/*.ts` files. The DB tables are a parallel system (possibly for future dynamic content).

3. **No shadcn/ui** — the UI is custom-built with Tailwind CSS. Components use a custom design system with unit-specific color themes (`lib/unitThemes.ts`).

4. **League competitors are simulated** — `fake-user-generator.ts` creates fake users from a name/avatar pool. The league is single-player with AI opponents, not real multiplayer.

5. **Friendship ordering constraint** — friendships table enforces `user_id < friend_id` via CHECK constraint. The `sortFriendPair()` helper must always be used.

6. **Dual progress stores** — `useStore` (practice) and `useCourseStore` (course) track overlapping but distinct progress. `creditPracticeAnswer` bridges them. Don't update one without considering the other.

7. **Subscription status `past_due`** — treated as active (grace period). Both client and server code handle this identically.

8. **Middleware is NextAuth-based** — uses `auth()` wrapper. Routes needing auth are hardcoded in `authRequiredPrefixes` array.

9. **No i18n** — English only. No localization infrastructure.

10. **SSR guard needed for sessionStorage/localStorage** — Zustand stores with `persist` middleware need SSR guards since they access browser storage.

---

## 16. Codebase Metrics

- **Source files:** ~259 TypeScript/TSX files
- **Total lines:** ~24,000 lines of TypeScript
- **Test files:** ~25 test files across 5 categories
- **Database tables:** 18 tables
- **API routes:** ~35 endpoints
- **Zustand stores:** 5 persisted stores
- **Course units:** 10 core + HTW supplemental
- **Question types:** 3 (course) + 11 (practice/legacy)
- **ME topics:** 11 engineering topics with subtopics
