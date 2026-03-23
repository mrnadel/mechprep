import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Support',
  description: 'Get help with MechReady. Browse FAQs or email our support team for account, billing, or content questions.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
