import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useState } from 'react';

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

/** Returns true when dark mode is active (handles 'system' mode too). */
export function useIsDark(): boolean {
  const mode = useThemeStore((s) => s.mode);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (mode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setDark(mq.matches);
      const handler = (e: MediaQueryListEvent) => setDark(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    setDark(mode === 'dark');
  }, [mode]);

  return dark;
}
