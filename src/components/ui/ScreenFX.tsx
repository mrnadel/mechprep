'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

export type FXType = 'hearts' | 'confetti' | 'stars' | 'sparkles' | 'fireworks' | 'snow' | 'bokeh' | 'bubbles';

export interface ScreenFXProps {
  type: FXType;
}

function seeded(i: number, offset: number) {
  return ((i * 37 + offset * 13 + 7) % 100) / 100;
}

function Hearts() {
  const colors = ['#FF4B4B', '#FF7878', '#FFAADE'];
  const items = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i, x: seeded(i, 0) * 95, dx: (seeded(i, 1) - 0.5) * 60, dur: 3 + seeded(i, 2) * 4,
    delay: seeded(i, 3) * 8, size: 14 + seeded(i, 4) * 10, color: colors[i % 3],
  })), []);
  return <>{items.map(p => (
    <motion.div key={p.id} className="absolute text-center" style={{ left: `${p.x}%`, bottom: '-5%', fontSize: p.size, color: p.color }}
      animate={{ y: [0, -150, -300], x: [0, p.dx, p.dx * 2], opacity: [0, 0.8, 0], scale: [0.3, 1, 0.5] }}
      transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
    >{'\u2665'}</motion.div>
  ))}</>;
}

function Confetti() {
  const colors = ['#FF4B4B', '#FFC800', '#58CC02', '#1CB0F6', '#CE82FF', '#FF9600'];
  const items = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: i, x: (i / 25) * 110 - 5, w: 4 + seeded(i, 0) * 5, h: 3 + seeded(i, 1) * 4,
    dur: 2 + seeded(i, 2) * 3, delay: seeded(i, 3) * 5, spin: 360 + seeded(i, 4) * 720,
    color: colors[i % 6], round: i % 2 === 0,
  })), []);
  return <>{items.map(p => (
    <motion.div key={p.id} className="absolute" style={{ left: `${p.x}%`, top: '-3%', width: p.w, height: p.h, background: p.color, borderRadius: p.round ? '50%' : 2 }}
      animate={{ y: ['-20px', '500px'], rotate: [0, p.spin], opacity: [1, 0.2] }}
      transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
    />
  ))}</>;
}

function Stars() {
  const colors = ['#FFC800', '#FFB100', '#FBE56D', '#FF9600'];
  const items = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i, x: 5 + seeded(i, 0) * 85, y: 5 + seeded(i, 1) * 80, size: 12 + seeded(i, 2) * 12,
    dur: 1.5 + seeded(i, 3) * 2.5, delay: seeded(i, 4) * 6, color: colors[i % 4],
  })), []);
  return <>{items.map(p => (
    <motion.div key={p.id} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, color: p.color }}
      animate={{ opacity: [0, 1, 0.7, 0], scale: [0, 1.2, 0.9, 0.4], rotate: [0, 30, 60, 90], y: [0, 0, 0, -40] }}
      transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
    >{'\u2605'}</motion.div>
  ))}</>;
}

function Sparkles() {
  const colors = ['#FFFFFF', '#FFC800', '#84D8FF', '#FFAADE'];
  const items = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i, x: seeded(i, 0) * 100, y: seeded(i, 1) * 100, size: 2 + seeded(i, 2) * 4,
    dur: 1 + seeded(i, 3) * 2, delay: seeded(i, 4) * 5,
    dx: (seeded(i, 5) - 0.5) * 40, dy: (seeded(i, 6) - 0.5) * 40, color: colors[i % 4],
  })), []);
  return <>{items.map(p => (
    <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: [0, p.dx], y: [0, p.dy] }}
      transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
    />
  ))}</>;
}

function Fireworks() {
  const colors = ['#FF4B4B', '#FFC800', '#58CC02', '#1CB0F6', '#CE82FF'];
  const bursts = useMemo(() => {
    const result: { id: number; cx: number; cy: number; fx: number; fy: number; dur: number; delay: number; size: number; color: string }[] = [];
    let id = 0;
    for (let b = 0; b < 3; b++) {
      const cx = 20 + seeded(b, 10) * 60;
      const cy = 15 + seeded(b, 11) * 45;
      const bdl = b * (1.5 + seeded(b, 12));
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const dist = 30 + seeded(i, b) * 40;
        result.push({ id: id++, cx, cy, fx: Math.cos(angle) * dist, fy: Math.sin(angle) * dist,
          dur: 1.5 + seeded(i, 20) * 1.5, delay: bdl + seeded(i, 21) * 0.3, size: 3 + seeded(i, 22) * 2, color: colors[i % 5] });
      }
    }
    return result;
  }, []);
  return <>{bursts.map(p => (
    <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.cx}%`, top: `${p.cy}%`, width: p.size, height: p.size, background: p.color }}
      animate={{ x: [0, p.fx], y: [0, p.fy], opacity: [0, 1, 0], scale: [0, 1, 0.2] }}
      transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
    />
  ))}</>;
}

function Snow() {
  const items = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i, x: (i / 20) * 110 - 5, size: 2 + seeded(i, 0) * 2, dur: 4 + seeded(i, 1) * 5,
    delay: seeded(i, 2) * 8, dx: (seeded(i, 3) - 0.5) * 60,
  })), []);
  return <>{items.map(p => (
    <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, top: '-3%', width: p.size, height: p.size, background: 'rgba(255,255,255,0.6)' }}
      animate={{ y: ['-10px', '110%'], x: [0, p.dx, 0], opacity: [0.7, 0.5, 0] }}
      transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
    />
  ))}</>;
}

function Bokeh() {
  const colors = ['rgba(168,85,247,0.15)', 'rgba(99,102,241,0.12)', 'rgba(236,72,153,0.1)'];
  const items = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i, x: 5 + seeded(i, 0) * 80, y: 5 + seeded(i, 1) * 80, size: 20 + seeded(i, 2) * 30,
    dur: 6 + seeded(i, 3) * 6, delay: seeded(i, 4) * 8,
    dx: (seeded(i, 5) - 0.5) * 60, dy: (seeded(i, 6) - 0.5) * 60, color: colors[i % 3],
  })), []);
  return <>{items.map(p => (
    <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color }}
      animate={{ x: [0, p.dx, -p.dx * 0.5, 0], y: [0, p.dy, -p.dy * 0.5, 0], opacity: [0.1, 0.25, 0.12, 0.1] }}
      transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  ))}</>;
}

function Bubbles() {
  const items = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i, x: seeded(i, 0) * 100, size: 4 + seeded(i, 1) * 10, dur: 5 + seeded(i, 2) * 5,
    delay: seeded(i, 3) * 8,
  })), []);
  return <>{items.map(p => (
    <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, bottom: `${seeded(p.id, 4) * 15 - 5}%`, width: p.size, height: p.size, background: 'rgba(255,255,255,0.12)' }}
      animate={{ y: [0, '-120%'], opacity: [0, 0.5, 0.2, 0], scale: [0.5, 1.1] }}
      transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  ))}</>;
}

const fxMap: Record<FXType, React.FC> = { hearts: Hearts, confetti: Confetti, stars: Stars, sparkles: Sparkles, fireworks: Fireworks, snow: Snow, bokeh: Bokeh, bubbles: Bubbles };

export function ScreenFX({ type }: ScreenFXProps) {
  const FX = fxMap[type];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <FX />
    </div>
  );
}
