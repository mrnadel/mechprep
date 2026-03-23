'use client';

import { motion } from 'framer-motion';

interface LessonProgressBarProps {
  current: number;
  total: number;
  color: string;
}

export default function LessonProgressBar({ current, total, color }: LessonProgressBarProps) {
  return (
    <div
      className="flex items-center flex-1"
      style={{ gap: 5 }}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Question ${current} of ${total} completed`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isCompleted = i < current;
        const isCurrent = i === current;

        return (
          <div
            key={i}
            className="flex-1 overflow-hidden"
            style={{
              height: 8,
              borderRadius: 4,
              background: '#E5E5E5',
            }}
          >
            {isCompleted && (
              <motion.div
                style={{
                  height: '100%',
                  borderRadius: 4,
                  backgroundColor: color,
                }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              />
            )}
            {isCurrent && (
              <motion.div
                style={{
                  height: '100%',
                  borderRadius: 4,
                  backgroundColor: color,
                  opacity: 0.35,
                }}
                animate={{ width: ['30%', '55%', '30%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
