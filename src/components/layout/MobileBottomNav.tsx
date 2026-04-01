'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Trophy, User, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDailyQuests, useWeeklyQuests } from '@/store/useEngagementStore';

const tabs = [
  { href: '/', label: 'Home', icon: LayoutDashboard, activeColor: 'text-primary-600', activeBg: 'bg-primary-50', inactiveColor: 'text-slate-400' },
  { href: '/quests', label: 'Quests', icon: Swords, activeColor: 'text-orange-500', activeBg: 'bg-orange-50', inactiveColor: 'text-slate-400' },
  // Practice tab hidden until per-course practice is built
  // { href: '/practice/topics', label: 'Practice', icon: BookOpen, activeColor: 'text-emerald-600', activeBg: 'bg-emerald-50', inactiveColor: 'text-slate-400' },
  { href: '/league', label: 'League', icon: Trophy, activeColor: 'text-amber-500', activeBg: 'bg-amber-50', inactiveColor: 'text-slate-400' },
  { href: '/profile', label: 'Profile', icon: User, activeColor: 'text-sky-500', activeBg: 'bg-sky-50', inactiveColor: 'text-slate-400' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const dailyQuests = useDailyQuests();
  const weeklyQuests = useWeeklyQuests();
  const hasClaimable = [...dailyQuests, ...weeklyQuests].some(q => q.completed && !q.claimed);
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700 lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200',
                isActive ? tab.activeColor : tab.inactiveColor
              )}
            >
              <span
                className={cn(
                  'relative flex items-center justify-center w-10 h-7 rounded-full transition-all duration-200',
                  isActive && tab.activeBg
                )}
              >
                <Icon className={cn('w-5 h-5 transition-transform duration-200', isActive && 'scale-110')} />
                {tab.href === '/quests' && hasClaimable && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-surface-900" />
                )}
              </span>
              <span className={cn(
                'text-[10px] transition-all duration-200',
                isActive ? 'font-bold' : 'font-medium'
              )}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
