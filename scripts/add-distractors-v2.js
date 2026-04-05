/**
 * Add distractorExplanations to course question files.
 * Handles both single-quoted and double-quoted explanation fields,
 * including multi-line and escaped-quote strings.
 *
 * Usage: node scripts/add-distractors-v2.js <file> <explanations-json-file>
 */
const fs = require('fs');
const filePath = process.argv[2];
const explanationsPath = process.argv[3];

if (!filePath || !explanationsPath) {
  console.error('Usage: node scripts/add-distractors-v2.js <file> <explanations-json>');
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
    console.error(`WARNING: Could not find question ID: ${qId}`);
    skipCount++;
    continue;
  }

  const idPos = content.indexOf(idMatch[0]);
  const afterId = content.substring(idPos);

  // Check if distractorExplanations already present for this question
  // Look in the next ~2000 chars for it (before next question)
  const nextQuestionMatch = afterId.substring(50).match(/id:\s*["']/);
  const searchWindow = nextQuestionMatch
    ? afterId.substring(0, 50 + nextQuestionMatch.index)
    : afterId.substring(0, 2000);
  if (searchWindow.includes('distractorExplanations')) {
    // Already has it
    skipCount++;
    continue;
  }

  // Match explanation with single quotes (including escaped single quotes)
  // or double quotes, possibly spanning content with escaped quotes
  const explMatchSingle = afterId.match(/explanation:\s*'(?:[^'\\]|\\.)*',?\s*[\r\n]/);
  const explMatchDouble = afterId.match(/explanation:\s*"(?:[^"\\]|\\.)*",?\s*[\r\n]/);
  const explMatchBacktick = afterId.match(/explanation:\s*`[^`]*`,?\s*[\r\n]/);

  let explMatch = null;
  // Pick the earliest match
  const candidates = [explMatchSingle, explMatchDouble, explMatchBacktick].filter(Boolean);
  if (candidates.length > 0) {
    explMatch = candidates.reduce((best, m) =>
      m.index < best.index ? m : best
    );
  }

  if (!explMatch) {
    console.error(`WARNING: Could not find explanation for: ${qId}`);
    skipCount++;
    continue;
  }

  const explEndRelative = afterId.indexOf(explMatch[0]) + explMatch[0].length;
  const explEnd = idPos + explEndRelative;

  // Get indentation from the explanation line
  const explLineStart = content.lastIndexOf(lineEnding, idPos + afterId.indexOf(explMatch[0]));
  const fullExplLine = content.substring(
    explLineStart + lineEnding.length,
    idPos + afterId.indexOf(explMatch[0]) + explMatch[0].length
  );
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
