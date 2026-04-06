import type { Unit } from '../types';

export const unit10: Unit = {
  id: 'u10-interview',
  title: 'Interview Problems',
  description: 'Estimation problems, failure analysis, design trade-offs, FEA interpretation, and real-world engineering case studies.',
  color: '#14B8A6',
  icon: '\u{1F9E0}',
  lessons: [
    {
      id: 'u10-L1',
      title: 'Fermi Problems Basics',
      description: 'What Fermi problems are, how to decompose big unknowns, and your first estimation attempts.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u10-L1-NEW-T1',
          type: 'teaching',
          question: 'Breaking Down Big Questions',
          explanation: 'Fermi problems test how you think, not what you memorize. Break a huge question into small pieces, estimate each piece, and multiply.',
          hint: 'Try this now: estimate how many piano tuners are in your city.',
        },
        {
          id: 'u10-L1-NEW-E1',
          type: 'true-false',
          question: 'In a Fermi estimation, getting within an order of magnitude (factor of 10) of the real answer is considered a good result.',
          correctAnswer: true,
          explanation: 'Fermi estimates aim for the right power of 10, not the exact number.',
          distractorExplanations: {
            1: 'Fermi estimates aim for the right power of 10, not the exact number.',
          },
          hint: 'These estimates prioritize order of magnitude, not precision.',
        },
        {
          id: 'u10-L1-Q1',
          type: 'multiple-choice',
          question: 'Estimate the power needed to keep a car at highway speed. What approach should you take?',
          options: [
            'Look up the engine horsepower from the car\'s spec sheet and report that number',
            'Guess "about 100 kW" since that is a typical engine rating',
            'Break the problem into contributors (aerodynamic drag, rolling resistance',
            'Calculate only aerodynamic drag since it dominates at highway speed . '
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="8" y="12" width="64" height="56" rx="4" fill="#58CC02" opacity="0.04"/> <rect x="8" y="12" width="64" height="56" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.2"/> <line x1="16" y1="60" x2="16" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.3"/> <line x1="16" y1="60" x2="72" y2="60" stroke="#3B8700" stroke-width="1.2" opacity="0.3"/> <rect x="22" y="42" width="8" height="18" rx="1" fill="#58CC02" opacity="0.2"/> <rect x="22" y="42" width="8" height="18" rx="1" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.4"/> <rect x="34" y="30" width="8" height="30" rx="1" fill="#58CC02" opacity="0.25"/> <rect x="34" y="30" width="8" height="30" rx="1" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.4"/> <rect x="46" y="22" width="8" height="38" rx="1" fill="#58CC02" opacity="0.3"/> <rect x="46" y="22" width="8" height="38" rx="1" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.4"/> <rect x="58" y="36" width="8" height="24" rx="1" fill="#A5E86C" opacity="0.2"/> <rect x="58" y="36" width="8" height="24" rx="1" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.3"/> <circle cx="26" cy="42" r="2" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite"/> </circle> <circle cx="38" cy="30" r="2" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle cx="50" cy="22" r="2" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" begin="0.6s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'Interviewers want to see structured decomposition, not a single formula.',
          distractorExplanations: {
            0: 'This focuses on engine/horsepower, which is not the correct mechanism or principle for this problem.',
            1: 'Regarding guess: Interviewers want to see structured decomposition, not a single formula.',
            3: 'This is too restrictive; the principle applies more broadly than calculate aerodynamic suggests.',
          },
          hint: 'Focus on your problem-solving framework, not the exact answer.'
        },
        {
          id: 'u10-L1-NEW-MP1',
          type: 'match-pairs',
          question: 'Match each estimation technique to its description:',
          options: [
            'Fermi estimation',
            'Dimensional analysis',
            'Scaling law',
            'Sanity check'
          ],
          matchTargets: [
            'Break unknowns into estimable pieces',
            'Use units to derive relationships',
            'Predict how changes scale with size',
            'Compare result to known values'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Each technique serves a different purpose in engineering estimation.',
          hint: 'Think about what each method does.',
        },
        {
          id: 'u10-L1-NEW-T2',
          type: 'teaching',
          question: 'Decomposition Is the Key Skill',
          explanation: 'Interviewers don\'t expect exact answers. They want to see you decompose a problem into parts you can estimate, state your assumptions clearly, and arrive at a reasonable number.',
          hint: 'Try this now: estimate how many golf balls fit in a school bus.',
        },
        {
          id: 'u10-L1-NEW-E2',
          type: 'multiple-choice',
          question: 'What does "order of magnitude" mean?',
          options: [
            'A factor of 10',
            'A factor of 2',
            'An exact answer',
            'A factor of 100'
          ],
          correctIndex: 0,
          explanation: 'An order of magnitude is a factor of 10. If the real answer is 5,000, being within an order of magnitude means your answer is between 500 and 50,000.',
          distractorExplanations: {
            1: 'Regarding factor: An order of magnitude is a factor of 10.',
            2: 'This focuses on exact/answer, which is not the correct mechanism or principle for this problem.',
            3: 'Regarding factor: An order of magnitude is a factor of 10.',
          },
          hint: 'Think about powers of 10.',
        },
        {
          id: 'u10-L1-Q2',
          type: 'multiple-choice',
          question: 'If you double the beam\'s depth (height) while keeping the width the same, by approximately what factor does the deflection decrease?',
          options: [
            '2x (halves)',
            '4x (quarters)',
            '8x (one-eighth)',
            '16x (one-sixteenth)'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Ground --> <line x1="4" y1="66" x2="76" y2="66" stroke="#3B8700" stroke-width="0.8" opacity="0.12"/> <!-- Ground hatching at supports --> <line x1="9" y1="66" x2="6" y2="70" stroke="#3B8700" stroke-width="0.5" opacity="0.08"/> <line x1="14" y1="66" x2="11" y2="70" stroke="#3B8700" stroke-width="0.5" opacity="0.08"/> <line x1="19" y1="66" x2="16" y2="70" stroke="#3B8700" stroke-width="0.5" opacity="0.08"/> <line x1="61" y1="66" x2="58" y2="70" stroke="#3B8700" stroke-width="0.5" opacity="0.08"/> <line x1="66" y1="66" x2="63" y2="70" stroke="#3B8700" stroke-width="0.5" opacity="0.08"/> <line x1="71" y1="66" x2="68" y2="70" stroke="#3B8700" stroke-width="0.5" opacity="0.08"/> <!-- Pin support (left) --> <polygon points="14,52 10,62 18,62" stroke="#3B8700" stroke-width="1.2" fill="none" opacity="0.3"/> <circle cx="14" cy="52" r="1.5" fill="#3B8700" opacity="0.25"/> <!-- Roller support (right) --> <polygon points="66,52 62,60 70,60" stroke="#3B8700" stroke-width="1.2" fill="none" opacity="0.3"/> <circle cx="64" cy="62" r="1.5" fill="#3B8700" opacity="0.15"/> <circle cx="68" cy="62" r="1.5" fill="#3B8700" opacity="0.15"/> <line x1="62" y1="64" x2="70" y2="64" stroke="#3B8700" stroke-width="0.6" opacity="0.15"/> <!-- Beam (deflects under load) --> <path fill="#58CC02" opacity="0.08"> <animate attributeName="d" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.4;1" values="M14,46 Q40,46 66,46 L66,52 Q40,52 14,52 Z;M14,46 Q40,49 66,46 L66,52 Q40,55 14,52 Z;M14,46 Q40,46 66,46 L66,52 Q40,52 14,52 Z"/> </path> <path stroke="#58CC02" stroke-width="4" fill="none" stroke-linecap="round"> <animate attributeName="d" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.4;1" values="M14,49 Q40,49 66,49;M14,49 Q40,52 66,49;M14,49 Q40,49 66,49"/> </path> <!-- Applied force F₁ (x=32, larger) --> <g> <line x1="32" y1="36" x2="32" y2="44" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.5"> <animate attributeName="y1" values="38;22;38" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.4;1"/> </line> <polygon points="30,43 32,47 34,43" fill="#3B8700" opacity="0.5"/> <text x="32" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-weight="bold" font-style="italic"> <animate attributeName="y" values="34;18;34" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.4;1"/> F₁ </text> </g> <!-- Applied force F₂ (x=52, smaller) --> <g> <line x1="52" y1="36" x2="52" y2="44" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.5"> <animate attributeName="y1" values="38;28;38" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.4;1"/> </line> <polygon points="50,43 52,47 54,43" fill="#3B8700" opacity="0.5"/> <text x="52" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-weight="bold" font-style="italic"> <animate attributeName="y" values="34;24;34" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.4;1"/> F₂ </text> </g> <!-- Reaction forces (appear when loaded) --> <!-- R₁ at pin support --> <g opacity="0"> <animate attributeName="opacity" values="0;0.35;0" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.4;1"/> <line x1="14" y1="65" x2="14" y2="58" stroke="#3B8700" stroke-width="1.2" stroke-linecap="round"/> <polygon points="12.5,59 14,56 15.5,59" fill="#3B8700"/> <text x="14" y="72" text-anchor="middle" font-size="5" fill="#3B8700" font-style="italic">R₁</text> </g> <!-- R₂ at roller support --> <g opacity="0"> <animate attributeName="opacity" values="0;0.35;0" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.4;1"/> <line x1="66" y1="65" x2="66" y2="58" stroke="#3B8700" stroke-width="1.2" stroke-linecap="round"/> <polygon points="64.5,59 66,56 67.5,59" fill="#3B8700"/> <text x="66" y="72" text-anchor="middle" font-size="5" fill="#3B8700" font-style="italic">R₂</text> </g> </svg>',
          explanation: 'Deflection is inversely proportional to the moment of inertia I. For a rectangular beam, I = bh^3/12. Doubling h increases I by 2^3 = 8 times.',
          distractorExplanations: {
            0: '2 is one-quarter of the correct value, from an extra division or missing squared term.',
            1: '4 is approximately half the correct answer, likely from omitting a required factor of 2.',
            3: '16 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
          },
          hint: 'Deflection is proportional to 1/I, and I is proportional.'
        }
      ]
    },
    {
      id: 'u10-L1b',
      title: 'Anchor Values & Sanity Checks',
      description: 'Key reference numbers every engineer should know, plus how to sanity-check your estimates.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u10-L1b-NEW-T1',
          type: 'teaching',
          question: 'Memorize Key Reference Values',
          explanation: 'You can\'t estimate without reference points. Keep these in your head: steel density 7,850 kg/m3, steel yield 250 MPa, E for steel 200 GPa, water density 1,000 kg/m3.',
          hint: 'Try this now: estimate the weight of a 1m steel cube.',
        },
        {
          id: 'u10-L1b-NEW-E1',
          type: 'true-false',
          question: 'The density of water is approximately 1,000 kg/m3.',
          correctAnswer: true,
          explanation: 'Water density at standard conditions is 1,000 kg/m3. This is one of the most important anchor values.',
          distractorExplanations: {
            1: 'Water density at standard conditions is 1,000 kg/m3.',
          },
          hint: 'This is a fundamental reference value.',
        },
        {
          id: 'u10-L1b-NEW-SB1',
          type: 'sort-buckets',
          question: 'Sort these properties by typical value: high or low?',
          options: [
            'Steel E-modulus (200 GPa)',
            'Copper conductivity (400 W/mK)',
            'Rubber E-modulus (0.01 GPa)',
            'Foam density (30 kg/m3)',
            'Steel density (7,850 kg/m3)',
            'Air density (1.2 kg/m3)'
          ],
          buckets: [
            'High value',
            'Low value'
          ],
          correctBuckets: [0, 0, 1, 1, 0, 1],
          explanation: 'Knowing which properties are high or low helps you sanity-check estimates quickly.',
          hint: 'Compare each to typical engineering materials.',
        },
        {
          id: 'u10-L1b-NEW-T2',
          type: 'teaching',
          question: 'Always Sanity-Check Your Answer',
          explanation: 'After calculating, compare your result to something you know. If your estimate says a car weighs 100 kg, something went wrong. A typical car weighs about 1,500 kg.',
          hint: 'Try this now: check if your bathtub holds about 150 liters.',
        },
        {
          id: 'u10-L1b-NEW-E2',
          type: 'multiple-choice',
          question: 'What is the approximate yield strength of common structural steel?',
          options: [
            '2,500 MPa',
            '25 MPa',
            '250 MPa',
            '25,000 MPa'
          ],
          correctIndex: 2,
          explanation: 'A36/S275 structural steel yields at about 250 MPa (36 ksi). This is a critical anchor value.',
          distractorExplanations: {
            0: '2,500 is an order of magnitude too large, likely from a unit conversion error.',
            1: '25 is an order of magnitude too small, likely from a unit conversion error.',
            3: '25,000 significantly exceeds the correct answer due to a fundamental formula or calculation error.',
          },
          hint: 'Think about common steel properties.',
        },
        {
          id: 'u10-L1-Q3',
          type: 'true-false',
          question: 'For a quick sanity check: the yield strength of common structural steel (A36/S275) is approximately 250 MPa, mild steel\'s?',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve. animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker. appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker. appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker. appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot. follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: 'These are essential "anchor values" every mechanical engineer should know: A36 steel yield ~ 250 MPa (36 ksi), E_steel ~ 200 GPa (29 Msi), gamma_water ~ 9.81 kN/m^3 ~ 10 kN/m^3.',
          distractorExplanations: {
            1: 'These are essential .',
          },
          hint: 'These are fundamental "anchor numbers" that every.'
        }
      ]
    },
    {
      id: 'u10-L1c',
      title: 'Scaling Laws & Advanced Estimation',
      description: 'Scaling laws, combined estimation problems, and real interview-level Fermi challenges.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u10-L1c-NEW-T1',
          type: 'teaching',
          question: 'Power Laws Speed Up Estimation',
          explanation: 'Many quantities follow simple power laws. If you double the diameter of a pipe, flow capacity goes up by 2^(5/2) = 5.66x. Knowing these exponents saves you from recalculating.',
          hint: 'Try this now: if you double beam depth, how does deflection change?',
        },
        {
          id: 'u10-L1c-NEW-E1',
          type: 'true-false',
          question: 'Pump power scales with the cube of speed: doubling RPM increases power by 8x.',
          correctAnswer: true,
          explanation: 'The pump affinity laws: Q scales with N, H with N^2, and P with N^3.',
          distractorExplanations: {
            1: 'The pump affinity laws: Q scales with N, H with N^2, and P with N^3.',
          },
          hint: 'Think about the pump affinity laws.',
        },
        {
          id: 'u10-L1-Q4',
          type: 'multiple-choice',
          question: 'Will this steel shelf bracket vibrate noticeably?',
          options: [
            'Only the weight of the load on the shelf matters. heavier loads always',
            'Compare the excitation frequency to the bracket\'s natural frequency',
            'Vibration only matters for rotating equipment. a shelf bracket cannot vibrate',
            'Just make the bracket thicker. that always eliminates vibration regardless'

          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="26" y="4" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <circle cx="40" cy="12" r="3" fill="#3B8700"/> <polyline stroke="#58CC02" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"> <animate attributeName="points" dur="2.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" values=" 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64; 40,14 40,18 28,24 52,30 28,36 52,42 28,48 52,54 28,60 52,66 28,72 52,78 40,82 40,84; 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64 "/> </polyline> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,20;0,0" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/> <rect x="26" y="64" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <rect x="26" y="64" width="28" height="6" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <text x="22" y="42" font-size="8" fill="#3B8700" font-style="italic" opacity="0.35">k</text> </svg>',
          explanation: 'The key engineering judgment: vibration is a concern when the excitation frequency is near the natural frequency (resonance).',
          distractorExplanations: {
            0: 'This "always" claim is too broad; weight shelf the principle has important exceptions.',
            2: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
            3: 'This "always" claim is too broad; bracket thicker the principle has important exceptions.',
          },
          hint: 'Consider the relationship between excitation frequency.'
        },
        {
          id: 'u10-L1-Q5',
          type: 'multiple-choice',
          question: 'An interviewer asks: "How many ball bearings fit inside this room?" What is the best estimation approach?',
          options: [
            'Room volume / sphere volume, with a packing fraction (~64%)',
            'Room volume / sphere volume exactly, with no packing adjustment',
            'Count bearings along each edge and multiply the three numbers',
            'Estimate it as "millions" without performing any calculation'

          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="8" y="12" width="64" height="56" rx="4" fill="#58CC02" opacity="0.04"/> <rect x="8" y="12" width="64" height="56" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.2"/> <line x1="16" y1="60" x2="16" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.3"/> <line x1="16" y1="60" x2="72" y2="60" stroke="#3B8700" stroke-width="1.2" opacity="0.3"/> <rect x="22" y="42" width="8" height="18" rx="1" fill="#58CC02" opacity="0.2"/> <rect x="22" y="42" width="8" height="18" rx="1" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.4"/> <rect x="34" y="30" width="8" height="30" rx="1" fill="#58CC02" opacity="0.25"/> <rect x="34" y="30" width="8" height="30" rx="1" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.4"/> <rect x="46" y="22" width="8" height="38" rx="1" fill="#58CC02" opacity="0.3"/> <rect x="46" y="22" width="8" height="38" rx="1" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.4"/> <rect x="58" y="36" width="8" height="24" rx="1" fill="#A5E86C" opacity="0.2"/> <rect x="58" y="36" width="8" height="24" rx="1" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.3"/> <circle cx="26" cy="42" r="2" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite"/> </circle> <circle cx="38" cy="30" r="2" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle cx="50" cy="22" r="2" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" begin="0.6s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'Room volume = L x W x H. Sphere volume = (4/3)*pi*r^3. Naive count = room volume / sphere volume.',
          distractorExplanations: {
            1: 'This focuses on exactly,/adjustment, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on count/bearings, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on estimate, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Spheres cannot fill 100% of space.'
        },
        {
          id: 'u10-L1c-NEW-OS1',
          type: 'order-steps',
          question: 'Put these Fermi estimation steps in order:',
          steps: [
            'Define the quantity you need to estimate',
            'Break it into smaller estimable pieces',
            'Estimate each piece with assumptions',
            'Multiply/combine the pieces',
            'Sanity-check against a known value'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'A structured approach: define, decompose, estimate each piece, combine, then check.',
          hint: 'Start with the big picture, end with a reality check.',
        },
        {
          id: 'u10-L1c-NEW-T2',
          type: 'teaching',
          question: 'Combining Estimates for Complex Problems',
          explanation: 'Real interview problems require chaining estimates. First estimate the volume, then use density for mass, then use material strength for load capacity. Each step builds on the last.',
          hint: 'Try this now: estimate the weight of the Eiffel Tower step by step.',
        },
        {
          id: 'u10-L1c-NEW-E2',
          type: 'multiple-choice',
          question: 'If beam deflection scales as L^3, what happens when you triple the span?',
          options: [
            'Deflection increases 3x',
            'Deflection increases 9x',
            'Deflection increases 27x',
            'Deflection stays the same'
          ],
          correctIndex: 2,
          explanation: 'L^3 scaling: 3^3 = 27. Tripling the span increases deflection by 27 times.',
          distractorExplanations: {
            0: 'Regarding deflection increases: L^3 scaling: 3^3 = 27.',
            1: 'Regarding deflection increases: L^3 scaling: 3^3 = 27.',
            3: 'This focuses on stays, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Calculate 3 raised to the power of 3.',
        },
        {
          id: 'u10-L1-Q6',
          type: 'multiple-choice',
          question: 'The motor is about the size of a coffee can. Is this plausible?',
          options: [
            'Yes. modern motors are very powerful for their size at any rating',
            'No. a motor that size typically produces only 1-10 N*m continuously',
            'It depends entirely on the voltage. higher voltage means any torque',
            'Cannot be determined without knowing the exact motor model and brand'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="8" y="12" width="64" height="56" rx="4" fill="#58CC02" opacity="0.04"/> <rect x="8" y="12" width="64" height="56" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.2"/> <line x1="16" y1="60" x2="16" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.3"/> <line x1="16" y1="60" x2="72" y2="60" stroke="#3B8700" stroke-width="1.2" opacity="0.3"/> <rect x="22" y="42" width="8" height="18" rx="1" fill="#58CC02" opacity="0.2"/> <rect x="22" y="42" width="8" height="18" rx="1" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.4"/> <rect x="34" y="30" width="8" height="30" rx="1" fill="#58CC02" opacity="0.25"/> <rect x="34" y="30" width="8" height="30" rx="1" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.4"/> <rect x="46" y="22" width="8" height="38" rx="1" fill="#58CC02" opacity="0.3"/> <rect x="46" y="22" width="8" height="38" rx="1" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.4"/> <rect x="58" y="36" width="8" height="24" rx="1" fill="#A5E86C" opacity="0.2"/> <rect x="58" y="36" width="8" height="24" rx="1" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.3"/> <circle cx="26" cy="42" r="2" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite"/> </circle> <circle cx="38" cy="30" r="2" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle cx="50" cy="22" r="2" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" begin="0.6s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'Engineering sanity-checking means having calibrated intuition for physical quantities. A coffee-can-sized motor (NEMA 34 / ~90 mm frame) typically produces 1-5 N*m continuously, maybe 10-15 N*m peak.',
          distractorExplanations: {
            0: 'This focuses on modern/motors, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on depends/entirely, which is not the correct mechanism or principle for this problem.',
            3: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
          },
          hint: 'Consider motors you have encountered.'
        }
      ]
    },
    {
      id: 'u10-L2',
      title: 'Failure Modes & Fracture Surfaces',
      description: 'The three main failure modes, reading fracture surfaces, and identifying fatigue vs overload.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u10-L2-NEW-T1',
          type: 'teaching',
          question: 'Reading Fracture Surfaces',
          explanation: 'A fracture surface is like a crime scene. Beach marks mean fatigue. Chevrons mean brittle overload. Cup-and-cone means ductile overload. Learn to read these clues first.',
          hint: 'Try this now: look at a broken item and identify the fracture origin.',
        },
        {
          id: 'u10-L2-NEW-E1',
          type: 'true-false',
          question: 'Beach marks on a fracture surface indicate that the part failed by fatigue, not sudden overload.',
          correctAnswer: true,
          explanation: 'Beach marks are concentric arcs radiating from the crack origin, a hallmark of fatigue.',
          distractorExplanations: {
            1: 'Beach marks are concentric arcs radiating from the crack origin, a hallmark of fatigue.',
          },
          hint: 'Beach marks show progressive crack growth over many cycles.',
        },
        {
          id: 'u10-L2-Q1',
          type: 'multiple-choice',
          question: 'A rotating shaft fracture surface shows a smooth, flat region with beach marks covering 80% of the cross-section, and a rough,?',
          options: [
            'Stress corrosion cracking. beach marks indicate cyclic environment',
            'Sudden overload failure. the part was undersized for the applied load',
            'Hydrogen embrittlement. the smooth region is the embrittled zone',
            'Fatigue failure under relatively low stress with gradual crack growth'

          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Material plate --> <rect x="6" y="20" width="68" height="40" rx="6" fill="#58CC02" opacity="0.06"/> <rect x="6" y="20" width="68" height="40" rx="6" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Initial edge notch (V-shape stress riser) --> <path d="M6,37 L13,40 L6,43" stroke="#3B8700" stroke-width="1.2" fill="none" opacity="0.25"/> <!-- Crack opening displacement wedge (widens behind tip) --> <path fill="#3B8700" opacity="0"> <animate attributeName="d" values="M6,40 L6,40 L6,40 L6,40 Z;M6,38 L55,39.7 L55,40.3 L6,42 Z;M6,40 L6,40 L6,40 L6,40 Z" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.12;0" dur="4s" repeatCount="indefinite"/> </path> <!-- Main crack line (propagates from notch) --> <line y1="40" x1="12" y2="40" stroke="#3B8700" stroke-width="2" stroke-linecap="round"> <animate attributeName="x2" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> </line> <!-- Crack tip plastic zone (stress intensity) --> <circle cy="40" r="4" fill="#58CC02" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.2;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="3;7;3" dur="4s" repeatCount="indefinite"/> </circle> <!-- Inner yield zone (smaller, darker) --> <circle cy="40" r="2" fill="#3B8700" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.15;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite"/> </circle> <!-- Microcracks. branch up and down as main crack passes --> <line x1="24" y1="40" x2="27" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.25;0.3;0.8;1"/> </line> <line x1="24" y1="40" x2="21" y2="46" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.27;0.32;0.8;1"/> </line> <line x1="37" y1="40" x2="40" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.42;0.47;0.8;1"/> </line> <line x1="37" y1="40" x2="34" y2="47" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.44;0.49;0.8;1"/> </line> <line x1="48" y1="40" x2="51" y2="35" stroke="#A5E86C" stroke-width="0.7" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.58;0.63;0.8;1"/> </line> <!-- Tensile stress arrows (Mode I. opening) --> <!-- Top arrows (2) pulling up --> <line x1="28" y1="16" x2="28" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,16 28,13 29.5,16" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="16" x2="52" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,16 52,13 53.5,16" fill="#3B8700" opacity="0.2"/> <!-- Bottom arrows (2) pulling down --> <line x1="28" y1="60" x2="28" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,64 28,67 29.5,64" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="60" x2="52" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,64 52,67 53.5,64" fill="#3B8700" opacity="0.2"/> <!-- Stress label --> <text x="40" y="11" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> <text x="40" y="73" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> </svg>',
          explanation: 'Beach marks (macroscopic concentric arcs radiating from the crack origin) are the hallmark of fatigue failure.',
          distractorExplanations: {
            0: 'This focuses on corrosion/cracking., which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on sudden/overload, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on hydrogen/embrittlement., which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Beach marks indicate progressive crack growth.'
        },
        {
          id: 'u10-L2-NEW-MP1',
          type: 'match-pairs',
          question: 'Match each fracture feature to its failure mode:',
          options: [
            'Beach marks',
            'Chevron pattern',
            'Cup-and-cone',
            'Intergranular voids'
          ],
          matchTargets: [
            'Fatigue',
            'Brittle overload',
            'Ductile overload',
            'Creep'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Each failure mode leaves a distinctive signature on the fracture surface.',
          hint: 'Each feature is unique to one failure mode.',
        },
        {
          id: 'u10-L2-NEW-T2',
          type: 'teaching',
          question: 'Start With the Three Big Failure Modes',
          explanation: 'Before diving into exotic mechanisms, check the big three first: fatigue (cyclic loading), overload (single event), and corrosion (environment). Most failures fall into one of these.',
          hint: 'Try this now: think of a product recall and identify which category caused it.',
        },
        {
          id: 'u10-L2-NEW-E2',
          type: 'multiple-choice',
          question: 'Which failure mode is caused by repeated loading and unloading over many cycles?',
          options: [
            'Overload',
            'Fatigue',
            'Creep',
            'Erosion'
          ],
          correctIndex: 1,
          explanation: 'Fatigue is caused by cyclic loading. Cracks grow slowly until final fracture.',
          distractorExplanations: {
            0: 'Regarding overload: Fatigue is caused by cyclic loading.',
            2: 'Regarding creep: Fatigue is caused by cyclic loading.',
            3: 'Regarding erosion: Fatigue is caused by cyclic loading.',
          },
          hint: 'Think about what "repeated loading" means.',
        },
        {
          id: 'u10-L2-Q2',
          type: 'multiple-choice',
          question: 'What is the most likely failure mechanism?',
          options: [
            'General corrosion. switch to a thicker pipe wall for longer life',
            'Fatigue cracking from pressure cycles. reduce operating pressure',
            'Stress corrosion cracking. susceptible material, stress, and environment',
            'Erosion-corrosion from high flow velocity. reduce the flow rate'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="24" width="60" height="32" rx="2" fill="#58CC02" opacity="0.08"/> <rect x="10" y="24" width="60" height="32" rx="2" stroke="#3B8700" stroke-width="2" fill="none"/> <path d="M30,24 L30,56" stroke="#3B8700" stroke-width="1.5" opacity="0.4" stroke-dasharray="2,2"/> <path d="M50,24 Q42,40 50,56" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.5"> <animate attributeName="d" values="M50,24 Q48,40 50,56;M50,24 Q42,40 50,56;M50,24 Q48,40 50,56" dur="3s" repeatCount="indefinite"/> </path> <g opacity="0.3"> <line x1="50" y1="40" x2="56" y2="36" stroke="#A5E86C" stroke-width="1"/> <line x1="50" y1="40" x2="56" y2="44" stroke="#A5E86C" stroke-width="1"/> <line x1="50" y1="40" x2="44" y2="36" stroke="#A5E86C" stroke-width="1"/> <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite"/> </g> <line x1="4" y1="40" x2="10" y2="40" stroke="#3B8700" stroke-width="1.5" opacity="0.3"/> <polygon points="5,38.5 2,40 5,41.5" fill="#3B8700" opacity="0.3"/> <line x1="70" y1="40" x2="76" y2="40" stroke="#3B8700" stroke-width="1.5" opacity="0.3"/> <polygon points="75,38.5 78,40 75,41.5" fill="#3B8700" opacity="0.3"/> <text x="40" y="18" text-anchor="middle" font-size="4" fill="#334155" opacity="0.3" font-style="italic">crack propagation</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">failure analysis</text> </svg>',
          explanation: 'Stress corrosion cracking requires three simultaneous conditions.',
          distractorExplanations: {
            0: 'This focuses on general/corrosion., which is not the correct mechanism or principle for this problem.',
            1: 'Pressure alone does not explain the behavior described; the correct mechanism is different.',
            3: 'This focuses on erosion-corrosion/velocity., which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Three conditions are needed: susceptible material +.'
        }
      ]
    },
    {
      id: 'u10-L2b',
      title: 'Root Cause Analysis Tools',
      description: 'Fishbone diagrams, 5 Whys, FMEA, and systematic problem-solving approaches.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u10-L2b-NEW-T1',
          type: 'teaching',
          question: 'Systematic Problem Solving',
          explanation: 'Good failure analysis is systematic, not guesswork. Use structured tools like fishbone diagrams, 5 Whys, and FMEA to find the root cause instead of jumping to conclusions.',
          hint: 'Try this now: pick a common problem and ask "why?" 5 times.',
        },
        {
          id: 'u10-L2b-NEW-E1',
          type: 'true-false',
          question: 'The "5 Whys" technique involves asking "why?" repeatedly to dig past symptoms and find the root cause.',
          correctAnswer: true,
          explanation: 'Developed at Toyota, the 5 Whys peels back layers of symptoms until you reach the true root cause.',
          distractorExplanations: {
            1: 'Developed at Toyota, the 5 Whys peels back layers of symptoms until you reach the true root cause.',
          },
          hint: 'Each "why" digs one layer deeper.',
        },
        {
          id: 'u10-L2b-NEW-OS1',
          type: 'order-steps',
          question: 'Put these 8D problem-solving steps in order:',
          steps: [
            'Form a cross-functional team',
            'Define the problem clearly',
            'Implement interim containment',
            'Identify the root cause',
            'Implement permanent corrective action'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'The 8D process is sequential: team, problem, containment, root cause, then permanent fix.',
          hint: 'You need to contain the problem before you can fix it permanently.',
        },
        {
          id: 'u10-L2b-NEW-T2',
          type: 'teaching',
          question: 'FMEA Prioritizes Risks',
          explanation: 'FMEA rates each failure mode by Severity, Occurrence, and Detection. Multiply them together to get a Risk Priority Number (RPN). Fix the highest RPNs first.',
          hint: 'Try this now: rate a common product failure by severity (1-10), occurrence (1-10), and detection (1-10).',
        },
        {
          id: 'u10-L2b-NEW-E2',
          type: 'multiple-choice',
          question: 'In a fishbone diagram, what do the "bones" represent?',
          options: [
            'Customer complaints',
            'Steps in the manufacturing process',
            'Different product versions',
            'Potential causes grouped by category'
          ],
          correctIndex: 3,
          explanation: 'Fishbone (Ishikawa) diagrams organize potential causes into categories like Man, Machine, Method, Material.',
          distractorExplanations: {
            0: 'This focuses on customer/complaints, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on steps/manufacturing, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on different/product, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The diagram looks like a fish skeleton with cause categories.',
        },
        {
          id: 'u10-L2-Q3',
          type: 'true-false',
          question: 'In the 8D (Eight Disciplines) problem-solving methodology, the first step is to implement a permanent corrective action.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Specimen block --> <rect x="10" y="16" width="60" height="48" rx="1" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.03"/> <!-- Initial notch --> <path d="M10,40 L22,40" stroke-width="1" stroke="#58CC02"/> <!-- Growing crack --> <path d="M22,40 L28,41 L32,39 L36,40.5 L40,39.5 L44,40" stroke-width="0.8" stroke="#A5E86C" fill="none"> <animate attributeName="d" values="M22,40 L26,40.5 L28,39.5;M22,40 L28,41 L32,39 L36,40.5 L40,39.5 L44,40;M22,40 L28,41 L32,39 L36,40.5 L40,39.5 L44,40 L48,40.5 L52,39.5 L56,40" dur="6s" repeatCount="indefinite"/> </path> <!-- Crack tip stress field (plastic zone) --> <circle cx="44" cy="40" r="4" fill="#A5E86C" opacity="0.1"> <animate attributeName="cx" values="28;44;56" dur="6s" repeatCount="indefinite"/> <animate attributeName="r" values="2;4;6" dur="6s" repeatCount="indefinite"/> </circle> <!-- Cyclic load arrows --> <g opacity="0.4"> <line x1="40" y1="4" x2="40" y2="14" stroke-width="0.6" stroke="#58CC02"/> <polygon points="38.5,14 41.5,14 40,16" fill="#58CC02"/> <line x1="40" y1="76" x2="40" y2="66" stroke-width="0.6" stroke="#58CC02"/> <polygon points="38.5,66 41.5,66 40,64" fill="#58CC02"/> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <!-- Beach marks (striations) --> <g stroke="#58CC02" stroke-width="0.2" opacity="0.15"> <path d="M26,36 Q26,40 26,44" fill="none"/> <path d="M30,35 Q30,40 30,45" fill="none"/> <path d="M34,34.5 Q34,40 34,45.5" fill="none"/> <path d="M38,34 Q38,40 38,46" fill="none"/> <path d="M42,33.5 Q42,40 42,46.5" fill="none"/> </g> <!-- Crack length label --> <line x1="22" y1="50" x2="44" y2="50" stroke-width="0.3" stroke="#3B8700" opacity="0.3"/> <text x="33" y="54" font-size="3" fill="#3B8700" opacity="0.4" text-anchor="middle">a</text> <!-- da/dN label --> <text x="40" y="12" font-size="3" fill="#58CC02" opacity="0.4" text-anchor="middle">da/dN = C(ΔK)ᵐ</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">Paris law</text> </svg>',
          explanation: 'The 8D methodology follows a structured sequence: D1 (form a team), D2 (describe the problem), D3 (implement interim containment action .',
          distractorExplanations: {
            0: 'The 8D methodology follows a structured sequence: D1 (form a team), D2 (describe the problem), D3 (implement interim containment action .',
          },
          hint: 'The 8D methodology starts with team formation and problem.'
        }
      ]
    },
    {
      id: 'u10-L2c',
      title: 'Environment-Assisted Failures',
      description: 'Corrosion types, hydrogen embrittlement, stress corrosion cracking, and environment-driven failures.',
      icon: '📝',
      xpReward: 35,
      levels: 4,
      questions: [
        {
          id: 'u10-L2c-NEW-T1',
          type: 'teaching',
          question: 'Corrosion Is More Than Rust',
          explanation: 'Corrosion comes in many forms: pitting, crevice, galvanic, stress corrosion cracking, and erosion-corrosion. Each has different causes and different prevention strategies.',
          hint: 'Try this now: check if any metal items around you show signs of corrosion.',
        },
        {
          id: 'u10-L2c-NEW-E1',
          type: 'true-false',
          question: 'Galvanic corrosion requires two dissimilar metals and an electrolyte (conductive liquid) to occur.',
          correctAnswer: true,
          explanation: 'Without an electrolyte to carry ions, galvanic corrosion can\'t happen even with dissimilar metals touching.',
          distractorExplanations: {
            1: 'Without an electrolyte to carry ions, galvanic corrosion can\.',
          },
          hint: 'Think about the three requirements for galvanic corrosion.',
        },
        {
          id: 'u10-L2-Q4',
          type: 'multiple-choice',
          question: 'Walk me through how you would approach debugging a product that fails intermittently in the field but works fine in the lab.',
          options: [
            'The field failures are user error. provide better training documentation',
            'Replicate field conditions in the lab: temperature, humidity, vibration, duty',
            'Increase the safety factor by 50% and ship an updated design immediately',
            'Add more sensors to the product and wait for more field data before acting'

          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Plate with hole --> <rect x="8" y="18" width="64" height="44" rx="1" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.03"/> <!-- Central hole --> <circle cx="40" cy="40" r="8" stroke-width="0.8" stroke="#58CC02" fill="white"/> <!-- Stress flow lines (curving around hole) --> <g stroke="#58CC02" stroke-width="0.4" opacity="0.35"> <path d="M8,24 Q30,24 32,34 Q34,38 32,42 Q30,52 8,56" fill="none"/> <path d="M8,28 Q28,28 33,36 Q34,38 33,42 Q28,50 8,52" fill="none"/> <path d="M8,36 Q26,36 32,38 Q34,40 32,42 Q26,44 8,44" fill="none"/> <path d="M72,24 Q50,24 48,34 Q46,38 48,42 Q50,52 72,56" fill="none"/> <path d="M72,28 Q52,28 47,36 Q46,38 47,42 Q52,50 72,52" fill="none"/> <path d="M72,36 Q54,36 48,38 Q46,40 48,42 Q54,44 72,44" fill="none"/> </g> <!-- Stress concentration zones (top and bottom of hole) --> <g fill="#A5E86C" opacity="0.2"> <ellipse cx="40" cy="32" rx="4" ry="2"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </ellipse> <ellipse cx="40" cy="48" rx="4" ry="2"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </ellipse> </g> <!-- Tension arrows --> <g opacity="0.5"> <line x1="2" y1="40" x2="7" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="2,38.5 2,41.5 -1,40" fill="#58CC02"/> <line x1="78" y1="40" x2="73" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="78,38.5 78,41.5 81,40" fill="#58CC02"/> <text x="-2" y="43" font-size="3" fill="#58CC02">σ</text> <text x="78" y="43" font-size="3" fill="#58CC02">σ</text> </g> <!-- Kt label --> <text x="40" y="14" text-anchor="middle" font-size="4" fill="#58CC02" opacity="0.5">K_t = σ_max/σ_nom</text> <!-- Max stress indicator --> <text x="40" y="30" font-size="2.5" fill="#A5E86C" opacity="0.4" text-anchor="middle">σ_max</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">notch effect</text> </svg>',
          explanation: 'Intermittent field failures that cannot be reproduced in the lab almost always stem from environmental or usage differences. A structured approach: Gather field data .',
          distractorExplanations: {
            0: 'This focuses on failures/error., which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on increase/safety, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on sensors/product, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'What differences exist between the lab environment.'
        },
        {
          id: 'u10-L2-Q5',
          type: 'multiple-choice',
          question: 'In a fishbone (Ishikawa) diagram for manufacturing defect analysis, which of the following is NOT one of the standard "6M" categories?',
          options: [
            'Man (People)',
            'Machine',
            'Method',
            'Marketing'
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Material plate --> <rect x="6" y="20" width="68" height="40" rx="6" fill="#58CC02" opacity="0.06"/> <rect x="6" y="20" width="68" height="40" rx="6" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Initial edge notch (V-shape stress riser) --> <path d="M6,37 L13,40 L6,43" stroke="#3B8700" stroke-width="1.2" fill="none" opacity="0.25"/> <!-- Crack opening displacement wedge (widens behind tip) --> <path fill="#3B8700" opacity="0"> <animate attributeName="d" values="M6,40 L6,40 L6,40 L6,40 Z;M6,38 L55,39.7 L55,40.3 L6,42 Z;M6,40 L6,40 L6,40 L6,40 Z" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.12;0" dur="4s" repeatCount="indefinite"/> </path> <!-- Main crack line (propagates from notch) --> <line y1="40" x1="12" y2="40" stroke="#3B8700" stroke-width="2" stroke-linecap="round"> <animate attributeName="x2" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> </line> <!-- Crack tip plastic zone (stress intensity) --> <circle cy="40" r="4" fill="#58CC02" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.2;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="3;7;3" dur="4s" repeatCount="indefinite"/> </circle> <!-- Inner yield zone (smaller, darker) --> <circle cy="40" r="2" fill="#3B8700" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.15;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite"/> </circle> <!-- Microcracks. branch up and down as main crack passes --> <line x1="24" y1="40" x2="27" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.25;0.3;0.8;1"/> </line> <line x1="24" y1="40" x2="21" y2="46" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.27;0.32;0.8;1"/> </line> <line x1="37" y1="40" x2="40" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.42;0.47;0.8;1"/> </line> <line x1="37" y1="40" x2="34" y2="47" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.44;0.49;0.8;1"/> </line> <line x1="48" y1="40" x2="51" y2="35" stroke="#A5E86C" stroke-width="0.7" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.58;0.63;0.8;1"/> </line> <!-- Tensile stress arrows (Mode I. opening) --> <!-- Top arrows (2) pulling up --> <line x1="28" y1="16" x2="28" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,16 28,13 29.5,16" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="16" x2="52" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,16 52,13 53.5,16" fill="#3B8700" opacity="0.2"/> <!-- Bottom arrows (2) pulling down --> <line x1="28" y1="60" x2="28" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,64 28,67 29.5,64" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="60" x2="52" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,64 52,67 53.5,64" fill="#3B8700" opacity="0.2"/> <!-- Stress label --> <text x="40" y="11" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> <text x="40" y="73" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> </svg>',
          explanation: 'The 6M categories in a fishbone diagram are.',
          distractorExplanations: {
            0: 'Regarding people: The 6M categories in a fishbone diagram are.',
            1: 'Regarding machine: The 6M categories in a fishbone diagram are.',
            2: 'Regarding method: The 6M categories in a fishbone diagram are.',
          },
          hint: 'The 6Ms: Man, Machine, Method, Material, Measurement,.'
        },
        {
          id: 'u10-L2c-NEW-SB1',
          type: 'sort-buckets',
          question: 'Sort these failure mechanisms by their primary driver:',
          options: [
            'Stress corrosion cracking',
            'Fatigue',
            'Galvanic corrosion',
            'Creep',
            'Hydrogen embrittlement',
            'Overload'
          ],
          buckets: [
            'Environment-assisted',
            'Mechanical loading'
          ],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Environment-assisted failures need specific chemical or thermal conditions. Mechanical failures are driven by loads.',
          hint: 'Which failures require a specific environment to occur?',
        },
        {
          id: 'u10-L2c-NEW-T2',
          type: 'teaching',
          question: 'Hidden Environmental Damage',
          explanation: 'Some failures happen below yield strength. Stress corrosion cracking, hydrogen embrittlement, and temper embrittlement can cause sudden failure in parts that look perfectly fine on the surface.',
          hint: 'Always ask: what fluids, temperatures, and chemicals is the part exposed to?',
        },
        {
          id: 'u10-L2c-NEW-E2',
          type: 'multiple-choice',
          question: 'Stress corrosion cracking requires three simultaneous conditions. Which is NOT one of them?',
          options: [
            'High rotational speed',
            'A susceptible material',
            'Tensile stress',
            'A corrosive environment'
          ],
          correctIndex: 0,
          explanation: 'SCC needs: susceptible material + tensile stress + corrosive environment. Speed is not a factor.',
          distractorExplanations: {
            1: 'This focuses on susceptible/material, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on tensile/stress, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on corrosive/environment, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about what "stress corrosion cracking" literally means.',
        },
        {
          id: 'u10-L2-Q6',
          type: 'fill-blank',
          question: 'The failure analysis technique of asking "why _____?',
          blanks: ['5'],
          wordBank: ['5', '3', '7', '10', '8'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,63.5 74,66.5 76,65" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="76" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">time</text> <text x="6" y="36" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">ε</text> <!-- Creep curve: instantaneous → primary → secondary (steady) → tertiary → rupture --> <path d="M12,58 L14,42 Q18,36 24,34 L46,28 Q56,24 62,18 L66,12" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"> <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Region separators (dashed verticals) --> <line x1="18" y1="36" x2="18" y2="65" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2.5" opacity="0"> <animate attributeName="opacity" values="0;0;0.15;0.15;0" keyTimes="0;0.1;0.15;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <line x1="50" y1="26" x2="50" y2="65" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2.5" opacity="0"> <animate attributeName="opacity" values="0;0;0.15;0.15;0" keyTimes="0;0.38;0.42;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Region labels --> <text x="12" y="72" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.06;0.1;0.82;1" dur="6s" repeatCount="indefinite"/>I</text> <text x="32" y="72" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.18;0.22;0.82;1" dur="6s" repeatCount="indefinite"/>II (steady)</text> <text x="58" y="72" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.42;0.46;0.82;1" dur="6s" repeatCount="indefinite"/>III</text> <!-- Rupture X --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.5;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="63" y1="9" x2="69" y2="15" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="69" y1="9" x2="63" y2="15" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> </g> <!-- Tracing dot --> <circle r="3" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,58 L14,42 Q18,36 24,34 L46,28 Q56,24 62,18 L66,12" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'The 5 Whys method (developed by Sakichi Toyoda, used at Toyota) involves asking "Why?" iteratively to peel back layers of symptoms and reach the true root cause. Example: Bearing failed -> Why?',
          hint: 'This Toyota-originated method uses repeated questioning.'
        }
      ]
    },
    {
      id: 'u10-L3',
      title: 'Material Selection Basics',
      description: 'Ashby charts, material indices, and how to pick the right material for the loading type.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u10-L3-NEW-T1',
          type: 'teaching',
          question: 'Material Selection Is About Trade-offs',
          explanation: 'There\'s no best material. There\'s only the best material for your specific constraints: cost, weight, strength, temperature, corrosion resistance, and manufacturability.',
          hint: 'Try this now: pick an everyday object and think about why that specific material was chosen.',
        },
        {
          id: 'u10-L3-NEW-E1',
          type: 'true-false',
          question: 'When an interviewer asks "which material is best?" the right first response is to ask what the constraints and priorities are.',
          correctAnswer: true,
          explanation: 'Material selection always depends on context. Asking about constraints shows engineering maturity.',
          distractorExplanations: {
            1: 'Material selection always depends on context.',
          },
          hint: 'There\'s no universal "best" material.',
        },
        {
          id: 'u10-L3-Q1',
          type: 'multiple-choice',
          question: 'Steel has E = 200 GPa and density 7850 kg/m^3. Which is better for a bending beam?',
          options: [
            'Steel. it has 3x the stiffness of aluminum, so less material is needed',
            'Aluminum. it is lighter and stiffness does not matter for beams',
            'For a beam in bending, the material index is E^(1/2)/rho',
            'They are identical because E/rho is the same for both metals'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve. animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker. appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker. appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker. appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot. follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: 'For minimum-weight design, the correct material index depends on the loading mode. Tension/compression: E/rho (steel and aluminum are nearly equal at ~25.5).',
          distractorExplanations: {
            0: 'This focuses on steel./stiffness, which is not the correct mechanism or principle for this problem.',
            1: 'This incorrectly denies an effect that is relevant to aluminum lighter and significant in this context.',
            3: 'This focuses on identical/because, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The material index changes with loading mode: E/rho.'
        },
        {
          id: 'u10-L3-NEW-MP1',
          type: 'match-pairs',
          question: 'Match each loading mode to its lightweight material index:',
          options: [
            'Tension (min weight)',
            'Bending (min weight)',
            'Buckling (min weight)',
            'Thermal insulation'
          ],
          matchTargets: [
            'sigma_y / rho',
            'sigma_y^(2/3) / rho',
            'E^(1/2) / rho',
            '1 / k (thermal conductivity)'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Different loading modes require different property combinations for optimal lightweight design.',
          hint: 'Each loading mode has a unique material index.',
        },
        {
          id: 'u10-L3-NEW-T2',
          type: 'teaching',
          question: 'Ashby Charts Map Material Properties',
          explanation: 'Ashby charts plot one property vs another (like strength vs density) so you can visually compare material families. Different loading modes need different material indices.',
          hint: 'Try this now: think about whether you\'d optimize for strength/weight or stiffness/weight in a bike frame.',
        },
        {
          id: 'u10-L3-NEW-E2',
          type: 'multiple-choice',
          question: 'What does a material index help you do?',
          options: [
            'Find the material\'s price',
            'Calculate exact stress values',
            'Determine the manufacturing process',
            'Rank materials for a specific loading scenario'
          ],
          correctIndex: 3,
          explanation: 'Material indices like E/rho or sigma_y/rho rank materials for specific loading modes (tension, bending, etc.).',
          distractorExplanations: {
            0: 'This focuses on material\, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on calculate/exact, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on determine/manufacturing, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Material indices combine properties relevant to your design goal.',
        },
        {
          id: 'u10-L3-Q2',
          type: 'multiple-choice',
          question: 'A Pugh matrix is used for concept selection. What is its key advantage over other decision methods?',
          options: [
            'It provides exact numerical optimization of design parameters',
            'It enables systematic comparison of multiple design concepts against weighted',
            'It eliminates the need for engineering judgment in design selection',
            'It automatically generates the optimal design solution. though this factor'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="8" y="8" width="28" height="28" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="8" y="8" width="28" height="28" rx="4" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"/> <rect x="44" y="8" width="28" height="28" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="44" y="8" width="28" height="28" rx="4" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"/> <rect x="8" y="44" width="28" height="28" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="8" y="44" width="28" height="28" rx="4" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"/> <rect x="44" y="44" width="28" height="28" rx="4" fill="#A5E86C" opacity="0.1"/> <rect x="44" y="44" width="28" height="28" rx="4" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <line x1="36" y1="22" x2="44" y2="22" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <polygon points="43,20.5 46,22 43,23.5" fill="#3B8700" opacity="0.2"/> <line x1="22" y1="36" x2="22" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <polygon points="20.5,43 22,46 23.5,43" fill="#3B8700" opacity="0.2"/> <line x1="58" y1="36" x2="58" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <polygon points="56.5,43 58,46 59.5,43" fill="#3B8700" opacity="0.2"/> <line x1="36" y1="58" x2="44" y2="58" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <polygon points="43,56.5 46,58 43,59.5" fill="#3B8700" opacity="0.2"/> <text x="22" y="24" text-anchor="middle" font-size="5" fill="#334155" opacity="0.4" font-weight="bold">1</text> <text x="58" y="24" text-anchor="middle" font-size="5" fill="#334155" opacity="0.4" font-weight="bold">2</text> <text x="22" y="60" text-anchor="middle" font-size="5" fill="#334155" opacity="0.4" font-weight="bold">3</text> <text x="58" y="60" text-anchor="middle" font-size="5" fill="#334155" opacity="0.4" font-weight="bold">4</text> <circle cx="58" cy="58" r="6" fill="#58CC02" opacity="0.15"> <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'The Pugh matrix compares design concepts against a reference (datum) design using criteria scored as better (+), same (S), or worse (-).',
          distractorExplanations: {
            0: 'This focuses on provides/exact, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on eliminates/engineering, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on automatically/generates, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The Pugh matrix compares alternatives to a datum using.'
        }
      ]
    },
    {
      id: 'u10-L3b',
      title: 'DFM, DFA & Cost Reduction',
      description: 'Design for Manufacturing, Design for Assembly, and systematic cost reduction approaches.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u10-L3b-NEW-T1',
          type: 'teaching',
          question: 'Fewer Parts Means Lower Cost',
          explanation: 'Design for Assembly (DFA) reduces part count. For each part, ask: does it move relative to neighbors? Must it be a different material? Must it be separate for assembly? If all answers are no, combine it.',
          hint: 'Try this now: pick a product and count how many parts could be combined.',
        },
        {
          id: 'u10-L3b-NEW-E1',
          type: 'true-false',
          question: 'Design for Manufacturing (DFM) aims to make individual parts easier and cheaper to produce.',
          correctAnswer: true,
          explanation: 'DFM simplifies each part. DFA reduces the total number of parts. Both lower cost.',
          distractorExplanations: {
            1: 'DFM simplifies each part.',
          },
          hint: 'DFM focuses on individual part simplicity.',
        },
        {
          id: 'u10-L3b-NEW-SB1',
          type: 'sort-buckets',
          question: 'Sort these strategies into DFM or DFA:',
          options: [
            'Reduce part count',
            'Add draft angles to castings',
            'Use self-locating features',
            'Avoid undercuts in molding',
            'Design for top-down assembly',
            'Use standard tooling sizes'
          ],
          buckets: [
            'DFA (assembly)',
            'DFM (manufacturing)'
          ],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'DFA focuses on assembly simplicity (fewer parts, easier assembly). DFM focuses on making each part easier to produce.',
          hint: 'Think about whether the strategy helps assembly or manufacturing.',
        },
        {
          id: 'u10-L3b-NEW-T2',
          type: 'teaching',
          question: 'Tolerances Drive Cost',
          explanation: 'Tighter tolerances cost more. A part machined to +/- 0.01 mm costs much more than one at +/- 0.1 mm. Only tighten tolerances where function actually requires it.',
          hint: 'Try this now: think about which dimensions on a bracket actually need tight tolerances.',
        },
        {
          id: 'u10-L3b-NEW-E2',
          type: 'multiple-choice',
          question: 'Which approach typically reduces manufacturing cost the most?',
          options: [
            'Using exotic materials',
            'Relaxing non-critical tolerances',
            'Adding more inspection steps',
            'Making parts thicker'
          ],
          correctIndex: 1,
          explanation: 'Relaxing tolerances on non-critical features is often the single biggest cost saver.',
          distractorExplanations: {
            0: 'This focuses on using/exotic, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on adding/inspection, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on making/parts, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Tight tolerances require more precise (expensive) processes.',
        },
        {
          id: 'u10-L3-Q3',
          type: 'true-false',
          question: 'Design for Assembly (DFA) primarily focuses on reducing the total number of parts in a product, while Design for Manufacturing?',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="8" y="22" width="28" height="36" rx="3" fill="#58CC02" opacity="0.08"/> <rect x="8" y="22" width="28" height="36" rx="3" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"/> <circle cx="22" cy="34" r="6" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.2"/> <rect x="16" y="44" width="12" height="8" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.2"/> <line x1="36" y1="40" x2="44" y2="40" stroke="#3B8700" stroke-width="1.5" opacity="0.3"/> <polygon points="43,38.5 46,40 43,41.5" fill="#3B8700" opacity="0.3"/> <rect x="44" y="22" width="28" height="36" rx="3" fill="#A5E86C" opacity="0.08"/> <rect x="44" y="22" width="28" height="36" rx="3" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <rect x="50" y="28" width="16" height="24" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.2"/> <circle cx="58" cy="40" r="4" fill="#58CC02" opacity="0.15"> <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite"/> </circle> <text x="22" y="68" text-anchor="middle" font-size="3.5" fill="#334155" opacity="0.3">design</text> <text x="58" y="68" text-anchor="middle" font-size="3.5" fill="#334155" opacity="0.3">mfg</text> </svg>',
          explanation: 'DFA aims to minimize part count by asking three questions for each part: Does it move relative to adjacent parts? Does it need to be different material?',
          distractorExplanations: {
            1: 'DFA aims to minimize part count by asking three questions for each part: Does it move relative to adjacent parts? Does it need to be diff...',
          },
          hint: 'DFA reduces the number of parts; DFM simplifies each.'
        }
      ]
    },
    {
      id: 'u10-L3c',
      title: 'Decision Matrices & Optimization',
      description: 'Pugh matrices, weighted decision tables, and multi-objective optimization in design.',
      icon: '📝',
      xpReward: 35,
      levels: 4,
      questions: [
        {
          id: 'u10-L3c-NEW-T1',
          type: 'teaching',
          question: 'Structured Decision Making',
          explanation: 'A Pugh matrix compares design concepts against a reference design. Rate each concept as better (+), same (S), or worse (-) on each criterion. The concept with the most plusses wins.',
          hint: 'Try this now: compare two phone cases on 5 criteria using +/S/-.',
        },
        {
          id: 'u10-L3c-NEW-E1',
          type: 'true-false',
          question: 'A Pugh matrix compares design alternatives against a reference (datum) design using simple better/same/worse ratings.',
          correctAnswer: true,
          explanation: 'The Pugh matrix is a quick concept screening tool that doesn\'t require numerical scores.',
          distractorExplanations: {
            1: 'The Pugh matrix is a quick concept screening tool that doesn\.',
          },
          hint: 'It uses +, S, and - ratings.',
        },
        {
          id: 'u10-L3-Q4',
          type: 'multiple-choice',
          question: 'Walk me through your approach." Which response demonstrates the best engineering thinking?',
          options: [
            'Systematically analyze material cost, tolerance relaxation on non-critical',
            'Reduce all tolerances by 30% to decrease machining time proportionally . ',
            'Use cheaper material. this is always the biggest cost driver',
            'Switch to 3D printing. additive manufacturing is always cheaper than machining'

          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="24" y="6" width="32" height="12" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="24" y="6" width="32" height="12" rx="3" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"/> <line x1="40" y1="18" x2="40" y2="26" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <polygon points="38.5,25 40,28 41.5,25" fill="#3B8700" opacity="0.3"/> <rect x="20" y="28" width="40" height="12" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="20" y="28" width="40" height="12" rx="3" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="48" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <polygon points="38.5,47 40,50 41.5,47" fill="#3B8700" opacity="0.3"/> <rect x="24" y="50" width="32" height="12" rx="3" fill="#A5E86C" opacity="0.1"/> <rect x="24" y="50" width="32" height="12" rx="3" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <line x1="40" y1="62" x2="40" y2="70" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <polygon points="38.5,69 40,72 41.5,69" fill="#3B8700" opacity="0.3"/> <circle cx="40" cy="76" r="3" fill="#3B8700" opacity="0.2"/> </svg>',
          explanation: 'A systematic approach considers all cost drivers.',
          distractorExplanations: {
            1: 'This focuses on reduce/tolerances, which is not the correct mechanism or principle for this problem.',
            2: 'This "always" claim is too broad; cheaper material the principle has important exceptions.',
            3: 'This "always" claim is too broad; switch printing the principle has important exceptions.',
          },
          hint: 'Good engineering is systematic.'
        },
        {
          id: 'u10-L3-Q5',
          type: 'multiple-choice',
          question: 'How do you approach material and process selection among sheet metal, die casting, and injection-molded plastic?',
          options: [
            'Always choose the cheapest material. injection-molded plastic is the obvious',
            'Always choose the strongest material. die cast aluminum guarantees structural',
            'Evaluate each option against functional requirements, then compare unit cost',
            'Pick whatever the previous product version used. changing materials is too'

          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Top plate --> <rect x="10" y="24" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="24" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bottom plate --> <rect x="10" y="36" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="36" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bolt shaft (through both plates) --> <rect x="38" y="16" width="4" height="38" rx="1" fill="#3B8700" opacity="0.25"/> <rect x="38" y="16" width="4" height="38" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Bolt head (hex, top) --> <rect x="34" y="12" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="12" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Nut (hex, bottom) --> <rect x="34" y="52" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="52" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Washer (top) --> <rect x="36" y="18" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Washer (bottom) --> <rect x="36" y="50" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Thread marks on bolt shaft --> <line x1="38.5" y1="44" x2="41.5" y2="43" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="46" x2="41.5" y2="45" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="48" x2="41.5" y2="47" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <!-- Preload/clamping force arrows (pulsing) --> <g> <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/> <!-- Bolt tension (upward on bolt) --> <line x1="40" y1="22" x2="40" y2="16" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,17 40,14 41.5,17" fill="#3B8700"/> <!-- Bolt tension (downward on bolt) --> <line x1="40" y1="48" x2="40" y2="54" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,53 40,56 41.5,53" fill="#3B8700"/> <!-- Clamping compression (plates pushed together) --> <polygon points="24,22 26,19 28,22" fill="#58CC02" opacity="0.5"/> <polygon points="24,48 26,51 28,48" fill="#58CC02" opacity="0.5"/> <polygon points="52,22 54,19 56,22" fill="#58CC02" opacity="0.5"/> <polygon points="52,48 54,51 56,48" fill="#58CC02" opacity="0.5"/> </g> <!-- Labels --> <text x="22" y="10" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">F_preload</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">clamping force</text> </svg>',
          explanation: 'Material and process selection is always context-dependent.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; choose cheapest the principle has important exceptions.',
            1: 'This "always" claim is too broad; choose strongest the principle has important exceptions.',
            3: 'This focuses on whatever/previous, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The right process depends on volume, performance.'
        },
        {
          id: 'u10-L3c-NEW-OS1',
          type: 'order-steps',
          question: 'Put these design decision steps in order:',
          steps: [
            'Define requirements and constraints',
            'Generate multiple design concepts',
            'Evaluate concepts against criteria',
            'Select the best concept',
            'Refine and detail the chosen design'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Good design follows a structured process: define, generate, evaluate, select, then refine.',
          hint: 'You can\'t select a concept before you\'ve generated alternatives.',
        },
        {
          id: 'u10-L3c-NEW-T2',
          type: 'teaching',
          question: 'Weight Your Criteria',
          explanation: 'Not all criteria matter equally. A weighted decision matrix multiplies each score by the criterion\'s importance weight. Safety might get weight 10 while color gets weight 1.',
          hint: 'Try this now: rank 5 criteria for buying a car by importance.',
        },
        {
          id: 'u10-L3c-NEW-E2',
          type: 'multiple-choice',
          question: 'In a weighted decision matrix, what happens if you give all criteria equal weight?',
          options: [
            'Costs are automatically minimized',
            'The matrix becomes more accurate',
            'Unimportant factors influence the result as much as critical ones',
            'All designs score the same'
          ],
          correctIndex: 2,
          explanation: 'Equal weighting treats color preference the same as structural integrity. Weight critical criteria higher.',
          distractorExplanations: {
            0: 'This focuses on costs/automatically, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on matrix/becomes, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on designs/score, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about what "weight" means in decision-making.',
        },
        {
          id: 'u10-L3-Q6',
          type: 'fill-blank',
          question: 'The material selection charts that plot one material property against another on log-log scales, enabling systematic material _____ _____?',
          blanks: ['strength', 'Ashby'],
          wordBank: ['strength', 'Ashby', 'hardness', 'Moody', 'Pareto', 'Pugh'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="26" y="4" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <circle cx="40" cy="12" r="3" fill="#3B8700"/> <polyline stroke="#58CC02" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"> <animate attributeName="points" dur="2.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" values=" 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64; 40,14 40,18 28,24 52,30 28,36 52,42 28,48 52,54 28,60 52,66 28,72 52,78 40,82 40,84; 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64 "/> </polyline> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,20;0,0" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/> <rect x="26" y="64" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <rect x="26" y="64" width="28" height="6" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <text x="22" y="42" font-size="8" fill="#3B8700" font-style="italic" opacity="0.35">k</text> </svg>',
          explanation: 'Ashby charts (developed by Prof. Mike Ashby at Cambridge University) plot material property pairs (such as strength vs. density, or modulus vs.',
          hint: 'Named after the Cambridge professor who developed.'
        }
      ]
    },
    {
      id: 'u10-L4',
      title: 'FEA Mesh & Elements',
      description: 'Element types, mesh quality metrics, and how mesh density affects accuracy.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u10-L4-NEW-T1',
          type: 'teaching',
          question: 'FEA Approximates Reality',
          explanation: 'Finite Element Analysis divides a complex shape into simple elements, solves equations for each, and assembles the results. It\'s an approximation. Finer mesh means better accuracy but longer solve time.',
          hint: 'Try this now: imagine dividing a bracket into tiny triangles.',
        },
        {
          id: 'u10-L4-NEW-E1',
          type: 'true-false',
          question: 'In FEA, using a finer (denser) mesh generally improves accuracy but increases computation time.',
          correctAnswer: true,
          explanation: 'More elements means better approximation of the geometry and stress field, but solving takes longer.',
          distractorExplanations: {
            1: 'More elements means better approximation of the geometry and stress field, but solving takes longer.',
          },
          hint: 'Think about the trade-off between accuracy and speed.',
        },
        {
          id: 'u10-L4-Q1',
          type: 'multiple-choice',
          question: 'In an FEA stress analysis, you observe that the maximum stress at a sharp re-entrant corner keeps increasing as you refine the?',
          options: [
            'The stress is extremely high and increasing. the part will definitely fail',
            'The model has diverged and all results are invalid. start over with different',
            'The sharp corner creates a stress singularity where theoretical elastic stress',
            'Just use the stress from the coarsest mesh. that is the most conservative'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="12" y="12" width="56" height="56" rx="2" fill="#58CC02" opacity="0.04"/> <g stroke="#58CC02" stroke-width="0.5" opacity="0.2"> <line x1="12" y1="26" x2="68" y2="26"/> <line x1="12" y1="40" x2="68" y2="40"/> <line x1="12" y1="54" x2="68" y2="54"/> <line x1="26" y1="12" x2="26" y2="68"/> <line x1="40" y1="12" x2="40" y2="68"/> <line x1="54" y1="12" x2="54" y2="68"/> </g> <g stroke="#58CC02" stroke-width="0.3" opacity="0.15"> <line x1="12" y1="12" x2="26" y2="26"/> <line x1="26" y1="12" x2="40" y2="26"/> <line x1="40" y1="12" x2="54" y2="26"/> <line x1="54" y1="12" x2="68" y2="26"/> <line x1="12" y1="26" x2="26" y2="40"/> <line x1="26" y1="26" x2="40" y2="40"/> <line x1="40" y1="26" x2="54" y2="40"/> <line x1="54" y1="26" x2="68" y2="40"/> <line x1="12" y1="40" x2="26" y2="54"/> <line x1="26" y1="40" x2="40" y2="54"/> <line x1="40" y1="40" x2="54" y2="54"/> <line x1="54" y1="40" x2="68" y2="54"/> <line x1="12" y1="54" x2="26" y2="68"/> <line x1="26" y1="54" x2="40" y2="68"/> <line x1="40" y1="54" x2="54" y2="68"/> <line x1="54" y1="54" x2="68" y2="68"/> </g> <rect x="12" y="12" width="56" height="56" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.3"/> <ellipse cx="54" cy="26" rx="8" ry="8" fill="#A5E86C" opacity="0.15"> <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite"/> </ellipse> <text x="54" y="28" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.4" font-style="italic">stress</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">FEA mesh</text> </svg>',
          explanation: 'Sharp re-entrant corners create stress singularities where the theoretical elastic stress is mathematically infinite.',
          distractorExplanations: {
            0: 'This focuses on extremely/increasing., which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on model/diverged, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on coarsest/mesh., which is not the correct mechanism or principle for this problem.',
          },
          hint: 'What happens to the theoretical stress at a perfectly.'
        },
        {
          id: 'u10-L4-NEW-MP1',
          type: 'match-pairs',
          question: 'Match each FEA term to its meaning:',
          options: [
            'Node',
            'Element',
            'Boundary condition',
            'Convergence'
          ],
          matchTargets: [
            'A point in the mesh',
            'A small piece of the geometry',
            'A constraint or load applied to the model',
            'Results stabilize as mesh is refined'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'These are the fundamental concepts of FEA that every engineer should know.',
          hint: 'Each term describes a basic FEA building block.',
        },
        {
          id: 'u10-L4-NEW-T2',
          type: 'teaching',
          question: 'Element Type Matters',
          explanation: 'Linear elements (4-node tet, 8-node hex) are fast but less accurate for bending. Quadratic elements (10-node tet, 20-node hex) capture bending much better with fewer elements.',
          hint: 'Try this now: think about which is cheaper: more simple elements or fewer complex ones?',
        },
        {
          id: 'u10-L4-NEW-E2',
          type: 'multiple-choice',
          question: 'What is a "mesh" in FEA?',
          options: [
            'The solver algorithm',
            'The loading conditions applied to the model',
            'The material property database',
            'The network of elements that divide the geometry'
          ],
          correctIndex: 3,
          explanation: 'A mesh is the collection of nodes and elements that discretize the continuous geometry.',
          distractorExplanations: {
            0: 'This focuses on solver/algorithm, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on loading/conditions, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on material/property, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about dividing a shape into small pieces.',
        },
        {
          id: 'u10-L4-Q2',
          type: 'multiple-choice',
          question: 'Which approach is most appropriate for structural-level analysis where you need stress distribution in the joined parts?',
          options: [
            'Model every thread of every bolt with fine mesh for maximum accuracy,',
            'Use beam elements or rigid connectors with appropriate preload, connected',
            'Ignore the bolts entirely and model the joint as a continuous body, across',
            'Apply a fixed boundary condition at all bolt hole locations, based'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Plate with hole --> <rect x="8" y="18" width="64" height="44" rx="1" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.03"/> <!-- Central hole --> <circle cx="40" cy="40" r="8" stroke-width="0.8" stroke="#58CC02" fill="white"/> <!-- Stress flow lines (curving around hole) --> <g stroke="#58CC02" stroke-width="0.4" opacity="0.35"> <path d="M8,24 Q30,24 32,34 Q34,38 32,42 Q30,52 8,56" fill="none"/> <path d="M8,28 Q28,28 33,36 Q34,38 33,42 Q28,50 8,52" fill="none"/> <path d="M8,36 Q26,36 32,38 Q34,40 32,42 Q26,44 8,44" fill="none"/> <path d="M72,24 Q50,24 48,34 Q46,38 48,42 Q50,52 72,56" fill="none"/> <path d="M72,28 Q52,28 47,36 Q46,38 47,42 Q52,50 72,52" fill="none"/> <path d="M72,36 Q54,36 48,38 Q46,40 48,42 Q54,44 72,44" fill="none"/> </g> <!-- Stress concentration zones (top and bottom of hole) --> <g fill="#A5E86C" opacity="0.2"> <ellipse cx="40" cy="32" rx="4" ry="2"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </ellipse> <ellipse cx="40" cy="48" rx="4" ry="2"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </ellipse> </g> <!-- Tension arrows --> <g opacity="0.5"> <line x1="2" y1="40" x2="7" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="2,38.5 2,41.5 -1,40" fill="#58CC02"/> <line x1="78" y1="40" x2="73" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="78,38.5 78,41.5 81,40" fill="#58CC02"/> <text x="-2" y="43" font-size="3" fill="#58CC02">σ</text> <text x="78" y="43" font-size="3" fill="#58CC02">σ</text> </g> <!-- Kt label --> <text x="40" y="14" text-anchor="middle" font-size="4" fill="#58CC02" opacity="0.5">K_t = σ_max/σ_nom</text> <!-- Max stress indicator --> <text x="40" y="30" font-size="2.5" fill="#A5E86C" opacity="0.4" text-anchor="middle">σ_max</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">notch effect</text> </svg>',
          explanation: 'Modeling individual bolt threads is computationally expensive and unnecessary for structural analysis.',
          distractorExplanations: {
            0: 'This focuses on model/every, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on ignore/bolts, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on apply/fixed, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Consider the appropriate level of modeling detail.'
        }
      ]
    },
    {
      id: 'u10-L4b',
      title: 'Boundary Conditions & Convergence',
      description: 'Applying boundary conditions correctly, checking convergence, and common modeling mistakes.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u10-L4b-NEW-T1',
          type: 'teaching',
          question: 'Boundary Conditions Make or Break FEA',
          explanation: 'Wrong boundary conditions give wrong answers, no matter how fine your mesh. Always verify that your constraints match reality. Over-constraining makes the model too stiff.',
          hint: 'Try this now: think about how you\'d constrain a simply-supported beam in FEA.',
        },
        {
          id: 'u10-L4b-NEW-E1',
          type: 'true-false',
          question: 'Fixing all 6 degrees of freedom at a support creates a fully fixed (encastre) boundary condition.',
          correctAnswer: true,
          explanation: 'Fixing all translations and rotations at a node models a perfectly rigid wall mount.',
          distractorExplanations: {
            1: 'Fixing all translations and rotations at a node models a perfectly rigid wall mount.',
          },
          hint: 'Six DOF means 3 translations + 3 rotations.',
        },
        {
          id: 'u10-L4b-NEW-OS1',
          type: 'order-steps',
          question: 'Put these FEA workflow steps in order:',
          steps: [
            'Import or create geometry',
            'Assign material properties',
            'Apply mesh to the geometry',
            'Apply loads and boundary conditions',
            'Run the solver and check convergence'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'The standard FEA workflow: geometry, materials, mesh, loads/BCs, then solve.',
          hint: 'You need geometry before you can mesh it.',
        },
        {
          id: 'u10-L4b-NEW-T2',
          type: 'teaching',
          question: 'Check Convergence Before Trusting Results',
          explanation: 'Run your model with 2-3 different mesh densities. If the peak stress changes less than 5% between meshes, you\'ve converged. If it keeps changing, refine further.',
          hint: 'Try this now: think about what would happen if you never checked convergence.',
        },
        {
          id: 'u10-L4b-NEW-E2',
          type: 'multiple-choice',
          question: 'What does "mesh convergence" mean in FEA?',
          options: [
            'The model matches the CAD geometry exactly',
            'The solver finishes running',
            'All elements have the same size',
            'Results stop changing significantly as you refine the mesh'
          ],
          correctIndex: 3,
          explanation: 'Convergence means your results are mesh-independent. Further refinement won\'t change the answer.',
          distractorExplanations: {
            0: 'This focuses on model/matches, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on solver/finishes, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on elements, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about what "converge" means mathematically.',
        },
        {
          id: 'u10-L4-Q3',
          type: 'true-false',
          question: 'A mesh convergence study is performed by progressively refining the mesh and checking that the key result stabilizes to within?',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="12" y="12" width="56" height="56" rx="2" fill="#58CC02" opacity="0.04"/> <g stroke="#58CC02" stroke-width="0.5" opacity="0.2"> <line x1="12" y1="26" x2="68" y2="26"/> <line x1="12" y1="40" x2="68" y2="40"/> <line x1="12" y1="54" x2="68" y2="54"/> <line x1="26" y1="12" x2="26" y2="68"/> <line x1="40" y1="12" x2="40" y2="68"/> <line x1="54" y1="12" x2="54" y2="68"/> </g> <g stroke="#58CC02" stroke-width="0.3" opacity="0.15"> <line x1="12" y1="12" x2="26" y2="26"/> <line x1="26" y1="12" x2="40" y2="26"/> <line x1="40" y1="12" x2="54" y2="26"/> <line x1="54" y1="12" x2="68" y2="26"/> <line x1="12" y1="26" x2="26" y2="40"/> <line x1="26" y1="26" x2="40" y2="40"/> <line x1="40" y1="26" x2="54" y2="40"/> <line x1="54" y1="26" x2="68" y2="40"/> <line x1="12" y1="40" x2="26" y2="54"/> <line x1="26" y1="40" x2="40" y2="54"/> <line x1="40" y1="40" x2="54" y2="54"/> <line x1="54" y1="40" x2="68" y2="54"/> <line x1="12" y1="54" x2="26" y2="68"/> <line x1="26" y1="54" x2="40" y2="68"/> <line x1="40" y1="54" x2="54" y2="68"/> <line x1="54" y1="54" x2="68" y2="68"/> </g> <rect x="12" y="12" width="56" height="56" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.3"/> <ellipse cx="54" cy="26" rx="8" ry="8" fill="#A5E86C" opacity="0.15"> <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite"/> </ellipse> <text x="54" y="28" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.4" font-style="italic">stress</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">FEA mesh</text> </svg>',
          explanation: 'Mesh convergence ensures that results are independent of mesh density. The process: run the analysis with an initial mesh, refine (globally or locally), re-run, and compare key results.',
          distractorExplanations: {
            1: 'Mesh convergence ensures that results are independent of mesh density.',
          },
          hint: 'Convergence means further mesh refinement does.'
        }
      ]
    },
    {
      id: 'u10-L4c',
      title: 'Interpreting FEA Results',
      description: 'Reading stress plots, handling singularities, and validating FEA results against hand calcs.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u10-L4c-NEW-T1',
          type: 'teaching',
          question: 'Stress Singularities Are Not Real',
          explanation: 'Sharp corners in FEA produce infinite stress as you refine the mesh. This is a math artifact, not reality. Real parts have fillets, and real stresses are finite. Ignore singularity peaks.',
          hint: 'Try this now: think about why a perfectly sharp corner can\'t exist in the real world.',
        },
        {
          id: 'u10-L4c-NEW-E1',
          type: 'true-false',
          question: 'A stress singularity in FEA means the stress at a sharp corner approaches infinity as the mesh is refined.',
          correctAnswer: true,
          explanation: 'This is a mathematical artifact of the model, not a real physical stress. Real corners have small radii.',
          distractorExplanations: {
            1: 'This is a mathematical artifact of the model, not a real physical stress.',
          },
          hint: 'Perfect sharp corners don\'t exist in real parts.',
        },
        {
          id: 'u10-L4-Q4',
          type: 'multiple-choice',
          question: 'They conclude the bracket will fail. Is their conclusion correct?',
          options: [
            'First check WHERE the 350 MPa occurs: if at a singularity the value is',
            'Yes. stress exceeds yield, so the bracket will definitely break',
            'No. von Mises stress is not relevant for aluminum, use maximum principal stress',
            'Yes. any FEA stress above yield means immediate failure in all cases'

          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="8" y1="40" x2="72" y2="40" stroke="#3B8700" stroke-width="1.2" stroke-linecap="round"/> <line x1="40" y1="72" x2="40" y2="8" stroke="#3B8700" stroke-width="1.2" stroke-linecap="round"/> <polygon points="72,38.5 72,41.5 74,40" fill="#3B8700" opacity="0.4"/> <polygon points="38.5,8 41.5,8 40,6" fill="#3B8700" opacity="0.4"/> <text x="74" y="38" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">σ</text> <text x="43" y="10" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">τ</text> <!-- Mohr\'s circle --> <circle cx="44" cy="40" r="18" fill="#58CC02" opacity="0.06"/> <circle cx="44" cy="40" r="18" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- Center point C --> <circle cx="44" cy="40" r="1.5" fill="#3B8700" opacity="0.4"/> <!-- Rotating diameter line (stress state) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,44,40;360,44,40" dur="4s" repeatCount="indefinite"/> <line x1="26" y1="40" x2="62" y2="40" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/> <!-- σ₁ point --> <circle cx="62" cy="40" r="3" fill="#3B8700" opacity="0.4"/> <!-- σ₂ point --> <circle cx="26" cy="40" r="3" fill="#58CC02" opacity="0.3"/> </g> <!-- Principal stresses labels (static) --> <text x="63" y="52" font-size="4.5" fill="#3B8700" opacity="0.25">σ₁</text> <text x="22" y="52" font-size="4.5" fill="#3B8700" opacity="0.25">σ₂</text> <!-- Max shear label --> <text x="46" y="20" font-size="4" fill="#3B8700" opacity="0.2">τ_max</text> <line x1="44" y1="22" x2="44" y2="26" stroke="#3B8700" stroke-width="0.6" stroke-dasharray="1.5,2" opacity="0.15"/> </svg>',
          explanation: 'The correct response requires engineering judgment. Key checks: (1) Location. is the peak at a singularity? If so, the number is meaningless.',
          distractorExplanations: {
            1: 'This focuses on stress/exceeds, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on mises/stress, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on stress/above, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Before accepting a peak stress value, check where it.'
        },
        {
          id: 'u10-L4-Q5',
          type: 'multiple-choice',
          question: 'They sum to 450 N, but the total applied load is 500 N. What does this indicate?',
          options: [
            'The analysis is correct. a 10% imbalance is normal and acceptable, when',
            'This is expected due to stress stiffening effects in the material model',
            'The missing 50 N was absorbed by material damping in the analysis, without',
            'There is a force equilibrium error indicating a problem with the model such'

          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="12" y="12" width="56" height="56" rx="2" fill="#58CC02" opacity="0.04"/> <g stroke="#58CC02" stroke-width="0.5" opacity="0.2"> <line x1="12" y1="26" x2="68" y2="26"/> <line x1="12" y1="40" x2="68" y2="40"/> <line x1="12" y1="54" x2="68" y2="54"/> <line x1="26" y1="12" x2="26" y2="68"/> <line x1="40" y1="12" x2="40" y2="68"/> <line x1="54" y1="12" x2="54" y2="68"/> </g> <g stroke="#58CC02" stroke-width="0.3" opacity="0.15"> <line x1="12" y1="12" x2="26" y2="26"/> <line x1="26" y1="12" x2="40" y2="26"/> <line x1="40" y1="12" x2="54" y2="26"/> <line x1="54" y1="12" x2="68" y2="26"/> <line x1="12" y1="26" x2="26" y2="40"/> <line x1="26" y1="26" x2="40" y2="40"/> <line x1="40" y1="26" x2="54" y2="40"/> <line x1="54" y1="26" x2="68" y2="40"/> <line x1="12" y1="40" x2="26" y2="54"/> <line x1="26" y1="40" x2="40" y2="54"/> <line x1="40" y1="40" x2="54" y2="54"/> <line x1="54" y1="40" x2="68" y2="54"/> <line x1="12" y1="54" x2="26" y2="68"/> <line x1="26" y1="54" x2="40" y2="68"/> <line x1="40" y1="54" x2="54" y2="68"/> <line x1="54" y1="54" x2="68" y2="68"/> </g> <rect x="12" y="12" width="56" height="56" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.3"/> <ellipse cx="54" cy="26" rx="8" ry="8" fill="#A5E86C" opacity="0.15"> <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite"/> </ellipse> <text x="54" y="28" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.4" font-style="italic">stress</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">FEA mesh</text> </svg>',
          explanation: 'In a static analysis, reaction forces must balance applied forces (Newton\'s third law). A 10% imbalance indicates a significant problem.',
          distractorExplanations: {
            0: 'This focuses on analysis/correct., which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on expected/stress, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on missing/absorbed, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'In static equilibrium, the sum of all forces equals zero.'
        },
        {
          id: 'u10-L4c-NEW-SB1',
          type: 'sort-buckets',
          question: 'Sort these FEA observations into real problems or normal artifacts:',
          options: [
            'Stress singularity at a sharp corner',
            'Convergence study shows 5% change',
            'Peak stress at a fillet root',
            'Hourglass modes in reduced-integration elements',
            'Stress concentration at a bolt hole',
            'Rigid body motion in the model'
          ],
          buckets: [
            'Normal/artifact',
            'Real problem'
          ],
          correctBuckets: [0, 0, 0, 1, 0, 1],
          explanation: 'Singularities and small convergence changes are expected. Hourglass modes and rigid body motion indicate errors.',
          hint: 'Think about which observations indicate modeling mistakes.',
        },
        {
          id: 'u10-L4c-NEW-T2',
          type: 'teaching',
          question: 'Always Validate Against Hand Calcs',
          explanation: 'FEA results should agree with simple hand calculations within 10-20%. If your FEA says a beam deflects 1 mm but your hand calc says 10 mm, something is wrong with the model.',
          hint: 'Try this now: estimate the deflection of a cantilever beam and compare to an FEA result.',
        },
        {
          id: 'u10-L4c-NEW-E2',
          type: 'multiple-choice',
          question: 'What should you do if FEA stress results disagree significantly with a hand calculation?',
          options: [
            'Add more elements until FEA matches',
            'Trust the FEA because computers are more accurate',
            'Check the model for errors in BCs, loads, or material properties',
            'Ignore the hand calculation'
          ],
          correctIndex: 2,
          explanation: 'Disagreement between FEA and hand calcs usually means a modeling error. Always investigate.',
          distractorExplanations: {
            0: 'This focuses on elements/until, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on trust/because, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on ignore/calculation, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Hand calcs are your sanity check.',
        },
        {
          id: 'u10-L4-Q6',
          type: 'fill-blank',
          question: 'The process of progressively refining the FEA mesh and verifying that results stabilize is called a mesh _____ study.',
          blanks: ['convergence'],
          wordBank: ['convergence', 'distortion', 'validation', 'calibration', 'optimization'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Plate with hole --> <rect x="8" y="18" width="64" height="44" rx="1" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.03"/> <!-- Central hole --> <circle cx="40" cy="40" r="8" stroke-width="0.8" stroke="#58CC02" fill="white"/> <!-- Stress flow lines (curving around hole) --> <g stroke="#58CC02" stroke-width="0.4" opacity="0.35"> <path d="M8,24 Q30,24 32,34 Q34,38 32,42 Q30,52 8,56" fill="none"/> <path d="M8,28 Q28,28 33,36 Q34,38 33,42 Q28,50 8,52" fill="none"/> <path d="M8,36 Q26,36 32,38 Q34,40 32,42 Q26,44 8,44" fill="none"/> <path d="M72,24 Q50,24 48,34 Q46,38 48,42 Q50,52 72,56" fill="none"/> <path d="M72,28 Q52,28 47,36 Q46,38 47,42 Q52,50 72,52" fill="none"/> <path d="M72,36 Q54,36 48,38 Q46,40 48,42 Q54,44 72,44" fill="none"/> </g> <!-- Stress concentration zones (top and bottom of hole) --> <g fill="#A5E86C" opacity="0.2"> <ellipse cx="40" cy="32" rx="4" ry="2"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </ellipse> <ellipse cx="40" cy="48" rx="4" ry="2"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </ellipse> </g> <!-- Tension arrows --> <g opacity="0.5"> <line x1="2" y1="40" x2="7" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="2,38.5 2,41.5 -1,40" fill="#58CC02"/> <line x1="78" y1="40" x2="73" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="78,38.5 78,41.5 81,40" fill="#58CC02"/> <text x="-2" y="43" font-size="3" fill="#58CC02">σ</text> <text x="78" y="43" font-size="3" fill="#58CC02">σ</text> </g> <!-- Kt label --> <text x="40" y="14" text-anchor="middle" font-size="4" fill="#58CC02" opacity="0.5">K_t = σ_max/σ_nom</text> <!-- Max stress indicator --> <text x="40" y="30" font-size="2.5" fill="#A5E86C" opacity="0.4" text-anchor="middle">σ_max</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">notch effect</text> </svg>',
          explanation: 'A mesh convergence (or mesh independence/sensitivity) study is a mandatory part of any credible FEA analysis. It demonstrates that the numerical discretization is fine enough to capture.',
          hint: 'This study proves that making the mesh finer does.'
        }
      ]
    },
    {
      id: 'u10-L5',
      title: 'Engineering Case Studies',
      description: 'Real-world engineering failures, troubleshooting frameworks, and systematic investigation.',
      icon: '📋',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u10-L5-NEW-T1',
          type: 'teaching',
          question: 'Case Studies Show Your Engineering Judgment',
          explanation: 'Interviewers use case studies to test how you approach open-ended problems. There\'s rarely one right answer. They want to see structured thinking, clear communication, and sound judgment.',
          hint: 'Try this now: think about a product failure you\'ve heard of and what you\'d investigate first.',
        },
        {
          id: 'u10-L5-NEW-E1',
          type: 'true-false',
          question: 'In a case study interview, demonstrating a structured approach is more important than getting the exact right answer.',
          correctAnswer: true,
          explanation: 'Interviewers evaluate your thought process and communication, not just the final answer.',
          distractorExplanations: {
            1: 'Interviewers evaluate your thought process and communication, not just the final answer.',
          },
          hint: 'Process matters more than the specific conclusion.',
        },
        {
          id: 'u10-L5-Q1',
          type: 'multiple-choice',
          question: 'The leak occurs at the O-ring seal interface. What should be your first investigation step?',
          options: [
            'Redesign the O-ring groove to a different standard size. an approximation',
            'Switch to a more expensive seal material for better compression. not',
            'Measure the O-ring groove dimensions and surface finish on failed vs.',
            'Increase the clamping force on all assemblies by 50% across the board'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Cylindrical vessel body --> <rect x="16" y="20" width="48" height="40" rx="2" fill="#58CC02" opacity="0.06"/> <rect x="16" y="20" width="48" height="40" rx="2" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Hemispherical end caps --> <path d="M16,20 Q16,10 40,10 Q64,10 64,20" fill="#58CC02" opacity="0.05"/> <path d="M16,20 Q16,10 40,10 Q64,10 64,20" stroke="#3B8700" stroke-width="2" fill="none"/> <path d="M16,60 Q16,70 40,70 Q64,70 64,60" fill="#58CC02" opacity="0.05"/> <path d="M16,60 Q16,70 40,70 Q64,70 64,60" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Internal pressure arrows (radial, pulsing) --> <g> <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/> <!-- Hoop direction arrows (horizontal outward) --> <line x1="30" y1="40" x2="22" y2="40" stroke="#3B8700" stroke-width="1"/> <polygon points="23,38.5 20,40 23,41.5" fill="#3B8700"/> <line x1="50" y1="40" x2="58" y2="40" stroke="#3B8700" stroke-width="1"/> <polygon points="57,38.5 60,40 57,41.5" fill="#3B8700"/> <!-- Axial direction arrows (vertical outward) --> <line x1="40" y1="30" x2="40" y2="22" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,23 40,20 41.5,23" fill="#3B8700"/> <line x1="40" y1="50" x2="40" y2="58" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,57 40,60 41.5,57" fill="#3B8700"/> </g> <!-- Pressure label P --> <text x="40" y="43" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.25" font-weight="bold" font-style="italic">P</text> <!-- Wall thickness indicator --> <line x1="64" y1="34" x2="70" y2="34" stroke="#3B8700" stroke-width="0.6" opacity="0.15"/> <text x="72" y="36" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">t</text> <!-- Stress labels --> <text x="14" y="40" text-anchor="end" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">σ_h</text> <text x="40" y="17" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">σ_a</text> <!-- Formula --> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.12" font-style="italic">σ_h = Pr/t</text> </svg>',
          explanation: 'Before changing the design, gather data to identify the root cause. Measure groove dimensions (width, depth, diameter), surface finish (Ra), and inspect O-rings on failed parts.',
          distractorExplanations: {
            0: 'This focuses on redesign/different, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on switch/expensive, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on increase/clamping, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'In quality problems, always gather data first.'
        },
        {
          id: 'u10-L5-NEW-OS1',
          type: 'order-steps',
          question: 'Put these troubleshooting steps in order:',
          steps: [
            'Gather symptoms and operating conditions',
            'Form hypotheses about root cause',
            'Design tests to confirm or eliminate hypotheses',
            'Implement the fix',
            'Verify the fix resolved the issue'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Systematic troubleshooting: gather data, hypothesize, test, fix, then verify.',
          hint: 'You need symptoms before you can form hypotheses.',
        },
        {
          id: 'u10-L5-NEW-T2',
          type: 'teaching',
          question: 'Define Before You Solve',
          explanation: 'Before jumping into a solution, clearly define the problem, list your assumptions, identify what data you need, and outline your approach. This shows organized thinking.',
          hint: 'Try this now: pick any engineering problem and write down 3 assumptions you\'d make.',
        },
        {
          id: 'u10-L5-NEW-E2',
          type: 'multiple-choice',
          question: 'What should you do first when given a case study problem in an interview?',
          options: [
            'Start calculating immediately',
            'Clarify the problem and state your assumptions',
            'Ask for the correct answer',
            'Look up the solution online'
          ],
          correctIndex: 1,
          explanation: 'Always start by understanding and framing the problem. Then state assumptions before diving into analysis.',
          distractorExplanations: {
            0: 'This focuses on start/calculating, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on correct/answer, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on solution/online, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Good engineers define the problem before solving it.',
        },
        {
          id: 'u10-L5-Q2',
          type: 'multiple-choice',
          question: 'The part is for a consumer product with dynamic loads. What is your recommendation?',
          options: [
            'Approve it. a safety factor above 1.0 means it will not yield under load',
            'Reject it. a safety factor of 1.1 is dangerously low for a dynamically loaded',
            'Approve it but add a warning label for the end user',
            'Reject it and recommend switching to steel regardless of weight impact, valid'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Specimen block --> <rect x="10" y="16" width="60" height="48" rx="1" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.03"/> <!-- Initial notch --> <path d="M10,40 L22,40" stroke-width="1" stroke="#58CC02"/> <!-- Growing crack --> <path d="M22,40 L28,41 L32,39 L36,40.5 L40,39.5 L44,40" stroke-width="0.8" stroke="#A5E86C" fill="none"> <animate attributeName="d" values="M22,40 L26,40.5 L28,39.5;M22,40 L28,41 L32,39 L36,40.5 L40,39.5 L44,40;M22,40 L28,41 L32,39 L36,40.5 L40,39.5 L44,40 L48,40.5 L52,39.5 L56,40" dur="6s" repeatCount="indefinite"/> </path> <!-- Crack tip stress field (plastic zone) --> <circle cx="44" cy="40" r="4" fill="#A5E86C" opacity="0.1"> <animate attributeName="cx" values="28;44;56" dur="6s" repeatCount="indefinite"/> <animate attributeName="r" values="2;4;6" dur="6s" repeatCount="indefinite"/> </circle> <!-- Cyclic load arrows --> <g opacity="0.4"> <line x1="40" y1="4" x2="40" y2="14" stroke-width="0.6" stroke="#58CC02"/> <polygon points="38.5,14 41.5,14 40,16" fill="#58CC02"/> <line x1="40" y1="76" x2="40" y2="66" stroke-width="0.6" stroke="#58CC02"/> <polygon points="38.5,66 41.5,66 40,64" fill="#58CC02"/> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <!-- Beach marks (striations) --> <g stroke="#58CC02" stroke-width="0.2" opacity="0.15"> <path d="M26,36 Q26,40 26,44" fill="none"/> <path d="M30,35 Q30,40 30,45" fill="none"/> <path d="M34,34.5 Q34,40 34,45.5" fill="none"/> <path d="M38,34 Q38,40 38,46" fill="none"/> <path d="M42,33.5 Q42,40 42,46.5" fill="none"/> </g> <!-- Crack length label --> <line x1="22" y1="50" x2="44" y2="50" stroke-width="0.3" stroke="#3B8700" opacity="0.3"/> <text x="33" y="54" font-size="3" fill="#3B8700" opacity="0.4" text-anchor="middle">a</text> <!-- da/dN label --> <text x="40" y="12" font-size="3" fill="#58CC02" opacity="0.4" text-anchor="middle">da/dN = C(ΔK)ᵐ</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">Paris law</text> </svg>',
          explanation: 'A safety factor of 1.1 against yield under dynamic loading is unacceptable for a consumer product.',
          distractorExplanations: {
            0: 'This focuses on approve/above, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on approve/warning, which is not the correct mechanism or principle for this problem.',
            3: 'The outcome does depend on the factor this option dismisses (reject recommend).',
          },
          hint: 'Consider all the uncertainties: load estimation, material.'
        }
      ]
    },
    {
      id: 'u10-L5b',
      title: 'Troubleshooting Scenarios',
      description: 'Debugging field failures, interpreting test data, and making recommendations under uncertainty.',
      icon: '📋',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u10-L5b-NEW-T1',
          type: 'teaching',
          question: 'Field Failures Are Different From Lab Failures',
          explanation: 'Parts that work perfectly in the lab can fail in the field due to environmental conditions, user behavior, or maintenance practices that differ from your test setup.',
          hint: 'Try this now: think of 3 ways a lab test might not match real-world conditions.',
        },
        {
          id: 'u10-L5b-NEW-E1',
          type: 'true-false',
          question: 'A product that passes all lab tests is guaranteed to never fail in the field.',
          correctAnswer: false,
          explanation: 'Lab tests can\'t replicate every field condition. Temperature, humidity, vibration, and user behavior all vary.',
          distractorExplanations: {
            0: 'The statement is false; the underlying assumption contains an error.',
          },
          hint: 'Think about what conditions might differ between lab and field.',
        },
        {
          id: 'u10-L5b-NEW-MP1',
          type: 'match-pairs',
          question: 'Match each investigation technique to what it reveals:',
          options: [
            'Fractography (SEM)',
            'Chemical analysis (EDS)',
            'Hardness testing',
            'Dimensional inspection'
          ],
          matchTargets: [
            'Microscopic fracture features',
            'Material composition',
            'Heat treatment condition',
            'Manufacturing accuracy'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Different analysis techniques answer different questions about a failure.',
          hint: 'Each technique reveals different information about the part.',
        },
        {
          id: 'u10-L5b-NEW-T2',
          type: 'teaching',
          question: 'Data-Driven Decisions',
          explanation: 'Don\'t guess. Collect data from field returns, warranty claims, and inspection reports. Look for patterns: does the failure happen in a specific climate? After a specific maintenance event?',
          hint: 'Try this now: think about what data you\'d collect from a returned failed product.',
        },
        {
          id: 'u10-L5b-NEW-E2',
          type: 'multiple-choice',
          question: 'An intermittent field failure that can\'t be reproduced in the lab most likely relates to:',
          options: [
            'Environmental or usage differences between lab and field',
            'A software bug in the test equipment',
            'The lab technician making errors',
            'The part being too strong for lab loads'
          ],
          correctIndex: 0,
          explanation: 'Unreproducible failures usually stem from conditions present in the field but absent in the lab.',
          distractorExplanations: {
            1: 'This focuses on software/equipment, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on technician/making, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on being/strong, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'What\'s different between the lab environment and the field?',
        },
        {
          id: 'u10-L5-Q3',
          type: 'true-false',
          question: 'When troubleshooting a vibration problem on a rotating machine, increasing the support structure stiffness will always reduce?',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="8" y1="40" x2="72" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> <path d="M8,40 Q14,20 20,40 Q26,60 32,40 Q38,20 44,40 Q50,60 56,40 Q62,20 68,40" stroke="#58CC02" stroke-width="2.5" fill="none" opacity="0.4"> <animate attributeName="d" values="M8,40 Q14,20 20,40 Q26,60 32,40 Q38,20 44,40 Q50,60 56,40 Q62,20 68,40;M8,40 Q14,24 20,40 Q26,56 32,40 Q38,24 44,40 Q50,56 56,40 Q62,24 68,40;M8,40 Q14,20 20,40 Q26,60 32,40 Q38,20 44,40 Q50,60 56,40 Q62,20 68,40" dur="1.5s" repeatCount="indefinite"/> </path> <circle r="3" fill="#3B8700" opacity="0.4"> <animate attributeName="cy" values="20;60;20" dur="1.5s" repeatCount="indefinite"/> <animate attributeName="cx" values="20;20;20" dur="1.5s" repeatCount="indefinite"/> </circle> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">vibration</text> </svg>',
          explanation: 'Increasing stiffness changes the natural frequency, which could move it closer to or further from the excitation frequency. If the operating speed is below the current natural frequency,.',
          distractorExplanations: {
            0: 'Increasing stiffness changes the natural frequency, which could move it closer to or further from the excitation frequency.',
          },
          hint: 'What happens when you change the natural frequency.'
        }
      ]
    },
    {
      id: 'u10-L5c',
      title: 'Cross-Disciplinary Design',
      description: 'Cross-disciplinary thinking, systems engineering, and holistic design problem-solving.',
      icon: '📋',
      xpReward: 35,
      levels: 4,
      questions: [
        {
          id: 'u10-L5c-NEW-T1',
          type: 'teaching',
          question: 'Think Across Disciplines',
          explanation: 'Real engineering problems don\'t respect subject boundaries. A vibration problem might be caused by a fluid dynamics issue. A corrosion problem might stem from a thermal design choice.',
          hint: 'Try this now: think of a problem where multiple engineering disciplines interact.',
        },
        {
          id: 'u10-L5c-NEW-E1',
          type: 'true-false',
          question: 'A good engineer only needs to understand their own discipline to solve real-world problems.',
          correctAnswer: false,
          explanation: 'Real problems cross disciplines. Thermal, structural, fluid, and electrical effects often interact.',
          distractorExplanations: {
            0: 'Real problems cross disciplines.',
          },
          hint: 'Think about whether real problems stay neatly in one subject area.',
        },
        {
          id: 'u10-L5-Q4',
          type: 'multiple-choice',
          question: 'No leak is visible. What is the most likely diagnosis?',
          options: [
            'Progressive impeller erosion/corrosion reduced performance until the pump',
            'The motor has reversed direction due to a wiring fault. check phase rotation',
            'Air in the suction line from day one has gradually accumulated',
            'The discharge valve was closed during startup and never opened'

          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="40" cy="32" r="20" fill="#58CC02" opacity="0.06"/> <circle cx="40" cy="32" r="20" stroke="#58CC02" stroke-width="2" fill="none" opacity="0.3"/> <line x1="40" y1="14" x2="40" y2="24" stroke="#3B8700" stroke-width="2" opacity="0.4"/> <circle cx="40" cy="12" r="2" fill="#3B8700" opacity="0.3"/> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,32;360,40,32" dur="3s" repeatCount="indefinite"/> <line x1="40" y1="32" x2="40" y2="18" stroke="#3B8700" stroke-width="1.5" opacity="0.5"/> <circle cx="40" cy="18" r="1.5" fill="#3B8700" opacity="0.4"/> </g> <line x1="40" y1="32" x2="56" y2="32" stroke="#A5E86C" stroke-width="1" opacity="0.3"/> <text x="40" y="56" text-anchor="middle" font-size="4" fill="#334155" opacity="0.3" font-style="italic">diagnostics</text> <circle cx="20" cy="66" r="6" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <circle cx="40" cy="66" r="6" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <circle cx="60" cy="66" r="6" fill="#A5E86C" opacity="0.1" stroke="#A5E86C" stroke-width="1" opacity="0.2"/> <line x1="26" y1="66" x2="34" y2="66" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> <polygon points="33,64.5 36,66 33,67.5" fill="#3B8700" opacity="0.2"/> <line x1="46" y1="66" x2="54" y2="66" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> <polygon points="53,64.5 56,66 53,67.5" fill="#3B8700" opacity="0.2"/> </svg>',
          explanation: 'The gradual degradation over months followed by complete failure is characteristic of progressive impeller damage.',
          distractorExplanations: {
            1: 'This focuses on motor/reversed, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on suction/gradually, which is not the correct mechanism or principle for this problem.',
            3: 'This incorrectly denies an effect that is relevant to discharge valve and significant in this context.',
          },
          hint: 'The gradual decline rules out sudden events.'
        },
        {
          id: 'u10-L5-Q5',
          type: 'multiple-choice',
          question: 'Which response format best demonstrates engineering judgment?',
          options: [
            'Pick the cheapest option and explain only the cost savings',
            'Present a structured comparison addressing mechanical requirements,',
            'Pick the strongest option and explain only the safety benefits',
            'Ask the interviewer which one they prefer before committing'

          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="24" y="6" width="32" height="12" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="24" y="6" width="32" height="12" rx="3" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"/> <line x1="40" y1="18" x2="40" y2="26" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <polygon points="38.5,25 40,28 41.5,25" fill="#3B8700" opacity="0.3"/> <rect x="20" y="28" width="40" height="12" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="20" y="28" width="40" height="12" rx="3" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="48" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <polygon points="38.5,47 40,50 41.5,47" fill="#3B8700" opacity="0.3"/> <rect x="24" y="50" width="32" height="12" rx="3" fill="#A5E86C" opacity="0.1"/> <rect x="24" y="50" width="32" height="12" rx="3" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <line x1="40" y1="62" x2="40" y2="70" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <polygon points="38.5,69 40,72 41.5,69" fill="#3B8700" opacity="0.3"/> <circle cx="40" cy="76" r="3" fill="#3B8700" opacity="0.2"/> </svg>',
          explanation: 'Engineering material selection requires balancing multiple factors: mechanical requirements, environmental compatibility, manufacturability, cost, and availability.',
          distractorExplanations: {
            0: 'This focuses on cheapest/option, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on strongest/option, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on interviewer/which, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Engineering decisions require balancing multiple factors.'
        },
        {
          id: 'u10-L5c-NEW-SB1',
          type: 'sort-buckets',
          question: 'Sort these engineering considerations into design phase or validation phase:',
          options: [
            'Material selection',
            'Prototype testing',
            'Tolerance analysis',
            'Accelerated life testing',
            'FEA stress analysis',
            'Field trial monitoring'
          ],
          buckets: [
            'Design phase',
            'Validation phase'
          ],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Design-phase activities happen before building. Validation activities confirm the design works.',
          hint: 'Think about whether you do this before or after building a prototype.',
        },
        {
          id: 'u10-L5c-NEW-T2',
          type: 'teaching',
          question: 'Systems Thinking in Design',
          explanation: 'Every component exists in a system. Changing one part affects others. Before proposing a fix, consider the ripple effects on weight, cost, assembly, maintenance, and other subsystems.',
          hint: 'Try this now: think about how making a bracket thicker affects the whole system.',
        },
        {
          id: 'u10-L5c-NEW-E2',
          type: 'multiple-choice',
          question: 'When proposing a design change, what should you always consider?',
          options: [
            'Whether the change looks better aesthetically',
            'Only the stress in the changed part',
            'How the change affects other parts of the system',
            'Only the manufacturing cost'
          ],
          correctIndex: 2,
          explanation: 'Systems thinking means considering ripple effects: weight, cost, assembly, thermal, maintenance impacts.',
          distractorExplanations: {
            0: 'This focuses on whether/looks, which is not the correct mechanism or principle for this problem.',
            1: 'This is too restrictive; the principle applies more broadly than stress changed suggests.',
            3: 'This is too restrictive; the principle applies more broadly than manufacturing suggests.',
          },
          hint: 'Changes in one area often affect other areas.',
        },
        {
          id: 'u10-L5-Q6',
          type: 'fill-blank',
          question: 'The engineering practice of evaluating a design to ensure it can be economically manufactured with available processes is called _____?',
          blanks: ['Manufacturing'],
          wordBank: ['Manufacturing', 'Maintenance', 'Mobility', 'Measurement', 'Modularity'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="8" y="22" width="28" height="36" rx="3" fill="#58CC02" opacity="0.08"/> <rect x="8" y="22" width="28" height="36" rx="3" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"/> <circle cx="22" cy="34" r="6" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.2"/> <rect x="16" y="44" width="12" height="8" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.2"/> <line x1="36" y1="40" x2="44" y2="40" stroke="#3B8700" stroke-width="1.5" opacity="0.3"/> <polygon points="43,38.5 46,40 43,41.5" fill="#3B8700" opacity="0.3"/> <rect x="44" y="22" width="28" height="36" rx="3" fill="#A5E86C" opacity="0.08"/> <rect x="44" y="22" width="28" height="36" rx="3" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <rect x="50" y="28" width="16" height="24" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.2"/> <circle cx="58" cy="40" r="4" fill="#58CC02" opacity="0.15"> <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite"/> </circle> <text x="22" y="68" text-anchor="middle" font-size="3.5" fill="#334155" opacity="0.3">design</text> <text x="58" y="68" text-anchor="middle" font-size="3.5" fill="#334155" opacity="0.3">mfg</text> </svg>',
          explanation: 'Design for Manufacturing (DFM) ensures that part designs are compatible with the intended manufacturing processes at acceptable cost and quality.',
          hint: 'This DFM practice ensures designs can be produced.'
        }
      ]
    },
    {
      id: 'u10-L6',
      title: 'Standards & Quality Systems',
      description: 'ISO standards, ASME codes, and quality management systems every engineer should know.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u10-L6-NEW-T1',
          type: 'teaching',
          question: 'Standards Exist for Good Reason',
          explanation: 'ISO, ASME, and other standards codify best practices so engineers don\'t repeat past mistakes. Knowing which standards apply to your work is a basic professional requirement.',
          hint: 'Try this now: find out which ISO standard covers quality management systems.',
        },
        {
          id: 'u10-L6-NEW-E1',
          type: 'true-false',
          question: 'ISO 9001 is the international standard for quality management systems.',
          correctAnswer: true,
          explanation: 'ISO 9001 defines requirements for a quality management system. It\'s the most widely used standard worldwide.',
          distractorExplanations: {
            1: 'ISO 9001 defines requirements for a quality management system.',
          },
          hint: 'This is the most recognized quality standard globally.',
        },
        {
          id: 'u10-L6-Q1',
          type: 'multiple-choice',
          question: 'Which standard should they certify to?',
          options: [
            'ISO 45001. Occupational Health and Safety Management',
            'ISO 14001. Environmental Management Systems, in all loading orientations',
            'AS9100. Quality Management Systems for Aviation, Space, and Defense',
            'IATF 16949. Automotive Quality Management Systems'

          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Coordinate axes (reference frame) --> <line x1="6" y1="74" x2="17" y2="74" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> <polygon points="16,72.5 19,74 16,75.5" fill="#3B8700" opacity="0.2"/> <text x="20" y="73" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">x</text> <line x1="6" y1="74" x2="6" y2="63" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> <polygon points="4.5,64 6,61 7.5,64" fill="#3B8700" opacity="0.2"/> <text x="4" y="61" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">y</text> <!-- Isolated body --> <circle cx="40" cy="40" r="13" fill="#58CC02" opacity="0.1"/> <circle cx="40" cy="40" r="13" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Center of mass dot --> <circle cx="40" cy="40" r="1.5" fill="#3B8700" opacity="0.35"/> <text x="40" y="44" text-anchor="middle" font-size="9" fill="#3B8700" font-weight="bold" font-style="italic">m</text> <!-- Weight W (downward from center. gravity) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;1;1" dur="4s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> <line x1="40" y1="53" x2="40" y2="69" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <polygon points="38,67 40,72 42,67" fill="#3B8700"/> <text x="46" y="67" font-size="7" fill="#3B8700" font-weight="bold" font-style="italic">W</text> </g> <!-- Normal N (upward. surface reaction) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;1;1" dur="4s" begin="0.4s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> <line x1="40" y1="27" x2="40" y2="11" stroke="#58CC02" stroke-width="2" stroke-linecap="round"/> <polygon points="38,13 40,8 42,13" fill="#58CC02"/> <text x="46" y="15" font-size="7" fill="#58CC02" font-weight="bold" font-style="italic">N</text> </g> <!-- Friction f (leftward. opposing motion) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;1;1" dur="4s" begin="0.8s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> <line x1="27" y1="40" x2="14" y2="40" stroke="#A5E86C" stroke-width="1.8" stroke-linecap="round"/> <polygon points="16,38 11,40 16,42" fill="#A5E86C"/> <text x="11" y="36" font-size="7" fill="#A5E86C" font-weight="bold" font-style="italic">f</text> </g> <!-- Applied force F (rightward. larger magnitude) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;1;1" dur="4s" begin="1.2s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> <line x1="53" y1="40" x2="71" y2="40" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> <polygon points="69,37 75,40 69,43" fill="#3B8700"/> <text x="69" y="35" font-size="7" fill="#3B8700" font-weight="bold" font-style="italic">F</text> </g> <!-- Equilibrium equation (appears after all forces) --> <text x="40" y="78" text-anchor="middle" font-size="5.5" fill="#3B8700" opacity="0" font-style="italic"> <animate attributeName="opacity" values="0;0;0.3;0.3" dur="4s" begin="1.8s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> &#x3a3;F = 0 </text> </svg>',
          explanation: 'AS9100 (current revision AS9100D, based on ISO 9001:2015) adds aerospace-specific requirements including.',
          distractorExplanations: {
            0: 'This focuses on 45001./occupational, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on 14001./environmental, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on 16949./automotive, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'This standard is the aerospace/defense extension of ISO.'
        },
        {
          id: 'u10-L6-NEW-MP1',
          type: 'match-pairs',
          question: 'Match each standard to its primary focus:',
          options: [
            'ISO 9001',
            'ASME BPVC',
            'ISO 14001',
            'ASME Y14.5'
          ],
          matchTargets: [
            'Quality management',
            'Pressure vessel safety',
            'Environmental management',
            'GD&T dimensioning'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Each standard covers a specific domain. Knowing which is which is professional literacy.',
          hint: 'Match based on the keywords in each standard\'s name.',
        },
        {
          id: 'u10-L6-NEW-T2',
          type: 'teaching',
          question: 'Standards vs Codes vs Specifications',
          explanation: 'Standards define general requirements (ISO 9001). Codes are legally enforceable rules (ASME BPVC). Specifications detail exact requirements for a specific product or process.',
          hint: 'Try this now: think about whether a building code is a standard, code, or specification.',
        },
        {
          id: 'u10-L6-NEW-E2',
          type: 'multiple-choice',
          question: 'What is the ASME Boiler and Pressure Vessel Code (BPVC) primarily used for?',
          options: [
            'Electrical wiring standards',
            'Safe design and construction of pressure equipment',
            'Software quality assurance',
            'Environmental regulations'
          ],
          correctIndex: 1,
          explanation: 'ASME BPVC is the primary standard for pressure vessel and boiler design safety in the US.',
          distractorExplanations: {
            0: 'This focuses on electrical/wiring, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on software/quality, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on environmental/regulations, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about what "boiler and pressure vessel" tells you.',
        },
        {
          id: 'u10-L6-Q2',
          type: 'multiple-choice',
          question: 'Which ASME code section governs unfired pressure vessels?',
          options: [
            'ASME B31.1. power piping code with wall thickness formulas, based',
            'ASME BPVC Section VIII. using design by rule (Division 1) or design',
            'ASME BPVC Section III. nuclear component design rules, valid only',
            'ASME Y14.5. dimensioning and tolerancing standard, based on simplified'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="16" y="8" width="48" height="64" rx="4" fill="#58CC02" opacity="0.06"/> <rect x="16" y="8" width="48" height="64" rx="4" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.3"/> <line x1="24" y1="22" x2="56" y2="22" stroke="#58CC02" stroke-width="1.5" opacity="0.3"/> <line x1="24" y1="30" x2="56" y2="30" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <line x1="24" y1="36" x2="56" y2="36" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <line x1="24" y1="42" x2="56" y2="42" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <line x1="24" y1="48" x2="48" y2="48" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <line x1="24" y1="54" x2="52" y2="54" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <line x1="24" y1="60" x2="44" y2="60" stroke="#58CC02" stroke-width="1" opacity="0.2"/> <rect x="22" y="14" width="16" height="4" rx="1" fill="#3B8700" opacity="0.15"/> <circle cx="56" cy="62" r="6" fill="#A5E86C" opacity="0.15"> <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite"/> </circle> <path d="M53,62 L55.5,64.5 L59,60" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.4"/> </svg>',
          explanation: 'ASME BPVC Section VIII covers unfired pressure vessels. Division 1 uses "design by rule" with established formulas (e.g., t = PR/(SE - 0.6P) for cylindrical shells).',
          distractorExplanations: {
            0: 'This focuses on b31.1./power, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on nuclear/component, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on y14.5./dimensioning, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'BPVC stands for Boiler and Pressure Vessel Code.'
        }
      ]
    },
    {
      id: 'u10-L6b',
      title: 'Risk Assessment & Change Control',
      description: 'FMEA risk assessment, engineering change orders, and configuration management.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u10-L6b-NEW-T1',
          type: 'teaching',
          question: 'Risk Assessment Prevents Failures',
          explanation: 'FMEA, fault tree analysis, and HAZOP are proactive tools that identify risks before they become failures. They\'re standard practice in automotive, aerospace, and process industries.',
          hint: 'Try this now: think of 3 things that could go wrong with a product you use daily.',
        },
        {
          id: 'u10-L6b-NEW-E1',
          type: 'true-false',
          question: 'FMEA stands for Failure Mode and Effects Analysis.',
          correctAnswer: true,
          explanation: 'FMEA systematically identifies potential failure modes, their effects, and their causes to prioritize risks.',
          distractorExplanations: {
            1: 'FMEA systematically identifies potential failure modes, their effects, and their causes to prioritize risks.',
          },
          hint: 'Each letter stands for a word in the full name.',
        },
        {
          id: 'u10-L6b-NEW-OS1',
          type: 'order-steps',
          question: 'Put these engineering change management steps in order:',
          steps: [
            'Identify the need for a change',
            'Document the proposed change on an ECO',
            'Review and approve with cross-functional team',
            'Implement the change in production',
            'Verify the change works correctly'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Change management follows a formal process: identify, document, review, implement, verify.',
          hint: 'You need approval before implementing any change.',
        },
        {
          id: 'u10-L6b-NEW-T2',
          type: 'teaching',
          question: 'Change Control Prevents Chaos',
          explanation: 'Engineering Change Orders (ECOs) document and control modifications to released designs. Without formal change control, one team\'s "fix" becomes another team\'s unexpected problem.',
          hint: 'Try this now: think about what could go wrong if someone changed a part without telling manufacturing.',
        },
        {
          id: 'u10-L6b-NEW-E2',
          type: 'multiple-choice',
          question: 'What is the purpose of an Engineering Change Order (ECO)?',
          options: [
            'To order new engineering tools',
            'To formally document and control design modifications',
            'To schedule employee training',
            'To calculate project budgets'
          ],
          correctIndex: 1,
          explanation: 'ECOs ensure that design changes are reviewed, approved, and communicated to all affected teams.',
          distractorExplanations: {
            0: 'This focuses on order/engineering, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on schedule/employee, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on calculate/project, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about what "change order" implies.',
        },
        {
          id: 'u10-L6-Q3',
          type: 'multiple-choice',
          question: 'An American colleague reviews it. What is the key difference they must be aware of?',
          options: [
            'There is no difference. ISO and ASME use identical projection methods',
            'First-angle projection only shows two views while third-angle always shows three',
            'ISO uses metric units and ASME uses imperial. the projection method',
            'In first-angle projection (ISO default), views are placed on the opposite side'

          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Cylindrical vessel body --> <rect x="16" y="20" width="48" height="40" rx="2" fill="#58CC02" opacity="0.06"/> <rect x="16" y="20" width="48" height="40" rx="2" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Hemispherical end caps --> <path d="M16,20 Q16,10 40,10 Q64,10 64,20" fill="#58CC02" opacity="0.05"/> <path d="M16,20 Q16,10 40,10 Q64,10 64,20" stroke="#3B8700" stroke-width="2" fill="none"/> <path d="M16,60 Q16,70 40,70 Q64,70 64,60" fill="#58CC02" opacity="0.05"/> <path d="M16,60 Q16,70 40,70 Q64,70 64,60" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Internal pressure arrows (radial, pulsing) --> <g> <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/> <!-- Hoop direction arrows (horizontal outward) --> <line x1="30" y1="40" x2="22" y2="40" stroke="#3B8700" stroke-width="1"/> <polygon points="23,38.5 20,40 23,41.5" fill="#3B8700"/> <line x1="50" y1="40" x2="58" y2="40" stroke="#3B8700" stroke-width="1"/> <polygon points="57,38.5 60,40 57,41.5" fill="#3B8700"/> <!-- Axial direction arrows (vertical outward) --> <line x1="40" y1="30" x2="40" y2="22" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,23 40,20 41.5,23" fill="#3B8700"/> <line x1="40" y1="50" x2="40" y2="58" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,57 40,60 41.5,57" fill="#3B8700"/> </g> <!-- Pressure label P --> <text x="40" y="43" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.25" font-weight="bold" font-style="italic">P</text> <!-- Wall thickness indicator --> <line x1="64" y1="34" x2="70" y2="34" stroke="#3B8700" stroke-width="0.6" opacity="0.15"/> <text x="72" y="36" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">t</text> <!-- Stress labels --> <text x="14" y="40" text-anchor="end" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">σ_h</text> <text x="40" y="17" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">σ_a</text> <!-- Formula --> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.12" font-style="italic">σ_h = Pr/t</text> </svg>',
          explanation: 'In first-angle projection (Europe/Asia per ISO 128), the right side view appears to the LEFT of the front view. In third-angle projection (US/Canada per ASME Y14.3), the right side view appears.',
          distractorExplanations: {
            0: 'This focuses on there/difference., which is not the correct mechanism or principle for this problem.',
            1: 'This "always" claim is too broad; first-angle projection the principle has important exceptions.',
            2: 'This focuses on metric/units, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The projection symbol in the title block tells you.'
        }
      ]
    },
    {
      id: 'u10-L6c',
      title: 'Project Management for Engineers',
      description: 'Project scheduling, resource planning, and professional communication for engineers.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u10-L6c-NEW-T1',
          type: 'teaching',
          question: 'Engineers Need Project Management Skills',
          explanation: 'Technical skills alone aren\'t enough. You need to plan schedules, manage resources, track milestones, and communicate status. A Gantt chart and a risk register are your basic tools.',
          hint: 'Try this now: think about the last time a project was late and what caused the delay.',
        },
        {
          id: 'u10-L6c-NEW-E1',
          type: 'true-false',
          question: 'A Gantt chart is a visual tool that shows project tasks plotted against time.',
          correctAnswer: true,
          explanation: 'Gantt charts show task durations, dependencies, and milestones on a timeline.',
          distractorExplanations: {
            1: 'Gantt charts show task durations, dependencies, and milestones on a timeline.',
          },
          hint: 'Think of a horizontal bar chart showing when tasks start and end.',
        },
        {
          id: 'u10-L6-Q4',
          type: 'true-false',
          question: 'In the engineering change process, an ECR must be approved and converted into an ECO before any design changes are implemented?',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Coordinate axes (reference frame) --> <line x1="6" y1="74" x2="17" y2="74" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> <polygon points="16,72.5 19,74 16,75.5" fill="#3B8700" opacity="0.2"/> <text x="20" y="73" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">x</text> <line x1="6" y1="74" x2="6" y2="63" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> <polygon points="4.5,64 6,61 7.5,64" fill="#3B8700" opacity="0.2"/> <text x="4" y="61" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">y</text> <!-- Isolated body --> <circle cx="40" cy="40" r="13" fill="#58CC02" opacity="0.1"/> <circle cx="40" cy="40" r="13" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Center of mass dot --> <circle cx="40" cy="40" r="1.5" fill="#3B8700" opacity="0.35"/> <text x="40" y="44" text-anchor="middle" font-size="9" fill="#3B8700" font-weight="bold" font-style="italic">m</text> <!-- Weight W (downward from center. gravity) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;1;1" dur="4s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> <line x1="40" y1="53" x2="40" y2="69" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <polygon points="38,67 40,72 42,67" fill="#3B8700"/> <text x="46" y="67" font-size="7" fill="#3B8700" font-weight="bold" font-style="italic">W</text> </g> <!-- Normal N (upward. surface reaction) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;1;1" dur="4s" begin="0.4s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> <line x1="40" y1="27" x2="40" y2="11" stroke="#58CC02" stroke-width="2" stroke-linecap="round"/> <polygon points="38,13 40,8 42,13" fill="#58CC02"/> <text x="46" y="15" font-size="7" fill="#58CC02" font-weight="bold" font-style="italic">N</text> </g> <!-- Friction f (leftward. opposing motion) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;1;1" dur="4s" begin="0.8s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> <line x1="27" y1="40" x2="14" y2="40" stroke="#A5E86C" stroke-width="1.8" stroke-linecap="round"/> <polygon points="16,38 11,40 16,42" fill="#A5E86C"/> <text x="11" y="36" font-size="7" fill="#A5E86C" font-weight="bold" font-style="italic">f</text> </g> <!-- Applied force F (rightward. larger magnitude) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;1;1" dur="4s" begin="1.2s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> <line x1="53" y1="40" x2="71" y2="40" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> <polygon points="69,37 75,40 69,43" fill="#3B8700"/> <text x="69" y="35" font-size="7" fill="#3B8700" font-weight="bold" font-style="italic">F</text> </g> <!-- Equilibrium equation (appears after all forces) --> <text x="40" y="78" text-anchor="middle" font-size="5.5" fill="#3B8700" opacity="0" font-style="italic"> <animate attributeName="opacity" values="0;0;0.3;0.3" dur="4s" begin="1.8s" repeatCount="indefinite" keyTimes="0;0.1;0.18;1"/> &#x3a3;F = 0 </text> </svg>',
          explanation: 'The ECR/ECO process is required by most quality standards (ISO 9001, AS9100). An ECR documents the proposed change, justification, and impact assessment.',
          distractorExplanations: {
            1: 'The ECR/ECO process is required by most quality standards (ISO 9001, AS9100).',
          },
          hint: 'Consider the two-stage gate: first propose and assess.'
        },
        {
          id: 'u10-L6-Q5',
          type: 'multiple-choice',
          question: 'Another says the high Severity demands action. Who is right?',
          options: [
            'The first engineer. low Occurrence means acceptable risk regardless of Severity',
            'Neither. just calculate RPN (9x2x8=144) and only act if it exceeds 200',
            'The second engineer. modern FMEA practice (AIAG-VDA) prioritizes Severity',
            'Both are wrong. only Detection rating matters since it is what the company'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="18" y="8" width="54" height="54" rx="2" fill="#58CC02" opacity="0.04"/> <line x1="18" y1="26" x2="72" y2="26" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/> <line x1="18" y1="44" x2="72" y2="44" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/> <line x1="36" y1="8" x2="36" y2="62" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/> <line x1="54" y1="8" x2="54" y2="62" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/> <rect x="18" y="8" width="54" height="54" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.3"/> <rect x="54" y="8" width="18" height="18" rx="1" fill="#3B8700" opacity="0.12"/> <rect x="36" y="8" width="18" height="18" rx="1" fill="#A5E86C" opacity="0.12"/> <rect x="54" y="26" width="18" height="18" rx="1" fill="#A5E86C" opacity="0.12"/> <rect x="18" y="8" width="18" height="18" rx="1" fill="#58CC02" opacity="0.08"/> <line x1="18" y1="62" x2="18" y2="8" stroke="#3B8700" stroke-width="1.5" opacity="0.3"/> <line x1="18" y1="62" x2="72" y2="62" stroke="#3B8700" stroke-width="1.5" opacity="0.3"/> <text x="45" y="72" text-anchor="middle" font-size="4" fill="#334155" opacity="0.3" font-style="italic">severity</text> <text x="10" y="38" text-anchor="middle" font-size="4" fill="#334155" opacity="0.3" font-style="italic">prob</text> <circle cx="63" cy="17" r="3" fill="#3B8700" opacity="0.3"> <animate attributeName="r" values="2.5;4;2.5" dur="2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'Modern FMEA methodology (AIAG-VDA 2019) moved away from RPN precisely because it can mask high-severity risks.',
          distractorExplanations: {
            0: 'The outcome does depend on the factor this option dismisses (first engineer).',
            1: 'This focuses on neither./calculate, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than wrong detection suggests.',
          },
          hint: 'Consider which is worse: a frequent cosmetic defect.'
        },
        {
          id: 'u10-L6c-NEW-SB1',
          type: 'sort-buckets',
          question: 'Sort these into technical skills or professional skills:',
          options: [
            'FEA modeling',
            'Writing technical reports',
            'Material selection',
            'Presenting to stakeholders',
            'Tolerance analysis',
            'Managing project schedules'
          ],
          buckets: [
            'Technical skill',
            'Professional skill'
          ],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Both technical and professional skills are essential for engineering careers.',
          hint: 'Think about whether each skill involves analysis or communication/management.',
        },
        {
          id: 'u10-L6c-NEW-T2',
          type: 'teaching',
          question: 'Communication Is Engineering Too',
          explanation: 'Writing clear reports, presenting data effectively, and explaining technical decisions to non-engineers are core engineering skills, not optional extras.',
          hint: 'Try this now: practice explaining a technical concept to someone without using jargon.',
        },
        {
          id: 'u10-L6c-NEW-E2',
          type: 'multiple-choice',
          question: 'What does the "critical path" in project management represent?',
          options: [
            'The longest sequence of dependent tasks that determines project duration',
            'The most expensive tasks in the project',
            'Tasks that require the most engineers',
            'The path with the most safety risks'
          ],
          correctIndex: 0,
          explanation: 'The critical path determines the minimum project duration. Delays on any critical-path task delay the whole project.',
          distractorExplanations: {
            1: 'This focuses on expensive, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on require/engineers, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on safety/risks, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about which tasks can\'t be delayed without delaying the project.',
        },
        {
          id: 'u10-L6-Q6',
          type: 'fill-blank',
          question: 'In project scheduling, the longest sequence of _____ tasks that determines the minimum project duration is called the _____ path.',
          blanks: ['dependent', 'critical'],
          wordBank: ['dependent', 'critical', 'parallel', 'baseline', 'optional', 'sequential'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve. animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker. appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker. appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker. appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot. follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: 'The critical path is the longest chain of dependent activities; any delay on a critical-path task directly delays the project. Tasks not on the critical path have float (slack).',
          hint: 'This scheduling concept identifies which chain of tasks.'
        }
      ]
    },
    {
      id: 'u10-L-conv',
      title: 'Mock Technical Interview',
      description: 'Practice a realistic technical interview scenario with an engineering manager.',
      icon: '\u{1F4AC}',
      type: 'conversation',
      xpReward: 20,
      questions: [],
      conversationStartNodeId: 'u10-L-conv-C1',
      conversationNodes: [
        {
          id: 'u10-L-conv-C1',
          speaker: 'Hiring Manager',
          message: 'Thanks for coming in. I\'m going to walk you through a design scenario. A customer reports that our stainless steel pump shaft is cracking after 6 months of service in a chemical plant. How would you start investigating?',
          nextNodeId: 'u10-L-conv-C2',
        },
        {
          id: 'u10-L-conv-C2',
          speaker: 'Hiring Manager',
          message: 'Walk me through your approach.',
          options: [
            {
              text: 'First, I\'d preserve the failed shaft for fractography. Then I\'d gather operating conditions: fluid chemistry, temperature, pressure cycles, and maintenance history. The fracture surface will tell us whether it\'s fatigue, SCC, or overload.',
              nextNodeId: 'u10-L-conv-C3',
              quality: 'great',
              feedback: 'Excellent. You prioritized evidence preservation and systematic data gathering before jumping to conclusions.',
            },
            {
              text: 'I\'d replace the shaft with a stronger material right away so the customer isn\'t down.',
              nextNodeId: 'u10-L-conv-C3',
              quality: 'poor',
              feedback: 'Jumping to a fix without understanding the root cause often leads to repeat failures. You also lose valuable evidence.',
            },
            {
              text: 'I\'d check the material certificate to see if it meets spec, then look at the fracture surface.',
              nextNodeId: 'u10-L-conv-C3',
              quality: 'okay',
              feedback: 'Material verification is good, but you should also gather operating conditions and preserve evidence first.',
            },
          ],
        },
        {
          id: 'u10-L-conv-C3',
          speaker: 'Hiring Manager',
          message: 'Good. The fractography shows branching cracks that follow grain boundaries. The fluid is warm chloride solution. What\'s your diagnosis?',
          nextNodeId: 'u10-L-conv-C4',
        },
        {
          id: 'u10-L-conv-C4',
          speaker: 'Hiring Manager',
          message: 'What failure mechanism are we looking at?',
          options: [
            {
              text: 'Chloride stress corrosion cracking. Austenitic stainless steels are susceptible in warm chloride environments under tensile stress. I\'d recommend switching to a duplex stainless or a nickel alloy.',
              nextNodeId: 'u10-L-conv-C5',
              quality: 'great',
              feedback: 'Spot on. Branching intergranular cracks plus chlorides plus austenitic stainless is the classic SCC triad. Your material suggestion is practical too.',
            },
            {
              text: 'It\'s probably fatigue from pressure cycling.',
              nextNodeId: 'u10-L-conv-C5',
              quality: 'poor',
              feedback: 'Fatigue shows beach marks and striations, not branching intergranular cracks. The chloride environment is a key clue you shouldn\'t ignore.',
            },
            {
              text: 'Could be some kind of corrosion issue given the chlorides. I\'d need to run more tests.',
              nextNodeId: 'u10-L-conv-C5',
              quality: 'okay',
              feedback: 'You\'re on the right track with corrosion, but the branching intergranular pattern is specific enough to diagnose SCC directly.',
            },
          ],
        },
        {
          id: 'u10-L-conv-C5',
          speaker: 'Hiring Manager',
          message: 'Last question. The customer asks: can we just add a coating instead of changing materials? It\'s cheaper. How do you handle this?',
          nextNodeId: 'u10-L-conv-C6',
        },
        {
          id: 'u10-L-conv-C6',
          speaker: 'Hiring Manager',
          message: 'What do you tell the customer?',
          options: [
            {
              text: 'Coatings can help but they\'re not foolproof. Any scratch or holiday in the coating exposes the base metal to the same SCC risk. For a rotating shaft with wear, I\'d recommend the material change for long-term reliability, but we could coat a trial unit to compare.',
              nextNodeId: 'u10-L-conv-C7',
              quality: 'great',
              feedback: 'Great balance of technical honesty and customer diplomacy. You explained the risk without dismissing their concern, and offered a data-driven path forward.',
            },
            {
              text: 'No, coatings won\'t work. We have to change the material. Period.',
              nextNodeId: 'u10-L-conv-C7',
              quality: 'okay',
              feedback: 'Technically cautious, but dismissing the customer\'s idea without explanation damages the relationship. Explain why.',
            },
            {
              text: 'Sure, let\'s try the coating. If the customer wants cheaper, we should do cheaper.',
              nextNodeId: 'u10-L-conv-C7',
              quality: 'poor',
              feedback: 'Agreeing to a risky approach just to save cost is poor engineering judgment. If the coating fails, you have the same cracking problem again.',
            },
          ],
        },
        {
          id: 'u10-L-conv-C7',
          speaker: 'Hiring Manager',
          message: 'I like your structured approach. You preserved evidence, identified the mechanism correctly, and handled the customer question professionally. That\'s what we look for.',
          nextNodeId: 'u10-L-conv-C8',
        },
        {
          id: 'u10-L-conv-C8',
          speaker: 'Narrator',
          message: 'You walked through a realistic failure analysis interview: evidence preservation, root cause diagnosis, material recommendation, and customer communication. These are the skills that get you hired.',
        },
      ],
    },
    {
      id: 'u10-L-speed',
      title: 'Interview Rapid Fire',
      description: 'Race the clock on estimation, failure analysis, design, FEA, and standards questions.',
      icon: '\u{26A1}',
      type: 'speed-round',
      xpReward: 20,
      questions: [],
      speedTimeLimit: 60,
      speedQuestions: [
        { id: 'u10-L-speed-SQ1', question: 'Steel density is approximately:', options: ['7,850 kg/m3', '2,700 kg/m3', '1,000 kg/m3', '11,300 kg/m3'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ2', question: 'Beach marks on a fracture surface indicate:', options: ['Corrosion', 'Overload', 'Creep', 'Fatigue'], correctIndex: 3 },
        { id: 'u10-L-speed-SQ3', question: 'DFA primarily aims to:', options: ['Improve surface finish', 'Increase strength', 'Reduce part count', 'Lower temperature'], correctIndex: 2 },
        { id: 'u10-L-speed-SQ4', question: '1 horsepower is approximately:', options: ['100 W', '1,000 W', '500 W', '750 W'], correctIndex: 3 },
        { id: 'u10-L-speed-SQ5', question: 'Hoop stress in a thin-walled cylinder:', options: ['PD/2t', 'PD/4t', 'Pt/2D', 'PD/t'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ6', question: 'The 5 Whys technique finds:', options: ['Root cause', 'Material properties', 'Optimal design', 'Failure load'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ7', question: 'Euler buckling load depends on:', options: ['EI/L^2', 'Yield strength', 'Density', 'Hardness'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ8', question: 'Stress singularity in FEA occurs at:', options: ['Sharp corners', 'Round holes', 'Flat surfaces', 'Uniform sections'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ9', question: 'Pump flow rate scales with speed as:', options: ['N^1', 'N^2', 'N^3', 'N^0.5'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ10', question: 'SCC requires all EXCEPT:', options: ['High RPM', 'Tensile stress', 'Corrosive environment', 'Susceptible material'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ11', question: 'Pugh matrix compares designs against a:', options: ['Datum', 'Cost target', 'Weight limit', 'Stress limit'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ12', question: 'ISO 9001 covers:', options: ['Quality management', 'Pressure vessels', 'Electrical safety', 'Food safety'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ13', question: 'A36 steel yield strength is about:', options: ['250 MPa', '500 MPa', '100 MPa', '1,000 MPa'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ14', question: 'FMEA rates risk using:', options: ['Severity x Occurrence x Detection', 'Cost x Weight', 'Stress x Strain', 'Temperature x Time'], correctIndex: 0 },
        { id: 'u10-L-speed-SQ15', question: 'Reynolds number compares:', options: ['Inertial to viscous forces', 'Pressure to gravity', 'Thermal to kinetic', 'Elastic to plastic'], correctIndex: 0 },
      ],
    },
  ]
};
