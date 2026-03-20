import type { Unit } from '../types';

export const unit8: Unit = {
  id: 'u8-machine',
  title: 'Machine Design',
  description: 'Shafts, bearings, gears, fasteners, springs, and seals — core machine element design for mechanical engineers.',
  color: '#6366F1',
  icon: '⚙️',
  lessons: [
    {
      id: 'u8-L1',
      title: 'Shafts & Keys',
      description: 'Shaft design for bending+torsion, keyway stress concentration, ASME shaft code, critical speed, whirling.',
      icon: '🔑',
      xpReward: 25,
      questions: [
        {
          id: 'u8-L1-Q1',
          type: 'multiple-choice',
          question: 'A shaft is subjected to a bending moment of 500 N·m and a torque of 800 N·m simultaneously. Using the maximum shear stress theory (Tresca), what is the equivalent torque (T_eq)?',
          options: [
            '800 N·m',
            '943 N·m',
            '1300 N·m',
            '1100 N·m'
          ],
          correctIndex: 1,
          explanation: 'The equivalent torque is T_eq = √(M² + T²) = √(500² + 800²) = √(250000 + 640000) = √890000 = 943 N·m. This combines bending and torsion into a single equivalent loading for shaft sizing using the maximum shear stress theory. The required shaft diameter is then d = (16T_eq/(πτ_allow))^(1/3). For the distortion energy theory, T_eq = √(M² + 0.75T²).',
          hint: 'For Tresca criterion applied to shafts: T_eq = √(M² + T²).'
        },
        {
          id: 'u8-L1-Q2',
          type: 'multiple-choice',
          question: 'A keyway in a shaft typically reduces the shaft\'s fatigue strength by approximately:',
          options: [
            '5–10%',
            '15–25%',
            '25–50%',
            '50–75%'
          ],
          correctIndex: 2,
          explanation: 'A standard profile keyway introduces a stress concentration factor (Kt) of approximately 2.0–3.0, reducing fatigue strength by 25–50% depending on the keyway geometry (sled-runner end vs. profile end) and surface finish. Profile keyways with sharp bottom corners are worse than sled-runner types. This is why shaft diameters at keyway locations must be oversized compared to plain sections, and why spline connections are preferred for high-fatigue applications — they distribute load more uniformly.',
          hint: 'Consider the stress concentration factor introduced by the keyway geometry.'
        },
        {
          id: 'u8-L1-Q3',
          type: 'true-false',
          question: 'A shaft operating above its first critical speed (supercritical operation) will always experience dangerous vibrations and should be avoided in all engineering applications.',
          correctAnswer: false,
          explanation: 'Supercritical shaft operation is routine in many applications — turbomachinery, centrifugal separators, and dental drills operate above the first critical speed. The shaft passes through the critical speed during startup/shutdown, where vibrations peak, but at steady-state supercritical speeds the shaft self-centers (the center of mass moves inward). The key is passing through the critical speed quickly and having adequate damping. Many modern designs intentionally operate between the first and second critical speeds.',
          hint: 'Consider what happens to shaft deflection as speed continues to increase past the critical speed.'
        },
        {
          id: 'u8-L1-Q4',
          type: 'multiple-choice',
          question: 'According to the ASME shaft design code (for commercial steel shafts with keyway), what combined shock and fatigue factors are typically applied to a shaft with gradually applied load and no shock?',
          options: [
            'K_b = 1.0, K_t = 1.0',
            'K_b = 1.5, K_t = 1.0',
            'K_b = 1.5, K_t = 1.5',
            'K_b = 2.0, K_t = 2.0'
          ],
          correctIndex: 1,
          explanation: 'For gradually applied loads with no shock: K_b = 1.5 (bending factor) and K_t = 1.0 (torsion factor). For suddenly applied loads with minor shock: K_b = 1.5–2.0, K_t = 1.0–1.5. For heavy shock: K_b = 2.0–3.0, K_t = 1.5–3.0. The ASME code uses these factors in d³ = (16/πτ_allow) × √((K_b × M)² + (K_t × T)²). The bending factor is higher than torsion because bending creates fully reversed stress in a rotating shaft.',
          hint: 'The ASME code uses K_b for bending and K_t for torsion. Bending is more severe in rotating shafts.'
        },
        {
          id: 'u8-L1-Q5',
          type: 'multiple-choice',
          question: 'The first critical speed of a simply supported shaft with a single central disk of mass m can be estimated by which formula?',
          options: [
            'ω_cr = √(k/m) where k is the shaft bending stiffness at the disk location',
            'ω_cr = √(48EI/(mL³)) for a central load on a simply supported beam',
            'Both A and B are correct and equivalent',
            'ω_cr = π²√(EI/(ρAL⁴))'
          ],
          correctIndex: 2,
          explanation: 'Both expressions are equivalent. The shaft acts as a spring with stiffness k = 48EI/L³ (simply supported, central point load), and the critical speed is ω_cr = √(k/m) = √(48EI/(mL³)). This is Rayleigh\'s method for a single-disk system. For multiple masses, Dunkerley\'s equation (1/ω²_cr = Σ 1/ω²_i) provides a conservative lower bound. The static deflection method gives ω_cr = √(g/δ_static), which is the simplest approach.',
          hint: 'The critical speed is essentially the natural frequency of the shaft-disk system.'
        },
        {
          id: 'u8-L1-Q6',
          type: 'fill-blank',
          question: 'The phenomenon where a rotating shaft deflects laterally at a specific speed equal to its natural frequency is called ___ (or whirling).',
          acceptedAnswers: ['critical speed', 'Critical speed', 'critical speed resonance', 'whirling', 'Whirling', 'whirl'],
          explanation: 'Critical speed (whirling) occurs when the shaft rotation speed coincides with a natural frequency of lateral vibration. At this speed, even small imbalances cause large lateral deflections due to resonance. The shaft bows outward and, if damping is insufficient, deflections grow until failure. Proper design ensures operating speed is at least 20% away from any critical speed, or provides adequate damping for supercritical operation.',
          hint: 'This occurs when rotational speed matches the natural frequency of transverse vibration.'
        }
      ]
    },
    {
      id: 'u8-L2',
      title: 'Bearings & Lubrication',
      description: 'Ball/roller/plain bearings, L10 life calculation, bearing selection, viscosity, lubrication regimes.',
      icon: '🛞',
      xpReward: 25,
      questions: [
        {
          id: 'u8-L2-Q1',
          type: 'multiple-choice',
          question: 'A ball bearing has a basic dynamic load rating C = 25 kN and operates under an equivalent radial load P = 5 kN. What is the L10 life in millions of revolutions?',
          options: [
            '25 million revolutions',
            '125 million revolutions',
            '625 million revolutions',
            '3125 million revolutions'
          ],
          correctIndex: 1,
          explanation: 'For ball bearings: L10 = (C/P)^p where p = 3 for ball bearings. L10 = (25/5)^3 = 5^3 = 125 million revolutions. For roller bearings, p = 10/3. The L10 life means 90% of a population of identical bearings will survive this many revolutions. At 1000 RPM, this equals 125×10⁶/(1000×60) = 2083 hours. Adjusted life (L10a) accounts for reliability, material, and lubrication factors.',
          hint: 'L10 = (C/P)^p with p = 3 for ball bearings. L10 is the life at 90% reliability.'
        },
        {
          id: 'u8-L2-Q2',
          type: 'multiple-choice',
          question: 'Which bearing type can support both radial and thrust (axial) loads simultaneously and is self-aligning?',
          options: [
            'Deep groove ball bearing',
            'Cylindrical roller bearing',
            'Spherical roller bearing',
            'Needle roller bearing'
          ],
          correctIndex: 2,
          explanation: 'Spherical roller bearings have barrel-shaped rollers running on a spherical outer raceway, giving them the ability to carry heavy combined radial and axial loads while accommodating shaft misalignment up to 2–3°. They are widely used in heavy industry: mining equipment, paper mills, gearboxes, and vibrating screens. Deep groove ball bearings handle moderate combined loads but cannot self-align. Cylindrical rollers carry high radial loads but most types cannot handle axial loads.',
          hint: 'Think about which bearing geometry allows the inner ring to tilt relative to the outer ring.'
        },
        {
          id: 'u8-L2-Q3',
          type: 'true-false',
          question: 'In hydrodynamic (journal) bearing lubrication, the load-carrying capacity increases with increasing lubricant viscosity, shaft speed, and decreasing bearing clearance.',
          correctAnswer: true,
          explanation: 'The Sommerfeld number S = (μNd)/(P × c²) governs hydrodynamic bearing performance, where μ is viscosity, N is speed, d is diameter, P is pressure, and c is clearance. Load capacity increases with higher viscosity and speed (more oil is dragged into the converging wedge) and with smaller clearance (higher pressure buildup). However, very small clearance causes excessive temperature rise, and very high viscosity increases power loss. The Raimondi-Boyd charts relate the Sommerfeld number to bearing performance parameters.',
          hint: 'Think about the hydrodynamic wedge effect — what parameters increase the pressure generated?'
        },
        {
          id: 'u8-L2-Q4',
          type: 'multiple-choice',
          question: 'The Stribeck curve shows friction coefficient vs. the bearing parameter (μN/P). The minimum friction point separating mixed lubrication from full-film (hydrodynamic) lubrication is called:',
          options: [
            'The cavitation point',
            'The Hertzian contact point',
            'The transition point (or boundary/mixed lubrication transition)',
            'The elastohydrodynamic limit'
          ],
          correctIndex: 2,
          explanation: 'The Stribeck curve shows three lubrication regimes: boundary (high friction, surface contact dominates at low μN/P), mixed (decreasing friction as partial fluid film develops), and hydrodynamic (friction increases slightly with speed due to viscous shear). The minimum friction point is the transition where a continuous fluid film first develops. Operating slightly to the right of this minimum provides the best balance of low friction and adequate film thickness. Designing too close to this point risks falling into mixed/boundary lubrication during startups or load spikes.',
          hint: 'The Stribeck curve has a characteristic minimum — it separates direct contact from full fluid film.'
        },
        {
          id: 'u8-L2-Q5',
          type: 'multiple-choice',
          question: 'An application requires a bearing that can handle 50 kN radial load, 10 kN axial load, shaft speed of 500 RPM, and accommodate 1° misalignment. Which bearing type is the best choice?',
          options: [
            'Single-row deep groove ball bearing',
            'Angular contact ball bearing (paired)',
            'Spherical roller bearing',
            'Tapered roller bearing'
          ],
          correctIndex: 2,
          explanation: 'The combination of heavy radial load (50 kN), significant axial load, low speed, and misalignment accommodation points to a spherical roller bearing. Deep groove balls cannot handle 50 kN radial at reasonable sizes, angular contact pairs don\'t accommodate misalignment, and tapered rollers also don\'t accommodate misalignment (and require careful preload). Spherical roller bearings are the standard choice for heavy-duty applications with alignment uncertainty.',
          hint: 'Which bearing type uniquely combines high load capacity with misalignment tolerance?'
        },
        {
          id: 'u8-L2-Q6',
          type: 'fill-blank',
          question: 'The bearing life calculation that represents the number of revolutions at which 90% of bearings will survive is called L___ life.',
          acceptedAnswers: ['10', 'L10', 'ten'],
          explanation: 'L10 (pronounced "L-ten") life is the rated life at 90% reliability — meaning 10% of bearings in a population are expected to fail before reaching this life. The ISO 281 standard defines L10 = (C/P)^p million revolutions. For higher reliability, life adjustment factors are applied: L1 (99% reliability) is about 0.21 × L10, L5 (95%) is about 0.62 × L10. Modern adjusted rating life (L10a or Lnm) also accounts for lubrication conditions and contamination.',
          hint: 'The subscript represents the percentage of bearings that are expected to fail.'
        }
      ]
    },
    {
      id: 'u8-L3',
      title: 'Gears & Power Transmission',
      description: 'Spur/helical/bevel/worm gears, Lewis equation, gear ratios, tooth contact stress, gear trains, efficiency.',
      icon: '⚙️',
      xpReward: 30,
      questions: [
        {
          id: 'u8-L3-Q1',
          type: 'multiple-choice',
          question: 'A spur gear pair has a pinion with 20 teeth and a gear with 80 teeth. If the pinion rotates at 1200 RPM and transmits 10 kW, what is the torque on the gear?',
          options: [
            '79.6 N·m',
            '159.2 N·m',
            '318.4 N·m',
            '636.6 N·m'
          ],
          correctIndex: 2,
          explanation: 'Gear ratio = N_gear/N_pinion = 80/20 = 4. Gear speed = 1200/4 = 300 RPM. Torque on pinion: T_p = P/ω = 10000/(1200 × 2π/60) = 10000/125.66 = 79.6 N·m. Torque on gear: T_g = T_p × gear ratio = 79.6 × 4 = 318.4 N·m. Alternatively, T_g = P/(ω_g) = 10000/(300 × 2π/60) = 318.4 N·m. The gear amplifies torque by the gear ratio while reducing speed by the same factor (ignoring friction losses).',
          hint: 'Power is constant (P = Tω). Use the gear ratio to find the gear speed, then calculate torque.'
        },
        {
          id: 'u8-L3-Q2',
          type: 'multiple-choice',
          question: 'What is the primary advantage of helical gears over spur gears?',
          options: [
            'No axial thrust is generated',
            'Higher efficiency due to sliding contact',
            'Smoother and quieter operation due to gradual tooth engagement, with higher load capacity for a given size',
            'Simpler manufacturing and lower cost'
          ],
          correctIndex: 2,
          explanation: 'Helical gears have teeth cut at an angle (helix angle, typically 15–30°) to the axis. This causes teeth to engage gradually rather than the full face width engaging simultaneously as in spur gears. Benefits: smoother operation, lower noise and vibration, higher load capacity (more teeth in contact). The main disadvantage is axial thrust forces requiring thrust bearings. Herringbone (double helical) gears cancel the axial thrust but are more expensive to manufacture.',
          hint: 'Think about how the tooth engagement differs — one is sudden, the other is progressive.'
        },
        {
          id: 'u8-L3-Q3',
          type: 'true-false',
          question: 'A worm gear set can be self-locking (non-back-drivable) when the lead angle is less than the friction angle, making it useful for lifting applications.',
          correctAnswer: true,
          explanation: 'Self-locking occurs when the worm lead angle is less than the friction angle (arctan(μ)), typically below 5–6° for steel-on-bronze with lubrication. In this condition, the gear cannot drive the worm — friction prevents back-driving. This is valuable for hoists, jacks, and positioning systems where the load must hold position when power is off. However, self-locking worm sets have low efficiency (typically 40–60%), and the locked friction generates heat under sustained loading.',
          hint: 'Self-locking is related to the helix angle vs. the friction angle — similar to a screw jack.'
        },
        {
          id: 'u8-L3-Q4',
          type: 'multiple-choice',
          question: 'In the Lewis bending stress equation for spur gears (σ = Wt/(b·m·Y)), a gear tooth with a low Lewis form factor Y indicates:',
          options: [
            'A stronger tooth that can handle more load',
            'A weaker tooth more prone to bending failure, typically with fewer teeth (pinion)',
            'Better surface contact stress resistance',
            'Higher efficiency of power transmission'
          ],
          correctIndex: 1,
          explanation: 'The Lewis form factor Y increases with the number of teeth. A pinion with few teeth (e.g., 15) has a lower Y than a gear with many teeth (e.g., 60). Lower Y means higher bending stress for the same load — the pinion tooth is weaker in bending because it is narrower at the root. This is why the pinion is usually the critical component in bending strength analysis, and why minimum tooth counts are specified (typically 12–17 for standard gears) to avoid undercutting and excessive root stress.',
          hint: 'Lewis form factor relates to tooth geometry — fewer teeth means a different tooth shape.'
        },
        {
          id: 'u8-L3-Q5',
          type: 'multiple-choice',
          question: 'A gear train consists of three stages: stage 1 ratio = 3:1, stage 2 ratio = 4:1, stage 3 ratio = 2:1. If the input shaft runs at 2400 RPM, what is the output speed?',
          options: [
            '100 RPM',
            '200 RPM',
            '400 RPM',
            '800 RPM'
          ],
          correctIndex: 0,
          explanation: 'Overall gear ratio = 3 × 4 × 2 = 24:1 (reduction). Output speed = 2400/24 = 100 RPM. Gear ratios in series multiply. Output torque = input torque × 24 × η_total, where η_total is the product of individual stage efficiencies. If each stage is 97% efficient: η_total = 0.97³ = 0.913 (91.3%). Planetary gear trains can achieve higher ratios in a more compact package, which is why they are preferred when space is limited.',
          hint: 'For gears in series, the total ratio is the product of individual ratios.'
        },
        {
          id: 'u8-L3-Q6',
          type: 'fill-blank',
          question: 'The failure mode where repeated Hertzian contact stress causes surface fatigue, creating pits on gear tooth surfaces, is called ___.',
          acceptedAnswers: ['pitting', 'Pitting', 'surface pitting', 'Surface pitting', 'contact fatigue'],
          explanation: 'Pitting is surface fatigue failure caused by cyclic Hertzian (contact) stress. Subsurface cracks initiate at the depth of maximum shear stress, propagate to the surface, and release small particles, forming pits. The AGMA contact stress formula (based on Hertz theory) is used to design against pitting. Pitting typically occurs near the pitch line where sliding velocity changes direction. Proper hardness, surface finish, and lubrication are key to preventing pitting.',
          hint: 'This surface fatigue phenomenon creates small craters on the gear tooth contact surface.'
        }
      ]
    },
    {
      id: 'u8-L4',
      title: 'Fasteners & Joints',
      description: 'Bolt preload, bolt stiffness, gasket factors, welded joints (fillet/butt), adhesive bonding, joint design.',
      icon: '🔩',
      xpReward: 25,
      questions: [
        {
          id: 'u8-L4-Q1',
          type: 'multiple-choice',
          question: 'In a bolted joint under external tensile load, the bolt stiffness is k_b = 400 MN/m and the clamped member stiffness is k_c = 1200 MN/m. If the external load is 20 kN, how much additional load does the bolt carry?',
          options: [
            '5 kN',
            '10 kN',
            '15 kN',
            '20 kN'
          ],
          correctIndex: 0,
          explanation: 'The stiffness ratio (load fraction carried by bolt) C = k_b/(k_b + k_c) = 400/(400 + 1200) = 0.25. Additional bolt load = C × F_ext = 0.25 × 20 = 5 kN. The clamped members absorb 75% of the external load by relieving compression. This is why proper preload is critical — it keeps the joint clamped so the bolt only sees a fraction of the external load. If preload is lost, the bolt sees the full external load and is far more likely to fail in fatigue.',
          hint: 'The load split depends on the stiffness ratio: C = k_b/(k_b + k_c).'
        },
        {
          id: 'u8-L4-Q2',
          type: 'multiple-choice',
          question: 'What percentage of bolt preload is typically lost to thread friction and under-head friction during tightening?',
          options: [
            '10–20%',
            '40–50%',
            '80–90%',
            'Less than 5%'
          ],
          correctIndex: 2,
          explanation: 'Approximately 80–90% of the tightening torque is consumed by friction (about 40% under the bolt head and 40% in the threads), with only 10–20% actually converted to clamping force (preload). This is described by the torque-preload relationship T = K × F × d, where K is the nut factor (typically 0.15–0.25). This large friction dependence is why torque-controlled tightening has ±25–30% preload uncertainty, and why critical joints use angle-of-turn, stretch measurement, or tension-indicating methods.',
          hint: 'Think about the torque-tension relationship — friction dominates the energy balance.'
        },
        {
          id: 'u8-L4-Q3',
          type: 'true-false',
          question: 'In a fillet weld loaded in shear parallel to the weld axis, the critical stress plane is at 45° through the throat of the weld (the shortest dimension across the triangular cross-section).',
          correctAnswer: true,
          explanation: 'The throat dimension of a fillet weld (a = 0.707 × leg size for equal-leg fillets) is the shortest distance from the root to the face. Failure occurs on this 45° throat plane because it has the smallest cross-sectional area. The shear stress on the throat is τ = F/(a × L), where a is the throat dimension and L is the weld length. This is the basis of all fillet weld strength calculations in AWS D1.1 and Eurocode 3. The allowable shear stress on the throat is typically 0.3 × ultimate tensile strength of the electrode.',
          hint: 'The throat of a fillet weld is the minimum cross-section, oriented at 45° to the legs.'
        },
        {
          id: 'u8-L4-Q4',
          type: 'multiple-choice',
          question: 'A bolted joint uses an M12 × 1.75 bolt (tensile stress area = 84.3 mm²) of property class 8.8 (proof strength = 600 MPa). What is the maximum recommended preload?',
          options: [
            '25.3 kN',
            '37.9 kN',
            '50.6 kN',
            '67.4 kN'
          ],
          correctIndex: 1,
          explanation: 'The recommended preload is typically 75% of proof load for non-permanent connections (90% for permanent ones). Proof load = proof strength × tensile stress area = 600 × 84.3 = 50,580 N = 50.6 kN. Recommended preload = 0.75 × 50.6 = 37.9 kN. Going above 90% of proof load risks permanent deformation of the bolt. Property class 8.8 means minimum tensile strength of 800 MPa and proof strength of 0.8 × 800 = 640 MPa (though many references use 600 MPa as a nominal value for design).',
          hint: 'Target preload is typically 75% of proof load. Proof load = proof stress × A_tensile.'
        },
        {
          id: 'u8-L4-Q5',
          type: 'multiple-choice',
          question: 'Which joint failure mode is unique to adhesive bonds and does not occur in welded or bolted joints?',
          options: [
            'Shear failure through the joint',
            'Peel failure at the bond edge where tensile stress perpendicular to the bond surface causes progressive separation',
            'Fatigue cracking under cyclic loads',
            'Corrosion-related degradation'
          ],
          correctIndex: 1,
          explanation: 'Peel failure is specific to adhesive (and to some extent bonded composite) joints. It occurs when tensile stress acts perpendicular to the adhesive layer, typically at the edges of lap joints. Adhesives are very weak in peel compared to shear — a thin adhesive layer under peel acts like opening a zipper. Good adhesive joint design maximizes shear area and minimizes peel: use scarfed or stepped joints, add fillets at edges, or design lap joints with balanced stiffness to reduce eccentricity.',
          hint: 'Adhesives are strong in shear but very weak in one particular loading mode at the bond edges.'
        },
        {
          id: 'u8-L4-Q6',
          type: 'fill-blank',
          question: 'The initial tension applied to a bolt during tightening, before any external load is applied, is called ___.',
          acceptedAnswers: ['preload', 'Preload', 'pre-load', 'Pre-load', 'clamping force', 'Clamping force', 'pretension', 'Pretension'],
          explanation: 'Preload (also called pretension or initial clamping force) is the tension in the bolt created during tightening. It compresses the clamped members, creating a friction force that resists joint separation and slip. Proper preload is critical: too low allows joint separation or slip under load, too high risks bolt yield. The preload is controlled during assembly by torque, angle-of-turn, or bolt stretch measurement. For critical joints, ultrasonic bolt stretch measurement provides ±1% accuracy.',
          hint: 'This is the force in the bolt when it is tightened, before any external service loads are applied.'
        }
      ]
    },
    {
      id: 'u8-L5',
      title: 'Springs & Seals',
      description: 'Helical spring design, Wahl factor, spring rate, O-ring/lip seal/mechanical seal selection, PV limits.',
      icon: '🌀',
      xpReward: 25,
      questions: [
        {
          id: 'u8-L5-Q1',
          type: 'multiple-choice',
          question: 'A helical compression spring has a mean coil diameter D = 30 mm, wire diameter d = 5 mm, and 8 active coils. Using G = 80 GPa, what is the spring rate?',
          options: [
            '14.5 N/mm',
            '23.1 N/mm',
            '28.9 N/mm',
            '36.2 N/mm'
          ],
          correctIndex: 2,
          explanation: 'Spring rate k = Gd⁴/(8D³Nₐ) = (80,000 × 5⁴)/(8 × 30³ × 8) = (80,000 × 625)/(8 × 27,000 × 8) = 50,000,000/1,728,000 ≈ 28.9 N/mm. The spring index C = D/d = 6, which is in the typical design range (4–12). This formula is fundamental to spring design — note that rate is inversely proportional to the cube of coil diameter and linearly to the number of active coils.',
          hint: 'k = Gd⁴/(8D³N_a). Be consistent with units — all in mm and MPa gives N/mm.'
        },
        {
          id: 'u8-L5-Q2',
          type: 'multiple-choice',
          question: 'The Wahl correction factor in helical spring design accounts for:',
          options: [
            'Temperature effects on spring material',
            'The curvature effect and direct shear stress, which increase stress on the inner surface of the coil',
            'Manufacturing tolerances in wire diameter',
            'End condition effects (ground vs unground ends)'
          ],
          correctIndex: 1,
          explanation: 'The Wahl factor K_w = (4C − 1)/(4C − 4) + 0.615/C, where C = D/d is the spring index. It corrects the simple torsional shear stress (τ = 8FD/(πd³)) for two effects: direct shear stress and the stress concentration due to coil curvature. The inner fiber of the coil carries higher stress than the outer fiber. For C = 6, K_w ≈ 1.25, meaning actual peak stress is 25% higher than the simple calculation. Springs with small C (tight coils) have larger correction factors and are harder to manufacture.',
          hint: 'The inner and outer surfaces of a curved coil experience different stress levels.'
        },
        {
          id: 'u8-L5-Q3',
          type: 'true-false',
          question: 'O-ring seals rely primarily on the elastic deformation (squeeze) of the rubber to create a seal at low pressures, and on system pressure energizing the O-ring against the groove walls at higher pressures.',
          correctAnswer: true,
          explanation: 'At low pressures, the O-ring seals through the initial squeeze (typically 10–30% compression) that creates contact stress against the mating surfaces. As system pressure increases, it pushes the O-ring against the downstream groove wall and contact surface, increasing the sealing force — this is the pressure-energized (self-energizing) effect. At high pressures (>10 MPa), back-up rings are needed to prevent the O-ring from extruding into the clearance gap. The Parker O-Ring Handbook is the standard reference for O-ring groove design.',
          hint: 'Consider the two sealing mechanisms: initial compression and pressure-activated.'
        },
        {
          id: 'u8-L5-Q4',
          type: 'multiple-choice',
          question: 'A lip seal (rotary shaft seal) has a recommended maximum PV (pressure × velocity) limit. If the shaft diameter is 50 mm and rotates at 3000 RPM, what is the surface velocity?',
          options: [
            '3.93 m/s',
            '7.85 m/s',
            '15.7 m/s',
            '23.6 m/s'
          ],
          correctIndex: 1,
          explanation: 'Surface velocity V = π × D × N = π × 0.05 × (3000/60) = π × 0.05 × 50 = 7.85 m/s. Standard nitrile rubber lip seals are typically rated for up to 12–15 m/s; higher speeds require PTFE or other specialty lip materials. The PV limit considers the frictional heat generation at the sealing interface. Exceeding PV limits causes excessive wear, heat buildup, and premature seal failure. For this shaft, a standard lip seal would be appropriate.',
          hint: 'V = πDN, where N must be in rev/s. Convert RPM to rev/s first.'
        },
        {
          id: 'u8-L5-Q5',
          type: 'multiple-choice',
          question: 'Which type of seal is preferred for sealing high-pressure (>20 MPa) rotating shafts at moderate speeds, such as in hydraulic swivel joints?',
          options: [
            'Simple lip seal with spring',
            'O-ring in a groove',
            'Mechanical face seal with hard/soft face pair',
            'Labyrinth seal'
          ],
          correctIndex: 2,
          explanation: 'Mechanical face seals use two precision-flat faces (one rotating, one stationary) pressed together by a spring and hydraulic pressure. The hard/soft face pair (e.g., silicon carbide vs. carbon graphite) provides excellent sealing at high pressures and moderate speeds with low leakage. O-rings extrude at high pressure, lip seals cannot handle high pressures, and labyrinth seals are non-contacting and allow some leakage by design (used for gas/dust exclusion). Mechanical seals are standard in pumps, compressors, and rotating equipment.',
          hint: 'This seal type uses two flat, lapped surfaces in contact — one rotates with the shaft.'
        },
        {
          id: 'u8-L5-Q6',
          type: 'fill-blank',
          question: 'The ratio of mean coil diameter to wire diameter (D/d) in a helical spring is called the spring ___.',
          acceptedAnswers: ['index', 'Index', 'C', 'spring index'],
          explanation: 'The spring index C = D/d is a key design parameter. Practical values range from 4 to 12 — below 4, springs are difficult to manufacture (tight coils, high stress), and above 12, springs tend to buckle and tangle. A spring index of 6–10 is most common. The spring index directly affects the Wahl correction factor, which approaches 1.0 as C becomes large and increases sharply as C decreases below 5.',
          hint: 'This dimensionless ratio characterizes the "tightness" of the coil — small values mean tightly wound springs.'
        }
      ]
    }
  ]
};
