/**
 * Generates distractorExplanations for all remaining unit files.
 * Extracts questions, creates explanations based on question/option/explanation content,
 * and directly inserts them into the files.
 */
const fs = require('fs');

function extractAndInsert(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const insertions = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const typeMatch = trimmed.match(/type:\s*['"](?:multiple-choice|scenario|pick-the-best|true-false)['"]/);
    if (!typeMatch) continue;

    const qTypeM = trimmed.match(/type:\s*['"](multiple-choice|scenario|pick-the-best|true-false)['"]/);
    if (!qTypeM) continue;
    const qType = qTypeM[1];

    let qId = '';
    for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
      const idMatch = lines[j].trim().match(/id:\s*['"]([^'"]+)['"]/);
      if (idMatch) { qId = idMatch[1]; break; }
    }

    let objectStart = i;
    for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
      if (lines[j].trim() === '{') { objectStart = j; break; }
    }

    let depth = 0;
    let objectEnd = i;
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

    if (hasDE || explanationLine < 0) continue;

    const indent = lines[explanationLine].match(/^(\s*)/)[1];
    const expLine = lines[explanationLine];
    const useDoubleQuotes = expLine.includes('explanation: "') || expLine.includes('explanation:"');
    const q = useDoubleQuotes ? '"' : "'";
    const escFn = useDoubleQuotes
      ? (s) => s.replace(/"/g, '\\"')
      : (s) => s.replace(/'/g, "\\'");

    // Generate explanations
    const de = {};
    if (qType === 'true-false') {
      const wrongIdx = correctAnswer ? 1 : 0;
      de[wrongIdx] = generateTFExplanation(question, correctAnswer, explanation);
    } else {
      for (let idx = 0; idx < options.length; idx++) {
        if (idx !== correctIndex) {
          de[idx] = generateMCExplanation(
            question, options[idx], options[correctIndex], explanation, idx, correctIndex, options
          );
        }
      }
    }

    let block = `${indent}distractorExplanations: {\n`;
    const keys = Object.keys(de).map(Number).sort();
    for (const key of keys) {
      block += `${indent}  ${key}: ${q}${escFn(de[key])}${q},\n`;
    }
    block += `${indent}},`;

    insertions.push({ afterLine: explanationLine, text: block, id: qId });
  }

  insertions.sort((a, b) => b.afterLine - a.afterLine);
  for (const ins of insertions) {
    lines.splice(ins.afterLine + 1, 0, ins.text);
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`Inserted ${insertions.length} distractorExplanations into ${filePath}`);
}

function generateTFExplanation(question, correctAnswer, explanation) {
  // For true-false: explain why the wrong answer is wrong
  if (correctAnswer === true) {
    // Wrong answer is "False" - explain why the statement IS true
    return cleanExplanation(explanation) || 'The statement is actually true based on the underlying engineering principle.';
  } else {
    // Wrong answer is "True" - explain why the statement is NOT true
    return cleanExplanation(explanation) || 'The statement is actually false; the underlying assumption is incorrect.';
  }
}

function cleanExplanation(expl) {
  if (!expl) return '';
  // Take first sentence, trim to ~100 chars
  let s = expl.split(/[.!]\s/)[0];
  if (s.length > 120) s = s.substring(0, 117) + '...';
  if (!s.endsWith('.')) s += '.';
  return s;
}

function generateMCExplanation(question, wrongOpt, correctOpt, explanation, wrongIdx, correctIdx, allOptions) {
  if (!wrongOpt) return 'This option is incorrect based on the engineering principles involved.';

  const wo = wrongOpt.toLowerCase();
  const co = correctOpt ? correctOpt.toLowerCase() : '';

  // Check for numerical answers
  const wrongNums = wrongOpt.match(/[\d,.]+/g);
  const correctNums = correctOpt ? correctOpt.match(/[\d,.]+/g) : null;

  if (wrongNums && correctNums && wrongNums.length > 0 && correctNums.length > 0) {
    // Numerical distractor
    return generateNumericalExplanation(wrongOpt, correctOpt, explanation, question);
  }

  // Conceptual distractor
  return generateConceptualExplanation(wrongOpt, correctOpt, explanation, question);
}

function generateNumericalExplanation(wrongOpt, correctOpt, explanation, question) {
  const wo = wrongOpt.trim();
  const co = correctOpt.trim();

  // Try to extract the key wrong value
  const wrongVal = wo.match(/([\d,.]+)/);
  const correctVal = co.match(/([\d,.]+)/);

  if (wrongVal && correctVal) {
    const wv = parseFloat(wrongVal[1].replace(/,/g, ''));
    const cv = parseFloat(correctVal[1].replace(/,/g, ''));

    if (!isNaN(wv) && !isNaN(cv) && cv !== 0) {
      const ratio = wv / cv;
      if (Math.abs(ratio - 2) < 0.1) {
        return `This value is approximately double the correct answer, likely from a formula error or missing a factor of 1/2.`;
      }
      if (Math.abs(ratio - 0.5) < 0.05) {
        return `This value is approximately half the correct answer, likely from omitting a required multiplication factor.`;
      }
      if (Math.abs(ratio - 4) < 0.2) {
        return `This value is approximately four times the correct answer, likely from squaring a term that should not be squared.`;
      }
      if (Math.abs(ratio - 0.25) < 0.05) {
        return `This value is approximately one-quarter the correct answer, likely from an incorrect formula application.`;
      }
    }
  }

  // If the wrong option has an explanation embedded
  if (wo.includes(':')) {
    const afterColon = wo.split(':').slice(1).join(':').trim();
    if (afterColon.length > 10) {
      return `This value results from an incorrect calculation; ${afterColon.substring(0, 80)}.`;
    }
  }

  return `This numerical value does not match the correct calculation using the proper formula and given parameters.`;
}

function generateConceptualExplanation(wrongOpt, correctOpt, explanation, question) {
  const wo = wrongOpt.toLowerCase().trim();

  // Detect common patterns in wrong options
  if (wo.includes('always') || wo.includes('never') || wo.includes('regardless')) {
    return `This statement uses an absolute claim that does not hold under all conditions in engineering practice.`;
  }

  if (wo.includes('cannot') || wo.includes('impossible') || wo.includes('no effect')) {
    return `This incorrectly claims something is impossible or has no effect, when the correct analysis shows otherwise.`;
  }

  if (wo.includes('only') && !wo.includes('only if')) {
    return `This is too restrictive; the correct principle applies more broadly than this option suggests.`;
  }

  if (wo.includes('not') || wo.includes('no ') || wo.includes('zero')) {
    if (explanation) {
      const expl = cleanExplanation(explanation);
      if (expl && expl.length > 20) {
        return expl;
      }
    }
  }

  // If the wrong option contains its own explanation (after colon or semicolon)
  if (wrongOpt.includes(':') || wrongOpt.includes(';')) {
    const sep = wrongOpt.includes(';') ? ';' : ':';
    const parts = wrongOpt.split(sep);
    if (parts.length > 1) {
      const reasoning = parts.slice(1).join(sep).trim();
      if (reasoning.length > 10) {
        // The wrong option gives its own reasoning - we can counter it
        return `The reasoning in this option is flawed; the correct answer follows from proper engineering analysis.`;
      }
    }
  }

  // Use the explanation if available
  if (explanation && explanation.length > 10) {
    return cleanExplanation(explanation);
  }

  return `This option does not correctly apply the relevant engineering principle for this problem.`;
}

// Main
const files = process.argv.slice(2);
if (files.length === 0) {
  console.log('Usage: node scripts/gen-de-all.js <file1> [file2] ...');
  process.exit(1);
}

for (const file of files) {
  extractAndInsert(file);
}
