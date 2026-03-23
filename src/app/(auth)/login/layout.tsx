import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Sign in to your MechReady account to continue practicing mechanical engineering interview questions.',
  alternates: { canonical: '/login' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
