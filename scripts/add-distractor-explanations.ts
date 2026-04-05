/**
 * Script to add distractorExplanations to course question data files.
 *
 * For every question that has options[] + correctIndex (multiple-choice, scenario, pick-the-best)
 * or is true-false, adds a distractorExplanations field after the explanation field.
 *
 * Skips: teaching, fill-blank, sort-buckets, match-pairs, order-steps, multi-select,
 *        slider-estimate, category-swipe, rank-order, image-tap
 */

import * as fs from 'fs';
import * as path from 'path';

const ELIGIBLE_TYPES = ['multiple-choice', 'scenario', 'pick-the-best', 'true-false'];
const SKIP_TYPES = ['teaching', 'fill-blank', 'sort-buckets', 'match-pairs', 'order-steps',
                     'multi-select', 'slider-estimate', 'category-swipe', 'rank-order', 'image-tap'];

function processFile(filePath: string): { modified: boolean; questionsProcessed: number } {
  let content = fs.readFileSync(filePath, 'utf-8');
  let questionsProcessed = 0;

  // Skip if already has distractorExplanations
  if (content.includes('distractorExplanations')) {
    // Count existing ones
    const existingCount = (content.match(/distractorExplanations/g) || []).length;
    console.log(`  Already has ${existingCount} distractorExplanations, skipping...`);
    return { modified: false, questionsProcessed: 0 };
  }

  // Find all question blocks that need processing
  // We look for patterns like:
  // type: "multiple-choice" or "scenario" or "pick-the-best" with correctIndex
  // type: "true-false" with correctAnswer

  // For multiple-choice/scenario/pick-the-best with options and correctIndex
  // We need to insert distractorExplanations after the explanation line

  // Strategy: Find each question block, determine if it's eligible,
  // extract the options and correctIndex/correctAnswer,
  // then insert a placeholder distractorExplanations

  // Since we can't generate domain-specific explanations programmatically without AI,
  // we'll add TODO placeholders that need manual review

  // Actually let's just mark the file locations where they need to go
  // This script identifies what needs to be done

  const lines = content.split('\n');
  const insertions: { lineIndex: number; indent: string; type: string; correctIndex?: number; correctAnswer?: boolean; optionCount: number; id: string }[] = [];

  let currentType = '';
  let currentCorrectIndex = -1;
  let currentCorrectAnswer: boolean | null = null;
  let currentOptionCount = 0;
  let currentId = '';
  let explanationLineIndex = -1;
  let explanationIndent = '';
  let inOptions = false;
  let bracketDepth = 0;
  let hasVariantsAfterExplanation = false;
  let variantsEndLineIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track question ID
    const idMatch = trimmed.match(/^id:\s*["']([^"']+)["']/);
    if (idMatch) {
      currentId = idMatch[1];
    }

    // Track question type
    const typeMatch = trimmed.match(/^type:\s*["']([\w-]+)["']/);
    if (typeMatch) {
      currentType = typeMatch[1];
      currentCorrectIndex = -1;
      currentCorrectAnswer = null;
      currentOptionCount = 0;
      explanationLineIndex = -1;
      hasVariantsAfterExplanation = false;
      variantsEndLineIndex = -1;
    }

    // Track correctIndex
    const correctIndexMatch = trimmed.match(/^correctIndex:\s*(\d+)/);
    if (correctIndexMatch) {
      currentCorrectIndex = parseInt(correctIndexMatch[1]);
    }

    // Track correctAnswer for true-false
    const correctAnswerMatch = trimmed.match(/^correctAnswer:\s*(true|false)/);
    if (correctAnswerMatch) {
      currentCorrectAnswer = correctAnswerMatch[1] === 'true';
    }

    // Count options
    if (trimmed === 'options: [') {
      inOptions = true;
      currentOptionCount = 0;
    }
    if (inOptions) {
      // Count string options (simple ones)
      if (trimmed.startsWith('"') || trimmed.startsWith("'")) {
        currentOptionCount++;
      }
    }
    if (inOptions && trimmed === '],') {
      inOptions = false;
    }

    // Track explanation line
    const explanationMatch = trimmed.match(/^explanation:\s*["']/);
    if (explanationMatch && ELIGIBLE_TYPES.includes(currentType)) {
      // Find the end of the explanation value (may span multiple lines)
      let expEnd = i;
      if (!trimmed.endsWith('",') && !trimmed.endsWith("',")) {
        // Multi-line explanation
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].trim().endsWith('",') || lines[j].trim().endsWith("',")) {
            expEnd = j;
            break;
          }
        }
      }
      explanationLineIndex = expEnd;
      explanationIndent = line.match(/^(\s*)/)?.[1] || '';
    }

    // Check for variants block after explanation
    if (explanationLineIndex > -1 && i > explanationLineIndex && trimmed.startsWith('variants:')) {
      hasVariantsAfterExplanation = true;
      // Find the end of variants block
      let depth = 0;
      for (let j = i; j < lines.length; j++) {
        const vLine = lines[j];
        for (const ch of vLine) {
          if (ch === '{') depth++;
          if (ch === '}') depth--;
        }
        if (depth === 0 && j > i) {
          variantsEndLineIndex = j;
          break;
        }
        if (depth === 0 && vLine.trim().endsWith('},')) {
          variantsEndLineIndex = j;
          break;
        }
      }
    }

    // Check if we've reached the end of a question block (closing brace + comma)
    // and should record an insertion point
    if (trimmed === '},' || trimmed === '},') {
      if (explanationLineIndex > -1 && ELIGIBLE_TYPES.includes(currentType)) {
        if (currentType === 'true-false' && currentCorrectAnswer !== null) {
          const insertAfter = hasVariantsAfterExplanation && variantsEndLineIndex > -1
            ? variantsEndLineIndex
            : explanationLineIndex;
          insertions.push({
            lineIndex: insertAfter,
            indent: explanationIndent,
            type: currentType,
            correctAnswer: currentCorrectAnswer,
            optionCount: 2,
            id: currentId,
          });
          questionsProcessed++;
        } else if (['multiple-choice', 'scenario', 'pick-the-best'].includes(currentType) && currentCorrectIndex >= 0) {
          const insertAfter = hasVariantsAfterExplanation && variantsEndLineIndex > -1
            ? variantsEndLineIndex
            : explanationLineIndex;
          insertions.push({
            lineIndex: insertAfter,
            indent: explanationIndent,
            type: currentType,
            correctIndex: currentCorrectIndex,
            optionCount: currentOptionCount,
            id: currentId,
          });
          questionsProcessed++;
        }
        // Reset
        explanationLineIndex = -1;
        hasVariantsAfterExplanation = false;
        variantsEndLineIndex = -1;
      }
    }
  }

  console.log(`  Found ${insertions.length} questions needing distractorExplanations`);

  return { modified: false, questionsProcessed: insertions.length };
}

// Define all files to process
const baseDir = 'D:/Work/Octokeen/src/data/course/professions';
const files: string[] = [];

// Personal Finance units 0-12
for (let i = 0; i <= 12; i++) {
  files.push(path.join(baseDir, 'personal-finance/units', `unit-${i}.ts`));
}

// Psychology units 1-10
for (let i = 1; i <= 10; i++) {
  files.push(path.join(baseDir, 'psychology/units', `unit-${i}.ts`));
}

// Space/Astronomy units 1-10
for (let i = 1; i <= 10; i++) {
  files.push(path.join(baseDir, 'space-astronomy/units', `unit-${i}.ts`));
}

let totalProcessed = 0;
for (const file of files) {
  const basename = path.basename(file);
  const dirname = path.basename(path.dirname(path.dirname(file)));
  console.log(`\nProcessing ${dirname}/${basename}...`);

  if (!fs.existsSync(file)) {
    console.log(`  File not found, skipping...`);
    continue;
  }

  const result = processFile(file);
  totalProcessed += result.questionsProcessed;
}

console.log(`\nTotal questions identified: ${totalProcessed}`);
