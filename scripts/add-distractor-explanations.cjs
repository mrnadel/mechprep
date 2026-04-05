/**
 * Add distractorExplanations to course question files.
 *
 * For true-false: extracts a concise explanation from the existing explanation field.
 * For MC/scenario/pick-the-best: generates per-option explanations by contrasting
 * each wrong option against the correct answer and explanation.
 *
 * Usage: node scripts/add-distractor-explanations.cjs [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const BASE = path.join(__dirname, '..', 'src', 'data', 'course', 'professions');

// Collect all target files
const files = [];
for (let i = 0; i <= 12; i++) files.push(path.join(BASE, 'personal-finance', 'units', `unit-${i}.ts`));
for (let i = 1; i <= 10; i++) files.push(path.join(BASE, 'psychology', 'units', `unit-${i}.ts`));
for (let i = 1; i <= 10; i++) files.push(path.join(BASE, 'space-astronomy', 'units', `unit-${i}.ts`));

/**
 * Extract a clean, concise reason from the explanation text.
 * Removes leading filler words like "Yes!", "Exactly!", "Not true.", etc.
 */
function cleanExplanation(text) {
  return text
    .replace(/^(yes|no|exactly|absolutely|correct|not true|not quite|not at all|the opposite|that's it|that's right|that's all it is|yep|nope)[!.,]?\s*/i, '')
    .replace(/^(it's|this is|it means|it)\s+/i, '')
    .trim();
}

/**
 * Get first sentence from text
 */
function firstSentence(text) {
  // Split on period followed by space or end, but not on common abbreviations
  const m = text.match(/^(.+?(?<!\b(?:vs|Dr|Mr|Mrs|Ms|Inc|Ltd|etc|e\.g|i\.e))\.\s)/);
  if (m) return m[1].trim();
  // If no period found, take up to 120 chars
  if (text.length > 120) return text.substring(0, 117) + '...';
  return text;
}

/**
 * Capitalize first letter
 */
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/**
 * For true-false questions, generate a distractor explanation for the wrong answer.
 */
function tfDistractor(question, correctAnswer, explanation) {
  const cleaned = cleanExplanation(explanation);
  const core = firstSentence(cleaned);

  if (correctAnswer === true) {
    // Wrong answer is "false" (index 1)
    // Explain why false is wrong = why the statement IS true
    return core.replace(/\.$/, '');
  } else {
    // Wrong answer is "true" (index 0)
    // Explain why true is wrong = why the statement is actually FALSE
    return core.replace(/\.$/, '');
  }
}

/**
 * For MC questions, generate a distractor explanation for each wrong option.
 * Tries to be specific to each wrong option rather than just restating the correct answer.
 */
function mcDistractor(wrongOption, correctOption, explanation, question, allOptions, correctIndex) {
  const wrong = wrongOption.trim();
  const correct = correctOption.trim();
  const exp = cleanExplanation(explanation);
  const expFirst = firstSentence(exp);

  // For short numeric or simple answers, be more direct
  if (wrong.match(/^[\d$,.\s%]+$/) || wrong.match(/^about \d/i)) {
    // It's a numeric wrong answer
    return `The correct answer is ${correct} — this value is incorrect`;
  }

  // If the wrong option is very similar to correct, highlight the distinction
  if (wrong.length < 40 && correct.length < 40) {
    return `${cap(wrong)} is not the right answer here — ${expFirst.charAt(0).toLowerCase() + expFirst.slice(1).replace(/\.$/, '')}`;
  }

  // For longer options (scenario-type), condense
  if (wrong.length > 80) {
    const shortWrong = wrong.substring(0, 60) + '...';
    return `This approach is less effective — ${expFirst.charAt(0).toLowerCase() + expFirst.slice(1).replace(/\.$/, '')}`;
  }

  // Default: explain why this specific option is wrong
  return `${cap(wrong.replace(/"/g, ''))} is not correct — ${expFirst.charAt(0).toLowerCase() + expFirst.slice(1).replace(/\.$/, '')}`;
}

function escapeForSingleQuotes(text) {
  return text.replace(/'/g, "\\'");
}

function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { skipped: true, reason: 'not found' };
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const insertions = []; // { afterLine, text }

  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();

    const typeMatch = trimmed.match(/type:\s*["'](multiple-choice|scenario|pick-the-best|true-false)["']/);
    if (!typeMatch) { i++; continue; }

    const type = typeMatch[1];

    // Find opening brace
    let openBrace = i;
    for (let j = i - 1; j >= Math.max(0, i - 8); j--) {
      if (lines[j].trim() === '{') { openBrace = j; break; }
    }

    // Parse question block
    let id = '', question = '', scenario = '';
    let options = [], correctIndex = -1, correctAnswer = null;
    let explanationLineEnd = -1, explanationText = '', explanationIndent = '';
    let hasDistractorExplanations = false;
    let depth = 0, inOptions = false, optBracketDepth = 0, blockEnd = -1;
    let variantsEndLine = -1, afterExplanation = false;

    for (let j = openBrace; j < lines.length; j++) {
      const ln = lines[j];
      const tr = ln.trim();

      for (const ch of ln) { if (ch === '{') depth++; if (ch === '}') depth--; }

      // Parse fields
      const idM = tr.match(/^\s*id:\s*["']([^"']+)["']/);
      if (idM) id = idM[1];

      const qM = tr.match(/^\s*question:\s*["'](.+?)["'][,]?\s*$/);
      if (qM && !question) question = qM[1];

      const scM = tr.match(/^\s*scenario:\s*["'](.+?)["'][,]?\s*$/);
      if (scM) scenario = scM[1];

      // Options
      if (tr.startsWith('options:') && tr.includes('[')) {
        inOptions = true; optBracketDepth = 0;
        for (const ch of ln) { if (ch === '[') optBracketDepth++; if (ch === ']') optBracketDepth--; }
        if (optBracketDepth <= 0) {
          inOptions = false;
          const inlM = tr.match(/options:\s*\[(.+)\]/);
          if (inlM) {
            const opts = inlM[1].match(/["']([^"']+)["']/g);
            if (opts) options = opts.map(o => o.replace(/^["']|["']$/g, ''));
          }
        }
      } else if (inOptions) {
        for (const ch of ln) { if (ch === '[') optBracketDepth++; if (ch === ']') optBracketDepth--; }
        if (optBracketDepth <= 0) inOptions = false;
        const optM = tr.match(/^["'](.+?)["'][,]?\s*$/);
        if (optM) options.push(optM[1]);
      }

      const ciM = tr.match(/correctIndex:\s*(\d+)/);
      if (ciM) correctIndex = parseInt(ciM[1]);

      const caM = tr.match(/correctAnswer:\s*(true|false)/);
      if (caM) correctAnswer = caM[1] === 'true';

      // Explanation (single or multi-line)
      if (tr.startsWith('explanation:')) {
        explanationIndent = ln.match(/^(\s*)/)[1];
        afterExplanation = true;

        const singleM = tr.match(/explanation:\s*["'](.+?)["'][,]?\s*$/);
        if (singleM) {
          explanationText = singleM[1];
          explanationLineEnd = j;
        } else {
          let parts = [tr.replace(/^\s*explanation:\s*["']/, '')];
          for (let k = j + 1; k < lines.length; k++) {
            const ktr = lines[k].trim();
            if (ktr.match(/["'][,]?\s*$/)) {
              parts.push(ktr.replace(/["'][,]?\s*$/, ''));
              explanationLineEnd = k;
              break;
            }
            parts.push(ktr);
          }
          explanationText = parts.join(' ');
        }
      }

      if (tr.startsWith('distractorExplanations')) hasDistractorExplanations = true;

      // Variants after explanation
      if (afterExplanation && tr.startsWith('variants:') && j > explanationLineEnd) {
        let vD = 0;
        for (let k = j; k < lines.length; k++) {
          for (const ch of lines[k]) { if (ch === '{') vD++; if (ch === '}') vD--; }
          if (vD <= 0) { variantsEndLine = k; break; }
        }
      }

      if (depth <= 0 && j > openBrace) { blockEnd = j; break; }
    }

    if (hasDistractorExplanations || explanationLineEnd < 0) {
      i = blockEnd > i ? blockEnd : i + 1;
      continue;
    }

    let insertAfterLine = explanationLineEnd;
    if (variantsEndLine > explanationLineEnd) insertAfterLine = variantsEndLine;

    // Generate the distractorExplanations text
    let deText = '';
    if (type === 'true-false' && correctAnswer !== null) {
      const wrongIdx = correctAnswer ? 1 : 0;
      const expl = tfDistractor(question, correctAnswer, explanationText);
      deText = `${explanationIndent}distractorExplanations: {\n` +
        `${explanationIndent}  ${wrongIdx}: '${escapeForSingleQuotes(expl)}',\n` +
        `${explanationIndent}},`;
    } else if (['multiple-choice', 'scenario', 'pick-the-best'].includes(type) && correctIndex >= 0 && options.length > 0) {
      const correctOpt = options[correctIndex] || '';
      const entries = [];
      for (let k = 0; k < options.length; k++) {
        if (k === correctIndex) continue;
        const expl = mcDistractor(options[k], correctOpt, explanationText, question, options, correctIndex);
        entries.push(`${explanationIndent}  ${k}: '${escapeForSingleQuotes(expl)}',`);
      }
      deText = `${explanationIndent}distractorExplanations: {\n` +
        entries.join('\n') + '\n' +
        `${explanationIndent}},`;
    }

    if (deText) {
      insertions.push({ afterLine: insertAfterLine, text: deText, id });
    }

    i = blockEnd > i ? blockEnd : i + 1;
  }

  if (insertions.length === 0) return { skipped: false, count: 0 };

  // Apply insertions in reverse
  const newLines = [...lines];
  for (let k = insertions.length - 1; k >= 0; k--) {
    newLines.splice(insertions[k].afterLine + 1, 0, insertions[k].text);
  }

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
  }

  return { skipped: false, count: insertions.length };
}

let total = 0, fileCount = 0;
for (const file of files) {
  const rel = path.relative(BASE, file);
  const result = processFile(file);
  if (result.skipped) {
    console.log(`SKIP ${rel}: ${result.reason}`);
  } else if (result.count === 0) {
    console.log(`DONE ${rel}`);
  } else {
    console.log(`${DRY_RUN ? 'WOULD' : 'ADDED'} ${rel}: ${result.count}`);
    total += result.count;
    fileCount++;
  }
}
console.log(`\n${DRY_RUN ? '[DRY RUN]' : 'COMPLETE:'} ${total} distractorExplanations in ${fileCount} files`);
