import { auth } from '@/lib/auth';

export async function getAuthUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

/**
 * Check if the current user is the configured admin.
 * Returns the user ID if admin, or null if not admin / not logged in.
 * Logs a warning if ADMIN_USER_ID is not configured.
 */
export async function requireAdmin(): Promise<string | null> {
  const userId = await getAuthUserId();
  if (!userId) return null;

  const adminId = process.env.ADMIN_USER_ID;
  if (!adminId) {
    console.warn('[auth] ADMIN_USER_ID env var is not set — all admin requests will be rejected');
    return null;
  }

  return userId === adminId ? userId : null;
}
