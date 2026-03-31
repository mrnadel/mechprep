'use client';

import { useState } from 'react';
import { ArrowLeft, Check, X, Sparkles, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { TIERS, FEATURES, PADDLE_PRICES, type Feature } from '@/lib/pricing';
import { useSubscription } from '@/hooks/useSubscription';
import { cn } from '@/lib/utils';
import { getPaddle } from '@/lib/paddle-client';
import { analytics } from '@/lib/mixpanel';

const FEATURE_LABELS: Record<Feature, string> = {
  [FEATURES.UNLIMITED_HEARTS]: 'Unlimited hearts',
  [FEATURES.STREAK_FREEZE]: 'Weekly streak freeze',
  [FEATURES.FULL_ANALYTICS]: 'Full analytics dashboard',
  [FEATURES.DOUBLE_XP_WEEKENDS]: '2x XP on weekends',
  [FEATURES.DETAILED_EXPLANATIONS]: 'Detailed explanations',
  [FEATURES.PREMIUM_LEAGUE_REWARDS]: 'Premium league rewards',
  [FEATURES.NO_ADS]: 'No ads',
};

export default function BillingSettingsPage() {
  const router = useRouter();
  const { tier, isProUser, cancelAtPeriodEnd, currentPeriodEnd } = useSubscription();
  const { data: session } = useSession();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [billingError, setBillingError] = useState('');

  const tierDef = TIERS[tier];

  const handleSubscribe = async () => {
    if (!session?.user?.id) return;
    setCheckoutLoading(true);
    setBillingError('');
    analytics.subscription({ action: 'checkout_initiated', plan: 'pro', interval: 'month', source: 'billing_page' });
    try {
      const res = await fetch('/api/paddle/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: PADDLE_PRICES.PRO_MONTHLY }),
      });
      if (!res.ok) {
        setBillingError('Failed to start checkout. Please try again.');
        return;
      }
      const { transactionId } = await res.json();

      const paddle = await getPaddle();
      if (!paddle || !transactionId) {
        setBillingError('Payment system unavailable. Please try again later.');
        return;
      }

      // Open checkout using the server-created transaction (price-validated).
      // This prevents client-side price/plan tampering.
      paddle.Checkout.open({
        transactionId,
        settings: {
          successUrl: `${window.location.origin}/checkout/success`,
        },
      });
    } catch (err) {
      console.error('Checkout error:', err);
      setBillingError('Something went wrong. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    setBillingError('');
    analytics.subscription({ action: 'manage_clicked', plan: tier });
    try {
      const res = await fetch('/api/paddle/portal', { method: 'POST' });
      if (!res.ok) {
        setBillingError('Failed to open subscription portal. Please try again.');
        return;
      }
      const { updateUrl } = await res.json();
      if (updateUrl) {
        window.open(updateUrl, '_blank');
      } else {
        setBillingError('No subscription portal available.');
      }
    } catch (err) {
      console.error('Portal error:', err);
      setBillingError('Something went wrong. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Billing</h1>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6 max-w-lg mx-auto">
        {billingError && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700">{billingError}</p>
              <button
                onClick={() => setBillingError('')}
                className="text-xs text-red-500 hover:underline mt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Current Plan Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Current Plan</p>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">{tierDef.name}</h2>
              <p className="text-sm text-gray-500">{tierDef.tagline}</p>
            </div>
            <div className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold',
              isProUser ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
            )}>
              {tierDef.name}
            </div>
          </div>

          {cancelAtPeriodEnd && currentPeriodEnd && (
            <p className="text-sm text-amber-600 mb-3">
              Your subscription will end on {new Date(currentPeriodEnd).toLocaleDateString()}
            </p>
          )}

          {isProUser ? (
            <button
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {portalLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
              Manage Subscription
            </button>
          ) : (
            <Link
              href="/pricing"
              className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              View All Plans
            </Link>
          )}
        </div>

        {/* Upgrade CTA (free users only) */}
        {!isProUser && (
          <div className="bg-white rounded-2xl border border-primary-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <h3 className="text-sm font-bold text-gray-900">
                Upgrade to Pro
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Unlock all units, unlimited practice, and detailed explanations.
            </p>
            <button
              onClick={handleSubscribe}
              disabled={checkoutLoading || !session}
              className="w-full py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-md shadow-primary-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {checkoutLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Subscribe to Pro
            </button>
          </div>
        )}

        {/* What's included in Pro */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            {isProUser ? 'Your Pro features' : 'See what you\'ll get with Pro'}
          </h3>
          <div className="space-y-2.5">
            {TIERS.pro.features.map((feature) => {
              const hasFree = TIERS.free.features.includes(feature);
              return (
                <div key={feature} className="flex items-center gap-2.5">
                  {isProUser || hasFree ? (
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                  ) : (
                    <X className="w-4 h-4 text-gray-300 shrink-0" />
                  )}
                  <span className={cn(
                    'text-sm',
                    isProUser || hasFree ? 'text-gray-700' : 'text-gray-400'
                  )}>
                    {FEATURE_LABELS[feature]}
                  </span>
                  {!isProUser && !hasFree && (
                    <span className="text-xs bg-primary-50 text-primary-600 px-1.5 py-0.5 rounded font-medium ml-auto">
                      Pro
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
