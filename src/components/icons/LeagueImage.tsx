import Image from 'next/image';
import type { LeagueTier } from '@/data/engagement-types';

interface LeagueImageProps {
  tier: LeagueTier;
  size?: number;
  className?: string;
}

export function LeagueImage({ tier, size = 48, className }: LeagueImageProps) {
  return (
    <Image
      src={tier.image}
      alt={`${tier.name} League`}
      width={size}
      height={size}
      className={className}
      draggable={false}
    />
  );
}
