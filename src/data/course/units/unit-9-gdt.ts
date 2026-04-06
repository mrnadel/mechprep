import type { Unit } from '../types';

export const unit9: Unit = {
  id: 'u9-gdt',
  title: 'GD&T & Tolerancing',
  description: 'Geometric dimensioning and tolerancing, datum systems, tolerance stack-ups, surface finish, and metrology.',
  color: '#EC4899',
  icon: '📏',
  topicId: 'design-tolerancing',
  lessons: [
    // ═══════════════════════════════════════════════════════════
    // LESSON 1a: Tolerance Fundamentals (first third)
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L1',
      title: 'Tolerance Fundamentals',
      description: 'Tolerance basics, clearance/interference/transition fits, bilateral vs unilateral.',
      icon: '📝',
      xpReward: 20,
      levels: 4,
      questions: [
        {
          id: 'u9-L1-T1',
          type: 'teaching',
          question: 'What Are Tolerances?',
          explanation: 'No part can be made to an exact size. A tolerance is the total permissible variation on a dimension. For example, 50 +/- 0.1 mm means the part can be anywhere from 49.9 to 50.1 mm and still be acceptable.',
          hint: 'Tighter tolerances cost more because they require more precise machining.',
        },
        {
          id: 'u9-L1-Q10',
          type: 'true-false',
          question: 'A transition fit can result in either a small clearance or a small interference between mating parts, depending on the actual?',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Transition Fit</text><line x1="40" y1="70" x2="40" y2="14" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="42" x2="68" y2="42" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="10" y="44" font-size="3" fill="#6B7280">nom</text><rect x="18" y="30" width="14" height="20" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><text x="25" y="43" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">H7</text><rect x="48" y="34" width="14" height="16" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.2"/><text x="55" y="45" font-size="4" fill="#3B8700" text-anchor="middle" font-weight="bold">k6</text><rect x="34" y="34" width="12" height="8" rx="0.5" fill="#A5E86C" opacity="0.3" stroke="#A5E86C" stroke-width="0.8"><animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite"/></rect><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Overlap zone</text><text x="40" y="74" font-size="3.5" fill="#334155" text-anchor="middle">Clearance OR interference</text></svg>',
          explanation: 'A transition fit is defined by overlapping tolerance zones of the hole and shaft.',
          distractorExplanations: {
            1: 'A transition fit is defined by overlapping tolerance zones of the hole and shaft.',
          },
          hint: 'If the shaft and hole tolerance zones overlap, what happens depends on the actual sizes produced.',
        },
        {
          id: 'u9-L1-Q4',
          type: 'multiple-choice',
          question: 'A dimension is specified as 50 +0.05/-0.10 mm. What is the tolerance, and is it bilateral or unilateral?',
          options: [
            'Tolerance = 0.05 mm, unilateral',
            'Tolerance = 0.10 mm, unilateral',
            'Tolerance = 0.15 mm, bilateral',
            'Tolerance = 0.15 mm, unilateral'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><line x1="40" y1="70" x2="40" y2="10" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="40" x2="68" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="40" y="78" font-size="4" fill="#334155" text-anchor="middle">Nominal 50 mm</text><rect x="25" y="28" width="14" height="24" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><line x1="23" y1="28" x2="41" y2="28" stroke="#58CC02" stroke-width="0.6" opacity="0.5"/><text x="32" y="26" font-size="3.5" fill="#334155" text-anchor="middle">+0.05</text><line x1="23" y1="52" x2="41" y2="52" stroke="#58CC02" stroke-width="0.6" opacity="0.5"/><text x="32" y="58" font-size="3.5" fill="#334155" text-anchor="middle">-0.10</text><text x="32" y="42" font-size="4.5" fill="#58CC02" text-anchor="middle" font-weight="bold">0.15</text><line x1="18" y1="28" x2="18" y2="52" stroke="#3B8700" stroke-width="1" opacity="0.4"/><polygon points="16.5,29 18,26 19.5,29" fill="#3B8700" opacity="0.4"/><polygon points="16.5,51 18,54 19.5,51" fill="#3B8700" opacity="0.4"/><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Bilateral Tolerance</text><text x="56" y="36" font-size="3.5" fill="#6B7280" text-anchor="middle">+side</text><text x="56" y="48" font-size="3.5" fill="#6B7280" text-anchor="middle">-side</text></svg>',
          explanation: 'Total tolerance = upper deviation minus lower deviation = +0.05 minus (-0.10) = 0.15 mm.',
          distractorExplanations: {
            0: 'This focuses on unilateral, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on unilateral, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on unilateral, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Tolerance = upper limit minus lower limit.',
        },
        {
          id: 'u9-L1-T2',
          type: 'teaching',
          question: 'Bilateral vs Unilateral Tolerances',
          explanation: 'A bilateral tolerance allows variation on both sides of the nominal, like 50 +0.05/-0.10 mm. A unilateral tolerance puts all variation on one side, like 50 +0.00/+0.05 mm. The total tolerance is always the difference between the upper and lower limits.',
          hint: 'Holes are often toleranced unilateral-positive so the minimum size equals nominal.',
        },
        {
          id: 'u9-L1-Q14',
          type: 'multiple-choice',
          question: 'A designer specifies dia 30 +0.021/+0.000 mm for a bore. What type of tolerancing is this?',
          options: [
            'Bilateral symmetric tolerancing',
            'Bilateral asymmetric tolerancing',
            'Unilateral tolerancing',
            'Limit dimensioning'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Unilateral Tolerance</text><line x1="40" y1="68" x2="40" y2="16" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="44" x2="68" y2="44" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="10" y="46" font-size="3" fill="#6B7280">nom</text><rect x="28" y="28" width="24" height="16" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><text x="58" y="30" font-size="3.5" fill="#334155">+0.021</text><text x="58" y="46" font-size="3.5" fill="#334155">+0.000</text><text x="40" y="38" font-size="4.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Bore</text><text x="40" y="58" font-size="3.5" fill="#6B7280" text-anchor="middle">Both deviations same side</text></svg>',
          explanation: 'Both deviations are on the same side of nominal (zero and positive), making this unilateral tolerancing. The bore ranges from 30.000 to 30.021 mm.',
          distractorExplanations: {
            0: 'This focuses on bilateral/symmetric, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on bilateral/asymmetric, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on limit/dimensioning, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Look at whether the deviations straddle the nominal or sit on one side.',
        },
        {
          id: 'u9-L1-Q6',
          type: 'fill-blank',
          question: 'The minimum intended difference in size between mating parts in a clearance fit is called the _____.',
          blanks: ['allowance'],
          wordBank: ['allowance', 'tolerance', 'deviation', 'clearance', 'variance'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"><rect x="8" y="20" width="28" height="40" rx="2" fill="#58CC02" opacity="0.08" stroke="#58CC02" stroke-width="1.5"/><rect x="44" y="20" width="28" height="40" rx="2" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/><text x="22" y="42" font-size="4.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Hole</text><text x="58" y="42" font-size="4.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Shaft</text><line x1="36" y1="30" x2="44" y2="30" stroke="#A5E86C" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><line x1="36" y1="50" x2="44" y2="50" stroke="#A5E86C" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><text x="40" y="42" font-size="3.5" fill="#334155" text-anchor="middle" font-style="italic">min</text><text x="40" y="46" font-size="3.5" fill="#334155" text-anchor="middle" font-style="italic">gap</text><text x="40" y="10" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Allowance</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Tightest fit condition</text></svg>',
          explanation: 'Allowance is the minimum clearance (in a clearance fit) or maximum interference (in an interference fit) between mating parts.',
          hint: 'This is the tightest possible fit between mating parts.',
        },
        {
          id: 'u9-L1-MP1',
          type: 'match-pairs',
          question: 'Match each fit type to its description:',
          options: ['Clearance fit', 'Interference fit', 'Transition fit', 'Sliding fit'],
          matchTargets: ['Always has a gap', 'Shaft always larger than hole', 'Could go either way', 'Hand-insertable, minimal play'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Clearance fits always have a gap. Interference fits always have overlap. Transition fits can go either way. Sliding fits allow hand insertion with minimal play.',
        },
        {
          id: 'u9-L1-T3',
          type: 'teaching',
          question: 'Clearance, Interference, and Transition Fits',
          explanation: 'When a shaft goes into a hole, the fit depends on their relative sizes. A clearance fit always has a gap (shaft smaller than hole). An interference fit always has overlap (shaft larger than hole, requiring a press). A transition fit could go either way depending on where each part lands in its tolerance.',
          hint: 'The ISO system uses letter codes (H7/g6) to specify standard fits between holes and shafts.',
        },
        {
          id: 'u9-L1-Q18',
          type: 'fill-blank',
          question: 'A fit where the tolerance zones of the hole and shaft overlap, potentially resulting in either clearance or interference, is _____?',
          blanks: ['transition'],
          wordBank: ['transition', 'clearance', 'interference', 'sliding', 'running'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Transition Fit</text><line x1="40" y1="68" x2="40" y2="14" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="40" x2="68" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><rect x="18" y="28" width="14" height="22" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1"/><rect x="48" y="32" width="14" height="18" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><rect x="32" y="32" width="16" height="8" rx="0.5" fill="#A5E86C" opacity="0.25"><animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/></rect><text x="40" y="37" font-size="3" fill="#334155" text-anchor="middle">overlap</text><text x="25" y="42" font-size="3.5" fill="#58CC02" text-anchor="middle">Hole</text><text x="55" y="44" font-size="3.5" fill="#3B8700" text-anchor="middle">Shaft</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Zones overlap</text></svg>',
          explanation: 'A transition fit has overlapping tolerance zones, meaning the actual outcome depends on where the individual parts fall within their tolerance bands.',
          hint: 'This fit type sits between clearance and interference.',
        },
        {
          id: 'u9-L1-Q3',
          type: 'multiple-choice',
          question: 'A drawing specifies dia 50 +0.000/-0.050 mm for a bore and dia 50 +0.025/+0.050 mm for the mating shaft. What type of fit is this?',
          options: [
            'Clearance fit',
            'Interference fit',
            'Transition fit',
            'Tolerances are invalid'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="40" y1="72" x2="40" y2="8" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <line x1="12" y1="44" x2="68" y2="44" stroke="#3B8700" stroke-width="1" stroke-dasharray="3,2" opacity="0.3"/> <text x="40" y="78" font-size="4.5" fill="#334155" text-anchor="middle">Nominal dia 50</text> <rect x="16" y="44" width="14" height="20" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/> <line x1="14" y1="44" x2="32" y2="44" stroke="#58CC02" stroke-width="0.8" opacity="0.5"/> <text x="23" y="42" font-size="3.5" fill="#334155" text-anchor="middle">+0.000</text> <line x1="14" y1="64" x2="32" y2="64" stroke="#58CC02" stroke-width="0.8" opacity="0.5"/> <text x="23" y="70" font-size="3.5" fill="#334155" text-anchor="middle">-0.050</text> <text x="23" y="56" font-size="5" fill="#58CC02" text-anchor="middle" font-weight="bold">Hole</text> <rect x="50" y="24" width="14" height="10" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="1.2"/> <line x1="48" y1="24" x2="66" y2="24" stroke="#3B8700" stroke-width="0.8" opacity="0.5"/> <text x="57" y="22" font-size="3.5" fill="#334155" text-anchor="middle">+0.050</text> <line x1="48" y1="34" x2="66" y2="34" stroke="#3B8700" stroke-width="0.8" opacity="0.5"/> <text x="57" y="39" font-size="3.5" fill="#334155" text-anchor="middle">+0.025</text> <text x="57" y="31" font-size="5" fill="#3B8700" text-anchor="middle" font-weight="bold">Shaft</text> <text x="40" y="10" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">Interference</text> </svg>',
          explanation: 'Maximum shaft = 50.050, minimum shaft = 50.025. Maximum hole = 50.000, minimum hole = 49.950. Even the smallest shaft (50.025) exceeds the largest hole (50.000), so interference is guaranteed.',
          distractorExplanations: {
            0: 'This focuses on clearance, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on transition, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on tolerances/invalid, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Check if the smallest shaft can fit in the largest hole.',
        },
        {
          id: 'u9-L1-Q1',
          type: 'multiple-choice',
          question: 'Why use an interference fit for the inner ring on a rotating shaft, but a clearance fit for the outer ring in the housing?',
          options: [
            'It is arbitrary, both rings could use the same fit type',
            'The rotating ring must have an interference fit to prevent creep',
            'The inner ring needs interference for thermal expansion only',
            'Clearance on the outer ring is only for thermal expansion'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="40" cy="40" r="28" fill="#58CC02" opacity="0.05"/> <circle cx="40" cy="40" r="28" stroke="#58CC02" stroke-width="3" fill="none" opacity="0.3"/> <circle cx="40" cy="40" r="23.5" stroke="#A5E86C" stroke-width="3" fill="none" opacity="0.06"/> <circle cx="40" cy="40" r="12.5" fill="#58CC02" opacity="0.06"/> <circle cx="40" cy="40" r="12.5" stroke="#3B8700" stroke-width="3" fill="none"/> <circle cx="40" cy="40" r="13.5" stroke="#A5E86C" stroke-width="2" fill="none" opacity="0.06"/> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="2s" repeatCount="indefinite"/> <line x1="40" y1="28" x2="40" y2="52" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> <line x1="28" y1="40" x2="52" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> </g> <circle cx="40" cy="40" r="5" fill="#3B8700" opacity="0.25"/> <circle cx="40" cy="40" r="2" fill="white" opacity="0.12"/> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="4s" repeatCount="indefinite"/> <circle cx="40" cy="40" r="18" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="4,10" fill="none" opacity="0.2"/> <circle cx="58" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="58" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="56.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <circle cx="52.7" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <circle cx="40" cy="22" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="22" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="20.5" r="1.5" fill="white" opacity="0.3"/> <circle cx="27.3" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <circle cx="22" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="22" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="20.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <circle cx="27.3" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="51.2" r="1.5" fill="white" opacity="0.3"/> <circle cx="40" cy="58" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="58" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="56.5" r="1.5" fill="white" opacity="0.3"/> <circle cx="52.7" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="51.2" r="1.5" fill="white" opacity="0.3"/> </g> </svg>',
          explanation: 'The ring that rotates relative to the load direction must have an interference fit to prevent "creep," which is gradual rotation of the ring relative to its seat due to cyclic loading.',
          distractorExplanations: {
            0: 'This focuses on arbitrary,/rings, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on inner/needs, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on clearance/outer, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Consider which ring sees the rotating load vector.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 1b: ISO Fit System
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L1b',
      title: 'ISO Fit System',
      description: 'Hole-basis vs shaft-basis, ISO designation, H/h fundamentals, tolerance grades.',
      icon: '📝',
      xpReward: 20,
      levels: 4,
      questions: [
        {
          id: 'u9-L1b-T1',
          type: 'teaching',
          question: 'The ISO Fit System',
          explanation: 'The ISO system designates fits using letter-number codes. Uppercase letters (like H) describe hole deviations, lowercase letters (like g) describe shaft deviations. The number is the IT tolerance grade. H7/g6 means an H7 hole with a g6 shaft.',
          hint: 'H holes have zero lower deviation, meaning the minimum hole size equals nominal. This works with standard reamers.',
        },
        {
          id: 'u9-L1-Q7',
          type: 'multiple-choice',
          question: 'In the ISO hole-basis system, what does the designation H7/g6 represent?',
          options: [
            'Transition fit where H and g are surface finishes',
            'A hole of 7 mm mating with a shaft of 6 mm size',
            'An interference fit with 7 mm hole and 6 mm shaft',
            'Hole with H deviation and IT7, mating with g6 shaft'
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <text x="40" y="7" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">H7 / g6 Clearance Fit</text> <circle cx="26" cy="40" r="18" fill="#58CC02" opacity="0.06"/> <circle cx="26" cy="40" r="18" stroke="#58CC02" stroke-width="2" fill="none"/> <circle cx="26" cy="40" r="14" fill="#3B8700" opacity="0.1"/> <circle cx="26" cy="40" r="14" stroke="#3B8700" stroke-width="1.5" fill="none"/> <text x="26" y="42" font-size="4" fill="#334155" text-anchor="middle">shaft</text> <text x="26" y="62" font-size="4" fill="#334155" text-anchor="middle">hole</text> <line x1="62" y1="68" x2="62" y2="14" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/> <line x1="52" y1="44" x2="76" y2="44" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/> <text x="76" y="46" font-size="3" fill="#6B7280">nom</text> <rect x="54" y="30" width="6" height="14" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="1"/> <text x="57" y="38" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">H7</text> <rect x="66" y="48" width="6" height="10" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="1"/> <text x="69" y="55" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">g6</text> </svg>',
          explanation: 'In the ISO system, uppercase letters denote hole deviations and lowercase letters denote shaft deviations. "H" means the hole has a zero lower deviation (hole starts at nominal).',
          distractorExplanations: {
            0: 'This focuses on transition/where, which is not the correct mechanism or principle for this problem.',
            1: 'Regarding mating shaft: In the ISO system, uppercase letters denote hole deviations and lowercase letters denote shaft deviations.',
            2: 'This focuses on interference, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Uppercase = hole, lowercase = shaft.',
        },
        {
          id: 'u9-L1-Q24',
          type: 'fill-blank',
          question: 'In the ISO system, an "H" hole has its _____ deviation equal to zero, while an "h" shaft has its _____ deviation equal to zero.',
          blanks: ['lower', 'upper'],
          wordBank: ['lower', 'upper', 'fundamental', 'nominal', 'bilateral'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">H Hole and h Shaft</text><line x1="40" y1="68" x2="40" y2="16" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="8" y1="42" x2="72" y2="42" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="8" y="44" font-size="3" fill="#6B7280">nom</text><rect x="16" y="26" width="16" height="16" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1"/><text x="24" y="36" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">H</text><text x="24" y="22" font-size="3" fill="#334155" text-anchor="middle">lower=0</text><rect x="50" y="42" width="16" height="16" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><text x="58" y="52" font-size="4" fill="#3B8700" text-anchor="middle" font-weight="bold">h</text><text x="58" y="62" font-size="3" fill="#334155" text-anchor="middle">upper=0</text></svg>',
          explanation: 'For an H-type hole, the fundamental (lower) deviation is zero, meaning the minimum hole size equals the basic (nominal) size. The tolerance zone extends above nominal.',
          hint: 'The H hole starts at nominal and extends upward. The h shaft starts at nominal and extends downward.',
        },
        {
          id: 'u9-L1-Q9',
          type: 'multiple-choice',
          question: 'A shaft is specified as dia 25 h6. What are the upper and lower deviations of this shaft?',
          options: [
            'Upper deviation = +0.013 mm, lower deviation = 0.000 mm',
            'Upper deviation = 0.000 mm, lower deviation = -0.013 mm',
            'Upper deviation = +0.013 mm, lower deviation = -0.013 mm',
            'Upper deviation = +0.006 mm, lower deviation = -0.006 mm'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><line x1="40" y1="70" x2="40" y2="10" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><line x1="12" y1="35" x2="68" y2="35" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/><text x="10" y="37" font-size="3" fill="#6B7280">dia 25.000</text><rect x="30" y="35" width="20" height="16" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="1.2"/><text x="40" y="46" font-size="5" fill="#3B8700" text-anchor="middle" font-weight="bold">h6</text><line x1="28" y1="35" x2="52" y2="35" stroke="#3B8700" stroke-width="0.6" opacity="0.5"/><text x="56" y="34" font-size="3.5" fill="#334155">0.000</text><line x1="28" y1="51" x2="52" y2="51" stroke="#3B8700" stroke-width="0.6" opacity="0.5"/><text x="56" y="53" font-size="3.5" fill="#334155">-0.013</text><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">dia 25 h6 Shaft</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Zone below nominal</text></svg>',
          explanation: 'The fundamental deviation "h" for a shaft means the upper deviation is zero. The shaft at its largest equals the nominal size. The tolerance zone extends below nominal.',
          distractorExplanations: {
            0: 'This focuses on +0.013, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on +0.013, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on +0.006/-0.006, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The lowercase "h" means the tolerance zone lies at and below nominal.',
        },
        {
          id: 'u9-L1b-T2',
          type: 'teaching',
          question: 'Hole-Basis vs Shaft-Basis',
          explanation: 'In a hole-basis system (most common), you fix the hole deviation (H) and vary the shaft letter to achieve different fits. In a shaft-basis system, you fix the shaft (h) and vary the hole. Hole-basis is preferred because adjusting a shaft on a lathe is cheaper than adjusting a hole.',
          hint: 'Use shaft-basis when a single drawn bar stock shaft mates with multiple different holes.',
        },
        {
          id: 'u9-L1-Q8',
          type: 'multiple-choice',
          question: 'Difference between the hole-basis and shaft-basis fit systems, and when would you prefer the shaft-basis system?',
          options: [
            'There is no real difference, both produce the same results',
            'In a hole-basis system the hole tolerance zone is fixed (H) and the fit is varied by changing the shaft letter',
            'Hole-basis is for metric and shaft-basis is for imperial systems',
            'Shaft-basis always produces tighter fits than hole-basis'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Hole-Basis vs Shaft-Basis</text><rect x="4" y="14" width="34" height="28" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="22" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Hole-Basis</text><rect x="10" y="26" width="8" height="12" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><text x="14" y="34" font-size="3" fill="#334155" text-anchor="middle">H</text><rect x="22" y="28" width="8" height="8" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="0.8"/><text x="26" y="34" font-size="3" fill="#334155" text-anchor="middle">var</text><rect x="42" y="14" width="34" height="28" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="22" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Shaft-Basis</text><rect x="48" y="28" width="8" height="8" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><text x="52" y="34" font-size="3" fill="#334155" text-anchor="middle">var</text><rect x="60" y="26" width="8" height="12" rx="1" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="0.8"/><text x="64" y="34" font-size="3" fill="#334155" text-anchor="middle">h</text><text x="21" y="52" font-size="3.5" fill="#58CC02" text-anchor="middle">Fixed hole</text><text x="21" y="57" font-size="3.5" fill="#58CC02" text-anchor="middle">Vary shaft</text><text x="59" y="52" font-size="3.5" fill="#3B8700" text-anchor="middle">Fixed shaft</text><text x="59" y="57" font-size="3.5" fill="#3B8700" text-anchor="middle">Vary hole</text><text x="40" y="70" font-size="3.5" fill="#6B7280" text-anchor="middle">Shaft-basis: drawn bar stock</text></svg>',
          explanation: 'The hole-basis system is most common because it is generally harder (more expensive) to adjust hole size than shaft size.',
          distractorExplanations: {
            0: 'This focuses on there/difference,, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on metric/shaft-basis, which is not the correct mechanism or principle for this problem.',
            3: 'This "always" claim is too broad; shaft-basis produces the principle has important exceptions.',
          },
          hint: 'Consider when it is cheaper to vary the hole rather than the shaft.',
        },
        {
          id: 'u9-L1-SB1',
          type: 'sort-buckets',
          question: 'Sort each fit designation into the correct category:',
          options: ['H7/g6', 'H7/s6', 'H7/k6', 'H7/d9', 'H7/p6', 'H7/h6'],
          buckets: ['Clearance', 'Interference', 'Transition'],
          correctBuckets: [0, 1, 2, 0, 1, 2],
          explanation: 'g6 and d9 shafts are undersized (clearance). s6 and p6 shafts are oversized (interference). k6 and h6 sit near nominal (transition/sliding).',
        },
        {
          id: 'u9-L1-Q12',
          type: 'multiple-choice',
          question: 'What is the relationship between tolerance grade number (IT number) and the magnitude of the tolerance?',
          options: [
            'Higher IT numbers indicate tighter tolerances',
            'Higher IT numbers mean wider (looser) tolerances',
            'IT numbers refer to surface finish, not tolerance',
            'All IT grades have the same magnitude'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">IT Grade vs Tolerance</text><line x1="12" y1="65" x2="68" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="12" y1="65" x2="12" y2="15" stroke="#3B8700" stroke-width="0.8"/><rect x="16" y="62" width="5" height="3" rx="0.5" fill="#58CC02" opacity="0.4"/><rect x="23" y="59" width="5" height="6" rx="0.5" fill="#58CC02" opacity="0.5"/><rect x="30" y="54" width="5" height="11" rx="0.5" fill="#58CC02" opacity="0.6"/><rect x="37" y="47" width="5" height="18" rx="0.5" fill="#A5E86C" opacity="0.7"/><rect x="44" y="38" width="5" height="27" rx="0.5" fill="#A5E86C" opacity="0.8"/><rect x="51" y="28" width="5" height="37" rx="0.5" fill="#3B8700" opacity="0.4"/><rect x="58" y="18" width="5" height="47" rx="0.5" fill="#3B8700" opacity="0.5"/><text x="18" y="72" font-size="3" fill="#6B7280" text-anchor="middle">5</text><text x="25" y="72" font-size="3" fill="#6B7280" text-anchor="middle">7</text><text x="32" y="72" font-size="3" fill="#6B7280" text-anchor="middle">9</text><text x="39" y="72" font-size="3" fill="#6B7280" text-anchor="middle">11</text><text x="46" y="72" font-size="3" fill="#6B7280" text-anchor="middle">13</text><text x="53" y="72" font-size="3" fill="#6B7280" text-anchor="middle">15</text><text x="60" y="72" font-size="3" fill="#6B7280" text-anchor="middle">18</text><text x="40" y="78" font-size="3.5" fill="#334155" text-anchor="middle">Higher IT = looser</text></svg>',
          explanation: 'ISO tolerance grades range from IT01 (tightest, used for gauge blocks) through IT18 (loosest, rough castings/forgings).',
          distractorExplanations: {
            0: 'This focuses on indicate/tighter, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on refer/surface, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on grades/magnitude, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Consider the scale: IT01 for gauge blocks, IT16 for rough castings.',
        },
        {
          id: 'u9-L1-Q13',
          type: 'true-false',
          question: 'In the ISO system, for a given IT grade, the tolerance value is constant regardless of the nominal diameter.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">IT7 vs Diameter</text><line x1="12" y1="65" x2="68" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="12" y1="65" x2="12" y2="18" stroke="#3B8700" stroke-width="0.8"/><circle cx="20" cy="58" r="2" fill="#58CC02" opacity="0.7"/><circle cx="30" cy="52" r="2" fill="#58CC02" opacity="0.7"/><circle cx="40" cy="44" r="2" fill="#A5E86C" opacity="0.8"/><circle cx="50" cy="35" r="2" fill="#A5E86C" opacity="0.8"/><circle cx="60" cy="26" r="2" fill="#3B8700" opacity="0.6"/><path d="M20,58 Q30,52 40,44 Q50,35 60,26" stroke="#58CC02" stroke-width="1.2" fill="none"/><text x="40" y="76" font-size="3.5" fill="#334155" text-anchor="middle">Nominal diameter (mm)</text><text x="20" y="70" font-size="3" fill="#6B7280" text-anchor="middle">10</text><text x="40" y="70" font-size="3" fill="#6B7280" text-anchor="middle">50</text><text x="60" y="70" font-size="3" fill="#6B7280" text-anchor="middle">120</text></svg>',
          explanation: 'The tolerance value increases with nominal diameter. For example, IT7 tolerance for dia 6-10 mm is 0.015 mm, but for dia 100-120 mm it is 0.035 mm.',
          distractorExplanations: {
            0: 'The tolerance value increases with nominal diameter.',
          },
          hint: 'Is it equally easy to hold +/-0.01 mm on a 5 mm part and a 500 mm part?',
        },
        {
          id: 'u9-L1-Q19',
          type: 'multiple-choice',
          question: 'Why is the H7/H6 hole tolerance more commonly used than custom fundamental deviations (e.g., G7, K7)?',
          options: [
            'Non-H holes are not permitted under ASME standards',
            'H-type holes are always more precise than other letter deviations',
            'H-type holes have zero lower deviation and match standard tooling',
            'H holes are only used in metric systems'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">H Hole Popularity</text><rect x="8" y="18" width="64" height="20" rx="2" fill="#58CC02" opacity="0.08" stroke="#58CC02" stroke-width="1"/><text x="40" y="30" font-size="4" fill="#58CC02" text-anchor="middle" font-weight="bold">H hole: lower dev = 0</text><text x="40" y="36" font-size="3.5" fill="#334155" text-anchor="middle">Standard reamers match H</text><rect x="14" y="46" width="12" height="8" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><rect x="34" y="46" width="12" height="8" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><rect x="54" y="46" width="12" height="8" rx="1" fill="#58CC02" opacity="0.2" stroke="#58CC02" stroke-width="0.8"/><text x="20" y="52" font-size="3" fill="#334155" text-anchor="middle">H6</text><text x="40" y="52" font-size="3" fill="#334155" text-anchor="middle">H7</text><text x="60" y="52" font-size="3" fill="#334155" text-anchor="middle">H8</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Off-the-shelf tooling</text></svg>',
          explanation: 'Standard reamers, boring bars, and broaches are manufactured to produce H-type holes (zero lower deviation = hole at nominal minimum). Using H holes means off-the-shelf tooling can be used.',
          distractorExplanations: {
            0: 'This focuses on non-h/permitted, which is not the correct mechanism or principle for this problem.',
            1: 'This "always" claim is too broad; h-type holes the principle has important exceptions.',
            3: 'This is too restrictive; the principle applies more broadly than holes metric suggests.',
          },
          hint: 'Consider tooling availability.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 1c: Applied Fits & Standards
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L1c',
      title: 'Applied Fits & Standards',
      description: 'Selecting fits, ASME Rule #1, ISO 2768, process capability, thermal effects.',
      icon: '📝',
      xpReward: 20,
      levels: 4,
      questions: [
        {
          id: 'u9-L1c-T1',
          type: 'teaching',
          question: 'Selecting the Right Fit',
          explanation: 'Fit selection depends on function. H7/h6 gives a sliding fit (hand-insertable, minimal play). H7/k6 is a transition fit for accurate centering. H7/p6 is a light press fit. H7/s6 is a heavy press fit. Always consider how the assembly will be done and what forces the joint must handle.',
          hint: 'Try this now: look at a mechanical assembly near you and guess which fit type each joint uses.',
        },
        {
          id: 'u9-L1-Q29',
          type: 'multiple-choice',
          question: 'The pin must be easy to push in by hand but have negligible clearance. Which fit is most appropriate?',
          options: [
            'H7/s6, heavy press fit',
            'H7/h6, sliding fit with very small clearance',
            'H11/c11, extra-loose running fit',
            'H7/p6, light press fit requiring an arbor press'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">H7/h6 Sliding Fit</text><circle cx="40" cy="40" r="18" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1.5"/><circle cx="40" cy="40" r="14" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><line x1="54" y1="26" x2="62" y2="18" stroke="#A5E86C" stroke-width="0.8" opacity="0.5"/><text x="64" y="20" font-size="3.5" fill="#6B7280">tiny gap</text><g><animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,0" dur="1.5s" repeatCount="indefinite"/><circle cx="40" cy="40" r="14" fill="none" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.3"/></g><text x="40" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Hand-insertable, minimal play</text></svg>',
          explanation: 'H7/h6 is a precision sliding fit (also called a "push fit") that allows hand insertion with very little clearance.',
          distractorExplanations: {
            0: 'This focuses on h7/s6,/heavy, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on h11/c11,/extra-loose, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on h7/p6,/light, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'You want minimal play but hand-insertable.',
        },
        {
          id: 'u9-L1-Q11',
          type: 'multiple-choice',
          question: 'You need to select a fit for a gear hub on a keyed shaft. Which fit type is most appropriate?',
          options: [
            'H7/d9, loose running clearance fit',
            'H7/s6, heavy interference press fit',
            'H7/k6, transition fit providing accurate centering',
            'H11/c11, extra-loose clearance fit'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Gear Hub on Keyed Shaft</text><circle cx="40" cy="42" r="22" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1.5"/><circle cx="40" cy="42" r="14" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><rect x="36" y="28" width="8" height="6" rx="0.5" fill="#A5E86C" opacity="0.3" stroke="#3B8700" stroke-width="0.8"/><text x="40" y="32" font-size="3" fill="#334155" text-anchor="middle">key</text><text x="40" y="46" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">H7/k6</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Transition fit, accurate centering</text></svg>',
          explanation: 'H7/k6 is a locational transition fit ideal for components that need precise centering on a shaft but must be removable.',
          distractorExplanations: {
            0: 'This focuses on h7/d9,/loose, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on h7/s6,/heavy, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on h11/c11,/extra-loose, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Consider a fit that centers accurately but is still removable.',
        },
        {
          id: 'u9-L1-Q5',
          type: 'multiple-choice',
          question: 'A drawing has an IT6 tolerance on a rough cast surface that gets no machining. Why is this a problem?',
          options: [
            'IT6 is too loose for a cast surface',
            'IT6 requires precision machining and cannot be achieved by casting',
            'The tolerance grade does not matter for cast surfaces',
            'Modern casting processes can easily achieve IT6'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> </g> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> </svg>',
          explanation: 'ISO tolerance grades reflect manufacturing process capability. Sand casting typically achieves IT11 to IT16, investment casting IT7 to IT9, die casting IT8 to IT10.',
          distractorExplanations: {
            0: 'This focuses on loose/surface, which is not the correct mechanism or principle for this problem.',
            2: 'This incorrectly denies an effect that is relevant to tolerance grade and significant in this context.',
            3: 'This focuses on modern/processes, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Consider what tolerance grades different manufacturing processes can achieve.',
        },
        {
          id: 'u9-L1-OS1',
          type: 'order-steps',
          question: 'Put these manufacturing processes in order from tightest to loosest typical tolerance:',
          steps: ['Lapping', 'Grinding', 'Turning', 'Milling', 'Sand casting'],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Lapping achieves IT1 to IT3, grinding IT4 to IT6, turning IT6 to IT9, milling IT7 to IT10, sand casting IT11 to IT16.',
        },
        {
          id: 'u9-L1c-T2',
          type: 'teaching',
          question: 'ASME Rule #1 and ISO 2768',
          explanation: 'ASME Rule #1 (the Envelope Principle) says a feature at MMC must have perfect form. ISO uses the Independence Principle by default, where form and size are independent. ISO 2768 provides general tolerances for unchalloted dimensions, using classes like "mK" (m = medium dimensional, K = geometric).',
          hint: 'This is a key difference between ASME and ISO: ASME ties form to size by default, ISO does not.',
        },
        {
          id: 'u9-L1-Q26',
          type: 'multiple-choice',
          question: 'A drawing callout shows dia 20 +/-0.05 with a note "INTERPRET PER ASME Y14.5-2018." Under Rule #1, what does this imply?',
          options: [
            'Any form is acceptable if two-point measurement is OK',
            'At MMC the feature must have perfect form per Rule #1',
            'Form control requires a separate GD&T callout always',
            'Rule #1 only applies to angles, not to diameters'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">ASME Rule #1</text><rect x="10" y="16" width="60" height="20" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="26" r="7" fill="white" stroke="#3B8700" stroke-width="1.2"/><text x="40" y="28" font-size="3" fill="#334155" text-anchor="middle">dia 20</text><circle cx="40" cy="54" r="14" fill="none" stroke="#58CC02" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.5"/><text x="40" y="52" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Perfect form</text><text x="40" y="57" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">at MMC</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Envelope Principle</text></svg>',
          explanation: 'ASME Y14.5 Rule #1 (the Envelope Principle) states that the surface of a regular feature of size at MMC must not extend beyond the envelope of perfect form at MMC.',
          distractorExplanations: {
            0: 'This focuses on acceptable/two-point, which is not the correct mechanism or principle for this problem.',
            2: 'This "always" claim is too broad; control requires the principle has important exceptions.',
            3: 'This is too restrictive; the principle applies more broadly than applies angles suggests.',
          },
          hint: 'ASME Rule #1 ties form control to the MMC size.',
        },
        {
          id: 'u9-L1-Q27',
          type: 'true-false',
          question: 'The ISO default for regular features of size is the Envelope Principle (perfect form at MMC), the same as ASME Y14.5 Rule #1.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">ASME vs ISO Default</text><rect x="4" y="16" width="34" height="26" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="24" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">ASME</text><text x="21" y="32" font-size="3" fill="#334155" text-anchor="middle">Rule #1 default</text><text x="21" y="38" font-size="3" fill="#334155" text-anchor="middle">Envelope ON</text><rect x="42" y="16" width="34" height="26" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="24" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">ISO</text><text x="59" y="32" font-size="3" fill="#334155" text-anchor="middle">Independence</text><text x="59" y="38" font-size="3" fill="#334155" text-anchor="middle">Envelope OFF</text><text x="40" y="54" font-size="3.5" fill="#6B7280" text-anchor="middle">Key difference between standards</text></svg>',
          explanation: 'This is a key difference. ASME Y14.5 applies the Envelope Principle (Rule #1) by default. ISO uses the Independence Principle, where form and size are independent unless explicitly linked.',
          distractorExplanations: {
            0: 'This is a key difference.',
          },
          hint: 'ASME and ISO have different default rules regarding form and size.',
        },
        {
          id: 'u9-L1-Q22',
          type: 'multiple-choice',
          question: 'The fit is H7/p6 (light interference) at 20 C. What happens to the fit at higher operating temperature?',
          options: [
            'Nothing changes, fit is unaffected since both parts are steel',
            'The shaft expands more than the housing, tightening the fit',
            'The fit loosens as both parts expand equally',
            'Temperature effects are negligible for all interference fits'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Thermal Expansion</text><circle cx="26" cy="40" r="14" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1.5"/><circle cx="26" cy="40" r="8" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><text x="26" y="42" font-size="3" fill="#334155" text-anchor="middle">20C</text><circle cx="58" cy="40" r="14" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1.5"/><circle cx="58" cy="40" r="10" fill="#EC4899" opacity="0.08" stroke="#EC4899" stroke-width="1.5" stroke-dasharray="2,2"><animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/></circle><text x="58" y="42" font-size="3" fill="#EC4899" text-anchor="middle">Hot</text><text x="26" y="62" font-size="3.5" fill="#6B7280" text-anchor="middle">Fit OK</text><text x="58" y="62" font-size="3.5" fill="#EC4899" text-anchor="middle">Tighter!</text></svg>',
          explanation: 'Differential thermal expansion is critical for interference fits. If the shaft heats up more, it expands and the fit tightens.',
          distractorExplanations: {
            0: 'This focuses on nothing/changes,, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on loosens/parts, which is not the correct mechanism or principle for this problem.',
            3: 'Temperature is not the primary factor in this problem; the correct analysis uses a different variable.',
          },
          hint: 'If the shaft is much hotter than the housing, it expands more.',
        },
        {
          id: 'u9-L1-Q21',
          type: 'true-false',
          question: 'When specifying tolerances, the designer should always use the tightest tolerance achievable by the manufacturing process.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Cost vs Tolerance</text><line x1="12" y1="65" x2="68" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="12" y1="65" x2="12" y2="15" stroke="#3B8700" stroke-width="0.8"/><path d="M16,62 Q28,60 38,50 Q48,35 56,18" stroke="#58CC02" stroke-width="2" fill="none"/><text x="40" y="76" font-size="3.5" fill="#334155" text-anchor="middle">Tighter tolerance</text><text x="8" y="40" font-size="3" fill="#334155" text-anchor="middle" transform="rotate(-90,8,40)">Cost</text><circle cx="50" cy="28" r="8" fill="none" stroke="#EC4899" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/><text x="50" y="30" font-size="3" fill="#EC4899" text-anchor="middle">avoid</text></svg>',
          explanation: 'Over-tolerancing dramatically increases manufacturing cost, inspection time, and scrap rate without improving product function.',
          distractorExplanations: {
            0: 'Over-tolerancing dramatically increases manufacturing cost, inspection time, and scrap rate without improving product function.',
          },
          hint: 'What happens to cost and scrap when you make tolerances tighter than needed?',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 2a: GD&T Basics
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L2',
      title: 'GD&T Basics',
      description: 'Feature control frames, 5 categories, form tolerances, MMC/LMC basics.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u9-L2-T1',
          type: 'teaching',
          question: 'What Is GD&T?',
          explanation: 'GD&T (Geometric Dimensioning and Tolerancing) controls the geometry of parts beyond just size. It uses symbols in a feature control frame to specify how flat, round, straight, or correctly positioned a feature must be. There are 5 categories: form, orientation, location, profile, and runout.',
          hint: 'A feature control frame reads left to right: symbol, tolerance value, modifiers, then datum references.',
        },
        {
          id: 'u9-L2-Q10',
          type: 'true-false',
          question: 'Form tolerances require datum references in the feature control frame.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Form = No Datums</text><rect x="8" y="16" width="64" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/><line x1="22" y1="16" x2="22" y2="30" stroke="#3B8700" stroke-width="1"/><text x="36" y="25" font-size="4" fill="#334155" text-anchor="middle">0.05</text><text x="55" y="25" font-size="4" fill="#EC4899" text-anchor="middle">no datum</text><text x="40" y="46" font-size="3.5" fill="#6B7280" text-anchor="middle">Form tolerances are self-referencing</text><text x="40" y="56" font-size="3.5" fill="#6B7280" text-anchor="middle">Controls shape against itself</text><text x="40" y="66" font-size="3.5" fill="#58CC02" text-anchor="middle">Flatness, straightness,</text><text x="40" y="73" font-size="3.5" fill="#58CC02" text-anchor="middle">circularity, cylindricity</text></svg>',
          explanation: 'Form tolerances are self-referencing. They control the shape of a feature relative to itself, not to any external datum.',
          distractorExplanations: {
            0: 'Form tolerances are self-referencing.',
          },
          hint: 'Form tolerances measure a feature against its own ideal shape.',
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
          explanation: 'ASME Y14.5 defines five categories: Form, Orientation, Location, Profile, and Runout.',
          distractorExplanations: {
            0: 'This focuses on size,/position,, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on flatness,/roundness,, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on primary,/secondary,, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think of the five groups that contain the 14 geometric tolerance symbols.',
        },
        {
          id: 'u9-L2-T2',
          type: 'teaching',
          question: 'MMC, LMC, and Bonus Tolerance',
          explanation: 'MMC (Maximum Material Condition) is the size where a feature has the most material: smallest hole, largest shaft. When a feature departs from MMC, it gets "bonus" geometric tolerance because there is more room for the parts to fit. LMC is the opposite, used when minimum wall thickness is the concern.',
          hint: 'The circled M in a feature control frame means the tolerance applies at MMC with bonus allowed.',
        },
        {
          id: 'u9-L2-Q6',
          type: 'fill-blank',
          question: 'The condition where a feature of size contains the maximum amount of material is called _____.',
          blanks: ['MMC'],
          wordBank: ['MMC', 'LMC', 'RFS', 'MMS', 'VCB'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">MMC Condition</text><rect x="8" y="18" width="28" height="40" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="22" y="30" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Hole</text><text x="22" y="38" font-size="3" fill="#334155" text-anchor="middle">MMC =</text><text x="22" y="44" font-size="3" fill="#334155" text-anchor="middle">smallest</text><circle cx="22" cy="52" r="4" fill="white" stroke="#3B8700" stroke-width="1"/><rect x="44" y="18" width="28" height="40" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="58" y="30" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Shaft</text><text x="58" y="38" font-size="3" fill="#334155" text-anchor="middle">MMC =</text><text x="58" y="44" font-size="3" fill="#334155" text-anchor="middle">largest</text><circle cx="58" cy="52" r="6" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/><text x="40" y="70" font-size="3.5" fill="#6B7280" text-anchor="middle">Most material everywhere</text></svg>',
          explanation: 'Maximum Material Condition (MMC) is when a feature has the most material: smallest hole or largest shaft.',
          hint: 'This condition represents the most material everywhere.',
        },
        {
          id: 'u9-L2-Q8',
          type: 'multiple-choice',
          question: 'What is the difference between circularity and cylindricity?',
          options: [
            'They are the same tolerance applied in different units',
            'Circularity controls roundness of individual cross-sections (2D), while cylindricity controls the entire 3D surface',
            'Circularity applies to internal features and cylindricity to external',
            'Cylindricity is always tighter than circularity'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Circularity vs Cylindricity</text><rect x="4" y="16" width="34" height="48" rx="2" fill="#58CC02" opacity="0.04" stroke="#58CC02" stroke-width="1"/><text x="21" y="24" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Circularity</text><ellipse cx="21" cy="42" rx="10" ry="4" fill="none" stroke="#58CC02" stroke-width="1.5"/><ellipse cx="21" cy="42" rx="8" ry="3" fill="none" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="2,2"/><text x="21" y="56" font-size="3" fill="#6B7280" text-anchor="middle">2D slice</text><rect x="42" y="16" width="34" height="48" rx="2" fill="#3B8700" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="59" y="24" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Cylindricity</text><ellipse cx="59" cy="32" rx="10" ry="4" fill="none" stroke="#3B8700" stroke-width="1"/><ellipse cx="59" cy="50" rx="10" ry="4" fill="none" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.3"/><line x1="49" y1="32" x2="49" y2="50" stroke="#3B8700" stroke-width="1"/><line x1="69" y1="32" x2="69" y2="50" stroke="#3B8700" stroke-width="1"/><text x="59" y="56" font-size="3" fill="#6B7280" text-anchor="middle">Full 3D</text></svg>',
          explanation: 'Circularity (roundness) applies to individual cross-sections. Cylindricity controls the full 3D surface. Cylindricity is more comprehensive.',
          distractorExplanations: {
            0: 'This focuses on tolerance/applied, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on applies/internal, which is not the correct mechanism or principle for this problem.',
            3: 'This "always" claim is too broad; cylindricity tighter the principle has important exceptions.',
          },
          hint: 'One is a 2D slice control, the other is a full 3D surface control.',
        },
        {
          id: 'u9-L2-MP1',
          type: 'match-pairs',
          question: 'Match each GD&T category to what it controls:',
          options: ['Form', 'Orientation', 'Location', 'Profile'],
          matchTargets: ['Shape against itself', 'Angle relative to datum', 'Position relative to datums', 'Complex surface shape'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Form controls shape (no datums needed). Orientation controls angle to a datum. Location controls where features sit. Profile controls complex curved surfaces.',
        },
        {
          id: 'u9-L2-Q2',
          type: 'multiple-choice',
          question: 'What is wrong with applying a flatness callout to a cylindrical bore?',
          options: [
            'Nothing, flatness can apply to any surface',
            'Flatness only applies to planar surfaces, use cylindricity instead',
            'They should use straightness instead of flatness',
            'The issue is that flatness needs a datum reference'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">Flatness on Cylinder?</text><rect x="20" y="20" width="40" height="30" rx="10" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><ellipse cx="40" cy="20" rx="20" ry="6" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1"/><ellipse cx="40" cy="50" rx="20" ry="6" fill="none" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.3"/><line x1="50" y1="56" x2="58" y2="64" stroke="#EC4899" stroke-width="1"/><text x="60" y="68" font-size="4" fill="#EC4899" font-weight="bold">X wrong</text><text x="40" y="78" font-size="3.5" fill="#6B7280" text-anchor="middle">Use cylindricity instead</text></svg>',
          explanation: 'Flatness is a form tolerance that applies only to nominally flat (planar) surfaces. For cylindrical bores, use cylindricity.',
          distractorExplanations: {
            0: 'This focuses on nothing,/apply, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on should/straightness, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on issue/needs, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Consider which geometric surfaces each form tolerance applies to.',
        },
        {
          id: 'u9-L2-Q1',
          type: 'multiple-choice',
          question: 'Why is position tolerance almost always applied at MMC rather than RFS for clearance-hole bolt patterns?',
          options: [
            'MMC is simply the default, no functional reason',
            'At MMC holes are smallest and shafts largest, giving the tightest fit condition, and bonus tolerance helps when parts depart from MMC',
            'RFS is actually preferred but MMC is cheaper to inspect',
            'MMC only applies to shafts, not holes'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="6" y="12" width="68" height="14" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.5"/> <line x1="22" y1="12" x2="22" y2="26" stroke="#3B8700" stroke-width="1.2"/> <line x1="40" y1="12" x2="40" y2="26" stroke="#3B8700" stroke-width="1.2"/> <line x1="52" y1="12" x2="52" y2="26" stroke="#3B8700" stroke-width="1.2"/> <line x1="60" y1="12" x2="60" y2="26" stroke="#3B8700" stroke-width="1.2"/> <circle cx="14" cy="19" r="4" stroke="#58CC02" stroke-width="1.2" fill="none"/> <line x1="14" y1="15" x2="14" y2="23" stroke="#58CC02" stroke-width="1"/> <line x1="10" y1="19" x2="18" y2="19" stroke="#58CC02" stroke-width="1"/> <text x="24" y="22" font-size="5" fill="#334155">dia 0.25</text> <text x="42" y="22" font-size="5" fill="#334155" font-weight="bold">M</text> <circle cx="46" cy="19" r="4" stroke="#334155" stroke-width="0.8" fill="none"/> <text x="54" y="22" font-size="6" fill="#334155" font-weight="bold">A</text> <text x="63" y="22" font-size="6" fill="#334155" font-weight="bold">B</text> <text x="14" y="40" font-size="4" fill="#6B7280" text-anchor="middle">Geo.</text> <text x="14" y="45" font-size="4" fill="#6B7280" text-anchor="middle">symbol</text> <text x="31" y="40" font-size="4" fill="#6B7280" text-anchor="middle">Tolerance</text> <text x="46" y="40" font-size="4" fill="#6B7280" text-anchor="middle">Mod.</text> <text x="46" y="45" font-size="4" fill="#6B7280" text-anchor="middle">(MMC)</text> <text x="60" y="40" font-size="4" fill="#6B7280" text-anchor="middle">Datum</text> <text x="60" y="45" font-size="4" fill="#6B7280" text-anchor="middle">refs</text> <rect x="14" y="54" width="52" height="16" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1"/> <circle cx="40" cy="62" r="4" fill="white" stroke="#3B8700" stroke-width="1"/> </svg>',
          explanation: 'The functional requirement for a bolt pattern is that the bolts pass through the holes. At MMC (smallest holes, largest bolts) the fit is tightest. Bonus tolerance as features depart from MMC matches the physics.',
          distractorExplanations: {
            0: 'This focuses on simply/default,, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on actually/preferred, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than applies shafts suggests.',
          },
          hint: 'Consider when assembly fit is tightest and when extra tolerance helps.',
        },
        {
          id: 'u9-L2-Q9',
          type: 'multiple-choice',
          question: 'The hole has a size tolerance of dia 10.0-10.5 with position tolerance dia 0.25 at MMC. What is the total positional tolerance when the hole is produced at dia 10.3?',
          options: [
            'dia 0.25, the tolerance is fixed',
            'dia 0.55, stated tolerance (0.25) plus departure from MMC (0.30)',
            'dia 0.30, only the bonus tolerance applies',
            'dia 0.50, twice the stated tolerance'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Bonus Tolerance at MMC</text><line x1="10" y1="65" x2="70" y2="65" stroke="#3B8700" stroke-width="0.8"/><line x1="10" y1="65" x2="10" y2="20" stroke="#3B8700" stroke-width="0.8"/><rect x="16" y="52" width="10" height="13" rx="0.5" fill="#58CC02" opacity="0.3" stroke="#58CC02" stroke-width="0.8"/><text x="21" y="60" font-size="3" fill="#334155" text-anchor="middle">0.25</text><rect x="44" y="32" width="10" height="33" rx="0.5" fill="#A5E86C" opacity="0.3" stroke="#A5E86C" stroke-width="0.8"/><rect x="44" y="52" width="10" height="13" rx="0.5" fill="#58CC02" opacity="0.3" stroke="#58CC02" stroke-width="0.8"/><text x="49" y="44" font-size="2.5" fill="#334155" text-anchor="middle">+0.3</text><text x="21" y="72" font-size="3" fill="#6B7280" text-anchor="middle">MMC</text><text x="49" y="72" font-size="3" fill="#6B7280" text-anchor="middle">10.3</text></svg>',
          explanation: 'With the MMC modifier, bonus tolerance = actual size minus MMC size. The hole MMC is dia 10.0 (smallest hole). At dia 10.3: bonus = 10.3 minus 10.0 = 0.30. Total = 0.25 + 0.30 = 0.55.',
          distractorExplanations: {
            0: 'This focuses on 0.25,/fixed, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than bonus tolerance suggests.',
            3: 'This focuses on 0.50,/twice, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Bonus = departure from MMC.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 2b: Orientation & Position
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L2b',
      title: 'Orientation & Position',
      description: 'Perpendicularity, parallelism, angularity, position tolerance, virtual condition.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u9-L2-T3',
          type: 'teaching',
          question: 'Form vs Orientation Tolerances',
          explanation: 'Form tolerances (flatness, straightness, circularity, cylindricity) control a feature against its own ideal shape and never reference datums. Orientation tolerances (perpendicularity, parallelism, angularity) control a feature relative to a datum and also inherently control form.',
          hint: 'If perpendicularity is 0.05 mm, the surface must also be flat within 0.05 mm.',
        },
        {
          id: 'u9-L2-Q19',
          type: 'multiple-choice',
          question: 'A designer applies a parallelism tolerance of 0.02 to a surface. Must the surface also be flat within 0.02?',
          options: [
            'No, parallelism and flatness are independent controls',
            'Yes, orientation tolerances inherently control form',
            'Only if a separate flatness callout is also applied',
            'Parallelism does not apply to surfaces, only axes'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Orientation Controls Form</text><line x1="10" y1="55" x2="70" y2="55" stroke="#3B8700" stroke-width="2"/><text x="68" y="52" font-size="3.5" fill="#334155">A</text><rect x="15" y="35" width="50" height="0.5" fill="#A5E86C" opacity="0.4"/><rect x="15" y="55" width="50" height="0.5" fill="#A5E86C" opacity="0.4"/><text x="68" y="38" font-size="3" fill="#334155">0.02</text><path d="M18,45 Q28,38 40,46 Q52,50 62,42" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="40" y="28" font-size="3.5" fill="#58CC02" text-anchor="middle">Parallelism 0.02</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Form inherently controlled</text></svg>',
          explanation: 'Orientation tolerances inherently refine form. If a surface must lie between two parallel planes 0.02 apart, it cannot have flatness error greater than 0.02.',
          distractorExplanations: {
            0: 'This focuses on parallelism/flatness, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than separate flatness suggests.',
            3: 'This incorrectly denies an effect that is relevant to parallelism apply and significant in this context.',
          },
          hint: 'If a surface is constrained between two planes 0.02 apart, can it be less flat than 0.02?',
        },
        {
          id: 'u9-L2-Q12',
          type: 'multiple-choice',
          question: 'A perpendicularity tolerance of 0.05 is applied to a flat surface relative to datum A. What is the shape of the tolerance zone?',
          options: [
            'A cylinder of dia 0.05 around the surface normal axis',
            'Two planes 0.05 apart, perpendicular to datum A',
            'A single plane exactly 0.05 away from datum A',
            'A square zone of 0.05 x 0.05 around the feature'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Perpendicularity Zone</text><line x1="10" y1="60" x2="70" y2="60" stroke="#3B8700" stroke-width="2"/><text x="68" y="58" font-size="3.5" fill="#334155">A</text><polygon points="64,60 62,66 66,66" fill="#3B8700" opacity="0.4"/><rect x="30" y="20" width="20" height="40" rx="1" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><rect x="32" y="20" width="0.5" height="40" fill="#A5E86C" opacity="0.3"/><rect x="47.5" y="20" width="0.5" height="40" fill="#A5E86C" opacity="0.3"/><text x="40" y="42" font-size="3.5" fill="#334155" text-anchor="middle">0.05</text><text x="40" y="74" font-size="3.5" fill="#6B7280" text-anchor="middle">Two planes 0.05 apart at 90 deg</text></svg>',
          explanation: 'When perpendicularity is applied to a surface (not preceded by a diameter symbol), the tolerance zone is two parallel planes 0.05 mm apart, oriented exactly 90 degrees to datum A.',
          distractorExplanations: {
            0: 'This focuses on cylinder/around, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on single/plane, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on square/around, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'For a surface control, the zone is two parallel planes.',
        },
        {
          id: 'u9-L2-Q20',
          type: 'true-false',
          question: 'Position tolerance in ASME Y14.5 always requires at least one datum reference in the feature control frame.',
          correctAnswer: true,
          explanation: 'Position tolerance defines where a feature is located relative to other features. This inherently requires a reference frame (datums).',
          distractorExplanations: {
            1: 'Position tolerance defines where a feature is located relative to other features.',
          },
          hint: 'Position means "where relative to something."',
        },
        {
          id: 'u9-L2-SB1',
          type: 'sort-buckets',
          question: 'Sort each geometric tolerance: does it need a datum reference?',
          options: ['Flatness', 'Perpendicularity', 'Circularity', 'Position', 'Cylindricity', 'Parallelism'],
          buckets: ['No datum needed', 'Datum required'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Form tolerances (flatness, circularity, cylindricity) are self-referencing and need no datums. Orientation (perpendicularity, parallelism) and location (position) require datums.',
        },
        {
          id: 'u9-L2b-T2',
          type: 'teaching',
          question: 'Virtual Condition',
          explanation: 'The virtual condition is the worst-case boundary a feature can occupy, combining both its size and geometric tolerance. For an external feature at MMC: VC = MMC size + geometric tolerance. For an internal feature at MMC: VC = MMC size minus geometric tolerance.',
          hint: 'Virtual condition is used in stack-up analysis and functional gauge design.',
        },
        {
          id: 'u9-L2-Q13',
          type: 'multiple-choice',
          question: 'What is the "virtual condition" of an external feature (shaft) specified at dia 20.0 +/- 0.1 with perpendicularity of dia 0.05 at MMC?',
          options: [
            'dia 20.00, the nominal size',
            'dia 20.15, MMC size (20.1) plus geometric tol (0.05)',
            'dia 20.10, just the MMC size',
            'dia 20.05, nominal plus geometric tolerance'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Virtual Condition</text><circle cx="40" cy="40" r="18" fill="none" stroke="#EC4899" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.5"/><circle cx="40" cy="40" r="15" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><text x="40" y="38" font-size="3.5" fill="#334155" text-anchor="middle">MMC=20.1</text><text x="40" y="44" font-size="3.5" fill="#334155" text-anchor="middle">+perp 0.05</text><text x="40" y="62" font-size="4" fill="#EC4899" text-anchor="middle" font-weight="bold">VC = 20.15</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Worst-case boundary</text></svg>',
          explanation: 'Virtual condition is the worst-case boundary. For an external feature at MMC: VC = MMC size + geometric tolerance = 20.1 + 0.05 = 20.15.',
          distractorExplanations: {
            0: 'This focuses on 20.00,/nominal, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on 20.10,, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on 20.05,/nominal, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The worst-case boundary for an external feature = largest size + geometric tolerance.',
        },
        {
          id: 'u9-L2-Q5',
          type: 'multiple-choice',
          question: 'When should the LMC (Least Material Condition) modifier be used instead of MMC?',
          options: [
            'When maximizing assembly clearance is the primary concern',
            'When controlling minimum wall thickness between features',
            'When reducing manufacturing cost is the main goal',
            'When the feature is a shaft rather than a hole'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4.5" fill="#334155" text-anchor="middle" font-weight="bold">LMC - Min Wall</text><rect x="10" y="20" width="60" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="38" r="12" fill="white" stroke="#3B8700" stroke-width="1.5"/><line x1="52" y1="38" x2="70" y2="38" stroke="#A5E86C" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/></line><text x="64" y="36" font-size="3" fill="#334155" text-anchor="middle">min</text><text x="64" y="42" font-size="3" fill="#334155" text-anchor="middle">wall</text><text x="40" y="40" font-size="3.5" fill="#334155" text-anchor="middle">LMC hole</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">LMC protects minimum material</text></svg>',
          explanation: 'LMC is used when the critical concern is minimum wall thickness or minimum remaining material, for example a hole close to an edge.',
          distractorExplanations: {
            0: 'This focuses on maximizing/assembly, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on reducing/manufacturing, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on feature/shaft, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Consider when having less material is the dangerous condition.',
        },
        {
          id: 'u9-L2-Q26',
          type: 'fill-blank',
          question: 'In ASME Y14.5-2018, the default modifier is _____, meaning no _____ tolerance is available unless MMC or LMC is explicitly stated.',
          blanks: ['RFS', 'bonus'],
          wordBank: ['RFS', 'bonus', 'MMC', 'datum', 'LMC', 'profile'],
          explanation: 'In ASME Y14.5-2018, RFS (Regardless of Feature Size) is the default. No symbol is needed in the feature control frame. No bonus tolerance is available at RFS.',
          hint: 'If no modifier symbol appears in the feature control frame, what is the default?',
        },
        {
          id: 'u9-L2-Q25',
          type: 'multiple-choice',
          question: 'A surface has both a flatness tolerance of 0.01 and a parallelism tolerance of 0.05 to datum A. Is this a valid callout?',
          options: [
            'Yes, the flatness refines the form within the larger parallelism zone',
            'No, flatness must always be larger than parallelism',
            'No, you cannot apply both flatness and parallelism to the same surface',
            'Yes, but the flatness overrides parallelism, making the 0.05 meaningless'
          ],
          correctIndex: 0,
          explanation: 'This is valid and common. The parallelism tolerance (0.05) defines the overall orientation zone. The flatness tolerance (0.01) refines the form within that zone, requiring the surface to be flatter than the parallelism alone would demand.',
          distractorExplanations: {
            1: 'This "always" claim is too broad; flatness larger the principle has important exceptions.',
            2: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
            3: 'This focuses on overrides/parallelism,, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'A form tolerance tighter than the orientation tolerance adds extra control.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 2c: Advanced GD&T
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L2c',
      title: 'Advanced GD&T',
      description: 'Runout, profile, composite position, concentricity, projected tolerance zones.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u9-L2c-T1',
          type: 'teaching',
          question: 'Runout and Profile Tolerances',
          explanation: 'Circular runout checks individual cross-sections as the part rotates about a datum axis. Total runout checks the entire surface at once. Profile of a surface is the most versatile GD&T tolerance, controlling form, orientation, size, and location simultaneously.',
          hint: 'Think of runout as what a dial indicator reads when you spin the part.',
        },
        {
          id: 'u9-L2-Q11',
          type: 'multiple-choice',
          question: 'What is the difference between circular runout and total runout?',
          options: [
            'Circular runout applies to round features and total runout to flat features',
            'Circular runout measures individual cross-sections as the part rotates; total runout checks the entire surface at once',
            'Total runout is always twice the circular runout value',
            'They are measured with different instruments but control the same thing'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Circular vs Total Runout</text><rect x="4" y="14" width="34" height="50" rx="2" fill="#58CC02" opacity="0.04" stroke="#58CC02" stroke-width="1"/><text x="21" y="22" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Circular</text><line x1="10" y1="44" x2="32" y2="44" stroke="#3B8700" stroke-width="1.5"/><circle cx="21" cy="44" r="0.5" fill="#3B8700"/><text x="21" y="38" font-size="3" fill="#6B7280" text-anchor="middle">one slice</text><text x="21" y="56" font-size="3" fill="#6B7280" text-anchor="middle">cross-section</text><rect x="42" y="14" width="34" height="50" rx="2" fill="#3B8700" opacity="0.04" stroke="#3B8700" stroke-width="1"/><text x="59" y="22" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Total</text><line x1="48" y1="36" x2="70" y2="36" stroke="#3B8700" stroke-width="0.8"/><line x1="48" y1="40" x2="70" y2="40" stroke="#3B8700" stroke-width="0.8"/><line x1="48" y1="44" x2="70" y2="44" stroke="#3B8700" stroke-width="0.8"/><line x1="48" y1="48" x2="70" y2="48" stroke="#3B8700" stroke-width="0.8"/><line x1="48" y1="52" x2="70" y2="52" stroke="#3B8700" stroke-width="0.8"/><text x="59" y="58" font-size="3" fill="#6B7280" text-anchor="middle">entire surface</text></svg>',
          explanation: 'Circular runout (single arrow symbol) controls the full indicator movement at each individual cross-section. Total runout (double arrow) controls the entire surface simultaneously.',
          distractorExplanations: {
            0: 'This focuses on applies/round, which is not the correct mechanism or principle for this problem.',
            2: 'This "always" claim is too broad; total runout the principle has important exceptions.',
            3: 'This focuses on measured/different, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'One checks cross-section by cross-section; the other checks everything at once.',
        },
        {
          id: 'u9-L2-Q3',
          type: 'multiple-choice',
          question: 'When would you specify a profile of a surface tolerance instead of combining individual form and orientation tolerances?',
          options: [
            'Profile tolerance is only for aesthetic surfaces',
            'When controlling shape, orientation, and location of a complex surface with one callout',
            'Profile is always preferred over any other geometric tolerance',
            'Only when the surface is flat'
          ],
          correctIndex: 1,
          explanation: 'Profile of a surface is the most versatile GD&T tolerance. It controls form, orientation, size, and location simultaneously relative to datums.',
          distractorExplanations: {
            0: 'This is too restrictive; the principle applies more broadly than profile tolerance suggests.',
            2: 'This "always" claim is too broad; profile preferred the principle has important exceptions.',
            3: 'This is too restrictive; the principle applies more broadly than surface suggests.',
          },
          hint: 'Consider complex surfaces where multiple geometric controls would otherwise be needed.',
        },
        {
          id: 'u9-L2-Q29',
          type: 'true-false',
          question: 'Profile of a line and profile of a surface are functionally identical.',
          correctAnswer: false,
          explanation: 'Profile of a line controls at individual cross-sections independently (2D slices). Profile of a surface controls the entire 3D surface at once. Similar to circularity vs. cylindricity.',
          distractorExplanations: {
            0: 'Profile of a line controls at individual cross-sections independently (2D slices).',
          },
          hint: 'Similar to circularity vs. cylindricity: one is 2D, one is 3D.',
        },
        {
          id: 'u9-L2-Q22',
          type: 'multiple-choice',
          question: 'In a composite position tolerance (two rows), what does the lower segment control?',
          options: [
            'Same as upper segment but with a tighter tolerance',
            'Feature-to-feature relationship (FRTZF) within the pattern',
            'Lower segment applies only to the smallest hole',
            'The lower segment overrides the upper segment entirely'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Composite Position</text><rect x="8" y="14" width="64" height="12" rx="1" fill="#58CC02" opacity="0.04" stroke="#3B8700" stroke-width="1.2"/><circle cx="15" cy="20" r="3.5" stroke="#58CC02" stroke-width="0.8" fill="none"/><line x1="15" y1="17" x2="15" y2="23" stroke="#58CC02" stroke-width="0.7"/><line x1="12" y1="20" x2="18" y2="20" stroke="#58CC02" stroke-width="0.7"/><text x="30" y="22" font-size="3.5" fill="#334155">0.5</text><text x="48" y="22" font-size="4" fill="#334155" font-weight="bold">A B C</text><rect x="8" y="26" width="64" height="12" rx="1" fill="#A5E86C" opacity="0.04" stroke="#3B8700" stroke-width="1.2"/><circle cx="15" cy="32" r="3.5" stroke="#58CC02" stroke-width="0.8" fill="none"/><line x1="15" y1="29" x2="15" y2="35" stroke="#58CC02" stroke-width="0.7"/><line x1="12" y1="32" x2="18" y2="32" stroke="#58CC02" stroke-width="0.7"/><text x="30" y="34" font-size="3.5" fill="#334155">0.15</text><text x="48" y="34" font-size="4" fill="#334155" font-weight="bold">A</text><text x="40" y="50" font-size="3.5" fill="#58CC02" text-anchor="middle">Upper: pattern location (PLTZF)</text><text x="40" y="58" font-size="3.5" fill="#A5E86C" text-anchor="middle">Lower: feature-to-feature (FRTZF)</text></svg>',
          explanation: 'Composite position has two levels: the upper segment (PLTZF) locates the entire pattern relative to datums. The lower segment (FRTZF) controls feature-to-feature spacing within the pattern with a tighter tolerance.',
          distractorExplanations: {
            0: 'This focuses on upper/segment, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than lower segment suggests.',
            3: 'This focuses on lower/segment, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Two levels: one for where the whole pattern sits, one for how the holes relate to each other.',
        },
        {
          id: 'u9-L2-Q15',
          type: 'multiple-choice',
          question: 'What is the key difference between concentricity and position (at RFS) for controlling coaxiality?',
          options: [
            'They produce identical results and are fully interchangeable',
            'Concentricity controls the derived median line; position controls the axis directly',
            'Position is less accurate than concentricity',
            'Concentricity can use material condition modifiers but position cannot'
          ],
          correctIndex: 1,
          explanation: 'Concentricity requires establishing the derived median line, which requires many measurement points and complex calculations. Position at RFS is simpler and almost always preferred.',
          distractorExplanations: {
            0: 'This focuses on produce/identical, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on accurate, which is not the correct mechanism or principle for this problem.',
            3: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
          },
          hint: 'One requires median-point analysis (expensive); the other uses axis-based measurement.',
        },
        {
          id: 'u9-L2c-T2',
          type: 'teaching',
          question: 'Projected Tolerance Zones',
          explanation: 'A projected tolerance zone (indicated by circled P) extends from the feature surface into the mating part space. It ensures that a bolt screwed into a tilted tapped hole does not interfere with the mating clearance holes. The projection height is specified in the feature control frame.',
          hint: 'Without a projected tolerance zone, a tilted tapped hole could cause a perfectly good bolt to miss the clearance hole.',
        },
        {
          id: 'u9-L2-Q24',
          type: 'multiple-choice',
          question: 'What is the projected tolerance zone, and when is it used?',
          options: [
            'Zone extending beyond the feature into mating part space',
            'A tolerance zone applied only in projected 2D views',
            'Zone projected onto datum plane for measurement ease',
            'An enlarged tolerance zone used for prototype parts'
          ],
          correctIndex: 0,
          explanation: 'A projected tolerance zone extends from the feature surface into the mating part space for a specified height. It controls where the bolt (not just the hole) ends up.',
          distractorExplanations: {
            1: 'This is too restrictive; the principle applies more broadly than tolerance applied suggests.',
            2: 'This focuses on projected/datum, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on enlarged/tolerance, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'What happens when a bolt in a tilted tapped hole extends into the mating part?',
        },
        {
          id: 'u9-L2-Q4',
          type: 'multiple-choice',
          question: 'Parts are passing CMM inspection for position tolerance but consistently failing during assembly. What is most likely wrong?',
          options: [
            'The parts are defective, the CMM results must be incorrect',
            'The CMM datum setup does not replicate actual assembly datum contacts',
            'Position tolerance is not relevant to assembly',
            'The CMM is measuring in metric but assembly uses imperial'
          ],
          correctIndex: 1,
          explanation: 'This is one of the most common GD&T problems. If the CMM datum setup does not match how the part actually sits in the assembly, the measurement results are misleading.',
          distractorExplanations: {
            0: 'This focuses on parts/defective,, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on position/tolerance, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on measuring/metric, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If inspection says "pass" but reality says "fail," the measurement setup may not match assembly.',
        },
        {
          id: 'u9-L2-Q28',
          type: 'multiple-choice',
          question: 'What is the "zero tolerance at MMC" concept?',
          options: [
            'It means no tolerance is applied',
            'The stated geometric tolerance is zero; all tolerance comes from bonus as features depart from MMC',
            'The feature must be exactly at MMC with zero size variation',
            'Zero tolerance at MMC is not a valid concept'
          ],
          correctIndex: 1,
          explanation: 'With zero positional tolerance at MMC, the feature has no positional tolerance at its MMC size. As it departs from MMC, all geometric tolerance comes from the bonus. This can increase yield by making tolerance proportional to material condition.',
          distractorExplanations: {
            0: 'This focuses on means/applied, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on feature/exactly, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on valid/concept, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If the geometric tolerance is zero at MMC, where does all the tolerance come from?',
        },
        {
          id: 'u9-L2-Q14',
          type: 'true-false',
          question: 'Straightness applied to the axis of a cylindrical feature allows the feature to violate Rule #1.',
          correctAnswer: true,
          explanation: 'This is one of the important exceptions to Rule #1. Axis straightness with a diameter symbol creates a cylindrical tolerance zone for the axis, allowing the part to bow beyond the MMC envelope.',
          distractorExplanations: {
            1: 'This is one of the important exceptions to Rule #1.',
          },
          hint: 'Axis straightness with a diameter creates a virtual condition larger than MMC.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 3a: Datum Basics
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L3',
      title: 'Datum Basics',
      description: 'Datum features vs datums, the 3-2-1 rule, datum reference frame, DOF constraint.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u9-L3-T1',
          type: 'teaching',
          question: 'What Are Datums?',
          explanation: 'A datum is a theoretically perfect reference point, line, or plane derived from a real (imperfect) surface on the part. Datums establish the coordinate system from which you measure everything else. They represent how the part sits in its assembly or fixture.',
          hint: 'The physical surface is called the "datum feature." The perfect geometry derived from it is the "datum."',
        },
        {
          id: 'u9-L3-Q9',
          type: 'true-false',
          question: 'A datum feature and a datum are the same thing.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Feature vs Datum</text><rect x="6" y="18" width="30" height="28" rx="2" fill="#58CC02" opacity="0.06" stroke="#58CC02" stroke-width="1"/><text x="21" y="26" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">Feature</text><path d="M10,38 Q15,34 21,36 Q27,40 32,35" stroke="#3B8700" stroke-width="1.5" fill="none"/><text x="21" y="44" font-size="3" fill="#6B7280" text-anchor="middle">Real, imperfect</text><rect x="44" y="18" width="30" height="28" rx="2" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/><text x="59" y="26" font-size="3.5" fill="#3B8700" text-anchor="middle" font-weight="bold">Datum</text><line x1="48" y1="36" x2="70" y2="36" stroke="#3B8700" stroke-width="1.5"/><text x="59" y="44" font-size="3" fill="#6B7280" text-anchor="middle">Theoretical, perfect</text><text x="40" y="60" font-size="3.5" fill="#6B7280" text-anchor="middle">Feature = physical surface</text><text x="40" y="68" font-size="3.5" fill="#6B7280" text-anchor="middle">Datum = derived ideal geometry</text></svg>',
          explanation: 'A datum feature is the actual physical feature on the part (e.g., a machined surface). A datum is the theoretically perfect geometric element (plane, axis, center point) derived from it.',
          distractorExplanations: {
            0: 'A datum feature is the actual physical feature on the part (e.g., a machined surface).',
          },
          hint: 'One is the real, imperfect feature on the part. The other is the theoretical, perfect geometry.',
        },
        {
          id: 'u9-L3-T2',
          type: 'teaching',
          question: 'The Datum Reference Frame',
          explanation: 'Three mutually perpendicular datum planes form the Datum Reference Frame (DRF). It constrains all 6 degrees of freedom using the 3-2-1 rule: the primary datum contacts 3 points (constrains 3 DOF), the secondary contacts 2 points (2 DOF), and the tertiary contacts 1 point (1 DOF).',
          hint: 'Think of it like placing a block on a table (3 DOF), pushing it against a fence (2 DOF), then against a stop (1 DOF).',
        },
        {
          id: 'u9-L3-Q16',
          type: 'fill-blank',
          question: 'The primary datum plane requires _____ contact points and constrains _____ degrees of freedom.',
          blanks: ['3', '3'],
          wordBank: ['3', '3', '2', '1', '6'],
          explanation: 'Three non-collinear points define a plane. The primary datum constrains 3 DOF: one translation (normal to the plane) and two rotations (tilt in two directions).',
          hint: 'How many non-collinear points define a plane in 3D geometry?',
        },
        {
          id: 'u9-L3-Q7',
          type: 'multiple-choice',
          question: 'How many degrees of freedom does a primary datum plane constrain, and which DOFs are they?',
          options: [
            '1 DOF, only the translation normal to the plane',
            '2 DOF, the two translations within the plane',
            '3 DOF, one translation (normal) and two rotations (tilt)',
            '6 DOF, all degrees of freedom at once'
          ],
          correctIndex: 2,
          explanation: 'A primary datum plane constrains 3 DOF using a minimum of 3 contact points: 1 translation (normal to the surface) and 2 rotations (tilting in two directions).',
          distractorExplanations: {
            0: '1 is one-third of the correct value, from using an incorrect formula or coefficient.',
            1: 'This value results from an incorrect approach; DOF, the two translations within the plane.',
            3: '6 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
          },
          hint: 'Place a block on a table. It cannot move down or tilt, but it can still slide and rotate in the plane.',
        },
        {
          id: 'u9-L3-Q1',
          type: 'multiple-choice',
          question: 'How do you explain the significance of datum precedence (A, B, C order)?',
          options: [
            'It does not matter, datum letters are just labels',
            'Datum precedence determines which surface is constrained first',
            'The order only matters for CMM programming',
            'Primary datum must always be the largest surface'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Precedence 3-2-1</text><rect x="10" y="55" width="60" height="6" rx="1" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.5"/><text x="40" y="60" font-size="3.5" fill="#58CC02" text-anchor="middle" font-weight="bold">A - Primary (3 DOF)</text><rect x="10" y="25" width="6" height="30" rx="1" fill="#A5E86C" opacity="0.15" stroke="#A5E86C" stroke-width="1.2"/><text x="13" y="42" font-size="3" fill="#A5E86C" text-anchor="middle" transform="rotate(-90,13,42)">B (2 DOF)</text><rect x="28" y="25" width="30" height="6" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1"/><text x="43" y="30" font-size="3" fill="#3B8700" text-anchor="middle">C (1 DOF)</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Order matters: A first, then B, C</text></svg>',
          explanation: 'The primary datum constrains 3 DOF and is contacted first. The secondary constrains 2 more DOF, and the tertiary constrains the last 1.',
          distractorExplanations: {
            0: 'This incorrectly denies an effect that is relevant to matter datum and significant in this context.',
            2: 'This is too restrictive; the principle applies more broadly than order matters suggests.',
            3: 'This "always" claim is too broad; primary datum the principle has important exceptions.',
          },
          hint: 'Consider what changes physically when a part contacts each datum in order.',
        },
        {
          id: 'u9-L3-MP1',
          type: 'match-pairs',
          question: 'Match each datum level to the DOF it constrains:',
          options: ['Primary datum plane', 'Secondary datum plane', 'Tertiary datum plane', 'Primary cylindrical datum'],
          matchTargets: ['3 DOF (1 trans + 2 rot)', '2 DOF (1 trans + 1 rot)', '1 DOF (1 trans or 1 rot)', '4 DOF (2 trans + 2 rot)'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'A primary plane constrains 3 DOF. Secondary plane adds 2 DOF. Tertiary adds 1 DOF. A primary cylinder constrains 4 DOF because it centers in two directions and prevents two rotations.',
        },
        {
          id: 'u9-L3-Q2',
          type: 'multiple-choice',
          question: 'When selecting datum features for a machined part, which principle should guide the selection?',
          options: [
            'Always select the smallest features as datums',
            'Select functional surfaces that represent how the part mounts in assembly',
            'Always use three mutually perpendicular flat surfaces only',
            'Select features with the tightest tolerances as datums'
          ],
          correctIndex: 1,
          explanation: 'Datum selection should follow the functional principle: datums should represent the surfaces that locate and constrain the part in its assembly.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; select smallest the principle has important exceptions.',
            2: 'This "always" claim is too broad; three mutually the principle has important exceptions.',
            3: 'This focuses on features/tightest, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Datums should mirror how the part is located in its real-world use.',
        },
        {
          id: 'u9-L3-Q19',
          type: 'true-false',
          question: 'The order in which datums appear in the feature control frame (left to right) defines their precedence.',
          correctAnswer: true,
          explanation: 'In the feature control frame, datum references are read left to right with decreasing precedence. The first datum compartment (leftmost) is primary.',
          distractorExplanations: {
            1: 'In the feature control frame, datum references are read left to right with decreasing precedence.',
          },
          hint: 'The feature control frame reads left to right: primary, secondary, tertiary.',
        },
        {
          id: 'u9-L3-Q22',
          type: 'fill-blank',
          question: 'The 3-2-1 principle states that a complete datum reference frame requires _____ total contact points.',
          blanks: ['6'],
          wordBank: ['6', '3', '9', '5', '4'],
          explanation: 'The 3-2-1 rule: 3 points for the primary datum plane, 2 for the secondary, 1 for the tertiary. Total = 3 + 2 + 1 = 6 contact points constraining all 6 degrees of freedom.',
          hint: 'Add up: 3 + 2 + 1 = ?',
        },
        {
          id: 'u9-L3-Q10',
          type: 'multiple-choice',
          question: 'What is a datum simulator, and why is it important?',
          options: [
            'A computer program that calculates datums from CMM data',
            'Physical equipment (surface plate, gauge pin, chuck) that embodies the theoretical datums',
            'A software tool for designing datum reference frames in CAD',
            'An alternate name for the datum feature itself'
          ],
          correctIndex: 1,
          explanation: 'Datum simulators are the physical embodiment of the theoretical datums. A surface plate simulates a datum plane. An expanding mandrel simulates a datum axis.',
          distractorExplanations: {
            0: 'This focuses on computer/program, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on software/designing, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on alternate/datum, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'How does a surface plate establish a datum plane in practice?',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 3b: Datum Targets & Applications
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L3b',
      title: 'Datum Targets & Applications',
      description: 'Datum targets, datum shift at MMC, common datums, flexible part inspection.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u9-L3b-T1',
          type: 'teaching',
          question: 'Datum Targets',
          explanation: 'Datum targets specify discrete points, lines, or areas on a surface that establish the datum. They are essential for cast, forged, or sheet metal parts where the entire surface is too rough or warped for reliable full-surface contact. Designated as A1, A2, A3 for three points on datum A.',
          hint: 'Try this now: imagine a cast engine block. The bottom surface is rough and wavy. Three datum target points give repeatable contact.',
        },
        {
          id: 'u9-L3-Q3',
          type: 'multiple-choice',
          question: 'The part rocks on the CMM granite surface plate. What is the problem, and what GD&T tool solves it?',
          options: [
            'The CMM granite is not flat enough',
            'The rough cast surface is unreliable as a full-surface datum; use datum targets',
            'The part needs to be ground flat before inspection',
            'Apply a flatness tolerance to datum A'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Datum Targets</text><line x1="10" y1="50" x2="70" y2="50" stroke="#3B8700" stroke-width="1.5"/><path d="M20,50 Q30,44 40,50 Q50,44 60,50" stroke="#EC4899" stroke-width="1.5" fill="none"/><g><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/><text x="25" y="58" font-size="6" fill="#58CC02" text-anchor="middle">+</text><text x="40" y="58" font-size="6" fill="#58CC02" text-anchor="middle">+</text><text x="55" y="58" font-size="6" fill="#58CC02" text-anchor="middle">+</text></g><text x="25" y="66" font-size="3" fill="#334155" text-anchor="middle">A1</text><text x="40" y="66" font-size="3" fill="#334155" text-anchor="middle">A2</text><text x="55" y="66" font-size="3" fill="#334155" text-anchor="middle">A3</text><text x="40" y="76" font-size="3.5" fill="#6B7280" text-anchor="middle">Specific contact points on rough surface</text></svg>',
          explanation: 'Datum targets specify discrete contact locations. They are essential for cast, forged, or sheet metal parts where the entire surface is rough or warped.',
          distractorExplanations: {
            0: 'This focuses on granite/enough, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on needs/ground, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on apply/flatness, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If the whole surface cannot make reliable contact, how do you establish a repeatable datum?',
        },
        {
          id: 'u9-L3-Q28',
          type: 'fill-blank',
          question: 'Specific points, lines, or areas used to establish a datum from an irregular or rough surface are called datum _____.',
          blanks: ['targets'],
          wordBank: ['targets', 'features', 'references', 'simulators', 'indicators'],
          explanation: 'Datum targets are designated contact locations on a datum feature. They ensure repeatable contact on rough or irregular surfaces.',
          hint: 'These are designated contact points or areas on rough surfaces.',
        },
        {
          id: 'u9-L3-Q4',
          type: 'multiple-choice',
          question: 'A cylindrical feature is used as both the primary and secondary datum. The flat face is primary (A), the bore is secondary (B). What does the bore constrain?',
          options: [
            '3 DOF (one translation plus two rotations)',
            '2 DOF (two translations perpendicular to bore axis)',
            '1 DOF (rotation about the bore axis only)',
            '4 DOF (all but axial translation and rotation)'
          ],
          correctIndex: 1,
          explanation: 'When a cylindrical bore is the secondary datum (after a planar primary datum constrains 3 DOF), the bore constrains 2 additional DOF: two translations perpendicular to the bore axis.',
          distractorExplanations: {
            0: 'This value results from an incorrect approach; DOF (one translation plus two rotations).',
            2: '1 is approximately half the correct answer, likely from omitting a required factor of 2.',
            3: '4 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
          },
          hint: 'The primary plane already constrains 3 DOF. What does the bore add?',
        },
        {
          id: 'u9-L3-Q17',
          type: 'multiple-choice',
          question: 'What is the physical implication of MMC on datum B (a bore)?',
          options: [
            'Datum axis established at the MMC size of the bore',
            'Datum simulator is a fixed pin at virtual condition; when bore departs from MMC, it can shift',
            'Tolerance only applies when the bore is at MMC size',
            'Bore must be produced at exactly MMC to be a datum'
          ],
          correctIndex: 1,
          explanation: 'When a datum feature of size is referenced at MMC, the datum simulator is fixed at the datum\'s virtual condition boundary. When the actual bore is larger than VC, the part can shift on the fixed pin.',
          distractorExplanations: {
            0: 'This focuses on established, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than tolerance applies suggests.',
            3: 'This focuses on produced/exactly, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If the datum bore is bigger than the fixed simulator pin, what happens?',
        },
        {
          id: 'u9-L3-SB1',
          type: 'sort-buckets',
          question: 'Sort each datum feature type by its typical use case:',
          options: ['Full-surface datum', 'Datum target points', 'Datum target areas', 'Common datum (A-A)', 'MMC datum modifier', 'RFS datum modifier'],
          buckets: ['Machined parts', 'Cast/rough parts', 'Advanced features'],
          correctBuckets: [0, 1, 1, 2, 2, 2],
          explanation: 'Full-surface datums work on well-machined parts. Datum targets are for cast or rough surfaces. Common datums, MMC modifiers, and RFS modifiers are advanced features for special situations.',
        },
        {
          id: 'u9-L3b-T2',
          type: 'teaching',
          question: 'Datum Shift and MMC Datums',
          explanation: 'When a datum feature of size (like a bore) is referenced at MMC, the datum simulator is a fixed-size pin at virtual condition. If the actual bore is larger than the pin, the part can "shift" on it. This datum shift provides additional manufacturing flexibility.',
          hint: 'Datum shift is free tolerance that comes from oversized datum features. It is similar to bonus tolerance but applies to the datum reference.',
        },
        {
          id: 'u9-L3-Q14',
          type: 'multiple-choice',
          question: 'A part has two coaxial bores that together serve as a single datum axis. How is this indicated on the drawing?',
          options: [
            'Assign different datum letters to each bore (A and B)',
            'Assign the same datum letter to both bores (A-A) for a shared axis',
            'Only use one bore as the datum and ignore the other',
            'Use a datum target on each bore for independent references'
          ],
          correctIndex: 1,
          explanation: 'When two or more features together establish a single datum, they are designated as a common datum using the same letter (A-A notation).',
          distractorExplanations: {
            0: 'This focuses on different/letters, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than datum ignore suggests.',
            3: 'This focuses on target/independent, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If two bores share the same axis, can they be combined into one datum?',
        },
        {
          id: 'u9-L3-Q20',
          type: 'multiple-choice',
          question: 'What is the difference between a datum axis established from a bore at RFS vs. MMC?',
          options: [
            'There is no difference',
            'At RFS, the datum simulator expands to fit the actual bore (no shift). At MMC, it is fixed (shift allowed).',
            'RFS gives larger datum shift than MMC',
            'MMC requires a different bore than RFS'
          ],
          correctIndex: 1,
          explanation: 'At RFS, the datum simulator is variable-size (e.g., expanding mandrel) that conforms to the actual bore, producing a unique datum axis with no play. At MMC, the simulator is fixed, allowing datum shift.',
          distractorExplanations: {
            0: 'This focuses on there/difference, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on gives/larger, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on requires/different, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Does the datum pin expand to fit the hole (RFS) or stay fixed (MMC)?',
        },
        {
          id: 'u9-L3-Q25',
          type: 'true-false',
          question: 'A datum feature with a flatness tolerance of 0.1 mm establishes a datum plane that also has 0.1 mm of form error.',
          correctAnswer: false,
          explanation: 'The datum feature (the real surface) may have up to 0.1 mm of flatness error. But the datum (the theoretical plane) derived from it is always a perfect, infinite plane.',
          distractorExplanations: {
            0: 'The datum feature (the real surface) may have up to 0.1 mm of flatness error.',
          },
          hint: 'Is the datum the real surface or the theoretical plane derived from it?',
        },
        {
          id: 'u9-L3-Q30',
          type: 'true-false',
          question: 'When a feature control frame references only one datum, the measurement is fully constrained in all 6 degrees of freedom.',
          correctAnswer: false,
          explanation: 'A single planar datum constrains only 3 DOF. The remaining 3 DOF are unconstrained. This is sometimes sufficient (e.g., for flatness or perpendicularity).',
          distractorExplanations: {
            0: 'A single planar datum constrains only 3 DOF.',
          },
          hint: 'If datum A constrains 3 DOF, what about the other 3?',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 3c: Datum Systems in Practice
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L3c',
      title: 'Datum Systems in Practice',
      description: 'Fixture alignment, flange datums, cones, patterns, simultaneous requirement.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u9-L3c-T1',
          type: 'teaching',
          question: 'Datums in Manufacturing',
          explanation: 'The manufacturing fixture must simulate the drawing\'s datum reference frame. If the machining fixture locates differently than the inspection fixture, parts may pass inspection but fail assembly. This is one of the most common causes of GD&T-related production problems.',
          hint: 'Always ask: does the fixture hold the part the same way the drawing says the datums are established?',
        },
        {
          id: 'u9-L3-Q5',
          type: 'multiple-choice',
          question: 'Manufacturing fixture uses different locating surfaces than the drawing datums. Why does this cause failures?',
          options: [
            'The machinist should just adjust the CNC offsets',
            'Fixture locating surfaces must simulate the drawing\'s datum features',
            'Drawing datums are just for inspection, manufacturing can use whatever works',
            'The inspector should re-datum to match the machining fixture'
          ],
          correctIndex: 1,
          explanation: 'The manufacturing fixture should replicate the datum reference frame as closely as possible. A mismatch means parts are made to one coordinate system and measured to another.',
          distractorExplanations: {
            0: 'This focuses on machinist/should, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on drawing/datums, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on inspector/should, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If the part is made using one coordinate system but inspected using another, what happens?',
        },
        {
          id: 'u9-L3-Q26',
          type: 'multiple-choice',
          question: 'What datums would typically be specified for a circular flange with a central bore and 4 bolt holes?',
          options: [
            'Only the flange face',
            'Flange face primary (A), bore secondary (B), one hole clocks tertiary (C)',
            'Two of the four holes serve as datums A and B',
            'Outer diameter of the flange as the only datum'
          ],
          correctIndex: 1,
          explanation: 'For a circular bolt pattern on a flange: A = face (sits on mating surface), B = bore (centers the part), C = one bolt hole (clocks the rotational orientation).',
          distractorExplanations: {
            0: 'This is too restrictive; the principle applies more broadly than flange suggests.',
            2: 'This focuses on holes/serve, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on outer/diameter, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The flange sits on a face, centers on a bore, and clocks with a hole.',
        },
        {
          id: 'u9-L3-OS1',
          type: 'order-steps',
          question: 'Put these steps in order for establishing a datum reference frame on a CMM:',
          steps: ['Level the part on the primary datum (A)', 'Align to the secondary datum (B)', 'Set origin at the tertiary datum (C)', 'Measure controlled features'],
          correctOrder: [0, 1, 2, 3],
          explanation: 'CMM alignment follows the same 3-2-1 precedence: level on primary first (3 DOF), then align to secondary (2 DOF), then set origin at tertiary (1 DOF). Only then measure controlled features.',
        },
        {
          id: 'u9-L3-Q23',
          type: 'multiple-choice',
          question: 'A part has a conical (tapered) feature designated as a datum. How does a cone establish a datum?',
          options: [
            'A cone cannot be used as a datum feature',
            'A cone establishes both a datum axis and a datum point (5 DOF)',
            'A cone only establishes a datum plane at its base',
            'A cone establishes two perpendicular datum planes'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Conical Datum</text><path d="M30,58 L40,18 L50,58" stroke="#3B8700" stroke-width="1.5" fill="#58CC02" fill-opacity="0.06"/><line x1="40" y1="14" x2="40" y2="62" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/><circle cx="40" cy="58" r="1.5" fill="#3B8700"/><text x="48" y="42" font-size="3.5" fill="#3B8700">axis</text><text x="48" y="60" font-size="3.5" fill="#3B8700">point</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Cone = axis + point (5 DOF)</text></svg>',
          explanation: 'A conical datum feature is unique because it simultaneously establishes a datum axis and a datum point. It constrains 5 DOF, leaving only rotation about the axis.',
          distractorExplanations: {
            0: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
            2: 'This is too restrictive; the principle applies more broadly than establishes datum suggests.',
            3: 'This focuses on perpendicular/planes, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'A cone has both an axis and a specific axial position (the apex). That is two datums in one.',
        },
        {
          id: 'u9-L3-Q13',
          type: 'true-false',
          question: 'Datum features should always have tighter tolerances than the features they control.',
          correctAnswer: false,
          explanation: 'While datum features should be repeatable and stable, there is no absolute rule requiring them to have tighter tolerances. Repeatability matters most.',
          distractorExplanations: {
            0: 'While datum features should be repeatable and stable, there is no absolute rule requiring them to have tighter tolerances.',
          },
          hint: 'Are datum feature tolerances dictated by the features they control?',
        },
        {
          id: 'u9-L3c-T2',
          type: 'teaching',
          question: 'Simultaneous Requirement',
          explanation: 'The simultaneous requirement (ASME Y14.5-2018) means that if multiple feature control frames reference the same datums in the same order with the same modifiers, they are evaluated as one pattern using a single datum reference frame. This links hole patterns together.',
          hint: 'If two hole patterns reference the same datums at MMC, they share the same datum shift allowance.',
        },
        {
          id: 'u9-L3-Q24',
          type: 'multiple-choice',
          question: 'What is the "simultaneous requirement" for datum features in ASME Y14.5?',
          options: [
            'All datums must be manufactured at the same time',
            'Tolerances sharing the same DRF and modifier are linked and evaluated together',
            'Three datums must be measured simultaneously on CMM',
            'Datum features must all have the same tolerance'
          ],
          correctIndex: 1,
          explanation: 'The simultaneous requirement means feature control frames with the same datum references and material condition modifiers are evaluated as one combined pattern.',
          distractorExplanations: {
            0: 'This focuses on datums/manufactured, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on three/datums, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on datum/features, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If two hole patterns reference the same datums at MMC, are they linked?',
        },
        {
          id: 'u9-L3-Q27',
          type: 'multiple-choice',
          question: 'What happens if the primary datum feature has poor form (significant waviness) and no datum targets are specified?',
          options: [
            'The datum plane follows the wavy surface',
            'The part rocks on the simulator, contacting different high points each time, giving non-repeatable measurements',
            'CMM software automatically corrects for poor form',
            'Poor form on datum feature has no effect'
          ],
          correctIndex: 1,
          explanation: 'When a full-surface primary datum has significant form error and no datum targets are specified, the part can rock on the datum simulator, producing non-repeatable measurements.',
          distractorExplanations: {
            0: 'This focuses on datum/plane, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on software/automatically, which is not the correct mechanism or principle for this problem.',
            3: 'This incorrectly denies an effect that is relevant to datum feature and significant in this context.',
          },
          hint: 'If the part rocks on the surface plate, does it sit the same way every time?',
        },
        {
          id: 'u9-L3-Q29',
          type: 'multiple-choice',
          question: 'A complex assembly uses a pattern of holes as a datum feature. How is the datum established?',
          options: [
            'One hole is arbitrarily selected as the datum',
            'The datum is established from the best-fit of all the holes in the pattern',
            'Each hole establishes a separate datum axis',
            'A pattern cannot serve as a datum'
          ],
          correctIndex: 1,
          explanation: 'ASME Y14.5 allows patterns of features to serve as datum features. The datum is established from the best-fit alignment of all the features in the pattern.',
          distractorExplanations: {
            0: 'This focuses on arbitrarily/selected, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on establishes/separate, which is not the correct mechanism or principle for this problem.',
            3: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
          },
          hint: 'If no single feature is sufficient, can a group of features work together?',
        },
        {
          id: 'u9-L3-Q18',
          type: 'multiple-choice',
          question: 'How should datums be specified for a flexible sheet metal part to ensure repeatable measurement?',
          options: [
            'Use standard full-surface datums',
            'Use datum targets with clamping that replicates the assembly condition',
            'Sheet metal parts do not need datum references',
            'Use only one datum point to minimize deformation'
          ],
          correctIndex: 1,
          explanation: 'Flexible parts require special datum treatment per ASME Y14.5. The drawing should specify whether the part is inspected in the free state or restrained state, with datum targets and clamps replicating assembly.',
          distractorExplanations: {
            0: 'This focuses on standard/full-surface, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on sheet/metal, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than datum point suggests.',
          },
          hint: 'If the part changes shape depending on how you hold it, how do you get consistent measurements?',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 4a: Stack-Up Basics
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L4',
      title: 'Stack-Up Basics',
      description: 'Worst-case analysis, dimension chains, positive/negative contributors, gap analysis.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u9-L4-T1',
          type: 'teaching',
          question: 'What Is Tolerance Stack-Up?',
          explanation: 'When multiple parts assemble together, their individual tolerances accumulate. A tolerance stack-up analysis predicts the total variation at a critical gap or clearance. If 5 parts each have +/-0.1 mm, the worst case total is +/-0.5 mm, which might be too much.',
          hint: 'Always identify the critical gap first, then trace the chain of dimensions that contribute to it.',
        },
        {
          id: 'u9-L4-Q3',
          type: 'true-false',
          question: 'In a 1D tolerance chain, if a dimension contributes positively to the gap, it is called an "increasing" contributor.',
          correctAnswer: true,
          explanation: 'In 1D chain analysis, each dimension is classified as either an "increasing" contributor (gap increases as dimension increases) or a "decreasing" contributor.',
          distractorExplanations: {
            1: 'In 1D chain analysis, each dimension is classified as either an .',
          },
          hint: 'Consider the direction each dimension pushes the gap.',
        },
        {
          id: 'u9-L4-Q1',
          type: 'multiple-choice',
          question: 'Three parts A (20 +/-0.1), B (15 +/-0.1), and C (25 +/-0.1) are stacked with 2 walls (+/-0.1 each). Using worst-case analysis, what is the total stack-up tolerance?',
          options: [
            '+/-0.22 mm',
            '+/-0.50 mm',
            '+/-0.10 mm',
            '+/-1.00 mm'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <text x="40" y="8" font-size="5" fill="#334155" text-anchor="middle" font-weight="bold">3-Part Tolerance Stack-Up</text> <rect x="4" y="22" width="4" height="30" rx="1" fill="#3B8700" opacity="0.3"/> <rect x="8" y="24" width="18" height="26" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1.2"/> <text x="17" y="40" font-size="5" fill="#334155" text-anchor="middle">A</text> <rect x="28" y="24" width="18" height="26" rx="1" fill="#A5E86C" opacity="0.12" stroke="#3B8700" stroke-width="1.2"/> <text x="37" y="40" font-size="5" fill="#334155" text-anchor="middle">B</text> <rect x="48" y="24" width="18" height="26" rx="1" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1.2"/> <text x="57" y="40" font-size="5" fill="#334155" text-anchor="middle">C</text> <rect x="68" y="22" width="4" height="30" rx="1" fill="#3B8700" opacity="0.3"/> <text x="67" y="20" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Gap</text> <text x="40" y="78" font-size="4" fill="#334155" text-anchor="middle">Total = 60 +0.5 (worst-case)</text> </svg>',
          explanation: 'Worst-case stack-up simply adds all tolerances: total = +/-(0.1 + 0.1 + 0.1 + 0.1 + 0.1) = +/-0.50 mm.',
          distractorExplanations: {
            0: 'Worst-case stack-up simply adds all tolerances: total = +/-(0.1 + 0.1 + 0.1 + 0.1 + 0.1) = +/-0.50 mm.',
            2: 'Worst-case stack-up simply adds all tolerances: total = +/-(0.1 + 0.1 + 0.1 + 0.1 + 0.1) = +/-0.50 mm.',
            3: 'Worst-case stack-up simply adds all tolerances: total = +/-(0.1 + 0.1 + 0.1 + 0.1 + 0.1) = +/-0.50 mm.',
          },
          hint: 'Worst-case = simple sum of all individual tolerances.',
        },
        {
          id: 'u9-L4-T2',
          type: 'teaching',
          question: 'Worst-Case vs RSS Analysis',
          explanation: 'Worst-case analysis adds all tolerances directly, guaranteeing 100% of assemblies will work. RSS (Root Sum Square) uses statistics, predicting about 99.73% success. RSS gives smaller, cheaper tolerances but accepts a tiny risk. Use worst-case for safety-critical applications.',
          hint: 'RSS formula: total = square root of (t1 squared + t2 squared + ... + tn squared).',
        },
        {
          id: 'u9-L4-Q14',
          type: 'fill-blank',
          question: 'In a _____ tolerance analysis, the total assembly tolerance equals the arithmetic _____ of all individual tolerances.',
          blanks: ['worst-case', 'sum'],
          wordBank: ['worst-case', 'sum', 'statistical', 'product', 'Monte Carlo', 'average'],
          explanation: 'Worst-case analysis assumes all dimensions are simultaneously at their most unfavorable limits. The total tolerance is the arithmetic sum.',
          hint: 'The simplest method: just add up all the individual tolerances.',
        },
        {
          id: 'u9-L4-Q7',
          type: 'multiple-choice',
          question: 'In a tolerance stack-up, what is the first step before performing any calculations?',
          options: [
            'Select analysis method (worst-case or RSS)',
            'Identify the critical assembly gap or clearance, then trace the dimension chain',
            'Assign tolerances to all contributing dimensions',
            'Build a prototype and measure it'
          ],
          correctIndex: 1,
          explanation: 'The first step is to define the assembly requirement (what gap must be controlled) and trace the complete dimension chain from one side to the other.',
          distractorExplanations: {
            0: 'This focuses on select/analysis, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on assign/tolerances, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on build/prototype, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Before you can calculate anything, you need to know what you are analyzing.',
        },
        {
          id: 'u9-L4-OS1',
          type: 'order-steps',
          question: 'Put these tolerance stack-up analysis steps in order:',
          steps: ['Identify the critical gap or clearance', 'Trace the dimension chain and assign signs', 'Calculate nominal gap', 'Sum tolerances (WCA or RSS)', 'Check if gap meets requirement'],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Start by defining what you are checking, then trace the chain, calculate the nominal gap, sum the tolerances, and verify the result meets the requirement.',
        },
        {
          id: 'u9-L4-Q25',
          type: 'multiple-choice',
          question: 'How do you determine whether a dimension is a "positive" or "negative" contributor?',
          options: [
            'Positive dimensions are always the larger ones',
            'Trace a continuous path: dimensions in the direction of the gap are positive, opposite are negative',
            'All dimensions from the first part are positive',
            'Positive and negative assignment is arbitrary'
          ],
          correctIndex: 1,
          explanation: 'The sign convention follows from the dimension loop: start at one surface defining the gap, trace through each contributing dimension to the other surface. Direction determines sign.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; positive dimensions the principle has important exceptions.',
            2: 'This focuses on first/positive, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on positive/assignment, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Increase each dimension mentally and see if the gap gets bigger (+) or smaller (-).',
        },
        {
          id: 'u9-L4-Q2',
          type: 'multiple-choice',
          question: 'When would you insist on worst-case analysis even though RSS gives a smaller (cheaper) tolerance?',
          options: [
            'Always use RSS, worst-case is obsolete',
            'When production volumes are very high',
            'When the consequence of failure is severe (safety-critical, medical devices)',
            'Only when the customer specifically requests it'
          ],
          correctIndex: 2,
          explanation: 'RSS assumes normal distributions and statistical independence, predicting ~99.73% success. For safety-critical applications, even a 0.27% failure rate is unacceptable.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; worst-case obsolete the principle has important exceptions.',
            1: 'This focuses on production/volumes, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than customer specifically suggests.',
          },
          hint: 'Consider when even a 0.27% failure rate (2700 ppm) is too risky.',
        },
        {
          id: 'u9-L4-Q8',
          type: 'multiple-choice',
          question: 'Part A is 25 +/-0.1, Part B is 30 +/-0.15, Housing is 56 +/-t. The gap must be at least 0.5 mm. Using worst-case, what is the max allowable housing tolerance t?',
          options: [
            '+/-0.10 mm',
            '+/-0.50 mm',
            '+/-0.15 mm',
            '+/-0.25 mm'
          ],
          correctIndex: 3,
          explanation: 'Nominal gap = 56.0 - 25.0 - 30.0 = 1.0 mm. Min gap = 1.0 - (0.1 + 0.15 + t) >= 0.5. So t <= 0.25 mm.',
          distractorExplanations: {
            0: 'Nominal gap = 56.0 - 25.0 - 30.0 = 1.0 mm.',
            1: 'Nominal gap = 56.0 - 25.0 - 30.0 = 1.0 mm.',
            2: 'Nominal gap = 56.0 - 25.0 - 30.0 = 1.0 mm.',
          },
          hint: 'Set up the equation: nominal gap - sum of all tolerances >= minimum required gap.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 4b: RSS & Monte Carlo
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L4b',
      title: 'RSS & Monte Carlo',
      description: 'RSS calculations, Monte Carlo simulation, Cpk, sensitivity factors, modified RSS.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u9-L4b-T1',
          type: 'teaching',
          question: 'RSS Analysis',
          explanation: 'The RSS (Root Sum Square) method assumes individual dimensions follow normal distributions and are statistically independent. Instead of adding tolerances directly, you square each, add the squares, then take the square root. This gives a smaller total, predicting 99.73% of assemblies will fit.',
          hint: 'RSS = sqrt(t1^2 + t2^2 + ... + tn^2). For 5 equal tolerances of +/-0.1: RSS = sqrt(5 x 0.01) = +/-0.22, versus WCA = +/-0.50.',
        },
        {
          id: 'u9-L4-Q10',
          type: 'true-false',
          question: 'RSS tolerance analysis assumes that all individual dimension variations follow a normal distribution and are statistically independent.',
          correctAnswer: true,
          explanation: 'The standard RSS method assumes: each dimension follows a normal distribution, and the dimensions are statistically independent (no correlation between them).',
          distractorExplanations: {
            1: 'The standard RSS method assumes: each dimension follows a normal distribution, and the dimensions are statistically independent (no corre...',
          },
          hint: 'RSS is based on the central limit theorem and independence assumption.',
        },
        {
          id: 'u9-L4-Q11',
          type: 'multiple-choice',
          question: 'Using RSS, calculate the total stack-up tolerance for a chain of 4 dimensions: +/-0.1, +/-0.2, +/-0.1, +/-0.15 mm.',
          options: [
            '+/-0.55 mm (worst-case)',
            '+/-0.28 mm',
            '+/-0.14 mm',
            '+/-0.40 mm'
          ],
          correctIndex: 1,
          explanation: 'RSS = sqrt(0.01 + 0.04 + 0.01 + 0.0225) = sqrt(0.0825) = +/-0.287, approx +/-0.28 mm. Compare to worst-case: +/-0.55 mm.',
          distractorExplanations: {
            0: 'Regarding worst-case: RSS = sqrt(0.01 + 0.04 + 0.01 + 0.0225) = sqrt(0.0825) = +/-0.287, approx +/-0.28 mm.',
            2: 'RSS = sqrt(0.01 + 0.04 + 0.01 + 0.0225) = sqrt(0.0825) = +/-0.287, approx +/-0.28 mm.',
            3: 'RSS = sqrt(0.01 + 0.04 + 0.01 + 0.0225) = sqrt(0.0825) = +/-0.287, approx +/-0.28 mm.',
          },
          hint: 'RSS = square root of (sum of each tolerance squared).',
        },
        {
          id: 'u9-L4-Q6',
          type: 'fill-blank',
          question: 'The statistical tolerance analysis method that computes the total tolerance as the square root of the sum of squared individual tolerances is called _____.',
          blanks: ['RSS'],
          wordBank: ['RSS', 'WCA', 'RMS', 'GD&T', 'FMEA'],
          explanation: 'The RSS (Root Sum Square) method assumes individual dimensions follow normal distributions. It predicts the assembly variation at approximately 3-sigma (99.73%).',
          hint: 'This method uses the Pythagorean-like combination of tolerances.',
        },
        {
          id: 'u9-L4-Q9',
          type: 'multiple-choice',
          question: 'What is Monte Carlo simulation in tolerance analysis, and when is it preferred over RSS?',
          options: [
            'A manufacturing method that uses random sampling',
            'A computational method that generates thousands of random assemblies based on statistical distributions',
            'A casino-based method that randomly accepts or rejects parts',
            'A simplified version of worst-case analysis'
          ],
          correctIndex: 1,
          explanation: 'Monte Carlo simulation randomly samples each dimension from its statistical distribution, calculates the assembly result, and repeats thousands of times. It is preferred when distributions are non-normal or dimensions are correlated.',
          distractorExplanations: {
            0: 'This focuses on manufacturing/sampling, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on casino-based/randomly, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on simplified/version, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Instead of formulas, this method simulates millions of assemblies on a computer.',
        },
        {
          id: 'u9-L4b-T2',
          type: 'teaching',
          question: 'Process Capability (Cpk)',
          explanation: 'Cpk measures how well a manufacturing process is centered within its tolerance band. Cpk = 1.0 means the process uses 100% of the band. Cpk = 1.33 uses 75% (good). Cpk = 1.67 uses 60% (excellent). Higher Cpk means fewer defective parts.',
          hint: 'A process with Cpk = 1.33 produces about 63 defective parts per million. At Cpk = 2.0, it drops to about 2 per billion.',
        },
        {
          id: 'u9-L4-Q21',
          type: 'fill-blank',
          question: 'A process capability index (Cpk) of 1.33 indicates that the process variation uses approximately _____% of the tolerance band.',
          blanks: ['75'],
          wordBank: ['75', '50', '100', '60', '90'],
          explanation: 'Cpk = 1.33 means the process spread (6 sigma) occupies 75% of the tolerance band. This corresponds to approximately 63 parts per million defect rate.',
          hint: 'At Cpk = 1.0, the process uses 100% of the band. At 1.33, what fraction?',
        },
        {
          id: 'u9-L4-Q13',
          type: 'multiple-choice',
          question: 'What is the Cpk (process capability index), and how does it relate to tolerance analysis?',
          options: [
            'Cpk is the tolerance divided by the part size',
            'Cpk measures how well a manufacturing process is centered within its tolerance band',
            'Cpk is only relevant to quality control, not to design',
            'Cpk must always equal exactly 1.0 for a capable process'
          ],
          correctIndex: 1,
          explanation: 'Cpk = min[(USL minus mean)/(3 sigma), (mean minus LSL)/(3 sigma)]. It captures both the spread and centering of the process within the tolerance band.',
          distractorExplanations: {
            0: 'This focuses on divided, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than relevant quality suggests.',
            3: 'This "always" claim is too broad; equal exactly the principle has important exceptions.',
          },
          hint: 'This index tells you how much of the tolerance band is actually being used.',
        },
        {
          id: 'u9-L4-Q18',
          type: 'multiple-choice',
          question: 'What is the "modified RSS" or "RSS with safety factor" method?',
          options: [
            'RSS applied only to the largest tolerances',
            'An RSS calculation multiplied by a correction factor (typically 1.2 to 1.5) to account for non-ideal conditions',
            'RSS applied only to the smallest tolerances',
            'A method that uses RSS for some dimensions and worst-case for others'
          ],
          correctIndex: 1,
          explanation: 'Modified RSS multiplies the standard RSS result by a safety factor (k = 1.2 to 1.5) to account for non-normal distributions, process shifts, and other real-world deviations.',
          distractorExplanations: {
            0: 'This is too restrictive; the principle applies more broadly than applied largest suggests.',
            2: 'This is too restrictive; the principle applies more broadly than applied smallest suggests.',
            3: 'This focuses on method/dimensions, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'RSS may be too optimistic, and worst-case too pessimistic. This splits the difference.',
        },
        {
          id: 'u9-L4-Q26',
          type: 'multiple-choice',
          question: 'As the number of contributors increases, what happens to the benefit of RSS vs worst-case?',
          options: [
            'The benefit is constant regardless of count',
            'As contributors increase, RSS grows as sqrt(n) while WCA grows as n, so the savings increase dramatically',
            'RSS is better only for chains with fewer than 3 contributors',
            'More contributors always favor worst-case'
          ],
          correctIndex: 1,
          explanation: 'For n equal tolerances (+/-t each): WCA = n x t, RSS = sqrt(n) x t. The RSS/WCA ratio = 1/sqrt(n). For n = 4, RSS is 50% of WCA. For n = 25, RSS is only 20% of WCA.',
          distractorExplanations: {
            0: 'The outcome does depend on the factor this option dismisses (benefit constant).',
            2: 'This is too restrictive; the principle applies more broadly than better chains suggests.',
            3: 'This "always" claim is too broad; contributors favor the principle has important exceptions.',
          },
          hint: 'Compare how n (worst-case) grows versus sqrt(n) (RSS).',
        },
        {
          id: 'u9-L4-Q27',
          type: 'true-false',
          question: 'RSS tolerance analysis is appropriate for assemblies consisting of only 2-3 parts with 2-3 contributing dimensions.',
          correctAnswer: false,
          explanation: 'RSS is based on the central limit theorem, which works best with many independent contributors. With only 2-3 contributors, the statistical assumptions are weak.',
          distractorExplanations: {
            0: 'RSS is based on the central limit theorem, which works best with many independent contributors.',
          },
          hint: 'Does the central limit theorem work well with only 2-3 samples?',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 4c: Stack-Up Solutions
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L4c',
      title: 'Stack-Up Solutions',
      description: 'Tolerance allocation, selective assembly, shims, 2D effects, GD&T in stack-ups.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u9-L4c-T1',
          type: 'teaching',
          question: 'Fixing a Stack-Up Problem',
          explanation: 'When analysis shows the gap can go negative, you have several options: tighten selected tolerances (costly), add a shim or adjustable feature, use selective assembly (sort parts into size groups), redesign to reduce contributors, or accept RSS risk if appropriate.',
          hint: 'Shims are the cheapest fix when the stack-up is already designed. Reducing the number of parts in the chain is the best long-term fix.',
        },
        {
          id: 'u9-L4-Q5',
          type: 'multiple-choice',
          question: 'When allocating tolerances to multiple dimensions in a stack-up, what approach optimizes cost?',
          options: [
            'Assign equal tolerance to every dimension',
            'Assign tighter tolerances to dimensions that are easier/cheaper to control',
            'Always use the tightest tolerance possible everywhere',
            'Use only RSS analysis and ignore worst-case'
          ],
          correctIndex: 1,
          explanation: 'Cost-optimized tolerance allocation assigns tighter tolerances to dimensions that are inexpensive to control (e.g., turned diameters, features in the same CNC setup).',
          distractorExplanations: {
            0: 'This focuses on equal/tolerance, which is not the correct mechanism or principle for this problem.',
            2: 'This "always" claim is too broad; tightest tolerance the principle has important exceptions.',
            3: 'This is too restrictive; the principle applies more broadly than analysis ignore suggests.',
          },
          hint: 'Tolerance is directly tied to cost. Tight where cheap, loose where costly.',
        },
        {
          id: 'u9-L4-Q29',
          type: 'fill-blank',
          question: 'When tolerance analysis shows the gap can become negative, one low-cost solution is to insert a selectable _____ between parts.',
          blanks: ['shim'],
          wordBank: ['shim', 'gasket', 'washer', 'bushing', 'insert'],
          explanation: 'Shims (or spacers) are thin plates of precise thickness used to fill gaps and absorb tolerance stack-up variation at assembly time.',
          hint: 'This thin insert is selected at assembly time to fill the gap.',
        },
        {
          id: 'u9-L4-Q16',
          type: 'multiple-choice',
          question: 'What is "selective assembly," and when is it used?',
          options: [
            'Selecting the best-looking parts for assembly',
            'Measuring each part and sorting into size groups, then pairing complementary groups for tighter fits',
            'Randomly selecting parts and hoping they fit',
            'Assembling parts in a specific sequence'
          ],
          correctIndex: 1,
          explanation: 'Selective assembly measures each part and classifies it into groups based on actual size. Large shafts are paired with large holes, small with small, achieving tighter fits without tighter tolerances.',
          distractorExplanations: {
            0: 'This focuses on selecting/best-looking, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on randomly/selecting, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on assembling/parts, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If you measure each part and match it with a compatible mate, the effective tolerance shrinks.',
        },
        {
          id: 'u9-L4-SB1',
          type: 'sort-buckets',
          question: 'Sort each corrective action by its type:',
          options: ['Tighten critical tolerances', 'Add a shim spacer', 'Use selective assembly', 'Redesign to fewer parts', 'Accept RSS risk', 'Use adjustable set screw'],
          buckets: ['Reduce variation', 'Absorb variation'],
          correctBuckets: [0, 1, 0, 0, 0, 1],
          explanation: 'Tightening tolerances, selective assembly, redesign, and accepting RSS all reduce the variation entering the stack. Shims and adjustable features absorb whatever variation exists.',
        },
        {
          id: 'u9-L4c-T2',
          type: 'teaching',
          question: 'GD&T in Stack-Ups',
          explanation: 'Geometric tolerances (position, perpendicularity, flatness) contribute to tolerance stack-ups and are often overlooked. A tilted mating surface adds variation to the gap. Always include both dimensional and geometric tolerances in your analysis.',
          hint: 'If a mating surface is not perfectly perpendicular, the gap changes across the width of the part.',
        },
        {
          id: 'u9-L4-Q20',
          type: 'multiple-choice',
          question: 'How does geometric tolerance factor into a tolerance stack-up analysis?',
          options: [
            'Geometric tolerances are never included in stack-ups',
            'Geometric tolerances contribute additional variation and must be included as contributors',
            'Geometric tolerances reduce the stack-up total',
            'They are only included in RSS, not worst-case'
          ],
          correctIndex: 1,
          explanation: 'Geometric tolerances are critical stack-up contributors that are often overlooked. Position, perpendicularity, and flatness all add variation to the assembly.',
          distractorExplanations: {
            0: 'This incorrectly denies an effect that is relevant to geometric tolerances and significant in this context.',
            2: 'This focuses on reduce/stack-up, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than included worst-case suggests.',
          },
          hint: 'If a mating surface is not perfectly perpendicular, does it affect the gap?',
        },
        {
          id: 'u9-L4-Q19',
          type: 'multiple-choice',
          question: 'In a 2D tolerance analysis, what additional complexity arises compared to 1D?',
          options: [
            'There is no additional complexity',
            'Angular dimensions create nonlinear contributions (sine/cosine effects)',
            '2D analysis can only be done with Monte Carlo',
            'The tolerances are doubled in 2D'
          ],
          correctIndex: 1,
          explanation: 'In 2D stack-ups, dimensions at angles to the stack direction contribute through trigonometric functions. A 1-degree angular tolerance can have very different linear effects at different distances from the pivot.',
          distractorExplanations: {
            0: 'This focuses on there/additional, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than analysis monte suggests.',
            3: 'This focuses on tolerances/doubled, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'When dimensions are at angles, they contribute to the gap through sine and cosine.',
        },
        {
          id: 'u9-L4-Q22',
          type: 'multiple-choice',
          question: 'What is the advantage of designing an assembly with an adjustable feature?',
          options: [
            'It eliminates the need for any tolerances',
            'The adjustable feature absorbs the accumulated variation at assembly time',
            'Adjustable features are always cheaper than tightening tolerances',
            'It makes the assembly easier to disassemble'
          ],
          correctIndex: 1,
          explanation: 'An adjustable feature (shim, spacer, set screw, adjustable cam) absorbs the cumulative variation from the tolerance chain at one location. This can dramatically simplify the stack-up.',
          distractorExplanations: {
            0: 'This focuses on eliminates/tolerances, which is not the correct mechanism or principle for this problem.',
            2: 'This "always" claim is too broad; adjustable features the principle has important exceptions.',
            3: 'This focuses on makes/easier, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If you can adjust one dimension at assembly time, the stack-up problem shrinks.',
        },
        {
          id: 'u9-L4-Q23',
          type: 'true-false',
          question: 'In a worst-case stack-up, the probability that all dimensions are at their worst limits is very high for typical production.',
          correctAnswer: false,
          explanation: 'The probability that all dimensions are simultaneously at their worst limits is extremely low. It decreases exponentially with the number of dimensions. That is why RSS is often more realistic.',
          distractorExplanations: {
            0: 'The probability that all dimensions are simultaneously at their worst limits is extremely low.',
          },
          hint: 'If each dimension has a small chance of being at its worst limit, what is the chance they ALL are?',
        },
        {
          id: 'u9-L4-Q30',
          type: 'multiple-choice',
          question: 'What is the "virtual condition boundary" approach to tolerance stack-up?',
          options: [
            'It is a 3D CAD visualization method',
            'Instead of stacking dimensional and geometric tolerances separately, combine each feature into its virtual condition boundary first, then stack those',
            'It ignores geometric tolerances entirely',
            'It is only applicable to position tolerances'
          ],
          correctIndex: 1,
          explanation: 'The virtual condition approach converts each feature into its worst-case boundary (VC = MMC size +/- geometric tolerance) and uses that single boundary in the stack-up. This simplifies the analysis.',
          distractorExplanations: {
            0: 'This focuses on visualization/method, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on ignores/entirely, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than applicable position suggests.',
          },
          hint: 'Instead of tracking size and geometric tolerance separately, combine them into one boundary.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 5a: Surface Roughness
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L5',
      title: 'Surface Roughness',
      description: 'Ra, Rz, Rq, surface lay symbols, process capability, roughness vs function.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u9-L5-T1',
          type: 'teaching',
          question: 'Surface Roughness Basics',
          explanation: 'Every machined surface has tiny peaks and valleys. Ra (arithmetic average roughness) is the most common measurement, averaging the height deviations from the mean line. Rz measures the average peak-to-valley height and better captures extreme features. Lower numbers mean smoother surfaces.',
          hint: 'Ra is a good general indicator, but it can hide deep scratches because it averages everything out.',
        },
        {
          id: 'u9-L5-Q21',
          type: 'true-false',
          question: 'When specifying surface roughness on a drawing, the roughness value always represents the maximum allowable roughness.',
          correctAnswer: true,
          explanation: 'Per ISO 1302 and ASME Y14.36M, the surface roughness value on a drawing is an upper limit by default. The actual surface must have roughness equal to or less than (smoother than) the specified value.',
          distractorExplanations: {
            1: 'Per ISO 1302 and ASME Y14.36M, the surface roughness value on a drawing is an upper limit by default.',
          },
          hint: 'If a drawing says Ra 1.6, can you deliver Ra 0.8? Yes, smoother is always OK.',
        },
        {
          id: 'u9-L5-Q1',
          type: 'multiple-choice',
          question: 'A sealing surface meets the Ra spec but still leaks. What might Ra be missing?',
          options: [
            'Ra is the only relevant parameter',
            'Ra averages out the profile and can hide deep scratches or isolated peaks that create leak paths',
            'The surface is too smooth, increase Ra',
            'Ra was measured in the wrong direction'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="8" font-size="4" fill="#334155" text-anchor="middle" font-weight="bold">Ra Hides Defects</text><path d="M8,40 L16,38 L24,42 L32,36 L36,50 L40,38 L48,42 L56,38 L64,42 L72,40" stroke="#58CC02" stroke-width="1.5" fill="none"/><line x1="8" y1="40" x2="72" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.3"/><circle cx="36" cy="50" r="4" fill="none" stroke="#EC4899" stroke-width="1.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/></circle><text x="36" y="62" font-size="3" fill="#EC4899" text-anchor="middle">deep scratch</text><text x="40" y="72" font-size="3.5" fill="#6B7280" text-anchor="middle">Ra averages out extremes</text></svg>',
          explanation: 'Ra is a statistical average that can mask extreme features. One deep scratch can cause a leak even though the average roughness looks fine. Use Rz or Rmax for sealing surfaces.',
          distractorExplanations: {
            0: 'This is too restrictive; the principle applies more broadly than relevant parameter suggests.',
            2: 'This focuses on surface/smooth,, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on measured/wrong, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Consider what kind of surface feature would allow fluid to leak past a seal.',
        },
        {
          id: 'u9-L5-T2',
          type: 'teaching',
          question: 'Surface Finish Symbols and Lay',
          explanation: 'Drawing callouts specify the maximum allowable roughness (e.g., Ra 1.6 means 1.6 or smoother). The "lay" is the direction of machining marks, shown with symbols like "=" (parallel) or "perpendicular" (perpendicular to the boundary). Lay affects friction, sealing, and wear.',
          hint: 'Each manufacturing process has a typical Ra range: grinding 0.1 to 1.6, turning 0.4 to 6.3, sand casting 12.5 to 25.',
        },
        {
          id: 'u9-L5-Q2',
          type: 'multiple-choice',
          question: 'Which surface roughness parameter is preferred for sealing surfaces?',
          options: [
            'Ra (arithmetic average)',
            'Rz (average maximum height)',
            'Rq (root mean square)',
            'Rsk (skewness)'
          ],
          correctIndex: 1,
          explanation: 'Rz is preferred for sealing surfaces because it captures the extreme peak-to-valley deviations that affect seal contact and leakage paths.',
          distractorExplanations: {
            0: 'This focuses on (arithmetic/average), which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on (root/square), which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on (skewness), which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Seals are affected by the tallest peaks and deepest valleys, not the average.',
        },
        {
          id: 'u9-L5-MP1',
          type: 'match-pairs',
          question: 'Match each roughness parameter to what it measures:',
          options: ['Ra', 'Rz', 'Rq', 'Rsk'],
          matchTargets: ['Arithmetic average of deviations', 'Average peak-to-valley height', 'Root mean square of deviations', 'Asymmetry (peaks vs valleys)'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Ra = average of absolute deviations. Rz = average of max peak-to-valley per sampling length. Rq = RMS (more sensitive to outliers than Ra). Rsk = skewness (positive = more peaks, negative = more valleys).',
        },
        {
          id: 'u9-L5-Q4',
          type: 'multiple-choice',
          question: 'The surface lay symbol perpendicular on a drawing indicates that the surface texture pattern runs:',
          options: [
            'Parallel to the surface boundary line',
            'Perpendicular to the surface boundary line',
            'Multi-directional (no dominant direction)',
            'Circular relative to the center of the surface'
          ],
          correctIndex: 1,
          explanation: 'The lay symbol perpendicular indicates the predominant surface pattern runs perpendicular to the boundary line (the edge of the surface as viewed on the drawing).',
          distractorExplanations: {
            0: 'This focuses on parallel, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on multi-directional/dominant, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on circular/relative, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'This symbol shows the direction of the machining marks relative to the boundary.',
        },
        {
          id: 'u9-L5-Q9',
          type: 'true-false',
          question: 'A surface with Ra 0.4 is always functionally better than a surface with Ra 0.8.',
          correctAnswer: false,
          explanation: 'Ra alone does not determine functional performance. A surface with Ra 0.4 might have unfavorable skewness, lay, or waviness that makes it worse for a specific application.',
          distractorExplanations: {
            0: 'Ra alone does not determine functional performance.',
          },
          hint: 'Does a lower Ra number always mean better performance for every application?',
        },
        {
          id: 'u9-L5-Q22',
          type: 'multiple-choice',
          question: 'What is the relationship between surface roughness and fatigue life?',
          options: [
            'Surface roughness has no effect on fatigue life',
            'Rougher surfaces have lower fatigue life because valleys act as stress concentrators',
            'Smoother surfaces always have shorter fatigue life',
            'Fatigue life depends only on material, not surface condition'
          ],
          correctIndex: 1,
          explanation: 'Surface roughness directly affects fatigue life. Valleys and scratches act as micro-notch stress concentrators that initiate fatigue cracks.',
          distractorExplanations: {
            0: 'This incorrectly denies an effect that is relevant to surface roughness and significant in this context.',
            2: 'This "always" claim is too broad; smoother surfaces the principle has important exceptions.',
            3: 'This is too restrictive; the principle applies more broadly than fatigue depends suggests.',
          },
          hint: 'What happens at a microscopic scratch when cyclic stress is applied?',
        },
        {
          id: 'u9-L5-Q14',
          type: 'multiple-choice',
          question: 'What are the typical surface roughness values (Ra) achievable by common manufacturing processes?',
          options: [
            'All machining processes achieve the same roughness',
            'Lapping: 0.025-0.1, Grinding: 0.1-1.6, Turning: 0.4-6.3, Sand casting: 12.5-25 (all in micrometers)',
            'Every process can achieve any roughness with the right parameters',
            'Surface roughness depends only on the cutting tool'
          ],
          correctIndex: 1,
          explanation: 'Each manufacturing process has a characteristic roughness range determined by the physics of material removal.',
          distractorExplanations: {
            0: 'This focuses on machining/processes, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on every/process, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than surface roughness suggests.',
          },
          hint: 'Each process has physical limits on the smoothness it can achieve.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 5b: Metrology Fundamentals
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L5b',
      title: 'Metrology Fundamentals',
      description: 'CMM, profilometry, measurement uncertainty, gauge R&R, Abbe principle, 20 C reference.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u9-L5-T3',
          type: 'teaching',
          question: 'CMM and Measurement Tools',
          explanation: 'A CMM (Coordinate Measuring Machine) is a 3-axis probe system that captures X, Y, Z points on a part surface to verify GD&T. A profilometer measures micro-scale roughness with a fine stylus. They are not interchangeable: CMMs measure macro geometry (flatness, position), profilometers measure surface texture.',
          hint: 'The standard reference temperature for all dimensional measurement is 20 degrees C (ISO 1).',
        },
        {
          id: 'u9-L5-Q16',
          type: 'true-false',
          question: 'A surface profilometer measures the same characteristics as a CMM. They are interchangeable for GD&T inspection.',
          correctAnswer: false,
          explanation: 'A profilometer measures micro-geometry (roughness) with a 2-5 micrometer tip. A CMM measures macro-geometry (GD&T features) with a 1-4 mm tip. Different scales, different purposes.',
          distractorExplanations: {
            0: 'A profilometer measures micro-geometry (roughness) with a 2-5 micrometer tip.',
          },
          hint: 'One measures micro-geometry (roughness), the other measures macro-geometry (GD&T).',
        },
        {
          id: 'u9-L5-Q11',
          type: 'multiple-choice',
          question: 'What is a CMM and what are its main advantages for GD&T inspection?',
          options: [
            'A hand tool for measuring surface roughness',
            'A precision 3D measurement system that probes discrete points to verify geometric tolerances',
            'A visual inspection camera system',
            'A machine that measures only linear dimensions'
          ],
          correctIndex: 1,
          explanation: 'A CMM uses a precision probe on a 3-axis motion system to capture X, Y, Z coordinates. It can verify flatness, position, concentricity, and all other GD&T requirements from a single setup.',
          distractorExplanations: {
            0: 'This focuses on measuring/surface, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on visual/inspection, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than machine measures suggests.',
          },
          hint: 'This machine captures 3D coordinate data and computes GD&T results.',
        },
        {
          id: 'u9-L5-Q19',
          type: 'fill-blank',
          question: 'The standard reference temperature for dimensional measurement, defined by ISO 1, is _____ degrees C.',
          blanks: ['20'],
          wordBank: ['20', '25', '15', '22', '0'],
          explanation: '20 degrees C (68 degrees F) is the international standard reference temperature for industrial length measurements, established by ISO 1.',
          hint: 'This temperature is the universal reference for all dimensional measurement worldwide.',
        },
        {
          id: 'u9-L5b-T2',
          type: 'teaching',
          question: 'Measurement Uncertainty',
          explanation: 'Every measurement has uncertainty, arising from the instrument, method, environment, and operator. When a measured value is near the tolerance limit, the uncertainty zone makes accept/reject decisions ambiguous. The gauge maker\'s 10:1 rule says measurement uncertainty should be at most 1/10 of the tolerance being inspected.',
          hint: 'If your micrometer has 0.002 mm resolution, the 10:1 rule says you should only inspect tolerances of +/-0.020 mm or wider.',
        },
        {
          id: 'u9-L5-Q12',
          type: 'multiple-choice',
          question: 'What is measurement uncertainty, and why must it be considered?',
          options: [
            'The operator\'s doubt about the measurement',
            'The quantified range within which the true value is expected to lie, affecting accept/reject decisions near tolerance limits',
            'It is eliminated by using digital readouts',
            'It only applies to manual measurements'
          ],
          correctIndex: 1,
          explanation: 'Measurement uncertainty is inherent in every measurement. Near tolerance limits, the uncertainty zone creates ambiguity in accept/reject decisions.',
          distractorExplanations: {
            0: 'This focuses on operator\, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on eliminated/using, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than applies manual suggests.',
          },
          hint: 'If your measurement is right at the tolerance limit, can you be sure the part is good or bad?',
        },
        {
          id: 'u9-L5-Q5',
          type: 'multiple-choice',
          question: 'A micrometer has 0.002 mm resolution. According to the 10:1 gauge maker\'s rule, what is the tightest tolerance this instrument should inspect?',
          options: [
            '+/-0.005 mm',
            '+/-0.010 mm',
            '+/-0.020 mm',
            '+/-0.050 mm'
          ],
          correctIndex: 2,
          explanation: 'The 10:1 rule says measurement uncertainty should be at most 1/10 of the tolerance. With 0.002 mm resolution, the tightest tolerance is 0.002 x 10 = 0.020 mm.',
          distractorExplanations: {
            0: 'This focuses on +/-0.005, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on +/-0.010, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on +/-0.050, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The measurement uncertainty should consume no more than 1/10 of the tolerance.',
        },
        {
          id: 'u9-L5-Q18',
          type: 'multiple-choice',
          question: 'What is gauge R&R, and what is an acceptable result?',
          options: [
            'A test to verify gauges are calibrated',
            'A study that quantifies measurement variation from the gauge (repeatability) and operators (reproducibility). Less than 10% is acceptable.',
            'A method to repair damaged gauges',
            'A comparison between two different gauge brands'
          ],
          correctIndex: 1,
          explanation: 'Gauge R&R decomposes total measurement variation into repeatability (same person, same gauge) and reproducibility (different people). Less than 10% = acceptable, 10-30% = marginal, over 30% = unacceptable.',
          distractorExplanations: {
            0: 'This focuses on verify/gauges, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on method/repair, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on comparison/between, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If different operators get different results measuring the same part, the measurement system has a problem.',
        },
        {
          id: 'u9-L5-Q3',
          type: 'multiple-choice',
          question: 'A CMM measures flatness of a 200 mm surface using only 9 points. A colleague says this may not be reliable. Are they right?',
          options: [
            'Wrong, 9 points is sufficient',
            'Right, 9 points on a large surface may miss deviations between probed locations',
            'Point count does not matter',
            'They are right, but only for very small surfaces'
          ],
          correctIndex: 1,
          explanation: 'CMM measurements are only as good as the sampling strategy. With 9 points on a 200 mm surface, the average spacing is ~67 mm. Local deviations between points will be missed.',
          distractorExplanations: {
            0: 'This focuses on wrong,/sufficient, which is not the correct mechanism or principle for this problem.',
            2: 'This incorrectly denies an effect that is relevant to point count and significant in this context.',
            3: 'This is too restrictive; the principle applies more broadly than right small suggests.',
          },
          hint: 'Can 9 discrete points fully represent the shape of a 200 mm surface?',
        },
        {
          id: 'u9-L5-Q26',
          type: 'multiple-choice',
          question: 'What is a "go/no-go gauge" and what is its advantage for production inspection?',
          options: [
            'A gauge that measures dimensions to high precision',
            'A fixed-size gauge that checks only whether a feature is within tolerance (pass/fail), enabling fast 100% inspection',
            'A gauge that measures both roughness and dimensions',
            'A type of CMM program'
          ],
          correctIndex: 1,
          explanation: 'Go/no-go gauges are fixed-limit gauges that verify a feature is within tolerance without measuring the actual value. They are fast, simple, and ideal for high-volume production.',
          distractorExplanations: {
            0: 'This focuses on measures/dimensions, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on measures/roughness, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on program, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'For high-volume production, do you need to know the actual size, or just pass/fail?',
        },
        {
          id: 'u9-L5-Q28',
          type: 'true-false',
          question: 'Gauge blocks (Johansson blocks) can be combined by wringing to create custom lengths with accuracy better than 0.1 micrometers.',
          correctAnswer: true,
          explanation: 'Gauge blocks are precision ground and lapped metal blocks with faces so flat and smooth that they adhere by "wringing." Combinations can achieve sub-0.1 micrometer accuracy.',
          distractorExplanations: {
            1: 'Gauge blocks are precision ground and lapped metal blocks with faces so flat and smooth that they adhere by .',
          },
          hint: 'Gauge blocks are the primary physical length standards in metrology labs.',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // LESSON 5c: Applied Metrology
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L5c',
      title: 'Applied Metrology',
      description: 'Optical comparators, profilometer types, legacy drawing review, bearing area curves.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u9-L5c-T1',
          type: 'teaching',
          question: 'Choosing the Right Measurement Tool',
          explanation: 'Different features need different tools. CMMs verify GD&T on macro geometry. Profilometers measure surface texture. Optical comparators project magnified shadows for 2D profiles. Go/no-go gauges provide fast pass/fail for production. The right tool depends on what you need to verify and at what volume.',
          hint: 'Try this now: think about a part you have inspected. Was the measurement method appropriate for the feature and tolerance being checked?',
        },
        {
          id: 'u9-L5-Q27',
          type: 'multiple-choice',
          question: 'A surface finish symbol on a drawing has a circle in the V-notch. What does this indicate?',
          options: [
            'The surface must be machined to specification',
            'The surface must remain as-manufactured (no material removal allowed)',
            'The surface requires EDM processing',
            'Roughness applies only to first article'
          ],
          correctIndex: 1,
          explanation: 'Per ISO 1302, the circle in the V-notch indicates that no material removal is allowed. The surface must be obtained as-manufactured (cast, forged, etc.).',
          distractorExplanations: {
            0: 'This focuses on machined/specification, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on requires/processing, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than roughness applies suggests.',
          },
          hint: 'The circle signifies "no removal." The surface stays as-manufactured.',
        },
        {
          id: 'u9-L5-Q20',
          type: 'multiple-choice',
          question: 'What is an optical comparator (profile projector)?',
          options: [
            'A device that compares two parts side by side',
            'An instrument that projects a magnified shadow (silhouette) of a part onto a screen for measuring 2D profiles',
            'A camera that takes photos for visual inspection',
            'A precision scale for comparing part weights'
          ],
          correctIndex: 1,
          explanation: 'An optical comparator magnifies the part shadow (typically 10x to 100x) onto a screen. The operator overlays a template or uses digital crosshairs to measure features.',
          distractorExplanations: {
            0: 'This focuses on device/compares, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on camera/takes, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on precision/scale, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'This instrument uses a magnified shadow to inspect 2D profiles.',
        },
        {
          id: 'u9-L5-Q6',
          type: 'multiple-choice',
          question: 'You discover Ra 0.2 on a legacy drawing for a non-sealing, non-bearing surface. What should you do?',
          options: [
            'Just change it to Ra 3.2 and notify manufacturing',
            'Leave it as-is to avoid any risk',
            'Investigate the design intent by reviewing assembly context and service history before changing',
            'Ask manufacturing to ignore it'
          ],
          correctIndex: 2,
          explanation: 'Tight tolerances on legacy drawings may exist for a reason not obvious from the drawing alone (past failure, customer requirement, coating adhesion). Always investigate before changing.',
          distractorExplanations: {
            0: 'This focuses on change/notify, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on leave/as-is, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on manufacturing/ignore, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Legacy drawings may have hidden reasons for tight tolerances.',
        },
        {
          id: 'u9-L5-Q8',
          type: 'multiple-choice',
          question: 'What is the "cutoff length" in surface roughness measurement?',
          options: [
            'The maximum length of the surface that can be measured',
            'The filter wavelength that separates roughness (short wavelength) from waviness (long wavelength)',
            'The distance between the probe tip and the surface',
            'The minimum feature size the probe can detect'
          ],
          correctIndex: 1,
          explanation: 'The cutoff length is a high-pass filter that separates short-wavelength roughness from long-wavelength waviness. Standard values are 0.08, 0.25, 0.8, 2.5, and 8 mm.',
          distractorExplanations: {
            0: 'This focuses on maximum/length, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on distance/between, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on minimum/feature, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The filter setting determines which surface features count as roughness vs waviness.',
        },
        {
          id: 'u9-L5c-T2',
          type: 'teaching',
          question: 'Abbe\'s Principle',
          explanation: 'Abbe\'s principle states that the measurement axis should be collinear with the dimension being measured. When they are offset, angular errors in the guide multiply by the offset distance, causing "cosine error." A micrometer obeys Abbe\'s principle; a caliper does not.',
          hint: 'This is why micrometers are more accurate than calipers for the same resolution.',
        },
        {
          id: 'u9-L5-Q24',
          type: 'multiple-choice',
          question: 'What is Abbe\'s principle in metrology?',
          options: [
            'Measurements should always be taken at 20 C',
            'The measurement axis should be collinear with the dimension being measured to avoid cosine error',
            'Digital instruments are more accurate than analog ones',
            'Two measurements should always be averaged'
          ],
          correctIndex: 1,
          explanation: 'Abbe\'s principle states that the measuring scale and the dimension being measured should be collinear. Offset causes angular errors to be amplified.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; measurements taken the principle has important exceptions.',
            2: 'This focuses on digital/instruments, which is not the correct mechanism or principle for this problem.',
            3: 'This "always" claim is too broad; measurements averaged the principle has important exceptions.',
          },
          hint: 'If the ruler is not on the same line as what you are measuring, angular errors create cosine error.',
        },
        {
          id: 'u9-L5-Q23',
          type: 'multiple-choice',
          question: 'A manufacturing process changes from turning to grinding for the same surface. Both achieve the specified Ra. Should any additional checks be done?',
          options: [
            'No, if Ra is met, the surfaces are equivalent',
            'Yes, verify residual stress (grinding can cause tensile stress and thermal damage)',
            'Only verify dimensional tolerance, not surface properties',
            'Grinding is always superior, no additional checks needed'
          ],
          correctIndex: 1,
          explanation: 'Changing the manufacturing process changes far more than just Ra. Grinding can induce tensile residual stress, thermal damage, and microstructural changes that affect fatigue life and performance.',
          distractorExplanations: {
            0: 'This focuses on surfaces/equivalent, which is not the correct mechanism or principle for this problem.',
            2: 'This is too restrictive; the principle applies more broadly than verify dimensional suggests.',
            3: 'This "always" claim is too broad; grinding superior the principle has important exceptions.',
          },
          hint: 'Ra is the same, but is the metallurgical condition also the same?',
        },
        {
          id: 'u9-L5-Q13',
          type: 'fill-blank',
          question: 'The surface roughness parameter Rz measures the average maximum peak-to-_____ height over the evaluation length.',
          blanks: ['valley'],
          wordBank: ['valley', 'mean', 'peak', 'baseline', 'center'],
          explanation: 'Rz is defined as the average of the individual maximum peak-to-valley heights measured in each of the five sampling lengths within the evaluation length.',
          hint: 'Rz measures the extreme heights: from the highest peak to the lowest valley.',
        },
        {
          id: 'u9-L5-Q25',
          type: 'fill-blank',
          question: 'The surface lay symbol "C" indicates a _____ lay pattern, typically produced by turning or facing.',
          blanks: ['circular'],
          wordBank: ['circular', 'crossed', 'radial', 'parallel', 'multi-directional'],
          explanation: 'The "C" lay symbol indicates concentric circular marks centered on the feature axis, characteristic of turning, facing, and boring operations.',
          hint: 'Turning creates concentric ring-shaped marks.',
        },
        {
          id: 'u9-L5-Q30',
          type: 'multiple-choice',
          question: 'What is the "Bearing Area Curve" (Abbott-Firestone curve)?',
          options: [
            'It only applies to bearing surfaces',
            'It plots the percentage of the surface in contact at successive depth levels, showing how the surface will wear in and support load',
            'It is only used in research, not in industry',
            'It is the same as the Rz measurement plotted differently'
          ],
          correctIndex: 1,
          explanation: 'The Abbott-Firestone curve is generated by slicing the surface profile at successively deeper levels and plotting the material ratio at each depth. It predicts wear-in, oil retention, and load-bearing behavior.',
          distractorExplanations: {
            0: 'This is too restrictive; the principle applies more broadly than applies bearing suggests.',
            2: 'This is too restrictive; the principle applies more broadly than research industry suggests.',
            3: 'This focuses on measurement/plotted, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If you slice the surface profile horizontally, how much material is present at each depth?',
        },
      ]
    },
    // ═══════════════════════════════════════════════════════════
    // CONVERSATION LESSON
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L-conv',
      title: 'Drawing Review',
      description: 'Help a colleague interpret a GD&T drawing and troubleshoot a tolerance issue.',
      icon: '💬',
      type: 'conversation',
      xpReward: 20,
      questions: [],
      conversationStartNodeId: 'u9-L-conv-C1',
      conversationNodes: [
        {
          id: 'u9-L-conv-C1',
          speaker: 'Alex',
          message: 'Hey, I need your help. I just got this drawing back from the designer and I don\'t understand the feature control frame on the bore. It says position, 0.25 diameter, circled M, then A, B, C.',
          nextNodeId: 'u9-L-conv-C2',
        },
        {
          id: 'u9-L-conv-C2',
          speaker: 'Alex',
          message: 'What does that circled M actually do? Can you explain it?',
          options: [
            {
              text: 'That\'s the MMC modifier. It means you get bonus tolerance as the hole departs from its smallest size. Bigger hole = more position tolerance.',
              nextNodeId: 'u9-L-conv-C3',
              quality: 'great',
              feedback: 'Clear and practical. You explained both what it means and the benefit.',
            },
            {
              text: 'It stands for Maximum Material Condition. It\'s a material condition modifier.',
              nextNodeId: 'u9-L-conv-C3',
              quality: 'okay',
              feedback: 'Technically correct, but Alex still doesn\'t know what it does in practice.',
            },
            {
              text: 'Just ignore it. It\'s an optional modifier that doesn\'t change much.',
              nextNodeId: 'u9-L-conv-C3',
              quality: 'poor',
              feedback: 'The MMC modifier significantly changes how the tolerance works and how to inspect it.',
            },
          ],
        },
        {
          id: 'u9-L-conv-C3',
          speaker: 'Alex',
          message: 'Okay, that makes sense. Now here\'s the real problem. The CMM says these parts pass, but they don\'t fit in the assembly. The pins won\'t go through the holes. What\'s going on?',
          nextNodeId: 'u9-L-conv-C4',
        },
        {
          id: 'u9-L-conv-C4',
          speaker: 'Alex',
          message: 'How should I troubleshoot this?',
          options: [
            {
              text: 'Check how the CMM is setting up datums. If the datum alignment doesn\'t match how the part sits in the assembly, the CMM will say "pass" but the assembly will say "fail."',
              nextNodeId: 'u9-L-conv-C5',
              quality: 'great',
              feedback: 'Datum setup mismatch is the most common cause of CMM-pass-assembly-fail problems.',
            },
            {
              text: 'Maybe the pins are out of spec. Check the mating parts first.',
              nextNodeId: 'u9-L-conv-C5',
              quality: 'okay',
              feedback: 'Checking mating parts is reasonable, but the most likely root cause is a datum alignment mismatch.',
            },
            {
              text: 'The CMM must be broken. Recalibrate it and measure again.',
              nextNodeId: 'u9-L-conv-C5',
              quality: 'poor',
              feedback: 'Jumping to instrument failure without checking the setup first wastes time. The CMM is probably measuring accurately, just to a different reference frame.',
            },
          ],
        },
        {
          id: 'u9-L-conv-C5',
          speaker: 'Alex',
          message: 'You were right! The CMM was using best-fit on the bottom surface, but the assembly sits on three datum target points. The reference frames were different.',
          nextNodeId: 'u9-L-conv-C6',
        },
        {
          id: 'u9-L-conv-C6',
          speaker: 'Alex',
          message: 'One more thing. The designer wants to add a flatness tolerance of 0.02 and a parallelism tolerance of 0.01 to the same surface. That seems backward to me. Is it valid?',
          options: [
            {
              text: 'You\'re right, that\'s backward. Flatness must be tighter than or equal to parallelism, because parallelism inherently controls form. Flatness of 0.02 can\'t refine a parallelism of 0.01.',
              nextNodeId: 'u9-L-conv-C7',
              quality: 'great',
              feedback: 'Correct. The tighter tolerance (parallelism at 0.01) already limits flatness to 0.01. A flatness of 0.02 adds nothing.',
            },
            {
              text: 'Both can be applied, but the tighter one wins.',
              nextNodeId: 'u9-L-conv-C7',
              quality: 'okay',
              feedback: 'Partially right. The tighter one does govern, but the 0.02 flatness is redundant and confusing. The designer should fix the callout.',
            },
            {
              text: 'It\'s fine, they control different things.',
              nextNodeId: 'u9-L-conv-C7',
              quality: 'poor',
              feedback: 'They do control different things, but parallelism inherently limits form. A flatness tolerance looser than parallelism is redundant.',
            },
          ],
        },
        {
          id: 'u9-L-conv-C7',
          speaker: 'Narrator',
          message: 'You helped Alex understand MMC bonus tolerance, diagnose a datum alignment mismatch causing false CMM passes, and catch a redundant tolerance callout. These are real-world GD&T skills that save time and prevent scrap.',
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════
    // SPEED ROUND LESSON
    // ═══════════════════════════════════════════════════════════
    {
      id: 'u9-L-speed',
      title: 'GD&T Speed Round',
      description: 'Race the clock on tolerancing, GD&T symbols, datums, and metrology.',
      icon: '⚡',
      type: 'speed-round',
      xpReward: 20,
      questions: [],
      speedTimeLimit: 60,
      speedQuestions: [
        {
          id: 'u9-L-speed-SQ1',
          question: 'MMC for a hole means the _____ size.',
          options: ['Smallest', 'Largest', 'Nominal', 'Average'],
          correctIndex: 0,
        },
        {
          id: 'u9-L-speed-SQ2',
          question: 'How many GD&T categories are there?',
          options: ['3', '4', '5', '7'],
          correctIndex: 2,
        },
        {
          id: 'u9-L-speed-SQ3',
          question: 'Form tolerances need datums.',
          options: ['True', 'False', 'Sometimes', 'Only for flatness'],
          correctIndex: 1,
        },
        {
          id: 'u9-L-speed-SQ4',
          question: 'The primary datum constrains how many DOF?',
          options: ['1', '2', '3', '6'],
          correctIndex: 2,
        },
        {
          id: 'u9-L-speed-SQ5',
          question: 'H7/g6 is what type of fit?',
          options: ['Transition', 'Interference', 'Clearance', 'Press'],
          correctIndex: 2,
        },
        {
          id: 'u9-L-speed-SQ6',
          question: 'Worst-case stack-up _____ all tolerances.',
          options: ['Adds', 'Multiplies', 'Averages', 'Squares'],
          correctIndex: 0,
        },
        {
          id: 'u9-L-speed-SQ7',
          question: 'Ra measures surface _____.',
          options: ['Hardness', 'Roughness', 'Flatness', 'Color'],
          correctIndex: 1,
        },
        {
          id: 'u9-L-speed-SQ8',
          question: 'Standard reference temp for measurement?',
          options: ['20 C', '25 C', '0 C', '37 C'],
          correctIndex: 0,
        },
        {
          id: 'u9-L-speed-SQ9',
          question: 'RSS gives _____ tolerance than worst-case.',
          options: ['Tighter', 'The same', 'Looser', 'Double'],
          correctIndex: 0,
        },
        {
          id: 'u9-L-speed-SQ10',
          question: 'Position tolerance always needs _____.',
          options: ['MMC modifier', 'Datums', 'Bonus tolerance', 'A cylinder zone'],
          correctIndex: 1,
        },
        {
          id: 'u9-L-speed-SQ11',
          question: 'Uppercase letters in ISO fits = ?',
          options: ['Shaft', 'Hole', 'Both', 'Neither'],
          correctIndex: 1,
        },
        {
          id: 'u9-L-speed-SQ12',
          question: '3-2-1 rule uses how many total contact points?',
          options: ['3', '5', '6', '9'],
          correctIndex: 2,
        },
        {
          id: 'u9-L-speed-SQ13',
          question: 'Rz is better than Ra for _____ surfaces.',
          options: ['Sealing', 'Painted', 'Rough cast', 'Bearing'],
          correctIndex: 0,
        },
        {
          id: 'u9-L-speed-SQ14',
          question: 'Higher IT number means _____ tolerance.',
          options: ['Tighter', 'Looser', 'Same', 'Depends on size'],
          correctIndex: 1,
        },
        {
          id: 'u9-L-speed-SQ15',
          question: 'Bonus tolerance comes from departing _____.',
          options: ['LMC', 'MMC', 'Nominal', 'RFS'],
          correctIndex: 1,
        },
      ],
    },
  ]
};
