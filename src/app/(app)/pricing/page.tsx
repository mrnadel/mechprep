'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Sparkles, HelpCircle, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { TIERS, FEATURES, STRIPE_PRICES, formatPrice, getYearlySavingsPercent, type Feature } from '@/lib/pricing';
import { useSubscription } from '@/hooks/useSubscription';
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

const ALL_DISPLAY_FEATURES: Feature[] = [
  FEATURES.ALL_PRACTICE_MODES,
  FEATURES.UNIT_ACCESS_ALL,
  FEATURES.UNLIMITED_PRACTICE,
  FEATURES.DETAILED_EXPLANATIONS,
  FEATURES.FULL_ANALYTICS,
  FEATURES.STREAK_FREEZE,
  FEATURES.INTERVIEW_READINESS,
  FEATURES.TEAM_DASHBOARD,
  FEATURES.TEAM_PROGRESS,
  FEATURES.CUSTOM_QUESTION_SETS,
  FEATURES.BULK_LICENSING,
];

const FAQ_ITEMS = [
  {
    q: 'How does the 7-day free trial work?',
    a: 'Start your Pro trial instantly — no credit card required. You get full access to all Pro features for 7 days. If you love it, subscribe to keep your access.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Absolutely. Cancel anytime from your billing settings. You\'ll keep access until the end of your current billing period — no questions asked.',
  },
  {
    q: 'What happens to my progress if I downgrade?',
    a: 'Your progress is always saved. If you downgrade, you keep everything you\'ve earned. You\'ll just have limited access to units and daily question caps.',
  },
  {
    q: 'Is there a student discount?',
    a: 'Yes! Students with a valid .edu email get 50% off Pro. Contact us at support@mechprep.com with your student email to claim your discount.',
  },
  {
    q: 'How does Team billing work?',
    a: 'Team plans are billed per seat with a minimum of 5 seats. Contact our sales team for annual pricing and volume discounts.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'We offer a full refund within the first 14 days of any paid subscription if you\'re not satisfied. Just reach out to our support team.',
  },
];

const tierOrder: SubscriptionTier[] = ['free', 'pro', 'team'];

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const yearlySavings = getYearlySavingsPercent('pro');

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Pricing</h1>
        </div>
      </div>

      <div className="px-4 pt-8">
        {/* Hero */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Invest in your engineering career
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Choose the plan that fits your interview prep goals. Start free, upgrade when you&apos;re ready.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className={cn(
            'text-sm font-medium transition-colors',
            billingInterval === 'month' ? 'text-gray-900' : 'text-gray-400'
          )}>
            Monthly
          </span>
          <button
            onClick={() => setBillingInterval(billingInterval === 'month' ? 'year' : 'month')}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors',
              billingInterval === 'year' ? 'bg-primary-600' : 'bg-gray-300'
            )}
            aria-label="Toggle billing interval"
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
              animate={{ left: billingInterval === 'year' ? '26px' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={cn(
            'text-sm font-medium transition-colors',
            billingInterval === 'year' ? 'text-gray-900' : 'text-gray-400'
          )}>
            Yearly
          </span>
          {yearlySavings > 0 && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Save {yearlySavings}%
            </span>
          )}
        </motion.div>

        {/* Tier Cards */}
        <div className="space-y-4 mb-12">
          {tierOrder.map((tierId, index) => {
            const tier = TIERS[tierId];
            const price = billingInterval === 'year' && tier.priceYearly > 0
              ? tier.priceYearly
              : tier.priceMonthly;
            const isHighlighted = tier.highlighted;
            const isTeam = tierId === 'team';

            return (
              <motion.div
                key={tierId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                className={cn(
                  'rounded-2xl border-2 p-5 relative overflow-hidden',
                  isHighlighted
                    ? 'border-primary-500 bg-white shadow-lg shadow-primary-100'
                    : 'border-gray-200 bg-white'
                )}
              >
                {isHighlighted && (
                  <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
                  <p className="text-sm text-gray-500">{tier.tagline}</p>
                </div>

                <div className="mb-4">
                  {isTeam && billingInterval === 'year' ? (
                    <p className="text-2xl font-bold text-gray-900">Custom</p>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(billingInterval === 'year' && tier.priceYearly > 0
                          ? Math.round(tier.priceYearly / 12)
                          : price
                        )}
                      </span>
                      {price > 0 && (
                        <span className="text-sm text-gray-400">
                          /mo{isTeam ? ' per seat' : ''}
                        </span>
                      )}
                    </div>
                  )}
                  {billingInterval === 'year' && tier.priceYearly > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatPrice(tier.priceYearly)}/year billed annually
                    </p>
                  )}
                  {isTeam && <p className="text-xs text-gray-400 mt-0.5">Minimum {tier.minSeats} seats</p>}
                </div>

                {/* Feature list */}
                <ul className="space-y-2 mb-5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className={cn(
                        'w-4 h-4 mt-0.5 shrink-0',
                        isHighlighted ? 'text-primary-600' : 'text-green-500'
                      )} />
                      <span className="text-gray-700">{FEATURE_LABELS[feature]}</span>
                    </li>
                  ))}
                  {tierId === 'free' && (
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-gray-400 text-xs ml-6">5 questions/day &middot; Unit 1 only</span>
                    </li>
                  )}
                </ul>

                {/* CTA Button */}
                {tierId === 'free' ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-400 font-semibold text-sm cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : tierId === 'pro' ? (
                  <button className="w-full py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-md shadow-primary-200 active:scale-[0.98]">
                    Start Free Trial
                  </button>
                ) : (
                  <button className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-colors active:scale-[0.98]">
                    Contact Sales
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-gray-900 text-center mb-4">
            Feature comparison
          </h3>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-4 gap-0 border-b border-gray-100 px-3 py-2.5 bg-gray-50">
              <div className="text-xs font-semibold text-gray-500">Feature</div>
              {tierOrder.map((t) => (
                <div key={t} className="text-xs font-semibold text-gray-700 text-center">
                  {TIERS[t].name}
                </div>
              ))}
            </div>
            {/* Rows */}
            {ALL_DISPLAY_FEATURES.map((feature, i) => (
              <div
                key={feature}
                className={cn(
                  'grid grid-cols-4 gap-0 px-3 py-2.5',
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                )}
              >
                <div className="text-xs text-gray-600 pr-2">{FEATURE_LABELS[feature]}</div>
                {tierOrder.map((t) => (
                  <div key={t} className="flex justify-center">
                    {TIERS[t].features.includes(feature) ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 justify-center mb-4">
            <HelpCircle className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-bold text-gray-900">
              Frequently asked questions
            </h3>
          </div>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-gray-800 pr-2">{item.q}</span>
                  <ChevronDown className={cn(
                    'w-4 h-4 text-gray-400 shrink-0 transition-transform',
                    openFaq === i && 'rotate-180'
                  )} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-3 text-sm text-gray-500 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
