'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  /** Percentage 0–100 */
  percent: number;
  /** Bar height class. Default: 'h-2' */
  height?: string;
  /** Explicit bar color. If omitted, auto-selects green/amber/red based on percent. */
  color?: string;
  /** Background track color. Default: 'bg-surface-200' */
  trackClass?: string;
  /** Whether to animate from 0 on mount. Default: true */
  animate?: boolean;
}

function autoColor(percent: number): string {
  if (percent >= 80) return '#10B981';
  if (percent >= 60) return '#F59E0B';
  return '#EF4444';
}

export function ProgressBar({
  percent,
  height = 'h-2',
  color,
  trackClass = 'bg-surface-200',
  animate = true,
}: ProgressBarProps) {
  const barColor = color ?? autoColor(percent);
  const clampedPercent = Math.max(0, Math.min(100, percent));

  return (
    <div className={`${height} ${trackClass} rounded-full overflow-hidden`}>
      {animate ? (
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${clampedPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ) : (
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${clampedPercent}%`, backgroundColor: barColor }}
        />
      )}
    </div>
  );
}
