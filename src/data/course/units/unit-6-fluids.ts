import type { Unit } from '../types';

export const unit6: Unit = {
  id: 'u6-fluids',
  title: 'Fluid Mechanics',
  description: 'Fluid properties, pipe flow, pumps, and dimensional analysis for mechanical engineering applications.',
  color: '#06B6D4',
  icon: '🌊',
  lessons: [
    {
      id: 'u6-L1',
      title: 'Fluid Properties & Statics',
      description: 'Viscosity, density, surface tension, Pascal\'s law, manometers, and hydrostatic forces on surfaces.',
      icon: '💧',
      xpReward: 20,
      questions: [
        {
          id: 'u6-L1-Q1',
          type: 'multiple-choice',
          question: 'A U-tube manometer connects two pressure taps on a pipe. The manometer fluid is mercury (SG = 13.6) and the pipe fluid is water. If the mercury column height difference is 250 mm, what is the pressure difference between the taps?',
          options: [
            '24.5 kPa',
            '30.9 kPa',
            '33.4 kPa',
            '38.2 kPa'
          ],
          correctIndex: 1,
          explanation: 'ΔP = (ρ_mercury − ρ_water) × g × Δh = (13,600 − 1,000) × 9.81 × 0.25 = 12,600 × 9.81 × 0.25 = 30,901 Pa ≈ 30.9 kPa. The differential manometer equation accounts for both the manometer fluid and the process fluid densities.',
          hint: 'Use the differential manometer equation: ΔP = (ρ_m − ρ_f) × g × h.'
        },
        {
          id: 'u6-L1-Q2',
          type: 'multiple-choice',
          question: 'A vertical rectangular gate 2 m wide and 3 m tall holds back water with the top edge at the free surface. At what depth from the surface does the resultant hydrostatic force act?',
          options: [
            '1.0 m',
            '1.5 m',
            '2.0 m',
            '2.5 m'
          ],
          correctIndex: 2,
          explanation: 'For a vertical rectangular surface with top edge at the free surface, the center of pressure is at 2h/3 from the surface, where h is the gate height. So y_cp = 2 × 3/3 = 2.0 m. This is deeper than the centroid (1.5 m) because pressure increases with depth, shifting the resultant force downward.',
          hint: 'The center of pressure for a rectangle with top edge at the surface is at 2/3 of the height.'
        },
        {
          id: 'u6-L1-Q3',
          type: 'true-false',
          question: 'Kinematic viscosity is defined as the ratio of dynamic viscosity to density (ν = μ/ρ), and its SI unit is m²/s.',
          correctAnswer: true,
          explanation: 'Kinematic viscosity ν = μ/ρ, where μ is dynamic viscosity (Pa·s) and ρ is density (kg/m³). The resulting unit is (Pa·s)/(kg/m³) = (kg/(m·s))/(kg/m³) = m²/s. This property appears naturally in the Reynolds number and Navier-Stokes equations.',
          hint: 'Think about the units: Pa·s divided by kg/m³.'
        },
        {
          id: 'u6-L1-Q4',
          type: 'multiple-choice',
          question: 'A hydraulic press has a small piston of diameter 30 mm and a large piston of diameter 200 mm. If a force of 500 N is applied to the small piston, what is the force exerted by the large piston?',
          options: [
            '14,800 N',
            '22,222 N',
            '3,333 N',
            '44,444 N'
          ],
          correctIndex: 1,
          explanation: 'By Pascal\'s law, pressure is transmitted equally: F₂ = F₁ × (A₂/A₁) = F₁ × (D₂/D₁)² = 500 × (200/30)² = 500 × 44.44 = 22,222 N. The force multiplication ratio equals the area ratio, which is the square of the diameter ratio.',
          hint: 'Pascal\'s law: F₂/F₁ = A₂/A₁ = (D₂/D₁)².'
        },
        {
          id: 'u6-L1-Q5',
          type: 'multiple-choice',
          question: 'Which of the following statements about surface tension is correct for engineering applications?',
          options: [
            'Surface tension increases with temperature for most liquids',
            'Capillary rise in a tube is inversely proportional to tube diameter',
            'Surface tension has units of N/m² (same as pressure)',
            'Surface tension effects become negligible as the characteristic length decreases'
          ],
          correctIndex: 1,
          explanation: 'Capillary rise h = 4σcos(θ)/(ρgd), which shows it is inversely proportional to tube diameter d. Surface tension decreases with temperature (not increases), has units of N/m (force per length, not area), and becomes more significant (not negligible) at small length scales — this is why microfluidics must account for surface tension effects.',
          hint: 'Consider the capillary rise equation and how each variable affects the height.'
        },
        {
          id: 'u6-L1-Q6',
          type: 'fill-blank',
          question: 'The property of a fluid that describes its resistance to shear deformation is called ___.',
          acceptedAnswers: ['viscosity', 'Viscosity', 'dynamic viscosity', 'Dynamic viscosity'],
          explanation: 'Viscosity (specifically dynamic or absolute viscosity, μ) quantifies a fluid\'s internal resistance to shear. It relates shear stress to the rate of deformation via Newton\'s law of viscosity: τ = μ(du/dy). Fluids with higher viscosity require greater shear stress to achieve the same deformation rate.',
          hint: 'This is the property measured in Pa·s or Poise.'
        }
      ]
    },
    {
      id: 'u6-L2',
      title: 'Bernoulli & Energy Equation',
      description: 'Bernoulli equation, venturi meter, pitot tube, energy line/HGL, assumptions and limitations.',
      icon: '🎢',
      xpReward: 25,
      questions: [
        {
          id: 'u6-L2-Q1',
          type: 'multiple-choice',
          question: 'Water flows through a horizontal venturi meter from a 100 mm diameter section to a 50 mm throat. If the pressure difference between inlet and throat is 40 kPa, what is the approximate flow velocity at the throat? (Assume ideal flow, ρ = 1000 kg/m³)',
          options: [
            '6.5 m/s',
            '9.2 m/s',
            '4.6 m/s',
            '12.8 m/s'
          ],
          correctIndex: 1,
          explanation: 'Using Bernoulli and continuity: V₂ = √(2ΔP / (ρ(1 − (A₂/A₁)²))). The area ratio A₂/A₁ = (50/100)² = 0.25. So V₂ = √(2 × 40000 / (1000 × (1 − 0.0625))) = √(80000/937.5) = √85.33 ≈ 9.2 m/s. Real venturi meters apply a discharge coefficient (typically 0.95–0.99) to account for minor losses.',
          hint: 'Combine Bernoulli equation with continuity to eliminate the upstream velocity.'
        },
        {
          id: 'u6-L2-Q2',
          type: 'true-false',
          question: 'The Bernoulli equation can be applied along a streamline in steady, incompressible, inviscid flow even if the flow is rotational.',
          correctAnswer: true,
          explanation: 'The Bernoulli equation in its standard form (P/ρg + V²/2g + z = const) applies along a streamline for steady, incompressible, inviscid flow regardless of whether the flow is rotational or irrotational. However, for irrotational flow, Bernoulli can be applied between ANY two points in the flow field, not just along a single streamline. This distinction is important in practice.',
          hint: 'Think about the difference between applying Bernoulli along a streamline vs. across streamlines.'
        },
        {
          id: 'u6-L2-Q3',
          type: 'multiple-choice',
          question: 'A pitot-static tube in an air duct reads a stagnation pressure of 101.8 kPa and a static pressure of 101.3 kPa. If the air density is 1.2 kg/m³, what is the air velocity?',
          options: [
            '20.4 m/s',
            '28.9 m/s',
            '40.8 m/s',
            '14.4 m/s'
          ],
          correctIndex: 1,
          explanation: 'From Bernoulli: V = √(2(P_stag − P_static)/ρ) = √(2 × 500 / 1.2) = √833.3 ≈ 28.9 m/s. The pitot-static tube directly measures the dynamic pressure (P_stag − P_static = ½ρV²), making velocity calculation straightforward. This assumes incompressible flow, which is valid here since V << speed of sound.',
          hint: 'Dynamic pressure = stagnation − static = ½ρV².'
        },
        {
          id: 'u6-L2-Q4',
          type: 'multiple-choice',
          question: 'In a pipe flow system, the Hydraulic Grade Line (HGL) drops below the pipe centerline at a high point. What does this indicate?',
          options: [
            'Flow has reached sonic velocity at that point',
            'The static pressure at that point is below atmospheric, creating potential for cavitation or air ingestion',
            'The flow has become turbulent at that section',
            'The total energy of the flow has increased due to a pump'
          ],
          correctIndex: 1,
          explanation: 'The HGL represents the sum of pressure head and elevation head (P/ρg + z). When the HGL drops below the pipe, the pressure head is negative gauge (below atmospheric). This is dangerous because it can cause cavitation if pressure drops below vapor pressure, or air can be drawn in through any leaks. This is a key consideration in pipeline design over hills.',
          hint: 'Consider what the HGL physically represents in terms of pressure.'
        },
        {
          id: 'u6-L2-Q5',
          type: 'multiple-choice',
          question: 'Which of the following is NOT a valid assumption required for the standard Bernoulli equation?',
          options: [
            'Steady flow',
            'Incompressible flow',
            'Flow along a streamline',
            'Adiabatic flow (no heat transfer)'
          ],
          correctIndex: 3,
          explanation: 'The standard Bernoulli equation requires steady flow, incompressible fluid, inviscid (frictionless) flow, and applies along a streamline. Adiabatic flow is not a separate requirement — the Bernoulli equation is a mechanical energy equation derived from momentum, not thermodynamics. For compressible flows, the energy equation must be used instead, which does involve thermodynamic considerations.',
          hint: 'Think about the derivation of Bernoulli — it comes from Euler\'s equation, not the energy equation.'
        },
        {
          id: 'u6-L2-Q6',
          type: 'fill-blank',
          question: 'The line representing total head (pressure head + velocity head + elevation head) in a pipe system is called the ___ Line.',
          acceptedAnswers: ['Energy Grade', 'energy grade', 'Energy', 'energy', 'EGL', 'egl', 'Total Energy'],
          explanation: 'The Energy Grade Line (EGL) represents the total mechanical energy at each point: P/ρg + V²/2g + z. It slopes downward in the direction of flow due to friction losses, and drops sharply at minor losses (valves, fittings). The HGL sits below the EGL by exactly V²/2g (the velocity head).',
          hint: 'This line is always above the HGL by exactly the velocity head.'
        }
      ]
    },
    {
      id: 'u6-L3',
      title: 'Pipe Flow & Losses',
      description: 'Reynolds number, laminar vs turbulent, Moody chart, major/minor losses, Darcy-Weisbach, pipe networks.',
      icon: '🔧',
      xpReward: 25,
      questions: [
        {
          id: 'u6-L3-Q1',
          type: 'multiple-choice',
          question: 'Water at 20°C (ν = 1.0 × 10⁻⁶ m²/s) flows through a 50 mm diameter pipe at 2 m/s. What is the Reynolds number and flow regime?',
          options: [
            'Re = 10,000 — Turbulent',
            'Re = 100,000 — Turbulent',
            'Re = 1,000 — Laminar',
            'Re = 50,000 — Transitional'
          ],
          correctIndex: 1,
          explanation: 'Re = VD/ν = 2 × 0.05 / (1.0 × 10⁻⁶) = 100,000. Since Re >> 4000, the flow is fully turbulent. In practice, most engineering pipe flows are turbulent — laminar pipe flow (Re < 2300) typically only occurs with very viscous fluids, very small pipes, or very low velocities.',
          hint: 'Re = VD/ν. Turbulent flow occurs when Re > 4000.'
        },
        {
          id: 'u6-L3-Q2',
          type: 'multiple-choice',
          question: 'For fully developed laminar flow in a circular pipe, the friction factor f (Darcy) is:',
          options: [
            'f = 64/Re',
            'f = 16/Re',
            'f = 0.316/Re^0.25',
            'f = 128/Re'
          ],
          correctIndex: 0,
          explanation: 'The Darcy friction factor for laminar flow is f = 64/Re. This is derived analytically from the Hagen-Poiseuille equation. Note: f = 16/Re is the Fanning friction factor, which is f_Darcy/4. The Blasius correlation f = 0.316/Re^0.25 applies to smooth-pipe turbulent flow at Re < 10⁵. Always confirm which friction factor convention is being used.',
          hint: 'Be careful to distinguish Darcy (Moody) friction factor from Fanning friction factor.'
        },
        {
          id: 'u6-L3-Q3',
          type: 'true-false',
          question: 'On the Moody chart, at very high Reynolds numbers (fully rough turbulent zone), the friction factor depends only on relative roughness ε/D and is independent of Reynolds number.',
          correctAnswer: true,
          explanation: 'In the fully rough turbulent zone, the viscous sublayer is so thin that roughness elements protrude through it, and skin friction is dominated by pressure drag on the roughness elements. The friction factor becomes independent of Re and depends only on ε/D. This is reflected in the Moody chart where the curves become horizontal at high Re, and by the von Kármán equation: 1/√f = −2 log(ε/3.7D).',
          hint: 'Think about what happens when roughness elements are much larger than the viscous sublayer.'
        },
        {
          id: 'u6-L3-Q4',
          type: 'multiple-choice',
          question: 'A 100 m long, 150 mm diameter commercial steel pipe (ε = 0.045 mm) carries water at 3 m/s. Using f = 0.018, what is the major head loss?',
          options: [
            '5.5 m',
            '11.0 m',
            '8.3 m',
            '16.5 m'
          ],
          correctIndex: 0,
          explanation: 'Using Darcy-Weisbach: h_f = f(L/D)(V²/2g) = 0.018 × (100/0.15) × (3²/(2 × 9.81)) = 0.018 × 666.7 × 0.459 = 5.5 m. This represents the energy lost to friction along the pipe length. Minor losses from fittings would be added separately using loss coefficients (K values).',
          hint: 'h_f = f × (L/D) × (V²/2g) — the Darcy-Weisbach equation.'
        },
        {
          id: 'u6-L3-Q5',
          type: 'multiple-choice',
          question: 'A pipe system has two branches in parallel. Branch A has a total resistance coefficient K_A = 10 and Branch B has K_B = 40. If the total flow is 0.1 m³/s, what is the approximate flow through Branch A?',
          options: [
            '0.050 m³/s',
            '0.067 m³/s',
            '0.075 m³/s',
            '0.080 m³/s'
          ],
          correctIndex: 1,
          explanation: 'For parallel pipes, head loss is equal in both branches: K_A × Q_A² = K_B × Q_B². So Q_A/Q_B = √(K_B/K_A) = √(40/10) = 2. With Q_A + Q_B = 0.1: Q_A = 0.1 × 2/3 = 0.067 m³/s. The lower-resistance branch carries more flow, proportional to the square root of the resistance ratio.',
          hint: 'In parallel pipes, head loss is equal. The flow splits according to the resistance ratio.'
        },
        {
          id: 'u6-L3-Q6',
          type: 'fill-blank',
          question: 'The dimensionless number that characterizes whether pipe flow is laminar or turbulent is the ___ number.',
          acceptedAnswers: ['Reynolds', 'reynolds', 'Re'],
          explanation: 'The Reynolds number (Re = ρVD/μ = VD/ν) is the ratio of inertial forces to viscous forces. For pipe flow, Re < 2300 indicates laminar flow, 2300 < Re < 4000 is the transition zone, and Re > 4000 indicates turbulent flow. It is the single most important dimensionless number in fluid mechanics for characterizing flow behavior.',
          hint: 'This number represents the ratio of inertial to viscous forces.'
        }
      ]
    },
    {
      id: 'u6-L4',
      title: 'Pumps & Turbomachinery',
      description: 'Pump curves, system curves, NPSH, cavitation, specific speed, affinity laws, pump selection.',
      icon: '⚙️',
      xpReward: 30,
      questions: [
        {
          id: 'u6-L4-Q1',
          type: 'multiple-choice',
          question: 'A centrifugal pump operates at 1750 RPM with Q = 200 L/min and head = 25 m. If the speed is increased to 2100 RPM, what is the new head according to the affinity laws?',
          options: [
            '30.0 m',
            '36.0 m',
            '42.0 m',
            '50.4 m'
          ],
          correctIndex: 1,
          explanation: 'By the affinity laws, head scales with speed squared: H₂/H₁ = (N₂/N₁)². H₂ = 25 × (2100/1750)² = 25 × 1.44 = 36.0 m. Similarly, flow scales linearly with speed (Q₂ = 240 L/min) and power scales with the cube of speed. These laws assume geometric similarity and are accurate for moderate speed changes.',
          hint: 'Affinity laws: Q ∝ N, H ∝ N², P ∝ N³.'
        },
        {
          id: 'u6-L4-Q2',
          type: 'multiple-choice',
          question: 'A pump has an NPSH_required of 3.5 m. The suction tank is at atmospheric pressure, the water temperature is 80°C (vapor pressure = 47.4 kPa), and the suction pipe losses are 1.2 m. What is the maximum suction lift (static) to avoid cavitation? (P_atm = 101.3 kPa, ρ = 972 kg/m³)',
          options: [
            '1.0 m',
            '0.9 m',
            '1.6 m',
            '2.3 m'
          ],
          correctIndex: 0,
          explanation: 'NPSH_available = (P_atm − P_vapor)/(ρg) − z_s − h_losses ≥ NPSH_required. (101300 − 47400)/(972 × 9.81) − z_s − 1.2 ≥ 3.5. 53900/9535 − z_s − 1.2 ≥ 3.5. 5.65 − z_s − 1.2 ≥ 3.5. z_s ≤ 0.95 ≈ 1.0 m. Hot water significantly reduces available NPSH because of higher vapor pressure, which is why pumps handling hot fluids are often placed below the tank.',
          hint: 'NPSH_A = (P_atm − P_v)/(ρg) − z_s − h_loss. Set NPSH_A = NPSH_R to find max z_s.'
        },
        {
          id: 'u6-L4-Q3',
          type: 'true-false',
          question: 'When two identical centrifugal pumps are connected in series, the combined flow rate doubles while the head remains the same as a single pump.',
          correctAnswer: false,
          explanation: 'Pumps in series add their heads at the same flow rate — they do NOT double the flow. The combined head is approximately 2H at any given Q. Pumps in parallel add flow rates at the same head. This is analogous to electrical circuits: series = more "voltage" (head), parallel = more "current" (flow). The actual operating point depends on the system curve intersection.',
          hint: 'Think about what happens to the pressure as fluid passes through one pump and then the next.'
        },
        {
          id: 'u6-L4-Q4',
          type: 'multiple-choice',
          question: 'A pump delivers 0.05 m³/s at 30 m head and runs at 1450 RPM. What is the specific speed (N_s) in SI units, and what type of pump is most suitable?',
          options: [
            'N_s ≈ 25 — Radial (centrifugal) pump',
            'N_s ≈ 25 — Mixed-flow pump',
            'N_s ≈ 80 — Axial-flow pump',
            'N_s ≈ 50 — Mixed-flow pump'
          ],
          correctIndex: 0,
          explanation: 'N_s = N√Q / H^(3/4) = 1450 × √0.05 / 30^(3/4) = 1450 × 0.2236 / 12.82 = 25.3 (dimensionless SI). Converting context: N_s < 30 suggests a radial (centrifugal) impeller, 30–80 is mixed flow, and >80 is axial flow. Specific speed is a key parameter in pump selection — it links geometry to performance and helps engineers choose the right impeller type.',
          hint: 'N_s = N√Q / H^(3/4). Low N_s = radial, medium = mixed, high = axial.'
        },
        {
          id: 'u6-L4-Q5',
          type: 'multiple-choice',
          question: 'Cavitation in a centrifugal pump most commonly damages which component first?',
          options: [
            'The volute casing near the discharge',
            'The impeller vane surfaces near the inlet (eye)',
            'The mechanical seal faces',
            'The pump shaft at the coupling'
          ],
          correctIndex: 1,
          explanation: 'Cavitation damage occurs where vapor bubbles collapse — primarily on the low-pressure side of impeller vanes near the inlet (suction side/eye). The implosion of vapor bubbles creates localized pressure spikes that erode the metal surface, creating characteristic pitting. This is why NPSH analysis focuses on suction conditions, and why the impeller eye region is often the first to show cavitation damage.',
          hint: 'Think about where the pressure is lowest in the pump.'
        },
        {
          id: 'u6-L4-Q6',
          type: 'fill-blank',
          question: 'The minimum suction head required by a pump to avoid cavitation, specified by the manufacturer, is called NPSH___ (subscript).',
          acceptedAnswers: ['R', 'r', 'required', 'Required', 'REQUIRED'],
          explanation: 'NPSH_R (required) is determined by the pump manufacturer through testing — it is the minimum net positive suction head needed to prevent more than 3% head drop due to cavitation. The system designer must ensure that NPSH_A (available from the system) exceeds NPSH_R with an adequate safety margin, typically at least 0.5–1.0 m or 10–20%.',
          hint: 'There are two types of NPSH: one from the system (available) and one from the pump.'
        }
      ]
    },
    {
      id: 'u6-L5',
      title: 'Dimensional Analysis',
      description: 'Buckingham Pi theorem, dimensional homogeneity, similitude, Reynolds/Froude/Mach numbers, model testing.',
      icon: '📐',
      xpReward: 25,
      questions: [
        {
          id: 'u6-L5-Q1',
          type: 'multiple-choice',
          question: 'A physical phenomenon involves 7 variables and 3 fundamental dimensions (M, L, T). According to the Buckingham Pi theorem, how many independent dimensionless groups (Pi terms) are needed?',
          options: [
            '3',
            '4',
            '7',
            '10'
          ],
          correctIndex: 1,
          explanation: 'The Buckingham Pi theorem states that the number of independent dimensionless groups = n − k, where n is the number of variables and k is the number of fundamental dimensions (or more precisely, the rank of the dimensional matrix). Here: 7 − 3 = 4 Pi groups. This powerful theorem reduces the number of experiments needed to characterize a phenomenon.',
          hint: 'Pi groups = number of variables minus number of fundamental dimensions.'
        },
        {
          id: 'u6-L5-Q2',
          type: 'multiple-choice',
          question: 'A 1:10 scale model of a ship is tested in a towing tank. If Froude number similarity is maintained, what model speed corresponds to a prototype speed of 15 knots?',
          options: [
            '1.5 knots',
            '4.74 knots',
            '15 knots',
            '47.4 knots'
          ],
          correctIndex: 1,
          explanation: 'Froude similarity requires Fr_m = Fr_p, so V_m/√(gL_m) = V_p/√(gL_p). Therefore V_m = V_p × √(L_m/L_p) = 15 × √(1/10) = 15 × 0.316 = 4.74 knots. Froude scaling is used for free-surface flows (ships, spillways) where gravity-driven waves dominate. Note that Reynolds similarity cannot be simultaneously maintained, which is a fundamental challenge in naval architecture model testing.',
          hint: 'Froude number: Fr = V/√(gL). Set Fr_model = Fr_prototype.'
        },
        {
          id: 'u6-L5-Q3',
          type: 'true-false',
          question: 'It is generally impossible to achieve simultaneous Reynolds number and Froude number similarity in a scaled model using the same fluid as the prototype.',
          correctAnswer: true,
          explanation: 'Reynolds similarity requires V_m = V_p × (L_p/L_m) × (ν_m/ν_p), while Froude similarity requires V_m = V_p × √(L_m/L_p). For the same fluid (ν_m = ν_p), these give contradictory velocity requirements. Achieving both simultaneously would require a model fluid with ν_m = ν_p × (L_m/L_p)^(3/2), which is practically impossible for most scale ratios. This is why engineers must identify the dominant phenomenon and match the corresponding dimensionless number.',
          hint: 'Write out the velocity requirements for both Re and Fr similarity and see if they can be satisfied simultaneously.'
        },
        {
          id: 'u6-L5-Q4',
          type: 'multiple-choice',
          question: 'A wind tunnel model of an aircraft wing is tested at 1:5 scale using the same air conditions. For Reynolds similarity, what model wind speed is needed if the prototype flies at 100 m/s?',
          options: [
            '20 m/s',
            '100 m/s',
            '500 m/s',
            '2000 m/s'
          ],
          correctIndex: 2,
          explanation: 'Reynolds similarity: Re_m = Re_p → V_m × L_m / ν_m = V_p × L_p / ν_p. Same fluid: V_m = V_p × (L_p/L_m) = 100 × 5 = 500 m/s. This exceeds Mach 1, making it impractical and violating the incompressible assumption. This illustrates why wind tunnel testing often uses pressurized tunnels (increasing ρ, reducing ν) or cryogenic tunnels to achieve high Re without excessive speed.',
          hint: 'For same fluid, Re similarity requires V_m = V_p × (L_p/L_m).'
        },
        {
          id: 'u6-L5-Q5',
          type: 'multiple-choice',
          question: 'Which dimensionless number represents the ratio of inertia forces to surface tension forces and is critical in spray atomization and droplet formation?',
          options: [
            'Froude number',
            'Weber number',
            'Euler number',
            'Strouhal number'
          ],
          correctIndex: 1,
          explanation: 'The Weber number We = ρV²L/σ represents the ratio of inertia to surface tension forces. It is critical in atomization, spray nozzle design, droplet breakup, and two-phase flow. High We indicates inertia dominates (droplets break apart), while low We means surface tension dominates (droplets stay intact). The Froude number involves gravity, Euler involves pressure, and Strouhal involves oscillation frequency.',
          hint: 'This number involves surface tension (σ) in its definition.'
        },
        {
          id: 'u6-L5-Q6',
          type: 'fill-blank',
          question: 'The principle that a model and prototype must have the same geometry, kinematics, and force ratios for valid scaling is called ___.',
          acceptedAnswers: ['similitude', 'Similitude', 'dynamic similitude', 'Dynamic similitude', 'complete similitude'],
          explanation: 'Similitude encompasses three levels: geometric (same shape ratios), kinematic (same velocity/acceleration ratios), and dynamic (same force ratios). Complete or dynamic similitude requires all relevant dimensionless numbers to match between model and prototype. In practice, only the most important dimensionless numbers are matched, as complete similitude is often impossible with scale models.',
          hint: 'This term describes the complete similarity between a model and its prototype.'
        }
      ]
    }
  ]
};
