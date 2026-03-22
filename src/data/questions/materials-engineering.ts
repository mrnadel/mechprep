import type { Question } from '../types';

export const materialsEngineeringQuestions: Question[] = [
  // MAT-001 — Material Selection
  {
    id: 'mat-001',
    type: 'material-selection',
    topic: 'materials-engineering',
    subtopic: 'Material Selection',
    difficulty: 'intermediate',
    question: 'You need to select a material for a bicycle frame that must be lightweight, stiff, and affordable for mass production. What do you choose?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Bicycle frame outline -->
      <polygon points="120,200 200,100 280,200 240,200 200,150 160,200" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <line x1="200" y1="100" x2="280" y2="130" stroke="#94a3b8" stroke-width="2"/>
      <line x1="280" y1="130" x2="280" y2="200" stroke="#94a3b8" stroke-width="2"/>
      <!-- Wheels (simplified) -->
      <circle cx="120" cy="200" r="30" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
      <circle cx="280" cy="200" r="30" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
      <!-- Frame label -->
      <text x="200" y="85" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="bold">50,000+ units/year</text>
      <!-- Material comparison bars -->
      <text x="10" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Specific Stiffness (E/\u03c1)</text>
      <!-- CFRP -->
      <text x="10" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">CFRP</text>
      <rect x="50" y="30" width="180" height="10" rx="2" fill="#f472b6" opacity="0.6"/>
      <text x="235" y="39" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">60+ (costly)</text>
      <!-- Steel -->
      <text x="10" y="54" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">4130</text>
      <rect x="50" y="46" width="78" height="10" rx="2" fill="#94a3b8" opacity="0.6"/>
      <text x="133" y="55" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">26 (heavy)</text>
      <!-- Aluminum (highlighted) -->
      <text x="10" y="70" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" font-weight="bold">6061</text>
      <rect x="50" y="62" width="75" height="10" rx="2" fill="#34d399" opacity="0.8"/>
      <text x="130" y="71" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" font-weight="bold">25 (best value)</text>
      <!-- Titanium -->
      <text x="10" y="86" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Ti-6-4</text>
      <rect x="50" y="78" width="75" height="10" rx="2" fill="#94a3b8" opacity="0.6"/>
      <text x="130" y="87" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">25 (expensive)</text>
      <!-- Winner callout on frame -->
      <rect x="140" y="140" width="120" height="30" rx="5" fill="#334155" stroke="#34d399" stroke-width="2"/>
      <text x="200" y="152" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">6061-T6 Aluminum</text>
      <text x="200" y="164" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">TIG weldable, affordable</text>
      <!-- Cost vs performance axis labels -->
      <text x="10" y="255" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Cost:</text>
      <text x="48" y="255" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">6061 $$</text>
      <text x="100" y="255" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">4130 $$</text>
      <text x="150" y="255" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">CFRP $$$$</text>
      <text x="215" y="255" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Ti $$$$$</text>
      <!-- Checkmark on 6061 -->
      <polyline points="33,63 38,70 48,58" fill="none" stroke="#34d399" stroke-width="2"/>
    </svg>`,
    requirements: [
      'High specific stiffness (E/ρ)',
      'Good fatigue resistance for cyclic loading from pedaling and road bumps',
      'Weldable or joinable for frame tube construction',
      'Cost-effective for production volumes of 50,000+ per year',
      'Corrosion resistance (exposed to rain and sweat)',
    ],
    candidates: [
      { id: 'a', name: '6061-T6 Aluminum', properties: 'E/ρ ≈ 25 GPa/(g/cm³), good fatigue life with proper design, TIG weldable, moderate cost, natural oxide layer for corrosion protection' },
      { id: 'b', name: 'Carbon Fiber Reinforced Polymer (CFRP)', properties: 'E/ρ ≈ 60+ GPa/(g/cm³), excellent fatigue in tension, requires specialized layup and molding, high cost, excellent corrosion resistance' },
      { id: 'c', name: '4130 Chromoly Steel', properties: 'E/ρ ≈ 26 GPa/(g/cm³), excellent fatigue life, easily TIG welded, low material cost but heavier, requires paint/coating for corrosion' },
      { id: 'd', name: 'Ti-6Al-4V Titanium', properties: 'E/ρ ≈ 25 GPa/(g/cm³), superb fatigue life and corrosion resistance, difficult and expensive to weld, very high cost' },
    ],
    bestChoice: 'a',
    selectionReasoning: 'For mass production at 50k+ units, 6061-T6 aluminum provides the best balance. Its specific stiffness is competitive with steel and titanium, it is easily TIG welded into frame tubes using hydroformed or butted tubing, and the cost is reasonable at scale. CFRP would be lighter but is 3-5x more expensive and requires more labor-intensive manufacturing. Steel is heavier. Titanium is cost-prohibitive for this volume.',
    explanation: 'Material selection is always a multi-objective optimization. The "best" material depends on the constraints — change the volume to 100 units (custom bikes) and titanium or CFRP becomes viable. Change the budget to premium and CFRP wins.',
    interviewInsight: 'Material selection questions test your ability to balance competing requirements. There is no universally correct answer — the interviewer wants to see your reasoning process and awareness of tradeoffs.',
    realWorldConnection: 'This is why the majority of mid-range bicycles use 6061-T6 aluminum. Only high-end bikes use CFRP, and boutique/custom bikes use titanium or steel.',
    commonMistake: 'Choosing CFRP because it is the "best" material without considering the cost constraint. Also, not recognizing that specific stiffness (E/ρ) is more relevant than absolute stiffness for a weight-limited application.',
    tags: ['material-selection', 'aluminum', 'bicycle', 'specific-stiffness', 'manufacturing'],
  },

  // MAT-002 — Multiple Choice
  {
    id: 'mat-002',
    type: 'multiple-choice',
    topic: 'materials-engineering',
    subtopic: 'Metals & Alloys',
    difficulty: 'beginner',
    question: 'What happens when you heat-treat 1045 carbon steel by quenching it in oil from 850°C?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Temperature axis -->
      <line x1="50" y1="20" x2="50" y2="240" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="20" y="15" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">T (\u00b0C)</text>
      <!-- Time axis -->
      <line x1="50" y1="240" x2="380" y2="240" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="370" y="255" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">time</text>
      <!-- Temperature labels -->
      <text x="10" y="47" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">850\u00b0C</text>
      <line x1="45" y1="45" x2="55" y2="45" stroke="#fb923c" stroke-width="1"/>
      <text x="10" y="127" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">500\u00b0C</text>
      <line x1="45" y1="125" x2="55" y2="125" stroke="#94a3b8" stroke-width="1"/>
      <text x="10" y="207" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">200\u00b0C</text>
      <line x1="45" y1="205" x2="55" y2="205" stroke="#94a3b8" stroke-width="1"/>
      <text x="15" y="240" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">RT</text>
      <!-- Heating phase (dotted line going up) -->
      <line x1="70" y1="235" x2="100" y2="45" stroke="#fb923c" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="75" y="270" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">heat</text>
      <!-- Hold at 850°C (austenite region) -->
      <line x1="100" y1="45" x2="170" y2="45" stroke="#fb923c" stroke-width="2"/>
      <rect x="95" y="30" width="80" height="22" rx="3" fill="#334155" stroke="#fb923c" stroke-width="1"/>
      <text x="135" y="44" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Austenite</text>
      <text x="135" y="22" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">FCC crystal</text>
      <!-- Quench line (steep drop) -->
      <line x1="170" y1="45" x2="200" y2="230" stroke="#60a5fa" stroke-width="3"/>
      <text x="208" y="140" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">QUENCH</text>
      <text x="208" y="155" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">(rapid cooling</text>
      <text x="208" y="167" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">in oil)</text>
      <!-- Oil droplets -->
      <circle cx="188" cy="180" r="3" fill="#60a5fa" opacity="0.5"/>
      <circle cx="195" cy="195" r="2" fill="#60a5fa" opacity="0.5"/>
      <circle cx="183" cy="200" r="2.5" fill="#60a5fa" opacity="0.5"/>
      <!-- Martensite result -->
      <rect x="195" y="215" width="90" height="30" rx="4" fill="#334155" stroke="#34d399" stroke-width="2"/>
      <text x="240" y="228" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">Martensite</text>
      <text x="240" y="240" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">BCT crystal</text>
      <!-- Slow cool path (for comparison) -->
      <path d="M170,45 Q230,100 270,155 Q310,200 350,230" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6,3"/>
      <text x="295" y="155" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">slow cool</text>
      <text x="295" y="167" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">(annealing)</text>
      <rect x="310" y="215" width="80" height="30" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,2"/>
      <text x="350" y="228" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Ferrite +</text>
      <text x="350" y="240" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Pearlite (soft)</text>
      <!-- Properties comparison -->
      <text x="55" y="268" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Martensite: HARD, strong, brittle</text>
      <text x="55" y="280" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">Ferrite+Pearlite: soft, ductile</text>
    </svg>`,
    options: [
      { id: 'a', text: 'It becomes softer and more ductile (annealing)' },
      { id: 'b', text: 'It transforms to martensite — hard, brittle, and strong' },
      { id: 'c', text: 'Nothing happens — 1045 steel cannot be heat treated' },
      { id: 'd', text: 'It becomes magnetic but does not change mechanical properties' },
    ],
    correctAnswer: 'b',
    explanation: 'At 850°C, the steel is fully austenitic (FCC crystal structure). Rapid quenching in oil prevents the equilibrium transformation to ferrite + pearlite. Instead, the austenite transforms to martensite (BCT structure) — a very hard, strong, but brittle phase. The carbon atoms are trapped in the distorted lattice, creating internal stress that makes the material hard. Tempering afterward restores some ductility.',
    interviewInsight: 'Heat treatment is one of the most commonly asked materials topics. Interviewers want to see that you understand the austenite-martensite transformation and its effects on properties.',
    realWorldConnection: 'This is how tools, springs, and gears are hardened. A blacksmith quenching a blade in oil is performing exactly this transformation. The subsequent tempering step (reheating to 200-600°C) controls the final hardness-toughness balance.',
    commonMistake: 'Confusing quenching (makes hard/brittle) with annealing (slow cool, makes soft/ductile). Also, not knowing that carbon content determines hardenability — pure iron cannot form martensite.',
    tags: ['heat-treatment', 'martensite', 'quenching', 'steel', 'phase-transformation'],
  },

  // MAT-003 — Scenario
  {
    id: 'mat-003',
    type: 'scenario',
    topic: 'materials-engineering',
    subtopic: 'Corrosion & Degradation',
    difficulty: 'advanced',
    question: 'You need to join two dissimilar metals in a corrosive marine environment. Walk through your options.',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Stainless steel part (left) -->
      <rect x="30" y="80" width="130" height="60" rx="3" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <text x="95" y="105" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="bold">Stainless Steel</text>
      <text x="95" y="120" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">(noble / cathodic)</text>
      <!-- Aluminum part (right) -->
      <rect x="240" y="80" width="130" height="60" rx="3" fill="#334155" stroke="#fb923c" stroke-width="2"/>
      <text x="305" y="105" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="bold">Aluminum</text>
      <text x="305" y="120" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">(active / anodic)</text>
      <!-- Joint zone -->
      <rect x="155" y="70" width="90" height="80" rx="4" fill="none" stroke="#f472b6" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="200" y="68" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">JOINT ZONE</text>
      <!-- Bolt through joint -->
      <rect x="190" y="78" width="20" height="54" rx="2" fill="#94a3b8" opacity="0.5" stroke="#94a3b8" stroke-width="1"/>
      <!-- Isolation washers -->
      <rect x="185" y="78" width="30" height="5" rx="1" fill="#34d399" opacity="0.7"/>
      <rect x="185" y="127" width="30" height="5" rx="1" fill="#34d399" opacity="0.7"/>
      <text x="200" y="170" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">isolation washers</text>
      <text x="200" y="182" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">(nylon/PTFE)</text>
      <!-- Electron flow arrow -->
      <path d="M165,95 Q200,85 235,95" fill="none" stroke="#f472b6" stroke-width="1.5"/>
      <polygon points="235,95 228,90 230,97" fill="#f472b6"/>
      <text x="200" y="82" fill="#f472b6" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">e\u207b flow</text>
      <!-- Saltwater electrolyte -->
      <rect x="20" y="145" width="360" height="30" rx="3" fill="#60a5fa" opacity="0.1" stroke="#60a5fa" stroke-width="1"/>
      <text x="200" y="163" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Saltwater Electrolyte (NaCl)</text>
      <!-- Corrosion on aluminum side -->
      <path d="M250,140 l3,-5 l3,4 l4,-6 l3,5 l3,-4 l4,6 l3,-5 l3,4" fill="none" stroke="#fb923c" stroke-width="2"/>
      <text x="280" y="155" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Al corrodes!</text>
      <!-- Galvanic series (simplified) -->
      <text x="30" y="205" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Galvanic Series (seawater):</text>
      <line x1="30" y1="215" x2="370" y2="215" stroke="#94a3b8" stroke-width="1"/>
      <!-- Noble end -->
      <text x="350" y="228" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9" text-anchor="end">Noble (+)</text>
      <!-- Active end -->
      <text x="50" y="228" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Active (\u2212)</text>
      <!-- Materials on scale -->
      <circle cx="80" cy="215" r="4" fill="#fb923c"/>
      <text x="80" y="240" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Zinc</text>
      <circle cx="140" cy="215" r="4" fill="#fb923c"/>
      <text x="140" y="240" fill="#fb923c" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Al</text>
      <circle cx="210" cy="215" r="4" fill="#94a3b8"/>
      <text x="210" y="240" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Steel</text>
      <circle cx="310" cy="215" r="4" fill="#60a5fa"/>
      <text x="310" y="240" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">SS 316</text>
      <!-- Large gap indicator -->
      <line x1="140" y1="210" x2="310" y2="210" stroke="#f472b6" stroke-width="1.5"/>
      <text x="225" y="208" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">large \u0394V \u2192 severe corrosion</text>
      <!-- Mitigation strategies -->
      <text x="30" y="260" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Mitigations:</text>
      <text x="30" y="275" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">1. Isolate  2. Barrier coat  3. Sacrificial Zn anode  4. Marine sealant</text>
    </svg>`,
    context: 'A stainless steel fitting must connect to an aluminum structural member on a boat. The joint will be exposed to saltwater spray. It must carry moderate structural loads.',
    steps: [
      {
        prompt: 'What is the primary concern with this joint?',
        idealResponse: 'Galvanic corrosion. Stainless steel and aluminum are far apart on the galvanic series — stainless steel is noble (cathodic) and aluminum is active (anodic). In saltwater (an excellent electrolyte), the aluminum will corrode preferentially and rapidly at the joint interface.',
      },
      {
        prompt: 'How would you mitigate the galvanic corrosion?',
        idealResponse: 'Several strategies: (1) Electrically isolate the metals using non-conductive bushings, washers, and sealant at the joint. Nylon or PTFE isolation kits are standard. (2) Apply a barrier coating or sealant (marine epoxy) to prevent electrolyte contact. (3) Use a sacrificial anode (zinc) nearby to protect the aluminum. (4) Consider a transition joint — a bimetallic strip that is friction-welded with aluminum on one side and stainless on the other.',
      },
      {
        prompt: 'Which joining method would you use for the structural connection?',
        idealResponse: 'Mechanical fastening with isolation is the most practical: stainless steel bolts with nylon insulating sleeves and washers to prevent metal-to-metal contact. Apply a polysulfide or silicone marine sealant in the joint to block water ingress. Avoid welding or brazing dissimilar metals — the intermetallic compounds are brittle, and the thermal cycle creates residual stresses that accelerate corrosion.',
      },
    ],
    keyTakeaway: 'Dissimilar metal joints in corrosive environments require electrical isolation, barrier coatings, or sacrificial protection. The galvanic series and the electrolyte aggressiveness determine the severity.',
    explanation: 'Galvanic corrosion is one of the most common failure modes in marine, automotive, and aerospace applications where mixed materials are unavoidable. The severity depends on the potential difference between the metals, the electrolyte conductivity, and the cathode-to-anode area ratio.',
    interviewInsight: 'This scenario tests corrosion knowledge AND practical problem-solving. The interviewer wants to see that you can identify the mechanism, quantify the risk (galvanic series), and propose multiple mitigation strategies.',
    commonMistake: 'Not considering galvanic corrosion at all when joining dissimilar metals. Also, suggesting welding — you generally cannot weld aluminum to stainless steel conventionally.',
    tags: ['galvanic-corrosion', 'dissimilar-metals', 'marine', 'isolation', 'joining'],
  },

  // MAT-004 — Multiple Choice
  {
    id: 'mat-004',
    type: 'multiple-choice',
    topic: 'materials-engineering',
    subtopic: 'Polymers & Elastomers',
    difficulty: 'intermediate',
    question: 'You are selecting a plastic for a snap-fit housing that must survive repeated assembly/disassembly. Which polymer is the WORST choice?',
    diagram: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <!-- Snap-fit geometry -->
      <text x="200" y="18" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Snap-Fit Deflection</text>
      <!-- Base part -->
      <rect x="50" y="70" width="140" height="20" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <!-- Cantilever snap arm -->
      <path d="M190,70 L190,40 L210,40 L210,55 L200,60 L200,70" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <!-- Deflection arrow -->
      <path d="M210,47 Q230,47 225,55" fill="none" stroke="#f472b6" stroke-width="1.5"/>
      <polygon points="225,55 220,50 227,50" fill="#f472b6"/>
      <text x="235" y="50" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">deflects</text>
      <!-- Hook detail -->
      <path d="M200,60 L210,55" stroke="#60a5fa" stroke-width="2"/>
      <!-- Mating part approaching -->
      <rect x="195" y="25" width="30" height="15" rx="2" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
      <line x1="210" y1="20" x2="210" y2="28" stroke="#94a3b8" stroke-width="1"/>
      <polygon points="210,28 206,22 214,22" fill="#94a3b8"/>
      <!-- Repeated cycle arrow -->
      <path d="M155,40 Q155,25 175,25" fill="none" stroke="#34d399" stroke-width="1"/>
      <polygon points="175,25 170,21 170,29" fill="#34d399"/>
      <path d="M175,25 Q190,25 190,40" fill="none" stroke="#34d399" stroke-width="1"/>
      <text x="165" y="20" fill="#34d399" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">repeated</text>
      <!-- Material comparison: elongation at break -->
      <text x="30" y="110" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Elongation at Break (strain tolerance):</text>
      <!-- Nylon -->
      <text x="30" y="132" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Nylon 6/6</text>
      <rect x="120" y="123" width="200" height="12" rx="2" fill="#34d399" opacity="0.5"/>
      <text x="325" y="133" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">~40-80%</text>
      <!-- Polycarbonate -->
      <text x="30" y="152" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">PC</text>
      <rect x="120" y="143" width="180" height="12" rx="2" fill="#34d399" opacity="0.5"/>
      <text x="305" y="153" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">~60-100%</text>
      <!-- ABS -->
      <text x="30" y="172" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">ABS</text>
      <rect x="120" y="163" width="80" height="12" rx="2" fill="#34d399" opacity="0.5"/>
      <text x="205" y="173" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">~10-25%</text>
      <!-- Polystyrene (highlighted as bad) -->
      <text x="30" y="192" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">PS</text>
      <rect x="120" y="183" width="12" height="12" rx="2" fill="#fb923c" opacity="0.7"/>
      <text x="138" y="193" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" font-weight="bold">~1-2% !!!</text>
      <!-- X mark on PS -->
      <line x1="175" y1="185" x2="195" y2="197" stroke="#fb923c" stroke-width="2.5"/>
      <line x1="195" y1="185" x2="175" y2="197" stroke="#fb923c" stroke-width="2.5"/>
      <!-- Crack illustration for PS -->
      <text x="210" y="195" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">\u2192 cracks on 1st cycle!</text>
      <!-- Key insight -->
      <rect x="30" y="210" width="340" height="40" rx="5" fill="#334155" stroke="#fb923c" stroke-width="1.5"/>
      <text x="200" y="228" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle" font-weight="bold">PS: stiff but BRITTLE = worst for snap-fits</text>
      <text x="200" y="242" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Stiffness without toughness \u2192 brittle fracture</text>
    </svg>`,
    options: [
      { id: 'a', text: 'ABS — good toughness, moderate creep resistance' },
      { id: 'b', text: 'Polycarbonate — excellent impact strength and elastic recovery' },
      { id: 'c', text: 'Polystyrene (unfilled) — stiff but very brittle' },
      { id: 'd', text: 'Nylon 6/6 — tough, high fatigue resistance, good snap-fit performance' },
    ],
    correctAnswer: 'c',
    explanation: 'Polystyrene is stiff but extremely brittle — it has very low elongation at break (~1-2%). Snap-fits require the material to flex repeatedly without cracking, demanding good fatigue life and strain recovery. PS snap-fits will crack on the first or second deflection cycle. ABS, polycarbonate, and nylon all have much better toughness and strain tolerance for this application.',
    interviewInsight: 'This tests practical polymer selection. Snap-fits are everywhere in consumer products, automotive interiors, and electronics housings. Knowing which plastics can handle repeated flexing is essential.',
    realWorldConnection: 'This is why battery covers, phone cases, and LEGO bricks are made from ABS or nylon — not polystyrene. LEGO specifically uses ABS for its excellent snap-fit properties.',
    commonMistake: 'Choosing based on stiffness alone. Polystyrene is stiff, which seems good for a snap-fit, but stiffness without toughness means brittle fracture.',
    tags: ['polymer', 'snap-fit', 'polystyrene', 'ABS', 'toughness', 'brittle'],
  },

  // MAT-005 — Ranking
  {
    id: 'mat-005',
    type: 'ranking',
    topic: 'materials-engineering',
    subtopic: 'Metals & Alloys',
    difficulty: 'intermediate',
    question: 'Rank these materials by thermal conductivity (highest first):',
    diagram: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <text x="200" y="18" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Thermal Conductivity (W/mK)</text>
      <!-- Axis -->
      <line x1="130" y1="30" x2="130" y2="230" stroke="#94a3b8" stroke-width="1"/>
      <line x1="130" y1="230" x2="390" y2="230" stroke="#94a3b8" stroke-width="1"/>
      <!-- Scale markers on x-axis -->
      <text x="130" y="245" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">0</text>
      <line x1="195" y1="228" x2="195" y2="232" stroke="#94a3b8" stroke-width="1"/>
      <text x="195" y="245" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">500</text>
      <line x1="260" y1="228" x2="260" y2="232" stroke="#94a3b8" stroke-width="1"/>
      <text x="260" y="245" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">1000</text>
      <line x1="325" y1="228" x2="325" y2="232" stroke="#94a3b8" stroke-width="1"/>
      <text x="325" y="245" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">1500</text>
      <line x1="390" y1="228" x2="390" y2="232" stroke="#94a3b8" stroke-width="1"/>
      <text x="388" y="245" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8" text-anchor="end">2000</text>
      <!-- Diamond bar -->
      <text x="125" y="55" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" text-anchor="end">Diamond</text>
      <rect x="130" y="42" width="260" height="20" rx="3" fill="#f472b6" opacity="0.5" stroke="#f472b6" stroke-width="1"/>
      <text x="270" y="57" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">~2000</text>
      <!-- Copper bar -->
      <text x="125" y="90" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" text-anchor="end">Copper</text>
      <rect x="130" y="77" width="52" height="20" rx="3" fill="#fb923c" opacity="0.5" stroke="#fb923c" stroke-width="1"/>
      <text x="156" y="92" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">~400</text>
      <!-- Aluminum bar -->
      <text x="125" y="125" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" text-anchor="end">Al 6061</text>
      <rect x="130" y="112" width="22" height="20" rx="3" fill="#60a5fa" opacity="0.5" stroke="#60a5fa" stroke-width="1"/>
      <text x="141" y="127" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">~170</text>
      <!-- Stainless steel bar -->
      <text x="125" y="160" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="end">SS 304</text>
      <rect x="130" y="147" width="3" height="20" rx="1" fill="#94a3b8" opacity="0.7" stroke="#94a3b8" stroke-width="1"/>
      <text x="143" y="162" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">~16</text>
      <!-- Titanium bar -->
      <text x="125" y="195" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="end">Ti-6Al-4V</text>
      <rect x="130" y="182" width="2" height="20" rx="1" fill="#34d399" opacity="0.7" stroke="#34d399" stroke-width="1"/>
      <text x="142" y="197" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">~6.7</text>
      <!-- Surprise callout -->
      <rect x="165" y="155" width="145" height="40" rx="4" fill="#334155" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="237" y="170" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Surprise: SS is 2.5x better</text>
      <text x="237" y="183" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">than Ti alloy!</text>
      <line x1="155" y1="162" x2="165" y2="165" stroke="#f472b6" stroke-width="1"/>
      <line x1="145" y1="192" x2="165" y2="185" stroke="#f472b6" stroke-width="1"/>
      <!-- Ranking label -->
      <text x="10" y="55" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">1.</text>
      <text x="10" y="90" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">2.</text>
      <text x="10" y="125" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">3.</text>
      <text x="10" y="160" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">4.</text>
      <text x="10" y="195" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">5.</text>
    </svg>`,
    items: [
      { id: 'a', text: 'Copper (pure)' },
      { id: 'b', text: 'Aluminum 6061' },
      { id: 'c', text: 'Stainless steel 304' },
      { id: 'd', text: 'Titanium Ti-6Al-4V' },
      { id: 'e', text: 'Diamond' },
    ],
    correctOrder: ['e', 'a', 'b', 'c', 'd'],
    explanation: 'Diamond: ~2000 W/mK (phonon conduction in perfect lattice). Copper: ~400 W/mK. Aluminum 6061: ~170 W/mK. Stainless steel 304: ~16 W/mK. Titanium Ti-6Al-4V: ~6.7 W/mK. The surprise is that stainless steel, despite being commonly described as a "poor thermal conductor," is still about 2.5x better than titanium alloy.',
    interviewInsight: 'Knowing the relative thermal conductivities of common engineering materials is expected. The titanium vs. stainless steel comparison surprises many candidates.',
    realWorldConnection: 'This is why copper is used for heat sinks, aluminum for cookware, and why titanium exhaust manifolds glow red hot — titanium\'s terrible thermal conductivity traps heat.',
    commonMistake: 'Putting stainless steel last because it is commonly described as having "poor" thermal conductivity. Titanium alloys are actually worse.',
    tags: ['thermal-conductivity', 'copper', 'aluminum', 'titanium', 'stainless', 'diamond'],
  },

  // MAT-006 — Two Choice Tradeoff
  {
    id: 'mat-006',
    type: 'two-choice-tradeoff',
    topic: 'materials-engineering',
    subtopic: 'Composites',
    difficulty: 'advanced',
    question: 'You are designing a pressure vessel for a natural gas vehicle. Carbon fiber composite or steel?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Left: Steel Type I vessel -->
      <text x="100" y="18" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Steel (Type I)</text>
      <!-- Vessel body -->
      <ellipse cx="100" cy="100" rx="60" ry="70" fill="#334155" stroke="#60a5fa" stroke-width="3"/>
      <!-- Wall thickness indicator -->
      <ellipse cx="100" cy="100" rx="50" ry="60" fill="#334155" stroke="#60a5fa" stroke-width="1" stroke-dasharray="4,3"/>
      <!-- Wall thickness dimension -->
      <line x1="150" y1="100" x2="160" y2="100" stroke="#f472b6" stroke-width="1"/>
      <line x1="160" y1="40" x2="160" y2="100" stroke="#f472b6" stroke-width="1"/>
      <text x="165" y="70" fill="#f472b6" font-family="system-ui, sans-serif" font-size="8">thick wall</text>
      <!-- Valve on top -->
      <rect x="92" y="22" width="16" height="12" rx="2" fill="#94a3b8"/>
      <!-- Weight indicator -->
      <text x="100" y="100" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle" font-weight="bold">\u2193</text>
      <text x="100" y="120" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">HEAVY</text>
      <!-- Steel label -->
      <text x="100" y="145" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">4130 steel</text>

      <!-- Divider -->
      <line x1="200" y1="10" x2="200" y2="170" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>

      <!-- Right: Composite Type IV vessel -->
      <text x="300" y="18" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Composite (Type IV)</text>
      <!-- Vessel body - layered -->
      <ellipse cx="300" cy="100" rx="60" ry="70" fill="none" stroke="#34d399" stroke-width="2.5"/>
      <!-- Carbon fiber wrap pattern -->
      <path d="M260,60 L340,140" stroke="#34d399" stroke-width="0.5" opacity="0.5"/>
      <path d="M260,80 L340,120" stroke="#34d399" stroke-width="0.5" opacity="0.5"/>
      <path d="M260,100 L340,100" stroke="#34d399" stroke-width="0.5" opacity="0.5"/>
      <path d="M260,120 L340,80" stroke="#34d399" stroke-width="0.5" opacity="0.5"/>
      <path d="M260,140 L340,60" stroke="#34d399" stroke-width="0.5" opacity="0.5"/>
      <!-- Inner liner -->
      <ellipse cx="300" cy="100" rx="52" ry="62" fill="#334155" stroke="#f472b6" stroke-width="1" stroke-dasharray="3,2"/>
      <text x="300" y="90" fill="#f472b6" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">plastic liner</text>
      <!-- Lightweight indicator -->
      <text x="300" y="108" fill="#34d399" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle" font-weight="bold">\u2191</text>
      <text x="300" y="128" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">70% LIGHTER</text>
      <!-- Valve on top -->
      <rect x="292" y="22" width="16" height="12" rx="2" fill="#94a3b8"/>
      <!-- Composite label -->
      <text x="300" y="145" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">CFRP + liner</text>

      <!-- Comparison table -->
      <line x1="20" y1="175" x2="380" y2="175" stroke="#94a3b8" stroke-width="1"/>
      <!-- Headers -->
      <text x="130" y="190" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">Property</text>
      <text x="50" y="190" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Steel</text>
      <text x="350" y="190" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Composite</text>
      <line x1="20" y1="195" x2="380" y2="195" stroke="#94a3b8" stroke-width="0.5"/>
      <!-- Weight row -->
      <text x="50" y="210" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Heavy</text>
      <text x="130" y="210" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Weight</text>
      <text x="350" y="210" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Light</text>
      <!-- Cost row -->
      <text x="50" y="225" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Low</text>
      <text x="130" y="225" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Cost</text>
      <text x="350" y="225" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">5-10x more</text>
      <!-- Damage tolerance -->
      <text x="50" y="240" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Dents first</text>
      <text x="130" y="240" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Damage tol.</text>
      <text x="350" y="240" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Hidden delam.</text>
      <!-- Max pressure -->
      <text x="50" y="255" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">200-300 bar</text>
      <text x="130" y="255" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Max pressure</text>
      <text x="350" y="255" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">700 bar</text>
      <!-- Verdict -->
      <text x="200" y="275" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">For vehicles: composite wins (weight = range)</text>
    </svg>`,
    choices: [
      {
        id: 'a',
        text: 'Carbon fiber composite (Type IV: plastic liner + full carbon wrap)',
        pros: ['70% lighter than steel for same burst pressure', 'No corrosion from internal moisture or external environment', 'Higher specific strength allows thinner walls', 'Can store gas at higher pressures (700 bar for hydrogen)'],
        cons: ['5-10x higher manufacturing cost', 'Damage tolerance is poor — impact can create invisible delamination', 'Limited design life (15-25 years) due to stress rupture and fatigue', 'Inspection is complex — requires specialized NDT'],
      },
      {
        id: 'b',
        text: 'Steel (e.g., 4130 or 34CrMo4)',
        pros: ['Mature, well-understood technology', 'Excellent damage tolerance — dents before failing', 'Easy to inspect (visual, UT)', 'Lower cost, longer service life (30+ years)', 'Recyclable'],
        cons: ['Heavy — dominates vehicle weight penalty', 'Susceptible to corrosion if coating is damaged', 'Lower maximum working pressure for same weight', 'Internal surface can hydrogen-embrittle with certain gases'],
      },
    ],
    preferredAnswer: 'a',
    acceptableAnswer: 'either',
    justification: 'For a vehicle application where weight directly affects range and fuel economy, the carbon composite vessel is preferred despite higher cost. The 70% weight savings translates to significant range improvement. However, the design must account for impact damage vulnerability and the limited design life. Steel is better for stationary storage where weight is irrelevant.',
    explanation: 'This tradeoff appears in real CNG and hydrogen vehicle design. The industry is moving toward Type IV (all-composite) tanks for on-vehicle storage, while using steel Type I tanks for ground storage. Context determines the right answer.',
    interviewInsight: 'The interviewer wants to see that you understand the weight vs. cost vs. safety tradeoff and can tailor the recommendation to the application context.',
    commonMistake: 'Choosing steel because it is "safer" without considering that the weight penalty reduces vehicle range, which may be the critical design driver. Also, not knowing the Type I-IV classification of pressure vessels.',
    tags: ['composite', 'pressure-vessel', 'carbon-fiber', 'steel', 'CNG', 'hydrogen', 'weight'],
  },

  // MAT-007 — Confidence Rated
  {
    id: 'mat-007',
    type: 'confidence-rated',
    topic: 'materials-engineering',
    subtopic: 'Metals & Alloys',
    difficulty: 'beginner',
    question: 'What is the difference between hardness and toughness?',
    diagram: `<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg">
      <!-- Stress-strain axes -->
      <line x1="40" y1="20" x2="40" y2="200" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="40" y1="200" x2="380" y2="200" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="15" y="110" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" writing-mode="tb" text-anchor="middle">Stress (\u03c3)</text>
      <text x="210" y="218" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Strain (\u03b5)</text>
      <!-- Hard but brittle material (glass/ceramic) - steep then snap -->
      <path d="M40,200 L70,50 L75,200" fill="none" stroke="#f472b6" stroke-width="2.5"/>
      <!-- Shaded area under brittle curve (small = low toughness) -->
      <path d="M40,200 L70,50 L75,200 Z" fill="#f472b6" opacity="0.15"/>
      <text x="58" y="40" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Hard/Brittle</text>
      <text x="58" y="52" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">(glass, ceramic)</text>
      <!-- Tough material (mild steel) - moderate slope, large area -->
      <path d="M40,200 L80,100 Q120,80 200,75 Q280,85 320,120 L340,200" fill="none" stroke="#34d399" stroke-width="2.5"/>
      <!-- Shaded area under tough curve (large = high toughness) -->
      <path d="M40,200 L80,100 Q120,80 200,75 Q280,85 320,120 L340,200 Z" fill="#34d399" opacity="0.12"/>
      <text x="210" y="65" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" font-weight="bold">Tough</text>
      <text x="210" y="77" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">(tempered steel)</text>
      <!-- Soft but tough material (rubber-like) -->
      <path d="M40,200 L55,185 Q100,175 200,170 Q300,165 360,120 L370,200" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,3"/>
      <path d="M40,200 L55,185 Q100,175 200,170 Q300,165 360,120 L370,200 Z" fill="#60a5fa" opacity="0.08"/>
      <text x="310" y="110" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">Soft/Tough</text>
      <text x="310" y="122" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">(rubber)</text>
      <!-- Hardness annotation (slope/peak) -->
      <line x1="50" y1="50" x2="50" y2="105" stroke="#f472b6" stroke-width="1" stroke-dasharray="3,2"/>
      <line x1="45" y1="50" x2="55" y2="50" stroke="#f472b6" stroke-width="1"/>
      <line x1="45" y1="105" x2="55" y2="105" stroke="#f472b6" stroke-width="1"/>
      <text x="15" y="80" fill="#f472b6" font-family="system-ui, sans-serif" font-size="8">high</text>
      <text x="12" y="90" fill="#f472b6" font-family="system-ui, sans-serif" font-size="8">stress</text>
      <!-- Toughness annotation (area) -->
      <text x="170" y="155" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">area = TOUGHNESS</text>
      <text x="170" y="168" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">(energy absorbed)</text>
      <!-- Definitions box -->
      <rect x="15" y="225" width="370" height="40" rx="5" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
      <text x="200" y="240" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">HARDNESS = resistance to indentation/scratching</text>
      <text x="200" y="258" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">TOUGHNESS = total energy absorbed before fracture</text>
    </svg>`,
    options: [
      { id: 'a', text: 'They are the same thing — harder materials are also tougher' },
      { id: 'b', text: 'Hardness is resistance to indentation/scratching; toughness is the total energy a material can absorb before fracture' },
      { id: 'c', text: 'Hardness measures tensile strength; toughness measures compressive strength' },
      { id: 'd', text: 'Toughness is the elastic modulus; hardness is the yield strength' },
    ],
    correctAnswer: 'b',
    confidenceLevels: ['Guessing', 'Somewhat sure', 'Very confident'],
    explanation: 'Hardness measures resistance to localized plastic deformation (indentation or scratching). Toughness is the area under the entire stress-strain curve — the total energy per unit volume a material can absorb before fracturing. They are often inversely correlated: glass is hard but not tough (shatters easily); rubber is tough but not hard. Hardened tool steel can be hard AND tough if properly tempered.',
    interviewInsight: 'This is a definitional question that candidates either know cold or confuse badly. It is often asked early in an interview to gauge fundamental materials literacy.',
    commonMistake: 'Thinking harder = tougher. A very hard material (like hardened, untempered martensite) can be extremely brittle and shatter easily — low toughness despite high hardness.',
    tags: ['hardness', 'toughness', 'material-properties', 'stress-strain', 'fundamentals'],
  },

  // MAT-008 — Material Selection
  {
    id: 'mat-008',
    type: 'material-selection',
    topic: 'materials-engineering',
    subtopic: 'Material Selection',
    difficulty: 'advanced',
    question: 'Select a material for a surgical implant (hip joint femoral head) that must survive 30+ years inside the human body.',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Pelvis outline (simplified) -->
      <path d="M120,40 Q90,60 80,100 Q75,130 90,155 Q110,175 140,180" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <path d="M120,40 Q150,50 170,80 Q180,110 170,140 Q160,165 140,180" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <!-- Acetabular cup (socket) -->
      <path d="M115,130 Q130,105 160,110 Q175,120 170,140 Q160,160 140,165 Q120,160 115,130" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <text x="145" y="137" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle">Cup</text>
      <!-- Polymer liner -->
      <path d="M120,132 Q133,115 155,118 Q168,125 165,140 Q157,155 140,158 Q125,155 120,132" fill="#334155" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="100" y="115" fill="#f472b6" font-family="system-ui, sans-serif" font-size="7">UHMWPE</text>
      <text x="100" y="123" fill="#f472b6" font-family="system-ui, sans-serif" font-size="7">liner</text>
      <!-- Femoral head (ball) - CoCr -->
      <circle cx="145" cy="140" r="18" fill="#334155" stroke="#34d399" stroke-width="2.5"/>
      <text x="145" y="137" fill="#34d399" font-family="system-ui, sans-serif" font-size="7" text-anchor="middle" font-weight="bold">CoCrMo</text>
      <text x="145" y="146" fill="#34d399" font-family="system-ui, sans-serif" font-size="7" text-anchor="middle">HEAD</text>
      <!-- Femoral neck -->
      <rect x="138" y="155" width="14" height="30" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1.5" transform="rotate(15, 145, 170)"/>
      <!-- Femoral stem - Titanium -->
      <path d="M130,180 L140,180 L148,260 L125,260 Z" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <text x="137" y="225" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="8" text-anchor="middle" font-weight="bold">Ti-6Al-4V</text>
      <text x="137" y="235" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="7" text-anchor="middle">STEM</text>
      <!-- Femur bone outline -->
      <path d="M115,180 Q110,220 108,260" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
      <path d="M160,180 Q165,220 168,260" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="170" y="250" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">femur bone</text>
      <!-- Load arrow -->
      <line x1="145" y1="25" x2="145" y2="50" stroke="#fb923c" stroke-width="2"/>
      <polygon points="145,50 140,42 150,42" fill="#fb923c"/>
      <text x="145" y="20" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Body weight</text>
      <!-- Material requirements panel -->
      <rect x="210" y="20" width="180" height="120" rx="5" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
      <text x="300" y="38" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">Requirements:</text>
      <text x="220" y="55" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">\u2713 Biocompatible (no toxicity)</text>
      <text x="220" y="70" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">\u2713 Wear resistant (10\u2076+ cycles)</text>
      <text x="220" y="85" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">\u2713 Corrosion resistant (saline)</text>
      <text x="220" y="100" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">\u2713 High fatigue strength</text>
      <text x="220" y="115" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">\u2713 X-ray visible</text>
      <text x="220" y="130" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">\u2713 30+ year service life</text>
      <!-- Why CoCr for head -->
      <rect x="210" y="150" width="180" height="55" rx="5" fill="#334155" stroke="#34d399" stroke-width="1.5"/>
      <text x="300" y="167" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">CoCrMo for femoral head:</text>
      <text x="220" y="182" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Hardness: 35 HRC</text>
      <text x="220" y="195" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="9">Best wear + biocompat. combo</text>
      <!-- Why NOT Ti for head -->
      <rect x="210" y="215" width="180" height="48" rx="5" fill="#334155" stroke="#fb923c" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="300" y="232" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" font-weight="bold">NOT Ti for bearing surface:</text>
      <text x="220" y="247" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Poor wear \u2192 Ti debris \u2192</text>
      <text x="220" y="259" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">tissue inflammation</text>
      <!-- Cycle count -->
      <text x="30" y="275" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">~2 million walking cycles/year \u00d7 30 years = 60M+ cycles</text>
    </svg>`,
    requirements: [
      'Biocompatible — no toxic ion release, no immune response',
      'Extremely wear-resistant — millions of load cycles against a polymer or ceramic liner',
      'Corrosion-resistant in saline body fluid environment',
      'High fatigue strength for cyclic loading from walking (2 million cycles/year)',
      'Radiologically compatible — visible on X-ray for imaging',
    ],
    candidates: [
      { id: 'a', name: 'CoCrMo alloy (Cobalt-Chrome)', properties: 'Excellent wear resistance, proven biocompatibility, high fatigue strength, good corrosion resistance, high hardness (35 HRC), visible on X-ray' },
      { id: 'b', name: '316L Stainless Steel', properties: 'Good corrosion resistance, moderate wear resistance, cheaper than CoCr, but nickel content can cause allergic reaction, lower hardness' },
      { id: 'c', name: 'Ti-6Al-4V Titanium', properties: 'Excellent biocompatibility, lowest elastic modulus (reduces stress shielding), superb corrosion resistance, but poor wear resistance for articulating surfaces' },
      { id: 'd', name: 'Alumina Ceramic (Al2O3)', properties: 'Extremely hard and wear-resistant, inert and biocompatible, but brittle — risk of catastrophic fracture, difficult to manufacture precisely' },
    ],
    bestChoice: 'a',
    selectionReasoning: 'CoCrMo is the gold standard for hip femoral heads. Its combination of hardness, wear resistance, and corrosion resistance in body fluid is unmatched among metals. Ti-6Al-4V is excellent for stems (where low modulus reduces stress shielding) but terrible for articulating surfaces due to poor wear resistance. 316L SS has fallen out of favor due to nickel sensitivity concerns. Ceramic is an alternative for the femoral head but carries a small risk of catastrophic fracture.',
    explanation: 'Medical implant material selection is one of the most demanding applications in engineering. The material must survive a harsh chemical environment under millions of load cycles while producing no harmful biological response. Modern hip implants often use a CoCr femoral head on a Ti stem — each material optimized for its role.',
    interviewInsight: 'This is asked in biomedical engineering interviews but also in general materials science roles. It demonstrates that you can apply material selection principles to a highly constrained, life-critical application.',
    commonMistake: 'Choosing titanium for the femoral head. Titanium is great for implant stems but terrible for bearing surfaces — its oxide layer wears off and the released titanium debris causes tissue inflammation.',
    tags: ['biocompatible', 'implant', 'CoCr', 'titanium', 'wear', 'corrosion', 'medical'],
  },
];
