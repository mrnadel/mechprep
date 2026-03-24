'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blueprints } from '@/data/blueprints';
import { getUnitTheme } from '@/lib/unitThemes';
import { useCourseStore } from '@/store/useCourseStore';
import { useBackHandler } from '@/hooks/useBackHandler';

interface Props {
  onDismiss: () => void;
}

export function CourseCompleteCelebration({ onDismiss }: Props) {
  const [showStamp, setShowStamp] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const courseData = useCourseStore((s) => s.courseData);

  // Calculate total path count across all blueprints for timing
  const allLayers = blueprints.map((bp, i) => ({
    blueprint: bp,
    theme: getUnitTheme(i),
    title: courseData[i]?.title ?? bp.name,
  }));

  // Each layer starts 0.6s after the previous, paths within animate quickly
  const layerDelay = 0.5;
  const pathGap = 0.06;
  const totalAnimTime = allLayers.reduce((acc, layer, i) => {
    const layerStart = 0.8 + i * layerDelay;
    const layerEnd = layerStart + layer.blueprint.paths.length * pathGap + 0.5;
    return Math.max(acc, layerEnd);
  }, 0);

  useEffect(() => {
    const t1 = setTimeout(() => setShowStamp(true), (totalAnimTime + 0.5) * 1000);
    const t2 = setTimeout(() => setShowButton(true), (totalAnimTime + 1.5) * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [totalAnimTime]);

  useBackHandler(true, () => { if (showButton) onDismiss(); });

  const handleDismiss = useCallback(() => {
    if (showButton) onDismiss();
  }, [showButton, onDismiss]);

  const confettiColors = Array.from({ length: 10 }, (_, i) => getUnitTheme(i).color);

  return (
    <AnimatePresence>
      <motion.div
        key="course-complete"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-[#FAFAFA] overflow-y-auto flex flex-col items-center"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Confetti on stamp */}
        {showStamp && (
          <div className="fixed inset-0 pointer-events-none z-[5]">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={`cc-${i}`}
                initial={{ opacity: 0, y: -20, x: `${Math.random() * 100}vw`, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: ['0vh', `${50 + Math.random() * 50}vh`],
                  scale: [0, 1, 0.8, 0.4],
                  rotate: Math.random() * 720,
                }}
                transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 1.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: 6 + Math.random() * 10,
                  height: 6 + Math.random() * 10,
                  borderRadius: i % 3 === 0 ? '50%' : '2px',
                  background: confettiColors[i % confettiColors.length],
                }}
              />
            ))}
          </div>
        )}

        <div className="w-full max-w-md mx-auto px-5 py-8 flex flex-col items-center relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-5"
          >
            <div className="text-xs font-extrabold tracking-[3px] uppercase text-brand-400 mb-2">
              Course complete
            </div>
            <h1 className="text-3xl font-black text-surface-900 mb-1">
              The full machine.
            </h1>
            <p className="text-surface-400 text-sm font-semibold">
              Every system you mastered, assembled.
            </p>
          </motion.div>

          {/* The complete machine drawing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full bg-white rounded-3xl p-4 sm:p-6 border border-surface-200 relative"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
          >
            <svg
              viewBox="0 0 400 520"
              className="w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Draw each layer in its unit color */}
              {allLayers.map((layer, layerIdx) => {
                const layerStart = 0.8 + layerIdx * layerDelay;
                return (
                  <g key={layerIdx}>
                    {layer.blueprint.paths.map((path, pathIdx) => (
                      <motion.path
                        key={`${layerIdx}-${pathIdx}`}
                        d={path.d}
                        fill="none"
                        stroke={layer.theme.dark}
                        strokeWidth={path.strokeWidth ?? 1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: { duration: 0.5, delay: layerStart + pathIdx * pathGap, ease: 'easeInOut' },
                          opacity: { duration: 0.1, delay: layerStart + pathIdx * pathGap },
                        }}
                      />
                    ))}
                    {/* Dimension lines */}
                    {layer.blueprint.dimensions.map((dim, dimIdx) => (
                      <motion.g
                        key={`dim-${layerIdx}-${dimIdx}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 0.4, delay: layerStart + layer.blueprint.paths.length * pathGap + 0.2 }}
                      >
                        <line
                          x1={dim.x1} y1={dim.y1} x2={dim.x2} y2={dim.y2}
                          stroke={layer.theme.mid}
                          strokeWidth={0.8}
                          strokeDasharray="3 2"
                        />
                      </motion.g>
                    ))}
                  </g>
                );
              })}
            </svg>

            {/* Layer legend (unit names along the side) */}
            <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1.5">
              {allLayers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * layerDelay + 0.5 }}
                  className="flex items-center gap-1.5"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: layer.theme.color }}
                  />
                  <span className="text-[10px] font-bold text-surface-400">{layer.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stamp */}
          {showStamp && (
            <motion.div
              className="absolute z-20 pointer-events-none"
              initial={{ scale: 3, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: -8, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div
                className="font-black text-3xl tracking-[6px] uppercase"
                style={{
                  padding: '10px 30px',
                  border: '4px solid #F5B800',
                  borderRadius: 12,
                  color: '#F5B800',
                  background: 'rgba(88,204,2,0.08)',
                }}
              >
                COMPLETE
              </div>
            </motion.div>
          )}

          {/* Continue button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showButton ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 w-full flex justify-center"
          >
            <button
              onClick={handleDismiss}
              className="w-full max-w-xs py-4 text-white font-extrabold rounded-2xl text-[17px] tracking-wide transition-transform active:translate-y-[2px]"
              style={{ background: '#F5B800', boxShadow: '0 5px 0 #C49200' }}
            >
              CONTINUE
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
