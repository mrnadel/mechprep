/**
 * Space Stars — animated deep-space background for space/astronomy lessons.
 *
 * Scene elements — staggered timings so each gets its own cinematic moment:
 *
 * ALWAYS-ON (ambient):
 * - 14 twinkling stars (varied sizes/colors/glow) + supernova flash on s4
 * - 2 planets (Saturn-ringed p1, small red p2) — gentle float
 * - 2 nebula glows — breathing + drift
 * - 1 aurora color wash — slow sweeping gradient
 * - 1 distant galaxy — slowly rotating elliptical glow (200s)
 * - 1 moon crescent with earthshine
 *
 * SCENE EVENTS (each gets its own moment):
 * - Shooting stars (3) — streaks + meteor shower burst (35s cycle)
 * - Comet — arcs across with trailing tail (25s cycle, 5s delay)
 * - Satellite — wobbly tumble crossing screen (47s cycle, 15s delay)
 * - Asteroid field (5 rocks) — tumbling cluster drift (160s cycle, 20s delay)
 * - Solar flare — warm glow peeking from corner with lens rays (100s cycle, 35s delay)
 * - Space dust cloud — wide foggy band drifting upward (180s cycle, 50s delay)
 * - Ring system (5 bands) — tilted rings sweeping across (140s cycle, 70s delay)
 * - Foreground planet — huge dark silhouette blocking view (120s cycle, 8s delay)
 */
export const background = {
  name: 'Space Stars',
  category: 'Space',
  theme: 'dark' as const,
  css: `
#lb-space-stars {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #05080F 0%, #0a1128 25%, #15103a 55%, #0d0b2e 75%, #05080F 100%);
  overflow: hidden;
}

/* ── Stars ── */
#lb-space-stars .lb-star {
  position: absolute;
  border-radius: 50%;
  will-change: opacity, transform;
  opacity: 0.4;
  transform: scale(0.9);
  animation: lb-twinkle 4s infinite ease-in-out;
}
#lb-space-stars .lb-s1 { animation-duration: 3.2s; animation-delay: 0s; }
#lb-space-stars .lb-s2 { animation-duration: 4.5s; animation-delay: 0.8s; }
#lb-space-stars .lb-s3 { animation-duration: 3.7s; animation-delay: 1.5s; }
#lb-space-stars .lb-s4 {
  animation: lb-twinkle 5.1s 0.3s infinite ease-in-out, lb-supernova 45s 12s infinite ease-out;
}
#lb-space-stars .lb-s5 { animation-duration: 3.9s; animation-delay: 2.2s; }
#lb-space-stars .lb-s6 { animation-duration: 4.3s; animation-delay: 1s; }
#lb-space-stars .lb-s7 { animation-duration: 3.5s; animation-delay: 1.7s; }
#lb-space-stars .lb-s8 { animation-duration: 5.5s; animation-delay: 0.5s; }
#lb-space-stars .lb-s9 { animation-duration: 4s; animation-delay: 2.6s; }
#lb-space-stars .lb-s10 { animation-duration: 3.3s; animation-delay: 1.3s; }
#lb-space-stars .lb-s11 { animation-duration: 4.8s; animation-delay: 0.1s; }
#lb-space-stars .lb-s12 { animation-duration: 3.6s; animation-delay: 1.9s; }
#lb-space-stars .lb-s13 { animation-duration: 5.3s; animation-delay: 0.7s; }
#lb-space-stars .lb-s14 { animation-duration: 4.1s; animation-delay: 2.4s; }

/* ── Planets ── */
#lb-space-stars .lb-planet {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}
#lb-space-stars .lb-p1 { animation: lb-float 14s 0s infinite ease-in-out; }
#lb-space-stars .lb-p2 { animation: lb-float 18s 4s infinite ease-in-out; }
#lb-space-stars .lb-p1::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  width: 78px; height: 14px;
  margin-left: -39px; margin-top: -7px;
  border: 1.5px solid rgba(129,140,248,0.3);
  border-radius: 50%;
  transform: rotate(-20deg);
  pointer-events: none;
}

/* ── Nebula ── */
#lb-space-stars .lb-nebula {
  position: absolute;
  border-radius: 50%;
  will-change: transform, opacity;
}
#lb-space-stars .lb-n1 { animation: lb-breathe 20s 0s infinite ease-in-out; }
#lb-space-stars .lb-n2 { animation: lb-breathe 25s 6s infinite ease-in-out; }

/* ── Aurora wash ── */
#lb-space-stars .lb-aurora {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(56,189,248,0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.04) 0%, transparent 50%);
  will-change: transform, opacity;
  animation: lb-aurora 35s 0s infinite ease-in-out;
  opacity: 0;
  mix-blend-mode: screen;
  pointer-events: none;
}

/* ── Shooting stars ── */
#lb-space-stars .lb-shoot {
  position: absolute;
  height: 2px;
  border-radius: 2px;
  will-change: transform, opacity;
  opacity: 0;
  background: linear-gradient(270deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.95) 100%);
}
#lb-space-stars .lb-shoot::after {
  content: '';
  position: absolute;
  left: -1px; top: 50%;
  width: 4px; height: 4px; margin-top: -2px;
  border-radius: 50%;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 0 6px 2px rgba(255,255,255,0.5);
}
#lb-space-stars .lb-sh1 { width: 100px; animation: lb-shoot-a 600s 0s infinite linear; }
#lb-space-stars .lb-sh2 { width: 70px; animation: lb-shoot-b 600s 0s infinite linear; }
#lb-space-stars .lb-sh3 { width: 50px; animation: lb-shoot-c 600s 0s infinite linear; }

/* ── Comet ── */
#lb-space-stars .lb-comet {
  position: absolute;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #E0E7FF;
  box-shadow: 0 0 12px 4px rgba(224,231,255,0.6), 0 0 30px 8px rgba(99,102,241,0.2);
  will-change: transform, opacity;
  opacity: 0;
  animation: lb-comet 600s 0s infinite linear;
}
#lb-space-stars .lb-comet::after {
  content: '';
  position: absolute;
  top: 50%; right: 100%;
  width: 70px; height: 2px; margin-top: -1px;
  background: linear-gradient(90deg, transparent, rgba(224,231,255,0.5));
  border-radius: 2px;
  transform: none;
}

/* ── Satellite ── */
#lb-space-stars .lb-satellite {
  position: absolute;
  width: 44px; height: 44px;
  will-change: transform, opacity;
  opacity: 0;
  animation: lb-satellite 600s 0s infinite linear;
  pointer-events: none;
  filter: brightness(0.85) drop-shadow(0 0 3px rgba(99,200,255,0.3));
}

/* ── Moon crescent ── */
#lb-space-stars .lb-moon {
  position: absolute;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    6px -2px 0 0 #D4D4D8,
    6px -2px 10px 2px rgba(212,212,216,0.2),
    -1px 1px 10px 2px rgba(99,102,241,0.06);
  will-change: opacity;
  animation: lb-moon-glow 8s 0s infinite ease-in-out;
}


/* ── Asteroid field ── */
#lb-space-stars .lb-asteroid-field {
  position: absolute;
  top: 35%; left: 0;
  width: 140px; height: 180px;
  opacity: 0;
  will-change: transform, opacity;
  animation: lb-asteroids 600s 0s infinite linear;
  pointer-events: none;
  z-index: 5;
  filter: blur(1.5px);
}
#lb-space-stars .lb-asteroid {
  position: absolute;
  background: linear-gradient(145deg, #3a3a48 0%, #22222e 40%, #111118 100%);
  box-shadow: inset -3px -2px 6px rgba(0,0,0,0.5), inset 2px 1px 4px rgba(80,80,100,0.15);
}
#lb-space-stars .lb-ast1 {
  width: 24px; height: 18px;
  border-radius: 42% 58% 48% 52% / 55% 45% 55% 45%;
  top: 15%; left: 25%;
  animation: lb-tumble-a 7s infinite linear;
}
#lb-space-stars .lb-ast2 {
  width: 14px; height: 11px;
  border-radius: 55% 45% 60% 40% / 50% 60% 40% 50%;
  top: 40%; left: 70%;
  animation: lb-tumble-b 5.5s infinite linear;
}
#lb-space-stars .lb-ast3 {
  width: 30px; height: 22px;
  border-radius: 48% 52% 42% 58% / 45% 55% 50% 50%;
  top: 58%; left: 10%;
  animation: lb-tumble-a 10s infinite linear reverse;
}
#lb-space-stars .lb-ast4 {
  width: 10px; height: 8px;
  border-radius: 50% 42% 55% 48%;
  top: 5%; left: 80%;
  animation: lb-tumble-b 4s infinite linear;
}
#lb-space-stars .lb-ast5 {
  width: 18px; height: 14px;
  border-radius: 58% 42% 50% 50% / 48% 52% 48% 52%;
  top: 78%; left: 45%;
  animation: lb-tumble-a 8.5s infinite linear;
}

/* ── Distant galaxy ── */
#lb-space-stars .lb-galaxy {
  position: absolute;
  top: 5%; right: 8%;
  width: 140px; height: 80px;
  background:
    radial-gradient(ellipse 30% 30% at 50% 50%, rgba(230,215,255,0.2) 0%, transparent 100%),
    radial-gradient(ellipse 100% 100% at 50% 50%, rgba(160,130,240,0.08) 0%, rgba(100,80,200,0.03) 40%, transparent 70%);
  will-change: transform, opacity;
  animation: lb-galaxy 200s 0s infinite ease-in-out;
  pointer-events: none;
  transform: rotate(-30deg);
}

/* ── Space dust cloud ── */
#lb-space-stars .lb-dust {
  position: absolute;
  left: -15%; width: 130%; height: 150px;
  background: linear-gradient(180deg,
    transparent 0%, rgba(90,90,130,0.03) 15%,
    rgba(70,70,110,0.07) 35%, rgba(80,80,120,0.09) 50%,
    rgba(70,70,110,0.06) 65%, rgba(90,90,130,0.03) 85%,
    transparent 100%);
  filter: blur(10px);
  opacity: 0;
  will-change: transform, opacity;
  animation: lb-dust 600s 0s infinite linear;
  pointer-events: none;
  z-index: 2;
}

/* ── Solar flare ── */
#lb-space-stars .lb-sunflare {
  position: absolute;
  bottom: -110px; left: -110px;
  width: 260px; height: 260px;
  background: radial-gradient(circle at 50% 50%,
    rgba(255,220,150,0.45) 0%, rgba(255,180,80,0.2) 15%,
    rgba(255,140,50,0.08) 30%, rgba(255,120,30,0.02) 45%,
    transparent 60%);
  opacity: 0;
  will-change: opacity;
  animation: lb-sunflare 600s 0s infinite ease-in-out;
  pointer-events: none;
  z-index: 1;
}
#lb-space-stars .lb-sunflare::after {
  content: '';
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle at 50% 50%,
    rgba(255,200,120,0.1) 0%, rgba(255,160,60,0.03) 25%, transparent 50%);
  pointer-events: none;
}

/* ── Ring system pass ── */
#lb-space-stars .lb-rings {
  position: absolute;
  top: 15%; left: 0;
  width: 450px; height: 80px;
  opacity: 0;
  will-change: transform, opacity;
  animation: lb-rings 600s 0s infinite linear;
  pointer-events: none;
  z-index: 7;
  filter: blur(1px);
}
#lb-space-stars .lb-ring-band {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
}
#lb-space-stars .lb-rb1 {
  inset: 0;
  border-width: 1.5px;
  border-color: rgba(170,175,200,0.1);
}
#lb-space-stars .lb-rb2 {
  top: 12%; bottom: 12%; left: 4%; right: 4%;
  border-width: 2px;
  border-color: rgba(180,185,215,0.18);
  box-shadow: 0 0 6px 2px rgba(180,185,215,0.05);
}
#lb-space-stars .lb-rb3 {
  top: 28%; bottom: 28%; left: 10%; right: 10%;
  border-width: 1px;
  border-color: rgba(160,165,195,0.08);
}
#lb-space-stars .lb-rb4 {
  top: 38%; bottom: 38%; left: 16%; right: 16%;
  border-width: 2.5px;
  border-color: rgba(190,195,225,0.22);
  box-shadow: 0 0 8px 2px rgba(190,195,225,0.06);
}
#lb-space-stars .lb-rb5 {
  top: 46%; bottom: 46%; left: 22%; right: 22%;
  border-width: 1px;
  border-color: rgba(170,175,205,0.12);
}

/* ── Foreground planet (parallax) ── */
#lb-space-stars .lb-fg-planet {
  position: absolute;
  top: 50%; left: 0;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #151525 0%, #0b0b18 40%, #060610 100%);
  box-shadow:
    inset 20px 12px 50px rgba(40,40,80,0.5),
    -6px -3px 40px 6px rgba(100,120,200,0.10),
    0 0 120px 50px rgba(10,10,30,0.6);
  filter: blur(3px);
  opacity: 0;
  will-change: transform, opacity;
  animation: lb-fg-planet 600s 0s infinite linear;
  pointer-events: none;
  z-index: 10;
}

/* ── Parallax depth layers (driven by --bg-step CSS variable) ── */
#lb-space-stars .lb-star,
#lb-space-stars .lb-galaxy {
  translate: 0 calc(var(--bg-step, 0) * -3px);
}
#lb-space-stars .lb-nebula,
#lb-space-stars .lb-aurora {
  translate: 0 calc(var(--bg-step, 0) * -6px);
}
#lb-space-stars .lb-planet,
#lb-space-stars .lb-moon {
  translate: 0 calc(var(--bg-step, 0) * -10px);
}
#lb-space-stars .lb-shoot,
#lb-space-stars .lb-comet,
#lb-space-stars .lb-satellite,
#lb-space-stars .lb-dust {
  translate: 0 calc(var(--bg-step, 0) * -16px);
}
#lb-space-stars .lb-asteroid-field,
#lb-space-stars .lb-rings,
#lb-space-stars .lb-sunflare {
  translate: 0 calc(var(--bg-step, 0) * -22px);
}
#lb-space-stars .lb-fg-planet {
  translate: 0 calc(var(--bg-step, 0) * -30px);
}

/* ══════════════════════════════════════════════════════════════════
   KEYFRAMES
   ─────────────────────────────────────────────────────────────────
   Ambient (own cycles — always running):
     lb-twinkle, lb-supernova, lb-float, lb-breathe, lb-aurora,
     lb-moon-glow, lb-galaxy, lb-galaxy-spin, lb-tumble-a/b,
     lb-flare-rotate

   Scene events (all share a single 600s / 10-min cycle):
     0-25s   (0%-4.2%)    Ambient only — establishing shot
     25-55s  (4.2%-9.2%)  Shooting stars (3 staggered meteors)
     70-95s  (11.7%-15.8%) Comet arc
     115-150s (19.2%-25%)  Satellite wobble crossing
     175-240s (29.2%-40%)  Asteroid field drift
     270-330s (45%-55%)    Solar flare bloom
     360-425s (60%-70.8%)  Space dust cloud rising
     455-520s (75.8%-86.7%) Ring system sweep
     545-597s (90.8%-99.5%) Foreground planet crossing
   ══════════════════════════════════════════════════════════════════ */

/* ── Ambient keyframes (own cycles) ── */
@keyframes lb-twinkle {
  0%, 100% { opacity: 0.4; transform: scale(0.9); }
  25% { opacity: 0.55; transform: scale(1.05); }
  50% { opacity: 1; transform: scale(1.2); }
  75% { opacity: 0.55; transform: scale(1.05); }
}
@keyframes lb-supernova {
  0%, 92% { box-shadow: 0 0 12px 3px rgba(255,255,255,0.5); }
  95% { box-shadow: 0 0 50px 20px rgba(255,255,255,0.95), 0 0 100px 40px rgba(99,102,241,0.4); }
  97% { box-shadow: 0 0 30px 12px rgba(255,255,255,0.6), 0 0 60px 25px rgba(99,102,241,0.2); }
  100% { box-shadow: 0 0 12px 3px rgba(255,255,255,0.5); }
}
@keyframes lb-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1.5deg); }
  75% { transform: translateY(6px) rotate(-1deg); }
}
@keyframes lb-breathe {
  0%, 100% { transform: scale(1) translate(0,0); opacity: 0.4; }
  25% { transform: scale(1.08) translate(2%,-1%); opacity: 0.65; }
  50% { transform: scale(1.02) translate(-1%,2%); opacity: 0.5; }
  75% { transform: scale(0.95) translate(1%,1%); opacity: 0.55; }
}
@keyframes lb-aurora {
  0% { transform: translate(0,0) scale(1); opacity: 0; }
  20% { transform: translate(5%,-3%) scale(1.1); opacity: 0.7; }
  40% { transform: translate(-3%,5%) scale(1.05); opacity: 0.5; }
  60% { transform: translate(8%,2%) scale(1.15); opacity: 0.8; }
  80% { transform: translate(-2%,-5%) scale(0.95); opacity: 0.4; }
  100% { transform: translate(0,0) scale(1); opacity: 0; }
}
@keyframes lb-moon-glow {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
@keyframes lb-galaxy {
  0%, 100% { opacity: 0.4; transform: rotate(-30deg) scale(1); }
  30% { opacity: 0.7; transform: rotate(-28deg) scale(1.05); }
  50% { opacity: 0.45; transform: rotate(-30deg) scale(1.02); }
  70% { opacity: 0.8; transform: rotate(-32deg) scale(1.08); }
}
@keyframes lb-galaxy-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes lb-tumble-a {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes lb-tumble-b {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
@keyframes lb-flare-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ── Scene event keyframes (all on shared 600s cycle) ── */

/* Shooting stars — 25-55s (4.2%-9.2%) — 3 staggered meteors */
@keyframes lb-shoot-a {
  0%, 4.15% { transform: translate(0,0) rotate(-28deg); opacity: 0; }
  4.2% { transform: translate(0,0) rotate(-28deg); opacity: 1; }
  5.5% { transform: translate(-380px,200px) rotate(-28deg); opacity: 1; }
  5.7% { transform: translate(-380px,200px) rotate(-28deg); opacity: 0; }
  5.8%, 100% { transform: translate(0,0) rotate(-28deg); opacity: 0; }
}
@keyframes lb-shoot-b {
  0%, 6.15% { transform: translate(0,0) rotate(-22deg); opacity: 0; }
  6.2% { transform: translate(0,0) rotate(-22deg); opacity: 0.85; }
  7.1% { transform: translate(-310px,125px) rotate(-22deg); opacity: 0.85; }
  7.3% { transform: translate(-310px,125px) rotate(-22deg); opacity: 0; }
  7.4%, 100% { transform: translate(0,0) rotate(-22deg); opacity: 0; }
}
@keyframes lb-shoot-c {
  0%, 7.75% { transform: translate(0,0) rotate(-40deg); opacity: 0; }
  7.8% { transform: translate(0,0) rotate(-40deg); opacity: 0.7; }
  8.6% { transform: translate(-250px,210px) rotate(-40deg); opacity: 0.7; }
  8.8% { transform: translate(-250px,210px) rotate(-40deg); opacity: 0; }
  8.9%, 100% { transform: translate(0,0) rotate(-40deg); opacity: 0; }
}

/* Comet — 70-95s (11.7%-15.8%) */
@keyframes lb-comet {
  0%, 11.6% { transform: translate(0,0); opacity: 0; }
  11.9% { transform: translate(10px,2px); opacity: 0.9; }
  13% { transform: translate(100px,20px); opacity: 0.9; }
  14.2% { transform: translate(250px,55px); opacity: 0.8; }
  15.2% { transform: translate(350px,70px); opacity: 0.4; }
  15.7% { transform: translate(400px,78px); opacity: 0; }
  15.8%, 100% { transform: translate(0,0); opacity: 0; }
}

/* Satellite — 115-150s (19.2%-25%) — slow wobble crossing */
@keyframes lb-satellite {
  0%, 19.1% { transform: translate(0,0) rotate(0deg); opacity: 0; }
  19.2% { transform: translate(0,0) rotate(0deg); opacity: 0; }
  19.7% { transform: translate(14px,-3px) rotate(6deg); opacity: 0.75; }
  20.2% { transform: translate(56px,2px) rotate(-8deg); opacity: 0.75; }
  20.6% { transform: translate(98px,-4px) rotate(7deg); opacity: 0.75; }
  21.1% { transform: translate(141px,1px) rotate(-7deg); opacity: 0.75; }
  21.6% { transform: translate(183px,-3px) rotate(8deg); opacity: 0.75; }
  22.1% { transform: translate(225px,2px) rotate(-6deg); opacity: 0.75; }
  22.6% { transform: translate(267px,-4px) rotate(7deg); opacity: 0.75; }
  23.0% { transform: translate(310px,1px) rotate(-8deg); opacity: 0.75; }
  23.5% { transform: translate(352px,-3px) rotate(6deg); opacity: 0.75; }
  24.0% { transform: translate(394px,2px) rotate(-7deg); opacity: 0.75; }
  24.4% { transform: translate(422px,-1px) rotate(4deg); opacity: 0.75; }
  24.9% { transform: translate(450px,0px) rotate(0deg); opacity: 0; }
  25%, 100% { transform: translate(0,0) rotate(0deg); opacity: 0; }
}

/* Asteroid field — 175-240s (29.2%-40%) */
@keyframes lb-asteroids {
  0%, 29.1% { transform: translate(480px, 20px); opacity: 0; }
  29.5% { transform: translate(420px, 15px); opacity: 0.7; }
  30% { transform: translate(380px, 10px); opacity: 0.9; }
  34.5% { transform: translate(200px, -15px); opacity: 0.9; }
  37% { transform: translate(30px, -40px); opacity: 0.9; }
  39% { transform: translate(-200px, -70px); opacity: 0.7; }
  39.5% { transform: translate(-350px, -90px); opacity: 0.4; }
  39.8% { transform: translate(-460px, -105px); opacity: 0.15; }
  40% { transform: translate(-520px, -112px); opacity: 0; }
  40.1%, 100% { transform: translate(480px, 20px); opacity: 0; }
}

/* Solar flare — 270-330s (45%-55%) — slow bloom from corner */
@keyframes lb-sunflare {
  0%, 44.9% { opacity: 0; }
  46% { opacity: 0.5; }
  48% { opacity: 0.9; }
  49.5% { opacity: 1; }
  51% { opacity: 0.85; }
  52% { opacity: 1; }
  53.5% { opacity: 0.7; }
  54.5% { opacity: 0.3; }
  55%, 100% { opacity: 0; }
}

/* Space dust — 360-425s (60%-70.8%) — wide foggy band rising */
@keyframes lb-dust {
  0%, 59.9% { transform: translateY(950px); opacity: 0; }
  60.5% { transform: translateY(850px); opacity: 0.5; }
  61% { transform: translateY(780px); opacity: 1; }
  65% { transform: translateY(400px); opacity: 1; }
  69% { transform: translateY(0px); opacity: 1; }
  70% { transform: translateY(-200px); opacity: 0.5; }
  70.5% { transform: translateY(-320px); opacity: 0.2; }
  70.8% { transform: translateY(-400px); opacity: 0; }
  71%, 100% { transform: translateY(950px); opacity: 0; }
}

/* Ring system — 455-520s (75.8%-86.7%) — tilted bands sweeping */
@keyframes lb-rings {
  0%, 75.7% { transform: translate(480px, 250px) rotate(-22deg); opacity: 0; }
  76.2% { transform: translate(400px, 210px) rotate(-22deg); opacity: 0.5; }
  76.7% { transform: translate(340px, 180px) rotate(-22deg); opacity: 1; }
  81% { transform: translate(100px, 70px) rotate(-22deg); opacity: 1; }
  84% { transform: translate(-100px, -30px) rotate(-22deg); opacity: 1; }
  86% { transform: translate(-350px, -130px) rotate(-22deg); opacity: 0.5; }
  86.5% { transform: translate(-470px, -175px) rotate(-22deg); opacity: 0.2; }
  86.7% { transform: translate(-520px, -190px) rotate(-22deg); opacity: 0; }
  86.8%, 100% { transform: translate(480px, 250px) rotate(-22deg); opacity: 0; }
}

/* Foreground planet — 545-597s (90.8%-99.5%) — the grand finale */
@keyframes lb-fg-planet {
  0%, 90.7% { transform: translate(500px, 40px); opacity: 0; }
  91% { transform: translate(450px, 35px); opacity: 0.6; }
  91.5% { transform: translate(380px, 25px); opacity: 1; }
  94% { transform: translate(200px, 0px); opacity: 1; }
  96% { transform: translate(0px, -25px); opacity: 1; }
  97.5% { transform: translate(-180px, -50px); opacity: 1; }
  98.5% { transform: translate(-400px, -80px); opacity: 0.8; }
  99% { transform: translate(-550px, -95px); opacity: 0.4; }
  99.3% { transform: translate(-620px, -105px); opacity: 0; }
  99.5%, 100% { transform: translate(500px, 40px); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  #lb-space-stars * { animation: none !important; }
  #lb-space-stars .lb-star { opacity: 0.6; transform: none; }
  #lb-space-stars .lb-shoot,
  #lb-space-stars .lb-comet,
  #lb-space-stars .lb-satellite,
  #lb-space-stars .lb-fg-planet,
  #lb-space-stars .lb-asteroid-field,
  #lb-space-stars .lb-dust,
  #lb-space-stars .lb-sunflare,
  #lb-space-stars .lb-rings { display: none; }
}
`,
  html: `<div id="lb-space-stars">
  <!-- Stars (14) — varied sizes, colors, glow intensities -->
  <div class="lb-star lb-s1" style="top:3%;left:10%;width:4px;height:4px;background:#fff;box-shadow:0 0 8px 2px rgba(255,255,255,0.6)"></div>
  <div class="lb-star lb-s2" style="top:7%;left:58%;width:3px;height:3px;background:#FDE68A;box-shadow:0 0 10px 3px rgba(253,230,138,0.5)"></div>
  <div class="lb-star lb-s3" style="top:5%;left:85%;width:2px;height:2px;background:#E0E7FF;box-shadow:0 0 6px 2px rgba(224,231,255,0.4)"></div>
  <div class="lb-star lb-s4" style="top:14%;left:32%;width:5px;height:5px;background:#fff;box-shadow:0 0 12px 3px rgba(255,255,255,0.5)"></div>
  <div class="lb-star lb-s5" style="top:20%;left:72%;width:2px;height:2px;background:#C4B5FD;box-shadow:0 0 7px 2px rgba(196,181,253,0.5)"></div>
  <div class="lb-star lb-s6" style="top:28%;left:6%;width:3px;height:3px;background:#E0E7FF;box-shadow:0 0 8px 2px rgba(224,231,255,0.4)"></div>
  <div class="lb-star lb-s7" style="top:35%;left:90%;width:3px;height:3px;background:#fff;box-shadow:0 0 7px 2px rgba(255,255,255,0.5)"></div>
  <div class="lb-star lb-s8" style="top:44%;left:45%;width:2px;height:2px;background:#FDE68A;box-shadow:0 0 6px 2px rgba(253,230,138,0.4)"></div>
  <div class="lb-star lb-s9" style="top:52%;left:15%;width:4px;height:4px;background:#C4B5FD;box-shadow:0 0 10px 3px rgba(196,181,253,0.4)"></div>
  <div class="lb-star lb-s10" style="top:60%;left:78%;width:2px;height:2px;background:#fff;box-shadow:0 0 5px 1px rgba(255,255,255,0.4)"></div>
  <div class="lb-star lb-s11" style="top:70%;left:40%;width:3px;height:3px;background:#E0E7FF;box-shadow:0 0 8px 2px rgba(224,231,255,0.5)"></div>
  <div class="lb-star lb-s12" style="top:78%;left:62%;width:2px;height:2px;background:#FDE68A;box-shadow:0 0 6px 2px rgba(253,230,138,0.3)"></div>
  <div class="lb-star lb-s13" style="top:86%;left:22%;width:3px;height:3px;background:#fff;box-shadow:0 0 9px 3px rgba(255,255,255,0.5)"></div>
  <div class="lb-star lb-s14" style="top:93%;left:50%;width:2px;height:2px;background:#C4B5FD;box-shadow:0 0 6px 2px rgba(196,181,253,0.4)"></div>

  <!-- Planets (2) — p1 has Saturn ring via ::before -->
  <div class="lb-planet lb-p1" style="bottom:10%;right:8%;width:50px;height:50px;background:linear-gradient(135deg,#818CF8 0%,#4338CA 60%,#312E81 100%);box-shadow:0 0 25px 5px rgba(99,102,241,0.25),inset -8px -4px 12px rgba(0,0,0,0.4)"></div>
  <div class="lb-planet lb-p2" style="top:18%;left:4%;width:30px;height:30px;background:linear-gradient(135deg,#FB7185 0%,#9D174D 60%,#4C0519 100%);box-shadow:0 0 18px 4px rgba(251,113,133,0.15),inset -5px -3px 8px rgba(0,0,0,0.4)"></div>

  <!-- Nebula glows (2) — large ambient color washes -->
  <div class="lb-nebula lb-n1" style="top:10%;right:-15%;width:280px;height:280px;background:radial-gradient(circle,rgba(99,102,241,0.12) 0%,rgba(99,102,241,0.04) 40%,transparent 70%)"></div>
  <div class="lb-nebula lb-n2" style="bottom:15%;left:-12%;width:240px;height:240px;background:radial-gradient(circle,rgba(168,85,247,0.08) 0%,rgba(139,92,246,0.03) 45%,transparent 70%)"></div>

  <!-- Aurora wash (1) — slow sweeping gradient drift -->
  <div class="lb-aurora"></div>

  <!-- Shooting stars (3) — solo streaks + meteor shower cluster at ~70% -->
  <div class="lb-shoot lb-sh1" style="top:8%;right:5%"></div>
  <div class="lb-shoot lb-sh2" style="top:12%;right:10%"></div>
  <div class="lb-shoot lb-sh3" style="top:6%;right:15%"></div>

  <!-- Satellite (1) — image with wobbly tumble crossing the screen -->
  <img class="lb-satellite" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAArBAMAAAA6dJN0AAAAMFBMVEVMaXEGu/0Gm/caXa0JHXkuRb2OnO5bcuESpt2+zPkTOJHt8/9CvvwVgsB12P4O2v+d2eTvAAAAD3RSTlMA/v6eKvz5/Pf+Xf7+zP62Dw5hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABwUlEQVR42tWUvUsDQRDFF6IoAYvZRpHIMVsEBEHFgJaBgEjAziViJWjuiHbCJV6hEMlfoBKISaGchRZpA8dJIJ3hwA+0sJM0IihCTCOinps299XYuO3+eDP75u0Q8gen7zgACI0FEEPwEfMHaAAxyMCfWJCASn7EGdoUYMSbOGFoA6C3xjRStN+xfBnzMGUaQWhY5sTHPSEDNSfwyEBo/NQRvgmZN5wSi3sModLtQwAhJU6S8R6iusesixba7Y4Alkhy86BXo5qP7oPoVAD9U/OyYTrKJPIM2ojfp+R8LZM1tFXiRgAMb9+VayXZ4OvEjUAY3n3K1oycmT50sSvRYJPNnFwqZpRy6cgtNso1a2aLRVlTNfM55gbI11pO4Vpa3np1G11IUVPZNOeZ7R2gdNJJhMWlovIVXV8GMTpnQPpyKa6m+JKwTVgGL5ajj1nOuarddEMMaJtXjhiGVM71snBgEIA2fgAivRr6zHFY2xAZZZGKgfbXW73jfKw+JUrko5WKqPLW6nhksNodzHhLan96pVQMJmLVmeQJdAmrATDq/VcStwzRDyDhB4pSgQQQBf+9MkcLAZtn7iZoN8XJPzm/0tedu3NcY7oAAAAASUVORK5CYII=" style="top:55%;left:-8%" alt="" width="44" height="44" />

  <!-- Moon crescent (1) — with earthshine glow -->
  <div class="lb-moon" style="bottom:28%;right:18%"></div>

  <!-- Distant galaxy (1) — slowly rotating elliptical glow -->
  <div class="lb-galaxy"></div>

  <!-- Asteroid field (5) — tumbling rocks drifting as a cluster -->
  <div class="lb-asteroid-field">
    <div class="lb-asteroid lb-ast1"></div>
    <div class="lb-asteroid lb-ast2"></div>
    <div class="lb-asteroid lb-ast3"></div>
    <div class="lb-asteroid lb-ast4"></div>
    <div class="lb-asteroid lb-ast5"></div>
  </div>

  <!-- Solar flare (1) — warm glow peeking from bottom-left corner -->
  <div class="lb-sunflare"></div>

  <!-- Space dust cloud (1) — wide foggy band drifting upward -->
  <div class="lb-dust"></div>

  <!-- Ring system (5 bands) — tilted rings sweeping across -->
  <div class="lb-rings">
    <div class="lb-ring-band lb-rb1"></div>
    <div class="lb-ring-band lb-rb2"></div>
    <div class="lb-ring-band lb-rb3"></div>
    <div class="lb-ring-band lb-rb4"></div>
    <div class="lb-ring-band lb-rb5"></div>
  </div>

  <!-- Foreground planet (1) — huge blurred dark body drifting across, parallax depth -->
  <div class="lb-fg-planet"></div>
</div>
`,
};
