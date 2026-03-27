'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';
import { analytics } from '@/lib/mixpanel';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';

const SHOWN_KEY = 'mechready-trial-prompt-shown';

export function TrialPromptModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isProUser } = useSubscription();

  useEffect(() => {
    if (isProUser || typeof window === 'undefined' || localStorage.getItem(SHOWN_KEY)) return;
    const timer = setTimeout(() => { setIsOpen(true); localStorage.setItem(SHOWN_KEY, '1'); analytics.feature('trial_prompt_shown', {}); }, 2500);
    return () => clearTimeout(timer);
  }, [isProUser]);

  const handleClose = () => setIsOpen(false);

  return (
    <FullScreenModal
      show={isOpen}
      bg="#5B4FCF"
      fx="sparkle-dust"
      closable
      onClose={handleClose}
      labelId="trial-prompt-title"
      footer={
        <>
          <Link href="/pricing" onClick={() => { analytics.subscription({ action: 'checkout_initiated', plan: 'pro', interval: 'month', source: 'trial_prompt' }); handleClose(); }}>
            <GameButton variant="gold" className="pointer-events-none"><Sparkles className="w-4 h-4" />Try Pro Free for 7 Days</GameButton>
          </Link>
          <button onClick={handleClose} className="w-full text-center text-xs text-white/50 hover:text-white/70 mt-3 py-2 transition-colors">Maybe later</button>
        </>
      }
    >
      <motion.div className="mb-5" animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <MascotWithGlow pose="pro" size={160} />
      </motion.div>
      <h3 id="trial-prompt-title" className="text-[26px] font-extrabold text-white">Try Pro Free</h3>
      <p className="text-sm text-white/50 mt-1 mb-8">7 days, cancel anytime</p>
      <div className="w-full space-y-3">
        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0"><Heart className="w-5 h-5 text-white" /></div>
          <p className="text-[15px] font-bold text-white">Unlimited hearts</p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0"><Shield className="w-5 h-5 text-white" /></div>
          <p className="text-[15px] font-bold text-white">Streak freeze</p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0"><Zap className="w-5 h-5 text-white" /></div>
          <p className="text-[15px] font-bold text-white">2x XP on weekends</p>
        </div>
      </div>
    </FullScreenModal>
  );
}
