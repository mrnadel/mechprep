'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AnswerEvent } from '@/data/mastery';
import type { TopicId } from '@/data/types';

const PRUNE_DAYS = 90;

interface MasteryState {
  events: AnswerEvent[];
  lastSyncedIndex: number;

  addEvent: (event: Omit<AnswerEvent, 'id' | 'answeredAt'>) => void;
  clearEvents: () => void;
  debugSetEvents: (events: AnswerEvent[]) => void;
  getTopicEvents: (topicId: TopicId) => AnswerEvent[];
  syncToServer: () => Promise<void>;
  hydrateFromServer: () => Promise<void>;
}

export const useMasteryStore = create<MasteryState>()(
  persist(
    (set, get) => ({
      events: [],
      lastSyncedIndex: 0,

      addEvent: (partial) => {
        const event: AnswerEvent = {
          ...partial,
          id: crypto.randomUUID(),
          answeredAt: new Date().toISOString(),
        };

        set((state) => {
          const cutoff = Date.now() - PRUNE_DAYS * 24 * 60 * 60 * 1000;
          const pruned = state.events.filter(
            (e) => new Date(e.answeredAt).getTime() > cutoff
          );

          return {
            events: [...pruned, event],
            lastSyncedIndex: Math.min(state.lastSyncedIndex, pruned.length),
          };
        });
      },

      clearEvents: () => set({ events: [], lastSyncedIndex: 0 }),

      debugSetEvents: (events) => set({ events, lastSyncedIndex: 0 }),

      getTopicEvents: (topicId) =>
        get().events.filter((e) => e.topicId === topicId),

      syncToServer: async () => {
        const { events, lastSyncedIndex } = get();
        const unsynced = events.slice(lastSyncedIndex);
        if (unsynced.length === 0) return;

        try {
          const res = await fetch('/api/mastery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events: unsynced }),
          });
          if (res.ok) {
            set({ lastSyncedIndex: get().events.length });
          }
        } catch {
          // Silent fail — will retry on next sync
        }
      },

      hydrateFromServer: async () => {
        try {
          const res = await fetch('/api/mastery');
          if (!res.ok) return;
          const { events: serverEvents } = await res.json();
          if (!serverEvents || serverEvents.length === 0) return;

          set((state) => {
            const localIds = new Set(state.events.map((e) => e.id));
            const newEvents = serverEvents.filter(
              (e: AnswerEvent) => !localIds.has(e.id)
            );
            return {
              events: [...state.events, ...newEvents],
            };
          });
        } catch {
          // Silent fail
        }
      },
    }),
    {
      name: 'mastery-events',
    }
  )
);
