// ============================================================
// Share Card — URL builder, share text, and display-name helper
// ============================================================

import { APP_NAME, APP_URL } from '@/lib/constants';
import { useCourseStore } from '@/store/useCourseStore';
import { useStore } from '@/store/useStore';

// ─── Card types ───────────────────────────

export type ShareCardType = 'streak' | 'league' | 'level' | 'chapter' | 'course';

// ─── URL builder ──────────────────────────

export function getShareCardUrl(
  type: ShareCardType,
  value: string | number,
  name: string,
): string {
  const params = new URLSearchParams({ type, value: String(value), name });
  return `/api/share-card?${params.toString()}`;
}

// ─── Share text generators ────────────────

export function getShareText(
  type: ShareCardType,
  value: string | number,
): string {
  switch (type) {
    case 'streak':
      return `I just hit a ${value}-day streak on ${APP_NAME}! \u{1F525}\n${APP_URL}`;
    case 'league':
      return `I got promoted to the ${value} League on ${APP_NAME}! \u{1F3C6}\n${APP_URL}`;
    case 'level':
      return `I reached Level ${value} on ${APP_NAME}! \u{2B50}\n${APP_URL}`;
    case 'chapter':
      return `I completed "${value}" on ${APP_NAME}! \u{1F4DA}\n${APP_URL}`;
    case 'course':
      return `I completed the ${value} course on ${APP_NAME}! \u{1F393}\n${APP_URL}`;
    default:
      return `Check out my progress on ${APP_NAME}!\n${APP_URL}`;
  }
}

// ─── Reliable display name (CR-1) ────────

/**
 * Returns the best available display name from either store.
 * 'Engineer' is the hardcoded default — skip it as a real name.
 */
export function getDisplayName(): string {
  const courseDisplayName = useCourseStore.getState().progress.displayName;
  const practiceDisplayName = useStore.getState().progress.displayName;

  if (courseDisplayName && courseDisplayName !== 'Engineer') return courseDisplayName;
  if (practiceDisplayName && practiceDisplayName !== 'Engineer') return practiceDisplayName;
  return 'Learner';
}
