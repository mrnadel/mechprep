'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '@/lib/sounds';
import { useEngagementStore, useComeback } from '@/store/useEngagementStore';
import { comebackQuests } from '@/data/quests';
import { CurrencyIcon } from '@/components/ui/CurrencyIcon';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';

export function WelcomeBack() {
  const comeback = useComeback();

  const dismiss = () => {
    useEngagementStore.setState((s) => ({
      comeback: { ...s.comeback, isInComebackFlow: false, lastDismissedDate: new Date().toISOString().split('T')[0] },
    }));
  };

  const shouldShow = comeback.isInComebackFlow && comeback.comebackQuestsCompleted === 0;
  useEffect(() => { if (shouldShow) playSound('welcomeBack'); }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <FullScreenModal
      show
      bg="#235390"
      fx="snow"
      labelId="welcome-back-title"
      footer={<GameButton variant="gold" onClick={dismiss}>Let&apos;s Go!</GameButton>}
    >
      <motion.div
        className="mb-3"
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <MascotWithGlow pose="sleeping" size={140} />
      </motion.div>

      <h2 id="welcome-back-title" className="text-[26px] font-extrabold text-white mb-1">
        Welcome back!
      </h2>
      <p className="text-sm text-white/50 mb-5">We missed you.</p>

      <div className="w-full space-y-3">
        <div className="w-full px-4 py-3 rounded-2xl bg-white/10 text-center">
          <span className="text-sm font-semibold text-white/70">
            You&apos;ve been away for{' '}
            <span className="font-extrabold text-white">{comeback.daysAway} days</span>
          </span>
        </div>

        <div className="w-full">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40 mb-2">
            Comeback quests
          </p>
          <div className="space-y-2">
            {comebackQuests.map((quest) => (
              <div
                key={quest.id}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10"
              >
                <span className="text-xl">{quest.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{quest.title}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0 bg-white/15 text-white">
                  <CurrencyIcon size={12} />
                  <span>{quest.reward.gems}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FullScreenModal>
  );
}
