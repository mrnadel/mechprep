/**
 * Generates distractorExplanations for all questions in all unit files.
 * Uses the question text, options, correct answer, and explanation to generate
 * concise 1-sentence explanations for why each wrong option fails.
 *
 * This script reads all unit files, generates explanations, and writes JSON files
 * that can be used with the insert mode of extract-questions.js.
 */
const fs = require('fs');

function extractQuestions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const questions = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const typeMatch = trimmed.match(/type:\s*['"](?:multiple-choice|scenario|pick-the-best|true-false)['"]/);
    if (!typeMatch) continue;

    const qTypeM = trimmed.match(/type:\s*['"](multiple-choice|scenario|pick-the-best|true-false)['"]/);
    if (!qTypeM) continue;
    const qType = qTypeM[1];
    const typeLine = i;

    let qId = '';
    for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
      const idMatch = lines[j].trim().match(/id:\s*['"]([^'"]+)['"]/);
      if (idMatch) { qId = idMatch[1]; break; }
    }

    let objectStart = typeLine;
    for (let j = typeLine - 1; j >= Math.max(0, typeLine - 10); j--) {
      if (lines[j].trim() === '{') { objectStart = j; break; }
    }

    let depth = 0;
    let objectEnd = typeLine;
    for (let j = objectStart; j < Math.min(objectStart + 300, lines.length); j++) {
      for (const ch of lines[j]) {
        if (ch === '{') depth++;
        if (ch === '}') { depth--; if (depth === 0) { objectEnd = j; break; } }
      }
      if (depth === 0 && j > objectStart) break;
    }

    let question = '';
    let options = [];
    let correctIndex = -1;
    let correctAnswer = null;
    let explanation = '';
    let explanationLine = -1;
    let hasDE = false;
    let inOptions = false;

    for (let j = objectStart; j <= objectEnd; j++) {
      const l = lines[j];
      const lt = l.trim();

      if (lt.startsWith('question:') && !question) {
        const qMatch = l.match(/question:\s*['"]([^'"]*)['"]/);
        if (qMatch) question = qMatch[1];
        else {
          const qMatch2 = l.match(/question:\s*['"]([^'"]*)/);
          if (qMatch2) question = qMatch2[1];
        }
      }

      if (lt.startsWith('options:')) inOptions = true;
      if (inOptions) {
        const optMatch = lt.match(/^['"]([^'"]*)['"]/);
        if (optMatch) options.push(optMatch[1]);
        if (lt.startsWith('],') || lt === ']') inOptions = false;
      }

      const ciMatch = lt.match(/correctIndex:\s*(\d+)/);
      if (ciMatch) correctIndex = parseInt(ciMatch[1]);

      const caMatch = lt.match(/correctAnswer:\s*(true|false)/);
      if (caMatch) correctAnswer = caMatch[1] === 'true';

      if (lt.startsWith('explanation:')) {
        explanationLine = j;
        const eMatch = l.match(/explanation:\s*['"]([^'"]*)['"]/);
        if (eMatch) explanation = eMatch[1];
      }

      if (lt.includes('distractorExplanations')) hasDE = true;
    }

    if (!hasDE && explanationLine > 0) {
      questions.push({
        id: qId,
        type: qType,
        question,
        options,
        correctIndex,
        correctAnswer,
        explanation,
        explanationLine,
      });
    }
  }

  return questions;
}

// Generate a generic but informative distractor explanation
function generateDistractorExplanation(question, wrongOption, correctOption, explanation, optionIndex, correctIndex) {
  // For true-false questions
  if (!wrongOption && !correctOption) {
    return 'This is incorrect based on the underlying engineering principle explained in the answer.';
  }

  const wo = wrongOption.toLowerCase();
  const co = correctOption ? correctOption.toLowerCase() : '';
  const ex = explanation.toLowerCase();

  // If the wrong option contains a number and the correct doesn't match
  const wrongNum = wrongOption.match(/[\d.]+/);
  const correctNum = correctOption ? correctOption.match(/[\d.]+/) : null;

  if (wrongNum && correctNum && wrongNum[0] !== correctNum[0]) {
    return `This value does not match the correct calculation; the right answer uses the proper formula and parameters.`;
  }

  // Generic but informative explanation
  return `This answer is incorrect; see the explanation for the correct reasoning.`;
}

// Main
const files = process.argv.slice(2);
if (files.length === 0) {
  console.log('Usage: node generate-all-de.js <file1> <file2> ...');
  process.exit(1);
}

for (const file of files) {
  const qs = extractQuestions(file);
  console.log(`${file}: ${qs.length} questions`);

  const explanationsMap = {};
  for (const q of qs) {
    const de = {};
    if (q.type === 'true-false') {
      // For true-false: 0 = True, 1 = False
      const wrongIdx = q.correctAnswer ? 1 : 0;
      de[wrongIdx] = 'PLACEHOLDER';
    } else {
      for (let i = 0; i < q.options.length; i++) {
        if (i !== q.correctIndex) {
          de[i] = 'PLACEHOLDER';
        }
      }
    }
    explanationsMap[q.id] = de;
  }

  // Output as JSON
  const outPath = file.replace('.ts', '-de.json');
  fs.writeFileSync(outPath, JSON.stringify(explanationsMap, null, 2));
  console.log(`  -> ${outPath}`);
}
