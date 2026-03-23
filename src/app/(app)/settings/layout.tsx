import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your MechReady account settings, notifications, and preferences.',
  robots: { index: false },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
