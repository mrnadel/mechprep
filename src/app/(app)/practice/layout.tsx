import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice',
  description: 'Practice interview questions with adaptive, topic-based, and daily challenge modes.',
  robots: { index: false },
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
