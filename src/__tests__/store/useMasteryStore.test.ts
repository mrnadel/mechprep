import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMasteryStore } from '@/store/useMasteryStore';
import type { TopicId } from '@/data/types';

function resetStore() {
  useMasteryStore.setState({ events: [], lastSyncedIndex: 0 });
}

describe('useMasteryStore', () => {
  beforeEach(() => {
    resetStore();
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('starts with empty events and zero lastSyncedIndex', () => {
      const state = useMasteryStore.getState();
      expect(state.events).toEqual([]);
      expect(state.lastSyncedIndex).toBe(0);
    });
  });

  describe('addEvent', () => {
    it('adds an event with generated id and timestamp', () => {
      const store = useMasteryStore.getState();
      store.addEvent({
        questionId: 'q-1',
        topicId: 'thermodynamics' as TopicId,
        difficulty: 'intermediate',
        correct: true,
        source: 'course',
      });

      const state = useMasteryStore.getState();
      expect(state.events).toHaveLength(1);
      expect(state.events[0].id).toBeTruthy();
      expect(state.events[0].answeredAt).toBeTruthy();
      expect(state.events[0].questionId).toBe('q-1');
      expect(state.events[0].correct).toBe(true);
    });

    it('appends events to the end of the array', () => {
      const store = useMasteryStore.getState();
      store.addEvent({
        questionId: 'q-1',
        topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner',
        correct: true,
        source: 'practice',
      });
      store.addEvent({
        questionId: 'q-2',
        topicId: 'fluid-mechanics' as TopicId,
        difficulty: 'advanced',
        correct: false,
        source: 'course',
      });

      const state = useMasteryStore.getState();
      expect(state.events).toHaveLength(2);
      expect(state.events[0].questionId).toBe('q-1');
      expect(state.events[1].questionId).toBe('q-2');
    });

    it('prunes events older than 90 days', () => {
      // Manually inject an old event
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 91);

      useMasteryStore.setState({
        events: [{
          id: 'old-1',
          questionId: 'q-old',
          topicId: 'thermodynamics' as TopicId,
          difficulty: 'beginner',
          correct: true,
          source: 'practice',
          answeredAt: oldDate.toISOString(),
        }],
        lastSyncedIndex: 1,
      });

      // Adding a new event should prune the old one
      useMasteryStore.getState().addEvent({
        questionId: 'q-new',
        topicId: 'thermodynamics' as TopicId,
        difficulty: 'intermediate',
        correct: true,
        source: 'course',
      });

      const state = useMasteryStore.getState();
      expect(state.events).toHaveLength(1);
      expect(state.events[0].questionId).toBe('q-new');
    });

    it('adjusts lastSyncedIndex when pruning reduces events below it', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 91);

      useMasteryStore.setState({
        events: [
          {
            id: 'old-1', questionId: 'q-old', topicId: 'thermodynamics' as TopicId,
            difficulty: 'beginner', correct: true, source: 'practice',
            answeredAt: oldDate.toISOString(),
          },
          {
            id: 'old-2', questionId: 'q-old-2', topicId: 'thermodynamics' as TopicId,
            difficulty: 'beginner', correct: true, source: 'practice',
            answeredAt: oldDate.toISOString(),
          },
        ],
        lastSyncedIndex: 5, // was synced past these events
      });

      useMasteryStore.getState().addEvent({
        questionId: 'q-new',
        topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner',
        correct: true,
        source: 'course',
      });

      const state = useMasteryStore.getState();
      // All old events pruned, only new one remains
      expect(state.events).toHaveLength(1);
      // lastSyncedIndex capped at pruned.length (0) since min(5, 0) = 0
      expect(state.lastSyncedIndex).toBe(0);
    });

    it('keeps recent events during pruning', () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 30);

      useMasteryStore.setState({
        events: [{
          id: 'recent-1',
          questionId: 'q-recent',
          topicId: 'thermodynamics' as TopicId,
          difficulty: 'beginner',
          correct: true,
          source: 'practice',
          answeredAt: recentDate.toISOString(),
        }],
        lastSyncedIndex: 0,
      });

      useMasteryStore.getState().addEvent({
        questionId: 'q-new',
        topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner',
        correct: true,
        source: 'course',
      });

      const state = useMasteryStore.getState();
      expect(state.events).toHaveLength(2);
    });
  });

  describe('clearEvents', () => {
    it('resets events and lastSyncedIndex to zero', () => {
      const store = useMasteryStore.getState();
      store.addEvent({
        questionId: 'q-1',
        topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner',
        correct: true,
        source: 'course',
      });
      store.clearEvents();

      const state = useMasteryStore.getState();
      expect(state.events).toEqual([]);
      expect(state.lastSyncedIndex).toBe(0);
    });
  });

  describe('getTopicEvents', () => {
    it('filters events by topicId', () => {
      const store = useMasteryStore.getState();
      store.addEvent({
        questionId: 'q-1', topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner', correct: true, source: 'course',
      });
      store.addEvent({
        questionId: 'q-2', topicId: 'fluid-mechanics' as TopicId,
        difficulty: 'beginner', correct: false, source: 'course',
      });
      store.addEvent({
        questionId: 'q-3', topicId: 'thermodynamics' as TopicId,
        difficulty: 'advanced', correct: true, source: 'practice',
      });

      const thermoEvents = useMasteryStore.getState().getTopicEvents('thermodynamics' as TopicId);
      expect(thermoEvents).toHaveLength(2);
      expect(thermoEvents.every(e => e.topicId === 'thermodynamics')).toBe(true);
    });

    it('returns empty array for topic with no events', () => {
      const store = useMasteryStore.getState();
      store.addEvent({
        questionId: 'q-1', topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner', correct: true, source: 'course',
      });

      const events = useMasteryStore.getState().getTopicEvents('fluid-mechanics' as TopicId);
      expect(events).toEqual([]);
    });
  });

  describe('syncToServer', () => {
    it('sends unsynced events to the server', async () => {
      const mockFetch = vi.fn().mockResolvedValue({ ok: true });
      vi.stubGlobal('fetch', mockFetch);

      const store = useMasteryStore.getState();
      store.addEvent({
        questionId: 'q-1', topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner', correct: true, source: 'course',
      });
      store.addEvent({
        questionId: 'q-2', topicId: 'fluid-mechanics' as TopicId,
        difficulty: 'beginner', correct: false, source: 'course',
      });

      await useMasteryStore.getState().syncToServer();

      expect(mockFetch).toHaveBeenCalledWith('/api/mastery', expect.objectContaining({
        method: 'POST',
      }));

      const state = useMasteryStore.getState();
      expect(state.lastSyncedIndex).toBe(state.events.length);
    });

    it('is a no-op when all events are already synced', async () => {
      const mockFetch = vi.fn();
      vi.stubGlobal('fetch', mockFetch);

      useMasteryStore.setState({ events: [], lastSyncedIndex: 0 });
      await useMasteryStore.getState().syncToServer();

      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('does not update lastSyncedIndex on fetch failure', async () => {
      const mockFetch = vi.fn().mockResolvedValue({ ok: false });
      vi.stubGlobal('fetch', mockFetch);

      const store = useMasteryStore.getState();
      store.addEvent({
        questionId: 'q-1', topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner', correct: true, source: 'course',
      });

      await useMasteryStore.getState().syncToServer();

      const state = useMasteryStore.getState();
      expect(state.lastSyncedIndex).toBe(0);
    });

    it('silently fails on network error', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
      vi.stubGlobal('fetch', mockFetch);

      const store = useMasteryStore.getState();
      store.addEvent({
        questionId: 'q-1', topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner', correct: true, source: 'course',
      });

      // Should not throw
      await expect(useMasteryStore.getState().syncToServer()).resolves.toBeUndefined();
    });
  });

  describe('hydrateFromServer', () => {
    it('merges server events without duplicating existing local events', async () => {
      const store = useMasteryStore.getState();
      store.addEvent({
        questionId: 'q-1', topicId: 'thermodynamics' as TopicId,
        difficulty: 'beginner', correct: true, source: 'course',
      });
      const localId = useMasteryStore.getState().events[0].id;

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          events: [
            { id: localId, questionId: 'q-1', topicId: 'thermodynamics', difficulty: 'beginner', correct: true, source: 'course', answeredAt: new Date().toISOString() },
            { id: 'server-new', questionId: 'q-server', topicId: 'fluid-mechanics', difficulty: 'beginner', correct: false, source: 'practice', answeredAt: new Date().toISOString() },
          ],
        }),
      });
      vi.stubGlobal('fetch', mockFetch);

      await useMasteryStore.getState().hydrateFromServer();

      const state = useMasteryStore.getState();
      expect(state.events).toHaveLength(2); // local + 1 new from server (duplicate skipped)
      expect(state.events.find(e => e.id === 'server-new')).toBeTruthy();
    });

    it('silently fails on fetch error', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new Error('fail'));
      vi.stubGlobal('fetch', mockFetch);

      await expect(useMasteryStore.getState().hydrateFromServer()).resolves.toBeUndefined();
    });
  });
});
