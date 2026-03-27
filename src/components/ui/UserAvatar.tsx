'use client';

import Image from 'next/image';

interface UserAvatarProps {
  /** Full image URL or null for initials fallback */
  image?: string | null;
  /** Display name used for alt text and initials fallback */
  name: string;
  /** Avatar diameter in px. Default: 40 */
  size?: number;
  /** Background color for initials circle. Default: '#E0E7FF' */
  bgColor?: string;
  /** Text color for initials. Default: 'text-primary-700' */
  textClass?: string;
}

export function UserAvatar({
  image,
  name,
  size = 40,
  bgColor = '#E0E7FF',
  textClass = 'text-primary-700',
}: UserAvatarProps) {
  const initials = (name || '?').charAt(0).toUpperCase();
  const fontSize = size <= 28 ? 'text-[10px]' : size <= 36 ? 'text-xs' : 'text-sm';

  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
      style={{ width: size, height: size, background: image ? 'transparent' : bgColor }}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={`${textClass} font-bold ${fontSize}`}>{initials}</span>
      )}
    </div>
  );
}
