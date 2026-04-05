const fs = require('fs');
const filePath = process.argv[2];
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split(/\r?\n/);
const questions = [];
let currentQ = null;
let inOptions = false;
let inSpeedQ = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.includes('speedQuestions:')) { inSpeedQ = true; continue; }
  if (inSpeedQ) { if (line === '],') inSpeedQ = false; continue; }
  const idMatch = line.match(/id:\s*["']([^"']+)["']/);
  if (idMatch && !idMatch[1].includes('-C') && !idMatch[1].includes('-SQ')) {
    if (currentQ && currentQ.type && ['true-false','multiple-choice','scenario','pick-the-best'].includes(currentQ.type)) {
      questions.push(currentQ);
    }
    currentQ = { id: idMatch[1], options: [], question: '', explanation: '' };
    inOptions = false;
  }
  if (currentQ) {
    const typeMatch = line.match(/type:\s*["']([^"']+)["']/);
    if (typeMatch) currentQ.type = typeMatch[1];
    const ciMatch = line.match(/correctIndex:\s*(\d+)/);
    if (ciMatch) currentQ.correctIndex = parseInt(ciMatch[1]);
    const caMatch = line.match(/correctAnswer:\s*(true|false)/);
    if (caMatch) currentQ.correctAnswer = caMatch[1] === 'true';
    const qMatch = line.match(/question:\s*["']([^"']+)["']/);
    if (qMatch && !currentQ.question) currentQ.question = qMatch[1];
    const explMatch = line.match(/explanation:\s*["']([^"']+)["']/);
    if (explMatch) currentQ.explanation = explMatch[1];
    if (line.startsWith('options: [')) { inOptions = true; }
    if (inOptions) {
      const optMatch = line.match(/^["'](.+)["'],?\s*$/);
      if (optMatch) currentQ.options.push(optMatch[1]);
    }
    if (inOptions && line === '],') inOptions = false;
  }
}
if (currentQ && currentQ.type && ['true-false','multiple-choice','scenario','pick-the-best'].includes(currentQ.type)) {
  questions.push(currentQ);
}

const result = {};
for (const q of questions) {
  if (q.type === 'true-false') {
    if (q.correctAnswer) {
      result[q.id] = { 1: 'This statement is correct because ' + (q.explanation.charAt(0).toLowerCase() + q.explanation.slice(1).replace(/\.$/, '')) + '.' };
    } else {
      result[q.id] = { 0: q.explanation.replace(/\.$/, '') + '.' };
    }
  } else {
    const distractors = {};
    for (let i = 0; i < q.options.length; i++) {
      if (i === q.correctIndex) continue;
      const opt = q.options[i].replace(/\.$/, '');
      const expl = q.explanation.replace(/\.$/, '');
      distractors[i] = opt.charAt(0).toUpperCase() + opt.slice(1) + ' is incorrect; ' + expl.charAt(0).toLowerCase() + expl.slice(1) + '.';
    }
    result[q.id] = distractors;
  }
}
console.log(JSON.stringify(result, null, 2));
