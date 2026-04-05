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
    currentQ = { id: idMatch[1], options: [], question: '' };
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

for (const q of questions) {
  if (q.type === 'true-false') {
    const wrongIdx = q.correctAnswer ? 1 : 0;
    console.log(q.id + '|TF|ca=' + q.correctAnswer + '|w=' + wrongIdx + '|' + q.question);
  } else {
    const wrong = [];
    for (let i = 0; i < q.options.length; i++) if (i !== q.correctIndex) wrong.push(i);
    console.log(q.id + '|' + q.type + '|ci=' + q.correctIndex + '|w=' + wrong.join(',') + '|' + q.question);
    for (let i = 0; i < q.options.length; i++) {
      console.log('  [' + i + ']' + (i === q.correctIndex ? '*' : ' ') + q.options[i]);
    }
  }
}
console.log('Total: ' + questions.length);
