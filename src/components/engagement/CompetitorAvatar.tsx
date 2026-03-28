'use client';

import { memo, useMemo } from 'react';
import Image from 'next/image';
import { getFakeUserById } from '@/lib/fake-user-generator';
import { getFakeAvatarUrl, getInitialsColor } from '@/lib/fake-avatar';
import { AvatarFrame } from '@/components/ui/AvatarFrame';
import type { FrameStyleId } from '@/components/ui/AvatarFrame';

interface CompetitorAvatarProps {
  fakeUserId?: string;
  avatarInitial: string;
  isUser: boolean;
  size?: number; // px, default 32
  frameStyle?: string;
}

export const CompetitorAvatar = memo(function CompetitorAvatar({
  fakeUserId,
  avatarInitial,
  isUser,
  size = 32,
  frameStyle,
}: CompetitorAvatarProps) {
  const avatarUrl = useMemo(() => {
    if (isUser || !fakeUserId) return null;
    const user = getFakeUserById(fakeUserId);
    if (!user) return null;
    return getFakeAvatarUrl(user);
  }, [fakeUserId, isUser]);

  const bgColor = useMemo(() => {
    if (isUser) return '#2563EB';
    if (avatarUrl) return 'transparent';
    return fakeUserId ? getInitialsColor(fakeUserId) : '#6B7280';
  }, [isUser, avatarUrl, fakeUserId]);

  const hasFrame = !isUser && !!frameStyle;

  const avatarContent = avatarUrl ? (
    <Image
      src={avatarUrl}
      alt={`${avatarInitial} avatar`}
      width={hasFrame ? size - 8 : size}
      height={hasFrame ? size - 8 : size}
      className="w-full h-full object-cover"
    />
  ) : (
    <div
      className="w-full h-full flex items-center justify-center font-bold text-white"
      style={{
        background: bgColor,
        fontSize: (hasFrame ? size - 8 : size) * 0.4,
      }}
    >
      {avatarInitial}
    </div>
  );

  if (hasFrame) {
    // Render with frame — frame adds ~6px padding, so we use a slightly larger outer
    const frameSize = size + 8;
    return (
      <div className="flex-shrink-0" style={{ width: frameSize, height: frameSize, margin: -4 }}>
        <AvatarFrame frameStyle={frameStyle as FrameStyleId} size={frameSize}>
          {avatarContent}
        </AvatarFrame>
      </div>
    );
  }

  // No frame — render plain circle
  return (
    <div
      className="rounded-full overflow-hidden flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {avatarContent}
    </div>
  );
});
