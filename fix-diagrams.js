const fs = require('fs');

// ============================================================
// CUSTOM SVG DIAGRAMS FOR REPLACEMENT
// ============================================================

const solidVsHollowSquareSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- Solid square (left) --><rect x="8" y="22" width="24" height="24" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.5"/><text x="20" y="18" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Solid</text><line x1="4" y1="34" x2="36" y2="34" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.4"/><text x="38" y="35" font-size="3.5" fill="#6B7280" font-style="italic">NA</text><text x="20" y="55" text-anchor="middle" font-size="4" fill="#6B7280">a</text><line x1="8" y1="52" x2="32" y2="52" stroke="#6B7280" stroke-width="0.5"/><line x1="8" y1="50" x2="8" y2="54" stroke="#6B7280" stroke-width="0.5"/><line x1="32" y1="50" x2="32" y2="54" stroke="#6B7280" stroke-width="0.5"/><!-- Hollow square tube (right) --><rect x="48" y="22" width="24" height="24" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.5"/><rect x="54" y="28" width="12" height="12" fill="white" stroke="#58CC02" stroke-width="1" stroke-dasharray="1.5,1.5"/><text x="60" y="18" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Hollow</text><line x1="44" y1="34" x2="76" y2="34" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.4"/><text x="78" y="35" font-size="3.5" fill="#6B7280" font-style="italic">NA</text><text x="60" y="55" text-anchor="middle" font-size="4" fill="#6B7280">a</text><line x1="48" y1="52" x2="72" y2="52" stroke="#6B7280" stroke-width="0.5"/><line x1="48" y1="50" x2="48" y2="54" stroke="#6B7280" stroke-width="0.5"/><line x1="72" y1="50" x2="72" y2="54" stroke="#6B7280" stroke-width="0.5"/><!-- Annotation --><text x="40" y="65" text-anchor="middle" font-size="4" fill="#58CC02" opacity="0.6">Same A, higher I</text><text x="40" y="72" text-anchor="middle" font-size="3.5" fill="#6B7280">Material farther from NA</text><text x="40" y="78" text-anchor="middle" font-size="4" fill="#334155" font-style="italic">I = \u222by\u00b2dA</text></svg>';

const rectWithHoleSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- Outer rectangle --><rect x="15" y="15" width="50" height="50" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1.5"/><!-- Inner hole --><rect x="27" y="24" width="26" height="23" fill="white" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,1.5"/><!-- Centroidal axis --><line x1="8" y1="40" x2="72" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/><text x="74" y="41" font-size="3.5" fill="#6B7280" font-style="italic">NA</text><!-- Outer dimensions --><text x="40" y="12" text-anchor="middle" font-size="4.5" fill="#334155">40 mm</text><line x1="15" y1="13" x2="65" y2="13" stroke="#6B7280" stroke-width="0.4"/><text x="70" y="40" font-size="4.5" fill="#334155" transform="rotate(90,70,40)">60 mm</text><!-- Hole dimensions --><text x="40" y="50" text-anchor="middle" font-size="3.5" fill="#6B7280">20\u00d730 hole</text><!-- Formula --><text x="40" y="74" text-anchor="middle" font-size="4.5" fill="#334155" font-style="italic">I\u2099\u2091\u209c = I\u2092\u1d64\u209c \u2212 I\u2095\u2092\u2097\u2091</text></svg>';

const triangleCentroidSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- Triangle --><polygon points="20,65 60,65 20,15" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1.5"/><!-- Base label --><text x="40" y="74" text-anchor="middle" font-size="4.5" fill="#334155">base</text><!-- Height label --><line x1="16" y1="65" x2="16" y2="15" stroke="#6B7280" stroke-width="0.5"/><line x1="14" y1="65" x2="18" y2="65" stroke="#6B7280" stroke-width="0.5"/><line x1="14" y1="15" x2="18" y2="15" stroke="#6B7280" stroke-width="0.5"/><text x="12" y="42" font-size="5" fill="#334155" font-style="italic" text-anchor="middle">h</text><!-- Centroid at h/3 --><circle cx="33" cy="48.3" r="2.5" fill="#58CC02" opacity="0.4"/><circle cx="33" cy="48.3" r="2.5" stroke="#3B8700" stroke-width="1" fill="none"/><text x="37" y="47" font-size="4" fill="#334155" font-weight="bold">C</text><!-- h/3 marker --><line x1="62" y1="65" x2="62" y2="48.3" stroke="#3B8700" stroke-width="0.6" stroke-dasharray="2,1.5"/><line x1="60" y1="65" x2="64" y2="65" stroke="#3B8700" stroke-width="0.5"/><line x1="60" y1="48.3" x2="64" y2="48.3" stroke="#3B8700" stroke-width="0.5"/><text x="67" y="58" font-size="4.5" fill="#3B8700" font-style="italic">h/3</text></svg>';

const tSectionCentroidSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- Flange --><rect x="15" y="10" width="50" height="8" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><!-- Web --><rect x="33" y="18" width="14" height="44" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><!-- Centroid axis --><line x1="10" y1="36" x2="70" y2="36" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/><!-- Centroid dot --><circle cx="40" cy="36" r="2" fill="#3B8700" opacity="0.5"/><text x="44" y="35" font-size="4" fill="#334155" font-weight="bold">C</text><!-- Bottom reference --><line x1="10" y1="62" x2="70" y2="62" stroke="#6B7280" stroke-width="0.4" stroke-dasharray="2,2" opacity="0.3"/><!-- y-bar dimension --><line x1="72" y1="62" x2="72" y2="36" stroke="#3B8700" stroke-width="0.6"/><line x1="70" y1="62" x2="74" y2="62" stroke="#3B8700" stroke-width="0.5"/><line x1="70" y1="36" x2="74" y2="36" stroke="#3B8700" stroke-width="0.5"/><text x="76" y="50" font-size="4" fill="#3B8700" font-style="italic">\u0233</text><!-- Dimensions --><text x="40" y="8" text-anchor="middle" font-size="3.5" fill="#6B7280">200 mm</text><text x="28" y="42" font-size="3.5" fill="#6B7280" text-anchor="end">20</text><text x="6" y="15" font-size="3.5" fill="#6B7280">20</text></svg>';

const rectTwoAxesSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- Rectangle --><rect x="20" y="15" width="40" height="50" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1.5"/><!-- Centroidal axis --><line x1="10" y1="40" x2="70" y2="40" stroke="#58CC02" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/><text x="72" y="41" font-size="3.5" fill="#58CC02" font-style="italic">centroid</text><!-- Base axis --><line x1="10" y1="65" x2="70" y2="65" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/><text x="72" y="66" font-size="3.5" fill="#3B8700" font-style="italic">base</text><!-- d = h/2 dimension --><line x1="65" y1="40" x2="65" y2="65" stroke="#6B7280" stroke-width="0.5"/><line x1="63" y1="40" x2="67" y2="40" stroke="#6B7280" stroke-width="0.4"/><line x1="63" y1="65" x2="67" y2="65" stroke="#6B7280" stroke-width="0.4"/><text x="68" y="54" font-size="4" fill="#6B7280" font-style="italic">h/2</text><!-- b and h labels --><text x="40" y="12" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">b</text><text x="15" y="42" font-size="5" fill="#334155" font-style="italic" text-anchor="middle">h</text><!-- Formulas --><text x="40" y="74" text-anchor="middle" font-size="4" fill="#334155">I\u2081 = bh\u00b3/12 \u2192 I\u2082 = bh\u00b3/3</text></svg>';

const circleSectionSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- Circle --><circle cx="40" cy="38" r="22" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1.5"/><!-- Centroidal axis --><line x1="10" y1="38" x2="70" y2="38" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/><!-- Center dot --><circle cx="40" cy="38" r="1.5" fill="#3B8700" opacity="0.4"/><!-- Diameter dimension --><line x1="18" y1="48" x2="62" y2="48" stroke="#6B7280" stroke-width="0.5"/><line x1="18" y1="46" x2="18" y2="50" stroke="#6B7280" stroke-width="0.4"/><line x1="62" y1="46" x2="62" y2="50" stroke="#6B7280" stroke-width="0.4"/><text x="40" y="54" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">d</text><!-- dA strip --><rect x="38" y="18" width="4" height="3" fill="#A5E86C" opacity="0.3" stroke="#A5E86C" stroke-width="0.5"/><line x1="40" y1="38" x2="40" y2="19.5" stroke="#6B7280" stroke-width="0.4" stroke-dasharray="1,1"/><text x="44" y="27" font-size="3.5" fill="#6B7280" font-style="italic">y</text><text x="46" y="19" font-size="3" fill="#A5E86C">dA</text><!-- Formula --><text x="40" y="70" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">I = \u03c0d\u2074/64</text><text x="40" y="77" text-anchor="middle" font-size="3.5" fill="#6B7280">I = \u222by\u00b2dA</text></svg>';

const hollowCircleSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- Outer circle --><circle cx="40" cy="38" r="22" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1.5"/><!-- Inner circle (hole) --><circle cx="40" cy="38" r="13" fill="white" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,1.5"/><!-- Centroidal axis --><line x1="10" y1="38" x2="70" y2="38" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.4"/><!-- Center dot --><circle cx="40" cy="38" r="1.5" fill="#3B8700" opacity="0.4"/><!-- D label --><line x1="18" y1="52" x2="62" y2="52" stroke="#6B7280" stroke-width="0.5"/><line x1="18" y1="50" x2="18" y2="54" stroke="#6B7280" stroke-width="0.4"/><line x1="62" y1="50" x2="62" y2="54" stroke="#6B7280" stroke-width="0.4"/><text x="40" y="57" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">D</text><!-- d label --><line x1="27" y1="45" x2="53" y2="45" stroke="#6B7280" stroke-width="0.4"/><text x="40" y="44" text-anchor="middle" font-size="4" fill="#6B7280" font-style="italic">d</text><!-- Formula --><text x="40" y="70" text-anchor="middle" font-size="4.5" fill="#334155" font-style="italic">I = \u03c0(D\u2074\u2212d\u2074)/64</text></svg>';

const genericSectionSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- Generic cross-section shape --><rect x="18" y="18" width="44" height="44" rx="3" fill="#58CC02" opacity="0.1" stroke="#58CC02" stroke-width="1.5"/><!-- Neutral axis --><line x1="8" y1="40" x2="72" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/><text x="74" y="41" font-size="3.5" fill="#6B7280" font-style="italic">NA</text><!-- dA strip --><rect x="20" y="24" width="40" height="3" fill="#A5E86C" opacity="0.25" stroke="#A5E86C" stroke-width="0.5"/><text x="63" y="26" font-size="3" fill="#A5E86C">dA</text><!-- y distance --><line x1="40" y1="40" x2="40" y2="25.5" stroke="#6B7280" stroke-width="0.5" stroke-dasharray="1.5,1"/><text x="44" y="33" font-size="4" fill="#6B7280" font-style="italic">y</text><!-- Center dot --><circle cx="40" cy="40" r="1.5" fill="#3B8700" opacity="0.4"/><!-- Formula --><text x="40" y="72" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">I = \u222by\u00b2dA</text></svg>';

const cChannelSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- C-channel shape --><rect x="20" y="15" width="40" height="8" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><rect x="20" y="57" width="40" height="8" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><rect x="20" y="23" width="10" height="34" fill="#58CC02" opacity="0.15" stroke="#58CC02" stroke-width="1.2"/><!-- Centroid (offset from web) --><circle cx="32" cy="40" r="2.5" fill="#3B8700" opacity="0.4"/><circle cx="32" cy="40" r="2.5" stroke="#3B8700" stroke-width="0.8" fill="none"/><text x="36" y="39" font-size="4" fill="#334155" font-weight="bold">C</text><!-- Geometric center reference --><line x1="40" y1="10" x2="40" y2="70" stroke="#6B7280" stroke-width="0.4" stroke-dasharray="2,2" opacity="0.3"/><!-- Offset annotation --><line x1="32" y1="68" x2="40" y2="68" stroke="#3B8700" stroke-width="0.5"/><text x="36" y="74" text-anchor="middle" font-size="3.5" fill="#3B8700" font-style="italic">e</text><text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#6B7280">shear center offset</text></svg>';

const solidSquareSvg = '<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><!-- Square --><rect x="18" y="18" width="44" height="44" fill="#58CC02" opacity="0.12" stroke="#58CC02" stroke-width="1.5"/><!-- Centroidal axis --><line x1="8" y1="40" x2="72" y2="40" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.5"/><text x="74" y="41" font-size="3.5" fill="#6B7280" font-style="italic">NA</text><!-- Center dot --><circle cx="40" cy="40" r="1.5" fill="#3B8700" opacity="0.4"/><!-- Side dimension --><line x1="18" y1="68" x2="62" y2="68" stroke="#6B7280" stroke-width="0.5"/><line x1="18" y1="66" x2="18" y2="70" stroke="#6B7280" stroke-width="0.4"/><line x1="62" y1="66" x2="62" y2="70" stroke="#6B7280" stroke-width="0.4"/><text x="40" y="74" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">a</text><!-- Formula --><text x="40" y="12" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">I = a\u2074/12</text></svg>';

// ============================================================
// REPLACEMENT FUNCTION
// ============================================================

function replaceDiagram(content, questionId, newDiagramSvg) {
  const idPattern = "id: '" + questionId + "'";
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) {
    console.log('WARNING: Could not find ' + questionId);
    return content;
  }

  // Find the next }, to scope our search
  const afterId = content.substring(idIdx);
  const nextQuestionEnd = afterId.indexOf('\n        },');
  const searchArea = afterId.substring(0, nextQuestionEnd > 0 ? nextQuestionEnd : 2000);

  const diagramLineRegex = /\n(\s*diagram: ')([^]*?)(',?\s*\n)/;
  const diagramMatch = searchArea.match(diagramLineRegex);
  if (!diagramMatch) {
    console.log('WARNING: No diagram found for ' + questionId);
    return content;
  }

  const matchStart = idIdx + searchArea.indexOf(diagramMatch[0]);
  const matchEnd = matchStart + diagramMatch[0].length;

  if (newDiagramSvg === null) {
    // Remove the diagram line entirely
    content = content.substring(0, matchStart) + '\n' + content.substring(matchEnd);
    console.log('REMOVED diagram from ' + questionId);
  } else {
    // Replace with new SVG
    const indent = diagramMatch[1]; // includes the newline and spaces
    const trailing = diagramMatch[3];
    const newLine = '\n' + indent + newDiagramSvg + trailing;
    content = content.substring(0, matchStart) + newLine + content.substring(matchEnd);
    console.log('REPLACED diagram in ' + questionId);
  }
  return content;
}

// ============================================================
// UNIT 1 FIXES
// ============================================================
let u1 = fs.readFileSync('src/data/course/units/unit-1-statics.ts', 'utf8');

// --- L5: Rotating disc -> proper cross-section diagrams ---
u1 = replaceDiagram(u1, 'u1-L5-Q3', genericSectionSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q5', rectWithHoleSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q7', triangleCentroidSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q8', rectTwoAxesSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q9', genericSectionSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q10', tSectionCentroidSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q12', circleSectionSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q14', hollowCircleSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q15', cChannelSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q17', null);  // abstract concept
u1 = replaceDiagram(u1, 'u1-L5-Q19', null);  // abstract concept
u1 = replaceDiagram(u1, 'u1-L5-Q20', solidSquareSvg);
u1 = replaceDiagram(u1, 'u1-L5-Q29', solidVsHollowSquareSvg);

// --- L1: Remove mismatched diagrams on abstract vector questions ---
u1 = replaceDiagram(u1, 'u1-L1-Q4', null);   // direction cosines - had FBD mass with friction
u1 = replaceDiagram(u1, 'u1-L1-Q6', null);   // couple concept - had beam diagram
u1 = replaceDiagram(u1, 'u1-L1-Q7', null);   // two forces at 60 deg at a point - had beam
u1 = replaceDiagram(u1, 'u1-L1-Q9', null);   // collinear forces - had beam
u1 = replaceDiagram(u1, 'u1-L1-Q10', null);  // concurrent forces equilibrium - had rotating

// --- L4: Remove ball-on-incline used for non-incline friction questions ---
u1 = replaceDiagram(u1, 'u1-L4-Q7', null);   // horizontal surface - had incline
u1 = replaceDiagram(u1, 'u1-L4-Q14', null);  // belt friction - had incline
u1 = replaceDiagram(u1, 'u1-L4-Q15', null);  // jack screw - had incline
u1 = replaceDiagram(u1, 'u1-L4-Q24', null);  // V-belt - had incline
u1 = replaceDiagram(u1, 'u1-L4-Q27', null);  // disc clutch - had incline

// --- L5: Other non-rotating-disc mismatches ---
u1 = replaceDiagram(u1, 'u1-L5-Q21', null);  // solid vs hollow shaft J - had rotating

// --- L2: Pulley question had rotating/ball-on-incline ---
u1 = replaceDiagram(u1, 'u1-L2-Q22', null);  // pulley FBD - had ball-on-incline

fs.writeFileSync('src/data/course/units/unit-1-statics.ts', u1, 'utf8');
console.log('\n=== Unit 1 saved ===');
console.log('Remaining "Rotating disc" in u1:', (u1.match(/Rotating disc/g) || []).length);
console.log('Remaining "rotational inertia" in u1:', (u1.match(/rotational inertia/g) || []).length);

// ============================================================
// UNIT 2 FIXES
// ============================================================
let u2 = fs.readFileSync('src/data/course/units/unit-2-dynamics.ts', 'utf8');

// --- L1: Linear kinematics questions with ROTATING (ball-on-incline) diagram ---
// These are about projectiles, linear motion, braking etc. - not about rotation
u2 = replaceDiagram(u2, 'u2-L1-Q1', null);   // accelerometer on vehicle
u2 = replaceDiagram(u2, 'u2-L1-Q2', null);   // projectile components
u2 = replaceDiagram(u2, 'u2-L1-Q5', null);   // boat crossing river
u2 = replaceDiagram(u2, 'u2-L1-Q7', null);   // x(t) polynomial accel
u2 = replaceDiagram(u2, 'u2-L1-Q8', null);   // a=0.5t velocity
u2 = replaceDiagram(u2, 'u2-L1-Q9', null);   // velocity zero, accel zero?
u2 = replaceDiagram(u2, 'u2-L1-Q10', null);  // projectile max height
u2 = replaceDiagram(u2, 'u2-L1-Q11', null);  // relative velocity of cars
u2 = replaceDiagram(u2, 'u2-L1-Q14', null);  // air resistance angle
u2 = replaceDiagram(u2, 'u2-L1-Q16', null);  // projectile symmetry
u2 = replaceDiagram(u2, 'u2-L1-Q17', null);  // max velocity of particle
u2 = replaceDiagram(u2, 'u2-L1-Q19', null);  // car braking distance
u2 = replaceDiagram(u2, 'u2-L1-Q25', null);  // displacement from v(t)
u2 = replaceDiagram(u2, 'u2-L1-Q27', null);  // helicopter drops package
u2 = replaceDiagram(u2, 'u2-L1-Q29', null);  // relative displacement
u2 = replaceDiagram(u2, 'u2-L1-Q30', null);  // v^2 equation validity

// --- L2: Newton's laws with wrong rotating diagram ---
u2 = replaceDiagram(u2, 'u2-L2-Q2', null);   // Atwood machine - rotating is wrong
u2 = replaceDiagram(u2, 'u2-L2-Q3', null);   // car over hilltop
u2 = replaceDiagram(u2, 'u2-L2-Q7', null);   // block on 30 deg incline - ball on incline
u2 = replaceDiagram(u2, 'u2-L2-Q13', null);  // friction formula
u2 = replaceDiagram(u2, 'u2-L2-Q15', null);  // truck accelerates box
u2 = replaceDiagram(u2, 'u2-L2-Q21', null);  // skier descending
u2 = replaceDiagram(u2, 'u2-L2-Q24', null);  // block from two ropes
u2 = replaceDiagram(u2, 'u2-L2-Q25', null);  // conveyor belt
u2 = replaceDiagram(u2, 'u2-L2-Q28', null);  // Atwood tension

// --- L3: Work-energy with wrong rotating diagram ---
u2 = replaceDiagram(u2, 'u2-L3-Q4', null);   // motor lifts load
u2 = replaceDiagram(u2, 'u2-L3-Q5', null);   // roller coaster
u2 = replaceDiagram(u2, 'u2-L3-Q7', null);   // car braking energy
u2 = replaceDiagram(u2, 'u2-L3-Q12', null);  // block on frictionless ramp
u2 = replaceDiagram(u2, 'u2-L3-Q17', null);  // elevator motor work
u2 = replaceDiagram(u2, 'u2-L3-Q22', null);  // braking distance comparison
u2 = replaceDiagram(u2, 'u2-L3-Q25', null);  // engine power at speed
u2 = replaceDiagram(u2, 'u2-L3-Q28', null);  // block on rough incline

// --- L4: Impulse/momentum with wrong rotating diagram ---
u2 = replaceDiagram(u2, 'u2-L4-Q3', null);   // elastic collision
u2 = replaceDiagram(u2, 'u2-L4-Q4', null);   // lost KE in collision
u2 = replaceDiagram(u2, 'u2-L4-Q5', null);   // head-on collision
u2 = replaceDiagram(u2, 'u2-L4-Q7', null);   // elastic collision calc
u2 = replaceDiagram(u2, 'u2-L4-Q8', null);   // coefficient of restitution
u2 = replaceDiagram(u2, 'u2-L4-Q9', null);   // perfectly inelastic
u2 = replaceDiagram(u2, 'u2-L4-Q10', null);  // explosion
u2 = replaceDiagram(u2, 'u2-L4-Q12', null);  // hockey collision
u2 = replaceDiagram(u2, 'u2-L4-Q14', null);  // ball rebounds from wall
u2 = replaceDiagram(u2, 'u2-L4-Q15', null);  // rocket
u2 = replaceDiagram(u2, 'u2-L4-Q17', null);  // baseball impulse
u2 = replaceDiagram(u2, 'u2-L4-Q19', null);  // sand on conveyor
u2 = replaceDiagram(u2, 'u2-L4-Q21', null);  // collision with restitution
u2 = replaceDiagram(u2, 'u2-L4-Q22', null);  // fire hose thrust
u2 = replaceDiagram(u2, 'u2-L4-Q24', null);  // person on boat
u2 = replaceDiagram(u2, 'u2-L4-Q25', null);  // ballistic pendulum
u2 = replaceDiagram(u2, 'u2-L4-Q27', null);  // elastic KE fraction
u2 = replaceDiagram(u2, 'u2-L4-Q30', null);  // machine gun recoil

// --- L4-Q11: Water jet on plate has BEAM_SUPPORTS diagram --- MISMATCH
u2 = replaceDiagram(u2, 'u2-L4-Q11', null);

// --- L5: Rotational dynamics - most are OK (rotating disc IS appropriate here) ---
// But check for non-rotational ones
u2 = replaceDiagram(u2, 'u2-L5-Q26', null);  // rolling ball friction - rotating is OK but question is true/false about rolling friction doing negative work

// --- L6: Vibrations - check pendulum ---
u2 = replaceDiagram(u2, 'u2-L6-Q18', null);  // simple pendulum - had rotating (ball on incline)

fs.writeFileSync('src/data/course/units/unit-2-dynamics.ts', u2, 'utf8');
console.log('\n=== Unit 2 saved ===');
console.log('Remaining "Rotating disc" in u2:', (u2.match(/Rotating disc/g) || []).length);
console.log('Remaining "rotational inertia" in u2:', (u2.match(/rotational inertia/g) || []).length);
