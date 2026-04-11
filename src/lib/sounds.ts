/**
 * Sound engine for Octokeen. Synthesises all game sounds using the Web Audio API
 * so zero audio files are needed. Each sound is a short composition of oscillator
 * tones and/or noise bursts shaped by gain envelopes.
 *
 * Usage: import { playSound } from '@/lib/sounds'; playSound('correct');
 */

import { useSoundStore } from '@/store/useSoundStore';

// ── Sound name registry ──

export type SoundName =
  | 'correct'
  | 'wrong'
  | 'tap'
  | 'xpTick'
  | 'levelUp'
  | 'achievement'
  | 'heartLost'
  | 'sessionComplete'
  | 'streakMilestone'
  | 'questComplete'
  | 'chestOpen'
  | 'purchase'
  | 'leagueUp'
  | 'leagueDown'
  | 'leagueWinner'
  | 'courseComplete'
  | 'welcomeBack'
  | 'streakFreeze'
  | 'streakBroke'
  | 'equip'
  | 'toast'
  | 'claimReward'
  | 'dailyRewardClaim'
  | 'outOfHearts'
  | 'lessonFail'
  | 'lessonPass'
  | 'streak'
  | 'nudgeGentle'
  | 'nudgeUrgent';

// ── Audio context singleton ──

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function getMaster(): GainNode {
  getCtx();
  return masterGain!;
}

// ── Primitives ──

/** Play a single tone with an attack-decay envelope. */
function tone(
  freq: number,
  dur: number,
  type: OscillatorType = 'sine',
  delay = 0,
  amp = 0.28,
) {
  const c = getCtx();
  const m = getMaster();
  const osc = c.createOscillator();
  const gain = c.createGain();
  const t0 = c.currentTime + delay;
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.001, t0);
  gain.gain.linearRampToValueAtTime(amp, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  osc.connect(gain);
  gain.connect(m);
  osc.start(t0);
  osc.stop(t0 + dur);
}

/** Play a descending-frequency sweep. */
function sweep(
  startFreq: number,
  endFreq: number,
  dur: number,
  type: OscillatorType = 'sine',
  delay = 0,
  amp = 0.22,
) {
  const c = getCtx();
  const m = getMaster();
  const osc = c.createOscillator();
  const gain = c.createGain();
  const t0 = c.currentTime + delay;
  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, t0);
  osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + dur);
  gain.gain.setValueAtTime(amp, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  osc.connect(gain);
  gain.connect(m);
  osc.start(t0);
  osc.stop(t0 + dur);
}

/** Play a short noise burst (filtered). */
function noise(dur: number, delay = 0, freq = 4000, amp = 0.08) {
  const c = getCtx();
  const m = getMaster();
  const len = Math.max(1, Math.floor(c.sampleRate * dur));
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const gain = c.createGain();
  const filter = c.createBiquadFilter();
  const t0 = c.currentTime + delay;
  filter.type = 'highpass';
  filter.frequency.value = freq;
  gain.gain.setValueAtTime(amp, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(m);
  src.start(t0);
}

// ── Sound definitions ──

const sounds: Record<SoundName, () => void> = {
  // ─ Practice ─

  correct() {
    tone(659, 0.12, 'sine', 0);       // E5
    tone(880, 0.22, 'sine', 0.07);    // A5
  },

  wrong() {
    tone(185, 0.18, 'square', 0, 0.15);
    tone(145, 0.14, 'square', 0.06, 0.12);
  },

  tap() {
    noise(0.035);
    tone(900, 0.025, 'sine', 0, 0.15);
  },

  xpTick() {
    tone(1200, 0.035, 'sine', 0, 0.12);
  },

  // ─ Celebrations ─

  levelUp() {
    tone(523, 0.18, 'sine', 0);       // C5
    tone(659, 0.18, 'sine', 0.1);     // E5
    tone(784, 0.18, 'sine', 0.2);     // G5
    tone(1047, 0.35, 'sine', 0.3);    // C6
  },

  achievement() {
    tone(880, 0.22, 'sine', 0);       // A5
    tone(1109, 0.22, 'sine', 0.06);   // C#6
    tone(1319, 0.32, 'sine', 0.12);   // E6
  },

  sessionComplete() {
    tone(523, 0.25, 'sine', 0);       // C5
    tone(659, 0.25, 'sine', 0);       // E5 (chord)
    tone(784, 0.25, 'sine', 0);       // G5
    tone(1047, 0.4, 'sine', 0.18);    // C6
  },

  lessonPass() {
    // Victory fanfare: brass-style triangle waves, quick rhythmic motif
    // Da-da-da-DAAA! (short-short-short-long, rising)
    tone(523, 0.1, 'triangle', 0, 0.3);       // C5  (da)
    tone(523, 0.1, 'triangle', 0.1, 0.3);     // C5  (da)
    tone(523, 0.1, 'triangle', 0.2, 0.3);     // C5  (da)
    tone(659, 0.12, 'triangle', 0.32, 0.32);  // E5  (rising)
    tone(784, 0.12, 'triangle', 0.42, 0.32);  // G5  (rising)
    // Big final chord: C major triad held
    tone(1047, 0.55, 'triangle', 0.52, 0.3);  // C6
    tone(784, 0.55, 'triangle', 0.52, 0.22);  // G5
    tone(1319, 0.55, 'triangle', 0.52, 0.18); // E6
    // Shimmer overtone on top
    tone(2093, 0.4, 'sine', 0.54, 0.06);      // C7 sparkle
    noise(0.06, 0.52, 5000, 0.04);             // bright sizzle
  },

  lessonFail() {
    tone(330, 0.2, 'sine', 0);        // E4
    tone(277, 0.2, 'sine', 0.12);     // C#4
    tone(247, 0.35, 'sine', 0.24);    // B3
  },

  // ─ Streaks ─

  streakMilestone() {
    tone(523, 0.12, 'sine', 0);
    tone(659, 0.12, 'sine', 0.08);
    tone(784, 0.12, 'sine', 0.16);
    tone(1047, 0.12, 'sine', 0.24);
    tone(1319, 0.35, 'sine', 0.32);
  },

  streakFreeze() {
    tone(1047, 0.12, 'sine', 0, 0.18);
    tone(1319, 0.12, 'sine', 0.07, 0.18);
    tone(1568, 0.12, 'sine', 0.14, 0.18);
    tone(1760, 0.22, 'sine', 0.21, 0.18);
  },

  streakBroke() {
    tone(440, 0.15, 'sine', 0);
    tone(370, 0.15, 'sine', 0.1);
    tone(311, 0.15, 'sine', 0.2);
    tone(262, 0.28, 'sine', 0.3);
  },

  // ─ Hearts ─

  heartLost() {
    sweep(440, 220, 0.28, 'sine', 0, 0.2);
  },

  outOfHearts() {
    tone(440, 0.18, 'sine', 0);
    tone(370, 0.18, 'sine', 0.12);
    tone(311, 0.35, 'sine', 0.24);
  },

  // ─ Quests & Chests ─

  questComplete() {
    tone(880, 0.18, 'sine', 0);
    tone(1047, 0.28, 'sine', 0.1);
  },

  claimReward() {
    tone(880, 0.08, 'sine', 0);
    tone(1047, 0.08, 'sine', 0.05);
    tone(1319, 0.14, 'sine', 0.1);
    noise(0.04, 0.1);
  },

  dailyRewardClaim() {
    // Cheerful ascending arpeggio + sparkle
    tone(523, 0.1, 'sine', 0, 0.2);       // C5
    tone(659, 0.1, 'sine', 0.08, 0.2);    // E5
    tone(784, 0.1, 'sine', 0.16, 0.2);    // G5
    tone(1047, 0.2, 'sine', 0.24, 0.25);  // C6
    noise(0.04, 0.24, 4000, 0.06);        // sparkle
  },

  chestOpen() {
    tone(440, 0.08, 'sine', 0);
    tone(554, 0.08, 'sine', 0.06);
    tone(659, 0.08, 'sine', 0.12);
    tone(880, 0.08, 'sine', 0.18);
    tone(1047, 0.25, 'sine', 0.24);
    noise(0.08, 0.24, 3000);
  },

  // ─ Leagues ─

  leagueUp() {
    tone(523, 0.16, 'triangle', 0);
    tone(659, 0.16, 'triangle', 0.12);
    tone(784, 0.16, 'triangle', 0.24);
    tone(1047, 0.32, 'triangle', 0.36);
  },

  leagueDown() {
    tone(523, 0.22, 'sine', 0, 0.18);
    tone(440, 0.22, 'sine', 0.14, 0.18);
    tone(349, 0.3, 'sine', 0.28, 0.18);
  },

  leagueWinner() {
    tone(523, 0.12, 'triangle', 0);
    tone(659, 0.12, 'triangle', 0.08);
    tone(784, 0.12, 'triangle', 0.16);
    tone(1047, 0.16, 'triangle', 0.24);
    tone(1319, 0.12, 'triangle', 0.32);
    tone(1568, 0.4, 'triangle', 0.4);
  },

  // ─ Course completion ─

  courseComplete() {
    // Big opening chord
    tone(523, 0.3, 'sine', 0);
    tone(659, 0.3, 'sine', 0);
    tone(784, 0.3, 'sine', 0);
    // Ascending run
    tone(880, 0.16, 'sine', 0.22);
    tone(1047, 0.16, 'sine', 0.3);
    tone(1319, 0.16, 'sine', 0.38);
    // Final chord
    tone(1568, 0.5, 'sine', 0.46);
    tone(1047, 0.5, 'sine', 0.46);
    tone(784, 0.5, 'sine', 0.46);
  },

  // ─ Shop ─

  purchase() {
    noise(0.025);
    tone(1319, 0.12, 'sine', 0.025);  // E6
    tone(1568, 0.16, 'sine', 0.1);    // G6
  },

  equip() {
    noise(0.05);
    tone(660, 0.06, 'sine', 0.03);
    tone(990, 0.05, 'sine', 0.06);
  },

  // ─ Misc UI ─

  welcomeBack() {
    tone(523, 0.25, 'sine', 0);
    tone(659, 0.25, 'sine', 0.12);
    tone(784, 0.35, 'sine', 0.24);
  },

  toast() {
    tone(800, 0.05, 'sine', 0, 0.1);
    tone(1000, 0.04, 'sine', 0.03, 0.1);
  },

  streak() {
    tone(880, 0.08, 'sine', 0, 0.15);
    tone(1047, 0.08, 'sine', 0.06, 0.15);
    tone(1319, 0.1, 'sine', 0.12, 0.18);
  },

  // ─ Nudges ─

  nudgeGentle() {
    // Soft two-note chime
    tone(880, 0.12, 'sine', 0, 0.15);
    tone(1047, 0.18, 'sine', 0.08, 0.15);
  },

  nudgeUrgent() {
    // Attention-grabbing three-note pattern
    tone(880, 0.1, 'triangle', 0, 0.2);
    tone(880, 0.1, 'triangle', 0.12, 0.2);
    tone(1047, 0.2, 'triangle', 0.24, 0.25);
  },
};

// ── Public API ──

export function playSound(name: SoundName): void {
  if (typeof window === 'undefined') return;
  const { enabled, volume } = useSoundStore.getState();
  if (!enabled) return;
  try {
    const m = getMaster();
    m.gain.value = volume;
    sounds[name]();
  } catch {
    // Silently fail if AudioContext unavailable (e.g. restrictive browser policy)
  }
}
