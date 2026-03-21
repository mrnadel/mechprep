import type { Unit } from '../types';

export const unit9: Unit = {
  id: 'u9-gdt',
  title: 'GD&T & Tolerancing',
  description: 'Geometric dimensioning and tolerancing, datum systems, tolerance stack-ups, surface finish, and metrology.',
  color: '#EC4899',
  icon: '📏',
  topicId: 'design-tolerancing',
  lessons: [
    {
      id: 'u9-L1',
      title: 'Tolerance Fundamentals',
      description: 'Tolerance/allowance, clearance/interference/transition fits, ISO/ANSI tolerance grades, bilateral/unilateral.',
      icon: '📐',
      xpReward: 20,
      questions: [
        {
          id: 'u9-L1-Q1',
          type: 'multiple-choice',
          question: 'A bearing manufacturer recommends an interference fit for the inner ring on a rotating shaft, but a clearance fit for the outer ring in the housing. Why are the fit types different for the same bearing?',
          options: [
            'It is arbitrary — both rings could use the same fit type without any functional difference',
            'The rotating ring must have an interference fit to prevent creep (relative rotation under load), while the stationary ring uses a clearance fit to allow axial float and easier assembly/disassembly',
            'The inner ring needs interference because it is smaller in diameter and therefore weaker',
            'Clearance on the outer ring is only for thermal expansion — functionally both should be interference fits'
          ],
          correctIndex: 1,
          explanation: 'The ring that rotates relative to the load direction must have an interference fit to prevent "creep" — gradual rotation of the ring relative to its seat due to cyclic loading. If the inner ring creeps on the shaft, it causes fretting, wear, and eventual failure. The stationary ring (outer, in this case) can use a clearance or light transition fit to allow axial float for thermal expansion and simplify replacement. If the outer ring rotated instead (e.g., wheel hub bearing), the fit recommendations reverse. This is a fundamental bearing application concept.',
          hint: 'Think about which ring sees the rotating load vector and what happens if it slips on its seat.'
        },
        {
          id: 'u9-L1-Q2',
          type: 'multiple-choice',
          question: 'A junior engineer specifies H7/s6 (heavy interference) for a ∅15 mm aluminum pin in a ∅15 mm aluminum housing on a consumer product. During assembly, the housing cracks. What went wrong, and what would you recommend?',
          options: [
            'The tolerance grade was too loose — they should have used H6/s5 for a tighter fit',
            'H7/s6 is a heavy press fit that generates hoop stresses exceeding aluminum\'s yield strength in thin-walled housings; they should use a lighter fit (H7/p6 or H7/n6), increase wall thickness, or switch to a slip fit with a retaining compound',
            'The cracking is a material defect — H7/s6 is appropriate for aluminum',
            'They should have used the same fit but heated the housing before assembly'
          ],
          correctIndex: 1,
          explanation: 'H7/s6 produces very high interference, especially problematic in aluminum which has lower yield strength (~275 MPa for 6061-T6 vs. ~530 MPa for medium carbon steel) and lower fracture toughness. The hoop stress from the press fit can exceed the housing material\'s capability, especially with thin walls. Solutions: use a lighter interference fit (H7/n6 or H7/p6), increase the housing wall thickness (OD/ID ratio), use Loctite retaining compound with a slip fit, or heat the housing before assembly to reduce insertion stress. This is a common design mistake when engineers apply steel-based fit recommendations to aluminum.',
          hint: 'Consider the material properties of aluminum vs. steel when selecting interference fit levels.'
        },
        {
          id: 'u9-L1-Q3',
          type: 'multiple-choice',
          question: 'You inherit a drawing that specifies ∅50 +0.000/−0.050 mm for a bore and ∅50 +0.025/+0.050 mm for the mating shaft. What type of fit is this, and is there a potential design concern?',
          options: [
            'Clearance fit with no concerns — the shaft is always smaller than the hole',
            'Interference fit — the shaft maximum (50.050) always exceeds the hole maximum (50.000), guaranteeing interference; the concern is whether the assembly method (press, thermal, hydraulic) is specified',
            'Transition fit — sometimes clearance, sometimes interference depending on actual sizes',
            'The tolerances are invalid because the shaft cannot be larger than nominal'
          ],
          correctIndex: 1,
          explanation: 'Maximum shaft = 50.050, minimum shaft = 50.025. Maximum hole = 50.000, minimum hole = 49.950. Even the smallest shaft (50.025) exceeds the largest hole (50.000), so interference is guaranteed. Min interference = 50.025 − 50.000 = 0.025 mm; max interference = 50.050 − 49.950 = 0.100 mm. The design concern: the drawing should specify the assembly method — press fit at room temperature, thermal shrink fit (heat housing to ~150°C), or hydraulic expansion. Without this, manufacturing may attempt to force the parts, risking damage. Always pair interference fit callouts with assembly instructions.',
          hint: 'Check if the smallest shaft can fit in the largest hole. If not, interference is guaranteed.'
        },
        {
          id: 'u9-L1-Q4',
          type: 'multiple-choice',
          question: 'A dimension is specified as 50 +0.05/−0.10 mm. What is the tolerance, and is it bilateral or unilateral?',
          options: [
            'Tolerance = 0.05 mm, unilateral',
            'Tolerance = 0.10 mm, unilateral',
            'Tolerance = 0.15 mm, bilateral',
            'Tolerance = 0.15 mm, unilateral'
          ],
          correctIndex: 2,
          explanation: 'Total tolerance = upper deviation − lower deviation = +0.05 − (−0.10) = 0.15 mm. This is bilateral tolerancing because the deviations are on both sides of the nominal (one positive, one negative), though they are asymmetric. Unilateral would be both deviations on the same side (e.g., +0.00/+0.15 or −0.15/−0.00). The allowable range is 49.90 to 50.05 mm. Bilateral symmetric (±0.075) is easiest for manufacturing because the target is the nominal dimension.',
          hint: 'Tolerance = upper limit − lower limit. Bilateral means deviations exist on both sides of nominal.'
        },
        {
          id: 'u9-L1-Q5',
          type: 'multiple-choice',
          question: 'A manufacturing engineer complains that your drawing has an IT6 tolerance on a rough cast surface that gets no machining. Why is this a problem, and how do you resolve it?',
          options: [
            'IT6 is too loose for a cast surface — they should be asking for IT5 or tighter',
            'IT6 requires precision machining (grinding or fine turning) and cannot be achieved on an as-cast surface; you should either add a machining operation to that surface or relax the tolerance to IT11–IT14 (typical for sand casting)',
            'The tolerance grade does not matter for cast surfaces since they are not functional',
            'The engineer is wrong — modern casting processes can easily achieve IT6'
          ],
          correctIndex: 1,
          explanation: 'ISO tolerance grades reflect manufacturing process capability. Sand casting typically achieves IT11–IT16, investment casting IT7–IT9, die casting IT8–IT10. IT6 requires precision machining (grinding, honing, or fine turning). Specifying IT6 on an unmachined cast surface means either the surface must be machined (adding cost and a machining datum), or the tolerance must be relaxed to match the casting process capability. This is a common DFM issue — always match tolerance grades to the actual manufacturing process for each surface.',
          hint: 'Think about what tolerance grades different manufacturing processes can realistically achieve.'
        },
        {
          id: 'u9-L1-Q6',
          type: 'fill-blank',
          question: 'The minimum intended difference in size between mating parts in a clearance fit is called the ___.',
          blanks: ['allowance'],
          wordBank: ['allowance', 'tolerance', 'deviation', 'clearance', 'variance'],
          explanation: 'Allowance is the minimum clearance (in a clearance fit) or maximum interference (in an interference fit) between mating parts. For a clearance fit, allowance = minimum hole size − maximum shaft size, and it must be positive. It represents the tightest possible fit condition. Tolerance is the permissible variation in a single dimension, while allowance describes the designed gap or interference between two mating parts.',
          hint: 'This is the tightest possible fit between mating parts — the designed minimum gap.'
        },
        {
          id: 'u9-L1-Q7',
          type: 'multiple-choice',
          question: 'In the ISO hole-basis system, what does the designation H7/g6 represent?',
          options: [
            'A hole with fundamental deviation H and IT grade 7, mating with a shaft with fundamental deviation g and IT grade 6 — always producing a clearance fit',
            'A hole of 7 mm mating with a shaft of 6 mm',
            'An interference fit with 7 mm hole and 6 mm shaft',
            'A transition fit where H and g are surface finish symbols'
          ],
          correctIndex: 0,
          explanation: 'In the ISO system, uppercase letters denote hole deviations and lowercase letters denote shaft deviations. "H" means the hole has a zero lower deviation (hole starts at nominal). The number 7 is the IT grade for the hole. "g" means the shaft has a negative upper deviation (shaft is always smaller than nominal), and 6 is its IT grade. H7/g6 is a common close-running clearance fit used for precision sliding fits such as spindle bearings and piston-cylinder arrangements. The combination always produces positive clearance.',
          hint: 'Uppercase = hole, lowercase = shaft. The letter defines the position of the tolerance zone relative to nominal.'
        },
        {
          id: 'u9-L1-Q8',
          type: 'multiple-choice',
          question: 'What is the fundamental difference between the hole-basis and shaft-basis fit systems, and when would you prefer the shaft-basis system?',
          options: [
            'There is no real difference — both produce the same results',
            'In a hole-basis system the hole tolerance zone is fixed (H) and the fit is varied by changing the shaft; in a shaft-basis system the shaft is fixed (h) and the hole is varied. Shaft-basis is preferred when a standard shaft (ground bar stock) mates with multiple features at different fits',
            'Hole-basis is for metric and shaft-basis is for imperial systems',
            'Shaft-basis always produces tighter fits than hole-basis'
          ],
          correctIndex: 1,
          explanation: 'The hole-basis system is most common because it is generally harder (more expensive) to adjust hole size than shaft size — using a standard reamer for the H hole and adjusting the shaft via turning is economical. However, the shaft-basis system is preferred when a single shaft of standard size (e.g., ground and polished bar stock) passes through multiple housings or bearings requiring different fits. In that case, it is cheaper to vary the bore sizes than to step the shaft diameter. Both systems produce identical types of fits; they just differ in which part is varied.',
          hint: 'Think about when it is cheaper to vary the hole rather than the shaft.'
        },
        {
          id: 'u9-L1-Q9',
          type: 'multiple-choice',
          question: 'A shaft is specified as ∅25 h6. What are the upper and lower deviations of this shaft?',
          options: [
            'Upper deviation = +0.013 mm, lower deviation = 0.000 mm',
            'Upper deviation = 0.000 mm, lower deviation = −0.013 mm',
            'Upper deviation = +0.013 mm, lower deviation = −0.013 mm',
            'Upper deviation = +0.006 mm, lower deviation = −0.006 mm'
          ],
          correctIndex: 1,
          explanation: 'The fundamental deviation "h" for a shaft means the upper deviation is zero — the shaft at its largest equals the nominal size. The tolerance zone extends below nominal. For ∅25 at IT6, the tolerance value is 0.013 mm (from ISO 286 tables). So the shaft ranges from ∅25.000 mm to ∅24.987 mm. This is analogous to the hole-basis "H" where the hole lower deviation is zero. The h shaft is the basis shaft in the shaft-basis system.',
          hint: 'The lowercase "h" for shafts means the tolerance zone lies entirely at or below nominal.'
        },
        {
          id: 'u9-L1-Q10',
          type: 'true-false',
          question: 'A transition fit can result in either a small clearance or a small interference between mating parts, depending on the actual manufactured sizes within tolerance.',
          correctAnswer: true,
          explanation: 'A transition fit is defined by overlapping tolerance zones of the hole and shaft. Depending on where the actual sizes fall within their respective tolerance bands, the result may be a small clearance (shaft smaller than hole) or a small interference (shaft larger than hole). Common transition fits include H7/k6, H7/m6, and H7/n6. They are used when accurate location is needed without guaranteed interference — for example, locating dowel pins, bearing outer rings in housings, or gear hubs on shafts.',
          hint: 'If the shaft and hole tolerance zones overlap, what are the possible fit outcomes?'
        },
        {
          id: 'u9-L1-Q11',
          type: 'multiple-choice',
          question: 'You need to select a fit for a gear hub on a keyed shaft. The gear must be precisely located but removable for maintenance. Which fit type is most appropriate?',
          options: [
            'H7/d9 — a loose running clearance fit',
            'H7/s6 — a heavy interference press fit',
            'H7/k6 — a transition (locational) fit that provides accurate centering with easy assembly/disassembly',
            'H11/c11 — an extra-loose clearance fit'
          ],
          correctIndex: 2,
          explanation: 'H7/k6 is a locational transition fit ideal for components that need precise centering on a shaft but must be removable. It may produce a very slight clearance or very light interference. The key transmits the torque, so the fit does not need to resist rotation — it only needs to center the gear on the shaft. A press fit (H7/s6) would make maintenance difficult, while a loose clearance fit (H7/d9) would allow excessive radial play causing vibration and accelerated wear on the key.',
          hint: 'Consider a fit that centers accurately but does not prevent disassembly.'
        },
        {
          id: 'u9-L1-Q12',
          type: 'multiple-choice',
          question: 'What is the relationship between tolerance grade number (IT number) and the magnitude of the tolerance?',
          options: [
            'Higher IT numbers indicate tighter tolerances',
            'Higher IT numbers indicate wider (looser) tolerances — IT01 is the tightest and IT18 is the loosest',
            'IT numbers are unrelated to tolerance magnitude — they refer to surface finish quality',
            'All IT grades have the same tolerance magnitude but differ in the position of the tolerance zone'
          ],
          correctIndex: 1,
          explanation: 'ISO tolerance grades range from IT01 (tightest, used for gauge blocks) through IT18 (loosest, rough castings/forgings). For a given nominal diameter, each step up in IT grade roughly increases the tolerance by a factor of 1.6. Typical applications: IT01-IT1 for gauge blocks, IT5-IT7 for precision machining, IT8-IT11 for general machining, IT12-IT16 for sheet metal/castings. The tolerance value also increases with nominal diameter because larger parts are inherently harder to hold to the same absolute accuracy.',
          hint: 'Think about the scale: IT01 for gauge blocks, IT16 for rough castings. Which end is tighter?'
        },
        {
          id: 'u9-L1-Q13',
          type: 'true-false',
          question: 'In the ISO system, for a given IT grade, the tolerance value is constant regardless of the nominal diameter.',
          correctAnswer: false,
          explanation: 'The tolerance value increases with nominal diameter. For example, IT7 tolerance for ∅6-10 mm is 0.015 mm, but for ∅100-120 mm it is 0.035 mm. This reflects the reality that it is inherently more difficult to hold the same absolute tolerance on a larger part. The ISO tolerance formula uses a geometric mean diameter (D = sqrt(D_lower x D_upper)) to calculate the tolerance unit (i = 0.45 * D^(1/3) + 0.001 * D for D in mm), and each IT grade is a multiple of this unit.',
          hint: 'Is it equally easy to hold ±0.01 mm on a 5 mm part and a 500 mm part?'
        },
        {
          id: 'u9-L1-Q14',
          type: 'multiple-choice',
          question: 'A designer specifies ∅30 +0.021/+0.000 mm for a bore. What type of tolerancing is this?',
          options: [
            'Bilateral symmetric tolerancing',
            'Bilateral asymmetric tolerancing',
            'Unilateral tolerancing — both deviations are on the same side of nominal (positive side)',
            'Limit dimensioning'
          ],
          correctIndex: 2,
          explanation: 'Both deviations are on the same side of nominal (zero and positive), making this unilateral tolerancing. The bore ranges from ∅30.000 to ∅30.021 mm, always at or above nominal. This is characteristic of an H-type hole (lower deviation = 0). Unilateral tolerancing is common in hole-basis systems where the minimum hole size equals the nominal. Bilateral tolerancing would have deviations on both sides, like +0.010/−0.011.',
          hint: 'Look at whether the deviations straddle the nominal or are both on one side.'
        },
        {
          id: 'u9-L1-Q15',
          type: 'multiple-choice',
          question: 'What is "limit dimensioning" and when is it preferred over plus/minus tolerancing?',
          options: [
            'Limit dimensioning is another name for bilateral tolerancing',
            'Limit dimensioning directly states the maximum and minimum acceptable sizes (e.g., ∅30.021/30.000) without requiring the machinist to calculate limits; it is preferred for critical features to reduce calculation errors on the shop floor',
            'Limit dimensioning only applies to angular dimensions',
            'Limit dimensioning means using the tightest possible tolerance for every dimension'
          ],
          correctIndex: 1,
          explanation: 'Limit dimensioning presents the two extreme acceptable values directly (e.g., ∅30.021 over ∅30.000). The machinist does not need to add or subtract deviations from a nominal — the go/no-go limits are immediately clear. This reduces errors, especially on busy shop floors. It is preferred for critical fits, bores, and shafts where there is no ambiguity. Per ASME Y14.5, the larger value is placed on top (for internal features) or as the first value. Plus/minus tolerancing is more convenient for non-critical general dimensions.',
          hint: 'Think about which method gives the machinist the clearest, most error-proof information.'
        },
        {
          id: 'u9-L1-Q16',
          type: 'true-false',
          question: 'The "basic size" (nominal size) in an ISO fit system is the size from which all deviations are calculated, and it is the same for both the hole and the shaft in a mating pair.',
          correctAnswer: true,
          explanation: 'The basic (nominal) size is the common reference dimension for both the hole and the shaft. For example, in a ∅25 H7/g6 fit, the basic size is 25 mm for both parts. The fundamental deviations and tolerance grades then define how each part deviates from this common reference. This shared basic size is what makes the fit system work — clearance, interference, or transition is determined by the relative positions of the two tolerance zones around the same nominal.',
          hint: 'If the hole and shaft had different nominal sizes, how would you define their fit relationship?'
        },
        {
          id: 'u9-L1-Q17',
          type: 'multiple-choice',
          question: 'Calculate the maximum clearance for a ∅50 H8/f7 fit where H8 gives ∅50.000/50.039 and f7 gives ∅49.950/49.975.',
          options: [
            '0.025 mm',
            '0.039 mm',
            '0.089 mm',
            '0.064 mm'
          ],
          correctIndex: 2,
          explanation: 'Maximum clearance = maximum hole size − minimum shaft size = 50.039 − 49.950 = 0.089 mm. This is the loosest possible fit condition. The minimum clearance (allowance) = minimum hole − maximum shaft = 50.000 − 49.975 = 0.025 mm. Since the minimum clearance is positive, this is always a clearance fit. Understanding how to calculate min and max clearance/interference from limit dimensions is fundamental to fit analysis.',
          hint: 'Maximum clearance occurs when the hole is at its largest and the shaft at its smallest.'
        },
        {
          id: 'u9-L1-Q18',
          type: 'fill-blank',
          question: 'A fit where the tolerance zones of the hole and shaft overlap, potentially resulting in either clearance or interference, is called a _____ fit.',
          acceptedAnswers: ['transition', 'Transition'],
          explanation: 'A transition fit has overlapping tolerance zones, meaning the actual outcome depends on where the individual parts fall within their tolerance bands. If the hole happens to be large and the shaft small, there is clearance. If the hole is small and the shaft large, there is interference. Transition fits are used for accurate location without guaranteed interference — for example, locating rings, bearing outer races in housings, and dowel pins in reamed holes.',
          hint: 'This fit type sits between clearance and interference — it could go either way.'
        },
        {
          id: 'u9-L1-Q19',
          type: 'multiple-choice',
          question: 'Why is the H7/H6 hole tolerance more commonly used than custom fundamental deviations (e.g., G7, K7) in everyday engineering practice?',
          options: [
            'H-type holes have zero lower deviation, matching standard reamer and bore tool sizes, which reduces tooling cost and simplifies manufacturing',
            'H-type holes are always more precise than other letter deviations',
            'Non-H holes are not permitted under ASME standards',
            'H holes are only used in metric — imperial systems use different letters'
          ],
          correctIndex: 0,
          explanation: 'Standard reamers, boring bars, and broaches are manufactured to produce H-type holes (zero lower deviation = hole at nominal minimum). Using H holes means off-the-shelf tooling can be used. If a G7 or K7 hole were specified, custom tooling or additional machining steps might be needed to shift the tolerance zone. The fit is then adjusted by selecting the appropriate shaft letter. This is why the hole-basis system with H holes dominates industrial practice — it leverages standardized tooling.',
          hint: 'Think about tooling availability — are reamers made to produce holes at nominal or offset from nominal?'
        },
        {
          id: 'u9-L1-Q20',
          type: 'multiple-choice',
          question: 'An assembly requires a press fit that will transmit 500 Nm of torque through friction alone (no key). How does the required interference relate to the torque capacity?',
          options: [
            'Torque capacity is independent of interference — only surface area matters',
            'Greater interference generates higher contact pressure, which increases the frictional torque capacity (T = μ × p × π × d × L × d/2); the required interference is back-calculated from the contact pressure needed to transmit the specified torque',
            'The interference must be at least 1% of the shaft diameter regardless of torque',
            'Press fits cannot transmit torque — a key or spline is always required'
          ],
          correctIndex: 1,
          explanation: 'The torque transmitted by an interference fit depends on: (1) contact pressure (p), which is a function of interference, material properties, and geometry (thick-walled cylinder theory — Lame equations); (2) coefficient of friction (μ) between the mating surfaces; and (3) contact area (π × d × L). The formula T = μ × p × π × d² × L / 2 allows back-calculation of the minimum interference needed. Factors like surface roughness (affects μ), assembly method (thermal vs. press affects residual stress), and operating temperature (thermal expansion changes interference) must also be considered.',
          hint: 'The friction force depends on normal pressure, which depends on how much the parts are squeezed together.'
        },
        {
          id: 'u9-L1-Q21',
          type: 'true-false',
          question: 'When specifying tolerances, the designer should always use the tightest tolerance achievable by the manufacturing process to maximize quality.',
          correctAnswer: false,
          explanation: 'Over-tolerancing (specifying tolerances tighter than functionally necessary) dramatically increases manufacturing cost, inspection time, and scrap rate without improving product function. Tolerances should be as loose as function permits. The cost-tolerance relationship is roughly exponential — halving a tolerance can increase cost by 3-10x. Proper tolerance specification considers the functional requirement first, then selects the loosest tolerance that satisfies it. This principle is central to Design for Manufacturing (DFM).',
          hint: 'What happens to cost and scrap when you make tolerances tighter than the function requires?'
        },
        {
          id: 'u9-L1-Q22',
          type: 'multiple-choice',
          question: 'A shaft must operate at 300°C in a steel housing that stays at 50°C. The fit is H7/p6 (light interference) at 20°C. What happens to the fit at operating temperature, and how do you address it?',
          options: [
            'Nothing — the fit does not change with temperature since both parts are steel',
            'The shaft expands more than the housing due to the higher temperature, increasing the interference significantly; this must be accounted for by reducing the room-temperature interference or selecting materials with matching thermal expansion',
            'The fit loosens because heat always causes clearance',
            'Temperature effects are negligible for interference fits'
          ],
          correctIndex: 1,
          explanation: 'Differential thermal expansion is critical for interference fits. If both parts are steel (α ≈ 12 × 10⁻⁶/°C) but at different temperatures: shaft expansion = 12e-6 × (300-20) × D and housing expansion = 12e-6 × (50-20) × D. The shaft grows much more, increasing interference. For a ∅50 shaft: additional interference ≈ 12e-6 × 250 × 50 = 0.150 mm — which could cause yielding or housing fracture. Solutions: reduce room-temperature interference, use a housing material with higher α, design stress relief features, or use a slip fit with mechanical locking (key/spline).',
          hint: 'If the shaft is much hotter than the housing, it expands more. What does that do to the interference?'
        },
        {
          id: 'u9-L1-Q23',
          type: 'multiple-choice',
          question: 'What is the difference between "tolerance" and "allowance" in the context of fits?',
          options: [
            'They are synonyms and can be used interchangeably',
            'Tolerance is the total permissible variation in a single part dimension; allowance is the intentional minimum clearance (or maximum interference) between two mating parts',
            'Tolerance applies to holes and allowance applies to shafts',
            'Allowance is always larger than tolerance'
          ],
          correctIndex: 1,
          explanation: 'Tolerance is a single-part concept — the difference between the maximum and minimum limits of a dimension (e.g., a 0.02 mm tolerance band). Allowance is a two-part concept — the tightest fit condition between mating parts. For a clearance fit, allowance = min hole − max shaft (positive value = minimum gap). For an interference fit, allowance = max hole − min shaft (negative value = maximum interference). A common interview mistake is confusing these two terms.',
          hint: 'One describes variation in a single dimension; the other describes the relationship between two mating parts.'
        },
        {
          id: 'u9-L1-Q24',
          type: 'fill-blank',
          question: 'In the ISO system, the letter "H" for a hole indicates that the _____ deviation is zero.',
          acceptedAnswers: ['lower', 'Lower', 'fundamental lower', 'minimum'],
          explanation: 'For an H-type hole, the fundamental (lower) deviation is zero, meaning the minimum hole size equals the basic (nominal) size. The tolerance zone extends above nominal. For example, ∅25 H7 ranges from 25.000 to 25.021 mm. This is the standard hole in the hole-basis fit system. Similarly, for a shaft, the letter "h" means the upper deviation is zero (maximum shaft = nominal), with the tolerance zone extending below nominal.',
          hint: 'The H hole starts at nominal and extends upward — which deviation is zero?'
        },
        {
          id: 'u9-L1-Q25',
          type: 'multiple-choice',
          question: 'Which of the following correctly ranks these manufacturing processes from tightest to loosest typical tolerance capability?',
          options: [
            'Sand casting → milling → grinding → lapping',
            'Lapping → grinding → turning → milling → die casting → sand casting',
            'Milling → grinding → lapping → sand casting',
            'Grinding → lapping → milling → sand casting'
          ],
          correctIndex: 1,
          explanation: 'Typical tolerance capabilities (IT grades): lapping/honing IT4-IT5, grinding IT5-IT7, precision turning/boring IT6-IT8, milling IT7-IT9, drilling IT10-IT12, die casting IT8-IT10, sand casting IT11-IT16. Each process has physical limits due to tool deflection, thermal effects, machine rigidity, and process inherent variability. Matching tolerance specifications to process capability is fundamental to cost-effective design. Specifying tighter tolerances than the process can deliver forces secondary operations or special equipment.',
          hint: 'Think about which processes remove material most precisely and which are inherently rough.'
        },
        {
          id: 'u9-L1-Q26',
          type: 'multiple-choice',
          question: 'A drawing callout shows ∅20 ±0.05 with a note "INTERPRET PER ASME Y14.5-2018." Under Rule #1 (Envelope Principle), what does this imply about the form of the feature?',
          options: [
            'The feature can have any form as long as its two-point measurement is within 19.95–20.05',
            'At MMC (∅20.05 for a shaft), the feature must have perfect form — meaning it must fit within a ∅20.05 boundary with no roundness, straightness, or cylindricity errors; at LMC, form errors up to the full size tolerance are permitted',
            'Form control requires a separate GD&T callout regardless of Rule #1',
            'Rule #1 only applies to angular dimensions, not diameters'
          ],
          correctIndex: 1,
          explanation: 'ASME Y14.5 Rule #1 (the Envelope Principle or Taylor Principle) states that the surface of a regular feature of size at MMC must not extend beyond the envelope of perfect form at MMC. For an external feature (shaft): at its maximum size (20.05), the feature must be perfectly round, straight, and cylindrical. As the feature departs from MMC toward LMC (smaller shaft), form error is permitted up to the departure amount. This provides an inherent form control without requiring separate form tolerances. ISO does not apply this rule by default — it requires a circled E symbol to invoke it.',
          hint: 'ASME Rule #1 ties form control to the MMC size of a feature of size.'
        },
        {
          id: 'u9-L1-Q27',
          type: 'true-false',
          question: 'The ISO default for regular features of size is the Envelope Principle (perfect form at MMC), the same as ASME Y14.5 Rule #1.',
          correctAnswer: false,
          explanation: 'This is a key difference between ASME and ISO standards. ASME Y14.5 applies the Envelope Principle (Rule #1) by default to all regular features of size. ISO 8015, however, defaults to the "independency principle" where size and form are independent — size tolerance does not control form. To invoke the envelope principle in ISO, the designer must add the circled E symbol after the size tolerance. This difference can cause significant problems when drawings created under one standard are manufactured under the other.',
          hint: 'ASME and ISO have different default rules for the relationship between size and form.'
        },
        {
          id: 'u9-L1-Q28',
          type: 'multiple-choice',
          question: 'A general tolerance block on a drawing states "ISO 2768-mK." What does this mean?',
          options: [
            'The material is specified as grade mK steel',
            '"m" specifies the general dimensional tolerance class (medium) and "K" specifies the general geometric tolerance class (medium); these defaults apply to all features without individual tolerance callouts',
            'The measurement unit is millimeters with Kelvin for temperature',
            'The drawing scale is medium (m) and the projection angle is K'
          ],
          correctIndex: 1,
          explanation: 'ISO 2768 provides default ("general") tolerances for dimensions and geometries that do not have individual callouts. Part 1 defines four classes for dimensional tolerances: f (fine), m (medium), c (coarse), v (very coarse). Part 2 defines three classes for geometric tolerances: H, K, L. "mK" means medium-precision dimensional defaults and medium-precision geometric defaults. This avoids cluttering drawings with individual tolerances on every non-critical dimension. Any feature requiring tighter control than the general tolerance must have an explicit callout.',
          hint: 'ISO 2768 has two parts — one for dimensional tolerances (letters f/m/c/v) and one for geometric tolerances (H/K/L).'
        },
        {
          id: 'u9-L1-Q29',
          type: 'multiple-choice',
          question: 'A design requires a ∅12 mm precision dowel pin in a reamed hole for accurate part location. The pin must be easy to push in by hand but have negligible clearance. Which fit is most appropriate?',
          options: [
            'H7/s6 — heavy press fit for maximum holding force',
            'H7/h6 — sliding fit with very small clearance allowing hand insertion with minimal play',
            'H11/c11 — extra-loose running fit for easy assembly',
            'H7/p6 — light press fit requiring an arbor press'
          ],
          correctIndex: 1,
          explanation: 'H7/h6 is a precision sliding fit (also called a "push fit" or "snug fit") that allows hand insertion with very little clearance. For ∅12 mm: H7 gives a hole of 12.000 to 12.018 mm, and h6 gives a pin of 11.989 to 12.000 mm. The minimum clearance is 0.000 mm and maximum clearance is 0.029 mm. This allows easy assembly while maintaining accurate location. The dowel resists shear loads from assembly misalignment, while the hole-pin fit provides centering. If the dowel needs to resist pullout, a light press fit (H7/n6 or H7/p6) would be used instead.',
          hint: 'You want minimal play but hand-insertable — look for a fit at the boundary between clearance and transition.'
        },
        {
          id: 'u9-L1-Q30',
          type: 'fill-blank',
          question: 'When both the upper and lower deviations of a tolerance are on the same side of the nominal dimension (e.g., +0.00/+0.05), this is called _____ tolerancing.',
          acceptedAnswers: ['unilateral', 'Unilateral'],
          explanation: 'Unilateral tolerancing places both deviations on one side of nominal — either both positive (e.g., +0.00/+0.05) or both negative (e.g., −0.05/−0.00). This is common in fit systems: H-type holes have unilateral positive deviations, and h-type shafts have unilateral negative deviations. Unilateral tolerancing simplifies manufacturing because the machinist aims for the nominal and only needs to worry about deviation in one direction. Bilateral tolerancing has deviations on both sides of nominal.',
          hint: 'Both deviations are on one side — above or below nominal, not split across.'
        }
      ]
    },
    {
      id: 'u9-L2',
      title: 'Geometric Tolerancing',
      description: 'Form (flatness, cylindricity, circularity, straightness), orientation (perpendicularity, angularity, parallelism), MMC/LMC, bonus tolerance.',
      icon: '🔷',
      xpReward: 25,
      questions: [
        {
          id: 'u9-L2-Q1',
          type: 'multiple-choice',
          question: 'Why is position tolerance almost always applied at MMC rather than RFS for clearance-hole bolt patterns?',
          options: [
            'MMC is simply the default — there is no functional reason to prefer it over RFS',
            'Because at MMC the holes are smallest and shafts largest (tightest fit), so if position is controlled at that worst case the assembly is guaranteed; bonus tolerance as features depart from MMC reduces scrap without sacrificing function',
            'RFS is actually preferred but MMC is cheaper to inspect',
            'MMC only applies to shafts, not holes, so it is used for the bolt side only'
          ],
          correctIndex: 1,
          explanation: 'The functional requirement for a bolt pattern is that the bolts pass through the holes. The worst case for assembly is when holes are at their smallest (MMC) and bolts at their largest (MMC) — that is when positional error matters most. If a hole is produced larger than MMC, there is extra clearance, so additional positional error can be tolerated without affecting assembly. This "bonus tolerance" reduces rejection rates and manufacturing cost without any risk to function. RFS (Regardless of Feature Size) provides no bonus tolerance and is used when position must be controlled independent of size — typically for press-fit or precision alignment features.',
          hint: 'Think about when assembly fit is tightest and when extra positional error can be tolerated.'
        },
        {
          id: 'u9-L2-Q2',
          type: 'multiple-choice',
          question: 'A junior engineer\'s drawing shows flatness applied to a cylindrical bore surface. What is wrong with this callout, and what should they use instead?',
          options: [
            'Nothing is wrong — flatness can apply to any surface',
            'Flatness only applies to planar surfaces; for a cylindrical bore, they should use cylindricity (to control the overall form) or circularity (to control individual cross-sections)',
            'They should use straightness instead of flatness since the bore is long',
            'The issue is that flatness needs a datum reference and they forgot to add one'
          ],
          correctIndex: 1,
          explanation: 'Flatness is a form tolerance that applies only to nominally flat (planar) surfaces — the tolerance zone is two parallel planes. Applying it to a curved surface is meaningless per ASME Y14.5 / ISO 1101. For a cylindrical bore: cylindricity controls the entire surface (zone between two coaxial cylinders), circularity controls individual cross-sections (zone between two concentric circles), and straightness can control line elements along the axis. The choice depends on what functional requirement drives the control. Flatness also never requires a datum reference — it is a self-referencing form control.',
          hint: 'Consider which geometric surfaces each form tolerance is defined for.'
        },
        {
          id: 'u9-L2-Q3',
          type: 'multiple-choice',
          question: 'When would you specify a profile of a surface tolerance instead of combining individual form and orientation tolerances?',
          options: [
            'Profile tolerance is only used for aesthetic surfaces where appearance matters',
            'When you need to control the shape, orientation, and location of a complex or freeform surface simultaneously with a single callout, rather than stacking multiple individual tolerances',
            'Profile is always preferred because it is simpler to inspect than other tolerances',
            'Only when the surface is flat — profile cannot be applied to curved surfaces'
          ],
          correctIndex: 1,
          explanation: 'Profile of a surface is the most versatile GD&T tolerance — it controls form, orientation, size, and location simultaneously relative to datums. It is ideal for: complex contoured surfaces (airfoils, cam profiles, injection-molded shapes) where individual form/orientation callouts would be impractical; surfaces where the CAD model defines the true profile; and situations where you want one tolerance to control everything about the surface. Without datum references, profile controls only form. With datums, it controls orientation and/or location as well. Using individual tolerances (flatness + perpendicularity + position) can lead to tolerance stacking and ambiguity that a single profile callout avoids.',
          hint: 'Think about complex surfaces where multiple geometric controls would be needed — is there a single tolerance that handles all of them?'
        },
        {
          id: 'u9-L2-Q4',
          type: 'multiple-choice',
          question: 'Parts are passing CMM inspection for position tolerance but consistently failing during assembly. What are the most likely causes?',
          options: [
            'The parts are defective — CMM results must be wrong',
            'The CMM datum setup does not replicate the actual assembly datum contacts (different datum features, wrong datum precedence, or point-contact vs. surface-contact differences), causing the measurement to pass on a different coordinate system than the assembly uses',
            'Position tolerance is not relevant to assembly — only size matters',
            'The CMM is measuring in metric but the assembly is designed in imperial units'
          ],
          correctIndex: 1,
          explanation: 'This is one of the most common GD&T problems in manufacturing. If the CMM datum alignment differs from the physical assembly datum contact, the coordinate systems diverge, and a part that "passes" on the CMM may be out of tolerance in the actual assembly. Common specific causes: CMM uses best-fit alignment instead of 3-2-1 datum simulation; CMM contacts different points on the datum feature than the assembly fixture; datum precedence (A|B|C order) does not match assembly; or the CMM ignores material condition modifiers. The fix: ensure the CMM program\'s datum alignment replicates the physical assembly interface exactly.',
          hint: 'If inspection says "pass" but reality says "fail," the measurement might not be testing what the assembly actually needs.'
        },
        {
          id: 'u9-L2-Q5',
          type: 'multiple-choice',
          question: 'When should the LMC (Least Material Condition) modifier be used instead of MMC?',
          options: [
            'When maximizing assembly clearance is the primary concern',
            'When controlling minimum wall thickness between features (e.g., a hole near an edge)',
            'When reducing manufacturing cost is the main goal',
            'When the feature is a shaft rather than a hole'
          ],
          correctIndex: 1,
          explanation: 'LMC is used when the critical concern is minimum wall thickness or minimum remaining material — for example, a hole close to an edge, or a bore close to an outer diameter. At LMC, the feature has the least material (largest hole or smallest shaft), meaning the wall is thinnest. The LMC modifier gives bonus tolerance as the feature departs from LMC toward MMC, where there is more wall material. This is less common than MMC but critical for structural integrity and minimum material checks.',
          hint: 'Think about when having less material is the dangerous condition — thin walls near edges.'
        },
        {
          id: 'u9-L2-Q6',
          type: 'fill-blank',
          question: 'The condition where a feature of size contains the maximum amount of material (smallest hole, largest shaft) is called ___.',
          acceptedAnswers: ['MMC', 'mmc', 'Maximum Material Condition', 'maximum material condition'],
          explanation: 'Maximum Material Condition (MMC) is when a feature has the most material: smallest hole or largest shaft. It represents the tightest fit condition between mating parts. The MMC modifier (circled M) is used with geometric tolerances to allow bonus tolerance as the feature departs from MMC. This is based on the principle that if a hole is larger than its MMC, it can tolerate more positional error and still assemble with the mating shaft.',
          hint: 'This condition represents the most material everywhere — tightest fit for mating parts.'
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
          explanation: 'ASME Y14.5 defines five categories: (1) Form — flatness, straightness, circularity, cylindricity; (2) Orientation — perpendicularity, parallelism, angularity; (3) Location — position, concentricity, symmetry; (4) Profile — profile of a line, profile of a surface; (5) Runout — circular runout, total runout. Form tolerances never use datum references (they are self-referencing). Orientation and location tolerances always require datum references. Profile and runout may or may not use datums depending on the application.',
          hint: 'Think of the five groups that contain the 14 geometric tolerance symbols.'
        },
        {
          id: 'u9-L2-Q8',
          type: 'multiple-choice',
          question: 'What is the difference between circularity and cylindricity?',
          options: [
            'They are the same tolerance applied in different units',
            'Circularity controls the roundness of individual cross-sections (2D), while cylindricity controls the entire cylindrical surface simultaneously (3D), including roundness, straightness, and taper',
            'Circularity applies to internal features and cylindricity to external features',
            'Cylindricity is always tighter than circularity'
          ],
          correctIndex: 1,
          explanation: 'Circularity (roundness) applies to individual cross-sections perpendicular to the axis — the tolerance zone is two concentric circles. It controls lobing, ovality, and out-of-round conditions at each slice, but does not control how the slices relate to each other along the axis. Cylindricity controls the entire surface simultaneously — the tolerance zone is two coaxial cylinders. It captures roundness errors at every cross-section plus straightness, taper, and barrel/hourglass shapes. Cylindricity is a more comprehensive (and harder to achieve) control. A feature can pass circularity at every cross-section but fail cylindricity if the axis is bent.',
          hint: 'One is a 2D slice control, the other is a full 3D surface control.'
        },
        {
          id: 'u9-L2-Q9',
          type: 'multiple-choice',
          question: 'A feature control frame reads: ⌖ | ∅0.25 Ⓜ | A | B | C. The hole has a size tolerance of ∅10.0-10.5. What is the total positional tolerance allowed when the hole is produced at ∅10.3?',
          options: [
            '∅0.25 — the tolerance is fixed regardless of actual size',
            '∅0.55 — the stated tolerance (0.25) plus the departure from MMC (10.3 − 10.0 = 0.30)',
            '∅0.30 — only the bonus tolerance applies',
            '∅0.50 — twice the stated tolerance'
          ],
          correctIndex: 1,
          explanation: 'With the MMC modifier, bonus tolerance = actual size − MMC size. The hole MMC is ∅10.0 (smallest hole = most material). At ∅10.3: bonus = 10.3 − 10.0 = 0.30. Total positional tolerance = stated tolerance + bonus = 0.25 + 0.30 = ∅0.55. This means the hole axis can deviate up to 0.275 mm from true position in any direction. At MMC (∅10.0), only the stated ∅0.25 applies. At LMC (∅10.5), the maximum total is 0.25 + 0.50 = ∅0.75. This bonus tolerance concept is one of the most frequently tested GD&T topics in interviews.',
          hint: 'Bonus = departure from MMC. Total tolerance = stated + bonus.'
        },
        {
          id: 'u9-L2-Q10',
          type: 'true-false',
          question: 'Form tolerances (flatness, straightness, circularity, cylindricity) require datum references in the feature control frame.',
          correctAnswer: false,
          explanation: 'Form tolerances are self-referencing — they control the shape of a feature relative to itself, not to any external datum. The tolerance zone for flatness is two parallel planes; for straightness, two parallel lines; for circularity, two concentric circles; for cylindricity, two coaxial cylinders. No datum is needed because the zone is fitted to the feature itself. If you see a datum reference in a flatness or circularity callout, it is an error. Orientation tolerances (perpendicularity, parallelism, angularity) always require datums because they define the feature\'s relationship to another feature.',
          hint: 'Form tolerances measure a feature against its own ideal shape — do they need an external reference?'
        },
        {
          id: 'u9-L2-Q11',
          type: 'multiple-choice',
          question: 'What is the difference between circular runout and total runout?',
          options: [
            'Circular runout applies to round features and total runout applies to flat features',
            'Circular runout measures individual cross-sections (one at a time) as the part rotates about the datum axis, while total runout measures the entire surface simultaneously, capturing wobble, taper, concentricity, and profile errors',
            'Total runout is always twice the circular runout value',
            'They are measured with different instruments but control the same characteristic'
          ],
          correctIndex: 1,
          explanation: 'Circular runout (single arrow symbol) controls the full indicator movement (FIM) at each individual cross-section independently as the part rotates 360° about the datum axis. It catches eccentricity and out-of-round errors at each slice but not taper or profile along the axis. Total runout (double arrow symbol) controls the entire surface simultaneously — the indicator sweeps along the full surface as the part rotates. It captures eccentricity, out-of-round, taper, waviness, and any other surface variation. Total runout is always equal to or tighter than circular runout for the same feature.',
          hint: 'One checks cross-section by cross-section; the other checks the entire surface as a whole.'
        },
        {
          id: 'u9-L2-Q12',
          type: 'multiple-choice',
          question: 'A perpendicularity tolerance of 0.05 is applied to a flat surface relative to datum A. What is the shape of the tolerance zone?',
          options: [
            'A cylinder of ∅0.05 around the surface normal',
            'Two parallel planes 0.05 apart that are exactly perpendicular to datum A — the entire controlled surface must lie between them',
            'A single plane exactly 0.05 from datum A',
            'A square zone 0.05 × 0.05'
          ],
          correctIndex: 1,
          explanation: 'When perpendicularity is applied to a surface (not preceded by a diameter symbol), the tolerance zone is two parallel planes 0.05 mm apart, oriented exactly 90° to datum A. Every point on the controlled surface must lie between these two planes. If perpendicularity were applied to an axis (with the ∅ symbol), the zone would be a cylinder of ∅0.05 perpendicular to datum A, within which the feature axis must lie. The zone shape depends on whether the tolerance controls a surface or an axis/center plane.',
          hint: 'For a surface control, the zone is two parallel planes. For an axis control, it is a cylinder.'
        },
        {
          id: 'u9-L2-Q13',
          type: 'multiple-choice',
          question: 'What is the "virtual condition" of an external feature (shaft) specified at ∅20.0 ± 0.1 with a perpendicularity tolerance of ∅0.05 at MMC?',
          options: [
            '∅20.00 — just the nominal size',
            '∅20.15 — MMC size (20.1) plus the geometric tolerance (0.05), representing the worst-case boundary for mating',
            '∅20.10 — just the MMC size',
            '∅20.05 — nominal plus geometric tolerance'
          ],
          correctIndex: 1,
          explanation: 'Virtual condition is the worst-case boundary that a feature can occupy, considering both its size and geometric tolerance. For an external feature at MMC: VC = MMC size + geometric tolerance = 20.1 + 0.05 = ∅20.15. This is the smallest hole that would always accept the shaft regardless of its perpendicularity error. For an internal feature at MMC: VC = MMC size − geometric tolerance. Virtual condition is fundamental for functional gauge design — a go gauge for this shaft would have a ∅20.15 bore.',
          hint: 'The worst-case boundary for an external feature = largest size + geometric error.'
        },
        {
          id: 'u9-L2-Q14',
          type: 'true-false',
          question: 'Straightness applied to the axis of a cylindrical feature (using the ∅ modifier) allows the feature to violate Rule #1 (the envelope principle) — meaning the actual local sizes can exceed the MMC boundary.',
          correctAnswer: true,
          explanation: 'This is one of the important exceptions to Rule #1. When straightness is applied to the derived median line (axis) of a feature with a ∅ modifier, the feature is controlled by its virtual condition boundary rather than the perfect form at MMC boundary. This means that while each cross-section must still be within the size tolerance, the overall feature can bow or bend, causing parts of the surface to extend beyond the MMC envelope. The virtual condition = MMC + straightness tolerance becomes the actual boundary. This is used for features like long pins where some bowing is acceptable.',
          hint: 'Axis straightness with ∅ creates a virtual condition boundary that is larger than the MMC envelope.'
        },
        {
          id: 'u9-L2-Q15',
          type: 'multiple-choice',
          question: 'What is the key difference between concentricity and position (at RFS) for controlling coaxiality of two diameters?',
          options: [
            'They produce identical results and are interchangeable',
            'Concentricity controls the median points (derived median line) of the feature relative to the datum axis and is very expensive to inspect; position controls the axis of the actual mating envelope, making it easier to inspect and functionally equivalent in most cases',
            'Position is less accurate than concentricity',
            'Concentricity can use material condition modifiers but position cannot'
          ],
          correctIndex: 1,
          explanation: 'Concentricity requires establishing the derived median line — the locus of midpoints of all diametrically opposed surface points — which requires many measurement points and complex calculations. Position (at RFS) controls the axis of the unrelated actual mating envelope (smallest circumscribed cylinder for external, largest inscribed cylinder for internal), which is straightforward to measure on a CMM. ASME Y14.5-2018 removed concentricity (and symmetry) as separate symbols because position achieves the functional intent in nearly all cases with simpler inspection. In interviews, understanding why concentricity was deprecated demonstrates advanced GD&T knowledge.',
          hint: 'One requires median-point analysis (expensive); the other controls the mating envelope axis (practical).'
        },
        {
          id: 'u9-L2-Q16',
          type: 'multiple-choice',
          question: 'An angularity tolerance of 0.1 is applied to a surface at 45° to datum A. What does this control?',
          options: [
            'The surface must be at exactly 45° ± 0.1° to datum A',
            'The surface must lie between two parallel planes 0.1 apart, oriented at exactly 45° to datum A — it controls the orientation but NOT the angle itself (the basic 45° angle is exact)',
            'The feature must be within a cylindrical zone of ∅0.1',
            'The surface must be flat within 0.1'
          ],
          correctIndex: 1,
          explanation: 'Angularity is an orientation tolerance, not an angular dimension tolerance. The basic angle (45°) is theoretically exact (no tolerance on the angle itself). Angularity then controls how well the surface achieves that exact orientation — the entire surface must lie between two parallel planes 0.1 apart, inclined at exactly 45° to datum A. This is fundamentally different from an angular dimension tolerance (e.g., 45° ± 1°), which allows the angle to vary but does not control surface form within the zone. Angularity controls both the angle and the flatness of the surface simultaneously.',
          hint: 'The basic angle is theoretically exact. Angularity controls how close the surface is to that exact orientation.'
        },
        {
          id: 'u9-L2-Q17',
          type: 'multiple-choice',
          question: 'What is the "bonus tolerance" in GD&T, and when does it apply?',
          options: [
            'An extra tolerance given to preferred suppliers',
            'Additional positional or orientation tolerance gained when a feature\'s actual size departs from the specified material condition (MMC or LMC); it equals the amount of departure and only applies when a material condition modifier is specified',
            'A tolerance added by the inspector when parts are borderline',
            'The difference between the drawing tolerance and the general tolerance block'
          ],
          correctIndex: 1,
          explanation: 'Bonus tolerance is the additional geometric tolerance gained as a feature of size departs from the specified material condition. With MMC modifier: bonus = actual size − MMC (for internal features) or MMC − actual size (for external features). The principle: if a hole is larger than its MMC, there is more room for the bolt, so more positional error is acceptable. Bonus tolerance only exists when a material condition modifier (circled M or circled L) is in the feature control frame. At RFS (default in ASME Y14.5-2018), no bonus applies — the tolerance is fixed regardless of actual size.',
          hint: 'When a hole is larger than its minimum, does it need to be positioned as precisely?'
        },
        {
          id: 'u9-L2-Q18',
          type: 'fill-blank',
          question: 'The geometric tolerance that controls the overall 3D form of a cylindrical surface — combining roundness, straightness, and taper control — is called _____.',
          acceptedAnswers: ['cylindricity', 'Cylindricity'],
          explanation: 'Cylindricity is the most comprehensive form tolerance for cylindrical features. Its tolerance zone is two coaxial cylinders — every point on the feature surface must lie between them. It simultaneously controls roundness (at every cross-section), straightness (of every line element), and taper (variation of diameter along the length). It is harder to achieve and more expensive to inspect than circularity or straightness alone. It is used when the full 3D form of the cylinder is critical, such as bearing journals, hydraulic cylinder bores, and precision shafts.',
          hint: 'This form tolerance captures every possible shape error on a cylindrical surface in one callout.'
        },
        {
          id: 'u9-L2-Q19',
          type: 'multiple-choice',
          question: 'A designer applies a parallelism tolerance of 0.02 to a surface. Must the surface also be flat within 0.02?',
          options: [
            'No — parallelism and flatness are independent; the surface could have 0.10 flatness error',
            'Yes — orientation tolerances (parallelism, perpendicularity, angularity) inherently control form; the surface must lie within the 0.02 zone, which also constrains flatness to 0.02 or better',
            'Only if a separate flatness callout is also applied',
            'Parallelism does not apply to surfaces, only to axes'
          ],
          correctIndex: 1,
          explanation: 'Orientation tolerances inherently refine form. If a surface must lie between two parallel planes 0.02 apart (the parallelism zone), then by definition it cannot have flatness error greater than 0.02. This means a separate flatness tolerance is only needed if it must be tighter than the parallelism tolerance. Similarly, a position tolerance inherently controls orientation, which in turn controls form. This hierarchy — position refines orientation, orientation refines form — is a fundamental GD&T principle. Specifying flatness equal to or looser than parallelism is redundant.',
          hint: 'If a surface is constrained between two planes 0.02 apart, can it be less flat than 0.02?'
        },
        {
          id: 'u9-L2-Q20',
          type: 'true-false',
          question: 'Position tolerance in ASME Y14.5 always requires at least one datum reference in the feature control frame.',
          correctAnswer: true,
          explanation: 'Position tolerance defines where a feature is located relative to other features — this inherently requires a reference frame. Without datums, "position" has no meaning because there is nothing to measure the location from. The feature control frame for position must include at least one datum (and typically two or three to fully constrain the reference frame). This distinguishes position from form tolerances, which are self-referencing and never use datums. A common drawing error is omitting datums from a position callout.',
          hint: 'Position means "where relative to something." What defines that something?'
        },
        {
          id: 'u9-L2-Q21',
          type: 'multiple-choice',
          question: 'What is the fixed fastener formula for calculating the required positional tolerance for a clearance hole pattern?',
          options: [
            'T = hole size × bolt size',
            'T = (MMC hole size − MMC fastener size) / 2, applied equally to each part, where T is the positional tolerance diameter for each part',
            'T = hole size + bolt size',
            'T = MMC hole size − LMC bolt size'
          ],
          correctIndex: 1,
          explanation: 'For the fixed fastener case (bolt is threaded into one part, passes through a clearance hole in the other), each part gets half the available clearance as positional tolerance: T = (H_MMC − F_MMC) / 2, where H_MMC is the MMC hole diameter and F_MMC is the MMC fastener diameter. For the floating fastener case (bolt passes through clearance holes in both parts), the full clearance is available: T = H_MMC − F_MMC. These formulas assume the fastener/threaded hole has zero positional tolerance allocated to it. If the threaded hole also has a positional tolerance, it must be subtracted.',
          hint: 'In the fixed case, one part has the threaded hole (projected tolerance zone), and the other has the clearance hole.'
        },
        {
          id: 'u9-L2-Q22',
          type: 'multiple-choice',
          question: 'A feature control frame shows a composite position tolerance: the upper segment is |⌖|∅0.50 Ⓜ|A|B|C| and the lower segment is |⌖|∅0.15 Ⓜ|A|. What does the lower segment control?',
          options: [
            'The same thing as the upper segment but with a tighter tolerance',
            'The lower segment (FRTZF — Feature Relating Tolerance Zone Framework) controls the pattern-to-pattern relationship (orientation to datum A only), while the upper segment (PLTZF) controls the pattern location relative to all datums A, B, C',
            'The lower segment applies only to the smallest hole in the pattern',
            'The lower segment overrides the upper segment entirely'
          ],
          correctIndex: 1,
          explanation: 'Composite position tolerance has two levels: the upper segment (PLTZF — Pattern Locating Tolerance Zone Framework) locates the entire pattern relative to the specified datums (A, B, C). The lower segment (FRTZF — Feature Relating Tolerance Zone Framework) controls the feature-to-feature relationship within the pattern, referenced only to the datums shown in that segment (datum A for orientation). This allows a larger tolerance for where the pattern is located overall, while maintaining a tighter tolerance for the hole-to-hole spacing and orientation. This is very common for bolt patterns where exact pattern location is less critical than hole-to-hole accuracy.',
          hint: 'Two levels: one for where the whole pattern sits, one for how the features relate to each other within the pattern.'
        },
        {
          id: 'u9-L2-Q23',
          type: 'true-false',
          question: 'A flatness tolerance of 0.01 mm can be larger than the size tolerance on the same feature under ASME Y14.5 Rule #1.',
          correctAnswer: false,
          explanation: 'Under Rule #1 (the Envelope Principle), the feature must have perfect form at MMC. This means the flatness error is inherently limited by the size tolerance — as the feature departs from MMC, the allowable form error equals the size departure. If the total size tolerance is, say, 0.02 mm, the maximum flatness error is 0.02 mm (at LMC). Therefore, specifying a flatness tolerance larger than the size tolerance is meaningless under Rule #1 because the size tolerance already provides a tighter form constraint. The flatness callout should be equal to or smaller than the size tolerance to be effective.',
          hint: 'Rule #1 already limits form error to the amount of size departure from MMC.'
        },
        {
          id: 'u9-L2-Q24',
          type: 'multiple-choice',
          question: 'What is the projected tolerance zone, and when is it used?',
          options: [
            'A tolerance zone that extends beyond the feature into the mating part space, used for threaded/press-fit holes where the fastener\'s angular error in the hole causes interference at the mating part interface',
            'A tolerance zone that applies only in projected (2D) views',
            'A zone projected onto the datum plane for measurement convenience',
            'An enlarged tolerance zone used for prototype parts'
          ],
          correctIndex: 0,
          explanation: 'A projected tolerance zone (indicated by circled P in the feature control frame) extends from the feature surface into the mating part space for a specified height. It is used primarily for threaded and press-fit holes in the fixed-fastener case. The problem it solves: if a tapped hole is tilted, the bolt follows the tilt and may interfere with the clearance hole in the mating part. Controlling position only at the hole surface does not capture this tilt effect. The projected zone ensures that the fastener axis, when extended into the mating space, stays within the tolerance cylinder. The projection height equals the mating part thickness plus any washers.',
          hint: 'Think about what happens when a bolt in a tilted tapped hole extends into the space where the mating part sits.'
        },
        {
          id: 'u9-L2-Q25',
          type: 'multiple-choice',
          question: 'A surface has both a flatness tolerance of 0.01 and a parallelism tolerance of 0.05 to datum A. Is this a valid callout?',
          options: [
            'Yes — the flatness refines the form within the larger parallelism zone; the surface must be flat within 0.01 but can tilt up to 0.05 from parallel to datum A',
            'No — flatness must always be larger than parallelism',
            'No — you cannot apply both flatness and parallelism to the same surface',
            'Yes, but the flatness overrides the parallelism, making the 0.05 meaningless'
          ],
          correctIndex: 0,
          explanation: 'This is a valid and common callout. The parallelism tolerance (0.05) defines a zone within which the surface must lie, controlling both its orientation and its form to 0.05. The flatness tolerance (0.01) further refines the form — the surface must be flat within 0.01 even though it can "float" within the larger parallelism zone. Think of it as a thin (0.01) zone that can tilt and translate within the thicker (0.05) zone. If flatness were specified at 0.05 or larger, it would be redundant because parallelism already constrains form to 0.05.',
          hint: 'A form tolerance tighter than the orientation tolerance provides additional refinement — is that useful?'
        },
        {
          id: 'u9-L2-Q26',
          type: 'fill-blank',
          question: 'In ASME Y14.5-2018, the default material condition modifier for geometric tolerances applied to features of size is _____ (meaning the tolerance applies at any produced size).',
          acceptedAnswers: ['RFS', 'rfs', 'Regardless of Feature Size', 'regardless of feature size'],
          explanation: 'In ASME Y14.5-2018 (and the 2009 edition), RFS (Regardless of Feature Size) is the default — no symbol is needed in the feature control frame. This means the geometric tolerance applies at the stated value regardless of where the actual feature size falls within its size tolerance. No bonus tolerance is available. To invoke MMC or LMC, the modifier (circled M or circled L) must be explicitly stated. In the older 1982 standard, MMC was the default for certain applications, which is a source of confusion on legacy drawings.',
          hint: 'If no modifier symbol appears in the feature control frame, what is assumed?'
        },
        {
          id: 'u9-L2-Q27',
          type: 'multiple-choice',
          question: 'You need to control the wobble of a turned flange face relative to the shaft axis. Which geometric tolerance is most appropriate?',
          options: [
            'Flatness — to ensure the face is flat',
            'Circular runout — to control the face wobble (axial FIM) as the part rotates about the datum axis',
            'Parallelism — to ensure the face is parallel to a reference',
            'Straightness — to control line elements on the face'
          ],
          correctIndex: 1,
          explanation: 'Circular runout applied to a face perpendicular to the datum axis controls "wobble" — the axial full indicator movement (FIM) at each radial position as the part rotates 360°. This simultaneously captures perpendicularity and flatness errors relative to the rotation axis. It is measured simply by placing an indicator on the face and rotating the part about the datum axis. Flatness alone would not reference the axis, and perpendicularity would not capture circular form errors. If total surface control (including axial profile) is needed, total runout would be used instead.',
          hint: 'Wobble is detected by rotating the part about its axis and reading an indicator on the face.'
        },
        {
          id: 'u9-L2-Q28',
          type: 'multiple-choice',
          question: 'What is the "zero tolerance at MMC" concept, and what advantage does it offer?',
          options: [
            'It means no tolerance is applied — the feature is free-form',
            'The stated geometric tolerance is zero at MMC, and all positional tolerance comes from bonus as the feature departs from MMC; this maximizes the available size tolerance and makes inspection a simple go/no-go functional gauge check at the virtual condition boundary',
            'It means the feature must be exactly at MMC with no size variation',
            'Zero tolerance at MMC is not a valid GD&T concept'
          ],
          correctIndex: 1,
          explanation: 'With zero positional tolerance at MMC, the feature has no positional tolerance at its MMC size — it must be perfectly located. As the feature departs from MMC, it gains bonus tolerance equal to the departure. The virtual condition equals the MMC size. This approach: (1) maximizes the usable size tolerance range, (2) makes functional gauge design simple — the gauge is just the virtual condition boundary, and (3) reduces scrap by giving maximum bonus. For example, a hole at ∅10.0-10.5 with zero position at MMC means any hole within size limits that passes a ∅10.0 functional gauge pin is acceptable. This is the most cost-effective approach for clearance-hole applications.',
          hint: 'If the geometric tolerance is zero at MMC, where does all the positional tolerance come from?'
        },
        {
          id: 'u9-L2-Q29',
          type: 'true-false',
          question: 'Profile of a line and profile of a surface are functionally identical — they control the same thing.',
          correctAnswer: false,
          explanation: 'Profile of a line controls the profile at individual cross-sections (2D slices) independently — each section must lie within the zone, but sections do not relate to each other. Profile of a surface controls the entire 3D surface simultaneously — every point on the surface must fall within the tolerance zone. This is analogous to the circularity vs. cylindricity distinction. Profile of a line is appropriate when the cross-sectional shape matters but variation along the length is acceptable (e.g., an extrusion that can twist slightly). Profile of a surface is used when the complete 3D form must be controlled.',
          hint: 'Similar to circularity vs. cylindricity — one is 2D slices, the other is the full 3D surface.'
        },
        {
          id: 'u9-L2-Q30',
          type: 'multiple-choice',
          question: 'A feature control frame shows position tolerance with three datums: |⌖|∅0.25 Ⓜ|A|B Ⓜ|C Ⓜ|. What does the MMC modifier on datums B and C mean?',
          options: [
            'It means the datums must be inspected at their MMC size',
            'When datum features B and C depart from their MMC size, the datum reference frame is allowed to shift, providing additional positional tolerance beyond the bonus from the controlled feature — this is called "datum shift" or "datum feature material condition modifier"',
            'It means the tolerance only applies when datums B and C are at MMC',
            'The modifier on datums is ignored — it only matters on the tolerance value'
          ],
          correctIndex: 1,
          explanation: 'When a datum feature of size (like a bore or pin) is referenced at MMC, the datum simulator is fixed at the datum\'s virtual condition boundary. If the actual datum feature departs from MMC (e.g., a datum bore is larger than its MMC), there is play between the part and the datum simulator, allowing the datum reference frame to shift. This shift provides additional tolerance for the controlled features. The total available tolerance = stated tolerance + bonus from controlled feature departure + datum shift from each applicable datum. Datum shift is powerful for maximizing assembly acceptance rates.',
          hint: 'If the datum feature is larger/smaller than its MMC, does the part have some play on the datum simulator?'
        }
      ]
    },
    {
      id: 'u9-L3',
      title: 'Datum Systems',
      description: 'Datum features, datum reference frame, primary/secondary/tertiary datums, datum targets, fixturing.',
      icon: '📌',
      xpReward: 25,
      questions: [
        {
          id: 'u9-L3-Q1',
          type: 'multiple-choice',
          question: 'A new engineer asks you: "Why does it matter which datum I call primary vs. secondary? Can\'t I just pick any three surfaces?" How do you explain the significance of datum precedence?',
          options: [
            'It does not matter — datum letters are just labels and any order works the same',
            'Datum precedence determines which surface is constrained first (most tightly) and controls the most degrees of freedom; changing the order changes the coordinate system and can cause different measurement results on the same part',
            'The order only matters for CMM programming, not for the actual part function',
            'Primary datum must always be the largest surface, secondary the next largest, and tertiary the smallest'
          ],
          correctIndex: 1,
          explanation: 'The primary datum constrains 3 DOF and is contacted first (the part "sits" on it fully). The secondary constrains 2 more DOF, and the tertiary constrains the last 1. If you swap primary and secondary, the part orients differently — features that were in-tolerance may become out-of-tolerance and vice versa. The correct datum precedence mirrors how the part is located in the actual assembly. For example, if a flange face seats against a mating surface first, then a bore centers the part, then a pin locks rotation — that is the A-B-C order. Reversing this misaligns the inspection coordinate system with the assembly reality.',
          hint: 'Think about what changes physically when a part contacts datum A first vs. datum B first.'
        },
        {
          id: 'u9-L3-Q2',
          type: 'multiple-choice',
          question: 'When selecting datum features for a machined part, which principle should guide the selection?',
          options: [
            'Always select the smallest features as datums',
            'Select functional surfaces — datums should represent how the part is assembled, located, or constrained in service',
            'Always use three mutually perpendicular flat surfaces',
            'Select the features with the tightest tolerances as datums'
          ],
          correctIndex: 1,
          explanation: 'Datum selection should follow the functional principle: datums should represent the surfaces that locate and constrain the part in its assembly. This ensures that manufacturing measurements reflect the actual assembly conditions. For example, if a bearing bore locates the part in the assembly, that bore should be a datum. Additionally, datums should be repeatable (stable contact), accessible for measurement, and compatible with manufacturing fixturing. The inspection fixturing should simulate the actual assembly datum contact.',
          hint: 'Datums should mirror how the part is located and constrained in the real assembly.'
        },
        {
          id: 'u9-L3-Q3',
          type: 'multiple-choice',
          question: 'You receive a cast iron housing with rough, uneven as-cast surfaces. The drawing calls out the entire bottom face as datum A. The part rocks on the CMM granite surface plate. What is the problem, and what GD&T tool solves it?',
          options: [
            'The CMM granite is not flat enough — replace it with a more precise surface plate',
            'The rough cast surface is unreliable as a full-surface datum because it causes inconsistent contact; datum targets (specific points, lines, or areas on the surface) should be used instead to ensure repeatable, stable datum establishment',
            'The part needs to be ground flat on the bottom before inspection',
            'Apply a flatness tolerance to datum A and the rocking will be controlled'
          ],
          correctIndex: 1,
          explanation: 'Datum targets specify discrete points, lines, or areas on a surface that establish the datum. They are essential for cast, forged, or sheet metal parts where the entire surface is rough, warped, or inconsistent. For example, three datum target points (A1, A2, A3) on the cast bottom surface establish a primary datum plane through exactly those three points, providing repeatable, stable contact regardless of surface irregularities. Without datum targets, the part may contact the surface plate at different high spots each time, causing measurement variation. Datum targets are designated with a target symbol (divided circle showing the datum letter and target number).',
          hint: 'If the whole surface cannot make reliable contact, how can you designate specific contact locations?'
        },
        {
          id: 'u9-L3-Q4',
          type: 'multiple-choice',
          question: 'A cylindrical feature is used as both the primary and secondary datum (e.g., |A|B| in the feature control frame, where A is a face and B is a bore). What does the bore (datum B) constrain?',
          options: [
            '3 degrees of freedom (one translation + two rotations)',
            '2 degrees of freedom (two translations perpendicular to the bore axis)',
            '1 degree of freedom (rotation about the bore axis)',
            '4 degrees of freedom (all but axial translation and axial rotation)'
          ],
          correctIndex: 1,
          explanation: 'When a cylindrical bore is the secondary datum (after a planar primary datum A constrains 3 DOF), the bore constrains 2 additional DOF: the two translations perpendicular to the bore axis (X and Y if the bore axis is Z). The remaining unconstrained DOF is rotation about the bore axis, which requires a tertiary datum (e.g., a slot, hole, or flat). If the bore were the primary datum, it would constrain 4 DOF (2 translations + 2 rotations), leaving axial translation and axial rotation.',
          hint: 'The primary plane already constrains 3 DOF. What does a cylinder add to that?'
        },
        {
          id: 'u9-L3-Q5',
          type: 'multiple-choice',
          question: 'A machinist complains that parts keep failing inspection even though they look correct on the machine. You discover the machining fixture locates the part differently from the datum reference frame on the drawing. Why does this cause failures, and how should it be resolved?',
          options: [
            'The machinist should just adjust the CNC program offsets until parts pass inspection',
            'Fixture locating surfaces must simulate the drawing\'s datum features and follow the datum precedence (primary, secondary, tertiary); when they do not, the part is made in one coordinate system but inspected in another, causing systematic errors that cannot be corrected by offsets alone',
            'The drawing datums are just for inspection — manufacturing can use whatever fixturing is convenient',
            'The inspector should re-datum to match the machining fixture setup'
          ],
          correctIndex: 1,
          explanation: 'The manufacturing fixture should replicate the datum reference frame as closely as possible. The primary datum feature should be constrained first (3 points of contact), then the secondary (2 points), then the tertiary (1 point). If machining fixtures use different locating surfaces than the drawing datums, the resulting part geometry may meet tolerance when measured from the fixture datums but fail when inspected from the drawing datums. This is one of the most common sources of GD&T-related manufacturing problems. The fix is to redesign the fixture to simulate the drawing datums, or (if there is a good reason) to revise the drawing datums to match the manufacturing reality.',
          hint: 'If the part is made using one coordinate system but inspected using another, problems arise.'
        },
        {
          id: 'u9-L3-Q6',
          type: 'fill-blank',
          question: 'The system of three mutually perpendicular datum planes that fully constrains a part in 6 degrees of freedom is called the datum ___ frame.',
          acceptedAnswers: ['reference', 'Reference', 'DRF'],
          explanation: 'The Datum Reference Frame (DRF) is established by three mutually perpendicular datum planes derived from the primary, secondary, and tertiary datum features. It serves as the coordinate system from which all geometric tolerances are evaluated. The DRF is analogous to a workholding fixture or machine tool coordinate system. Every feature control frame that references datums is evaluated relative to this coordinate frame. Proper DRF establishment is fundamental to correct GD&T interpretation and inspection.',
          hint: 'This is the 3D coordinate system established by the three datums.'
        },
        {
          id: 'u9-L3-Q7',
          type: 'multiple-choice',
          question: 'How many degrees of freedom does a primary datum plane constrain, and which DOFs are they?',
          options: [
            '1 DOF — translation normal to the plane',
            '2 DOF — two translations in the plane',
            '3 DOF — one translation (normal to the plane) and two rotations (about axes in the plane)',
            '6 DOF — all degrees of freedom'
          ],
          correctIndex: 2,
          explanation: 'A primary datum plane constrains 3 DOF using a minimum of 3 contact points: one translation perpendicular to the plane (the part cannot move through the plane), and two rotations (the part cannot rock or tilt on the plane). The remaining 3 DOF — two translations within the plane and one rotation about the plane normal — must be constrained by the secondary and tertiary datums. This is why the primary datum is the most influential — it eliminates half the degrees of freedom and establishes the fundamental orientation of the part.',
          hint: 'Place a block on a table — which movements are prevented, and which are still free?'
        },
        {
          id: 'u9-L3-Q8',
          type: 'multiple-choice',
          question: 'A part has a large flat bottom surface (datum A), a long straight edge (datum B), and a small end face (datum C). Why is this a good datum selection?',
          options: [
            'It is not — the datums should all be the same size',
            'The large flat surface provides stable primary support (3 DOF), the long edge provides reliable secondary constraint (2 DOF), and the end face locks the final DOF (1 DOF); this follows the 3-2-1 rule with decreasing constraint and stability at each level',
            'Because the surfaces are labeled in alphabetical order based on their location',
            'Because the CMM can probe all three surfaces easily'
          ],
          correctIndex: 1,
          explanation: 'Good datum selection follows the 3-2-1 principle with practical considerations: the primary datum should be the largest, most stable surface (resists rocking), the secondary should be the next most repeatable surface (long edge provides stable 2-point contact), and the tertiary locks the final DOF. The primary surface area and flatness ensure repeatable seating. The long secondary edge minimizes angular error from contact point variation. The tertiary only needs a single reliable contact point. This hierarchy maximizes measurement repeatability and mirrors typical assembly locating strategies.',
          hint: 'Stability decreases with each datum level — the primary needs the most stable contact.'
        },
        {
          id: 'u9-L3-Q9',
          type: 'true-false',
          question: 'A datum feature and a datum are the same thing.',
          correctAnswer: false,
          explanation: 'A datum feature is the actual physical feature on the part (e.g., a machined surface, a bore, a pin). A datum is the theoretically perfect geometric element (plane, axis, center point) derived from the datum feature. For a nominally flat surface, the datum feature is the real (imperfect) surface, while the datum is the perfect plane established from it. For a cylindrical feature, the datum feature is the actual bore/shaft, and the datum is the perfect axis. The datum simulator (e.g., a surface plate, a gauge pin, an expanding mandrel) is the physical equipment used to establish the datum from the datum feature.',
          hint: 'One is the real, imperfect feature on the part. The other is the theoretical, perfect geometric element.'
        },
        {
          id: 'u9-L3-Q10',
          type: 'multiple-choice',
          question: 'What is a datum simulator, and why is it important?',
          options: [
            'A computer program that calculates datums from CMM data',
            'The physical equipment (surface plate, gauge pin, chuck, fixture) that contacts the datum feature to establish the theoretical datum; it is important because the quality and accuracy of the datum simulator directly affect measurement results',
            'A software tool for designing datum reference frames',
            'An alternate name for the datum feature itself'
          ],
          correctIndex: 1,
          explanation: 'Datum simulators are the physical embodiment of the theoretical datums. A surface plate simulates a datum plane; an expanding mandrel or precision pin simulates a datum axis; a V-block constrains a cylindrical datum. The datum simulator must be more accurate than the feature being controlled (typically 10x). Imperfect datum simulators introduce measurement error. ASME Y14.5 defines datum simulators as "theoretically perfect" in the standard, but practical simulators have their own tolerances (covered in ASME Y14.43). Understanding this hierarchy — datum feature → datum simulator → datum — is essential for proper inspection planning.',
          hint: 'How does a surface plate establish a datum plane from the actual part surface?'
        },
        {
          id: 'u9-L3-Q11',
          type: 'multiple-choice',
          question: 'When a cylindrical feature is used as the primary datum, how many degrees of freedom does it constrain?',
          options: [
            '2 DOF — two translations perpendicular to the axis',
            '3 DOF — two translations perpendicular to the axis plus one rotation about the axis',
            '4 DOF — two translations perpendicular to the axis plus two rotations about axes perpendicular to the bore axis',
            '5 DOF — all except axial translation'
          ],
          correctIndex: 2,
          explanation: 'A cylindrical primary datum constrains 4 DOF: two translations (X and Y, perpendicular to the cylinder axis) and two rotations (tilting/rocking about X and Y axes). The remaining 2 DOF are: translation along the cylinder axis (Z) and rotation about the cylinder axis. This is why a cylinder alone cannot serve as a complete datum reference frame — at least one additional datum feature is needed. If the same cylinder were secondary (after a planar primary), it would only constrain 2 DOF (two translations), because the primary plane already handles the rotations.',
          hint: 'A cylinder centers the part in two directions and prevents tilting — count those DOFs.'
        },
        {
          id: 'u9-L3-Q12',
          type: 'multiple-choice',
          question: 'What are datum targets, and when are they preferred over full-surface datum features?',
          options: [
            'Datum targets are tight tolerances applied to datum surfaces',
            'Datum targets are specific points, lines, or areas on a datum feature used to establish the datum; they are preferred for cast, forged, welded, or sheet metal parts where the full surface is too irregular or flexible for repeatable datum establishment',
            'Datum targets are used only for secondary and tertiary datums',
            'Datum targets are the tolerance values assigned to datum features'
          ],
          correctIndex: 1,
          explanation: 'Datum targets specify the exact contact locations for datum establishment. They are designated as points (crosshair symbol), lines, or circular areas on the datum feature. For the primary datum, a minimum of 3 target points establishes the plane; secondary requires 2, tertiary requires 1. Datum targets are essential for: (1) castings/forgings with rough, irregular surfaces; (2) sheet metal parts that flex; (3) plastic parts that warp; (4) any part where full-surface contact is unreliable. The target symbol is a divided circle — the upper half shows the target area size (if applicable) and the lower half shows the identifier (e.g., A1, A2, A3).',
          hint: 'When the entire surface cannot provide repeatable contact, you designate specific contact locations.'
        },
        {
          id: 'u9-L3-Q13',
          type: 'true-false',
          question: 'Datum features should always have tighter tolerances than the features they control.',
          correctAnswer: false,
          explanation: 'While datum features should be repeatable and stable, there is no absolute rule requiring them to have tighter tolerances than controlled features. In practice, datum features are often well-controlled because they are functional surfaces, but the tolerance on a datum feature is driven by its own functional requirements, not by the tolerances of features referenced to it. However, if a datum feature has excessive form error, the datum it establishes becomes less repeatable, increasing measurement uncertainty for features referenced to it. Good practice is to control datum feature form sufficiently for repeatable datum establishment.',
          hint: 'Are datum feature tolerances dictated by the features they control, or by their own functional requirements?'
        },
        {
          id: 'u9-L3-Q14',
          type: 'multiple-choice',
          question: 'A part has two coaxial bores that together serve as a single datum axis. How is this indicated on the drawing?',
          options: [
            'Assign different datum letters to each bore (A and B) and reference both',
            'Assign the same datum letter to both bores (e.g., A-A or A on both), establishing a common datum axis from both features simultaneously',
            'Only use one bore as the datum and ignore the other',
            'Use a datum target on each bore'
          ],
          correctIndex: 1,
          explanation: 'When two or more features together establish a single datum, they are designated as a common datum using the same letter (e.g., datum A applied to both bores, or A-A notation). The resulting datum axis is the best-fit axis through both bores simultaneously. This is used when neither bore alone is long enough to establish a stable axis, but together they provide a well-defined rotational reference. Common datum features are frequently used for: coaxial bearing journals, parts with two bearing bores on the same axis, and features that must share a common reference axis. The datum is established from the simultaneous best-fit of both features.',
          hint: 'If two bores share the same axis, can they be combined into one datum reference?'
        },
        {
          id: 'u9-L3-Q15',
          type: 'multiple-choice',
          question: 'What is a "customized datum reference frame" and why might it be used?',
          options: [
            'A datum reference frame where the datums are selected by the machinist',
            'A DRF that uses non-standard constraint schemes — for example, constraining specific DOFs differently than the standard 3-2-1 method; it is used for complex parts where the standard approach does not match the functional assembly constraints',
            'A DRF designed specifically for CMM programming',
            'A reference frame using more than three datums'
          ],
          correctIndex: 1,
          explanation: 'ASME Y14.5-2018 introduced the concept of customized datum reference frames using DOF constraint symbols in the feature control frame. Sometimes the standard 3-2-1 approach does not reflect how a part is actually constrained. For example, a part might be located by two parallel pins (each constraining different DOFs) rather than the conventional plane-cylinder-point arrangement. Customized DRFs allow the designer to specify exactly which DOFs each datum feature constrains, using [x], [y], [z], [u], [v], [w] notation. This provides more precise control over the datum reference frame for complex assemblies.',
          hint: 'Not all parts fit the standard 3-2-1 constraint model — some need customized DOF assignments.'
        },
        {
          id: 'u9-L3-Q16',
          type: 'fill-blank',
          question: 'The minimum number of contact points required to establish a primary datum plane is _____.',
          acceptedAnswers: ['3', 'three', 'Three'],
          explanation: 'Three non-collinear points define a plane. For the primary datum, three high points on the datum feature contact the datum simulator (e.g., surface plate), establishing the primary datum plane. This constrains 3 DOF. Two contact points on the secondary datum feature constrain 2 more DOF, and one contact point on the tertiary constrains the final DOF, totaling 6 DOF for the complete 3-2-1 datum reference frame. If the primary feature is very long and narrow, the three contact points may be nearly collinear, leading to instability — this is why broad, stable surfaces make better primary datums.',
          hint: 'How many non-collinear points define a plane in 3D geometry?'
        },
        {
          id: 'u9-L3-Q17',
          type: 'multiple-choice',
          question: 'A drawing shows datum feature B as a bore with the modifier Ⓜ in the feature control frame: |⌖|∅0.25|A|B Ⓜ|. What is the physical implication of MMC on datum B?',
          options: [
            'The datum axis is established at the MMC size of the bore',
            'The datum simulator is a fixed pin at the virtual condition size of the bore (MMC minus any applicable geometric tolerance); if the bore is larger than MMC, the part has freedom to shift on the simulator, providing datum shift tolerance',
            'The tolerance only applies when the bore is at MMC',
            'The bore must be produced at exactly MMC to function as a datum'
          ],
          correctIndex: 1,
          explanation: 'When a datum feature of size is referenced at MMC, the datum simulator is fixed at the datum feature\'s virtual condition boundary — for a bore, this is the smallest boundary (MMC minus applicable geometric tolerance). If the actual bore is larger than this virtual condition, there is physical clearance between the bore and the simulator (pin), allowing the part to shift. This shift provides additional tolerance for features controlled relative to that datum. The amount of datum shift = actual datum feature size − virtual condition of datum feature. This is a powerful tool for maximizing acceptance rates in assembly.',
          hint: 'If the datum bore is bigger than the fixed simulator pin, the part can move on the pin. What does that movement provide?'
        },
        {
          id: 'u9-L3-Q18',
          type: 'multiple-choice',
          question: 'A thin sheet metal part is flexible and deforms under its own weight. How should datums be specified to ensure repeatable measurement?',
          options: [
            'Use standard full-surface datums — the flexibility does not matter',
            'Use datum targets with a specified clamping/restraint system that replicates the assembly condition; the drawing should include restrained condition notes specifying the clamping forces and locations',
            'Sheet metal parts do not need datum references',
            'Use only one datum point to minimize deformation'
          ],
          correctIndex: 1,
          explanation: 'Flexible parts require special datum treatment per ASME Y14.5. The drawing should specify whether the part is inspected in the free state or restrained state. For parts that are flexible but rigid in assembly (e.g., sheet metal bolted to a rigid frame), inspection in the restrained state (simulating assembly) is more meaningful. Datum targets define specific clamping point locations, and notes specify clamping forces. Without this, different inspectors will get different results depending on how they hold the part. The note typically reads: "UNLESS OTHERWISE SPECIFIED, DIMENSIONS APPLY IN THE RESTRAINED CONDITION" with clamping details.',
          hint: 'If the part changes shape depending on how you hold it, how do you ensure everyone measures it the same way?'
        },
        {
          id: 'u9-L3-Q19',
          type: 'true-false',
          question: 'The order in which datums appear in the feature control frame (left to right) defines their precedence — the leftmost datum is primary, the middle is secondary, and the rightmost is tertiary.',
          correctAnswer: true,
          explanation: 'In the feature control frame, datum references are read left to right with decreasing precedence. The first datum compartment (leftmost) is the primary datum, the second is secondary, and the third is tertiary. Changing the order changes the datum reference frame and can change measurement results. For example, |A|B|C| and |B|A|C| establish different coordinate systems — in the first, datum A is contacted first (3 DOF), then B (2 DOF), then C (1 DOF); in the second, B is contacted first. This is why datum precedence on drawings must precisely match the functional assembly sequence.',
          hint: 'The feature control frame reads left to right — which compartment holds the most important datum?'
        },
        {
          id: 'u9-L3-Q20',
          type: 'multiple-choice',
          question: 'What is the difference between a datum axis established from a bore at RFS vs. MMC?',
          options: [
            'There is no difference — the datum axis is always the same',
            'At RFS, the datum simulator expands or contracts to fit the actual bore (variable-size simulator), establishing a unique, fixed axis; at MMC, the simulator is a fixed-size pin (at virtual condition), and the datum axis can shift if the bore is larger than the simulator',
            'RFS gives a larger datum shift than MMC',
            'MMC requires a different bore than RFS'
          ],
          correctIndex: 1,
          explanation: 'At RFS, the datum simulator is a variable-size element (e.g., an expanding mandrel or mathematical best-fit cylinder) that conforms to the actual bore, producing a unique datum axis with no play. At MMC, the simulator is a fixed pin at the virtual condition size — if the bore is larger, there is clearance and the axis can shift. RFS provides the most accurate datum (no shift possible) but eliminates the datum shift tolerance benefit. MMC is used when some datum shift is acceptable in exchange for easier fixturing (a fixed pin is simpler than an expanding mandrel) and additional tolerance. The choice depends on functional requirements.',
          hint: 'Does the datum pin expand to fit the hole (RFS) or stay at a fixed size (MMC)?'
        },
        {
          id: 'u9-L3-Q21',
          type: 'multiple-choice',
          question: 'Why is it sometimes necessary to specify secondary and tertiary datums even when the primary datum appears to fully locate the feature?',
          options: [
            'It is never necessary — one datum is always sufficient',
            'To fully define the measurement coordinate system and eliminate ambiguity; without all three datums, the feature could be measured from different orientations or rotational positions, yielding different results',
            'Additional datums are only for CMM alignment, not for function',
            'Multiple datums are only needed for position tolerance, not for other geometric controls'
          ],
          correctIndex: 1,
          explanation: 'Consider a position tolerance on a hole pattern relative to only datum A (a plane). While the plane constrains 3 DOF, the holes could be measured at any rotational orientation and X-Y location on that plane — the measurement is ambiguous. Adding datum B (an edge) locks 2 more DOF, and datum C (another edge) locks the last DOF, fully defining where the pattern should be. Without the full DRF, different inspectors might measure from different references and get different results for the same part. The number of datums needed depends on the geometric control being applied.',
          hint: 'If the part can slide or rotate on datum A, how do you know where to measure the hole pattern?'
        },
        {
          id: 'u9-L3-Q22',
          type: 'fill-blank',
          question: 'The 3-2-1 principle states that a complete datum reference frame requires _____ total contact points (3 for primary, 2 for secondary, 1 for tertiary).',
          acceptedAnswers: ['6', 'six', 'Six'],
          explanation: 'The 3-2-1 rule is the foundation of workholding and datum establishment. Three non-collinear points define the primary datum plane (constraining 3 DOF: one translation and two rotations). Two points define the secondary datum (constraining 2 DOF: one translation and one rotation). One point defines the tertiary datum (constraining the final DOF: one translation). Together, 6 contact points constrain all 6 DOF (3 translations + 3 rotations), fully locating the part in space. This principle is applied not only in GD&T but also in fixture design, CMM programming, and robotic part locating.',
          hint: 'Add up: 3 + 2 + 1 = ?'
        },
        {
          id: 'u9-L3-Q23',
          type: 'multiple-choice',
          question: 'A part has a conical (tapered) feature designated as a datum. How does a cone establish a datum?',
          options: [
            'A cone cannot be used as a datum feature',
            'A cone establishes a datum axis and a datum point simultaneously — the axis from the cone\'s axis of symmetry and the point from the apex; this constrains 5 DOF (all except rotation about the cone axis)',
            'A cone only establishes a datum plane at its base',
            'A cone establishes two datum planes perpendicular to each other'
          ],
          correctIndex: 1,
          explanation: 'A conical datum feature is unique because it simultaneously establishes a datum axis and a datum point. The axis constrains 4 DOF (two translations and two rotations), and the point on the axis constrains 1 additional DOF (axial translation), for a total of 5 DOF. Only rotation about the cone axis remains unconstrained. This makes cones very efficient datum features — they can replace a separate planar primary and cylindrical secondary datum. Cones are used as datums in machine tool spindle interfaces (e.g., Morse taper, CAT/BT tool holders), precision instrument mountings, and aerospace connectors.',
          hint: 'A cone has both an axis and a specific axial position (the taper locks axial movement). How many DOFs does that constrain?'
        },
        {
          id: 'u9-L3-Q24',
          type: 'multiple-choice',
          question: 'What is the "simultaneous requirement" for datum features in ASME Y14.5?',
          options: [
            'All datums must be manufactured at the same time',
            'All geometric tolerances sharing the same datum reference frame and material condition modifiers are evaluated simultaneously — meaning the part must satisfy all of them at the same time, potentially limiting the available datum shift',
            'The three datums must be measured simultaneously on the CMM',
            'The datum features must all have the same tolerance value'
          ],
          correctIndex: 1,
          explanation: 'The simultaneous requirement (ASME Y14.5-2018, Section 4.19) means that if multiple feature control frames reference the same datums in the same order with the same material condition modifiers, they are evaluated as a group with a single datum reference frame setup. This means any datum shift must accommodate ALL the controlled features simultaneously — you cannot shift the DRF to accept one feature and then re-shift it for another. This is more restrictive than evaluating each feature independently. The "SEP REQT" notation can be added beneath the feature control frame to override this default and allow separate evaluation.',
          hint: 'If two hole patterns reference the same datums at MMC, can the part shift differently for each pattern?'
        },
        {
          id: 'u9-L3-Q25',
          type: 'true-false',
          question: 'A datum feature with a flatness tolerance of 0.1 mm establishes a datum plane that also has 0.1 mm of form error.',
          correctAnswer: false,
          explanation: 'This is a critical distinction: the datum feature (the real surface) may have up to 0.1 mm of flatness error. But the datum (the theoretical plane) derived from it is always a perfect, infinite plane. The datum simulator (e.g., a surface plate) contacts the high points of the datum feature and establishes a perfect plane from those contacts. The datum plane itself has no form error — it is a mathematical construct. The flatness error of the datum feature affects the repeatability of datum establishment (different high points may contact the simulator differently), but the resulting datum is always geometrically perfect.',
          hint: 'Is the datum the real surface or the theoretical plane derived from it?'
        },
        {
          id: 'u9-L3-Q26',
          type: 'multiple-choice',
          question: 'An engineer needs to locate a pattern of 4 holes relative to a bolt circle center on a circular flange. What datums would typically be specified?',
          options: [
            'Only the flange face — one datum is sufficient',
            'The flange face as primary datum (A), the bore or pilot diameter as secondary datum (B) to center the pattern, and one hole or a slot as tertiary datum (C) to lock rotational orientation',
            'Two of the four holes as datums A and B',
            'The outer diameter of the flange as the only datum'
          ],
          correctIndex: 1,
          explanation: 'For a circular bolt pattern on a flange: the flat face (datum A) establishes the primary plane (3 DOF), the center bore or pilot diameter (datum B) centers the pattern (2 DOF), and a slot, key, or one of the holes (datum C) locks rotation (1 DOF). Without datum C, the bolt pattern can be rotated to any angular position on the flange and still pass inspection, which may not match the assembly requirement. This A-B-C scheme is the standard approach for rotational parts with bolt patterns — it mirrors how the flange seats against its mating surface, centers on a pilot bore, and is clocked by a locating feature.',
          hint: 'The flange sits on a face, centers on a bore, and clocks via a key or pin — what are the three datums?'
        },
        {
          id: 'u9-L3-Q27',
          type: 'multiple-choice',
          question: 'What happens if the primary datum feature has poor form (e.g., significant waviness) and no datum targets are specified?',
          options: [
            'The datum plane is wavy, matching the surface',
            'The part rocks on the datum simulator, contacting different high points each time, leading to non-repeatable datum establishment and inconsistent measurement results for all features referenced to that datum',
            'The CMM software automatically corrects for poor form',
            'Poor form on a datum feature has no effect on measurements'
          ],
          correctIndex: 1,
          explanation: 'When a full-surface primary datum has significant form error and no datum targets are specified, the part can rock on the datum simulator (surface plate), contacting different sets of three high points each time the part is placed. This changes the datum plane orientation, which changes the coordinate system, which changes the measured values of every feature referenced to that datum. The result is poor measurement repeatability (gauge R&R failure). Solutions: (1) specify datum targets to define fixed contact points, (2) tighten the flatness tolerance on the datum feature, or (3) specify a restrained condition. This is one of the most practical and commonly encountered datum problems.',
          hint: 'If the part rocks on the surface plate, does it sit the same way every time?'
        },
        {
          id: 'u9-L3-Q28',
          type: 'fill-blank',
          question: 'Specific points, lines, or areas used to establish a datum from an irregular or rough surface are called datum _____.',
          acceptedAnswers: ['targets', 'Targets'],
          explanation: 'Datum targets are designated contact locations on a datum feature. For point targets, a crosshair symbol is used at the specified location. For area targets, a circular area of specified diameter is shown. For line targets, a line at the specified location is indicated. The datum target symbol is a divided circle: the upper half shows the target area dimension (blank for point targets), and the lower half shows the identifier (e.g., A1, A2, A3 for the first three targets on datum A). Datum targets are essential for parts with as-cast, as-forged, or as-molded surfaces, and for flexible sheet metal parts.',
          hint: 'These are designated contact points or areas on rough surfaces where the datum simulator touches.'
        },
        {
          id: 'u9-L3-Q29',
          type: 'multiple-choice',
          question: 'A complex assembly uses a pattern of holes as a datum feature (e.g., "datum B" applied to a 4-hole pattern). How is the datum established from multiple holes?',
          options: [
            'One hole is arbitrarily selected as the datum',
            'The datum is established from the best-fit of all the holes in the pattern — typically the axis of the best-fit pattern at the applicable material condition; this creates a datum from the collective geometry of the pattern rather than a single feature',
            'Each hole establishes a separate datum axis',
            'The pattern cannot serve as a datum — only single features can be datums'
          ],
          correctIndex: 1,
          explanation: 'ASME Y14.5 allows patterns of features to serve as datum features. The datum is established from the best-fit (least-squares or constrained) alignment of all the features in the pattern. At MMC, a pattern of holes would be simulated by a corresponding pattern of fixed-size pins (at virtual condition); at RFS, expanding pins would be used. This is common in automotive and aerospace applications where the bolt pattern defines the assembly interface and no single feature provides a sufficient datum reference. The pattern datum constrains the same DOFs as its individual features do collectively.',
          hint: 'If no single feature is sufficient, can a group of features collectively establish a datum?'
        },
        {
          id: 'u9-L3-Q30',
          type: 'true-false',
          question: 'When a feature control frame references only one datum (e.g., |⊥|0.05|A|), the measurement is fully constrained in all 6 degrees of freedom.',
          correctAnswer: false,
          explanation: 'A single planar datum constrains only 3 DOF. This is sufficient for some geometric controls — for example, perpendicularity relative to datum A only requires the orientation reference, not the full location reference. But for position tolerance, a single datum typically leaves the measurement under-constrained (the feature could be at any X-Y location on the datum plane). The number of datums required depends on the type of geometric control: form tolerances need zero datums, orientation tolerances need one or two, and position tolerances typically need two or three. Using fewer datums than necessary creates measurement ambiguity.',
          hint: 'If datum A constrains 3 DOF, what about the other 3?'
        }
      ]
    },
    {
      id: 'u9-L4',
      title: 'Tolerance Stack-Up',
      description: 'Worst-case analysis, RSS (statistical), 1D chain analysis, gap analysis, tolerance allocation.',
      icon: '📊',
      xpReward: 30,
      questions: [
        {
          id: 'u9-L4-Q1',
          type: 'multiple-choice',
          question: 'A 1D tolerance stack has 5 dimensions, each with a tolerance of ±0.1 mm. Using worst-case analysis, what is the total stack-up tolerance?',
          options: [
            '±0.22 mm',
            '±0.50 mm',
            '±0.10 mm',
            '±1.00 mm'
          ],
          correctIndex: 1,
          explanation: 'Worst-case (arithmetic) stack-up simply adds all tolerances: total = ±(0.1 + 0.1 + 0.1 + 0.1 + 0.1) = ±0.50 mm. This guarantees 100% of assemblies will be within the resulting tolerance, but it is the most conservative method. In practice, it is unlikely that all 5 dimensions are simultaneously at their worst limit, which is why statistical methods (RSS) are often preferred for cost optimization.',
          hint: 'Worst-case = simple sum of all individual tolerances.'
        },
        {
          id: 'u9-L4-Q2',
          type: 'multiple-choice',
          question: 'Compare worst-case vs. RSS tolerance stack-up analysis. When would you insist on using worst-case even though RSS gives a smaller (cheaper) tolerance?',
          options: [
            'Always use RSS — worst-case is obsolete and overly conservative',
            'When production volumes are very high — RSS only works for small batches',
            'When the consequence of failure is severe (safety-critical, medical, aerospace), production volumes are low (statistical assumptions weaken), or contractual/regulatory requirements mandate 100% interchangeability',
            'Only when the customer specifically requests it in the purchase order'
          ],
          correctIndex: 2,
          explanation: 'RSS assumes normal distributions and statistical independence, predicting ~99.73% of assemblies will be within tolerance (at 3-sigma). The ~0.27% that fall outside may be acceptable for consumer electronics but unacceptable for aircraft flight controls, medical implants, or explosive ordnance. Low production volumes (dozens, not thousands) undermine the statistical basis — with only 50 assemblies, even a 1% failure rate means real failures. Additionally, some standards (MIL-specs, certain automotive safety requirements) mandate worst-case analysis. The engineering judgment is knowing when the cost savings of RSS are worth the residual risk.',
          hint: 'Think about when even a 0.27% failure rate (2700 ppm) is unacceptable.'
        },
        {
          id: 'u9-L4-Q3',
          type: 'true-false',
          question: 'In a 1D tolerance chain, if a dimension contributes positively to the gap (increasing the gap as it increases), it is called an "increasing" contributor, and its tolerance adds in the positive direction.',
          correctAnswer: true,
          explanation: 'In 1D chain analysis, each dimension is classified as either an "increasing" contributor (gap increases as dimension increases) or a "decreasing" contributor (gap decreases as dimension increases). The nominal gap = sum of increasing dimensions − sum of decreasing dimensions. For worst-case gap analysis: maximum gap uses max of increasing and min of decreasing; minimum gap uses min of increasing and max of decreasing. Properly identifying positive and negative contributors is the most critical step in tolerance analysis.',
          hint: 'Think about the direction each dimension pushes the gap — does it open or close the gap?'
        },
        {
          id: 'u9-L4-Q4',
          type: 'multiple-choice',
          question: 'You are reviewing a 4-part assembly where the tolerance stack-up shows the gap can go negative (interference) under worst-case analysis, but RSS analysis shows the gap stays positive with comfortable margin. How do you decide which analysis to trust?',
          options: [
            'Always trust worst-case — if it shows interference, the design must be changed',
            'Always trust RSS — worst-case is unrealistically pessimistic',
            'Evaluate the consequences of the gap going negative, the production volume, and the process capability (Cpk) of each dimension; if interference causes a safety issue or the volumes are too low for statistics, redesign; if it causes only a cosmetic issue and volumes are high with well-controlled processes, RSS may be acceptable with inspection sampling',
            'Run a Monte Carlo simulation and if it agrees with RSS, use that result'
          ],
          correctIndex: 2,
          explanation: 'This is a judgment call that depends on context. Key factors: (1) Consequence severity — if negative gap means the product jams, leaks, or fails unsafely, worst-case governs. If it means a slight visual gap variation, RSS is reasonable. (2) Volume — RSS relies on statistical distributions; for 10 units/year, statistics are meaningless. For 100,000/year, they are valid. (3) Process capability — if Cpk > 1.33 for all contributors, the actual distributions are tighter than the tolerance bands, making RSS even more favorable. (4) Cost of failure vs. cost of tighter tolerances. Monte Carlo simulation with actual process data is the most sophisticated approach but requires real Cpk data from production.',
          hint: 'There is no universal right answer — it depends on risk, volume, and process control.'
        },
        {
          id: 'u9-L4-Q5',
          type: 'multiple-choice',
          question: 'When allocating tolerances to multiple dimensions in a stack-up, what approach optimizes cost?',
          options: [
            'Assign equal tolerance to every dimension',
            'Assign tighter tolerances to dimensions that are easier/cheaper to control, and looser tolerances to expensive ones',
            'Always use the tightest tolerance possible on every dimension',
            'Use only RSS analysis and ignore worst-case entirely'
          ],
          correctIndex: 1,
          explanation: 'Cost-optimized tolerance allocation assigns tighter tolerances to dimensions that are inexpensive to control (e.g., features machined in the same setup, turned diameters, injection molded dimensions) and looser tolerances to costly ones (e.g., features between different setups, large castings, cross-drilled holes). This is because manufacturing cost increases exponentially as tolerance tightens. Methods like Lagrange multiplier optimization or cost-tolerance models help distribute tolerances to minimize total cost while meeting the stack-up requirement.',
          hint: 'Tolerance is directly tied to cost — tighter = more expensive. Allocate strategically.'
        },
        {
          id: 'u9-L4-Q6',
          type: 'fill-blank',
          question: 'The statistical tolerance analysis method that computes the total tolerance as the square root of the sum of squared individual tolerances is called the ___ method.',
          acceptedAnswers: ['RSS', 'rss', 'Root Sum Square', 'root sum square', 'Root Sum of Squares', 'root sum of squares'],
          explanation: 'The RSS (Root Sum Square) method assumes individual dimensions follow normal distributions and are statistically independent. It predicts the assembly variation at approximately 3-sigma confidence (99.73%). RSS gives a smaller total tolerance than worst-case, resulting in lower manufacturing cost. However, it accepts a small probability (~0.27%) that assemblies will be out of tolerance. For higher confidence, a safety factor (inflator) can be applied, or Monte Carlo simulation can be used for non-normal distributions.',
          hint: 'This method uses the Pythagorean-like combination of individual tolerances.'
        },
        {
          id: 'u9-L4-Q7',
          type: 'multiple-choice',
          question: 'In a tolerance stack-up, what is the first step before performing any calculations?',
          options: [
            'Select the analysis method (worst-case or RSS)',
            'Identify the critical assembly requirement (the gap or clearance of interest) and draw a dimension loop showing every contributing dimension from one side to the other',
            'Assign tolerances to all dimensions',
            'Build a prototype and measure it'
          ],
          correctIndex: 1,
          explanation: 'The first and most important step is to clearly define the assembly requirement (what gap, clearance, or interference must be controlled) and trace the complete dimension chain (loop) from one side of the requirement to the other, passing through every contributing part and dimension. Missing even one dimension in the chain invalidates the entire analysis. The dimension loop should be drawn as a sketch showing each dimension with its direction (positive or negative contributor to the gap). Only after the loop is complete should you classify contributors, look up tolerances, and perform calculations.',
          hint: 'Before you can calculate anything, you need to know every dimension that contributes to the result.'
        },
        {
          id: 'u9-L4-Q8',
          type: 'multiple-choice',
          question: 'A 3-part assembly has a total gap requirement of 1.0 ± 0.5 mm. Part A is 25 ± 0.1, Part B is 30 ± 0.15, and the housing cavity is 56.0 ± t. Using worst-case analysis, what is the maximum allowable tolerance (t) on the housing?',
          options: [
            '±0.25 mm',
            '±0.50 mm',
            '±0.15 mm',
            '±0.10 mm'
          ],
          correctIndex: 0,
          explanation: 'The gap = housing − Part A − Part B. Nominal gap = 56.0 − 25.0 − 30.0 = 1.0 mm (matches the requirement). For worst-case: total gap tolerance = tolerance of housing + tolerance of A + tolerance of B = t + 0.1 + 0.15 = t + 0.25. This must be ≤ 0.5 mm (the required gap tolerance). So t ≤ 0.5 − 0.25 = 0.25 mm. The housing tolerance is ±0.25 mm. If RSS were used, more tolerance could be allocated because the tolerances combine statistically rather than arithmetically.',
          hint: 'Set up the equation: sum of all individual tolerances must not exceed the allowable gap variation.'
        },
        {
          id: 'u9-L4-Q9',
          type: 'multiple-choice',
          question: 'What is Monte Carlo simulation in the context of tolerance analysis, and when is it preferred over RSS?',
          options: [
            'A manufacturing method that uses random sampling to produce parts',
            'A computational method that generates thousands of random assemblies based on statistical distributions of each dimension, directly predicting the assembly outcome distribution; preferred when distributions are non-normal, dimensions are correlated, or the stack-up is nonlinear',
            'A casino-based method that randomly accepts or rejects parts',
            'A simplified version of worst-case analysis'
          ],
          correctIndex: 1,
          explanation: 'Monte Carlo simulation randomly samples each dimension from its statistical distribution (which can be normal, uniform, skewed, or based on actual production data), calculates the assembly result for each sample, and repeats thousands or millions of times. The resulting distribution directly shows the probability of various outcomes. Advantages over RSS: (1) handles non-normal distributions (e.g., processes that tend toward one limit); (2) handles correlated dimensions (e.g., features machined in the same setup); (3) handles nonlinear stack-ups (e.g., angular contributions); (4) provides the full probability distribution, not just a single confidence level. It requires input distribution data, which RSS does not.',
          hint: 'Instead of formulas, this method simulates millions of random assemblies on a computer.'
        },
        {
          id: 'u9-L4-Q10',
          type: 'true-false',
          question: 'RSS tolerance analysis assumes that all individual dimension variations follow a normal (Gaussian) distribution and are statistically independent.',
          correctAnswer: true,
          explanation: 'The standard RSS method assumes: (1) each dimension follows a normal distribution, and (2) the dimensions are statistically independent (no correlation between them). If either assumption is violated, the RSS result may be inaccurate. Non-normal distributions (common in processes that run against a hard limit, like drilling against a stop) and correlated dimensions (features machined in the same setup share tool wear and thermal errors) can produce assembly distributions that differ significantly from the RSS prediction. Monte Carlo simulation with actual process data is the remedy for these violations.',
          hint: 'RSS is based on the central limit theorem and independence — what are the underlying assumptions?'
        },
        {
          id: 'u9-L4-Q11',
          type: 'multiple-choice',
          question: 'Using RSS, calculate the total stack-up tolerance for a chain of 4 dimensions with individual tolerances of ±0.1, ±0.2, ±0.1, and ±0.15 mm.',
          options: [
            '±0.55 mm (worst-case)',
            '±0.28 mm',
            '±0.14 mm',
            '±0.40 mm'
          ],
          correctIndex: 1,
          explanation: 'RSS = sqrt(0.1² + 0.2² + 0.1² + 0.15²) = sqrt(0.01 + 0.04 + 0.01 + 0.0225) = sqrt(0.0825) = ±0.287 ≈ ±0.28 mm. Compare to worst-case: ±(0.1 + 0.2 + 0.1 + 0.15) = ±0.55 mm. RSS predicts about 51% of the worst-case value, meaning much more tolerance is available for manufacturing. This ratio (RSS/WC) always decreases as more dimensions are added, making RSS increasingly advantageous for complex assemblies with many contributors.',
          hint: 'RSS = square root of (sum of each tolerance squared).'
        },
        {
          id: 'u9-L4-Q12',
          type: 'multiple-choice',
          question: 'What is the "sensitivity factor" in a tolerance stack-up, and when is it not equal to 1?',
          options: [
            'A factor that measures how sensitive the inspector is to measurement errors',
            'A multiplier that accounts for how much a given dimension contributes to the stack-up result; it is not 1 when the contribution is geometric (e.g., an angular dimension contributing to a linear gap, where the sensitivity factor involves sine or cosine of the angle)',
            'A safety factor applied to all tolerances',
            'The ratio of RSS to worst-case tolerance'
          ],
          correctIndex: 1,
          explanation: 'In a general tolerance stack-up, each dimension contributes to the result with a sensitivity factor (partial derivative of the result with respect to that dimension). For a simple 1D linear stack, all sensitivity factors are ±1. But when angular dimensions, lever arms, or geometric relationships are involved, the sensitivity factor includes trigonometric functions or other nonlinear terms. For example, if an angular error θ affects a linear gap at a distance L, the sensitivity is L × cos(θ) or L × sin(θ). Ignoring sensitivity factors in non-linear stack-ups produces incorrect results.',
          hint: 'If an angle changes by 1°, how much does the linear gap change? It depends on geometry.'
        },
        {
          id: 'u9-L4-Q13',
          type: 'multiple-choice',
          question: 'What is the Cpk (process capability index), and how does it relate to tolerance analysis?',
          options: [
            'Cpk is the tolerance divided by the part size',
            'Cpk measures how well a manufacturing process is centered within its tolerance band; Cpk ≥ 1.33 means the process uses at most 75% of the tolerance band, providing confidence that RSS assumptions are valid and actual production will perform better than RSS predicts',
            'Cpk is only relevant to quality control, not to design',
            'Cpk must always equal exactly 1.0 for a capable process'
          ],
          correctIndex: 1,
          explanation: 'Cpk = min[(USL − μ)/(3σ), (μ − LSL)/(3σ)], where USL/LSL are the tolerance limits, μ is the process mean, and σ is the process standard deviation. Cpk = 1.0 means 3σ on each side (99.73% in-tolerance, 2700 ppm defective). Cpk = 1.33 means 4σ on each side (63 ppm defective). Cpk = 1.67 means 5σ (0.6 ppm). For tolerance analysis: if all contributing processes have Cpk ≥ 1.33, the RSS result is conservative because the actual distributions are tighter than the tolerance bands. The RSS formula implicitly assumes Cpk = 1.0 (process uses the full tolerance). Higher Cpk values make the assembly perform even better than RSS predicts.',
          hint: 'This index tells you how much of the tolerance band the process actually uses.'
        },
        {
          id: 'u9-L4-Q14',
          type: 'fill-blank',
          question: 'In a worst-case tolerance analysis, the total assembly tolerance equals the arithmetic _____ of all individual tolerances.',
          acceptedAnswers: ['sum', 'Sum', 'addition'],
          explanation: 'Worst-case analysis assumes all dimensions are simultaneously at their most unfavorable limits. The total tolerance is simply the arithmetic sum of all individual tolerances: T_total = T1 + T2 + T3 + ... + Tn. This guarantees 100% of assemblies will be within the calculated range, assuming all individual parts are within their tolerances. While overly conservative for most applications, it is the only method that provides absolute certainty. The method is also called "arithmetic stack-up" or "linear stack-up."',
          hint: 'The simplest method: just add up all the individual tolerances.'
        },
        {
          id: 'u9-L4-Q15',
          type: 'multiple-choice',
          question: 'A tolerance stack-up reveals that the minimum gap in an assembly is -0.05 mm (interference) under worst-case. What are the possible corrective actions?',
          options: [
            'The only option is to tighten all tolerances equally until the gap is positive',
            'Options include: tightening selected tolerances (based on cost), using statistical analysis if appropriate, adding a shim or adjustable feature, redesigning to reduce the number of contributors, or accepting the interference if it is functionally acceptable (e.g., a snap fit)',
            'The design must be scrapped and started over',
            'Switch to RSS analysis — the problem disappears'
          ],
          correctIndex: 1,
          explanation: 'Several strategies can resolve a negative gap in worst-case analysis: (1) Tighten tolerances — selectively on the cheapest-to-control dimensions; (2) Switch to RSS if the application risk allows it; (3) Add an adjustable feature (shim, spacer, adjustable stop) that absorbs the variation; (4) Redesign to reduce the chain length (fewer contributors = less stack-up); (5) Change materials or processes to reduce variation; (6) Accept and manage — selective assembly (match parts by measured size) can guarantee assembly without tightening tolerances. The best approach depends on cost, volume, and risk trade-offs.',
          hint: 'Think of all the tools an engineer has: tighter tolerances, design changes, adjustable features, statistical methods.'
        },
        {
          id: 'u9-L4-Q16',
          type: 'multiple-choice',
          question: 'What is "selective assembly," and when is it used to address tolerance stack-up issues?',
          options: [
            'Selecting the best-looking parts for assembly',
            'Measuring each part and sorting into size groups, then pairing parts from complementary groups to guarantee assembly fit without tightening individual tolerances; used in high-precision or high-value assemblies like engine pistons, bearings, and fuel injectors',
            'Randomly selecting parts and hoping they fit',
            'Assembling parts in a specific sequence'
          ],
          correctIndex: 1,
          explanation: 'Selective assembly measures each part and classifies it into groups based on actual size. Parts from complementary groups are then matched — e.g., a "large bore" group is paired with a "large piston" group to maintain the required clearance. This achieves tight assembly tolerances without requiring individually tight part tolerances. For example, instead of requiring ±0.005 on both bore and piston, you might allow ±0.015 on each but sort into 3 groups, achieving ±0.005 effective fit variation. The trade-off: additional measurement/sorting labor and inventory management complexity. It is cost-effective for high-value, moderate-volume production.',
          hint: 'If you measure each part and match it with a compatible partner, do you still need individually tight tolerances?'
        },
        {
          id: 'u9-L4-Q17',
          type: 'true-false',
          question: 'A dimension that does not appear in the tolerance loop but is manufactured on the same part as a contributing dimension can be ignored in the tolerance analysis.',
          correctAnswer: true,
          explanation: 'Only dimensions that directly contribute to the gap or clearance being analyzed should be included in the tolerance loop. A dimension on the same part that lies outside the chain (i.e., it does not affect the distance between the two surfaces defining the requirement) is not a contributor and should be excluded. Including non-contributing dimensions would artificially inflate the calculated tolerance. However, be careful to trace the complete loop — sometimes dimensions contribute through geometric relationships that are not immediately obvious, especially in 2D or 3D stack-ups.',
          hint: 'Only dimensions that are in the chain from one side of the gap to the other contribute to the stack-up.'
        },
        {
          id: 'u9-L4-Q18',
          type: 'multiple-choice',
          question: 'What is the "modified RSS" or "RSS with safety factor" method?',
          options: [
            'RSS applied only to the largest tolerances',
            'An RSS calculation multiplied by a correction factor (typically 1.2-1.5) to account for real-world deviations from the assumptions of perfectly normal, independent, centered distributions; it provides higher confidence than standard RSS while remaining less conservative than worst-case',
            'RSS applied only to the smallest tolerances',
            'A method that uses RSS for some dimensions and worst-case for others'
          ],
          correctIndex: 1,
          explanation: 'Standard RSS assumes ideal conditions that rarely exist perfectly in practice: perfectly normal distributions, statistical independence, centered processes. The modified RSS (or "inflated RSS") multiplies the RSS result by a factor (commonly called the "Bender correction factor" after its originator) to account for these deviations. A factor of 1.5 is common, giving approximately 99.9% coverage instead of 99.73%. The formula: T_total = k × sqrt(Σ Ti²), where k is the correction factor. This provides a practical middle ground between the under-prediction of standard RSS and the over-prediction of worst-case.',
          hint: 'RSS may be too optimistic, and worst-case too pessimistic — is there a middle ground?'
        },
        {
          id: 'u9-L4-Q19',
          type: 'multiple-choice',
          question: 'In a 2D tolerance analysis, what additional complexity arises compared to 1D?',
          options: [
            'There is no additional complexity — 2D is just two 1D analyses',
            'Angular dimensions create nonlinear contributions (sine/cosine effects), and a single dimension can contribute to both the X and Y components of the gap; sensitivity factors become geometry-dependent and may require vector analysis',
            '2D analysis can only be done with Monte Carlo simulation',
            'The tolerances are doubled in 2D'
          ],
          correctIndex: 1,
          explanation: 'In 2D stack-ups, dimensions at angles to the stack direction contribute through trigonometric functions. For example, a dimension at angle θ contributes L×cos(θ) in one direction and L×sin(θ) in the perpendicular direction. This means: (1) a tolerance on L creates variation in both X and Y directions; (2) a tolerance on the angle θ creates nonlinear variation in position (sensitivity depends on L); (3) contributions are vector quantities, not simple additions. Methods: vector loop analysis, GD&T tolerance analysis software, or Monte Carlo simulation. Most real assemblies involve 2D or 3D stack-ups, making 1D analysis a simplification.',
          hint: 'When dimensions are at angles, they contribute to the gap through sine and cosine — how does that change things?'
        },
        {
          id: 'u9-L4-Q20',
          type: 'multiple-choice',
          question: 'How does geometric tolerance (e.g., position, perpendicularity) factor into a tolerance stack-up analysis?',
          options: [
            'Geometric tolerances are never included in stack-ups — only dimensional tolerances count',
            'Geometric tolerances contribute to the stack-up as additional tolerance contributors; for example, the perpendicularity of a mating surface can cause a lever-arm effect, and position tolerance creates location variation that must be added to the dimensional stack',
            'Geometric tolerances reduce the stack-up total',
            'They are only included in RSS, not worst-case analysis'
          ],
          correctIndex: 1,
          explanation: 'Geometric tolerances are critical stack-up contributors that are often overlooked. Perpendicularity error on a mating face creates a lever-arm effect — at a distance L from the contact point, a perpendicularity error of t creates a linear variation of approximately t × (L/contact_length). Flatness error on datum surfaces causes rocking variation. Position tolerance on locating features (dowel holes) creates assembly shift. Profile tolerance on mating surfaces affects gap variation. A complete tolerance analysis must include both dimensional and geometric tolerance contributors, considering their sensitivity factors based on assembly geometry.',
          hint: 'If a mating surface is not perfectly perpendicular, what happens to features at the far end of the part?'
        },
        {
          id: 'u9-L4-Q21',
          type: 'fill-blank',
          question: 'A process capability index (Cpk) of 1.33 indicates that the process variation uses approximately _____% of the tolerance band.',
          acceptedAnswers: ['75', '75%'],
          explanation: 'Cpk = 1.33 means the process spread (6σ) occupies 75% of the tolerance band (6σ = 0.75 × tolerance width), and the process is centered. This corresponds to approximately 63 parts per million (ppm) defective. The relationship: at Cpk = 1.0, the process uses 100% of the tolerance (2700 ppm); at Cpk = 1.33, it uses 75% (63 ppm); at Cpk = 1.67, it uses 60% (0.6 ppm); at Cpk = 2.0, it uses 50% (0.002 ppm, which is Six Sigma). Many industries require Cpk ≥ 1.33 as a minimum for production processes, with safety-critical applications requiring higher values.',
          hint: 'At Cpk = 1.0, the process uses 100%. At Cpk = 1.33, what fraction is used?'
        },
        {
          id: 'u9-L4-Q22',
          type: 'multiple-choice',
          question: 'What is the fundamental advantage of designing an assembly with an adjustable feature (shim, spacer, or set screw) from a tolerance stack-up perspective?',
          options: [
            'It eliminates the need for any tolerances on the parts',
            'The adjustable feature absorbs the accumulated variation in the stack, effectively "breaking" the tolerance chain; this allows looser (cheaper) tolerances on the manufactured parts while still achieving the required assembly gap or alignment',
            'Adjustable features are always cheaper than tightening tolerances',
            'It makes the assembly easier to disassemble'
          ],
          correctIndex: 1,
          explanation: 'An adjustable feature (shim, selective spacer, set screw, adjustable cam) absorbs the cumulative variation from the tolerance chain at one location. This "breaks" the chain — the gap or alignment is set during assembly rather than being entirely determined by part dimensions. For example, if a 10-dimension stack has worst-case tolerance of ±0.5 mm, a shim can absorb that variation at assembly, allowing the use of standard (loose) tolerances on all parts. The trade-off: shim/spacer inventory, additional assembly labor, and possible field adjustment requirements. It is cost-effective when the number of contributors is large and tightening tolerances is expensive.',
          hint: 'If you can adjust one dimension at assembly time, do the other dimensions need to be as tightly controlled?'
        },
        {
          id: 'u9-L4-Q23',
          type: 'true-false',
          question: 'In a worst-case tolerance stack-up, the probability that all dimensions are simultaneously at their worst limits is very high for typical production processes.',
          correctAnswer: false,
          explanation: 'The probability that all dimensions are simultaneously at their worst limits is extremely low — it decreases exponentially with the number of dimensions. For n independent dimensions each with a 1% probability of being at the extreme, the probability of all being extreme simultaneously is (0.01)^n. For 5 dimensions: (0.01)^5 = 10^-10, essentially zero. This is why worst-case analysis is so conservative — it protects against a scenario that almost never occurs. RSS analysis exploits this statistical reality by combining tolerances quadratically, giving a more realistic (but not guaranteed) prediction of assembly variation.',
          hint: 'If each dimension has a small chance of being at the worst limit, what is the probability of ALL of them being there simultaneously?'
        },
        {
          id: 'u9-L4-Q24',
          type: 'multiple-choice',
          question: 'A tolerance chain involves dimensions across 3 different parts. If the parts are manufactured by different suppliers with different process capabilities, how does this affect the analysis?',
          options: [
            'Different suppliers have no effect — tolerances are tolerances',
            'The process capability (Cpk) of each supplier\'s dimensions should be considered; a supplier with Cpk = 2.0 produces much less variation than the tolerance band allows, making the assembly perform better than tolerance-based analysis predicts; conversely, a supplier at Cpk = 1.0 uses the full tolerance, making the assembly perform as predicted',
            'All suppliers must have the same Cpk for the analysis to be valid',
            'Supplier variation is only relevant for RSS, not worst-case'
          ],
          correctIndex: 1,
          explanation: 'Real manufacturing data shows that different suppliers and processes produce different distributions within the same tolerance band. A supplier with Cpk = 1.67 uses only 60% of the tolerance band, while one at Cpk = 1.0 uses 100%. When Cpk data is available, the RSS analysis can be refined by using actual process standard deviations (σ_actual = tolerance / (2 × 3 × Cpk)) instead of assuming the tolerance equals 6σ. This gives a more accurate prediction. Without Cpk data, the analyst must assume Cpk = 1.0 (worst assumption) or use a correction factor. This is why process capability studies are valuable inputs to tolerance analysis.',
          hint: 'If you know a supplier consistently makes parts much better than the tolerance requires, does that help your analysis?'
        },
        {
          id: 'u9-L4-Q25',
          type: 'multiple-choice',
          question: 'How do you determine whether a dimension is a "positive" or "negative" contributor in a 1D tolerance chain?',
          options: [
            'Positive dimensions are always the larger ones',
            'Trace a continuous path from one side of the gap to the other through all contributing parts; dimensions that point in the same direction as the gap measurement are positive contributors (they increase the gap as they increase); dimensions pointing opposite are negative contributors',
            'All dimensions from the first part are positive and all from the second part are negative',
            'Positive and negative assignment is arbitrary'
          ],
          correctIndex: 1,
          explanation: 'The sign convention follows from the dimension loop: start at one surface defining the gap, trace through each contributing dimension to the other surface. As you trace, assign positive to dimensions going in the "gap-opening" direction and negative to dimensions going in the "gap-closing" direction. A practical test: mentally increase a dimension — if the gap gets larger, it is positive; if the gap gets smaller, it is negative. Misidentifying signs is the most common error in tolerance analysis and flips the entire result. Always verify by checking that the nominal gap = sum of positives − sum of negatives.',
          hint: 'Increase each dimension mentally — does the gap get bigger (positive) or smaller (negative)?'
        },
        {
          id: 'u9-L4-Q26',
          type: 'multiple-choice',
          question: 'What is the relationship between the number of contributors in a stack-up and the benefit of using RSS vs. worst-case?',
          options: [
            'The benefit is constant regardless of the number of contributors',
            'As the number of contributors increases, the RSS result grows as the square root of n while worst-case grows linearly with n; therefore RSS becomes increasingly advantageous for long tolerance chains with many contributors',
            'RSS is better only for chains with fewer than 3 contributors',
            'More contributors always favor worst-case analysis'
          ],
          correctIndex: 1,
          explanation: 'For n equal tolerances (±t each): worst-case = n × t, RSS = sqrt(n) × t. The RSS/WC ratio = 1/sqrt(n). For n = 4, RSS is 50% of WC. For n = 9, RSS is 33% of WC. For n = 25, RSS is 20% of WC. This means RSS savings increase dramatically with chain length. For a stack-up with 25 contributors (not unusual in complex assemblies), RSS predicts only 20% of the worst-case value — allowing much looser (cheaper) individual tolerances. This is why statistical methods are especially valuable for complex multi-component assemblies.',
          hint: 'Compare how n (worst-case) grows versus sqrt(n) (RSS) as n increases.'
        },
        {
          id: 'u9-L4-Q27',
          type: 'true-false',
          question: 'RSS tolerance analysis is appropriate for assemblies consisting of only 2-3 parts with 2-3 contributing dimensions.',
          correctAnswer: false,
          explanation: 'RSS is based on the central limit theorem, which works best with many independent contributors. With only 2-3 contributors, the statistical averaging effect is minimal, and the RSS result is nearly the same as worst-case. More importantly, with so few parts, the probability of worst-case occurrence is not negligibly small (unlike with 10+ contributors). Additionally, the central limit theorem\'s assumption that the sum of random variables approaches a normal distribution requires many contributors to be reliable. For 2-3 part assemblies, worst-case analysis is typically more appropriate and barely more expensive to achieve.',
          hint: 'Does the central limit theorem work well with only 2-3 samples?'
        },
        {
          id: 'u9-L4-Q28',
          type: 'multiple-choice',
          question: 'How is a tolerance stack-up analysis documented in a professional engineering report?',
          options: [
            'Just report the final number — no documentation needed',
            'Document the assembly requirement, dimension loop sketch, each contributor with its nominal and tolerance, positive/negative sign, sensitivity factor, the analysis method used (WC/RSS/Monte Carlo), results, and conclusions with any recommended actions',
            'A single spreadsheet cell with the formula is sufficient',
            'Only document it if the customer requests it'
          ],
          correctIndex: 1,
          explanation: 'A professional tolerance analysis report includes: (1) Assembly requirement definition (what gap/clearance/interference must be controlled and its limits); (2) Dimension loop sketch showing every contributor and sign; (3) Tabulated data: each dimension with nominal value, tolerance, sign convention, sensitivity factor, and source (drawing number, revision); (4) Calculation method and results (WC, RSS, Monte Carlo with distributions); (5) Results compared to requirements; (6) Conclusions and recommendations. This documentation is essential for design reviews, ECOs (to evaluate the impact of tolerance changes), and manufacturing troubleshooting. Many companies have standard templates for tolerance analysis reports.',
          hint: 'Think about what someone reviewing your analysis in 5 years would need to understand and verify it.'
        },
        {
          id: 'u9-L4-Q29',
          type: 'fill-blank',
          question: 'When tolerance analysis shows the gap can become negative (parts interfere), one low-cost solution is to insert a selectable _____ between parts to absorb the variation.',
          acceptedAnswers: ['shim', 'Shim', 'spacer', 'Spacer'],
          explanation: 'Shims (or spacers) are thin plates of precise thickness used to fill gaps and absorb tolerance stack-up variation. During assembly, the actual gap is measured and the appropriate shim thickness is selected to achieve the target dimension. Shims effectively "break" the tolerance chain at one point, decoupling the accumulated variation from the assembly requirement. They are widely used in gearbox assemblies (bearing preload), machine tool alignments, aerospace structural joints, and engine assemblies. The trade-off is additional assembly time, shim inventory, and field maintenance complexity.',
          hint: 'This thin insert is selected at assembly time to fill the gap and absorb variation.'
        },
        {
          id: 'u9-L4-Q30',
          type: 'multiple-choice',
          question: 'What is the "virtual condition boundary" approach to tolerance stack-up, and how does it differ from traditional dimensional stack-up?',
          options: [
            'It is a 3D CAD visualization method',
            'Instead of stacking individual dimensional and geometric tolerances separately, it uses the virtual condition of each feature (size + geometric tolerance combined into a single boundary) as the contributor; this automatically accounts for MMC/LMC bonus tolerance and eliminates double-counting of size and geometric variation',
            'It ignores geometric tolerances entirely',
            'It is only applicable to position tolerances'
          ],
          correctIndex: 1,
          explanation: 'The virtual condition approach converts each feature into its worst-case boundary (virtual condition = MMC size ± geometric tolerance) and uses that boundary in the stack-up. For a shaft: VC = MMC + geometric tolerance at MMC. For a hole: VC = MMC − geometric tolerance at MMC. This simplifies the analysis because you do not need to separately account for size variation and geometric variation — they are combined into one number per feature. It also automatically handles bonus tolerance (since VC already represents the worst case). This approach aligns with functional gauge design and is particularly useful for position tolerance stack-ups in bolt-pattern assemblies.',
          hint: 'Instead of size and geometric tolerance as separate contributors, what if you combine them into one boundary per feature?'
        }
      ]
    },
    {
      id: 'u9-L5',
      title: 'Surface Finish & Metrology',
      description: 'Ra/Rz/Rq, surface lay symbols, CMM basics, profilometry, measurement uncertainty.',
      icon: '🔬',
      xpReward: 25,
      questions: [
        {
          id: 'u9-L5-Q1',
          type: 'multiple-choice',
          question: 'A drawing specifies Ra 0.8 on a hydraulic cylinder bore, but the seals still leak. The Ra measurement confirms the surface meets spec. What might the Ra value be missing, and what additional parameter would you check?',
          options: [
            'Ra is the only relevant surface parameter — the leak must be caused by something else entirely',
            'Ra averages out the profile and can hide deep scratches or isolated peaks; check Rz (average max peak-to-valley height) or Rmax (single largest peak-to-valley), as isolated deep valleys create leak paths that Ra cannot detect',
            'The surface is too smooth — increase Ra to allow the seal to grip better',
            'Ra measurement was taken in the wrong direction — re-measure perpendicular to the lay'
          ],
          correctIndex: 1,
          explanation: 'Ra (arithmetic average roughness) is a statistical average that can mask extreme features. Two surfaces with identical Ra can have very different Rz values — one may have a uniform profile while the other has deep isolated scratches that create leak paths. For sealing surfaces, Rz (or Rmax) is critical because a single deep valley can provide a continuous leak channel. Best practice for seal surfaces: specify both Ra and Rz (e.g., Ra ≤ 0.4 and Rz ≤ 2.5). Additionally, the lay direction matters — circumferential lay (from honing) is preferred for reciprocating seals because it does not create axial leak paths.',
          hint: 'Think about what kind of surface feature would allow fluid to bypass a seal, and whether Ra can detect it.'
        },
        {
          id: 'u9-L5-Q2',
          type: 'multiple-choice',
          question: 'Which surface roughness parameter is preferred for sealing surfaces because it better characterizes the peak heights that affect seal contact?',
          options: [
            'Ra (arithmetic average)',
            'Rz (average maximum height)',
            'Rq (root mean square)',
            'Rsk (skewness)'
          ],
          correctIndex: 1,
          explanation: 'Rz (average of the maximum peak-to-valley heights in each sampling length) is preferred for sealing surfaces because it captures the extreme deviations that affect seal contact and leakage. Ra averages out these extremes and can miss isolated deep valleys or high peaks. A surface with Ra 0.8 could have Rz values ranging from 4 to 12 depending on the process. For O-ring and lip seal surfaces, both Ra and Rz are typically specified (e.g., Ra ≤ 0.4 and Rz ≤ 2.5).',
          hint: 'Seals are affected by the tallest peaks and deepest valleys, not just the average roughness.'
        },
        {
          id: 'u9-L5-Q3',
          type: 'multiple-choice',
          question: 'Your CMM reports a flatness of 0.012 mm for a datum surface, but the CMM probed only 9 points on a 200 mm x 200 mm surface. A colleague argues this result may not be reliable. Are they right, and why?',
          options: [
            'They are wrong — 9 points is sufficient for any flatness measurement',
            'They are right — 9 points on a large surface may miss local deviations between probe points; increasing point density (or using a scanning probe) gives a more complete picture of the actual surface form, and the reported flatness could understate the true value',
            'Point count does not matter because the CMM software interpolates between points perfectly',
            'They are right, but only because the CMM probe tip radius was too large'
          ],
          correctIndex: 1,
          explanation: 'CMM measurements are only as good as the sampling strategy. With 9 points on a 200 mm x 200 mm surface, the average spacing is ~67 mm — any waviness, local high spots, or low spots between probe points are invisible. The reported flatness is the flatness of the 9-point sample, not the actual surface. Increasing to 25-50+ points, or using a continuous scanning probe, dramatically improves measurement confidence. ISO 12781 (flatness) and ASME B89.3.1 provide guidance on minimum point counts. This is a critical concept: measurement sampling strategy directly affects the reliability of reported tolerances.',
          hint: 'Can 9 discrete points fully represent the shape of a 200 mm x 200 mm surface?'
        },
        {
          id: 'u9-L5-Q4',
          type: 'multiple-choice',
          question: 'The surface lay symbol "⊥" on a drawing indicates that the surface texture pattern (lay) is:',
          options: [
            'Parallel to the surface boundary line',
            'Perpendicular to the surface boundary line',
            'Multi-directional (no dominant direction)',
            'Circular relative to the center of the surface'
          ],
          correctIndex: 1,
          explanation: 'The lay symbol "⊥" indicates the predominant surface pattern runs perpendicular to the boundary line (the edge of the surface as viewed on the drawing). Lay is the directional pattern left by the manufacturing process — for example, turning creates circumferential lay (symbolized "C"), face milling creates parallel lay ("=" or "⊥" depending on feed direction), and lapping creates multi-directional lay ("M"). Lay direction affects seal performance, friction, and coating adhesion.',
          hint: 'This symbol shows the direction of the machining marks relative to the drawing view edge.'
        },
        {
          id: 'u9-L5-Q5',
          type: 'multiple-choice',
          question: 'A measurement instrument has an uncertainty of ±0.005 mm. According to the common 10:1 (or at minimum 4:1) gauge maker\'s rule, what is the tightest tolerance this instrument should be used to inspect?',
          options: [
            '±0.005 mm',
            '±0.010 mm',
            '±0.020 mm',
            '±0.050 mm'
          ],
          correctIndex: 2,
          explanation: 'The gauge maker\'s rule (gauge R&R principle) recommends that measurement uncertainty should be at most 1/4 to 1/10 of the tolerance being inspected. With ±0.005 mm uncertainty: minimum tolerance = 4 × 0.005 = 0.020 mm (at 4:1 ratio). At 10:1, the minimum tolerance would be 0.050 mm. Using an instrument too close to the tolerance leads to excessive Type I (rejecting good parts) and Type II (accepting bad parts) errors. This is formalized in ASME B89 and ISO 14253 measurement uncertainty standards.',
          hint: 'The measurement uncertainty should consume no more than 10-25% of the tolerance band.'
        },
        {
          id: 'u9-L5-Q6',
          type: 'multiple-choice',
          question: 'You discover a tolerance on a legacy drawing that seems unnecessarily tight — Ra 0.2 on a non-sealing, non-bearing surface that is hidden inside an enclosure. How do you handle it?',
          options: [
            'Just change it to Ra 3.2 and notify manufacturing — it is obviously a mistake',
            'Leave it as-is to avoid any risk — if it has worked for years, do not change it',
            'Investigate the design intent by reviewing assembly context, service history, and talking to the original designer if possible; if no functional reason is found, propose a change through the formal ECR/ECO process with documented justification and ensure affected BOMs and inspection plans are updated',
            'Ask manufacturing to ignore it and machine to whatever finish is convenient'
          ],
          correctIndex: 2,
          explanation: 'Tight tolerances on legacy drawings may exist for a reason not obvious from the drawing alone (e.g., a past failure that drove the change, a customer requirement, a coating adhesion need). Changing without investigation risks reintroducing a solved problem. The proper approach: (1) Research — check ECO history, talk to original designer, review assembly. (2) If no functional reason is found, document the rationale for relaxation. (3) Submit a formal ECR with cost savings analysis. (4) After approval, update the drawing, inspection plan, and any affected documents through the ECO process. Never make undocumented tolerance changes — they create configuration control problems.',
          hint: 'Legacy drawings may have hidden reasons for tight tolerances. What is the safe, professional process for changing them?'
        },
        {
          id: 'u9-L5-Q7',
          type: 'multiple-choice',
          question: 'What is the difference between Ra and Rq (RMS roughness)?',
          options: [
            'They are identical measurements with different names',
            'Ra is the arithmetic average of the absolute deviations from the mean line, while Rq is the root mean square of the deviations; Rq gives more weight to extreme values (peaks and valleys) and is approximately 1.11× Ra for a sinusoidal profile and 1.25× Ra for a random (Gaussian) profile',
            'Rq is always exactly twice Ra',
            'Ra is used in the US and Rq is used in Europe'
          ],
          correctIndex: 1,
          explanation: 'Ra = (1/L)∫|Z(x)|dx (average of absolute deviations). Rq = sqrt((1/L)∫Z(x)²dx) (root mean square of deviations). Because Rq squares the deviations before averaging, large deviations have a disproportionate effect, making Rq more sensitive to peaks and valleys than Ra. For a perfectly sinusoidal profile, Rq = 1.11 × Ra. For a random Gaussian profile (typical of machined surfaces), Rq ≈ 1.25 × Ra. Rq is preferred in optical applications and semiconductor manufacturing because it correlates better with scattering and functional performance. Ra remains dominant in general mechanical engineering.',
          hint: 'One averages absolute values, the other squares before averaging — which gives more weight to extremes?'
        },
        {
          id: 'u9-L5-Q8',
          type: 'multiple-choice',
          question: 'What is the "cutoff length" (λc) in surface roughness measurement, and why is it important?',
          options: [
            'The maximum length of the surface that can be measured',
            'The filter wavelength that separates roughness from waviness; it determines which spatial frequencies are included in the roughness measurement; choosing the wrong cutoff can artificially inflate or suppress the measured roughness value',
            'The distance between the probe tip and the surface',
            'The minimum feature size the probe can detect'
          ],
          correctIndex: 1,
          explanation: 'The cutoff length (λc) is a high-pass filter that separates short-wavelength roughness from long-wavelength waviness. Standard cutoff values are 0.08, 0.25, 0.8, 2.5, and 8 mm. A shorter cutoff filters out more of the profile, giving a lower roughness reading. A longer cutoff includes more waviness, giving a higher reading. ISO 4288 provides rules for selecting the appropriate cutoff based on expected Ra value. For Ra 0.1-2.0 μm, the default cutoff is 0.8 mm. Using the wrong cutoff can cause valid parts to fail inspection or bad parts to pass. The evaluation length is typically 5× the cutoff length.',
          hint: 'The filter setting determines which surface features are counted as "roughness" vs. "waviness."'
        },
        {
          id: 'u9-L5-Q9',
          type: 'true-false',
          question: 'A surface with Ra 0.4 μm is always smoother than a surface with Ra 0.8 μm in terms of functional performance.',
          correctAnswer: false,
          explanation: 'Ra alone does not determine functional performance. A surface with Ra 0.4 might have deep isolated scratches (high Rz) that cause sealing problems, while a surface with Ra 0.8 might have a very uniform texture with no deep defects. Additionally, "smoother is better" is not universally true — some applications require a specific roughness range. For example, bearing surfaces need enough roughness to retain oil (too smooth = oil film starvation = scuffing), and bonding/coating surfaces need roughness for adhesion. Functional performance depends on the complete surface texture (Ra, Rz, Rsk, Rku, lay) and the specific application.',
          hint: 'Does a lower Ra number always mean better performance? Think about oil retention and adhesion.'
        },
        {
          id: 'u9-L5-Q10',
          type: 'multiple-choice',
          question: 'What surface roughness parameter describes the asymmetry of the profile — whether the surface has more peaks or more valleys?',
          options: [
            'Ra (arithmetic average)',
            'Rz (maximum height)',
            'Rsk (skewness)',
            'Rq (RMS roughness)'
          ],
          correctIndex: 2,
          explanation: 'Rsk (skewness) measures the asymmetry of the surface profile height distribution. Rsk = 0 indicates a symmetric (Gaussian) profile. Rsk < 0 (negative skewness) indicates a surface with valleys predominating (plateau-like surface, good for bearing — e.g., honed cylinder liners). Rsk > 0 (positive skewness) indicates peaks predominating (spiky surface, poor for bearing). Rsk is critical for functional surfaces: engine cylinder liners require negative Rsk (plateau hone) to provide oil-retaining valleys below a smooth bearing surface. Rsk, combined with Rku (kurtosis), provides a much better functional description than Ra alone.',
          hint: 'This parameter tells you whether the surface texture is "peaky" or "valley-heavy."'
        },
        {
          id: 'u9-L5-Q11',
          type: 'multiple-choice',
          question: 'What is a CMM (Coordinate Measuring Machine) and what are its main advantages for GD&T inspection?',
          options: [
            'A hand tool for measuring surface roughness',
            'A precision 3D measurement system that probes discrete points on a part surface and computes geometric features; it can evaluate all 14 geometric tolerances, simulate datum reference frames, and measure features inaccessible to conventional gauges',
            'A visual inspection camera system',
            'A machine that measures only linear dimensions'
          ],
          correctIndex: 1,
          explanation: 'A CMM uses a precision touch-trigger or scanning probe mounted on a 3-axis (or 5-axis) motion system to capture coordinate data (X, Y, Z) of points on a part surface. Software then fits geometric elements (planes, cylinders, spheres, cones) to the data and computes geometric tolerances. Advantages: (1) measures complex 3D geometry; (2) evaluates all GD&T callouts including position, profile, runout; (3) simulates datum reference frames programmatically; (4) provides measurement reports with statistical data; (5) programmable for repeat measurements. Limitations: sampling-based (can miss features between points), temperature-sensitive, requires skilled programming, and slower than dedicated gauges for high-volume inspection.',
          hint: 'This machine captures 3D coordinate data and computes geometric tolerances from the points.'
        },
        {
          id: 'u9-L5-Q12',
          type: 'multiple-choice',
          question: 'What is measurement uncertainty, and why must it be considered when accepting or rejecting parts?',
          options: [
            'Measurement uncertainty is the operator\'s doubt about whether the measurement is correct',
            'Measurement uncertainty is the quantified range within which the true value is expected to lie; per ISO 14253, when a measurement result is near the tolerance limit, uncertainty determines whether the part can be confidently accepted or rejected — a part measuring 0.002 mm inside the limit with ±0.005 mm uncertainty cannot be reliably accepted or rejected',
            'Measurement uncertainty is eliminated by using digital readouts',
            'It only applies to manual measurements, not automated ones'
          ],
          correctIndex: 1,
          explanation: 'Measurement uncertainty is an inherent property of every measurement, arising from the instrument, method, environment, and operator. ISO 14253-1 defines decision rules: a part is conforming only if the measurement plus uncertainty is within tolerance, and non-conforming only if the measurement minus uncertainty is outside tolerance. The "guard band" (zone of uncertainty near the tolerance limit) creates an ambiguous zone where parts cannot be confidently accepted or rejected. Reducing uncertainty (better instruments, controlled environment, improved methods) shrinks this zone. Every measurement result should be reported with its associated uncertainty.',
          hint: 'If your measurement is right at the tolerance limit and your instrument has uncertainty, can you trust the result?'
        },
        {
          id: 'u9-L5-Q13',
          type: 'fill-blank',
          question: 'The surface roughness parameter Rz measures the average maximum peak-to-_____ height over the evaluation length.',
          acceptedAnswers: ['valley', 'Valley', 'trough'],
          explanation: 'Rz is defined as the average of the individual maximum peak-to-valley heights (Rzi) measured in each of the five sampling lengths within the evaluation length: Rz = (Rz1 + Rz2 + Rz3 + Rz4 + Rz5) / 5. Each Rzi is the vertical distance from the highest peak to the deepest valley within that sampling length. Unlike Ra, which averages all deviations, Rz captures the extreme heights, making it more representative of features like seal contact, coating thickness requirements, and fatigue crack initiation sites. Typical ratio: Rz ≈ 4-7 × Ra for most machined surfaces.',
          hint: 'Rz measures the extreme heights — from the tallest peak down to the deepest ___.'
        },
        {
          id: 'u9-L5-Q14',
          type: 'multiple-choice',
          question: 'What are the typical surface roughness values (Ra) achievable by common manufacturing processes?',
          options: [
            'All machining processes achieve the same roughness',
            'Lapping: 0.025-0.1 μm; grinding: 0.1-0.8 μm; turning: 0.4-6.3 μm; milling: 0.8-6.3 μm; drilling: 1.6-6.3 μm; sand casting: 12.5-25 μm',
            'Every process can achieve any roughness with the right parameters',
            'Surface roughness depends only on the cutting tool, not the process'
          ],
          correctIndex: 1,
          explanation: 'Each manufacturing process has a characteristic roughness range determined by the physics of material removal: lapping/polishing (0.012-0.1 μm) uses fine abrasive in a random pattern; grinding (0.1-0.8 μm) uses a bonded abrasive wheel; precision turning/boring (0.4-3.2 μm) uses a single-point tool; milling (0.8-6.3 μm) uses rotating multi-point cutters; drilling (1.6-6.3 μm) uses a twist drill; sand casting (12.5-25 μm) has grain imprint. Specifying a roughness tighter than the planned process can achieve forces additional operations (e.g., specifying Ra 0.2 on a milled surface requires adding a grinding step), increasing cost.',
          hint: 'Each process has physical limits — think about the tool-workpiece interaction and its inherent roughness.'
        },
        {
          id: 'u9-L5-Q15',
          type: 'multiple-choice',
          question: 'Why is temperature control critical in a metrology laboratory, and what is the standard reference temperature?',
          options: [
            'Temperature does not affect measurements if the instruments are calibrated',
            'The standard reference temperature is 20°C (68°F); all calibrated dimensions and tolerances assume this temperature because thermal expansion changes part dimensions — a 500 mm steel part at 25°C is approximately 0.030 mm longer than at 20°C, which can exceed tight tolerances',
            'The standard is 25°C because it is more comfortable for operators',
            'Temperature only matters for plastic parts, not metals'
          ],
          correctIndex: 1,
          explanation: 'ISO 1 defines 20°C as the standard reference temperature for dimensional measurements. At other temperatures, thermal expansion changes part dimensions: ΔL = α × L × ΔT. For steel (α ≈ 12 × 10⁻⁶/°C), a 500 mm part at 25°C (5°C above reference): ΔL = 12e-6 × 500 × 5 = 0.030 mm. For aluminum (α ≈ 23 × 10⁻⁶/°C), the same conditions give 0.058 mm. When measuring parts with tolerances of 0.01-0.05 mm, these thermal errors are significant. Precision metrology labs control temperature to ±0.5°C or ±1°C. If temperature cannot be controlled, corrections using known CTE values must be applied.',
          hint: 'If a steel part expands 12 μm/m per °C, how much does a 500 mm part change with a 5°C error?'
        },
        {
          id: 'u9-L5-Q16',
          type: 'true-false',
          question: 'A surface profilometer (stylus instrument) measures the same characteristics as a CMM — they are interchangeable for GD&T inspection.',
          correctAnswer: false,
          explanation: 'A surface profilometer measures surface texture (roughness, waviness) by tracing a very fine stylus (typically 2-5 μm tip radius) along the surface. It captures high-frequency surface detail but only along a single line. A CMM measures geometric form and dimensions by probing discrete points with a larger stylus (typically 0.5-5 mm tip radius). The CMM captures macro-geometry (flatness, position, size) but cannot resolve surface roughness. They are complementary tools: use a profilometer for Ra, Rz, Rq measurements, and a CMM for dimensional and geometric tolerance evaluation. Some modern systems combine both capabilities, but standard instruments serve different purposes.',
          hint: 'One measures micro-geometry (roughness), the other measures macro-geometry (form and dimensions).'
        },
        {
          id: 'u9-L5-Q17',
          type: 'multiple-choice',
          question: 'What is the "lay" of a surface, and why does it matter functionally?',
          options: [
            'Lay is another name for surface roughness',
            'Lay is the predominant directional pattern of the surface texture, determined by the manufacturing process; it matters because it affects friction (directional), seal performance (leak paths), oil retention (pattern), coating adhesion, and aesthetic appearance',
            'Lay only matters for painted surfaces',
            'Lay is the depth of the deepest valley on the surface'
          ],
          correctIndex: 1,
          explanation: 'Lay is the directional pattern of the surface texture — the orientation of machining marks. Common lay patterns: parallel (=, from shaping/milling), perpendicular (⊥, from face milling), crossed (X, from honing), circular (C, from facing/turning), radial (R, from disk grinding), multi-directional (M, from lapping), and particulate (P, from EDM/shot blasting). Functional effects: (1) friction is lower when sliding parallel to the lay; (2) seals perform better when the lay is perpendicular to the leak path (circular lay for reciprocating seals); (3) crossed hone marks (plateau hone) retain oil in engine cylinders; (4) paint adhesion may prefer multi-directional lay.',
          hint: 'The direction of machining marks affects how the surface interacts with seals, lubricants, and mating parts.'
        },
        {
          id: 'u9-L5-Q18',
          type: 'multiple-choice',
          question: 'What is gauge R&R (Repeatability and Reproducibility), and what is an acceptable result?',
          options: [
            'A test to verify that gauges are in calibration',
            'A study that quantifies the measurement variation due to the gauge (repeatability — same operator, same part, multiple measurements) and the operator (reproducibility — different operators, same part); measurement system variation should be less than 10% of the tolerance for an acceptable system, 10-30% is marginal, and over 30% is unacceptable',
            'A method to repair damaged gauges',
            'A comparison between two different gauge brands'
          ],
          correctIndex: 1,
          explanation: 'Gauge R&R (per AIAG MSA manual) decomposes total measurement variation into: repeatability (equipment variation — same operator measuring the same part gets different readings), reproducibility (appraiser variation — different operators measuring the same part get different readings), and part-to-part variation. The key metric is %GRR = (gauge R&R variation / total variation) × 100. Below 10%: acceptable measurement system. 10-30%: may be acceptable depending on application, with improvement actions. Above 30%: unacceptable — the measurement system contributes too much variation. A failed gauge R&R means inspection results are unreliable for controlling the process.',
          hint: 'If different operators get different results measuring the same part, is the measurement system reliable?'
        },
        {
          id: 'u9-L5-Q19',
          type: 'fill-blank',
          question: 'The standard reference temperature for dimensional measurement, defined by ISO 1, is _____ °C.',
          acceptedAnswers: ['20', '20°C'],
          explanation: '20°C (68°F) is the international standard reference temperature for industrial length measurements, established by ISO 1. All calibrated length standards (gauge blocks, ring gauges, plug gauges) are certified at this temperature. When measurements are made at different temperatures, corrections using the coefficient of thermal expansion must be applied. The choice of 20°C was a compromise — close to typical indoor temperatures in industrialized countries while being practical for temperature-controlled laboratories. This standard ensures dimensional traceability across different locations, times, and measuring equipment worldwide.',
          hint: 'This temperature is the universal reference for dimensional metrology — slightly below typical room temperature.'
        },
        {
          id: 'u9-L5-Q20',
          type: 'multiple-choice',
          question: 'What is an optical comparator (profile projector), and what types of features is it best suited to inspect?',
          options: [
            'A device that compares two parts side by side visually',
            'An instrument that projects a magnified shadow (silhouette) of a part onto a screen where it can be compared to an overlay chart or measured with crosshairs; ideal for inspecting 2D profiles, thread forms, small part features, radii, angles, and edge conditions that are difficult to probe with contact methods',
            'A camera that takes photos for visual inspection records',
            'A precision scale for comparing part weights'
          ],
          correctIndex: 1,
          explanation: 'An optical comparator magnifies the part shadow (typically 10x-100x) onto a screen. The operator overlays a template or uses digital crosshairs/software to measure features. Best applications: (1) thread profiles (form and pitch); (2) small stamped or machined parts; (3) radii and edge conditions; (4) cross-sections of extrusions; (5) features too small or delicate for CMM probing. Limitations: measures only the 2D silhouette (cannot inspect internal features), affected by burrs and debris on edges, limited accuracy compared to CMM for position measurements, and operator-dependent for manual comparison. Digital/video comparators with edge-detection software improve accuracy and reduce operator influence.',
          hint: 'This instrument uses a magnified shadow to inspect 2D profiles of small or intricate parts.'
        },
        {
          id: 'u9-L5-Q21',
          type: 'true-false',
          question: 'When specifying surface roughness on a drawing, the roughness value always represents the maximum allowable roughness — the actual surface must be equal to or better (smoother) than the specified value.',
          correctAnswer: true,
          explanation: 'Per ISO 1302 and ASME Y14.36M, the surface roughness value on a drawing is an upper limit (maximum allowable) by default. The actual surface must have roughness equal to or less than (smoother than) the specified value. If a minimum roughness is also required (e.g., for oil retention), the drawing must specify both maximum and minimum values using the appropriate surface finish symbol. For example, if a bearing journal needs Ra between 0.2 and 0.8 μm, both limits must be shown. Specifying only Ra 0.8 allows the manufacturer to make the surface as smooth as they want — which might be too smooth for oil retention.',
          hint: 'If a drawing says Ra 1.6, can you deliver Ra 0.8? What about Ra 3.2?'
        },
        {
          id: 'u9-L5-Q22',
          type: 'multiple-choice',
          question: 'What is the relationship between surface roughness and fatigue life?',
          options: [
            'Surface roughness has no effect on fatigue life',
            'Rougher surfaces have lower fatigue life because surface valleys act as stress concentrators (micro-notches) that initiate fatigue cracks; polishing or shot peening critical surfaces can significantly improve fatigue strength',
            'Smoother surfaces always have shorter fatigue life',
            'Fatigue life depends only on material properties, not surface condition'
          ],
          correctIndex: 1,
          explanation: 'Surface roughness directly affects fatigue life through two mechanisms: (1) valleys and scratches act as stress concentrators (micro-notches) that raise local stress and initiate fatigue cracks; (2) the process that creates the roughness may also introduce tensile residual stresses (e.g., aggressive machining) that further reduce fatigue resistance. Polishing reduces notch effects. Shot peening introduces compressive residual stress that counteracts crack initiation. For highly stressed rotating components (shafts, turbine blades), surface finish specifications are driven by fatigue requirements. The surface finish factor (ka) in fatigue calculations quantifies this effect: ka ranges from ~1.0 for polished surfaces to ~0.3 for as-forged surfaces.',
          hint: 'What happens at a microscopic scratch when cyclic stress is applied millions of times?'
        },
        {
          id: 'u9-L5-Q23',
          type: 'multiple-choice',
          question: 'A manufacturing process has been changed from turning to grinding for a critical diameter. Both processes achieve the specified Ra value. Should any additional surface characteristics be verified?',
          options: [
            'No — if Ra is met, the surfaces are equivalent',
            'Yes — verify residual stress (grinding can cause tensile residual stress or grinding burn), Rz/Rmax (different peak/valley characteristics), surface integrity (metallurgical changes like white layer or temper burns), and lay direction (circumferential for turning vs. typically axial for cylindrical grinding)',
            'Only verify the dimensional tolerance, not surface properties',
            'Grinding is always superior to turning so no additional checks are needed'
          ],
          correctIndex: 1,
          explanation: 'Changing the manufacturing process changes far more than just Ra. Grinding can cause: (1) grinding burn (thermal damage causing rehardening or tempering, detectable by acid etch or Barkhausen noise testing); (2) tensile residual stress from thermal effects (reduces fatigue life); (3) different Rz characteristics (grinding typically has lower Rz/Ra ratio than turning); (4) different lay direction (affects lubrication and seal performance); (5) possible surface cracks from thermal shock. Proper process validation requires checking surface integrity (metallography, residual stress measurement, acid etch testing) beyond simple roughness measurement. AGMA and aerospace standards mandate these checks.',
          hint: 'Ra is the same, but is the metallurgical condition of the surface the same?'
        },
        {
          id: 'u9-L5-Q24',
          type: 'multiple-choice',
          question: 'What is Abbe\'s principle in metrology, and why does violating it cause measurement error?',
          options: [
            'The principle that measurements should always be taken at 20°C',
            'The principle that the measurement axis should be collinear with (on the same line as) the feature being measured; if the measuring scale is offset from the feature axis, any angular error (cosine error or Abbe error) in the instrument causes a proportional measurement error that increases with the offset distance',
            'The principle that digital instruments are more accurate than analog ones',
            'The principle that two measurements should always be averaged'
          ],
          correctIndex: 1,
          explanation: 'Abbe\'s principle states that the measuring scale and the dimension being measured should be collinear. When they are offset by a distance d, any angular error α in the guideways or structure causes a first-order measurement error of d × sin(α) ≈ d × α (for small angles). A micrometer follows Abbe\'s principle (scale is on the measurement axis). A caliper violates it (the scale is offset from the jaws), which is one reason micrometers are more accurate than calipers. CMMs also violate Abbe\'s principle in most configurations, which is compensated through error mapping and software correction.',
          hint: 'If the ruler is not on the same line as what you are measuring, angular errors create proportional measurement errors.'
        },
        {
          id: 'u9-L5-Q25',
          type: 'fill-blank',
          question: 'The surface lay symbol "C" indicates a _____ lay pattern, typically produced by turning or facing operations.',
          acceptedAnswers: ['circular', 'Circular'],
          explanation: 'The "C" lay symbol indicates concentric circular marks centered on the feature axis, characteristic of turning, facing, and boring operations. The tool feeds linearly while the workpiece rotates, creating circular grooves. Circular lay is desirable for: (1) reciprocating seal surfaces (the grooves do not create axial leak paths); (2) thrust bearing surfaces (grooves distribute lubricant evenly). Other lay symbols: "=" parallel, "⊥" perpendicular, "X" crossed (honing), "M" multi-directional (lapping), "R" radial, "P" particulate (non-directional, from EDM or shot blast).',
          hint: 'Turning creates concentric ring-shaped marks — what geometric pattern is that?'
        },
        {
          id: 'u9-L5-Q26',
          type: 'multiple-choice',
          question: 'What is a "go/no-go gauge" and what is its advantage over variable measurement instruments for production inspection?',
          options: [
            'A gauge that can measure dimensions to high precision',
            'A fixed-size gauge that checks only whether a feature is within tolerance (go = passes through/fits, no-go = does not pass through/fit); it is faster, requires less operator skill, provides unambiguous accept/reject decisions, and is ideal for high-volume production where measuring actual size is unnecessary',
            'A gauge that measures both surface roughness and dimensions',
            'A type of CMM program'
          ],
          correctIndex: 1,
          explanation: 'Go/no-go gauges (attribute gauges) are fixed-limit gauges that verify a feature is within tolerance without measuring the actual value. For a bore: the "go" plug gauge (at MMC) must pass through entirely, and the "no-go" plug gauge (at LMC) must not enter. For a shaft: the "go" ring gauge (at MMC) must slide over, and the "no-go" ring gauge (at LMC) must not. Advantages: fast (seconds vs. minutes), no operator skill needed, no measurement uncertainty in the pass/fail decision, and low cost per inspection. Limitations: does not provide actual measured values, so SPC (statistical process control) charts cannot be populated from gauge data.',
          hint: 'For high-volume production, do you need to know the actual dimension, or just whether it passes?'
        },
        {
          id: 'u9-L5-Q27',
          type: 'multiple-choice',
          question: 'A surface finish symbol on a drawing has a circle in the V-notch (similar to the basic symbol but with an open circle). What does this indicate?',
          options: [
            'The surface must be machined',
            'The surface must not be machined — it must remain in the as-manufactured state (as-cast, as-forged, as-molded) with the specified roughness applying to the unprocessed surface',
            'The surface requires electrical discharge machining (EDM)',
            'The roughness applies only to the first article, not production parts'
          ],
          correctIndex: 1,
          explanation: 'Per ISO 1302, the circle in the V-notch (open triangle) of the surface texture symbol indicates that the surface must be obtained by a non-material-removal process — meaning no machining is allowed. The surface must remain in its original manufactured state (casting, forging, molding, rolling). If the symbol has a bar across the top of the V (closed triangle), it means material removal (machining) is required. If the symbol has neither (plain V), any method is acceptable. This distinction is important for cost control (avoiding unnecessary machining) and for functional reasons (maintaining a cast skin or rolled surface).',
          hint: 'The circle signifies "no removal" — the surface stays as-produced by the primary manufacturing process.'
        },
        {
          id: 'u9-L5-Q28',
          type: 'true-false',
          question: 'Gauge blocks (Johansson blocks) can be combined by wringing to create custom lengths with accuracy better than 0.1 μm.',
          correctAnswer: true,
          explanation: 'Gauge blocks are precision ground and lapped metal (or ceramic) blocks with faces so flat and smooth that they adhere by "wringing" — a combination of molecular attraction, atmospheric pressure, and thin-film surface tension. When wrung together, the junction contributes virtually zero length error (< 0.01 μm per junction for Grade K blocks). A set of 87 blocks (standard metric set) can produce over 100,000 different lengths in 0.5 μm increments. Grade 0 gauge blocks have length tolerance of ±0.10 μm for a 25 mm block. They serve as primary length standards, are used to calibrate other instruments, and to set up dial indicators and comparators.',
          hint: 'Gauge blocks are the primary physical length standards in metrology — they can be combined with sub-micron accuracy.'
        },
        {
          id: 'u9-L5-Q29',
          type: 'multiple-choice',
          question: 'What is the difference between a contact (stylus) profilometer and a non-contact (optical) profilometer?',
          options: [
            'They measure completely different things and cannot be compared',
            'A stylus profilometer drags a diamond tip across the surface (physical contact), while an optical profilometer uses light (laser, white light interferometry, confocal) without touching the surface; optical methods are faster, non-destructive, and can measure 3D surface topography (areal parameters like Sa, Sz) rather than just 2D profiles',
            'Optical profilometers are always more accurate',
            'Stylus profilometers can only measure Ra, not Rz'
          ],
          correctIndex: 1,
          explanation: 'Stylus profilometers trace a diamond tip (typically 2-5 μm radius, 60° or 90° cone angle) across the surface, measuring the vertical displacement as a 2D profile. Advantages: well-established, traceable standards, works on most materials. Limitations: can scratch soft surfaces, measures only a line, slow. Optical profilometers use light-based methods (white light interferometry, confocal microscopy, laser scanning) to capture surface height data without contact. Advantages: non-destructive, 3D area measurement (enabling areal parameters like Sa, Sq, Sz per ISO 25178), much faster, can measure soft/delicate surfaces. Limitations: sensitive to surface optical properties (reflectivity, transparency), may have different results on steep slopes.',
          hint: 'One touches the surface with a sharp tip; the other uses light to map the surface without contact.'
        },
        {
          id: 'u9-L5-Q30',
          type: 'multiple-choice',
          question: 'What is the significance of the "Bearing Area Curve" (Abbott-Firestone curve, also called the material ratio curve) for functional surface characterization?',
          options: [
            'It only applies to bearing surfaces and is irrelevant for other applications',
            'It plots the percentage of the surface that would be in contact (material ratio) at each height level of the profile, providing insight into how the surface will wear in, retain lubricant, and support load; it is far more informative than Ra alone for predicting functional behavior of sliding, sealing, and bearing surfaces',
            'It is only used in research, not in industry',
            'It is the same as the Rz measurement plotted differently'
          ],
          correctIndex: 1,
          explanation: 'The Abbott-Firestone (bearing area) curve is generated by slicing the surface profile at successively deeper levels and plotting the material ratio (percentage of the profile at or above that level) vs. height. It reveals: (1) Rpk (reduced peak height) — the peaks that will wear off during running-in; (2) Rk (core roughness) — the stable bearing surface after running-in; (3) Rvk (reduced valley depth) — the valleys that retain oil. This is the basis for the Rk parameter system (ISO 13565-2), widely used for engine cylinder liners, hydraulic components, and bearing surfaces. It directly predicts how the surface will function under sliding contact, far beyond what Ra, Rz, or Rq alone can reveal.',
          hint: 'If you slice the surface profile horizontally, how much material is in contact at each depth level?'
        }
      ]
    }
  ]
};
