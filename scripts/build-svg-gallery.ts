/**
 * build-svg-gallery.ts
 *
 * Scans all course unit files for questions with `diagram` fields and generates
 * a standalone HTML gallery at project root (gallery.html).
 *
 * Usage: npx tsx scripts/build-svg-gallery.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

// ── Types (mirror of src/data/course/types.ts) ──────────────────────
interface CourseQuestion {
  id: string;
  type: string;
  question: string;
  explanation: string;
  diagram?: string;
  [key: string]: unknown;
}

interface Lesson {
  id: string;
  title: string;
  questions: CourseQuestion[];
  [key: string]: unknown;
}

interface Unit {
  id: string;
  title: string;
  color: string;
  icon: string;
  lessons: Lesson[];
}

interface DiagramEntry {
  questionId: string;
  questionType: string;
  questionText: string;
  diagram: string;
  lessonTitle: string;
  lessonId: string;
  unitTitle: string;
  unitColor: string;
  unitIcon: string;
}

interface CourseData {
  name: string;
  units: {
    unitTitle: string;
    unitIcon: string;
    unitColor: string;
    lessons: {
      lessonTitle: string;
      lessonId: string;
      diagrams: DiagramEntry[];
    }[];
  }[];
  totalDiagrams: number;
}

// ── Helpers ──────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const COURSE_DIR = path.join(ROOT, 'src', 'data', 'course');

function extractDiagrams(unit: Unit): CourseData['units'][number] {
  const lessons: CourseData['units'][number]['lessons'] = [];

  for (const lesson of unit.lessons) {
    const diagrams: DiagramEntry[] = [];
    for (const q of lesson.questions) {
      if (q.diagram) {
        diagrams.push({
          questionId: q.id,
          questionType: q.type,
          questionText: q.question,
          diagram: q.diagram,
          lessonTitle: lesson.title,
          lessonId: lesson.id,
          unitTitle: unit.title,
          unitColor: unit.color,
          unitIcon: unit.icon,
        });
      }
    }
    if (diagrams.length > 0) {
      lessons.push({
        lessonTitle: lesson.title,
        lessonId: lesson.id,
        diagrams,
      });
    }
  }

  return {
    unitTitle: unit.title,
    unitIcon: unit.icon,
    unitColor: unit.color,
    lessons,
  };
}

async function loadUnitsFromDir(dir: string): Promise<Unit[]> {
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));
  const units: Unit[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const mod = await import(pathToFileURL(filePath).href);
      // Each file may export one or more Unit objects, or Lesson objects
      for (const key of Object.keys(mod)) {
        const val = mod[key];
        if (val && typeof val === 'object' && 'id' in val && 'lessons' in val && Array.isArray(val.lessons)) {
          units.push(val as Unit);
        }
      }
    } catch (err) {
      console.warn(`  Skipping ${file}: ${(err as Error).message}`);
    }
  }

  return units;
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  console.log('Building SVG diagram gallery...\n');

  const courses: CourseData[] = [];

  // 1. Legacy ME course (src/data/course/units/)
  console.log('Loading ME course...');
  const meUnitsDir = path.join(COURSE_DIR, 'units');
  const meUnits = await loadUnitsFromDir(meUnitsDir);
  if (meUnits.length > 0) {
    const meData: CourseData = { name: 'Mechanical Engineering', units: [], totalDiagrams: 0 };
    // Sort by unit id for consistent ordering
    meUnits.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    for (const unit of meUnits) {
      const unitData = extractDiagrams(unit);
      if (unitData.lessons.length > 0) {
        meData.units.push(unitData);
        for (const l of unitData.lessons) meData.totalDiagrams += l.diagrams.length;
      }
    }
    if (meData.totalDiagrams > 0) courses.push(meData);
    console.log(`  ${meData.totalDiagrams} diagrams in ${meData.units.length} units`);
  }

  // 2. Profession courses (src/data/course/professions/*/units/)
  const professionsDir = path.join(COURSE_DIR, 'professions');
  if (fs.existsSync(professionsDir)) {
    const professions = fs.readdirSync(professionsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const prof of professions) {
      const displayName = prof.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      console.log(`Loading ${displayName} course...`);
      const profUnitsDir = path.join(professionsDir, prof, 'units');
      const profUnits = await loadUnitsFromDir(profUnitsDir);
      if (profUnits.length > 0) {
        const profData: CourseData = { name: displayName, units: [], totalDiagrams: 0 };
        profUnits.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
        for (const unit of profUnits) {
          const unitData = extractDiagrams(unit);
          if (unitData.lessons.length > 0) {
            profData.units.push(unitData);
            for (const l of unitData.lessons) profData.totalDiagrams += l.diagrams.length;
          }
        }
        if (profData.totalDiagrams > 0) courses.push(profData);
        console.log(`  ${profData.totalDiagrams} diagrams in ${profData.units.length} units`);
      } else {
        console.log(`  No units found, skipping`);
      }
    }
  }

  const grandTotal = courses.reduce((s, c) => s + c.totalDiagrams, 0);
  console.log(`\nTotal: ${grandTotal} diagrams across ${courses.length} courses`);

  if (grandTotal === 0) {
    console.log('No diagrams found. Skipping gallery generation.');
    return;
  }

  // ── Generate HTML ──────────────────────────────────────────────────

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  let courseSections = '';
  for (const course of courses) {
    let unitSections = '';
    for (const unit of course.units) {
      const unitDiagramCount = unit.lessons.reduce((s, l) => s + l.diagrams.length, 0);
      let lessonSections = '';
      for (const lesson of unit.lessons) {
        let cards = '';
        for (const d of lesson.diagrams) {
          cards += `
            <div class="card" data-search="${escapeHtml(d.questionId.toLowerCase())} ${escapeHtml(d.questionText.toLowerCase())} ${escapeHtml(d.questionType.toLowerCase())} ${escapeHtml(d.lessonTitle.toLowerCase())} ${escapeHtml(d.unitTitle.toLowerCase())}">
              <div class="diagram-container">
                ${d.diagram}
              </div>
              <div class="card-info">
                <code class="qid">${escapeHtml(d.questionId)}</code>
                <span class="badge badge-${d.questionType}">${escapeHtml(d.questionType)}</span>
                <p class="qtext">${escapeHtml(d.questionText)}</p>
              </div>
            </div>`;
        }
        lessonSections += `
          <div class="lesson-group">
            <h4 class="lesson-title">${escapeHtml(lesson.lessonTitle)} <span class="count">${lesson.diagrams.length}</span></h4>
            <div class="grid">
              ${cards}
            </div>
          </div>`;
      }
      unitSections += `
        <details class="unit-details" open>
          <summary class="unit-summary">
            <span class="unit-icon">${unit.unitIcon}</span>
            <span class="unit-name">${escapeHtml(unit.unitTitle)}</span>
            <span class="count">${unitDiagramCount}</span>
            <span class="chevron"></span>
          </summary>
          ${lessonSections}
        </details>`;
    }
    courseSections += `
      <details class="course-details" open>
        <summary class="course-summary">
          <span class="course-name">${escapeHtml(course.name)}</span>
          <span class="count">${course.totalDiagrams}</span>
          <span class="chevron"></span>
        </summary>
        ${unitSections}
      </details>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Octokeen - SVG Diagram Gallery</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #0a0a0a;
    color: #fff;
    padding: 40px 20px 80px;
    min-height: 100vh;
  }

  /* ── Header ── */
  .header {
    text-align: center;
    margin-bottom: 32px;
  }
  .header h1 {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: -0.5px;
  }
  .header .subtitle {
    font-size: 14px;
    color: #666;
    margin-top: 4px;
  }
  .header .total {
    display: inline-block;
    margin-top: 12px;
    padding: 6px 16px;
    background: #1a1a2e;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    color: #818CF8;
  }

  /* ── Search ── */
  .search-bar {
    max-width: 600px;
    margin: 0 auto 40px;
    position: sticky;
    top: 12px;
    z-index: 100;
  }
  .search-bar input {
    width: 100%;
    padding: 14px 20px 14px 44px;
    background: #141422;
    border: 2px solid #2a2a3e;
    border-radius: 14px;
    color: #fff;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 600;
    outline: none;
    transition: border-color 0.2s;
  }
  .search-bar input:focus {
    border-color: #818CF8;
  }
  .search-bar input::placeholder {
    color: #555;
  }
  .search-bar .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #555;
    pointer-events: none;
  }
  .no-results {
    text-align: center;
    color: #555;
    font-size: 15px;
    padding: 60px 20px;
    display: none;
  }

  /* ── Course ── */
  .course-details {
    margin-bottom: 24px;
  }
  .course-summary {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: #111;
    border-radius: 14px;
    cursor: pointer;
    list-style: none;
    user-select: none;
    border: 1px solid #222;
    transition: background 0.15s;
  }
  .course-summary:hover {
    background: #1a1a1a;
  }
  .course-summary::-webkit-details-marker { display: none; }
  .course-name {
    font-size: 20px;
    font-weight: 900;
    flex: 1;
  }

  /* ── Unit ── */
  .unit-details {
    margin: 16px 0 16px 12px;
  }
  .unit-summary {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: #0f0f1a;
    border-radius: 12px;
    cursor: pointer;
    list-style: none;
    user-select: none;
    border: 1px solid #1a1a2e;
    transition: background 0.15s;
  }
  .unit-summary:hover {
    background: #151528;
  }
  .unit-summary::-webkit-details-marker { display: none; }
  .unit-icon {
    font-size: 20px;
  }
  .unit-name {
    font-size: 16px;
    font-weight: 800;
    flex: 1;
  }

  /* ── Chevron ── */
  .chevron {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-right: 2px solid #555;
    border-bottom: 2px solid #555;
    transform: rotate(45deg);
    transition: transform 0.2s;
    flex-shrink: 0;
  }
  details[open] > summary .chevron {
    transform: rotate(-135deg);
  }

  /* ── Count badge ── */
  .count {
    padding: 2px 10px;
    background: #1a1a2e;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 800;
    color: #818CF8;
    flex-shrink: 0;
  }

  /* ── Lesson ── */
  .lesson-group {
    margin: 16px 0 24px 24px;
  }
  .lesson-title {
    font-size: 14px;
    font-weight: 700;
    color: #888;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── Grid ── */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
  }
  @media (max-width: 740px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  /* ── Card ── */
  .card {
    background: #111;
    border: 1px solid #222;
    border-radius: 16px;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.15s;
  }
  .card:hover {
    border-color: #333;
    transform: translateY(-2px);
  }
  .card.hidden {
    display: none;
  }

  .diagram-container {
    background: #fff;
    border: 2px solid #E5E5E5;
    border-radius: 14px;
    margin: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 160px;
    overflow: hidden;
  }
  .diagram-container svg {
    max-width: 100%;
    max-height: 300px;
    height: auto;
  }

  .card-info {
    padding: 8px 16px 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }
  .qid {
    font-size: 11px;
    font-weight: 700;
    color: #555;
    background: #1a1a1a;
    padding: 2px 8px;
    border-radius: 6px;
  }
  .qtext {
    width: 100%;
    font-size: 13px;
    font-weight: 600;
    color: #aaa;
    line-height: 1.4;
    margin-top: 4px;
  }

  /* ── Type badges ── */
  .badge {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 2px 8px;
    border-radius: 6px;
    color: #fff;
  }
  .badge-teaching { background: #7C3AED; }
  .badge-multiple-choice { background: #2563EB; }
  .badge-true-false { background: #059669; }
  .badge-fill-blank { background: #D97706; }
  .badge-sort-buckets { background: #DC2626; }
  .badge-match-pairs { background: #DB2777; }
  .badge-order-steps { background: #9333EA; }
  .badge-multi-select { background: #0891B2; }
  .badge-slider-estimate { background: #65A30D; }
  .badge-scenario { background: #EA580C; }
  .badge-category-swipe { background: #4F46E5; }
  .badge-rank-order { background: #BE185D; }
  .badge-pick-the-best { background: #0D9488; }
  .badge-image-tap { background: #7C2D12; }
</style>
</head>
<body>
  <div class="header">
    <h1>SVG Diagram Gallery</h1>
    <p class="subtitle">All course diagrams, organized by course, unit, and lesson</p>
    <div class="total">${grandTotal} diagrams</div>
  </div>

  <div class="search-bar">
    <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input type="text" id="search" placeholder="Filter by ID, question text, type, lesson, unit..." autocomplete="off" spellcheck="false">
  </div>

  <div class="no-results" id="no-results">No diagrams match your search.</div>

  <div id="gallery">
    ${courseSections}
  </div>

  <script>
    const input = document.getElementById('search');
    const cards = document.querySelectorAll('.card');
    const noResults = document.getElementById('no-results');
    const lessonGroups = document.querySelectorAll('.lesson-group');
    const unitDetails = document.querySelectorAll('.unit-details');
    const courseDetails = document.querySelectorAll('.course-details');

    input.addEventListener('input', function() {
      const q = this.value.toLowerCase().trim();
      let visible = 0;

      cards.forEach(card => {
        const match = !q || card.dataset.search.includes(q);
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });

      // Hide empty lesson groups
      lessonGroups.forEach(lg => {
        const hasVisible = lg.querySelector('.card:not(.hidden)');
        lg.style.display = hasVisible ? '' : 'none';
      });

      // Hide empty unit sections
      unitDetails.forEach(ud => {
        const hasVisible = ud.querySelector('.card:not(.hidden)');
        ud.style.display = hasVisible ? '' : 'none';
      });

      // Hide empty course sections
      courseDetails.forEach(cd => {
        const hasVisible = cd.querySelector('.card:not(.hidden)');
        cd.style.display = hasVisible ? '' : 'none';
      });

      noResults.style.display = visible === 0 && q ? 'block' : 'none';
    });
  </script>
</body>
</html>`;

  const outputPath = path.join(ROOT, 'gallery.html');
  fs.writeFileSync(outputPath, html, 'utf-8');
  console.log(`\nGallery written to ${outputPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
