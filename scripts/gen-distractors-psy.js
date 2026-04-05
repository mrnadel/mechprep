/**
 * Generate distractorExplanations JSON for psychology course files.
 * Reads each file, finds eligible questions, and generates explanations.
 *
 * Usage: node scripts/gen-distractors-psy.js
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'psychology', 'units');

const files = [
  'section-7-emotions-part2.ts',
  'section-8-social-part1.ts',
  'section-8-social-part2.ts',
  'section-9-personality-part1.ts',
  'section-9-personality-part2.ts',
  'section-10-developmental-part1.ts',
  'section-10-developmental-part2.ts',
];

for (const file of files) {
  const filePath = path.join(BASE, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const result = {};

  // Find eligible questions
  const qPattern = /id:\s*'(psy-[^']+(?:-Q)\d+)'\s*,\s*\n\s*type:\s*'(multiple-choice|scenario|pick-the-best|true-false)'/g;
  let match;

  while ((match = qPattern.exec(content)) !== null) {
    const id = match[1];
    const type = match[2];
    const startPos = match.index;
    const window = content.substring(startPos, startPos + 1200);

    // Skip if already has distractorExplanations
    const nextQ = window.substring(50).match(/id:\s*['"]/);
    const searchW = nextQ ? window.substring(0, 50 + nextQ.index) : window.substring(0, 1200);
    if (searchW.includes('distractorExplanations')) continue;

    if (type === 'true-false') {
      const caMatch = window.match(/correctAnswer:\s*(true|false)/);
      const qMatch = window.match(/question:\s*'((?:[^'\\]|\\.)*)'/);
      const explMatch = window.match(/explanation:\s*'((?:[^'\\]|\\.)*)'/);
      if (!caMatch || !qMatch) continue;

      const correctAnswer = caMatch[1] === 'true';
      const question = qMatch[1];
      const explanation = explMatch ? explMatch[1] : '';

      // For true-false: 0 = True, 1 = False
      // Add explanation for the wrong option only
      const wrongIndex = correctAnswer ? 1 : 0;

      // Generate explanation based on the question and explanation
      let distExpl;
      if (correctAnswer) {
        // Correct is True, wrong is False
        distExpl = explanation ?
          explanation.replace(/^This is correct[.:]\s*/i, '').replace(/\s*$/, '') :
          'This statement is actually true based on the research discussed.';
      } else {
        // Correct is False, wrong is True
        distExpl = explanation ?
          explanation.replace(/^This is incorrect[.:]\s*/i, '').replace(/\s*$/, '') :
          'This statement is actually false based on the research discussed.';
      }

      // Clean up and make it concise
      if (distExpl.length > 120) {
        distExpl = distExpl.substring(0, distExpl.lastIndexOf('.', 120) + 1) || distExpl.substring(0, 120);
      }

      result[id] = { [wrongIndex]: distExpl };
    } else {
      // multiple-choice, scenario, pick-the-best
      const ciMatch = window.match(/correctIndex:\s*(\d+)/);
      const qMatch = window.match(/question:\s*'((?:[^'\\]|\\.)*)'/);
      const explMatch = window.match(/explanation:\s*'((?:[^'\\]|\\.)*)'/);

      if (!ciMatch || !qMatch) continue;

      const correctIndex = parseInt(ciMatch[1]);
      const question = qMatch[1];
      const explanation = explMatch ? explMatch[1] : '';

      // Extract options
      const optBlock = window.match(/options:\s*\[\s*\n([\s\S]*?)\]/);
      if (!optBlock) continue;

      const optMatches = [...optBlock[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)];
      const opts = optMatches.map(m => m[1]);

      if (opts.length < 2) continue;

      // Generate distractor explanations for wrong options
      const distractors = {};
      for (let i = 0; i < opts.length; i++) {
        if (i === correctIndex) continue;

        const opt = opts[i];
        const correctOpt = opts[correctIndex] || '';

        // Generate a concise explanation
        let distExpl = generateDistractorExplanation(opt, correctOpt, explanation, question);
        distractors[i] = distExpl;
      }

      if (Object.keys(distractors).length > 0) {
        result[id] = distractors;
      }
    }
  }

  // Write JSON file
  const outName = file.replace('.ts', '.json');
  const outPath = path.join(__dirname, 'distractors', outName);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`${file}: ${Object.keys(result).length} questions -> ${outName}`);
}

function generateDistractorExplanation(wrongOpt, correctOpt, explanation, question) {
  // Clean up the option text
  const wrong = wrongOpt.replace(/\\'/g, "'").trim();
  const correct = correctOpt.replace(/\\'/g, "'").trim();
  const expl = explanation.replace(/\\'/g, "'").trim();

  // Simple heuristic-based explanation generation
  // We'll create explanations that explain why the wrong option fails

  // If the wrong option contains negations or absolutes, call them out
  const absoluteWords = ['always', 'never', 'all', 'none', 'only', 'every', 'no one', 'everyone', 'completely', 'entirely', 'impossible', 'purely'];
  for (const abs of absoluteWords) {
    if (wrong.toLowerCase().includes(abs) && !correct.toLowerCase().includes(abs)) {
      return `This uses the absolute "${abs}" which is rarely true in psychology; the reality is more nuanced.`;
    }
  }

  // If the explanation gives a good reason, adapt it
  if (expl) {
    // Shorten the explanation and negate it for the wrong option
    const shortened = expl.length > 100 ? expl.substring(0, expl.lastIndexOf('.', 100) + 1) || expl.substring(0, 100) : expl;
    return `This is incorrect because ${shortened.charAt(0).toLowerCase()}${shortened.slice(1)}`;
  }

  return `This option does not accurately reflect the concept being tested.`;
}
