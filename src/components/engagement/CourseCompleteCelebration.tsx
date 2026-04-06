'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Linkedin } from 'lucide-react';
import { playSound } from '@/lib/sounds';
import { useCourseStore } from '@/store/useCourseStore';
import { useStore } from '@/store/useStore';
import { getUnitTheme } from '@/lib/unitThemes';
import { useBackHandler } from '@/hooks/useBackHandler';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';
import { getProfession } from '@/data/professions';
import { downloadCertificate, shareCertificate, getLinkedInShareUrl } from '@/lib/certificate';

interface Props { onDismiss: () => void; }

export function CourseCompleteCelebration({ onDismiss }: Props) {
  const [canDismiss, setCanDismiss] = useState(false);
  const courseData = useCourseStore((s) => s.courseData);
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const completedLessons = useCourseStore((s) => s.progress.completedLessons);
  const displayName = useStore((s) => s.progress.displayName);

  useEffect(() => { playSound('courseComplete'); }, []);
  useEffect(() => { const t = setTimeout(() => setCanDismiss(true), 1500); return () => clearTimeout(t); }, []);
  useBackHandler(true, () => { if (canDismiss) onDismiss(); });
  const handleDismiss = useCallback(() => { if (canDismiss) onDismiss(); }, [canDismiss, onDismiss]);

  const unitColors = Array.from({ length: 10 }, (_, i) => getUnitTheme(i).color);
  const profession = activeProfession ? getProfession(activeProfession) : null;

  // Calculate readiness score (simplified: average accuracy of completed lessons)
  const score = (() => {
    const accuracies = Object.values(completedLessons)
      .filter((l) => l.passed)
      .map((l) => l.bestAccuracy);
    if (accuracies.length === 0) return 0;
    return Math.round(accuracies.reduce((a, b) => a + b, 0) / accuracies.length);
  })();

  const certParams = {
    name: displayName || 'Learner',
    profession: profession?.name || 'Course',
    professionIcon: profession?.icon || '🎓',
    color: profession?.color || '#6366f1',
    score,
  };

  const handleDownload = useCallback(() => {
    downloadCertificate(certParams);
  }, [certParams]);

  const handleShare = useCallback(() => {
    shareCertificate(certParams);
  }, [certParams]);

  const handleLinkedIn = useCallback(() => {
    const url = getLinkedInShareUrl(certParams, window.location.origin);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [certParams]);

  return (
    <FullScreenModal
      show
      bg="#5B4FCF"
      fx="fireworks"
      footer={
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: canDismiss ? 1 : 0 }} transition={{ duration: 0.4 }} className="space-y-3">
          {/* Certificate action buttons */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 text-white text-xs font-bold hover:bg-white/25 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 text-white text-xs font-bold hover:bg-white/25 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button
              onClick={handleLinkedIn}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A66C2] text-white text-xs font-bold hover:bg-[#004182] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </button>
          </div>
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
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-xs text-white/40 font-semibold">{courseData.length} units completed</motion.p>
    </FullScreenModal>
  );
}
