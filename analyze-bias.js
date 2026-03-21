const fs = require('fs');

const path = require('path');
const base = path.join(__dirname, 'src', 'data', 'course', 'units');
const files = [
  path.join(base, 'unit-1-statics.ts'),
  path.join(base, 'unit-2-dynamics.ts'),
  path.join(base, 'unit-3-strength.ts'),
];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');

  // Find all MC questions with options arrays
  const optionsRegex = /options:\s*\[([\s\S]*?)\],\s*\n\s*correctIndex:\s*(\d+)/g;
  let match;
  let biasedCount = 0;
  let totalMC = 0;

  while ((match = optionsRegex.exec(content)) !== null) {
    totalMC++;
    const optionsBlock = match[1];
    const correctIndex = parseInt(match[2]);

    // Extract individual options - handle single-quoted strings with escaped quotes
    const options = [];
    let inString = false;
    let current = '';
    let escaped = false;

    for (let i = 0; i < optionsBlock.length; i++) {
      const ch = optionsBlock[i];
      if (escaped) {
        current += ch;
        escaped = false;
        continue;
      }
      if (ch === '\\') {
        current += ch;
        escaped = true;
        continue;
      }
      if (ch === "'") {
        if (!inString) {
          inString = true;
          current = '';
        } else {
          inString = false;
          options.push(current);
        }
        continue;
      }
      if (inString) {
        current += ch;
      }
    }

    if (options.length !== 4) continue;

    const correctLen = options[correctIndex].length;
    const wrongLens = options.filter((_, i) => i !== correctIndex).map(o => o.length);
    const avgWrongLen = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;

    const ratio = correctLen / avgWrongLen;
    if (ratio > 1.3) {
      biasedCount++;
      console.log('BIASED: ' + file.split('/').pop() + ' correctIndex=' + correctIndex + ' ratio=' + ratio.toFixed(2) + ' correctLen=' + correctLen + ' avgWrongLen=' + Math.round(avgWrongLen));
      options.forEach((o, i) => {
        const marker = i === correctIndex ? 'CORRECT' : 'WRONG  ';
        console.log('  ' + marker + ' [' + i + '] (len=' + o.length + '): ' + o.substring(0, 100));
      });
      console.log('');
    }
  }

  console.log(file.split('/').pop() + ': ' + biasedCount + '/' + totalMC + ' biased (' + Math.round(100*biasedCount/totalMC) + '%)');
  console.log('===');
}
