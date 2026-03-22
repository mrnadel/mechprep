'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { blueprints } from '@/data/blueprints';
import { getUnitTheme } from '@/lib/unitThemes';
import { useBackHandler } from '@/hooks/useBackHandler';

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
  golden,
}: {
  d: string;
  strokeWidth?: number;
  delay: number;
  color: string;
  golden: boolean;
}) {
  const stroke = golden ? '#FFB800' : color;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
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
  x1, y1, x2, y2, label, delay, color, golden,
}: {
  x1: number; y1: number; x2: number; y2: number;
  label: string; delay: number; color: string; golden: boolean;
}) {
  const stroke = golden ? '#FFB800' : color;
  const isVertical = Math.abs(x2 - x1) < Math.abs(y2 - y1);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Extension lines */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={stroke}
        strokeWidth={0.8}
        strokeDasharray="4 3"
        opacity={0.7}
      />
      {/* End ticks */}
      {isVertical ? (
        <>
          <line x1={x1 - 4} y1={y1} x2={x1 + 4} y2={y1} stroke={stroke} strokeWidth={1} />
          <line x1={x2 - 4} y1={y2} x2={x2 + 4} y2={y2} stroke={stroke} strokeWidth={1} />
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - 4} x2={x1} y2={y1 + 4} stroke={stroke} strokeWidth={1} />
          <line x1={x2} y1={y2 - 4} x2={x2} y2={y2 + 4} stroke={stroke} strokeWidth={1} />
        </>
      )}
      {/* Label */}
      <motion.text
        x={(x1 + x2) / 2}
        y={(y1 + y2) / 2 + (isVertical ? 0 : -8)}
        textAnchor="middle"
        dominantBaseline={isVertical ? 'middle' : 'auto'}
        dx={isVertical ? -14 : 0}
        fill={stroke}
        fontSize={11}
        fontWeight={700}
        fontFamily="monospace"
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
  const blueprint = blueprints[unitIndex] ?? blueprints[0];
  const theme = getUnitTheme(unitIndex);
  const courseData = useCourseStore((s) => s.courseData);
  const progress = useCourseStore((s) => s.progress);

  // Compute chapter stats
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

  // Phase transitions
  const totalDrawTime = blueprint.paths.length * 0.22 + 0.8;
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('stamp'), (totalDrawTime + 0.5) * 1000);
    const t2 = setTimeout(() => setPhase('stats'), (totalDrawTime + 1.6) * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [totalDrawTime]);

  // Allow dismiss after stats phase
  const [canDismiss, setCanDismiss] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCanDismiss(true), (totalDrawTime + 2.5) * 1000);
    return () => clearTimeout(t);
  }, [totalDrawTime]);

  const handleDismiss = useCallback(() => {
    if (canDismiss) onDismiss();
  }, [canDismiss, onDismiss]);

  // Keyboard dismiss
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

  const lineColor = isGolden ? '#FFB800' : '#88BBDD';
  const bgColor = isGolden ? '#1A1400' : '#0A1628';
  const gridColor = isGolden ? 'rgba(255,184,0,0.06)' : 'rgba(100,160,220,0.08)';
  const gridColorStrong = isGolden ? 'rgba(255,184,0,0.12)' : 'rgba(100,160,220,0.15)';

  return (
    <AnimatePresence>
      <motion.div
        key="blueprint-celebration"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={handleDismiss}
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
        style={{
          background: bgColor,
          cursor: canDismiss ? 'pointer' : 'default',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Blueprint grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColor} 1px, transparent 1px),
              linear-gradient(${gridColorStrong} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColorStrong} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
          }}
        />

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center"
          style={{ marginBottom: 12 }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 3,
              color: isGolden ? '#FFD54F' : '#5A8AAA',
              textTransform: 'uppercase',
              marginBottom: 4,
              fontFamily: 'monospace',
            }}
          >
            {isGolden ? 'GOLDEN CHAPTER COMPLETE' : 'CHAPTER COMPLETE'}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: isGolden ? '#FFB800' : '#C0D8EA',
              letterSpacing: 1,
              fontFamily: 'monospace',
            }}
          >
            {unitTitle}
          </div>
        </motion.div>

        {/* Blueprint SVG area */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            width: 'min(85vw, 420px)',
            maxHeight: 'min(50vh, 340px)',
            border: `2px solid ${isGolden ? 'rgba(255,184,0,0.3)' : 'rgba(100,160,220,0.2)'}`,
            borderRadius: 8,
            padding: 16,
            background: isGolden ? 'rgba(255,184,0,0.03)' : 'rgba(100,160,220,0.03)',
          }}
        >
          {/* Title block in corner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              padding: '4px 10px',
              border: `1px solid ${isGolden ? 'rgba(255,184,0,0.25)' : 'rgba(100,160,220,0.2)'}`,
              borderRadius: 3,
              fontSize: 8,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: isGolden ? '#B8860B' : '#5A8AAA',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {blueprint.title}
          </motion.div>

          <svg
            viewBox={blueprint.viewBox}
            style={{ width: '100%', height: '100%' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Drawing paths */}
            {blueprint.paths.map((path, i) => (
              <AnimatedPath
                key={i}
                d={path.d}
                strokeWidth={path.strokeWidth}
                delay={0.5 + i * 0.22}
                color={lineColor}
                golden={isGolden}
              />
            ))}

            {/* Dimension lines */}
            {blueprint.dimensions.map((dim, i) => (
              <DimensionLine
                key={`dim-${i}`}
                {...dim}
                delay={totalDrawTime + 0.2 + i * 0.2}
                color={isGolden ? '#B8860B' : '#5A8AAA'}
                golden={isGolden}
              />
            ))}
          </svg>
        </motion.div>

        {/* APPROVED Stamp */}
        <AnimatePresence>
          {(phase === 'stamp' || phase === 'stats') && (
            <motion.div
              className="absolute z-20"
              initial={{ scale: 3, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: -8, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
              }}
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  padding: '10px 30px',
                  border: `4px solid ${isGolden ? '#FFB800' : '#FF4444'}`,
                  borderRadius: 8,
                  fontSize: 32,
                  fontWeight: 900,
                  fontFamily: 'monospace',
                  color: isGolden ? '#FFB800' : '#FF4444',
                  letterSpacing: 6,
                  textTransform: 'uppercase',
                  textShadow: isGolden
                    ? '0 0 20px rgba(255,184,0,0.5)'
                    : '0 0 20px rgba(255,68,68,0.3)',
                  background: isGolden
                    ? 'rgba(255,184,0,0.08)'
                    : 'rgba(255,68,68,0.05)',
                }}
              >
                {isGolden ? 'MASTERED' : 'APPROVED'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen shake on stamp */}
        {phase === 'stamp' && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-10"
            animate={{
              x: [0, -4, 4, -2, 2, 0],
              y: [0, 2, -3, 1, -1, 0],
            }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Stats panel */}
        <AnimatePresence>
          {phase === 'stats' && (
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginTop: 20 }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  padding: '14px 28px',
                  borderRadius: 14,
                  border: `1.5px solid ${isGolden ? 'rgba(255,184,0,0.25)' : 'rgba(100,160,220,0.2)'}`,
                  background: isGolden ? 'rgba(255,184,0,0.06)' : 'rgba(100,160,220,0.05)',
                }}
              >
                <StatItem
                  label="Lessons"
                  value={`${chapterStats.lessons}`}
                  color={isGolden ? '#FFB800' : '#C0D8EA'}
                />
                <StatItem
                  label="Accuracy"
                  value={`${chapterStats.accuracy}%`}
                  color={chapterStats.accuracy >= 90
                    ? (isGolden ? '#FFD54F' : '#58CC02')
                    : (isGolden ? '#FFB800' : '#FF9600')}
                />
                <StatItem
                  label="XP"
                  value={`${chapterStats.totalXp}`}
                  color={isGolden ? '#FFB800' : theme.color}
                />
              </div>

              {/* Dismiss hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: canDismiss ? 0.6 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  color: isGolden ? '#B8860B' : '#5A8AAA',
                  fontWeight: 600,
                }}
              >
                Tap to continue
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Golden sparkle particles */}
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
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 1.5,
          color: 'rgba(160,190,220,0.6)',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color,
          fontFamily: 'monospace',
        }}
      >
        {value}
      </div>
    </div>
  );
}
