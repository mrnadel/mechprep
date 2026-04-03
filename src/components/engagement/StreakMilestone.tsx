'use client';

import { type ComponentType, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '@/lib/sounds';
import { Tag, Image as ImageIcon } from 'lucide-react';
import { CurrencyIcon } from '@/components/ui/CurrencyIcon';
import { CURRENCY } from '@/data/currency';
import { StreakFlame } from '@/components/icons/StreakFlame';
import type { StreakMilestoneDefinition } from '@/data/engagement-types';
import { streakMilestones } from '@/data/streak-milestones';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { Mascot } from '@/components/ui/Mascot';
import {
  WeekWarriorIcon, FortnightFocusIcon, IronWillIcon, DiamondDedicationIcon, CenturionStreakIcon,
} from '@/components/icons/StreakIcons';

interface Props { milestone: StreakMilestoneDefinition; onClose: () => void; }

const streakBadgeIcons: Record<number, ComponentType<{ size?: number; className?: string }>> = {
  7: WeekWarriorIcon, 14: FortnightFocusIcon, 30: IronWillIcon, 60: DiamondDedicationIcon, 100: CenturionStreakIcon,
};

function getNextMilestone(current: StreakMilestoneDefinition): StreakMilestoneDefinition | null {
  const idx = streakMilestones.findIndex((m) => m.days === current.days);
  if (idx === -1 || idx >= streakMilestones.length - 1) return null;
  return streakMilestones[idx + 1];
}

export function StreakMilestone({ milestone, onClose }: Props) {
  const next = getNextMilestone(milestone);
  const BadgeIcon = streakBadgeIcons[milestone.days] ?? WeekWarriorIcon;
  useEffect(() => { playSound('streakMilestone'); }, []);

  return (
    <FullScreenModal
      show
      bg="#E8850C"
      fx="confetti"
      labelId="streak-milestone-title"
      footer={<GameButton variant="gold" onClick={onClose}>Continue</GameButton>}
    >
      <motion.div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.2)' }}
        initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}>
        <BadgeIcon size={64} />
      </motion.div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-extrabold mb-3 bg-white/20 text-white">
        <StreakFlame state="active" size={16} />{milestone.days}-Day Streak!
      </div>

      <h2 id="streak-milestone-title" className="text-[26px] font-extrabold text-white mb-2">{milestone.badgeName}</h2>

      <div className="flex items-center justify-center gap-1.5">
        <CurrencyIcon size={16} />
        <span className="text-lg font-extrabold text-white">+{milestone.gems}</span>
        <span className="text-sm text-white/60 font-semibold">{CURRENCY.plural}</span>
      </div>

      {(milestone.hasFrame || milestone.hasTitle) && (
        <div className="flex flex-col gap-1 mt-4 px-4 py-3 rounded-xl w-full max-w-[280px] bg-white/15">
          <p className="text-xs font-bold text-white/70 uppercase tracking-wide">Unlocked</p>
          {milestone.hasTitle && milestone.titleText && <p className="text-sm font-semibold text-white flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Title: &quot;{milestone.titleText}&quot;</p>}
          {milestone.hasFrame && <p className="text-sm font-semibold text-white flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> Profile Frame</p>}
        </div>
      )}

      {next && <p className="text-xs text-white/50 mt-4">Next: <span className="font-bold text-white/80">{next.badgeName}</span> at {next.days} days</p>}
    </FullScreenModal>
  );
}
