import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View and manage your MechReady profile, stats, and learning progress.',
  robots: { index: false },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
