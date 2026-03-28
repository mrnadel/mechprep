'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { useBackHandler } from '@/hooks/useBackHandler';
import { useSubscription } from '@/hooks/useSubscription';
import { LIMITS, isUnitUnlocked } from '@/lib/pricing';
import { UpgradeModal } from '@/components/ui/UpgradeModal';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';
import { Mascot } from '@/components/ui/Mascot';

interface BlueprintCelebrationProps { unitIndex: number; isGolden: boolean; onDismiss: () => void; }

export function BlueprintCelebration({ unitIndex, isGolden, onDismiss }: BlueprintCelebrationProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const courseData = useCourseStore((s) => s.courseData);
  const progress = useCourseStore((s) => s.progress);
  const { isProUser } = useSubscription();

  const shouldShowUpgrade = isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex) && !isProUser && !isGolden;

  const chapterStats = useMemo(() => {
    const unit = courseData[unitIndex];
    if (!unit) return { lessons: 0, accuracy: 0, totalXp: 0 };
    let totalAcc = 0, totalXp = 0, count = 0;
    for (const lesson of unit.lessons) {
      const lp = progress.completedLessons[lesson.id];
      if (lp) { totalAcc += lp.bestAccuracy; totalXp += lesson.xpReward * lp.stars; count++; }
    }
    return { lessons: count, accuracy: count > 0 ? Math.round(totalAcc / count) : 0, totalXp };
  }, [courseData, unitIndex, progress]);

  const unitTitle = courseData[unitIndex]?.title ?? 'Chapter';
  useBackHandler(true, onDismiss);

  const [canDismiss, setCanDismiss] = useState(false);
  useEffect(() => { const t = setTimeout(() => setCanDismiss(true), 1500); return () => clearTimeout(t); }, []);
  const handleDismiss = useCallback(() => { if (canDismiss) onDismiss(); }, [canDismiss, onDismiss]);

  return (
    <>
      <FullScreenModal
        show
        bg={isGolden ? '#E8850C' : '#58A700'}
        fx={isGolden ? 'stars' : 'confetti'}
        footer={
          <>
            {shouldShowUpgrade && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mb-3" onClick={(e) => e.stopPropagation()}>
                <GameButton variant="gold" onClick={() => setShowUpgradeModal(true)}>Unlock All Units</GameButton>
              </motion.div>
            )}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: canDismiss ? 1 : 0 }} transition={{ duration: 0.4 }}>
              <GameButton variant={shouldShowUpgrade ? 'indigo' : 'gold'} onClick={handleDismiss}>CONTINUE</GameButton>
            </motion.div>
          </>
        }
      >
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs font-extrabold tracking-[3px] uppercase text-white/50 mb-2">
          {isGolden ? 'Chapter Mastered' : 'Chapter Complete'}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-[28px] font-black text-white mb-6">{unitTitle}</motion.h1>
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.4 }} className="mb-8">
          <MascotWithGlow pose={isGolden ? 'excited' : 'laughing'} size={180} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex gap-8">
          <div className="text-center"><div className="text-xs font-bold tracking-wider uppercase text-white/40 mb-1">Lessons</div><div className="text-2xl font-black">{chapterStats.lessons}</div></div>
          <div className="text-center"><div className="text-xs font-bold tracking-wider uppercase text-white/40 mb-1">Accuracy</div><div className="text-2xl font-black">{chapterStats.accuracy}%</div></div>
          <div className="text-center"><div className="text-xs font-bold tracking-wider uppercase text-white/40 mb-1">XP</div><div className="text-2xl font-black">{chapterStats.totalXp}</div></div>
        </motion.div>

        {/* Reflection prompt */}
        {!isGolden && <ReflectionPrompt unitTitle={unitTitle} unitIndex={unitIndex} />}
      </FullScreenModal>

      {showUpgradeModal && <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} reason="Unlock all 10 course units" />}
    </>
  );
}

// --- Reflection prompt shown after unit completion ---

const REFLECTION_KEY = 'mechready-reflections';

function getReflections(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(REFLECTION_KEY) || '{}'); } catch { return {}; }
}

function saveReflection(unitIndex: number, text: string) {
  const all = getReflections();
  all[String(unitIndex)] = text;
  localStorage.setItem(REFLECTION_KEY, JSON.stringify(all));
}

function ReflectionPrompt({ unitTitle, unitIndex }: { unitTitle: string; unitIndex: number }) {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const existing = useMemo(() => getReflections()[String(unitIndex)] || '', [unitIndex]);

  useEffect(() => { if (existing) { setText(existing); setSaved(true); } }, [existing]);

  const handleSave = () => {
    if (!text.trim()) return;
    saveReflection(unitIndex, text.trim());
    setSaved(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      style={{ width: '100%', maxWidth: 340, marginTop: 24 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 16,
        padding: '14px 16px',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Mascot pose="thinking" size={28} />
          <span style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>
            Reflect
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.4 }}>
          What's one thing you'll do differently after {unitTitle}?
        </p>
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => { setText(e.target.value); setSaved(false); }}
          placeholder="e.g., I'll cancel my unused subscriptions"
          rows={2}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            border: '1.5px solid rgba(255,255,255,0.2)',
            borderRadius: 10,
            padding: '8px 10px',
            fontSize: 13,
            fontWeight: 500,
            color: 'white',
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit',
          }}
          onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}
        />
        {text.trim() && !saved && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleSave}
            style={{
              marginTop: 6,
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save
          </motion.button>
        )}
        {saved && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: '6px 0 0', fontWeight: 600 }}
          >
            Saved. You can revisit your reflections anytime.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
