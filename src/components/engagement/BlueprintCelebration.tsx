'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useCourseStore } from '@/store/useCourseStore';
import { blueprints } from '@/data/blueprints';
import { getUnitTheme } from '@/lib/unitThemes';
import { useBackHandler } from '@/hooks/useBackHandler';
import { useSubscription } from '@/hooks/useSubscription';
import { UpgradeModal } from '@/components/ui/UpgradeModal';

interface BlueprintCelebrationProps {
  unitIndex: number;
  isGolden: boolean;
  onDismiss: () => void;
}

/** Animated SVG path that draws itself in */
function AnimatedPath({
  d,
  strokeWidth = 1.5,
  delay,
  color,
}: {
  d: string;
  strokeWidth?: number;
  delay: number;
  color: string;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { duration: 0.8, delay, ease: 'easeInOut' },
        opacity: { duration: 0.1, delay },
      }}
    />
  );
}

/** Animated dimension line */
function DimensionLine({
  x1, y1, x2, y2, label, delay, color,
}: {
  x1: number; y1: number; x2: number; y2: number;
  label: string; delay: number; color: string;
}) {
  const isVertical = Math.abs(x2 - x1) < Math.abs(y2 - y1);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={0.8}
        strokeDasharray="4 3"
        opacity={0.5}
      />
      {isVertical ? (
        <>
          <line x1={x1 - 4} y1={y1} x2={x1 + 4} y2={y1} stroke={color} strokeWidth={1} />
          <line x1={x2 - 4} y1={y2} x2={x2 + 4} y2={y2} stroke={color} strokeWidth={1} />
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - 4} x2={x1} y2={y1 + 4} stroke={color} strokeWidth={1} />
          <line x1={x2} y1={y2 - 4} x2={x2} y2={y2 + 4} stroke={color} strokeWidth={1} />
        </>
      )}
      <motion.text
        x={(x1 + x2) / 2}
        y={(y1 + y2) / 2 + (isVertical ? 0 : -8)}
        textAnchor="middle"
        dominantBaseline={isVertical ? 'middle' : 'auto'}
        dx={isVertical ? -14 : 0}
        fill={color}
        fontSize={11}
        fontWeight={700}
        fontFamily="var(--font-jetbrains), monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.3 }}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

export function BlueprintCelebration({ unitIndex, isGolden, onDismiss }: BlueprintCelebrationProps) {
  const [phase, setPhase] = useState<'drawing' | 'stamp' | 'stats'>('drawing');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const blueprint = blueprints[unitIndex] ?? blueprints[0];
  const theme = getUnitTheme(unitIndex);
  const courseData = useCourseStore((s) => s.courseData);
  const progress = useCourseStore((s) => s.progress);
  const { isProUser } = useSubscription();

  // Show upgrade prompt when completing last lesson of free chapter (unit 0)
  const shouldShowUpgrade = unitIndex === 0 && !isProUser && !isGolden;

  const chapterStats = useMemo(() => {
    const unit = courseData[unitIndex];
    if (!unit) return { lessons: 0, accuracy: 0, totalXp: 0 };
    let totalAcc = 0;
    let totalXp = 0;
    let count = 0;
    for (const lesson of unit.lessons) {
      const lp = progress.completedLessons[lesson.id];
      if (lp) {
        totalAcc += lp.bestAccuracy;
        totalXp += lesson.xpReward * lp.stars;
        count++;
      }
    }
    return {
      lessons: count,
      accuracy: count > 0 ? Math.round(totalAcc / count) : 0,
      totalXp,
    };
  }, [courseData, unitIndex, progress]);

  const unitTitle = courseData[unitIndex]?.title ?? 'Chapter';

  useBackHandler(true, onDismiss);

  const totalDrawTime = blueprint.paths.length * 0.22 + 0.8;
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('stamp'), (totalDrawTime + 0.5) * 1000);
    const t2 = setTimeout(() => setPhase('stats'), (totalDrawTime + 1.6) * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [totalDrawTime]);

  const [canDismiss, setCanDismiss] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCanDismiss(true), (totalDrawTime + 2.5) * 1000);
    return () => clearTimeout(t);
  }, [totalDrawTime]);

  const handleDismiss = useCallback(() => {
    if (canDismiss) onDismiss();
  }, [canDismiss, onDismiss]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && canDismiss) {
        e.preventDefault();
        onDismiss();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [canDismiss, onDismiss]);

  // Use unit's theme color for the drawing, golden overrides
  const drawColor = isGolden ? '#CC9400' : theme.dark;
  const dimColor = isGolden ? '#B8860B' : theme.mid;
  const accentColor = isGolden ? '#FFB800' : theme.color;
  const accentBg = isGolden ? '#FFF8E1' : theme.bg;

  return (
    <AnimatePresence>
      <motion.div
        key="blueprint-celebration"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleDismiss}
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#FAFAFA]"
        style={{
          cursor: canDismiss ? 'pointer' : 'default',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Confetti burst on stamp */}
        {(phase === 'stamp' || phase === 'stats') && (
          <div className="fixed inset-0 pointer-events-none z-[5]">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                initial={{ opacity: 1, y: '45vh', x: '50vw', scale: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  y: `${10 + Math.random() * 60}vh`,
                  x: `${10 + Math.random() * 80}vw`,
                  scale: [0, 1, 0.6],
                  rotate: Math.random() * 720 - 360,
                }}
                transition={{ duration: 1.5 + Math.random(), ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: 8 + Math.random() * 6,
                  height: 8 + Math.random() * 6,
                  borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '0',
                  background: [accentColor, theme.color, '#58CC02', '#FF9600', '#1CB0F6', '#CE82FF'][i % 6],
                }}
              />
            ))}
          </div>
        )}

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center mb-4"
        >
          <div className="text-xs font-extrabold tracking-[3px] uppercase mb-1" style={{ color: accentColor }}>
            {isGolden ? 'Golden chapter complete' : 'Chapter complete'}
          </div>
          <div className="text-2xl font-black text-surface-900">
            {unitTitle}
          </div>
        </motion.div>

        {/* Drawing card */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            width: 'min(85vw, 420px)',
            maxHeight: 'min(50vh, 340px)',
            borderRadius: 20,
            padding: 20,
            background: 'white',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}
        >
          {/* Small label in corner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-3 right-4 text-[10px] font-bold tracking-wider uppercase"
            style={{ color: dimColor }}
          >
            {blueprint.title}
          </motion.div>

          <svg
            viewBox={blueprint.viewBox}
            style={{ width: '100%', height: '100%' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {blueprint.paths.map((path, i) => (
              <AnimatedPath
                key={i}
                d={path.d}
                strokeWidth={path.strokeWidth}
                delay={0.5 + i * 0.22}
                color={drawColor}
              />
            ))}
            {blueprint.dimensions.map((dim, i) => (
              <DimensionLine
                key={`dim-${i}`}
                {...dim}
                delay={totalDrawTime + 0.2 + i * 0.2}
                color={dimColor}
              />
            ))}
          </svg>
        </motion.div>

        {/* Stamp */}
        <AnimatePresence>
          {(phase === 'stamp' || phase === 'stats') && (
            <motion.div
              className="absolute z-20 pointer-events-none"
              initial={{ scale: 3, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: -8, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div
                className="font-black text-3xl tracking-[6px] uppercase"
                style={{
                  padding: '10px 30px',
                  border: `4px solid ${isGolden ? '#FFB800' : '#58CC02'}`,
                  borderRadius: 12,
                  color: isGolden ? '#FFB800' : '#58CC02',
                  background: isGolden ? 'rgba(255,184,0,0.08)' : 'rgba(88,204,2,0.08)',
                }}
              >
                {isGolden ? 'MASTERED' : 'COMPLETE'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen shake on stamp */}
        {phase === 'stamp' && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-10"
            animate={{ x: [0, -4, 4, -2, 2, 0], y: [0, 2, -3, 1, -1, 0] }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Stats */}
        <AnimatePresence>
          {phase === 'stats' && (
            <motion.div
              className="relative z-10 flex flex-col items-center mt-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="flex gap-6 px-7 py-4 rounded-2xl bg-white border border-surface-200"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                <StatItem label="Lessons" value={`${chapterStats.lessons}`} color="#0F172A" />
                <StatItem
                  label="Accuracy"
                  value={`${chapterStats.accuracy}%`}
                  color={chapterStats.accuracy >= 90 ? '#58CC02' : '#FF9600'}
                />
                <StatItem label="XP" value={`${chapterStats.totalXp}`} color={accentColor} />
              </div>

              {/* Upgrade prompt for free users completing Unit 0 */}
              {shouldShowUpgrade && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 w-full max-w-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #FFF8E1 0%, #FFF3CD 100%)',
                      border: '1.5px solid #FFD54F',
                      borderRadius: 16,
                      padding: '14px 18px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#5D4200', marginBottom: 8 }}>
                      Unlock all 10 units and keep learning!
                    </div>
                    <button
                      onClick={() => setShowUpgradeModal(true)}
                      className="flex items-center justify-center w-full transition-transform active:scale-[0.97]"
                      style={{
                        gap: 6,
                        padding: '12px 0',
                        borderRadius: 14,
                        fontSize: 14,
                        fontWeight: 800,
                        color: '#FFFFFF',
                        background: '#FFB800',
                        boxShadow: '0 4px 0 #CC9400',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <Sparkles style={{ width: 16, height: 16 }} />
                      Upgrade to Pro
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Continue button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: canDismiss ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onClick={(e) => { e.stopPropagation(); handleDismiss(); }}
                className="mt-5 px-12 py-3.5 text-white font-extrabold rounded-2xl text-[15px] tracking-wide transition-transform active:translate-y-[2px]"
                style={{
                  background: isGolden ? '#FFB800' : '#58CC02',
                  boxShadow: `0 4px 0 ${isGolden ? '#CC9400' : '#46A302'}`,
                  color: isGolden ? '#5D4200' : 'white',
                }}
              >
                CONTINUE
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <UpgradeModal
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
            reason="Unlock all 10 course units"
          />
        )}

        {/* Golden sparkles */}
        {isGolden && (
          <div className="fixed inset-0 pointer-events-none z-[5]">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`bp-sparkle-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0.4, 0],
                  scale: [0, 1, 0.7, 0],
                  y: [0, -30 - Math.random() * 60],
                }}
                transition={{
                  duration: 2.5 + Math.random() * 2,
                  delay: 1 + Math.random() * 3,
                  repeat: Infinity,
                  repeatDelay: 1 + Math.random() * 3,
                }}
                style={{
                  position: 'absolute',
                  top: `${15 + Math.random() * 70}%`,
                  left: `${5 + Math.random() * 90}%`,
                  width: 5 + Math.random() * 5,
                  height: 5 + Math.random() * 5,
                }}
              >
                <svg viewBox="0 0 10 10" width="100%" height="100%">
                  <path
                    d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4Z"
                    fill={i % 3 === 0 ? '#FFD54F' : i % 3 === 1 ? '#FFA000' : '#FFE082'}
                    opacity={0.9}
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function StatItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[10px] font-bold tracking-wider uppercase text-surface-400 mb-1">
        {label}
      </div>
      <div className="text-xl font-black" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
