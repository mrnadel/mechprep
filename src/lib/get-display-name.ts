import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';

/** Get a display name from whichever store has one, with a fallback. */
export function getDisplayName(): string {
  return (
    useStore.getState().progress.displayName ||
    useCourseStore.getState().progress.displayName ||
    'Learner'
  );
}
