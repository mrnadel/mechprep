/**
 * Lightweight manifest of available lesson backgrounds.
 * Only metadata — NO html content imported here.
 * Each key must match a file in this directory (e.g. 'space-stars' → './space-stars.ts').
 */
export const backgroundRegistry: Record<string, { name: string; category: string }> = {
  'space-stars': { name: 'Space Stars', category: 'Space' },
};
