import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Progress',
  description: 'View your learning analytics, topic mastery, and interview readiness score.',
  robots: { index: false },
};

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return children;
}
