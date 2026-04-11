'use client';

/**
 * Report lesson/session completion to the friend quest progress API.
 * Fire-and-forget: friend quest progress is server-authoritative.
 * Errors are silently swallowed (friend quests are optional).
 */
export function reportFriendQuestProgress(
  events: Array<{ event: 'xp_earned' | 'lesson_completed' | 'accuracy_report'; value: number }>,
): void {
  // Filter out zero/negative values
  const validEvents = events.filter((e) => e.value > 0);
  if (validEvents.length === 0) return;

  fetch('/api/friends/quests/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ events: validEvents }),
  }).catch(() => {
    // Silent failure — friend quests are best-effort
  });
}
