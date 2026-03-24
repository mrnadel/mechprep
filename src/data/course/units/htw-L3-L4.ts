import type { Lesson } from '../types';

export const lesson3: Lesson = {
  id: 'htw-L3',
  title: 'Around the House',
  description: 'Discover the mechanical engineering principles hiding in everyday household items — from door hinges to AC units.',
  icon: '🏠',
  xpReward: 25,
  questions: [
    // --- DOOR HINGE / DOOR CLOSER ---
    {
      id: 'htw-L3-Q1',
      type: 'multiple-choice',
      question: 'A door hinge allows the door to rotate about a fixed axis. In structural analysis, what type of support does a hinge pin represent?',
      options: [
        'Fixed support — constrains both translation and rotation',
        'Pin joint — constrains translation but allows free rotation',
        'Roller support — constrains translation in one direction only',
        'Moment connection — transmits bending moment across the joint',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="8" y="15" width="6" height="50" rx="1" fill="#3B8700" fill-opacity="0.2" stroke="#3B8700" stroke-width="1.5"/><circle cx="14" cy="30" r="3.5" stroke="#3B8700" stroke-width="2" fill="none"/><circle cx="14" cy="30" r="1.2" fill="#3B8700"/><rect x="14" y="22" width="40" height="16" rx="2" stroke="#3B8700" stroke-width="1.5" fill="#A5E86C" fill-opacity="0.15"><animateTransform attributeName="transform" type="rotate" values="0 14 30;12 14 30;0 14 30" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></rect><line x1="14" y1="30" x2="8" y2="36" stroke="#58CC02" stroke-width="1.5" marker-end="url(#ap1)"/><line x1="14" y1="30" x2="8" y2="24" stroke="#58CC02" stroke-width="1.5" marker-end="url(#ap1)"/><text x="3" y="30" font-size="3.5" fill="#58CC02">R</text><defs><marker id="ap1" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><text x="40" y="56" text-anchor="middle" font-size="4" fill="#334155">Pin joint</text><text x="40" y="64" text-anchor="middle" font-size="3.5" fill="#6B7280">Rx, Ry reactions</text><text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#6B7280">M = 0 (free rotation)</text></svg>`,
      correctIndex: 1,
      explanation: 'A hinge pin constrains translational movement (the door cannot slide off its frame) but allows rotation about the pin axis. This is the classic pin/hinge support used in statics: it provides two reaction force components but zero moment reaction.',
    },
    {
      id: 'htw-L3-Q2',
      type: 'multiple-choice',
      question: 'A hydraulic door closer exerts a closing torque of 8 N·m. If the door handle is 0.9 m from the hinge, what minimum force must you apply at the handle to hold the door open?',
      options: [
        'About 4.5 N',
        'About 7.2 N',
        'About 8.9 N',
        'About 12.0 N',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
  <rect x="2" y="2" width="76" height="76" rx="8" fill="#58CC02" opacity="0.06"/>
  <!-- Hinge pin -->
  <circle cx="15" cy="40" r="3.5" stroke="#3B8700" stroke-width="2" fill="none"/>
  <circle cx="15" cy="40" r="1" fill="#3B8700"/>
  <!-- Door (animated rotation) -->
  <g transform-origin="15 40">
    <animateTransform attributeName="transform" type="rotate" values="0 15 40;15 15 40;0 15 40" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/>
    <rect x="15" y="30" width="45" height="20" rx="1.5" stroke="#3B8700" stroke-width="2" fill="#A5E86C" opacity="0.35"/>
    <!-- Handle dot -->
    <circle cx="55" cy="40" r="2" fill="#3B8700"/>
    <!-- Distance label "d" -->
    <line x1="15" y1="55" x2="55" y2="55" stroke="#6B7280" stroke-width="1" stroke-dasharray="2 1.5"/>
    <text x="35" y="60" font-size="5" fill="#334155" text-anchor="middle" font-style="italic">d</text>
    <!-- Force arrow at handle -->
    <line x1="55" y1="28" x2="55" y2="18" stroke="#58CC02" stroke-width="2"/>
    <polygon points="55,16 52.5,21 57.5,21" fill="#58CC02"/>
    <text x="60" y="17" font-size="5" fill="#334155" font-style="italic">F</text>
  </g>
  <!-- Torque curved arrow at hinge -->
  <path d="M 22 30 A 12 12 0 0 1 22 50" stroke="#58CC02" stroke-width="1.8" fill="none"/>
  <polygon points="22,50 19,46 24,47" fill="#58CC02"/>
  <text x="27" y="28" font-size="4.5" fill="#334155" font-style="italic">τ</text>
  <!-- Labels -->
  <text x="40" y="74" font-size="4" fill="#6B7280" text-anchor="middle">Torque = F × d</text>
</svg>`,
      correctIndex: 2,
      explanation: 'Torque = Force × distance. To balance 8 N·m at 0.9 m: F = 8 / 0.9 ≈ 8.9 N. This is a direct application of moment equilibrium about the hinge axis — the same principle used to size actuators and select motors.',
      hint: 'Rearrange τ = F × d to solve for F.',
    },
    // --- TOILET FLUSH ---
    {
      id: 'htw-L3-Q3',
      type: 'multiple-choice',
      question: 'A toilet flushes using a siphon. What primarily drives the water over the siphon crest and into the drain?',
      options: [
        'Gravity pulling the taller drain-side water column creates a pressure difference',
        'A mechanical pump mechanism built into the toilet base below the bowl',
        'Water pressure from the supply line pushing water through the bowl',
        'Capillary action drawing water upward through the narrow siphon tube',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
  <rect x="2" y="2" width="76" height="76" rx="8" fill="#58CC02" opacity="0.06"/>
  <!-- Bowl outline -->
  <path d="M 12 25 L 12 55 Q 12 62 20 62 L 28 62 Q 32 62 32 58 L 32 48" stroke="#3B8700" stroke-width="2" fill="none"/>
  <!-- S-shaped siphon trap -->
  <path d="M 32 48 Q 32 38 38 38 Q 44 38 44 48 Q 44 58 50 58 Q 56 58 56 48 L 56 70" stroke="#3B8700" stroke-width="2" fill="none"/>
  <!-- Water in bowl -->
  <path d="M 14 42 L 14 55 Q 14 60 20 60 L 28 60 Q 30 60 30 56 L 30 48 Q 30 40 36 40 Q 40 40 42 44" fill="#58CC02" opacity="0.18"/>
  <!-- Animated water flow over crest -->
  <circle r="1.5" fill="#58CC02" opacity="0.7">
    <animateMotion dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1" path="M 30 48 Q 30 36 38 36 Q 46 36 46 48 Q 46 60 52 60 L 56 65"/>
  </circle>
  <circle r="1.5" fill="#58CC02" opacity="0.7">
    <animateMotion dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1" path="M 30 48 Q 30 36 38 36 Q 46 36 46 48 Q 46 60 52 60 L 56 65" begin="0.7s"/>
  </circle>
  <!-- Water surface in bowl -->
  <line x1="14" y1="42" x2="30" y2="42" stroke="#58CC02" stroke-width="1.5"/>
  <!-- Atmospheric pressure arrows -->
  <line x1="18" y1="30" x2="18" y2="39" stroke="#6B7280" stroke-width="1.5"/>
  <polygon points="18,40 16,36 20,36" fill="#6B7280"/>
  <line x1="25" y1="30" x2="25" y2="39" stroke="#6B7280" stroke-width="1.5"/>
  <polygon points="25,40 23,36 27,36" fill="#6B7280"/>
  <text x="21" y="27" font-size="3.5" fill="#6B7280" text-anchor="middle">P_atm</text>
  <!-- Siphon crest label -->
  <text x="38" y="33" font-size="3.5" fill="#334155" text-anchor="middle">crest</text>
  <!-- Drain arrow -->
  <line x1="56" y1="65" x2="56" y2="73" stroke="#3B8700" stroke-width="1.5"/>
  <polygon points="56,75 53.5,71 58.5,71" fill="#3B8700"/>
  <text x="63" y="73" font-size="3.5" fill="#6B7280">drain</text>
</svg>`,
      correctIndex: 0,
      explanation: 'Once the siphon is primed (water rises over the crest), the taller water column on the drain side creates a lower pressure at the crest than atmospheric pressure on the bowl side. Atmospheric pressure then pushes bowl water up and over. This is the same principle used in siphon-based flow measurement and priming of pumps.',
    },
    {
      id: 'htw-L3-Q4',
      type: 'true-false',
      question: 'A toilet fill valve uses a float mechanism that acts as a feedback control system: the rising water level lifts the float, which closes the valve to stop filling — analogous to a proportional controller.',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="15" y="20" width="30" height="40" rx="2" stroke="#3B8700" stroke-width="2" fill="#58CC02" fill-opacity="0.08"/><rect x="15" y="40" width="30" height="20" fill="#58CC02" fill-opacity="0.15"><animate attributeName="y" values="50;30;50" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/><animate attributeName="height" values="10;30;10" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></rect><circle cx="38" cy="45" r="4" fill="#A5E86C" fill-opacity="0.4" stroke="#3B8700" stroke-width="1.5"><animate attributeName="cy" values="50;30;50" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></circle><text x="44" y="38" font-size="3" fill="#334155">float</text><line x1="38" y1="45" x2="50" y2="25" stroke="#3B8700" stroke-width="1.5"/><rect x="48" y="20" width="8" height="10" rx="1" stroke="#3B8700" stroke-width="1.5" fill="#3B8700" fill-opacity="0.15"/><text x="52" y="17" text-anchor="middle" font-size="3" fill="#6B7280">valve</text><path d="M56,25 L64,25 L64,30 L56,30" stroke="#6B7280" stroke-width="1" stroke-dasharray="2 1"/><text x="64" y="24" font-size="3" fill="#6B7280">supply</text><text x="40" y="70" text-anchor="middle" font-size="3.5" fill="#334155">Negative feedback loop</text><text x="40" y="77" text-anchor="middle" font-size="3.5" fill="#6B7280">Level↑ → float↑ → valve closes</text></svg>`,
      correctAnswer: true,
      explanation: 'The float-valve is a classic negative feedback loop. The controlled variable (water level) is sensed by the float, which mechanically adjusts the valve opening. As level rises, the valve progressively closes. This proportional control concept appears in pressure regulators, thermostats, and governor mechanisms throughout engineering.',
    },
    // --- AC UNIT / HVAC ---
    {
      id: 'htw-L3-Q5',
      type: 'multiple-choice',
      question: 'In a split air conditioning system, the indoor unit contains the evaporator and the outdoor unit contains the condenser. Why does the indoor unit cool the room?',
      options: [
        'The compressor in the indoor unit generates cold air directly by expansion',
        'Refrigerant evaporates at low pressure in the indoor coil, absorbing room heat',
        'The outdoor condenser pumps pre-cooled air through ducts to the indoor unit',
        'An electric Peltier cooling element in the indoor unit removes thermal energy',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
  <rect x="2" y="2" width="76" height="76" rx="8" fill="#58CC02" opacity="0.06"/>
  <!-- Indoor unit -->
  <rect x="4" y="12" width="28" height="18" rx="3" stroke="#3B8700" stroke-width="2" fill="#A5E86C" opacity="0.15"/>
  <text x="18" y="20" font-size="3.5" fill="#334155" text-anchor="middle">Evaporator</text>
  <!-- Evaporator coil -->
  <path d="M 8 24 Q 11 22 14 24 Q 17 26 20 24 Q 23 22 26 24" stroke="#58CC02" stroke-width="1.5" fill="none"/>
  <!-- Cold air arrows from indoor unit -->
  <line x1="10" y1="33" x2="10" y2="38" stroke="#58CC02" stroke-width="1.5"/>
  <polygon points="10,39 8,35.5 12,35.5" fill="#58CC02"/>
  <line x1="18" y1="33" x2="18" y2="38" stroke="#58CC02" stroke-width="1.5"/>
  <polygon points="18,39 16,35.5 20,35.5" fill="#58CC02"/>
  <line x1="26" y1="33" x2="26" y2="38" stroke="#58CC02" stroke-width="1.5"/>
  <polygon points="26,39 24,35.5 28,35.5" fill="#58CC02"/>
  <text x="18" y="44" font-size="3.5" fill="#58CC02" text-anchor="middle">cool air</text>
  <!-- Outdoor unit -->
  <rect x="48" y="12" width="28" height="18" rx="3" stroke="#3B8700" stroke-width="2" fill="#A5E86C" opacity="0.15"/>
  <text x="62" y="20" font-size="3.5" fill="#334155" text-anchor="middle">Condenser</text>
  <!-- Condenser coil -->
  <path d="M 52 24 Q 55 22 58 24 Q 61 26 64 24 Q 67 22 70 24" stroke="#3B8700" stroke-width="1.5" fill="none"/>
  <!-- Hot air arrows from outdoor unit -->
  <line x1="54" y1="10" x2="54" y2="5" stroke="#3B8700" stroke-width="1.5"/>
  <polygon points="54,3.5 51.5,7.5 56.5,7.5" fill="#3B8700"/>
  <line x1="62" y1="10" x2="62" y2="5" stroke="#3B8700" stroke-width="1.5"/>
  <polygon points="62,3.5 59.5,7.5 64.5,7.5" fill="#3B8700"/>
  <line x1="70" y1="10" x2="70" y2="5" stroke="#3B8700" stroke-width="1.5"/>
  <polygon points="70,3.5 67.5,7.5 72.5,7.5" fill="#3B8700"/>
  <text x="62" y="2" font-size="3.5" fill="#3B8700" text-anchor="middle">hot air</text>
  <!-- Connecting pipes -->
  <line x1="32" y1="17" x2="48" y2="17" stroke="#3B8700" stroke-width="1.5"/>
  <line x1="32" y1="25" x2="48" y2="25" stroke="#3B8700" stroke-width="1.5"/>
  <!-- Animated refrigerant dots — top pipe (to condenser) -->
  <circle r="1.8" fill="#58CC02">
    <animateMotion dur="2s" repeatCount="indefinite" path="M 32 17 L 48 17" calcMode="spline" keySplines="0.3 0 0.7 1"/>
  </circle>
  <circle r="1.8" fill="#58CC02">
    <animateMotion dur="2s" repeatCount="indefinite" path="M 32 17 L 48 17" calcMode="spline" keySplines="0.3 0 0.7 1" begin="1s"/>
  </circle>
  <!-- Animated refrigerant dots — bottom pipe (to evaporator) -->
  <circle r="1.8" fill="#3B8700">
    <animateMotion dur="2s" repeatCount="indefinite" path="M 48 25 L 32 25" calcMode="spline" keySplines="0.3 0 0.7 1"/>
  </circle>
  <circle r="1.8" fill="#3B8700">
    <animateMotion dur="2s" repeatCount="indefinite" path="M 48 25 L 32 25" calcMode="spline" keySplines="0.3 0 0.7 1" begin="1s"/>
  </circle>
  <!-- Circuit labels -->
  <text x="40" y="55" font-size="3.5" fill="#6B7280" text-anchor="middle">Refrigerant circuit</text>
  <!-- Circular flow arrows -->
  <path d="M 18 50 L 18 60 Q 18 66 24 66 L 56 66 Q 62 66 62 60 L 62 50" stroke="#6B7280" stroke-width="1" stroke-dasharray="2 1.5" fill="none"/>
  <polygon points="62,50 60,53 64,53" fill="#6B7280"/>
  <polygon points="18,50 16,53 20,53" fill="#6B7280"/>
</svg>`,
      correctIndex: 1,
      explanation: 'The refrigerant enters the evaporator as a low-pressure liquid. It absorbs latent heat from room air to evaporate, cooling the air blown over the coil. This phase-change heat absorption is the core of the vapor-compression refrigeration cycle used in virtually all residential and commercial HVAC systems.',
    },
    {
      id: 'htw-L3-Q6',
      type: 'fill-blank',
      question: 'The Coefficient of Performance (COP) of a heat pump for cooling equals the _____ removed from the cold space divided by the _____ input to the compressor.',
      blanks: ['heat', 'work'],
      wordBank: ['heat', 'work', 'temperature', 'pressure', 'entropy'],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="25" y="28" width="30" height="20" rx="4" stroke="#3B8700" stroke-width="2" fill="#A5E86C" fill-opacity="0.12"/><text x="40" y="41" text-anchor="middle" font-size="4" fill="#334155">HP</text><line x1="40" y1="20" x2="40" y2="26" stroke="#58CC02" stroke-width="2" marker-end="url(#ac4)"/><text x="40" y="16" text-anchor="middle" font-size="4" fill="#58CC02">Q_cold</text><line x1="40" y1="50" x2="40" y2="56" stroke="#3B8700" stroke-width="2" marker-end="url(#ac5)"/><text x="40" y="64" text-anchor="middle" font-size="4" fill="#3B8700">Q_hot</text><line x1="60" y1="38" x2="57" y2="38" stroke="#334155" stroke-width="2" marker-end="url(#ac6)"/><text x="66" y="40" font-size="4" fill="#334155">W</text><defs><marker id="ac4" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker><marker id="ac5" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#3B8700" d="M0,0 L4,1.5 L0,3Z"/></marker><marker id="ac6" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#334155" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><text x="40" y="76" text-anchor="middle" font-size="4" fill="#6B7280">COP = Q_cold / W</text></svg>`,
      explanation: 'COP_cooling = Q_cold / W_input. A COP of 3 means for every 1 kW of electrical work, 3 kW of heat is removed from the room. Understanding COP is critical for HVAC system design and energy efficiency analysis.',
    },
    {
      id: 'htw-L3-Q7',
      type: 'multiple-choice',
      question: 'A home thermostat turns the AC compressor on when temperature exceeds the setpoint and off when it drops below. What type of control action is this?',
      options: [
        'Proportional (P) control with variable output',
        'On-off (bang-bang) control with fixed output',
        'PID control with derivative damping term',
        'Open-loop feedforward control without sensing',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><line x1="10" y1="40" x2="72" y2="40" stroke="#6B7280" stroke-width="0.8" stroke-dasharray="2 1.5"/><line x1="10" y1="10" x2="10" y2="70" stroke="#3B8700" stroke-width="1.5"/><line x1="10" y1="70" x2="72" y2="70" stroke="#3B8700" stroke-width="1.5"/><text x="6" y="30" font-size="3.5" fill="#334155" transform="rotate(-90 6 30)">T</text><text x="42" y="78" font-size="3.5" fill="#334155">time</text><text x="72" y="38" font-size="3" fill="#6B7280">setpoint</text><path d="M10,45 L18,45 L18,35 L28,35 L28,45 L38,45 L38,35 L48,35 L48,45 L58,45 L58,35 L68,35" stroke="#58CC02" stroke-width="2" fill="none"/><path d="M10,50 L18,44 L28,48 L38,42 L48,46 L58,42 L68,44" stroke="#A5E86C" stroke-width="1.5" fill="none" stroke-dasharray="3 2"/><text x="15" y="22" font-size="3.5" fill="#58CC02">ON</text><text x="24" y="54" font-size="3.5" fill="#6B7280">OFF</text><text x="40" y="64" text-anchor="middle" font-size="4" fill="#334155">Bang-bang control</text></svg>`,
      correctIndex: 1,
      explanation: 'A basic thermostat is an on-off (bang-bang) controller: the output is either fully on or fully off based on a threshold. This produces a characteristic oscillation around the setpoint. More advanced HVAC systems use PID or proportional control for smoother temperature regulation.',
      hint: 'The compressor is either 100% on or 100% off — no in-between.',
    },
    // --- LIGHT SWITCH ---
    {
      id: 'htw-L3-Q8',
      type: 'true-false',
      question: 'A standard household light switch uses a snap-action (over-center) mechanism with a spring to ensure rapid contact transition, which minimizes electrical arcing.',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="28" y="16" width="24" height="44" rx="3" stroke="#3B8700" stroke-width="2" fill="#A5E86C" fill-opacity="0.1"/><circle cx="40" cy="30" r="3" fill="#3B8700"/><circle cx="40" cy="50" r="3" fill="#3B8700"/><line x1="40" y1="30" x2="40" y2="50" stroke="#58CC02" stroke-width="2"><animateTransform attributeName="transform" type="rotate" values="20 40 50;-20 40 50;20 40 50" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></line><path d="M36,40 Q40,35 44,40" stroke="#3B8700" stroke-width="1.5" fill="none"/><text x="48" y="40" font-size="3" fill="#3B8700">spring</text><text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#334155">Snap-action switch</text><text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#6B7280">Fast flip → min arcing</text></svg>`,
      correctAnswer: true,
      explanation: 'The snap-action mechanism stores elastic energy in a spring that rapidly flips the contacts past the unstable equilibrium point. This fast transition minimizes the time contacts spend partially separated — when arcing and contact erosion are worst. This bistable mechanism concept appears in circuit breakers, relay contacts, and MEMS switches.',
    },
    {
      id: 'htw-L3-Q9',
      type: 'multiple-choice',
      question: 'In a snap-action light switch, the mechanism has two stable positions (on and off) with an unstable equilibrium between them. What is this type of mechanism called?',
      options: [
        'Monostable mechanism',
        'Bistable (over-center) mechanism',
        'Astable oscillator',
        'Critically damped mechanism',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><line x1="10" y1="55" x2="70" y2="55" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="74" text-anchor="middle" font-size="4" fill="#334155">Energy landscape</text><path d="M12,50 C18,50 22,30 30,30 C38,30 40,50 40,50 C40,50 42,30 50,30 C58,30 62,50 68,50" stroke="#3B8700" stroke-width="2" fill="none"/><circle cx="22" cy="50" r="3" fill="#58CC02" fill-opacity="0.5"/><text x="22" y="42" text-anchor="middle" font-size="3.5" fill="#58CC02">ON</text><circle cx="58" cy="50" r="3" fill="#58CC02" fill-opacity="0.5"/><text x="58" y="42" text-anchor="middle" font-size="3.5" fill="#58CC02">OFF</text><circle cx="40" cy="30" r="2" fill="#6B7280" fill-opacity="0.3"/><text x="40" y="24" text-anchor="middle" font-size="3" fill="#6B7280">unstable</text><text x="40" y="66" text-anchor="middle" font-size="3.5" fill="#6B7280">Bistable: 2 stable states</text></svg>`,
      correctIndex: 1,
      explanation: 'A bistable mechanism has two stable equilibrium positions separated by an energy barrier (unstable equilibrium). The spring must be pushed past the over-center point, after which stored energy snaps it to the other stable state. This concept is fundamental in mechanism design, from toggle clamps to digital memory elements.',
    },
    // --- WASHING MACHINE ---
    {
      id: 'htw-L3-Q10',
      type: 'multiple-choice',
      question: 'During the spin cycle, a washing machine removes water from clothes by spinning the drum at high speed. What force drives the water out through the drum perforations?',
      options: [
        'Gravitational force pulling water downward',
        'Centrifugal effect — the water\'s inertia carries it radially outward as the drum rotates',
        'Vacuum suction created at the drum center',
        'Electromagnetic force from the motor repelling water molecules',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
  <rect x="2" y="2" width="76" height="76" rx="8" fill="#58CC02" opacity="0.06"/>
  <!-- Outer drum circle -->
  <circle cx="40" cy="38" r="26" stroke="#3B8700" stroke-width="2" fill="none"/>
  <!-- Drum perforations -->
  <circle cx="40" cy="12" r="1" fill="#6B7280"/>
  <circle cx="62" cy="24" r="1" fill="#6B7280"/>
  <circle cx="66" cy="38" r="1" fill="#6B7280"/>
  <circle cx="62" cy="52" r="1" fill="#6B7280"/>
  <circle cx="40" cy="64" r="1" fill="#6B7280"/>
  <circle cx="18" cy="52" r="1" fill="#6B7280"/>
  <circle cx="14" cy="38" r="1" fill="#6B7280"/>
  <circle cx="18" cy="24" r="1" fill="#6B7280"/>
  <!-- Inner contents (clothes mass) rotating -->
  <g>
    <animateTransform attributeName="transform" type="rotate" values="0 40 38;360 40 38" dur="2s" repeatCount="indefinite"/>
    <!-- Clothes blobs -->
    <ellipse cx="35" cy="30" rx="5" ry="3.5" fill="#A5E86C" opacity="0.5"/>
    <ellipse cx="48" cy="42" rx="4" ry="3" fill="#A5E86C" opacity="0.5"/>
    <ellipse cx="33" cy="46" rx="4.5" ry="3" fill="#A5E86C" opacity="0.5"/>
  </g>
  <!-- Animated water droplets flung outward -->
  <circle r="1.2" fill="#58CC02" opacity="0.8">
    <animate attributeName="cx" values="46,68" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1"/>
    <animate attributeName="cy" values="30,18" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1"/>
    <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle r="1.2" fill="#58CC02" opacity="0.8">
    <animate attributeName="cx" values="48,72" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1" begin="0.5s"/>
    <animate attributeName="cy" values="44,52" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1" begin="0.5s"/>
    <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" begin="0.5s"/>
  </circle>
  <circle r="1.2" fill="#58CC02" opacity="0.8">
    <animate attributeName="cx" values="32,10" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1" begin="1s"/>
    <animate attributeName="cy" values="48,60" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1" begin="1s"/>
    <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" begin="1s"/>
  </circle>
  <circle r="1.2" fill="#58CC02" opacity="0.8">
    <animate attributeName="cx" values="34,12" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1" begin="1.5s"/>
    <animate attributeName="cy" values="30,20" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1" begin="1.5s"/>
    <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" begin="1.5s"/>
  </circle>
  <!-- Radial outward arrows -->
  <line x1="52" y1="25" x2="60" y2="19" stroke="#58CC02" stroke-width="1.5"/>
  <polygon points="62,17.5 57,20 59,24" fill="#58CC02"/>
  <line x1="52" y1="50" x2="60" y2="56" stroke="#58CC02" stroke-width="1.5"/>
  <polygon points="62,58 59,52 57,56" fill="#58CC02"/>
  <!-- Center dot -->
  <circle cx="40" cy="38" r="1.5" fill="#3B8700"/>
  <!-- Label -->
  <text x="40" y="74" font-size="4" fill="#6B7280" text-anchor="middle">centrifugal direction</text>
</svg>`,
      correctIndex: 1,
      explanation: 'In the rotating reference frame, the centrifugal effect pushes water radially outward through the drum holes. In the inertial frame, the water\'s inertia resists the circular path and it flies off tangentially. Understanding rotating-frame pseudo-forces is essential for designing centrifuges, separators, and rotating machinery.',
      hint: 'Think about what happens to objects in a rotating frame — Newton\'s first law.',
    },
    {
      id: 'htw-L3-Q11',
      type: 'fill-blank',
      question: 'Washing machines have rubber feet or spring mounts to reduce _____ transmitted to the floor, a technique known as vibration _____.',
      blanks: ['vibrations', 'isolation'],
      wordBank: ['vibrations', 'isolation', 'amplification', 'resonance', 'damping'],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="20" y="18" width="40" height="28" rx="3" stroke="#3B8700" stroke-width="2" fill="#A5E86C" fill-opacity="0.1"><animate attributeName="y" values="18;15;18;21;18" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1"/></rect><text x="40" y="34" text-anchor="middle" font-size="4" fill="#334155">Machine</text><ellipse cx="25" cy="52" rx="4" ry="3" fill="#58CC02" fill-opacity="0.3" stroke="#58CC02" stroke-width="1.5"><animate attributeName="ry" values="3;2;3;4;3" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1"/></ellipse><ellipse cx="55" cy="52" rx="4" ry="3" fill="#58CC02" fill-opacity="0.3" stroke="#58CC02" stroke-width="1.5"><animate attributeName="ry" values="3;2;3;4;3" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1;0.3 0 0.7 1"/></ellipse><line x1="10" y1="56" x2="70" y2="56" stroke="#6B7280" stroke-width="1.5"/><text x="25" y="62" text-anchor="middle" font-size="3" fill="#58CC02">rubber</text><text x="55" y="62" text-anchor="middle" font-size="3" fill="#58CC02">rubber</text><text x="40" y="72" text-anchor="middle" font-size="4" fill="#334155">Vibration isolation</text></svg>`,
      explanation: 'Vibration isolation uses compliant mounts (springs, rubber pads) to decouple the machine from the floor. The mount\'s natural frequency is designed to be well below the operating frequency so that force transmissibility is less than 1. This is the same principle used for engine mounts, sensitive instrument platforms, and building seismic isolation.',
    },
    {
      id: 'htw-L3-Q12',
      type: 'true-false',
      question: 'An unbalanced load in a spinning washing machine drum can cause dangerous resonance if the spin-up speed passes through the drum\'s natural frequency.',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><line x1="10" y1="60" x2="72" y2="60" stroke="#3B8700" stroke-width="1.5"/><line x1="10" y1="60" x2="10" y2="8" stroke="#3B8700" stroke-width="1.5"/><text x="6" y="34" font-size="3.5" fill="#334155" transform="rotate(-90 6 34)">Amp</text><text x="42" y="68" font-size="3.5" fill="#334155">RPM</text><path d="M12,58 C20,56 28,50 35,15 C38,8 42,8 45,15 C52,50 60,56 68,58" stroke="#58CC02" stroke-width="2.5" fill="none"/><line x1="40" y1="60" x2="40" y2="10" stroke="#6B7280" stroke-width="0.8" stroke-dasharray="2 1.5"/><text x="40" y="7" text-anchor="middle" font-size="3.5" fill="#58CC02">resonance</text><text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#6B7280">ω_spin = ω_natural</text></svg>`,
      correctAnswer: true,
      explanation: 'As the drum accelerates, it passes through a range of frequencies. If an unbalanced mass is present and the rotational frequency matches the system\'s natural frequency, resonance occurs — dramatically amplifying vibrations. Modern machines use accelerometers to detect this and redistribute the load before reaching critical speed. This is identical to the critical speed problem in rotating shafts.',
    },
    // --- STAIRS/FLOORS ---
    {
      id: 'htw-L3-Q13',
      type: 'multiple-choice',
      question: 'A living room floor is designed to carry furniture and occupants. In structural engineering, how is this type of loading best classified?',
      options: [
        'A concentrated point load at the center of the floor',
        'A uniformly distributed load (UDL) over the floor area',
        'A moment couple applied to the floor edges',
        'An axial compressive load along the floor joists',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><line x1="10" y1="40" x2="70" y2="40" stroke="#3B8700" stroke-width="2.5"/><polygon points="10,42 10,48 14,48" fill="#6B7280"/><line x1="8" y1="48" x2="16" y2="48" stroke="#6B7280" stroke-width="1"/><circle cx="70" cy="43" r="2.5" fill="none" stroke="#6B7280" stroke-width="1"/><line x1="67" y1="47" x2="73" y2="47" stroke="#6B7280" stroke-width="1"/><line x1="15" y1="32" x2="15" y2="38" stroke="#58CC02" stroke-width="1.5" marker-end="url(#au1)"/><line x1="25" y1="32" x2="25" y2="38" stroke="#58CC02" stroke-width="1.5" marker-end="url(#au1)"/><line x1="35" y1="32" x2="35" y2="38" stroke="#58CC02" stroke-width="1.5" marker-end="url(#au1)"/><line x1="45" y1="32" x2="45" y2="38" stroke="#58CC02" stroke-width="1.5" marker-end="url(#au1)"/><line x1="55" y1="32" x2="55" y2="38" stroke="#58CC02" stroke-width="1.5" marker-end="url(#au1)"/><line x1="65" y1="32" x2="65" y2="38" stroke="#58CC02" stroke-width="1.5" marker-end="url(#au1)"/><line x1="12" y1="30" x2="68" y2="30" stroke="#58CC02" stroke-width="1.5"/><text x="40" y="26" text-anchor="middle" font-size="4" fill="#58CC02" font-style="italic">w (N/m)</text><defs><marker id="au1" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><text x="40" y="60" text-anchor="middle" font-size="4" fill="#334155">Uniformly Distributed Load</text><text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#6B7280">~1.9 kPa residential</text></svg>`,
      correctIndex: 1,
      explanation: 'Building codes model floor loads as uniformly distributed loads (UDL), typically specified in kPa or psf. For residential floors, this is usually about 1.9 kPa (40 psf). Structural engineers use this UDL to calculate bending moments and deflections in beams and joists — the same beam analysis used in machine frame design.',
    },
    {
      id: 'htw-L3-Q14',
      type: 'multiple-choice',
      question: 'Building codes limit floor deflection to L/360 (span/360) under live load. Why is this deflection limit important even though the floor is still structurally safe?',
      options: [
        'Deflection beyond L/360 causes immediate structural collapse',
        'Excessive deflection causes cracking in finishes, visible sagging, and occupant discomfort',
        'L/360 is the yield point deflection for all structural steel beams',
        'Deflection limits exist only for aesthetic reasons and have no functional significance',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><line x1="10" y1="30" x2="70" y2="30" stroke="#6B7280" stroke-width="0.8" stroke-dasharray="2 1.5"/><line x1="10" y1="30" x2="10" y2="50" stroke="#3B8700" stroke-width="2"/><line x1="70" y1="30" x2="70" y2="50" stroke="#3B8700" stroke-width="2"/><path d="M10,30 Q40,45 70,30" stroke="#58CC02" stroke-width="2.5" fill="none"/><line x1="40" y1="30" x2="40" y2="38" stroke="#334155" stroke-width="1" stroke-dasharray="1 1"/><text x="44" y="38" font-size="4" fill="#334155" font-style="italic">δ</text><line x1="10" y1="54" x2="70" y2="54" stroke="#6B7280" stroke-width="1" stroke-dasharray="2 1"/><text x="40" y="52" text-anchor="middle" font-size="3.5" fill="#6B7280" font-style="italic">L</text><text x="40" y="64" text-anchor="middle" font-size="4" fill="#334155">δ_max ≤ L/360</text><text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#6B7280">Serviceability, not strength</text></svg>`,
      correctIndex: 1,
      explanation: 'The L/360 limit is a serviceability criterion, not a strength criterion. Excessive deflection can crack plaster and tile, cause doors to jam, make floors feel bouncy, and create visible sagging. Serviceability limits are equally important in machine design — shaft deflection limits prevent gear misalignment and bearing damage.',
      hint: 'The floor won\'t break, but something else will go wrong.',
    },
    // --- WINDOW GLASS ---
    {
      id: 'htw-L3-Q15',
      type: 'fill-blank',
      question: 'Double-glazed windows reduce heat loss by trapping a layer of _____ between two panes, which has low thermal _____ and thus resists heat flow.',
      blanks: ['gas', 'conductivity'],
      wordBank: ['gas', 'conductivity', 'capacity', 'liquid', 'density'],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="18" y="12" width="5" height="52" rx="1" fill="#58CC02" fill-opacity="0.15" stroke="#3B8700" stroke-width="1.5"/><rect x="38" y="12" width="5" height="52" rx="1" fill="#58CC02" fill-opacity="0.15" stroke="#3B8700" stroke-width="1.5"/><rect x="23" y="12" width="15" height="52" rx="0" fill="#A5E86C" fill-opacity="0.08"/><text x="30" y="40" text-anchor="middle" font-size="3.5" fill="#6B7280" transform="rotate(-90 30 40)">gas layer</text><text x="10" y="40" text-anchor="middle" font-size="4" fill="#58CC02" font-weight="bold">HOT</text><text x="52" y="40" text-anchor="middle" font-size="4" fill="#334155" font-weight="bold">COLD</text><line x1="12" y1="38" x2="18" y2="38" stroke="#58CC02" stroke-width="1.5" marker-end="url(#aw2)"/><line x1="43" y1="38" x2="48" y2="38" stroke="#334155" stroke-width="1" marker-end="url(#aw3)"/><defs><marker id="aw2" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker><marker id="aw3" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#334155" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#334155">k_gas ≈ 0.025 W/m·K</text><text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#6B7280">Low k → high R</text></svg>`,
      explanation: 'The trapped gas layer (air or argon) has low thermal conductivity (~0.025 W/m·K for air), creating a high thermal resistance barrier. The narrow gap also suppresses natural convection currents. This is the same insulation principle used in vacuum flasks and double-walled piping — minimizing conduction paths to reduce overall heat transfer.',
      hint: 'Think about what fills the space between the panes and what mode of heat transfer it blocks.',
    },
    {
      id: 'htw-L3-Q16',
      type: 'multiple-choice',
      question: 'Window glass expands when heated by sunlight. If the glass is rigidly constrained in the frame with no expansion gap, what type of stress develops?',
      options: [
        'Shear stress from differential heating across the thickness',
        'Compressive thermal stress — the glass wants to expand but is constrained',
        'Tensile stress pulling the glass away from the frame',
        'Torsional stress twisting the glass pane',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="15" y="18" width="50" height="40" rx="2" stroke="#3B8700" stroke-width="2" fill="#58CC02" fill-opacity="0.06"/><rect x="13" y="16" width="54" height="44" rx="3" stroke="#334155" stroke-width="2" fill="none"/><text x="8" y="38" text-anchor="middle" font-size="3" fill="#334155">frame</text><line x1="20" y1="38" x2="14" y2="38" stroke="#58CC02" stroke-width="2" marker-end="url(#at3)"/><line x1="60" y1="38" x2="66" y2="38" stroke="#58CC02" stroke-width="2" marker-end="url(#at3)"/><line x1="40" y1="22" x2="40" y2="16" stroke="#58CC02" stroke-width="2" marker-end="url(#at3)"/><line x1="40" y1="54" x2="40" y2="60" stroke="#58CC02" stroke-width="2" marker-end="url(#at3)"/><text x="40" y="40" text-anchor="middle" font-size="4" fill="#334155">ΔT → expand</text><defs><marker id="at3" markerWidth="4" markerHeight="3" refX="0" refY="1.5" orient="auto"><path fill="#58CC02" d="M4,0 L0,1.5 L4,3Z"/></marker></defs><line x1="14" y1="38" x2="10" y2="38" stroke="#3B8700" stroke-width="2" marker-end="url(#at4)"/><line x1="66" y1="38" x2="70" y2="38" stroke="#3B8700" stroke-width="2" marker-end="url(#at4)"/><defs><marker id="at4" markerWidth="4" markerHeight="3" refX="0" refY="1.5" orient="auto"><path fill="#3B8700" d="M4,0 L0,1.5 L4,3Z"/></marker></defs><text x="40" y="72" text-anchor="middle" font-size="4" fill="#334155">σ = EαΔT (compressive)</text></svg>`,
      correctIndex: 1,
      explanation: 'When thermal expansion is constrained, the material develops thermal stress: σ = E·α·ΔT. Since the glass wants to expand but cannot, the constraint produces compressive stress. If non-uniform heating occurs (e.g., partial shading), tensile stresses at the boundary can cause thermal fracture. This is why expansion joints are critical in bridges, piping, and large structures.',
    },
    {
      id: 'htw-L3-Q17',
      type: 'true-false',
      question: 'The U-value of a window measures its insulating ability: a lower U-value means better insulation and less heat loss.',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="10" y="18" width="25" height="36" rx="3" stroke="#3B8700" stroke-width="1.5" fill="#A5E86C" fill-opacity="0.1"/><text x="22" y="32" text-anchor="middle" font-size="3.5" fill="#334155">Single</text><text x="22" y="40" text-anchor="middle" font-size="4" fill="#3B8700">U = 5.8</text><text x="22" y="48" text-anchor="middle" font-size="3" fill="#6B7280">poor</text><rect x="45" y="18" width="25" height="36" rx="3" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" fill-opacity="0.1"/><text x="57" y="32" text-anchor="middle" font-size="3.5" fill="#334155">Double</text><text x="57" y="40" text-anchor="middle" font-size="4" fill="#58CC02">U = 1.2</text><text x="57" y="48" text-anchor="middle" font-size="3" fill="#6B7280">better</text><text x="40" y="64" text-anchor="middle" font-size="4" fill="#334155">Lower U → less heat loss</text><text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#6B7280">U = 1/R (W/m²·K)</text></svg>`,
      correctAnswer: true,
      explanation: 'U-value (overall heat transfer coefficient, W/m²·K) represents total heat flow per unit area per degree of temperature difference. Lower U-value = less heat transfer = better insulation. This is the reciprocal of total thermal resistance (R-value). Engineers use U-values to calculate building heat loads and select HVAC equipment — the same thermal resistance network analysis used in electronics cooling.',
    },
    // --- MORE DOOR / HINGE ---
    {
      id: 'htw-L3-Q18',
      type: 'fill-blank',
      question: 'When you push a door at its handle (far from the hinge), it opens easily. Pushing near the hinge requires much more force because the _____ arm is shorter, producing less _____ for the same force.',
      blanks: ['moment', 'torque'],
      wordBank: ['moment', 'torque', 'pressure', 'velocity', 'friction'],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><circle cx="10" cy="40" r="3" stroke="#3B8700" stroke-width="2" fill="none"/><circle cx="10" cy="40" r="1" fill="#3B8700"/><rect x="10" y="32" width="55" height="16" rx="2" stroke="#3B8700" stroke-width="1.5" fill="#A5E86C" fill-opacity="0.12"/><text x="38" y="42" text-anchor="middle" font-size="3.5" fill="#6B7280">Door</text><line x1="60" y1="26" x2="60" y2="30" stroke="#58CC02" stroke-width="2.5" marker-end="url(#am1)"/><text x="63" y="24" font-size="4" fill="#58CC02" font-style="italic">F</text><line x1="20" y1="26" x2="20" y2="30" stroke="#3B8700" stroke-width="1.5" marker-end="url(#am2)"/><text x="23" y="24" font-size="4" fill="#3B8700" font-style="italic">F'</text><defs><marker id="am1" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker><marker id="am2" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#3B8700" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><line x1="10" y1="52" x2="60" y2="52" stroke="#6B7280" stroke-width="1" stroke-dasharray="2 1"/><text x="35" y="58" text-anchor="middle" font-size="3.5" fill="#6B7280" font-style="italic">d (long)</text><line x1="10" y1="56" x2="20" y2="56" stroke="#6B7280" stroke-width="1" stroke-dasharray="2 1"/><text x="15" y="62" text-anchor="middle" font-size="3" fill="#6B7280" font-style="italic">d (short)</text><text x="40" y="72" text-anchor="middle" font-size="4" fill="#334155">τ = F × d</text></svg>`,
      explanation: 'Torque (moment) = Force × perpendicular distance from the pivot. A shorter moment arm means less torque for the same applied force, so you must push harder. This is why door handles are placed far from hinges, and why longer wrenches make bolts easier to turn — the fundamental lever principle in mechanical engineering.',
    },
    // --- MORE AC ---
    {
      id: 'htw-L3-Q19',
      type: 'multiple-choice',
      question: 'An air conditioner with COP = 4 is cooling a room. For every 1 kW of electrical power consumed by the compressor, how much total heat is rejected by the outdoor condenser?',
      options: [
        '3 kW',
        '4 kW',
        '5 kW',
        '8 kW',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="25" y="28" width="30" height="20" rx="4" stroke="#3B8700" stroke-width="2" fill="#A5E86C" fill-opacity="0.12"/><text x="40" y="41" text-anchor="middle" font-size="4" fill="#334155">AC</text><line x1="40" y1="20" x2="40" y2="26" stroke="#58CC02" stroke-width="2"/><text x="40" y="16" text-anchor="middle" font-size="5" fill="#58CC02">4 kW</text><text x="40" y="10" text-anchor="middle" font-size="3.5" fill="#6B7280">Q_cold</text><line x1="60" y1="38" x2="57" y2="38" stroke="#334155" stroke-width="2"/><text x="66" y="40" font-size="5" fill="#334155">1 kW</text><text x="66" y="46" font-size="3" fill="#6B7280">W_in</text><line x1="40" y1="50" x2="40" y2="56" stroke="#3B8700" stroke-width="2.5"/><text x="40" y="64" text-anchor="middle" font-size="5" fill="#3B8700" font-weight="bold">5 kW</text><text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#6B7280">Q_hot = Q_cold + W</text></svg>`,
      correctIndex: 2,
      explanation: 'By energy conservation: Q_hot = Q_cold + W. With COP_cooling = Q_cold/W = 4, then Q_cold = 4 kW. Therefore Q_hot = 4 + 1 = 5 kW. The condenser must reject both the heat absorbed from the room AND the work input. This is why outdoor units blow hot air — they expel more heat than the indoor unit removes.',
      hint: 'First law of thermodynamics: energy in = energy out. The condenser rejects both the absorbed room heat and the compressor work.',
    },
    // --- MORE TOILET ---
    {
      id: 'htw-L3-Q20',
      type: 'multiple-choice',
      question: 'A siphon cannot lift water higher than approximately 10.3 m at sea level. What fundamental principle explains this height limit?',
      options: [
        'The viscosity of water increases at greater heights',
        'Atmospheric pressure can only support a water column of about 10.3 m against vacuum',
        'Surface tension breaks down above 10.3 m of water height',
        'The pipe diameter becomes too small relative to the flow at that height',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="8" y="40" width="20" height="28" rx="2" stroke="#3B8700" stroke-width="1.5" fill="#58CC02" fill-opacity="0.1"/><line x1="18" y1="40" x2="18" y2="8" stroke="#3B8700" stroke-width="2"/><path d="M18,8 Q18,4 22,4 L40,4 Q44,4 44,8" stroke="#3B8700" stroke-width="2" fill="none"/><line x1="44" y1="8" x2="44" y2="68" stroke="#3B8700" stroke-width="2"/><line x1="18" y1="45" x2="8" y2="45" stroke="#6B7280" stroke-width="0.8" stroke-dasharray="2 1"/><line x1="18" y1="8" x2="8" y2="8" stroke="#6B7280" stroke-width="0.8" stroke-dasharray="2 1"/><line x1="6" y1="45" x2="6" y2="8" stroke="#6B7280" stroke-width="1"/><text x="4" y="28" font-size="3.5" fill="#334155" transform="rotate(-90 4 28)">10.3 m</text><text x="55" y="38" font-size="3.5" fill="#6B7280">P_atm</text><line x1="52" y1="40" x2="52" y2="45" stroke="#6B7280" stroke-width="1.5" marker-end="url(#as2)"/><defs><marker id="as2" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#6B7280" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><circle r="1.5" fill="#58CC02"><animateMotion dur="2s" repeatCount="indefinite" path="M18,45 L18,8 Q18,4 22,4 L40,4 Q44,4 44,8 L44,50"/></circle><text x="40" y="76" text-anchor="middle" font-size="4" fill="#334155">Max height = P_atm / ρg</text></svg>`,
      correctIndex: 1,
      explanation: 'Atmospheric pressure (101.3 kPa) equals the hydrostatic pressure of a 10.3 m water column (ρgh). Above this height, the absolute pressure at the siphon crest would need to go negative, which is physically impossible — the water column breaks and the siphon fails. This same limit applies to suction pumps, which is why deep wells require submersible pumps rather than surface suction pumps.',
    },
  ],
};

export const lesson4: Lesson = {
  id: 'htw-L4',
  title: 'Tools & Workshop',
  description: 'Analyze the engineering mechanics behind common hand tools and workshop equipment — torque, leverage, hydraulics, and more.',
  icon: '🔧',
  xpReward: 25,
  questions: [
    // --- WRENCH / SPANNER ---
    {
      id: 'htw-L4-Q1',
      type: 'multiple-choice',
      question: 'A bolt requires 60 N·m of torque to loosen. You have a wrench that is 0.3 m long but cannot generate enough force. Adding a "cheater pipe" extends the handle to 0.6 m. By what factor does the required hand force decrease?',
      options: [
        'The required force is cut in half',
        'The required force is reduced to one-third',
        'The required force stays the same — only speed changes',
        'The required force is reduced to one-quarter',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
  <rect x="2" y="2" width="76" height="76" rx="8" fill="#58CC02" opacity="0.06"/>
  <!-- Bolt (top view) -->
  <polygon points="40,22 44,24 44,28 40,30 36,28 36,24" stroke="#3B8700" stroke-width="1.5" fill="#A5E86C" opacity="0.3"/>
  <!-- Short wrench (faded background) -->
  <rect x="40" y="23" width="18" height="5" rx="1" stroke="#6B7280" stroke-width="1" fill="#6B7280" opacity="0.12" stroke-dasharray="2 1"/>
  <text x="49" y="22" font-size="3.5" fill="#6B7280" text-anchor="middle" font-style="italic">d&#x2081;</text>
  <!-- Extended wrench with cheater pipe -->
  <rect x="40" y="34" width="18" height="5" rx="1" stroke="#3B8700" stroke-width="1.5" fill="#A5E86C" opacity="0.25"/>
  <rect x="56" y="33.5" width="16" height="6" rx="1.5" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" opacity="0.15" stroke-dasharray="3 1.5"/>
  <!-- Bolt for extended wrench -->
  <polygon points="40,33 44,35 44,39 40,41 36,39 36,35" stroke="#3B8700" stroke-width="1.5" fill="#A5E86C" opacity="0.3"/>
  <!-- d2 label for full length -->
  <line x1="40" y1="43" x2="72" y2="43" stroke="#6B7280" stroke-width="1" stroke-dasharray="2 1"/>
  <text x="56" y="47" font-size="3.5" fill="#334155" text-anchor="middle" font-style="italic">d&#x2082;</text>
  <!-- Force arrow at end of cheater pipe -->
  <g>
    <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/>
    <line x1="72" y1="36" x2="72" y2="28" stroke="#58CC02" stroke-width="2"/>
    <polygon points="72,26 69.5,31 74.5,31" fill="#58CC02"/>
    <text x="75" y="27" font-size="5" fill="#334155" font-style="italic">F</text>
  </g>
  <!-- Labels -->
  <text x="49" y="20" font-size="3.5" fill="#6B7280" text-anchor="middle">short wrench</text>
  <text x="56" y="53" font-size="3.5" fill="#6B7280" text-anchor="middle">+ cheater pipe</text>
  <text x="40" y="64" font-size="4" fill="#334155" text-anchor="middle">Longer arm = less force needed</text>
  <!-- Cheater pipe label -->
  <text x="64" y="31" font-size="3" fill="#58CC02" text-anchor="middle">cheater</text>
</svg>`,
      correctIndex: 0,
      explanation: 'Torque = Force × lever arm. Doubling the lever arm from 0.3 m to 0.6 m halves the required force: F = 60/0.6 = 100 N instead of 60/0.3 = 200 N. This is the fundamental principle behind all lever-based mechanical advantage. However, using cheater pipes can exceed the wrench\'s design load and cause tool failure.',
    },
    {
      id: 'htw-L4-Q2',
      type: 'true-false',
      question: 'When tightening a bolt with a torque wrench, the applied torque directly equals the clamping force times the bolt diameter — friction plays a negligible role.',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="30" y="10" width="20" height="40" rx="2" stroke="#3B8700" stroke-width="2" fill="#A5E86C" fill-opacity="0.1"/><rect x="26" y="8" width="28" height="6" rx="1" fill="#334155" fill-opacity="0.3"/><line x1="40" y1="50" x2="40" y2="62" stroke="#58CC02" stroke-width="2" marker-end="url(#af2)"/><text x="44" y="58" font-size="4" fill="#58CC02" font-style="italic">F_clamp</text><defs><marker id="af2" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><rect x="14" y="22" width="12" height="4" rx="0.5" fill="#3B8700" fill-opacity="0.3"/><text x="15" y="20" font-size="3" fill="#3B8700">~50% head</text><rect x="32" y="22" width="16" height="4" rx="0.5" fill="#3B8700" fill-opacity="0.3"/><text x="34" y="20" font-size="3" fill="#3B8700">~40% thread</text><rect x="50" y="22" width="6" height="4" rx="0.5" fill="#58CC02" fill-opacity="0.3"/><text x="57" y="20" font-size="3" fill="#58CC02">10%</text><text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#334155">~90% torque lost to friction</text><text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#6B7280">T = K·F·d</text></svg>`,
      correctAnswer: false,
      explanation: 'Friction is NOT negligible. Typically, about 90% of the applied torque is consumed by friction (under the bolt head and in the threads), and only about 10% actually generates clamping force (bolt stretch). This is why the torque-tension relationship T = K·F·d includes a friction-dependent "nut factor" K, and why lubricated vs. dry bolts produce vastly different clamping forces at the same torque.',
    },
    // --- POWER DRILL ---
    {
      id: 'htw-L4-Q3',
      type: 'multiple-choice',
      question: 'A drill bit cutting through metal experiences a resisting torque. If you reduce the drill\'s rotational speed (RPM) while keeping the motor power constant, what happens to the available torque at the bit?',
      options: [
        'Torque decreases proportionally with speed',
        'Torque remains unchanged',
        'Torque increases — power equals torque times angular velocity',
        'Torque becomes zero because the bit stalls',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/><line x1="12" y1="65" x2="72" y2="65" stroke="#3B8700" stroke-width="1.5"/><text x="6" y="38" font-size="4" fill="#334155" transform="rotate(-90 6 38)">τ</text><text x="42" y="74" font-size="4" fill="#334155">ω</text><path d="M16,14 C22,18 35,40 65,58" stroke="#58CC02" stroke-width="2.5" fill="none"/><text x="40" y="30" text-anchor="middle" font-size="4" fill="#334155">P = τω = const</text><text x="20" y="20" font-size="3.5" fill="#58CC02">high τ</text><text x="56" y="54" font-size="3.5" fill="#6B7280">low τ</text><text x="18" y="60" font-size="3" fill="#6B7280">low ω</text><text x="60" y="64" font-size="3" fill="#6B7280">high ω</text></svg>`,
      correctIndex: 2,
      explanation: 'Power = Torque × angular velocity (P = τω). At constant power, reducing ω increases τ proportionally. This is why drills have low-speed/high-torque settings for large holes or hard materials and high-speed/low-torque settings for small holes in soft materials. The same P = τω relationship governs gearbox design in vehicles and industrial machinery.',
      hint: 'Rearrange the power equation: τ = P / ω.',
    },
    {
      id: 'htw-L4-Q4',
      type: 'fill-blank',
      question: 'A drill chuck grips the bit using three jaws that converge via a _____ thread mechanism, converting rotational motion into _____ clamping force.',
      blanks: ['scroll', 'radial'],
      wordBank: ['scroll', 'radial', 'axial', 'helical', 'tangential'],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><circle cx="40" cy="36" r="20" stroke="#3B8700" stroke-width="2" fill="#A5E86C" fill-opacity="0.08"/><line x1="40" y1="16" x2="40" y2="22" stroke="#334155" stroke-width="3"/><line x1="24" y1="48" x2="28" y2="44" stroke="#334155" stroke-width="3"/><line x1="56" y1="48" x2="52" y2="44" stroke="#334155" stroke-width="3"/><text x="40" y="12" text-anchor="middle" font-size="3" fill="#334155">jaw</text><line x1="40" y1="22" x2="40" y2="30" stroke="#58CC02" stroke-width="1.5" marker-end="url(#ac7)"/><line x1="28" y1="44" x2="34" y2="38" stroke="#58CC02" stroke-width="1.5" marker-end="url(#ac7)"/><line x1="52" y1="44" x2="46" y2="38" stroke="#58CC02" stroke-width="1.5" marker-end="url(#ac7)"/><defs><marker id="ac7" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><circle cx="40" cy="36" r="3" fill="#6B7280" fill-opacity="0.3"/><text x="40" y="38" text-anchor="middle" font-size="3" fill="#334155">bit</text><path d="M20,28 A20,20 0 0,1 28,20" stroke="#6B7280" stroke-width="1" fill="none"/><text x="16" y="22" font-size="3" fill="#6B7280">rotate</text><text x="40" y="66" text-anchor="middle" font-size="4" fill="#334155">3-jaw self-centering</text><text x="40" y="74" text-anchor="middle" font-size="3.5" fill="#6B7280">Scroll → radial clamp</text></svg>`,
      explanation: 'The chuck uses a scroll plate (a spiral cam or conical thread) that converts rotation of the outer sleeve into simultaneous radial movement of all three jaws. This self-centering mechanism ensures the bit is gripped concentrically. The scroll thread provides mechanical advantage, converting low-effort rotation into high clamping force — similar to a lead screw converting rotation to linear motion.',
    },
    // --- HYDRAULIC JACK ---
    {
      id: 'htw-L4-Q5',
      type: 'multiple-choice',
      question: 'A hydraulic jack has a small piston of area 5 cm² and a large piston of area 50 cm². If you apply 100 N of force to the small piston, what force does the large piston exert?',
      options: [
        '100 N — force is conserved in hydraulic systems',
        '500 N',
        '1,000 N',
        '5,000 N',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
  <rect x="2" y="2" width="76" height="76" rx="8" fill="#58CC02" opacity="0.06"/>
  <!-- Small cylinder (left) -->
  <rect x="10" y="20" width="12" height="35" rx="1" stroke="#3B8700" stroke-width="2" fill="none"/>
  <!-- Large cylinder (right) -->
  <rect x="48" y="20" width="24" height="35" rx="1" stroke="#3B8700" stroke-width="2" fill="none"/>
  <!-- Connecting channel at bottom -->
  <rect x="22" y="45" width="26" height="8" stroke="#3B8700" stroke-width="2" fill="none"/>
  <!-- Fluid fill -->
  <rect x="11" y="38" width="10" height="16" fill="#58CC02" opacity="0.15"/>
  <rect x="23" y="46" width="24" height="6" fill="#58CC02" opacity="0.15"/>
  <rect x="49" y="32" width="22" height="22" fill="#58CC02" opacity="0.15"/>
  <!-- Small piston (animated) -->
  <g>
    <animate attributeName="opacity" values="1;1" dur="2s" repeatCount="indefinite"/>
    <rect x="10" y="33" width="12" height="4" rx="0.5" stroke="#334155" stroke-width="1.5" fill="#A5E86C">
      <animate attributeName="y" values="33;38;33" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/>
    </rect>
  </g>
  <!-- Large piston (animated - moves less) -->
  <g>
    <rect x="48" y="28" width="24" height="4" rx="0.5" stroke="#334155" stroke-width="1.5" fill="#A5E86C">
      <animate attributeName="y" values="30;28;30" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/>
    </rect>
  </g>
  <!-- Force arrow F1 (small, down) -->
  <line x1="16" y1="14" x2="16" y2="28" stroke="#58CC02" stroke-width="2"/>
  <polygon points="16,30 13.5,25 18.5,25" fill="#58CC02"/>
  <text x="16" y="11" font-size="4.5" fill="#334155" text-anchor="middle" font-style="italic">F&#x2081;</text>
  <!-- Force arrow F2 (large, up) -->
  <line x1="60" y1="24" x2="60" y2="14" stroke="#58CC02" stroke-width="2.5"/>
  <polygon points="60,12 56.5,18 63.5,18" fill="#58CC02"/>
  <text x="60" y="10" font-size="5" fill="#334155" text-anchor="middle" font-style="italic">F&#x2082;</text>
  <!-- Area labels -->
  <text x="16" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle" font-style="italic">A&#x2081;</text>
  <text x="60" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle" font-style="italic">A&#x2082;</text>
  <!-- Pascal's law label -->
  <text x="40" y="73" font-size="4" fill="#334155" text-anchor="middle">P = F&#x2081;/A&#x2081; = F&#x2082;/A&#x2082;</text>
</svg>`,
      correctIndex: 2,
      explanation: 'Pascal\'s law states that pressure is transmitted uniformly in an enclosed fluid. Pressure = 100 N / 5 cm² = 20 N/cm². Force on large piston = 20 N/cm² × 50 cm² = 1,000 N. The mechanical advantage is the area ratio (50/5 = 10×). However, the small piston must travel 10× farther — energy is conserved, not force.',
    },
    {
      id: 'htw-L4-Q6',
      type: 'multiple-choice',
      question: 'Hydraulic systems use oil rather than air as the working fluid. What property of oil is most critical for a hydraulic jack to function properly?',
      options: [
        'Oil has a lower viscosity than air, reducing friction',
        'Oil is nearly incompressible, transmitting pressure instantly without volume loss',
        'Oil is lighter than water, reducing the weight of the system',
        'Oil has higher thermal conductivity, preventing overheating',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="8" y="20" width="28" height="30" rx="3" stroke="#3B8700" stroke-width="1.5" fill="#58CC02" fill-opacity="0.12"/><text x="22" y="38" text-anchor="middle" font-size="4" fill="#334155">Oil</text><text x="22" y="46" text-anchor="middle" font-size="3" fill="#58CC02">incompressible</text><rect x="44" y="20" width="28" height="30" rx="3" stroke="#6B7280" stroke-width="1.5" fill="#6B7280" fill-opacity="0.08"/><text x="58" y="38" text-anchor="middle" font-size="4" fill="#334155">Air</text><text x="58" y="46" text-anchor="middle" font-size="3" fill="#6B7280">compressible</text><line x1="22" y1="16" x2="22" y2="20" stroke="#58CC02" stroke-width="2" marker-end="url(#ao1)"/><line x1="22" y1="50" x2="22" y2="54" stroke="#58CC02" stroke-width="2" marker-end="url(#ao1)"/><line x1="58" y1="16" x2="58" y2="20" stroke="#6B7280" stroke-width="2"/><text x="58" y="14" font-size="3" fill="#6B7280">spongy</text><defs><marker id="ao1" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><text x="40" y="66" text-anchor="middle" font-size="4" fill="#334155">Rigid force transmission</text></svg>`,
      correctIndex: 1,
      explanation: 'Hydraulic systems rely on fluid incompressibility. When you push the small piston, the fluid volume displaced must go somewhere immediately — it pushes the large piston. If the fluid were compressible (like air in pneumatic systems), energy would be wasted compressing the fluid before the output piston moves. This is why hydraulic systems provide rigid, precise force transmission for presses, excavators, and aircraft controls.',
    },
    {
      id: 'htw-L4-Q7',
      type: 'true-false',
      question: 'A hydraulic jack with a 20:1 area ratio can lift 20 times the input force, but the small piston must be pumped through 20 times the distance that the large piston rises.',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="8" y="20" width="8" height="30" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/><rect x="48" y="20" width="24" height="30" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/><rect x="16" y="42" width="32" height="6" stroke="#3B8700" stroke-width="1.5" fill="#58CC02" fill-opacity="0.1"/><line x1="12" y1="10" x2="12" y2="30" stroke="#58CC02" stroke-width="2"><animate attributeName="y2" values="26;38;26" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></line><text x="12" y="8" text-anchor="middle" font-size="4" fill="#334155" font-style="italic">20d</text><line x1="60" y1="18" x2="60" y2="22" stroke="#58CC02" stroke-width="2.5"><animate attributeName="y2" values="22;21;22" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></line><text x="60" y="14" text-anchor="middle" font-size="4" fill="#334155" font-style="italic">d</text><text x="12" y="58" text-anchor="middle" font-size="4" fill="#58CC02">F</text><text x="60" y="58" text-anchor="middle" font-size="4" fill="#58CC02">20F</text><text x="40" y="70" text-anchor="middle" font-size="4" fill="#334155">W_in = W_out</text><text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#6B7280">F×20d = 20F×d</text></svg>`,
      correctAnswer: true,
      explanation: 'Conservation of energy requires that Work_in = Work_out (ignoring friction). Since W = F × d, if force is multiplied by 20, distance is divided by 20. You pump many short strokes to raise a heavy load a small distance. This work conservation principle applies to all simple machines — mechanical advantage in force always comes at the cost of distance.',
    },
    // --- C-CLAMP / VISE ---
    {
      id: 'htw-L4-Q8',
      type: 'multiple-choice',
      question: 'A C-clamp uses a screw thread to generate clamping force. If the screw has a pitch of 2 mm and you apply a force of 20 N at a handle radius of 80 mm, what approximate clamping force is generated (ignoring friction)?',
      options: [
        'About 500 N',
        'About 2,500 N',
        'About 5,000 N',
        'About 10,000 N',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><path d="M50,15 L50,55 Q50,65 40,65 L20,65 Q10,65 10,55 L10,45" stroke="#3B8700" stroke-width="3" fill="none"/><line x1="10" y1="45" x2="10" y2="20" stroke="#3B8700" stroke-width="2"/><rect x="7" y="18" width="6" height="8" rx="0.5" fill="#334155" fill-opacity="0.4"/><path d="M7,22 L4,22 M7,20 L4,20 M7,24 L4,24" stroke="#6B7280" stroke-width="0.5"/><line x1="47" y1="12" x2="53" y2="12" stroke="#3B8700" stroke-width="2"/><path d="M44,12 A12,12 0 0,1 56,12" stroke="#58CC02" stroke-width="1.5" fill="none"><animateTransform attributeName="transform" type="rotate" values="0 50 12;-20 50 12;0 50 12" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></path><text x="60" y="14" font-size="4" fill="#58CC02" font-style="italic">F</text><line x1="10" y1="26" x2="10" y2="38" stroke="#58CC02" stroke-width="2" marker-end="url(#ac8)"/><defs><marker id="ac8" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><text x="16" y="34" font-size="3.5" fill="#58CC02">F_clamp</text><text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#334155">MA = 2πr / pitch</text></svg>`,
      correctIndex: 2,
      explanation: 'The screw converts rotational input to linear clamping force. Ideal mechanical advantage = 2π × r / pitch = 2π × 80 / 2 = 251. Clamping force = 20 N × 251 ≈ 5,027 N. In practice, thread friction reduces this by roughly half, but the screw mechanism still provides enormous mechanical advantage. This is why bolted joints can generate such high clamping forces with modest hand effort.',
      hint: 'One full turn of the handle moves the screw tip forward by one pitch. Compare the hand\'s circular travel distance to the screw\'s linear advance.',
    },
    {
      id: 'htw-L4-Q9',
      type: 'fill-blank',
      question: 'A screw thread is self-locking when the _____ angle exceeds the lead angle, meaning the clamped part cannot push the screw back open on its own.',
      blanks: ['friction'],
      wordBank: ['friction', 'helix', 'pressure', 'shear', 'contact'],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><line x1="10" y1="55" x2="70" y2="55" stroke="#3B8700" stroke-width="1.5"/><line x1="10" y1="55" x2="55" y2="25" stroke="#58CC02" stroke-width="2"/><path d="M22,55 A12,0 0 0,1 22,55" stroke="#6B7280" stroke-width="1"/><path d="M10,55 Q20,50 25,48" stroke="#3B8700" stroke-width="1" fill="none"/><text x="26" y="52" font-size="3.5" fill="#3B8700">lead angle</text><path d="M10,55 Q16,52 20,50" stroke="#58CC02" stroke-width="1" fill="none"/><text x="18" y="46" font-size="3.5" fill="#58CC02">friction angle</text><text x="40" y="68" text-anchor="middle" font-size="4" fill="#334155">Self-locking: φ > λ</text><text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#6B7280">Friction prevents back-drive</text></svg>`,
      explanation: 'Self-locking occurs when the friction angle (arctan of friction coefficient) is greater than the lead angle (arctan of lead/πd). This means friction alone prevents back-driving. Most standard fastener threads (like UNC/UNF) are self-locking, which is why bolts stay tight without continuous tightening. Power screws with steep lead angles (like ball screws) are NOT self-locking and require brakes.',
      hint: 'What force prevents the screw from unwinding under load?',
    },
    // --- PLIERS / SCISSORS ---
    {
      id: 'htw-L4-Q10',
      type: 'multiple-choice',
      question: 'Standard pliers have the fulcrum (pivot) between the effort (handles) and the load (jaws). What class of lever is this?',
      options: [
        'First-class lever — fulcrum between effort and load',
        'Second-class lever — load between fulcrum and effort',
        'Third-class lever — effort between fulcrum and load',
        'It is not a lever system; it operates on hydraulic principles',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none">
  <rect x="2" y="2" width="76" height="76" rx="8" fill="#58CC02" opacity="0.06"/>
  <!-- Top handle (upper jaw + handle) -->
  <g>
    <animateTransform attributeName="transform" type="rotate" values="0 40 36;-3 40 36;0 40 36" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/>
    <!-- Handle -->
    <line x1="40" y1="36" x2="72" y2="28" stroke="#3B8700" stroke-width="3" stroke-linecap="round"/>
    <!-- Jaw -->
    <line x1="40" y1="36" x2="14" y2="30" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <!-- Bottom handle (lower jaw + handle) -->
  <g>
    <animateTransform attributeName="transform" type="rotate" values="0 40 36;3 40 36;0 40 36" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/>
    <!-- Handle -->
    <line x1="40" y1="36" x2="72" y2="44" stroke="#3B8700" stroke-width="3" stroke-linecap="round"/>
    <!-- Jaw -->
    <line x1="40" y1="36" x2="14" y2="42" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <!-- Pivot/fulcrum -->
  <circle cx="40" cy="36" r="3" stroke="#334155" stroke-width="1.5" fill="white"/>
  <circle cx="40" cy="36" r="1" fill="#334155"/>
  <!-- Fulcrum triangle symbol -->
  <polygon points="40,41 37,46 43,46" stroke="#334155" stroke-width="1" fill="none"/>
  <text x="40" y="52" font-size="3.5" fill="#334155" text-anchor="middle">Fulcrum</text>
  <!-- Effort label and arrow at handles -->
  <line x1="72" y1="24" x2="72" y2="18" stroke="#58CC02" stroke-width="1.5"/>
  <polygon points="72,16 70,20 74,20" fill="#58CC02"/>
  <line x1="72" y1="48" x2="72" y2="54" stroke="#58CC02" stroke-width="1.5"/>
  <polygon points="72,56 70,52 74,52" fill="#58CC02"/>
  <text x="72" y="14" font-size="3.5" fill="#58CC02" text-anchor="middle">Effort</text>
  <!-- Load label and arrow at jaws -->
  <line x1="14" y1="28" x2="14" y2="22" stroke="#58CC02" stroke-width="1.5"/>
  <polygon points="14,24 12,28 16,28" fill="#58CC02"/>
  <line x1="14" y1="44" x2="14" y2="50" stroke="#58CC02" stroke-width="1.5"/>
  <polygon points="14,48 12,44 16,44" fill="#58CC02"/>
  <text x="14" y="18" font-size="3.5" fill="#58CC02" text-anchor="middle">Load</text>
  <!-- Distance labels -->
  <line x1="40" y1="58" x2="72" y2="58" stroke="#6B7280" stroke-width="1" stroke-dasharray="2 1"/>
  <text x="56" y="63" font-size="3.5" fill="#6B7280" text-anchor="middle" font-style="italic">d_effort</text>
  <line x1="14" y1="58" x2="40" y2="58" stroke="#6B7280" stroke-width="1" stroke-dasharray="2 1"/>
  <text x="27" y="63" font-size="3.5" fill="#6B7280" text-anchor="middle" font-style="italic">d_load</text>
  <!-- Class label -->
  <text x="40" y="73" font-size="4" fill="#334155" text-anchor="middle">1st-class lever</text>
</svg>`,
      correctIndex: 0,
      explanation: 'Pliers and scissors are first-class levers: the pivot (fulcrum) sits between your hand force (effort) and the gripping/cutting force (load). Mechanical advantage = distance from fulcrum to handle / distance from fulcrum to jaw tip. Longer handles or a fulcrum closer to the jaws increases the gripping force — the same trade-off in all lever mechanisms.',
    },
    {
      id: 'htw-L4-Q11',
      type: 'multiple-choice',
      question: 'A pair of pliers has handles 20 cm long and jaws 5 cm long (both measured from the pivot). If you squeeze the handles with 40 N, what approximate gripping force do the jaws exert?',
      options: [
        '40 N',
        '80 N',
        '160 N',
        '200 N',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><circle cx="40" cy="40" r="3" stroke="#334155" stroke-width="1.5" fill="none"/><line x1="40" y1="40" x2="68" y2="32" stroke="#3B8700" stroke-width="2.5"/><line x1="40" y1="40" x2="18" y2="34" stroke="#3B8700" stroke-width="2.5"/><text x="54" y="28" font-size="3.5" fill="#6B7280" font-style="italic">20 cm</text><text x="25" y="30" font-size="3.5" fill="#6B7280" font-style="italic">5 cm</text><line x1="68" y1="26" x2="68" y2="30" stroke="#58CC02" stroke-width="2" marker-end="url(#al1)"/><text x="72" y="24" font-size="4" fill="#58CC02">40N</text><line x1="18" y1="28" x2="18" y2="32" stroke="#58CC02" stroke-width="2" marker-end="url(#al1)"/><text x="10" y="26" font-size="4" fill="#58CC02">160N</text><defs><marker id="al1" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><text x="40" y="56" text-anchor="middle" font-size="4" fill="#334155">MA = 20/5 = 4</text><text x="40" y="64" text-anchor="middle" font-size="3.5" fill="#6B7280">40 × 4 = 160 N</text></svg>`,
      correctIndex: 2,
      explanation: 'Mechanical advantage = handle length / jaw length = 20/5 = 4. Gripping force = 40 N × 4 = 160 N. This moment balance about the pivot (40 × 20 = F × 5) is pure statics. The same analysis determines the grip force in robotic end-effectors, toggle clamps, and crimping tools.',
    },
    {
      id: 'htw-L4-Q12',
      type: 'true-false',
      question: 'Tweezers are a third-class lever because the effort (your finger force) is applied between the fulcrum (the joined end) and the load (the tip), meaning they always have a mechanical advantage less than 1.',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><path d="M10,30 Q20,40 65,38" stroke="#3B8700" stroke-width="2.5" fill="none"/><path d="M10,50 Q20,40 65,42" stroke="#3B8700" stroke-width="2.5" fill="none"/><circle cx="10" cy="40" r="3" fill="#6B7280" fill-opacity="0.3"/><text x="10" y="26" text-anchor="middle" font-size="3.5" fill="#6B7280">Fulcrum</text><line x1="30" y1="34" x2="30" y2="28" stroke="#58CC02" stroke-width="2" marker-end="url(#al2)"/><line x1="30" y1="46" x2="30" y2="52" stroke="#58CC02" stroke-width="2" marker-end="url(#al2)"/><text x="30" y="24" text-anchor="middle" font-size="3.5" fill="#58CC02">Effort</text><circle cx="65" cy="40" r="2.5" fill="#A5E86C" fill-opacity="0.4"/><text x="65" y="34" text-anchor="middle" font-size="3.5" fill="#3B8700">Load</text><defs><marker id="al2" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><text x="40" y="66" text-anchor="middle" font-size="4" fill="#334155">3rd-class lever: MA < 1</text><text x="40" y="74" text-anchor="middle" font-size="3.5" fill="#6B7280">Precision > force</text></svg>`,
      correctAnswer: true,
      explanation: 'In tweezers, the fulcrum is at the joined/bent end, your fingers apply force in the middle, and the tips grip the object. Since the effort arm is shorter than the load arm, MA < 1 — you must squeeze harder than the gripping force. The trade-off is increased precision and range of motion at the tips, which is why third-class levers are used where control matters more than force (e.g., human forearm, fishing rod).',
    },
    // --- TAPE MEASURE ---
    {
      id: 'htw-L4-Q13',
      type: 'multiple-choice',
      question: 'A tape measure retracts automatically because of a coiled spring inside. As you pull the tape out further, the retraction force:',
      options: [
        'Stays constant — it uses a constant-force spring',
        'Increases linearly — like a standard Hookean spring',
        'Decreases because the spring unwinds and loses tension',
        'Fluctuates randomly depending on tape curvature',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><line x1="12" y1="55" x2="12" y2="10" stroke="#3B8700" stroke-width="1.5"/><line x1="12" y1="55" x2="72" y2="55" stroke="#3B8700" stroke-width="1.5"/><text x="6" y="34" font-size="4" fill="#334155" transform="rotate(-90 6 34)">F</text><text x="42" y="64" font-size="4" fill="#334155">x (extension)</text><line x1="15" y1="30" x2="68" y2="30" stroke="#58CC02" stroke-width="2.5"/><text x="40" y="26" text-anchor="middle" font-size="3.5" fill="#58CC02">constant force</text><path d="M15,48 L68,20" stroke="#6B7280" stroke-width="1.5" stroke-dasharray="3 2"/><text x="55" y="18" font-size="3" fill="#6B7280">Hooke (F=kx)</text><text x="40" y="44" text-anchor="middle" font-size="3.5" fill="#334155">Negator spring</text></svg>`,
      correctIndex: 0,
      explanation: 'Most tape measures use a constant-force spring (also called a Negator spring). Unlike a Hookean spring (F = kx), a constant-force spring provides nearly uniform force regardless of extension. It achieves this through its geometry — a tightly wound strip that naturally wants to remain coiled. This constant-force characteristic is also used in counterbalance mechanisms, window blinds, and cable retractors.',
    },
    {
      id: 'htw-L4-Q14',
      type: 'fill-blank',
      question: 'The coiled spring in a tape measure stores _____ energy when the tape is extended, which is converted to _____ energy of the retracting tape when released.',
      blanks: ['elastic', 'kinetic'],
      wordBank: ['elastic', 'kinetic', 'thermal', 'potential', 'electrical'],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><circle cx="22" cy="36" r="12" stroke="#3B8700" stroke-width="1.5" fill="none"/><path d="M22,36 A3,3 0 1,1 25,36 A5,5 0 1,1 28,36 A7,7 0 1,1 31,36" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="22" y="54" text-anchor="middle" font-size="3.5" fill="#58CC02">elastic E</text><line x1="34" y1="36" x2="68" y2="36" stroke="#3B8700" stroke-width="2"><animate attributeName="x2" values="68;40;68" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></line><line x1="64" y1="36" x2="58" y2="36" stroke="#58CC02" stroke-width="1.5" marker-end="url(#an1)"><animate attributeName="x1" values="64;38;64" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></line><defs><marker id="an1" markerWidth="4" markerHeight="3" refX="0" refY="1.5" orient="auto"><path fill="#58CC02" d="M4,0 L0,1.5 L4,3Z"/></marker></defs><text x="56" y="30" font-size="3.5" fill="#334155" font-style="italic">v</text><text x="40" y="68" text-anchor="middle" font-size="4" fill="#334155">Elastic → Kinetic</text></svg>`,
      explanation: 'When you extend the tape, you do work against the spring force, storing elastic potential energy in the deformed spring. When released, this elastic energy converts to kinetic energy of the moving tape (and some heat from friction). This energy conversion — elastic to kinetic — is the same principle in spring-powered mechanisms, clock mainsprings, and even vehicle suspension rebound.',
    },
    // --- SCREWDRIVER ---
    {
      id: 'htw-L4-Q15',
      type: 'multiple-choice',
      question: 'A screwdriver with a larger-diameter handle is easier to turn than one with a thin handle, even when driving the same screw. Why?',
      options: [
        'The larger handle weighs more, providing inertia',
        'A larger handle diameter provides a longer moment arm, increasing torque for the same hand force',
        'The larger handle reduces the screw\'s thread friction',
        'The larger handle increases the rotational speed of the screw',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><circle cx="22" cy="32" r="6" stroke="#6B7280" stroke-width="1.5" fill="#6B7280" fill-opacity="0.1"/><line x1="22" y1="38" x2="22" y2="56" stroke="#6B7280" stroke-width="2"/><text x="22" y="16" text-anchor="middle" font-size="3.5" fill="#6B7280">small r</text><text x="22" y="22" text-anchor="middle" font-size="3.5" fill="#6B7280">low τ</text><circle cx="58" cy="32" r="12" stroke="#58CC02" stroke-width="2" fill="#58CC02" fill-opacity="0.1"/><line x1="58" y1="44" x2="58" y2="56" stroke="#3B8700" stroke-width="2"/><text x="58" y="14" text-anchor="middle" font-size="3.5" fill="#58CC02">large R</text><text x="58" y="22" text-anchor="middle" font-size="3.5" fill="#58CC02">high τ</text><line x1="22" y1="32" x2="28" y2="32" stroke="#6B7280" stroke-width="1" stroke-dasharray="1 1"/><text x="25" y="30" font-size="3" fill="#6B7280">r</text><line x1="58" y1="32" x2="70" y2="32" stroke="#58CC02" stroke-width="1" stroke-dasharray="1 1"/><text x="64" y="30" font-size="3" fill="#58CC02">R</text><text x="40" y="68" text-anchor="middle" font-size="4" fill="#334155">τ = F × r</text><text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#6B7280">Bigger handle → more torque</text></svg>`,
      correctIndex: 1,
      explanation: 'Torque = Force × radius. A larger handle radius means more torque is transmitted to the screw for the same grip force. This is why stubby screwdrivers (short but fat handles) and T-handle drivers exist — they maximize the moment arm. The same principle explains why steering wheels, valve handwheels, and capstan mechanisms use large diameters.',
    },
    {
      id: 'htw-L4-Q16',
      type: 'multiple-choice',
      question: 'A wood screw with a finer thread pitch (smaller distance between threads) compared to a coarse-pitch screw of the same diameter will:',
      options: [
        'Require less torque to drive and hold with less force',
        'Advance faster per turn but with lower holding force',
        'Advance less per turn but generate higher axial force for the same torque',
        'Have identical mechanical advantage since the diameter is the same',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="12" y="18" width="8" height="40" rx="1" stroke="#3B8700" stroke-width="1.5" fill="#A5E86C" fill-opacity="0.1"/><line x1="8" y1="22" x2="24" y2="22" stroke="#3B8700" stroke-width="1"/><line x1="8" y1="30" x2="24" y2="30" stroke="#3B8700" stroke-width="1"/><line x1="8" y1="38" x2="24" y2="38" stroke="#3B8700" stroke-width="1"/><line x1="8" y1="46" x2="24" y2="46" stroke="#3B8700" stroke-width="1"/><line x1="8" y1="54" x2="24" y2="54" stroke="#3B8700" stroke-width="1"/><text x="16" y="14" text-anchor="middle" font-size="3.5" fill="#6B7280">Coarse</text><rect x="48" y="18" width="8" height="40" rx="1" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" fill-opacity="0.1"/><line x1="44" y1="21" x2="60" y2="21" stroke="#58CC02" stroke-width="1"/><line x1="44" y1="25" x2="60" y2="25" stroke="#58CC02" stroke-width="1"/><line x1="44" y1="29" x2="60" y2="29" stroke="#58CC02" stroke-width="1"/><line x1="44" y1="33" x2="60" y2="33" stroke="#58CC02" stroke-width="1"/><line x1="44" y1="37" x2="60" y2="37" stroke="#58CC02" stroke-width="1"/><line x1="44" y1="41" x2="60" y2="41" stroke="#58CC02" stroke-width="1"/><line x1="44" y1="45" x2="60" y2="45" stroke="#58CC02" stroke-width="1"/><line x1="44" y1="49" x2="60" y2="49" stroke="#58CC02" stroke-width="1"/><line x1="44" y1="53" x2="60" y2="53" stroke="#58CC02" stroke-width="1"/><text x="52" y="14" text-anchor="middle" font-size="3.5" fill="#58CC02">Fine</text><text x="16" y="64" text-anchor="middle" font-size="3" fill="#6B7280">fast, low F</text><text x="52" y="64" text-anchor="middle" font-size="3" fill="#58CC02">slow, high F</text><text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#334155">Finer pitch → higher MA</text></svg>`,
      correctIndex: 2,
      explanation: 'A finer pitch means less linear advance per revolution, which increases the mechanical advantage (MA = 2πr / pitch). For the same input torque, a finer thread generates more axial (clamping) force. The trade-off: more turns are needed to drive the screw to the same depth. This is directly analogous to gear ratios — lower "gear" means more force but slower motion.',
      hint: 'Think of the screw as an inclined plane wrapped around a cylinder — a shallower angle means higher mechanical advantage.',
    },
    {
      id: 'htw-L4-Q17',
      type: 'true-false',
      question: 'A screw with a very steep lead angle (like an ACME power screw) can back-drive under load, meaning the load can push the screw out without any applied torque. This makes it unsuitable for applications like a car jack without a braking mechanism.',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="10" y="18" width="25" height="36" rx="3" stroke="#3B8700" stroke-width="1.5" fill="#A5E86C" fill-opacity="0.1"/><text x="22" y="14" text-anchor="middle" font-size="3.5" fill="#334155" font-weight="bold">Shallow</text><path d="M14,48 L30,24" stroke="#3B8700" stroke-width="2"/><text x="22" y="56" text-anchor="middle" font-size="3" fill="#58CC02">self-locking</text><rect x="45" y="18" width="25" height="36" rx="3" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" fill-opacity="0.1"/><text x="57" y="14" text-anchor="middle" font-size="3.5" fill="#334155" font-weight="bold">Steep</text><path d="M49,48 L65,20" stroke="#58CC02" stroke-width="2"/><text x="57" y="56" text-anchor="middle" font-size="3" fill="#3B8700">back-drives!</text><line x1="57" y1="48" x2="57" y2="58" stroke="#3B8700" stroke-width="1.5" marker-end="url(#ab2)"/><defs><marker id="ab2" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#3B8700" d="M0,0 L4,1.5 L0,3Z"/></marker></defs><text x="40" y="70" text-anchor="middle" font-size="4" fill="#334155">Steep λ > φ → back-drive</text></svg>`,
      correctAnswer: true,
      explanation: 'When the lead angle exceeds the friction angle, the thread is no longer self-locking. The load force component along the thread helix overcomes friction and drives the screw backward. Ball screws (used in CNC machines) are intentionally non-self-locking for efficiency, but they require servo brakes to hold position. Standard V-thread fasteners have low lead angles and are self-locking by design.',
    },
    // --- LEVEL (SPIRIT LEVEL) ---
    {
      id: 'htw-L4-Q18',
      type: 'multiple-choice',
      question: 'A spirit level (bubble level) works because the bubble inside the curved vial always moves to the highest point. What principle governs the bubble\'s position?',
      options: [
        'Surface tension pulls the bubble toward the center of the vial',
        'Buoyancy — the air bubble is less dense than the surrounding liquid and floats to the highest point',
        'Magnetic forces align the bubble with Earth\'s magnetic field',
        'Atmospheric pressure pushes the bubble toward the lowest pressure zone',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="8" y="30" width="64" height="16" rx="3" stroke="#3B8700" stroke-width="2" fill="#A5E86C" fill-opacity="0.08"/><path d="M15,38 Q40,28 65,38" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" fill-opacity="0.1"/><ellipse cx="40" cy="34" rx="6" ry="3" fill="none" stroke="#58CC02" stroke-width="2"/><text x="40" y="36" text-anchor="middle" font-size="3" fill="#58CC02">bubble</text><line x1="40" y1="32" x2="40" y2="24" stroke="#6B7280" stroke-width="1" stroke-dasharray="1 1"/><text x="40" y="22" text-anchor="middle" font-size="3" fill="#6B7280">highest</text><text x="40" y="56" text-anchor="middle" font-size="4" fill="#334155">Buoyancy → floats up</text><text x="40" y="64" text-anchor="middle" font-size="3.5" fill="#6B7280">ρ_air < ρ_liquid</text></svg>`,
      correctIndex: 1,
      explanation: 'The bubble (air) is less dense than the liquid (typically ethanol-based). By Archimedes\' principle, the buoyant force pushes the bubble upward. In a curved vial, "upward" means toward the highest point of the vial curvature. When the surface is level, the highest point is exactly at the center marks. This is hydrostatics in action — the same buoyancy principle used in hydrometers, submarines, and ship stability analysis.',
    },
    {
      id: 'htw-L4-Q19',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><path d="M15 45 Q40 30 65 45" stroke="#334155" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M15 50 Q40 35 65 50" stroke="#334155" stroke-width="1.5" fill="none" stroke-linecap="round"/><line x1="15" y1="45" x2="15" y2="50" stroke="#334155" stroke-width="1.5"/><line x1="65" y1="45" x2="65" y2="50" stroke="#334155" stroke-width="1.5"/><rect x="22" y="34" width="36" height="10" rx="5" fill="#3B8700" opacity="0.15"/><ellipse cx="40" cy="39" rx="6" ry="4" fill="#A5E86C" opacity="0.7"><animate attributeName="cx" values="40;43;40;37;40" dur="4s" repeatCount="indefinite"/></ellipse><line x1="40" y1="28" x2="40" y2="55" stroke="#58CC02" stroke-width="0.5" stroke-dasharray="2 2"/><text x="40" y="22" text-anchor="middle" font-size="4" fill="#334155" font-style="italic">highest point</text><text x="40" y="65" text-anchor="middle" font-size="5" fill="#58CC02" font-weight="bold">Curved Vial</text><text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#334155" font-style="italic">bubble → indicator</text><line x1="30" y1="56" x2="30" y2="59" stroke="#334155" stroke-width="0.5"/><line x1="40" y1="56" x2="40" y2="59" stroke="#58CC02" stroke-width="1"/><line x1="50" y1="56" x2="50" y2="59" stroke="#334155" stroke-width="0.5"/></svg>`,
      type: 'fill-blank',
      question: 'The vial of a spirit _____ is slightly curved (barrel-shaped) so that the bubble acts as an _____, seeking the highest point of the vial when the surface is.',
      blanks: ['indicator', 'level'],
      wordBank: ['indicator', 'level', 'tilted', 'inclined', 'accelerometer'],
      explanation: 'The curved vial creates a restoring force: when the level tilts, the bubble moves away from center (toward the high side), indicating the direction of tilt. When the surface is truly level, the bubble rests at the geometric center. The vial curvature radius determines sensitivity — a larger radius (flatter curve) makes the bubble more responsive to small tilts.',
    },
    {
      id: 'htw-L4-Q20',
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><rect x="20" y="30" width="40" height="30" rx="3" stroke="#334155" stroke-width="1" fill="none"/><line x1="20" y1="60" x2="60" y2="60" stroke="#334155" stroke-width="1.5"/><rect x="28" y="44" width="24" height="6" rx="3" stroke="#3B8700" stroke-width="1" fill="#3B8700" opacity="0.12"/><ellipse cx="40" cy="47" rx="4" ry="2.5" fill="#A5E86C" opacity="0.7"/><line x1="38" y1="44" x2="38" y2="50" stroke="#334155" stroke-width="0.3"/><line x1="40" y1="44" x2="40" y2="50" stroke="#58CC02" stroke-width="0.5"/><line x1="42" y1="44" x2="42" y2="50" stroke="#334155" stroke-width="0.3"/><path d="M40 28 L37 32 L43 32 Z" fill="#58CC02"/><line x1="40" y1="22" x2="40" y2="28" stroke="#58CC02" stroke-width="1.5"/><text x="48" y="26" font-size="4" fill="#58CC02" font-weight="bold">a ↑</text><path d="M40 62 L37 66 L43 66 Z" fill="#334155" transform="rotate(180 40 64)"/><line x1="40" y1="66" x2="40" y2="72" stroke="#334155" stroke-width="1"/><text x="48" y="70" font-size="4" fill="#334155" font-style="italic">g</text><text x="68" y="50" font-size="3.5" fill="#334155" font-style="italic">g_eff</text><text x="68" y="55" font-size="3.5" fill="#58CC02">= g+a</text><text x="40" y="16" text-anchor="middle" font-size="5" fill="#58CC02" font-weight="bold">Elevator Level</text><animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,0" dur="2s" repeatCount="indefinite"/></svg>`,
      type: 'multiple-choice',
      question: 'You are using a spirit level inside an elevator that is accelerating upward. How does the accelerating reference frame affect the level\'s reading?',
      options: [
        'The bubble becomes unstable and oscillates randomly',
        'The level reads correctly — upward acceleration does not affect the bubble\'s lateral equilibrium on a level surface',
        'The bubble moves to one end, giving a false reading',
        'The bubble shrinks due to increased pressure and becomes unreadable',
      ],
      correctIndex: 1,
      explanation: 'Uniform upward acceleration effectively increases the apparent gravitational acceleration (g_eff = g + a), but does not change what "horizontal" means. The bubble still seeks the highest point, and a level surface remains level. However, if the elevator accelerates laterally (e.g., turning in a vehicle), the apparent gravity vector tilts, and the level gives a false reading. This distinction between translational and directional acceleration is crucial in inertial navigation and accelerometer design.',
      hint: 'Think about what direction the effective gravity points when the elevator accelerates straight up.',
    },
  ],
};
