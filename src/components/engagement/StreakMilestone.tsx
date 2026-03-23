'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { StreakMilestoneDefinition } from '@/data/engagement-types';
import { streakMilestones } from '@/data/streak-milestones';

interface Props {
  milestone: StreakMilestoneDefinition;
  onClose: () => void;
}

// Simple confetti-like particles
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
              style={{
                left: `${p.x}%`,
                top: '-8px',
                background: p.color,
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: '110vh', opacity: [1, 1, 0] }}
              transition={{
                delay: p.delay,
                duration: 2.2,
                ease: 'easeIn',
              }}
            />
          ))}
        </div>

        {/* Main card */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="streak-milestone-title"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          {/* Badge icon */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 text-5xl"
            style={{ background: '#FEF3C7' }}
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          >
            {milestone.badgeIcon}
          </motion.div>

          {/* Streak count */}
          <div
            className="inline-block px-3 py-1 rounded-full text-sm font-extrabold mb-3"
            style={{ background: '#FEF3C7', color: '#D97706' }}
          >
            🔥 {milestone.days}-Day Streak!
          </div>

          {/* Badge name */}
          <h2 id="streak-milestone-title" className="text-2xl font-extrabold text-gray-900 mb-1">
            {milestone.badgeName}
          </h2>

          {/* Gem reward */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <span className="text-base">💎</span>
            <span className="text-lg font-extrabold" style={{ color: '#7C3AED' }}>
              +{milestone.gems}
            </span>
            <span className="text-sm text-gray-500 font-semibold">gems earned</span>
          </div>

          {/* Unlocks */}
          {(milestone.hasFrame || milestone.hasTitle) && (
            <div
              className="flex flex-col gap-1 mb-4 px-4 py-3 rounded-xl"
              style={{ background: '#F0FDF4' }}
            >
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                Unlocked
              </p>
              {milestone.hasTitle && milestone.titleText && (
                <p className="text-sm font-semibold text-emerald-800">
                  🏷️ Title: &quot;{milestone.titleText}&quot;
                </p>
              )}
              {milestone.hasFrame && (
                <p className="text-sm font-semibold text-emerald-800">
                  🖼️ Profile Frame
                </p>
              )}
            </div>
          )}

          {/* Keep going message */}
          <p className="text-sm text-gray-500 mb-1">Keep going!</p>
          {next && (
            <p className="text-xs text-gray-400 mb-6">
              Next milestone: <span className="font-bold text-gray-600">{next.badgeName}</span> at {next.days} days
            </p>
          )}

          {/* Continue button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity"
            style={{ background: '#4F46E5', border: 'none', cursor: 'pointer' }}
          >
            Continue
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
