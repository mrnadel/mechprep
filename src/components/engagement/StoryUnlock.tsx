'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '@/lib/sounds';
import { useBackHandler } from '@/hooks/useBackHandler';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { CoinIcon } from '@/components/ui/CoinIcon';
import type { CharacterArc, StoryUnlockEntry } from '@/data/course/character-arcs';

interface StoryUnlockProps {
  unlock: StoryUnlockEntry;
  character: CharacterArc;
  onDismiss: () => void;
}

/**
 * Full-screen story unlock dialog shown after completing all units in a section.
 * Shows a character avatar, their dialogue, optional callback reference, and gem reward.
 * Matches the celebration pattern used by BlueprintCelebration.
 */
export function StoryUnlock({ unlock, character, onDismiss }: StoryUnlockProps) {
  useBackHandler(true, onDismiss);

  // Play sound on mount
  useEffect(() => {
    playSound('achievement');
  }, []);

  // 1.5s delay before dismiss button becomes active (matches existing celebration pattern)
  const [canDismiss, setCanDismiss] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCanDismiss(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = useCallback(() => {
    if (canDismiss) onDismiss();
  }, [canDismiss, onDismiss]);

  // Reduced motion support
  const motionProps = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.4 },
  });

  return (
    <FullScreenModal
      show
      bg="#1a365d"
      fx="sparkle-dust"
      labelId="story-unlock-title"
      footer={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: canDismiss ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <GameButton variant="gold" onClick={handleDismiss}>
            CONTINUE
          </GameButton>
        </motion.div>
      }
    >
      {/* Character avatar */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
        className="text-[80px] leading-none mb-2"
        aria-hidden="true"
      >
        {character.emoji}
      </motion.div>

      {/* Character name & role */}
      <motion.div {...motionProps(0.3)} className="mb-6">
        <h2
          id="story-unlock-title"
          className="text-xl font-black text-white"
        >
          {character.name}
        </h2>
        <div className="text-xs font-bold tracking-wider uppercase text-white/50">
          {character.role}
        </div>
      </motion.div>

      {/* Callback line (if present) — highlighted quote */}
      {unlock.callbackLine && (
        <motion.div
          {...motionProps(0.5)}
          className="bg-white/10 rounded-xl px-5 py-3 mb-4 max-w-sm mx-auto"
        >
          <p className="text-sm italic text-white/70">
            {unlock.callbackLine}
          </p>
        </motion.div>
      )}

      {/* Dialogue speech bubble */}
      <motion.div
        {...motionProps(0.6)}
        className="bg-white/15 rounded-2xl px-6 py-4 max-w-sm mx-auto mb-6 relative"
      >
        {/* Speech bubble pointer */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/15 rotate-45 rounded-sm"
          aria-hidden="true"
        />
        <p className="text-base text-white leading-relaxed relative z-[1]">
          &ldquo;{unlock.dialogue}&rdquo;
        </p>
      </motion.div>

      {/* Gem reward */}
      {unlock.gemReward && unlock.gemReward > 0 && (
        <motion.div
          {...motionProps(0.8)}
          className="flex items-center justify-center gap-2 text-lg font-black text-brand-300"
        >
          <span>+{unlock.gemReward}</span>
          <CoinIcon size="1.2em" />
        </motion.div>
      )}
    </FullScreenModal>
  );
}
