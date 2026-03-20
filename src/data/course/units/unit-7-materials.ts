import type { Unit } from '../types';

export const unit7: Unit = {
  id: 'u7-materials',
  title: 'Materials & Manufacturing',
  description: 'Material properties, phase diagrams, heat treatment, casting, forming, machining, and modern manufacturing processes.',
  color: '#F97316',
  icon: '🏭',
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
          question: 'A tensile test specimen has a gauge length of 50 mm and original diameter of 12.5 mm. After fracture, the gauge length is 62 mm and the minimum diameter at the neck is 8.2 mm. What is the percent reduction in area?',
          options: [
            '24.0%',
            '43.0%',
            '56.9%',
            '69.1%'
          ],
          correctIndex: 2,
          explanation: 'Reduction in area = (A₀ − A_f)/A₀ × 100. A₀ = π/4 × 12.5² = 122.7 mm². A_f = π/4 × 8.2² = 52.8 mm². RA = (122.7 − 52.8)/122.7 × 100 = 56.9%. Reduction in area is a better measure of ductility than elongation because it is less sensitive to gauge length and more representative of local deformation at fracture.',
          hint: 'RA = (A₀ − A_f)/A₀ × 100%. Use the diameter to calculate areas.'
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
          question: 'A component operates at 550°C under constant stress for years. The primary failure mechanism of concern is:',
          options: [
            'Fatigue crack propagation',
            'Creep rupture',
            'Stress corrosion cracking',
            'Brittle fracture'
          ],
          correctIndex: 1,
          explanation: 'Creep is time-dependent plastic deformation under constant stress at elevated temperatures (generally > 0.4 × T_melting in Kelvin). At 550°C, steel components are well within the creep regime. Creep progresses through three stages: primary (decreasing rate), secondary (steady-state), and tertiary (accelerating to rupture). Creep rupture is a major design consideration in boilers, turbines, and other high-temperature equipment.',
          hint: 'At high temperatures and sustained loads, which failure mechanism is time-dependent?'
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
          question: 'The region of the stress-strain curve between the yield point and ultimate tensile strength, where the material deforms uniformly, is called ___ hardening.',
          acceptedAnswers: ['strain', 'Strain', 'work', 'Work'],
          explanation: 'Strain hardening (also called work hardening) occurs as dislocations multiply and interact during plastic deformation, increasing the stress required for further deformation. The material becomes stronger but less ductile. The strain hardening exponent (n) from the power law σ = Kε^n quantifies this behavior — higher n means more uniform elongation before necking.',
          hint: 'This phenomenon is why cold-worked metals are harder than annealed ones.'
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
          question: 'In the iron-carbon phase diagram, what is the maximum solubility of carbon in austenite (FCC iron) and at what temperature does this occur?',
          options: [
            '0.022 wt% C at 727°C',
            '0.8 wt% C at 727°C',
            '2.14 wt% C at 1147°C',
            '6.67 wt% C at 1227°C'
          ],
          correctIndex: 2,
          explanation: 'The maximum solubility of carbon in austenite (γ-iron, FCC) is 2.14 wt% C at 1147°C — the eutectic temperature. By comparison, ferrite (α-iron, BCC) can dissolve only 0.022 wt% C at 727°C. This large difference in solubility is fundamental to heat treatment: when austenite is cooled, excess carbon must be rejected, forming cementite (Fe₃C) as part of pearlite, bainite, or being trapped in martensite.',
          hint: 'Look at the left boundary of the austenite single-phase region on the Fe-C diagram.'
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
          explanation: 'At 0.8 wt% C and 727°C, the eutectoid reaction occurs: austenite → ferrite + cementite (Fe₃C). The resulting lamellar microstructure is called pearlite due to its pearl-like appearance under the microscope. Finer pearlite (faster cooling) is harder than coarse pearlite. Steels with less than 0.8% C are hypoeutectoid (proeutectoid ferrite + pearlite), and those with more are hypereutectoid (proeutectoid cementite + pearlite).',
          hint: 'The eutectoid point is where austenite transforms directly into two phases simultaneously.'
        },
        {
          id: 'u7-L2-Q4',
          type: 'multiple-choice',
          question: 'On a TTT diagram for a eutectoid steel, the "nose" of the C-curve represents:',
          options: [
            'The temperature at which martensite starts to form',
            'The fastest transformation time — the temperature at which diffusion-controlled transformation is most rapid',
            'The temperature at which austenite is most stable',
            'The point where bainite transitions to pearlite'
          ],
          correctIndex: 1,
          explanation: 'The nose of the TTT C-curve (typically around 540°C for eutectoid steel) is where the transformation from austenite starts fastest. Above the nose, the driving force is low despite high diffusivity; below the nose, diffusion is too slow despite high driving force. To obtain martensite, cooling must be fast enough to bypass the nose entirely. The critical cooling rate is determined by the tangent line to the nose from the austenitizing temperature.',
          hint: 'The nose represents the competition between thermodynamic driving force and diffusion rate.'
        },
        {
          id: 'u7-L2-Q5',
          type: 'multiple-choice',
          question: 'Which heat treatment process involves heating steel above the upper critical temperature and cooling in still air?',
          options: [
            'Full annealing',
            'Normalizing',
            'Stress relieving',
            'Process annealing'
          ],
          correctIndex: 1,
          explanation: 'Normalizing involves heating to 50–80°C above the upper critical temperature (Ac₃ for hypoeutectoid, Acm for hypereutectoid steels) followed by air cooling. It produces a finer, more uniform grain structure than full annealing (which uses furnace cooling). Normalizing is used to refine grain size after casting, forging, or welding, and to improve machinability and mechanical properties. It is faster and cheaper than full annealing.',
          hint: 'The cooling medium distinguishes this process: not furnace-cooled and not quenched.'
        },
        {
          id: 'u7-L2-Q6',
          type: 'fill-blank',
          question: 'The very hard, body-centered tetragonal (BCT) phase formed by rapid quenching of austenite is called ___.',
          acceptedAnswers: ['martensite', 'Martensite'],
          explanation: 'Martensite is a supersaturated solid solution of carbon in a body-centered tetragonal (BCT) iron lattice, formed by diffusionless (shear) transformation when austenite is rapidly quenched. It is the hardest microstructure in steel (up to ~65 HRC depending on carbon content) but is very brittle in the as-quenched state, which is why tempering is almost always performed after quenching.',
          hint: 'This metastable phase is formed by diffusionless transformation and is extremely hard.'
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
          question: 'Which casting process is best suited for producing complex, thin-walled, high-precision parts like turbine blades with excellent surface finish?',
          options: [
            'Green sand casting',
            'Investment (lost-wax) casting',
            'Permanent mold casting',
            'Centrifugal casting'
          ],
          correctIndex: 1,
          explanation: 'Investment casting (lost-wax process) produces the highest precision and best surface finish among conventional casting methods. It can cast complex geometries, thin walls (<1 mm), and achieve tolerances of ±0.1 mm. It is the standard method for turbine blades, aerospace components, and jewelry. The process uses a ceramic shell mold built around a wax pattern, allowing intricate internal passages that are impossible with other methods.',
          hint: 'This ancient process uses a sacrificial pattern that is melted out of a ceramic shell.'
        },
        {
          id: 'u7-L3-Q2',
          type: 'multiple-choice',
          question: 'A hot-rolled steel bar shows different mechanical properties in the rolling direction vs. the transverse direction. This is primarily due to:',
          options: [
            'Variation in cooling rate across the cross-section',
            'Elongation of inclusions and development of crystallographic texture during rolling',
            'Surface decarburization from the rolling process',
            'Residual stresses from uneven deformation'
          ],
          correctIndex: 1,
          explanation: 'Mechanical anisotropy in rolled products results from two main factors: elongation of non-metallic inclusions (MnS, oxide stringers) along the rolling direction, and development of preferred crystallographic orientation (texture). This leads to higher ductility and toughness in the rolling direction. It is critical in plate design — lamellar tearing can occur in the through-thickness (short transverse) direction of thick plates under welding-induced stresses.',
          hint: 'Think about what happens to the microstructure and inclusions as the material is plastically deformed.'
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
          question: 'When designing a pattern for sand casting of gray cast iron (shrinkage ~1%), which allowance is NOT typically included?',
          options: [
            'Shrinkage allowance (pattern larger than desired casting)',
            'Draft angle (taper on vertical surfaces for pattern removal)',
            'Machining allowance (extra material on surfaces to be machined)',
            'Spring-back allowance (pattern smaller to account for elastic recovery)'
          ],
          correctIndex: 3,
          explanation: 'Spring-back allowance is a sheet metal/forming concept, not a casting pattern consideration. Casting patterns include: shrinkage allowance (oversized to compensate for contraction), draft angles (1–3° taper for easy pattern withdrawal from sand), machining allowance (extra stock on surfaces requiring machining), shake allowance (slight enlargement due to rapping the pattern loose), and distortion allowance for complex shapes.',
          hint: 'One of these allowances is specific to sheet metal bending, not casting.'
        },
        {
          id: 'u7-L3-Q6',
          type: 'fill-blank',
          question: 'The manufacturing process in which a billet is forced through a shaped die opening to create a constant cross-section profile is called ___.',
          acceptedAnswers: ['extrusion', 'Extrusion'],
          explanation: 'Extrusion pushes (direct/forward extrusion) or pulls (indirect/backward extrusion) a billet through a die to produce constant cross-sectional profiles of almost unlimited length. It is ideal for aluminum profiles (window frames, heat sinks, structural sections). The extrusion ratio (initial/final area) determines the required force. Hot extrusion is common for aluminum and steel; cold extrusion is used for precision parts and improved properties.',
          hint: 'Think of squeezing toothpaste from a tube — the material is forced through a shaped opening.'
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
          question: 'When turning a 60 mm diameter steel bar at a cutting speed of 150 m/min, what spindle RPM is required?',
          options: [
            '398 RPM',
            '597 RPM',
            '796 RPM',
            '1194 RPM'
          ],
          correctIndex: 2,
          explanation: 'N = V/(πD) = 150/(π × 0.06) = 150/0.1885 = 796 RPM. This is a fundamental CNC calculation. In practice, the programmed cutting speed (V) depends on the workpiece material and tool material — for example, carbide inserts allow higher speeds than HSS. The spindle speed must be recalculated as diameter changes during facing operations (constant surface speed mode, G96).',
          hint: 'N = 1000V/(πD) when V is in m/min and D is in mm, or N = V/(πD) in consistent units.'
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
          question: 'In CNC programming, what does the G-code command "G41" specify?',
          options: [
            'Tool length compensation',
            'Cutter radius compensation — left',
            'Circular interpolation — clockwise',
            'Return to machine home position'
          ],
          correctIndex: 1,
          explanation: 'G41 activates cutter radius compensation to the left (tool moves to the left of the programmed path). G42 is compensation to the right. This allows the programmer to program the actual part contour while the controller offsets the tool path by the cutter radius. This is essential for profile milling — changing to a different diameter cutter only requires updating the offset table, not reprogramming. G43 is tool length compensation.',
          hint: 'G41 and G42 are a pair — they control which side of the programmed path the tool offsets to.'
        },
        {
          id: 'u7-L4-Q5',
          type: 'multiple-choice',
          question: 'Taylor\'s tool life equation is VT^n = C. For a carbide tool cutting steel, typical n values are around 0.25. If cutting speed increases from 150 to 200 m/min, by what factor does tool life decrease?',
          options: [
            '1.8×',
            '3.2×',
            '5.1×',
            '7.6×'
          ],
          correctIndex: 1,
          explanation: 'From VT^n = C: T₂/T₁ = (V₁/V₂)^(1/n) = (150/200)^(1/0.25) = (0.75)^4 = 0.3164. So tool life drops to ~31.6% of original, meaning it decreased by a factor of 1/0.3164 ≈ 3.2×. The high sensitivity of tool life to cutting speed (exponent 1/n = 4) is why speed is the most impactful machining parameter — a modest 33% speed increase cuts tool life by more than 3×.',
          hint: 'Rearrange Taylor\'s equation: T₂/T₁ = (V₁/V₂)^(1/n).'
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
          question: 'Which additive manufacturing process uses a laser to selectively fuse metal powder in a powder bed, and is commonly used for aerospace and medical implant production?',
          options: [
            'FDM (Fused Deposition Modeling)',
            'SLA (Stereolithography)',
            'DMLS/SLM (Direct Metal Laser Sintering / Selective Laser Melting)',
            'Binder Jetting'
          ],
          correctIndex: 2,
          explanation: 'DMLS/SLM uses a high-power laser to fully melt and fuse metal powder layer by layer. It can produce fully dense metal parts in titanium, Inconel, stainless steel, and aluminum alloys. It is the dominant metal AM process for aerospace (complex topology-optimized brackets, fuel nozzles) and medical (custom implants with porous surfaces for osseointegration). Build rates are slow and cost is high, but the geometric freedom and material properties justify it for high-value parts.',
          hint: 'This process works with metals in powder form and uses a laser for fusion.'
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
          question: 'A product requires 10,000 units/year with tight tolerances (±0.05 mm) and complex geometry. Which manufacturing process is most cost-effective?',
          options: [
            'FDM 3D printing',
            'Sand casting',
            'Injection molding (if plastic is acceptable)',
            'Manual machining from billet'
          ],
          correctIndex: 2,
          explanation: 'At 10,000 units/year with complex geometry and tight tolerances, injection molding is the most cost-effective process if the material can be plastic. The high tooling cost ($10k–$100k+) is amortized over many parts, giving very low per-part costs ($0.5–$5). 3D printing is too slow and expensive per part at this volume. Sand casting lacks the tolerance capability. CNC machining could work for metal parts but is expensive per piece at this volume.',
          hint: 'Consider which process has high upfront cost but very low per-part cost at volume.'
        },
        {
          id: 'u7-L5-Q5',
          type: 'multiple-choice',
          question: 'Which DFM (Design for Manufacturing) principle is violated by designing a part with a deep, narrow internal pocket (depth > 4× width)?',
          options: [
            'Minimize part count',
            'Avoid features requiring special or long-reach tooling',
            'Design for the primary manufacturing process',
            'Standardize components where possible'
          ],
          correctIndex: 1,
          explanation: 'Deep, narrow pockets require long, slender end mills that deflect under cutting forces, causing poor surface finish, dimensional errors, and potential tool breakage. The tool length-to-diameter ratio should generally stay below 4:1. For deeper features, consider through-holes (accessible from both sides), EDM, or splitting the part. This is one of the most common DFM violations in parts designed by engineers unfamiliar with machining constraints.',
          hint: 'Think about what happens to a long, thin cutting tool under machining forces.'
        },
        {
          id: 'u7-L5-Q6',
          type: 'fill-blank',
          question: 'The additive manufacturing process that uses a UV laser to cure liquid photopolymer resin layer by layer is called ___.',
          acceptedAnswers: ['SLA', 'stereolithography', 'Stereolithography', 'sla'],
          explanation: 'Stereolithography (SLA) was the first commercialized AM process (1986, Chuck Hull). A UV laser traces each layer\'s cross-section on the surface of a liquid photopolymer resin vat, curing it. SLA offers excellent surface finish and accuracy (±0.05 mm) among polymer AM processes, making it ideal for prototypes, dental models, and jewelry patterns. Limitations include UV-sensitive materials with lower mechanical properties than engineering thermoplastics.',
          hint: 'This was the first commercialized 3D printing technology, using UV light and liquid resin.'
        }
      ]
    }
  ]
};
