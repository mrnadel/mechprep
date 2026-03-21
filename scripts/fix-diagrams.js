const fs = require('fs');

// Helper: replace diagram for a specific question ID
function replaceDiagram(content, questionId, newDiagramSvg) {
  const idPattern = "id: '" + questionId + "'";
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) { console.error('NOT FOUND:', questionId); return content; }

  const diagramIdx = content.indexOf('diagram:', idIdx);
  if (diagramIdx === -1 || diagramIdx - idIdx > 2000) {
    console.error('No diagram near', questionId);
    return content;
  }

  // Find </svg>' pattern - the end of the diagram string value
  const svgEndTag = content.indexOf("</svg>'", diagramIdx);
  if (svgEndTag === -1) { console.error('No </svg> close for', questionId); return content; }
  const endIdx = svgEndTag + "</svg>',".length;

  const oldDiagram = content.substring(diagramIdx, endIdx);
  const newDiagram = "diagram: '" + newDiagramSvg + "',";

  console.log('Replacing diagram for', questionId, '(old:', oldDiagram.length, '-> new:', newDiagram.length, 'chars)');
  return content.substring(0, diagramIdx) + newDiagram + content.substring(endIdx);
}

// Helper: add diagram to a question that doesn't have one
function addDiagram(content, questionId, newDiagramSvg) {
  const idPattern = "id: '" + questionId + "'";
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) { console.error('NOT FOUND:', questionId); return content; }

  const explanationIdx = content.indexOf('explanation:', idIdx);
  if (explanationIdx === -1 || explanationIdx - idIdx > 2000) {
    console.error('No explanation near', questionId);
    return content;
  }

  const insertStr = "diagram: '" + newDiagramSvg + "',\n          ";
  console.log('Adding diagram for', questionId);
  return content.substring(0, explanationIdx) + insertStr + content.substring(explanationIdx);
}

// =================== UNIT 3 ===================
console.log('\n=== Processing Unit 3 ===');
let u3 = fs.readFileSync('src/data/course/units/unit-3-strength.ts', 'utf8');

// 1. u3-L1-Q11 - Composite member: steel core in Al sleeve cross-section
const svg_u3L1Q11 = '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Cross-Section</text><circle cx="40" cy="38" r="22" fill="#A5E86C" opacity="0.15"/><circle cx="40" cy="38" r="22" stroke="#3B8700" stroke-width="1.5" fill="none"/><circle cx="40" cy="38" r="14" fill="#58CC02" opacity="0.2"/><circle cx="40" cy="38" r="14" stroke="#3B8700" stroke-width="1.5" fill="none"/><line x1="30" y1="32" x2="50" y2="44" stroke="#3B8700" stroke-width="0.4" opacity="0.15"/><line x1="28" y1="38" x2="52" y2="38" stroke="#3B8700" stroke-width="0.4" opacity="0.15"/><line x1="30" y1="44" x2="50" y2="32" stroke="#3B8700" stroke-width="0.4" opacity="0.15"/><line x1="34" y1="26" x2="46" y2="50" stroke="#3B8700" stroke-width="0.4" opacity="0.15"/><line x1="46" y1="26" x2="34" y2="50" stroke="#3B8700" stroke-width="0.4" opacity="0.15"/><polygon points="6,38 2,35 2,41" fill="#3B8700" opacity="0.4"/><line x1="2" y1="38" x2="6" y2="38" stroke="#3B8700" stroke-width="1.5" opacity="0.4"/><polygon points="74,38 78,35 78,41" fill="#3B8700" opacity="0.4"/><line x1="74" y1="38" x2="78" y2="38" stroke="#3B8700" stroke-width="1.5" opacity="0.4"/><text x="3" y="33" font-size="5" fill="#3B8700" opacity="0.4" font-weight="bold">P</text><text x="74" y="33" font-size="5" fill="#3B8700" opacity="0.4" font-weight="bold">P</text><text x="40" y="38" text-anchor="middle" font-size="4.5" fill="#334155" font-weight="bold">Steel</text><text x="40" y="43" text-anchor="middle" font-size="3.5" fill="#6B7280">A=500mm&#xB2;</text><text x="40" y="48" text-anchor="middle" font-size="3.5" fill="#6B7280">E=200GPa</text><text x="62" y="20" font-size="4.5" fill="#334155" font-weight="bold">Al</text><text x="62" y="25" font-size="3.5" fill="#6B7280">A=800mm&#xB2;</text><text x="62" y="30" font-size="3.5" fill="#6B7280">E=70GPa</text><line x1="58" y1="26" x2="53" y2="30" stroke="#6B7280" stroke-width="0.5" opacity="0.4"/><text x="40" y="70" text-anchor="middle" font-size="5" fill="#334155">P = 100 kN</text></svg>';

u3 = replaceDiagram(u3, 'u3-L1-Q11', svg_u3L1Q11);

// 2. u3-L2-Q1 - Beam bending: cross-section with NA, stress distribution
const svg_u3L2Q1 = '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Beam Bending Stress</text><rect x="25" y="12" width="20" height="40" rx="1" fill="#58CC02" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><line x1="22" y1="32" x2="48" y2="32" stroke="#3B8700" stroke-width="1" stroke-dasharray="2,2" opacity="0.5"/><text x="49" y="34" font-size="4" fill="#6B7280">NA</text><polygon points="22,14 16,14 16,32" fill="#3B8700" opacity="0.12"/><polygon points="22,50 16,50 16,32" fill="#58CC02" opacity="0.12"/><line x1="16" y1="14" x2="22" y2="14" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><line x1="16" y1="20" x2="20" y2="20" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><line x1="16" y1="26" x2="19" y2="26" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><line x1="16" y1="38" x2="19" y2="38" stroke="#58CC02" stroke-width="0.8" opacity="0.4"/><line x1="16" y1="44" x2="20" y2="44" stroke="#58CC02" stroke-width="0.8" opacity="0.4"/><line x1="16" y1="50" x2="22" y2="50" stroke="#58CC02" stroke-width="0.8" opacity="0.4"/><text x="12" y="16" font-size="3.5" fill="#3B8700" text-anchor="end">&#x2212;&#x3C3;</text><text x="12" y="52" font-size="3.5" fill="#58CC02" text-anchor="end">+&#x3C3;</text><text x="9" y="22" font-size="3" fill="#6B7280" text-anchor="end">comp.</text><text x="9" y="48" font-size="3" fill="#6B7280" text-anchor="end">tens.</text><line x1="35" y1="12" x2="35" y2="6" stroke="#3B8700" stroke-width="0.8" opacity="0.3"/><polygon points="33.5,7 35,4 36.5,7" fill="#3B8700" opacity="0.3"/><text x="37" y="5" font-size="3.5" fill="#6B7280">y</text><text x="40" y="62" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">&#x3C3; = My/I</text><text x="40" y="70" text-anchor="middle" font-size="3.5" fill="#6B7280">Stress linear from NA</text><text x="40" y="76" text-anchor="middle" font-size="3.5" fill="#6B7280">Zero at NA, max at extremes</text></svg>';

u3 = replaceDiagram(u3, 'u3-L2-Q1', svg_u3L2Q1);

// 3. u3-L4-Q1 - Torsion: shaft end-view with shear stress distribution
const svg_u3L4Q1 = '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Torsion Shear Stress</text><circle cx="35" cy="38" r="22" fill="#58CC02" opacity="0.08" stroke="#3B8700" stroke-width="1.5"/><circle cx="35" cy="38" r="1.5" fill="#3B8700" opacity="0.4"/><line x1="35" y1="38" x2="57" y2="38" stroke="#6B7280" stroke-width="0.5" stroke-dasharray="1.5,1.5" opacity="0.4"/><text x="46" y="36" font-size="3.5" fill="#6B7280">r</text><line x1="57" y1="34" x2="57" y2="28" stroke="#3B8700" stroke-width="1" opacity="0.5"/><polygon points="55.5,29 57,26 58.5,29" fill="#3B8700" opacity="0.5"/><text x="61" y="28" font-size="4" fill="#3B8700">&#x3C4;max</text><line x1="49" y1="34" x2="49" y2="30" stroke="#3B8700" stroke-width="0.7" opacity="0.35"/><polygon points="47.8,31 49,28.5 50.2,31" fill="#3B8700" opacity="0.35"/><line x1="42" y1="35" x2="42" y2="33" stroke="#3B8700" stroke-width="0.5" opacity="0.25"/><polygon points="40.8,33.5 42,31.5 43.2,33.5" fill="#3B8700" opacity="0.25"/><path d="M25,18 A18,18 0 0,1 50,22" stroke="#58CC02" stroke-width="1" fill="none" opacity="0.3"/><polygon points="49,20 52,23 48,24" fill="#58CC02" opacity="0.3"/><text x="38" y="17" font-size="3.5" fill="#58CC02" opacity="0.5">T</text><line x1="57" y1="42" x2="57" y2="60" stroke="#6B7280" stroke-width="0.5" opacity="0.3"/><line x1="35" y1="60" x2="57" y2="60" stroke="#6B7280" stroke-width="0.5" opacity="0.3"/><polygon points="35,60 57,60 57,56" fill="#3B8700" opacity="0.08"/><line x1="35" y1="60" x2="35" y2="56" stroke="#6B7280" stroke-width="0.4" opacity="0.3"/><text x="46" y="64" text-anchor="middle" font-size="3" fill="#6B7280">r</text><text x="60" y="58" font-size="3" fill="#6B7280">&#x3C4;</text><text x="35" y="55" font-size="3" fill="#6B7280" text-anchor="middle">0</text><text x="40" y="72" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">&#x3C4; = Tr/J</text><text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#6B7280">Zero at center, max at surface</text></svg>';

u3 = replaceDiagram(u3, 'u3-L4-Q1', svg_u3L4Q1);

// 4. u3-L5-Q1 - Mohr's circle with labeled center, R, principal stresses, tau_max
const svg_u3L5Q1 = '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Mohr&#x27;s Circle</text><line x1="5" y1="40" x2="75" y2="40" stroke="#3B8700" stroke-width="0.8"/><line x1="40" y1="68" x2="40" y2="12" stroke="#3B8700" stroke-width="0.8"/><text x="76" y="39" font-size="4" fill="#334155">&#x3C3;</text><text x="42" y="14" font-size="4" fill="#334155">&#x3C4;</text><circle cx="42" cy="40" r="20" fill="#58CC02" opacity="0.08" stroke="#58CC02" stroke-width="1.5"/><circle cx="42" cy="40" r="1.5" fill="#3B8700" opacity="0.5"/><text x="42" y="47" text-anchor="middle" font-size="3.5" fill="#6B7280">C(&#x3C3;avg,0)</text><circle cx="62" cy="40" r="2" fill="#3B8700" opacity="0.5"/><text x="62" y="37" text-anchor="middle" font-size="4" fill="#334155">&#x3C3;&#x2081;</text><circle cx="22" cy="40" r="2" fill="#3B8700" opacity="0.5"/><text x="22" y="37" text-anchor="middle" font-size="4" fill="#334155">&#x3C3;&#x2082;</text><line x1="42" y1="40" x2="42" y2="20" stroke="#3B8700" stroke-width="0.6" stroke-dasharray="1.5,1.5" opacity="0.3"/><circle cx="42" cy="20" r="1.5" fill="#58CC02" opacity="0.5"/><text x="48" y="19" font-size="4" fill="#334155">&#x3C4;max</text><line x1="42" y1="40" x2="42" y2="60" stroke="#3B8700" stroke-width="0.6" stroke-dasharray="1.5,1.5" opacity="0.3"/><circle cx="42" cy="60" r="1.5" fill="#58CC02" opacity="0.5"/><line x1="42" y1="40" x2="62" y2="40" stroke="#6B7280" stroke-width="0.5" opacity="0.3"/><text x="52" y="38" font-size="3.5" fill="#6B7280">R</text><text x="40" y="73" text-anchor="middle" font-size="3.5" fill="#6B7280">R = &#x221A;[((&#x3C3;x&#x2212;&#x3C3;y)/2)&#xB2;+&#x3C4;&#xB2;]</text><text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#6B7280">&#x3C4;max = R, &#x3C3;1,2 = C &#xB1; R</text></svg>';

u3 = replaceDiagram(u3, 'u3-L5-Q1', svg_u3L5Q1);

// 5. u3-L7-Q1 - Pressure vessel: thin-walled cylinder cross-section
// First, need to find u3-L7 questions. Let's find the first one that is about pressure vessels.
// u3-L7 is about columns/buckling, not pressure vessels. Let me check the lesson structure.
// Actually, the user said u3-L7 pressure vessel questions. Let me search.

fs.writeFileSync('src/data/course/units/unit-3-strength.ts', u3, 'utf8');
console.log('Unit 3 first batch saved successfully');
