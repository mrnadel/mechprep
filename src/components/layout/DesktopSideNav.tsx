'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Trophy, Users, User, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';
import FriendsBadge from '@/components/friends/FriendsBadge';
import { ProfessionPickerModal } from '@/components/profession/ProfessionPickerModal';
import { useCourseStore } from '@/store/useCourseStore';
import { getProfession } from '@/data/professions';

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
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const setActiveProfession = useCourseStore((s) => s.setActiveProfession);
  const profession = getProfession(activeProfession);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <ProfessionPickerModal
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        selectedId={activeProfession}
        onSelect={setActiveProfession}
      />

      <nav
        className="hidden lg:flex flex-col w-56 shrink-0 bg-[#FAFAFA] h-screen sticky top-0"
        aria-label="Desktop navigation"
      >
        <div className="px-5 py-5">
          <p className="text-lg font-black text-surface-800">{APP_NAME}</p>
          {profession && (
            <button
              onClick={() => setShowPicker(true)}
              className="flex items-center gap-1.5 mt-1 text-xs font-bold text-surface-400 hover:text-surface-600 transition-colors"
            >
              <span>{profession.icon}</span>
              <span>{profession.shortName}</span>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
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
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-semibold min-h-[44px]',
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
    </>
  );
}
