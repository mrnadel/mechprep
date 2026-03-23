import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Friends',
  description: 'Add friends, compare progress, and study together on MechReady.',
  robots: { index: false },
};

export default function FriendsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
