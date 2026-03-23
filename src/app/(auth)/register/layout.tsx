import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Sign up for MechReady and start practicing mechanical engineering interview questions for free.',
  alternates: { canonical: '/register' },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
