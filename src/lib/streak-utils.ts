/**
 * Compute current streak by walking backwards from today.
 * If today isn't active, checks yesterday (streak is at-risk but not broken).
 * A streak freeze bridges a single-day gap (up to `freezesAvailable` gaps).
 */
export function computeStreakFromDates(
  dates: string[],
  today: string,
  freezesAvailable = 0,
): { currentStreak: number; longestStreak: number } {
  if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const dateSet = new Set(dates);

  const d = new Date(today + 'T12:00:00Z');

  if (!dateSet.has(today)) {
    d.setDate(d.getDate() - 1);
    const yesterday = d.toISOString().split('T')[0];
    if (!dateSet.has(yesterday)) {
      return { currentStreak: 0, longestStreak: computeLongestStreak(dates) };
    }
  }

  let currentStreak = 0;
  let freezesUsed = 0;
  while (true) {
    const dateStr = d.toISOString().split('T')[0];
    if (dateSet.has(dateStr)) {
      currentStreak++;
      d.setDate(d.getDate() - 1);
    } else if (freezesUsed < freezesAvailable) {
      // Bridge a 1-day gap with a streak freeze — check if the day before this gap has activity
      const peekDate = new Date(d);
      peekDate.setDate(peekDate.getDate() - 1);
      const peekStr = peekDate.toISOString().split('T')[0];
      if (dateSet.has(peekStr)) {
        freezesUsed++;
        currentStreak++; // count the frozen day
        d.setDate(d.getDate() - 1);
      } else {
        break; // gap is 2+ days, freeze can't bridge it
      }
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak: Math.max(currentStreak, computeLongestStreak(dates)) };
}

export function computeLongestStreak(sortedDates: string[]): number {
  if (sortedDates.length === 0) return 0;
  let longest = 1;
  let current = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1] + 'T12:00:00Z');
    const curr = new Date(sortedDates[i] + 'T12:00:00Z');
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diffDays > 1) {
      current = 1;
    }
  }
  return longest;
}
