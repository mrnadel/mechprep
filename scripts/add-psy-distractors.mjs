/**
 * Add distractorExplanations to psychology course content files.
 * Handles single-quoted TypeScript files.
 *
 * Run: node scripts/add-psy-distractors.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'psychology', 'units');

const FILES = [
  // Skip file 1 - already processed manually
  // 'section-1-mind-part1.ts',
  'section-1-mind-part2.ts',
  'section-2-perception.ts',
  'section-3-learning-part1.ts',
  'section-3-learning-part2.ts',
  'section-4-memory-part1.ts',
  'section-4-memory-part2.ts',
  'section-5-intelligence-part1.ts',
  'section-5-intelligence-part2.ts',
];

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function processFile(filepath) {
  console.log(`\nProcessing: ${path.basename(filepath)}`);
  const content = fs.readFileSync(filepath, 'utf-8');
  const lines = content.split('\n');
  const questions = findAllQuestions(lines);
  const eligible = questions.filter(q => !q.hasDistractorExplanations && q.explanationLineIdx !== -1);
  console.log(`  ${eligible.length} questions need distractorExplanations`);
  if (eligible.length === 0) return 0;

  const insertions = [];
  for (const q of eligible) {
    const indent = q.indent;
    let distLines;
    if (q.type === 'true-false') {
      const wrongIdx = q.correctAnswer ? 1 : 0;
      const exp = makeTFDistractor(q);
      distLines = [
        `${indent}distractorExplanations: {`,
        `${indent}  ${wrongIdx}: '${esc(exp)}',`,
        `${indent}},`,
      ];
    } else {
      const distExps = makeMCDistractors(q);
      distLines = [`${indent}distractorExplanations: {`];
      for (let k = 0; k < q.options.length; k++) {
        if (k === q.correctIndex) continue;
        if (distExps[k]) {
          distLines.push(`${indent}  ${k}: '${esc(distExps[k])}',`);
        }
      }
      distLines.push(`${indent}},`);
    }
    insertions.push({ afterLine: q.explanationLineIdx, text: distLines.join('\n') });
  }

  insertions.sort((a, b) => b.afterLine - a.afterLine);
  const result = [...lines];
  for (const ins of insertions) {
    result.splice(ins.afterLine + 1, 0, ins.text);
  }
  fs.writeFileSync(filepath, result.join('\n'), 'utf-8');
  return insertions.length;
}

// ===== QUESTION FINDER (single-quote aware) =====

function findAllQuestions(lines) {
  const questions = [];

  // First, build a set of line ranges that are inside speedQuestions arrays
  const speedRanges = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().includes('speedQuestions:') && lines[i].includes('[')) {
      // Find the closing ] for this array by tracking bracket depth
      let bracketDepth = 0;
      let started = false;
      for (let j = i; j < lines.length; j++) {
        for (const ch of lines[j]) {
          if (ch === '[') { bracketDepth++; started = true; }
          if (ch === ']') bracketDepth--;
        }
        if (started && bracketDepth <= 0) {
          speedRanges.push([i, j]);
          break;
        }
      }
    }
  }

  function isInSpeedSection(lineIdx) {
    return speedRanges.some(([start, end]) => lineIdx >= start && lineIdx <= end);
  }

  for (let i = 0; i < lines.length; i++) {
    if (isInSpeedSection(i)) continue;

    const trimmed = lines[i].trim();

    // Match both single and double quoted types
    const tm = trimmed.match(/^type:\s*['"](?:multiple-choice|scenario|pick-the-best|true-false)['"]/);
    if (!tm) continue;

    const typeMatch = trimmed.match(/type:\s*['"](multiple-choice|scenario|pick-the-best|true-false)['"]/);
    if (!typeMatch) continue;

    const q = extractQuestion(lines, i, typeMatch[1]);
    if (q) questions.push(q);
  }
  return questions;
}

function extractSingleOrDoubleQuotedString(line, prefix) {
  // Try single quotes first
  const sq = line.match(new RegExp(prefix + "\\s*'((?:[^'\\\\]|\\\\.)*)'"));
  if (sq) return sq[1].replace(/\\'/g, "'");
  // Try double quotes
  const dq = line.match(new RegExp(prefix + '\\s*"((?:[^"\\\\]|\\\\.)*)"'));
  if (dq) return dq[1].replace(/\\"/g, '"');
  return null;
}

function extractQuestion(lines, typeIdx, qType) {
  const q = {
    type: qType, question: '', options: [], correctIndex: null,
    correctAnswer: null, scenario: '', explanation: '',
    explanationLineIdx: -1, indent: '', hasDistractorExplanations: false, id: '',
  };

  // Find block boundaries
  let blockStart = typeIdx, depth = 0;
  for (let j = typeIdx; j >= Math.max(0, typeIdx - 15); j--) {
    for (const ch of lines[j]) { if (ch === '}') depth++; if (ch === '{') depth--; }
    if (depth < 0) { blockStart = j; break; }
  }
  depth = 0;
  let blockEnd = typeIdx;
  for (let j = blockStart; j < Math.min(lines.length, typeIdx + 80); j++) {
    for (const ch of lines[j]) { if (ch === '{') depth++; if (ch === '}') depth--; }
    if (depth === 0 && j > blockStart) { blockEnd = j; break; }
  }

  let inOptions = false;
  for (let j = blockStart; j <= blockEnd; j++) {
    const line = lines[j];
    const trimmed = line.trim();

    // ID
    if (!q.id) {
      const idVal = extractSingleOrDoubleQuotedString(line, 'id:');
      if (idVal) q.id = idVal;
    }

    // Question text
    if (!q.question) {
      const qVal = extractSingleOrDoubleQuotedString(line, 'question:');
      if (qVal) q.question = qVal;
    }

    // Scenario
    if (!q.scenario) {
      const sVal = extractSingleOrDoubleQuotedString(line, 'scenario:');
      if (sVal) q.scenario = sVal;
    }

    // Correct index
    const cm = trimmed.match(/correctIndex:\s*(\d+)/);
    if (cm) q.correctIndex = parseInt(cm[1]);

    // Correct answer (true-false)
    const cam = trimmed.match(/correctAnswer:\s*(true|false)/);
    if (cam) q.correctAnswer = cam[1] === 'true';

    // Explanation - match the full line including indent
    if (trimmed.startsWith('explanation:')) {
      const expVal = extractSingleOrDoubleQuotedString(line, 'explanation:');
      if (expVal) {
        q.explanationLineIdx = j;
        q.indent = line.match(/^(\s*)/)[1];
        q.explanation = expVal;
      }
    }

    // Check for existing distractor explanations
    if (line.includes('distractorExplanations')) q.hasDistractorExplanations = true;

    // Options parsing
    if (trimmed.startsWith('options:') && trimmed.includes('[')) {
      inOptions = true;
      // Check for single-line options
      const singleLine = line.match(/options:\s*\[(.+)\]\s*,?\s*$/);
      if (singleLine) {
        const all = singleLine[1].match(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g);
        if (all) q.options = all.map(s => s.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"'));
        inOptions = false;
      }
      continue;
    }
    if (inOptions) {
      if (trimmed === '],' || trimmed === ']') { inOptions = false; continue; }
      // Single or double quoted option
      const om = trimmed.match(/^'((?:[^'\\]|\\.)*)'[,]?\s*$/) || trimmed.match(/^"((?:[^"\\]|\\.)*)"[,]?\s*$/);
      if (om) q.options.push(om[1].replace(/\\'/g, "'").replace(/\\"/g, '"'));
    }
  }
  return q;
}

// ===== EXPLANATION GENERATORS =====

function cleanExp(exp) {
  let s = exp;
  s = s.replace(/^That's (exactly |the core idea|the core|right|correct|it|the purpose|how|why|what)\.?\s*/i, '');
  s = s.replace(/^Yes[.,!]\s*/i, '');
  s = s.replace(/^No[.,!]\s*/i, '');
  s = s.replace(/^Correct[.,!]\s*/i, '');
  s = s.replace(/^Exactly[.,!]\s*/i, '');
  s = s.replace(/^It's the opposite\.\s*/i, '');
  s = s.replace(/\.$/, '');
  return s;
}

function ucFirst(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function lcFirst(s) {
  if (!s) return '';
  if (s.match(/^[A-Z]{2,}/)) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function makeTFDistractor(q) {
  let exp = cleanExp(q.explanation);
  exp = ucFirst(exp);
  if (!exp.endsWith('.')) exp += '.';
  return exp;
}

function makeMCDistractors(q) {
  const exps = {};
  for (let i = 0; i < q.options.length; i++) {
    if (i === q.correctIndex) continue;
    exps[i] = makeOneDistractor(q, i);
  }
  return exps;
}

function makeOneDistractor(q, wrongIdx) {
  const wrong = q.options[wrongIdx];
  const correct = q.options[q.correctIndex];
  const exp = q.explanation;
  const w = wrong.toLowerCase().trim();

  const cleanedExp = cleanExp(exp);
  const lcExp = lcFirst(cleanedExp);

  // Strategy: create option-specific explanations that reference the wrong option

  // For "nothing/no effect" options
  if (isNothingOption(w)) {
    return fin(`There is a real effect here; ${lcExp}.`);
  }

  // For absolute/sweeping claims
  if (isAbsolute(w)) {
    return fin(`This is too absolute; ${lcExp}.`);
  }

  // For short options (likely naming a wrong concept), create a contrast
  if (wrong.length <= 55) {
    // Try to create an option-specific explanation
    const wrongLC = wrong.toLowerCase();
    const correctLC = correct.toLowerCase();

    // If both are short concepts, contrast them
    if (correct.length <= 55) {
      // Check for common patterns
      if (wrongLC.includes('only') || wrongLC.includes('just')) {
        return fin(`This is too narrow; ${lcExp}.`);
      }
      if (wrongLC === 'true' || wrongLC === 'false' || wrongLC === 'yes' || wrongLC === 'no') {
        return fin(`${ucFirst(cleanedExp)}.`);
      }
      // Named concept distractor
      return fin(`${ucFirst(wrong)} is not correct here; ${lcExp}.`);
    }
    return fin(`${ucFirst(wrong)} is not correct here; ${lcExp}.`);
  }

  // For long options (containing reasoning)
  if (w.includes('because') || w.includes('since') || w.includes('due to')) {
    return fin(`This reasoning is flawed; ${lcExp}.`);
  }

  return fin(`This is not accurate; ${lcExp}.`);
}

function isNothingOption(w) {
  return w === 'nothing' || w.includes('nothing happens') ||
    w.includes('no effect') || w.includes('no impact') ||
    w === 'none' || w.includes('not important') || w.includes('no role');
}

function isAbsolute(w) {
  return (w.startsWith('always') || w.includes(' always ') || w.endsWith(' always') ||
    w.startsWith('never') || w.includes(' never ') || w.endsWith(' never') ||
    w.includes('everyone') || w.includes('no one') || w.includes('impossible') ||
    w.includes(' every ') || w.startsWith('all ') || w.includes('regardless of') ||
    w.includes('completely random') || w.includes('guaranteed'));
}

function fin(text) {
  let s = text.replace(/\s+/g, ' ').trim();
  s = s.replace(/\.\.+/g, '.').replace(/\.\s*\./g, '.');

  // Cap at ~145 chars
  if (s.length > 148) {
    let cut = s.lastIndexOf('.', 145);
    if (cut > 60) {
      s = s.substring(0, cut + 1);
    } else {
      cut = s.lastIndexOf(' ', 145);
      if (cut > 60) s = s.substring(0, cut) + '.';
    }
  }
  return s;
}

// ===== MAIN =====

let totalInserted = 0;
for (const file of FILES) {
  const filepath = path.join(BASE, file);
  if (!fs.existsSync(filepath)) {
    console.log(`  SKIP: ${file} not found`);
    continue;
  }
  totalInserted += processFile(filepath);
}
console.log(`\nDone. Inserted ${totalInserted} distractorExplanations.`);
