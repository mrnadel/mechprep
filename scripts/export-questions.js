const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'psychology', 'units');

function extractQuestionBlocks(lines) {
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const typeMatch = trimmed.match(/^type:\s*'(multiple-choice|scenario|pick-the-best|true-false)',?$/);
    if (!typeMatch) continue;
    const type = typeMatch[1];
    let objStart = -1;
    for (let k = i - 1; k >= Math.max(0, i - 3); k--) {
      if (lines[k].trim() === '{') { objStart = k; break; }
    }
    if (objStart === -1) continue;
    let depth = 0, objEnd = -1;
    for (let k = objStart; k < lines.length; k++) {
      for (const ch of lines[k]) { if (ch === '{') depth++; if (ch === '}') depth--; }
      if (depth === 0) { objEnd = k; break; }
    }
    if (objEnd === -1) continue;
    const blockText = lines.slice(objStart, objEnd + 1).join('\n');
    if (blockText.includes('distractorExplanations')) continue;

    let expEndIdx = -1;
    for (let k = objStart; k <= objEnd; k++) {
      if (lines[k].trim().startsWith('explanation:')) {
        for (let m = k; m <= objEnd; m++) {
          const lt = lines[m].trimEnd();
          if (lt.endsWith("',") || lt.endsWith('",')) { expEndIdx = m; break; }
        }
        break;
      }
    }
    if (expEndIdx === -1) continue;

    const idMatch = blockText.match(/id:\s*'([^']+)'/);
    const qMatch = blockText.match(/question:\s*'((?:[^'\\]|\\.)*)'/);
    const eMatch = blockText.match(/explanation:\s*'((?:[^'\\]|\\.)*)'/);
    const qId = idMatch ? idMatch[1] : 'unknown';

    if (type === 'true-false') {
      const cMatch = blockText.match(/correctAnswer:\s*(true|false)/);
      if (!cMatch) continue;
      blocks.push({ id: qId, type, correctAnswer: cMatch[1] === 'true',
        question: qMatch ? qMatch[1] : '', explanation: eMatch ? eMatch[1] : '',
        afterLine: expEndIdx });
    } else {
      const options = [];
      const optSec = blockText.match(/options:\s*\[([\s\S]*?)\]/);
      if (optSec) {
        [...optSec[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].forEach(m => options.push(m[1]));
      }
      const ciMatch = blockText.match(/correctIndex:\s*(\d+)/);
      if (!ciMatch) continue;
      const sMatch = blockText.match(/scenario:\s*'((?:[^'\\]|\\.)*)'/);
      blocks.push({ id: qId, type, correctIdx: parseInt(ciMatch[1]), options,
        question: qMatch ? qMatch[1] : '', explanation: eMatch ? eMatch[1] : '',
        scenario: sMatch ? sMatch[1] : '', afterLine: expEndIdx });
    }
  }
  return blocks;
}

const files = [
  'section-11-mental-health-part1.ts',
  'section-11-mental-health-part2.ts',
  'section-12-therapy-part1.ts',
  'section-12-therapy-part2.ts',
  'section-13-applied-part1.ts',
  'section-13-applied-part2.ts',
  'section-14-research-part1.ts',
  'section-14-research-part2.ts',
  'section-15-capstone-part1.ts',
  'section-15-capstone-part2.ts',
];

for (const f of files) {
  const content = fs.readFileSync(path.join(BASE, f), 'utf8');
  const blocks = extractQuestionBlocks(content.split('\n'));

  console.log(`\n=== ${f}: ${blocks.length} questions ===`);
  blocks.forEach((b, idx) => {
    if (b.type === 'true-false') {
      console.log(`${idx}|${b.id}|TF|correct=${b.correctAnswer}|Q:${b.question}|E:${b.explanation}`);
    } else {
      console.log(`${idx}|${b.id}|${b.type}|ci=${b.correctIdx}|Q:${b.question}|E:${b.explanation}`);
      b.options.forEach((o, i) => {
        console.log(`  ${i}${i === b.correctIdx ? '*' : ' '}: ${o}`);
      });
    }
  });
}
