import type { Unit } from '../types';

export const unit9: Unit = {
  id: 'u9-gdt',
  title: 'GD&T & Tolerancing',
  description: 'Geometric dimensioning and tolerancing, datum systems, tolerance stack-ups, surface finish, and metrology.',
  color: '#EC4899',
  icon: '📏',
  topicId: 'design-tolerancing',
  lessons: [
    {
      id: 'u9-L1',
      title: 'Tolerance Fundamentals',
      description: 'Tolerance/allowance, clearance/interference/transition fits, ISO/ANSI tolerance grades, bilateral/unilateral.',
      icon: '📐',
      xpReward: 20,
      questions: [
        {
          id: 'u9-L1-Q1',
          type: 'multiple-choice',
          question: 'Why use an interference fit for the inner ring on a rotating shaft, but a clearance fit for the outer ring in the housing?',
          options: [
            'It is arbitrary — both rings could use the same fit type without any',
            'The rotating ring must have an interference fit to prevent creep (relative',
            'The inner ring needs interference',
            'Clearance on the outer ring is only for thermal expansion — functionally both'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Outer race --> <circle cx="40" cy="40" r="28" fill="#58CC02" opacity="0.05"/> <circle cx="40" cy="40" r="28" stroke="#58CC02" stroke-width="3" fill="none" opacity="0.3"/> <!-- Outer raceway groove (where balls contact) --> <circle cx="40" cy="40" r="23.5" stroke="#A5E86C" stroke-width="3" fill="none" opacity="0.06"/> <!-- Inner race --> <circle cx="40" cy="40" r="12.5" fill="#58CC02" opacity="0.06"/> <circle cx="40" cy="40" r="12.5" stroke="#3B8700" stroke-width="3" fill="none"/> <!-- Inner raceway groove --> <circle cx="40" cy="40" r="13.5" stroke="#A5E86C" stroke-width="2" fill="none" opacity="0.06"/> <!-- Inner race crosshairs (shaft rotation indicator) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="2s" repeatCount="indefinite"/> <line x1="40" y1="28" x2="40" y2="52" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> <line x1="28" y1="40" x2="52" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> </g> <!-- Shaft bore --> <circle cx="40" cy="40" r="5" fill="#3B8700" opacity="0.25"/> <circle cx="40" cy="40" r="2" fill="white" opacity="0.12"/> <!-- Ball cage + balls (cage speed ≈ half shaft speed) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="4s" repeatCount="indefinite"/> <!-- Cage retainer ring --> <circle cx="40" cy="40" r="18" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="4,10" fill="none" opacity="0.2"/> <!-- Ball 0° --> <circle cx="58" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="58" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="56.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 45° --> <circle cx="52.7" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 90° --> <circle cx="40" cy="22" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="22" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="20.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 135° --> <circle cx="27.3" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 180° --> <circle cx="22" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="22" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="20.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 225° --> <circle cx="27.3" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="51.2" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 270° --> <circle cx="40" cy="58" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="58" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="56.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 315° --> <circle cx="52.7" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="51.2" r="1.5" fill="white" opacity="0.3"/> </g> </svg>',
          explanation: 'The ring that rotates relative to the load direction must have an interference fit to prevent "creep" — gradual rotation of the ring relative to its seat due to cyclic loading.',
          hint: 'Consider which ring sees the rotating load vector.'
        },
        {
          id: 'u9-L1-Q2',
          type: 'multiple-choice',
          question: 'During assembly, the housing cracks. What went wrong?',
          options: [
            'The tolerance grade was too loose — they should have used H6/s5 for a tighter',
            'H7/s6 is a heavy press fit that generates hoop stresses exceeding aluminum\'s',
            'The cracking is a material defect — H7/s6 is appropriate for aluminum',
            'They should have used the same fit but heated the housing before assembly'
          ],
          correctIndex: 1,
          explanation: 'H7/s6 produces very high interference, especially problematic in aluminum which has lower yield strength (~275 MPa for 6061-T6 vs. ~530 MPa for medium carbon steel) and lower fracture toughness.',
          hint: 'Consider the material properties of aluminum.'
        },
        {
          id: 'u9-L1-Q3',
          type: 'multiple-choice',
          question: 'A drawing specifies ∅50 +0.000/−0.050 mm for a bore and ∅50 +0.025/+0.050 mm for the mating shaft. What type of fit is this?',
          options: [
            'Clearance fit — shaft is always smaller than the hole',
            'Interference fit — shaft max always exceeds hole min',
            'Transition fit — sometimes clearance, sometimes not',
            'Tolerances are invalid, shaft cannot exceed nominal'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Vertical scale (dimension axis) --> <line x1="40" y1="72" x2="40" y2="8" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <!-- Nominal dimension line (50.000) --> <line x1="12" y1="44" x2="68" y2="44" stroke="#3B8700" stroke-width="1" stroke-dasharray="3,2" opacity="0.3"/> <text x="40" y="78" font-size="4.5" fill="#334155" text-anchor="middle">Nominal ∅50</text> <!-- Hole tolerance zone (H: 50.000 to 49.950) --> <rect x="16" y="44" width="14" height="20" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/> <!-- Hole upper deviation = 0.000 (at nominal) --> <line x1="14" y1="44" x2="32" y2="44" stroke="#58CC02" stroke-width="0.8" opacity="0.5"/> <text x="23" y="42" font-size="3.5" fill="#334155" text-anchor="middle">+0.000</text> <!-- Hole lower deviation = -0.050 --> <line x1="14" y1="64" x2="32" y2="64" stroke="#58CC02" stroke-width="0.8" opacity="0.5"/> <text x="23" y="70" font-size="3.5" fill="#334155" text-anchor="middle">-0.050</text> <!-- Hole label --> <text x="23" y="56" font-size="5" fill="#58CC02" text-anchor="middle" font-weight="bold">Hole</text> <!-- Shaft tolerance zone (above nominal: +0.025 to +0.050) --> <rect x="50" y="24" width="14" height="10" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="1.2"/> <!-- Shaft upper deviation = +0.050 --> <line x1="48" y1="24" x2="66" y2="24" stroke="#3B8700" stroke-width="0.8" opacity="0.5"/> <text x="57" y="22" font-size="3.5" fill="#334155" text-anchor="middle">+0.050</text> <!-- Shaft lower deviation = +0.025 --> <line x1="48" y1="34" x2="66" y2="34" stroke="#3B8700" stroke-width="0.8" opacity="0.5"/> <text x="57" y="39" font-size="3.5" fill="#334155" text-anchor="middle">+0.025</text> <!-- Shaft label --> <text x="57" y="31" font-size="5" fill="#3B8700" text-anchor="middle" font-weight="bold">Shaft</text> <!-- Interference zone indicator (shaft always above hole) --> <line x1="36" y1="34" x2="36" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.4"/> <polygon points="34.5,35 36,32 37.5,35" fill="#3B8700" opacity="0.4"/> <polygon points="34.5,43 36,46 37.5,43" fill="#3B8700" opacity="0.4"/> <text x="40" y="10" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Interference</text> <!-- Scale markers --> <text x="10" y="46" font-size="3" fill="#6B7280">50.000</text> <text x="10" y="26" font-size="3" fill="#6B7280">50.050</text> </svg>',
          explanation: 'Maximum shaft = 50.050, minimum shaft = 50.025. Maximum hole = 50.000, minimum hole = 49.950. Even the smallest shaft (50.025) exceeds the largest hole (50.000), so interference is guaranteed.',
          hint: 'Check if the smallest shaft can fit in the largest hole.'
        },
        {
          id: 'u9-L1-Q4',
          type: 'multiple-choice',
          question: 'A dimension is specified as 50 +0.05/−0.10 mm. What is the tolerance, and is it bilateral or unilateral?',
          options: [
            'Tolerance = 0.05 mm, unilateral',
            'Tolerance = 0.10 mm, unilateral',
            'Tolerance = 0.15 mm, bilateral',
            'Tolerance = 0.15 mm, unilateral'
          ],
          correctIndex: 2,
          explanation: 'Total tolerance = upper deviation − lower deviation = +0.05 − (−0.10) = 0.15 mm.',
          hint: 'Tolerance = upper limit − lower limit.'
        },
        {
          id: 'u9-L1-Q5',
          type: 'multiple-choice',
          question: 'A drawing has an IT6 tolerance on a rough cast surface that gets no machining. Why is this a problem, and how do you resolve it?',
          options: [
            'IT6 is too loose for a cast surface — they should be asking for IT5 or tighter',
            'IT6 requires precision machining (grinding or fine turning) and cannot be',
            'The tolerance grade does not matter for cast surfaces since they are not',
            'The engineer is wrong — modern casting processes can easily achieve IT6'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'ISO tolerance grades reflect manufacturing process capability. Sand casting typically achieves IT11–IT16, investment casting IT7–IT9, die casting IT8–IT10.',
          hint: 'Consider what tolerance grades different manufacturing.'
        },
        {
          id: 'u9-L1-Q6',
          type: 'fill-blank',
          question: 'The minimum intended difference in size between mating parts in a clearance fit is called the ___.',
          blanks: ['allowance'],
          wordBank: ['allowance', 'tolerance', 'deviation', 'clearance', 'variance'],
          explanation: 'Allowance is the minimum clearance (in a clearance fit) or maximum interference (in an interference fit) between mating parts.',
          hint: 'This is the tightest possible fit between mating parts.'
        },
        {
          id: 'u9-L1-Q7',
          type: 'multiple-choice',
          question: 'In the ISO hole-basis system, what does the designation H7/g6 represent?',
          options: [
            'Hole with H deviation and IT7, mating with g6 shaft',
            'A hole of 7 mm mating with a shaft of 6 mm size',
            'An interference fit with 7 mm hole and 6 mm shaft',
            'Transition fit where H and g are surface finishes'
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Title --> <text x="40" y="7" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">H7 / g6 Clearance Fit</text> <!-- Cross-section view --> <!-- Hole (outer circle, larger) --> <circle cx="26" cy="40" r="18" fill="#58CC02" opacity="0.06"/> <circle cx="26" cy="40" r="18" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- Shaft (inner circle, smaller with gap) --> <circle cx="26" cy="40" r="14" fill="#3B8700" opacity="0.1"/> <circle cx="26" cy="40" r="14" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Clearance gap visible between circles --> <text x="26" y="42" font-size="4" fill="#334155" text-anchor="middle">shaft</text> <text x="26" y="62" font-size="4" fill="#334155" text-anchor="middle">hole</text> <!-- Clearance arrow --> <line x1="40" y1="40" x2="44" y2="40" stroke="#6B7280" stroke-width="0.8" opacity="0.5"/> <polygon points="43,38.5 46,40 43,41.5" fill="#6B7280" opacity="0.5"/> <text x="48" y="38" font-size="3.5" fill="#6B7280">gap</text> <!-- Right side: tolerance zone diagram --> <!-- Vertical scale --> <line x1="62" y1="68" x2="62" y2="14" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/> <!-- Nominal line --> <line x1="52" y1="44" x2="76" y2="44" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/> <text x="76" y="46" font-size="3" fill="#6B7280">nom</text> <!-- H7 tolerance zone (starts at nominal, goes up) --> <rect x="54" y="30" width="6" height="14" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="1"/> <text x="57" y="38" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">H7</text> <text x="52" y="29" font-size="3" fill="#334155" text-anchor="end">+0.025</text> <text x="52" y="46" font-size="3" fill="#334155" text-anchor="end">0</text> <!-- g6 tolerance zone (below nominal) --> <rect x="66" y="48" width="6" height="10" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="1"/> <text x="69" y="55" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">g6</text> <text x="74" y="49" font-size="3" fill="#334155">-0.009</text> <text x="74" y="60" font-size="3" fill="#334155">-0.025</text> <!-- Clearance bracket --> <line x1="62" y1="44" x2="62" y2="48" stroke="#A5E86C" stroke-width="1.5" opacity="0.5"> <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/> </line> <text x="62" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">clearance</text> </svg>',
          explanation: 'In the ISO system, uppercase letters denote hole deviations and lowercase letters denote shaft deviations. "H" means the hole has a zero lower deviation (hole starts at nominal).',
          hint: 'Uppercase = hole, lowercase = shaft.'
        },
        {
          id: 'u9-L1-Q8',
          type: 'multiple-choice',
          question: 'Difference between the hole-basis and shaft-basis fit systems, and when would you prefer the shaft-basis system?',
          options: [
            'There is no real difference — both produce the same results, provided all',
            'In a hole-basis system the hole tolerance zone is fixed (H) and the fit',
            'Hole-basis is for metric and shaft-basis is for imperial systems, provided all',
            'Shaft-basis always produces tighter fits than hole-basis, provided all'
          ],
          correctIndex: 1,
          explanation: 'The hole-basis system is most common because it is generally harder (more expensive) to adjust hole size than shaft size .',
          hint: 'Consider when it is cheaper to vary the hole rather.'
        },
        {
          id: 'u9-L1-Q9',
          type: 'multiple-choice',
          question: 'A shaft is specified as ∅25 h6. What are the upper and lower deviations of this shaft?',
          options: [
            'Upper deviation = +0.013 mm, lower deviation = 0.000 mm',
            'Upper deviation = 0.000 mm, lower deviation = −0.013 mm',
            'Upper deviation = +0.013 mm, lower deviation = −0.013 mm',
            'Upper deviation = +0.006 mm, lower deviation = −0.006 mm'
          ],
          correctIndex: 1,
          explanation: 'The fundamental deviation "h" for a shaft means the upper deviation is zero — the shaft at its largest equals the nominal size. The tolerance zone extends below nominal.',
          hint: 'The lowercase "h" for shafts means the tolerance zone lies.'
        },
        {
          id: 'u9-L1-Q10',
          type: 'true-false',
          question: 'A transition fit can result in either a small clearance or a small interference between mating parts, depending on the actual?',
          correctAnswer: true,
          explanation: 'A transition fit is defined by overlapping tolerance zones of the hole and shaft.',
          hint: 'If the shaft and hole tolerance zones overlap, what.'
        },
        {
          id: 'u9-L1-Q11',
          type: 'multiple-choice',
          question: 'You need to select a fit for a gear hub on a keyed shaft. Which fit type is most appropriate?',
          options: [
            'H7/d9 — a loose running clearance fit',
            'H7/s6 — a heavy interference press fit',
            'H7/k6 — a transition (locational) fit that provides accurate centering',
            'H11/c11 — an extra-loose clearance fit — typically a minor contributing factor'
          ],
          correctIndex: 2,
          explanation: 'H7/k6 is a locational transition fit ideal for components that need precise centering on a shaft but must be removable. It may produce a very slight clearance or very light interference.',
          hint: 'Consider a fit that centers accurately but does.'
        },
        {
          id: 'u9-L1-Q12',
          type: 'multiple-choice',
          question: 'What is the relationship between tolerance grade number (IT number) and the magnitude of the tolerance?',
          options: [
            'Higher IT numbers indicate tighter tolerances',
            'Higher IT numbers indicate wider (looser) tolerances — IT01 is the tightest',
            'IT numbers are unrelated to tolerance magnitude — they refer to surface finish',
            'All IT grades have the same tolerance magnitude but differ in the position'
          ],
          correctIndex: 1,
          explanation: 'ISO tolerance grades range from IT01 (tightest, used for gauge blocks) through IT18 (loosest, rough castings/forgings).',
          hint: 'Consider the scale: IT01 for gauge blocks, IT16 for rough.'
        },
        {
          id: 'u9-L1-Q13',
          type: 'true-false',
          question: 'In the ISO system, for a given IT grade, the tolerance value is constant regardless of the nominal diameter.',
          correctAnswer: false,
          explanation: 'The tolerance value increases with nominal diameter. For example, IT7 tolerance for ∅6-10 mm is 0.015 mm, but for ∅100-120 mm it is 0.035 mm.',
          hint: 'Is it equally easy to hold ±0.01 mm on a 5 mm part.'
        },
        {
          id: 'u9-L1-Q14',
          type: 'multiple-choice',
          question: 'A designer specifies ∅30 +0.021/+0.000 mm for a bore. What type of tolerancing is this?',
          options: [
            'Bilateral symmetric tolerancing — which contradicts established test results',
            'Bilateral asymmetric tolerancing, which limits its practical applicability',
            'Unilateral tolerancing — both deviations are on the same side of nominal',
            'Limit dimensioning'
          ],
          correctIndex: 2,
          explanation: 'Both deviations are on the same side of nominal (zero and positive), making this unilateral tolerancing. The bore ranges from ∅30.000 to ∅30.021 mm, always at or above nominal.',
          hint: 'Look at whether the deviations straddle the nominal.'
        },
        {
          id: 'u9-L1-Q15',
          type: 'multiple-choice',
          question: 'What is "limit dimensioning" and when is it preferred over plus/minus tolerancing?',
          options: [
            'Limit dimensioning is another name for bilateral tolerancing, provided all',
            'Limit dimensioning directly states the maximum and minimum acceptable sizes',
            'Limit dimensioning only applies to angular dimensions, provided all secondary',
            'Limit dimensioning means using the tightest possible tolerance for every'
          ],
          correctIndex: 1,
          explanation: 'Limit dimensioning presents the two extreme acceptable values directly (e.g., ∅30.021 over ∅30.000). The machinist does not need to add or subtract deviations from a nominal .',
          hint: 'Consider which method gives the machinist the clearest.'
        },
        {
          id: 'u9-L1-Q16',
          type: 'true-false',
          question: 'The "basic size" (nominal size) in an ISO fit system is the size from which all deviations are calculated, and it is the same?',
          correctAnswer: true,
          explanation: 'The basic (nominal) size is the common reference dimension for both the hole and the shaft. For example, in a ∅25 H7/g6 fit, the basic size is 25 mm for both parts.',
          hint: 'If the hole and shaft had different nominal sizes,.'
        },
        {
          id: 'u9-L1-Q17',
          type: 'multiple-choice',
          question: 'Calculate the maximum clearance for a ∅50 H8/f7 fit where H8 gives ∅50.000/50.039 and f7 gives ∅49.950/49.975.',
          options: [
            '0.025 mm',
            '0.039 mm',
            '0.089 mm',
            '0.064 mm'
          ],
          correctIndex: 2,
          explanation: 'Maximum clearance = maximum hole size − minimum shaft size = 50.039 − 49.950 = 0.089 mm. This is the loosest possible fit condition.',
          hint: 'Maximum clearance occurs when the hole is at its largest.'
        },
        {
          id: 'u9-L1-Q18',
          type: 'fill-blank',
          question: 'A fit where the tolerance zones of the hole and shaft overlap, potentially resulting in either clearance or interference, is?',
          blanks: ['transition'],
          wordBank: ['transition', 'clearance', 'interference', 'sliding', 'running'],
          explanation: 'A transition fit has overlapping tolerance zones, meaning the actual outcome depends on where the individual parts fall within their tolerance bands.',
          hint: 'This fit type sits between clearance and interference.'
        },
        {
          id: 'u9-L1-Q19',
          type: 'multiple-choice',
          question: 'Why is the H7/H6 hole tolerance more commonly used than custom fundamental deviations (e.g., G7, K7) in everyday engineering practice?',
          options: [
            'H-type holes have zero lower deviation',
            'H-type holes are always more precise than other letter deviations',
            'Non-H holes are not permitted under ASME standards',
            'H holes are only used in metric — imperial systems use different letters,'
          ],
          correctIndex: 0,
          explanation: 'Standard reamers, boring bars, and broaches are manufactured to produce H-type holes (zero lower deviation = hole at nominal minimum). Using H holes means off-the-shelf tooling can be used.',
          hint: 'Consider tooling availability.'
        },
        {
          id: 'u9-L1-Q20',
          type: 'multiple-choice',
          question: 'How does the required interference relate to the torque capacity?',
          options: [
            'Torque capacity is independent of interference — only surface area matters',
            'Greater interference generates higher contact pressure',
            'The interference must be at least 1% of the shaft diameter regardless',
            'Press fits cannot transmit torque — a key or spline is always required'
          ],
          correctIndex: 1,
          explanation: 'The torque transmitted by an interference fit depends on: contact pressure (p), which is a function of interference, material properties, and geometry (thick-walled cylinder theory — Lame equations).',
          hint: 'The friction force depends on normal pressure,.'
        },
        {
          id: 'u9-L1-Q21',
          type: 'true-false',
          question: 'When specifying tolerances, the designer should always use the tightest tolerance achievable by the manufacturing process to?',
          correctAnswer: false,
          explanation: 'Over-tolerancing (specifying tolerances tighter than functionally necessary) dramatically increases manufacturing cost, inspection time, and scrap rate without improving product function.',
          hint: 'What happens to cost and scrap when you make tolerances.'
        },
        {
          id: 'u9-L1-Q22',
          type: 'multiple-choice',
          question: 'The fit is H7/p6 (light interference) at 20°C. What happens to the fit at operating temperature, and how do you address it?',
          options: [
            'Nothing — the fit does not change with temperature since both parts are steel',
            'The shaft expands more than the housing due to the higher temperature,',
            'The fit loosens',
            'Temperature effects are negligible for interference fits'
          ],
          correctIndex: 1,
          explanation: 'Differential thermal expansion is critical for interference fits.',
          hint: 'If the shaft is much hotter than the housing, it expands.'
        },
        {
          id: 'u9-L1-Q23',
          type: 'multiple-choice',
          question: 'What is the difference between "tolerance" and "allowance" in the context of fits?',
          options: [
            'They are synonyms and are used interchangeably',
            'Tolerance is total permissible variation in one part',
            'Tolerance applies to holes, allowance to shafts',
            'Allowance is always larger than tolerance'
          ],
          correctIndex: 1,
          explanation: 'Tolerance is a single-part concept — the difference between the maximum and minimum limits of a dimension (e.g., a 0.02 mm tolerance band).',
          hint: 'One describes variation in a single dimension; the other.'
        },
        {
          id: 'u9-L1-Q24',
          type: 'fill-blank',
          question: 'In the ISO system, an "H" hole has its _____ deviation equal to zero, while an "h" shaft has its _____ deviation equal to zero.',
          blanks: ['lower', 'upper'],
          wordBank: ['lower', 'upper', 'fundamental', 'nominal', 'bilateral'],
          explanation: 'For an H-type hole, the fundamental (lower) deviation is zero, meaning the minimum hole size equals the basic (nominal) size. The tolerance zone extends above nominal.',
          hint: 'The H hole starts at nominal and extends upward.'
        },
        {
          id: 'u9-L1-Q25',
          type: 'multiple-choice',
          question: 'Which correctly ranks these manufacturing processes from tightest to loosest typical tolerance capability?',
          options: [
            'Sand casting → milling → grinding → lapping',
            'Lapping → grinding → turning → milling → die casting → sand casting',
            'Milling → grinding → lapping → sand casting',
            'Grinding → lapping → milling → sand casting — not supported by standard'
          ],
          correctIndex: 1,
          explanation: 'Typical tolerance capabilities (IT grades).',
          hint: 'Consider which processes remove material most precisely.'
        },
        {
          id: 'u9-L1-Q26',
          type: 'multiple-choice',
          question: 'A drawing callout shows ∅20 ±0.05 with a note "INTERPRET PER ASME Y14.5-2018." Under Rule #1, what does this imply about the?',
          options: [
            'Any form is acceptable if two-point measurement is OK',
            'At MMC the feature must have perfect form per Rule #1',
            'Form control requires separate GD&T callout always',
            'Rule #1 only applies to angles, not to diameters'
          ],
          correctIndex: 1,
          explanation: 'ASME Y14.5 Rule #1 (the Envelope Principle or Taylor Principle) states that the surface of a regular feature of size at MMC must not extend beyond the envelope of perfect form at MMC.',
          hint: 'ASME Rule #1 ties form control to the MMC size.'
        },
        {
          id: 'u9-L1-Q27',
          type: 'true-false',
          question: 'The ISO default for regular features of size is the Envelope Principle (perfect form at MMC), the same as ASME Y14.5 Rule #1.',
          correctAnswer: false,
          explanation: 'This is a key difference between ASME and ISO standards. ASME Y14.5 applies the Envelope Principle (Rule #1) by default to all regular features of size.',
          hint: 'ASME and ISO have different default rules.'
        },
        {
          id: 'u9-L1-Q28',
          type: 'multiple-choice',
          question: 'A general tolerance block on a drawing states "ISO 2768-mK." What does this mean?',
          options: [
            'The material is specified as grade mK steel, which would only hold true if',
            '"m" specifies the general dimensional tolerance class (medium) and "K"',
            'The measurement unit is millimeters with Kelvin for temperature',
            'The drawing scale is medium (m) and the projection angle is K'
          ],
          correctIndex: 1,
          explanation: 'ISO 2768 provides default ("general") tolerances for dimensions and geometries that do not have individual callouts.',
          hint: 'ISO 2768 has two parts.'
        },
        {
          id: 'u9-L1-Q29',
          type: 'multiple-choice',
          question: 'The pin must be easy to push in by hand but have negligible clearance. Which fit is most appropriate?',
          options: [
            'H7/s6 — heavy press fit for maximum holding force, without considering',
            'H7/h6 — sliding fit with very small clearance allowing hand insertion',
            'H11/c11 — extra-loose running fit for easy assembly',
            'H7/p6 — light press fit requiring an arbor press — rarely the controlling'
          ],
          correctIndex: 1,
          explanation: 'H7/h6 is a precision sliding fit (also called a "push fit" or "snug fit") that allows hand insertion with very little clearance.',
          hint: 'You want minimal play but hand-insertable.'
        },
        {
          id: 'u9-L1-Q30',
          type: 'fill-blank',
          question: 'When both the upper and lower deviations of a tolerance are on the same side of the nominal dimension, this is called _____ tolerancing.',
          blanks: ['unilateral'],
          wordBank: ['unilateral', 'bilateral', 'symmetric', 'limit', 'geometric'],
          explanation: 'Unilateral tolerancing places both deviations on one side of nominal — either both positive (e.g., +0.00/+0.05) or both negative (e.g., −0.05/−0.00).',
          hint: 'Both deviations are on one side.'
        }
      ]
    },
    {
      id: 'u9-L2',
      title: 'Geometric Tolerancing',
      description: 'Form (flatness, cylindricity, circularity, straightness), orientation (perpendicularity, angularity, parallelism), MMC/LMC, bonus tolerance.',
      icon: '🔷',
      xpReward: 25,
      questions: [
        {
          id: 'u9-L2-Q1',
          type: 'multiple-choice',
          question: 'Why is position tolerance almost always applied at MMC rather than RFS for clearance-hole bolt patterns?',
          options: [
            'MMC is simply the default — there is no functional reason to prefer it over',
            'At MMC holes are smallest, shafts largest \u2014 tightest',
            'RFS is actually preferred but MMC is cheaper to inspect',
            'MMC only applies to shafts, not holes, for bolts only'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Feature Control Frame --> <!-- Outer frame box --> <rect x="6" y="12" width="68" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/> <!-- Compartment dividers --> <line x1="22" y1="12" x2="22" y2="26" stroke="#3B8700" stroke-width="1.2"/> <line x1="40" y1="12" x2="40" y2="26" stroke="#3B8700" stroke-width="1.2"/> <line x1="52" y1="12" x2="52" y2="26" stroke="#3B8700" stroke-width="1.2"/> <line x1="60" y1="12" x2="60" y2="26" stroke="#3B8700" stroke-width="1.2"/> <!-- Geometric symbol (position = crosshair in circle) --> <circle cx="14" cy="19" r="4" stroke="#58CC02" stroke-width="1.2" fill="none"/> <line x1="14" y1="15" x2="14" y2="23" stroke="#58CC02" stroke-width="1"/> <line x1="10" y1="19" x2="18" y2="19" stroke="#58CC02" stroke-width="1"/> <!-- Diameter symbol + tolerance value --> <text x="24" y="22" font-size="5" fill="#334155">∅ 0.25</text> <!-- MMC modifier --> <text x="42" y="22" font-size="5" fill="#334155" font-weight="bold">M</text> <circle cx="46" cy="19" r="4" stroke="#334155" stroke-width="0.8" fill="none"/> <!-- Datum A --> <text x="54" y="22" font-size="6" fill="#334155" font-weight="bold">A</text> <!-- Datum B --> <text x="63" y="22" font-size="6" fill="#334155" font-weight="bold">B</text> <!-- Labels below with lines --> <!-- Geometric symbol label --> <line x1="14" y1="26" x2="14" y2="34" stroke="#6B7280" stroke-width="0.5" opacity="0.4"/> <text x="14" y="40" font-size="4" fill="#6B7280" text-anchor="middle">Geo.</text> <text x="14" y="45" font-size="4" fill="#6B7280" text-anchor="middle">symbol</text> <!-- Tolerance label --> <line x1="31" y1="26" x2="31" y2="34" stroke="#6B7280" stroke-width="0.5" opacity="0.4"/> <text x="31" y="40" font-size="4" fill="#6B7280" text-anchor="middle">Tolerance</text> <text x="31" y="45" font-size="4" fill="#6B7280" text-anchor="middle">value</text> <!-- Modifier label --> <line x1="46" y1="26" x2="46" y2="34" stroke="#6B7280" stroke-width="0.5" opacity="0.4"/> <text x="46" y="40" font-size="4" fill="#6B7280" text-anchor="middle">Mod.</text> <text x="46" y="45" font-size="4" fill="#6B7280" text-anchor="middle">(MMC)</text> <!-- Datum label --> <line x1="60" y1="26" x2="60" y2="34" stroke="#6B7280" stroke-width="0.5" opacity="0.4"/> <text x="60" y="40" font-size="4" fill="#6B7280" text-anchor="middle">Datum</text> <text x="60" y="45" font-size="4" fill="#6B7280" text-anchor="middle">refs</text> <!-- Example part sketch below --> <rect x="14" y="54" width="52" height="16" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1"/> <!-- Hole in part --> <circle cx="40" cy="62" r="4" fill="white" stroke="#3B8700" stroke-width="1"/> <!-- Leader line from FCF to hole --> <line x1="40" y1="26" x2="40" y2="54" stroke="#3B8700" stroke-width="0.6" stroke-dasharray="2,2" opacity="0.3"/> <!-- Datum A triangle --> <polygon points="14,70 12,75 16,75" fill="#3B8700" opacity="0.4"/> <text x="14" y="78" font-size="4" fill="#334155" text-anchor="middle">A</text> </svg>',
          explanation: 'The functional requirement for a bolt pattern is that the bolts pass through the holes.',
          hint: 'Consider when assembly fit is tightest and when extra.'
        },
        {
          id: 'u9-L2-Q2',
          type: 'multiple-choice',
          question: 'What is wrong with this callout, and what should they use instead?',
          options: [
            'Nothing is wrong — flatness can apply to any surface',
            'Flatness only applies to planar surfaces',
            'They should use straightness instead of flatness since the bore is long',
            'The issue is that flatness needs a datum reference and they forgot to add one'
          ],
          correctIndex: 1,
          explanation: 'Flatness is a form tolerance that applies only to nominally flat (planar) surfaces .',
          hint: 'Consider which geometric surfaces each form tolerance.'
        },
        {
          id: 'u9-L2-Q3',
          type: 'multiple-choice',
          question: 'When would you specify a profile of a surface tolerance instead of combining individual form and orientation tolerances?',
          options: [
            'Profile tolerance is only used for aesthetic surfaces where appearance matters',
            'When you need to control the shape, orientation, and location of a complex',
            'Profile is always preferred',
            'Only when the surface is flat — profile cannot be applied to curved surfaces'
          ],
          correctIndex: 1,
          explanation: 'Profile of a surface is the most versatile GD&T tolerance — it controls form, orientation, size, and location simultaneously relative to datums.',
          hint: 'Consider complex surfaces where multiple geometric.'
        },
        {
          id: 'u9-L2-Q4',
          type: 'multiple-choice',
          question: 'Parts are passing CMM inspection for position tolerance but consistently failing during assembly. What are the most likely causes?',
          options: [
            'The parts are defective — CMM results must be wrong, provided all secondary',
            'The CMM datum setup does not replicate the actual assembly datum contacts',
            'Position tolerance is not relevant to assembly — only size matters, provided',
            'The CMM is measuring in metric but the assembly is designed in imperial units,'
          ],
          correctIndex: 1,
          explanation: 'This is one of the most common GD&T problems in manufacturing.',
          hint: 'If inspection says "pass" but reality says "fail,".'
        },
        {
          id: 'u9-L2-Q5',
          type: 'multiple-choice',
          question: 'When should the LMC (Least Material Condition) modifier be used instead of MMC?',
          options: [
            'When maximizing assembly clearance is the primary concern, valid only',
            'When controlling minimum wall thickness between features',
            'When reducing manufacturing cost is the main goal',
            'When the feature is a shaft rather than a hole, relative to the test standard'
          ],
          correctIndex: 1,
          explanation: 'LMC is used when the critical concern is minimum wall thickness or minimum remaining material — for example, a hole close to an edge, or a bore close to an outer diameter.',
          hint: 'Consider when having less material is the dangerous.'
        },
        {
          id: 'u9-L2-Q6',
          type: 'fill-blank',
          question: 'The condition where a feature of size contains the maximum amount of material is called ___.',
          blanks: ['MMC'],
          wordBank: ['MMC', 'LMC', 'RFS', 'MMS', 'VCB'],
          explanation: 'Maximum Material Condition (MMC) is when a feature has the most material: smallest hole or largest shaft. It represents the tightest fit condition between mating parts.',
          hint: 'This condition represents the most material everywhere.'
        },
        {
          id: 'u9-L2-Q7',
          type: 'multiple-choice',
          question: 'List the five categories of geometric tolerances defined in ASME Y14.5.',
          options: [
            'Size, position, form, finish, and material',
            'Form, orientation, location, profile, and runout',
            'Flatness, roundness, straightness, parallelism, and position',
            'Primary, secondary, tertiary, quaternary, and quinary'
          ],
          correctIndex: 1,
          explanation: 'ASME Y14.5 defines five categories: Form — flatness, straightness, circularity, cylindricity;.',
          hint: 'Think of the five groups that contain the 14 geometric.'
        },
        {
          id: 'u9-L2-Q8',
          type: 'multiple-choice',
          question: 'What is the difference between circularity and cylindricity?',
          options: [
            'They are the same tolerance applied in different units',
            'Circularity controls the roundness of individual cross-sections (2D), while',
            'Circularity applies to internal features and cylindricity to external features',
            'Cylindricity is always tighter than circularity'
          ],
          correctIndex: 1,
          explanation: 'Circularity (roundness) applies to individual cross-sections perpendicular to the axis — the tolerance zone is two concentric circles.',
          hint: 'One is a 2D slice control, the other is a full 3D surface.'
        },
        {
          id: 'u9-L2-Q9',
          type: 'multiple-choice',
          question: 'The hole has a size tolerance of ∅10.0-10.5. What is the total positional tolerance allowed when the hole is produced at ∅10.3?',
          options: [
            '∅0.25 — the tolerance is fixed regardless of actual size, for geometries',
            '∅0.55 — the stated tolerance (0.25) plus the departure from MMC',
            '∅0.30 — only the bonus tolerance applies',
            '∅0.50 — twice the stated tolerance'
          ],
          correctIndex: 1,
          explanation: 'With the MMC modifier, bonus tolerance = actual size − MMC size. The hole MMC is ∅10.0 (smallest hole = most material). At ∅10.3: bonus = 10.3 − 10.0 = 0.30.',
          hint: 'Bonus = departure from MMC.'
        },
        {
          id: 'u9-L2-Q10',
          type: 'true-false',
          question: 'Form tolerances require datum references in the feature control frame.',
          correctAnswer: false,
          explanation: 'Form tolerances are self-referencing — they control the shape of a feature relative to itself, not to any external datum.',
          hint: 'Form tolerances measure a feature against its own ideal.'
        },
        {
          id: 'u9-L2-Q11',
          type: 'multiple-choice',
          question: 'What is the difference between circular runout and total runout?',
          options: [
            'Circular runout applies to round features and total runout applies to flat',
            'Circular runout measures individual cross-sections (one at a time) as the part',
            'Total runout is always twice the circular runout value',
            'They are measured with different instruments but control the same characteristic'
          ],
          correctIndex: 1,
          explanation: 'Circular runout (single arrow symbol) controls the full indicator movement (FIM) at each individual cross-section independently as the part rotates 360° about the datum axis.',
          hint: 'One checks cross-section by cross-section; the other.'
        },
        {
          id: 'u9-L2-Q12',
          type: 'multiple-choice',
          question: 'A perpendicularity tolerance of 0.05 is applied to a flat surface relative to datum A. What is the shape of the tolerance zone?',
          options: [
            'A cylinder of ∅0.05 around the surface normal axis',
            'Two planes 0.05 apart, perpendicular to datum A',
            'A single plane exactly 0.05 away from datum A',
            'A square zone of 0.05 × 0.05 around the feature'
          ],
          correctIndex: 1,
          explanation: 'When perpendicularity is applied to a surface (not preceded by a diameter symbol), the tolerance zone is two parallel planes 0.05 mm apart, oriented exactly 90° to datum A.',
          hint: 'For a surface control, the zone is two parallel planes.'
        },
        {
          id: 'u9-L2-Q13',
          type: 'multiple-choice',
          question: 'What is the "virtual condition" of an external feature (shaft) specified at ∅20.0 ± 0.1 with a perpendicularity tolerance of ∅0.05 at MMC?',
          options: [
            '∅20.00 — just the nominal size of the feature',
            '∅20.15 — MMC size (20.1) plus geometric tol (0.05)',
            '∅20.10 — just the MMC size, incomplete explanation',
            '∅20.05 — nominal size plus geometric tolerance'
          ],
          correctIndex: 1,
          explanation: 'Virtual condition is the worst-case boundary that a feature can occupy, considering both its size and geometric tolerance. For an external feature at MMC.',
          hint: 'The worst-case boundary for an external feature = largest.'
        },
        {
          id: 'u9-L2-Q14',
          type: 'true-false',
          question: 'Straightness applied to the axis of a cylindrical feature allows the feature to violate Rule #1 — meaning the actual local sizes?',
          correctAnswer: true,
          explanation: 'This is one of the important exceptions to Rule #1.',
          hint: 'Axis straightness with ∅ creates a virtual condition.'
        },
        {
          id: 'u9-L2-Q15',
          type: 'multiple-choice',
          question: 'What is the key difference between concentricity and position (at RFS) for controlling coaxiality of two diameters?',
          options: [
            'They produce identical results and are interchangeable, provided all secondary',
            'Concentricity controls the median points (derived median line) of the feature',
            'Position is less accurate than concentricity, provided all secondary effects',
            'Concentricity can use material condition modifiers but position cannot,'
          ],
          correctIndex: 1,
          explanation: 'Concentricity requires establishing the derived median line — the locus of midpoints of all diametrically opposed surface points — which requires many measurement points and complex calculations.',
          hint: 'One requires median-point analysis (expensive); the other.'
        },
        {
          id: 'u9-L2-Q16',
          type: 'multiple-choice',
          question: 'An angularity tolerance of 0.1 is applied to a surface at 45° to datum A. What does this control?',
          options: [
            'The surface must be at exactly 45° ± 0.1° to datum A',
            'Surface between two planes 0.1 apart at 45\xB0 to A',
            'The feature must be within a cylindrical zone of ∅0.1',
            'The surface must be flat within 0.1 tolerance'
          ],
          correctIndex: 1,
          explanation: 'Angularity is an orientation tolerance, not an angular dimension tolerance. The basic angle (45°) is theoretically exact (no tolerance on the angle itself).',
          hint: 'The basic angle is theoretically exact.'
        },
        {
          id: 'u9-L2-Q17',
          type: 'multiple-choice',
          question: 'What is the "bonus tolerance" in GD&T, and when does it apply?',
          options: [
            'An extra tolerance given to preferred suppliers, provided all secondary',
            'Additional positional or orientation tolerance gained when a feature\'s actual',
            'A tolerance added by the inspector when parts are borderline',
            'The difference between the drawing tolerance and the general tolerance block'
          ],
          correctIndex: 1,
          explanation: 'Bonus tolerance is the additional geometric tolerance gained as a feature of size departs from the specified material condition.',
          hint: 'When a hole is larger than its minimum, does it need.'
        },
        {
          id: 'u9-L2-Q18',
          type: 'fill-blank',
          question: 'The geometric tolerance that controls the overall 3D form of a cylindrical surface — combining roundness, straightness, and?',
          blanks: ['cylindricity'],
          wordBank: ['cylindricity', 'circularity', 'concentricity', 'straightness', 'total runout'],
          explanation: 'Cylindricity is the most comprehensive form tolerance for cylindrical features. Its tolerance zone is two coaxial cylinders — every point on the feature surface must lie between them.',
          hint: 'This form tolerance captures every possible shape error.'
        },
        {
          id: 'u9-L2-Q19',
          type: 'multiple-choice',
          question: 'A designer applies a parallelism tolerance of 0.02 to a surface. Must the surface also be flat within 0.02?',
          options: [
            'No — parallelism and flatness are independent controls',
            'Yes — orientation tolerances inherently control form',
            'Only if a separate flatness callout is also applied',
            'Parallelism does not apply to surfaces, only axes'
          ],
          correctIndex: 1,
          explanation: 'Orientation tolerances inherently refine form. If a surface must lie between two parallel planes 0.02 apart (the parallelism zone), then by definition it cannot have flatness error greater than 0.02.',
          hint: 'If a surface is constrained between two planes 0.02 apart.'
        },
        {
          id: 'u9-L2-Q20',
          type: 'true-false',
          question: 'Position tolerance in ASME Y14.5 always requires at least one datum reference in the feature control frame.',
          correctAnswer: true,
          explanation: 'Position tolerance defines where a feature is located relative to other features — this inherently requires a reference frame.',
          hint: 'Position means "where relative to something.".'
        },
        {
          id: 'u9-L2-Q21',
          type: 'multiple-choice',
          question: 'What is the fixed fastener formula for calculating the required positional tolerance for a clearance hole pattern?',
          options: [
            'T = hole size × bolt size product formula',
            'T = (MMC hole − MMC fastener) / 2 per part',
            'T = hole size + bolt size summed together',
            'T = MMC hole size minus LMC bolt size value'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Top plate --> <rect x="10" y="24" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="24" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bottom plate --> <rect x="10" y="36" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="36" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bolt shaft (through both plates) --> <rect x="38" y="16" width="4" height="38" rx="1" fill="#3B8700" opacity="0.25"/> <rect x="38" y="16" width="4" height="38" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Bolt head (hex, top) --> <rect x="34" y="12" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="12" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Nut (hex, bottom) --> <rect x="34" y="52" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="52" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Washer (top) --> <rect x="36" y="18" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Washer (bottom) --> <rect x="36" y="50" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Thread marks on bolt shaft --> <line x1="38.5" y1="44" x2="41.5" y2="43" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="46" x2="41.5" y2="45" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="48" x2="41.5" y2="47" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <!-- Preload/clamping force arrows (pulsing) --> <g> <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/> <!-- Bolt tension (upward on bolt) --> <line x1="40" y1="22" x2="40" y2="16" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,17 40,14 41.5,17" fill="#3B8700"/> <!-- Bolt tension (downward on bolt) --> <line x1="40" y1="48" x2="40" y2="54" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,53 40,56 41.5,53" fill="#3B8700"/> <!-- Clamping compression (plates pushed together) --> <polygon points="24,22 26,19 28,22" fill="#58CC02" opacity="0.5"/> <polygon points="24,48 26,51 28,48" fill="#58CC02" opacity="0.5"/> <polygon points="52,22 54,19 56,22" fill="#58CC02" opacity="0.5"/> <polygon points="52,48 54,51 56,48" fill="#58CC02" opacity="0.5"/> </g> <!-- Labels --> <text x="22" y="10" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">F_preload</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">clamping force</text> </svg>',
          explanation: 'For the fixed fastener case (bolt is threaded into one part, passes through a clearance hole in the other), each part gets half the available clearance as positional tolerance.',
          hint: 'In the fixed case, one part has the threaded hole.'
        },
        {
          id: 'u9-L2-Q22',
          type: 'multiple-choice',
          question: 'What does the lower segment control?',
          options: [
            'Same as upper segment but with a tighter tolerance',
            'FRTZF controls pattern location relative to datums',
            'Lower segment applies only to the smallest hole',
            'The lower segment overrides upper segment entirely'
          ],
          correctIndex: 1,
          explanation: 'Composite position tolerance has two levels: the upper segment (PLTZF — Pattern Locating Tolerance Zone Framework) locates the entire pattern relative to the specified datums (A, B, C).',
          hint: 'Two levels: one for where the whole pattern sits, one.'
        },
        {
          id: 'u9-L2-Q23',
          type: 'true-false',
          question: 'A flatness tolerance of 0.01 mm can be larger than the size tolerance on the same feature under ASME Y14.5 Rule #1.',
          correctAnswer: false,
          explanation: 'Under Rule #1 (the Envelope Principle), the feature must have perfect form at MMC.',
          hint: 'Rule #1 already limits form error to the amount of size.'
        },
        {
          id: 'u9-L2-Q24',
          type: 'multiple-choice',
          question: 'What is the projected tolerance zone, and when is it used?',
          options: [
            'Zone extending beyond feature into mating part space',
            'A tolerance zone applied only in projected 2D views',
            'Zone projected onto datum plane for measurement ease',
            'An enlarged tolerance zone used for prototype parts'
          ],
          correctIndex: 0,
          explanation: 'A projected tolerance zone (indicated by circled P in the feature control frame) extends from the feature surface into the mating part space for a specified height.',
          hint: 'What happens when a bolt in a tilted tapped hole extends.'
        },
        {
          id: 'u9-L2-Q25',
          type: 'multiple-choice',
          question: 'A surface has both a flatness tolerance of 0.01 and a parallelism tolerance of 0.05 to datum A. Is this a valid callout?',
          options: [
            'Yes — the flatness refines the form within the larger parallelism zone',
            'No — flatness must always be larger than parallelism',
            'No — you cannot apply both flatness and parallelism to the same surface —',
            'Yes, but the flatness overrides the parallelism, making the 0.05 meaningless'
          ],
          correctIndex: 0,
          explanation: 'This is a valid and common callout. The parallelism tolerance (0.05) defines a zone within which the surface must lie, controlling both its orientation and its form to 0.05.',
          hint: 'A form tolerance tighter than the orientation tolerance.'
        },
        {
          id: 'u9-L2-Q26',
          type: 'fill-blank',
          question: 'In ASME Y14.5-2018, the default modifier is _____, meaning no _____ tolerance is available unless MMC or LMC is explicitly stated.',
          blanks: ['RFS', 'bonus'],
          wordBank: ['RFS', 'bonus', 'MMC', 'datum', 'LMC', 'profile'],
          explanation: 'In ASME Y14.5-2018 (and the 2009 edition), RFS (Regardless of Feature Size) is the default — no symbol is needed in the feature control frame.',
          hint: 'If no modifier symbol appears in the feature control.'
        },
        {
          id: 'u9-L2-Q27',
          type: 'multiple-choice',
          question: 'You need to control the wobble of a turned flange face relative to the shaft axis. Which geometric tolerance is most appropriate?',
          options: [
            'Flatness — to ensure the face surface is flat',
            'Circular runout — controls face wobble as part rotates',
            'Parallelism — face parallel to a reference surface',
            'Straightness — to control line elements on the face'
          ],
          correctIndex: 1,
          explanation: 'Circular runout applied to a face perpendicular to the datum axis controls "wobble" — the axial full indicator movement (FIM) at each radial position as the part rotates 360°.',
          hint: 'Wobble is detected by rotating the part about its axis.'
        },
        {
          id: 'u9-L2-Q28',
          type: 'multiple-choice',
          question: 'What is the "zero tolerance at MMC" concept, and what advantage does it offer?',
          options: [
            'It means no tolerance is applied — the feature is free-form, provided all',
            'The stated geometric tolerance is zero at MMC',
            'It means the feature must be exactly at MMC with no size variation, provided',
            'Zero tolerance at MMC is not a valid GD&T concept, provided all secondary'
          ],
          correctIndex: 1,
          explanation: 'With zero positional tolerance at MMC, the feature has no positional tolerance at its MMC size .',
          hint: 'If the geometric tolerance is zero at MMC, where does all.'
        },
        {
          id: 'u9-L2-Q29',
          type: 'true-false',
          question: 'Profile of a line and profile of a surface are functionally identical — they control the same thing.',
          correctAnswer: false,
          explanation: 'Profile of a line controls the profile at individual cross-sections (2D slices) independently — each section must lie within the zone, but sections do not relate to each other.',
          hint: 'Similar to circularity vs. cylindricity.'
        },
        {
          id: 'u9-L2-Q30',
          type: 'multiple-choice',
          question: 'What does the MMC modifier on datums B and C mean?',
          options: [
            'It means the datums must be inspected at their MMC size, provided all',
            'When datum features B and C depart from their MMC size, the datum reference',
            'It means the tolerance only applies when datums B and C are at MMC, provided',
            'The modifier on datums is ignored — it only matters on the tolerance value'
          ],
          correctIndex: 1,
          explanation: 'When a datum feature of size (like a bore or pin) is referenced at MMC, the datum simulator is fixed at the datum\'s virtual condition boundary.',
          hint: 'If the datum feature is larger/smaller than its MMC, does.'
        }
      ]
    },
    {
      id: 'u9-L3',
      title: 'Datum Systems',
      description: 'Datum features, datum reference frame, primary/secondary/tertiary datums, datum targets, fixturing.',
      icon: '📌',
      xpReward: 25,
      questions: [
        {
          id: 'u9-L3-Q1',
          type: 'multiple-choice',
          question: 'Can\'t I just pick any three surfaces? How do you explain the significance of datum precedence?',
          options: [
            'It does not matter — datum letters are just labels and any order works the same',
            'Datum precedence determines which surface is constrained first (most tightly)',
            'The order only matters for CMM programming, not for the actual part function',
            'Primary datum must always be the largest surface, secondary the next largest'
          ],
          correctIndex: 1,
          explanation: 'The primary datum constrains 3 DOF and is contacted first (the part "sits" on it fully). The secondary constrains 2 more DOF, and the tertiary constrains the last 1.',
          hint: 'Consider what changes physically when a part contacts.'
        },
        {
          id: 'u9-L3-Q2',
          type: 'multiple-choice',
          question: 'When selecting datum features for a machined part, which principle should guide the selection?',
          options: [
            'Always select the smallest features as datums — an approximation that loses',
            'Select functional surfaces — datums should represent how the part',
            'Always use three mutually perpendicular flat surfaces — an oversimplification',
            'Select the features with the tightest tolerances as datums, measured relative'
          ],
          correctIndex: 1,
          explanation: 'Datum selection should follow the functional principle: datums should represent the surfaces that locate and constrain the part in its assembly.',
          hint: 'Datums should mirror how the part is located.'
        },
        {
          id: 'u9-L3-Q3',
          type: 'multiple-choice',
          question: 'The part rocks on the CMM granite surface plate. What is the problem, and what GD&T tool solves it?',
          options: [
            'The CMM granite is not flat enough — replace it with a more precise surface',
            'The rough cast surface is unreliable as a full-surface datum',
            'The part needs to be ground flat on the bottom before inspection',
            'Apply a flatness tolerance to datum A and the rocking will be controlled'
          ],
          correctIndex: 1,
          explanation: 'Datum targets specify discrete points, lines, or areas on a surface that establish the datum. They are essential for cast, forged, or sheet metal parts where the entire surface is rough, warped,.',
          hint: 'If the whole surface cannot make reliable contact, how.'
        },
        {
          id: 'u9-L3-Q4',
          type: 'multiple-choice',
          question: 'A cylindrical feature is used as both the primary and secondary datum. What does the bore (datum B) constrain?',
          options: [
            '3 DOF (one translation plus two rotations total)',
            '2 DOF (two translations perpendicular to bore axis)',
            '1 DOF (rotation about the bore axis only)',
            '4 DOF (all but axial translation and rotation)'
          ],
          correctIndex: 1,
          explanation: 'When a cylindrical bore is the secondary datum (after a planar primary datum A constrains 3 DOF), the bore constrains 2 additional DOF.',
          hint: 'The primary plane already constrains 3 DOF.'
        },
        {
          id: 'u9-L3-Q5',
          type: 'multiple-choice',
          question: 'Why does this cause failures?',
          options: [
            'The machinist should just adjust the CNC program offsets until parts pass',
            'Fixture locating surfaces must simulate the drawing\'s datum features',
            'The drawing datums are just for inspection — manufacturing can use whatever',
            'The inspector should re-datum to match the machining fixture setup'
          ],
          correctIndex: 1,
          explanation: 'The manufacturing fixture should replicate the datum reference frame as closely as possible.',
          hint: 'If the part is made using one coordinate system.'
        },
        {
          id: 'u9-L3-Q6',
          type: 'fill-blank',
          question: 'The system of three mutually perpendicular datum planes that fully constrains a part in 6 degrees of freedom is called the datum ___ frame.',
          blanks: ['reference'],
          wordBank: ['reference', 'coordinate', 'alignment', 'constraint', 'feature'],
          explanation: 'The Datum Reference Frame (DRF) is established by three mutually perpendicular datum planes derived from the primary, secondary, and tertiary datum features.',
          hint: 'This is the 3D coordinate system established by the three datums.'
        },
        {
          id: 'u9-L3-Q7',
          type: 'multiple-choice',
          question: 'How many degrees of freedom does a primary datum plane constrain, and which DOFs are they?',
          options: [
            '1 DOF — translation normal to the plane, across the full gauge length',
            '2 DOF — two translations in the plane, prior to any post-processing',
            '3 DOF — one translation (normal to the plane) and two rotations',
            '6 DOF — all degrees of freedom — a common misunderstanding in this context'
          ],
          correctIndex: 2,
          explanation: 'A primary datum plane constrains 3 DOF using a minimum of 3 contact points.',
          hint: 'Place a block on a table.'
        },
        {
          id: 'u9-L3-Q8',
          type: 'multiple-choice',
          question: 'Why is this a good datum selection?',
          options: [
            'It is not — the datums should all be the same size, provided all secondary',
            'The large flat surface provides stable primary support (3 DOF), the long edge',
            'Because the surfaces are labeled in alphabetical order based on their',
            'Because the CMM can probe all three surfaces easily, provided all secondary'
          ],
          correctIndex: 1,
          explanation: 'Good datum selection follows the 3-2-1 principle with practical considerations.',
          hint: 'Stability decreases with each datum level.'
        },
        {
          id: 'u9-L3-Q9',
          type: 'true-false',
          question: 'A datum feature and a datum are the same thing.',
          correctAnswer: false,
          explanation: 'A datum feature is the actual physical feature on the part (e.g., a machined surface, a bore, a pin). A datum is the theoretically perfect geometric element (plane, axis, center point) derived.',
          hint: 'One is the real, imperfect feature on the part.'
        },
        {
          id: 'u9-L3-Q10',
          type: 'multiple-choice',
          question: 'What is a datum simulator, and why is it important?',
          options: [
            'A computer program that calculates datums from CMM data',
            'The physical equipment (surface plate, gauge pin, chuck, fixture)',
            'A software tool for designing datum reference frames',
            'An alternate name for the datum feature itself, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'Datum simulators are the physical embodiment of the theoretical datums. A surface plate simulates a datum plane.',
          hint: 'How does a surface plate establish a datum plane.'
        },
        {
          id: 'u9-L3-Q11',
          type: 'multiple-choice',
          question: 'When a cylindrical feature is used as the primary datum, how many degrees of freedom does it constrain?',
          options: [
            '2 DOF — two translations perpendicular to axis',
            '3 DOF — two translations plus one rotation about it',
            '4 DOF — two translations plus two rotations about it',
            '5 DOF — all except the axial translation only'
          ],
          correctIndex: 2,
          explanation: 'A cylindrical primary datum constrains 4 DOF: two translations (X and Y, perpendicular to the cylinder axis) and two rotations (tilting/rocking about X and Y axes).',
          hint: 'A cylinder centers the part in two directions and prevents.'
        },
        {
          id: 'u9-L3-Q12',
          type: 'multiple-choice',
          question: 'What are datum targets, and when are they preferred over full-surface datum features?',
          options: [
            'Datum targets are tight tolerances applied to datum surfaces',
            'Datum targets are specific points, lines, or areas on a datum feature used',
            'Datum targets are used only for secondary and tertiary datums',
            'Datum targets are the tolerance values assigned to datum features'
          ],
          correctIndex: 1,
          explanation: 'Datum targets specify the exact contact locations for datum establishment. They are designated as points (crosshair symbol), lines, or circular areas on the datum feature.',
          hint: 'When the entire surface cannot provide repeatable contact.'
        },
        {
          id: 'u9-L3-Q13',
          type: 'true-false',
          question: 'Datum features should always have tighter tolerances than the features they control.',
          correctAnswer: false,
          explanation: 'While datum features should be repeatable and stable, there is no absolute rule requiring them to have tighter tolerances than controlled features.',
          hint: 'Are datum feature tolerances dictated by the features they.'
        },
        {
          id: 'u9-L3-Q14',
          type: 'multiple-choice',
          question: 'A part has two coaxial bores that together serve as a single datum axis. How is this indicated on the drawing?',
          options: [
            'Assign different datum letters to each bore (A and B) and reference both',
            'Assign the same datum letter to both bores (e.g., A-A or A on both),',
            'Only use one bore as the datum and ignore the other',
            'Use a datum target on each bore'
          ],
          correctIndex: 1,
          explanation: 'When two or more features together establish a single datum, they are designated as a common datum using the same letter (e.g., datum A applied to both bores, or A-A notation).',
          hint: 'If two bores share the same axis, can they be combined.'
        },
        {
          id: 'u9-L3-Q15',
          type: 'multiple-choice',
          question: 'What is a "customized datum reference frame" and why might it be used?',
          options: [
            'A datum reference frame where the datums are selected by the machinist',
            'A DRF that uses non-standard constraint schemes — for example, constraining',
            'A DRF designed specifically for CMM programming, provided all secondary',
            'A reference frame using more than three datums, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'ASME Y14.5-2018 introduced the concept of customized datum reference frames using DOF constraint symbols in the feature control frame.',
          hint: 'Not all parts fit the standard 3-2-1 constraint model.'
        },
        {
          id: 'u9-L3-Q16',
          type: 'fill-blank',
          question: 'The primary datum plane requires _____ contact points and constrains _____ degrees of freedom.',
          blanks: ['3', '3'],
          wordBank: ['3', '3', '2', '1', '6'],
          explanation: 'Three non-collinear points define a plane. For the primary datum, three high points on the datum feature contact the datum simulator (e.g., surface plate), establishing the primary datum plane.',
          hint: 'How many non-collinear points define a plane in 3D geometry?'
        },
        {
          id: 'u9-L3-Q17',
          type: 'multiple-choice',
          question: 'What is the physical implication of MMC on datum B?',
          options: [
            'Datum axis established at the MMC size of the bore',
            'Datum simulator is a fixed pin at virtual condition',
            'Tolerance only applies when the bore is at MMC size',
            'Bore must be produced at exactly MMC to be a datum'
          ],
          correctIndex: 1,
          explanation: 'When a datum feature of size is referenced at MMC, the datum simulator is fixed at the datum feature\'s virtual condition boundary .',
          hint: 'If the datum bore is bigger than the fixed simulator pin.'
        },
        {
          id: 'u9-L3-Q18',
          type: 'multiple-choice',
          question: 'How should datums be specified to ensure repeatable measurement?',
          options: [
            'Use standard full-surface datums — the flexibility does not matter',
            'Use datum targets with clamping that replicates use',
            'Sheet metal parts do not need datum references',
            'Use only one datum point to minimize deformation'
          ],
          correctIndex: 1,
          explanation: 'Flexible parts require special datum treatment per ASME Y14.5. The drawing should specify whether the part is inspected in the free state or restrained state.',
          hint: 'If the part changes shape depending on how you hold.'
        },
        {
          id: 'u9-L3-Q19',
          type: 'true-false',
          question: 'The order in which datums appear in the feature control frame (left to right) defines their precedence — the leftmost datum is?',
          correctAnswer: true,
          explanation: 'In the feature control frame, datum references are read left to right with decreasing precedence. The first datum compartment (leftmost) is the primary datum, the second is secondary, and.',
          hint: 'The feature control frame reads left to right.'
        },
        {
          id: 'u9-L3-Q20',
          type: 'multiple-choice',
          question: 'What is the difference between a datum axis established from a bore at RFS vs. MMC?',
          options: [
            'There is no difference — the datum axis is always the same, provided all',
            'At RFS, the datum simulator expands or contracts to fit the actual bore',
            'RFS gives a larger datum shift than MMC, provided all secondary effects',
            'MMC requires a different bore than RFS, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'At RFS, the datum simulator is a variable-size element (e.g., an expanding mandrel or mathematical best-fit cylinder) that conforms to the actual bore, producing a unique datum axis with no play.',
          hint: 'Does the datum pin expand to fit the hole (RFS) or stay.'
        },
        {
          id: 'u9-L3-Q21',
          type: 'multiple-choice',
          question: 'Why is it sometimes necessary to specify secondary and tertiary datums even when the primary datum appears to fully locate the feature?',
          options: [
            'It is never necessary — one datum is always sufficient',
            'To fully define measurement coordinate system',
            'Additional datums are only for CMM alignment',
            'Multiple datums are only for position tolerance'
          ],
          correctIndex: 1,
          explanation: 'Consider a position tolerance on a hole pattern relative to only datum A (a plane).',
          hint: 'If the part can slide or rotate on datum A, how do you.'
        },
        {
          id: 'u9-L3-Q22',
          type: 'fill-blank',
          question: 'The 3-2-1 principle states that a complete datum reference frame requires _____ total contact points.',
          blanks: ['6'],
          wordBank: ['6', '3', '9', '5', '4'],
          explanation: 'The 3-2-1 rule is the foundation of workholding and datum establishment. Three non-collinear points define the primary datum plane (constraining 3 DOF: one translation and two rotations).',
          hint: 'Add up: 3 + 2 + 1 = ?'
        },
        {
          id: 'u9-L3-Q23',
          type: 'multiple-choice',
          question: 'A part has a conical (tapered) feature designated as a datum. How does a cone establish a datum?',
          options: [
            'A cone cannot be used as a datum feature at all',
            'Cone establishes both a datum axis and datum point',
            'A cone only establishes a datum plane at its base',
            'Cone establishes two perpendicular datum planes'
          ],
          correctIndex: 1,
          explanation: 'A conical datum feature is unique because it simultaneously establishes a datum axis and a datum point.',
          hint: 'A cone has both an axis and a specific axial position (the.'
        },
        {
          id: 'u9-L3-Q24',
          type: 'multiple-choice',
          question: 'What is the "simultaneous requirement" for datum features in ASME Y14.5?',
          options: [
            'All datums must be manufactured at the same time',
            'Tolerances sharing same DRF and modifier are linked',
            'Three datums must be measured simultaneously on CMM',
            'Datum features must all have the same tolerance'
          ],
          correctIndex: 1,
          explanation: 'The simultaneous requirement (ASME Y14.5-2018, Section 4.19) means that if multiple feature control frames reference the same datums in the same order with the same material condition modifiers,.',
          hint: 'If two hole patterns reference the same datums at MMC,.'
        },
        {
          id: 'u9-L3-Q25',
          type: 'true-false',
          question: 'A datum feature with a flatness tolerance of 0.1 mm establishes a datum plane that also has 0.1 mm of form error.',
          correctAnswer: false,
          explanation: 'This is a critical distinction: the datum feature (the real surface) may have up to 0.1 mm of flatness error. But the datum (the theoretical plane) derived from it is always a perfect, infinite plane.',
          hint: 'Is the datum the real surface or the theoretical plane.'
        },
        {
          id: 'u9-L3-Q26',
          type: 'multiple-choice',
          question: 'What datums would typically be specified?',
          options: [
            'Only the flange face — one datum is sufficient',
            'Flange face primary (A), bore secondary, hole clocks',
            'Two of the four holes serve as datums A and B',
            'Outer diameter of the flange as the only datum'
          ],
          correctIndex: 1,
          explanation: 'For a circular bolt pattern on a flange.',
          hint: 'The flange sits on a face, centers on a bore, and clocks.'
        },
        {
          id: 'u9-L3-Q27',
          type: 'multiple-choice',
          question: 'What happens if the primary datum feature has poor form (e.g., significant waviness) and no datum targets are specified?',
          options: [
            'Datum plane is wavy, matching the actual surface',
            'Part rocks on simulator, contacting different points',
            'CMM software automatically corrects for poor form',
            'Poor form on datum feature has no effect at all'
          ],
          correctIndex: 1,
          explanation: 'When a full-surface primary datum has significant form error and no datum targets are specified, the part can rock on the datum simulator (surface plate), contacting different sets of three high.',
          hint: 'If the part rocks on the surface plate, does it sit.'
        },
        {
          id: 'u9-L3-Q28',
          type: 'fill-blank',
          question: 'Specific points, lines, or areas used to establish a datum from an irregular or rough surface are called datum _____.',
          blanks: ['targets'],
          wordBank: ['targets', 'features', 'references', 'simulators', 'indicators'],
          explanation: 'Datum targets are designated contact locations on a datum feature. For point targets, a crosshair symbol is used at the specified location.',
          hint: 'These are designated contact points or areas on rough.'
        },
        {
          id: 'u9-L3-Q29',
          type: 'multiple-choice',
          question: 'A complex assembly uses a pattern of holes as a datum feature. How is the datum established from multiple holes?',
          options: [
            'One hole is arbitrarily selected as the datum, provided all secondary effects',
            'The datum is established from the best-fit of all the holes in the pattern —',
            'Each hole establishes a separate datum axis, provided all secondary effects',
            'The pattern cannot serve as a datum — only single features can be datums'
          ],
          correctIndex: 1,
          explanation: 'ASME Y14.5 allows patterns of features to serve as datum features. The datum is established from the best-fit (least-squares or constrained) alignment of all the features in the pattern.',
          hint: 'If no single feature is sufficient, can a group.'
        },
        {
          id: 'u9-L3-Q30',
          type: 'true-false',
          question: 'When a feature control frame references only one datum, the measurement is fully constrained in all 6 degrees of freedom.',
          correctAnswer: false,
          explanation: 'A single planar datum constrains only 3 DOF. This is sufficient for some geometric controls .',
          hint: 'If datum A constrains 3 DOF, what about the other 3?'
        }
      ]
    },
    {
      id: 'u9-L4',
      title: 'Tolerance Stack-Up',
      description: 'Worst-case analysis, RSS (statistical), 1D chain analysis, gap analysis, tolerance allocation.',
      icon: '📊',
      xpReward: 30,
      questions: [
        {
          id: 'u9-L4-Q1',
          type: 'multiple-choice',
          question: 'Using worst-case analysis, what is the total stack-up tolerance?',
          options: [
            '±0.22 mm',
            '±0.50 mm',
            '±0.10 mm',
            '±1.00 mm'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Title --> <text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">3-Part Tolerance Stack-Up</text> <!-- Left wall --> <rect x="4" y="22" width="4" height="30" rx="1" fill="#3B8700" opacity="0.3"/> <line x1="4" y1="24" x2="8" y2="22" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="4" y1="30" x2="8" y2="28" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="4" y1="36" x2="8" y2="34" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="4" y1="42" x2="8" y2="40" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="4" y1="48" x2="8" y2="46" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <!-- Part 1 --> <rect x="8" y="24" width="18" height="26" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1.2"/> <text x="17" y="40" font-size="5" fill="#334155" text-anchor="middle">A</text> <!-- Part 2 --> <rect x="28" y="24" width="18" height="26" rx="1" fill="#A5E86C" opacity="0.12" stroke="#3B8700" stroke-width="1.2"/> <text x="37" y="40" font-size="5" fill="#334155" text-anchor="middle">B</text> <!-- Part 3 --> <rect x="48" y="24" width="18" height="26" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1.2"/> <text x="57" y="40" font-size="5" fill="#334155" text-anchor="middle">C</text> <!-- Right wall --> <rect x="68" y="22" width="4" height="30" rx="1" fill="#3B8700" opacity="0.3"/> <line x1="68" y1="24" x2="72" y2="22" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="68" y1="30" x2="72" y2="28" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="68" y1="36" x2="72" y2="34" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="68" y1="42" x2="72" y2="40" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="68" y1="48" x2="72" y2="46" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <!-- Gap/clearance between part 3 and right wall --> <line x1="66" y1="30" x2="68" y2="30" stroke="#3B8700" stroke-width="1" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite"/> </line> <text x="67" y="20" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Gap</text> <!-- Dimension lines below parts --> <!-- Part A dimension --> <line x1="8" y1="56" x2="26" y2="56" stroke="#334155" stroke-width="0.6" opacity="0.5"/> <line x1="8" y1="54" x2="8" y2="58" stroke="#334155" stroke-width="0.6" opacity="0.5"/> <line x1="26" y1="54" x2="26" y2="58" stroke="#334155" stroke-width="0.6" opacity="0.5"/> <text x="17" y="62" font-size="4" fill="#334155" text-anchor="middle">20</text> <text x="17" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">+0.1</text> <!-- Part B dimension --> <line x1="28" y1="56" x2="46" y2="56" stroke="#334155" stroke-width="0.6" opacity="0.5"/> <line x1="28" y1="54" x2="28" y2="58" stroke="#334155" stroke-width="0.6" opacity="0.5"/> <line x1="46" y1="54" x2="46" y2="58" stroke="#334155" stroke-width="0.6" opacity="0.5"/> <text x="37" y="62" font-size="4" fill="#334155" text-anchor="middle">15</text> <text x="37" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">+0.1</text> <!-- Part C dimension --> <line x1="48" y1="56" x2="66" y2="56" stroke="#334155" stroke-width="0.6" opacity="0.5"/> <line x1="48" y1="54" x2="48" y2="58" stroke="#334155" stroke-width="0.6" opacity="0.5"/> <line x1="66" y1="54" x2="66" y2="58" stroke="#334155" stroke-width="0.6" opacity="0.5"/> <text x="57" y="62" font-size="4" fill="#334155" text-anchor="middle">25</text> <text x="57" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">+0.1</text> <!-- Total stack dimension --> <line x1="8" y1="72" x2="68" y2="72" stroke="#58CC02" stroke-width="1" opacity="0.5"/> <line x1="8" y1="70" x2="8" y2="74" stroke="#58CC02" stroke-width="0.8" opacity="0.5"/> <line x1="68" y1="70" x2="68" y2="74" stroke="#58CC02" stroke-width="0.8" opacity="0.5"/> <text x="40" y="78" font-size="4" fill="#334155" text-anchor="middle">Total = 60 +0.5 (worst-case)</text> </svg>',
          explanation: 'Worst-case (arithmetic) stack-up simply adds all tolerances: total = ±(0.1 + 0.1 + 0.1 + 0.1 + 0.1) = ±0.50 mm.',
          hint: 'Worst-case = simple sum of all individual tolerances.'
        },
        {
          id: 'u9-L4-Q2',
          type: 'multiple-choice',
          question: 'Compare worst-case vs. When would you insist on using worst-case even though RSS gives a smaller (cheaper) tolerance?',
          options: [
            'Always use RSS — worst-case is obsolete and overly conservative',
            'When production volumes are very high — RSS only works for small batches',
            'When the consequence of failure is severe (safety-critical, medical,',
            'Only when the customer specifically requests it in the purchase order, which'
          ],
          correctIndex: 2,
          explanation: 'RSS assumes normal distributions and statistical independence, predicting ~99.73% of assemblies will be within tolerance (at 3-sigma).',
          hint: 'Consider when even a 0.27% failure rate (2700 ppm).'
        },
        {
          id: 'u9-L4-Q3',
          type: 'true-false',
          question: 'In a 1D tolerance chain, if a dimension contributes positively to the gap, it is called an "increasing" contributor, and its?',
          correctAnswer: true,
          explanation: 'In 1D chain analysis, each dimension is classified as either an "increasing" contributor (gap increases as dimension increases) or a "decreasing" contributor (gap decreases as dimension increases).',
          hint: 'Consider the direction each dimension pushes the gap.'
        },
        {
          id: 'u9-L4-Q4',
          type: 'multiple-choice',
          question: 'How do you decide which analysis to trust?',
          options: [
            'Always trust worst-case — if it shows interference, the design must be',
            'Always trust RSS — worst-case is unrealistically pessimistic, provided all',
            'Evaluate the consequences of the gap going negative, the production volume',
            'Run a Monte Carlo simulation and if it agrees with RSS, use that result,'
          ],
          correctIndex: 2,
          explanation: 'This is a judgment call that depends on context. Key factors: (1) Consequence severity — if negative gap means the product jams, leaks, or fails unsafely, worst-case governs.',
          hint: 'There is no universal right answer.'
        },
        {
          id: 'u9-L4-Q5',
          type: 'multiple-choice',
          question: 'When allocating tolerances to multiple dimensions in a stack-up, what approach optimizes cost?',
          options: [
            'Assign equal tolerance to every dimension, verified against reference',
            'Assign tighter tolerances to dimensions that are easier/cheaper to control',
            'Always use the tightest tolerance possible on every dimension, when assessed',
            'Use only RSS analysis and ignore worst-case entirely — not supported'
          ],
          correctIndex: 1,
          explanation: 'Cost-optimized tolerance allocation assigns tighter tolerances to dimensions that are inexpensive to control (e.g., features machined in the same setup, turned diameters, injection molded.',
          hint: 'Tolerance is directly tied to cost.'
        },
        {
          id: 'u9-L4-Q6',
          type: 'fill-blank',
          question: 'The statistical tolerance analysis method that computes the total tolerance as the square root of the sum of squared individual?',
          blanks: ['RSS'],
          wordBank: ['RSS', 'WCA', 'RMS', 'GD&T', 'FMEA'],
          explanation: 'The RSS (Root Sum Square) method assumes individual dimensions follow normal distributions and are statistically independent. It predicts the assembly variation at approximately 3-sigma.',
          hint: 'This method uses the Pythagorean-like combination.'
        },
        {
          id: 'u9-L4-Q7',
          type: 'multiple-choice',
          question: 'In a tolerance stack-up, what is the first step before performing any calculations?',
          options: [
            'Select analysis method (worst-case or RSS approach)',
            'Identify the critical assembly gap or clearance',
            'Assign tolerances to all contributing dimensions',
            'Build a prototype and measure it for validation'
          ],
          correctIndex: 1,
          explanation: 'The first and most important step is to clearly define the assembly requirement (what gap, clearance, or interference must be controlled) and trace the complete dimension chain (loop) from one.',
          hint: 'Before you can calculate anything, you need to know every.'
        },
        {
          id: 'u9-L4-Q8',
          type: 'multiple-choice',
          question: 'Using worst-case analysis, what is the maximum allowable tolerance (t) on the housing?',
          options: [
            '±0.25 mm',
            '±0.50 mm',
            '±0.15 mm',
            '±0.10 mm'
          ],
          correctIndex: 0,
          explanation: 'The gap = housing − Part A − Part B. Nominal gap = 56.0 − 25.0 − 30.0 = 1.0 mm (matches the requirement).',
          hint: 'Set up the equation: sum of all individual tolerances must.'
        },
        {
          id: 'u9-L4-Q9',
          type: 'multiple-choice',
          question: 'What is Monte Carlo simulation in the context of tolerance analysis, and when is it preferred over RSS?',
          options: [
            'A manufacturing method that uses random sampling to produce parts, provided',
            'A computational method that generates thousands of random assemblies based',
            'A casino-based method that randomly accepts or rejects parts, provided all',
            'A simplified version of worst-case analysis, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'Monte Carlo simulation randomly samples each dimension from its statistical distribution (which can be normal, uniform, skewed, or based on actual production data), calculates the assembly result.',
          hint: 'Instead of formulas, this method simulates millions.'
        },
        {
          id: 'u9-L4-Q10',
          type: 'true-false',
          question: 'RSS tolerance analysis assumes that all individual dimension variations follow a normal (Gaussian) distribution and are?',
          correctAnswer: true,
          explanation: 'The standard RSS method assumes: each dimension follows a normal distribution, and the dimensions are statistically independent (no correlation between them).',
          hint: 'RSS is based on the central limit theorem and independence.'
        },
        {
          id: 'u9-L4-Q11',
          type: 'multiple-choice',
          question: 'Using RSS, calculate the total stack-up tolerance for a chain of 4 dimensions with individual tolerances of ±0.1, ±0.2, ±0.1, and ±0.15 mm.',
          options: [
            '±0.55 mm (worst-case)',
            '±0.28 mm',
            '±0.14 mm',
            '±0.40 mm'
          ],
          correctIndex: 1,
          explanation: 'RSS = sqrt(0.1² + 0.2² + 0.1² + 0.15²) = sqrt(0.01 + 0.04 + 0.01 + 0.0225) = sqrt(0.0825) = ±0.287 ≈ ±0.28 mm. Compare to worst-case: ±(0.1 + 0.2 + 0.1 + 0.15) = ±0.55 mm.',
          hint: 'RSS = square root of (sum of each tolerance squared).'
        },
        {
          id: 'u9-L4-Q12',
          type: 'multiple-choice',
          question: 'What is the "sensitivity factor" in a tolerance stack-up, and when is it not equal to 1?',
          options: [
            'A factor that measures how sensitive the inspector is to measurement errors,',
            'A multiplier that accounts for how much a given dimension contributes to',
            'A safety factor applied to all tolerances, provided all secondary effects',
            'The ratio of RSS to worst-case tolerance, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'In a general tolerance stack-up, each dimension contributes to the result with a sensitivity factor (partial derivative of the result with respect to that dimension).',
          hint: 'If an angle changes by 1°, how much does the linear gap.'
        },
        {
          id: 'u9-L4-Q13',
          type: 'multiple-choice',
          question: 'What is the Cpk (process capability index), and how does it relate to tolerance analysis?',
          options: [
            'Cpk is the tolerance divided by the part size, provided all secondary effects',
            'Cpk measures how well a manufacturing process is centered within its tolerance',
            'Cpk is only relevant to quality control, not to design, provided all secondary',
            'Cpk must always equal exactly 1.0 for a capable process, provided all'
          ],
          correctIndex: 1,
          explanation: 'Cpk = min[(USL − μ)/(3σ), (μ − LSL)/(3σ)], where USL/LSL are the tolerance limits, μ is the process mean, and σ is the process standard deviation.',
          hint: 'This index tells you how much of the tolerance band.'
        },
        {
          id: 'u9-L4-Q14',
          type: 'fill-blank',
          question: 'In a _____ tolerance analysis, the total assembly tolerance equals the arithmetic _____ of all individual tolerances.',
          blanks: ['worst-case', 'sum'],
          wordBank: ['worst-case', 'sum', 'statistical', 'product', 'Monte Carlo', 'average'],
          explanation: 'Worst-case analysis assumes all dimensions are simultaneously at their most unfavorable limits. The total tolerance is simply the arithmetic sum of all individual tolerances.',
          hint: 'The simplest method: just add up all the individual tolerances.'
        },
        {
          id: 'u9-L4-Q15',
          type: 'multiple-choice',
          question: 'What are the possible corrective actions?',
          options: [
            'The only option is to tighten all tolerances equally until the gap',
            'Options include: tightening selected tolerances (based on cost), using',
            'The design must be scrapped and started over, provided all secondary effects',
            'Switch to RSS analysis — the problem disappears, provided all secondary'
          ],
          correctIndex: 1,
          explanation: 'Several strategies can resolve a negative gap in worst-case analysis: Tighten tolerances .',
          hint: 'Think of all the tools an engineer has: tighter.'
        },
        {
          id: 'u9-L4-Q16',
          type: 'multiple-choice',
          question: 'What is "selective assembly," and when is it used to address tolerance stack-up issues?',
          options: [
            'Selecting the best-looking parts for assembly, provided all secondary effects',
            'Measuring each part and sorting into size groups, then pairing parts',
            'Randomly selecting parts and hoping they fit, provided all secondary effects',
            'Assembling parts in a specific sequence, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'Selective assembly measures each part and classifies it into groups based on actual size.',
          hint: 'If you measure each part and match it with a compatible.'
        },
        {
          id: 'u9-L4-Q17',
          type: 'true-false',
          question: 'A dimension that does not appear in the tolerance loop but is manufactured on the same part as a contributing dimension can be?',
          correctAnswer: true,
          explanation: 'Only dimensions that directly contribute to the gap or clearance being analyzed should be included in the tolerance loop.',
          hint: 'Only dimensions that are in the chain from one side.'
        },
        {
          id: 'u9-L4-Q18',
          type: 'multiple-choice',
          question: 'What is the "modified RSS" or "RSS with safety factor" method?',
          options: [
            'RSS applied only to the largest tolerances, provided all secondary effects',
            'An RSS calculation multiplied by a correction factor (typically 1.2-1.5)',
            'RSS applied only to the smallest tolerances, provided all secondary effects',
            'A method that uses RSS for some dimensions and worst-case for others, provided'
          ],
          correctIndex: 1,
          explanation: 'Standard RSS assumes ideal conditions that rarely exist perfectly in practice: perfectly normal distributions, statistical independence, centered processes.',
          hint: 'RSS may be too optimistic, and worst-case too pessimistic.'
        },
        {
          id: 'u9-L4-Q19',
          type: 'multiple-choice',
          question: 'In a 2D tolerance analysis, what additional complexity arises compared to 1D?',
          options: [
            'There is no additional complexity — 2D is just two 1D analyses',
            'Angular dimensions create nonlinear contributions (sine/cosine effects)',
            '2D analysis can only be done with Monte Carlo simulation',
            'The tolerances are doubled in 2D, provided all secondary effects including'
          ],
          correctIndex: 1,
          explanation: 'In 2D stack-ups, dimensions at angles to the stack direction contribute through trigonometric functions.',
          hint: 'When dimensions are at angles, they contribute to the gap.'
        },
        {
          id: 'u9-L4-Q20',
          type: 'multiple-choice',
          question: 'How does geometric tolerance (e.g., position, perpendicularity) factor into a tolerance stack-up analysis?',
          options: [
            'Geometric tolerances are never included in stack-ups — only dimensional',
            'Geometric tolerances contribute to the stack-up as additional tolerance',
            'Geometric tolerances reduce the stack-up total, provided all secondary effects',
            'They are only included in RSS, not worst-case analysis, provided all secondary'
          ],
          correctIndex: 1,
          explanation: 'Geometric tolerances are critical stack-up contributors that are often overlooked.',
          hint: 'If a mating surface is not perfectly perpendicular,.'
        },
        {
          id: 'u9-L4-Q21',
          type: 'fill-blank',
          question: 'A process capability index (Cpk) of 1.33 indicates that the process variation uses approximately _____% of the tolerance band.',
          blanks: ['75'],
          wordBank: ['75', '50', '100', '60', '90'],
          explanation: 'Cpk = 1.33 means the process spread (6σ) occupies 75% of the tolerance band (6σ = 0.75 × tolerance width), and the process is centered. This corresponds to approximately 63 parts per million.',
          hint: 'At Cpk = 1.0, the process uses 100%.'
        },
        {
          id: 'u9-L4-Q22',
          type: 'multiple-choice',
          question: 'What is the fundamental advantage of designing an assembly with an adjustable feature from a tolerance stack-up perspective?',
          options: [
            'It eliminates the need for any tolerances on the parts, provided all secondary',
            'The adjustable feature absorbs the accumulated variation in the stack,',
            'Adjustable features are always cheaper than tightening tolerances',
            'It makes the assembly easier to disassemble, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'An adjustable feature (shim, selective spacer, set screw, adjustable cam) absorbs the cumulative variation from the tolerance chain at one location.',
          hint: 'If you can adjust one dimension at assembly time, do.'
        },
        {
          id: 'u9-L4-Q23',
          type: 'true-false',
          question: 'In a worst-case tolerance stack-up, the probability that all dimensions are at their worst limits is very high for typical?',
          correctAnswer: false,
          explanation: 'The probability that all dimensions are simultaneously at their worst limits is extremely low — it decreases exponentially with the number of dimensions.',
          hint: 'If each dimension has a small chance of being at the worst.'
        },
        {
          id: 'u9-L4-Q24',
          type: 'multiple-choice',
          question: 'If the parts are manufactured by different suppliers with different process capabilities, how does this affect the analysis?',
          options: [
            'Different suppliers have no effect — tolerances are tolerances, provided all',
            'The process capability (Cpk) of each supplier\'s dimensions should be',
            'All suppliers must have the same Cpk for the analysis to be valid',
            'Supplier variation is only relevant for RSS, not worst-case'
          ],
          correctIndex: 1,
          explanation: 'Real manufacturing data shows that different suppliers and processes produce different distributions within the same tolerance band.',
          hint: 'If you know a supplier consistently makes parts much.'
        },
        {
          id: 'u9-L4-Q25',
          type: 'multiple-choice',
          question: 'How do you determine whether a dimension is a "positive" or "negative" contributor in a 1D tolerance chain?',
          options: [
            'Positive dimensions are always the larger ones, provided all secondary effects',
            'Trace a continuous path from one side of the gap to the other through all',
            'All dimensions from the first part are positive and all from the second part',
            'Positive and negative assignment is arbitrary, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'The sign convention follows from the dimension loop: start at one surface defining the gap, trace through each contributing dimension to the other surface.',
          hint: 'Increase each dimension mentally.'
        },
        {
          id: 'u9-L4-Q26',
          type: 'multiple-choice',
          question: 'What is the relationship between the number of contributors in a stack-up and the benefit of using RSS vs. worst-case?',
          options: [
            'The benefit is constant regardless of the number of contributors',
            'As the number of contributors increases, the RSS result grows as the square',
            'RSS is better only for chains with fewer than 3 contributors',
            'More contributors always favor worst-case analysis, which would only hold true'
          ],
          correctIndex: 1,
          explanation: 'For n equal tolerances (±t each): worst-case = n × t, RSS = sqrt(n) × t. The RSS/WC ratio = 1/sqrt(n). For n = 4, RSS is 50% of WC.',
          hint: 'Compare how n (worst-case) grows versus sqrt(n) (RSS).'
        },
        {
          id: 'u9-L4-Q27',
          type: 'true-false',
          question: 'RSS tolerance analysis is appropriate for assemblies consisting of only 2-3 parts with 2-3 contributing dimensions.',
          correctAnswer: false,
          explanation: 'RSS is based on the central limit theorem, which works best with many independent contributors.',
          hint: 'Does the central limit theorem work well with only 2-3 samples?'
        },
        {
          id: 'u9-L4-Q28',
          type: 'multiple-choice',
          question: 'How is a tolerance stack-up analysis documented in a professional engineering report?',
          options: [
            'Just report the final number — no documentation needed, provided all secondary',
            'Document the assembly requirement, dimension loop sketch, each contributor',
            'A single spreadsheet cell with the formula is sufficient, provided all',
            'Only document it if the customer requests it, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'A professional tolerance analysis report includes: Assembly requirement definition (what gap/clearance/interference must be controlled and its limits);.',
          hint: 'Consider what someone reviewing your analysis in 5 years.'
        },
        {
          id: 'u9-L4-Q29',
          type: 'fill-blank',
          question: 'When tolerance analysis shows the gap can become negative, one low-cost solution is to insert a selectable _____ between parts?',
          blanks: ['shim'],
          wordBank: ['shim', 'gasket', 'washer', 'bushing', 'insert'],
          explanation: 'Shims (or spacers) are thin plates of precise thickness used to fill gaps and absorb tolerance stack-up variation.',
          hint: 'This thin insert is selected at assembly time to fill.'
        },
        {
          id: 'u9-L4-Q30',
          type: 'multiple-choice',
          question: 'What is the "virtual condition boundary" approach to tolerance stack-up?',
          options: [
            'It is a 3D CAD visualization method, provided all secondary effects including',
            'Instead of stacking individual dimensional and geometric tolerances',
            'It ignores geometric tolerances entirely, provided all secondary effects',
            'It is only applicable to position tolerances, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'The virtual condition approach converts each feature into its worst-case boundary (virtual condition = MMC size ± geometric tolerance) and uses that boundary in the stack-up.',
          hint: 'Instead of size and geometric tolerance as separate.'
        }
      ]
    },
    {
      id: 'u9-L5',
      title: 'Surface Finish & Metrology',
      description: 'Ra/Rz/Rq, surface lay symbols, CMM basics, profilometry, measurement uncertainty.',
      icon: '🔬',
      xpReward: 25,
      questions: [
        {
          id: 'u9-L5-Q1',
          type: 'multiple-choice',
          question: 'The Ra measurement confirms the surface meets spec. What might the Ra value be missing?',
          options: [
            'Ra is the only relevant surface parameter — the leak must be caused',
            'Ra averages out the profile and can hide deep scratches or isolated peaks',
            'The surface is too smooth — increase Ra to allow the seal to grip better',
            'Ra measurement was taken in the wrong direction — re-measure perpendicular'
          ],
          correctIndex: 1,
          explanation: 'Ra (arithmetic average roughness) is a statistical average that can mask extreme features.',
          hint: 'Consider what kind of surface feature would allow fluid.'
        },
        {
          id: 'u9-L5-Q2',
          type: 'multiple-choice',
          question: 'Which surface roughness parameter is preferred for sealing surfaces because it better characterizes the peak heights that affect?',
          options: [
            'Ra (arithmetic average)',
            'Rz (average maximum height)',
            'Rq (root mean square)',
            'Rsk (skewness), prior to any post-processing'
          ],
          correctIndex: 1,
          explanation: 'Rz (average of the maximum peak-to-valley heights in each sampling length) is preferred for sealing surfaces because it captures the extreme deviations that affect seal contact and leakage.',
          hint: 'Seals are affected by the tallest peaks and deepest.'
        },
        {
          id: 'u9-L5-Q3',
          type: 'multiple-choice',
          question: 'A colleague argues this result may not be reliable. Are they right, and why?',
          options: [
            'Wrong — 9 points is sufficient for flatness measurement',
            'Right — 9 points on large surface may miss deviations',
            'Point count does not matter for this measurement',
            'They are right, but only for very small surfaces'
          ],
          correctIndex: 1,
          explanation: 'CMM measurements are only as good as the sampling strategy. With 9 points on a 200 mm x 200 mm surface, the average spacing is ~67 mm .',
          hint: 'Can 9 discrete points fully represent the shape of a 200.'
        },
        {
          id: 'u9-L5-Q4',
          type: 'multiple-choice',
          question: 'The surface lay symbol "⊥" on a drawing indicates that the surface texture pattern (lay) is:',
          options: [
            'Parallel to the surface boundary line',
            'Perpendicular to the surface boundary line',
            'Multi-directional (no dominant direction)',
            'Circular relative to the center of the surface'
          ],
          correctIndex: 1,
          explanation: 'The lay symbol "⊥" indicates the predominant surface pattern runs perpendicular to the boundary line (the edge of the surface as viewed on the drawing).',
          hint: 'This symbol shows the direction of the machining marks.'
        },
        {
          id: 'u9-L5-Q5',
          type: 'multiple-choice',
          question: 'According to the common 10:1 gauge maker\'s rule, what is the tightest tolerance this instrument should be used to inspect?',
          options: [
            '±0.005 mm',
            '±0.010 mm',
            '±0.020 mm',
            '±0.050 mm'
          ],
          correctIndex: 2,
          explanation: 'The gauge maker\'s rule (gauge R&R principle) recommends that measurement uncertainty should be at most 1/4 to 1/10 of the tolerance being inspected.',
          hint: 'The measurement uncertainty should consume no more.'
        },
        {
          id: 'u9-L5-Q6',
          type: 'multiple-choice',
          question: 'You discover a tolerance on a legacy drawing that seems unnecessarily tight — Ra 0.2 on a non-sealing, non-bearing surface that?',
          options: [
            'Just change it to Ra 3.2 and notify manufacturing — it is obviously a mistake,',
            'Leave it as-is to avoid any risk — if it has worked for years, do not change',
            'Investigate the design intent by reviewing assembly context, service history,',
            'Ask manufacturing to ignore it and machine to whatever finish is convenient,'
          ],
          correctIndex: 2,
          explanation: 'Tight tolerances on legacy drawings may exist for a reason not obvious from the drawing alone (e.g., a past failure that drove the change, a customer requirement, a coating adhesion need).',
          hint: 'Legacy drawings may have hidden reasons for tight.'
        },
        {
          id: 'u9-L5-Q7',
          type: 'multiple-choice',
          question: 'What is the difference between Ra and Rq (RMS roughness)?',
          options: [
            'They are identical measurements with different names, provided all secondary',
            'Ra is the arithmetic average of the absolute deviations from the mean line,',
            'Rq is always exactly twice Ra, provided all secondary effects including',
            'Ra is used in the US and Rq is used in Europe, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'Ra = (1/L)∫|Z(x)|dx (average of absolute deviations). Rq = sqrt((1/L)∫Z(x)²dx) (root mean square of deviations).',
          hint: 'One averages absolute values, the other squares before.'
        },
        {
          id: 'u9-L5-Q8',
          type: 'multiple-choice',
          question: 'What is the "cutoff length" (λc) in surface roughness measurement, and why is it important?',
          options: [
            'The maximum length of the surface that can be measured, provided all secondary',
            'The filter wavelength that separates roughness from waviness',
            'The distance between the probe tip and the surface, which would only hold true',
            'The minimum feature size the probe can detect, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'The cutoff length (λc) is a high-pass filter that separates short-wavelength roughness from long-wavelength waviness. Standard cutoff values are 0.08, 0.25, 0.8, 2.5, and 8 mm.',
          hint: 'The filter setting determines which surface features.'
        },
        {
          id: 'u9-L5-Q9',
          type: 'true-false',
          question: 'A surface with Ra 0.4 μm is always smoother than a surface with Ra 0.8 μm in terms of functional performance.',
          correctAnswer: false,
          explanation: 'Ra alone does not determine functional performance.',
          hint: 'Does a lower Ra number always mean better performance?.'
        },
        {
          id: 'u9-L5-Q10',
          type: 'multiple-choice',
          question: 'What surface roughness parameter describes the asymmetry of the profile — whether the surface has more peaks or more valleys?',
          options: [
            'Ra (arithmetic average)',
            'Rz (maximum height)',
            'Rsk (skewness)',
            'Rq (RMS roughness)'
          ],
          correctIndex: 2,
          explanation: 'Rsk (skewness) measures the asymmetry of the surface profile height distribution. Rsk = 0 indicates a symmetric (Gaussian) profile.',
          hint: 'This parameter tells you whether the surface texture.'
        },
        {
          id: 'u9-L5-Q11',
          type: 'multiple-choice',
          question: 'What is a CMM (Coordinate Measuring Machine) and what are its main advantages for GD&T inspection?',
          options: [
            'A hand tool for measuring surface roughness, provided all secondary effects',
            'A precision 3D measurement system that probes discrete points on a part',
            'A visual inspection camera system, provided all secondary effects including',
            'A machine that measures only linear dimensions, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'A CMM uses a precision touch-trigger or scanning probe mounted on a 3-axis (or 5-axis) motion system to capture coordinate data (X, Y, Z) of points on a part surface.',
          hint: 'This machine captures 3D coordinate data and computes.'
        },
        {
          id: 'u9-L5-Q12',
          type: 'multiple-choice',
          question: 'What is measurement uncertainty, and why must it be considered when accepting or rejecting parts?',
          options: [
            'Measurement uncertainty is the operator\'s doubt about whether the measurement',
            'Measurement uncertainty is the quantified range within which the true value',
            'Measurement uncertainty is eliminated by using digital readouts',
            'It only applies to manual measurements, not automated ones'
          ],
          correctIndex: 1,
          explanation: 'Measurement uncertainty is an inherent property of every measurement, arising from the instrument, method, environment, and operator.',
          hint: 'If your measurement is right at the tolerance limit.'
        },
        {
          id: 'u9-L5-Q13',
          type: 'fill-blank',
          question: 'The surface roughness parameter Rz measures the average maximum peak-to-_____ height over the evaluation length.',
          blanks: ['valley'],
          wordBank: ['valley', 'mean', 'peak', 'baseline', 'center'],
          explanation: 'Rz is defined as the average of the individual maximum peak-to-valley heights (Rzi) measured in each of the five sampling lengths within the evaluation length: Rz = (Rz1 + Rz2 + Rz3 + Rz4 + Rz5) / 5.',
          hint: 'Rz measures the extreme heights.'
        },
        {
          id: 'u9-L5-Q14',
          type: 'multiple-choice',
          question: 'What are the typical surface roughness values (Ra) achievable by common manufacturing processes?',
          options: [
            'All machining processes achieve the same roughness',
            'Lapping: 0.025-0.1 μm',
            'Every process can achieve any roughness with the right parameters, verified',
            'Surface roughness depends only on the cutting tool, not the process — though'
          ],
          correctIndex: 1,
          explanation: 'Each manufacturing process has a characteristic roughness range determined by the physics of material removal: lapping/polishing (0.012-0.1 μm) uses fine abrasive in a random pattern;.',
          hint: 'Each process has physical limits.'
        },
        {
          id: 'u9-L5-Q15',
          type: 'multiple-choice',
          question: 'Why is temperature control critical in a metrology laboratory, and what is the standard reference temperature?',
          options: [
            'Temperature does not affect measurements if the instruments are calibrated,',
            'The standard reference temperature is 20°C (68°F)',
            'The standard is 25°C',
            'Temperature only matters for plastic parts, not metals, provided all secondary'
          ],
          correctIndex: 1,
          explanation: 'ISO 1 defines 20°C as the standard reference temperature for dimensional measurements. At other temperatures, thermal expansion changes part dimensions: ΔL = α × L × ΔT.',
          hint: 'If a steel part expands 12 μm/m per °C, how much does.'
        },
        {
          id: 'u9-L5-Q16',
          type: 'true-false',
          question: 'A surface profilometer measures the same characteristics as a CMM — they are interchangeable for GD&T inspection.',
          correctAnswer: false,
          explanation: 'A surface profilometer measures surface texture (roughness, waviness) by tracing a very fine stylus (typically 2-5 μm tip radius) along the surface. It captures high-frequency surface detail.',
          hint: 'One measures micro-geometry (roughness), the other.'
        },
        {
          id: 'u9-L5-Q17',
          type: 'multiple-choice',
          question: 'What is the "lay" of a surface, and why does it matter functionally?',
          options: [
            'Lay is another name for surface roughness, provided all secondary effects',
            'Lay is the predominant directional pattern of the surface texture, determined',
            'Lay only matters for painted surfaces, provided all secondary effects',
            'Lay is the depth of the deepest valley on the surface, provided all secondary'
          ],
          correctIndex: 1,
          explanation: 'Lay is the directional pattern of the surface texture — the orientation of machining marks.',
          hint: 'The direction of machining marks affects how the surface.'
        },
        {
          id: 'u9-L5-Q18',
          type: 'multiple-choice',
          question: 'What is gauge R&R (Repeatability and Reproducibility), and what is an acceptable result?',
          options: [
            'A test to verify that gauges are in calibration, provided all secondary',
            'A study that quantifies the measurement variation due to the gauge',
            'A method to repair damaged gauges, provided all secondary effects including',
            'A comparison between two different gauge brands, provided all secondary'
          ],
          correctIndex: 1,
          explanation: 'Gauge R&R (per AIAG MSA manual) decomposes total measurement variation into: repeatability (equipment variation .',
          hint: 'If different operators get different results measuring.'
        },
        {
          id: 'u9-L5-Q19',
          type: 'fill-blank',
          question: 'The standard reference temperature for dimensional measurement, defined by ISO 1, is _____ °C.',
          blanks: ['20'],
          wordBank: ['20', '25', '15', '22', '0'],
          explanation: '20°C (68°F) is the international standard reference temperature for industrial length measurements, established by ISO 1.',
          hint: 'This temperature is the universal reference.'
        },
        {
          id: 'u9-L5-Q20',
          type: 'multiple-choice',
          question: 'What is an optical comparator (profile projector), and what types of features is it best suited to inspect?',
          options: [
            'A device that compares two parts side by side visually, provided all secondary',
            'An instrument that projects a magnified shadow (silhouette) of a part onto',
            'A camera that takes photos for visual inspection records, provided all',
            'A precision scale for comparing part weights, provided all secondary effects'
          ],
          correctIndex: 1,
          explanation: 'An optical comparator magnifies the part shadow (typically 10x-100x) onto a screen. The operator overlays a template or uses digital crosshairs/software to measure features.',
          hint: 'This instrument uses a magnified shadow to inspect 2D.'
        },
        {
          id: 'u9-L5-Q21',
          type: 'true-false',
          question: 'When specifying surface roughness on a drawing, the roughness value always represents the maximum allowable roughness — the?',
          correctAnswer: true,
          explanation: 'Per ISO 1302 and ASME Y14.36M, the surface roughness value on a drawing is an upper limit (maximum allowable) by default. The actual surface must have roughness equal to or less than (smoother.',
          hint: 'If a drawing says Ra 1.6, can you deliver Ra 0.8?.'
        },
        {
          id: 'u9-L5-Q22',
          type: 'multiple-choice',
          question: 'What is the relationship between surface roughness and fatigue life?',
          options: [
            'Surface roughness has no effect on fatigue life',
            'Rougher surfaces have lower fatigue life',
            'Smoother surfaces always have shorter fatigue life',
            'Fatigue life depends only on material properties, not surface condition,'
          ],
          correctIndex: 1,
          explanation: 'Surface roughness directly affects fatigue life through two mechanisms: valleys and scratches act as stress concentrators (micro-notches) that raise local stress and initiate fatigue cracks;.',
          hint: 'What happens at a microscopic scratch when cyclic stress.'
        },
        {
          id: 'u9-L5-Q23',
          type: 'multiple-choice',
          question: 'Both processes achieve the specified Ra value. Should any additional surface characteristics be verified?',
          options: [
            'No — if Ra is met, the surfaces are equivalent, provided all secondary effects',
            'Yes — verify residual stress (grinding can cause tensile residual stress',
            'Only verify the dimensional tolerance, not surface properties, provided all',
            'Grinding is always superior to turning so no additional checks are needed,'
          ],
          correctIndex: 1,
          explanation: 'Changing the manufacturing process changes far more than just Ra.',
          hint: 'Ra is the same, but is the metallurgical condition.'
        },
        {
          id: 'u9-L5-Q24',
          type: 'multiple-choice',
          question: 'What is Abbe\'s principle in metrology, and why does violating it cause measurement error?',
          options: [
            'The principle that measurements should always be taken at 20°C, provided all',
            'The principle that the measurement axis should be collinear with (on the same',
            'The principle that digital instruments are more accurate than analog ones,',
            'The principle that two measurements should always be averaged, provided all'
          ],
          correctIndex: 1,
          explanation: 'Abbe\'s principle states that the measuring scale and the dimension being measured should be collinear.',
          hint: 'If the ruler is not on the same line as what you.'
        },
        {
          id: 'u9-L5-Q25',
          type: 'fill-blank',
          question: 'The surface lay symbol "C" indicates a _____ lay pattern, typically produced by turning or facing operations.',
          blanks: ['circular'],
          wordBank: ['circular', 'crossed', 'radial', 'parallel', 'multi-directional'],
          explanation: 'The "C" lay symbol indicates concentric circular marks centered on the feature axis, characteristic of turning, facing, and boring operations.',
          hint: 'Turning creates concentric ring-shaped marks.'
        },
        {
          id: 'u9-L5-Q26',
          type: 'multiple-choice',
          question: 'What is a "go/no-go gauge" and what is its advantage over variable measurement instruments for production inspection?',
          options: [
            'A gauge that can measure dimensions to high precision, provided all secondary',
            'A fixed-size gauge that checks only whether a feature is within tolerance (go',
            'A gauge that measures both surface roughness and dimensions, provided all',
            'A type of CMM program, provided all secondary effects including environmental'
          ],
          correctIndex: 1,
          explanation: 'Go/no-go gauges (attribute gauges) are fixed-limit gauges that verify a feature is within tolerance without measuring the actual value.',
          hint: 'For high-volume production, do you need to know the actual.'
        },
        {
          id: 'u9-L5-Q27',
          type: 'multiple-choice',
          question: 'A surface finish symbol on a drawing has a circle in the V-notch. What does this indicate?',
          options: [
            'The surface must be machined to specification',
            'Surface must remain as-manufactured state (unmachined)',
            'The surface requires electrical discharge machining',
            'Roughness applies only to first article, not production'
          ],
          correctIndex: 1,
          explanation: 'Per ISO 1302, the circle in the V-notch (open triangle) of the surface texture symbol indicates that the surface must be obtained by a non-material-removal process — meaning no machining is allowed.',
          hint: 'The circle signifies "no removal".'
        },
        {
          id: 'u9-L5-Q28',
          type: 'true-false',
          question: 'Gauge blocks (Johansson blocks) can be combined by wringing to create custom lengths with accuracy better than 0.1 μm.',
          correctAnswer: true,
          explanation: 'Gauge blocks are precision ground and lapped metal (or ceramic) blocks with faces so flat and smooth that they adhere by "wringing" .',
          hint: 'Gauge blocks are the primary physical length standards.'
        },
        {
          id: 'u9-L5-Q29',
          type: 'multiple-choice',
          question: 'What is the difference between a contact (stylus) profilometer and a non-contact (optical) profilometer?',
          options: [
            'They measure completely different things and cannot be compared, provided all',
            'A stylus profilometer drags a diamond tip across the surface (physical',
            'Optical profilometers are always more accurate, provided all secondary effects',
            'Stylus profilometers can only measure Ra, not Rz, provided all secondary'
          ],
          correctIndex: 1,
          explanation: 'Stylus profilometers trace a diamond tip (typically 2-5 μm radius, 60° or 90° cone angle) across the surface, measuring the vertical displacement as a 2D profile.',
          hint: 'One touches the surface with a sharp tip; the other uses.'
        },
        {
          id: 'u9-L5-Q30',
          type: 'multiple-choice',
          question: 'What is the significance of the "Bearing Area Curve" for functional surface characterization?',
          options: [
            'It only applies to bearing surfaces and is irrelevant for other applications,',
            'It plots the percentage of the surface that would be in contact (material',
            'It is only used in research, not in industry, provided all secondary effects',
            'It is the same as the Rz measurement plotted differently, provided all'
          ],
          correctIndex: 1,
          explanation: 'The Abbott-Firestone (bearing area) curve is generated by slicing the surface profile at successively deeper levels and plotting the material ratio (percentage of the profile at or above.',
          hint: 'If you slice the surface profile horizontally, how much.'
        }
      ]
    }
  ]
};
