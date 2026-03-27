'use client';

import { motion } from 'framer-motion';
import { Gem, Snowflake, Tag, Image as ImageIcon, Star } from 'lucide-react';
import type { LevelReward } from '@/data/level-rewards';
import { levels } from '@/data/levels';
import { LevelBadge } from '@/components/engagement/LevelBadge';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';

interface Props { reward: LevelReward; onClose: () => void; }

export function LevelUpCelebration({ reward, onClose }: Props) {
  const levelDef = levels.find((l) => l.level === reward.level);
  const isMilestone = reward.isMilestone;

  return (
    <FullScreenModal
      show
      bg={isMilestone ? '#5B4FCF' : '#3C4D6B'}
      fx={isMilestone ? 'stars' : 'sparkles'}
      labelId="level-up-title"
      footer={
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <GameButton variant={isMilestone ? 'goldDark' : 'indigo'} onClick={onClose}>Claim &amp; Continue</GameButton>
        </motion.div>
      }
    >
      <motion.div className="flex items-center justify-center rounded-full mb-3"
        style={{ width: 88, height: 88, background: isMilestone ? 'linear-gradient(135deg, #FBBF24, #F59E0B)' : 'rgba(255,255,255,0.1)', border: isMilestone ? '3px solid #FDE68A' : '3px solid rgba(255,255,255,0.2)', fontSize: 42 }}
        initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.15 }}>
        <motion.span style={{ display: 'inline-block' }} animate={isMilestone ? { rotate: [0, -8, 8, -4, 4, 0] } : undefined} transition={isMilestone ? { duration: 1, delay: 0.5 } : undefined}>
          {levelDef ? <LevelBadge level={levelDef} size={56} /> : <Star className="w-10 h-10 text-amber-400" />}
        </motion.span>
      </motion.div>

      <motion.h2 id="level-up-title" className="text-3xl font-black text-white mb-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>Level {reward.level}</motion.h2>
      <motion.p className="text-base font-bold mb-5" style={{ color: isMilestone ? '#FDE68A' : 'rgba(255,255,255,0.5)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>{levelDef?.title ?? 'Engineer'}</motion.p>

      <motion.div className="flex flex-col items-center gap-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center gap-2"><Gem className="w-5 h-5" style={{ color: '#A78BFA' }} /><span className="text-base font-extrabold" style={{ color: '#A78BFA' }}>+{reward.gems} gems</span></div>
        {reward.streakFreeze && <div className="flex items-center gap-2"><Snowflake className="w-5 h-5" style={{ color: '#67E8F9' }} /><span className="text-base font-extrabold" style={{ color: '#67E8F9' }}>+1 Streak Freeze</span></div>}
        {reward.title && <div className="flex items-center gap-2"><Tag className="w-5 h-5" style={{ color: '#FDE68A' }} /><span className="text-base font-extrabold" style={{ color: '#FDE68A' }}>Title: &ldquo;{reward.title}&rdquo;</span></div>}
        {reward.frame && <div className="flex items-center gap-2"><ImageIcon className="w-5 h-5" style={{ color: '#86EFAC' }} /><span className="text-base font-extrabold" style={{ color: '#86EFAC' }}>Profile Frame</span></div>}
      </motion.div>
    </FullScreenModal>
  );
}
