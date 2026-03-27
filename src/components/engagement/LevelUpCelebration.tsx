'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { LevelReward } from '@/data/level-rewards';
import { levels } from '@/data/levels';
import { LevelBadge } from '@/components/engagement/LevelBadge';
import { Gem, Snowflake, Tag, Image as ImageIcon, Star } from 'lucide-react';
import { GameButton } from '@/components/ui/GameButton';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

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
        className="fixed inset-0 z-50 flex items-center justify-center sm:p-4"
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
              style={{ left: `${p.x}%`, top: '-10px', width: p.size, height: p.size, background: p.color }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{ y: '110vh', opacity: [1, 1, 0.5, 0], rotate: 360 + Math.random() * 360 }}
              transition={{ delay: p.delay, duration: 2.5 + Math.random(), ease: 'easeIn' }}
            />
          ))}
        </div>

        {/* Card */}
        <motion.div
          className="relative w-full h-full sm:h-auto sm:max-w-sm sm:rounded-3xl overflow-y-auto sm:shadow-2xl flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="level-up-title"
          style={{ background: bgGradient }}
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <FloatingParticles color="rgba(255,255,255,0.2)" intensity="celebration" />

          {/* Glow ring for milestones */}
          {isMilestone && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-0"
              style={{
                top: '30%',
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Content — centered */}
          <div className="flex-1 flex flex-col items-center sm:flex-initial relative z-[1] px-8 pt-[15vh] sm:pt-10 pb-6">
            {/* Level badge */}
            <motion.div
              className="flex items-center justify-center rounded-full mb-3"
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
                {levelDef ? <LevelBadge level={levelDef} size={56} /> : <Star className="w-10 h-10 text-amber-400" />}
              </motion.span>
            </motion.div>

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
              style={{ color: isMilestone ? '#FDE68A' : 'rgba(255,255,255,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {levelDef?.title ?? 'Engineer'}
            </motion.p>

            {/* Rewards — compact inline */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Gem className="w-5 h-5" style={{ color: '#A78BFA' }} />
                <span className="text-base font-extrabold" style={{ color: '#A78BFA' }}>+{reward.gems} gems</span>
              </div>
              {reward.streakFreeze && (
                <div className="flex items-center gap-2">
                  <Snowflake className="w-5 h-5" style={{ color: '#67E8F9' }} />
                  <span className="text-base font-extrabold" style={{ color: '#67E8F9' }}>+1 Streak Freeze</span>
                </div>
              )}
              {reward.title && (
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5" style={{ color: '#FDE68A' }} />
                  <span className="text-base font-extrabold" style={{ color: '#FDE68A' }}>Title: &ldquo;{reward.title}&rdquo;</span>
                </div>
              )}
              {reward.frame && (
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" style={{ color: '#86EFAC' }} />
                  <span className="text-base font-extrabold" style={{ color: '#86EFAC' }}>Profile Frame</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer — pinned bottom */}
          <div className="shrink-0 px-8 pb-8 sm:pb-6 relative z-[1]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GameButton variant={isMilestone ? 'goldDark' : 'indigo'} onClick={onClose}>
                Claim &amp; Continue
              </GameButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
