import type { Unit } from '../types';

export const unit7: Unit = {
  id: 'u7-materials',
  title: 'Materials & Mfg.',
  description: 'Material properties, phase diagrams, heat treatment, casting, forming, machining, and modern manufacturing processes.',
  color: '#F97316',
  icon: '🏭',
  topicId: 'materials-engineering',
  lessons: [
    {
      id: 'u7-L1',
      title: 'Tensile Test Basics',
      description: 'Stress-strain curves, yield strength, UTS, ductility measures.',
      icon: '📝',
      xpReward: 20,
      levels: 4,
      questions: [
        {
          id: 'u7-L1-T1',
          type: 'teaching',
          question: 'The Tensile Test',
          explanation: 'A tensile test pulls a specimen until it breaks, producing a stress-strain curve. The key values are yield strength (where permanent deformation starts), ultimate tensile strength (the peak), and elongation at fracture (a measure of ductility).',
          hint: 'The slope of the initial straight-line region is the elastic modulus (stiffness).',
        },
        {
          id: 'u7-L1-EZ1',
          type: 'true-false',
          question: 'A tensile test pulls a specimen apart until it breaks.',
          correctAnswer: true,
          explanation: 'Yes. A tensile test applies a pulling force that increases until the specimen fractures.',
          hint: 'Think about what "tensile" means.',
        },
        {
          id: 'u7-L1-Q1',
          type: 'multiple-choice',
          question: 'Why is reduction in area often a better ductility measure than percent elongation?',
          options: [
            'Reduction in area is always a numerically larger measurement',
            'Reduction in area captures localized fracture deformation better',
            'Percent elongation includes elastic strain, which is recovered',
            'Reduction in area directly measures the material\'s hardness,',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Left half — grip + shoulder + gauge end --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <!-- Right half (mirror) --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <!-- Gauge section (necks then fractures) --> <path fill="#58CC02" opacity="0.1"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> </path> <path stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.5"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> <animate attributeName="opacity" values="0.5;0.5;0.5;0;0;0.5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </path> <!-- Necking stress concentration zone --> <ellipse cx="40" cy="40" rx="8" ry="5" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.1;0.18;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="ry" values="5;5;3;1;1;5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </ellipse> <!-- Gauge length marks (spread apart during test) --> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <!-- Gauge length bracket --> <line y1="30" y2="30" stroke="#3B8700" stroke-width="0.5" opacity="0.15"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <text x="40" y="28" text-anchor="middle" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">L₀</text> <!-- Fracture flash (X mark) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0;0.7;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.68;0.71;0.73;0.8;1"/> <line x1="37" y1="36" x2="43" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> <line x1="43" y1="36" x2="37" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> </g> <!-- Force arrows (pull apart) --> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="14,40 9,37 9,43;8,40 3,37 3,43;2,40 -3,37 -3,43;0,40 -5,37 -5,43;0,40 -5,37 -5,43;14,40 9,37 9,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="66,40 71,37 71,43;72,40 77,37 77,43;78,40 83,37 83,43;80,40 85,37 85,43;80,40 85,37 85,43;66,40 71,37 71,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <!-- F labels near arrows --> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="10;5;0;0;0;10" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="70;75;80;80;80;70" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> </svg>',
          explanation: 'Reduction in area (RA) measures the maximum local deformation at the fracture neck, making it independent of gauge length. Percent elongation, on the other hand, depends heavily on the chosen gauge length.',
          hint: 'To the gauge length measurement if you change the.',
                },
        {
          id: 'u7-L1-Q2',
          type: 'multiple-choice',
          question: 'Which hardness test uses a diamond pyramid for thin coatings and micro-phases?',
          options: [
            'Rockwell C (HRC)',
            'Brinell (HB)',
            'Vickers (HV)',
            'Shore D',
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Specimen block --> <rect x="10" y="48" width="60" height="20" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="10" y="48" width="60" height="20" rx="3" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Surface highlight --> <rect x="12" y="48" width="56" height="3" rx="1" fill="#A5E86C" opacity="0.1"/> <!-- Indenter (animated — pushes down then retracts) --> <g> <animateTransform attributeName="transform" type="translate" dur="3s" repeatCount="indefinite" values="0,0;0,6;0,6;0,0" keyTimes="0;0.3;0.6;0.9" calcMode="spline" keySplines="0.3 0 0.7 1;0.5 0 0.5 1;0.3 0 0.7 1"/> <!-- Indenter body --> <rect x="36" y="10" width="8" height="24" rx="2" fill="#3B8700" opacity="0.3"/> <rect x="36" y="10" width="8" height="24" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Diamond tip --> <polygon points="40,34 37,40 40,48 43,40" fill="#3B8700" opacity="0.45"/> <polygon points="40,34 37,40 40,48 43,40" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> </g> <!-- Force arrow --> <line x1="40" y1="4" x2="40" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/> <polygon points="38,8 40,11 42,8" fill="#3B8700" opacity="0.3"/> <text x="40" y="4" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.25" font-style="italic">F</text> <!-- Indentation mark (appears after indenter pushes) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.35;0.35;0" keyTimes="0;0.28;0.35;0.85;1" dur="3s" repeatCount="indefinite"/> <ellipse cx="40" cy="48" rx="4" ry="1.5" fill="#3B8700" opacity="0.3"/> <!-- Measurement dimension --> <line x1="34" y1="52" x2="46" y2="52" stroke="#3B8700" stroke-width="0.6"/> <line x1="34" y1="50" x2="34" y2="54" stroke="#3B8700" stroke-width="0.6"/> <line x1="46" y1="50" x2="46" y2="54" stroke="#3B8700" stroke-width="0.6"/> <text x="40" y="58" text-anchor="middle" font-size="4" fill="#3B8700" font-style="italic">d</text> </g> <text x="40" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">HV = 1.854F/d²</text> </svg>',
          explanation: 'Vickers hardness uses a diamond square pyramid indenter with a 136° included angle. It can use very low loads making it ideal for thin coatings, case-hardened layers, and individual microstructural phases.',
          hint: 'which test can use very small loads for micro-indentation.',
                },
        {
          id: 'u7-L1-Q3',
          type: 'true-false',
          question: 'The DBTT is a concern for BCC metals (carbon steel) but not FCC metals (stainless, aluminum).',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Frame/support --> <line x1="40" y1="4" x2="40" y2="10" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.3"/> <!-- Pendulum arm + hammer (swinging) --> <g> <animateTransform attributeName="transform" type="rotate" dur="2.5s" repeatCount="indefinite" values="-60,40,10;30,40,10;10,40,10;-60,40,10" keyTimes="0;0.35;0.6;1" calcMode="spline" keySplines="0.2 0 0.8 1;0.4 0 0.6 1;0.3 0 0.7 1"/> <line x1="40" y1="10" x2="40" y2="52" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.4"/> <!-- Hammer head --> <rect x="34" y="50" width="12" height="8" rx="2" fill="#3B8700" opacity="0.4"/> <rect x="34" y="50" width="12" height="8" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <!-- Pivot --> <circle cx="40" cy="10" r="3" fill="#3B8700"/> <circle cx="40" cy="10" r="1.2" fill="white" opacity="0.3"/> <!-- Specimen on anvil (at lowest point of swing arc) --> <rect x="36" y="56" width="8" height="4" rx="1" fill="#58CC02" opacity="0.2"/> <rect x="36" y="56" width="8" height="4" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Anvil --> <rect x="28" y="60" width="24" height="6" rx="2" fill="#58CC02" opacity="0.12"/> <rect x="28" y="60" width="24" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Swing arc (dashed) --> <path d="M12,46 Q28,62 52,58 Q64,54 66,42" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="2,3" fill="none" opacity="0.12"/> <!-- Impact flash (at contact moment) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0;0" keyTimes="0;0.33;0.36;0.4;1" dur="2.5s" repeatCount="indefinite"/> <circle cx="40" cy="56" r="6" fill="#58CC02" opacity="0.3"/> <line x1="34" y1="52" x2="30" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> <line x1="46" y1="52" x2="50" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> </g> <!-- Height labels --> <text x="14" y="34" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₁</text> <text x="66" y="38" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₂</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">E = mg(h₁−h₂)</text> </svg>',
          explanation: 'BCC metals exhibit a sharp ductile-to-brittle transition as temperature decreases because dislocation mobility drops rapidly. FCC metals do not exhibit a clear DBTT.',
          hint: 'The crystal structure and how it affects dislocation.',
                },
        {
          id: 'u7-L1-T1b',
          type: 'teaching',
          question: 'Engineering vs True Stress',
          explanation: 'Engineering stress uses the original cross-section area. True stress uses the actual (instantaneous) area, which shrinks during necking. That\'s why engineering stress appears to drop after UTS, even though the material keeps getting stronger.',
          hint: 'Try this now: sketch a stress-strain curve and mark where engineering and true stress diverge.',
        },
        {
          id: 'u7-L1-Q4',
          type: 'multiple-choice',
          question: 'A steam header in a power plant operates at 550°C under constant internal pressure. After 15 years of service, inspection reveals the tube has permanently bulged outward. There are no signs of corrosion or cyclic loading. What failure mechanism is most likely responsible?',
          options: [
            'Thermal fatigue from repeated heating and cooling cycles',
            'Creep: time-dependent deformation from sustained high-temp stress',
            'Stress corrosion cracking in a corrosive environment',
            'Overload yielding from a single excessive static load',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,63.5 74,66.5 76,65" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="76" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">time</text> <text x="6" y="36" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">ε</text> <!-- Creep curve: instantaneous → primary → secondary (steady) → tertiary → rupture --> <path d="M12,58 L14,42 Q18,36 24,34 L46,28 Q56,24 62,18 L66,12" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"> <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Region separators (dashed verticals) --> <line x1="18" y1="36" x2="18" y2="65" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2.5" opacity="0"> <animate attributeName="opacity" values="0;0;0.15;0.15;0" keyTimes="0;0.1;0.15;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <line x1="50" y1="26" x2="50" y2="65" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2.5" opacity="0"> <animate attributeName="opacity" values="0;0;0.15;0.15;0" keyTimes="0;0.38;0.42;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Region labels --> <text x="12" y="72" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.06;0.1;0.82;1" dur="6s" repeatCount="indefinite"/>I</text> <text x="32" y="72" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.18;0.22;0.82;1" dur="6s" repeatCount="indefinite"/>II (steady)</text> <text x="58" y="72" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.42;0.46;0.82;1" dur="6s" repeatCount="indefinite"/>III</text> <!-- Rupture X --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.5;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="63" y1="9" x2="69" y2="15" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="69" y1="9" x2="63" y2="15" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> </g> <!-- Tracing dot --> <circle r="3" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,58 L14,42 Q18,36 24,34 L46,28 Q56,24 62,18 L66,12" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'The permanent bulging under constant stress at 550°C is classic creep deformation. Creep occurs in metals above roughly 0.4 × T_melting (in Kelvin), for steel, that is around 400°C.',
          hint: 'Mechanism causes permanent deformation under constant.',
                },
        {
          id: 'u7-L1-Q5',
          type: 'multiple-choice',
          question: 'S-N curve shows endurance limit of 300 MPa. Practical meaning?',
          options: [
            'The material will fail after exactly 10⁶ cycles at 300 MPa',
            'Below 300 MPa cyclic stress amplitude',
            'The ultimate tensile strength is 300 MPa',
            'The yield strength under cyclic loading is 300 MPa',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,63.5 74,66.5 76,65" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="76" text-anchor="middle" font-size="5.5" fill="#3B8700" opacity="0.3" font-style="italic">log N</text> <text x="6" y="36" text-anchor="middle" font-size="5.5" fill="#3B8700" opacity="0.3" font-style="italic">S</text> <!-- S-N curve (animated draw) --> <path d="M16,14 Q24,16 32,26 Q40,36 48,42 Q56,46 68,48" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="90" stroke-dashoffset="90"> <animate attributeName="stroke-dashoffset" values="90;0;0;90" keyTimes="0;0.5;0.8;1" dur="5s" repeatCount="indefinite"/> </path> <!-- Endurance limit line (horizontal asymptote) --> <line x1="48" y1="48" x2="74" y2="48" stroke="#A5E86C" stroke-width="1" stroke-dasharray="2,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.4;0.5;0.8;1" dur="5s" repeatCount="indefinite"/> </line> <text x="72" y="44" font-size="4" fill="#3B8700" opacity="0" font-style="italic"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.4;0.5;0.8;1" dur="5s" repeatCount="indefinite"/> S_e </text> <!-- Tracing dot --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="5s" repeatCount="indefinite" path="M16,14 Q24,16 32,26 Q40,36 48,42 Q56,46 68,48" keyPoints="0;1;1;0" keyTimes="0;0.5;0.8;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.51;1" dur="5s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.4"> <animateMotion dur="5s" repeatCount="indefinite" path="M16,14 Q24,16 32,26 Q40,36 48,42 Q56,46 68,48" keyPoints="0;1;1;0" keyTimes="0;0.5;0.8;1" calcMode="linear"/> <animate attributeName="opacity" values="0.4;0.4;0;0" keyTimes="0;0.5;0.51;1" dur="5s" repeatCount="indefinite"/> </circle> <!-- Region labels --> <text x="24" y="60" font-size="3.5" fill="#3B8700" opacity="0.15">LCF</text> <text x="56" y="60" font-size="3.5" fill="#3B8700" opacity="0.15">HCF</text> </svg>',
          explanation: 'The endurance limit (or fatigue limit) is the stress amplitude below which a material can withstand theoretically infinite cycles without fatigue failure. For steel, the endurance limit is typically 0.4–0.5 × UTS for polished, unnotched specimens.',
          hint: 'The endurance limit is the horizontal asymptote on the.'
                },
        {
          id: 'u7-L1-Q6',
          type: 'fill-blank',
          question: 'A shaft broke unexpectedly in service. The fracture surface shows smooth, curved "beach marks" radiating from an origin point, with a small rough area of final fracture. This pattern is characteristic of _____ failure.',
          blanks: ['fatigue'],
          wordBank: ['fatigue', 'creep', 'corrosion', 'buckling', 'yielding'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Specimen block --> <rect x="10" y="16" width="60" height="48" rx="1" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.03"/> <!-- Initial notch --> <path d="M10,40 L22,40" stroke-width="1" stroke="#58CC02"/> <!-- Growing crack --> <path d="M22,40 L28,41 L32,39 L36,40.5 L40,39.5 L44,40" stroke-width="0.8" stroke="#A5E86C" fill="none"> <animate attributeName="d" values="M22,40 L26,40.5 L28,39.5;M22,40 L28,41 L32,39 L36,40.5 L40,39.5 L44,40;M22,40 L28,41 L32,39 L36,40.5 L40,39.5 L44,40 L48,40.5 L52,39.5 L56,40" dur="6s" repeatCount="indefinite"/> </path> <!-- Crack tip stress field (plastic zone) --> <circle cx="44" cy="40" r="4" fill="#A5E86C" opacity="0.1"> <animate attributeName="cx" values="28;44;56" dur="6s" repeatCount="indefinite"/> <animate attributeName="r" values="2;4;6" dur="6s" repeatCount="indefinite"/> </circle> <!-- Cyclic load arrows --> <g opacity="0.4"> <line x1="40" y1="4" x2="40" y2="14" stroke-width="0.6" stroke="#58CC02"/> <polygon points="38.5,14 41.5,14 40,16" fill="#58CC02"/> <line x1="40" y1="76" x2="40" y2="66" stroke-width="0.6" stroke="#58CC02"/> <polygon points="38.5,66 41.5,66 40,64" fill="#58CC02"/> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <!-- Beach marks (striations) --> <g stroke="#58CC02" stroke-width="0.2" opacity="0.15"> <path d="M26,36 Q26,40 26,44" fill="none"/> <path d="M30,35 Q30,40 30,45" fill="none"/> <path d="M34,34.5 Q34,40 34,45.5" fill="none"/> <path d="M38,34 Q38,40 38,46" fill="none"/> <path d="M42,33.5 Q42,40 42,46.5" fill="none"/> </g> <!-- Crack length label --> <line x1="22" y1="50" x2="44" y2="50" stroke-width="0.3" stroke="#3B8700" opacity="0.3"/> <text x="33" y="54" font-size="3" fill="#3B8700" opacity="0.4" text-anchor="middle">a</text> <!-- da/dN label --> <text x="40" y="12" font-size="3" fill="#58CC02" opacity="0.4" text-anchor="middle">da/dN = C(ΔK)ᵐ</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">Paris law</text> </svg>',
          explanation: 'Beach marks are the hallmark of fatigue failure. They represent the position of the crack front at different stages of growth, caused by variations in loading or environmental conditions.',
          hint: 'The smooth, progressively spreading region with curved.'
                },
        {
          id: 'u7-L1-MP1',
          type: 'match-pairs',
          question: 'Match each mechanical test to what it measures',
          options: ['Tensile test', 'Charpy test', 'Rockwell test', 'Creep test'],
          matchTargets: ['Stress-strain curve', 'Impact toughness', 'Indentation hardness', 'Time-dependent deformation'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Tensile tests produce stress-strain curves. Charpy tests measure impact energy. Rockwell measures hardness by indentation depth. Creep tests measure deformation under sustained load at high temperature.',
          hint: 'Think about what each test physically does to the specimen.',
        },
        {
          id: 'u7-L1-OS1',
          type: 'order-steps',
          question: 'Order the regions of a tensile stress-strain curve from start to finish',
          steps: ['Linear elastic region', 'Yielding begins', 'Strain hardening to UTS', 'Necking to fracture'],
          correctOrder: [0, 1, 2, 3],
          explanation: 'The curve starts with a linear elastic region (slope = E), then yielding, then strain hardening up to UTS, and finally necking and fracture.',
          hint: 'Start with the straight-line portion of the curve.',
        },
        {
          id: 'u7-L1-T2',
          type: 'teaching',
          question: 'Hardness, Creep, and Fatigue',
          explanation: 'Hardness tests (Rockwell, Brinell, Vickers) measure resistance to indentation. Creep is slow, permanent deformation under constant stress at high temperature. Fatigue is cracking from repeated cyclic loading, even well below the yield strength.',
          hint: 'The S-N curve shows how many cycles a material survives at a given stress level.',
        },
        {
          id: 'u7-L1-Q7',
          type: 'multiple-choice',
          question: "A yield strength of 350 MPa and an ultimate tensile strength of 520 MPa. What is the strain hardening ratio?",
          options: [
            "Ratio is 520/350 = 1.49, indicating good formability",
            "Ratio is 350/520 = 0.67, indicating the material is too soft for structural use",
            "Ratio is (520-350)/350 = 0.49, indicating 49% elongation at fracture",
            "Ratio is 520-350 = 170 MPa, which is the working stress range for the material",
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve — animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker — appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker — appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker — appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot — follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: "The strain hardening ratio (UTS/YS) of 1.49 indicates that the material work-hardens significantly between yielding and necking. A higher ratio (>1.3) means the material can distribute plastic strain more uniformly, delaying necking and improving formability.",
          hint: "The ratio of UTS to yield strength tells you how much."
        },
        {
          id: 'u7-L1-Q8',
          type: 'multiple-choice',
          question: "Round bar specimen, the engineering stress appears to decrease after reaching the UTS. Is the material actually getting weaker?",
          options: [
            "Yes, the material softens due to internal damage accumulation after UTS",
            "The stress decreases because the strain rate drops after UTS",
            "No: the true stress continues to increase, but engineering stress drops",
            "The apparent decrease is a measurement error caused by extensometer slippage during necking, but this applies only to a narrow range of material compositions and temperatures",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve — animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker — appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker — appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker — appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot — follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: "Engineering stress = F/A₀ (original area). After UTS, necking begins and the cross-sectional area at the neck reduces rapidly.",
          hint: "Engineering stress uses the original area A₀."
        },
        {
          id: 'u7-L1-Q9',
          type: 'multiple-choice',
          question: "Rank these materials by elastic modulus (highest to lowest):",
          options: [
            "Aluminum > Steel > Titanium > Copper",
            "Steel > Aluminum > Copper > Titanium",
            "Titanium > Steel > Aluminum > Copper",
            "Steel > Copper > Titanium > Aluminum",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Left half — grip + shoulder + gauge end --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <!-- Right half (mirror) --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <!-- Gauge section (necks then fractures) --> <path fill="#58CC02" opacity="0.1"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> </path> <path stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.5"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> <animate attributeName="opacity" values="0.5;0.5;0.5;0;0;0.5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </path> <!-- Necking stress concentration zone --> <ellipse cx="40" cy="40" rx="8" ry="5" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.1;0.18;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="ry" values="5;5;3;1;1;5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </ellipse> <!-- Gauge length marks (spread apart during test) --> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <!-- Gauge length bracket --> <line y1="30" y2="30" stroke="#3B8700" stroke-width="0.5" opacity="0.15"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <text x="40" y="28" text-anchor="middle" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">L₀</text> <!-- Fracture flash (X mark) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0;0.7;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.68;0.71;0.73;0.8;1"/> <line x1="37" y1="36" x2="43" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> <line x1="43" y1="36" x2="37" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> </g> <!-- Force arrows (pull apart) --> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="14,40 9,37 9,43;8,40 3,37 3,43;2,40 -3,37 -3,43;0,40 -5,37 -5,43;0,40 -5,37 -5,43;14,40 9,37 9,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="66,40 71,37 71,43;72,40 77,37 77,43;78,40 83,37 83,43;80,40 85,37 85,43;80,40 85,37 85,43;66,40 71,37 71,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <!-- F labels near arrows --> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="10;5;0;0;0;10" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="70;75;80;80;80;70" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> </svg>',
          explanation: "Approximate elastic moduli: Steel ~200 GPa, Copper ~120 GPa, Titanium ~110 GPa, Aluminum ~70 GPa. The elastic modulus is determined by atomic bonding strength and is essentially insensitive to heat treatment, cold work, or alloying.",
          hint: "Elastic modulus depends on atomic bonding."
        },
      ]
    },
    {
      id: 'u7-L1b',
      title: 'Hardness, Creep, and Fatigue',
      description: 'Hardness tests, creep at high temperature, fatigue S-N curves.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u7-L1-T3',
          type: 'teaching',
          question: 'Fracture Toughness and K_IC',
          explanation: 'Fracture toughness (K_IC) measures how well a material resists crack growth. Higher K_IC means cracks need more energy to spread. It\'s the single most important property for parts with existing flaws or stress concentrations.',
          hint: 'K_IC is tested using pre-cracked specimens loaded until the crack propagates.',
        },
        {
          id: 'u7-L1b-EZ1',
          type: 'true-false',
          question: 'Fatigue failure can happen even when the stress is below the yield strength.',
          correctAnswer: true,
          explanation: 'Correct. Fatigue cracks grow under repeated cyclic loading, even at stresses well below yield.',
          hint: 'Repeated loading is the key here.',
        },
        {
          id: 'u7-L1-Q10',
          type: 'true-false',
          question: "The Rockwell C hardness test (HRC) uses a 1/16-inch steel ball indenter and is commonly used for soft metals like aluminum and brass.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Specimen block --> <rect x="10" y="48" width="60" height="20" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="10" y="48" width="60" height="20" rx="3" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Surface highlight --> <rect x="12" y="48" width="56" height="3" rx="1" fill="#A5E86C" opacity="0.1"/> <!-- Indenter (animated — pushes down then retracts) --> <g> <animateTransform attributeName="transform" type="translate" dur="3s" repeatCount="indefinite" values="0,0;0,6;0,6;0,0" keyTimes="0;0.3;0.6;0.9" calcMode="spline" keySplines="0.3 0 0.7 1;0.5 0 0.5 1;0.3 0 0.7 1"/> <!-- Indenter body --> <rect x="36" y="10" width="8" height="24" rx="2" fill="#3B8700" opacity="0.3"/> <rect x="36" y="10" width="8" height="24" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Diamond cone tip (120 degree) --> <polygon points="40,34 37,40 40,48 43,40" fill="#3B8700" opacity="0.45"/> <polygon points="40,34 37,40 40,48 43,40" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> </g> <!-- Force arrow --> <line x1="40" y1="4" x2="40" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/> <polygon points="38,8 40,11 42,8" fill="#3B8700" opacity="0.3"/> <text x="40" y="4" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.25" font-style="italic">F</text> <!-- Indentation mark (appears after indenter pushes) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.35;0.35;0" keyTimes="0;0.28;0.35;0.85;1" dur="3s" repeatCount="indefinite"/> <ellipse cx="40" cy="48" rx="4" ry="1.5" fill="#3B8700" opacity="0.3"/> <!-- Depth measurement --> <line x1="48" y1="48" x2="48" y2="52" stroke="#3B8700" stroke-width="0.6"/> <line x1="46" y1="48" x2="50" y2="48" stroke="#3B8700" stroke-width="0.6"/> <line x1="46" y1="52" x2="50" y2="52" stroke="#3B8700" stroke-width="0.6"/> <text x="53" y="51" font-size="3.5" fill="#3B8700" font-style="italic">depth</text> </g> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">HRC: 120° diamond cone, 150 kg</text> </svg>',
          explanation: "Rockwell C uses a diamond cone (Brale) indenter with a 120° included angle and a 150 kg major load. It is used for hard materials: hardened steel, tool steel, and hard alloys.",
          hint: "The \"C\" scale is for hard materials."
        },
        {
          id: 'u7-L1-Q11',
          type: 'multiple-choice',
          question: "A component made of 316 stainless steel will operate at 700°C under moderate sustained load for 20 years. Which material property should govern the design stress?",
          options: [
            "Room-temperature yield strength divided by a safety factor",
            "Creep rupture strength at 700°C for 100,000+ hours",
            "Ultimate tensile strength at 700°C divided by 4",
            "Fatigue endurance limit at 700°C",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="66" x2="12" y2="8" stroke-width="0.6" stroke="#58CC02"/> <line x1="12" y1="66" x2="74" y2="66" stroke-width="0.6" stroke="#58CC02"/> <text x="7" y="10" font-size="3.5" fill="#58CC02" text-anchor="middle">σ</text> <text x="74" y="72" font-size="3.5" fill="#58CC02" text-anchor="middle">ε</text> <!-- Steel (steep slope) --> <line x1="12" y1="66" x2="34" y2="14" stroke-width="0.8" stroke="#58CC02" opacity="0.7"/> <text x="20" y="30" font-size="2.5" fill="#58CC02" opacity="0.5" transform="rotate(-67,20,30)">steel</text> <!-- Aluminum (medium slope) --> <line x1="12" y1="66" x2="48" y2="18" stroke-width="0.8" stroke="#A5E86C" opacity="0.6"/> <text x="36" y="34" font-size="2.5" fill="#A5E86C" opacity="0.5" transform="rotate(-56,36,34)">aluminum</text> <!-- Polymer (gentle slope) --> <line x1="12" y1="66" x2="68" y2="30" stroke-width="0.8" stroke="#3B8700" opacity="0.4"/> <text x="52" y="44" font-size="2.5" fill="#3B8700" opacity="0.4" transform="rotate(-40,52,44)">polymer</text> <!-- E slope indicator on steel --> <line x1="16" y1="58" x2="26" y2="58" stroke-width="0.3" stroke="#3B8700" opacity="0.3"/> <line x1="26" y1="58" x2="26" y2="38" stroke-width="0.3" stroke="#3B8700" opacity="0.3"/> <text x="28" y="50" font-size="2.5" fill="#3B8700" opacity="0.35">E</text> <!-- Animated loading dot --> <circle r="2" fill="#58CC02" opacity="0.5"> <animate attributeName="cx" values="12;34;12" dur="3s" repeatCount="indefinite"/> <animate attributeName="cy" values="66;14;66" dur="3s" repeatCount="indefinite"/> </circle> <!-- Values --> <text x="60" y="10" font-size="2.5" fill="#58CC02" opacity="0.35">E_steel ≈ 200 GPa</text> <text x="60" y="16" font-size="2.5" fill="#A5E86C" opacity="0.35">E_Al ≈ 70 GPa</text> <!-- Formula --> <text x="50" y="62" font-size="3.5" fill="#58CC02" opacity="0.4" text-anchor="middle">E = σ/ε</text> </svg>',
          explanation: "At 700°C, creep is the dominant failure mechanism. The design stress must be based on creep rupture data, not short-term tensile properties.",
          hint: "At high temperature with sustained load."
        },
        {
          id: 'u7-L1-Q12',
          type: 'multiple-choice',
          question: "What is the primary difference between creep and stress relaxation?",
          options: [
            "Creep is a sudden failure while stress relaxation is gradual",
            "Creep occurs in metals",
            "Creep is increasing strain under constant stress,",
            "Stress relaxation only happens below the elastic limit",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><line x1="12" y1="10" x2="12" y2="65" stroke="#3B8700" stroke-width="1.5"/><line x1="12" y1="65" x2="75" y2="65" stroke="#3B8700" stroke-width="1.5"/><text x="6" y="40" font-size="3" fill="#3B8700" opacity="0.5" text-anchor="middle" transform="rotate(-90,6,40)">stress/strain</text><text x="45" y="74" font-size="3" fill="#3B8700" opacity="0.5" text-anchor="middle">time</text><path d="M15,55 Q25,55 35,50 Q50,42 65,38" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="68" y="36" font-size="3" fill="#58CC02" opacity="0.5">creep</text><path d="M15,25 Q25,25 35,30 Q50,38 65,42" stroke="#A5E86C" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/><text x="68" y="46" font-size="3" fill="#A5E86C" opacity="0.5">relax</text></svg>',
          explanation: "Creep: constant stress → increasing strain over time. Stress relaxation: constant strain → decreasing stress over time. Both are driven by thermally activated dislocation movement and diffusion.",
          hint: "One has constant stress with changing strain;"
        },
        {
          id: 'u7-L1b-T1',
          type: 'teaching',
          question: 'Surface Finish and Fatigue Life',
          explanation: 'Rough surfaces act like tiny stress concentrators that nucleate fatigue cracks. Shot peening introduces compressive residual stress, which fights back by closing surface cracks before they grow.',
          hint: 'A polished lab specimen always has a higher endurance limit than a real machined part.',
        },
        {
          id: 'u7-L1-Q13',
          type: 'fill-blank',
          question: "The Brinell hardness test uses a hardened steel or tungsten carbide ball pressed into the surface under heavy load. The hardness number is calculated from the load divided by the curved surface area of the _____.",
          blanks: ['indentation'],
          wordBank: ['indentation', 'specimen', 'penetrator', 'deformation', 'contact'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Specimen block --> <rect x="10" y="48" width="60" height="20" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="10" y="48" width="60" height="20" rx="3" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Ball indenter (animated push) --> <g> <animateTransform attributeName="transform" type="translate" dur="3s" repeatCount="indefinite" values="0,0;0,6;0,6;0,0" keyTimes="0;0.3;0.6;0.9" calcMode="spline" keySplines="0.3 0 0.7 1;0.5 0 0.5 1;0.3 0 0.7 1"/> <!-- Indenter body --> <rect x="36" y="10" width="8" height="20" rx="2" fill="#3B8700" opacity="0.3"/> <rect x="36" y="10" width="8" height="20" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Ball tip --> <circle cx="40" cy="38" r="8" fill="#3B8700" opacity="0.15"/> <circle cx="40" cy="38" r="8" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <!-- Force arrow --> <line x1="40" y1="4" x2="40" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/> <polygon points="38,8 40,11 42,8" fill="#3B8700" opacity="0.3"/> <text x="40" y="4" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.25" font-style="italic">F</text> <!-- Indentation mark --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.35;0.35;0" keyTimes="0;0.28;0.35;0.85;1" dur="3s" repeatCount="indefinite"/> <path d="M34,48 Q40,52 46,48" stroke="#3B8700" stroke-width="1" fill="none"/> <line x1="34" y1="54" x2="46" y2="54" stroke="#3B8700" stroke-width="0.6"/> <line x1="34" y1="52" x2="34" y2="56" stroke="#3B8700" stroke-width="0.6"/> <line x1="46" y1="52" x2="46" y2="56" stroke="#3B8700" stroke-width="0.6"/> <text x="40" y="59" text-anchor="middle" font-size="4" fill="#3B8700" font-style="italic">d</text> </g> <!-- Ball diameter label --> <text x="52" y="38" font-size="3.5" fill="#3B8700" opacity="0.3">D</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">HB = 2F/πD(D-sqrt(D²-d²))</text> </svg>',
          explanation: "Brinell hardness HB = 2P / (πD(D - √(D² - d²))), where P is the applied load, D is the ball diameter, and d is the diameter of the indentation. The denominator represents the curved surface area of the spherical impression.",
          hint: "The Brinell number uses the curved surface area of the."
        },
        {
          id: 'u7-L1-Q14',
          type: 'multiple-choice',
          question: "A high-cycle fatigue failure initiated at a machining mark on the surface of a hardened shaft. What surface treatment could have most effectively prevented this failure?",
          options: [
            "Electroplating with chrome for improved corrosion resistance",
            "Anodizing to increase the surface hardness of the part",
            "Painting the surface to seal out moisture",
            "Shot peening for compressive residual surface stresses",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="44" width="60" height="22" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <g opacity="0.4"> <circle cx="24" cy="36" r="2.5" fill="#3B8700" opacity="0.4"> <animate attributeName="cy" values="20;44" dur="1s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="30" r="2.5" fill="#3B8700" opacity="0.4"> <animate attributeName="cy" values="14;44" dur="1s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle cx="56" cy="34" r="2.5" fill="#3B8700" opacity="0.4"> <animate attributeName="cy" values="18;44" dur="1s" begin="0.6s" repeatCount="indefinite"/> </circle> </g> <path d="M12,44 Q20,42 28,44 Q36,42 44,44 Q52,42 60,44 Q68,42 70,44" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.3"/> <text x="40" y="58" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">compressive</text> <text x="40" y="64" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">residual stress</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">shot peening</text> </svg>',

          explanation: "Shot peening introduces compressive residual stresses in a thin surface layer. Since fatigue cracks initiate and grow under tensile stress, the compressive layer suppresses crack initiation at surface defects.",
          hint: "Fatigue cracks start at the surface under tension."
        },
        {
          id: 'u7-L1-Q15',
          type: 'multiple-choice',
          question: "An engineer compares two steels for a bridge. Steel A: YS = 250 MPa, Charpy = 100 J at -40°C. Steel B: YS = 500 MPa, Charpy = 20 J at -40°C. Which is more appropriate and why?",
          options: [
            "Steel B: higher yield strength means less material is needed",
            "Either steel is acceptable",
            "Steel A: much higher impact toughness at low temperature",
            "Steel B: 20 J impact energy is sufficient for any structural application",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Frame/support --> <line x1="40" y1="4" x2="40" y2="10" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.3"/> <!-- Pendulum arm + hammer (swinging) --> <g> <animateTransform attributeName="transform" type="rotate" dur="2.5s" repeatCount="indefinite" values="-60,40,10;30,40,10;10,40,10;-60,40,10" keyTimes="0;0.35;0.6;1" calcMode="spline" keySplines="0.2 0 0.8 1;0.4 0 0.6 1;0.3 0 0.7 1"/> <line x1="40" y1="10" x2="40" y2="52" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.4"/> <!-- Hammer head --> <rect x="34" y="50" width="12" height="8" rx="2" fill="#3B8700" opacity="0.4"/> <rect x="34" y="50" width="12" height="8" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <!-- Pivot --> <circle cx="40" cy="10" r="3" fill="#3B8700"/> <circle cx="40" cy="10" r="1.2" fill="white" opacity="0.3"/> <!-- Specimen on anvil (at lowest point of swing arc) --> <rect x="36" y="56" width="8" height="4" rx="1" fill="#58CC02" opacity="0.2"/> <rect x="36" y="56" width="8" height="4" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Anvil --> <rect x="28" y="60" width="24" height="6" rx="2" fill="#58CC02" opacity="0.12"/> <rect x="28" y="60" width="24" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Swing arc (dashed) --> <path d="M12,46 Q28,62 52,58 Q64,54 66,42" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="2,3" fill="none" opacity="0.12"/> <!-- Impact flash (at contact moment) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0;0" keyTimes="0;0.33;0.36;0.4;1" dur="2.5s" repeatCount="indefinite"/> <circle cx="40" cy="56" r="6" fill="#58CC02" opacity="0.3"/> <line x1="34" y1="52" x2="30" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> <line x1="46" y1="52" x2="50" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> </g> <!-- Height labels --> <text x="14" y="34" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₁</text> <text x="66" y="38" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₂</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">E = mg(h₁−h₂)</text> </svg>',
          explanation: "Bridge design must consider brittle fracture, especially in cold climates. A 20 J Charpy value at -40°C indicates the steel is near its DBTT and may fracture in a brittle manner under dynamic loading.",
          hint: "Bridges experience cold temperatures and dynamic loads."
        },
        {
          id: 'u7-L1b-SB1',
          type: 'sort-buckets',
          question: 'Sort these into the correct failure mechanism category',
          options: [
            'Beach marks on fracture surface',
            'Permanent bulging at 550 degrees C',
            'Sudden snap at -40 degrees C',
            'Crack growth under cyclic load',
            'Slow elongation over 10 years',
            'V-notch specimen shatters on impact'
          ],
          buckets: ['Fatigue', 'Creep / Brittle fracture'],
          correctBuckets: [0, 1, 1, 0, 1, 1],
          explanation: 'Beach marks and crack growth under cyclic load are fatigue indicators. Permanent bulging at high temperature and slow elongation are creep. Sudden snap at low temperature and V-notch shattering are brittle fracture.',
          hint: 'Fatigue involves repeated loading cycles. Creep involves high temperature and time.',
        },
        {
          id: 'u7-L1b-MP1',
          type: 'match-pairs',
          question: 'Match each surface treatment to its primary benefit',
          options: ['Shot peening', 'Carburizing', 'Chrome plating', 'Nitriding'],
          matchTargets: [
            'Compressive residual stress',
            'Hard carbon-rich case',
            'Corrosion resistance',
            'Hard nitrogen-rich surface'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Shot peening introduces compressive stress for fatigue resistance. Carburizing adds carbon for a hard case. Chrome plating resists corrosion. Nitriding diffuses nitrogen for surface hardness.',
          hint: 'Each treatment changes the surface in a different way.',
        },
        {
          id: 'u7-L1-Q16',
          type: 'true-false',
          question: "Aluminum alloys have a true endurance limit like carbon steels.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><line x1="12" y1="10" x2="12" y2="65" stroke="#3B8700" stroke-width="1.5"/><line x1="12" y1="65" x2="75" y2="65" stroke="#3B8700" stroke-width="1.5"/><text x="6" y="40" font-size="3" fill="#3B8700" opacity="0.5" text-anchor="middle" transform="rotate(-90,6,40)">S (MPa)</text><text x="45" y="74" font-size="3" fill="#3B8700" opacity="0.5" text-anchor="middle">log N</text><path d="M18,20 Q30,22 40,35 Q48,44 55,48 L70,48" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="68" y="45" font-size="3" fill="#58CC02" opacity="0.5">S_e</text><text x="55" y="56" font-size="2.5" fill="#3B8700" opacity="0.3">steel</text><path d="M18,22 Q30,25 40,38 Q48,48 70,58" stroke="#A5E86C" stroke-width="1.2" fill="none" stroke-dasharray="3,2"/><text x="55" y="62" font-size="2.5" fill="#A5E86C" opacity="0.4">Al (no limit)</text></svg>',
          explanation: "Unlike ferrous metals and titanium, aluminum alloys do NOT exhibit a true endurance limit. The S-N curve continues to slope downward.",
          hint: "Does the S-N curve for aluminum flatten out to a."
        },
        {
          id: 'u7-L1-Q17',
          type: 'multiple-choice',
          question: "What does the area under the stress-strain curve up to fracture represent?",
          options: [
            "The elastic modulus of the material: not the primary mechanism here",
            "The toughness: total energy per unit volume before fracture",
            "The yield strength times the elongation",
            "The resilience: the elastic energy stored in the material",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve — animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker — appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker — appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker — appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot — follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: "The total area under the stress-strain curve represents toughness, energy absorption capacity per unit volume (units: J/m³). A material can be strong but brittle or weak but ductile.",
          hint: "The integral of stress with respect to strain has units."
        },
        {
          id: 'u7-L1-Q18',
          type: 'multiple-choice',
          question: "A creep test at 600°C shows three distinct stages. In which stage does the creep rate reach a minimum and remain approximately constant?",
          options: [
            "Primary (transient) creep",
            "The elastic region before creep begins",
            "Tertiary creep",
            "Secondary (steady-state) creep",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,63.5 74,66.5 76,65" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="76" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">time</text> <text x="6" y="36" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">ε</text> <!-- Creep curve: instantaneous → primary → secondary (steady) → tertiary → rupture --> <path d="M12,58 L14,42 Q18,36 24,34 L46,28 Q56,24 62,18 L66,12" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"> <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Region separators (dashed verticals) --> <line x1="18" y1="36" x2="18" y2="65" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2.5" opacity="0"> <animate attributeName="opacity" values="0;0;0.15;0.15;0" keyTimes="0;0.1;0.15;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <line x1="50" y1="26" x2="50" y2="65" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2.5" opacity="0"> <animate attributeName="opacity" values="0;0;0.15;0.15;0" keyTimes="0;0.38;0.42;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Region labels --> <text x="12" y="72" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.06;0.1;0.82;1" dur="6s" repeatCount="indefinite"/>I</text> <text x="32" y="72" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.18;0.22;0.82;1" dur="6s" repeatCount="indefinite"/>II (steady)</text> <text x="58" y="72" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.42;0.46;0.82;1" dur="6s" repeatCount="indefinite"/>III</text> <!-- Rupture X --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.5;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="63" y1="9" x2="69" y2="15" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="69" y1="9" x2="63" y2="15" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> </g> <!-- Tracing dot --> <circle r="3" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,58 L14,42 Q18,36 24,34 L46,28 Q56,24 62,18 L66,12" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Secondary creep (Stage II) has a constant, minimum creep rate because strain hardening is balanced by thermally activated recovery. Primary creep shows a decreasing rate, and tertiary creep shows an accelerating rate due to necking, void formation, and microstructural degradation.",
          hint: "In which stage is there a balance between work."
        },
        {
          id: 'u7-L1-Q19',
          type: 'multiple-choice',
          question: "What is the key difference between a Charpy and an Izod impact test?",
          options: [
            "Charpy uses a V-notch and Izod uses no notch at all",
            "Charpy: simply supported beam struck behind the notch",
            "Charpy is for metals only, while Izod is for plastics only",
            "Charpy measures energy absorbed during the fracture event",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Frame/support --> <line x1="40" y1="4" x2="40" y2="10" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.3"/> <!-- Pendulum arm + hammer (swinging) --> <g> <animateTransform attributeName="transform" type="rotate" dur="2.5s" repeatCount="indefinite" values="-60,40,10;30,40,10;10,40,10;-60,40,10" keyTimes="0;0.35;0.6;1" calcMode="spline" keySplines="0.2 0 0.8 1;0.4 0 0.6 1;0.3 0 0.7 1"/> <line x1="40" y1="10" x2="40" y2="52" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.4"/> <!-- Hammer head --> <rect x="34" y="50" width="12" height="8" rx="2" fill="#3B8700" opacity="0.4"/> <rect x="34" y="50" width="12" height="8" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <!-- Pivot --> <circle cx="40" cy="10" r="3" fill="#3B8700"/> <circle cx="40" cy="10" r="1.2" fill="white" opacity="0.3"/> <!-- Specimen on anvil (at lowest point of swing arc) --> <rect x="36" y="56" width="8" height="4" rx="1" fill="#58CC02" opacity="0.2"/> <rect x="36" y="56" width="8" height="4" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Anvil --> <rect x="28" y="60" width="24" height="6" rx="2" fill="#58CC02" opacity="0.12"/> <rect x="28" y="60" width="24" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Swing arc (dashed) --> <path d="M12,46 Q28,62 52,58 Q64,54 66,42" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="2,3" fill="none" opacity="0.12"/> <!-- Impact flash (at contact moment) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0;0" keyTimes="0;0.33;0.36;0.4;1" dur="2.5s" repeatCount="indefinite"/> <circle cx="40" cy="56" r="6" fill="#58CC02" opacity="0.3"/> <line x1="34" y1="52" x2="30" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> <line x1="46" y1="52" x2="50" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> </g> <!-- Height labels --> <text x="14" y="34" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₁</text> <text x="66" y="38" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₂</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">E = mg(h₁−h₂)</text> </svg>',
          explanation: "Both tests measure energy absorbed during fracture using a pendulum. Charpy is dominant in metals testing (ASTM E23), while Izod is more common for plastics (ASTM D256).",
          hint: "how the specimen is held, one is a beam.",
        },
      ]
    },
    {
      id: 'u7-L1c',
      title: 'Fracture and Toughness',
      description: 'Fracture toughness K_IC, impact testing, material selection.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u7-L1c-EZ1',
          type: 'true-false',
          question: 'Higher fracture toughness (K_IC) means a material is better at resisting crack growth.',
          correctAnswer: true,
          explanation: 'Yes. K_IC measures resistance to crack propagation. Higher is better.',
          hint: 'Toughness and crack resistance go together.',
        },
        {
          id: 'u7-L1-Q20',
          type: 'true-false',
          question: "Modulus of resilience = area under the curve up to fracture.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve — animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker — appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker — appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker — appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot — follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: "The modulus of resilience is the area under the stress-strain curve up to the YIELD POINT, not fracture. It represents the maximum elastic energy per unit volume a material can absorb without permanent deformation.",
          hint: "Resilience is about elastic energy storage."
        },
        {
          id: 'u7-L1-Q21',
          type: 'multiple-choice',
          question: "Pressure vessel at -196°C (liquid nitrogen). Best material choice?",
          options: [
            "ASTM A36 structural carbon steel",
            "AISI 4340 quenched and tempered alloy steel",
            "Austenitic stainless steel (304L) or 9% nickel steel",
            "Gray cast iron: high compressive strength, valid for textbook problems but misleading for real-world applications",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Support anvil --> <rect x="24" y="48" width="32" height="6" rx="1" stroke-width="0.7" stroke="#58CC02" fill="#58CC02" fill-opacity="0.06"/> <!-- Support spans --> <rect x="26" y="44" width="4" height="4" rx="0.5" stroke-width="0.5" stroke="#58CC02" fill="none"/> <rect x="50" y="44" width="4" height="4" rx="0.5" stroke-width="0.5" stroke="#58CC02" fill="none"/> <!-- Specimen (notched bar) --> <rect x="28" y="40" width="24" height="4" rx="0.3" stroke-width="0.6" stroke="#58CC02" fill="#58CC02" fill-opacity="0.05"/> <!-- V-notch --> <path d="M39,40 L40,42 L41,40" stroke-width="0.5" stroke="#A5E86C"/> <!-- Pendulum arm --> <g> <line x1="40" y1="10" x2="40" y2="40" stroke-width="0.8" stroke="#58CC02"/> <!-- Hammer head --> <rect x="36" y="36" width="8" height="5" rx="1" stroke-width="0.6" stroke="#58CC02" fill="#58CC02" fill-opacity="0.08"/> <animateTransform attributeName="transform" type="rotate" values="-60,40,10;0,40,10;40,40,10;0,40,10;-60,40,10" dur="4s" repeatCount="indefinite" keyTimes="0;0.25;0.5;0.75;1"/> </g> <!-- Pivot point --> <circle cx="40" cy="10" r="2" stroke-width="0.5" stroke="#58CC02" fill="#58CC02" fill-opacity="0.1"/> <!-- Angle scale arc --> <path d="M20,10 A20,20 0 0,1 60,10" stroke-width="0.3" stroke="#3B8700" opacity="0.2" fill="none"/> <!-- Angle markings --> <g stroke="#3B8700" stroke-width="0.2" opacity="0.2"> <line x1="20" y1="10" x2="22" y2="12"/><line x1="28" y1="4" x2="29" y2="7"/> <line x1="40" y1="2" x2="40" y2="5"/><line x1="52" y1="4" x2="51" y2="7"/> <line x1="60" y1="10" x2="58" y2="12"/> </g> <!-- Height labels --> <text x="14" y="28" font-size="3" fill="#3B8700" opacity="0.4">h₁</text> <text x="62" y="28" font-size="3" fill="#3B8700" opacity="0.4">h₂</text> <!-- Energy formula --> <text x="40" y="62" font-size="3.5" fill="#58CC02" opacity="0.4" text-anchor="middle">E = mg(h₁−h₂)</text> <!-- Ground --> <line x1="10" y1="54" x2="70" y2="54" stroke-width="0.4" stroke="#58CC02" opacity="0.2"/> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">impact toughness</text> </svg>',
          explanation: "At -196°C, BCC metals become dangerously brittle below their DBTT. FCC metals retain excellent toughness at cryogenic temperatures.",
          hint: "Crystal structure remains ductile at extremely low."
        },
        {
          id: 'u7-L1-Q22',
          type: 'multiple-choice',
          question: "A Brinell hardness test on gray cast iron yields HB = 200. Using the relationship UTS ≈ 3.45 × HB (MPa), can you reliably estimate the UTS of the cast iron?",
          options: [
            "Yes. UTS ≈ 690 MPa, this correlation is valid for all metals",
            "No. HB-UTS correlation is for steels only, not cast iron",
            "Yes, but multiply by 0.5 to account for carbon content",
            "No. Brinell hardness tests are invalid for all cast iron",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Test specimen (block) --> <rect x="10" y="42" width="60" height="24" rx="1" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.04"/> <!-- Indenter (ball) --> <circle cx="40" cy="36" r="8" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.06"> <animate attributeName="cy" values="30;40;30" dur="3s" repeatCount="indefinite"/> </circle> <!-- Indentation (depression in specimen) --> <path d="M34,42 Q40,48 46,42" stroke-width="0.6" stroke="#A5E86C" fill="none" opacity="0.5"> <animate attributeName="d" values="M37,42 Q40,43 43,42;M34,42 Q40,48 46,42;M37,42 Q40,43 43,42" dur="3s" repeatCount="indefinite"/> </path> <!-- Load arrow --> <g opacity="0.5"> <line x1="40" y1="6" x2="40" y2="20" stroke-width="0.7" stroke="#58CC02"/> <polygon points="38.5,20 41.5,20 40,23" fill="#58CC02"/> <text x="45" y="12" font-size="3.5" fill="#58CC02">F</text> </g> <!-- Indenter shaft --> <rect x="38" y="8" width="4" height="20" rx="0.5" stroke-width="0.5" stroke="#58CC02" fill="none"> <animate attributeName="height" values="14;24;14" dur="3s" repeatCount="indefinite"/> </rect> <!-- Diameter measurement --> <line x1="34" y1="54" x2="46" y2="54" stroke-width="0.4" stroke="#3B8700" opacity="0.4"/> <line x1="34" y1="52" x2="34" y2="56" stroke-width="0.4" stroke="#3B8700" opacity="0.4"/> <line x1="46" y1="52" x2="46" y2="56" stroke-width="0.4" stroke="#3B8700" opacity="0.4"/> <text x="40" y="59" font-size="3" fill="#3B8700" opacity="0.4" text-anchor="middle">d</text> <!-- Ball diameter label --> <text x="52" y="36" font-size="3" fill="#3B8700" opacity="0.4">D=10mm</text> <!-- Formula --> <text x="40" y="74" font-size="3.5" fill="#58CC02" opacity="0.4" text-anchor="middle">BHN = 2F / πD(D−√(D²−d²))</text> </svg>',
          explanation: "The 3.45 × HB correlation is specific to wrought carbon and alloy steels. Gray cast iron contains graphite flakes that act as internal stress concentrators under tension, drastically reducing tensile strength, but have minimal effect on hardness.",
          hint: "Hardness is a localized compressive measurement."
        },
        {
          id: 'u7-L1c-T1',
          type: 'teaching',
          question: 'Choosing Materials by Temperature',
          explanation: 'BCC metals (carbon steel) become brittle below their DBTT. FCC metals (stainless steel, aluminum) stay ductile even at cryogenic temperatures. For high-temperature service, creep rupture data governs the design, not room-temperature strength.',
          hint: 'Try this now: think about which crystal structure you would pick for a liquid nitrogen tank.',
        },
        {
          id: 'u7-L1-Q23',
          type: 'fill-blank',
          question: "The _____ offset method is used to determine the _____ strength of materials that do not exhibit a clear yield point. A line is drawn parallel to the elastic region, offset by a specific strain value.",
          blanks: ['0.2%', 'yield'],
          wordBank: ['0.2%', 'yield', '0.5%', 'tensile', 'fracture', '1.0%'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Left half — grip + shoulder + gauge end --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <!-- Right half (mirror) --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <!-- Gauge section (necks then fractures) --> <path fill="#58CC02" opacity="0.1"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> </path> <path stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.5"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> <animate attributeName="opacity" values="0.5;0.5;0.5;0;0;0.5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </path> <!-- Necking stress concentration zone --> <ellipse cx="40" cy="40" rx="8" ry="5" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.1;0.18;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="ry" values="5;5;3;1;1;5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </ellipse> <!-- Gauge length marks (spread apart during test) --> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <!-- Gauge length bracket --> <line y1="30" y2="30" stroke="#3B8700" stroke-width="0.5" opacity="0.15"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <text x="40" y="28" text-anchor="middle" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">L₀</text> <!-- Fracture flash (X mark) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0;0.7;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.68;0.71;0.73;0.8;1"/> <line x1="37" y1="36" x2="43" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> <line x1="43" y1="36" x2="37" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> </g> <!-- Force arrows (pull apart) --> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="14,40 9,37 9,43;8,40 3,37 3,43;2,40 -3,37 -3,43;0,40 -5,37 -5,43;0,40 -5,37 -5,43;14,40 9,37 9,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="66,40 71,37 71,43;72,40 77,37 77,43;78,40 83,37 83,43;80,40 85,37 85,43;80,40 85,37 85,43;66,40 71,37 71,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <!-- F labels near arrows --> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="10;5;0;0;0;10" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="70;75;80;80;80;70" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> </svg>',
          explanation: "Many materials transition gradually from elastic to plastic behavior without a distinct yield point. The 0.2% offset method draws a line from 0.2% strain (0.002 mm/mm) parallel to the initial linear portion of the curve.",
          hint: "This is a standard method defined in ASTM E8 for."
        },
        {
          id: 'u7-L1-Q24',
          type: 'multiple-choice',
          question: "What factor most reduces a component's endurance limit vs a polished lab specimen?",
          options: [
            "The color of the component, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
            "Surface finish: rough machining marks act as stress concentrators that initiate fatigue cracks",
            "The speed of the applied cycling: faster cycling always reduces endurance limit",
            "Ambient humidity: water molecules weaken metallic bonds",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,63.5 74,66.5 76,65" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="76" text-anchor="middle" font-size="5.5" fill="#3B8700" opacity="0.3" font-style="italic">log N</text> <text x="6" y="36" text-anchor="middle" font-size="5.5" fill="#3B8700" opacity="0.3" font-style="italic">S</text> <!-- S-N curve (animated draw) --> <path d="M16,14 Q24,16 32,26 Q40,36 48,42 Q56,46 68,48" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="90" stroke-dashoffset="90"> <animate attributeName="stroke-dashoffset" values="90;0;0;90" keyTimes="0;0.5;0.8;1" dur="5s" repeatCount="indefinite"/> </path> <!-- Endurance limit line (horizontal asymptote) --> <line x1="48" y1="48" x2="74" y2="48" stroke="#A5E86C" stroke-width="1" stroke-dasharray="2,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.4;0.5;0.8;1" dur="5s" repeatCount="indefinite"/> </line> <text x="72" y="44" font-size="4" fill="#3B8700" opacity="0" font-style="italic"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.4;0.5;0.8;1" dur="5s" repeatCount="indefinite"/> S_e </text> <!-- Tracing dot --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="5s" repeatCount="indefinite" path="M16,14 Q24,16 32,26 Q40,36 48,42 Q56,46 68,48" keyPoints="0;1;1;0" keyTimes="0;0.5;0.8;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.51;1" dur="5s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.4"> <animateMotion dur="5s" repeatCount="indefinite" path="M16,14 Q24,16 32,26 Q40,36 48,42 Q56,46 68,48" keyPoints="0;1;1;0" keyTimes="0;0.5;0.8;1" calcMode="linear"/> <animate attributeName="opacity" values="0.4;0.4;0;0" keyTimes="0;0.5;0.51;1" dur="5s" repeatCount="indefinite"/> </circle> <!-- Region labels --> <text x="24" y="60" font-size="3.5" fill="#3B8700" opacity="0.15">LCF</text> <text x="56" y="60" font-size="3.5" fill="#3B8700" opacity="0.15">HCF</text> </svg>',
          explanation: "Surface finish typically has the largest impact among the Marin modification factors. A rough-machined surface can reduce the endurance limit by 40-60% compared to a polished specimen, because machining marks act as micro-notches where fatigue cracks nucleate.",
          hint: "The Marin factors.",
        },
        {
          id: 'u7-L1-Q25',
          type: 'true-false',
          question: "Poisson's ratio of a perfectly incompressible material (like rubber under small strains) is 0.5, meaning it conserves volume exactly during elastic deformation.",
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><rect x="25" y="20" width="30" height="40" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/><rect x="28" y="15" width="24" height="50" rx="1" fill="none" stroke="#A5E86C" stroke-width="1" stroke-dasharray="3,2" opacity="0.4"/><line x1="40" y1="8" x2="40" y2="15" stroke="#3B8700" stroke-width="1" opacity="0.5"/><polygon points="38,10 40,6 42,10" fill="#3B8700" opacity="0.5"/><line x1="40" y1="60" x2="40" y2="68" stroke="#3B8700" stroke-width="1" opacity="0.5"/><polygon points="38,66 40,70 42,66" fill="#3B8700" opacity="0.5"/><line x1="25" y1="40" x2="20" y2="40" stroke="#A5E86C" stroke-width="0.8" opacity="0.4"/><polygon points="22,38.5 18,40 22,41.5" fill="#A5E86C" opacity="0.4"/><line x1="55" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="0.8" opacity="0.4"/><polygon points="58,38.5 62,40 58,41.5" fill="#A5E86C" opacity="0.4"/><text x="12" y="38" font-size="3" fill="#A5E86C" opacity="0.5">e_lat</text><text x="45" y="8" font-size="3" fill="#3B8700" opacity="0.5">e_ax</text><text x="40" y="78" text-anchor="middle" font-size="3" fill="#58CC02" opacity="0.4">nu = -e_lat/e_ax</text></svg>',
          explanation: "Poisson's ratio (ν) relates lateral contraction to axial extension. For volume conservation: ν = 0.5. Most metals have ν = 0.25-0.35 (steel ~0.3, aluminum ~0.33).",
          hint: "If a material conserves volume perfectly when stretched."
        },
        {
          id: 'u7-L1c-SB1',
          type: 'sort-buckets',
          question: 'Sort these materials by crystal structure',
          options: ['Carbon steel', 'Aluminum', 'Ferritic stainless', 'Austenitic stainless', 'Copper', 'Chromium'],
          buckets: ['BCC', 'FCC'],
          correctBuckets: [0, 1, 0, 1, 1, 0],
          explanation: 'Carbon steel, ferritic stainless, and chromium are BCC. Aluminum, austenitic stainless, and copper are FCC. BCC metals show a ductile-to-brittle transition. FCC metals do not.',
          hint: 'Think about which metals stay ductile at low temperatures.',
        },
        {
          id: 'u7-L1c-OS1',
          type: 'order-steps',
          question: 'Order these materials by elastic modulus, highest to lowest',
          steps: ['Steel (~200 GPa)', 'Copper (~120 GPa)', 'Titanium (~110 GPa)', 'Aluminum (~70 GPa)'],
          correctOrder: [0, 1, 2, 3],
          explanation: 'Steel has the highest E at ~200 GPa, followed by copper ~120, titanium ~110, and aluminum ~70 GPa. Elastic modulus depends on atomic bonding, not heat treatment.',
          hint: 'Steel is the stiffest common engineering metal.',
        },
        {
          id: 'u7-L1-Q26',
          type: 'multiple-choice',
          question: "A leaf spring made of 5160 steel snapped in service. Fractographic examination shows ratchet marks at multiple initiation sites on the tension surface. What do multiple initiation sites indicate?",
          options: [
            "The spring was subjected to a single severe overload",
            "The spring had a manufacturing defect",
            "The spring failed by hydrogen embrittlement",
            "Stress amplitude was high relative to endurance limit",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Material plate --> <rect x="6" y="20" width="68" height="40" rx="6" fill="#58CC02" opacity="0.06"/> <rect x="6" y="20" width="68" height="40" rx="6" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Initial edge notch (V-shape stress riser) --> <path d="M6,37 L13,40 L6,43" stroke="#3B8700" stroke-width="1.2" fill="none" opacity="0.25"/> <!-- Crack opening displacement wedge (widens behind tip) --> <path fill="#3B8700" opacity="0"> <animate attributeName="d" values="M6,40 L6,40 L6,40 L6,40 Z;M6,38 L55,39.7 L55,40.3 L6,42 Z;M6,40 L6,40 L6,40 L6,40 Z" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.12;0" dur="4s" repeatCount="indefinite"/> </path> <!-- Main crack line (propagates from notch) --> <line y1="40" x1="12" y2="40" stroke="#3B8700" stroke-width="2" stroke-linecap="round"> <animate attributeName="x2" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> </line> <!-- Crack tip plastic zone (stress intensity) --> <circle cy="40" r="4" fill="#58CC02" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.2;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="3;7;3" dur="4s" repeatCount="indefinite"/> </circle> <!-- Inner yield zone (smaller, darker) --> <circle cy="40" r="2" fill="#3B8700" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.15;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite"/> </circle> <!-- Microcracks — branch up and down as main crack passes --> <line x1="24" y1="40" x2="27" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.25;0.3;0.8;1"/> </line> <line x1="24" y1="40" x2="21" y2="46" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.27;0.32;0.8;1"/> </line> <line x1="37" y1="40" x2="40" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.42;0.47;0.8;1"/> </line> <line x1="37" y1="40" x2="34" y2="47" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.44;0.49;0.8;1"/> </line> <line x1="48" y1="40" x2="51" y2="35" stroke="#A5E86C" stroke-width="0.7" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.58;0.63;0.8;1"/> </line> <!-- Tensile stress arrows (Mode I — opening) --> <!-- Top arrows (2) pulling up --> <line x1="28" y1="16" x2="28" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,16 28,13 29.5,16" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="16" x2="52" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,16 52,13 53.5,16" fill="#3B8700" opacity="0.2"/> <!-- Bottom arrows (2) pulling down --> <line x1="28" y1="60" x2="28" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,64 28,67 29.5,64" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="60" x2="52" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,64 52,67 53.5,64" fill="#3B8700" opacity="0.2"/> <!-- Stress label --> <text x="40" y="11" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> <text x="40" y="73" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> </svg>',
          explanation: "Multiple initiation sites suggest high stress amplitude. At low stress, typically only one crack dominates.",
          hint: "Ratchet marks indicate where multiple cracks growing on."
        },
        {
          id: 'u7-L1-Q27',
          type: 'multiple-choice',
          question: "How does a stress-rupture test differ from a standard creep test?",
          options: [
            "A stress-rupture test measures elastic modulus at high temperature",
            "Stress-rupture runs to fracture, recording time-to-failure",
            "They are identical tests with different names",
            "Stress-rupture tests are at room temperature",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><line x1="12" y1="10" x2="12" y2="65" stroke="#3B8700" stroke-width="1.5"/><line x1="12" y1="65" x2="75" y2="65" stroke="#3B8700" stroke-width="1.5"/><text x="6" y="40" font-size="3" fill="#3B8700" opacity="0.5" text-anchor="middle" transform="rotate(-90,6,40)">log stress</text><text x="45" y="74" font-size="3" fill="#3B8700" opacity="0.5" text-anchor="middle">log t_rupture</text><path d="M18,20 Q35,30 50,42 Q60,50 68,58" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="55" y="38" font-size="3" fill="#3B8700" opacity="0.4">T1</text><path d="M18,28 Q35,38 50,48 Q60,55 68,62" stroke="#A5E86C" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/><text x="55" y="48" font-size="3" fill="#3B8700" opacity="0.4">T2</text></svg>',
          explanation: "A stress-rupture test loads the specimen at constant stress and elevated temperature until fracture, recording rupture time. A creep test may run to fracture but is often interrupted to measure minimum creep rate.",
          hint: "One test focuses on when the specimen breaks;"
        },
        {
          id: 'u7-L1-Q28',
          type: 'multiple-choice',
          question: "A hardness traverse across a case-carburized gear tooth shows 60 HRC at the surface dropping to 30 HRC at the core. Why is this gradient desirable?",
          options: [
            "It makes the gear lighter",
            "The gradient ensures the gear runs more quietly",
            "The hard surface resists wear and contact fatigue,",
            "The soft core conducts heat better, keeping the gear cool",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"><line x1="12" y1="10" x2="12" y2="65" stroke="#3B8700" stroke-width="1.5"/><line x1="12" y1="65" x2="75" y2="65" stroke="#3B8700" stroke-width="1.5"/><text x="6" y="40" font-size="3" fill="#3B8700" opacity="0.5" text-anchor="middle" transform="rotate(-90,6,40)">HRC</text><text x="45" y="74" font-size="3" fill="#3B8700" opacity="0.5" text-anchor="middle">depth</text><path d="M18,18 Q25,20 32,35 Q40,50 55,55 Q65,58 70,58" stroke="#58CC02" stroke-width="1.5" fill="none"/><text x="20" y="14" font-size="3" fill="#58CC02" opacity="0.5">60 HRC</text><text x="62" y="54" font-size="3" fill="#3B8700" opacity="0.5">30 HRC</text><text x="35" y="30" font-size="3" fill="#3B8700" opacity="0.3">case</text><text x="55" y="48" font-size="3" fill="#3B8700" opacity="0.3">core</text></svg>',
          explanation: "Gears experience surface failures and root failures (bending fatigue). A hard case (58-62 HRC) provides wear and pitting resistance, while the tough core (28-35 HRC) provides bending fatigue resistance and impact toughness.",
          hint: "Gears need to resist two things: surface wear from."
        },
        {
          id: 'u7-L1-Q29',
          type: 'true-false',
          question: "K_IC generally increases with increasing yield strength.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Material plate --> <rect x="6" y="20" width="68" height="40" rx="6" fill="#58CC02" opacity="0.06"/> <rect x="6" y="20" width="68" height="40" rx="6" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Initial edge notch (V-shape stress riser) --> <path d="M6,37 L13,40 L6,43" stroke="#3B8700" stroke-width="1.2" fill="none" opacity="0.25"/> <!-- Crack opening displacement wedge (widens behind tip) --> <path fill="#3B8700" opacity="0"> <animate attributeName="d" values="M6,40 L6,40 L6,40 L6,40 Z;M6,38 L55,39.7 L55,40.3 L6,42 Z;M6,40 L6,40 L6,40 L6,40 Z" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.12;0" dur="4s" repeatCount="indefinite"/> </path> <!-- Main crack line (propagates from notch) --> <line y1="40" x1="12" y2="40" stroke="#3B8700" stroke-width="2" stroke-linecap="round"> <animate attributeName="x2" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> </line> <!-- Crack tip plastic zone (stress intensity) --> <circle cy="40" r="4" fill="#58CC02" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.2;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="3;7;3" dur="4s" repeatCount="indefinite"/> </circle> <!-- Inner yield zone (smaller, darker) --> <circle cy="40" r="2" fill="#3B8700" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.15;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite"/> </circle> <!-- Microcracks — branch up and down as main crack passes --> <line x1="24" y1="40" x2="27" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.25;0.3;0.8;1"/> </line> <line x1="24" y1="40" x2="21" y2="46" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.27;0.32;0.8;1"/> </line> <line x1="37" y1="40" x2="40" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.42;0.47;0.8;1"/> </line> <line x1="37" y1="40" x2="34" y2="47" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.44;0.49;0.8;1"/> </line> <line x1="48" y1="40" x2="51" y2="35" stroke="#A5E86C" stroke-width="0.7" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.58;0.63;0.8;1"/> </line> <!-- Tensile stress arrows (Mode I — opening) --> <!-- Top arrows (2) pulling up --> <line x1="28" y1="16" x2="28" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,16 28,13 29.5,16" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="16" x2="52" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,16 52,13 53.5,16" fill="#3B8700" opacity="0.2"/> <!-- Bottom arrows (2) pulling down --> <line x1="28" y1="60" x2="28" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,64 28,67 29.5,64" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="60" x2="52" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,64 52,67 53.5,64" fill="#3B8700" opacity="0.2"/> <!-- Stress label --> <text x="40" y="11" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> <text x="40" y="73" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> </svg>',
          explanation: "Fracture toughness generally DECREASES with increasing yield strength. Higher yield strength reduces the ability to plastically deform at the crack tip, making the material more susceptible to brittle fracture.",
          hint: "As a material gets harder and stronger."
        },
        {
          id: 'u7-L1-Q30',
          type: 'fill-blank',
          question: "The critical value of stress intensity factor at which a crack propagates unstably under plane strain conditions is called K_____ (the plane-strain fracture toughness).",
          blanks: ['IC'],
          wordBank: ['IC', 'IIC', 'max', 'eff', 'th'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"><rect x="15" y="20" width="50" height="40" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/><line x1="15" y1="40" x2="30" y2="40" stroke="#3B8700" stroke-width="2"/><path d="M30,40 L35,36 L33,40 L35,44 Z" fill="#3B8700" opacity="0.4"/><text x="22" y="38" font-size="3" fill="#3B8700" opacity="0.5">a</text><line x1="40" y1="12" x2="40" y2="20" stroke="#3B8700" stroke-width="1" opacity="0.5"/><polygon points="38,14 40,10 42,14" fill="#3B8700" opacity="0.5"/><line x1="40" y1="60" x2="40" y2="68" stroke="#3B8700" stroke-width="1" opacity="0.5"/><polygon points="38,66 40,70 42,66" fill="#3B8700" opacity="0.5"/><text x="44" y="14" font-size="3" fill="#3B8700" opacity="0.5">sigma</text><text x="40" y="78" text-anchor="middle" font-size="3" fill="#58CC02" opacity="0.4">K_IC = sigma sqrt(pi a)</text></svg>',
          explanation: "K_IC is a material property defining the critical stress intensity factor for unstable crack propagation under Mode I (opening) loading in plane strain. It is measured per ASTM E399.7 MPa√m.",
          hint: "The subscript combines the loading mode (I = opening)."
        },
      ]
    },
    {
      id: 'u7-L2',
      title: 'Iron-Carbon Diagram',
      description: 'Phases, eutectoid reaction, carbon solubility limits.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u7-L2-T1',
          type: 'teaching',
          question: 'The Iron-Carbon Phase Diagram',
          explanation: 'The iron-carbon diagram is the roadmap for steel heat treatment. It shows which phases (ferrite, austenite, cementite) exist at each temperature and carbon content. The key point is the eutectoid at 0.8% C and 727 degrees C, where austenite transforms into pearlite (a layered mix of ferrite and cementite).',
          hint: 'Steels below 0.8% C are hypoeutectoid. Above 0.8% C are hypereutectoid.',
        },
        {
          id: 'u7-L2-EZ1',
          type: 'true-false',
          question: 'The iron-carbon phase diagram shows which phases exist at different temperatures and carbon contents.',
          correctAnswer: true,
          explanation: 'Exactly. The phase diagram is the roadmap for understanding steel microstructures.',
          hint: 'Phase diagrams map temperature vs composition.',
        },
        {
          id: 'u7-L2-Q1',
          type: 'multiple-choice',
          question: 'Why can austenite (FCC iron) dissolve much more carbon than ferrite (BCC iron)?',
          options: [
            'FCC has larger atoms that can bond with more carbon atoms chemically',
            'FCC has larger interstitial sites \u2014 less lattice distortion for carbon',
            'BCC is a more tightly packed structure with no interstitial sites at all',
            'FCC is a higher-temperature phase with weaker bonds',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'FCC iron has larger octahedral interstitial sites (radius ratio ~0.41R) compared to BCC. Although BCC actually has more total interstitial sites, they are all smaller and highly asymmetric.',
          hint: 'The interstitial site sizes in FCC vs.',
                },
        {
          id: 'u7-L2-Q2',
          type: 'multiple-choice',
          question: '1045 steel quenched then tempered at 400°C. Purpose of tempering?',
          options: [
            'To dissolve all cementite (Fe\u2083C) into the austenite phase',
            'To transform any retained austenite into martensite phase',
            'Reduce martensite brittleness via carbide precipitation',
            'To increase hardness beyond what quenching achieved',
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'Tempering relieves internal stresses in the supersaturated martensite and allows carbon to diffuse out, forming fine carbide precipitates (tempered martensite). Higher tempering temperatures give lower hardness but better toughness.',
          hint: 'As-quenched martensite is very hard but extremely brittle.'
                },
        {
          id: 'u7-L2-Q3',
          type: 'true-false',
          question: 'The eutectoid composition of the Fe-C system is 0.8 wt% carbon at 727°C',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'At 0.8 wt% C and 727°C, the eutectoid reaction occurs: austenite → ferrite + cementite (Fe₃C). The resulting lamellar microstructure is called pearlite due to its pearl-like appearance under the microscope.',
          hint: 'The eutectoid point is where austenite transforms.'
                },
        {
          id: 'u7-L2-T1b',
          type: 'teaching',
          question: 'Steels vs Cast Irons',
          explanation: 'Steels have less than 2.14% carbon. Cast irons have more. That boundary matters because above 2.14% C, a eutectic reaction forms at 1147 degrees C, lowering the melting point and making the alloy easy to cast.',
          hint: 'Cast irons are cheap to cast but brittle in tension due to graphite flakes (gray) or nodules (ductile).',
        },
        {
          id: 'u7-L2-Q4',
          type: 'multiple-choice',
          question: 'A machinist quenched a 1045 steel part in water and achieved full hardness, but when the same procedure was used on a larger part of the same steel, the core remained soft. What is the metallurgical explanation?',
          options: [
            'Carbon concentration varies between surface and core in the larger part',
            'The larger part\'s core could not cool fast enough to bypass the TTT nose',
            'Water quenching only works on small parts, oil is needed for larger sections',
            'The furnace could not heat the larger part uniformly',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <text x="44" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">distance from surface</text> <text x="6" y="36" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">HRC</text> <!-- Small part curve (stays hard throughout) --> <path d="M16,14 Q30,16 44,18 Q58,20 68,22" stroke="#58CC02" stroke-width="2" fill="none"/> <text x="70" y="20" font-size="3" fill="#58CC02" opacity="0.5">small</text> <!-- Large part curve (hard surface, soft core) --> <path d="M16,14 Q24,20 32,38 Q40,50 50,55 Q60,58 68,58" stroke="#A5E86C" stroke-width="2" fill="none" stroke-dasharray="3,2"/> <text x="70" y="56" font-size="3" fill="#A5E86C" opacity="0.5">large</text> <!-- Surface/core labels --> <text x="14" y="72" font-size="3" fill="#3B8700" opacity="0.3">surface</text> <text x="62" y="72" font-size="3" fill="#3B8700" opacity="0.3">core</text> </svg>',
          explanation: 'This is a classic hardenability problem. The core of a large part cools more slowly than the surface.',
          hint: 'What the TTT diagram tells you about cooling rate vs.',
                },
        {
          id: 'u7-L2-Q5',
          type: 'multiple-choice',
          question: 'A welded structural frame made of 1020 steel has uneven grain structure and residual stresses from welding. The engineer wants to refine the microstructure and relieve stresses, but full annealing takes too long. What heat treatment would you recommend and why?',
          options: [
            'Quench and temper: fastest way to refine grain and relieve stress',
            'Normalizing: heat above upper critical temp and air cool',
            'Stress relieving at 600°C',
            'Process annealing at 550°C: suitable for low-carbon steel',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Cross-section of part (rectangle) --> <rect x="20" y="16" width="40" height="48" rx="2" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.03"/> <!-- Stress distribution (S-curve through thickness) --> <path d="M40,16 Q56,28 40,40 Q24,52 40,64" stroke-width="0.8" stroke="#A5E86C" fill="none"/> <!-- Zero stress line --> <line x1="40" y1="14" x2="40" y2="66" stroke-width="0.4" stroke="#3B8700" opacity="0.2" stroke-dasharray="2,1"/> <!-- Tension zone (surface, arrows pointing right) --> <g opacity="0.35"> <line x1="40" y1="20" x2="50" y2="20" stroke-width="0.4" stroke="#A5E86C"/> <polygon points="50,18.8 50,21.2 52,20" fill="#A5E86C"/> <line x1="40" y1="26" x2="52" y2="26" stroke-width="0.4" stroke="#A5E86C"/> <polygon points="52,24.8 52,27.2 54,26" fill="#A5E86C"/> </g> <!-- Compression zone (interior, arrows pointing left) --> <g opacity="0.35"> <line x1="40" y1="38" x2="30" y2="38" stroke-width="0.4" stroke="#58CC02"/> <polygon points="30,36.8 30,39.2 28,38" fill="#58CC02"/> <line x1="40" y1="44" x2="28" y2="44" stroke-width="0.4" stroke="#58CC02"/> <polygon points="28,42.8 28,45.2 26,44" fill="#58CC02"/> </g> <!-- Tension zone (bottom surface) --> <g opacity="0.35"> <line x1="40" y1="56" x2="50" y2="56" stroke-width="0.4" stroke="#A5E86C"/> <polygon points="50,54.8 50,57.2 52,56" fill="#A5E86C"/> <line x1="40" y1="60" x2="46" y2="60" stroke-width="0.4" stroke="#A5E86C"/> <polygon points="46,58.8 46,61.2 48,60" fill="#A5E86C"/> </g> <!-- Labels --> <text x="56" y="22" font-size="2.5" fill="#A5E86C" opacity="0.4">tension</text> <text x="16" y="42" font-size="2.5" fill="#58CC02" opacity="0.4">comp.</text> <text x="56" y="58" font-size="2.5" fill="#A5E86C" opacity="0.4">tension</text> <!-- Pulsing to show locked-in stress --> <path d="M40,16 Q56,28 40,40 Q24,52 40,64" stroke-width="0.4" stroke="#A5E86C" fill="none" opacity="0.1"> <animate attributeName="opacity" values="0.05;0.25;0.05" dur="2s" repeatCount="indefinite"/> </path> <!-- Self-equilibrating label --> <text x="40" y="10" font-size="2.5" fill="#58CC02" opacity="0.4" text-anchor="middle">∫σ dA = 0</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">self-equilibrating</text> </svg>',
          explanation: 'Normalizing is the right choice here. It fully austenitizes the steel, allowing new, refined grains to form on cooling, and the high temperature relieves residual stresses from welding.',
          hint: 'You need a process that both refines grain structure.'
                },
        {
          id: 'u7-L2-Q6',
          type: 'fill-blank',
          question: 'When tempering a quenched steel at progressively higher temperatures, toughness increases but hardness decreases. However, there is a range around 250-350°C that should be avoided for certain alloy steels because it causes a phenomenon called temper _____.',
          blanks: ['embrittlement'],
          wordBank: ['embrittlement', 'softening', 'recrystallization', 'sensitization', 'spheroidization'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/> <text x="44" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">tempering temp (°C)</text> <text x="6" y="36" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">CVN</text> <!-- Normal toughness curve (rises with temp) --> <path d="M16,55 Q24,50 32,42 Q40,30 48,22 Q56,16 68,14" stroke="#58CC02" stroke-width="1.5" fill="none"/> <!-- Embrittled steel (dip in 250-350 range) --> <path d="M16,55 Q22,50 28,45 Q32,50 36,52 Q40,46 44,32 Q52,20 60,16 Q64,15 68,14" stroke="#A5E86C" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/> <!-- Danger zone shading --> <rect x="28" y="8" width="14" height="57" fill="#3B8700" opacity="0.05"/> <text x="35" y="12" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.3">TME zone</text> <!-- Temperature markers --> <text x="18" y="72" font-size="3" fill="#3B8700" opacity="0.25">200</text> <text x="35" y="72" font-size="3" fill="#3B8700" opacity="0.25">300</text> <text x="52" y="72" font-size="3" fill="#3B8700" opacity="0.25">400</text> <text x="66" y="72" font-size="3" fill="#3B8700" opacity="0.25">500</text> </svg>',
          explanation: 'Temper embrittlement is a loss of toughness that occurs when certain steels are tempered in the 250-350°C range (Type I / TME) or slowly cooled through 375-575°C (Type II). It is caused by the segregation of impurity elements (P, Sn, Sb, As) to prior austenite grain boundaries, weakening them.',
          hint: 'This phenomenon makes the steel less tough despite.'
                },
        {
          id: 'u7-L2-MP1',
          type: 'match-pairs',
          question: 'Match each phase to its description',
          options: ['Ferrite', 'Austenite', 'Cementite', 'Pearlite'],
          matchTargets: [
            'BCC iron, soft and ductile',
            'FCC iron, high carbon solubility',
            'Fe3C, hard and brittle',
            'Lamellar ferrite + cementite'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Ferrite is BCC and soft. Austenite is FCC and dissolves more carbon. Cementite (Fe3C) is the hard carbide. Pearlite is the lamellar mix of ferrite and cementite.',
          hint: 'The eutectoid reaction produces pearlite from austenite.',
        },
        {
          id: 'u7-L2-OS1',
          type: 'order-steps',
          question: 'Order the cooling transformation products from softest to hardest',
          steps: ['Spheroidite', 'Coarse pearlite', 'Fine pearlite', 'Bainite', 'Martensite'],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Spheroidite is the softest (globular carbides). Coarse pearlite is next, then fine pearlite, then bainite, and martensite is the hardest.',
          hint: 'Faster cooling generally produces harder microstructures.',
        },
        {
          id: 'u7-L2-T2',
          type: 'teaching',
          question: 'Quenching, Tempering, and Annealing',
          explanation: 'Quenching cools steel rapidly (in water or oil) to trap carbon in the crystal lattice, forming martensite: extremely hard but brittle. Tempering reheats quenched steel to a moderate temperature to restore some toughness. Annealing is slow furnace cooling that produces the softest, most ductile condition.',
          hint: 'Almost all quenched parts are tempered before use to avoid cracking.',
        },
        {
          id: 'u7-L2-Q7',
          type: 'multiple-choice',
          question: "What microstructure results when a eutectoid steel is cooled from the austenite region at a rate fast enough to bypass the pearlite nose on the TTT diagram but held at 300-350°C?",
          options: [
            "Lower bainite: fine ferrite+carbides from isothermal transformation",
            "Martensite: the fastest-forming transformation product: a plausible but incorrect interpretation of the underlying physics",
            "Coarse pearlite: slow isothermal transformation at any temperature below A₁ produces pearlite",
            "Retained austenite",
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Lower bainite forms by isothermal transformation at 250-350°C. It consists of fine ferrite plates with carbide precipitates within the plates.",
          hint: "Between the pearlite and martensite regions on the TTT."
        },
        {
          id: 'u7-L2-Q8',
          type: 'multiple-choice',
          question: "Maximum carbon solubility in austenite at the eutectic temperature?",
          options: [
            "0.022 wt% C",
            "0.8 wt% C",
            "2.14 wt% C",
            "6.67 wt% C",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/> <text x="44" y="78" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">%C</text> <text x="7" y="38" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">T</text> <path d="M12,56 Q20,52 28,36 L36,20 Q40,14 44,20 L52,36 Q56,44 62,50 L70,56" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <text x="34" y="40" text-anchor="middle" font-size="4.5" fill="#58CC02" opacity="0.3" font-style="italic">γ</text> <circle cx="36" cy="20" r="2.5" fill="#3B8700" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite"/> </circle> <line x1="36" y1="22" x2="36" y2="68" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2" opacity="0.15"/> <text x="36" y="74" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">2.14%</text> <text x="20" y="64" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">α+γ</text> <text x="52" y="64" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">γ+Fe₃C</text> </svg>',

          explanation: "Austenite (FCC) can dissolve up to 2.14 wt% C at 1147°C. Above 2.14% C, the alloy is classified as cast iron rather than steel. Ferrite (BCC) can only dissolve 0.022 wt% C at 727°C.",
          hint: "This value marks the boundary between steels and cast."
        },
        {
          id: 'u7-L2-Q9',
          type: 'true-false',
          question: "Martensite is an equilibrium phase that appears on the Fe-C phase diagram.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Martensite is a NON-EQUILIBRIUM phase. It forms by a diffusionless, shear transformation when austenite is cooled too rapidly for carbon to diffuse out.",
          hint: "The Fe-C phase diagram shows equilibrium phases only."
        },
      ]
    },
    {
      id: 'u7-L2b',
      title: 'Heat Treatment Processes',
      description: 'Quenching, tempering, annealing, normalizing, hardenability.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u7-L2b-EZ1',
          type: 'true-false',
          question: 'Quenching makes steel harder by forming martensite.',
          correctAnswer: true,
          explanation: 'Right. Rapid cooling traps carbon in the lattice, forming the hard martensite phase.',
          hint: 'Fast cooling = hard.',
        },
        {
          id: 'u7-L2-Q10',
          type: 'multiple-choice',
          question: "1080 eutectoid steel slowly cooled from 800°C. Microstructure and hardness?",
          options: [
            "Martensite, approximately 65 HRC, particularly at elevated loads",
            "Bainite, approximately 40 HRC, excluding contributions from residual stresses",
            "Ferrite with a small amount of pearlite, approximately 15 HRC",
            "100% pearlite (alternating lamellae of ferrite and cementite)",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "At 0.8% C, slow cooling from austenite produces 100% pearlite through the eutectoid reaction: γ → α + Fe₃C. The pearlite hardness depends on lamellar spacing.",
          hint: "The eutectoid composition transforms entirely into."
        },
        {
          id: 'u7-L2-Q11',
          type: 'multiple-choice',
          question: "What is the purpose of adding molybdenum to alloy steels like 4140 and 4340?",
          options: [
            "To increase the carbon content in the steel for greater hardness",
            "Improve hardenability by shifting TTT/CCT nose rightward",
            "To lower the melting point of the alloy for easier casting",
            "To make the steel non-magnetic for electrical applications",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Specimen block --> <rect x="10" y="48" width="60" height="20" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="10" y="48" width="60" height="20" rx="3" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Surface highlight --> <rect x="12" y="48" width="56" height="3" rx="1" fill="#A5E86C" opacity="0.1"/> <!-- Indenter (animated — pushes down then retracts) --> <g> <animateTransform attributeName="transform" type="translate" dur="3s" repeatCount="indefinite" values="0,0;0,6;0,6;0,0" keyTimes="0;0.3;0.6;0.9" calcMode="spline" keySplines="0.3 0 0.7 1;0.5 0 0.5 1;0.3 0 0.7 1"/> <!-- Indenter body --> <rect x="36" y="10" width="8" height="24" rx="2" fill="#3B8700" opacity="0.3"/> <rect x="36" y="10" width="8" height="24" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Diamond tip --> <polygon points="40,34 37,40 40,48 43,40" fill="#3B8700" opacity="0.45"/> <polygon points="40,34 37,40 40,48 43,40" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> </g> <!-- Force arrow --> <line x1="40" y1="4" x2="40" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/> <polygon points="38,8 40,11 42,8" fill="#3B8700" opacity="0.3"/> <text x="40" y="4" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.25" font-style="italic">F</text> <!-- Indentation mark (appears after indenter pushes) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.35;0.35;0" keyTimes="0;0.28;0.35;0.85;1" dur="3s" repeatCount="indefinite"/> <ellipse cx="40" cy="48" rx="4" ry="1.5" fill="#3B8700" opacity="0.3"/> <!-- Measurement dimension --> <line x1="34" y1="52" x2="46" y2="52" stroke="#3B8700" stroke-width="0.6"/> <line x1="34" y1="50" x2="34" y2="54" stroke="#3B8700" stroke-width="0.6"/> <line x1="46" y1="50" x2="46" y2="54" stroke="#3B8700" stroke-width="0.6"/> <text x="40" y="58" text-anchor="middle" font-size="4" fill="#3B8700" font-style="italic">d</text> </g> <text x="40" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">HV = 1.854F/d²</text> </svg>',
          explanation: "Molybdenum is one of the most effective hardenability elements, it delays the pearlite and bainite transformations, allowing thicker sections to achieve full martensite.",
          hint: "Mo has two key roles: it affects the TTT diagram."
        },
        {
          id: 'u7-L2-Q12',
          type: 'multiple-choice',
          question: "A Jominy end-quench test bar shows 60 HRC at the quenched end and drops to 25 HRC at 25 mm from the quenched end. What does this indicate about the steel?",
          options: [
            "The steel has poor hardenability",
            "The steel has excellent hardenability",
            "The test was performed incorrectly",
            "The steel has too much carbon",
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "The Jominy test measures hardenability by quenching one end of a standard bar and plotting hardness vs. distance.",
          hint: "The Jominy curve directly shows how fast hardness."
        },
        {
          id: 'u7-L2b-T1',
          type: 'teaching',
          question: 'The Jominy End-Quench Test',
          explanation: 'The Jominy test quenches one end of a standard bar and measures hardness along its length. A steep drop means poor hardenability (only the surface gets hard). A flat curve means great hardenability (even thick sections harden through).',
          hint: 'Alloying elements like Cr, Mo, and Ni shift the TTT nose right, improving hardenability.',
        },
        {
          id: 'u7-L2-Q13',
          type: 'fill-blank',
          question: "Fe-C diagram: alloys above _____ wt% C are cast _____, not steels.",
          blanks: ['2.14', 'iron'],
          wordBank: ['2.14', 'iron', '0.8', 'steel', '4.3', 'bronze'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="10" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <line x1="10" y1="68" x2="10" y2="8" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <text x="6" y="38" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">T</text> <text x="42" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">wt% C</text> <line x1="36" y1="10" x2="36" y2="68" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.3"/> <text x="36" y="78" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.3">2.14%</text> <text x="22" y="56" text-anchor="middle" font-size="4" fill="#58CC02" opacity="0.3" font-style="italic">steels</text> <text x="54" y="56" text-anchor="middle" font-size="4" fill="#A5E86C" opacity="0.3" font-style="italic">cast iron</text> <path d="M12,14 L36,14 L52,36 L70,36" stroke="#3B8700" stroke-width="1.2" fill="none" opacity="0.3"/> </svg>',
          explanation: "The 2.14 wt% C boundary separates steels (<2.14% C) from cast irons (2.14-6.67% C). Cast irons contain enough carbon to form a eutectic reaction at 1147°C, producing lower melting temperatures and excellent castability.",
          hint: "The 2.14% carbon boundary separates two major families of ferrous alloys."
        },
        {
          id: 'u7-L2-Q14',
          type: 'multiple-choice',
          question: "Quenched a 1045 steel part in water without tempering. The part cracked on the shelf overnight. What is the most likely cause of this delayed cracking?",
          options: [
            "Thermal shock from ambient temperature changes overnight",
            "Residual austenite transformed to ferrite overnight",
            "The part continued to cool overnight, reaching its DBTT",
            "Hydrogen cracking. H + residual stress + martensite",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Fixed wall (left) --> <rect x="4" y="24" width="6" height="32" rx="0.5" stroke-width="0.7" stroke="#58CC02" fill="#58CC02" fill-opacity="0.06"/> <g stroke="#58CC02" stroke-width="0.3" opacity="0.2"> <line x1="2" y1="26" x2="4" y2="28"/><line x1="2" y1="32" x2="4" y2="34"/> <line x1="2" y1="38" x2="4" y2="40"/><line x1="2" y1="44" x2="4" y2="46"/> <line x1="2" y1="50" x2="4" y2="52"/> </g> <!-- Fixed wall (right) --> <rect x="70" y="24" width="6" height="32" rx="0.5" stroke-width="0.7" stroke="#58CC02" fill="#58CC02" fill-opacity="0.06"/> <g stroke="#58CC02" stroke-width="0.3" opacity="0.2"> <line x1="76" y1="28" x2="78" y2="26"/><line x1="76" y1="34" x2="78" y2="32"/> <line x1="76" y1="40" x2="78" y2="38"/><line x1="76" y1="46" x2="78" y2="44"/> <line x1="76" y1="52" x2="78" y2="50"/> </g> <!-- Bar (constrained) --> <rect x="10" y="34" width="60" height="12" rx="1.5" stroke-width="0.8" stroke="#58CC02" fill="#A5E86C" fill-opacity="0.06"/> <!-- Temperature rise indication (color pulse) --> <rect x="11" y="35" width="58" height="10" rx="1" fill="#A5E86C" opacity="0.05"> <animate attributeName="opacity" values="0.03;0.15;0.03" dur="3s" repeatCount="indefinite"/> </rect> <!-- Attempted expansion arrows (blocked) --> <g opacity="0.35"> <line x1="14" y1="40" x2="10" y2="40" stroke-width="0.5" stroke="#3B8700"/> <polygon points="10,38.5 10,41.5 8,40" fill="#3B8700"/> <line x1="66" y1="40" x2="70" y2="40" stroke-width="0.5" stroke="#3B8700"/> <polygon points="70,38.5 70,41.5 72,40" fill="#3B8700"/> </g> <!-- Reaction compression arrows --> <g opacity="0.4"> <line x1="8" y1="40" x2="12" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="12,38.5 12,41.5 14,40" fill="#58CC02"/> <line x1="72" y1="40" x2="68" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="68,38.5 68,41.5 66,40" fill="#58CC02"/> </g> <!-- ΔT indicator --> <text x="40" y="30" font-size="3.5" fill="#58CC02" opacity="0.4" text-anchor="middle">ΔT ↑</text> <!-- Temperature wavy lines --> <g opacity="0.2"> <path d="M20,52 Q22,48 24,52" stroke-width="0.4" stroke="#A5E86C" fill="none"> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="3s" repeatCount="indefinite"/> </path> <path d="M38,52 Q40,48 42,52" stroke-width="0.4" stroke="#A5E86C" fill="none"> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="3s" repeatCount="indefinite" begin="0.5s"/> </path> <path d="M56,52 Q58,48 60,52" stroke-width="0.4" stroke="#A5E86C" fill="none"> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="3s" repeatCount="indefinite" begin="1s"/> </path> </g> <!-- Formula --> <text x="40" y="64" font-size="3.5" fill="#58CC02" opacity="0.4" text-anchor="middle">σ = EαΔT</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">constrained expansion</text> </svg>',
          explanation: "Delayed cracking in as-quenched martensite is caused by diffusible hydrogen. Hydrogen can come from moisture, quenchant, or furnace atmosphere.",
          hint: "What causes time-delayed cracking in hard martensite?"
        },
        {
          id: 'u7-L2-Q15',
          type: 'multiple-choice',
          question: "Process annealing vs full annealing of steel?",
          options: [
            "Process annealing is intended exclusively for cast iron parts",
            "Process annealing is faster because it skips phase transformation",
            "Process annealing heats below A₁ to recrystallize cold-worked ferrite",
            "There is no meaningful difference between the two treatments",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Process annealing heats to 550-650°C. It is used between cold-working passes to restore ductility.",
          hint: "The critical difference is whether you heat above or."
        },
        {
          id: 'u7-L2b-SB1',
          type: 'sort-buckets',
          question: 'Sort these heat treatments by their primary purpose',
          options: ['Quenching', 'Tempering', 'Annealing', 'Normalizing', 'Case carburizing', 'Spheroidizing'],
          buckets: ['Increase hardness', 'Increase ductility/toughness'],
          correctBuckets: [0, 1, 1, 1, 0, 1],
          explanation: 'Quenching and case carburizing increase hardness. Tempering, annealing, normalizing, and spheroidizing all improve ductility or toughness.',
          hint: 'Most heat treatments aim to soften steel, not harden it.',
        },
        {
          id: 'u7-L2b-MP1',
          type: 'match-pairs',
          question: 'Match the alloy element to its primary role in steel',
          options: ['Chromium', 'Molybdenum', 'Nickel', 'Vanadium'],
          matchTargets: [
            'Corrosion resistance',
            'Hardenability, temper resistance',
            'Toughness at low temperature',
            'Grain refinement'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Cr gives corrosion resistance (stainless). Mo improves hardenability and temper resistance. Ni improves low-temp toughness. V refines grain size.',
          hint: 'Stainless steel needs at least 10.5% chromium.',
        },
        {
          id: 'u7-L2-Q16',
          type: 'true-false',
          question: "Spheroidizing is a heat treatment that produces the softest and most ductile form of a given steel, making it easier to machine or cold-form.",
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Specimen block --> <rect x="10" y="48" width="60" height="20" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="10" y="48" width="60" height="20" rx="3" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Surface highlight --> <rect x="12" y="48" width="56" height="3" rx="1" fill="#A5E86C" opacity="0.1"/> <!-- Indenter (animated — pushes down then retracts) --> <g> <animateTransform attributeName="transform" type="translate" dur="3s" repeatCount="indefinite" values="0,0;0,6;0,6;0,0" keyTimes="0;0.3;0.6;0.9" calcMode="spline" keySplines="0.3 0 0.7 1;0.5 0 0.5 1;0.3 0 0.7 1"/> <!-- Indenter body --> <rect x="36" y="10" width="8" height="24" rx="2" fill="#3B8700" opacity="0.3"/> <rect x="36" y="10" width="8" height="24" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Diamond tip --> <polygon points="40,34 37,40 40,48 43,40" fill="#3B8700" opacity="0.45"/> <polygon points="40,34 37,40 40,48 43,40" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> </g> <!-- Force arrow --> <line x1="40" y1="4" x2="40" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/> <polygon points="38,8 40,11 42,8" fill="#3B8700" opacity="0.3"/> <text x="40" y="4" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.25" font-style="italic">F</text> <!-- Indentation mark (appears after indenter pushes) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.35;0.35;0" keyTimes="0;0.28;0.35;0.85;1" dur="3s" repeatCount="indefinite"/> <ellipse cx="40" cy="48" rx="4" ry="1.5" fill="#3B8700" opacity="0.3"/> <!-- Measurement dimension --> <line x1="34" y1="52" x2="46" y2="52" stroke="#3B8700" stroke-width="0.6"/> <line x1="34" y1="50" x2="34" y2="54" stroke="#3B8700" stroke-width="0.6"/> <line x1="46" y1="50" x2="46" y2="54" stroke="#3B8700" stroke-width="0.6"/> <text x="40" y="58" text-anchor="middle" font-size="4" fill="#3B8700" font-style="italic">d</text> </g> <text x="40" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">HV = 1.854F/d²</text> </svg>',
          explanation: "Spheroidizing transforms the lamellar cementite in pearlite into spherical (globular) particles embedded in a ferrite matrix. It is typically performed on high-carbon steels (>0.6% C) and tool steels before machining or cold forming.",
          hint: "When cementite changes from sharp lamellae to rounded."
        },
        {
          id: 'u7-L2-Q17',
          type: 'multiple-choice',
          question: "How does a CCT diagram differ from a TTT diagram?",
          options: [
            "They are identical. CCT and TTT are interchangeable names for the same diagram",
            "CCT shows transformations during continuous cooling (as in actual quenching),",
            "TTT is for steels and CCT is for aluminum alloys",
            "CCT is used for heating and TTT is used for cooling,",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "TTT diagrams require instantaneous quenching to a temperature and holding there. CCT diagrams reflect real-world continuous cooling where the temperature drops continuously.",
          hint: "Real quenching involves continuous temperature change."
        },
        {
          id: 'u7-L2-Q18',
          type: 'multiple-choice',
          question: "An engineer needs to case-harden a low-carbon steel (1020) gear to achieve a hard, wear-resistant surface while maintaining a tough core. Which process is most appropriate?",
          options: [
            "Through-hardening by water quenching",
            "Normalizing: refines grain structure but does not increase surface hardness significantly, assuming homogeneous material throughout the section",
            "Tempering at 600°C: reduces brittleness throughout the part",
            "Carburizing: diffuse carbon into the surface at 900-950°C",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve — animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker — appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker — appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker — appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot — follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: "Carburizing diffuses carbon into the surface of low-carbon steel at 900-950°C, raising surface carbon to 0.7-0.9%. After quenching, the high-carbon surface transforms to hard martensite (58-62 HRC) while the low-carbon core remains tough (30-35 HRC).",
          hint: "Low-carbon steel cannot achieve high hardness on its own."
        },
        {
          id: 'u7-L2-Q19',
          type: 'multiple-choice',
          question: "What is retained austenite and why is it a concern?",
          options: [
            "A type of austenite that only exists in stainless steels",
            "Austenite that formed during tempering",
            "Austenite that did not transform during cooling, softer",
            "Austenite that is retained in the grain boundaries to improve corrosion resistance",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "When steel is quenched, some austenite may not transform to martensite, especially in high-carbon and high-alloy steels where the martensite finish temperature (Mf) is below the quenchant temperature. Sub-zero treatment (-80°C to -196°C) converts retained austenite to martensite.",
          hint: "Not all austenite transforms during quenching."
        },
        {
          id: 'u7-L2-Q20',
          type: 'true-false',
          question: "Nitriding requires quenching to achieve surface hardness.",
          correctAnswer: false,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="36" width="52" height="28" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="14" y="36" width="52" height="8" rx="0" fill="#3B8700" opacity="0.1"/> <text x="40" y="42" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">N diffusion layer</text> <text x="40" y="54" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">core</text> <g opacity="0.3"> <circle cx="24" cy="28" r="1.5" fill="#58CC02"> <animate attributeName="cy" values="20;36" dur="2s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="26" r="1.5" fill="#58CC02"> <animate attributeName="cy" values="18;36" dur="2s" begin="0.4s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.5;0" dur="2s" begin="0.4s" repeatCount="indefinite"/> </circle> <circle cx="56" cy="30" r="1.5" fill="#58CC02"> <animate attributeName="cy" values="22;36" dur="2s" begin="0.8s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.5;0" dur="2s" begin="0.8s" repeatCount="indefinite"/> </circle> </g> <text x="40" y="14" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">NH₃ gas</text> <text x="40" y="74" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">no quench needed</text> </svg>',

          explanation: "Nitriding does NOT require quenching. Since no phase transformation is involved, there is minimal distortion.",
          hint: "The hardening mechanism in nitriding is compound formation."
        },
      ]
    },
    {
      id: 'u7-L2c',
      title: 'Advanced Heat Treatment',
      description: 'Case hardening, CCT vs TTT, precipitation hardening.',
      icon: '📝',
      xpReward: 35,
      levels: 4,
      questions: [
        {
          id: 'u7-L2-T3',
          type: 'teaching',
          question: 'Surface Hardening Methods',
          explanation: 'Sometimes you want a hard surface and a tough core. Carburizing adds carbon to a low-carbon steel surface at high temperature, then quenches to form martensite on the outside only. Nitriding diffuses nitrogen into the surface without quenching. Induction hardening heats just the surface with electromagnetic fields.',
          hint: 'Each method targets a different balance of cost, depth, and distortion.',
        },
        {
          id: 'u7-L2c-EZ1',
          type: 'true-false',
          question: 'Martensite appears on the equilibrium Fe-C phase diagram.',
          correctAnswer: false,
          explanation: 'No. Martensite is a non-equilibrium phase. It only forms with rapid cooling, not slow equilibrium cooling.',
          hint: 'The phase diagram shows equilibrium conditions only.',
        },
        {
          id: 'u7-L2-Q21',
          type: 'multiple-choice',
          question: "A hypoeutectoid steel (0.4% C) is heated to 780°C and slowly cooled. What microstructural constituents will be present at room temperature and in what order did they form?",
          options: [
            "Martensite only: rapid cooling from austenite",
            "Pearlite forms first, then ferrite fills in the remaining space",
            "Proeutectoid ferrite forms at grain boundaries below A₃, then pearlite at A₁",
            "Cementite network forms along grain boundaries, then pearlite fills the grains",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "For hypoeutectoid steels (<0.8% C), cooling from full austenite: (1) Below A₃, proeutectoid ferrite nucleates at austenite grain boundaries and grows, rejecting carbon into the remaining austenite. (2) The remaining austenite enriches in carbon toward 0.8% C.",
          hint: "Follow the cooling on the phase diagram."
        },
        {
          id: 'u7-L2-Q22',
          type: 'multiple-choice',
          question: "Why add Cr and Ni to steel for heat treatment?",
          options: [
            "They directly increase the carbon content of the steel alloy",
            "Increase hardenability by retarding pearlite/bainite formation",
            "They lower the melting point of the steel significantly",
            "They fully eliminate any need for tempering after quenching",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/> <text x="44" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">Jominy distance</text> <text x="7" y="36" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">HRC</text> <path d="M16,14 Q24,16 32,30 Q40,42 52,52 L68,58" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <path d="M16,14 Q28,15 40,18 Q52,24 60,34 L68,42" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.5"> <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/> </path> <text x="70" y="56" font-size="3.5" fill="#A5E86C" opacity="0.25" font-style="italic">plain C</text> <text x="70" y="40" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">Cr-Ni</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">hardenability</text> </svg>',

          explanation: "Alloying elements (Cr, Ni, Mo, Mn, Si) dissolve in austenite and retard carbon diffusion during cooling, shifting TTT/CCT curves to the right. Chromium is particularly effective per unit cost.",
          hint: "The key benefit is shifting the transformation curves."
        },
        {
          id: 'u7-L2-Q23',
          type: 'fill-blank',
          question: "Austempering is an isothermal heat treatment where steel is quenched to a temperature above Ms (typically 250-400°C) and held to form _____, which provides an excellent combination of strength and toughness.",
          blanks: ['bainite'],
          wordBank: ['bainite', 'martensite', 'pearlite', 'ferrite', 'austenite'],

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/> <text x="44" y="78" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">log t</text> <text x="7" y="38" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">T</text> <path d="M14,14 L14,20 Q14,22 20,22 L20,60 L70,60" stroke="#58CC02" stroke-width="2" fill="none" opacity="0.4"> <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/> </path> <line x1="12" y1="60" x2="74" y2="60" stroke="#A5E86C" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.2"/> <text x="44" y="58" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">bainite zone</text> <line x1="12" y1="48" x2="74" y2="48" stroke="#3B8700" stroke-width="0.4" stroke-dasharray="1.5,2" opacity="0.15"/> <text x="72" y="46" font-size="3" fill="#3B8700" opacity="0.15" font-style="italic">Ms</text> <text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">austempering</text> </svg>',

          explanation: "Austempering involves quenching into a salt bath at 250-400°C and holding until transformation is complete, producing bainite. It is widely used for ductile iron, springs, clips, and fasteners.",
          hint: "This microstructure forms isothermally between the."
        },
        {
          id: 'u7-L2c-T1',
          type: 'teaching',
          question: 'Precipitation Hardening',
          explanation: 'Some alloys (like 17-4 PH stainless and aluminum 2024) can be strengthened by dissolving atoms at high temperature, then aging at a lower temperature to form tiny precipitates that block dislocations.',
          hint: 'Try this now: compare solution-treated vs aged properties of an aluminum 6061 alloy.',
        },
        {
          id: 'u7-L2-Q24',
          type: 'multiple-choice',
          question: "What is sensitization in austenitic stainless and how to prevent it?",
          options: [
            "Oxidation of the surface during elevated-temperature heat treatment",
            "Cr carbide precipitation at grain boundaries depletes Cr below 10.5%",
            "Absorption of nitrogen from the surrounding furnace atmosphere",
            "Formation of brittle sigma phase during the rapid cooling stage",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Sensitization occurs when austenitic stainless steel is held at 450-850°C. Carbon diffuses to grain boundaries and combines with chromium to form Cr₂₃C₆ carbides.5%, destroying the passive film locally and causing intergranular corrosion (IGC).",
          hint: "When chromium combines with carbon at grain boundaries."
        },
        {
          id: 'u7-L2-Q25',
          type: 'true-false',
          question: "Induction hardening can be used to selectively harden specific surface areas of a medium-carbon steel part without affecting the entire component.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="30" y="14" width="20" height="52" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="30" y="14" width="20" height="52" rx="0" fill="#3B8700" opacity="0.06"/> <rect x="32" y="26" width="16" height="16" rx="1" fill="#3B8700" opacity="0.15"/> <path d="M22,28 Q18,28 18,34 Q18,40 22,40" stroke="#58CC02" stroke-width="2" fill="none" opacity="0.3"/> <path d="M58,28 Q62,28 62,34 Q62,40 58,40" stroke="#58CC02" stroke-width="2" fill="none" opacity="0.3"/> <g opacity="0.25"> <line x1="14" y1="34" x2="30" y2="34" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="1,2"/> <line x1="50" y1="34" x2="66" y2="34" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="1,2"/> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="1s" repeatCount="indefinite"/> </g> <text x="40" y="36" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">heated</text> <text x="40" y="58" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">core soft</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">induction coil</text> </svg>',

          explanation: "Induction hardening uses electromagnetic induction to rapidly heat a localized surface layer above the austenitizing temperature, followed by immediate quenching (usually water spray). Only the heated layer transforms to martensite; the core remains unaffected.",
          hint: "Induction heating concentrates energy in a thin surface."
        },
        {
          id: 'u7-L2-Q26',
          type: 'multiple-choice',
          question: "Upper bainite vs lower bainite: microstructure and properties?",
          options: [
            "Upper bainite has a face-centered cubic crystal structure",
            "Upper bainite is harder and tougher than lower bainite",
            "There is no meaningful difference, bainite is always bainite",
            "Upper: carbides between plates; lower: within plates (tougher)",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Upper bainite (350-550°C) has coarser ferrite laths with cementite precipitates along the lath boundaries. The inter-lath carbides provide crack paths, reducing toughness.",
          hint: "The key difference is where the carbides precipitate."
        },
        {
          id: 'u7-L2c-SB1',
          type: 'sort-buckets',
          question: 'Sort these into equilibrium vs non-equilibrium phases',
          options: ['Ferrite', 'Martensite', 'Austenite', 'Bainite', 'Cementite', 'Retained austenite'],
          buckets: ['Equilibrium (on phase diagram)', 'Non-equilibrium'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Ferrite, austenite, and cementite appear on the equilibrium Fe-C diagram. Martensite, bainite, and retained austenite are non-equilibrium phases that require specific cooling conditions.',
          hint: 'The phase diagram only shows what forms given infinite time.',
        },
        {
          id: 'u7-L2c-OS1',
          type: 'order-steps',
          question: 'Order the steps of a quench-and-temper heat treatment',
          steps: [
            'Austenitize above A3',
            'Rapid quench in oil or water',
            'Confirm martensite formed',
            'Temper at moderate temperature',
            'Air cool to room temperature'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'First austenitize, then quench to form martensite, verify hardness, then temper to restore toughness, and finally air cool.',
          hint: 'Tempering always comes after quenching.',
        },
        {
          id: 'u7-L2-Q27',
          type: 'multiple-choice',
          question: "A part made from D2 tool steel (high-carbon, high-chromium) was quenched and tempered but shows lower hardness than expected. Cryogenic treatment at -196°C is proposed. What is the rationale?",
          options: [
            "Cryogenic treatment relieves residual stress,",
            "Cryogenic treatment transforms retained austenite to martensite",
            "Cold treatment dissolves carbides that were not dissolved during austenitizing",
            "Cryogenic treatment refines the grain structure of the martensite",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Target surface --> <path d="M8,50 Q20,48 30,50 Q40,46 50,50 Q60,48 72,50" stroke-width="0.8" stroke="#58CC02" fill="none"/> <rect x="8" y="50" width="64" height="18" rx="1" stroke-width="0.6" stroke="#58CC02" fill="#58CC02" fill-opacity="0.04"/> <!-- Erosion craters --> <path d="M24,50 Q26,52 28,50" stroke-width="0.4" stroke="#A5E86C" fill="none" opacity="0.4"/> <path d="M38,50 Q40,53 42,50" stroke-width="0.4" stroke="#A5E86C" fill="none" opacity="0.5"/> <path d="M54,50 Q56,51 58,50" stroke-width="0.4" stroke="#A5E86C" fill="none" opacity="0.3"/> <!-- Incoming particles (at angle) --> <circle r="1.5" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;26;20" dur="1.2s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;48;20" dur="1.2s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.5;0;0.5" dur="1.2s" repeatCount="indefinite"/> </circle> <circle r="1.2" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="38;40;38" dur="1s" repeatCount="indefinite" begin="0.3s"/> <animate attributeName="cy" values="18;48;18" dur="1s" repeatCount="indefinite" begin="0.3s"/> <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" begin="0.3s"/> </circle> <circle r="1.8" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="56;56;56" dur="1.4s" repeatCount="indefinite" begin="0.6s"/> <animate attributeName="cy" values="16;48;16" dur="1.4s" repeatCount="indefinite" begin="0.6s"/> <animate attributeName="opacity" values="0.5;0;0.5" dur="1.4s" repeatCount="indefinite" begin="0.6s"/> </circle> <!-- Rebound particles --> <circle r="0.8" fill="#3B8700" opacity="0"> <animate attributeName="cx" values="26;32" dur="0.6s" repeatCount="indefinite" begin="0.6s"/> <animate attributeName="cy" values="48;38" dur="0.6s" repeatCount="indefinite" begin="0.6s"/> <animate attributeName="opacity" values="0.4;0" dur="0.6s" repeatCount="indefinite" begin="0.6s"/> </circle> <!-- Impact angle --> <line x1="38" y1="30" x2="40" y2="48" stroke-width="0.3" stroke="#3B8700" opacity="0.2"/> <line x1="32" y1="48" x2="48" y2="48" stroke-width="0.3" stroke="#3B8700" opacity="0.2"/> <path d="M44,48 A6,6 0 0,0 41,44" stroke-width="0.3" stroke="#3B8700" opacity="0.3" fill="none"/> <text x="48" y="44" font-size="2.5" fill="#3B8700" opacity="0.35">α</text> <!-- Debris --> <g opacity="0.2"> <circle cx="30" cy="44" r="0.5" fill="#A5E86C"/> <circle cx="42" cy="42" r="0.4" fill="#A5E86C"/> <circle cx="56" cy="44" r="0.3" fill="#A5E86C"/> </g> <!-- Material removal --> <text x="40" y="14" font-size="3" fill="#58CC02" opacity="0.4" text-anchor="middle">W ∝ v²·f(α)</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">particle impact</text> </svg>',
          explanation: "High-carbon, high-alloy steels like D2 have Mf temperatures well below 0°C. After conventional quenching to room temperature, 10-30% retained austenite may remain, reducing hardness and dimensional stability.",
          hint: "When Mf is below room temperature."
        },
        {
          id: 'u7-L2-Q28',
          type: 'multiple-choice',
          question: "Role of Ms temperature in heat treatment? Effect of carbon content?",
          options: [
            "Ms is the temperature above",
            "Ms is the tempering temperature for martensite",
            "Ms is the temperature below",
            "Ms is the melting start temperature of the steel",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "The Ms temperature marks where martensite begins to form during cooling. For plain carbon steel, Ms ≈ 540 - 350×(%C) °C approximately.",
          hint: "Carbon atoms distort the lattice and affect the."
        },
        {
          id: 'u7-L2-Q29',
          type: 'true-false',
          question: "Normalizing and full annealing both involve heating above the upper critical temperature, but normalizing uses air cooling while full annealing uses slow furnace cooling.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/> <text x="44" y="78" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">time</text> <text x="7" y="38" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">T</text> <path d="M16,14 Q28,22 40,40 Q48,52 56,62" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <path d="M16,14 Q36,28 52,48 Q62,58 70,62" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3" stroke-dasharray="2,2"/> <text x="50" y="48" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">normalizing</text> <text x="50" y="54" font-size="3" fill="#3B8700" opacity="0.15" font-style="italic">(air cool)</text> <text x="62" y="40" font-size="3.5" fill="#A5E86C" opacity="0.25" font-style="italic">annealing</text> <text x="62" y="46" font-size="3" fill="#A5E86C" opacity="0.15" font-style="italic">(furnace)</text> </svg>',

          explanation: "Both normalizing and full annealing heat hypoeutectoid steels above A₃ to fully austenitize the steel. The difference is cooling rate: normalizing uses still-air cooling (faster), producing finer pearlite with higher hardness and strength.",
          hint: "Same heating, different cooling rates."
        },
        {
          id: 'u7-L2-Q30',
          type: 'fill-blank',
          question: "The iron-carbon phase diagram shows that the _____ reaction occurs at 4.3 wt% C and 1147°C, where liquid transforms simultaneously into austenite and cementite. This mixture is called _____.",
          blanks: ['eutectic', 'ledeburite'],
          wordBank: ['eutectic', 'ledeburite', 'eutectoid', 'pearlite', 'peritectic', 'cementite'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="10" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <line x1="10" y1="68" x2="10" y2="8" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <text x="6" y="38" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">T</text> <text x="42" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">wt% C</text> <path d="M12,12 L30,12 L48,34 L70,34" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M12,24 L30,24 L48,34" stroke="#A5E86C" stroke-width="1.2" fill="none" opacity="0.3"/> <line x1="10" y1="34" x2="70" y2="34" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.25"/> <circle cx="48" cy="34" r="2.5" fill="#58CC02" opacity="0.3" stroke="#3B8700" stroke-width="1"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite"/> </circle> <text x="48" y="44" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.3" font-style="italic">4.3%C</text> <text x="74" y="32" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">1147°C</text> <text x="40" y="56" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">eutectic → ledeburite</text> </svg>',
          explanation: "Ledeburite is the eutectic mixture of austenite and cementite formed at 4.3% C and 1147°C. The eutectic reaction transforms liquid into two solid phases simultaneously.",
          hint: "This eutectic mixture is named after the German city."
        },
      ]
    },
    {
      id: 'u7-L3',
      title: 'Casting Processes',
      description: 'Sand, investment, and die casting, defects, shrinkage.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u7-L3-T1',
          type: 'teaching',
          question: 'Casting Basics',
          explanation: 'Casting pours molten metal into a mold cavity shaped like the final part. Sand casting is cheap and handles large parts but has rough surfaces. Investment casting (lost-wax) gives tight tolerances and smooth finishes for complex shapes. Die casting injects metal under pressure for high-volume, precise parts.',
          hint: 'Choose the casting process based on volume, part size, tolerance, and complexity.',
        },
        {
          id: 'u7-L3-EZ1',
          type: 'true-false',
          question: 'In casting, molten metal is poured into a mold shaped like the final part.',
          correctAnswer: true,
          explanation: 'Yes. Casting fills a mold cavity with liquid metal that solidifies into the desired shape.',
          hint: 'Casting is one of the oldest manufacturing processes.',
        },
        {
          id: 'u7-L3-Q1',
          type: 'multiple-choice',
          question: 'A structural bracket must withstand a static tensile load of 45 kN, operate at temperatures up to 150°C, weigh as little as possible, and be produced in batches of 5,000 units/year. The bracket has a complex 3D geometry with internal ribs and thin walls (2.5 mm). Considering material properties, manufacturability, and cost, which material + process combination is the best choice?',
          options: [
            'A356 aluminum alloy (T6 heat-treated, gravity cast)',
            'A380 aluminum alloy: die cast, good strength-to-weight',
            '1045 carbon steel: sand cast then machined',
            'Nylon 66 (glass-filled) \u2014 injection molded plastic part',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Left half — grip + shoulder + gauge end --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <!-- Right half (mirror) --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <!-- Gauge section (necks then fractures) --> <path fill="#58CC02" opacity="0.1"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> </path> <path stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.5"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> <animate attributeName="opacity" values="0.5;0.5;0.5;0;0;0.5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </path> <!-- Necking stress concentration zone --> <ellipse cx="40" cy="40" rx="8" ry="5" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.1;0.18;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="ry" values="5;5;3;1;1;5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </ellipse> <!-- Gauge length marks (spread apart during test) --> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <!-- Gauge length bracket --> <line y1="30" y2="30" stroke="#3B8700" stroke-width="0.5" opacity="0.15"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <text x="40" y="28" text-anchor="middle" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">L₀</text> <!-- Fracture flash (X mark) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0;0.7;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.68;0.71;0.73;0.8;1"/> <line x1="37" y1="36" x2="43" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> <line x1="43" y1="36" x2="37" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> </g> <!-- Force arrows (pull apart) --> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="14,40 9,37 9,43;8,40 3,37 3,43;2,40 -3,37 -3,43;0,40 -5,37 -5,43;0,40 -5,37 -5,43;14,40 9,37 9,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="66,40 71,37 71,43;72,40 77,37 77,43;78,40 83,37 83,43;80,40 85,37 85,43;80,40 85,37 85,43;66,40 71,37 71,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <!-- F labels near arrows --> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="10;5;0;0;0;10" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="70;75;80;80;80;70" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> </svg>',
          explanation: 'A380 die casting is the optimal choice here. Material analysis: 45 kN over a ribbed cross-section (~300 mm² minimum) requires σ ≈ 150 MPa.',
          hint: 'Evaluate each option against ALL four requirements:.'
                },
        {
          id: 'u7-L3-Q2',
          type: 'multiple-choice',
          question: 'A welded T-joint on a thick rolled steel plate failed by cracking parallel to the plate surface in the HAZ, beneath the weld. The crack surfaces show a layered, woody appearance. What is this failure mode?',
          options: [
            'Hydrogen cracking from moisture absorbed by the electrode coating',
            'Lamellar tearing along flattened inclusion planes in the plate',
            'Solidification cracking in the weld metal centerline',
            'Stress corrosion cracking from residual weld stresses',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'Lamellar tearing is a through-thickness failure unique to rolled plate products. During rolling, non-metallic inclusions (especially MnS) flatten into thin planes parallel to the plate surface.',
          hint: 'The woody, stepped appearance of the fracture and its.'
                },
        {
          id: 'u7-L3-Q3',
          type: 'true-false',
          question: 'In casting, should the riser solidify before or after the casting?',
          correctAnswer: false,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="34" width="40" height="30" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="50" y="24" width="18" height="40" rx="2" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/> <path d="M50,40 L50,48" stroke="#3B8700" stroke-width="2" opacity="0.3"/> <g opacity="0.3"> <circle cx="59" cy="36" r="2" fill="#58CC02"> <animate attributeName="opacity" values="0.4;0.15;0.4" dur="3s" repeatCount="indefinite"/> </circle> <circle cx="59" cy="48" r="2" fill="#58CC02"> <animate attributeName="opacity" values="0.35;0.1;0.35" dur="3s" begin="0.5s" repeatCount="indefinite"/> </circle> </g> <text x="30" y="52" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">casting</text> <text x="59" y="18" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">riser</text> <polygon points="48,44 52,42 52,46" fill="#3B8700" opacity="0.25"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </polygon> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">riser feeds shrinkage</text> </svg>',

          explanation: 'A riser must solidify AFTER the casting section it feeds. If the riser freezes first, it cannot supply metal to the casting, resulting in shrinkage porosity.',
          hint: 'The function of a riser.',
                },
        {
          id: 'u7-L3-T1b',
          type: 'teaching',
          question: 'Casting Shrinkage',
          explanation: 'Metals shrink when they solidify and again when they cool. Designers add shrinkage allowance to patterns (typically 1-2% for steel, less for aluminum). Risers feed liquid metal into the casting to compensate for solidification shrinkage.',
          hint: 'The last region to solidify should be in the riser, not in the part.',
        },
        {
          id: 'u7-L3-Q4',
          type: 'multiple-choice',
          question: 'What is the primary advantage of closed-die forging over open-die forging?',
          options: [
            'Lower tooling cost and faster setup,',
            'Better grain flow, tighter tolerances',
            'Ability to produce much larger parts',
            'No flash is generated, reducing material waste',
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M10,30 L30,30 L30,10 L50,10 L50,30 L70,30" stroke="#3B8700" stroke-width="2" fill="#3B8700" opacity="0.1"/> <path d="M10,50 L30,50 L30,70 L50,70 L50,50 L70,50" stroke="#3B8700" stroke-width="2" fill="#3B8700" opacity="0.1"/> <rect x="30" y="34" width="20" height="12" rx="1" fill="#58CC02" opacity="0.2" stroke="#3B8700" stroke-width="1"/> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="2s" repeatCount="indefinite"/> <path d="M10,30 L30,30 L30,10 L50,10 L50,30 L70,30" stroke="#3B8700" stroke-width="2" fill="#3B8700" opacity="0.1"/> </g> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">closed-die forging</text> <text x="40" y="44" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">billet</text> </svg>',

          explanation: 'Closed-die (impression-die) forging confines the workpiece, producing parts with better dimensional accuracy, superior grain flow following the part contour, and excellent mechanical properties. It achieves near-net shape, reducing machining.',
          hint: 'Closed dies control material flow to achieve a specific.'
                },
        {
          id: 'u7-L3-Q5',
          type: 'multiple-choice',
          question: 'Cast housing and need to decide between sand casting and investment casting. The part has thin walls (3 mm), internal passages, tight tolerances (±0.2 mm), and annual volume of 500 units.',
          options: [
            'Sand casting: low tooling cost makes it economical at 500/year',
            'Investment casting: achieves thin walls and tight tolerances',
            'Neither process can meet all requirements at 500 units/year',
            'Sand casting followed by precision machining of all surfaces',
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="6" y="28" width="30" height="28" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <rect x="10" y="32" width="22" height="20" rx="1" fill="#3B8700" opacity="0.08"/> <text x="21" y="46" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">sand</text> <rect x="44" y="28" width="30" height="28" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <path d="M50,32 Q54,36 58,32 Q62,36 66,32 L66,52 Q62,48 58,52 Q54,48 50,52 Z" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="0.5"/> <text x="59" y="46" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">investment</text> <text x="21" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">rough</text> <text x="59" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">fine detail</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">casting comparison</text> </svg>',

          explanation: 'Investment (lost-wax) casting is the right process here. Sand casting cannot reliably produce 3 mm walls, and its tolerances (±1-2 mm) are well outside the ±0.2 mm requirement.',
          hint: 'Each process\'s capabilities against the three key.'
                },
        {
          id: 'u7-L3-Q6',
          type: 'fill-blank',
          question: 'Vertical surfaces on the pattern must have a slight taper (typically 1-3°) to allow the pattern to be withdrawn from the sand mold without damaging the cavity. This taper is called the _____ angle.',
          blanks: ['draft'],
          wordBank: ['draft', 'parting', 'relief', 'clearance', 'rake'],

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="16" y="34" width="48" height="30" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <path d="M30,34 L28,8 L52,8 L50,34" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="3s" repeatCount="indefinite"/> <path d="M30,34 L28,8 L52,8 L50,34" fill="#A5E86C" opacity="0.08" stroke="#3B8700" stroke-width="1"/> </g> <line x1="54" y1="34" x2="54" y2="8" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2" opacity="0.2"/> <path d="M50,34 Q52,20 54,20" stroke="#A5E86C" stroke-width="0.5" fill="none" opacity="0.3"/> <text x="60" y="22" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">draft</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">1–3° taper</text> <polygon points="38,6 40,2 42,6" fill="#3B8700" opacity="0.25"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1.5s" repeatCount="indefinite"/> </polygon> </svg>',

          explanation: 'Draft angles are essential for pattern withdrawal from the sand mold. Without draft, the pattern would drag against the mold walls during removal, collapsing the cavity.',
          hint: 'This taper prevents the mold cavity from being damaged.'
                },
        {
          id: 'u7-L3-MP1',
          type: 'match-pairs',
          question: 'Match each casting process to its best use case',
          options: ['Sand casting', 'Die casting', 'Investment casting', 'Centrifugal casting'],
          matchTargets: [
            'Large, low-volume parts',
            'High-volume aluminum parts',
            'Complex aerospace parts',
            'Pipes and tubes'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Sand casting handles large parts cheaply. Die casting is fast for high-volume production. Investment casting gives precision for complex shapes. Centrifugal casting makes hollow cylindrical parts.',
          hint: 'Think about volume, complexity, and part shape.',
        },
        {
          id: 'u7-L3-OS1',
          type: 'order-steps',
          question: 'Order the sand casting process steps',
          steps: [
            'Make pattern and core',
            'Pack sand around pattern',
            'Remove pattern, close mold',
            'Pour molten metal',
            'Cool, shake out, and clean'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Sand casting starts with pattern making, then molding, then closing, pouring, and finally shakeout and cleaning.',
          hint: 'The pattern creates the cavity shape.',
        },
        {
          id: 'u7-L3-T2',
          type: 'teaching',
          question: 'Casting Defects and Riser Design',
          explanation: 'Metals shrink as they solidify, so castings need risers: extra reservoirs of liquid metal that feed the part as it contracts. If the riser freezes first, the casting gets shrinkage porosity (internal voids). Draft angles on vertical surfaces let the pattern pull out of the sand mold without damage.',
          hint: 'The riser must always solidify after the casting itself.',
        },
        {
          id: 'u7-L3-Q7',
          type: 'multiple-choice',
          question: "In metal casting, what is Chvorinov's rule and how is it used in riser design?",
          options: [
            "Solidification time is proportional to (Volume/Surface Area)²",
            "It calculates the maximum pouring temperature based on metal composition",
            "It determines the minimum wall thickness based on the metal's fluidity",
            "It calculates the required clamping force to hold the mold halves together,",
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Chvorinov's rule: t_s = B × (V/A)², where t_s is solidification time, B is a mold constant, V is volume, and A is surface area. For effective feeding, the riser must solidify after the casting section it feeds, requiring a larger V/A ratio.",
          hint: "The key ratio determining solidification time is Volume."
        },
        {
          id: 'u7-L3-Q8',
          type: 'multiple-choice',
          question: "Primary advantage of die casting over sand casting for aluminum?",
          options: [
            "Die casting can reliably produce significantly larger parts",
            "Die casting uses significantly less energy per finished part",
            "Die casting gives better dimensional accuracy per part",
            "Die casting eliminates the need for draft angles",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="8" y="22" width="28" height="36" rx="2" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1.5"/> <rect x="44" y="22" width="28" height="36" rx="2" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1.5"/> <rect x="12" y="28" width="20" height="24" rx="1" fill="#58CC02" opacity="0.1"/> <g opacity="0.3"> <line x1="36" y1="40" x2="44" y2="40" stroke="#3B8700" stroke-width="1.5"/> <polygon points="42,38 46,40 42,42" fill="#3B8700"/> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <text x="22" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">injection</text> <text x="58" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">die cavity</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">die casting</text> </svg>',

          explanation: "Die casting injects molten metal at high pressure into reusable steel molds, producing parts with excellent tolerances (±0.05-0.1 mm), smooth surfaces (1-3 μm Ra), and cycle times of 30-90 seconds. Sand casting has lower tooling costs but poorer tolerances (±1-2 mm) and rougher surfaces (12-25 μm Ra).",
          hint: "The precision, speed, and tooling cost between."
        },
        {
          id: 'u7-L3-Q9',
          type: 'true-false',
          question: "Hot tears (hot cracking) in castings occur during solidification when thermal contraction stresses exceed the strength of the partially solidified metal.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="20" width="52" height="36" rx="3" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <path d="M40,20 Q38,28 42,34 Q38,40 40,48 Q42,52 40,56" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.4"> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite"/> </path> <g opacity="0.2"> <line x1="30" y1="38" x2="24" y2="38" stroke="#3B8700" stroke-width="0.8"/> <polygon points="26,36.5 22,38 26,39.5" fill="#3B8700"/> <line x1="50" y1="38" x2="56" y2="38" stroke="#3B8700" stroke-width="0.8"/> <polygon points="54,36.5 58,38 54,39.5" fill="#3B8700"/> </g> <text x="40" y="66" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">thermal contraction</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">hot tear</text> </svg>',

          explanation: "Hot tears form in the final stages of solidification when a thin film of liquid remains between dendrites. The casting is contracting thermally but is restrained by the mold, cores, or previously solidified sections.",
          hint: "During solidification, the casting wants to shrink but."
        },
      ]
    },
    {
      id: 'u7-L3b',
      title: 'Forming Processes',
      description: 'Forging, rolling, extrusion, drawing, formability.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u7-L3-T3',
          type: 'teaching',
          question: 'Metal Forming Processes',
          explanation: 'Forming reshapes solid metal without removing material. Forging presses or hammers hot/cold metal into shape, producing superior grain structure. Rolling squeezes metal between rotating rolls to make sheets or bars. Extrusion pushes metal through a die to create long profiles (like squeezing toothpaste).',
          hint: 'Formed parts are generally stronger than cast parts because the grain flow follows the shape.',
        },
        {
          id: 'u7-L3b-EZ1',
          type: 'true-false',
          question: 'Hot working happens above the recrystallization temperature.',
          correctAnswer: true,
          explanation: 'Correct. Above recrystallization temperature, the metal can be deformed extensively without strain hardening.',
          hint: 'The metal stays soft because new grains form continuously.',
        },
        {
          id: 'u7-L3-Q10',
          type: 'multiple-choice',
          question: "Forward vs backward extrusion: primary advantage of backward?",
          options: [
            "Backward extrusion produces longer extrusions",
            "Backward extrusion works at lower temperatures",
            "Backward extrusion can produce hollow profiles without a mandrel",
            "Lower ram force",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="26" width="60" height="24" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <rect x="14" y="30" width="20" height="16" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <rect x="54" y="34" width="14" height="8" rx="1" fill="#58CC02" opacity="0.15" stroke="#3B8700" stroke-width="0.8"/> <g opacity="0.4"> <line x1="4" y1="38" x2="12" y2="38" stroke="#3B8700" stroke-width="1.5"/> <polygon points="11,36 15,38 11,40" fill="#3B8700"/> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <polygon points="68,36 76,38 68,40" fill="#58CC02" opacity="0.3"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1.5s" repeatCount="indefinite"/> </polygon> <text x="24" y="42" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">ram</text> <text x="62" y="42" text-anchor="middle" font-size="2.5" fill="#3B8700" opacity="0.2" font-style="italic">product</text> <text x="40" y="60" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">die</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">extrusion</text> </svg>',

          explanation: "In direct extrusion, the billet slides along the container wall, creating significant friction that adds to the required force. In indirect extrusion, the die moves into the stationary billet.",
          hint: "What relative motion exists between the billet and."
        },
        {
          id: 'u7-L3-Q11',
          type: 'multiple-choice',
          question: "Why does forging produce superior properties vs casting?",
          options: [
            "Forging uses higher-purity metals that are inherently stronger",
            "Forging produces aligned grain flow following the part contour",
            "Forging adds carbon to the surface of the part during deformation,",
            "All forged parts must always be heat-treated after forming",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Cross-section of part (rectangle) --> <rect x="20" y="16" width="40" height="48" rx="2" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.03"/> <!-- Stress distribution (S-curve through thickness) --> <path d="M40,16 Q56,28 40,40 Q24,52 40,64" stroke-width="0.8" stroke="#A5E86C" fill="none"/> <!-- Zero stress line --> <line x1="40" y1="14" x2="40" y2="66" stroke-width="0.4" stroke="#3B8700" opacity="0.2" stroke-dasharray="2,1"/> <!-- Tension zone (surface, arrows pointing right) --> <g opacity="0.35"> <line x1="40" y1="20" x2="50" y2="20" stroke-width="0.4" stroke="#A5E86C"/> <polygon points="50,18.8 50,21.2 52,20" fill="#A5E86C"/> <line x1="40" y1="26" x2="52" y2="26" stroke-width="0.4" stroke="#A5E86C"/> <polygon points="52,24.8 52,27.2 54,26" fill="#A5E86C"/> </g> <!-- Compression zone (interior, arrows pointing left) --> <g opacity="0.35"> <line x1="40" y1="38" x2="30" y2="38" stroke-width="0.4" stroke="#58CC02"/> <polygon points="30,36.8 30,39.2 28,38" fill="#58CC02"/> <line x1="40" y1="44" x2="28" y2="44" stroke-width="0.4" stroke="#58CC02"/> <polygon points="28,42.8 28,45.2 26,44" fill="#58CC02"/> </g> <!-- Tension zone (bottom surface) --> <g opacity="0.35"> <line x1="40" y1="56" x2="50" y2="56" stroke-width="0.4" stroke="#A5E86C"/> <polygon points="50,54.8 50,57.2 52,56" fill="#A5E86C"/> <line x1="40" y1="60" x2="46" y2="60" stroke-width="0.4" stroke="#A5E86C"/> <polygon points="46,58.8 46,61.2 48,60" fill="#A5E86C"/> </g> <!-- Labels --> <text x="56" y="22" font-size="2.5" fill="#A5E86C" opacity="0.4">tension</text> <text x="16" y="42" font-size="2.5" fill="#58CC02" opacity="0.4">comp.</text> <text x="56" y="58" font-size="2.5" fill="#A5E86C" opacity="0.4">tension</text> <!-- Pulsing to show locked-in stress --> <path d="M40,16 Q56,28 40,40 Q24,52 40,64" stroke-width="0.4" stroke="#A5E86C" fill="none" opacity="0.1"> <animate attributeName="opacity" values="0.05;0.25;0.05" dur="2s" repeatCount="indefinite"/> </path> <!-- Self-equilibrating label --> <text x="40" y="10" font-size="2.5" fill="#58CC02" opacity="0.4" text-anchor="middle">∫σ dA = 0</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">self-equilibrating</text> </svg>',
          explanation: "Forging improves properties through several mechanisms: (1) The wrought grain flow aligns with the principal stress directions, maximizing strength and fatigue resistance. (2) Hot working closes internal porosity and voids present in the original ingot.",
          hint: "To the internal structure when metal is compressed and.",
        },
        {
          id: 'u7-L3-Q12',
          type: 'multiple-choice',
          question: "In sheet metal bending, what is springback and how is it compensated?",
          options: [
            "Springback is the cracking on the outer surface of the bend",
            "Springback is the elastic recovery of the sheet after bending",
            "Springback is the tendency for bent sheet to flatten completely",
            "Springback is caused by residual stresses from rolling",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M10,50 L30,50 Q40,50 40,30 L40,20" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <path d="M10,50 L30,50 Q42,50 44,32 L46,22" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3" stroke-dasharray="2,2"/> <path d="M42,24 Q44,22 46,22" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <text x="50" y="28" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">springback</text> <line x1="40" y1="18" x2="46" y2="18" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <text x="64" y="50" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">desired</text> <text x="64" y="56" font-size="3.5" fill="#A5E86C" opacity="0.2" font-style="italic">actual</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">overbend to compensate</text> </svg>',

          explanation: "When the bending force is removed, the elastic portion of the deformation recovers, causing the bend angle to spring open by 2-10° depending on the material, thickness, bend radius, and ratio of R/t. Higher yield strength and larger R/t ratio produce more springback.",
          hint: "When you bend a sheet and release the force."
        },
        {
          id: 'u7-L3b-T1',
          type: 'teaching',
          question: 'Hot vs Cold Working',
          explanation: 'Hot working (above the recrystallization temperature) allows large deformations without cracking, and the metal recrystallizes into fine grains. Cold working (below recrystallization) strain-hardens the metal, increasing strength but reducing ductility.',
          hint: 'Cold-rolled steel is stronger than hot-rolled steel of the same grade.',
        },
        {
          id: 'u7-L3-Q13',
          type: 'fill-blank',
          question: "The maximum possible reduction per pass is limited by the _____ between the rolls and the workpiece. The maximum draft (reduction in thickness) equals μ² × R, where μ is the coefficient of friction and R is the roll _____.",
          blanks: ['friction', 'radius'],
          wordBank: ['friction', 'radius', 'pressure', 'diameter', 'speed', 'torque'],

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="26" cy="24" r="16" fill="none" stroke="#3B8700" stroke-width="2" opacity="0.3"/> <circle cx="54" cy="24" r="16" fill="none" stroke="#3B8700" stroke-width="2" opacity="0.3"/> <rect x="16" y="38" width="48" height="8" rx="1" fill="#58CC02" opacity="0.12" stroke="#3B8700" stroke-width="1"/> <g opacity="0.3"> <line x1="4" y1="42" x2="14" y2="42" stroke="#3B8700" stroke-width="1.2"/> <polygon points="13,40 17,42 13,44" fill="#3B8700"/> <line x1="66" y1="42" x2="76" y2="42" stroke="#3B8700" stroke-width="1.2"/> <polygon points="74,40 78,42 74,44" fill="#3B8700"/> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <animateTransform attributeName="transform" type="rotate" from="0 26 24" to="360 26 24" dur="3s" repeatCount="indefinite"/> <text x="40" y="58" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">friction grip</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">rolling mill</text> </svg>',

          explanation: "The bite condition in rolling requires that the horizontal component of friction force exceeds the horizontal component of the normal force, otherwise the rolls cannot pull the workpiece in. Larger rolls (larger R) and rougher surfaces (larger μ) allow greater reductions per pass.",
          hint: "The formula for maximum draft depends on friction."
        },
        {
          id: 'u7-L3-Q14',
          type: 'multiple-choice',
          question: "What type of porosity results from dissolved gases coming out of solution as the metal solidifies?",
          options: [
            "Gas porosity is caused by air entrapment during the metal pouring",
            "They are the same type of defect with different industry names",
            "Gas porosity occurs exclusively at the casting outer surface",
            "Gas: round smooth voids throughout; shrinkage: irregular voids at hot spots",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="16" width="52" height="44" rx="3" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <circle cx="28" cy="30" r="3" fill="none" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/> <circle cx="44" cy="26" r="2" fill="none" stroke="#3B8700" stroke-width="0.8" opacity="0.25"/> <circle cx="52" cy="38" r="3.5" fill="none" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/> <circle cx="36" cy="44" r="2.5" fill="none" stroke="#3B8700" stroke-width="0.8" opacity="0.25"/> <circle cx="24" cy="48" r="1.5" fill="none" stroke="#3B8700" stroke-width="0.6" opacity="0.2"/> <circle cx="56" cy="50" r="2" fill="none" stroke="#3B8700" stroke-width="0.6" opacity="0.2"/> <g opacity="0.2"> <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite"/> <circle cx="28" cy="30" r="3" fill="#A5E86C" opacity="0.2"/> <circle cx="52" cy="38" r="3.5" fill="#A5E86C" opacity="0.2"/> </g> <text x="40" y="70" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">gas porosity</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">dissolved gas</text> </svg>',

          explanation: "Gas porosity: dissolved gases have much higher solubility in liquid metal than solid. As the metal solidifies, gases come out of solution and form round, smooth-walled bubbles trapped in the solidifying metal.",
          hint: "One is caused by gas bubbles (round)."
        },
        {
          id: 'u7-L3-Q15',
          type: 'multiple-choice',
          question: "In investment casting (lost-wax process), what is the sequence of major steps?",
          options: [
            "Machine a metal pattern → pack in sand → pour metal → shake out",
            "Carve a plaster mold → pour metal → machine to final dimensions",
            "Wax pattern → ceramic shell → melt wax → pour metal → break shell",
            "Create a foam pattern → coat with refractory → pour metal (foam burns out) → clean",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="4" y="20" width="16" height="20" rx="1" fill="#A5E86C" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <text x="12" y="34" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2">wax</text> <rect x="24" y="18" width="16" height="24" rx="1" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1"/> <text x="32" y="34" text-anchor="middle" font-size="2.5" fill="#3B8700" opacity="0.2">shell</text> <rect x="44" y="18" width="16" height="24" rx="1" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1"/> <text x="52" y="34" text-anchor="middle" font-size="2.5" fill="#3B8700" opacity="0.2">pour</text> <rect x="64" y="20" width="14" height="20" rx="1" fill="#58CC02" opacity="0.12" stroke="#3B8700" stroke-width="1.5"/> <text x="71" y="34" text-anchor="middle" font-size="2.5" fill="#3B8700" opacity="0.2">part</text> <g opacity="0.25"> <line x1="20" y1="30" x2="24" y2="30" stroke="#3B8700" stroke-width="0.8"/> <polygon points="23,29 25,30 23,31" fill="#3B8700"/> <line x1="40" y1="30" x2="44" y2="30" stroke="#3B8700" stroke-width="0.8"/> <polygon points="43,29 45,30 43,31" fill="#3B8700"/> <line x1="60" y1="30" x2="64" y2="30" stroke="#3B8700" stroke-width="0.8"/> <polygon points="63,29 65,30 63,31" fill="#3B8700"/> </g> <text x="40" y="58" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">investment casting</text> <text x="40" y="68" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.15" font-style="italic">wax → shell → pour → part</text> </svg>',

          explanation: "Investment casting sequence: (1) Inject wax or plastic patterns using a metal die. (2) Assemble patterns onto a wax tree (sprue).",
          hint: "The \"investment\" is the ceramic shell built around a."
        },
        {
          id: 'u7-L3b-SB1',
          type: 'sort-buckets',
          question: 'Sort these into hot working vs cold working processes',
          options: [
            'Hot rolling',
            'Cold drawing',
            'Forging at 1100 degrees C',
            'Stamping sheet metal at room temp',
            'Hot extrusion',
            'Cold heading of bolts'
          ],
          buckets: ['Hot working', 'Cold working'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Hot working happens above the recrystallization temperature (metal stays soft). Cold working happens below it (metal strain-hardens).',
          hint: 'Hot working allows large deformations without cracking.',
        },
        {
          id: 'u7-L3b-MP1',
          type: 'match-pairs',
          question: 'Match each forming defect to its cause',
          options: ['Orange peel', 'Springback', 'Wrinkling', 'Barreling'],
          matchTargets: [
            'Coarse grain structure',
            'Elastic recovery after bending',
            'Insufficient blank holder force',
            'Friction in compression'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Orange peel comes from coarse grains. Springback is elastic recovery. Wrinkling happens when the blank holder is too loose. Barreling results from friction during compression.',
          hint: 'Each defect has a distinct physical mechanism.',
        },
        {
          id: 'u7-L3-Q16',
          type: 'true-false',
          question: "Deep drawing is a sheet metal forming process where a flat blank is drawn into a cylindrical cup shape without any change in the blank thickness.",
          correctAnswer: false,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="16" y="36" width="48" height="6" rx="1" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1"/> <path d="M24,36 L24,36 Q24,44 28,52 L28,60 L52,60 L52,52 Q56,44 56,36" stroke="#3B8700" stroke-width="1.5" fill="#58CC02" opacity="0.08"> <animate attributeName="d" values="M24,36 L24,36 Q24,36 28,36 L52,36 L52,36 Q56,36 56,36;M24,36 L24,36 Q24,44 28,52 L28,60 L52,60 L52,52 Q56,44 56,36" dur="3s" repeatCount="indefinite"/> </path> <rect x="30" y="14" width="20" height="20" rx="2" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"> <animate attributeName="y" values="14;30;14" dur="3s" repeatCount="indefinite"/> </rect> <text x="40" y="26" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">punch</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">deep drawing</text> </svg>',

          explanation: "During deep drawing, thickness changes do occur. The blank thins at the punch nose radius and thickens at the flange. Excessive thinning at the punch radius leads to tearing.",
          hint: "To the material at different locations: the punch nose.",
        },
        {
          id: 'u7-L3-Q17',
          type: 'multiple-choice',
          question: "What is the primary difference between hot forging and cold forging?",
          options: [
            "Hot forging uses hammers while cold forging uses presses",
            "Hot forging is above recrystallization temp, lower forces, no hardening",
            "Cold forging produces weaker parts because the metal is not heated,",
            "Hot forging is only for steel, cold forging is only for aluminum",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Left half — grip + shoulder + gauge end --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <!-- Right half (mirror) --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <!-- Gauge section (necks then fractures) --> <path fill="#58CC02" opacity="0.1"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> </path> <path stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.5"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> <animate attributeName="opacity" values="0.5;0.5;0.5;0;0;0.5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </path> <!-- Necking stress concentration zone --> <ellipse cx="40" cy="40" rx="8" ry="5" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.1;0.18;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="ry" values="5;5;3;1;1;5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </ellipse> <!-- Gauge length marks (spread apart during test) --> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <!-- Gauge length bracket --> <line y1="30" y2="30" stroke="#3B8700" stroke-width="0.5" opacity="0.15"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <text x="40" y="28" text-anchor="middle" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">L₀</text> <!-- Fracture flash (X mark) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0;0.7;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.68;0.71;0.73;0.8;1"/> <line x1="37" y1="36" x2="43" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> <line x1="43" y1="36" x2="37" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> </g> <!-- Force arrows (pull apart) --> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="14,40 9,37 9,43;8,40 3,37 3,43;2,40 -3,37 -3,43;0,40 -5,37 -5,43;0,40 -5,37 -5,43;14,40 9,37 9,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="66,40 71,37 71,43;72,40 77,37 77,43;78,40 83,37 83,43;80,40 85,37 85,43;80,40 85,37 85,43;66,40 71,37 71,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <!-- F labels near arrows --> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="10;5;0;0;0;10" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="70;75;80;80;80;70" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> </svg>',
          explanation: "Hot forging: lower flow stress, larger deformations possible, no work hardening, but poorer tolerances due to scale, thermal expansion, and die wear. Cold forging (room temperature): higher forces required, limited deformation before cracking, work hardening occurs, but excellent surface finish (Ra 0.5-3 μm), tight tolerances (±0.05 mm), and improved strength from strain hardening.",
          hint: "The recrystallization temperature is the dividing line."
        },
        {
          id: 'u7-L3-Q18',
          type: 'multiple-choice',
          question: "A coarse grain structure at the center and finer grains near the surface. The center also has some microporosity and compositional variation. What causes these differences?",
          options: [
            "The mold material contaminated the surface differently from the center",
            "The casting was heat-treated unevenly after solidification,",
            "The pouring temperature was too high at the center but correct at the surface",
            "The surface cooled faster (chill zone/columnar zone with finer grains),",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Casting solidification produces three zones: (1) Chill zone. (2) Columnar zone.",
          hint: "The cooling rate varies from surface (fast) to center."
        },
        {
          id: 'u7-L3-Q19',
          type: 'multiple-choice',
          question: "What is the extrusion ratio? Typical values for aluminum?",
          options: [
            "The ratio of container temperature to billet temperature, typically 0.8:1",
            "The ratio of ram speed to the extrusion exit speed",
            "Ratio of initial billet area to final extrudate area",
            "The ratio of extrusion length to billet length",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="8" y="20" width="30" height="36" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <path d="M38,20 L50,30 L50,46 L38,56" stroke="#3B8700" stroke-width="1.5" fill="#3B8700" opacity="0.08"/> <rect x="50" y="30" width="24" height="16" rx="1" fill="#58CC02" opacity="0.12" stroke="#3B8700" stroke-width="1"/> <g opacity="0.3"> <line x1="2" y1="38" x2="8" y2="38" stroke="#3B8700" stroke-width="1.5"/> <polygon points="7,36 11,38 7,40" fill="#3B8700"/> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <text x="23" y="42" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">A₀</text> <text x="62" y="42" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">A_f</text> <text x="40" y="70" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">R = A₀/A_f</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">extrusion ratio</text> </svg>',

          explanation: "Extrusion ratio R = A_billet/A_extrudate. For aluminum alloys, ratios of 10:1 to 100:1 are common (some reach 400:1 for soft alloys). Higher ratios require greater force and generate more heat.",
          hint: "The extrusion ratio measures how much the cross-section."
        },
      ]
    },
    {
      id: 'u7-L3c',
      title: 'Casting and Forming Defects',
      description: 'Porosity, hot tears, grain flow, DFM for cast/formed parts.',
      icon: '📝',
      xpReward: 35,
      levels: 4,
      questions: [
        {
          id: 'u7-L3c-EZ1',
          type: 'true-false',
          question: 'Forged parts generally have better fatigue life than cast parts of the same shape.',
          correctAnswer: true,
          explanation: 'Yes. Forging creates aligned grain flow and eliminates porosity, both of which improve fatigue resistance.',
          hint: 'Think about internal defects and grain structure.',
        },
        {
          id: 'u7-L3-Q20',
          type: 'true-false',
          question: "In sand casting, cores form internal cavities or holes.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="20" width="60" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <ellipse cx="40" cy="38" rx="14" ry="10" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5" stroke-dasharray="2,2"/> <text x="40" y="42" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.25" font-style="italic">core</text> <text x="40" y="18" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">mold</text> <g opacity="0.2"> <line x1="10" y1="36" x2="26" y2="36" stroke="#58CC02" stroke-width="0.8"/> <line x1="54" y1="36" x2="70" y2="36" stroke="#58CC02" stroke-width="0.8"/> </g> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">internal cavity</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">core prints support</text> </svg>',

          explanation: "Cores are pre-formed shapes placed inside the mold cavity to create internal features that cannot be formed by the pattern alone. Cores must have adequate strength to resist metal pressure, sufficient permeability to allow gas escape, and enough collapsibility to break down as the casting cools and contracts.",
          hint: "how you would create a hollow cylinder by casting.",
        },
        {
          id: 'u7-L3-Q21',
          type: 'multiple-choice',
          question: "A zinc die casting for a small, high-volume consumer electronics housing. What is the main advantage of zinc alloys (Zamak) over aluminum for small die castings?",
          options: [
            "Zinc is lighter than aluminum, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "Zinc has better corrosion resistance than aluminum",
            "Zinc die casting allows thinner walls (0.5-1 mm vs. 1.5-2 mm for aluminum)",
            "Zinc die castings can be welded more easily",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="18" width="52" height="36" rx="3" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/> <rect x="20" y="24" width="40" height="24" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1"/> <text x="40" y="38" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">Zn part</text> <g opacity="0.3"> <line x1="4" y1="36" x2="14" y2="36" stroke="#3B8700" stroke-width="1.2"/> <polygon points="12,34 16,36 12,38" fill="#3B8700"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1.5s" repeatCount="indefinite"/> </g> <text x="40" y="62" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">low melt point</text> <text x="40" y="70" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">thin walls, fine detail</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.12" font-style="italic">high volume</text> </svg>',

          explanation: "Zinc alloys (Zamak 3, 5, 7) melt at ~385°C vs. ~660°C for aluminum, causing much less thermal fatigue in the die, zinc dies last 500k-2M shots vs. 50k-200k for aluminum.",
          hint: "The melting temperatures and what that means for die."
        },
        {
          id: 'u7-L3-Q22',
          type: 'multiple-choice',
          question: "In open-die forging of a cylindrical billet (upsetting), barreling occurs. What causes barreling?",
          options: [
            "Barreling is caused by gravity pulling the metal outward",
            "Friction between the billet",
            "Barreling is caused by uneven heating",
            "Barreling results from the elastic springback of the billet after forging",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="24" y="8" width="32" height="8" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.5"/> <rect x="24" y="60" width="32" height="8" rx="1" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.5"/> <path d="M30,16 Q24,38 30,60 L50,60 Q56,38 50,16 Z" fill="#58CC02" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/> <g opacity="0.3"> <polygon points="38,4 40,0 42,4" fill="#3B8700"/> <polygon points="38,72 40,76 42,72" fill="#3B8700"/> <line x1="40" y1="0" x2="40" y2="8" stroke="#3B8700" stroke-width="1"/> <line x1="40" y1="68" x2="40" y2="76" stroke="#3B8700" stroke-width="1"/> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <text x="62" y="40" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">barrel</text> <text x="18" y="40" font-size="3" fill="#3B8700" opacity="0.15" font-style="italic">friction</text> </svg>',

          explanation: "During upsetting, friction at the die-billet interface restricts lateral expansion at the top and bottom faces, creating a \"dead zone\" of minimal deformation. The mid-height, free of friction, flows outward more, producing the barrel shape.",
          hint: "Where is friction highest in an upsetting operation."
        },
        {
          id: 'u7-L3c-T1',
          type: 'teaching',
          question: 'Grain Flow in Forgings',
          explanation: 'Forging aligns the grain structure along the part\'s shape, like wood grain in a baseball bat. This grain flow makes forgings stronger and more fatigue-resistant than castings or machined bar stock, especially in the direction of loading.',
          hint: 'Try this now: think about why a forged crankshaft outlasts a cast one.',
        },
        {
          id: 'u7-L3-Q23',
          type: 'fill-blank',
          question: "The total shrinkage has three components: liquid contraction, solidification shrinkage, and solid-state _____.",
          blanks: ['contraction'],
          wordBank: ['contraction', 'expansion', 'distortion', 'oxidation', 'porosity'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Original specimen (dashed outline) --> <rect x="28" y="14" width="24" height="52" rx="1" stroke-width="0.5" stroke="#3B8700" opacity="0.2" stroke-dasharray="2,2"/> <!-- Deformed specimen (narrower, taller) --> <rect x="30" y="10" width="20" height="60" rx="1" stroke-width="0.8" stroke="#58CC02" fill="#A5E86C" fill-opacity="0.06"> <animate attributeName="x" values="29;31;29" dur="3s" repeatCount="indefinite"/> <animate attributeName="width" values="22;18;22" dur="3s" repeatCount="indefinite"/> <animate attributeName="y" values="12;8;12" dur="3s" repeatCount="indefinite"/> <animate attributeName="height" values="56;64;56" dur="3s" repeatCount="indefinite"/> </rect> <!-- Axial tension arrows --> <g opacity="0.5"> <line x1="40" y1="6" x2="40" y2="2" stroke-width="0.6" stroke="#58CC02"/> <polygon points="38.5,2 41.5,2 40,0" fill="#58CC02"/> <line x1="40" y1="74" x2="40" y2="78" stroke-width="0.6" stroke="#58CC02"/> <polygon points="38.5,78 41.5,78 40,80" fill="#58CC02"/> <text x="44" y="4" font-size="3" fill="#58CC02">F</text> <text x="44" y="78" font-size="3" fill="#58CC02">F</text> </g> <!-- Lateral contraction arrows --> <g opacity="0.35"> <line x1="22" y1="40" x2="26" y2="40" stroke-width="0.5" stroke="#3B8700"> <animate attributeName="x2" values="25;28;25" dur="3s" repeatCount="indefinite"/> </line> <polygon points="26,38.8 26,41.2 28,40" fill="#3B8700"> <animate attributeName="points" values="25,38.8 25,41.2 27,40;28,38.8 28,41.2 30,40;25,38.8 25,41.2 27,40" dur="3s" repeatCount="indefinite"/> </polygon> <line x1="58" y1="40" x2="54" y2="40" stroke-width="0.5" stroke="#3B8700"> <animate attributeName="x2" values="55;52;55" dur="3s" repeatCount="indefinite"/> </line> <polygon points="54,38.8 54,41.2 52,40" fill="#3B8700"> <animate attributeName="points" values="55,38.8 55,41.2 53,40;52,38.8 52,41.2 50,40;55,38.8 55,41.2 53,40" dur="3s" repeatCount="indefinite"/> </polygon> </g> <!-- Dimension labels --> <text x="16" y="42" font-size="3" fill="#3B8700" opacity="0.4">ε_lat</text> <text x="7" y="40" font-size="3" fill="#58CC02" opacity="0.5">ε_ax</text> <!-- Formula --> <text x="40" y="76" text-anchor="middle" font-size="4.5" fill="#58CC02" opacity="0.45">ν = −ε_lat / ε_ax</text> </svg>',
          explanation: "Total casting shrinkage occurs in three stages: (1) Liquid contraction. (2) Solidification shrinkage.",
          hint: "After the metal solidifies, it continues to shrink as."
        },
        {
          id: 'u7-L3-Q24',
          type: 'multiple-choice',
          question: "Purpose and main components of a gating system in sand casting?",
          options: [
            "Delivers molten metal into mold cavity via sprue, runner, and gates",
            "The gating system mechanically holds the mold halves together",
            "The gating system is the pattern used to form the mold cavity",
            "The gating system removes trapped gases from inside the mold",
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="66" x2="12" y2="8" stroke-width="0.6" stroke="#58CC02"/> <line x1="12" y1="66" x2="74" y2="66" stroke-width="0.6" stroke="#58CC02"/> <text x="7" y="10" font-size="3.5" fill="#58CC02" text-anchor="middle">σ</text> <text x="74" y="72" font-size="3.5" fill="#58CC02" text-anchor="middle">ε</text> <!-- Steel (steep slope) --> <line x1="12" y1="66" x2="34" y2="14" stroke-width="0.8" stroke="#58CC02" opacity="0.7"/> <text x="20" y="30" font-size="2.5" fill="#58CC02" opacity="0.5" transform="rotate(-67,20,30)">steel</text> <!-- Aluminum (medium slope) --> <line x1="12" y1="66" x2="48" y2="18" stroke-width="0.8" stroke="#A5E86C" opacity="0.6"/> <text x="36" y="34" font-size="2.5" fill="#A5E86C" opacity="0.5" transform="rotate(-56,36,34)">aluminum</text> <!-- Polymer (gentle slope) --> <line x1="12" y1="66" x2="68" y2="30" stroke-width="0.8" stroke="#3B8700" opacity="0.4"/> <text x="52" y="44" font-size="2.5" fill="#3B8700" opacity="0.4" transform="rotate(-40,52,44)">polymer</text> <!-- E slope indicator on steel --> <line x1="16" y1="58" x2="26" y2="58" stroke-width="0.3" stroke="#3B8700" opacity="0.3"/> <line x1="26" y1="58" x2="26" y2="38" stroke-width="0.3" stroke="#3B8700" opacity="0.3"/> <text x="28" y="50" font-size="2.5" fill="#3B8700" opacity="0.35">E</text> <!-- Animated loading dot --> <circle r="2" fill="#58CC02" opacity="0.5"> <animate attributeName="cx" values="12;34;12" dur="3s" repeatCount="indefinite"/> <animate attributeName="cy" values="66;14;66" dur="3s" repeatCount="indefinite"/> </circle> <!-- Values --> <text x="60" y="10" font-size="2.5" fill="#58CC02" opacity="0.35">E_steel ≈ 200 GPa</text> <text x="60" y="16" font-size="2.5" fill="#A5E86C" opacity="0.35">E_Al ≈ 70 GPa</text> <!-- Formula --> <text x="50" y="62" font-size="3.5" fill="#58CC02" opacity="0.4" text-anchor="middle">E = σ/ε</text> </svg>',
          explanation: "The gating system controls the flow of metal into the mold. Pouring basin: receives metal and reduces turbulence. Sprue: vertical channel from basin to parting line (tapered to prevent aspiration).",
          hint: "The gating system is the plumbing that gets molten."
        },
        {
          id: 'u7-L3-Q25',
          type: 'true-false',
          question: "Wire drawing is compressive because the die squeezes the wire.",
          correctAnswer: false,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M30,28 L40,36 L40,44 L30,52" stroke="#3B8700" stroke-width="2" fill="#3B8700" opacity="0.1"/> <rect x="6" y="32" width="24" height="16" rx="1" fill="#58CC02" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <rect x="40" y="36" width="30" height="8" rx="1" fill="#58CC02" opacity="0.15" stroke="#3B8700" stroke-width="1"/> <g opacity="0.4"> <line x1="70" y1="40" x2="78" y2="40" stroke="#3B8700" stroke-width="1.5"/> <polygon points="76,38 80,40 76,42" fill="#3B8700"/> <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <text x="76" y="36" font-size="4" fill="#3B8700" opacity="0.25" font-style="italic">F</text> <text x="35" y="42" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">die</text> <text x="40" y="64" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">tensile pull</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">wire drawing</text> </svg>',

          explanation: "Although the deformation zone inside the die involves compressive stresses, wire drawing is classified as a TENSILE forming process because the pulling force (drawing force) on the exit side is what drives the wire through the die. The bulk stress state in the workpiece is tensile.",
          hint: "What drives the wire through the die."
        },
        {
          id: 'u7-L3c-SB1',
          type: 'sort-buckets',
          question: 'Sort these casting defects by root cause',
          options: [
            'Shrinkage cavity',
            'Hot tear',
            'Misrun',
            'Cold shut',
            'Porosity from dissolved gas',
            'Metal penetration'
          ],
          buckets: ['Solidification/shrinkage', 'Filling/pouring'],
          correctBuckets: [0, 0, 1, 1, 0, 1],
          explanation: 'Shrinkage cavities, hot tears, and gas porosity relate to solidification. Misruns, cold shuts, and metal penetration relate to how the metal fills the mold.',
          hint: 'Does the defect happen during filling or during solidification?',
        },
        {
          id: 'u7-L3c-OS1',
          type: 'order-steps',
          question: 'Order the investment casting (lost-wax) steps',
          steps: [
            'Inject wax pattern',
            'Assemble wax tree',
            'Dip in ceramic slurry',
            'Burn out wax',
            'Pour molten metal'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Investment casting: make wax pattern, assemble tree, build ceramic shell, burn out wax, pour metal.',
          hint: 'The wax melts out to leave the mold cavity.',
        },
        {
          id: 'u7-L3-Q26',
          type: 'multiple-choice',
          question: "Why is aluminum harder to sand-cast than iron or bronze?",
          options: [
            "Aluminum has a higher melting point than iron",
            "Aluminum is too soft to cast",
            "Aluminum reacts with sand, dissolving the mold",
            "Aluminum shrinks more (7% vs. 3% for iron)",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Aluminum casting challenges: (1) High shrinkage (~7% volumetric) requires larger risers. (2) Tenacious Al₂O₃ oxide film traps inclusions, requires careful pouring, filters, and fluxing.",
          hint: "aluminum's oxide behavior, gas solubility.",
        },
        {
          id: 'u7-L3-Q27',
          type: 'multiple-choice',
          question: "Used to produce sheet metal brackets at high volume. What is the key feature of progressive stamping?",
          options: [
            "The part is formed in a single stroke of the press using one simple die",
            "A strip of sheet metal feeds through a series of stations in a single die set",
            "The die progressively increases in temperature to soften the metal,",
            "The press applies progressively increasing force over multiple strokes on the same part, assuming uniform property distribution through the thickness without any processing-induced gradients",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="4" y="32" width="72" height="6" rx="0" fill="#58CC02" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <rect x="8" y="14" width="14" height="16" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <rect x="28" y="14" width="14" height="16" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <rect x="48" y="14" width="14" height="16" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <g opacity="0.3"> <polygon points="14,10 15,6 16,10" fill="#3B8700"/> <polygon points="34,10 35,6 36,10" fill="#3B8700"/> <polygon points="54,10 55,6 56,10" fill="#3B8700"/> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1s" repeatCount="indefinite"/> </g> <line x1="4" y1="38" x2="76" y2="38" stroke="#3B8700" stroke-width="1.5" opacity="0.3"/> <polygon points="74,36 78,38 74,40" fill="#3B8700" opacity="0.2"/> <text x="15" y="52" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2">Stn 1</text> <text x="35" y="52" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2">Stn 2</text> <text x="55" y="52" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2">Stn 3</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">progressive die</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">strip advances</text> </svg>',

          explanation: "Progressive dies combine multiple operations in sequential stations within a single die set. The sheet metal strip feeds forward by a precise pitch distance with each press stroke.",
          hint: "Multiple operations happen in sequence as the strip."
        },
        {
          id: 'u7-L3-Q28',
          type: 'multiple-choice',
          question: "Shrink fit vs press fit: assembly method difference?",
          options: [
            "They are identical assembly methods with different names",
            "A shrink fit is used for shafts and a press fit is used for bearings only",
            "Shrink fit uses thermal expansion/contraction for assembly",
            "A press fit is always a permanent and irreversible assembly",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="24" cy="36" r="16" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <circle cx="24" cy="36" r="8" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1"/> <circle cx="58" cy="36" r="16" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"> <animate attributeName="r" values="18;16;16" dur="3s" repeatCount="indefinite"/> </circle> <circle cx="58" cy="36" r="8" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1"/> <text x="24" y="62" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">press fit</text> <text x="58" y="62" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">shrink fit</text> <text x="24" y="70" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.15" font-style="italic">force</text> <text x="58" y="70" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.15" font-style="italic">heat+cool</text> </svg>',

          explanation: "Both produce an interference fit where the shaft is slightly larger than the hole. Press fit: the parts are forced together at ambient temperature.",
          hint: "One uses force, the other uses temperature change."
        },
        {
          id: 'u7-L3-Q29',
          type: 'true-false',
          question: "In metal forming, flow stress increases with temperature.",
          correctAnswer: false,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/> <text x="44" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">ε</text> <text x="7" y="36" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">σ</text> <path d="M16,18 Q28,20 40,22 Q56,24 68,26" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <path d="M16,34 Q28,38 40,40 Q56,42 68,44" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <text x="72" y="24" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">cold</text> <text x="72" y="42" font-size="3.5" fill="#A5E86C" opacity="0.25" font-style="italic">hot</text> <text x="40" y="58" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">flow stress ↓ with T ↑</text> </svg>',

          explanation: "Flow stress DECREASES with increasing temperature. Higher temperature provides more thermal energy for dislocation movement and activates diffusion-based recovery mechanisms, reducing the resistance to plastic deformation.",
          hint: "why we heat metals before forging them.",
        },
        {
          id: 'u7-L3-Q30',
          type: 'fill-blank',
          question: "In forging, excess material between die halves at the _____ line is called _____.",
          blanks: ['parting', 'flash'],
          wordBank: ['parting', 'flash', 'shear', 'burr', 'trim', 'draft'],

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M10,38 L30,38 Q40,38 40,24 L40,18" stroke="#3B8700" stroke-width="1.5" fill="#3B8700" opacity="0.08"/> <path d="M10,42 L30,42 Q40,42 40,56 L40,62" stroke="#3B8700" stroke-width="1.5" fill="#3B8700" opacity="0.08"/> <rect x="30" y="28" width="30" height="24" rx="2" fill="#58CC02" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <line x1="26" y1="40" x2="64" y2="40" stroke="#A5E86C" stroke-width="1" stroke-dasharray="2,2" opacity="0.3"/> <rect x="60" y="36" width="14" height="8" rx="0" fill="#58CC02" opacity="0.15" stroke="#3B8700" stroke-width="0.8"/> <text x="67" y="42" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.25" font-style="italic">flash</text> <text x="20" y="36" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">parting</text> <text x="20" y="46" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">line</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">forging flash</text> </svg>',

          explanation: "Flash is the thin fin of excess metal forced out between the die halves in closed-die (impression-die) forging at the parting line. The flash land creates high resistance to flow, forcing metal to fill the die cavity completely before escaping.",
          hint: "This thin fin of excess material around the parting."
        },
      ]
    },
    {
      id: 'u7-L4',
      title: 'Turning, Milling, and Drilling',
      description: 'Basic machining operations, cutting parameters.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u7-L4-T1',
          type: 'teaching',
          question: 'Turning, Milling, and Drilling',
          explanation: 'In turning, the workpiece spins while a single-point tool removes material (lathes). In milling, a rotating multi-tooth cutter moves across a stationary workpiece. Drilling uses a rotating bit to make holes. The 3 key cutting parameters are speed (m/min), feed (mm/rev), and depth of cut (mm).',
          hint: 'Climb milling (cutter rotation matches feed direction) gives a better finish than conventional milling.',
        },
        {
          id: 'u7-L4-EZ1',
          type: 'true-false',
          question: 'In turning, the workpiece rotates while the cutting tool stays mostly stationary.',
          correctAnswer: true,
          explanation: 'Yes. The lathe spins the workpiece. The tool moves linearly to shape it.',
          hint: 'Turning happens on a lathe.',
        },
        {
          id: 'u7-L4-Q1',
          type: 'multiple-choice',
          question: 'Facing a large-diameter workpiece from the outside edge toward the center. If the spindle speed is held constant (G97), what happens to the cutting conditions as the tool moves inward?',
          options: [
            'Cutting speed increases toward the center',
            'Cutting speed decreases toward the center',
            'Feed rate increases toward the center',
            'Nothing changes: cutting speed is independent of diameter',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'Cutting speed V = π × D × N. At constant RPM (G97), as the tool moves inward and the effective cutting diameter decreases, the surface speed drops proportionally.',
          hint: 'V = πDN. If N is constant and D decreases.'
                },
        {
          id: 'u7-L4-Q2',
          type: 'multiple-choice',
          question: 'Which type of milling generally produces a better surface finish and is preferred when machine rigidity allows?',
          options: [
            'Conventional (up) milling: cutter rotates against feed direction',
            'Climb (down) milling: cutter rotates with feed direction',
            'Both produce identical surface finish',
            'Slot milling with full engagement',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'Climb milling produces better surface finish because the chip starts thick and ends thin, reducing rubbing at the exit. It also generates lower cutting forces in the feed direction and produces less heat at the cutting edge.',
          hint: 'One method starts with maximum chip thickness and the.'
                },
        {
          id: 'u7-L4-Q3',
          type: 'true-false',
          question: 'BUE during machining protects the tool and improves surface finish.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'Built-up edge is generally undesirable. BUE forms when work material welds to the cutting edge at intermediate speeds and temperatures.',
          hint: 'what happens when the BUE breaks away, where does it go?',
                },
        {
          id: 'u7-L4-T1b',
          type: 'teaching',
          question: 'Cutting Speed, Feed, and Depth',
          explanation: 'Cutting speed (m/min) is how fast the tool edge moves across the workpiece. Feed (mm/rev) is how far the tool advances per revolution. Depth of cut (mm) is how deep the tool bites. Speed affects tool life most, depth of cut affects force most.',
          hint: 'Doubling cutting speed roughly halves tool life (Taylor equation).',
        },
        {
          id: 'u7-L4-Q4',
          type: 'multiple-choice',
          question: 'That tool life has dropped dramatically on a job that was running fine last month. The material, tooling, and program are unchanged. Walk through your troubleshooting process. What is the most likely root cause?',
          options: [
            'The cutting tool material has degraded in storage',
            'The CNC machine\'s spindle bearings have worn',
            'The workpiece material batch has changed',
            'The coolant has become diluted over time',
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'When everything seems the same but tool life drops, the most common culprit is a material batch change. Different heats of the same grade can vary significantly in hardness (±10-15%), microstructure, and inclusion content.',
          hint: 'The key phrase is "unchanged", but is the incoming.'
                },
        {
          id: 'u7-L4-Q5',
          type: 'multiple-choice',
          question: 'Reduce cycle time on a turning operation. They can either increase cutting speed by 30% or increase feed rate by 30%. Both reduce cycle time similarly. Based on Taylor\'s tool life equation, which approach preserves tool life better and why?',
          options: [
            'Increasing speed is better',
            'Both affect tool life equally',
            'Increasing feed rate is better',
            'Increasing feed rate is worse',
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'Taylor\'s equation VT^n = C shows that tool life is extraordinarily sensitive to cutting speed. For carbide tools (n ≈ 0.25), the sensitivity exponent is 1/n = 4, meaning a 30% speed increase reduces tool life by a factor of (1/1.3)^4 ≈ 0.35.',
          hint: 'The exponents: speed enters Taylor\'s equation with.'
                },
        {
          id: 'u7-L4-Q6',
          type: 'fill-blank',
          question: 'Surface roughness in turning depends on feed rate (f) and tool _____ radius.',
          blanks: ['nose'],
          wordBank: ['nose', 'flank', 'shank', 'relief', 'rake'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'The theoretical arithmetic average roughness in turning is approximately Ra ≈ f²/(32 × r), where f is the feed per revolution and r is the tool nose radius. A larger nose radius or smaller feed produces a better finish.05–0.15 mm/rev) and tools with large nose radii (0.8–1.6 mm).',
          hint: 'The formula is Ra ≈ f²/(32r). What is r?'
                },
        {
          id: 'u7-L4-MP1',
          type: 'match-pairs',
          question: 'Match each machining operation to its setup',
          options: ['Turning', 'Milling', 'Drilling', 'Grinding'],
          matchTargets: [
            'Workpiece spins, single-point tool',
            'Rotating multi-tooth cutter',
            'Rotating two-flute bit',
            'Abrasive wheel, fine finish'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'In turning the work rotates. In milling the cutter rotates. Drilling uses a two-flute rotating bit. Grinding uses an abrasive wheel for precision.',
          hint: 'Which part rotates: the tool or the workpiece?',
        },
        {
          id: 'u7-L4-SB1',
          type: 'sort-buckets',
          question: 'Sort these into conventional vs climb milling',
          options: [
            'Cutter opposes feed direction',
            'Better surface finish',
            'Chip starts thin, exits thick',
            'Cutter moves with feed direction',
            'Chip starts thick, exits thin',
            'Preferred on CNC machines'
          ],
          buckets: ['Conventional milling', 'Climb milling'],
          correctBuckets: [0, 1, 0, 1, 1, 1],
          explanation: 'Conventional milling: cutter opposes feed, chip goes thin-to-thick. Climb milling: cutter moves with feed, chip goes thick-to-thin, giving better finish.',
          hint: 'Climb milling is preferred when the machine has no backlash.',
        },
        {
          id: 'u7-L4-T2',
          type: 'teaching',
          question: 'Tool Life and Surface Finish',
          explanation: 'Taylor\'s tool life equation (VT^n = C) relates cutting speed to how long a tool lasts. Higher speed means shorter tool life. Surface roughness in turning follows Ra = f^2/(32r), where f is feed rate and r is the tool nose radius. Smaller feed or bigger nose radius gives a smoother finish.',
          hint: 'Increasing feed rate hurts tool life less than increasing cutting speed.',
        },
        {
          id: 'u7-L4-Q7',
          type: 'multiple-choice',
          question: "VTⁿ=C, n=0.25. 20% speed increase: tool life changes by what factor?",
          options: [
            "Tool life increases by 20%, under standard conditions",
            "Tool life decreases by a factor of about 0.48 (approximately halved)",
            "Tool life decreases by a factor of about 0.41 (approximately 59% reduction)",
            "Tool life decreases by 20%, independent of strain rate",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "From VTⁿ = C: T = (C/V)^(1/n). If V increases by 20% (factor 1.2): T_new/T_old = (1/1.2)^(1/0.25) = (0.833)^4 = 0.482...",
          hint: "The relationship T_new/T_old = (V_old/V_new)^(1/n)."
        },
        {
          id: 'u7-L4-Q8',
          type: 'multiple-choice',
          question: "What is the primary purpose of cutting fluid in machining operations?",
          options: [
            "Only to wash away chips from the cutting zone",
            "Only to increase the surface hardness of the workpiece",
            "To cool the cutting zone, reducing thermal wear and distortion",
            "To prevent the workpiece from rusting during machining",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Plate with hole --> <rect x="8" y="18" width="64" height="44" rx="1" stroke-width="0.8" stroke="#58CC02" fill="#58CC02" fill-opacity="0.03"/> <!-- Central hole --> <circle cx="40" cy="40" r="8" stroke-width="0.8" stroke="#58CC02" fill="white"/> <!-- Stress flow lines (curving around hole) --> <g stroke="#58CC02" stroke-width="0.4" opacity="0.35"> <path d="M8,24 Q30,24 32,34 Q34,38 32,42 Q30,52 8,56" fill="none"/> <path d="M8,28 Q28,28 33,36 Q34,38 33,42 Q28,50 8,52" fill="none"/> <path d="M8,36 Q26,36 32,38 Q34,40 32,42 Q26,44 8,44" fill="none"/> <path d="M72,24 Q50,24 48,34 Q46,38 48,42 Q50,52 72,56" fill="none"/> <path d="M72,28 Q52,28 47,36 Q46,38 47,42 Q52,50 72,52" fill="none"/> <path d="M72,36 Q54,36 48,38 Q46,40 48,42 Q54,44 72,44" fill="none"/> </g> <!-- Stress concentration zones (top and bottom of hole) --> <g fill="#A5E86C" opacity="0.2"> <ellipse cx="40" cy="32" rx="4" ry="2"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </ellipse> <ellipse cx="40" cy="48" rx="4" ry="2"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </ellipse> </g> <!-- Tension arrows --> <g opacity="0.5"> <line x1="2" y1="40" x2="7" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="2,38.5 2,41.5 -1,40" fill="#58CC02"/> <line x1="78" y1="40" x2="73" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="78,38.5 78,41.5 81,40" fill="#58CC02"/> <text x="-2" y="43" font-size="3" fill="#58CC02">σ</text> <text x="78" y="43" font-size="3" fill="#58CC02">σ</text> </g> <!-- Kt label --> <text x="40" y="14" text-anchor="middle" font-size="4" fill="#58CC02" opacity="0.5">K_t = σ_max/σ_nom</text> <!-- Max stress indicator --> <text x="40" y="30" font-size="2.5" fill="#A5E86C" opacity="0.4" text-anchor="middle">σ_max</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">notch effect</text> </svg>',
          explanation: "Cutting fluids serve three primary functions: (1) Cooling. (2) Lubrication.",
          hint: "Cutting fluid has three major roles, not just one."
        },
        {
          id: 'u7-L4-Q9',
          type: 'true-false',
          question: "G00 is the rapid positioning command (non-cutting move) and G01 is the linear interpolation command (cutting move at a specified feed rate).",
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "G00 (rapid traverse) moves the tool as fast as possible to a specified position. The machine moves each axis at maximum speed, so the path may not be a straight line.",
          hint: "G00 = fast positioning (no cutting)."
        },
      ]
    },
    {
      id: 'u7-L4b',
      title: 'Tool Wear and Surface Finish',
      description: 'Tool life, crater/flank wear, surface roughness.',
      icon: '📝',
      xpReward: 35,
      levels: 4,
      questions: [
        {
          id: 'u7-L4b-EZ1',
          type: 'true-false',
          question: 'Tool wear increases as cutting speed increases.',
          correctAnswer: true,
          explanation: 'Correct. Higher speed means more heat at the tool tip, which accelerates wear.',
          hint: 'Speed and heat are directly related.',
        },
        {
          id: 'u7-L4-Q10',
          type: 'multiple-choice',
          question: "To cut a full-depth slot in aluminum using a 10 mm diameter end mill. What is the main risk?",
          options: [
            "Risk of premature tool breakage from excessive forces",
            "Risk of the workpiece melting from excessive cutting heat",
            "Risk of poor surface finish due to excessive vibration",
            "Full slotting doubles chip load, restricts evacuation",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Full slotting engages the entire tool diameter, meaning each flute takes a full-width chip. Chips cannot escape sideways and are re-cut, generating heat and causing premature wear.",
          hint: "Full engagement means the tool is buried in material on."
        },
        {
          id: 'u7-L4-Q11',
          type: 'multiple-choice',
          question: "Three main types of tool wear in cutting. Which is most desirable to manage?",
          options: [
            "Corrosion, erosion, and abrasion",
            "Flank wear, crater wear, and nose radius wear",
            "Edge chipping, thermal cracking, and plastic deformation",
            "Adhesion, diffusion, and oxidation: these only occur in dry machining,",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M14,50 L40,50 L40,20 L60,20" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <path d="M40,50 L40,20" stroke="#3B8700" stroke-width="2.5"/> <path d="M36,26 Q38,30 40,30" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <path d="M40,44 Q44,44 44,46" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <text x="30" y="24" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">crater</text> <text x="50" y="50" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">flank</text> <circle cx="40" cy="35" r="2" fill="#58CC02" opacity="0.15"> <animate attributeName="opacity" values="0.1;0.25;0.1" dur="1.5s" repeatCount="indefinite"/> </circle> <text x="48" y="36" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">nose</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">tool wear zones</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">flank wear preferred</text> </svg>',

          explanation: "The three primary wear modes: (1) Flank wear: abrasion on the relief face from rubbing against the machined surface. Progressive and predictable: used as the standard tool life criterion.",
          hint: "One wear mode progresses gradually and predictably."
        },
        {
          id: 'u7-L4-Q12',
          type: 'multiple-choice',
          question: "In turning, the surface roughness (Ra) is theoretically calculated as Ra ≈ f²/(32r). A finishing pass requires Ra ≤ 1.6 μm with a tool nose radius of 0.8 mm. What is the maximum feed rate?",
          options: [
            "f ≤ 0.20 mm/rev",
            "f ≤ 0.10 mm/rev",
            "f ≤ 0.05 mm/rev",
            "f ≤ 0.40 mm/rev",
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Ra = f²/(32r) → f = √(32 × r × Ra) = √(32 × 0.8 × 0.0016) = √(0.04096) = 0.2024 mm/rev ≈ 0.20 mm/rev. So the maximum feed is approximately 0.20 mm/rev.15-0.18 mm/rev) because actual Ra is higher than theoretical due to BUE, vibration, and workpiece material effects.",
          hint: "Rearrange Ra = f²/(32r) to solve for f."
        },
        {
          id: 'u7-L4b-T1',
          type: 'teaching',
          question: 'Tool Wear Mechanisms',
          explanation: 'Flank wear is gradual abrasion on the clearance face. Crater wear is chemical erosion on the rake face from hot chips. Built-up edge (BUE) is work material welding to the tool tip at low speeds. Each mechanism has a different fix.',
          hint: 'Increase speed to eliminate BUE. Use coated inserts to reduce crater wear.',
        },
        {
          id: 'u7-L4-Q13',
          type: 'fill-blank',
          question: "G02 = _____ circular arc, G03 = _____ circular arc.",
          blanks: ['clockwise', 'counterclockwise'],
          wordBank: ['clockwise', 'counterclockwise', 'linear', 'helical', 'rapid'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "G02 = clockwise circular interpolation. G03 = counterclockwise circular interpolation.",
          hint: "G02 and G03 are the two circular interpolation commands."
        },
        {
          id: 'u7-L4-Q14',
          type: 'multiple-choice',
          question: "Drilling a 20 mm diameter hole in 4140 steel. The recommended cutting speed is 25 m/min. What spindle speed should be used?",
          options: [
            "N = 1592 RPM",
            "N = 796 RPM",
            "N = 250 RPM",
            "N = 398 RPM",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="40" cy="34" r="18" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <circle cx="40" cy="34" r="2" fill="#3B8700" opacity="0.3"/> <line x1="40" y1="34" x2="58" y2="34" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/> <text x="50" y="32" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">D</text> <g> <line x1="40" y1="16" x2="44" y2="14" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/> <animateTransform attributeName="transform" type="rotate" from="0 40 34" to="360 40 34" dur="2s" repeatCount="indefinite"/> </g> <text x="40" y="62" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">N = 1000V/(πD)</text> <text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">V = 25 m/min</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.12" font-style="italic">D = 20 mm</text> </svg>',

          explanation: "N = 1000V/(πD) = 1000 × 25/(π × 20) = 25000/62.83 = 397.9 ≈ 398 RPM. For drilling, the cutting speed is at the outer diameter of the drill.",
          hint: "N = 1000V/(πD) where V is in m/min and D is in mm."
        },
        {
          id: 'u7-L4-Q15',
          type: 'multiple-choice',
          question: "Roughing vs finishing: cutting parameters and objectives?",
          options: [
            "Roughing uses carbide tools and finishing always uses HSS tools",
            "Roughing is done on a lathe and finishing on a milling machine",
            "Roughing: high MRR with deep cuts; finishing: optimizes surface",
            "There is no practical difference",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Roughing: high depth of cut (2-8 mm), high feed rate (0.3-0.8 mm/rev), moderate speed. Goal: remove bulk material as fast as possible.",
          hint: "Different objectives require different parameter strategies."
        },
        {
          id: 'u7-L4b-MP1',
          type: 'match-pairs',
          question: 'Match each wear type to where it occurs on the tool',
          options: ['Flank wear', 'Crater wear', 'Built-up edge', 'Notch wear'],
          matchTargets: ['Clearance face', 'Rake face', 'Tool tip', 'Depth-of-cut line'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Flank wear is on the clearance face. Crater wear forms on the rake face from hot chips. BUE welds to the tip. Notch wear occurs at the depth-of-cut boundary.',
          hint: 'Each wear type has a specific location on the cutting tool.',
        },
        {
          id: 'u7-L4b-OS1',
          type: 'order-steps',
          question: 'Order these surface finishes from roughest to smoothest',
          steps: ['Rough turning', 'Finish turning', 'Cylindrical grinding', 'Lapping/polishing'],
          correctOrder: [0, 1, 2, 3],
          explanation: 'Rough turning is coarsest, then finish turning, then grinding, and lapping/polishing gives the smoothest surface (mirror finish).',
          hint: 'Each process removes less material and leaves a finer surface.',
        },
        {
          id: 'u7-L4-Q16',
          type: 'true-false',
          question: "Ceramic tools are ideal for interrupted cuts due to high toughness.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Ceramic tools (Al₂O₃, Si₃N₄) are BRITTLE. They are NOT suited for interrupted cutting because the thermal and mechanical shock causes edge chipping and fracture.",
          hint: "Ceramics are very hard but very brittle."
        },
        {
          id: 'u7-L4-Q17',
          type: 'multiple-choice',
          question: "What is tool length compensation (G43) and why is it needed?",
          options: [
            "It adjusts the spindle speed to compensate for tool diameter differences",
            "It offsets the Z-axis (tool axis) position to account for different tool lengths",
            "It measures tool wear during cutting and adjusts automatically",
            "It compensates for thermal expansion of the tool during cutting",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="32" y="8" width="16" height="40" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/> <rect x="36" y="48" width="8" height="8" rx="0" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="1"/> <rect x="10" y="58" width="60" height="10" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <line x1="62" y1="8" x2="62" y2="56" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2" opacity="0.2"/> <polygon points="60,8 64,8 62,5" fill="#3B8700" opacity="0.2"/> <polygon points="60,56 64,56 62,59" fill="#3B8700" opacity="0.2"/> <text x="68" y="34" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">H</text> <text x="40" y="30" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">tool</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">G43 offset</text> </svg>',

          explanation: "Each tool in the magazine has a different length. Without compensation, the programmer would need to calculate Z positions for each specific tool.",
          hint: "Different tools have different lengths."
        },
        {
          id: 'u7-L4-Q18',
          type: 'multiple-choice',
          question: "What is chatter in machining, what causes it, and how can it be eliminated?",
          options: [
            "Chatter is the normal sound of any metal cutting operation",
            "Chatter is caused by incorrect coolant pressure or flow rate",
            "Chatter is caused by dull tools that need sharpening or replacing",
            "Self-excited tool-workpiece vibration from regenerative feedback",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Regenerative chatter occurs when the tool cuts over a surface left wavy by the previous revolution/tooth. Phase differences between successive waves can amplify vibration.",
          hint: "Self-excited vibration feeds back through the waviness."
        },
        {
          id: 'u7-L4-Q19',
          type: 'multiple-choice',
          question: "H7 tolerance hole (25.000-25.021 mm). Operation sequence?",
          options: [
            "Drill to 25 mm: drilling alone can achieve H7, typically a minor contributing factor",
            "Drill 24.5 mm → bore 24.9 mm → ream to 25H7 progressively",
            "Drill to 25 mm → hone to H7",
            "Punch the hole in a press: fastest and most accurate method",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "H7 tolerance (21 μm range) requires a sequence of progressively more accurate operations: (1) Drill to ~24.5 mm.2 mm) and rough finish, but establish the hole position. (2) Bore to ~24.9 mm.",
          hint: "Achieving tight tolerances requires progressive refinement."
        },
        {
          id: 'u7-L4-Q20',
          type: 'true-false',
          question: "In CNC milling, cutter radius compensation (G41/G42) allows the programmer to program the actual part contour",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M16,20 L60,20 L60,56 L16,56 Z" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.3"/> <path d="M12,20 L64,20 L64,56 L12,56 Z" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.2" stroke-dasharray="2,2"/> <circle cx="40" cy="20" r="4" fill="#58CC02" opacity="0.15" stroke="#3B8700" stroke-width="1"> <animate attributeName="cx" values="20;60;60;20;20" dur="4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;20;56;56;20" dur="4s" repeatCount="indefinite"/> </circle> <text x="40" y="40" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">part</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">G41/G42</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">cutter comp</text> </svg>',

          explanation: "Without cutter compensation, the programmer must calculate an offset path that keeps the tool center the correct distance from the part wall. G41 (left compensation) and G42 (right compensation) allow programming the actual part geometry; the CNC controller shifts the tool path outward by the cutter radius stored in the D offset register.",
          hint: "The programmer programs the part shape."
        },
      ]
    },
    {
      id: 'u7-L4c',
      title: 'CNC and Process Planning',
      description: 'G-code basics, speeds and feeds, process selection.',
      icon: '📝',
      xpReward: 40,
      levels: 4,
      questions: [
        {
          id: 'u7-L4-T3',
          type: 'teaching',
          question: 'CNC Programming Essentials',
          explanation: 'CNC machines follow G-code instructions. G00 is rapid positioning (non-cutting move), G01 is linear cutting at a set feed rate, and G02/G03 cut circular arcs. G96 activates constant surface speed mode, which automatically adjusts RPM as diameter changes during facing.',
          hint: 'Cutter compensation (G41/G42) lets you program the actual part shape instead of the tool center path.',
        },
        {
          id: 'u7-L4c-EZ1',
          type: 'true-false',
          question: 'CNC machines follow programmed instructions to move the cutting tool.',
          correctAnswer: true,
          explanation: 'Yes. CNC (computer numerical control) reads G-code and M-code to automate tool motion.',
          hint: 'CNC replaced manual machine operation.',
        },
        {
          id: 'u7-L4-Q21',
          type: 'multiple-choice',
          question: "Why use coated carbide inserts (TiN, TiAlN) vs uncoated?",
          options: [
            "Coatings make the insert look more professional",
            "Coatings increase the toughness of the carbide substrate,",
            "Coatings (3-15 μm thick) provide a hard, low-friction",
            "Coatings eliminate the need for cutting fluid",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Modern coated carbide inserts use thin layers (3-15 μm): TiN: general purpose, gold color, reduces friction. TiCN: harder, better wear resistance for steel.",
          hint: "Thin coatings of ceramic-like materials provide wear."
        },
        {
          id: 'u7-L4-Q22',
          type: 'multiple-choice',
          question: "What is the difference between a 3-axis, 4-axis, and 5-axis CNC milling machine?",
          options: [
            "3-axis can only drill, 4-axis can mill, 5-axis can do both",
            "3-axis: X/Y/Z linear; 4-axis adds one rotary; 5-axis adds two rotary",
            "3/4/5-axis refers to the number of tools that can be used simultaneously",
            "The numbers refer to the maximum number of workpieces that can be machined at once",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "3-axis (X, Y, Z): the tool can approach the workpiece from one direction. 4-axis adds rotation about one axis: allows continuous machining of cylindrical/wrapped features.",
          hint: "Each additional axis adds rotational freedom."
        },
        {
          id: 'u7-L4-Q23',
          type: 'fill-blank',
          question: "The material removal rate (MRR) in turning is calculated as MRR = V × f × d, where V is cutting speed, f is feed rate (mm/rev), and d is the depth of _____.",
          blanks: ['cut'],
          wordBank: ['cut', 'pass', 'bore', 'thread', 'groove'],

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="20" y="22" width="44" height="32" rx="10" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <g> <animateTransform attributeName="transform" type="rotate" from="0 42 38" to="360 42 38" dur="2s" repeatCount="indefinite"/> <line x1="42" y1="22" x2="42" y2="26" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> </g> <path d="M64,34 L70,30 L70,46 L64,42" fill="#3B8700" opacity="0.2" stroke="#3B8700" stroke-width="1"/> <line x1="64" y1="38" x2="56" y2="38" stroke="#A5E86C" stroke-width="0.8" opacity="0.2"/> <polygon points="58,37 54,38 58,39" fill="#A5E86C" opacity="0.2"/> <text x="42" y="60" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">MRR = V·f·d</text> <text x="42" y="70" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">V=speed f=feed</text> <text x="42" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.12" font-style="italic">d=depth of cut</text> </svg>',

          explanation: "MRR = V × f × d (mm³/min) where V = cutting speed (mm/min), f = feed per revolution (mm/rev), d = depth of cut (mm). For unit consistency, V = πDN (mm/min).",
          hint: "This is the radial engagement of the tool."
        },
        {
          id: 'u7-L4c-T1',
          type: 'teaching',
          question: 'CNC Coordinate Systems',
          explanation: 'CNC machines use G-codes for motion (G00 rapid, G01 linear feed, G02/G03 arcs) and M-codes for machine functions (M03 spindle on, M05 spindle off, M08 coolant on). Programs define tool paths in X, Y, Z coordinates.',
          hint: 'Try this now: trace what G01 X50 Y25 F200 would do on a milling machine.',
        },
        {
          id: 'u7-L4-Q24',
          type: 'multiple-choice',
          question: "That the workpiece temperature is rising significantly during a dry turning operation on stainless steel. What is the primary concern and the best corrective action?",
          options: [
            "The workpiece might melt, stop machining operations immediately",
            "Hot chips pose a safety hazard to the machine operator",
            "Thermal expansion causes dimensional errors, reduce heat input",
            "High temperature is actually beneficial for material removal",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Stainless steel has low thermal conductivity, so heat concentrates at the cutting zone. A 100°C workpiece temperature rise on a 200 mm diameter part causes approximately 0.03 mm growth per 100 mm length (α = 16 μm/m°C), which can easily exceed tight tolerances.",
          hint: "Stainless steel has low thermal conductivity."
        },
        {
          id: 'u7-L4-Q25',
          type: 'true-false',
          question: "Electrical discharge machining (EDM) can only machine electrically conductive materials because it relies on spark erosion between the tool electrode and the workpiece.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="30" y="8" width="20" height="24" rx="1" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1.5"/> <rect x="24" y="44" width="32" height="22" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <g opacity="0.4"> <line x1="36" y1="32" x2="34" y2="44" stroke="#A5E86C" stroke-width="1" stroke-linecap="round"/> <line x1="40" y1="32" x2="40" y2="44" stroke="#A5E86C" stroke-width="1.2" stroke-linecap="round"/> <line x1="44" y1="32" x2="46" y2="44" stroke="#A5E86C" stroke-width="1" stroke-linecap="round"/> <animate attributeName="opacity" values="0.1;0.5;0.1" dur="0.8s" repeatCount="indefinite"/> </g> <text x="40" y="22" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">electrode</text> <text x="40" y="58" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">workpiece</text> <text x="40" y="38" text-anchor="middle" font-size="3" fill="#A5E86C" opacity="0.2" font-style="italic">spark</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">EDM (conductive)</text> </svg>',

          explanation: "EDM uses electrical sparks (discharges) between a tool electrode and the workpiece, submerged in dielectric fluid. Each spark melts and vaporizes a tiny amount of workpiece material.",
          hint: "The process requires an electrical circuit through the."
        },
        {
          id: 'u7-L4-Q26',
          type: 'multiple-choice',
          question: "In CNC machining, what does a work coordinate system (WCS) such as G54 define?",
          options: [
            "The type of cutting tool to be used for that operation",
            "The coolant flow rate: though appealing as an explanation",
            "The spindle speed (RPM) for the specific machining operation",
            "The part zero (program origin) relative to machine home",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Work coordinate systems define where the part zero point is located relative to the machine reference point. The operator sets these by touching off on the workpiece.",
          hint: "The WCS bridges the gap between where the machine."
        },
        {
          id: 'u7-L4c-SB1',
          type: 'sort-buckets',
          question: 'Sort these G-codes by function',
          options: ['G00', 'G01', 'G02', 'G28', 'G90', 'G41'],
          buckets: ['Motion commands', 'Machine setup commands'],
          correctBuckets: [0, 0, 0, 1, 1, 1],
          explanation: 'G00 (rapid), G01 (linear feed), and G02 (circular arc) are motion commands. G28 (home), G90 (absolute mode), and G41 (cutter compensation) are setup commands.',
          hint: 'Motion G-codes move the tool. Setup G-codes configure the machine.',
        },
        {
          id: 'u7-L4c-MP1',
          type: 'match-pairs',
          question: 'Match the machining parameter to its primary effect',
          options: ['Cutting speed', 'Feed rate', 'Depth of cut', 'Nose radius'],
          matchTargets: ['Tool life (Taylor equation)', 'Surface roughness', 'Cutting force', 'Surface finish quality'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Cutting speed most affects tool life. Feed rate most affects surface roughness. Depth of cut most affects cutting force. Larger nose radius improves surface finish.',
          hint: 'The Taylor equation relates cutting speed to tool life.',
        },
        {
          id: 'u7-L4-Q27',
          type: 'multiple-choice',
          question: "When machining titanium alloys (Ti-6Al-4V), what are the main challenges and recommended practices?",
          options: [
            "Titanium is soft and easy to machine with standard tooling",
            "Low thermal conductivity \u2014 heat concentrates at tool tip",
            "Titanium requires no coolant during any machining operation",
            "Titanium can only be machined by EDM or laser cutting",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Titanium is one of the most challenging metals to machine: (1) Low thermal conductivity (7 W/mK). (2) Chemical reactivity.",
          hint: "Titanium's low thermal conductivity and chemical."
        },
        {
          id: 'u7-L4-Q28',
          type: 'multiple-choice',
          question: "What is the function of a chip breaker on a cutting tool insert?",
          options: [
            "It increases the cutting speed by reducing friction",
            "It prevents the tool from breaking",
            "It curves and segments the chip into manageable pieces",
            "It lubricates the cutting zone by releasing oil stored in the grooves,",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M14,50 L40,50 L40,20 L60,20" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <path d="M40,24 Q36,28 38,32 Q40,34 42,30" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.3"/> <path d="M42,20 Q46,18 48,22 Q46,26 42,24 Q40,28 38,32" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1.5s" repeatCount="indefinite"/> </path> <text x="54" y="16" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">chip curls</text> <text x="54" y="22" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">&amp; breaks</text> <rect x="10" y="50" width="60" height="8" rx="1" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1"/> <text x="40" y="70" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">chip breaker</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">controls chip form</text> </svg>',

          explanation: "Long, continuous chips are dangerous and problematic. Chip breakers are grooves or obstacles molded into the insert rake face that curl and break chips into short, manageable segments.",
          hint: "Continuous chips are dangerous and difficult to manage."
        },
        {
          id: 'u7-L4-Q29',
          type: 'true-false',
          question: "In milling, the chip load (feed per tooth) can be calculated as fz = Vf / (N × z), where Vf is the table feed rate, N is the spindle speed, and z is the number of teeth on the cutter.",
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Chip load (feed per tooth, fz) determines the chip thickness each tooth removes: fz = Vf/(N × z).05-0.15 mm/tooth for end mills in steel, 0.1-0.25 mm/tooth in aluminum. The table feed rate Vf = fz × z × N is what gets programmed (F value in G-code).",
          hint: "Each tooth takes one bite per revolution."
        },
        {
          id: 'u7-L4-Q30',
          type: 'fill-blank',
          question: "The G96 command activates constant _____ speed mode, which automatically adjusts RPM as the diameter changes during facing operations.",
          blanks: ['surface'],
          wordBank: ['surface', 'spindle', 'feed', 'angular', 'linear'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "G96 S___ activates Constant Surface Speed (CSS) mode, where the controller continuously adjusts RPM to maintain the programmed surface speed (in m/min or ft/min) as the cutting diameter changes. Without CSS, the surface speed would drop toward center, causing poor finish and BUE.",
          hint: "V = πDN. To keep V constant while D changes."
        },
      ]
    },
    {
      id: 'u7-L5',
      title: 'Additive Manufacturing',
      description: '3D printing processes: FDM, SLA, SLS, DMLS.',
      icon: '📝',
      xpReward: 25,
      levels: 4,
      questions: [
        {
          id: 'u7-L5-T1',
          type: 'teaching',
          question: 'Additive Manufacturing (3D Printing)',
          explanation: 'Additive manufacturing builds parts layer by layer instead of cutting material away. FDM extrudes melted plastic filament. SLA cures liquid resin with UV light. SLS sinters powder with a laser. For metals, DMLS/SLM fuses metal powder with a high-power laser. AM excels at complex geometries and low-volume production but parts are often weaker in the build direction.',
          hint: 'Metal AM parts almost always need post-build heat treatment to relieve residual stresses.',
        },
        {
          id: 'u7-L5-EZ1',
          type: 'true-false',
          question: 'Additive manufacturing builds parts by adding material layer by layer.',
          correctAnswer: true,
          explanation: 'Yes. Unlike machining (subtractive), AM adds material where needed.',
          hint: 'The name says it: additive.',
        },
        {
          id: 'u7-L5-Q1',
          type: 'multiple-choice',
          question: 'Your team is considering metal 3D printing (DMLS/SLM) for a titanium aerospace bracket currently machined from billet. The machined version wastes 90% of the raw material. What factors would you evaluate to decide if switching to additive manufacturing is justified?',
          options: [
            'Only the material savings: 90% waste means additive is automatically cheaper regardless of other factors, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications',
            'Material savings, build time, post-processing needs (heat treatment',
            'Just compare the per-part cost of printing vs. machining',
            'Additive is always justified for aerospace titanium',
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="50" width="52" height="8" rx="1" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1"/> <rect x="20" y="42" width="40" height="8" rx="0" fill="#3B8700" opacity="0.06"/> <line x1="38" y1="10" x2="30" y2="42" stroke="#A5E86C" stroke-width="1" opacity="0.3"/> <line x1="42" y1="10" x2="50" y2="42" stroke="#A5E86C" stroke-width="1" opacity="0.3"/> <circle cx="40" cy="10" r="3" fill="#58CC02" opacity="0.2"> <animate attributeName="opacity" values="0.1;0.3;0.1" dur="1s" repeatCount="indefinite"/> </circle> <line x1="20" y1="42" x2="60" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.3"> <animate attributeName="y1" values="42;42;34;34" dur="4s" repeatCount="indefinite"/> <animate attributeName="y2" values="42;42;34;34" dur="4s" repeatCount="indefinite"/> </line> <text x="40" y="8" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">laser</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">SLM / DMLS</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">layer by layer</text> </svg>',

          explanation: 'The decision is multifaceted. Material savings are significant for titanium ($50-$100/kg), but DMLS build rates are slow, and the part needs extensive post-processing: stress relief heat treatment, support structure removal, hot isostatic pressing (HIP) to close internal voids, and surface finishing of functional features.',
          hint: 'Material cost savings alone do not justify the switch.'
                },
        {
          id: 'u7-L5-Q2',
          type: 'multiple-choice',
          question: 'In injection molding, what is the primary reason for including draft angles on the vertical walls of a part?',
          options: [
            'To improve the flow of molten plastic into the mold cavity',
            'To allow the part to be ejected from the mold without damage or excessive force',
            'To reduce the overall part weight, particularly at elevated loads',
            'To prevent weld lines from forming, in all loading orientations',
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="34" width="52" height="30" rx="2" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <path d="M28,34 L26,10 L54,10 L52,34" fill="#58CC02" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="3s" repeatCount="indefinite"/> <path d="M28,34 L26,10 L54,10 L52,34" fill="#A5E86C" opacity="0.06" stroke="#3B8700" stroke-width="1"/> </g> <line x1="56" y1="10" x2="56" y2="34" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2" opacity="0.2"/> <text x="62" y="24" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">draft</text> <text x="40" y="52" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">mold</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">ejection ease</text> </svg>',

          explanation: 'Draft angles prevent the part from gripping the mold core as the plastic shrinks during cooling. Without draft, ejection requires excessive force, causing part deformation, surface scratching, or even breakage.',
          hint: 'When a cooled plastic part shrinks onto the mold core.',
                },
        {
          id: 'u7-L5-Q3',
          type: 'true-false',
          question: 'The minimum recommended inside bend radius for most ductile metals is equal to the material thickness (1T bend radius).',
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M10,50 L30,50 Q40,50 40,30 L40,16" stroke="#3B8700" stroke-width="2.5" fill="none" opacity="0.4"/> <line x1="40" y1="50" x2="40" y2="30" stroke="#A5E86C" stroke-width="0.5" stroke-dasharray="1.5,2" opacity="0.2"/> <line x1="40" y1="38" x2="30" y2="50" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <text x="30" y="40" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">R</text> <text x="48" y="50" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">t</text> <line x1="44" y1="46" x2="44" y2="54" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">R ≥ 1t</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">min bend radius</text> </svg>',

          explanation: 'For most ductile sheet metals, a minimum inside bend radius of 1T is a safe general rule that prevents cracking on the outer surface. Harder or less ductile materials may require 2T–4T or more.',
          hint: 'This is a standard DFM guideline.'
                },
        {
          id: 'u7-L5-T1b',
          type: 'teaching',
          question: 'Design for Additive Manufacturing',
          explanation: 'AM lets you create internal channels, lattice structures, and topology-optimized shapes that are impossible to machine. But parts need support structures for overhangs, and build orientation affects strength (weaker between layers).',
          hint: 'Orient the part so critical loads are in-plane with the layers, not perpendicular.',
        },
        {
          id: 'u7-L5-Q4',
          type: 'multiple-choice',
          question: 'A designer hands you a part drawing with uniform 3 mm wall thickness, sharp internal corners, and a deep narrow slot (1 mm wide × 15 mm deep). They want it injection molded in ABS. What DFM feedback would you give, and why?',
          options: [
            'The current design is perfectly fine for injection molding',
            'Only the wall thickness needs to change for proper molding',
            'Add corner radii and redesign the deep slot (hard to fill and eject)',
            'The whole part should be 3D printed instead of injection molded',
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="14" width="52" height="40" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <path d="M26,14 L26,38" stroke="#3B8700" stroke-width="0.5" opacity="0.3"/> <path d="M28,14 L28,38" stroke="#3B8700" stroke-width="0.5" opacity="0.3"/> <circle cx="26" cy="38" r="0" fill="none" stroke="#3B8700" stroke-width="0.5" opacity="0.3"/> <circle cx="50" cy="30" r="4" fill="none" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/> <line x1="50" y1="14" x2="50" y2="54" stroke="#A5E86C" stroke-width="0.5" stroke-dasharray="1,2" opacity="0.2"/> <g opacity="0.3"> <line x1="22" y1="40" x2="18" y2="44" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="18" y1="40" x2="22" y2="44" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> </g> <text x="26" y="50" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">sharp</text> <text x="26" y="56" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">corner</text> <text x="50" y="60" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">narrow slot</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">DFM issues</text> </svg>',

          explanation: 'This is a classic DFM review scenario. Sharp internal corners cause stress concentrations in both the molded part (cracking, warping) and the mold.',
          hint: 'what features create problems for the mold.',
                },
        {
          id: 'u7-L5-Q5',
          type: 'multiple-choice',
          question: 'The designer specified a tight tolerance (±0.01 mm) on a non-critical internal bore that interfaces with nothing. The machinist says this requires internal grinding, adding $15/part. How would you approach this conversation with the designer?',
          options: [
            'Accept the tolerance',
            'Override the designer and change it yourself to ±0.1 mm',
            'Ask designer about function; if non-critical, relax tolerance',
            'Escalate to management: tolerance disputes need higher-level resolution',
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="40" cy="34" r="16" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <circle cx="40" cy="34" r="10" fill="none" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.3"/> <line x1="40" y1="34" x2="50" y2="34" stroke="#3B8700" stroke-width="0.6" opacity="0.3"/> <text x="46" y="32" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">±0.01</text> <text x="40" y="62" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">non-critical bore</text> <text x="40" y="70" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">over-toleranced</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.12" font-style="italic">cost ↑</text> </svg>',

          explanation: 'This is a common DFM scenario. Many tight tolerances result from over-specification rather than functional need." The engineering approach is collaborative: ask what function or fit drives the requirement.',
          hint: 'The best approach combines technical inquiry (what.'
                },
        {
          id: 'u7-L5-Q6',
          type: 'fill-blank',
          question: 'Uneven wall thickness causes one side to cool and shrink faster than the other, pulling the part surface inward and creating a cosmetic defect called a _____ mark.',
          blanks: ['sink'],
          wordBank: ['sink', 'weld', 'flow', 'burn', 'knit'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Fixed wall (left) --> <rect x="4" y="24" width="6" height="32" rx="0.5" stroke-width="0.7" stroke="#58CC02" fill="#58CC02" fill-opacity="0.06"/> <g stroke="#58CC02" stroke-width="0.3" opacity="0.2"> <line x1="2" y1="26" x2="4" y2="28"/><line x1="2" y1="32" x2="4" y2="34"/> <line x1="2" y1="38" x2="4" y2="40"/><line x1="2" y1="44" x2="4" y2="46"/> <line x1="2" y1="50" x2="4" y2="52"/> </g> <!-- Fixed wall (right) --> <rect x="70" y="24" width="6" height="32" rx="0.5" stroke-width="0.7" stroke="#58CC02" fill="#58CC02" fill-opacity="0.06"/> <g stroke="#58CC02" stroke-width="0.3" opacity="0.2"> <line x1="76" y1="28" x2="78" y2="26"/><line x1="76" y1="34" x2="78" y2="32"/> <line x1="76" y1="40" x2="78" y2="38"/><line x1="76" y1="46" x2="78" y2="44"/> <line x1="76" y1="52" x2="78" y2="50"/> </g> <!-- Bar (constrained) --> <rect x="10" y="34" width="60" height="12" rx="1.5" stroke-width="0.8" stroke="#58CC02" fill="#A5E86C" fill-opacity="0.06"/> <!-- Temperature rise indication (color pulse) --> <rect x="11" y="35" width="58" height="10" rx="1" fill="#A5E86C" opacity="0.05"> <animate attributeName="opacity" values="0.03;0.15;0.03" dur="3s" repeatCount="indefinite"/> </rect> <!-- Attempted expansion arrows (blocked) --> <g opacity="0.35"> <line x1="14" y1="40" x2="10" y2="40" stroke-width="0.5" stroke="#3B8700"/> <polygon points="10,38.5 10,41.5 8,40" fill="#3B8700"/> <line x1="66" y1="40" x2="70" y2="40" stroke-width="0.5" stroke="#3B8700"/> <polygon points="70,38.5 70,41.5 72,40" fill="#3B8700"/> </g> <!-- Reaction compression arrows --> <g opacity="0.4"> <line x1="8" y1="40" x2="12" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="12,38.5 12,41.5 14,40" fill="#58CC02"/> <line x1="72" y1="40" x2="68" y2="40" stroke-width="0.6" stroke="#58CC02"/> <polygon points="68,38.5 68,41.5 66,40" fill="#58CC02"/> </g> <!-- ΔT indicator --> <text x="40" y="30" font-size="3.5" fill="#58CC02" opacity="0.4" text-anchor="middle">ΔT ↑</text> <!-- Temperature wavy lines --> <g opacity="0.2"> <path d="M20,52 Q22,48 24,52" stroke-width="0.4" stroke="#A5E86C" fill="none"> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="3s" repeatCount="indefinite"/> </path> <path d="M38,52 Q40,48 42,52" stroke-width="0.4" stroke="#A5E86C" fill="none"> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="3s" repeatCount="indefinite" begin="0.5s"/> </path> <path d="M56,52 Q58,48 60,52" stroke-width="0.4" stroke="#A5E86C" fill="none"> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="3s" repeatCount="indefinite" begin="1s"/> </path> </g> <!-- Formula --> <text x="40" y="64" font-size="3.5" fill="#58CC02" opacity="0.4" text-anchor="middle">σ = EαΔT</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">constrained expansion</text> </svg>',
          explanation: 'Sink marks are depressions on the surface of injection-molded parts caused by differential shrinkage. Thick sections cool more slowly than thin sections, and as the interior solidifies and shrinks, it pulls the already-solidified outer skin inward.',
          hint: 'This common injection molding defect appears as a.'
                },
        {
          id: 'u7-L5-MP1',
          type: 'match-pairs',
          question: 'Match each AM process to its material form',
          options: ['FDM', 'SLA', 'SLS', 'DMLS'],
          matchTargets: ['Plastic filament', 'Liquid resin', 'Polymer powder', 'Metal powder'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'FDM extrudes plastic filament. SLA cures liquid resin with UV. SLS sinters polymer powder with a laser. DMLS fuses metal powder with a laser.',
          hint: 'Each AM process uses a different material form and energy source.',
        },
        {
          id: 'u7-L5-OS1',
          type: 'order-steps',
          question: 'Order the metal AM (DMLS) workflow',
          steps: [
            'Prepare CAD model and supports',
            'Spread thin powder layer',
            'Laser fuses powder selectively',
            'Repeat layers until complete',
            'Stress-relieve and remove from plate'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'Metal AM starts with CAD prep, then builds layer by layer (spread, fuse, repeat), and finishes with heat treatment and removal.',
          hint: 'Post-processing is critical for metal AM parts.',
        },
        {
          id: 'u7-L5-T2',
          type: 'teaching',
          question: 'Injection Molding Basics',
          explanation: 'Injection molding melts plastic pellets and injects them under high pressure into a metal mold cavity. It\'s the go-to process for high-volume plastic parts. Key design rules: uniform wall thickness prevents warping and sink marks, draft angles let the part eject from the mold, and the gate is where plastic enters the cavity.',
          hint: 'Sink marks appear on thick sections because the interior shrinks as it cools.',
        },
        {
          id: 'u7-L5-Q7',
          type: 'multiple-choice',
          question: "What is the key difference between SLA (Stereolithography) and SLS (Selective Laser Sintering) in terms of material and support structures?",
          options: [
            "SLA and SLS use the same materials but different laser types",
            "SLA: UV-cured resin with supports; SLS: laser-sintered powder",
            "SLS requires support structures for all overhanging features",
            "SLA can only produce transparent or translucent finished parts",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="4" y="16" width="32" height="44" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <rect x="44" y="16" width="32" height="44" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <rect x="8" y="40" width="24" height="4" rx="0" fill="#3B8700" opacity="0.1"/> <line x1="14" y1="30" x2="28" y2="40" stroke="#A5E86C" stroke-width="1" opacity="0.3"> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1s" repeatCount="indefinite"/> </line> <rect x="48" y="36" width="24" height="8" rx="0" fill="#3B8700" opacity="0.08"/> <circle cx="60" cy="30" r="2" fill="#A5E86C" opacity="0.3"> <animate attributeName="cx" values="52;68" dur="2s" repeatCount="indefinite"/> </circle> <text x="20" y="14" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-weight="bold">SLA</text> <text x="60" y="14" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-weight="bold">SLS</text> <text x="20" y="68" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">liquid resin</text> <text x="60" y="68" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">powder bed</text> </svg>',

          explanation: "SLA: a UV laser selectively cures (polymerizes) layers of liquid photopolymer resin. Excellent resolution (25-50 μm layers) and smooth surfaces, but parts require support structures for overhangs, and post-curing under UV light.",
          hint: "One process works in a vat of liquid."
        },
        {
          id: 'u7-L5-Q8',
          type: 'multiple-choice',
          question: "Why are parts typically weaker in the Z-direction (build direction) compared to the X-Y plane?",
          options: [
            "The Z-axis motor is less powerful, applying less force in that direction",
            "Gravity pulls on each layer, stretching them in Z,",
            "Inter-layer bond is weaker than continuous filament within a layer",
            "The filament cools faster in the Z-direction",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="20" y="20" width="40" height="40" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <line x1="20" y1="28" x2="60" y2="28" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/> <line x1="20" y1="36" x2="60" y2="36" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/> <line x1="20" y1="44" x2="60" y2="44" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/> <line x1="20" y1="52" x2="60" y2="52" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/> <line x1="68" y1="56" x2="68" y2="24" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <polygon points="66,24 70,24 68,20" fill="#3B8700" opacity="0.3"/> <text x="72" y="42" font-size="4" fill="#3B8700" opacity="0.25" font-style="italic">Z</text> <line x1="24" y1="64" x2="56" y2="64" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <polygon points="56,62 56,66 60,64" fill="#3B8700" opacity="0.3"/> <text x="40" y="72" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.25" font-style="italic">X-Y</text> <text x="40" y="16" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">layers = weak Z</text> </svg>',

          explanation: "FDM builds parts layer by layer. Within each layer, the filament is continuous and relatively strong.",
          hint: "FDM parts are built by stacking fused layers."
        },
        {
          id: 'u7-L5-Q9',
          type: 'true-false',
          question: "Increasing the wall thickness uniformly throughout a part generally reduces cycle time because the thicker walls cool more uniformly.",
          correctAnswer: false,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="20" width="24" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <rect x="14" y="24" width="16" height="28" rx="1" fill="#3B8700" opacity="0.06"/> <rect x="46" y="20" width="24" height="36" rx="2" fill="#58CC02" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/> <rect x="48" y="22" width="20" height="32" rx="1" fill="#3B8700" opacity="0.1"/> <text x="22" y="42" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">thin</text> <text x="58" y="42" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">thick</text> <text x="22" y="66" text-anchor="middle" font-size="3" fill="#58CC02" opacity="0.25" font-style="italic">fast cool</text> <text x="58" y="66" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.25" font-style="italic">slow cool</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">thicker = longer cycle</text> </svg>',

          explanation: "Thicker walls INCREASE cycle time because cooling time increases approximately with the square of wall thickness (t_cool ∝ s²). Doubling wall thickness roughly quadruples the cooling time, which is typically the longest phase of the injection cycle.5-3 mm for most polymers), (2) uniform walls to prevent differential cooling, and (3) coring out thick sections.",
          hint: "Cooling time is proportional to the square of wall."
        },
      ]
    },
    {
      id: 'u7-L5b',
      title: 'Injection Molding and Sheet Metal',
      description: 'Mold design, gate placement, bending, DFM.',
      icon: '📝',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u7-L5-T3',
          type: 'teaching',
          question: 'Design for Manufacturing (DFM)',
          explanation: 'DFM means designing parts so they\'re easy and cheap to produce. For injection molding: keep wall thickness uniform, add draft angles, avoid sharp internal corners, and round out features. For sheet metal: respect minimum bend radii and keep holes away from bend lines. Unnecessary tight tolerances add cost.',
          hint: 'Always ask: does this tolerance actually matter for the part\'s function?',
        },
        {
          id: 'u7-L5b-EZ1',
          type: 'true-false',
          question: 'Injection molding is best suited for high-volume plastic part production.',
          correctAnswer: true,
          explanation: 'Correct. The high tooling cost is offset by very low per-part cost at high volumes.',
          hint: 'Molds are expensive but each shot is cheap.',
        },
        {
          id: 'u7-L5-Q10',
          type: 'multiple-choice',
          question: "What is the \"staircase effect\" in additive manufacturing, and how can it be minimized?",
          options: [
            "The tendency for parts to warp upward at the corners forming steps",
            "The tendency for supports to leave step-shaped marks on the part",
            "The increasing per-unit cost as production volume scales upward",
            "Stepped surface on curves from discrete layers, fix with thinner layers",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M20,60 L20,52 L28,52 L28,44 L36,44 L36,36 L44,36 L44,28 L52,28 L52,20 L60,20" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M20,60 Q40,40 60,20" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="2,2"/> <text x="64" y="18" font-size="3.5" fill="#A5E86C" opacity="0.25" font-style="italic">ideal</text> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">staircase</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">thinner layers = smoother</text> </svg>',

          explanation: "All layer-based AM processes approximate curves and angles as a series of discrete steps (stair-steps). The step height equals the layer thickness.",
          hint: "Layer-based building creates visible steps on angled."
        },
        {
          id: 'u7-L5-Q11',
          type: 'multiple-choice',
          question: "To injection mold a large flat panel (300 × 400 mm) in polycarbonate. What is the most likely defect?",
          options: [
            "The panel will be too heavy, reduce the thickness to 0.5 mm",
            "Warpage due to differential shrinkage",
            "The panel will crack during ejection",
            "Color inconsistency: use a larger gate",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M10,36 Q40,30 70,36" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <path d="M10,44 Q40,50 70,44" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <path d="M10,40 L70,40" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2" stroke-dasharray="2,2"/> <g opacity="0.25"> <line x1="30" y1="30" x2="30" y2="24" stroke="#3B8700" stroke-width="0.8"/> <polygon points="28,24 32,24 30,20" fill="#3B8700"/> <line x1="50" y1="50" x2="50" y2="56" stroke="#3B8700" stroke-width="0.8"/> <polygon points="48,56 52,56 50,60" fill="#3B8700"/> <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/> </g> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">warpage</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">large flat panel</text> </svg>',

          explanation: "Large flat panels are notoriously difficult to mold without warpage. Differential cooling between the cavity (outer) and core (inner) sides, non-uniform packing pressure from a single gate, and molecular orientation all cause the panel to warp.",
          hint: "Large flat parts have very low stiffness."
        },
        {
          id: 'u7-L5-Q12',
          type: 'multiple-choice',
          question: "What is Design for Assembly (DFA) and what is its primary objective?",
          options: [
            "DFA is a software tool for generating assembly drawings",
            "DFA systematically reduces the number of parts and simplifies assembly operations",
            "DFA is a quality inspection method performed during assembly",
            "DFA ensures each part is as complex as possible to maximize functionality",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="40" width="52" height="16" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="24" y="24" width="14" height="16" rx="1" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1"> <animate attributeName="y" values="10;24" dur="2s" repeatCount="indefinite"/> </rect> <rect x="44" y="24" width="14" height="16" rx="1" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1"> <animate attributeName="y" values="8;24" dur="2s" begin="0.5s" repeatCount="indefinite"/> </rect> <text x="40" y="50" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">base part</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">DFA</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">minimize part count</text> </svg>',

          explanation: "DFA evaluates each part using three criteria: (1) Must the part move relative to adjacent parts? (2) Must the part be a different material? (3) Must the part be separate for assembly/service? If none apply, combine it with an adjacent part. DFA analysis typically reduces part count by 30-60%, dramatically cutting assembly time and cost.",
          hint: "The core idea: every separate part costs money to."
        },
        {
          id: 'u7-L5b-T1',
          type: 'teaching',
          question: 'Injection Molding Basics',
          explanation: 'Injection molding melts plastic pellets and forces them into a steel mold cavity under high pressure. It produces consistent, high-volume parts with tight tolerances. Key design rules: uniform wall thickness, draft angles, and rounded corners.',
          hint: 'Thick sections cause sink marks. Thin sections may not fill completely.',
        },
        {
          id: 'u7-L5-Q13',
          type: 'fill-blank',
          question: "In injection molding, the point where molten plastic enters the mold cavity is called the _____.",
          blanks: ['gate'],
          wordBank: ['gate', 'sprue', 'runner', 'nozzle', 'vent'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "The gate is the small opening connecting the runner to the mold cavity. Gate types include: edge gate, submarine/tunnel gate, pin-point gate (3-plate molds), fan gate, and hot-tip/valve gate.",
          hint: "This is the entry point for plastic into the cavity."
        },
        {
          id: 'u7-L5-Q14',
          type: 'multiple-choice',
          question: "An engineer is comparing DMLS (Direct Metal Laser Sintering) and traditional CNC machining for a low-volume titanium component. Under what conditions would DMLS be the better choice?",
          options: [
            "DMLS is always cheaper than CNC for any titanium part",
            "When the part needs a mirror-like surface finish directly from manufacturing,",
            "When the part requires tight tolerances of ±0.01 mm or better",
            "When the part has complex internal channels, lattice structures",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="4" y="20" width="32" height="32" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <rect x="44" y="20" width="32" height="32" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <path d="M10,30 L14,26 L22,34 L30,28" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="20" y="46" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">DMLS</text> <rect x="50" y="28" width="20" height="16" rx="1" fill="#3B8700" opacity="0.06"/> <path d="M60,28 L60,44" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> <text x="60" y="46" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">CNC</text> <text x="20" y="62" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">complex OK</text> <text x="60" y="62" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">stronger</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">Ti bracket trade-off</text> </svg>',

          explanation: "DMLS excels when: (1) Geometry is too complex for subtractive manufacturing. (2) Buy-to-fly ratio for machining is extreme. (3) Volume is low, each part is unique or near-unique.",
          hint: "Additive manufacturing's advantage is geometric freedom."
        },
        {
          id: 'u7-L5-Q15',
          type: 'multiple-choice',
          question: "In sheet metal fabrication, what is a K-factor and why is it important for bend calculations?",
          options: [
            "K-factor is the spring constant of the sheet metal, used to calculate forces",
            "K-factor is the hardness correction factor for different metals",
            "K-factor locates the neutral axis in a bend as a thickness ratio",
            "K-factor is the safety factor used in sheet metal structural design",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M10,56 L34,56 Q40,56 40,40 L40,16" stroke="#3B8700" stroke-width="2.5" fill="none" opacity="0.4"/> <line x1="34" y1="56" x2="34" y2="16" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1,2" opacity="0.15"/> <line x1="34" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="0.8" opacity="0.3"/> <text x="44" y="42" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">t</text> <text x="28" y="40" font-size="3" fill="#A5E86C" opacity="0.25" font-style="italic">neutral</text> <text x="28" y="46" font-size="3" fill="#A5E86C" opacity="0.25" font-style="italic">axis</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">K = tₙ/t</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">bend allowance</text> </svg>',

          explanation: "The K-factor (typically 0.3-0.5) defines where the neutral axis sits within the sheet thickness during bending: t_neutral = K × t. For air bending of mild steel, K ≈ 0.33-0.40.",
          hint: "The neutral axis is not at the center of the sheet."
        },
        {
          id: 'u7-L5b-SB1',
          type: 'sort-buckets',
          question: 'Sort these design features by manufacturing friendliness',
          options: [
            'Uniform wall thickness',
            'Sharp internal corners',
            'Draft angles on walls',
            'Undercuts',
            'Generous fillets',
            'Zero-draft vertical walls'
          ],
          buckets: ['Good for injection molding', 'Bad for injection molding'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Uniform walls, draft angles, and fillets are injection molding friendly. Sharp corners, undercuts, and zero-draft walls cause problems.',
          hint: 'The part needs to release cleanly from the mold.',
        },
        {
          id: 'u7-L5b-MP1',
          type: 'match-pairs',
          question: 'Match each sheet metal term to its meaning',
          options: ['K-factor', 'Bend allowance', 'Springback', 'Minimum bend radius'],
          matchTargets: [
            'Neutral axis position ratio',
            'Arc length of the bend',
            'Elastic recovery after forming',
            'Smallest radius before cracking'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'K-factor locates the neutral axis. Bend allowance is the arc length consumed by the bend. Springback is elastic recovery. Minimum bend radius prevents cracking.',
          hint: 'These terms all relate to how sheet metal behaves during bending.',
        },
        {
          id: 'u7-L5-Q16',
          type: 'true-false',
          question: "Topology optimization uses software algorithms to determine the optimal material distribution within a design space, often producing organic-looking shapes that are ideally suited for additive manufacturing.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="16" width="28" height="20" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <text x="24" y="30" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">solid</text> <path d="M44,16 L62,16 Q72,16 72,26 L72,36 L62,36 Q52,36 52,26 L52,22 Q52,16 56,16" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <text x="58" y="30" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">optimized</text> <g opacity="0.25"> <line x1="38" y1="26" x2="44" y2="26" stroke="#3B8700" stroke-width="1"/> <polygon points="42,24 46,26 42,28" fill="#3B8700"/> </g> <text x="40" y="52" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">topology optimization</text> <text x="40" y="62" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">remove unnecessary</text> <text x="40" y="70" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">material</text> </svg>',

          explanation: "Topology optimization starts with a design space (maximum envelope), loads, constraints, and boundary conditions, then iteratively removes material from low-stress regions while maintaining structural requirements. The result is often an organic, bone-like structure that places material only where it is needed.",
          hint: "Algorithms distribute material optimally."
        },
        {
          id: 'u7-L5-Q17',
          type: 'multiple-choice',
          question: "In injection molding, what are weld lines (knit lines) and when do they form?",
          options: [
            "Weld lines are intentional reinforcement features molded into the part",
            "Weld lines form where two flow fronts meet (after flowing around a core, hole",
            "Weld lines are caused by excessive injection pressure cracking the mold",
            "Weld lines only occur in thermosetting materials, not thermoplastics,",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="16" width="52" height="40" rx="3" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <circle cx="20" cy="36" r="2" fill="#3B8700" opacity="0.3"/> <path d="M22,36 Q32,30 40,36 Q48,42 58,36" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.3"> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite"/> </path> <path d="M22,36 Q32,42 40,36 Q48,30 58,36" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.3"> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" begin="0.5s" repeatCount="indefinite"/> </path> <line x1="58" y1="20" x2="58" y2="52" stroke="#3B8700" stroke-width="1.5" opacity="0.3" stroke-dasharray="2,2"/> <text x="64" y="38" font-size="3" fill="#3B8700" opacity="0.25" font-style="italic">weld</text> <text x="64" y="44" font-size="3" fill="#3B8700" opacity="0.25" font-style="italic">line</text> <text x="20" y="36" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2">gate</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">flow fronts meet</text> </svg>',

          explanation: "When molten plastic flows around an obstacle (hole, boss, core) or from multiple gates, the flow fronts must rejoin. At the meeting point, if the fronts are too cool, molecules cannot intertwine properly, creating a visible line and mechanical weakness.",
          hint: "When two plastic flow fronts meet."
        },
        {
          id: 'u7-L5-Q18',
          type: 'multiple-choice',
          question: "What is the typical build orientation strategy for metal AM (DMLS/SLM) to minimize support structures and residual stress?",
          options: [
            "Always orient the part with the largest flat surface on the build plate",
            "Always orient vertically to minimize build time regardless of other factors",
            "Orientation does not matter in metal AM",
            "Orient to minimize overhangs below 45° from horizontal (self-supporting angle)",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="18" y="50" width="44" height="6" rx="1" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1"/> <path d="M24,50 L24,20 L56,20 L56,50" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.3"/> <path d="M30,50 L24,20" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2" stroke-dasharray="1.5,2"/> <text x="22" y="38" font-size="3" fill="#A5E86C" opacity="0.2" font-style="italic">support</text> <line x1="64" y1="50" x2="64" y2="20" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> <polygon points="62,20 66,20 64,16" fill="#3B8700" opacity="0.2"/> <text x="68" y="36" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">Z</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">build orientation</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">minimize supports</text> </svg>',

          explanation: "Metal AM build orientation profoundly affects: (1) Support structures. (2) Residual stress.",
          hint: "Overhangs, residual stress, surface quality."
        },
        {
          id: 'u7-L5-Q19',
          type: 'multiple-choice',
          question: "A boss (cylindrical protrusion for a screw) on an injection-molded part. What are the DFM guidelines for boss design?",
          options: [
            "Bosses should always be solid cylinders for maximum strength",
            "Make the boss wall thickness equal to the main wall to ensure strength",
            "Boss outer diameter should be 2-2.5× the screw diameter",
            "Boss height should not exceed the screw diameter,",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Boss DFM guidelines: (1) OD = 2-2.5× screw pilot hole diameter. (2) Wall thickness = 50-60% of adjacent wall. (3) Height ≤ 2-3× OD.",
          hint: "Boss wall thickness must be thin enough to avoid sink."
        },
      ]
    },
    {
      id: 'u7-L5c',
      title: 'Design for Manufacturing',
      description: 'Tolerances, process selection, cost considerations.',
      icon: '📝',
      xpReward: 35,
      levels: 4,
      questions: [
        {
          id: 'u7-L5c-EZ1',
          type: 'true-false',
          question: 'Higher production volume usually means lower cost per part.',
          correctAnswer: true,
          explanation: 'Yes. Fixed costs (tooling, setup) spread across more parts, reducing unit cost.',
          hint: 'Economy of scale.',
        },
        {
          id: 'u7-L5-Q20',
          type: 'true-false',
          question: "The minimum distance between a hole edge and a bend line should be at least 2-3 times the material thickness plus the bend radius to prevent the hole from distorting during bending.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <path d="M10,50 L36,50 Q44,50 44,34 L44,16" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <circle cx="24" cy="42" r="4" fill="none" stroke="#3B8700" stroke-width="1" opacity="0.3"/> <line x1="28" y1="42" x2="36" y2="50" stroke="#A5E86C" stroke-width="0.5" stroke-dasharray="1,1.5" opacity="0.3"/> <text x="32" y="40" font-size="3" fill="#3B8700" opacity="0.25" font-style="italic">≥2-3t+R</text> <line x1="36" y1="16" x2="36" y2="50" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2" opacity="0.15"/> <text x="38" y="58" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">bend line</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">hole-to-bend clearance</text> </svg>',

          explanation: "If a hole is too close to a bend line, the material deformation from bending distorts the hole. The minimum distance from the edge of the hole to the bend line should be ≥ 2-3T + R.",
          hint: "Bending deforms the material around the bend line."
        },
        {
          id: 'u7-L5-Q21',
          type: 'multiple-choice',
          question: "What are the main differences between hot runner and cold runner systems in injection molding?",
          options: [
            "Hot runner systems are simpler and cheaper than cold runner systems",
            "Cold runners produce better quality parts than hot runners",
            "Hot runners use heated manifolds to keep plastic molten",
            "Hot runners can only be used with thermosetting plastics",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="4" y="20" width="32" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <line x1="20" y1="20" x2="20" y2="36" stroke="#3B8700" stroke-width="1.5" opacity="0.3"/> <rect x="12" y="36" width="16" height="16" rx="1" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/> <rect x="44" y="20" width="32" height="36" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <line x1="60" y1="20" x2="60" y2="36" stroke="#58CC02" stroke-width="1.5" opacity="0.3"/> <rect x="52" y="36" width="16" height="16" rx="1" fill="#3B8700" opacity="0.06" stroke="#3B8700" stroke-width="1"/> <text x="20" y="64" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">cold runner</text> <text x="60" y="64" text-anchor="middle" font-size="3.5" fill="#58CC02" opacity="0.25" font-style="italic">hot runner</text> <text x="20" y="72" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.15" font-style="italic">waste</text> <text x="60" y="72" text-anchor="middle" font-size="3" fill="#58CC02" opacity="0.15" font-style="italic">no waste</text> </svg>',

          explanation: "Hot runner: the runner system is heated, keeping plastic molten. Advantages: no runner waste, faster cycles, better part quality.",
          hint: "One system keeps the runner plastic molten;"
        },
        {
          id: 'u7-L5-Q22',
          type: 'multiple-choice',
          question: "In metal 3D printing (SLM/DMLS), why is post-build heat treatment (stress relief) almost always required?",
          options: [
            "The metal powder is contaminated and needs purification",
            "Severe thermal gradients from layer-by-layer melting cause residual stress",
            "Heat treatment is optional and only done to change the color of the part",
            "The metal does not fully melt during printing and needs heat treatment to densify",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="20" width="52" height="28" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <line x1="14" y1="28" x2="66" y2="28" stroke="#3B8700" stroke-width="0.4" opacity="0.12"/> <line x1="14" y1="36" x2="66" y2="36" stroke="#3B8700" stroke-width="0.4" opacity="0.12"/> <g opacity="0.25"> <path d="M20,24 Q22,20 24,24" stroke="#3B8700" stroke-width="0.6"/> <path d="M36,32 Q38,28 40,32" stroke="#3B8700" stroke-width="0.6"/> <path d="M52,40 Q54,36 56,40" stroke="#3B8700" stroke-width="0.6"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </g> <text x="40" y="58" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">residual stress</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">→ heat treat</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">stress relief required</text> </svg>',

          explanation: "In SLM/DMLS, each laser pass melts a thin layer that solidifies and contracts rapidly. The constraint of the solid material below prevents free contraction, creating tensile stresses in the new layer and compressive stresses below.",
          hint: "Rapid solidification on top of previously solidified."
        },
        {
          id: 'u7-L5c-T1',
          type: 'teaching',
          question: 'Process Selection Strategy',
          explanation: 'Choose the manufacturing process based on material, volume, geometry, tolerance, and cost. Low volume favors machining or AM. High volume favors casting, forging, or injection molding. Tight tolerances favor machining or grinding.',
          hint: 'Try this now: pick a process for 100,000 aluminum brackets with 0.1 mm tolerance.',
        },
        {
          id: 'u7-L5-Q23',
          type: 'fill-blank',
          question: "The cosmetic defect that appears as thin, dark, meandering lines on the part surface, caused by trapped gases _____ at the end of fill, is called a _____ mark.",
          blanks: ['burning', 'burn'],
          wordBank: ['burning', 'burn', 'escaping', 'sink', 'compressing', 'weld'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: "Burn marks occur when air or gas trapped in the mold cavity is compressed by the advancing melt front. If the gas cannot escape through vents or the parting line, it heats up adiabatically (diesel effect) and burns the plastic, leaving brown/black marks.",
          hint: "Trapped gas compresses and heats up (like a diesel."
        },
        {
          id: 'u7-L5-Q24',
          type: 'multiple-choice',
          question: "What is the primary advantage of multi-jet fusion (MJF) over SLS for polymer part production?",
          options: [
            "MJF uses cheaper raw materials, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "MJF is faster for production quantities",
            "MJF can print metals",
            "MJF does not require any post-processing",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="20" width="52" height="32" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <rect x="18" y="36" width="44" height="12" rx="0" fill="#3B8700" opacity="0.06"/> <line x1="18" y1="30" x2="62" y2="30" stroke="#3B8700" stroke-width="0.8" opacity="0.2"/> <circle cx="30" cy="24" r="2" fill="#3B8700" opacity="0.2"> <animate attributeName="cx" values="22;58" dur="2s" repeatCount="indefinite"/> </circle> <text x="40" y="44" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">fusing agent</text> <text x="40" y="62" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">MJF</text> <text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">faster, finer detail</text> </svg>',

          explanation: "HP Multi Jet Fusion (MJF) deposits fusing agent (carbon black ink) on powder where it should melt, and detailing agent at boundaries for sharp edges. An infrared lamp then passes over the entire layer simultaneously, fusing all marked areas at once.",
          hint: "How each technology exposes each layer: a point."
        },
        {
          id: 'u7-L5-Q25',
          type: 'true-false',
          question: "Bend relief cuts are required at the end of a bend line that terminates at an edge or another feature, to prevent tearing of the material.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="20" width="60" height="36" rx="1" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <line x1="40" y1="20" x2="40" y2="56" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.2"/> <rect x="36" y="16" width="8" height="8" rx="0" fill="none" stroke="#A5E86C" stroke-width="1" opacity="0.3"/> <text x="44" y="14" font-size="3.5" fill="#A5E86C" opacity="0.25" font-style="italic">relief</text> <text x="44" y="20" font-size="3.5" fill="#A5E86C" opacity="0.25" font-style="italic">cut</text> <text x="30" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">bend line</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">prevents tearing</text> </svg>',

          explanation: "When a bend line intersects another feature, the material at the intersection experiences complex stress states and will tear or deform unpredictably without a relief. Bend relief cuts are small slots or notches placed at the ends of the bend line, typically with width ≥ material thickness and length extending slightly beyond the bend radius.",
          hint: "Without a relief, the material at the end of a bend."
        },
        {
          id: 'u7-L5c-SB1',
          type: 'sort-buckets',
          question: 'Sort by best manufacturing process match',
          options: [
            '1 prototype bracket',
            '500,000 plastic housings',
            '50 titanium aerospace parts',
            '10,000 aluminum engine blocks',
            'Custom lattice implant',
            'Million steel fasteners'
          ],
          buckets: ['Machining or AM', 'Casting or molding'],
          correctBuckets: [0, 1, 0, 1, 0, 1],
          explanation: 'Low volume, complex, or custom parts suit machining or AM. High volume production suits casting, molding, or forging.',
          hint: 'Volume is the biggest factor in process selection.',
        },
        {
          id: 'u7-L5c-OS1',
          type: 'order-steps',
          question: 'Order the injection molding cycle',
          steps: [
            'Close mold',
            'Inject molten plastic',
            'Pack and hold pressure',
            'Cool part in mold',
            'Open mold and eject'
          ],
          correctOrder: [0, 1, 2, 3, 4],
          explanation: 'The cycle: close, inject, pack/hold, cool, eject. Cooling time is usually the longest step.',
          hint: 'Packing pressure compensates for shrinkage during cooling.',
        },
        {
          id: 'u7-L5-Q26',
          type: 'multiple-choice',
          question: "An injection molder observes that parts are sticking in the mold cavity side instead of pulling out with the core side during mold opening. What is the most likely cause?",
          options: [
            "The plastic is too soft",
            "The injection pressure is set too high for this mold",
            "The mold is too hot, reduce mold temperature",
            "Insufficient draft angle on cavity surfaces",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Proper mold function requires the part to stay on the core (B) side during opening, because that is where the ejector pins push the part out. If the part stays on the cavity (A) side: (1) Check draft angles.",
          hint: "Parts naturally shrink onto the core."
        },
        {
          id: 'u7-L5-Q27',
          type: 'multiple-choice',
          question: "What is the significance of the glass transition temperature (Tg) in selecting polymers for injection molding applications?",
          options: [
            "Tg is the melting temperature of the polymer",
            "Tg marks the glassy-to-rubbery shift in amorphous regions",
            "Tg only applies to crystalline polymers, not amorphous ones",
            "Tg is the temperature of maximum crystallization rate",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/> <text x="44" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">T</text> <text x="7" y="36" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">V</text> <path d="M16,58 L36,42 L40,40" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <path d="M40,40 L60,16" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="65" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2" opacity="0.2"/> <circle cx="40" cy="40" r="2.5" fill="#3B8700" opacity="0.3"> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite"/> </circle> <text x="40" y="70" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">T_g</text> <text x="22" y="56" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">glassy</text> <text x="56" y="28" font-size="3" fill="#A5E86C" opacity="0.2" font-style="italic">rubbery</text> </svg>',

          explanation: "For amorphous polymers, Tg is essentially the maximum use temperature. Semi-crystalline polymers (nylon, POM, PE, PP) also have a Tg but can function above Tg up to near their melting point because the crystalline regions maintain structure.",
          hint: "Amorphous polymers go from rigid to rubbery at one key."
        },
        {
          id: 'u7-L5-Q28',
          type: 'multiple-choice',
          question: "A company currently CNC machines aluminum brackets in batches of 50. They are considering switching to FDM printing with carbon-fiber-filled nylon. What are the key technical trade-offs?",
          options: [
            "FDM is always the better manufacturing choice overall",
            "CNC aluminum is always better, 3D printing is only for prototypes",
            "FDM: lower per-part cost, no tooling, design freedom",
            "The only trade-off is the final surface finish quality",
          ],
          correctIndex: 2,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/> <text x="44" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">qty</text> <text x="7" y="36" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">$/part</text> <path d="M16,18 Q30,30 44,42 Q58,50 70,54" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.4"/> <path d="M16,48 L70,46" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.3"/> <text x="68" y="42" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">CNC</text> <text x="68" y="54" font-size="3.5" fill="#A5E86C" opacity="0.25" font-style="italic">FDM</text> <circle cx="44" cy="44" r="2" fill="#3B8700" opacity="0.3"> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite"/> </circle> </svg>',

          explanation: "CF-nylon FDM advantages: no tooling, rapid iteration, complex geometry, lower cost at 50 units. Disadvantages: tensile strength ~80-120 MPa vs. ~270 MPa for 6061-T6; stiffness ~6-10 GPa vs.",
          hint: "Specific mechanical properties, environmental resistance."
        },
        {
          id: 'u7-L5-Q29',
          type: 'true-false',
          question: "The clamping force must exceed the force generated by the injection pressure acting on the projected area of the part, otherwise the mold will open and cause flash.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="20" y="20" width="40" height="36" rx="2" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="28" y="28" width="24" height="20" rx="1" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1"/> <g opacity="0.35"> <line x1="14" y1="38" x2="20" y2="38" stroke="#3B8700" stroke-width="1.5"/> <polygon points="18,36 22,38 18,40" fill="#3B8700"/> <line x1="60" y1="38" x2="66" y2="38" stroke="#3B8700" stroke-width="1.5"/> <polygon points="62,36 58,38 62,40" fill="#3B8700"/> <animate attributeName="opacity" values="0.2;0.45;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <text x="10" y="46" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">F_c</text> <text x="40" y="40" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">cavity</text> <text x="40" y="66" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">F_c &gt; P·A</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">clamping force</text> </svg>',

          explanation: "The injection pressure acts on the projected area of the part and runner system, creating a force that tends to push the mold halves apart. If the clamping force is insufficient, the mold opens slightly, and plastic squeezes into the gap, creating flash.",
          hint: "The injection pressure pushes against the projected area."
        },
        {
          id: 'u7-L5-Q30',
          type: 'fill-blank',
          question: "The process of cutting a flat pattern from a sheet using a punch and die set is called _____ (also known as stamping or die cutting).",
          blanks: ['blanking'],
          wordBank: ['blanking', 'shearing', 'notching', 'piercing', 'trimming'],

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="32" width="60" height="6" rx="0" fill="#58CC02" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <rect x="30" y="12" width="20" height="20" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"> <animate attributeName="y" values="12;30;12" dur="2s" repeatCount="indefinite"/> </rect> <rect x="30" y="40" width="20" height="20" rx="1" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/> <rect x="32" y="42" width="16" height="16" rx="0" fill="#58CC02" opacity="0.08"/> <text x="40" y="26" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">punch</text> <text x="40" y="52" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">die</text> <text x="40" y="70" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">blanking</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">punch &amp; die</text> </svg>',

          explanation: "Blanking is a shearing process where the desired shape (the blank) is cut from the sheet. Both use the same principle, but they differ in which piece is the product.",
          hint: "This shearing operation produces a flat part (the."
        },
      ]
    },
    {
      id: 'u7-L6',
      title: 'Welding Processes',
      description: 'MIG, TIG, stick, laser welding fundamentals.',
      icon: '⚡',
      xpReward: 30,
      levels: 4,
      questions: [
        {
          id: 'u7-L6-T1',
          type: 'teaching',
          question: 'Welding Processes Overview',
          explanation: 'MIG (GMAW) feeds a solid wire electrode with shielding gas, great for speed and ease. TIG (GTAW) uses a non-consumable tungsten electrode with a separate filler rod, giving the cleanest, most precise welds. Stick (SMAW) uses a flux-coated electrode and works well outdoors. Each process suits different materials, thicknesses, and quality requirements.',
          hint: 'TIG is the go-to for stainless steel and aluminum when weld quality is critical.',
        },
        {
          id: 'u7-L6-EZ1',
          type: 'true-false',
          question: 'MIG welding uses a continuously fed wire electrode.',
          correctAnswer: true,
          explanation: 'Yes. MIG (GMAW) feeds a solid wire electrode through a gun, making it fast and easy to learn.',
          hint: 'MIG stands for metal inert gas.',
        },
        {
          id: 'u7-L6-Q1',
          type: 'multiple-choice',
          question: 'A fabrication shop must weld 6 mm thick 304 stainless steel panels for a food-processing vessel requiring high-quality, porosity-free welds with minimal spatter and excellent corrosion resistance in the weld zone. Which welding process is the best choice?',
          options: [
            'SMAW (stick) with E308L electrodes',
            'GTAW (TIG) with ER308L filler and argon shielding',
            'GMAW (MIG/MAG) with CO₂ shielding gas',
            'SAW (submerged arc): highest deposition rate but limited to flat/horizontal positions and overkill for 6 mm plate',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: 'GTAW (TIG) is the preferred process for stainless steel food-processing equipment because: (1) pure argon shielding prevents oxidation and carbon pickup that would degrade corrosion resistance, (2) precise heat control minimizes the HAZ and reduces sensitization, (3) no flux or spatter means the weld zone can meet sanitary finish requirements with minimal post-weld cleanup, and (4) ER308L filler (low carbon) further resists sensitization. SMAW produces acceptable structural welds but leaves slag and spatter.',
          hint: 'Gives the cleanest weld with the least contamination.',
                },
        {
          id: 'u7-L6-Q2',
          type: 'multiple-choice',
          question: 'About to join two plates of AISI 4140 steel (0.40% C, Cr-Mo alloy). You calculate the carbon equivalent (CE) at 0.72. What precautions must be taken before, during, and after welding, and why?',
          options: [
            'No special precautions: 4140 is a common structural steel that welds easily with any process, but industry experience indicates this factor plays only a minor role in the overall performance',
            'Preheat to 200-300°C to slow HAZ cooling and prevent martensite/cracking',
            'Use very high heat input to melt as much material as possible',
            'Weld at room temperature but use austenitic stainless filler wire',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: 'CE = 0.72 is well above the 0.45 threshold for hydrogen cracking risk. The high carbon and alloy content means the HAZ will form hard, brittle martensite unless cooling is slowed.',
          hint: 'A CE of 0.'
                },
        {
          id: 'u7-L6-Q3',
          type: 'multiple-choice',
          question: 'A welded pressure vessel fails a radiographic (RT) inspection. The film shows dark, rounded indications scattered within the weld. What is the most likely defect?',
          options: [
            'Lack of fusion: caused by insufficient heat input or improper joint preparation',
            'Porosity: caused by gas entrapment from moisture, contamination',
            'Slag inclusions: caused by improper inter-pass cleaning in multi-pass SMAW welds',
            'Hot cracking: caused by high sulfur or phosphorus content in the base metal',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'Dark, rounded indications on radiographic film are the classic signature of porosity. Lack of fusion appears as dark, linear indications with sharp edges.',
          hint: 'Match the radiographic appearance.'
                },
        {
          id: 'u7-L6-T1b',
          type: 'teaching',
          question: 'Shielding in Welding',
          explanation: 'Molten metal reacts with oxygen and nitrogen in air, causing porosity and embrittlement. MIG uses a gas shield (argon or CO2). Stick electrodes have a flux coating that burns off and shields the weld pool. TIG uses a separate argon gas stream.',
          hint: 'If you see porosity in a MIG weld, check the gas flow rate and look for drafts.',
        },
        {
          id: 'u7-L6-Q4',
          type: 'multiple-choice',
          question: 'A fillet weld connecting a bracket to a column must resist a static shear load of 90 kN. The weld runs along both sides of the bracket for 150 mm each side (total weld length = 300 mm). Using an E70 electrode (allowable shear stress on throat = 0.3 × 482 = 145 MPa per AWS D1.1), what is the minimum required fillet weld leg size?',
          options: [
            '3 mm, assuming the material remains in the linear elastic regime throughout the loading cycle',
            '4 mm, which does not account for the microstructural changes occurring at these conditions',
            '5 mm, but this applies only to a narrow range of material compositions and temperatures',
            '3 mm by calculation, but minimum code size of 5 mm governs for typical plate thickness',
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'Throat area required: A_throat = F/\u03C4_allow = 90,000/145 = 620.7 mm\u00B2. Throat dimension: a = A_throat/L_total = 620.7/300 = 2.07 mm.',
          hint: 'Calculate: throat area = F/\u03C4_allow, then a =.'
                },
        {
          id: 'u7-L6-Q5',
          type: 'true-false',
          question: 'Welded aluminum frame for a marine application. Using 6061-T6 is a good choice because, unlike steel, aluminum does not lose strength in the weld heat-affected zone.',
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: 'This is false and a common misconception. 6061-T6 actually loses dramatic strength in the HAZ during welding.',
          hint: 'What gives the T6 temper its strength (precipitates.',
                },
        {
          id: 'u7-L6-Q6',
          type: 'fill-blank',
          question: 'Aluminum bracket to a steel frame. Fusion welding is not feasible because of brittle _____ compounds forming at the interface. The most practical joining method for this dissimilar-metal joint is _____ fastening (using bolts or rivets with insulating bushings to prevent galvanic corrosion).',
          blanks: ['intermetallic', 'mechanical'],
          wordBank: ['intermetallic', 'mechanical', 'eutectic', 'adhesive', 'galvanic', 'thermal'],

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="6" y="22" width="28" height="32" rx="2" fill="#A5E86C" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="46" y="22" width="28" height="32" rx="2" fill="#3B8700" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="34" y="22" width="12" height="32" rx="0" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1"/> <g opacity="0.3"> <line x1="37" y1="26" x2="43" y2="32" stroke="#3B8700" stroke-width="1" stroke-linecap="round"/> <line x1="43" y1="26" x2="37" y2="32" stroke="#3B8700" stroke-width="1" stroke-linecap="round"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </g> <text x="20" y="42" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">Al</text> <text x="60" y="42" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">Steel</text> <text x="40" y="42" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.25" font-style="italic">IMC</text> <text x="40" y="66" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">brittle intermetallic</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">compounds</text> </svg>',

          explanation: 'Joining aluminum to steel is a classic dissimilar-metal problem. Fusion welding creates brittle Fe-Al intermetallic compounds that crack easily.',
          hint: 'Fusion welding creates brittle intermetallics.'
                },
        {
          id: 'u7-L6-MP1',
          type: 'match-pairs',
          question: 'Match each welding process to its key feature',
          options: ['MIG (GMAW)', 'TIG (GTAW)', 'Stick (SMAW)', 'Laser welding'],
          matchTargets: [
            'Continuous wire feed, fast',
            'Non-consumable tungsten, precise',
            'Flux-coated rod, works outdoors',
            'Narrow deep weld, automated'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'MIG feeds wire continuously for speed. TIG uses tungsten for precision. Stick uses flux coating for outdoor portability. Laser welding is narrow and automated.',
          hint: 'Each process trades off speed, quality, and convenience.',
        },
        {
          id: 'u7-L6-SB1',
          type: 'sort-buckets',
          question: 'Sort these into consumable vs non-consumable electrode processes',
          options: [
            'MIG (GMAW)',
            'TIG (GTAW)',
            'Stick (SMAW)',
            'Flux-cored (FCAW)',
            'Submerged arc (SAW)',
            'Plasma arc (PAW)'
          ],
          buckets: ['Consumable electrode', 'Non-consumable electrode'],
          correctBuckets: [0, 1, 0, 0, 0, 1],
          explanation: 'MIG, Stick, FCAW, and SAW all consume their electrode. TIG and PAW use a non-consumable tungsten electrode with separate filler.',
          hint: 'Does the electrode melt into the weld pool?',
        },
        {
          id: 'u7-L6-T2',
          type: 'teaching',
          question: 'HAZ, Joint Types, and Fillet Welds',
          explanation: 'The heat-affected zone (HAZ) is the base metal next to the weld that got hot enough to change its microstructure but didn\'t melt. It\'s often the weakest area. Fillet welds (triangular cross-section) join perpendicular surfaces. The load-carrying dimension is the throat, which equals 0.707 times the leg size.',
          hint: 'Butt joints connect plates edge-to-edge. Lap joints overlap them. T-joints meet at 90 degrees.',
        },
        {
          id: 'u7-L6-Q7',
          type: 'multiple-choice',
          question: "What is the primary difference between GMAW (MIG) and FCAW (Flux-Cored Arc Welding)?",
          options: [
            "There is no practical difference between the two processes",
            "GMAW is only for aluminum alloys and FCAW is only for steels",
            "FCAW produces cleaner welds than GMAW",
            "GMAW: solid wire + external gas; FCAW: tubular flux-cored wire",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: "GMAW (MIG) feeds a solid wire electrode with external shielding gas. FCAW uses a tubular wire with flux core, self-shielded FCAW generates its own gas (no external bottle), while gas-shielded FCAW uses both flux and external gas.",
          hint: "One uses solid wire + gas tank;"
        },
        {
          id: 'u7-L6-Q8',
          type: 'multiple-choice',
          question: "A weld inspection reveals lack of fusion defects along the sidewall of a V-groove butt joint. What is the most likely cause and correction?",
          options: [
            "The filler wire was the wrong composition",
            "The welding was too fast, slow down and add more passes",
            "Insufficient heat input or improper torch angle",
            "The joint was too clean, contamination actually helps fusion",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Lack of fusion (LOF) occurs when the weld metal does not fully fuse with the base metal or a previous pass. Sidewall LOF is commonly caused by: (1) Arc not directed at the groove face.",
          hint: "The arc must actually melt the groove sidewall."
        },
        {
          id: 'u7-L6-Q9',
          type: 'true-false',
          question: "Preheating before welding slows the cooling rate in the HAZ, reducing the risk of hydrogen-induced cracking in susceptible steels.",
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: "Preheating serves multiple functions: (1) Slows the cooling rate through the critical temperature range, reducing the hardness of the HAZ. (2) Allows more time for hydrogen to diffuse out of the joint before the weld cools to temperatures where hydrogen embrittlement occurs (<200°C).",
          hint: "Slower cooling = softer HAZ + more time for hydrogen to."
        },
      ]
    },
    {
      id: 'u7-L6b',
      title: 'HAZ and Weld Defects',
      description: 'Heat-affected zone metallurgy, porosity, cracking.',
      icon: '⚡',
      xpReward: 35,
      levels: 4,
      questions: [
        {
          id: 'u7-L6b-EZ1',
          type: 'true-false',
          question: 'The heat-affected zone (HAZ) is the region next to a weld that was heated but did not melt.',
          correctAnswer: true,
          explanation: 'Correct. The HAZ experiences microstructural changes from heat without reaching the melting point.',
          hint: 'The HAZ sits between the weld metal and unaffected base metal.',
        },
        {
          id: 'u7-L6-Q10',
          type: 'multiple-choice',
          question: "An engineer needs to weld 3 mm thick 6061-T6 aluminum sheets for a structural frame. Which filler metal should be selected: ER4043 or ER5356?",
          options: [
            "ER4043: always the best choice for all aluminum welding",
            "Use the same alloy (ER6061) as filler to match compositions",
            "Neither: 6061 aluminum cannot be welded",
            "ER5356 for structural applications",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="6" y="30" width="28" height="16" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="46" y="30" width="28" height="16" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <path d="M34,30 L40,24 L46,30 L46,46 L40,52 L34,46 Z" fill="#3B8700" opacity="0.1" stroke="#3B8700" stroke-width="1"/> <g opacity="0.3"> <circle cx="40" cy="38" r="3" fill="#A5E86C" opacity="0.3"> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1.5s" repeatCount="indefinite"/> </circle> </g> <text x="20" y="40" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">6061</text> <text x="60" y="40" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">6061</text> <text x="40" y="40" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.25" font-style="italic">filler</text> <text x="40" y="66" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">4043 or 5356</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">Al filler selection</text> </svg>',

          explanation: "For structural 6061-T6: ER5356 (Al-5%Mg) provides higher as-welded shear strength, better color match after anodizing, and good corrosion resistance. ER4043 (Al-5%Si) has a lower melting range reducing hot cracking risk, produces shinier/smoother welds (cosmetic), and is easier to feed through the wire liner.",
          hint: "One filler prioritizes strength and structural integrity;"
        },
        {
          id: 'u7-L6-Q11',
          type: 'multiple-choice',
          question: "What is the heat-affected zone (HAZ) and why is it often the weakest part of a welded joint?",
          options: [
            "The HAZ is the area that was fully melted and then resolidified",
            "Base metal heated enough to alter microstructure but not melt",
            "The HAZ is always the strongest zone in any welded joint assembly",
            "The HAZ only exists in stick welding, never in TIG or MIG welds",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="6" y="26" width="68" height="24" rx="2" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <rect x="32" y="26" width="16" height="24" rx="0" fill="#3B8700" opacity="0.12"/> <rect x="22" y="26" width="10" height="24" rx="0" fill="#A5E86C" opacity="0.08"/> <rect x="48" y="26" width="10" height="24" rx="0" fill="#A5E86C" opacity="0.08"/> <text x="40" y="42" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.3" font-style="italic">weld</text> <text x="27" y="42" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">HAZ</text> <text x="53" y="42" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">HAZ</text> <text x="12" y="42" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.15" font-style="italic">base</text> <text x="68" y="42" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0.15" font-style="italic">base</text> <text x="40" y="62" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">HAZ = weakest zone</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">grain growth region</text> </svg>',

          explanation: "The HAZ experiences a gradient of peak temperatures from near-melting to ambient. In carbon steel: the coarse-grained HAZ (>1100°C) has reduced toughness; the intercritical HAZ (727-910°C) can form local brittle zones.",
          hint: "The base metal near the weld gets heated."
        },
        {
          id: 'u7-L6-Q12',
          type: 'multiple-choice',
          question: "What welding distortion pattern is typically observed in a long butt weld between two flat plates?",
          options: [
            "Angular distortion (V-shape) transverse to weld and bowing",
            "The plates bend uniformly upward along the entire weld length",
            "The plates expand permanently and become larger",
            "Distortion only occurs if the welding is performed incorrectly,",
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Welding distortion results from non-uniform thermal expansion and contraction. The weld zone heats, expands, yields in compression, then contracts during cooling, pulling the joint together.",
          hint: "Hot weld metal contracts as it cools, pulling the plates."
        },
        {
          id: 'u7-L6b-T1',
          type: 'teaching',
          question: 'The Heat-Affected Zone',
          explanation: 'The HAZ is the region next to the weld that gets hot enough to change microstructure but doesn\'t melt. In carbon steel, the HAZ can form hard, brittle martensite if the part cools too fast. Preheating slows cooling and prevents this.',
          hint: 'Higher carbon equivalent (CE) means more preheat is needed.',
        },
        {
          id: 'u7-L6-Q13',
          type: 'fill-blank',
          question: "In arc welding, the measure of energy input per unit length of weld is called heat _____, typically expressed in kJ/mm.",
          blanks: ['input'],
          wordBank: ['input', 'flux', 'transfer', 'output', 'dissipation'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: "Heat input HI = (V × I × 60) / (S × 1000) in kJ/mm, where V = arc voltage, I = welding current, and S = travel speed (mm/min). Heat input controls: HAZ width, cooling rate, residual stress, and distortion.",
          hint: "This welding parameter is calculated from voltage, current."
        },
        {
          id: 'u7-L6-Q14',
          type: 'multiple-choice',
          question: "Excessive spatter during GMAW (MIG) welding of mild steel. What are the most likely causes and corrections?",
          options: [
            "Spatter is normal and cannot be reduced in MIG welding",
            "Spatter is caused by welding too slowly",
            "The wire is too thin, switch to a thicker wire",
            "Excessive voltage (long arc) or incorrect wire feed speed",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="46" width="60" height="14" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <line x1="40" y1="10" x2="40" y2="46" stroke="#3B8700" stroke-width="2" opacity="0.3"/> <circle cx="40" cy="46" r="6" fill="#3B8700" opacity="0.12"> <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite"/> </circle> <g opacity="0.3"> <circle cx="30" cy="36" r="1.5" fill="#3B8700"> <animate attributeName="cy" values="42;30;22" dur="1.5s" repeatCount="indefinite"/> <animate attributeName="cx" values="38;30;26" dur="1.5s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.4;0.2;0" dur="1.5s" repeatCount="indefinite"/> </circle> <circle cx="50" cy="34" r="1" fill="#3B8700"> <animate attributeName="cy" values="40;32;24" dur="1.2s" repeatCount="indefinite"/> <animate attributeName="cx" values="42;50;54" dur="1.2s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.3;0.15;0" dur="1.2s" repeatCount="indefinite"/> </circle> </g> <text x="40" y="8" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">wire</text> <text x="40" y="70" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">spatter</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">voltage/feed issues</text> </svg>',

          explanation: "GMAW spatter causes: (1) Excessive voltage: creates a long, unstable arc that explodes droplets. (2) Wire feed too fast or slow, causes globular or short-circuit instability.",
          hint: "Spatter indicates arc instability."
        },
        {
          id: 'u7-L6-Q15',
          type: 'multiple-choice',
          question: "What is the difference between a groove weld and a fillet weld, and when is each used?",
          options: [
            "They are the same weld type with different names depending on position",
            "Groove welds are stronger than fillet welds in all cases",
            "A groove weld fills a prepared groove between joined members",
            "Fillet welds require groove preparation",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Groove welds: used for butt joints where full penetration is needed. The base metal edges are prepared (beveled) into V, J, U, or double-V grooves.",
          hint: "One fills a prepared gap between aligned members;"
        },
        {
          id: 'u7-L6b-MP1',
          type: 'match-pairs',
          question: 'Match each weld defect to its cause',
          options: ['Porosity', 'Lack of fusion', 'Hydrogen cracking', 'Undercut'],
          matchTargets: [
            'Trapped gas bubbles',
            'Insufficient heat input',
            'Moisture + hard HAZ',
            'Excessive current, edge melting'
          ],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Porosity comes from gas. Lack of fusion means the base metal did not melt. Hydrogen cracking needs moisture, stress, and a hard microstructure. Undercut is excessive melting of the base metal edge.',
          hint: 'Each defect has a specific root cause and fix.',
        },
        {
          id: 'u7-L6b-OS1',
          type: 'order-steps',
          question: 'Order the factors needed for hydrogen cracking (from most to least controllable)',
          steps: [
            'Moisture source (remove it)',
            'Preheat to slow cooling',
            'Use low-hydrogen electrodes',
            'Post-weld heat treatment'
          ],
          correctOrder: [0, 1, 2, 3],
          explanation: 'To prevent hydrogen cracking: control moisture first, then manage cooling rate with preheat, use low-H electrodes, and PWHT as a final measure.',
          hint: 'Hydrogen cracking needs hydrogen, stress, and a susceptible microstructure.',
        },
        {
          id: 'u7-L6-Q16',
          type: 'true-false',
          question: "Submerged arc welding (SAW) is suitable for all welding positions including vertical-up and overhead.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: "SAW is limited to flat and horizontal positions because it uses a deep bed of granular flux that covers the arc. In vertical or overhead positions, the flux would fall away.",
          hint: "What \"submerged\" means.",
        },
        {
          id: 'u7-L6-Q17',
          type: 'multiple-choice',
          question: "What is the purpose of back-gouging the root of a double-V groove weld before welding the second side?",
          options: [
            "To add more filler metal to the root for extra strength",
            "To remove the root pass from the first side,",
            "To cool down the joint between welding sides,",
            "Back-gouging is decorative",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "In a double-V groove weld, the first side is welded, then the root is back-gouged from the second side before welding the second side. (2) The root gap irregularity.",
          hint: "The root of the first pass may not be perfect."
        },
        {
          id: 'u7-L6-Q18',
          type: 'multiple-choice',
          question: "Friction stir welding (FSW) joins materials without melting them. What is its primary advantage and main limitation?",
          options: [
            "FSW is fast and cheap for all materials and thicknesses",
            "FSW produces stronger welds than any fusion welding process for all materials",
            "FSW can only join plastics, not metals",
            "FSW joins materials in the solid state (no melting)",
          ],
          correctIndex: 3,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="6" y="40" width="28" height="16" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="46" y="40" width="28" height="16" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <circle cx="40" cy="32" r="8" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1.5"> <animateTransform attributeName="transform" type="rotate" from="0 40 32" to="360 40 32" dur="1s" repeatCount="indefinite"/> </circle> <line x1="40" y1="24" x2="40" y2="12" stroke="#3B8700" stroke-width="2" opacity="0.3"/> <rect x="38" y="40" width="4" height="12" rx="0" fill="#3B8700" opacity="0.15"/> <text x="40" y="10" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">tool</text> <text x="20" y="52" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">plate 1</text> <text x="60" y="52" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">plate 2</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">FSW</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">solid state join</text> </svg>',

          explanation: "FSW uses a rotating tool with a shoulder and pin that plunges into the joint and traverses along it. Frictional heat plasticizes (but does not melt) the material, and the tool mechanically stirs the softened material from both sides together.",
          hint: "A spinning tool plasticizes the material without melting it."
        },
        {
          id: 'u7-L6-Q19',
          type: 'multiple-choice',
          question: "What NDT method is best suited for detecting surface-breaking cracks in ferromagnetic materials?",
          options: [
            "Magnetic particle testing (MT/MPI)",
            "Radiographic testing (RT). X-rays detect all surface defects,",
            "Ultrasonic testing (UT): best for surface crack detection",
            "Visual testing (VT): if you cannot see it, it does not matter",
          ],
          correctIndex: 0,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="30" width="60" height="20" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <path d="M40,30 Q38,36 42,40 Q38,44 40,50" stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.4"/> <g opacity="0.3"> <path d="M14,28 Q14,24 20,24 Q26,24 26,28" stroke="#3B8700" stroke-width="0.8" fill="none"/> <path d="M54,28 Q54,24 60,24 Q66,24 66,28" stroke="#3B8700" stroke-width="0.8" fill="none"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2s" repeatCount="indefinite"/> </g> <circle cx="38" cy="36" r="1" fill="#3B8700" opacity="0.3"/> <circle cx="42" cy="38" r="1" fill="#3B8700" opacity="0.3"/> <circle cx="40" cy="42" r="1" fill="#3B8700" opacity="0.3"/> <text x="40" y="62" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">MPI</text> <text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">surface cracks</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.12" font-style="italic">ferromagnetic only</text> </svg>',

          explanation: "Magnetic particle testing (MT) detects surface and shallow subsurface (up to ~3 mm) discontinuities in ferromagnetic materials. The part is magnetized, and ferrous particles are applied.",
          hint: "This method exploits the magnetic properties of."
        },
        {
          id: 'u7-L6-Q20',
          type: 'true-false',
          question: "The minimum overlap should be at least 5 times the thickness of the thinner member to ensure adequate load transfer.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="6" y="28" width="44" height="8" rx="1" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <rect x="30" y="40" width="44" height="8" rx="1" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <line x1="30" y1="36" x2="50" y2="36" stroke="#3B8700" stroke-width="0.6" opacity="0.3"/> <line x1="30" y1="52" x2="30" y2="54" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="50" y1="52" x2="50" y2="54" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <line x1="30" y1="54" x2="50" y2="54" stroke="#3B8700" stroke-width="0.5" opacity="0.2"/> <text x="40" y="58" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">≥5t</text> <text x="8" y="26" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">t</text> <text x="40" y="70" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">lap joint</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">overlap ≥ 5t</text> </svg>',

          explanation: "AWS D1.1 and most structural codes require a minimum overlap of 5× the thinner plate thickness for fillet-welded lap joints. Insufficient overlap creates: (1) High peeling/rotation forces on the fillet welds.",
          hint: "Short overlaps cause the fillet welds to experience."
        },
      ]
    },
    {
      id: 'u7-L6c',
      title: 'Joint Design and Inspection',
      description: 'Fillet sizing, weld symbols, NDE methods.',
      icon: '⚡',
      xpReward: 40,
      levels: 4,
      questions: [
        {
          id: 'u7-L6-T3',
          type: 'teaching',
          question: 'Weld Defects and Inspection',
          explanation: 'Common weld defects include porosity (gas bubbles trapped in the weld), lack of fusion (weld metal didn\'t bond to the base metal), and cracking (from residual stress or hydrogen). Radiographic testing (RT) reveals internal defects on film. Magnetic particle inspection (MPI) finds surface cracks in ferromagnetic materials.',
          hint: 'High carbon equivalent steels need preheating to prevent hydrogen-induced cracking.',
        },
        {
          id: 'u7-L6c-EZ1',
          type: 'true-false',
          question: 'Ultrasonic testing can detect internal defects inside a weld.',
          correctAnswer: true,
          explanation: 'Yes. UT sends sound waves through the material and detects reflections from internal flaws.',
          hint: 'Sound waves can travel through solid metal.',
        },
        {
          id: 'u7-L6-Q21',
          type: 'multiple-choice',
          question: "A weld procedure specification (WPS) for a critical pressure vessel weld is being developed. What are the essential variables that must be qualified by procedure qualification testing (PQR)?",
          options: [
            "Only the welder's name and date, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Only the type of electrode and welding position,",
            "Welding process, base metal type/group, filler metal classification",
            "The color of the welding helmet and glove type,",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Essential variables (per ASME Section IX) are parameters that, if changed beyond allowed limits, significantly affect mechanical properties and require requalification: (1) Welding process (GMAW, GTAW, SMAW). (2) Base metal P-number (material grouping).",
          hint: "Essential variables are those that affect the final."
        },
        {
          id: 'u7-L6-Q22',
          type: 'multiple-choice',
          question: "What is the purpose of post-weld heat treatment (PWHT) and for which applications is it typically required?",
          options: [
            "PWHT is only cosmetic",
            "PWHT (typically 580-650°C for carbon steel",
            "PWHT makes the weld stronger by re-melting and resolidifying the weld metal",
            "PWHT is only needed for non-ferrous metals like aluminum",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5"/> <text x="44" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">time</text> <text x="7" y="36" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.3" font-style="italic">T</text> <path d="M16,60 L20,20 L50,20 L58,60" stroke="#58CC02" stroke-width="2" fill="none" opacity="0.4"> <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite"/> </path> <text x="36" y="16" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">hold</text> <text x="40" y="58" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">PWHT</text> <text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">stress relief</text> </svg>',

          explanation: "PWHT (stress relief) heats the welded assembly uniformly to reduce residual stresses from ~yield strength to ~10-20% of yield. (2) Distortion during subsequent machining.",
          hint: "Residual stresses from welding approach yield strength."
        },
        {
          id: 'u7-L6-Q23',
          type: 'fill-blank',
          question: "The effective load-carrying dimension of a fillet weld is the _____ of the weld, equal to 0.707 times the _____ size for an equal-leg fillet.",
          blanks: ['throat', 'leg'],
          wordBank: ['throat', 'leg', 'root', 'face', 'toe', 'bead'],

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="40" width="60" height="20" rx="1" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <rect x="38" y="10" width="20" height="30" rx="1" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <path d="M38,40 L38,52 L26,40 Z" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.5"/> <line x1="32" y1="46" x2="38" y2="40" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="1,1.5" opacity="0.3"/> <text x="30" y="48" font-size="3.5" fill="#3B8700" opacity="0.25" font-style="italic">throat</text> <text x="22" y="40" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">a</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">a = 0.707w</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">fillet weld</text> </svg>',

          explanation: "The throat is the shortest distance from the root of the fillet to the face (hypotenuse). For an equal-leg fillet with leg size w, the throat a = w × cos(45°) = 0.707w.",
          hint: "In the triangular cross-section of a fillet weld."
        },
        {
          id: 'u7-L6c-T1',
          type: 'teaching',
          question: 'Weld Inspection Methods',
          explanation: 'Visual inspection catches surface defects. Dye penetrant testing (PT) finds surface cracks. Magnetic particle testing (MT) finds surface and near-surface cracks in ferromagnetic materials. Radiography (RT) and ultrasonic testing (UT) find internal defects.',
          hint: 'Try this now: decide which NDE method you would use for a pressure vessel butt weld.',
        },
        {
          id: 'u7-L6-Q24',
          type: 'multiple-choice',
          question: "Welding a 50 mm thick ASTM A516 Grade 70 pressure vessel plate. The calculated carbon equivalent is 0.48. What minimum preheat temperature would you recommend?",
          options: [
            "10°C (just above freezing) to remove condensation,",
            "100-150°C: with CE of 0.48 and 50 mm thickness",
            "No preheat required",
            "400°C: maximum preheat for maximum safety",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: "CE = 0.48 is at the threshold for hydrogen cracking risk (>0.45 is elevated). At 50 mm thickness, the heat sink effect of the thick plate accelerates cooling, increasing the risk of hard HAZ.",
          hint: "three factors together: carbon equivalent, plate thickness.",
        },
        {
          id: 'u7-L6-Q25',
          type: 'true-false',
          question: "Laser beam welding (LBW) produces a very narrow weld with a high depth-to-width ratio and minimal HAZ compared to arc welding processes.",
          correctAnswer: true,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="40" width="60" height="16" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <line x1="40" y1="8" x2="40" y2="40" stroke="#A5E86C" stroke-width="1.5" opacity="0.3"> <animate attributeName="opacity" values="0.15;0.4;0.15" dur="1s" repeatCount="indefinite"/> </line> <rect x="36" y="40" width="8" height="14" rx="0" fill="#3B8700" opacity="0.12"/> <text x="40" y="6" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">laser</text> <text x="50" y="50" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">deep narrow</text> <text x="50" y="56" font-size="3" fill="#3B8700" opacity="0.2" font-style="italic">weld</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">LBW</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">high depth:width</text> </svg>',

          explanation: "Laser welding focuses a high-power-density beam (10⁶-10⁸ W/cm²) onto the workpiece, creating a keyhole that penetrates deep into the material. The result: very narrow weld (0.5-2 mm wide), high depth-to-width ratio, very narrow HAZ (0.1-0.5 mm), low heat input, minimal distortion, and high welding speed (1-10 m/min).",
          hint: "A laser beam concentrates enormous energy into a tiny spot."
        },
        {
          id: 'u7-L6-Q26',
          type: 'multiple-choice',
          question: "What is the difference between undercut and underfill as weld defects?",
          options: [
            "They are the same defect with different names",
            "Undercut is caused by using too much filler metal material",
            "Undercut is only a cosmetic surface defect, not structural",
            "Undercut: groove melted at weld toe, not filled by weld metal",
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Undercut: excessive arc energy melts a groove into the base metal at the weld toe, and insufficient filler metal does not fill it. Creates a sharp notch that acts as a severe stress concentrator.",
          hint: "One creates a notch at the weld toe;"
        },
        {
          id: 'u7-L6c-SB1',
          type: 'sort-buckets',
          question: 'Sort these NDE methods by defect detection capability',
          options: [
            'Visual inspection (VT)',
            'Dye penetrant (PT)',
            'Magnetic particle (MT)',
            'Ultrasonic (UT)',
            'Radiography (RT)',
            'Eddy current (ET)'
          ],
          buckets: ['Surface defects only', 'Internal defects too'],
          correctBuckets: [0, 0, 0, 1, 1, 0],
          explanation: 'VT, PT, MT, and ET detect surface or near-surface defects. UT and RT can find internal defects like voids, inclusions, and lack of fusion.',
          hint: 'Can the method see inside the material?',
        },
        {
          id: 'u7-L6c-MP1',
          type: 'match-pairs',
          question: 'Match each joint type to its typical application',
          options: ['Butt joint', 'Fillet (T-joint)', 'Lap joint', 'Corner joint'],
          matchTargets: ['Pipe or plate end-to-end', 'Stiffener to plate', 'Overlapping sheets', 'Box or frame corner'],
          correctMatches: [0, 1, 2, 3],
          explanation: 'Butt joints connect plates end-to-end. T-joints attach stiffeners. Lap joints overlap sheets. Corner joints form box structures.',
          hint: 'Think about how the pieces physically fit together.',
        },
        {
          id: 'u7-L6-Q27',
          type: 'multiple-choice',
          question: "Why is acetylene (C₂H₂) preferred over other fuel gases for oxy-fuel cutting of steel?",
          options: [
            "Acetylene is the cheapest fuel gas available on the market",
            "Highest flame temperature (~3160°C) among fuel gases",
            "Acetylene is the safest fuel gas to handle and store safely",
            "Acetylene does not require oxygen for combustion to occur",
          ],
          correctIndex: 1,

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="14" y="44" width="52" height="14" rx="2" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/> <path d="M36,8 Q34,14 38,20 Q34,26 38,32 Q34,38 36,44" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.3"> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1.5s" repeatCount="indefinite"/> </path> <path d="M44,8 Q46,14 42,20 Q46,26 42,32 Q46,38 44,44" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.2"> <animate attributeName="opacity" values="0.1;0.3;0.1" dur="1.5s" begin="0.3s" repeatCount="indefinite"/> </path> <text x="40" y="6" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">C₂H₂ + O₂</text> <text x="40" y="52" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">steel</text> <text x="40" y="68" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">oxy-fuel cutting</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">3300°C flame</text> </svg>',

          explanation: "Oxy-fuel cutting of steel works by: (1) Preheating the steel to ~870°C with the oxy-fuel flame. (2) Directing a high-pressure oxygen jet at the hot steel.",
          hint: "The cutting process requires rapid heating to the."
        },
        {
          id: 'u7-L6-Q28',
          type: 'multiple-choice',
          question: "What are the three essential conditions for hydrogen-induced cracking (cold cracking) in welds?",
          options: [
            "High temperature, high humidity, and high voltage,",
            "Wrong filler metal, wrong gas, and wrong position",
            "Susceptible microstructure (martensite), diffusible hydrogen",
            "Thin material, slow cooling rate, and low welding amperage",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: "Hydrogen cracking requires ALL THREE conditions simultaneously: (1) Susceptible microstructure: hard, brittle martensite or bainite (typically >350 HV). Controlled by preheat, heat input, and steel hardenability.",
          hint: "Three factors form a \"triangle\"."
        },
        {
          id: 'u7-L6-Q29',
          type: 'true-false',
          question: "Resistance spot welding (RSW) requires filler metal to be added between the sheets being joined.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Butt weld (top) --> <rect x="6" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="46" y="10" width="28" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="46" y="10" width="28" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Weld bead (butt) --> <ellipse cx="40" cy="15" rx="6" ry="8" fill="#58CC02" opacity="0.2"/> <path d="M34,10 Q40,6 46,10" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <path d="M34,20 Q40,24 46,20" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="40" y="30" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2">butt weld</text> <!-- Fillet weld (middle) --> <rect x="6" y="38" width="34" height="10" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="6" y="38" width="34" height="10" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <rect x="40" y="38" width="10" height="30" rx="1" fill="#58CC02" opacity="0.1"/> <rect x="40" y="38" width="10" height="30" rx="1" stroke="#3B8700" stroke-width="1.2" fill="none"/> <!-- Fillet weld triangle --> <path d="M34,48 L40,48 L40,38" fill="#58CC02" opacity="0.25"/> <path d="M34,48 Q38,42 40,38" stroke="#58CC02" stroke-width="1.5" fill="none" opacity="0.4"/> <text x="22" y="58" font-size="4" fill="#3B8700" opacity="0.2">fillet weld</text> <!-- Weld symbol (standard notation) --> <line x1="56" y1="50" x2="72" y2="50" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <line x1="56" y1="50" x2="56" y2="42" stroke="#3B8700" stroke-width="1" opacity="0.25"/> <path d="M56,50 L60,44 L64,50" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <text x="64" y="46" font-size="3.5" fill="#3B8700" opacity="0.2">symbol</text> <!-- Welding animation (sparks at butt weld) --> <circle r="1" fill="#58CC02" opacity="0"> <animateMotion dur="0.4s" repeatCount="indefinite" path="M40,14 L44,8"/> <animate attributeName="opacity" values="0.5;0" dur="0.4s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#A5E86C" opacity="0"> <animateMotion dur="0.35s" repeatCount="indefinite" path="M40,14 L36,6" begin="0.1s"/> <animate attributeName="opacity" values="0.4;0" dur="0.35s" begin="0.1s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#3B8700" opacity="0"> <animateMotion dur="0.45s" repeatCount="indefinite" path="M40,14 L46,10" begin="0.2s"/> <animate attributeName="opacity" values="0.35;0" dur="0.45s" begin="0.2s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Resistance spot welding does NOT use filler metal. It joins overlapping sheets by passing high current through the stack while copper electrodes apply clamping force.",
          hint: "RSW generates heat by electrical resistance at the."
        },
        {
          id: 'u7-L6-Q30',
          type: 'fill-blank',
          question: "When a fillet weld is loaded in shear parallel to the weld axis (longitudinal loading), the failure plane passes through the weld _____, which is the minimum cross-sectional dimension of the weld.",
          blanks: ['throat'],
          wordBank: ['throat', 'root', 'toe', 'face', 'leg'],

          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="10" y="40" width="60" height="16" rx="1" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/> <path d="M38,40 L38,52 L26,40 Z" fill="#3B8700" opacity="0.12" stroke="#3B8700" stroke-width="1.5"/> <g opacity="0.3"> <line x1="24" y1="32" x2="16" y2="32" stroke="#3B8700" stroke-width="1"/> <polygon points="18,30 14,32 18,34" fill="#3B8700"/> <line x1="52" y1="32" x2="60" y2="32" stroke="#3B8700" stroke-width="1"/> <polygon points="58,30 62,32 58,34" fill="#3B8700"/> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1.5s" repeatCount="indefinite"/> </g> <line x1="32" y1="46" x2="38" y2="40" stroke="#A5E86C" stroke-width="1" stroke-dasharray="1,1.5" opacity="0.3"/> <text x="28" y="30" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">F</text> <text x="56" y="30" font-size="3.5" fill="#3B8700" opacity="0.2" font-style="italic">F</text> <text x="40" y="66" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">shear on throat</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">longitudinal load</text> </svg>',

          explanation: "Under any loading direction, fillet weld failure occurs through the throat. For longitudinal shear, the shear stress τ = F/(a × L) where a = throat = 0.707 × leg for equal-leg fillets, and L = weld length.",
          hint: "The minimum dimension through a fillet weld."
        },
      ]
    },
    {
      id: 'u7-L-conv',
      title: 'Materials Selection Meeting',
      description: 'Help an engineer choose the right material for a critical component.',
      icon: '💬',
      xpReward: 25,
      type: 'conversation',
      questions: [],
      conversationStartNodeId: 'u7-L-conv-C1',
      conversationNodes: [
        {
          id: 'u7-L-conv-C1',
          speaker: 'Lead Engineer',
          message: "We need to pick a material for a new pressure vessel. It'll operate at -50 degrees C with cyclic pressurization. What's your first concern?",
          options: [
            {
              text: "Low-temperature toughness. We need an FCC metal or one well above its DBTT.",
              nextNodeId: 'u7-L-conv-N1',
              quality: 'great',
              feedback: 'Exactly right. At -50 degrees C, BCC steels risk brittle fracture. FCC metals like austenitic stainless stay ductile.',
            },
            {
              text: "We should focus on getting the highest yield strength possible.",
              nextNodeId: 'u7-L-conv-N1',
              quality: 'okay',
              feedback: "Strength matters, but at -50 degrees C the bigger risk is brittle fracture. Toughness comes first.",
            },
            {
              text: "Let's just use whatever we used last time.",
              nextNodeId: 'u7-L-conv-N1',
              quality: 'poor',
              feedback: "The operating conditions are different. Temperature changes the failure mode. You need to evaluate the material for this specific application.",
            },
          ],
        },
        {
          id: 'u7-L-conv-N1',
          speaker: 'Lead Engineer',
          message: "Good thinking on temperature. Now, the cyclic loading means fatigue is a concern too. The design team proposed 4340 steel, quenched and tempered to 50 HRC. Thoughts?",
          nextNodeId: 'u7-L-conv-C2',
        },
        {
          id: 'u7-L-conv-C2',
          speaker: 'Lead Engineer',
          message: "So, 4340 at 50 HRC for a cyclic-pressure vessel at -50 degrees C. What do you think?",
          options: [
            {
              text: "That's too hard. High hardness means low K_IC. At -50 degrees C with fatigue cracks, we'll get brittle fracture. Temper it softer or switch to 304L stainless.",
              nextNodeId: 'u7-L-conv-N2',
              quality: 'great',
              feedback: "Spot on. 4340 at 50 HRC has poor fracture toughness. Combined with low temperature and cyclic loading, it's a recipe for catastrophic failure.",
            },
            {
              text: "4340 is a great alloy. 50 HRC should give excellent fatigue strength.",
              nextNodeId: 'u7-L-conv-N2',
              quality: 'okay',
              feedback: "4340 is indeed excellent, but at 50 HRC its fracture toughness is dangerously low for a pressure vessel at -50 degrees C. Hardness isn't everything.",
            },
            {
              text: "I don't know enough about 4340 to comment.",
              nextNodeId: 'u7-L-conv-N2',
              quality: 'poor',
              feedback: "In an interview, you should work through what you know: high HRC means low toughness, and low temperature makes BCC metals more brittle. Put those together.",
            },
          ],
        },
        {
          id: 'u7-L-conv-N2',
          speaker: 'Lead Engineer',
          message: "Right. We switched to 304L stainless. Now the fabrication team says they want to weld the vessel without preheat or PWHT. The wall is 25 mm thick. Any concerns?",
          nextNodeId: 'u7-L-conv-C3',
        },
        {
          id: 'u7-L-conv-C3',
          speaker: 'Lead Engineer',
          message: "Welding 25 mm thick 304L without preheat or post-weld heat treatment. Your call?",
          options: [
            {
              text: "304L is fine without preheat, it's austenitic with low carbon so no martensite in the HAZ. But we should check for sensitization and verify the ferrite number to avoid hot cracking.",
              nextNodeId: 'u7-L-conv-END',
              quality: 'great',
              feedback: "Perfect. Austenitic stainless doesn't need preheat because it doesn't form martensite. The L grade resists sensitization. Checking ferrite number prevents solidification cracking.",
            },
            {
              text: "25 mm thick plate always needs preheat, regardless of material.",
              nextNodeId: 'u7-L-conv-END',
              quality: 'okay',
              feedback: "Preheat is critical for carbon steel to avoid hydrogen cracking, but austenitic stainless is different. It doesn't form martensite, so preheat isn't needed. Material matters.",
            },
            {
              text: "I'd skip the preheat and PWHT to save time and money.",
              nextNodeId: 'u7-L-conv-END',
              quality: 'poor',
              feedback: "You got the right answer (no preheat needed) but for the wrong reason. The correct reasoning is that 304L doesn't form martensite, not that it saves money. Engineering decisions need engineering justification.",
            },
          ],
        },
        {
          id: 'u7-L-conv-END',
          speaker: 'Narrator',
          message: "You've worked through a real material selection problem: choosing the right alloy for temperature, loading, and weldability. In interviews, showing you can connect material science to practical decisions is what sets you apart.",
        },
      ],
    },
    {
      id: 'u7-L-speed',
      title: 'Materials Rapid Fire',
      description: '15 quick questions on materials and manufacturing. 60 seconds.',
      icon: '⚡',
      xpReward: 20,
      type: 'speed-round',
      questions: [],
      speedTimeLimit: 60,
      speedQuestions: [
        { id: 'u7-L-speed-SQ1', question: 'What crystal structure is austenite?', options: ['BCC', 'FCC', 'HCP', 'BCT'], correctIndex: 1 },
        { id: 'u7-L-speed-SQ2', question: 'Elastic modulus of steel?', options: ['70 GPa', '120 GPa', '200 GPa', '400 GPa'], correctIndex: 2 },
        { id: 'u7-L-speed-SQ3', question: 'Eutectoid carbon content in steel?', options: ['0.02%', '0.4%', '0.8%', '2.14%'], correctIndex: 2 },
        { id: 'u7-L-speed-SQ4', question: 'Hardest microstructure in steel?', options: ['Ferrite', 'Pearlite', 'Bainite', 'Martensite'], correctIndex: 3 },
        { id: 'u7-L-speed-SQ5', question: 'Which test measures impact toughness?', options: ['Tensile', 'Charpy', 'Rockwell', 'Creep'], correctIndex: 1 },
        { id: 'u7-L-speed-SQ6', question: 'Beach marks indicate which failure?', options: ['Creep', 'Fatigue', 'Corrosion', 'Yielding'], correctIndex: 1 },
        { id: 'u7-L-speed-SQ7', question: 'MIG welding electrode type?', options: ['Non-consumable', 'Consumable wire', 'Flux-coated', 'Tungsten'], correctIndex: 1 },
        { id: 'u7-L-speed-SQ8', question: 'FDM uses which material form?', options: ['Powder', 'Resin', 'Filament', 'Sheet'], correctIndex: 2 },
        { id: 'u7-L-speed-SQ9', question: 'In turning, what rotates?', options: ['Tool', 'Workpiece', 'Both', 'Neither'], correctIndex: 1 },
        { id: 'u7-L-speed-SQ10', question: 'Quenching medium for highest cooling rate?', options: ['Air', 'Oil', 'Water', 'Furnace'], correctIndex: 2 },
        { id: 'u7-L-speed-SQ11', question: 'Poisson ratio of steel?', options: ['0.1', '0.3', '0.5', '0.7'], correctIndex: 1 },
        { id: 'u7-L-speed-SQ12', question: 'Which casting process uses wax patterns?', options: ['Sand', 'Die', 'Investment', 'Centrifugal'], correctIndex: 2 },
        { id: 'u7-L-speed-SQ13', question: 'G01 in CNC means?', options: ['Rapid move', 'Linear feed', 'Arc CW', 'Home'], correctIndex: 1 },
        { id: 'u7-L-speed-SQ14', question: 'Steel vs cast iron boundary?', options: ['0.8% C', '1.0% C', '2.14% C', '4.3% C'], correctIndex: 2 },
        { id: 'u7-L-speed-SQ15', question: 'Purpose of tempering?', options: ['Increase hardness', 'Restore toughness', 'Add carbon', 'Remove stress'], correctIndex: 1 },
      ],
    },
  ]
};
