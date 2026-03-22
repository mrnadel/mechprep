import type { Question } from '../types';

export const engineeringMechanicsQuestions: Question[] = [
  // EM-001 — Multiple Choice
  {
    id: 'em-001',
    type: 'multiple-choice',
    topic: 'engineering-mechanics',
    subtopic: 'Statics & Equilibrium',
    difficulty: 'beginner',
    question: 'A rigid beam is pinned at one end and supported by a cable at the other. A load hangs from the midpoint. If you cut the cable, which direction does the reaction force at the pin shift?',
    diagram: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="em001-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="em001-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
      </defs>
      <!-- beam -->
      <line x1="50" y1="110" x2="350" y2="110" stroke="#94a3b8" stroke-width="3"/>
      <!-- pin support at left -->
      <polygon points="50,110 35,140 65,140" fill="none" stroke="#f472b6" stroke-width="2"/>
      <!-- ground hatching under pin -->
      <line x1="30" y1="140" x2="70" y2="140" stroke="#f472b6" stroke-width="1.5"/>
      <line x1="33" y1="140" x2="28" y2="148" stroke="#f472b6" stroke-width="1"/>
      <line x1="40" y1="140" x2="35" y2="148" stroke="#f472b6" stroke-width="1"/>
      <line x1="47" y1="140" x2="42" y2="148" stroke="#f472b6" stroke-width="1"/>
      <line x1="54" y1="140" x2="49" y2="148" stroke="#f472b6" stroke-width="1"/>
      <line x1="61" y1="140" x2="56" y2="148" stroke="#f472b6" stroke-width="1"/>
      <line x1="68" y1="140" x2="63" y2="148" stroke="#f472b6" stroke-width="1"/>
      <!-- cable at right end (dashed) -->
      <line x1="350" y1="110" x2="350" y2="25" stroke="#60a5fa" stroke-width="2" stroke-dasharray="6,3"/>
      <!-- ceiling anchor for cable -->
      <line x1="330" y1="25" x2="370" y2="25" stroke="#94a3b8" stroke-width="2"/>
      <line x1="333" y1="25" x2="338" y2="17" stroke="#94a3b8" stroke-width="1"/>
      <line x1="340" y1="25" x2="345" y2="17" stroke="#94a3b8" stroke-width="1"/>
      <line x1="347" y1="25" x2="352" y2="17" stroke="#94a3b8" stroke-width="1"/>
      <line x1="354" y1="25" x2="359" y2="17" stroke="#94a3b8" stroke-width="1"/>
      <line x1="361" y1="25" x2="366" y2="17" stroke="#94a3b8" stroke-width="1"/>
      <!-- load W at midpoint -->
      <line x1="200" y1="110" x2="200" y2="185" stroke="#60a5fa" stroke-width="2" marker-end="url(#em001-arrowhead)"/>
      <text x="210" y="180" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="14" font-weight="bold">W</text>
      <!-- scissors icon on cable (cut indicator) -->
      <text x="360" y="72" fill="#fb923c" font-family="system-ui, sans-serif" font-size="14">cut?</text>
      <line x1="356" y1="60" x2="370" y2="75" stroke="#fb923c" stroke-width="1.5"/>
      <line x1="370" y1="60" x2="356" y2="75" stroke="#fb923c" stroke-width="1.5"/>
      <!-- reaction arrows at pin -->
      <line x1="50" y1="110" x2="50" y2="60" stroke="#f472b6" stroke-width="2" marker-end="url(#em001-arrowhead-pink)"/>
      <text x="22" y="58" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">R_y</text>
      <line x1="50" y1="110" x2="100" y2="110" stroke="#f472b6" stroke-width="2" marker-end="url(#em001-arrowhead-pink)"/>
      <text x="85" y="105" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">R_x</text>
      <!-- labels -->
      <text x="40" y="158" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">Pin</text>
      <text x="330" y="15" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11">Cable</text>
      <!-- dimension line for midpoint -->
      <line x1="50" y1="210" x2="200" y2="210" stroke="#34d399" stroke-width="1" stroke-dasharray="3,3"/>
      <line x1="200" y1="210" x2="350" y2="210" stroke="#34d399" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="110" y="228" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">L/2</text>
      <text x="260" y="228" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">L/2</text>
      <circle cx="50" cy="210" r="2" fill="#34d399"/>
      <circle cx="200" cy="210" r="2" fill="#34d399"/>
      <circle cx="350" cy="210" r="2" fill="#34d399"/>
    </svg>`,
    options: [
      { id: 'a', text: 'The horizontal component vanishes and the vertical component equals the load' },
      { id: 'b', text: 'Both horizontal and vertical components increase' },
      { id: 'c', text: 'The reaction remains unchanged because the pin was already carrying the load' },
      { id: 'd', text: 'The pin cannot support the beam alone — the system collapses' },
    ],
    correctAnswer: 'a',
    explanation: 'The cable was providing both a vertical lift and a horizontal pull. Once cut, the beam can only be supported at the pin, which must now carry the full weight vertically. The horizontal component from the cable tension disappears. If the pin is truly frictionless with no horizontal load, the horizontal reaction drops to zero.',
    interviewInsight: 'Interviewers want to see that you can reason through equilibrium changes when a constraint is removed, not just solve textbook statics.',
    realWorldConnection: 'This is analogous to a rigging failure scenario — understanding how loads redistribute when a support fails is critical in crane and scaffolding design.',
    commonMistake: 'Candidates often forget that the cable was introducing a horizontal force component. They say the reaction "stays the same" because the total vertical load hasn\'t changed.',
    tags: ['statics', 'equilibrium', 'pin-reactions', 'cable', 'free-body-diagram'],
  },

  // EM-002 — Explanation / Free Text
  {
    id: 'em-002',
    type: 'free-text',
    topic: 'engineering-mechanics',
    subtopic: 'Free-Body Diagrams',
    difficulty: 'intermediate',
    question: 'Why does a bicycle stay upright while moving but fall over when stationary? Walk through the mechanics.',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="em002-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="em002-arrowhead-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#34d399"/>
        </marker>
        <marker id="em002-arrowhead-orange" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#fb923c"/>
        </marker>
      </defs>
      <!-- ground line -->
      <line x1="20" y1="230" x2="380" y2="230" stroke="#94a3b8" stroke-width="1"/>
      <!-- rear wheel -->
      <circle cx="110" cy="210" r="35" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="110" cy="210" r="3" fill="#94a3b8"/>
      <!-- front wheel -->
      <circle cx="290" cy="210" r="35" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="290" cy="210" r="3" fill="#94a3b8"/>
      <!-- frame - rear stays to seat tube -->
      <line x1="110" y1="210" x2="180" y2="130" stroke="#94a3b8" stroke-width="2.5"/>
      <!-- seat tube to head tube -->
      <line x1="180" y1="130" x2="260" y2="130" stroke="#94a3b8" stroke-width="2.5"/>
      <!-- head tube / fork -->
      <line x1="260" y1="130" x2="290" y2="210" stroke="#94a3b8" stroke-width="2.5"/>
      <!-- seat tube extended -->
      <line x1="180" y1="130" x2="175" y2="105" stroke="#94a3b8" stroke-width="2.5"/>
      <!-- handlebar -->
      <line x1="250" y1="115" x2="270" y2="125" stroke="#94a3b8" stroke-width="2"/>
      <!-- CG marker -->
      <circle cx="200" cy="140" r="5" fill="#60a5fa" stroke="#60a5fa" stroke-width="1"/>
      <text x="210" y="137" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11">CG</text>
      <!-- weight arrow from CG -->
      <line x1="200" y1="148" x2="200" y2="185" stroke="#60a5fa" stroke-width="2" marker-end="url(#em002-arrowhead)"/>
      <text x="207" y="178" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11">mg</text>
      <!-- trail dimension -->
      <line x1="275" y1="240" x2="290" y2="240" stroke="#34d399" stroke-width="1.5"/>
      <text x="270" y="258" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">trail</text>
      <!-- steering axis extended (dashed) -->
      <line x1="245" y1="95" x2="275" y2="230" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="225" y="90" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">steering axis</text>
      <!-- contact patch of front wheel -->
      <circle cx="290" cy="244" r="3" fill="#34d399"/>
      <!-- velocity arrow -->
      <line x1="310" y1="130" x2="360" y2="130" stroke="#fb923c" stroke-width="2" marker-end="url(#em002-arrowhead-orange)"/>
      <text x="320" y="122" fill="#fb923c" font-family="system-ui, sans-serif" font-size="12">v</text>
      <!-- lean angle indicator -->
      <path d="M 200 148 Q 190 165 185 175" fill="none" stroke="#f472b6" stroke-width="1.5"/>
      <text x="170" y="170" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">lean</text>
      <!-- gyroscopic precession curved arrow on front wheel -->
      <path d="M 305 195 A 20 20 0 0 1 305 225" fill="none" stroke="#34d399" stroke-width="1.5" marker-end="url(#em002-arrowhead-green)"/>
      <text x="310" y="215" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">gyro</text>
    </svg>`,
    sampleAnswer: 'A moving bicycle is stabilized primarily by trail and caster effect in the steering geometry, supplemented by gyroscopic precession of the wheels. When the bike begins to lean, the front wheel steers into the fall due to the fork geometry (trail), creating a centripetal force that pushes the contact patch back under the center of gravity. Gyroscopic precession of the spinning wheel also contributes a steering torque in the same helpful direction, though it is a secondary effect. At rest, none of these dynamic corrections occur — there is no velocity to generate centripetal correction or gyroscopic torques, so the unstable inverted-pendulum simply topples.',
    keyPoints: [
      'Trail / caster effect causes counter-steering when the bike leans',
      'Gyroscopic precession provides a supplementary (not primary) stabilizing torque',
      'At rest, the system is an unstable inverted pendulum with no corrective mechanism',
      'Rider input also plays a role at low speeds',
    ],
    explanation: 'This is a famously subtle dynamics problem. The key insight is that geometry (trail) matters more than the gyroscopic effect most people cite. Research by Kooijman et al. (2011) showed bikes can self-stabilize even without spinning wheels if the geometry is right.',
    interviewInsight: 'This tests whether you can separate popular misconception (gyroscopes keep bikes up) from actual mechanics. Interviewers love it because it shows depth of understanding vs. surface knowledge.',
    realWorldConnection: 'Motorcycle and bicycle designers tune trail, rake angle, and wheel inertia to achieve the right self-stability envelope for their target speed range.',
    commonMistake: 'Almost everyone says "gyroscopic effect" as the sole answer. That is incomplete and not even the primary mechanism.',
    tags: ['dynamics', 'stability', 'gyroscope', 'bicycle', 'counter-steering'],
  },

  // EM-003 — Estimation
  {
    id: 'em-003',
    type: 'estimation',
    topic: 'engineering-mechanics',
    subtopic: 'Dynamics & Kinematics',
    difficulty: 'intermediate',
    question: 'Estimate the force your quadriceps must produce when you stand up from a chair.',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="em003-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="em003-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
        <marker id="em003-arrowhead-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#34d399"/>
        </marker>
      </defs>
      <!-- thigh (femur) -->
      <line x1="130" y1="90" x2="210" y2="170" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
      <!-- shin (tibia) -->
      <line x1="210" y1="170" x2="210" y2="275" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
      <!-- knee joint circle -->
      <circle cx="210" cy="170" r="10" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="225" y="168" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">knee</text>
      <!-- hip joint circle -->
      <circle cx="130" cy="90" r="8" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <text x="100" y="82" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">hip</text>
      <!-- foot/ground -->
      <line x1="190" y1="275" x2="240" y2="275" stroke="#94a3b8" stroke-width="3"/>
      <line x1="170" y1="280" x2="260" y2="280" stroke="#94a3b8" stroke-width="1"/>
      <!-- body weight (W) arrow -->
      <line x1="150" y1="70" x2="150" y2="30" stroke="#60a5fa" stroke-width="2"/>
      <line x1="150" y1="70" x2="150" y2="120" stroke="#60a5fa" stroke-width="2" marker-end="url(#em003-arrowhead)"/>
      <text x="158" y="105" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="12">W (~800N)</text>
      <!-- quadriceps force arrow (along tendon) -->
      <line x1="205" y1="180" x2="165" y2="115" stroke="#f472b6" stroke-width="2.5" marker-end="url(#em003-arrowhead-pink)"/>
      <text x="140" y="140" fill="#f472b6" font-family="system-ui, sans-serif" font-size="12">F_quad</text>
      <!-- patellar tendon (short moment arm) -->
      <line x1="210" y1="170" x2="205" y2="183" stroke="#f472b6" stroke-width="2" stroke-dasharray="3,2"/>
      <!-- moment arm annotation for patellar tendon (~4-5 cm) -->
      <line x1="210" y1="172" x2="203" y2="178" stroke="#34d399" stroke-width="1.5"/>
      <text x="178" y="198" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">~4-5 cm</text>
      <!-- external moment arm (knee to CG line of action) -->
      <line x1="210" y1="170" x2="210" y2="145" stroke="#34d399" stroke-width="1" stroke-dasharray="3,2"/>
      <line x1="150" y1="120" x2="210" y2="120" stroke="#34d399" stroke-width="1" stroke-dasharray="3,2"/>
      <line x1="210" y1="120" x2="210" y2="145" stroke="#34d399" stroke-width="1"/>
      <text x="250" y="135" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">~25-30 cm</text>
      <!-- lever arm labels -->
      <text x="260" y="155" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">(external arm)</text>
      <!-- mechanical disadvantage annotation -->
      <text x="250" y="220" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">Mech. disadvantage</text>
      <text x="250" y="236" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">~6:1 ratio</text>
      <text x="250" y="252" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">F_quad ~ 3000+ N</text>
      <!-- curved moment arrow at knee -->
      <path d="M 225 155 A 20 20 0 0 1 225 185" fill="none" stroke="#f472b6" stroke-width="1.5" marker-end="url(#em003-arrowhead-pink)"/>
    </svg>`,
    hints: [
      'Consider your body weight and what fraction is being lifted',
      'Think about the lever arm at the knee joint',
      'The quadriceps attach to the tibia via the patellar tendon at a small moment arm from the knee center',
    ],
    acceptableRange: { low: 1500, high: 4500, unit: 'N', bestEstimate: 2800 },
    approachSteps: [
      'Assume an 80 kg person; weight = ~800 N',
      'When rising, roughly 70% of body weight is lifted by the legs, so ~560 N per leg needs to be overcome plus acceleration',
      'The external moment arm from knee to the center of gravity is roughly 25-30 cm',
      'The patellar tendon moment arm is only about 4-5 cm',
      'Mechanical disadvantage is roughly 6:1, so quadriceps force ~ 560 N x 6 = ~3,360 N per leg at peak',
      'Account for acceleration (standing up in ~1 s) which adds another 10-20%',
    ],
    explanation: 'The knee joint operates at a severe mechanical disadvantage. The patellar tendon inserts close to the knee pivot while the body weight acts at a long lever arm. This is why the quadriceps is the largest muscle in the body — it routinely generates forces 3-5 times body weight.',
    interviewInsight: 'Estimation questions test structured thinking and order-of-magnitude reasoning. Interviewers care about your approach, not hitting a magic number.',
    realWorldConnection: 'Knee implant designers and physical therapists must understand these forces. Knee replacement bearing surfaces are designed to handle up to 5-8x body weight during activities like stair descent.',
    commonMistake: 'Candidates often just say "body weight" without considering the mechanical advantage of the joint. The actual muscle force is many times larger than the external load.',
    tags: ['estimation', 'biomechanics', 'lever-arm', 'knee-joint', 'mechanical-advantage'],
  },

  // EM-004 — Two Choice Tradeoff
  {
    id: 'em-004',
    type: 'two-choice-tradeoff',
    topic: 'engineering-mechanics',
    subtopic: 'Friction & Contact',
    difficulty: 'intermediate',
    question: 'You are designing a braking system for a conveyor belt. Should you use a band brake or a disc brake?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="em004-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="em004-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
      </defs>
      <!-- Title labels -->
      <text x="80" y="22" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Band Brake</text>
      <text x="300" y="22" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Disc Brake</text>
      <!-- divider -->
      <line x1="195" y1="10" x2="195" y2="270" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- BAND BRAKE (left side) -->
      <!-- drum -->
      <circle cx="90" cy="130" r="50" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="90" cy="130" r="5" fill="#94a3b8"/>
      <!-- band wrapping around drum -->
      <path d="M 50 80 A 55 55 0 1 1 50 180" fill="none" stroke="#60a5fa" stroke-width="3"/>
      <!-- tight side tension -->
      <line x1="50" y1="80" x2="20" y2="50" stroke="#60a5fa" stroke-width="2" marker-end="url(#em004-arrowhead)"/>
      <text x="5" y="45" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">T_tight</text>
      <!-- slack side -->
      <line x1="50" y1="180" x2="20" y2="210" stroke="#f472b6" stroke-width="2" marker-end="url(#em004-arrowhead-pink)"/>
      <text x="5" y="225" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">T_slack</text>
      <!-- rotation arrow -->
      <path d="M 115 100 A 30 30 0 0 1 115 160" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <polygon points="115,160 110,152 120,155" fill="#fb923c"/>
      <text x="122" y="135" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">rotation</text>
      <!-- friction note -->
      <text x="55" y="250" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Self-energizing</text>
      <text x="55" y="264" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">in one direction</text>
      <!-- DISC BRAKE (right side) -->
      <!-- disc -->
      <circle cx="300" cy="130" r="50" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="300" cy="130" r="5" fill="#94a3b8"/>
      <!-- caliper body -->
      <rect x="270" y="65" width="60" height="20" rx="3" fill="none" stroke="#60a5fa" stroke-width="2"/>
      <text x="283" y="79" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="9">caliper</text>
      <!-- brake pads (top and bottom of disc at caliper) -->
      <rect x="280" y="83" width="40" height="6" rx="1" fill="#f472b6" stroke="#f472b6" stroke-width="1"/>
      <rect x="280" y="171" width="40" height="6" rx="1" fill="#f472b6" stroke="#f472b6" stroke-width="1"/>
      <!-- squeeze arrows -->
      <line x1="300" y1="68" x2="300" y2="88" stroke="#f472b6" stroke-width="2" marker-end="url(#em004-arrowhead-pink)"/>
      <line x1="300" y1="192" x2="300" y2="172" stroke="#f472b6" stroke-width="2" marker-end="url(#em004-arrowhead-pink)"/>
      <text x="312" y="62" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">F_clamp</text>
      <!-- rotation arrow -->
      <path d="M 325 100 A 30 30 0 0 1 325 160" fill="none" stroke="#fb923c" stroke-width="1.5"/>
      <polygon points="325,160 320,152 330,155" fill="#fb923c"/>
      <!-- Even wear note -->
      <text x="260" y="250" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Even pad wear,</text>
      <text x="260" y="264" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">better cooling</text>
    </svg>`,
    choices: [
      {
        id: 'a',
        text: 'Band brake — a flexible band wraps around a drum',
        pros: ['Simple and cheap to manufacture', 'Self-energizing effect amplifies braking force', 'Compact design for high-torque applications'],
        cons: ['Uneven wear due to tension variation along the band', 'Sensitive to direction of rotation for self-energizing effect', 'Heat dissipation is poor — drum gets very hot'],
      },
      {
        id: 'b',
        text: 'Disc brake — caliper squeezes a flat disc',
        pros: ['Even wear on both pads', 'Better heat dissipation with exposed disc', 'Consistent braking regardless of rotation direction', 'Easier to inspect and replace pads'],
        cons: ['More expensive and complex', 'Requires hydraulic or pneumatic actuation', 'Heavier for equivalent torque capacity'],
      },
    ],
    preferredAnswer: 'b',
    acceptableAnswer: 'either',
    justification: 'For a conveyor belt that may run in both directions and needs reliable, repeatable braking with easy maintenance, the disc brake is generally preferred. However, if the conveyor only runs one direction and cost is paramount, a band brake with proper thermal management is a valid choice.',
    explanation: 'This is a classic tradeoff between simplicity/cost and performance/maintenance. The self-energizing effect of a band brake is powerful but also dangerous — if the friction coefficient changes (wet, worn lining), braking force changes dramatically.',
    interviewInsight: 'Tradeoff questions have no single right answer. Interviewers want to see that you identify the relevant criteria (cost, maintenance, direction, thermal) and reason through them systematically.',
    commonMistake: 'Candidates pick one without discussing the tradeoffs. The interviewer wants the analysis, not just the answer.',
    tags: ['brakes', 'friction', 'conveyor', 'design-tradeoff', 'self-energizing'],
  },

  // EM-005 — Ranking
  {
    id: 'em-005',
    type: 'ranking',
    topic: 'engineering-mechanics',
    subtopic: 'Work & Energy Methods',
    difficulty: 'intermediate',
    question: 'Rank these scenarios by the translational speed (and translational kinetic energy) the object has at the bottom of an identical frictionless ramp (highest first):',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="em005-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
      </defs>
      <!-- ramp surface -->
      <polygon points="40,230 340,230 340,70" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <!-- ground -->
      <line x1="340" y1="230" x2="390" y2="230" stroke="#94a3b8" stroke-width="2"/>
      <!-- ramp surface fill -->
      <polygon points="40,230 340,230 340,70" fill="#334155" opacity="0.3"/>
      <!-- height label -->
      <line x1="350" y1="70" x2="350" y2="230" stroke="#34d399" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="358" y="155" fill="#34d399" font-family="system-ui, sans-serif" font-size="12">h</text>
      <!-- Objects on the ramp at various positions -->
      <!-- (c) Sliding block - at top -->
      <rect x="270" y="92" width="28" height="20" fill="#334155" stroke="#60a5fa" stroke-width="2" transform="rotate(-28, 284, 102)"/>
      <text x="260" y="80" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11">(c) Block</text>
      <!-- (a) Solid sphere - next position -->
      <circle cx="225" cy="137" r="14" fill="#334155" stroke="#f472b6" stroke-width="2"/>
      <text x="190" y="122" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">(a) Solid</text>
      <text x="195" y="134" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">sphere</text>
      <!-- (d) Solid cylinder -->
      <ellipse cx="170" cy="172" rx="14" ry="10" fill="#334155" stroke="#34d399" stroke-width="2"/>
      <text x="120" y="162" fill="#34d399" font-family="system-ui, sans-serif" font-size="11">(d) Solid</text>
      <text x="123" y="174" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">cylinder</text>
      <!-- (b) Hollow sphere -->
      <circle cx="115" cy="205" r="14" fill="none" stroke="#fb923c" stroke-width="2"/>
      <circle cx="115" cy="205" r="10" fill="none" stroke="#fb923c" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="62" y="196" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">(b) Hollow</text>
      <text x="68" y="208" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">sphere</text>
      <!-- velocity arrows at bottom -->
      <text x="30" y="260" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Speed at bottom:</text>
      <text x="30" y="275" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11">c &gt; a &gt; d &gt; b</text>
      <!-- Energy partition note -->
      <text x="220" y="260" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">PE = KE_trans + KE_rot</text>
      <text x="220" y="275" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">More I = less v_trans</text>
    </svg>`,
    items: [
      { id: 'a', text: 'A solid steel sphere rolling without slipping' },
      { id: 'b', text: 'A hollow thin-walled sphere rolling without slipping' },
      { id: 'c', text: 'A frictionless block sliding (no rotation)' },
      { id: 'd', text: 'A solid cylinder rolling without slipping' },
    ],
    correctOrder: ['c', 'a', 'd', 'b'],
    explanation: 'All objects start with the same potential energy. The sliding block converts all PE to translational KE. Rolling objects split PE between translational and rotational KE. The fraction going to rotation depends on the moment of inertia: solid sphere (2/5 mr^2), solid cylinder (1/2 mr^2), hollow sphere (2/3 mr^2). Higher rotational inertia means less translational speed at the bottom, so the hollow sphere is slowest.',
    interviewInsight: 'This tests whether you truly understand energy partitioning between translational and rotational modes. It is one of the most commonly asked conceptual questions in dynamics interviews.',
    realWorldConnection: 'Flywheel energy storage systems exploit high rotational inertia. Understanding how energy partitions between rotation and translation also matters in vehicle dynamics — heavier wheels reduce acceleration.',
    commonMistake: 'Many candidates think all objects arrive at the same speed because they have the same mass and ramp height. They forget that rolling objects must "spend" some energy on spin.',
    tags: ['energy', 'rolling', 'moment-of-inertia', 'ranking', 'ramp'],
  },

  // EM-006 — Spot the Flaw
  {
    id: 'em-006',
    type: 'spot-the-flaw',
    topic: 'engineering-mechanics',
    subtopic: 'Statics & Equilibrium',
    difficulty: 'advanced',
    question: 'Spot the flaw in this engineering claim:',
    diagram: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="90" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">3-Legged Stool</text>
      <text x="275" y="20" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">4-Legged Stool</text>
      <!-- 3-LEGGED STOOL (left) -->
      <!-- seat -->
      <ellipse cx="100" cy="80" rx="55" ry="12" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <!-- legs -->
      <line x1="60" y1="90" x2="45" y2="175" stroke="#94a3b8" stroke-width="3"/>
      <line x1="140" y1="90" x2="155" y2="175" stroke="#94a3b8" stroke-width="3"/>
      <line x1="100" y1="92" x2="100" y2="175" stroke="#94a3b8" stroke-width="3"/>
      <!-- contact points (feet) -->
      <circle cx="45" cy="175" r="3" fill="#60a5fa"/>
      <circle cx="155" cy="175" r="3" fill="#60a5fa"/>
      <circle cx="100" cy="175" r="3" fill="#60a5fa"/>
      <!-- support triangle (filled) -->
      <polygon points="45,175 155,175 100,175" fill="none" stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="4,3"/>
      <!-- Top view below: triangle -->
      <text x="65" y="200" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Top view:</text>
      <!-- triangle support polygon -->
      <polygon points="60,240 140,240 100,210" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <circle cx="60" cy="240" r="3" fill="#60a5fa"/>
      <circle cx="140" cy="240" r="3" fill="#60a5fa"/>
      <circle cx="100" cy="210" r="3" fill="#60a5fa"/>
      <!-- checkmark for stability on uneven ground -->
      <text x="55" y="258" fill="#34d399" font-family="system-ui, sans-serif" font-size="10">Always sits flat</text>
      <!-- 4-LEGGED STOOL (right) -->
      <!-- seat -->
      <ellipse cx="300" cy="80" rx="55" ry="12" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <!-- legs -->
      <line x1="260" y1="90" x2="250" y2="175" stroke="#94a3b8" stroke-width="3"/>
      <line x1="340" y1="90" x2="350" y2="175" stroke="#94a3b8" stroke-width="3"/>
      <line x1="275" y1="92" x2="265" y2="175" stroke="#94a3b8" stroke-width="3"/>
      <line x1="325" y1="92" x2="335" y2="175" stroke="#94a3b8" stroke-width="3"/>
      <!-- contact points -->
      <circle cx="250" cy="175" r="3" fill="#f472b6"/>
      <circle cx="350" cy="175" r="3" fill="#f472b6"/>
      <circle cx="265" cy="175" r="3" fill="#f472b6"/>
      <circle cx="335" cy="175" r="3" fill="#f472b6"/>
      <!-- Top view below: square/rectangle -->
      <text x="265" y="200" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">Top view:</text>
      <!-- square support polygon -->
      <polygon points="265,215 335,215 335,255 265,255" fill="none" stroke="#f472b6" stroke-width="1.5"/>
      <circle cx="265" cy="215" r="3" fill="#f472b6"/>
      <circle cx="335" cy="215" r="3" fill="#f472b6"/>
      <circle cx="335" cy="255" r="3" fill="#f472b6"/>
      <circle cx="265" cy="255" r="3" fill="#f472b6"/>
      <!-- note about larger polygon -->
      <text x="252" y="270" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">Larger tip polygon</text>
      <!-- wavy ground under 4-leg to show rocking -->
      <path d="M 240 178 Q 260 172 280 178 Q 300 184 320 178 Q 340 172 360 178" fill="none" stroke="#fb923c" stroke-width="1" stroke-dasharray="3,2"/>
      <text x="340" y="190" fill="#fb923c" font-family="system-ui, sans-serif" font-size="9">rocks!</text>
    </svg>`,
    statement: 'A three-legged stool is less stable than a four-legged stool because it has fewer support points. That is why most chairs have four legs — the additional leg provides extra stability against tipping.',
    flaw: {
      text: 'A three-legged stool is less stable than a four-legged stool because it has fewer support points.',
      flawIndex: 0,
      flawExplanation: 'A three-legged stool is actually MORE stable in one important sense: it always sits flat on an uneven surface because three points always define a plane. A four-legged stool on an uneven surface will rock because four points are over-constrained unless the surface is perfectly flat. Four-legged chairs trade this advantage for a wider support polygon, which resists tipping better in all directions.',
    },
    correctedStatement: 'A three-legged stool always sits flat on uneven surfaces because three points define a unique plane, while a four-legged stool can rock. However, a four-legged chair provides a larger support polygon, which improves resistance to tipping — that is the actual reason most chairs have four legs.',
    explanation: 'The concepts of stability against wobble (three legs wins) and stability against tipping (larger polygon wins) are different. This is a classic confusion between determinacy and stability.',
    interviewInsight: 'This tests whether you understand static determinacy vs. practical stability. It also shows if you can communicate nuanced engineering concepts clearly.',
    commonMistake: 'Accepting the statement at face value without distinguishing between "will it wobble?" and "will it tip over?".',
    tags: ['statics', 'stability', 'determinacy', 'over-constrained', 'support-polygon'],
  },

  // EM-007 — Confidence Rated
  {
    id: 'em-007',
    type: 'confidence-rated',
    topic: 'engineering-mechanics',
    subtopic: 'Dynamics & Kinematics',
    difficulty: 'intermediate',
    question: 'A car is turning on a flat (unbanked) road at constant speed. What provides the centripetal force?',
    diagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="em007-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="em007-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
        <marker id="em007-arrowhead-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#34d399"/>
        </marker>
      </defs>
      <!-- top view label -->
      <text x="160" y="18" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">Top View</text>
      <!-- circular path (dashed) -->
      <circle cx="200" cy="155" r="110" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6,4"/>
      <!-- center of turn -->
      <circle cx="200" cy="155" r="4" fill="#94a3b8"/>
      <text x="207" y="160" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">center</text>
      <!-- car (simplified rectangle) at right side of circle -->
      <rect x="295" y="140" width="30" height="18" rx="4" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <!-- car front indicator -->
      <line x1="295" y1="145" x2="295" y2="153" stroke="#fb923c" stroke-width="3"/>
      <!-- velocity arrow (tangent, upward at this position) -->
      <line x1="310" y1="138" x2="310" y2="90" stroke="#34d399" stroke-width="2.5" marker-end="url(#em007-arrowhead-green)"/>
      <text x="318" y="100" fill="#34d399" font-family="system-ui, sans-serif" font-size="12" font-weight="bold">v</text>
      <!-- centripetal force arrow (toward center) -->
      <line x1="293" y1="149" x2="240" y2="149" stroke="#f472b6" stroke-width="2.5" marker-end="url(#em007-arrowhead-pink)"/>
      <text x="242" y="142" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11">F_friction</text>
      <text x="242" y="130" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">(centripetal)</text>
      <!-- radius line -->
      <line x1="200" y1="155" x2="295" y2="155" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="235" y="170" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">R</text>
      <!-- tire contact patches with friction indicators -->
      <!-- Equation box -->
      <rect x="20" y="240" width="170" height="30" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="1"/>
      <text x="30" y="260" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11">F = mv\u00B2/R = \u03BC_s \u00B7 N</text>
      <!-- note about static friction -->
      <text x="210" y="255" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">Static friction (no sliding)</text>
      <text x="210" y="270" fill="#fb923c" font-family="system-ui, sans-serif" font-size="11">directed toward center</text>
    </svg>`,
    options: [
      { id: 'a', text: 'The engine driving the wheels forward' },
      { id: 'b', text: 'Static friction between the tires and road, directed toward the center of the turn' },
      { id: 'c', text: 'The normal force from the road tilting the car inward' },
      { id: 'd', text: 'The car\'s weight component resolved toward the turn center' },
    ],
    correctAnswer: 'b',
    confidenceLevels: ['Guessing', 'Somewhat sure', 'Very confident'],
    explanation: 'On a flat road, the only horizontal force available is friction. For a car turning at constant speed, static friction (not kinetic — the tires are not sliding) acts laterally, pointing toward the center of the circular path. This is why you skid on ice: no friction means no centripetal force.',
    interviewInsight: 'Confidence-rated questions reveal calibration. An engineer who is very confident and correct is great. One who is very confident and wrong has a calibration problem — that is a red flag.',
    realWorldConnection: 'Tire engineers design tread patterns and rubber compounds to maximize lateral grip. Race car engineers tune tire pressure and camber to optimize the friction circle.',
    commonMistake: 'Confusing the role of the engine (which provides tangential force for speed) with the centripetal force (which is perpendicular to velocity). Also, saying "kinetic friction" instead of "static friction."',
    tags: ['centripetal-force', 'friction', 'circular-motion', 'automotive', 'tires'],
  },

  // EM-008 — Scenario
  {
    id: 'em-008',
    type: 'scenario',
    topic: 'engineering-mechanics',
    subtopic: 'Work & Energy Methods',
    difficulty: 'advanced',
    question: 'You are designing a cargo elevator counterweight system. Walk through the design.',
    diagram: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="em008-arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="em008-arrowhead-pink" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f472b6"/>
        </marker>
      </defs>
      <!-- shaft walls -->
      <rect x="30" y="20" width="5" height="270" fill="#94a3b8"/>
      <rect x="365" y="20" width="5" height="270" fill="#94a3b8"/>
      <!-- pulley/sheave at top -->
      <circle cx="200" cy="35" r="18" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="200" cy="35" r="4" fill="#94a3b8"/>
      <!-- motor attached to sheave -->
      <rect x="220" y="20" width="50" height="30" rx="3" fill="#334155" stroke="#fb923c" stroke-width="2"/>
      <text x="227" y="40" fill="#fb923c" font-family="system-ui, sans-serif" font-size="10">Motor</text>
      <!-- cable from elevator car, over sheave, to counterweight -->
      <!-- left cable (to car) -->
      <line x1="190" y1="50" x2="190" y2="120" stroke="#94a3b8" stroke-width="2"/>
      <!-- right cable (to counterweight) -->
      <line x1="210" y1="50" x2="210" y2="100" stroke="#94a3b8" stroke-width="2"/>
      <!-- cable over sheave (arc) -->
      <path d="M 190 50 A 15 15 0 0 1 210 50" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <!-- elevator car -->
      <rect x="140" y="120" width="100" height="80" rx="3" fill="#334155" stroke="#60a5fa" stroke-width="2"/>
      <text x="155" y="148" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11">Elevator</text>
      <text x="162" y="163" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="11">Car</text>
      <text x="152" y="180" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">1,500 kg</text>
      <!-- cargo inside car -->
      <rect x="155" y="183" width="70" height="12" rx="2" fill="none" stroke="#34d399" stroke-width="1.5"/>
      <text x="158" y="193" fill="#34d399" font-family="system-ui, sans-serif" font-size="9">cargo 0-2,000 kg</text>
      <!-- counterweight -->
      <rect x="280" y="100" width="60" height="90" rx="3" fill="#334155" stroke="#f472b6" stroke-width="2"/>
      <text x="282" y="135" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">Counter-</text>
      <text x="285" y="150" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">weight</text>
      <text x="284" y="175" fill="#f472b6" font-family="system-ui, sans-serif" font-size="11" font-weight="bold">2,500 kg</text>
      <!-- cable from counterweight -->
      <line x1="210" y1="50" x2="310" y2="50" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="310" y1="50" x2="310" y2="100" stroke="#94a3b8" stroke-width="2"/>
      <!-- guide rails -->
      <line x1="135" y1="60" x2="135" y2="290" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="245" y1="60" x2="245" y2="290" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="275" y1="60" x2="275" y2="290" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="345" y1="60" x2="345" y2="290" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,4"/>
      <!-- weight arrows -->
      <line x1="190" y1="200" x2="190" y2="240" stroke="#60a5fa" stroke-width="2" marker-end="url(#em008-arrowhead)"/>
      <text x="150" y="250" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="10">Car + Cargo</text>
      <line x1="310" y1="190" x2="310" y2="230" stroke="#f472b6" stroke-width="2" marker-end="url(#em008-arrowhead-pink)"/>
      <text x="280" y="245" fill="#f472b6" font-family="system-ui, sans-serif" font-size="10">CW weight</text>
      <!-- height annotation -->
      <line x1="50" y1="80" x2="50" y2="270" stroke="#34d399" stroke-width="1"/>
      <line x1="45" y1="80" x2="55" y2="80" stroke="#34d399" stroke-width="1"/>
      <line x1="45" y1="270" x2="55" y2="270" stroke="#34d399" stroke-width="1"/>
      <text x="38" y="180" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" transform="rotate(-90, 50, 180)">20 m travel</text>
      <!-- optimization note -->
      <text x="55" y="290" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10">CW = car + half max payload = 2,500 kg (minimizes peak motor power)</text>
    </svg>`,
    context: 'A freight elevator carries up to 2,000 kg of cargo. The car itself weighs 1,500 kg. It travels 20 meters between floors. Your task is to design the counterweight to minimize motor power.',
    steps: [
      {
        prompt: 'What should the counterweight mass be?',
        idealResponse: 'Set the counterweight to balance the car plus half the maximum payload: 1,500 + 1,000 = 2,500 kg. This way, the motor only needs to lift/lower the difference (up to 1,000 kg equivalent) regardless of load direction.',
      },
      {
        prompt: 'Why not set the counterweight equal to the full loaded weight (3,500 kg)?',
        idealResponse: 'If counterweight equals full load, the motor saves energy going up fully loaded but must work hard when the elevator is empty going up (lifting the 2,000 kg excess counterweight). Balancing at half-load minimizes the maximum imbalance in both directions.',
      },
      {
        prompt: 'How does this affect motor sizing?',
        idealResponse: 'The motor peak power is proportional to the maximum imbalance times velocity. With half-load balancing, the peak imbalance is 1,000 kg x g x v_max. Without a counterweight, it would be 3,500 kg x g x v_max — the motor would need to be 3.5 times larger.',
      },
    ],
    keyTakeaway: 'Counterweight design is an optimization problem: balance at the midpoint of the expected load range to minimize peak motor power and energy consumption.',
    explanation: 'This is one of the oldest and most elegant energy-saving mechanisms in engineering. Every traction elevator in the world uses this principle. The counterweight also reduces cable tension and brake loads.',
    interviewInsight: 'Scenario questions test your ability to think through a design problem step by step, making and defending engineering decisions. There is no single formula to apply.',
    commonMistake: 'Setting the counterweight equal to the car weight alone (1,500 kg) — this ignores that the average load is not zero. Or setting it to the full loaded weight and not considering the empty-car case.',
    tags: ['counterweight', 'elevator', 'energy', 'motor-sizing', 'optimization'],
  },
];
