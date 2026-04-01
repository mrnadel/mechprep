'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { PROFESSIONS } from '@/data/professions';
import { cn } from '@/lib/utils';
import { CourseIcon } from '@/components/course/CourseIcon';

interface ProfessionPickerProps {
  selectedId?: string;
  onSelect: (professionId: string) => void;
  compact?: boolean;
  /** IDs of gated courses the user has been granted access to. */
  grantedCourses?: string[];
  /** Profession IDs to completely hide from the picker. */
  filterOut?: string[];
}

export function ProfessionPicker({ selectedId, onSelect, compact = false, grantedCourses, filterOut }: ProfessionPickerProps) {
  const visibleProfessions = filterOut ? PROFESSIONS.filter(p => !filterOut.includes(p.id)) : PROFESSIONS;
  return (
    <div
      className={cn(
        'grid gap-3',
        compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
      )}
    >
      {visibleProfessions.map((profession, index) => {
        const isActive = selectedId === profession.id;
        const isGated = profession.requiresAccess && grantedCourses && !grantedCourses.includes(profession.id);
        const isDisabled = profession.isComingSoon === true || isGated;

        return (
          <motion.button
            key={profession.id}
            onClick={() => !isDisabled && onSelect(profession.id)}
            disabled={isDisabled}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.25 }}
            whileHover={isDisabled ? undefined : { scale: 1.02 }}
            whileTap={isDisabled ? undefined : { scale: 0.98 }}
            className={cn(
              'relative text-left rounded-2xl border-2 transition-all duration-200',
              compact ? 'p-3' : 'p-4 sm:p-5',
              isDisabled && 'opacity-50 cursor-not-allowed',
              isActive
                ? 'bg-white shadow-lg'
                : 'bg-white hover:shadow-md border-gray-200 hover:border-gray-300'
            )}
            style={
              isActive
                ? { borderColor: profession.color, boxShadow: `0 4px 20px ${profession.color}20` }
                : undefined
            }
          >
            {/* Active indicator ring */}
            {isActive && (
              <motion.div
                layoutId="profession-ring"
                className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: `0 0 0 2px ${profession.color}` }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}

            {/* Coming Soon / Access Required badge */}
            {profession.isComingSoon && (
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-wider">
                Coming Soon
              </span>
            )}
            {isGated && !profession.isComingSoon && (
              <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-500 text-[10px] font-black uppercase tracking-wider">
                <Lock className="w-2.5 h-2.5" />
                Access Required
              </span>
            )}

            {/* Content */}
            <div className={cn('flex items-start gap-3', compact && 'items-center')}>
              {/* Icon */}
              <span
                className={cn(
                  'flex items-center justify-center shrink-0',
                  compact ? 'w-10 h-10' : 'w-14 h-14'
                )}
              >
                <CourseIcon professionId={profession.id} color={profession.color} size={compact ? 40 : 56} />
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    'font-black text-gray-900 leading-tight',
                    compact ? 'text-sm' : 'text-base sm:text-lg'
                  )}
                >
                  {profession.name}
                </h3>

                {!compact && (
                  <p className="text-sm text-gray-400 font-medium mt-0.5 leading-snug">
                    {profession.description}
                  </p>
                )}

              </div>

              {/* Selection indicator */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 self-center"
                  style={{ backgroundColor: profession.color }}
                >
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
