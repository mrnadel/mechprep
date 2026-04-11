'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useNarrationStore } from '@/store/useNarrationStore';
import { getKokoroClient } from '@/lib/kokoro-client';
import { getVoiceForCharacter } from '@/data/voice-config';

const SAMPLE_RATE = 24000;

interface AudioButtonProps {
  text: string;
  characterId?: string | null;
  color?: string;
  size?: number;
}

/**
 * Speaker icon that shows:
 * - Download progress (%) while model loads
 * - Pulsing speaker while generating/playing
 * - Static speaker when idle and ready
 */
export function AudioButton({ text, characterId, color = '#8B5CF6', size = 18 }: AudioButtonProps) {
  const enabled = useNarrationStore((s) => s.enabled);
  const rate = useNarrationStore((s) => s.rate);
  const [playing, setPlaying] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Track model readiness
  useEffect(() => {
    if (!enabled) return;
    const client = getKokoroClient();
    if (client.isReady) {
      setModelReady(true);
      return;
    }
    // Start init and track progress
    client.init(
      (p) => setProgress(p),
      () => setModelReady(true),
    ).catch(() => {});
  }, [enabled]);

  useEffect(() => {
    return () => {
      try { sourceRef.current?.stop(); } catch { /* */ }
      sourceRef.current = null;
    };
  }, []);

  const handlePlay = useCallback(async () => {
    try { sourceRef.current?.stop(); } catch { /* */ }
    sourceRef.current = null;

    const client = getKokoroClient();
    if (!client.isReady || !text) return;

    const { voice } = getVoiceForCharacter(characterId ?? null);
    setPlaying(true);

    try {
      const pcm = await client.generate(text, voice, 0.95);

      const { getSharedAudioContext } = await import('@/lib/kokoro-audio-ctx');
      const ctx = getSharedAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();

      const buffer = ctx.createBuffer(1, pcm.length, SAMPLE_RATE);
      buffer.getChannelData(0).set(pcm);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = rate;
      source.connect(ctx.destination);
      source.onended = () => { setPlaying(false); sourceRef.current = null; };
      source.start();
      sourceRef.current = source;
    } catch {
      setPlaying(false);
    }
  }, [text, characterId, rate]);

  if (!enabled) return null;

  // Loading state — show download progress
  if (!modelReady) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          opacity: 0.6,
          animation: 'audioButtonPulse 1.5s ease-in-out infinite',
        }}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M11 5L6 9H2v6h4l5 4V5z" fill={color} opacity={0.5} />
        </svg>
        <span style={{ fontSize: 9, fontWeight: 800, color, letterSpacing: 0.3 }}>
          {progress > 0 ? `${progress}%` : '...'}
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handlePlay}
      aria-label="Replay audio"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 10,
        height: size + 10,
        borderRadius: size,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        opacity: playing ? 1 : 0.6,
        animation: playing ? 'audioButtonPulse 1.2s ease-in-out infinite' : undefined,
        transition: 'opacity 0.2s ease',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M11 5L6 9H2v6h4l5 4V5z" fill={color} opacity={0.9} />
        <path d="M15.54 8.46a5 5 0 010 7.07" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M18.07 5.93a9 9 0 010 12.14" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.5} />
      </svg>
    </button>
  );
}
