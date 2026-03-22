import type { Question } from '../types';

export const heatTransferQuestions: Question[] = [
  // HT-001 — Ranking
  {
    id: 'ht-001',
    type: 'ranking',
    topic: 'heat-transfer',
    subtopic: 'Conduction',
    difficulty: 'intermediate',
    question: 'Rank these heat transfer mechanisms by importance in cooling a laptop computer (most important first):',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ht001-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker>
        <marker id="ht001-arr-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#60a5fa"/></marker>
        <marker id="ht001-arr-grn" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#34d399"/></marker>
      </defs>
      <text x="200" y="16" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Laptop Thermal Path</text>
      <!-- CPU die -->
      <rect x="30" y="110" width="50" height="30" rx="2" fill="#ef4444" opacity="0.3" stroke="#ef4444" stroke-width="2"/>
      <text x="55" y="130" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">CPU</text>
      <text x="55" y="100" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">~95&#xB0;C</text>
      <!-- Thermal paste -->
      <rect x="85" y="118" width="20" height="14" rx="1" fill="#fb923c" opacity="0.5" stroke="#fb923c" stroke-width="1.5"/>
      <text x="95" y="148" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8">Thermal</text>
      <text x="95" y="158" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8">paste</text>
      <!-- Heat spreader -->
      <rect x="110" y="108" width="45" height="34" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="133" y="128" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="8">Spreader</text>
      <!-- Heat pipe -->
      <rect x="160" y="120" width="80" height="10" rx="5" fill="#334155" stroke="#60a5fa" stroke-width="1.5"/>
      <text x="200" y="115" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="8">Heat Pipe</text>
      <!-- Heat sink fins -->
      <rect x="245" y="95" width="60" height="60" rx="2" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="255" y1="95" x2="255" y2="155" stroke="#94a3b8" stroke-width="1"/>
      <line x1="265" y1="95" x2="265" y2="155" stroke="#94a3b8" stroke-width="1"/>
      <line x1="275" y1="95" x2="275" y2="155" stroke="#94a3b8" stroke-width="1"/>
      <line x1="285" y1="95" x2="285" y2="155" stroke="#94a3b8" stroke-width="1"/>
      <line x1="295" y1="95" x2="295" y2="155" stroke="#94a3b8" stroke-width="1"/>
      <text x="275" y="87" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="8">Heat Sink</text>
      <!-- Fan -->
      <circle cx="340" cy="125" r="25" fill="none" stroke="#34d399" stroke-width="1.5"/>
      <text x="340" y="129" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">Fan</text>
      <path d="M330,110 Q340,120 350,110" fill="none" stroke="#34d399" stroke-width="1"/>
      <path d="M330,140 Q340,130 350,140" fill="none" stroke="#34d399" stroke-width="1"/>
      <!-- Airflow arrows -->
      <line x1="365" y1="115" x2="385" y2="105" stroke="#34d399" stroke-width="1.5" marker-end="url(#ht001-arr-grn)"/>
      <line x1="365" y1="125" x2="390" y2="125" stroke="#34d399" stroke-width="1.5" marker-end="url(#ht001-arr-grn)"/>
      <line x1="365" y1="135" x2="385" y2="145" stroke="#34d399" stroke-width="1.5" marker-end="url(#ht001-arr-grn)"/>
      <!-- Conduction arrow path (red, dominant) -->
      <path d="M80,125 L108,125" fill="none" stroke="#ef4444" stroke-width="2.5" marker-end="url(#ht001-arr)"/>
      <!-- Labels for each stage -->
      <text x="55" y="175" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">#1 Conduction</text>
      <text x="55" y="187" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">(bottleneck!)</text>
      <text x="275" y="175" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">#2 Forced Conv.</text>
      <text x="275" y="187" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">(fan + fins)</text>
      <!-- Bottom: natural convection and radiation from chassis -->
      <rect x="60" y="210" width="280" height="25" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
      <text x="200" y="227" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Laptop Chassis (~50&#xB0;C surface)</text>
      <!-- Natural convection from bottom -->
      <path d="M120,238 Q122,250 125,258" fill="none" stroke="#f472b6" stroke-width="1.5" marker-end="url(#ht001-arr-blue)"/>
      <path d="M180,238 Q182,250 185,258" fill="none" stroke="#f472b6" stroke-width="1.5" marker-end="url(#ht001-arr-blue)"/>
      <text x="155" y="272" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">#3 Natural Conv.</text>
      <!-- Radiation wavy arrows -->
      <path d="M280,238 Q283,245 286,242 Q289,239 292,246 Q295,253 298,250" fill="none" stroke="#94a3b8" stroke-width="1" marker-end="url(#ht001-arr-blue)"/>
      <text x="310" y="272" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">#4 Radiation</text>
      <text x="310" y="280" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">(minimal)</text>
      <!-- Thermal resistance chain -->
      <text x="200" y="45" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Thermal Resistance Chain: R_die &#x2192; R_paste &#x2192; R_spreader &#x2192; R_pipe &#x2192; R_sink &#x2192; R_conv</text>
      <rect x="30" y="35" width="340" height="18" rx="2" fill="none" stroke="#60a5fa" stroke-width="1" stroke-dasharray="3,3"/>
    </svg>`,
    items: [
      { id: 'a', text: 'Forced convection from the internal fan blowing air over heat sinks' },
      { id: 'b', text: 'Conduction from the CPU die through thermal paste to the heat spreader' },
      { id: 'c', text: 'Radiation from the laptop chassis to the surroundings' },
      { id: 'd', text: 'Natural convection from the bottom of the laptop to ambient air' },
    ],
    correctOrder: ['b', 'a', 'd', 'c'],
    explanation: 'The thermal bottleneck in a laptop is ALWAYS conduction — getting heat from the tiny CPU die to the heat spreader and then to the heat sink fins. If this path has high resistance (bad thermal paste, poor contact), no amount of fan airflow helps. After conduction establishes the path, forced convection from the fan carries the heat away. Natural convection contributes modestly through the chassis. Radiation is minimal because surface temperatures are low (~50-80°C) and surface areas are small.',
    interviewInsight: 'This tests whether you understand thermal resistance networks and can identify the bottleneck. Electronics cooling interviews always focus on the weakest link in the thermal path.',
    realWorldConnection: 'This is why thermal paste application matters so much — a tiny air gap at the die interface can be the dominant thermal resistance. It is also why heat pipes are used: they provide very low thermal resistance over the distance from CPU to the fan.',
    commonMistake: 'Putting the fan first. The fan matters, but if the conduction path to the heat sink is poor, the fan is just blowing air over a cold heat sink while the CPU overheats.',
    tags: ['laptop', 'thermal-management', 'conduction', 'convection', 'electronics-cooling'],
  },

  // HT-002 — Multiple Choice
  {
    id: 'ht-002',
    type: 'multiple-choice',
    topic: 'heat-transfer',
    subtopic: 'Convection',
    difficulty: 'beginner',
    question: 'Why does blowing on hot soup cool it down faster?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ht002-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#60a5fa"/></marker>
      </defs>
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Boundary Layer Effect on Soup Cooling</text>
      <!-- Left: without blowing -->
      <text x="110" y="42" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Without Blowing</text>
      <!-- Bowl -->
      <path d="M40,170 Q45,210 110,210 Q175,210 180,170" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <line x1="40" y1="170" x2="40" y2="155" stroke="#94a3b8" stroke-width="2"/>
      <line x1="180" y1="170" x2="180" y2="155" stroke="#94a3b8" stroke-width="2"/>
      <!-- Soup surface -->
      <line x1="42" y1="155" x2="178" y2="155" stroke="#ef4444" stroke-width="2"/>
      <text x="110" y="180" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="10">Hot Soup</text>
      <!-- Stagnant boundary layer (thick warm zone) -->
      <rect x="42" y="95" width="136" height="58" rx="3" fill="#ef4444" opacity="0.1" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="110" y="112" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">Warm, humid</text>
      <text x="110" y="125" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">stagnant boundary layer</text>
      <text x="110" y="138" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">(insulating blanket)</text>
      <!-- Steam wisps -->
      <path d="M70,90 Q73,78 76,82 Q79,86 82,74" fill="none" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
      <path d="M120,88 Q123,76 126,80 Q129,84 132,72" fill="none" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
      <!-- Small heat arrows (slow) -->
      <text x="110" y="72" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Slow cooling</text>
      <!-- "X" for poor cooling -->
      <text x="110" y="232" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">&#x2717; Poor heat/mass transfer</text>
      <!-- Divider -->
      <line x1="200" y1="35" x2="200" y2="250" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- Right: with blowing -->
      <text x="310" y="42" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">With Blowing</text>
      <!-- Bowl -->
      <path d="M240,170 Q245,210 310,210 Q375,210 380,170" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <line x1="240" y1="170" x2="240" y2="155" stroke="#94a3b8" stroke-width="2"/>
      <line x1="380" y1="170" x2="380" y2="155" stroke="#94a3b8" stroke-width="2"/>
      <!-- Soup surface -->
      <line x1="242" y1="155" x2="378" y2="155" stroke="#ef4444" stroke-width="2"/>
      <text x="310" y="180" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="10">Hot Soup</text>
      <!-- Thin boundary layer -->
      <rect x="242" y="140" width="136" height="13" rx="2" fill="#ef4444" opacity="0.08" stroke="#ef4444" stroke-width="0.5" stroke-dasharray="3,3"/>
      <text x="310" y="137" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="8">thin boundary layer</text>
      <!-- Blowing air arrows -->
      <line x1="220" y1="110" x2="248" y2="118" stroke="#60a5fa" stroke-width="2" marker-end="url(#ht002-arr)"/>
      <line x1="220" y1="125" x2="248" y2="128" stroke="#60a5fa" stroke-width="2" marker-end="url(#ht002-arr)"/>
      <line x1="220" y1="140" x2="248" y2="138" stroke="#60a5fa" stroke-width="2" marker-end="url(#ht002-arr)"/>
      <text x="222" y="100" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">Fresh cool</text>
      <text x="222" y="92" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">dry air</text>
      <!-- Swept away arrows -->
      <line x1="370" y1="105" x2="392" y2="100" stroke="#ef4444" stroke-width="1.5" marker-end="url(#ht002-arr)"/>
      <line x1="370" y1="118" x2="392" y2="115" stroke="#ef4444" stroke-width="1.5" marker-end="url(#ht002-arr)"/>
      <!-- Evaporation arrows (upward) -->
      <path d="M280,152 Q282,130 285,120" fill="none" stroke="#34d399" stroke-width="1.5" marker-end="url(#ht002-arr)"/>
      <path d="M320,152 Q322,128 325,118" fill="none" stroke="#34d399" stroke-width="1.5" marker-end="url(#ht002-arr)"/>
      <path d="M350,152 Q352,130 355,120" fill="none" stroke="#34d399" stroke-width="1.5" marker-end="url(#ht002-arr)"/>
      <text x="350" y="108" fill="#34d399" font-family="system-ui, sans-serif" font-size="8">Evap.</text>
      <!-- Checkmark for good cooling -->
      <text x="310" y="232" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">&#x2713; Enhanced convection + evaporation</text>
      <!-- Bottom explanation -->
      <text x="200" y="260" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Blowing removes the insulating boundary layer &#x2192; increases &#x394;T and &#x394;humidity gradients</text>
      <text x="200" y="275" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Evaporation is actually the dominant cooling mechanism for hot liquids</text>
    </svg>`,
    options: [
      { id: 'a', text: 'Your breath is cooler than the soup, so it cools by conduction' },
      { id: 'b', text: 'Blowing removes the hot, humid boundary layer above the soup, increasing both convective and evaporative heat transfer' },
      { id: 'c', text: 'The wind chill effect makes the soup "feel" cooler' },
      { id: 'd', text: 'Blowing increases the soup\'s emissivity, enhancing radiation' },
    ],
    correctAnswer: 'b',
    explanation: 'Hot soup creates a stagnant boundary layer of warm, humid air above its surface. This layer acts as an insulating blanket, limiting both convective heat transfer and evaporative cooling. Blowing strips this boundary layer away, replacing it with fresh, cooler, drier air. This increases the temperature gradient (driving convection) and the humidity gradient (driving evaporation). Evaporation is actually the dominant cooling mechanism for hot liquids.',
    interviewInsight: 'This tests understanding of boundary layers and their role in convection. It also shows whether you recognize evaporation as a heat transfer mechanism in everyday situations.',
    realWorldConnection: 'The same principle drives cooling tower design, where water is sprayed into an air stream to maximize evaporative cooling. It is also why fan-assisted heat sinks work — disrupting the boundary layer.',
    commonMistake: 'Saying it is just because your breath is cold. Room-temperature breath would still cool the soup because the boundary layer removal is the dominant effect.',
    tags: ['convection', 'boundary-layer', 'evaporation', 'everyday-physics', 'cooling'],
  },

  // HT-003 — Design Decision
  {
    id: 'ht-003',
    type: 'design-decision',
    topic: 'heat-transfer',
    subtopic: 'Heat Exchangers',
    difficulty: 'advanced',
    question: 'You need to design a heat exchanger to cool engine oil from 120°C to 80°C using 20°C water. Which configuration do you choose?',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ht003-arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker>
        <marker id="ht003-arr-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#3b82f6"/></marker>
      </defs>
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Shell-and-Tube HX: Oil on Shell Side with Baffles</text>
      <!-- Outer shell -->
      <rect x="60" y="60" width="280" height="140" rx="10" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
      <text x="200" y="55" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Shell (oil side)</text>
      <!-- Tubes (horizontal lines through shell) -->
      <line x1="50" y1="100" x2="350" y2="100" stroke="#3b82f6" stroke-width="2"/>
      <line x1="50" y1="130" x2="350" y2="130" stroke="#3b82f6" stroke-width="2"/>
      <line x1="50" y1="160" x2="350" y2="160" stroke="#3b82f6" stroke-width="2"/>
      <!-- Tube labels -->
      <text x="38" y="132" text-anchor="end" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="9">Tubes</text>
      <!-- Water flow arrows in tubes -->
      <line x1="50" y1="92" x2="72" y2="92" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ht003-arr-blue)"/>
      <line x1="50" y1="122" x2="72" y2="122" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ht003-arr-blue)"/>
      <line x1="50" y1="152" x2="72" y2="152" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#ht003-arr-blue)"/>
      <!-- Water labels -->
      <text x="35" y="78" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Water in</text>
      <text x="35" y="90" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="9">20&#xB0;C</text>
      <text x="355" y="78" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Water out</text>
      <!-- Baffles (vertical plates with gaps) -->
      <line x1="130" y1="60" x2="130" y2="150" stroke="#e2e8f0" stroke-width="2"/>
      <line x1="190" y1="110" x2="190" y2="200" stroke="#e2e8f0" stroke-width="2"/>
      <line x1="250" y1="60" x2="250" y2="150" stroke="#e2e8f0" stroke-width="2"/>
      <line x1="310" y1="110" x2="310" y2="200" stroke="#e2e8f0" stroke-width="2"/>
      <text x="160" y="215" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Baffles</text>
      <!-- Oil flow path (zigzag through baffles) -->
      <path d="M70,75 L125,75 L125,185 L135,185 L185,185 L185,75 L195,75 L245,75 L245,185 L255,185 L305,185 L305,75 L340,75" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#ht003-arr-red)"/>
      <!-- Oil labels -->
      <text x="72" y="70" fill="#ef4444" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Oil in</text>
      <text x="72" y="60" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">120&#xB0;C</text>
      <text x="348" y="70" fill="#ef4444" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Oil out</text>
      <text x="348" y="60" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">80&#xB0;C</text>
      <!-- Advantages box -->
      <rect x="40" y="228" width="320" height="65" rx="4" fill="none" stroke="#34d399" stroke-width="1"/>
      <text x="200" y="244" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Why baffles + oil on shell side?</text>
      <text x="200" y="258" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">&#x2022; Baffles create cross-flow turbulence in viscous oil</text>
      <text x="200" y="271" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">&#x2022; Water flows easily in tubes (low viscosity)</text>
      <text x="200" y="284" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">&#x2022; Tube bundle removable for shell-side cleaning</text>
    </svg>`,
    context: 'Space is limited (under a car hood). Oil flow rate is 2 L/min. Water is available from the engine coolant circuit at 20°C inlet. Oil is viscous and prone to fouling.',
    designOptions: [
      {
        id: 'a',
        text: 'Shell-and-tube with oil on the tube side',
        tradeoffs: 'Easy to clean tube side, but shell-side oil flow is poor. Large footprint.',
      },
      {
        id: 'b',
        text: 'Plate-and-frame heat exchanger',
        tradeoffs: 'Very compact, high effectiveness, easy to add plates. But narrow channels can clog with viscous oil, and gaskets may degrade with hot oil.',
      },
      {
        id: 'c',
        text: 'Shell-and-tube with oil on the shell side and baffles',
        tradeoffs: 'Baffles create turbulence in the viscous oil, improving heat transfer. Shell side is harder to clean but handles viscous fluids better than narrow plates.',
      },
      {
        id: 'd',
        text: 'Brazed-plate compact heat exchanger',
        tradeoffs: 'Extremely compact and efficient. But cannot be disassembled for cleaning — if oil fouls the channels, the entire unit must be replaced.',
      },
    ],
    bestOption: 'c',
    evaluationCriteria: ['Ability to handle viscous oil', 'Fouling resistance and cleanability', 'Compact size for under-hood installation', 'Heat transfer effectiveness with low oil-side Reynolds number'],
    explanation: 'Viscous oil on the shell side with baffles is the classic solution. The baffles create cross-flow turbulence that compensates for the oil\'s high viscosity and low Reynolds number. Tube-side water flows easily due to low viscosity. The shell side can be cleaned by removing the tube bundle. Plate exchangers would be ideal for size but risk clogging with viscous, potentially degraded oil.',
    interviewInsight: 'Heat exchanger selection is a very common design interview question. The interviewer wants to see that you consider the fluid properties (viscosity, fouling), not just the thermal duty.',
    commonMistake: 'Choosing a plate heat exchanger purely for compactness without considering that viscous oil will clog narrow plate channels.',
    tags: ['heat-exchanger', 'oil-cooler', 'shell-and-tube', 'viscosity', 'fouling', 'design'],
  },

  // HT-004 — Multiple Choice
  {
    id: 'ht-004',
    type: 'multiple-choice',
    topic: 'heat-transfer',
    subtopic: 'Conduction',
    difficulty: 'intermediate',
    question: 'A composite wall has three layers: brick (k=0.7 W/mK, 20 cm), insulation (k=0.04 W/mK, 5 cm), and plaster (k=0.5 W/mK, 2 cm). Which layer dominates the total thermal resistance?',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ht004-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker>
      </defs>
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Composite Wall: Thermal Resistance</text>
      <!-- Hot side label -->
      <text x="30" y="90" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">HOT</text>
      <text x="30" y="105" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="10">Outside</text>
      <!-- Heat flow arrow -->
      <line x1="15" y1="140" x2="55" y2="140" stroke="#ef4444" stroke-width="2.5" marker-end="url(#ht004-arr)"/>
      <text x="37" y="132" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="10">Q</text>
      <!-- Brick layer (widest) -->
      <rect x="60" y="50" width="100" height="180" rx="0" fill="#fb923c" opacity="0.15" stroke="#fb923c" stroke-width="2"/>
      <text x="110" y="130" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Brick</text>
      <text x="110" y="148" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">k = 0.7</text>
      <text x="110" y="163" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">L = 20 cm</text>
      <!-- Dimension line for brick -->
      <line x1="60" y1="240" x2="160" y2="240" stroke="#fb923c" stroke-width="1"/>
      <line x1="60" y1="235" x2="60" y2="245" stroke="#fb923c" stroke-width="1"/>
      <line x1="160" y1="235" x2="160" y2="245" stroke="#fb923c" stroke-width="1"/>
      <text x="110" y="254" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">R = 0.286</text>
      <!-- Insulation layer -->
      <rect x="165" y="50" width="60" height="180" rx="0" fill="#f472b6" opacity="0.15" stroke="#f472b6" stroke-width="2"/>
      <!-- Cross-hatch pattern for insulation -->
      <line x1="170" y1="55" x2="195" y2="80" stroke="#f472b6" stroke-width="0.5" opacity="0.4"/>
      <line x1="170" y1="75" x2="215" y2="120" stroke="#f472b6" stroke-width="0.5" opacity="0.4"/>
      <line x1="170" y1="95" x2="220" y2="145" stroke="#f472b6" stroke-width="0.5" opacity="0.4"/>
      <line x1="170" y1="115" x2="220" y2="165" stroke="#f472b6" stroke-width="0.5" opacity="0.4"/>
      <line x1="170" y1="135" x2="220" y2="185" stroke="#f472b6" stroke-width="0.5" opacity="0.4"/>
      <line x1="170" y1="155" x2="220" y2="205" stroke="#f472b6" stroke-width="0.5" opacity="0.4"/>
      <line x1="170" y1="175" x2="220" y2="225" stroke="#f472b6" stroke-width="0.5" opacity="0.4"/>
      <line x1="175" y1="195" x2="220" y2="230" stroke="#f472b6" stroke-width="0.5" opacity="0.4"/>
      <text x="195" y="125" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Insulation</text>
      <text x="195" y="143" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">k = 0.04</text>
      <text x="195" y="158" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">L = 5 cm</text>
      <!-- Dimension line for insulation -->
      <line x1="165" y1="240" x2="225" y2="240" stroke="#f472b6" stroke-width="1"/>
      <line x1="165" y1="235" x2="165" y2="245" stroke="#f472b6" stroke-width="1"/>
      <line x1="225" y1="235" x2="225" y2="245" stroke="#f472b6" stroke-width="1"/>
      <text x="195" y="254" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9" font-weight="bold">R = 1.250</text>
      <!-- Plaster layer (thinnest) -->
      <rect x="230" y="50" width="30" height="180" rx="0" fill="#60a5fa" opacity="0.15" stroke="#60a5fa" stroke-width="2"/>
      <text x="245" y="125" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9" font-weight="bold">Plaster</text>
      <text x="245" y="143" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">k=0.5</text>
      <text x="245" y="158" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">2 cm</text>
      <text x="245" y="254" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">R = 0.040</text>
      <!-- Cold side -->
      <text x="280" y="90" text-anchor="start" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">COLD</text>
      <text x="280" y="105" text-anchor="start" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="10">Inside</text>
      <!-- Resistance bar chart at bottom -->
      <text x="200" y="278" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">R = L/(kA) per unit area (m&#xB2;&#xB7;K/W)</text>
      <!-- Percentage breakdown -->
      <rect x="60" y="265" width="100" height="10" fill="#fb923c" opacity="0.4"/>
      <rect x="160" y="265" width="165" height="10" fill="#f472b6" opacity="0.4"/>
      <rect x="325" y="265" width="7" height="10" fill="#60a5fa" opacity="0.4"/>
      <text x="110" y="290" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">18%</text>
      <text x="242" y="290" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9" font-weight="bold">~80% &#x2190; DOMINATES</text>
      <text x="335" y="290" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">2%</text>
    </svg>`,
    options: [
      { id: 'a', text: 'Brick — it is the thickest layer' },
      { id: 'b', text: 'Insulation — it has the lowest thermal conductivity' },
      { id: 'c', text: 'Plaster — it is on the inside surface' },
      { id: 'd', text: 'All three contribute roughly equally' },
    ],
    correctAnswer: 'b',
    explanation: 'Thermal resistance R = L/(kA). Per unit area: R_brick = 0.20/0.7 = 0.286 K/W per m². R_insulation = 0.05/0.04 = 1.25 K/W per m². R_plaster = 0.02/0.5 = 0.04 K/W per m². The insulation layer has 80% of the total resistance despite being the thinnest layer. This is entirely because of its very low thermal conductivity.',
    interviewInsight: 'This is a fundamental thermal design question. It tests whether you can quickly identify the dominant resistance in a thermal circuit — a critical skill for any thermal design engineer.',
    realWorldConnection: 'Building insulation codes are written around this principle. Adding 5 cm of insulation to a brick wall reduces heat loss more than doubling the brick thickness.',
    commonMistake: 'Assuming the thickest layer has the highest resistance. Thickness matters, but conductivity matters more — a thin layer of insulation dominates a thick brick wall.',
    tags: ['conduction', 'thermal-resistance', 'insulation', 'composite-wall', 'building'],
  },

  // HT-005 — Scenario
  {
    id: 'ht-005',
    type: 'scenario',
    topic: 'heat-transfer',
    subtopic: 'Radiation',
    difficulty: 'advanced',
    question: 'A satellite in space needs to reject 500W of waste heat from its electronics. Design the thermal control approach.',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ht005-arr-sun" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#fb923c"/></marker>
        <marker id="ht005-arr-rad" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#60a5fa"/></marker>
      </defs>
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Satellite Thermal Control in Space</text>
      <!-- Space background indicator -->
      <text x="370" y="40" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Space: ~3K</text>
      <!-- Sun (left side) -->
      <circle cx="35" cy="100" r="25" fill="#fb923c" opacity="0.3" stroke="#fb923c" stroke-width="2"/>
      <text x="35" y="104" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Sun</text>
      <!-- Solar radiation arrows -->
      <line x1="62" y1="90" x2="100" y2="100" stroke="#fb923c" stroke-width="1.5" marker-end="url(#ht005-arr-sun)"/>
      <line x1="62" y1="100" x2="100" y2="115" stroke="#fb923c" stroke-width="1.5" marker-end="url(#ht005-arr-sun)"/>
      <line x1="62" y1="110" x2="100" y2="130" stroke="#fb923c" stroke-width="1.5" marker-end="url(#ht005-arr-sun)"/>
      <text x="82" y="82" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8">Solar</text>
      <text x="82" y="92" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8">input</text>
      <!-- Satellite body -->
      <rect x="105" y="80" width="130" height="100" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="170" y="120" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Satellite</text>
      <!-- Electronics inside -->
      <rect x="130" y="130" width="80" height="30" rx="2" fill="none" stroke="#ef4444" stroke-width="1.5"/>
      <text x="170" y="150" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">Electronics 500W</text>
      <text x="170" y="108" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">0&#xB0;C to 50&#xB0;C range</text>
      <!-- MLI on sun-facing side -->
      <line x1="103" y1="82" x2="103" y2="178" stroke="#fb923c" stroke-width="3"/>
      <text x="98" y="195" text-anchor="end" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8">MLI blanket</text>
      <text x="98" y="205" text-anchor="end" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8">(reflects solar)</text>
      <!-- Radiator panel (right side) -->
      <rect x="240" y="65" width="15" height="130" rx="1" fill="#60a5fa" opacity="0.2" stroke="#60a5fa" stroke-width="2"/>
      <text x="280" y="115" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Radiator</text>
      <text x="280" y="130" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">~1.3 m&#xB2;</text>
      <text x="280" y="145" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">&#x3B5; &#x2248; 0.85</text>
      <text x="280" y="160" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">T &#x2248; 300K</text>
      <!-- Heat pipe from electronics to radiator -->
      <line x1="212" y1="145" x2="238" y2="130" stroke="#ef4444" stroke-width="2"/>
      <text x="225" y="162" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="7">Heat pipe</text>
      <!-- Radiation arrows from radiator to space -->
      <path d="M258,85 Q270,82 280,78 Q290,74 300,75" fill="none" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ht005-arr-rad)"/>
      <path d="M258,105 Q272,102 285,100 Q298,98 310,95" fill="none" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ht005-arr-rad)"/>
      <path d="M258,130 Q275,130 295,130 Q315,130 325,130" fill="none" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ht005-arr-rad)"/>
      <path d="M258,155 Q272,158 285,160 Q298,162 310,165" fill="none" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ht005-arr-rad)"/>
      <path d="M258,175 Q270,178 280,182 Q290,186 300,185" fill="none" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ht005-arr-rad)"/>
      <text x="330" y="130" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">Radiation</text>
      <text x="330" y="142" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">to space</text>
      <!-- Earth below -->
      <path d="M100,280 Q200,240 300,280" fill="none" stroke="#34d399" stroke-width="2"/>
      <text x="200" y="295" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Earth (IR source)</text>
      <!-- Stefan-Boltzmann equation -->
      <rect x="40" y="220" width="320" height="38" rx="3" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <text x="200" y="236" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Q = &#x3B5;&#x3C3;AT&#x2074; = 0.85 &#xD7; 5.67e-8 &#xD7; 1.3 &#xD7; 300&#x2074; &#x2248; 507W</text>
      <text x="200" y="252" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Only radiation works in vacuum — no convection possible</text>
    </svg>`,
    context: 'The satellite orbits Earth and alternates between sunlight and shadow. Electronics must stay between 0°C and 50°C. There is no air for convection. Available surfaces: 2 m² total external area.',
    steps: [
      {
        prompt: 'What heat transfer mechanism is available in space?',
        idealResponse: 'Only radiation. There is no atmosphere for convection, and conduction only moves heat within the spacecraft structure. All heat must ultimately be radiated to space (background temperature ~3K) from external radiator surfaces.',
      },
      {
        prompt: 'Estimate the required radiator area and temperature.',
        idealResponse: 'Using Stefan-Boltzmann: Q = εσAT⁴. For 500W with ε ≈ 0.85 (white paint), σ = 5.67×10⁻⁸, solve for A at T = 300K (27°C): A = 500/(0.85 × 5.67e-8 × 300⁴) = 500/390 ≈ 1.28 m². So about 1.3 m² of radiator at 27°C average. This is feasible within the 2 m² available.',
      },
      {
        prompt: 'How do you handle the sun-shadow thermal cycling?',
        idealResponse: 'Use multi-layer insulation (MLI) blankets on sun-facing surfaces to minimize solar heat absorption. Radiators should face away from the sun and Earth. Use heat pipes to spread thermal loads evenly. Consider louvers or variable-conductance heat pipes that close in shadow to prevent over-cooling, and open in sunlight to maximize rejection.',
      },
    ],
    keyTakeaway: 'Space thermal design relies entirely on radiation. The fourth-power dependence of radiation on temperature means radiator area is very sensitive to operating temperature.',
    explanation: 'Spacecraft thermal control is a pure radiation problem. The key challenge is managing the cyclic solar input while maintaining steady electronics temperatures. This requires both passive (MLI, coatings) and active (heat pipes, louvers) thermal control.',
    interviewInsight: 'This scenario is common in aerospace interviews. It tests radiation fundamentals and the ability to design a complete thermal system, not just calculate a single mode of heat transfer.',
    commonMistake: 'Forgetting that radiation scales with T⁴, so a small temperature increase gives a large increase in rejection capability. Also, neglecting solar input on the radiator surface.',
    tags: ['radiation', 'satellite', 'space', 'thermal-control', 'stefan-boltzmann', 'MLI'],
  },

  // HT-006 — Confidence Rated
  {
    id: 'ht-006',
    type: 'confidence-rated',
    topic: 'heat-transfer',
    subtopic: 'Convection',
    difficulty: 'intermediate',
    question: 'What does the Nusselt number physically represent?',
    diagram: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ht006-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#94a3b8"/></marker>
        <marker id="ht006-arr-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#ef4444"/></marker>
        <marker id="ht006-arr-blue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#60a5fa"/></marker>
      </defs>
      <text x="200" y="18" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Nusselt Number: Nu = hL/k</text>
      <!-- Left side: Pure conduction (Nu = 1) -->
      <text x="110" y="42" text-anchor="middle" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Stagnant Fluid (Nu = 1)</text>
      <!-- Hot wall left -->
      <rect x="30" y="60" width="12" height="130" fill="#ef4444" opacity="0.3" stroke="#ef4444" stroke-width="2"/>
      <text x="36" y="55" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">T_hot</text>
      <!-- Cold wall left -->
      <rect x="175" y="60" width="12" height="130" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" stroke-width="2"/>
      <text x="181" y="55" text-anchor="middle" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="9">T_cold</text>
      <!-- Stagnant fluid between walls -->
      <rect x="44" y="62" width="129" height="126" fill="#334155" opacity="0.3"/>
      <text x="110" y="120" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Stagnant</text>
      <text x="110" y="135" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">fluid</text>
      <!-- Linear temperature gradient lines -->
      <line x1="42" y1="80" x2="175" y2="80" stroke="#fb923c" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="110" y="77" text-anchor="middle" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8">linear T gradient</text>
      <!-- Single slow heat arrow -->
      <line x1="55" y1="155" x2="160" y2="155" stroke="#ef4444" stroke-width="1.5" marker-end="url(#ht006-arr-red)"/>
      <text x="110" y="170" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">q = k&#x394;T/L (conduction only)</text>
      <!-- L dimension -->
      <line x1="42" y1="198" x2="175" y2="198" stroke="#34d399" stroke-width="1"/>
      <line x1="42" y1="193" x2="42" y2="203" stroke="#34d399" stroke-width="1"/>
      <line x1="175" y1="193" x2="175" y2="203" stroke="#34d399" stroke-width="1"/>
      <text x="110" y="212" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">L</text>
      <!-- Divider -->
      <line x1="200" y1="35" x2="200" y2="220" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- Right side: Convection (Nu >> 1) -->
      <text x="310" y="42" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Moving Fluid (Nu = 100)</text>
      <!-- Hot wall right -->
      <rect x="220" y="60" width="12" height="130" fill="#ef4444" opacity="0.3" stroke="#ef4444" stroke-width="2"/>
      <text x="226" y="55" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">T_hot</text>
      <!-- Cold wall right -->
      <rect x="378" y="60" width="12" height="130" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" stroke-width="2"/>
      <text x="384" y="55" text-anchor="middle" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="9">T_cold</text>
      <!-- Moving fluid -->
      <rect x="234" y="62" width="142" height="126" fill="#334155" opacity="0.3"/>
      <!-- Circulation arrows -->
      <path d="M260,85 Q310,70 340,85 Q350,100 340,120 Q310,135 260,120 Q250,100 260,85" fill="none" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ht006-arr-blue)"/>
      <text x="305" y="108" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">Mixing</text>
      <!-- Multiple fast heat arrows -->
      <line x1="245" y1="145" x2="280" y2="145" stroke="#ef4444" stroke-width="2" marker-end="url(#ht006-arr-red)"/>
      <line x1="280" y1="150" x2="320" y2="150" stroke="#ef4444" stroke-width="2" marker-end="url(#ht006-arr-red)"/>
      <line x1="320" y1="155" x2="365" y2="155" stroke="#ef4444" stroke-width="2" marker-end="url(#ht006-arr-red)"/>
      <text x="310" y="172" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9">q = h&#x394;T (100x more!)</text>
      <!-- Bottom formula -->
      <rect x="50" y="225" width="300" height="30" rx="3" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <text x="200" y="244" text-anchor="middle" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Nu = hL/k = convection / conduction</text>
    </svg>`,
    options: [
      { id: 'a', text: 'The ratio of buoyancy forces to viscous forces in natural convection' },
      { id: 'b', text: 'The ratio of convective heat transfer to conductive heat transfer across a fluid layer' },
      { id: 'c', text: 'The ratio of thermal diffusivity to momentum diffusivity' },
      { id: 'd', text: 'The ratio of heat capacity rate of the hot fluid to that of the cold fluid' },
    ],
    correctAnswer: 'b',
    confidenceLevels: ['Guessing', 'Somewhat sure', 'Very confident'],
    explanation: 'Nu = hL/k, where h is the convective coefficient, L is a characteristic length, and k is the fluid thermal conductivity. Physically, it tells you how much better convection is than pure conduction for moving heat across the fluid layer. Nu = 1 means convection offers no improvement over conduction (stagnant fluid). A turbulent pipe flow might have Nu = 100+, meaning convection is 100x more effective than conduction alone.',
    interviewInsight: 'Dimensionless numbers are interview staples. The interviewer wants the physical meaning, not just the formula. Option (a) is Grashof, (c) is the inverse of Prandtl, (d) is the capacity ratio used in NTU method.',
    commonMistake: 'Confusing Nusselt with other dimensionless numbers. Memorize the physical meaning, not just the formula — that is what sticks in interviews.',
    tags: ['nusselt', 'dimensionless-number', 'convection', 'conduction', 'heat-transfer-coefficient'],
  },
];
