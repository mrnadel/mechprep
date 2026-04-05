/**
 * Reads a unit file, finds all qualifying questions without distractorExplanations,
 * and inserts them using a provided JSON map.
 *
 * Usage: node scripts/insert-de.js <unit-file> <json-file>
 */
const fs = require('fs');

const filePath = process.argv[2];
const jsonPath = process.argv[3];

if (!filePath || !jsonPath) {
  console.log('Usage: node scripts/insert-de.js <unit-file> <json-file>');
  process.exit(1);
}

const explanationsMap = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split(/\r?\n/);
const insertions = [];

for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();
  const typeMatch = trimmed.match(/type:\s*['"](?:multiple-choice|scenario|pick-the-best|true-false)['"]/);
  if (!typeMatch) continue;

  let qId = '';
  for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
    const idMatch = lines[j].trim().match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) { qId = idMatch[1]; break; }
  }

  if (!explanationsMap[qId]) continue;

  let objectStart = i;
  for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
    if (lines[j].trim() === '{') { objectStart = j; break; }
  }

  let depth = 0;
  let objectEnd = i;
  for (let j = objectStart; j < Math.min(objectStart + 300, lines.length); j++) {
    for (const ch of lines[j]) {
      if (ch === '{') depth++;
      if (ch === '}') { depth--; if (depth === 0) { objectEnd = j; break; } }
    }
    if (depth === 0 && j > objectStart) break;
  }

  let explanationLine = -1;
  let hasDE = false;
  for (let j = objectStart; j <= objectEnd; j++) {
    const lt = lines[j].trim();
    if (lt.startsWith('explanation:')) explanationLine = j;
    if (lt.includes('distractorExplanations')) hasDE = true;
  }

  if (hasDE || explanationLine < 0) continue;

  const indent = lines[explanationLine].match(/^(\s*)/)[1];
  const de = explanationsMap[qId];

  // Detect quote style from the explanation line
  const expLine = lines[explanationLine];
  const useDoubleQuotes = expLine.includes('explanation: "') || expLine.includes('explanation:"');
  const q = useDoubleQuotes ? '"' : "'";
  const escFn = useDoubleQuotes
    ? (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    : (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  let block = `${indent}distractorExplanations: {\n`;
  const keys = Object.keys(de).map(Number).sort();
  for (const key of keys) {
    block += `${indent}  ${key}: ${q}${escFn(de[key])}${q},\n`;
  }
  block += `${indent}},`;

  insertions.push({ afterLine: explanationLine, text: block, id: qId });
}

insertions.sort((a, b) => b.afterLine - a.afterLine);

for (const ins of insertions) {
  lines.splice(ins.afterLine + 1, 0, ins.text);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log(`Inserted ${insertions.length} distractorExplanations into ${filePath}`);
