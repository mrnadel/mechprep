const fs = require('fs');

function extractUnitsAndLessons(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const lines = content.split('\n');
  const units = [];
  let currentUnit = null;

  for (let i = 0; i < lines.length; i++) {
    const unitIdMatch = lines[i].match(/^\s+id:\s*['"]([a-z]+-s\d+-u\d+)['"]/);
    if (unitIdMatch && !unitIdMatch[1].includes('-L')) {
      let title='', desc='', color='', icon='', sectionIndex=0, sectionTitle='';
      for (let j = i+1; j < Math.min(i+8, lines.length); j++) {
        let t = lines[j].match(/title:\s*['"](.+?)['"]/);
        if (t) { title = t[1]; continue; }
        let d = lines[j].match(/description:\s*['"](.+?)['"]/);
        if (d) { desc = d[1]; continue; }
        let c = lines[j].match(/color:\s*['"](.+?)['"]/);
        if (c) { color = c[1]; continue; }
        let ic = lines[j].match(/icon:\s*['"](.+?)['"]/);
        if (ic) { icon = ic[1]; continue; }
        let si = lines[j].match(/sectionIndex:\s*(\d+)/);
        if (si) { sectionIndex = parseInt(si[1]); continue; }
        let st = lines[j].match(/sectionTitle:\s*['"](.+?)['"]/);
        if (st) { sectionTitle = st[1]; continue; }
      }
      currentUnit = { id: unitIdMatch[1], title, desc, color, icon, sectionIndex, sectionTitle, lessons: [] };
      units.push(currentUnit);
      continue;
    }

    const lessonMatch = lines[i].match(/^\s+id:\s*['"]([a-z]+-s\d+-u\d+-L\d+)['"]/);
    if (lessonMatch && currentUnit) {
      let title='', desc='', icon='', type=null, xpReward=15;
      for (let j = i+1; j < Math.min(i+8, lines.length); j++) {
        let t = lines[j].match(/title:\s*['"](.+?)['"]/);
        if (t) title = t[1];
        let d = lines[j].match(/description:\s*['"](.+?)['"]/);
        if (d) desc = d[1];
        let ic = lines[j].match(/^\s+icon:\s*['"](.+?)['"]/);
        if (ic) icon = ic[1];
        let tp = lines[j].match(/^\s+type:\s*['"](.+?)['"]/);
        if (tp && ['speed-round','conversation','case-study','timeline'].includes(tp[1])) type = tp[1];
        let xp = lines[j].match(/xpReward:\s*(\d+)/);
        if (xp) xpReward = parseInt(xp[1]);
      }
      currentUnit.lessons.push({id: lessonMatch[1], title, desc, icon, type, xpReward});
    }
  }
  return units;
}

function escStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function formatMetaEntries(units) {
  return units.map(u => {
    const lessonsStr = u.lessons.map(l => {
      const typeStr = l.type ? `, type: "${l.type}"` : '';
      return `      { id: "${l.id}", title: "${escStr(l.title)}", description: "${escStr(l.desc)}", icon: "${l.icon}"${typeStr}, xpReward: ${l.xpReward}, questions: [] }`;
    }).join(',\n');

    return `  {
    id: "${u.id}",
    title: "${escStr(u.title)}",
    description: "${escStr(u.desc)}",
    color: "${u.color}",
    icon: "${u.icon}",
    sectionIndex: ${u.sectionIndex},
    sectionTitle: "${escStr(u.sectionTitle)}",
    lessons: [
${lessonsStr},
    ],
  }`;
  }).join(',\n\n');
}

const psy = extractUnitsAndLessons('src/data/course/professions/psychology/units/section-2-perception.ts');
const space = extractUnitsAndLessons('src/data/course/professions/space-astronomy/units/section-4-light.ts');
const fin1 = extractUnitsAndLessons('src/data/course/professions/personal-finance/units/section-13-estate-part1.ts');
const fin2 = extractUnitsAndLessons('src/data/course/professions/personal-finance/units/section-13-estate-part2.ts');

fs.writeFileSync('tmp-psy-meta.txt', formatMetaEntries(psy));
fs.writeFileSync('tmp-space-meta.txt', formatMetaEntries(space));
fs.writeFileSync('tmp-fin-meta.txt', formatMetaEntries([...fin1, ...fin2]));

console.log('Psychology:', psy.length, 'units,', psy.reduce((s,u)=>s+u.lessons.length,0), 'lessons');
console.log('Space:', space.length, 'units,', space.reduce((s,u)=>s+u.lessons.length,0), 'lessons');
console.log('Finance:', fin1.length + fin2.length, 'units,', [...fin1,...fin2].reduce((s,u)=>s+u.lessons.length,0), 'lessons');
