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

  const oldDiagram = content.substring(diagramIdx, endIdx);
  const newDiagram = "diagram: '" + newDiagramSvg + "',";

  console.log('Replacing diagram for', questionId, '(old:', oldDiagram.length, '-> new:', newDiagram.length, 'chars)');
  return content.substring(0, diagramIdx) + newDiagram + content.substring(endIdx);
}

console.log('\n=== Processing Unit 3 - Pressure Vessel Diagrams ===');
let u3 = fs.readFileSync('src/data/course/units/unit-3-strength.ts', 'utf8');

// u3-L7-Q4 - Pressure vessel cross-section with hoop and axial stress
const svg_pv = '<svg viewBox="0 0 80 80" fill="none"><text x="40" y="7" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">Thin-Walled Cylinder</text><ellipse cx="40" cy="38" rx="24" ry="28" fill="#58CC02" opacity="0.06" stroke="#3B8700" stroke-width="1.5"/><ellipse cx="40" cy="38" rx="20" ry="24" fill="white" stroke="#3B8700" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.5"/><line x1="40" y1="38" x2="64" y2="38" stroke="#6B7280" stroke-width="0.5" opacity="0.3"/><text x="52" y="36" font-size="3" fill="#6B7280">r</text><line x1="64" y1="28" x2="70" y2="28" stroke="#6B7280" stroke-width="0.5" opacity="0.4"/><line x1="60" y1="28" x2="70" y2="28" stroke="#6B7280" stroke-width="0.3" opacity="0.3"/><text x="72" y="30" font-size="3.5" fill="#6B7280">t</text><line x1="18" y1="38" x2="10" y2="38" stroke="#3B8700" stroke-width="1.2" opacity="0.4"/><polygon points="12,36.5 8,38 12,39.5" fill="#3B8700" opacity="0.4"/><line x1="62" y1="38" x2="70" y2="38" stroke="#3B8700" stroke-width="1.2" opacity="0.4"/><polygon points="68,36.5 72,38 68,39.5" fill="#3B8700" opacity="0.4"/><text x="5" y="36" font-size="4" fill="#334155" font-style="italic">&#x3C3;h</text><text x="73" y="36" font-size="4" fill="#334155" font-style="italic">&#x3C3;h</text><circle cx="40" cy="38" r="2.5" fill="#3B8700" opacity="0.15"/><circle cx="40" cy="38" r="0.8" fill="#3B8700" opacity="0.3"/><text x="44" y="43" font-size="3.5" fill="#334155" font-style="italic">&#x3C3;a (out)</text><text x="40" y="56" text-anchor="middle" font-size="5" fill="#334155" font-weight="bold">p</text><text x="40" y="66" text-anchor="middle" font-size="4.5" fill="#334155" font-style="italic">&#x3C3;h = pr/t</text><text x="40" y="72" text-anchor="middle" font-size="4.5" fill="#334155" font-style="italic">&#x3C3;a = pr/2t</text><text x="40" y="78" text-anchor="middle" font-size="3.5" fill="#6B7280">&#x3C3;h = 2&#x3C3;a (hoop governs)</text></svg>';

u3 = replaceDiagram(u3, 'u3-L7-Q4', svg_pv);
u3 = replaceDiagram(u3, 'u3-L7-Q5', svg_pv);
u3 = replaceDiagram(u3, 'u3-L7-Q6', svg_pv);

fs.writeFileSync('src/data/course/units/unit-3-strength.ts', u3, 'utf8');
console.log('Unit 3 pressure vessel diagrams saved');
