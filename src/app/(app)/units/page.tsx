'use client';

import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { useSubscription } from '@/hooks/useSubscription';
import { LIMITS, isUnitUnlocked } from '@/lib/pricing';
import { getUnitTheme } from '@/lib/unitThemes';
import { PageHeader } from '@/components/ui/PageHeader';
import { UnitHeader } from '@/components/course/UnitHeader';
import { useIsDark } from '@/store/useThemeStore';

export default function UnitsPage() {
  const { status } = useSession();
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
        theme: getUnitTheme(unitIndex),
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
            const firstTheme = sectionUnits[0]?.theme;

            return (
              <motion.div
                key={section.sectionIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(sIdx * 0.06, 0.4), duration: 0.3 }}
              >
                {/* Section header */}
                <div
                  style={{
                    background: firstTheme?.color ?? '#3B82F6',
                    borderRadius: 20,
                    padding: '18px 20px 16px',
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
                    Section {section.sectionIndex}
                  </div>
                  <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2, color: '#FFFFFF' }}>
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
                </div>

                {/* Units in this section */}
                <div className="flex flex-col" style={{ gap: 8, paddingTop: 8, paddingLeft: 12, paddingRight: 12 }}>
                  {sectionUnits.map(({ unit, unitIndex, completedInUnit, totalInUnit, isLocked, lockMessage, isAllGolden, theme }) => (
                    <div
                      key={unit.id}
                      className="flex items-center"
                      style={{
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 14,
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      }}
                    >
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        background: completedInUnit === totalInUnit
                          ? (isAllGolden ? '#FFB800' : theme.color)
                          : completedInUnit > 0
                            ? theme.color + '60'
                            : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                        flexShrink: 0,
                      }} />
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
                      </div>
                      <div style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)',
                        whiteSpace: 'nowrap',
                      }}>
                        {completedInUnit}/{totalInUnit}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })
        ) : (
          // Flat unit list (no sections)
          unitStats.map(({ unit, unitIndex, completedInUnit, totalInUnit, isLocked, lockMessage, isAllGolden, theme }) => (
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
                theme={theme}
                professionId={activeProfession}
                showProgress
              />
            </motion.div>
          ))
        )}
      </div>
    </>
  );
}
