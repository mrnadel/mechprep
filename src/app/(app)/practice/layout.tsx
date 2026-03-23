import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Practice',
  description: 'Practice mechanical engineering interview questions with adaptive, topic-based, and real-world modes.',
  robots: { index: false },
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
