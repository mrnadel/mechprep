import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Sign up for MechReady and start learning for free across multiple professions.',
  alternates: { canonical: '/register' },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
