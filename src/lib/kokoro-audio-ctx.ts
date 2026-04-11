/**
 * Shared AudioContext for Kokoro TTS playback.
 * Must be created/resumed in a user-gesture context (click/tap/keydown).
 */

const SAMPLE_RATE = 24000;
let sharedCtx: AudioContext | null = null;

export function getSharedAudioContext(): AudioContext {
  if (!sharedCtx || sharedCtx.state === 'closed') {
    sharedCtx = new AudioContext({ sampleRate: SAMPLE_RATE });
  }
  return sharedCtx;
}

// Unlock AudioContext on first user interaction
if (typeof window !== 'undefined') {
  const unlock = () => {
    const ctx = getSharedAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    window.removeEventListener('click', unlock);
    window.removeEventListener('touchstart', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('click', unlock);
  window.addEventListener('touchstart', unlock);
  window.addEventListener('keydown', unlock);
}
