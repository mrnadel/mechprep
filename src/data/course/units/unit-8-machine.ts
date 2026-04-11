import type { Unit } from '../types';

export const unit8: Unit = {
  id: 'u8-machine',
  title: 'Machine Design',
  description: 'Shafts, bearings, gears, fasteners, springs, and seals: core machine element design for mechanical engineers.',
  color: '#3B82F6',
  icon: '⚙️',
  topicId: 'machine-elements',
  lessons: [
    // ─────────────────────────────────────────────────────────────
    // LESSON 1a: Shafts & Keys : Basics
    // ──────────���──────────────────────────────────────────────────
    {
      id: 'u8-L1',
      title: 'Shaft Basics',
      description: 'What shafts do, torque transmission, and basic sizing.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L1-T1',
          type: 'teaching',
          question: 'What shafts actually do',
          explanation: 'A shaft is a rotating machine element that transmits power through torque and supports components like gears, pulleys, and bearings. Designing one means sizing the diameter to handle combined bending and torsion loads safely.',
          hint: 'Every rotating machine has at least one shaft.',
        },
        {
          id: 'u8-L1-Q1a',
          type: 'true-false',
          question: 'A shaft transmits power by rotating under torque.',
          correctAnswer: true,
          explanation: 'Yes. Shafts transmit mechanical power through rotation. Power equals torque times angular velocity (P = T x omega).',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Think about what a motor output shaft does.',
        },
        {
          id: 'u8-L1-Q1',
          type: 'multiple-choice',
          question: 'A shaft broke at a keyway. Beach marks radiate from the keyway corner. What failure mode is this?',
          options: [
            'The shaft was overloaded in a single static event',
            'Fatigue initiated at stress concentration from keyway',
            'The key was too loose, causing twist and shear',
            'Corrosion gradually weakened the shaft'
          ],
          correctIndex: 1,
          explanation: 'Beach marks are the definitive indicator of fatigue failure. The crack originated at the keyway corner, a classic stress concentration site (Kt = 2.0 to 3.0).',
          distractorExplanations: {
            0: 'This focuses on shaft/overloaded, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on loose,/causing, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on corrosion/gradually, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Beach marks point to the failure mode.',
        },
        {
          id: 'u8-L1-Q2',
          type: 'multiple-choice',
          question: 'A shaft transmits 50 kW at 1500 RPM. Distortion energy gives d_min = 38 mm. Why would you select a larger diameter?',
          options: [
            'No adjustment needed, 38 mm is the answer',
            'Round up to 40 mm for standard sizing',
            'Double it to 76 mm for safety factor of 2.0',
            'Only round up to 39 mm, going larger wastes material'
          ],
          correctIndex: 1,
          explanation: 'Shaft sizing never stops at the formula result. Account for standard sizes, keyway stress concentration, bearing bore, and deflection limits.',
          distractorExplanations: {
            0: 'This focuses on adjustment/needed,, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on double/safety, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than round going suggests.',
          },
          hint: 'The formula gives a minimum; real-world factors add more.',
        },
        {
          id: 'u8-L1-T1b',
          type: 'teaching',
          question: 'Torsional shear stress in shafts',
          explanation: 'When a shaft transmits torque T, shear stress varies linearly from zero at the center to maximum at the surface: tau = Tc/J, where c is the outer radius and J is the polar moment of inertia.',
          hint: 'Try this now: look up tau = 16T/(pi*d^3) for solid shafts.',
        },
        {
          id: 'u8-L1-Q24',
          type: 'true-false',
          question: 'For a shaft under pure torsion, the maximum shear stress occurs at the center of the shaft cross-section.',
          correctAnswer: false,
          explanation: 'For a solid circular shaft under torsion, shear stress is linear from zero at the center to maximum at the outer surface. tau = Tr/J.',
          distractorExplanations: {
            0: 'For a solid circular shaft under torsion, shear stress is linear from zero at the center to maximum at the outer surface.',
          },
          hint: 'Consider the torsion formula tau = Tr/J.',
        },
        {
          id: 'u8-L1-MP1',
          type: 'match-pairs',
          question: 'Match each shaft concept to its description.',
          options: ['Torque', 'Critical speed', 'Keyway', 'Shaft shoulder'],
          matchTargets: ['Twisting load that transmits power', 'RPM where vibration peaks', 'Slot for locking gears to shaft', 'Step change for axial location'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Torque drives rotation, critical speed causes resonance, keyways lock components, and shoulders locate them axially.',
          hint: 'Think about what each feature does on a shaft.',
        },
        {
          id: 'u8-L1-Q7',
          type: 'multiple-choice',
          question: 'A 45 mm diameter shaft transmits 30 kW at 720 RPM. What is the maximum shear stress due to torsion alone?',
          options: [
            '11.1 MPa',
            '22.1 MPa',
            '33.2 MPa',
            '44.2 MPa'
          ],
          correctIndex: 1,
          explanation: 'T = P/omega = 30000/(720 x 2pi/60) = 397.9 N*m. J = pi*d^4/32 = 4.026 x 10^-7 m^4. tau = Tc/J = 397.9 x 0.0225 / 4.026e-7 = 22.1 MPa.',
          distractorExplanations: {
            0: '11.1 is approximately half the correct answer, likely from omitting a required factor of 2.',
            2: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: '44.2 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
          },
          hint: 'Use T = P/omega, then tau = Tc/J where c = d/2.',
        },
        {
          id: 'u8-L1-Q8',
          type: 'multiple-choice',
          question: 'Per the maximum shear stress theory (Tresca), the equivalent shear stress on a shaft under bending M and torque T is:',
          options: [
            'tau_eq = (M + T) / (pi*d^3/16)',
            'tau_eq = sqrt(M^2 + T^2) * 16/(pi*d^3)',
            'tau_eq = (M^2 + T^2) / (pi*d^3/32)',
            'tau_eq = 16/(pi*d^3) * (M + T/2)'
          ],
          correctIndex: 1,
          explanation: 'For combined bending and torsion on a solid circular shaft, the principal stresses come from the Mohr circle. The equivalent shear stress uses the square root of the sum of squares.',
          distractorExplanations: {
            0: 'This focuses on (pi*d^3/16), which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on (pi*d^3/32), which is not the correct mechanism or principle for this problem.',
            3: 'Regarding taueq: For combined bending and torsion on a solid circular shaft, the principal stresses come from the Mohr circle.',
          },
          hint: 'Combine bending stress sigma = 32M/(pi*d^3) and torsional shear.',
        },
        {
          id: 'u8-L1-Q3',
          type: 'true-false',
          question: 'A shaft operating above its first critical speed will always experience dangerous vibrations and should be avoided.',
          correctAnswer: false,
          explanation: 'Supercritical shaft operation is routine in turbomachinery, centrifugal separators, and dental drills. They pass through the critical speed quickly during startup.',
          distractorExplanations: {
            0: 'Supercritical shaft operation is routine in turbomachinery, centrifugal separators, and dental drills.',
          },
          hint: 'Think about what happens to shaft deflection as speed continues past the resonance.',
        },
        {
          id: 'u8-L1-SB1',
          type: 'sort-buckets',
          question: 'Sort these into "Increases shaft life" or "Decreases shaft life".',
          options: ['Larger fillet radius', 'Sharp keyway corners', 'Shot peening surface', 'Press-fit hub', 'Polished surface finish', 'Corrosive environment'],
          buckets: ['Increases life', 'Decreases life'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Larger fillets, shot peening, and polished surfaces improve fatigue life. Sharp corners, press-fits, and corrosion hurt it.',
          hint: 'Stress concentrations and surface damage reduce fatigue life.',
        },
      ]
    },
    // ���────────────────────────────────────────────────────────────
    // LESSON 1b: Shafts & Keys : Keys, Splines, and Critical Speed
    // ─────────���─────────────────���─────────────────────────────��───
    {
      id: 'u8-L1b',
      title: 'Keys & Critical Speed',
      description: 'Key types, spline connections, critical speed, and Dunkerley formula.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L1-T2',
          type: 'teaching',
          question: 'Keys, keyways, and stress risers',
          explanation: 'A key is a small metal piece that locks a gear or pulley to a shaft for torque transfer. The keyway slot creates a stress concentration (Kt = 2 to 3), making it the most common fatigue crack initiation site on shafts.',
          hint: 'Larger fillet radii in the keyway reduce Kt significantly.',
        },
        {
          id: 'u8-L1b-Q1a',
          type: 'true-false',
          question: 'A keyway creates a stress concentration on a shaft.',
          correctAnswer: true,
          explanation: 'Yes. The sharp corners of a keyway slot raise local stress by a factor of 2 to 3, making it a common fatigue crack initiation site.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Sharp geometric changes raise local stress.',
        },
        {
          id: 'u8-L1-Q9',
          type: 'multiple-choice',
          question: 'Primary advantage of using an involute spline instead of a single key for torque transmission?',
          options: [
            'Splines are cheaper to manufacture than keyways',
            'Splines distribute torque uniformly around the circumference',
            'Splines allow axial sliding on the shaft',
            'Splines create a permanent, non-removable joint'
          ],
          correctIndex: 1,
          explanation: 'A single keyway creates a severe stress concentration and transmits torque through a single contact area. Splines distribute the load around the full circumference.',
          distractorExplanations: {
            0: 'This focuses on cheaper/manufacture, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on allow/axial, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on create/permanent,, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Compare the load path: one keyway slot vs. many spline teeth.',
        },
        {
          id: 'u8-L1-Q15',
          type: 'true-false',
          question: 'A Woodruff key is preferred over a rectangular key when the shaft diameter is large (>100 mm) and the torque is very high.',
          correctAnswer: false,
          explanation: 'Woodruff keys are semicircular and preferred for small shafts and light-to-moderate torque. They self-align with tapered hubs but have less shear area than rectangular keys.',
          distractorExplanations: {
            0: 'Woodruff keys are semicircular and preferred for small shafts and light-to-moderate torque.',
          },
          hint: 'Consider which key type provides more shear area.',
        },
        {
          id: 'u8-L1-T2b',
          type: 'teaching',
          question: 'Critical speed and the Dunkerley formula',
          explanation: 'Every shaft has a critical speed where vibration spikes because RPM matches a natural frequency. The Dunkerley formula estimates it for multi-mass shafts: 1/omega_c^2 = 1/omega_1^2 + 1/omega_2^2 + ...',
          hint: 'Try this now: Dunkerley always gives a conservative (lower) estimate.',
        },
        {
          id: 'u8-L1-Q5',
          type: 'multiple-choice',
          question: 'A centrifuge operates at 12,000 RPM but its first critical speed is 8,000 RPM. Is this design safe?',
          options: [
            'Unsafe, operating above critical always causes failure',
            'Safe, supercritical operation is routine if you pass through quickly',
            'Only safe if balanced to sub-gram precision',
            'Safe only below twice the critical speed'
          ],
          correctIndex: 1,
          explanation: 'Supercritical operation (above the first critical speed) is completely routine in many high-speed machines.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; unsafe operating the principle has important exceptions.',
            2: 'This is too restrictive; the principle applies more broadly than balanced sub-gram suggests.',
            3: 'This is too restrictive; the principle applies more broadly than below twice suggests.',
          },
          hint: 'Consider what actually happens above the critical speed.',
        },
        {
          id: 'u8-L1-Q6',
          type: 'fill-blank',
          question: 'The phenomenon where a rotating shaft deflects laterally because its speed matches a natural frequency is called _____ (or whirling).',
          blanks: ['critical speed'],
          wordBank: ['critical speed', 'resonance frequency', 'flutter', 'precession', 'vibration mode'],
          explanation: 'Critical speed (whirling) occurs when rotation speed coincides with a natural frequency of lateral vibration, causing large deflections.',
          hint: 'Rotational speed matches the natural frequency.',
        },
        {
          id: 'u8-L1-Q16',
          type: 'multiple-choice',
          question: 'How does the Dunkerley formula combine individual critical speeds of a multi-mass shaft?',
          options: [
            'Add all speeds directly',
            'Average the individual speeds',
            'Reciprocal sum: 1/omega_c^2 = 1/omega_1^2 + 1/omega_2^2 + ...',
            'Multiply all speeds together'
          ],
          correctIndex: 2,
          explanation: 'The Dunkerley formula estimates the first critical speed by combining individual critical speeds using reciprocal squares. It gives a lower-bound (conservative) estimate.',
          distractorExplanations: {
            0: 'This focuses on speeds/directly, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on average/individual, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on multiply/speeds, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'This method provides a lower-bound estimate.',
        },
        {
          id: 'u8-L1-Q10',
          type: 'true-false',
          question: 'A hollow shaft (same OD and material as solid) always has lower critical speed due to less stiffness.',
          correctAnswer: false,
          explanation: 'A hollow shaft is lighter than a solid shaft of the same OD. Its stiffness (I) decreases less than its mass per unit length, so the stiffness-to-mass ratio can actually increase.',
          distractorExplanations: {
            0: 'A hollow shaft is lighter than a solid shaft of the same OD.',
          },
          hint: 'Critical speed depends on the ratio of stiffness to mass.',
        },
        {
          id: 'u8-L1b-OS1',
          type: 'order-steps',
          question: 'Order the shaft design process from start to finish.',
          steps: ['Identify loads (torque, bending, axial)', 'Calculate minimum diameter from strength criteria', 'Apply stress concentration and safety factors', 'Select standard shaft size and check deflection', 'Verify critical speed is above operating range'],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Shaft design starts with load analysis, then strength sizing, then practical adjustments for stress risers, standard sizes, and dynamics.',
          hint: 'You need to know the loads before you can size anything.',
        },
        {
          id: 'u8-L1-Q30',
          type: 'fill-blank',
          question: 'A key that is semicircular in shape and sits in a semicircular pocket milled into the shaft is called a _____ key.',
          blanks: ['Woodruff'],
          wordBank: ['Woodruff', 'feather', 'square', 'Gib-head', 'spline'],
          explanation: 'The Woodruff key is a semicircular (half-moon) shaped key that fits into a semicircular pocket. It is commonly used on tapered shaft sections because it can tilt slightly to align.',
          hint: 'This key type is named after its inventor.',
        },
      ]
    },
    // ───────��────────────────────────────��────────────────────────
    // LESSON 1c: Shafts & Keys : Fatigue Design and Advanced Sizing
    // ─────────��──────────────��─────────────────────────────────���──
    {
      id: 'u8-L1c',
      title: 'Shaft Fatigue Design',
      description: 'Fatigue criteria (Soderberg, Goodman, Gerber), Marin factors, and advanced shaft sizing.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L1-T3',
          type: 'teaching',
          question: 'Critical speed and fatigue criteria',
          explanation: 'For fatigue design, the Soderberg, Goodman, and Gerber criteria combine alternating and mean stresses to predict safe life. Soderberg is the most conservative, using yield strength on the mean stress axis.',
          hint: 'The Soderberg criterion is the most conservative of the three.',
        },
        {
          id: 'u8-L1c-Q1a',
          type: 'multiple-choice',
          question: 'Which fatigue criterion is the most conservative?',
          options: ['Goodman', 'Soderberg', 'Gerber', 'They are all identical'],
          correctIndex: 1,
          explanation: 'Soderberg uses yield strength (not ultimate) for the mean stress axis, making it the most conservative choice for ductile materials.',
          distractorExplanations: {
          },
          hint: 'The one that uses yield strength instead of ultimate.',
        },
        {
          id: 'u8-L1-Q4',
          type: 'multiple-choice',
          question: 'In ASME shaft code, why is K_b > K_t for the same loading?',
          options: [
            'Bending forces are always larger than torsional forces',
            'A rotating shaft under fixed bending creates fully reversed stress',
            'Bending causes axial deflection that damages bearings',
            'The bending factor is arbitrary from older codes'
          ],
          correctIndex: 1,
          explanation: 'A rotating shaft with a fixed bending load sees each surface point cycle from tension to compression each revolution, creating fully reversed stress, which is the most damaging fatigue condition.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; bending forces the principle has important exceptions.',
            2: 'This focuses on causes/axial, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on factor/arbitrary, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Consider what a single point on the shaft surface experiences during one revolution.',
        },
        {
          id: 'u8-L1-Q12',
          type: 'multiple-choice',
          question: 'Soderberg criterion compares equivalent stress against which property?',
          options: [
            'Ultimate tensile strength (S_ut)',
            'Yield strength (S_y)',
            'Endurance limit (S_e)',
            'Fracture toughness (K_Ic)'
          ],
          correctIndex: 1,
          explanation: 'Soderberg draws a line from the endurance limit (alternating axis) to the yield strength (mean axis). Points below the line are considered safe.',
          distractorExplanations: {
            0: 'This focuses on ultimate/tensile, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on endurance/limit, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on fracture/toughness, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Soderberg is the most conservative of the common fatigue criteria.',
        },
        {
          id: 'u8-L1c-T2',
          type: 'teaching',
          question: 'Marin factors and real-world endurance',
          explanation: 'Lab endurance limits come from polished, small-diameter specimens. Real shafts have rougher surfaces, larger sizes, and higher temperatures, and marin derating factors (surface, size, reliability, temperature) reduce the lab value to a practical one, often 25 to 50% of the original.',
          hint: 'Try this now: check how surface finish affects S_e for your next design.',
        },
        {
          id: 'u8-L1-Q19',
          type: 'true-false',
          question: 'In service, a shaft\'s endurance limit is typically 25 to 50% of the lab specimen value due to Marin derating factors.',
          correctAnswer: true,
          explanation: 'Standard endurance values come from polished, small specimens. Real conditions (surface finish, size, temperature, reliability) reduce the practical endurance limit significantly.',
          distractorExplanations: {
            1: 'Standard endurance values come from polished, small specimens.',
          },
          hint: 'Consider the Marin modification factors.',
        },
        {
          id: 'u8-L1c-MP1',
          type: 'match-pairs',
          question: 'Match each fatigue criterion to its mean stress reference.',
          options: ['Soderberg', 'Goodman', 'Gerber', 'ASME-elliptic'],
          matchTargets: ['Yield strength (linear)', 'Ultimate strength (linear)', 'Ultimate strength (parabolic)', 'Yield + endurance (ellipse)'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Soderberg uses S_y (linear), Goodman uses S_ut (linear), Gerber uses S_ut (parabola), and ASME-elliptic uses an ellipse between S_y and S_e.',
          hint: 'Each criterion defines a different safe zone boundary.',
        },
        {
          id: 'u8-L1-Q27',
          type: 'multiple-choice',
          question: 'Using the approximation S_e\' = 0.5*S_ut for steels with S_ut = 900 MPa, what is the uncorrected endurance limit?',
          options: [
            '327 MPa',
            '450 MPa',
            '655 MPa',
            '700 MPa'
          ],
          correctIndex: 1,
          explanation: 'For steels with S_ut < 1400 MPa: S_e\' = 0.5 x S_ut = 0.5 x 900 = 450 MPa. This is the lab specimen value before Marin corrections.',
          distractorExplanations: {
            0: 'This numerical value does not result from the correct formula applied to the given parameters.',
            2: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: 'This numerical value does not result from the correct formula applied to the given parameters.',
          },
          hint: 'The standard approximation for steel endurance limit.',
        },
        {
          id: 'u8-L1-Q18',
          type: 'multiple-choice',
          question: 'Using von Mises theory with M = 500 N*m and T = 400 N*m, what is the equivalent bending moment?',
          options: [
            'M_eq = 570 N*m',
            'M_eq = 583 N*m',
            'M_eq = 640 N*m',
            'M_eq = 900 N*m'
          ],
          correctIndex: 1,
          explanation: 'M_eq = sqrt(M^2 + (3/4)*T^2) = sqrt(500^2 + 0.75*400^2) = sqrt(250000 + 120000) = sqrt(370000) = 583 N*m.',
          distractorExplanations: {
            0: 'M_eq = sqrt(M^2 + (3/4)*T^2) = sqrt(500^2 + 0.75*400^2) = sqrt(250000 + 120000) = sqrt(370000) = 583 N*m.',
            2: 'M_eq = sqrt(M^2 + (3/4)*T^2) = sqrt(500^2 + 0.75*400^2) = sqrt(250000 + 120000) = sqrt(370000) = 583 N*m.',
            3: 'M_eq = sqrt(M^2 + (3/4)*T^2) = sqrt(500^2 + 0.75*400^2) = sqrt(250000 + 120000) = sqrt(370000) = 583 N*m.',
          },
          hint: 'Von Mises equivalent: M_eq = sqrt(M^2 + 0.75*T^2).',
        },
        {
          id: 'u8-L1-Q29',
          type: 'multiple-choice',
          question: 'Using the DE-Goodman criterion with sigma_a = 200 MPa and tau_m = 80 MPa, what is the equivalent mean stress?',
          options: [
            'sigma_m\' = 80 MPa (shear unchanged)',
            'sigma_m\' = 138.6 MPa (sqrt(3) x 80)',
            'sigma_m\' = 160 MPa (2 x 80)',
            'sigma_m\' = 0 MPa (mean stress ignored)'
          ],
          correctIndex: 1,
          explanation: 'The distortion energy theory converts shear stress to equivalent normal stress by multiplying by sqrt(3). So sigma_m\' = sqrt(3) x 80 = 138.6 MPa.',
          distractorExplanations: {
            0: 'Regarding sigmam: The distortion energy theory converts shear stress to equivalent normal stress by multiplying by sqrt(3).',
            2: 'Regarding sigmam: The distortion energy theory converts shear stress to equivalent normal stress by multiplying by sqrt(3).',
            3: 'Regarding sigmam: The distortion energy theory converts shear stress to equivalent normal stress by multiplying by sqrt(3).',
          },
          hint: 'The DE theory converts shear to equivalent normal stress.',
        },
        {
          id: 'u8-L1-Q11',
          type: 'multiple-choice',
          question: 'A shaft shoulder has Kt = 2.5. Which approach is most effective at reducing it?',
          options: [
            'Add a retaining ring groove nearby',
            'Add a second step keeping the same fillet radii',
            'Polish the fillet to mirror finish',
            'Increase fillet radius from 1 mm to 4 mm'
          ],
          correctIndex: 3,
          explanation: 'The fillet radius is the dominant factor controlling stress concentration at a shoulder. Increasing it from 1 to 4 mm can drop Kt from 2.5 to 1.5 or less.',
          distractorExplanations: {
            0: 'This focuses on retaining/groove, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on second/keeping, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on polish/mirror, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Which geometric parameter has the greatest influence on Kt?',
        },
      ]
    },
    // ─��───────────────────────────────────────────────────────────
    // LESSON 2a: Bearings & Lubrication : Bearing Types
    // ─────────────────────────────────────────────────────────────
    {
      id: 'u8-L2',
      title: 'Bearing Types',
      description: 'Rolling vs. plain bearings, ball, roller, needle, and angular contact types.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L2-T1',
          type: 'teaching',
          question: 'Rolling vs plain bearings',
          explanation: 'Bearings support rotating shafts and reduce friction. Rolling element bearings (ball, roller) use small rolling parts between races, and plain (journal) bearings use an oil film between the shaft and a sleeve.',
          hint: 'Most electric motors use ball bearings for their simplicity.',
        },
        {
          id: 'u8-L2-Q1a',
          type: 'true-false',
          question: 'Ball bearings use rolling elements to reduce friction between a shaft and its housing.',
          correctAnswer: true,
          explanation: 'Yes. Ball bearings replace sliding friction with rolling friction by placing balls between inner and outer races.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Rolling contact has much lower friction than sliding contact.',
        },
        {
          id: 'u8-L2-Q2',
          type: 'multiple-choice',
          question: 'When would you choose a deep groove ball bearing over a tapered roller bearing?',
          options: [
            'Use tapered roller in every case',
            'Use deep groove ball in every case',
            'Deep groove for high-speed, low-load; tapered roller for heavy loads',
            'The choice depends only on catalog life calculation'
          ],
          correctIndex: 2,
          explanation: 'Deep groove ball bearings excel at high speed and moderate loads. Tapered rollers handle heavy combined radial and axial loads but have more friction.',
          distractorExplanations: {
            0: 'This focuses on every, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on every, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than choice depends suggests.',
          },
          hint: 'Match the bearing characteristics to the application requirements.',
        },
        {
          id: 'u8-L2-SB1',
          type: 'sort-buckets',
          question: 'Sort these bearings into "Handles axial load" vs. "Radial only".',
          options: ['Angular contact ball', 'Tapered roller', 'Cylindrical roller (NU type)', 'Needle roller', 'Thrust ball', 'Deep groove ball'],
          buckets: ['Handles axial load', 'Radial only'],
          correctBuckets: [0, 0, 1, 1, 0, 0],
          explanation: 'Angular contact, tapered roller, thrust ball, and deep groove ball bearings handle axial loads. Standard cylindrical and needle rollers are radial only.',
          hint: 'Contact angle allows a bearing to take axial load.',
        },
        {
          id: 'u8-L2-Q10',
          type: 'multiple-choice',
          question: 'A self-aligning ball bearing can accommodate 2 to 3 degrees of misalignment. What makes this possible?',
          options: [
            'Higher load capacity than deep groove bearings',
            'A spherical (concave) outer raceway that lets the inner ring tilt',
            'Lower friction than any other bearing type',
            'It can handle high axial loads in both directions'
          ],
          correctIndex: 1,
          explanation: 'Self-aligning ball bearings have a spherical outer raceway that allows the inner ring assembly to tilt 2 to 3 degrees relative to the outer ring.',
          distractorExplanations: {
            0: 'This focuses on higher/capacity, which is not the correct mechanism or principle for this problem.',
            2: 'Friction is not the governing mechanism here; the correct answer involves a different physical principle.',
            3: 'This focuses on handle/axial, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The outer raceway shape is the key feature.',
        },
        {
          id: 'u8-L2-T1b',
          type: 'teaching',
          question: 'Bearing fits and mounting',
          explanation: 'When the shaft rotates, the inner race needs an interference fit (tight on shaft, e.g. k5, m5) to prevent creep. The outer race gets a clearance fit in the housing, and reverse the fits when the housing rotates instead.',
          hint: 'The race that rotates relative to the load needs an interference fit.',
        },
        {
          id: 'u8-L2-Q17',
          type: 'multiple-choice',
          question: 'Which fit is typically used between a shaft and a bearing inner race?',
          options: [
            'Clearance on shaft, interference in housing',
            'Interference on shaft, clearance in housing',
            'Clearance on both',
            'Interference on both'
          ],
          correctIndex: 1,
          explanation: 'When the shaft rotates, the inner race rotates with it (rotating load on inner race), so it needs an interference fit to prevent creep.',
          distractorExplanations: {
            0: 'The reasoning about clearance shaft does not correctly apply to this engineering problem.',
            2: 'The reasoning about clearance does not correctly apply to this engineering problem.',
            3: 'The reasoning about interference does not correctly apply to this engineering problem.',
          },
          hint: 'The race that rotates relative to the load direction needs a tight fit.',
        },
        {
          id: 'u8-L2-Q13',
          type: 'true-false',
          question: 'Needle roller bearings are ideal for applications with large available radial space but limited axial space.',
          correctAnswer: false,
          explanation: 'This is reversed. Needle rollers are thin and long, making them ideal when radial space is limited. They have a very small cross-section compared to standard rollers.',
          distractorExplanations: {
            0: 'This is reversed.',
          },
          hint: 'Needle rollers are thin and long.',
        },
        {
          id: 'u8-L2-MP1',
          type: 'match-pairs',
          question: 'Match each bearing type to its best application.',
          options: ['Deep groove ball', 'Tapered roller', 'Needle roller', 'Spherical roller'],
          matchTargets: ['High-speed electric motor', 'Heavy axial + radial in gearbox', 'Tight radial space (con rod)', 'Heavy load with misalignment'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Each bearing type is optimized for specific load, speed, and space constraints.',
          hint: 'Match the bearing strength to the application need.',
        },
        {
          id: 'u8-L2-Q11',
          type: 'multiple-choice',
          question: 'What is the primary advantage of an angular contact bearing over a deep groove ball bearing?',
          options: [
            'Lower friction for the same load',
            'Higher combined axial and radial load capacity',
            'Cheaper to manufacture',
            'No preload required'
          ],
          correctIndex: 1,
          explanation: 'The contact angle (typically 15 to 40 degrees) allows angular contact bearings to support significant axial loads alongside radial loads.',
          distractorExplanations: {
            0: 'Friction is not the governing mechanism here; the correct answer involves a different physical principle.',
            2: 'This focuses on cheaper/manufacture, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on preload/required, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The contact angle determines how the load is distributed.',
        },
        {
          id: 'u8-L2-Q5',
          type: 'multiple-choice',
          question: 'A bearing inner race shows spalling in a narrow band, but the outer race looks normal. What caused this?',
          options: [
            'Normal fatigue from exceeding rated L10 life',
            'Contaminated lubricant with abrasive particles',
            'Misalignment concentrated load on a narrow band',
            'Electrical discharge damage (fluting)'
          ],
          correctIndex: 2,
          explanation: 'The wear pattern is diagnostic. Normal loading distributes contact across most of the raceway width. A narrow band indicates concentrated load from misalignment.',
          distractorExplanations: {
            0: 'This focuses on normal/fatigue, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on contaminated/lubricant, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on electrical/discharge, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The key clue is that the spalling is in a narrow band.',
        },
      ]
    },
    // ───────────────────────────────────────���─────────────────────
    // LESSON 2b: Bearings & Lubrication : L10 Life and Selection
    // ──���────────────────────��─────────────────────────��───────────
    {
      id: 'u8-L2b',
      title: 'Bearing Life & Selection',
      description: 'L10 life calculation, dynamic load ratings, equivalent loads, and reliability adjustments.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L2-T2',
          type: 'teaching',
          question: 'L10 life and load ratings',
          explanation: 'L10 life is the number of revolutions that 90% of identical bearings will survive under a given load. It\'s calculated as L10 = (C/P)^p, where C is the catalog dynamic load rating, P is the applied load, and p = 3 for ball bearings or 10/3 for roller bearings.',
          hint: 'Doubling the load on a ball bearing cuts life to 1/8.',
        },
        {
          id: 'u8-L2b-Q1a',
          type: 'true-false',
          question: 'L10 life means 90% of bearings survive to that number of revolutions.',
          correctAnswer: true,
          explanation: 'L10 (pronounced "L-ten") life means 10% failure rate, so 90% of bearings in a population will reach this life.',
          distractorExplanations: {
            1: 'L10 (pronounced .',
          },
          hint: 'The subscript 10 represents the failure percentage.',
        },
        {
          id: 'u8-L2-Q1',
          type: 'multiple-choice',
          question: 'A ball bearing has C = 25 kN and applied load P = 5 kN. What is L10 in millions of revolutions?',
          options: [
            '25 million revolutions',
            '125 million revolutions',
            '625 million revolutions',
            '3125 million revolutions'
          ],
          correctIndex: 1,
          explanation: 'For ball bearings: L10 = (C/P)^p where p = 3. L10 = (25/5)^3 = 5^3 = 125 million revolutions.',
          distractorExplanations: {
            0: '25 is one-quarter of the correct value, from an extra division or missing squared term.',
            2: 'This value results from an incorrect approach; million revolutions.',
            3: '3125 significantly exceeds the correct answer due to a fundamental formula or calculation error.',
          },
          hint: 'L10 = (C/P)^p with p = 3 for ball bearings.',
        },
        {
          id: 'u8-L2-Q6',
          type: 'fill-blank',
          question: 'The bearing life L_____ represents the number of revolutions at which 10% of bearings have failed.',
          blanks: ['10'],
          wordBank: ['10', '50', '90', '1', '5'],
          explanation: 'L10 life is the rated life at 90% reliability, meaning 10% of the population will have failed by this point.',
          hint: 'The subscript represents the percentage of bearings that fail.',
        },
        {
          id: 'u8-L2-Q7',
          type: 'multiple-choice',
          question: 'A roller bearing has C = 50 kN and P = 10 kN at 500 RPM. What is L10 in operating hours?',
          options: [
            '4630 hours',
            '6945 hours',
            '9260 hours',
            '13890 hours'
          ],
          correctIndex: 1,
          explanation: 'For roller bearings, p = 10/3. L10 = (50/10)^(10/3) = 5^3.333 = 208.3 million revolutions. Hours = 208.3e6 / (500 x 60) = 6945 hours.',
          distractorExplanations: {
            0: 'This numerical value does not result from the correct formula applied to the given parameters.',
            2: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: '13890 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
          },
          hint: 'Use p = 10/3 for roller bearings, then convert revolutions to hours.',
        },
        {
          id: 'u8-L2b-T2',
          type: 'teaching',
          question: 'Equivalent dynamic load and reliability',
          explanation: 'When a bearing sees both radial (Fr) and axial (Fa) loads, you combine them: P = X*Fr + Y*Fa. X and Y come from the bearing catalog based on the Fa/Fr ratio, and for higher reliability than 90%, multiply L10 by a factor less than 1 (e.g., 0.21 for 99% reliability).',
          hint: 'Try this now: look up X and Y factors in any bearing catalog.',
        },
        {
          id: 'u8-L2-Q8',
          type: 'multiple-choice',
          question: 'Fr = 4 kN, Fa = 3 kN, X = 0.56, Y = 1.2. What is the equivalent dynamic load P?',
          options: [
            'P = 4.0 kN',
            'P = 5.0 kN',
            'P = 5.84 kN',
            'P = 7.0 kN'
          ],
          correctIndex: 2,
          explanation: 'P = X*Fr + Y*Fa = 0.56 x 4 + 1.2 x 3 = 2.24 + 3.6 = 5.84 kN.',
          distractorExplanations: {
            0: 'P = X*Fr + Y*Fa = 0.56 x 4 + 1.2 x 3 = 2.24 + 3.6 = 5.84 kN.',
            1: 'P = X*Fr + Y*Fa = 0.56 x 4 + 1.2 x 3 = 2.24 + 3.6 = 5.84 kN.',
            3: 'P = X*Fr + Y*Fa = 0.56 x 4 + 1.2 x 3 = 2.24 + 3.6 = 5.84 kN.',
          },
          hint: 'P = X*Fr + Y*Fa. Plug in the values.',
        },
        {
          id: 'u8-L2-Q14',
          type: 'multiple-choice',
          question: 'A bearing application requires 99% reliability instead of 90%. How does this affect bearing life compared to L10?',
          options: [
            'Life increases by 10%',
            'Life drops to about 21% of L10',
            'Life drops to about 50% of L10',
            'No change, L10 already accounts for this'
          ],
          correctIndex: 1,
          explanation: 'The reliability adjustment factor a1 for 99% reliability is approximately 0.21. So L1 = 0.21 x L10.',
          distractorExplanations: {
            0: 'This focuses on increases, which is not the correct mechanism or principle for this problem.',
            2: 'Regarding drops: The reliability adjustment factor a1 for 99% reliability is approximately 0.21.',
            3: 'This focuses on change,/already, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Higher reliability means fewer bearings can fail, so rated life drops.',
        },
        {
          id: 'u8-L2b-OS1',
          type: 'order-steps',
          question: 'Order the bearing selection process.',
          steps: ['Determine radial and axial loads', 'Calculate equivalent dynamic load P', 'Choose required L10 life in hours', 'Calculate required dynamic load rating C', 'Select bearing from catalog with C >= required'],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Bearing selection starts with loads, then combined load, target life, required C rating, and finally catalog selection.',
          hint: 'You need to know your loads before you can calculate anything.',
        },
        {
          id: 'u8-L2-Q9',
          type: 'true-false',
          question: 'Grease lubrication is preferred over oil for bearings at very high speeds because grease provides better cooling.',
          correctAnswer: false,
          explanation: 'Oil lubrication is preferred for high-speed bearings. Oil can be circulated for cooling and removes heat much better than grease, which stays in place and can overheat.',
          distractorExplanations: {
            0: 'Oil lubrication is preferred for high-speed bearings.',
          },
          hint: 'Which lubricant can be circulated through the bearing for cooling?',
        },
        {
          id: 'u8-L2-Q12',
          type: 'multiple-choice',
          question: 'ISO VG 68 lubricating oil. What does the 68 represent?',
          options: [
            'Oil density of 68 kg/m^3',
            'Kinematic viscosity of 68 cSt at 100 C',
            'Dynamic viscosity of 68 Pa*s at 40 C',
            'Kinematic viscosity of 68 cSt at 40 C'
          ],
          correctIndex: 3,
          explanation: 'ISO VG (Viscosity Grade) numbers represent kinematic viscosity in centistokes (cSt) at 40 C. VG 68 means approximately 68 cSt at 40 C.',
          distractorExplanations: {
            0: 'This focuses on density/kg/m^3, which is not the correct mechanism or principle for this problem.',
            1: 'Regarding kinematic viscosity: ISO VG (Viscosity Grade) numbers represent kinematic viscosity in centistokes (cSt) at 40 C.',
            2: 'This focuses on dynamic, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'ISO VG stands for Viscosity Grade, measured at 40 C.',
        },
      ]
    },
    // ─────────────────────────────────────────────────────────────
    // LESSON 2c: Bearings & Lubrication : Lubrication Regimes
    // ───────────��──────────────────────────────────���──────────────
    {
      id: 'u8-L2c',
      title: 'Lubrication & Journal Bearings',
      description: 'Hydrodynamic lubrication, Stribeck curve, Sommerfeld number, and journal bearing design.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L2c-T1',
          type: 'teaching',
          question: 'The Stribeck curve and lubrication regimes',
          explanation: 'The Stribeck curve shows how friction changes with speed. At low speed, surfaces touch directly (boundary lubrication).',
          hint: 'Startup is always the most damaging time for journal bearings.',
        },
        {
          id: 'u8-L2c-Q1a',
          type: 'true-false',
          question: 'In hydrodynamic lubrication, a full oil film separates the shaft from the bearing surface.',
          correctAnswer: true,
          explanation: 'Yes. In the hydrodynamic regime, the shaft drags oil into a converging wedge that builds pressure, completely separating the metal surfaces.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Hydro = fluid, dynamic = motion.',
        },
        {
          id: 'u8-L2-Q3',
          type: 'true-false',
          question: 'In hydrodynamic lubrication, load-carrying capacity increases with increasing viscosity and shaft speed.',
          correctAnswer: true,
          explanation: 'The Sommerfeld number S = (mu*N*d)/(P*c^2) governs hydrodynamic performance. Higher viscosity and speed both increase the oil film pressure.',
          distractorExplanations: {
            1: 'The Sommerfeld number S = (mu*N*d)/(P*c^2) governs hydrodynamic performance.',
          },
          hint: 'Consider the hydrodynamic wedge effect.',
        },
        {
          id: 'u8-L2-Q4',
          type: 'multiple-choice',
          question: 'A journal bearing in a pump shows intermittent high temps and metal contact noise only at startup. What is the cause?',
          options: [
            'Bearing clearance too large, causing rattle at all speeds',
            'At low startup speed, bearing operates in boundary/mixed lubrication',
            'Lubricant viscosity too high, causing overheat from poor flow',
            'Shaft misalignment contacts bearing only during startup'
          ],
          correctIndex: 1,
          explanation: 'This is a classic Stribeck curve problem. Hydrodynamic bearings need shaft rotation to drag lubricant into the wedge and build pressure. At startup speeds, the oil film hasn\'t formed yet.',
          distractorExplanations: {
            0: 'This focuses on clearance/large,, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on lubricant/viscosity, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on shaft/misalignment, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'On the Stribeck curve, low speed means the bearing number is low.',
        },
        {
          id: 'u8-L2c-MP1',
          type: 'match-pairs',
          question: 'Match each lubrication regime to its characteristic.',
          options: ['Boundary', 'Mixed', 'Hydrodynamic', 'Elastohydrodynamic'],
          matchTargets: ['Metal-to-metal contact, highest wear', 'Partial oil film, some contact', 'Full oil film, lowest friction', 'Oil film in rolling contacts (gears)'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Boundary has direct contact, mixed is partial, hydrodynamic has full separation, and EHL applies to rolling contacts under high pressure.',
          hint: 'Think about how much metal-to-metal contact exists.',
        },
        {
          id: 'u8-L2c-T2',
          type: 'teaching',
          question: 'Sommerfeld number and bearing design',
          explanation: 'The Sommerfeld number S = (mu*N*d)/(P*c^2) is the key dimensionless parameter for journal bearings. It combines viscosity (mu), speed (N), diameter (d), load pressure (P), and clearance (c), and higher S means thicker oil film and lower eccentricity.',
          hint: 'Try this now: increasing clearance c reduces S quadratically.',
        },
        {
          id: 'u8-L2c-Q5',
          type: 'multiple-choice',
          question: 'What happens to the minimum oil film thickness in a journal bearing if you double the shaft speed?',
          options: [
            'Film thickness stays the same',
            'Film thickness approximately doubles',
            'Film thickness increases (but not linearly)',
            'Film thickness decreases because of heat'
          ],
          correctIndex: 2,
          explanation: 'Higher speed increases the Sommerfeld number, which reduces eccentricity and increases film thickness. The relationship is not linear because the Sommerfeld number charts are nonlinear.',
          distractorExplanations: {
            0: 'This focuses on stays, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on approximately/doubles, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on decreases/because, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Higher speed means more oil is dragged into the wedge.',
        },
        {
          id: 'u8-L2c-SB1',
          type: 'sort-buckets',
          question: 'Sort into "Rolling element bearing advantage" vs. "Journal bearing advantage".',
          options: ['Low friction at startup', 'Handles shock loads well', 'Low maintenance', 'Very heavy load capacity', 'Standardized catalog sizing', 'Silent at high load'],
          buckets: ['Rolling element', 'Journal bearing'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Rolling elements win on startup friction, maintenance, and standardization. Journal bearings win on shock absorption, heavy loads, and noise at high load.',
          hint: 'Journal bearings need speed to build their oil film.',
        },
        {
          id: 'u8-L2-Q15',
          type: 'multiple-choice',
          question: 'What is the Petroff equation used for?',
          options: [
            'Calculating L10 bearing life',
            'Estimating friction torque in a lightly loaded journal bearing',
            'Determining the contact stress in rolling bearings',
            'Selecting bearing clearance'
          ],
          correctIndex: 1,
          explanation: 'The Petroff equation estimates friction torque (and power loss) in a concentric (lightly loaded) journal bearing where the shaft is centered in the bearing.',
          distractorExplanations: {
            0: 'This focuses on calculating, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on determining/contact, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on selecting/clearance, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'This equation assumes no eccentricity (concentric operation).',
        },
        {
          id: 'u8-L2-Q28',
          type: 'true-false',
          question: 'A bearing with a higher dynamic load rating C always lasts longer than one with a lower C, regardless of conditions.',
          correctAnswer: false,
          explanation: 'Life also depends on the applied load P, lubrication, alignment, contamination, and temperature. A high-C bearing under poor conditions can fail faster than a lower-C bearing in ideal conditions.',
          distractorExplanations: {
            0: 'Life also depends on the applied load P, lubrication, alignment, contamination, and temperature.',
          },
          hint: 'The formula is L10 = (C/P)^p, but real life has many other factors.',
        },
        {
          id: 'u8-L2-Q26',
          type: 'multiple-choice',
          question: 'What is the primary purpose of bearing preload in angular contact bearings?',
          options: [
            'To increase the bearing temperature for better lubrication',
            'To eliminate internal clearance and increase rigidity',
            'To reduce the dynamic load rating',
            'To make the bearing self-aligning'
          ],
          correctIndex: 1,
          explanation: 'Preload eliminates internal clearance, increases stiffness, and distributes load more evenly among the rolling elements. It\'s essential for precision spindle applications.',
          distractorExplanations: {
            0: 'Temperature is not the primary factor in this problem; the correct analysis uses a different variable.',
            2: 'This focuses on reduce/dynamic, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on bearing/self-aligning, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about what happens if there\'s play in a precision spindle.',
        },
      ]
    },
    // ────���─────────────────────────────────���──────────────────────
    // LESSON 3a: Gears : Basics and Ratios
    // ─────────────────��───────────────────────────────────────────
    {
      id: 'u8-L3',
      title: 'Gear Basics',
      description: 'Gear ratios, speed and torque relationships, module, and pitch circle diameter.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u8-L3-T1',
          type: 'teaching',
          question: 'How gears transmit power',
          explanation: 'Gears transfer rotational power between shafts by meshing teeth. The gear ratio equals the ratio of tooth counts: a 20-tooth pinion driving an 80-tooth gear gives a 4:1 ratio, and speed goes down by that factor, torque goes up by the same factor.',
          hint: 'P = T x omega, so if speed halves, torque doubles.',
        },
        {
          id: 'u8-L3-Q1a',
          type: 'true-false',
          question: 'In a gear pair, power is conserved (minus friction losses).',
          correctAnswer: true,
          explanation: 'Yes. P = T x omega stays constant through the gear mesh. If speed drops, torque increases proportionally.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Energy in = energy out (minus losses to friction and heat).',
        },
        {
          id: 'u8-L3-Q8',
          type: 'multiple-choice',
          question: 'A spur gear has a module of 4 mm and 25 teeth. What is the pitch circle diameter?',
          options: [
            '50 mm',
            '100 mm',
            '150 mm',
            '200 mm'
          ],
          correctIndex: 1,
          explanation: 'D = m x Z = 4 x 25 = 100 mm. The module is the ratio of pitch diameter to number of teeth (m = D/Z).',
          distractorExplanations: {
            0: '50 is approximately half the correct answer, likely from omitting a required factor of 2.',
            2: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: '200 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
          },
          hint: 'The pitch circle diameter is simply module times teeth.',
        },
        {
          id: 'u8-L3-Q1',
          type: 'multiple-choice',
          question: 'A 20-tooth pinion drives an 80-tooth gear at 1200 RPM transmitting 10 kW. What is the torque on the gear?',
          options: [
            '79.6 N*m',
            '159.2 N*m',
            '318.4 N*m',
            '636.6 N*m'
          ],
          correctIndex: 2,
          explanation: 'Gear ratio = 80/20 = 4. Gear speed = 1200/4 = 300 RPM. Torque on pinion: T_p = P/omega = 10000/125.66 = 79.6 N*m. Gear torque = 79.6 x 4 = 318.4 N*m.',
          distractorExplanations: {
            0: '79.6 is one-quarter of the correct value, from an extra division or missing squared term.',
            1: '159.2 is approximately half the correct answer, likely from omitting a required factor of 2.',
            3: '636.6 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
          },
          hint: 'Power is constant (P = T*omega). Gear ratio multiplies torque.',
        },
        {
          id: 'u8-L3-T1b',
          type: 'teaching',
          question: 'Gear trains multiply ratios',
          explanation: 'When multiple gear pairs are connected in series, the overall ratio is the product of individual ratios. A 3-stage gearbox with ratios of 3:1, 4:1, and 2:1 gives an overall ratio of 3 x 4 x 2 = 24:1.',
          hint: 'Try this now: calculate the output speed of a 24:1 gearbox at 2400 RPM input.',
        },
        {
          id: 'u8-L3-Q5',
          type: 'multiple-choice',
          question: 'A 3-stage gearbox has ratios of 3:1, 4:1, and 2:1. If the input is 2400 RPM, what is the output speed?',
          options: [
            '800 RPM',
            '200 RPM',
            '400 RPM',
            '100 RPM'
          ],
          correctIndex: 3,
          explanation: 'Overall gear ratio = 3 x 4 x 2 = 24:1. Output speed = 2400/24 = 100 RPM.',
          distractorExplanations: {
            0: '800 significantly exceeds the correct answer due to a fundamental formula or calculation error.',
            1: '200 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
            2: '400 is approximately four times too large, likely from squaring a term incorrectly.',
          },
          hint: 'For gears in series, the total ratio is the product.',
        },
        {
          id: 'u8-L3-Q9',
          type: 'true-false',
          question: 'In a standard 20-degree pressure angle spur gear, the minimum number of teeth to avoid undercutting is 17.',
          correctAnswer: true,
          explanation: 'Undercutting occurs when the dedendum circle extends below the base circle. For 20-degree pressure angle: Z_min = 2/sin^2(20) = 2/0.117 = 17.1, so 17 teeth minimum.',
          distractorExplanations: {
            1: 'Undercutting occurs when the dedendum circle extends below the base circle.',
          },
          hint: 'Use Z_min = 2/sin^2(phi).',
        },
        {
          id: 'u8-L3-MP1',
          type: 'match-pairs',
          question: 'Match each gear term to its definition.',
          options: ['Module (m)', 'Pitch circle', 'Addendum', 'Dedendum'],
          matchTargets: ['D/Z, sets tooth size', 'Imaginary circle where teeth mesh', 'Tooth height above pitch circle', 'Tooth depth below pitch circle'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Module defines tooth size, pitch circle is the meshing reference, addendum is the tip, dedendum is the root.',
          hint: 'These terms describe the geometry of a gear tooth.',
        },
        {
          id: 'u8-L3-Q10',
          type: 'multiple-choice',
          question: 'In a planetary gear set, sun = 20 teeth, ring = 80 teeth. Sun input at 1000 RPM, ring fixed. Carrier output speed?',
          options: [
            '100 RPM',
            '200 RPM',
            '250 RPM',
            '500 RPM'
          ],
          correctIndex: 1,
          explanation: 'Using the Willis equation with the ring fixed (N_R = 0): carrier speed N_C = N_S x Z_S / (Z_S + Z_R) = 1000 x 20 / (20 + 80) = 200 RPM.',
          distractorExplanations: {
            0: '100 is approximately half the correct answer, likely from omitting a required factor of 2.',
            2: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: 'This numerical value does not result from the correct formula applied to the given parameters.',
          },
          hint: 'Use the Willis equation with ring speed set to zero.',
        },
        {
          id: 'u8-L3-Q11',
          type: 'multiple-choice',
          question: 'What is the contact ratio in spur gearing, and why must it exceed 1.0?',
          options: [
            'Ratio of tooth contact area to total tooth surface',
            'Ratio of path of contact length to base pitch, ensures continuous meshing',
            'Ratio of pinion speed to gear speed',
            'Percentage of gear face width in contact'
          ],
          correctIndex: 1,
          explanation: 'The contact ratio equals the length of the path of contact divided by the base pitch. A value above 1.0 means at least one tooth pair is always in contact for smooth, continuous operation.',
          distractorExplanations: {
            0: 'This focuses on tooth/total, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on pinion/speed, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on percentage/width, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'This ratio ensures smooth, continuous tooth engagement.',
        },
      ]
    },
    // ─────────────────────────────────────────────────────────────
    // LESSON 3b: Gears : Types and Selection
    // ─────────────────────────────────────────────────────────────
    {
      id: 'u8-L3b',
      title: 'Gear Types',
      description: 'Spur, helical, bevel, and worm gears: characteristics, trade-offs, and selection.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u8-L3-T2',
          type: 'teaching',
          question: 'Spur, helical, bevel, and worm gears',
          explanation: 'Spur gears have straight teeth and are the simplest. Helical gears have angled teeth for smoother, quieter operation but create axial thrust.',
          hint: 'Helical gears need thrust bearings to handle axial loads.',
        },
        {
          id: 'u8-L3b-Q1a',
          type: 'multiple-choice',
          question: 'Which gear type has the simplest, straight teeth?',
          options: ['Helical', 'Spur', 'Bevel', 'Worm'],
          correctIndex: 1,
          explanation: 'Spur gears have straight teeth parallel to the shaft axis. They\'re the simplest and cheapest to manufacture.',
          distractorExplanations: {
          },
          hint: 'The most basic gear type.',
        },
        {
          id: 'u8-L3-Q4',
          type: 'multiple-choice',
          question: 'When would you prefer helical gears over spur gears?',
          options: [
            'Spur gears are always preferred',
            'Helical gears are always preferred',
            'Helical for quieter operation and higher load capacity, spur for simplicity',
            'The only difference is noise level'
          ],
          correctIndex: 2,
          explanation: 'Helical gears engage gradually (smoother, quieter) and share load across more tooth length. But they create axial thrust and cost more to manufacture.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; gears preferred the principle has important exceptions.',
            1: 'This "always" claim is too broad; helical gears the principle has important exceptions.',
            3: 'This is too restrictive; the principle applies more broadly than difference noise suggests.',
          },
          hint: 'Consider how the tooth contact differs between spur and helical.',
        },
        {
          id: 'u8-L3-SB1',
          type: 'sort-buckets',
          question: 'Sort these characteristics into "Spur gear" vs. "Helical gear".',
          options: ['Straight teeth', 'Angled teeth', 'No axial thrust', 'Creates axial thrust', 'Noisier at high speed', 'Smoother tooth engagement'],
          buckets: ['Spur gear', 'Helical gear'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Spur gears have straight teeth, no axial thrust, and are noisier. Helical gears have angled teeth, create thrust, and run smoother.',
          hint: 'The helix angle is what creates the axial thrust force.',
        },
        {
          id: 'u8-L3-Q3',
          type: 'true-false',
          question: 'Self-locking worm gears are inherently less efficient than non-self-locking worm gears.',
          correctAnswer: true,
          explanation: 'Self-locking requires high friction (low lead angle), which means more energy is lost to heat. This is a fundamental trade-off: safety vs. efficiency.',
          distractorExplanations: {
            1: 'Self-locking requires high friction (low lead angle), which means more energy is lost to heat.',
          },
          hint: 'Consider the relationship between friction and efficiency.',
        },
        {
          id: 'u8-L3b-T2',
          type: 'teaching',
          question: 'Helical gear forces',
          explanation: 'Helical gear teeth create three force components: tangential (Wt = 2T/d), radial (Wr = Wt*tan(phi)/cos(psi)), and axial (Wa = Wt*tan(psi)). The helix angle psi determines how much axial thrust is generated.',
          hint: 'The axial force is why helical gears need thrust bearings.',
        },
        {
          id: 'u8-L3-Q12',
          type: 'multiple-choice',
          question: 'What are the three force components on a helical gear tooth?',
          options: [
            'Only tangential and radial, same as spur',
            'Tangential, radial, and axial (from the helix angle)',
            'Tangential, gravitational, and centrifugal',
            'Tangential, radial, and frictional'
          ],
          correctIndex: 1,
          explanation: 'The helix angle creates an additional axial force component that spur gears don\'t have. This is why helical gears need thrust bearings.',
          distractorExplanations: {
            0: 'This is too restrictive; the principle applies more broadly than tangential radial suggests.',
            2: 'This focuses on gravitational,/centrifugal, which is not the correct mechanism or principle for this problem.',
            3: 'Friction is not the governing mechanism here; the correct answer involves a different physical principle.',
          },
          hint: 'The helix angle introduces a force that spur gears don\'t have.',
        },
        {
          id: 'u8-L3-Q13',
          type: 'true-false',
          question: 'Bevel gears can connect shafts at any angle, not just 90 degrees.',
          correctAnswer: true,
          explanation: 'Bevel gears transmit power between intersecting shafts at various angles. 90-degree configurations are most common, but other angles work too.',
          distractorExplanations: {
            1: 'Bevel gears transmit power between intersecting shafts at various angles.',
          },
          hint: 'Bevel gear cones can be designed for various included angles.',
        },
        {
          id: 'u8-L3b-MP1',
          type: 'match-pairs',
          question: 'Match each gear type to its best use case.',
          options: ['Spur', 'Helical', 'Bevel', 'Worm'],
          matchTargets: ['Simple, low-cost parallel shafts', 'Quiet, high-load parallel shafts', '90-degree intersecting shafts', 'Very high ratio, self-locking'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Each gear type is optimized for specific shaft arrangements and requirements.',
          hint: 'Think about the shaft orientation each type handles.',
        },
        {
          id: 'u8-L3-Q15',
          type: 'multiple-choice',
          question: 'A worm gear set has a single-start worm and a 40-tooth worm wheel. What is the gear ratio?',
          options: [
            '10:1',
            '20:1',
            '40:1',
            '80:1'
          ],
          correctIndex: 2,
          explanation: 'Worm gear ratio = number of worm wheel teeth / number of worm starts = 40/1 = 40:1. This is why worm gears achieve very high ratios in a compact package.',
          distractorExplanations: {
            0: '10 is one-quarter of the correct value, from an extra division or missing squared term.',
            1: '20 is approximately half the correct answer, likely from omitting a required factor of 2.',
            3: '80 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
          },
          hint: 'Ratio = wheel teeth / worm starts.',
        },
        {
          id: 'u8-L3-Q6',
          type: 'fill-blank',
          question: 'The two primary gear tooth failure modes are surface _____ and tooth root breakage (bending fatigue).',
          blanks: ['pitting'],
          wordBank: ['pitting', 'scoring', 'erosion', 'fretting', 'spalling'],
          explanation: 'Pitting is surface fatigue from cyclic Hertzian contact stress. Tooth root breakage is bending fatigue. These are the two failure modes checked in AGMA design.',
          hint: 'This surface fatigue creates small craters on the tooth flanks.',
        },
      ]
    },
    // ─────��─────────────────────────��─────────────────────────────
    // LESSON 3c: Gears : Tooth Strength and AGMA Design
    // ─���────────────────────��──────────────────────────────────────
    {
      id: 'u8-L3c',
      title: 'Gear Tooth Design',
      description: 'Lewis equation, AGMA bending and contact stress, form factor, and gear sizing.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u8-L3-T3',
          type: 'teaching',
          question: 'Gear tooth sizing and failure',
          explanation: 'Gear teeth fail by bending fatigue at the root (Lewis equation) and surface pitting from contact stress (Hertzian). The module (m = D/Z) sets tooth size, and aGMA design requires checking both failure modes independently.',
          hint: 'The Lewis form factor depends on the number of teeth.',
        },
        {
          id: 'u8-L3c-Q1a',
          type: 'multiple-choice',
          question: 'AGMA gear design checks two independent failure modes. Which are they?',
          options: [
            'Bending fatigue at root and surface pitting from contact stress',
            'Tooth shear and bearing overload',
            'Abrasive wear and corrosion',
            'Thermal distortion and vibration'
          ],
          correctIndex: 0,
          explanation: 'AGMA requires checking bending stress at the tooth root (Lewis/AGMA method) and contact stress on the tooth flank (Hertzian/AGMA method). Both must be within allowable limits.',
          distractorExplanations: {
            1: 'This focuses on tooth/shear, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on abrasive/corrosion, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on thermal/distortion, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Teeth can break off at the root or pit on the surface.',
        },
        {
          id: 'u8-L3-Q7',
          type: 'multiple-choice',
          question: 'What does the Lewis form factor depend on?',
          options: [
            'Only material and hardness',
            'Only module and face width',
            'Number of teeth, which determines tooth geometry at the root',
            'Rotational speed and power transmitted'
          ],
          correctIndex: 2,
          explanation: 'The Lewis form factor Y depends on number of teeth because the tooth profile geometry (root fillet shape and thickness) changes with tooth count.',
          distractorExplanations: {
            0: 'This is too restrictive; the principle applies more broadly than material hardness suggests.',
            1: 'This is too restrictive; the principle applies more broadly than module width suggests.',
            3: 'This focuses on rotational/speed, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The form factor characterizes the tooth root geometry.',
        },
        {
          id: 'u8-L3-Q2',
          type: 'multiple-choice',
          question: 'Spur gear teeth show pitting on the flanks after 2 years. What is the root cause?',
          options: [
            'Teeth are too thin, pitting is from bending stress',
            'Surface contact fatigue from Hertzian stress exceeding the allowable limit',
            'Abrasive wear from contaminated oil',
            'Pitting always occurs during break-in'
          ],
          correctIndex: 1,
          explanation: 'Pitting is surface fatigue driven by cyclic Hertzian contact stress. Subsurface cracks initiate at the depth of maximum shear stress and propagate to the surface.',
          distractorExplanations: {
            0: 'This focuses on teeth/thin,, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on abrasive/contaminated, which is not the correct mechanism or principle for this problem.',
            3: 'This "always" claim is too broad; pitting occurs the principle has important exceptions.',
          },
          hint: 'Pitting is a contact stress (Hertzian) problem.',
        },
        {
          id: 'u8-L3c-T2',
          type: 'teaching',
          question: 'Lewis bending stress equation',
          explanation: 'The Lewis equation estimates bending stress at the tooth root: sigma = Wt/(b*m*Y), where Wt is the tangential force, b is face width, m is module, and Y is the form factor. AGMA adds correction factors for dynamics, overload, and reliability.',
          hint: 'Try this now: more teeth means a higher Y factor and lower stress.',
        },
        {
          id: 'u8-L3-Q14',
          type: 'multiple-choice',
          question: 'In AGMA methodology, the two primary failure modes checked are:',
          options: [
            'Abrasive wear and corrosion',
            'Tooth shear and bearing overload',
            'Bending fatigue at root (Lewis/AGMA) and surface pitting (Hertzian/AGMA)',
            'Thermal distortion and vibration resonance'
          ],
          correctIndex: 2,
          explanation: 'AGMA gear rating requires checking bending stress at the tooth root and contact stress on the flank. Both must be below their respective allowable stresses.',
          distractorExplanations: {
            0: 'This focuses on abrasive/corrosion, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on tooth/shear, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on thermal/distortion, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Gear teeth can fail by breaking off or by surface fatigue.',
        },
        {
          id: 'u8-L3c-OS1',
          type: 'order-steps',
          question: 'Order the AGMA gear design process.',
          steps: ['Determine power, speed, and gear ratio', 'Select module and number of teeth', 'Calculate tangential force Wt', 'Check bending stress at tooth root', 'Check contact stress on tooth flank'],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'AGMA design starts with requirements, then geometry selection, force calculation, and finally both stress checks.',
          hint: 'You need the geometry before you can calculate forces.',
        },
        {
          id: 'u8-L3-Q18',
          type: 'multiple-choice',
          question: 'Increasing the face width of a gear by 50% affects bending stress and contact stress differently. How?',
          options: [
            'Both decrease by 50%',
            'Bending decreases by 33%, contact decreases by 18%',
            'Both decrease by 33%',
            'Only contact stress changes'
          ],
          correctIndex: 1,
          explanation: 'Bending stress is inversely proportional to face width (sigma ~ 1/b, so 1/1.5 = 33% reduction). Contact stress is inversely proportional to sqrt(b) (1/sqrt(1.5) = 18% reduction).',
          distractorExplanations: {
            0: 'This focuses on decrease, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on decrease, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than contact stress suggests.',
          },
          hint: 'Bending stress is proportional to 1/b, contact stress to 1/sqrt(b).',
        },
        {
          id: 'u8-L3-Q19',
          type: 'true-false',
          question: 'Case-hardened gears are stronger in both bending and surface contact than through-hardened gears of the same grade.',
          correctAnswer: true,
          explanation: 'Case hardening gives a hard, wear-resistant surface (high contact strength) with a tough core (good bending strength). Through-hardening compromises between surface and core properties.',
          distractorExplanations: {
            1: 'Case hardening gives a hard, wear-resistant surface (high contact strength) with a tough core (good bending strength).',
          },
          hint: 'Case hardening optimizes both surface and core properties.',
        },
        {
          id: 'u8-L3-Q21',
          type: 'multiple-choice',
          question: 'What is the typical efficiency of a single-stage spur gear set?',
          options: [
            '75 to 80%',
            '85 to 90%',
            '95 to 99%',
            '99.5 to 99.9%'
          ],
          correctIndex: 2,
          explanation: 'Spur and helical gears are very efficient, typically 95 to 99% per stage. Worm gears are much lower (40 to 90% depending on lead angle).',
          distractorExplanations: {
            0: 'This numerical value does not result from the correct formula applied to the given parameters.',
            1: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: 'This numerical value does not result from the correct formula applied to the given parameters.',
          },
          hint: 'Involute gears have very low sliding losses.',
        },
        {
          id: 'u8-L3c-SB1',
          type: 'sort-buckets',
          question: 'Sort into "Increases gear tooth strength" vs. "Decreases gear tooth strength".',
          options: ['Larger module', 'Wider face width', 'Fewer teeth (below 17)', 'Case hardening', 'Higher operating temperature', 'Misalignment'],
          buckets: ['Increases strength', 'Decreases strength'],
          correctBuckets: [0, 0, 1, 0, 1, 1],
          explanation: 'Larger module, wider face, and case hardening increase strength. Too few teeth (undercutting), high temperature, and misalignment reduce it.',
          hint: 'Undercutting weakens the tooth root.',
        },
      ]
    },
    // ──────────────────────────────��──────────────────────────────
    // LESSON 4a: Fasteners & Joints : Bolt Basics
    // ──────────────────────────────────────────────────────��──────
    {
      id: 'u8-L4',
      title: 'Bolt Basics',
      description: 'How bolted joints work, preload, and bolt grades.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L4-T1',
          type: 'teaching',
          question: 'How bolted joints really work',
          explanation: 'A bolt isn\'t just a pin. It\'s pre-stretched (preloaded) during tightening, which clamps the joint in compression, and when an external load tries to separate the joint, the bolt and clamped members share that load based on their relative stiffnesses.',
          hint: 'Higher preload means the joint can handle more external load.',
        },
        {
          id: 'u8-L4-Q1a',
          type: 'true-false',
          question: 'A bolt creates clamping force by being pre-stretched during tightening.',
          correctAnswer: true,
          explanation: 'Yes. When you tighten a bolt, you stretch it slightly. That stretch creates the preload force that clamps the joint members in compression.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Think about what happens to the bolt when you turn the nut.',
        },
        {
          id: 'u8-L4-Q6',
          type: 'fill-blank',
          question: 'The initial tension applied to a bolt during tightening, before any external load, is called _____.',
          blanks: ['preload'],
          wordBank: ['preload', 'proof load', 'torque', 'clamping', 'yield force'],
          explanation: 'Preload (pretension) is the bolt tension from tightening. It creates the clamping force that holds the joint together.',
          hint: 'This force exists in the bolt before any external load is applied.',
        },
        {
          id: 'u8-L4-Q3',
          type: 'true-false',
          question: 'A bolted joint should always be designed so the bolt is loaded in shear rather than tension.',
          correctAnswer: false,
          explanation: 'Properly designed bolted joints usually load the bolt in tension (clamping). The preload creates friction between surfaces that resists shear loads.',
          distractorExplanations: {
            0: 'Properly designed bolted joints usually load the bolt in tension (clamping).',
          },
          hint: 'Consider how a properly preloaded joint resists sliding.',
        },
        {
          id: 'u8-L4-T1b',
          type: 'teaching',
          question: 'Bolt grades and strength',
          explanation: 'Metric bolt classes like 8.8 or 10.9 encode strength. The first number times 100 gives ultimate tensile strength in MPa (8 = 800 MPa).',
          hint: 'Try this now: calculate the yield strength of a 10.9 bolt.',
        },
        {
          id: 'u8-L4-MP1',
          type: 'match-pairs',
          question: 'Match each bolt class to its yield strength.',
          options: ['Class 4.6', 'Class 8.8', 'Class 10.9', 'Class 12.9'],
          matchTargets: ['240 MPa', '640 MPa', '900 MPa', '1080 MPa'],
          correctMatches: [0, 1, 2, 3],
          explanation: '4.6: 400 x 0.6 = 240 MPa. 8.8: 800 x 0.8 = 640 MPa. 10.9: 1000 x 0.9 = 900 MPa. 12.9: 1200 x 0.9 = 1080 MPa.',
          hint: 'First number x 100 = UTS. Second number = yield/UTS ratio.',
        },
        {
          id: 'u8-L4-Q1',
          type: 'multiple-choice',
          question: 'Bolt stiffness k_b = 400 kN/mm, member stiffness k_c = 1200 kN/mm. External load = 20 kN. How much additional load does the bolt carry?',
          options: [
            '15 kN',
            '10 kN',
            '5 kN',
            '20 kN'
          ],
          correctIndex: 2,
          explanation: 'Stiffness ratio C = k_b/(k_b + k_c) = 400/(400 + 1200) = 0.25. Additional bolt load = C x F_ext = 0.25 x 20 = 5 kN. The stiff members absorb most of the external load.',
          distractorExplanations: {
            0: '15 results from an incorrect multiplier in the calculation.',
            1: '10 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
            3: '20 is approximately four times too large, likely from squaring a term incorrectly.',
          },
          hint: 'The load split depends on the stiffness ratio C = k_b/(k_b + k_c).',
        },
        {
          id: 'u8-L4-Q2',
          type: 'multiple-choice',
          question: 'A torque wrench was calibrated correctly, but bolt preloads vary by +/-30%. What is the most likely cause?',
          options: [
            'The torque wrench is inaccurate despite calibration',
            'Friction variation in threads and under the bolt head',
            'The bolts are different grades',
            'The flange is warped'
          ],
          correctIndex: 1,
          explanation: 'Torque-controlled tightening depends heavily on thread and underhead friction. Only 10 to 15% of applied torque actually stretches the bolt. Friction variation is the main source of preload scatter.',
          distractorExplanations: {
            0: 'This focuses on torque/wrench, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on bolts/different, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on flange/warped, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'If the wrench is accurate but preloads vary, something else is consuming the torque.',
        },
        {
          id: 'u8-L4-Q4',
          type: 'multiple-choice',
          question: 'An M12 bolt, class 8.8, has a tensile stress area of 84.3 mm^2. What is the maximum recommended preload (75% of proof)?',
          options: [
            '25.3 kN',
            '37.9 kN',
            '50.6 kN',
            '67.4 kN'
          ],
          correctIndex: 1,
          explanation: 'Proof strength for 8.8 = 600 MPa. Proof load = 600 x 84.3 = 50,580 N = 50.6 kN. Recommended preload = 0.75 x 50.6 = 37.9 kN.',
          distractorExplanations: {
            0: 'This numerical value does not result from the correct formula applied to the given parameters.',
            2: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: 'This numerical value does not result from the correct formula applied to the given parameters.',
          },
          hint: 'Target preload is typically 75% of proof load.',
        },
        {
          id: 'u8-L4-SB1',
          type: 'sort-buckets',
          question: 'Sort into "Increases joint reliability" vs. "Decreases joint reliability".',
          options: ['Higher preload (within limits)', 'Proper lubrication on threads', 'Loose bolt (low preload)', 'Lock washer or thread locker', 'Reusing stretch bolts', 'Calibrated torque wrench'],
          buckets: ['Increases reliability', 'Decreases reliability'],
          correctBuckets: [0, 0, 1, 0, 1, 0],
          explanation: 'Proper preload, lubrication, locking, and calibrated tools increase reliability. Low preload and reused stretch bolts reduce it.',
          hint: 'Consistent, adequate preload is the key to reliable bolted joints.',
        },
      ]
    },
    // ─────────────��─────────────��─────────────────────────────────
    // LESSON 4b: Fasteners : Stiffness, Separation, and Fatigue
    // ──────────────���─────────────────────────────────���────────────
    {
      id: 'u8-L4b',
      title: 'Bolt Design & Analysis',
      description: 'Joint stiffness, separation load, bolt fatigue, and gasket factors.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L4-T2',
          type: 'teaching',
          question: 'Bolt stiffness and joint separation',
          explanation: 'The bolt and clamped members act like springs in parallel. The stiffness ratio C = k_b/(k_b + k_c) determines how much of an external load the bolt feels, and joint separation occurs when the external load exceeds F_i/(1 - C), where F_i is the preload.',
          hint: 'Stiffer members (larger k_c) mean the bolt feels less of the external load.',
        },
        {
          id: 'u8-L4b-Q1a',
          type: 'true-false',
          question: 'In a bolted joint, stiffer clamped members mean the bolt carries a smaller fraction of external load.',
          correctAnswer: true,
          explanation: 'Yes. C = k_b/(k_b + k_c). As k_c increases, C decreases, so the bolt carries a smaller fraction of the external tensile load.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'The stiffness ratio C determines load sharing.',
        },
        {
          id: 'u8-L4-Q7',
          type: 'multiple-choice',
          question: 'Preload = 40 kN, stiffness ratio C = 0.25. At what external load does the joint separate?',
          options: [
            '40 kN',
            '53.3 kN',
            '80 kN',
            '160 kN'
          ],
          correctIndex: 1,
          explanation: 'Joint separation occurs when F_ext = F_i/(1 - C) = 40/(1 - 0.25) = 40/0.75 = 53.3 kN. At this point, the clamping force drops to zero.',
          distractorExplanations: {
            0: 'This numerical value does not result from the correct formula applied to the given parameters.',
            2: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: '160 results from an incorrect multiplier in the calculation.',
          },
          hint: 'Separation happens when clamping force reaches zero.',
        },
        {
          id: 'u8-L4-Q9',
          type: 'multiple-choice',
          question: 'Why do bolted joints under cyclic loading benefit from high preload?',
          options: [
            'High preload makes the bolt stronger',
            'High preload reduces the alternating stress the bolt experiences',
            'High preload prevents the bolt from rotating',
            'High preload is only needed for static loads'
          ],
          correctIndex: 1,
          explanation: 'With high preload and stiff members, the bolt sees only a small fraction of the cyclic external load. This keeps the alternating stress low, which is what drives fatigue failure.',
          distractorExplanations: {
            0: 'This focuses on makes/stronger, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on prevents/rotating, which is not the correct mechanism or principle for this problem.',
            3: 'This is too restrictive; the principle applies more broadly than preload needed suggests.',
          },
          hint: 'Fatigue depends on alternating stress, not total stress.',
        },
        {
          id: 'u8-L4b-T2',
          type: 'teaching',
          question: 'Gaskets and joint sealing',
          explanation: 'Gaskets seal joints by filling surface imperfections. They\'re much softer than steel, so they dramatically reduce member stiffness k_c.',
          hint: 'A soft gasket makes the joint more sensitive to external loads.',
        },
        {
          id: 'u8-L4-Q10',
          type: 'true-false',
          question: 'Adding a gasket to a bolted joint increases the fraction of external load carried by the bolt.',
          correctAnswer: true,
          explanation: 'Gaskets are soft, reducing k_c dramatically. This increases C = k_b/(k_b + k_c), so the bolt carries a larger fraction of external load.',
          distractorExplanations: {
            1: 'Gaskets are soft, reducing k_c dramatically.',
          },
          hint: 'A soft gasket reduces member stiffness k_c.',
        },
        {
          id: 'u8-L4b-OS1',
          type: 'order-steps',
          question: 'Order the bolt fatigue analysis steps.',
          steps: ['Determine preload F_i and stiffness ratio C', 'Calculate bolt force range from cyclic external load', 'Find alternating and mean stress in the bolt', 'Plot on modified Goodman diagram', 'Check safety factor against fatigue line'],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Bolt fatigue analysis requires knowing the load range, which depends on preload and stiffness, then checking against the fatigue criterion.',
          hint: 'You need the stiffness ratio to know the bolt load range.',
        },
        {
          id: 'u8-L4-Q5',
          type: 'multiple-choice',
          question: 'When is adhesive bonding a better choice than mechanical fastening?',
          options: [
            'Adhesive is always inferior to mechanical fastening',
            'Design for shear loading, maximize bond area, avoid peel',
            'Just apply adhesive and clamp, modern adhesives handle everything',
            'Adhesive cannot join dissimilar metals'
          ],
          correctIndex: 1,
          explanation: 'Adhesive joints excel in shear but are weak in peel and cleavage. Maximize bond area, use lap joints, and control surface preparation.',
          distractorExplanations: {
            0: 'This "always" claim is too broad; adhesive inferior the principle has important exceptions.',
            2: 'This focuses on apply/adhesive, which is not the correct mechanism or principle for this problem.',
            3: 'This incorrectly claims impossibility; the described outcome is achievable under proper conditions.',
          },
          hint: 'Adhesive joints are strong in shear but weak in peel.',
        },
        {
          id: 'u8-L4-Q12',
          type: 'multiple-choice',
          question: 'A fillet weld connects two plates in a lap joint. The weld fails through which cross-section?',
          options: [
            'Through the weld toe on the base plate',
            'Through the throat of the weld (45-degree plane)',
            'Through the root of the weld',
            'Through the thinner base plate'
          ],
          correctIndex: 1,
          explanation: 'Fillet welds fail through the throat, which is the minimum cross-section at 45 degrees through the weld. Throat = 0.707 x leg size.',
          distractorExplanations: {
            0: 'This focuses on plate, which is not the correct mechanism or principle for this problem.',
            2: 'Fillet welds fail through the throat, which is the minimum cross-section at 45 degrees through the weld.',
            3: 'This focuses on thinner/plate, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The weakest plane through a fillet weld is at 45 degrees.',
        },
        {
          id: 'u8-L4b-MP1',
          type: 'match-pairs',
          question: 'Match each tightening method to its preload accuracy.',
          options: ['Torque wrench', 'Turn-of-nut', 'Stretch measurement', 'Hydraulic tensioner'],
          matchTargets: ['+/- 25 to 30%', '+/- 10 to 15%', '+/- 3 to 5%', '+/- 5 to 10%'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Torque wrenches have the most scatter due to friction. Turn-of-nut and hydraulic tensioners are better. Direct stretch measurement is the most accurate.',
          hint: 'Methods that bypass friction give more consistent preload.',
        },
        {
          id: 'u8-L4-Q15',
          type: 'multiple-choice',
          question: 'What is the primary purpose of a lock washer?',
          options: [
            'To increase the bolt preload',
            'To distribute load over a larger area',
            'To resist loosening from vibration',
            'To seal the joint against fluids'
          ],
          correctIndex: 2,
          explanation: 'Lock washers (split, toothed, or Nordlock) resist bolt loosening from vibration and dynamic loads. They don\'t increase preload or distribute load.',
          distractorExplanations: {
            0: 'This focuses on increase/preload, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on distribute/larger, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on joint/against, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Vibration can cause bolts to rotate and lose preload.',
        },
      ]
    },
    // ─��───────────────────────────────────────────────────────────
    // LESSON 4c: Fasteners : Welded and Adhesive Joints
    // ─────────────────────────────────────────────────────────────
    {
      id: 'u8-L4c',
      title: 'Welded & Adhesive Joints',
      description: 'Fillet and butt welds, weld sizing, adhesive joint design, and joint selection.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L4c-T1',
          type: 'teaching',
          question: 'Fillet vs. butt welds',
          explanation: 'Fillet welds join overlapping plates at right angles. They fail through the throat (0.707 x leg size).',
          hint: 'Butt welds can be as strong as the base metal with proper technique.',
        },
        {
          id: 'u8-L4c-Q1a',
          type: 'multiple-choice',
          question: 'Which weld type provides the strongest joint?',
          options: ['Fillet weld', 'Full-penetration butt weld', 'Spot weld', 'Plug weld'],
          correctIndex: 1,
          explanation: 'A full-penetration butt weld fuses the entire cross-section, making it as strong as the base metal (with proper technique and filler).',
          distractorExplanations: {
          },
          hint: 'Which weld fuses the entire thickness of the plates?',
        },
        {
          id: 'u8-L4-Q20',
          type: 'multiple-choice',
          question: 'A fillet weld has a leg size of 8 mm. What is the throat dimension?',
          options: [
            '4 mm',
            '5.66 mm',
            '8 mm',
            '11.3 mm'
          ],
          correctIndex: 1,
          explanation: 'Throat = 0.707 x leg = 0.707 x 8 = 5.66 mm. The throat is the shortest distance through the weld cross-section.',
          distractorExplanations: {
            0: 'This numerical value does not result from the correct formula applied to the given parameters.',
            2: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: '11.3 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
          },
          hint: 'The throat is 0.707 times the leg size (sin 45 degrees).',
        },
        {
          id: 'u8-L4-Q21',
          type: 'true-false',
          question: 'Welded joints under fatigue loading should avoid sharp notches and undercuts at the weld toe.',
          correctAnswer: true,
          explanation: 'The weld toe is a stress concentration site. Sharp notches and undercuts drastically reduce fatigue life. Proper weld profile and toe grinding improve fatigue performance.',
          distractorExplanations: {
            1: 'The weld toe is a stress concentration site.',
          },
          hint: 'Stress concentrations are the enemy of fatigue life.',
        },
        {
          id: 'u8-L4c-T2',
          type: 'teaching',
          question: 'Adhesive joint design',
          explanation: 'Adhesive joints work best in shear (lap joints). Design rules: maximize overlap area, avoid peel and cleavage loads, control bondline thickness (0.1 to 0.25 mm), and ensure proper surface preparation, and adhesives can join dissimilar materials without heat distortion.',
          hint: 'Try this now: compare the shear strength of a 25 mm overlap vs. a 50 mm overlap.',
        },
        {
          id: 'u8-L4c-SB1',
          type: 'sort-buckets',
          question: 'Sort into "Good for adhesive joints" vs. "Bad for adhesive joints".',
          options: ['Shear loading', 'Large bond area', 'Peel loading', 'Thin bondline (0.1-0.25 mm)', 'High temperature (>200 C)', 'Impact/cleavage loads'],
          buckets: ['Good for adhesive', 'Bad for adhesive'],
          correctBuckets: [0, 0, 1, 0, 1, 1],
          explanation: 'Adhesives excel in shear with large area and thin bondlines. They struggle with peel, cleavage, impact, and high temperatures.',
          hint: 'Adhesives are strong in shear but weak when peeled apart.',
        },
        {
          id: 'u8-L4-Q22',
          type: 'multiple-choice',
          question: 'What welding defect is most dangerous for fatigue life?',
          options: [
            'Slight porosity in the weld interior',
            'Minor spatter on the base plate surface',
            'Lack of fusion at the weld root',
            'Slight discoloration from oxidation'
          ],
          correctIndex: 2,
          explanation: 'Lack of fusion creates a crack-like defect at the weld root. Under cyclic loading, this acts as a pre-existing crack and dramatically reduces fatigue life.',
          distractorExplanations: {
            0: 'This focuses on slight/porosity, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on minor/spatter, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on slight/discoloration, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Which defect acts most like a pre-existing crack?',
        },
        {
          id: 'u8-L4c-MP1',
          type: 'match-pairs',
          question: 'Match each joining method to its best application.',
          options: ['Bolted joint', 'Fillet weld', 'Butt weld', 'Adhesive bond'],
          matchTargets: ['Needs disassembly for maintenance', 'Structural T-joint or bracket', 'Full-strength plate splice', 'Joining dissimilar thin materials'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Bolts allow disassembly. Fillet welds suit T-joints. Butt welds give full strength. Adhesives join dissimilar and thin materials.',
          hint: 'Each method has a sweet spot in terms of joint geometry and requirements.',
        },
        {
          id: 'u8-L4-Q24',
          type: 'true-false',
          question: 'Riveted joints are still commonly used in new steel building construction because they are stronger than bolted joints.',
          correctAnswer: false,
          explanation: 'Rivets have been largely replaced by high-strength bolts in structural steel. Bolts are easier to install, inspect, and can be tightened to precise preloads.',
          distractorExplanations: {
            0: 'Rivets have been largely replaced by high-strength bolts in structural steel.',
          },
          hint: 'Modern construction uses high-strength bolts almost exclusively.',
        },
        {
          id: 'u8-L4-Q25',
          type: 'multiple-choice',
          question: 'What is the main advantage of a double-lap joint over a single-lap joint?',
          options: [
            'Uses less material',
            'Eliminates the bending moment from eccentric loading',
            'Easier to manufacture',
            'Requires fewer fasteners'
          ],
          correctIndex: 1,
          explanation: 'A single-lap joint creates a bending moment because the load path is offset. A double-lap joint is symmetric, eliminating this eccentricity.',
          distractorExplanations: {
            0: 'This focuses on material, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on easier/manufacture, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on requires/fewer, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Think about the load path in each configuration.',
        },
        {
          id: 'u8-L4-Q28',
          type: 'fill-blank',
          question: 'The minimum cross-section through a fillet weld, at 45 degrees, is called the _____ of the weld.',
          blanks: ['throat'],
          wordBank: ['throat', 'root', 'toe', 'leg', 'face'],
          explanation: 'The throat is the shortest distance through the fillet weld cross-section (at 45 degrees). It equals 0.707 times the leg size and is the critical dimension for strength calculations.',
          hint: 'This dimension is used in all fillet weld stress calculations.',
        },
      ]
    },
    // ─────��────────────────────────────────────��──────────────────
    // LESSON 5a: Springs & Seals : Spring Basics
    // ────��──────────────────���─────────────────────────────────────
    {
      id: 'u8-L5',
      title: 'Spring Basics',
      description: 'Helical spring design, spring rate, spring index, and the Wahl correction factor.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L5-T1',
          type: 'teaching',
          question: 'Spring basics and spring rate',
          explanation: 'A helical compression spring stores energy by deflecting under load. Its spring rate k = Gd^4/(8D^3*Na), where G is shear modulus, d is wire diameter, D is mean coil diameter, and Na is the number of active coils.',
          hint: 'Doubling the wire diameter increases the spring rate by 16x (d^4).',
        },
        {
          id: 'u8-L5-Q1a',
          type: 'true-false',
          question: 'A stiffer spring (higher k) deflects less under the same load.',
          correctAnswer: true,
          explanation: 'Yes. F = k*x, so for a given force F, higher k means smaller deflection x.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Spring rate k = F/x.',
        },
        {
          id: 'u8-L5-Q1',
          type: 'multiple-choice',
          question: 'Which factor has the greatest effect on spring rate?',
          options: [
            'Number of active coils (Na)',
            'Wire diameter (d)',
            'Mean coil diameter (D)',
            'Free length'
          ],
          correctIndex: 1,
          explanation: 'Wire diameter appears as d^4 in the spring rate formula, so it has the strongest effect. Doubling d increases k by 16 times.',
          distractorExplanations: {
            0: 'This focuses on number/active, which is not the correct mechanism or principle for this problem.',
            2: 'Regarding diameter: Wire diameter appears as d^4 in the spring rate formula, so it has the strongest effect.',
            3: 'This focuses on length, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Look at the exponents in k = Gd^4/(8D^3*Na).',
        },
        {
          id: 'u8-L1-Q13',
          type: 'fill-blank',
          question: 'The ratio D/d (mean coil diameter to wire diameter) is called the spring _____.',
          blanks: ['index'],
          wordBank: ['index', 'ratio', 'constant', 'factor', 'modulus'],
          explanation: 'The spring index C = D/d describes how tightly a coil is wound. Practical values are between 4 and 12.',
          hint: 'This dimensionless ratio uses the mean coil diameter.',
        },
        {
          id: 'u8-L5-T1b',
          type: 'teaching',
          question: 'The Wahl correction factor',
          explanation: 'The basic shear stress formula tau = 8FD/(pi*d^3) underestimates the actual stress on the inner coil. The Wahl factor K_w accounts for curvature and direct shear: K_w = (4C - 1)/(4C - 4) + 0.615/C, and for C = 6, K_w is about 1.25.',
          hint: 'Try this now: calculate K_w for C = 8.',
        },
        {
          id: 'u8-L5-Q3',
          type: 'true-false',
          question: 'The Wahl factor is always greater than 1.0 because it accounts for curvature effects.',
          correctAnswer: true,
          explanation: 'The inner surface of a coil has higher stress due to curvature. The Wahl factor is always > 1.0 to correct for this, typically 1.1 to 1.4.',
          distractorExplanations: {
            1: 'The inner surface of a coil has higher stress due to curvature.',
          },
          hint: 'Curvature concentrates stress on the inner side of the coil.',
        },
        {
          id: 'u8-L5-MP1',
          type: 'match-pairs',
          question: 'Match each spring parameter to its effect on spring rate.',
          options: ['Increase wire diameter d', 'Increase coil diameter D', 'Add more active coils', 'Use stiffer material (higher G)'],
          matchTargets: ['k increases (d^4 effect)', 'k decreases (D^3 effect)', 'k decreases (1/Na effect)', 'k increases (proportional)'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'k = Gd^4/(8D^3*Na). Wire diameter increases k most strongly. Coil diameter and active coils decrease it.',
          hint: 'Look at how each parameter appears in the formula.',
        },
        {
          id: 'u8-L5-Q4',
          type: 'multiple-choice',
          question: 'A spring has d = 3 mm, D = 24 mm. What is the spring index C?',
          options: [
            '4',
            '6',
            '8',
            '12'
          ],
          correctIndex: 2,
          explanation: 'C = D/d = 24/3 = 8. This is in the practical range of 4 to 12.',
          distractorExplanations: {
            0: '4 is approximately half the correct answer, likely from omitting a required factor of 2.',
            1: 'This numerical value does not result from the correct formula applied to the given parameters.',
            3: 'This numerical value does not result from the correct formula applied to the given parameters.',
          },
          hint: 'C = mean coil diameter / wire diameter.',
        },
        {
          id: 'u8-L5-Q5',
          type: 'multiple-choice',
          question: 'What happens if the spring index C is too low (e.g., C = 3)?',
          options: [
            'The spring becomes too soft',
            'The spring is difficult to manufacture and has high residual stress',
            'The spring rate decreases dramatically',
            'Nothing, any C value works'
          ],
          correctIndex: 1,
          explanation: 'Low C means the coil is wound very tightly. This makes manufacturing difficult, increases residual stresses, and raises the Wahl correction factor significantly.',
          distractorExplanations: {
            0: 'This focuses on becomes, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on decreases/dramatically, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on nothing,/value, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Tight coils are hard to wind and have high curvature stress.',
        },
        {
          id: 'u8-L5-Q7',
          type: 'multiple-choice',
          question: 'Two identical springs in parallel have a combined spring rate of:',
          options: [
            'k/2',
            'k',
            '2k',
            'k^2'
          ],
          correctIndex: 2,
          explanation: 'Springs in parallel add: k_total = k1 + k2 = 2k. Both springs share the load and deflect the same amount.',
          distractorExplanations: {
            0: 'Springs in parallel add: k_total = k1 + k2 = 2k.',
            1: 'Springs in parallel add: k_total = k1 + k2 = 2k.',
            3: 'Springs in parallel add: k_total = k1 + k2 = 2k.',
          },
          hint: 'Parallel springs share the load. Series springs share the deflection.',
        },
        {
          id: 'u8-L5-SB1',
          type: 'sort-buckets',
          question: 'Sort spring configurations: "Springs in parallel" vs. "Springs in series".',
          options: ['Both support the same platform', 'One stacked inside the other (end to end)', 'Combined rate = k1 + k2', 'Combined rate = 1/(1/k1 + 1/k2)', 'Same deflection', 'Same force through each'],
          buckets: ['Parallel', 'Series'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Parallel springs share load with same deflection (rates add). Series springs share deflection with same force (reciprocals add).',
          hint: 'Think about whether both springs see the same force or same displacement.',
        },
      ]
    },
    // ─────────────────────────────────────────���───────────────────
    // LESSON 5b: Springs & Seals : Spring Failure and Seal Types
    // ��─────────────────────��────────────────────────────��─────────
    {
      id: 'u8-L5b',
      title: 'Spring Fatigue & Seals',
      description: 'Spring fatigue, surge, buckling, and an introduction to O-rings, lip seals, and mechanical seals.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L5b-T1',
          type: 'teaching',
          question: 'Spring fatigue and failure modes',
          explanation: 'Springs under cyclic loading can fail by fatigue, just like shafts. Shot peening the wire surface creates compressive residual stress that improves fatigue life by 20 to 50%, and springs can also fail by surging (resonance), buckling (if too slender), or yielding (set).',
          hint: 'Presetting (over-compressing) a spring removes permanent set.',
        },
        {
          id: 'u8-L5b-Q1a',
          type: 'true-false',
          question: 'Shot peening a spring wire improves its fatigue life.',
          correctAnswer: true,
          explanation: 'Yes. Shot peening creates a compressive residual stress layer on the surface, which opposes the tensile stresses that drive fatigue cracks.',
          distractorExplanations: {
            1: 'The statement is true based on the underlying engineering principle.',
          },
          hint: 'Surface compression resists crack initiation.',
        },
        {
          id: 'u8-L5-Q9',
          type: 'true-false',
          question: 'Spring surge occurs when the operating frequency matches a natural frequency of the spring coils.',
          correctAnswer: true,
          explanation: 'Spring surge is resonance. The coils vibrate as a distributed mass-spring system, and if the operating frequency hits a natural frequency, amplitudes spike and can cause failure.',
          distractorExplanations: {
            1: 'Spring surge is resonance.',
          },
          hint: 'Surge is the spring version of shaft whirling.',
        },
        {
          id: 'u8-L5-Q10',
          type: 'multiple-choice',
          question: 'A compression spring buckles when its free length exceeds about how many times its mean coil diameter?',
          options: [
            '2 times',
            '4 times',
            '8 times',
            '12 times'
          ],
          correctIndex: 1,
          explanation: 'A general guideline is that helical compression springs with free length > 4 x D are susceptible to buckling, especially if the ends are not well-guided.',
          distractorExplanations: {
            0: '2 is approximately half the correct answer, likely from omitting a required factor of 2.',
            2: '8 is approximately double the correct answer, likely from a missing factor of 1/2 in the formula.',
            3: '12 results from an incorrect multiplier in the calculation.',
          },
          hint: 'Slender springs buckle, like slender columns.',
        },
        {
          id: 'u8-L5b-T2',
          type: 'teaching',
          question: 'Seal types and selection',
          explanation: 'Seals keep fluids in and contaminants out. O-rings are simple, cheap, and work for static and slow dynamic applications.',
          hint: 'Try this now: check the PV limit for an O-ring vs. a lip seal.',
        },
        {
          id: 'u8-L5-Q14',
          type: 'multiple-choice',
          question: 'Which seal type is best for a centrifugal pump shaft running at 3600 RPM?',
          options: [
            'O-ring in a groove',
            'Felt ring seal',
            'Mechanical (face) seal',
            'Labyrinth seal'
          ],
          correctIndex: 2,
          explanation: 'Mechanical face seals are the standard for centrifugal pumps. Two precision-lapped surfaces maintain a thin fluid film under pressure and high speed.',
          distractorExplanations: {
            0: 'This focuses on o-ring/groove, which is not the correct mechanism or principle for this problem.',
            1: 'Mechanical face seals are the standard for centrifugal pumps.',
            3: 'This focuses on labyrinth, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Two flat, precision-lapped surfaces.',
        },
        {
          id: 'u8-L5b-MP1',
          type: 'match-pairs',
          question: 'Match each seal type to its best application.',
          options: ['O-ring', 'Lip seal', 'Mechanical face seal', 'Labyrinth seal'],
          matchTargets: ['Static flanges, hydraulic fittings', 'Rotating shaft, moderate speed', 'Pump shaft, high pressure', 'Non-contact, gas turbine'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'O-rings suit static and low-speed. Lip seals handle moderate shaft speeds. Mechanical seals handle pump conditions. Labyrinths are non-contact for high-speed gas applications.',
          hint: 'Each seal type excels in a specific speed and pressure range.',
        },
        {
          id: 'u8-L5-Q16',
          type: 'multiple-choice',
          question: 'What does the PV limit represent for a seal?',
          options: [
            'Pressure times Volume flow rate',
            'Pressure times sliding Velocity',
            'Power times Vibration frequency',
            'Preload times Viscosity'
          ],
          correctIndex: 1,
          explanation: 'PV = pressure x sliding velocity. It\'s a measure of heat generation at the seal interface. Exceeding the PV limit causes overheating and rapid wear.',
          distractorExplanations: {
            0: 'This focuses on volume, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on power/vibration, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on preload/viscosity, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'P is contact pressure, V is rubbing speed.',
        },
        {
          id: 'u8-L5-Q17',
          type: 'true-false',
          question: 'An O-ring seal works by being squeezed between surfaces, and the system pressure pushes it harder against the sealing surface.',
          correctAnswer: true,
          explanation: 'O-rings work by initial squeeze (compression) plus pressure energization. As system pressure rises, the O-ring is pushed harder against the groove walls, improving the seal.',
          distractorExplanations: {
            1: 'O-rings work by initial squeeze (compression) plus pressure energization.',
          },
          hint: 'Higher pressure makes the O-ring seal better.',
        },
        {
          id: 'u8-L5b-OS1',
          type: 'order-steps',
          question: 'Order seal selection from simplest to most complex application.',
          steps: ['Static flange joint (use O-ring)', 'Slow reciprocating cylinder (use O-ring or U-cup)', 'Moderate-speed rotating shaft (use lip seal)', 'High-speed pump shaft (use mechanical seal)', 'Gas turbine shaft (use labyrinth + carbon seal)'],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Seal complexity increases with speed, pressure, and temperature requirements.',
          hint: 'Start simple and add complexity only when needed.',
        },
        {
          id: 'u8-L5-Q20',
          type: 'multiple-choice',
          question: 'What is the most common cause of premature lip seal failure?',
          options: [
            'Wrong material selection',
            'Shaft surface roughness outside specification',
            'Incorrect lubricant type',
            'Over-tightening the seal housing'
          ],
          correctIndex: 1,
          explanation: 'Lip seals ride on the shaft surface. If it\'s too rough, the lip wears quickly. If too smooth, the seal can\'t form a proper oil film. Ra 0.2 to 0.5 micrometers is typical.',
          distractorExplanations: {
            0: 'This focuses on wrong/material, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on incorrect/lubricant, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on over-tightening/housing, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'The seal lip rides directly on the shaft surface.',
        },
      ]
    },
    // ───────────────────────────────────────��─────────────────────
    // LESSON 5c: Springs & Seals : Advanced Design
    // ────────────────────────���────────────────────────────────────
    {
      id: 'u8-L5c',
      title: 'Advanced Spring & Seal Design',
      description: 'Spring material selection, end types, seal materials, and failure analysis.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u8-L5-T3',
          type: 'teaching',
          question: 'Spring end types and solid height',
          explanation: 'Spring end types affect active coils and stability. Plain ends have Na = N (total coils).',
          hint: 'Squared and ground ends give the most stable seating.',
        },
        {
          id: 'u8-L5c-Q1a',
          type: 'multiple-choice',
          question: 'A spring has 10 total coils with squared and ground ends. How many active coils?',
          options: ['12', '9', '10', '8'],
          correctIndex: 3,
          explanation: 'Squared and ground ends have 2 inactive coils (one at each end for flat seating). So Na = N - 2 = 10 - 2 = 8 active coils.',
          distractorExplanations: {
          },
          hint: 'Each squared end removes one coil from being active.',
        },
        {
          id: 'u8-L5-Q22',
          type: 'multiple-choice',
          question: 'Which spring material is best for high-temperature applications (above 250 C)?',
          options: [
            'Music wire (ASTM A228)',
            'Chrome-vanadium (ASTM A231)',
            'Inconel X-750',
            'Stainless steel 302'
          ],
          correctIndex: 2,
          explanation: 'Inconel X-750 is a nickel-based superalloy that maintains its spring properties above 250 C. Standard spring steels lose significant strength above 150 to 200 C.',
          distractorExplanations: {
            0: 'This focuses on music/(astm, which is not the correct mechanism or principle for this problem.',
            1: 'This focuses on chrome-vanadium/(astm, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on stainless/steel, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Nickel-based superalloys maintain strength at high temperature.',
        },
        {
          id: 'u8-L5-Q23',
          type: 'true-false',
          question: 'Music wire (ASTM A228) has the highest tensile strength of common spring materials.',
          correctAnswer: true,
          explanation: 'Music wire has the highest tensile strength among common spring steels, making it the go-to choice for small, high-stress springs at room temperature.',
          distractorExplanations: {
            1: 'Music wire has the highest tensile strength among common spring steels, making it the go-to choice for small, high-stress springs at room...',
          },
          hint: 'This wire type is the strongest but can\'t handle high temps.',
        },
        {
          id: 'u8-L5c-T2',
          type: 'teaching',
          question: 'Seal material compatibility',
          explanation: 'Seal material must be compatible with the fluid being sealed. NBR (nitrile) works for petroleum oils.',
          hint: 'Try this now: check if your seal material is compatible with the fluid.',
        },
        {
          id: 'u8-L5c-SB1',
          type: 'sort-buckets',
          question: 'Sort seal materials: "Good with petroleum oil" vs. "Not for petroleum oil".',
          options: ['NBR (nitrile)', 'FKM (Viton)', 'EPDM', 'PTFE', 'Neoprene', 'Silicone'],
          buckets: ['Good with petroleum', 'Not for petroleum'],
          correctBuckets: [0, 0, 1, 0, 0, 1],
          explanation: 'NBR, FKM, PTFE, and neoprene work with petroleum oils. EPDM and silicone swell and degrade in petroleum.',
          hint: 'EPDM and silicone are the main ones to avoid with oil.',
        },
        {
          id: 'u8-L5-Q25',
          type: 'multiple-choice',
          question: 'A spring in a valve must maintain force over millions of cycles. Which is most critical?',
          options: [
            'Free length tolerance',
            'Fatigue life at the working stress range',
            'Spring color coating',
            'Wire surface finish appearance'
          ],
          correctIndex: 1,
          explanation: 'For millions of cycles, fatigue life is the primary concern. The working stress range must be below the endurance limit, and shot peening is typically required.',
          distractorExplanations: {
            0: 'This focuses on length/tolerance, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on spring/color, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on surface/finish, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'High cycle count = fatigue is the dominant concern.',
        },
        {
          id: 'u8-L5c-MP1',
          type: 'match-pairs',
          question: 'Match each spring material to its primary advantage.',
          options: ['Music wire A228', 'Chrome-vanadium A231', 'Stainless 302', 'Inconel X-750'],
          matchTargets: ['Highest strength, low cost', 'Good fatigue life, impact resistance', 'Corrosion resistance', 'High temperature (>250 C)'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Music wire is strongest but basic. Chrome-vanadium handles shock. Stainless resists corrosion. Inconel handles extreme heat.',
          hint: 'Each material has a sweet spot.',
        },
        {
          id: 'u8-L5-Q27',
          type: 'multiple-choice',
          question: 'What is the purpose of "presetting" (cold setting) a compression spring?',
          options: [
            'To increase the spring rate',
            'To remove permanent set so the spring won\'t lose height in service',
            'To improve the surface finish',
            'To change the wire diameter'
          ],
          correctIndex: 1,
          explanation: 'Presetting compresses the spring beyond its intended working deflection. This yields the high-stress areas slightly, so they don\'t yield again in service. The spring loses a small amount of free length but won\'t take additional set.',
          distractorExplanations: {
            0: 'This focuses on increase, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on improve/surface, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on change/diameter, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Over-compress once so it doesn\'t lose height later.',
        },
        {
          id: 'u8-L5-Q29',
          type: 'true-false',
          question: 'Extension springs are more prone to fatigue failure than compression springs because of stress concentration at the hooks.',
          correctAnswer: true,
          explanation: 'Extension spring hooks create stress concentrations where the wire bends sharply. This makes them more susceptible to fatigue failure than compression springs with flat, ground ends.',
          distractorExplanations: {
            1: 'Extension spring hooks create stress concentrations where the wire bends sharply.',
          },
          hint: 'Hooks are the weak point of extension springs.',
        },
        {
          id: 'u8-L5-Q30',
          type: 'multiple-choice',
          question: 'A mechanical face seal is leaking excessively. The seal faces show deep grooves. Most likely cause?',
          options: [
            'Normal wear from long service life',
            'Abrasive particles in the sealed fluid',
            'Incorrect spring tension',
            'Thermal expansion of the seal housing'
          ],
          correctIndex: 1,
          explanation: 'Deep grooves on mechanical seal faces are caused by abrasive particles (sand, dirt, scale) in the fluid. Clean fluid or add filtration upstream of the seal.',
          distractorExplanations: {
            0: 'This focuses on normal/service, which is not the correct mechanism or principle for this problem.',
            2: 'This focuses on incorrect/spring, which is not the correct mechanism or principle for this problem.',
            3: 'This focuses on thermal/expansion, which is not the correct mechanism or principle for this problem.',
          },
          hint: 'Something hard is scratching the precision-lapped faces.',
        },
      ]
    },
    // ──���──────────────────────────────────────────────────────────
    // CONVERSATION LESSON: Machine Design Decision Making
    // ────────────────��────────────────────────────────��───────────
    {
      id: 'u8-L-conv',
      title: 'Gearbox Bearing Selection',
      description: 'Walk through a real bearing selection scenario for an industrial gearbox.',
      icon: '💬',
      xpReward: 30,
      levels: 1,
      type: 'conversation',
      questions: [],
      conversationStartNodeId: 'u8-L-conv-C1',
      conversationNodes: [
        {
          id: 'u8-L-conv-C1',
          speaker: 'Senior Engineer',
          message: 'We\'re designing a 2-stage helical gearbox for a conveyor drive. Input shaft runs at 1450 RPM with 15 kW. The output shaft sees heavy radial loads from the chain sprocket, plus some axial thrust from the helical gears. What bearing type would you pick for the output shaft?',
          options: [
            {
              text: 'Tapered roller bearings in a back-to-back arrangement to handle both radial and axial loads',
              nextNodeId: 'u8-L-conv-C2-great',
              quality: 'great',
              feedback: 'Excellent choice. Tapered rollers handle the heavy combined loads, and back-to-back mounting provides rigidity and handles thrust in both directions.',
            },
            {
              text: 'Deep groove ball bearings, they are the most common type',
              nextNodeId: 'u8-L-conv-C2-okay',
              quality: 'okay',
              feedback: 'Deep groove balls work for light to moderate loads, but this is a heavy-duty conveyor. The radial loads and helical thrust may exceed their ratings quickly.',
            },
            {
              text: 'Plain journal bearings for the heavy loads',
              nextNodeId: 'u8-L-conv-C2-poor',
              quality: 'poor',
              feedback: 'Journal bearings handle heavy radial loads well, but they need continuous oil supply, can\'t handle axial thrust easily, and are unusual in standard gearboxes.',
            },
          ],
        },
        {
          id: 'u8-L-conv-C2-great',
          speaker: 'Senior Engineer',
          message: 'Good thinking. Now, the catalog shows a tapered roller bearing with C = 95 kN. The equivalent dynamic load on the output shaft is P = 12 kN at 180 RPM. The customer wants 20,000 hours of life. How do you check if this bearing works?',
          nextNodeId: 'u8-L-conv-C3',
        },
        {
          id: 'u8-L-conv-C2-okay',
          speaker: 'Senior Engineer',
          message: 'Let\'s reconsider. For heavy combined loads in a gearbox, tapered rollers are standard. But the analysis process is the same. The catalog shows C = 95 kN. Output shaft load P = 12 kN at 180 RPM. Customer wants 20,000 hours. How do you check if this bearing works?',
          nextNodeId: 'u8-L-conv-C3',
        },
        {
          id: 'u8-L-conv-C2-poor',
          speaker: 'Senior Engineer',
          message: 'For a standard gearbox, rolling element bearings are the way to go. Let\'s use tapered rollers. The catalog shows C = 95 kN. Output shaft load P = 12 kN at 180 RPM. Customer wants 20,000 hours. How do you verify the life?',
          nextNodeId: 'u8-L-conv-C3',
        },
        {
          id: 'u8-L-conv-C3',
          speaker: 'Senior Engineer',
          message: 'Walk me through how you\'d verify the bearing life meets the 20,000-hour requirement.',
          options: [
            {
              text: 'Convert 20,000 hours to revolutions (20000 x 60 x 180 = 216 million rev), then check L10 = (C/P)^(10/3) = (95/12)^3.33 = 1283 million rev. That exceeds 216 million, so it passes.',
              nextNodeId: 'u8-L-conv-C4-great',
              quality: 'great',
              feedback: 'Perfect. You used p = 10/3 for roller bearings and properly converted hours to revolutions. The bearing has about 6x the required life.',
            },
            {
              text: 'Use L10 = (C/P)^3 = (95/12)^3 = about 500 million revolutions. That seems like enough.',
              nextNodeId: 'u8-L-conv-C4-okay',
              quality: 'okay',
              feedback: 'Close, but you used p = 3, which is for ball bearings. Roller bearings use p = 10/3 = 3.33. The actual life is even higher, so it still passes, but the exponent matters for close calls.',
            },
            {
              text: 'C is bigger than P, so the bearing should last a long time. It\'s fine.',
              nextNodeId: 'u8-L-conv-C4-poor',
              quality: 'poor',
              feedback: 'You need to actually calculate the life. "C > P" just means it can carry the load, but doesn\'t tell you for how long. Always run the numbers.',
            },
          ],
        },
        {
          id: 'u8-L-conv-C4-great',
          speaker: 'Senior Engineer',
          message: 'Solid work. One last question: the gearbox will be installed outdoors in a mining site with lots of dust. What bearing protection measures would you recommend?',
          nextNodeId: 'u8-L-conv-C5',
        },
        {
          id: 'u8-L-conv-C4-okay',
          speaker: 'Senior Engineer',
          message: 'Right idea, wrong exponent, but the result is still a pass. Now, the gearbox goes outdoors at a mining site with lots of dust. What bearing protection do you recommend?',
          nextNodeId: 'u8-L-conv-C5',
        },
        {
          id: 'u8-L-conv-C4-poor',
          speaker: 'Senior Engineer',
          message: 'Always calculate. L10 = (95/12)^3.33 = 1283 million revolutions, which gives about 119,000 hours. Now, the gearbox goes outdoors at a mining site with lots of dust. What protection measures would you recommend?',
          nextNodeId: 'u8-L-conv-C5',
        },
        {
          id: 'u8-L-conv-C5',
          speaker: 'Senior Engineer',
          message: 'What specific contamination protection would you specify for this harsh environment?',
          options: [
            {
              text: 'Sealed bearings (2RS type) or labyrinth seals at shaft entries, breather with filter on the housing, and synthetic oil with regular oil analysis schedule.',
              nextNodeId: 'u8-L-conv-end',
              quality: 'great',
              feedback: 'Complete answer. Seals keep dust out, filtered breather prevents contamination during thermal breathing, and oil analysis catches problems early.',
            },
            {
              text: 'Use sealed bearings and change the oil more frequently.',
              nextNodeId: 'u8-L-conv-end',
              quality: 'okay',
              feedback: 'Good start, but you should also address the housing entries (labyrinth seals) and use filtered breathers. Frequent oil changes help but don\'t prevent ingress.',
            },
            {
              text: 'Just use a higher load rating bearing to compensate for contamination.',
              nextNodeId: 'u8-L-conv-end',
              quality: 'poor',
              feedback: 'A bigger bearing doesn\'t prevent contamination. Particles in the oil damage bearing surfaces regardless of load rating. Prevention (sealing, filtration) is the correct approach.',
            },
          ],
        },
        {
          id: 'u8-L-conv-end',
          speaker: 'Narrator',
          message: 'Great work walking through this gearbox bearing selection. You covered bearing type selection, life calculation, and contamination protection: three critical aspects of real-world machine design.',
        },
      ],
    },
    // ──────────────────────────────────────────���──────────────────
    // SPEED ROUND: Machine Design Rapid Fire
    // ─��─────────────────────────────────────────────────────��─────
    {
      id: 'u8-L-speed',
      title: 'Machine Design Speed Round',
      description: '15 rapid-fire questions on shafts, bearings, gears, fasteners, springs, and seals.',
      icon: '⚡',
      xpReward: 30,
      levels: 1,
      type: 'speed-round',
      questions: [],
      speedTimeLimit: 60,
      speedQuestions: [
        {
          id: 'u8-L-speed-SQ1',
          question: 'What transmits power through a rotating shaft?',
          options: ['Bending only', 'Shear force', 'Axial load', 'Torque'],
          correctIndex: 3,
        },
        {
          id: 'u8-L-speed-SQ2',
          question: 'Where is shear stress maximum in a solid shaft under torsion?',
          options: ['Center', 'Outer surface', 'Midway', 'Uniform'],
          correctIndex: 1,
        },
        {
          id: 'u8-L-speed-SQ3',
          question: 'Beach marks on a shaft indicate what failure?',
          options: ['Overload', 'Fatigue', 'Corrosion', 'Creep'],
          correctIndex: 1,
        },
        {
          id: 'u8-L-speed-SQ4',
          question: 'L10 bearing life exponent for ball bearings?',
          options: ['3', '10/3', '2', '4'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ5',
          question: 'What does a keyway create on a shaft?',
          options: ['Stress concentration', 'Lubrication groove', 'Cooling channel', 'Balance weight'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ6',
          question: 'Gear ratio equals what ratio?',
          options: ['Teeth count', 'Diameter', 'Both A and B', 'Weight'],
          correctIndex: 2,
        },
        {
          id: 'u8-L-speed-SQ7',
          question: 'Which gear type can be self-locking?',
          options: ['Worm', 'Spur', 'Helical', 'Bevel'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ8',
          question: 'Bolt preload is typically what % of proof load?',
          options: ['75%', '50%', '100%', '25%'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ9',
          question: 'Fillet weld throat = leg size times what?',
          options: ['0.707', '1.0', '0.5', '1.414'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ10',
          question: 'Spring index C = D/d should be in what range?',
          options: ['4 to 12', '1 to 3', '15 to 30', '0.5 to 2'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ11',
          question: 'Which fatigue criterion is most conservative?',
          options: ['Soderberg', 'Goodman', 'Gerber', 'ASME'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ12',
          question: 'Helical gears create what extra force that spur gears don\'t?',
          options: ['Axial thrust', 'Centrifugal', 'Gravitational', 'Magnetic'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ13',
          question: 'What seal type is standard for centrifugal pumps?',
          options: ['Mechanical face', 'O-ring', 'Lip seal', 'Felt ring'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ14',
          question: 'The Wahl factor corrects for what in springs?',
          options: ['Curvature stress', 'Temperature', 'Corrosion', 'Weight'],
          correctIndex: 0,
        },
        {
          id: 'u8-L-speed-SQ15',
          question: 'An 8.8 bolt has what ultimate tensile strength?',
          options: ['800 MPa', '880 MPa', '640 MPa', '1000 MPa'],
          correctIndex: 0,
        },
      ],
    },
  ]
};
