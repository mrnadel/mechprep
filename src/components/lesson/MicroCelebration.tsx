'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mascot, type MascotPose } from '@/components/ui/Mascot';
import { CharacterAvatar } from '@/components/ui/CharacterAvatar';
import { playSound } from '@/lib/sounds';

export type CelebrationType = 'halfway' | 'last-question' | 'streak';

interface MicroCelebrationProps {
  type: CelebrationType;
  streakCount?: number;
  /** Called when the toast auto-dismisses */
  onDismiss?: () => void;
  characterId?: string | null;
  characterLine?: string | null;
}

interface CelebrationConfig {
  pose: MascotPose;
  text: string;
  gradient: string;
  borderColor: string;
  textColor: string;
}

function getCelebrationConfig(type: CelebrationType, streakCount?: number): CelebrationConfig {
  switch (type) {
    case 'halfway':
      return {
        pose: 'winking',
        text: 'Halfway there!',
        gradient: 'linear-gradient(135deg, #DBEAFE, #BFDBFE)',
        borderColor: '#3B82F6',
        textColor: '#1E40AF',
      };
    case 'last-question':
      return {
        pose: 'almost-there',
        text: 'Final question — you got this!',
        gradient: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
        borderColor: '#F59E0B',
        textColor: '#92400E',
      };
    case 'streak': {
      const n = streakCount ?? 3;
      if (n >= 5) {
        return {
          pose: 'champion',
          text: `${n} streak! Unstoppable!`,
          gradient: 'linear-gradient(135deg, #FFE4E6, #FECDD3)',
          borderColor: '#F43F5E',
          textColor: '#9F1239',
        };
      }
      if (n === 4) {
        return {
          pose: 'on-fire',
          text: '4 in a row!',
          gradient: 'linear-gradient(135deg, #FFE4E6, #FECDD3)',
          borderColor: '#F43F5E',
          textColor: '#9F1239',
        };
      }
      // n === 3
      return {
        pose: 'on-fire',
        text: '3 in a row — on fire!',
        gradient: 'linear-gradient(135deg, #FFE4E6, #FECDD3)',
        borderColor: '#F43F5E',
        textColor: '#9F1239',
      };
    }
  }
}

function getAriaLabel(type: CelebrationType, streakCount?: number): string {
  switch (type) {
    case 'halfway':
      return 'Halfway through the lesson';
    case 'last-question':
      return 'This is the final question';
    case 'streak':
      return `${streakCount ?? 3} correct answers in a row`;
  }
}

const AUTO_DISMISS_MS = 2500;

export function MicroCelebration({ type, streakCount, onDismiss, characterId, characterLine }: MicroCelebrationProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const config = getCelebrationConfig(type, streakCount);

  // Play sound on mount
  useEffect(() => {
    if (type === 'streak') {
      playSound('streak');
    } else {
      playSound('toast');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-dismiss after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, []);

  // Notify parent after exit animation completes
  const handleExitComplete = () => {
    onDismiss?.();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label={getAriaLabel(type, streakCount)}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.9 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.9 }}
          transition={reducedMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-center gap-3 rounded-2xl px-4 py-3 mx-4 mb-3"
          style={{
            background: config.gradient,
            border: `2px solid ${config.borderColor}`,
          }}
        >
          {characterId ? (
            <CharacterAvatar characterId={characterId} size={36} />
          ) : (
            <Mascot pose={config.pose} size={36} />
          )}
          <span
            className="text-sm font-bold"
            style={{ color: config.textColor }}
          >
            {characterLine || config.text}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
