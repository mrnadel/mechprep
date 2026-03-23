import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Started',
  description: 'Start your mechanical engineering interview prep journey. Try a sample question, create your free account, and begin learning.',
  alternates: { canonical: '/get-started' },
  openGraph: {
    title: 'Get Started with MechReady',
    description: 'Free mechanical engineering interview prep. Try a sample question and create your account in minutes.',
  },
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
