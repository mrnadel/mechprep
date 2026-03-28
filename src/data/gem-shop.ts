import type { ShopItem } from './engagement-types';

export const shopItems: ShopItem[] = [
  // --------------- Power-ups ---------------
  {
    id: 'shop-streak-freeze',
    name: 'Streak Freeze',
    description: 'Protect your streak for one missed day. Max 2 owned at a time.',
    icon: '🧊',
    cost: 30,
    category: 'power-up',
    type: 'streak_freeze',
    metadata: { maxOwnable: 2 },
  },
  {
    id: 'shop-streak-repair',
    name: 'Streak Repair',
    description: 'Restore your streak after you miss a day (available for 24h after a break).',
    icon: '🔧',
    cost: 50,
    category: 'power-up',
    type: 'streak_repair',
  },
  {
    id: 'shop-double-xp-30',
    name: 'Double XP — 30 min',
    description: 'Earn 2× XP on all questions for 30 minutes.',
    icon: '⚡',
    cost: 40,
    category: 'power-up',
    type: 'double_xp',
    metadata: { durationMs: 30 * 60 * 1000 },
  },

  // --------------- Titles ---------------
  {
    id: 'shop-title-thermal-king',
    name: 'Thermal King',
    description: 'Display the "Thermal King" title on your profile.',
    icon: '🌡️',
    cost: 20,
    category: 'cosmetic',
    type: 'title',
    metadata: {
      titleText: 'Thermal King',
      gradient: 'linear-gradient(135deg, #FF6B35, #F7931E, #FFD700)',
      accentColor: '#F7931E',
      glowColor: 'rgba(247,147,30,0.35)',
      bgPattern: 'radial-gradient(circle at 80% 20%, rgba(255,215,0,0.15) 0%, transparent 50%)',
    },
  },
  {
    id: 'shop-title-stress-master',
    name: 'Stress Master',
    description: 'Display the "Stress Master" title on your profile.',
    icon: '💪',
    cost: 20,
    category: 'cosmetic',
    type: 'title',
    metadata: {
      titleText: 'Stress Master',
      gradient: 'linear-gradient(135deg, #7C3AED, #A855F7, #C084FC)',
      accentColor: '#A855F7',
      glowColor: 'rgba(168,85,247,0.35)',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(168,85,247,0.12) 0%, transparent 50%)',
    },
  },
  {
    id: 'shop-title-flow-guru',
    name: 'Flow Guru',
    description: 'Display the "Flow Guru" title on your profile.',
    icon: '🌊',
    cost: 20,
    category: 'cosmetic',
    type: 'title',
    metadata: {
      titleText: 'Flow Guru',
      gradient: 'linear-gradient(135deg, #0EA5E9, #06B6D4, #2DD4BF)',
      accentColor: '#06B6D4',
      glowColor: 'rgba(6,182,212,0.35)',
      bgPattern: 'radial-gradient(circle at 70% 30%, rgba(6,182,212,0.12) 0%, transparent 50%)',
    },
  },

  // --------------- Frames — Common ---------------
  {
    id: 'shop-frame-gold',
    name: 'Gold Ring',
    description: 'A warm golden glow around your avatar. Classic prestige.',
    icon: '🟡',
    cost: 25,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'gold', borderColor: '#F59E0B', glowColor: 'rgba(245,158,11,0.4)' },
  },
  {
    id: 'shop-frame-emerald',
    name: 'Emerald Halo',
    description: 'A vibrant green halo that says "I know my stuff."',
    icon: '💚',
    cost: 30,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'emerald', borderColor: '#10B981', glowColor: 'rgba(16,185,129,0.4)' },
  },
  {
    id: 'shop-frame-ruby',
    name: 'Ruby Blaze',
    description: 'A fiery red ring for the bold and fearless.',
    icon: '❤️‍🔥',
    cost: 30,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'ruby', borderColor: '#EF4444', glowColor: 'rgba(239,68,68,0.4)' },
  },
  {
    id: 'shop-frame-sapphire',
    name: 'Sapphire Wave',
    description: 'Deep ocean blue. Calm, confident, unstoppable.',
    icon: '💙',
    cost: 30,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'sapphire', borderColor: '#3B82F6', glowColor: 'rgba(59,130,246,0.4)' },
  },
  {
    id: 'shop-frame-steel',
    name: 'Brushed Steel',
    description: 'Cold, clean, industrial. The engineer starter pack.',
    icon: '🪨',
    cost: 15,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'steel', borderColor: '#9CA3AF', glowColor: 'rgba(156,163,175,0.25)' },
  },
  {
    id: 'shop-frame-copper',
    name: 'Copper Pipe',
    description: 'Warm patina vibes. Plumbing never looked this good.',
    icon: '🟤',
    cost: 15,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'copper', borderColor: '#D97706', glowColor: 'rgba(180,83,9,0.25)' },
  },
  {
    id: 'shop-frame-bolt',
    name: 'Hex Bolt',
    description: 'Tighten up your profile. Torque spec: looking good.',
    icon: '🔩',
    cost: 18,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'bolt', borderColor: '#71717A', glowColor: 'rgba(113,113,122,0.2)' },
  },
  {
    id: 'shop-frame-blueprint',
    name: 'Blueprint Border',
    description: 'White lines on blue. Straight from the drafting table.',
    icon: '📐',
    cost: 18,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'blueprint', borderColor: '#3B82F6', glowColor: 'rgba(59,130,246,0.2)' },
  },
  {
    id: 'shop-frame-titanium',
    name: 'Titanium Band',
    description: 'Lightweight. Strong. Just like your study habits.',
    icon: '⚪',
    cost: 20,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'titanium', borderColor: '#A1A1AA', glowColor: 'rgba(161,161,170,0.2)' },
  },
  {
    id: 'shop-frame-rivet',
    name: 'Rivet Ring',
    description: 'Riveted together with pure determination.',
    icon: '⚙️',
    cost: 20,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'rivet', borderColor: '#78716C', glowColor: 'rgba(120,113,108,0.2)' },
  },
  {
    id: 'shop-frame-cast-iron',
    name: 'Cast Iron',
    description: 'Heavy-duty frame for heavy-duty learners.',
    icon: '🏗️',
    cost: 22,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'cast-iron', borderColor: '#57534E', glowColor: 'rgba(87,83,78,0.2)' },
  },
  {
    id: 'shop-frame-spring',
    name: 'Coil Spring',
    description: 'Bouncy, springy, full of potential energy.',
    icon: '🌀',
    cost: 25,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'spring', borderColor: '#10B981', glowColor: 'rgba(16,185,129,0.2)' },
  },
  {
    id: 'shop-frame-gear',
    name: 'Gear Teeth',
    description: 'Keep the gears turning. Mechanically magnificent.',
    icon: '⚙️',
    cost: 25,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'gear', borderColor: '#78716C', glowColor: 'rgba(120,113,108,0.3)' },
  },
  {
    id: 'shop-frame-gasket',
    name: 'Gasket Seal',
    description: 'Sealed tight. No knowledge leaks here.',
    icon: '⭕',
    cost: 20,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'gasket', borderColor: '#DC2626', glowColor: 'rgba(220,38,38,0.2)' },
  },
  {
    id: 'shop-frame-wire',
    name: 'Bare Wire',
    description: 'Raw and exposed. Handle with care.',
    icon: '🔌',
    cost: 15,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'wire', borderColor: '#F59E0B', glowColor: 'rgba(245,158,11,0.15)' },
  },
  {
    id: 'shop-frame-concrete',
    name: 'Concrete Ring',
    description: 'Solid foundation. Built to last.',
    icon: '🧱',
    cost: 18,
    category: 'frame',
    type: 'frame',
    rarity: 'common',
    metadata: { frameStyle: 'concrete', borderColor: '#A3A3A3', glowColor: 'rgba(163,163,163,0.15)' },
  },

  // --------------- Frames — Rare ---------------
  {
    id: 'shop-frame-diamond',
    name: 'Diamond Aura',
    description: 'A cool prismatic indigo ring. For the elite.',
    icon: '💠',
    cost: 35,
    category: 'frame',
    type: 'frame',
    rarity: 'rare',
    metadata: { frameStyle: 'diamond', borderColor: '#818CF8', glowColor: 'rgba(129,140,248,0.4)' },
  },
  {
    id: 'shop-frame-sunset',
    name: 'Sunset Gradient',
    description: 'A warm orange-to-pink gradient. Stand out at golden hour.',
    icon: '🌅',
    cost: 40,
    category: 'frame',
    type: 'frame',
    rarity: 'rare',
    metadata: { frameStyle: 'sunset', borderColor: '#F97316', glowColor: 'rgba(249,115,22,0.35)' },
  },
  {
    id: 'shop-frame-wrench',
    name: 'Torque Wrench',
    description: 'Precision-tightened to perfection. Click!',
    icon: '🔧',
    cost: 30,
    category: 'frame',
    type: 'frame',
    rarity: 'rare',
    metadata: { frameStyle: 'wrench', borderColor: '#64748B', glowColor: 'rgba(100,116,139,0.3)' },
  },
  {
    id: 'shop-frame-piston',
    name: 'Piston Ring',
    description: 'Firing on all cylinders. Max compression.',
    icon: '🔴',
    cost: 35,
    category: 'frame',
    type: 'frame',
    rarity: 'rare',
    metadata: { frameStyle: 'piston', borderColor: '#DC2626', glowColor: 'rgba(220,38,38,0.3)' },
  },
  {
    id: 'shop-frame-circuit',
    name: 'Circuit Board',
    description: 'Wired for success. Green means go.',
    icon: '🟢',
    cost: 35,
    category: 'frame',
    type: 'frame',
    rarity: 'rare',
    metadata: { frameStyle: 'circuit', borderColor: '#22C55E', glowColor: 'rgba(34,197,94,0.3)' },
  },
  {
    id: 'shop-frame-thermal',
    name: 'Thermal Gradient',
    description: 'Hot to cold. Your profile radiates heat.',
    icon: '🌡️',
    cost: 38,
    category: 'frame',
    type: 'frame',
    rarity: 'rare',
    metadata: { frameStyle: 'thermal', borderColor: '#EF4444', glowColor: 'rgba(239,68,68,0.3)' },
  },
  {
    id: 'shop-frame-weld',
    name: 'Weld Bead',
    description: 'Fused with skill. A beautiful seam of fire.',
    icon: '🔥',
    cost: 40,
    category: 'frame',
    type: 'frame',
    rarity: 'rare',
    metadata: { frameStyle: 'weld', borderColor: '#F59E0B', glowColor: 'rgba(245,158,11,0.35)' },
  },

  // --------------- Frames — Epic ---------------
  {
    id: 'shop-frame-aurora',
    name: 'Aurora Borealis',
    description: 'Shifting teal-to-violet glow. Mesmerizing.',
    icon: '🌌',
    cost: 60,
    category: 'frame',
    type: 'frame',
    rarity: 'epic',
    metadata: { frameStyle: 'aurora', borderColor: '#8B5CF6', glowColor: 'rgba(139,92,246,0.5)' },
  },
  {
    id: 'shop-frame-neon',
    name: 'Neon Pulse',
    description: 'Electric cyber glow. Impossible to miss.',
    icon: '⚡',
    cost: 45,
    category: 'frame',
    type: 'frame',
    rarity: 'epic',
    metadata: { frameStyle: 'neon', borderColor: '#22D3EE', glowColor: 'rgba(34,211,238,0.5)' },
  },
  {
    id: 'shop-frame-turbine',
    name: 'Turbine Blade',
    description: 'Spinning at 10,000 RPM. Pure power.',
    icon: '🌪️',
    cost: 50,
    category: 'frame',
    type: 'frame',
    rarity: 'epic',
    metadata: { frameStyle: 'turbine', borderColor: '#0EA5E9', glowColor: 'rgba(14,165,233,0.4)' },
  },
  {
    id: 'shop-frame-plasma',
    name: 'Plasma Arc',
    description: 'Ionized brilliance. Cuts through everything.',
    icon: '⚡',
    cost: 60,
    category: 'frame',
    type: 'frame',
    rarity: 'epic',
    metadata: { frameStyle: 'plasma', borderColor: '#A855F7', glowColor: 'rgba(168,85,247,0.45)' },
  },
  {
    id: 'shop-frame-star-drive',
    name: 'Star Drive',
    description: 'Warp-speed ambition. Reach for the stars.',
    icon: '⭐',
    cost: 65,
    category: 'frame',
    type: 'frame',
    rarity: 'epic',
    metadata: { frameStyle: 'star-drive', borderColor: '#FBBF24', glowColor: 'rgba(251,191,36,0.4)' },
  },

  // --------------- Frames — Legendary ---------------
  {
    id: 'shop-frame-singularity',
    name: 'Singularity',
    description: 'Beyond the event horizon. Infinite knowledge.',
    icon: '🕳️',
    cost: 80,
    category: 'frame',
    type: 'frame',
    rarity: 'legendary',
    metadata: { frameStyle: 'singularity', borderColor: '#3B82F6', glowColor: 'rgba(59,130,246,0.5)' },
  },
  {
    id: 'shop-frame-fusion-reactor',
    name: 'Fusion Reactor',
    description: 'Harnessing the power of stars. Unlimited energy.',
    icon: '☢️',
    cost: 100,
    category: 'frame',
    type: 'frame',
    rarity: 'legendary',
    metadata: { frameStyle: 'fusion-reactor', borderColor: '#06B6D4', glowColor: 'rgba(6,182,212,0.55)' },
  },
  {
    id: 'shop-frame-supernova',
    name: 'Supernova',
    description: 'The ultimate explosion of brilliance. Blinding.',
    icon: '💥',
    cost: 120,
    category: 'frame',
    type: 'frame',
    rarity: 'legendary',
    metadata: { frameStyle: 'supernova', borderColor: '#F59E0B', glowColor: 'rgba(245,158,11,0.6)' },
  },
];

// ─── Reward Frames (not purchasable — earned via league, streaks, achievements) ───

interface RewardFrame {
  id: string;
  name: string;
  icon: string;
  frameStyle: string;
  source: string; // how to earn it
  borderColor: string;
  glowColor: string;
}

const rewardFrames: RewardFrame[] = [
  // League
  { id: 'reward-frame-league-bronze', name: 'Bronze League', icon: '🥉', frameStyle: 'league-bronze', source: 'Start in Bronze League', borderColor: '#CD7F32', glowColor: 'rgba(205,127,50,0.3)' },
  { id: 'reward-frame-league-silver', name: 'Silver League', icon: '🥈', frameStyle: 'league-silver', source: 'Reach Silver League', borderColor: '#C0C0C0', glowColor: 'rgba(192,192,192,0.3)' },
  { id: 'reward-frame-league-gold', name: 'Gold League', icon: '🥇', frameStyle: 'league-gold', source: 'Reach Gold League', borderColor: '#FFD700', glowColor: 'rgba(255,215,0,0.3)' },
  { id: 'reward-frame-league-platinum', name: 'Platinum League', icon: '💎', frameStyle: 'league-platinum', source: 'Reach Platinum League', borderColor: '#00BCD4', glowColor: 'rgba(0,188,212,0.3)' },
  { id: 'reward-frame-league-masters', name: 'Masters League', icon: '👑', frameStyle: 'league-masters', source: 'Reach Masters League', borderColor: '#9C27B0', glowColor: 'rgba(156,39,176,0.35)' },
  // Streak milestones
  { id: 'reward-frame-streak-iron', name: 'Iron Will', icon: '🔥', frameStyle: 'streak-iron', source: '30-day streak', borderColor: '#64748B', glowColor: 'rgba(100,116,139,0.25)' },
  { id: 'reward-frame-streak-diamond', name: 'Diamond Mind', icon: '💎', frameStyle: 'streak-diamond', source: '60-day streak', borderColor: '#60A5FA', glowColor: 'rgba(96,165,250,0.3)' },
  { id: 'reward-frame-streak-centurion', name: 'Centurion', icon: '👑', frameStyle: 'streak-centurion', source: '100-day streak', borderColor: '#FBBF24', glowColor: 'rgba(251,191,36,0.35)' },
  // Achievement milestones
  { id: 'reward-frame-first-gold', name: 'First Gold', icon: '🏅', frameStyle: 'first-gold', source: 'Complete your first golden lesson', borderColor: '#CA8A04', glowColor: 'rgba(202,138,4,0.3)' },
  { id: 'reward-frame-marathon', name: 'Marathon Runner', icon: '🏃', frameStyle: 'marathon', source: 'Answer 1,000 questions correctly', borderColor: '#2563EB', glowColor: 'rgba(37,99,235,0.3)' },
  { id: 'reward-frame-early-bird', name: 'Early Adopter', icon: '🐦', frameStyle: 'early-bird', source: 'Be among the first 100 users', borderColor: '#F97316', glowColor: 'rgba(249,115,22,0.3)' },
  { id: 'reward-frame-perfect-unit', name: 'Flawless', icon: '💯', frameStyle: 'perfect-unit', source: '100% accuracy on entire unit', borderColor: '#059669', glowColor: 'rgba(5,150,105,0.35)' },
  { id: 'reward-frame-speed-demon', name: 'Speed Demon', icon: '⚡', frameStyle: 'speed-demon', source: 'Complete 10 lessons in a day', borderColor: '#EAB308', glowColor: 'rgba(234,179,8,0.4)' },
  { id: 'reward-frame-perfectionist', name: 'Perfectionist', icon: '🎯', frameStyle: 'perfectionist', source: '100% accuracy on 25 lessons', borderColor: '#DC2626', glowColor: 'rgba(220,38,38,0.35)' },
  { id: 'reward-frame-all-gold', name: 'Golden Engineer', icon: '👑', frameStyle: 'all-gold', source: 'Complete ALL golden lessons', borderColor: '#EAB308', glowColor: 'rgba(234,179,8,0.5)' },
];

// Reward titles (not purchasable)
const rewardTitles: { id: string; name: string; titleText: string; icon: string; source: string }[] = [
  { id: 'reward-title-consistent', name: 'Consistent', titleText: 'Consistent', icon: '⚡', source: '14-day streak' },
  { id: 'reward-title-iron-will', name: 'Iron Will', titleText: 'Iron Will', icon: '🔥', source: '30-day streak' },
  { id: 'reward-title-diamond-mind', name: 'Diamond Mind', titleText: 'Diamond Mind', icon: '💎', source: '60-day streak' },
  { id: 'reward-title-centurion', name: 'Centurion', titleText: 'Centurion', icon: '👑', source: '100-day streak' },
];

// ─── Lookup helpers ───

/** Find frame metadata by item ID (works for shop + reward frames) */
export function findFrameById(frameId: string): { frameStyle: string; name: string; icon: string; borderColor: string; source?: string } | null {
  const shopItem = shopItems.find((i) => i.id === frameId && i.type === 'frame');
  if (shopItem?.metadata) {
    return {
      frameStyle: shopItem.metadata.frameStyle as string,
      name: shopItem.name,
      icon: shopItem.icon,
      borderColor: (shopItem.metadata.borderColor as string) || '#F59E0B',
    };
  }
  const reward = rewardFrames.find((r) => r.id === frameId);
  if (reward) {
    return { frameStyle: reward.frameStyle, name: reward.name, icon: reward.icon, borderColor: reward.borderColor, source: reward.source };
  }
  return null;
}

/** Find title text by item ID (works for shop + reward titles) */
export function findTitleById(titleId: string): string | null {
  const shopItem = shopItems.find((i) => i.id === titleId && i.type === 'title');
  if (shopItem?.metadata?.titleText) return shopItem.metadata.titleText as string;
  const reward = rewardTitles.find((r) => r.id === titleId);
  if (reward) return reward.titleText;
  return null;
}

// Helper: get frame visual style from metadata (legacy — use findFrameById instead)
function getFrameStyle(frameStyle: string | undefined): { border: string; boxShadow: string } | null {
  if (!frameStyle) return null;
  const item = shopItems.find((i) => i.type === 'frame' && i.metadata?.frameStyle === frameStyle);
  if (item?.metadata) {
    const borderColor = (item.metadata.borderColor as string) || '#F59E0B';
    const glowColor = (item.metadata.glowColor as string) || 'rgba(245,158,11,0.4)';
    return { border: `3px solid ${borderColor}`, boxShadow: `0 0 12px ${glowColor}` };
  }
  const reward = rewardFrames.find((r) => r.frameStyle === frameStyle);
  if (reward) {
    return { border: `3px solid ${reward.borderColor}`, boxShadow: `0 0 12px ${reward.glowColor}` };
  }
  return null;
}
