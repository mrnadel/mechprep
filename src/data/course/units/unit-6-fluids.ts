import type { Unit } from '../types';

export const unit6: Unit = {
  id: 'u6-fluids',
  title: 'Fluid Mechanics',
  description: 'Fluid properties, pipe flow, pumps, and dimensional analysis for mechanical engineering applications.',
  color: '#06B6D4',
  icon: '🌊',
  topicId: 'fluid-mechanics',
  lessons: [
    // ═══════════════════════════════════════════════════════════════
    // LESSON 1a: Fluid Properties & Statics (Part 1)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L1',
      title: 'Fluid Properties & Statics (1/3)',
      description: 'What makes a fluid, viscosity, density, and the hydrostatic pressure equation.',
      icon: '📝',
      xpReward: 20,
      levels: 4,
      questions: [
        {
          id: 'u6-L1-T1',
          type: 'teaching',
          question: 'What makes a fluid a fluid?',
          explanation: 'A fluid is any substance that deforms continuously under shear stress. Unlike solids, fluids can\'t resist shear when at rest. The two key properties are density (mass per volume, kg/m3) and viscosity (resistance to flow).',
          hint: 'Water and air are both fluids, even though one is much denser.',
        },
        {
          id: 'u6-L1-Q0a',
          type: 'true-false',
          question: 'Water and air are both classified as fluids.',
          correctAnswer: true,
          explanation: 'Yes. Any substance that flows and deforms continuously under shear stress is a fluid, whether liquid or gas.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Fluids include both liquids and gases.',
        },
        {
          id: 'u6-L1-Q1',
          type: 'multiple-choice',
          question: 'Pressure at a point in a static fluid depends on the shape of the container. Is this correct?',
          options: [
            'Incorrect, pressure depends only on depth, not shape',
            'Correct, wider containers produce more fluid weight',
            'Incorrect, pressure is constant throughout any static fluid',
            'Correct, container shape affects the velocity profile'
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- U-tube --> <path d="M24,14 L24,58 Q24,66 32,66 L48,66 Q56,66 56,58 L56,14" stroke-width="1" stroke="#58CC02" fill="none"/> <!-- Manometric fluid (heavy liquid in U-bend) --> <path d="M24.5,44 L24.5,58 Q24.5,65.5 32,65.5 L48,65.5 Q55.5,65.5 55.5,58 L55.5,36" fill="#A5E86C" opacity="0.15"/> <!-- Left fluid column top --> <line x1="22" y1="44" x2="26" y2="44" stroke-width="0.5" stroke="#A5E86C" opacity="0.5"> <animate attributeName="y1" values="44;40;44" dur="4s" repeatCount="indefinite"/> <animate attributeName="y2" values="44;40;44" dur="4s" repeatCount="indefinite"/> </line> <!-- Right fluid column top --> <line x1="54" y1="36" x2="58" y2="36" stroke-width="0.5" stroke="#A5E86C" opacity="0.5"> <animate attributeName="y1" values="36;40;36" dur="4s" repeatCount="indefinite"/> <animate attributeName="y2" values="40;40;40" dur="4s" repeatCount="indefinite"/> </line> <!-- h measurement --> <line x1="62" y1="36" x2="62" y2="44" stroke-width="0.4" stroke="#3B8700" opacity="0.4"> <animate attributeName="y1" values="36;40;36" dur="4s" repeatCount="indefinite"/> <animate attributeName="y2" values="44;40;44" dur="4s" repeatCount="indefinite"/> </line> <line x1="60" y1="36" x2="64" y2="36" stroke-width="0.3" stroke="#3B8700" opacity="0.4"> <animate attributeName="y1" values="36;40;36" dur="4s" repeatCount="indefinite"/> <animate attributeName="y2" values="36;40;36" dur="4s" repeatCount="indefinite"/> </line> <line x1="60" y1="44" x2="64" y2="44" stroke-width="0.3" stroke="#3B8700" opacity="0.4"> <animate attributeName="y1" values="44;40;44" dur="4s" repeatCount="indefinite"/> <animate attributeName="y2" values="44;40;44" dur="4s" repeatCount="indefinite"/> </line> <text x="66" y="42" font-size="3.5" fill="#3B8700" opacity="0.5">h</text> <!-- Pressure connection (left) --> <line x1="10" y1="20" x2="24" y2="20" stroke-width="0.6" stroke="#58CC02"/> <text x="8" y="21.5" font-size="3" fill="#58CC02" text-anchor="end">P₁</text> <!-- Open/reference (right) --> <text x="58" y="12" font-size="3" fill="#3B8700" opacity="0.4">P_atm</text> <!-- Fluid labels --> <text x="40" y="62" font-size="2.5" fill="#A5E86C" opacity="0.35" text-anchor="middle">mercury</text> <!-- Formula --> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#58CC02" opacity="0.4">ΔP = ρgh</text> </svg>',
          explanation: 'This is the hydrostatic paradox. Pressure at a point depends only on depth below the surface: P = P_atm + rho*g*h.',
          distractorExplanations: {
            1: 'This focuses on correct,/wider, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on constant/throughout, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on correct,/container, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The hydrostatic equation has no term for container shape.'
        },
        {
          id: 'u6-L1-Q2',
          type: 'multiple-choice',
          question: 'A dam gate pivots at bottom. Force is applied at the centroid. Why is this unsafe?',
          options: [
            'Centroid calculation is correct for the force location',
            'The resultant force acts at the centroid of the gate area',
            'Hydrostatic force acts at the TOP of the gate surface',
            'Resultant force acts at the center of pressure, not centroid'
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="12" width="34" height="48" rx="6" fill="#58CC02" opacity="0.08"/> <rect x="10" y="12" width="34" height="48" rx="6" stroke="#3B8700" stroke-width="2" fill="none"/> <rect x="13" y="24" width="28" height="34" rx="3" fill="#58CC02" opacity="0.12"/> <rect x="44" y="42" width="8" height="6" rx="3" fill="#3B8700" opacity="0.4"/> <path d="M52,45 Q62,45 67,52 Q71,58 73,66" stroke="#58CC02" stroke-width="2.5" fill="none" opacity="0.35" stroke-linecap="round"/> <circle r="2.5" fill="#58CC02" opacity="0"> <animateMotion dur="1.5s" repeatCount="indefinite" path="M52,45 Q62,45 67,52 Q71,58 73,66"/> <animate attributeName="opacity" values="0.5;0.5;0" dur="1.5s" repeatCount="indefinite"/> </circle> <circle r="2" fill="#A5E86C" opacity="0"> <animateMotion dur="1.5s" repeatCount="indefinite" path="M52,45 Q62,45 67,52 Q71,58 73,66" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0.4;0" dur="1.5s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1.8" fill="#3B8700" opacity="0"> <animateMotion dur="1.5s" repeatCount="indefinite" path="M52,45 Q62,45 67,52 Q71,58 73,66" begin="0.6s"/> <animate attributeName="opacity" values="0.4;0.4;0" dur="1.5s" begin="0.6s" repeatCount="indefinite"/> </circle> <circle r="2.2" fill="#58CC02" opacity="0"> <animateMotion dur="1.5s" repeatCount="indefinite" path="M52,45 Q62,45 67,52 Q71,58 73,66" begin="0.9s"/> <animate attributeName="opacity" values="0.3;0.3;0" dur="1.5s" begin="0.9s" repeatCount="indefinite"/> </circle> <line x1="6" y1="24" x2="6" y2="46" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <text x="4" y="37" font-size="7" fill="#3B8700" opacity="0.35" text-anchor="middle" font-style="italic">h</text> <rect x="4" y="66" width="72" height="4" rx="2" fill="#58CC02" opacity="0.06"/> </svg>',
          explanation: 'Hydrostatic pressure increases with depth, so the resultant force acts below the centroid at the center of pressure.',
          distractorExplanations: {
            0: 'This focuses on calculation/correct, which is not the correct mechanism or principle for this problem.',
            1: 'Regarding resultant force: Hydrostatic pressure increases with depth, so the resultant force acts below the centroid at the center of pressure.',
            2: 'This focuses on hydrostatic/surface, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Pressure is not uniform: it increases with depth.'
        },
        {
          id: 'u6-L1-Q3',
          type: 'multiple-choice',
          question: 'What distinguishes a Newtonian fluid from a non-Newtonian fluid?',
          options: [
            'Linear relationship between shear stress and strain rate',
            'Newtonian fluids are always low-viscosity like water',
            'Newtonian fluids are defined by obeying gravity laws',
            'The distinction is purely academic with no real use'
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Channel walls --> <line x1="4" y1="20" x2="76" y2="20" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="4" y1="60" x2="76" y2="60" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="40" y="16" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15">no-slip (v=0)</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15">no-slip (v=0)</text> <line x1="12" y1="24" x2="16" y2="24" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <polygon points="15,22.5 18,24 15,25.5" fill="#58CC02" opacity="0.2"/> <line x1="12" y1="30" x2="24" y2="30" stroke="#58CC02" stroke-width="1" opacity="0.3"/> <polygon points="23,28.5 26,30 23,31.5" fill="#58CC02" opacity="0.3"/> <line x1="12" y1="40" x2="36" y2="40" stroke="#3B8700" stroke-width="1.5" opacity="0.4"/> <polygon points="35,38 38,40 35,42" fill="#3B8700" opacity="0.4"/> <line x1="12" y1="50" x2="24" y2="50" stroke="#58CC02" stroke-width="1" opacity="0.3"/> <polygon points="23,48.5 26,50 23,51.5" fill="#58CC02" opacity="0.3"/> <line x1="12" y1="56" x2="16" y2="56" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <polygon points="15,54.5 18,56 15,57.5" fill="#58CC02" opacity="0.2"/> <path d="M12,20 Q38,40 12,60" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="2,3" fill="none" opacity="0.15"/> <circle r="1.5" fill="#3B8700" opacity="0.4"> <animateMotion dur="1.5s" repeatCount="indefinite" path="M14,40 L66,40"/> </circle> <text x="42" y="39" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">v_max</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">Poiseuille flow</text> </svg>',
          explanation: 'Newton\'s law of viscosity says tau = mu * (du/dy). For Newtonian fluids, viscosity mu is constant regardless of shear rate.',
          distractorExplanations: {
            1: 'This "always" claim is too broad; newtonian fluids the principle has important exceptions.',
            2: 'This focuses on newtonian/fluids, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on distinction/purely, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The relationship tau = mu * (du/dy) is the key.'
        },
        {
          id: 'u6-L1-T2',
          type: 'teaching',
          question: 'Pressure increases with depth',
          explanation: 'In a static fluid, pressure at any point equals P = P_atm + rho*g*h, where h is the depth below the surface. This depends only on depth, not on container shape.',
          hint: 'A tall narrow tube and a wide tank at the same depth have the same pressure.',
        },
        {
          id: 'u6-L1-Q0b',
          type: 'multiple-choice',
          question: 'As you go deeper in a swimming pool, the water pressure:',
          options: [
            'Increases',
            'Decreases',
            'Stays the same',
            'Depends on pool shape'
          ],
          correctIndex: 0,
          explanation: 'Pressure increases linearly with depth: P = rho*g*h. The deeper you go, the more fluid weight above you.',
          distractorExplanations: {
            1: 'Regarding decreases: Pressure increases linearly with depth: P = rho*g*h.',
            2: 'Regarding stays: Pressure increases linearly with depth: P = rho*g*h.',
            3: 'Regarding depends shape: Pressure increases linearly with depth: P = rho*g*h.',
          },
          hint: 'Think about how your ears feel when diving deeper.',
        },
        {
          id: 'u6-L1-Q4',
          type: 'multiple-choice',
          question: 'What is wrong with this reasoning?',
          options: [
            'The 100x force multiplication only works for static loading',
            'The energy difference is supplied by pressurized hydraulic fluid',
            'Force is multiplied but displacement is divided by the same ratio',
            'Conservation of energy does not apply to mechanical systems'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="15" y="57" width="52" height="6" rx="2" fill="#A5E86C" opacity="0.15"/> <rect x="17" y="38" width="10" height="19" rx="1" fill="#A5E86C" opacity="0.13"> <animate attributeName="y" values="38;48;38" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/> <animate attributeName="height" values="19;9;19" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/> </rect> <rect x="49" y="28" width="16" height="29" rx="1" fill="#A5E86C" opacity="0.13"> <animate attributeName="y" values="28;24;28" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/> <animate attributeName="height" values="29;33;29" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/> </rect> <rect x="14" y="56" width="54" height="8" rx="3" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="16" y1="26" x2="16" y2="58" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="28" y1="26" x2="28" y2="58" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="48" y1="18" x2="48" y2="58" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="66" y1="18" x2="66" y2="58" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/> <rect x="17" y="32" width="10" height="6" rx="2" fill="#58CC02" opacity="0.45"/> <rect x="17" y="32" width="10" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <rect x="19.5" y="22" width="5" height="12" rx="2.5" fill="#3B8700" opacity="0.35"/> <line x1="22" y1="12" x2="22" y2="19" stroke="#3B8700" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/> <polygon points="20,18 22,22 24,18" fill="#3B8700" opacity="0.4"/> </g> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/> <rect x="49" y="22" width="16" height="6" rx="2" fill="#58CC02" opacity="0.4"/> <rect x="49" y="22" width="16" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <rect x="53" y="14" width="8" height="10" rx="3" fill="#3B8700" opacity="0.3"/> <rect x="50" y="8" width="14" height="6" rx="2" fill="#58CC02" opacity="0.18"/> <rect x="50" y="8" width="14" height="6" rx="2" stroke="#3B8700" stroke-width="1.2" fill="none"/> <polygon points="55,6 57,2 59,6" fill="#3B8700" opacity="0.4"/> </g> <text x="22" y="9" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-weight="bold" font-style="italic">f</text> <text x="64" y="5" text-anchor="middle" font-size="8" fill="#3B8700" opacity="0.45" font-weight="bold" font-style="italic">F</text> <text x="22" y="72" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.2" font-style="italic">a</text> <text x="57" y="72" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.2" font-style="italic">A</text> </svg>',
          explanation: 'Pascal\'s law gives force multiplication F2 = F1 * (A2/A1). But volume is conserved: A1*d1 = A2*d2, so displacement shrinks proportionally.',
          distractorExplanations: {
            0: 'This is too restrictive; the principle applies more broadly than force multiplication suggests.',
            1: 'This focuses on energy/difference, which is not the correct mechanism or principle for this problem.',
            3: 'This incorrectly denies an effect that is relevant to conservation energy and significant in this context.',
          },
          hint: 'What happens to the displacement when force is multiplied?'
        },
        {
          id: 'u6-L1-Q5',
          type: 'multiple-choice',
          question: 'Which of the following statements about surface tension is correct?',
          options: [
            'Surface tension increases with temperature for most liquids',
            'Capillary rise is inversely proportional to tube diameter',
            'Surface tension has units of N/m2, same as pressure',
            'Surface tension effects vanish as length scale decreases'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><rect x="5" y="40" width="70" height="30" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1"/><rect x="7" y="42" width="66" height="26" fill="#A5E86C" opacity="0.12"/><rect x="35" y="10" width="10" height="60" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/><rect x="36" y="25" width="8" height="45" fill="#A5E86C" opacity="0.15"/><path d="M36,25 Q40,20 44,25" stroke="#58CC02" stroke-width="1" fill="#A5E86C" opacity="0.2"/><line x1="48" y1="25" x2="48" y2="42" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.4"/><text x="53" y="35" font-size="4" fill="#3B8700" opacity="0.5">h</text><text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#58CC02" opacity="0.4">capillary rise</text></svg>',
          explanation: 'Capillary rise h = 4*sigma*cos(theta)/(rho*g*d), inversely proportional to tube diameter d.',
          distractorExplanations: {
            0: 'Temperature is not the primary factor in this problem; the correct analysis uses a different variable.',
            2: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
            3: 'This focuses on surface/tension, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Look at the capillary rise equation and how diameter appears.'
        },
        {
          id: 'u6-L1-Q6',
          type: 'fill-blank',
          question: 'The ratio of dynamic viscosity to density (mu/rho) is called the _____ viscosity, with SI units of m2/s.',
          blanks: ['kinematic'],
          wordBank: ['kinematic', 'dynamic', 'absolute', 'turbulent', 'specific'],
          explanation: 'Kinematic viscosity nu = mu/rho combines a fluid\'s resistance to deformation with its density.',
          hint: 'This form of viscosity has units of m2/s and appears in the Reynolds number.'
        },
        {
          id: 'u6-L1-Q7',
          type: 'sort-buckets',
          question: 'Sort these into Newtonian or non-Newtonian fluids.',
          options: ['Water', 'Honey', 'Air', 'Ketchup', 'Motor oil', 'Toothpaste'],
          buckets: ['Newtonian', 'Non-Newtonian'],
          correctBuckets: [0, 0, 0, 1, 0, 1],
          explanation: 'Water, honey, air, and motor oil all have constant viscosity at a given temperature (Newtonian). Ketchup and toothpaste change viscosity with shear rate.',
          hint: 'Newtonian fluids have a constant viscosity regardless of how hard you stir them.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 1b: Fluid Properties & Statics (Part 2)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L1b',
      title: 'Fluid Properties & Statics (2/3)',
      description: 'Manometers, gauge vs absolute pressure, and buoyancy forces.',
      icon: '📝',
      xpReward: 20,
      levels: 4,
      questions: [
        {
          id: 'u6-L1-T3',
          type: 'teaching',
          question: 'Buoyancy and hydrostatic forces',
          explanation: 'Archimedes\' principle says the buoyant force on a submerged object equals the weight of displaced fluid: F_b = rho_fluid * g * V_object. For forces on flat surfaces like gates and dams, use F = rho*g*y_c*A.',
          hint: 'Buoyancy depends on the fluid\'s density and the object\'s volume, not its weight.',
        },
        {
          id: 'u6-L1b-Q0a',
          type: 'true-false',
          question: 'A steel ship floats because it displaces a volume of water that weighs more than the ship itself.',
          correctAnswer: true,
          explanation: 'Exactly. The hollow hull displaces enough water so the buoyant force equals the ship\'s weight.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Archimedes\' principle is about displaced fluid volume, not material density.',
        },
        {
          id: 'u6-L1-Q8',
          type: 'multiple-choice',
          question: 'If the local atmospheric pressure is 95 kPa (at elevation), what is the absolute pressure at 350 kPa gauge?',
          options: [
            '445 kPa absolute',
            '350 kPa absolute',
            '255 kPa absolute',
            '350 kPa, gauge and absolute are equivalent'
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="40" cy="40" r="28" stroke-width="1" stroke="#58CC02" fill="none"/> <circle cx="40" cy="40" r="26" stroke-width="0.3" stroke="#58CC02" fill="none" opacity="0.2"/> <g stroke="#58CC02" stroke-width="0.4" opacity="0.4"> <line x1="40" y1="14" x2="40" y2="18"/><line x1="40" y1="62" x2="40" y2="66"/> <line x1="14" y1="40" x2="18" y2="40"/><line x1="62" y1="40" x2="66" y2="40"/> </g> <text x="40" y="22" font-size="3" fill="#58CC02" opacity="0.35" text-anchor="middle">6</text> <text x="64" y="42" font-size="3" fill="#58CC02" opacity="0.35" text-anchor="middle">10</text> <text x="16" y="42" font-size="3" fill="#58CC02" opacity="0.35" text-anchor="middle">2</text> <text x="22" y="60" font-size="3" fill="#58CC02" opacity="0.35" text-anchor="middle">0</text> <g> <line x1="40" y1="40" x2="24" y2="54" stroke-width="0.8" stroke="#58CC02"/> <animateTransform attributeName="transform" type="rotate" values="0,40,40;-120,40,40;0,40,40" dur="5s" repeatCount="indefinite"/> </g> <circle cx="40" cy="40" r="2.5" stroke-width="0.5" stroke="#58CC02" fill="#58CC02" fill-opacity="0.1"/> <text x="40" y="50" font-size="3" fill="#3B8700" opacity="0.3" text-anchor="middle">bar</text> </svg>',
          explanation: 'P_absolute = P_gauge + P_atmospheric = 350 + 95 = 445 kPa. Gauge pressure uses atmospheric as its zero.',
          distractorExplanations: {
            1: 'This value results from an incorrect approach; kPa absolute.',
            2: '255 is approximately half the correct answer, likely from omitting a required factor of 2.',
            3: 'This value results from an incorrect approach; kPa, gauge and absolute are equivalent.',
          },
          hint: 'Gauge pressure uses atmospheric as its zero reference.'
        },
        {
          id: 'u6-L1-Q9',
          type: 'true-false',
          question: 'The buoyant force on a fully submerged object depends on the object\'s weight and density.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Buoyancy Forces</text><rect x="4" y="18" width="72" height="52" rx="2" fill="#58CC02" opacity="0.06"/><line x1="4" y1="18" x2="76" y2="18" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><rect x="26" y="30" width="28" height="22" rx="3" fill="#A5E86C" opacity="0.15" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="44" text-anchor="middle" font-size="5" fill="#334155">Object</text><line x1="40" y1="30" x2="40" y2="16" stroke="#58CC02" stroke-width="1.5" opacity="0.5"/><polygon points="38.5,18 40,14 41.5,18" fill="#58CC02" opacity="0.5"/><text x="44" y="22" font-size="5" fill="#58CC02" font-weight="bold">F_b</text><line x1="40" y1="52" x2="40" y2="66" stroke="#3B8700" stroke-width="1.5" opacity="0.5"/><polygon points="38.5,64 40,68 41.5,64" fill="#3B8700" opacity="0.5"/><text x="44" y="64" font-size="5" fill="#3B8700" font-weight="bold">W</text><text x="40" y="75" text-anchor="middle" font-size="4" fill="#334155" font-style="italic">F_b = rho_fluid * g * V_obj</text></svg>',
          explanation: 'Buoyant force depends only on the fluid\'s density and the object\'s volume: F_b = rho_fluid * g * V_object.',
          distractorExplanations: {
            0: 'Buoyant force depends only on the fluid\.',
          },
          hint: 'Archimedes\' principle: what determines the buoyant force?'
        },
        {
          id: 'u6-L1-Q10',
          type: 'multiple-choice',
          question: 'What is the resultant hydrostatic force on the gate? (rho_water = 1000 kg/m3)',
          options: [
            'F = 0.5 * rho*g * h2 * w = 235.4 kN',
            'F = rho*g * h * A = 1000 * 9.81 * 4 * 12 = 470.9 kN',
            'F = rho*g * y_c * A = 1000 * 9.81 * 2 * 12 = 235.4 kN',
            'F = rho*g * h * w = 1000 * 9.81 * 4 * 3 = 117.7 kN'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><rect x="5" y="10" width="35" height="55" fill="#A5E86C" opacity="0.1"/><line x1="40" y1="10" x2="40" y2="65" stroke="#3B8700" stroke-width="2.5"/><circle cx="40" cy="65" r="2" fill="#3B8700" opacity="0.5"/><line x1="5" y1="65" x2="75" y2="65" stroke="#3B8700" stroke-width="2"/><circle cx="40" cy="37" r="1.5" fill="#3B8700" opacity="0.6"/><text x="44" y="36" font-size="3" fill="#3B8700" opacity="0.5">CG</text><circle cx="40" cy="44" r="1.5" fill="#58CC02" opacity="0.6"/><text x="44" y="43" font-size="3" fill="#58CC02" opacity="0.5">CP</text><text x="40" y="76" text-anchor="middle" font-size="3" fill="#58CC02" opacity="0.4">CP below CG</text></svg>',
          explanation: 'The resultant hydrostatic force on a plane surface is F = rho*g * y_c * A, where y_c is the depth to the centroid.',
          distractorExplanations: {
            0: 'The resultant hydrostatic force on a plane surface is F = rho*g * y_c * A, where y_c is the depth to the centroid.',
            1: 'This focuses on 470.9, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on 117.7, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The hydrostatic force uses the pressure at the centroid.'
        },
        {
          id: 'u6-L1b-T2',
          type: 'teaching',
          question: 'Manometers measure pressure',
          explanation: 'A manometer is a U-tube filled with a heavy fluid (usually mercury). The pressure difference between the two sides creates a measurable height difference: delta_P = rho_manometer * g * delta_h.',
          hint: 'Try this now: look at a tire pressure gauge and note whether it reads gauge or absolute.',
        },
        {
          id: 'u6-L1b-Q0b',
          type: 'multiple-choice',
          question: 'In a U-tube manometer, the heavier fluid column is pushed down on the:',
          options: [
            'Both sides equally',
            'Low-pressure side',
            'High-pressure side',
            'It doesn\'t matter'
          ],
          correctIndex: 2,
          explanation: 'Higher pressure pushes the manometer fluid down on that side, causing it to rise on the opposite side.',
          distractorExplanations: {
            0: 'This focuses on sides/equally, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on low-pressure, which is not the correct mechanism or principle for this problem.',
            3: 'Regarding doesn: Higher pressure pushes the manometer fluid down on that side, causing it to rise on the opposite side.',
          },
          hint: 'Think about pushing down on one side of a U-tube.',
        },
        {
          id: 'u6-L1-Q11',
          type: 'multiple-choice',
          question: 'What is the bulk modulus of a fluid, and why does it matter in hydraulic systems?',
          options: [
            'Bulk modulus measures a fluid\'s resistance to compression',
            'Bulk modulus measures resistance to shear deformation',
            'Bulk modulus is the ratio of surface tension to viscosity',
            'Bulk modulus only matters for gases'
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="15" y="20" width="50" height="40" rx="3" fill="#58CC02" opacity="0.08" stroke="#58CC02" stroke-width="1.5"/> <text x="40" y="38" text-anchor="middle" font-size="5" fill="#3B8700" font-weight="bold" font-style="italic">V</text> <g opacity="0"> <animate attributeName="opacity" values="0;0.6;0.6" dur="2.5s" repeatCount="indefinite" keyTimes="0;0.2;1"/> <line x1="8" y1="40" x2="15" y2="40" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <polygon points="13,38 17,40 13,42" fill="#3B8700"/> <line x1="72" y1="40" x2="65" y2="40" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <polygon points="67,42 63,40 67,38" fill="#3B8700"/> </g> <rect x="20" y="25" width="40" height="30" rx="2" fill="none" stroke="#A5E86C" stroke-width="1" stroke-dasharray="2,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.4;0.4" dur="2.5s" repeatCount="indefinite" keyTimes="0;0.3;0.5;1"/> </rect> <text x="40" y="76" text-anchor="middle" font-size="4" fill="#334155" opacity="0.4" font-style="italic">K = delta_P/(delta_V/V)</text> </svg>',
          explanation: 'Bulk modulus K measures how much pressure is needed to compress a fluid by a given fraction. Water has K of about 2.2 GPa.',
          distractorExplanations: {
            1: 'This focuses on resistance/shear, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on ratio/surface, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than modulus matters suggests.',
          },
          hint: 'What happens when you try to compress a fluid?'
        },
        {
          id: 'u6-L1-Q12',
          type: 'true-false',
          question: 'In a differential manometer, if both legs contain the same fluid and no manometer fluid is used, the manometer cannot measure a pressure difference.',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><path d="M24,66 L24,22 Q24,14 32,14 L48,14 Q56,14 56,22 L56,66" stroke="#3B8700" stroke-width="1" fill="none"/><path d="M24.5,36 L24.5,22 Q24.5,14.5 32,14.5 L48,14.5 Q55.5,14.5 55.5,22 L55.5,44" fill="#A5E86C" opacity="0.1"/><line x1="62" y1="36" x2="62" y2="44" stroke="#3B8700" stroke-width="0.4" opacity="0.4"/><text x="66" y="42" font-size="3.5" fill="#3B8700" opacity="0.5">h</text><text x="40" y="10" font-size="3" fill="#A5E86C" opacity="0.35" text-anchor="middle">light fluid</text><text x="40" y="76" text-anchor="middle" font-size="3" fill="#58CC02" opacity="0.4">inverted U-tube</text></svg>',
          explanation: 'A manometer needs a fluid of different density to create a measurable height difference. Same fluid on both sides means no height change.',
          distractorExplanations: {
            1: 'A manometer needs a fluid of different density to create a measurable height difference.',
          },
          hint: 'Write out the manometer equation with the same fluid on both sides.'
        },
        {
          id: 'u6-L1-Q13',
          type: 'multiple-choice',
          question: 'At 300 m below the ocean surface (seawater rho = 1025 kg/m3), what is the gauge pressure on the hull?',
          options: [
            'About 302 kPa (approximately 3 atmospheres)',
            'About 3.02 MPa (approximately 30 atmospheres)',
            'About 30.2 MPa (approximately 300 atmospheres)',
            'About 101.3 kPa (one atmosphere at any depth)'
          ],
          correctIndex: 1,
          explanation: 'P_gauge = rho*g*h = 1025 * 9.81 * 300 = 3,016,575 Pa, which is about 3.02 MPa or 30 atm.',
          distractorExplanations: {
            0: '302 significantly exceeds the correct answer due to a fundamental formula or calculation error.',
            2: '30.2 is an order of magnitude too large, likely from a unit conversion error.',
            3: '101.3 significantly exceeds the correct answer due to a fundamental formula or calculation error.',
          },
          hint: 'Use P = rho*g*h with consistent SI units.'
        },
        {
          id: 'u6-L1-Q14',
          type: 'match-pairs',
          question: 'Match each fluid property to its correct definition.',
          options: ['Viscosity', 'Density', 'Surface tension', 'Bulk modulus'],
          matchTargets: ['Resistance to flow', 'Mass per unit volume', 'Force per unit length at interface', 'Resistance to compression'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'These four properties are the building blocks for describing any fluid\'s mechanical behavior.',
          hint: 'Think about what each property physically resists or measures.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 1c: Fluid Properties & Statics (Part 3)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L1c',
      title: 'Fluid Properties & Statics (3/3)',
      description: 'Floating stability, non-Newtonian fluids, vapor pressure, and advanced hydrostatics.',
      icon: '📝',
      xpReward: 20,
      levels: 4,
      questions: [
        {
          id: 'u6-L1c-T1',
          type: 'teaching',
          question: 'Floating stability',
          explanation: 'A floating object is stable when the metacenter (M) is above the center of gravity (G). The metacentric height GM = BM - BG determines how strongly a displaced object rights itself.',
          hint: 'Ships are designed so M stays well above G, even when tilted.',
        },
        {
          id: 'u6-L1c-Q0a',
          type: 'true-false',
          question: 'A floating boat is stable when its metacenter is above its center of gravity.',
          correctAnswer: true,
          explanation: 'Correct. When M is above G, any tilt creates a righting moment that pushes the boat back upright.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'M above G = stable. G above M = capsizes.',
        },
        {
          id: 'u6-L1-Q15',
          type: 'fill-blank',
          question: 'The hydrostatic force on a curved submerged surface is analyzed by resolving it into _____ and vertical components.',
          blanks: ['horizontal'],
          wordBank: ['horizontal', 'tangential', 'normal', 'radial', 'axial'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Curved Surface Forces</text><rect x="4" y="12" width="72" height="56" rx="2" fill="#58CC02" opacity="0.04"/><path d="M20,18 Q20,50 50,62" stroke="#3B8700" stroke-width="2" fill="none"/><line x1="40" y1="62" x2="50" y2="62" stroke="#58CC02" stroke-width="1" opacity="0.4"/><polygon points="49,60.5 52,62 49,63.5" fill="#58CC02" opacity="0.4"/><text x="54" y="64" font-size="3.5" fill="#58CC02">F_H</text><line x1="40" y1="62" x2="40" y2="72" stroke="#58CC02" stroke-width="1" opacity="0.4"/><polygon points="38.5,70 40,74 41.5,70" fill="#58CC02" opacity="0.4"/><text x="44" y="72" font-size="3.5" fill="#58CC02">F_V</text><text x="40" y="79" text-anchor="middle" font-size="3.5" fill="#6B7280">Resolve into F_H and F_V</text></svg>',
          explanation: 'For curved surfaces, pressure acts in different directions at every point, so you resolve the total force into horizontal and vertical components.',
          hint: 'You can\'t use F = rho*g*y_c*A directly on a curve.'
        },
        {
          id: 'u6-L1-Q16',
          type: 'multiple-choice',
          question: 'What is the primary advantage of an inclined manometer over a vertical one?',
          options: [
            'It removes the need for a different-density fluid',
            'It allows measurement of higher pressures',
            'It eliminates parallax error in the reading',
            'It amplifies the reading for a given pressure difference'
          ],
          correctIndex: 3,
          explanation: 'An inclined tube magnifies the fluid travel distance: delta_L = delta_h/sin(theta), making small pressure differences easier to read.',
          distractorExplanations: {
            0: 'This focuses on removes/different-density, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on allows/measurement, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on eliminates/parallax, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Same vertical height change produces a longer tube travel.'
        },
        {
          id: 'u6-L1-Q17',
          type: 'multiple-choice',
          question: 'A floating object is displaced slightly and released. Under what condition will it be stable?',
          options: [
            'When the center of buoyancy is above the center of gravity',
            'When the metacenter is above the center of gravity',
            'When the center of gravity is located at the waterline',
            'When the metacentric height is zero'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><rect x="5" y="35" width="70" height="35" fill="#A5E86C" opacity="0.08"/><line x1="5" y1="35" x2="75" y2="35" stroke="#58CC02" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/><rect x="25" y="25" width="30" height="30" rx="3" fill="#58CC02" opacity="0.12" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="45" r="1.5" fill="#3B8700" opacity="0.6"/><text x="44" y="47" font-size="3" fill="#3B8700" opacity="0.5">G</text><circle cx="40" cy="50" r="1.5" fill="#58CC02" opacity="0.6"/><text x="44" y="52" font-size="3" fill="#58CC02" opacity="0.5">B</text><circle cx="40" cy="38" r="1" fill="#A5E86C" opacity="0.6"/><text x="44" y="40" font-size="3" fill="#A5E86C" opacity="0.5">M</text><text x="40" y="76" text-anchor="middle" font-size="3" fill="#58CC02" opacity="0.4">M above G = stable</text></svg>',
          explanation: 'Floating stability depends on the metacentric height GM = BM - BG. Positive GM means stable.',
          distractorExplanations: {
            0: 'This focuses on buoyancy, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on located/waterline, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on metacentric/height, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The metacentric height determines stability.'
        },
        {
          id: 'u6-L1c-T2',
          type: 'teaching',
          question: 'Vapor pressure and cavitation',
          explanation: 'Every liquid has a vapor pressure that increases with temperature. When local pressure in a flow drops below vapor pressure, bubbles form. Their violent collapse is called cavitation, and it damages pump impellers and propellers.',
          hint: 'Try this now: boil water at room temperature by pulling a vacuum on a syringe.',
        },
        {
          id: 'u6-L1c-Q0b',
          type: 'multiple-choice',
          question: 'Cavitation occurs when local pressure drops below the fluid\'s:',
          options: [
            'Vapor pressure',
            'Atmospheric pressure',
            'Gauge pressure',
            'Bulk modulus'
          ],
          correctIndex: 0,
          explanation: 'Cavitation starts when the local pressure falls below the fluid\'s vapor pressure at that temperature.',
          distractorExplanations: {
            1: 'This focuses on atmospheric, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on gauge, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on modulus, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The fluid literally boils at low pressure.',
        },
        {
          id: 'u6-L1-Q18',
          type: 'true-false',
          question: 'A Bingham plastic fluid behaves as a rigid body until a minimum yield stress is exceeded, after which it flows like a Newtonian fluid.',
          correctAnswer: true,
          explanation: 'Bingham plastics have the equation tau = tau_y + mu_p*(du/dy). Below the yield stress, no flow occurs.',
          distractorExplanations: {
            1: 'Bingham plastics have the equation tau = tau_y + mu_p*(du/dy).',
          },
          hint: 'Toothpaste doesn\'t flow until you squeeze hard enough.'
        },
        {
          id: 'u6-L1-Q19',
          type: 'multiple-choice',
          question: 'What is the specific gravity (SG) of a fluid?',
          options: [
            'SG is the ratio of fluid density to air density',
            'SG is the ratio of dynamic viscosity to kinematic viscosity',
            'SG is the ratio of fluid density to water density, dimensionless',
            'SG is identical to density but in different units'
          ],
          correctIndex: 2,
          explanation: 'Specific gravity SG = rho_fluid/rho_water. It\'s dimensionless and convenient: density in kg/m3 is simply 1000 * SG.',
          distractorExplanations: {
            0: 'Regarding ratio fluid: Specific gravity SG = rho_fluid/rho_water.',
            1: 'This focuses on dynamic/viscosity, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on identical/different, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'SG compares a fluid\'s density to water as a reference.'
        },
        {
          id: 'u6-L1-Q24',
          type: 'multiple-choice',
          question: 'What is the vapor pressure of a liquid, and why is it critical in fluid system design?',
          options: [
            'Pressure exerted by vapors above a liquid surface',
            'Maximum pressure a fluid can withstand before failing',
            'Pressure at which a liquid boils at a given temperature',
            'Vapor pressure is relevant only for gas-phase systems'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M4,30 L28,30 Q40,36 52,30 L76,30" stroke-width="0.8" stroke="#58CC02" fill="none"/> <path d="M4,50 L28,50 Q40,44 52,50 L76,50" stroke-width="0.8" stroke="#58CC02" fill="none"/> <circle cx="42" cy="38" r="1.5" stroke-width="0.3" stroke="#A5E86C" fill="none"> <animate attributeName="r" values="0;2;0" dur="1.5s" repeatCount="indefinite"/> <animate attributeName="cx" values="40;50;58" dur="1.5s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" repeatCount="indefinite"/> </circle> <circle cx="42" cy="42" r="1" stroke-width="0.3" stroke="#A5E86C" fill="none"> <animate attributeName="r" values="0;1.5;0" dur="1.5s" repeatCount="indefinite" begin="0.3s"/> <animate attributeName="cx" values="40;48;56" dur="1.5s" repeatCount="indefinite" begin="0.3s"/> <animate attributeName="opacity" values="0;0.5;0" dur="1.5s" repeatCount="indefinite" begin="0.3s"/> </circle> <text x="40" y="58" font-size="3" fill="#3B8700" opacity="0.4" text-anchor="middle">P &lt; P_vapor</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">bubble collapse</text> </svg>',
          explanation: 'Vapor pressure is the pressure at which liquid and vapor coexist. If local pressure drops below this, the fluid boils and cavitation occurs.',
          distractorExplanations: {
            0: 'This focuses on exerted/vapors, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on maximum/fluid, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than vapor pressure suggests.',
          },
          hint: 'What happens when the local pressure in a flowing liquid drops too low?'
        },
        {
          id: 'u6-L1-Q25',
          type: 'fill-blank',
          question: 'The property of a liquid surface that causes it to behave like a stretched membrane, measured in N/m, is called _____ tension.',
          blanks: ['surface'],
          wordBank: ['surface', 'shear', 'viscous', 'capillary', 'interfacial'],
          explanation: 'Surface tension arises from the imbalance of intermolecular forces at a liquid\'s interface.',
          hint: 'This property causes water droplets to form spheres.'
        },
        {
          id: 'u6-L1-Q27',
          type: 'order-steps',
          question: 'Put these steps in order for reading a U-tube manometer.',
          steps: [
            'Identify the two connection points',
            'Note the manometer fluid density',
            'Measure the height difference delta_h',
            'Calculate delta_P = rho_m * g * delta_h'
          ],
          correctOrder: [0, 1, 2, 3],
          explanation: 'Reading a manometer is systematic: identify connections, know the fluid, measure the height, then compute the pressure.',
          hint: 'You need to know the fluid properties before you can calculate pressure.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 2a: Bernoulli & Energy Equation (Part 1)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L2',
      title: 'Bernoulli & Energy Equation (1/3)',
      description: 'Bernoulli\'s equation, key assumptions, and common pitfalls.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u6-L2-T1',
          type: 'teaching',
          question: 'Bernoulli\'s equation explained',
          explanation: 'Along a streamline in steady, incompressible, inviscid flow: P + 0.5*rho*v2 + rho*g*z = constant. Where velocity goes up, pressure goes down.',
          hint: 'Think of a garden hose nozzle: the narrow opening speeds up the water and drops the pressure.',
        },
        {
          id: 'u6-L2-Q0a',
          type: 'multiple-choice',
          question: 'When water flows through a pipe that narrows, its velocity:',
          options: [
            'Increases',
            'Decreases',
            'Stays the same',
            'Depends on pipe material'
          ],
          correctIndex: 0,
          explanation: 'Continuity requires A1*V1 = A2*V2. Smaller area means higher velocity.',
          distractorExplanations: {
            1: 'Regarding decreases: Continuity requires A1*V1 = A2*V2.',
            2: 'Regarding stays: Continuity requires A1*V1 = A2*V2.',
            3: 'Regarding depends material: Continuity requires A1*V1 = A2*V2.',
          },
          hint: 'Think about putting your thumb over a garden hose.',
        },
        {
          id: 'u6-L2-Q1',
          type: 'multiple-choice',
          question: 'An engineer used Bernoulli for a rough pipe and got wrong results. What is the likely error?',
          options: [
            'The pipe diameter was likely measured incorrectly',
            'Bernoulli only works for gases, not for liquid flow',
            'Bernoulli assumes inviscid flow, which fails in rough pipes',
            'Bernoulli does not apply to horizontal pipe systems'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Bernoulli - Venturi</text><path d="M4,24 L24,24 Q32,24 40,30 Q48,24 56,24 L76,24" stroke="#3B8700" stroke-width="1.5" fill="none"/><path d="M4,48 L24,48 Q32,48 40,42 Q48,48 56,48 L76,48" stroke="#3B8700" stroke-width="1.5" fill="none"/><path d="M4,24 L24,24 Q32,24 40,30 Q48,24 56,24 L76,24 L76,48 L56,48 Q48,48 40,42 Q32,48 24,48 L4,48 Z" fill="#58CC02" opacity="0.05"/><text x="40" y="62" text-anchor="middle" font-size="4" fill="#334155" font-style="italic">P+0.5*rho*v2+rho*gz = const</text></svg>',
          explanation: 'Bernoulli assumes steady, incompressible, inviscid flow. Rough pipes have significant friction losses that Bernoulli ignores.',
          distractorExplanations: {
            0: 'This focuses on diameter/likely, which is not the correct mechanism or principle for this problem.',
            1: 'This is too restrictive; the principle applies more broadly than bernoulli works suggests.',
            3: 'This incorrectly denies an effect that is relevant to bernoulli apply and significant in this context.',
          },
          hint: 'What are the assumptions of the Bernoulli equation?'
        },
        {
          id: 'u6-L2-Q2',
          type: 'true-false',
          question: 'A pitot tube can accurately measure air velocity in a ventilation duct regardless of whether the flow is laminar or turbulent.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <g opacity="0.15"> <line x1="4" y1="20" x2="14" y2="20" stroke="#3B8700" stroke-width="1"/> <polygon points="13,18.5 16,20 13,21.5" fill="#3B8700"/> <line x1="4" y1="40" x2="14" y2="40" stroke="#3B8700" stroke-width="1"/> <polygon points="13,38.5 16,40 13,41.5" fill="#3B8700"/> <line x1="4" y1="60" x2="14" y2="60" stroke="#3B8700" stroke-width="1"/> <polygon points="13,58.5 16,60 13,61.5" fill="#3B8700"/> </g> <rect x="22" y="38" width="40" height="4" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="22" cy="40" r="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="19" cy="40" r="1.5" fill="#3B8700" opacity="0.4"> <animate attributeName="r" values="1.5;2.2;1.5" dur="1.5s" repeatCount="indefinite"/> </circle> <text x="50" y="74" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">v = sqrt(2*deltaP/rho)</text> </svg>',
          explanation: 'A pitot tube measures velocity at a single point. In turbulent flow, the velocity profile is flatter, but you still need to account for the profile shape to get average velocity.',
          distractorExplanations: {
            0: 'A pitot tube measures velocity at a single point.',
          },
          hint: 'What velocity does a pitot tube measure: local or average?'
        },
        {
          id: 'u6-L2-T2',
          type: 'teaching',
          question: 'Key assumptions of Bernoulli',
          explanation: 'Bernoulli only works for steady, incompressible, inviscid flow along a single streamline. If there\'s significant friction, turbulence, or energy addition (pumps), you need the full energy equation.',
          hint: 'When a textbook problem says "neglect losses," that\'s telling you to use Bernoulli.',
        },
        {
          id: 'u6-L2-Q0b',
          type: 'true-false',
          question: 'Bernoulli\'s equation can be used when there are significant friction losses in the pipe.',
          correctAnswer: false,
          explanation: 'No. Bernoulli assumes inviscid (frictionless) flow. For friction losses, use the full energy equation.',
          distractorExplanations: {
            0: 'The statement is false; the underlying assumption contains an error.',
          },
          hint: 'One of Bernoulli\'s key assumptions is about friction.',
        },
        {
          id: 'u6-L2-Q3',
          type: 'multiple-choice',
          question: 'Pitot-static tube: P_stag = 101.8 kPa, P_static = 101.3 kPa, rho = 1.2 kg/m3. Air velocity?',
          options: [
            '40.8 m/s',
            '20.4 m/s',
            '28.9 m/s',
            '14.4 m/s'
          ],
          correctIndex: 2,
          explanation: 'V = sqrt(2*(P_stag - P_static)/rho) = sqrt(2 * 500 / 1.2) = sqrt(833) = 28.9 m/s.',
          distractorExplanations: {
            0: 'This numerical value does not result from the correct formula applied to the given parameters.',
            1: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: '14.4 is approximately half the correct answer, likely from omitting a required factor of 2.',
          },
          hint: 'Dynamic pressure = stagnation - static = 0.5*rho*V2.'
        },
        {
          id: 'u6-L2-Q4',
          type: 'multiple-choice',
          question: 'The HGL drops below the pipe centerline at a high point. What does this indicate?',
          options: [
            'Total energy of the flow has increased via a pump',
            'Flow has reached sonic velocity at that point',
            'The flow has become turbulent at that section',
            'Static pressure at that point is below atmospheric'
          ],
          correctIndex: 3,
          explanation: 'The HGL represents P/(rho*g) + z. When HGL is below the pipe, pressure head is negative gauge (below atmospheric).',
          distractorExplanations: {
            0: 'This focuses on total/energy, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on reached/sonic, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on become/turbulent, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'What the HGL physically represents in terms of pressure.'
        },
        {
          id: 'u6-L2-Q9',
          type: 'sort-buckets',
          question: 'Sort these: when can you use Bernoulli vs. when you need the full energy equation?',
          options: ['Frictionless nozzle flow', 'Long rough pipe', 'Venturi meter (ideal)', 'Pipe with a pump', 'Short smooth converging section', 'System with significant valve losses'],
          buckets: ['Bernoulli OK', 'Need energy equation'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Bernoulli works when friction, energy addition, and turbulence are negligible. Real pipes with pumps, valves, or significant length need the energy equation.',
          hint: 'Bernoulli = no friction, no pumps, no major losses.',
        },
        {
          id: 'u6-L2-Q11',
          type: 'multiple-choice',
          question: 'What is the continuity equation for steady flow?',
          options: [
            'rho1*V1 = rho2*V2, density times velocity is constant',
            'P1*A1 = P2*A2, pressure times area is constant',
            'rho1*A1*V1 = rho2*A2*V2; if incompressible: A1*V1 = A2*V2',
            'The continuity equation is a momentum conservation law'
          ],
          correctIndex: 2,
          explanation: 'Continuity (mass conservation) and Bernoulli (energy conservation) are complementary. You almost always use them together.',
          distractorExplanations: {
            0: 'This focuses on rho1*v1/rho2*v2,, which is not the correct mechanism or principle for this problem.',
            1: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
            3: 'This focuses on continuity/equation, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Mass conservation and energy conservation are two separate principles.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 2b: Bernoulli & Energy Equation (Part 2)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L2b',
      title: 'Bernoulli & Energy Equation (2/3)',
      description: 'Venturi meters, Torricelli\'s theorem, energy lines, and HGL.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u6-L2-T3',
          type: 'teaching',
          question: 'Energy line and HGL',
          explanation: 'The energy line (EL) shows total head: P/(rho*g) + v2/(2g) + z. The hydraulic grade line (HGL) is the EL minus velocity head. When the HGL drops below a pipe, pressure there is below atmospheric.',
          hint: 'Pitot tubes and venturi meters both use Bernoulli to convert pressure measurements into velocity.',
        },
        {
          id: 'u6-L2b-Q0a',
          type: 'multiple-choice',
          question: 'The EGL is always _____ the HGL by exactly the velocity head.',
          options: [
            'Below',
            'Above',
            'Equal to',
            'It varies'
          ],
          correctIndex: 1,
          explanation: 'EGL = HGL + V2/(2g). The velocity head is always positive, so the EGL is always above the HGL.',
          distractorExplanations: {
            0: 'The reasoning about below does not correctly apply to this engineering problem.',
            2: 'The reasoning about equal does not correctly apply to this engineering problem.',
            3: 'The reasoning about varies does not correctly apply to this engineering problem.',
          },
          hint: 'EGL includes velocity head; HGL does not.',
        },
        {
          id: 'u6-L2-Q5',
          type: 'multiple-choice',
          question: 'A siphon over a hill stops working. What is the fluid mechanics explanation?',
          options: [
            'The pipe diameter is too large on the hill section',
            'Water moves faster uphill, reducing flow',
            'The HGL drops below the pipe elevation at the hilltop',
            'Thermal expansion at the hilltop reduces flow'
          ],
          correctIndex: 2,
          explanation: 'As the pipe rises, elevation z increases. If the HGL drops below the pipe, local pressure goes below atmospheric, and the siphon breaks.',
          distractorExplanations: {
            0: 'This focuses on diameter/large, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on water/moves, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on thermal/expansion, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'What happens to the pressure as the pipe elevation increases?'
        },
        {
          id: 'u6-L2-Q6',
          type: 'fill-blank',
          question: 'The line representing total head in a pipe system is called the _____ Grade Line, and it sits above the Hydraulic Grade Line by the _____ head.',
          blanks: ['Energy', 'velocity'],
          wordBank: ['Energy', 'velocity', 'Pressure', 'friction', 'elevation'],
          explanation: 'The Energy Grade Line (EGL) represents total mechanical energy at each point: P/(rho*g) + V2/(2g) + z.',
          hint: 'This line is always above the HGL by exactly V2/(2g).'
        },
        {
          id: 'u6-L2-Q7',
          type: 'multiple-choice',
          question: 'Venturi meter: pressure drop is 40 kPa between inlet and throat. What is the theoretical flow rate of water?',
          options: [
            'Q = A2*sqrt(2*deltaP/rho), about 0.070 m3/s, no area ratio needed',
            'Apply continuity + Bernoulli: Q is about 0.027 m3/s',
            'Q = A1*sqrt(2*deltaP/rho), about 0.281 m3/s, use inlet area',
            'Cannot determine Q without pipe length and friction'
          ],
          correctIndex: 1,
          explanation: 'Combining Bernoulli and continuity gives V2 = sqrt(2*deltaP / (rho*(1 - (d2/d1)4))). Then Q = A2*V2.',
          distractorExplanations: {
            0: 'This focuses on a2*sqrt(2*deltap/rho),/0.070, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on a1*sqrt(2*deltap/rho),/0.281, which is not the correct mechanism or principle for this problem.',
            3: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
          },
          hint: 'Use both Bernoulli and continuity equations together.'
        },
        {
          id: 'u6-L2b-T2',
          type: 'teaching',
          question: 'Torricelli\'s theorem',
          explanation: 'For a tank draining through a small hole, Bernoulli simplifies to V = sqrt(2*g*h), where h is the height of fluid above the hole. This is called Torricelli\'s theorem, and it\'s like a free-falling object velocity.',
          hint: 'The exit velocity equals the speed an object would reach falling from height h.',
        },
        {
          id: 'u6-L2b-Q0b',
          type: 'true-false',
          question: 'Torricelli\'s theorem gives the exit velocity of fluid draining from a tank as V = sqrt(2*g*h).',
          correctAnswer: true,
          explanation: 'Yes. This comes directly from Bernoulli between the free surface and the exit hole, assuming the tank is large.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'It\'s a direct application of Bernoulli\'s equation.',
        },
        {
          id: 'u6-L2-Q8',
          type: 'multiple-choice',
          question: 'Why does a venturi meter have a higher discharge coefficient (Cd of 0.98) than an orifice plate (Cd of 0.61)?',
          options: [
            'Orifice plates have higher surface roughness than venturis',
            'The venturi meter is larger, giving more room for flow',
            'The venturi\'s gradual geometry minimizes flow separation',
            'Venturi meters use a different pressure tap technique'
          ],
          correctIndex: 2,
          explanation: 'The gradual convergence and divergence of a venturi keeps the flow attached, minimizing energy losses and flow separation.',
          distractorExplanations: {
            0: 'This focuses on orifice/plates, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on venturi/meter, which is not the correct mechanism or principle for this problem.',
            3: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
          },
          hint: 'Compare the flow path through each device.'
        },
        {
          id: 'u6-L2-Q10',
          type: 'multiple-choice',
          question: 'A large open tank drains through a small hole 3 m below the water surface. Exit velocity?',
          options: [
            'V = sqrt(2*g*h) = sqrt(2 * 9.81 * 3) = 7.67 m/s',
            'V = sqrt(g*h) = sqrt(9.81 * 3) = 5.42 m/s',
            'V = 2*g*h = 58.86 m/s',
            'V = sqrt(2*g*h/rho): velocity depends on fluid density'
          ],
          correctIndex: 0,
          explanation: 'Torricelli\'s theorem: V = sqrt(2*g*h). The exit velocity equals the speed of a freely falling object from height h.',
          distractorExplanations: {
            1: 'This focuses on sqrt(g*h)/sqrt(9.81, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on 2*g*h/58.86, which is not the correct mechanism or principle for this problem.',
            3: '"V = sqrt(2*g*h/rho)" is incorrect; the reasoning does not follow from the governing equations.',
          },
          hint: 'Apply Bernoulli between the free surface and the exit hole.'
        },
        {
          id: 'u6-L2-Q12',
          type: 'match-pairs',
          question: 'Match each flow measurement device to its operating principle.',
          options: ['Pitot tube', 'Venturi meter', 'Orifice plate', 'Rotameter'],
          matchTargets: ['Stagnation pressure at a point', 'Gradual area change measures flow', 'Sharp restriction with low Cd', 'Float rises with flow rate'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Each device uses a different physical principle to measure flow velocity or rate.',
          hint: 'Think about how each device interacts with the flow.',
        },
        {
          id: 'u6-L2-Q13',
          type: 'multiple-choice',
          question: 'In the Bernoulli equation, what does the term 0.5*rho*v2 represent?',
          options: [
            'Dynamic pressure (kinetic energy per unit volume)',
            'Static pressure (potential energy per unit volume)',
            'Hydrostatic pressure due to elevation',
            'Total pressure at that point'
          ],
          correctIndex: 0,
          explanation: 'The term 0.5*rho*v2 is the dynamic pressure, representing the kinetic energy per unit volume of the flowing fluid.',
          distractorExplanations: {
            1: 'This focuses on static/(potential, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on hydrostatic/elevation, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on total/point, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Each term in Bernoulli corresponds to a form of energy.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 2c: Bernoulli & Energy Equation (Part 3)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L2c',
      title: 'Bernoulli & Energy Equation (3/3)',
      description: 'Modified Bernoulli, real flow corrections, and the full energy equation.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u6-L2c-T1',
          type: 'teaching',
          question: 'The full energy equation',
          explanation: 'When friction and pumps matter, use the energy equation: P1/(rho*g) + V12/(2g) + z1 + h_pump = P2/(rho*g) + V22/(2g) + z2 + h_loss. This extends Bernoulli to real systems.',
          hint: 'h_pump adds energy. h_loss removes it. Bernoulli is the special case where both are zero.',
        },
        {
          id: 'u6-L2c-Q0a',
          type: 'true-false',
          question: 'The full energy equation adds pump head and friction loss terms to Bernoulli\'s equation.',
          correctAnswer: true,
          explanation: 'Correct. The energy equation is Bernoulli plus h_pump (energy added) minus h_loss (energy lost to friction).',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Real systems always have some friction.',
        },
        {
          id: 'u6-L2-Q14',
          type: 'multiple-choice',
          question: 'What is the coefficient of velocity (Cv) for an orifice, and how does it differ from the discharge coefficient (Cd)?',
          options: [
            'Cv applies to venturi meters while Cd applies to orifice plates',
            'Cv and Cd are always equal for well-designed orifices',
            'Cv corrects for velocity loss; Cd = Cv * Cc includes area contraction too',
            'Cv is always 1.0 for sharp-edged orifices'
          ],
          correctIndex: 2,
          explanation: 'Cv accounts for velocity being less than ideal, while Cc accounts for the vena contracta (area contraction). Cd = Cv * Cc combines both effects.',
          distractorExplanations: {
            0: 'This focuses on applies/venturi, which is not the correct mechanism or principle for this problem.',
            1: 'This "always" claim is too broad; equal well-designed the principle has important exceptions.',
            3: 'This "always" claim is too broad; sharp-edged orifices the principle has important exceptions.',
          },
          hint: 'Two separate corrections: one for velocity, one for area contraction.'
        },
        {
          id: 'u6-L2-Q15',
          type: 'multiple-choice',
          question: 'The energy equation adds what two terms compared to basic Bernoulli?',
          options: [
            'Turbulence intensity and roughness factors',
            'Temperature and viscosity terms',
            'Pump head (h_pump) and friction head loss (h_loss)',
            'Momentum flux and angular velocity terms'
          ],
          correctIndex: 2,
          explanation: 'The general energy equation adds h_pump (energy input from pumps) and h_loss (energy lost to friction, fittings, etc.).',
          distractorExplanations: {
            0: 'This focuses on turbulence/intensity, which is not the correct mechanism or principle for this problem.',
            1: 'Temperature is not the primary factor in this problem; the correct analysis uses a different variable.',
            3: 'This focuses on momentum/angular, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'What does a pump add? What does friction remove?'
        },
        {
          id: 'u6-L2c-T2',
          type: 'teaching',
          question: 'Discharge coefficients in practice',
          explanation: 'Real flow through orifices and nozzles never matches Bernoulli perfectly. The discharge coefficient Cd accounts for losses. A venturi has Cd of about 0.98, a nozzle about 0.96, and an orifice plate about 0.61.',
          hint: 'Higher Cd means less energy wasted. Venturis are most efficient but also most expensive.',
        },
        {
          id: 'u6-L2c-Q0b',
          type: 'multiple-choice',
          question: 'A discharge coefficient of 0.61 means the actual flow is about:',
          options: [
            '61% more than the theoretical flow',
            '61% of the theoretical (ideal) flow',
            '39% of the theoretical flow',
            '100% of theoretical with 61% efficiency'
          ],
          correctIndex: 1,
          explanation: 'Cd = Q_actual/Q_theoretical. A Cd of 0.61 means only 61% of the ideal Bernoulli flow actually passes through.',
          distractorExplanations: {
            0: 'This value results from an incorrect approach; % more than the theoretical flow.',
            2: 'This value results from an incorrect approach; % of the theoretical flow.',
            3: 'This value results from an incorrect approach; % of theoretical with 61% efficiency.',
          },
          hint: 'Cd is the ratio of actual to ideal flow.',
        },
        {
          id: 'u6-L2-Q16',
          type: 'fill-blank',
          question: 'A venturi meter uses a gradually converging-diverging passage to measure flow rate. Its high _____ coefficient (about 0.98) means very little energy is wasted.',
          blanks: ['discharge'],
          wordBank: ['discharge', 'velocity', 'friction', 'pressure', 'drag'],
          explanation: 'The gradual area changes in a venturi keep the flow attached, resulting in minimal losses and a high discharge coefficient.',
          hint: 'This coefficient tells you how close actual flow is to ideal.',
        },
        {
          id: 'u6-L2-Q17',
          type: 'multiple-choice',
          question: 'An engineer needs to account for a pump adding 25 m of head to a piping system. Which equation should they use?',
          options: [
            'Darcy-Weisbach with pump friction factor',
            'Bernoulli with P increased by 25 m equivalent',
            'Continuity equation with modified velocity',
            'Full energy equation with h_pump = 25 m added'
          ],
          correctIndex: 3,
          explanation: 'The full energy equation is the correct tool when pumps add energy to the system.',
          distractorExplanations: {
            0: 'Friction is not the governing mechanism here; the correct answer involves a different physical principle.',
            1: 'This focuses on bernoulli/increased, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on continuity/modified, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Bernoulli has no term for pump energy.',
        },
        {
          id: 'u6-L2-Q18',
          type: 'order-steps',
          question: 'Order the steps to solve a pipe flow problem with a pump.',
          steps: [
            'Draw the system and identify points 1 and 2',
            'Write the energy equation between points 1 and 2',
            'Calculate friction losses using Darcy-Weisbach',
            'Solve for the unknown (pump head, velocity, or pressure)',
            'Check if the answer makes physical sense'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'A systematic approach prevents mistakes: sketch first, write the equation, compute losses, solve, then sanity-check.',
          hint: 'Always start by drawing the system and picking your reference points.',
        },
        {
          id: 'u6-L2-Q19',
          type: 'multiple-choice',
          question: 'Why does the "equal transit time" theory incorrectly explain airplane lift?',
          options: [
            'Bernoulli doesn\'t apply to compressible air',
            'The equal transit time theory is correct',
            'Lift has nothing to do with airflow patterns',
            'Air over the top actually moves faster, not at equal transit time'
          ],
          correctIndex: 3,
          explanation: 'There\'s no physical reason air over the top must arrive at the trailing edge at the same time as air below. The real explanation involves circulation and pressure differences.',
          distractorExplanations: {
            0: 'This focuses on bernoulli/doesn\, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on theory/correct, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on nothing/airflow, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Ask yourself: why would the air parcels need to "meet up" at the trailing edge?'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 3a: Pipe Flow & Losses (Part 1)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L3',
      title: 'Pipe Flow & Losses (1/3)',
      description: 'Reynolds number, laminar vs turbulent flow, and the Darcy-Weisbach equation.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u6-L3-T1',
          type: 'teaching',
          question: 'Laminar vs turbulent flow',
          explanation: 'Flow in a pipe is either laminar (smooth, orderly layers) or turbulent (chaotic mixing). The Reynolds number Re = rho*v*D/mu decides which: Re < 2300 is laminar, Re > 4000 is turbulent, and in between is the transition zone.',
          hint: 'Turn on a faucet slowly for laminar, then open it fully for turbulent.',
        },
        {
          id: 'u6-L3-Q0a',
          type: 'multiple-choice',
          question: 'Flow in a pipe with Reynolds number of 1500 is:',
          options: [
            'Turbulent',
            'Laminar',
            'Supersonic',
            'Impossible to determine'
          ],
          correctIndex: 1,
          explanation: 'Re < 2300 means laminar flow. The fluid moves in smooth, orderly layers.',
          distractorExplanations: {
            0: 'Regarding turbulent: Re < 2300 means laminar flow.',
            2: 'Regarding supersonic: Re < 2300 means laminar flow.',
            3: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
          },
          hint: 'The transition from laminar to turbulent happens around Re = 2300.',
        },
        {
          id: 'u6-L3-Q1',
          type: 'multiple-choice',
          question: 'For fully developed laminar flow in a pipe, what is the friction factor?',
          options: [
            'f = 128*mu*L/(rho*g*D4*pi)',
            'f = 0.316/Re^0.25 (Blasius)',
            'f = 64/Re',
            'f is always 0.02 for smooth pipes'
          ],
          correctIndex: 2,
          explanation: 'In laminar flow, the friction factor is exactly f = 64/Re, derived analytically from the Hagen-Poiseuille solution.',
          distractorExplanations: {
            0: 'Regarding mulrhogdpi: In laminar flow, the friction factor is exactly f = 64/Re, derived analytically from the Hagen-Poiseuille solution.',
            1: 'Regarding blasius: In laminar flow, the friction factor is exactly f = 64/Re, derived analytically from the Hagen-Poiseuille solution.',
            3: 'This "always" claim is too broad; smooth pipes the principle has important exceptions.',
          },
          hint: 'Laminar friction factor has a simple analytical formula.'
        },
        {
          id: 'u6-L3-Q2',
          type: 'multiple-choice',
          question: 'A pipe carries water at 2 m/s, D = 50 mm, nu = 1e-6 m2/s. What is the Reynolds number?',
          options: [
            'Re = 1000 (laminar)',
            'Re = 100,000 (turbulent)',
            'Re = 10,000 (transitional)',
            'Re = 1,000,000 (highly turbulent)'
          ],
          correctIndex: 1,
          explanation: 'Re = V*D/nu = 2 * 0.05 / 1e-6 = 100,000. This is well above 4000, so fully turbulent.',
          distractorExplanations: {
            0: 'This focuses on (laminar), which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on 10,000/(transitional), which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on 1,000,000/(highly, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Re = V*D/nu. Don\'t forget to convert mm to m.'
        },
        {
          id: 'u6-L3-T2',
          type: 'teaching',
          question: 'Friction losses in pipes',
          explanation: 'The Darcy-Weisbach equation gives friction head loss: h_f = f*(L/D)*(v2/(2g)). The friction factor f depends on Re and the pipe\'s relative roughness (epsilon/D). You find f from the Moody chart or the Colebrook equation.',
          hint: 'Doubling pipe length doubles friction loss. Halving diameter increases it roughly 32x.',
        },
        {
          id: 'u6-L3-Q0b',
          type: 'true-false',
          question: 'Doubling the length of a pipe doubles the friction head loss.',
          correctAnswer: true,
          explanation: 'Yes. The Darcy-Weisbach equation has L in the numerator: h_f = f*(L/D)*(v2/(2g)). Double L means double h_f.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Look at how L appears in the Darcy-Weisbach equation.',
        },
        {
          id: 'u6-L3-Q3',
          type: 'multiple-choice',
          question: 'On the Moody chart, what happens to the friction factor as Reynolds number increases in fully rough turbulent flow?',
          options: [
            'Friction factor increases linearly with Re',
            'Friction factor continues to decrease with Re',
            'Friction factor becomes independent of Re',
            'The Moody chart doesn\'t cover this regime'
          ],
          correctIndex: 2,
          explanation: 'In the "fully rough" zone on the Moody chart, friction factor depends only on relative roughness (epsilon/D), not Re.',
          distractorExplanations: {
            0: 'This focuses on increases/linearly, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on continues/decrease, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on moody/chart, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Look at the rightmost part of the Moody chart where the lines flatten out.'
        },
        {
          id: 'u6-L3-Q4',
          type: 'multiple-choice',
          question: 'What happens to friction head loss if you halve the pipe diameter while keeping flow rate constant?',
          options: [
            'Head loss is cut in half',
            'Head loss doubles',
            'Head loss increases by 4 times',
            'Head loss increases by about 32 times'
          ],
          correctIndex: 3,
          explanation: 'Halving D quadruples velocity (Q = AV). Then h_f proportional to V2/D means (4V)2/(D/2) = 32 times more loss.',
          distractorExplanations: {
            0: 'Halving D quadruples velocity (Q = AV).',
            1: 'This focuses on doubles, which is not the correct mechanism or principle for this problem.',
            2: 'Regarding increases times: Halving D quadruples velocity (Q = AV).',
          },
          hint: 'Both velocity and diameter change. Track both effects.'
        },
        {
          id: 'u6-L3-Q5',
          type: 'sort-buckets',
          question: 'Sort these flow characteristics into laminar or turbulent.',
          options: ['Re = 500', 'Smooth orderly layers', 'Re = 50,000', 'Chaotic mixing', 'Parabolic velocity profile', 'Flat velocity profile'],
          buckets: ['Laminar', 'Turbulent'],
          correctBuckets: [0, 0, 1, 1, 0, 1],
          explanation: 'Laminar flow is orderly with a parabolic profile and low Re. Turbulent flow has chaotic mixing, a flatter profile, and high Re.',
          hint: 'Re < 2300 = laminar. Re > 4000 = turbulent.',
        },
        {
          id: 'u6-L3-Q6',
          type: 'fill-blank',
          question: 'The Darcy-Weisbach equation for major (friction) head loss is h_f = f*(L/D)*(v2/(2g)), where f is called the _____ factor.',
          blanks: ['friction'],
          wordBank: ['friction', 'safety', 'correction', 'drag', 'loss'],
          explanation: 'The friction factor f (also called the Darcy friction factor) depends on Reynolds number and relative roughness.',
          hint: 'This dimensionless factor comes from the Moody chart.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 3b: Pipe Flow & Losses (Part 2)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L3b',
      title: 'Pipe Flow & Losses (2/3)',
      description: 'Minor losses, fittings, equivalent length, and pipe networks.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u6-L3-T3',
          type: 'teaching',
          question: 'Minor losses and pipe networks',
          explanation: 'Fittings, valves, bends, and expansions cause "minor" losses: h_m = K*(v2/(2g)). Despite the name, these can dominate in short systems with many fittings. In parallel pipes, head loss across each branch must be equal.',
          hint: 'A valve that\'s half-closed can cause more loss than 50 meters of straight pipe.',
        },
        {
          id: 'u6-L3b-Q0a',
          type: 'true-false',
          question: 'Minor losses from fittings and valves can sometimes exceed the major (friction) losses in a piping system.',
          correctAnswer: true,
          explanation: 'In short systems with many fittings, the "minor" losses often dominate. The name is misleading.',
          distractorExplanations: {
            1: 'In short systems with many fittings, the .',
          },
          hint: 'Think about a short pipe with 10 elbows and 3 valves.',
        },
        {
          id: 'u6-L3-Q7',
          type: 'multiple-choice',
          question: 'An abrupt expansion from a small pipe to a large pipe causes a head loss. How is it calculated?',
          options: [
            'h_loss = f*(L_eq/D)*(V2/(2g)) using equivalent length',
            'h_loss = K * V2/(2g) where K = 0.5 for all expansions',
            'Expansion losses are zero because pressure recovers fully',
            'h_loss = (V1 - V2)2 / (2g), the Borda-Carnot equation'
          ],
          correctIndex: 3,
          explanation: 'A sudden expansion creates turbulent eddies. The Borda-Carnot equation h_loss = (V1 - V2)2/(2g) quantifies this energy dissipation.',
          distractorExplanations: {
            0: 'This focuses on f*(l_eq/d)*(v2/(2g))/using, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on v2/(2g)/where, which is not the correct mechanism or principle for this problem.',
            2: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
          },
          hint: 'The sudden expansion loss depends on the velocity change.'
        },
        {
          id: 'u6-L3-Q8',
          type: 'multiple-choice',
          question: 'In a parallel pipe network, what is always true?',
          options: [
            'Velocity in each branch is equal',
            'Flow rate through each branch is equal',
            'Head loss across each parallel branch is equal',
            'Friction factor in each branch is equal'
          ],
          correctIndex: 2,
          explanation: 'In parallel pipes, each branch connects the same two nodes, so the head loss must be the same. Flow splits according to each branch\'s resistance.',
          distractorExplanations: {
            0: 'This focuses on velocity, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on through, which is not the correct mechanism or principle for this problem.',
            3: 'Friction is not the governing mechanism here; the correct answer involves a different physical principle.',
          },
          hint: 'Think of it like parallel resistors in an electrical circuit.'
        },
        {
          id: 'u6-L3-Q9',
          type: 'true-false',
          question: 'The equivalent length method converts minor losses into an equivalent length of straight pipe for simpler calculation.',
          correctAnswer: true,
          explanation: 'The equivalent length L_eq = K*D/f converts a minor loss coefficient K into meters of straight pipe that would cause the same loss.',
          distractorExplanations: {
            1: 'The equivalent length L_eq = K*D/f converts a minor loss coefficient K into meters of straight pipe that would cause the same loss.',
          },
          hint: 'This lets you add everything together as one big pipe length.'
        },
        {
          id: 'u6-L3b-T2',
          type: 'teaching',
          question: 'Pipe network basics',
          explanation: 'In series pipes, total head loss is the sum of all individual losses and flow rate is the same everywhere. In parallel pipes, head loss is equal across branches, and flow rates add up. These rules are like series and parallel resistors.',
          hint: 'Try this now: look at the plumbing diagram in your building and identify series vs parallel runs.',
        },
        {
          id: 'u6-L3b-Q0b',
          type: 'multiple-choice',
          question: 'In pipes connected in series, what stays constant?',
          options: [
            'Head loss',
            'Flow rate',
            'Velocity',
            'Pressure'
          ],
          correctIndex: 1,
          explanation: 'In series pipes, the same fluid flows through each section, so Q is constant. Head losses add up, and velocity changes with diameter.',
          distractorExplanations: {
            0: 'In series pipes, the same fluid flows through each section, so Q is constant.',
            2: 'Regarding velocity: In series pipes, the same fluid flows through each section, so Q is constant.',
            3: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
          },
          hint: 'What comes in must go out at each junction.',
        },
        {
          id: 'u6-L3-Q10',
          type: 'multiple-choice',
          question: 'The Colebrook equation is implicit in f. What does this mean practically?',
          options: [
            'You need experimental data for every specific pipe',
            'f can be calculated directly in one step',
            'The equation is only valid for laminar flow',
            'You must iterate or use the Moody chart to find f'
          ],
          correctIndex: 3,
          explanation: 'The Colebrook equation has f on both sides, so you can\'t solve it directly. Engineers use iteration, the Moody chart, or explicit approximations like Swamee-Jain.',
          distractorExplanations: {
            0: 'This focuses on experimental/every, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on calculated/directly, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than equation valid suggests.',
          },
          hint: 'Implicit means the unknown appears on both sides of the equation.'
        },
        {
          id: 'u6-L3-Q11',
          type: 'match-pairs',
          question: 'Match each pipe component to its typical loss coefficient K.',
          options: ['90-degree elbow', 'Fully open gate valve', 'Sudden expansion', 'Pipe entrance (sharp)'],
          matchTargets: ['K = 0.3 to 0.9', 'K = 0.03 to 0.2', 'K = (1 - A1/A2)2', 'K = 0.5'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Each fitting type has a characteristic K value. Gate valves have very low K when fully open, while sharp entrances waste about half a velocity head.',
          hint: 'Valves are designed for minimal loss when open. Elbows and entrances lose more.',
        },
        {
          id: 'u6-L3-Q12',
          type: 'multiple-choice',
          question: 'What is the Hazen-Williams equation, and when is it used instead of Darcy-Weisbach?',
          options: [
            'An equation for gas pipeline design only',
            'A theoretical equation for all fluids that is more accurate than Darcy',
            'An empirical formula for water pipe design; simpler but limited to water',
            'A replacement for the Moody chart in turbulent flow'
          ],
          correctIndex: 2,
          explanation: 'Hazen-Williams is simpler to use (no Moody chart needed) but only works for water near room temperature in turbulent flow. Darcy-Weisbach works for any fluid.',
          distractorExplanations: {
            0: 'This focuses on equation/pipeline, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on theoretical/equation, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on replacement/moody, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Civil engineers love it for water mains. Mechanical engineers prefer Darcy-Weisbach.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 3c: Pipe Flow & Losses (Part 3)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L3c',
      title: 'Pipe Flow & Losses (3/3)',
      description: 'Advanced pipe problems, velocity profiles, entrance length, and water hammer.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u6-L3c-T1',
          type: 'teaching',
          question: 'Velocity profiles in pipes',
          explanation: 'In laminar flow, the velocity profile is parabolic with V_max = 2*V_avg at the centerline. In turbulent flow, the profile is much flatter, with V_max about 1.2*V_avg. The difference matters when converting point measurements to average flow.',
          hint: 'A pitot tube at the center reads V_max, not V_avg.',
        },
        {
          id: 'u6-L3c-Q0a',
          type: 'multiple-choice',
          question: 'In fully developed laminar pipe flow, the maximum velocity at the center is:',
          options: [
            '1.2 times the average velocity',
            'Equal to the average velocity',
            'Half the average velocity',
            'Twice the average velocity'
          ],
          correctIndex: 3,
          explanation: 'The parabolic profile in laminar flow has V_max = 2*V_avg. In turbulent flow, it\'s closer to 1.2*V_avg.',
          distractorExplanations: {
            0: 'This focuses on times, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on equal, which is not the correct mechanism or principle for this problem.',
            2: 'Regarding average velocity: The parabolic profile in laminar flow has V_max = 2*V_avg.',
          },
          hint: 'Laminar flow has a parabolic velocity profile.',
        },
        {
          id: 'u6-L3-Q13',
          type: 'multiple-choice',
          question: 'What is the entrance length for fully developed flow, and why does it matter?',
          options: [
            'The distance for the boundary layer to reach the center; flow isn\'t "standard" before this',
            'The length of pipe needed for the flow to reach maximum velocity',
            'The distance from the pump to the first fitting',
            'Entrance length is only relevant for laminar flow'
          ],
          correctIndex: 0,
          explanation: 'Near a pipe entrance, the velocity profile is still developing. The entrance length is about 0.05*Re*D for laminar and 10-60D for turbulent.',
          distractorExplanations: {
            1: 'This focuses on length/needed, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on first/fitting, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than entrance length suggests.',
          },
          hint: 'The boundary layer grows from the wall until it fills the entire pipe.'
        },
        {
          id: 'u6-L3-Q14',
          type: 'true-false',
          question: 'Water hammer occurs when a valve is closed suddenly, causing a pressure wave to travel through the pipe.',
          correctAnswer: true,
          explanation: 'Sudden valve closure converts kinetic energy of the moving fluid into a pressure pulse that travels at the speed of sound in the fluid.',
          distractorExplanations: {
            1: 'Sudden valve closure converts kinetic energy of the moving fluid into a pressure pulse that travels at the speed of sound in the fluid.',
          },
          hint: 'The loud "bang" when you shut a tap quickly is water hammer.'
        },
        {
          id: 'u6-L3c-T2',
          type: 'teaching',
          question: 'Pipe sizing in practice',
          explanation: 'Engineers pick pipe diameter by balancing capital cost (bigger pipe = more money) against operating cost (bigger pipe = less friction = less pump energy). The economic pipe diameter is where the total annual cost is minimized.',
          hint: 'Try this now: look up the recommended velocity for water in commercial pipes (typically 1 to 3 m/s).',
        },
        {
          id: 'u6-L3c-Q0b',
          type: 'true-false',
          question: 'Using a larger pipe diameter always saves money in the long run because it reduces pumping costs.',
          correctAnswer: false,
          explanation: 'Not always. Larger pipes cost more to buy and install. The economic optimum balances pipe cost vs. pumping cost.',
          distractorExplanations: {
            0: 'The statement is false; the underlying assumption contains an error.',
          },
          hint: 'Think about both the purchase cost and the operating cost.',
        },
        {
          id: 'u6-L3-Q15',
          type: 'multiple-choice',
          question: 'What is the difference between absolute and relative pipe roughness?',
          options: [
            'Absolute roughness (epsilon) is in mm; relative roughness is epsilon/D',
            'They are identical but measured in different unit systems',
            'Absolute roughness applies to new pipes; relative to corroded',
            'Relative roughness is always larger than absolute roughness'
          ],
          correctIndex: 0,
          explanation: 'Absolute roughness epsilon is a physical height of surface bumps. Relative roughness epsilon/D scales it to the pipe size, which is what the Moody chart uses.',
          distractorExplanations: {
            1: 'This focuses on identical/measured, which is not the correct mechanism or principle for this problem.',
            2: '"Absolute roughness applies to new pipes" is incorrect; the reasoning does not follow from the governing equations.',
            3: 'This "always" claim is too broad; relative roughness the principle has important exceptions.',
          },
          hint: 'The same roughness matters more in a small pipe than a big one.'
        },
        {
          id: 'u6-L3-Q16',
          type: 'fill-blank',
          question: 'The dimensionless number that determines whether pipe flow is laminar or turbulent is the _____ number.',
          blanks: ['Reynolds'],
          wordBank: ['Reynolds', 'Froude', 'Mach', 'Euler', 'Weber'],
          explanation: 'The Reynolds number Re = rho*V*D/mu compares inertia forces to viscous forces and determines the flow regime.',
          hint: 'Named after Osborne Reynolds, who first demonstrated the transition in pipe flow.'
        },
        {
          id: 'u6-L3-Q17',
          type: 'order-steps',
          question: 'Order the steps to find friction factor for turbulent pipe flow.',
          steps: [
            'Calculate Reynolds number Re = V*D/nu',
            'Find relative roughness epsilon/D',
            'Locate the intersection on the Moody chart',
            'Read the friction factor f'
          ],
          correctOrder: [0, 1, 2, 3],
          explanation: 'The Moody chart requires both Re (x-axis) and epsilon/D (curve family) to determine f.',
          hint: 'You need two parameters to find f on the Moody chart.',
        },
        {
          id: 'u6-L3-Q18',
          type: 'multiple-choice',
          question: 'For a galvanized steel pipe (epsilon = 0.15 mm, D = 100 mm), what is the relative roughness?',
          options: [
            '0.015',
            '0.0015',
            '0.15',
            '15'
          ],
          correctIndex: 1,
          explanation: 'Relative roughness = epsilon/D = 0.15/100 = 0.0015. This is the value you use on the Moody chart.',
          distractorExplanations: {
            0: '0.015 is an order of magnitude too large, likely from a unit conversion error.',
            2: '0.15 significantly exceeds the correct answer due to a fundamental formula or calculation error.',
            3: '15 significantly exceeds the correct answer due to a fundamental formula or calculation error.',
          },
          hint: 'Make sure both values use the same units before dividing.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 4a: Pumps & Turbomachinery (Part 1)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L4',
      title: 'Pumps & Turbomachinery (1/3)',
      description: 'Centrifugal vs positive displacement pumps, pump head, and cavitation basics.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u6-L4-T1',
          type: 'teaching',
          question: 'Two main types of pumps',
          explanation: 'Centrifugal pumps use a spinning impeller to convert velocity into pressure. They\'re great for high flow at moderate pressure. Positive displacement (PD) pumps trap and push fixed volumes, making them better for high-viscosity fluids or high-pressure, low-flow jobs.',
          hint: 'Most water supply systems use centrifugal pumps. Hydraulic systems often use PD pumps.',
        },
        {
          id: 'u6-L4-Q0a',
          type: 'multiple-choice',
          question: 'A water supply system that needs high flow at moderate pressure would typically use a:',
          options: [
            'Peristaltic pump',
            'Positive displacement pump',
            'Jet pump',
            'Centrifugal pump'
          ],
          correctIndex: 3,
          explanation: 'Centrifugal pumps excel at high flow, moderate pressure. They\'re the most common type in water supply.',
          distractorExplanations: {
            0: 'This focuses on peristaltic, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on positive/displacement, which is not the correct mechanism or principle for this problem.',
            2: 'Centrifugal pumps excel at high flow, moderate pressure.',
          },
          hint: 'Think about what type handles high flow rates well.',
        },
        {
          id: 'u6-L4-Q1',
          type: 'multiple-choice',
          question: 'Why would you choose a positive displacement pump over a centrifugal pump?',
          options: [
            'PD pumps are always more efficient than centrifugal',
            'For high flow rates at low pressure',
            'For high-viscosity fluids or when precise flow control is needed',
            'Centrifugal pumps cannot handle liquids, only gases'
          ],
          correctIndex: 2,
          explanation: 'PD pumps maintain flow rate regardless of viscosity and provide precise, repeatable volumes. Centrifugal pump performance degrades badly with viscous fluids.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; pumps efficient the principle has important exceptions.',
            1: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
            3: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
          },
          hint: 'Think about pumping honey vs. water.'
        },
        {
          id: 'u6-L4-Q2',
          type: 'multiple-choice',
          question: 'What is pump "head" and why is it measured in meters instead of pascals?',
          options: [
            'Pump head and pressure are identical concepts',
            'Head is the maximum height a pump can physically reach',
            'Head in meters is only used in Europe; US engineers use PSI',
            'Head is energy per unit weight of fluid, and meters work for any fluid density'
          ],
          correctIndex: 3,
          explanation: 'Head (H = P/(rho*g)) is energy per unit weight. Using meters makes pump curves valid for any fluid density.',
          distractorExplanations: {
            0: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
            1: 'This focuses on maximum/height, which is not the correct mechanism or principle for this problem.',
            2: '"Head in meters is only used in Europe" is incorrect; the reasoning does not follow from the governing equations.',
          },
          hint: 'A pump adding 10 m of head adds different pressure depending on the fluid density.'
        },
        {
          id: 'u6-L4-T2',
          type: 'teaching',
          question: 'Pump head, NPSH, and cavitation',
          explanation: 'NPSH (net positive suction head) is the margin above the fluid\'s vapor pressure at the pump inlet. If NPSH is too low, bubbles form and collapse violently, which is called cavitation. This damages impellers and reduces performance.',
          hint: 'Hot liquids have higher vapor pressure, so they cavitate more easily.',
        },
        {
          id: 'u6-L4-Q0b',
          type: 'true-false',
          question: 'Pumping hot water requires more NPSH margin than pumping cold water.',
          correctAnswer: true,
          explanation: 'Hot water has higher vapor pressure, so the available NPSH is reduced. You need more margin to prevent cavitation.',
          distractorExplanations: {
            1: 'Hot water has higher vapor pressure, so the available NPSH is reduced.',
          },
          hint: 'Temperature raises vapor pressure.',
        },
        {
          id: 'u6-L4-Q3',
          type: 'true-false',
          question: 'Cavitation in a pump always occurs at the pump discharge (high-pressure side).',
          correctAnswer: false,
          explanation: 'Cavitation occurs at the pump inlet (suction side) where pressure is lowest. That\'s where pressure can drop below vapor pressure.',
          distractorExplanations: {
            0: 'Cavitation occurs at the pump inlet (suction side) where pressure is lowest.',
          },
          hint: 'Where is the pressure lowest in a pumping system?'
        },
        {
          id: 'u6-L4-Q4',
          type: 'multiple-choice',
          question: 'NPSH_available must be _____ NPSH_required to prevent cavitation.',
          options: [
            'Greater than',
            'Less than',
            'Equal to',
            'Unrelated to'
          ],
          correctIndex: 0,
          explanation: 'NPSH_available (determined by your system) must exceed NPSH_required (from the pump manufacturer) to prevent cavitation.',
          distractorExplanations: {
            1: 'NPSH_available (determined by your system) must exceed NPSH_required (from the pump manufacturer) to prevent cavitation.',
            2: 'Regarding equal: NPSH_available (determined by your system) must exceed NPSH_required (from the pump manufacturer) to prevent cavitation.',
            3: 'This focuses on unrelated, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about margin: you need more available than required.'
        },
        {
          id: 'u6-L4-Q5',
          type: 'sort-buckets',
          question: 'Sort these into centrifugal pump applications or positive displacement pump applications.',
          options: ['Municipal water supply', 'Hydraulic press (high pressure)', 'Cooling tower circulation', 'Metering chemical additives', 'HVAC chilled water', 'Pumping molasses'],
          buckets: ['Centrifugal', 'Positive displacement'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Centrifugal pumps handle high-flow, low-viscosity applications. PD pumps handle high-viscosity fluids, precise metering, and high-pressure needs.',
          hint: 'Centrifugal = high flow. PD = high viscosity, precision, or high pressure.',
        },
        {
          id: 'u6-L4-Q6',
          type: 'fill-blank',
          question: 'The net positive suction head available (NPSH_a) must exceed the pump\'s _____ to prevent cavitation.',
          blanks: ['NPSH_required'],
          wordBank: ['NPSH_required', 'total_head', 'discharge_pressure', 'power_rating', 'efficiency'],
          explanation: 'NPSH_required is specified by the pump manufacturer. The system must provide more than this to avoid vapor bubble formation.',
          hint: 'The pump datasheet tells you this minimum suction requirement.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 4b: Pumps & Turbomachinery (Part 2)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L4b',
      title: 'Pumps & Turbomachinery (2/3)',
      description: 'Pump curves, system curves, operating points, and the affinity laws.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u6-L4-T3',
          type: 'teaching',
          question: 'Pump curves and affinity laws',
          explanation: 'A pump curve plots head vs. flow rate. The operating point is where the pump curve crosses the system curve. The affinity laws let you scale performance with speed: flow is proportional to speed, head to speed squared, and power to speed cubed.',
          hint: 'Doubling pump speed quadruples the head but increases power 8x.',
        },
        {
          id: 'u6-L4b-Q0a',
          type: 'multiple-choice',
          question: 'The operating point of a pump is where:',
          options: [
            'The pump speed equals the motor speed',
            'The pump efficiency is at its maximum',
            'The pump curve crosses the system curve',
            'Flow rate equals zero (shut-off head)'
          ],
          correctIndex: 2,
          explanation: 'The operating point is the intersection of the pump curve (what the pump can deliver) and the system curve (what the system demands).',
          distractorExplanations: {
            0: 'This focuses on speed/equals, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on efficiency/maximum, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on equals/(shut-off, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'One curve shows pump capability, the other shows system demand.',
        },
        {
          id: 'u6-L4-Q7',
          type: 'multiple-choice',
          question: 'Using the affinity laws: if pump speed doubles, what happens to flow rate, head, and power?',
          options: [
            'Flow quadruples, head doubles, power goes up 8x',
            'All three double proportionally',
            'Flow doubles, head quadruples, power goes up 8x',
            'Only flow rate changes; head and power stay the same'
          ],
          correctIndex: 2,
          explanation: 'Affinity laws: Q proportional to N, H proportional to N2, P proportional to N3. Double speed means 2x flow, 4x head, 8x power.',
          distractorExplanations: {
            0: 'Regarding quadruples doubles: Affinity laws: Q proportional to N, H proportional to N2, P proportional to N3.',
            1: 'This focuses on three/double, which is not the correct mechanism or principle for this problem.',
            3: '"Only flow rate changes" is incorrect; the reasoning does not follow from the governing equations.',
          },
          hint: 'Q ~ N, H ~ N2, P ~ N3.'
        },
        {
          id: 'u6-L4-Q8',
          type: 'multiple-choice',
          question: 'Two identical pumps in parallel vs. in series. What changes?',
          options: [
            'There is no difference between parallel and series pumps',
            'Parallel: doubles head. Series: doubles flow',
            'Both configurations double the total power output equally',
            'Parallel: doubles flow at same head. Series: doubles head at same flow'
          ],
          correctIndex: 3,
          explanation: 'Parallel pumps share the flow demand (double Q). Series pumps stack their heads (double H). The actual operating point shifts depend on the system curve.',
          distractorExplanations: {
            0: 'This focuses on there/difference, which is not the correct mechanism or principle for this problem.',
            1: 'The scaling factor cited in the reasoning is incorrect for this problem\'s conditions.',
            2: 'This focuses on configurations/double, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Parallel = side by side sharing flow. Series = one after another stacking pressure.'
        },
        {
          id: 'u6-L4-Q9',
          type: 'true-false',
          question: 'Specific speed is a dimensionless number that helps engineers select the right type of pump for an application.',
          correctAnswer: true,
          explanation: 'Specific speed Ns = N*sqrt(Q)/H^(3/4) characterizes pump geometry. Low Ns = radial/centrifugal, medium = mixed flow, high = axial.',
          distractorExplanations: {
            1: 'Specific speed Ns = N*sqrt(Q)/H^(3/4) characterizes pump geometry.',
          },
          hint: 'Different pump types are optimized for different specific speed ranges.'
        },
        {
          id: 'u6-L4b-T2',
          type: 'teaching',
          question: 'System curves and throttling',
          explanation: 'The system curve shows head required vs. flow rate: H_system = H_static + K*Q2, where H_static is the elevation change and K*Q2 is friction. Throttling a valve steepens the system curve, moving the operating point to lower flow.',
          hint: 'Throttling wastes energy. Variable-speed drives are more efficient for flow control.',
        },
        {
          id: 'u6-L4b-Q0b',
          type: 'multiple-choice',
          question: 'Closing a valve partway in a piping system will:',
          options: [
            'Increase flow rate by adding energy',
            'Reduce flow rate by steepening the system curve',
            'Have no effect on pump operation',
            'Reduce pump head'
          ],
          correctIndex: 1,
          explanation: 'Throttling adds resistance, making the system curve steeper. The operating point shifts left on the pump curve (lower flow).',
          distractorExplanations: {
            0: 'This focuses on increase/adding, which is not the correct mechanism or principle for this problem.',
            2: 'This incorrectly denies an effect that is relevant to effect operation and significant in this context.',
            3: 'Regarding reduce: Throttling adds resistance, making the system curve steeper.',
          },
          hint: 'More resistance means the system demands more head at any given flow.',
        },
        {
          id: 'u6-L4-Q10',
          type: 'multiple-choice',
          question: 'Why is a variable-speed drive (VFD) more efficient than throttle-valve flow control?',
          options: [
            'VFDs only save energy at high flow rates',
            'A VFD eliminates all friction losses in the system',
            'Throttle valves increase pump efficiency at low flow',
            'A VFD reduces pump speed, cutting power cubically (affinity laws)'
          ],
          correctIndex: 3,
          explanation: 'Power is proportional to speed cubed. Reducing speed by 20% cuts power by about 50%. Throttling wastes energy as heat across the valve.',
          distractorExplanations: {
            0: 'This is too restrictive; the principle applies more broadly than energy rates suggests.',
            1: 'Friction is not the governing mechanism here; the correct answer involves a different physical principle.',
            2: 'This focuses on throttle/valves, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The affinity laws say power goes as speed cubed.'
        },
        {
          id: 'u6-L4-Q11',
          type: 'match-pairs',
          question: 'Match each pump term to its definition.',
          options: ['Shut-off head', 'Best efficiency point (BEP)', 'System curve', 'Specific speed'],
          matchTargets: ['Head at zero flow', 'Where pump runs most efficiently', 'Head required vs flow rate', 'Classifies pump geometry type'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'These four concepts are essential for pump selection and system design.',
          hint: 'Each term describes a different aspect of pump performance.',
        },
        {
          id: 'u6-L4-Q12',
          type: 'multiple-choice',
          question: 'A pump operates far to the right of its BEP on the pump curve. What problems can occur?',
          options: [
            'Cavitation, overheating, and premature bearing failure',
            'The pump becomes more efficient at higher flow rates',
            'The pump automatically adjusts to match the system',
            'Operating right of BEP only affects noise levels'
          ],
          correctIndex: 0,
          explanation: 'Operating far from BEP causes internal recirculation, cavitation risk, increased vibration, and higher bearing loads. Always size pumps to operate near BEP.',
          distractorExplanations: {
            1: 'This focuses on becomes/efficient, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on automatically/adjusts, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than operating right suggests.',
          },
          hint: 'BEP is called "best efficiency" for a reason.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 4c: Pumps & Turbomachinery (Part 3)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L4c',
      title: 'Pumps & Turbomachinery (3/3)',
      description: 'Pump selection, turbines, hydraulic power, and real-world pump problems.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u6-L4c-T1',
          type: 'teaching',
          question: 'Pump efficiency and hydraulic power',
          explanation: 'Hydraulic power is P_hydraulic = rho*g*Q*H. Pump efficiency eta = P_hydraulic/P_shaft. Overall efficiency includes motor losses too. A typical centrifugal pump has 60 to 85% efficiency at BEP.',
          hint: 'Power input always exceeds hydraulic power output because no pump is 100% efficient.',
        },
        {
          id: 'u6-L4c-Q0a',
          type: 'true-false',
          question: 'Hydraulic power output equals rho*g*Q*H.',
          correctAnswer: true,
          explanation: 'Yes. P_hydraulic = rho*g*Q*H gives the useful power delivered to the fluid in watts.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'This comes directly from the energy equation.',
        },
        {
          id: 'u6-L4-Q13',
          type: 'multiple-choice',
          question: 'A pump delivers 0.05 m3/s at 20 m head with 75% efficiency. What shaft power is needed?',
          options: [
            'P = rho*g*Q*H*eta = 7.4 kW',
            'P = rho*g*Q*H = 9.81 kW',
            'P = Q*H = 1.0 kW',
            'P = rho*g*Q*H/eta = 1000*9.81*0.05*20/0.75 = 13.1 kW'
          ],
          correctIndex: 3,
          explanation: 'Shaft power = hydraulic power / efficiency. P = rho*g*Q*H/eta = 1000*9.81*0.05*20/0.75 = 13.1 kW.',
          distractorExplanations: {
            0: 'This focuses on rho*g*q*h*eta, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on rho*g*q*h, which is not the correct mechanism or principle for this problem.',
            2: 'Shaft power = hydraulic power / efficiency.',
          },
          hint: 'Efficiency means you need MORE shaft power than hydraulic power.'
        },
        {
          id: 'u6-L4-Q14',
          type: 'true-false',
          question: 'A turbine converts fluid energy into mechanical shaft work, which is the opposite of a pump.',
          correctAnswer: true,
          explanation: 'Pumps add energy to fluid; turbines extract energy from fluid. They\'re reverse operations.',
          distractorExplanations: {
            1: 'Pumps add energy to fluid; turbines extract energy from fluid.',
          },
          hint: 'Think about hydroelectric dams: water energy turns turbines.'
        },
        {
          id: 'u6-L4-Q15',
          type: 'multiple-choice',
          question: 'What causes pump surging in a centrifugal pump?',
          options: [
            'Running the pump above its maximum rated speed',
            'Operating on the unstable left side of the pump curve',
            'Using a pipe diameter larger than the pump discharge',
            'Pump surging only occurs in positive displacement pumps'
          ],
          correctIndex: 1,
          explanation: 'If the pump curve has a dip on the left side, operating there creates an unstable condition where flow oscillates between two points.',
          distractorExplanations: {
            0: 'This focuses on running/above, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on using/diameter, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than surging occurs suggests.',
          },
          hint: 'Look at the shape of the pump curve near shut-off.'
        },
        {
          id: 'u6-L4c-T2',
          type: 'teaching',
          question: 'Priming and common pump problems',
          explanation: 'Centrifugal pumps can\'t pull a vacuum well, so they must be "primed" (filled with liquid before starting). Common field problems include air locks, cavitation noise, running dry, and operating far from BEP.',
          hint: 'Try this now: check if the pumps in your building have foot valves or check valves to maintain prime.',
        },
        {
          id: 'u6-L4c-Q0b',
          type: 'multiple-choice',
          question: 'A centrifugal pump must be "primed" before starting because:',
          options: [
            'The impeller will spin backwards without liquid',
            'The motor needs liquid cooling to operate',
            'It can\'t create enough vacuum to lift liquid on its own',
            'Priming is only needed for PD pumps'
          ],
          correctIndex: 2,
          explanation: 'Centrifugal pumps spin fluid that\'s already there. They can\'t pull a vacuum strong enough to lift liquid into an empty casing.',
          distractorExplanations: {
            0: 'Regarding impeller backwards: Centrifugal pumps spin fluid that\.',
            1: 'Regarding motor needs: Centrifugal pumps spin fluid that\.',
            3: 'This is too restrictive; the principle applies more broadly than priming needed suggests.',
          },
          hint: 'Air is too light for the impeller to push effectively.',
        },
        {
          id: 'u6-L4-Q16',
          type: 'multiple-choice',
          question: 'How do you increase NPSH_available in a system?',
          options: [
            'Increase pump speed to pull harder on the suction side',
            'Raise the reservoir level or shorten the suction pipe',
            'Add a valve on the suction line for flow regulation',
            'Use a larger impeller to increase suction'
          ],
          correctIndex: 1,
          explanation: 'NPSH_a = P_atm/(rho*g) + z_s - h_f_suction - P_vapor/(rho*g). Raising the source or reducing suction losses increases NPSH_a.',
          distractorExplanations: {
            0: 'This focuses on increase/speed, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on valve/regulation, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on larger/impeller, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Look at the NPSH equation: what variables can you change?'
        },
        {
          id: 'u6-L4-Q17',
          type: 'order-steps',
          question: 'Order the steps for selecting a centrifugal pump.',
          steps: [
            'Determine required flow rate and total head',
            'Calculate system curve (static head + friction)',
            'Select a pump whose curve passes through the operating point near BEP',
            'Verify NPSH_available exceeds NPSH_required',
            'Check motor power and efficiency'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Pump selection is systematic: know your requirements, build the system curve, pick a matching pump, then verify suction and power.',
          hint: 'You must know what the system needs before you can pick the right pump.',
        },
        {
          id: 'u6-L4-Q18',
          type: 'multiple-choice',
          question: 'In a Pelton wheel turbine, what form of energy drives the runner?',
          options: [
            'Kinetic energy of high-velocity water jets',
            'Pressure energy acting on submerged blades',
            'Both kinetic and pressure energy equally',
            'Gravitational potential energy directly'
          ],
          correctIndex: 0,
          explanation: 'Pelton wheels are impulse turbines. All the pressure energy is converted to kinetic energy in the nozzle before hitting the buckets.',
          distractorExplanations: {
            1: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
            2: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
            3: 'This focuses on gravitational/potential, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Impulse turbines use jets; reaction turbines use pressure on submerged blades.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 5a: Dimensional Analysis (Part 1)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L5',
      title: 'Dimensional Analysis (1/3)',
      description: 'Buckingham Pi theorem, dimensional homogeneity, and forming dimensionless groups.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u6-L5-T1',
          type: 'teaching',
          question: 'What is dimensional analysis?',
          explanation: 'Dimensional analysis reduces the number of variables in a problem by grouping them into dimensionless ratios. The Buckingham Pi theorem says if you have n variables and k fundamental dimensions (M, L, T), you can form n-k independent dimensionless groups.',
          hint: 'Instead of testing 7 separate variables, you might only need 4 dimensionless groups.',
        },
        {
          id: 'u6-L5-Q0a',
          type: 'multiple-choice',
          question: 'Dimensional analysis helps by:',
          options: [
            'Eliminating the need for experiments entirely',
            'Reducing the number of variables by forming dimensionless groups',
            'Converting all units to SI automatically',
            'Making all equations linear'
          ],
          correctIndex: 1,
          explanation: 'By grouping n variables into n-k dimensionless groups, you drastically reduce the experimental and analytical effort.',
          distractorExplanations: {
            0: 'This focuses on eliminating/experiments, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on converting/units, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on making/equations, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Fewer variables means fewer experiments needed.',
        },
        {
          id: 'u6-L5-Q1',
          type: 'multiple-choice',
          question: 'If a problem has 7 variables and 3 fundamental dimensions (M, L, T), how many Pi groups form?',
          options: [
            '10 dimensionless groups',
            '7 dimensionless groups',
            '3 dimensionless groups',
            '4 dimensionless groups'
          ],
          correctIndex: 3,
          explanation: 'Buckingham Pi: number of Pi groups = n - k = 7 - 3 = 4.',
          distractorExplanations: {
            0: 'This value results from an incorrect approach; dimensionless groups.',
            1: 'This value results from an incorrect approach; dimensionless groups.',
            2: 'This value results from an incorrect approach; dimensionless groups.',
          },
          hint: 'n variables minus k dimensions equals number of Pi groups.'
        },
        {
          id: 'u6-L5-Q2',
          type: 'multiple-choice',
          question: 'What does "dimensional homogeneity" mean for an equation?',
          options: [
            'The equation must be dimensionless',
            'All variables must use SI units',
            'Every term must have the same dimensions',
            'Only applies to fluid mechanics equations'
          ],
          correctIndex: 2,
          explanation: 'A physically valid equation must have matching dimensions on both sides. You can\'t add meters to seconds.',
          distractorExplanations: {
            0: 'This focuses on equation/dimensionless, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on variables/units, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than applies fluid suggests.',
          },
          hint: 'Can you add apples and oranges?'
        },
        {
          id: 'u6-L5-T2',
          type: 'teaching',
          question: 'Common dimensionless numbers',
          explanation: 'Reynolds number (Re = rho*v*L/mu) compares inertia to viscous forces. Froude number (Fr = v/sqrt(g*L)) compares inertia to gravity. Mach number (Ma = v/c) compares flow speed to sound speed.',
          hint: 'For pipe flow, match Re. For ship waves, match Fr. For supersonic jets, match Ma.',
        },
        {
          id: 'u6-L5-Q0b',
          type: 'multiple-choice',
          question: 'The Reynolds number compares:',
          options: [
            'Gravity forces to viscous forces',
            'Inertia forces to viscous forces',
            'Flow speed to sound speed',
            'Pressure forces to inertia forces'
          ],
          correctIndex: 1,
          explanation: 'Re = rho*v*L/mu. Large Re means inertia dominates (turbulent). Small Re means viscosity dominates (laminar).',
          distractorExplanations: {
            0: 'This focuses on gravity, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on speed/sound, which is not the correct mechanism or principle for this problem.',
            3: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
          },
          hint: 'It\'s the most common dimensionless number in fluid mechanics.',
        },
        {
          id: 'u6-L5-Q3',
          type: 'multiple-choice',
          question: 'The Froude number Fr = v/sqrt(g*L) is most important for:',
          options: [
            'Compressible gas dynamics',
            'Pipe flow friction calculations',
            'Free-surface flows and wave phenomena',
            'Heat transfer in fluids'
          ],
          correctIndex: 2,
          explanation: 'The Froude number compares inertia to gravity. It governs wave patterns, ship resistance, and open-channel flows.',
          distractorExplanations: {
            0: 'This focuses on compressible/dynamics, which is not the correct mechanism or principle for this problem.',
            1: 'Friction is not the governing mechanism here; the correct answer involves a different physical principle.',
            3: 'This focuses on transfer/fluids, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Which dimensionless number involves gravity?'
        },
        {
          id: 'u6-L5-Q4',
          type: 'match-pairs',
          question: 'Match each dimensionless number to what it compares.',
          options: ['Reynolds', 'Froude', 'Mach', 'Euler'],
          matchTargets: ['Inertia vs viscous', 'Inertia vs gravity', 'Flow speed vs sound', 'Pressure vs inertia'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Each number is a ratio of two types of forces or velocities, making it useful for specific flow regimes.',
          hint: 'Think about what two quantities each number compares.',
        },
        {
          id: 'u6-L5-Q5',
          type: 'true-false',
          question: 'The Buckingham Pi theorem guarantees that the resulting dimensionless groups are unique.',
          correctAnswer: false,
          explanation: 'The choice of repeating variables affects which Pi groups you get. Different valid choices give different (but equivalent) sets of groups.',
          distractorExplanations: {
            0: 'The choice of repeating variables affects which Pi groups you get.',
          },
          hint: 'Can you form the groups in more than one way?'
        },
        {
          id: 'u6-L5-Q6',
          type: 'fill-blank',
          question: 'The Mach number Ma = v/c compares flow speed to the speed of _____ in the medium.',
          blanks: ['sound'],
          wordBank: ['sound', 'light', 'gravity', 'viscosity', 'heat'],
          explanation: 'When Ma > 1, the flow is supersonic. When Ma < 1, it\'s subsonic. Ma = 1 is the sonic condition.',
          hint: 'This number determines whether shock waves can form.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 5b: Dimensional Analysis (Part 2)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L5b',
      title: 'Dimensional Analysis (2/3)',
      description: 'Similitude, model testing, and applying dimensionless numbers in practice.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u6-L5-T3',
          type: 'teaching',
          question: 'Similitude and model testing',
          explanation: 'For a scale model to predict full-size behavior, you need similitude: geometric (same shape), kinematic (same velocity ratios), and dynamic (same force ratios). In practice, you usually can\'t match all dimensionless numbers at once.',
          hint: 'Ship models match Froude number because wave drag dominates. Wind tunnels match Reynolds number.',
        },
        {
          id: 'u6-L5b-Q0a',
          type: 'multiple-choice',
          question: 'For a 1:10 scale ship model, which dimensionless number should be matched first?',
          options: [
            'Reynolds number (viscous drag dominates)',
            'Froude number (wave drag dominates)',
            'Mach number (compressibility matters)',
            'Euler number (pressure matters most)'
          ],
          correctIndex: 1,
          explanation: 'Ship resistance is dominated by wave-making drag at cruising speeds, so Froude number similarity is the primary requirement.',
          distractorExplanations: {
            0: 'This focuses on reynolds/(viscous, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on (compressibility/matters), which is not the correct mechanism or principle for this problem.',
            3: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
          },
          hint: 'Ship testing is about waves, not viscosity.',
        },
        {
          id: 'u6-L5-Q7',
          type: 'multiple-choice',
          question: 'Why can\'t you typically match both Re and Fr simultaneously in a scale model?',
          options: [
            'Re and Fr are always equal, so matching one matches both',
            'Matching both requires changing fluid properties to impossible values',
            'It\'s actually easy to match both in practice',
            'Re doesn\'t apply to free-surface flows'
          ],
          correctIndex: 1,
          explanation: 'For a 1:10 model matching Fr, you\'d need a fluid with 1/31.6 the kinematic viscosity of water to also match Re. No such fluid exists practically.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; equal matching the principle has important exceptions.',
            2: 'For a 1:10 model matching Fr, you\.',
            3: 'Regarding doesn: For a 1:10 model matching Fr, you\.',
          },
          hint: 'Try the math: what fluid viscosity would you need?'
        },
        {
          id: 'u6-L5-Q8',
          type: 'multiple-choice',
          question: 'A wind tunnel tests a 1:5 scale car model. To match Re, the wind speed in the tunnel must be:',
          options: [
            '5 times the real car speed (if same fluid)',
            '1/5 of the real car speed',
            'The same as the real car speed',
            '25 times the real car speed'
          ],
          correctIndex: 0,
          explanation: 'Re = V*L/nu. With L_model = L/5 and same fluid (same nu), you need V_model = 5*V_real to keep Re constant.',
          distractorExplanations: {
            1: '1 is one-quarter of the correct value, from an extra division or missing squared term.',
            2: 'The reasoning about speed does not correctly apply to this engineering problem.',
            3: 'This value results from an incorrect approach; times the real car speed.',
          },
          hint: 'Re must be equal: V_model * L_model = V_real * L_real.'
        },
        {
          id: 'u6-L5b-T2',
          type: 'teaching',
          question: 'Incomplete similitude',
          explanation: 'When you can\'t match all dimensionless numbers, you match the most important one and apply corrections for the rest. For example, ship models match Fr for wave drag and add a calculated correction for viscous (Re-dependent) drag.',
          hint: 'Real engineering uses judgment about which forces dominate at the conditions of interest.',
        },
        {
          id: 'u6-L5b-Q0b',
          type: 'true-false',
          question: 'In practice, it\'s often impossible to achieve complete dynamic similitude with a scale model.',
          correctAnswer: true,
          explanation: 'Matching all dimensionless numbers simultaneously usually requires impossible fluid properties. Engineers match the dominant one and correct for the rest.',
          distractorExplanations: {
            1: 'Matching all dimensionless numbers simultaneously usually requires impossible fluid properties.',
          },
          hint: 'Complete similitude would require matching ALL force ratios.',
        },
        {
          id: 'u6-L5-Q9',
          type: 'multiple-choice',
          question: 'Geometric similarity means the model and prototype have the same:',
          options: [
            'Material',
            'Size (1:1 scale)',
            'Shape (all length ratios are equal)',
            'Surface roughness in absolute terms'
          ],
          correctIndex: 2,
          explanation: 'Geometric similarity means every dimension is scaled by the same factor. The shape is identical; only the size differs.',
          distractorExplanations: {
            0: 'Regarding material: Geometric similarity means every dimension is scaled by the same factor.',
            1: 'This focuses on scale), which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on surface/roughness, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think of a perfectly scaled-down replica.'
        },
        {
          id: 'u6-L5-Q10',
          type: 'sort-buckets',
          question: 'Sort these: which dimensionless number should be matched for each scenario?',
          options: ['Pipe flow model', 'Ship hull testing', 'Airplane at cruise', 'Dam spillway model', 'Submarine model (submerged)', 'Open channel weir'],
          buckets: ['Match Reynolds', 'Match Froude'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Match Re when viscous/inertia forces dominate (pipes, submerged bodies, airplanes). Match Fr when gravity/waves dominate (ships, spillways, open channels).',
          hint: 'Free-surface and wave problems need Fr. Internal and viscous problems need Re.',
        },
        {
          id: 'u6-L5-Q11',
          type: 'multiple-choice',
          question: 'What is the Weber number, and when is it important?',
          options: [
            'We = P/(0.5*rho*V2); important for pressure drag',
            'We = V/sqrt(g*L); important for ship wave resistance',
            'We = V*L/nu; important for pipe flow transition',
            'We = rho*V2*L/sigma; important when surface tension matters (droplets, thin films)'
          ],
          correctIndex: 3,
          explanation: 'The Weber number compares inertia to surface tension. It\'s critical for atomization, spray dynamics, and thin film flows.',
          distractorExplanations: {
            0: '"We = P/(0.5*rho*V2)" is incorrect; the reasoning does not follow from the governing equations.',
            1: '"We = V/sqrt(g*L)" is incorrect; the reasoning does not follow from the governing equations.',
            2: '"We = V*L/nu" is incorrect; the reasoning does not follow from the governing equations.',
          },
          hint: 'Surface tension is the key force here.'
        },
        {
          id: 'u6-L5-Q12',
          type: 'multiple-choice',
          question: 'A 1:20 scale model of a river dam is tested in a lab. If the flow velocity in the model is 0.5 m/s, what is the predicted prototype velocity? (matching Fr)',
          options: [
            'V_proto = 0.5 / 20 = 0.025 m/s',
            'V_proto = 0.5 * 20 = 10 m/s',
            'V_proto = 0.5 * sqrt(20) = 2.24 m/s',
            'V_proto = 0.5 m/s (same velocity)'
          ],
          correctIndex: 2,
          explanation: 'Froude similarity: V_proto/V_model = sqrt(L_proto/L_model) = sqrt(20) = 4.47. So V_proto = 0.5 * 4.47 = 2.24 m/s.',
          distractorExplanations: {
            0: 'This focuses on 0.025, which is not the correct mechanism or principle for this problem.',
            1: 'Regarding vproto: Froude similarity: V_proto/V_model = sqrt(L_proto/L_model) = sqrt(20) = 4.47.',
            3: 'This focuses on (same/velocity), which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Froude number V/sqrt(g*L) must be equal. Scale the velocity accordingly.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // LESSON 5c: Dimensional Analysis (Part 3)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L5c',
      title: 'Dimensional Analysis (3/3)',
      description: 'Drag coefficients, power correlations, and real-world applications of Pi groups.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u6-L5c-T1',
          type: 'teaching',
          question: 'Drag and lift coefficients',
          explanation: 'Drag coefficient Cd = F_D/(0.5*rho*V2*A) and lift coefficient Cl = F_L/(0.5*rho*V2*A) are dimensionless. They depend on Re, shape, and surface roughness. Using Cd lets you predict drag at any speed or fluid, not just the one tested.',
          hint: 'A sphere has Cd of about 0.47 in the drag crisis range, but it drops to 0.2 when the boundary layer transitions.',
        },
        {
          id: 'u6-L5c-Q0a',
          type: 'true-false',
          question: 'The drag coefficient Cd is a dimensionless number.',
          correctAnswer: true,
          explanation: 'Yes. Cd = F_D/(0.5*rho*V2*A). Force divided by (pressure * area) is dimensionless.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Check the units: force divided by force.',
        },
        {
          id: 'u6-L5-Q13',
          type: 'multiple-choice',
          question: 'Why does a golf ball have dimples?',
          options: [
            'Dimples reduce surface area, lowering friction drag',
            'Dimples increase the ball\'s weight for better distance',
            'Dimples trigger turbulent boundary layer, reducing pressure drag',
            'Dimples are purely aesthetic with no aerodynamic effect'
          ],
          correctIndex: 2,
          explanation: 'The dimples trip the boundary layer to turbulent, which stays attached longer, reducing the wake and overall drag. This is the same physics as the drag crisis on a smooth sphere.',
          distractorExplanations: {
            0: 'Friction is not the governing mechanism here; the correct answer involves a different physical principle.',
            1: 'This focuses on increase/ball\, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on purely/aesthetic, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about boundary layer separation and wake size.'
        },
        {
          id: 'u6-L5-Q14',
          type: 'multiple-choice',
          question: 'The power required to mix a fluid in a tank depends on impeller diameter D, speed N, fluid density rho, and viscosity mu. How many Pi groups?',
          options: [
            '1 group',
            '3 groups',
            '5 groups',
            '2 groups (5 variables, 3 dimensions)'
          ],
          correctIndex: 3,
          explanation: 'n = 5 variables (P, D, N, rho, mu), k = 3 dimensions (M, L, T). Pi groups = 5 - 3 = 2. These are typically the power number and the impeller Reynolds number.',
          distractorExplanations: {
            0: '1 is approximately half the correct answer, likely from omitting a required factor of 2.',
            1: 'This numerical value does not result from the correct formula applied to the given parameters.',
            2: 'This numerical value does not result from the correct formula applied to the given parameters.',
          },
          hint: 'Count the variables and fundamental dimensions, then subtract.'
        },
        {
          id: 'u6-L5c-T2',
          type: 'teaching',
          question: 'Applying Pi groups in practice',
          explanation: 'Once you have dimensionless groups, you test the relationship experimentally (e.g., Cd vs Re for a sphere). The beauty is that one set of experiments covers ALL sizes, speeds, and fluids where those groups apply.',
          hint: 'The Moody chart is a famous example: it plots f vs Re with epsilon/D as a parameter.',
        },
        {
          id: 'u6-L5c-Q0b',
          type: 'multiple-choice',
          question: 'The Moody chart is an example of dimensional analysis because it plots:',
          options: [
            'Flow rate vs pipe diameter',
            'Pressure drop vs pipe length',
            'Dimensionless friction factor vs Reynolds number and relative roughness',
            'Velocity vs Reynolds number'
          ],
          correctIndex: 2,
          explanation: 'The Moody chart uses three dimensionless quantities (f, Re, epsilon/D), which is why it works for any fluid, any pipe size, and any speed.',
          distractorExplanations: {
            0: 'This focuses on diameter, which is not the correct mechanism or principle for this problem.',
            1: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
            3: 'This focuses on velocity, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'All axes and parameters on the Moody chart are dimensionless.',
        },
        {
          id: 'u6-L5-Q15',
          type: 'multiple-choice',
          question: 'Dimensional analysis tells us that Cd for a sphere depends on Re. Can it predict the exact shape of the Cd vs Re curve?',
          options: [
            'The relationship is always linear',
            'Yes, the Buckingham Pi theorem gives the complete function',
            'Only for laminar flow where theory gives exact solutions',
            'No, you need experiments or CFD to find the actual relationship'
          ],
          correctIndex: 3,
          explanation: 'Dimensional analysis identifies WHICH groups matter (Cd = f(Re)), but not the FORM of f. You still need experiments or computation for the actual curve.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; relationship linear the principle has important exceptions.',
            1: 'This focuses on buckingham/theorem, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than laminar theory suggests.',
          },
          hint: 'Pi theorem tells you the groupings, not the function itself.'
        },
        {
          id: 'u6-L5-Q16',
          type: 'order-steps',
          question: 'Order the steps of the Buckingham Pi method.',
          steps: [
            'List all relevant variables',
            'Count fundamental dimensions (M, L, T)',
            'Choose repeating variables (k variables)',
            'Form each Pi group by combining repeating variables with one remaining variable',
            'Verify each Pi group is dimensionless'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'The Buckingham Pi method is systematic: list, count, choose repeaters, form groups, verify.',
          hint: 'The repeating variables should include all fundamental dimensions.',
        },
        {
          id: 'u6-L5-Q30',
          type: 'multiple-choice',
          question: 'What causes the "drag crisis" on a smooth sphere, and how does it relate to dimensional analysis?',
          options: [
            'The sphere deforms at high velocity, becoming more streamlined',
            'Boundary layer transitions from laminar to turbulent at a critical Re',
            'Compressibility effects cause drag to drop',
            'The drag crisis is a measurement artifact'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="30" cy="40" r="12" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.04"/> <g stroke="#58CC02" stroke-width="0.4" opacity="0.3"> <path d="M75,28 L50,28 Q20,28 18,34 Q16,38 18,40" fill="none"/> <path d="M75,40 L42,40" fill="none"/> <path d="M75,52 L50,52 Q20,52 18,46 Q16,42 18,40" fill="none"/> </g> <g stroke="#A5E86C" stroke-width="0.3" opacity="0.2"> <path d="M42,36 Q48,38 44,40 Q48,42 42,44" fill="none"> <animate attributeName="opacity" values="0.15;0.3;0.15" dur="1.5s" repeatCount="indefinite"/> </path> </g> <g opacity="0.5"> <line x1="72" y1="16" x2="58" y2="16" stroke-width="0.6" stroke="#58CC02"/> <polygon points="58,14.5 58,17.5 55,16" fill="#58CC02"/> <text x="65" y="14" font-size="3" fill="#58CC02">V</text> </g> <text x="40" y="72" font-size="3" fill="#58CC02" opacity="0.4" text-anchor="middle">F_D = 0.5*Cd*rho*A*V2</text> </svg>',
          explanation: 'Dimensional analysis says Cd = f(Re) for a smooth sphere, but can\'t predict the function. The drag crisis is the boundary layer transitioning to turbulent, reducing wake drag.',
          distractorExplanations: {
            0: 'This focuses on sphere/deforms, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on compressibility/effects, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on crisis/measurement, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'What changes about the boundary layer at the critical Re?'
        },
        {
          id: 'u6-L5-Q17',
          type: 'multiple-choice',
          question: 'The Strouhal number St = f*L/V governs:',
          options: [
            'Wave speed in open channels',
            'Friction factor in turbulent pipe flow',
            'Vortex shedding frequency behind bluff bodies',
            'Heat transfer rate from a surface'
          ],
          correctIndex: 2,
          explanation: 'The Strouhal number relates vortex shedding frequency to flow speed and body size. For a cylinder, St is about 0.2 over a wide range of Re.',
          distractorExplanations: {
            0: 'This focuses on speed/channels, which is not the correct mechanism or principle for this problem.',
            1: 'Friction is not the governing mechanism here; the correct answer involves a different physical principle.',
            3: 'This focuses on transfer/surface, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about the "singing" of power lines in wind.'
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════════
    // CONVERSATION LESSON
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L-conv',
      title: 'Sizing a Pump for a Building',
      description: 'Help a senior engineer size a pump for a new office building\'s water supply system.',
      icon: '💬',
      xpReward: 30,
      type: 'conversation',
      levels: 1,
      questions: [],
      conversationStartNodeId: 'u6-L-conv-C1',
      conversationNodes: [
        {
          id: 'u6-L-conv-C1',
          speaker: 'Narrator',
          message: 'You\'re a junior engineer at a consulting firm. Sarah, the lead mechanical engineer, calls you into a meeting about a new 8-story office building that needs a domestic water supply system.',
          nextNodeId: 'u6-L-conv-C2',
        },
        {
          id: 'u6-L-conv-C2',
          speaker: 'Sarah',
          message: 'We need to size the main booster pump. The city supply comes in at 250 kPa gauge at ground level, and we need 200 kPa at the top floor fixture, 28 meters up. Total pipe friction is about 15 m of head. What pump head do we need?',
          options: [
            {
              text: 'Static head is 28 m, friction is 15 m, and we need 200 kPa (about 20.4 m) at the top minus the 250 kPa (25.5 m) supply. So total pump head is 28 + 15 + 20.4 - 25.5 = 37.9 m.',
              nextNodeId: 'u6-L-conv-C3-great',
              quality: 'great',
              feedback: 'Excellent. You correctly accounted for static lift, friction losses, required outlet pressure, and available inlet pressure.',
            },
            {
              text: 'We need 28 m of static head plus 15 m friction, so about 43 m total.',
              nextNodeId: 'u6-L-conv-C3-okay',
              quality: 'okay',
              feedback: 'Close, but you forgot to subtract the available city supply pressure and add the required top-floor pressure. The actual number is about 38 m.',
            },
            {
              text: 'Just use a pump rated for the building height of 28 m.',
              nextNodeId: 'u6-L-conv-C3-poor',
              quality: 'poor',
              feedback: 'That ignores friction losses and the pressure requirements at the fixture. The pump would be way undersized.',
            },
          ],
        },
        {
          id: 'u6-L-conv-C3-great',
          speaker: 'Sarah',
          message: 'Spot on. Now, peak demand is about 8 L/s. I found two pump options. Pump A runs at 85% efficiency near our operating point. Pump B is cheaper but operates at 65% efficiency at this flow. Which do you recommend and why?',
          nextNodeId: 'u6-L-conv-D1',
        },
        {
          id: 'u6-L-conv-C3-okay',
          speaker: 'Sarah',
          message: 'Almost. Remember to include the pressure credits and debits. Anyway, peak demand is 8 L/s. Pump A operates at 85% efficiency near our point. Pump B is cheaper but runs at 65%. Which do you pick?',
          nextNodeId: 'u6-L-conv-D1',
        },
        {
          id: 'u6-L-conv-C3-poor',
          speaker: 'Sarah',
          message: 'Not quite. You need to account for friction and pressure requirements too. Let\'s move on. Peak demand is 8 L/s. Pump A operates at 85% efficiency. Pump B is cheaper but at 65%. Which one?',
          nextNodeId: 'u6-L-conv-D1',
        },
        {
          id: 'u6-L-conv-D1',
          speaker: 'You',
          message: '',
          options: [
            {
              text: 'Pump A. At 8 L/s and 38 m head, hydraulic power is about 3 kW. Pump A needs 3.5 kW shaft power; Pump B needs 4.6 kW. The energy savings from A will pay back the higher purchase price within a year or two.',
              nextNodeId: 'u6-L-conv-C4-great',
              quality: 'great',
              feedback: 'Great analysis. You calculated the power difference and considered lifecycle cost, not just purchase price.',
            },
            {
              text: 'Pump A because higher efficiency is always better.',
              nextNodeId: 'u6-L-conv-C4-okay',
              quality: 'okay',
              feedback: 'Right choice, but you should back it up with numbers. How much energy and money would Pump B waste over its lifetime?',
            },
            {
              text: 'Pump B because it\'s cheaper upfront, and the building owner cares about budget.',
              nextNodeId: 'u6-L-conv-C4-poor',
              quality: 'poor',
              feedback: 'The 20% efficiency gap means significantly higher electricity bills. Engineers should present lifecycle cost, not just purchase price.',
            },
          ],
        },
        {
          id: 'u6-L-conv-C4-great',
          speaker: 'Sarah',
          message: 'Great thinking. One more thing: the pump suction draws from a ground-floor tank. The pump inlet is 1 m above the tank water level, and suction pipe friction is 0.8 m. Water at 20 C has vapor pressure of about 2.34 kPa. Is there a cavitation risk?',
          nextNodeId: 'u6-L-conv-D2',
        },
        {
          id: 'u6-L-conv-C4-okay',
          speaker: 'Sarah',
          message: 'Right instinct, but always show the math. Last question: suction draws from a ground tank, 1 m below the pump. Suction friction is 0.8 m. Water at 20 C. Cavitation risk?',
          nextNodeId: 'u6-L-conv-D2',
        },
        {
          id: 'u6-L-conv-C4-poor',
          speaker: 'Sarah',
          message: 'We\'ll discuss lifecycle cost analysis another time. Last question: the pump draws from a ground tank, 1 m suction lift, 0.8 m suction friction. Any cavitation risk?',
          nextNodeId: 'u6-L-conv-D2',
        },
        {
          id: 'u6-L-conv-D2',
          speaker: 'You',
          message: '',
          options: [
            {
              text: 'NPSH_available = P_atm/(rho*g) - z_s - h_f - P_v/(rho*g) = 10.33 - 1 - 0.8 - 0.24 = 8.29 m. If the pump needs less than about 8 m NPSH, we\'re fine.',
              nextNodeId: 'u6-L-conv-END',
              quality: 'great',
              feedback: 'Perfect NPSH calculation. You correctly subtracted suction lift, friction, and vapor pressure head from atmospheric.',
            },
            {
              text: 'NPSH should be fine because the tank is only 1 m below the pump.',
              nextNodeId: 'u6-L-conv-END',
              quality: 'okay',
              feedback: 'Probably fine, but you should always calculate NPSH_available and compare to the manufacturer\'s NPSH_required. Don\'t guess.',
            },
            {
              text: 'Cavitation only happens in very large pumps, so this small building pump should be fine.',
              nextNodeId: 'u6-L-conv-END',
              quality: 'poor',
              feedback: 'Cavitation can happen in any pump regardless of size. Always calculate NPSH_available and verify it exceeds NPSH_required.',
            },
          ],
        },
        {
          id: 'u6-L-conv-END',
          speaker: 'Narrator',
          message: 'Sarah nods approvingly. You\'ve just walked through the key steps of pump sizing: calculating total head, comparing pump efficiency and lifecycle cost, and checking NPSH for cavitation. These skills come up in almost every building services or process piping project.',
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════
    // SPEED ROUND LESSON
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'u6-L-speed',
      title: 'Fluids Speed Round',
      description: '15 rapid-fire fluid mechanics questions. You have 60 seconds.',
      icon: '⚡',
      xpReward: 25,
      type: 'speed-round',
      levels: 1,
      questions: [],
      speedTimeLimit: 60,
      speedQuestions: [
        { id: 'u6-L-speed-SQ1', question: 'Re < 2300 in a pipe means?', options: ['Turbulent', 'Laminar', 'Supersonic', 'Transitional'], correctIndex: 1 },
        { id: 'u6-L-speed-SQ2', question: 'P = rho*g*h gives what type of pressure?', options: ['Stagnation', 'Dynamic', 'Hydrostatic', 'Gauge'], correctIndex: 2 },
        { id: 'u6-L-speed-SQ3', question: 'Bernoulli assumes the flow is:', options: ['Compressible', 'Turbulent', 'Inviscid', 'Unsteady'], correctIndex: 2 },
        { id: 'u6-L-speed-SQ4', question: 'Kinematic viscosity nu equals:', options: ['mu*rho', 'rho/mu', 'mu/rho', 'rho*g'], correctIndex: 2 },
        { id: 'u6-L-speed-SQ5', question: 'Torricelli: V = ?', options: ['sqrt(gh)', 'sqrt(2gh)', '2gh', 'g*h/2'], correctIndex: 1 },
        { id: 'u6-L-speed-SQ6', question: 'Archimedes: buoyant force depends on?', options: ['Displaced fluid', 'Object weight', 'Object density', 'Container shape'], correctIndex: 0 },
        { id: 'u6-L-speed-SQ7', question: 'Darcy-Weisbach: h_f = f*(L/D)*?', options: ['V2/(2g)', 'V/g', 'V2*g', 'V*D'], correctIndex: 0 },
        { id: 'u6-L-speed-SQ8', question: 'NPSH stands for:', options: ['Net positive suction head', 'Normal pump suction height', 'Net pressure system head', 'Nominal pump shaft head'], correctIndex: 0 },
        { id: 'u6-L-speed-SQ9', question: 'Affinity law: Q is proportional to:', options: ['N (speed)', 'N2', 'N3', '1/N'], correctIndex: 0 },
        { id: 'u6-L-speed-SQ10', question: 'Froude number compares:', options: ['Inertia vs gravity', 'Inertia vs viscous', 'Speed vs sound', 'Pressure vs inertia'], correctIndex: 0 },
        { id: 'u6-L-speed-SQ11', question: 'Parallel pipes have equal:', options: ['Head loss', 'Flow rate', 'Velocity', 'Friction factor'], correctIndex: 0 },
        { id: 'u6-L-speed-SQ12', question: 'Cavitation occurs when P drops below:', options: ['Vapor pressure', 'Atmospheric', 'Zero', 'Gauge pressure'], correctIndex: 0 },
        { id: 'u6-L-speed-SQ13', question: 'Pi theorem: n vars, k dims gives:', options: ['n-k groups', 'n+k groups', 'n*k groups', 'n/k groups'], correctIndex: 0 },
        { id: 'u6-L-speed-SQ14', question: 'Laminar pipe flow friction factor:', options: ['64/Re', '0.02', 'Re/64', '128/Re'], correctIndex: 0 },
        { id: 'u6-L-speed-SQ15', question: 'Centrifugal pumps are best for:', options: ['High flow, moderate P', 'High P, low flow', 'High viscosity', 'Precise metering'], correctIndex: 0 },
      ],
    },
  ]
};
