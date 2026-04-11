# Octokeen — Active Courses

> **Canonical source of truth:** `src/data/professions.ts`
>
> All documentation files should reference this page for the current course list
> rather than hardcoding course names. When courses are added or removed, update
> this file to match `professions.ts`.

---

## Current Courses

| Course | ID | Icon | Status |
|---|---|---|---|
| Personal Finance | `personal-finance` | 💰 | Active (default) |
| Psychology & Human Behavior | `psychology` | 🧠 | Active |
| Space & Astronomy | `space-astronomy` | 🚀 | Active |
| Mechanical Engineering | `mechanical-engineering` | ⚙️ | Legacy — requires admin access |

## Course Data Structure

Each course lives under `src/data/course/professions/<course-id>/` with:

```
professions/<course-id>/
├── meta.ts          # Unit/lesson metadata (lightweight, loads at startup)
├── units/           # Full question data files (loads on-demand)
├── glossary.ts      # Course-specific glossary terms (optional)
└── syllabus.ts      # Section/syllabus structure (optional)
```

The `PROFESSIONS` array in `src/data/professions.ts` is the runtime registry.
Use `getProfession(id)` to look up a course by ID.

## Adding a New Course

1. Create the profession directory under `src/data/course/professions/<new-id>/`
2. Add the entry to the `PROFESSIONS` array in `src/data/professions.ts`
3. Write content following `docs/content-writing-guide.md`
4. Run `npx tsx scripts/seed-content.ts` to seed the database
5. Update this file to reflect the new course
