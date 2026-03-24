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
          diagram: '<svg viewBox="0 0 80 80" fill="none"><rect x="10" y="18" width="60" height="44" rx="3" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="40" r="12" fill="white" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="40" r="11" fill="#3B8700" opacity="0.15"/><text x="40" y="43" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">H7/s6</text><path d="M55,30 L62,22" stroke="#EC4899" stroke-width="1.5"/><path d="M58,25 L65,18 M60,27 L67,20" stroke="#EC4899" stroke-width="0.8" opacity="0.6"/><path d="M25,50 L18,58" stroke="#EC4899" stroke-width="1.5"/><path d="M22,53 L15,60 M20,55 L13,62" stroke="#EC4899" stroke-width="0.8" opacity="0.6"/><text x="40" y="12" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Al Housing Crack</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">High hoop stress in aluminum</text><animate attributeName="opacity" values="1;0.85;1" dur="2s" repeatCount="indefinite"/></svg>',
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
          diagram: '<svg viewBox="0 0 80 80" fill="none"><line x1="40" y1="70" x2="40" y2="10" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="40" x2="68" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="40" y="78" font-size="4" fill="#334155" text-anchor="middle">Nominal 50 mm</text><rect x="25" y="28" width="14" height="24" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><line x1="23" y1="28" x2="41" y2="28" stroke="#58CC02" stroke-width="0.6" opacity="0.5"/><text x="32" y="26" font-size="3.5" fill="#334155" text-anchor="middle">+0.05</text><line x1="23" y1="52" x2="41" y2="52" stroke="#58CC02" stroke-width="0.6" opacity="0.5"/><text x="32" y="58" font-size="3.5" fill="#334155" text-anchor="middle">-0.10</text><text x="32" y="42" font-size="4.5" fill="#58CC02" text-anchor="middle" font-weight="bold">0.15</text><line x1="18" y1="28" x2="18" y2="52" stroke="#3B8700" stroke-width="1" opacity="0.4"/><polygon points="16.5,29 18,26 19.5,29" fill="#3B8700" opacity="0.4"/><polygon points="16.5,51 18,54 19.5,51" fill="#3B8700" opacity="0.4"/><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Bilateral Tolerance</text><text x="56" y="36" font-size="3.5" fill="#6B7280" text-anchor="middle">+side</text><text x="56" y="48" font-size="3.5" fill="#6B7280" text-anchor="middle">−side</text></svg>',
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
          question: 'The minimum intended difference in size between mating parts in a clearance fit is called the _____.',
          blanks: ['allowance'],
          wordBank: ['allowance', 'tolerance', 'deviation', 'clearance', 'variance'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"><rect x="8" y="20" width="28" height="40" rx="2" fill="#58CC02" opacity="0.08" stroke="#58CC02" stroke-width="1.5"/><rect x="44" y="20" width="28" height="40" rx="2" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/><text x="22" y="42" font-size="4.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Hole</text><text x="58" y="42" font-size="4.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Shaft</text><line x1="36" y1="30" x2="44" y2="30" stroke="#A5E86C" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><line x1="36" y1="50" x2="44" y2="50" stroke="#A5E86C" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><text x="40" y="42" font-size="3.5" fill="#334155" text-anchor="middle" font-style="italic">min</text><text x="40" y="46" font-size="3.5" fill="#334155" text-anchor="middle" font-style="italic">gap</text><text x="40" y="10" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Allowance</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Tightest fit condition</text></svg>',
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
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Hole-Basis vs Shaft-Basis</text><rect x="4" y="14" width="34" height="28" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="22" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Hole-Basis</text><rect x="10" y="26" width="8" height="12" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><text x="14" y="34" font-size="3" fill="#334155" text-anchor="middle">H</text><rect x="22" y="28" width="8" height="8" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="0.8"/><text x="26" y="34" font-size="3" fill="#334155" text-anchor="middle">var</text><rect x="42" y="14" width="34" height="28" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="22" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Shaft-Basis</text><rect x="48" y="28" width="8" height="8" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><text x="52" y="34" font-size="3" fill="#334155" text-anchor="middle">var</text><rect x="60" y="26" width="8" height="12" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="0.8"/><text x="64" y="34" font-size="3" fill="#334155" text-anchor="middle">h</text><text x="21" y="52" font-size="3.5" fill="#58CC02" text-anchor="middle">Fixed hole</text><text x="21" y="57" font-size="3.5" fill="#58CC02" text-anchor="middle">Vary shaft</text><text x="59" y="52" font-size="3.5" fill="#3B8700" text-anchor="middle">Fixed shaft</text><text x="59" y="57" font-size="3.5" fill="#3B8700" text-anchor="middle">Vary hole</text><text x="40" y="70" font-size="3.5" fill="#6B7280" text-anchor="middle">Shaft-basis: drawn bar stock</text></svg>',
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
          diagram: '<svg viewBox="0 0 80 80" fill="none"><line x1="40" y1="70" x2="40" y2="10" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="35" x2="68" y2="35" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="10" y="37" font-size="3" fill="#6B7280">∅25.000</text><rect x="30" y="35" width="20" height="16" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="1.2"/><text x="40" y="46" font-size="5" fill="#3B8700" text-anchor="middle" font-weight="bold">h6</text><line x1="28" y1="35" x2="52" y2="35" stroke="#3B8700" stroke-width="0.6" opacity="0.5"/><text x="56" y="34" font-size="3.5" fill="#334155">0.000</text><line x1="28" y1="51" x2="52" y2="51" stroke="#3B8700" stroke-width="0.6" opacity="0.5"/><text x="56" y="53" font-size="3.5" fill="#334155">−0.013</text><polygon points="24,36 26,33 26,37" fill="#3B8700" opacity="0.4"/><text x="22" y="30" font-size="3.5" fill="#334155" text-anchor="end">upper=0</text><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">∅25 h6 Shaft</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Zone below nominal</text></svg>',
          explanation: 'The fundamental deviation "h" for a shaft means the upper deviation is zero — the shaft at its largest equals the nominal size. The tolerance zone extends below nominal.',
          hint: 'The lowercase "h" for shafts means the tolerance zone lies.'
        },
        {
          id: 'u9-L1-Q10',
          type: 'true-false',
          question: 'A transition fit can result in either a small clearance or a small interference between mating parts, depending on the actual?',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Transition Fit</text><line x1="40" y1="70" x2="40" y2="14" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="42" x2="68" y2="42" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="10" y="44" font-size="3" fill="#6B7280">nom</text><rect x="18" y="30" width="14" height="20" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><text x="25" y="43" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">H7</text><rect x="48" y="34" width="14" height="16" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.2"/><text x="55" y="45" font-size="4" fill="#3B8700" text-anchor="middle" font-weight="bold">k6</text><rect x="34" y="34" width="12" height="8" rx="0.5" fill="#A5E86C" opacity="0.3" stroke="#A5E86C" stroke-width="0.8"><animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite"/></rect><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Overlap zone</text><text x="40" y="74" font-size="3.5" fill="#334155" text-anchor="middle">Clearance OR interference</text></svg>',
          explanation: 'A transition fit is defined by overlapping tolerance zones of the hole and shaft.',
          hint: 'If the shaft and hole tolerance zones overlap, what.'
        },
        {
          id: 'u9-L1-Q11',
          type: 'multiple-choice',
          question: 'You need to select a fit for a gear hub on a keyed shaft. Which fit type is most appropriate?',
          options: [
            'H7/d9 — loose running clearance fit with significant play',
            'H7/s6 — heavy interference press fit requiring hydraulic press',
            'H7/k6 — transition fit providing accurate centering, removable',
            'H11/c11 — extra-loose clearance fit for non-precision assembly'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Gear Hub on Keyed Shaft</text><circle cx="40" cy="42" r="22" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1.5"/><circle cx="40" cy="42" r="14" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><rect x="36" y="28" width="8" height="6" rx="0.5" fill="#A5E86C" opacity="0.3" stroke="#3B8700" stroke-width="0.8"/><text x="40" y="32" font-size="3" fill="#334155" text-anchor="middle">key</text><path d="M18,42 L12,34 L8,38 L14,46 Z" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="0.8"/><path d="M62,42 L68,34 L72,38 L66,46 Z" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="0.8"/><text x="40" y="46" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">H7/k6</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Transition fit — accurate centering</text></svg>',
          explanation: 'H7/k6 is a locational transition fit ideal for components that need precise centering on a shaft but must be removable. It may produce a very slight clearance or very light interference.',
          hint: 'Consider a fit that centers accurately but does.'
        },
        {
          id: 'u9-L1-Q12',
          type: 'multiple-choice',
          question: 'What is the relationship between tolerance grade number (IT number) and the magnitude of the tolerance?',
          options: [
            'Higher IT numbers indicate tighter tolerances and finer precision',
            'Higher IT numbers mean wider (looser) tolerances — IT01 is tightest',
            'IT numbers are unrelated to tolerance — they refer to surface finish',
            'All IT grades have the same magnitude but differ in zone position'
          ],
          correctIndex: 1,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">IT Grade vs Tolerance</text><line x1="12" y1="65" x2="68" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="12" y1="65" x2="12" y2="15" stroke="#3B8700" stroke-width="0.8"/><rect x="16" y="62" width="5" height="3" rx="0.5" fill="#58CC02" opacity="0.4"/><rect x="23" y="59" width="5" height="6" rx="0.5" fill="#58CC02" opacity="0.5"/><rect x="30" y="54" width="5" height="11" rx="0.5" fill="#58CC02" opacity="0.6"/><rect x="37" y="47" width="5" height="18" rx="0.5" fill="#A5E86C" opacity="0.7"/><rect x="44" y="38" width="5" height="27" rx="0.5" fill="#A5E86C" opacity="0.8"/><rect x="51" y="28" width="5" height="37" rx="0.5" fill="#3B8700" opacity="0.4"/><rect x="58" y="18" width="5" height="47" rx="0.5" fill="#3B8700" opacity="0.5"/><text x="18" y="72" font-size="3" fill="#6B7280" text-anchor="middle">5</text><text x="25" y="72" font-size="3" fill="#6B7280" text-anchor="middle">7</text><text x="32" y="72" font-size="3" fill="#6B7280" text-anchor="middle">9</text><text x="39" y="72" font-size="3" fill="#6B7280" text-anchor="middle">11</text><text x="46" y="72" font-size="3" fill="#6B7280" text-anchor="middle">13</text><text x="53" y="72" font-size="3" fill="#6B7280" text-anchor="middle">15</text><text x="60" y="72" font-size="3" fill="#6B7280" text-anchor="middle">18</text><text x="40" y="78" font-size="3.5" fill="#334155" text-anchor="middle">Higher IT = looser</text></svg>',
          explanation: 'ISO tolerance grades range from IT01 (tightest, used for gauge blocks) through IT18 (loosest, rough castings/forgings).',
          hint: 'Consider the scale: IT01 for gauge blocks, IT16 for rough.'
        },
        {
          id: 'u9-L1-Q13',
          type: 'true-false',
          question: 'In the ISO system, for a given IT grade, the tolerance value is constant regardless of the nominal diameter.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">IT7 vs Diameter</text><line x1="12" y1="65" x2="68" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="12" y1="65" x2="12" y2="18" stroke="#3B8700" stroke-width="0.8"/><circle cx="20" cy="58" r="2" fill="#58CC02" opacity="0.7"/><circle cx="30" cy="52" r="2" fill="#58CC02" opacity="0.7"/><circle cx="40" cy="44" r="2" fill="#A5E86C" opacity="0.8"/><circle cx="50" cy="35" r="2" fill="#A5E86C" opacity="0.8"/><circle cx="60" cy="26" r="2" fill="#3B8700" opacity="0.6"/><path d="M20,58 Q30,52 40,44 Q50,35 60,26" stroke="#58CC02" stroke-width="1.2" fill="none"/><text x="40" y="76" font-size="3.5" fill="#334155" text-anchor="middle">Nominal diameter (mm)</text><text x="20" y="70" font-size="3" fill="#6B7280" text-anchor="middle">10</text><text x="40" y="70" font-size="3" fill="#6B7280" text-anchor="middle">50</text><text x="60" y="70" font-size="3" fill="#6B7280" text-anchor="middle">120</text></svg>',
          explanation: 'The tolerance value increases with nominal diameter. For example, IT7 tolerance for ∅6-10 mm is 0.015 mm, but for ∅100-120 mm it is 0.035 mm.',
          hint: 'Is it equally easy to hold ±0.01 mm on a 5 mm part.'
        },
        {
          id: 'u9-L1-Q14',
          type: 'multiple-choice',
          question: 'A designer specifies ∅30 +0.021/+0.000 mm for a bore. What type of tolerancing is this?',
          options: [
            'Bilateral symmetric tolerancing — equal deviations both sides',
            'Bilateral asymmetric tolerancing — unequal deviations both sides',
            'Unilateral tolerancing — both deviations on the same side',
            'Limit dimensioning — stated as max and min values directly'
          ],
          correctIndex: 2,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Unilateral Tolerance</text><line x1="40" y1="68" x2="40" y2="16" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="44" x2="68" y2="44" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="10" y="46" font-size="3" fill="#6B7280">nom</text><rect x="28" y="28" width="24" height="16" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><text x="58" y="30" font-size="3.5" fill="#334155">+0.021</text><text x="58" y="46" font-size="3.5" fill="#334155">+0.000</text><text x="40" y="38" font-size="4.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Bore</text><text x="40" y="58" font-size="3.5" fill="#6B7280" text-anchor="middle">Both deviations same side</text></svg>',
          explanation: 'Both deviations are on the same side of nominal (zero and positive), making this unilateral tolerancing. The bore ranges from ∅30.000 to ∅30.021 mm, always at or above nominal.',
          hint: 'Look at whether the deviations straddle the nominal.'
        },
        {
          id: 'u9-L1-Q15',
          type: 'multiple-choice',
          question: 'What is "limit dimensioning" and when is it preferred over plus/minus tolerancing?',
          options: [
            'Limit dimensioning is another name for bilateral tolerancing',
            'Limit dimensioning states the max and min acceptable sizes directly',
            'Limit dimensioning only applies to angular dimensions on drawings',
            'Limit dimensioning means using the tightest tolerance possible'
          ],
          correctIndex: 1,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Limit Dimensioning</text><rect x="10" y="20" width="60" height="24" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="32" r="8" fill="white" stroke="#3B8700" stroke-width="1.5"/><line x1="52" y1="28" x2="68" y2="20" stroke="#3B8700" stroke-width="0.6"/><text x="56" y="18" font-size="5" fill="#334155" font-weight="bold">30.021</text><text x="56" y="24" font-size="5" fill="#334155" font-weight="bold">30.000</text><line x1="56" y1="19" x2="72" y2="19" stroke="#3B8700" stroke-width="0.4"/><text x="40" y="58" font-size="3.5" fill="#6B7280" text-anchor="middle">Max and min sizes directly</text><text x="40" y="68" font-size="3.5" fill="#58CC02" text-anchor="middle">No math needed</text></svg>',
          explanation: 'Limit dimensioning presents the two extreme acceptable values directly (e.g., ∅30.021 over ∅30.000). The machinist does not need to add or subtract deviations from a nominal .',
          hint: 'Consider which method gives the machinist the clearest.'
        },
        {
          id: 'u9-L1-Q16',
          type: 'true-false',
          question: 'The "basic size" (nominal size) in an ISO fit system is the size from which all deviations are calculated, and it is the same?',
          correctAnswer: true,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Basic Size</text><rect x="8" y="24" width="26" height="36" rx="2" fill="#58CC02" opacity="0.08" stroke="#58CC02" stroke-width="1.5"/><rect x="46" y="24" width="26" height="36" rx="2" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/><text x="21" y="44" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">Hole</text><text x="59" y="44" font-size="4" fill="#3B8700" text-anchor="middle" font-weight="bold">Shaft</text><line x1="34" y1="42" x2="46" y2="42" stroke="#A5E86C" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/><text x="40" y="68" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Same nominal for both</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Max Clearance</text><line x1="40" y1="70" x2="40" y2="14" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><rect x="16" y="26" width="14" height="28" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1"/><text x="23" y="42" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">H8</text><text x="12" y="28" font-size="3" fill="#334155">50.039</text><text x="12" y="56" font-size="3" fill="#334155">50.000</text><rect x="50" y="42" width="14" height="18" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><text x="57" y="54" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">f7</text><text x="68" y="44" font-size="3" fill="#334155">49.975</text><text x="68" y="62" font-size="3" fill="#334155">49.950</text><line x1="30" y1="26" x2="50" y2="60" stroke="#A5E86C" stroke-width="1.5" stroke-dasharray="3,2"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/></line><text x="40" y="72" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">= 0.089 mm</text></svg>',
          explanation: 'Maximum clearance = maximum hole size − minimum shaft size = 50.039 − 49.950 = 0.089 mm. This is the loosest possible fit condition.',
          hint: 'Maximum clearance occurs when the hole is at its largest.'
        },
        {
          id: 'u9-L1-Q18',
          type: 'fill-blank',
          question: 'A fit where the tolerance zones of the hole and shaft overlap, potentially resulting in either clearance or interference, is _____?',
          blanks: ['transition'],
          wordBank: ['transition', 'clearance', 'interference', 'sliding', 'running'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Transition Fit</text><line x1="40" y1="68" x2="40" y2="14" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="40" x2="68" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><rect x="18" y="28" width="14" height="22" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1"/><rect x="48" y="32" width="14" height="18" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><rect x="32" y="32" width="16" height="8" rx="0.5" fill="#A5E86C" opacity="0.25"><animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/></rect><text x="40" y="37" font-size="3" fill="#334155" text-anchor="middle">overlap</text><text x="25" y="42" font-size="3.5" fill="#58CC02" text-anchor="middle">Hole</text><text x="55" y="44" font-size="3.5" fill="#3B8700" text-anchor="middle">Shaft</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Zones overlap</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">H Hole Popularity</text><rect x="8" y="18" width="64" height="20" rx="2" fill="#58CC02" opacity="0.08" stroke="#58CC02" stroke-width="1"/><text x="40" y="30" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">H hole: lower dev = 0</text><text x="40" y="36" font-size="3.5" fill="#334155" text-anchor="middle">Standard reamers match H</text><rect x="14" y="46" width="12" height="8" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><rect x="34" y="46" width="12" height="8" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><rect x="54" y="46" width="12" height="8" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><text x="20" y="52" font-size="3" fill="#334155" text-anchor="middle">H6</text><text x="40" y="52" font-size="3" fill="#334155" text-anchor="middle">H7</text><text x="60" y="52" font-size="3" fill="#334155" text-anchor="middle">H8</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Off-the-shelf tooling</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Press Fit Torque</text><circle cx="40" cy="40" r="20" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1.5"/><circle cx="40" cy="40" r="12" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><g><animateTransform attributeName="transform" type="rotate" values="0,40,40;10,40,40;0,40,40;-10,40,40;0,40,40" dur="2s" repeatCount="indefinite"/><line x1="40" y1="28" x2="40" y2="20" stroke="#3B8700" stroke-width="1.5"/><polygon points="37,22 40,16 43,22" fill="#3B8700" opacity="0.5"/></g><text x="40" y="43" font-size="3.5" fill="#334155" text-anchor="middle" font-weight="bold">contact</text><text x="40" y="64" font-size="3.5" fill="#6B7280" text-anchor="middle">More interference = more torque</text></svg>',
          explanation: 'The torque transmitted by an interference fit depends on: contact pressure (p), which is a function of interference, material properties, and geometry (thick-walled cylinder theory — Lame equations).',
          hint: 'The friction force depends on normal pressure,.'
        },
        {
          id: 'u9-L1-Q21',
          type: 'true-false',
          question: 'When specifying tolerances, the designer should always use the tightest tolerance achievable by the manufacturing process to?',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Cost vs Tolerance</text><line x1="12" y1="65" x2="68" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="12" y1="65" x2="12" y2="15" stroke="#3B8700" stroke-width="0.8"/><path d="M16,62 Q28,60 38,50 Q48,35 56,18" stroke="#58CC02" stroke-width="2" fill="none"/><text x="40" y="76" font-size="3.5" fill="#334155" text-anchor="middle">Tighter tolerance</text><text x="8" y="40" font-size="3" fill="#334155" text-anchor="middle" transform="rotate(-90,8,40)">Cost</text><circle cx="50" cy="28" r="8" fill="none" stroke="#EC4899" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/><text x="50" y="30" font-size="3" fill="#EC4899" text-anchor="middle">avoid</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Thermal Expansion</text><circle cx="26" cy="40" r="14" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1.5"/><circle cx="26" cy="40" r="8" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><text x="26" y="42" font-size="3" fill="#334155" text-anchor="middle">20C</text><circle cx="58" cy="40" r="14" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1.5"/><circle cx="58" cy="40" r="10" fill="#EC4899" opacity="0.08" stroke="#EC4899" stroke-width="1.5" stroke-dasharray="2,2"><animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/></circle><text x="58" y="42" font-size="3" fill="#EC4899" text-anchor="middle">Hot</text><text x="26" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Fit OK</text><text x="58" y="62" font-size="3.5" fill="#EC4899" text-anchor="middle">Tighter!</text><text x="42" y="42" font-size="6" fill="#334155">&#x2192;</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Tolerance vs Allowance</text><rect x="6" y="18" width="30" height="30" rx="2" fill="#58CC02" opacity="0.08" stroke="#58CC02" stroke-width="1"/><text x="21" y="28" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Tolerance</text><text x="21" y="36" font-size="3" fill="#334155" text-anchor="middle">Single part</text><text x="21" y="42" font-size="3" fill="#334155" text-anchor="middle">variation</text><rect x="44" y="18" width="30" height="30" rx="2" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1"/><text x="59" y="28" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Allowance</text><text x="59" y="36" font-size="3" fill="#334155" text-anchor="middle">Mating pair</text><text x="59" y="42" font-size="3" fill="#334155" text-anchor="middle">intentional</text><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Tolerance: max-min of one part</text><text x="40" y="70" font-size="3.5" fill="#6B7280" text-anchor="middle">Allowance: tightest fit of two</text></svg>',
          explanation: 'Tolerance is a single-part concept — the difference between the maximum and minimum limits of a dimension (e.g., a 0.02 mm tolerance band).',
          hint: 'One describes variation in a single dimension; the other.'
        },
        {
          id: 'u9-L1-Q24',
          type: 'fill-blank',
          question: 'In the ISO system, an "H" hole has its _____ deviation equal to zero, while an "h" shaft has its _____ deviation equal to zero.',
          blanks: ['lower', 'upper'],
          wordBank: ['lower', 'upper', 'fundamental', 'nominal', 'bilateral'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">H Hole and h Shaft</text><line x1="40" y1="68" x2="40" y2="16" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="8" y1="42" x2="72" y2="42" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="8" y="44" font-size="3" fill="#6B7280">nom</text><rect x="16" y="26" width="16" height="16" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1"/><text x="24" y="36" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">H</text><text x="24" y="22" font-size="3" fill="#334155" text-anchor="middle">lower=0</text><rect x="50" y="42" width="16" height="16" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><text x="58" y="52" font-size="4" fill="#3B8700" text-anchor="middle" font-weight="bold">h</text><text x="58" y="62" font-size="3" fill="#334155" text-anchor="middle">upper=0</text></svg>',
          explanation: 'For an H-type hole, the fundamental (lower) deviation is zero, meaning the minimum hole size equals the basic (nominal) size. The tolerance zone extends above nominal.',
          hint: 'The H hole starts at nominal and extends upward.'
        },
        {
          id: 'u9-L1-Q25',
          type: 'multiple-choice',
          question: 'Which correctly ranks these manufacturing processes from tightest to loosest typical tolerance capability?',
          options: [
            'Sand casting → milling → grinding → lapping (loosest to tightest)',
            'Lapping → grinding → turning → milling → die casting → sand casting',
            'Milling → grinding → lapping → sand casting (mixed ordering)',
            'Grinding → lapping → milling → sand casting (incorrect sequence)'
          ],
          correctIndex: 1,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Process Capability Ranking</text><rect x="8" y="12" width="64" height="8" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="0.8"/><text x="40" y="18" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Lapping (IT1-3)</text><rect x="8" y="22" width="64" height="8" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="0.8"/><text x="40" y="28" font-size="3.5" fill="#334155" text-anchor="middle">Grinding (IT4-6)</text><rect x="8" y="32" width="64" height="8" rx="1" fill="#A5E86C" opacity="0.15" stroke="#A5E86C" stroke-width="0.8"/><text x="40" y="38" font-size="3.5" fill="#334155" text-anchor="middle">Turning (IT6-9)</text><rect x="8" y="42" width="64" height="8" rx="1" fill="#A5E86C" opacity="0.2" stroke="#A5E86C" stroke-width="0.8"/><text x="40" y="48" font-size="3.5" fill="#334155" text-anchor="middle">Milling (IT7-10)</text><rect x="8" y="52" width="64" height="8" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="0.8"/><text x="40" y="58" font-size="3.5" fill="#334155" text-anchor="middle">Die Casting (IT8-10)</text><rect x="8" y="62" width="64" height="8" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="0.8"/><text x="40" y="68" font-size="3.5" fill="#334155" text-anchor="middle">Sand Casting (IT11-16)</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">ASME Rule #1</text><rect x="10" y="16" width="60" height="20" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="26" r="7" fill="white" stroke="#3B8700" stroke-width="1.2"/><text x="40" y="28" font-size="3" fill="#334155" text-anchor="middle">dia 20</text><circle cx="40" cy="54" r="14" fill="none" stroke="#58CC02" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.5"/><text x="40" y="52" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Perfect form</text><text x="40" y="57" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">at MMC</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Envelope Principle</text></svg>',
          explanation: 'ASME Y14.5 Rule #1 (the Envelope Principle or Taylor Principle) states that the surface of a regular feature of size at MMC must not extend beyond the envelope of perfect form at MMC.',
          hint: 'ASME Rule #1 ties form control to the MMC size.'
        },
        {
          id: 'u9-L1-Q27',
          type: 'true-false',
          question: 'The ISO default for regular features of size is the Envelope Principle (perfect form at MMC), the same as ASME Y14.5 Rule #1.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">ASME vs ISO Default</text><rect x="4" y="16" width="34" height="26" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="24" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">ASME</text><text x="21" y="32" font-size="3" fill="#334155" text-anchor="middle">Rule #1 default</text><text x="21" y="38" font-size="3" fill="#334155" text-anchor="middle">Envelope ON</text><rect x="42" y="16" width="34" height="26" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="24" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">ISO</text><text x="59" y="32" font-size="3" fill="#334155" text-anchor="middle">Independence</text><text x="59" y="38" font-size="3" fill="#334155" text-anchor="middle">Envelope OFF</text><text x="40" y="54" font-size="3.5" fill="#6B7280" text-anchor="middle">Key difference between standards</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">ISO 2768-mK</text><rect x="8" y="16" width="64" height="16" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="27" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">ISO 2768 - mK</text><rect x="10" y="40" width="18" height="14" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="0.8"/><text x="19" y="48" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">m</text><text x="19" y="52" font-size="3" fill="#334155" text-anchor="middle">dim tol</text><rect x="52" y="40" width="18" height="14" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="0.8"/><text x="61" y="48" font-size="4" fill="#3B8700" text-anchor="middle" font-weight="bold">K</text><text x="61" y="52" font-size="3" fill="#334155" text-anchor="middle">geo tol</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">m=medium dimensional K=geometric</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">H7/h6 Sliding Fit</text><circle cx="40" cy="40" r="18" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1.5"/><circle cx="40" cy="40" r="14" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><line x1="54" y1="26" x2="62" y2="18" stroke="#A5E86C" stroke-width="0.8" opacity="0.5"/><text x="64" y="20" font-size="3.5" fill="#6B7280">tiny gap</text><g><animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,0" dur="1.5s" repeatCount="indefinite"/><circle cx="40" cy="40" r="14" fill="none" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.3"/></g><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Hand-insertable, minimal play</text></svg>',
          explanation: 'H7/h6 is a precision sliding fit (also called a "push fit" or "snug fit") that allows hand insertion with very little clearance.',
          hint: 'You want minimal play but hand-insertable.'
        },
        {
          id: 'u9-L1-Q30',
          type: 'fill-blank',
          question: 'When both the upper and lower deviations of a tolerance are on the same side of the nominal dimension, this is called _____ tolerancing.',
          blanks: ['unilateral'],
          wordBank: ['unilateral', 'bilateral', 'symmetric', 'limit', 'geometric'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Unilateral Tolerancing</text><line x1="40" y1="68" x2="40" y2="18" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="42" x2="68" y2="42" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="10" y="44" font-size="3" fill="#6B7280">nom</text><rect x="26" y="42" width="14" height="16" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><text x="33" y="52" font-size="3.5" fill="#58CC02" text-anchor="middle">+0/-0.05</text><rect x="48" y="26" width="14" height="16" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.2"/><text x="55" y="36" font-size="3.5" fill="#3B8700" text-anchor="middle">+0.05/+0</text><text x="33" y="66" font-size="3" fill="#6B7280" text-anchor="middle">Both below</text><text x="55" y="22" font-size="3" fill="#6B7280" text-anchor="middle">Both above</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Flatness on Cylinder?</text><rect x="20" y="20" width="40" height="30" rx="10" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><ellipse cx="40" cy="20" rx="20" ry="6" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1"/><ellipse cx="40" cy="50" rx="20" ry="6" fill="none" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.3"/><line x1="50" y1="56" x2="58" y2="64" stroke="#EC4899" stroke-width="1"/><text x="60" y="68" font-size="4" fill="#EC4899" font-weight="bold">X wrong</text><text x="40" y="78" font-size="3.5" fill="#6B7280" text-anchor="middle">Use cylindricity instead</text></svg>',
          explanation: 'Flatness is a form tolerance that applies only to nominally flat (planar) surfaces .',
          hint: 'Consider which geometric surfaces each form tolerance.'
        },
        {
          id: 'u9-L2-Q3',
          type: 'multiple-choice',
          question: 'When would you specify a profile of a surface tolerance instead of combining individual form and orientation tolerances?',
          options: [
            'Profile tolerance is only for aesthetic surfaces where appearance matters',
            'When controlling shape, orientation, and location of a complex surface',
            'Profile is always preferred over any other geometric tolerance type',
            'Only when the surface is flat — profile cannot apply to curved surfaces'
          ],
          correctIndex: 1,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Profile of a Surface</text><path d="M10,50 Q20,20 40,35 Q60,50 70,25" stroke="#58CC02" stroke-width="2" fill="none"/><path d="M10,53 Q20,23 40,38 Q60,53 70,28" stroke="#A5E86C" stroke-width="0.8" fill="none" stroke-dasharray="2,2" opacity="0.5"/><path d="M10,47 Q20,17 40,32 Q60,47 70,22" stroke="#A5E86C" stroke-width="0.8" fill="none" stroke-dasharray="2,2" opacity="0.5"/><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Controls form + orientation + location</text><text x="40" y="76" font-size="3.5" fill="#58CC02" text-anchor="middle">Most versatile GD&amp;T tolerance</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">CMM vs Assembly Datums</text><rect x="6" y="18" width="30" height="24" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="26" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">CMM</text><text x="21" y="34" font-size="3" fill="#334155" text-anchor="middle">datum setup</text><rect x="44" y="18" width="30" height="24" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="26" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Assembly</text><text x="59" y="34" font-size="3" fill="#334155" text-anchor="middle">datum contact</text><text x="40" y="32" font-size="5" fill="#EC4899" text-anchor="middle">&#x2260;</text><text x="40" y="56" font-size="3.5" fill="#EC4899" text-anchor="middle">Mismatch causes failures!</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">CMM must replicate assembly</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">LMC - Min Wall</text><rect x="10" y="20" width="60" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="38" r="12" fill="white" stroke="#3B8700" stroke-width="1.5"/><line x1="52" y1="38" x2="70" y2="38" stroke="#A5E86C" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><text x="64" y="36" font-size="3" fill="#334155" text-anchor="middle">min</text><text x="64" y="42" font-size="3" fill="#334155" text-anchor="middle">wall</text><text x="40" y="40" font-size="3.5" fill="#334155" text-anchor="middle">LMC hole</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">LMC protects minimum material</text></svg>',
          explanation: 'LMC is used when the critical concern is minimum wall thickness or minimum remaining material — for example, a hole close to an edge, or a bore close to an outer diameter.',
          hint: 'Consider when having less material is the dangerous.'
        },
        {
          id: 'u9-L2-Q6',
          type: 'fill-blank',
          question: 'The condition where a feature of size contains the maximum amount of material is called _____.',
          blanks: ['MMC'],
          wordBank: ['MMC', 'LMC', 'RFS', 'MMS', 'VCB'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">MMC Condition</text><rect x="8" y="18" width="28" height="40" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="22" y="30" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Hole</text><text x="22" y="38" font-size="3" fill="#334155" text-anchor="middle">MMC =</text><text x="22" y="44" font-size="3" fill="#334155" text-anchor="middle">smallest</text><circle cx="22" cy="52" r="4" fill="white" stroke="#3B8700" stroke-width="1"/><rect x="44" y="18" width="28" height="40" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="58" y="30" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Shaft</text><text x="58" y="38" font-size="3" fill="#334155" text-anchor="middle">MMC =</text><text x="58" y="44" font-size="3" fill="#334155" text-anchor="middle">largest</text><circle cx="58" cy="52" r="6" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><text x="40" y="70" font-size="3.5" fill="#6B7280" text-anchor="middle">Most material everywhere</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">5 GD&amp;T Categories</text><rect x="4" y="12" width="14" height="14" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="0.8"/><text x="11" y="21" font-size="3.5" fill="#334155" text-anchor="middle">Form</text><rect x="20" y="12" width="18" height="14" rx="1" fill="#A5E86C" opacity="0.15" stroke="#A5E86C" stroke-width="0.8"/><text x="29" y="21" font-size="3.5" fill="#334155" text-anchor="middle">Orient.</text><rect x="40" y="12" width="16" height="14" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="0.8"/><text x="48" y="21" font-size="3.5" fill="#334155" text-anchor="middle">Locat.</text><rect x="58" y="12" width="18" height="14" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="0.8"/><text x="67" y="21" font-size="3" fill="#334155" text-anchor="middle">Profile</text><rect x="22" y="30" width="36" height="10" rx="1" fill="#A5E86C" opacity="0.1" stroke="#A5E86C" stroke-width="0.8"/><text x="40" y="37" font-size="3.5" fill="#334155" text-anchor="middle">Runout</text><text x="40" y="52" font-size="3" fill="#6B7280" text-anchor="middle">Form: flatness, straightness...</text><text x="40" y="58" font-size="3" fill="#6B7280" text-anchor="middle">Orient: perp, parallel, angular</text><text x="40" y="64" font-size="3" fill="#6B7280" text-anchor="middle">Location: position, concentricity</text><text x="40" y="70" font-size="3" fill="#6B7280" text-anchor="middle">Profile: line, surface</text><text x="40" y="76" font-size="3" fill="#6B7280" text-anchor="middle">Runout: circular, total</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Circularity vs Cylindricity</text><rect x="4" y="16" width="34" height="48" rx="2" fill="#58CC02" opacity="0.04" stroke="#58CC02" stroke-width="1"/><text x="21" y="24" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Circularity</text><ellipse cx="21" cy="42" rx="10" ry="4" fill="none" stroke="#58CC02" stroke-width="1.5"/><ellipse cx="21" cy="42" rx="8" ry="3" fill="none" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="2,2"/><text x="21" y="56" font-size="3" fill="#6B7280" text-anchor="middle">2D slice</text><rect x="42" y="16" width="34" height="48" rx="2" fill="#3B8700" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="59" y="24" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Cylindricity</text><ellipse cx="59" cy="32" rx="10" ry="4" fill="none" stroke="#3B8700" stroke-width="1"/><ellipse cx="59" cy="50" rx="10" ry="4" fill="none" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.3"/><line x1="49" y1="32" x2="49" y2="50" stroke="#3B8700" stroke-width="1"/><line x1="69" y1="32" x2="69" y2="50" stroke="#3B8700" stroke-width="1"/><text x="59" y="56" font-size="3" fill="#6B7280" text-anchor="middle">Full 3D</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Bonus Tolerance at MMC</text><line x1="10" y1="65" x2="70" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="10" y1="65" x2="10" y2="20" stroke="#3B8700" stroke-width="0.8"/><rect x="16" y="52" width="10" height="13" rx="0.5" fill="#58CC02" opacity="0.3" stroke="#58CC02" stroke-width="0.8"/><text x="21" y="60" font-size="3" fill="#334155" text-anchor="middle">0.25</text><rect x="30" y="42" width="10" height="23" rx="0.5" fill="#A5E86C" opacity="0.3" stroke="#A5E86C" stroke-width="0.8"/><rect x="30" y="52" width="10" height="13" rx="0.5" fill="#58CC02" opacity="0.3" stroke="#58CC02" stroke-width="0.8"/><text x="35" y="48" font-size="2.5" fill="#334155" text-anchor="middle">+0.1</text><rect x="44" y="32" width="10" height="33" rx="0.5" fill="#A5E86C" opacity="0.3" stroke="#A5E86C" stroke-width="0.8"/><rect x="44" y="52" width="10" height="13" rx="0.5" fill="#58CC02" opacity="0.3" stroke="#58CC02" stroke-width="0.8"/><text x="49" y="44" font-size="2.5" fill="#334155" text-anchor="middle">+0.3</text><rect x="58" y="24" width="10" height="41" rx="0.5" fill="#A5E86C" opacity="0.3" stroke="#A5E86C" stroke-width="0.8"/><rect x="58" y="52" width="10" height="13" rx="0.5" fill="#58CC02" opacity="0.3" stroke="#58CC02" stroke-width="0.8"/><text x="63" y="40" font-size="2.5" fill="#334155" text-anchor="middle">+0.5</text><text x="21" y="72" font-size="3" fill="#6B7280" text-anchor="middle">MMC</text><text x="49" y="72" font-size="3" fill="#6B7280" text-anchor="middle">10.3</text><text x="63" y="72" font-size="3" fill="#6B7280" text-anchor="middle">LMC</text><text x="40" y="18" font-size="3" fill="#58CC02" text-anchor="middle">stated tol</text><text x="60" y="18" font-size="3" fill="#A5E86C" text-anchor="middle">bonus</text></svg>',
          explanation: 'With the MMC modifier, bonus tolerance = actual size − MMC size. The hole MMC is ∅10.0 (smallest hole = most material). At ∅10.3: bonus = 10.3 − 10.0 = 0.30.',
          hint: 'Bonus = departure from MMC.'
        },
        {
          id: 'u9-L2-Q10',
          type: 'true-false',
          question: 'Form tolerances require datum references in the feature control frame.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Form = No Datums</text><rect x="8" y="16" width="64" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><line x1="22" y1="16" x2="22" y2="30" stroke="#3B8700" stroke-width="1"/><rect x="9" y="17" width="12" height="12" rx="0.5" fill="none" stroke="#58CC02" stroke-width="0.8"/><text x="15" y="25" font-size="4" fill="#58CC02" text-anchor="middle">&#x23E5;</text><text x="36" y="25" font-size="4" fill="#334155" text-anchor="middle">0.05</text><text x="55" y="25" font-size="4" fill="#EC4899" text-anchor="middle">no datum</text><text x="40" y="46" font-size="3.5" fill="#6B7280" text-anchor="middle">Form tolerances are self-referencing</text><text x="40" y="56" font-size="3.5" fill="#6B7280" text-anchor="middle">Controls shape against itself</text><text x="40" y="66" font-size="3.5" fill="#58CC02" text-anchor="middle">Flatness, straightness,</text><text x="40" y="73" font-size="3.5" fill="#58CC02" text-anchor="middle">circularity, cylindricity</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Circular vs Total Runout</text><rect x="4" y="14" width="34" height="50" rx="2" fill="#58CC02" opacity="0.04" stroke="#58CC02" stroke-width="1"/><text x="21" y="22" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Circular</text><line x1="10" y1="44" x2="32" y2="44" stroke="#3B8700" stroke-width="1.5"/><circle cx="21" cy="44" r="0.5" fill="#3B8700"/><text x="21" y="38" font-size="3" fill="#6B7280" text-anchor="middle">one slice</text><text x="21" y="56" font-size="3" fill="#6B7280" text-anchor="middle">cross-section</text><rect x="42" y="14" width="34" height="50" rx="2" fill="#3B8700" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="59" y="22" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Total</text><line x1="48" y1="36" x2="70" y2="36" stroke="#3B8700" stroke-width="0.8"/><line x1="48" y1="40" x2="70" y2="40" stroke="#3B8700" stroke-width="0.8"/><line x1="48" y1="44" x2="70" y2="44" stroke="#3B8700" stroke-width="0.8"/><line x1="48" y1="48" x2="70" y2="48" stroke="#3B8700" stroke-width="0.8"/><line x1="48" y1="52" x2="70" y2="52" stroke="#3B8700" stroke-width="0.8"/><text x="59" y="58" font-size="3" fill="#6B7280" text-anchor="middle">entire surface</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Perpendicularity Zone</text><line x1="10" y1="60" x2="70" y2="60" stroke="#3B8700" stroke-width="2"/><text x="68" y="58" font-size="3.5" fill="#334155">A</text><polygon points="64,60 62,66 66,66" fill="#3B8700" opacity="0.4"/><rect x="30" y="20" width="20" height="40" rx="1" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><rect x="32" y="20" width="0.5" height="40" fill="#A5E86C" opacity="0.3"/><rect x="47.5" y="20" width="0.5" height="40" fill="#A5E86C" opacity="0.3"/><text x="40" y="42" font-size="3.5" fill="#334155" text-anchor="middle">0.05</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Two planes 0.05 apart at 90 deg</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Virtual Condition</text><circle cx="40" cy="40" r="18" fill="none" stroke="#EC4899" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.5"/><circle cx="40" cy="40" r="15" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="38" font-size="3.5" fill="#334155" text-anchor="middle">MMC=20.1</text><text x="40" y="44" font-size="3.5" fill="#334155" text-anchor="middle">+perp 0.05</text><text x="40" y="62" font-size="4" fill="#EC4899" text-anchor="middle" font-weight="bold">VC = 20.15</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Worst-case boundary</text></svg>',
          explanation: 'Virtual condition is the worst-case boundary that a feature can occupy, considering both its size and geometric tolerance. For an external feature at MMC.',
          hint: 'The worst-case boundary for an external feature = largest.'
        },
        {
          id: 'u9-L2-Q14',
          type: 'true-false',
          question: 'Straightness applied to the axis of a cylindrical feature allows the feature to violate Rule #1 — meaning the actual local sizes?',
          correctAnswer: true,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Axis Straightness</text><rect x="15" y="28" width="50" height="24" rx="3" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><line x1="15" y1="40" x2="65" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><path d="M18,40 Q30,36 40,42 Q50,44 62,38" stroke="#58CC02" stroke-width="1.5" fill="none"/><ellipse cx="15" cy="40" rx="1.5" ry="4" fill="none" stroke="#A5E86C" stroke-width="0.8" opacity="0.5"/><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Axis can bow within dia zone</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Can violate Rule #1 envelope</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Concentricity vs Position</text><rect x="4" y="14" width="34" height="46" rx="2" fill="#58CC02" opacity="0.04" stroke="#58CC02" stroke-width="1"/><text x="21" y="22" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Concentricity</text><text x="21" y="32" font-size="3" fill="#334155" text-anchor="middle">Derived median</text><text x="21" y="38" font-size="3" fill="#334155" text-anchor="middle">line analysis</text><text x="21" y="50" font-size="3" fill="#EC4899" text-anchor="middle">Expensive!</text><rect x="42" y="14" width="34" height="46" rx="2" fill="#3B8700" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="59" y="22" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Position RFS</text><text x="59" y="32" font-size="3" fill="#334155" text-anchor="middle">Axis-based</text><text x="59" y="38" font-size="3" fill="#334155" text-anchor="middle">measurement</text><text x="59" y="50" font-size="3" fill="#58CC02" text-anchor="middle">Preferred</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Position preferred for coaxiality</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Angularity Zone</text><line x1="10" y1="65" x2="70" y2="65" stroke="#3B8700" stroke-width="2"/><text x="68" y="62" font-size="3.5" fill="#334155">A</text><polygon points="64,65 62,71 66,71" fill="#3B8700" opacity="0.4"/><line x1="30" y1="65" x2="55" y2="22" stroke="#3B8700" stroke-width="1.5"/><line x1="28" y1="64" x2="53" y2="21" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.5"/><line x1="32" y1="66" x2="57" y2="23" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.5"/><text x="50" y="48" font-size="3.5" fill="#334155">0.1 zone</text><path d="M36,65 A8,8 0 0,1 39,58" stroke="#6B7280" stroke-width="0.6" fill="none"/><text x="42" y="62" font-size="3.5" fill="#6B7280">45</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Bonus Tolerance</text><rect x="10" y="18" width="60" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><circle cx="18" cy="25" r="4" stroke="#58CC02" stroke-width="1" fill="none"/><line x1="18" y1="21" x2="18" y2="29" stroke="#58CC02" stroke-width="0.8"/><line x1="14" y1="25" x2="22" y2="25" stroke="#58CC02" stroke-width="0.8"/><text x="36" y="27" font-size="4" fill="#334155">0.25</text><circle cx="48" cy="25" r="3.5" stroke="#334155" stroke-width="0.8" fill="none"/><text x="48" y="27" font-size="4" fill="#334155" text-anchor="middle">M</text><text x="40" y="46" font-size="3.5" fill="#58CC02" text-anchor="middle">Stated tolerance: 0.25</text><text x="40" y="54" font-size="3.5" fill="#A5E86C" text-anchor="middle">+ Bonus when departing MMC</text><text x="40" y="62" font-size="3.5" fill="#334155" text-anchor="middle" font-weight="bold">Total = stated + bonus</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Bonus = actual size - MMC size</text></svg>',
          explanation: 'Bonus tolerance is the additional geometric tolerance gained as a feature of size departs from the specified material condition.',
          hint: 'When a hole is larger than its minimum, does it need.'
        },
        {
          id: 'u9-L2-Q18',
          type: 'fill-blank',
          question: 'The geometric tolerance that controls the overall 3D form of a cylindrical surface — combining roundness, straightness, and _____?',
          blanks: ['cylindricity'],
          wordBank: ['cylindricity', 'circularity', 'concentricity', 'straightness', 'total runout'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Cylindricity</text><ellipse cx="40" cy="24" rx="16" ry="6" fill="none" stroke="#58CC02" stroke-width="1.5"/><ellipse cx="40" cy="56" rx="16" ry="6" fill="none" stroke="#58CC02" stroke-width="1.5" stroke-dasharray="2,2" opacity="0.3"/><line x1="24" y1="24" x2="24" y2="56" stroke="#58CC02" stroke-width="1.5"/><line x1="56" y1="24" x2="56" y2="56" stroke="#58CC02" stroke-width="1.5"/><ellipse cx="40" cy="24" rx="13" ry="5" fill="none" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.5"/><line x1="27" y1="24" x2="27" y2="56" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.5"/><line x1="53" y1="24" x2="53" y2="56" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.5"/><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Two coaxial cylinders = zone</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Orientation Controls Form</text><line x1="10" y1="55" x2="70" y2="55" stroke="#3B8700" stroke-width="2"/><text x="68" y="52" font-size="3.5" fill="#334155">A</text><rect x="15" y="35" width="50" height="0.5" fill="#A5E86C" opacity="0.4"/><rect x="15" y="55" width="50" height="0.5" fill="#A5E86C" opacity="0.4"/><text x="68" y="38" font-size="3" fill="#334155">0.02</text><path d="M18,45 Q28,38 40,46 Q52,50 62,42" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="40" y="28" font-size="3.5" fill="#58CC02" text-anchor="middle">Parallelism 0.02</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Form inherently controlled</text></svg>',
          explanation: 'Orientation tolerances inherently refine form. If a surface must lie between two parallel planes 0.02 apart (the parallelism zone), then by definition it cannot have flatness error greater than 0.02.',
          hint: 'If a surface is constrained between two planes 0.02 apart.'
        },
        {
          id: 'u9-L2-Q20',
          type: 'true-false',
          question: 'Position tolerance in ASME Y14.5 always requires at least one datum reference in the feature control frame.',
          correctAnswer: true,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Position Needs Datums</text><rect x="8" y="16" width="64" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><circle cx="16" cy="23" r="4" stroke="#58CC02" stroke-width="1" fill="none"/><line x1="16" y1="19" x2="16" y2="27" stroke="#58CC02" stroke-width="0.8"/><line x1="12" y1="23" x2="20" y2="23" stroke="#58CC02" stroke-width="0.8"/><line x1="22" y1="16" x2="22" y2="30" stroke="#3B8700" stroke-width="1"/><text x="34" y="25" font-size="4" fill="#334155">0.5</text><line x1="44" y1="16" x2="44" y2="30" stroke="#3B8700" stroke-width="1"/><text x="50" y="25" font-size="5" fill="#334155" font-weight="bold">A</text><line x1="56" y1="16" x2="56" y2="30" stroke="#3B8700" stroke-width="1"/><text x="62" y="25" font-size="5" fill="#334155" font-weight="bold">B</text><text x="40" y="46" font-size="3.5" fill="#6B7280" text-anchor="middle">Position = where relative to what</text><text x="40" y="56" font-size="3.5" fill="#6B7280" text-anchor="middle">Always needs reference frame</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Composite Position</text><rect x="8" y="14" width="64" height="12" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.2"/><circle cx="15" cy="20" r="3.5" stroke="#58CC02" stroke-width="0.8" fill="none"/><line x1="15" y1="17" x2="15" y2="23" stroke="#58CC02" stroke-width="0.7"/><line x1="12" y1="20" x2="18" y2="20" stroke="#58CC02" stroke-width="0.7"/><text x="30" y="22" font-size="3.5" fill="#334155">0.5</text><text x="48" y="22" font-size="4" fill="#334155" font-weight="bold">A B C</text><rect x="8" y="26" width="64" height="12" rx="1" fill="#A5E86C" opacity="0.04" stroke="#3B8700" stroke-width="1.2"/><circle cx="15" cy="32" r="3.5" stroke="#58CC02" stroke-width="0.8" fill="none"/><line x1="15" y1="29" x2="15" y2="35" stroke="#58CC02" stroke-width="0.7"/><line x1="12" y1="32" x2="18" y2="32" stroke="#58CC02" stroke-width="0.7"/><text x="30" y="34" font-size="3.5" fill="#334155">0.15</text><text x="48" y="34" font-size="4" fill="#334155" font-weight="bold">A</text><text x="40" y="50" font-size="3.5" fill="#58CC02" text-anchor="middle">Upper: pattern location (PLTZF)</text><text x="40" y="58" font-size="3.5" fill="#A5E86C" text-anchor="middle">Lower: feature-to-feature (FRTZF)</text></svg>',
          explanation: 'Composite position tolerance has two levels: the upper segment (PLTZF — Pattern Locating Tolerance Zone Framework) locates the entire pattern relative to the specified datums (A, B, C).',
          hint: 'Two levels: one for where the whole pattern sits, one.'
        },
        {
          id: 'u9-L2-Q23',
          type: 'true-false',
          question: 'A flatness tolerance of 0.01 mm can be larger than the size tolerance on the same feature under ASME Y14.5 Rule #1.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Rule #1 Limits Form</text><rect x="12" y="20" width="56" height="30" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="35" r="10" fill="white" stroke="#3B8700" stroke-width="1.2"/><text x="40" y="37" font-size="3" fill="#334155" text-anchor="middle">size tol</text><text x="40" y="58" font-size="3.5" fill="#6B7280" text-anchor="middle">Form error cannot exceed size tol</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">Flatness 0.01 within 0.02 size</text><text x="40" y="74" font-size="3.5" fill="#58CC02" text-anchor="middle">Form always less than or equal</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Projected Tol Zone</text><rect x="10" y="40" width="60" height="16" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="48" r="3" fill="white" stroke="#3B8700" stroke-width="1"/><rect x="38" y="16" width="4" height="24" rx="0.5" fill="#3B8700" opacity="0.2"/><rect x="36" y="16" width="8" height="24" rx="1" fill="none" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.5"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/></rect><text x="50" y="28" font-size="3" fill="#A5E86C">projected</text><text x="50" y="34" font-size="3" fill="#A5E86C">zone</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Zone extends into mating space</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Flatness Refines Parallelism</text><line x1="10" y1="65" x2="70" y2="65" stroke="#3B8700" stroke-width="2"/><text x="68" y="62" font-size="3.5" fill="#334155">A</text><rect x="15" y="32" width="50" height="0.5" fill="#3B8700" opacity="0.2"/><rect x="15" y="52" width="50" height="0.5" fill="#3B8700" opacity="0.2"/><text x="70" y="44" font-size="3" fill="#3B8700">0.05</text><rect x="20" y="38" width="40" height="0.5" fill="#58CC02" opacity="0.4"/><rect x="20" y="46" width="40" height="0.5" fill="#58CC02" opacity="0.4"/><text x="64" y="42" font-size="3" fill="#58CC02">0.01</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Valid: form refines orientation</text></svg>',
          explanation: 'This is a valid and common callout. The parallelism tolerance (0.05) defines a zone within which the surface must lie, controlling both its orientation and its form to 0.05.',
          hint: 'A form tolerance tighter than the orientation tolerance.'
        },
        {
          id: 'u9-L2-Q26',
          type: 'fill-blank',
          question: 'In ASME Y14.5-2018, the default modifier is _____, meaning no _____ tolerance is available unless MMC or LMC is explicitly stated.',
          blanks: ['RFS', 'bonus'],
          wordBank: ['RFS', 'bonus', 'MMC', 'datum', 'LMC', 'profile'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">RFS Default</text><rect x="8" y="16" width="64" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><circle cx="16" cy="23" r="4" stroke="#58CC02" stroke-width="1" fill="none"/><line x1="16" y1="19" x2="16" y2="27" stroke="#58CC02" stroke-width="0.8"/><line x1="12" y1="23" x2="20" y2="23" stroke="#58CC02" stroke-width="0.8"/><line x1="22" y1="16" x2="22" y2="30" stroke="#3B8700" stroke-width="1"/><text x="34" y="25" font-size="4" fill="#334155">0.25</text><line x1="44" y1="16" x2="44" y2="30" stroke="#3B8700" stroke-width="1"/><text x="54" y="25" font-size="4" fill="#334155" font-weight="bold">A</text><text x="40" y="42" font-size="3.5" fill="#6B7280" text-anchor="middle">No modifier symbol = RFS</text><text x="40" y="52" font-size="3.5" fill="#6B7280" text-anchor="middle">No bonus tolerance available</text><text x="40" y="62" font-size="3.5" fill="#334155" text-anchor="middle" font-weight="bold">RFS = Regardless of Feature Size</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Circular Runout - Wobble</text><ellipse cx="40" cy="40" rx="24" ry="8" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><line x1="40" y1="20" x2="40" y2="60" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/><g><animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="2s" repeatCount="indefinite"/><circle cx="40" cy="32" r="1.5" fill="#58CC02"/></g><line x1="16" y1="40" x2="10" y2="40" stroke="#A5E86C" stroke-width="1"/><polygon points="11,38.5 8,40 11,41.5" fill="#A5E86C"/><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Indicator reads FIM per section</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Part rotates about datum axis</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Zero Tolerance at MMC</text><line x1="10" y1="65" x2="70" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="10" y1="65" x2="10" y2="20" stroke="#3B8700" stroke-width="0.8"/><line x1="15" y1="65" x2="65" y2="20" stroke="#58CC02" stroke-width="2" fill="none"/><circle cx="15" cy="65" r="2" fill="#3B8700"/><text x="15" y="72" font-size="3" fill="#334155" text-anchor="middle">MMC</text><text x="65" y="18" font-size="3" fill="#334155" text-anchor="middle">LMC</text><text x="8" y="44" font-size="3" fill="#334155" transform="rotate(-90,8,44)">Pos tol</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">All tolerance comes from bonus</text></svg>',
          explanation: 'With zero positional tolerance at MMC, the feature has no positional tolerance at its MMC size .',
          hint: 'If the geometric tolerance is zero at MMC, where does all.'
        },
        {
          id: 'u9-L2-Q29',
          type: 'true-false',
          question: 'Profile of a line and profile of a surface are functionally identical — they control the same thing.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Profile Line vs Surface</text><rect x="4" y="14" width="34" height="46" rx="2" fill="#58CC02" opacity="0.04" stroke="#58CC02" stroke-width="1"/><text x="21" y="22" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Line</text><path d="M10,40 Q15,32 21,38 Q27,44 32,36" stroke="#58CC02" stroke-width="1.2" fill="none"/><text x="21" y="52" font-size="3" fill="#6B7280" text-anchor="middle">2D slices</text><text x="21" y="58" font-size="3" fill="#6B7280" text-anchor="middle">independent</text><rect x="42" y="14" width="34" height="46" rx="2" fill="#3B8700" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="59" y="22" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Surface</text><path d="M48,40 Q53,32 59,38 Q65,44 70,36" stroke="#3B8700" stroke-width="1.2" fill="none"/><path d="M48,44 Q53,36 59,42 Q65,48 70,40" stroke="#3B8700" stroke-width="0.8" fill="none" opacity="0.4"/><text x="59" y="52" font-size="3" fill="#6B7280" text-anchor="middle">Full 3D</text><text x="59" y="58" font-size="3" fill="#6B7280" text-anchor="middle">all at once</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">MMC on Datums</text><rect x="8" y="16" width="64" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><circle cx="16" cy="23" r="4" stroke="#58CC02" stroke-width="1" fill="none"/><line x1="16" y1="19" x2="16" y2="27" stroke="#58CC02" stroke-width="0.8"/><line x1="12" y1="23" x2="20" y2="23" stroke="#58CC02" stroke-width="0.8"/><text x="34" y="25" font-size="4" fill="#334155">0.5 M</text><text x="54" y="25" font-size="4" fill="#334155">A B(M) C(M)</text><text x="40" y="42" font-size="3.5" fill="#6B7280" text-anchor="middle">Datum simulator fixed at VC</text><text x="40" y="52" font-size="3.5" fill="#6B7280" text-anchor="middle">When datum departs from MMC:</text><text x="40" y="62" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Datum shift = extra movement</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Precedence 3-2-1</text><rect x="10" y="55" width="60" height="6" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.5"/><text x="40" y="60" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">A - Primary (3 DOF)</text><rect x="10" y="25" width="6" height="30" rx="1" fill="#A5E86C" opacity="0.15" stroke="#A5E86C" stroke-width="1.2"/><text x="13" y="42" font-size="3" fill="#A5E86C" text-anchor="middle" transform="rotate(-90,13,42)">B (2 DOF)</text><rect x="28" y="25" width="30" height="6" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1"/><text x="43" y="30" font-size="3" fill="#3B8700" text-anchor="middle">C (1 DOF)</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Order matters: A first, then B, C</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Functional Datum Selection</text><rect x="10" y="20" width="60" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><line x1="10" y1="56" x2="70" y2="56" stroke="#58CC02" stroke-width="2"/><text x="72" y="58" font-size="3" fill="#58CC02">A</text><circle cx="30" cy="38" r="5" fill="white" stroke="#3B8700" stroke-width="1"/><circle cx="50" cy="38" r="5" fill="white" stroke="#3B8700" stroke-width="1"/><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Datums = assembly contact surfaces</text><text x="40" y="76" font-size="3.5" fill="#58CC02" text-anchor="middle">Match how part mounts</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Targets</text><line x1="10" y1="50" x2="70" y2="50" stroke="#3B8700" stroke-width="1.5"/><path d="M20,50 Q30,44 40,50 Q50,44 60,50" stroke="#EC4899" stroke-width="1.5" fill="none"/><g><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/><text x="25" y="58" font-size="6" fill="#58CC02" text-anchor="middle">+</text><text x="40" y="58" font-size="6" fill="#58CC02" text-anchor="middle">+</text><text x="55" y="58" font-size="6" fill="#58CC02" text-anchor="middle">+</text></g><text x="25" y="66" font-size="3" fill="#334155" text-anchor="middle">A1</text><text x="40" y="66" font-size="3" fill="#334155" text-anchor="middle">A2</text><text x="55" y="66" font-size="3" fill="#334155" text-anchor="middle">A3</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Specific contact points on rough surface</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Bore as Secondary Datum</text><line x1="10" y1="60" x2="70" y2="60" stroke="#58CC02" stroke-width="2"/><text x="72" y="62" font-size="3" fill="#58CC02">A</text><rect x="15" y="24" width="50" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="42" r="10" fill="white" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="44" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">B</text><polygon points="40,52 38,57 42,57" fill="#3B8700" opacity="0.4"/><text x="56" y="42" font-size="3" fill="#6B7280">2 DOF</text><text x="56" y="48" font-size="3" fill="#6B7280">X + Y</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Bore constrains 2 translations</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Fixture Must Match DRF</text><rect x="6" y="18" width="30" height="24" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="26" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Drawing</text><text x="21" y="34" font-size="3" fill="#334155" text-anchor="middle">DRF: A|B|C</text><rect x="44" y="18" width="30" height="24" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="26" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Fixture</text><text x="59" y="34" font-size="3" fill="#334155" text-anchor="middle">Locators</text><text x="40" y="30" font-size="5" fill="#58CC02">=</text><text x="40" y="54" font-size="3.5" fill="#6B7280" text-anchor="middle">Fixture must simulate datums</text><text x="40" y="64" font-size="3.5" fill="#EC4899" text-anchor="middle">Mismatch = inconsistent parts</text></svg>',
          explanation: 'The manufacturing fixture should replicate the datum reference frame as closely as possible.',
          hint: 'If the part is made using one coordinate system.'
        },
        {
          id: 'u9-L3-Q6',
          type: 'fill-blank',
          question: 'The system of three mutually perpendicular datum planes that fully constrains a part in 6 degrees of freedom is called the datum _____ frame.',
          blanks: ['reference'],
          wordBank: ['reference', 'coordinate', 'alignment', 'constraint', 'feature'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Datum Reference Frame</text><line x1="20" y1="60" x2="70" y2="60" stroke="#58CC02" stroke-width="1.5"/><line x1="20" y1="60" x2="20" y2="20" stroke="#A5E86C" stroke-width="1.5"/><line x1="20" y1="60" x2="8" y2="70" stroke="#3B8700" stroke-width="1.5"/><text x="72" y="62" font-size="4" fill="#58CC02">X</text><text x="18" y="18" font-size="4" fill="#A5E86C">Y</text><text x="6" y="74" font-size="4" fill="#3B8700">Z</text><text x="22" y="58" font-size="3" fill="#334155">origin</text><text x="48" y="45" font-size="3.5" fill="#6B7280" text-anchor="middle">3 mutually perpendicular</text><text x="48" y="50" font-size="3.5" fill="#6B7280" text-anchor="middle">datum planes</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Primary Datum: 3 DOF</text><rect x="12" y="40" width="56" height="4" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="1.5"/><text x="72" y="44" font-size="3" fill="#58CC02">A</text><rect x="20" y="20" width="40" height="20" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><circle cx="26" cy="40" r="1.5" fill="#58CC02"/><circle cx="40" cy="40" r="1.5" fill="#58CC02"/><circle cx="54" cy="40" r="1.5" fill="#58CC02"/><text x="40" y="54" font-size="3.5" fill="#334155" text-anchor="middle">3 contact points</text><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">1 translation + 2 rotations</text><text x="40" y="70" font-size="3.5" fill="#6B7280" text-anchor="middle">= 3 degrees of freedom</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Good Datum Selection</text><rect x="10" y="20" width="60" height="8" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.5"/><text x="72" y="26" font-size="3.5" fill="#58CC02" font-weight="bold">A</text><text x="40" y="26" font-size="3" fill="#334155" text-anchor="middle">Large flat = stable</text><rect x="10" y="28" width="8" height="30" rx="1" fill="#A5E86C" opacity="0.15" stroke="#A5E86C" stroke-width="1.2"/><text x="22" y="44" font-size="3.5" fill="#A5E86C" font-weight="bold">B</text><text x="32" y="44" font-size="3" fill="#334155">Long edge</text><rect x="46" y="28" width="8" height="8" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><text x="58" y="34" font-size="3.5" fill="#3B8700" font-weight="bold">C</text><text x="64" y="34" font-size="3" fill="#334155">End</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Stability decreases each level</text></svg>',
          explanation: 'Good datum selection follows the 3-2-1 principle with practical considerations.',
          hint: 'Stability decreases with each datum level.'
        },
        {
          id: 'u9-L3-Q9',
          type: 'true-false',
          question: 'A datum feature and a datum are the same thing.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Feature vs Datum</text><rect x="6" y="18" width="30" height="28" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="26" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Feature</text><path d="M10,38 Q15,34 21,36 Q27,40 32,35" stroke="#3B8700" stroke-width="1.5" fill="none"/><text x="21" y="44" font-size="3" fill="#6B7280" text-anchor="middle">Real, imperfect</text><rect x="44" y="18" width="30" height="28" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="26" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Datum</text><line x1="48" y1="36" x2="70" y2="36" stroke="#3B8700" stroke-width="1.5"/><text x="59" y="44" font-size="3" fill="#6B7280" text-anchor="middle">Theoretical, perfect</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Feature = physical surface</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Datum = derived ideal geometry</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Simulator</text><rect x="10" y="50" width="60" height="8" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="56" font-size="3.5" fill="#3B8700" text-anchor="middle">Surface Plate</text><rect x="20" y="30" width="40" height="20" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="40" y="42" font-size="3.5" fill="#334155" text-anchor="middle">Part</text><circle cx="28" cy="50" r="1" fill="#58CC02"/><circle cx="40" cy="50" r="1" fill="#58CC02"/><circle cx="52" cy="50" r="1" fill="#58CC02"/><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Physical equipment simulates</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">theoretical datum planes</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Cylinder Primary: 4 DOF</text><rect x="20" y="18" width="40" height="44" rx="12" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><line x1="40" y1="14" x2="40" y2="66" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="40" y="42" font-size="3.5" fill="#334155" text-anchor="middle" font-weight="bold">4 DOF</text><text x="40" y="72" font-size="3" fill="#6B7280" text-anchor="middle">2 translations (X,Y)</text><text x="40" y="78" font-size="3" fill="#6B7280" text-anchor="middle">+ 2 rotations (tilt X,Y)</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Targets</text><rect x="10" y="20" width="60" height="30" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><text x="20" y="38" font-size="5" fill="#58CC02" text-anchor="middle">+</text><text x="40" y="38" font-size="5" fill="#58CC02" text-anchor="middle">+</text><text x="60" y="38" font-size="5" fill="#58CC02" text-anchor="middle">+</text><text x="20" y="46" font-size="3" fill="#334155" text-anchor="middle">A1</text><text x="40" y="46" font-size="3" fill="#334155" text-anchor="middle">A2</text><text x="60" y="46" font-size="3" fill="#334155" text-anchor="middle">A3</text><circle cx="30" y="68" r="3" fill="#A5E86C" opacity="0.2" stroke="#A5E86C" stroke-width="0.8"/><text x="30" y="70" font-size="3" fill="#334155" text-anchor="middle">area</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Points, lines, or areas</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">For cast, forged, sheet metal</text></svg>',
          explanation: 'Datum targets specify the exact contact locations for datum establishment. They are designated as points (crosshair symbol), lines, or circular areas on the datum feature.',
          hint: 'When the entire surface cannot provide repeatable contact.'
        },
        {
          id: 'u9-L3-Q13',
          type: 'true-false',
          question: 'Datum features should always have tighter tolerances than the features they control.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Tol Rule</text><rect x="10" y="20" width="60" height="16" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="30" font-size="4" fill="#334155" text-anchor="middle">Datum feature tol vs controlled?</text><text x="40" y="48" font-size="3.5" fill="#6B7280" text-anchor="middle">No absolute rule requiring</text><text x="40" y="56" font-size="3.5" fill="#6B7280" text-anchor="middle">datum to be tighter</text><text x="40" y="66" font-size="3.5" fill="#58CC02" text-anchor="middle">Repeatability matters most</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Common Datum (A-A)</text><rect x="10" y="20" width="60" height="40" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="28" cy="40" r="8" fill="white" stroke="#3B8700" stroke-width="1.5"/><circle cx="52" cy="40" r="8" fill="white" stroke="#3B8700" stroke-width="1.5"/><line x1="28" y1="40" x2="52" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/><polygon points="28,48 26,53 30,53" fill="#3B8700" opacity="0.4"/><text x="28" y="58" font-size="3.5" fill="#3B8700" text-anchor="middle">A</text><polygon points="52,48 50,53 54,53" fill="#3B8700" opacity="0.4"/><text x="52" y="58" font-size="3.5" fill="#3B8700" text-anchor="middle">A</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Same letter = shared axis datum</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Customized DRF</text><rect x="8" y="16" width="64" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="25" font-size="4" fill="#334155" text-anchor="middle">A[x,y,rz] B[z] C[rx]</text><text x="40" y="42" font-size="3.5" fill="#6B7280" text-anchor="middle">DOF constraint symbols</text><text x="40" y="52" font-size="3.5" fill="#6B7280" text-anchor="middle">Non-standard 3-2-1 schemes</text><text x="40" y="62" font-size="3.5" fill="#334155" text-anchor="middle">ASME Y14.5-2018 feature</text></svg>',
          explanation: 'ASME Y14.5-2018 introduced the concept of customized datum reference frames using DOF constraint symbols in the feature control frame.',
          hint: 'Not all parts fit the standard 3-2-1 constraint model.'
        },
        {
          id: 'u9-L3-Q16',
          type: 'fill-blank',
          question: 'The primary datum plane requires _____ contact points and constrains _____ degrees of freedom.',
          blanks: ['3', '3'],
          wordBank: ['3', '3', '2', '1', '6'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">3-2-1 Contact Points</text><rect x="10" y="50" width="56" height="4" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="1.5"/><circle cx="20" cy="50" r="1.5" fill="#58CC02"/><circle cx="38" cy="50" r="1.5" fill="#58CC02"/><circle cx="56" cy="50" r="1.5" fill="#58CC02"/><text x="38" y="62" font-size="3" fill="#58CC02" text-anchor="middle">3 pts = primary</text><rect x="10" y="32" width="4" height="18" rx="1" fill="#A5E86C" opacity="0.2" stroke="#A5E86C" stroke-width="1.2"/><circle cx="10" cy="36" r="1.5" fill="#A5E86C"/><circle cx="10" cy="46" r="1.5" fill="#A5E86C"/><text x="6" y="28" font-size="3" fill="#A5E86C" text-anchor="middle">2 pts</text><rect x="58" y="38" width="4" height="12" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><circle cx="60" cy="44" r="1.5" fill="#3B8700"/><text x="66" y="38" font-size="3" fill="#3B8700">1 pt</text><text x="40" y="74" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">3+2+1 = 6 DOF</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">MMC Datum Simulator</text><rect x="10" y="20" width="60" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="38" r="12" fill="white" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="38" r="8" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5" stroke-dasharray="2,2"/><text x="40" y="40" font-size="3" fill="#3B8700" text-anchor="middle">fixed pin</text><text x="56" y="34" font-size="3" fill="#6B7280">gap when</text><text x="56" y="40" font-size="3" fill="#6B7280">oversized</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">Pin at VC, bore can shift</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Sheet Metal Datums</text><path d="M10,40 Q20,30 30,42 Q40,50 50,38 Q60,30 70,40" stroke="#3B8700" stroke-width="1.5" fill="none"/><g><animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/><text x="20" y="58" font-size="5" fill="#58CC02" text-anchor="middle">+</text><text x="40" y="58" font-size="5" fill="#58CC02" text-anchor="middle">+</text><text x="60" y="58" font-size="5" fill="#58CC02" text-anchor="middle">+</text></g><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Datum targets + clamping</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Replicate actual assembly</text></svg>',
          explanation: 'Flexible parts require special datum treatment per ASME Y14.5. The drawing should specify whether the part is inspected in the free state or restrained state.',
          hint: 'If the part changes shape depending on how you hold.'
        },
        {
          id: 'u9-L3-Q19',
          type: 'true-false',
          question: 'The order in which datums appear in the feature control frame (left to right) defines their precedence — the leftmost datum is?',
          correctAnswer: true,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Precedence Order</text><rect x="8" y="16" width="64" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><line x1="30" y1="16" x2="30" y2="30" stroke="#3B8700" stroke-width="1"/><line x1="46" y1="16" x2="46" y2="30" stroke="#3B8700" stroke-width="1"/><line x1="58" y1="16" x2="58" y2="30" stroke="#3B8700" stroke-width="1"/><text x="19" y="25" font-size="4" fill="#334155" text-anchor="middle">tol</text><text x="38" y="25" font-size="5" fill="#58CC02" text-anchor="middle" font-weight="bold">A</text><text x="52" y="25" font-size="5" fill="#A5E86C" text-anchor="middle" font-weight="bold">B</text><text x="64" y="25" font-size="5" fill="#3B8700" text-anchor="middle" font-weight="bold">C</text><text x="38" y="42" font-size="3.5" fill="#58CC02" text-anchor="middle">1st</text><text x="52" y="42" font-size="3.5" fill="#A5E86C" text-anchor="middle">2nd</text><text x="64" y="42" font-size="3.5" fill="#3B8700" text-anchor="middle">3rd</text><text x="40" y="56" font-size="3.5" fill="#6B7280" text-anchor="middle">Left to right = decreasing priority</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">RFS vs MMC Datum</text><rect x="4" y="18" width="34" height="38" rx="2" fill="#58CC02" opacity="0.04" stroke="#58CC02" stroke-width="1"/><text x="21" y="26" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">RFS</text><circle cx="21" cy="38" r="8" fill="white" stroke="#3B8700" stroke-width="1"/><circle cx="21" cy="38" r="6" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1"><animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/></circle><text x="21" y="52" font-size="3" fill="#6B7280" text-anchor="middle">Expands to fit</text><rect x="42" y="18" width="34" height="38" rx="2" fill="#3B8700" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="59" y="26" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">MMC</text><circle cx="59" cy="38" r="8" fill="white" stroke="#3B8700" stroke-width="1"/><circle cx="59" cy="38" r="5" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><text x="59" y="52" font-size="3" fill="#6B7280" text-anchor="middle">Fixed size pin</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">RFS=no shift, MMC=shift allowed</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Why Multiple Datums?</text><rect x="10" y="50" width="60" height="4" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="1.5"/><text x="72" y="54" font-size="3" fill="#58CC02">A</text><rect x="20" y="24" width="40" height="26" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><g><animateTransform attributeName="transform" type="translate" values="-3,0;3,0;-3,0" dur="2s" repeatCount="indefinite"/><circle cx="30" cy="38" r="3" fill="white" stroke="#3B8700" stroke-width="1"/><circle cx="50" cy="38" r="3" fill="white" stroke="#3B8700" stroke-width="1"/></g><text x="40" y="66" font-size="3.5" fill="#EC4899" text-anchor="middle">Part can slide on A alone!</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Need B, C to fully constrain</text></svg>',
          explanation: 'Consider a position tolerance on a hole pattern relative to only datum A (a plane).',
          hint: 'If the part can slide or rotate on datum A, how do you.'
        },
        {
          id: 'u9-L3-Q22',
          type: 'fill-blank',
          question: 'The 3-2-1 principle states that a complete datum reference frame requires _____ total contact points.',
          blanks: ['6'],
          wordBank: ['6', '3', '9', '5', '4'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">3-2-1 Principle</text><text x="40" y="28" font-size="7" fill="#58CC02" text-anchor="middle" font-weight="bold">3 + 2 + 1</text><text x="40" y="42" font-size="6" fill="#334155" text-anchor="middle" font-weight="bold">= 6</text><text x="40" y="56" font-size="3.5" fill="#6B7280" text-anchor="middle">Primary: 3 points (plane)</text><text x="40" y="64" font-size="3.5" fill="#6B7280" text-anchor="middle">Secondary: 2 points (line)</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Tertiary: 1 point (stop)</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Conical Datum</text><path d="M30,58 L40,18 L50,58" stroke="#3B8700" stroke-width="1.5" fill="#58CC02" fill-opacity="0.06"/><line x1="40" y1="14" x2="40" y2="62" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/><circle cx="40" cy="58" r="1.5" fill="#3B8700"/><text x="48" y="42" font-size="3.5" fill="#3B8700">axis</text><text x="48" y="60" font-size="3.5" fill="#3B8700">point</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Cone = axis + point (5 DOF)</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Simultaneous Requirement</text><rect x="8" y="18" width="64" height="10" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="40" y="25" font-size="3.5" fill="#334155" text-anchor="middle">pos 0.5 M | A B C</text><rect x="8" y="30" width="64" height="10" rx="1" fill="#A5E86C" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="40" y="37" font-size="3.5" fill="#334155" text-anchor="middle">pos 0.3 M | A B C</text><line x1="4" y1="20" x2="4" y2="38" stroke="#58CC02" stroke-width="2"/><text x="4" y="44" font-size="3" fill="#58CC02" text-anchor="middle">linked</text><text x="40" y="54" font-size="3.5" fill="#6B7280" text-anchor="middle">Same datums + same modifiers</text><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">= evaluated as one pattern</text></svg>',
          explanation: 'The simultaneous requirement (ASME Y14.5-2018, Section 4.19) means that if multiple feature control frames reference the same datums in the same order with the same material condition modifiers,.',
          hint: 'If two hole patterns reference the same datums at MMC,.'
        },
        {
          id: 'u9-L3-Q25',
          type: 'true-false',
          question: 'A datum feature with a flatness tolerance of 0.1 mm establishes a datum plane that also has 0.1 mm of form error.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Feature vs Datum</text><path d="M10,34 Q20,28 30,36 Q40,40 50,32 Q60,28 70,34" stroke="#3B8700" stroke-width="1.5" fill="none"/><text x="40" y="26" font-size="3.5" fill="#3B8700" text-anchor="middle">Real surface (imperfect)</text><line x1="10" y1="52" x2="70" y2="52" stroke="#58CC02" stroke-width="1.5"/><text x="40" y="48" font-size="3.5" fill="#58CC02" text-anchor="middle">Derived datum (perfect plane)</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">Feature has form error</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Datum is always perfect</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Flange Datum Selection</text><ellipse cx="40" cy="40" rx="24" ry="24" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="40" r="10" fill="white" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="42" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">B</text><circle cx="28" cy="22" r="3" fill="white" stroke="#3B8700" stroke-width="0.8"/><circle cx="52" cy="22" r="3" fill="white" stroke="#3B8700" stroke-width="0.8"/><circle cx="28" cy="58" r="3" fill="white" stroke="#3B8700" stroke-width="0.8"/><circle cx="52" cy="58" r="3" fill="white" stroke="#3B8700" stroke-width="0.8"/><text x="60" y="20" font-size="3" fill="#334155">C</text><text x="40" y="72" font-size="3" fill="#6B7280" text-anchor="middle">A=face, B=bore, C=hole clocks</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Poor Form = Rocking</text><line x1="10" y1="55" x2="70" y2="55" stroke="#3B8700" stroke-width="1.5"/><g><animateTransform attributeName="transform" type="rotate" values="-3,40,55;3,40,55;-3,40,55" dur="1.5s" repeatCount="indefinite"/><path d="M15,55 Q25,48 35,55 Q45,48 55,55 Q60,50 65,55" stroke="#EC4899" stroke-width="1.5" fill="none"/><rect x="15" y="30" width="50" height="20" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1"/></g><text x="40" y="70" font-size="3.5" fill="#EC4899" text-anchor="middle">Wavy surface = unstable datum</text><text x="40" y="78" font-size="3.5" fill="#6B7280" text-anchor="middle">Non-repeatable measurements</text></svg>',
          explanation: 'When a full-surface primary datum has significant form error and no datum targets are specified, the part can rock on the datum simulator (surface plate), contacting different sets of three high.',
          hint: 'If the part rocks on the surface plate, does it sit.'
        },
        {
          id: 'u9-L3-Q28',
          type: 'fill-blank',
          question: 'Specific points, lines, or areas used to establish a datum from an irregular or rough surface are called datum _____.',
          blanks: ['targets'],
          wordBank: ['targets', 'features', 'references', 'simulators', 'indicators'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Datum Targets</text><rect x="10" y="20" width="60" height="30" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><path d="M15,42 Q25,35 35,42 Q45,48 55,40 Q60,36 65,42" stroke="#EC4899" stroke-width="1" fill="none" opacity="0.5"/><text x="22" y="36" font-size="5" fill="#58CC02" text-anchor="middle" font-weight="bold">+</text><text x="40" y="36" font-size="5" fill="#58CC02" text-anchor="middle" font-weight="bold">+</text><text x="58" y="36" font-size="5" fill="#58CC02" text-anchor="middle" font-weight="bold">+</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Specific contact locations</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">for irregular surfaces</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Hole Pattern as Datum</text><rect x="10" y="20" width="60" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="24" cy="30" r="4" fill="white" stroke="#3B8700" stroke-width="1"/><circle cx="40" cy="30" r="4" fill="white" stroke="#3B8700" stroke-width="1"/><circle cx="56" cy="30" r="4" fill="white" stroke="#3B8700" stroke-width="1"/><circle cx="24" cy="46" r="4" fill="white" stroke="#3B8700" stroke-width="1"/><circle cx="40" cy="46" r="4" fill="white" stroke="#3B8700" stroke-width="1"/><circle cx="56" cy="46" r="4" fill="white" stroke="#3B8700" stroke-width="1"/><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">Best-fit of all holes = datum</text></svg>',
          explanation: 'ASME Y14.5 allows patterns of features to serve as datum features. The datum is established from the best-fit (least-squares or constrained) alignment of all the features in the pattern.',
          hint: 'If no single feature is sufficient, can a group.'
        },
        {
          id: 'u9-L3-Q30',
          type: 'true-false',
          question: 'When a feature control frame references only one datum, the measurement is fully constrained in all 6 degrees of freedom.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Single Datum = Partial</text><rect x="10" y="50" width="60" height="4" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="1.5"/><text x="72" y="54" font-size="3" fill="#58CC02">A</text><rect x="20" y="26" width="40" height="24" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><g><animateTransform attributeName="transform" type="translate" values="-4,0;4,0;-4,0" dur="2s" repeatCount="indefinite"/><rect x="20" y="26" width="40" height="24" rx="2" fill="none" stroke="#EC4899" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/></g><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">1 datum plane = only 3 DOF</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Remaining 3 DOF unconstrained</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Worst-Case vs RSS</text><rect x="6" y="16" width="30" height="34" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="24" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">WCA</text><text x="21" y="32" font-size="3" fill="#334155" text-anchor="middle">Sum all tols</text><text x="21" y="40" font-size="3" fill="#334155" text-anchor="middle">100% safe</text><text x="21" y="48" font-size="3" fill="#EC4899" text-anchor="middle">Conservative</text><rect x="44" y="16" width="30" height="34" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="24" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">RSS</text><text x="59" y="32" font-size="3" fill="#334155" text-anchor="middle">Root sum sq</text><text x="59" y="40" font-size="3" fill="#334155" text-anchor="middle">99.73% safe</text><text x="59" y="48" font-size="3" fill="#58CC02" text-anchor="middle">Cheaper</text><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Safety-critical = worst-case</text></svg>',
          explanation: 'RSS assumes normal distributions and statistical independence, predicting ~99.73% of assemblies will be within tolerance (at 3-sigma).',
          hint: 'Consider when even a 0.27% failure rate (2700 ppm).'
        },
        {
          id: 'u9-L4-Q3',
          type: 'true-false',
          question: 'In a 1D tolerance chain, if a dimension contributes positively to the gap, it is called an "increasing" contributor, and its?',
          correctAnswer: true,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Dimension Chain Signs</text><rect x="6" y="30" width="16" height="20" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1"/><text x="14" y="42" font-size="3.5" fill="#334155" text-anchor="middle">+</text><rect x="22" y="30" width="16" height="20" rx="1" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1"/><text x="30" y="42" font-size="3.5" fill="#334155" text-anchor="middle">-</text><rect x="38" y="30" width="16" height="20" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1"/><text x="46" y="42" font-size="3.5" fill="#334155" text-anchor="middle">+</text><line x1="54" y1="36" x2="64" y2="36" stroke="#A5E86C" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><text x="62" y="34" font-size="3" fill="#334155">gap</text><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">+ increases gap, - decreases gap</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">WCA vs RSS Decision</text><path d="M40,18 L20,36 L60,36 Z" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="40" y="32" font-size="3.5" fill="#334155" text-anchor="middle">?</text><text x="16" y="48" font-size="3" fill="#334155" text-anchor="middle">Safety</text><text x="40" y="48" font-size="3" fill="#334155" text-anchor="middle">Volume</text><text x="64" y="48" font-size="3" fill="#334155" text-anchor="middle">Cost</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Context-dependent decision</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Evaluate consequences first</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Cost-Optimized Allocation</text><line x1="12" y1="60" x2="68" y2="60" stroke="#3B8700" stroke-width="0.8"/><rect x="16" y="34" width="8" height="26" rx="0.5" fill="#58CC02" opacity="0.3"/><text x="20" y="32" font-size="3" fill="#334155" text-anchor="middle">easy</text><rect x="28" y="42" width="8" height="18" rx="0.5" fill="#A5E86C" opacity="0.3"/><rect x="40" y="48" width="8" height="12" rx="0.5" fill="#A5E86C" opacity="0.3"/><rect x="52" y="52" width="8" height="8" rx="0.5" fill="#3B8700" opacity="0.3"/><text x="56" y="50" font-size="3" fill="#334155" text-anchor="middle">hard</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Tight where cheap, loose where costly</text></svg>',
          explanation: 'Cost-optimized tolerance allocation assigns tighter tolerances to dimensions that are inexpensive to control (e.g., features machined in the same setup, turned diameters, injection molded.',
          hint: 'Tolerance is directly tied to cost.'
        },
        {
          id: 'u9-L4-Q6',
          type: 'fill-blank',
          question: 'The statistical tolerance analysis method that computes the total tolerance as the square root of the sum of squared individual _____?',
          blanks: ['RSS'],
          wordBank: ['RSS', 'WCA', 'RMS', 'GD&T', 'FMEA'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">RSS Method</text><text x="40" y="30" font-size="5" fill="#58CC02" text-anchor="middle" font-weight="bold">T = sqrt(sum t_i^2)</text><rect x="12" y="38" width="12" height="12" rx="1" fill="#58CC02" opacity="0.15"/><text x="18" y="46" font-size="3.5" fill="#334155" text-anchor="middle">t1^2</text><text x="28" y="46" font-size="5" fill="#334155">+</text><rect x="32" y="38" width="12" height="12" rx="1" fill="#A5E86C" opacity="0.15"/><text x="38" y="46" font-size="3.5" fill="#334155" text-anchor="middle">t2^2</text><text x="48" y="46" font-size="5" fill="#334155">+</text><rect x="52" y="38" width="12" height="12" rx="1" fill="#3B8700" opacity="0.15"/><text x="58" y="46" font-size="3.5" fill="#334155" text-anchor="middle">t3^2</text><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Statistical: assumes normal dist</text><text x="40" y="70" font-size="3.5" fill="#6B7280" text-anchor="middle">Result smaller than worst-case</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Stack-Up First Step</text><rect x="10" y="18" width="60" height="14" rx="2" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1.5"/><text x="40" y="27" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">1. Identify the gap/clearance</text><rect x="10" y="36" width="60" height="10" rx="1" fill="#A5E86C" opacity="0.08" stroke="#A5E86C" stroke-width="0.8"/><text x="40" y="43" font-size="3" fill="#334155" text-anchor="middle">2. Trace dimension chain</text><rect x="10" y="50" width="60" height="10" rx="1" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="0.8"/><text x="40" y="57" font-size="3" fill="#334155" text-anchor="middle">3. Assign signs and calculate</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Define requirement before calculating</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Housing Tolerance Calc</text><rect x="6" y="24" width="14" height="28" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1"/><text x="13" y="40" font-size="3" fill="#334155" text-anchor="middle">A</text><text x="13" y="46" font-size="2.5" fill="#6B7280" text-anchor="middle">25+/-0.1</text><rect x="20" y="24" width="18" height="28" rx="1" fill="#A5E86C" opacity="0.12" stroke="#A5E86C" stroke-width="1"/><text x="29" y="40" font-size="3" fill="#334155" text-anchor="middle">B</text><text x="29" y="46" font-size="2.5" fill="#6B7280" text-anchor="middle">30+/-0.15</text><line x1="38" y1="32" x2="44" y2="32" stroke="#3B8700" stroke-width="1"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><text x="41" y="30" font-size="3" fill="#334155" text-anchor="middle">gap</text><rect x="4" y="22" width="56" height="2" rx="0.5" fill="#3B8700" opacity="0.15"/><rect x="4" y="52" width="56" height="2" rx="0.5" fill="#3B8700" opacity="0.15"/><text x="30" y="64" font-size="3" fill="#6B7280" text-anchor="middle">Housing = 56 +/- t</text><text x="40" y="74" font-size="3.5" fill="#334155" text-anchor="middle" font-weight="bold">t = 0.25 mm</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Monte Carlo Simulation</text><g><circle cx="18" cy="32" r="1" fill="#58CC02" opacity="0.5"><animate attributeName="cy" values="32;28;35;30;32" dur="1s" repeatCount="indefinite"/></circle><circle cx="26" cy="36" r="1" fill="#A5E86C" opacity="0.5"><animate attributeName="cy" values="36;30;38;34;36" dur="1.2s" repeatCount="indefinite"/></circle><circle cx="34" cy="30" r="1" fill="#58CC02" opacity="0.5"><animate attributeName="cy" values="30;34;28;32;30" dur="0.8s" repeatCount="indefinite"/></circle><circle cx="42" cy="34" r="1" fill="#3B8700" opacity="0.5"><animate attributeName="cy" values="34;30;36;32;34" dur="1.1s" repeatCount="indefinite"/></circle><circle cx="50" cy="32" r="1" fill="#A5E86C" opacity="0.5"><animate attributeName="cy" values="32;36;28;34;32" dur="0.9s" repeatCount="indefinite"/></circle><circle cx="58" cy="36" r="1" fill="#58CC02" opacity="0.5"><animate attributeName="cy" values="36;32;38;34;36" dur="1.3s" repeatCount="indefinite"/></circle></g><path d="M10,60 Q20,56 30,50 Q40,40 50,50 Q60,56 70,60" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" fill-opacity="0.1"/><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Random sampling = distribution</text></svg>',
          explanation: 'Monte Carlo simulation randomly samples each dimension from its statistical distribution (which can be normal, uniform, skewed, or based on actual production data), calculates the assembly result.',
          hint: 'Instead of formulas, this method simulates millions.'
        },
        {
          id: 'u9-L4-Q10',
          type: 'true-false',
          question: 'RSS tolerance analysis assumes that all individual dimension variations follow a normal (Gaussian) distribution and are?',
          correctAnswer: true,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">RSS Assumptions</text><path d="M10,50 Q25,20 40,50 Q55,80 70,50" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" fill-opacity="0.06"/><line x1="40" y1="18" x2="40" y2="52" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/><text x="40" y="60" font-size="3.5" fill="#334155" text-anchor="middle">Normal distribution</text><text x="40" y="70" font-size="3.5" fill="#334155" text-anchor="middle">+ Statistical independence</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">RSS Calculation</text><text x="40" y="24" font-size="3.5" fill="#334155" text-anchor="middle">sqrt(0.1^2 + 0.2^2 + 0.1^2 + 0.15^2)</text><text x="40" y="36" font-size="3.5" fill="#334155" text-anchor="middle">= sqrt(0.0825)</text><text x="40" y="48" font-size="5" fill="#58CC02" text-anchor="middle" font-weight="bold">= +/-0.28 mm</text><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">vs worst-case = +/-0.55 mm</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">RSS is ~51% of worst-case here</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Sensitivity Factor</text><rect x="10" y="20" width="24" height="20" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1"/><text x="22" y="32" font-size="3.5" fill="#334155" text-anchor="middle">dim A</text><rect x="34" y="20" width="12" height="20" rx="1" fill="#A5E86C" opacity="0.1" stroke="#A5E86C" stroke-width="1"/><text x="40" y="32" font-size="3.5" fill="#334155" text-anchor="middle">angle</text><line x1="46" y1="30" x2="60" y2="30" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2"/><text x="56" y="28" font-size="3" fill="#334155">gap</text><text x="40" y="52" font-size="3.5" fill="#6B7280" text-anchor="middle">Linear: sensitivity = 1</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Angular: sensitivity = sin/cos</text><text x="40" y="70" font-size="3.5" fill="#334155" text-anchor="middle">Partial derivative of result</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Cpk Index</text><path d="M10,55 Q25,15 40,55 Q55,95 70,55" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" fill-opacity="0.06"/><line x1="18" y1="14" x2="18" y2="58" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.4"/><line x1="62" y1="14" x2="62" y2="58" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.4"/><text x="18" y="12" font-size="3" fill="#3B8700" text-anchor="middle">LSL</text><text x="62" y="12" font-size="3" fill="#3B8700" text-anchor="middle">USL</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Cpk = how centered in tolerance</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">1.33 = good, 1.67 = excellent</text></svg>',
          explanation: 'Cpk = min[(USL − μ)/(3σ), (μ − LSL)/(3σ)], where USL/LSL are the tolerance limits, μ is the process mean, and σ is the process standard deviation.',
          hint: 'This index tells you how much of the tolerance band.'
        },
        {
          id: 'u9-L4-Q14',
          type: 'fill-blank',
          question: 'In a _____ tolerance analysis, the total assembly tolerance equals the arithmetic _____ of all individual tolerances.',
          blanks: ['worst-case', 'sum'],
          wordBank: ['worst-case', 'sum', 'statistical', 'product', 'Monte Carlo', 'average'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Worst-Case Analysis</text><rect x="10" y="22" width="14" height="20" rx="1" fill="#58CC02" opacity="0.15"/><text x="17" y="34" font-size="3.5" fill="#334155" text-anchor="middle">t1</text><text x="28" y="34" font-size="5" fill="#334155">+</text><rect x="32" y="22" width="14" height="20" rx="1" fill="#A5E86C" opacity="0.15"/><text x="39" y="34" font-size="3.5" fill="#334155" text-anchor="middle">t2</text><text x="50" y="34" font-size="5" fill="#334155">+</text><rect x="54" y="22" width="14" height="20" rx="1" fill="#3B8700" opacity="0.15"/><text x="61" y="34" font-size="3.5" fill="#334155" text-anchor="middle">t3</text><text x="40" y="56" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">T = t1 + t2 + t3</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Arithmetic sum of all tolerances</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Fixing Negative Gap</text><rect x="6" y="18" width="22" height="18" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="0.8"/><text x="17" y="29" font-size="3" fill="#334155" text-anchor="middle">Tighten</text><rect x="30" y="18" width="22" height="18" rx="1" fill="#A5E86C" opacity="0.1" stroke="#A5E86C" stroke-width="0.8"/><text x="41" y="29" font-size="3" fill="#334155" text-anchor="middle">Shim</text><rect x="54" y="18" width="22" height="18" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="0.8"/><text x="65" y="29" font-size="3" fill="#334155" text-anchor="middle">Redesign</text><rect x="18" y="40" width="22" height="18" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="0.8"/><text x="29" y="51" font-size="3" fill="#334155" text-anchor="middle">Selective</text><rect x="42" y="40" width="22" height="18" rx="1" fill="#A5E86C" opacity="0.1" stroke="#A5E86C" stroke-width="0.8"/><text x="53" y="51" font-size="3" fill="#334155" text-anchor="middle">Accept RSS</text><text x="40" y="70" font-size="3.5" fill="#6B7280" text-anchor="middle">Multiple corrective strategies</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Selective Assembly</text><rect x="8" y="20" width="12" height="16" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><text x="14" y="30" font-size="3" fill="#334155" text-anchor="middle">S</text><rect x="22" y="20" width="12" height="16" rx="1" fill="#A5E86C" opacity="0.2" stroke="#A5E86C" stroke-width="0.8"/><text x="28" y="30" font-size="3" fill="#334155" text-anchor="middle">M</text><rect x="36" y="20" width="12" height="16" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="0.8"/><text x="42" y="30" font-size="3" fill="#334155" text-anchor="middle">L</text><line x1="14" y1="36" x2="42" y2="56" stroke="#58CC02" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/><line x1="28" y1="36" x2="56" y2="56" stroke="#A5E86C" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/><line x1="42" y1="36" x2="70" y2="56" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/><rect x="36" y="48" width="12" height="16" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="0.8"/><text x="42" y="58" font-size="3" fill="#334155" text-anchor="middle">L</text><rect x="50" y="48" width="12" height="16" rx="1" fill="#A5E86C" opacity="0.2" stroke="#A5E86C" stroke-width="0.8"/><text x="56" y="58" font-size="3" fill="#334155" text-anchor="middle">M</text><rect x="64" y="48" width="12" height="16" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><text x="70" y="58" font-size="3" fill="#334155" text-anchor="middle">S</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Sort + pair for tighter fit</text></svg>',
          explanation: 'Selective assembly measures each part and classifies it into groups based on actual size.',
          hint: 'If you measure each part and match it with a compatible.'
        },
        {
          id: 'u9-L4-Q17',
          type: 'true-false',
          question: 'A dimension that does not appear in the tolerance loop but is manufactured on the same part as a contributing dimension can be?',
          correctAnswer: true,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Only Loop Dimensions</text><rect x="8" y="24" width="14" height="28" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1.2"/><text x="15" y="40" font-size="3.5" fill="#58CC02" text-anchor="middle">IN</text><rect x="24" y="24" width="14" height="28" rx="1" fill="#A5E86C" opacity="0.12" stroke="#A5E86C" stroke-width="1.2"/><text x="31" y="40" font-size="3.5" fill="#A5E86C" text-anchor="middle">IN</text><rect x="40" y="24" width="14" height="28" rx="1" fill="#6B7280" opacity="0.08" stroke="#6B7280" stroke-width="0.8" stroke-dasharray="2,2"/><text x="47" y="40" font-size="3.5" fill="#6B7280" text-anchor="middle">OUT</text><line x1="54" y1="36" x2="62" y2="36" stroke="#3B8700" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Only dims in the chain count</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Modified RSS</text><text x="40" y="28" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">T = k * sqrt(sum t_i^2)</text><text x="40" y="42" font-size="3.5" fill="#334155" text-anchor="middle">k = 1.2 to 1.5 safety factor</text><line x1="10" y1="52" x2="70" y2="52" stroke="#3B8700" stroke-width="0.5"/><text x="15" y="62" font-size="3" fill="#58CC02">RSS</text><text x="40" y="62" font-size="3" fill="#A5E86C">Modified</text><text x="65" y="62" font-size="3" fill="#3B8700">WCA</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Compromise between RSS and WCA</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">2D Stack-Up Complexity</text><line x1="20" y1="50" x2="60" y2="50" stroke="#3B8700" stroke-width="1.5"/><line x1="30" y1="50" x2="50" y2="24" stroke="#58CC02" stroke-width="1.5"/><path d="M34,50 A6,6 0 0,1 36,44" stroke="#6B7280" stroke-width="0.6" fill="none"/><text x="40" y="48" font-size="3.5" fill="#6B7280">angle</text><line x1="50" y1="24" x2="50" y2="50" stroke="#A5E86C" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/><text x="54" y="38" font-size="3" fill="#A5E86C">sin/cos</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">Angular dims create nonlinear</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">trigonometric contributions</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">GD&amp;T in Stack-Ups</text><rect x="10" y="22" width="16" height="24" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1"/><text x="18" y="36" font-size="3" fill="#334155" text-anchor="middle">dim</text><rect x="28" y="22" width="16" height="24" rx="1" fill="#A5E86C" opacity="0.12" stroke="#A5E86C" stroke-width="1"/><text x="36" y="36" font-size="3" fill="#334155" text-anchor="middle">pos</text><rect x="46" y="22" width="16" height="24" rx="1" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1"/><text x="54" y="36" font-size="3" fill="#334155" text-anchor="middle">perp</text><text x="40" y="56" font-size="3.5" fill="#6B7280" text-anchor="middle">Geometric tols add to stack-up</text><text x="40" y="66" font-size="3.5" fill="#EC4899" text-anchor="middle">Often overlooked contributors!</text></svg>',
          explanation: 'Geometric tolerances are critical stack-up contributors that are often overlooked.',
          hint: 'If a mating surface is not perfectly perpendicular,.'
        },
        {
          id: 'u9-L4-Q21',
          type: 'fill-blank',
          question: 'A process capability index (Cpk) of 1.33 indicates that the process variation uses approximately _____% of the tolerance band.',
          blanks: ['75'],
          wordBank: ['75', '50', '100', '60', '90'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Cpk = 1.33</text><path d="M10,55 Q25,15 40,55 Q55,95 70,55" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" fill-opacity="0.06"/><line x1="15" y1="14" x2="15" y2="58" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.4"/><line x1="65" y1="14" x2="65" y2="58" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.4"/><rect x="22" y="14" width="36" height="44" rx="1" fill="#A5E86C" opacity="0.08"/><text x="40" y="68" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">Uses 75% of band</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">63 ppm defect rate</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Adjustable Feature</text><rect x="8" y="28" width="16" height="24" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1"/><rect x="24" y="28" width="16" height="24" rx="1" fill="#A5E86C" opacity="0.12" stroke="#A5E86C" stroke-width="1"/><rect x="40" y="28" width="8" height="24" rx="1" fill="#EC4899" opacity="0.15" stroke="#EC4899" stroke-width="1.5"><animate attributeName="width" values="6;10;6" dur="2s" repeatCount="indefinite"/></rect><rect x="50" y="28" width="16" height="24" rx="1" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1"/><text x="44" y="26" font-size="3" fill="#EC4899" text-anchor="middle">shim</text><text x="40" y="64" font-size="3.5" fill="#6B7280" text-anchor="middle">Absorbs accumulated variation</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">at assembly time</text></svg>',
          explanation: 'An adjustable feature (shim, selective spacer, set screw, adjustable cam) absorbs the cumulative variation from the tolerance chain at one location.',
          hint: 'If you can adjust one dimension at assembly time, do.'
        },
        {
          id: 'u9-L4-Q23',
          type: 'true-false',
          question: 'In a worst-case tolerance stack-up, the probability that all dimensions are at their worst limits is very high for typical?',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">WCA Probability</text><path d="M10,55 Q25,15 40,55 Q55,95 70,55" stroke="#58CC02" stroke-width="1.5" fill="#58CC02" fill-opacity="0.06"/><line x1="12" y1="14" x2="12" y2="58" stroke="#EC4899" stroke-width="1" opacity="0.5"/><line x1="68" y1="14" x2="68" y2="58" stroke="#EC4899" stroke-width="1" opacity="0.5"/><text x="12" y="12" font-size="3" fill="#EC4899" text-anchor="middle">WC-</text><text x="68" y="12" font-size="3" fill="#EC4899" text-anchor="middle">WC+</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">All at worst limits is extremely</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">unlikely for many contributors</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Supplier Process Data</text><path d="M10,55 Q20,25 30,55" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="20" y="62" font-size="3" fill="#58CC02" text-anchor="middle">A: Cpk 1.5</text><path d="M35,55 Q50,35 65,55" stroke="#3B8700" stroke-width="1.5" fill="none"/><text x="50" y="62" font-size="3" fill="#3B8700" text-anchor="middle">B: Cpk 0.8</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Different suppliers = different Cpk</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Dimension Chain Signs</text><rect x="6" y="26" width="14" height="24" rx="1" fill="#58CC02" opacity="0.15"/><text x="13" y="40" font-size="5" fill="#58CC02" text-anchor="middle">+</text><rect x="20" y="26" width="20" height="24" rx="1" fill="#3B8700" opacity="0.15"/><text x="30" y="40" font-size="5" fill="#3B8700" text-anchor="middle">-</text><rect x="40" y="26" width="14" height="24" rx="1" fill="#58CC02" opacity="0.15"/><text x="47" y="40" font-size="5" fill="#58CC02" text-anchor="middle">+</text><line x1="54" y1="34" x2="66" y2="34" stroke="#A5E86C" stroke-width="2"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><text x="60" y="44" font-size="3" fill="#334155" text-anchor="middle">gap</text><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Trace continuous path</text><text x="40" y="70" font-size="3.5" fill="#6B7280" text-anchor="middle">Right=+, Left=-, for gap</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">RSS Benefit Grows with n</text><line x1="12" y1="65" x2="68" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="12" y1="65" x2="12" y2="15" stroke="#3B8700" stroke-width="0.8"/><line x1="16" y1="60" x2="64" y2="20" stroke="#3B8700" stroke-width="1.5"/><path d="M16,60 Q30,52 44,42 Q54,36 64,32" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="66" y="22" font-size="3" fill="#3B8700">WCA</text><text x="66" y="34" font-size="3" fill="#58CC02">RSS</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">More dims = bigger RSS savings</text></svg>',
          explanation: 'For n equal tolerances (±t each): worst-case = n × t, RSS = sqrt(n) × t. The RSS/WC ratio = 1/sqrt(n). For n = 4, RSS is 50% of WC.',
          hint: 'Compare how n (worst-case) grows versus sqrt(n) (RSS).'
        },
        {
          id: 'u9-L4-Q27',
          type: 'true-false',
          question: 'RSS tolerance analysis is appropriate for assemblies consisting of only 2-3 parts with 2-3 contributing dimensions.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">RSS: Need Many Contributors</text><rect x="10" y="22" width="14" height="16" rx="1" fill="#EC4899" opacity="0.15" stroke="#EC4899" stroke-width="1"/><text x="17" y="32" font-size="3" fill="#334155" text-anchor="middle">n=2</text><text x="28" y="32" font-size="5" fill="#EC4899">X</text><rect x="38" y="22" width="28" height="16" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1"/><text x="52" y="32" font-size="3" fill="#334155" text-anchor="middle">n=10+</text><text x="70" y="32" font-size="4" fill="#58CC02">OK</text><text x="40" y="52" font-size="3.5" fill="#6B7280" text-anchor="middle">Central limit theorem needs</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">many contributors to be valid</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Stack-Up Report</text><rect x="10" y="16" width="60" height="10" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="0.8"/><text x="40" y="23" font-size="3" fill="#334155" text-anchor="middle">1. Assembly requirement</text><rect x="10" y="28" width="60" height="10" rx="1" fill="#A5E86C" opacity="0.08" stroke="#A5E86C" stroke-width="0.8"/><text x="40" y="35" font-size="3" fill="#334155" text-anchor="middle">2. Dimension loop sketch</text><rect x="10" y="40" width="60" height="10" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="0.8"/><text x="40" y="47" font-size="3" fill="#334155" text-anchor="middle">3. Contributors table</text><rect x="10" y="52" width="60" height="10" rx="1" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="0.8"/><text x="40" y="59" font-size="3" fill="#334155" text-anchor="middle">4. Results + conclusion</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Professional documentation</text></svg>',
          explanation: 'A professional tolerance analysis report includes: Assembly requirement definition (what gap/clearance/interference must be controlled and its limits);.',
          hint: 'Consider what someone reviewing your analysis in 5 years.'
        },
        {
          id: 'u9-L4-Q29',
          type: 'fill-blank',
          question: 'When tolerance analysis shows the gap can become negative, one low-cost solution is to insert a selectable _____ between parts?',
          blanks: ['shim'],
          wordBank: ['shim', 'gasket', 'washer', 'bushing', 'insert'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Shim Spacer</text><rect x="10" y="28" width="22" height="28" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1"/><text x="21" y="44" font-size="3.5" fill="#334155" text-anchor="middle">Part A</text><rect x="34" y="32" width="4" height="20" rx="0.5" fill="#A5E86C" opacity="0.4" stroke="#A5E86C" stroke-width="1"><animate attributeName="height" values="18;22;18" dur="2s" repeatCount="indefinite"/></rect><text x="36" y="28" font-size="3" fill="#A5E86C" text-anchor="middle">shim</text><rect x="40" y="28" width="22" height="28" rx="1" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1"/><text x="51" y="44" font-size="3.5" fill="#334155" text-anchor="middle">Part B</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Selected at assembly to fill gap</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Virtual Condition Approach</text><rect x="10" y="22" width="20" height="24" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1"/><text x="20" y="32" font-size="3" fill="#334155" text-anchor="middle">size</text><text x="20" y="40" font-size="3" fill="#334155" text-anchor="middle">+ geo</text><text x="34" y="34" font-size="5" fill="#334155">=</text><rect x="40" y="22" width="20" height="24" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.5"/><text x="50" y="36" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">VC</text><text x="40" y="56" font-size="3.5" fill="#6B7280" text-anchor="middle">Combine size + GD&amp;T into</text><text x="40" y="64" font-size="3.5" fill="#6B7280" text-anchor="middle">single worst-case boundary</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Ra Hides Defects</text><path d="M8,40 L16,38 L24,42 L32,36 L36,50 L40,38 L48,42 L56,38 L64,42 L72,40" stroke="#58CC02" stroke-width="1.5" fill="none"/><line x1="8" y1="40" x2="72" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/><circle cx="36" cy="50" r="4" fill="none" stroke="#EC4899" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/></circle><text x="36" y="62" font-size="3" fill="#EC4899" text-anchor="middle">deep scratch</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Ra averages out extremes</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Rz for Sealing</text><path d="M8,40 L16,34 L20,46 L28,32 L32,48 L40,30 L44,50 L52,34 L56,46 L64,36 L72,40" stroke="#58CC02" stroke-width="1.5" fill="none"/><line x1="8" y1="30" x2="72" y2="30" stroke="#3B8700" stroke-width="0.6" stroke-dasharray="2,2" opacity="0.3"/><line x1="8" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="0.6" stroke-dasharray="2,2" opacity="0.3"/><line x1="36" y1="30" x2="36" y2="50" stroke="#A5E86C" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/></line><text x="42" y="28" font-size="3" fill="#334155">peak</text><text x="42" y="54" font-size="3" fill="#334155">valley</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Rz captures extreme heights</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">CMM Sampling Density</text><rect x="10" y="18" width="60" height="40" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="22" cy="28" r="1.5" fill="#58CC02"/><circle cx="40" cy="28" r="1.5" fill="#58CC02"/><circle cx="58" cy="28" r="1.5" fill="#58CC02"/><circle cx="22" cy="38" r="1.5" fill="#58CC02"/><circle cx="40" cy="38" r="1.5" fill="#58CC02"/><circle cx="58" cy="38" r="1.5" fill="#58CC02"/><circle cx="22" cy="48" r="1.5" fill="#58CC02"/><circle cx="40" cy="48" r="1.5" fill="#58CC02"/><circle cx="58" cy="48" r="1.5" fill="#58CC02"/><text x="40" y="68" font-size="3.5" fill="#EC4899" text-anchor="middle">9 points on 200mm surface</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">May miss deviations between</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Surface Lay Symbols</text><line x1="10" y1="60" x2="70" y2="60" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="58" font-size="3.5" fill="#334155" text-anchor="middle">boundary line</text><line x1="30" y1="30" x2="30" y2="54" stroke="#58CC02" stroke-width="1.5"/><line x1="36" y1="30" x2="36" y2="54" stroke="#58CC02" stroke-width="1.5"/><line x1="42" y1="30" x2="42" y2="54" stroke="#58CC02" stroke-width="1.5"/><line x1="48" y1="30" x2="48" y2="54" stroke="#58CC02" stroke-width="1.5"/><text x="40" y="24" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">perpendicular</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Pattern runs perpendicular to edge</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">10:1 Gauge Rule</text><rect x="10" y="20" width="60" height="18" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="32" font-size="4" fill="#334155" text-anchor="middle">Resolution: 0.002 mm</text><text x="40" y="48" font-size="3.5" fill="#334155" text-anchor="middle">10:1 rule: inspect up to</text><text x="40" y="58" font-size="4.5" fill="#58CC02" text-anchor="middle" font-weight="bold">+/- 0.020 mm</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Uncertainty max 1/10 of tolerance</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Legacy Drawing Tolerance</text><rect x="10" y="18" width="60" height="24" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="32" font-size="4" fill="#334155" text-anchor="middle">Ra 0.2 on non-critical surface?</text><text x="40" y="50" font-size="3.5" fill="#EC4899" text-anchor="middle">Do NOT just change it</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Investigate design intent first</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">May have hidden reason</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Ra vs Rq</text><path d="M8,40 L16,34 L24,46 L32,36 L40,44 L48,34 L56,46 L64,38 L72,40" stroke="#58CC02" stroke-width="1.5" fill="none"/><line x1="8" y1="40" x2="72" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/><rect x="8" y="54" width="30" height="16" rx="1" fill="#58CC02" opacity="0.08" stroke="#58CC02" stroke-width="0.8"/><text x="23" y="62" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Ra</text><text x="23" y="68" font-size="3" fill="#334155" text-anchor="middle">avg |Z|</text><rect x="42" y="54" width="30" height="16" rx="1" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="0.8"/><text x="57" y="62" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Rq</text><text x="57" y="68" font-size="3" fill="#334155" text-anchor="middle">sqrt(avg Z^2)</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Cutoff Length Filter</text><path d="M8,40 Q14,30 20,40 Q26,50 32,40 Q38,30 44,40 Q50,50 56,40 Q62,30 68,40" stroke="#58CC02" stroke-width="1.5" fill="none"/><path d="M8,40 Q20,34 40,40 Q60,46 72,40" stroke="#3B8700" stroke-width="1" fill="none" stroke-dasharray="3,2" opacity="0.5"/><text x="40" y="56" font-size="3.5" fill="#58CC02" text-anchor="middle">short wavelength = roughness</text><text x="40" y="64" font-size="3.5" fill="#3B8700" text-anchor="middle">long wavelength = waviness</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">cutoff separates them</text></svg>',
          explanation: 'The cutoff length (λc) is a high-pass filter that separates short-wavelength roughness from long-wavelength waviness. Standard cutoff values are 0.08, 0.25, 0.8, 2.5, and 8 mm.',
          hint: 'The filter setting determines which surface features.'
        },
        {
          id: 'u9-L5-Q9',
          type: 'true-false',
          question: 'A surface with Ra 0.4 μm is always smoother than a surface with Ra 0.8 μm in terms of functional performance.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Ra Not = Function</text><path d="M8,36 L16,32 L24,40 L32,34 L40,38 L48,32 L56,40 L64,36 L72,36" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="40" y="26" font-size="3.5" fill="#58CC02" text-anchor="middle">Ra 0.4</text><path d="M8,56 L16,50 L24,62 L32,48 L40,64 L48,50 L56,60 L64,54 L72,56" stroke="#3B8700" stroke-width="1.5" fill="none"/><text x="40" y="48" font-size="3.5" fill="#3B8700" text-anchor="middle">Ra 0.8</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Lower Ra does not always mean better</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Rsk Skewness</text><path d="M10,55 Q20,25 30,55 Q35,70 40,55" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="25" y="62" font-size="3" fill="#58CC02" text-anchor="middle">Rsk &lt; 0</text><text x="25" y="70" font-size="3" fill="#6B7280" text-anchor="middle">valleys</text><path d="M48,55 Q53,40 58,55 Q68,25 72,55" stroke="#3B8700" stroke-width="1.5" fill="none"/><text x="60" y="62" font-size="3" fill="#3B8700" text-anchor="middle">Rsk &gt; 0</text><text x="60" y="70" font-size="3" fill="#6B7280" text-anchor="middle">peaks</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">CMM Machine</text><rect x="10" y="55" width="60" height="8" rx="2" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="61" font-size="3" fill="#334155" text-anchor="middle">granite table</text><rect x="14" y="22" width="4" height="33" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="1"/><rect x="14" y="22" width="30" height="4" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="1"/><line x1="30" y1="26" x2="30" y2="44" stroke="#3B8700" stroke-width="1.5"/><circle cx="30" cy="46" r="2" fill="#3B8700" opacity="0.5"/><rect x="44" y="36" width="20" height="16" rx="2" fill="#A5E86C" opacity="0.1" stroke="#3B8700" stroke-width="1"/><text x="54" y="46" font-size="3" fill="#334155" text-anchor="middle">part</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">3D probe captures X,Y,Z points</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Measurement Uncertainty</text><line x1="10" y1="40" x2="70" y2="40" stroke="#3B8700" stroke-width="1.5"/><line x1="20" y1="36" x2="20" y2="44" stroke="#3B8700" stroke-width="1"/><text x="20" y="50" font-size="3" fill="#334155" text-anchor="middle">LSL</text><line x1="60" y1="36" x2="60" y2="44" stroke="#3B8700" stroke-width="1"/><text x="60" y="50" font-size="3" fill="#334155" text-anchor="middle">USL</text><rect x="56" y="34" width="8" height="12" rx="1" fill="#EC4899" opacity="0.15"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite"/></rect><text x="60" y="58" font-size="3" fill="#EC4899" text-anchor="middle">gray zone</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Accept/reject uncertain at limits</text></svg>',
          explanation: 'Measurement uncertainty is an inherent property of every measurement, arising from the instrument, method, environment, and operator.',
          hint: 'If your measurement is right at the tolerance limit.'
        },
        {
          id: 'u9-L5-Q13',
          type: 'fill-blank',
          question: 'The surface roughness parameter Rz measures the average maximum peak-to-_____ height over the evaluation length.',
          blanks: ['valley'],
          wordBank: ['valley', 'mean', 'peak', 'baseline', 'center'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Rz Definition</text><path d="M8,40 L14,28 L20,48 L26,30 L32,50 L38,26 L44,52 L50,32 L56,46 L62,34 L68,44 L72,40" stroke="#58CC02" stroke-width="1.5" fill="none"/><line x1="38" y1="26" x2="38" y2="52" stroke="#A5E86C" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/></line><text x="46" y="24" font-size="3" fill="#334155">peak</text><text x="46" y="56" font-size="3" fill="#334155">valley</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Avg max peak-to-valley height</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Process vs Roughness</text><rect x="8" y="14" width="64" height="7" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="0.8"/><text x="40" y="19" font-size="3" fill="#334155" text-anchor="middle">Lapping: 0.025-0.1 um</text><rect x="8" y="23" width="64" height="7" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="0.8"/><text x="40" y="28" font-size="3" fill="#334155" text-anchor="middle">Grinding: 0.1-1.6 um</text><rect x="8" y="32" width="64" height="7" rx="1" fill="#A5E86C" opacity="0.15" stroke="#A5E86C" stroke-width="0.8"/><text x="40" y="37" font-size="3" fill="#334155" text-anchor="middle">Turning: 0.4-6.3 um</text><rect x="8" y="41" width="64" height="7" rx="1" fill="#A5E86C" opacity="0.2" stroke="#A5E86C" stroke-width="0.8"/><text x="40" y="46" font-size="3" fill="#334155" text-anchor="middle">Milling: 0.8-6.3 um</text><rect x="8" y="50" width="64" height="7" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="0.8"/><text x="40" y="55" font-size="3" fill="#334155" text-anchor="middle">EDM: 1.6-12.5 um</text><rect x="8" y="59" width="64" height="7" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="0.8"/><text x="40" y="64" font-size="3" fill="#334155" text-anchor="middle">Sand Casting: 12.5-25 um</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Each process has physical limits</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">20C Reference Temp</text><rect x="20" y="22" width="40" height="34" rx="4" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="42" font-size="10" fill="#58CC02" text-anchor="middle" font-weight="bold">20</text><text x="56" y="36" font-size="5" fill="#334155">C</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">ISO 1 standard reference</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Thermal expansion changes dims</text></svg>',
          explanation: 'ISO 1 defines 20°C as the standard reference temperature for dimensional measurements. At other temperatures, thermal expansion changes part dimensions: ΔL = α × L × ΔT.',
          hint: 'If a steel part expands 12 μm/m per °C, how much does.'
        },
        {
          id: 'u9-L5-Q16',
          type: 'true-false',
          question: 'A surface profilometer measures the same characteristics as a CMM — they are interchangeable for GD&T inspection.',
          correctAnswer: false,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Profilometer vs CMM</text><rect x="4" y="16" width="34" height="40" rx="2" fill="#58CC02" opacity="0.04" stroke="#58CC02" stroke-width="1"/><text x="21" y="24" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Profilometer</text><text x="21" y="34" font-size="3" fill="#334155" text-anchor="middle">Micro-geometry</text><text x="21" y="42" font-size="3" fill="#334155" text-anchor="middle">Ra, Rz, Rq</text><text x="21" y="50" font-size="3" fill="#334155" text-anchor="middle">2-5 um tip</text><rect x="42" y="16" width="34" height="40" rx="2" fill="#3B8700" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="59" y="24" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">CMM</text><text x="59" y="34" font-size="3" fill="#334155" text-anchor="middle">Macro-geometry</text><text x="59" y="42" font-size="3" fill="#334155" text-anchor="middle">GD&amp;T features</text><text x="59" y="50" font-size="3" fill="#334155" text-anchor="middle">1-4 mm tip</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Not interchangeable</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Surface Lay</text><rect x="10" y="20" width="60" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><line x1="14" y1="28" x2="66" y2="28" stroke="#58CC02" stroke-width="0.8" opacity="0.4"/><line x1="14" y1="32" x2="66" y2="32" stroke="#58CC02" stroke-width="0.8" opacity="0.4"/><line x1="14" y1="36" x2="66" y2="36" stroke="#58CC02" stroke-width="0.8" opacity="0.4"/><line x1="14" y1="40" x2="66" y2="40" stroke="#58CC02" stroke-width="0.8" opacity="0.4"/><line x1="14" y1="44" x2="66" y2="44" stroke="#58CC02" stroke-width="0.8" opacity="0.4"/><line x1="14" y1="48" x2="66" y2="48" stroke="#58CC02" stroke-width="0.8" opacity="0.4"/><text x="40" y="64" font-size="3.5" fill="#6B7280" text-anchor="middle">Directional pattern of texture</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Affects friction, sealing, wear</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Gauge R&amp;R Study</text><rect x="8" y="18" width="28" height="22" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="22" y="28" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Repeat.</text><text x="22" y="36" font-size="3" fill="#334155" text-anchor="middle">Same person</text><rect x="44" y="18" width="28" height="22" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="58" y="28" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Reprod.</text><text x="58" y="36" font-size="3" fill="#334155" text-anchor="middle">Diff people</text><text x="40" y="52" font-size="3.5" fill="#58CC02" text-anchor="middle">Less than 10% = acceptable</text><text x="40" y="60" font-size="3.5" fill="#A5E86C" text-anchor="middle">10-30% = marginal</text><text x="40" y="68" font-size="3.5" fill="#EC4899" text-anchor="middle">Over 30% = unacceptable</text></svg>',
          explanation: 'Gauge R&R (per AIAG MSA manual) decomposes total measurement variation into: repeatability (equipment variation .',
          hint: 'If different operators get different results measuring.'
        },
        {
          id: 'u9-L5-Q19',
          type: 'fill-blank',
          question: 'The standard reference temperature for dimensional measurement, defined by ISO 1, is _____ °C.',
          blanks: ['20'],
          wordBank: ['20', '25', '15', '22', '0'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">20 Degrees C</text><rect x="20" y="22" width="40" height="34" rx="4" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="44" font-size="12" fill="#58CC02" text-anchor="middle" font-weight="bold">20</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">ISO 1 standard for all</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">dimensional measurement</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Optical Comparator</text><circle cx="40" cy="38" r="20" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><rect x="34" y="34" width="12" height="8" rx="1" fill="#3B8700" opacity="0.2"/><text x="40" y="40" font-size="3" fill="white" text-anchor="middle">part</text><line x1="10" y1="38" x2="20" y2="38" stroke="#A5E86C" stroke-width="1.5"/><text x="10" y="34" font-size="3" fill="#A5E86C" text-anchor="middle">light</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">Magnified shadow on screen</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">10x-100x for 2D profiles</text></svg>',
          explanation: 'An optical comparator magnifies the part shadow (typically 10x-100x) onto a screen. The operator overlays a template or uses digital crosshairs/software to measure features.',
          hint: 'This instrument uses a magnified shadow to inspect 2D.'
        },
        {
          id: 'u9-L5-Q21',
          type: 'true-false',
          question: 'When specifying surface roughness on a drawing, the roughness value always represents the maximum allowable roughness — the?',
          correctAnswer: true,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Roughness = Max Limit</text><rect x="10" y="20" width="60" height="20" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="32" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Ra 1.6</text><text x="40" y="50" font-size="3.5" fill="#58CC02" text-anchor="middle">Ra 0.8 = OK (smoother)</text><text x="40" y="58" font-size="3.5" fill="#58CC02" text-anchor="middle">Ra 1.6 = OK (at limit)</text><text x="40" y="66" font-size="3.5" fill="#EC4899" text-anchor="middle">Ra 2.0 = FAIL (rougher)</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Roughness vs Fatigue</text><path d="M10,36 Q16,32 20,36 Q24,40 28,36 Q32,32 36,36 Q40,40 44,36 Q48,32 52,36 Q56,40 60,36 Q64,32 68,36" stroke="#58CC02" stroke-width="1" fill="none"/><line x1="36" y1="42" x2="36" y2="48" stroke="#EC4899" stroke-width="1.5"/><text x="36" y="54" font-size="3" fill="#EC4899" text-anchor="middle">crack</text><text x="40" y="64" font-size="3.5" fill="#6B7280" text-anchor="middle">Valleys = stress concentrators</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Rougher = shorter fatigue life</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Process Change Effects</text><rect x="6" y="18" width="30" height="28" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="26" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Turning</text><text x="21" y="36" font-size="3" fill="#334155" text-anchor="middle">compressive</text><text x="21" y="42" font-size="3" fill="#334155" text-anchor="middle">stress</text><rect x="44" y="18" width="30" height="28" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="26" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Grinding</text><text x="59" y="36" font-size="3" fill="#EC4899" text-anchor="middle">tensile</text><text x="59" y="42" font-size="3" fill="#EC4899" text-anchor="middle">stress?</text><text x="40" y="58" font-size="3.5" fill="#6B7280" text-anchor="middle">Same Ra does not mean same</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">metallurgical condition</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Abbe Principle</text><rect x="8" y="24" width="64" height="8" rx="1" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1"/><text x="40" y="30" font-size="3.5" fill="#58CC02" text-anchor="middle">Scale collinear = accurate</text><rect x="8" y="44" width="64" height="8" rx="1" fill="#EC4899" opacity="0.08" stroke="#EC4899" stroke-width="1"/><text x="40" y="50" font-size="3.5" fill="#EC4899" text-anchor="middle">Scale offset = cosine error</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">Measurement axis must align</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">with dimension being measured</text></svg>',
          explanation: 'Abbe\'s principle states that the measuring scale and the dimension being measured should be collinear.',
          hint: 'If the ruler is not on the same line as what you.'
        },
        {
          id: 'u9-L5-Q25',
          type: 'fill-blank',
          question: 'The surface lay symbol "C" indicates a _____ lay pattern, typically produced by turning or facing operations.',
          blanks: ['circular'],
          wordBank: ['circular', 'crossed', 'radial', 'parallel', 'multi-directional'],
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Circular Lay (C)</text><circle cx="40" cy="40" r="20" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="40" r="15" fill="none" stroke="#58CC02" stroke-width="0.8" opacity="0.3"/><circle cx="40" cy="40" r="10" fill="none" stroke="#58CC02" stroke-width="0.8" opacity="0.3"/><circle cx="40" cy="40" r="5" fill="none" stroke="#58CC02" stroke-width="0.8" opacity="0.3"/><circle cx="40" cy="40" r="1" fill="#3B8700"/><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Concentric rings from turning</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Go/No-Go Gauge</text><rect x="8" y="22" width="64" height="14" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="31" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">GO side passes through</text><rect x="8" y="40" width="64" height="14" rx="2" fill="#EC4899" opacity="0.06" stroke="#EC4899" stroke-width="1.5"/><text x="40" y="49" font-size="4" fill="#EC4899" text-anchor="middle" font-weight="bold">NO-GO side must NOT</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">Fast pass/fail for production</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">No measurement value needed</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">No-Machining Symbol</text><path d="M30,50 L40,22 L50,50" stroke="#3B8700" stroke-width="2" fill="none"/><circle cx="40" cy="44" r="5" fill="none" stroke="#58CC02" stroke-width="1.5"/><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Circle in V-notch</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">= no material removal allowed</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Surface as-manufactured</text></svg>',
          explanation: 'Per ISO 1302, the circle in the V-notch (open triangle) of the surface texture symbol indicates that the surface must be obtained by a non-material-removal process — meaning no machining is allowed.',
          hint: 'The circle signifies "no removal".'
        },
        {
          id: 'u9-L5-Q28',
          type: 'true-false',
          question: 'Gauge blocks (Johansson blocks) can be combined by wringing to create custom lengths with accuracy better than 0.1 μm.',
          correctAnswer: true,
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Gauge Blocks Wringing</text><rect x="16" y="24" width="14" height="32" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.5"/><rect x="30" y="24" width="10" height="32" rx="1" fill="#A5E86C" opacity="0.15" stroke="#A5E86C" stroke-width="1.5"/><rect x="40" y="24" width="18" height="32" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.5"/><text x="23" y="42" font-size="3" fill="#334155" text-anchor="middle">A</text><text x="35" y="42" font-size="3" fill="#334155" text-anchor="middle">B</text><text x="49" y="42" font-size="3" fill="#334155" text-anchor="middle">C</text><text x="40" y="66" font-size="3.5" fill="#6B7280" text-anchor="middle">Wrung together for custom length</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Accuracy better than 0.1 um</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Stylus vs Optical</text><rect x="4" y="16" width="34" height="40" rx="2" fill="#58CC02" opacity="0.04" stroke="#58CC02" stroke-width="1"/><text x="21" y="24" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Stylus</text><text x="21" y="34" font-size="3" fill="#334155" text-anchor="middle">Diamond tip</text><text x="21" y="42" font-size="3" fill="#334155" text-anchor="middle">2D profile</text><text x="21" y="50" font-size="3" fill="#334155" text-anchor="middle">Touches surface</text><rect x="42" y="16" width="34" height="40" rx="2" fill="#3B8700" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="59" y="24" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Optical</text><text x="59" y="34" font-size="3" fill="#334155" text-anchor="middle">Light/laser</text><text x="59" y="42" font-size="3" fill="#334155" text-anchor="middle">3D areal</text><text x="59" y="50" font-size="3" fill="#334155" text-anchor="middle">Non-contact</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Different methods, same purpose</text></svg>',
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
                    diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Bearing Area Curve</text><path d="M12,60 Q20,58 28,52 Q36,40 44,30 Q52,22 60,18 Q66,16 70,16" stroke="#58CC02" stroke-width="2" fill="none"/><line x1="10" y1="60" x2="72" y2="60" stroke="#3B8700" stroke-width="0.8"/><line x1="10" y1="60" x2="10" y2="14" stroke="#3B8700" stroke-width="0.8"/><text x="40" y="76" font-size="3.5" fill="#334155" text-anchor="middle">Material ratio vs depth</text><text x="8" y="38" font-size="3" fill="#334155" transform="rotate(-90,8,38)">depth</text><text x="40" y="68" font-size="3" fill="#6B7280" text-anchor="middle">Abbott-Firestone curve</text></svg>',
          explanation: 'The Abbott-Firestone (bearing area) curve is generated by slicing the surface profile at successively deeper levels and plotting the material ratio (percentage of the profile at or above.',
          hint: 'If you slice the surface profile horizontally, how much.'
        }
      ]
    }
  ]
};
