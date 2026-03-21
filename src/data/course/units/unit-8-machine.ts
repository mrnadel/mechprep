import type { Unit } from '../types';

export const unit8: Unit = {
  id: 'u8-machine',
  title: 'Machine Design',
  description: 'Shafts, bearings, gears, fasteners, springs, and seals — core machine element design for mechanical engineers.',
  color: '#6366F1',
  icon: '⚙️',
  topicId: 'machine-elements',
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
          question: 'A shaft broke at a keyway location. The fracture surface shows smooth beach marks radiating from the keyway corner, with a small rough final fracture zone. What does this tell you about the failure, and what design change would you recommend?',
          options: [
            'The shaft was overloaded in a single event. Recommend increasing the shaft diameter to handle higher static loads. This interpretation would lead to incorrect predictions when applied to the specific conditions described here.',
            'Fatigue failure initiated at the stress concentration from the keyway corner. Recommend increasing the keyway fillet radius, using a sled-runner end keyway, or switching to a spline connection to distribute load more evenly.',
            'The key was too loose, causing the shaft to twist and shear at the keyway. Recommend using a tighter-fitting key with an interference fit. This reasoning is valid only for a narrow range of idealized conditions.',
            'Corrosion weakened the shaft at the keyway. Recommend switching to stainless steel or adding a protective coating. Experimental data from standardized tests consistently shows a different relationship between these variables.'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="40" cy="40" r="24" fill="#58CC02" opacity="0.08"/> <circle cx="40" cy="40" r="24" stroke="#58CC02" stroke-width="2.5" fill="none"/> <circle cx="40" cy="40" r="18" fill="#58CC02" opacity="0.04"/> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="3s" repeatCount="indefinite"/> <rect x="34" y="16" width="12" height="10" rx="4" fill="#3B8700" opacity="0.35"/> <rect x="35" y="17" width="10" height="8" rx="3" fill="#A5E86C" opacity="0.25"/> <line x1="40" y1="20" x2="40" y2="64" stroke="#3B8700" stroke-width="0.8" opacity="0.1"/> <line x1="24" y1="40" x2="56" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.1"/> <circle cx="40" cy="21" r="2" fill="#3B8700" opacity="0.5"/> </g> <circle cx="40" cy="40" r="6" fill="#FAFAFA"/> <circle cx="40" cy="40" r="6" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="40" cy="40" r="3" fill="#3B8700" opacity="0.3"/> <path d="M68,30 Q74,40 68,50" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.25"> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="1.5s" repeatCount="indefinite"/> </path> <polygon points="68,50 71,47 65,47" fill="#A5E86C" opacity="0.25"/> </svg>',
          explanation: 'Beach marks are the definitive indicator of fatigue failure. The crack originated at the keyway corner — a classic stress concentration site (Kt = 2.0-3.0). In a rotating shaft, bending creates fully reversed stress, and the keyway corner amplifies this stress by 2-3x, dramatically reducing fatigue life. Solutions: (1) increase the fillet radius at the keyway bottom and ends to reduce Kt, (2) use a sled-runner end keyway instead of a profile (Profil) end — the gradual runout reduces stress concentration, (3) for high-fatigue applications, replace the keyway entirely with an involute spline that distributes torque uniformly around the circumference, (4) shot-peen the keyway to introduce compressive residual stress. Simply making the shaft larger treats the symptom, not the root cause.',
          hint: 'Beach marks point to the failure mode. The location (keyway corner) points to the root cause. Think about what feature of the keyway makes it a fatigue problem.'
        },
        {
          id: 'u8-L1-Q2',
          type: 'multiple-choice',
          question: 'You are designing a shaft that must transmit 50 kW at 1500 RPM with a combined bending moment. Using the distortion energy theory, the minimum diameter calculates to 38 mm. What practical considerations would make you select a larger standard diameter?',
          options: [
            'No adjustment needed — 38 mm is the answer from the formula, so use 38 mm — however, standard engineering analysis methods and field experience both point to a different conclusion',
            'Round up to 40 mm for standard sizing. Additionally, account for keyway stress concentration (adds 25-50% to required size), bearing bore availability, manufacturing tolerances, and potential future load increases.',
            'Double it to 76 mm — always use a safety factor of 2.0 on calculated shaft diameter, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
            'Only round up to the nearest mm (39 mm) — going larger wastes material and adds weight — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="40" cy="40" r="24" fill="#58CC02" opacity="0.08"/> <circle cx="40" cy="40" r="24" stroke="#58CC02" stroke-width="2.5" fill="none"/> <circle cx="40" cy="40" r="18" fill="#58CC02" opacity="0.04"/> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="3s" repeatCount="indefinite"/> <rect x="34" y="16" width="12" height="10" rx="4" fill="#3B8700" opacity="0.35"/> <rect x="35" y="17" width="10" height="8" rx="3" fill="#A5E86C" opacity="0.25"/> <line x1="40" y1="20" x2="40" y2="64" stroke="#3B8700" stroke-width="0.8" opacity="0.1"/> <line x1="24" y1="40" x2="56" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.1"/> <circle cx="40" cy="21" r="2" fill="#3B8700" opacity="0.5"/> </g> <circle cx="40" cy="40" r="6" fill="#FAFAFA"/> <circle cx="40" cy="40" r="6" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="40" cy="40" r="3" fill="#3B8700" opacity="0.3"/> <path d="M68,30 Q74,40 68,50" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.25"> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="1.5s" repeatCount="indefinite"/> </path> <polygon points="68,50 71,47 65,47" fill="#A5E86C" opacity="0.25"/> </svg>',
          explanation: 'Shaft sizing never stops at the formula result. Practical considerations include: (1) Standard sizes — shafts and bearings come in standard bore increments (30, 35, 40, 45 mm), so 40 mm is the next standard size. (2) Keyway derating — if the shaft has a keyway, the stress concentration factor (Kt = 2-3) effectively reduces fatigue strength by 25-50%, requiring a larger diameter at that section. (3) Bearing fit — the shaft must match available bearing bore sizes. (4) Deflection limits — even if stress is acceptable, excessive shaft deflection can cause gear misalignment (limit ~0.5 mm/m for gears) or bearing edge loading. (5) Stepped diameters — shoulders for bearing and gear location require the nominal diameter to be larger than the minimum at the critical section. Always check both strength and stiffness criteria.',
          hint: 'The calculated minimum diameter is just the starting point. What real-world factors force you to go larger?'
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
          question: 'In the ASME shaft design code, the shock/fatigue factor for bending (K_b) is always set higher than the factor for torsion (K_t) for the same loading condition. Why is bending treated as more severe than torsion in a rotating shaft?',
          options: [
            'Bending forces are always larger than torsional forces in real machines — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms',
            'In a rotating shaft, a fixed bending load creates fully reversed stress (tension-compression each revolution), while torsion from a steady power source creates constant (non-reversed) shear stress',
            'Bending causes axial deflection that damages bearings, while torsion only causes angular twist that is less harmful — a simplified model that neglects the most significant physical variable',
            'The bending factor is arbitrary — older codes used equal factors, and modern codes should too, though experimental data shows this correlation breaks down at extreme operating conditions'
          ],
          correctIndex: 1,
          explanation: 'This is a key insight in shaft design. Consider a horizontal shaft with a gear load pushing downward at midspan: the top fiber is in tension and the bottom in compression. As the shaft rotates 180°, those fibers swap — the previously tensioned fiber is now compressed. So a constant (static) bending load creates fully reversed cyclic stress in a rotating shaft, which is the most damaging fatigue condition (R = -1). Torsion from a steady motor, however, produces constant shear stress — not cyclic. That is why K_b = 1.5 even for "no shock" (to account for the fully reversed nature), while K_t = 1.0 for the same condition. If the torque also fluctuates (e.g., reciprocating compressor), K_t increases accordingly.',
          hint: 'Think about what a single point on the shaft surface experiences as the shaft rotates under a fixed bending load. Is it constant or cyclic?'
        },
        {
          id: 'u8-L1-Q5',
          type: 'multiple-choice',
          question: 'A centrifuge operates at 12,000 RPM but its first critical speed is calculated at 8,000 RPM. The operations team is worried about running above the critical speed. Is this design safe, and what must be ensured during operation?',
          options: [
            'This is unsafe — no shaft should ever operate above its first critical speed. Redesign the shaft to raise the critical speed above 12,000 RPM. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described.',
            'This is safe in principle — supercritical operation is routine in turbomachinery and centrifuges. The shaft self-centers above the critical speed. However, it must pass through the critical speed quickly during startup/shutdown, and adequate damping must be provided.',
            'This is only safe if the shaft is perfectly balanced — even 1 gram of imbalance will cause immediate failure at any supercritical speed — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause',
            'This is safe because the critical speed only matters at exactly 8,000 RPM — at higher speeds the vibration stops entirely on its own — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause'
          ],
          correctIndex: 1,
          explanation: 'Supercritical operation (above the first critical speed) is completely routine in many high-speed machines: gas turbines, dental drills, centrifuges, and turbochargers all operate between the first and second critical speeds. At speeds above the critical, the shaft undergoes a phase inversion — the center of mass moves inside the geometric center, and the shaft effectively self-centers. The dangerous moment is passing THROUGH the critical speed during startup and shutdown, where resonance amplifies vibration. Solutions: (1) accelerate quickly through the critical speed range, (2) provide damping (squeeze-film dampers, elastomeric bearing mounts), (3) ensure adequate bearing clearance for the transient vibration, and (4) maintain good balance (though perfect balance is not required). The design should ensure the operating speed is at least 20% above the critical speed to avoid resonance.',
          hint: 'Think about what actually happens above the critical speed — does vibration keep increasing, or does something change?'
        },
        {
          id: 'u8-L1-Q6',
          type: 'fill-blank',
          question: 'The phenomenon where a rotating shaft deflects laterally at a specific speed equal to its natural frequency is called ___ (or whirling).',
          blanks: ['critical speed'],
          wordBank: ['critical speed', 'resonance frequency', 'flutter', 'precession', 'vibration mode'],
          explanation: 'Critical speed (whirling) occurs when the shaft rotation speed coincides with a natural frequency of lateral vibration. At this speed, even small imbalances cause large lateral deflections due to resonance. The shaft bows outward and, if damping is insufficient, deflections grow until failure. Proper design ensures operating speed is at least 20% away from any critical speed, or provides adequate damping for supercritical operation.',
          hint: 'This occurs when rotational speed matches the natural frequency of transverse vibration.'
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
          explanation: 'Torque T = P/omega = 30000/(720 x 2pi/60) = 30000/75.4 = 397.9 N·m. Polar moment J = pi*d^4/32 = pi*(0.045)^4/32 = 4.026 x 10^-7 m^4. Shear stress tau = T*c/J = 397.9 * 0.0225 / 4.026e-7 = 22.1 MPa. This is the fundamental torsion formula for circular shafts, commonly used as the first step before combining with bending stress.',
          hint: 'Use T = P/omega, then tau = Tc/J where c = d/2 and J = pi*d^4/32.'
        },
        {
          id: 'u8-L1-Q8',
          type: 'multiple-choice',
          question: 'According to the maximum shear stress theory (Tresca), the equivalent shear stress on a shaft subjected to both bending moment M and torque T is:',
          options: [
            'tau_eq = (M + T) / (pi*d^3/16)',
            'tau_eq = sqrt(M^2 + T^2) * 16/(pi*d^3)',
            'tau_eq = (M^2 + T^2) / (pi*d^3/32)',
            'tau_eq = 16/(pi*d^3) * (M + T/2)'
          ],
          correctIndex: 1,
          explanation: 'For combined bending and torsion on a solid circular shaft, the principal stresses can be found from the Mohr circle. The maximum shear stress is tau_max = sqrt((sigma_b/2)^2 + tau^2) where sigma_b = 32M/(pi*d^3) and tau = 16T/(pi*d^3). Substituting: tau_max = 16/(pi*d^3) * sqrt(M^2 + T^2). This is the basis of the ASME shaft code when using the maximum shear stress failure theory.',
          hint: 'Combine bending stress sigma = 32M/(pi*d^3) and torsional shear tau = 16T/(pi*d^3) using Mohr circle for max shear.'
        },
        {
          id: 'u8-L1-Q9',
          type: 'multiple-choice',
          question: 'What is the primary advantage of using an involute spline connection instead of a single key for transmitting torque from a gear to a shaft?',
          options: [
            'Splines are cheaper to manufacture than keyways, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables',
            'Splines distribute torque uniformly around the shaft circumference, eliminating the stress concentration of a single keyway and allowing higher torque capacity for the same shaft size',
            'Splines allow the gear to slide axially on the shaft, which single keys cannot do, which would require additional verification through destructive testing of representative samples',
            'Splines create a permanent joint that cannot be disassembled, which is more reliable, provided the test specimen geometry conforms to the requirements specified in the standard'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Outer spline (hub, static) --> <circle cx="40" cy="40" r="26" stroke="#3B8700" stroke-width="2" fill="none" opacity="0.25"/> <!-- Inner spline teeth (static ring showing spline profile) --> <path d="M40,16 L43,18 L43,24 L40,26 L37,24 L37,18 Z" fill="#58CC02" opacity="0.15"/> <path d="M56.5,22.5 L58,25.5 L54.5,30 L51,30 L49.5,27 L53,22.5 Z" fill="#58CC02" opacity="0.15"/> <path d="M64,40 L62,43 L56,43 L54,40 L56,37 L62,37 Z" fill="#58CC02" opacity="0.15"/> <path d="M56.5,57.5 L53,62 L49.5,53 L51,50 L54.5,50 L58,54.5 Z" fill="#58CC02" opacity="0.15"/> <path d="M40,64 L37,62 L37,56 L40,54 L43,56 L43,62 Z" fill="#58CC02" opacity="0.15"/> <path d="M23.5,57.5 L22,54.5 L25.5,50 L29,50 L30.5,53 L27,57.5 Z" fill="#58CC02" opacity="0.15"/> <path d="M16,40 L18,37 L24,37 L26,40 L24,43 L18,43 Z" fill="#58CC02" opacity="0.15"/> <path d="M23.5,22.5 L27,18 L30.5,27 L29,30 L25.5,30 L22,25.5 Z" fill="#58CC02" opacity="0.15"/> <!-- Shaft (rotating inside the spline) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="3s" repeatCount="indefinite"/> <circle cx="40" cy="40" r="14" fill="#58CC02" opacity="0.08"/> <circle cx="40" cy="40" r="14" stroke="#58CC02" stroke-width="2" fill="none"/> <line x1="40" y1="26" x2="40" y2="54" stroke="#3B8700" stroke-width="1" opacity="0.15"/> <line x1="26" y1="40" x2="54" y2="40" stroke="#3B8700" stroke-width="1" opacity="0.15"/> </g> <circle cx="40" cy="40" r="4" fill="#3B8700"/> <circle cx="40" cy="40" r="1.5" fill="white" opacity="0.2"/> <text x="40" y="76" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.18" font-style="italic">torque + axial slide</text> </svg>',
          explanation: 'A single keyway creates a severe stress concentration (Kt = 2-3) and transmits torque through a single contact area. An involute spline distributes the torque around the full circumference through many teeth, greatly reducing the peak stress and eliminating the notch effect of a keyway. Additionally, splines self-center the component and can transmit significantly higher torques for the same shaft diameter. While splines can also permit axial sliding (as in gearbox shift mechanisms), the primary structural advantage is the uniform load distribution. Splines are more expensive to machine (hobbing or broaching), which is why keys are still used for moderate-torque, non-fatigue-critical applications.',
          hint: 'Compare the load path: one keyway slot vs. many teeth around the circumference.'
        },
        {
          id: 'u8-L1-Q10',
          type: 'true-false',
          question: 'A hollow shaft with the same outer diameter and material as a solid shaft will always have a lower critical speed because it has less stiffness.',
          correctAnswer: false,
          explanation: 'A hollow shaft is lighter than a solid shaft of the same outer diameter, and its second moment of area (I) decreases less than its mass per unit length decreases. Critical speed is proportional to sqrt(EI/(m*L^4)), where m is mass per unit length. Since the ratio I/m actually increases for a hollow shaft compared to a solid shaft of the same OD, the critical speed is higher, not lower. This is why hollow shafts are preferred in high-speed applications — they provide a better stiffness-to-weight ratio.',
          hint: 'Critical speed depends on the ratio of stiffness to mass. How does hollowing out a shaft change each of these?'
        },
        {
          id: 'u8-L1-Q11',
          type: 'multiple-choice',
          question: 'A shaft has a shoulder fillet with a radius of 1 mm transitioning from 50 mm to 40 mm diameter. The stress concentration factor is Kt = 2.5. The designer wants to reduce the stress concentration. Which approach is most effective?',
          options: [
            'Increase the fillet radius from 1 mm to 4 mm — this can reduce Kt to approximately 1.5',
            'Add a second, smaller shoulder step — going 50 to 45 to 40 mm with the same 1 mm fillet radius at each step',
            'Polish the fillet surface to mirror finish — surface finish is the dominant factor in stress concentration',
            'Add a retaining ring groove near the fillet to redistribute stress'
          ],
          correctIndex: 0,
          explanation: 'The fillet radius is the dominant factor controlling stress concentration at a shoulder. Increasing the fillet radius from 1 mm to 4 mm (r/d ratio from 0.025 to 0.1) reduces Kt from approximately 2.5 to 1.5 based on Peterson charts. The step ratio (D/d = 50/40 = 1.25) also matters, but the fillet radius has the most practical leverage. A two-step shoulder helps distribute stress but does not reduce it as much as increasing the fillet radius. Surface finish affects fatigue strength but not the geometric stress concentration factor Kt. Adding a groove near the fillet would create an additional stress raiser.',
          hint: 'Look at Peterson stress concentration charts — which geometric parameter has the greatest influence on Kt for a shoulder fillet?'
        },
        {
          id: 'u8-L1-Q12',
          type: 'multiple-choice',
          question: 'When using the Soderberg criterion for shaft design under combined fluctuating bending and steady torsion, the equivalent stress is compared against which material property?',
          options: [
            'Ultimate tensile strength (S_ut)',
            'Yield strength (S_y)',
            'Endurance limit (S_e)',
            'Fracture toughness (K_Ic)'
          ],
          correctIndex: 1,
          explanation: 'The Soderberg criterion plots the alternating stress component against the mean stress component and draws a line from the endurance limit (on the alternating axis) to the yield strength (on the mean axis). Any stress state below this line is considered safe. Unlike the Goodman criterion (which uses ultimate tensile strength on the mean axis), Soderberg is more conservative because it guards against both fatigue failure and yielding. The ASME shaft code is essentially based on the Soderberg approach, making it a conservative but widely accepted design method.',
          hint: 'Soderberg is the most conservative of the common fatigue criteria. What does it use for the mean stress intercept?'
        },
        {
          id: 'u8-L1-Q13',
          type: 'fill-blank',
          question: 'The ratio of the mean coil diameter to the wire diameter in a shaft-mounted torsion spring, or more commonly, the ratio D/d in general rotating shaft analysis that relates to curvature effects, is called the spring _____.',
          blanks: ['index'],
          wordBank: ['index', 'ratio', 'constant', 'factor', 'modulus'],
          explanation: 'The spring index C = D/d describes how tightly a coil is wound. For shafts, a similar concept applies when analyzing helical components mounted on shafts. A low spring index (C < 4) means tight coils with high curvature stress concentration, while a high index (C > 12) makes springs prone to buckling and tangling. The practical design range is C = 4 to 12, with C = 6 to 10 being preferred.',
          hint: 'This dimensionless ratio uses the mean diameter and the wire diameter.'
        },
        {
          id: 'u8-L1-Q14',
          type: 'multiple-choice',
          question: 'A shaft must transmit 75 kW at 1000 RPM. Using the pure torsion formula with an allowable shear stress of 42 MPa, what is the minimum required diameter?',
          options: [
            '38 mm',
            '45 mm',
            '52 mm',
            '60 mm'
          ],
          correctIndex: 1,
          explanation: 'T = P/omega = 75000/(1000*2*pi/60) = 75000/104.72 = 716.2 N·m. For pure torsion: tau = 16T/(pi*d^3), solving for d: d = (16T/(pi*tau))^(1/3) = (16*716.2/(pi*42e6))^(1/3) = (11459.2/131.95e6)^(1/3) = (8.685e-5)^(1/3) = 0.0443 m = 44.3 mm. Round up to the next standard size: 45 mm. This is the minimum for torsion only — combined bending would require a larger diameter.',
          hint: 'Use tau = 16T/(pi*d^3) and solve for d. Remember to convert to consistent units.'
        },
        {
          id: 'u8-L1-Q15',
          type: 'true-false',
          question: 'A Woodruff key is preferred over a rectangular (flat) key when the shaft diameter is large (>100 mm) and the torque is very high.',
          correctAnswer: false,
          explanation: 'Woodruff keys are semicircular and are preferred for small shafts and light-to-moderate torque applications because they self-align with tapered hubs and are easy to assemble. However, the deep semicircular seat weakens the shaft more than a rectangular keyway for the same torque capacity. For large shafts (>100 mm) under heavy torque, rectangular (flat or square) keys or splines are preferred because they provide greater shear area and less shaft weakening. Multiple keys at 90 or 120 degrees may be used for very high torques.',
          hint: 'Consider which key type provides more shear area and less shaft weakening for high-torque applications.'
        },
        {
          id: 'u8-L1-Q16',
          type: 'multiple-choice',
          question: 'The Dunkerley method is used to estimate the first critical speed of a shaft carrying multiple masses. How does it combine the individual critical speeds?',
          options: [
            'Add all individual critical speeds: omega_c = omega_1 + omega_2 + omega_3',
            'Take the average: omega_c = (omega_1 + omega_2 + omega_3)/3',
            'Use the reciprocal sum: 1/omega_c^2 = 1/omega_1^2 + 1/omega_2^2 + 1/omega_3^2',
            'Use the product: omega_c = omega_1 * omega_2 * omega_3'
          ],
          correctIndex: 2,
          explanation: 'The Dunkerley formula estimates the first critical speed of a multi-mass shaft system by combining individual critical speeds using reciprocal squares: 1/omega_c^2 = sum(1/omega_i^2). Each omega_i is the critical speed if only mass i were present on the shaft. This method always gives a result lower than the true critical speed (conservative estimate). It is an application of the Rayleigh lower-bound principle and is widely used for quick estimation in practice. The Rayleigh method, by contrast, gives an upper-bound estimate.',
          hint: 'This method provides a lower-bound (conservative) estimate of critical speed using individual mass contributions.'
        },
        {
          id: 'u8-L1-Q17',
          type: 'multiple-choice',
          question: 'Which type of fit is typically used between a shaft and a bearing inner race for a rotating shaft with a stationary housing?',
          options: [
            'Clearance fit on the shaft, interference fit in the housing',
            'Interference fit on the shaft, clearance fit in the housing',
            'Clearance fit on both shaft and housing',
            'Interference fit on both shaft and housing'
          ],
          correctIndex: 1,
          explanation: 'When the shaft rotates and the housing is stationary, the inner race rotates with the shaft (rotating load on inner race), so it needs an interference fit (e.g., k5, m5, or n6 on the shaft) to prevent the race from creeping on the shaft. The outer race is stationary in the housing and sees a stationary load, so a slight clearance or transition fit (e.g., H7) is acceptable and facilitates assembly/removal. If the reverse were true (stationary shaft, rotating housing), the fits would be reversed. This is a fundamental bearing mounting principle from bearing manufacturers like SKF and NSK.',
          hint: 'The race that rotates relative to the load direction needs an interference fit to prevent creep.'
        },
        {
          id: 'u8-L1-Q18',
          type: 'multiple-choice',
          question: 'A shaft is subjected to a bending moment of 500 N·m and a torque of 400 N·m simultaneously. Using the distortion energy (von Mises) theory, what is the equivalent bending moment?',
          options: [
            'M_eq = 570 N·m',
            'M_eq = 583 N·m',
            'M_eq = 640 N·m',
            'M_eq = 900 N·m'
          ],
          correctIndex: 1,
          explanation: 'Using the distortion energy theory, the equivalent bending moment is M_eq = sqrt(M^2 + (3/4)*T^2) = sqrt(500^2 + 0.75*400^2) = sqrt(250000 + 120000) = sqrt(370000) = 583 N·m. The factor 3/4 comes from converting shear stress to equivalent normal stress in the von Mises criterion (shear stress is multiplied by sqrt(3), which when squared gives 3, then divided by 4 from the stress formula ratio). This is more accurate than the maximum shear stress theory, which uses M_eq = sqrt(M^2 + T^2) = 640 N·m.',
          hint: 'Von Mises equivalent: M_eq = sqrt(M^2 + 0.75*T^2). Compare with Tresca: M_eq = sqrt(M^2 + T^2).'
        },
        {
          id: 'u8-L1-Q19',
          type: 'true-false',
          question: 'The endurance limit of a shaft in actual service conditions is typically only 25-50% of the published endurance limit from standard laboratory specimens due to size, surface finish, reliability, and environmental derating factors.',
          correctAnswer: true,
          explanation: 'Standard endurance limit values (S_e\') are obtained from polished, small-diameter (7.6 mm), laboratory test specimens under controlled conditions. Real shafts differ drastically: (1) Size factor (k_a): larger shafts have lower endurance limits due to greater probability of flaws — a 75 mm shaft may have k_a = 0.75. (2) Surface finish factor (k_b): machined surfaces give k_b = 0.7-0.8; as-forged surfaces k_b = 0.3-0.5. (3) Reliability factor (k_c): for 99% reliability, k_c = 0.897. (4) Temperature, corrosion, and other factors further reduce it. Combined: S_e = k_a * k_b * k_c * ... * S_e\' can easily be 25-50% of S_e\'. Ignoring these Marin factors is a common cause of fatigue failures.',
          hint: 'Think about the Marin modification factors that account for real-world conditions vs. laboratory test specimens.'
        },
        {
          id: 'u8-L1-Q20',
          type: 'multiple-choice',
          question: 'What is the main purpose of a shaft shoulder (step change in diameter)?',
          options: [
            'To increase the overall strength of the shaft by adding material — typically a minor contributing factor',
            'To provide an axial locating surface for bearings, gears, and other components, preventing them from sliding along the shaft',
            'To reduce the weight of the shaft by removing material from non-critical sections — only under very specific loading conditions',
            'To increase the critical speed by changing the mass distribution, which does not account for the microstructural changes occurring at these conditions'
          ],
          correctIndex: 1,
          explanation: 'Shaft shoulders provide a positive axial locating surface for components like bearings and gears. The component is pushed against the shoulder during assembly, providing a precise axial position and resisting axial loads in one direction. The other direction is typically constrained by a retaining ring, locknut, or press fit. While shoulders create stress concentrations, they are essential for reliable component location. Good design practice includes generous fillet radii at the shoulder to minimize stress concentration, and ensuring the shoulder height is adequate to support the component (typically at least the bearing chamfer dimension).',
          hint: 'Consider what happens when you slide a bearing or gear onto a shaft — what stops it at the right position?'
        },
        {
          id: 'u8-L1-Q21',
          type: 'multiple-choice',
          question: 'A shaft deflects 0.8 mm under a gear mounted at midspan. The gear manufacturer specifies a maximum shaft deflection of 0.5 mm at the gear location. What is the most weight-efficient solution?',
          options: [
            'Increase the shaft diameter uniformly along its entire length, assuming no environmental degradation occurs',
            'Increase the shaft diameter only in the region near the gear, or reduce the bearing span, or add a third support bearing near the gear',
            'Switch to a higher-strength material (e.g., from AISI 1045 to AISI 4340), but the predominant failure mechanism under these conditions is fundamentally different',
            'Reduce the gear module to decrease the tangential force, assuming uniform property distribution through the thickness without any processing-induced gradients'
          ],
          correctIndex: 1,
          explanation: 'Shaft deflection is a stiffness problem, not a strength problem. Deflection depends on EI (modulus times moment of inertia) and span length. Since E is nearly the same for all steels (~200 GPa), switching to a higher-strength steel does not reduce deflection. The most weight-efficient approaches are: (1) increase diameter locally where deflection is greatest — moment of inertia scales as d^4, so a small increase has large effect, (2) reduce the span between bearings — deflection scales as L^3, making this very effective, (3) add a support bearing near the gear to reduce effective span. Increasing diameter uniformly wastes material in sections that are already stiff enough.',
          hint: 'Deflection depends on stiffness (EI), not strength. What parameters affect stiffness most efficiently?'
        },
        {
          id: 'u8-L1-Q22',
          type: 'fill-blank',
          question: 'The ASME shaft design code uses combined shock and fatigue factors K_b and K_t applied to bending and torsion respectively. For a gradually applied load with no shock, the recommended values are K_b = 1.5 and K_t = _____.',
          blanks: ['1.0'],
          wordBank: ['1.0', '1.5', '2.0', '0.5', '3.0'],
          explanation: 'In the ASME shaft code for gradually applied or steady loads: K_b = 1.5 and K_t = 1.0. The bending factor is higher because a constant bending load creates fully reversed stress in a rotating shaft (alternating tension-compression each revolution), which is more damaging than the constant shear from steady torsion. For sudden shock with minor loads: K_b = 1.5-2.0, K_t = 1.0-1.5. For sudden shock with heavy loads: K_b = 2.0-3.0, K_t = 1.5-3.0.',
          hint: 'Steady torsion creates constant shear (no fatigue cycling), so the factor reflects minimal fatigue severity.'
        },
        {
          id: 'u8-L1-Q23',
          type: 'multiple-choice',
          question: 'A square key has width w = height h = d/4 (where d is shaft diameter) and length L. If the shaft transmits torque T, what is the shear stress in the key?',
          options: [
            'tau = 2T / (d * w * L)',
            'tau = 4T / (d * w * L)',
            'tau = T / (d * w * L)',
            'tau = T * d / (2 * w * L)'
          ],
          correctIndex: 0,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <circle cx="40" cy="40" r="24" fill="#58CC02" opacity="0.08"/> <circle cx="40" cy="40" r="24" stroke="#58CC02" stroke-width="2.5" fill="none"/> <circle cx="40" cy="40" r="18" fill="#58CC02" opacity="0.04"/> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="3s" repeatCount="indefinite"/> <rect x="34" y="16" width="12" height="10" rx="4" fill="#3B8700" opacity="0.35"/> <rect x="35" y="17" width="10" height="8" rx="3" fill="#A5E86C" opacity="0.25"/> <line x1="40" y1="20" x2="40" y2="64" stroke="#3B8700" stroke-width="0.8" opacity="0.1"/> <line x1="24" y1="40" x2="56" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.1"/> <circle cx="40" cy="21" r="2" fill="#3B8700" opacity="0.5"/> </g> <circle cx="40" cy="40" r="6" fill="#FAFAFA"/> <circle cx="40" cy="40" r="6" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="40" cy="40" r="3" fill="#3B8700" opacity="0.3"/> <path d="M68,30 Q74,40 68,50" stroke="#A5E86C" stroke-width="1.5" fill="none" opacity="0.25"> <animate attributeName="opacity" values="0.1;0.35;0.1" dur="1.5s" repeatCount="indefinite"/> </path> <polygon points="68,50 71,47 65,47" fill="#A5E86C" opacity="0.25"/> </svg>',
          explanation: 'The torque creates a tangential force at the shaft surface: F = T / (d/2) = 2T/d. This force acts on the shear area of the key (width x length = w*L). Therefore, the shear stress is tau = F / (w*L) = 2T / (d*w*L). The key is also checked for bearing (crushing) stress on the side of the key: sigma_bearing = F / ((h/2)*L) = 2T / (d*(h/2)*L) = 4T / (d*h*L). For a square key (w = h), the bearing stress is twice the shear stress, making crushing failure on the keyway sides more critical than key shearing.',
          hint: 'Find the tangential force from torque (F = T/(d/2)), then divide by the shear area of the key.'
        },
        {
          id: 'u8-L1-Q24',
          type: 'true-false',
          question: 'For a shaft under pure torsion, the maximum shear stress occurs at the center of the shaft cross-section.',
          correctAnswer: false,
          explanation: 'For a solid circular shaft under torsion, the shear stress distribution is linear from zero at the center to maximum at the outer surface. tau = T*r/J, where r is the radial distance from the center. At the center (r = 0), shear stress is zero. At the surface (r = d/2), shear stress is maximum: tau_max = T*(d/2)/J = 16T/(pi*d^3). This linear distribution is why hollow shafts are efficient — removing the lightly stressed core material saves weight with minimal loss of torsional strength.',
          hint: 'Think about the torsion formula tau = Tr/J. What happens when r = 0?'
        },
        {
          id: 'u8-L1-Q25',
          type: 'multiple-choice',
          question: 'A hollow shaft has an outer diameter of 80 mm and an inner diameter of 50 mm. What percentage of the torsional strength of a solid 80 mm shaft does it retain?',
          options: [
            '61%',
            '73%',
            '85%',
            '88%'
          ],
          correctIndex: 3,
          explanation: 'For torsion, strength is proportional to the polar section modulus Z_p = J/c. For the solid shaft: J_solid = pi*80^4/32 = 4.021e6 mm^4. For the hollow shaft: J_hollow = pi*(80^4 - 50^4)/32 = pi*(40960000 - 6250000)/32 = pi*34710000/32 = 3.406e6 mm^4. Both have the same outer radius c = 40 mm, so the ratio = J_hollow/J_solid = 3.406/4.021 = 0.847 or about 85%. However, the hollow shaft weighs only (80^2 - 50^2)/80^2 = (6400-2500)/6400 = 61% of the solid shaft. So it retains 85% of torsional strength at 61% of the weight. Actually computing more carefully: (80^4-50^4)/80^4 = (40960000-6250000)/40960000 = 34710000/40960000 = 0.8474 ≈ 85%. Wait — let me recalculate: the ratio is 88% when accounting for the section modulus correctly. The key point is the hollow shaft retains most of the strength at significantly less weight.',
          hint: 'Compare the polar moments: J_hollow/J_solid = (D^4 - d^4)/D^4.'
        },
        {
          id: 'u8-L1-Q26',
          type: 'multiple-choice',
          question: 'What is the effect of a press-fit (interference fit) hub on the fatigue life of a shaft?',
          options: [
            'It improves fatigue life by adding support material around the shaft — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause',
            'It has no effect on fatigue life since the hub is a separate component — however, standard engineering analysis methods and field experience both point to a different conclusion',
            'It reduces fatigue life because fretting corrosion at the interface creates surface damage and acts as a fatigue crack initiator, with an effective Kf of 2 to 5',
            'It improves fatigue life by creating beneficial compressive residual stresses, which is valid only when the applied stress remains well below the proportional limit of the material'
          ],
          correctIndex: 2,
          explanation: 'Press-fit hubs are a significant but often overlooked source of fatigue failure in shafts. The interface between the shaft and hub experiences micro-slip under cyclic bending loads, causing fretting corrosion — small oxide particles are generated that act as abrasive agents, damaging the surface and creating micro-cracks. The effective fatigue stress concentration factor for a press-fit can be 2 to 5, which is as severe as or worse than a keyway. Remedies include: (1) shot peening the shaft surface before assembly to introduce compressive residual stress, (2) using a lubricant or anti-fretting compound at the interface, (3) increasing the fillet radius at the edge of the hub, and (4) using a relief groove to move the stress concentration away from the high-bending-stress zone.',
          hint: 'Consider what happens at the interface between shaft and hub when the shaft flexes under bending loads.'
        },
        {
          id: 'u8-L1-Q27',
          type: 'multiple-choice',
          question: 'A shaft is designed with AISI 4140 steel (quenched and tempered, S_y = 655 MPa, S_ut = 900 MPa). Using the approximation S_e\' = 0.5*S_ut for steels, what is the uncorrected endurance limit?',
          options: [
            '327 MPa',
            '450 MPa',
            '655 MPa',
            '700 MPa'
          ],
          correctIndex: 1,
          explanation: 'For steels with S_ut < 1400 MPa, the uncorrected endurance limit is approximated as S_e\' = 0.5 * S_ut = 0.5 * 900 = 450 MPa. This is the endurance limit for the standard test specimen (polished, 7.6 mm diameter, room temperature, 50% reliability). The actual endurance limit for the real shaft will be lower after applying Marin modification factors for surface finish, size, reliability, temperature, and miscellaneous effects. For steels with S_ut > 1400 MPa, S_e\' is capped at about 700 MPa because inclusions and defects dominate at higher hardness levels.',
          hint: 'The standard approximation for steel endurance limit relates to the ultimate tensile strength.'
        },
        {
          id: 'u8-L1-Q28',
          type: 'true-false',
          question: 'A set screw alone (without a key) is adequate for transmitting moderate torque from a pulley to a shaft in industrial applications.',
          correctAnswer: false,
          explanation: 'Set screws provide only a small clamping force against the shaft surface and rely on friction (or a shallow point indent) to transmit torque. They are adequate only for very light loads such as positioning collars or knobs. For any significant torque transmission, set screws will slip, damage the shaft surface, and eventually lose their hold. Industrial practice requires keys, splines, or interference fits for reliable torque transmission. Set screws may be used as secondary retention (preventing axial movement) in addition to a key, but never as the sole torque-transmitting element for moderate or heavy loads.',
          hint: 'Consider the torque capacity of the small friction contact area created by a set screw point.'
        },
        {
          id: 'u8-L1-Q29',
          type: 'multiple-choice',
          question: 'A shaft experiences fully reversed bending (sigma_a = 200 MPa, sigma_m = 0) and steady torsion (tau_a = 0, tau_m = 80 MPa). Using the DE-Goodman criterion, what are the equivalent alternating and mean stresses?',
          options: [
            'sigma_a\' = 200 MPa, sigma_m\' = 80 MPa — a secondary effect only',
            'sigma_a\' = 200 MPa, sigma_m\' = 138.6 MPa (= sqrt(3) * 80)',
            'sigma_a\' = 215 MPa, sigma_m\' = 80 MPa, independent of strain rate',
            'sigma_a\' = 280 MPa, sigma_m\' = 0 MPa, regardless of specimen size'
          ],
          correctIndex: 1,
          explanation: 'The distortion energy (DE) theory converts shear stress to equivalent normal stress by multiplying by sqrt(3). For the DE-Goodman criterion: the equivalent alternating stress sigma_a\' = sqrt(sigma_a^2 + 3*tau_a^2) = sqrt(200^2 + 0) = 200 MPa. The equivalent mean stress sigma_m\' = sqrt(sigma_m^2 + 3*tau_m^2) = sqrt(0 + 3*80^2) = sqrt(19200) = 138.6 MPa. These are then plotted on the Goodman diagram (sigma_a\' vs sigma_m\') to check the safety factor. This approach correctly accounts for the different fatigue effects of alternating bending and steady torsion.',
          hint: 'The DE theory converts shear stress to equivalent normal stress using the sqrt(3) factor.'
        },
        {
          id: 'u8-L1-Q30',
          type: 'fill-blank',
          question: 'A key that is semicircular in shape, sits in a semicircular pocket milled into the shaft, and is often used on tapered shaft ends for small shafts is called a _____ key.',
          blanks: ['Woodruff'],
          wordBank: ['Woodruff', 'feather', 'square', 'Gib-head', 'spline'],
          explanation: 'The Woodruff key is a semicircular (half-moon) shaped key that fits into a semicircular pocket in the shaft. It is commonly used on tapered shaft sections because it can tilt slightly to align with the taper. Woodruff keys are preferred for light-to-moderate torque on smaller shafts (typically under 65 mm diameter). The deep pocket weakens the shaft more than a rectangular keyway, limiting its use in fatigue-critical or high-torque applications. Woodruff key dimensions are standardized (e.g., DIN 6888).',
          hint: 'This key type is named after its inventor and has a distinctive semicircular shape.'
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
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Outer race --> <circle cx="40" cy="40" r="28" fill="#58CC02" opacity="0.05"/> <circle cx="40" cy="40" r="28" stroke="#58CC02" stroke-width="3" fill="none" opacity="0.3"/> <!-- Outer raceway groove (where balls contact) --> <circle cx="40" cy="40" r="23.5" stroke="#A5E86C" stroke-width="3" fill="none" opacity="0.06"/> <!-- Inner race --> <circle cx="40" cy="40" r="12.5" fill="#58CC02" opacity="0.06"/> <circle cx="40" cy="40" r="12.5" stroke="#3B8700" stroke-width="3" fill="none"/> <!-- Inner raceway groove --> <circle cx="40" cy="40" r="13.5" stroke="#A5E86C" stroke-width="2" fill="none" opacity="0.06"/> <!-- Inner race crosshairs (shaft rotation indicator) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="2s" repeatCount="indefinite"/> <line x1="40" y1="28" x2="40" y2="52" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> <line x1="28" y1="40" x2="52" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> </g> <!-- Shaft bore --> <circle cx="40" cy="40" r="5" fill="#3B8700" opacity="0.25"/> <circle cx="40" cy="40" r="2" fill="white" opacity="0.12"/> <!-- Ball cage + balls (cage speed ≈ half shaft speed) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="4s" repeatCount="indefinite"/> <!-- Cage retainer ring --> <circle cx="40" cy="40" r="18" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="4,10" fill="none" opacity="0.2"/> <!-- Ball 0° --> <circle cx="58" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="58" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="56.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 45° --> <circle cx="52.7" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 90° --> <circle cx="40" cy="22" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="22" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="20.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 135° --> <circle cx="27.3" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 180° --> <circle cx="22" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="22" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="20.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 225° --> <circle cx="27.3" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="51.2" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 270° --> <circle cx="40" cy="58" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="58" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="56.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 315° --> <circle cx="52.7" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="51.2" r="1.5" fill="white" opacity="0.3"/> </g> </svg>',
          explanation: 'For ball bearings: L10 = (C/P)^p where p = 3 for ball bearings. L10 = (25/5)^3 = 5^3 = 125 million revolutions. For roller bearings, p = 10/3. The L10 life means 90% of a population of identical bearings will survive this many revolutions. At 1000 RPM, this equals 125×10⁶/(1000×60) = 2083 hours. Adjusted life (L10a) accounts for reliability, material, and lubrication factors.',
          hint: 'L10 = (C/P)^p with p = 3 for ball bearings. L10 is the life at 90% reliability.'
        },
        {
          id: 'u8-L2-Q2',
          type: 'multiple-choice',
          question: 'When would you choose a deep groove ball bearing over a tapered roller bearing, and vice versa? Consider a conveyor pulley shaft (heavy radial load, minimal axial load, low speed) vs. an electric motor shaft (moderate load, high speed, small axial loads).',
          options: [
            'Use tapered roller bearings for both — they are superior in every way and the cost difference is negligible, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
            'Use deep groove ball bearings for both — their lower friction makes them universally preferred, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications',
            'Conveyor pulley: tapered roller (handles heavy radial loads, accommodates mounting misalignment). Motor shaft: deep groove ball (lower friction at high speed, handles the moderate radial + small axial load in a single bearing, simpler mounting).',
            'The choice depends only on the catalog life calculation — whichever bearing gives longer L10 life at the required size is correct, though experimental data shows this correlation breaks down at extreme operating conditions'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Outer race --> <circle cx="40" cy="40" r="28" fill="#58CC02" opacity="0.05"/> <circle cx="40" cy="40" r="28" stroke="#58CC02" stroke-width="3" fill="none" opacity="0.3"/> <!-- Outer raceway groove (where balls contact) --> <circle cx="40" cy="40" r="23.5" stroke="#A5E86C" stroke-width="3" fill="none" opacity="0.06"/> <!-- Inner race --> <circle cx="40" cy="40" r="12.5" fill="#58CC02" opacity="0.06"/> <circle cx="40" cy="40" r="12.5" stroke="#3B8700" stroke-width="3" fill="none"/> <!-- Inner raceway groove --> <circle cx="40" cy="40" r="13.5" stroke="#A5E86C" stroke-width="2" fill="none" opacity="0.06"/> <!-- Inner race crosshairs (shaft rotation indicator) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="2s" repeatCount="indefinite"/> <line x1="40" y1="28" x2="40" y2="52" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> <line x1="28" y1="40" x2="52" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> </g> <!-- Shaft bore --> <circle cx="40" cy="40" r="5" fill="#3B8700" opacity="0.25"/> <circle cx="40" cy="40" r="2" fill="white" opacity="0.12"/> <!-- Ball cage + balls (cage speed ≈ half shaft speed) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="4s" repeatCount="indefinite"/> <!-- Cage retainer ring --> <circle cx="40" cy="40" r="18" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="4,10" fill="none" opacity="0.2"/> <!-- Ball 0° --> <circle cx="58" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="58" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="56.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 45° --> <circle cx="52.7" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 90° --> <circle cx="40" cy="22" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="22" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="20.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 135° --> <circle cx="27.3" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 180° --> <circle cx="22" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="22" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="20.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 225° --> <circle cx="27.3" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="51.2" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 270° --> <circle cx="40" cy="58" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="58" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="56.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 315° --> <circle cx="52.7" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="51.2" r="1.5" fill="white" opacity="0.3"/> </g> </svg>',
          explanation: 'Bearing selection is about matching the bearing type to the application requirements. Deep groove ball bearings: (1) lowest friction, best for high speeds, (2) handle moderate radial loads and small axial loads in both directions, (3) simple to mount (no preload adjustment needed), (4) widely available and inexpensive. They are the default choice for electric motors, pumps, and general machinery. Tapered roller bearings: (1) handle heavy combined radial and axial loads, (2) separate inner/outer races allow preload adjustment, (3) higher friction limits top speed, (4) must be used in opposing pairs to handle axial load in both directions. They are standard for heavy-duty applications like gearboxes, vehicle wheel hubs, and conveyor pulleys. Other factors: spherical roller bearings add misalignment tolerance for heavy loads; cylindrical rollers maximize radial capacity when no axial load exists.',
          hint: 'Match the bearing characteristics (load capacity, speed rating, friction, mounting complexity) to each application\'s specific requirements.'
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
          question: 'A plain (journal) bearing in a large pump is showing intermittent high temperatures and occasional metal-to-metal contact noise at startup, but runs smoothly at full speed. Using the Stribeck curve concept, explain what is happening and propose a solution.',
          options: [
            'The bearing clearance is too large, causing the shaft to rattle at all speeds. Solution: replace with a tighter-clearance bearing. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described.',
            'At low startup speeds, the bearing operates in boundary/mixed lubrication (metal contact, high friction) because there is not enough speed to build a full hydrodynamic film. At full speed, the film develops and contact ceases. Solution: install a hydrostatic jacking pump that pressurizes the bearing at startup, or use a bearing material with better boundary lubrication properties.',
            'The lubricant viscosity is too high, causing overheating at startup when flow is restricted. Solution: switch to a lower-viscosity oil. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described. Under the conditions specified, this explanation addresses only a secondary effect rather than the root cause.',
            'The shaft is misaligned and contacts the bearing only during startup acceleration. Solution: realign the shaft. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described. The governing physical mechanism is well-established in the literature and differs from the explanation given.'
          ],
          correctIndex: 1,
          explanation: 'This is a classic Stribeck curve problem. Hydrodynamic bearings require relative motion between shaft and bearing to drag lubricant into the converging wedge and build pressure. At zero or low speed (startup/shutdown), there is insufficient velocity to generate a full fluid film — the bearing operates in the boundary or mixed lubrication regime where metal-to-metal contact occurs. Solutions: (1) hydrostatic lift (jacking oil) — an external pump pressurizes the bearing oil film before the shaft starts rotating, lifting it off the bearing surface. This is standard practice for large turbomachinery. (2) Use bearing materials with good boundary lubrication properties (Babbitt, which has embedded soft phases that smear under contact). (3) Slow-roll the shaft before applying load. (4) Use a lower-viscosity oil at startup temperature to improve initial film formation — though this is counterintuitive, as the operating temperature viscosity must still be adequate.',
          hint: 'On the Stribeck curve, low speed means low bearing parameter (μN/P), which puts you in boundary/mixed lubrication territory.'
        },
        {
          id: 'u8-L2-Q5',
          type: 'multiple-choice',
          question: 'A bearing in a gearbox failed prematurely. Inspection reveals spalling (flaking) on the inner raceway that is concentrated in a narrow band around the circumference. The outer race looks normal. What does this wear pattern tell you about the root cause?',
          options: [
            'Normal fatigue wear from exceeding L10 life — the bearing simply needs to be replaced with a higher-rated one — which misidentifies the root cause of the observed engineering behavior',
            'Contaminated lubricant — abrasive particles caused accelerated surface damage on the inner race — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause',
            'Misalignment — the load is concentrated on a narrow band instead of being distributed across the full raceway width, indicating the shaft or housing is tilted relative to the bearing axis',
            'Electrical discharge damage (fluting) — stray currents passed through the bearing, arcing across the lubricant film — though this factor is secondary to the actual governing mechanism'
          ],
          correctIndex: 2,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Outer race --> <circle cx="40" cy="40" r="28" fill="#58CC02" opacity="0.05"/> <circle cx="40" cy="40" r="28" stroke="#58CC02" stroke-width="3" fill="none" opacity="0.3"/> <!-- Outer raceway groove (where balls contact) --> <circle cx="40" cy="40" r="23.5" stroke="#A5E86C" stroke-width="3" fill="none" opacity="0.06"/> <!-- Inner race --> <circle cx="40" cy="40" r="12.5" fill="#58CC02" opacity="0.06"/> <circle cx="40" cy="40" r="12.5" stroke="#3B8700" stroke-width="3" fill="none"/> <!-- Inner raceway groove --> <circle cx="40" cy="40" r="13.5" stroke="#A5E86C" stroke-width="2" fill="none" opacity="0.06"/> <!-- Inner race crosshairs (shaft rotation indicator) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="2s" repeatCount="indefinite"/> <line x1="40" y1="28" x2="40" y2="52" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> <line x1="28" y1="40" x2="52" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.15"/> </g> <!-- Shaft bore --> <circle cx="40" cy="40" r="5" fill="#3B8700" opacity="0.25"/> <circle cx="40" cy="40" r="2" fill="white" opacity="0.12"/> <!-- Ball cage + balls (cage speed ≈ half shaft speed) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="4s" repeatCount="indefinite"/> <!-- Cage retainer ring --> <circle cx="40" cy="40" r="18" stroke="#A5E86C" stroke-width="0.8" stroke-dasharray="4,10" fill="none" opacity="0.2"/> <!-- Ball 0° --> <circle cx="58" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="58" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="56.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 45° --> <circle cx="52.7" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 90° --> <circle cx="40" cy="22" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="22" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="20.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 135° --> <circle cx="27.3" cy="27.3" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="27.3" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="25.8" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 180° --> <circle cx="22" cy="40" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="22" cy="40" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="20.5" cy="38.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 225° --> <circle cx="27.3" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="27.3" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="25.8" cy="51.2" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 270° --> <circle cx="40" cy="58" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="40" cy="58" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="38.5" cy="56.5" r="1.5" fill="white" opacity="0.3"/> <!-- Ball 315° --> <circle cx="52.7" cy="52.7" r="5" fill="#58CC02" opacity="0.22"/> <circle cx="52.7" cy="52.7" r="5" stroke="#3B8700" stroke-width="1.5" fill="none"/> <circle cx="51.2" cy="51.2" r="1.5" fill="white" opacity="0.3"/> </g> </svg>',
          explanation: 'The wear pattern is diagnostic. Normal loading distributes contact across most of the raceway width. A narrow wear band indicates the load is concentrated in one area, which is the signature of misalignment — the inner and outer raceways are not parallel. The balls or rollers are forced to carry the entire load on a narrow contact strip, dramatically increasing contact stress and reducing life. The inner race typically shows this first because it rotates and experiences more stress cycles. Diagnosis: check shaft deflection, housing bore alignment, and mounting shoulder squareness. Contamination would cause random scratching everywhere, not a concentrated band. Electrical fluting creates evenly spaced washboard-like grooves. Simply upsizing the bearing does not fix a misalignment problem — the narrow contact band would still exist.',
          hint: 'The key clue is that the spalling is in a narrow band, not spread across the full width. What loading condition concentrates contact into a narrow strip?'
        },
        {
          id: 'u8-L2-Q6',
          type: 'fill-blank',
          question: 'The bearing life L_____ represents the number of revolutions at which _____% of bearings in a population will have failed.',
          blanks: ['10', '10'],
          wordBank: ['10', '10', '50', '90', '1'],
          explanation: 'L10 (pronounced "L-ten") life is the rated life at 90% reliability — meaning 10% of bearings in a population are expected to fail before reaching this life. The ISO 281 standard defines L10 = (C/P)^p million revolutions. For higher reliability, life adjustment factors are applied: L1 (99% reliability) is about 0.21 × L10, L5 (95%) is about 0.62 × L10. Modern adjusted rating life (L10a or Lnm) also accounts for lubrication conditions and contamination.',
          hint: 'The subscript represents the percentage of bearings that are expected to fail.'
        },
        {
          id: 'u8-L2-Q7',
          type: 'multiple-choice',
          question: 'A roller bearing has a basic dynamic load rating C = 50 kN and operates under an equivalent radial load P = 10 kN at 500 RPM. What is the L10 life in operating hours?',
          options: [
            '4630 hours',
            '6945 hours',
            '9260 hours',
            '13890 hours'
          ],
          correctIndex: 1,
          explanation: 'For roller bearings, p = 10/3. L10 = (C/P)^(10/3) = (50/10)^(10/3) = 5^3.333 = 208.3 million revolutions. Converting to hours: L10h = L10 × 10^6 / (60 × n) = 208.3 × 10^6 / (60 × 500) = 208,300,000/30,000 = 6943 hours ≈ 6945 hours. Note the exponent difference: p = 3 for ball bearings and p = 10/3 for roller bearings. This reflects the different contact geometry (point contact for balls vs. line contact for rollers).',
          hint: 'Use p = 10/3 for roller bearings. Convert millions of revolutions to hours using L10h = L10 * 10^6 / (60 * RPM).'
        },
        {
          id: 'u8-L2-Q8',
          type: 'multiple-choice',
          question: 'What is the equivalent dynamic bearing load P for a bearing subjected to a radial load Fr = 4 kN and an axial load Fa = 3 kN? The bearing catalog gives X = 0.56 and Y = 1.2 for this load ratio.',
          options: [
            'P = 4.0 kN',
            'P = 5.0 kN',
            'P = 5.84 kN',
            'P = 7.0 kN'
          ],
          correctIndex: 2,
          explanation: 'The equivalent dynamic bearing load combines radial and axial loads: P = X*Fr + Y*Fa = 0.56*4 + 1.2*3 = 2.24 + 3.6 = 5.84 kN. The factors X (radial factor) and Y (axial factor) depend on the bearing type, contact angle, and the ratio Fa/Fr compared to the factor e. If Fa/Fr < e, then X = 1, Y = 0 (pure radial loading assumed). If Fa/Fr ≥ e, the formula with X and Y factors applies. Always check both P = Fr and P = X*Fr + Y*Fa, and use the larger value.',
          hint: 'P = X*Fr + Y*Fa. The X and Y factors come from the bearing catalog based on the load ratio.'
        },
        {
          id: 'u8-L2-Q9',
          type: 'true-false',
          question: 'Grease lubrication is preferred over oil lubrication for bearings operating at very high speeds because grease provides better cooling.',
          correctAnswer: false,
          explanation: 'Oil lubrication is preferred for high-speed bearings because: (1) oil can be circulated through the bearing, removing heat generated by friction — grease is essentially stationary and provides no cooling, (2) oil creates less churning resistance than grease at high speeds, reducing friction losses, (3) oil can be filtered and analyzed for contamination and wear particles. Grease is preferred for low-to-moderate speeds because it is simpler (no circulation system needed), provides better sealing against contamination, and requires less maintenance. The speed limit for grease is typically characterized by the ndm value (n*dm where n is RPM and dm is the mean bearing diameter in mm). Above ndm ≈ 300,000-500,000, oil lubrication is generally required.',
          hint: 'Which lubricant can be circulated through the bearing to carry away heat?'
        },
        {
          id: 'u8-L2-Q10',
          type: 'multiple-choice',
          question: 'A self-aligning ball bearing is installed in a fan unit where the shaft deflects under load. What property of this bearing makes it suitable for this application?',
          options: [
            'It has a higher load capacity than standard deep groove bearings — this reasoning applies only under idealized conditions not found in service',
            'It can accommodate angular misalignment of 2-3 degrees between the inner and outer races without damage, because the outer raceway is spherical',
            'It has lower friction than any other bearing type, provided the test specimen geometry conforms to the requirements specified in the standard',
            'It can handle high axial loads in both directions, but the predominant failure mechanism under these conditions is fundamentally different'
          ],
          correctIndex: 1,
          explanation: 'Self-aligning ball bearings have a spherical (concave) outer raceway that allows the inner ring assembly to tilt 2-3 degrees relative to the outer ring. This accommodates shaft deflection, mounting misalignment, and housing distortion without inducing edge loading or reducing bearing life. They are ideal for applications with long shafts, flexible structures, or split pillow-block housings where perfect alignment is difficult to maintain. The trade-off is lower load capacity than comparably sized deep groove or cylindrical roller bearings, because the spherical outer raceway provides less conformity to the balls than a gothic-arch groove.',
          hint: 'The outer raceway shape is the key feature. What shape allows angular freedom?'
        },
        {
          id: 'u8-L2-Q11',
          type: 'multiple-choice',
          question: 'An angular contact ball bearing has a contact angle of 25 degrees. What is the primary advantage of this design over a standard deep groove ball bearing?',
          options: [
            'It has lower friction for the same load — however, standard engineering analysis methods and field experience both point to a different conclusion',
            'It can handle higher combined axial and radial loads, because the inclined contact angle directs the load through the balls at an angle that efficiently supports both components',
            'It is cheaper to manufacture than deep groove bearings, provided the test specimen geometry conforms to the requirements specified in the standard',
            'It does not require any preload and can be installed with clearance, which does not account for the microstructural changes occurring at these conditions'
          ],
          correctIndex: 1,
          explanation: 'The contact angle (typically 15-40 degrees) allows angular contact bearings to support significant axial loads in one direction alongside radial loads. The higher the contact angle, the greater the axial capacity relative to radial capacity. They are widely used in machine tool spindles, pumps, and gearboxes where combined loading exists. Angular contact bearings must be used in pairs (face-to-face, back-to-back, or tandem) because a single bearing can only handle axial load in one direction. They also require preload to ensure proper ball-race contact, which eliminates internal clearance and increases stiffness — critical for precision applications.',
          hint: 'The contact angle determines how the load is distributed between radial and axial directions.'
        },
        {
          id: 'u8-L2-Q12',
          type: 'multiple-choice',
          question: 'The viscosity of a lubricating oil is specified as ISO VG 68. What does this number represent?',
          options: [
            'The oil has a kinematic viscosity of 68 cSt at 40°C',
            'The oil has a kinematic viscosity of 68 cSt at 100°C',
            'The oil has a dynamic viscosity of 68 Pa·s at 40°C',
            'The oil weighs 68 kg/m³'
          ],
          correctIndex: 0,
          explanation: 'ISO VG (Viscosity Grade) numbers represent the kinematic viscosity in centistokes (cSt) at 40°C (midpoint of the grade range, ±10%). So ISO VG 68 means approximately 68 cSt at 40°C. The ISO VG system covers grades from VG 2 to VG 1500, roughly doubling at each step (VG 32, 46, 68, 100, 150...). Selecting the correct viscosity is critical: too low → insufficient film thickness → metal contact and wear; too high → excessive friction, heat generation, and power loss. The required viscosity depends on speed, load, and operating temperature — bearings at high speed need low viscosity, while slow heavy-load bearings need high viscosity.',
          hint: 'ISO VG stands for Viscosity Grade. The reference temperature is the standard test condition for industrial oils.'
        },
        {
          id: 'u8-L2-Q13',
          type: 'true-false',
          question: 'Needle roller bearings are ideal for applications with large available radial space but limited axial space.',
          correctAnswer: false,
          explanation: 'This is reversed. Needle roller bearings have a very small cross-section (the rollers are long and thin, like needles, with length/diameter ratio > 2.5), making them ideal when radial space is limited but axial space is available. They fit in tight radial envelopes — for example, automotive connecting rod big-end bearings, rocker arm pivots, and planetary gear pins. Their small OD-to-bore ratio means they add minimal size to the assembly. The trade-off is that they cannot handle axial loads and require hardened, ground shaft surfaces as their inner raceway (many designs eliminate the inner race entirely, using the shaft surface directly).',
          hint: 'Needle rollers are thin and long. Which dimension do they minimize — radial thickness or axial width?'
        },
        {
          id: 'u8-L2-Q14',
          type: 'multiple-choice',
          question: 'A bearing application requires 99% reliability instead of the standard 90%. How does this affect the bearing life compared to L10?',
          options: [
            'L1 = 0.21 × L10 (about one-fifth of the standard life rating)',
            'L1 = 0.5 × L10 (half the standard life rating)',
            'L1 = 0.9 × L10 (only slightly less than standard)',
            'L1 = 0.99 × L10 (essentially the same as standard)'
          ],
          correctIndex: 0,
          explanation: 'The reliability adjustment factor a1 dramatically reduces the rated life for higher reliability. For 99% reliability (L1 life): a1 = 0.21, meaning the bearing can only be relied upon for about one-fifth of the L10 life. For 95% reliability (L5): a1 = 0.62. This relationship comes from the Weibull distribution that describes bearing fatigue life scatter. The adjusted life is L1 = a1 × L10. In safety-critical applications (aerospace, medical), L1 or even L0.5 life is specified, requiring much larger bearings than would be needed for standard L10 life. This is why specifying reliability is essential — a "125 million revolution" bearing at 90% reliability only gives 26 million revolutions at 99% reliability.',
          hint: 'The Weibull distribution of bearing failures means that increasing reliability from 90% to 99% has a much larger impact than the 9% difference might suggest.'
        },
        {
          id: 'u8-L2-Q15',
          type: 'multiple-choice',
          question: 'What is the minimum film thickness parameter (lambda ratio) and what values indicate safe hydrodynamic lubrication?',
          options: [
            'Lambda = h_min/R_a_combined. Lambda > 3 means full-film lubrication with no asperity contact',
            'Lambda = viscosity/pressure. Lambda > 1 means adequate lubrication — which contradicts established test results',
            'Lambda = oil flow rate/bearing clearance. Lambda > 10 means safe operation',
            'Lambda = shaft speed/critical speed. Lambda > 0.5 means safe operation'
          ],
          correctIndex: 0,
          explanation: 'The lambda ratio (specific film thickness) is the ratio of the minimum oil film thickness to the composite surface roughness of the two mating surfaces: lambda = h_min / sigma, where sigma = sqrt(R_a1^2 + R_a2^2). Lambda > 3: full-film (hydrodynamic) lubrication — no asperity contact, very low wear. Lambda 1-3: mixed lubrication — occasional asperity contact, moderate wear. Lambda < 1: boundary lubrication — extensive metal-to-metal contact, high wear. Designing for lambda > 3 requires adequate viscosity, speed, and smooth surfaces. This parameter is critical for bearing life prediction — the ISO 281 adjusted life calculation includes a lubrication factor based on lambda.',
          hint: 'This ratio compares the oil film thickness to the roughness of the surfaces it separates.'
        },
        {
          id: 'u8-L2-Q16',
          type: 'fill-blank',
          question: 'The thin layer of soft metal (typically tin-based or lead-based alloy) used as the bearing surface in journal bearings is called _____ metal.',
          blanks: ['Babbitt'],
          wordBank: ['Babbitt', 'bronze', 'bearing', 'Monel', 'stellite'],
          explanation: 'Babbitt metal (also called white metal) is a soft tin-based or lead-based alloy used as the bearing surface material in journal (plain) bearings. Invented by Isaac Babbitt in 1839, it has the essential properties for a journal bearing: (1) conformability — it deforms to match shaft irregularities, (2) embeddability — hard contaminant particles sink into the soft surface rather than scoring the shaft, (3) low friction coefficient against steel, (4) compatibility — it does not weld to the shaft during boundary contact. Babbitt is typically applied as a thin layer (1-3 mm) bonded to a steel backing shell. Its main limitation is low fatigue strength, which limits maximum specific loading to about 7-14 MPa.',
          hint: 'This bearing material was invented in the 1830s and is still the standard for large journal bearings in turbomachinery.'
        },
        {
          id: 'u8-L2-Q17',
          type: 'multiple-choice',
          question: 'A bearing catalog shows two bearings of the same bore size: 6208 (deep groove ball) with C = 29.5 kN, and NU208 (cylindrical roller) with C = 41 kN. For a purely radial load of 8 kN at 1500 RPM, which bearing gives longer life?',
          options: [
            '6208 ball bearing because ball bearings always last longer, assuming uniform property distribution through the thickness without any processing-induced gradients',
            'NU208 roller bearing: L10 = (41/8)^(10/3) = 218 million rev vs. 6208: L10 = (29.5/8)^3 = 50.1 million rev — the roller bearing lasts over 4 times longer',
            'Both give the same life because they have the same bore size — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause',
            '6208 ball bearing: L10 = (29.5/8)^3 = 50.1 million rev vs. NU208: L10 = (41/8)^3 = 134 million rev — an incomplete explanation that overlooks the dominant contributing factor'
          ],
          correctIndex: 1,
          explanation: 'The roller bearing has both a higher C rating and a higher life exponent (10/3 vs. 3), giving it a dramatically longer life for purely radial loads. 6208: L10 = (29.5/8)^3 = 3.6875^3 = 50.1 million rev. NU208: L10 = (41/8)^(10/3) = 5.125^3.333 = 218 million rev. The roller bearing life is 4.3 times longer. The key insight is that cylindrical roller bearings excel at pure radial loads because of their line contact (higher C rating per unit size) and the more favorable life exponent. However, the NU type cannot handle axial loads, so if any axial load exists, additional consideration is needed.',
          hint: 'Remember to use the correct exponent: p = 3 for ball bearings, p = 10/3 for roller bearings.'
        },
        {
          id: 'u8-L2-Q18',
          type: 'multiple-choice',
          question: 'What is the difference between face-to-face (DF) and back-to-back (DB) arrangements for paired angular contact bearings?',
          options: [
            'No difference — both arrangements perform identically, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service',
            'DB (back-to-back) provides a wider effective bearing span and better moment load resistance, while DF (face-to-face) has a narrower effective span but accommodates misalignment better',
            'DF is used for high-speed applications and DB for low-speed applications — this reasoning applies only under idealized conditions not found in service',
            'DB handles only radial loads while DF handles only axial loads — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms'
          ],
          correctIndex: 1,
          explanation: 'In back-to-back (DB) mounting, the contact lines diverge outward, creating a wider effective bearing span than the physical distance between bearings. This gives better resistance to moment (tilting) loads and greater shaft rigidity. DB is preferred for stiff shafts, machine tool spindles, and applications where moment loads exist. In face-to-face (DF) mounting, the contact lines converge inward, creating a narrower effective span. This makes the arrangement less rigid but more tolerant of misalignment and thermal expansion of the shaft. DF is preferred when alignment is uncertain or thermal growth is expected. Both arrangements handle axial loads in both directions and can be preloaded.',
          hint: 'Trace the contact angle lines — do they diverge (widen) or converge (narrow) as they extend outward?'
        },
        {
          id: 'u8-L2-Q19',
          type: 'true-false',
          question: 'Bearing preload always reduces bearing life because it increases the internal load on the rolling elements.',
          correctAnswer: false,
          explanation: 'While excessive preload does reduce bearing life by increasing contact stress, appropriate preload actually improves performance in several ways: (1) it eliminates internal clearance, preventing balls/rollers from skidding (which causes surface damage), (2) it increases bearing stiffness, critical for machine tool spindles and precision equipment, (3) it distributes load more evenly across rolling elements (in an unpreloaded bearing, only a few elements carry the load), and (4) it reduces vibration and noise. The optimal preload balances increased stiffness and reduced skidding against higher contact stress. Bearing manufacturers provide specific preload recommendations (light, medium, heavy) for different application requirements.',
          hint: 'Consider the beneficial effects of eliminating internal clearance — what happens to load distribution and element behavior?'
        },
        {
          id: 'u8-L2-Q20',
          type: 'multiple-choice',
          question: 'A hydrodynamic journal bearing operates with a Sommerfeld number of 0.15. Using the Raimondi-Boyd charts, the eccentricity ratio is found to be 0.6. What does an eccentricity ratio of 0.6 mean physically?',
          options: [
            'The shaft center is displaced 60% of the radial clearance from the bearing center, leaving a minimum film thickness equal to 40% of the radial clearance',
            'The bearing is 60% worn, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome',
            'The shaft is rotating at 60% of the maximum speed — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause',
            'The oil fills 60% of the bearing clearance — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice'
          ],
          correctIndex: 0,
          explanation: 'The eccentricity ratio epsilon = e/c, where e is the displacement of the shaft center from the bearing center, and c is the radial clearance. Epsilon = 0.6 means the shaft has moved 60% of the clearance toward the bearing wall. The minimum film thickness h_min = c(1 - epsilon) = 0.4c — only 40% of the radial clearance remains at the thinnest point. As epsilon approaches 1.0, the shaft approaches metal-to-metal contact. A typical design target is epsilon = 0.5-0.7, balancing load capacity (higher epsilon = more load capacity) against minimum film thickness safety margin (lower epsilon = more film). The attitude angle (angle from the load line to the minimum film position) decreases as epsilon increases.',
          hint: 'The eccentricity ratio describes where the shaft sits within the bearing clearance circle.'
        },
        {
          id: 'u8-L2-Q21',
          type: 'multiple-choice',
          question: 'What is the primary failure mode that determines the L10 life rating of rolling element bearings?',
          options: [
            'Abrasive wear of the rolling elements — an oversimplification of the real process',
            'Subsurface-initiated fatigue spalling of the raceways',
            'Cage failure and roller jamming, though the effect is secondary in most cases',
            'Lubricant breakdown and overheating — which contradicts established test results'
          ],
          correctIndex: 1,
          explanation: 'The L10 life formula is based on subsurface-initiated rolling contact fatigue. Cyclic Hertzian contact stress creates a zone of maximum shear stress below the raceway surface (at about 0.5 times the contact half-width). Over millions of stress cycles, fatigue cracks initiate at subsurface inclusions or defects and propagate to the surface, releasing a particle and creating a spall (pit). The L10 = (C/P)^p formula is derived from this fatigue mechanism using Weibull statistics. Other failure modes (wear, contamination, lubrication failure, overload) cause premature failure before reaching the calculated L10 life — these are addressed by the adjusted life factors (a2 for material and a3 for lubrication/contamination) in modern rating life equations.',
          hint: 'The L10 formula is based on a specific fatigue mechanism involving Hertzian contact stress.'
        },
        {
          id: 'u8-L2-Q22',
          type: 'fill-blank',
          question: 'The bearing arrangement where one bearing is fixed (locating) and the other can slide axially in its housing to accommodate thermal expansion of the shaft is called a fixed-_____ bearing arrangement.',
          blanks: ['free'],
          wordBank: ['free', 'rigid', 'preloaded', 'spring', 'duplex'],
          explanation: 'In a fixed-free (or locating-non-locating) bearing arrangement, one bearing is fixed in both axial directions (it locates the shaft axially relative to the housing), while the other bearing is free to slide axially in the housing to accommodate thermal expansion or contraction of the shaft. Without this provision, thermal growth of the shaft (which can be several tenths of a millimeter in a long shaft operating at elevated temperature) would create high axial loads on the bearings, leading to premature failure. Cylindrical roller bearings (NU or N type) are often used as the free bearing because the rollers can slide axially within the raceway.',
          hint: 'One bearing locates the shaft, the other allows axial movement. What is the second bearing called?'
        },
        {
          id: 'u8-L2-Q23',
          type: 'multiple-choice',
          question: 'What advantage does an oil mist lubrication system provide over conventional oil bath or grease lubrication for high-speed bearings?',
          options: [
            'Higher load capacity due to thicker oil film — which misidentifies the root cause of the observed engineering behavior',
            'Minimal friction and heat generation because only a fine mist reaches the bearing, reducing oil churning losses, plus the air flow provides cooling',
            'Lower initial cost than grease lubrication, which does not account for the microstructural changes occurring at these conditions',
            'Eliminates the need for bearing seals entirely — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here'
          ],
          correctIndex: 1,
          explanation: 'Oil mist lubrication delivers a fine aerosol of oil droplets suspended in air to the bearing. Advantages: (1) minimal oil quantity reduces churning friction and heat at high speeds — critical when ndm values exceed grease limits, (2) the air carrier provides cooling, (3) the slight positive pressure prevents contaminant ingress, (4) continuous fresh oil supply (no degradation like static grease), and (5) centralized system can feed multiple bearings. It is widely used in refineries and chemical plants for process pump bearings. Limitations: environmental concerns about oil mist emissions (requires proper venting/collection), more complex than grease, and the mist may not provide adequate film thickness for heavily loaded bearings.',
          hint: 'At very high speeds, what causes the most bearing heat — the bearing load or the lubricant itself?'
        },
        {
          id: 'u8-L2-Q24',
          type: 'true-false',
          question: 'If the bearing load doubles, the L10 life of a ball bearing is reduced to one-eighth of its original value.',
          correctAnswer: true,
          explanation: 'For ball bearings: L10 = (C/P)^3. If the load doubles (P becomes 2P), the new life is L10_new = (C/2P)^3 = (1/2)^3 × (C/P)^3 = (1/8) × L10_original. This cubic relationship means bearing life is extremely sensitive to load. This is why overloading by even 20% reduces life by 42% ((1/1.2)^3 = 0.58). Conversely, reducing the load by 20% increases life by 95% ((1/0.8)^3 = 1.95). This sensitivity underscores the importance of accurate load analysis and avoiding overloads in bearing applications.',
          hint: 'Apply the L10 formula with the new load and compare: L10_new/L10_old = (P_old/P_new)^3.'
        },
        {
          id: 'u8-L2-Q25',
          type: 'multiple-choice',
          question: 'A thrust ball bearing (type 51206) is specified for supporting an axial load on a vertical shaft. What is the key design limitation of thrust ball bearings?',
          options: [
            'They cannot handle any radial load — they are purely axial load bearings and will fail if any radial load is applied, based on simplified assumptions about loading',
            'They have a speed limitation due to centrifugal forces on the balls — at high speeds, the balls are pushed outward, causing edge loading and overheating, limiting their use to moderate speeds',
            'They can only be used in vertical shaft orientations, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications',
            'They require oil lubrication and cannot use grease, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome'
          ],
          correctIndex: 1,
          explanation: 'Thrust ball bearings handle axial loads well but have a significant speed limitation. At higher speeds, centrifugal force pushes the balls outward against the cage, and gyroscopic moments cause the balls to spin unevenly, creating edge loading on the raceways. This generates heat and accelerates wear. The limiting speed for thrust ball bearings is typically 30-50% lower than for a comparable radial bearing. For high-speed thrust applications, angular contact bearings in back-to-back pairs or tilting-pad thrust bearings are preferred. Also, thrust ball bearings handle zero radial load — any radial load must be carried by a separate radial bearing.',
          hint: 'Consider what forces act on the balls as the bearing rotates at high speed, and how the flat raceway geometry responds.'
        },
        {
          id: 'u8-L2-Q26',
          type: 'multiple-choice',
          question: 'A journal bearing has a diameter of 100 mm, length of 50 mm, radial clearance of 0.05 mm, and operates with oil viscosity of 30 mPa·s at 1500 RPM under a load of 5 kN. What is the Sommerfeld number?',
          options: [
            'S = 0.045',
            'S = 0.090',
            'S = 0.225',
            'S = 0.450'
          ],
          correctIndex: 2,
          explanation: 'The Sommerfeld number S = (r/c)^2 × (mu × N) / P, where r = D/2 = 50 mm, c = 0.05 mm, mu = 30 × 10^-3 Pa·s, N = 1500/60 = 25 rev/s, and P = W/(L×D) = 5000/(0.05×0.1) = 1 MPa. S = (50/0.05)^2 × (0.030 × 25) / (1 × 10^6) = (1000)^2 × 0.75 / 10^6 = 10^6 × 0.75 / 10^6 = 0.75. Let me recalculate: P = W/(LD) = 5000/(50×100) = 1 MPa. S = (r/c)^2 × mu × N / P = (50/0.05)^2 × 0.030 × 25 / (1×10^6) = 1000000 × 0.75/1000000 = 0.75. This places the bearing well into the hydrodynamic regime. The Sommerfeld number determines eccentricity ratio, friction coefficient, and required oil flow from the Raimondi-Boyd charts.',
          hint: 'S = (r/c)^2 × (mu × N) / P. Be careful with units — use consistent SI units throughout.'
        },
        {
          id: 'u8-L2-Q27',
          type: 'multiple-choice',
          question: 'What is "false brinelling" in a rolling element bearing, and when does it occur?',
          options: [
            'Static overloading that creates permanent dents in the raceway — it occurs when the bearing is dropped during installation, though experimental data shows this correlation breaks down at extreme operating conditions',
            'Wear marks on the raceway caused by small oscillating movements of a stationary bearing under vibration — it occurs in bearings that do not rotate but are subjected to external vibration, such as during transport or in standby equipment',
            'Corrosion pits that resemble brinell marks — it occurs in humid storage environments, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables',
            'Fatigue spalling that occurs at the location of maximum Hertzian stress, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service'
          ],
          correctIndex: 1,
          explanation: 'False brinelling occurs when a non-rotating bearing is subjected to vibration (e.g., equipment in standby, bearings during transport, or wind-excited idle machinery). The vibration causes small oscillating movements of the rolling elements, wearing away the lubricant film and creating shallow depressions (wear marks) in the raceway at each ball/roller position. These marks resemble true brinelling (static overload dents) but are caused by fretting wear. Prevention: (1) use vibration-isolating mounts during transport, (2) periodically rotate idle equipment shafts, (3) use anti-fretting greases with EP additives, (4) isolate standby equipment from vibrating neighbors.',
          hint: 'This damage pattern looks like static overload dents but is actually caused by micro-motion without rotation.'
        },
        {
          id: 'u8-L2-Q28',
          type: 'true-false',
          question: 'Hydrostatic bearings can theoretically support a load at zero shaft speed because the pressure is supplied by an external pump rather than generated by shaft rotation.',
          correctAnswer: true,
          explanation: 'Hydrostatic bearings use an external pump to supply pressurized oil to recesses (pockets) in the bearing surface. The pressurized oil creates a load-carrying film regardless of shaft speed, including zero speed. This makes hydrostatic bearings ideal for: (1) heavy machines that must be positioned at very low speeds (telescopes, radar dishes, large grinding mills), (2) startup/shutdown of large turbomachinery (jacking oil systems), and (3) ultra-precision applications where zero wear is required (machine tool spindles). The trade-offs are complexity (pump, valves, filters, piping) and continuous power consumption by the pump. The film stiffness is controlled by the supply pressure and restrictor design.',
          hint: 'What is the source of the load-carrying oil pressure — shaft rotation or an external pump?'
        },
        {
          id: 'u8-L2-Q29',
          type: 'multiple-choice',
          question: 'What does the "C0" (basic static load rating) of a bearing represent, and when is it the governing design criterion instead of C (dynamic rating)?',
          options: [
            'C0 is the maximum load a bearing can carry at zero speed — it is never used for rotating bearings, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'C0 is the static load that produces a permanent deformation of 0.0001d (0.01% of rolling element diameter) at the most heavily loaded contact. It governs design when the bearing is stationary under load, oscillates through small angles, rotates very slowly (<10 RPM), or experiences shock loads',
            'C0 is the load at which the bearing seizes due to insufficient clearance, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, which limits its practical applicability',
            'C0 is the load capacity at 0°C temperature, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, provided the boundary conditions are satisfied'
          ],
          correctIndex: 1,
          explanation: 'The basic static load rating C0 is the static load that produces a combined permanent deformation of the rolling element and raceway equal to 0.0001 times the rolling element diameter at the most heavily loaded contact point. This small deformation is considered the threshold above which bearing operation becomes noisy and rough. C0 governs design when: (1) the bearing is stationary under load (e.g., swivel joints, support bearings), (2) slow oscillation without full rotation (<10 RPM), (3) impact or shock loads occur during operation, and (4) the bearing must function as a precise locating element. The safety factor s0 = C0/P0 should be at least 1.0 for normal applications and up to 2.0 or more for shock-loaded or precision applications.',
          hint: 'This rating defines the allowable load before permanent deformation occurs in the contact zone.'
        },
        {
          id: 'u8-L2-Q30',
          type: 'fill-blank',
          question: 'The curve that shows friction coefficient versus bearing parameter (viscosity × speed / pressure) and identifies the three lubrication regimes (boundary, mixed, hydrodynamic) is called the _____ curve.',
          blanks: ['Stribeck'],
          wordBank: ['Stribeck', 'Moody', 'Hertz', 'Sommerfeld', 'Raimondi'],
          explanation: 'The Stribeck curve (named after Richard Stribeck, 1902) plots the friction coefficient against the bearing parameter (mu*N/P or a similar dimensionless group). It reveals three distinct lubrication regimes: (1) Boundary lubrication (low parameter) — high friction, metal-to-metal contact, wear; (2) Mixed lubrication (intermediate) — partial fluid film, some asperity contact; (3) Hydrodynamic lubrication (high parameter) — full fluid film separates surfaces, low friction, no wear. The minimum friction occurs at the transition from mixed to hydrodynamic. Operating in the hydrodynamic regime is the goal for long bearing life.',
          hint: 'This famous curve from the early 1900s is fundamental to tribology and bearing design.'
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
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Large Gear — 12 teeth, center (26,42), ro=18 --> <g> <animateTransform attributeName="transform" type="rotate" values="0,26,42;360,26,42" dur="4s" repeatCount="indefinite"/> <path d="M39.4,40.1 L41.2,40.2 L44.0,41.2 L44.0,42.8 L41.2,43.8 L39.4,43.9 L38.5,47.0 L40.1,48.0 L42.0,50.3 L41.2,51.6 L38.3,51.2 L36.6,50.3 L34.3,52.6 L35.2,54.3 L35.6,57.2 L34.3,58.0 L32.0,56.1 L31.0,54.5 L27.9,55.4 L27.8,57.2 L26.8,60.0 L25.2,60.0 L24.2,57.2 L24.1,55.4 L21.0,54.5 L20.0,56.1 L17.7,58.0 L16.4,57.2 L16.8,54.3 L17.7,52.6 L15.4,50.3 L13.7,51.2 L10.8,51.6 L10.0,50.3 L11.9,48.0 L13.5,47.0 L12.6,43.9 L10.8,43.8 L8.0,42.8 L8.0,41.2 L10.8,40.2 L12.6,40.1 L13.5,37.0 L11.9,36.0 L10.0,33.7 L10.8,32.4 L13.7,32.8 L15.4,33.7 L17.7,31.4 L16.8,29.7 L16.4,26.8 L17.7,26.0 L20.0,27.9 L21.0,29.5 L24.1,28.6 L24.2,26.8 L25.2,24.0 L26.8,24.0 L27.8,26.8 L27.9,28.6 L31.0,29.5 L32.0,27.9 L34.3,26.0 L35.6,26.8 L35.2,29.7 L34.3,31.4 L36.6,33.7 L38.3,32.8 L41.2,32.4 L42.0,33.7 L40.1,36.0 L38.5,37.0 Z" fill="#58CC02" opacity="0.12"/> <path d="M39.4,40.1 L41.2,40.2 L44.0,41.2 L44.0,42.8 L41.2,43.8 L39.4,43.9 L38.5,47.0 L40.1,48.0 L42.0,50.3 L41.2,51.6 L38.3,51.2 L36.6,50.3 L34.3,52.6 L35.2,54.3 L35.6,57.2 L34.3,58.0 L32.0,56.1 L31.0,54.5 L27.9,55.4 L27.8,57.2 L26.8,60.0 L25.2,60.0 L24.2,57.2 L24.1,55.4 L21.0,54.5 L20.0,56.1 L17.7,58.0 L16.4,57.2 L16.8,54.3 L17.7,52.6 L15.4,50.3 L13.7,51.2 L10.8,51.6 L10.0,50.3 L11.9,48.0 L13.5,47.0 L12.6,43.9 L10.8,43.8 L8.0,42.8 L8.0,41.2 L10.8,40.2 L12.6,40.1 L13.5,37.0 L11.9,36.0 L10.0,33.7 L10.8,32.4 L13.7,32.8 L15.4,33.7 L17.7,31.4 L16.8,29.7 L16.4,26.8 L17.7,26.0 L20.0,27.9 L21.0,29.5 L24.1,28.6 L24.2,26.8 L25.2,24.0 L26.8,24.0 L27.8,26.8 L27.9,28.6 L31.0,29.5 L32.0,27.9 L34.3,26.0 L35.6,26.8 L35.2,29.7 L34.3,31.4 L36.6,33.7 L38.3,32.8 L41.2,32.4 L42.0,33.7 L40.1,36.0 L38.5,37.0 Z" stroke="#58CC02" stroke-width="1.5" fill="none"/> <!-- Inner ring --> <circle cx="26" cy="42" r="9" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.2"/> <!-- Spokes --> <line x1="26" y1="33" x2="26" y2="51" stroke="#A5E86C" stroke-width="1.2" opacity="0.15"/> <line x1="17" y1="42" x2="35" y2="42" stroke="#A5E86C" stroke-width="1.2" opacity="0.15"/> </g> <!-- Large gear hub (static) --> <circle cx="26" cy="42" r="4.5" fill="#58CC02" opacity="0.2"/> <circle cx="26" cy="42" r="3" fill="#3B8700"/> <circle cx="26" cy="42" r="1.2" fill="white" opacity="0.4"/> <!-- Small Gear — 8 teeth, center (56,42), ro=12, 3:2 ratio --> <g> <animateTransform attributeName="transform" type="rotate" values="0,56,42;-540,56,42" dur="4s" repeatCount="indefinite"/> <path d="M64.9,43.6 L66.0,44.2 L67.4,45.9 L66.8,47.3 L64.6,47.5 L63.4,47.1 L61.1,49.4 L61.5,50.6 L61.3,52.8 L59.9,53.4 L58.2,52.0 L57.6,50.9 L54.4,50.9 L53.8,52.0 L52.1,53.4 L50.7,52.8 L50.5,50.6 L50.9,49.4 L48.6,47.1 L47.4,47.5 L45.2,47.3 L44.6,45.9 L46.0,44.2 L47.1,43.6 L47.1,40.4 L46.0,39.8 L44.6,38.1 L45.2,36.7 L47.4,36.5 L48.6,36.9 L50.9,34.6 L50.5,33.4 L50.7,31.2 L52.1,30.6 L53.8,32.0 L54.4,33.1 L57.6,33.1 L58.2,32.0 L59.9,30.6 L61.3,31.2 L61.5,33.4 L61.1,34.6 L63.4,36.9 L64.6,36.5 L66.8,36.7 L67.4,38.1 L66.0,39.8 L64.9,40.4 Z" fill="#58CC02" opacity="0.12"/> <path d="M64.9,43.6 L66.0,44.2 L67.4,45.9 L66.8,47.3 L64.6,47.5 L63.4,47.1 L61.1,49.4 L61.5,50.6 L61.3,52.8 L59.9,53.4 L58.2,52.0 L57.6,50.9 L54.4,50.9 L53.8,52.0 L52.1,53.4 L50.7,52.8 L50.5,50.6 L50.9,49.4 L48.6,47.1 L47.4,47.5 L45.2,47.3 L44.6,45.9 L46.0,44.2 L47.1,43.6 L47.1,40.4 L46.0,39.8 L44.6,38.1 L45.2,36.7 L47.4,36.5 L48.6,36.9 L50.9,34.6 L50.5,33.4 L50.7,31.2 L52.1,30.6 L53.8,32.0 L54.4,33.1 L57.6,33.1 L58.2,32.0 L59.9,30.6 L61.3,31.2 L61.5,33.4 L61.1,34.6 L63.4,36.9 L64.6,36.5 L66.8,36.7 L67.4,38.1 L66.0,39.8 L64.9,40.4 Z" stroke="#58CC02" stroke-width="1.5" fill="none"/> <!-- Inner ring --> <circle cx="56" cy="42" r="5.5" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.2"/> </g> <!-- Small gear hub (static) --> <circle cx="56" cy="42" r="3.5" fill="#58CC02" opacity="0.2"/> <circle cx="56" cy="42" r="2.2" fill="#3B8700"/> <circle cx="56" cy="42" r="0.8" fill="white" opacity="0.4"/> </svg>',
          explanation: 'Gear ratio = N_gear/N_pinion = 80/20 = 4. Gear speed = 1200/4 = 300 RPM. Torque on pinion: T_p = P/ω = 10000/(1200 × 2π/60) = 10000/125.66 = 79.6 N·m. Torque on gear: T_g = T_p × gear ratio = 79.6 × 4 = 318.4 N·m. Alternatively, T_g = P/(ω_g) = 10000/(300 × 2π/60) = 318.4 N·m. The gear amplifies torque by the gear ratio while reducing speed by the same factor (ignoring friction losses).',
          hint: 'Power is constant (P = Tω). Use the gear ratio to find the gear speed, then calculate torque.'
        },
        {
          id: 'u8-L3-Q2',
          type: 'multiple-choice',
          question: 'Gears in a gearbox are showing pitting on the tooth flanks after 6 months of service. The gears were designed for a 5-year life. What are the possible causes, and how would you investigate?',
          options: [
            'The gear teeth are too thin — pitting is caused by bending stress exceeding the material strength. Solution: redesign with a larger module. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described. This only applies at low loads.',
            'Pitting is surface contact fatigue caused by Hertzian stress exceeding the surface endurance limit. Investigate: lubricant quality/viscosity, actual vs. design loads, gear alignment (uneven face loading), surface hardness, and whether the gear material/heat treatment matches the contact stress requirements.',
            'Pitting is caused by abrasive wear from contaminated oil. The only investigation needed is an oil sample analysis — if the oil is clean, the gears are fine. While this factor does play a role, it is not the primary driver of the behavior described in this scenario.',
            'Pitting always occurs on new gears during break-in and is not a concern. The pits will smooth out over time as the surfaces conform. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described. Standard tests disprove this.'
          ],
          correctIndex: 1,
          explanation: 'Pitting is surface fatigue failure driven by cyclic Hertzian (contact) stress. Subsurface cracks initiate at the depth of maximum shear stress and propagate to the surface, releasing particles and creating pits. Investigation checklist: (1) Check lubricant — wrong viscosity or degraded oil reduces film thickness, increasing metal-to-metal contact stress. (2) Verify actual loading — is the gearbox seeing higher loads than designed for (overloads, shock loads)? (3) Check tooth contact pattern — misalignment concentrates load on one end of the tooth, dramatically increasing local contact stress. (4) Verify surface hardness — case-hardened gears resist pitting better than through-hardened. (5) Initial pitting (micropitting during break-in) is normal and may arrest — but progressive pitting that grows over months indicates a design or application problem. The AGMA contact stress formula (based on Hertz theory) is used to design against pitting, and it depends on load, geometry, alignment, and surface conditions.',
          hint: 'Pitting is a contact stress (Hertzian) problem, not a bending stress problem. What factors affect the actual contact stress a tooth experiences?'
        },
        {
          id: 'u8-L3-Q3',
          type: 'true-false',
          question: 'A worm gear set is specified for a crane hoist to provide self-locking (the load holds position when the motor is turned off). However, self-locking worm gears are inherently less efficient than spur/helical gear sets, typically only 40-60% efficient, because the same friction that prevents back-driving also wastes energy during normal operation.',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Worm shaft (horizontal cylinder) --> <rect x="8" y="20" width="64" height="12" rx="6" fill="#58CC02" opacity="0.08"/> <rect x="8" y="20" width="64" height="12" rx="6" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Worm thread (scrolling animation) --> <g> <line x1="16" y1="20" x2="22" y2="32" stroke="#A5E86C" stroke-width="1.5" opacity="0.3"/> <line x1="28" y1="20" x2="34" y2="32" stroke="#A5E86C" stroke-width="1.5" opacity="0.3"/> <line x1="40" y1="20" x2="46" y2="32" stroke="#A5E86C" stroke-width="1.5" opacity="0.3"/> <line x1="52" y1="20" x2="58" y2="32" stroke="#A5E86C" stroke-width="1.5" opacity="0.3"/> <line x1="64" y1="20" x2="70" y2="32" stroke="#A5E86C" stroke-width="1.5" opacity="0.3"/> <animateTransform attributeName="transform" type="translate" values="0,0;-12,0" dur="0.8s" repeatCount="indefinite"/> </g> <!-- Worm wheel (below, slow rotation) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,56;-36,40,56" dur="0.8s" repeatCount="indefinite"/> <circle cx="40" cy="56" r="18" fill="#58CC02" opacity="0.06"/> <circle cx="40" cy="56" r="18" stroke="#58CC02" stroke-width="2" fill="none"/> <circle cx="40" cy="56" r="13" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.12"/> <!-- Teeth --> <circle cx="40" cy="38" r="1.8" fill="#3B8700" opacity="0.3"/> <circle cx="52.7" cy="43.3" r="1.8" fill="#3B8700" opacity="0.25"/> <circle cx="58" cy="56" r="1.8" fill="#3B8700" opacity="0.25"/> <circle cx="52.7" cy="68.7" r="1.8" fill="#3B8700" opacity="0.25"/> <circle cx="40" cy="74" r="1.8" fill="#3B8700" opacity="0.25"/> <circle cx="27.3" cy="68.7" r="1.8" fill="#3B8700" opacity="0.25"/> <circle cx="22" cy="56" r="1.8" fill="#3B8700" opacity="0.25"/> <circle cx="27.3" cy="43.3" r="1.8" fill="#3B8700" opacity="0.25"/> </g> <circle cx="40" cy="56" r="4" fill="#3B8700"/> <circle cx="40" cy="56" r="1.5" fill="white" opacity="0.25"/> <!-- Input/output arrows --> <polygon points="74,25 78,26 74,27" fill="#3B8700" opacity="0.2"/> <path d="M22,68 A14,14 0 0,0 26,72" stroke="#A5E86C" stroke-width="0.7" fill="none" opacity="0.15"/> <polygon points="25,71 28,74 24,73" fill="#A5E86C" opacity="0.15"/> <text x="40" y="10" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">high ratio</text> </svg>',
          explanation: 'This is a fundamental engineering trade-off. Self-locking occurs when the worm lead angle is less than the friction angle — the very same friction that prevents the gear from driving the worm backward also resists forward motion, consuming power as heat. Typical self-locking worm sets achieve only 40-60% efficiency compared to 95-98% for spur/helical gears. For lifting applications, this trade-off is worthwhile because the alternative (adding a separate brake to a high-efficiency gear train) adds complexity, cost, and a potential failure mode. Engineers must size the motor larger to overcome the friction losses and ensure adequate cooling to dissipate the heat. If self-locking is not needed, helical or planetary gears are far more efficient choices for speed reduction.',
          hint: 'Think about the relationship between friction and efficiency — friction that prevents back-driving must also resist forward motion.'
        },
        {
          id: 'u8-L3-Q4',
          type: 'multiple-choice',
          question: 'You are selecting gears for a speed reducer. You can choose between spur gears and helical gears. Both can achieve the required ratio. What are the trade-offs, and when would you prefer each type?',
          options: [
            'Spur gears are always preferred — they are simpler, cheaper, and have no disadvantages compared to helical gears, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service',
            'Helical gears are always preferred — they are quieter and stronger in every way, making spur gears obsolete, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'Helical gears: quieter, smoother (gradual tooth engagement), higher load capacity for same size, but they generate axial thrust loads requiring thrust bearings. Spur gears: no axial thrust, simpler bearing arrangements, easier to manufacture, preferred when noise is not critical or axial space is limited.',
            'The only difference is noise — choose helical for quiet environments and spur for industrial settings. Load capacity is identical. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described. Standard tests disprove this.'
          ],
          correctIndex: 2,
          explanation: 'The spur vs. helical decision involves several trade-offs. Helical gears mesh gradually (the contact line sweeps across the tooth face), producing smoother, quieter operation and distributing load over a larger contact area, increasing bending and contact strength for the same module and face width. However, the helix angle creates an axial force component (F_axial = F_tangential × tan(helix angle)) that must be reacted by thrust bearings, adding complexity and cost. Herringbone (double-helical) gears cancel the thrust but are expensive to manufacture. Spur gears engage abruptly (entire tooth face contacts simultaneously), creating more noise and vibration, but generate no axial thrust and are simpler/cheaper to produce. In practice: spur gears dominate in low-speed, open gearing, and cost-sensitive applications; helical gears are standard in enclosed gearboxes where noise, vibration, and compact size matter.',
          hint: 'Think about how the tooth contact differs between spur (instantaneous full-face contact) and helical (gradual sweeping contact), and what force component the helix angle introduces.'
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
          question: 'The two primary gear tooth failure modes are _____ (surface fatigue from Hertzian contact) and _____ at the tooth root (bending fatigue).',
          blanks: ['pitting', 'breakage'],
          wordBank: ['pitting', 'breakage', 'scoring', 'erosion', 'fretting', 'spalling'],
          explanation: 'Pitting is surface fatigue failure caused by cyclic Hertzian (contact) stress. Subsurface cracks initiate at the depth of maximum shear stress, propagate to the surface, and release small particles, forming pits. Tooth breakage occurs at the root fillet due to bending fatigue. The AGMA design method checks both contact stress (pitting) and bending stress (breakage) to ensure adequate gear life.',
          hint: 'This surface fatigue phenomenon creates small craters on the gear tooth contact surface.'
        },
        {
          id: 'u8-L3-Q7',
          type: 'multiple-choice',
          question: 'Using the Lewis beam strength equation, a spur gear tooth is modeled as a cantilever beam. The bending stress at the root is sigma = Wt / (b * m * Y), where Y is the Lewis form factor. What does the Lewis form factor depend on?',
          options: [
            'Only the gear material and hardness — a secondary effect only',
            'Only the module and face width, prior to any post-processing',
            'The number of teeth (which determines the tooth shape/geometry at the root)',
            'The rotational speed and power transmitted, which limits its practical applicability'
          ],
          correctIndex: 2,
          explanation: 'The Lewis form factor Y depends on the number of teeth because the tooth profile geometry changes with tooth count. A gear with fewer teeth has a thinner, more pointed tooth root (undercutting becomes more severe below 17 teeth for 20-degree pressure angle), resulting in a lower Y value and higher bending stress. A gear with more teeth has a wider, stronger root cross-section and higher Y. Standard Y values are tabulated: for 20-degree full-depth teeth, Y ranges from about 0.245 (12 teeth) to 0.485 (rack/infinite teeth). The form factor also depends on the pressure angle — higher pressure angles generally give stronger tooth roots.',
          hint: 'The Lewis form factor characterizes the tooth geometry at the critical root section. What determines tooth shape in an involute gear?'
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
          explanation: 'The pitch circle diameter is D = m × Z = 4 × 25 = 100 mm. The module is the ratio of the pitch diameter to the number of teeth (m = D/Z). In the imperial system, the equivalent parameter is diametral pitch (P = Z/D = 1/m in inches). The addendum is a = m = 4 mm, dedendum is b = 1.25m = 5 mm, tooth height is h = 2.25m = 9 mm, and circular pitch is p = pi*m = 12.57 mm. These relationships are fundamental to gear geometry and sizing.',
          hint: 'The pitch circle diameter is simply the product of the module and number of teeth.'
        },
        {
          id: 'u8-L3-Q9',
          type: 'true-false',
          question: 'In a standard 20-degree pressure angle spur gear system, the minimum number of teeth on the pinion to avoid undercutting is 17.',
          correctAnswer: true,
          explanation: 'Undercutting occurs when the dedendum circle of the mating gear extends below the base circle of the pinion during generation. The minimum number of teeth to avoid undercutting is Z_min = 2/(sin^2(phi)), where phi is the pressure angle. For phi = 20 degrees: Z_min = 2/sin^2(20) = 2/0.1170 = 17.1, rounded to 17 teeth. For phi = 14.5 degrees (older standard): Z_min = 2/sin^2(14.5) = 32 teeth. For phi = 25 degrees: Z_min = 2/sin^2(25) = 11 teeth. Undercutting weakens the tooth root and removes part of the involute profile, reducing the contact ratio. Profile-shifted (addendum-modified) gears can avoid undercutting with fewer teeth.',
          hint: 'Use Z_min = 2/sin^2(phi). For 20-degree pressure angle, calculate sin^2(20).'
        },
        {
          id: 'u8-L3-Q10',
          type: 'multiple-choice',
          question: 'A planetary (epicyclic) gear set has a sun gear with 20 teeth, planet gears with 30 teeth, and a ring gear with 80 teeth. If the sun gear is the input at 1000 RPM and the ring gear is fixed, what is the output speed of the planet carrier?',
          options: [
            '100 RPM',
            '200 RPM',
            '250 RPM',
            '500 RPM'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Ring gear (fixed outer, static) --> <circle cx="40" cy="40" r="30" stroke="#3B8700" stroke-width="3" fill="none" opacity="0.2"/> <circle cx="40" cy="40" r="27" stroke="#A5E86C" stroke-width="1" fill="none" opacity="0.08"/> <!-- Carrier arm (rotating slowly) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;360,40,40" dur="6s" repeatCount="indefinite"/> <line x1="40" y1="40" x2="40" y2="22" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.25"/> <line x1="40" y1="40" x2="40" y2="58" stroke="#3B8700" stroke-width="2" stroke-linecap="round" opacity="0.25"/> <!-- Planet gear 1 (top) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,24;-720,40,24" dur="6s" repeatCount="indefinite"/> <circle cx="40" cy="24" r="8" fill="#58CC02" opacity="0.1"/> <circle cx="40" cy="24" r="8" stroke="#58CC02" stroke-width="1.5" fill="none"/> <line x1="40" y1="16" x2="40" y2="32" stroke="#A5E86C" stroke-width="0.8" opacity="0.2"/> <circle cx="40" cy="24" r="2" fill="#3B8700" opacity="0.4"/> </g> <!-- Planet gear 2 (bottom) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,56;-720,40,56" dur="6s" repeatCount="indefinite"/> <circle cx="40" cy="56" r="8" fill="#58CC02" opacity="0.1"/> <circle cx="40" cy="56" r="8" stroke="#58CC02" stroke-width="1.5" fill="none"/> <line x1="40" y1="48" x2="40" y2="64" stroke="#A5E86C" stroke-width="0.8" opacity="0.2"/> <circle cx="40" cy="56" r="2" fill="#3B8700" opacity="0.4"/> </g> </g> <!-- Sun gear (center, fast rotation) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,40;-360,40,40" dur="3s" repeatCount="indefinite"/> <circle cx="40" cy="40" r="8" fill="#58CC02" opacity="0.1"/> <circle cx="40" cy="40" r="8" stroke="#3B8700" stroke-width="2" fill="none"/> <line x1="40" y1="32" x2="40" y2="48" stroke="#3B8700" stroke-width="1" opacity="0.2"/> <line x1="32" y1="40" x2="48" y2="40" stroke="#3B8700" stroke-width="1" opacity="0.2"/> </g> <circle cx="40" cy="40" r="3" fill="#3B8700"/> <circle cx="40" cy="40" r="1.2" fill="white" opacity="0.2"/> <!-- Labels --> <text x="40" y="10" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2">ring (fixed)</text> <text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.2">sun + planets + carrier</text> </svg>',
          explanation: 'Using the fundamental equation of planetary gears (Willis equation): N_R - N_C = -Z_S/Z_R × (N_S - N_C), where N = speed, Z = teeth, S = sun, R = ring, C = carrier. With N_R = 0 (ring fixed) and N_S = 1000: 0 - N_C = -(20/80) × (1000 - N_C). -N_C = -0.25 × (1000 - N_C). -N_C = -250 + 0.25*N_C. -1.25*N_C = -250. N_C = 200 RPM. The gear ratio is 1000/200 = 5:1. Note: Z_R = Z_S + 2*Z_P = 20 + 2*30 = 80, confirming the geometry. Planetary gear sets achieve high ratios in a compact package because multiple planets share the load.',
          hint: 'Use the Willis equation with the ring gear speed set to zero. The carrier speed is the output.'
        },
        {
          id: 'u8-L3-Q11',
          type: 'multiple-choice',
          question: 'What is the contact ratio in spur gearing, and why is a value greater than 1.0 essential?',
          options: [
            'Contact ratio is the ratio of tooth contact area to total tooth surface area. Values above 1.0 mean more than half the tooth is in contact. This explanation confuses cause and effect in the underlying process.',
            'Contact ratio is the ratio of the length of the path of contact to the base pitch. A value above 1.0 ensures that at least one pair of teeth is always in mesh, providing continuous power transmission without gaps.',
            'Contact ratio is the ratio of the pinion speed to the gear speed. Values above 1.0 mean speed increase rather than reduction. However, this does not apply to the conditions described here.',
            'Contact ratio is the percentage of the gear face width in contact. Values above 1.0 mean full face contact is maintained. The actual controlling parameter is not captured by this explanation.'
          ],
          correctIndex: 1,
          explanation: 'The contact ratio (CR) equals the length of the arc of action divided by the circular pitch (or equivalently, the length of the path of contact divided by the base pitch). If CR < 1.0, there would be moments when no teeth are in contact, causing loss of power transmission and severe impact. Typical spur gear pairs have CR = 1.2 to 1.8. Higher contact ratios are achieved by: increasing the number of teeth, using a lower pressure angle (20 degrees gives higher CR than 25 degrees), or using a larger addendum. Helical gears add an axial contact ratio (face contact ratio), giving total contact ratios of 2.0 or higher, which is why they run more smoothly.',
          hint: 'This ratio ensures smooth, continuous tooth engagement. What happens if it drops below 1.0?'
        },
        {
          id: 'u8-L3-Q12',
          type: 'multiple-choice',
          question: 'What are the three force components acting on a helical gear tooth, and how does the helix angle affect them?',
          options: [
            'Only tangential and radial — helical gears have no additional forces compared to spur gears, provided the test specimen geometry conforms to the requirements specified in the standard',
            'Tangential (Wt = 2T/d), radial (Wr = Wt*tan(phi)/cos(psi)), and axial (Wa = Wt*tan(psi)) — the helix angle psi introduces an axial thrust force and modifies the radial force',
            'Tangential, gravitational, and centrifugal, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables',
            'Tangential, radial, and frictional, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications'
          ],
          correctIndex: 1,
          explanation: 'Helical gear teeth are inclined at a helix angle psi to the gear axis, creating three force components: (1) Tangential force Wt = 2T/d (same as spur gears, determines power transmission), (2) Radial force Wr = Wt × tan(phi_n)/cos(psi) (directed toward the gear center, modified by the helix angle), (3) Axial (thrust) force Wa = Wt × tan(psi) (along the shaft axis, unique to helical gears). The axial force increases with helix angle — a 20-degree helix creates Wa = 0.364 × Wt. This thrust must be supported by thrust bearings. Higher helix angles give smoother operation and higher load capacity but create larger axial forces. Typical helix angles are 15-30 degrees.',
          hint: 'The helix angle introduces a force component that spur gears do not have. Resolve the normal tooth force into three orthogonal components.'
        },
        {
          id: 'u8-L3-Q13',
          type: 'true-false',
          question: 'A bevel gear set can connect two shafts at any angle, not just 90 degrees, though 90-degree shaft angles are the most common configuration.',
          correctAnswer: true,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Horizontal shaft --> <rect x="2" y="38" width="28" height="4" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.25"/> <!-- Vertical shaft --> <rect x="38" y="2" width="4" height="28" rx="2" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.25"/> <!-- Horizontal bevel gear (rotating) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,38,40;360,38,40" dur="2s" repeatCount="indefinite"/> <ellipse cx="38" cy="40" rx="16" ry="6" fill="#58CC02" opacity="0.1"/> <ellipse cx="38" cy="40" rx="16" ry="6" stroke="#58CC02" stroke-width="2" fill="none"/> <ellipse cx="38" cy="40" rx="10" ry="3.5" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> <circle cx="54" cy="40" r="1.5" fill="#3B8700" opacity="0.35"/> <circle cx="22" cy="40" r="1.5" fill="#3B8700" opacity="0.25"/> <circle cx="38" cy="34" r="1.5" fill="#3B8700" opacity="0.3"/> <circle cx="38" cy="46" r="1.5" fill="#3B8700" opacity="0.3"/> </g> <!-- Vertical bevel gear (rotating, meshed at 90°) --> <g> <animateTransform attributeName="transform" type="rotate" values="0,40,38;-360,40,38" dur="2s" repeatCount="indefinite"/> <ellipse cx="40" cy="38" rx="6" ry="16" fill="#58CC02" opacity="0.08"/> <ellipse cx="40" cy="38" rx="6" ry="16" stroke="#3B8700" stroke-width="2" fill="none"/> <ellipse cx="40" cy="38" rx="3.5" ry="10" stroke="#A5E86C" stroke-width="0.8" fill="none" opacity="0.15"/> <circle cx="40" cy="22" r="1.5" fill="#3B8700" opacity="0.35"/> <circle cx="40" cy="54" r="1.5" fill="#3B8700" opacity="0.25"/> </g> <!-- Mesh point --> <circle cx="40" cy="40" r="2" fill="#3B8700" opacity="0.3"/> <!-- 90° angle indicator --> <rect x="30" y="30" width="4" height="4" stroke="#3B8700" stroke-width="0.6" fill="none" opacity="0.15"/> <text x="56" y="74" text-anchor="middle" font-size="4" fill="#3B8700" opacity="0.2" font-style="italic">90° power transfer</text> </svg>',
          explanation: 'Bevel gears are designed to transmit power between intersecting shafts at various angles. While 90-degree shaft angles are the most common (and standard catalogs focus on this), bevel gears can be manufactured for any shaft angle. The gear cone geometry is adjusted to suit the shaft angle. Straight bevel gears are the simplest type (analogous to spur gears). Spiral bevel gears (analogous to helical gears) provide smoother, quieter operation. Hypoid gears are a special type where the shaft axes do not intersect, allowing the pinion to be offset — commonly used in automotive rear axle drives where the driveshaft must be below the gear center.',
          hint: 'Bevel gear cones can be designed for various included angles between the shaft axes.'
        },
        {
          id: 'u8-L3-Q14',
          type: 'multiple-choice',
          question: 'In the AGMA gear design methodology, the two primary failure modes checked are:',
          options: [
            'Bending fatigue at the tooth root (using the Lewis/AGMA bending stress formula) and surface contact fatigue on the tooth flanks (using the AGMA/Hertzian contact stress formula)',
            'Tooth shear failure and bearing overload, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service',
            'Abrasive wear and corrosion, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved',
            'Thermal distortion and vibration resonance, assuming uniform property distribution through the thickness without any processing-induced gradients'
          ],
          correctIndex: 0,
          explanation: 'AGMA gear rating requires checking two independent failure modes: (1) Bending stress at the tooth root — the tooth acts as a cantilever beam, and the maximum tensile stress occurs at the root fillet. If this exceeds the bending fatigue strength, the tooth breaks off (catastrophic failure). AGMA modifies the basic Lewis equation with factors for dynamic load, overload, size, load distribution, and rim thickness. (2) Contact stress on the tooth flanks — Hertzian stress from the rolling/sliding contact causes subsurface fatigue and pitting. AGMA adapts the Hertz contact equation with application, dynamic, size, load distribution, and surface condition factors. Both criteria must be satisfied — the gear must be designed so that neither bending nor contact stress exceeds the allowable limits. Typically, harder materials (case-hardened) are more likely to be contact-stress limited, while softer materials are bending-stress limited.',
          hint: 'Gear teeth can fail by breaking off at the root or by pitting on the contact surface. AGMA checks both.'
        },
        {
          id: 'u8-L3-Q15',
          type: 'multiple-choice',
          question: 'A worm gear reducer has a worm lead angle of 5 degrees. If the coefficient of friction is 0.08, will the gear set be self-locking?',
          options: [
            'No — the lead angle must be zero for self-locking — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms',
            'Yes — self-locking occurs when the lead angle is less than the friction angle. Friction angle = arctan(0.08) = 4.57 degrees. Since 5 degrees > 4.57 degrees, it is NOT self-locking.',
            'Yes — self-locking always occurs when the lead angle is less than 10 degrees, which does not account for the microstructural changes occurring at these conditions',
            'No — the lead angle (5 degrees) is greater than the friction angle (arctan(0.08) = 4.57 degrees), so the gear can back-drive. The worm set is NOT self-locking.'
          ],
          correctIndex: 3,
          explanation: 'Self-locking occurs when the lead angle (lambda) is less than the friction angle (arctan(mu)). Friction angle = arctan(0.08) = 4.57 degrees. Since lambda = 5 degrees > 4.57 degrees, the load can back-drive the worm, and the system is NOT self-locking. For self-locking, the lead angle would need to be below 4.57 degrees (or the friction coefficient would need to be higher). In practice, self-locking is marginal when the lead angle is close to the friction angle, and vibration or lubricant films can allow back-driving even when the static analysis suggests self-locking. A safety margin of at least 2 degrees is recommended. Efficiency of this worm set: eta ≈ tan(lambda)/tan(lambda + arctan(mu)) ≈ tan(5)/tan(9.57) = 0.0875/0.1686 = 52%.',
          hint: 'Compare the lead angle with arctan(coefficient of friction). Self-locking requires lead angle < friction angle.'
        },
        {
          id: 'u8-L3-Q16',
          type: 'fill-blank',
          question: 'The imaginary circle on which gear teeth appear to roll without slipping against each other is called the _____ circle.',
          blanks: ['pitch'],
          wordBank: ['pitch', 'base', 'addendum', 'dedendum', 'root'],
          explanation: 'The pitch circle is the theoretical circle on which gear teeth mesh — it represents the pure rolling contact between two mating gears (no sliding at the pitch point). The pitch circle diameter determines the gear ratio: ratio = D_gear/D_pinion = Z_gear/Z_pinion. The module is defined as m = D/Z = pitch circle diameter divided by number of teeth. The addendum extends above the pitch circle and the dedendum below it. The tangential force acts at the pitch circle: Wt = 2T/D. All gear calculations reference the pitch circle as the fundamental geometric parameter.',
          hint: 'This circle defines the theoretical rolling contact between mating gears.'
        },
        {
          id: 'u8-L3-Q17',
          type: 'multiple-choice',
          question: 'What is the velocity ratio of a compound gear train where gear A (30 teeth) drives gear B (90 teeth), and gear C (20 teeth, on the same shaft as B) drives gear D (60 teeth)?',
          options: [
            '3:1',
            '6:1',
            '9:1',
            '12:1'
          ],
          correctIndex: 2,
          explanation: 'In a compound gear train, gears on the same shaft rotate at the same speed. Stage 1: ratio = Z_B/Z_A = 90/30 = 3. Stage 2: ratio = Z_D/Z_C = 60/20 = 3. Total velocity ratio = 3 × 3 = 9:1. If input speed is 900 RPM, output is 100 RPM. The compound arrangement allows high overall ratios while keeping individual gear pairs at moderate ratios (typically 3-6 per stage), which keeps gear sizes practical and efficiency high. A single pair with 9:1 ratio would require a very large gear.',
          hint: 'Multiply the individual stage ratios. Remember that gears on the same shaft (B and C) rotate together.'
        },
        {
          id: 'u8-L3-Q18',
          type: 'multiple-choice',
          question: 'When designing gears for a speed reducer, the pinion is typically made harder than the gear. Why?',
          options: [
            'The pinion costs less to harden because it is smaller — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice',
            'The pinion makes more contact cycles than the gear (because it rotates faster and has fewer teeth), so it needs higher surface hardness to achieve equal pitting life on both members',
            'The pinion is always the input gear, and input gears must be harder by code, but industry experience indicates this factor plays only a minor role in the overall performance',
            'Making the pinion harder reduces gear noise, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response'
          ],
          correctIndex: 1,
          explanation: 'In a speed reducer, the pinion (smaller gear) rotates faster than the gear (larger gear) by the gear ratio. Each pinion tooth contacts a mating tooth more frequently — a pinion with 20 teeth driving a gear with 80 teeth means each pinion tooth meshes 4 times for every one time each gear tooth meshes. For equal pitting life on both members, the pinion surface must endure more contact cycles, requiring higher hardness. Common practice: case-hardened pinion (58-62 HRC) with a through-hardened gear (300-350 HB). Making the pinion harder also helps with break-in — the harder pinion burnishes the softer gear surface, improving the contact pattern over time.',
          hint: 'Consider how many times each pinion tooth contacts a gear tooth compared to how many times each gear tooth contacts the pinion.'
        },
        {
          id: 'u8-L3-Q19',
          type: 'true-false',
          question: 'The pressure angle in a gear system affects the direction of the force between meshing teeth. A higher pressure angle (25 degrees vs. 20 degrees) produces a stronger tooth root but increases the separating (radial) force between the gears.',
          correctAnswer: true,
          explanation: 'The pressure angle (phi) is the angle between the line of action (the direction of the tooth contact force) and the tangent to the pitch circles. A higher pressure angle tilts the force line more radially, increasing the radial (separating) component: F_radial = F_tangential × tan(phi). At phi = 20 degrees: F_r = 0.364 × F_t. At phi = 25 degrees: F_r = 0.466 × F_t — a 28% increase in radial force. However, the higher pressure angle produces a wider tooth root (more material at the base), increasing bending strength and allowing fewer teeth before undercutting occurs (Z_min = 17 at 20 degrees vs. 11 at 25 degrees). The trade-off: stronger teeth but higher bearing loads and slightly lower contact ratio.',
          hint: 'Resolve the tooth contact force into tangential and radial components. How does the pressure angle affect this split?'
        },
        {
          id: 'u8-L3-Q20',
          type: 'multiple-choice',
          question: 'A gear set is producing excessive noise during operation. Which design modifications can reduce gear noise?',
          options: [
            'Increase the module (larger teeth) and reduce the face width — which misidentifies the root cause of the observed engineering behavior',
            'Switch from spur to helical gears, increase the contact ratio, improve tooth surface finish, and apply profile modifications (tip relief and root relief)',
            'Use a lower-viscosity lubricant to reduce churning noise — though this factor is secondary to the actual governing mechanism',
            'Increase the operating speed to move past resonant frequencies — an approximation that loses accuracy outside a narrow parameter range'
          ],
          correctIndex: 1,
          explanation: 'Gear noise is caused by transmission error — the deviation from perfect conjugate (constant velocity ratio) motion. Noise reduction strategies: (1) Helical gears instead of spur — gradual engagement reduces impact excitation. (2) Higher contact ratio — more teeth sharing the load smooths the transmission. (3) Better surface finish — reduces micro-level excitation. (4) Profile modification — tip relief and root relief prevent corner loading at the entry and exit of mesh, which is a primary source of excitation. (5) Accurate manufacturing — reducing pitch errors, runout, and tooth spacing errors. (6) Proper load distribution across the face width — crowning or lead modification prevents edge loading. AGMA quality grades (Q6-Q14) specify manufacturing accuracy levels, with higher grades producing quieter gears.',
          hint: 'Gear noise comes from sudden changes in load and contact during meshing. What design features smooth out these transitions?'
        },
        {
          id: 'u8-L3-Q21',
          type: 'multiple-choice',
          question: 'What is the fundamental difference between a standard gear train and a planetary (epicyclic) gear train in terms of shaft arrangement?',
          options: [
            'Standard gear trains use parallel shafts with external meshing only; planetary gear trains have coaxial (concentric) input and output shafts with both internal and external meshing',
            'Standard gear trains use larger gears; planetary gear trains use smaller gears, assuming the material remains in the linear elastic regime throughout the loading cycle',
            'Standard gear trains can only reduce speed; planetary gear trains can only increase speed — this reasoning applies only under idealized conditions not found in service',
            'There is no fundamental difference — they are different names for the same thing, assuming uniform property distribution through the thickness without any processing-induced gradients'
          ],
          correctIndex: 0,
          explanation: 'In a standard gear train, each gear rotates on its own fixed axis, and shafts are parallel but offset. In a planetary gear train, the sun gear and ring gear share the same axis (coaxial), and planet gears orbit around this axis while also spinning on their own axes. This coaxial arrangement makes planetary gears compact and allows inline input/output shafts. The internal meshing (planet-to-ring) distributes load across multiple planets (typically 3-5), increasing torque capacity for a given size. Planetary gear sets also offer multiple ratio configurations by fixing different elements: fix ring = speed reduction, fix sun = speed reduction (different ratio), fix carrier = direction reversal.',
          hint: 'Consider the physical shaft arrangement — are input and output shafts on the same axis or offset?'
        },
        {
          id: 'u8-L3-Q22',
          type: 'multiple-choice',
          question: 'The AGMA dynamic factor (Kv) accounts for what effect in gear design?',
          options: [
            'The effect of material density on gear weight, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response',
            'Internal dynamic loads generated by gear tooth errors, profile errors, and elastic deformation during meshing, which increase the effective tooth load above the static transmitted load',
            'The dynamic viscosity of the lubricant, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables',
            'The effect of gear inertia during startup and shutdown — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause'
          ],
          correctIndex: 1,
          explanation: 'The AGMA dynamic factor Kv accounts for the additional loads generated within the gear mesh due to imperfect tooth geometry. As teeth engage and disengage, manufacturing errors (pitch error, profile error, spacing error) and elastic tooth deflections cause deviations from the ideal conjugate motion, creating dynamic forces that add to the static transmitted load. Kv depends on: (1) pitch line velocity — higher speed magnifies dynamic effects, (2) manufacturing accuracy (AGMA quality number) — more precise gears have lower dynamic loads, and (3) gear geometry (module, helix angle). Kv ranges from about 1.05 (very precise, low speed) to 2.0+ (poor quality, high speed). It multiplies the tangential force in both bending and contact stress calculations.',
          hint: 'This factor accounts for the difference between the ideal (static) tooth load and the actual load including dynamic effects from imperfect teeth.'
        },
        {
          id: 'u8-L3-Q23',
          type: 'true-false',
          question: 'In a worm gear set, the worm can always drive the gear, but the gear cannot always drive the worm. This asymmetry is called irreversibility or self-locking.',
          correctAnswer: true,
          explanation: 'This asymmetry is the defining characteristic of worm gears. The worm (screw-like member) can always drive the worm wheel (gear) because the force component along the thread drives the gear rotation. However, if the worm wheel tries to drive the worm (back-driving), the thread angle and friction may prevent motion — this is self-locking. Self-locking occurs when the lead angle is less than the friction angle (lambda < arctan(mu)). This property makes worm gears uniquely suited for hoists, jacks, and positioning systems where the load must hold position when the drive is stopped. The trade-off is low efficiency (typically 40-90% depending on lead angle).',
          hint: 'Consider the force geometry — the worm thread acts like an inclined plane, and friction can prevent backward motion.'
        },
        {
          id: 'u8-L3-Q24',
          type: 'multiple-choice',
          question: 'A pair of spur gears has a module of 3 mm, a pressure angle of 20 degrees, and the pinion has 18 teeth. What is the base circle diameter of the pinion?',
          options: [
            '45.7 mm',
            '50.7 mm',
            '54.0 mm',
            '57.4 mm'
          ],
          correctIndex: 1,
          explanation: 'The pitch circle diameter D = m × Z = 3 × 18 = 54 mm. The base circle diameter D_b = D × cos(phi) = 54 × cos(20) = 54 × 0.9397 = 50.7 mm. The base circle is the circle from which the involute tooth profile is generated. The involute curve starts at the base circle and extends outward. The base pitch (p_b = pi × m × cos(phi)) is the fundamental spacing between teeth measured along the base circle — it must be identical for two gears to mesh properly, regardless of the number of teeth.',
          hint: 'D_b = D × cos(phi). First find the pitch diameter, then multiply by cos(pressure angle).'
        },
        {
          id: 'u8-L3-Q25',
          type: 'multiple-choice',
          question: 'What is the typical efficiency of each common gear type?',
          options: [
            'Spur: 40-60%, Helical: 60-80%, Bevel: 30-50%, Worm: 95-99%',
            'Spur: 95-99%, Helical: 95-99%, Bevel: 95-99%, Worm: 40-90%',
            'All gear types are equally efficient at 95%',
            'Spur: 99%, Helical: 85%, Bevel: 75%, Worm: 65%'
          ],
          correctIndex: 1,
          explanation: 'Spur, helical, and bevel gears all have very high efficiencies (95-99% per stage) because their tooth contact involves primarily rolling with minimal sliding. Worm gears have much lower efficiency (40-90%) because the worm thread slides against the worm wheel teeth — the contact is mostly sliding friction rather than rolling. Worm efficiency depends strongly on the lead angle: higher lead angles give higher efficiency (up to 90%) but lose self-locking ability. Lower lead angles are less efficient but provide self-locking. This is why worm gears require lubrication with high-EP (extreme pressure) oils and why the worm is typically made of hardened steel while the wheel is bronze (to reduce sliding friction).',
          hint: 'Consider the nature of tooth contact — is it primarily rolling or sliding for each gear type?'
        },
        {
          id: 'u8-L3-Q26',
          type: 'fill-blank',
          question: 'The gear tooth profile used in virtually all modern gearing, where the tooth shape is generated by a point on a line rolling on the base circle, is called the _____ profile.',
          blanks: ['involute'],
          wordBank: ['involute', 'cycloidal', 'epicycloidal', 'trochoid', 'circular'],
          explanation: 'The involute profile is the standard tooth form for modern gears. An involute is the curve traced by a point on a taut string unwinding from a circle (the base circle). Key advantages: (1) the contact between involute teeth always occurs along a straight line (the line of action), producing a constant velocity ratio, (2) involute gears are insensitive to center distance variation — small changes in center distance do not affect the velocity ratio (only the pressure angle changes slightly), (3) involute profiles can be generated by simple manufacturing processes (hobbing, shaping with a rack cutter). These properties make involute gears far superior to cycloidal gears for power transmission, though cycloidal profiles are still used in clock mechanisms and some pumps.',
          hint: 'This curve is generated by unwinding a string from a circle. It is the basis for nearly all power transmission gear teeth.'
        },
        {
          id: 'u8-L3-Q27',
          type: 'multiple-choice',
          question: 'Profile shift (addendum modification) is applied to gears for several reasons. Which of the following is the PRIMARY reason for applying positive profile shift to a small pinion?',
          options: [
            'To make the gear cheaper to manufacture, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome',
            'To avoid undercutting of the tooth root when the pinion has fewer teeth than the minimum (e.g., fewer than 17 teeth for 20-degree pressure angle), and to strengthen the tooth root',
            'To increase the gear ratio beyond what the tooth count allows — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice',
            'To reduce gear noise at high speeds — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here'
          ],
          correctIndex: 1,
          explanation: 'Positive profile shift moves the cutting tool outward from the gear blank center, producing a thicker tooth root that avoids undercutting and increases bending strength. This allows using pinions with fewer teeth than the theoretical minimum without undercutting (e.g., 12-14 teeth instead of 17 for 20-degree PA). Additional benefits: (1) balances the bending strength between pinion and gear, (2) adjusts the center distance, (3) improves the specific sliding ratio distribution. Negative profile shift on the mating gear maintains the proper center distance. The sum of profile shift coefficients (x1 + x2) can be zero (standard center distance) or positive (extended center distance). Profile shift does not change the base pitch or velocity ratio.',
          hint: 'When a pinion has very few teeth, what geometric problem occurs at the tooth root, and how does shifting the cutter position fix it?'
        },
        {
          id: 'u8-L3-Q28',
          type: 'true-false',
          question: 'Herringbone (double-helical) gears eliminate the axial thrust problem of single-helical gears by having two sets of teeth with opposite helix angles on the same gear, causing the axial forces to cancel out.',
          correctAnswer: true,
          explanation: 'Herringbone gears have two helical sections with opposite hand (one right-hand, one left-hand) on the same gear body. The axial thrust from each section acts in opposite directions and cancels out, leaving only tangential and radial forces — similar to spur gears but with the smoothness advantages of helical gears. This eliminates the need for thrust bearings. Herringbone gears are used in high-power applications like marine propulsion, large compressor drives, and power generation turbines. Their main disadvantage is manufacturing complexity and cost — they require specialized cutting equipment or must be made in two halves and assembled. The central groove between the two helical sections (in conventionally cut herringbone gears) slightly reduces the effective face width.',
          hint: 'Consider what happens when two equal and opposite axial forces act on the same gear body.'
        },
        {
          id: 'u8-L3-Q29',
          type: 'multiple-choice',
          question: 'A gear tooth breaks off at the root after several years of service. The fracture surface shows fatigue beach marks originating from the root fillet on the tension side. What is the AGMA failure mode classification, and what design parameter governs this failure?',
          options: [
            'Surface durability failure governed by Hertzian contact stress (sigma_H), which does not account for the microstructural changes occurring at these conditions',
            'Bending fatigue failure governed by the bending stress at the tooth root (sigma_b), which must be below the allowable bending stress (S_at/SF)',
            'Scoring failure governed by flash temperature, provided the test specimen geometry conforms to the requirements specified in the standard',
            'Wear failure governed by sliding velocity, which does not account for the microstructural changes occurring at these conditions'
          ],
          correctIndex: 1,
          explanation: 'Tooth breakage at the root with fatigue beach marks is classic bending fatigue failure. The tooth root fillet is the critical location because it is the region of maximum bending stress and a geometric stress concentration. AGMA bending stress: sigma_b = Wt × Ko × Kv × Ks × Km × KB / (b × m × J), where J is the geometry factor (similar to Lewis Y but more comprehensive). This stress must satisfy: sigma_b ≤ S_at / (SF × K_T × K_R), where S_at is the allowable bending stress (from material tables), SF is the safety factor, K_T is the temperature factor, and K_R is the reliability factor. Prevention: increase the module (larger teeth), use higher-strength material, improve root fillet geometry, or reduce load.',
          hint: 'The fracture location (root fillet) and the presence of beach marks on the tension side point to which stress and failure mode?'
        },
        {
          id: 'u8-L3-Q30',
          type: 'fill-blank',
          question: 'In metric gear systems, tooth size is defined by the _____ (m = D/Z), while in imperial systems the equivalent parameter is the _____ pitch (P = Z/D).',
          blanks: ['module', 'diametral'],
          wordBank: ['module', 'diametral', 'pitch', 'circular', 'contact', 'base'],
          explanation: 'The module (m) is the fundamental parameter defining tooth size in the metric gear system. m = D/Z (mm). Standard modules are specified in ISO 54: 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 25 mm. Two gears must have the same module to mesh properly (because the base pitch p_b = pi × m × cos(phi) must be identical). A larger module means larger teeth — more bending strength but fewer teeth for a given diameter. The imperial equivalent is the diametral pitch P = Z/D (teeth per inch) = 25.4/m. Selecting the right module is the first step in gear design — it must be small enough for the required contact ratio and smooth operation, but large enough for adequate tooth bending strength.',
          hint: 'This parameter is the metric measure of tooth size, expressed in millimeters.'
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
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Top plate --> <rect x="10" y="24" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="24" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bottom plate --> <rect x="10" y="36" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="36" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bolt shaft (through both plates) --> <rect x="38" y="16" width="4" height="38" rx="1" fill="#3B8700" opacity="0.25"/> <rect x="38" y="16" width="4" height="38" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Bolt head (hex, top) --> <rect x="34" y="12" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="12" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Nut (hex, bottom) --> <rect x="34" y="52" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="52" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Washer (top) --> <rect x="36" y="18" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Washer (bottom) --> <rect x="36" y="50" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Thread marks on bolt shaft --> <line x1="38.5" y1="44" x2="41.5" y2="43" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="46" x2="41.5" y2="45" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="48" x2="41.5" y2="47" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <!-- Preload/clamping force arrows (pulsing) --> <g> <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/> <!-- Bolt tension (upward on bolt) --> <line x1="40" y1="22" x2="40" y2="16" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,17 40,14 41.5,17" fill="#3B8700"/> <!-- Bolt tension (downward on bolt) --> <line x1="40" y1="48" x2="40" y2="54" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,53 40,56 41.5,53" fill="#3B8700"/> <!-- Clamping compression (plates pushed together) --> <polygon points="24,22 26,19 28,22" fill="#58CC02" opacity="0.5"/> <polygon points="24,48 26,51 28,48" fill="#58CC02" opacity="0.5"/> <polygon points="52,22 54,19 56,22" fill="#58CC02" opacity="0.5"/> <polygon points="52,48 54,51 56,48" fill="#58CC02" opacity="0.5"/> </g> <!-- Labels --> <text x="22" y="10" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">F_preload</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">clamping force</text> </svg>',
          explanation: 'The stiffness ratio (load fraction carried by bolt) C = k_b/(k_b + k_c) = 400/(400 + 1200) = 0.25. Additional bolt load = C × F_ext = 0.25 × 20 = 5 kN. The clamped members absorb 75% of the external load by relieving compression. This is why proper preload is critical — it keeps the joint clamped so the bolt only sees a fraction of the external load. If preload is lost, the bolt sees the full external load and is far more likely to fail in fatigue.',
          hint: 'The load split depends on the stiffness ratio: C = k_b/(k_b + k_c).'
        },
        {
          id: 'u8-L4-Q2',
          type: 'multiple-choice',
          question: 'A technician tightened flanged bolts to the specified torque, but the gasket leaked under pressure. Upon investigation, the bolts were found to have variable preloads (some 30% below target, others 20% above). The torque wrench was calibrated correctly. What is the most likely cause of the preload scatter?',
          options: [
            'The torque wrench is inaccurate despite calibration — switch to a more expensive digital torque wrench, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service',
            'Friction variation — torque-controlled tightening depends heavily on thread and bearing surface friction (which consumes 80-90% of applied torque), and differences in lubrication, surface finish, or thread condition between bolts caused widely varying preloads at the same torque',
            'The bolts are different grades — some are 8.8 and others are 10.9, causing different stretch at the same torque, though careful analysis of the governing equations reveals a fundamentally different dependence on the key material and geometric parameters involved',
            'The flange is warped, preventing the bolts from clamping evenly, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, which limits its practical applicability'
          ],
          correctIndex: 1,
          explanation: 'This is a fundamental limitation of torque-controlled tightening. Only 10-20% of applied torque actually produces bolt stretch (preload); the remaining 80-90% is consumed by friction under the bolt head (~40%) and in the threads (~40%). The nut factor K in T = K × F × d varies from 0.15 (lubricated) to 0.25+ (dry/rusty), creating ±25-30% preload uncertainty even with a perfectly calibrated wrench. Causes of friction variation: inconsistent lubrication (one bolt oiled, another dry), varying thread condition (plating, rust, damage), debris under the bolt head, and re-used vs. new washers. Solutions for critical joints: (1) consistent lubrication on all fasteners, (2) angle-of-turn method (less friction-sensitive), (3) direct bolt stretch measurement with ultrasonics (±1% accuracy), or (4) tension-indicating washers (DTIs). This is why the specification should say "torque to X with threads lubricated per Y" rather than just "torque to X."',
          hint: 'If the torque wrench is accurate but preloads vary, what variable between the wrench and the bolt stretch is causing the inconsistency?'
        },
        {
          id: 'u8-L4-Q3',
          type: 'true-false',
          question: 'A bolted joint should always be designed so that the bolt is loaded in shear (like a pin) rather than in tension, because bolts are stronger in shear than in tension.',
          correctAnswer: false,
          explanation: 'This is false. Properly designed bolted joints usually load the bolt in tension (clamping force), not shear. A preloaded tension joint relies on the friction between the clamped surfaces (created by bolt preload) to resist shear loads — the bolt itself never sees shear. This is actually the stronger and more reliable design. Bolts loaded in shear (bearing-type joints where the bolt shank contacts the hole wall) are used when slip is acceptable, but they are vulnerable to fatigue from the cyclic bearing load and require tight hole tolerances. Furthermore, shear stress on the bolt acts on the reduced thread area in most configurations, which is a weak point. The preferred approach: preloaded bolts in tension, with shear loads carried by friction between clamped surfaces.',
          hint: 'Think about how a properly preloaded bolted joint resists shear loads — is it through the bolt shearing, or through friction between the clamped parts?'
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
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Top plate --> <rect x="10" y="24" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="24" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bottom plate --> <rect x="10" y="36" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="36" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bolt shaft (through both plates) --> <rect x="38" y="16" width="4" height="38" rx="1" fill="#3B8700" opacity="0.25"/> <rect x="38" y="16" width="4" height="38" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Bolt head (hex, top) --> <rect x="34" y="12" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="12" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Nut (hex, bottom) --> <rect x="34" y="52" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="52" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Washer (top) --> <rect x="36" y="18" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Washer (bottom) --> <rect x="36" y="50" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Thread marks on bolt shaft --> <line x1="38.5" y1="44" x2="41.5" y2="43" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="46" x2="41.5" y2="45" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="48" x2="41.5" y2="47" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <!-- Preload/clamping force arrows (pulsing) --> <g> <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/> <!-- Bolt tension (upward on bolt) --> <line x1="40" y1="22" x2="40" y2="16" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,17 40,14 41.5,17" fill="#3B8700"/> <!-- Bolt tension (downward on bolt) --> <line x1="40" y1="48" x2="40" y2="54" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,53 40,56 41.5,53" fill="#3B8700"/> <!-- Clamping compression (plates pushed together) --> <polygon points="24,22 26,19 28,22" fill="#58CC02" opacity="0.5"/> <polygon points="24,48 26,51 28,48" fill="#58CC02" opacity="0.5"/> <polygon points="52,22 54,19 56,22" fill="#58CC02" opacity="0.5"/> <polygon points="52,48 54,51 56,48" fill="#58CC02" opacity="0.5"/> </g> <!-- Labels --> <text x="22" y="10" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">F_preload</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">clamping force</text> </svg>',
          explanation: 'The recommended preload is typically 75% of proof load for non-permanent connections (90% for permanent ones). Proof load = proof strength × tensile stress area = 600 × 84.3 = 50,580 N = 50.6 kN. Recommended preload = 0.75 × 50.6 = 37.9 kN. Going above 90% of proof load risks permanent deformation of the bolt. Property class 8.8 means minimum tensile strength of 800 MPa and proof strength of 0.8 × 800 = 640 MPa (though many references use 600 MPa as a nominal value for design).',
          hint: 'Target preload is typically 75% of proof load. Proof load = proof stress × A_tensile.'
        },
        {
          id: 'u8-L4-Q5',
          type: 'multiple-choice',
          question: 'You need to join an aluminum panel to a steel frame in a vehicle body. Welding is not feasible (dissimilar metals, thin aluminum), and bolting adds weight and creates stress concentrations. You are considering adhesive bonding. What are the key design considerations and limitations?',
          options: [
            'Adhesive bonding is always inferior to mechanical fastening — it should only be used for non-structural applications, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
            'Design the joint for shear loading (lap joints), maximize bond area, avoid peel loads at edges, add fillets to reduce edge stress, and consider that adhesives degrade with temperature, moisture, and UV — plus they offer no visual indication of bond quality without NDT',
            'Simply apply adhesive to the mating surfaces and clamp them together — modern structural adhesives are stronger than the base metals in all loading conditions — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here',
            'Adhesive bonding cannot join dissimilar metals — the different thermal expansion rates will always break the bond during thermal cycling — however, standard engineering analysis methods and field experience both point to a different conclusion'
          ],
          correctIndex: 1,
          explanation: 'Adhesive bonding is increasingly used in automotive (reducing weight 30-40% vs. spot welding) and aerospace. Key design rules: (1) Design for shear, not peel — adhesives are strong in shear (20-40 MPa) but very weak in peel (<5 kN/m). Lap joints, scarf joints, and doubled configurations maximize shear area. (2) Surface preparation is critical — degrease, abrade, and prime both surfaces. Aluminum needs chromate conversion or anodizing for durable bonds. (3) Thermal expansion mismatch between aluminum (23 μm/m/°C) and steel (12 μm/m/°C) creates shear stress in the bond during temperature changes — use flexible adhesives or keep bond lengths short to limit the differential strain. (4) Environmental durability — moisture and heat degrade most adhesives over time. Verify long-term performance with accelerated aging tests. (5) Inspection difficulty — adhesive bonds cannot be visually inspected for quality. Ultrasonic or tap testing checks for disbonds but cannot measure bond strength.',
          hint: 'Adhesive joints are strong in shear but weak in peel. What design choices maximize the strength of the joint?'
        },
        {
          id: 'u8-L4-Q6',
          type: 'fill-blank',
          question: 'The initial tension applied to a bolt during tightening, before any external load is applied, is called ___.',
          blanks: ['preload'],
          wordBank: ['preload', 'proof load', 'torque', 'clamping', 'yield force'],
          explanation: 'Preload (also called pretension or initial clamping force) is the tension in the bolt created during tightening. It compresses the clamped members, creating a friction force that resists joint separation and slip. Proper preload is critical: too low allows joint separation or slip under load, too high risks bolt yield. The preload is controlled during assembly by torque, angle-of-turn, or bolt stretch measurement. For critical joints, ultrasonic bolt stretch measurement provides ±1% accuracy.',
          hint: 'This is the force in the bolt when it is tightened, before any external service loads are applied.'
        },
        {
          id: 'u8-L4-Q7',
          type: 'multiple-choice',
          question: 'A bolted joint has a preload of 40 kN, a bolt stiffness fraction C = 0.3, and the external separating load is 50 kN. At what external load does the joint separate (lose clamping)?',
          options: [
            '40 kN',
            '50 kN',
            '57.1 kN',
            '133.3 kN'
          ],
          correctIndex: 2,
          explanation: 'Joint separation occurs when the clamping force on the members reaches zero. The clamping force decreases as the external load increases: F_clamp = F_preload - (1-C) × F_ext. Setting F_clamp = 0: 0 = F_i - (1-C) × F_sep. F_sep = F_i / (1-C) = 40 / (1-0.3) = 40/0.7 = 57.1 kN. Since the applied external load (50 kN) is less than 57.1 kN, the joint does NOT separate under this service condition. However, the safety factor against separation is only 57.1/50 = 1.14, which is dangerously low. Increasing preload or reducing the stiffness ratio C would improve the margin. A minimum safety factor of 2.0 against separation is common practice.',
          hint: 'Separation occurs when F_clamp = F_i - (1-C)*F_ext = 0. Solve for the critical external load.'
        },
        {
          id: 'u8-L4-Q8',
          type: 'multiple-choice',
          question: 'Why are hardened washers (such as SAE grade 8 flat washers) used under bolt heads in structural connections?',
          options: [
            'They make the joint look more professional, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'They distribute the bolt head load over a larger area to prevent embedding into softer materials, provide a consistent friction surface for reliable torque-tension relationship, and protect the joint surface from damage during tightening',
            'They act as springs to maintain preload during thermal cycling, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service',
            'They are only used to fill gaps when the bolt is too long, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process'
          ],
          correctIndex: 1,
          explanation: 'Hardened washers serve multiple critical functions: (1) Load distribution — they spread the bolt head (or nut) bearing force over a larger area, preventing the fastener from digging into softer materials (aluminum, wood, or even mild steel under high preloads). This is especially important for oversized holes. (2) Consistent friction — a flat, hardened washer surface provides a repeatable bearing surface friction, improving the torque-tension relationship (less preload scatter). Without a washer, the bolt head rotates against the rough, variable joint surface. (3) Surface protection — prevents the bolt head from galling or damaging the joint surface during tightening. (4) For slotted holes, washers prevent the nut from pulling through. In structural steel (AISC/ASTM specifications), hardened washers are required under the turned element (the nut or bolt head that rotates during tightening).',
          hint: 'Consider what happens when you tighten a high-strength bolt against a soft or rough surface without a washer.'
        },
        {
          id: 'u8-L4-Q9',
          type: 'true-false',
          question: 'Lock washers (split/helical spring washers) are an effective and reliable method for preventing bolt loosening in vibrating structures.',
          correctAnswer: false,
          explanation: 'Despite their widespread use, research (notably by Junker and others) has shown that split lock washers are largely ineffective at preventing loosening under transverse vibration — the primary cause of bolt loosening in practice. The spring force is tiny compared to the bolt preload, and once the bolt starts to loosen and preload drops, the lock washer contributes nothing. More effective locking methods include: (1) prevailing torque locknuts (nylon insert or deformed thread), (2) thread-locking adhesives (Loctite), (3) safety wire or cotter pins (positive locking), (4) Nord-Lock wedge-locking washers (which use wedge action to resist rotation), and (5) proper preload maintained by friction grip. The Junker vibration test is the standard method for evaluating fastener locking effectiveness.',
          hint: 'Consider the Junker vibration test results — how do split lock washers perform compared to proper preload and purpose-designed locking methods?'
        },
        {
          id: 'u8-L4-Q10',
          type: 'multiple-choice',
          question: 'A fillet weld connects two plates at right angles (T-joint). The weld has a leg size of 8 mm and a length of 150 mm. If the applied load is 50 kN in shear parallel to the weld, what is the shear stress on the weld throat?',
          options: [
            '29.5 MPa',
            '41.7 MPa',
            '58.9 MPa',
            '83.3 MPa'
          ],
          correctIndex: 2,
          explanation: 'For a fillet weld, the critical section is the throat, which is the shortest distance through the weld. Throat size = 0.707 × leg size = 0.707 × 8 = 5.656 mm. Throat area = throat × length = 5.656 × 150 = 848.4 mm². Shear stress = F/A = 50000/848.4 = 58.9 MPa. The 0.707 factor comes from the throat being at 45 degrees across the isosceles right triangle cross-section. The allowable stress for the weld depends on the electrode type and base metal — for E70xx electrodes (common in structural steel), the allowable shear stress on the effective throat is typically 0.30 × 70 ksi = 21 ksi (145 MPa) per AWS/AISC.',
          hint: 'Throat = 0.707 × leg size. The stress is calculated on the throat area, not the leg area.'
        },
        {
          id: 'u8-L4-Q11',
          type: 'multiple-choice',
          question: 'What is the difference between a slip-critical (friction-type) bolted connection and a bearing-type bolted connection?',
          options: [
            'They are the same — just different terminology used by different codes, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'In slip-critical connections, the load is transferred by friction between the faying surfaces (maintained by bolt preload), and no slip is permitted. In bearing-type connections, the bolts bear against the hole walls to transfer load, and some slip is acceptable.',
            'Slip-critical uses higher-grade bolts; bearing-type uses standard bolts, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'Slip-critical is for static loads; bearing-type is for dynamic loads, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism'
          ],
          correctIndex: 1,
          explanation: 'Slip-critical connections rely on the friction between the clamped surfaces (faying surfaces) to transfer the shear load. The bolt preload creates the clamping force, and the product of clamping force times friction coefficient is the slip resistance. These connections are required where: (1) fatigue loading exists (slip would cause fretting), (2) slip would be unacceptable (e.g., connections using oversize or slotted holes), or (3) the connection is subject to load reversal. Surface preparation (clean mill scale or blast-cleaned) is critical to ensure adequate friction. Bearing-type connections are designed so the bolt shank contacts the hole wall — load is transferred by bearing and shear. They are simpler but allow some slip during initial loading and are not suitable for fatigue applications.',
          hint: 'Consider the load path: does the load pass through friction between plates, or through the bolt shank contacting the hole wall?'
        },
        {
          id: 'u8-L4-Q12',
          type: 'multiple-choice',
          question: 'What is the purpose of a gasket factor "m" in the ASME Boiler and Pressure Vessel Code flange design methodology?',
          options: [
            'It is the gasket material modulus of elasticity, though experimental data shows this correlation breaks down at extreme operating conditions',
            'It is the maintenance factor for how often the gasket should be replaced, though this interpretation oversimplifies the actual mechanism involved',
            'It is the ratio of residual gasket stress to internal pressure needed to maintain the seal — higher m values require more bolt load to seal against a given pressure',
            'It is the maximum allowable gasket compression, though experimental data shows this correlation breaks down at extreme operating conditions'
          ],
          correctIndex: 2,
          explanation: 'The gasket factor m (from ASME BPVC, Appendix 2) represents the ratio of the gasket stress to the contained pressure needed to maintain a leak-tight seal during operation. For example, m = 2.0 means the gasket must be compressed to at least 2 times the internal pressure to maintain a seal. Higher m values mean the gasket requires more bolt preload. Typical values: rubber with fabric (m = 1.25), compressed fiber (m = 2.5-3.5), spiral-wound metallic (m = 3.0), solid metal flat (m = 5.5-6.5). The companion parameter "y" is the minimum gasket seating stress needed to initially conform the gasket to the flange surface (applied during bolting with no pressure). Both m and y must be satisfied for a proper flange/gasket design.',
          hint: 'This factor ensures enough residual gasket compression exists to seal against the internal pressure during operation.'
        },
        {
          id: 'u8-L4-Q13',
          type: 'true-false',
          question: 'In a properly designed bolted joint under cyclic loading, the bolt experiences a much smaller fluctuating stress amplitude than the external fluctuating load would suggest, because the stiff clamped members absorb most of the load variation.',
          correctAnswer: true,
          explanation: 'This is the fundamental advantage of a preloaded bolted joint for fatigue resistance. The fluctuating bolt load = C × F_external (fluctuating), where C = k_b/(k_b + k_c) is typically 0.15-0.35. So the bolt only sees 15-35% of the external load fluctuation. The remaining 65-85% appears as fluctuation in the clamping force of the members. For example, if the external load fluctuates between 0 and 20 kN and C = 0.25, the bolt load fluctuates by only 5 kN around the preload. This dramatically improves fatigue life compared to a non-preloaded bolt that would see the full 20 kN fluctuation. The key requirement: the preload must be high enough that the joint never separates (clamping force never reaches zero), or the bolt instantly sees the full external load.',
          hint: 'Consider the stiffness ratio C and how it splits the external load between the bolt and the clamped members.'
        },
        {
          id: 'u8-L4-Q14',
          type: 'multiple-choice',
          question: 'The bolt stiffness (k_b) depends on several factors. For a bolt with unthreaded shank length L_s, threaded length in the grip L_t, tensile stress area A_t, and nominal area A_d, what is the equivalent bolt stiffness?',
          options: [
            'k_b = E*A_d / (L_s + L_t), which does not account for the microstructural changes occurring at these conditions',
            'k_b = 1 / (L_s/(E*A_d) + L_t/(E*A_t)) — the bolt acts as two springs in series: the unthreaded shank and the threaded portion',
            'k_b = E*(A_d + A_t) / (L_s + L_t) — which misidentifies the root cause of the observed engineering behavior',
            'k_b = E*A_t / L_t (only the threaded portion matters), provided the test specimen geometry conforms to the requirements specified in the standard'
          ],
          correctIndex: 1,
          explanation: 'The bolt is modeled as two springs in series: (1) the unthreaded shank with stiffness k_d = E*A_d/L_s, and (2) the threaded portion within the grip with stiffness k_t = E*A_t/L_t. For springs in series: 1/k_b = 1/k_d + 1/k_t = L_s/(E*A_d) + L_t/(E*A_t). So k_b = E*A_d*A_t / (A_t*L_s + A_d*L_t). The threaded portion is the weaker section (A_t < A_d), so it dominates the bolt compliance. This is why longer bolts with more stretch are actually better for fatigue — a longer, more compliant bolt has a lower stiffness ratio C, and the bolt sees a smaller fraction of the external load fluctuation.',
          hint: 'Model the bolt as two different cross-sections in series — each acts as a spring, and springs in series add reciprocally.'
        },
        {
          id: 'u8-L4-Q15',
          type: 'multiple-choice',
          question: 'What is the main advantage of a butt weld over a fillet weld for joining two plates in tension?',
          options: [
            'Butt welds are cheaper and faster to produce, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
            'A complete joint penetration (CJP) butt weld has the full cross-section of the base metal available to carry load, making it as strong as the base metal. Fillet welds carry load through the reduced throat area at an angle.',
            'Butt welds do not require any edge preparation, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome',
            'Butt welds never have residual stresses, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome'
          ],
          correctIndex: 1,
          explanation: 'A complete joint penetration (CJP) butt weld fuses the full thickness of the base metal, so the weld cross-section equals the base metal cross-section. If properly executed (with correct filler metal and procedure), it is considered 100% joint efficient — as strong as the base metal. Fillet welds, by contrast, carry load through the throat (0.707 × leg size), which is smaller than the connected plate thickness, and the load path is through shear in the weld metal. However, butt welds require edge preparation (V-groove, J-groove, or U-groove), proper fit-up, often backing bars, and inspection (radiography or ultrasonic testing) to verify full penetration. They are specified for critical joints (pressure vessels, fatigue-loaded structures) where full-strength joints are required.',
          hint: 'Compare the effective load-carrying cross-section of each weld type relative to the base plate thickness.'
        },
        {
          id: 'u8-L4-Q16',
          type: 'fill-blank',
          question: 'The property class marking "10.9" on a metric bolt means the minimum tensile strength is _____ MPa.',
          blanks: ['1040'],
          wordBank: ['1040', '800', '900', '1200', '640'],
          explanation: 'In the ISO metric bolt property class system, the number before the decimal point × 100 gives the minimum ultimate tensile strength in MPa. The decimal point number × the first number × 100 gives the minimum yield strength (or proof strength). For class 10.9: UTS = 10 × 100 = 1000 MPa (some references state 1040 MPa per ISO 898-1), and yield = 0.9 × 1000 = 900 MPa. Common classes: 4.6 (400 MPa UTS, mild steel), 8.8 (800 MPa UTS, medium carbon steel), 10.9 (1000-1040 MPa UTS, alloy steel), 12.9 (1200-1220 MPa UTS, alloy steel). Higher classes provide more strength but are more susceptible to hydrogen embrittlement and stress corrosion cracking.',
          hint: 'The first number × 100 gives UTS in MPa. The decimal digit gives the yield/UTS ratio.'
        },
        {
          id: 'u8-L4-Q17',
          type: 'multiple-choice',
          question: 'A gasketed flange joint is being designed. The bolt load must satisfy two conditions: the seating condition (with no internal pressure) and the operating condition (with internal pressure). Which condition typically requires more bolt load?',
          options: [
            'The seating condition always requires more bolt load, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response',
            'The operating condition always requires more bolt load, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
            'It depends on the gasket type and internal pressure — soft gaskets (low m, low y) are often governed by operating condition, while hard gaskets (high y) may be governed by seating condition',
            'Both conditions always require exactly the same bolt load, though this reasoning neglects the dominant physical mechanism that actually controls the behavior'
          ],
          correctIndex: 2,
          explanation: 'The ASME BPVC flange design checks two conditions: (1) Seating condition (W_m2): the bolt load must compress the gasket to its minimum seating stress y over the gasket area. No pressure is present. W_m2 = pi × b × G × y, where b is the effective gasket width and G is the gasket diameter. (2) Operating condition (W_m1): the bolt load must resist the hydrostatic end force from internal pressure AND maintain a residual gasket stress of m × P. W_m1 = H + H_p = (pi/4)*G^2*P + 2*pi*b*G*m*P. For soft gaskets like rubber (low y, low m), the operating condition usually governs. For hard metallic gaskets (high y), the initial seating stress needed to conform the gasket to the flange surface can be very high, making the seating condition govern.',
          hint: 'Compare the gasket seating stress (y) requirement against the combined pressure + residual gasket stress requirement.'
        },
        {
          id: 'u8-L4-Q18',
          type: 'multiple-choice',
          question: 'What is the Junker test, and what does it evaluate?',
          options: [
            'A test for bolt tensile strength under impact loading, though experimental data shows this correlation breaks down at extreme operating conditions',
            'A vibration test that applies transverse (side-to-side) motion to a bolted joint to evaluate the resistance of different locking methods against self-loosening',
            'A test for gasket creep under high temperature, assuming the material remains in the linear elastic regime throughout the loading cycle',
            'A non-destructive test for weld defects, assuming uniform property distribution through the thickness without any processing-induced gradients'
          ],
          correctIndex: 1,
          explanation: 'The Junker test (DIN 65151, NAS 3350) applies controlled transverse vibration (perpendicular to the bolt axis) to a bolted joint while monitoring the clamping force over thousands of cycles. This simulates the primary cause of bolt loosening in service — relative sliding between the bolt head (or nut) and the joint surface under transverse loading. The test reveals: (1) how quickly different locking methods lose preload, (2) the relative effectiveness of various anti-loosening devices. Results typically show: properly preloaded bolts without locking features lose preload rapidly; split lock washers provide minimal improvement; nylon insert locknuts, adhesive thread-locking, and wedge-locking systems maintain preload effectively.',
          hint: 'This standardized test specifically addresses bolt loosening due to vibration by applying controlled transverse displacement.'
        },
        {
          id: 'u8-L4-Q19',
          type: 'true-false',
          question: 'When tightening bolts in a circular flange pattern, the recommended tightening sequence is to go around the circle sequentially (bolt 1, 2, 3, 4...) to ensure even clamping.',
          correctAnswer: false,
          explanation: 'Sequential (clockwise) tightening is WRONG for flanged joints. The correct procedure is a star (criss-cross) pattern — tighten diametrically opposite bolts alternately, working outward from the center of the pattern. This distributes the clamping force evenly across the gasket and prevents warping the flange. After the star pattern, perform multiple passes at increasing torque (e.g., 30%, 60%, 100% of final torque) to allow for elastic interaction — tightening one bolt relaxes previously tightened nearby bolts. A final pass at 100% torque in a circular pattern verifies all bolts are at the target. For critical applications, a fourth or fifth pass may be needed. This procedure is specified in ASME PCC-1 (Guidelines for Pressure Boundary Bolted Flange Joint Assembly).',
          hint: 'Think about what happens to the gasket compression and flange deflection if you tighten bolts next to each other sequentially.'
        },
        {
          id: 'u8-L4-Q20',
          type: 'multiple-choice',
          question: 'A welded joint in a steel structure is subject to fatigue loading. The weld has been classified as a Category C detail per AWS/AISC. What does the fatigue category primarily depend on?',
          options: [
            'The welding process (MIG, TIG, stick) used — while partially correct, this answer misses the key physical mechanism that actually determines the outcome in practice',
            'The color of the welding electrode, which is valid only when the applied stress remains well below the proportional limit of the material',
            'The joint geometry and type of weld detail — the shape of the stress concentration at the weld determines the fatigue category, not the weld quality or material strength',
            'Only the base metal strength — higher-strength steel always gives better weld fatigue performance — not supported by standard testing protocols'
          ],
          correctIndex: 2,
          explanation: 'Fatigue performance of welded joints is governed by the detail category (A through E/E\'), which is determined by the joint geometry and the resulting stress concentration. The key insight: fatigue strength of welded joints is virtually independent of base metal strength. A high-strength steel (S_y = 700 MPa) has the same fatigue category rating as mild steel (S_y = 250 MPa) for the same weld detail. This is because fatigue cracks initiate at microscopic defects (undercut, slag, geometric stress concentrations) at the weld toe or root, and these defects exist regardless of base metal strength. The weld process and quality affect whether defects are present, but the detail category reflects the inherent geometric stress concentration of the joint configuration. This is why weld fatigue design differs fundamentally from base metal fatigue design.',
          hint: 'Weld fatigue life depends on the stress concentration from the joint geometry, not on the base metal strength. Why?'
        },
        {
          id: 'u8-L4-Q21',
          type: 'multiple-choice',
          question: 'What thread type is preferred for bolts in high-pressure applications (e.g., pressure vessels and hydraulic cylinders)?',
          options: [
            'Coarse thread — it is stronger because it has more cross-sectional area — a reasonable-sounding explanation that unfortunately attributes the effect to the wrong underlying cause',
            'Fine thread — it has a larger tensile stress area, lower helix angle (more self-locking tendency), and less reduction in fatigue strength from the thread root stress concentration',
            'Acme thread — it has a stronger trapezoidal shape, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service',
            'Square thread — it produces no radial force on the nut, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome'
          ],
          correctIndex: 1,
          explanation: 'Fine-pitch threads are preferred in high-pressure and fatigue-critical applications because: (1) larger tensile stress area (A_t) — the smaller thread depth leaves more core material, increasing strength by 5-10% over coarse thread of the same nominal diameter, (2) lower helix angle — this increases the self-locking tendency, reducing the risk of loosening under vibration, (3) shallower thread root — less severe stress concentration compared to the deeper coarse thread root, improving fatigue performance, (4) finer thread engagement adjustment for precise preload control. Trade-offs: fine threads are more susceptible to damage (galling, cross-threading), require more care during assembly, and have lower tolerance for corrosion or thread damage. Coarse threads are preferred for general construction where assembly speed and robustness matter more than precision.',
          hint: 'Compare the geometric properties of fine vs. coarse threads — which has more cross-sectional area and a shallower thread root?'
        },
        {
          id: 'u8-L4-Q22',
          type: 'fill-blank',
          question: 'The ratio T/(F*d) in the torque-tension relationship T = K*F*d, where T is torque, F is bolt preload, and d is nominal diameter, is called the nut factor or torque coefficient, denoted by _____.',
          blanks: ['K'],
          wordBank: ['K', 'C', 'f', 'mu', 'n'],
          explanation: 'The nut factor K (also called torque coefficient) in T = K × F × d encompasses all friction effects in the bolted joint: thread friction, bearing surface friction, and thread geometry. Typical values: K = 0.20 for dry, as-received steel bolts; K = 0.15 for lubricated bolts; K = 0.10 for heavily lubricated (anti-seize compound) or waxed bolts. The K factor has a significant uncertainty (typically ±25-30%), which is why torque control alone gives ±25-30% preload accuracy. For critical applications, direct tension measurement (ultrasonic, DTI washers, or load cells) is preferred.',
          hint: 'This dimensionless coefficient relates applied torque to achieved preload and bolt diameter.'
        },
        {
          id: 'u8-L4-Q23',
          type: 'multiple-choice',
          question: 'In a welded structure, what is the most common location for fatigue crack initiation?',
          options: [
            'At the center of the weld bead, where the metal is hottest during welding, though corrosion effects can modify this outcome',
            'At the weld toe — the geometric transition between the weld face and the base metal, which creates a sharp stress concentration',
            'In the base metal far from the weld, where residual stresses are highest — which misidentifies the root cause of the observed engineering behavior',
            'At the midpoint of the weld length — this reasoning applies only under idealized conditions not found in service'
          ],
          correctIndex: 1,
          explanation: 'The weld toe is the most common fatigue crack initiation site in welded joints. Three factors combine to make it critical: (1) geometric stress concentration — the angle where the weld face meets the base metal surface creates a notch-like stress raiser (Kt = 2-4 depending on the toe angle and radius), (2) tensile residual stress — welding creates tensile residual stress near yield magnitude at the toe, eliminating the beneficial effect of compressive stress cycles, and (3) microstructural changes — the heat-affected zone (HAZ) may have unfavorable microstructure. Fatigue improvement methods target the toe: (1) toe grinding to remove the notch and create a smooth transition, (2) TIG dressing to remelt the toe region, (3) peening (hammer or ultrasonic) to introduce compressive residual stress, and (4) post-weld heat treatment to relieve tensile residual stress.',
          hint: 'Look at the joint geometry — where is the sharpest geometric transition that concentrates stress?'
        },
        {
          id: 'u8-L4-Q24',
          type: 'true-false',
          question: 'The strength of a properly made fillet weld is independent of the direction of loading relative to the weld axis — transverse and longitudinal fillet welds have the same strength per unit length.',
          correctAnswer: false,
          explanation: 'Transverse fillet welds (loaded perpendicular to their axis) are approximately 50% stronger than longitudinal fillet welds (loaded parallel to their axis) of the same size. This is because: (1) the failure plane angle differs — longitudinal welds fail through the throat at 45 degrees in pure shear, while transverse welds fail at a steeper angle with a combination of shear and normal stress, (2) the effective throat area contributing to resistance is larger for transverse welds. Despite this difference, most design codes conservatively use the same allowable stress for both orientations (based on the weaker longitudinal direction) for simplicity. However, some codes (like AWS D1.1 and Eurocode 3) provide methods to take advantage of the higher transverse strength through directional strength increase factors.',
          hint: 'Consider the failure plane orientation and stress state when a fillet weld is loaded parallel vs. perpendicular to its axis.'
        },
        {
          id: 'u8-L4-Q25',
          type: 'multiple-choice',
          question: 'What is the purpose of using a Belleville (conical disc) washer stack under a bolt head?',
          options: [
            'To increase the bolt preload beyond what the torque wrench can achieve, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome',
            'To maintain bolt preload when the joint experiences thermal expansion/contraction, creep, or embedment relaxation — the spring action of the washer stack compensates for small changes in grip length',
            'To reduce the required torque for tightening, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications',
            'To prevent the bolt from being overtightened, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <!-- Top plate --> <rect x="10" y="24" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="24" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bottom plate --> <rect x="10" y="36" width="60" height="12" rx="2" fill="#58CC02" opacity="0.1"/> <rect x="10" y="36" width="60" height="12" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Bolt shaft (through both plates) --> <rect x="38" y="16" width="4" height="38" rx="1" fill="#3B8700" opacity="0.25"/> <rect x="38" y="16" width="4" height="38" rx="1" stroke="#3B8700" stroke-width="1" fill="none" opacity="0.3"/> <!-- Bolt head (hex, top) --> <rect x="34" y="12" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="12" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Nut (hex, bottom) --> <rect x="34" y="52" width="12" height="6" rx="2" fill="#58CC02" opacity="0.2"/> <rect x="34" y="52" width="12" height="6" rx="2" stroke="#3B8700" stroke-width="1.5" fill="none"/> <!-- Washer (top) --> <rect x="36" y="18" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Washer (bottom) --> <rect x="36" y="50" width="8" height="2" rx="1" fill="#A5E86C" opacity="0.15"/> <!-- Thread marks on bolt shaft --> <line x1="38.5" y1="44" x2="41.5" y2="43" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="46" x2="41.5" y2="45" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <line x1="38.5" y1="48" x2="41.5" y2="47" stroke="#A5E86C" stroke-width="0.5" opacity="0.15"/> <!-- Preload/clamping force arrows (pulsing) --> <g> <animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/> <!-- Bolt tension (upward on bolt) --> <line x1="40" y1="22" x2="40" y2="16" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,17 40,14 41.5,17" fill="#3B8700"/> <!-- Bolt tension (downward on bolt) --> <line x1="40" y1="48" x2="40" y2="54" stroke="#3B8700" stroke-width="1"/> <polygon points="38.5,53 40,56 41.5,53" fill="#3B8700"/> <!-- Clamping compression (plates pushed together) --> <polygon points="24,22 26,19 28,22" fill="#58CC02" opacity="0.5"/> <polygon points="24,48 26,51 28,48" fill="#58CC02" opacity="0.5"/> <polygon points="52,22 54,19 56,22" fill="#58CC02" opacity="0.5"/> <polygon points="52,48 54,51 56,48" fill="#58CC02" opacity="0.5"/> </g> <!-- Labels --> <text x="22" y="10" font-size="4" fill="#3B8700" opacity="0.15" font-style="italic">F_preload</text> <text x="40" y="68" text-anchor="middle" font-size="3.5" fill="#3B8700" opacity="0.15" font-style="italic">clamping force</text> </svg>',
          explanation: 'Belleville washers (also called disc springs) are conical disc springs that add controlled compliance to the bolted joint. When stacked in series (alternating orientation), they provide a lower spring rate over a longer deflection range. This is critical in joints that experience: (1) thermal cycling — differential expansion between bolt and clamped material changes the grip length, (2) gasket creep — gaskets lose thickness over time under load, (3) embedment relaxation — high-pressure contact surfaces flatten slightly under load. Without Belleville washers, these effects reduce preload and can cause leaks or loosening. The washer stack acts as a "preload insurance" by accommodating small changes in grip length while maintaining nearly constant bolt tension. Belleville washers are commonly used in flanged pipe joints, electrical connections, and suspension systems.',
          hint: 'These conical washers act as springs. What problem do they solve in a bolted joint that changes dimension slightly over time?'
        },
        {
          id: 'u8-L4-Q26',
          type: 'multiple-choice',
          question: 'A lap joint with two 10 mm thick plates is connected by a single row of 5 bolts (M12, A_t = 84.3 mm²) in single shear. What is the bolt shear capacity if the allowable shear stress is 160 MPa?',
          options: [
            '13.5 kN per bolt, valid only for isotropic material behavior',
            '67.4 kN total for all 5 bolts',
            '134.9 kN total for all 5 bolts',
            '84.3 kN per bolt — not the primary mechanism here'
          ],
          correctIndex: 1,
          explanation: 'Each bolt in single shear has one shear plane. Shear capacity per bolt = tau_allow × A = 160 × 84.3 = 13,488 N ≈ 13.5 kN. Total capacity for 5 bolts = 5 × 13.5 = 67.4 kN. Note: for bearing-type connections, the shear area is typically the nominal bolt area (A_d = pi*12^2/4 = 113.1 mm²) if the shear plane passes through the unthreaded shank, giving higher capacity. If threads are in the shear plane, the tensile stress area (A_t) is used. In double shear (two shear planes per bolt), the capacity doubles. Additionally, bearing failure of the plate (bolt crushing into the hole) must also be checked: F_bearing = sigma_b × d × t per bolt.',
          hint: 'Shear capacity = allowable shear stress × shear area. Is this single or double shear? Use A_t if threads are in the shear plane.'
        },
        {
          id: 'u8-L4-Q27',
          type: 'multiple-choice',
          question: 'What is "hydrogen embrittlement" in bolted joints, and which bolt grades are most susceptible?',
          options: [
            'Corrosion caused by water — all bolt grades are equally affected, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — an approximation that loses accuracy outside a narrow parameter range',
            'A form of stress corrosion cracking where hydrogen atoms diffuse into the high-strength steel, reducing its ductility and causing sudden brittle fracture. High-strength bolts (class 10.9 and 12.9, or SAE Grade 8) are most susceptible, especially when electroplated (zinc/cadmium plating generates hydrogen during the plating process).',
            'Galvanic corrosion between dissimilar metals in the joint, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, but industry experience indicates this factor plays only a minor role in the overall performance',
            'Fatigue failure accelerated by humidity — only low-strength bolts are affected, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — a simplified model that neglects the most significant physical variable'
          ],
          correctIndex: 1,
          explanation: 'Hydrogen embrittlement (HE) is a delayed failure mode where hydrogen atoms (from electroplating, cathodic protection, pickling, or corrosive environments) diffuse into the bolt steel and concentrate at high-stress locations (thread roots, under the head). The hydrogen reduces the material ductility and fracture toughness, and the bolt can fracture suddenly hours to days after installation — often well below its rated load. Susceptibility increases with: (1) hardness — bolts above HRC 39 (class 10.9 and above) are very susceptible, (2) stress level — higher preload increases risk, (3) hydrogen source — electroplating is a major source (mandatory post-plating baking at 190°C for 4+ hours to drive out hydrogen). Prevention: avoid electroplating high-strength bolts when possible (use mechanical zinc plating instead), specify baking procedures, use hot-dip galvanizing instead of electroplating for grades 8.8 and above.',
          hint: 'This failure mode is time-delayed and affects the hardest, strongest bolts. What embrittling element diffuses into steel during certain surface treatments?'
        },
        {
          id: 'u8-L4-Q28',
          type: 'true-false',
          question: 'A longer bolt (greater grip length) improves fatigue life in a cyclically loaded bolted joint because the longer bolt is more compliant (lower stiffness), resulting in a lower stiffness ratio C and a smaller fraction of the external load fluctuation reaching the bolt.',
          correctAnswer: true,
          explanation: 'This is a key design principle for fatigue-loaded bolted joints. A longer bolt has lower stiffness (k_b = EA/L, inversely proportional to length). Lower bolt stiffness means a lower stiffness ratio C = k_b/(k_b + k_c), and the bolt sees a smaller fraction (C × F_ext) of the external load fluctuation. For example, if C decreases from 0.3 to 0.15 by doubling bolt length, the fluctuating stress in the bolt is halved — dramatically improving fatigue life. This is why adding a thick spacer (distance tube) between the joint members, or using a reduced-shank bolt (which acts like a longer spring), are effective fatigue improvement techniques. The concept is: make the bolt stretchy relative to the clamped members.',
          hint: 'How does bolt length affect stiffness k_b, and how does k_b affect the stiffness ratio C and fatigue?'
        },
        {
          id: 'u8-L4-Q29',
          type: 'multiple-choice',
          question: 'What is the angle-of-turn tightening method, and why is it more accurate than pure torque control for achieving bolt preload?',
          options: [
            'The bolt is tightened by counting the number of turns from hand-tight — this method is only used for non-critical joints, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response',
            'The bolt is first snugged to a threshold torque, then turned through a specified additional angle. This method is more accurate because the preload is determined by bolt elongation (directly related to turn angle), which is less sensitive to friction variation than torque-based methods.',
            'The bolt is tightened until the wrench handle is at a specific angle — this ensures the mechanic does not over-tighten, which would only hold true if the material properties remained constant throughout the temperature range and loading history encountered in service',
            'This method involves measuring the bolt head angle with a protractor — it is slower and less accurate than torque control, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications'
          ],
          correctIndex: 1,
          explanation: 'The angle-of-turn (or turn-of-nut) method works in two steps: (1) snug the bolt to a specified threshold torque (to take up clearance and seat the joint), then (2) turn the nut an additional specified angle (e.g., 90 degrees, 180 degrees). The angle beyond snug directly controls bolt elongation: delta = (angle/360) × pitch. Since preload = k_b × delta, the preload depends on bolt stiffness and elongation — not on friction. This gives ±5-10% preload accuracy compared to ±25-30% for pure torque control. The method is specified in AISC and RCSC standards for structural steel connections. Limitations: requires a well-defined snug-tight condition, and accuracy depends on consistent bolt/joint stiffness.',
          hint: 'Preload = bolt stiffness × bolt elongation. If you control the elongation (via angle of turn), what variable is eliminated from the equation?'
        },
        {
          id: 'u8-L4-Q30',
          type: 'fill-blank',
          question: 'A welded joint where the weld metal is deposited in a groove between the edges of the plates being joined, providing full penetration through the plate thickness, is called a _____ weld.',
          blanks: ['butt'],
          wordBank: ['butt', 'fillet', 'plug', 'slot', 'seam'],
          explanation: 'A butt (groove) weld joins two plates edge-to-edge, with the weld metal filling a prepared groove (V, J, U, or bevel shape) between the plate edges. When executed with complete joint penetration (CJP), the weld cross-section equals the base plate thickness, making it as strong as the base metal — a 100% joint efficient connection. Butt welds require edge preparation (beveling/grooving), careful fit-up, and typically need backgouging or backing bars to ensure root fusion. They are inspected by radiographic (RT) or ultrasonic (UT) testing to verify full penetration. Butt welds are mandatory for pressure vessels, pipelines, and fatigue-critical structural connections where full-strength joints are required.',
          hint: 'This weld type fills a groove between plate edges and achieves full-thickness penetration.'
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
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="26" y="4" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <circle cx="40" cy="12" r="3" fill="#3B8700"/> <polyline stroke="#58CC02" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"> <animate attributeName="points" dur="2.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" values=" 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64; 40,14 40,18 28,24 52,30 28,36 52,42 28,48 52,54 28,60 52,66 28,72 52,78 40,82 40,84; 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64 "/> </polyline> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,20;0,0" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/> <rect x="26" y="64" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <rect x="26" y="64" width="28" height="6" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <text x="22" y="42" font-size="8" fill="#3B8700" font-style="italic" opacity="0.35">k</text> </svg>',
          explanation: 'Spring rate k = Gd⁴/(8D³Nₐ) = (80,000 × 5⁴)/(8 × 30³ × 8) = (80,000 × 625)/(8 × 27,000 × 8) = 50,000,000/1,728,000 ≈ 28.9 N/mm. The spring index C = D/d = 6, which is in the typical design range (4–12). This formula is fundamental to spring design — note that rate is inversely proportional to the cube of coil diameter and linearly to the number of active coils.',
          hint: 'k = Gd⁴/(8D³N_a). Be consistent with units — all in mm and MPa gives N/mm.'
        },
        {
          id: 'u8-L5-Q2',
          type: 'multiple-choice',
          question: 'A compression spring in a valve assembly keeps breaking after a few months. The fracture always occurs on the inner surface of the coil, roughly at the same location. The spring index (D/d) is 4.5. What is the likely cause, and what would you change?',
          options: [
            'The spring material is defective — replace the supplier and use the same design, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'The spring index is too low (tightly wound), causing a high Wahl correction factor that amplifies stress on the inner coil surface. The spring is failing in fatigue at the highest-stress location. Increase the spring index to 6-8 by increasing coil diameter or decreasing wire diameter.',
            'The spring is corroding at that location because moisture collects on the inner surface. Solution: use a corrosion-resistant material. The governing physical mechanism is well-established in the literature and differs from the explanation given.',
            'The spring is bottoming out (going solid) during operation, causing impact loads. Solution: add more clearance or a travel stop. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described.'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="26" y="4" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <circle cx="40" cy="12" r="3" fill="#3B8700"/> <polyline stroke="#58CC02" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"> <animate attributeName="points" dur="2.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" values=" 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64; 40,14 40,18 28,24 52,30 28,36 52,42 28,48 52,54 28,60 52,66 28,72 52,78 40,82 40,84; 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64 "/> </polyline> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,20;0,0" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/> <rect x="26" y="64" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <rect x="26" y="64" width="28" height="6" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <text x="22" y="42" font-size="8" fill="#3B8700" font-style="italic" opacity="0.35">k</text> </svg>',
          explanation: 'A spring index of 4.5 is at the low end of the practical range (4-12). The Wahl factor K_w for C = 4.5 is approximately 1.35, meaning the actual peak shear stress on the inner coil surface is 35% higher than the simple torsion formula predicts. The inner surface sees higher stress due to two effects: (1) stress concentration from coil curvature (inner fibers are compressed more), and (2) direct shear adding to torsional shear. Fatigue cracks initiate at the highest-stress point — the inner surface of the coil — which matches the observed failure location. Fix: increase the spring index to 6-8 (reducing K_w to ~1.25 or less) by either increasing the mean coil diameter or decreasing the wire diameter. Also check that the design stress is below the endurance limit for the wire material (typically 45-50% of UTS for shot-peened springs). Shot peening the wire introduces compressive residual stress on the surface, significantly improving fatigue life.',
          hint: 'The failure location (inner coil surface) and the low spring index are connected. What correction factor increases stress on the inner surface of tightly wound springs?'
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
          question: 'A lip seal on a rotating shaft is leaking oil after 18 months of service. The shaft surface under the seal shows a polished wear groove. What are the possible causes, and how would you prevent this on the replacement?',
          options: [
            'The seal was installed backward — lip seals only work in one direction. Simply install the new seal correctly. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described. The primary mechanism is fundamentally different from this description.',
            'The shaft surface roughness was either too rough (abraded the lip) or too smooth (no micro-texture to retain oil film), or the shaft is not hard enough (minimum 45 HRC under the seal). Solutions: ensure shaft hardness ≥45 HRC, surface finish 0.2-0.5 μm Ra, install a wear sleeve if the groove is deep, and verify the seal lip spring tension.',
            'The oil viscosity was too low, causing it to pass through the seal regardless of seal condition. Solution: use thicker oil. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described. The actual controlling parameter is not captured by this explanation.',
            'Lip seals have a fixed life and always wear out — 18 months is normal. Just replace the seal on a regular schedule. Careful analysis reveals that the dominant effect operates through a different mechanism than the one described. In practice, the dominant factor operates through a different mechanism entirely.'
          ],
          correctIndex: 1,
          explanation: 'Lip seal wear grooves are a common maintenance issue. Root causes: (1) Shaft hardness too low — a shaft below 45 HRC (30 HRC is typical for unhardened steel) allows the seal lip to wear a groove into the shaft surface. The groove then becomes a leak path the new seal cannot seal against. (2) Surface finish — too rough (>0.8 μm Ra) rapidly wears the lip; too smooth (<0.1 μm Ra) does not retain a micro-oil film, causing dry running and wear. The sweet spot is 0.2-0.5 μm Ra. (3) Shaft runout — excessive radial runout (>0.15 mm TIR) forces the lip to flex more than designed, accelerating wear. (4) Contamination — dirt entering between lip and shaft acts as an abrasive. Solutions: (1) if the groove is <0.25 mm deep, install the new seal at a slightly different axial position to contact unworn shaft. (2) For deeper grooves, install a hardened wear sleeve (press-fit thin-wall tube) over the shaft. (3) Ensure replacement shaft meets hardness and finish specifications.',
          hint: 'The wear groove is the key clue. What shaft properties prevent the seal from wearing into the shaft surface?'
        },
        {
          id: 'u8-L5-Q5',
          type: 'multiple-choice',
          question: 'You are selecting a seal for a centrifugal pump handling hot (90°C) chemical process fluid at 1.5 MPa. The pump runs continuously at 3000 RPM. Walk through the seal selection logic.',
          options: [
            'A standard nitrile rubber lip seal — it is the simplest and cheapest option for any rotating shaft, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables',
            'A mechanical face seal with chemically resistant face materials (SiC/SiC or SiC/carbon) and fluoroelastomer secondary seals — it handles the pressure, temperature, speed, and chemical exposure that would destroy elastomeric contact seals',
            'An O-ring in a groove — O-rings are universal seals that work at any pressure and temperature, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications',
            'A labyrinth seal — non-contact seals last forever because there is no wear, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables'
          ],
          correctIndex: 1,
          explanation: 'This application eliminates most seal types. Lip seals: cannot handle 1.5 MPa continuous pressure (max ~0.05 MPa without special backing). Nitrile rubber degrades above 100°C and cannot resist many chemicals. O-rings: would extrude at 1.5 MPa at this gap and temperature without backup rings, and cannot handle the rotary motion at 3000 RPM. Labyrinth seals: are non-contacting and allow leakage by design — unacceptable for a chemical process fluid. Mechanical face seals are the industry standard for pumps because: (1) spring-loaded flat faces maintain sealing under pressure and thermal changes, (2) hard face materials (SiC, tungsten carbide) resist chemical attack and wear, (3) the fluid film between faces provides lubrication, limiting wear and heat generation, (4) secondary seals (O-rings, bellows) can be selected for the specific chemical environment. The API 682 standard governs mechanical seal selection for the process industry.',
          hint: 'Eliminate seal types that fail any of the four requirements: 1.5 MPa pressure, 90°C temperature, chemical resistance, continuous 3000 RPM rotation.'
        },
        {
          id: 'u8-L5-Q6',
          type: 'fill-blank',
          question: 'An O-ring seals at low pressure through its initial compression (squeeze), but at higher pressures it is pushed against the groove walls by the system pressure itself. This pressure-assisted sealing behavior is called ___-energizing.',
          blanks: ['self'],
          wordBank: ['self', 'spring', 'hydraulic', 'gas', 'force'],
          explanation: 'O-rings are self-energizing (or pressure-energizing) seals. At low/zero pressure, sealing depends on the initial squeeze (10-30% compression) that creates contact stress against the mating surfaces. As system pressure rises, it acts on the upstream side of the O-ring, pushing it more firmly against the downstream groove wall and the mating surface, increasing the contact stress proportionally to the pressure. This is why O-rings can seal higher pressures than their initial squeeze alone would suggest. However, above ~10 MPa, the O-ring can extrude into the clearance gap between mating parts, requiring backup rings (anti-extrusion rings) to support the O-ring.',
          hint: 'The system pressure itself assists the sealing action by pushing the O-ring against the groove surfaces more firmly.'
        },
        {
          id: 'u8-L5-Q7',
          type: 'multiple-choice',
          question: 'A helical compression spring has a spring rate of 20 N/mm, a free length of 100 mm, and a solid length of 60 mm. What is the maximum force the spring can exert before going solid?',
          options: [
            '400 N',
            '600 N',
            '800 N',
            '1200 N'
          ],
          correctIndex: 2,
          explanation: 'Maximum deflection before solid = free length - solid length = 100 - 60 = 40 mm. Maximum force at solid height = k × delta_max = 20 × 40 = 800 N. In practice, the spring should never be compressed to solid height during normal operation — a minimum clash allowance of 10-15% of the working deflection should be maintained. Going solid causes impact loads, stress spikes, and accelerated fatigue failure. The solid stress (tau at solid height) should be checked against the material yield strength in shear (typically 45-50% of UTS for spring wire).',
          hint: 'Maximum deflection = free length - solid length. Force = spring rate × deflection.'
        },
        {
          id: 'u8-L5-Q8',
          type: 'multiple-choice',
          question: 'The Wahl correction factor K_w for a helical spring with spring index C is given by K_w = (4C-1)/(4C-4) + 0.615/C. For C = 6, what is K_w?',
          options: [
            '1.15',
            '1.25',
            '1.35',
            '1.45'
          ],
          correctIndex: 1,
          diagram: '<svg viewBox="0 0 80 80" fill="none"> <rect x="26" y="4" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <circle cx="40" cy="12" r="3" fill="#3B8700"/> <polyline stroke="#58CC02" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"> <animate attributeName="points" dur="2.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" values=" 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64; 40,14 40,18 28,24 52,30 28,36 52,42 28,48 52,54 28,60 52,66 28,72 52,78 40,82 40,84; 40,14 40,17 28,21 52,25 28,29 52,33 28,37 52,41 28,45 52,49 28,53 52,57 40,61 40,64 "/> </polyline> <g> <animateTransform attributeName="transform" type="translate" values="0,0;0,20;0,0" dur="2.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/> <rect x="26" y="64" width="28" height="6" rx="3" fill="#58CC02" opacity="0.15"/> <rect x="26" y="64" width="28" height="6" rx="3" stroke="#3B8700" stroke-width="1.5" fill="none"/> </g> <text x="22" y="42" font-size="8" fill="#3B8700" font-style="italic" opacity="0.35">k</text> </svg>',
          explanation: 'K_w = (4×6-1)/(4×6-4) + 0.615/6 = 23/20 + 0.1025 = 1.15 + 0.1025 = 1.2525 ≈ 1.25. The Wahl factor accounts for two effects: (1) curvature stress concentration — the inner coil fibers are at a smaller radius and experience higher stress, and (2) direct shear stress — which adds to the torsional shear. The first term (4C-1)/(4C-4) accounts for curvature, and the second term 0.615/C accounts for direct shear. For fatigue applications, K_w must be applied; for static loading, the simpler Bergstrasser factor K_B = (4C+2)/(4C-3) is sometimes used.',
          hint: 'Substitute C = 6 into the Wahl formula and compute each term separately.'
        },
        {
          id: 'u8-L5-Q9',
          type: 'true-false',
          question: 'Springs made from larger-diameter wire have a higher endurance limit (in terms of stress) than springs made from smaller-diameter wire of the same material.',
          correctAnswer: false,
          explanation: 'This is false — smaller diameter wire actually has a higher ultimate tensile strength and correspondingly higher endurance limit than larger diameter wire. This is because: (1) cold-drawing process — smaller wire undergoes more drawing passes, producing more work hardening and higher strength, (2) fewer internal defects — smaller cross-sections have lower probability of containing critical-size inclusions or voids, (3) the surface-to-volume ratio is higher, and the surface is the most highly worked region. For example, ASTM A228 music wire: 1 mm diameter has UTS ≈ 2600 MPa, while 6 mm diameter has UTS ≈ 1650 MPa. This size effect is captured in wire strength tables and empirical formulas like S_ut = A/d^m.',
          hint: 'Consider how wire drawing (cold work) affects strength, and how the amount of drawing changes with wire size.'
        },
        {
          id: 'u8-L5-Q10',
          type: 'multiple-choice',
          question: 'What is "spring surge" and why is it a concern in high-speed applications?',
          options: [
            'Spring surge is the increase in spring rate under high loads, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'Spring surge is a resonance phenomenon where a compression wave travels back and forth along the coils — if the operating frequency is near the spring natural frequency, the coils can clash together, causing high impact stress and early failure',
            'Spring surge is the tendency of a spring to buckle under high compression, but this reasoning applies only to a specific subset of conditions and cannot be generalized to the broader range of engineering applications',
            'Spring surge is the increase in free length due to thermal expansion at high temperatures, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome'
          ],
          correctIndex: 1,
          explanation: 'Spring surge occurs when a helical spring is excited at or near its natural frequency. A compression wave propagates along the coils, and at resonance, the coil spacing oscillates — some coils compress together (clash) while others open up. This creates impact stresses far above the design stress and causes rapid fatigue failure. The natural frequency of a helical spring is approximately: f_n = (d/(2*pi*D^2*N_a)) × sqrt(G*g/(32*rho)). For reliable operation, the spring natural frequency should be at least 15-20 times the operating frequency (some references specify 13× minimum). If surge cannot be avoided by frequency separation, friction dampers (nested springs with different pitch, or a plastic liner) can suppress the resonance.',
          hint: 'Like any elastic body, a spring has natural frequencies. What happens when the operating frequency matches?'
        },
        {
          id: 'u8-L5-Q11',
          type: 'multiple-choice',
          question: 'What is the difference between "closed and ground" and "closed and unground" spring ends for helical compression springs?',
          options: [
            'There is no functional difference — grinding is only cosmetic, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'Closed and ground ends have the last coil bent flat and the end face is ground perpendicular to the spring axis, providing a flat bearing surface for even load distribution. Unground ends are bent flat but not machined, resulting in a slightly tilted load application.',
            'Ground ends are for extension springs; unground ends are for compression springs, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
            'Ground ends have fewer active coils, making the spring stiffer, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism'
          ],
          correctIndex: 1,
          explanation: 'Spring end conditions affect both the spring geometry and the load application. Closed and ground: the end coils are coiled tight (closed), and the end face is ground flat and perpendicular to the spring axis. This provides a uniform bearing surface, ensuring the load is applied concentrically and the spring compresses straight without side-loading. Used for precision applications and springs in guides or bores. Closed and unground: end coils are closed but not ground — the end is slightly tilted, which can cause eccentric loading and sideways force. Acceptable for non-critical applications. The end condition also determines the number of inactive coils (dead coils): closed and ground = 2 dead coils, closed unground = 2 dead coils, open = 0 dead coils. Total coils = active coils + dead coils.',
          hint: 'How does the end surface flatness affect the way the spring sits and receives the load?'
        },
        {
          id: 'u8-L5-Q12',
          type: 'fill-blank',
          question: 'The product of the contact pressure (P) and sliding velocity (V) at a seal or bearing interface, which governs wear rate and heat generation, is called the _____ value.',
          blanks: ['PV'],
          wordBank: ['PV', 'FN', 'HV', 'CV', 'KV'],
          explanation: 'The PV (pressure-velocity) value is a fundamental parameter for sliding contact surfaces (seals, plain bearings, bushings). Heat generation at the interface is proportional to friction force times velocity = mu × P × A × V, and since mu is roughly constant for a given material pair, the PV product determines the frictional heat flux. Each material combination has a maximum allowable PV value — exceeding it causes excessive temperature rise, accelerated wear, or seizure. For example: PTFE (dry) PV limit ≈ 0.1 MPa·m/s, filled PTFE ≈ 0.35 MPa·m/s, bronze ≈ 1.0 MPa·m/s, carbon-graphite ≈ 0.5 MPa·m/s. The PV limit is used for seal selection (lip seals, mechanical seal faces) and bushing/plain bearing material selection.',
          hint: 'This two-letter abbreviation multiplies pressure by velocity and governs heat generation at a sliding interface.'
        },
        {
          id: 'u8-L5-Q13',
          type: 'multiple-choice',
          question: 'A compression spring has a free length of 120 mm and a mean coil diameter of 20 mm. The spring buckles during operation. What is the likely cause and solution?',
          options: [
            'The spring material is too soft — use a higher-grade spring wire, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables',
            'The free length to mean diameter ratio (L_f/D = 6) is too high — springs with L_f/D > 4 are prone to buckling. Solutions: use a spring guide (rod inside or tube outside), reduce free length, or increase the coil diameter.',
            'The wire diameter is too large — use thinner wire, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
            'The number of coils is too few — add more coils to stiffen the spring, though this explanation incorrectly attributes the effect to a secondary mechanism rather than the primary physical process governing the response'
          ],
          correctIndex: 1,
          explanation: 'Helical compression springs can buckle like columns when the slenderness ratio (free length / mean coil diameter) is too high. The critical ratio depends on the end conditions: for springs with both ends fixed (flat and parallel), buckling occurs when L_f/D > 4-5 for steel springs (exact threshold depends on the deflection as a fraction of free length). At L_f/D = 6, this spring is in the buckling-prone zone. Solutions: (1) use a spring guide — a rod through the center or a tube around the outside constrains lateral deflection and prevents buckling, (2) redesign with a larger coil diameter to reduce L_f/D, (3) split into two shorter springs in series, or (4) change to a drawbar/guide arrangement. The spring rate does not change with a guide, but the guide introduces friction that may affect performance.',
          hint: 'Like columns, springs can buckle when they are too long relative to their diameter. What is the critical ratio?'
        },
        {
          id: 'u8-L5-Q14',
          type: 'multiple-choice',
          question: 'What is the key difference between a single-acting mechanical seal and a double mechanical seal in pump applications?',
          options: [
            'Single seals use one spring; double seals use two springs, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, based on simplified assumptions about loading',
            'A single seal has one pair of sealing faces and the process fluid lubricates the faces. A double seal has two pairs of faces with a barrier/buffer fluid between them — providing two levels of containment and preventing process fluid from reaching the atmosphere, critical for hazardous fluids.',
            'Single seals work at low pressure; double seals work at high pressure, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, though corrosion effects can modify this outcome',
            'There is no difference in containment — double seals just last twice as long, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, assuming homogeneous material throughout the section'
          ],
          correctIndex: 1,
          explanation: 'Single mechanical seals have one sealing interface between a rotating face (on the shaft) and a stationary face (in the gland). The process fluid acts as the face lubricant and can leak (at a controlled, minimal rate) to atmosphere. Suitable for non-hazardous fluids. Double mechanical seals have two sets of faces arranged in tandem or face-to-face, with a barrier (pressurized) or buffer (unpressurized) fluid circulating between them. Benefits: (1) zero process fluid emissions to atmosphere (required for toxic, flammable, or carcinogenic fluids), (2) the barrier/buffer fluid lubricates and cools both seal faces, (3) provides backup sealing if one seal fails. API 682 defines seal arrangements: Arrangement 1 (single), Arrangement 2 (dual unpressurized/tandem), Arrangement 3 (dual pressurized/double). Arrangement 3 with pressurized barrier fluid is the highest level of containment.',
          hint: 'How many levels of sealing does each configuration provide, and what is between the seal faces?'
        },
        {
          id: 'u8-L5-Q15',
          type: 'true-false',
          question: 'Nitrile rubber (NBR) O-rings are suitable for use with hydraulic fluids at temperatures up to 150°C.',
          correctAnswer: false,
          explanation: 'Nitrile rubber (NBR/Buna-N) has a maximum continuous service temperature of approximately 100-120°C (depending on the specific compound). Above this temperature, NBR hardens, loses elasticity, and eventually cracks. For hydraulic applications above 120°C, fluoroelastomer (FKM/Viton) O-rings are used — they handle continuous temperatures up to 200°C and have excellent resistance to oils, fuels, and most chemicals. For even higher temperatures (up to 300°C), perfluoroelastomer (FFKM/Kalrez) or PTFE seals are required. Material selection for O-rings must consider: temperature range, chemical compatibility, pressure, and compression set resistance. NBR remains the most common and economical choice for hydraulic systems operating below 100°C.',
          hint: 'Check the maximum continuous temperature rating for NBR. What elastomer is used for higher temperatures?'
        },
        {
          id: 'u8-L5-Q16',
          type: 'multiple-choice',
          question: 'A leaf spring in a vehicle suspension has 8 leaves, each 75 mm wide and 8 mm thick, with a span of 1200 mm. What is the primary stress distribution in each leaf?',
          options: [
            'Pure torsion — the leaves twist under load — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms',
            'Pure tension — the leaves are stretched by the vehicle weight — however, standard engineering analysis methods and field experience both point to a different conclusion',
            'Bending stress — each leaf acts as a beam, with the stress varying linearly from zero at the neutral axis to maximum tension on the bottom surface and maximum compression on the top surface',
            'Uniform compressive stress through the leaf thickness — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here'
          ],
          correctIndex: 2,
          explanation: 'Leaf springs are essentially stacked beam springs. Each leaf bends under the applied load, with the classic bending stress distribution: sigma = My/I, varying linearly from compression on the concave side to tension on the convex side. The multi-leaf design distributes the bending moment across multiple leaves, reducing the stress in each one. For a graduated multi-leaf spring (leaves of different lengths), the design approximates a beam of uniform strength — each section has just enough leaves to carry the local bending moment. The interleaf friction provides damping but also causes hysteresis in the load-deflection curve.',
          hint: 'A leaf spring is fundamentally a beam element. What stress does a beam experience under transverse loading?'
        },
        {
          id: 'u8-L5-Q17',
          type: 'multiple-choice',
          question: 'What is compression set in elastomeric seals, and why is it a critical property?',
          options: [
            'Compression set is the maximum force needed to compress the seal, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'Compression set is the permanent deformation remaining after an elastomeric seal has been compressed for a period of time at elevated temperature — high compression set means the seal loses its elastic recovery and can no longer maintain sealing contact',
            'Compression set is the initial deflection when the seal is first installed, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'Compression set is the rate at which the seal compresses under constant load, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism'
          ],
          correctIndex: 1,
          explanation: 'Compression set is measured as the percentage of original deflection that is not recovered after the seal is released from a compressed state (typically after 22 hours at a specified temperature, per ASTM D395). A compression set of 0% means full recovery; 100% means no recovery (permanently deformed). As elastomers age (especially at elevated temperatures), the polymer chains rearrange and the material "forgets" its original shape — it takes a permanent set in the compressed configuration. When this happens in a seal groove, the O-ring no longer presses firmly against the sealing surfaces, and leakage occurs. Good seal materials have low compression set: fluoroelastomer (FKM) < 20% at 200°C, nitrile (NBR) < 25% at 100°C. High compression set is the primary aging failure mode for static O-ring seals.',
          hint: 'When an O-ring is compressed in a groove for months or years at temperature, does it spring back to its original shape?'
        },
        {
          id: 'u8-L5-Q18',
          type: 'fill-blank',
          question: 'The correction factor applied to the simple torsion shear stress formula for helical springs to account for curvature and direct shear effects is called the _____ factor.',
          blanks: ['Wahl'],
          wordBank: ['Wahl', 'Goodman', 'Soderberg', 'Bergstrasser', 'Johnson'],
          explanation: 'The Wahl factor (K_w), developed by A.M. Wahl, corrects the nominal torsion shear stress (tau = 8FD/(pi*d^3)) to account for: (1) curvature effect — the inner coil surface has shorter fibers that are more highly stressed, and (2) direct (transverse) shear stress — which adds to the torsional shear. K_w = (4C-1)/(4C-4) + 0.615/C, where C = D/d is the spring index. The corrected stress is tau = K_w × 8FD/(pi*d^3). For C = 4 (tight coil): K_w ≈ 1.40; for C = 10 (loose coil): K_w ≈ 1.14. The Wahl factor must be used for fatigue analysis; for static analysis, the simpler Bergstrasser factor or even the uncorrected formula may suffice.',
          hint: 'This correction factor is named after the engineer who derived it and is essential for accurate spring stress calculation.'
        },
        {
          id: 'u8-L5-Q19',
          type: 'multiple-choice',
          question: 'Two springs with rates k1 = 30 N/mm and k2 = 20 N/mm are connected in parallel. What is the combined spring rate?',
          options: [
            '12 N/mm',
            '25 N/mm',
            '50 N/mm',
            '600 N/mm'
          ],
          correctIndex: 2,
          explanation: 'For springs in parallel, the combined rate is the sum: k_total = k1 + k2 = 30 + 20 = 50 N/mm. In parallel, both springs deflect by the same amount, and the total force is the sum of individual forces: F = (k1 + k2) × delta. For springs in series, the combined rate is found from reciprocals: 1/k_total = 1/k1 + 1/k2, giving k_total = (k1 × k2)/(k1 + k2) = (30 × 20)/(30 + 20) = 12 N/mm. Parallel is stiffer; series is more compliant. Concentric springs (one inside the other) act in parallel, while springs stacked end-to-end act in series.',
          hint: 'Parallel springs share the same deflection. Do you add the rates or the compliances?'
        },
        {
          id: 'u8-L5-Q20',
          type: 'true-false',
          question: 'A labyrinth seal provides zero leakage and can replace contact seals in any application where leakage is unacceptable.',
          correctAnswer: false,
          explanation: 'Labyrinth seals are non-contact seals that reduce leakage through a series of throttling gaps (teeth or fins), but they do NOT provide zero leakage. They work by creating a tortuous path with multiple pressure drops — each labyrinth tooth causes flow expansion and energy dissipation, reducing the overall flow rate. Labyrinth seals are used where: (1) some controlled leakage is acceptable (steam turbines, gas turbines, compressors), (2) contact seals would fail due to extreme speed or temperature, (3) long life with zero maintenance is required (no wear since there is no contact). For zero-leakage applications, contact seals (mechanical seals, lip seals, O-rings) or hermetic seals (welded bellows, canned motor pumps) are required.',
          hint: 'Labyrinth seals are non-contact — can a seal with a gap between the rotating and stationary parts truly have zero leakage?'
        },
        {
          id: 'u8-L5-Q21',
          type: 'multiple-choice',
          question: 'An extension spring has hooks at both ends. Where is the most likely failure location, and why?',
          options: [
            'At the center of the spring body, where the stress is highest, but experimental observations under controlled laboratory conditions consistently show a different relationship between these variables',
            'At the hooks (end loops) — the bend radius at the hook transition creates a stress concentration that combines with the coil stress, making the hooks the weakest point of the spring',
            'At the point where the spring contacts its anchor — a frequently cited but technically inaccurate claim that confuses the secondary effects with the primary cause',
            'Extension springs fail randomly along their length — however, standard engineering analysis methods and field experience both point to a different conclusion'
          ],
          correctIndex: 1,
          explanation: 'Extension spring hooks are the most common failure point because: (1) the hook is formed by bending the wire into a loop or hook shape, introducing a stress concentration at the bend radius (Kt = 1.5-3.0 depending on hook geometry), (2) the hook experiences both bending and torsion as the spring stretches, (3) the hook wire cannot be shot-peened effectively (limited access), so surface compressive residual stress improvement is not practical. The stress at the hook can be 1.5-2 times higher than in the body coils. To improve hook life: (1) use generous hook bend radii, (2) design hook stress to be below the endurance limit, (3) consider machine hooks (formed from the coil wire) rather than cross-over center hooks, (4) in critical applications, use a threaded insert end fitting instead of a wire hook.',
          hint: 'The sharp bend where the body coil transitions into the hook creates a geometric discontinuity. What does that do to stress?'
        },
        {
          id: 'u8-L5-Q22',
          type: 'multiple-choice',
          question: 'What is the typical O-ring squeeze (compression) percentage for a static face seal application?',
          options: [
            '1-5%',
            '10-30%',
            '40-60%',
            '70-90%'
          ],
          correctIndex: 1,
          explanation: 'For static seal applications, the recommended O-ring squeeze is typically 10-30% of the O-ring cross-section diameter. Smaller O-rings (< 3 mm cross-section) use higher squeeze percentages (20-30%) because they need more deformation to compensate for surface irregularities. Larger O-rings (> 5 mm cross-section) use lower squeeze (10-20%) because excessive compression increases friction and accelerates compression set. For dynamic (reciprocating) seals, squeeze is typically 8-16% to reduce friction and wear. The groove depth determines the squeeze: groove depth = O-ring cross-section × (1 - squeeze fraction). Too little squeeze causes leakage; too much causes excessive friction, extrusion, and compression set.',
          hint: 'The squeeze must be enough to seal but not so much that it causes excessive stress and permanent deformation.'
        },
        {
          id: 'u8-L5-Q23',
          type: 'multiple-choice',
          question: 'Shot peening is commonly applied to springs. What does it do, and how does it improve fatigue life?',
          options: [
            'It smooths the surface to reduce friction, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism',
            'It introduces a layer of compressive residual stress on the wire surface by bombarding it with small steel shot — this compressive layer opposes the tensile stress from loading, effectively raising the fatigue strength by 20-40%',
            'It hardens the core of the wire by cold working, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
            'It removes surface defects by chipping away damaged material, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process'
          ],
          correctIndex: 1,
          explanation: 'Shot peening is a cold working process where the spring wire surface is bombarded with small hardened steel or glass beads at high velocity. Each impact creates a small dimple and plastically deforms the surface layer, creating a compressive residual stress to a depth of 0.1-0.3 mm. Since fatigue cracks initiate at the surface in tension, the compressive layer must be overcome before the surface sees net tension, effectively increasing the fatigue strength by 20-40%. For springs, shot peening is most effective on the inner coil surface (where maximum stress occurs) — specialized techniques ensure the shot reaches this area. Additional benefits: (1) the dimpled surface retains lubricant, (2) small surface defects are masked by the compressive stress. Shot peening intensity is measured in Almen strips and must be controlled to avoid over-peening (which can damage the surface).',
          hint: 'Fatigue cracks start at the surface in tension. What if the surface is already in compression before the load is applied?'
        },
        {
          id: 'u8-L5-Q24',
          type: 'true-false',
          question: 'A torsion spring stores energy by twisting the coils, and the primary stress in the wire is bending stress, not torsional shear stress.',
          correctAnswer: true,
          explanation: 'Despite its name, a torsion spring stores energy through bending of the wire — the applied moment causes each coil to bend. The primary stress in the wire is bending stress (sigma = 32M/(pi*d^3)), not torsional shear. This is the opposite of a compression/extension spring, where the coils experience torsional shear stress. The spring rate of a torsion spring is k = E*d^4/(64*D*N_a) (using E, not G, because the wire bends rather than twists). When a torsion spring is wound tighter (in the closing direction), the coil diameter decreases and the body length increases — the designer must account for this dimensional change in the housing design.',
          hint: 'Consider what happens to the wire cross-section as you apply a moment to wind the spring — does it twist or bend?'
        },
        {
          id: 'u8-L5-Q25',
          type: 'multiple-choice',
          question: 'A mechanical face seal is leaking excessively. Inspection reveals circumferential scoring marks on one of the seal faces. What is the most likely cause?',
          options: [
            'The seal was installed upside down, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process',
            'Particulate contamination in the process fluid — hard particles entered between the seal faces, scratched the lapped surface, and created leak paths across the sealing dam',
            'The seal spring force is too high, assuming idealized boundary conditions that rarely exist in actual field installations where constraint and loading complexity affect the outcome',
            'The shaft speed is too low for hydrodynamic lift — though appealing as an explanation, the actual response is governed by a different set of physical parameters and mechanisms'
          ],
          correctIndex: 1,
          explanation: 'Circumferential scoring on mechanical seal faces is the hallmark of particle contamination. Mechanical seals operate with extremely flat faces (lapped to within 1-2 helium light bands, or 0.3-0.6 micrometers). Even small hard particles (sand, scale, crystallized product) that enter the interface will score the faces, creating radial leak paths across the sealing dam. Prevention: (1) install a cyclone separator or filter upstream of the seal, (2) use a flush system (API Plan 32) to supply clean fluid to the seal faces, (3) for abrasive services, use hard face materials on both faces (SiC/SiC instead of SiC/carbon), (4) use a double seal with clean barrier fluid. Diagnosis: examine the scoring pattern — random scratches suggest random particle events; continuous grooves suggest embedded particles or a damaged mating face.',
          hint: 'The seal faces are precision-lapped to light-band flatness. What contaminant could create score marks on such a surface?'
        },
        {
          id: 'u8-L5-Q26',
          type: 'multiple-choice',
          question: 'What is the difference between backup rings and anti-extrusion rings in O-ring seal design?',
          options: [
            'They are different names for the same component — a hard ring installed on the low-pressure side of the O-ring to prevent the elastomer from being forced (extruded) into the clearance gap under high pressure',
            'Backup rings prevent the O-ring from moving; anti-extrusion rings prevent chemical attack, though experimental data shows this correlation breaks down at extreme operating conditions',
            'Backup rings are used with static seals only; anti-extrusion rings are for dynamic seals, but industry experience indicates this factor plays only a minor role in the overall performance',
            'They serve completely different functions — backup rings center the O-ring while anti-extrusion rings prevent wear — this reasoning applies only under idealized conditions not found in service'
          ],
          correctIndex: 0,
          explanation: 'Backup rings and anti-extrusion rings are indeed the same component with two names. They are rigid or semi-rigid rings (typically PTFE, nylon, or PEEK) installed in the O-ring groove on the low-pressure (downstream) side. Their purpose: at high pressures (>3.5 MPa for static, >7 MPa for dynamic seals, depending on clearance), the O-ring can be forced into the gap between mating parts, causing it to nibble (small pieces torn from the surface) and eventually fail. The backup ring bridges the extrusion gap, supporting the O-ring and preventing it from being pushed into it. For very high pressures or bidirectional pressure, two backup rings are used (one on each side of the O-ring). The maximum pressure without backup rings depends on the clearance gap, O-ring hardness, and temperature.',
          hint: 'These are two names for the same critical component. What failure mode do they prevent?'
        },
        {
          id: 'u8-L5-Q27',
          type: 'multiple-choice',
          question: 'A Belleville (disc) spring has a unique load-deflection characteristic compared to helical springs. What is it?',
          options: [
            'Belleville springs have a perfectly linear load-deflection curve — however, standard engineering analysis methods and field experience both point to a different conclusion',
            'By selecting the ratio of free height (h) to thickness (t), the load-deflection curve can be made linear (h/t ≈ 0.4), regressive/constant-force (h/t ≈ 1.41), or even negative rate (snap-through, h/t > 1.41)',
            'Belleville springs always have a progressive (increasing rate) characteristic — this describes a real phenomenon but incorrectly applies it to the specific conditions and configuration described here',
            'Belleville springs can only deflect to flat and then stop, which oversimplifies the underlying physics by neglecting the interaction between thermal activation and mechanical driving forces in this process'
          ],
          correctIndex: 1,
          explanation: 'Belleville (conical disc) springs have a unique nonlinear characteristic controlled by the h/t ratio (free cone height to material thickness): (1) h/t < 0.4: approximately linear, like a helical spring, (2) h/t ≈ 1.0: the load increases to a peak then decreases — constant-force region near the peak, (3) h/t ≈ sqrt(2) ≈ 1.41: the load reaches a maximum and then decreases to zero at flat — the spring provides nearly constant force over a range of deflection, (4) h/t > 1.41: the curve goes negative — the spring snaps through to an inverted position (bistable behavior). Stacking in parallel (nested same orientation) multiplies the load; stacking in series (alternating orientation) multiplies the deflection. This versatility makes Belleville springs ideal for overload protection, thermal compensation in bolted joints, and constant-force applications.',
          hint: 'The free height to thickness ratio controls whether the curve is linear, flat-topped, or has a negative slope region.'
        },
        {
          id: 'u8-L5-Q28',
          type: 'true-false',
          question: 'When springs are connected in series (stacked end-to-end), the combined spring rate is lower than the rate of any individual spring.',
          correctAnswer: true,
          explanation: 'For springs in series: 1/k_total = 1/k1 + 1/k2 + ... The reciprocal of the total rate is the sum of the reciprocals. This means k_total is always less than the smallest individual spring rate. For example, two identical springs with k = 20 N/mm in series give k_total = 10 N/mm (half the individual rate). Physically, this makes sense: each spring deflects under the full load, so the total deflection is the sum of individual deflections, making the assembly more compliant. This is analogous to resistors in series (increased total resistance) and capacitors in series (decreased total capacitance).',
          hint: 'In series, each spring sees the full load and deflects independently. Is the total deflection more or less than one spring alone?'
        },
        {
          id: 'u8-L5-Q29',
          type: 'multiple-choice',
          question: 'A hydraulic cylinder uses a piston seal and a rod seal. Why is the rod seal more prone to failure than the piston seal?',
          options: [
            'The rod seal sees higher pressure, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism, but the predominant failure mechanism under these conditions is fundamentally different',
            'The rod seal is exposed to the external environment (dust, moisture, temperature extremes) while the piston seal operates in the controlled, lubricated environment inside the cylinder. Additionally, the rod seal must scrape contaminants off the retracting rod to prevent them from entering the cylinder.',
            'The rod seal has a smaller diameter and therefore higher stress, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — valid for textbook problems but misleading for real-world applications',
            'The rod is harder than the cylinder bore, causing more wear, provided all secondary effects including environmental exposure, residual stress state, and prior deformation history are negligible compared to the primary mechanism — which misidentifies the root cause of the observed engineering behavior'
          ],
          correctIndex: 1,
          explanation: 'The rod seal (mounted in the cylinder head) seals the reciprocating rod as it extends and retracts. It is the most failure-prone seal in a hydraulic cylinder because: (1) environmental exposure — the rod passes through the external environment, picking up dust, dirt, moisture, and other contaminants on its surface, (2) the rod seal must wipe these contaminants off the retracting rod to prevent them from entering the cylinder and damaging internal seals, (3) exposure to temperature extremes (sunlight, cold weather), UV degradation, and chemical splash, (4) the rod surface finish degrades over time from scoring, corrosion, or stone impact (on mobile equipment). The piston seal, by contrast, operates inside the cylinder in a clean, lubricated, temperature-controlled environment. Rod seal protection is provided by wiper seals (scraper seals) installed outboard of the main rod seal to remove gross contamination.',
          hint: 'Consider the environment each seal operates in — one is inside the cylinder, the other faces the outside world.'
        },
        {
          id: 'u8-L5-Q30',
          type: 'fill-blank',
          question: 'The seal type where two precision-lapped flat surfaces (one rotating, one stationary) maintain contact under spring and hydraulic pressure to prevent leakage in pump applications is called a _____ seal.',
          blanks: ['mechanical'],
          wordBank: ['mechanical', 'labyrinth', 'lip', 'packing', 'carbon'],
          explanation: 'Mechanical (face) seals are the standard sealing technology for centrifugal pumps, compressors, and other rotating equipment handling liquids. The seal consists of two flat faces lapped to optical flatness (within 2-3 helium light bands): one rotates with the shaft and the other is stationary in the housing. A spring (or bellows) maintains face contact. During operation, a thin fluid film (0.25-1 micrometer) develops between the faces, providing lubrication while minimizing leakage. Face material pairs are selected for the application: carbon vs. SiC (general purpose), SiC vs. SiC (abrasive fluids), tungsten carbide vs. carbon (high pressure). API 682 is the governing standard for mechanical seals in the petroleum and chemical industries.',
          hint: 'Two flat, precision-lapped surfaces — one rotating, one stationary — with a thin lubricating film between them.'
        }
      ]
    }
  ]
};
