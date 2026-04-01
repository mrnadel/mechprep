import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(__dirname, '../src/data/course/professions/psychology/units/section-10-developmental-part1.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Collect all correctIndex occurrences with their question IDs
// Strategy: find each question block with correctIndex: 0, and redistribute
// We'll assign target indices in a round-robin pattern: 0,1,2,3,0,1,2,3...
// But we need to also shuffle the options to match

// Parse: find all "correctIndex: N" occurrences and the surrounding options
const regex = /options:\s*\[([\s\S]*?)\],\s*correctIndex:\s*(\d+)/g;
let match;
const matches: {fullMatch: string, options: string[], currentCI: number, start: number}[] = [];

while ((match = regex.exec(content)) !== null) {
  const optionsStr = match[1];
  // Parse individual options (they're string literals)
  const optParts = optionsStr.split(/,(?=\s*')/);
  const options = optParts.map(o => o.trim());
  matches.push({
    fullMatch: match[0],
    options,
    currentCI: parseInt(match[2]),
    start: match.index
  });
}

console.log('Total MC/scenario questions found:', matches.length);

// Create a distribution plan: round-robin 0,1,2,3
const targetPattern = [0, 1, 2, 3];
let patternIdx = 0;

for (const m of matches) {
  const targetCI = targetPattern[patternIdx % 4];
  patternIdx++;

  if (m.currentCI === targetCI) continue; // already correct position

  // Swap the correct answer (at position m.currentCI) with whatever is at targetCI
  const newOptions = [...m.options];
  const temp = newOptions[targetCI];
  newOptions[targetCI] = newOptions[m.currentCI];
  newOptions[m.currentCI] = temp;

  const newOptionsStr = newOptions.join(',\n              ');
  const newBlock = `options: [\n              ${newOptionsStr},\n            ],\n            correctIndex: ${targetCI}`;

  content = content.replace(m.fullMatch, newBlock);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Done! Redistributed correctIndex values.');
