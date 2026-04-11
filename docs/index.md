# Octokeen — Project Documentation Index

> **Generated:** 2026-03-24 | **Scan Level:** Deep | **Mode:** Initial Scan

## Project Overview
- **Type:** Monolith (Next.js 16 App Router)
- **Primary Language:** TypeScript
- **Architecture:** Hybrid client-server with Zustand + PostgreSQL
- **Domain:** Gamified multi-profession interview prep (EdTech SaaS)

## Quick Reference
- **Framework:** Next.js 16.2+ (Turbopack)
- **Database:** PostgreSQL via Drizzle ORM (Supabase-hosted)
- **Auth:** NextAuth v5 (Google + Credentials)
- **Payments:** Paddle
- **State:** Zustand (5 stores, localStorage persisted)
- **Entry Point:** `src/app/layout.tsx`

## Documentation

### Active
- [Project Overview (Brownfield Doc)](./project-overview.md) — Comprehensive project context for AI agents
- [Active Courses](./courses.md) — Current course list (single source of truth, mirrors `src/data/professions.ts`)
- [Content Writing Guide](./content-writing-guide.md) — Tone, structure, and formatting for course content
- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) — Design system documentation

### Historical (ME-era, kept for reference only)
These docs were written when Octokeen was a single-course Mechanical Engineering app. They no longer reflect the current multi-course platform.
- [SPECIFICATION.md](../SPECIFICATION.md) — Original ME product specification
- [PRODUCT_AND_COACHING_STRATEGY.md](../PRODUCT_AND_COACHING_STRATEGY.md) — Original ME product strategy
- [COMPETITIVE_ANALYSIS.md](../COMPETITIVE_ANALYSIS.md) — ME-era competitive analysis
- [COMPETITOR_ANALYSIS.md](../COMPETITOR_ANALYSIS.md) — ME-era competitor analysis
- [AUDIT-REPORT.md](../AUDIT-REPORT.md) — Codebase audit (March 2026, ME-era)
- [mechanical_engineering_content_framework.md](../mechanical_engineering_content_framework.md) — ME content framework

## Getting Started
1. Copy `.env.local.example` to `.env.local` and fill in credentials
2. `npm install`
3. `npm run db:push` (push schema to database)
4. `npm run dev` (start dev server with Turbopack)
