'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DevImageStore {
  /** unitId → public image URL */
  overrides: Record<string, string>;
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
