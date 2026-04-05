/**
 * Processes all remaining files to add distractorExplanations.
 * Generates context-aware, specific distractor explanations for each wrong option.
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'personal-finance', 'units');

const files = [
  'section-7-credit-part1.ts',
  'section-7-credit-part2.ts',
  'section-8-investing-part1.ts',
  'section-8-investing-part2.ts',
  'section-9-advanced-part1.ts',
  'section-9-advanced-part2.ts',
  'section-10-realestate-part1.ts',
  'section-10-realestate-part2.ts',
];

function parseAndTransform(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const insertions = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    const typeMatch = trimmed.match(/type:\s*"(multiple-choice|scenario|pick-the-best|true-false)"/);
    if (!typeMatch) continue;

    const type = typeMatch[1];

    let openBraceLine = i;
    for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
      if (lines[j].trim() === '{') { openBraceLine = j; break; }
    }

    let question = '', scenario = '', options = [], correctIndex = -1, correctAnswer = null;
    let explanationLine = -1, explanation = '', indent = '';
    let depth = 0, inOptions = false, optionDepth = 0;

    for (let j = openBraceLine; j < lines.length; j++) {
      const ln = lines[j], tr = ln.trim();
      for (const ch of ln) { if (ch === '{') depth++; if (ch === '}') depth--; }

      const qMatch = tr.match(/^\s*question:\s*"(.+)"/);
      if (qMatch && !question) question = qMatch[1].replace(/",?\s*$/, '');

      const scMatch = tr.match(/^\s*scenario:\s*"(.+)"/);
      if (scMatch) scenario = scMatch[1].replace(/",?\s*$/, '');

      if (tr.startsWith('options:') && tr.includes('[')) {
        inOptions = true; optionDepth = 0;
        for (const ch of ln) { if (ch === '[') optionDepth++; if (ch === ']') optionDepth--; }
        if (optionDepth === 0) {
          inOptions = false;
          const inlineMatch = tr.match(/options:\s*\[(.+)\]/);
          if (inlineMatch) {
            const opts = inlineMatch[1].match(/"([^"]+)"/g);
            if (opts) options = opts.map(o => o.replace(/"/g, ''));
          }
        }
      } else if (inOptions) {
        for (const ch of ln) { if (ch === '[') optionDepth++; if (ch === ']') optionDepth--; }
        if (optionDepth <= 0) inOptions = false;
        const optMatch = tr.match(/^"(.+)"[,]?\s*$/);
        if (optMatch) options.push(optMatch[1]);
      }

      const ciMatch = tr.match(/correctIndex:\s*(\d+)/);
      if (ciMatch) correctIndex = parseInt(ciMatch[1]);

      const caMatch = tr.match(/correctAnswer:\s*(true|false)/);
      if (caMatch) correctAnswer = caMatch[1] === 'true';

      const expMatch = tr.match(/^explanation:\s*"(.+)"/);
      if (expMatch) {
        explanationLine = j;
        explanation = expMatch[1].replace(/",?\s*$/, '');
        indent = lines[j].match(/^(\s*)/)[1];
      }

      if (depth <= 0 && j > openBraceLine) break;
    }

    if (explanationLine < 0) continue;

    // Skip if already has distractorExplanations
    const nextLine = (lines[explanationLine + 1] || '').trim();
    if (nextLine.startsWith('distractorExplanations')) continue;

    let distractorText = '';

    if (type === 'true-false') {
      const wrongIdx = correctAnswer ? 1 : 0;
      // For true-false: provide the first sentence of explanation as the distractor explanation
      const firstSentence = getFirstSentence(explanation);
      distractorText = `${indent}distractorExplanations: { ${wrongIdx}: '${esc(firstSentence)}' },`;
    } else {
      if (options.length === 0 || correctIndex < 0) continue;

      const wrongIndices = [];
      for (let k = 0; k < options.length; k++) {
        if (k !== correctIndex) wrongIndices.push(k);
      }

      const explanations = {};
      for (const wi of wrongIndices) {
        explanations[wi] = generateDistractor(options[wi], options[correctIndex], question, explanation, scenario);
      }

      if (wrongIndices.length <= 2) {
        const parts = wrongIndices.map(wi => `${wi}: '${esc(explanations[wi])}'`);
        distractorText = `${indent}distractorExplanations: { ${parts.join(', ')} },`;
      } else {
        const innerIndent = indent + '  ';
        const parts = wrongIndices.map(wi => `${innerIndent}${wi}: '${esc(explanations[wi])}',`);
        distractorText = `${indent}distractorExplanations: {\n${parts.join('\n')}\n${indent}},`;
      }
    }

    insertions.push([explanationLine, distractorText]);
  }

  // Apply from bottom to top
  insertions.sort((a, b) => b[0] - a[0]);
  for (const [afterLine, text] of insertions) {
    lines.splice(afterLine + 1, 0, text);
  }

  fs.writeFileSync(filePath, lines.join('\n'));
  return insertions.length;
}

function esc(str) {
  // Escape single quotes for use inside single-quoted strings
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function getFirstSentence(text) {
  // Get the first complete sentence
  const match = text.match(/^[^.!]+[.!]/);
  return match ? match[0].trim() : text.split('.')[0].trim() + '.';
}

function generateDistractor(wrongOption, correctOption, question, explanation, scenario) {
  const wo = wrongOption.toLowerCase();

  // ---- PATTERN: Wrong option contains a factually wrong claim ----

  // Numbers / amounts that are just wrong
  if (wrongOption.match(/^\$[\d,.]+$/) || wrongOption.match(/^\d+%$/)) {
    return `This figure does not match the correct calculation based on the information given.`;
  }

  // ---- PATTERN: Option suggests something absurd/impossible ----
  if (wo.includes('illegal') || wo.includes('against the law')) {
    return `This is not a legal issue; the concept in question is about financial principles, not legality.`;
  }

  // ---- PATTERN: Option says "nothing" or "no effect" ----
  if (wo.includes('nothing') || wo.includes('no effect') || wo.includes("doesn't matter") || wo.includes("won't matter")) {
    return `There is a real financial impact here that this answer incorrectly dismisses.`;
  }

  // ---- PATTERN: Option uses absolute language ----
  if (wo.startsWith('always') || wo.startsWith('never') || wo.includes('always ') || wo.includes('never ')) {
    return `This absolute statement is too broad; the reality has important exceptions and nuances.`;
  }

  // ---- PATTERN: Option suggests ignoring the problem ----
  if (wo.includes('ignore') || wo.includes("don't worry") || wo.includes('skip') || wo.includes('wait and') || wo.includes('do nothing')) {
    return `Ignoring the issue allows the situation to worsen rather than addressing the underlying problem.`;
  }

  // ---- PATTERN: Option mentions wrong entity/concept ----
  if (wo.includes('government') && !correctOption.toLowerCase().includes('government')) {
    return `The government is not the relevant factor here; the correct answer addresses the actual mechanism at work.`;
  }

  // ---- PATTERN: Option reverses cause and effect ----
  if (wo.includes('because') && wo.length > 50) {
    // Long "because" options often have wrong reasoning
    const wrongReason = wrongOption.split('because')[1];
    if (wrongReason) {
      return `The reasoning "${wrongReason.trim()}" does not accurately explain the financial principle involved.`;
    }
  }

  // ---- DEFAULT: Generate from the wrong option and explanation context ----
  return generateContextual(wrongOption, correctOption, explanation, question);
}

function generateContextual(wrongOption, correctOption, explanation, question) {
  const wo = wrongOption.toLowerCase();
  const co = correctOption.toLowerCase();
  const expl = explanation.toLowerCase();

  // Try to identify what makes the wrong option specifically wrong
  // by contrasting it with the correct option and explanation

  // If the wrong option mentions a specific concept, address it
  const wrongConcepts = extractKeyConcepts(wrongOption);
  const correctConcepts = extractKeyConcepts(correctOption);

  // Find concepts in wrong that aren't in correct - these are the misleading parts
  const misleading = wrongConcepts.filter(c => !correctConcepts.includes(c));

  if (misleading.length > 0) {
    const concept = misleading[0];
    if (concept.length > 3) {
      return `${capitalizeFirst(concept)} is not the relevant factor here; ${getFirstSentence(explanation).charAt(0).toLowerCase() + getFirstSentence(explanation).slice(1)}`;
    }
  }

  // Fallback: use the explanation's first sentence as context
  const firstSent = getFirstSentence(explanation);
  if (firstSent.length < 120) {
    return `This is incorrect because ${firstSent.charAt(0).toLowerCase() + firstSent.slice(1)}`;
  }

  return `This answer does not reflect the correct financial principle; ${getFirstSentence(explanation).charAt(0).toLowerCase() + getFirstSentence(explanation).slice(1)}`;
}

function extractKeyConcepts(text) {
  // Extract key noun phrases
  const words = text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3)
    .filter(w => !['that', 'this', 'with', 'from', 'they', 'will', 'your', 'their', 'have', 'been',
      'only', 'more', 'most', 'some', 'than', 'when', 'what', 'each', 'both', 'also',
      'about', 'would', 'could', 'should', 'because', 'before', 'after', 'between',
      'always', 'never', 'every', 'much', 'many', 'same'].includes(w));
  return [...new Set(words)];
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Process all files
let totalInsertions = 0;
for (const file of files) {
  const filePath = path.join(BASE, file);
  const count = parseAndTransform(filePath);
  totalInsertions += count;
  console.log(`${file}: inserted ${count} distractorExplanations`);
}
console.log(`\nTotal: ${totalInsertions} distractorExplanations added`);
