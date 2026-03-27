import Image from 'next/image';

export const MASCOT_POSES = {
  neutral: '/mascot/neutral.png',
  excited: '/mascot/excited.png',
  worried: '/mascot/worried.png',
  sleeping: '/mascot/sleeping.png',
  winking: '/mascot/winking.png',
  sad: '/mascot/sad.png',
  thinking: '/mascot/thinking.png',
  celebrating: '/mascot/celebrating.png',
  laughing: '/mascot/laughing.png',
  proud: '/mascot/proud.png',
  sword: '/mascot/sword.png',
  torch: '/mascot/torch.png',
  explorer: '/mascot/explorer.png',
  pro: '/mascot/pro.png',
  champion: '/mascot/champion.png',
} as const;

export type MascotPose = keyof typeof MASCOT_POSES;

interface MascotProps {
  pose: MascotPose;
  size?: number;
  className?: string;
}

export function Mascot({ pose, size = 120, className }: MascotProps) {
  return (
    <Image
      src={MASCOT_POSES[pose]}
      alt=""
      width={size}
      height={size}
      className={className}
      draggable={false}
      priority
    />
  );
}
