'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useHeartsStore } from '@/store/useHeartsStore';
import { analytics } from '@/lib/mixpanel';
import { GameButton } from '@/components/ui/GameButton';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

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

  useEffect(() => {
    if (isOpen) analytics.feature('hearts_depleted', {});
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const tick = () => {
      rechargeHearts();
      setCountdown(formatCountdown(getTimeUntilNextHeart()));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isOpen, getTimeUntilNextHeart, rechargeHearts]);

  useEffect(() => {
    if (isOpen && current > 0) onClose();
  }, [isOpen, current, onClose]);

  const handleClose = useCallback(() => onClose(), [onClose]);

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
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative bg-gradient-to-b from-red-500 to-red-600 w-full h-full sm:h-auto sm:max-w-md sm:mx-4 sm:rounded-2xl overflow-y-auto sm:shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="out-of-hearts-title"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <FloatingParticles color="rgba(255,255,255,0.15)" count={6} />

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            {/* Content — centered */}
            <div className="flex-1 flex flex-col items-center justify-center sm:flex-initial relative z-[1] text-center text-white px-5">
              <div className="flex justify-center mb-4">
                <svg className="w-20 h-20 text-white opacity-90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3 id="out-of-hearts-title" className="text-2xl font-extrabold mb-6">Out of Hearts</h3>

              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-5">
                <p className="text-xs font-semibold text-white/60 mb-1">Next heart in</p>
                <p className="text-4xl font-extrabold text-white tabular-nums">{countdown}</p>
              </div>
            </div>

            {/* Footer — pinned bottom */}
            <div className="shrink-0 px-5 pb-8 sm:pb-5 relative z-[1]">
              <Link
                href="/pricing"
                onClick={() => { analytics.subscription({ action: 'checkout_initiated', plan: 'pro', interval: 'month', source: 'out_of_hearts' }); handleClose(); }}
              >
                <GameButton variant="gold" className="pointer-events-none">
                  Get Unlimited Hearts
                </GameButton>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
