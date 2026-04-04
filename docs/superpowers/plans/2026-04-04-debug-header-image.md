# Debug Unit Header Image Upload — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dev-only debug button on each unit's expanded header to upload, paste, change, or delete a background image — with live preview via real file URLs.

**Architecture:** Client-side image resize → POST to dev-only API route → file saved to `public/images/course/units/{unitId}.webp` → URL stored in a persisted Zustand store → UnitHeroHeader reads override and displays it. Clipboard paste uses the Clipboard API. Delete removes the file and the store entry.

**Tech Stack:** Next.js API route (fs), Zustand persist, Canvas API (resize/WebP), Clipboard API

---

### Task 1: Dev Image Override Store

**Files:**
- Create: `src/store/useDevImageStore.ts`

- [ ] **Step 1: Create the store**

```ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DevImageStore {
  overrides: Record<string, string>; // unitId → public URL
  setOverride: (unitId: string, url: string) => void;
  removeOverride: (unitId: string) => void;
}

export const useDevImageStore = create<DevImageStore>()(
  persist(
    (set) => ({
      overrides: {},
      setOverride: (unitId, url) =>
        set((s) => ({ overrides: { ...s.overrides, [unitId]: url } })),
      removeOverride: (unitId) =>
        set((s) => {
          const { [unitId]: _, ...rest } = s.overrides;
          return { overrides: rest };
        }),
    }),
    { name: 'dev-header-images' },
  ),
);
```

- [ ] **Step 2: Commit**

---

### Task 2: Dev-Only API Route

**Files:**
- Create: `src/app/api/dev/unit-header-image/route.ts`

- [ ] **Step 1: Create POST handler (upload) and DELETE handler**

POST accepts FormData (`unitId` + `file` blob), writes to `public/images/course/units/{unitId}.webp`, returns `{ url }` with cache-bust query param.

DELETE accepts JSON `{ unitId }`, removes the file, returns `{ ok: true }`.

Both return 403 if `NODE_ENV !== 'development'`.

- [ ] **Step 2: Commit**

---

### Task 3: DebugHeaderImage Component

**Files:**
- Create: `src/components/dev/DebugHeaderImage.tsx`

- [ ] **Step 1: Build the component**

- Camera icon button, absolute positioned top-right of header
- Click opens dropdown popover with Upload / Paste / Delete options
- Upload: hidden `<input type="file" accept="image/*">`, triggers resize + upload flow
- Paste: `navigator.clipboard.read()` → find image item → blob → resize + upload
- Delete: DELETE API → remove store override
- Client-side resize: canvas max 1200px wide, output WebP blob
- Shows green dot indicator when unit has an override
- Fades out when header compacts (uses CSS `opacity: fade(2.5)` pattern)

- [ ] **Step 2: Commit**

---

### Task 4: Wire Into UnitHeroHeader

**Files:**
- Modify: `src/components/course/UnitHeroHeader.tsx`

- [ ] **Step 1: Import store + component, apply override**

- Read `useDevImageStore` override for `unit.id`
- If override exists, use it instead of `unit.headerBg` in the background pattern div
- Render `<DebugHeaderImage>` inside the button, fading with expanded state

- [ ] **Step 2: Verify in browser** — upload an image, see it appear, change it, delete it, paste from clipboard

- [ ] **Step 3: Commit**
