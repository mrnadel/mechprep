import { describe, it, expect, beforeEach } from 'vitest';
import { useFeedbackStore } from '@/store/useFeedbackStore';

function resetStore() {
  useFeedbackStore.setState({ flags: {}, comments: {} });
}

describe('useFeedbackStore', () => {
  beforeEach(() => {
    resetStore();
  });

  describe('initial state', () => {
    it('starts with empty flags and comments', () => {
      const state = useFeedbackStore.getState();
      expect(state.flags).toEqual({});
      expect(state.comments).toEqual({});
    });
  });

  describe('setFlag', () => {
    it('sets a flag with correct key format', () => {
      const { setFlag } = useFeedbackStore.getState();
      setFlag('question', 'q-1', 'confusing');

      const state = useFeedbackStore.getState();
      expect(state.flags['question:q-1']).toBe('confusing');
    });

    it('overwrites an existing flag for the same content', () => {
      const { setFlag } = useFeedbackStore.getState();
      setFlag('question', 'q-1', 'confusing');
      setFlag('question', 'q-1', 'incorrect');

      const state = useFeedbackStore.getState();
      expect(state.flags['question:q-1']).toBe('incorrect');
    });

    it('handles lesson-question content type', () => {
      const { setFlag } = useFeedbackStore.getState();
      setFlag('lesson-question', 'lq-42', 'too-hard');

      const state = useFeedbackStore.getState();
      expect(state.flags['lesson-question:lq-42']).toBe('too-hard');
    });

    it('can store multiple flags for different content', () => {
      const { setFlag } = useFeedbackStore.getState();
      setFlag('question', 'q-1', 'confusing');
      setFlag('question', 'q-2', 'too-easy');
      setFlag('lesson-question', 'lq-1', 'bad-graphic');

      const state = useFeedbackStore.getState();
      expect(Object.keys(state.flags)).toHaveLength(3);
    });
  });

  describe('getFlag', () => {
    it('returns null for non-existent flag', () => {
      const { getFlag } = useFeedbackStore.getState();
      expect(getFlag('question', 'nonexistent')).toBeNull();
    });

    it('returns the reason for an existing flag', () => {
      const store = useFeedbackStore.getState();
      store.setFlag('question', 'q-1', 'incorrect');
      expect(store.getFlag('question', 'q-1')).toBe('incorrect');
    });
  });

  describe('removeFlag', () => {
    it('removes a flag and its associated comment', () => {
      const store = useFeedbackStore.getState();
      store.setFlag('question', 'q-1', 'confusing');
      store.setComment('question', 'q-1', 'This is confusing because...');
      store.removeFlag('question', 'q-1');

      const state = useFeedbackStore.getState();
      expect(state.flags['question:q-1']).toBeUndefined();
      expect(state.comments['question:q-1']).toBeUndefined();
    });

    it('does not affect other flags when removing one', () => {
      const store = useFeedbackStore.getState();
      store.setFlag('question', 'q-1', 'confusing');
      store.setFlag('question', 'q-2', 'incorrect');
      store.removeFlag('question', 'q-1');

      const state = useFeedbackStore.getState();
      expect(state.flags['question:q-2']).toBe('incorrect');
    });

    it('is a no-op for non-existent flags', () => {
      const store = useFeedbackStore.getState();
      store.setFlag('question', 'q-1', 'confusing');
      store.removeFlag('question', 'nonexistent');

      const state = useFeedbackStore.getState();
      expect(state.flags['question:q-1']).toBe('confusing');
    });
  });

  describe('setComment', () => {
    it('sets a comment independently of flags', () => {
      const store = useFeedbackStore.getState();
      store.setComment('question', 'q-1', 'Needs improvement');

      const state = useFeedbackStore.getState();
      expect(state.comments['question:q-1']).toBe('Needs improvement');
      expect(state.flags['question:q-1']).toBeUndefined();
    });

    it('overwrites an existing comment', () => {
      const store = useFeedbackStore.getState();
      store.setComment('question', 'q-1', 'First comment');
      store.setComment('question', 'q-1', 'Updated comment');

      const state = useFeedbackStore.getState();
      expect(state.comments['question:q-1']).toBe('Updated comment');
    });
  });

  describe('hydrateFlags', () => {
    it('replaces all flags and comments from server data', () => {
      const store = useFeedbackStore.getState();
      // Set some existing data
      store.setFlag('question', 'old', 'confusing');

      store.hydrateFlags([
        { contentType: 'question', contentId: 'q-1', reason: 'incorrect', comment: 'Wrong answer shown' },
        { contentType: 'lesson-question', contentId: 'lq-5', reason: 'too-easy', comment: null },
      ]);

      const state = useFeedbackStore.getState();
      // Old data should be replaced
      expect(state.flags['question:old']).toBeUndefined();
      // New data present
      expect(state.flags['question:q-1']).toBe('incorrect');
      expect(state.comments['question:q-1']).toBe('Wrong answer shown');
      expect(state.flags['lesson-question:lq-5']).toBe('too-easy');
      expect(state.comments['lesson-question:lq-5']).toBeUndefined();
    });

    it('handles empty hydration array', () => {
      const store = useFeedbackStore.getState();
      store.setFlag('question', 'q-1', 'confusing');
      store.hydrateFlags([]);

      const state = useFeedbackStore.getState();
      expect(state.flags).toEqual({});
      expect(state.comments).toEqual({});
    });
  });
});
