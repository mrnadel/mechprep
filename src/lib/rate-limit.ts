const rateMap = new Map<string, { count: number; resetAt: number }>();

// Clean up expired entries every 60 seconds
// Use unref() so the timer does not prevent Node.js process from exiting
const _rateLimitCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateMap) {
    if (entry.resetAt <= now) {
      rateMap.delete(key);
    }
  }
}, 60_000);
if (typeof _rateLimitCleanup?.unref === 'function') _rateLimitCleanup.unref();

export function rateLimit(
  identifier: string,
  config: { limit: number; windowMs: number }
): { success: boolean; remaining: number; resetAt: Date } {
  const now = Date.now();
  const entry = rateMap.get(identifier);

  if (!entry || entry.resetAt <= now) {
    // New window
    rateMap.set(identifier, { count: 1, resetAt: now + config.windowMs });
    return {
      success: true,
      remaining: config.limit - 1,
      resetAt: new Date(now + config.windowMs),
    };
  }

  entry.count++;

  if (entry.count > config.limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: new Date(entry.resetAt),
    };
  }

  return {
    success: true,
    remaining: config.limit - entry.count,
    resetAt: new Date(entry.resetAt),
  };
}

// Preset configs
export const RATE_LIMITS = {
  auth: { limit: 5, windowMs: 60_000 },       // 5 per minute
  api: { limit: 30, windowMs: 60_000 },        // 30 per minute
  webhook: { limit: 100, windowMs: 60_000 },   // 100 per minute
} as const;

// Failed login tracking
const failedLogins = new Map<string, { count: number; lockedUntil: number }>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60_000; // 15 minutes

export function trackFailedLogin(email: string): void {
  const now = Date.now();
  const entry = failedLogins.get(email);

  if (!entry) {
    // First failed attempt — start tracking
    failedLogins.set(email, { count: 1, lockedUntil: 0 });
    return;
  }

  // If previously locked and lock has expired, reset counter
  if (entry.lockedUntil > 0 && entry.lockedUntil <= now) {
    failedLogins.set(email, { count: 1, lockedUntil: 0 });
    return;
  }

  entry.count++;
  if (entry.count >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_DURATION_MS;
  }
}

export function isLoginLocked(email: string): boolean {
  const entry = failedLogins.get(email);
  if (!entry) return false;
  if (entry.lockedUntil > 0 && entry.lockedUntil <= Date.now()) {
    failedLogins.delete(email);
    return false;
  }
  return entry.lockedUntil > 0;
}

export function clearFailedLogins(email: string): void {
  failedLogins.delete(email);
}

// Clean up expired lockouts every 5 minutes
const _loginCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of failedLogins) {
    if (entry.lockedUntil > 0 && entry.lockedUntil <= now) {
      failedLogins.delete(key);
    }
  }
}, 5 * 60_000);
if (typeof _loginCleanup?.unref === 'function') _loginCleanup.unref();
