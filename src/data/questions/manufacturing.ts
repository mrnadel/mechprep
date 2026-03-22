import type { Question } from '../types';

export const manufacturingQuestions: Question[] = [
  // MFG-001 — Multiple Choice
  {
    id: 'mfg-001',
    type: 'multiple-choice',
    topic: 'manufacturing',
    subtopic: 'Machining',
    difficulty: 'beginner',
    question: 'You need a surface finish of Ra 0.4 μm on a steel shaft. Which process is most appropriate?',
    diagram: `<svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="200" y="20" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Surface Finish (Ra) by Process</text>
      <!-- Axis -->
      <line x1="50" y1="245" x2="380" y2="245" stroke="#94a3b8" stroke-width="1"/>
      <line x1="50" y1="40" x2="50" y2="245" stroke="#94a3b8" stroke-width="1"/>
      <!-- Y-axis label -->
      <text x="15" y="145" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" transform="rotate(-90,15,145)">Ra (μm)</text>
      <!-- Y-axis ticks -->
      <text x="45" y="245" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">0</text>
      <line x1="48" y1="205" x2="52" y2="205" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="208" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">1</text>
      <line x1="48" y1="165" x2="52" y2="165" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="168" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">3</text>
      <line x1="48" y1="125" x2="52" y2="125" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="128" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">6</text>
      <line x1="48" y1="85" x2="52" y2="85" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="88" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">12</text>
      <line x1="48" y1="45" x2="52" y2="45" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="48" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">25</text>
      <!-- Target line at Ra 0.4 -->
      <line x1="50" y1="229" x2="380" y2="229" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="6,3"/>
      <text x="383" y="232" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">Target 0.4</text>
      <!-- Bars - Sand Casting (Ra 12-25) -->
      <rect x="70" y="45" width="50" height="200" fill="#fb923c" opacity="0.7" rx="2"/>
      <text x="95" y="258" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Sand</text>
      <text x="95" y="269" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Casting</text>
      <!-- Bars - Rough Milling (Ra 1.6-6.3) -->
      <rect x="140" y="125" width="50" height="95" fill="#fb923c" opacity="0.7" rx="2"/>
      <text x="165" y="258" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Rough</text>
      <text x="165" y="269" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Milling</text>
      <!-- Bars - Turning (Ra 0.8-3.2) -->
      <rect x="210" y="165" width="50" height="55" fill="#fb923c" opacity="0.7" rx="2"/>
      <text x="235" y="258" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Turning</text>
      <!-- Bars - Grinding (Ra 0.2-0.8) achieves target -->
      <rect x="280" y="213" width="50" height="32" fill="#34d399" opacity="0.8" rx="2"/>
      <text x="305" y="258" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" font-weight="bold">Grinding</text>
      <!-- Check mark on grinding -->
      <text x="305" y="210" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="14">&#x2713;</text>
    </svg>`,
    options: [
      { id: 'a', text: 'Turning on a lathe with a standard insert' },
      { id: 'b', text: 'Cylindrical grinding' },
      { id: 'c', text: 'Rough milling' },
      { id: 'd', text: 'Sand casting with no post-machining' },
    ],
    correctAnswer: 'b',
    explanation: 'Ra 0.4 μm is a fine finish that requires an abrasive process. Standard turning typically achieves Ra 0.8-3.2 μm. Cylindrical grinding routinely achieves Ra 0.2-0.8 μm. Milling gives Ra 1.6-6.3 μm. Sand casting produces Ra 12-25 μm. For even finer finishes (Ra < 0.1), lapping or superfinishing would be needed.',
    interviewInsight: 'Knowing which process achieves which surface finish is fundamental manufacturing knowledge. Interviewers test this to see if you can specify realistic finishes on drawings.',
    realWorldConnection: 'Bearing journals, seal surfaces, and gauge blocks all require grinding or better finishes. Specifying an unnecessarily fine finish on a non-critical surface wastes money.',
    commonMistake: 'Thinking that turning can achieve any finish with a slow enough feed rate. While fine turning can approach Ra 0.8, achieving Ra 0.4 consistently requires grinding.',
    tags: ['surface-finish', 'grinding', 'turning', 'Ra', 'machining'],
  },

  // MFG-002 — Design Decision
  {
    id: 'mfg-002',
    type: 'design-decision',
    topic: 'manufacturing',
    subtopic: 'Casting & Molding',
    difficulty: 'intermediate',
    question: 'You need 10,000 units per year of a complex aluminum housing (about 300mm × 200mm × 100mm, 2-3mm wall thickness). Which process do you choose?',
    diagram: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="200" y="20" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">High-Pressure Die Casting (HPDC)</text>
      <!-- Die halves -->
      <rect x="40" y="50" width="120" height="200" fill="#334155" stroke="#94a3b8" stroke-width="2" rx="3"/>
      <text x="100" y="42" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Fixed Die</text>
      <rect x="240" y="50" width="120" height="200" fill="#334155" stroke="#94a3b8" stroke-width="2" rx="3"/>
      <text x="300" y="42" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Moving Die</text>
      <!-- Cavity in fixed die -->
      <path d="M160 90 L160 70 L140 70 L140 230 L160 230 L160 210 L155 200 L155 100 Z" fill="#60a5fa" opacity="0.3" stroke="#60a5fa" stroke-width="1.5"/>
      <!-- Cavity in moving die -->
      <path d="M240 90 L240 70 L260 70 L260 230 L240 230 L240 210 L245 200 L245 100 Z" fill="#60a5fa" opacity="0.3" stroke="#60a5fa" stroke-width="1.5"/>
      <!-- Part shape (cavity) -->
      <rect x="160" y="80" width="80" height="140" fill="#60a5fa" opacity="0.2" stroke="#60a5fa" stroke-width="1" stroke-dasharray="4,2"/>
      <text x="200" y="155" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">Cavity</text>
      <!-- Runner / gate -->
      <rect x="130" y="140" width="30" height="20" fill="#fb923c" opacity="0.5" stroke="#fb923c" stroke-width="1"/>
      <text x="115" y="155" text-anchor="end" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Gate</text>
      <!-- Shot sleeve -->
      <rect x="20" y="135" width="115" height="30" fill="none" stroke="#fb923c" stroke-width="1.5" rx="2"/>
      <text x="70" y="180" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Shot Sleeve</text>
      <!-- Plunger -->
      <rect x="25" y="139" width="30" height="22" fill="#fb923c" opacity="0.6" stroke="#fb923c" stroke-width="1"/>
      <!-- Plunger arrow -->
      <line x1="10" y1="150" x2="25" y2="150" stroke="#fb923c" stroke-width="2" marker-end="url(#mfg002-arrow)"/>
      <defs><marker id="mfg002-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#fb923c"/></marker></defs>
      <!-- Ejector pins -->
      <line x1="300" y1="100" x2="330" y2="100" stroke="#34d399" stroke-width="2"/>
      <line x1="300" y1="150" x2="330" y2="150" stroke="#34d399" stroke-width="2"/>
      <line x1="300" y1="200" x2="330" y2="200" stroke="#34d399" stroke-width="2"/>
      <text x="345" y="153" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">Ejector</text>
      <text x="345" y="163" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">Pins</text>
      <!-- Wall thickness annotation -->
      <line x1="162" y1="90" x2="238" y2="90" stroke="#f472b6" stroke-width="1" stroke-dasharray="3,2"/>
      <text x="200" y="85" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">2-3mm walls</text>
      <!-- Specs -->
      <text x="200" y="260" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Cycle: 30-60s | Tol: ±0.1mm</text>
      <text x="200" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Tooling: $50-100k | Near-net-shape</text>
      <text x="200" y="290" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">At 10k/yr: tooling amortizes to ~$5-10/part</text>
    </svg>`,
    context: 'The part has internal ribs, bosses for fasteners, and requires a Class A external surface (painted). Tolerances are ±0.2mm on critical features. Weight target is under 400g.',
    designOptions: [
      {
        id: 'a',
        text: 'Sand casting',
        tradeoffs: 'Low tooling cost (~$5k), but poor surface finish (requires machining), wide tolerances (±1mm), slow cycle time. Porosity risk.',
      },
      {
        id: 'b',
        text: 'High-pressure die casting (HPDC)',
        tradeoffs: 'Excellent surface finish, tight tolerances (±0.1mm), fast cycle time (<60s). High tooling cost (~$50-100k). Can achieve 2mm walls. Some porosity from trapped air.',
      },
      {
        id: 'c',
        text: 'CNC machining from billet',
        tradeoffs: 'No tooling cost, excellent tolerances and finish. But very expensive per part for this geometry (lots of material removal, complex 5-axis work). Material waste >80%.',
      },
      {
        id: 'd',
        text: 'Investment casting',
        tradeoffs: 'Good surface finish, complex shapes possible, moderate tooling ($10-20k). But cycle time is long and cost per part is high for aluminum. Better suited for steel/superalloys.',
      },
    ],
    bestOption: 'b',
    evaluationCriteria: ['Per-unit cost at 10k/year volume', 'Surface finish quality', 'Dimensional accuracy', 'Ability to produce thin walls and complex geometry', 'Tooling amortization'],
    explanation: 'At 10,000 units/year, HPDC amortizes the high tooling cost to ~$5-10 per part while delivering near-net-shape parts with excellent surface finish. The fast cycle time (~30-60 seconds) and minimal secondary machining make it the cost winner. Sand casting would require too much post-machining. CNC is too expensive per part. Investment casting is overkill for aluminum.',
    interviewInsight: 'Process selection for a given volume and geometry is the most common manufacturing interview question. The interviewer wants to see that you can match process capabilities to requirements and consider the economics.',
    commonMistake: 'Choosing CNC machining because it gives the best quality — at 10k units/year, the per-part cost is prohibitive. Also, not knowing that die casting can achieve ±0.1mm tolerances.',
    tags: ['die-casting', 'aluminum', 'process-selection', 'volume', 'tooling-cost'],
  },

  // MFG-003 — Multi-Select
  {
    id: 'mfg-003',
    type: 'multi-select',
    topic: 'manufacturing',
    subtopic: 'Welding & Joining',
    difficulty: 'intermediate',
    question: 'Which of the following are TRUE about the heat-affected zone (HAZ) in a steel weld? (Select all that apply)',
    diagram: `<svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="200" y="20" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Weld Cross-Section: Zones</text>
      <!-- Base metal - left plate -->
      <rect x="20" y="100" width="160" height="100" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Base metal - right plate -->
      <rect x="220" y="100" width="160" height="100" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Cross-hatch for base metal (left) -->
      <line x1="25" y1="105" x2="75" y2="195" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <line x1="45" y1="105" x2="95" y2="195" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <line x1="65" y1="105" x2="115" y2="195" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <line x1="85" y1="105" x2="135" y2="195" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <line x1="105" y1="105" x2="155" y2="195" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <!-- Cross-hatch for base metal (right) -->
      <line x1="255" y1="105" x2="305" y2="195" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <line x1="275" y1="105" x2="325" y2="195" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <line x1="295" y1="105" x2="345" y2="195" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <line x1="315" y1="105" x2="365" y2="195" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <line x1="335" y1="105" x2="375" y2="175" stroke="#94a3b8" stroke-width="0.3" opacity="0.4"/>
      <!-- HAZ left -->
      <path d="M140 100 L180 100 L195 80 L200 70 L205 80 L220 100 L220 200 L200 200 L180 200 Z" fill="none"/>
      <rect x="140" y="100" width="40" height="100" fill="#fb923c" opacity="0.3" stroke="none"/>
      <!-- HAZ right -->
      <rect x="220" y="100" width="40" height="100" fill="#fb923c" opacity="0.3" stroke="none"/>
      <!-- Fusion zone / weld bead -->
      <path d="M180 100 Q190 60 200 55 Q210 60 220 100 L220 200 L180 200 Z" fill="#f472b6" opacity="0.35" stroke="#f472b6" stroke-width="1.5"/>
      <!-- Weld bead cap (reinforcement) -->
      <path d="M175 100 Q190 60 200 52 Q210 60 225 100" fill="#f472b6" opacity="0.25" stroke="#f472b6" stroke-width="2"/>
      <!-- Labels -->
      <text x="70" y="155" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Base Metal</text>
      <text x="330" y="155" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Base Metal</text>
      <text x="200" y="155" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Fusion</text>
      <text x="200" y="167" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Zone</text>
      <!-- HAZ labels with arrows -->
      <text x="155" y="85" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">HAZ</text>
      <line x1="155" y1="88" x2="155" y2="98" stroke="#fb923c" stroke-width="1.5" marker-end="url(#mfg003-arr)"/>
      <text x="245" y="85" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">HAZ</text>
      <line x1="245" y1="88" x2="245" y2="98" stroke="#fb923c" stroke-width="1.5" marker-end="url(#mfg003-arr)"/>
      <defs><marker id="mfg003-arr" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5" fill="#fb923c"/></marker></defs>
      <!-- Temperature gradient annotation -->
      <text x="200" y="225" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Temperature gradient from weld center:</text>
      <!-- Gradient bar -->
      <defs>
        <linearGradient id="mfg003-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#94a3b8"/>
          <stop offset="30%" stop-color="#fb923c"/>
          <stop offset="50%" stop-color="#f472b6"/>
          <stop offset="70%" stop-color="#fb923c"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
      </defs>
      <rect x="80" y="235" width="240" height="10" fill="url(#mfg003-grad)" rx="3"/>
      <text x="80" y="260" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Unaffected</text>
      <text x="200" y="260" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">Melted</text>
      <text x="320" y="260" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Unaffected</text>
      <text x="140" y="272" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">HAZ: heated</text>
      <text x="260" y="272" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">HAZ: heated</text>
      <text x="140" y="280" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8">but NOT melted</text>
      <text x="260" y="280" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8">but NOT melted</text>
    </svg>`,
    options: [
      { id: 'a', text: 'The HAZ is the region that melted and re-solidified during welding' },
      { id: 'b', text: 'The HAZ can be harder AND more brittle than the base metal due to uncontrolled cooling' },
      { id: 'c', text: 'Pre-heating the workpiece before welding can reduce HAZ hardness' },
      { id: 'd', text: 'The HAZ does not exist in aluminum welds — only in steel' },
      { id: 'e', text: 'The HAZ is often the weakest link in a welded joint and where cracks initiate' },
    ],
    correctAnswers: ['b', 'c', 'e'],
    explanation: 'The HAZ is the region ADJACENT to the weld that was heated enough to change microstructure but did NOT melt (option a is wrong — that is the fusion zone). In steel, rapid cooling in the HAZ can form martensite, making it hard and brittle (b). Pre-heating slows the cooling rate, preventing martensite formation (c). Aluminum also has a HAZ where the temper condition is lost (d is wrong). The HAZ is indeed where many weld failures initiate (e) because its microstructure is uncontrolled.',
    interviewInsight: 'Understanding the HAZ is critical for any role involving welded structures. The interviewer wants to see that you know the HAZ is NOT the weld itself, and that you understand the metallurgical changes that occur there.',
    commonMistake: 'Confusing the HAZ with the fusion zone (weld bead itself). The HAZ never melted — it was just heated enough to change its metallurgy.',
    tags: ['HAZ', 'welding', 'martensite', 'preheat', 'steel', 'cracking'],
  },

  // MFG-004 — Free Text / Explanation
  {
    id: 'mfg-004',
    type: 'explanation',
    topic: 'manufacturing',
    subtopic: 'Design for Manufacturing',
    difficulty: 'intermediate',
    question: 'A designer sends you a part with a deep, narrow slot (20mm deep, 2mm wide) machined into a steel block. You are the manufacturing engineer. What feedback do you give?',
    diagram: `<svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="200" y="20" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">DFM Issue: Deep Narrow Slot (10:1 Aspect Ratio)</text>
      <!-- Steel block -->
      <rect x="50" y="50" width="140" height="180" fill="#334155" stroke="#94a3b8" stroke-width="2" rx="2"/>
      <!-- Cross-hatch on block -->
      <line x1="55" y1="55" x2="95" y2="225" stroke="#94a3b8" stroke-width="0.3" opacity="0.3"/>
      <line x1="75" y1="55" x2="115" y2="225" stroke="#94a3b8" stroke-width="0.3" opacity="0.3"/>
      <line x1="95" y1="55" x2="135" y2="225" stroke="#94a3b8" stroke-width="0.3" opacity="0.3"/>
      <line x1="115" y1="55" x2="155" y2="225" stroke="#94a3b8" stroke-width="0.3" opacity="0.3"/>
      <line x1="135" y1="55" x2="175" y2="225" stroke="#94a3b8" stroke-width="0.3" opacity="0.3"/>
      <line x1="155" y1="55" x2="185" y2="185" stroke="#94a3b8" stroke-width="0.3" opacity="0.3"/>
      <!-- Slot (2mm wide, 20mm deep - drawn proportionally) -->
      <rect x="109" y="50" width="22" height="150" fill="#1e293b" stroke="#f472b6" stroke-width="1.5"/>
      <!-- Dimension: width = 2mm -->
      <line x1="109" y1="42" x2="131" y2="42" stroke="#60a5fa" stroke-width="1"/>
      <line x1="109" y1="38" x2="109" y2="46" stroke="#60a5fa" stroke-width="1"/>
      <line x1="131" y1="38" x2="131" y2="46" stroke="#60a5fa" stroke-width="1"/>
      <text x="120" y="38" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">2mm</text>
      <!-- Dimension: depth = 20mm -->
      <line x1="195" y1="50" x2="195" y2="200" stroke="#60a5fa" stroke-width="1"/>
      <line x1="191" y1="50" x2="199" y2="50" stroke="#60a5fa" stroke-width="1"/>
      <line x1="191" y1="200" x2="199" y2="200" stroke="#60a5fa" stroke-width="1"/>
      <text x="210" y="130" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">20mm</text>
      <!-- End mill tool (showing deflection) -->
      <rect x="112" y="10" width="16" height="30" fill="#60a5fa" opacity="0.6" stroke="#60a5fa" stroke-width="1" rx="1"/>
      <text x="120" y="8" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">Tool</text>
      <!-- Deflected tool shape (exaggerated) -->
      <path d="M112 40 Q113 100 116 200" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="4,2" fill="none"/>
      <path d="M128 40 Q127 100 124 200" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="4,2" fill="none"/>
      <text x="140" y="120" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">Deflected</text>
      <text x="140" y="130" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">tool path</text>
      <!-- Problems list on right side -->
      <text x="250" y="60" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Problems:</text>
      <circle cx="255" cy="78" r="3" fill="#f472b6"/>
      <text x="265" y="82" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Tool deflection</text>
      <circle cx="255" cy="98" r="3" fill="#f472b6"/>
      <text x="265" y="102" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Poor chip evacuation</text>
      <circle cx="255" cy="118" r="3" fill="#f472b6"/>
      <text x="265" y="122" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Tool breakage risk</text>
      <circle cx="255" cy="138" r="3" fill="#f472b6"/>
      <text x="265" y="142" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Very slow cycle time</text>
      <!-- Solutions -->
      <text x="250" y="170" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Solutions:</text>
      <circle cx="255" cy="188" r="3" fill="#34d399"/>
      <text x="265" y="192" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Widen to 4mm (5:1)</text>
      <circle cx="255" cy="208" r="3" fill="#34d399"/>
      <text x="265" y="212" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Use wire EDM</text>
      <circle cx="255" cy="228" r="3" fill="#34d399"/>
      <text x="265" y="232" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Add bottom relief radius</text>
      <!-- Aspect ratio callout -->
      <rect x="245" y="245" width="145" height="25" fill="none" stroke="#fb923c" stroke-width="1.5" rx="4"/>
      <text x="317" y="262" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Aspect ratio: 10:1</text>
    </svg>`,
    sampleAnswer: 'That slot has a depth-to-width aspect ratio of 10:1, which is very challenging to machine. Issues include:\n\n1. Tool deflection: A 2mm end mill is extremely flexible. At 20mm depth, it will deflect significantly, causing taper and poor surface finish on the slot walls.\n\n2. Chip evacuation: Chips cannot escape a deep narrow slot easily, leading to re-cutting, heat buildup, and potential tool breakage.\n\n3. Tool breakage: The slender tool is prone to snapping, especially if there is any chatter or chip packing.\n\n4. Cycle time: Multiple light passes are needed, with pecking cycles for chip clearing, dramatically increasing machining time.\n\nRecommendations: (1) Widen the slot to at least 4mm if function allows (aspect ratio drops to 5:1, much more feasible). (2) Add a relief radius at the bottom if sharp corners are not required. (3) Consider wire EDM if the narrow width is truly required — it handles deep narrow slots easily regardless of aspect ratio. (4) If volume justifies it, broaching is another option for through-slots.',
    keyPoints: [
      'High aspect ratio (10:1) causes tool deflection and chip evacuation problems',
      'Tool breakage risk is high with a 2mm end mill at 20mm depth',
      'DFM recommendation: widen the slot or use wire EDM',
      'Bottom corner radius should match available tool geometry',
      'Cost increases dramatically with aspect ratio',
    ],
    explanation: 'DFM feedback is one of the most valuable skills a manufacturing engineer brings. Catching impractical features before they reach the shop floor saves time, money, and frustration.',
    interviewInsight: 'This tests practical manufacturing knowledge that only comes from shop-floor experience or strong DFM training. The interviewer wants to see that you can identify a problem, explain WHY it is a problem, and propose alternatives.',
    commonMistake: 'Saying "it can be machined" without flagging the cost and quality issues. Also, not knowing about wire EDM as an alternative for difficult slot geometries.',
    tags: ['DFM', 'machining', 'slot', 'aspect-ratio', 'tool-deflection', 'wire-EDM'],
  },

  // MFG-005 — Multiple Choice
  {
    id: 'mfg-005',
    type: 'multiple-choice',
    topic: 'manufacturing',
    subtopic: 'Additive Manufacturing',
    difficulty: 'intermediate',
    question: 'Which additive manufacturing process would you choose for a functional metal prototype that needs to survive fatigue testing?',
    diagram: `<svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="200" y="20" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">DMLS / SLM Process Schematic</text>
      <!-- Build chamber outline -->
      <rect x="40" y="80" width="320" height="170" fill="none" stroke="#94a3b8" stroke-width="1.5" rx="4" stroke-dasharray="6,3"/>
      <text x="200" y="72" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Build Chamber (Inert Atmosphere)</text>
      <!-- Powder bed -->
      <rect x="60" y="170" width="160" height="60" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Powder texture dots -->
      <circle cx="75" cy="185" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="85" cy="192" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="95" cy="180" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="105" cy="195" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="115" cy="183" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="125" cy="190" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="135" cy="178" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="145" cy="198" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="155" cy="186" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="165" cy="193" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="175" cy="182" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="185" cy="196" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="195" cy="188" r="1" fill="#94a3b8" opacity="0.5"/>
      <circle cx="205" cy="180" r="1" fill="#94a3b8" opacity="0.5"/>
      <text x="140" y="220" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Powder Bed</text>
      <!-- Built-up part (layers visible) -->
      <rect x="100" y="175" width="60" height="5" fill="#60a5fa" opacity="0.5" stroke="#60a5fa" stroke-width="0.5"/>
      <rect x="95" y="180" width="70" height="5" fill="#60a5fa" opacity="0.55" stroke="#60a5fa" stroke-width="0.5"/>
      <rect x="95" y="185" width="70" height="5" fill="#60a5fa" opacity="0.6" stroke="#60a5fa" stroke-width="0.5"/>
      <rect x="90" y="190" width="80" height="5" fill="#60a5fa" opacity="0.65" stroke="#60a5fa" stroke-width="0.5"/>
      <rect x="90" y="195" width="80" height="5" fill="#60a5fa" opacity="0.7" stroke="#60a5fa" stroke-width="0.5"/>
      <rect x="85" y="200" width="90" height="5" fill="#60a5fa" opacity="0.75" stroke="#60a5fa" stroke-width="0.5"/>
      <rect x="85" y="205" width="90" height="5" fill="#60a5fa" opacity="0.8" stroke="#60a5fa" stroke-width="0.5"/>
      <text x="60" y="198" text-anchor="end" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">Part</text>
      <text x="60" y="208" text-anchor="end" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">(layers)</text>
      <!-- Build platform -->
      <rect x="60" y="210" width="160" height="15" fill="#94a3b8" opacity="0.3" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="140" y="240" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Build Platform (lowers each layer)</text>
      <!-- Downward arrow under platform -->
      <line x1="140" y1="243" x2="140" y2="252" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#mfg005-arr)"/>
      <defs><marker id="mfg005-arr" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5" fill="#94a3b8"/></marker></defs>
      <!-- Laser source -->
      <rect x="230" y="85" width="50" height="25" fill="#334155" stroke="#f472b6" stroke-width="1.5" rx="3"/>
      <text x="255" y="101" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">Laser</text>
      <!-- Scanning mirror -->
      <ellipse cx="300" cy="120" rx="15" ry="8" fill="#334155" stroke="#fb923c" stroke-width="1.5" transform="rotate(-30,300,120)"/>
      <text x="325" y="118" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Scanning</text>
      <text x="325" y="128" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Mirror</text>
      <!-- Laser beam from source to mirror -->
      <line x1="270" y1="110" x2="290" y2="118" stroke="#f472b6" stroke-width="2" opacity="0.8"/>
      <!-- Laser beam from mirror to powder -->
      <line x1="300" y1="125" x2="130" y2="175" stroke="#f472b6" stroke-width="2" opacity="0.6"/>
      <!-- Melt pool glow -->
      <circle cx="130" cy="175" r="6" fill="#f472b6" opacity="0.4"/>
      <circle cx="130" cy="175" r="3" fill="#f472b6" opacity="0.7"/>
      <!-- Recoater -->
      <rect x="230" y="168" width="40" height="8" fill="#34d399" opacity="0.6" stroke="#34d399" stroke-width="1" rx="2"/>
      <line x1="250" y1="163" x2="225" y2="163" stroke="#34d399" stroke-width="1" marker-end="url(#mfg005-arr2)"/>
      <defs><marker id="mfg005-arr2" markerWidth="6" markerHeight="5" refX="0" refY="2.5" orient="auto"><path d="M6,0 L0,2.5 L6,5" fill="#34d399"/></marker></defs>
      <text x="270" y="162" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">Recoater</text>
      <!-- Powder supply -->
      <rect x="280" y="170" width="60" height="60" fill="#334155" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,2"/>
      <text x="310" y="205" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Powder</text>
      <text x="310" y="215" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Supply</text>
      <!-- Key property callout -->
      <text x="200" y="268" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Fully dense metal | Near-wrought properties | Fatigue-capable</text>
    </svg>`,
    options: [
      { id: 'a', text: 'FDM with a metal-filled PLA filament' },
      { id: 'b', text: 'SLA with a castable resin followed by investment casting' },
      { id: 'c', text: 'Direct Metal Laser Sintering (DMLS) / Selective Laser Melting (SLM)' },
      { id: 'd', text: 'Binder Jetting with bronze infiltration' },
    ],
    correctAnswer: 'c',
    explanation: 'DMLS/SLM produces fully dense metal parts by melting metal powder layer-by-layer with a laser. The resulting parts have mechanical properties approaching wrought material (especially after HIP treatment). FDM metal-filled filament is not structural metal — it is plastic with metal particles. SLA + investment casting would work but adds lead time and cost. Binder Jetting with bronze infiltration produces parts with lower density and inferior mechanical properties compared to wrought metal, making them unsuitable for fatigue testing.',
    interviewInsight: 'Knowing the capabilities and limitations of different AM processes is increasingly important. The interviewer wants to see that you can match the process to the functional requirement.',
    realWorldConnection: 'DMLS is used for flight-qualified aerospace components (GE LEAP fuel nozzles), medical implants, and Formula 1 parts where complex geometry and full density are both required.',
    commonMistake: 'Thinking any "metal 3D printing" process produces fully dense, structural parts. FDM with metal-filled filament and binder jetting produce parts that look metallic but have inferior mechanical properties.',
    tags: ['additive-manufacturing', 'DMLS', 'SLM', 'metal-3D-printing', 'fatigue', 'prototype'],
  },

  // MFG-006 — Spot the Flaw
  {
    id: 'mfg-006',
    type: 'spot-the-flaw',
    topic: 'manufacturing',
    subtopic: 'Metal Forming',
    difficulty: 'intermediate',
    question: 'Spot the flaw in this manufacturing plan:',
    diagram: `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="200" y="20" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Sheet Metal Bending: Springback Comparison</text>
      <!-- LEFT: Mild Steel -->
      <text x="110" y="50" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Mild Steel</text>
      <!-- Die V-block left -->
      <path d="M30 200 L80 140 L80 200 Z" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <path d="M190 200 L140 140 L140 200 Z" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Sheet in die (bent) - mild steel, small springback -->
      <path d="M40 120 L110 175 L180 120" fill="none" stroke="#60a5fa" stroke-width="3"/>
      <!-- Desired 90° shown dashed -->
      <path d="M40 115 L110 180 L180 115" fill="none" stroke="#60a5fa" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
      <!-- Bend radius annotation -->
      <text x="110" y="196" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">R = 1t (min)</text>
      <!-- Springback annotation -->
      <path d="M170 120 Q175 115 180 120" fill="none" stroke="#34d399" stroke-width="1"/>
      <text x="175" y="110" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">~2° spring</text>
      <!-- RIGHT: Stainless Steel -->
      <text x="310" y="50" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Stainless Steel</text>
      <!-- Die V-block right -->
      <path d="M230 200 L280 140 L280 200 Z" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <path d="M390 200 L340 140 L340 200 Z" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Sheet in die (bent) - stainless steel, MORE springback -->
      <path d="M235 108 L310 170 L385 108" fill="none" stroke="#f472b6" stroke-width="3"/>
      <!-- Desired 90° shown dashed -->
      <path d="M240 115 L310 180 L380 115" fill="none" stroke="#f472b6" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
      <!-- Bend radius annotation -->
      <text x="310" y="196" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">R = 1.5-2t (min)</text>
      <!-- Springback annotation - larger -->
      <path d="M370 108 Q380 98 385 108" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <text x="375" y="96" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">~5° spring!</text>
      <!-- Crack warning on too-tight bend -->
      <text x="310" y="214" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Crack risk at R = 1t!</text>
      <!-- Bottom comparison table -->
      <line x1="40" y1="230" x2="380" y2="230" stroke="#94a3b8" stroke-width="0.5"/>
      <text x="120" y="248" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Property</text>
      <text x="250" y="248" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">Mild Steel</text>
      <text x="350" y="248" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">Stainless</text>
      <line x1="40" y1="253" x2="380" y2="253" stroke="#94a3b8" stroke-width="0.5"/>
      <text x="120" y="268" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Min bend radius</text>
      <text x="250" y="268" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">0.5-1t</text>
      <text x="350" y="268" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">1.5-2t</text>
      <text x="120" y="285" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Springback</text>
      <text x="250" y="285" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">~2°</text>
      <text x="350" y="285" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">~3-5°</text>
      <text x="120" y="298" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Work hardening</text>
      <text x="250" y="298" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">Low</text>
      <text x="350" y="298" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">High</text>
    </svg>`,
    statement: 'To make 100,000 stainless steel brackets per year, we will laser-cut the flat blanks from sheet metal and then cold-form them in a press brake to create 90-degree bends. Since stainless steel is ductile, we can use the same bend radius as mild steel — one material thickness minimum.',
    flaw: {
      text: 'Since stainless steel is ductile, we can use the same bend radius as mild steel — one material thickness minimum.',
      flawIndex: 2,
      flawExplanation: 'Stainless steel work-hardens much more aggressively than mild steel and has higher springback. The minimum bend radius for stainless steel is typically 1.5-2× material thickness, compared to 0.5-1× for mild steel. Using too tight a radius will cause cracking on the outer surface of the bend. Additionally, the greater springback means you need to overbend by several degrees to achieve a 90° final angle.',
    },
    correctedStatement: 'Stainless steel requires a larger minimum bend radius (1.5-2× thickness) than mild steel due to its higher work-hardening rate and greater springback. The press brake must also compensate for this springback (typically 3-5° overbend for 90° final angle).',
    explanation: 'Stainless steel\'s work-hardening behavior is one of its defining characteristics. While it provides good formability overall, the higher flow stress and springback must be accounted for in bend tooling and process setup.',
    interviewInsight: 'This tests whether you know the practical differences between forming mild steel and stainless steel. It is a very common manufacturing engineering interview topic.',
    commonMistake: 'Assuming all "ductile metals" form the same way. Stainless steel, aluminum, and mild steel all have different minimum bend radii and springback characteristics.',
    tags: ['bending', 'stainless-steel', 'springback', 'work-hardening', 'press-brake', 'DFM'],
  },

  // MFG-007 — Ranking
  {
    id: 'mfg-007',
    type: 'ranking',
    topic: 'manufacturing',
    subtopic: 'Casting & Molding',
    difficulty: 'intermediate',
    question: 'Rank these manufacturing processes by typical dimensional tolerance capability (tightest first):',
    diagram: `<svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="200" y="20" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Tolerance Capability by Process</text>
      <!-- Axis -->
      <line x1="160" y1="40" x2="160" y2="250" stroke="#94a3b8" stroke-width="1"/>
      <line x1="160" y1="250" x2="390" y2="250" stroke="#94a3b8" stroke-width="1"/>
      <!-- X-axis label -->
      <text x="275" y="272" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Typical Tolerance Range (mm)</text>
      <!-- X-axis ticks -->
      <text x="165" y="263" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">0</text>
      <line x1="210" y1="248" x2="210" y2="253" stroke="#94a3b8" stroke-width="0.5"/>
      <text x="210" y="263" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">±0.1</text>
      <line x1="260" y1="248" x2="260" y2="253" stroke="#94a3b8" stroke-width="0.5"/>
      <text x="260" y="263" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">±0.3</text>
      <line x1="310" y1="248" x2="310" y2="253" stroke="#94a3b8" stroke-width="0.5"/>
      <text x="310" y="263" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">±0.5</text>
      <line x1="360" y1="248" x2="360" y2="253" stroke="#94a3b8" stroke-width="0.5"/>
      <text x="360" y="263" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">±1.0</text>
      <!-- Row 1: CNC Machining - tightest -->
      <text x="155" y="65" text-anchor="end" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">CNC Milling</text>
      <rect x="160" y="52" width="30" height="18" fill="#34d399" opacity="0.7" rx="2"/>
      <text x="195" y="65" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">±0.01-0.05</text>
      <text x="50" y="65" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">1st</text>
      <!-- Row 2: Injection Molding -->
      <text x="155" y="105" text-anchor="end" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Injection Molding</text>
      <rect x="160" y="92" width="70" height="18" fill="#60a5fa" opacity="0.7" rx="2"/>
      <text x="235" y="105" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">±0.05-0.2</text>
      <text x="50" y="105" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">2nd</text>
      <!-- Row 3: Die Casting -->
      <text x="155" y="145" text-anchor="end" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Die Casting</text>
      <rect x="160" y="132" width="120" height="18" fill="#f472b6" opacity="0.7" rx="2"/>
      <text x="285" y="145" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">±0.1-0.3</text>
      <text x="50" y="145" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">3rd</text>
      <!-- Row 4: Stamping -->
      <text x="155" y="185" text-anchor="end" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Stamping</text>
      <rect x="160" y="172" width="160" height="18" fill="#fb923c" opacity="0.7" rx="2"/>
      <text x="325" y="185" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">±0.1-0.5</text>
      <text x="50" y="185" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">4th</text>
      <!-- Row 5: Sand Casting - loosest -->
      <text x="155" y="225" text-anchor="end" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Sand Casting</text>
      <rect x="160" y="212" width="220" height="18" fill="#94a3b8" opacity="0.5" rx="2"/>
      <text x="385" y="225" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">±0.5-2.0</text>
      <text x="50" y="225" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">5th</text>
    </svg>`,
    items: [
      { id: 'a', text: 'CNC machining (milling)' },
      { id: 'b', text: 'Sand casting' },
      { id: 'c', text: 'Injection molding (plastic)' },
      { id: 'd', text: 'Die casting (aluminum)' },
      { id: 'e', text: 'Sheet metal stamping' },
    ],
    correctOrder: ['a', 'c', 'd', 'e', 'b'],
    explanation: 'CNC machining: ±0.01-0.05mm. Injection molding: ±0.05-0.2mm (mold is machined precisely and plastic fills it faithfully). Die casting: ±0.1-0.3mm. Sheet metal stamping: ±0.1-0.5mm (depends on die quality and material). Sand casting: ±0.5-2.0mm (mold accuracy is limited by sand grain size and pattern wear).',
    interviewInsight: 'Knowing the tolerance capabilities of different processes helps you design parts that are manufacturable without excessive secondary operations. This is fundamental DFM knowledge.',
    realWorldConnection: 'Specifying a ±0.05mm tolerance on a sand casting forces unnecessary machining. Matching tolerances to process capability reduces cost and lead time.',
    commonMistake: 'Not knowing that injection molding can achieve very tight tolerances — many engineers assume "plastic = loose tolerance." A well-made injection mold can hold ±0.05mm.',
    tags: ['tolerance', 'process-capability', 'CNC', 'casting', 'injection-molding', 'stamping'],
  },

  // MFG-008 — Multiple Choice
  {
    id: 'mfg-008',
    type: 'multiple-choice',
    topic: 'manufacturing',
    subtopic: 'Welding & Joining',
    difficulty: 'beginner',
    question: 'You need to weld thin (1.5mm) aluminum sheet for a lightweight enclosure. Which welding process is most appropriate?',
    diagram: `<svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="200" y="20" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">TIG Welding (GTAW) — Thin Aluminum</text>
      <!-- Workpiece / aluminum sheets -->
      <rect x="40" y="180" width="140" height="12" fill="#60a5fa" opacity="0.4" stroke="#60a5fa" stroke-width="1.5" rx="1"/>
      <rect x="220" y="180" width="140" height="12" fill="#60a5fa" opacity="0.4" stroke="#60a5fa" stroke-width="1.5" rx="1"/>
      <text x="110" y="210" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">Aluminum 1.5mm</text>
      <text x="290" y="210" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">Aluminum 1.5mm</text>
      <!-- Joint gap -->
      <rect x="180" y="176" width="40" height="20" fill="#f472b6" opacity="0.2" stroke="none"/>
      <!-- Weld pool -->
      <ellipse cx="200" cy="185" rx="18" ry="8" fill="#f472b6" opacity="0.5" stroke="#f472b6" stroke-width="1"/>
      <text x="200" y="230" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">Weld Pool</text>
      <!-- TIG torch body -->
      <rect x="188" y="80" width="24" height="60" fill="#334155" stroke="#94a3b8" stroke-width="1.5" rx="4"/>
      <text x="200" y="75" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">TIG Torch</text>
      <!-- Tungsten electrode -->
      <path d="M197 140 L200 175 L203 140" fill="#fb923c" stroke="#fb923c" stroke-width="1"/>
      <text x="230" y="155" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Tungsten</text>
      <text x="230" y="165" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Electrode</text>
      <!-- Arc -->
      <path d="M200 172 Q195 178 200 185 Q205 178 200 172" fill="#f472b6" opacity="0.6" stroke="#f472b6" stroke-width="1"/>
      <!-- Shielding gas cone -->
      <path d="M185 140 L175 185 M215 140 L225 185" stroke="#34d399" stroke-width="1" stroke-dasharray="3,2" opacity="0.6"/>
      <text x="155" y="168" text-anchor="end" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">Argon</text>
      <text x="155" y="178" text-anchor="end" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">Shield</text>
      <!-- Filler rod (separate) -->
      <line x1="150" y1="100" x2="185" y2="178" stroke="#e2e8f0" stroke-width="2.5" stroke-linecap="round"/>
      <text x="130" y="100" text-anchor="end" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Filler Rod</text>
      <text x="130" y="110" text-anchor="end" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">(Al alloy)</text>
      <!-- AC waveform indicator -->
      <rect x="270" y="80" width="110" height="50" fill="none" stroke="#94a3b8" stroke-width="1" rx="3"/>
      <text x="325" y="95" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">AC Current</text>
      <!-- AC sine wave -->
      <path d="M280 113 Q290 98 300 113 Q310 128 320 113 Q330 98 340 113 Q350 128 360 113" fill="none" stroke="#f472b6" stroke-width="1.5"/>
      <!-- EP/EN labels -->
      <text x="290" y="100" fill="#34d399" font-family="system-ui, sans-serif" font-size="7">EP: oxide</text>
      <text x="290" y="107" fill="#34d399" font-family="system-ui, sans-serif" font-size="7">cleaning</text>
      <text x="330" y="128" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="7">EN: deep</text>
      <text x="330" y="135" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="7">penetration</text>
      <!-- Key advantages box -->
      <rect x="50" y="240" width="300" height="35" fill="none" stroke="#34d399" stroke-width="1" rx="4" stroke-dasharray="4,2"/>
      <text x="200" y="255" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">AC breaks Al\u2082O\u2083 oxide layer (EP half-cycle)</text>
      <text x="200" y="268" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Precise heat control for thin sheet</text>
    </svg>`,
    options: [
      { id: 'a', text: 'Shielded Metal Arc Welding (SMAW / stick welding)' },
      { id: 'b', text: 'TIG welding (GTAW) with AC current and argon shielding' },
      { id: 'c', text: 'Oxy-acetylene gas welding' },
      { id: 'd', text: 'Submerged arc welding (SAW)' },
    ],
    correctAnswer: 'b',
    explanation: 'TIG (GTAW) with AC current is the standard process for thin aluminum. AC current is required because it breaks up the tenacious aluminum oxide layer during the electrode-positive half-cycle while providing penetration during the electrode-negative half-cycle. Argon shielding prevents oxidation. TIG provides precise heat input control essential for thin material. SMAW is impractical for thin aluminum and produces poor-quality results. Oxy-acetylene provides too little heat control for thin sheet. SAW is for thick plate only.',
    interviewInsight: 'This is a basic joining knowledge question. Every mechanical engineer should know which welding process suits which application. The AC requirement for aluminum TIG welding is a common interview detail.',
    realWorldConnection: 'This is how aluminum boat hulls, aircraft skins, and electronic enclosures are welded. The aerospace industry relies heavily on TIG welding for aluminum and titanium.',
    commonMistake: 'Suggesting MIG (GMAW) — which does work for aluminum but is harder to control on thin sheet and produces more spatter. TIG is preferred for thin, high-quality work.',
    tags: ['TIG', 'aluminum', 'welding', 'GTAW', 'thin-sheet', 'AC-welding'],
  },
];
