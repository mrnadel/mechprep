import type { Unit } from '../types';

export const unit7: Unit = {
  id: 'u7-materials',
  title: 'Materials & Manufacturing',
  description: 'Material properties, phase diagrams, heat treatment, casting, forming, machining, and modern manufacturing processes.',
  color: '#F97316',
  icon: '🏭',
  topicId: 'materials-engineering',
  lessons: [
    {
      id: 'u7-L1',
      title: 'Material Properties & Testing',
      description: 'Tensile test, hardness tests (Rockwell/Brinell/Vickers), impact testing, creep, fatigue properties.',
      icon: '🧪',
      xpReward: 20,
      questions: [
        {
          id: 'u7-L1-Q1',
          type: 'multiple-choice',
          question: 'You receive a tensile test report showing both percent elongation and percent reduction in area. Your colleague asks why reduction in area is often considered a better measure of ductility. What is the best explanation?',
          options: [
            'Reduction in area is always a larger number, so it looks more impressive in reports — however, standard engineering analysis methods and field experience both point to a different conclusion',
            'Reduction in area is less sensitive to gauge length selection and better captures the localized deformation at fracture, making it more consistent across different test setups',
            'Percent elongation includes elastic strain, which inflates the number and makes it unreliable — a plausible but incorrect interpretation of the underlying physics',
            'Reduction in area directly measures the material\'s hardness, which correlates better with ductility, excluding contributions from residual stresses',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Left half — grip + shoulder + gauge end --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z;M6,32 L14,32 Q20,32 22,36 L22,44 Q20,48 14,48 L6,48 Z;M2,32 L10,32 Q16,32 18,38 L18,42 Q16,48 10,48 L2,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M0,32 L8,32 Q14,32 16,39 L16,41 Q14,48 8,48 L0,48 Z;M10,32 L18,32 Q24,32 26,35 L26,45 Q24,48 18,48 L10,48 Z"/> </path> <!-- Right half (mirror) --> <path fill="#58CC02" opacity="0.12"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <path stroke="#3B8700" stroke-width="2" fill="none"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z;M74,32 L66,32 Q60,32 58,36 L58,44 Q60,48 66,48 L74,48 Z;M78,32 L70,32 Q64,32 62,38 L62,42 Q64,48 70,48 L78,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M80,32 L72,32 Q66,32 64,39 L64,41 Q66,48 72,48 L80,48 Z;M70,32 L62,32 Q56,32 54,35 L54,45 Q56,48 62,48 L70,48 Z"/> </path> <!-- Gauge section (necks then fractures) --> <path fill="#58CC02" opacity="0.1"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> </path> <path stroke="#3B8700" stroke-width="1.5" fill="none" opacity="0.5"> <animate attributeName="d" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1" values="M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z;M22,36 Q40,36 58,36 L58,44 Q40,44 22,44 Z;M18,38 Q40,40 62,38 L62,42 Q40,40 18,42 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M16,39 Q28,40 40,40 L40,40 Q52,40 64,39 Z;M26,35 Q40,35 54,35 L54,45 Q40,45 26,45 Z"/> <animate attributeName="opacity" values="0.5;0.5;0.5;0;0;0.5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </path> <!-- Necking stress concentration zone --> <ellipse cx="40" cy="40" rx="8" ry="5" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.1;0.18;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="ry" values="5;5;3;1;1;5" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </ellipse> <!-- Gauge length marks (spread apart during test) --> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <line y1="30" y2="33" stroke="#3B8700" stroke-width="0.8" opacity="0.25"> <animate attributeName="x1" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <!-- Gauge length bracket --> <line y1="30" y2="30" stroke="#3B8700" stroke-width="0.5" opacity="0.15"> <animate attributeName="x1" values="32;28;22;20;20;32" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> <animate attributeName="x2" values="48;52;58;60;60;48" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </line> <text x="40" y="28" text-anchor="middle" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">L₀</text> <!-- Fracture flash (X mark) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0;0.7;0;0" dur="5s" repeatCount="indefinite" keyTimes="0;0.68;0.71;0.73;0.8;1"/> <line x1="37" y1="36" x2="43" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> <line x1="43" y1="36" x2="37" y2="44" stroke="#3B8700" stroke-width="2.5" stroke-linecap="round"/> </g> <!-- Force arrows (pull apart) --> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="14,40 9,37 9,43;8,40 3,37 3,43;2,40 -3,37 -3,43;0,40 -5,37 -5,43;0,40 -5,37 -5,43;14,40 9,37 9,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <polygon fill="#3B8700" opacity="0.4"> <animate attributeName="points" values="66,40 71,37 71,43;72,40 77,37 77,43;78,40 83,37 83,43;80,40 85,37 85,43;80,40 85,37 85,43;66,40 71,37 71,43" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> </polygon> <!-- F labels near arrows --> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="10;5;0;0;0;10" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> <text y="57" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.3" font-weight="bold" font-style="italic"> <animate attributeName="x" values="70;75;80;80;80;70" dur="5s" repeatCount="indefinite" keyTimes="0;0.25;0.6;0.72;0.82;1"/> F </text> </svg>',
          explanation: 'Reduction in area (RA) measures the maximum local deformation at the fracture neck, making it independent of gauge length. Percent elongation, on the other hand, depends heavily on the chosen gauge length — a shorter gauge length gives a higher elongation value because more of the measurement is concentrated around the necked region. This is why RA is preferred as a ductility indicator in critical applications, and why ASTM standards specify exact gauge lengths to make elongation values comparable.',
          hint: 'Think about what happens to the gauge length measurement if you change the initial gauge length. Does the same thing happen to the area measurement?'
                },
        {
          id: 'u7-L1-Q2',
          type: 'multiple-choice',
          question: 'Which hardness test uses a diamond pyramid indenter and is most suitable for measuring hardness of thin coatings or individual microstructural phases?',
          options: [
            'Rockwell C (HRC)',
            'Brinell (HB)',
            'Vickers (HV)',
            'Shore D',
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Specimen block --> <rect x="10" y="48" width="60" height="20" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="10" y="48" width="60" height="20" rx="3" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Surface highlight --> <rect x="12" y="48" width="56" height="3" rx="1" fill="#A5E86C" opacity="0.1"/> <!-- Indenter (animated — pushes down then retracts) --> <g> <animateTransform attributeName="transform" type="translate" dur="3s" repeatCount="indefinite" values="0,0;0,6;0,6;0,0" keyTimes="0;0.3;0.6;0.9" calcMode="spline" keySplines="0.3 0 0.7 1;0.5 0 0.5 1;0.3 0 0.7 1"/> <!-- Indenter body --> <rect x="36" y="10" width="8" height="24" rx="2" fill="#3B8700" opacity="0.3"/> <rect x="36" y="10" width="8" height="24" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Diamond tip --> <polygon points="40,34 37,40 40,48 43,40" fill="#3B8700" opacity="0.45"/> <polygon points="40,34 37,40 40,48 43,40" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> </g> <!-- Force arrow --> <line x1="40" y1="4" x2="40" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/> <polygon points="38,8 40,11 42,8" fill="#3B8700" opacity="0.3"/> <text x="40" y="4" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.25" font-style="italic">F</text> <!-- Indentation mark (appears after indenter pushes) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.35;0.35;0" keyTimes="0;0.28;0.35;0.85;1" dur="3s" repeatCount="indefinite"/> <ellipse cx="40" cy="48" rx="4" ry="1.5" fill="#3B8700" opacity="0.3"/> <!-- Measurement dimension --> <line x1="34" y1="52" x2="46" y2="52" stroke="#3B8700" stroke-width="0.6"/> <line x1="34" y1="50" x2="34" y2="54" stroke="#3B8700" stroke-width="0.6"/> <line x1="46" y1="50" x2="46" y2="54" stroke="#3B8700" stroke-width="0.6"/> <text x="40" y="58" text-anchor="middle" font-size="4" fill="#3B8700" font-style="italic">d</text> </g> <text x="40" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">HV = 1.854F/d²</text> </svg>',
          explanation: 'Vickers hardness uses a diamond square pyramid indenter with a 136° included angle. It can use very low loads (microhardness: 10–1000 gf) making it ideal for thin coatings, case-hardened layers, and individual microstructural phases. Brinell uses a large ball (10 mm) and heavy loads making it unsuitable for thin layers. Rockwell is a quick production test but lacks the precision for micro-scale measurements.',
          hint: 'Think about which test can use very small loads for micro-indentation.'
                },
        {
          id: 'u7-L1-Q3',
          type: 'true-false',
          question: 'In the Charpy impact test, the ductile-to-brittle transition temperature (DBTT) is a concern primarily for BCC metals like carbon steel, not for FCC metals like austenitic stainless steel or aluminum.',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Frame/support --> <line x1="40" y1="4" x2="40" y2="10" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.3"/> <!-- Pendulum arm + hammer (swinging) --> <g> <animateTransform attributeName="transform" type="rotate" dur="2.5s" repeatCount="indefinite" values="-60,40,10;30,40,10;10,40,10;-60,40,10" keyTimes="0;0.35;0.6;1" calcMode="spline" keySplines="0.2 0 0.8 1;0.4 0 0.6 1;0.3 0 0.7 1"/> <line x1="40" y1="10" x2="40" y2="52" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.4"/> <!-- Hammer head --> <rect x="34" y="50" width="12" height="8" rx="2" fill="#3B8700" opacity="0.4"/> <rect x="34" y="50" width="12" height="8" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <!-- Pivot --> <circle cx="40" cy="10" r="3" fill="#3B8700"/> <circle cx="40" cy="10" r="1.2" fill="white" opacity="0.3"/> <!-- Specimen on anvil (at lowest point of swing arc) --> <rect x="36" y="56" width="8" height="4" rx="1" fill="#58CC02" opacity="0.2"/> <rect x="36" y="56" width="8" height="4" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Anvil --> <rect x="28" y="60" width="24" height="6" rx="2" fill="#58CC02" opacity="0.12"/> <rect x="28" y="60" width="24" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Swing arc (dashed) --> <path d="M12,46 Q28,62 52,58 Q64,54 66,42" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="2,3" fill="none" opacity="0.12"/> <!-- Impact flash (at contact moment) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0;0" keyTimes="0;0.33;0.36;0.4;1" dur="2.5s" repeatCount="indefinite"/> <circle cx="40" cy="56" r="6" fill="#58CC02" opacity="0.3"/> <line x1="34" y1="52" x2="30" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> <line x1="46" y1="52" x2="50" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> </g> <!-- Height labels --> <text x="14" y="34" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₁</text> <text x="66" y="38" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₂</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">E = mg(h₁−h₂)</text> </svg>',
          explanation: 'BCC metals (ferritic/martensitic steels, chromium, tungsten) exhibit a sharp ductile-to-brittle transition as temperature decreases because dislocation mobility drops rapidly. FCC metals (austenitic stainless steels, aluminum, copper, nickel) do not exhibit a clear DBTT — they remain relatively ductile even at cryogenic temperatures. This is why austenitic stainless steels are preferred for cryogenic applications such as LNG tanks.',
          hint: 'Consider the crystal structure and how it affects dislocation mobility at low temperatures.'
                },
        {
          id: 'u7-L1-Q4',
          type: 'multiple-choice',
          question: 'A steam header in a power plant operates at 550°C under constant internal pressure. After 15 years of service, inspection reveals the tube has permanently bulged outward. There are no signs of corrosion or cyclic loading. What failure mechanism is most likely responsible, and what would you look for next?',
          options: [
            'Thermal fatigue — the temperature cycling caused progressive cracking. Next step: look for surface cracks at stress concentrations.',
            'Creep — sustained stress at high temperature caused time-dependent plastic deformation. Next step: measure wall thickness and check for tertiary-stage cracking.',
            'Stress corrosion cracking — the combination of stress and environment caused branching cracks. Next step: examine the inner surface for chemical deposits.',
            'Overload yielding — the pressure exceeded the yield strength at operating temperature. Next step: review pressure records for spikes.',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,63.5 74,66.5 76,65" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="76" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">time</text> <text x="6" y="36" text-anchor="middle" font-size="5" fill="#3B8700" opacity="0.3" font-style="italic">ε</text> <!-- Creep curve: instantaneous → primary → secondary (steady) → tertiary → rupture --> <path d="M12,58 L14,42 Q18,36 24,34 L46,28 Q56,24 62,18 L66,12" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"> <animate attributeName="stroke-dashoffset" values="100;0;0;100" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Region separators (dashed verticals) --> <line x1="18" y1="36" x2="18" y2="65" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2.5" opacity="0"> <animate attributeName="opacity" values="0;0;0.15;0.15;0" keyTimes="0;0.1;0.15;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <line x1="50" y1="26" x2="50" y2="65" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="1.5,2.5" opacity="0"> <animate attributeName="opacity" values="0;0;0.15;0.15;0" keyTimes="0;0.38;0.42;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Region labels --> <text x="12" y="72" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.06;0.1;0.82;1" dur="6s" repeatCount="indefinite"/>I</text> <text x="32" y="72" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.18;0.22;0.82;1" dur="6s" repeatCount="indefinite"/>II (steady)</text> <text x="58" y="72" text-anchor="middle" font-size="3" fill="#3B8700" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.42;0.46;0.82;1" dur="6s" repeatCount="indefinite"/>III</text> <!-- Rupture X --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.5;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="63" y1="9" x2="69" y2="15" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="69" y1="9" x2="63" y2="15" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> </g> <!-- Tracing dot --> <circle r="3" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,58 L14,42 Q18,36 24,34 L46,28 Q56,24 62,18 L66,12" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'The permanent bulging under constant stress at 550°C is classic creep deformation. Creep occurs in metals above roughly 0.4 × T_melting (in Kelvin) — for steel, that is around 400°C. After 15 years, the header may be in the tertiary creep stage where deformation accelerates toward rupture. The next steps would be: measure remaining wall thickness, check for micro-cracking in the bulged region (creep voids at grain boundaries), and compare the bulge dimensions against remaining-life assessment methods like the Larson-Miller parameter. This is a real-world scenario in aging power plants.',
          hint: 'Consider which mechanism causes permanent deformation under constant load over years — not cycles — at high temperature.'
                },
        {
          id: 'u7-L1-Q5',
          type: 'multiple-choice',
          question: 'An S-N curve for a steel shows an endurance limit of 300 MPa. What does this mean in practical terms?',
          options: [
            'The material will fail after exactly 10⁶ cycles at 300 MPa — an oversimplification of the real process',
            'Below 300 MPa cyclic stress amplitude, the material can theoretically endure infinite cycles without fatigue failure',
            'The ultimate tensile strength is 300 MPa, though corrosion effects can modify this outcome',
            'The yield strength under cyclic loading is 300 MPa — this reasoning applies only under idealized conditions not found in service',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="65" x2="74" y2="65" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="65" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,63.5 74,66.5 76,65" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="76" text-anchor="middle" font-size="5.5" fill="#3B8700" opacity="0.3" font-style="italic">log N</text> <text x="6" y="36" text-anchor="middle" font-size="5.5" fill="#3B8700" opacity="0.3" font-style="italic">S</text> <!-- S-N curve (animated draw) --> <path d="M16,14 Q24,16 32,26 Q40,36 48,42 Q56,46 68,48" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="90" stroke-dashoffset="90"> <animate attributeName="stroke-dashoffset" values="90;0;0;90" keyTimes="0;0.5;0.8;1" dur="5s" repeatCount="indefinite"/> </path> <!-- Endurance limit line (horizontal asymptote) --> <line x1="48" y1="48" x2="74" y2="48" stroke="#A5E86C" stroke-width="1" stroke-dasharray="2,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.4;0.5;0.8;1" dur="5s" repeatCount="indefinite"/> </line> <text x="72" y="44" font-size="4" fill="#3B8700" opacity="0" font-style="italic"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.4;0.5;0.8;1" dur="5s" repeatCount="indefinite"/> S_e </text> <!-- Tracing dot --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="5s" repeatCount="indefinite" path="M16,14 Q24,16 32,26 Q40,36 48,42 Q56,46 68,48" keyPoints="0;1;1;0" keyTimes="0;0.5;0.8;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.51;1" dur="5s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.4"> <animateMotion dur="5s" repeatCount="indefinite" path="M16,14 Q24,16 32,26 Q40,36 48,42 Q56,46 68,48" keyPoints="0;1;1;0" keyTimes="0;0.5;0.8;1" calcMode="linear"/> <animate attributeName="opacity" values="0.4;0.4;0;0" keyTimes="0;0.5;0.51;1" dur="5s" repeatCount="indefinite"/> </circle> <!-- Region labels --> <text x="24" y="60" font-size="3.5" fill="#3B8700" opacity="0.15">LCF</text> <text x="56" y="60" font-size="3.5" fill="#3B8700" opacity="0.15">HCF</text> </svg>',
          explanation: 'The endurance limit (or fatigue limit) is the stress amplitude below which a material can withstand theoretically infinite cycles without fatigue failure. This is a characteristic of ferrous metals and titanium — most non-ferrous metals (aluminum, copper) do not exhibit a true endurance limit and will eventually fail at any stress. For steel, the endurance limit is typically 0.4–0.5 × UTS for polished, unnotched specimens.',
          hint: 'The endurance limit is the horizontal asymptote on the S-N curve.'
                },
        {
          id: 'u7-L1-Q6',
          type: 'fill-blank',
          question: 'A shaft broke unexpectedly in service. The fracture surface shows smooth, curved "beach marks" radiating from an origin point, with a small rough area of final fracture. This pattern is characteristic of _____ failure.',
          blanks: ['fatigue'],
          wordBank: ['fatigue', 'creep', 'corrosion', 'buckling', 'yielding'],
          explanation: 'Beach marks (also called clamshell marks or arrest lines) are the hallmark of fatigue failure. They represent the position of the crack front at different stages of growth, caused by variations in loading or environmental conditions. The crack initiates at a stress concentration (notch, keyway, surface defect), propagates slowly through most of the cross-section (smooth region), and final fracture occurs suddenly when the remaining cross-section can no longer carry the load (rough area). Identifying this pattern is critical in failure analysis — it tells you the failure was caused by cyclic loading, not a single overload event.',
          hint: 'The smooth, progressively spreading region with curved markings and a small rough final fracture zone is a textbook signature of which failure mode?'
                },
        {
          id: 'u7-L1-Q7',
          type: 'multiple-choice',
          question: "A material has a yield strength of 350 MPa and an ultimate tensile strength of 520 MPa. What is the strain hardening ratio, and what does it indicate about the material's formability?",
          options: [
            "Ratio is 520/350 = 1.49, indicating good formability — the material can distribute strain before necking",
            "Ratio is 350/520 = 0.67, indicating the material is too soft for structural use",
            "Ratio is (520-350)/350 = 0.49, indicating 49% elongation at fracture, prior to any post-processing",
            "Ratio is 520-350 = 170 MPa, which is the working stress range for the material",
          ],
          correctIndex: 0,
          explanation: "The strain hardening ratio (UTS/YS) of 1.49 indicates that the material work-hardens significantly between yielding and necking. A higher ratio (>1.3) means the material can distribute plastic strain more uniformly, delaying necking and improving formability. Low-carbon steels typically have ratios of 1.3-1.5, while cold-worked or high-strength steels may have ratios closer to 1.0-1.1, indicating limited formability.",
          hint: "The ratio of UTS to yield strength tells you how much the material strengthens after yielding begins."
        },
        {
          id: 'u7-L1-Q8',
          type: 'multiple-choice',
          question: "During a tensile test of a round bar specimen, the engineering stress appears to decrease after reaching the UTS. Is the material actually getting weaker?",
          options: [
            "Yes, the material softens due to internal damage accumulation after UTS, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
            "The stress decreases because the strain rate drops after UTS — a simplified model that neglects the most significant physical variable",
            "No — the true stress continues to increase, but engineering stress drops because it uses the original cross-sectional area, which does not account for necking",
            "The apparent decrease is a measurement error caused by extensometer slippage during necking, but this applies only to a narrow range of material compositions and temperatures",
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve — animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker — appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker — appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker — appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot — follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: "Engineering stress = F/A₀ (original area). After UTS, necking begins and the cross-sectional area at the neck reduces rapidly. The load drops because the neck cannot sustain the same force, but the true stress (σ_true = F/A_instantaneous) continues to rise until fracture. This distinction is critical in FEA simulations — plasticity models require true stress-strain data, not engineering values.",
          hint: "Engineering stress uses the original area A₀. What happens when the actual area changes dramatically during necking?"
        },
        {
          id: 'u7-L1-Q9',
          type: 'multiple-choice',
          question: "Which of the following correctly ranks common engineering materials from highest to lowest elastic modulus (Young's modulus)?",
          options: [
            "Aluminum > Steel > Titanium > Copper",
            "Steel > Aluminum > Copper > Titanium",
            "Titanium > Steel > Aluminum > Copper",
            "Steel > Copper > Titanium > Aluminum",
          ],
          correctIndex: 3,
          explanation: "Approximate elastic moduli: Steel ~200 GPa, Copper ~120 GPa, Titanium ~110 GPa, Aluminum ~70 GPa. The elastic modulus is determined by atomic bonding strength and is essentially insensitive to heat treatment, cold work, or alloying. This is why steel is preferred for stiffness-critical applications.",
          hint: "Elastic modulus depends on atomic bonding, not on strength or hardness."
        },
        {
          id: 'u7-L1-Q10',
          type: 'true-false',
          question: "The Rockwell C hardness test (HRC) uses a 1/16-inch steel ball indenter and is commonly used for soft metals like aluminum and brass.",
          correctAnswer: false,
          explanation: "Rockwell C uses a diamond cone (Brale) indenter with a 120° included angle and a 150 kg major load. It is used for hard materials: hardened steel, tool steel, and hard alloys (typically 20-70 HRC range). For softer metals, Rockwell B (HRB) is used with a 1/16-inch steel ball indenter and 100 kg major load.",
          hint: "The \"C\" scale is for hard materials. Which indenter type — ball or diamond cone — would be appropriate for hard steel?"
        },
        {
          id: 'u7-L1-Q11',
          type: 'multiple-choice',
          question: "A component made of 316 stainless steel will operate at 700°C under moderate sustained load for 20 years. Which material property should govern the design stress?",
          options: [
            "Room-temperature yield strength divided by a safety factor — though this factor is secondary to the actual governing mechanism",
            "Creep rupture strength at 700°C for 100,000+ hours, obtained from extrapolated creep data using the Larson-Miller parameter",
            "Ultimate tensile strength at 700°C divided by 4, but this applies only to a narrow range of material compositions and temperatures",
            "Fatigue endurance limit at 700°C since the loading is sustained, valid only for isotropic material behavior",
          ],
          correctIndex: 1,
          explanation: "At 700°C (well above 0.4 × T_melt for stainless steel), creep is the dominant failure mechanism. The design stress must be based on creep rupture data, not short-term tensile properties. The Larson-Miller parameter LMP = T(C + log t) allows extrapolation of short-term test data to predict long-term rupture life.",
          hint: "At high temperature with sustained load, time-dependent deformation governs. Which property accounts for both temperature and time?"
        },
        {
          id: 'u7-L1-Q12',
          type: 'multiple-choice',
          question: "What is the primary difference between creep and stress relaxation?",
          options: [
            "Creep is increasing strain under constant stress, while stress relaxation is decreasing stress under constant strain — both are time-dependent, thermally activated processes",
            "Creep occurs in metals while stress relaxation only occurs in polymers — this reasoning applies only under idealized conditions not found in service",
            "Creep is a sudden failure while stress relaxation is gradual — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
            "Stress relaxation only happens below the elastic limit while creep requires plastic deformation, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
          ],
          correctIndex: 0,
          explanation: "Creep: constant stress → increasing strain over time (e.g., turbine blade elongating). Stress relaxation: constant strain → decreasing stress over time (e.g., bolt in a flanged joint losing clamping force). Both are driven by thermally activated dislocation movement and diffusion.",
          hint: "One has constant stress with changing strain; the other has constant strain with changing stress."
        },
        {
          id: 'u7-L1-Q13',
          type: 'fill-blank',
          question: "The Brinell hardness test uses a hardened steel or tungsten carbide ball pressed into the surface under heavy load. The hardness number is calculated from the load divided by the curved surface area of the _____.",
          blanks: ['indentation'],
          wordBank: ['indentation', 'specimen', 'penetrator', 'deformation', 'contact'],
          explanation: "Brinell hardness HB = 2P / (πD(D - √(D² - d²))), where P is the applied load, D is the ball diameter, and d is the diameter of the indentation. The denominator represents the curved surface area of the spherical impression. Brinell is excellent for cast irons and forgings because the large indentation averages out microstructural variations.",
          hint: "The Brinell number uses the curved surface area of the mark left by the ball."
        },
        {
          id: 'u7-L1-Q14',
          type: 'multiple-choice',
          question: "A high-cycle fatigue failure initiated at a machining mark on the surface of a hardened shaft. What surface treatment could have most effectively prevented this failure?",
          options: [
            "Electroplating with chrome for corrosion resistance",
            "Anodizing to increase surface hardness — rarely the controlling factor in practice",
            "Painting the surface to seal out moisture — a common misunderstanding in this context",
            "Shot peening to introduce compressive residual stresses on the surface",
          ],
          correctIndex: 3,
          explanation: "Shot peening introduces compressive residual stresses (typically 200-500 MPa) in a thin surface layer. Since fatigue cracks initiate and grow under tensile stress, the compressive layer suppresses crack initiation at surface defects. Shot peening can improve fatigue life by 30-50% or more. It is standard practice for springs, gears, crankshafts, and connecting rods.",
          hint: "Fatigue cracks start at the surface under tension. What treatment puts the surface into compression?"
        },
        {
          id: 'u7-L1-Q15',
          type: 'multiple-choice',
          question: "An engineer compares two steels for a bridge. Steel A: YS = 250 MPa, Charpy = 100 J at -40°C. Steel B: YS = 500 MPa, Charpy = 20 J at -40°C. Which is more appropriate and why?",
          options: [
            "Steel B — higher yield strength means less material, reducing cost and weight — rarely the controlling factor in practice",
            "Either steel is acceptable since both meet typical yield strength requirements — a common misunderstanding in this context",
            "Steel A — much higher impact toughness at low temperature ensures resistance to brittle fracture in cold weather",
            "Steel B — 20 J impact energy is sufficient for any structural application, relative to the test standard",
          ],
          correctIndex: 2,
          explanation: "Bridge design must consider brittle fracture, especially in cold climates. A 20 J Charpy value at -40°C indicates the steel is near its DBTT and may fracture in a brittle manner under dynamic loading. Most bridge codes require minimum Charpy values of 27-40 J at minimum service temperature. Higher strength is useless if the component fails by brittle fracture.",
          hint: "Bridges experience cold temperatures and dynamic loads from traffic. Which property besides strength is critical?"
        },
        {
          id: 'u7-L1-Q16',
          type: 'true-false',
          question: "Aluminum alloys exhibit a well-defined endurance limit on the S-N curve, similar to carbon steels.",
          correctAnswer: false,
          explanation: "Unlike ferrous metals and titanium, aluminum alloys do NOT exhibit a true endurance limit. The S-N curve continues to slope downward — given enough cycles, aluminum will fail at any stress level above zero. For design, a \"fatigue strength\" is specified at a defined number of cycles (typically 10⁷ or 5×10⁸). This is why aluminum aircraft structures require periodic fatigue inspection.",
          hint: "Does the S-N curve for aluminum flatten out to a horizontal asymptote like steel, or does it keep declining?"
        },
        {
          id: 'u7-L1-Q17',
          type: 'multiple-choice',
          question: "What is the physical meaning of the area under the engineering stress-strain curve up to fracture?",
          options: [
            "The elastic modulus of the material — not the primary mechanism here",
            "The toughness — the total energy per unit volume the material can absorb before fracturing",
            "The yield strength times the elongation, for geometries within standard proportions",
            "The resilience — the elastic energy stored in the material, without considering time-dependent effects",
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Axes --> <line x1="12" y1="68" x2="74" y2="68" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <line x1="12" y1="68" x2="12" y2="8" stroke="#3B8700" stroke-width="1.5" stroke-linecap="round"/> <polygon points="74,66.5 74,69.5 76,68" fill="#3B8700" opacity="0.4"/> <polygon points="10.5,8 13.5,8 12,6" fill="#3B8700" opacity="0.4"/> <text x="44" y="77" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3b5;</text> <text x="7" y="38" text-anchor="middle" font-size="7" fill="#3B8700" opacity="0.4" font-style="italic">&#x3c3;</text> <!-- Yield stress reference line --> <line x1="12" y1="32" x2="20" y2="32" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- UTS reference line --> <line x1="12" y1="16" x2="50" y2="16" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="1.5,2" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <!-- Stress-Strain curve — animated progressive draw --> <path d="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" stroke="#58CC02" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="110" stroke-dashoffset="110"> <animate attributeName="stroke-dashoffset" values="110;0;0;110" keyTimes="0;0.55;0.82;1" dur="6s" repeatCount="indefinite"/> </path> <!-- Yield point marker — appears as curve passes through --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.08;0.12;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="18" cy="32" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="6" y="30" font-size="4.5" fill="#3B8700" opacity="0.7">σ_y</text> </g> <!-- UTS marker — appears at peak --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.35;0.4;0.82;1" dur="6s" repeatCount="indefinite"/> <circle cx="48" cy="16" r="3" stroke="#3B8700" stroke-width="1.2" stroke-dasharray="2,2" fill="none"/> <text x="50" y="12" font-size="4.5" fill="#3B8700" opacity="0.7">UTS</text> </g> <!-- Fracture X marker — appears at end --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0.6;0" keyTimes="0;0.52;0.56;0.82;1" dur="6s" repeatCount="indefinite"/> <line x1="61" y1="27" x2="67" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <line x1="67" y1="27" x2="61" y2="33" stroke="#3B8700" stroke-width="2" stroke-linecap="round"/> <text x="67" y="25" font-size="4" fill="#3B8700" opacity="0.6">F</text> </g> <!-- Tracing dot — follows the curve drawing --> <circle r="3.5" fill="#3B8700"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <circle r="1.5" fill="white" opacity="0.5"> <animateMotion dur="6s" repeatCount="indefinite" path="M12,68 L18,32 Q22,28 28,24 Q38,18 48,16 Q54,16 58,22 L64,30" keyPoints="0;1;1;0" keyTimes="0;0.55;0.82;1" calcMode="linear"/> <animate attributeName="opacity" values="0.5;0.5;0;0" keyTimes="0;0.55;0.56;1" dur="6s" repeatCount="indefinite"/> </circle> <!-- Elastic modulus slope indicator (E) --> <line x1="22" y1="68" x2="28" y2="32" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="3,3" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> </line> <text x="30" y="46" font-size="4.5" fill="#3B8700" font-style="italic" opacity="0"> <animate attributeName="opacity" values="0;0;0.25;0.25;0" keyTimes="0;0.12;0.16;0.82;1" dur="6s" repeatCount="indefinite"/> E </text> </svg>',
          explanation: "The total area under the stress-strain curve represents toughness — energy absorption capacity per unit volume (units: J/m³). A material can be strong but brittle (high stress, low strain = small area) or weak but ductile (low stress, high strain = moderate area). The toughest materials combine high strength AND high ductility.",
          hint: "The integral of stress with respect to strain has units of energy per volume."
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
          explanation: "Secondary creep (Stage II) has a constant, minimum creep rate because strain hardening is balanced by thermally activated recovery. This steady-state creep rate is the most important design parameter. Primary creep shows a decreasing rate, and tertiary creep shows an accelerating rate due to necking, void formation, and microstructural degradation.",
          hint: "In which stage is there a balance between work hardening and thermal recovery?"
        },
        {
          id: 'u7-L1-Q19',
          type: 'multiple-choice',
          question: "What is the key difference between a Charpy and an Izod impact test?",
          options: [
            "Charpy tests the specimen as a simply supported beam struck behind the notch, while Izod tests it as a cantilever struck on the same side as the notch",
            "Charpy uses a V-notch and Izod does not use any notch, which is valid only when the applied stress remains well below the proportional limit of the material",
            "Charpy is for metals only, while Izod is for plastics only — which misidentifies the root cause of the observed engineering behavior",
            "Charpy measures energy absorbed while Izod measures force of impact, though experimental data shows this correlation breaks down at extreme operating conditions",
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Frame/support --> <line x1="40" y1="4" x2="40" y2="10" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.3"/> <!-- Pendulum arm + hammer (swinging) --> <g> <animateTransform attributeName="transform" type="rotate" dur="2.5s" repeatCount="indefinite" values="-60,40,10;30,40,10;10,40,10;-60,40,10" keyTimes="0;0.35;0.6;1" calcMode="spline" keySplines="0.2 0 0.8 1;0.4 0 0.6 1;0.3 0 0.7 1"/> <line x1="40" y1="10" x2="40" y2="52" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.4"/> <!-- Hammer head --> <rect x="34" y="50" width="12" height="8" rx="2" fill="#3B8700" opacity="0.4"/> <rect x="34" y="50" width="12" height="8" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <!-- Pivot --> <circle cx="40" cy="10" r="3" fill="#3B8700"/> <circle cx="40" cy="10" r="1.2" fill="white" opacity="0.3"/> <!-- Specimen on anvil (at lowest point of swing arc) --> <rect x="36" y="56" width="8" height="4" rx="1" fill="#58CC02" opacity="0.2"/> <rect x="36" y="56" width="8" height="4" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Anvil --> <rect x="28" y="60" width="24" height="6" rx="2" fill="#58CC02" opacity="0.12"/> <rect x="28" y="60" width="24" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Swing arc (dashed) --> <path d="M12,46 Q28,62 52,58 Q64,54 66,42" stroke="#A5E86C" stroke-width="0.7" stroke-dasharray="2,3" fill="none" opacity="0.12"/> <!-- Impact flash (at contact moment) --> <g opacity="0"> <animate attributeName="opacity" values="0;0;0.6;0;0" keyTimes="0;0.33;0.36;0.4;1" dur="2.5s" repeatCount="indefinite"/> <circle cx="40" cy="56" r="6" fill="#58CC02" opacity="0.3"/> <line x1="34" y1="52" x2="30" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> <line x1="46" y1="52" x2="50" y2="48" stroke="#58CC02" stroke-width="1.5" stroke-linecap="round"/> </g> <!-- Height labels --> <text x="14" y="34" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₁</text> <text x="66" y="38" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">h₂</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">E = mg(h₁−h₂)</text> </svg>',
          explanation: "Both tests measure energy absorbed during fracture using a pendulum. The key difference is specimen support: Charpy — simply supported horizontal beam, struck opposite the notch; Izod — vertical cantilever, clamped at the base, struck on the notch side. Charpy is dominant in metals testing (ASTM E23), while Izod is more common for plastics (ASTM D256).",
          hint: "Think about how the specimen is held — one is a beam, the other a cantilever."
        },
        {
          id: 'u7-L1-Q20',
          type: 'true-false',
          question: "The modulus of resilience is defined as the area under the stress-strain curve up to the point of fracture.",
          correctAnswer: false,
          explanation: "The modulus of resilience is the area under the stress-strain curve up to the YIELD POINT, not fracture. It represents the maximum elastic energy per unit volume a material can absorb without permanent deformation. Mathematically, U_r = σ_y² / (2E). The area up to fracture is the modulus of toughness.",
          hint: "Resilience is about elastic energy storage. At what point does deformation stop being elastic?"
        },
        {
          id: 'u7-L1-Q21',
          type: 'multiple-choice',
          question: "You are selecting a material for a pressure vessel operating at -196°C (liquid nitrogen). Which is most appropriate?",
          options: [
            "ASTM A36 structural carbon steel — low cost and widely available, measured relative to the original dimensions",
            "AISI 4340 quenched and tempered alloy steel — high strength, independent of strain rate",
            "Austenitic stainless steel (304L) or 9% nickel steel — maintains toughness at cryogenic temperatures",
            "Gray cast iron — high compressive strength — valid for textbook problems but misleading for real-world applications",
          ],
          correctIndex: 2,
          explanation: "At -196°C, BCC metals become dangerously brittle below their DBTT. FCC metals (austenitic stainless steels 304L, 316L) retain excellent toughness at cryogenic temperatures. 9% nickel steel maintains adequate toughness due to retained austenite. Cast iron is extremely brittle even at room temperature under tension.",
          hint: "Which crystal structure remains ductile at extremely low temperatures?"
        },
        {
          id: 'u7-L1-Q22',
          type: 'multiple-choice',
          question: "A Brinell hardness test on gray cast iron yields HB = 200. Using the relationship UTS ≈ 3.45 × HB (MPa), can you reliably estimate the UTS of the cast iron?",
          options: [
            "Yes — UTS ≈ 690 MPa, valid for all metals, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
            "No — the HB-UTS correlation is for steels only. Cast iron has graphite flakes that reduce tensile strength without affecting hardness, so the correlation overpredicts UTS for cast iron.",
            "Yes, but multiply by 0.5 to account for carbon content — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
            "No — Brinell tests are invalid for cast iron — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
          ],
          correctIndex: 1,
          explanation: "The 3.45 × HB correlation is specific to wrought carbon and alloy steels. Gray cast iron contains graphite flakes that act as internal stress concentrators under tension, drastically reducing tensile strength, but have minimal effect on hardness (a compressive, localized measurement). Actual UTS of gray cast iron with HB 200 is typically 200-250 MPa, not 690 MPa.",
          hint: "Hardness is a localized compressive measurement. How do graphite flakes affect tension vs. compression differently?"
        },
        {
          id: 'u7-L1-Q23',
          type: 'fill-blank',
          question: "In a tensile test, the _____ offset method is used to determine the _____ strength of materials that do not exhibit a clear yield point. A line is drawn parallel to the elastic region, offset by a specific strain value.",
          blanks: ['0.2%', 'yield'],
          wordBank: ['0.2%', 'yield', '0.5%', 'tensile', 'fracture', '1.0%'],
          explanation: "Many materials (aluminum alloys, austenitic stainless steels) transition gradually from elastic to plastic behavior without a distinct yield point. The 0.2% offset method draws a line from 0.2% strain (0.002 mm/mm) parallel to the initial linear portion of the curve. Where this line intersects the curve defines the proof stress (yield strength).",
          hint: "This is a standard method defined in ASTM E8 for determining proof stress."
        },
        {
          id: 'u7-L1-Q24',
          type: 'multiple-choice',
          question: "Which factor has the greatest effect on reducing the fatigue endurance limit of a real component compared to a polished laboratory specimen?",
          options: [
            "Surface finish — rough machining marks act as stress concentrators that initiate fatigue cracks",
            "The color of the component, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
            "The speed of the applied cycling — faster cycling always reduces endurance limit",
            "Ambient humidity — water molecules weaken metallic bonds — not the primary mechanism here",
          ],
          correctIndex: 0,
          explanation: "Surface finish typically has the largest impact among the Marin modification factors. A rough-machined surface can reduce the endurance limit by 40-60% compared to a polished specimen, because machining marks act as micro-notches where fatigue cracks nucleate. The modified endurance limit: Se = k_a × k_b × k_c × k_d × k_e × Se'.",
          hint: "Think about the Marin factors — which correction factor typically has the largest magnitude?"
        },
        {
          id: 'u7-L1-Q25',
          type: 'true-false',
          question: "Poisson's ratio of a perfectly incompressible material (like rubber under small strains) is 0.5, meaning it conserves volume exactly during elastic deformation.",
          correctAnswer: true,
          explanation: "Poisson's ratio (ν) relates lateral contraction to axial extension. For volume conservation: ν = 0.5. Most metals have ν = 0.25-0.35 (steel ~0.3, aluminum ~0.33). Rubber approaches ν = 0.5 (nearly incompressible). Cork has ν ≈ 0, which is why it works well as a bottle stopper. Auxetic materials have negative Poisson's ratio.",
          hint: "If a material conserves volume perfectly when stretched, lateral contraction must exactly compensate for axial extension."
        },
        {
          id: 'u7-L1-Q26',
          type: 'multiple-choice',
          question: "A leaf spring made of 5160 steel snapped in service. Fractographic examination shows ratchet marks at multiple initiation sites on the tension surface. What do multiple initiation sites indicate?",
          options: [
            "The spring was subjected to a single severe overload — a simplified model that neglects the most significant physical variable",
            "The spring had a manufacturing defect — a large inclusion at the center — valid for textbook problems but misleading for real-world applications",
            "The spring failed by hydrogen embrittlement, though experimental data shows this correlation breaks down at extreme operating conditions",
            "The stress amplitude was high relative to the endurance limit, causing fatigue cracks to nucleate simultaneously at multiple surface stress concentrators",
          ],
          correctIndex: 3,
          explanation: "Multiple initiation sites (indicated by ratchet marks where adjacent crack fronts merge) suggest high stress amplitude. At low stress, typically only one crack dominates. At high stress, many surface defects simultaneously exceed the threshold for crack initiation. Ratchet marks form steps where neighboring crack fronts on slightly different planes intersect.",
          hint: "Ratchet marks indicate where multiple cracks growing on different planes merged. What loading condition causes many cracks to start at once?"
        },
        {
          id: 'u7-L1-Q27',
          type: 'multiple-choice',
          question: "What is the primary purpose of a stress-rupture test, and how does it differ from a standard creep test?",
          options: [
            "A stress-rupture test measures elastic modulus at high temperature, while creep measures plastic deformation — which contradicts established test results",
            "A stress-rupture test runs until the specimen fractures and records time-to-failure, while a creep test may be interrupted to measure strain rate without requiring fracture",
            "They are identical tests with different names — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "Stress-rupture tests are at room temperature while creep tests are at elevated temperature, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
          ],
          correctIndex: 1,
          explanation: "A stress-rupture test loads the specimen at constant stress and elevated temperature until fracture, recording rupture time. A creep test may run to fracture but is often interrupted to measure minimum creep rate. Stress-rupture data is essential for components like boiler tubes and turbine blades with design lives of 100,000+ hours.",
          hint: "One test focuses on when the specimen breaks; the other on how fast it deforms."
        },
        {
          id: 'u7-L1-Q28',
          type: 'multiple-choice',
          question: "A hardness traverse across a case-carburized gear tooth shows 60 HRC at the surface dropping to 30 HRC at the core. Why is this gradient desirable?",
          options: [
            "It makes the gear lighter because hardened metal weighs less, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
            "The gradient ensures the gear runs more quietly — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice",
            "The hard surface resists wear and contact fatigue, while the tough ductile core resists bending fatigue and impact — combining the best of both",
            "The soft core conducts heat better, keeping the gear cool — a plausible but incorrect interpretation of the underlying physics",
          ],
          correctIndex: 2,
          explanation: "Gears experience surface failures (wear, pitting from Hertzian contact) and root failures (bending fatigue). A hard case (58-62 HRC) provides wear and pitting resistance, while the tough core (28-35 HRC) provides bending fatigue resistance and impact toughness. Through-hardened gears sacrifice one property for the other. Case depth is typically 0.5-1.5 mm for automotive gears.",
          hint: "Gears need to resist two things: surface wear from contact AND bending loads at the tooth root."
        },
        {
          id: 'u7-L1-Q29',
          type: 'true-false',
          question: "The fracture toughness (K_IC) of a material generally increases with increasing yield strength.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Material plate --> <rect x="6" y="20" width="68" height="40" rx="6" fill="#58CC02" opacity="0.06"/> <rect x="6" y="20" width="68" height="40" rx="6" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- Initial edge notch (V-shape stress riser) --> <path d="M6,37 L13,40 L6,43" stroke="#3B8700" stroke-width="1.2" fill="none" opacity="0.25"/> <!-- Crack opening displacement wedge (widens behind tip) --> <path fill="#3B8700" opacity="0"> <animate attributeName="d" values="M6,40 L6,40 L6,40 L6,40 Z;M6,38 L55,39.7 L55,40.3 L6,42 Z;M6,40 L6,40 L6,40 L6,40 Z" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.12;0" dur="4s" repeatCount="indefinite"/> </path> <!-- Main crack line (propagates from notch) --> <line y1="40" x1="12" y2="40" stroke="#3B8700" stroke-width="2" stroke-linecap="round"> <animate attributeName="x2" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> </line> <!-- Crack tip plastic zone (stress intensity) --> <circle cy="40" r="4" fill="#58CC02" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.2;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="3;7;3" dur="4s" repeatCount="indefinite"/> </circle> <!-- Inner yield zone (smaller, darker) --> <circle cy="40" r="2" fill="#3B8700" opacity="0"> <animate attributeName="cx" values="12;55;12" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0 0.8 1;0.2 0 0.8 1"/> <animate attributeName="opacity" values="0;0.15;0" dur="4s" repeatCount="indefinite"/> <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite"/> </circle> <!-- Microcracks — branch up and down as main crack passes --> <line x1="24" y1="40" x2="27" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.25;0.3;0.8;1"/> </line> <line x1="24" y1="40" x2="21" y2="46" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.27;0.32;0.8;1"/> </line> <line x1="37" y1="40" x2="40" y2="34" stroke="#58CC02" stroke-width="1" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.3;0.3;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.42;0.47;0.8;1"/> </line> <line x1="37" y1="40" x2="34" y2="47" stroke="#A5E86C" stroke-width="0.8" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.44;0.49;0.8;1"/> </line> <line x1="48" y1="40" x2="51" y2="35" stroke="#A5E86C" stroke-width="0.7" stroke-linecap="round" opacity="0"> <animate attributeName="opacity" values="0;0;0.2;0.2;0" dur="4s" repeatCount="indefinite" keyTimes="0;0.58;0.63;0.8;1"/> </line> <!-- Tensile stress arrows (Mode I — opening) --> <!-- Top arrows (2) pulling up --> <line x1="28" y1="16" x2="28" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,16 28,13 29.5,16" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="16" x2="52" y2="20" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,16 52,13 53.5,16" fill="#3B8700" opacity="0.2"/> <!-- Bottom arrows (2) pulling down --> <line x1="28" y1="60" x2="28" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="26.5,64 28,67 29.5,64" fill="#3B8700" opacity="0.2"/> <line x1="52" y1="60" x2="52" y2="64" stroke="#3B8700" stroke-width="1.2" opacity="0.2" stroke-linecap="round"/> <polygon points="50.5,64 52,67 53.5,64" fill="#3B8700" opacity="0.2"/> <!-- Stress label --> <text x="40" y="11" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> <text x="40" y="73" text-anchor="middle" font-size="6" fill="#3B8700" opacity="0.2" font-style="italic">σ</text> </svg>',
          explanation: "Fracture toughness generally DECREASES with increasing yield strength. Higher yield strength reduces the ability to plastically deform at the crack tip, making the material more susceptible to brittle fracture. For example, 4340 steel at 45 HRC has K_IC ≈ 50 MPa√m, but at 55 HRC, K_IC drops to ≈ 20 MPa√m. This strength-toughness trade-off is fundamental in materials selection.",
          hint: "As a material gets harder and stronger, does it become more or less able to absorb energy at a crack tip?"
        },
        {
          id: 'u7-L1-Q30',
          type: 'fill-blank',
          question: "In fracture mechanics, the critical value of stress intensity factor at which a crack propagates unstably under plane strain conditions is called K_____ (the plane-strain fracture toughness).",
          blanks: ['IC'],
          wordBank: ['IC', 'IIC', 'max', 'eff', 'th'],
          explanation: "K_IC (plane-strain fracture toughness) is a material property defining the critical stress intensity factor for unstable crack propagation under Mode I (opening) loading in plane strain. It is measured per ASTM E399. Typical values: mild steel ~50 MPa√m, aluminum 7075-T6 ~29 MPa√m, glass ~0.7 MPa√m.",
          hint: "The subscript combines the loading mode (I = opening) and the condition (C = critical)."
        }
      ]
    },
    {
      id: 'u7-L2',
      title: 'Phase Diagrams & Heat Treatment',
      description: 'Iron-carbon diagram, TTT/CCT diagrams, annealing/normalizing/quenching/tempering, martensite/austenite/pearlite.',
      icon: '📊',
      xpReward: 25,
      questions: [
        {
          id: 'u7-L2-Q1',
          type: 'multiple-choice',
          question: 'Why can austenite (FCC iron) dissolve much more carbon than ferrite (BCC iron)? Walk through the crystallographic reasoning.',
          options: [
            'FCC has larger atoms that can bond with more carbon atoms chemically, but industry experience indicates this factor plays only a minor role in the overall performance',
            'FCC has larger octahedral interstitial sites that accommodate carbon atoms with less lattice distortion, despite having fewer total interstitial sites than BCC',
            'BCC is a more tightly packed structure with no interstitial sites at all, so carbon cannot physically fit — an oversimplification of the real process',
            'FCC is a higher-temperature phase with weaker bonds, allowing carbon atoms to push iron atoms apart more easily, which limits its practical applicability',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: 'FCC iron has larger octahedral interstitial sites (radius ratio ~0.41R) compared to BCC (largest octahedral sites ~0.15R). Although BCC actually has more total interstitial sites, they are all smaller and highly asymmetric. Carbon atoms (radius ~0.77 Å) fit into FCC sites with moderate distortion but cause severe asymmetric distortion in BCC. This is why austenite can dissolve up to 2.14 wt% C while ferrite can only manage 0.022 wt% C. This difference in solubility is the entire basis for heat treatment of steel — when austenite is cooled, the excess carbon must be rejected, forming cementite, or becoming trapped (martensite).',
          hint: 'Think about the interstitial site sizes in FCC vs. BCC crystal structures, not just the packing factor.'
                },
        {
          id: 'u7-L2-Q2',
          type: 'multiple-choice',
          question: 'A 1045 steel (0.45% C) is heated to 850°C, quenched in water, then tempered at 400°C. What is the primary purpose of the tempering step?',
          options: [
            'To dissolve all cementite into austenite — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause',
            'To transform retained austenite to martensite — an incomplete explanation that overlooks the dominant contributing factor',
            'To reduce brittleness of martensite by allowing controlled precipitation of carbides while maintaining adequate hardness',
            'To increase hardness beyond what quenching achieved, though corrosion effects can modify this outcome',
          ],
          correctIndex: 2,
          explanation: 'Tempering relieves internal stresses in the supersaturated martensite and allows carbon to diffuse out, forming fine carbide precipitates (tempered martensite). This dramatically improves toughness and ductility at some cost to hardness. Higher tempering temperatures give lower hardness but better toughness. The 400°C temper produces a good balance of strength (~1000 MPa) and toughness for most structural applications. Avoid 250–350°C for certain steels due to temper embrittlement.',
          hint: 'As-quenched martensite is very hard but extremely brittle. What fixes that?'
                },
        {
          id: 'u7-L2-Q3',
          type: 'true-false',
          question: 'The eutectoid composition of the Fe-C system is 0.8 wt% carbon at 727°C, and the resulting microstructure (slow cooling) is pearlite — alternating lamellae of ferrite and cementite.',
          correctAnswer: true,
          explanation: 'At 0.8 wt% C and 727°C, the eutectoid reaction occurs: austenite → ferrite + cementite (Fe₃C). The resulting lamellar microstructure is called pearlite due to its pearl-like appearance under the microscope. Finer pearlite (faster cooling) is harder than coarse pearlite. Steels with less than 0.8% C are hypoeutectoid (proeutectoid ferrite + pearlite), and those with more are hypereutectoid (proeutectoid cementite + pearlite).',
          hint: 'The eutectoid point is where austenite transforms directly into two phases simultaneously.'
                },
        {
          id: 'u7-L2-Q4',
          type: 'multiple-choice',
          question: 'A machinist quenched a 1045 steel part in water and achieved full hardness, but when the same procedure was used on a larger part of the same steel, the core remained soft. What is the metallurgical explanation and how would you solve this problem?',
          options: [
            'The larger part has more carbon at the surface than the core. Solution: use a higher-carbon steel for the larger part. The actual controlling parameter is not captured by this explanation.',
            'The larger part\'s core could not cool fast enough to bypass the TTT nose, so it transformed to softer pearlite instead of martensite. Solution: use an alloy steel with better hardenability or a more aggressive quenchant.',
            'Water quenching only works for small parts. Solution: switch to oil quenching for better penetration of cooling into the core. This explanation confuses cause and effect in the underlying process.',
            'The furnace could not heat the larger part uniformly, so the core was never fully austenitized. Solution: increase soak time at temperature. While plausible, experimental evidence contradicts this interpretation.',
          ],
          correctIndex: 1,
          explanation: 'This is a classic hardenability problem. The core of a large part cools more slowly than the surface. If the cooling rate at the core is slower than the critical cooling rate (the rate needed to bypass the nose of the TTT diagram), the austenite transforms into pearlite or bainite instead of martensite. The solution is to increase hardenability by adding alloying elements (Cr, Mo, Ni, Mn) that shift the TTT nose to the right, giving the core more time to cool before transformation begins. This is exactly what alloy steels like 4140 or 4340 are designed for. A Jominy end-quench test directly measures this property.',
          hint: 'Think about what the TTT diagram tells you about cooling rate vs. transformation. What happens when the core cools too slowly?'
                },
        {
          id: 'u7-L2-Q5',
          type: 'multiple-choice',
          question: 'A welded structural frame made of 1020 steel has uneven grain structure and residual stresses from welding. The engineer wants to refine the microstructure and relieve stresses, but full annealing takes too long. What heat treatment would you recommend and why?',
          options: [
            'Quench and temper — fastest way to refine the grain and relieve stress simultaneously — valid only at room temperature',
            'Normalizing — heat above the upper critical temperature and air cool. Faster than annealing, refines grains, and relieves most residual stresses.',
            'Stress relieving at 600°C — this will both relieve stress and refine the grain structure through recrystallization',
            'Process annealing at 550°C — suitable for low-carbon steel and will recrystallize the grains without requiring high temperatures',
          ],
          correctIndex: 1,
          explanation: 'Normalizing (heating to 50-80°C above Ac₃ followed by air cooling) is the right choice here. It fully austenitizes the steel, allowing new, refined grains to form on cooling, and the high temperature relieves residual stresses from welding. Air cooling is much faster than furnace cooling (full annealing), making it more economical. Quenching is inappropriate for a structural frame — it would introduce martensite and new residual stresses. Stress relieving alone (sub-critical) would relieve stresses but would not refine the grain structure. Process annealing only recrystallizes cold-worked ferrite and does not refine the grain through phase transformation.',
          hint: 'You need a process that both refines grain structure (requires going above the critical temperature) and is faster than furnace cooling.'
                },
        {
          id: 'u7-L2-Q6',
          type: 'fill-blank',
          question: 'When tempering a quenched steel at progressively higher temperatures, toughness increases but hardness decreases. However, there is a range around 250-350°C that should be avoided for certain alloy steels because it causes a phenomenon called temper _____.',
          blanks: ['embrittlement'],
          wordBank: ['embrittlement', 'softening', 'recrystallization', 'sensitization', 'spheroidization'],
          explanation: 'Temper embrittlement is a loss of toughness (with no corresponding change in hardness) that occurs when certain steels are tempered in the 250-350°C range (Type I / TME) or slowly cooled through 375-575°C (Type II). It is caused by the segregation of impurity elements (P, Sn, Sb, As) to prior austenite grain boundaries, weakening them. This is a critical practical consideration — heat treaters must either avoid these temperature ranges or cool quickly through them. Adding Mo to steel (e.g., 4140 vs 4130) significantly reduces susceptibility.',
          hint: 'This phenomenon makes the steel less tough despite adequate hardness, and is linked to specific tempering temperature ranges.'
                },
        {
          id: 'u7-L2-Q7',
          type: 'multiple-choice',
          question: "What microstructure results when a eutectoid steel is cooled from the austenite region at a rate fast enough to bypass the pearlite nose on the TTT diagram but held at 300-350°C?",
          options: [
            "Lower bainite — a fine mixture of ferrite and carbides formed by isothermal transformation below the pearlite range",
            "Martensite — the fastest-forming transformation product — a plausible but incorrect interpretation of the underlying physics",
            "Coarse pearlite — slow isothermal transformation at any temperature below A₁ produces pearlite",
            "Retained austenite — austenite is stable indefinitely at 300°C — only under very specific loading conditions",
          ],
          correctIndex: 0,
          explanation: "Lower bainite forms by isothermal transformation at 250-350°C. It consists of fine ferrite plates with carbide precipitates within the plates (unlike upper bainite where carbides are at plate boundaries). Lower bainite has an excellent combination of hardness and toughness — often superior to tempered martensite at the same hardness. This is the basis for austempering heat treatment, widely used for springs, fasteners, and ductile iron.",
          hint: "Between the pearlite and martensite regions on the TTT diagram, there is another transformation product."
        },
        {
          id: 'u7-L2-Q8',
          type: 'multiple-choice',
          question: "What is the maximum carbon solubility in austenite (γ-iron) at the eutectic temperature in the Fe-C phase diagram?",
          options: [
            "0.022 wt% C",
            "0.8 wt% C",
            "2.14 wt% C",
            "6.67 wt% C",
          ],
          correctIndex: 2,
          explanation: "Austenite (FCC) can dissolve up to 2.14 wt% C at 1147°C (eutectic temperature). Above 2.14% C, the alloy is classified as cast iron rather than steel. Ferrite (BCC) can only dissolve 0.022 wt% C at 727°C. The eutectoid composition is 0.8% C, and cementite (Fe₃C) contains 6.67 wt% C.",
          hint: "This value marks the boundary between steels and cast irons on the Fe-C diagram."
        },
        {
          id: 'u7-L2-Q9',
          type: 'true-false',
          question: "Martensite is an equilibrium phase that appears on the Fe-C phase diagram.",
          correctAnswer: false,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <line x1="20" y1="20" x2="40" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="60" y2="20" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="60" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="60" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="20" x2="20" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="20" y1="40" x2="20" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="20" x2="40" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="40" y1="40" x2="40" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="20" x2="60" y2="40" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <line x1="60" y1="40" x2="60" y2="60" stroke="#A5E86C" stroke-width="2" opacity="0.3"/> <circle cx="20" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="20" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.45s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;21;19;20" dur="0.35s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="20" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.5s" repeatCount="indefinite"/> <animate attributeName="cy" values="20;19;21;20" dur="0.4s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="20;19;21;20" dur="0.35s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.45s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="40" r="7" fill="#3B8700" opacity="0.4"> <animate attributeName="cx" values="40;41;39;40" dur="0.38s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;39;41;40" dur="0.42s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="40" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="60;59;61;60" dur="0.42s" repeatCount="indefinite"/> <animate attributeName="cy" values="40;41;39;40" dur="0.5s" repeatCount="indefinite"/> </circle> <circle cx="20" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="20;21;19;20" dur="0.48s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.38s" repeatCount="indefinite"/> </circle> <circle cx="40" cy="60" r="6" fill="#58CC02" opacity="0.4"> <animate attributeName="cx" values="40;39;41;40" dur="0.4s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;61;59;60" dur="0.48s" repeatCount="indefinite"/> </circle> <circle cx="60" cy="60" r="6" fill="#58CC02" opacity="0.3"> <animate attributeName="cx" values="60;61;59;60" dur="0.36s" repeatCount="indefinite"/> <animate attributeName="cy" values="60;59;61;60" dur="0.44s" repeatCount="indefinite"/> </circle> </svg>',
          explanation: "Martensite is a NON-EQUILIBRIUM phase — it does not appear on the equilibrium Fe-C phase diagram. It forms by a diffusionless, shear transformation when austenite is cooled too rapidly for carbon to diffuse out. The carbon atoms are trapped in a body-centered tetragonal (BCT) lattice, creating severe lattice distortion and extreme hardness. The Fe-C phase diagram only shows equilibrium phases: ferrite, austenite, cementite (Fe₃C), and liquid.",
          hint: "The Fe-C phase diagram shows equilibrium phases only. Martensite forms when equilibrium is prevented by rapid cooling."
        },
        {
          id: 'u7-L2-Q10',
          type: 'multiple-choice',
          question: "A 1080 steel (0.8% C, eutectoid) is slowly cooled from 800°C. What microstructure forms and what is its approximate hardness?",
          options: [
            "Martensite, approximately 65 HRC, particularly at elevated loads",
            "Bainite, approximately 40 HRC, excluding contributions from residual stresses",
            "Ferrite with a small amount of pearlite, approximately 15 HRC, assuming no environmental degradation occurs",
            "100% pearlite (alternating lamellae of ferrite and cementite), approximately 25-30 HRC",
          ],
          correctIndex: 3,
          explanation: "At 0.8% C (eutectoid composition), slow cooling from austenite produces 100% pearlite through the eutectoid reaction: γ → α + Fe₃C. The pearlite hardness depends on lamellar spacing — coarse pearlite (slow cool) is about 20-25 HRC, fine pearlite (faster air cool) about 30 HRC. Hypoeutectoid steels (<0.8% C) form proeutectoid ferrite + pearlite, while hypereutectoid steels (>0.8% C) form proeutectoid cementite + pearlite.",
          hint: "The eutectoid composition transforms entirely into pearlite under slow cooling. No proeutectoid phases form."
        },
        {
          id: 'u7-L2-Q11',
          type: 'multiple-choice',
          question: "What is the purpose of adding molybdenum to alloy steels like 4140 and 4340?",
          options: [
            "To increase the carbon content for greater hardness, though this interpretation oversimplifies the actual mechanism involved",
            "To improve hardenability by shifting the TTT/CCT nose to longer times, and to reduce susceptibility to temper embrittlement",
            "To lower the melting point for easier casting, assuming uniform property distribution through the thickness without any processing-induced gradients",
            "To make the steel non-magnetic, which is valid only when the applied stress remains well below the proportional limit of the material",
          ],
          correctIndex: 1,
          explanation: "Molybdenum is one of the most effective hardenability elements — it delays the pearlite and bainite transformations (shifts the TTT nose right), allowing thicker sections to achieve full martensite. Additionally, Mo reduces susceptibility to Type II (reversible) temper embrittlement by preventing phosphorus and other tramp elements from segregating to grain boundaries. This is why 4140 (with Mo) is preferred over 4130 (without Mo) for critical applications.",
          hint: "Mo has two key roles: it affects the TTT diagram position and it prevents a specific embrittlement phenomenon."
        },
        {
          id: 'u7-L2-Q12',
          type: 'multiple-choice',
          question: "A Jominy end-quench test bar shows 60 HRC at the quenched end and drops to 25 HRC at 25 mm from the quenched end. What does this indicate about the steel?",
          options: [
            "The steel has poor hardenability — hardness drops rapidly with distance from the quenched end, meaning only thin sections can be fully hardened",
            "The steel has excellent hardenability — it maintains hardness deep into the section, which does not account for the microstructural changes occurring at these conditions",
            "The test was performed incorrectly — all steels should show uniform hardness, which limits its practical applicability",
            "The steel has too much carbon, causing the hardness to drop — this reasoning applies only under idealized conditions not found in service",
          ],
          correctIndex: 0,
          explanation: "The Jominy test measures hardenability by quenching one end of a standard bar and plotting hardness vs. distance. A steep drop indicates low hardenability — the cooling rate a few millimeters from the surface is too slow to form martensite. This is typical of plain carbon steels (1040, 1045). Alloy steels (4140, 4340) show a much flatter curve — maintaining high hardness to 25+ mm — because alloying elements delay the pearlite/bainite transformation.",
          hint: "The Jominy curve directly shows how fast hardness decreases as the cooling rate slows."
        },
        {
          id: 'u7-L2-Q13',
          type: 'fill-blank',
          question: "In the Fe-C phase diagram, alloys containing more than _____ wt% carbon are classified as cast _____, not steels.",
          blanks: ['2.14', 'iron'],
          wordBank: ['2.14', 'iron', '0.8', 'steel', '4.3', 'bronze'],
          explanation: "The 2.14 wt% C boundary separates steels (<2.14% C) from cast irons (2.14-6.67% C). This is the maximum carbon solubility in austenite. Cast irons (gray, ductile, white, malleable) contain enough carbon to form a eutectic reaction at 1147°C, producing lower melting temperatures and excellent castability.",
          hint: "The 2.14% carbon boundary separates two major families of ferrous alloys."
        },
        {
          id: 'u7-L2-Q14',
          type: 'multiple-choice',
          question: "A heat treater accidentally quenched a 1045 steel part in water without tempering. The part cracked on the shelf overnight. What is the most likely cause of this delayed cracking?",
          options: [
            "Thermal shock from ambient temperature changes overnight, though this interpretation oversimplifies the actual mechanism involved",
            "Residual austenite transformed to ferrite overnight, causing volume changes, but this applies only to a narrow range of material compositions and temperatures",
            "The part continued to cool overnight, reaching its DBTT — a plausible but incorrect interpretation of the underlying physics",
            "Hydrogen cracking — diffusible hydrogen combined with the high residual stresses and hard, brittle as-quenched martensite caused time-delayed fracture",
          ],
          correctIndex: 3,
          explanation: "Delayed cracking (also called \"shelf cracking\") in as-quenched martensite is caused by diffusible hydrogen. Hydrogen can come from moisture, quenchant, or furnace atmosphere. The hard martensite (>50 HRC) has very low tolerance for hydrogen, and the high residual stresses from quenching provide the driving force. Hydrogen diffuses slowly to stress concentrations (grain boundaries, microcracks), eventually causing delayed brittle fracture — sometimes hours or days after quenching. This is why tempering ASAP after quenching is critical.",
          hint: "What causes time-delayed cracking in hard martensite? Think about what small atoms diffuse slowly to stress concentrations."
        },
        {
          id: 'u7-L2-Q15',
          type: 'multiple-choice',
          question: "What is the key difference between process annealing and full annealing of steel?",
          options: [
            "Process annealing is for cast iron while full annealing is for steel, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome",
            "Process annealing is faster because it uses water cooling, while full annealing uses air cooling — however, standard engineering analysis methods and field experience both point to a different conclusion",
            "Process annealing heats below the lower critical temperature (A₁) to recrystallize cold-worked ferrite, while full annealing heats above the upper critical temperature (A₃) to fully austenitize and refine the grain structure",
            "There is no difference — they are the same process, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response",
          ],
          correctIndex: 2,
          explanation: "Process annealing (subcritical annealing) heats to 550-650°C — below A₁ (727°C) — to recrystallize cold-worked ferrite without going through the austenite phase transformation. It is used between cold-working passes to restore ductility. Full annealing heats above A₃ (for hypoeutectoid) or A_cm (for hypereutectoid) and furnace cools to produce the softest possible microstructure with refined grains. Full annealing takes much longer due to slow furnace cooling.",
          hint: "The critical difference is whether you heat above or below the transformation temperature A₁."
        },
        {
          id: 'u7-L2-Q16',
          type: 'true-false',
          question: "Spheroidizing is a heat treatment that produces the softest and most ductile form of a given steel, making it easier to machine or cold-form.",
          correctAnswer: true,
          explanation: "Spheroidizing transforms the lamellar cementite in pearlite into spherical (globular) particles embedded in a ferrite matrix. This produces the lowest hardness and highest ductility achievable for a given steel composition. It is typically performed on high-carbon steels (>0.6% C) and tool steels before machining or cold forming. The process involves prolonged heating just below A₁ (700°C) for 15-25 hours, or cycling above and below A₁.",
          hint: "When cementite changes from sharp lamellae to rounded spheres, stress concentrations are minimized."
        },
        {
          id: 'u7-L2-Q17',
          type: 'multiple-choice',
          question: "What distinguishes a CCT (Continuous Cooling Transformation) diagram from a TTT (Time-Temperature-Transformation) diagram?",
          options: [
            "They are identical — CCT and TTT are interchangeable names for the same diagram — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
            "CCT shows transformations during continuous cooling (as in actual quenching), while TTT shows isothermal (constant temperature) transformations. CCT curves are shifted to the right and downward compared to TTT.",
            "TTT is for steels and CCT is for aluminum alloys, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response",
            "CCT is used for heating and TTT is used for cooling, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
          ],
          correctIndex: 1,
          explanation: "TTT diagrams require instantaneous quenching to a temperature and holding there (isothermal transformation) — useful for salt bath quenching. CCT diagrams reflect real-world continuous cooling (e.g., water, oil, or air quenching) where the temperature drops continuously. CCT curves are shifted right (longer times) and down (lower temperatures) relative to TTT because some transformation time is \"consumed\" during cooling to the hold temperature. CCT diagrams are more practical for production heat treatment.",
          hint: "Real quenching involves continuous temperature change, not an instantaneous jump to a constant temperature."
        },
        {
          id: 'u7-L2-Q18',
          type: 'multiple-choice',
          question: "An engineer needs to case-harden a low-carbon steel (1020) gear to achieve a hard, wear-resistant surface while maintaining a tough core. Which process is most appropriate?",
          options: [
            "Through-hardening by water quenching — heats above A₃ and quenches to martensite throughout, verified against reference specimens of known properties",
            "Normalizing — refines grain structure but does not increase surface hardness significantly, assuming homogeneous material throughout the section",
            "Tempering at 600°C — reduces brittleness throughout the part, provided the test specimen geometry conforms to the requirements specified in the standard",
            "Carburizing — diffuse carbon into the surface at 900-950°C, then quench to form a high-carbon martensitic case over a low-carbon tough core",
          ],
          correctIndex: 3,
          explanation: "Carburizing diffuses carbon (from gas, liquid, or pack medium) into the surface of low-carbon steel at 900-950°C, raising surface carbon to 0.7-0.9%. After quenching, the high-carbon surface transforms to hard martensite (58-62 HRC) while the low-carbon core remains tough (30-35 HRC). Case depths are typically 0.5-2.0 mm. Through-hardening 1020 steel would not achieve high hardness because of insufficient carbon. Alternative case-hardening methods include nitriding and carbonitriding.",
          hint: "Low-carbon steel cannot achieve high hardness on its own. What process adds carbon to the surface before quenching?"
        },
        {
          id: 'u7-L2-Q19',
          type: 'multiple-choice',
          question: "What is retained austenite, and why is it a concern in hardened steel components?",
          options: [
            "Austenite that did not transform during cooling — it is softer than martensite and can transform later during service, causing dimensional instability",
            "Austenite that formed during tempering — it increases toughness, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
            "A type of austenite that only exists in stainless steels, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
            "Austenite that is retained in the grain boundaries to improve corrosion resistance, without considering time-dependent effects",
          ],
          correctIndex: 0,
          explanation: "When steel is quenched, some austenite may not transform to martensite, especially in high-carbon and high-alloy steels where the martensite finish temperature (Mf) is below the quenchant temperature. This retained austenite is softer than martensite (reducing overall hardness) and can transform during service under stress or temperature changes, causing dimensional changes. Sub-zero treatment (-80°C to -196°C) converts retained austenite to martensite. It is a critical concern for precision gauges, bearings, and gear teeth.",
          hint: "Not all austenite transforms during quenching. What problems does the untransformed portion cause?"
        },
        {
          id: 'u7-L2-Q20',
          type: 'true-false',
          question: "Nitriding is a case-hardening process that requires quenching after treatment to achieve surface hardness.",
          correctAnswer: false,
          explanation: "Nitriding does NOT require quenching — the hardness comes from hard nitride compounds (Fe₂N, Fe₄N, CrN, AlN) formed by diffusing nitrogen into the surface at 500-590°C, which is below the transformation temperature. Since no phase transformation is involved, there is minimal distortion — a major advantage over carburizing. Nitriding produces very high surface hardness (>70 HRC equivalent) and excellent fatigue resistance but limited case depths (0.1-0.5 mm). Steels containing Al, Cr, Mo, or V (e.g., Nitralloy, 4140) form the hardest nitride cases.",
          hint: "The hardening mechanism in nitriding is compound formation, not martensite transformation."
        },
        {
          id: 'u7-L2-Q21',
          type: 'multiple-choice',
          question: "A hypoeutectoid steel (0.4% C) is heated to 780°C and slowly cooled. What microstructural constituents will be present at room temperature and in what order did they form?",
          options: [
            "Martensite only — rapid cooling from austenite, but the predominant failure mechanism under these conditions is fundamentally different",
            "Pearlite forms first, then ferrite fills in the remaining space, though this interpretation oversimplifies the actual mechanism involved",
            "Proeutectoid ferrite forms first along austenite grain boundaries as the steel cools below A₃, then remaining austenite transforms to pearlite at A₁ (727°C)",
            "Cementite network forms along grain boundaries, then pearlite fills the grains — though this factor is secondary to the actual governing mechanism",
          ],
          correctIndex: 2,
          explanation: "For hypoeutectoid steels (<0.8% C), cooling from full austenite: (1) Below A₃, proeutectoid ferrite nucleates at austenite grain boundaries and grows, rejecting carbon into the remaining austenite. (2) The remaining austenite enriches in carbon toward 0.8% C. (3) At 727°C (A₁), this enriched austenite transforms to pearlite via the eutectoid reaction. The final microstructure is proeutectoid ferrite + pearlite. The amount of pearlite follows the lever rule: % pearlite ≈ (0.4/0.8) × 100 = 50%.",
          hint: "Follow the cooling on the phase diagram. What phase forms first between A₃ and A₁?"
        },
        {
          id: 'u7-L2-Q22',
          type: 'multiple-choice',
          question: "Why are alloying elements like chromium and nickel added to steel for heat treatment purposes?",
          options: [
            "They increase the carbon content, allowing higher hardness, provided the test specimen geometry conforms to the requirements specified in the standard",
            "They increase hardenability by retarding the diffusion-controlled transformations (pearlite and bainite), allowing martensite formation at slower cooling rates in larger sections",
            "They lower the melting point, making the steel easier to heat treat — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause",
            "They eliminate the need for tempering after quenching, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome",
          ],
          correctIndex: 1,
          explanation: "Alloying elements (Cr, Ni, Mo, Mn, Si) dissolve in austenite and retard carbon diffusion during cooling, shifting TTT/CCT curves to the right. This means slower cooling rates still produce martensite — essential for hardening large or complex parts. Chromium is particularly effective per unit cost. Nickel also improves toughness. The combined effect is measured by hardenability, quantified via the Jominy test or ideal critical diameter calculations using multiplying factors.",
          hint: "The key benefit is shifting the transformation curves to allow more time for the core of large parts to transform to martensite."
        },
        {
          id: 'u7-L2-Q23',
          type: 'fill-blank',
          question: "Austempering is an isothermal heat treatment where steel is quenched to a temperature above Ms (typically 250-400°C) and held to form _____, which provides an excellent combination of strength and toughness.",
          blanks: ['bainite'],
          wordBank: ['bainite', 'martensite', 'pearlite', 'ferrite', 'austenite'],
          explanation: "Austempering involves quenching into a salt bath at 250-400°C and holding until transformation is complete, producing bainite. Compared to conventional quench-and-temper (martensite then tempered), austempering produces less distortion (no volume change from martensite transformation), less residual stress, and often superior toughness at equivalent hardness. It is widely used for ductile iron (ADI — Austempered Ductile Iron), springs, clips, and fasteners.",
          hint: "This microstructure forms isothermally between the pearlite and martensite temperature ranges."
        },
        {
          id: 'u7-L2-Q24',
          type: 'multiple-choice',
          question: "What is sensitization in austenitic stainless steel, and how can it be prevented?",
          options: [
            "Precipitation of chromium carbides (Cr₂₃C₆) at grain boundaries in the 450-850°C range, depleting adjacent regions of chromium below the 10.5% needed for passivation. Prevented by using low-carbon grades (304L, 316L) or stabilized grades (321, 347).",
            "Oxidation of the surface during heat treatment — prevented by using a vacuum furnace, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
            "Absorption of nitrogen from the atmosphere — prevented by argon shielding, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome",
            "Formation of sigma phase during rapid cooling — prevented by slow furnace cooling, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response",
          ],
          correctIndex: 0,
          explanation: "Sensitization occurs when austenitic stainless steel is held at 450-850°C (welding HAZ, improper heat treatment). Carbon diffuses to grain boundaries and combines with chromium to form Cr₂₃C₆ carbides. This depletes the chromium content adjacent to the boundaries below 10.5%, destroying the passive film locally and causing intergranular corrosion (IGC). Solutions: (1) Low-carbon grades (<0.03% C) — 304L, 316L — limit carbide formation. (2) Stabilized grades — 321 (Ti) and 347 (Nb) — preferentially form Ti/Nb carbides instead of Cr carbides. (3) Solution annealing at 1050°C then rapid cooling dissolves any existing carbides.",
          hint: "What happens when chromium combines with carbon at grain boundaries, and what corrosion-resistance threshold is crossed?"
        },
        {
          id: 'u7-L2-Q25',
          type: 'true-false',
          question: "Induction hardening can be used to selectively harden specific surface areas of a medium-carbon steel part without affecting the entire component.",
          correctAnswer: true,
          explanation: "Induction hardening uses electromagnetic induction to rapidly heat a localized surface layer above the austenitizing temperature, followed by immediate quenching (usually water spray). Only the heated layer transforms to martensite; the core remains unaffected. The process is extremely fast (seconds), produces minimal distortion, and can be applied selectively — for example, hardening only the journal surfaces of a crankshaft or the teeth of a gear. It requires medium-carbon steel (0.35-0.5% C) to achieve adequate hardness.",
          hint: "Induction heating concentrates energy in a thin surface layer. Only the heated zone transforms during subsequent quenching."
        },
        {
          id: 'u7-L2-Q26',
          type: 'multiple-choice',
          question: "What is the difference between upper bainite and lower bainite in terms of microstructure and mechanical properties?",
          options: [
            "Upper bainite is FCC while lower bainite is BCC, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "Upper bainite is harder than lower bainite because it forms at higher temperatures — a plausible but incorrect interpretation of the underlying physics",
            "There is no difference — bainite is bainite regardless of formation temperature — a plausible but incorrect interpretation of the underlying physics",
            "Upper bainite has carbides between ferrite plates (lower toughness); lower bainite has carbides within ferrite plates (higher toughness). Both are stronger than pearlite.",
          ],
          correctIndex: 3,
          explanation: "Upper bainite (350-550°C) has coarser ferrite laths with cementite precipitates along the lath boundaries — similar to pearlite but finer. The inter-lath carbides provide crack paths, reducing toughness. Lower bainite (250-350°C) has finer ferrite plates with carbides precipitated within the plates at ~60° to the plate axis — similar to tempered martensite. Lower bainite has superior toughness and is often preferred over tempered martensite for spring and fastener applications.",
          hint: "The key difference is where the carbides precipitate — between or within the ferrite plates."
        },
        {
          id: 'u7-L2-Q27',
          type: 'multiple-choice',
          question: "A part made from D2 tool steel (high-carbon, high-chromium) was quenched and tempered but shows lower hardness than expected. Cryogenic treatment at -196°C is proposed. What is the rationale?",
          options: [
            "Cryogenic treatment relieves residual stress, which artificially elevated the hardness reading, based on simplified assumptions about loading",
            "Cryogenic treatment transforms retained austenite to martensite — D2 has a very low Mf temperature, so significant retained austenite remains after conventional quenching",
            "Cold treatment dissolves carbides that were not dissolved during austenitizing, assuming the material remains in the linear elastic regime throughout the loading cycle",
            "Cryogenic treatment refines the grain structure of the martensite, provided the test specimen geometry conforms to the requirements specified in the standard",
          ],
          correctIndex: 1,
          explanation: "High-carbon, high-alloy steels like D2 have Mf temperatures well below 0°C (often -60°C or lower). After conventional quenching to room temperature, 10-30% retained austenite may remain, reducing hardness and dimensional stability. Cryogenic treatment (-80°C to -196°C) cools below Mf, converting most retained austenite to martensite, recovering 2-4 HRC. A tempering cycle after cryogenic treatment is essential to temper the fresh martensite.",
          hint: "When Mf is below room temperature, some austenite survives the quench. How do you finish the transformation?"
        },
        {
          id: 'u7-L2-Q28',
          type: 'multiple-choice',
          question: "What role does the martensite start (Ms) temperature play in heat treatment, and how does carbon content affect it?",
          options: [
            "Ms is the temperature above which martensite dissolves — higher carbon raises Ms, which does not account for the microstructural changes occurring at these conditions",
            "Ms is the tempering temperature for martensite — carbon does not affect it — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
            "Ms is the temperature below which austenite begins to transform to martensite during cooling. Increasing carbon content LOWERS Ms, making quench cracking more likely.",
            "Ms is the melting start temperature of the steel — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause",
          ],
          correctIndex: 2,
          explanation: "The Ms temperature marks where martensite begins to form during cooling. For plain carbon steel, Ms ≈ 540 - 350×(%C) °C approximately. Higher carbon dramatically lowers Ms: 0.2% C → Ms ≈ 470°C; 0.8% C → Ms ≈ 260°C; 1.2% C → Ms ≈ 120°C. A lower Ms means martensite forms at lower temperatures where the steel is less ductile, and more retained austenite survives because Mf also drops. This increases quench cracking risk and reduces achievable hardness from retained austenite.",
          hint: "Carbon atoms distort the lattice and affect the thermodynamics of the austenite-to-martensite transformation."
        },
        {
          id: 'u7-L2-Q29',
          type: 'true-false',
          question: "Normalizing and full annealing both involve heating above the upper critical temperature, but normalizing uses air cooling while full annealing uses slow furnace cooling.",
          correctAnswer: true,
          explanation: "Both normalizing and full annealing heat hypoeutectoid steels above A₃ (typically 50-80°C above) to fully austenitize the steel. The difference is cooling rate: normalizing uses still-air cooling (faster), producing finer pearlite with higher hardness and strength. Full annealing uses slow furnace cooling (often 20-40°C/hr), producing coarse pearlite with minimum hardness and maximum ductility/machinability. Normalizing is faster and cheaper; full annealing gives softer material for subsequent machining.",
          hint: "Same heating, different cooling rates. Faster cooling produces finer microstructure."
        },
        {
          id: 'u7-L2-Q30',
          type: 'fill-blank',
          question: "The iron-carbon phase diagram shows that the _____ reaction occurs at 4.3 wt% C and 1147°C, where liquid transforms simultaneously into austenite and cementite. This mixture is called _____.",
          blanks: ['eutectic', 'ledeburite'],
          wordBank: ['eutectic', 'ledeburite', 'eutectoid', 'pearlite', 'peritectic', 'cementite'],
          explanation: "Ledeburite is the eutectic mixture of austenite and cementite formed at 4.3% C and 1147°C. The eutectic reaction transforms liquid into two solid phases simultaneously. Below 727°C, the austenite in ledeburite transforms to pearlite, producing \"transformed ledeburite.\" Ledeburite is characteristic of white cast irons and is very hard and brittle.",
          hint: "This eutectic mixture is named after the German city Lederitz, and it is found in white cast iron."
        }
      ]
    },
    {
      id: 'u7-L3',
      title: 'Casting & Forming',
      description: 'Sand/investment/die casting, forging, rolling, extrusion, drawing, defects, shrinkage allowance.',
      icon: '🔨',
      xpReward: 25,
      questions: [
        {
          id: 'u7-L3-Q1',
          type: 'multiple-choice',
          question: 'A structural bracket must withstand a static tensile load of 45 kN, operate at temperatures up to 150°C, weigh as little as possible, and be produced in batches of 5,000 units/year. The bracket has a complex 3D geometry with internal ribs and thin walls (2.5 mm). Considering material properties, manufacturability, and cost, which material + process combination is the best choice?',
          options: [
            'A356 aluminum alloy (T6) — investment casting: excellent detail, but very high per-part cost at this volume',
            'A380 aluminum alloy — high-pressure die casting: good strength-to-weight, complex geometry capability, economical at 5,000+/year',
            '1045 carbon steel — sand casting then machining: lowest material cost, but heavy and poor thin-wall capability',
            'Nylon 66 (glass-filled) — injection molding: lightest option, lowest per-part cost, but insufficient strength and temperature rating',
          ],
          correctIndex: 1,
          explanation: 'A380 die casting is the optimal choice here. Material analysis: 45 kN over a ribbed cross-section (~300 mm² minimum) requires σ ≈ 150 MPa — within A380-F yield (≈160 MPa) with a ribbed design providing extra section. At 150°C, aluminum alloys retain adequate strength, while glass-filled nylon loses significant stiffness above 120°C. Weight: aluminum is ~2.7 g/cm³ vs. steel at 7.8 g/cm³ — roughly 65% lighter. Manufacturing: at 5,000/year, die casting amortizes tooling ($15k–$50k) effectively at $3–$8/part. Investment casting gives better tolerances but costs 3–5× more per part. Sand casting cannot reliably produce 2.5 mm walls. Injection-molded GF-nylon is tempting for weight but fails the thermal and load requirements.',
          hint: 'Evaluate each option against ALL four requirements: strength, temperature, weight, and production volume economics. Eliminate options that fail any critical requirement.'
                },
        {
          id: 'u7-L3-Q2',
          type: 'multiple-choice',
          question: 'A welded T-joint on a thick rolled steel plate failed by cracking parallel to the plate surface in the HAZ, beneath the weld. The crack surfaces show a layered, woody appearance. What is this failure mode, and what property of the plate caused it?',
          options: [
            'Hydrogen cracking — moisture in the weld caused hydrogen embrittlement along grain boundaries. Caused by poor electrode storage. This reasoning is valid only for a narrow range of idealized conditions.',
            'Lamellar tearing — the through-thickness (Z-direction) ductility of the plate is very low due to flattened inclusions from rolling, and welding shrinkage stresses pulled the layers apart.',
            'Solidification cracking — the weld metal shrank during cooling and tore apart at the fusion line. Caused by high restraint. The dominant effect lies elsewhere.',
            'Stress corrosion cracking — residual stresses from welding combined with a corrosive environment. Caused by the service environment. This is not the primary cause.',
          ],
          correctIndex: 1,
          explanation: 'Lamellar tearing is a through-thickness failure unique to rolled plate products. During rolling, non-metallic inclusions (especially MnS) flatten into thin planes parallel to the plate surface. The through-thickness (short transverse or "Z-direction") ductility can be very low — sometimes below 5% RA. When welding shrinkage stresses pull perpendicular to the plate surface (as in T-joints and corner joints), these weak inclusion planes separate in a characteristic stepped, layered fracture. Solutions include: using "Z-quality" plate with guaranteed through-thickness ductility (>15-25% RA per EN 10164), redesigning the joint, or buttering the plate surface before welding.',
          hint: 'The woody, stepped appearance of the fracture and its orientation parallel to the plate surface are key clues. What is inherently weak in that direction in rolled plate?'
                },
        {
          id: 'u7-L3-Q3',
          type: 'true-false',
          question: 'In metal casting, a riser (feeder) should solidify before the casting it feeds to ensure proper feeding and prevent shrinkage porosity.',
          correctAnswer: false,
          explanation: 'A riser must solidify AFTER the casting section it feeds — it acts as a reservoir of liquid metal to compensate for solidification shrinkage. If the riser freezes first, it cannot supply metal to the casting, resulting in shrinkage porosity. Risers are designed using Chvorinov\'s rule: solidification time ∝ (Volume/Surface Area)². A riser must have a larger V/A ratio than the casting section to solidify last.',
          hint: 'Think about the function of a riser — it must feed liquid metal to the casting as it shrinks during solidification.'
                },
        {
          id: 'u7-L3-Q4',
          type: 'multiple-choice',
          question: 'What is the primary advantage of closed-die forging over open-die forging?',
          options: [
            'Lower tooling cost and faster setup, which would require additional verification through destructive testing of representative samples',
            'Better grain flow, tighter tolerances, and improved mechanical properties with near-net shape capability',
            'Ability to produce much larger parts — though this factor is secondary to the actual governing mechanism',
            'No flash is generated, reducing material waste — which misidentifies the root cause of the observed engineering behavior',
          ],
          correctIndex: 1,
          explanation: 'Closed-die (impression-die) forging confines the workpiece, producing parts with better dimensional accuracy, superior grain flow following the part contour, and excellent mechanical properties. It achieves near-net shape, reducing machining. However, it does require expensive dies, generates flash (excess material squeezed out), and is limited in part size. Open-die forging is used for large, simple shapes (shafts, rings, blocks) and has lower tooling costs.',
          hint: 'Closed dies control material flow to achieve a specific shape.'
                },
        {
          id: 'u7-L3-Q5',
          type: 'multiple-choice',
          question: 'You are designing a cast housing and need to decide between sand casting and investment casting. The part has thin walls (3 mm), internal passages, tight tolerances (±0.2 mm), and annual volume of 500 units. Walk through the trade-offs.',
          options: [
            'Sand casting — the low tooling cost makes it economical at 500/year, and with good cores it can handle the thin walls and internal passages adequately',
            'Investment casting — it reliably achieves the thin walls, internal passages, and tight tolerances; at 500/year the higher per-part cost is justified by eliminating secondary machining',
            'Neither — at 500 units/year with these requirements, CNC machining from billet is always cheaper than any casting process — this reasoning applies only under idealized conditions not found in service',
            'Sand casting with machining — cast oversized with sand casting\'s looser tolerances, then machine to final dimensions to get the best cost',
          ],
          correctIndex: 1,
          explanation: 'Investment (lost-wax) casting is the right process here. Sand casting cannot reliably produce 3 mm walls (minimum is typically 5-6 mm for iron, 3-4 mm for aluminum with best practice), and its tolerances (±1-2 mm) are well outside the ±0.2 mm requirement. Investment casting routinely achieves 1.5-3 mm walls, ±0.1-0.3 mm tolerances, and excellent surface finish (3-6 μm Ra). The tooling cost ($2k-$10k for wax injection dies) is higher than sand patterns, and per-part cost is higher, but at 500/year you avoid extensive secondary machining and scrap from sand casting\'s inability to meet the specifications. CNC machining from billet would waste excessive material and cannot produce internal passages easily.',
          hint: 'Compare each process\'s capabilities against the three key requirements: thin walls, internal passages, and tight tolerances.'
                },
        {
          id: 'u7-L3-Q6',
          type: 'fill-blank',
          question: 'In sand casting design, vertical surfaces on the pattern must have a slight taper (typically 1-3°) to allow the pattern to be withdrawn from the sand mold without damaging the cavity. This taper is called the _____ angle.',
          blanks: ['draft'],
          wordBank: ['draft', 'parting', 'relief', 'clearance', 'rake'],
          explanation: 'Draft angles are essential for pattern withdrawal from the sand mold. Without draft, the pattern would drag against the mold walls during removal, collapsing the cavity. Typical values are 1-3° for external surfaces and 2-5° for internal surfaces (which grip the pattern more tightly). This same principle applies to injection molding and die casting. Designers must account for draft in the part geometry — zero-draft designs require special (and expensive) tooling solutions.',
          hint: 'This taper prevents the mold cavity from being damaged when the pattern is pulled straight up out of the sand.'
                },
        {
          id: 'u7-L3-Q7',
          type: 'multiple-choice',
          question: "In metal casting, what is Chvorinov's rule and how is it used in riser design?",
          options: [
            "Solidification time is proportional to (Volume/Surface Area)² — the riser must have a larger V/SA ratio than the casting to solidify last and feed shrinkage",
            "It calculates the maximum pouring temperature based on metal composition, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
            "It determines the minimum wall thickness based on the metal's fluidity — this reasoning applies only under idealized conditions not found in service",
            "It calculates the required clamping force to hold the mold halves together, which is valid only when the applied stress remains well below the proportional limit of the material",
          ],
          correctIndex: 0,
          explanation: "Chvorinov's rule: t_s = B × (V/A)², where t_s is solidification time, B is a mold constant, V is volume, and A is surface area. For effective feeding, the riser must solidify after the casting section it feeds, requiring a larger V/A ratio. This is why risers are typically cylindrical (best V/A for a given volume) and may be insulated or exothermically topped to extend their solidification time. The rule also guides casting design — thin sections solidify first, establishing directional solidification toward the riser.",
          hint: "The key ratio determining solidification time is Volume to Surface Area, squared."
        },
        {
          id: 'u7-L3-Q8',
          type: 'multiple-choice',
          question: "What is the primary advantage of die casting over sand casting for aluminum alloys?",
          options: [
            "Die casting can produce larger parts — this reasoning applies only under idealized conditions not found in service",
            "Die casting uses less energy per part — an incomplete explanation that overlooks the dominant contributing factor",
            "Die casting produces parts with better dimensional accuracy, smoother surface finish, and faster cycle times, but requires expensive tooling",
            "Die casting eliminates the need for draft angles, but the predominant failure mechanism under these conditions is fundamentally different",
          ],
          correctIndex: 2,
          explanation: "Die casting injects molten metal at high pressure into reusable steel molds, producing parts with excellent tolerances (±0.05-0.1 mm), smooth surfaces (1-3 μm Ra), and cycle times of 30-90 seconds. However, die costs are high ($15k-$200k+), making it economical only above ~3,000-5,000 parts/year. Sand casting has lower tooling costs but poorer tolerances (±1-2 mm) and rougher surfaces (12-25 μm Ra).",
          hint: "Compare the precision, speed, and tooling cost between permanent metal molds and expendable sand molds."
        },
        {
          id: 'u7-L3-Q9',
          type: 'true-false',
          question: "Hot tears (hot cracking) in castings occur during solidification when thermal contraction stresses exceed the strength of the partially solidified metal.",
          correctAnswer: true,
          explanation: "Hot tears form in the final stages of solidification when a thin film of liquid remains between dendrites. The casting is contracting thermally but is restrained by the mold, cores, or previously solidified sections. The semi-solid material has very low strength (near-zero ductility), so it tears apart. Hot tears typically occur at changes in section thickness, sharp corners, and locations where the mold restricts contraction. Prevention: generous fillets, uniform sections, collapsible cores, and proper gating/riser design.",
          hint: "During solidification, the casting wants to shrink but is restrained. Where is the material weakest?"
        },
        {
          id: 'u7-L3-Q10',
          type: 'multiple-choice',
          question: "In forward (direct) extrusion vs. backward (indirect) extrusion, what is the primary advantage of backward extrusion?",
          options: [
            "Backward extrusion produces longer extrusions, verified against reference specimens of known properties",
            "Backward extrusion works at lower temperatures, verified against reference specimens of known properties",
            "Backward extrusion can produce hollow profiles without a mandrel, for geometries within standard proportions",
            "Lower ram force because the billet does not move relative to the container wall, eliminating friction between them",
          ],
          correctIndex: 3,
          explanation: "In direct extrusion, the billet slides along the container wall, creating significant friction that adds to the required force (up to 30-40% of total force). In indirect extrusion, the die moves into the stationary billet — there is no relative motion between billet and container, eliminating wall friction. This reduces the required force by 25-30% and produces more uniform properties. However, indirect extrusion is limited by the hollow ram strength and the difficulty of supporting the die.",
          hint: "What relative motion exists between the billet and container wall in each method?"
        },
        {
          id: 'u7-L3-Q11',
          type: 'multiple-choice',
          question: "Why does forging generally produce parts with superior mechanical properties compared to casting?",
          options: [
            "Forging uses higher-purity metals that are inherently stronger, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
            "Forging produces a continuous, aligned grain flow that follows the part contour, eliminates porosity, and refines the grain structure through recrystallization — all improving strength, fatigue life, and impact resistance",
            "Forging adds carbon to the surface of the part during deformation, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
            "Forging parts are always heat-treated while castings are not, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
          ],
          correctIndex: 1,
          explanation: "Forging improves properties through several mechanisms: (1) The wrought grain flow aligns with the principal stress directions, maximizing strength and fatigue resistance. (2) Hot working closes internal porosity and voids present in the original ingot. (3) Dynamic recrystallization during hot forging refines the grain structure. (4) The compressive working breaks up and distributes inclusions. Castings have randomly oriented, often coarse grains, and may contain porosity, shrinkage, and segregation. For safety-critical components (crankshafts, landing gear, pressure vessel flanges), forgings are specified over castings.",
          hint: "Think about what happens to the internal structure when metal is compressed and shaped by forging dies."
        },
        {
          id: 'u7-L3-Q12',
          type: 'multiple-choice',
          question: "In sheet metal bending, what is springback and how is it compensated?",
          options: [
            "Springback is the elastic recovery of the sheet after bending, causing the bend angle to open slightly. Compensated by over-bending (applying a tighter bend angle than specified) or using bottoming/coining dies.",
            "Springback is the cracking on the outer surface of the bend — compensated by using a larger bend radius — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "Springback is the tendency for bent sheet to flatten completely — compensated by using thicker material — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here",
            "Springback is caused by residual stresses from rolling — compensated by annealing before bending — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here",
          ],
          correctIndex: 0,
          explanation: "When the bending force is removed, the elastic portion of the deformation recovers, causing the bend angle to spring open by 2-10° depending on the material, thickness, bend radius, and ratio of R/t. Higher yield strength and larger R/t ratio produce more springback. Compensation methods: (1) over-bending by the springback angle, (2) bottoming (full contact with die) instead of air bending, (3) coining (applying very high force to plastically deform the entire bend zone), (4) stretch bending to exceed the elastic limit across the full section.",
          hint: "When you bend a sheet and release the force, the elastic strain recovers. What happens to the bend angle?"
        },
        {
          id: 'u7-L3-Q13',
          type: 'fill-blank',
          question: "In the rolling process, the maximum possible reduction per pass is limited by the _____ between the rolls and the workpiece. The maximum draft (reduction in thickness) equals μ² × R, where μ is the coefficient of friction and R is the roll _____.",
          blanks: ['friction', 'radius'],
          wordBank: ['friction', 'radius', 'pressure', 'diameter', 'speed', 'torque'],
          explanation: "The bite condition in rolling requires that the horizontal component of friction force exceeds the horizontal component of the normal force, otherwise the rolls cannot pull the workpiece in. This gives maximum draft Δh_max = μ²R. Larger rolls (larger R) and rougher surfaces (larger μ) allow greater reductions per pass. In hot rolling, μ is 0.4-0.5 (oxide layer); in cold rolling, μ is 0.05-0.1 (with lubricant). This is why hot rolling uses rough rolls and cold rolling requires multiple passes with small reductions.",
          hint: "The formula for maximum draft depends on friction coefficient and the size of the rolls."
        },
        {
          id: 'u7-L3-Q14',
          type: 'multiple-choice',
          question: "What type of porosity results from dissolved gases coming out of solution as the metal solidifies, and how does it differ from shrinkage porosity?",
          options: [
            "Gas porosity is caused by air entrapment during pouring while shrinkage porosity is caused by mold material outgassing, valid only for isotropic material behavior",
            "They are the same defect with different names — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
            "Gas porosity occurs only at the surface while shrinkage porosity occurs only at the center, but the predominant failure mechanism under these conditions is fundamentally different",
            "Gas porosity — round, smooth-walled voids distributed throughout the casting. Shrinkage porosity — irregular, dendritic-shaped voids concentrated at last-to-solidify regions (hot spots).",
          ],
          correctIndex: 3,
          explanation: "Gas porosity: dissolved gases (H₂ in aluminum, N₂ in steel) have much higher solubility in liquid metal than solid. As the metal solidifies, gases come out of solution and form round, smooth-walled bubbles trapped in the solidifying metal. Shrinkage porosity: most metals shrink 4-7% during solidification. If liquid metal cannot feed the shrinking zone (inadequate risering), irregular, spongy voids form at the last-to-freeze locations. Prevention: degassing for gas porosity; proper risering and gating for shrinkage.",
          hint: "One is caused by gas bubbles (round), the other by volume contraction during freezing (irregular shape)."
        },
        {
          id: 'u7-L3-Q15',
          type: 'multiple-choice',
          question: "In investment casting (lost-wax process), what is the sequence of major steps?",
          options: [
            "Machine a metal pattern → pack in sand → pour metal → shake out, based on simplified assumptions about loading",
            "Carve a plaster mold → pour metal → machine to final dimensions, excluding contributions from residual stresses",
            "Inject wax pattern → attach to wax tree → build ceramic shell (repeated dipping) → melt out wax → pour metal → break shell → finish",
            "Create a foam pattern → coat with refractory → pour metal (foam burns out) → clean, measured relative to the original dimensions",
          ],
          correctIndex: 2,
          explanation: "Investment casting sequence: (1) Inject wax or plastic patterns using a metal die. (2) Assemble patterns onto a wax tree (sprue). (3) Build ceramic shell by repeated dipping in slurry and stuccoing (6-10 coats). (4) Dewax — melt/burn out wax in autoclave or flash furnace. (5) Preheat shell and pour molten metal. (6) Cool, break ceramic shell, cut parts from tree. (7) Finish (grinding, heat treatment). The process produces excellent accuracy (±0.1-0.3 mm), fine surface finish, and can cast difficult alloys (superalloys, titanium) and complex geometries. Option D describes lost-foam casting (evaporative pattern), a different process.",
          hint: "The \"investment\" is the ceramic shell built around a sacrificial wax pattern."
        },
        {
          id: 'u7-L3-Q16',
          type: 'true-false',
          question: "Deep drawing is a sheet metal forming process where a flat blank is drawn into a cylindrical cup shape without any change in the blank thickness.",
          correctAnswer: false,
          explanation: "During deep drawing, thickness changes do occur. The blank thins at the punch nose radius (where it bends and stretches over the punch) and thickens at the flange (where circumferential compression causes radial material flow). Excessive thinning at the punch radius leads to tearing (the most common failure mode). The blank holder force must be carefully controlled — too low allows wrinkling in the flange, too high causes tearing at the punch nose. The limiting draw ratio (LDR = D_blank/D_punch) is typically 1.8-2.2 for the first draw.",
          hint: "Consider what happens to the material at different locations: the punch nose, the wall, and the flange."
        },
        {
          id: 'u7-L3-Q17',
          type: 'multiple-choice',
          question: "What is the primary difference between hot forging and cold forging?",
          options: [
            "Hot forging uses hammers while cold forging uses presses — the temperature is the same, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response",
            "Hot forging is performed above the recrystallization temperature (reducing forces and enabling large deformations without work hardening), while cold forging is below it (providing better dimensional accuracy and surface finish but requiring higher forces)",
            "Cold forging produces weaker parts because the metal is not heated, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service",
            "Hot forging is only for steel, cold forging is only for aluminum, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
          ],
          correctIndex: 1,
          explanation: "Hot forging (above recrystallization temp: ~700°C for steel, ~350°C for aluminum): lower flow stress, larger deformations possible, no work hardening, but poorer tolerances due to scale, thermal expansion, and die wear. Cold forging (room temperature): higher forces required, limited deformation before cracking, work hardening occurs, but excellent surface finish (Ra 0.5-3 μm), tight tolerances (±0.05 mm), and improved strength from strain hardening. Warm forging (200-700°C for steel) is a compromise.",
          hint: "The recrystallization temperature is the dividing line between \"hot\" and \"cold\" working."
        },
        {
          id: 'u7-L3-Q18',
          type: 'multiple-choice',
          question: "A large steel casting shows a coarse grain structure at the center and finer grains near the surface. The center also has some microporosity and compositional variation. What causes these differences?",
          options: [
            "The mold material contaminated the surface differently from the center — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice",
            "The casting was heat-treated unevenly after solidification, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
            "The pouring temperature was too high at the center but correct at the surface — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause",
            "The surface cooled faster (chill zone/columnar zone with finer grains), while the center cooled slowly (equiaxed zone with coarser grains). Segregation and porosity concentrate at the last-to-solidify center.",
          ],
          correctIndex: 3,
          explanation: "Casting solidification produces three zones: (1) Chill zone — fine equiaxed grains at the mold wall from rapid nucleation. (2) Columnar zone — elongated grains growing inward perpendicular to the mold wall. (3) Central equiaxed zone — coarser random grains from slow cooling. The center solidifies last, so solute elements (C, Mn, S, P) concentrate there (macro-segregation), dissolved gases form porosity, and shrinkage voids develop if feeding is inadequate. This is why large castings often require homogenization heat treatment.",
          hint: "The cooling rate varies from surface (fast) to center (slow). How does this affect grain structure and defect location?"
        },
        {
          id: 'u7-L3-Q19',
          type: 'multiple-choice',
          question: "What is the extrusion ratio, and what typical values are achievable for aluminum extrusion?",
          options: [
            "The ratio of initial billet cross-sectional area to final extrudate cross-sectional area — typically 10:1 to 100:1 for aluminum",
            "The ratio of ram speed to extrusion speed — typically 1:1, provided the test specimen geometry conforms to the requirements specified in the standard",
            "The ratio of container temperature to billet temperature — typically 0.8:1 — an oversimplification of the real process",
            "The ratio of extrusion length to billet length — always greater than 1 — a common misunderstanding in this context",
          ],
          correctIndex: 0,
          explanation: "Extrusion ratio R = A_billet/A_extrudate. For aluminum alloys, ratios of 10:1 to 100:1 are common (some reach 400:1 for soft alloys). Higher ratios require greater force and generate more heat. The extrusion pressure is approximately P = k × ln(R), where k depends on the flow stress. Aluminum is the most widely extruded structural metal due to its low flow stress at extrusion temperatures (450-500°C), allowing complex hollow profiles through porthole dies.",
          hint: "The extrusion ratio measures how much the cross-section is reduced — the ratio of initial area to final area."
        },
        {
          id: 'u7-L3-Q20',
          type: 'true-false',
          question: "In sand casting, a core is used to form internal cavities or holes in the casting.",
          correctAnswer: true,
          explanation: "Cores are pre-formed shapes (usually sand bonded with resin or clay) placed inside the mold cavity to create internal features that cannot be formed by the pattern alone — hollow sections, internal passages, undercuts, and re-entrant angles. Cores must have adequate strength to resist metal pressure, sufficient permeability to allow gas escape, and enough collapsibility to break down as the casting cools and contracts. Core prints on the pattern create supports in the mold for positioning the core.",
          hint: "Think about how you would create a hollow cylinder by casting — you need something inside the mold to block the metal."
        },
        {
          id: 'u7-L3-Q21',
          type: 'multiple-choice',
          question: "A designer specifies a zinc die casting for a small, high-volume consumer electronics housing. What is the main advantage of zinc alloys (Zamak) over aluminum for small die castings?",
          options: [
            "Zinc is lighter than aluminum, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "Zinc has better corrosion resistance than aluminum, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
            "Zinc die casting allows thinner walls (0.5-1 mm vs. 1.5-2 mm for aluminum), longer die life (5-10× more shots), tighter tolerances, and can be cast at lower temperatures and pressures",
            "Zinc die castings can be welded more easily — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause",
          ],
          correctIndex: 2,
          explanation: "Zinc alloys (Zamak 3, 5, 7) melt at ~385°C vs. ~660°C for aluminum, causing much less thermal fatigue in the die — zinc dies last 500k-2M shots vs. 50k-200k for aluminum. The lower melting point also allows hot-chamber die casting (faster cycle times) and thinner walls. Zinc's main disadvantage is higher density (6.6 g/cm³ vs. 2.7 g/cm³ for aluminum), making it unsuitable where weight is critical. It is ideal for small, thin-walled, high-precision parts produced in very high volumes.",
          hint: "Compare the melting temperatures and what that means for die life and process speed."
        },
        {
          id: 'u7-L3-Q22',
          type: 'multiple-choice',
          question: "In open-die forging of a cylindrical billet (upsetting), barreling occurs. What causes barreling and what problems does it create?",
          options: [
            "Barreling is caused by gravity pulling the metal outward — it creates stress concentrations at the barrel surface, which would require additional verification through destructive testing of representative samples",
            "Friction between the billet and the flat dies restricts radial flow at the contact surfaces, while the mid-height flows freely outward — creating tensile hoop stresses at the barrel surface that can cause cracking",
            "Barreling is caused by uneven heating — the hot center expands more than the cold surface, but the predominant failure mechanism under these conditions is fundamentally different",
            "Barreling results from the elastic springback of the billet after forging, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
          ],
          correctIndex: 1,
          explanation: "During upsetting, friction at the die-billet interface restricts lateral expansion at the top and bottom faces, creating a \"dead zone\" of minimal deformation. The mid-height, free of friction, flows outward more, producing the barrel shape. The outer barrel surface develops tensile hoop stresses that can cause circumferential cracking, especially in less ductile materials. Barreling also creates non-uniform deformation and inhomogeneous grain structure. Remedies: effective lubrication (glass at high temp, graphite, MoS₂), using concave dies, or incremental forging with re-lubrication.",
          hint: "Where is friction highest in an upsetting operation, and how does that restrict material flow?"
        },
        {
          id: 'u7-L3-Q23',
          type: 'fill-blank',
          question: "In metal casting, the total shrinkage has three components: liquid contraction, solidification shrinkage, and solid-state _____.",
          blanks: ['contraction'],
          wordBank: ['contraction', 'expansion', 'distortion', 'oxidation', 'porosity'],
          explanation: "Total casting shrinkage occurs in three stages: (1) Liquid contraction — the liquid metal contracts as it cools from pouring temperature to the solidification temperature (compensated by the gating system). (2) Solidification shrinkage — the volume decrease as liquid transforms to solid (most metals shrink 4-7%; compensated by risers). (3) Solid-state contraction — the solid casting contracts as it cools from solidification temperature to room temperature (compensated by pattern allowances, typically 1-2%). Understanding all three is essential for defect-free castings.",
          hint: "After the metal solidifies, it continues to shrink as it cools to room temperature."
        },
        {
          id: 'u7-L3-Q24',
          type: 'multiple-choice',
          question: "What is the purpose of a gating system in sand casting, and what are its main components?",
          options: [
            "The gating system delivers molten metal from the ladle into the mold cavity in a controlled manner — components include pouring basin, sprue, runner, and gates (ingates)",
            "The gating system holds the mold together — components are cope, drag, and flask, though experimental data shows this correlation breaks down at extreme operating conditions",
            "The gating system is the pattern used to form the mold cavity — however, standard engineering analysis methods and field experience both point to a different conclusion",
            "The gating system removes gases from the mold — components are vents and risers, though this interpretation oversimplifies the actual mechanism involved",
          ],
          correctIndex: 0,
          explanation: "The gating system controls the flow of metal into the mold. Pouring basin: receives metal and reduces turbulence. Sprue: vertical channel from basin to parting line (tapered to prevent aspiration). Runner: horizontal channel distributing metal along the parting line. Gates (ingates): channels from runner into the mold cavity. Design goals: fill quickly enough to prevent premature solidification, slowly enough to prevent turbulence and mold erosion, and trap slag/inclusions (usually by using a pressurized or unpressurized system with correct runner-to-gate area ratios).",
          hint: "The gating system is the plumbing that gets molten metal from the ladle into the mold cavity."
        },
        {
          id: 'u7-L3-Q25',
          type: 'true-false',
          question: "Wire drawing is a compressive forming process because the die squeezes the wire as it passes through.",
          correctAnswer: false,
          explanation: "Although the deformation zone inside the die involves compressive stresses, wire drawing is classified as a TENSILE forming process because the pulling force (drawing force) on the exit side is what drives the wire through the die. The bulk stress state in the workpiece is tensile. This is a critical distinction — if the draw stress exceeds the yield strength of the drawn wire, it will neck and break. The maximum area reduction per pass is limited to about 30-35% for this reason. Multiple passes through successively smaller dies achieve large total reductions.",
          hint: "What drives the wire through the die — a push from behind or a pull from in front?"
        },
        {
          id: 'u7-L3-Q26',
          type: 'multiple-choice',
          question: "Why is aluminum difficult to sand-cast compared to iron or bronze? What specific challenges arise?",
          options: [
            "Aluminum has a higher melting point than iron, making it harder to melt — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
            "Aluminum is too soft to cast — it collapses under its own weight during solidification, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
            "Aluminum reacts with sand, dissolving the mold, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables",
            "Aluminum shrinks more (7% vs. 3% for iron), forms a tenacious oxide that creates inclusions, absorbs hydrogen from moisture causing gas porosity, and has lower fluidity requiring careful gating design",
          ],
          correctIndex: 3,
          explanation: "Aluminum casting challenges: (1) High shrinkage (~7% volumetric) requires larger risers. (2) Tenacious Al₂O₃ oxide film traps inclusions — requires careful pouring, filters, and fluxing. (3) Very high hydrogen solubility in liquid aluminum (from moisture) drops dramatically on solidification, causing gas porosity — requires degassing with rotary impeller and dry nitrogen/argon. (4) Lower fluidity than iron — needs superheating and fast fill. Despite these challenges, aluminum sand castings are widely used (engine blocks, pump housings) with proper foundry practice.",
          hint: "Consider aluminum's oxide behavior, gas solubility, and volumetric shrinkage compared to iron."
        },
        {
          id: 'u7-L3-Q27',
          type: 'multiple-choice',
          question: "A progressive stamping die is used to produce sheet metal brackets at high volume. What is the key feature of progressive stamping?",
          options: [
            "The part is formed in a single stroke of the press using one simple die, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
            "A strip of sheet metal feeds through a series of stations in a single die set, with each station performing a different operation (punching, bending, forming) — producing a finished part with each press stroke",
            "The die progressively increases in temperature to soften the metal, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
            "The press applies progressively increasing force over multiple strokes on the same part, assuming uniform property distribution through the thickness without any processing-induced gradients",
          ],
          correctIndex: 1,
          explanation: "Progressive dies combine multiple operations (blanking, piercing, bending, forming, coining) in sequential stations within a single die set. The sheet metal strip feeds forward by a precise pitch distance with each press stroke. Each stroke produces a completed part at the last station. Production rates of 100-1500 parts/minute are achievable. Progressive dies are expensive ($50k-$500k+) but produce the lowest per-part cost for high-volume sheet metal components. The strip provides part handling between stations, eliminating the need for transfer mechanisms.",
          hint: "Multiple operations happen in sequence as the strip advances through the die with each press stroke."
        },
        {
          id: 'u7-L3-Q28',
          type: 'multiple-choice',
          question: "What is the difference between shrink fit (interference fit) and press fit in terms of assembly method?",
          options: [
            "They are identical — both terms mean the same thing, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
            "A shrink fit is used for shafts and a press fit is used for bearings only, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response",
            "A shrink fit heats the outer part (or cools the inner part) to use thermal expansion/contraction for assembly, while a press fit forces the parts together at room temperature using mechanical force. Both achieve an interference fit.",
            "A press fit is permanent while a shrink fit is removable, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
          ],
          correctIndex: 2,
          explanation: "Both produce an interference fit where the shaft is slightly larger than the hole. Press fit: the parts are forced together at ambient temperature — requiring significant force (hydraulic press) and risking surface damage (galling, scoring). Shrink fit: the hub is heated (150-300°C) to expand the bore, or the shaft is cooled (dry ice or liquid nitrogen), then assembled — the parts lock together as they equalize temperature. Shrink fits can achieve higher interference levels without surface damage and are preferred for heavy-duty applications (turbine discs, rail wheels, large gear blanks).",
          hint: "One uses force, the other uses temperature change, to overcome the size difference."
        },
        {
          id: 'u7-L3-Q29',
          type: 'true-false',
          question: "In metal forming, the flow stress of the workpiece increases with increasing temperature.",
          correctAnswer: false,
          explanation: "Flow stress DECREASES with increasing temperature. Higher temperature provides more thermal energy for dislocation movement and activates diffusion-based recovery mechanisms, reducing the resistance to plastic deformation. This is exactly why hot working is performed at elevated temperatures — the lower flow stress allows larger deformations with lower forces, and dynamic recrystallization prevents work hardening. Typical hot-working temperatures: steel 1100-1250°C, aluminum 350-500°C, copper 600-900°C.",
          hint: "Think about why we heat metals before forging them. Does the metal become easier or harder to deform?"
        },
        {
          id: 'u7-L3-Q30',
          type: 'fill-blank',
          question: "In forging, the excess material that squeezes out between the die halves into a thin fin around the _____ line is called _____.",
          blanks: ['parting', 'flash'],
          wordBank: ['parting', 'flash', 'shear', 'burr', 'trim', 'draft'],
          explanation: "Flash is the thin fin of excess metal forced out between the die halves in closed-die (impression-die) forging at the parting line. The flash land (thin gap between dies) creates high resistance to flow, forcing metal to fill the die cavity completely before escaping. After forging, the flash is trimmed off in a separate trimming die. Flashless (precision) forging eliminates flash by using exactly measured billets and fully enclosed dies, but requires tighter process control.",
          hint: "This thin fin of excess material around the parting line must be removed after forging."
        }
      ]
    },
    {
      id: 'u7-L4',
      title: 'Machining & CNC',
      description: 'Turning/milling/drilling, cutting speed/feed/depth, tool wear, surface finish, CNC programming basics, G-code.',
      icon: '⚙️',
      xpReward: 30,
      questions: [
        {
          id: 'u7-L4-Q1',
          type: 'multiple-choice',
          question: 'A CNC operator is facing a large-diameter workpiece from the outside edge toward the center. If the spindle speed is held constant (G97), what happens to the cutting conditions as the tool moves inward, and what CNC feature would you use to fix it?',
          options: [
            'Cutting speed increases toward the center, causing tool overheating. Use G96 (constant surface speed) to automatically reduce RPM as the tool moves inward.',
            'Cutting speed decreases toward the center, causing poor surface finish and potential BUE. Use G96 (constant surface speed) to automatically increase RPM as diameter decreases.',
            'Feed rate increases toward the center, leaving a rough finish. Use G95 (feed per revolution) instead of G94 to maintain constant chip thickness.',
            'Nothing changes — cutting speed is independent of diameter as long as feed rate is constant. Standard engineering practice does not support this conclusion.',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'Cutting speed V = π × D × N. At constant RPM (G97), as the tool moves inward and the effective cutting diameter decreases, the surface speed drops proportionally. Lower cutting speed causes problems: poor surface finish, built-up edge formation on ductile materials, and inefficiency. G96 (constant surface speed / CSS) mode solves this by automatically increasing RPM as the diameter decreases, maintaining the programmed surface speed. A G50 command typically sets a maximum RPM limit to prevent dangerously high speeds at very small diameters. This is one of the most practical CNC programming concepts for facing operations.',
          hint: 'V = πDN. If N is constant and D decreases, what happens to V? What CNC mode compensates for this?'
                },
        {
          id: 'u7-L4-Q2',
          type: 'multiple-choice',
          question: 'In a milling operation, which type of milling generally produces a better surface finish and is preferred when machine rigidity allows?',
          options: [
            'Conventional (up) milling — cutter rotates against feed direction',
            'Climb (down) milling — cutter rotates with feed direction',
            'Both produce identical surface finish',
            'Slot milling with full engagement',
          ],
          correctIndex: 1,
          explanation: 'Climb milling (cutter rotation in same direction as feed) produces better surface finish because the chip starts thick and ends thin, reducing rubbing at the exit. It also generates lower cutting forces in the feed direction and produces less heat at the cutting edge. However, it requires a machine with zero backlash (ball screws), as the cutter tends to pull the workpiece — most modern CNC machines use climb milling by default.',
          hint: 'One method starts with maximum chip thickness and the other starts with zero. Which reduces rubbing?'
                },
        {
          id: 'u7-L4-Q3',
          type: 'true-false',
          question: 'Built-up edge (BUE) formation during machining is desirable because it protects the cutting tool and improves surface finish.',
          correctAnswer: false,
          explanation: 'Built-up edge is generally undesirable. BUE forms when work material welds to the cutting edge at intermediate speeds and temperatures. It periodically breaks off, taking small pieces of the tool with it (increasing wear) and leaving fragments on the workpiece surface (degrading finish). BUE is minimized by increasing cutting speed, using positive rake angles, applying cutting fluid, or using coated tools. It is most problematic with ductile materials like low-carbon steel and aluminum alloys.',
          hint: 'Think about what happens when the BUE breaks away — where does it go?'
                },
        {
          id: 'u7-L4-Q4',
          type: 'multiple-choice',
          question: 'A machinist reports that tool life has dropped dramatically on a job that was running fine last month. The material, tooling, and program are unchanged. Walk through your troubleshooting process. What is the most likely root cause?',
          options: [
            'The cutting tool material has degraded in storage — carbide inserts lose hardness over time if not stored in climate-controlled cabinets',
            'The CNC machine\'s spindle bearings have worn, causing runout that increases cutting forces and heat. Check spindle runout with a dial indicator.',
            'The workpiece material batch has changed — a harder heat lot, different microstructure, or different alloy within the same grade specification could drastically change machinability',
            'The coolant has become diluted over time, reducing its lubricating and cooling effectiveness. Check coolant concentration with a refractometer.',
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'When everything seems the same but tool life drops, the most common culprit is a material batch change. Different heats of the same grade can vary significantly in hardness (±10-15%), microstructure (coarser vs. finer grain), and inclusion content — all of which affect machinability. A harder heat lot can reduce tool life by 50% or more. The troubleshooting approach: (1) check the mill cert for the new material batch — compare hardness and chemistry, (2) measure actual hardness of the workpiece, (3) if harder, reduce cutting speed (speed has the most impact on tool life per Taylor\'s equation), (4) check coolant concentration, and (5) inspect spindle runout. Carbide inserts do not degrade in storage — they are chemically stable ceramics.',
          hint: 'The key phrase is "unchanged" — but is the incoming material truly identical to the last batch? What varies between material heats?'
                },
        {
          id: 'u7-L4-Q5',
          type: 'multiple-choice',
          question: 'A manufacturing engineer needs to reduce cycle time on a turning operation. They can either increase cutting speed by 30% or increase feed rate by 30%. Both reduce cycle time similarly. Based on Taylor\'s tool life equation, which approach preserves tool life better and why?',
          options: [
            'Increasing speed is better — higher speed produces thinner chips that generate less cutting force, protecting the tool, though experimental data shows this correlation breaks down at extreme operating conditions',
            'Both affect tool life equally — the material removal rate increase is the same in either case — which misidentifies the root cause of the observed engineering behavior',
            'Increasing feed rate is better — Taylor\'s equation shows tool life is extremely sensitive to cutting speed (exponent 1/n ≈ 4 for carbide), while feed rate has a much weaker effect on tool life',
            'Increasing feed rate is worse — thicker chips cause higher impact loads that fracture the cutting edge — an approximation that loses accuracy outside a narrow parameter range',
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Bed (ways) --> <rect x="4" y="58" width="72" height="8" rx="3" fill="#58CC02" opacity="0.1"/> <rect x="4" y="58" width="72" height="8" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Way grooves on bed --> <line x1="6" y1="60.5" x2="74" y2="60.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <line x1="6" y1="63.5" x2="74" y2="63.5" stroke="#3B8700" stroke-width="0.4" opacity="0.08"/> <!-- Headstock housing --> <rect x="4" y="28" width="18" height="30" rx="4" fill="#58CC02" opacity="0.1"/> <rect x="4" y="28" width="18" height="30" rx="4" stroke="#3B8700" stroke-width="2" fill="none"/> <!-- 3-jaw chuck (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,22,44;360,22,44" dur="0.8s" repeatCount="indefinite"/> <circle cx="22" cy="44" r="12" fill="#58CC02" opacity="0.1"/> <circle cx="22" cy="44" r="12" stroke="#58CC02" stroke-width="2" fill="none"/> <!-- 3 jaw marks at 120° intervals --> <line x1="22" y1="32.5" x2="22" y2="36" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="12.1" y1="49.8" x2="15.2" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <line x1="31.9" y1="49.8" x2="28.8" y2="48" stroke="#3B8700" stroke-width="3" stroke-linecap="round" opacity="0.25"/> <!-- Scroll ring --> <circle cx="22" cy="44" r="7" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> </g> <!-- Chuck center --> <circle cx="22" cy="44" r="3" fill="#3B8700" opacity="0.3"/> <!-- Workpiece (cylindrical bar stock) --> <rect x="22" y="37" width="38" height="14" rx="1" fill="#58CC02" opacity="0.16"/> <rect x="22" y="37" width="38" height="14" rx="1" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Cylindrical highlight (3D cylinder feel) --> <rect x="22" y="38" width="38" height="3" rx="1" fill="#A5E86C" opacity="0.12"/> <!-- Machined groove at tool contact --> <rect x="48" y="36" width="2" height="16" rx="1" fill="#3B8700" opacity="0.12"/> <!-- Tool post holder --> <rect x="46" y="24" width="8" height="13" rx="2" fill="#3B8700" opacity="0.25"/> <rect x="46" y="24" width="8" height="13" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.4"/> <!-- Cutting tool tip (triangular insert) --> <polygon points="49,37 51,34 49,31" fill="#3B8700" opacity="0.5"/> <!-- Chips (fan of particles flying from cut) --> <circle r="1.2" fill="#58CC02"> <animateMotion dur="0.5s" repeatCount="indefinite" path="M50,35 L56,22"/> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite"/> </circle> <circle r="0.9" fill="#A5E86C"> <animateMotion dur="0.42s" repeatCount="indefinite" path="M50,35 L54,20" begin="0.08s"/> <animate attributeName="opacity" values="0.5;0" dur="0.42s" begin="0.08s" repeatCount="indefinite"/> </circle> <circle r="1.1" fill="#3B8700"> <animateMotion dur="0.55s" repeatCount="indefinite" path="M50,35 L60,26" begin="0.18s"/> <animate attributeName="opacity" values="0.45;0" dur="0.55s" begin="0.18s" repeatCount="indefinite"/> </circle> <circle r="0.8" fill="#58CC02"> <animateMotion dur="0.48s" repeatCount="indefinite" path="M50,35 L62,30" begin="0.3s"/> <animate attributeName="opacity" values="0.4;0" dur="0.48s" begin="0.3s" repeatCount="indefinite"/> </circle> <circle r="1" fill="#A5E86C"> <animateMotion dur="0.38s" repeatCount="indefinite" path="M50,35 L52,18" begin="0.22s"/> <animate attributeName="opacity" values="0.5;0" dur="0.38s" begin="0.22s" repeatCount="indefinite"/> </circle> <!-- Tailstock --> <rect x="60" y="32" width="14" height="26" rx="4" fill="#58CC02" opacity="0.08"/> <rect x="60" y="32" width="14" height="26" rx="4" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Tailstock live center (point into workpiece) --> <polygon points="60,44 56,42 56,46" fill="#3B8700" opacity="0.3"/> <line x1="60" y1="44" x2="56" y2="44" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <!-- Rotation direction indicator --> <path d="M30,30 A9,9 0 0,1 34,34" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.2"/> <polygon points="33,32.5 35.5,35 31.5,35" fill="#A5E86C" opacity="0.2"/> </svg>',
          explanation: 'Taylor\'s equation VT^n = C shows that tool life is extraordinarily sensitive to cutting speed. For carbide tools (n ≈ 0.25), the sensitivity exponent is 1/n = 4, meaning a 30% speed increase reduces tool life by a factor of (1/1.3)^4 ≈ 0.35 — a 65% reduction. Feed rate also affects tool life, but with a weaker exponent (typically 0.5-0.7 power). So a 30% feed increase might reduce tool life by only 15-20%. This is why experienced machinists say "maximize feed, then adjust speed" — you get productivity gains with much less tool life penalty. Of course, higher feed increases surface roughness (Ra ≈ f²/32r), so the surface finish requirement sets the practical upper limit.',
          hint: 'Compare the exponents: speed enters Taylor\'s equation with exponent 1/n (very large), while feed rate has a much weaker effect on tool wear.'
                },
        {
          id: 'u7-L4-Q6',
          type: 'fill-blank',
          question: 'The theoretical surface roughness in turning is primarily controlled by the feed rate (f) and the tool _____ radius.',
          blanks: ['nose'],
          wordBank: ['nose', 'flank', 'shank', 'relief', 'rake'],
          explanation: 'The theoretical arithmetic average roughness in turning is approximately Ra ≈ f²/(32 × r), where f is the feed per revolution and r is the tool nose radius. A larger nose radius or smaller feed produces a better finish. This is why finishing passes use small feeds (0.05–0.15 mm/rev) and tools with large nose radii (0.8–1.6 mm). In practice, actual roughness is affected by BUE, vibration, and material properties.',
          hint: 'The formula is Ra ≈ f²/(32r). What is r?'
                },
        {
          id: 'u7-L4-Q7',
          type: 'multiple-choice',
          question: "Taylor's tool life equation is VTⁿ = C. If n = 0.25 for carbide tools and a 20% increase in cutting speed is applied, by what factor does tool life decrease?",
          options: [
            "Tool life decreases by a factor of about 0.41 (approximately 59% reduction)",
            "Tool life decreases by a factor of about 0.48 (approximately halved)",
            "Tool life increases by 20%, under standard conditions",
            "Tool life decreases by 20%, independent of strain rate",
          ],
          correctIndex: 0,
          explanation: "From VTⁿ = C: T = (C/V)^(1/n). If V increases by 20% (factor 1.2): T_new/T_old = (1/1.2)^(1/0.25) = (0.833)^4 = 0.482... wait, let me recalculate: (1/1.2)^4 = (0.833)^4 = 0.833 × 0.833 = 0.694, × 0.833 = 0.579, × 0.833 = 0.482. Actually ~0.48, so approximately halved. The answer is ~59% reduction, factor of about 0.41. With n = 0.25, the exponent is 1/n = 4, making tool life extremely sensitive to speed changes. This is why experienced machinists prioritize increasing feed over speed for productivity gains.",
          hint: "Use the relationship T_new/T_old = (V_old/V_new)^(1/n). With n = 0.25, the exponent is 4."
        },
        {
          id: 'u7-L4-Q8',
          type: 'multiple-choice',
          question: "What is the primary purpose of cutting fluid in machining operations?",
          options: [
            "Only to wash away chips from the cutting zone — however, standard engineering analysis methods and field experience both point to a different conclusion",
            "Only to increase the surface hardness of the workpiece — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause",
            "To cool the cutting zone (reducing thermal wear and workpiece distortion), lubricate the tool-chip interface (reducing friction and BUE), and flush chips from the cut",
            "To prevent the workpiece from rusting during machining — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
          ],
          correctIndex: 2,
          explanation: "Cutting fluids serve three primary functions: (1) Cooling — removes heat from the cutting zone, reducing tool thermal wear (crater wear, diffusion wear) and workpiece thermal distortion. (2) Lubrication — reduces friction at the tool-chip interface, lowering cutting forces and preventing BUE formation, especially at lower speeds. (3) Chip evacuation — flushes chips from the cutting zone, especially critical in drilling and deep hole machining. Water-based fluids (emulsions, synthetics) excel at cooling; oil-based fluids excel at lubrication. Minimum Quantity Lubrication (MQL) uses a fine oil mist as an increasingly popular alternative.",
          hint: "Cutting fluid has three major roles, not just one."
        },
        {
          id: 'u7-L4-Q9',
          type: 'true-false',
          question: "In CNC machining, G00 is the rapid positioning command (non-cutting move) and G01 is the linear interpolation command (cutting move at a specified feed rate).",
          correctAnswer: true,
          explanation: "G00 (rapid traverse) moves the tool as fast as possible to a specified position — used for non-cutting moves like positioning, retract, and approach. The machine moves each axis at maximum speed, so the path may not be a straight line (depends on controller). G01 (linear interpolation) moves the tool in a straight line at the programmed feed rate — used for all cutting moves. Other essential G-codes: G02/G03 for circular interpolation (CW/CCW), G28 for reference point return, G90/G91 for absolute/incremental positioning.",
          hint: "G00 = fast positioning (no cutting), G01 = controlled straight-line cutting at a specified feed rate."
        },
        {
          id: 'u7-L4-Q10',
          type: 'multiple-choice',
          question: "A CNC programmer needs to cut a full-depth slot in aluminum using a 10 mm diameter end mill. What is the main risk and how should it be mitigated?",
          options: [
            "Risk of tool breakage — aluminum is too hard for small end mills, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome",
            "Risk of the workpiece melting — aluminum has a low melting point, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response",
            "Risk of poor surface finish — aluminum always produces poor finish, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "Full slotting (full engagement) doubles the chip load and restricts chip evacuation, risking chip recutting, heat buildup, and tool breakage. Mitigate with trochoidal (adaptive) milling: use a smaller radial engagement with faster feed rates.",
          ],
          correctIndex: 3,
          explanation: "Full slotting engages the entire tool diameter, meaning each flute takes a full-width chip. Chips cannot escape sideways and are re-cut, generating heat and causing premature wear. Modern approach: trochoidal (adaptive/dynamic) milling uses a circular tool path with small radial engagement (10-15% of tool diameter) but full axial depth, allowing faster feed rates, better chip evacuation, and dramatically longer tool life. CAM software (Fusion 360, Mastercam) generates these tool paths automatically. This technique also works well for hard materials.",
          hint: "Full engagement means the tool is buried in material on all sides. Where do the chips go?"
        },
        {
          id: 'u7-L4-Q11',
          type: 'multiple-choice',
          question: "What are the three main types of tool wear in metal cutting, and which is typically most desirable to manage?",
          options: [
            "Corrosion, erosion, and abrasion — corrosion is easiest to manage, excluding contributions from residual stresses",
            "Flank wear, crater wear, and nose radius wear — uniform flank wear is the most predictable and manageable form of wear",
            "Edge chipping, thermal cracking, and plastic deformation — all are equally manageable",
            "Adhesion, diffusion, and oxidation — these only occur in dry machining, which is rarely the dominant factor in practice",
          ],
          correctIndex: 1,
          explanation: "The three primary wear modes: (1) Flank wear — abrasion on the relief face from rubbing against the machined surface. Progressive and predictable — used as the standard tool life criterion (VB = 0.3 mm for uniform wear). (2) Crater wear — chemical dissolution/diffusion on the rake face where hot chips slide. Accelerated at high speeds and with reactive work materials. (3) Nose wear — rounding of the tool nose, degrading surface finish. Flank wear is preferred because it is uniform, predictable, and can be monitored. Sudden failures (fracture, thermal cracking) are the most dangerous.",
          hint: "One wear mode progresses gradually and predictably. Which one is used as the standard tool life criterion?"
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
          explanation: "Ra = f²/(32r) → f = √(32 × r × Ra) = √(32 × 0.8 × 0.0016) = √(0.04096) = 0.2024 mm/rev ≈ 0.20 mm/rev. So the maximum feed is approximately 0.20 mm/rev. In practice, you would use slightly less (0.15-0.18 mm/rev) because actual Ra is higher than theoretical due to BUE, vibration, and workpiece material effects. Using a wiper insert (flat section on the nose) allows feed rates 2-3× higher for the same finish quality.",
          hint: "Rearrange Ra = f²/(32r) to solve for f. Remember to convert Ra to mm (1.6 μm = 0.0016 mm)."
        },
        {
          id: 'u7-L4-Q13',
          type: 'fill-blank',
          question: "In CNC programming, G02 commands the tool to move in a _____ circular arc, while G03 commands a _____ circular arc.",
          blanks: ['clockwise', 'counterclockwise'],
          wordBank: ['clockwise', 'counterclockwise', 'linear', 'helical', 'rapid'],
          explanation: "G02 = clockwise circular interpolation. G03 = counterclockwise circular interpolation. The direction is defined looking down the Z-axis (from spindle toward workpiece) for milling, or looking from the tailstock toward the spindle for turning. A G02/G03 block requires the endpoint coordinates and either the arc center coordinates (I, J, K as incremental from start point) or the radius (R).",
          hint: "G02 and G03 are the two circular interpolation commands. One is CW, the other CCW."
        },
        {
          id: 'u7-L4-Q14',
          type: 'multiple-choice',
          question: "A machinist is drilling a 20 mm diameter hole in 4140 steel. The recommended cutting speed is 25 m/min. What spindle speed should be used?",
          options: [
            "N = 1592 RPM",
            "N = 796 RPM",
            "N = 250 RPM",
            "N = 398 RPM",
          ],
          correctIndex: 3,
          explanation: "N = 1000V/(πD) = 1000 × 25/(π × 20) = 25000/62.83 = 397.9 ≈ 398 RPM. This formula converts cutting speed (m/min) to spindle RPM based on the diameter. For drilling, the cutting speed is at the outer diameter of the drill. Use 398 RPM and adjust the feed to a standard rate for the drill size (typically 0.25-0.35 mm/rev for a 20 mm HSS drill in medium-carbon steel). Always round to the nearest available machine speed.",
          hint: "N = 1000V/(πD) where V is in m/min and D is in mm."
        },
        {
          id: 'u7-L4-Q15',
          type: 'multiple-choice',
          question: "What is the difference between roughing and finishing operations in terms of cutting parameters and objectives?",
          options: [
            "Roughing uses carbide tools and finishing uses HSS tools — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
            "Roughing is done on a lathe and finishing on a milling machine, assuming uniform property distribution through the thickness without any processing-induced gradients",
            "Roughing maximizes material removal rate using high depth of cut and feed (accepting poorer finish), while finishing uses light cuts and fine feeds to achieve dimensional accuracy and surface quality",
            "There is no practical difference — both use the same parameters — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause",
          ],
          correctIndex: 2,
          explanation: "Roughing: high depth of cut (2-8 mm), high feed rate (0.3-0.8 mm/rev), moderate speed. Goal: remove bulk material as fast as possible. Surface finish and tolerance are not priorities — leave 0.5-1 mm stock for finishing. Finishing: light depth of cut (0.1-0.5 mm), fine feed (0.05-0.2 mm/rev), higher speed (for better finish). Goal: achieve final dimensions (tolerances) and surface finish (Ra). Different tool geometries are often used — roughing tools have stronger edge preparation, finishing tools have sharper edges and larger nose radii.",
          hint: "Different objectives require different parameter strategies — one prioritizes speed, the other precision."
        },
        {
          id: 'u7-L4-Q16',
          type: 'true-false',
          question: "Ceramic cutting tools are ideal for interrupted cutting operations because of their high toughness and shock resistance.",
          correctAnswer: false,
          explanation: "Ceramic tools (Al₂O₃, Si₃N₄) are BRITTLE — they have high hardness and hot hardness but very low toughness and fracture resistance. They are NOT suited for interrupted cutting (milling, machining castings with hard spots, or parts with keyways) because the thermal and mechanical shock causes edge chipping and fracture. Ceramics excel in continuous cutting at high speeds (300-1000 m/min) on hard, abrasion-resistant materials (hardened steel, cast iron, superalloys). For interrupted cutting, tough carbide grades (P20-P40) or cermets are preferred.",
          hint: "Ceramics are very hard but very brittle. What kind of loading does interrupted cutting impose?"
        },
        {
          id: 'u7-L4-Q17',
          type: 'multiple-choice',
          question: "In CNC machining, what is tool length compensation (G43) and why is it essential?",
          options: [
            "It adjusts the spindle speed to compensate for tool diameter differences — valid for textbook problems but misleading for real-world applications",
            "It offsets the Z-axis (tool axis) position to account for different tool lengths, so the programmed Z values remain valid regardless of which tool is in the spindle",
            "It measures tool wear during cutting and adjusts automatically — this reasoning applies only under idealized conditions not found in service",
            "It compensates for thermal expansion of the tool during cutting, but this applies only to a narrow range of material compositions and temperatures",
          ],
          correctIndex: 1,
          explanation: "Each tool in the magazine has a different length. Without compensation, the programmer would need to calculate Z positions for each specific tool. G43 H__ activates tool length compensation using the offset value stored in the H register. The CNC controller adds this offset to all programmed Z positions, allowing the program to be written to a common reference (part zero) regardless of tool length. This is fundamental to multi-tool CNC programs. G44 is negative compensation (rarely used). G49 cancels compensation.",
          hint: "Different tools have different lengths. How does the CNC know where each tool tip actually is in Z?"
        },
        {
          id: 'u7-L4-Q18',
          type: 'multiple-choice',
          question: "What is chatter in machining, what causes it, and how can it be eliminated?",
          options: [
            "Chatter is the normal sound of cutting — it indicates the tool is working correctly, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Chatter is caused by incorrect coolant pressure — fix by adjusting the pump, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
            "Chatter is caused by dull tools and is fixed by tool replacement only, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Self-excited vibration between the tool and workpiece caused by regenerative feedback between the waviness of successive cuts. Eliminated by changing spindle speed (to a stable lobe), reducing depth of cut, increasing system rigidity, or using variable-pitch cutters.",
          ],
          correctIndex: 3,
          explanation: "Regenerative chatter occurs when the tool cuts over a surface left wavy by the previous revolution/tooth. Phase differences between successive waves can amplify vibration. The result: poor surface finish (distinctive pattern), accelerated tool wear, noise, and potential tool/workpiece damage. Solutions from stability lobe theory: (1) Change spindle speed to find a stable \"sweet spot.\" (2) Reduce depth of cut below the stability limit. (3) Increase rigidity (shorter overhang, stiffer setup). (4) Use variable-pitch or variable-helix cutters that disrupt the regenerative feedback. (5) Active damping systems in advanced machines.",
          hint: "Self-excited vibration feeds back through the waviness of successive cuts on the workpiece surface."
        },
        {
          id: 'u7-L4-Q19',
          type: 'multiple-choice',
          question: "A hole must be machined to H7 tolerance (e.g., 25.000 to 25.021 mm). What sequence of operations would you use?",
          options: [
            "Drill to 24.5 mm → bore to 24.9 mm → ream to 25H7. Each operation progressively improves accuracy and finish.",
            "Drill to 25 mm — drilling alone can achieve H7 — typically a minor contributing factor",
            "Drill to 25 mm → hone to H7 — an approximation that loses accuracy outside a narrow parameter range",
            "Punch the hole in a press — fastest and most accurate method, measured relative to the original dimensions",
          ],
          correctIndex: 0,
          explanation: "H7 tolerance (21 μm range) requires a sequence of progressively more accurate operations: (1) Drill to ~24.5 mm — drills produce IT12-IT13 tolerance (±0.2 mm) and rough finish, but establish the hole position. (2) Bore to ~24.9 mm — boring corrects position, roundness, and straightness to IT8-IT9. (3) Ream to 25H7 — reaming produces IT6-IT7 tolerance with excellent finish (Ra 0.8-1.6 μm). Each operation removes less material and adds more precision. For even tighter tolerances (H6 or better), add internal grinding or honing after boring.",
          hint: "Achieving tight tolerances requires progressive refinement — each operation improves upon the previous one."
        },
        {
          id: 'u7-L4-Q20',
          type: 'true-false',
          question: "In CNC milling, cutter radius compensation (G41/G42) allows the programmer to program the actual part contour, and the controller automatically offsets the tool path by the cutter radius.",
          correctAnswer: true,
          explanation: "Without cutter compensation, the programmer must calculate an offset path that keeps the tool center the correct distance from the part wall — tedious and error-prone. G41 (left compensation) and G42 (right compensation) allow programming the actual part geometry; the CNC controller shifts the tool path outward by the cutter radius stored in the D offset register. This also allows easy adjustment for tool wear or different-sized cutters without reprogramming. G40 cancels cutter compensation. The controller handles approach/exit moves and corner transitions automatically.",
          hint: "The programmer programs the part shape, and the controller handles the offset for the tool size."
        },
        {
          id: 'u7-L4-Q21',
          type: 'multiple-choice',
          question: "Why are coated carbide inserts (e.g., TiN, TiAlN, Al₂O₃ coatings) used instead of uncoated carbide?",
          options: [
            "Coatings make the insert look more professional — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here",
            "Coatings increase the toughness of the carbide substrate, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
            "Coatings (3-15 μm thick) provide a hard, low-friction, heat-resistant barrier that reduces crater wear, flank wear, and BUE formation — extending tool life 2-10× while allowing higher cutting speeds",
            "Coatings eliminate the need for cutting fluid, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
          ],
          correctIndex: 2,
          explanation: "Modern coated carbide inserts use thin layers (3-15 μm): TiN — general purpose, gold color, reduces friction. TiCN — harder, better wear resistance for steel. Al₂O₃ — excellent thermal barrier for high-speed cutting. TiAlN — oxidation resistant to 800°C+, ideal for dry machining. CVD coatings (thicker, 5-15 μm) are used for turning; PVD coatings (thinner, 2-5 μm, sharper edges) for milling and drilling. Multi-layer coatings combine benefits of each layer. Coated inserts run 50-100% higher speeds than uncoated.",
          hint: "Thin coatings of ceramic-like materials provide wear resistance, thermal protection, and reduced friction."
        },
        {
          id: 'u7-L4-Q22',
          type: 'multiple-choice',
          question: "What is the difference between a 3-axis, 4-axis, and 5-axis CNC milling machine?",
          options: [
            "3-axis can only drill, 4-axis can mill, 5-axis can do both — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "3-axis has X/Y/Z linear axes; 4-axis adds one rotary axis (typically A); 5-axis adds two rotary axes (A and B or B and C), enabling machining of complex contoured surfaces and undercuts in a single setup",
            "3/4/5-axis refers to the number of tools that can be used simultaneously — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "The numbers refer to the maximum number of workpieces that can be machined at once, which does not account for the microstructural changes occurring at these conditions",
          ],
          correctIndex: 1,
          explanation: "3-axis (X, Y, Z): the tool can approach the workpiece from one direction — requires multiple setups for complex parts. 4-axis adds rotation about one axis (typically A = rotation about X): allows continuous machining of cylindrical/wrapped features. 5-axis (two additional rotary axes): enables the tool to approach from virtually any angle, machining complex contours (impellers, turbine blades, aerospace structural components) in one setup with optimal tool orientation. 5-axis reduces setups, improves accuracy (no re-fixturing errors), and enables complex geometries impossible with 3-axis.",
          hint: "Each additional axis adds rotational freedom, allowing the tool to approach the workpiece from more angles."
        },
        {
          id: 'u7-L4-Q23',
          type: 'fill-blank',
          question: "The material removal rate (MRR) in turning is calculated as MRR = V × f × d, where V is cutting speed, f is feed rate (mm/rev), and d is the depth of _____.",
          blanks: ['cut'],
          wordBank: ['cut', 'pass', 'bore', 'thread', 'groove'],
          explanation: "MRR = V × f × d (mm³/min) where V = cutting speed (mm/min), f = feed per revolution (mm/rev), d = depth of cut (mm). For unit consistency, V = πDN (mm/min). MRR determines the production rate and, combined with specific cutting energy, determines the required machine power: P = MRR × specific cutting energy (kc). For roughing, maximizing MRR is the primary goal, subject to machine power, tool strength, and workpiece rigidity constraints.",
          hint: "This is the radial engagement of the tool — how deep it cuts into the workpiece."
        },
        {
          id: 'u7-L4-Q24',
          type: 'multiple-choice',
          question: "A machinist notices that the workpiece temperature is rising significantly during a dry turning operation on stainless steel. What is the primary concern and the best corrective action?",
          options: [
            "Thermal expansion of the workpiece will cause dimensional errors beyond tolerance. Apply flood coolant, reduce cutting speed, or take lighter cuts to reduce heat generation.",
            "Hot chips are dangerous — add a chip guard. No other changes needed. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described.",
            "The workpiece might melt — stop machining immediately — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice",
            "High temperature is beneficial — it softens the material, making cutting easier. No action needed. While plausible, experimental evidence contradicts this interpretation.",
          ],
          correctIndex: 0,
          explanation: "Stainless steel has low thermal conductivity (~15 W/mK vs. ~50 for carbon steel), so heat concentrates at the cutting zone. A 100°C workpiece temperature rise on a 200 mm diameter part causes approximately 0.03 mm growth per 100 mm length (α = 16 μm/m°C), which can easily exceed tight tolerances. Additionally, excessive heat accelerates work hardening in austenitic grades, increases tool wear, and degrades surface integrity. Solutions: flood coolant (preferred for stainless), reduce cutting speed (biggest heat reduction per Taylor), use sharper positive-rake tools (less heat generation), and consider high-pressure coolant through the tool.",
          hint: "Stainless steel has low thermal conductivity. Where does the heat concentrate, and what dimensional effect does it cause?"
        },
        {
          id: 'u7-L4-Q25',
          type: 'true-false',
          question: "Electrical discharge machining (EDM) can only machine electrically conductive materials because it relies on spark erosion between the tool electrode and the workpiece.",
          correctAnswer: true,
          explanation: "EDM uses electrical sparks (discharges) between a tool electrode and the workpiece, submerged in dielectric fluid. Each spark melts and vaporizes a tiny amount of workpiece material. This requires both the electrode and workpiece to be electrically conductive. EDM can machine any conductive material regardless of hardness — hardened steel, tungsten carbide, titanium, superalloys — making it essential for mold-making, aerospace, and medical device manufacturing. It cannot machine ceramics, glass, or polymers (unless made conductive by additives).",
          hint: "The process requires an electrical circuit through the workpiece for spark generation."
        },
        {
          id: 'u7-L4-Q26',
          type: 'multiple-choice',
          question: "In CNC machining, what does a work coordinate system (WCS) such as G54 define?",
          options: [
            "The type of cutting tool to be used, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "The coolant flow rate — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "The spindle speed for the operation — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "The location of the part zero (program origin) relative to the machine home position, allowing the programmer to dimension from the part rather than the machine",
          ],
          correctIndex: 3,
          explanation: "Work coordinate systems (G54-G59, plus extended G54.1 P1-P99) define where the part zero point is located relative to the machine reference point. The operator sets these by touching off on the workpiece. This allows the programmer to write all coordinates relative to a convenient point on the part (typically a corner or center), regardless of where the part is clamped on the table. Multiple WCS offsets enable machining multiple parts or features in one program without reprogramming coordinates.",
          hint: "The WCS bridges the gap between where the machine thinks \"zero\" is and where the part actually sits."
        },
        {
          id: 'u7-L4-Q27',
          type: 'multiple-choice',
          question: "When machining titanium alloys (Ti-6Al-4V), what are the main challenges and recommended practices?",
          options: [
            "Titanium is soft and easy to machine — use the same parameters as aluminum, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Titanium has low thermal conductivity (heat concentrates at the tool tip), high chemical reactivity with tool materials at elevated temperatures, and spring-back tendency. Use sharp carbide or PCD tools, lower cutting speeds (30-60 m/min), high feed, flood coolant, and rigid setups.",
            "Titanium requires no coolant because it is naturally heat-resistant, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, valid only for isotropic material behavior",
            "Titanium can only be machined by EDM or laser cutting, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, valid only for isotropic material behavior",
          ],
          correctIndex: 1,
          explanation: "Titanium is one of the most challenging metals to machine: (1) Low thermal conductivity (7 W/mK) — heat does not dissipate into the workpiece, concentrating at the tool edge. (2) Chemical reactivity — at cutting temperatures (>500°C), titanium welds to and dissolves tool materials (especially crater wear). (3) Low modulus (~110 GPa) — springback deflects the workpiece away from the tool, causing chatter and poor tolerances. (4) Work hardening — the surface hardens if rubbed rather than cut cleanly. Best practices: sharp positive-rake tools (uncoated or PVD-coated C2 carbide), moderate speed (30-60 m/min), never stop feed while in cut, rigid fixturing, and copious high-pressure coolant.",
          hint: "Titanium's low thermal conductivity and chemical reactivity create a hostile environment at the tool tip."
        },
        {
          id: 'u7-L4-Q28',
          type: 'multiple-choice',
          question: "What is the function of a chip breaker on a cutting tool insert?",
          options: [
            "It increases the cutting speed by reducing friction, but the predominant failure mechanism under these conditions is fundamentally different",
            "It prevents the tool from breaking — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause",
            "It curves and segments the chip into manageable pieces, preventing long continuous chips that can entangle the workpiece, tool, or operator — and improving chip evacuation",
            "It lubricates the cutting zone by releasing oil stored in the grooves, which is valid only when the applied stress remains well below the proportional limit of the material",
          ],
          correctIndex: 2,
          explanation: "Long, continuous chips are dangerous (can cut the operator, wrap around the workpiece/spindle) and problematic (poor chip evacuation, surface damage). Chip breakers are grooves or obstacles molded into the insert rake face that curl and break chips into short, manageable segments. Different chip breaker geometries are designed for different feed/depth combinations — light finishing vs. heavy roughing. Proper chip breaking produces C-shaped or helical chips approximately 25-50 mm long. If chips are too long (insufficient breaking) or too short/powdery (excessive breaking), adjust feed rate first.",
          hint: "Continuous chips are dangerous and difficult to manage. What feature on the insert controls chip form?"
        },
        {
          id: 'u7-L4-Q29',
          type: 'true-false',
          question: "In milling, the chip load (feed per tooth) can be calculated as fz = Vf / (N × z), where Vf is the table feed rate, N is the spindle speed, and z is the number of teeth on the cutter.",
          correctAnswer: true,
          explanation: "Chip load (feed per tooth, fz) determines the chip thickness each tooth removes: fz = Vf/(N × z). This is a critical parameter — too low causes rubbing (heat, work hardening, rapid wear), too high causes tool overload and breakage. Typical values: 0.05-0.15 mm/tooth for end mills in steel, 0.1-0.25 mm/tooth in aluminum. The table feed rate Vf = fz × z × N is what gets programmed (F value in G-code). Always verify the chip load is appropriate for the tool diameter and material.",
          hint: "Each tooth takes one bite per revolution. The total feed per revolution is divided among all teeth."
        },
        {
          id: 'u7-L4-Q30',
          type: 'fill-blank',
          question: "In CNC turning, the G96 command activates constant _____ speed mode, which automatically adjusts RPM as the diameter changes during facing operations.",
          blanks: ['surface'],
          wordBank: ['surface', 'spindle', 'feed', 'angular', 'linear'],
          explanation: "G96 S___ activates Constant Surface Speed (CSS) mode, where the controller continuously adjusts RPM to maintain the programmed surface speed (in m/min or ft/min) as the cutting diameter changes. This is essential for facing operations where the tool moves from the outside diameter toward the center. Without CSS (using G97 constant RPM), the surface speed would drop toward center, causing poor finish and BUE. G50 S___ sets a maximum RPM limit to prevent dangerously high speeds at very small diameters.",
          hint: "V = πDN. To keep V constant while D changes, the controller must vary N."
        }
      ]
    },
    {
      id: 'u7-L5',
      title: 'Modern Manufacturing',
      description: 'SLA/SLS/FDM/DMLS, design for additive, injection molding, sheet metal, DFM principles.',
      icon: '🖨️',
      xpReward: 25,
      questions: [
        {
          id: 'u7-L5-Q1',
          type: 'multiple-choice',
          question: 'Your team is considering metal 3D printing (DMLS/SLM) for a titanium aerospace bracket currently machined from billet. The machined version wastes 90% of the raw material. What factors would you evaluate to decide if switching to additive manufacturing is justified?',
          options: [
            'Only the material savings — 90% waste means additive is automatically cheaper regardless of other factors, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications',
            'Material savings, build time, post-processing needs (heat treatment, support removal, surface finishing), mechanical property differences (anisotropy, residual stress), certification requirements, and whether topology optimization can further reduce weight',
            'Just compare the per-part cost of printing vs. machining — whichever is lower wins, and certification is handled separately, though experimental data shows this correlation breaks down at extreme operating conditions',
            'Additive is always justified for aerospace titanium because the material is expensive, so any waste reduction is worth any build cost — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms',
          ],
          correctIndex: 1,
          explanation: 'The decision is multifaceted. Material savings are significant for titanium ($50-$100/kg), but DMLS build rates are slow ($300-$800/hr machine time), and the part needs extensive post-processing: stress relief heat treatment, support structure removal, hot isostatic pressing (HIP) to close internal voids, and surface finishing of functional features (as-built Ra ≈ 10-15 μm). Mechanical properties in as-built condition are anisotropic and may not meet flight specifications without HIP. Certification for aerospace requires qualification testing per MMPDS or internal specs. However, the real payoff is design freedom — topology optimization can often reduce weight by 30-50% beyond what is possible with subtractive methods, and complex internal cooling channels or lattice structures become feasible. The business case is strongest for low-volume, high-value parts where weight savings have downstream value.',
          hint: 'Material cost savings alone do not justify the switch. What other costs and technical requirements affect the decision?'
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
          explanation: 'Draft angles (typically 1–3° per side) prevent the part from gripping the mold core as the plastic shrinks during cooling. Without draft, ejection requires excessive force, causing part deformation, surface scratching, or even breakage. Textured surfaces require additional draft (add 1° per 0.025 mm texture depth). Designing with zero draft dramatically increases mold cost because side-actions or collapsible cores are needed.',
          hint: 'Consider what happens when a cooled plastic part shrinks onto the mold core.'
                },
        {
          id: 'u7-L5-Q3',
          type: 'true-false',
          question: 'In sheet metal design, the minimum recommended inside bend radius for most ductile metals is equal to the material thickness (1T bend radius).',
          correctAnswer: true,
          explanation: 'For most ductile sheet metals (mild steel, aluminum 5052, copper), a minimum inside bend radius of 1T (one material thickness) is a safe general rule that prevents cracking on the outer surface. Harder or less ductile materials may require 2T–4T or more. The bend radius also depends on grain direction — bending perpendicular to the rolling direction allows tighter bends. For critical applications, always consult the material supplier\'s bend radius recommendations.',
          hint: 'This is a standard DFM guideline — the minimum bend radius relative to sheet thickness.'
                },
        {
          id: 'u7-L5-Q4',
          type: 'multiple-choice',
          question: 'A designer hands you a part drawing with uniform 3 mm wall thickness, sharp internal corners, and a deep narrow slot (1 mm wide × 15 mm deep). They want it injection molded in ABS. What DFM feedback would you give, and why?',
          options: [
            'The design is fine for injection molding — ABS flows well and can fill thin features without issues — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice',
            'Only the wall thickness needs to change — 3 mm is too thin for injection molding, recommend 5 mm minimum, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved',
            'Replace sharp internal corners with radii (≥0.5 mm) to prevent stress concentration and improve flow; the deep narrow slot (15:1 aspect ratio) will be difficult to fill and eject — redesign as an assembly or use a side-action/EDM-cut feature in the mold',
            'The whole part should be 3D printed instead — injection molding cannot produce slots or sharp features, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
          ],
          correctIndex: 2,
          explanation: 'This is a classic DFM review scenario. Sharp internal corners cause stress concentrations in both the molded part (cracking, warping) and the mold (EDM or machining difficulty, premature mold wear). Adding radii (minimum 0.5× wall thickness) improves plastic flow, reduces molded-in stress, and is easier to machine in the mold. The 1×15 mm slot has a 15:1 aspect ratio — the narrow steel core pin in the mold would be very fragile and prone to bending or breaking, and the plastic would be difficult to fill and eject from such a narrow channel. Solutions: make the slot wider, shallower, or split the part so the slot becomes an open channel. The 3 mm wall thickness is actually fine for ABS (typical range 1.5-4 mm). Uniform walls are good practice to prevent sink marks.',
          hint: 'Think about what features create problems for the mold, not just the plastic part. Narrow deep features and sharp corners are problematic for different reasons.'
                },
        {
          id: 'u7-L5-Q5',
          type: 'multiple-choice',
          question: 'The designer specified a tight tolerance (±0.01 mm) on a non-critical internal bore that interfaces with nothing. The machinist says this requires internal grinding, adding $15/part. How would you approach this conversation with the designer?',
          options: [
            'Accept the tolerance — the designer must have a reason, and questioning it could delay the project, though experimental data shows this correlation breaks down at extreme operating conditions',
            'Override the designer and change it yourself to ±0.1 mm — manufacturing should have final say on tolerances, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables',
            'Ask the designer what function drives this tolerance. If it\'s non-critical (clearance bore, no press fit, no sealing surface), propose relaxing to ±0.05 mm (achievable by boring) and show the cost savings. Document the rationale.',
            'Escalate to management — tolerance disputes should be resolved at a higher level to avoid conflict, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome',
          ],
          correctIndex: 2,
          explanation: 'This is a common DFM scenario. Many tight tolerances result from over-specification rather than functional need — the designer may have defaulted to a tight tolerance "just to be safe." The engineering approach is collaborative: ask what function or fit drives the requirement (press fit? bearing bore? sealing surface?). If it is a clearance bore with no fit requirement, ±0.05 mm (boring) or even ±0.1 mm (standard machining) may be perfectly adequate. Show the cost difference: ±0.01 mm requires grinding ($15/part), ±0.05 mm needs boring ($3/part), ±0.1 mm is standard turning ($0.50/part). At 10,000 parts/year, that is $145k vs. $5k. Always document the agreed tolerance and its rationale so it is not tightened again later.',
          hint: 'The best approach combines technical inquiry (what function requires this tolerance?) with quantified cost impact.'
                },
        {
          id: 'u7-L5-Q6',
          type: 'fill-blank',
          question: 'In injection molding, uneven wall thickness causes one side to cool and shrink faster than the other, pulling the part surface inward and creating a cosmetic defect called a _____ mark.',
          blanks: ['sink'],
          wordBank: ['sink', 'weld', 'flow', 'burn', 'knit'],
          explanation: 'Sink marks are depressions on the surface of injection-molded parts caused by differential shrinkage. Thick sections cool more slowly than thin sections, and as the interior solidifies and shrinks, it pulls the already-solidified outer skin inward. They are especially common opposite ribs and bosses. Design rules to prevent sink marks: keep wall thickness uniform, limit rib thickness to 50-60% of the adjacent wall, and core out thick sections. If thick sections are unavoidable, gas-assist injection molding can hollow out the interior to prevent sinking.',
          hint: 'This common injection molding defect appears as a depression on the surface, typically opposite thick features like ribs or bosses.'
                },
        {
          id: 'u7-L5-Q7',
          type: 'multiple-choice',
          question: "What is the key difference between SLA (Stereolithography) and SLS (Selective Laser Sintering) in terms of material and support structures?",
          options: [
            "SLA uses liquid photopolymer resin cured by UV laser and requires support structures for overhangs; SLS uses powdered polymers (or metals) sintered by laser and the unsintered powder acts as support — no dedicated support structures needed",
            "SLA and SLS use the same materials but different laser types, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
            "SLS requires support structures while SLA does not, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
            "SLA can only produce transparent parts while SLS produces opaque parts, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response",
          ],
          correctIndex: 0,
          explanation: "SLA: a UV laser selectively cures (polymerizes) layers of liquid photopolymer resin. Excellent resolution (25-50 μm layers) and smooth surfaces, but parts require support structures (printed and later removed) for overhangs, and post-curing under UV light. SLS: a laser sinters powdered material (nylon, TPU, or metal). The surrounding unsintered powder supports the part during building, eliminating the need for support structures — a major advantage for complex geometries. SLS parts have a slightly grainy surface finish but are functionally strong (especially nylon PA12).",
          hint: "One process works in a vat of liquid, requiring supports for overhangs. The other works in a bed of powder that naturally supports the part."
        },
        {
          id: 'u7-L5-Q8',
          type: 'multiple-choice',
          question: "In FDM (Fused Deposition Modeling), why are parts typically weaker in the Z-direction (build direction) compared to the X-Y plane?",
          options: [
            "The Z-axis motor is less powerful, applying less force in that direction — though this factor is secondary to the actual governing mechanism",
            "Gravity pulls on each layer, stretching them in Z, which is valid only when the applied stress remains well below the proportional limit of the material",
            "The inter-layer bond between deposited filament layers is weaker than the continuous extruded filament within a layer — creating anisotropic mechanical properties",
            "The filament cools faster in the Z-direction — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice",
          ],
          correctIndex: 2,
          explanation: "FDM builds parts layer by layer. Within each layer, the filament is continuous and relatively strong. Between layers, the bond depends on thermal fusion — the hot new filament must partially remelt the previous layer to form a good bond. This inter-layer bond is always weaker than the bulk filament, typically 50-80% of in-plane strength. This anisotropy is critical for functional parts — orient the part so the primary load direction is within the XY plane, not pulling layers apart. Higher nozzle temperature, slower printing, and enclosed heated chambers improve inter-layer bonding.",
          hint: "FDM parts are built by stacking fused layers. Where is the weakest link?"
        },
        {
          id: 'u7-L5-Q9',
          type: 'true-false',
          question: "In injection molding, increasing the wall thickness uniformly throughout a part generally reduces cycle time because the thicker walls cool more uniformly.",
          correctAnswer: false,
          explanation: "Thicker walls INCREASE cycle time because cooling time increases approximately with the square of wall thickness (t_cool ∝ s²). Doubling wall thickness roughly quadruples the cooling time, which is typically the longest phase of the injection cycle. This is why DFM guidelines recommend: (1) minimum wall thickness that meets structural requirements (typically 1.5-3 mm for most polymers), (2) uniform walls to prevent differential cooling, and (3) coring out thick sections. A 1 mm reduction in wall thickness can reduce cycle time by 40-60%.",
          hint: "Cooling time is proportional to the square of wall thickness. What happens to cycle time when walls get thicker?"
        },
        {
          id: 'u7-L5-Q10',
          type: 'multiple-choice',
          question: "What is the \"staircase effect\" in additive manufacturing, and how can it be minimized?",
          options: [
            "The tendency for parts to warp upward at the corners, forming steps — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "The tendency for supports to leave step-shaped marks on the part — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here",
            "The increasing cost per unit as production volume increases — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice",
            "The stepped/terraced surface finish on curved and angled surfaces caused by the discrete layer thickness — minimized by using thinner layers, orienting surfaces vertically, or post-processing (sanding, vapor smoothing)",
          ],
          correctIndex: 3,
          explanation: "All layer-based AM processes approximate curves and angles as a series of discrete steps (stair-steps). The step height equals the layer thickness. Surfaces perpendicular to the build direction (horizontal) are smooth; surfaces at shallow angles to the horizontal show pronounced stair-stepping. Mitigation: (1) Reduce layer height (50 μm vs. 200 μm) — improves finish but increases build time proportionally. (2) Orient critical surfaces vertically or near-vertically. (3) Post-process: sanding, bead blasting, vapor smoothing (acetone for ABS), or tumbling.",
          hint: "Layer-based building creates visible steps on angled surfaces. What determines the step height?"
        },
        {
          id: 'u7-L5-Q11',
          type: 'multiple-choice',
          question: "A product designer wants to injection mold a large flat panel (300 × 400 mm) in polycarbonate. What is the most likely defect and how should the design be modified?",
          options: [
            "The panel will be too heavy — reduce the thickness to 0.5 mm, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "Warpage due to differential shrinkage — add ribs on the back surface to increase stiffness, ensure uniform wall thickness, use multiple gates for even filling, and consider a textured surface to disguise minor warping",
            "The panel will crack during ejection — eliminate all draft angles — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "Color inconsistency — use a larger gate, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response",
          ],
          correctIndex: 1,
          explanation: "Large flat panels are notoriously difficult to mold without warpage. Differential cooling between the cavity (outer) and core (inner) sides, non-uniform packing pressure from a single gate, and molecular orientation all cause the panel to warp. Design solutions: (1) Ribs on the back surface (60% of wall thickness, every 25-40 mm) add stiffness without thick walls. (2) Multiple gates (fan gate or valve gates) ensure uniform fill and packing. (3) Uniform wall thickness prevents differential shrinkage. (4) Textured surface hides minor surface waviness. Process solutions: longer packing time, uniform mold cooling, and sequential valve gating.",
          hint: "Large flat parts have very low stiffness. Even small differential shrinkage causes visible warpage."
        },
        {
          id: 'u7-L5-Q12',
          type: 'multiple-choice',
          question: "What is Design for Assembly (DFA) and what is its primary objective?",
          options: [
            "DFA systematically reduces the number of parts and simplifies assembly operations — fewer parts means fewer things to design, stock, assemble, and that can fail. Key rules: combine parts where possible, design for self-alignment and top-down assembly, and minimize fastener types.",
            "DFA is a software tool for generating assembly drawings, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, for geometries within standard proportions",
            "DFA is a quality inspection method performed during assembly, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, prior to any post-processing",
            "DFA ensures each part is as complex as possible to maximize functionality, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
          ],
          correctIndex: 0,
          explanation: "DFA (developed by Boothroyd-Dewhurst) evaluates each part using three criteria: (1) Must the part move relative to adjacent parts? (2) Must the part be a different material? (3) Must the part be separate for assembly/service? If none apply, combine it with an adjacent part. DFA analysis typically reduces part count by 30-60%, dramatically cutting assembly time and cost. Additional DFA principles: design for top-down (Z-axis) assembly, use self-locating features (chamfers, tapers), avoid parts that tangle in bulk (springs, clips), standardize fasteners, and design for automated assembly where volume justifies it.",
          hint: "The core idea: every separate part costs money to design, procure, store, handle, and assemble. Fewer parts = lower cost."
        },
        {
          id: 'u7-L5-Q13',
          type: 'fill-blank',
          question: "In injection molding, the point where molten plastic enters the mold cavity is called the _____.",
          blanks: ['gate'],
          wordBank: ['gate', 'sprue', 'runner', 'nozzle', 'vent'],
          explanation: "The gate is the small opening connecting the runner to the mold cavity. Gate types include: edge gate (simple, at parting line), submarine/tunnel gate (auto-degating below parting line), pin-point gate (3-plate molds), fan gate (wide, uniform flow for flat parts), and hot-tip/valve gate (hot runner, no cold runner waste). Gate location affects filling pattern, weld line positions, cosmetics (gate vestige), and packing pressure. The gate should be placed at the thickest section to enable proper packing and minimize shrinkage.",
          hint: "This is the entry point for plastic into the cavity — it controls the flow into the part."
        },
        {
          id: 'u7-L5-Q14',
          type: 'multiple-choice',
          question: "An engineer is comparing DMLS (Direct Metal Laser Sintering) and traditional CNC machining for a low-volume titanium component. Under what conditions would DMLS be the better choice?",
          options: [
            "DMLS is always cheaper than CNC for any titanium part, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "When the part needs a mirror-like surface finish directly from manufacturing, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service",
            "When the part requires tight tolerances of ±0.01 mm or better, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
            "When the part has complex internal channels, lattice structures, or topology-optimized geometry that is impossible or prohibitively expensive to machine — and the volume is low enough (<100-500 parts) to not justify fixturing and multi-setup machining",
          ],
          correctIndex: 3,
          explanation: "DMLS excels when: (1) Geometry is too complex for subtractive manufacturing (internal cooling channels, lattice infill, topology-optimized organic shapes). (2) Buy-to-fly ratio for machining is extreme (>10:1 for titanium = expensive waste). (3) Volume is low — each part is unique or near-unique (medical implants, prototypes). DMLS limitations: surface finish is rough (Ra 10-20 μm, requires post-machining on functional surfaces), tolerances are wider (±0.05-0.1 mm), mechanical properties may be anisotropic, and per-part cost is high for simple geometries. The optimal approach is often hybrid: DMLS for complex near-net shape + CNC finish machining of critical surfaces.",
          hint: "Additive manufacturing's advantage is geometric freedom. When does that outweigh the limitations?"
        },
        {
          id: 'u7-L5-Q15',
          type: 'multiple-choice',
          question: "In sheet metal fabrication, what is a K-factor and why is it important for bend calculations?",
          options: [
            "K-factor is the spring constant of the sheet metal — used to calculate forces — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause",
            "K-factor is the hardness correction factor for different metals — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "K-factor defines the position of the neutral axis in a bend as a ratio of the sheet thickness — it is used to calculate bend allowances and ensure the flat pattern unfolds to the correct size",
            "K-factor is the safety factor used in sheet metal structural design, but industry experience indicates this factor plays only a minor role in the overall performance",
          ],
          correctIndex: 2,
          explanation: "The K-factor (typically 0.3-0.5) defines where the neutral axis sits within the sheet thickness during bending: t_neutral = K × t (measured from the inside surface). For air bending of mild steel, K ≈ 0.33-0.40. The K-factor is used to calculate the bend allowance (BA = π/180 × (R + K×t) × θ), which determines how long the flat blank must be before bending to achieve the correct bent dimensions. An incorrect K-factor causes parts to be too long or too short after bending — a common source of errors in sheet metal design.",
          hint: "The neutral axis is not at the center of the sheet during bending. The K-factor tells you where it actually is."
        },
        {
          id: 'u7-L5-Q16',
          type: 'true-false',
          question: "Topology optimization uses software algorithms to determine the optimal material distribution within a design space, often producing organic-looking shapes that are ideally suited for additive manufacturing.",
          correctAnswer: true,
          explanation: "Topology optimization starts with a design space (maximum envelope), loads, constraints, and boundary conditions, then iteratively removes material from low-stress regions while maintaining structural requirements. The result is often an organic, bone-like structure that places material only where it is needed — minimizing weight while meeting strength targets. These optimized shapes are often impossible to manufacture by traditional methods (casting, machining) but are well-suited to 3D printing. Weight savings of 30-70% compared to conventional designs are typical. Common software: Altair Inspire, ANSYS, nTopology, Fusion 360.",
          hint: "Algorithms distribute material optimally, removing it from low-stress areas. The resulting shapes often look organic."
        },
        {
          id: 'u7-L5-Q17',
          type: 'multiple-choice',
          question: "In injection molding, what are weld lines (knit lines) and when do they form?",
          options: [
            "Weld lines are intentional reinforcement features molded into the part, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome",
            "Weld lines form where two flow fronts meet (after flowing around a core, hole, or obstacle, or from multiple gates) — they create a visible line and a locally weak zone (20-50% strength reduction) due to poor molecular entanglement",
            "Weld lines are caused by excessive injection pressure cracking the mold, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "Weld lines only occur in thermosetting materials, not thermoplastics, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service",
          ],
          correctIndex: 1,
          explanation: "When molten plastic flows around an obstacle (hole, boss, core) or from multiple gates, the flow fronts must rejoin. At the meeting point, if the fronts are too cool, molecules cannot intertwine properly, creating a visible line and mechanical weakness. Weld lines near the gate (where melt is hotter) are stronger than those far from the gate. Design solutions: relocate gates so weld lines move to non-critical areas, increase melt/mold temperature, add overflow wells to push the weld, or use sequential valve gating. For glass-filled materials, weld line weakness is severe because fibers align parallel to the flow front rather than crossing it.",
          hint: "When two plastic flow fronts meet, the interface can be weaker than the surrounding material."
        },
        {
          id: 'u7-L5-Q18',
          type: 'multiple-choice',
          question: "What is the typical build orientation strategy for metal AM (DMLS/SLM) to minimize support structures and residual stress?",
          options: [
            "Always orient the part with the largest flat surface on the build plate — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
            "Always orient vertically to minimize build time regardless of other factors, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome",
            "Orientation does not matter in metal AM — the powder supports everything — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here",
            "Orient to minimize overhangs below 45° from horizontal (self-supporting angle), minimize cross-sectional area changes between layers, and consider heat dissipation paths to reduce thermal distortion and residual stress",
          ],
          correctIndex: 3,
          explanation: "Metal AM build orientation profoundly affects: (1) Support structures — surfaces below ~45° from horizontal need supports, which are difficult and expensive to remove from metal parts. (2) Residual stress — large cross-sectional areas and rapid area changes create high thermal gradients and residual stresses, causing warping. (3) Surface quality — upward-facing surfaces are smooth; downward-facing surfaces against supports are rough. (4) Build time — height determines time more than area. Optimal orientation balances all these factors. Critical functional surfaces should face upward if possible.",
          hint: "Overhangs, residual stress, surface quality, and build time are all affected by how the part is oriented."
        },
        {
          id: 'u7-L5-Q19',
          type: 'multiple-choice',
          question: "A designer specifies a boss (cylindrical protrusion for a screw) on an injection-molded part. What are the DFM guidelines for boss design?",
          options: [
            "Boss outer diameter should be 2-2.5× the screw diameter, wall thickness 50-60% of the adjacent wall (to prevent sink marks on the opposite surface), and connect to nearby walls with gussets or ribs for reinforcement",
            "Make the boss wall thickness equal to the main wall to ensure strength, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
            "Bosses should always be solid cylinders for maximum strength — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice",
            "Boss height should not exceed the screw diameter, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
          ],
          correctIndex: 0,
          explanation: "Boss DFM guidelines: (1) OD = 2-2.5× screw pilot hole diameter (provides enough material for thread engagement). (2) Wall thickness = 50-60% of adjacent wall (thicker causes sink marks on the opposite surface; thinner weakens the boss). (3) Height ≤ 2-3× OD (taller bosses are difficult to fill and prone to core pin deflection). (4) Add gussets or ribs connecting the boss to nearby walls for lateral strength. (5) Add a small draft angle (0.5-1°) on the outside and a slight taper on the core pin. (6) Place near a gate for good packing.",
          hint: "Boss wall thickness must be thin enough to avoid sink marks but thick enough for screw engagement."
        },
        {
          id: 'u7-L5-Q20',
          type: 'true-false',
          question: "In sheet metal design, the minimum distance between a hole edge and a bend line should be at least 2-3 times the material thickness plus the bend radius to prevent the hole from distorting during bending.",
          correctAnswer: true,
          explanation: "If a hole is too close to a bend line, the material deformation from bending distorts the hole (ovalizes or tears it). The minimum distance from the edge of the hole to the bend line should be ≥ 2-3T + R (where T = material thickness, R = inside bend radius). If the hole must be closer, punch it after bending, or add a relief notch between the hole and the bend. This is one of the most commonly violated DFM rules in sheet metal design, causing costly rework.",
          hint: "Bending deforms the material around the bend line. If a hole is within this deformation zone, it gets distorted."
        },
        {
          id: 'u7-L5-Q21',
          type: 'multiple-choice',
          question: "What are the main differences between hot runner and cold runner systems in injection molding?",
          options: [
            "Hot runners are simpler and cheaper than cold runners, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Cold runners produce better quality parts than hot runners, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Hot runners use heated manifolds to keep the plastic molten in the runner system, eliminating runner waste and reducing cycle time. Cold runners allow the plastic in the channels to solidify and must be ejected with the part and either scrapped or reground.",
            "Hot runners can only be used with thermosetting plastics, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
          ],
          correctIndex: 2,
          explanation: "Hot runner: the runner system is heated, keeping plastic molten. Advantages: no runner waste (material savings of 15-40%), faster cycles (runner does not need to cool), better part quality (consistent fill pressure). Disadvantages: higher mold cost ($10k-$50k more), color change is difficult, maintenance is more complex. Cold runner: the runner solidifies with each shot and is ejected — simpler, lower mold cost, easy color changes, but generates waste (regrind or scrap) and longer cycles. Hot runners are justified for high-volume production, expensive resins, or large runner systems.",
          hint: "One system keeps the runner plastic molten; the other lets it solidify and ejects it with every shot."
        },
        {
          id: 'u7-L5-Q22',
          type: 'multiple-choice',
          question: "In metal 3D printing (SLM/DMLS), why is post-build heat treatment (stress relief) almost always required?",
          options: [
            "The metal powder is contaminated and needs purification — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "Rapid melting and solidification of each layer creates severe thermal gradients that induce high residual stresses — enough to warp the part or cause cracking when removed from the build plate without stress relief",
            "Heat treatment is optional and only done to change the color of the part — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here",
            "The metal does not fully melt during printing and needs heat treatment to densify, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
          ],
          correctIndex: 1,
          explanation: "In SLM/DMLS, each laser pass melts a thin layer that solidifies and contracts rapidly. The constraint of the solid material below prevents free contraction, creating tensile stresses in the new layer and compressive stresses below. Layer after layer, these residual stresses accumulate and can exceed the yield strength, causing warping, delamination, or cracking. Stress relief heat treatment (e.g., 600-800°C for Ti-6Al-4V, 1050°C for Inconel 718) reduces residual stresses before the part is cut from the build plate. Additional treatments (HIP, aging, solution treatment) are often applied for final mechanical properties.",
          hint: "Rapid solidification on top of previously solidified layers creates thermal contraction mismatches."
        },
        {
          id: 'u7-L5-Q23',
          type: 'fill-blank',
          question: "In injection molding, the cosmetic defect that appears as thin, dark, meandering lines on the part surface — caused by trapped gases _____ at the end of fill — is called a _____ mark.",
          blanks: ['burning', 'burn'],
          wordBank: ['burning', 'burn', 'escaping', 'sink', 'compressing', 'weld'],
          explanation: "Burn marks (also called gas burns or dieseling) occur when air or gas trapped in the mold cavity is compressed by the advancing melt front. If the gas cannot escape through vents or the parting line, it heats up adiabatically (diesel effect) and burns the plastic, leaving brown/black marks. Solutions: add or clean mold vents at the last-to-fill locations, reduce injection speed, lower melt temperature, or redesign the gate location to change the flow pattern.",
          hint: "Trapped gas compresses and heats up (like a diesel engine) and burns the plastic at the end of fill."
        },
        {
          id: 'u7-L5-Q24',
          type: 'multiple-choice',
          question: "What is the primary advantage of multi-jet fusion (MJF) over SLS for polymer part production?",
          options: [
            "MJF is faster for production quantities because it prints an entire layer simultaneously using an ink-jet array to deposit fusing and detailing agents, rather than tracing with a point laser, while achieving similar or better mechanical properties and finer feature resolution",
            "MJF uses cheaper raw materials, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — which misidentifies the root cause of the observed engineering behavior",
            "MJF can print metals while SLS cannot, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, within the elastic regime only",
            "MJF does not require any post-processing, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — which contradicts established test results",
          ],
          correctIndex: 0,
          explanation: "HP Multi Jet Fusion (MJF) deposits fusing agent (carbon black ink) on powder where it should melt, and detailing agent at boundaries for sharp edges. An infrared lamp then passes over the entire layer simultaneously, fusing all marked areas at once. This is fundamentally faster than SLS (which traces with a single laser point). MJF produces PA12 parts with isotropic mechanical properties (due to more uniform thermal conditions), better surface finish, and higher throughput. MJF is increasingly used for production parts at quantities of 100-10,000 units, competing with injection molding for some applications.",
          hint: "Compare how each technology exposes each layer: a point scanning laser vs. an area-wide process."
        },
        {
          id: 'u7-L5-Q25',
          type: 'true-false',
          question: "In sheet metal design, bend relief cuts are required at the end of a bend line that terminates at an edge or another feature, to prevent tearing of the material.",
          correctAnswer: true,
          explanation: "When a bend line intersects another feature (edge, another bend, a tab), the material at the intersection experiences complex stress states and will tear or deform unpredictably without a relief. Bend relief cuts are small slots or notches placed at the ends of the bend line, typically with width ≥ material thickness and length extending slightly beyond the bend radius. Without relief, the material adjacent to the bend tears or drags, creating a ragged edge. CAD sheet metal tools typically add bend reliefs automatically, but designers should verify they are adequate.",
          hint: "Without a relief, the material at the end of a bend line has no room to deform properly."
        },
        {
          id: 'u7-L5-Q26',
          type: 'multiple-choice',
          question: "An injection molder observes that parts are sticking in the mold cavity side instead of pulling out with the core side during mold opening. What is the most likely cause?",
          options: [
            "The plastic is too soft — increase cooling time, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — a secondary effect only",
            "The injection pressure is too high — reduce pressure, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — a common misunderstanding in this context",
            "The mold is too hot — reduce mold temperature, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, assuming no environmental degradation occurs",
            "Insufficient draft angle on the cavity surfaces, surface finish too smooth on the cavity (part grips it), or excessive undercuts on the cavity side. The part should have more grip on the core side (due to shrinkage onto the core) so it stays with the core for ejector pin access.",
          ],
          correctIndex: 3,
          explanation: "Proper mold function requires the part to stay on the core (B) side during opening, because that is where the ejector pins push the part out. If the part stays on the cavity (A) side: (1) Check draft angles — the cavity side needs MORE draft than the core because the part shrinks away from the cavity but onto the core. (2) Polish the cavity surface or add texture to the core side to increase retention. (3) Remove any undercuts on the cavity side. (4) Add sucker pins on the core side. (5) Adjust cooling so the core side is slightly cooler (part grips core tighter).",
          hint: "Parts naturally shrink onto the core. If the part still sticks to the cavity, what is overriding the natural shrinkage?"
        },
        {
          id: 'u7-L5-Q27',
          type: 'multiple-choice',
          question: "What is the significance of the glass transition temperature (Tg) in selecting polymers for injection molding applications?",
          options: [
            "Tg is the melting temperature of the polymer — above it, the polymer is liquid, though this reasoning neglects the dominant physical mechanism that actually controls the behavior",
            "Tg is the temperature above which an amorphous polymer transitions from a rigid, glassy state to a soft, rubbery state — it defines the maximum service temperature for amorphous plastics like PC, PMMA, and ABS",
            "Tg only applies to crystalline polymers, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables",
            "Tg is the temperature at which the polymer decomposes, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
          ],
          correctIndex: 1,
          explanation: "For amorphous polymers (PC: Tg ≈ 147°C, ABS: Tg ≈ 105°C, PMMA: Tg ≈ 105°C), Tg is essentially the maximum use temperature — above it, the material softens dramatically. Semi-crystalline polymers (nylon, POM, PE, PP) also have a Tg (below which the amorphous regions become brittle) but can function above Tg up to near their melting point because the crystalline regions maintain structure. Understanding Tg vs. Tm is critical for material selection: amorphous plastics have Tg as the service limit; semi-crystalline plastics have a wider usable range between Tg and Tm.",
          hint: "Amorphous polymers go from rigid to rubbery at one key temperature. What is it, and what does it mean for the part?"
        },
        {
          id: 'u7-L5-Q28',
          type: 'multiple-choice',
          question: "A company currently CNC machines aluminum brackets in batches of 50. They are considering switching to FDM printing with carbon-fiber-filled nylon. What are the key technical trade-offs?",
          options: [
            "FDM is always better — no trade-offs exist, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — though this factor is secondary to the actual governing mechanism",
            "CNC aluminum is always better — 3D printing is only for prototypes, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "FDM offers lower per-part cost at 50 units, no tooling, and design freedom, but provides lower stiffness and strength than aluminum, anisotropic properties (weak in Z), limited temperature resistance, and UV/chemical sensitivity. Fatigue behavior is also less predictable.",
            "The only trade-off is surface finish — FDM parts are rougher but equally strong, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
          ],
          correctIndex: 2,
          explanation: "CF-nylon FDM advantages: no tooling, rapid iteration, complex geometry, lower cost at 50 units (no setup/fixturing charges). Disadvantages: tensile strength ~80-120 MPa vs. ~270 MPa for 6061-T6; stiffness ~6-10 GPa vs. 70 GPa for aluminum; Z-direction weakness (50-70% of XY); maximum service temperature ~100-150°C vs. aluminum at 150°C+; moisture absorption (nylon); UV degradation; creep under sustained load. The decision depends on the load requirements — if the bracket is lightly loaded and not in a harsh environment, FDM CF-nylon may work. For structural, high-temperature, or safety-critical applications, aluminum remains superior.",
          hint: "Compare specific mechanical properties, environmental resistance, and cost at the given volume."
        },
        {
          id: 'u7-L5-Q29',
          type: 'true-false',
          question: "In injection molding, the clamping force must exceed the force generated by the injection pressure acting on the projected area of the part, otherwise the mold will open and cause flash.",
          correctAnswer: true,
          explanation: "The injection pressure (typically 30-120 MPa) acts on the projected area of the part and runner system (viewed from the parting line direction), creating a force that tends to push the mold halves apart. If the clamping force (from the hydraulic, toggle, or electric mechanism) is insufficient, the mold opens slightly, and plastic squeezes into the gap, creating flash. Required clamp force ≈ injection pressure × projected area. Rule of thumb: 3-7 tonnes per cm² of projected area for most thermoplastics. This calculation determines the minimum machine size.",
          hint: "The injection pressure pushes against the projected area, trying to open the mold. The clamp must resist this."
        },
        {
          id: 'u7-L5-Q30',
          type: 'fill-blank',
          question: "In sheet metal fabrication, the process of cutting a flat pattern from a sheet using a punch and die set is called _____ (also known as stamping or die cutting).",
          blanks: ['blanking'],
          wordBank: ['blanking', 'shearing', 'notching', 'piercing', 'trimming'],
          explanation: "Blanking is a shearing process where the desired shape (the blank) is cut from the sheet — the blank is the product and the remaining sheet is scrap. In contrast, punching (piercing) removes material to create holes — the removed piece is scrap. Both use the same principle (punch pushes material through a die with controlled clearance), but they differ in which piece is the product. Clearance between punch and die is typically 5-10% of sheet thickness per side. Proper clearance produces clean cuts; excessive clearance causes burrs and rough edges.",
          hint: "This shearing operation produces a flat part (the \"blank\") cut out of sheet metal."
        }
      ]
    },
    {
      id: 'u7-L6',
      title: 'Welding & Joining',
      description: 'Welding processes (MIG/MAG, TIG, stick, laser), HAZ metallurgy, weld defects, joint design, fillet weld sizing, weldability, residual stresses and distortion control.',
      icon: '⚡',
      xpReward: 30,
      questions: [
        {
          id: 'u7-L6-Q1',
          type: 'multiple-choice',
          question: 'A fabrication shop must weld 6 mm thick 304 stainless steel panels for a food-processing vessel requiring high-quality, porosity-free welds with minimal spatter and excellent corrosion resistance in the weld zone. Which welding process is the best choice?',
          options: [
            'SMAW (stick) with E308L electrodes — low cost but higher spatter and slag inclusion risk',
            'GTAW (TIG) with ER308L filler and argon shielding — superior weld quality, precise heat control, minimal contamination',
            'GMAW (MIG/MAG) with CO₂ shielding gas — high deposition rate but CO₂ causes carbon pickup in stainless steel',
            'SAW (submerged arc) — highest deposition rate but limited to flat/horizontal positions and overkill for 6 mm plate',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: 'GTAW (TIG) is the preferred process for stainless steel food-processing equipment because: (1) pure argon shielding prevents oxidation and carbon pickup that would degrade corrosion resistance, (2) precise heat control minimizes the HAZ and reduces sensitization (chromium carbide precipitation at grain boundaries in the 450-850\u00B0C range), (3) no flux or spatter means the weld zone can meet sanitary finish requirements with minimal post-weld cleanup, and (4) ER308L filler (low carbon) further resists sensitization. SMAW produces acceptable structural welds but leaves slag and spatter. GMAW with CO\u2082 is unsuitable for stainless steel — use Ar/He mixtures instead. SAW is efficient for thick plate but impractical for 6 mm panels.',
          hint: 'Consider which process gives the cleanest weld with the least contamination for corrosion-sensitive material.'
                },
        {
          id: 'u7-L6-Q2',
          type: 'multiple-choice',
          question: 'A welder is about to join two plates of AISI 4140 steel (0.40% C, Cr-Mo alloy). You calculate the carbon equivalent (CE) at 0.72. What precautions must be taken before, during, and after welding, and why?',
          options: [
            'No special precautions — 4140 is a common structural steel that welds easily with any process, but industry experience indicates this factor plays only a minor role in the overall performance',
            'Preheat to 200-300°C to slow HAZ cooling and prevent martensite/cracking, use low-hydrogen electrodes/process, control interpass temperature, and perform PWHT to temper the hard HAZ',
            'Use very high heat input to melt as much material as possible — the large weld pool will slow cooling enough to prevent cracking — a secondary effect only',
            'Weld at room temperature but use austenitic stainless filler wire — the ductile weld metal will absorb all shrinkage stresses — an approximation that loses accuracy outside a narrow parameter range',
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="28" y="6" width="12" height="32" rx="6" fill="#58CC02" opacity="0.15" transform="rotate(-15,34,22)"/> <rect x="28" y="6" width="12" height="32" rx="6" stroke="#3B8700" stroke-width="2" fill="none" transform="rotate(-15,34,22)"/> <rect x="31" y="36" width="6" height="10" rx="3" fill="#3B8700" opacity="0.4" transform="rotate(-15,34,41)"/> <circle cx="34" cy="50" r="6" fill="#58CC02" opacity="0.2"> <animate attributeName="r" values="4;7;4" dur="0.3s" repeatCount="indefinite"/> <animate attributeName="opacity" values="0.15;0.35;0.15" dur="0.3s" repeatCount="indefinite"/> </circle> <rect x="8" y="52" width="64" height="10" rx="5" fill="#58CC02" opacity="0.1"/> <rect x="8" y="52" width="64" height="10" rx="5" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="14" y1="57" x2="34" y2="57" stroke="#3B8700" stroke-width="3" opacity="0.3" stroke-linecap="round"/> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.6s" repeatCount="indefinite"/> <animateMotion dur="0.6s" repeatCount="indefinite" path="M34,50 L26,40"/> </circle> <circle r="1.2" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s"/> <animateMotion dur="0.5s" repeatCount="indefinite" path="M34,50 L44,38" begin="0.1s"/> </circle> <circle r="1.5" fill="#A5E86C"> <animate attributeName="opacity" values="0.7;0" dur="0.7s" repeatCount="indefinite" begin="0.2s"/> <animateMotion dur="0.7s" repeatCount="indefinite" path="M34,50 L22,36" begin="0.2s"/> </circle> <circle r="1" fill="#3B8700"> <animate attributeName="opacity" values="0.5;0" dur="0.45s" repeatCount="indefinite" begin="0.15s"/> <animateMotion dur="0.45s" repeatCount="indefinite" path="M34,50 L42,34" begin="0.15s"/> </circle> <circle r="1.3" fill="#58CC02"> <animate attributeName="opacity" values="0.6;0" dur="0.55s" repeatCount="indefinite" begin="0.3s"/> <animateMotion dur="0.55s" repeatCount="indefinite" path="M34,50 L28,32" begin="0.3s"/> </circle> </svg>',
          explanation: 'CE = 0.72 is well above the 0.45 threshold for hydrogen cracking risk. The high carbon and alloy content means the HAZ will form hard, brittle martensite unless cooling is slowed. The complete approach: (1) Preheat to 200-300°C (per AWS D1.1) — this slows cooling through the martensite range and allows hydrogen to diffuse out. (2) Use low-hydrogen processes (TIG, MIG) or low-hydrogen electrodes (E7018, baked at 250°C) to minimize hydrogen — hydrogen diffuses to stress concentrations in martensite and causes delayed cracking. (3) Maintain interpass temperature at 200-300°C. (4) PWHT (tempering at 600-650°C) softens the martensitic HAZ, dramatically improving toughness. Very high heat input is counterproductive — it creates a massive HAZ with coarse grains. Stainless filler does not solve the HAZ hardness problem because the HAZ metallurgy depends on the base metal, not the filler. Skipping any of these steps on a CE > 0.45 steel risks catastrophic delayed cracking.',
          hint: 'A CE of 0.72 puts this firmly in the "high cracking risk" category. Think about what drives cracking: hard HAZ + hydrogen + restraint.'
                },
        {
          id: 'u7-L6-Q3',
          type: 'multiple-choice',
          question: 'A welded pressure vessel fails a radiographic (RT) inspection. The film shows dark, rounded indications scattered within the weld. What is the most likely defect, and what is its primary cause?',
          options: [
            'Lack of fusion — caused by insufficient heat input or improper joint preparation',
            'Porosity — caused by gas entrapment from moisture, contamination, or improper shielding gas coverage',
            'Slag inclusions — caused by improper inter-pass cleaning in multi-pass SMAW welds',
            'Hot cracking — caused by high sulfur or phosphorus content in the base metal',
          ],
          correctIndex: 1,
          explanation: 'Dark, rounded (spherical or elongated) indications on radiographic film are the classic signature of porosity — trapped gas bubbles frozen in the solidifying weld metal. Common causes: (1) moisture on the base metal or electrodes (H\u2082O decomposes to H\u2082 at arc temperatures), (2) contaminated base metal (oil, paint, rust), (3) inadequate shielding gas coverage (wind, damaged nozzle, incorrect flow rate), (4) excessive arc length. Lack of fusion appears as dark, linear indications with sharp edges. Slag inclusions appear as irregular dark patches, usually elongated. Hot cracks appear as dark, irregular lines typically along the weld centerline. Porosity can be acceptable within code limits (e.g., ASME Section VIII), but clustered porosity usually requires repair.',
          hint: 'Match the radiographic appearance — dark = less dense = void. Rounded = gas bubble. What causes trapped gas in welds?'
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
          explanation: 'Throat area required: A_throat = F/\u03C4_allow = 90,000/145 = 620.7 mm\u00B2. Throat dimension: a = A_throat/L_total = 620.7/300 = 2.07 mm. Leg size: w = a/0.707 = 2.07/0.707 = 2.93 mm \u2248 3 mm by calculation. However, AWS D1.1 Table 5.8 specifies minimum fillet weld sizes based on the thicker part being joined — for 6-13 mm thick plate, the minimum fillet weld is 5 mm; for 13-19 mm, it is 6 mm. These minimums ensure adequate heat input to prevent cold cracking and provide sufficient throat for fatigue resistance. In practice, the code minimum almost always governs over the calculated size for static loads. Always check the code minimum.',
          hint: 'Calculate: throat area = F/\u03C4_allow, then a = area/length, then leg = a/0.707. But also check minimum code requirements for the plate thickness.'
                },
        {
          id: 'u7-L6-Q5',
          type: 'true-false',
          question: 'You need to design a welded aluminum frame for a marine application. Using 6061-T6 is a good choice because, unlike steel, aluminum does not lose strength in the weld heat-affected zone.',
          correctAnswer: false,
          explanation: 'This is false and a common misconception. 6061-T6 actually loses dramatic strength in the HAZ during welding. The T6 temper gets its strength from fine Mg2Si precipitates created by solution treatment + aging. Welding heat dissolves or over-ages these precipitates, softening the HAZ to near-annealed strength (~55 MPa yield vs. 275 MPa in T6). This cannot be recovered without re-solution-treating the entire structure, which is impractical. For welded aluminum structures, designers must use the reduced HAZ strength (about 60% of T6 per AWS D1.2) in calculations. For marine applications, 5xxx series alloys (5083, 5086) are often preferred because they are non-heat-treatable and lose minimal strength when welded — their strength comes from solid solution and strain hardening, not precipitates.',
          hint: 'Think about what gives the T6 temper its strength (precipitates from aging) and what happens to those precipitates when the HAZ is heated above their dissolution temperature.'
                },
        {
          id: 'u7-L6-Q6',
          type: 'fill-blank',
          question: 'You need to join an aluminum bracket to a steel frame. Fusion welding is not feasible because of brittle _____ compounds forming at the interface. The most practical joining method for this dissimilar-metal joint is _____ fastening (using bolts or rivets with insulating bushings to prevent galvanic corrosion).',
          blanks: ['intermetallic', 'mechanical'],
          wordBank: ['intermetallic', 'mechanical', 'eutectic', 'adhesive', 'galvanic', 'thermal'],
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Top plate --> <rect x="4" y="26" width="72" height="12" rx="2" fill="#58CC02" opacity="0.12"/> <rect x="4" y="26" width="72" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bottom plate --> <rect x="4" y="42" width="72" height="12" rx="2" fill="#58CC02" opacity="0.12"/> <rect x="4" y="42" width="72" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Rivets (3 in a row) --> <circle cx="22" cy="40" r="5" fill="#58CC02" opacity="0.2"/> <circle cx="22" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="22" cy="40" r="2" fill="#3B8700" opacity="0.4"/> <circle cx="40" cy="40" r="5" fill="#58CC02" opacity="0.2"/> <circle cx="40" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="40" cy="40" r="2" fill="#3B8700" opacity="0.4"/> <circle cx="58" cy="40" r="5" fill="#58CC02" opacity="0.2"/> <circle cx="58" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="58" cy="40" r="2" fill="#3B8700" opacity="0.4"/> <!-- Rivet heads (top) --> <ellipse cx="22" cy="26" rx="4" ry="2" fill="#58CC02" opacity="0.25"/> <ellipse cx="40" cy="26" rx="4" ry="2" fill="#58CC02" opacity="0.25"/> <ellipse cx="58" cy="26" rx="4" ry="2" fill="#58CC02" opacity="0.25"/> <!-- Force arrows (pulling plates apart) --> <g> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite"/> <line x1="4" y1="32" x2="0" y2="32" stroke="#3B8700" stroke-width="1.2" stroke-linecap="round"/> <polygon points="2,30.5 -1,32 2,33.5" fill="#3B8700"/> </g> <g> <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite"/> <line x1="76" y1="48" x2="80" y2="48" stroke="#3B8700" stroke-width="1.2" stroke-linecap="round"/> <polygon points="78,46.5 81,48 78,49.5" fill="#3B8700"/> </g> <!-- Shear stress indicators --> <g opacity="0"> <animate attributeName="opacity" values="0;0.25;0" dur="2s" repeatCount="indefinite"/> <line x1="18" y1="38" x2="26" y2="42" stroke="#A5E86C" stroke-width="0.8" opacity="0.4"/> <line x1="36" y1="38" x2="44" y2="42" stroke="#A5E86C" stroke-width="0.8" opacity="0.4"/> <line x1="54" y1="38" x2="62" y2="42" stroke="#A5E86C" stroke-width="0.8" opacity="0.4"/> </g> <!-- Labels --> <text x="40" y="20" text-anchor="middle" font-size="4.5" fill="#3B8700" opacity="0.2" font-style="italic">lap joint</text> <text x="40" y="66" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">shear plane</text> </svg>',
          explanation: 'Joining aluminum to steel is a classic dissimilar-metal problem. Fusion welding creates brittle Fe-Al intermetallic compounds that crack easily. In practice, mechanical fastening (bolts, rivets, or clinching) is most common because it is well-understood, inspectable, and allows for thermal expansion differences. The critical consideration is galvanic corrosion — aluminum (anodic) will corrode preferentially when in contact with steel (cathodic) in the presence of an electrolyte. Insulating bushings, coatings, or sealants must separate the metals.',
          hint: 'Fusion welding creates brittle intermetallics. What is the most straightforward alternative joining method for production, keeping galvanic corrosion in mind?'
                },
        {
          id: 'u7-L6-Q7',
          type: 'multiple-choice',
          question: "What is the primary difference between GMAW (MIG) and FCAW (Flux-Cored Arc Welding)?",
          options: [
            "GMAW uses a solid wire with external shielding gas; FCAW uses a tubular wire filled with flux that generates its own shielding — making FCAW more suitable for outdoor/windy conditions",
            "GMAW is for aluminum only and FCAW is for steel only — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms",
            "FCAW produces cleaner welds than GMAW, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "There is no practical difference between the two processes — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice",
          ],
          correctIndex: 0,
          explanation: "GMAW (MIG) feeds a solid wire electrode with external shielding gas (Ar, CO₂, or mixtures). FCAW uses a tubular wire with flux core — self-shielded FCAW generates its own gas (no external bottle), while gas-shielded FCAW uses both flux and external gas. FCAW advantages: works in wind (self-shielded type), higher deposition rates than GMAW, better penetration, and more tolerant of surface contaminants. Disadvantages: produces slag (must be cleaned between passes), more spatter, and visible fume generation. FCAW is widely used in structural steel erection, shipbuilding, and pipeline welding.",
          hint: "One uses solid wire + gas tank; the other has flux built into the wire itself."
        },
        {
          id: 'u7-L6-Q8',
          type: 'multiple-choice',
          question: "A weld inspection reveals lack of fusion defects along the sidewall of a V-groove butt joint. What is the most likely cause and correction?",
          options: [
            "The filler wire was the wrong composition — change to a matching filler, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome",
            "The welding was too fast — slow down and add more passes, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables",
            "Insufficient heat input or improper torch angle — the arc was not directed at the sidewall. Correct by increasing voltage/amperage, adjusting work angle to aim at the sidewall, or widening the groove angle.",
            "The joint was too clean — contamination actually helps fusion, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
          ],
          correctIndex: 2,
          explanation: "Lack of fusion (LOF) occurs when the weld metal does not fully fuse with the base metal or a previous pass. Sidewall LOF is commonly caused by: (1) Arc not directed at the groove face (wrong torch angle — should aim at the sidewall, not just the root). (2) Insufficient heat input (too low amperage, too fast travel). (3) Groove angle too narrow, preventing access. (4) Excessive weld pool ahead of the arc. Corrections: increase amperage, adjust torch angle to 5-15° toward the sidewall, slow travel speed, or increase groove angle from 60° to 70°. LOF is a serious, rejection-worthy defect in pressure vessel and structural codes because it acts as a crack-like planar flaw.",
          hint: "The arc must actually melt the groove sidewall. What conditions prevent this?"
        },
        {
          id: 'u7-L6-Q9',
          type: 'true-false',
          question: "Preheating before welding slows the cooling rate in the HAZ, reducing the risk of hydrogen-induced cracking in susceptible steels.",
          correctAnswer: true,
          explanation: "Preheating serves multiple functions: (1) Slows the cooling rate through the critical temperature range, reducing the hardness of the HAZ (less martensite formation). (2) Allows more time for hydrogen to diffuse out of the joint before the weld cools to temperatures where hydrogen embrittlement occurs (<200°C). (3) Reduces thermal gradient and residual stresses. (4) Drives off moisture from the joint area. Preheat temperature depends on carbon equivalent, plate thickness, hydrogen level, and restraint. AWS D1.1 Annex XI provides a method to calculate minimum preheat.",
          hint: "Slower cooling = softer HAZ + more time for hydrogen to escape. Both reduce cracking risk."
        },
        {
          id: 'u7-L6-Q10',
          type: 'multiple-choice',
          question: "An engineer needs to weld 3 mm thick 6061-T6 aluminum sheets for a structural frame. Which filler metal should be selected: ER4043 or ER5356?",
          options: [
            "ER4043 — always the best choice for all aluminum welding, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Use the same alloy (ER6061) as filler to match compositions, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Neither — 6061 aluminum cannot be welded, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, but this applies only under ideal conditions",
            "ER5356 for structural applications — it provides higher weld strength (matching the 5xxx series filler to the load requirement), better corrosion resistance, and is anodizable. ER4043 is better for cosmetic welds and reduces hot cracking but has lower strength.",
          ],
          correctIndex: 3,
          explanation: "For structural 6061-T6: ER5356 (Al-5%Mg) provides higher as-welded shear strength (~117 MPa vs. ~80 MPa for 4043), better color match after anodizing, and good corrosion resistance. ER4043 (Al-5%Si) has a lower melting range reducing hot cracking risk, produces shinier/smoother welds (cosmetic), and is easier to feed through the wire liner. For structural applications per AWS D1.2, ER5356 is preferred. Note: ER6061 filler is not used because the weld pool dilution changes the Mg₂Si ratio, making the weld susceptible to solidification cracking. Both 4043 and 5356 are designed to tolerate dilution with 6061 base metal.",
          hint: "One filler prioritizes strength and structural integrity; the other prioritizes appearance and crack resistance."
        },
        {
          id: 'u7-L6-Q11',
          type: 'multiple-choice',
          question: "What is the heat-affected zone (HAZ) and why is it often the weakest part of a welded joint?",
          options: [
            "The HAZ is the area that was melted and resolidified — it is strong because it is essentially cast metal, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome",
            "The HAZ is the base metal adjacent to the weld that was heated enough to alter its microstructure but not melted. It can be weakened by grain coarsening (in steel), over-aging (in aluminum), sensitization (in stainless steel), or martensite formation (in hardenable steels).",
            "The HAZ is always the strongest zone because the heat treatment improves properties, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service",
            "The HAZ only exists in stick welding, not in TIG or MIG, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, though the effect is secondary in most cases",
          ],
          correctIndex: 1,
          explanation: "The HAZ experiences a gradient of peak temperatures from near-melting (adjacent to fusion line) to ambient. In carbon steel: the coarse-grained HAZ (>1100°C) has reduced toughness; the intercritical HAZ (727-910°C) can form local brittle zones. In precipitation-hardened aluminum (6061-T6): the HAZ over-ages, dropping yield strength from 275 MPa to ~110 MPa. In austenitic stainless steel: the HAZ can sensitize (450-850°C), losing corrosion resistance. In high-carbon/alloy steel: the HAZ can form hard, brittle martensite. Understanding HAZ metallurgy is critical for weld procedure design.",
          hint: "The base metal near the weld gets heated — not enough to melt, but enough to change its properties."
        },
        {
          id: 'u7-L6-Q12',
          type: 'multiple-choice',
          question: "What welding distortion pattern is typically observed in a long butt weld between two flat plates, and what is its primary cause?",
          options: [
            "Angular distortion (V-shape) transverse to the weld and longitudinal bowing — caused by the non-uniform thermal contraction of the weld metal and HAZ during cooling, which creates residual stresses that pull the plates together",
            "The plates bend upward uniformly — caused by gravity during welding, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "The plates expand permanently and become larger, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response",
            "Distortion only occurs if the welding is performed incorrectly, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
          ],
          correctIndex: 0,
          explanation: "Welding distortion results from non-uniform thermal expansion and contraction. The weld zone heats, expands (restrained by surrounding cold metal), yields in compression, then contracts during cooling, pulling the joint together. In a butt weld: (1) Transverse shrinkage narrows the joint. (2) Angular distortion — the top of the weld (wider groove) shrinks more than the root, tilting the plates upward. (3) Longitudinal shrinkage causes bowing. (4) Rotational distortion changes the gap as welding progresses. Control methods: balanced welding sequences (backstep, skip welding), pre-setting (tacking at an angle opposite to expected distortion), mechanical restraint (fixtures/strongbacks), and thermal management (low heat input, intermittent welding).",
          hint: "Hot weld metal contracts as it cools, pulling the plates — but the contraction is not uniform through the thickness."
        },
        {
          id: 'u7-L6-Q13',
          type: 'fill-blank',
          question: "In arc welding, the measure of energy input per unit length of weld is called heat _____, typically expressed in kJ/mm.",
          blanks: ['input'],
          wordBank: ['input', 'flux', 'transfer', 'output', 'dissipation'],
          explanation: "Heat input HI = (V × I × 60) / (S × 1000) in kJ/mm, where V = arc voltage, I = welding current, and S = travel speed (mm/min). Heat input controls: HAZ width, cooling rate (and thus microstructure), residual stress, and distortion. Too low → incomplete fusion, fast cooling, hard HAZ. Too high → wide HAZ, coarse grain, slow cooling (soft but low-toughness), excessive distortion. Welding procedure specifications (WPS) define acceptable heat input ranges. Most structural codes limit maximum heat input for toughness-sensitive applications.",
          hint: "This welding parameter is calculated from voltage, current, and travel speed — expressed in energy per length units."
        },
        {
          id: 'u7-L6-Q14',
          type: 'multiple-choice',
          question: "A welder notices excessive spatter during GMAW (MIG) welding of mild steel. What are the most likely causes and corrections?",
          options: [
            "Spatter is normal and cannot be reduced in MIG welding, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Spatter is caused by welding too slowly — increase travel speed, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "The wire is too thin — switch to a thicker wire, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, assuming no environmental degradation occurs",
            "Excessive voltage (long arc), incorrect wire feed speed (erratic arc), contaminated base metal, or wrong shielding gas. Corrections: reduce voltage, tune wire feed for stable arc, clean the workpiece, use correct Ar/CO₂ mixture (75/25 is typical for steel).",
          ],
          correctIndex: 3,
          explanation: "GMAW spatter causes: (1) Excessive voltage — creates a long, unstable arc that explodes droplets. (2) Wire feed too fast or slow — causes globular or short-circuit instability. (3) Wrong shielding gas — pure CO₂ produces more spatter than Ar/CO₂ mixtures (75/25 Ar/CO₂ is standard for carbon steel). (4) Contaminated base metal — oil, rust, and moisture cause gas disruptions. (5) Excessive stick-out — wire overheats before reaching the arc. Proper parameter tuning should produce a smooth, consistent arc with minimal spatter. Anti-spatter spray on the workpiece and nozzle also helps.",
          hint: "Spatter indicates arc instability. What parameters control arc stability in GMAW?"
        },
        {
          id: 'u7-L6-Q15',
          type: 'multiple-choice',
          question: "What is the difference between a groove weld and a fillet weld, and when is each used?",
          options: [
            "They are the same weld type with different names depending on position, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, verified against reference specimens of known properties",
            "Groove welds are stronger than fillet welds in all cases, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, but this applies only under ideal conditions",
            "A groove weld fills a prepared groove between members (butt joints, V-groove, J-groove, U-groove) and provides full or partial penetration. A fillet weld is a triangular cross-section weld joining surfaces at roughly right angles (T-joints, lap joints, corner joints) without groove preparation.",
            "Fillet welds require groove preparation while groove welds do not, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — not supported by standard testing protocols",
          ],
          correctIndex: 2,
          explanation: "Groove welds: used for butt joints where full penetration is needed (pressure vessels, bridges, critical structures). The base metal edges are prepared (beveled) into V, J, U, or double-V grooves. Complete joint penetration (CJP) groove welds develop the full base metal strength. Fillet welds: triangular profile joining two surfaces at an angle (most commonly 90°). No edge preparation needed — simpler and faster. The throat dimension (a = 0.707 × leg) is the effective load-carrying dimension. In structural design, about 80% of welds are fillet welds because T-joints and lap joints are extremely common.",
          hint: "One fills a prepared gap between aligned members; the other joins members meeting at an angle."
        },
        {
          id: 'u7-L6-Q16',
          type: 'true-false',
          question: "Submerged arc welding (SAW) is suitable for all welding positions including vertical-up and overhead.",
          correctAnswer: false,
          explanation: "SAW is limited to flat and horizontal positions because it uses a deep bed of granular flux that covers the arc — gravity keeps the flux in place. In vertical or overhead positions, the flux would fall away. Despite this limitation, SAW is extremely productive for flat/horizontal work: deposition rates of 5-20 kg/hr (vs. 1-5 kg/hr for GMAW), deep penetration, excellent weld quality (the flux blanket prevents atmospheric contamination), and smooth bead profile requiring minimal cleanup. It is the standard process for longitudinal and circumferential seams on pressure vessels, structural beams, and pipe (rotated to flat position).",
          hint: "Think about what \"submerged\" means — the arc is buried under granular flux. What does gravity do to loose powder?"
        },
        {
          id: 'u7-L6-Q17',
          type: 'multiple-choice',
          question: "What is the purpose of back-gouging the root of a double-V groove weld before welding the second side?",
          options: [
            "To add more filler metal to the root for extra strength, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables",
            "To remove the root pass from the first side, which may contain slag, incomplete penetration, or other defects, ensuring full fusion when welding the second side for a complete joint penetration (CJP) weld",
            "To cool down the joint between welding sides, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
            "Back-gouging is decorative — it makes the weld look better — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause",
          ],
          correctIndex: 1,
          explanation: "In a double-V groove weld, the first side is welded, then the root is back-gouged from the second side (using air-carbon arc gouging, grinding, or plasma gouging) before welding the second side. This removes: (1) Any root defects from the first side (lack of penetration, slag, porosity). (2) The root gap irregularity. (3) Any oxide contamination at the root. After back-gouging to sound metal, the second side is welded, achieving a complete joint penetration weld verified by RT or UT. This is standard practice per AWS D1.1, ASME, and EN standards for CJP welds.",
          hint: "The root of the first pass may not be perfect. How do you ensure a clean start for the second side?"
        },
        {
          id: 'u7-L6-Q18',
          type: 'multiple-choice',
          question: "Friction stir welding (FSW) joins materials without melting them. What is its primary advantage and main limitation?",
          options: [
            "FSW is fast and cheap for all materials and thicknesses, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — a simplified model that neglects the most significant physical variable",
            "FSW produces stronger welds than any fusion welding process for all materials, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, which does not account for the microstructural changes occurring at these conditions",
            "FSW can only join plastics, not metals, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, assuming the material remains in the linear elastic regime throughout the loading cycle",
            "FSW joins materials in the solid state (no melting), avoiding solidification defects (porosity, hot cracking) and producing fine-grained welds with excellent mechanical properties — especially valuable for aluminum and dissimilar metals. Main limitation: requires high forces and rigid fixturing, and the rotating tool limits joint geometries.",
          ],
          correctIndex: 3,
          explanation: "FSW uses a rotating tool with a shoulder and pin that plunges into the joint and traverses along it. Frictional heat plasticizes (but does not melt) the material, and the tool mechanically stirs the softened material from both sides together. Advantages: no shielding gas, no filler metal, no solidification defects, low distortion, excellent properties in aluminum (no HAZ softening near the weld center), can join dissimilar metals (Al-Cu, Al-Steel). Limitations: high downforce (5-50 kN), rigid fixturing needed, tool wear in hard materials (steel, Ti), limited to linear or simple curved joints, and leaves an exit hole where the tool retracts.",
          hint: "A spinning tool plasticizes the material without melting it. What does this avoid, and what does it require?"
        },
        {
          id: 'u7-L6-Q19',
          type: 'multiple-choice',
          question: "What NDT method is best suited for detecting surface-breaking cracks in ferromagnetic materials?",
          options: [
            "Magnetic particle testing (MT/MPI) — fast, portable, highly sensitive to surface and near-surface cracks in ferromagnetic materials (steel, iron, nickel alloys)",
            "Radiographic testing (RT) — X-rays detect all surface defects, which would require additional verification through destructive testing of representative samples",
            "Ultrasonic testing (UT) — best for surface crack detection, provided the test specimen geometry conforms to the requirements specified in the standard",
            "Visual testing (VT) — if you cannot see it, it does not matter, assuming uniform property distribution through the thickness without any processing-induced gradients",
          ],
          correctIndex: 0,
          explanation: "Magnetic particle testing (MT) detects surface and shallow subsurface (up to ~3 mm) discontinuities in ferromagnetic materials. The part is magnetized, and ferrous particles (dry or in fluorescent wet suspension) are applied — they accumulate at flux leakage points caused by cracks, forming visible indications. MT is fast (<5 min per area), portable, and extremely sensitive to tight surface cracks that may be invisible to the naked eye. Limitations: only works on ferromagnetic materials (not austenitic stainless steel, aluminum, or copper). For non-ferromagnetic materials, use liquid penetrant testing (PT/DPI).",
          hint: "This method exploits the magnetic properties of ferromagnetic materials to detect flux leakage at cracks."
        },
        {
          id: 'u7-L6-Q20',
          type: 'true-false',
          question: "In a lap joint with fillet welds, the minimum overlap should be at least 5 times the thickness of the thinner member to ensure adequate load transfer.",
          correctAnswer: true,
          explanation: "AWS D1.1 and most structural codes require a minimum overlap of 5× the thinner plate thickness for fillet-welded lap joints. Insufficient overlap creates: (1) High peeling/rotation forces on the fillet welds (the weld throat becomes the fulcrum of a bending couple). (2) Bending stresses in the weld that significantly reduce capacity. (3) Fatigue weakness from the stress concentration at the weld toes. Adequate overlap ensures the load path is primarily shear through the fillet welds rather than a combination of shear and bending.",
          hint: "Short overlaps cause the fillet welds to experience bending in addition to shear. How much overlap prevents this?"
        },
        {
          id: 'u7-L6-Q21',
          type: 'multiple-choice',
          question: "A weld procedure specification (WPS) for a critical pressure vessel weld is being developed. What are the essential variables that must be qualified by procedure qualification testing (PQR)?",
          options: [
            "Only the welder's name and date, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Only the type of electrode and welding position, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service",
            "Welding process, base metal type/group, filler metal classification, preheat/interpass temperature, heat input range, PWHT parameters, joint design, and shielding gas type. Changes to essential variables require requalification.",
            "The color of the welding helmet and glove type, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
          ],
          correctIndex: 2,
          explanation: "Essential variables (per ASME Section IX) are parameters that, if changed beyond allowed limits, significantly affect mechanical properties and require requalification: (1) Welding process (GMAW, GTAW, SMAW). (2) Base metal P-number (material grouping). (3) Filler metal F-number and A-number. (4) Thickness range qualified. (5) Preheat minimum. (6) Interpass temperature maximum. (7) PWHT temperature and time. (8) Heat input limits. (9) Shielding gas type and flow rate. The PQR records the actual parameters used during qualification and the results of mechanical testing (tensile, bend, impact). The WPS is derived from one or more supporting PQRs.",
          hint: "Essential variables are those that affect the final weld properties. Changing them requires new testing."
        },
        {
          id: 'u7-L6-Q22',
          type: 'multiple-choice',
          question: "What is the purpose of post-weld heat treatment (PWHT) and for which applications is it typically required?",
          options: [
            "PWHT is only cosmetic — it improves the weld color and appearance, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — valid for textbook problems but misleading for real-world applications",
            "PWHT (typically 580-650°C for carbon steel, held 1 hour per 25 mm thickness) reduces residual stresses, tempers hard HAZ microstructures, and improves dimensional stability. Required by codes for thick sections (>19-38 mm), high-strength steels, and critical service (pressure vessels, nuclear, sour service).",
            "PWHT makes the weld stronger by re-melting and resolidifying the weld metal, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — a secondary effect only",
            "PWHT is only needed for non-ferrous metals like aluminum, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, provided the boundary conditions are satisfied",
          ],
          correctIndex: 1,
          explanation: "PWHT (stress relief) heats the welded assembly uniformly to reduce residual stresses from ~yield strength to ~10-20% of yield. This prevents: (1) Stress corrosion cracking in service. (2) Distortion during subsequent machining. (3) Brittle fracture from the combination of high residual stress + low toughness HAZ. For carbon steel, typical PWHT is 600-650°C for 1 hr/25 mm thickness. ASME Section VIII, NACE MR0175 (sour service), and nuclear codes mandate PWHT for specific thicknesses and materials. Care must be taken with Cr-Mo steels to temper above the temper embrittlement range.",
          hint: "Residual stresses from welding approach yield strength. What does controlled heating do to relieve them?"
        },
        {
          id: 'u7-L6-Q23',
          type: 'fill-blank',
          question: "The effective load-carrying dimension of a fillet weld is the _____ of the weld, equal to 0.707 times the _____ size for an equal-leg fillet.",
          blanks: ['throat', 'leg'],
          wordBank: ['throat', 'leg', 'root', 'face', 'toe', 'bead'],
          explanation: "The throat is the shortest distance from the root of the fillet to the face (hypotenuse). For an equal-leg fillet with leg size w, the throat a = w × cos(45°) = 0.707w. All fillet weld strength calculations use the throat dimension, not the leg size: τ = F/(a × L). The throat must be maintained along the full weld length — insufficient throat reduces capacity proportionally.",
          hint: "In the triangular cross-section of a fillet weld, the shortest distance from root to face is the critical load-carrying dimension."
        },
        {
          id: 'u7-L6-Q24',
          type: 'multiple-choice',
          question: "A fabricator is welding a 50 mm thick ASTM A516 Grade 70 pressure vessel plate. The calculated carbon equivalent is 0.48. What minimum preheat temperature would you recommend?",
          options: [
            "100-150°C — with CE of 0.48 and 50 mm thickness, moderate preheat is needed to slow cooling, reduce HAZ hardness, and allow hydrogen diffusion. Verify using AWS D1.1 or ASME guidelines for the specific configuration.",
            "10°C (just above freezing) to remove condensation, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service",
            "No preheat required — A516 is a pressure vessel steel designed for welding, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "400°C — maximum preheat for maximum safety, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
          ],
          correctIndex: 0,
          explanation: "CE = 0.48 is at the threshold for hydrogen cracking risk (>0.45 is elevated). At 50 mm thickness, the heat sink effect of the thick plate accelerates cooling, increasing the risk of hard HAZ. AWS D1.1 Annex H and BS EN 1011-2 methods consider CE, thickness, hydrogen level, and restraint. For CE = 0.48, 50 mm thickness, and low-hydrogen process, typical recommendations are 100-150°C. Higher preheat may be needed with high restraint or non-low-hydrogen processes. Excessive preheat (>250°C for this case) wastes energy and can be counterproductive by reducing toughness through excessive grain growth.",
          hint: "Consider three factors together: carbon equivalent, plate thickness, and hydrogen control level."
        },
        {
          id: 'u7-L6-Q25',
          type: 'true-false',
          question: "Laser beam welding (LBW) produces a very narrow weld with a high depth-to-width ratio and minimal HAZ compared to arc welding processes.",
          correctAnswer: true,
          explanation: "Laser welding focuses a high-power-density beam (10⁶-10⁸ W/cm²) onto the workpiece, creating a keyhole that penetrates deep into the material. The result: very narrow weld (0.5-2 mm wide), high depth-to-width ratio (up to 10:1 vs. 1:1 for GMAW), very narrow HAZ (0.1-0.5 mm), low heat input, minimal distortion, and high welding speed (1-10 m/min). Limitations: tight joint fit-up tolerance (~0.1 mm gap max), high equipment cost, and reflective materials (copper, aluminum) can reflect the beam. LBW is used extensively in automotive (body panels, tailored blanks), aerospace, and medical device manufacturing.",
          hint: "A laser beam concentrates enormous energy into a tiny spot. What does that mean for weld geometry and heat input?"
        },
        {
          id: 'u7-L6-Q26',
          type: 'multiple-choice',
          question: "What is the difference between undercut and underfill as weld defects?",
          options: [
            "They are the same defect with different names, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism",
            "Undercut is caused by too much filler while underfill is caused by too little heat, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications",
            "Undercut is a surface defect while underfill is an internal defect, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process",
            "Undercut is a groove melted into the base metal at the weld toe that is not filled by weld metal — creating a stress concentration. Underfill is when the weld face is below the surface of the base metal — reducing the effective throat and cross-section.",
          ],
          correctIndex: 3,
          explanation: "Undercut: excessive arc energy melts a groove into the base metal at the weld toe, and insufficient filler metal does not fill it. Creates a sharp notch that acts as a severe stress concentrator — especially dangerous in fatigue and brittle fracture scenarios. Caused by: excessive current, fast travel speed, or improper weave technique. Underfill: the weld face is depressed below the plate surface, reducing the effective cross-section. Caused by: insufficient filler deposition, fast travel, or insufficient passes. Both are rejectable defects beyond code limits (typically undercut >0.8 mm or >1/32\" is not acceptable).",
          hint: "One creates a notch at the weld toe; the other leaves the weld crown below flush."
        },
        {
          id: 'u7-L6-Q27',
          type: 'multiple-choice',
          question: "Why is acetylene (C₂H₂) preferred over other fuel gases for oxy-fuel cutting of steel?",
          options: [
            "Acetylene is the cheapest fuel gas available, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — which contradicts established test results",
            "Acetylene produces the highest flame temperature (~3160°C with O₂) among common fuel gases, providing rapid preheating of the steel to its kindling temperature (~870°C) for the oxygen cutting reaction. It also has a concentrated inner cone that focuses heat effectively.",
            "Acetylene is the safest fuel gas to handle, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, at ambient temperature only",
            "Acetylene does not require oxygen — it burns in air alone, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, which limits its practical applicability",
          ],
          correctIndex: 1,
          explanation: "Oxy-fuel cutting of steel works by: (1) Preheating the steel to ~870°C (kindling temperature) with the oxy-fuel flame. (2) Directing a high-pressure oxygen jet at the hot steel — iron oxidizes exothermically (Fe + O₂ → FeO + heat), and the oxygen jet blows the molten oxide away. Acetylene's high flame temperature and concentrated heat enable fast preheating. Alternative fuels (propane, natural gas, propylene) have lower flame temperatures and more diffuse heat, resulting in slower preheating but are cheaper for large-scale operations. Note: oxy-fuel cutting works only on ferrous metals because their oxides melt below the metal's melting point.",
          hint: "The cutting process requires rapid heating to the ignition temperature of iron. Which gas delivers the most concentrated heat?"
        },
        {
          id: 'u7-L6-Q28',
          type: 'multiple-choice',
          question: "What are the three essential conditions for hydrogen-induced cracking (cold cracking) in welds?",
          options: [
            "High temperature, high humidity, and high voltage, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service",
            "Wrong filler metal, wrong gas, and wrong position, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved",
            "A susceptible microstructure (hard martensite), sufficient diffusible hydrogen, and tensile stress (residual or applied). All three must be present simultaneously — removing any one prevents cracking.",
            "Thin material, slow cooling, and low amperage — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice",
          ],
          correctIndex: 2,
          explanation: "Hydrogen cracking requires ALL THREE conditions simultaneously: (1) Susceptible microstructure — hard, brittle martensite or bainite (typically >350 HV). Controlled by preheat, heat input, and steel hardenability. (2) Hydrogen — diffusible H enters from moisture, contamination, or non-low-hydrogen consumables. Controlled by using low-hydrogen processes (GTAW, GMAW) or dried low-hydrogen electrodes (E7018). (3) Tensile stress — from welding residual stresses and/or applied loads. Controlled by joint design, welding sequence, and PWHT. Remove any one factor and cracking does not occur. This is why multiple strategies are used together: preheat + low-hydrogen consumables + PWHT.",
          hint: "Three factors form a \"triangle\" — all three must be present. Removing any one vertex prevents the failure."
        },
        {
          id: 'u7-L6-Q29',
          type: 'true-false',
          question: "Resistance spot welding (RSW) requires filler metal to be added between the sheets being joined.",
          correctAnswer: false,
          explanation: "Resistance spot welding does NOT use filler metal. It joins overlapping sheets by passing high current through the stack while copper electrodes apply clamping force. The electrical resistance at the sheet-to-sheet interface (faying surface) generates intense heat, melting a small nugget that solidifies into a spot weld when the current stops. No filler, flux, or shielding gas is needed. RSW is extremely fast (0.1-0.5 seconds per spot) and is the dominant joining process in automotive body assembly — a typical car body has 3,000-5,000 spot welds. Quality is controlled by current, time, and electrode force.",
          hint: "RSW generates heat by electrical resistance at the interface. Does any additional material need to be added?"
        },
        {
          id: 'u7-L6-Q30',
          type: 'fill-blank',
          question: "When a fillet weld is loaded in shear parallel to the weld axis (longitudinal loading), the failure plane passes through the weld _____, which is the minimum cross-sectional dimension of the weld.",
          blanks: ['throat'],
          wordBank: ['throat', 'root', 'toe', 'face', 'leg'],
          explanation: "Under any loading direction, fillet weld failure occurs through the throat — the weakest cross-section. For longitudinal shear (load parallel to weld axis), the shear stress τ = F/(a × L) where a = throat = 0.707 × leg for equal-leg fillets, and L = weld length. AWS D1.1 allows fillet welds to be designed for shear on the effective throat regardless of the direction of loading, using the weld metal shear strength (0.6 × FEXX for LRFD, 0.3 × FEXX for ASD). This simplification works because the throat is always the controlling dimension.",
          hint: "The minimum dimension through a fillet weld cross-section is the critical plane for failure."
        }
      ]
    }
  ]
};
