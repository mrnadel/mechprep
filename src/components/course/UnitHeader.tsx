'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Unit } from '@/data/course/types';
import { UnitIllustration } from './UnitIllustrations';

interface UnitHeaderProps {
  unit: Unit;
  unitIndex: number;
  completedInUnit: number;
  totalInUnit: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function UnitHeader({
  unit,
  unitIndex,
  completedInUnit,
  totalInUnit,
  isExpanded,
  onToggle,
}: UnitHeaderProps) {
  const progressPercent =
    totalInUnit > 0 ? (completedInUnit / totalInUnit) * 100 : 0;
  const isComplete = completedInUnit === totalInUnit;

  return (
    <button
      className="w-full text-left"
      onClick={onToggle}
      aria-expanded={isExpanded}
    >
      <div
        className="mx-4 rounded-2xl overflow-hidden transition-shadow"
        style={{
          background: `linear-gradient(135deg, ${unit.color}08, ${unit.color}04)`,
          border: `1px solid ${unit.color}20`,
          boxShadow: isExpanded ? `0 4px 12px ${unit.color}12` : 'none',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3.5">
          {/* Unit illustration (small) */}
          <div className="flex-shrink-0" style={{ width: 52, height: 40 }}>
            <UnitIllustration
              unitIndex={unitIndex}
              color={unit.color}
              className="w-full h-full opacity-70"
            />
          </div>

          {/* Title + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${unit.color}12`,
                  color: unit.color,
                }}
              >
                Unit {unitIndex + 1}
              </span>
              {isComplete && (
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  DONE
                </span>
              )}
            </div>
            <h2 className="text-sm font-bold text-gray-900 leading-snug mt-1 truncate">
              {unit.title}
            </h2>

            {/* Progress bar */}
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: unit.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <span
                className="text-[10px] font-semibold tabular-nums"
                style={{ color: unit.color }}
              >
                {completedInUnit}/{totalInUnit}
              </span>
            </div>
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown
              className="w-5 h-5"
              style={{ color: `${unit.color}80` }}
            />
          </motion.div>
        </div>
      </div>
    </button>
  );
}
