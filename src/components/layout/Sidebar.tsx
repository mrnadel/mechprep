'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Zap,
  BookOpen,
  Timer,
  Calendar,
  Wrench,
  AlertTriangle,
  BarChart3,
  Trophy,
  ChevronLeft,
  Target,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { useSidebar, useProgress } from '@/store/useStore';
import { useSubscription } from '@/hooks/useSubscription';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/practice/adaptive', label: 'Adaptive Practice', icon: Zap },
  { href: '/practice/topics', label: 'Topic Deep Dive', icon: BookOpen },
  { href: '/practice/interview', label: 'Interview Simulation', icon: Timer },
  { href: '/practice/daily', label: 'Daily Challenge', icon: Calendar },
  { href: '/practice/real-world', label: 'Real-World Systems', icon: Wrench },
  { href: '/practice/weak-areas', label: 'Weak Areas', icon: AlertTriangle },
  { divider: true } as const,
  { href: '/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/progress', label: 'Progress & Analytics', icon: BarChart3 },
  { href: '/skills', label: 'Skill Map', icon: Target },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
];

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> } | { divider: true };

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const progress = useProgress();
  const { tier, isTrialing, isProUser } = useSubscription();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        aria-label="Main navigation"
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-white border-r border-surface-200 transition-all duration-300 flex flex-col',
          sidebarOpen ? 'w-64' : 'w-0 lg:w-16',
          !sidebarOpen && 'overflow-hidden lg:overflow-visible'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-surface-200 shrink-0">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg text-surface-900">MechPrep</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className={cn(
              'p-1.5 rounded-lg hover:bg-surface-100 transition-colors text-surface-500',
              !sidebarOpen && 'mx-auto'
            )}
          >
            <ChevronLeft className={cn('w-4 h-4 transition-transform', !sidebarOpen && 'rotate-180')} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {(navItems as NavItem[]).map((item, i) => {
            if ('divider' in item) {
              return <div key={i} className="my-2 mx-2 border-t border-surface-200" />;
            }

            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 mb-0.5',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                )}
              >
                <Icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-primary-600' : 'text-surface-400')} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade CTA for free users */}
        {sidebarOpen && !isProUser && (
          <div className="px-2 pb-2 shrink-0">
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              Upgrade to Pro
            </Link>
          </div>
        )}

        {/* User Stats Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-surface-200 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-700 font-semibold text-sm">
                  {progress.displayName.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-surface-900 truncate">{progress.displayName}</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-surface-500">Level {progress.currentLevel} · {progress.totalXp} XP</p>
                  <span className={cn(
                    'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                    isProUser
                      ? 'bg-primary-100 text-primary-700'
                      : isTrialing
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-surface-100 text-surface-500'
                  )}>
                    {isProUser && !isTrialing ? 'PRO' : isTrialing ? 'TRIAL' : 'FREE'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
