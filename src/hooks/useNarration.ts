'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useNarrationStore } from '@/store/useNarrationStore';

const TTS_BASE_URL = process.env.NEXT_PUBLIC_TTS_BLOB_URL || '';

/** Pick the best available English voice for browser TTS fallback. */
function pickBestVoice(preferredName: string | null): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  if (voices.length === 0) return null;
  if (preferredName) {
    const match = voices.find((v) => v.name === preferredName);
    if (match) return match;
  }
  const english = voices.filter((v) => v.lang.startsWith('en'));
  if (english.length === 0) return voices[0];
  const score = (v: SpeechSynthesisVoice) => {
    let s = 0;
    const n = v.name.toLowerCase();
    if (n.includes('natural')) s += 10;
    if (n.includes('google')) s += 8;
    if (n.includes('samantha')) s += 7;
    if (n.includes('neural')) s += 6;
    if (n.includes('online')) s += 4;
    if (!v.localService) s += 2;
    if (v.lang === 'en-US') s += 1;
    return s;
  };
  return english.sort((a, b) => score(b) - score(a))[0];
}

function cleanTextForSpeech(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^[#>]+\s*/gm, '')
    .replace(/^-\s+/gm, '')
    .trim();
}

/**
 * Narration hook that plays pre-generated Kokoro TTS from Vercel Blob,
 * falling back to browser speechSynthesis when files aren't available.
 */
export function useNarration() {
  const enabled = useNarrationStore((s) => s.enabled);
  const voiceName = useNarrationStore((s) => s.voiceName);
  const rate = useNarrationStore((s) => s.rate);
  const resolvedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Resolve browser TTS voice
  useEffect(() => {
    const resolve = () => {
      const voice = pickBestVoice(voiceName);
      if (voice) resolvedVoiceRef.current = voice;
    };
    resolve();
    if (!resolvedVoiceRef.current) {
      speechSynthesis.addEventListener('voiceschanged', resolve, { once: true });
      return () => speechSynthesis.removeEventListener('voiceschanged', resolve);
    }
  }, [voiceName]);

  // Cleanup on unmount or disable
  useEffect(() => {
    if (!enabled) {
      speechSynthesis.cancel();
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    }
    return () => {
      speechSynthesis.cancel();
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, [enabled]);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
  }, []);

  /** Speak using browser TTS (fallback). */
  const speak = useCallback(
    (text: string) => {
      if (!enabled || !text) return;
      stop();
      const cleaned = cleanTextForSpeech(text);
      if (!cleaned) return;
      const utterance = new SpeechSynthesisUtterance(cleaned);
      if (resolvedVoiceRef.current) utterance.voice = resolvedVoiceRef.current;
      utterance.rate = rate;
      speechSynthesis.speak(utterance);
    },
    [enabled, rate, stop],
  );

  /**
   * Play pre-generated TTS from Vercel Blob.
   * Falls back to browser TTS if Blob URL isn't configured or file 404s.
   */
  const speakFromFile = useCallback(
    (lessonId: string, cardId: string, suffix?: 'q' | 'exp', fallbackText?: string) => {
      if (!enabled) return;
      stop();

      if (!TTS_BASE_URL) {
        // No Blob configured — use browser TTS
        if (fallbackText) speak(fallbackText);
        return;
      }

      const filename = suffix ? `${cardId}-${suffix}` : cardId;
      const url = `${TTS_BASE_URL}/tts/${lessonId}/${filename}.ogg`;
      const audio = new Audio(url);
      audio.playbackRate = rate;
      audioRef.current = audio;

      audio.onplay = () => {};
      audio.onended = () => { audioRef.current = null; };
      audio.onerror = () => {
        // File doesn't exist — fall back to browser TTS
        audioRef.current = null;
        if (fallbackText) speak(fallbackText);
      };

      audio.play().catch(() => {
        audioRef.current = null;
        if (fallbackText) speak(fallbackText);
      });
    },
    [enabled, rate, stop, speak],
  );

  return { speak, speakFromFile, stop, enabled };
}
