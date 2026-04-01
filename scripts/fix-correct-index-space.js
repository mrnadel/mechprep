/**
 * fix-correct-index-space.js
 *
 * Randomizes the position of correct answers in multiple-choice and
 * speed-round questions across space-astronomy unit files.
 *
 * Only targets questions where correctIndex is 0. Uses a seeded PRNG
 * for reproducible results.
 *
 * Usage: node scripts/fix-correct-index-space.js [--dry-run] [--unit N]
 */

const fs = require('fs');
const path = require('path');

// ── Seeded PRNG (mulberry32) ──────────────────────────────────
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(77); // different seed from main course fix

function randomIndex() {
  return Math.floor(rng() * 4);
}

// ── CLI args ──────────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const unitArg = args.find((a) => a.startsWith('--unit'));
const unitFilter = unitArg ? parseInt(args[args.indexOf(unitArg) + 1], 10) : null;

// ── Find unit files ───────────────────────────────────────────
const unitsDir = path.join(__dirname, '..', 'src', 'data', 'course', 'professions', 'space-astronomy', 'units');

const unitFiles = fs
  .readdirSync(unitsDir)
  .filter((f) => /^unit-\d+.*\.ts$/.test(f))
  .filter((f) => {
    if (unitFilter !== null) {
      const m = f.match(/^unit-(\d+)/);
      return m && parseInt(m[1], 10) === unitFilter;
    }
    return true;
  })
  .sort();

console.log(`Processing ${unitFiles.length} unit file(s)${dryRun ? ' (DRY RUN)' : ''}...\n`);

// ── String-aware bracket matcher ──────────────────────────────
function findClosingBracket(text, openPos) {
  let depth = 0;
  let inStr = false;
  let strCh = '';
  let esc = false;

  for (let i = openPos; i < text.length; i++) {
    const c = text[i];
    if (esc) { esc = false; continue; }
    if (c === '\\' && inStr) { esc = true; continue; }
    if (inStr) { if (c === strCh) inStr = false; continue; }
    if (c === "'" || c === '"' || c === '`') { inStr = true; strCh = c; continue; }
    if (c === '[') depth++;
    if (c === ']') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

// ── Find the start and end of each top-level string in an options array ──
function findStringBoundaries(text) {
  const boundaries = [];
  let inStr = false;
  let strCh = '';
  let esc = false;
  let strStart = -1;
  let depth = 0;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (esc) { esc = false; continue; }
    if (c === '\\' && inStr) { esc = true; continue; }

    if (inStr) {
      if (c === strCh) {
        if (depth === 0) {
          boundaries.push({ start: strStart, end: i + 1 });
        }
        inStr = false;
      }
      continue;
    }

    if (c === '[' || c === '{' || c === '(') { depth++; continue; }
    if (c === ']' || c === '}' || c === ')') { depth--; continue; }

    if ((c === "'" || c === '"') && depth === 0) {
      inStr = true;
      strCh = c;
      strStart = i;
    }
  }

  return boundaries;
}

// ── Main processing ───────────────────────────────────────────
function processFile(content) {
  const edits = [];

  const ciRegex = /correctIndex:\s*0(?=\s*[,}\n\r])/g;
  let ciMatch;

  while ((ciMatch = ciRegex.exec(content)) !== null) {
    const ciStart = ciMatch.index;

    const searchBack = content.substring(Math.max(0, ciStart - 8000), ciStart);
    const optionsMatches = [...searchBack.matchAll(/options:\s*\[/g)];
    if (optionsMatches.length === 0) continue;

    const lastOptionsMatch = optionsMatches[optionsMatches.length - 1];
    const optionsKeywordPos = (ciStart - searchBack.length) + lastOptionsMatch.index;
    const bracketOpenPos = content.indexOf('[', optionsKeywordPos);
    if (bracketOpenPos === -1 || bracketOpenPos >= ciStart) continue;

    const bracketClosePos = findClosingBracket(content, bracketOpenPos);
    if (bracketClosePos === -1 || bracketClosePos >= ciStart) continue;

    // Any question with options + correctIndex needs fixing (multiple-choice, scenario, speed-round)
    // No type filter needed: if it has an options array and correctIndex, it qualifies.

    const arrayInner = content.substring(bracketOpenPos + 1, bracketClosePos);
    const stringBounds = findStringBoundaries(arrayInner);

    if (stringBounds.length < 2) continue;

    let newIdx = randomIndex();
    if (newIdx === 0) continue;
    if (newIdx >= stringBounds.length) newIdx = stringBounds.length - 1;

    const absOff = bracketOpenPos + 1;
    const s0Start = absOff + stringBounds[0].start;
    const s0End = absOff + stringBounds[0].end;
    const sNStart = absOff + stringBounds[newIdx].start;
    const sNEnd = absOff + stringBounds[newIdx].end;

    const s0Text = content.substring(s0Start, s0End);
    const sNText = content.substring(sNStart, sNEnd);

    edits.push(
      { pos: s0Start, endPos: s0End, newText: sNText },
      { pos: sNStart, endPos: sNEnd, newText: s0Text },
      { pos: ciStart, endPos: ciStart + ciMatch[0].length, newText: `correctIndex: ${newIdx}` },
    );
  }

  edits.sort((a, b) => b.pos - a.pos);

  let modified = content;
  for (const edit of edits) {
    modified = modified.substring(0, edit.pos) + edit.newText + modified.substring(edit.endPos);
  }

  return { content: modified, fixCount: edits.length / 3 };
}

// ── Main ──────────────────────────────────────────────────────
let grandFixCount = 0;

for (const file of unitFiles) {
  const filePath = path.join(unitsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  const beforeCount = (content.match(/correctIndex:\s*0(?=\s*[,}\n\r])/g) || []).length;

  const result = processFile(content);
  content = result.content;

  const changed = content !== originalContent;

  console.log(
    `${file}: ${result.fixCount} of ${beforeCount} correctIndex:0 randomized` +
      (changed ? '' : ' (no changes)')
  );

  grandFixCount += result.fixCount;

  if (changed && !dryRun) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

console.log(`\nTotal: ${grandFixCount} questions randomized`);

// ── Verify distribution ───────────────────────────────────────
console.log('\n-- Verification: correctIndex distribution after fix --');
const dist = { 0: 0, 1: 0, 2: 0, 3: 0 };

for (const file of unitFiles) {
  const filePath = path.join(unitsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = content.matchAll(/correctIndex:\s*(\d)/g);
  for (const m of matches) {
    const idx = parseInt(m[1], 10);
    if (idx in dist) dist[idx]++;
  }
}

const total = Object.values(dist).reduce((a, b) => a + b, 0);
for (const [idx, count] of Object.entries(dist)) {
  console.log(`  correctIndex ${idx}: ${count} (${((count / total) * 100).toFixed(1)}%)`);
}
console.log(`  Total: ${total}`);

// Per-file breakdown
console.log('\n-- Per-file breakdown --');
for (const file of unitFiles) {
  const filePath = path.join(unitsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileDist = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const matches = content.matchAll(/correctIndex:\s*(\d)/g);
  for (const m of matches) {
    const idx = parseInt(m[1], 10);
    if (idx in fileDist) fileDist[idx]++;
  }
  const fileTotal = Object.values(fileDist).reduce((a, b) => a + b, 0);
  console.log(
    `  ${file}: ${Object.entries(fileDist).map(([k, v]) => `${k}:${v}`).join(' ')} (total: ${fileTotal})`
  );
}
