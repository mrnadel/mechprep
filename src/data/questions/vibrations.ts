import type { Question } from '../types';

export const vibrationsQuestions: Question[] = [
  // VIB-001 — Multiple Choice
  {
    id: 'vib-001',
    type: 'multiple-choice',
    topic: 'vibrations',
    subtopic: 'Free Vibration',
    difficulty: 'beginner',
    question: 'A machine weighing 500 kg sits on rubber mounts with a combined stiffness of 200,000 N/m. What is the natural frequency of the system?',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Ground -->
  <line x1="50" y1="250" x2="350" y2="250" stroke="#94a3b8" stroke-width="2"/>
  <line x1="60" y1="255" x2="50" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="80" y1="255" x2="70" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="100" y1="255" x2="90" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="120" y1="255" x2="110" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="140" y1="255" x2="130" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="160" y1="255" x2="150" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="180" y1="255" x2="170" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="200" y1="255" x2="190" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="220" y1="255" x2="210" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="240" y1="255" x2="230" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="260" y1="255" x2="250" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="280" y1="255" x2="270" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="300" y1="255" x2="290" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="320" y1="255" x2="310" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <line x1="340" y1="255" x2="330" y2="250" stroke="#94a3b8" stroke-width="1"/>
  <!-- Springs (left) -->
  <line x1="130" y1="250" x2="130" y2="235" stroke="#60a5fa" stroke-width="2"/>
  <polyline points="130,235 120,228 140,221 120,214 140,207 120,200 140,193 130,186" fill="none" stroke="#60a5fa" stroke-width="2"/>
  <line x1="130" y1="186" x2="130" y2="170" stroke="#60a5fa" stroke-width="2"/>
  <!-- Springs (right) -->
  <line x1="270" y1="250" x2="270" y2="235" stroke="#60a5fa" stroke-width="2"/>
  <polyline points="270,235 260,228 280,221 260,214 280,207 260,200 280,193 270,186" fill="none" stroke="#60a5fa" stroke-width="2"/>
  <line x1="270" y1="186" x2="270" y2="170" stroke="#60a5fa" stroke-width="2"/>
  <!-- Machine (mass block) -->
  <rect x="90" y="110" width="220" height="60" rx="4" fill="#334155" stroke="#e2e8f0" stroke-width="2"/>
  <text x="200" y="145" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">m = 500 kg</text>
  <!-- Spring label -->
  <text x="130" y="280" text-anchor="middle" fill="#60a5fa" font-size="11">k/2</text>
  <text x="270" y="280" text-anchor="middle" fill="#60a5fa" font-size="11">k/2</text>
  <text x="200" y="295" text-anchor="middle" fill="#60a5fa" font-size="11">k_total = 200,000 N/m</text>
  <!-- Displacement arrow -->
  <line x1="340" y1="140" x2="340" y2="90" stroke="#f472b6" stroke-width="1.5"/>
  <polygon points="337,90 343,90 340,82" fill="#f472b6"/>
  <text x="355" y="115" fill="#f472b6" font-size="11">x(t)</text>
  <!-- Formula -->
  <text x="200" y="30" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold">f_n = (1/2\u03C0)\u221A(k/m)</text>
  <text x="200" y="50" text-anchor="middle" fill="#34d399" font-size="12">= (1/2\u03C0)\u221A(200000/500) = 3.18 Hz</text>
  <!-- Natural frequency highlight -->
  <rect x="130" y="60" width="140" height="24" rx="12" fill="none" stroke="#34d399" stroke-width="1.5"/>
  <text x="200" y="77" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold">f_n \u2248 3.2 Hz</text>
</svg>`,
    options: [
      { id: 'a', text: 'About 3.2 Hz' },
      { id: 'b', text: 'About 20 Hz' },
      { id: 'c', text: 'About 100 Hz' },
      { id: 'd', text: 'About 400 Hz' },
    ],
    correctAnswer: 'a',
    explanation: 'Natural frequency f_n = (1/2π) × √(k/m) = (1/2π) × √(200,000/500) = (1/2π) × √400 = (1/2π) × 20 = 3.18 Hz. This corresponds to about 191 RPM. This calculation is one of the most fundamental in vibration engineering — you should be able to do it in your head for interviews.',
    interviewInsight: 'The √(k/m) natural frequency formula is the single most important vibration equation. If the interviewer asks anything about vibrations, this formula will appear within the first two minutes.',
    realWorldConnection: 'Every piece of rotating machinery must operate away from the mount natural frequency. If the machine runs at 3000 RPM (50 Hz), these mounts provide excellent isolation because the operating frequency is well above the natural frequency.',
    commonMistake: 'Forgetting the 1/(2π) factor to convert from rad/s to Hz. Also, confusing mass with weight — k/m uses mass in kg, not weight in N.',
    tags: ['natural-frequency', 'spring-mass', 'vibration', 'isolation', 'rubber-mount'],
  },

  // VIB-002 — Scenario
  {
    id: 'vib-002',
    type: 'scenario',
    topic: 'vibrations',
    subtopic: 'Forced Vibration & Resonance',
    difficulty: 'advanced',
    question: 'A factory floor is vibrating excessively, causing quality problems on a precision grinding machine. Diagnose and solve the problem.',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Floor -->
  <rect x="20" y="160" width="360" height="15" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Floor vibration wave -->
  <path d="M 20 168 Q 60 155 100 168 T 180 168 T 260 168 T 340 168" fill="none" stroke="#fb923c" stroke-width="1.5" stroke-dasharray="4,2" opacity="0.7"/>
  <!-- Stamping press (left) -->
  <rect x="40" y="100" width="80" height="60" rx="3" fill="#334155" stroke="#f472b6" stroke-width="2"/>
  <text x="80" y="125" text-anchor="middle" fill="#f472b6" font-size="10" font-weight="bold">Stamping</text>
  <text x="80" y="140" text-anchor="middle" fill="#f472b6" font-size="10" font-weight="bold">Press</text>
  <!-- Press vibration arrows -->
  <line x1="80" y1="96" x2="80" y2="80" stroke="#f472b6" stroke-width="1.5"/>
  <polygon points="77,80 83,80 80,73" fill="#f472b6"/>
  <line x1="80" y1="96" x2="80" y2="112" stroke="#f472b6" stroke-width="0" opacity="0"/>
  <text x="80" y="70" text-anchor="middle" fill="#f472b6" font-size="10">120 strokes/min</text>
  <text x="80" y="58" text-anchor="middle" fill="#f472b6" font-size="10">= 2 Hz excitation</text>
  <!-- Distance arrow -->
  <line x1="125" y1="190" x2="275" y2="190" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="200" y="205" text-anchor="middle" fill="#94a3b8" font-size="10">20 meters</text>
  <!-- Vibration transmission waves -->
  <path d="M 120 168 Q 140 160 160 168 T 200 168 T 240 168 T 280 168" fill="none" stroke="#fb923c" stroke-width="2" opacity="0.6"/>
  <polygon points="275,165 275,171 282,168" fill="#fb923c" opacity="0.6"/>
  <!-- Grinding machine (right) -->
  <rect x="280" y="105" width="80" height="55" rx="3" fill="#334155" stroke="#34d399" stroke-width="2"/>
  <text x="320" y="128" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold">Precision</text>
  <text x="320" y="142" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold">Grinder</text>
  <!-- Chatter indication -->
  <path d="M 295 100 Q 300 92 305 100 T 315 100 T 325 100 T 335 100 T 345 100" fill="none" stroke="#fb923c" stroke-width="1.5"/>
  <text x="320" y="88" text-anchor="middle" fill="#fb923c" font-size="9">Chatter marks at 2 Hz!</text>
  <!-- Diagnosis flow -->
  <text x="200" y="235" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="bold">Diagnosis: Frequency match = transmitted resonance</text>
  <!-- Solution priority -->
  <text x="200" y="258" text-anchor="middle" fill="#60a5fa" font-size="11">1. Isolate source (press pads)</text>
  <text x="200" y="275" text-anchor="middle" fill="#60a5fa" font-size="11">2. Isolate receiver (grinder mounts)</text>
  <text x="200" y="292" text-anchor="middle" fill="#94a3b8" font-size="10">Best practice: isolate both source AND receiver</text>
</svg>`,
    context: 'A new stamping press was installed 20 meters from the grinding machine. The press operates at 120 strokes per minute. Since the press installation, the grinding machine produces parts with visible chatter marks at exactly 2 Hz.',
    steps: [
      {
        prompt: 'What is the likely cause of the vibration?',
        idealResponse: 'The stamping press operates at 120 strokes/min = 2 Hz. This excitation frequency matches the 2 Hz vibration observed on the grinding machine. The floor structure between the press and the grinder is transmitting the vibration. If the floor has a natural frequency near 2 Hz, it is amplifying the vibration through resonance.',
      },
      {
        prompt: 'How would you verify this diagnosis?',
        idealResponse: 'Use an accelerometer on the grinder base and the floor at several points between the press and grinder. Measure the frequency spectrum — you should see a dominant peak at 2 Hz that correlates with press operation. Perform an impact test (hammer test) on the floor to measure its natural frequency. If the floor natural frequency is near 2 Hz, resonance is confirmed.',
      },
      {
        prompt: 'What solutions would you propose?',
        idealResponse: 'Several options, ranked by effectiveness: (1) Install vibration isolation pads under the stamping press to reduce transmitted force (most effective at source). (2) Install an inertia block (massive concrete foundation) under the press to reduce vibration amplitude. (3) Isolate the grinding machine with tuned vibration isolation mounts. (4) Stiffen the floor between the machines (raise its natural frequency above 2 Hz). (5) As a last resort, relocate one machine. Best practice: isolate both the source AND the receiver.',
      },
    ],
    keyTakeaway: 'Vibration problems are best solved at the source. Identifying the excitation frequency, the transmission path, and any resonances allows systematic problem-solving rather than trial and error.',
    explanation: 'This is a classic transmitted vibration problem. The combination of a strong excitation source (stamping press), an efficient transmission path (floor structure), and a sensitive receiver (precision grinder) creates a quality problem.',
    interviewInsight: 'The interviewer wants to see a systematic approach: identify the source, characterize the transmission path, understand any resonances, and propose solutions ranked by effectiveness.',
    commonMistake: 'Jumping to "move the machine" without diagnosing the actual mechanism. Vibration isolation at the source is almost always cheaper and more effective than relocation.',
    tags: ['resonance', 'vibration-isolation', 'floor-vibration', 'frequency-matching', 'diagnosis'],
  },

  // VIB-003 — Confidence Rated
  {
    id: 'vib-003',
    type: 'confidence-rated',
    topic: 'vibrations',
    subtopic: 'Vibration Isolation',
    difficulty: 'intermediate',
    question: 'For effective vibration isolation, the operating frequency should be:',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Axes -->
  <line x1="60" y1="240" x2="370" y2="240" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="60" y1="240" x2="60" y2="30" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Axis labels -->
  <text x="215" y="270" text-anchor="middle" fill="#e2e8f0" font-size="12">Frequency ratio (r = \u03C9/\u03C9_n)</text>
  <text x="25" y="135" text-anchor="middle" fill="#e2e8f0" font-size="11" transform="rotate(-90,25,135)">Transmissibility</text>
  <!-- Y-axis values -->
  <text x="52" y="244" text-anchor="end" fill="#94a3b8" font-size="10">0</text>
  <text x="52" y="200" text-anchor="end" fill="#94a3b8" font-size="10">1</text>
  <line x1="57" y1="198" x2="63" y2="198" stroke="#94a3b8" stroke-width="1"/>
  <!-- X-axis values -->
  <text x="60" y="255" text-anchor="middle" fill="#94a3b8" font-size="10">0</text>
  <text x="140" y="255" text-anchor="middle" fill="#94a3b8" font-size="10">1</text>
  <line x1="140" y1="237" x2="140" y2="243" stroke="#94a3b8" stroke-width="1"/>
  <text x="195" y="255" text-anchor="middle" fill="#94a3b8" font-size="10">\u221A2</text>
  <line x1="195" y1="237" x2="195" y2="243" stroke="#94a3b8" stroke-width="1"/>
  <text x="260" y="255" text-anchor="middle" fill="#94a3b8" font-size="10">3</text>
  <line x1="260" y1="237" x2="260" y2="243" stroke="#94a3b8" stroke-width="1"/>
  <text x="340" y="255" text-anchor="middle" fill="#94a3b8" font-size="10">5</text>
  <line x1="340" y1="237" x2="340" y2="243" stroke="#94a3b8" stroke-width="1"/>
  <!-- Transmissibility = 1 line -->
  <line x1="60" y1="198" x2="370" y2="198" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="4,4"/>
  <!-- Transmissibility curve (undamped-like) -->
  <path d="M 60 200 Q 80 195 100 180 Q 120 150 130 100 Q 135 60 140 45 Q 145 60 150 100 Q 160 155 175 185 Q 195 200 210 210 Q 240 225 270 230 Q 310 233 370 236" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
  <!-- Resonance peak label -->
  <line x1="140" y1="45" x2="165" y2="40" stroke="#f472b6" stroke-width="1"/>
  <text x="168" y="38" fill="#f472b6" font-size="10" font-weight="bold">Resonance!</text>
  <text x="168" y="50" fill="#f472b6" font-size="9">r = 1 (DANGER)</text>
  <!-- sqrt(2) crossover point -->
  <circle cx="195" cy="198" r="4" fill="#fb923c"/>
  <line x1="195" y1="198" x2="215" y2="185" stroke="#fb923c" stroke-width="1"/>
  <text x="218" y="180" fill="#fb923c" font-size="10" font-weight="bold">r = \u221A2</text>
  <text x="218" y="192" fill="#fb923c" font-size="9">Isolation begins</text>
  <!-- Amplification zone -->
  <rect x="61" y="32" width="133" height="206" rx="0" fill="#f472b6" opacity="0.07"/>
  <text x="127" y="82" text-anchor="middle" fill="#f472b6" font-size="10">AMPLIFICATION</text>
  <text x="127" y="95" text-anchor="middle" fill="#f472b6" font-size="10">ZONE</text>
  <!-- Isolation zone -->
  <rect x="195" y="32" width="175" height="206" rx="0" fill="#34d399" opacity="0.07"/>
  <text x="282" y="82" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">ISOLATION</text>
  <text x="282" y="95" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">ZONE</text>
  <!-- Target operating range -->
  <line x1="250" y1="225" x2="350" y2="225" stroke="#34d399" stroke-width="3"/>
  <text x="300" y="222" text-anchor="middle" fill="#34d399" font-size="9">Target: r > 3</text>
</svg>`,
    options: [
      { id: 'a', text: 'Below the natural frequency of the isolation system' },
      { id: 'b', text: 'At the natural frequency to maximize energy absorption' },
      { id: 'c', text: 'At least √2 times the natural frequency, ideally 3-5× or more' },
      { id: 'd', text: 'Exactly twice the natural frequency for optimal damping' },
    ],
    correctAnswer: 'c',
    confidenceLevels: ['Guessing', 'Somewhat sure', 'Very confident'],
    explanation: 'Vibration isolation begins when the frequency ratio r = ω/ω_n exceeds √2 (about 1.41). Below this, the mount actually amplifies vibration. At resonance (r=1), amplification is maximum and can be catastrophic. For practical isolation (>80% reduction), you want r > 3, meaning the operating frequency should be at least 3× the mount natural frequency. This is why soft mounts (low natural frequency) provide better isolation.',
    interviewInsight: 'The √2 threshold is a critical design number. Any vibration engineer must know that isolation only begins above this frequency ratio. The follow-up question is usually about the role of damping.',
    realWorldConnection: 'This is why sensitive equipment (electron microscopes, laser tables) sit on very soft air springs with natural frequencies below 1 Hz — to isolate from building vibrations at 5-30 Hz.',
    commonMistake: 'Choosing option (b) — operating AT resonance maximizes vibration, not isolation. This is the single most dangerous condition for any vibrating system.',
    tags: ['vibration-isolation', 'frequency-ratio', 'transmissibility', 'resonance', 'natural-frequency'],
  },

  // VIB-004 — Multiple Choice
  {
    id: 'vib-004',
    type: 'multiple-choice',
    topic: 'vibrations',
    subtopic: 'Rotordynamics',
    difficulty: 'advanced',
    question: 'A turbine rotor has a critical speed (first bending mode) at 6,000 RPM. The operating speed is 10,000 RPM. During startup, the rotor must pass through the critical speed. What precaution is essential?',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Rotor shaft -->
  <rect x="60" y="90" width="280" height="20" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Bearings -->
  <rect x="80" y="80" width="16" height="40" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
  <rect x="304" y="80" width="16" height="40" rx="2" fill="none" stroke="#60a5fa" stroke-width="2"/>
  <text x="88" y="75" text-anchor="middle" fill="#60a5fa" font-size="9">Brg</text>
  <text x="312" y="75" text-anchor="middle" fill="#60a5fa" font-size="9">Brg</text>
  <!-- First bending mode shape (dashed) -->
  <path d="M 88 100 Q 200 55 312 100" fill="none" stroke="#f472b6" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="200" y="52" text-anchor="middle" fill="#f472b6" font-size="10">1st bending mode shape</text>
  <!-- Speed vs amplitude plot -->
  <!-- Axes -->
  <line x1="60" y1="270" x2="370" y2="270" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="60" y1="270" x2="60" y2="150" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="215" y="293" text-anchor="middle" fill="#e2e8f0" font-size="11">Speed (RPM)</text>
  <text x="40" y="210" text-anchor="middle" fill="#e2e8f0" font-size="10" transform="rotate(-90,40,210)">Amplitude</text>
  <!-- Critical speed marker -->
  <line x1="190" y1="270" x2="190" y2="152" stroke="#f472b6" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="190" y="283" text-anchor="middle" fill="#f472b6" font-size="10">6,000</text>
  <!-- Operating speed marker -->
  <line x1="310" y1="270" x2="310" y2="250" stroke="#34d399" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="310" y="283" text-anchor="middle" fill="#34d399" font-size="10">10,000</text>
  <!-- Response curve -->
  <path d="M 60 265 Q 100 264 140 260 Q 170 250 180 220 Q 185 180 190 160 Q 195 180 200 220 Q 210 250 240 260 Q 280 265 310 263 Q 350 262 370 261" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
  <!-- Resonance peak -->
  <circle cx="190" cy="160" r="4" fill="#f472b6"/>
  <text x="210" y="160" fill="#f472b6" font-size="10" font-weight="bold">Critical speed</text>
  <!-- Fast acceleration arrow -->
  <line x1="100" y1="240" x2="280" y2="240" stroke="#34d399" stroke-width="2"/>
  <polygon points="280,237 280,243 290,240" fill="#34d399"/>
  <text x="190" y="235" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold">Accelerate FAST</text>
  <!-- Operating point -->
  <circle cx="310" cy="263" r="4" fill="#34d399"/>
  <text x="330" y="258" fill="#34d399" font-size="10">Operating</text>
  <text x="330" y="270" fill="#34d399" font-size="10">point</text>
</svg>`,
    options: [
      { id: 'a', text: 'Operate briefly at 6,000 RPM to test the response before proceeding' },
      { id: 'b', text: 'Accelerate through the critical speed as quickly as possible to minimize time at resonance' },
      { id: 'c', text: 'Avoid ever reaching 10,000 RPM — always operate below the critical speed' },
      { id: 'd', text: 'Remove all damping to let the rotor pass through the critical speed freely' },
    ],
    correctAnswer: 'b',
    explanation: 'When passing through a critical speed, the rotor experiences resonant amplification. The key is to minimize the TIME spent near the critical speed. Fast acceleration means the rotor spends only fractions of a second in the resonance zone, limiting the amplitude buildup. Dwelling at the critical speed (option a) allows amplitude to grow to dangerous levels. Operating below the critical (option c) wastes the machine\'s capability. Removing damping (option d) makes the resonance response worse, not better.',
    interviewInsight: 'Critical speed management is tested in every turbomachinery interview. The concept of "passing through" a critical speed quickly is fundamental to safe operation of supercritical rotors.',
    realWorldConnection: 'Nearly all modern gas turbines, turbochargers, and centrifuges operate above their first critical speed. The startup and shutdown procedures specifically include fast acceleration through critical speeds.',
    commonMistake: 'Thinking you should never exceed the critical speed. Many machines are designed to operate above one or more critical speeds — they just need to pass through them quickly.',
    tags: ['critical-speed', 'rotor', 'resonance', 'turbomachinery', 'startup', 'acceleration'],
  },
];
