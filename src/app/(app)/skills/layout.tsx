import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'View your skill mastery levels across all mechanical engineering topics.',
  robots: { index: false },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
