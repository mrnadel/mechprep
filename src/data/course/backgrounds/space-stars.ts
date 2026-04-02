/**
 * Space Stars — animated deep-space background for space/astronomy lessons.
 *
 * Authoring rules:
 * - Max 30 animated elements (GPU budget)
 * - CSS animations use transform/opacity only
 * - All selectors scoped under #lb-space-stars
 * - All @keyframes prefixed lb-space-stars-
 * - Must include prefers-reduced-motion media query
 *
 * Element count: 18 stars + 2 planets + 2 nebula + 3 shooting stars + 2 rings = 27/30
 */
export const background = {
  name: 'Space Stars',
  category: 'Space',
  css: `
#lb-space-stars {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #0B0E1A 0%, #0f1535 30%, #1a1050 60%, #0B0E1A 100%);
  overflow: hidden;
}

/* ─── Stars ─── */
#lb-space-stars .lb-star {
  position: absolute;
  border-radius: 50%;
  will-change: opacity, transform;
  animation: lb-space-stars-twinkle 4s infinite ease-in-out;
}
#lb-space-stars .lb-s1 { animation-duration: 3.5s; animation-delay: 0s; }
#lb-space-stars .lb-s2 { animation-duration: 4.2s; animation-delay: 1.2s; }
#lb-space-stars .lb-s3 { animation-duration: 3.8s; animation-delay: 0.6s; }
#lb-space-stars .lb-s4 { animation-duration: 5s; animation-delay: 2.1s; }
#lb-space-stars .lb-s5 { animation-duration: 4.5s; animation-delay: 0.3s; }
#lb-space-stars .lb-s6 { animation-duration: 3.2s; animation-delay: 1.8s; }
#lb-space-stars .lb-s7 { animation-duration: 4.8s; animation-delay: 0.9s; }
#lb-space-stars .lb-s8 { animation-duration: 5.5s; animation-delay: 2.5s; }
#lb-space-stars .lb-s9 { animation-duration: 3.6s; animation-delay: 1.4s; }
#lb-space-stars .lb-s10 { animation-duration: 4.1s; animation-delay: 0.7s; }
#lb-space-stars .lb-s11 { animation-duration: 4.7s; animation-delay: 2s; }
#lb-space-stars .lb-s12 { animation-duration: 3.4s; animation-delay: 1.1s; }
#lb-space-stars .lb-s13 { animation-duration: 5.2s; animation-delay: 0.4s; }
#lb-space-stars .lb-s14 { animation-duration: 3.9s; animation-delay: 1.6s; }
#lb-space-stars .lb-s15 { animation-duration: 4.3s; animation-delay: 2.3s; }
#lb-space-stars .lb-s16 { animation-duration: 5.1s; animation-delay: 0.8s; }
#lb-space-stars .lb-s17 { animation-duration: 3.7s; animation-delay: 1.9s; }
#lb-space-stars .lb-s18 { animation-duration: 4.6s; animation-delay: 0.2s; }

/* ─── Planets ─── */
#lb-space-stars .lb-planet {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
  animation: lb-space-stars-float 10s infinite ease-in-out;
}
#lb-space-stars .lb-p1 { animation-duration: 10s; animation-delay: 0s; }
#lb-space-stars .lb-p2 { animation-duration: 12s; animation-delay: 3s; }

/* ─── Nebula glows ─── */
#lb-space-stars .lb-nebula {
  position: absolute;
  border-radius: 50%;
  will-change: transform, opacity;
  animation: lb-space-stars-drift 18s infinite ease-in-out;
}
#lb-space-stars .lb-n1 { animation-duration: 18s; animation-delay: 0s; }
#lb-space-stars .lb-n2 { animation-duration: 20s; animation-delay: 5s; }

/* ─── Shooting stars ─── */
#lb-space-stars .lb-shoot {
  position: absolute;
  width: 80px;
  height: 2px;
  border-radius: 2px;
  will-change: transform, opacity;
  background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
}
#lb-space-stars .lb-sh1 { animation: lb-space-stars-shoot1 8s 2s infinite ease-in; }
#lb-space-stars .lb-sh2 { animation: lb-space-stars-shoot2 12s 6s infinite ease-in; }
#lb-space-stars .lb-sh3 { animation: lb-space-stars-shoot3 10s 0s infinite ease-in; }

/* ─── Orbital rings ─── */
#lb-space-stars .lb-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(99,102,241,0.15);
  will-change: transform, opacity;
}
#lb-space-stars .lb-r1 { animation: lb-space-stars-ring 25s 0s infinite ease-in-out; }
#lb-space-stars .lb-r2 { animation: lb-space-stars-ring 30s 8s infinite ease-in-out; }

/* ─── Keyframes ─── */
@keyframes lb-space-stars-twinkle {
  0%, 100% { opacity: 0.1; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.4); }
}
@keyframes lb-space-stars-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-16px) rotate(3deg); }
}
@keyframes lb-space-stars-drift {
  0% { transform: translate(0, 0); opacity: 0.5; }
  50% { transform: translate(10px, -12px); opacity: 1; }
  100% { transform: translate(0, 0); opacity: 0.5; }
}
@keyframes lb-space-stars-shoot1 {
  0% { transform: translate(0, 0) rotate(-35deg); opacity: 0; }
  2% { opacity: 1; }
  8% { transform: translate(300px, 200px) rotate(-35deg); opacity: 0; }
  100% { opacity: 0; }
}
@keyframes lb-space-stars-shoot2 {
  0% { transform: translate(0, 0) rotate(-25deg); opacity: 0; }
  1.5% { opacity: 0.8; }
  6% { transform: translate(250px, 120px) rotate(-25deg); opacity: 0; }
  100% { opacity: 0; }
}
@keyframes lb-space-stars-shoot3 {
  0% { transform: translate(0, 0) rotate(-40deg); opacity: 0; }
  2% { opacity: 0.6; }
  7% { transform: translate(200px, 170px) rotate(-40deg); opacity: 0; }
  100% { opacity: 0; }
}
@keyframes lb-space-stars-ring {
  0% { transform: rotate(0deg) scale(1); opacity: 0.15; }
  25% { opacity: 0.3; }
  50% { transform: rotate(180deg) scale(1.1); opacity: 0.15; }
  75% { opacity: 0.25; }
  100% { transform: rotate(360deg) scale(1); opacity: 0.15; }
}
@media (prefers-reduced-motion: reduce) {
  #lb-space-stars * { animation: none !important; }
}
`,
  html: `<div id="lb-space-stars">
  <!-- Stars (18) -->
  <div class="lb-star lb-s1" style="top:4%;left:12%;width:3px;height:3px;background:#fff;box-shadow:0 0 6px 1px rgba(255,255,255,0.5)"></div>
  <div class="lb-star lb-s2" style="top:8%;left:55%;width:4px;height:4px;background:#FDE68A;box-shadow:0 0 10px 2px rgba(253,230,138,0.4)"></div>
  <div class="lb-star lb-s3" style="top:6%;left:82%;width:2px;height:2px;background:#E0E7FF;box-shadow:0 0 5px 1px rgba(224,231,255,0.4)"></div>
  <div class="lb-star lb-s4" style="top:15%;left:28%;width:2px;height:2px;background:#fff;box-shadow:0 0 4px rgba(255,255,255,0.4)"></div>
  <div class="lb-star lb-s5" style="top:18%;left:68%;width:3px;height:3px;background:#C4B5FD;box-shadow:0 0 7px 1px rgba(196,181,253,0.4)"></div>
  <div class="lb-star lb-s6" style="top:25%;left:8%;width:2px;height:2px;background:#E0E7FF;box-shadow:0 0 5px rgba(224,231,255,0.3)"></div>
  <div class="lb-star lb-s7" style="top:30%;left:92%;width:3px;height:3px;background:#fff;box-shadow:0 0 6px rgba(255,255,255,0.5)"></div>
  <div class="lb-star lb-s8" style="top:38%;left:42%;width:2px;height:2px;background:#FDE68A;box-shadow:0 0 5px rgba(253,230,138,0.3)"></div>
  <div class="lb-star lb-s9" style="top:42%;left:5%;width:3px;height:3px;background:#C4B5FD;box-shadow:0 0 7px rgba(196,181,253,0.4)"></div>
  <div class="lb-star lb-s10" style="top:48%;left:75%;width:2px;height:2px;background:#fff;box-shadow:0 0 4px rgba(255,255,255,0.3)"></div>
  <div class="lb-star lb-s11" style="top:55%;left:18%;width:3px;height:3px;background:#E0E7FF;box-shadow:0 0 6px rgba(224,231,255,0.4)"></div>
  <div class="lb-star lb-s12" style="top:60%;left:88%;width:2px;height:2px;background:#FDE68A;box-shadow:0 0 5px rgba(253,230,138,0.3)"></div>
  <div class="lb-star lb-s13" style="top:68%;left:35%;width:3px;height:3px;background:#fff;box-shadow:0 0 7px rgba(255,255,255,0.5)"></div>
  <div class="lb-star lb-s14" style="top:72%;left:62%;width:2px;height:2px;background:#C4B5FD;box-shadow:0 0 5px rgba(196,181,253,0.3)"></div>
  <div class="lb-star lb-s15" style="top:80%;left:48%;width:3px;height:3px;background:#E0E7FF;box-shadow:0 0 6px rgba(224,231,255,0.4)"></div>
  <div class="lb-star lb-s16" style="top:85%;left:15%;width:2px;height:2px;background:#fff;box-shadow:0 0 4px rgba(255,255,255,0.3)"></div>
  <div class="lb-star lb-s17" style="top:90%;left:78%;width:3px;height:3px;background:#FDE68A;box-shadow:0 0 7px rgba(253,230,138,0.4)"></div>
  <div class="lb-star lb-s18" style="top:95%;left:30%;width:2px;height:2px;background:#C4B5FD;box-shadow:0 0 5px rgba(196,181,253,0.3)"></div>

  <!-- Planets (2) -->
  <div class="lb-planet lb-p1" style="bottom:12%;right:8%;width:45px;height:45px;background:linear-gradient(135deg,#818CF8,#4338CA);box-shadow:0 0 20px rgba(99,102,241,0.3),inset -6px -3px 10px rgba(0,0,0,0.3)"></div>
  <div class="lb-planet lb-p2" style="top:20%;left:6%;width:28px;height:28px;background:linear-gradient(135deg,#F472B6,#9D174D);box-shadow:0 0 14px rgba(244,114,182,0.2),inset -4px -2px 6px rgba(0,0,0,0.3)"></div>

  <!-- Nebula glows (2) -->
  <div class="lb-nebula lb-n1" style="top:15%;right:-8%;width:200px;height:200px;background:radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)"></div>
  <div class="lb-nebula lb-n2" style="bottom:25%;left:-8%;width:180px;height:180px;background:radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%)"></div>

  <!-- Shooting stars (3) — streak across at different intervals -->
  <div class="lb-shoot lb-sh1" style="top:10%;left:5%"></div>
  <div class="lb-shoot lb-sh2" style="top:35%;left:15%"></div>
  <div class="lb-shoot lb-sh3" style="top:60%;left:25%"></div>

  <!-- Orbital rings (2) — slow rotating ellipses -->
  <div class="lb-ring lb-r1" style="top:55%;left:50%;width:120px;height:120px;margin-left:-60px;margin-top:-60px"></div>
  <div class="lb-ring lb-r2" style="top:25%;left:70%;width:80px;height:80px;margin-left:-40px;margin-top:-40px"></div>
</div>
`,
};
