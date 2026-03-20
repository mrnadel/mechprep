'use client';

import { useState } from 'react';
import { ArrowLeft, CreditCard, Calendar, Check, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { TIERS, FEATURES, formatPrice, type Feature } from '@/lib/pricing';
import type { SubscriptionTier } from '@/lib/subscription';
import { cn } from '@/lib/utils';

const FEATURE_LABELS: Record<Feature, string> = {
  [FEATURES.UNIT_ACCESS_ALL]: 'All course units',
  [FEATURES.UNLIMITED_PRACTICE]: 'Unlimited daily practice',
  [FEATURES.ALL_PRACTICE_MODES]: 'All practice modes',
  [FEATURES.FULL_ANALYTICS]: 'Full analytics dashboard',
  [FEATURES.STREAK_FREEZE]: 'Weekly streak freeze',
  [FEATURES.INTERVIEW_READINESS]: 'Interview readiness score',
  [FEATURES.DETAILED_EXPLANATIONS]: 'Detailed explanations',
  [FEATURES.TEAM_DASHBOARD]: 'Team dashboard',
  [FEATURES.TEAM_PROGRESS]: 'Team progress tracking',
  [FEATURES.CUSTOM_QUESTION_SETS]: 'Custom question sets',
  [FEATURES.BULK_LICENSING]: 'Bulk licensing',
};

// Simulated current plan data — in production this comes from the API/Stripe
const MOCK_SUBSCRIPTION = {
  tier: 'free' as SubscriptionTier,
  status: 'active' as const,
  billingInterval: null as 'month' | 'year' | null,
  currentPeriodEnd: null as string | null,
  amount: 0,
};

export default function BillingSettingsPage() {
  const [subscription] = useState(MOCK_SUBSCRIPTION);

  const tierDef = TIERS[subscription.tier];
  const isPaid = subscription.tier !== 'free';

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <Link
            href="/profile"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Billing</h1>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
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
              subscription.tier === 'free'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-primary-100 text-primary-700'
            )}>
              {subscription.tier === 'free' ? 'Free' : 'Active'}
            </div>
          </div>

          {isPaid && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">Amount</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(subscription.amount)}/{subscription.billingInterval === 'year' ? 'yr' : 'mo'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">Next billing</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {subscription.currentPeriodEnd
                    ? new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : '--'
                  }
                </p>
              </div>
            </div>
          )}

          {isPaid ? (
            <button className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Manage Subscription
            </button>
          ) : (
            <Link
              href="/pricing"
              className="w-full py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-primary-200"
            >
              Upgrade to Pro
            </Link>
          )}
        </div>

        {/* Plan Comparison for free users */}
        {!isPaid && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              See what you&apos;re missing
            </h3>
            <div className="space-y-2.5">
              {TIERS.pro.features.map((feature) => {
                const hasFree = TIERS.free.features.includes(feature);
                return (
                  <div key={feature} className="flex items-center gap-2.5">
                    {hasFree ? (
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 shrink-0" />
                    )}
                    <span className={cn(
                      'text-sm',
                      hasFree ? 'text-gray-700' : 'text-gray-400'
                    )}>
                      {FEATURE_LABELS[feature]}
                    </span>
                    {!hasFree && (
                      <span className="text-xs bg-primary-50 text-primary-600 px-1.5 py-0.5 rounded font-medium ml-auto">
                        Pro
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Billing history placeholder */}
        {isPaid && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Billing History</h3>
            <p className="text-sm text-gray-400">
              View and download invoices from the Stripe Customer Portal.
            </p>
            <button className="mt-3 text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" />
              Open Customer Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
