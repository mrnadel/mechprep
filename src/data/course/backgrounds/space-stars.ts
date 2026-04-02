/**
 * Space Stars — animated deep-space background for space/astronomy lessons.
 *
 * Authoring rules:
 * - Max 30 animated elements (GPU budget)
 * - CSS animations use transform/opacity only
 * - All selectors scoped under #lb-space-stars
 * - All @keyframes prefixed lb-space-stars-
 * - Must include prefers-reduced-motion media query
 */
export const background = {
  name: 'Space Stars',
  category: 'Space',
  html: `
<style>
  #lb-space-stars {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, #0B0E1A 0%, #0f1535 30%, #1a1050 60%, #0B0E1A 100%);
    overflow: hidden;
  }
  #lb-space-stars .lb-star {
    position: absolute;
    border-radius: 50%;
    will-change: opacity, transform;
  }
  #lb-space-stars .lb-planet {
    position: absolute;
    border-radius: 50%;
    will-change: transform;
  }
  #lb-space-stars .lb-nebula {
    position: absolute;
    border-radius: 50%;
    will-change: transform, opacity;
  }
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
  @media (prefers-reduced-motion: reduce) {
    #lb-space-stars * { animation: none !important; }
  }
</style>
<div id="lb-space-stars">
  <!-- Stars (18 elements) -->
  <div class="lb-star" style="top:4%;left:12%;width:3px;height:3px;background:#fff;box-shadow:0 0 6px 1px rgba(255,255,255,0.5);animation:lb-space-stars-twinkle 3.5s 0s infinite ease-in-out"></div>
  <div class="lb-star" style="top:8%;left:55%;width:4px;height:4px;background:#FDE68A;box-shadow:0 0 10px 2px rgba(253,230,138,0.4);animation:lb-space-stars-twinkle 4.2s 1.2s infinite ease-in-out"></div>
  <div class="lb-star" style="top:6%;left:82%;width:2px;height:2px;background:#E0E7FF;box-shadow:0 0 5px 1px rgba(224,231,255,0.4);animation:lb-space-stars-twinkle 3.8s 0.6s infinite ease-in-out"></div>
  <div class="lb-star" style="top:15%;left:28%;width:2px;height:2px;background:#fff;box-shadow:0 0 4px rgba(255,255,255,0.4);animation:lb-space-stars-twinkle 5s 2.1s infinite ease-in-out"></div>
  <div class="lb-star" style="top:18%;left:68%;width:3px;height:3px;background:#C4B5FD;box-shadow:0 0 7px 1px rgba(196,181,253,0.4);animation:lb-space-stars-twinkle 4.5s 0.3s infinite ease-in-out"></div>
  <div class="lb-star" style="top:25%;left:8%;width:2px;height:2px;background:#E0E7FF;box-shadow:0 0 5px rgba(224,231,255,0.3);animation:lb-space-stars-twinkle 3.2s 1.8s infinite ease-in-out"></div>
  <div class="lb-star" style="top:30%;left:92%;width:3px;height:3px;background:#fff;box-shadow:0 0 6px rgba(255,255,255,0.5);animation:lb-space-stars-twinkle 4.8s 0.9s infinite ease-in-out"></div>
  <div class="lb-star" style="top:38%;left:42%;width:2px;height:2px;background:#FDE68A;box-shadow:0 0 5px rgba(253,230,138,0.3);animation:lb-space-stars-twinkle 5.5s 2.5s infinite ease-in-out"></div>
  <div class="lb-star" style="top:42%;left:5%;width:3px;height:3px;background:#C4B5FD;box-shadow:0 0 7px rgba(196,181,253,0.4);animation:lb-space-stars-twinkle 3.6s 1.4s infinite ease-in-out"></div>
  <div class="lb-star" style="top:48%;left:75%;width:2px;height:2px;background:#fff;box-shadow:0 0 4px rgba(255,255,255,0.3);animation:lb-space-stars-twinkle 4.1s 0.7s infinite ease-in-out"></div>
  <div class="lb-star" style="top:55%;left:18%;width:3px;height:3px;background:#E0E7FF;box-shadow:0 0 6px rgba(224,231,255,0.4);animation:lb-space-stars-twinkle 4.7s 2s infinite ease-in-out"></div>
  <div class="lb-star" style="top:60%;left:88%;width:2px;height:2px;background:#FDE68A;box-shadow:0 0 5px rgba(253,230,138,0.3);animation:lb-space-stars-twinkle 3.4s 1.1s infinite ease-in-out"></div>
  <div class="lb-star" style="top:68%;left:35%;width:3px;height:3px;background:#fff;box-shadow:0 0 7px rgba(255,255,255,0.5);animation:lb-space-stars-twinkle 5.2s 0.4s infinite ease-in-out"></div>
  <div class="lb-star" style="top:72%;left:62%;width:2px;height:2px;background:#C4B5FD;box-shadow:0 0 5px rgba(196,181,253,0.3);animation:lb-space-stars-twinkle 3.9s 1.6s infinite ease-in-out"></div>
  <div class="lb-star" style="top:80%;left:48%;width:3px;height:3px;background:#E0E7FF;box-shadow:0 0 6px rgba(224,231,255,0.4);animation:lb-space-stars-twinkle 4.3s 2.3s infinite ease-in-out"></div>
  <div class="lb-star" style="top:85%;left:15%;width:2px;height:2px;background:#fff;box-shadow:0 0 4px rgba(255,255,255,0.3);animation:lb-space-stars-twinkle 5.1s 0.8s infinite ease-in-out"></div>
  <div class="lb-star" style="top:90%;left:78%;width:3px;height:3px;background:#FDE68A;box-shadow:0 0 7px rgba(253,230,138,0.4);animation:lb-space-stars-twinkle 3.7s 1.9s infinite ease-in-out"></div>
  <div class="lb-star" style="top:95%;left:30%;width:2px;height:2px;background:#C4B5FD;box-shadow:0 0 5px rgba(196,181,253,0.3);animation:lb-space-stars-twinkle 4.6s 0.2s infinite ease-in-out"></div>

  <!-- Planets (2 elements) -->
  <div class="lb-planet" style="bottom:12%;right:8%;width:45px;height:45px;background:linear-gradient(135deg,#818CF8,#4338CA);box-shadow:0 0 20px rgba(99,102,241,0.3),inset -6px -3px 10px rgba(0,0,0,0.3);animation:lb-space-stars-float 10s 0s infinite ease-in-out"></div>
  <div class="lb-planet" style="top:20%;left:6%;width:28px;height:28px;background:linear-gradient(135deg,#F472B6,#9D174D);box-shadow:0 0 14px rgba(244,114,182,0.2),inset -4px -2px 6px rgba(0,0,0,0.3);animation:lb-space-stars-float 12s 3s infinite ease-in-out"></div>

  <!-- Nebula glows (2 elements) -->
  <div class="lb-nebula" style="top:15%;right:-8%;width:200px;height:200px;background:radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%);animation:lb-space-stars-drift 18s 0s infinite ease-in-out"></div>
  <div class="lb-nebula" style="bottom:25%;left:-8%;width:180px;height:180px;background:radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%);animation:lb-space-stars-drift 20s 5s infinite ease-in-out"></div>
</div>
`,
};
