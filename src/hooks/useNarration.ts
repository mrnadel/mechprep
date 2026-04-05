'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useNarrationStore } from '@/store/useNarrationStore';

/** Pick the best available English voice (prefer Google/Natural/Samantha over defaults). */
function pickBestVoice(preferredName: string | null): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // If user picked a specific voice, try to use it
  if (preferredName) {
    const match = voices.find((v) => v.name === preferredName);
    if (match) return match;
  }

  // Auto-pick: score English voices by quality heuristics
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
    if (!v.localService) s += 2; // remote voices are often higher quality
    if (v.lang === 'en-US') s += 1;
    return s;
  };

  return english.sort((a, b) => score(b) - score(a))[0];
}

/**
 * Strip markdown-like formatting and clean text for TTS.
 * Removes **bold**, *italic*, and other markers that would sound odd.
 */
function cleanTextForSpeech(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // **bold**
    .replace(/\*(.*?)\*/g, '$1')       // *italic*
    .replace(/`(.*?)`/g, '$1')         // `code`
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // [link](url)
    .replace(/[#>-]/g, '')             // markdown headers, blockquotes, list markers
    .trim();
}

/** Hook that speaks text aloud when narration is enabled. */
export function useNarration() {
  const enabled = useNarrationStore((s) => s.enabled);
  const voiceName = useNarrationStore((s) => s.voiceName);
  const rate = useNarrationStore((s) => s.rate);
  const resolvedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const voiceKeyRef = useRef<string | null>(null);

  // Resolve voice once and cache it. Re-resolve only if voiceName preference changes.
  useEffect(() => {
    const resolve = () => {
      const voice = pickBestVoice(voiceName);
      if (voice) {
        resolvedVoiceRef.current = voice;
        voiceKeyRef.current = voiceName;
      }
    };

    resolve();
    // Voices may load asynchronously — listen for them once
    if (!resolvedVoiceRef.current) {
      speechSynthesis.addEventListener('voiceschanged', resolve, { once: true });
      return () => speechSynthesis.removeEventListener('voiceschanged', resolve);
    }
  }, [voiceName]);

  // Cancel on unmount or when disabled
  useEffect(() => {
    if (!enabled) {
      speechSynthesis.cancel();
    }
    return () => speechSynthesis.cancel();
  }, [enabled]);

  const speak = useCallback(
    (text: string) => {
      if (!enabled || !text) return;
      speechSynthesis.cancel();

      const cleaned = cleanTextForSpeech(text);
      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      if (resolvedVoiceRef.current) utterance.voice = resolvedVoiceRef.current;
      utterance.rate = rate;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    },
    [enabled, rate],
  );

  const stop = useCallback(() => {
    speechSynthesis.cancel();
  }, []);

  return { speak, stop, enabled };
}
