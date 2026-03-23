import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quests',
  description: 'Complete daily and weekly quests to earn gems and bonus XP.',
  robots: { index: false },
};

export default function QuestsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
