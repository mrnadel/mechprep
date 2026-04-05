/**
 * Add distractorExplanations to psychology course files.
 * Strategy: find each question block by locating 'type:' lines,
 * then extract the full block by finding the enclosing { ... },
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'psychology', 'units');

function extractQuestionBlocks(lines) {
  const blocks = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    // Look for type declarations of relevant question types
    const typeMatch = trimmed.match(/^type:\s*'(multiple-choice|scenario|pick-the-best|true-false)',?$/);
    if (!typeMatch) continue;
    const type = typeMatch[1];

    // Find the opening { of this question object (should be 1-2 lines above)
    let objStart = -1;
    for (let k = i - 1; k >= Math.max(0, i - 3); k--) {
      if (lines[k].trim() === '{') {
        objStart = k;
        break;
      }
    }
    if (objStart === -1) continue;

    // Find the closing }, by tracking braces
    let depth = 0;
    let objEnd = -1;
    for (let k = objStart; k < lines.length; k++) {
      for (const ch of lines[k]) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      if (depth === 0) {
        objEnd = k;
        break;
      }
    }
    if (objEnd === -1) continue;

    const blockText = lines.slice(objStart, objEnd + 1).join('\n');

    // Skip if already has distractorExplanations
    if (blockText.includes('distractorExplanations')) continue;

    // Find explanation line end (absolute index)
    let expEndIdx = -1;
    for (let k = objStart; k <= objEnd; k++) {
      if (lines[k].trim().startsWith('explanation:')) {
        // Find where the explanation value ends
        for (let m = k; m <= objEnd; m++) {
          const lt = lines[m].trimEnd();
          if (lt.endsWith("',") || lt.endsWith('",')) {
            expEndIdx = m;
            break;
          }
        }
        break;
      }
    }
    if (expEndIdx === -1) continue;

    const indent = lines[expEndIdx].match(/^(\s*)/)[1];

    // Extract id
    const idMatch = blockText.match(/id:\s*'([^']+)'/);
    const qId = idMatch ? idMatch[1] : 'unknown';

    // Extract question
    const qMatch = blockText.match(/question:\s*'((?:[^'\\]|\\.)*)'/);
    const qText = qMatch ? qMatch[1] : '';

    // Extract explanation
    const eMatch = blockText.match(/explanation:\s*'((?:[^'\\]|\\.)*)'/);
    const expText = eMatch ? eMatch[1] : '';

    if (type === 'true-false') {
      const cMatch = blockText.match(/correctAnswer:\s*(true|false)/);
      if (!cMatch) continue;
      const correct = cMatch[1] === 'true';
      blocks.push({
        afterLine: expEndIdx,
        id: qId, type, question: qText, explanation: expText,
        correctAnswer: correct, indent,
      });
    } else {
      // Extract options
      const options = [];
      const optionsSection = blockText.match(/options:\s*\[([\s\S]*?)\]/);
      if (optionsSection) {
        const raw = optionsSection[1];
        // Match both single-quoted and double-quoted strings
        const matches = [...raw.matchAll(/'((?:[^'\\]|\\.)*)'/g)];
        if (matches.length === 0) {
          // Try double quotes
          const dblMatches = [...raw.matchAll(/"((?:[^"\\]|\\.)*)"/g)];
          dblMatches.forEach(m => options.push(m[1]));
        } else {
          matches.forEach(m => options.push(m[1]));
        }
      }

      const ciMatch = blockText.match(/correctIndex:\s*(\d+)/);
      if (!ciMatch) continue;
      const correctIdx = parseInt(ciMatch[1]);

      // Extract scenario if present
      const sMatch = blockText.match(/scenario:\s*'((?:[^'\\]|\\.)*)'/);
      const scenario = sMatch ? sMatch[1] : '';

      blocks.push({
        afterLine: expEndIdx,
        id: qId, type, question: qText, explanation: expText,
        options, correctIdx, scenario, indent,
      });
    }
  }

  return blocks;
}

// Test
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

let total = 0;
for (const f of files) {
  const fp = path.join(BASE, f);
  const content = fs.readFileSync(fp, 'utf8');
  const lines = content.split('\n');
  const blocks = extractQuestionBlocks(lines);
  total += blocks.length;
  console.log(`${f}: ${blocks.length} questions`);
  // Show first 2
  for (const b of blocks.slice(0, 2)) {
    if (b.type === 'true-false') {
      console.log(`  ${b.id} | TF correct=${b.correctAnswer} | after line ${b.afterLine + 1}`);
    } else {
      console.log(`  ${b.id} | ${b.type} | ci=${b.correctIdx} | ${b.options.length} opts | after line ${b.afterLine + 1}`);
      b.options.forEach((o, i) => console.log(`    ${i}${i === b.correctIdx ? '*' : ' '}: ${o.substring(0, 70)}`));
    }
  }
}
console.log(`\nTotal: ${total}`);
