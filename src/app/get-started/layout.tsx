import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Started',
  description: 'Start your learning journey. Try a sample question, create your free account, and begin mastering any subject.',
  alternates: { canonical: '/get-started' },
  openGraph: {
    title: 'Get Started with MechReady',
    description: 'Gamified learning across professions. Try a sample question and create your account in minutes.',
  },
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
