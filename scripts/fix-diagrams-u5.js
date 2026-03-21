const fs = require('fs');

function replaceDiagram(content, questionId, newDiagramSvg) {
  const idPattern = "id: '" + questionId + "'";
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) { console.error('NOT FOUND:', questionId); return content; }

  const diagramIdx = content.indexOf('diagram:', idIdx);
  if (diagramIdx === -1 || diagramIdx - idIdx > 2000) {
    console.error('No diagram near', questionId);
    return content;
  }

  const svgEndTag = content.indexOf("</svg>',", diagramIdx);
  if (svgEndTag === -1) { console.error('No </svg> close for', questionId); return content; }
  const endIdx = svgEndTag + "</svg>',".length;

  const newDiagram = "diagram: '" + newDiagramSvg + "',";
  console.log('Replacing diagram for', questionId);
  return content.substring(0, diagramIdx) + newDiagram + content.substring(endIdx);
}

function addDiagram(content, questionId, newDiagramSvg) {
  const idPattern = "id: '" + questionId + "'";
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) { console.error('NOT FOUND:', questionId); return content; }

  // Check if diagram already exists
  const nextQuestion = content.indexOf("id: '", idIdx + 10);
  const segmentEnd = nextQuestion !== -1 ? nextQuestion : content.length;
  const segment = content.substring(idIdx, segmentEnd);
  if (segment.includes('diagram:')) {
    console.log(questionId, 'already has diagram, replacing instead');
    return replaceDiagram(content, questionId, newDiagramSvg);
  }

  const explanationIdx = content.indexOf('explanation:', idIdx);
  if (explanationIdx === -1 || explanationIdx - idIdx > 2000) {
    console.error('No explanation near', questionId);
    return content;
  }

  const insertStr = "diagram: '" + newDiagramSvg + "',\n          ";
  console.log('Adding diagram for', questionId);
  return content.substring(0, explanationIdx) + insertStr + content.substring(explanationIdx);
}

console.log('\n=== Processing Unit 5 ===');
let u5 = fs.readFileSync('src/data/course/units/unit-5-heat.ts', 'utf8');

// 1. u5-L1-Q8 - Hollow cylinder conduction cross-section
const svg_u5L1Q8 = '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Hollow Cylinder Conduction</text><circle cx="36" cy="40" r="24" fill="#A5E86C" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><circle cx="36" cy="40" r="12" fill="white" stroke="#3B8700" stroke-width="1.2"/><line x1="36" y1="40" x2="48" y2="40" stroke="#6B7280" stroke-width="0.5" stroke-dasharray="1.5,1" opacity="0.4"/><text x="42" y="38" font-size="3.5" fill="#6B7280">r&#x2081;</text><line x1="36" y1="40" x2="18" y2="22" stroke="#6B7280" stroke-width="0.5" stroke-dasharray="1.5,1" opacity="0.4"/><text x="22" y="28" font-size="3.5" fill="#6B7280">r&#x2082;</text><line x1="60" y1="34" x2="66" y2="30" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><polygon points="65,28 68,30 65,32" fill="#3B8700" opacity="0.4"/><line x1="60" y1="40" x2="68" y2="40" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><polygon points="66,38.5 70,40 66,41.5" fill="#3B8700" opacity="0.4"/><line x1="60" y1="46" x2="66" y2="50" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><polygon points="65,48 68,50 65,52" fill="#3B8700" opacity="0.4"/><line x1="36" y1="16" x2="36" y2="10" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><polygon points="34.5,12 36,8 37.5,12" fill="#3B8700" opacity="0.4"/><text x="68" y="36" font-size="3.5" fill="#334155">Q</text><text x="36" y="43" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">T&#x2081;</text><text x="15" y="56" font-size="4" fill="#6B7280">T&#x2082;</text><text x="40" y="70" text-anchor="middle" font-size="4" fill="#334155" font-style="italic">R = ln(r&#x2082;/r&#x2081;)/(2&#x3C0;kL)</text><text x="40" y="77" text-anchor="middle" font-size="3.5" fill="#6B7280">Area grows with r &#x2192; ln form</text></svg>';

u5 = replaceDiagram(u5, 'u5-L1-Q8', svg_u5L1Q8);

// 2. u5-L1-Q21 - Spherical shell conduction
const svg_u5L1Q21 = '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Spherical Shell</text><circle cx="40" cy="38" r="24" fill="#A5E86C" opacity="0.1" stroke="#3B8700" stroke-width="1.5"/><circle cx="40" cy="38" r="12" fill="white" stroke="#3B8700" stroke-width="1.2"/><ellipse cx="40" cy="38" rx="24" ry="8" fill="none" stroke="#3B8700" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.2"/><ellipse cx="40" cy="38" rx="12" ry="4" fill="none" stroke="#3B8700" stroke-width="0.4" stroke-dasharray="1.5,1.5" opacity="0.2"/><line x1="40" y1="38" x2="52" y2="38" stroke="#6B7280" stroke-width="0.5" stroke-dasharray="1.5,1" opacity="0.4"/><text x="46" y="36" font-size="3.5" fill="#6B7280">r&#x2081;</text><line x1="40" y1="38" x2="58" y2="22" stroke="#6B7280" stroke-width="0.5" stroke-dasharray="1.5,1" opacity="0.4"/><text x="52" y="26" font-size="3.5" fill="#6B7280">r&#x2082;</text><line x1="64" y1="32" x2="70" y2="28" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><polygon points="69,26 72,28 69,30" fill="#3B8700" opacity="0.4"/><line x1="64" y1="38" x2="72" y2="38" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><polygon points="70,36.5 74,38 70,39.5" fill="#3B8700" opacity="0.4"/><line x1="64" y1="44" x2="70" y2="48" stroke="#3B8700" stroke-width="0.8" opacity="0.4"/><polygon points="69,46 72,48 69,50" fill="#3B8700" opacity="0.4"/><text x="74" y="36" font-size="4" fill="#334155">Q</text><text x="40" y="41" text-anchor="middle" font-size="5" fill="#334155" font-style="italic">T&#x2081;</text><text x="12" y="56" font-size="4" fill="#6B7280">T&#x2082;</text><text x="40" y="70" text-anchor="middle" font-size="4" fill="#334155" font-style="italic">R = (1/r&#x2081;&#x2212;1/r&#x2082;)/(4&#x3C0;k)</text><text x="40" y="77" text-anchor="middle" font-size="3.5" fill="#6B7280">A = 4&#x3C0;r&#xB2; grows with r</text></svg>';

u5 = addDiagram(u5, 'u5-L1-Q21', svg_u5L1Q21);

// 3. u5-L4-Q1 - Heat exchanger: counter-flow vs parallel-flow temperature profiles
const svg_u5L4Q1 = '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">HX Temperature Profiles</text><text x="20" y="16" font-size="4" fill="#334155" font-weight="bold">Counter</text><text x="60" y="16" font-size="4" fill="#334155" font-weight="bold">Parallel</text><line x1="4" y1="20" x2="4" y2="48" stroke="#3B8700" stroke-width="0.8"/><line x1="4" y1="48" x2="38" y2="48" stroke="#3B8700" stroke-width="0.8"/><text x="2" y="19" font-size="3" fill="#6B7280">T</text><text x="36" y="52" font-size="3" fill="#6B7280">L</text><path d="M6,24 Q20,28 36,34" stroke="#3B8700" stroke-width="1.2" fill="none"/><path d="M6,40 Q20,34 36,28" stroke="#58CC02" stroke-width="1.2" fill="none"/><text x="37" y="36" font-size="3" fill="#3B8700">Th</text><text x="37" y="27" font-size="3" fill="#58CC02">Tc</text><text x="2" y="26" font-size="3" fill="#3B8700">Th,i</text><text x="2" y="42" font-size="3" fill="#58CC02">Tc,o</text><line x1="42" y1="20" x2="42" y2="48" stroke="#3B8700" stroke-width="0.8"/><line x1="42" y1="48" x2="76" y2="48" stroke="#3B8700" stroke-width="0.8"/><text x="41" y="19" font-size="3" fill="#6B7280">T</text><text x="74" y="52" font-size="3" fill="#6B7280">L</text><path d="M44,24 Q58,28 74,34" stroke="#3B8700" stroke-width="1.2" fill="none"/><path d="M44,44 Q58,40 74,38" stroke="#58CC02" stroke-width="1.2" fill="none"/><text x="75" y="36" font-size="3" fill="#3B8700">Th</text><text x="75" y="40" font-size="3" fill="#58CC02">Tc</text><text x="43" y="26" font-size="3" fill="#3B8700">Th,i</text><text x="43" y="46" font-size="3" fill="#58CC02">Tc,i</text><line x1="4" y1="56" x2="76" y2="56" stroke="#6B7280" stroke-width="0.3" opacity="0.3"/><text x="40" y="64" text-anchor="middle" font-size="3.5" fill="#334155">Counter: Tc,out can approach Th,in</text><text x="40" y="70" text-anchor="middle" font-size="3.5" fill="#334155">Parallel: Tc,out limited by Th,out</text><text x="40" y="77" text-anchor="middle" font-size="3.5" fill="#6B7280">Counter-flow has higher &#x394;Tlm</text></svg>';

u5 = replaceDiagram(u5, 'u5-L4-Q1', svg_u5L4Q1);

// 4. u5-L5-Q1 - Fin attached to wall with heat flow
const svg_u5L5Q1 = '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Fin Heat Transfer</text><rect x="4" y="12" width="10" height="56" rx="0" fill="#3B8700" opacity="0.15" stroke="#3B8700" stroke-width="1.5"/><line x1="5" y1="16" x2="13" y2="12" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/><line x1="5" y1="24" x2="13" y2="20" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/><line x1="5" y1="32" x2="13" y2="28" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/><line x1="5" y1="40" x2="13" y2="36" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/><line x1="5" y1="48" x2="13" y2="44" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/><line x1="5" y1="56" x2="13" y2="52" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/><line x1="5" y1="64" x2="13" y2="60" stroke="#3B8700" stroke-width="0.5" opacity="0.15"/><rect x="14" y="32" width="50" height="16" rx="1" fill="#58CC02" opacity="0.12" stroke="#3B8700" stroke-width="1.5"/><text x="10" y="75" text-anchor="middle" font-size="4" fill="#334155" font-style="italic">T_b</text><text x="64" y="30" font-size="3.5" fill="#6B7280">tip</text><line x1="20" y1="32" x2="20" y2="24" stroke="#3B8700" stroke-width="0.7" opacity="0.4"/><polygon points="18.5,25 20,22 21.5,25" fill="#3B8700" opacity="0.4"/><line x1="20" y1="48" x2="20" y2="56" stroke="#3B8700" stroke-width="0.7" opacity="0.4"/><polygon points="18.5,55 20,58 21.5,55" fill="#3B8700" opacity="0.4"/><line x1="32" y1="32" x2="32" y2="26" stroke="#3B8700" stroke-width="0.6" opacity="0.3"/><polygon points="30.5,27 32,24 33.5,27" fill="#3B8700" opacity="0.3"/><line x1="32" y1="48" x2="32" y2="54" stroke="#3B8700" stroke-width="0.6" opacity="0.3"/><polygon points="30.5,53 32,56 33.5,53" fill="#3B8700" opacity="0.3"/><line x1="44" y1="32" x2="44" y2="28" stroke="#3B8700" stroke-width="0.5" opacity="0.25"/><polygon points="42.5,29 44,26 45.5,29" fill="#3B8700" opacity="0.25"/><line x1="44" y1="48" x2="44" y2="52" stroke="#3B8700" stroke-width="0.5" opacity="0.25"/><polygon points="42.5,51 44,54 45.5,51" fill="#3B8700" opacity="0.25"/><line x1="56" y1="33" x2="56" y2="30" stroke="#3B8700" stroke-width="0.4" opacity="0.15"/><polygon points="54.5,31 56,28 57.5,31" fill="#3B8700" opacity="0.15"/><text x="24" y="20" font-size="3" fill="#6B7280">conv h</text><line x1="14" y1="40" x2="64" y2="40" stroke="#A5E86C" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.3"/><polygon points="62,38.5 66,40 62,41.5" fill="#A5E86C" opacity="0.3"/><text x="40" y="44" text-anchor="middle" font-size="3" fill="#6B7280">Q_cond along fin</text><text x="40" y="66" text-anchor="middle" font-size="4" fill="#334155">Arrows shrink: T drops along fin</text><text x="40" y="73" text-anchor="middle" font-size="3.5" fill="#6B7280">&#x3B7;fin = tanh(mL)/(mL)</text><text x="40" y="79" text-anchor="middle" font-size="3.5" fill="#6B7280">m = &#x221A;(hP/kAc)</text></svg>';

u5 = replaceDiagram(u5, 'u5-L5-Q1', svg_u5L5Q1);

fs.writeFileSync('src/data/course/units/unit-5-heat.ts', u5, 'utf8');
console.log('Unit 5 diagrams saved successfully');
