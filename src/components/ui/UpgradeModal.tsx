'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock, Bell, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export function UpgradeModal({ isOpen, onClose, reason }: UpgradeModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after animation completes
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
      setError('');
    }, 300);
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
            onClick={handleClose}
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
              onClick={handleClose}
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
              <h3 className="text-xl font-bold">MechPrep Pro</h3>
              <p className="text-sm text-primary-100 mt-1">
                Launching soon -- get notified for early access pricing
              </p>
            </div>

            {/* Content */}
            <div className="px-5 py-4">
              {submitted ? (
                <motion.div
                  className="text-center py-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    You&apos;re on the list!
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    We&apos;ll notify you when Pro launches with early access pricing.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
                  >
                    Got it
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Benefits */}
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

                  {/* Email input */}
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      className={cn(
                        'w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-primary-200',
                        error ? 'border-red-300' : 'border-gray-200 focus:border-primary-400'
                      )}
                    />
                    {error && (
                      <p className="text-xs text-red-500">{error}</p>
                    )}
                    <button
                      onClick={handleSubmit}
                      disabled={loading || !email.trim()}
                      className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-md shadow-primary-200 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Bell className="w-4 h-4" />
                      )}
                      Notify me when Pro launches
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
