/**
 * Restructure unit-10-interview.ts v2:
 * Preserves MORE original questions per sub-lesson
 * Target: 11 items per sub-lesson (2 teaching + 2 easy + 1 variety + 6 original)
 */

import * as fs from 'fs';
import * as path from 'path';

// First restore the original file
const origCommit = '822c93f';
const { execSync } = require('child_process');
const projectDir = path.join(__dirname, '..');
execSync(`git show ${origCommit}:src/data/course/units/unit-10-interview.ts > src/data/course/units/unit-10-interview.ts`, { cwd: projectDir });

const filePath = path.join(projectDir, 'src', 'data', 'course', 'units', 'unit-10-interview.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// Fix em dashes first
fileContent = fileContent.replace(/\u2014/g, ',');

interface ParsedQuestion {
  raw: string;
  id: string;
  type: string;
}

function extractQuestions(content: string, lessonId: string): ParsedQuestion[] {
  // Find the lesson's questions array
  const lessonPattern = `id: '${lessonId}',`;
  const lessonIdx = content.indexOf(lessonPattern);
  if (lessonIdx === -1) return [];

  const questionsStart = content.indexOf('questions: [', lessonIdx) + 'questions: ['.length;
  let depth = 1;
  let idx = questionsStart;
  while (depth > 0 && idx < content.length) {
    if (content[idx] === '[') depth++;
    if (content[idx] === ']') depth--;
    idx++;
  }
  const questionsEnd = idx - 1;
  const questionsContent = content.substring(questionsStart, questionsEnd);

  const questions: ParsedQuestion[] = [];
  let qDepth = 0;
  let qStart = -1;
  for (let j = 0; j < questionsContent.length; j++) {
    const ch = questionsContent[j];
    if (ch === '{' && qDepth === 0) qStart = j;
    if (ch === '{') qDepth++;
    if (ch === '}') {
      qDepth--;
      if (qDepth === 0 && qStart >= 0) {
        const raw = questionsContent.substring(qStart, j + 1);
        const idMatch = raw.match(/id:\s*'([^']+)'/);
        const typeMatch = raw.match(/type:\s*'([^']+)'/);
        if (idMatch && typeMatch) {
          questions.push({ raw: raw.trim(), id: idMatch[1], type: typeMatch[1] });
        }
        qStart = -1;
      }
    }
  }
  return questions;
}

// Extract all original lessons
const lessonIds = ['u10-L1', 'u10-L2', 'u10-L3', 'u10-L4', 'u10-L5', 'u10-L6'];
const originalLessons: Record<string, { questions: ParsedQuestion[] }> = {};

for (const lid of lessonIds) {
  originalLessons[lid] = { questions: extractQuestions(fileContent, lid) };
  console.log(`${lid}: ${originalLessons[lid].questions.length} items`);
}

// Define sub-lesson metadata
const subLessonMeta: Record<string, { title: string; desc: string }> = {
  'u10-L1':  { title: 'Fermi Problems Basics', desc: 'What Fermi problems are, how to decompose big unknowns, and your first estimation attempts.' },
  'u10-L1b': { title: 'Anchor Values & Sanity Checks', desc: 'Key reference numbers every engineer should know, plus how to sanity-check your estimates.' },
  'u10-L1c': { title: 'Scaling Laws & Advanced Estimation', desc: 'Scaling laws, combined estimation problems, and real interview-level Fermi challenges.' },
  'u10-L2':  { title: 'Failure Modes & Fracture Surfaces', desc: 'The three main failure modes, reading fracture surfaces, and identifying fatigue vs overload.' },
  'u10-L2b': { title: 'Root Cause Analysis Tools', desc: 'Fishbone diagrams, 5 Whys, FMEA, and systematic problem-solving approaches.' },
  'u10-L2c': { title: 'Environment-Assisted Failures', desc: 'Corrosion types, hydrogen embrittlement, stress corrosion cracking, and environment-driven failures.' },
  'u10-L3':  { title: 'Material Selection Basics', desc: 'Ashby charts, material indices, and how to pick the right material for the loading type.' },
  'u10-L3b': { title: 'DFM, DFA & Cost Reduction', desc: 'Design for Manufacturing, Design for Assembly, and systematic cost reduction approaches.' },
  'u10-L3c': { title: 'Decision Matrices & Optimization', desc: 'Pugh matrices, weighted decision tables, and multi-objective optimization in design.' },
  'u10-L4':  { title: 'FEA Mesh & Elements', desc: 'Element types, mesh quality metrics, and how mesh density affects accuracy.' },
  'u10-L4b': { title: 'Boundary Conditions & Convergence', desc: 'Applying boundary conditions correctly, checking convergence, and common modeling mistakes.' },
  'u10-L4c': { title: 'Interpreting FEA Results', desc: 'Reading stress plots, handling singularities, and validating FEA results against hand calcs.' },
  'u10-L5':  { title: 'Engineering Case Studies', desc: 'Real-world engineering failures, troubleshooting frameworks, and systematic investigation.' },
  'u10-L5b': { title: 'Troubleshooting Scenarios', desc: 'Debugging field failures, interpreting test data, and making recommendations under uncertainty.' },
  'u10-L5c': { title: 'Cross-Disciplinary Design', desc: 'Cross-disciplinary thinking, systems engineering, and holistic design problem-solving.' },
  'u10-L6':  { title: 'Standards & Quality Systems', desc: 'ISO standards, ASME codes, and quality management systems every engineer should know.' },
  'u10-L6b': { title: 'Risk Assessment & Change Control', desc: 'FMEA risk assessment, engineering change orders, and configuration management.' },
  'u10-L6c': { title: 'Project Management for Engineers', desc: 'Project scheduling, resource planning, and professional communication for engineers.' },
};

// New content definitions (teaching cards, easy questions, variety questions)
// Each sub-lesson gets: 2 teaching + 2 easy + 1 variety + 6 original = 11 items

interface NewContent {
  t1: { id: string; question: string; explanation: string; hint: string };
  e1: { id: string; type: 'true-false' | 'multiple-choice'; question: string; correctAnswer?: boolean; options?: string[]; correctIndex?: number; explanation: string; hint: string };
  t2: { id: string; question: string; explanation: string; hint: string };
  e2: { id: string; type: 'true-false' | 'multiple-choice'; question: string; correctAnswer?: boolean; options?: string[]; correctIndex?: number; explanation: string; hint: string };
  variety: { id: string; type: string; raw: string };
}

function tc(id: string, q: string, e: string, h: string) {
  return `        {\n          id: '${id}',\n          type: 'teaching',\n          question: '${q.replace(/'/g, "\\'")}',\n          explanation: '${e.replace(/'/g, "\\'")}',\n          hint: '${h.replace(/'/g, "\\'")}',\n        }`;
}

function tf(id: string, q: string, a: boolean, e: string, h: string) {
  return `        {\n          id: '${id}',\n          type: 'true-false',\n          question: '${q.replace(/'/g, "\\'")}',\n          correctAnswer: ${a},\n          explanation: '${e.replace(/'/g, "\\'")}',\n          hint: '${h.replace(/'/g, "\\'")}',\n        }`;
}

function mc(id: string, q: string, opts: string[], ci: number, e: string, h: string) {
  const o = opts.map(x => `            '${x.replace(/'/g, "\\'")}'`).join(',\n');
  return `        {\n          id: '${id}',\n          type: 'multiple-choice',\n          question: '${q.replace(/'/g, "\\'")}',\n          options: [\n${o}\n          ],\n          correctIndex: ${ci},\n          explanation: '${e.replace(/'/g, "\\'")}',\n          hint: '${h.replace(/'/g, "\\'")}',\n        }`;
}

function mp(id: string, q: string, opts: string[], tgts: string[], cm: number[], e: string, h: string) {
  const o = opts.map(x => `            '${x.replace(/'/g, "\\'")}'`).join(',\n');
  const t = tgts.map(x => `            '${x.replace(/'/g, "\\'")}'`).join(',\n');
  return `        {\n          id: '${id}',\n          type: 'match-pairs',\n          question: '${q.replace(/'/g, "\\'")}',\n          options: [\n${o}\n          ],\n          matchTargets: [\n${t}\n          ],\n          correctMatches: [${cm.join(', ')}],\n          explanation: '${e.replace(/'/g, "\\'")}',\n          hint: '${h.replace(/'/g, "\\'")}',\n        }`;
}

function sb(id: string, q: string, opts: string[], bkts: string[], cb: number[], e: string, h: string) {
  const o = opts.map(x => `            '${x.replace(/'/g, "\\'")}'`).join(',\n');
  const b = bkts.map(x => `            '${x.replace(/'/g, "\\'")}'`).join(',\n');
  return `        {\n          id: '${id}',\n          type: 'sort-buckets',\n          question: '${q.replace(/'/g, "\\'")}',\n          options: [\n${o}\n          ],\n          buckets: [\n${b}\n          ],\n          correctBuckets: [${cb.join(', ')}],\n          explanation: '${e.replace(/'/g, "\\'")}',\n          hint: '${h.replace(/'/g, "\\'")}',\n        }`;
}

function os(id: string, q: string, steps: string[], co: number[], e: string, h: string) {
  const s = steps.map(x => `            '${x.replace(/'/g, "\\'")}'`).join(',\n');
  return `        {\n          id: '${id}',\n          type: 'order-steps',\n          question: '${q.replace(/'/g, "\\'")}',\n          steps: [\n${s}\n          ],\n          correctOrder: [${co.join(', ')}],\n          explanation: '${e.replace(/'/g, "\\'")}',\n          hint: '${h.replace(/'/g, "\\'")}',\n        }`;
}

// Define new content for each sub-lesson
const newContent: Record<string, string[]> = {
  'u10-L1': [
    tc('u10-L1-NEW-T1', 'Breaking Down Big Questions', 'Fermi problems test how you think, not what you memorize. Break a huge question into small pieces, estimate each piece, and multiply.', 'Try this now: estimate how many piano tuners are in your city.'),
    tf('u10-L1-NEW-E1', 'In a Fermi estimation, getting within an order of magnitude (factor of 10) of the real answer is considered a good result.', true, 'Fermi estimates aim for the right power of 10, not the exact number.', 'These estimates prioritize order of magnitude, not precision.'),
    'ORIG:0', 'ORIG:1', // first 2 originals
    mp('u10-L1-NEW-MP1', 'Match each estimation technique to its description:', ['Fermi estimation', 'Dimensional analysis', 'Scaling law', 'Sanity check'], ['Break unknowns into estimable pieces', 'Use units to derive relationships', 'Predict how changes scale with size', 'Compare result to known values'], [0,1,2,3], 'Each technique serves a different purpose in engineering estimation.', 'Think about what each method does.'),
    tc('u10-L1-NEW-T2', 'Decomposition Is the Key Skill', "Interviewers don't expect exact answers. They want to see you decompose a problem, state assumptions clearly, and arrive at a reasonable number.", 'Try this now: estimate how many golf balls fit in a school bus.'),
    mc('u10-L1-NEW-E2', 'What does "order of magnitude" mean?', ['A factor of 10', 'A factor of 2', 'An exact answer', 'A factor of 100'], 0, "An order of magnitude is a factor of 10. If the real answer is 5,000, being within an order of magnitude means 500 to 50,000.", 'Think about powers of 10.'),
    'ORIG:2', 'ORIG:3', 'ORIG:4', 'ORIG:5',
  ],
  'u10-L1b': [
    tc('u10-L1b-NEW-T1', 'Memorize Key Reference Values', "You can't estimate without reference points. Steel density 7,850 kg/m3, steel yield 250 MPa, E for steel 200 GPa, water density 1,000 kg/m3.", 'Try this now: estimate the weight of a 1m steel cube.'),
    tf('u10-L1b-NEW-E1', 'The density of water is approximately 1,000 kg/m3.', true, "Water density at standard conditions is 1,000 kg/m3. This is one of the most important anchor values.", 'This is a fundamental reference value.'),
    'ORIG:0', 'ORIG:1',
    sb('u10-L1b-NEW-SB1', 'Sort these properties by typical value: high or low?', ['Steel E-modulus (200 GPa)', 'Copper conductivity (400 W/mK)', 'Rubber E-modulus (0.01 GPa)', 'Foam density (30 kg/m3)', 'Steel density (7,850 kg/m3)', 'Air density (1.2 kg/m3)'], ['High value', 'Low value'], [0,0,1,1,0,1], 'Knowing which properties are high or low helps you sanity-check estimates.', 'Compare each to typical engineering materials.'),
    tc('u10-L1b-NEW-T2', 'Always Sanity-Check Your Answer', "After calculating, compare your result to something you know. If your estimate says a car weighs 100 kg, something went wrong.", 'Try this now: check if a bathtub holds about 150 liters.'),
    mc('u10-L1b-NEW-E2', 'What is the approximate yield strength of common structural steel?', ['250 MPa', '25 MPa', '2,500 MPa', '25,000 MPa'], 0, 'A36/S275 structural steel yields at about 250 MPa (36 ksi). This is a critical anchor value.', 'Think about common steel properties.'),
    'ORIG:2', 'ORIG:3', 'ORIG:4', 'ORIG:5',
  ],
  'u10-L1c': [
    tc('u10-L1c-NEW-T1', 'Power Laws Speed Up Estimation', "Many quantities follow simple power laws. Knowing these exponents saves you from recalculating from scratch.", 'Try this now: if you double beam depth, how does deflection change?'),
    tf('u10-L1c-NEW-E1', 'Pump power scales with the cube of speed: doubling RPM increases power by 8x.', true, 'The pump affinity laws: Q scales with N, H with N^2, and P with N^3.', 'Think about the pump affinity laws.'),
    'ORIG:0', 'ORIG:1',
    os('u10-L1c-NEW-OS1', 'Put these Fermi estimation steps in order:', ['Define the quantity you need to estimate', 'Break it into smaller estimable pieces', 'Estimate each piece with assumptions', 'Multiply the pieces together', 'Sanity-check against a known value'], [0,1,2,3,4], 'A structured approach: define, decompose, estimate, combine, then check.', 'Start with the big picture, end with a reality check.'),
    tc('u10-L1c-NEW-T2', 'Combining Estimates for Complex Problems', 'Real interview problems require chaining estimates. First estimate the volume, then use density for mass, then use material strength for load capacity.', 'Try this now: estimate the weight of the Eiffel Tower step by step.'),
    mc('u10-L1c-NEW-E2', 'If beam deflection scales as L^3, what happens when you triple the span?', ['Deflection increases 27x', 'Deflection increases 9x', 'Deflection increases 3x', 'Deflection stays the same'], 0, 'L^3 scaling: 3^3 = 27. Tripling the span increases deflection 27 times.', 'Calculate 3 raised to the power of 3.'),
    'ORIG:2', 'ORIG:3', 'ORIG:4', 'ORIG:5',
  ],
};

// Generate similar patterns for L2-L6 (abbreviated for brevity, same structure)
function generateNewContentForLesson(base: string) {
  // These are the same patterns as defined in the original script's additions object
  // but now structured as raw strings to inject
  const configs: Record<string, {t1: [string,string,string], e1: any, t2: [string,string,string], e2: any, variety: string}> = {
    [`${base}`]: {
      t1: ['Reading Fracture Surfaces', "A fracture surface is like a crime scene. Beach marks mean fatigue. Chevrons mean brittle overload. Cup-and-cone means ductile overload.", 'Try this now: look at a broken item and identify the fracture origin.'],
      e1: {tf: true, q: 'Beach marks on a fracture surface indicate that the part failed by fatigue, not sudden overload.', e: 'Beach marks are concentric arcs radiating from the crack origin, a hallmark of fatigue.', h: 'Beach marks show progressive crack growth over many cycles.'},
      t2: ['Start With the Three Big Failure Modes', 'Before diving into exotic mechanisms, check the big three first: fatigue (cyclic loading), overload (single event), and corrosion (environment).', 'Try this now: think of a product recall and identify which category caused it.'],
      e2: {mc: true, q: 'Which failure mode is caused by repeated loading and unloading over many cycles?', opts: ['Fatigue', 'Overload', 'Creep', 'Erosion'], ci: 0, e: 'Fatigue is caused by cyclic loading. Cracks grow slowly until final fracture.', h: "Think about what repeated loading means."},
      variety: mp(`${base}-NEW-MP1`, 'Match each fracture feature to its failure mode:', ['Beach marks', 'Chevron pattern', 'Cup-and-cone', 'Intergranular voids'], ['Fatigue', 'Brittle overload', 'Ductile overload', 'Creep'], [0,1,2,3], 'Each failure mode leaves a distinctive signature on the fracture surface.', 'Each feature is unique to one failure mode.'),
    }
  };
  // This is getting complex, let's simplify by using the same approach for all
}

// Actually, let me take a much simpler approach.
// For each sub-lesson, I'll build:
// [new_t1, new_e1, orig[0], orig[1], new_variety, new_t2, new_e2, orig[2], orig[3], orig[4], orig[5]]
// = 11 items

// I already have all the new content defined. Let me just build the file directly.

// For lessons not explicitly defined in newContent, use L2-L6 equivalents
// Let me complete all 18 sub-lessons

// Instead of defining all content inline in this script, let me use the already-defined
// content from the first script but fix the sub-lesson sizes.
// The key issue was that the original script used `Math.ceil(qs.length / 3)` to split
// into groups, but then only took the first 6 non-teaching questions.
// With 33 items (30 non-teaching), each third has 10 non-teaching items.
// I should take 6 from each third (not just from the first).

// Let me rebuild with proper splitting: take 6 original non-teaching per third
const allSubLessons: { id: string; originals: ParsedQuestion[] }[] = [];

for (const lid of lessonIds) {
  const qs = originalLessons[lid].questions;
  const nonTeaching = qs.filter(q => q.type !== 'teaching');
  // Split into 3 groups of ~10
  const groupSize = Math.ceil(nonTeaching.length / 3);
  const groups = [
    nonTeaching.slice(0, groupSize),
    nonTeaching.slice(groupSize, groupSize * 2),
    nonTeaching.slice(groupSize * 2)
  ];

  const suffixes = ['', 'b', 'c'];
  for (let g = 0; g < 3; g++) {
    const subId = `${lid}${suffixes[g]}`;
    // Take 6 from each group
    allSubLessons.push({ id: subId, originals: groups[g].slice(0, 6) });
  }
}

console.log('\nOriginals per sub-lesson:');
for (const sl of allSubLessons) {
  console.log(`  ${sl.id}: ${sl.originals.length} originals`);
}

// Now build the complete file
// New content per sub-lesson (I'll define all 18 sets)
const newItems: Record<string, string[]> = {};

// Helper to get new content for a sub-lesson
function buildNewItems(subId: string, t1Args: [string,string,string,string], e1Args: any, varietyStr: string, t2Args: [string,string,string,string], e2Args: any): string[] {
  const items: string[] = [];
  items.push(tc(t1Args[0], t1Args[1], t1Args[2], t1Args[3]));
  if (e1Args.tf !== undefined) {
    items.push(tf(e1Args.id, e1Args.q, e1Args.a, e1Args.e, e1Args.h));
  } else {
    items.push(mc(e1Args.id, e1Args.q, e1Args.opts, e1Args.ci, e1Args.e, e1Args.h));
  }
  items.push(varietyStr);
  items.push(tc(t2Args[0], t2Args[1], t2Args[2], t2Args[3]));
  if (e2Args.tf !== undefined) {
    items.push(tf(e2Args.id, e2Args.q, e2Args.a, e2Args.e, e2Args.h));
  } else {
    items.push(mc(e2Args.id, e2Args.q, e2Args.opts, e2Args.ci, e2Args.e, e2Args.h));
  }
  return items;
}

// Build all new content
// L1a
newItems['u10-L1'] = buildNewItems('u10-L1',
  ['u10-L1-NEW-T1', 'Breaking Down Big Questions', "Fermi problems test how you think, not what you memorize. Break a huge question into small pieces, estimate each piece, and multiply.", 'Try this now: estimate how many piano tuners are in your city.'],
  {id: 'u10-L1-NEW-E1', tf: true, q: 'In a Fermi estimation, getting within an order of magnitude (factor of 10) of the real answer is considered a good result.', a: true, e: "Fermi estimates aim for the right power of 10, not the exact number.", h: 'These estimates prioritize order of magnitude, not precision.'},
  mp('u10-L1-NEW-MP1', 'Match each estimation technique to its description:', ['Fermi estimation', 'Dimensional analysis', 'Scaling law', 'Sanity check'], ['Break unknowns into estimable pieces', 'Use units to derive relationships', 'Predict how changes scale with size', 'Compare result to known values'], [0,1,2,3], 'Each technique serves a different purpose in engineering estimation.', 'Think about what each method does.'),
  ['u10-L1-NEW-T2', 'Decomposition Is the Key Skill', "Interviewers don't expect exact answers. They want to see you decompose a problem, state assumptions clearly, and arrive at a reasonable number.", 'Try this now: estimate how many golf balls fit in a school bus.'],
  {id: 'u10-L1-NEW-E2', q: 'What does "order of magnitude" mean?', opts: ['A factor of 10', 'A factor of 2', 'An exact answer', 'A factor of 100'], ci: 0, e: "An order of magnitude is a factor of 10.", h: 'Think about powers of 10.'}
);

newItems['u10-L1b'] = buildNewItems('u10-L1b',
  ['u10-L1b-NEW-T1', 'Memorize Key Reference Values', "You can't estimate without reference points. Steel density 7,850 kg/m3, steel yield 250 MPa, E for steel 200 GPa, water density 1,000 kg/m3.", 'Try this now: estimate the weight of a 1m steel cube.'],
  {id: 'u10-L1b-NEW-E1', tf: true, q: 'The density of water is approximately 1,000 kg/m3.', a: true, e: "Water density at standard conditions is 1,000 kg/m3.", h: 'This is a fundamental reference value.'},
  sb('u10-L1b-NEW-SB1', 'Sort these properties by typical value: high or low?', ['Steel E-modulus (200 GPa)', 'Copper conductivity (400 W/mK)', 'Rubber E-modulus (0.01 GPa)', 'Foam density (30 kg/m3)', 'Steel density (7,850 kg/m3)', 'Air density (1.2 kg/m3)'], ['High value', 'Low value'], [0,0,1,1,0,1], 'Knowing which properties are high or low helps you sanity-check estimates.', 'Compare each to typical engineering materials.'),
  ['u10-L1b-NEW-T2', 'Always Sanity-Check Your Answer', "After calculating, compare your result to something you know. If your estimate says a car weighs 100 kg, something went wrong.", 'Try this now: check if a bathtub holds about 150 liters.'],
  {id: 'u10-L1b-NEW-E2', q: 'What is the approximate yield strength of common structural steel?', opts: ['250 MPa', '25 MPa', '2,500 MPa', '25,000 MPa'], ci: 0, e: 'A36/S275 structural steel yields at about 250 MPa (36 ksi).', h: 'Think about common steel properties.'}
);

newItems['u10-L1c'] = buildNewItems('u10-L1c',
  ['u10-L1c-NEW-T1', 'Power Laws Speed Up Estimation', "Many quantities follow simple power laws. Knowing these exponents saves you from recalculating from scratch.", 'Try this now: if you double beam depth, how does deflection change?'],
  {id: 'u10-L1c-NEW-E1', tf: true, q: 'Pump power scales with the cube of speed: doubling RPM increases power by 8x.', a: true, e: 'The pump affinity laws: Q scales with N, H with N^2, and P with N^3.', h: 'Think about the pump affinity laws.'},
  os('u10-L1c-NEW-OS1', 'Put these Fermi estimation steps in order:', ['Define the quantity you need to estimate', 'Break it into smaller estimable pieces', 'Estimate each piece with assumptions', 'Multiply the pieces together', 'Sanity-check against a known value'], [0,1,2,3,4], 'A structured approach: define, decompose, estimate, combine, then check.', 'Start with the big picture, end with a reality check.'),
  ['u10-L1c-NEW-T2', 'Combining Estimates for Complex Problems', 'Real interview problems require chaining estimates. First estimate the volume, then use density for mass, then material strength for load capacity.', 'Try this now: estimate the weight of the Eiffel Tower step by step.'],
  {id: 'u10-L1c-NEW-E2', q: 'If beam deflection scales as L^3, what happens when you triple the span?', opts: ['Deflection increases 27x', 'Deflection increases 9x', 'Deflection increases 3x', 'Deflection stays the same'], ci: 0, e: 'L^3 scaling: 3^3 = 27. Tripling the span increases deflection 27 times.', h: 'Calculate 3 raised to the power of 3.'}
);

// L2 sub-lessons
newItems['u10-L2'] = buildNewItems('u10-L2',
  ['u10-L2-NEW-T1', 'Reading Fracture Surfaces', "A fracture surface is like a crime scene. Beach marks mean fatigue. Chevrons mean brittle overload. Cup-and-cone means ductile overload.", 'Try this now: look at a broken item and identify the fracture origin.'],
  {id: 'u10-L2-NEW-E1', tf: true, q: 'Beach marks on a fracture surface indicate that the part failed by fatigue, not sudden overload.', a: true, e: 'Beach marks are concentric arcs radiating from the crack origin, a hallmark of fatigue.', h: 'Beach marks show progressive crack growth over many cycles.'},
  mp('u10-L2-NEW-MP1', 'Match each fracture feature to its failure mode:', ['Beach marks', 'Chevron pattern', 'Cup-and-cone', 'Intergranular voids'], ['Fatigue', 'Brittle overload', 'Ductile overload', 'Creep'], [0,1,2,3], 'Each failure mode leaves a distinctive signature on the fracture surface.', 'Each feature is unique to one failure mode.'),
  ['u10-L2-NEW-T2', 'Start With the Three Big Failure Modes', "Before diving into exotic mechanisms, check the big three first: fatigue, overload, and corrosion. Most failures fall into one of these.", 'Try this now: think of a product recall and identify which category caused it.'],
  {id: 'u10-L2-NEW-E2', q: 'Which failure mode is caused by repeated loading and unloading over many cycles?', opts: ['Fatigue', 'Overload', 'Creep', 'Erosion'], ci: 0, e: 'Fatigue is caused by cyclic loading. Cracks grow slowly until final fracture.', h: 'Think about what repeated loading means.'}
);

newItems['u10-L2b'] = buildNewItems('u10-L2b',
  ['u10-L2b-NEW-T1', 'Systematic Problem Solving', "Good failure analysis is systematic, not guesswork. Use fishbone diagrams, 5 Whys, and FMEA to find the root cause.", 'Try this now: pick a common problem and ask why 5 times.'],
  {id: 'u10-L2b-NEW-E1', tf: true, q: "The 5 Whys technique involves asking why repeatedly to dig past symptoms and find the root cause.", a: true, e: 'Developed at Toyota, the 5 Whys peels back layers of symptoms until you reach the true root cause.', h: 'Each why digs one layer deeper.'},
  os('u10-L2b-NEW-OS1', 'Put these 8D problem-solving steps in order:', ['Form a cross-functional team', 'Define the problem clearly', 'Implement interim containment', 'Identify the root cause', 'Implement permanent corrective action'], [0,1,2,3,4], 'The 8D process is sequential: team, problem, containment, root cause, then permanent fix.', 'You need to contain the problem before you can fix it permanently.'),
  ['u10-L2b-NEW-T2', 'FMEA Prioritizes Risks', "FMEA rates each failure mode by Severity, Occurrence, and Detection. Multiply them together to get a Risk Priority Number. Fix the highest RPNs first.", 'Try this now: rate a common product failure by severity, occurrence, and detection.'],
  {id: 'u10-L2b-NEW-E2', q: 'In a fishbone diagram, what do the "bones" represent?', opts: ['Potential causes grouped by category', 'Steps in the manufacturing process', 'Different product versions', 'Customer complaints'], ci: 0, e: 'Fishbone diagrams organize potential causes into categories like Man, Machine, Method, Material.', h: 'The diagram looks like a fish skeleton with cause categories.'}
);

newItems['u10-L2c'] = buildNewItems('u10-L2c',
  ['u10-L2c-NEW-T1', 'Corrosion Is More Than Rust', "Corrosion comes in many forms: pitting, crevice, galvanic, stress corrosion cracking, and erosion-corrosion. Each has different causes.", 'Try this now: check if any metal items around you show signs of corrosion.'],
  {id: 'u10-L2c-NEW-E1', tf: true, q: "Galvanic corrosion requires two dissimilar metals and an electrolyte to occur.", a: true, e: "Without an electrolyte to carry ions, galvanic corrosion can't happen even with dissimilar metals touching.", h: 'Think about the three requirements for galvanic corrosion.'},
  sb('u10-L2c-NEW-SB1', 'Sort these failure mechanisms by their primary driver:', ['Stress corrosion cracking', 'Fatigue', 'Galvanic corrosion', 'Creep', 'Hydrogen embrittlement', 'Overload'], ['Environment-assisted', 'Mechanical loading'], [0,1,0,1,0,1], 'Environment-assisted failures need specific chemical or thermal conditions.', 'Which failures require a specific environment to occur?'),
  ['u10-L2c-NEW-T2', 'Hidden Environmental Damage', "Some failures happen below yield strength. Stress corrosion cracking, hydrogen embrittlement, and temper embrittlement can cause sudden failure in parts that look fine.", 'Always ask: what fluids, temperatures, and chemicals is the part exposed to?'],
  {id: 'u10-L2c-NEW-E2', q: 'Stress corrosion cracking requires three simultaneous conditions. Which is NOT one of them?', opts: ['High rotational speed', 'A susceptible material', 'Tensile stress', 'A corrosive environment'], ci: 0, e: 'SCC needs: susceptible material + tensile stress + corrosive environment. Speed is not a factor.', h: 'Think about what stress corrosion cracking literally means.'}
);

// L3-L6: use same pattern, abbreviated
const lessonNewContent: Record<string, [string, any, string, string, any][]> = {
  'u10-L3': [
    ['Material Selection Is About Trade-offs', {tf:true,q:"When an interviewer asks which material is best, the right first response is to ask what the constraints and priorities are.",a:true,e:"Material selection always depends on context.",h:"There's no universal best material."}, mp('u10-L3-NEW-MP1','Match each loading mode to its lightweight material index:',['Tension (min weight)','Bending (min weight)','Buckling (min weight)','Thermal insulation'],['sigma_y / rho','sigma_y^(2/3) / rho','E^(1/2) / rho','1 / k (thermal conductivity)'],[0,1,2,3],'Different loading modes require different property combinations.','Each loading mode has a unique material index.'), 'Ashby Charts Map Material Properties', {q:'What does a material index help you do?',opts:['Rank materials for a specific loading scenario','Calculate exact stress values','Determine the manufacturing process',"Find the material's price"],ci:0,e:"Material indices rank materials for specific loading modes.",h:'Material indices combine properties relevant to your design goal.'}],
  ],
  'u10-L3b': [
    ['Fewer Parts Means Lower Cost', {tf:true,q:'Design for Manufacturing (DFM) aims to make individual parts easier and cheaper to produce.',a:true,e:'DFM simplifies each part. DFA reduces total part count.',h:'DFM focuses on individual part simplicity.'}, sb('u10-L3b-NEW-SB1','Sort these strategies into DFM or DFA:',['Reduce part count','Add draft angles to castings','Use self-locating features','Avoid undercuts in molding','Design for top-down assembly','Use standard tooling sizes'],['DFA (assembly)','DFM (manufacturing)'],[0,1,0,1,0,1],'DFA focuses on assembly simplicity. DFM focuses on manufacturing ease.','Think about whether the strategy helps assembly or manufacturing.'), 'Tolerances Drive Cost', {q:'Which approach typically reduces manufacturing cost the most?',opts:['Relaxing non-critical tolerances','Using exotic materials','Adding more inspection steps','Making parts thicker'],ci:0,e:'Relaxing tolerances on non-critical features is often the single biggest cost saver.',h:'Tight tolerances require more precise processes.'}],
  ],
  'u10-L3c': [
    ['Structured Decision Making', {tf:true,q:'A Pugh matrix compares design alternatives against a reference (datum) design using simple better/same/worse ratings.',a:true,e:"The Pugh matrix is a quick concept screening tool.",h:'It uses +, S, and - ratings.'}, os('u10-L3c-NEW-OS1','Put these design decision steps in order:',['Define requirements and constraints','Generate multiple design concepts','Evaluate concepts against criteria','Select the best concept','Refine and detail the chosen design'],[0,1,2,3,4],"Good design follows a structured process: define, generate, evaluate, select, then refine.",'You cannot select a concept before generating alternatives.'), 'Weight Your Criteria', {q:'In a weighted decision matrix, what happens if you give all criteria equal weight?',opts:['Unimportant factors influence the result as much as critical ones','The matrix becomes more accurate','Costs are automatically minimized','All designs score the same'],ci:0,e:'Equal weighting treats color preference the same as structural integrity.',h:'Think about what weight means in decision-making.'}],
  ],
  'u10-L4': [
    ['FEA Approximates Reality', {tf:true,q:'In FEA, using a finer mesh generally improves accuracy but increases computation time.',a:true,e:'More elements means better approximation but longer solve time.',h:'Think about the trade-off between accuracy and speed.'}, mp('u10-L4-NEW-MP1','Match each FEA term to its meaning:',['Node','Element','Boundary condition','Convergence'],['A point in the mesh','A small piece of the geometry','A constraint or load applied to the model','Results stabilize as mesh is refined'],[0,1,2,3],'These are the fundamental concepts of FEA.','Each term describes a basic FEA building block.'), 'Element Type Matters', {q:'What is a "mesh" in FEA?',opts:['The network of elements that divide the geometry','The loading conditions applied','The material property database','The solver algorithm'],ci:0,e:'A mesh is the collection of nodes and elements that discretize the geometry.',h:'Think about dividing a shape into small pieces.'}],
  ],
  'u10-L4b': [
    ['Boundary Conditions Make or Break FEA', {tf:true,q:'Fixing all 6 degrees of freedom at a support creates a fully fixed boundary condition.',a:true,e:'Fixing all translations and rotations models a perfectly rigid wall mount.',h:'Six DOF means 3 translations + 3 rotations.'}, os('u10-L4b-NEW-OS1','Put these FEA workflow steps in order:',['Import or create geometry','Assign material properties','Apply mesh to the geometry','Apply loads and boundary conditions','Run the solver and check convergence'],[0,1,2,3,4],'The standard FEA workflow: geometry, materials, mesh, loads/BCs, then solve.','You need geometry before you can mesh it.'), 'Check Convergence Before Trusting Results', {q:'What does "mesh convergence" mean in FEA?',opts:['Results stop changing significantly as you refine the mesh','The solver finishes running','All elements have the same size','The model matches the CAD geometry exactly'],ci:0,e:'Convergence means your results are mesh-independent.',h:'Think about what converge means mathematically.'}],
  ],
  'u10-L4c': [
    ['Stress Singularities Are Not Real', {tf:true,q:'A stress singularity in FEA means the stress at a sharp corner approaches infinity as the mesh is refined.',a:true,e:'This is a mathematical artifact, not a real physical stress.',h:"Perfect sharp corners don't exist in real parts."}, sb('u10-L4c-NEW-SB1','Sort these FEA observations into real problems or normal artifacts:',['Stress singularity at a sharp corner','Convergence study shows 5% change','Peak stress at a fillet root','Hourglass modes in reduced-integration elements','Stress concentration at a bolt hole','Rigid body motion in the model'],['Normal/artifact','Real problem'],[0,0,0,1,0,1],'Singularities and small convergence changes are expected. Hourglass modes and rigid body motion indicate errors.','Think about which observations indicate modeling mistakes.'), 'Always Validate Against Hand Calcs', {q:'What should you do if FEA stress results disagree significantly with a hand calculation?',opts:['Check the model for errors in BCs, loads, or material properties','Trust the FEA because computers are more accurate','Add more elements until FEA matches','Ignore the hand calculation'],ci:0,e:'Disagreement between FEA and hand calcs usually means a modeling error.',h:'Hand calcs are your sanity check.'}],
  ],
  'u10-L5': [
    ['Case Studies Show Your Engineering Judgment', {tf:true,q:'In a case study interview, demonstrating a structured approach is more important than getting the exact right answer.',a:true,e:'Interviewers evaluate your thought process and communication.',h:'Process matters more than the specific conclusion.'}, os('u10-L5-NEW-OS1','Put these troubleshooting steps in order:',['Gather symptoms and operating conditions','Form hypotheses about root cause','Design tests to confirm or eliminate hypotheses','Implement the fix','Verify the fix resolved the issue'],[0,1,2,3,4],'Systematic troubleshooting: gather data, hypothesize, test, fix, then verify.','You need symptoms before you can form hypotheses.'), 'Define Before You Solve', {q:'What should you do first when given a case study problem?',opts:['Clarify the problem and state your assumptions','Start calculating immediately','Ask for the correct answer','Look up the solution'],ci:0,e:'Always start by understanding and framing the problem.',h:'Good engineers define the problem before solving it.'}],
  ],
  'u10-L5b': [
    ['Field Failures Are Different From Lab Failures', {tf:true,q:'A product that passes all lab tests is guaranteed to never fail in the field.',a:false,e:"Lab tests can't replicate every field condition.",h:'Think about what conditions might differ between lab and field.'}, mp('u10-L5b-NEW-MP1','Match each investigation technique to what it reveals:',['Fractography (SEM)','Chemical analysis (EDS)','Hardness testing','Dimensional inspection'],['Microscopic fracture features','Material composition','Heat treatment condition','Manufacturing accuracy'],[0,1,2,3],'Different analysis techniques answer different questions.','Each technique reveals different information about the part.'), 'Data-Driven Decisions', {q:'An intermittent field failure that cannot be reproduced in the lab most likely relates to:',opts:['Environmental or usage differences between lab and field','A software bug in the test equipment','The lab technician making errors','The part being too strong for lab loads'],ci:0,e:'Unreproducible failures usually stem from conditions present in the field but absent in the lab.',h:"What's different between the lab environment and the field?"}],
  ],
  'u10-L5c': [
    ['Think Across Disciplines', {tf:true,q:'A good engineer only needs to understand their own discipline to solve real-world problems.',a:false,e:'Real problems cross disciplines. Thermal, structural, fluid, and electrical effects often interact.',h:'Think about whether real problems stay neatly in one subject area.'}, sb('u10-L5c-NEW-SB1','Sort these engineering considerations into design phase or validation phase:',['Material selection','Prototype testing','Tolerance analysis','Accelerated life testing','FEA stress analysis','Field trial monitoring'],['Design phase','Validation phase'],[0,1,0,1,0,1],'Design-phase activities happen before building. Validation activities confirm the design works.','Think about whether you do this before or after building a prototype.'), 'Systems Thinking in Design', {q:'When proposing a design change, what should you always consider?',opts:['How the change affects other parts of the system','Only the stress in the changed part','Whether the change looks better','Only the manufacturing cost'],ci:0,e:'Systems thinking means considering ripple effects on weight, cost, assembly, thermal, maintenance.',h:'Changes in one area often affect other areas.'}],
  ],
  'u10-L6': [
    ['Standards Exist for Good Reason', {tf:true,q:'ISO 9001 is the international standard for quality management systems.',a:true,e:"ISO 9001 defines requirements for a quality management system.",h:'This is the most recognized quality standard globally.'}, mp('u10-L6-NEW-MP1','Match each standard to its primary focus:',['ISO 9001','ASME BPVC','ISO 14001','ASME Y14.5'],['Quality management','Pressure vessel safety','Environmental management','GD&T dimensioning'],[0,1,2,3],'Each standard covers a specific domain.','Match based on the keywords in each standard name.'), 'Standards vs Codes vs Specifications', {q:'What is the ASME BPVC primarily used for?',opts:['Safe design and construction of pressure equipment','Electrical wiring standards','Software quality assurance','Environmental regulations'],ci:0,e:'ASME BPVC is the primary standard for pressure vessel and boiler design safety.',h:'Think about what boiler and pressure vessel tells you.'}],
  ],
  'u10-L6b': [
    ['Risk Assessment Prevents Failures', {tf:true,q:'FMEA stands for Failure Mode and Effects Analysis.',a:true,e:'FMEA systematically identifies potential failure modes and their effects to prioritize risks.',h:'Each letter stands for a word in the full name.'}, os('u10-L6b-NEW-OS1','Put these engineering change management steps in order:',['Identify the need for a change','Document the proposed change on an ECO','Review and approve with cross-functional team','Implement the change in production','Verify the change works correctly'],[0,1,2,3,4],'Change management follows a formal process: identify, document, review, implement, verify.','You need approval before implementing any change.'), 'Change Control Prevents Chaos', {q:'What is the purpose of an Engineering Change Order (ECO)?',opts:['To formally document and control design modifications','To order new engineering tools','To schedule employee training','To calculate project budgets'],ci:0,e:'ECOs ensure that design changes are reviewed, approved, and communicated.',h:'Think about what change order implies.'}],
  ],
  'u10-L6c': [
    ['Engineers Need Project Management Skills', {tf:true,q:'A Gantt chart is a visual tool that shows project tasks plotted against time.',a:true,e:'Gantt charts show task durations, dependencies, and milestones on a timeline.',h:'Think of a horizontal bar chart showing when tasks start and end.'}, sb('u10-L6c-NEW-SB1','Sort these into technical skills or professional skills:',['FEA modeling','Writing technical reports','Material selection','Presenting to stakeholders','Tolerance analysis','Managing project schedules'],['Technical skill','Professional skill'],[0,1,0,1,0,1],'Both technical and professional skills are essential for engineering careers.','Think about whether each skill involves analysis or communication/management.'), 'Communication Is Engineering Too', {q:'What does the "critical path" in project management represent?',opts:['The longest sequence of dependent tasks that determines project duration','The most expensive tasks','Tasks that require the most engineers','The path with the most safety risks'],ci:0,e:'The critical path determines the minimum project duration.',h:'Think about which tasks cannot be delayed without delaying the project.'}],
  ],
};

// Build the new items for L3-L6 using the config
for (const [lid, configs] of Object.entries(lessonNewContent)) {
  const cfg = configs[0];
  const [t1Title, e1Config, varietyStr, t2Title, e2Config] = cfg;
  newItems[lid] = buildNewItems(lid,
    [`${lid}-NEW-T1`, t1Title as string, e1Config.tf !== undefined ? '' : '', e1Config.tf !== undefined ? '' : ''],
    {id: `${lid}-NEW-E1`, ...e1Config},
    varietyStr as string,
    [`${lid}-NEW-T2`, t2Title as string, '', ''],
    {id: `${lid}-NEW-E2`, ...e2Config}
  );
}

// Actually this is getting too complex. Let me use a simpler approach:
// I already have a working file with 8 items per sub-lesson from the first run.
// Let me just add 3 more original questions to each sub-lesson.

// The simplest fix: re-run the original restructuring script but adjust to take 6 originals instead of varying numbers.
// Actually, let me just check what the first run produced and add missing originals.

// Abort this approach and use a much simpler fix
console.log('\nScript too complex. Using simpler approach: restore first run and add more originals.');
process.exit(0);
