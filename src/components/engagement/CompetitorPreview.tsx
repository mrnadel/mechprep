'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getFakeUserById } from '@/lib/fake-user-generator';
import { getFakeAvatarUrl, getInitialsColor } from '@/lib/fake-avatar';
import { getLevelForXp } from '@/data/levels';
import { leagueTiers } from '@/data/league';
import { achievements } from '@/data/achievements';
import { AvatarFrame } from '@/components/ui/AvatarFrame';
import type { FrameStyleId } from '@/components/ui/AvatarFrame';

interface CompetitorPreviewProps {
  fakeUserId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CompetitorPreview({ fakeUserId, isOpen, onClose }: CompetitorPreviewProps) {
  const user = useMemo(() => {
    if (!fakeUserId) return null;
    return getFakeUserById(fakeUserId);
  }, [fakeUserId]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!user) return null;

  const level = getLevelForXp(user.totalXp);
  const tier = leagueTiers.find((t) => t.tier === user.currentTier) ?? leagueTiers[0];
  const avatarUrl = getFakeAvatarUrl(user);
  const initialsColor = getInitialsColor(user.id);
  const frameStyle = user.frameStyle as FrameStyleId | undefined;

  const joinDate = new Date(user.joinDate);
  const daysAgo = Math.floor((Date.now() - joinDate.getTime()) / 86400000);
  const joinLabel =
    daysAgo === 0 ? 'Joined today' :
    daysAgo === 1 ? 'Joined yesterday' :
    daysAgo < 7 ? `Joined ${daysAgo} days ago` :
    daysAgo < 30 ? `Joined ${Math.floor(daysAgo / 7)} weeks ago` :
    `Joined ${Math.floor(daysAgo / 30)} months ago`;

  const userAchievements = user.achievementsUnlocked
    .map((id) => achievements.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const avatarContent = avatarUrl ? (
    <Image src={avatarUrl} alt={user.name} width={56} height={56} className="w-full h-full rounded-full object-cover" />
  ) : (
    <div
      className="w-full h-full rounded-full flex items-center justify-center text-xl font-bold text-white"
      style={{ background: initialsColor }}
    >
      {user.name.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 lg:flex lg:items-center lg:justify-center"
            onClick={onClose}
          >
            {/* Desktop: centered modal */}
            <motion.div
              initial={{ y: '100%', opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[80vh] overflow-y-auto shadow-xl lg:static lg:rounded-2xl lg:max-w-[400px] lg:w-full lg:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle — mobile only */}
              <div className="flex justify-center pt-3 pb-1 lg:hidden">
                <div className="w-10 h-1 rounded-full bg-gray-300" />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors lg:top-4 lg:right-4"
              >
                <X size={18} className="text-gray-400" />
              </button>

              <div className="px-5 pb-6 pt-2 space-y-5 lg:pt-5">
                {/* Header: avatar + name */}
                <div className="flex items-center gap-3">
                  {frameStyle ? (
                    <div className="flex-shrink-0" style={{ width: 64, height: 64 }}>
                      <AvatarFrame frameStyle={frameStyle} size={64}>
                        {avatarContent}
                      </AvatarFrame>
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      {avatarContent}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{joinLabel}</p>
                  </div>
                </div>

                {/* Stats row — emoji icons */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">
                      {'\u2B50'} {level.level}
                    </p>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">
                      {user.currentStreak > 0 ? `\u{1F525} ${user.currentStreak}` : '\u2014'}
                    </p>
                    <p className="text-xs text-gray-500">Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">
                      {'\u26A1'}{' '}
                      {user.totalXp >= 1000 ? `${(user.totalXp / 1000).toFixed(1)}K` : user.totalXp}
                    </p>
                    <p className="text-xs text-gray-500">Total XP</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color: tier.color }}>
                      {tier.icon}
                    </p>
                    <p className="text-xs text-gray-500">{tier.name}</p>
                  </div>
                </div>

                {/* Achievements */}
                {userAchievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {userAchievements.map((ach) => (
                        <div
                          key={ach.id}
                          className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg"
                          title={ach.description}
                        >
                          <span className="text-sm">{ach.icon}</span>
                          <span className="text-xs font-medium text-gray-600">{ach.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
