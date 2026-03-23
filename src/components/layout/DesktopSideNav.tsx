'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Trophy, Users, User, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import FriendsBadge from '@/components/friends/FriendsBadge';

const tabs = [
  { href: '/', label: 'Home', icon: LayoutDashboard, activeColor: 'text-indigo-600', activeBg: 'bg-indigo-50', iconColor: 'text-indigo-500' },
  { href: '/quests', label: 'Quests', icon: Swords, activeColor: 'text-orange-600', activeBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { href: '/practice/topics', label: 'Practice', icon: BookOpen, activeColor: 'text-emerald-600', activeBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  { href: '/league', label: 'League', icon: Trophy, activeColor: 'text-amber-600', activeBg: 'bg-amber-50', iconColor: 'text-amber-500' },
  { href: '/friends', label: 'Friends', icon: Users, badge: true, activeColor: 'text-pink-600', activeBg: 'bg-pink-50', iconColor: 'text-pink-500' },
  { href: '/profile', label: 'Profile', icon: User, activeColor: 'text-sky-600', activeBg: 'bg-sky-50', iconColor: 'text-sky-500' },
];

export default function DesktopSideNav() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden lg:flex flex-col w-56 shrink-0 bg-[#FAFAFA] h-screen sticky top-0"
      aria-label="Desktop navigation"
    >
      <div className="px-5 py-5 flex items-center gap-2.5">
        <img src="/icon-48.png" alt="" width={28} height={28} className="rounded-lg" />
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
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold',
                isActive
                  ? `${tab.activeBg} ${tab.activeColor}`
                  : 'text-surface-500 hover:bg-surface-50 hover:text-surface-700'
              )}
            >
              <span className={cn('relative', isActive && tab.iconColor)}>
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
