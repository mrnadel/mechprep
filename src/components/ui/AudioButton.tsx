'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useNarrationStore } from '@/store/useNarrationStore';

const TTS_BASE_URL = process.env.NEXT_PUBLIC_TTS_BLOB_URL || '';

interface AudioButtonProps {
  /** Lesson ID for constructing the Blob URL */
  lessonId?: string;
  /** Card/question ID */
  cardId?: string;
  /** Audio file suffix: undefined for teaching, 'q' for question, 'exp' for explanation */
  suffix?: 'q' | 'exp';
  /** Fallback text for browser TTS if file doesn't exist */
  text?: string;
  color?: string;
  size?: number;
}

/**
 * Speaker icon button that plays pre-generated TTS from Blob CDN.
 * Only renders when narration is enabled.
 */
export function AudioButton({ lessonId, cardId, suffix, text, color = '#8B5CF6', size = 18 }: AudioButtonProps) {
  const enabled = useNarrationStore((s) => s.enabled);
  const rate = useNarrationStore((s) => s.rate);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  const handlePlay = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }

    if (TTS_BASE_URL && lessonId && cardId) {
      const filename = suffix ? `${cardId}-${suffix}` : cardId;
      const url = `${TTS_BASE_URL}/tts/${lessonId}/${filename}.ogg`;
      const audio = new Audio(url);
      audio.playbackRate = rate;
      audioRef.current = audio;
      audio.onplay = () => setPlaying(true);
      audio.onended = () => { setPlaying(false); audioRef.current = null; };
      audio.onpause = () => setPlaying(false);
      audio.onerror = () => { setPlaying(false); audioRef.current = null; };
      audio.play().catch(() => { setPlaying(false); audioRef.current = null; });
    } else if (text) {
      // Browser TTS fallback
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      speechSynthesis.speak(utterance);
    }
  }, [lessonId, cardId, suffix, text, rate]);

  if (!enabled) return null;

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
