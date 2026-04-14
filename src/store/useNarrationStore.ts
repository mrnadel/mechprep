import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/lib/storage-keys';

interface NarrationState {
  enabled: boolean;
  voiceName: string | null; // null = auto-pick best available
  rate: number;
  toggleNarration: () => void;
  setVoiceName: (name: string | null) => void;
  setRate: (rate: number) => void;
}

export const useNarrationStore = create<NarrationState>()(
  persist(
    (set) => ({
      enabled: true,
      voiceName: null,
      rate: 0.95,
      toggleNarration: () => set((s) => ({ enabled: !s.enabled })),
      setVoiceName: (voiceName) => set({ voiceName }),
      setRate: (rate) => set({ rate: Math.max(0.5, Math.min(1.5, rate)) }),
    }),
    {
      name: STORAGE_KEYS.NARRATION,
      partialize: (state) => ({
        enabled: state.enabled,
        voiceName: state.voiceName,
        rate: state.rate,
      }),
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<NarrationState>),
        enabled: false,
      }),
    },
  ),
);
