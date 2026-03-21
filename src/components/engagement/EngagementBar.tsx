'use client';

import Link from 'next/link';
import {
  useDailyQuests,
  useWeeklyQuests,
  useLeague,
  useGems,
} from '@/store/useEngagementStore';
import { leagueTiers } from '@/data/league';
import { getUserRank } from '@/lib/league-simulator';

export function EngagementBar() {
  const dailyQuests = useDailyQuests();
  const weeklyQuests = useWeeklyQuests();
  const league = useLeague();
  const gems = useGems();

  // Quest stats
  const dailyDone = dailyQuests.filter((q) => q.completed).length;
  const weeklyDone = weeklyQuests.filter((q) => q.completed).length;
  const totalQuests = dailyQuests.length + weeklyQuests.length;
  const totalDone = dailyDone + weeklyDone;
  const questsRemaining = totalQuests - totalDone;

  // League stats
  const tier = leagueTiers.find((t) => t.tier === league.currentTier) ?? leagueTiers[0];
  const rank = getUserRank(league.weeklyXp, league.competitors);

  const buttons = [
    {
      href: '/quests',
      icon: '\u2694\uFE0F',
      label: 'Quests',
      badge: questsRemaining > 0 ? `${totalDone}/${totalQuests}` : null,
      badgeDone: questsRemaining === 0 && totalQuests > 0,
      bg: '#FFF9E8',
      border: '#FFE4B8',
      color: '#B56E00',
    },
    {
      href: '/league',
      icon: tier.icon,
      label: tier.name,
      badge: `#${rank}`,
      badgeDone: false,
      bg: '#EFF6FF',
      border: '#BFDBFE',
      color: '#1D4ED8',
    },
    {
      href: '/skills',
      icon: '\uD83C\uDFAF',
      label: 'Skills',
      badge: null,
      badgeDone: false,
      bg: '#F0FDF4',
      border: '#BBF7D0',
      color: '#15803D',
    },
  ];

  return (
    <div style={{ padding: '12px 20px 0' }}>
      <div className="flex" style={{ gap: 8 }}>
        {buttons.map((btn) => (
          <Link
            key={btn.href}
            href={btn.href}
            className="flex-1 flex items-center justify-center transition-transform active:scale-95"
            style={{
              gap: 6,
              padding: '10px 8px',
              borderRadius: 14,
              background: btn.bg,
              border: `1.5px solid ${btn.border}`,
              textDecoration: 'none',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: 18 }}>{btn.icon}</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: btn.color,
                whiteSpace: 'nowrap',
              }}
            >
              {btn.label}
            </span>
            {btn.badge && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: btn.badgeDone ? 'white' : btn.color,
                  background: btn.badgeDone ? '#58CC02' : 'rgba(0,0,0,0.06)',
                  padding: '1px 6px',
                  borderRadius: 8,
                  marginLeft: 2,
                }}
              >
                {btn.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
