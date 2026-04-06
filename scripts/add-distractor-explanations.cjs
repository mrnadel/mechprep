/**
 * Add distractorExplanations to course question files (unit-*.ts).
 *
 * True-false: single entry for the wrong boolean, derived from the explanation.
 * MC/scenario/pick-the-best: per-option entries using the explanation.
 *
 * Usage: node scripts/add-distractor-explanations.cjs [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const BASE = path.join(__dirname, '..', 'src', 'data', 'course', 'professions');

const files = [];
for (let i = 0; i <= 12; i++) files.push(path.join(BASE, 'personal-finance', 'units', `unit-${i}.ts`));
for (let i = 1; i <= 10; i++) files.push(path.join(BASE, 'psychology', 'units', `unit-${i}.ts`));
for (let i = 1; i <= 10; i++) files.push(path.join(BASE, 'space-astronomy', 'units', `unit-${i}.ts`));

function esc(text) { return text.replace(/'/g, "\\'"); }

/** Remove leading filler words from explanation text */
function stripFiller(text) {
  // IMPORTANT: longer/more specific patterns MUST come before shorter ones
  const fillers = [
    /^Not true[!.,:]?\s*/i,
    /^Not quite[!.,:]?\s*/i,
    /^Not at all[!.,:]?\s*/i,
    /^Not really[!.,:]?\s*/i,
    /^The opposite[!.,:]?\s*/i,
    /^It'?s the other way around[!.,:]?\s*/i,
    /^It'?s actually the opposite[!.,:]?\s*/i,
    /^Far from it[!.,:]?\s*/i,
    /^That's all it is[!.,:]?\s*/i,
    /^That's right[!.,:]?\s*/i,
    /^That's it[!.,:]?\s*/i,
    /^That's exactly its purpose[!.,:]?\s*/i,
    /^Absolutely[!.,:]?\s*/i,
    /^Exactly right[!.,:]?\s*/i,
    /^Exactly[!.,:]?\s*/i,
    /^Correct[!.,:]?\s*/i,
    /^Bingo[!.,:]?\s*/i,
    /^Nope[!.,:]?\s*/i,
    /^Yep[!.,:]?\s*/i,
    /^Yes[!.,:]?\s*/i,
    /^No\b[!.,:]?\s*/i,
  ];
  let result = text;
  let changed = true;
  while (changed) {
    changed = false;
    for (const f of fillers) {
      const before = result;
      result = result.replace(f, '').trim();
      if (result !== before) { changed = true; break; }
    }
  }
  return result.trim();
}

/** Get first meaningful sentence (at least 35 chars to be educational) */
function firstSent(text) {
  if (!text) return '';
  const parts = text.split(/(?<=[.!])\s+/);

  // If first sentence is long enough, use it
  if (parts[0] && parts[0].length >= 35) {
    let s = parts[0].replace(/[.!]\s*$/, '');
    if (s.length > 150) s = s.substring(0, 147) + '...';
    return s;
  }

  // First sentence is too short - combine first two sentences
  if (parts.length > 1) {
    let combined = (parts[0] + ' ' + parts[1]).replace(/[.!]\s*$/, '');
    if (combined.length > 150) combined = combined.substring(0, 147) + '...';
    return combined;
  }

  // Fallback: use all text
  let s = text.replace(/[.!]\s*$/, '');
  if (s.length > 150) s = s.substring(0, 147) + '...';
  return s;
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

function makeTF(question, correctAnswer, explanation) {
  const cleaned = stripFiller(explanation);
  return cap(firstSent(cleaned));
}

function makeMC(wrongOpt, correctOpt, explanation, question, allOptions, correctIdx, wrongIdx) {
  const cleaned = stripFiller(explanation);
  const core = firstSent(cleaned);
  // For numeric options
  if ((wrongOpt.match(/^[\d$,.\s%~]+$/) || wrongOpt.match(/^about \d/i)) &&
      (correctOpt.match(/^[\d$,.\s%~]+$/) || correctOpt.match(/^about \d/i))) {
    return `The correct answer is ${correctOpt}, not ${wrongOpt}`;
  }
  return cap(core);
}

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return { skipped: true, reason: 'not found' };
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const insertions = [];

  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    const typeMatch = trimmed.match(/type:\s*["'](multiple-choice|scenario|pick-the-best|true-false)["']/);
    if (!typeMatch) { i++; continue; }
    const type = typeMatch[1];

    let openBrace = i;
    for (let j = i - 1; j >= Math.max(0, i - 8); j--) {
      if (lines[j].trim() === '{') { openBrace = j; break; }
    }

    let id = '', question = '', options = [], correctIndex = -1, correctAnswer = null;
    let explanationLineEnd = -1, explanationText = '', explanationIndent = '';
    let hasDE = false, depth = 0, inOptions = false, optBD = 0, blockEnd = -1;
    let variantsEndLine = -1, afterExp = false;

    for (let j = openBrace; j < lines.length; j++) {
      const ln = lines[j], tr = ln.trim();
      for (const ch of ln) { if (ch === '{') depth++; if (ch === '}') depth--; }
      let m;
      if ((m = tr.match(/^\s*id:\s*["']([^"']+)["']/))) id = m[1];
      if ((m = tr.match(/^\s*question:\s*["'](.+?)["'][,]?\s*$/)) && !question) question = m[1];
      if (tr.startsWith('options:') && tr.includes('[')) {
        inOptions = true; optBD = 0;
        for (const ch of ln) { if (ch === '[') optBD++; if (ch === ']') optBD--; }
        if (optBD <= 0) {
          inOptions = false;
          if ((m = tr.match(/options:\s*\[(.+)\]/))) {
            const opts = m[1].match(/["']([^"']+)["']/g);
            if (opts) options = opts.map(o => o.replace(/^["']|["']$/g, ''));
          }
        }
      } else if (inOptions) {
        for (const ch of ln) { if (ch === '[') optBD++; if (ch === ']') optBD--; }
        if (optBD <= 0) inOptions = false;
        if ((m = tr.match(/^["'](.+?)["'][,]?\s*$/))) options.push(m[1]);
      }
      if ((m = tr.match(/correctIndex:\s*(\d+)/))) correctIndex = parseInt(m[1]);
      if ((m = tr.match(/correctAnswer:\s*(true|false)/))) correctAnswer = m[1] === 'true';
      if (tr.startsWith('explanation:')) {
        explanationIndent = ln.match(/^(\s*)/)[1];
        afterExp = true;
        if ((m = tr.match(/explanation:\s*["'](.+?)["'][,]?\s*$/))) {
          explanationText = m[1]; explanationLineEnd = j;
        } else {
          let parts = [tr.replace(/^\s*explanation:\s*["']/, '')];
          for (let k = j + 1; k < lines.length; k++) {
            const ktr = lines[k].trim();
            if (ktr.match(/["'][,]?\s*$/)) {
              parts.push(ktr.replace(/["'][,]?\s*$/, '')); explanationLineEnd = k; break;
            }
            parts.push(ktr);
          }
          explanationText = parts.join(' ');
        }
      }
      if (tr.startsWith('distractorExplanations')) hasDE = true;
      if (afterExp && tr.startsWith('variants:') && j > explanationLineEnd) {
        let vD = 0;
        for (let k = j; k < lines.length; k++) {
          for (const ch of lines[k]) { if (ch === '{') vD++; if (ch === '}') vD--; }
          if (vD <= 0) { variantsEndLine = k; break; }
        }
      }
      if (depth <= 0 && j > openBrace) { blockEnd = j; break; }
    }

    if (hasDE || explanationLineEnd < 0) { i = blockEnd > i ? blockEnd : i + 1; continue; }

    let insertAfterLine = variantsEndLine > explanationLineEnd ? variantsEndLine : explanationLineEnd;
    let deText = '';

    if (type === 'true-false' && correctAnswer !== null) {
      const wrongIdx = correctAnswer ? 1 : 0;
      const expl = makeTF(question, correctAnswer, explanationText);
      deText = `${explanationIndent}distractorExplanations: {\n` +
        `${explanationIndent}  ${wrongIdx}: '${esc(expl)}',\n` +
        `${explanationIndent}},`;
    } else if (['multiple-choice', 'scenario', 'pick-the-best'].includes(type) && correctIndex >= 0 && options.length > 0) {
      const correctOpt = options[correctIndex] || '';
      const entries = [];
      for (let k = 0; k < options.length; k++) {
        if (k === correctIndex) continue;
        const expl = makeMC(options[k], correctOpt, explanationText, question, options, correctIndex, k);
        entries.push(`${explanationIndent}  ${k}: '${esc(expl)}',`);
      }
      deText = `${explanationIndent}distractorExplanations: {\n` + entries.join('\n') + '\n' + `${explanationIndent}},`;
    }

    if (deText) insertions.push({ afterLine: insertAfterLine, text: deText, id });
    i = blockEnd > i ? blockEnd : i + 1;
  }

  if (insertions.length === 0) return { skipped: false, count: 0 };
  const newLines = [...lines];
  for (let k = insertions.length - 1; k >= 0; k--) {
    newLines.splice(insertions[k].afterLine + 1, 0, insertions[k].text);
  }
  if (!DRY_RUN) fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
  return { skipped: false, count: insertions.length };
}

let total = 0, fc = 0;
for (const file of files) {
  const rel = path.relative(BASE, file);
  const r = processFile(file);
  if (r.skipped) console.log(`SKIP ${rel}: ${r.reason}`);
  else if (r.count === 0) console.log(`DONE ${rel}`);
  else { console.log(`${DRY_RUN ? 'WOULD' : 'ADDED'} ${rel}: ${r.count}`); total += r.count; fc++; }
}
console.log(`\n${DRY_RUN ? '[DRY RUN]' : 'COMPLETE:'} ${total} in ${fc} files`);
