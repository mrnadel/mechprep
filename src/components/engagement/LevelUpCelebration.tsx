'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { LevelReward } from '@/data/level-rewards';
import { levels } from '@/data/levels';

interface Props {
  reward: LevelReward;
  onClose: () => void;
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.5,
  size: 4 + Math.random() * 6,
  color: ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#06B6D4'][i % 6],
}));

export function LevelUpCelebration({ reward, onClose }: Props) {
  const levelDef = levels.find((l) => l.level === reward.level);
  const isMilestone = reward.isMilestone;

  const bgGradient = isMilestone
    ? 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)'
    : 'linear-gradient(135deg, #1E293B 0%, #334155 100%)';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.7)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: '-10px',
                width: p.size,
                height: p.size,
                background: p.color,
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: '110vh',
                opacity: [1, 1, 0.5, 0],
                rotate: 360 + Math.random() * 360,
              }}
              transition={{
                delay: p.delay,
                duration: 2.5 + Math.random(),
                ease: 'easeIn',
              }}
            />
          ))}
        </div>

        {/* Card */}
        <motion.div
          className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="level-up-title"
          style={{ background: bgGradient }}
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Glow ring behind icon */}
          {isMilestone && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: 28,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          <div className="relative flex flex-col items-center px-8 pt-10 pb-8">
            {/* Level badge */}
            <motion.div
              className="flex items-center justify-center rounded-full mb-2"
              style={{
                width: 88,
                height: 88,
                background: isMilestone
                  ? 'linear-gradient(135deg, #FBBF24, #F59E0B)'
                  : 'rgba(255,255,255,0.1)',
                border: isMilestone ? '3px solid #FDE68A' : '3px solid rgba(255,255,255,0.2)',
                fontSize: 42,
              }}
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.15 }}
            >
              <motion.span
                style={{ display: 'inline-block' }}
                animate={isMilestone ? { rotate: [0, -8, 8, -4, 4, 0] } : undefined}
                transition={isMilestone ? { duration: 1, delay: 0.5 } : undefined}
              >
                {levelDef?.icon ?? '⭐'}
              </motion.span>
            </motion.div>

            {/* "Level Up!" label */}
            <motion.div
              className="px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-3"
              style={{
                background: isMilestone ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.1)',
                color: isMilestone ? '#FDE68A' : 'rgba(255,255,255,0.7)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Level Up!
            </motion.div>

            {/* Level number & title */}
            <motion.h2
              id="level-up-title"
              className="text-3xl font-black text-white mb-1 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Level {reward.level}
            </motion.h2>

            <motion.p
              className="text-base font-bold mb-5 text-center"
              style={{ color: isMilestone ? '#FDE68A' : 'rgba(255,255,255,0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {levelDef?.title ?? 'Engineer'}
            </motion.p>

            {/* Message */}
            <motion.p
              className="text-sm font-semibold text-center mb-5"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {reward.message}
            </motion.p>

            {/* Rewards section */}
            <motion.div
              className="w-full rounded-2xl p-4 mb-6"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p
                className="text-[10px] font-extrabold uppercase tracking-widest text-center mb-3"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Rewards
              </p>

              <div className="flex flex-col gap-2.5">
                {/* Gem reward (always) */}
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">💎</span>
                  <span className="text-base font-extrabold" style={{ color: '#A78BFA' }}>
                    +{reward.gems} gems
                  </span>
                </div>

                {/* Streak freeze */}
                {reward.streakFreeze && (
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🧊</span>
                    <span className="text-base font-extrabold" style={{ color: '#67E8F9' }}>
                      Free Streak Freeze
                    </span>
                  </div>
                )}

                {/* Title unlock */}
                {reward.title && (
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🏷️</span>
                    <span className="text-base font-extrabold" style={{ color: '#FDE68A' }}>
                      Title: &ldquo;{reward.title}&rdquo;
                    </span>
                  </div>
                )}

                {/* Frame unlock */}
                {reward.frame && (
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🖼️</span>
                    <span className="text-base font-extrabold" style={{ color: '#86EFAC' }}>
                      Exclusive Profile Frame
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Continue button */}
            <motion.button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-wide transition-transform active:scale-[0.97]"
              style={{
                background: isMilestone
                  ? 'linear-gradient(135deg, #FBBF24, #F59E0B)'
                  : '#4F46E5',
                color: isMilestone ? '#1E1B4B' : '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Claim & Continue
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
