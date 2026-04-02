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
    will-change: opacity;
    animation: lb-space-stars-twinkle var(--d, 4s) var(--dl, 0s) infinite ease-in-out;
  }
  #lb-space-stars .lb-planet {
    position: absolute;
    border-radius: 50%;
    will-change: transform;
    animation: lb-space-stars-float var(--d, 8s) var(--dl, 0s) infinite ease-in-out;
  }
  #lb-space-stars .lb-nebula {
    position: absolute;
    border-radius: 50%;
    will-change: transform;
    animation: lb-space-stars-drift var(--d, 15s) var(--dl, 0s) infinite ease-in-out;
  }
  @keyframes lb-space-stars-twinkle {
    0%, 100% { opacity: 0.25; }
    50% { opacity: 1; }
  }
  @keyframes lb-space-stars-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes lb-space-stars-drift {
    0% { transform: translate(0, 0); }
    50% { transform: translate(4px, -5px); }
    100% { transform: translate(0, 0); }
  }
  @media (prefers-reduced-motion: reduce) {
    #lb-space-stars * { animation: none !important; }
  }
</style>
<div id="lb-space-stars">
  <!-- Stars (18 elements) -->
  <div class="lb-star" style="top:4%;left:12%;width:3px;height:3px;background:#fff;box-shadow:0 0 6px 1px rgba(255,255,255,0.5);--d:3.5s;--dl:0s"></div>
  <div class="lb-star" style="top:8%;left:55%;width:4px;height:4px;background:#FDE68A;box-shadow:0 0 10px 2px rgba(253,230,138,0.4);--d:4.2s;--dl:1.2s"></div>
  <div class="lb-star" style="top:6%;left:82%;width:2px;height:2px;background:#E0E7FF;box-shadow:0 0 5px 1px rgba(224,231,255,0.4);--d:3.8s;--dl:0.6s"></div>
  <div class="lb-star" style="top:15%;left:28%;width:2px;height:2px;background:#fff;box-shadow:0 0 4px rgba(255,255,255,0.4);--d:5s;--dl:2.1s"></div>
  <div class="lb-star" style="top:18%;left:68%;width:3px;height:3px;background:#C4B5FD;box-shadow:0 0 7px 1px rgba(196,181,253,0.4);--d:4.5s;--dl:0.3s"></div>
  <div class="lb-star" style="top:25%;left:8%;width:2px;height:2px;background:#E0E7FF;box-shadow:0 0 5px rgba(224,231,255,0.3);--d:3.2s;--dl:1.8s"></div>
  <div class="lb-star" style="top:30%;left:92%;width:3px;height:3px;background:#fff;box-shadow:0 0 6px rgba(255,255,255,0.5);--d:4.8s;--dl:0.9s"></div>
  <div class="lb-star" style="top:38%;left:42%;width:2px;height:2px;background:#FDE68A;box-shadow:0 0 5px rgba(253,230,138,0.3);--d:5.5s;--dl:2.5s"></div>
  <div class="lb-star" style="top:42%;left:5%;width:3px;height:3px;background:#C4B5FD;box-shadow:0 0 7px rgba(196,181,253,0.4);--d:3.6s;--dl:1.4s"></div>
  <div class="lb-star" style="top:48%;left:75%;width:2px;height:2px;background:#fff;box-shadow:0 0 4px rgba(255,255,255,0.3);--d:4.1s;--dl:0.7s"></div>
  <div class="lb-star" style="top:55%;left:18%;width:3px;height:3px;background:#E0E7FF;box-shadow:0 0 6px rgba(224,231,255,0.4);--d:4.7s;--dl:2s"></div>
  <div class="lb-star" style="top:60%;left:88%;width:2px;height:2px;background:#FDE68A;box-shadow:0 0 5px rgba(253,230,138,0.3);--d:3.4s;--dl:1.1s"></div>
  <div class="lb-star" style="top:68%;left:35%;width:3px;height:3px;background:#fff;box-shadow:0 0 7px rgba(255,255,255,0.5);--d:5.2s;--dl:0.4s"></div>
  <div class="lb-star" style="top:72%;left:62%;width:2px;height:2px;background:#C4B5FD;box-shadow:0 0 5px rgba(196,181,253,0.3);--d:3.9s;--dl:1.6s"></div>
  <div class="lb-star" style="top:80%;left:48%;width:3px;height:3px;background:#E0E7FF;box-shadow:0 0 6px rgba(224,231,255,0.4);--d:4.3s;--dl:2.3s"></div>
  <div class="lb-star" style="top:85%;left:15%;width:2px;height:2px;background:#fff;box-shadow:0 0 4px rgba(255,255,255,0.3);--d:5.1s;--dl:0.8s"></div>
  <div class="lb-star" style="top:90%;left:78%;width:3px;height:3px;background:#FDE68A;box-shadow:0 0 7px rgba(253,230,138,0.4);--d:3.7s;--dl:1.9s"></div>
  <div class="lb-star" style="top:95%;left:30%;width:2px;height:2px;background:#C4B5FD;box-shadow:0 0 5px rgba(196,181,253,0.3);--d:4.6s;--dl:0.2s"></div>

  <!-- Planets (2 elements) -->
  <div class="lb-planet" style="bottom:12%;right:8%;width:45px;height:45px;background:linear-gradient(135deg,#818CF8,#4338CA);box-shadow:0 0 20px rgba(99,102,241,0.3),inset -6px -3px 10px rgba(0,0,0,0.3);--d:10s;--dl:0s"></div>
  <div class="lb-planet" style="top:20%;left:6%;width:28px;height:28px;background:linear-gradient(135deg,#F472B6,#9D174D);box-shadow:0 0 14px rgba(244,114,182,0.2),inset -4px -2px 6px rgba(0,0,0,0.3);--d:12s;--dl:3s"></div>

  <!-- Nebula glows (2 elements) -->
  <div class="lb-nebula" style="top:15%;right:-8%;width:200px;height:200px;background:radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%);--d:18s;--dl:0s"></div>
  <div class="lb-nebula" style="bottom:25%;left:-8%;width:180px;height:180px;background:radial-gradient(circle,rgba(168,85,247,0.07) 0%,transparent 70%);--d:20s;--dl:5s"></div>
</div>
`,
};
