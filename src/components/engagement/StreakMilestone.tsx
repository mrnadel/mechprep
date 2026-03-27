'use client';

import { type ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Gem, Tag, Image as ImageIcon } from 'lucide-react';
import type { StreakMilestoneDefinition } from '@/data/engagement-types';
import { streakMilestones } from '@/data/streak-milestones';
import { GameButton } from '@/components/ui/GameButton';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { Mascot } from '@/components/ui/Mascot';
import {
  WeekWarriorIcon,
  FortnightFocusIcon,
  IronWillIcon,
  DiamondDedicationIcon,
  CenturionStreakIcon,
} from '@/components/icons/StreakIcons';

interface Props {
  milestone: StreakMilestoneDefinition;
  onClose: () => void;
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.6,
  color: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'][i % 5],
}));

const streakBadgeIcons: Record<number, ComponentType<{ size?: number; className?: string }>> = {
  7: WeekWarriorIcon,
  14: FortnightFocusIcon,
  30: IronWillIcon,
  60: DiamondDedicationIcon,
  100: CenturionStreakIcon,
};

function getNextMilestone(current: StreakMilestoneDefinition): StreakMilestoneDefinition | null {
  const idx = streakMilestones.findIndex((m) => m.days === current.days);
  if (idx === -1 || idx >= streakMilestones.length - 1) return null;
  return streakMilestones[idx + 1];
}

export function StreakMilestone({ milestone, onClose }: Props) {
  const next = getNextMilestone(milestone);
  const BadgeIcon = streakBadgeIcons[milestone.days] ?? WeekWarriorIcon;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center sm:p-4"
        style={{ background: 'rgba(0,0,0,0.6)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Confetti particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 rounded-full"
              style={{ left: `${p.x}%`, top: '-8px', background: p.color }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: '110vh', opacity: [1, 1, 0] }}
              transition={{ delay: p.delay, duration: 2.2, ease: 'easeIn' }}
            />
          ))}
        </div>

        <motion.div
          className="relative bg-[#E8850C] w-full h-full sm:h-auto sm:max-w-sm sm:rounded-2xl sm:shadow-2xl overflow-y-auto flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="streak-milestone-title"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          <FloatingParticles color="rgba(255,255,255,0.05)" intensity="subtle" />

          <div className="flex-1 flex flex-col items-center sm:flex-initial relative z-[1] px-8 pt-[15vh] sm:pt-10 text-center text-white">
            <motion.div
              className="relative inline-flex items-center justify-center w-28 h-28 rounded-full mb-3"
              style={{ background: 'rgba(255,255,255,0.2)' }}
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 }}
            >
              <motion.div
                className="absolute inset-[-12px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <BadgeIcon size={64} />
            </motion.div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-extrabold mb-3 bg-white/20 text-white">
              <Flame className="w-4 h-4" />
              {milestone.days}-Day Streak!
            </div>

            <h2 id="streak-milestone-title" className="text-[26px] font-extrabold text-white mb-2">
              {milestone.badgeName}
            </h2>

            <div className="flex items-center justify-center gap-1.5">
              <Gem className="w-4 h-4 text-white/80" />
              <span className="text-lg font-extrabold text-white">+{milestone.gems}</span>
              <span className="text-sm text-white/60 font-semibold">gems</span>
            </div>

            {(milestone.hasFrame || milestone.hasTitle) && (
              <div className="flex flex-col gap-1 mt-4 px-4 py-3 rounded-xl w-full max-w-[280px] bg-white/15 backdrop-blur-sm">
                <p className="text-xs font-bold text-white/70 uppercase tracking-wide">Unlocked</p>
                {milestone.hasTitle && milestone.titleText && (
                  <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Title: &quot;{milestone.titleText}&quot;
                  </p>
                )}
                {milestone.hasFrame && (
                  <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" /> Profile Frame
                  </p>
                )}
              </div>
            )}

            {next && (
              <p className="text-xs text-white/50 mt-4">
                Next: <span className="font-bold text-white/80">{next.badgeName}</span> at {next.days} days
              </p>
            )}
          </div>

          <div className="shrink-0 px-6 pb-8 sm:pb-5 relative z-[1]">
            <GameButton variant="gold" onClick={onClose}>Continue</GameButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
