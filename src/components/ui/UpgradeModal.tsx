'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock, Sparkles, Loader2 } from 'lucide-react';
import { TIERS, STRIPE_PRICES, formatPrice, getYearlySavingsPercent, PRO_TRIAL_DAYS } from '@/lib/pricing';
import { cn } from '@/lib/utils';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export function UpgradeModal({ isOpen, onClose, reason }: UpgradeModalProps) {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const [loading, setLoading] = useState(false);
  const savings = getYearlySavingsPercent('pro');
  const pro = TIERS.pro;
  const price = billingInterval === 'year'
    ? Math.round(pro.priceYearly / 12)
    : pro.priceMonthly;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const priceId = billingInterval === 'year'
        ? STRIPE_PRICES.PRO_YEARLY
        : STRIPE_PRICES.PRO_MONTHLY;

      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md mx-4 mb-0 sm:mb-0 overflow-hidden shadow-2xl"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 px-5 pt-6 pb-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-primary-200" />
                <span className="text-sm font-medium text-primary-200">
                  {reason || 'This feature requires Pro'}
                </span>
              </div>
              <h3 className="text-xl font-bold">Upgrade to MechPrep Pro</h3>
              <p className="text-sm text-primary-100 mt-1">
                Unlock your full potential with unlimited access
              </p>
            </div>

            {/* Benefits */}
            <div className="px-5 py-4">
              <ul className="space-y-2.5 mb-5">
                {[
                  'All 10 course units unlocked',
                  'Unlimited daily practice',
                  'Detailed explanations for every question',
                  'Full analytics & progress tracking',
                  'Interview readiness score',
                  'Weekly streak freeze',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Billing toggle */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <button
                  onClick={() => setBillingInterval('month')}
                  className={cn(
                    'text-xs font-medium px-3 py-1.5 rounded-full transition-colors',
                    billingInterval === 'month'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingInterval('year')}
                  className={cn(
                    'text-xs font-medium px-3 py-1.5 rounded-full transition-colors',
                    billingInterval === 'year'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  Yearly
                  {savings > 0 && (
                    <span className="ml-1 text-green-600">-{savings}%</span>
                  )}
                </button>
              </div>

              {/* Price */}
              <div className="text-center mb-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(price)}
                  </span>
                  <span className="text-sm text-gray-400">/mo</span>
                </div>
                {billingInterval === 'year' && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatPrice(pro.priceYearly)}/year billed annually
                  </p>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-md shadow-primary-200 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Start {PRO_TRIAL_DAYS}-Day Free Trial
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">
                No credit card required
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
