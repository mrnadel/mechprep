import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Track your mechanical engineering mastery milestones. Earn badges for streaks, topic completion, and practice goals.',
  robots: { index: false },
};

export default function AchievementsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
