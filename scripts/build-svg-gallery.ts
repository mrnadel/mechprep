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

  // ── Output ────────────────────────────────────────────────────────

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const courseSlugMap: Record<string, string> = {};
  for (const course of courses) {
    courseSlugMap[course.name] = slugify(course.name);
  }

  // ── Build tab buttons and tab pages ───────────────────────────────

  const tabButtons = courses.map(c => {
    const slug = courseSlugMap[c.name];
    return `<button class="tab" data-tab="${slug}" onclick="switchTab('${slug}')">${escapeHtml(c.name)} <span class="tab-count">${c.totalDiagrams}</span></button>`;
  }).join('\n        ');

  let tabPages = '';
  for (const course of courses) {
    const slug = courseSlugMap[course.name];
    let unitSidebar = '';
    let unitContent = '';

    for (const unit of course.units) {
      const unitSlug = `${slug}/${slugify(unit.unitTitle)}`;
      const unitDiagramCount = unit.lessons.reduce((s, l) => s + l.diagrams.length, 0);

      unitSidebar += `<a class="sidebar-unit" href="#${unitSlug}" data-unit="${unitSlug}" onclick="switchUnit('${unitSlug}')">${unit.unitIcon} ${escapeHtml(unit.unitTitle)} <span class="count">${unitDiagramCount}</span></a>\n`;

      let lessonSections = '';
      for (const lesson of unit.lessons) {
        let cards = '';
        for (const d of lesson.diagrams) {
          cards += `
              <div class="card" data-search="${escapeHtml(d.questionId.toLowerCase())} ${escapeHtml(d.questionText.toLowerCase())} ${escapeHtml(d.questionType.toLowerCase())} ${escapeHtml(d.lessonTitle.toLowerCase())} ${escapeHtml(d.unitTitle.toLowerCase())}">
                <div class="diagram-container">${d.diagram}</div>
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
              <div class="grid">${cards}</div>
            </div>`;
      }

      unitContent += `
          <div class="unit-page" id="unit-${unitSlug}" style="display:none">
            <div class="unit-header">
              <span class="unit-icon-lg">${unit.unitIcon}</span>
              <div>
                <h2 class="unit-page-title">${escapeHtml(unit.unitTitle)}</h2>
                <p class="unit-page-sub">${unitDiagramCount} diagrams across ${unit.lessons.length} lessons</p>
              </div>
            </div>
            ${lessonSections}
          </div>`;
    }

    tabPages += `
      <div class="tab-page" id="page-${slug}" style="display:none">
        <div class="course-layout">
          <aside class="sidebar">${unitSidebar}</aside>
          <main class="content">${unitContent}</main>
        </div>
      </div>`;
  }

  // ── Thing 1: Generate standalone gallery.html ─────────────────────

  const standaloneHtml = `<!DOCTYPE html>
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
    background: #0a0a0a; color: #fff; min-height: 100vh;
  }

  /* ── Top bar ── */
  .topbar {
    position: sticky; top: 0; z-index: 100;
    background: #0a0a0a; border-bottom: 1px solid #1a1a2e;
    padding: 12px 24px 0;
  }
  .topbar-row {
    display: flex; align-items: center; gap: 16px; margin-bottom: 12px;
  }
  .topbar h1 { font-size: 20px; font-weight: 900; flex-shrink: 0; }
  .topbar .total {
    padding: 3px 12px; background: #1a1a2e; border-radius: 12px;
    font-size: 12px; font-weight: 800; color: #818CF8;
  }
  .search-bar {
    flex: 1; max-width: 400px; position: relative; margin-left: auto;
  }
  .search-bar input {
    width: 100%; padding: 8px 14px 8px 36px;
    background: #141422; border: 1px solid #2a2a3e; border-radius: 10px;
    color: #fff; font-family: 'Nunito', sans-serif; font-size: 13px;
    font-weight: 600; outline: none; transition: border-color 0.2s;
  }
  .search-bar input:focus { border-color: #818CF8; }
  .search-bar input::placeholder { color: #555; }
  .search-icon {
    position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
    color: #555; pointer-events: none;
  }

  /* ── Tabs ── */
  .tabs { display: flex; gap: 4px; overflow-x: auto; }
  .tab {
    padding: 8px 16px; background: none; border: none; border-bottom: 2px solid transparent;
    color: #666; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700;
    cursor: pointer; white-space: nowrap; transition: all 0.15s;
  }
  .tab:hover { color: #aaa; }
  .tab.active { color: #fff; border-bottom-color: #818CF8; }
  .tab-count {
    font-size: 11px; font-weight: 800; color: #818CF8;
    background: #1a1a2e; padding: 1px 7px; border-radius: 8px; margin-left: 6px;
  }

  /* ── Course layout ── */
  .course-layout { display: flex; min-height: calc(100vh - 100px); }
  .sidebar {
    width: 260px; flex-shrink: 0; padding: 16px 12px;
    background: #0d0d14; border-right: 1px solid #1a1a2e;
    overflow-y: auto; position: sticky; top: 100px; height: calc(100vh - 100px);
  }
  .sidebar-unit {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 12px; border-radius: 10px; margin-bottom: 4px;
    color: #888; text-decoration: none; font-size: 13px; font-weight: 700;
    transition: all 0.15s; cursor: pointer;
  }
  .sidebar-unit:hover { background: #151522; color: #ccc; }
  .sidebar-unit.active { background: #1a1a2e; color: #fff; }
  .content { flex: 1; padding: 24px 32px 80px; overflow-y: auto; }
  @media (max-width: 900px) {
    .sidebar { display: none; }
    .content { padding: 16px; }
  }

  /* ── Unit page ── */
  .unit-header {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 28px; padding-bottom: 16px; border-bottom: 1px solid #1a1a2e;
  }
  .unit-icon-lg { font-size: 36px; }
  .unit-page-title { font-size: 22px; font-weight: 900; }
  .unit-page-sub { font-size: 13px; color: #666; font-weight: 600; margin-top: 2px; }

  /* ── Count badge ── */
  .count {
    padding: 1px 8px; background: #1a1a2e; border-radius: 8px;
    font-size: 11px; font-weight: 800; color: #818CF8; margin-left: auto;
  }

  /* ── Lesson ── */
  .lesson-group { margin-bottom: 32px; }
  .lesson-title {
    font-size: 14px; font-weight: 700; color: #888;
    margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
  }

  /* ── Grid ── */
  .grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;
  }
  @media (max-width: 740px) { .grid { grid-template-columns: 1fr; } }

  /* ── Card ── */
  .card {
    background: #111; border: 1px solid #1a1a2e; border-radius: 14px;
    overflow: hidden; transition: border-color 0.2s, transform 0.15s;
  }
  .card:hover { border-color: #333; transform: translateY(-2px); }
  .card.hidden { display: none; }
  .diagram-container {
    background: #fff; border: 2px solid #E5E5E5; border-radius: 12px;
    margin: 10px; padding: 12px;
    display: flex; align-items: center; justify-content: center;
    min-height: 140px; overflow: hidden;
  }
  .diagram-container svg { max-width: 100%; max-height: 260px; height: auto; }
  .card-info {
    padding: 6px 14px 14px; display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
  }
  .qid {
    font-size: 10px; font-weight: 700; color: #555;
    background: #1a1a1a; padding: 2px 7px; border-radius: 5px;
  }
  .qtext {
    width: 100%; font-size: 12px; font-weight: 600; color: #777;
    line-height: 1.4; margin-top: 2px;
  }

  /* ── Badges ── */
  .badge {
    font-size: 9px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.5px; padding: 2px 7px; border-radius: 5px; color: #fff;
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

  .no-results {
    text-align: center; color: #555; font-size: 15px;
    padding: 80px 20px; display: none;
  }
</style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-row">
      <h1>SVG Gallery</h1>
      <span class="total">${grandTotal} diagrams</span>
      <div class="search-bar">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="search" placeholder="Filter diagrams..." autocomplete="off" spellcheck="false">
      </div>
    </div>
    <div class="tabs" id="tabs">
      ${tabButtons}
    </div>
  </div>

  <div class="no-results" id="no-results">No diagrams match your search.</div>

  <div id="gallery">
    ${tabPages}
  </div>

  <script>
    // ── Tab routing ──
    function switchTab(slug) {
      document.querySelectorAll('.tab-page').forEach(p => p.style.display = 'none');
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      const page = document.getElementById('page-' + slug);
      const tab = document.querySelector('.tab[data-tab="' + slug + '"]');
      if (page) page.style.display = '';
      if (tab) tab.classList.add('active');
      // Show first unit by default if no unit hash
      const hash = location.hash.slice(1);
      if (!hash.startsWith(slug + '/')) {
        const firstUnit = page && page.querySelector('.sidebar-unit');
        if (firstUnit) {
          const unitSlug = firstUnit.getAttribute('data-unit');
          location.hash = unitSlug;
          return;
        }
      }
    }

    function switchUnit(unitSlug) {
      const courseSlug = unitSlug.split('/')[0];
      // Ensure correct tab is active
      document.querySelectorAll('.tab-page').forEach(p => p.style.display = 'none');
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      const page = document.getElementById('page-' + courseSlug);
      const tab = document.querySelector('.tab[data-tab="' + courseSlug + '"]');
      if (page) page.style.display = '';
      if (tab) tab.classList.add('active');
      // Hide all unit pages in this course, show target
      if (page) {
        page.querySelectorAll('.unit-page').forEach(u => u.style.display = 'none');
        const unitPage = document.getElementById('unit-' + unitSlug);
        if (unitPage) unitPage.style.display = '';
      }
      // Activate sidebar link
      document.querySelectorAll('.sidebar-unit').forEach(s => s.classList.remove('active'));
      const sidebarLink = document.querySelector('.sidebar-unit[data-unit="' + unitSlug + '"]');
      if (sidebarLink) sidebarLink.classList.add('active');
      // Update hash without triggering scroll
      if (location.hash !== '#' + unitSlug) {
        history.replaceState(null, '', '#' + unitSlug);
      }
    }

    // ── Hash change listener ──
    function handleHash() {
      const hash = location.hash.slice(1);
      if (!hash) {
        const firstTab = document.querySelector('.tab');
        if (firstTab) {
          const slug = firstTab.getAttribute('data-tab');
          const page = document.getElementById('page-' + slug);
          const firstUnit = page && page.querySelector('.sidebar-unit');
          if (firstUnit) {
            location.hash = firstUnit.getAttribute('data-unit');
            return;
          }
        }
        return;
      }
      if (hash.includes('/')) {
        switchUnit(hash);
      } else {
        switchTab(hash);
      }
    }
    window.addEventListener('hashchange', handleHash);
    handleHash();

    // ── Search ──
    const input = document.getElementById('search');
    input.addEventListener('input', function() {
      const q = this.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.card');
      let visible = 0;
      cards.forEach(card => {
        const match = !q || card.dataset.search.includes(q);
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });
      document.querySelectorAll('.lesson-group').forEach(lg => {
        lg.style.display = lg.querySelector('.card:not(.hidden)') ? '' : 'none';
      });
      document.getElementById('no-results').style.display = visible === 0 && q ? 'block' : 'none';
    });
  </script>
</body>
</html>`;

  // Also write standalone copy for fallback
  const standaloneOutputPath = path.join(ROOT, 'svg-gallery-standalone.html');
  fs.writeFileSync(standaloneOutputPath, standaloneHtml, 'utf-8');

  // ── Inject SVG diagram section into gallery.html ────────────────

  const MARKER_START = '<!-- SVG-GALLERY-START -->';
  const MARKER_END = '<!-- SVG-GALLERY-END -->';

  // Build inline diagram grid grouped by course > unit > lesson
  let diagramSections = '';
  for (const course of courses) {
    diagramSections += `<details class="course-details" open style="margin:0 0 16px 0;">
      <summary style="display:flex;align-items:center;gap:12px;padding:14px 18px;background:#111;border-radius:14px;cursor:pointer;list-style:none;border:1px solid #222;">
        <span style="font-size:18px;font-weight:900;flex:1;">${escapeHtml(course.name)}</span>
        <span style="padding:2px 10px;background:#1a1a2e;border-radius:10px;font-size:12px;font-weight:800;color:#818CF8;">${course.totalDiagrams}</span>
      </summary>\n`;
    for (const unit of course.units) {
      const uc = unit.lessons.reduce((s, l) => s + l.diagrams.length, 0);
      diagramSections += `  <details style="margin:12px 0 12px 12px;" open>
        <summary style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#0f0f1a;border-radius:10px;cursor:pointer;list-style:none;border:1px solid #1a1a2e;">
          <span style="font-size:18px;">${unit.unitIcon}</span>
          <span style="font-size:14px;font-weight:800;flex:1;">${escapeHtml(unit.unitTitle)}</span>
          <span style="padding:2px 8px;background:#1a1a2e;border-radius:8px;font-size:11px;font-weight:800;color:#818CF8;">${uc}</span>
        </summary>\n`;
      for (const lesson of unit.lessons) {
        diagramSections += `    <div style="margin:12px 0 20px 20px;">
          <div style="font-size:13px;font-weight:700;color:#888;margin-bottom:10px;">${escapeHtml(lesson.lessonTitle)} <span style="padding:1px 7px;background:#1a1a2e;border-radius:6px;font-size:10px;font-weight:800;color:#818CF8;margin-left:6px;">${lesson.diagrams.length}</span></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;">\n`;
        for (const d of lesson.diagrams) {
          const badgeColors: Record<string, string> = { teaching:'#7C3AED', 'multiple-choice':'#2563EB', 'true-false':'#059669', 'fill-blank':'#D97706', 'category-swipe':'#4F46E5', 'match-pairs':'#DB2777', 'sort-buckets':'#DC2626', 'image-tap':'#7C2D12' };
          const bc = badgeColors[d.questionType] || '#555';
          diagramSections += `            <div style="background:#111;border:1px solid #1a1a2e;border-radius:12px;overflow:hidden;">
              <div style="background:#fff;border:2px solid #E5E5E5;border-radius:10px;margin:8px;padding:10px;display:flex;align-items:center;justify-content:center;min-height:120px;overflow:hidden;">${d.diagram}</div>
              <div style="padding:4px 12px 10px;display:flex;flex-wrap:wrap;align-items:center;gap:5px;">
                <code style="font-size:9px;font-weight:700;color:#555;background:#1a1a1a;padding:2px 6px;border-radius:4px;">${escapeHtml(d.questionId)}</code>
                <span style="font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.4px;padding:2px 6px;border-radius:4px;color:#fff;background:${bc};">${escapeHtml(d.questionType)}</span>
                <p style="width:100%;font-size:11px;font-weight:600;color:#777;line-height:1.4;margin:2px 0 0;">${escapeHtml(d.questionText)}</p>
              </div>
            </div>\n`;
        }
        diagramSections += `          </div>\n    </div>\n`;
      }
      diagramSections += `  </details>\n`;
    }
    diagramSections += `</details>\n`;
  }

  const sectionHtml = `${MARKER_START}
<div class="sec">SVG Diagram Gallery <span style="font-size:10px;color:#818CF8;font-weight:800;background:#1a1a2e;padding:2px 10px;border-radius:8px;margin-left:8px;vertical-align:middle;">${grandTotal}</span></div>
<div style="max-width:1400px;margin:0 auto;padding:0 20px;">
${diagramSections}
</div>
${MARKER_END}`;

  const galleryPath = path.join(ROOT, 'gallery.html');
  if (!fs.existsSync(galleryPath)) {
    console.error('\ngallery.html not found. Cannot inject SVG gallery section.');
    return;
  }

  let galleryHtml = fs.readFileSync(galleryPath, 'utf-8');

  // Remove previous injection if present (idempotent)
  const startIdx = galleryHtml.indexOf(MARKER_START);
  const endIdx = galleryHtml.indexOf(MARKER_END);
  if (startIdx !== -1 && endIdx !== -1) {
    galleryHtml = galleryHtml.slice(0, startIdx) + galleryHtml.slice(endIdx + MARKER_END.length);
  }

  // Inject before the footer div
  const footerMarker = '<div style="text-align:center;margin-top:64px;';
  const insertIdx = galleryHtml.indexOf(footerMarker);
  if (insertIdx !== -1) {
    galleryHtml = galleryHtml.slice(0, insertIdx) + sectionHtml + '\n\n' + galleryHtml.slice(insertIdx);
  } else {
    // Fallback: inject before </body>
    galleryHtml = galleryHtml.replace('</body>', sectionHtml + '\n</body>');
  }

  fs.writeFileSync(galleryPath, galleryHtml, 'utf-8');
  console.log(`SVG gallery section injected into ${galleryPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
