/**
 * Add distractorExplanations to course question files.
 * Usage: node scripts/add-distractors.js <file> <explanations-json-file>
 */
const fs = require('fs');
const filePath = process.argv[2];
const explanationsPath = process.argv[3];

if (!filePath || !explanationsPath) {
  console.error('Usage: node scripts/add-distractors.js <file> <explanations-json>');
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');
const explanations = JSON.parse(fs.readFileSync(explanationsPath, 'utf8'));

// Detect line ending
const lineEnding = content.includes('\r\n') ? '\r\n' : '\n';

let insertCount = 0;
let skipCount = 0;

for (const [qId, distObj] of Object.entries(explanations)) {
  const escapedId = qId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const idPattern = new RegExp(`id:\\s*["']${escapedId}["']`);
  const idMatch = content.match(idPattern);
  if (!idMatch) {
    skipCount++;
    continue;
  }

  const idPos = content.indexOf(idMatch[0]);

  // Check if distractorExplanations already exists near this ID
  const nearbyText = content.substring(idPos, Math.min(content.length, idPos + 800));
  if (nearbyText.includes('distractorExplanations')) {
    skipCount++;
    continue;
  }

  const afterId = content.substring(idPos);

  // Match explanation: "..." or '...' allowing for \r\n or \n
  const explMatch = afterId.match(/explanation:\s*["'][^"']*["'],?\s*[\r\n]/);
  if (!explMatch) {
    console.error(`WARNING: Could not find explanation for: ${qId}`);
    skipCount++;
    continue;
  }

  const explEndRelative = afterId.indexOf(explMatch[0]) + explMatch[0].length;
  const explEnd = idPos + explEndRelative;

  // Get indentation from the explanation line
  const explLineStart = content.lastIndexOf(lineEnding, idPos + afterId.indexOf(explMatch[0]));
  const fullExplLine = content.substring(explLineStart + lineEnding.length, idPos + afterId.indexOf(explMatch[0]) + explMatch[0].length);
  const indent = fullExplLine.match(/^(\s*)/)[1];

  // Build the insert text
  const keys = Object.keys(distObj).map(Number).sort((a, b) => a - b);
  let insertText = `${indent}distractorExplanations: {${lineEnding}`;
  for (const key of keys) {
    const val = distObj[key].replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    insertText += `${indent}  ${key}: '${val}',${lineEnding}`;
  }
  insertText += `${indent}},${lineEnding}`;

  // Insert after the explanation line
  content = content.substring(0, explEnd) + insertText + content.substring(explEnd);
  insertCount++;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Inserted ${insertCount} distractorExplanations into ${filePath} (${skipCount} skipped)`);
