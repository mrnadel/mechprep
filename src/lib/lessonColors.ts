import type { UnitTheme } from './unitThemes';
import { useIsDark } from '@/store/useThemeStore';

/** Fixed accent theme for lessons/questions — not tied to any unit. */
export const LESSON_ACCENT: UnitTheme = {
  bg: '#EBF3FF',
  color: '#3B82F6',
  dark: '#1E5BB8',
  mid: '#2D6FD7',
};

/** Shared dark-mode-aware color palette for lesson/quiz components. */
export function useLessonColors() {
  const isDark = useIsDark();
  return {
    isDark,
    bg: isDark ? '#0F172A' : '#FAFAFA',
    cardBg: isDark ? '#1E293B' : 'white',
    headerBg: isDark ? '#1E293B' : 'white',
    headerBorder: isDark ? '#334155' : '#E5E5E5',
    title: isDark ? '#E2E8F0' : '#3C3C3C',
    subtitle: isDark ? '#CBD5E1' : '#555555',
    muted: isDark ? '#475569' : '#CFCFCF',
    border: isDark ? '#334155' : '#E5E5E5',
    trackBg: isDark ? '#334155' : '#E5E5E5',
    closeBtnBg: isDark ? '#334155' : '#F5F5F5',
    closeBtnStroke: isDark ? '#94A3B8' : '#AFAFAF',
    optionBg: isDark ? '#1E293B' : 'white',
    optionText: isDark ? '#E2E8F0' : '#3C3C3C',
    optionSelectedBg: isDark ? '#1E293B' : 'white',
    emptyBg: isDark ? '#334155' : '#F0F0F0',
    emptyActiveBg: isDark ? '#312e81' : '#E8E8FF',
    hintBg: isDark ? 'rgba(181,110,0,0.15)' : '#FFF9E8',
    hintColor: isDark ? '#F59E0B' : '#B56E00',
    calcBg: isDark ? '#1E293B' : 'white',
    disclaimerBg: isDark ? '#1E293B' : '#FFFFFF',
    disclaimerBorder: isDark ? '#334155' : '#E5E7EB',
    disclaimerText: isDark ? '#E2E8F0' : '#3C3C3C',
    disclaimerMuted: isDark ? '#CBD5E1' : '#666666',
    skipBg: isDark ? '#334155' : '#F5F5F5',
    skipColor: isDark ? '#94A3B8' : '#AFAFAF',
    dangerBg: isDark ? 'rgba(239,68,68,0.15)' : '#FEE2E2',
  };
}
