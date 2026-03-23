'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Trophy, Users, User, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import FriendsBadge from '@/components/friends/FriendsBadge';

const tabs = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/quests', label: 'Quests', icon: Swords },
  { href: '/practice/topics', label: 'Practice', icon: BookOpen },
  { href: '/league', label: 'League', icon: Trophy },
  { href: '/friends', label: 'Friends', icon: Users, badge: true },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function DesktopSideNav() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden lg:flex flex-col w-56 shrink-0 bg-[#FAFAFA] h-screen sticky top-0"
      aria-label="Desktop navigation"
    >
      <div className="px-5 py-5">
        <p className="text-lg font-black text-surface-800">MechReady</p>
      </div>

      <div className="flex flex-col gap-1 px-3 mt-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-semibold',
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-surface-500 hover:bg-surface-50 hover:text-surface-700'
              )}
            >
              <span className="relative">
                <Icon className="w-5 h-5" />
                {tab.badge && <FriendsBadge />}
              </span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
