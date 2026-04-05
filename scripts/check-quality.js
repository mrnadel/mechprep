const fs = require('fs');
const files = [
  'src/data/course/professions/psychology/units/section-11-mental-health-part2.ts',
  'src/data/course/professions/psychology/units/section-12-therapy-part1.ts',
  'src/data/course/professions/psychology/units/section-12-therapy-part2.ts',
  'src/data/course/professions/psychology/units/section-13-applied-part1.ts',
  'src/data/course/professions/psychology/units/section-13-applied-part2.ts',
  'src/data/course/professions/psychology/units/section-14-research-part1.ts',
  'src/data/course/professions/psychology/units/section-14-research-part2.ts',
  'src/data/course/professions/psychology/units/section-15-capstone-part1.ts',
  'src/data/course/professions/psychology/units/section-15-capstone-part2.ts',
];

let totalDups = 0, totalQuestions = 0, totalGeneric = 0;
const genericPatterns = [
  'the reality is more complex',
  'this does not accurately reflect',
  'the evidence shows otherwise',
  'research demonstrates a clear relationship',
  'this overstates the case',
];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');

  let inBlock = false;
  let blockValues = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === 'distractorExplanations: {') {
      inBlock = true;
      blockValues = [];
      continue;
    }
    if (inBlock && trimmed === '},') {
      totalQuestions++;
      // Check for duplicates
      if (blockValues.length > 1 && blockValues.every(v => v === blockValues[0])) {
        totalDups++;
      }
      // Check for generic patterns
      for (const v of blockValues) {
        for (const p of genericPatterns) {
          if (v.toLowerCase().includes(p)) {
            totalGeneric++;
            break;
          }
        }
      }
      inBlock = false;
      continue;
    }
    if (inBlock) {
      const match = trimmed.match(/^\d+: '(.+)',?$/);
      if (match) {
        blockValues.push(match[1]);
      }
    }
  }
}

console.log('Total questions with distractorExplanations:', totalQuestions);
console.log('Questions where all distractors have the same text:', totalDups);
console.log('Individual distractor entries using generic patterns:', totalGeneric);
