import type { Question } from '../types';

export const fluidMechanicsQuestions: Question[] = [
  // FM-001 — Multiple Choice
  {
    id: 'fm-001',
    type: 'multiple-choice',
    topic: 'fluid-mechanics',
    subtopic: 'Fluid Dynamics',
    difficulty: 'beginner',
    question: 'An airplane wing generates lift. According to the most physically accurate explanation, this is primarily because:',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Airfoil shape -->
      <path d="M80,150 Q120,110 200,105 Q300,100 330,130 Q300,140 200,148 Q120,155 80,150 Z" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <!-- Chord line and angle of attack -->
      <line x1="80" y1="150" x2="330" y2="130" stroke="#94a3b8" stroke-width="1" stroke-dasharray="6,3"/>
      <line x1="60" y1="150" x2="350" y2="150" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="340" y="145" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">chord line</text>
      <!-- Angle of attack arc -->
      <path d="M310,150 Q310,142 315,138" fill="none" stroke="#f472b6" stroke-width="1.5"/>
      <text x="295" y="168" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">α</text>
      <!-- Upper streamlines (faster, closer together) -->
      <path d="M30,100 Q120,85 200,82 Q280,80 370,95" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <path d="M30,120 Q120,100 200,95 Q280,92 370,110" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <path d="M30,140 Q100,125 160,115 Q220,108 280,108 Q340,115 370,125" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <!-- Lower streamlines (slower, more spread) -->
      <path d="M30,165 Q100,168 160,165 Q220,160 280,155 Q340,150 370,148" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <path d="M30,185 Q120,185 200,180 Q280,175 370,170" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <path d="M30,205 Q120,205 200,200 Q280,195 370,192" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <!-- Flow arrows on streamlines -->
      <polygon points="200,82 193,78 193,86" fill="#60a5fa"/>
      <polygon points="200,95 193,91 193,99" fill="#60a5fa"/>
      <polygon points="200,180 193,176 193,184" fill="#60a5fa"/>
      <polygon points="200,200 193,196 193,204" fill="#60a5fa"/>
      <!-- Faster label top -->
      <text x="175" y="72" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Faster (lower P)</text>
      <!-- Slower label bottom -->
      <text x="175" y="220" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Slower (higher P)</text>
      <!-- Lift arrow -->
      <line x1="200" y1="130" x2="200" y2="55" stroke="#34d399" stroke-width="2.5"/>
      <polygon points="200,50 194,60 206,60" fill="#34d399"/>
      <text x="208" y="55" fill="#34d399" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">LIFT</text>
      <!-- Downwash arrow -->
      <line x1="340" y1="140" x2="360" y2="175" stroke="#f472b6" stroke-width="1.5"/>
      <polygon points="362,179 354,173 362,170" fill="#f472b6"/>
      <text x="348" y="195" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">downwash</text>
      <!-- Circulation arrow (curved) -->
      <path d="M140,70 Q100,90 105,130 Q110,160 150,175" fill="none" stroke="#f472b6" stroke-width="1" stroke-dasharray="4,3"/>
      <polygon points="153,177 145,173 148,181" fill="#f472b6"/>
      <text x="60" y="75" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">circulation</text>
      <!-- Freestream label -->
      <line x1="10" y1="25" x2="55" y2="25" stroke="#e2e8f0" stroke-width="1.5"/>
      <polygon points="58,25 50,21 50,29" fill="#e2e8f0"/>
      <text x="10" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">V∞</text>
    </svg>`,
    options: [
      { id: 'a', text: 'The air on top travels a longer path and must go faster (equal transit time), creating lower pressure' },
      { id: 'b', text: 'The wing deflects air downward; by Newton\'s third law, the air pushes the wing up' },
      { id: 'c', text: 'Bernoulli\'s equation shows that faster air over the top creates lower pressure, but the reason the air goes faster is the circulation and angle of attack, not equal transit time' },
      { id: 'd', text: 'The shape of the wing creates a vacuum above it that sucks the wing upward' },
    ],
    correctAnswer: 'c',
    explanation: 'The "equal transit time" theory (option a) is a myth — there is no physical law requiring air split at the leading edge to meet at the trailing edge. In reality, air DOES move faster over the top, but because of circulation induced by the airfoil shape and angle of attack, not equal transit time. The pressure difference (Bernoulli) and the downwash (Newton) are two valid perspectives on the same phenomenon. Option (c) captures the Bernoulli mechanism with the correct causal reasoning.',
    interviewInsight: 'This is a classic trap question. The "equal transit time" explanation is wrong and widely taught. Interviewers use it to separate candidates who have genuinely thought about fluid mechanics from those who memorized a textbook diagram.',
    realWorldConnection: 'Understanding lift generation is fundamental for aerospace engineering, wind turbine blade design, and even Formula 1 aerodynamics (inverted wings for downforce).',
    commonMistake: 'Choosing option (a) — the equal transit time fallacy. It is the most commonly taught incorrect explanation of lift.',
    tags: ['lift', 'bernoulli', 'aerodynamics', 'circulation', 'angle-of-attack'],
  },

  // FM-002 — Estimation
  {
    id: 'fm-002',
    type: 'estimation',
    topic: 'fluid-mechanics',
    subtopic: 'Pipe Flow & Losses',
    difficulty: 'intermediate',
    question: 'Estimate the pressure drop in a 100-meter horizontal run of 2-inch Schedule 40 steel pipe carrying water at 2 m/s.',
    diagram: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <!-- Pipe walls -->
      <rect x="40" y="80" width="320" height="8" rx="2" fill="#94a3b8"/>
      <rect x="40" y="152" width="320" height="8" rx="2" fill="#94a3b8"/>
      <!-- Pipe interior -->
      <rect x="40" y="88" width="320" height="64" fill="#334155" opacity="0.4"/>
      <!-- Flow arrows inside pipe -->
      <line x1="80" y1="120" x2="130" y2="120" stroke="#60a5fa" stroke-width="2"/>
      <polygon points="133,120 125,116 125,124" fill="#60a5fa"/>
      <line x1="180" y1="120" x2="230" y2="120" stroke="#60a5fa" stroke-width="2"/>
      <polygon points="233,120 225,116 225,124" fill="#60a5fa"/>
      <line x1="280" y1="120" x2="330" y2="120" stroke="#60a5fa" stroke-width="2"/>
      <polygon points="333,120 325,116 325,124" fill="#60a5fa"/>
      <!-- Velocity label -->
      <text x="170" y="115" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">V = 2 m/s</text>
      <!-- Diameter dimension -->
      <line x1="30" y1="88" x2="30" y2="152" stroke="#f472b6" stroke-width="1"/>
      <line x1="25" y1="88" x2="35" y2="88" stroke="#f472b6" stroke-width="1"/>
      <line x1="25" y1="152" x2="35" y2="152" stroke="#f472b6" stroke-width="1"/>
      <text x="5" y="124" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">D=52mm</text>
      <!-- Length dimension -->
      <line x1="40" y1="175" x2="360" y2="175" stroke="#34d399" stroke-width="1"/>
      <line x1="40" y1="170" x2="40" y2="180" stroke="#34d399" stroke-width="1"/>
      <line x1="360" y1="170" x2="360" y2="180" stroke="#34d399" stroke-width="1"/>
      <text x="165" y="192" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">L = 100 m</text>
      <!-- Pressure points -->
      <circle cx="60" cy="70" r="4" fill="#fb923c"/>
      <text x="48" y="62" fill="#fb923c" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">P\u2081</text>
      <circle cx="340" cy="70" r="4" fill="#fb923c"/>
      <text x="328" y="62" fill="#fb923c" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">P\u2082</text>
      <!-- Pressure drop arrow -->
      <line x1="80" y1="65" x2="320" y2="65" stroke="#fb923c" stroke-width="1.5" stroke-dasharray="5,3"/>
      <polygon points="320,65 312,61 312,69" fill="#fb923c"/>
      <text x="150" y="57" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">\u0394P = f(L/D)(\u03c1V\u00b2/2)</text>
      <!-- Roughness detail -->
      <path d="M100,152 l2,-3 l3,3 l2,-2 l3,2 l2,-3 l3,3 l2,-2 l3,2 l2,-3 l3,3 l2,-2 l3,2" fill="none" stroke="#94a3b8" stroke-width="1"/>
      <text x="90" y="168" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">\u03b5 = 0.045 mm (steel)</text>
      <!-- Material label -->
      <text x="120" y="215" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Schedule 40 Steel Pipe</text>
      <!-- Re number -->
      <text x="100" y="232" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Re = 104,000 (turbulent) \u2192 f \u2248 0.020</text>
    </svg>`,
    hints: [
      'Schedule 40 2-inch pipe has an ID of about 52 mm (0.052 m)',
      'Water at room temperature: ρ ≈ 1000 kg/m³, μ ≈ 0.001 Pa·s',
      'For steel pipe, roughness ε ≈ 0.045 mm',
      'Use Darcy-Weisbach: ΔP = f × (L/D) × (ρV²/2)',
    ],
    acceptableRange: { low: 50, high: 120, unit: 'kPa', bestEstimate: 75 },
    approachSteps: [
      'Reynolds number: Re = ρVD/μ = 1000 × 2 × 0.052 / 0.001 = 104,000 → turbulent flow',
      'Relative roughness: ε/D = 0.045/52 = 0.00087',
      'From Moody chart at Re=104,000 and ε/D=0.00087: f ≈ 0.020',
      'ΔP = f × (L/D) × (ρV²/2) = 0.020 × (100/0.052) × (1000 × 4/2)',
      'ΔP = 0.020 × 1923 × 2000 = 76,920 Pa ≈ 77 kPa',
      'This is about 11 psi — a reasonable pressure drop for a 100m pipe run',
    ],
    explanation: 'Pipe pressure drop calculations are among the most common practical fluid mechanics problems. The key is getting the Reynolds number right to determine the flow regime, then using the Moody chart (or Colebrook equation) for the friction factor.',
    interviewInsight: 'This tests your ability to execute a standard pipe flow calculation from memory. Interviewers want to see that you know the Darcy-Weisbach equation, can estimate Reynolds number, and can navigate the Moody chart.',
    commonMistake: 'Forgetting the factor of 2 in the velocity head term, or using the wrong pipe diameter (OD instead of ID). Also, confusing Darcy and Fanning friction factors (factor of 4 difference).',
    tags: ['pipe-flow', 'pressure-drop', 'darcy-weisbach', 'moody-chart', 'reynolds-number'],
  },

  // FM-003 — Two Choice Tradeoff
  {
    id: 'fm-003',
    type: 'two-choice-tradeoff',
    topic: 'fluid-mechanics',
    subtopic: 'Pumps & Turbomachinery',
    difficulty: 'intermediate',
    question: 'You need to pump a viscous slurry (water with 30% solids) over a 50-meter height. Centrifugal pump or positive displacement pump?',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Left side: Centrifugal pump -->
      <text x="60" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Centrifugal</text>
      <!-- Pump casing circle -->
      <circle cx="60" cy="100" r="40" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <!-- Impeller blades -->
      <path d="M60,100 Q50,80 40,75" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <path d="M60,100 Q80,90 85,78" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <path d="M60,100 Q70,115 80,120" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <path d="M60,100 Q45,110 35,118" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <!-- Inlet -->
      <line x1="60" y1="145" x2="60" y2="160" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="60,145 55,152 65,152" fill="#94a3b8"/>
      <text x="60" y="172" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">inlet</text>
      <!-- Outlet -->
      <line x1="105" y1="100" x2="120" y2="100" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="120,100 113,96 113,104" fill="#94a3b8"/>
      <!-- Efficiency curve for viscous fluid -->
      <text x="60" y="195" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Efficiency with</text>
      <text x="60" y="207" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">viscous slurry:</text>
      <!-- Declining performance bar -->
      <rect x="25" y="215" width="70" height="10" fill="none" stroke="#94a3b8" stroke-width="1"/>
      <rect x="25" y="215" width="22" height="10" fill="#fb923c" opacity="0.7"/>
      <text x="60" y="240" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="bold">~30%</text>
      <!-- X mark -->
      <line x1="45" y1="250" x2="75" y2="270" stroke="#fb923c" stroke-width="2.5"/>
      <line x1="75" y1="250" x2="45" y2="270" stroke="#fb923c" stroke-width="2.5"/>

      <!-- Divider -->
      <line x1="200" y1="10" x2="200" y2="290" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="200" y="295" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">vs</text>

      <!-- Right side: Positive Displacement pump -->
      <text x="310" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Positive Displacement</text>
      <!-- Progressive cavity pump body -->
      <rect x="260" y="80" width="100" height="40" rx="8" fill="#334155" stroke="#34d399" stroke-width="2"/>
      <!-- Rotor (helical) -->
      <path d="M270,100 Q280,88 290,100 Q300,112 310,100 Q320,88 330,100 Q340,112 350,100" fill="none" stroke="#34d399" stroke-width="2"/>
      <!-- Inlet -->
      <line x1="255" y1="100" x2="240" y2="100" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="255,100 248,96 248,104" fill="#94a3b8"/>
      <text x="230" y="105" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="end">inlet</text>
      <!-- Outlet -->
      <line x1="365" y1="100" x2="380" y2="100" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="380,100 373,96 373,104" fill="#94a3b8"/>
      <!-- Slurry particles inside -->
      <circle cx="275" cy="95" r="2" fill="#f472b6" opacity="0.7"/>
      <circle cx="295" cy="105" r="2.5" fill="#f472b6" opacity="0.7"/>
      <circle cx="315" cy="93" r="2" fill="#f472b6" opacity="0.7"/>
      <circle cx="335" cy="107" r="2.5" fill="#f472b6" opacity="0.7"/>
      <circle cx="345" cy="95" r="2" fill="#f472b6" opacity="0.7"/>
      <!-- Efficiency with viscous fluid -->
      <text x="310" y="145" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Efficiency with</text>
      <text x="310" y="157" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">viscous slurry:</text>
      <!-- Good performance bar -->
      <rect x="275" y="165" width="70" height="10" fill="none" stroke="#94a3b8" stroke-width="1"/>
      <rect x="275" y="165" width="60" height="10" fill="#34d399" opacity="0.7"/>
      <text x="310" y="190" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="bold">~85%</text>
      <!-- Check mark -->
      <polyline points="295,205 305,220 330,195" fill="none" stroke="#34d399" stroke-width="3"/>

      <!-- Height label -->
      <line x1="385" y1="50" x2="385" y2="270" stroke="#f472b6" stroke-width="1"/>
      <line x1="380" y1="50" x2="390" y2="50" stroke="#f472b6" stroke-width="1"/>
      <line x1="380" y1="270" x2="390" y2="270" stroke="#f472b6" stroke-width="1"/>
      <text x="393" y="165" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" writing-mode="tb">50 m head</text>
    </svg>`,
    choices: [
      {
        id: 'a',
        text: 'Centrifugal pump',
        pros: ['Smooth, continuous flow', 'Simple design, fewer moving parts', 'Can handle some solids if impeller is designed for it', 'Lower maintenance for clean fluids'],
        cons: ['Efficiency drops dramatically with viscous fluids', 'Cannot develop high pressure at low flow with viscous slurry', 'Impeller wear from abrasive solids', 'Performance is very sensitive to fluid viscosity'],
      },
      {
        id: 'b',
        text: 'Positive displacement (PD) pump — e.g., progressive cavity or diaphragm',
        pros: ['Flow is nearly independent of viscosity', 'Can develop high pressure regardless of fluid properties', 'Handles slurries and solids well (progressive cavity)', 'Efficiency stays high with viscous fluids'],
        cons: ['Pulsating flow (unless progressive cavity)', 'More complex seals and wear parts', 'Requires a relief valve to prevent over-pressurization', 'Higher upfront cost'],
      },
    ],
    preferredAnswer: 'b',
    acceptableAnswer: 'b',
    justification: 'For viscous slurry with solids, a positive displacement pump (specifically a progressive cavity pump) is the clear choice. Centrifugal pumps lose efficiency rapidly as viscosity increases and are degraded by abrasive solids. PD pumps provide consistent flow regardless of viscosity and can generate the pressure needed for 50m of head.',
    explanation: 'The key principle is that centrifugal pumps rely on kinetic energy transfer to the fluid, which is impaired by viscosity. PD pumps physically displace a fixed volume per revolution, making them insensitive to viscosity. This is one of the most important pump selection rules.',
    interviewInsight: 'Pump selection is asked in almost every process/mechanical design interview. The viscosity boundary between centrifugal and PD pumps (roughly 100-500 cP) is a critical design heuristic.',
    commonMistake: 'Defaulting to a centrifugal pump because it is more common. Centrifugal pumps are great for water but terrible for viscous slurries.',
    tags: ['pump-selection', 'centrifugal', 'positive-displacement', 'slurry', 'viscosity'],
  },

  // FM-004 — Multiple Choice
  {
    id: 'fm-004',
    type: 'multiple-choice',
    topic: 'fluid-mechanics',
    subtopic: 'Fluid Statics',
    difficulty: 'beginner',
    question: 'A submarine is resting on the ocean floor at 300m depth. What is the approximate pressure on its hull?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Water surface -->
      <path d="M0,40 Q20,35 40,40 Q60,45 80,40 Q100,35 120,40 Q140,45 160,40 Q180,35 200,40 Q220,45 240,40 Q260,35 280,40 Q300,45 320,40 Q340,35 360,40 Q380,45 400,40" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <text x="10" y="32" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Surface (P\u2090 = 1 atm)</text>
      <!-- Water gradient fill -->
      <defs>
        <linearGradient id="fm004-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.4"/>
        </linearGradient>
      </defs>
      <rect x="0" y="40" width="400" height="220" fill="url(#fm004-water)"/>
      <!-- Depth markers -->
      <line x1="370" y1="40" x2="370" y2="240" stroke="#f472b6" stroke-width="1.5"/>
      <line x1="365" y1="40" x2="375" y2="40" stroke="#f472b6" stroke-width="1.5"/>
      <line x1="365" y1="240" x2="375" y2="240" stroke="#f472b6" stroke-width="1.5"/>
      <text x="378" y="145" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">300 m</text>
      <!-- Depth tick marks -->
      <line x1="365" y1="107" x2="375" y2="107" stroke="#f472b6" stroke-width="1"/>
      <text x="378" y="110" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">100m</text>
      <line x1="365" y1="173" x2="375" y2="173" stroke="#f472b6" stroke-width="1"/>
      <text x="378" y="176" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">200m</text>
      <!-- Pressure arrows (increasing with depth) -->
      <line x1="35" y1="70" x2="55" y2="70" stroke="#fb923c" stroke-width="1"/>
      <polygon points="55,70 50,67 50,73" fill="#fb923c"/>
      <text x="60" y="73" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">~1 atm</text>
      <line x1="35" y1="107" x2="70" y2="107" stroke="#fb923c" stroke-width="1.5"/>
      <polygon points="70,107 64,104 64,110" fill="#fb923c"/>
      <text x="75" y="110" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">~11 atm</text>
      <line x1="35" y1="173" x2="85" y2="173" stroke="#fb923c" stroke-width="1.5"/>
      <polygon points="85,173 79,170 79,176" fill="#fb923c"/>
      <text x="90" y="176" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">~21 atm</text>
      <line x1="35" y1="240" x2="100" y2="240" stroke="#fb923c" stroke-width="2"/>
      <polygon points="100,240 94,237 94,243" fill="#fb923c"/>
      <text x="105" y="243" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" font-weight="bold">~31 atm</text>
      <!-- Submarine -->
      <ellipse cx="200" cy="235" rx="65" ry="18" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <rect x="185" y="216" width="30" height="12" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <rect x="193" y="208" width="14" height="10" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
      <!-- Pressure arrows around submarine -->
      <line x1="200" y1="195" x2="200" y2="210" stroke="#fb923c" stroke-width="1.5"/>
      <polygon points="200,210 196,204 204,204" fill="#fb923c"/>
      <line x1="130" y1="235" x2="140" y2="235" stroke="#fb923c" stroke-width="1.5"/>
      <polygon points="140,235 134,231 134,239" fill="#fb923c"/>
      <line x1="270" y1="235" x2="260" y2="235" stroke="#fb923c" stroke-width="1.5"/>
      <polygon points="260,235 266,231 266,239" fill="#fb923c"/>
      <!-- Ocean floor -->
      <line x1="0" y1="260" x2="400" y2="260" stroke="#94a3b8" stroke-width="2"/>
      <path d="M0,260 l10,5 l10,-3 l10,4 l10,-5 l10,3 l10,-4 l10,5 l10,-3 l10,4 l10,-5 l10,3 l10,-4 l10,5 l10,-3 l10,4 l10,-5 l10,3 l10,-4 l10,5 l10,-3 l10,4 l10,-5 l10,3 l10,-4 l10,5 l10,-3 l10,4 l10,-5 l10,3 l10,-4 l10,5 l10,-3 l10,4" fill="none" stroke="#94a3b8" stroke-width="1"/>
      <!-- Formula -->
      <text x="140" y="15" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">P = \u03c1gh + P\u2090 = 1025\u00d79.81\u00d7300 + 101kPa \u2248 3.1 MPa \u2248 31 atm</text>
      <!-- Rule of thumb -->
      <text x="140" y="275" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Rule: every 10m of seawater \u2248 +1 atm</text>
    </svg>`,
    options: [
      { id: 'a', text: 'About 3 atm (300 kPa)' },
      { id: 'b', text: 'About 10 atm (1 MPa)' },
      { id: 'c', text: 'About 30 atm (3 MPa)' },
      { id: 'd', text: 'About 300 atm (30 MPa)' },
    ],
    correctAnswer: 'c',
    explanation: 'Hydrostatic pressure: P = ρgh + P_atm. At 300m: P = 1025 × 9.81 × 300 + 101,325 ≈ 3,018,000 Pa + 101,325 ≈ 3.12 MPa ≈ 30.7 atm. The quick rule: every 10 meters of seawater adds about 1 atmosphere of pressure.',
    interviewInsight: 'This tests basic hydrostatic intuition. The "10 meters per atmosphere" rule of thumb is essential for any fluid mechanics discussion.',
    realWorldConnection: 'Submarine pressure hulls are engineered to withstand these extreme forces. The Titan submersible tragedy in 2023 highlighted what happens when pressure vessel integrity is compromised at depth.',
    commonMistake: 'Forgetting the density of seawater (~1025 kg/m³, not 1000) or confusing gauge pressure with absolute pressure.',
    tags: ['hydrostatics', 'pressure', 'submarine', 'depth', 'ocean'],
  },

  // FM-005 — Free Text
  {
    id: 'fm-005',
    type: 'free-text',
    topic: 'fluid-mechanics',
    subtopic: 'Pumps & Turbomachinery',
    difficulty: 'intermediate',
    question: 'A centrifugal pump is making a rattling noise and the flow rate is fluctuating. What is likely happening and how would you fix it?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Pump casing -->
      <circle cx="200" cy="130" r="60" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <!-- Impeller -->
      <circle cx="200" cy="130" r="8" fill="#94a3b8"/>
      <path d="M200,130 Q185,110 175,100" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <path d="M200,130 Q220,115 230,105" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <path d="M200,130 Q215,150 225,160" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <path d="M200,130 Q180,145 170,155" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <!-- Rotation arrow -->
      <path d="M200,155 Q220,165 230,150" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,2"/>
      <polygon points="230,150 225,157 232,156" fill="#94a3b8"/>
      <!-- Suction inlet -->
      <rect x="195" y="190" width="10" height="40" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="215" y="215" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">suction</text>
      <!-- Discharge -->
      <rect x="260" y="125" width="40" height="10" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <polygon points="300,130 293,126 293,134" fill="#60a5fa"/>
      <text x="305" y="133" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">discharge</text>
      <!-- Cavitation bubbles at impeller inlet -->
      <circle cx="195" cy="175" r="4" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <circle cx="205" cy="178" r="3" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <circle cx="190" cy="168" r="3.5" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <circle cx="210" cy="172" r="2.5" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <circle cx="197" cy="162" r="3" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <circle cx="185" cy="175" r="2" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <!-- Bubble collapse markers (stars) at impeller blade -->
      <text x="168" y="108" fill="#fb923c" font-family="system-ui, sans-serif" font-size="14">*</text>
      <text x="222" y="112" fill="#fb923c" font-family="system-ui, sans-serif" font-size="14">*</text>
      <text x="218" y="158" fill="#fb923c" font-family="system-ui, sans-serif" font-size="14">*</text>
      <!-- Labels -->
      <text x="120" y="170" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">vapor bubbles</text>
      <text x="120" y="182" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">form here</text>
      <line x1="165" y1="175" x2="185" y2="173" stroke="#fb923c" stroke-width="1" stroke-dasharray="3,2"/>
      <text x="232" y="100" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">bubbles collapse</text>
      <text x="232" y="112" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">on blade (damage)</text>
      <!-- NPSH diagram below -->
      <line x1="30" y1="255" x2="370" y2="255" stroke="#94a3b8" stroke-width="1"/>
      <!-- NPSH_available bar -->
      <rect x="60" y="240" width="100" height="12" fill="#60a5fa" opacity="0.5" stroke="#60a5fa" stroke-width="1"/>
      <text x="110" y="250" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">NPSH\u2090</text>
      <!-- NPSH_required bar (larger - problem!) -->
      <rect x="60" y="265" width="160" height="12" fill="#fb923c" opacity="0.5" stroke="#fb923c" stroke-width="1"/>
      <text x="140" y="275" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">NPSH\u1d63</text>
      <!-- Problem indicator -->
      <text x="235" y="260" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">NPSH\u2090 &lt; NPSH\u1d63</text>
      <text x="235" y="275" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">\u2192 CAVITATION!</text>
      <!-- Title -->
      <text x="200" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Cavitation in Centrifugal Pump</text>
      <!-- Noise indicators -->
      <text x="50" y="120" fill="#f472b6" font-family="system-ui, sans-serif" font-size="16">\u266A</text>
      <text x="40" y="105" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">rattle!</text>
      <text x="330" y="155" fill="#f472b6" font-family="system-ui, sans-serif" font-size="16">\u266A</text>
    </svg>`,
    sampleAnswer: 'The symptoms strongly suggest cavitation. When the local pressure at the pump inlet drops below the vapor pressure of the fluid, small vapor bubbles form. These bubbles are carried into higher-pressure regions of the impeller where they collapse violently, producing the characteristic rattling noise and causing flow instability.\n\nTo confirm: check the NPSH available vs. NPSH required. The available NPSH depends on the inlet piping — suction lift, pipe losses, fluid temperature, and atmospheric pressure.\n\nTo fix: (1) Reduce the suction lift — lower the pump or raise the supply tank. (2) Increase the suction pipe diameter to reduce friction losses. (3) Reduce fluid temperature if possible (lower vapor pressure). (4) Install a booster pump or inducer upstream. (5) Ensure the suction strainer is not clogged.',
    keyPoints: [
      'Cavitation is the most likely diagnosis for rattling noise + flow fluctuation',
      'Caused by NPSH_available < NPSH_required',
      'Vapor bubbles form and collapse violently on impeller surfaces',
      'Fix by improving suction conditions (lower lift, larger pipe, lower temperature)',
      'Cavitation also causes impeller erosion over time',
    ],
    explanation: 'Cavitation is one of the most common pump problems in industry. The ability to diagnose it from symptoms (noise, vibration, flow fluctuation, impeller pitting) and fix it from first principles (NPSH analysis) is a core competency.',
    interviewInsight: 'This is an extremely common interview question for any role involving pumps or hydraulic systems. Interviewers expect you to say "cavitation" immediately and then walk through the NPSH analysis.',
    commonMistake: 'Not knowing what NPSH stands for or how to calculate it. Also, suggesting "replace the pump" without diagnosing the root cause — the new pump will cavitate too if suction conditions are not fixed.',
    tags: ['cavitation', 'NPSH', 'centrifugal-pump', 'troubleshooting', 'impeller'],
  },

  // FM-006 — What Fails First
  {
    id: 'fm-006',
    type: 'what-fails-first',
    topic: 'fluid-mechanics',
    subtopic: 'Pipe Flow & Losses',
    difficulty: 'advanced',
    question: 'A high-pressure water jetting system operates at 3000 psi. The system includes a high-pressure hose, fittings, a nozzle, and a pressure relief valve. What fails first?',
    diagram: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <!-- System schematic left to right -->
      <!-- Pump -->
      <rect x="15" y="90" width="50" height="40" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="40" y="115" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">PUMP</text>
      <text x="40" y="80" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">3000 psi</text>
      <!-- Relief valve (branch off pump) -->
      <line x1="40" y1="130" x2="40" y2="160" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="30,160 50,160 40,180" fill="none" stroke="#34d399" stroke-width="1.5"/>
      <text x="40" y="195" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Relief</text>
      <text x="40" y="205" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Valve</text>
      <!-- Fitting 1 -->
      <line x1="65" y1="110" x2="95" y2="110" stroke="#94a3b8" stroke-width="2"/>
      <rect x="95" y="100" width="20" height="20" rx="3" fill="#334155" stroke="#f472b6" stroke-width="2"/>
      <text x="105" y="135" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Fitting</text>
      <!-- High-pressure hose (wavy line to show flexibility) -->
      <path d="M115,110 Q130,95 145,110 Q160,125 175,110 Q190,95 205,110 Q220,125 235,110 Q250,95 265,110" fill="none" stroke="#fb923c" stroke-width="3"/>
      <!-- Hose label -->
      <text x="190" y="80" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="bold">HP Hose</text>
      <!-- Flex arrows -->
      <path d="M160,140 Q165,148 170,140" fill="none" stroke="#fb923c" stroke-width="1"/>
      <path d="M215,140 Q220,148 225,140" fill="none" stroke="#fb923c" stroke-width="1"/>
      <text x="190" y="155" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">flexing + pressure cycling</text>
      <!-- Fitting 2 -->
      <rect x="265" y="100" width="20" height="20" rx="3" fill="#334155" stroke="#f472b6" stroke-width="2"/>
      <text x="275" y="135" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Fitting</text>
      <!-- Nozzle -->
      <line x1="285" y1="110" x2="320" y2="110" stroke="#94a3b8" stroke-width="2"/>
      <polygon points="320,100 360,107 360,113 320,120" fill="#334155" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="340" y="130" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Nozzle</text>
      <!-- Water jet -->
      <line x1="360" y1="110" x2="395" y2="110" stroke="#60a5fa" stroke-width="2"/>
      <polygon points="395,110 388,106 388,114" fill="#60a5fa"/>
      <!-- Failure zone highlight -->
      <rect x="108" y="88" width="25" height="44" rx="4" fill="none" stroke="#fb923c" stroke-width="2" stroke-dasharray="4,3"/>
      <text x="120" y="145" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">FAIL</text>
      <text x="120" y="155" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">ZONE</text>
      <!-- Failure progression at bottom -->
      <text x="15" y="180" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Failure chain:</text>
      <text x="15" y="195" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">1. Pressure pulsations \u2192 cyclic hoop stress</text>
      <text x="15" y="208" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">2. Flexing near fitting \u2192 bending + tension</text>
      <text x="15" y="221" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">3. Fatigue cracks at crimp transition</text>
      <text x="15" y="234" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" font-weight="bold">4. Weeping \u2192 burst if not caught</text>
    </svg>`,
    components: [
      { id: 'a', text: 'The hose — fatigue from pressure pulsations and flexing during use' },
      { id: 'b', text: 'The fittings — connector threads weaken from repeated assembly/disassembly' },
      { id: 'c', text: 'The nozzle — erosion from high-velocity water and any entrained particles' },
      { id: 'd', text: 'The relief valve — spring fatigue from cyclic loading' },
    ],
    correctAnswer: 'a',
    failureMode: 'The high-pressure hose fails by fatigue at a point near a fitting where the hose flexes during operation. The combination of internal pressure cycling and external bending creates a complex stress state that initiates cracks in the hose reinforcement layers.',
    failureChain: [
      'Pressure pulsations from the pump create cyclic hoop stress in the hose wall',
      'Flexing during use adds bending stress, especially near rigid fittings',
      'The hose reinforcement (braided steel wire) develops fatigue cracks at the crimp fitting transition',
      'A small leak appears first (weeping) — this is the warning sign',
      'If not caught, the crack propagates and the hose bursts, releasing a high-pressure water jet',
    ],
    explanation: 'Flexible hoses in high-pressure systems are the weak link because they experience both pressure cycling and mechanical flexing. The failure point is typically near a fitting where the stiff crimp meets the flexible hose body, creating a stress concentration.',
    interviewInsight: 'This tests your understanding of real-world failure modes in pressurized systems. The interviewer wants to see that you know the weakest link and can describe the failure progression.',
    realWorldConnection: 'High-pressure hose failures are a leading cause of injuries in industrial settings. Regular inspection and replacement schedules are mandated by safety standards.',
    commonMistake: 'Choosing the nozzle. While nozzles do erode, they are replaceable wear items with predictable life. Hose failures are more sudden and dangerous.',
    tags: ['high-pressure', 'hose', 'fatigue', 'fittings', 'safety', 'failure-analysis'],
  },

  // FM-007 — Multi-Select
  {
    id: 'fm-007',
    type: 'multi-select',
    topic: 'fluid-mechanics',
    subtopic: 'Dimensional Analysis',
    difficulty: 'advanced',
    question: 'You are testing a 1:10 scale model of a ship in a towing tank. Which of the following must be matched between the model and the full-scale ship for valid results? (Select all that apply)',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Full-scale ship (top) -->
      <text x="200" y="18" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Full-Scale Ship</text>
      <!-- Ship hull -->
      <path d="M40,60 L60,45 L300,40 L340,50 L350,65 L330,75 L50,75 Z" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <!-- Superstructure -->
      <rect x="100" y="25" width="80" height="17" rx="2" fill="#334155" stroke="#60a5fa" stroke-width="1.5"/>
      <rect x="130" y="14" width="30" height="13" rx="2" fill="#334155" stroke="#60a5fa" stroke-width="1"/>
      <!-- Water line -->
      <line x1="20" y1="65" x2="370" y2="65" stroke="#60a5fa" stroke-width="1" stroke-dasharray="4,3"/>
      <!-- Wave at bow -->
      <path d="M40,65 Q35,55 30,65 Q25,75 20,65" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <!-- Length dimension -->
      <line x1="40" y1="85" x2="350" y2="85" stroke="#f472b6" stroke-width="1"/>
      <line x1="40" y1="80" x2="40" y2="90" stroke="#f472b6" stroke-width="1"/>
      <line x1="350" y1="80" x2="350" y2="90" stroke="#f472b6" stroke-width="1"/>
      <text x="195" y="97" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">L = 100 m</text>
      <!-- Speed arrow -->
      <line x1="250" y1="55" x2="310" y2="55" stroke="#34d399" stroke-width="1.5"/>
      <polygon points="310,55 304,51 304,59" fill="#34d399"/>
      <text x="280" y="48" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">V</text>

      <!-- 1:10 scale arrow -->
      <text x="200" y="120" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">1 : 10 scale</text>
      <line x1="200" y1="125" x2="200" y2="140" stroke="#94a3b8" stroke-width="1"/>
      <polygon points="200,143 196,137 204,137" fill="#94a3b8"/>

      <!-- Model ship (bottom, smaller) -->
      <text x="200" y="158" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Scale Model (1:10)</text>
      <!-- Model hull -->
      <path d="M152,195 L158,190 L262,188 L280,192 L284,198 L276,202 L155,202 Z" fill="#334155" stroke="#60a5fa" stroke-width="1.5"/>
      <!-- Model water line -->
      <line x1="140" y1="198" x2="295" y2="198" stroke="#60a5fa" stroke-width="1" stroke-dasharray="3,2"/>
      <!-- Wave at bow -->
      <path d="M152,198 Q149,193 146,198 Q143,203 140,198" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <!-- Model length -->
      <line x1="152" y1="212" x2="284" y2="212" stroke="#f472b6" stroke-width="1"/>
      <line x1="152" y1="207" x2="152" y2="217" stroke="#f472b6" stroke-width="1"/>
      <line x1="284" y1="207" x2="284" y2="217" stroke="#f472b6" stroke-width="1"/>
      <text x="218" y="224" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">L = 10 m</text>

      <!-- Dimensionless numbers -->
      <rect x="10" y="238" width="185" height="38" rx="4" fill="none" stroke="#34d399" stroke-width="1.5"/>
      <text x="102" y="253" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="bold">MUST MATCH:</text>
      <text x="102" y="270" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Fr = V/\u221A(gL)  +  Geometry</text>

      <rect x="205" y="238" width="185" height="38" rx="4" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <text x="297" y="253" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="bold">CANNOT MATCH:</text>
      <text x="297" y="270" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Re = VL/\u03bd (contradicts Fr)</text>

      <!-- Towing tank walls -->
      <line x1="130" y1="175" x2="130" y2="210" stroke="#94a3b8" stroke-width="1"/>
      <line x1="290" y1="175" x2="290" y2="210" stroke="#94a3b8" stroke-width="1"/>
      <text x="307" y="195" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">towing tank</text>
    </svg>`,
    options: [
      { id: 'a', text: 'Froude number — ratio of inertial to gravitational forces' },
      { id: 'b', text: 'Reynolds number — ratio of inertial to viscous forces' },
      { id: 'c', text: 'Mach number — ratio of flow speed to speed of sound' },
      { id: 'd', text: 'Geometric similarity — same shape at different scale' },
      { id: 'e', text: 'Weber number — ratio of inertial to surface tension forces' },
    ],
    correctAnswers: ['a', 'd'],
    explanation: 'Ship hydrodynamics is dominated by wave-making resistance, which is governed by the Froude number (Fr = V/√(gL)). Geometric similarity is always required. Reynolds number matching would be ideal but is impractical — a 1:10 model would need to be towed at 10× the speed (Re ~ VL), which changes the Froude number. In practice, Froude number is matched and a Reynolds number correction is applied. Mach number is irrelevant (low speeds). Weber number matters only for very small models where surface tension effects become significant.',
    interviewInsight: 'Dimensional analysis and similitude are tested in aerospace and naval architecture interviews. The key insight is that you often CANNOT match all dimensionless groups simultaneously, so you must choose the dominant one.',
    commonMistake: 'Trying to match both Froude and Reynolds simultaneously — they require contradictory model speeds for a given scale ratio. This is the fundamental challenge of scale-model testing.',
    tags: ['dimensional-analysis', 'froude', 'reynolds', 'similitude', 'ship', 'scale-model'],
  },

  // FM-008 — Multiple Choice
  {
    id: 'fm-008',
    type: 'multiple-choice',
    topic: 'fluid-mechanics',
    subtopic: 'Fluid Dynamics',
    difficulty: 'intermediate',
    question: 'Water flows through a pipe that suddenly narrows from 10 cm to 5 cm diameter. If the velocity in the wide section is 2 m/s, what is the velocity in the narrow section?',
    diagram: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <!-- Wide pipe section -->
      <rect x="30" y="60" width="160" height="8" rx="2" fill="#94a3b8"/>
      <rect x="30" y="172" width="160" height="8" rx="2" fill="#94a3b8"/>
      <rect x="30" y="68" width="160" height="104" fill="#334155" opacity="0.3"/>
      <!-- Narrow pipe section -->
      <rect x="210" y="88" width="160" height="8" rx="2" fill="#94a3b8"/>
      <rect x="210" y="144" width="160" height="8" rx="2" fill="#94a3b8"/>
      <rect x="210" y="96" width="160" height="48" fill="#334155" opacity="0.3"/>
      <!-- Transition walls -->
      <line x1="190" y1="60" x2="210" y2="88" stroke="#94a3b8" stroke-width="2"/>
      <line x1="190" y1="180" x2="210" y2="152" stroke="#94a3b8" stroke-width="2"/>
      <!-- Wide section flow arrows (fewer, slower) -->
      <line x1="60" y1="120" x2="100" y2="120" stroke="#60a5fa" stroke-width="2"/>
      <polygon points="103,120 96,116 96,124" fill="#60a5fa"/>
      <line x1="120" y1="100" x2="150" y2="100" stroke="#60a5fa" stroke-width="1.5"/>
      <polygon points="153,100 147,97 147,103" fill="#60a5fa"/>
      <line x1="120" y1="140" x2="150" y2="140" stroke="#60a5fa" stroke-width="1.5"/>
      <polygon points="153,140 147,137 147,143" fill="#60a5fa"/>
      <!-- Narrow section flow arrows (more, faster) -->
      <line x1="240" y1="120" x2="300" y2="120" stroke="#60a5fa" stroke-width="3"/>
      <polygon points="305,120 296,115 296,125" fill="#60a5fa"/>
      <line x1="250" y1="108" x2="290" y2="108" stroke="#60a5fa" stroke-width="2.5"/>
      <polygon points="295,108 287,104 287,112" fill="#60a5fa"/>
      <line x1="250" y1="132" x2="290" y2="132" stroke="#60a5fa" stroke-width="2.5"/>
      <polygon points="295,132 287,128 287,136" fill="#60a5fa"/>
      <!-- Velocity labels -->
      <text x="80" y="90" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">V\u2081 = 2 m/s</text>
      <text x="255" y="85" fill="#34d399" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">V\u2082 = ?</text>
      <!-- Diameter dimensions -->
      <line x1="20" y1="68" x2="20" y2="172" stroke="#f472b6" stroke-width="1"/>
      <line x1="15" y1="68" x2="25" y2="68" stroke="#f472b6" stroke-width="1"/>
      <line x1="15" y1="172" x2="25" y2="172" stroke="#f472b6" stroke-width="1"/>
      <text x="8" y="125" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" writing-mode="tb">d\u2081=10cm</text>
      <line x1="380" y1="96" x2="380" y2="144" stroke="#f472b6" stroke-width="1"/>
      <line x1="375" y1="96" x2="385" y2="96" stroke="#f472b6" stroke-width="1"/>
      <line x1="375" y1="144" x2="385" y2="144" stroke="#f472b6" stroke-width="1"/>
      <text x="392" y="124" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" writing-mode="tb">d\u2082=5cm</text>
      <!-- Continuity equation -->
      <text x="200" y="195" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle" font-weight="bold">Continuity: A\u2081V\u2081 = A\u2082V\u2082</text>
      <!-- Area calculation -->
      <text x="200" y="215" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">A\u2081/A\u2082 = (d\u2081/d\u2082)\u00b2 = (10/5)\u00b2 = 4</text>
      <text x="200" y="235" fill="#34d399" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle" font-weight="bold">V\u2082 = V\u2081 \u00d7 4 = 8 m/s</text>
    </svg>`,
    options: [
      { id: 'a', text: '4 m/s — velocity doubles because diameter halves' },
      { id: 'b', text: '8 m/s — velocity increases by the ratio of areas (4:1)' },
      { id: 'c', text: '2 m/s — velocity is constant in a pipe' },
      { id: 'd', text: '16 m/s — velocity increases by the cube of the diameter ratio' },
    ],
    correctAnswer: 'b',
    explanation: 'By continuity: A₁V₁ = A₂V₂. The areas scale with diameter squared: A₁/A₂ = (10/5)² = 4. So V₂ = V₁ × (A₁/A₂) = 2 × 4 = 8 m/s. The common trap is thinking velocity doubles when diameter halves — it actually quadruples because area scales with d².',
    interviewInsight: 'This is a fundamental continuity equation question. The d² relationship between area and diameter is a critical insight that many candidates miss under pressure.',
    realWorldConnection: 'This is why putting your thumb over a garden hose makes the water spray faster — you are reducing the area and the velocity increases by the area ratio.',
    commonMistake: 'Saying 4 m/s (doubling instead of quadrupling). The area ratio is the square of the diameter ratio.',
    tags: ['continuity', 'velocity', 'pipe-flow', 'area', 'bernoulli'],
  },
];
