'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';
import { analytics } from '@/lib/mixpanel';

const SHOWN_KEY = 'mechready-trial-prompt-shown';

/**
 * Shows a Pro trial prompt after the user's first lesson completion.
 * Only shows once, only for free users.
 */
export function TrialPromptModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isProUser } = useSubscription();

  useEffect(() => {
    // Don't show for Pro users or if already shown
    if (isProUser) return;
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(SHOWN_KEY)) return;

    // Small delay to let the ResultScreen celebration play first
    const timer = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem(SHOWN_KEY, '1');
      analytics.feature('trial_prompt_shown', {});
    }, 2500);

    return () => clearTimeout(timer);
  }, [isProUser]);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white w-full h-full sm:h-auto sm:max-w-md sm:mx-4 sm:rounded-2xl overflow-y-auto sm:shadow-2xl flex flex-col justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trial-prompt-title"
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-gray-100 sm:bg-white/20 hover:bg-gray-200 sm:hover:bg-white/30 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500 sm:text-white" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-indigo-600 px-5 pt-7 pb-5 text-center">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-white/30"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles className="w-7 h-7 text-white" />
              </motion.div>
              <h3 id="trial-prompt-title" className="text-xl font-extrabold text-white">
                You&apos;re off to a great start!
              </h3>
              <p className="text-sm text-primary-100 mt-1">
                Try Pro free for 7 days
              </p>
            </div>

            {/* Content */}
            <div className="px-5 py-5">
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <Heart className="w-4.5 h-4.5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Unlimited hearts</p>
                    <p className="text-xs text-gray-400">Keep practicing without waiting</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <Shield className="w-4.5 h-4.5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Streak freeze</p>
                    <p className="text-xs text-gray-400">Protect your streak on busy days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <Zap className="w-4.5 h-4.5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">2x XP on weekends</p>
                    <p className="text-xs text-gray-400">Level up faster</p>
                  </div>
                </div>
              </div>

              <Link
                href="/pricing"
                onClick={() => {
                  analytics.subscription({ action: 'checkout_initiated', plan: 'pro', interval: 'month', source: 'trial_prompt' });
                  handleClose();
                }}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-primary-200 active:scale-[0.98] flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white"
              >
                <Sparkles className="w-4 h-4" />
                Try Pro Free for 7 Days
              </Link>

              <button
                onClick={handleClose}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-500 mt-3 py-2 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
