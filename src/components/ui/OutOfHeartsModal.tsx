'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useHeartsStore } from '@/store/useHeartsStore';
import { analytics } from '@/lib/mixpanel';

interface OutOfHeartsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '0:00';
  const totalSeconds = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function OutOfHeartsModal({ isOpen, onClose }: OutOfHeartsModalProps) {
  const getTimeUntilNextHeart = useHeartsStore((s) => s.getTimeUntilNextHeart);
  const rechargeHearts = useHeartsStore((s) => s.rechargeHearts);
  const current = useHeartsStore((s) => s.current);
  const [countdown, setCountdown] = useState('');

  // Track hearts_depleted event when modal opens
  useEffect(() => {
    if (isOpen) {
      analytics.feature('hearts_depleted', {});
    }
  }, [isOpen]);

  // Live countdown timer
  useEffect(() => {
    if (!isOpen) return;

    const tick = () => {
      rechargeHearts();
      const remaining = getTimeUntilNextHeart();
      setCountdown(formatCountdown(remaining));
    };

    tick(); // initial
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isOpen, getTimeUntilNextHeart, rechargeHearts]);

  // Auto-close if hearts become available again (recharge happened)
  useEffect(() => {
    if (isOpen && current > 0) {
      onClose();
    }
  }, [isOpen, current, onClose]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center"
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
            aria-labelledby="out-of-hearts-title"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 px-5 pt-6 pb-5 text-white text-center">
              {/* Heart icon */}
              <div className="flex justify-center mb-3">
                <svg className="w-16 h-16 text-white opacity-90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3 id="out-of-hearts-title" className="text-xl font-bold">
                Out of Hearts
              </h3>
              <p className="text-sm text-red-100 mt-1">
                You need hearts to continue practicing
              </p>
            </div>

            {/* Content */}
            <div className="px-5 py-5">
              {/* Countdown */}
              <div className="text-center mb-5">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Next heart in
                </p>
                <p className="text-2xl font-bold text-gray-800 tabular-nums">
                  {countdown}
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs font-medium text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Upgrade CTA */}
              <Link
                href="/pricing"
                onClick={() => { analytics.subscription({ action: 'checkout_initiated', plan: 'pro', interval: 'month', source: 'out_of_hearts' }); handleClose(); }}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-primary-200 active:scale-[0.98] flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white"
              >
                <Sparkles className="w-4 h-4" />
                Get Unlimited Hearts
              </Link>

              <p className="text-center text-xs text-gray-400 mt-3">
                Pro members never run out of hearts
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
