'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { StreakMilestoneDefinition } from '@/data/engagement-types';
import { streakMilestones } from '@/data/streak-milestones';
import { GameButton } from '@/components/ui/GameButton';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

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

function getNextMilestone(current: StreakMilestoneDefinition): StreakMilestoneDefinition | null {
  const idx = streakMilestones.findIndex((m) => m.days === current.days);
  if (idx === -1 || idx >= streakMilestones.length - 1) return null;
  return streakMilestones[idx + 1];
}

export function StreakMilestone({ milestone, onClose }: Props) {
  const next = getNextMilestone(milestone);

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

        {/* Main card */}
        <motion.div
          className="relative bg-[#FFFBF0] w-full h-full sm:h-auto sm:max-w-sm sm:rounded-2xl sm:shadow-2xl overflow-y-auto flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="streak-milestone-title"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          <FloatingParticles color="rgba(245,158,11,0.35)" count={6} />

          {/* Content — centered */}
          <div className="flex-1 flex flex-col items-center justify-center sm:flex-initial relative z-[1] p-8 text-center">
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 text-5xl"
              style={{ background: '#FEF3C7' }}
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
            >
              {milestone.badgeIcon}
            </motion.div>

            <div
              className="inline-block px-3 py-1 rounded-full text-sm font-extrabold mb-3"
              style={{ background: '#FEF3C7', color: '#D97706' }}
            >
              🔥 {milestone.days}-Day Streak!
            </div>

            <h2 id="streak-milestone-title" className="text-2xl font-extrabold text-gray-900 mb-2">
              {milestone.badgeName}
            </h2>

            <div className="flex items-center justify-center gap-1.5">
              <span className="text-base">💎</span>
              <span className="text-lg font-extrabold" style={{ color: '#7C3AED' }}>+{milestone.gems}</span>
              <span className="text-sm text-gray-500 font-semibold">gems</span>
            </div>

            {(milestone.hasFrame || milestone.hasTitle) && (
              <div className="flex flex-col gap-1 mt-4 px-4 py-3 rounded-xl w-full max-w-[280px]" style={{ background: '#F0FDF4' }}>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Unlocked</p>
                {milestone.hasTitle && milestone.titleText && (
                  <p className="text-sm font-semibold text-emerald-800">🏷️ Title: &quot;{milestone.titleText}&quot;</p>
                )}
                {milestone.hasFrame && (
                  <p className="text-sm font-semibold text-emerald-800">🖼️ Profile Frame</p>
                )}
              </div>
            )}

            {next && (
              <p className="text-xs text-gray-400 mt-4">
                Next: <span className="font-bold text-gray-600">{next.badgeName}</span> at {next.days} days
              </p>
            )}
          </div>

          {/* Footer — pinned bottom */}
          <div className="shrink-0 px-6 pb-8 sm:pb-5 relative z-[1]">
            <GameButton variant="indigo" onClick={onClose}>Continue</GameButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
