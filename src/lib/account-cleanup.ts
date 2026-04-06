// ============================================================
// Account Cleanup — pre-deletion external-service teardown
// ============================================================
// Call cleanupBeforeDeletion(userId) BEFORE deleting a user row.
// It cancels the Paddle subscription, archives payment history
// to the audit table, and requests Mixpanel profile deletion.
// All steps are best-effort: a failure in one does not block
// account deletion.

import { eq, inArray } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users, subscriptions, paymentHistory, paymentAudit } from '@/lib/db/schema';
import paddle from '@/lib/paddle';

// ─── Paddle: cancel active subscription ──────────────────────

async function cancelPaddleSubscription(userId: string): Promise<void> {
  const [sub] = await db
    .select({
      paddleSubscriptionId: subscriptions.paddleSubscriptionId,
      status: subscriptions.status,
    })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  if (!sub?.paddleSubscriptionId) return;

  // Only cancel if the subscription is in a cancellable state
  const cancellable = ['active', 'trialing', 'past_due'];
  if (!cancellable.includes(sub.status)) return;

  try {
    await paddle.subscriptions.cancel(sub.paddleSubscriptionId, {
      effectiveFrom: 'immediately',
    });
  } catch (err) {
    // Log but don't block deletion — Paddle may have already canceled it
    console.error(
      `[account-cleanup] Failed to cancel Paddle subscription ${sub.paddleSubscriptionId}:`,
      err,
    );
  }
}

// ─── Archive payment history to audit table ──────────────────

async function archivePaymentHistory(userId: string): Promise<void> {
  // Grab user email + subscription IDs for the audit snapshot
  const [user] = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const [sub] = await db
    .select({
      paddleCustomerId: subscriptions.paddleCustomerId,
      paddleSubscriptionId: subscriptions.paddleSubscriptionId,
    })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  const payments = await db
    .select()
    .from(paymentHistory)
    .where(eq(paymentHistory.userId, userId));

  if (payments.length === 0) return;

  const now = new Date();
  const auditRows = payments.map((p) => ({
    originalUserId: userId,
    email: user?.email ?? null,
    paddleCustomerId: sub?.paddleCustomerId ?? null,
    paddleSubscriptionId: sub?.paddleSubscriptionId ?? null,
    paddleTransactionId: p.paddleTransactionId,
    amountCents: p.amountCents,
    currency: p.currency,
    status: p.status,
    description: p.description,
    deletedAt: now,
    originalCreatedAt: p.createdAt,
  }));

  await db.insert(paymentAudit).values(auditRows);
}

// ─── Mixpanel: delete user profile ───────────────────────────

async function deleteMixpanelProfile(userId: string): Promise<void> {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token) return;

  try {
    const payload = [
      {
        $token: token,
        $distinct_id: userId,
        $delete: '',
        $ignore_alias: true,
      },
    ];

    await fetch('https://api.mixpanel.com/engage#profile-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'text/plain' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[account-cleanup] Failed to delete Mixpanel profile:', err);
  }
}

// ─── Orchestrator ────────────────────────────────────────────

/**
 * Run all external-service cleanup for a user BEFORE deleting the
 * DB row. Each step is best-effort and isolated so one failure
 * does not prevent the others or the deletion itself.
 */
export async function cleanupBeforeDeletion(userId: string): Promise<void> {
  // Run archive first (needs DB rows to still exist)
  await archivePaymentHistory(userId).catch((err) =>
    console.error('[account-cleanup] archivePaymentHistory failed:', err),
  );

  // Cancel Paddle subscription and delete Mixpanel profile in parallel
  await Promise.allSettled([
    cancelPaddleSubscription(userId),
    deleteMixpanelProfile(userId),
  ]);
}

/**
 * Bulk cleanup for admin deletion of multiple users.
 * Runs cleanup for each user in parallel.
 */
export async function cleanupBeforeBulkDeletion(userIds: string[]): Promise<void> {
  await Promise.allSettled(userIds.map((id) => cleanupBeforeDeletion(id)));
}
