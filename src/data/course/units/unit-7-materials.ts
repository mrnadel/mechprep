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
            'Reduction in area is always a larger number, so it looks more impressive in reports',
            'Reduction in area is less sensitive to gauge length selection and better captures the localized deformation at fracture, making it more consistent across different test setups',
            'Percent elongation includes elastic strain, which inflates the number and makes it unreliable',
            'Reduction in area directly measures the material\'s hardness, which correlates better with ductility'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 320 180" width="100%"><line x1="40" y1="155" x2="290" y2="155" stroke="#334155" stroke-width="2"/><line x1="40" y1="155" x2="40" y2="15" stroke="#334155" stroke-width="2"/><text x="165" y="175" text-anchor="middle" font-size="12" fill="#6B7280" font-family="sans-serif">Strain (&#949;)</text><text x="15" y="85" text-anchor="middle" font-size="12" fill="#6B7280" font-family="sans-serif" transform="rotate(-90,15,85)">Stress (&#963;)</text><polyline points="40,155 100,80 110,78 130,72 180,55 220,40 240,48 255,56 265,70" fill="none" stroke="#3B82F6" stroke-width="2.5"/><line x1="100" y1="80" x2="100" y2="155" stroke="#6B7280" stroke-width="1" stroke-dasharray="4"/><text x="100" y="168" text-anchor="middle" font-size="10" fill="#6B7280" font-family="sans-serif">Yield</text><circle cx="220" cy="40" r="3" fill="#EF4444"/><text x="225" y="33" font-size="10" fill="#EF4444" font-family="sans-serif">UTS</text><text x="235" y="44" font-size="9" fill="#6B7280" font-family="sans-serif">necking&#8594;</text><circle cx="265" cy="70" r="3" fill="#334155"/><text x="270" y="65" font-size="10" fill="#334155" font-family="sans-serif">Fracture</text><line x1="40" y1="80" x2="100" y2="80" stroke="#6B7280" stroke-width="1" stroke-dasharray="4"/><text x="38" y="78" text-anchor="end" font-size="10" fill="#6B7280" font-family="sans-serif">&#963;y</text></svg>',
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
            'Shore D'
          ],
          correctIndex: 2,
          explanation: 'Vickers hardness uses a diamond square pyramid indenter with a 136° included angle. It can use very low loads (microhardness: 10–1000 gf) making it ideal for thin coatings, case-hardened layers, and individual microstructural phases. Brinell uses a large ball (10 mm) and heavy loads making it unsuitable for thin layers. Rockwell is a quick production test but lacks the precision for micro-scale measurements.',
          hint: 'Think about which test can use very small loads for micro-indentation.'
        },
        {
          id: 'u7-L1-Q3',
          type: 'true-false',
          question: 'In the Charpy impact test, the ductile-to-brittle transition temperature (DBTT) is a concern primarily for BCC metals like carbon steel, not for FCC metals like austenitic stainless steel or aluminum.',
          correctAnswer: true,
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
            'Overload yielding — the pressure exceeded the yield strength at operating temperature. Next step: review pressure records for spikes.'
          ],
          correctIndex: 1,
          explanation: 'The permanent bulging under constant stress at 550°C is classic creep deformation. Creep occurs in metals above roughly 0.4 × T_melting (in Kelvin) — for steel, that is around 400°C. After 15 years, the header may be in the tertiary creep stage where deformation accelerates toward rupture. The next steps would be: measure remaining wall thickness, check for micro-cracking in the bulged region (creep voids at grain boundaries), and compare the bulge dimensions against remaining-life assessment methods like the Larson-Miller parameter. This is a real-world scenario in aging power plants.',
          hint: 'Consider which mechanism causes permanent deformation under constant load over years — not cycles — at high temperature.'
        },
        {
          id: 'u7-L1-Q5',
          type: 'multiple-choice',
          question: 'An S-N curve for a steel shows an endurance limit of 300 MPa. What does this mean in practical terms?',
          options: [
            'The material will fail after exactly 10⁶ cycles at 300 MPa',
            'Below 300 MPa cyclic stress amplitude, the material can theoretically endure infinite cycles without fatigue failure',
            'The ultimate tensile strength is 300 MPa',
            'The yield strength under cyclic loading is 300 MPa'
          ],
          correctIndex: 1,
          explanation: 'The endurance limit (or fatigue limit) is the stress amplitude below which a material can withstand theoretically infinite cycles without fatigue failure. This is a characteristic of ferrous metals and titanium — most non-ferrous metals (aluminum, copper) do not exhibit a true endurance limit and will eventually fail at any stress. For steel, the endurance limit is typically 0.4–0.5 × UTS for polished, unnotched specimens.',
          hint: 'The endurance limit is the horizontal asymptote on the S-N curve.'
        },
        {
          id: 'u7-L1-Q6',
          type: 'fill-blank',
          question: 'A shaft broke unexpectedly in service. The fracture surface shows smooth, curved "beach marks" radiating from an origin point, with a small rough area of final fracture. This pattern is characteristic of ___ failure.',
          acceptedAnswers: ['fatigue', 'Fatigue', 'fatigue crack', 'cyclic'],
          diagram: '<svg viewBox="0 0 320 180" width="100%"><circle cx="160" cy="90" r="75" fill="#E2E8F0" stroke="#334155" stroke-width="2"/><circle cx="160" cy="90" r="74" fill="#D1D5DB"/><circle cx="105" cy="55" r="3" fill="#EF4444"/><text x="80" y="45" font-size="10" fill="#EF4444" font-family="sans-serif">Origin</text><path d="M 115,68 Q 140,85 115,108" fill="none" stroke="#6B7280" stroke-width="1"/><path d="M 125,60 Q 155,85 125,116" fill="none" stroke="#6B7280" stroke-width="1"/><path d="M 138,52 Q 172,88 138,126" fill="none" stroke="#6B7280" stroke-width="1"/><path d="M 155,48 Q 192,90 155,132" fill="none" stroke="#6B7280" stroke-width="1"/><text x="132" y="92" font-size="9" fill="#6B7280" font-family="sans-serif">beach</text><text x="132" y="102" font-size="9" fill="#6B7280" font-family="sans-serif">marks</text><path d="M 175,50 Q 210,90 175,130" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="3"/><rect x="195" y="60" width="38" height="58" fill="#94A3B8" rx="2"/><text x="214" y="93" text-anchor="middle" font-size="8" fill="#1E293B" font-family="sans-serif">Final</text><text x="214" y="103" text-anchor="middle" font-size="8" fill="#1E293B" font-family="sans-serif">fracture</text><text x="260" y="50" font-size="10" fill="#1E293B" font-family="sans-serif">Smooth =</text><text x="260" y="62" font-size="10" fill="#1E293B" font-family="sans-serif">slow crack</text><text x="260" y="120" font-size="10" fill="#1E293B" font-family="sans-serif">Rough =</text><text x="260" y="132" font-size="10" fill="#1E293B" font-family="sans-serif">fast fracture</text></svg>',
          explanation: 'Beach marks (also called clamshell marks or arrest lines) are the hallmark of fatigue failure. They represent the position of the crack front at different stages of growth, caused by variations in loading or environmental conditions. The crack initiates at a stress concentration (notch, keyway, surface defect), propagates slowly through most of the cross-section (smooth region), and final fracture occurs suddenly when the remaining cross-section can no longer carry the load (rough area). Identifying this pattern is critical in failure analysis — it tells you the failure was caused by cyclic loading, not a single overload event.',
          hint: 'The smooth, progressively spreading region with curved markings and a small rough final fracture zone is a textbook signature of which failure mode?'
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
            'FCC has larger atoms that can bond with more carbon atoms chemically',
            'FCC has larger octahedral interstitial sites that accommodate carbon atoms with less lattice distortion, despite having fewer total interstitial sites than BCC',
            'BCC is a more tightly packed structure with no interstitial sites at all, so carbon cannot physically fit',
            'FCC is a higher-temperature phase with weaker bonds, allowing carbon atoms to push iron atoms apart more easily'
          ],
          correctIndex: 1,
          explanation: 'FCC iron has larger octahedral interstitial sites (radius ratio ~0.41R) compared to BCC (largest octahedral sites ~0.15R). Although BCC actually has more total interstitial sites, they are all smaller and highly asymmetric. Carbon atoms (radius ~0.77 Å) fit into FCC sites with moderate distortion but cause severe asymmetric distortion in BCC. This is why austenite can dissolve up to 2.14 wt% C while ferrite can only manage 0.022 wt% C. This difference in solubility is the entire basis for heat treatment of steel — when austenite is cooled, the excess carbon must be rejected, forming cementite, or becoming trapped (martensite).',
          hint: 'Think about the interstitial site sizes in FCC vs. BCC crystal structures, not just the packing factor.'
        },
        {
          id: 'u7-L2-Q2',
          type: 'multiple-choice',
          question: 'A 1045 steel (0.45% C) is heated to 850°C, quenched in water, then tempered at 400°C. What is the primary purpose of the tempering step?',
          options: [
            'To dissolve all cementite into austenite',
            'To transform retained austenite to martensite',
            'To reduce brittleness of martensite by allowing controlled precipitation of carbides while maintaining adequate hardness',
            'To increase hardness beyond what quenching achieved'
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
          diagram: '<svg viewBox="0 0 320 180" width="100%"><line x1="40" y1="160" x2="290" y2="160" stroke="#334155" stroke-width="2"/><line x1="40" y1="160" x2="40" y2="10" stroke="#334155" stroke-width="2"/><text x="165" y="178" text-anchor="middle" font-size="11" fill="#6B7280" font-family="sans-serif">wt% Carbon</text><text x="12" y="90" text-anchor="middle" font-size="11" fill="#6B7280" font-family="sans-serif" transform="rotate(-90,12,90)">Temp (&#176;C)</text><text x="40" y="172" font-size="9" fill="#6B7280" font-family="sans-serif">0</text><text x="110" y="172" font-size="9" fill="#6B7280" font-family="sans-serif">0.8</text><text x="195" y="172" font-size="9" fill="#6B7280" font-family="sans-serif">2.14</text><text x="270" y="172" font-size="9" fill="#6B7280" font-family="sans-serif">6.67</text><text x="22" y="30" font-size="9" fill="#6B7280" font-family="sans-serif">1538</text><text x="22" y="55" font-size="9" fill="#6B7280" font-family="sans-serif">1147</text><text x="22" y="115" font-size="9" fill="#6B7280" font-family="sans-serif">727</text><polyline points="40,25 80,45 200,50 280,55" fill="none" stroke="#334155" stroke-width="1.5"/><polyline points="40,35 110,50 200,50" fill="none" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="112" x2="200" y2="50" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="112" x2="110" y2="112" stroke="#334155" stroke-width="1.5"/><line x1="110" y1="112" x2="280" y2="112" stroke="#334155" stroke-width="1.5"/><line x1="200" y1="50" x2="280" y2="112" stroke="#334155" stroke-width="1.5"/><circle cx="110" cy="112" r="4" fill="#EF4444"/><text x="102" y="106" font-size="10" fill="#EF4444" font-family="sans-serif">Eutectoid</text><text x="70" y="85" font-size="11" fill="#3B82F6" font-family="sans-serif">&#947;</text><text x="55" y="140" font-size="10" fill="#1E293B" font-family="sans-serif">&#945;+Fe&#8323;C</text><text x="200" y="85" font-size="10" fill="#1E293B" font-family="sans-serif">&#947;+Fe&#8323;C</text><circle cx="200" cy="50" r="4" fill="#F97316"/><text x="205" y="44" font-size="9" fill="#F97316" font-family="sans-serif">Eutectic</text></svg>',
          explanation: 'At 0.8 wt% C and 727°C, the eutectoid reaction occurs: austenite → ferrite + cementite (Fe₃C). The resulting lamellar microstructure is called pearlite due to its pearl-like appearance under the microscope. Finer pearlite (faster cooling) is harder than coarse pearlite. Steels with less than 0.8% C are hypoeutectoid (proeutectoid ferrite + pearlite), and those with more are hypereutectoid (proeutectoid cementite + pearlite).',
          hint: 'The eutectoid point is where austenite transforms directly into two phases simultaneously.'
        },
        {
          id: 'u7-L2-Q4',
          type: 'multiple-choice',
          question: 'A machinist quenched a 1045 steel part in water and achieved full hardness, but when the same procedure was used on a larger part of the same steel, the core remained soft. What is the metallurgical explanation and how would you solve this problem?',
          options: [
            'The larger part has more carbon at the surface than the core. Solution: use a higher-carbon steel for the larger part.',
            'The larger part\'s core could not cool fast enough to bypass the TTT nose, so it transformed to softer pearlite instead of martensite. Solution: use an alloy steel with better hardenability or a more aggressive quenchant.',
            'Water quenching only works for small parts. Solution: switch to oil quenching for better penetration of cooling into the core.',
            'The furnace could not heat the larger part uniformly, so the core was never fully austenitized. Solution: increase soak time at temperature.'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 320 180" width="100%"><line x1="50" y1="160" x2="300" y2="160" stroke="#334155" stroke-width="2"/><line x1="50" y1="160" x2="50" y2="10" stroke="#334155" stroke-width="2"/><text x="175" y="178" text-anchor="middle" font-size="11" fill="#6B7280" font-family="sans-serif">log(Time)</text><text x="15" y="90" text-anchor="middle" font-size="11" fill="#6B7280" font-family="sans-serif" transform="rotate(-90,15,90)">Temp</text><path d="M 100,25 Q 80,80 120,100 Q 160,120 140,155" fill="none" stroke="#334155" stroke-width="2"/><path d="M 150,25 Q 120,80 160,100 Q 200,120 180,155" fill="none" stroke="#334155" stroke-width="2"/><text x="155" y="85" font-size="10" fill="#1E293B" font-family="sans-serif">Nose</text><line x1="50" y1="30" x2="80" y2="60" stroke="#3B82F6" stroke-width="2" stroke-dasharray="5"/><text x="55" y="25" font-size="10" fill="#3B82F6" font-family="sans-serif">Fast cool</text><text x="55" y="52" font-size="9" fill="#3B82F6" font-family="sans-serif">&#8594; Martensite</text><path d="M 50,30 Q 100,70 170,100 Q 210,120 250,155" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="5"/><text x="195" y="100" font-size="10" fill="#EF4444" font-family="sans-serif">Slow cool</text><text x="195" y="112" font-size="9" fill="#EF4444" font-family="sans-serif">&#8594; Pearlite</text><text x="220" y="30" font-size="10" fill="#1E293B" font-family="sans-serif">TTT Diagram</text><text x="220" y="44" font-size="9" fill="#6B7280" font-family="sans-serif">Must miss the</text><text x="220" y="56" font-size="9" fill="#6B7280" font-family="sans-serif">nose for martensite</text></svg>',
          explanation: 'This is a classic hardenability problem. The core of a large part cools more slowly than the surface. If the cooling rate at the core is slower than the critical cooling rate (the rate needed to bypass the nose of the TTT diagram), the austenite transforms into pearlite or bainite instead of martensite. The solution is to increase hardenability by adding alloying elements (Cr, Mo, Ni, Mn) that shift the TTT nose to the right, giving the core more time to cool before transformation begins. This is exactly what alloy steels like 4140 or 4340 are designed for. A Jominy end-quench test directly measures this property.',
          hint: 'Think about what the TTT diagram tells you about cooling rate vs. transformation. What happens when the core cools too slowly?'
        },
        {
          id: 'u7-L2-Q5',
          type: 'multiple-choice',
          question: 'A welded structural frame made of 1020 steel has uneven grain structure and residual stresses from welding. The engineer wants to refine the microstructure and relieve stresses, but full annealing takes too long. What heat treatment would you recommend and why?',
          options: [
            'Quench and temper — fastest way to refine the grain and relieve stress simultaneously',
            'Normalizing — heat above the upper critical temperature and air cool. Faster than annealing, refines grains, and relieves most residual stresses.',
            'Stress relieving at 600°C — this will both relieve stress and refine the grain structure through recrystallization',
            'Process annealing at 550°C — suitable for low-carbon steel and will recrystallize the grains without requiring high temperatures'
          ],
          correctIndex: 1,
          explanation: 'Normalizing (heating to 50-80°C above Ac₃ followed by air cooling) is the right choice here. It fully austenitizes the steel, allowing new, refined grains to form on cooling, and the high temperature relieves residual stresses from welding. Air cooling is much faster than furnace cooling (full annealing), making it more economical. Quenching is inappropriate for a structural frame — it would introduce martensite and new residual stresses. Stress relieving alone (sub-critical) would relieve stresses but would not refine the grain structure. Process annealing only recrystallizes cold-worked ferrite and does not refine the grain through phase transformation.',
          hint: 'You need a process that both refines grain structure (requires going above the critical temperature) and is faster than furnace cooling.'
        },
        {
          id: 'u7-L2-Q6',
          type: 'fill-blank',
          question: 'When tempering a quenched steel at progressively higher temperatures, toughness increases but hardness decreases. However, there is a range around 250-350°C that should be avoided for certain alloy steels because it causes a phenomenon called temper ___.',
          acceptedAnswers: ['embrittlement', 'Embrittlement', 'brittleness', 'Brittleness'],
          explanation: 'Temper embrittlement is a loss of toughness (with no corresponding change in hardness) that occurs when certain steels are tempered in the 250-350°C range (Type I / TME) or slowly cooled through 375-575°C (Type II). It is caused by the segregation of impurity elements (P, Sn, Sb, As) to prior austenite grain boundaries, weakening them. This is a critical practical consideration — heat treaters must either avoid these temperature ranges or cool quickly through them. Adding Mo to steel (e.g., 4140 vs 4130) significantly reduces susceptibility.',
          hint: 'This phenomenon makes the steel less tough despite adequate hardness, and is linked to specific tempering temperature ranges.'
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
            'Nylon 66 (glass-filled) — injection molding: lightest option, lowest per-part cost, but insufficient strength and temperature rating'
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
            'Hydrogen cracking — moisture in the weld caused hydrogen embrittlement along grain boundaries. Caused by poor electrode storage.',
            'Lamellar tearing — the through-thickness (Z-direction) ductility of the plate is very low due to flattened inclusions from rolling, and welding shrinkage stresses pulled the layers apart.',
            'Solidification cracking — the weld metal shrank during cooling and tore apart at the fusion line. Caused by high restraint.',
            'Stress corrosion cracking — residual stresses from welding combined with a corrosive environment. Caused by the service environment.'
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
          diagram: '<svg viewBox="0 0 320 180" width="100%"><rect x="20" y="60" width="280" height="100" fill="#E2E8F0" stroke="#334155" stroke-width="2" rx="2"/><text x="160" y="170" text-anchor="middle" font-size="10" fill="#6B7280" font-family="sans-serif">Sand Mold</text><rect x="60" y="90" width="120" height="50" fill="#FBBF24" stroke="#334155" stroke-width="2" rx="1"/><text x="120" y="120" text-anchor="middle" font-size="11" fill="#1E293B" font-family="sans-serif">Casting</text><rect x="200" y="70" width="40" height="70" fill="#FB923C" stroke="#334155" stroke-width="2" rx="1"/><text x="220" y="110" text-anchor="middle" font-size="10" fill="#1E293B" font-family="sans-serif" transform="rotate(-90,220,110)">Riser</text><rect x="140" y="60" width="20" height="30" fill="#FBBF24" stroke="#334155" stroke-width="2"/><text x="150" y="55" text-anchor="middle" font-size="9" fill="#6B7280" font-family="sans-serif">Sprue</text><rect x="160" y="85" width="40" height="10" fill="#FBBF24" stroke="#334155" stroke-width="1.5"/><text x="180" y="82" text-anchor="middle" font-size="9" fill="#6B7280" font-family="sans-serif">Runner</text><line x1="220" y1="65" x2="220" y2="45" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3"/><text x="220" y="40" text-anchor="middle" font-size="9" fill="#EF4444" font-family="sans-serif">Solidifies LAST</text><line x1="120" y1="145" x2="120" y2="155" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3"/><text x="120" y="165" text-anchor="middle" font-size="9" fill="#EF4444" font-family="sans-serif" opacity="0">.</text></svg>',
          explanation: 'A riser must solidify AFTER the casting section it feeds — it acts as a reservoir of liquid metal to compensate for solidification shrinkage. If the riser freezes first, it cannot supply metal to the casting, resulting in shrinkage porosity. Risers are designed using Chvorinov\'s rule: solidification time ∝ (Volume/Surface Area)². A riser must have a larger V/A ratio than the casting section to solidify last.',
          hint: 'Think about the function of a riser — it must feed liquid metal to the casting as it shrinks during solidification.'
        },
        {
          id: 'u7-L3-Q4',
          type: 'multiple-choice',
          question: 'What is the primary advantage of closed-die forging over open-die forging?',
          options: [
            'Lower tooling cost and faster setup',
            'Better grain flow, tighter tolerances, and improved mechanical properties with near-net shape capability',
            'Ability to produce much larger parts',
            'No flash is generated, reducing material waste'
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
            'Neither — at 500 units/year with these requirements, CNC machining from billet is always cheaper than any casting process',
            'Sand casting with machining — cast oversized with sand casting\'s looser tolerances, then machine to final dimensions to get the best cost'
          ],
          correctIndex: 1,
          explanation: 'Investment (lost-wax) casting is the right process here. Sand casting cannot reliably produce 3 mm walls (minimum is typically 5-6 mm for iron, 3-4 mm for aluminum with best practice), and its tolerances (±1-2 mm) are well outside the ±0.2 mm requirement. Investment casting routinely achieves 1.5-3 mm walls, ±0.1-0.3 mm tolerances, and excellent surface finish (3-6 μm Ra). The tooling cost ($2k-$10k for wax injection dies) is higher than sand patterns, and per-part cost is higher, but at 500/year you avoid extensive secondary machining and scrap from sand casting\'s inability to meet the specifications. CNC machining from billet would waste excessive material and cannot produce internal passages easily.',
          hint: 'Compare each process\'s capabilities against the three key requirements: thin walls, internal passages, and tight tolerances.'
        },
        {
          id: 'u7-L3-Q6',
          type: 'fill-blank',
          question: 'In sand casting design, vertical surfaces on the pattern must have a slight taper (typically 1-3°) to allow the pattern to be withdrawn from the sand mold without damaging the cavity. This taper is called the ___ angle.',
          acceptedAnswers: ['draft', 'Draft', 'taper', 'Taper', 'draw'],
          diagram: '<svg viewBox="0 0 320 180" width="100%"><defs><marker id="ah6" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#EF4444"/></marker></defs><rect x="40" y="80" width="240" height="80" fill="#FBBF24" stroke="#334155" stroke-width="2" opacity="0.3"/><text x="160" y="170" text-anchor="middle" font-size="10" fill="#6B7280" font-family="sans-serif">Sand Mold</text><polygon points="100,80 110,30 190,30 200,80" fill="#E2E8F0" stroke="#334155" stroke-width="2"/><text x="150" y="60" text-anchor="middle" font-size="11" fill="#1E293B" font-family="sans-serif">Pattern</text><line x1="150" y1="25" x2="150" y2="8" stroke="#EF4444" stroke-width="2" marker-end="url(#ah6)"/><text x="155" y="12" font-size="10" fill="#EF4444" font-family="sans-serif">Pull direction</text><line x1="100" y1="80" x2="100" y2="30" stroke="#6B7280" stroke-width="1" stroke-dasharray="4"/><path d="M 104,50 A 20 20 0 0 1 110,48" fill="none" stroke="#3B82F6" stroke-width="1.5"/><text x="75" y="50" text-anchor="end" font-size="10" fill="#3B82F6" font-family="sans-serif">Draft</text><text x="75" y="62" text-anchor="end" font-size="10" fill="#3B82F6" font-family="sans-serif">1-3&#176;</text></svg>',
          explanation: 'Draft angles are essential for pattern withdrawal from the sand mold. Without draft, the pattern would drag against the mold walls during removal, collapsing the cavity. Typical values are 1-3° for external surfaces and 2-5° for internal surfaces (which grip the pattern more tightly). This same principle applies to injection molding and die casting. Designers must account for draft in the part geometry — zero-draft designs require special (and expensive) tooling solutions.',
          hint: 'This taper prevents the mold cavity from being damaged when the pattern is pulled straight up out of the sand.'
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
            'Nothing changes — cutting speed is independent of diameter as long as feed rate is constant.'
          ],
          correctIndex: 1,
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
            'Slot milling with full engagement'
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
            'The coolant has become diluted over time, reducing its lubricating and cooling effectiveness. Check coolant concentration with a refractometer.'
          ],
          correctIndex: 2,
          explanation: 'When everything seems the same but tool life drops, the most common culprit is a material batch change. Different heats of the same grade can vary significantly in hardness (±10-15%), microstructure (coarser vs. finer grain), and inclusion content — all of which affect machinability. A harder heat lot can reduce tool life by 50% or more. The troubleshooting approach: (1) check the mill cert for the new material batch — compare hardness and chemistry, (2) measure actual hardness of the workpiece, (3) if harder, reduce cutting speed (speed has the most impact on tool life per Taylor\'s equation), (4) check coolant concentration, and (5) inspect spindle runout. Carbide inserts do not degrade in storage — they are chemically stable ceramics.',
          hint: 'The key phrase is "unchanged" — but is the incoming material truly identical to the last batch? What varies between material heats?'
        },
        {
          id: 'u7-L4-Q5',
          type: 'multiple-choice',
          question: 'A manufacturing engineer needs to reduce cycle time on a turning operation. They can either increase cutting speed by 30% or increase feed rate by 30%. Both reduce cycle time similarly. Based on Taylor\'s tool life equation, which approach preserves tool life better and why?',
          options: [
            'Increasing speed is better — higher speed produces thinner chips that generate less cutting force, protecting the tool',
            'Both affect tool life equally — the material removal rate increase is the same in either case',
            'Increasing feed rate is better — Taylor\'s equation shows tool life is extremely sensitive to cutting speed (exponent 1/n ≈ 4 for carbide), while feed rate has a much weaker effect on tool life',
            'Increasing feed rate is worse — thicker chips cause higher impact loads that fracture the cutting edge'
          ],
          correctIndex: 2,
          explanation: 'Taylor\'s equation VT^n = C shows that tool life is extraordinarily sensitive to cutting speed. For carbide tools (n ≈ 0.25), the sensitivity exponent is 1/n = 4, meaning a 30% speed increase reduces tool life by a factor of (1/1.3)^4 ≈ 0.35 — a 65% reduction. Feed rate also affects tool life, but with a weaker exponent (typically 0.5-0.7 power). So a 30% feed increase might reduce tool life by only 15-20%. This is why experienced machinists say "maximize feed, then adjust speed" — you get productivity gains with much less tool life penalty. Of course, higher feed increases surface roughness (Ra ≈ f²/32r), so the surface finish requirement sets the practical upper limit.',
          hint: 'Compare the exponents: speed enters Taylor\'s equation with exponent 1/n (very large), while feed rate has a much weaker effect on tool wear.'
        },
        {
          id: 'u7-L4-Q6',
          type: 'fill-blank',
          question: 'The theoretical surface roughness in turning is primarily controlled by the feed rate (f) and the tool ___ radius.',
          acceptedAnswers: ['nose', 'Nose', 'tip', 'Tip', 'corner', 'Corner'],
          explanation: 'The theoretical arithmetic average roughness in turning is approximately Ra ≈ f²/(32 × r), where f is the feed per revolution and r is the tool nose radius. A larger nose radius or smaller feed produces a better finish. This is why finishing passes use small feeds (0.05–0.15 mm/rev) and tools with large nose radii (0.8–1.6 mm). In practice, actual roughness is affected by BUE, vibration, and material properties.',
          hint: 'The formula is Ra ≈ f²/(32r). What is r?'
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
            'Only the material savings — 90% waste means additive is automatically cheaper regardless of other factors',
            'Material savings, build time, post-processing needs (heat treatment, support removal, surface finishing), mechanical property differences (anisotropy, residual stress), certification requirements, and whether topology optimization can further reduce weight',
            'Just compare the per-part cost of printing vs. machining — whichever is lower wins, and certification is handled separately',
            'Additive is always justified for aerospace titanium because the material is expensive, so any waste reduction is worth any build cost'
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
            'To reduce the overall part weight',
            'To prevent weld lines from forming'
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
            'The design is fine for injection molding — ABS flows well and can fill thin features without issues',
            'Only the wall thickness needs to change — 3 mm is too thin for injection molding, recommend 5 mm minimum',
            'Replace sharp internal corners with radii (≥0.5 mm) to prevent stress concentration and improve flow; the deep narrow slot (15:1 aspect ratio) will be difficult to fill and eject — redesign as an assembly or use a side-action/EDM-cut feature in the mold',
            'The whole part should be 3D printed instead — injection molding cannot produce slots or sharp features'
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
            'Accept the tolerance — the designer must have a reason, and questioning it could delay the project',
            'Override the designer and change it yourself to ±0.1 mm — manufacturing should have final say on tolerances',
            'Ask the designer what function drives this tolerance. If it\'s non-critical (clearance bore, no press fit, no sealing surface), propose relaxing to ±0.05 mm (achievable by boring) and show the cost savings. Document the rationale.',
            'Escalate to management — tolerance disputes should be resolved at a higher level to avoid conflict'
          ],
          correctIndex: 2,
          explanation: 'This is a common DFM scenario. Many tight tolerances result from over-specification rather than functional need — the designer may have defaulted to a tight tolerance "just to be safe." The engineering approach is collaborative: ask what function or fit drives the requirement (press fit? bearing bore? sealing surface?). If it is a clearance bore with no fit requirement, ±0.05 mm (boring) or even ±0.1 mm (standard machining) may be perfectly adequate. Show the cost difference: ±0.01 mm requires grinding ($15/part), ±0.05 mm needs boring ($3/part), ±0.1 mm is standard turning ($0.50/part). At 10,000 parts/year, that is $145k vs. $5k. Always document the agreed tolerance and its rationale so it is not tightened again later.',
          hint: 'The best approach combines technical inquiry (what function requires this tolerance?) with quantified cost impact.'
        },
        {
          id: 'u7-L5-Q6',
          type: 'fill-blank',
          question: 'In injection molding, uneven wall thickness causes one side to cool and shrink faster than the other, pulling the part surface inward and creating a cosmetic defect called a ___ mark.',
          acceptedAnswers: ['sink', 'Sink', 'shrink', 'Shrink'],
          explanation: 'Sink marks are depressions on the surface of injection-molded parts caused by differential shrinkage. Thick sections cool more slowly than thin sections, and as the interior solidifies and shrinks, it pulls the already-solidified outer skin inward. They are especially common opposite ribs and bosses. Design rules to prevent sink marks: keep wall thickness uniform, limit rib thickness to 50-60% of the adjacent wall, and core out thick sections. If thick sections are unavoidable, gas-assist injection molding can hollow out the interior to prevent sinking.',
          hint: 'This common injection molding defect appears as a depression on the surface, typically opposite thick features like ribs or bosses.'
        }
      ]
    },
    {
      id: 'u7-L6',
      title: 'Welding & Joining',
      description: 'Welding processes (MIG/MAG, TIG, stick, laser), HAZ metallurgy, weld defects, joint design, fillet weld sizing, weldability, residual stresses and distortion control.',
      icon: '\u26A1',
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
            'SAW (submerged arc) — highest deposition rate but limited to flat/horizontal positions and overkill for 6 mm plate'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 320 180" width="100%"><rect x="20" y="100" width="120" height="50" fill="#CBD5E1" stroke="#334155" stroke-width="2"/><rect x="180" y="100" width="120" height="50" fill="#CBD5E1" stroke="#334155" stroke-width="2"/><text x="80" y="130" text-anchor="middle" font-size="11" fill="#1E293B" font-family="sans-serif">Base Metal</text><text x="240" y="130" text-anchor="middle" font-size="11" fill="#1E293B" font-family="sans-serif">Base Metal</text><path d="M 120,150 Q 160,80 200,150" fill="#3B82F6" stroke="#334155" stroke-width="2"/><text x="160" y="138" text-anchor="middle" font-size="10" fill="white" font-family="sans-serif">Weld</text><path d="M 105,100 Q 110,75 120,100" fill="none" stroke="#F97316" stroke-width="3" opacity="0.5"/><path d="M 200,100 Q 210,75 220,100" fill="none" stroke="#F97316" stroke-width="3" opacity="0.5"/><rect x="96" y="100" width="24" height="50" fill="#F97316" opacity="0.2"/><rect x="200" y="100" width="24" height="50" fill="#F97316" opacity="0.2"/><text x="108" y="95" text-anchor="middle" font-size="9" fill="#F97316" font-family="sans-serif">HAZ</text><text x="212" y="95" text-anchor="middle" font-size="9" fill="#F97316" font-family="sans-serif">HAZ</text><line x1="160" y1="70" x2="160" y2="50" stroke="#EF4444" stroke-width="2"/><polygon points="155,70 165,70 160,78" fill="#EF4444"/><text x="160" y="45" text-anchor="middle" font-size="10" fill="#EF4444" font-family="sans-serif">TIG torch</text><text x="160" y="20" text-anchor="middle" font-size="10" fill="#6B7280" font-family="sans-serif">Butt Weld Cross-Section</text></svg>',
          explanation: 'GTAW (TIG) is the preferred process for stainless steel food-processing equipment because: (1) pure argon shielding prevents oxidation and carbon pickup that would degrade corrosion resistance, (2) precise heat control minimizes the HAZ and reduces sensitization (chromium carbide precipitation at grain boundaries in the 450-850\u00B0C range), (3) no flux or spatter means the weld zone can meet sanitary finish requirements with minimal post-weld cleanup, and (4) ER308L filler (low carbon) further resists sensitization. SMAW produces acceptable structural welds but leaves slag and spatter. GMAW with CO\u2082 is unsuitable for stainless steel — use Ar/He mixtures instead. SAW is efficient for thick plate but impractical for 6 mm panels.',
          hint: 'Consider which process gives the cleanest weld with the least contamination for corrosion-sensitive material.'
        },
        {
          id: 'u7-L6-Q2',
          type: 'multiple-choice',
          question: 'A welder is about to join two plates of AISI 4140 steel (0.40% C, Cr-Mo alloy). You calculate the carbon equivalent (CE) at 0.72. What precautions must be taken before, during, and after welding, and why?',
          options: [
            'No special precautions — 4140 is a common structural steel that welds easily with any process',
            'Preheat to 200-300°C to slow HAZ cooling and prevent martensite/cracking, use low-hydrogen electrodes/process, control interpass temperature, and perform PWHT to temper the hard HAZ',
            'Use very high heat input to melt as much material as possible — the large weld pool will slow cooling enough to prevent cracking',
            'Weld at room temperature but use austenitic stainless filler wire — the ductile weld metal will absorb all shrinkage stresses'
          ],
          correctIndex: 1,
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
            'Hot cracking — caused by high sulfur or phosphorus content in the base metal'
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
            '3 mm',
            '4 mm',
            '5 mm',
            '3 mm by calculation, but minimum code size of 5 mm governs for typical plate thickness'
          ],
          correctIndex: 3,
          diagram: '<svg viewBox="0 0 320 180" width="100%"><rect x="30" y="80" width="200" height="70" fill="#CBD5E1" stroke="#334155" stroke-width="2"/><rect x="130" y="20" width="70" height="60" fill="#CBD5E1" stroke="#334155" stroke-width="2"/><polygon points="130,80 130,40 170,80" fill="#3B82F6" stroke="#334155" stroke-width="1.5"/><text x="140" y="72" font-size="9" fill="white" font-family="sans-serif">Weld</text><line x1="130" y1="80" x2="130" y2="40" stroke="#6B7280" stroke-width="1" stroke-dasharray="4"/><text x="118" y="62" text-anchor="end" font-size="10" fill="#6B7280" font-family="sans-serif">w (leg)</text><line x1="130" y1="80" x2="170" y2="80" stroke="#6B7280" stroke-width="1" stroke-dasharray="4"/><text x="150" y="93" text-anchor="middle" font-size="10" fill="#6B7280" font-family="sans-serif">w (leg)</text><line x1="130" y1="80" x2="150" y2="60" stroke="#EF4444" stroke-width="2"/><text x="152" y="56" font-size="10" fill="#EF4444" font-family="sans-serif">a = throat</text><text x="152" y="68" font-size="9" fill="#EF4444" font-family="sans-serif">= 0.707w</text><defs><marker id="ahw" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#EF4444"/></marker></defs><line x1="245" y1="115" x2="290" y2="115" stroke="#EF4444" stroke-width="2" marker-end="url(#ahw)"/><text x="267" y="110" text-anchor="middle" font-size="10" fill="#EF4444" font-family="sans-serif">F (shear)</text><text x="230" y="15" font-size="10" fill="#1E293B" font-family="sans-serif">Fillet Weld</text><text x="230" y="28" font-size="10" fill="#1E293B" font-family="sans-serif">Cross-Section</text></svg>',
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
          question: 'You need to join an aluminum bracket to a steel frame. Fusion welding is not feasible because of brittle intermetallic compounds forming at the interface. The most practical mechanical joining method for this dissimilar-metal joint in a production environment is ___ fastening (using bolts or rivets with insulating bushings to prevent galvanic corrosion).',
          acceptedAnswers: ['mechanical', 'Mechanical', 'bolted', 'Bolted', 'riveted', 'Riveted', 'fastened'],
          explanation: 'Joining aluminum to steel is a classic dissimilar-metal problem. Fusion welding creates brittle Fe-Al intermetallics that crack easily. Friction stir welding can work but requires specialized equipment. Adhesive bonding is an option but has peel strength concerns. In practice, mechanical fastening (bolts, rivets, or clinching) is most common because it is well-understood, inspectable, and allows for thermal expansion differences. The critical consideration is galvanic corrosion — aluminum (anodic) will corrode preferentially when in contact with steel (cathodic) in the presence of an electrolyte. Insulating bushings, coatings, or sealants must separate the metals. Stainless steel fasteners in aluminum require the same galvanic isolation.',
          hint: 'Fusion welding creates brittle intermetallics. What is the most straightforward alternative joining method for production, keeping galvanic corrosion in mind?'
        }
      ]
    }
  ]
};
