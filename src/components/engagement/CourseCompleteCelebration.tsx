'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '@/lib/sounds';
import { useCourseStore } from '@/store/useCourseStore';
import { getUnitTheme } from '@/lib/unitThemes';
import { useBackHandler } from '@/hooks/useBackHandler';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';

interface Props { onDismiss: () => void; }

export function CourseCompleteCelebration({ onDismiss }: Props) {
  const [canDismiss, setCanDismiss] = useState(false);
  const courseData = useCourseStore((s) => s.courseData);

  useEffect(() => { playSound('courseComplete'); }, []);
  useEffect(() => { const t = setTimeout(() => setCanDismiss(true), 1500); return () => clearTimeout(t); }, []);
  useBackHandler(true, () => { if (canDismiss) onDismiss(); });
  const handleDismiss = useCallback(() => { if (canDismiss) onDismiss(); }, [canDismiss, onDismiss]);

  const unitColors = Array.from({ length: 10 }, (_, i) => getUnitTheme(i).color);

  return (
    <FullScreenModal
      show
      bg="#5B4FCF"
      fx="fireworks"
      footer={
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: canDismiss ? 1 : 0 }} transition={{ duration: 0.4 }}>
          <GameButton variant="gold" onClick={handleDismiss}>CONTINUE</GameButton>
        </motion.div>
      }
    >
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs font-extrabold tracking-[3px] uppercase text-white/50 mb-2">Course Complete</motion.div>
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[28px] font-black text-white mb-1">The full machine.</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm text-white/50 font-semibold mb-6">Every system you mastered.</motion.p>
      <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.5 }} className="mb-6">
        <MascotWithGlow pose="celebrating" size={180} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex gap-1.5 mb-2">
        {unitColors.map((color, i) => <div key={i} className="w-6 h-6 rounded-full" style={{ background: color }} />)}
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-xs text-white/40 font-semibold">10 units completed</motion.p>
    </FullScreenModal>
  );
}
