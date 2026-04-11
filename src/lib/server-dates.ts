/**
 * Server-side date utilities that respect the user's timezone.
 *
 * The client sends an `X-Timezone` header (IANA string like "America/New_York")
 * so the server can compute "today" in the user's local time instead of UTC.
 * This prevents mismatches where a user practicing at 11pm EST would get
 * tomorrow's date (UTC) for streaks, daily rewards, etc.
 */

/**
 * Get "today" as a YYYY-MM-DD string in the user's timezone.
 * Falls back to UTC if the timezone header is missing or invalid.
 */
export function getServerToday(timezoneHeader?: string | null): string {
  if (timezoneHeader) {
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezoneHeader,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      // en-CA locale formats as YYYY-MM-DD
      return formatter.format(new Date());
    } catch {
      // Invalid timezone string — fall through to UTC
    }
  }
  return new Date().toISOString().split('T')[0];
}

/**
 * Get a Date object representing "now" but shifted so that its UTC methods
 * (getUTCFullYear, etc.) return values in the user's timezone.
 * Useful for date arithmetic (e.g. "14 days ago") that needs to stay in
 * the user's timezone.
 */
export function getServerNow(timezoneHeader?: string | null): Date {
  if (timezoneHeader) {
    try {
      // Validate the timezone by creating a formatter
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezoneHeader,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const parts = formatter.formatToParts(new Date());
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
      return new Date(
        `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`,
      );
    } catch {
      // Invalid timezone — fall through
    }
  }
  return new Date();
}
