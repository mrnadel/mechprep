import type { Lesson } from '../types';

export const lesson7: Lesson = {
  id: 'u7-L7',
  title: 'Everyday Failures',
  description:
    'Why pipes burst, bolts loosen, chains break, and tires blow out — real-world failure analysis through everyday objects.',
  icon: '💥',
  xpReward: 25,
  questions: [
    // ── MC 1 – Frozen Pipe Burst ──────────────────────────────────────
    {
      id: 'u7-L7-Q1',
      type: 'multiple-choice',
      question:
        'A copper water pipe bursts during a winter freeze. What is the primary mechanical cause of the failure?',
      options: [
        'Water expands ~9 % when it freezes, generating hoop stress that exceeds the pipe\'s yield strength',
        'Ice contracts and pulls the pipe apart in tension',
        'Copper becomes brittle at low temperatures and shatters',
        'Thermal contraction of the pipe wall crushes the ice and rebounds',
      ],
      diagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="8" fill="#58CC02" opacity="0.08"/><circle cx="40" cy="40" r="22" stroke="#3B8700" stroke-width="2.5"/><circle cx="40" cy="40" r="18" stroke="#3B8700" stroke-width="1.5" stroke-dasharray="3 2"/><circle cx="40" cy="40" r="12" fill="#A5E86C" opacity="0.3"><animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></circle><text x="40" y="42" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">Ice</text><line x1="40" y1="14" x2="40" y2="8" stroke="#3B8700" stroke-width="1.5" marker-end="url(#ah)"/><line x1="40" y1="66" x2="40" y2="72" stroke="#3B8700" stroke-width="1.5" marker-end="url(#ah)"/><line x1="14" y1="40" x2="8" y2="40" stroke="#3B8700" stroke-width="1.5" marker-end="url(#ah)"/><line x1="66" y1="40" x2="72" y2="40" stroke="#3B8700" stroke-width="1.5" marker-end="url(#ah)"/><defs><marker id="ah" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4" fill="#3B8700"/></marker></defs><path d="M58,22 Q60,20 62,22" stroke="#58CC02" stroke-width="1.5" opacity="0"><animate attributeName="opacity" values="0;1;1" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></path><path d="M58,22 L64,16" stroke="#58CC02" stroke-width="1.5" opacity="0"><animate attributeName="opacity" values="0;0.8;1" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></path><path d="M56,24 L62,18" stroke="#58CC02" stroke-width="1" opacity="0"><animate attributeName="opacity" values="0;0.6;1" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/></path><text x="40" y="9" text-anchor="middle" font-size="4" fill="#6B7280">σ_h</text><text x="9" y="38" text-anchor="middle" font-size="4" fill="#6B7280">σ_h</text><text x="71" y="38" text-anchor="middle" font-size="4" fill="#6B7280">σ_h</text><text x="40" y="77" text-anchor="middle" font-size="4" fill="#6B7280">σ_h</text><text x="66" y="14" text-anchor="middle" font-size="4" fill="#58CC02" opacity="0"><animate attributeName="opacity" values="0;0;1" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1"/>crack</text></svg>`,
      correctIndex: 0,
      explanation:
        'Water is unusual: it expands roughly 9 % by volume when it freezes. Inside a sealed pipe this expansion pressurizes the water/ice, creating hoop stress (σ = pr/t) in the pipe wall. When that stress exceeds copper\'s yield strength the pipe plastically deforms and eventually ruptures. Copper does not undergo a ductile-to-brittle transition at typical winter temperatures — the failure is a ductile overload caused by internal pressure.',
      hint: 'Think about what makes water unique compared to most liquids when it solidifies.',
    },

    // ── MC 2 – PEX vs Copper ──────────────────────────────────────────
    {
      id: 'u7-L7-Q2',
      type: 'multiple-choice',
      question:
        'PEX tubing is far more resistant to freeze-burst damage than copper pipe. Which material property best explains this advantage?',
      options: [
        'PEX has a higher elastic modulus than copper',
        'PEX can undergo large elastic deformation (high elongation at break) so it stretches with the expanding ice rather than rupturing',
        'PEX has higher thermal conductivity, keeping the water from freezing',
        'PEX is galvanically inert and therefore immune to pressure',
      ],
      correctIndex: 1,
      explanation:
        'PEX (cross-linked polyethylene) can elastically stretch several hundred percent before failure. When ice expands inside, the tube expands with it and springs back when thawed. Copper has very limited elongation (~15-30 %) and yields quickly under the same internal pressure. This is a classic design-for-failure concept: choose a material whose ductility accommodates the load rather than fighting it.',
    },

    // ── MC 3 – Bolt Self-Loosening ────────────────────────────────────
    {
      id: 'u7-L7-Q3',
      type: 'multiple-choice',
      question:
        'A bolted joint on a vibrating machine keeps loosening despite being initially torqued to spec. What is the dominant loosening mechanism?',
      options: [
        'Axial vibration stretches the bolt beyond yield',
        'Transverse (shear) vibration causes relative slip between mating threads, walking the nut off — the Junker effect',
        'The bolt head corrodes and loses friction',
        'Resonant vibration melts the thread lubricant',
      ],
      correctIndex: 1,
      explanation:
        'Gerhard Junker demonstrated that transverse cyclic loads are far more effective at loosening bolts than axial loads. Each vibration cycle causes micro-slip between the thread flanks and between the nut face and the joint surface. The helical geometry converts that slip into nut rotation — effectively "walking" the nut off. This is why preload, lock washers, and threadlocking adhesives are critical in vibrating assemblies.',
      hint: 'Consider which vibration direction would cause the nut to rotate along the helix.',
    },

    // ── MC 4 – Loctite & Preload ──────────────────────────────────────
    {
      id: 'u7-L7-Q4',
      type: 'multiple-choice',
      question:
        'An engineer applies Loctite threadlocker to a critical bolted joint. How does the adhesive primarily prevent loosening?',
      options: [
        'It increases the bolt\'s tensile strength',
        'It fills the gap between threads and cures to prevent the relative slip that causes self-loosening',
        'It acts as a lubricant so the bolt can be torqued higher',
        'It thermally insulates the bolt from vibration energy',
      ],
      correctIndex: 1,
      explanation:
        'Threadlocking adhesives are anaerobic — they cure in the absence of air between the mating metal surfaces. Once cured, they bond the thread flanks together and eliminate the micro-slip that drives the Junker loosening mechanism. The adhesive does not change the bolt\'s strength; it simply prevents relative motion. Higher-strength grades (e.g., Loctite 271) require heat to disassemble, while medium-strength grades (e.g., Loctite 243) allow hand-tool removal.',
    },

    // ── MC 5 – Bicycle Chain Fatigue ──────────────────────────────────
    {
      id: 'u7-L7-Q5',
      type: 'multiple-choice',
      question:
        'A bicycle chain link fails after thousands of kilometers with no single overload event. The fracture surface shows beach marks. What failure mode does this indicate?',
      options: [
        'Creep rupture from sustained high temperature',
        'Brittle fracture from an impact load',
        'Fatigue failure from cyclic loading, with crack initiation at a stress concentration',
        'Stress-corrosion cracking from road salt exposure',
      ],
      correctIndex: 2,
      explanation:
        'Beach marks (also called clamshell marks) are the hallmark of fatigue failure. Each pedal stroke loads and unloads the chain link, creating a cyclic stress state. Cracks initiate at stress concentrations — typically the pin holes in the link plates — and propagate incrementally until the remaining cross-section can no longer support the load and fractures suddenly. The S-N curve for the chain steel defines how many cycles it can survive at a given stress amplitude.',
      hint: 'Beach marks on a fracture surface are a signature of one specific failure mode.',
    },

    // ── MC 6 – S-N Curve Concept ──────────────────────────────────────
    {
      id: 'u7-L7-Q6',
      type: 'multiple-choice',
      question:
        'On an S-N (Wöhler) curve for a steel bicycle chain link, what does the "endurance limit" represent?',
      options: [
        'The maximum static load the link can carry',
        'The stress amplitude below which the material can theoretically endure an infinite number of cycles without fatigue failure',
        'The number of cycles required to initiate a crack at any stress level',
        'The temperature at which fatigue life doubles',
      ],
      correctIndex: 1,
      explanation:
        'Many ferrous alloys (steels) exhibit an endurance limit — a stress amplitude below which the material will not fail by fatigue regardless of the number of cycles. On the S-N curve this appears as a horizontal asymptote. If the chain is designed so peak cyclic stress stays below this limit, fatigue life is essentially infinite. Non-ferrous metals like aluminum do NOT have a true endurance limit and will eventually fail at any stress amplitude.',
    },

    // ── MC 7 – Tire Blowout ───────────────────────────────────────────
    {
      id: 'u7-L7-Q7',
      type: 'multiple-choice',
      question:
        'Under-inflated tires are a leading cause of highway blowouts. What failure mechanism does under-inflation promote?',
      options: [
        'Reduced tread depth from accelerated abrasion',
        'Excessive sidewall flexing causes cyclical bending stress, leading to flexural fatigue and heat buildup',
        'Lower pressure reduces the tire\'s moment of inertia, causing resonance',
        'The bead unseats due to reduced centripetal force',
      ],
      correctIndex: 1,
      explanation:
        'When a tire is under-inflated, the sidewall deflects excessively with each revolution. This repeated bending creates cyclic stress in the rubber and internal cords (a form of flexural fatigue). The hysteresis in the rubber also converts mechanical energy to heat, raising temperature. Higher temperature accelerates rubber degradation and further reduces fatigue life — a positive feedback loop that can end in catastrophic blowout.',
      hint: 'Think about what happens to the sidewall shape as the tire rolls when pressure is too low.',
    },

    // ── MC 8 – Tire Pressure & Temperature ────────────────────────────
    {
      id: 'u7-L7-Q8',
      type: 'multiple-choice',
      question:
        'A tire rated at 35 psi (gauge) at 20 °C is driven on hot asphalt until the air inside reaches 60 °C. Assuming constant volume, the new gauge pressure is approximately:',
      options: [
        '40 psi — pressure rises proportionally with absolute temperature',
        '35 psi — rubber expands to keep pressure constant',
        '70 psi — pressure doubles with temperature',
        '30 psi — heat softens the rubber so pressure drops',
      ],
      correctIndex: 0,
      explanation:
        'Using Gay-Lussac\'s law (P₁/T₁ = P₂/T₂ at constant volume with absolute temperatures): Gauge 35 psi → absolute ≈ 49.7 psia. T₁ = 293 K, T₂ = 333 K. P₂ = 49.7 × 333/293 ≈ 56.5 psia ≈ 41.8 psig. Roughly 40 psi gauge — about a 14 % increase. This is why TPMS (tire pressure monitoring systems) are calibrated to account for temperature and why you check pressure when tires are cold.',
    },

    // ── MC 9 – Galvanic Corrosion ─────────────────────────────────────
    {
      id: 'u7-L7-Q9',
      type: 'multiple-choice',
      question:
        'A steel bolt is used to fasten an aluminum bracket on a boat. Within months the aluminum shows severe pitting while the steel bolt is unaffected. What type of corrosion is occurring?',
      options: [
        'Uniform oxidation of both metals at equal rates',
        'Galvanic corrosion — aluminum is anodic relative to steel and preferentially corrodes',
        'Crevice corrosion caused by stagnant seawater under the bolt head',
        'Hydrogen embrittlement of the aluminum',
      ],
      correctIndex: 1,
      explanation:
        'When two dissimilar metals are in electrical contact in the presence of an electrolyte (seawater), a galvanic cell forms. Aluminum is more anodic (more negative electrode potential) than steel in the galvanic series, so it acts as the anode and corrodes preferentially — sacrificing itself to protect the cathode (steel). This is why you should use stainless-steel or aluminum fasteners with aluminum parts in marine environments, or electrically isolate the joint.',
    },

    // ── MC 10 – Sacrificial Anode ─────────────────────────────────────
    {
      id: 'u7-L7-Q10',
      type: 'multiple-choice',
      question:
        'Galvanized steel is coated with zinc. If the coating is scratched and the underlying steel is exposed, what happens?',
      options: [
        'The steel rusts immediately because the protective barrier is gone',
        'Zinc acts as a sacrificial anode — it corrodes preferentially and continues to protect the exposed steel cathodically',
        'The scratch fills with zinc oxide, which is harder than the original coating',
        'Nothing — zinc and steel have the same electrode potential',
      ],
      correctIndex: 1,
      explanation:
        'Zinc is more anodic than steel in the galvanic series. Even when the coating is breached, zinc corrodes in place of the steel, providing cathodic (sacrificial) protection to the exposed area. This is fundamentally different from barrier coatings like paint, which only protect as long as they remain intact. It is also the principle behind zinc anodes bolted to ship hulls and underground pipeline protection.',
    },

    // ── MC 11 – Glass Thermal Shock ───────────────────────────────────
    {
      id: 'u7-L7-Q11',
      type: 'multiple-choice',
      question:
        'Pouring boiling water into a room-temperature glass cup can crack it, but a Pyrex measuring cup survives the same treatment. What material property gives Pyrex its advantage?',
      options: [
        'Higher tensile strength than soda-lime glass',
        'A much lower coefficient of thermal expansion (α), so thermal stress σ = EαΔT is smaller for the same temperature change',
        'Higher thermal conductivity, preventing any temperature gradient',
        'Pyrex is a polymer, not a glass, so it flexes instead of cracking',
      ],
      correctIndex: 1,
      explanation:
        'Thermal stress in a constrained solid is σ = EαΔT. Borosilicate glass (Pyrex) has a coefficient of thermal expansion roughly one-third that of ordinary soda-lime glass (~3.3 × 10⁻⁶/°C vs ~9 × 10⁻⁶/°C). For the same ΔT the stress is about three times lower, keeping it below the fracture stress. Both glasses have similar elastic moduli and are similarly brittle — the low α is the key difference.',
      hint: 'The thermal stress formula σ = EαΔT tells you which property to minimize.',
    },

    // ── MC 12 – Phone Screen Crack ────────────────────────────────────
    {
      id: 'u7-L7-Q12',
      type: 'multiple-choice',
      question:
        'A phone screen often cracks from a corner or edge impact rather than a center hit. Which fracture mechanics concept explains this?',
      options: [
        'The center is reinforced by the phone\'s internal frame',
        'Edge and corner flaws act as stress concentrators; by the Griffith criterion, cracks propagate when strain energy release exceeds the surface energy cost',
        'The screen is thicker at the center due to the display stack',
        'Corner impacts generate higher temperatures that melt the adhesive',
      ],
      correctIndex: 1,
      explanation:
        'Griffith showed that brittle fracture initiates when the strain energy released by crack growth exceeds the energy required to create new fracture surfaces. Edge and corner flaws — from manufacturing, handling, or previous micro-impacts — are pre-existing stress concentrators that locally amplify the applied stress (K = σ√πa). A moderate impact at a flawed edge can exceed the critical stress intensity factor K_IC, while the same energy at a flaw-free center would not. This is why tempered and chemically strengthened glass (Gorilla Glass) puts the surfaces in compression — to close those edge flaws.',
    },

    // ── TF 1 – Paper Clip Fatigue ─────────────────────────────────────
    {
      id: 'u7-L7-Q13',
      type: 'true-false',
      question:
        'When you bend a metal paper clip back and forth until it breaks, it fails by low-cycle fatigue — it always breaks where you bend it because that is where the bending stress and plastic strain are greatest.',
      correctAnswer: true,
      explanation:
        'The bend location experiences the highest bending stress and plastic strain. Each reversal plastically deforms the metal (work hardening it and reducing ductility), initiates micro-cracks at the outer surface, and propagates them until fracture. You can feel the wire getting stiffer and warmer before it snaps — that is work hardening and hysteretic heat generation. This is low-cycle fatigue: high strain amplitude, few cycles to failure.',
    },

    // ── TF 2 – Radiator Hose Creep ────────────────────────────────────
    {
      id: 'u7-L7-Q14',
      type: 'true-false',
      question:
        'A car radiator hose that has hardened and cracked after years of service has failed primarily due to creep — time-dependent deformation under sustained load at elevated temperature.',
      correctAnswer: false,
      explanation:
        'While creep can occur in polymers at elevated temperatures, the dominant degradation mechanism in a rubber radiator hose is thermo-oxidative aging: heat and oxygen break cross-links and polymer chains over time, causing the rubber to harden, lose elasticity, and crack. Creep describes progressive deformation under constant stress (like a clamped hose slowly deforming at the clamp), but the overall embrittlement and surface cracking are chemical degradation, not mechanical creep. In an interview, distinguishing between creep (a mechanical phenomenon) and material degradation (a chemical phenomenon) shows strong fundamentals.',
    },

    // ── TF 3 – Pitting vs Uniform Corrosion ──────────────────────────
    {
      id: 'u7-L7-Q15',
      type: 'true-false',
      question:
        'Pitting corrosion is generally more dangerous than uniform corrosion because pits act as stress concentrators and can lead to unexpected through-wall penetration while overall material loss appears minor.',
      correctAnswer: true,
      explanation:
        'Uniform corrosion removes material evenly and is easy to detect and predict with corrosion allowances. Pitting is localized — deep, narrow cavities can penetrate a pipe wall or tank shell while the surface appears mostly intact. Each pit is a stress concentration that can initiate fatigue cracks or stress-corrosion cracks. This is why inspection programs specifically look for pitting in critical components, and why corrosion-resistant alloys are selected for their pitting resistance (measured by the PREN — Pitting Resistance Equivalent Number).',
    },

    // ── TF 4 – Pressure-Treated Wood ──────────────────────────────────
    {
      id: 'u7-L7-Q16',
      type: 'true-false',
      question:
        'Pressure-treated lumber resists rot because the treatment process makes the wood waterproof, preventing moisture from entering the wood fibers.',
      correctAnswer: false,
      explanation:
        'Pressure-treated wood is NOT waterproof — it still absorbs and releases moisture. The treatment forces preservative chemicals (such as copper-based compounds like ACQ or CA) deep into the wood cells. These chemicals are toxic to the fungi and insects that cause decay. The wood still swells, shrinks, and gets wet; it simply resists biological attack. Understanding this distinction matters: the structural properties of pressure-treated wood still change with moisture content, and it still requires proper drainage and ventilation in design.',
    },

    // ── FB 1 – Hoop Stress in Frozen Pipe ─────────────────────────────
    {
      id: 'u7-L7-Q17',
      type: 'fill-blank',
      question:
        'When water freezes inside a sealed pipe, it expands by about ___ %, creating internal pressure. The resulting ___ stress in the pipe wall equals pr/t for a thin-walled cylinder.',
      blanks: ['9', 'hoop'],
      wordBank: ['9', 'hoop', '4', 'axial', 'shear'],
      explanation:
        'Water expands approximately 9 % by volume when it transitions from liquid to solid ice. In a sealed cylindrical pipe, this expansion generates internal pressure. The dominant stress in a thin-walled pressure vessel is hoop (circumferential) stress, σ_h = pr/t, which is twice the axial stress. This is why pipes split along their length — the hoop stress exceeds yield first.',
      hint: 'The circumferential stress in a pressure vessel has a specific name, and water\'s expansion percentage is a well-known value.',
    },

    // ── FB 2 – Thermal Stress Formula ─────────────────────────────────
    {
      id: 'u7-L7-Q18',
      type: 'fill-blank',
      question:
        'The thermal stress in a fully constrained solid is given by σ = E·___·ΔT, where E is elastic modulus and ΔT is temperature change. Pyrex resists thermal shock because its coefficient of thermal ___ is very low.',
      blanks: ['α', 'expansion'],
      wordBank: ['α', 'expansion', 'ρ', 'ν', 'k'],
      explanation:
        'The thermal stress formula σ = EαΔT shows that stress is directly proportional to the coefficient of thermal expansion (α). Pyrex borosilicate glass has α ≈ 3.3 × 10⁻⁶/°C compared to ~9 × 10⁻⁶/°C for soda-lime glass. With roughly one-third the α, Pyrex develops about one-third the thermal stress for the same temperature change, keeping it below the fracture stress.',
      hint: 'The Greek letter for the coefficient of thermal expansion is the key variable here.',
    },

    // ── FB 3 – Junker Effect ──────────────────────────────────────────
    {
      id: 'u7-L7-Q19',
      type: 'fill-blank',
      question:
        'Bolts loosen most readily under ___ vibration (perpendicular to the bolt axis), which causes relative ___ between mating thread surfaces — an effect demonstrated by Junker.',
      blanks: ['transverse', 'slip'],
      wordBank: ['transverse', 'slip', 'axial', 'torsion', 'creep'],
      explanation:
        'Gerhard Junker\'s experiments showed that transverse (shear) vibration perpendicular to the bolt axis is the most effective loosening mechanism. It overcomes thread friction and causes relative slip between the nut and bolt thread flanks. The helical thread geometry converts this lateral slip into rotational motion of the nut, progressively reducing preload. Axial vibration is far less effective at causing loosening because it does not create the lateral displacement needed for thread slip.',
    },

    // ── FB 4 – Griffith Criterion ─────────────────────────────────────
    {
      id: 'u7-L7-Q20',
      type: 'fill-blank',
      question:
        'According to the Griffith criterion, a crack in a brittle material will propagate when the ___ energy released by crack growth exceeds the energy needed to create new ___.',
      blanks: ['strain', 'surfaces'],
      wordBank: ['strain', 'surfaces', 'kinetic', 'bonds', 'thermal'],
      explanation:
        'Griffith\'s energy-balance approach to fracture states that a crack grows when the elastic strain energy released (which drives crack growth) exceeds the surface energy required to create the two new fracture surfaces. This criterion explains why small flaws in brittle materials like glass and ceramics can cause catastrophic failure — even moderate applied stress stores enough strain energy near a flaw tip to pay the surface-energy cost of propagation. It is the foundation of modern fracture mechanics and directly explains why phone screens crack from edge flaws.',
      hint: 'Think about the energy stored in a stressed solid and what new geometric feature is created when a crack extends.',
    },
  ],
};
