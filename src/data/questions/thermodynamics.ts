import type { Question } from '../types';

export const thermodynamicsQuestions: Question[] = [
  // THERMO-001 — Multiple Choice
  {
    id: 'thermo-001',
    type: 'multiple-choice',
    topic: 'thermodynamics',
    subtopic: 'Laws of Thermodynamics',
    difficulty: 'beginner',
    question: 'You leave the refrigerator door open in a sealed, insulated kitchen. After several hours, the kitchen temperature will:',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Insulated kitchen boundary -->
      <rect x="20" y="20" width="360" height="260" rx="6" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="200" y="16" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Sealed, Insulated Kitchen</text>
      <!-- Refrigerator body -->
      <rect x="50" y="60" width="120" height="180" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="110" y="55" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12">Refrigerator</text>
      <!-- Open door -->
      <line x1="170" y1="60" x2="200" y2="80" stroke="#94a3b8" stroke-width="2"/>
      <line x1="170" y1="240" x2="200" y2="220" stroke="#94a3b8" stroke-width="2"/>
      <line x1="200" y1="80" x2="200" y2="220" stroke="#94a3b8" stroke-width="2"/>
      <text x="195" y="155" text-anchor="start" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" transform="rotate(90,195,155)">OPEN</text>
      <!-- Cold air inside fridge -->
      <text x="110" y="130" text-anchor="middle" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="12">Q_in</text>
      <text x="110" y="150" text-anchor="middle" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="11">(cold side)</text>
      <!-- Compressor at bottom -->
      <rect x="65" y="200" width="90" height="30" rx="3" fill="#334155" stroke="#fb923c" stroke-width="2"/>
      <text x="110" y="220" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">Compressor</text>
      <!-- Work input arrow -->
      <defs>
        <marker id="thermo001-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#34d399"/></marker>
        <marker id="thermo001-arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker>
        <marker id="thermo001-arrow-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#3b82f6"/></marker>
      </defs>
      <!-- W_in from wall plug -->
      <line x1="30" y1="215" x2="60" y2="215" stroke="#34d399" stroke-width="2" marker-end="url(#thermo001-arrow)"/>
      <text x="30" y="208" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">W_in</text>
      <!-- Q_hot output to room (wavy arrow) -->
      <path d="M170,100 Q185,95 195,100 Q205,105 215,100 Q225,95 240,100" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#thermo001-arrow-red)"/>
      <path d="M170,120 Q185,115 195,120 Q205,125 215,120 Q225,115 240,120" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#thermo001-arrow-red)"/>
      <text x="260" y="105" fill="#ef4444" font-family="system-ui, sans-serif" font-size="12">Q_out = Q_in + W</text>
      <text x="260" y="125" fill="#ef4444" font-family="system-ui, sans-serif" font-size="11">(heats the room)</text>
      <!-- Room temperature indicator -->
      <text x="300" y="200" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="14" font-weight="bold">T_room &#x2191;</text>
      <text x="300" y="220" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Net heat added</text>
      <text x="300" y="235" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">= W_compressor</text>
      <!-- Energy balance box -->
      <rect x="240" y="250" width="130" height="22" rx="3" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <text x="305" y="265" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">1st Law: Energy in = Energy out</text>
    </svg>`,
    options: [
      { id: 'a', text: 'Decrease, because the fridge is cooling the room' },
      { id: 'b', text: 'Stay the same, because the cooling and heating balance out' },
      { id: 'c', text: 'Increase, because the refrigerator motor adds net energy to the room' },
      { id: 'd', text: 'Decrease initially, then increase once the compressor overheats' },
    ],
    correctAnswer: 'c',
    explanation: 'A refrigerator is a heat pump that moves thermal energy from inside the fridge to the outside (the room) plus the work input from the compressor motor. With the door open, it cools air that immediately re-enters the fridge. Meanwhile, the compressor motor converts electrical energy to heat (Q_out = Q_in + W). The net effect is the work input being added as heat to the room. The room warms up.',
    interviewInsight: 'This is a classic first-law and second-law reasoning question. It tests whether you understand that a refrigerator is not a cold-generator — it is a heat mover with an energy cost.',
    realWorldConnection: 'This principle is why data center cooling is such a massive energy cost. Every watt of compute generates heat that must be moved, and the moving itself adds more heat.',
    commonMistake: 'Thinking the room cools down or stays the same. People forget about the compressor work input, which is always positive and always ends up as heat.',
    tags: ['first-law', 'refrigerator', 'heat-pump', 'COP', 'energy-balance'],
  },

  // THERMO-002 — Ranking
  {
    id: 'thermo-002',
    type: 'ranking',
    topic: 'thermodynamics',
    subtopic: 'Power & Refrigeration Cycles',
    difficulty: 'intermediate',
    question: 'Rank these power cycles by typical thermal efficiency (highest first) when operating between the same temperature limits:',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="thermo002-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#94a3b8"/></marker>
      </defs>
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Typical Thermal Efficiency Comparison</text>
      <!-- Y-axis -->
      <line x1="55" y1="35" x2="55" y2="260" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#thermo002-arrow)"/>
      <text x="18" y="150" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" transform="rotate(-90,18,150)">Thermal Efficiency (%)</text>
      <!-- Y-axis ticks -->
      <line x1="50" y1="248" x2="55" y2="248" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="252" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">0</text>
      <line x1="50" y1="212" x2="55" y2="212" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="216" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">20</text>
      <line x1="50" y1="176" x2="55" y2="176" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="180" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">40</text>
      <line x1="50" y1="140" x2="55" y2="140" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="144" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">60</text>
      <line x1="50" y1="104" x2="55" y2="104" stroke="#94a3b8" stroke-width="1"/>
      <text x="45" y="108" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">80</text>
      <!-- X-axis -->
      <line x1="55" y1="248" x2="385" y2="248" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Bars: Carnot ~65% -->
      <rect x="70" y="131" width="50" height="117" rx="2" fill="#60a5fa" opacity="0.8"/>
      <text x="95" y="126" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">~65%</text>
      <text x="95" y="268" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Carnot</text>
      <text x="95" y="279" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">(ideal)</text>
      <!-- Combined cycle ~60% -->
      <rect x="135" y="140" width="50" height="108" rx="2" fill="#34d399" opacity="0.8"/>
      <text x="160" y="135" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">~60%</text>
      <text x="160" y="268" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Combined</text>
      <text x="160" y="279" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">(gas+steam)</text>
      <!-- Otto ~30% -->
      <rect x="200" y="194" width="50" height="54" rx="2" fill="#f472b6" opacity="0.8"/>
      <text x="225" y="189" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">~30%</text>
      <text x="225" y="268" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Otto</text>
      <text x="225" y="279" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">(gasoline)</text>
      <!-- Brayton ~28% -->
      <rect x="265" y="198" width="50" height="50" rx="2" fill="#fb923c" opacity="0.8"/>
      <text x="290" y="193" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">~28%</text>
      <text x="290" y="268" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Brayton</text>
      <text x="290" y="279" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">(gas turb.)</text>
      <!-- Rankine ~35% -->
      <rect x="330" y="185" width="50" height="63" rx="2" fill="#a78bfa" opacity="0.8"/>
      <text x="355" y="180" text-anchor="middle" fill="#a78bfa" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">~35%</text>
      <text x="355" y="268" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Rankine</text>
      <text x="355" y="279" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">(steam)</text>
      <!-- Temperature limits label -->
      <text x="220" y="295" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" font-style="italic">Same T_hot and T_cold limits for all cycles</text>
    </svg>`,
    items: [
      { id: 'a', text: 'Carnot cycle (theoretical ideal)' },
      { id: 'b', text: 'Combined gas-steam cycle (modern power plant)' },
      { id: 'c', text: 'Simple Rankine cycle (coal power plant)' },
      { id: 'd', text: 'Otto cycle (gasoline car engine)' },
      { id: 'e', text: 'Simple Brayton cycle (single gas turbine)' },
    ],
    correctOrder: ['a', 'b', 'd', 'e', 'c'],
    explanation: 'Carnot is always the theoretical max (~60-70% for typical limits). Combined cycle plants achieve 55-62% by cascading a gas turbine (Brayton) with a steam turbine (Rankine). The Otto cycle in modern engines reaches 25-35%. A simple Brayton (gas turbine) achieves 25-35%. A simple Rankine cycle typically achieves 30-40%, but when constrained to the same temperature limits as the others, its efficiency is limited by the saturation temperature of water.',
    interviewInsight: 'Knowing the relative efficiencies of real cycles shows practical knowledge. Interviewers want to see that you understand WHY combined cycle is better — it captures waste heat from one cycle to drive another.',
    realWorldConnection: 'Combined-cycle gas turbines (CCGT) have revolutionized power generation, achieving efficiencies above 60%. This is why many new power plants use this technology.',
    commonMistake: 'Putting Carnot last because "it is just theoretical." Also, not realizing that combined cycle can get remarkably close to Carnot efficiency for practical applications.',
    tags: ['thermal-efficiency', 'carnot', 'rankine', 'otto', 'brayton', 'combined-cycle'],
  },

  // THERMO-003 — Two Choice Tradeoff
  {
    id: 'thermo-003',
    type: 'two-choice-tradeoff',
    topic: 'thermodynamics',
    subtopic: 'Applied Thermodynamics',
    difficulty: 'intermediate',
    question: 'A building needs heating in winter. Should you use electric resistance heating or a heat pump?',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="thermo003-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#34d399"/></marker>
        <marker id="thermo003-arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker>
        <marker id="thermo003-arr-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#3b82f6"/></marker>
      </defs>
      <text x="200" y="16" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Energy Flow Comparison</text>
      <!-- Left side: Resistance Heater -->
      <text x="100" y="38" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Resistance Heater</text>
      <rect x="45" y="100" width="110" height="50" rx="4" fill="#334155" stroke="#f472b6" stroke-width="2"/>
      <text x="100" y="122" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Resistance</text>
      <text x="100" y="138" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Heater</text>
      <!-- W_in arrow -->
      <line x1="100" y1="55" x2="100" y2="95" stroke="#34d399" stroke-width="2" marker-end="url(#thermo003-arr)"/>
      <text x="125" y="75" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">W = 1 kW</text>
      <!-- Q_out arrow -->
      <line x1="100" y1="155" x2="100" y2="195" stroke="#ef4444" stroke-width="2" marker-end="url(#thermo003-arr-red)"/>
      <text x="125" y="182" fill="#ef4444" font-family="system-ui, sans-serif" font-size="11">Q = 1 kW</text>
      <!-- Room -->
      <rect x="55" y="200" width="90" height="35" rx="4" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="100" y="222" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Room</text>
      <!-- COP label -->
      <text x="100" y="255" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">COP = 1</text>
      <!-- Right side: Heat Pump -->
      <text x="300" y="38" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Heat Pump</text>
      <rect x="245" y="100" width="110" height="50" rx="4" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <text x="300" y="122" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Heat</text>
      <text x="300" y="138" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Pump</text>
      <!-- W_in arrow -->
      <line x1="300" y1="55" x2="300" y2="95" stroke="#34d399" stroke-width="2" marker-end="url(#thermo003-arr)"/>
      <text x="325" y="75" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">W = 1 kW</text>
      <!-- Q_cold from outside -->
      <line x1="225" y1="125" x2="242" y2="125" stroke="#3b82f6" stroke-width="2" marker-end="url(#thermo003-arr-blue)"/>
      <text x="210" y="115" text-anchor="end" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="10">Q_cold</text>
      <text x="210" y="128" text-anchor="end" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="10">2.5 kW</text>
      <text x="210" y="141" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">(from outdoors)</text>
      <!-- Q_hot output to room -->
      <line x1="300" y1="155" x2="300" y2="195" stroke="#ef4444" stroke-width="3" marker-end="url(#thermo003-arr-red)"/>
      <text x="335" y="182" fill="#ef4444" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Q = 3.5 kW</text>
      <!-- Room -->
      <rect x="255" y="200" width="90" height="35" rx="4" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="300" y="222" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Room</text>
      <!-- COP label -->
      <text x="300" y="255" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">COP = 3.5</text>
      <!-- Divider -->
      <line x1="200" y1="30" x2="200" y2="270" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- Bottom comparison -->
      <text x="200" y="285" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">Same 1 kW electricity input &#x2192; 3.5x more heat with heat pump</text>
    </svg>`,
    choices: [
      {
        id: 'a',
        text: 'Electric resistance heater — converts electricity directly to heat',
        pros: ['Low upfront cost', 'Simple installation, no outdoor unit needed', 'Works at any outdoor temperature', '100% conversion efficiency (COP = 1)'],
        cons: ['Maximum COP is 1 — one unit of heat per unit of electricity', 'High operating costs', 'Purely converts high-grade energy (electricity) to low-grade energy (heat)'],
      },
      {
        id: 'b',
        text: 'Heat pump — moves heat from outdoors to indoors',
        pros: ['COP of 2.5-4.5 in moderate climates — 2.5 to 4.5 units of heat per unit of electricity', 'Much lower operating costs', 'Can reverse to provide cooling in summer', 'Lower carbon footprint per unit of heat'],
        cons: ['Higher upfront cost (2-3x more)', 'Performance degrades in very cold weather (COP drops below 2)', 'Requires outdoor unit and refrigerant lines', 'More complex maintenance'],
      },
    ],
    preferredAnswer: 'b',
    acceptableAnswer: 'either',
    justification: 'In most climates, a heat pump is far more efficient because it moves existing thermal energy rather than creating it from electricity. The COP advantage means 2.5-4.5x less electricity consumption. However, in extremely cold climates (below -15°C regularly), resistance heating or a dual-fuel system may be more practical.',
    explanation: 'A heat pump exploits the second law of thermodynamics: it takes low-grade ambient heat and "upgrades" it using work input. The total heat delivered is Q_cold + W, which is always greater than W alone. This is the thermodynamic reason heat pumps can have COP > 1 — they are not creating energy, they are moving it.',
    interviewInsight: 'This question tests whether you truly understand COP and the second law. The insight that a heat pump delivers more heat than the electricity it consumes is counterintuitive to many people.',
    commonMistake: 'Saying "nothing can be more than 100% efficient" and therefore doubting COP > 1. COP is not the same as thermodynamic efficiency — it is a ratio of useful heat to work input.',
    tags: ['heat-pump', 'COP', 'efficiency', 'HVAC', 'second-law', 'energy'],
  },

  // THERMO-004 — Free Text
  {
    id: 'thermo-004',
    type: 'free-text',
    topic: 'thermodynamics',
    subtopic: 'Laws of Thermodynamics',
    difficulty: 'intermediate',
    question: 'Explain entropy to a non-engineer in 60 seconds. Then explain why it matters for engineering design.',
    diagram: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Entropy: Energy Dispersal</text>
      <!-- Left: concentrated energy (low entropy) -->
      <rect x="30" y="50" width="140" height="140" rx="6" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="100" y="45" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Low Entropy</text>
      <!-- Hot coffee cup -->
      <rect x="65" y="85" width="70" height="50" rx="4" fill="#334155" stroke="#ef4444" stroke-width="2"/>
      <text x="100" y="115" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="11">HOT</text>
      <!-- Steam lines above cup -->
      <path d="M80,80 Q82,70 85,75 Q88,80 90,70" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.7"/>
      <path d="M100,80 Q102,70 105,75 Q108,80 110,70" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.7"/>
      <!-- Cool surroundings dots -->
      <circle cx="50" cy="165" r="3" fill="#3b82f6" opacity="0.4"/>
      <circle cx="70" cy="170" r="3" fill="#3b82f6" opacity="0.4"/>
      <circle cx="130" cy="160" r="3" fill="#3b82f6" opacity="0.4"/>
      <circle cx="145" cy="175" r="3" fill="#3b82f6" opacity="0.4"/>
      <text x="100" y="155" text-anchor="middle" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="10">cool surroundings</text>
      <!-- Arrow: time -->
      <defs>
        <marker id="thermo004-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#34d399"/></marker>
      </defs>
      <line x1="180" y1="120" x2="218" y2="120" stroke="#34d399" stroke-width="2.5" marker-end="url(#thermo004-arrow)"/>
      <text x="200" y="112" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">time</text>
      <!-- Right: dispersed energy (high entropy) -->
      <rect x="230" y="50" width="140" height="140" rx="6" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="300" y="45" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">High Entropy</text>
      <!-- Warm coffee cup (lukewarm) -->
      <rect x="265" y="85" width="70" height="50" rx="4" fill="#334155" stroke="#fb923c" stroke-width="1.5"/>
      <text x="300" y="115" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">warm</text>
      <!-- Warm surroundings dots -->
      <circle cx="245" cy="160" r="3" fill="#fb923c" opacity="0.5"/>
      <circle cx="260" cy="172" r="3" fill="#fb923c" opacity="0.5"/>
      <circle cx="280" cy="165" r="3" fill="#fb923c" opacity="0.5"/>
      <circle cx="320" cy="168" r="3" fill="#fb923c" opacity="0.5"/>
      <circle cx="340" cy="158" r="3" fill="#fb923c" opacity="0.5"/>
      <circle cx="355" cy="172" r="3" fill="#fb923c" opacity="0.5"/>
      <text x="300" y="155" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">warm surroundings</text>
      <!-- Bottom labels -->
      <text x="100" y="208" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Energy concentrated</text>
      <text x="100" y="222" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">(useful, can do work)</text>
      <text x="300" y="208" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Energy spread out</text>
      <text x="300" y="222" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">(less useful for work)</text>
      <!-- S arrow -->
      <text x="200" y="245" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="12">S_universe always increases &#x2192; spontaneous direction</text>
    </svg>`,
    sampleAnswer: 'For a non-engineer: Entropy measures the "spreading out" of energy. Hot coffee cools down because its concentrated thermal energy spontaneously disperses into the surrounding air. Energy always spreads from concentrated to dispersed — that is the second law. You never see a cold coffee spontaneously get hot by pulling heat from the room, even though the first law (energy conservation) would allow it.\n\nFor engineering: Entropy tells us that every energy conversion wastes something. A car engine cannot convert all fuel energy to motion — some must become waste heat. Entropy sets the theoretical limit on efficiency for any thermal system (Carnot limit). It determines how much useful work we can extract, how to size heat rejection systems, and why perpetual motion machines are impossible.',
    keyPoints: [
      'Entropy measures energy dispersal / disorder',
      'Second law: entropy of an isolated system always increases',
      'Sets theoretical efficiency limits (Carnot)',
      'Every real process generates entropy — wasted potential for work',
      'Determines the direction of spontaneous processes',
    ],
    explanation: 'The ability to explain entropy simply is a hallmark of deep understanding. Engineers who can bridge technical concepts to plain language are more effective communicators and leaders.',
    interviewInsight: 'Communication skills matter as much as technical knowledge. If you can explain entropy clearly, you demonstrate mastery of the concept AND the ability to work with non-technical stakeholders.',
    commonMistake: 'Using the vague "disorder" analogy without connecting it to energy. Also, getting lost in mathematical definitions instead of building intuition first.',
    tags: ['entropy', 'second-law', 'communication', 'fundamentals', 'thermodynamics'],
  },

  // THERMO-005 — Multiple Choice
  {
    id: 'thermo-005',
    type: 'multiple-choice',
    topic: 'thermodynamics',
    subtopic: 'Properties & State',
    difficulty: 'beginner',
    question: 'Water boils at 100°C at sea level. On top of Mount Everest (atmospheric pressure ~34 kPa), it boils at roughly:',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="thermo005-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#94a3b8"/></marker>
      </defs>
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Phase Diagram: Pressure vs Temperature</text>
      <!-- Axes -->
      <line x1="60" y1="260" x2="380" y2="260" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#thermo005-arrow)"/>
      <line x1="60" y1="260" x2="60" y2="30" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#thermo005-arrow)"/>
      <text x="220" y="290" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12">Temperature (&#xB0;C)</text>
      <text x="20" y="145" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" transform="rotate(-90,20,145)">Pressure (kPa)</text>
      <!-- Liquid-vapor curve (vaporization line) -->
      <path d="M90,240 Q150,210 200,170 Q250,120 310,75 Q340,55 360,40" fill="none" stroke="#60a5fa" stroke-width="2.5"/>
      <!-- Region labels -->
      <text x="130" y="100" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">LIQUID</text>
      <text x="300" y="200" fill="#ef4444" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">VAPOR</text>
      <!-- Sea level point: 101.3 kPa, 100°C -->
      <circle cx="262" cy="108" r="6" fill="#34d399" stroke="#34d399" stroke-width="1"/>
      <line x1="60" y1="108" x2="256" y2="108" stroke="#34d399" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="262" y1="108" x2="262" y2="260" stroke="#34d399" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="56" y="108" text-anchor="end" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">101.3</text>
      <text x="262" y="274" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">100&#xB0;C</text>
      <text x="270" y="100" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Sea level</text>
      <!-- Everest point: 34 kPa, ~70°C -->
      <circle cx="192" cy="180" r="6" fill="#f472b6" stroke="#f472b6" stroke-width="1"/>
      <line x1="60" y1="180" x2="186" y2="180" stroke="#f472b6" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="192" y1="180" x2="192" y2="260" stroke="#f472b6" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="56" y="180" text-anchor="end" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">34</text>
      <text x="192" y="274" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">~70&#xB0;C</text>
      <text x="200" y="197" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">Mt. Everest</text>
      <!-- Annotation -->
      <text x="330" y="250" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" font-style="italic">Lower P &#x2192; Lower T_boil</text>
    </svg>`,
    options: [
      { id: 'a', text: '100°C — boiling point is a material property that does not change' },
      { id: 'b', text: '70°C — lower pressure means lower boiling point' },
      { id: 'c', text: '120°C — lower pressure means water needs more energy to boil' },
      { id: 'd', text: '100°C — pressure only affects the freezing point, not the boiling point' },
    ],
    correctAnswer: 'b',
    explanation: 'Boiling occurs when the vapor pressure of the liquid equals the surrounding pressure. At lower atmospheric pressure, less energy (lower temperature) is needed for the vapor pressure to reach this threshold. At ~34 kPa (Everest summit), water boils at roughly 70°C. This is why pressure cookers work in reverse — high pressure raises the boiling point, cooking food faster.',
    interviewInsight: 'This tests understanding of phase behavior and the Clausius-Clapeyron relationship. It also connects to practical engineering: vacuum systems, pressure vessels, and boiler design.',
    realWorldConnection: 'This is why you cannot make a good cup of tea on Everest — the water is not hot enough when it boils. It is also why power plant condensers operate under vacuum, and why cavitation occurs in pumps.',
    commonMistake: 'Thinking boiling point is a fixed material constant. It depends on pressure — that is the entire basis of the steam tables.',
    tags: ['boiling-point', 'pressure', 'phase-change', 'vapor-pressure', 'altitude'],
  },

  // THERMO-006 — Estimation
  {
    id: 'thermo-006',
    type: 'estimation',
    topic: 'thermodynamics',
    subtopic: 'Applied Thermodynamics',
    difficulty: 'advanced',
    question: 'Estimate the thermal efficiency of a typical car engine and calculate how much fuel energy is wasted as heat per gallon of gasoline.',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="thermo006-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#34d399"/></marker>
        <marker id="thermo006-arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker>
      </defs>
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Energy Flow: 1 Gallon of Gasoline (120 MJ)</text>
      <!-- Fuel input arrow (wide) -->
      <rect x="10" y="100" width="70" height="60" rx="3" fill="#334155" stroke="#fb923c" stroke-width="2"/>
      <text x="45" y="125" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">Fuel</text>
      <text x="45" y="142" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">120 MJ</text>
      <!-- Engine block -->
      <rect x="120" y="80" width="110" height="100" rx="5" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="175" y="115" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Engine</text>
      <text x="175" y="135" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">&#x3B7; &#x2248; 30%</text>
      <text x="175" y="150" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">(Otto cycle)</text>
      <!-- Arrow fuel to engine -->
      <line x1="83" y1="130" x2="116" y2="130" stroke="#fb923c" stroke-width="3" marker-end="url(#thermo006-arr)"/>
      <!-- Useful work output -->
      <line x1="234" y1="110" x2="284" y2="110" stroke="#34d399" stroke-width="3" marker-end="url(#thermo006-arr)"/>
      <rect x="288" y="90" width="100" height="40" rx="3" fill="none" stroke="#34d399" stroke-width="2"/>
      <text x="338" y="108" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">Useful Work</text>
      <text x="338" y="124" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">36 MJ (30%)</text>
      <!-- Waste heat outputs -->
      <!-- Exhaust -->
      <line x1="175" y1="184" x2="175" y2="210" stroke="#ef4444" stroke-width="2" marker-end="url(#thermo006-arr-red)"/>
      <rect x="120" y="213" width="55" height="45" rx="3" fill="none" stroke="#ef4444" stroke-width="1.5"/>
      <text x="148" y="229" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">Exhaust</text>
      <text x="148" y="245" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">~40 MJ</text>
      <!-- Coolant -->
      <line x1="234" y1="155" x2="265" y2="175" stroke="#ef4444" stroke-width="2" marker-end="url(#thermo006-arr-red)"/>
      <rect x="245" y="178" width="58" height="45" rx="3" fill="none" stroke="#ef4444" stroke-width="1.5"/>
      <text x="274" y="194" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">Coolant</text>
      <text x="274" y="210" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">~30 MJ</text>
      <!-- Friction/radiation -->
      <line x1="310" y1="155" x2="340" y2="175" stroke="#ef4444" stroke-width="1.5" marker-end="url(#thermo006-arr-red)"/>
      <rect x="315" y="178" width="70" height="45" rx="3" fill="none" stroke="#ef4444" stroke-width="1.5"/>
      <text x="350" y="194" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">Friction/Rad.</text>
      <text x="350" y="210" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">~14 MJ</text>
      <!-- Total waste -->
      <rect x="120" y="260" width="268" height="18" rx="2" fill="none" stroke="#f472b6" stroke-width="1"/>
      <text x="254" y="274" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">Total waste heat: 84 MJ (70%) &#x2248; 47 space heaters for 1 hour</text>
    </svg>`,
    hints: [
      'A gallon of gasoline contains roughly 120 MJ (33.4 kWh) of chemical energy',
      'Think about the typical efficiency of a spark-ignition engine',
      'Consider where the waste heat goes: exhaust, coolant, radiation',
    ],
    acceptableRange: { low: 70, high: 100, unit: 'MJ wasted per gallon', bestEstimate: 84 },
    approachSteps: [
      'A typical gasoline car engine has a thermal efficiency of 25-30%. Take 30% as a reasonable modern estimate.',
      'Energy per gallon of gasoline ≈ 120 MJ',
      'Useful work = 0.30 × 120 = 36 MJ',
      'Wasted as heat = 120 - 36 = 84 MJ per gallon',
      'Breakdown: roughly 1/3 exhaust heat, 1/3 coolant heat, 1/3 useful work (with some to friction and accessories)',
      'At 30 mpg and 60 mph, this is about 168 MJ/hr ≈ 47 kW of waste heat — equivalent to 47 space heaters!',
    ],
    explanation: 'A car engine is fundamentally a heat engine limited by Carnot efficiency. With combustion temperatures around 2000K and exhaust at 800K, Carnot efficiency would be ~60%. Real engines achieve about half that due to irreversibilities, friction, and incomplete combustion.',
    interviewInsight: 'This question tests order-of-magnitude thinking and thermodynamic intuition. Showing the "equivalent space heaters" calculation demonstrates the ability to make abstract numbers tangible.',
    commonMistake: 'Overestimating engine efficiency (many people guess 50-60%). Modern gasoline engines are still only 25-35% efficient, which is why electrification is such a game-changer.',
    tags: ['efficiency', 'engine', 'waste-heat', 'estimation', 'gasoline', 'automotive'],
  },

  // THERMO-007 — Spot the Flaw
  {
    id: 'thermo-007',
    type: 'spot-the-flaw',
    topic: 'thermodynamics',
    subtopic: 'Laws of Thermodynamics',
    difficulty: 'intermediate',
    question: 'Spot the flaw in this claim about air conditioning:',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="thermo007-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#60a5fa"/></marker>
        <marker id="thermo007-arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker>
        <marker id="thermo007-arr-grn" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#34d399"/></marker>
      </defs>
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Air Conditioner Energy Balance (COP = 4)</text>
      <!-- Cold room (left) -->
      <rect x="20" y="70" width="110" height="120" rx="5" fill="none" stroke="#3b82f6" stroke-width="2"/>
      <text x="75" y="60" text-anchor="middle" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Cold Room</text>
      <text x="75" y="120" text-anchor="middle" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="12">Q_cold</text>
      <text x="75" y="140" text-anchor="middle" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="14" font-weight="bold">4 kW</text>
      <text x="75" y="160" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">(heat removed)</text>
      <!-- AC unit (center) -->
      <rect x="155" y="80" width="90" height="100" rx="5" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="200" y="115" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">A/C</text>
      <text x="200" y="133" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Unit</text>
      <text x="200" y="155" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">COP = 4</text>
      <!-- Hot outdoors (right) -->
      <rect x="270" y="70" width="110" height="120" rx="5" fill="none" stroke="#ef4444" stroke-width="2"/>
      <text x="325" y="60" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Hot Outdoors</text>
      <text x="325" y="120" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="12">Q_hot</text>
      <text x="325" y="140" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="14" font-weight="bold">5 kW</text>
      <text x="325" y="160" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">(heat rejected)</text>
      <!-- Q_cold arrow -->
      <line x1="133" y1="130" x2="152" y2="130" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#thermo007-arr)"/>
      <!-- Q_hot arrow -->
      <line x1="248" y1="130" x2="267" y2="130" stroke="#ef4444" stroke-width="2.5" marker-end="url(#thermo007-arr-red)"/>
      <!-- W_in arrow from top -->
      <line x1="200" y1="40" x2="200" y2="76" stroke="#34d399" stroke-width="2.5" marker-end="url(#thermo007-arr-grn)"/>
      <text x="200" y="35" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">W = 1 kW</text>
      <!-- Energy balance equation -->
      <rect x="60" y="210" width="280" height="55" rx="4" fill="none" stroke="#34d399" stroke-width="1.5"/>
      <text x="200" y="230" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">1st Law: Q_hot = Q_cold + W</text>
      <text x="200" y="248" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">5 kW = 4 kW + 1 kW  &#x2714; Energy conserved!</text>
      <!-- No violation note -->
      <text x="200" y="275" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11" font-style="italic">No energy is created. COP &gt; 1 means heat is MOVED, not created.</text>
    </svg>`,
    statement: 'An air conditioner with a COP of 4 is 400% efficient, meaning it creates 4 times more cooling energy than the electrical energy it consumes. This violates conservation of energy but is allowed by the second law of thermodynamics.',
    flaw: {
      text: 'This violates conservation of energy but is allowed by the second law of thermodynamics.',
      flawIndex: 2,
      flawExplanation: 'A COP of 4 does NOT violate conservation of energy. The system absorbs Q_cold from the room and adds work W from the compressor, then rejects Q_hot = Q_cold + W to the outdoors. Energy is perfectly conserved. COP = Q_cold/W = 4 means the device moves 4 units of heat for every 1 unit of work, but it also rejects 5 units total outside. No energy is created.',
    },
    correctedStatement: 'An air conditioner with a COP of 4 moves 4 units of thermal energy from the cold space for every 1 unit of electrical work input. This is perfectly consistent with conservation of energy — the total heat rejected to the hot side equals Q_cold + W. COP is not "efficiency" in the thermodynamic sense, and no energy is created.',
    explanation: 'COP > 1 confuses many people into thinking energy is being created. The key insight is that the heat pump is MOVING existing thermal energy, not creating it. The work input is the "payment" to move heat from cold to hot, which would not happen spontaneously.',
    interviewInsight: 'This reveals whether you can think clearly about energy balances and distinguish between COP and thermodynamic efficiency. Many practicing engineers get confused by COP > 1.',
    commonMistake: 'Accepting the "violates conservation" claim or struggling to explain why COP > 1 is legitimate.',
    tags: ['COP', 'first-law', 'second-law', 'air-conditioning', 'energy-conservation'],
  },

  // THERMO-008 — Multi-Select
  {
    id: 'thermo-008',
    type: 'multi-select',
    topic: 'thermodynamics',
    subtopic: 'Power & Refrigeration Cycles',
    difficulty: 'advanced',
    question: 'Which of the following modifications to a simple Rankine cycle will INCREASE its thermal efficiency? (Select all that apply)',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="thermo008-arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#60a5fa"/></marker>
        <marker id="thermo008-arr-grn" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#34d399"/></marker>
      </defs>
      <text x="200" y="16" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">T-s Diagram: Rankine Cycle Modifications</text>
      <!-- Axes -->
      <line x1="50" y1="265" x2="380" y2="265" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="50" y1="265" x2="50" y2="25" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="215" y="290" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Entropy, s (kJ/kg&#xB7;K)</text>
      <text x="18" y="145" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" transform="rotate(-90,18,145)">Temperature, T (K)</text>
      <!-- Saturation dome -->
      <path d="M110,240 Q140,170 170,120 Q195,80 220,60 Q245,80 270,120 Q300,170 330,240" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="220" y="55" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">critical point</text>
      <!-- Simple Rankine cycle (solid blue) -->
      <!-- State 1 (condenser exit) to State 2 (boiler entry - pump) -->
      <line x1="115" y1="235" x2="115" y2="130" stroke="#60a5fa" stroke-width="2" marker-end="url(#thermo008-arr)"/>
      <!-- State 2 to State 3 (boiling at constant T to sat vapor) -->
      <line x1="115" y1="130" x2="265" y2="130" stroke="#60a5fa" stroke-width="2" marker-end="url(#thermo008-arr)"/>
      <!-- State 3 to State 4 (expansion in turbine) -->
      <path d="M265,130 Q290,180 310,235" fill="none" stroke="#60a5fa" stroke-width="2" marker-end="url(#thermo008-arr)"/>
      <!-- State 4 back to State 1 (condensing) -->
      <line x1="310" y1="235" x2="115" y2="235" stroke="#60a5fa" stroke-width="2" marker-end="url(#thermo008-arr)"/>
      <!-- State labels -->
      <circle cx="115" cy="235" r="3" fill="#60a5fa"/>
      <text x="100" y="248" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">1</text>
      <circle cx="115" cy="130" r="3" fill="#60a5fa"/>
      <text x="100" y="128" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">2</text>
      <circle cx="265" cy="130" r="3" fill="#60a5fa"/>
      <text x="272" y="125" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">3</text>
      <circle cx="310" cy="235" r="3" fill="#60a5fa"/>
      <text x="317" y="248" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">4</text>
      <!-- Superheating modification (dashed green, extends from 3 rightward and up) -->
      <path d="M265,130 L265,80" fill="none" stroke="#34d399" stroke-width="2" stroke-dasharray="5,3"/>
      <line x1="265" y1="80" x2="290" y2="80" stroke="#34d399" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#thermo008-arr-grn)"/>
      <text x="292" y="75" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">3' (superheat)</text>
      <!-- Expansion from superheated state -->
      <path d="M290,80 Q320,155 340,235" fill="none" stroke="#34d399" stroke-width="1.5" stroke-dasharray="5,3"/>
      <!-- Higher boiler pressure modification annotation -->
      <path d="M115,95 L240,95" fill="none" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="178" y="89" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">Higher P_boiler</text>
      <!-- Reheat annotation -->
      <text x="355" y="75" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Reheat</text>
      <path d="M340,80 L340,130 L360,130" fill="none" stroke="#fb923c" stroke-width="1.5" stroke-dasharray="3,3"/>
      <!-- Condenser pressure labels -->
      <text x="210" y="252" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">T_condenser (low P = better)</text>
      <!-- Legend -->
      <line x1="55" y1="280" x2="75" y2="280" stroke="#60a5fa" stroke-width="2"/>
      <text x="78" y="284" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">Simple Rankine</text>
      <line x1="155" y1="280" x2="175" y2="280" stroke="#34d399" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="178" y="284" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">Superheat</text>
      <line x1="230" y1="280" x2="250" y2="280" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="253" y="284" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">Higher P</text>
      <line x1="300" y1="280" x2="320" y2="280" stroke="#fb923c" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="323" y="284" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Reheat</text>
    </svg>`,
    options: [
      { id: 'a', text: 'Superheating the steam beyond the saturation temperature before the turbine' },
      { id: 'b', text: 'Increasing the condenser pressure (higher heat rejection temperature)' },
      { id: 'c', text: 'Increasing the boiler pressure (higher average heat input temperature)' },
      { id: 'd', text: 'Adding a feedwater heater (regeneration) to preheat water entering the boiler' },
      { id: 'e', text: 'Adding a reheat stage between high-pressure and low-pressure turbines' },
    ],
    correctAnswers: ['a', 'c', 'd', 'e'],
    explanation: 'Raising the average temperature at which heat is added (superheating, higher boiler pressure, reheat) increases efficiency per the Carnot principle. Regeneration (feedwater heater) raises the average temperature of heat addition by using extracted steam to preheat feedwater. Increasing condenser pressure is WRONG — it raises the heat rejection temperature, which DECREASES efficiency. You want the condenser as cold (low pressure) as possible.',
    interviewInsight: 'This is a standard power engineering interview question. It tests whether you understand the link between the Carnot principle and practical cycle modifications.',
    commonMistake: 'Selecting option (b) — increasing condenser pressure. Higher rejection temperature hurts efficiency. Students sometimes confuse "higher pressure = better" as a blanket rule.',
    tags: ['rankine', 'superheat', 'reheat', 'regeneration', 'boiler-pressure', 'efficiency'],
  },
];
