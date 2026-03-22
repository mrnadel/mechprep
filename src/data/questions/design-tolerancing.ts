import type { Question } from '../types';

export const designTolerancingQuestions: Question[] = [
  // DT-001 — Multiple Choice
  {
    id: 'dt-001',
    type: 'multiple-choice',
    topic: 'design-tolerancing',
    subtopic: 'GD&T Fundamentals',
    difficulty: 'beginner',
    question: 'On a GD&T drawing, a position tolerance of ⌀0.25 is specified at MMC for a hole. The hole\'s actual size is 0.5 mm larger than its MMC size. What is the total allowable positional tolerance?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Part cross-section -->
  <rect x="50" y="40" width="300" height="120" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Hole -->
  <ellipse cx="200" cy="100" rx="30" ry="30" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
  <!-- Hole centerlines -->
  <line x1="200" y1="60" x2="200" y2="140" stroke="#60a5fa" stroke-width="0.8" stroke-dasharray="6,3"/>
  <line x1="160" y1="100" x2="240" y2="100" stroke="#60a5fa" stroke-width="0.8" stroke-dasharray="6,3"/>
  <!-- MMC tolerance zone (inner circle) -->
  <circle cx="200" cy="100" r="12" fill="none" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Total tolerance zone (outer circle) -->
  <circle cx="200" cy="100" r="18" fill="none" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- Feature control frame -->
  <rect x="80" y="180" width="240" height="28" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="130" y1="180" x2="130" y2="208" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="210" y1="180" x2="210" y2="208" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="260" y1="180" x2="260" y2="208" stroke="#e2e8f0" stroke-width="1.5"/>
  <!-- Position symbol (crosshair in circle) -->
  <circle cx="105" cy="194" r="8" fill="none" stroke="#e2e8f0" stroke-width="1.2"/>
  <line x1="105" y1="184" x2="105" y2="204" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="95" y1="194" x2="115" y2="194" stroke="#e2e8f0" stroke-width="1"/>
  <text x="170" y="199" text-anchor="middle" fill="#e2e8f0" font-size="12">⌀0.25</text>
  <text x="235" y="199" text-anchor="middle" fill="#e2e8f0" font-size="11">M</text>
  <text x="280" y="199" text-anchor="middle" fill="#e2e8f0" font-size="11">A</text>
  <!-- Labels -->
  <text x="138" y="90" fill="#f472b6" font-size="11">⌀0.25 at MMC</text>
  <text x="138" y="125" fill="#34d399" font-size="11">⌀0.75 total</text>
  <text x="200" y="250" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="bold">Bonus tolerance = 0.50 (departure from MMC)</text>
  <!-- Arrow from inner to outer -->
  <line x1="213" y1="100" x2="217" y2="100" stroke="#fb923c" stroke-width="1.5"/>
  <text x="230" y="104" fill="#fb923c" font-size="10">+0.50 bonus</text>
</svg>`,
    options: [
      { id: 'a', text: '⌀0.25 — the tolerance is fixed regardless of actual size' },
      { id: 'b', text: '⌀0.75 — bonus tolerance equals the departure from MMC' },
      { id: 'c', text: '⌀0.50 — bonus tolerance is twice the departure from MMC' },
      { id: 'd', text: '⌀0.125 — tolerance shrinks at larger sizes' },
    ],
    correctAnswer: 'b',
    explanation: 'At MMC (Maximum Material Condition), the positional tolerance is the stated value: ⌀0.25. When the hole is produced larger than MMC, bonus tolerance is gained. Bonus = actual size - MMC size = 0.5 mm. Total positional tolerance = 0.25 + 0.50 = ⌀0.75. This "bonus tolerance" concept exists because a larger hole is easier to assemble even if its position shifts — the function (pin fits in hole) is still guaranteed.',
    interviewInsight: 'Bonus tolerance / MMC is one of the most commonly asked GD&T topics. If you do not understand MMC and bonus tolerance, you cannot read or create functional GD&T drawings.',
    realWorldConnection: 'This directly affects inspection — a hole that is at the large end of its size tolerance is allowed more positional deviation. This reduces scrap rates while still guaranteeing assembly.',
    commonMistake: 'Thinking the tolerance is always fixed at ⌀0.25 regardless of actual size (this would be RFS — Regardless of Feature Size). MMC explicitly allows bonus tolerance.',
    tags: ['GD&T', 'MMC', 'bonus-tolerance', 'position', 'hole', 'tolerance'],
  },

  // DT-002 — Estimation
  {
    id: 'dt-002',
    type: 'estimation',
    topic: 'design-tolerancing',
    subtopic: 'Tolerance Stack-Up',
    difficulty: 'advanced',
    question: 'Three parts are stacked in series. Each has a dimension of 25.0 ± 0.1 mm. Estimate the total assembly dimension and tolerance using both worst-case and RSS methods.',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Three stacked parts -->
  <rect x="40" y="60" width="95" height="80" rx="2" fill="#334155" stroke="#60a5fa" stroke-width="1.5"/>
  <rect x="145" y="60" width="95" height="80" rx="2" fill="#334155" stroke="#f472b6" stroke-width="1.5"/>
  <rect x="250" y="60" width="95" height="80" rx="2" fill="#334155" stroke="#34d399" stroke-width="1.5"/>
  <!-- Part labels -->
  <text x="87" y="105" text-anchor="middle" fill="#60a5fa" font-size="12" font-weight="bold">Part 1</text>
  <text x="192" y="105" text-anchor="middle" fill="#f472b6" font-size="12" font-weight="bold">Part 2</text>
  <text x="297" y="105" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">Part 3</text>
  <!-- Dimension lines per part -->
  <line x1="40" y1="52" x2="40" y2="45" stroke="#94a3b8" stroke-width="1"/>
  <line x1="135" y1="52" x2="135" y2="45" stroke="#94a3b8" stroke-width="1"/>
  <line x1="40" y1="48" x2="135" y2="48" stroke="#94a3b8" stroke-width="1"/>
  <text x="87" y="44" text-anchor="middle" fill="#e2e8f0" font-size="10">25.0 ± 0.1</text>
  <line x1="145" y1="52" x2="145" y2="45" stroke="#94a3b8" stroke-width="1"/>
  <line x1="240" y1="52" x2="240" y2="45" stroke="#94a3b8" stroke-width="1"/>
  <line x1="145" y1="48" x2="240" y2="48" stroke="#94a3b8" stroke-width="1"/>
  <text x="192" y="44" text-anchor="middle" fill="#e2e8f0" font-size="10">25.0 ± 0.1</text>
  <line x1="250" y1="52" x2="250" y2="45" stroke="#94a3b8" stroke-width="1"/>
  <line x1="345" y1="52" x2="345" y2="45" stroke="#94a3b8" stroke-width="1"/>
  <line x1="250" y1="48" x2="345" y2="48" stroke="#94a3b8" stroke-width="1"/>
  <text x="297" y="44" text-anchor="middle" fill="#e2e8f0" font-size="10">25.0 ± 0.1</text>
  <!-- Total dimension line -->
  <line x1="40" y1="150" x2="40" y2="165" stroke="#94a3b8" stroke-width="1"/>
  <line x1="345" y1="150" x2="345" y2="165" stroke="#94a3b8" stroke-width="1"/>
  <line x1="40" y1="160" x2="345" y2="160" stroke="#fb923c" stroke-width="1.5"/>
  <polygon points="40,157 40,163 48,160" fill="#fb923c"/>
  <polygon points="345,157 345,163 337,160" fill="#fb923c"/>
  <text x="192" y="177" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold">75.0 mm nominal</text>
  <!-- Worst-case band -->
  <rect x="40" y="195" width="160" height="28" rx="3" fill="none" stroke="#f472b6" stroke-width="1.5"/>
  <text x="120" y="213" text-anchor="middle" fill="#f472b6" font-size="11">Worst-case: ± 0.3 mm</text>
  <!-- RSS band -->
  <rect x="210" y="195" width="160" height="28" rx="3" fill="none" stroke="#34d399" stroke-width="1.5"/>
  <text x="290" y="213" text-anchor="middle" fill="#34d399" font-size="11">RSS: ± 0.173 mm</text>
  <!-- Comparison bar -->
  <text x="200" y="250" text-anchor="middle" fill="#e2e8f0" font-size="11">RSS is 42% tighter than worst-case</text>
  <!-- Arrow showing stack direction -->
  <line x1="40" y1="30" x2="345" y2="30" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
  <polygon points="345,27 345,33 353,30" fill="#94a3b8"/>
  <text x="192" y="25" text-anchor="middle" fill="#94a3b8" font-size="10">Stack direction</text>
</svg>`,
    hints: [
      'Worst-case: all tolerances add up directly',
      'RSS: tolerances add in quadrature (root sum of squares)',
      'Compare the two results to see the cost-quality tradeoff',
    ],
    acceptableRange: { low: 74.7, high: 75.3, unit: 'mm total (WC range)', bestEstimate: 75.0 },
    approachSteps: [
      'Nominal total = 3 × 25.0 = 75.0 mm',
      'Worst-case tolerance = ±(0.1 + 0.1 + 0.1) = ±0.3 mm → range: 74.7 to 75.3 mm',
      'RSS tolerance = ±√(0.1² + 0.1² + 0.1²) = ±√(0.03) = ±0.173 mm → range: 74.827 to 75.173 mm',
      'RSS is 42% tighter than worst-case, reflecting statistical reality',
      'Use worst-case when failure is catastrophic (safety-critical assemblies)',
      'Use RSS when statistical quality is acceptable (consumer products, high-volume)',
    ],
    explanation: 'Worst-case analysis guarantees 100% assembly success but requires tighter individual tolerances (more expensive). RSS assumes tolerances follow normal distributions and rarely all stack in the same direction — it gives ~99.73% (3σ) success rate with looser individual tolerances.',
    interviewInsight: 'Tolerance stack-up is a core design engineering skill. The worst-case vs. RSS decision is a cost-quality tradeoff that comes up in every product design interview.',
    commonMistake: 'Using worst-case for everything (too conservative, drives cost up). Or using RSS without understanding that it allows a small percentage of assemblies to fall outside the tolerance.',
    tags: ['tolerance-stack', 'worst-case', 'RSS', 'statistical', 'assembly', 'dimension'],
  },

  // DT-003 — Free Text / Explanation
  {
    id: 'dt-003',
    type: 'explanation',
    topic: 'design-tolerancing',
    subtopic: 'Fits & Limits',
    difficulty: 'intermediate',
    question: 'A design calls for a bearing pressed into a housing (interference fit) and a shaft that slides into the bearing inner race (clearance fit). Explain how you specify these fits and why.',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Housing outer -->
  <rect x="100" y="40" width="200" height="220" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="200" y="30" text-anchor="middle" fill="#94a3b8" font-size="12">Housing</text>
  <!-- Bearing outer race -->
  <circle cx="200" cy="150" r="70" fill="#1e293b" stroke="#f472b6" stroke-width="2.5"/>
  <!-- Bearing inner race -->
  <circle cx="200" cy="150" r="45" fill="#1e293b" stroke="#f472b6" stroke-width="2.5"/>
  <!-- Rolling elements suggestion -->
  <circle cx="200" cy="93" r="6" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="243" cy="107" r="6" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="257" cy="150" r="6" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="243" cy="193" r="6" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="200" cy="207" r="6" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="157" cy="193" r="6" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="143" cy="150" r="6" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <circle cx="157" cy="107" r="6" fill="none" stroke="#94a3b8" stroke-width="1"/>
  <!-- Shaft -->
  <circle cx="200" cy="150" r="28" fill="#475569" stroke="#60a5fa" stroke-width="2"/>
  <!-- Interference fit indicator (housing-to-bearing OD) -->
  <line x1="270" y1="95" x2="270" y2="80" stroke="#fb923c" stroke-width="1"/>
  <line x1="270" y1="80" x2="285" y2="80" stroke="#fb923c" stroke-width="1"/>
  <text x="290" y="75" fill="#fb923c" font-size="10" font-weight="bold">Interference fit</text>
  <text x="290" y="88" fill="#fb923c" font-size="10">H7/p6</text>
  <!-- Clearance fit indicator (shaft-to-bearing ID) -->
  <line x1="175" y1="135" x2="130" y2="120" stroke="#34d399" stroke-width="1"/>
  <text x="40" y="117" fill="#34d399" font-size="10" font-weight="bold">Clearance/transition</text>
  <text x="40" y="130" fill="#34d399" font-size="10">k5/H7 or m5/H7</text>
  <!-- Labels -->
  <text x="200" y="155" text-anchor="middle" fill="#60a5fa" font-size="11" font-weight="bold">Shaft</text>
  <text x="200" y="230" text-anchor="middle" fill="#f472b6" font-size="11">Bearing</text>
  <!-- Key rule -->
  <text x="200" y="280" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold">Rule: loaded race gets the tighter fit</text>
</svg>`,
    sampleAnswer: 'The bearing outer race-to-housing interface is an interference fit because the bearing must not rotate or move within the housing during operation. A typical specification is H7/p6 (ISO system): the housing bore is H7 (hole basis, tolerance just above nominal) and the bearing OD is p6 (shaft basis, tolerance above nominal, creating interference). The interference is typically 0.005-0.025 mm, requiring the bearing to be pressed in or the housing heated for thermal installation.\n\nThe shaft-to-bearing inner race interface is a clearance or transition fit. For a rotating shaft, the inner race typically rotates with the shaft and is specified as k5/H7 or m5/H7 (slight interference to light press fit). However, if the inner race is stationary and the shaft rotates relative to it, a looser fit (g6/H7) may be acceptable.\n\nThe rationale: tight fits prevent fretting (micro-motion wear) between the bearing race and housing/shaft. The loaded race must ALWAYS be interference fit to prevent creep.',
    keyPoints: [
      'Interference fit (H7/p6) for bearing OD in housing — prevents creep and fretting',
      'Transition or light interference fit (k5 or m5 on shaft) for bearing ID on shaft',
      'The loaded race gets the tighter fit',
      'ISO hole-basis system (H) is standard for bearing housings',
      'Excessive interference can distort the bearing race and reduce clearance',
    ],
    explanation: 'Bearing fit specification is one of the most practical applications of the ISO fits and limits system. Every bearing catalog includes recommended fits based on load direction, magnitude, and operating conditions.',
    interviewInsight: 'This is asked in every machine design interview. It tests whether you understand the ISO fit system AND the practical reasoning behind bearing installation fits.',
    commonMistake: 'Specifying clearance on both the inner and outer race — the bearing would spin in the housing. Also, excessive interference that distorts the bearing race.',
    tags: ['fits', 'bearing', 'interference', 'clearance', 'ISO-tolerance', 'H7', 'housing'],
  },

  // DT-004 — Multiple Choice
  {
    id: 'dt-004',
    type: 'multiple-choice',
    topic: 'design-tolerancing',
    subtopic: 'GD&T Fundamentals',
    difficulty: 'intermediate',
    question: 'What is the difference between parallelism and flatness in GD&T?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Flatness (left side) -->
  <text x="100" y="25" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold">Flatness</text>
  <text x="100" y="40" text-anchor="middle" fill="#94a3b8" font-size="10">(Form — no datum)</text>
  <!-- Wavy surface -->
  <path d="M 20 100 Q 40 85 60 95 T 100 90 T 140 100 T 180 95" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  <!-- Tolerance zone bands -->
  <line x1="20" y1="80" x2="180" y2="80" stroke="#60a5fa" stroke-width="1.2" stroke-dasharray="5,3"/>
  <line x1="20" y1="110" x2="180" y2="110" stroke="#60a5fa" stroke-width="1.2" stroke-dasharray="5,3"/>
  <!-- Tolerance zone label -->
  <line x1="185" y1="80" x2="195" y2="80" stroke="#60a5fa" stroke-width="0.8"/>
  <line x1="185" y1="110" x2="195" y2="110" stroke="#60a5fa" stroke-width="0.8"/>
  <line x1="190" y1="80" x2="190" y2="110" stroke="#60a5fa" stroke-width="0.8"/>
  <text x="198" y="99" fill="#60a5fa" font-size="10">0.05</text>
  <!-- Flatness FCF -->
  <rect x="45" y="120" width="110" height="22" fill="none" stroke="#e2e8f0" stroke-width="1.2"/>
  <line x1="85" y1="120" x2="85" y2="142" stroke="#e2e8f0" stroke-width="1.2"/>
  <line x1="55" y1="131" x2="75" y2="131" stroke="#e2e8f0" stroke-width="1.2"/>
  <text x="65" y="135" text-anchor="middle" fill="#e2e8f0" font-size="11">⏥</text>
  <text x="120" y="136" text-anchor="middle" fill="#e2e8f0" font-size="11">0.05</text>

  <!-- Parallelism (right side) -->
  <text x="310" y="25" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold">Parallelism</text>
  <text x="310" y="40" text-anchor="middle" fill="#94a3b8" font-size="10">(Orientation — needs datum)</text>
  <!-- Datum surface A -->
  <line x1="230" y1="115" x2="390" y2="115" stroke="#e2e8f0" stroke-width="2.5"/>
  <!-- Datum A triangle -->
  <polygon points="240,115 236,125 244,125" fill="#e2e8f0"/>
  <text x="240" y="137" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold">A</text>
  <!-- Target surface (wavy, roughly parallel) -->
  <path d="M 230 70 Q 260 63 290 68 T 350 65 T 390 70" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  <!-- Parallelism tolerance zone (parallel to datum) -->
  <line x1="230" y1="58" x2="390" y2="58" stroke="#34d399" stroke-width="1.2" stroke-dasharray="5,3"/>
  <line x1="230" y1="78" x2="390" y2="78" stroke="#34d399" stroke-width="1.2" stroke-dasharray="5,3"/>
  <!-- Zone label -->
  <line x1="224" y1="58" x2="224" y2="78" stroke="#34d399" stroke-width="0.8"/>
  <text x="218" y="72" text-anchor="end" fill="#34d399" font-size="10">0.05</text>
  <!-- Parallelism arrow to datum -->
  <line x1="350" y1="78" x2="350" y2="115" stroke="#94a3b8" stroke-width="0.8" stroke-dasharray="3,3"/>
  <text x="365" y="98" fill="#94a3b8" font-size="9">// to A</text>
  <!-- Parallelism FCF -->
  <rect x="255" y="120" width="115" height="22" fill="none" stroke="#e2e8f0" stroke-width="1.2"/>
  <line x1="290" y1="120" x2="290" y2="142" stroke="#e2e8f0" stroke-width="1.2"/>
  <line x1="350" y1="120" x2="350" y2="142" stroke="#e2e8f0" stroke-width="1.2"/>
  <text x="273" y="136" text-anchor="middle" fill="#e2e8f0" font-size="11">//</text>
  <text x="320" y="136" text-anchor="middle" fill="#e2e8f0" font-size="11">0.05</text>
  <text x="368" y="136" text-anchor="middle" fill="#e2e8f0" font-size="11">A</text>

  <!-- Hierarchy arrow -->
  <text x="200" y="180" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="bold">GD&T Hierarchy</text>
  <!-- Form -> Orientation -> Location -->
  <rect x="50" y="195" width="80" height="24" rx="4" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="90" y="211" text-anchor="middle" fill="#60a5fa" font-size="11">Form</text>
  <line x1="130" y1="207" x2="155" y2="207" stroke="#94a3b8" stroke-width="1.2"/>
  <polygon points="155,204 155,210 162,207" fill="#94a3b8"/>
  <rect x="163" y="195" width="90" height="24" rx="4" fill="none" stroke="#34d399" stroke-width="1.5"/>
  <text x="208" y="211" text-anchor="middle" fill="#34d399" font-size="11">Orientation</text>
  <line x1="253" y1="207" x2="278" y2="207" stroke="#94a3b8" stroke-width="1.2"/>
  <polygon points="278,204 278,210 285,207" fill="#94a3b8"/>
  <rect x="286" y="195" width="80" height="24" rx="4" fill="none" stroke="#f472b6" stroke-width="1.5"/>
  <text x="326" y="211" text-anchor="middle" fill="#f472b6" font-size="11">Location</text>
  <text x="200" y="245" text-anchor="middle" fill="#94a3b8" font-size="10">Higher-level controls refine lower-level ones</text>
</svg>`,
    options: [
      { id: 'a', text: 'They are identical — both control how flat a surface is' },
      { id: 'b', text: 'Flatness controls the form of a surface in isolation; parallelism controls the orientation of a surface relative to a datum' },
      { id: 'c', text: 'Parallelism is for round features; flatness is for flat features' },
      { id: 'd', text: 'Flatness requires a datum reference; parallelism does not' },
    ],
    correctAnswer: 'b',
    explanation: 'Flatness is a form control — it says "this surface must lie between two parallel planes 0.XX mm apart" with NO reference to any other feature. Parallelism is an orientation control — it says "this surface must lie between two parallel planes 0.XX mm apart that are also parallel to a datum surface." Parallelism inherently controls flatness (a parallel surface must also be flat within the parallelism tolerance), but flatness does NOT control parallelism.',
    interviewInsight: 'Understanding the hierarchy of GD&T controls (form → orientation → location) is essential. Interviewers test whether you know that higher-level controls refine lower-level ones.',
    realWorldConnection: 'Mating surfaces (flanges, sealing faces) often need both flatness and parallelism controlled. The base of a machine tool needs parallelism to a reference surface to ensure the tool cuts straight.',
    commonMistake: 'Thinking flatness and parallelism are interchangeable. Flatness has no datum; parallelism requires one. This is a fundamental GD&T hierarchy concept.',
    tags: ['GD&T', 'flatness', 'parallelism', 'form', 'orientation', 'datum'],
  },

  // DT-005 — Spot the Flaw
  {
    id: 'dt-005',
    type: 'spot-the-flaw',
    topic: 'design-tolerancing',
    subtopic: 'Engineering Drawings',
    difficulty: 'advanced',
    question: 'Spot the flaw in this GD&T callout:',
    diagram: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Shaft (cylindrical feature shown as side view) -->
  <rect x="120" y="50" width="200" height="60" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Shaft centerline -->
  <line x1="100" y1="80" x2="340" y2="80" stroke="#60a5fa" stroke-width="0.8" stroke-dasharray="8,4,2,4"/>
  <!-- Shaft label -->
  <text x="220" y="85" text-anchor="middle" fill="#e2e8f0" font-size="11">Shaft feature</text>
  <!-- Datum A triangle pointing at the shaft itself (the flaw!) -->
  <polygon points="160,110 156,122 164,122" fill="#fb923c"/>
  <text x="160" y="135" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold">A</text>
  <!-- Feature control frame -->
  <rect x="100" y="145" width="240" height="28" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="148" y1="145" x2="148" y2="173" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="228" y1="145" x2="228" y2="173" stroke="#e2e8f0" stroke-width="1.5"/>
  <line x1="290" y1="145" x2="290" y2="173" stroke="#e2e8f0" stroke-width="1.5"/>
  <!-- Position symbol -->
  <circle cx="124" cy="159" r="8" fill="none" stroke="#e2e8f0" stroke-width="1.2"/>
  <line x1="124" y1="149" x2="124" y2="169" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="114" y1="159" x2="134" y2="159" stroke="#e2e8f0" stroke-width="1"/>
  <text x="188" y="164" text-anchor="middle" fill="#e2e8f0" font-size="11">⌀0.05</text>
  <text x="258" y="164" text-anchor="middle" fill="#e2e8f0" font-size="11">M</text>
  <text x="310" y="164" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold">A</text>
  <!-- Circular error indicator -->
  <circle cx="310" cy="159" r="14" fill="none" stroke="#fb923c" stroke-width="2" stroke-dasharray="3,2"/>
  <!-- Error callout -->
  <line x1="324" y1="159" x2="355" y2="145" stroke="#fb923c" stroke-width="1"/>
  <text x="340" y="138" fill="#fb923c" font-size="10" font-weight="bold">FLAW: Self-</text>
  <text x="340" y="150" fill="#fb923c" font-size="10" font-weight="bold">referencing!</text>
  <!-- Explanation -->
  <text x="200" y="200" text-anchor="middle" fill="#e2e8f0" font-size="11">Datum A = the shaft itself</text>
  <text x="200" y="215" text-anchor="middle" fill="#e2e8f0" font-size="11">Position references datum A</text>
  <text x="200" y="235" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold">A feature cannot be positioned relative to itself</text>
</svg>`,
    statement: 'A cylindrical shaft feature has a position tolerance of ⌀0.05 mm applied at MMC, referenced to datums A, B, and C. Datum A is the shaft\'s own cylindrical surface.',
    flaw: {
      text: 'Datum A is the shaft\'s own cylindrical surface.',
      flawIndex: 2,
      flawExplanation: 'You cannot reference a feature\'s position to itself. A position tolerance controls where a feature is relative to a datum reference frame. If the datum IS the feature itself, the callout is circular and meaningless — the feature is always at its own location. Datum A should be an independent feature (like a flat mounting face or a different bore) that establishes the reference frame for the shaft\'s position.',
    },
    correctedStatement: 'The position tolerance for the cylindrical shaft should reference independent datums — for example, datum A as a mounting face (primary, establishing a plane), datum B as a locating bore (secondary, establishing an axis), and datum C if needed for rotational constraint.',
    explanation: 'Self-referencing datums are a common GD&T error. The purpose of datums is to establish an external reference frame. A feature cannot be its own reference — that provides no constraint or verification.',
    interviewInsight: 'GD&T errors are very common in industry. The interviewer wants to see that you can catch logical errors in tolerance callouts, not just read valid ones.',
    commonMistake: 'Not recognizing that self-referencing is circular. This error appears on real engineering drawings more often than you would expect.',
    tags: ['GD&T', 'datum', 'position', 'self-reference', 'drawing-error', 'tolerance'],
  },

  // DT-006 — Design Decision
  {
    id: 'dt-006',
    type: 'design-decision',
    topic: 'design-tolerancing',
    subtopic: 'Tolerance Stack-Up',
    difficulty: 'advanced',
    question: 'Your assembly has a critical gap that must be 1.0 ± 0.3 mm. The tolerance stack-up of the five contributing parts gives ±0.5 mm worst-case. How do you fix it?',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <!-- Five parts stacked showing the gap -->
  <rect x="30" y="60" width="50" height="80" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1.2"/>
  <rect x="85" y="60" width="50" height="80" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1.2"/>
  <rect x="140" y="60" width="50" height="80" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1.2"/>
  <rect x="195" y="60" width="50" height="80" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1.2"/>
  <rect x="250" y="60" width="50" height="80" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1.2"/>
  <!-- Part labels -->
  <text x="55" y="105" text-anchor="middle" fill="#94a3b8" font-size="9">P1</text>
  <text x="110" y="105" text-anchor="middle" fill="#94a3b8" font-size="9">P2</text>
  <text x="165" y="105" text-anchor="middle" fill="#94a3b8" font-size="9">P3</text>
  <text x="220" y="105" text-anchor="middle" fill="#94a3b8" font-size="9">P4</text>
  <text x="275" y="105" text-anchor="middle" fill="#94a3b8" font-size="9">P5</text>
  <!-- Sensor on right side -->
  <rect x="320" y="60" width="50" height="80" rx="2" fill="#334155" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="345" y="95" text-anchor="middle" fill="#60a5fa" font-size="9">Sensor</text>
  <!-- Critical gap -->
  <rect x="300" y="65" width="20" height="70" fill="none" stroke="#fb923c" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="310" y="55" text-anchor="middle" fill="#fb923c" font-size="10" font-weight="bold">GAP</text>
  <!-- Gap dimension -->
  <line x1="300" y1="150" x2="300" y2="165" stroke="#fb923c" stroke-width="1"/>
  <line x1="320" y1="150" x2="320" y2="165" stroke="#fb923c" stroke-width="1"/>
  <line x1="300" y1="160" x2="320" y2="160" stroke="#fb923c" stroke-width="1.2"/>
  <text x="310" y="178" text-anchor="middle" fill="#fb923c" font-size="10">1.0 ± 0.3 mm REQ</text>
  <!-- Problem statement -->
  <rect x="30" y="195" width="340" height="30" rx="4" fill="none" stroke="#f472b6" stroke-width="1.5"/>
  <text x="200" y="214" text-anchor="middle" fill="#f472b6" font-size="11">Stack-up gives ± 0.5 mm (exceeds ± 0.3 mm spec)</text>
  <!-- Solutions -->
  <text x="30" y="248" fill="#34d399" font-size="11" font-weight="bold">Best fix: Reduce # of parts in the stack</text>
  <text x="30" y="265" fill="#94a3b8" font-size="10">Combining parts eliminates tolerance contributors entirely</text>
  <text x="30" y="282" fill="#94a3b8" font-size="10">More robust than tightening tolerances or adding shims</text>
</svg>`,
    context: 'The assembly is for an automotive sensor mount. The gap controls the sensor-to-target distance and directly affects measurement accuracy. Annual volume is 200,000 units.',
    designOptions: [
      {
        id: 'a',
        text: 'Tighten individual part tolerances to bring the stack within ±0.3 mm',
        tradeoffs: 'Requires each part tolerance to shrink by ~40%. This means tighter process controls, more scrap, higher part cost. May require grinding instead of turning for some features.',
      },
      {
        id: 'b',
        text: 'Add a selectable shim (available in 0.1 mm increments) to compensate for the stack',
        tradeoffs: 'Shims are cheap but require measurement during assembly to select the right thickness. Adds assembly time and labor cost. Creates a kitting challenge.',
      },
      {
        id: 'c',
        text: 'Redesign to reduce the number of contributors in the stack (fewer parts)',
        tradeoffs: 'Fewer parts in the chain means fewer tolerances stacking up. May require a more complex single part that combines functions. Tooling redesign cost.',
      },
      {
        id: 'd',
        text: 'Use statistical (RSS) tolerance analysis and accept the ~0.3% assembly fallout',
        tradeoffs: 'RSS gives ±0.22 mm, which is within spec. But 0.3% fallout means ~600 units/year need rework. May be acceptable depending on rework cost vs. tighter tolerance cost.',
      },
    ],
    bestOption: 'c',
    evaluationCriteria: ['Assembly cost impact', 'Robustness of solution', 'Part cost impact', 'Long-term manufacturing stability'],
    explanation: 'Reducing the number of parts in the tolerance chain is the most robust solution. If you can combine two parts into one, you eliminate one set of tolerances entirely. This is superior to tightening tolerances (which fights physics) or adding shims (which adds assembly complexity). Statistical acceptance (d) is viable at high volumes but requires ongoing process monitoring.',
    interviewInsight: 'Tolerance management is a core product design skill. The interviewer wants to see that you think about the system design, not just crunch numbers. Redesigning the stack is a higher-level solution than tightening tolerances.',
    commonMistake: 'Immediately choosing option (a) without considering the cost. Also, not recognizing that reducing the number of contributors is the most permanent fix.',
    tags: ['tolerance-stack', 'shim', 'DFM', 'assembly', 'gap', 'redesign'],
  },
];
