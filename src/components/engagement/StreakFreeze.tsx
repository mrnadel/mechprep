'use client';

import { motion } from 'framer-motion';
import { X, Gem, Snowflake } from 'lucide-react';
import {
  useEngagementStore,
  useStreakEnhancements,
  useGems,
  useComeback,
  useEngagementActions,
} from '@/store/useEngagementStore';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';

const REPAIR_COST = 50;

export function StreakFreeze() {
  const streak = useStreakEnhancements();
  const gems = useGems();
  const comeback = useComeback();
  const { repairStreak } = useEngagementActions();

  const dismissFreezeBanner = () => {
    useEngagementStore.setState((s) => ({ streak: { ...s.streak, freezeUsedToday: false } }));
  };
  const dismissRepairModal = () => {
    useEngagementStore.setState((s) => ({ streak: { ...s.streak, repairAvailable: false } }));
  };

  // Mode 1: Banner
  if (streak.freezeUsedToday) {
    return (
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl"
        style={{ background: '#DBEAFE', border: '1px solid #93C5FD' }}>
        <span className="text-sm font-semibold" style={{ color: '#1D4ED8' }}>
          <Snowflake className="w-4 h-4 inline mr-1" /> Your streak freeze saved your streak yesterday!
        </span>
        <button onClick={dismissFreezeBanner} className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#3B82F6' }} aria-label="Dismiss">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  // Mode 2: Repair modal — only show if there was an actual streak to repair
  if (streak.repairAvailable && streak.lastStreakValueBeforeBreak > 0) {
    const canAfford = gems.balance >= REPAIR_COST;
    const gemsNeeded = REPAIR_COST - gems.balance;
    const handleRepair = () => { if (repairStreak()) dismissRepairModal(); };

    return (
      <FullScreenModal
        show
        bg="#7B61D9"
        fx="bokeh"
        footer={
          <>
            <GameButton variant="purple" onClick={handleRepair} disabled={!canAfford}>
              {canAfford ? 'Repair Streak' : `Need ${gemsNeeded} more gems`}
            </GameButton>
            <button onClick={dismissRepairModal} className="w-full py-2.5 mt-2 rounded-xl text-sm font-semibold text-white/60 hover:text-white/80 transition-colors" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Skip</button>
          </>
        }
      >
        <motion.div className="mb-4" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}>
          <MascotWithGlow pose="worried" size={150} />
        </motion.div>
        <h2 className="text-[26px] font-extrabold text-white mb-1">Your streak broke!</h2>
        <p className="text-sm text-white/60 mb-5">You had a <span className="font-bold text-white">{streak.lastStreakValueBeforeBreak}-day streak</span></p>
        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/15">
          <Gem className="w-5 h-5 text-white/80" />
          <span className="text-xl font-extrabold text-white">{REPAIR_COST}</span>
          <span className="text-sm font-semibold text-white/60">to repair</span>
        </div>
      </FullScreenModal>
    );
  }

  return null;
}
