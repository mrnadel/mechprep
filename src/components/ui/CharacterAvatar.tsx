import Image from 'next/image';

/**
 * Character pose registry. Maps `{characterId}-{pose}` keys to image paths.
 * The default pose (no suffix) is the character's primary/neutral image.
 * Add new characters and poses by dropping images in public/characters/ and adding entries here.
 */
export const CHARACTER_IMAGES: Record<string, string> = {
  // Personal Finance — Alex
  'pf-alex':              '/characters/pf-alex-neutral.png',
  'pf-alex-neutral':      '/characters/pf-alex-neutral.png',
  'pf-alex-excited':      '/characters/pf-alex-excited.png',
  'pf-alex-thinking':     '/characters/pf-alex-thinking.png',
  'pf-alex-worried':      '/characters/pf-alex-worried.png',
  'pf-alex-celebrating':  '/characters/pf-alex-celebrating.png',
  'pf-alex-explaining':   '/characters/pf-alex-explaining.png',
  // Personal Finance — Jordan
  'pf-jordan':              '/characters/pf-jordan-neutral.png',
  'pf-jordan-neutral':      '/characters/pf-jordan-neutral.png',
  'pf-jordan-thinking':     '/characters/pf-jordan-thinking.png',
  'pf-jordan-proud':        '/characters/pf-jordan-proud.png',
  'pf-jordan-concerned':    '/characters/pf-jordan-concerned.png',
  'pf-jordan-celebrating':  '/characters/pf-jordan-celebrating.png',
  'pf-jordan-encouraging':  '/characters/pf-jordan-encouraging.png',
  // Psychology — Dr. Maya
  'psy-maya':               '/characters/psy-maya-neutral.png',
  'psy-maya-neutral':       '/characters/psy-maya-neutral.png',
  'psy-maya-explaining':    '/characters/psy-maya-explaining.png',
  'psy-maya-surprised':     '/characters/psy-maya-surprised.png',
  'psy-maya-proud':         '/characters/psy-maya-proud.png',
  'psy-maya-thinking':      '/characters/psy-maya-thinking.png',
  'psy-maya-questioning':   '/characters/psy-maya-questioning.png',
  // Psychology — Sam
  'psy-sam':              '/characters/psy-sam-neutral.png',
  'psy-sam-neutral':      '/characters/psy-sam-neutral.png',
  'psy-sam-mindblown':    '/characters/psy-sam-mindblown.png',
  'psy-sam-excited':      '/characters/psy-sam-excited.png',
  'psy-sam-confused':     '/characters/psy-sam-confused.png',
  'psy-sam-celebrating':  '/characters/psy-sam-celebrating.png',
  'psy-sam-focused':      '/characters/psy-sam-focused.png',
  // Space — Captain Nova
  'space-nova':               '/characters/space-nova-neutral.png',
  'space-nova-neutral':       '/characters/space-nova-neutral.png',
  'space-nova-saluting':      '/characters/space-nova-saluting.png',
  'space-nova-explaining':    '/characters/space-nova-explaining.png',
  'space-nova-remembering':   '/characters/space-nova-remembering.png',
  'space-nova-impressed':     '/characters/space-nova-impressed.png',
  'space-nova-celebrating':   '/characters/space-nova-celebrating.png',
  // Space — Kai
  'space-kai':              '/characters/space-kai-neutral.png',
  'space-kai-neutral':      '/characters/space-kai-neutral.png',
  'space-kai-pointing':     '/characters/space-kai-pointing.png',
  'space-kai-mindblown':    '/characters/space-kai-mindblown.png',
  'space-kai-thinking':     '/characters/space-kai-thinking.png',
  'space-kai-excited':      '/characters/space-kai-excited.png',
  'space-kai-telescope':    '/characters/space-kai-telescope.png',
};

/** All available poses for a given character. */
export function getCharacterPoses(characterId: string): string[] {
  const prefix = characterId + '-';
  return Object.keys(CHARACTER_IMAGES).filter(k => k.startsWith(prefix));
}

interface CharacterAvatarProps {
  characterId: string;
  /** Optional pose suffix (e.g., 'excited', 'thinking'). Falls back to default if pose not found. */
  pose?: string | null;
  size?: number;
  className?: string;
  priority?: boolean;
}

export function CharacterAvatar({ characterId, pose, size = 80, className, priority }: CharacterAvatarProps) {
  // Try pose-specific image first, then default, then convention-based path
  const poseKey = pose ? `${characterId}-${pose}` : characterId;
  const src = CHARACTER_IMAGES[poseKey]
    ?? CHARACTER_IMAGES[characterId]
    ?? `/characters/${characterId}.png`;

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ width: 'auto', height: 'auto' }}
      draggable={false}
      priority={priority}
      unoptimized
    />
  );
}
