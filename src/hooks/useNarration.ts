'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useNarrationStore } from '@/store/useNarrationStore';
import { getKokoroClient } from '@/lib/kokoro-client';
import { getVoiceForCharacter } from '@/data/voice-config';
import { getSharedAudioContext } from '@/lib/kokoro-audio-ctx';

const SAMPLE_RATE = 24000;

function cleanTextForSpeech(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[#>-]/g, '')
    .trim();
}

function playPCM(
  ctx: AudioContext,
  pcm: Float32Array,
  playbackRate: number,
): AudioBufferSourceNode {
  const buffer = ctx.createBuffer(1, pcm.length, SAMPLE_RATE);
  buffer.getChannelData(0).set(pcm);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = playbackRate;
  source.connect(ctx.destination);
  source.start();
  return source;
}

export function useNarration() {
  const enabled = useNarrationStore((s) => s.enabled);
  const rate = useNarrationStore((s) => s.rate);
  const [modelReady, setModelReady] = useState(false);
  const [modelProgress, setModelProgress] = useState(0);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const abortRef = useRef(0);

  // Lazy-init the Kokoro model when narration is first enabled
  useEffect(() => {
    if (!enabled) return;
    const client = getKokoroClient();
    if (client.isReady) {
      setModelReady(true);
      return;
    }
    console.log('[narration] Initializing Kokoro TTS...');
    client.init(
      (progress) => {
        setModelProgress(progress);
        if (progress % 20 === 0) console.log(`[narration] Loading model: ${progress}%`);
      },
      () => {
        console.log('[narration] Model ready!');
        setModelReady(true);
      },
    ).catch((err) => {
      console.error('[narration] Model failed to load:', err);
    });
  }, [enabled]);

  useEffect(() => {
    return () => {
      try { sourceRef.current?.stop(); } catch { /* */ }
      sourceRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    abortRef.current++;
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch { /* */ }
      sourceRef.current = null;
    }
  }, []);

  const speakWithCharacter = useCallback(
    async (text: string, characterId?: string | null) => {
      if (!enabled || !text) return;
      stop();

      const client = getKokoroClient();
      if (!client.isReady) {
        console.log('[narration] Model not ready, skipping');
        return;
      }

      const cleaned = cleanTextForSpeech(text);
      if (!cleaned) return;

      const { voice } = getVoiceForCharacter(characterId ?? null);
      const token = ++abortRef.current;

      console.log(`[narration] Speaking: voice=${voice}, text="${cleaned.slice(0, 50)}..."`);

      try {
        const pcm = await client.generate(cleaned, voice, 0.95);
        if (abortRef.current !== token) return;

        console.log(`[narration] Got audio: ${pcm.length} samples (${(pcm.length / SAMPLE_RATE).toFixed(1)}s)`);

        const ctx = getSharedAudioContext();
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        sourceRef.current = playPCM(ctx, pcm, rate);
        console.log('[narration] Playing audio');
      } catch (err) {
        console.error('[narration] Generate/play error:', err);
      }
    },
    [enabled, rate, stop],
  );

  const prefetch = useCallback(
    (texts: { text: string; characterId?: string | null }[]) => {
      if (!enabled) return;
      const client = getKokoroClient();
      if (!client.isReady) return;

      for (const { text, characterId } of texts) {
        const cleaned = cleanTextForSpeech(text);
        if (!cleaned) continue;
        const { voice } = getVoiceForCharacter(characterId ?? null);
        client.prefetch(cleaned, voice, 0.95);
      }
    },
    [enabled],
  );

  return { speakWithCharacter, prefetch, stop, enabled, modelReady, modelProgress };
}
