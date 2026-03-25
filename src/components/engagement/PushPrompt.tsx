'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useStore } from '@/store/useStore';

const DISMISSED_KEY = 'push-prompt-dismissed';
const MIN_LESSONS_BEFORE_PROMPT = 2;

/**
 * Shows a push notification opt-in prompt after the user completes
 * a few lessons. Dismissed state persists in localStorage.
 */
export function PushPrompt() {
  const { state, subscribe } = usePushNotifications();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  const totalQuestions = useStore((s) => s.progress.totalQuestionsAttempted);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wasDismissed = localStorage.getItem(DISMISSED_KEY);
    setDismissed(!!wasDismissed);
  }, []);

  useEffect(() => {
    // Show prompt after a few lessons, only if permission not yet decided
    if (
      state === 'prompt' &&
      !dismissed &&
      totalQuestions >= MIN_LESSONS_BEFORE_PROMPT * 5 // ~5 questions per lesson
    ) {
      // Small delay so it doesn't feel aggressive
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [state, dismissed, totalQuestions]);

  const handleEnable = async () => {
    const ok = await subscribe();
    if (ok) {
      setVisible(false);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem(DISMISSED_KEY, '1');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-sm md:bottom-6 md:left-auto md:right-6"
        >
          <div className="relative rounded-2xl border-2 border-[#E5E5E5] bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFB800]/15">
                <Bell size={20} className="text-[#FFB800]" />
              </div>

              <div className="flex-1 pr-4">
                <p className="text-sm font-extrabold text-gray-800">
                  Protect your streak
                </p>
                <p className="mt-0.5 text-xs font-semibold text-gray-400">
                  Get a reminder before your streak breaks. One notification per day, max.
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={handleEnable}
                    className="rounded-xl bg-[#FFB800] px-4 py-2 text-xs font-extrabold text-white shadow-[0_3px_0_#D49A00] transition-all hover:brightness-105 active:translate-y-[1px] active:shadow-[0_1px_0_#D49A00]"
                  >
                    Enable
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="rounded-xl px-4 py-2 text-xs font-bold text-gray-400 hover:bg-gray-50"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
