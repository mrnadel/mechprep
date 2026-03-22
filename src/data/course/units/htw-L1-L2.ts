import type { Lesson } from '../types';

export const lesson1: Lesson = {
  id: 'u7-L1',
  title: 'Kitchen Engineering',
  description: 'How pressure cookers, refrigerators, faucets, and kitchen knives use core engineering principles.',
  icon: '🍳',
  xpReward: 25,
  questions: [
    // --- PRESSURE COOKER (Q1-Q4) ---
    {
      id: 'u7-L1-Q1',
      type: 'multiple-choice',
      question: 'A pressure cooker cooks food faster primarily because:',
      options: [
        'Increased pressure raises the boiling point of water',
        'The sealed pot traps more heat radiation',
        'Steam molecules move faster at higher pressure',
        'The thick walls conduct heat more efficiently',
      ],
      correctIndex: 0,
      explanation: 'By sealing the pot, steam pressure builds above atmospheric. Per the Clausius-Clapeyron relation, higher pressure raises the saturation temperature, so water boils at ~120\u00B0C instead of 100\u00B0C \u2014 cooking food faster.',
    },
    {
      id: 'u7-L1-Q2',
      type: 'fill-blank',
      question: 'The ___ relation describes how the boiling point of a liquid changes with pressure, which is the principle behind a pressure cooker.',
      blanks: ['Clausius-Clapeyron'],
      wordBank: ['Clausius-Clapeyron', 'Bernoulli', 'Fourier', 'Carnot', 'Navier-Stokes'],
      explanation: 'The Clausius-Clapeyron equation relates the slope of the vapor pressure curve to latent heat and temperature. It predicts that increasing pressure raises the saturation (boiling) temperature \u2014 the core principle that lets a pressure cooker reach ~120\u00B0C.',
    },
    {
      id: 'u7-L1-Q3',
      type: 'multiple-choice',
      question: 'A cylindrical pressure cooker wall is under internal pressure. The hoop (circumferential) stress in the wall is:',
      options: [
        'Equal to the axial stress',
        'Twice the axial stress',
        'Half the axial stress',
        'Three times the axial stress',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect x="1" y="1" width="78" height="78" rx="8" fill="#58CC02" opacity="0.08"/><ellipse cx="40" cy="40" rx="22" ry="22" stroke="#3B8700" stroke-width="2" /><ellipse cx="40" cy="40" rx="18" ry="18" stroke="#3B8700" stroke-width="1" stroke-dasharray="2 2"/><line x1="40" y1="18" x2="40" y2="62" stroke="#6B7280" stroke-width="0.8" stroke-dasharray="2 1.5"/><line x1="18" y1="40" x2="62" y2="40" stroke="#6B7280" stroke-width="0.8" stroke-dasharray="2 1.5"/><marker id="ah" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path d="#58CC02" fill="#58CC02" d="M0,0 L4,1.5 L0,3Z"/></marker><marker id="ag" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto"><path fill="#3B8700" d="M0,0 L4,1.5 L0,3Z"/></marker><line x1="62" y1="40" x2="70" y2="40" stroke="#58CC02" stroke-width="2" marker-end="url(#ah)"/><line x1="18" y1="40" x2="10" y2="40" stroke="#58CC02" stroke-width="2" marker-end="url(#ah)"/><line x1="40" y1="62" x2="40" y2="70" stroke="#58CC02" stroke-width="2" marker-end="url(#ah)"/><line x1="40" y1="18" x2="40" y2="10" stroke="#58CC02" stroke-width="2" marker-end="url(#ah)"/><line x1="40" y1="18" x2="40" y2="13" stroke="#3B8700" stroke-width="1.5" marker-end="url(#ag)"/><line x1="40" y1="62" x2="40" y2="67" stroke="#3B8700" stroke-width="1.5" marker-end="url(#ag)"/><text x="71" y="38" font-size="5" fill="#334155" font-style="italic">σ_h</text><text x="43" y="9" font-size="5" fill="#334155" font-style="italic">σ_a</text><text x="25" y="77" font-size="4" fill="#6B7280">Hoop = 2× Axial</text><g><circle cx="30" cy="35" r="1" fill="#A5E86C"><animate attributeName="cx" values="30;25;30" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></circle><circle cx="50" cy="45" r="1" fill="#A5E86C"><animate attributeName="cx" values="50;55;50" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></circle><circle cx="40" cy="30" r="1" fill="#A5E86C"><animate attributeName="cy" values="30;25;30" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></circle><circle cx="40" cy="50" r="1" fill="#A5E86C"><animate attributeName="cy" values="50;55;50" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></circle></g></svg>`,
      correctIndex: 1,
      explanation: 'For a thin-walled pressure vessel, hoop stress = pR/t and axial stress = pR/(2t). The hoop stress is exactly twice the axial stress, which is why pressure vessels tend to split along their length (longitudinal seam) rather than around their circumference.',
    },
    {
      id: 'u7-L1-Q4',
      type: 'true-false',
      question: 'The safety valve on a pressure cooker is a dead-weight relief valve \u2014 it lifts when internal pressure exceeds the force of a calibrated weight divided by the valve seat area.',
      correctAnswer: true,
      explanation: 'A dead-weight relief valve opens when pressure \u00D7 seat area > weight force. This is a simple, reliable design: P_set = W/A. No springs or electronics needed \u2014 gravity and Newton\'s second law do the job.',
    },

    // --- REFRIGERATOR (Q5-Q8) ---
    {
      id: 'u7-L1-Q5',
      type: 'multiple-choice',
      question: 'In a household refrigerator, the evaporator is located:',
      options: [
        'Behind the refrigerator near the floor',
        'Inside the fridge/freezer compartment',
        'On top of the compressor',
        'Inside the condenser coils',
      ],
      correctIndex: 1,
      explanation: 'The evaporator is inside the compartment where refrigerant absorbs heat by evaporating at low pressure. The condenser is on the back/bottom exterior, where it rejects heat to the kitchen. Heat flows from food \u2192 evaporator \u2192 compressor \u2192 condenser \u2192 kitchen air.',
    },
    {
      id: 'u7-L1-Q6',
      type: 'multiple-choice',
      question: 'A refrigerator has a COP of 4. This means:',
      options: [
        'It converts 4 kW of electricity into 4 kW of cooling',
        'For every 1 kW of electrical work input, it removes 4 kW of heat from the food compartment',
        'It operates at 400% of Carnot efficiency',
        'It rejects 4 times more heat than it absorbs',
      ],
      correctIndex: 1,
      explanation: 'COP (Coefficient of Performance) = Q_cold / W_in. A COP of 4 means 1 kW of compressor work moves 4 kW of heat out of the fridge. Note COP > 1 is normal for refrigeration \u2014 it\'s not an efficiency, it\'s a ratio of desired output to work input.',
    },
    {
      id: 'u7-L1-Q7',
      type: 'fill-blank',
      question: 'In the vapor-compression refrigeration cycle, the ___ reduces refrigerant pressure without extracting work, causing a temperature drop via throttling.',
      blanks: ['expansion valve'],
      wordBank: ['expansion valve', 'compressor', 'evaporator', 'condenser', 'accumulator'],
      explanation: 'The expansion valve (or capillary tube) is an isenthalpic throttling device. It drops the high-pressure liquid refrigerant to low pressure, causing partial flash evaporation and a sharp temperature drop \u2014 no moving parts or work extraction needed.',
    },
    {
      id: 'u7-L1-Q8',
      type: 'true-false',
      question: 'In a refrigerator\'s vapor-compression cycle, the refrigerant enters the compressor as a superheated vapor and leaves the condenser as a subcooled liquid.',
      correctAnswer: true,
      explanation: 'The compressor takes in low-pressure superheated vapor (to avoid liquid slugging) and compresses it to high-pressure superheated vapor. The condenser then cools and condenses it into a subcooled liquid, ensuring no vapor bubbles reach the expansion valve.',
    },

    // --- FAUCET/TAP (Q9-Q11) ---
    {
      id: 'u7-L1-Q9',
      type: 'multiple-choice',
      question: 'A kitchen faucet aerator mixes air into the water stream. From a fluid mechanics perspective, this works primarily by:',
      options: [
        'Increasing the water pressure inside the faucet body',
        'Using venturi-effect pressure drop to entrain air into the stream',
        'Heating the water to reduce its viscosity',
        'Creating turbulence that increases flow rate',
      ],
      correctIndex: 1,
      explanation: 'The aerator\'s small orifices accelerate water, which by Bernoulli\'s principle lowers local static pressure below atmospheric. This pressure difference draws ambient air into the stream (venturi/ejector effect), producing a bubbly, voluminous-feeling flow while using less water.',
    },
    {
      id: 'u7-L1-Q10',
      type: 'multiple-choice',
      question: 'Municipal water pressure is typically 40-60 psi at the tap. If you partially close the faucet valve, the flow rate decreases because:',
      options: [
        'The water temperature drops, increasing viscosity',
        'The valve increases flow resistance, creating a larger pressure drop across itself',
        'The pipe diameter upstream of the valve shrinks',
        'The supply pressure decreases automatically',
      ],
      correctIndex: 1,
      explanation: 'A valve acts as a variable-resistance element. Partially closing it reduces the flow area, increasing the local pressure drop across the valve. With a fixed supply pressure, more pressure is "used up" across the valve restriction, leaving less to drive flow \u2014 so flow rate decreases.',
    },
    {
      id: 'u7-L1-Q11',
      type: 'fill-blank',
      question: 'A single-handle kitchen faucet uses a ___ valve that controls both flow rate and hot/cold mixing ratio with one lever movement.',
      blanks: ['cartridge'],
      wordBank: ['cartridge', 'globe', 'butterfly', 'gate', 'check'],
      explanation: 'Modern single-handle faucets use a ceramic disc cartridge valve. Rotating the cartridge adjusts the overlap between hot and cold inlet ports (mixing ratio), while lifting it opens both ports proportionally (flow rate). Two degrees of freedom from one handle.',
    },

    // --- KITCHEN KNIFE (Q12-Q14) ---
    {
      id: 'u7-L1-Q12',
      type: 'multiple-choice',
      question: 'A sharp kitchen knife cuts more easily than a dull one because:',
      options: [
        'The sharp knife is made of harder steel',
        'The thin edge concentrates the applied force over a tiny area, creating very high stress',
        'The sharp blade has lower friction coefficient',
        'The sharp edge vibrates at a frequency that breaks molecular bonds',
      ],
      correctIndex: 1,
      explanation: 'Stress = Force / Area. A sharp knife edge might be only 0.01 mm wide, concentrating your hand force over a minuscule area. This creates enormous contact stress \u2014 easily exceeding the food\'s shear strength \u2014 even with modest force. This is pure stress concentration.',
    },
    {
      id: 'u7-L1-Q13',
      type: 'true-false',
      question: 'Ceramic kitchen knives are harder than steel knives but more brittle \u2014 they hold an edge longer but can shatter if dropped on a hard floor.',
      correctAnswer: true,
      explanation: 'Ceramic blades (typically zirconia, ZrO\u2082) have Vickers hardness around 1200 HV vs. ~600 HV for good steel. But ceramics have near-zero ductility \u2014 they cannot undergo plastic deformation. This means excellent edge retention but catastrophic brittle fracture under impact or bending loads.',
    },
    {
      id: 'u7-L1-Q14',
      type: 'multiple-choice',
      question: 'A knife blade is essentially a wedge. When you push a knife down into food, the wedge converts vertical force into:',
      options: [
        'Axial tension along the blade',
        'Lateral (sideways) forces that push the food apart',
        'Torsional shear along the cutting edge',
        'Bending moments in the blade',
      ],
      correctIndex: 1,
      explanation: 'A wedge is an inclined plane that converts axial input force into perpendicular lateral forces. The smaller the wedge angle, the greater the mechanical advantage \u2014 which is why thin knife blades separate material more easily with less downward force.',
    },

    // --- MICROWAVE (Q15-Q17) ---
    {
      id: 'u7-L1-Q15',
      type: 'multiple-choice',
      question: 'A microwave oven heats food primarily through:',
      options: [
        'Infrared radiation absorbed by the food surface',
        'Convection currents of hot air inside the cavity',
        'Dielectric heating \u2014 polar water molecules oscillate in the electromagnetic field, generating internal friction',
        'Conduction from the metal walls to the food',
      ],
      correctIndex: 2,
      explanation: 'Microwaves (~2.45 GHz) cause polar molecules (mainly water) to rotate and align with the oscillating electric field billions of times per second. This molecular friction converts electromagnetic energy into thermal energy throughout the food\'s volume \u2014 volumetric heating, not surface heating.',
    },
    {
      id: 'u7-L1-Q16',
      type: 'true-false',
      question: 'Microwave ovens can produce hot spots and cold spots in food because the standing electromagnetic waves inside the cavity create nodes (zero amplitude) and antinodes (maximum amplitude).',
      correctAnswer: true,
      explanation: 'The microwave cavity dimensions create standing wave patterns with fixed nodes and antinodes. Food at antinodes gets intense heating; food at nodes gets almost none. This is why microwaves have turntables \u2014 rotating the food averages out the uneven field pattern.',
    },
    {
      id: 'u7-L1-Q17',
      type: 'fill-blank',
      question: 'In a conventional oven, heat reaches the food\'s interior from its hot surface via ___, which is slow because food has low thermal conductivity. Microwaves bypass this entirely by heating volumetrically.',
      blanks: ['conduction'],
      wordBank: ['conduction', 'radiation', 'induction', 'sublimation', 'advection'],
      explanation: 'A conventional oven heats the food surface (by radiation and convection from hot air), then heat conducts inward following Fourier\'s law. This inward conduction step is the bottleneck — food has low thermal conductivity (~0.5 W/m·K). Microwaves bypass this by depositing energy directly inside the food volume.',
    },

    // --- POT/PAN ON STOVE (Q18-Q20) ---
    {
      id: 'u7-L1-Q18',
      type: 'multiple-choice',
      question: 'Copper-bottomed pots heat food more evenly than plain stainless steel pots because:',
      options: [
        'Copper has a higher melting point than stainless steel',
        'Copper has much higher thermal conductivity (~400 W/m\u00B7K vs ~15 W/m\u00B7K), spreading heat laterally across the base',
        'Copper is lighter, allowing faster heat absorption',
        'Copper has higher specific heat capacity, storing more energy',
      ],
      correctIndex: 1,
      explanation: 'Copper\'s thermal conductivity is roughly 25x that of stainless steel. A copper base spreads heat laterally from the burner contact area across the entire pan bottom, reducing hot spots. This is why high-end cookware uses copper or aluminum (k \u2248 235) cores clad in stainless steel.',
    },
    {
      id: 'u7-L1-Q19',
      type: 'multiple-choice',
      question: 'When boiling water in a pot, the primary heat transfer mechanism within the water itself is:',
      options: [
        'Conduction between water molecules',
        'Radiation from the pot walls',
        'Natural convection \u2014 buoyancy-driven circulation of hot and cold water',
        'Forced convection from a built-in impeller',
      ],
      correctIndex: 2,
      explanation: 'The pot base heats the bottom water layer, which expands and becomes less dense. Buoyancy causes it to rise while cooler, denser water sinks \u2014 creating natural convection currents. This circulation distributes heat far faster than conduction alone through the still liquid.',
    },
    {
      id: 'u7-L1-Q20',
      type: 'multiple-choice',
      question: 'Fourier\'s law (q = -k dT/dx) governs heat transfer through the solid base of a pot on a stove. If you double the pot base thickness while keeping everything else the same, the heat flow rate through the base will:',
      options: [
        'Double, because more material conducts more heat',
        'Stay the same, because the temperature difference hasn\'t changed',
        'Halve, because the temperature gradient dT/dx is cut in half',
        'Quadruple, because resistance scales with thickness squared',
      ],
      correctIndex: 2,
      explanation: 'Fourier\'s law: q = -k \u00B7 \u0394T / L. Doubling thickness L doubles the thermal resistance (R = L/kA), halving the heat flux for the same temperature difference. This is why thin-based pans heat faster \u2014 and why ultra-thick cast iron takes longer to reach cooking temperature.',
    },
  ],
};

export const lesson2: Lesson = {
  id: 'u7-L2',
  title: 'The Car You Drive',
  description: 'How engines, brakes, suspension, tires, and transmissions apply thermodynamics, dynamics, and solid mechanics.',
  icon: '🚗',
  xpReward: 25,
  questions: [
    // --- ENGINE (Q1-Q4) ---
    {
      id: 'u7-L2-Q1',
      type: 'multiple-choice',
      question: 'The four strokes of a gasoline engine follow the Otto cycle. Which stroke performs useful work?',
      options: [
        'Intake stroke (piston moves down, air-fuel drawn in)',
        'Compression stroke (piston moves up, mixture compressed)',
        'Power stroke (combustion gases expand, pushing piston down)',
        'Exhaust stroke (piston pushes burnt gases out)',
      ],
      correctIndex: 2,
      explanation: 'Only the power (expansion) stroke produces net positive work on the piston. The other three strokes are "overhead" \u2014 intake and exhaust require small pumping work, and compression requires significant work input. The power stroke must produce enough work to cover all three plus deliver useful output.',
    },
    {
      id: 'u7-L2-Q2',
      type: 'multiple-choice',
      question: 'The thermal efficiency of an ideal Otto cycle depends primarily on:',
      options: [
        'The fuel type and octane rating',
        'The compression ratio',
        'The engine displacement in liters',
        'The number of cylinders',
      ],
      correctIndex: 1,
      explanation: 'For an ideal Otto cycle, thermal efficiency \u03B7 = 1 - (1/r^(\u03B3-1)), where r is the compression ratio and \u03B3 is the specific heat ratio. Higher compression ratio = higher efficiency. This is a pure thermodynamic result \u2014 it doesn\'t depend on engine size or number of cylinders.',
    },
    {
      id: 'u7-L2-Q3',
      type: 'true-false',
      question: 'Diesel engines are more thermally efficient than gasoline engines primarily because they operate at higher compression ratios.',
      correctAnswer: true,
      explanation: 'Diesel engines compress only air (no fuel to pre-ignite), allowing compression ratios of 15-22:1 vs. 8-12:1 for gasoline. Since Otto cycle efficiency increases with compression ratio (\u03B7 = 1 - 1/r^(\u03B3-1)), diesel engines achieve higher thermal efficiency \u2014 typically 35-45% vs. 25-35% for gasoline.',
    },
    {
      id: 'u7-L2-Q4',
      type: 'fill-blank',
      question: 'In the Otto cycle, both heat addition and heat rejection occur at constant ___, which distinguishes it from the Diesel cycle where heat is added at constant pressure.',
      blanks: ['volume'],
      wordBank: ['volume', 'pressure', 'temperature', 'entropy', 'enthalpy'],
      explanation: 'The Otto cycle idealizes gasoline combustion as constant-volume heat addition (fuel burns so fast the piston barely moves). The Diesel cycle models slower fuel injection as constant-pressure heat addition. This distinction is key for analyzing each engine type on a P-v or T-s diagram.',
    },

    // --- SUSPENSION (Q5-Q7) ---
    {
      id: 'u7-L2-Q5',
      type: 'multiple-choice',
      question: 'A car suspension consists of a spring and a shock absorber (damper) in parallel. The damper\'s primary role is to:',
      options: [
        'Support the static weight of the car',
        'Increase the natural frequency of the suspension',
        'Dissipate vibrational energy as heat, preventing prolonged bouncing',
        'Reduce the spring rate to improve comfort',
      ],
      correctIndex: 2,
      explanation: 'The spring supports the car\'s weight and absorbs bumps, but a spring alone would bounce indefinitely. The damper converts kinetic energy of oscillation into heat (via viscous fluid forced through orifices), controlling how quickly oscillations decay. Without it, the car would keep bouncing after every bump.',
    },
    {
      id: 'u7-L2-Q6',
      type: 'multiple-choice',
      question: 'A car suspension is designed to be underdamped. What does this mean in vibration terms?',
      options: [
        'The system never oscillates \u2014 it returns to equilibrium without overshooting',
        'The system oscillates with gradually decreasing amplitude before settling',
        'The system oscillates with constant amplitude forever',
        'The system returns to equilibrium as fast as possible without oscillation',
      ],
      correctIndex: 1,
      explanation: 'An underdamped system (damping ratio \u03B6 < 1) oscillates with exponentially decaying amplitude. This gives the best ride comfort \u2014 it absorbs bumps quickly but allows a small amount of controlled oscillation. Overdamped (\u03B6 > 1) feels harsh; critically damped (\u03B6 = 1) is fastest without oscillation but too stiff for comfort.',
    },
    {
      id: 'u7-L2-Q7',
      type: 'fill-blank',
      question: 'The natural frequency of a car\'s suspension is approximately f = (1/2\u03C0)\u221A(k/m), where k is the ___ and m is the sprung mass.',
      blanks: ['spring rate'],
      wordBank: ['spring rate', 'damping coefficient', 'natural frequency', 'static deflection', 'moment of inertia'],
      explanation: 'The spring rate (or spring constant, k, in N/m) determines how stiff the suspension is. Combined with the sprung mass (car body mass supported by the spring), it sets the natural frequency. Typical car suspensions are tuned to ~1-1.5 Hz for ride comfort \u2014 close to human walking cadence.',
    },

    // --- BRAKES (Q8-Q10) ---
    {
      id: 'u7-L2-Q8',
      type: 'multiple-choice',
      question: 'When you press the brake pedal and the car decelerates from 100 km/h to 0, the kinetic energy of the car is:',
      options: [
        'Destroyed according to Newton\'s first law',
        'Converted to heat in the brake pads and rotors via friction',
        'Stored in the brake fluid as pressure energy',
        'Returned to the engine as back-EMF',
      ],
      correctIndex: 1,
      explanation: 'By conservation of energy, the car\'s kinetic energy (\u00BDmv\u00B2) must go somewhere. Friction between the brake pad and rotor converts kinetic energy into thermal energy. After hard braking, rotors can reach 300-500\u00B0C. This is why brake cooling (ventilated rotors, air ducts) is a critical design concern.',
    },
    {
      id: 'u7-L2-Q9',
      type: 'true-false',
      question: 'Disc brakes are preferred over drum brakes for front axles because disc brakes dissipate heat more effectively \u2014 the rotor is exposed to airflow on both sides.',
      correctAnswer: true,
      explanation: 'Disc brakes have an exposed rotor swept by ambient air on both faces, giving excellent convective heat dissipation. Drum brakes enclose the friction surfaces inside a drum, trapping heat. Since front brakes handle 60-70% of braking force (due to weight transfer), they need superior cooling \u2014 hence disc brakes up front.',
    },
    {
      id: 'u7-L2-Q10',
      type: 'multiple-choice',
      question: 'Braking force between the tire and road depends on the friction equation F = \u03BCN. During hard braking with weight transfer to the front, the front brakes can generate more stopping force because:',
      options: [
        'Front brake pads have a higher friction coefficient',
        'The normal force N on the front tires increases due to forward weight transfer',
        'The front wheels spin faster than the rear wheels',
        'The front tires have a larger contact patch by design',
      ],
      correctIndex: 1,
      explanation: 'During deceleration, the car\'s center of gravity is above the road, creating a moment that transfers load to the front axle (and unloads the rear). Since friction force F = \u03BCN, increased normal force N on the front tires allows greater braking force. This is why front brakes are larger and do more work.',
    },

    // --- TRANSMISSION (Q11-Q13) ---
    {
      id: 'u7-L2-Q11',
      type: 'multiple-choice',
      question: 'In first gear, a transmission provides high torque but low speed at the wheels. This is because:',
      options: [
        'The engine produces more power in first gear',
        'A small engine gear drives a large output gear, multiplying torque at the cost of speed',
        'The clutch slips more in first gear, adding torque',
        'First gear bypasses the differential',
      ],
      correctIndex: 1,
      explanation: 'In first gear, a small engine gear meshes with a large output gear. The gear ratio (N_driven/N_driver > 1) multiplies engine torque by the ratio but divides speed by the same ratio. Power is conserved (P = T\u03C9), so you trade speed for torque \u2014 essential for accelerating from a stop.',
    },
    {
      id: 'u7-L2-Q12',
      type: 'fill-blank',
      question: 'A gear ratio of 3:1 means the output shaft has ___ times the torque but one-third the rotational speed of the input shaft.',
      blanks: ['three'],
      wordBank: ['three', 'one-third', 'nine', 'six', 'one'],
      explanation: 'Gear ratio = input speed / output speed = output torque / input torque (assuming no losses). A 3:1 ratio triples torque and cuts speed to one-third. Power (P = T\u00D7\u03C9) is conserved. This is why low gears give high torque for hill climbing and acceleration.',
    },
    {
      id: 'u7-L2-Q13',
      type: 'true-false',
      question: 'An automatic transmission\'s torque converter can multiply engine torque at low speeds, acting like a fluid coupling with a stator that redirects flow.',
      correctAnswer: true,
      explanation: 'A torque converter uses three elements: impeller (pump), turbine, and stator. At low speed ratios, the stator redirects fluid exiting the turbine back into the impeller at a favorable angle, multiplying torque by up to 2-3x. At cruise speed, the torque converter locks up for direct mechanical coupling and efficiency.',
    },

    // --- TIRES (Q14-Q16) ---
    {
      id: 'u7-L2-Q14',
      type: 'multiple-choice',
      question: 'The contact patch (tire footprint) is the area where the tire touches the road. For a tire supporting 4000 N of load inflated to 200 kPa, the approximate contact patch area is:',
      options: [
        '20 cm\u00B2',
        '200 cm\u00B2 (about the size of a postcard)',
        '2000 cm\u00B2',
        '2 cm\u00B2',
      ],
      correctIndex: 1,
      explanation: 'The contact patch area approximately equals the load divided by inflation pressure: A = F/P = 4000 N / 200,000 Pa = 0.02 m\u00B2 = 200 cm\u00B2. This is roughly the size of a postcard \u2014 a surprisingly small area connecting a 1500 kg car to the road. All acceleration, braking, and turning forces pass through these four patches.',
    },
    {
      id: 'u7-L2-Q15',
      type: 'multiple-choice',
      question: 'Hydroplaning occurs when a car drives through standing water and the tires lose contact with the road. From a fluid mechanics perspective, this happens because:',
      options: [
        'Water lubricates the rubber, reducing the friction coefficient to zero',
        'A wedge of water builds up faster than the tire tread can channel it away, lifting the tire off the road surface',
        'Water increases tire temperature, causing the rubber to melt',
        'The water freezes under pressure, creating an ice layer',
      ],
      correctIndex: 1,
      explanation: 'At high speed, the tire cannot displace water fast enough through its tread grooves. Hydrodynamic pressure builds in the water wedge ahead of the contact patch, eventually exceeding the tire\'s inflation pressure and lifting the tire off the road. The tire is now floating on a water film with virtually zero traction.',
    },
    {
      id: 'u7-L2-Q16',
      type: 'fill-blank',
      question: 'Tire inflation pressure creates ___ stress in the tire sidewall, similar to a thin-walled pressure vessel, which is why underinflated tires flex excessively and overheat.',
      blanks: ['hoop'],
      wordBank: ['hoop', 'shear', 'bending', 'torsional', 'bearing'],
      explanation: 'An inflated tire is essentially a toroidal pressure vessel. Internal air pressure creates circumferential (hoop) stress in the reinforcing cords and rubber. Underinflation reduces this pre-tension, allowing excessive sidewall flexing during rolling, which generates hysteresis heat and can lead to blowout failure.',
    },

    // --- STEERING (Q17-Q18) ---
    {
      id: 'u7-L2-Q17',
      type: 'multiple-choice',
      question: 'Power steering reduces the effort needed to turn the wheel. In a hydraulic power steering system, the assist comes from:',
      options: [
        'An electric motor directly turning the steering column',
        'Pressurized hydraulic fluid acting on a piston in the steering rack, amplifying driver input',
        'A gear reducer between the steering wheel and the rack',
        'Reduced friction in the steering knuckle bearings',
      ],
      correctIndex: 1,
      explanation: 'Hydraulic power steering uses an engine-driven pump to pressurize fluid. When you turn the wheel, a rotary valve directs pressurized fluid to one side of a piston in the rack housing, adding hydraulic force to your steering effort. Pascal\'s principle: pressure \u00D7 piston area = large assist force.',
    },
    {
      id: 'u7-L2-Q18',
      type: 'multiple-choice',
      question: 'Ackermann steering geometry ensures that during a turn:',
      options: [
        'Both front wheels turn at exactly the same angle',
        'The inner wheel turns at a greater angle than the outer wheel, so both wheels trace arcs from the same center point',
        'The rear wheels also turn to reduce the turning radius',
        'The steering ratio changes with vehicle speed',
      ],
      correctIndex: 1,
      explanation: 'In a turn, the inner wheel traces a tighter arc than the outer wheel. If both turned at the same angle, the inner tire would scrub (slip sideways). Ackermann geometry angles the steering arms so the inner wheel turns more, ensuring all four wheels rotate about a common instantaneous center \u2014 eliminating tire scrub.',
    },

    // --- EXHAUST (Q19-Q20) ---
    {
      id: 'u7-L2-Q19',
      type: 'multiple-choice',
      question: 'An exhaust manifold experiences significant thermal expansion because exhaust gases can reach 700-900\u00B0C. Engineers accommodate this expansion by:',
      options: [
        'Making the manifold from a material with zero thermal expansion',
        'Using flexible joints, slip connections, or bellows sections that absorb dimensional changes',
        'Cooling the manifold to room temperature before it exits the engine bay',
        'Bolting the manifold rigidly at every point to prevent movement',
      ],
      correctIndex: 1,
      explanation: 'Thermal expansion (\u0394L = \u03B1 \u00B7 L \u00B7 \u0394T) is unavoidable. A 0.5 m steel manifold heating by 700\u00B0C expands about 4 mm. Rigid mounting would create enormous thermal stresses leading to cracking. Flexible joints and bellows sections allow the manifold to expand freely, preventing thermally-induced fatigue failure.',
    },
    {
      id: 'u7-L2-Q20',
      type: 'true-false',
      question: 'Excessive exhaust backpressure reduces engine performance because it increases the pumping work the engine must do during the exhaust stroke, leaving less net work available at the crankshaft.',
      correctAnswer: true,
      explanation: 'During the exhaust stroke, the piston pushes burnt gases out against the exhaust system\'s backpressure. Higher backpressure means more pumping work (area on the P-v diagram below the exhaust line increases). This parasitic loss reduces net indicated work and thus brake power. This is why restrictive exhausts or clogged catalytic converters hurt performance.',
    },
  ],
};
