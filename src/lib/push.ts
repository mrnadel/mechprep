import webPush from 'web-push';

// VAPID keys must be set as environment variables.
// Generate once with: npx web-push generate-vapid-keys
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY ?? '';
const VAPID_SUBJECT = process.env.VAPID_SUBJECT ?? 'mailto:support@octokeen.com';

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

export interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  url?: string;
}

export async function sendPushNotification(
  subscription: { endpoint: string; p256dh: string; auth: string },
  payload: PushPayload,
) {
  const pushSubscription = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.p256dh,
      auth: subscription.auth,
    },
  };

  return webPush.sendNotification(
    pushSubscription,
    JSON.stringify(payload),
    { TTL: 60 * 60 }, // 1 hour TTL
  );
}

/**
 * Send a push notification to all subscriptions for a given user.
 * Fire-and-forget: errors are silently swallowed per subscription.
 */
export async function sendPushToUser(
  userId: string,
  payload: PushPayload,
): Promise<void> {
  // Dynamic import to avoid circular dependency with schema
  const { db } = await import('@/lib/db');
  const { pushSubscriptions } = await import('@/lib/db/schema');
  const { eq } = await import('drizzle-orm');

  const subs = await db
    .select()
    .from(pushSubscriptions)
    .where(eq(pushSubscriptions.userId, userId));

  for (const sub of subs) {
    sendPushNotification(
      { endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth },
      payload,
    ).catch(() => {});
  }
}
