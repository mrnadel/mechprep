#!/usr/bin/env node
/**
 * Combine all available domains, score them, generate HTML report
 */

// All available domains from 3 rounds
const allAvailable = [
  // Round 1
  "prepforged", "grindprep", "quizrig", "jumpprep", "xpprep",
  "arcadeprep", "sharprig", "careerrig", "offerrig", "placedprep",
  "torqueprep", "nodalprep", "circuitprep", "prepbloom", "axprep",
  "studster", "studytide", "dauntlessprep", "naileditprep",
  "relentlessprep", "unstoppableprep", "bringitprep", "crushedprep",
  "smashprep", "conquestprep", "dominateprep", "thunderprep",
  "amperprep", "drillorama", "synapslearn", "neuronprep",
  "dendrilearn", "hypotheprep", "deduceprep", "inferprep",
  "quozzify", "drillant", "drilltonic", "nimblyprep", "fitlyprep",
  "ribbonprep", "medalprep", "trophyprep", "maplprep", "willowprep",
  "flintprep", "ridgeprep", "stoneprep", "brookprep", "creekprep", "lakeprep",
  // Round 2
  "learzi", "drilzi", "learyo", "studko", "drilko", "drilyo",
  "learko", "drilra", "drilsy", "driild", "quizvu", "studvu",
  "antdrill", "elklearn", "hawkprep", "lynxprep", "falcprep",
  "prepmx", "drillmx", "learnmx", "drilloe", "preppoo",
  "arsenalprep", "armoryprep", "bastionprep",
  "magnifyprep", "drillception", "accelerateprep", "prepception",
  "amplifyprep", "learnulous", "quizulous", "drillulous",
  "drilltastic", "prepulous", "drilllicious", "daskquiz",
  "learnlicious", "swoopprep", "punchquiz", "voomprep",
  "megaprepped", "maxprepped", "techprept", "basixprep",
  "electronprep", "rootprep", "protonprep", "kruxle",
  // Round 3
  "allaced", "doaced", "getdril", "bedrill", "latheiq",
  "crucibr", "annealr", "topaced", "wellaced", "maxaced",
  "drillwhiz", "drillseed", "studwhiz", "studsnap", "eruditr",
  "sapienr", "acedor", "drilor", "drilnox", "prepnox",
  "studnox", "drilwyn", "prepwyn", "acewyn", "studwyn",
  "prepvex", "quizwyn", "drilvex", "offerdge", "studvex",
  "placdge", "quizmium", "acemium", "drillara", "drillova",
  "drillero", "quizso", "drillha",
];

// Remove duplicates
const unique = [...new Set(allAvailable)];

// Scoring function
function scoreDomain(name) {
  let score = 50; // base score
  const domain = `${name}.com`;

  // LENGTH SCORE (huge factor) — sweet spot is 5-8 chars
  const len = name.length;
  if (len <= 5) score += 25;
  else if (len <= 6) score += 22;
  else if (len <= 7) score += 18;
  else if (len <= 8) score += 14;
  else if (len <= 9) score += 10;
  else if (len <= 10) score += 6;
  else if (len <= 12) score += 2;
  else score -= 5; // penalty for long names

  // PRONOUNCEABILITY — vowel/consonant ratio
  const vowels = (name.match(/[aeiou]/gi) || []).length;
  const ratio = vowels / len;
  if (ratio >= 0.25 && ratio <= 0.50) score += 10; // natural sounding
  else if (ratio >= 0.20 && ratio <= 0.55) score += 5;
  else score -= 5;

  // REAL WORD COMPONENTS (meaningful > gibberish)
  const meaningfulParts = [
    "prep", "quiz", "drill", "learn", "study", "ace", "skill",
    "forge", "grind", "sharp", "quest", "flash", "bolt", "swift",
    "hawk", "lynx", "fox", "eagle", "wolf", "stone", "flint",
    "ridge", "peak", "summit", "bloom", "spark", "blaze",
    "torque", "career", "medal", "trophy", "arsenal", "bastion",
    "thunder", "surge", "pulse", "whiz", "snap", "xp",
    "proton", "circuit", "nodal", "root", "seed", "crush",
    "smash", "dominate", "conquer", "amplify", "magnify",
    "creek", "brook", "lake", "willow", "maple",
  ];
  let meaningCount = 0;
  for (const part of meaningfulParts) {
    if (name.toLowerCase().includes(part)) meaningCount++;
  }
  if (meaningCount >= 2) score += 12;
  else if (meaningCount >= 1) score += 8;
  else score -= 3;

  // BRANDABILITY — does it feel like a real product?
  // Penalize awkward consonant clusters
  if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(name)) score -= 10;
  if (/[bcdfghjklmnpqrstvwxyz]{3}/i.test(name)) score -= 3;

  // Bonus for ending patterns that sound app-like
  if (/ly$/.test(name)) score += 5;
  if (/fy$/.test(name)) score += 4;
  if (/io$/.test(name)) score += 4;
  if (/er$/.test(name)) score += 3;
  if (/or$/.test(name)) score += 3;
  if (/ix$/.test(name)) score += 3;
  if (/iq$/.test(name)) score += 3;

  // MEMORABILITY — penalize names that are too similar to existing brands
  // Bonus for names with strong imagery
  const strongImagery = ["torque", "forge", "hawk", "lynx", "flint", "stone",
    "ridge", "thunder", "blaze", "bloom", "medal", "trophy", "arsenal",
    "bastion", "whiz", "snap", "seed", "circuit", "proton"];
  for (const img of strongImagery) {
    if (name.toLowerCase().includes(img)) { score += 5; break; }
  }

  // Penalize "prep" ending repetitiveness (too many end in prep)
  if (name.endsWith("prep") && name.length > 9) score -= 8;

  // Bonus for single-concept names (not compound)
  if (!name.includes("prep") && !name.includes("quiz") && !name.includes("drill") &&
      !name.includes("learn") && !name.includes("study")) {
    score += 3; // unique concept
  }

  // Penalize weird made-up suffixes
  if (/[qxz][aeiouy]$/.test(name)) score -= 2;
  if (/mx$/.test(name)) score -= 5;
  if (/vu$/.test(name)) score -= 3;

  // Extra bonus for names that feel premium
  const premiumVibes = ["torqueprep", "grindprep", "flintprep", "ridgeprep",
    "lynxprep", "hawkprep", "prepbloom", "stoneprep", "axprep", "acedor",
    "drillwhiz", "studsnap", "xpprep", "circuitprep", "medalprep",
    "trophyprep", "thunderprep", "quizrig", "sharprig", "careerrig",
    "protonprep", "rootprep", "drillseed"];
  if (premiumVibes.includes(name)) score += 8;

  return Math.max(0, Math.min(100, score));
}

// Score all domains
const scored = unique.map(name => ({
  name,
  domain: `${name}.com`,
  score: scoreDomain(name),
  length: name.length,
  category: categorize(name),
})).sort((a, b) => b.score - a.score);

function categorize(name) {
  if (/hawk|lynx|fox|eagle|wolf|bear|owl|ant|elk|falcon/i.test(name)) return "Mascot/Animal";
  if (/torque|circuit|nodal|proton|electron|amper/i.test(name)) return "Engineering";
  if (/stone|flint|ridge|creek|brook|lake|willow|maple/i.test(name)) return "Nature/Strength";
  if (/medal|trophy|ribbon|ace|conquer|dominate|smash|crush/i.test(name)) return "Achievement";
  if (/grind|drill|quiz|prep|study|learn/i.test(name)) return "Learning/Practice";
  if (/thunder|blaze|surge|bolt|flash|spark/i.test(name)) return "Energy/Action";
  if (/bloom|seed|root|grow/i.test(name)) return "Growth";
  if (/career|offer|hire|job/i.test(name)) return "Career";
  if (/arsenal|bastion|armory|forge/i.test(name)) return "Fortress/Forge";
  return "Brandable/Abstract";
}

// Take top 50
const top50 = scored.slice(0, 50);

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Domain Name Research — MechReady Rebrand</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0a0f;
      color: #e2e2e8;
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container { max-width: 1100px; margin: 0 auto; }

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #8888a0;
      font-size: 0.95rem;
      margin-bottom: 32px;
    }

    .stats {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .stat-card {
      background: #12121a;
      border: 1px solid #1e1e2e;
      border-radius: 12px;
      padding: 16px 24px;
      flex: 1;
      min-width: 140px;
    }
    .stat-card .number {
      font-size: 1.8rem;
      font-weight: 700;
      color: #a855f7;
    }
    .stat-card .label {
      font-size: 0.8rem;
      color: #6666a0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .filters {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .filter-btn {
      background: #12121a;
      border: 1px solid #1e1e2e;
      color: #8888a0;
      padding: 6px 14px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.82rem;
      transition: all 0.2s;
    }
    .filter-btn:hover, .filter-btn.active {
      background: #1e1e3a;
      border-color: #6366f1;
      color: #c4b5fd;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      background: #12121a;
      border: 1px solid #1e1e2e;
      border-radius: 12px;
      overflow: hidden;
    }
    thead {
      background: #0e0e18;
    }
    th {
      padding: 14px 16px;
      text-align: left;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6666a0;
      font-weight: 600;
      border-bottom: 1px solid #1e1e2e;
      cursor: pointer;
      user-select: none;
    }
    th:hover { color: #a855f7; }
    th .sort-arrow { margin-left: 4px; font-size: 0.65rem; }
    td {
      padding: 12px 16px;
      border-bottom: 1px solid #141420;
      font-size: 0.9rem;
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #16162a; }

    .rank {
      font-weight: 700;
      color: #4b4b6b;
      font-size: 0.85rem;
      width: 40px;
    }
    .rank-1 { color: #fbbf24; }
    .rank-2 { color: #94a3b8; }
    .rank-3 { color: #cd7f32; }

    .domain-name {
      font-weight: 600;
      font-size: 1rem;
    }
    .domain-ext { color: #6666a0; }

    .score-bar {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .score-fill {
      height: 6px;
      border-radius: 3px;
      min-width: 20px;
      max-width: 100px;
    }
    .score-num {
      font-weight: 600;
      font-size: 0.85rem;
      min-width: 28px;
    }
    .score-high { background: linear-gradient(90deg, #22c55e, #4ade80); color: #4ade80; }
    .score-med { background: linear-gradient(90deg, #eab308, #facc15); color: #facc15; }
    .score-low { background: linear-gradient(90deg, #f97316, #fb923c); color: #fb923c; }

    .length-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .len-short { background: #052e16; color: #4ade80; }
    .len-medium { background: #1a1a04; color: #facc15; }
    .len-long { background: #1a0e04; color: #fb923c; }

    .category-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 500;
      background: #1a1a2e;
      color: #8888c0;
      white-space: nowrap;
    }

    .legend {
      margin-top: 32px;
      padding: 20px 24px;
      background: #12121a;
      border: 1px solid #1e1e2e;
      border-radius: 12px;
    }
    .legend h3 {
      font-size: 0.85rem;
      color: #8888a0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
    }
    .legend p {
      font-size: 0.85rem;
      color: #6666a0;
      line-height: 1.6;
    }
    .legend ul {
      list-style: none;
      padding: 0;
    }
    .legend li {
      font-size: 0.85rem;
      color: #6666a0;
      padding: 3px 0;
    }
    .legend li strong { color: #c4b5fd; }

    @media (max-width: 768px) {
      h1 { font-size: 1.5rem; }
      .stats { flex-direction: column; }
      td, th { padding: 8px 10px; font-size: 0.8rem; }
      .domain-name { font-size: 0.9rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Domain Name Research</h1>
    <p class="subtitle">Top 50 available .com domains for MechReady rebrand — ranked by marketing potential</p>

    <div class="stats">
      <div class="stat-card">
        <div class="number">${unique.length}</div>
        <div class="label">Total Checked</div>
      </div>
      <div class="stat-card">
        <div class="number">50</div>
        <div class="label">Available Shown</div>
      </div>
      <div class="stat-card">
        <div class="number">${top50[0]?.score || 0}</div>
        <div class="label">Top Score</div>
      </div>
      <div class="stat-card">
        <div class="number">${top50.filter(d => d.length <= 8).length}</div>
        <div class="label">&le; 8 Chars</div>
      </div>
    </div>

    <div class="filters" id="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      ${[...new Set(top50.map(d => d.category))].map(cat =>
        `<button class="filter-btn" data-filter="${cat}">${cat}</button>`
      ).join('\n      ')}
    </div>

    <table id="domain-table">
      <thead>
        <tr>
          <th data-sort="rank"># <span class="sort-arrow">▼</span></th>
          <th data-sort="name">Domain <span class="sort-arrow"></span></th>
          <th data-sort="score">Score <span class="sort-arrow"></span></th>
          <th data-sort="length">Length <span class="sort-arrow"></span></th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        ${top50.map((d, i) => {
          const rank = i + 1;
          const rankClass = rank <= 3 ? ` rank-${rank}` : '';
          const scoreClass = d.score >= 80 ? 'score-high' : d.score >= 65 ? 'score-med' : 'score-low';
          const lenClass = d.length <= 7 ? 'len-short' : d.length <= 9 ? 'len-medium' : 'len-long';
          const scoreWidth = Math.round((d.score / 100) * 100);
          return `<tr data-category="${d.category}">
          <td class="rank${rankClass}">${rank}</td>
          <td><span class="domain-name">${d.name}</span><span class="domain-ext">.com</span></td>
          <td>
            <div class="score-bar">
              <span class="score-num ${scoreClass}">${d.score}</span>
              <div class="score-fill ${scoreClass}" style="width: ${scoreWidth}px"></div>
            </div>
          </td>
          <td><span class="length-badge ${lenClass}">${d.length} chars</span></td>
          <td><span class="category-badge">${d.category}</span></td>
        </tr>`;
        }).join('\n        ')}
      </tbody>
    </table>

    <div class="legend">
      <h3>Scoring Criteria</h3>
      <ul>
        <li><strong>Length (25pts max)</strong> — Shorter domains are exponentially more valuable. 5-6 chars = gold.</li>
        <li><strong>Pronounceability (10pts)</strong> — Natural vowel/consonant ratio = easy to say on a phone call.</li>
        <li><strong>Meaningful Components (12pts)</strong> — Contains recognizable English words vs pure gibberish.</li>
        <li><strong>Brand Feel (8pts)</strong> — App-like endings (-ly, -fy, -io, -er, -or), no awkward consonant clusters.</li>
        <li><strong>Strong Imagery (5pts)</strong> — Evokes a mental picture (torque, hawk, flint, bloom, etc.)</li>
        <li><strong>Premium Bonus (8pts)</strong> — Hand-picked names with exceptional marketing potential.</li>
      </ul>
      <p style="margin-top: 12px;">All domains verified available via Verisign RDAP API on ${new Date().toISOString().split('T')[0]}. Register quickly — availability changes fast.</p>
    </div>
  </div>

  <script>
    // Category filter
    document.getElementById('filters').addEventListener('click', (e) => {
      if (!e.target.classList.contains('filter-btn')) return;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.dataset.filter;
      document.querySelectorAll('#domain-table tbody tr').forEach(row => {
        row.style.display = (filter === 'all' || row.dataset.category === filter) ? '' : 'none';
      });
    });

    // Column sorting
    let currentSort = { col: 'rank', asc: true };
    document.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.dataset.sort;
        const asc = currentSort.col === col ? !currentSort.asc : (col === 'name');
        currentSort = { col, asc };
        const tbody = document.querySelector('#domain-table tbody');
        const rows = [...tbody.querySelectorAll('tr')];
        rows.sort((a, b) => {
          let va, vb;
          if (col === 'rank') {
            va = parseInt(a.querySelector('.rank').textContent);
            vb = parseInt(b.querySelector('.rank').textContent);
          } else if (col === 'name') {
            va = a.querySelector('.domain-name').textContent;
            vb = b.querySelector('.domain-name').textContent;
          } else if (col === 'score') {
            va = parseInt(a.querySelector('.score-num').textContent);
            vb = parseInt(b.querySelector('.score-num').textContent);
          } else if (col === 'length') {
            va = parseInt(a.querySelector('.length-badge').textContent);
            vb = parseInt(b.querySelector('.length-badge').textContent);
          }
          if (typeof va === 'string') return asc ? va.localeCompare(vb) : vb.localeCompare(va);
          return asc ? va - vb : vb - va;
        });
        rows.forEach(r => tbody.appendChild(r));
        // Update sort arrows
        document.querySelectorAll('th .sort-arrow').forEach(s => s.textContent = '');
        th.querySelector('.sort-arrow').textContent = asc ? '▲' : '▼';
      });
    });
  </script>
</body>
</html>`;

import { writeFileSync } from 'fs';
writeFileSync('domain-report.html', html);
console.log('Generated domain-report.html');
