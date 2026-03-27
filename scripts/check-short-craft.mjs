#!/usr/bin/env node
/**
 * SHORT names (4-8 chars) that evoke skills, craft, mastery, courses
 * Think: Udemy, Canva, Figma — but for a gamified skills learning platform
 */

const candidates = [
  // === 4-5 CHAR INVENTED (most valuable) ===
  "skilz", "krafz", "levlo", "dexly", "gilde",
  "adept", "knack", "forte", "savvy", "acumo",
  "dextr", "aptly", "gifta", "honed", "versa",
  "dexia", "abliq", "fitly", "nimbo", "droit",
  "profy", "skivy", "crafz", "guilz", "rankz",
  "nifty", "canny", "handy", "ready", "primed",
  "gusto", "vigor", "verve", "moxie", "pluck",
  "spunk", "nerve", "gumpt", "merit", "prowl",
  "knakt", "grasp", "gripp", "clout", "chops",
  "smartz", "wittz", "brayn", "thynk", "cogni",

  // === 5-6 CHAR BRANDABLE ===
  "skilr", "crafr", "dexr", "guilr", "rankr",
  "levlr", "grwth", "mastr", "profi", "xpert",
  "levrn", "kurso", "klass", "tutly", "guidr",
  "drilo", "pracr", "testz", "quizo", "studr",
  "buildr", "makrr", "formr", "shapd", "moldz",
  "skilbo", "crafbo", "dexbo", "guilbo", "rankbo",
  "skillz", "kraftz", "praxo", "tekna", "ergon",
  "talnt", "flair", "knakk", "acura", "poise",

  // === 5-7 CHAR CUTE/QUIRKY ===
  "skibi", "krafy", "guildi", "ranky", "dexy",
  "profy", "mastr", "crafti", "buildi", "formi",
  "skillo", "krafo", "guildo", "ranko", "dexo",
  "profio", "mastro", "crafto", "buildo", "formo",
  "skilly", "kraffy", "guildy", "rankey", "dexey",
  "profey", "mastey", "crafty", "buildey", "formey",
  "skilz", "kraftz", "guildz", "rankzz", "dexyz",
  "profyz", "mastrz", "craftz", "buildz", "formz",

  // === REAL WORDS (skill/craft vibes) ===
  "forge", "guild", "craft", "honed", "adept",
  "deft", "keen", "ablr", "aptiq", "nimbl",
  "swift", "sharp", "smart", "quick", "brisk",
  "prime", "elite", "apex", "zenith", "acme",
  "forte", "knack", "flair", "savvy", "guile",
  "merit", "vigor", "verve", "moxie", "pluck",
  "grist", "mettle", "fibre", "sinew", "steel",

  // === COURSE/LEARNING VIBES (short) ===
  "kurso", "korso", "kursi", "korse", "korsi",
  "lessn", "lectr", "lecrn", "tutol", "guido",
  "drilo", "praxo", "practi", "studr", "reviu",
  "testa", "quizo", "gradi", "certi", "diplo",
  "clasq", "semio", "worko", "labbo", "shopo",
  "campi", "booti", "sprir", "tracq", "cohor",

  // === GAMIFICATION + SKILL ===
  "xpify", "lvlup", "rankd", "classd", "tierd",
  "questd", "achivd", "badgd", "strekd", "combd",
  "xpskl", "lvlsk", "upgrd", "evlvo", "growz",
  "buffd", "powrd", "bostd", "juicd", "ampd",

  // === JAPANESE/EURO INSPIRED (short) ===
  "jutsu", "waza", "sensu", "katai", "jouzu",
  "takum", "shobu", "kyoka", "rensa", "shori",
  "dexo", "praxo", "techne", "ergon", "poima",
  "areti", "sophi", "gnosi", "metis", "nous",

  // === ABSTRACT BRAND (Figma/Canva style) ===
  "skylo", "nexvo", "pixla", "voxly", "foxly",
  "boxly", "rexly", "hexly", "texly", "lexly",
  "zuply", "cuply", "tuply", "nuply", "buply",
  "zimra", "kimra", "rimra", "dimra", "nimra",
  "velra", "zelra", "belra", "delra", "gelra",
  "kulma", "fulma", "gulma", "hulma", "julma",
  "vyndo", "kyndo", "ryndo", "dyndo", "lyndo",
  "zurbi", "kurbi", "rurbi", "durbi", "lurbi",

  // === TOOL/WORKSHOP VIBES ===
  "anvyl", "hamra", "chisl", "grndz", "bensh",
  "vyzor", "kompz", "gauga", "levla", "rulra",
  "wrenc", "pilar", "bolta", "rivta", "wedga",

  // === -FY / -LY / -IO ENDINGS (app-like) ===
  "skilfy", "crafty", "dexfy", "guilfy", "rankfy",
  "skilyo", "crafyo", "dexyo", "guilyo", "rankyo",
  "skilio", "crafio", "dexio", "guilio", "rankio",

  // === ULTRA SHORT INVENTED (4 chars) ===
  "skyl", "kraf", "dexr", "gild", "ranq",
  "prof", "masr", "bild", "form", "mold",
  "aced", "dril", "quiz", "test", "grok",
  "grwn", "lvld", "rnkd", "prkd", "bstd",
  "zuvo", "kifo", "relo", "dimo", "nifo",
  "vefo", "zefo", "befo", "defo", "gefo",

  // === FRESH INVENTED 5-6 CHAR ===
  "sklly", "krfty", "dxtly", "gldly", "rnkly",
  "prfly", "msrly", "bldly", "frmly", "mldly",
  "zuply", "kiply", "riply", "diply", "niply",
  "vexly", "zexly", "bexly", "dexly", "gexly",
  "vorbi", "zorbi", "borbi", "dorbi", "gorbi",
  "fulvo", "gulvo", "hulvo", "julvo", "kulvo",

  // === POWER WORDS (short, punchy) ===
  "gritz", "husle", "grind", "surge", "pulse",
  "spark", "blaze", "flash", "burst", "crush",
  "boost", "climb", "soar", "rise", "leap",
  "bound", "vault", "dash", "rush", "bolt",

  // === MASTERY NAMES ===
  "masra", "masei", "proly", "skild", "crafd",
  "guildd", "exprt", "vetrd", "seasd", "tempd",
  "honed", "tuned", "drild", "pracd", "grild",
];

const unique = [...new Set(candidates)];
console.error(`Checking ${unique.length} SHORT candidates...`);

const CONCURRENCY = 10;
const DELAY_MS = 80;
const available = [];
let checked = 0;

async function checkDomain(name) {
  const domain = `${name}.com`;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`https://rdap.verisign.com/com/v1/domain/${domain}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/rdap+json' }
    });
    clearTimeout(timeout);
    checked++;
    if (res.status === 404) {
      available.push(name);
      console.error(`  ✓ ${domain} (${checked}/${unique.length})`);
    } else {
      if (checked % 50 === 0) console.error(`  ... ${checked}/${unique.length} (${available.length} avail)`);
    }
  } catch (err) { checked++; }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  for (let i = 0; i < unique.length; i += CONCURRENCY) {
    const batch = unique.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(checkDomain));
    if (i + CONCURRENCY < unique.length) await sleep(DELAY_MS);
  }
  console.error(`\nDone: ${available.length}/${checked}`);
  console.log(JSON.stringify(available, null, 2));
}

main().catch(console.error);
