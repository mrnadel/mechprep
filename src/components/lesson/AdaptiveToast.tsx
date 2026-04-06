'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mascot, type MascotPose } from '@/components/ui/Mascot';

export type AdaptiveMode = 'normal' | 'struggling' | 'cruising';

const MESSAGES: Record<Exclude<AdaptiveMode, 'normal'>, { pose: MascotPose; text: string }[]> = {
  struggling: [
    { pose: 'excited', text: 'You got this! Take your time.' },
    { pose: 'torch', text: "Keep going, you're learning!" },
    { pose: 'winking', text: 'Mistakes help you grow!' },
  ],
  cruising: [
    { pose: 'on-fire', text: "You're on fire! Bonus XP!" },
    { pose: 'champion', text: 'Perfect streak! 1.5x XP!' },
    { pose: 'celebrating', text: 'Unstoppable! Bonus round!' },
  ],
};

function pickMessage(mode: Exclude<AdaptiveMode, 'normal'>, seed: number) {
  const msgs = MESSAGES[mode];
  return msgs[seed % msgs.length];
}

interface AdaptiveToastProps {
  mode: AdaptiveMode;
  /** Used to pick a varied message */
  seed?: number;
}

export function AdaptiveToast({ mode, seed = 0 }: AdaptiveToastProps) {
  const visible = mode !== 'normal';
  const msg = visible ? pickMessage(mode as Exclude<AdaptiveMode, 'normal'>, seed) : null;

  return (
    <AnimatePresence>
      {visible && msg && (
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-center gap-3 rounded-2xl px-4 py-3 mx-4 mb-3"
          style={{
            background: mode === 'struggling'
              ? 'linear-gradient(135deg, #FEF3C7, #FDE68A)'
              : 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
            border: mode === 'struggling'
              ? '2px solid #F59E0B'
              : '2px solid #10B981',
          }}
        >
          <Mascot pose={msg.pose} size={36} />
          <span
            className="text-sm font-bold"
            style={{ color: mode === 'struggling' ? '#92400E' : '#065F46' }}
          >
            {msg.text}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
