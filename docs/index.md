# MechReady — Project Documentation Index

> **Generated:** 2026-03-24 | **Scan Level:** Deep | **Mode:** Initial Scan

## Project Overview
- **Type:** Monolith (Next.js 16 App Router)
- **Primary Language:** TypeScript
- **Architecture:** Hybrid client-server with Zustand + PostgreSQL
- **Domain:** Gamified mechanical engineering interview prep (EdTech SaaS)

## Quick Reference
- **Framework:** Next.js 16.2+ (Turbopack)
- **Database:** PostgreSQL via Drizzle ORM (Supabase-hosted)
- **Auth:** NextAuth v5 (Google + Credentials)
- **Payments:** Paddle
- **State:** Zustand (5 stores, localStorage persisted)
- **Entry Point:** `src/app/layout.tsx`

## Documentation

### Generated
- [Project Overview (Brownfield Doc)](./project-overview.md) — Comprehensive project context for AI agents

### Existing
- [SPECIFICATION.md](../SPECIFICATION.md) — Original product specification
- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) — Design system documentation
- [PRODUCT_AND_COACHING_STRATEGY.md](../PRODUCT_AND_COACHING_STRATEGY.md) — Product strategy
- [COMPETITIVE_ANALYSIS.md](../COMPETITIVE_ANALYSIS.md) — Competitive analysis
- [COMPETITOR_ANALYSIS.md](../COMPETITOR_ANALYSIS.md) — Competitor analysis
- [AUDIT-REPORT.md](../AUDIT-REPORT.md) — Audit report
- [mechanical_engineering_content_framework.md](../mechanical_engineering_content_framework.md) — Content framework

## Getting Started
1. Copy `.env.local.example` to `.env.local` and fill in credentials
2. `npm install`
3. `npm run db:push` (push schema to database)
4. `npm run dev` (start dev server with Turbopack)
