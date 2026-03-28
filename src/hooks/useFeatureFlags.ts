import { create } from 'zustand';
import { FLAG_DEFINITIONS, getDefaultFlag } from '@/lib/feature-flags';

interface FlagStore {
  flags: Record<string, boolean>;
  loaded: boolean;
  load: () => Promise<void>;
  setFlag: (key: string, enabled: boolean) => void;
}

// Initialize with defaults
const defaults: Record<string, boolean> = {};
for (const def of FLAG_DEFINITIONS) defaults[def.key] = def.enabled;

export const useFlagStore = create<FlagStore>((set) => ({
  flags: defaults,
  loaded: false,

  load: async () => {
    try {
      const res = await fetch('/api/feature-flags');
      if (!res.ok) return;
      const { flags } = await res.json();
      set({ flags, loaded: true });
    } catch {
      // Keep defaults on error
      set({ loaded: true });
    }
  },

  setFlag: (key, enabled) =>
    set((s) => ({ flags: { ...s.flags, [key]: enabled } })),
}));

/** Check if a feature flag is enabled */
export function useFeatureFlag(key: string): boolean {
  return useFlagStore((s) => s.flags[key] ?? getDefaultFlag(key));
}

/** Check multiple flags at once */
export function useFeatureFlags(...keys: string[]): Record<string, boolean> {
  return useFlagStore((s) => {
    const result: Record<string, boolean> = {};
    for (const key of keys) result[key] = s.flags[key] ?? getDefaultFlag(key);
    return result;
  });
}
