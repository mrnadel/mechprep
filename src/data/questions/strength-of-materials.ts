import type { Question } from '../types';

export const strengthOfMaterialsQuestions: Question[] = [
  // SOM-001 — Multiple Choice
  {
    id: 'som-001',
    type: 'multiple-choice',
    topic: 'strength-of-materials',
    subtopic: 'Stress & Strain',
    difficulty: 'beginner',
    question: 'A bolt is tightened to clamp two plates together. What type of stress is the bolt primarily under?',
    diagram: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="som001-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="som001-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
      </defs>
      <!-- top plate -->
      <rect x="80" y="80" width="240" height="40" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="100" y="105" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Plate 1</text>
      <!-- bottom plate -->
      <rect x="80" y="120" width="240" height="40" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="100" y="145" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Plate 2</text>
      <!-- bolt hole through plates -->
      <rect x="195" y="55" width="10" height="130" fill="#334155"/>
      <!-- bolt shank -->
      <rect x="196" y="55" width="8" height="130" rx="1" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <!-- bolt head (top) -->
      <rect x="185" y="45" width="30" height="15" rx="2" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <!-- nut (bottom) -->
      <rect x="185" y="180" width="30" height="15" rx="2" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <!-- preload tension arrows (stretching bolt) -->
      <line x1="200" y1="45" x2="200" y2="18" stroke="#f472b6" stroke-width="2.5" marker-end="url(#som001-arrowhead-pink)"/>
      <text x="210" y="28" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">Tension</text>
      <line x1="200" y1="195" x2="200" y2="222" stroke="#f472b6" stroke-width="2.5" marker-end="url(#som001-arrowhead-pink)"/>
      <text x="210" y="218" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">Tension</text>
      <!-- compression arrows on plates -->
      <line x1="260" y1="78" x2="260" y2="95" stroke="#60a5fa" stroke-width="2" marker-end="url(#som001-arrowhead)"/>
      <line x1="260" y1="162" x2="260" y2="145" stroke="#60a5fa" stroke-width="2" marker-end="url(#som001-arrowhead)"/>
      <text x="270" y="115" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">Plates in</text>
      <text x="270" y="128" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">compression</text>
      <!-- clamping force annotation -->
      <text x="45" y="115" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Clamp</text>
      <text x="45" y="128" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">zone</text>
      <path d="M 78 100 L 80 95 L 80 140 L 78 135" fill="none" stroke="#34d399" stroke-width="1.5"/>
      <!-- bolt label -->
      <text x="155" y="250" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">Bolt is STRETCHED (tensile preload)</text>
    </svg>`,
    options: [
      { id: 'a', text: 'Pure shear stress along the thread interface' },
      { id: 'b', text: 'Tensile stress along its axis from the preload' },
      { id: 'c', text: 'Compressive stress because it is being squeezed by the nut' },
      { id: 'd', text: 'Bending stress from misalignment of the plates' },
    ],
    correctAnswer: 'b',
    explanation: 'When you torque a bolt, the nut pulls the bolt head and nut together, stretching the bolt shank. This creates axial tensile stress (preload). The clamped plates are in compression, not the bolt. The bolt also has torsional shear from the torquing process, but the dominant design stress is tension.',
    interviewInsight: 'This is a fundamental question that trips up candidates who confuse what is in tension vs. compression in a bolted joint. It shows understanding of how fasteners actually work.',
    realWorldConnection: 'Proper bolt preload is critical in automotive cylinder heads, pressure vessels, and structural steel connections. Under-torqued bolts allow joint separation; over-torqued bolts risk yielding.',
    commonMistake: 'Saying the bolt is in compression because you are "squeezing" things together. The plates are compressed; the bolt is stretched.',
    tags: ['bolt', 'preload', 'tensile-stress', 'fastener', 'joint'],
  },

  // SOM-002 — Multiple Choice
  {
    id: 'som-002',
    type: 'multiple-choice',
    topic: 'strength-of-materials',
    subtopic: 'Beam Bending',
    difficulty: 'beginner',
    question: 'Where is the maximum bending stress in a simply supported beam with a central point load?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="som002-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="som002-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
      </defs>
      <!-- beam -->
      <line x1="50" y1="100" x2="350" y2="100" stroke="#94a3b8" stroke-width="4"/>
      <!-- pin support (left) -->
      <polygon points="50,100 35,130 65,130" fill="none" stroke="#f472b6" stroke-width="2"/>
      <line x1="30" y1="130" x2="70" y2="130" stroke="#f472b6" stroke-width="1.5"/>
      <line x1="33" y1="130" x2="28" y2="138" stroke="#f472b6" stroke-width="1"/>
      <line x1="40" y1="130" x2="35" y2="138" stroke="#f472b6" stroke-width="1"/>
      <line x1="47" y1="130" x2="42" y2="138" stroke="#f472b6" stroke-width="1"/>
      <line x1="54" y1="130" x2="49" y2="138" stroke="#f472b6" stroke-width="1"/>
      <line x1="61" y1="130" x2="56" y2="138" stroke="#f472b6" stroke-width="1"/>
      <!-- roller support (right) -->
      <circle cx="350" cy="118" r="8" fill="none" stroke="#f472b6" stroke-width="2"/>
      <line x1="330" y1="130" x2="370" y2="130" stroke="#f472b6" stroke-width="1.5"/>
      <line x1="333" y1="130" x2="328" y2="138" stroke="#f472b6" stroke-width="1"/>
      <line x1="340" y1="130" x2="335" y2="138" stroke="#f472b6" stroke-width="1"/>
      <line x1="347" y1="130" x2="342" y2="138" stroke="#f472b6" stroke-width="1"/>
      <line x1="354" y1="130" x2="349" y2="138" stroke="#f472b6" stroke-width="1"/>
      <line x1="361" y1="130" x2="356" y2="138" stroke="#f472b6" stroke-width="1"/>
      <!-- central point load P -->
      <line x1="200" y1="40" x2="200" y2="96" stroke="#60a5fa" stroke-width="2.5" marker-end="url(#som002-arrowhead)"/>
      <text x="208" y="50" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="14" font-weight="bold">P</text>
      <!-- reaction arrows -->
      <line x1="50" y1="100" x2="50" y2="70" stroke="#f472b6" stroke-width="2" marker-end="url(#som002-arrowhead-pink)"/>
      <text x="28" y="66" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">P/2</text>
      <line x1="350" y1="108" x2="350" y2="78" stroke="#f472b6" stroke-width="2" marker-end="url(#som002-arrowhead-pink)"/>
      <text x="355" y="74" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">P/2</text>
      <!-- stress distribution at midspan (cross-section view) -->
      <!-- cross-section box -->
      <rect x="150" y="155" width="100" height="80" rx="2" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="160" y="172" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Mid-span section:</text>
      <!-- beam cross-section rectangle -->
      <rect x="175" y="180" width="20" height="45" rx="1" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- neutral axis -->
      <line x1="170" y1="202" x2="200" y2="202" stroke="#34d399" stroke-width="1.5" stroke-dasharray="3,2"/>
      <text x="202" y="206" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">N.A. (\u03C3=0)</text>
      <!-- compression at top -->
      <line x1="175" y1="183" x2="160" y2="183" stroke="#60a5fa" stroke-width="2" marker-end="url(#som002-arrowhead)"/>
      <text x="135" y="180" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">-\u03C3_max</text>
      <!-- tension at bottom -->
      <line x1="195" y1="222" x2="210" y2="222" stroke="#f472b6" stroke-width="2" marker-end="url(#som002-arrowhead-pink)"/>
      <text x="212" y="226" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">+\u03C3_max</text>
      <!-- stress triangles -->
      <polygon points="175,202 175,183 160,183" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <polygon points="195,202 195,222 210,222" fill="none" stroke="#f472b6" stroke-width="1"/>
      <!-- bending moment diagram below -->
      <text x="50" y="260" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">M diagram:</text>
      <line x1="90" y1="260" x2="310" y2="260" stroke="#94a3b8" stroke-width="1"/>
      <polygon points="90,260 200,240 310,260" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <text x="188" y="237" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">M_max</text>
      <!-- max stress indicator arrow pointing to midspan -->
      <line x1="200" y1="100" x2="200" y2="100" stroke="#fb923c" stroke-width="0"/>
      <circle cx="200" cy="100" r="5" fill="none" stroke="#fb923c" stroke-width="2"/>
      <text x="210" y="118" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">\u03C3_max here</text>
    </svg>`,
    options: [
      { id: 'a', text: 'At the supports, on the top surface' },
      { id: 'b', text: 'At mid-span, on the top and bottom surfaces' },
      { id: 'c', text: 'At the neutral axis, at mid-span' },
      { id: 'd', text: 'Uniformly distributed throughout the beam' },
    ],
    correctAnswer: 'b',
    explanation: 'The bending moment is maximum at mid-span for a central point load. Bending stress is zero at the neutral axis and maximum at the extreme fibers (top and bottom surfaces). The top fiber is in compression and the bottom in tension (for a downward load on a simple beam). At the supports, the bending moment is zero.',
    interviewInsight: 'This is Beam Bending 101. If a candidate cannot answer this correctly, deeper structural questions are off the table. Interviewers use it as a gate question.',
    realWorldConnection: 'This directly applies to bridge design, shelf brackets, automotive suspension links — anywhere a member carries a transverse load between supports.',
    commonMistake: 'Saying the stress is maximum at the neutral axis (it is zero there) or at the supports (the moment is zero there for a simply supported beam).',
    tags: ['bending', 'beam', 'stress-distribution', 'neutral-axis', 'simply-supported'],
  },

  // SOM-003 — What Fails First
  {
    id: 'som-003',
    type: 'what-fails-first',
    topic: 'strength-of-materials',
    subtopic: 'Fatigue & Fracture',
    difficulty: 'advanced',
    question: 'A shaft carries a steady torque and a rotating bending load. It has a keyway, a fillet radius change, and a press-fit hub. What fails first?',
    diagram: `<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="som003-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="som003-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
      </defs>
      <!-- shaft body (two diameters) -->
      <rect x="30" y="90" width="160" height="50" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <rect x="190" y="80" width="170" height="70" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <!-- fillet at diameter change -->
      <path d="M 190 90 Q 185 85 190 80" fill="none" stroke="#fb923c" stroke-width="2.5"/>
      <path d="M 190 140 Q 185 145 190 150" fill="none" stroke="#fb923c" stroke-width="2.5"/>
      <!-- fillet label -->
      <line x1="186" y1="78" x2="186" y2="58" stroke="#fb923c" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="160" y="52" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">(b) Fillet</text>
      <text x="160" y="64" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">Kt ~ 1.5-2.5</text>
      <!-- keyway (rectangular groove) -->
      <rect x="80" y="86" width="40" height="8" rx="1" fill="#94a3b8" stroke="#f472b6" stroke-width="2"/>
      <!-- sharp corner highlight -->
      <circle cx="80" cy="90" r="4" fill="none" stroke="#f472b6" stroke-width="2"/>
      <circle cx="120" cy="90" r="4" fill="none" stroke="#f472b6" stroke-width="2"/>
      <!-- keyway label -->
      <line x1="100" y1="86" x2="100" y2="40" stroke="#f472b6" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="60" y="30" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">(a) Keyway</text>
      <text x="55" y="42" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">Kt ~ 3-5 (sharp!)</text>
      <!-- press-fit hub -->
      <rect x="280" y="65" width="60" height="100" rx="3" fill="none" stroke="#34d399" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="283" y="60" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">(c) Press-fit hub</text>
      <text x="290" y="180" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">Fretting at</text>
      <text x="293" y="192" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">edges</text>
      <!-- fretting zone indicators -->
      <circle cx="280" cy="80" r="4" fill="none" stroke="#34d399" stroke-width="1.5"/>
      <circle cx="280" cy="150" r="4" fill="none" stroke="#34d399" stroke-width="1.5"/>
      <!-- shaft body label -->
      <text x="210" y="205" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">(d) Shaft body — lowest stress</text>
      <!-- torque arrow (curved) -->
      <path d="M 25 100 A 15 15 0 0 1 25 130" fill="none" stroke="#60a5fa" stroke-width="2" marker-end="url(#som003-arrowhead)"/>
      <text x="5" y="120" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">T</text>
      <!-- bending load arrow -->
      <line x1="375" y1="115" x2="375" y2="160" stroke="#60a5fa" stroke-width="2" marker-end="url(#som003-arrowhead)"/>
      <text x="365" y="175" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">M_b</text>
      <!-- rotation indicator -->
      <path d="M 375 95 A 12 12 0 0 1 375 75" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <polygon points="375,75 370,82 380,80" fill="#fb923c"/>
      <text x="363" y="70" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">rotating</text>
      <!-- failure ranking at bottom -->
      <text x="30" y="230" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Failure likelihood:</text>
      <text x="30" y="248" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">(a) Keyway &gt; (c) Press-fit &gt; (b) Fillet &gt; (d) Body</text>
      <text x="30" y="264" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">Highest Kt + fully reversed stress = fatigue crack initiation</text>
    </svg>`,
    components: [
      { id: 'a', text: 'The keyway corner — stress concentration from the sharp geometry' },
      { id: 'b', text: 'The fillet at the diameter transition' },
      { id: 'c', text: 'The press-fit hub edge — fretting fatigue at the interface' },
      { id: 'd', text: 'The shaft body midway between features' },
    ],
    correctAnswer: 'a',
    failureMode: 'Fatigue crack initiation at the keyway corner due to the severe stress concentration factor (Kt ~ 3-5), combined with the rotating bending creating fully reversed stress cycles.',
    failureChain: [
      'Microscopic crack initiates at the sharp keyway corner where stress is amplified 3-5x',
      'Each revolution of the shaft cycles the crack from tension to compression',
      'Crack grows slowly through the cross-section following Paris law',
      'Remaining ligament becomes too small to carry the load',
      'Sudden overload fracture of the remaining section — shaft snaps',
    ],
    explanation: 'Keyways are notorious fatigue failure sites. The sharp corner acts as a stress riser with Kt values of 3-5. Under rotating bending, every point on the shaft surface experiences fully reversed stress. The keyway corner sees 3-5x the nominal stress, making it the most likely initiation site.',
    interviewInsight: 'This tests whether you understand stress concentrations and fatigue in combination. It is a very common real-world failure mode — shaft failures at keyways are documented extensively.',
    realWorldConnection: 'This is why modern high-performance shafts use splines instead of keyways, and why good design specifies generous fillet radii at all diameter transitions.',
    commonMistake: 'Choosing the fillet (which is also a stress riser but typically has a lower Kt than a keyway) or the shaft body (which has the lowest stress).',
    tags: ['fatigue', 'keyway', 'stress-concentration', 'shaft', 'rotating-bending', 'failure'],
  },

  // SOM-004 — Multi-Select
  {
    id: 'som-004',
    type: 'multi-select',
    topic: 'strength-of-materials',
    subtopic: 'Failure Theories',
    difficulty: 'intermediate',
    question: 'Which of the following statements about Von Mises yield criterion are TRUE? (Select all that apply)',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="100" y="22" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Yield Surface Comparison (\u03C3\u2081 vs \u03C3\u2082 plane)</text>
      <!-- axes -->
      <line x1="200" y1="250" x2="200" y2="40" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="40" y1="150" x2="360" y2="150" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- axis labels -->
      <text x="360" y="145" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12">\u03C3\u2081</text>
      <text x="205" y="42" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12">\u03C3\u2082</text>
      <!-- Von Mises ellipse -->
      <ellipse cx="200" cy="150" rx="130" ry="100" fill="none" stroke="#60a5fa" stroke-width="2.5" transform="rotate(45, 200, 150)"/>
      <!-- Tresca hexagon (inscribed in Von Mises) -->
      <polygon points="200,58 295,100 295,200 200,242 105,200 105,100" fill="none" stroke="#f472b6" stroke-width="2" stroke-dasharray="6,3"/>
      <!-- yield points on axes -->
      <circle cx="305" cy="150" r="4" fill="#60a5fa"/>
      <text x="310" y="140" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">\u03C3_y</text>
      <circle cx="95" cy="150" r="4" fill="#60a5fa"/>
      <text x="65" y="140" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">-\u03C3_y</text>
      <circle cx="200" cy="55" r="4" fill="#60a5fa"/>
      <circle cx="200" cy="245" r="4" fill="#60a5fa"/>
      <!-- pure shear point -->
      <circle cx="275" cy="85" r="4" fill="#34d399"/>
      <text x="280" y="80" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Pure shear</text>
      <text x="280" y="93" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">\u03C4_y = \u03C3_y/\u221A3</text>
      <!-- legend -->
      <line x1="50" y1="265" x2="75" y2="265" stroke="#60a5fa" stroke-width="2.5"/>
      <text x="80" y="269" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11">Von Mises (ellipse)</text>
      <line x1="200" y1="265" x2="225" y2="265" stroke="#f472b6" stroke-width="2" stroke-dasharray="6,3"/>
      <text x="230" y="269" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">Tresca (hexagon)</text>
      <!-- annotation: Tresca is more conservative -->
      <text x="110" y="180" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">Tresca is</text>
      <text x="105" y="192" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">inscribed =</text>
      <text x="100" y="204" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">more conservative</text>
    </svg>`,
    options: [
      { id: 'a', text: 'It predicts yielding based on distortion energy (shape change), ignoring volumetric strain' },
      { id: 'b', text: 'It is best suited for brittle materials like cast iron' },
      { id: 'c', text: 'Under pure shear, Von Mises predicts yield at a shear stress of σ_y / √3' },
      { id: 'd', text: 'It produces a circular yield surface in the deviatoric (pi) plane' },
      { id: 'e', text: 'It always gives a more conservative prediction than the Tresca criterion' },
    ],
    correctAnswers: ['a', 'c', 'd'],
    explanation: 'Von Mises is based on distortion energy theory — it says yielding occurs when the energy associated with shape distortion reaches a critical value. This correctly ignores hydrostatic stress (which changes volume but not shape). For pure shear, it predicts τ_y = σ_y/√3 ≈ 0.577σ_y. Its yield surface is a cylinder (circle in the pi-plane). It is NOT for brittle materials (use Mohr-Coulomb or max normal stress). Tresca is actually more conservative than Von Mises, not the other way around.',
    interviewInsight: 'Failure theories are asked in almost every structural/mechanical design interview. The interviewer wants to see you know WHEN to use which criterion — Von Mises for ductile, max normal stress for brittle.',
    commonMistake: 'Confusing Von Mises (ductile) with brittle failure criteria. Also, many candidates get the Tresca vs. Von Mises conservatism backwards — Tresca is the inscribed hexagon, so it is more conservative.',
    tags: ['von-mises', 'yield-criterion', 'distortion-energy', 'tresca', 'failure-theory'],
  },

  // SOM-005 — Scenario
  {
    id: 'som-005',
    type: 'scenario',
    topic: 'strength-of-materials',
    subtopic: 'Fatigue & Fracture',
    difficulty: 'advanced',
    question: 'A shaft in a production line keeps failing near a keyway after about 3 months of operation. Walk me through your investigation.',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="som005-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
      </defs>
      <!-- Title: Fracture Surface View -->
      <text x="110" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">Fracture Surface (cross-section)</text>
      <!-- circular shaft cross-section -->
      <circle cx="200" cy="145" r="90" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <!-- keyway notch at top -->
      <rect x="185" y="55" width="30" height="20" fill="#334155" stroke="#f472b6" stroke-width="2"/>
      <!-- crack initiation point at keyway corner -->
      <circle cx="185" cy="75" r="5" fill="#f472b6" stroke="#f472b6" stroke-width="1"/>
      <text x="125" y="60" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">Crack origin</text>
      <line x1="163" y1="62" x2="182" y2="73" stroke="#f472b6" stroke-width="1" stroke-dasharray="2,2"/>
      <!-- beach marks (concentric arcs from crack origin) -->
      <path d="M 175 85 A 20 20 0 0 1 215 95" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <path d="M 165 95 A 35 35 0 0 1 230 115" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <path d="M 155 108 A 50 50 0 0 1 245 135" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <path d="M 148 122 A 65 65 0 0 1 255 155" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <path d="M 142 138 A 80 80 0 0 1 260 175" fill="none" stroke="#60a5fa" stroke-width="1"/>
      <!-- beach marks label -->
      <text x="260" y="100" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">Beach marks</text>
      <text x="260" y="113" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">(fatigue crack</text>
      <text x="260" y="126" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">growth zone)</text>
      <!-- smooth fatigue zone label -->
      <text x="175" y="125" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">smooth</text>
      <!-- final fracture zone (rough, bottom portion) -->
      <path d="M 140 155 Q 160 190 180 200 Q 200 210 220 200 Q 240 190 260 180" fill="none" stroke="#fb923c" stroke-width="2"/>
      <!-- rough texture lines in final fracture zone -->
      <line x1="155" y1="175" x2="165" y2="190" stroke="#fb923c" stroke-width="1"/>
      <line x1="175" y1="185" x2="185" y2="200" stroke="#fb923c" stroke-width="1"/>
      <line x1="195" y1="190" x2="205" y2="210" stroke="#fb923c" stroke-width="1"/>
      <line x1="215" y1="185" x2="225" y2="195" stroke="#fb923c" stroke-width="1"/>
      <line x1="235" y1="175" x2="245" y2="185" stroke="#fb923c" stroke-width="1"/>
      <!-- final fracture label -->
      <text x="140" y="225" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">Final overload</text>
      <text x="140" y="238" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">fracture (rough)</text>
      <!-- shaft info box -->
      <rect x="20" y="248" width="360" height="28" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
      <text x="30" y="266" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">4140 steel, 30 HRC | 50 HP @ 1750 RPM | Failed at ~3 months (10\u2078 cycles)</text>
      <!-- keyway label -->
      <text x="220" y="60" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">Keyway</text>
      <text x="218" y="73" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">(Kt ~ 3-4)</text>
    </svg>`,
    context: 'The shaft is made of 4140 steel, heat-treated to 30 HRC. It transmits 50 HP at 1750 RPM through a keyway to a gear. Failures show a flat, smooth fracture surface with beach marks emanating from the keyway corner.',
    steps: [
      {
        prompt: 'What does the fracture surface tell you?',
        idealResponse: 'The flat, smooth surface with beach marks is the classic signature of fatigue failure. Beach marks (also called clamshell marks) indicate intermittent crack growth, confirming cyclic loading. The crack initiated at the keyway corner, which is the highest stress concentration point.',
      },
      {
        prompt: 'What are the possible root causes?',
        idealResponse: 'Several factors: (1) The keyway corner has a high stress concentration factor (Kt ~ 3-4) that was likely not accounted for in the original design. (2) The shaft may have been undersized for the combined torsion + bending loads. (3) Surface finish at the keyway might be poor from broaching. (4) Possible misalignment creating unexpected bending loads. (5) The 30 HRC hardness may have a notch-sensitivity factor that amplifies the geometric Kt.',
      },
      {
        prompt: 'How would you fix it?',
        idealResponse: 'Short-term: add a generous fillet radius at the keyway corners (even 1-2 mm helps enormously), shot-peen the keyway area to introduce compressive residual stresses. Long-term: consider switching to a splined connection (lower Kt), increase shaft diameter, or use a higher-fatigue-strength material. Also verify alignment and check for any unexpected dynamic loads.',
      },
    ],
    keyTakeaway: 'Fatigue failures are predictable if you account for stress concentrations, surface finish, and actual loading conditions. The beach marks tell the full story of how the crack grew.',
    explanation: 'This is one of the most common real-world shaft failures. The combination of a keyway (stress riser) with rotating bending (fully reversed stress) creates a textbook fatigue scenario. The 3-month lifetime suggests the stress is well above the endurance limit but below the static strength.',
    interviewInsight: 'This scenario tests your ability to read a fracture surface, identify root causes systematically, and propose practical fixes — not just textbook solutions.',
    commonMistake: 'Immediately jumping to "make it bigger" without diagnosing the root cause. Also, not recognizing beach marks as a fatigue indicator.',
    tags: ['fatigue', 'fracture-analysis', 'keyway', 'beach-marks', 'shaft-failure', 'root-cause'],
  },

  // SOM-006 — Multiple Choice
  {
    id: 'som-006',
    type: 'multiple-choice',
    topic: 'strength-of-materials',
    subtopic: 'Buckling & Stability',
    difficulty: 'intermediate',
    question: 'A slender column is pinned at both ends. If you double its length while keeping everything else the same, what happens to the critical buckling load?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="som006-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="som006-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
      </defs>
      <!-- Labels -->
      <text x="75" y="18" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Original (L)</text>
      <text x="255" y="18" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Doubled (2L)</text>
      <!-- divider -->
      <line x1="195" y1="10" x2="195" y2="270" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- ORIGINAL COLUMN (left) -->
      <!-- straight column -->
      <line x1="100" y1="50" x2="100" y2="210" stroke="#94a3b8" stroke-width="4"/>
      <!-- buckled shape (dashed) -->
      <path d="M 100 50 Q 130 130 100 210" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,3"/>
      <!-- pin at top -->
      <polygon points="100,50 90,35 110,35" fill="none" stroke="#f472b6" stroke-width="2"/>
      <circle cx="100" cy="50" r="3" fill="#f472b6"/>
      <!-- pin at bottom -->
      <polygon points="100,210 90,225 110,225" fill="none" stroke="#f472b6" stroke-width="2"/>
      <circle cx="100" cy="210" r="3" fill="#f472b6"/>
      <line x1="85" y1="225" x2="115" y2="225" stroke="#f472b6" stroke-width="1.5"/>
      <!-- ground hatching -->
      <line x1="88" y1="225" x2="83" y2="233" stroke="#f472b6" stroke-width="1"/>
      <line x1="95" y1="225" x2="90" y2="233" stroke="#f472b6" stroke-width="1"/>
      <line x1="102" y1="225" x2="97" y2="233" stroke="#f472b6" stroke-width="1"/>
      <line x1="109" y1="225" x2="104" y2="233" stroke="#f472b6" stroke-width="1"/>
      <!-- load arrow at top -->
      <line x1="100" y1="25" x2="100" y2="46" stroke="#60a5fa" stroke-width="2.5" marker-end="url(#som006-arrowhead)"/>
      <text x="110" y="35" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11">P_cr</text>
      <!-- length annotation -->
      <line x1="55" y1="50" x2="55" y2="210" stroke="#34d399" stroke-width="1"/>
      <line x1="50" y1="50" x2="60" y2="50" stroke="#34d399" stroke-width="1"/>
      <line x1="50" y1="210" x2="60" y2="210" stroke="#34d399" stroke-width="1"/>
      <text x="42" y="135" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">L</text>
      <!-- DOUBLED COLUMN (right) -->
      <!-- straight column (taller) -->
      <line x1="300" y1="30" x2="300" y2="250" stroke="#94a3b8" stroke-width="4"/>
      <!-- buckled shape (dashed, larger deflection) -->
      <path d="M 300 30 Q 345 140 300 250" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,3"/>
      <!-- pin at top -->
      <polygon points="300,30 290,15 310,15" fill="none" stroke="#f472b6" stroke-width="2"/>
      <circle cx="300" cy="30" r="3" fill="#f472b6"/>
      <!-- pin at bottom -->
      <polygon points="300,250 290,265 310,265" fill="none" stroke="#f472b6" stroke-width="2"/>
      <circle cx="300" cy="250" r="3" fill="#f472b6"/>
      <line x1="285" y1="265" x2="315" y2="265" stroke="#f472b6" stroke-width="1.5"/>
      <line x1="288" y1="265" x2="283" y2="273" stroke="#f472b6" stroke-width="1"/>
      <line x1="295" y1="265" x2="290" y2="273" stroke="#f472b6" stroke-width="1"/>
      <line x1="302" y1="265" x2="297" y2="273" stroke="#f472b6" stroke-width="1"/>
      <line x1="309" y1="265" x2="304" y2="273" stroke="#f472b6" stroke-width="1"/>
      <!-- smaller load arrow -->
      <line x1="300" y1="5" x2="300" y2="26" stroke="#f472b6" stroke-width="2" marker-end="url(#som006-arrowhead-pink)"/>
      <text x="310" y="15" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">P_cr/4</text>
      <!-- length annotation -->
      <line x1="360" y1="30" x2="360" y2="250" stroke="#34d399" stroke-width="1"/>
      <line x1="355" y1="30" x2="365" y2="30" stroke="#34d399" stroke-width="1"/>
      <line x1="355" y1="250" x2="365" y2="250" stroke="#34d399" stroke-width="1"/>
      <text x="367" y="145" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">2L</text>
      <!-- Euler formula -->
      <text x="60" y="258" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">P_cr = \u03C0\u00B2EI / (KL)\u00B2</text>
      <text x="60" y="274" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">2\u00D7 length \u2192 1/4 \u00D7 P_cr (L\u00B2 dependence)</text>
    </svg>`,
    options: [
      { id: 'a', text: 'It drops to 1/2 of the original' },
      { id: 'b', text: 'It drops to 1/4 of the original' },
      { id: 'c', text: 'It drops to 1/8 of the original' },
      { id: 'd', text: 'It stays the same because the material strength has not changed' },
    ],
    correctAnswer: 'b',
    explanation: 'Euler\'s buckling load is P_cr = π²EI / (KL)². The critical load is inversely proportional to the square of the effective length. Double the length → P_cr drops by a factor of 4 (to 1/4). This is why long slender columns are so much weaker than short ones.',
    interviewInsight: 'This tests whether you know the Euler formula and understand its L² dependence. Interviewers often follow up by asking about the difference between pinned-pinned and fixed-free end conditions.',
    realWorldConnection: 'This is why long hydraulic cylinder rods, car antenna masts, and tall building columns must be carefully analyzed for buckling — length is the dominant variable.',
    commonMistake: 'Saying 1/2 (linear relationship) instead of 1/4 (squared relationship). The L² term is the critical insight.',
    tags: ['buckling', 'euler', 'column', 'critical-load', 'slenderness'],
  },

  // SOM-007 — Two Choice Tradeoff
  {
    id: 'som-007',
    type: 'two-choice-tradeoff',
    topic: 'strength-of-materials',
    subtopic: 'Beam Bending',
    difficulty: 'intermediate',
    question: 'You need to stiffen a deflecting beam. Should you increase the width or the height of a rectangular cross-section?',
    diagram: `<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="som007-arrowhead-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#34d399"/>
        </marker>
      </defs>
      <!-- Title -->
      <text x="55" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Original (b \u00D7 h)</text>
      <text x="175" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">\u00D72 Width</text>
      <text x="310" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">\u00D72 Height</text>
      <!-- ORIGINAL cross-section -->
      <rect x="50" y="50" width="50" height="80" rx="1" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <!-- dimension labels -->
      <text x="63" y="44" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">b</text>
      <line x1="50" y1="47" x2="100" y2="47" stroke="#34d399" stroke-width="1"/>
      <text x="105" y="95" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">h</text>
      <line x1="108" y1="50" x2="108" y2="130" stroke="#34d399" stroke-width="1"/>
      <!-- neutral axis -->
      <line x1="45" y1="90" x2="105" y2="90" stroke="#f472b6" stroke-width="1" stroke-dasharray="3,2"/>
      <text x="30" y="88" fill="#f472b6" font-family="system-ui, sans-serif" font-size="8">NA</text>
      <!-- I value -->
      <text x="40" y="150" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">I = bh\u00B3/12</text>
      <text x="50" y="165" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">= I\u2080</text>
      <!-- DOUBLED WIDTH cross-section -->
      <rect x="160" y="50" width="100" height="80" rx="1" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <text x="193" y="44" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">2b</text>
      <line x1="160" y1="47" x2="260" y2="47" stroke="#34d399" stroke-width="1"/>
      <text x="265" y="95" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">h</text>
      <line x1="268" y1="50" x2="268" y2="130" stroke="#34d399" stroke-width="1"/>
      <!-- neutral axis -->
      <line x1="155" y1="90" x2="265" y2="90" stroke="#f472b6" stroke-width="1" stroke-dasharray="3,2"/>
      <!-- I value -->
      <text x="165" y="150" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">I = (2b)h\u00B3/12</text>
      <text x="175" y="165" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">= 2 \u00D7 I\u2080</text>
      <!-- DOUBLED HEIGHT cross-section -->
      <rect x="320" y="10" width="50" height="160" rx="1" fill="#334155" stroke="#f472b6" stroke-width="2"/>
      <text x="333" y="6" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">b</text>
      <line x1="320" y1="8" x2="370" y2="8" stroke="#34d399" stroke-width="1"/>
      <text x="375" y="95" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">2h</text>
      <line x1="378" y1="10" x2="378" y2="170" stroke="#34d399" stroke-width="1"/>
      <!-- neutral axis -->
      <line x1="315" y1="90" x2="375" y2="90" stroke="#f472b6" stroke-width="1" stroke-dasharray="3,2"/>
      <!-- I value -->
      <text x="305" y="190" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">I = b(2h)\u00B3/12</text>
      <text x="315" y="205" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">= 8 \u00D7 I\u2080</text>
      <!-- comparison bar chart at bottom -->
      <text x="30" y="225" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Stiffness gain:</text>
      <!-- original bar -->
      <rect x="30" y="232" width="30" height="15" rx="1" fill="#94a3b8"/>
      <text x="65" y="244" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">1\u00D7 (original)</text>
      <!-- 2x width bar -->
      <rect x="30" y="252" width="60" height="15" rx="1" fill="#60a5fa"/>
      <text x="95" y="264" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">2\u00D7 (\u00D72 width)</text>
      <!-- 2x height bar -->
      <rect x="215" y="232" width="160" height="15" rx="1" fill="#f472b6"/>
      <text x="215" y="264" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">8\u00D7 (\u00D72 height) \u2190 much better!</text>
    </svg>`,
    choices: [
      {
        id: 'a',
        text: 'Increase the width (horizontal dimension)',
        pros: ['Improves lateral stability', 'Less likely to cause interference in tight spaces', 'Easier to machine or fabricate in some cases'],
        cons: ['Moment of inertia scales linearly with width (I = bh³/12)', 'Less efficient use of material for stiffness', 'Adds more weight for the same stiffness gain'],
      },
      {
        id: 'b',
        text: 'Increase the height (vertical dimension)',
        pros: ['Moment of inertia scales with the CUBE of height', 'Much more material-efficient for reducing deflection', 'A small height increase gives a large stiffness increase'],
        cons: ['May cause clearance issues vertically', 'Taller beams are more susceptible to lateral-torsional buckling', 'May require lateral bracing'],
      },
    ],
    preferredAnswer: 'b',
    acceptableAnswer: 'either',
    justification: 'Increasing height is overwhelmingly more effective because I = bh³/12 — stiffness scales with the cube of height but only linearly with width. Doubling the height gives 8x the stiffness; doubling the width gives only 2x. However, you must check for lateral-torsional buckling if the beam becomes tall and narrow.',
    explanation: 'This is one of the most important intuitions in structural design. It explains why I-beams have tall, thin webs — the material is placed far from the neutral axis where it contributes most to stiffness and strength.',
    interviewInsight: 'Interviewers love this because it reveals whether you have genuine structural intuition. The h³ relationship should be instant recall for any mechanical engineer.',
    commonMistake: 'Thinking width and height contribute equally, or not knowing the cubic relationship of height to stiffness.',
    tags: ['beam', 'moment-of-inertia', 'stiffness', 'I-beam', 'deflection', 'design'],
  },

  // SOM-008 — Confidence Rated
  {
    id: 'som-008',
    type: 'confidence-rated',
    topic: 'strength-of-materials',
    subtopic: 'Stress & Strain',
    difficulty: 'beginner',
    question: 'What does Poisson\'s ratio describe?',
    diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="som008-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="som008-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
      </defs>
      <!-- BEFORE (left side) -->
      <text x="55" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Before loading</text>
      <!-- original bar -->
      <rect x="40" y="60" width="120" height="60" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <!-- original dimensions -->
      <line x1="40" y1="55" x2="160" y2="55" stroke="#34d399" stroke-width="1"/>
      <text x="85" y="50" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">L\u2080</text>
      <line x1="35" y1="60" x2="35" y2="120" stroke="#34d399" stroke-width="1"/>
      <text x="18" y="95" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">d\u2080</text>
      <!-- AFTER (right side) -->
      <text x="260" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Under tension</text>
      <!-- stretched bar (longer, thinner) -->
      <rect x="215" y="70" width="170" height="40" rx="2" fill="#334155" stroke="#60a5fa" stroke-width="2" stroke-dasharray="0"/>
      <!-- original outline (dashed) for comparison -->
      <rect x="230" y="60" width="120" height="60" rx="2" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
      <!-- tension arrows -->
      <line x1="215" y1="90" x2="215" y2="90" stroke="#60a5fa" stroke-width="0"/>
      <line x1="213" y1="90" x2="195" y2="90" stroke="#60a5fa" stroke-width="2.5" marker-end="url(#som008-arrowhead)"/>
      <line x1="387" y1="90" x2="395" y2="90" stroke="#60a5fa" stroke-width="2.5"/>
      <line x1="385" y1="90" x2="395" y2="90" stroke="#60a5fa" stroke-width="2.5"/>
      <!-- right force arrow -->
      <line x1="387" y1="90" x2="398" y2="90" stroke="#60a5fa" stroke-width="2.5"/>
      <polygon points="398,90 391,86 391,94" fill="#60a5fa"/>
      <!-- force labels -->
      <text x="192" y="82" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">F</text>
      <!-- axial elongation (delta L) -->
      <line x1="350" y1="55" x2="385" y2="55" stroke="#f472b6" stroke-width="2" marker-end="url(#som008-arrowhead-pink)"/>
      <text x="352" y="50" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">\u0394L</text>
      <!-- lateral contraction indicators -->
      <line x1="290" y1="68" x2="290" y2="62" stroke="#f472b6" stroke-width="1.5" marker-end="url(#som008-arrowhead-pink)"/>
      <line x1="290" y1="112" x2="290" y2="118" stroke="#f472b6" stroke-width="1.5" marker-end="url(#som008-arrowhead-pink)"/>
      <text x="298" y="60" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">\u0394d</text>
      <!-- formula box -->
      <rect x="50" y="148" width="300" height="50" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
      <text x="80" y="172" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="14">\u03BD = -(\u0394d/d\u2080) / (\u0394L/L\u2080)</text>
      <text x="90" y="192" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">= -(lateral strain) / (axial strain)</text>
      <!-- typical values -->
      <text x="50" y="220" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">Typical: steel ~ 0.3 | rubber ~ 0.5 | cork ~ 0</text>
    </svg>`,
    options: [
      { id: 'a', text: 'The ratio of shear stress to shear strain' },
      { id: 'b', text: 'The ratio of lateral contraction to axial elongation when a material is pulled in tension' },
      { id: 'c', text: 'The ratio of ultimate stress to yield stress' },
      { id: 'd', text: 'The ratio of elastic modulus to shear modulus' },
    ],
    correctAnswer: 'b',
    confidenceLevels: ['Guessing', 'Somewhat sure', 'Very confident'],
    explanation: 'Poisson\'s ratio ν = -(lateral strain)/(axial strain). When you stretch a rubber band, it gets thinner — that thinning relative to the stretching is Poisson\'s ratio. Typical values: steel ~0.3, rubber ~0.5 (incompressible), cork ~0. It connects E, G, and K through the relationship G = E / 2(1+ν).',
    interviewInsight: 'Basic definition question, but confidence calibration matters. A candidate who is unsure about Poisson\'s ratio needs to review fundamentals. This is an early filter question.',
    commonMistake: 'Confusing Poisson\'s ratio with the shear modulus relationship (option d is related but not the definition).',
    tags: ['poissons-ratio', 'strain', 'material-properties', 'elasticity'],
  },

  // SOM-009 — Spot the Flaw
  {
    id: 'som-009',
    type: 'spot-the-flaw',
    topic: 'strength-of-materials',
    subtopic: 'Failure Theories',
    difficulty: 'advanced',
    question: 'Spot the flaw in this engineering analysis:',
    diagram: `<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="som009-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
      </defs>
      <!-- Title -->
      <text x="80" y="18" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Ductile vs Brittle Failure Behavior</text>
      <!-- divider -->
      <line x1="200" y1="25" x2="200" y2="200" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- DUCTILE (left) -->
      <text x="60" y="40" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Ductile (steel)</text>
      <!-- stress-strain curve showing yield + necking -->
      <line x1="30" y1="170" x2="30" y2="50" stroke="#94a3b8" stroke-width="1"/>
      <line x1="30" y1="170" x2="180" y2="170" stroke="#94a3b8" stroke-width="1"/>
      <text x="15" y="48" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">\u03C3</text>
      <text x="175" y="185" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">\u03B5</text>
      <!-- ductile curve -->
      <path d="M 30 170 L 55 75 Q 70 60 90 65 Q 130 70 155 85" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <!-- yield point -->
      <circle cx="55" cy="75" r="4" fill="#60a5fa"/>
      <text x="60" y="68" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">\u03C3_y</text>
      <!-- yield plateau + necking region -->
      <text x="90" y="58" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">yielding</text>
      <!-- Von Mises check mark -->
      <text x="50" y="195" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">Von Mises: correct</text>
      <!-- BRITTLE (right) -->
      <text x="240" y="40" fill="#f472b6" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Brittle (cast iron)</text>
      <!-- stress-strain curve (linear to fracture) -->
      <line x1="220" y1="170" x2="220" y2="50" stroke="#94a3b8" stroke-width="1"/>
      <line x1="220" y1="170" x2="380" y2="170" stroke="#94a3b8" stroke-width="1"/>
      <text x="205" y="48" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">\u03C3</text>
      <text x="375" y="185" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">\u03B5</text>
      <!-- brittle curve - tension (short) -->
      <path d="M 220 170 L 260 80" fill="none" stroke="#f472b6" stroke-width="2"/>
      <!-- fracture point (X mark) -->
      <line x1="255" y1="75" x2="265" y2="85" stroke="#fb923c" stroke-width="2.5"/>
      <line x1="265" y1="75" x2="255" y2="85" stroke="#fb923c" stroke-width="2.5"/>
      <text x="268" y="75" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">fracture!</text>
      <!-- tensile strength label -->
      <text x="225" y="72" fill="#f472b6" font-family="system-ui, sans-serif" font-size="9">\u03C3_t</text>
      <!-- compression strength (much higher) -->
      <line x1="220" y1="170" x2="280" y2="52" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="270" y="48" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">\u03C3_c (3-4\u00D7 \u03C3_t)</text>
      <!-- Von Mises X mark -->
      <text x="230" y="195" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">Von Mises: WRONG</text>
      <text x="230" y="210" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">Use Mohr-Coulomb</text>
      <!-- Key message box -->
      <rect x="30" y="225" width="340" height="35" rx="4" fill="#334155" stroke="#fb923c" stroke-width="2"/>
      <text x="42" y="243" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">Cast iron: \u03C3_comp \u2248 3-4\u00D7 \u03C3_tens</text>
      <text x="42" y="257" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Von Mises treats tension = compression \u2192 unsafe for brittle!</text>
    </svg>`,
    statement: 'A cast iron bracket is loaded in combined tension and torsion. Using the Von Mises criterion, the equivalent stress is calculated as 180 MPa. The cast iron has a yield strength of 250 MPa, giving a safety factor of 1.39. The design is acceptable.',
    flaw: {
      text: 'Using the Von Mises criterion for cast iron analysis.',
      flawIndex: 1,
      flawExplanation: 'Von Mises is a yield criterion for DUCTILE materials. Cast iron is BRITTLE — it fails by fracture, not yielding, and behaves differently in tension vs. compression. The correct approach is to use the Maximum Normal Stress theory (Rankine) or the Coulomb-Mohr theory, which accounts for the asymmetry between tensile and compressive strengths in brittle materials.',
    },
    correctedStatement: 'A cast iron bracket under combined tension and torsion should be analyzed using the Coulomb-Mohr or Modified Mohr criterion, which accounts for cast iron\'s much higher compressive strength than tensile strength. The Von Mises criterion is inappropriate for brittle materials.',
    explanation: 'Cast iron typically has compressive strength 3-4x its tensile strength. Von Mises treats tension and compression symmetrically, so it dangerously overestimates the safety factor for a brittle material loaded in tension. The Mohr-Coulomb criterion captures this asymmetry.',
    interviewInsight: 'This is a critical practical error. Using the wrong failure theory can lead to unsafe designs. Interviewers test this to ensure you can match the right analysis tool to the right material.',
    commonMistake: 'Applying Von Mises to everything because it is the most commonly taught criterion. Engineers must choose the failure theory based on material behavior (ductile vs. brittle).',
    tags: ['von-mises', 'cast-iron', 'brittle', 'failure-theory', 'coulomb-mohr'],
  },

  // SOM-010 — Multiple Choice
  {
    id: 'som-010',
    type: 'multiple-choice',
    topic: 'strength-of-materials',
    subtopic: 'Torsion',
    difficulty: 'intermediate',
    question: 'Two shafts transmit the same power at the same RPM. Shaft A is solid with diameter d. Shaft B is hollow with outer diameter d and inner diameter d/2. How do their maximum shear stresses compare?',
    diagram: `<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="som010-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
      </defs>
      <!-- Titles -->
      <text x="55" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Shaft A (solid)</text>
      <text x="250" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Shaft B (hollow)</text>
      <!-- divider -->
      <line x1="200" y1="10" x2="200" y2="200" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- SOLID SHAFT cross-section -->
      <circle cx="100" cy="100" r="55" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="100" cy="100" r="3" fill="#94a3b8"/>
      <!-- shear stress distribution (linear from center) -->
      <!-- stress gradient arrows -->
      <line x1="103" y1="100" x2="155" y2="100" stroke="#60a5fa" stroke-width="1"/>
      <line x1="103" y1="100" x2="130" y2="100" stroke="#60a5fa" stroke-width="2"/>
      <line x1="130" y1="100" x2="155" y2="100" stroke="#60a5fa" stroke-width="3"/>
      <!-- stress triangle -->
      <polygon points="100,90 155,85 155,90" fill="#60a5fa" opacity="0.3" stroke="#60a5fa" stroke-width="1"/>
      <polygon points="100,110 155,115 155,110" fill="#60a5fa" opacity="0.3" stroke="#60a5fa" stroke-width="1"/>
      <!-- tau_max label -->
      <text x="158" y="95" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">\u03C4_max</text>
      <!-- tau=0 at center -->
      <text x="75" y="90" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">\u03C4=0</text>
      <!-- diameter label -->
      <line x1="45" y1="100" x2="155" y2="100" stroke="#34d399" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="90" y="170" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">d</text>
      <!-- J value -->
      <text x="40" y="185" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">J = \u03C0d\u2074/32</text>
      <!-- HOLLOW SHAFT cross-section -->
      <circle cx="310" cy="100" r="55" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="310" cy="100" r="27" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
      <circle cx="310" cy="100" r="3" fill="#94a3b8"/>
      <!-- shear stress distribution (starts at inner radius) -->
      <line x1="337" y1="100" x2="365" y2="100" stroke="#f472b6" stroke-width="2.5"/>
      <!-- stress shape in wall -->
      <polygon points="337,92 365,88 365,92" fill="#f472b6" opacity="0.3" stroke="#f472b6" stroke-width="1"/>
      <polygon points="337,108 365,112 365,108" fill="#f472b6" opacity="0.3" stroke="#f472b6" stroke-width="1"/>
      <!-- tau labels -->
      <text x="368" y="95" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">\u03C4_max</text>
      <text x="320" y="90" fill="#f472b6" font-family="system-ui, sans-serif" font-size="8">\u03C4_min</text>
      <!-- inner and outer diameter labels -->
      <text x="295" y="170" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">d (outer)</text>
      <text x="295" y="183" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">d/2 (inner)</text>
      <!-- hollow region label -->
      <text x="293" y="103" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8">hollow</text>
      <!-- J value -->
      <text x="232" y="198" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">J = \u03C0(d\u2074-(d/2)\u2074)/32</text>
      <text x="245" y="213" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">= (15/16) \u00D7 J_solid</text>
      <!-- Comparison box -->
      <rect x="30" y="222" width="340" height="40" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
      <text x="42" y="240" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">\u03C4 = Tc/J \u2192 \u03C4_hollow = (16/15) \u00D7 \u03C4_solid = +6.7%</text>
      <text x="42" y="256" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">But hollow is 25% lighter! (inner core barely matters)</text>
    </svg>`,
    options: [
      { id: 'a', text: 'Shaft B has about 7% higher stress than Shaft A' },
      { id: 'b', text: 'Both have the same stress because they have the same outer diameter' },
      { id: 'c', text: 'Shaft B has about 50% higher stress because half the material is missing' },
      { id: 'd', text: 'Shaft A has higher stress because it has more material resisting the torque' },
    ],
    correctAnswer: 'a',
    explanation: 'Shear stress τ = Tc/J, where c is the outer radius (same for both) and T is the same (same power and RPM). For the solid shaft, J_solid = πd⁴/32. For the hollow shaft, J_hollow = π(d⁴ - (d/2)⁴)/32 = π(d⁴ - d⁴/16)/32 = π(15d⁴/16)/32 = (15/16) × J_solid. So J_hollow = 0.9375 × J_solid. The hollow shaft stress is 1/0.9375 = 1.067 times the solid shaft stress — about 6.7% higher. Yet the hollow shaft is 25% lighter!',
    interviewInsight: 'This shows whether you can work with the torsion formula quantitatively. The key insight is that removing the inner core barely affects stress because material near the center contributes very little to torsional resistance.',
    realWorldConnection: 'This is exactly why drive shafts, bicycle frames, and aircraft structures use hollow tubes — you lose almost no strength but save significant weight.',
    commonMistake: 'Saying 50% higher stress because "half the diameter is removed" — but only 1/16 of the polar moment is lost because J scales with r⁴.',
    tags: ['torsion', 'hollow-shaft', 'polar-moment', 'weight-saving', 'shear-stress'],
  },
];
