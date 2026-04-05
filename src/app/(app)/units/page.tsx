'use client';

import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { useSubscription } from '@/hooks/useSubscription';
import { LIMITS, isUnitUnlocked } from '@/lib/pricing';
import { PageHeader } from '@/components/ui/PageHeader';
import { UnitHeader } from '@/components/course/UnitHeader';
import { useIsDark } from '@/store/useThemeStore';
import type { UnitTheme } from '@/lib/unitThemes';

/** Neutral theme for the units browser — not tied to any specific unit. */
const BROWSE_THEME: UnitTheme = { bg: '#EBF3FF', color: '#3B82F6', dark: '#1E5BB8', mid: '#2D6FD7' };

export default function UnitsPage() {
  const { status } = useSession();
  const router = useRouter();
  const progress = useCourseStore((s) => s.progress);
  const courseData = useCourseStore((s) => s.courseData);
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const isGuest = status !== 'authenticated';
  const { isProUser } = useSubscription();
  const isDark = useIsDark();

  const unitStats = useMemo(() => {
    return courseData.map((unit, unitIndex) => {
      const completedInUnit = unit.lessons.filter(
        (l) => progress.completedLessons[l.id]?.passed
      ).length;
      const isGuestLocked = isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex);
      const isProLocked = !isGuest && !isProUser && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex);
      const isAllGolden = completedInUnit === unit.lessons.length &&
        unit.lessons.every((l) => progress.completedLessons[l.id]?.golden);

      return {
        unit,
        unitIndex,
        completedInUnit,
        totalInUnit: unit.lessons.length,
        isLocked: isGuestLocked || isProLocked,
        lockMessage: isGuestLocked
          ? 'Sign up to unlock'
          : isProLocked
            ? 'Upgrade to Pro to unlock'
            : undefined,
        isAllGolden,
      };
    });
  }, [courseData, progress.completedLessons, isGuest, isProUser]);

  // Group units by section
  const sections = useMemo(() => {
    const hasSections = courseData.some((u) => u.sectionIndex != null);
    if (!hasSections) return null;

    const groups: { sectionIndex: number; sectionTitle: string; unitIndices: number[] }[] = [];
    let current: typeof groups[0] | null = null;
    courseData.forEach((unit, i) => {
      const si = unit.sectionIndex ?? -1;
      if (!current || current.sectionIndex !== si) {
        current = { sectionIndex: si, sectionTitle: unit.sectionTitle ?? unit.title, unitIndices: [] };
        groups.push(current);
      }
      current.unitIndices.push(i);
    });
    return groups;
  }, [courseData]);

  const totalLessons = unitStats.reduce((sum, u) => sum + u.totalInUnit, 0);
  const totalCompleted = unitStats.reduce((sum, u) => sum + u.completedInUnit, 0);

  return (
    <>
      <PageHeader
        title={sections ? 'Browse Sections' : 'Browse Units'}
        subtitle={`${totalCompleted} of ${totalLessons} lessons completed`}
        icon={<span style={{ fontSize: 18 }}>📚</span>}
      />

      <div
        className="flex flex-col px-3 sm:px-4 mx-auto"
        style={{ paddingTop: 16, paddingBottom: 40, gap: 12, maxWidth: 520 }}
      >
        {sections ? (
          // Section-grouped view
          sections.map((section, sIdx) => {
            const sectionUnits = section.unitIndices.map((i) => unitStats[i]);
            const sectionCompleted = sectionUnits.reduce((s, u) => s + u.completedInUnit, 0);
            const sectionTotal = sectionUnits.reduce((s, u) => s + u.totalInUnit, 0);
            const sectionPercent = sectionTotal > 0 ? Math.round((sectionCompleted / sectionTotal) * 100) : 0;

            return (
              <motion.div
                key={`s${sIdx}-${section.sectionIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(sIdx * 0.06, 0.4), duration: 0.3 }}
              >
                {/* Section header */}
                <button
                  onClick={() => router.push(`/?unit=${section.unitIndices[0]}`)}
                  className="relative w-full text-left active:scale-[0.99] transition-transform duration-75"
                  style={{
                    background: isDark ? '#1E293B' : '#3B82F6',
                    borderRadius: 20,
                    padding: '18px 20px 16px',
                    border: 'none',
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <div style={{
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: 1.2,
                    marginBottom: 4,
                    color: 'rgba(255,255,255,0.65)',
                  }}>
                    Section {section.sectionIndex} &middot; {sectionUnits.length} unit{sectionUnits.length !== 1 ? 's' : ''}
                  </div>
                  <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2, color: '#FFFFFF', paddingRight: 28 }}>
                    {section.sectionTitle}
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                    {sectionCompleted} of {sectionTotal} lessons{sectionPercent === 100 ? ' - Complete!' : ''}
                  </div>

                  {/* Progress bar */}
                  <div style={{
                    marginTop: 12,
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${sectionPercent}%`,
                      height: '100%',
                      borderRadius: 4,
                      backgroundColor: '#FFFFFF',
                      transition: 'width 0.4s ease',
                    }} />
                  </div>

                  {/* Chevron */}
                  <div className="absolute" style={{ right: 18, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Units in this section */}
                <div className="flex flex-col" style={{ gap: 8, paddingTop: 8, paddingLeft: 12, paddingRight: 12 }}>
                  {sectionUnits.map(({ unit, unitIndex, completedInUnit, totalInUnit, isLocked, lockMessage, isAllGolden }, unitInSection) => (
                    <button
                      key={unit.id}
                      className="flex items-center w-full text-left"
                      onClick={() => router.push(`/?unit=${unitIndex}`)}
                      style={{
                        gap: 10,
                        padding: '10px 14px',
                        borderRadius: 14,
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                        border: 'none',
                        cursor: 'pointer',
                        WebkitTapHighlightColor: 'transparent',
                        opacity: isLocked ? 0.55 : 1,
                      }}
                    >
                      {/* Unit icon */}
                      <span style={{ fontSize: 18, flexShrink: 0, width: 26, textAlign: 'center' }}>
                        {isLocked ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ display: 'inline' }}>
                            <rect x="5" y="11" width="14" height="10" rx="2" fill={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} />
                            <path d="M8 11V7a4 4 0 118 0v4" stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                        ) : unit.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="truncate" style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: isLocked
                            ? (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)')
                            : (isDark ? '#E0E0E0' : '#1A1A1A'),
                        }}>
                          {unit.title}
                        </div>
                        <div style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)',
                          marginTop: 1,
                        }}>
                          {isLocked
                            ? (lockMessage || 'Locked')
                            : isAllGolden
                              ? 'All mastered'
                              : `${completedInUnit} of ${totalInUnit} lessons`}
                        </div>
                      </div>
                      {/* Progress indicator */}
                      {!isLocked && (
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: completedInUnit === totalInUnit
                            ? (isAllGolden ? '#FFB800' : '#58CC02')
                            : completedInUnit > 0
                              ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')
                              : 'transparent',
                          border: completedInUnit === totalInUnit
                            ? 'none'
                            : `2px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`,
                        }}>
                          {completedInUnit === totalInUnit ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : completedInUnit > 0 ? (
                            <span style={{ fontSize: 10, fontWeight: 800, color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                              {Math.round((completedInUnit / totalInUnit) * 100)}%
                            </span>
                          ) : null}
                        </div>
                      )}
                      {/* Chevron */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                        <path d="M9 6l6 6-6 6" stroke={isDark ? 'white' : 'black'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ))}
                </div>
              </motion.div>
            );
          })
        ) : (
          // Flat unit list (no sections)
          unitStats.map(({ unit, unitIndex, completedInUnit, totalInUnit, isLocked, lockMessage, isAllGolden }) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(unitIndex * 0.06, 0.4), duration: 0.3 }}
            >
              <UnitHeader
                unit={unit}
                unitIndex={unitIndex}
                completedInUnit={completedInUnit}
                totalInUnit={totalInUnit}
                isLocked={isLocked}
                isAllGolden={isAllGolden}
                lockMessage={lockMessage}
                theme={BROWSE_THEME}
                professionId={activeProfession}
                showProgress
                onClick={() => router.push(`/?unit=${unitIndex}`)}
              />
            </motion.div>
          ))
        )}
      </div>
    </>
  );
}
