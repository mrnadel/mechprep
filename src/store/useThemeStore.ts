import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'octokeen-theme',
      partialize: (state) => ({ mode: state.mode }),
    },
  ),
);

/**
 * Returns true when dark mode is active (handles 'system' mode too).
 * Uses the actual DOM class as source of truth so there's no flash
 * of light-mode colors on hydration.
 */
export function useIsDark(): boolean {
  const mode = useThemeStore((s) => s.mode);

  const subscribe = useCallback(
    (cb: () => void) => {
      // Re-check whenever the class list changes (ThemeProvider toggles .dark)
      const observer = new MutationObserver(cb);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      // Also listen for system preference changes
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', cb);
      return () => {
        observer.disconnect();
        mq.removeEventListener('change', cb);
      };
    },
    [],
  );

  const getSnapshot = useCallback(
    () => document.documentElement.classList.contains('dark'),
    [],
  );

  // During SSR, default to false (light)
  const getServerSnapshot = useCallback(() => false, []);

  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep in sync with mode changes (triggers ThemeProvider to update DOM first)
  useEffect(() => {
    // This effect exists only to re-subscribe when mode changes;
    // the actual value comes from the DOM via getSnapshot.
  }, [mode]);

  return dark;
}
