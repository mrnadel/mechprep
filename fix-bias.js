const fs = require('fs');
const path = require('path');

const files = [
  'src/data/course/units/unit-7-materials.ts',
  'src/data/course/units/unit-8-machine.ts',
  'src/data/course/units/unit-9-gdt.ts',
  'src/data/course/units/unit-10-interview.ts',
];

const BIAS_THRESHOLD = 1.3; // correct is >30% longer than avg wrong

for (const filePath of files) {
  const fullPath = path.resolve(filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  // Find all MC questions by parsing the structure
  let totalMC = 0;
  let biasedMC = 0;
  const biasedQuestions = [];

  for (let i = 0; i < lines.length; i++) {
    // Look for type: 'multiple-choice'
    if (lines[i].match(/type:\s*['"]multiple-choice['"]/)) {
      totalMC++;

      // Find the options array
      let optionsStart = -1;
      for (let j = i; j < Math.min(i + 20, lines.length); j++) {
        if (lines[j].match(/^\s*options:\s*\[/)) {
          optionsStart = j;
          break;
        }
      }
      if (optionsStart === -1) continue;

      // Find correctIndex
      let correctIndex = -1;
      for (let j = i; j < Math.min(i + 50, lines.length); j++) {
        const match = lines[j].match(/correctIndex:\s*(\d+)/);
        if (match) {
          correctIndex = parseInt(match[1]);
          break;
        }
      }
      if (correctIndex === -1) continue;

      // Find question ID
      let qId = '';
      for (let j = Math.max(0, i - 5); j <= i; j++) {
        const match = lines[j].match(/id:\s*['"]([^'"]+)['"]/);
        if (match) { qId = match[1]; break; }
      }

      // Extract options - handle multi-line strings
      let optionTexts = [];
      let optionLineRanges = [];
      let bracketDepth = 0;
      let inOption = false;
      let currentOption = '';
      let currentOptionStartLine = -1;
      let optionsEndLine = -1;

      for (let j = optionsStart; j < Math.min(optionsStart + 40, lines.length); j++) {
        const line = lines[j];

        // Track brackets
        for (const ch of line) {
          if (ch === '[') bracketDepth++;
          if (ch === ']') {
            bracketDepth--;
            if (bracketDepth === 0) {
              optionsEndLine = j;
              break;
            }
          }
        }

        if (optionsEndLine !== -1) break;
      }

      // Re-parse to extract individual option strings
      // Join the options block into a single string for regex extraction
      const optionsBlock = lines.slice(optionsStart, optionsEndLine + 1).join('\n');

      // Extract strings between quotes (handling escaped quotes)
      const optionRegex = /(?:'((?:[^'\\]|\\'|\\\\)*)'|"((?:[^"\\]|\\"|\\\\)*)")/g;
      let match;
      let firstMatch = true;

      // Skip the first match if it's part of "options: ["
      const cleanBlock = optionsBlock.replace(/^\s*options:\s*\[/, '');

      // Simple approach: find each top-level string in the options array
      optionTexts = [];
      let depth = 0;
      let inStr = false;
      let strChar = '';
      let currentStr = '';
      let escaped = false;

      for (let ci = 0; ci < cleanBlock.length; ci++) {
        const ch = cleanBlock[ci];

        if (escaped) {
          if (inStr) currentStr += ch;
          escaped = false;
          continue;
        }

        if (ch === '\\') {
          escaped = true;
          if (inStr) currentStr += ch;
          continue;
        }

        if (!inStr) {
          if (ch === "'" || ch === '"') {
            inStr = true;
            strChar = ch;
            currentStr = '';
          }
        } else {
          if (ch === strChar) {
            inStr = false;
            optionTexts.push(currentStr.replace(/\\'/g, "'").replace(/\\"/g, '"'));
          } else {
            currentStr += ch;
          }
        }
      }

      if (optionTexts.length < 4) continue;
      // Take only first 4 (sometimes there could be nested strings in diagrams etc)
      optionTexts = optionTexts.slice(0, 4);

      const correctLen = optionTexts[correctIndex].length;
      const wrongLens = optionTexts.filter((_, idx) => idx !== correctIndex).map(o => o.length);
      const avgWrongLen = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;

      const ratio = correctLen / avgWrongLen;

      if (ratio > BIAS_THRESHOLD) {
        biasedMC++;
        biasedQuestions.push({
          id: qId,
          line: i + 1,
          correctIndex,
          correctLen,
          avgWrongLen: Math.round(avgWrongLen),
          ratio: ratio.toFixed(2),
          options: optionTexts.map((t, idx) => ({
            idx,
            len: t.length,
            isCorrect: idx === correctIndex,
            text: t.substring(0, 80) + (t.length > 80 ? '...' : ''),
          })),
        });
      }
    }
  }

  console.log(`\n=== ${path.basename(filePath)} ===`);
  console.log(`Total MC: ${totalMC}, Biased: ${biasedMC} (${((biasedMC/totalMC)*100).toFixed(0)}%)`);
  for (const q of biasedQuestions) {
    console.log(`\n  ${q.id} (line ${q.line}) ratio=${q.ratio}`);
    for (const o of q.options) {
      console.log(`    [${o.idx}]${o.isCorrect ? ' *CORRECT*' : ''} (${o.len} chars): ${o.text}`);
    }
  }
}
