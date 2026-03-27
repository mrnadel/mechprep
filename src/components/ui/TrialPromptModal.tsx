'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';
import { analytics } from '@/lib/mixpanel';
import { GameButton } from '@/components/ui/GameButton';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

const SHOWN_KEY = 'mechready-trial-prompt-shown';

export function TrialPromptModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isProUser } = useSubscription();

  useEffect(() => {
    if (isProUser) return;
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(SHOWN_KEY)) return;
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
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative bg-gradient-to-b from-indigo-500 to-indigo-600 w-full h-full sm:h-auto sm:max-w-md sm:mx-4 sm:rounded-2xl overflow-y-auto sm:shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trial-prompt-title"
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <FloatingParticles color="rgba(255,255,255,0.2)" intensity="normal" drift />

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            {/* Content — centered */}
            <div className="flex-1 flex flex-col justify-center sm:flex-initial relative z-[1]">
              <div className="px-5 pt-8 pb-5 text-center">
                <motion.div
                  className="flex items-center justify-center mx-auto mb-4"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img src="/badges/crown.png" alt="" width={72} height={72} draggable={false} />
                </motion.div>
                <h3 id="trial-prompt-title" className="text-2xl font-extrabold text-white">
                  Try Pro Free
                </h3>
                <p className="text-sm text-white/60 mt-1">7 days, cancel anytime</p>
              </div>

              <div className="px-5 py-4 space-y-3">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">Unlimited hearts</p>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">Streak freeze protection</p>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white">2x XP on weekends</p>
                </div>
              </div>
            </div>

            {/* Footer — pinned bottom */}
            <div className="shrink-0 px-5 pb-8 sm:pb-5 relative z-[1]">
              <Link
                href="/pricing"
                onClick={() => {
                  analytics.subscription({ action: 'checkout_initiated', plan: 'pro', interval: 'month', source: 'trial_prompt' });
                  handleClose();
                }}
              >
                <GameButton variant="gold" className="pointer-events-none">
                  <Sparkles className="w-4 h-4" />
                  Try Pro Free for 7 Days
                </GameButton>
              </Link>
              <button
                onClick={handleClose}
                className="w-full text-center text-xs text-white/50 hover:text-white/70 mt-3 py-2 transition-colors"
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
