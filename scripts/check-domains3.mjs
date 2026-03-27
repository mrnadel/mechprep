#!/usr/bin/env node
/**
 * Round 3: Premium short brandable names only
 */

const candidates = [
  // === TRULY SHORT & CATCHY (5-8 chars) ===
  "preptly", "questly", "studly", "aceify", "drillr",
  "prepd", "aceit", "grabit", "snagit", "clutchit",
  "knackly", "aptude", "adepti", "fluent", "masteri",
  "profici", "versat", "nimblr", "deftiq", "adroiq",

  // === ONE WORD REAL ENGLISH (aspirational) ===
  "unshaken", "unwaver", "resolute", "steadfast", "tenacious",
  "rigorous", "thorough", "diligent", "assiduous", "unfailing",
  "intrepid", "audacious", "gallant", "valiant", "stalwart",
  "shrewd", "astute", "sagacious", "incisive", "trenchant",

  // === MADE-UP BUT PRONOUNCEABLE ===
  "prezmo", "quizara", "drixel", "lexivo", "korely",
  "nexily", "trivoly", "corexa", "pivora", "axiomo",
  "vexley", "fluxen", "sparqo", "voltiq", "surgex",
  "blazon", "ignitr", "kindlr", "flashr", "boltix",
  "raptiq", "swiftiq", "zestiq", "voomiq", "dashiq",

  // === APP-STYLE SHORT ===
  "getaced", "goaced", "beaced", "doaced", "allaced",
  "getdril", "godrill", "bedrill", "dodrill",
  "goquiz", "bequiz", "doquiz", "allquiz",
  "golearn", "belearn", "dolearn", "alllearn",

  // === METAPHORS (mastery, growth, tools) ===
  "anvilor", "hammeriq", "chiselr", "latheiq", "forgeiq",
  "crucibr", "temperd", "quenchd", "annealr", "hardenr",
  "calibriq", "gaugeiq", "metricr", "scaleiq", "leveliq",

  // === FRESH COMPOUND ===
  "topaced", "wellaced", "justaced", "maxaced", "proaced",
  "acepro", "acehq", "acelab", "acekit", "acetool",
  "drillpro", "drillhq", "drilllab", "drillkit", "drilltool",

  // === SOUNDS LIKE A PRODUCT ===
  "brainbit", "mindbit", "quizbit", "learnbit", "drillbit",
  "brainkey", "mindkey", "quizkey", "learnkey", "drillkey",
  "brainseed", "mindseed", "quizseed", "learnseed", "drillseed",

  // === PLAYFUL ===
  "quizwhiz", "prepwhiz", "drillwhiz", "learnwhiz", "studwhiz",
  "quizbuzz", "prepbuzz", "drillbuzz", "learnbuzz", "studbuzz",
  "quizsnap", "prepsnap", "drillsnap", "learnsnap", "studsnap",

  // === GREEK/LATIN ROOTS ===
  "practiq", "theoria", "gnosis", "technia", "sophia",
  "mathema", "scienta", "doctiq", "eruditr", "sapienr",

  // === REALLY SHORT ===
  "acev", "acew", "acex", "acey", "acez",
  "drla", "drlb", "drlx", "drly", "drlz",
  "prea", "preb", "prec", "pred", "pref",
  "quza", "quzb", "quzc", "quzd", "quze",
  "lrna", "lrnb", "lrnc", "lrnd", "lrne",

  // === CLEAN 6-7 LETTER BRANDS ===
  "acedor", "drilor", "prepor", "quizor", "studor",
  "acelix", "drilix", "preplix", "quizlix", "studlix",
  "acenox", "drilnox", "prepnox", "quiznox", "studnox",
  "acewyn", "drilwyn", "prepwyn", "quizwyn", "studwyn",
  "acevex", "drilvex", "prepvex", "quizvex", "studvex",

  // === INTERVIEW-THEMED ===
  "hiredge", "offerdge", "placdge", "jobredy", "talntly",
  "intervy", "resumex", "covrltr", "hirekit", "jobnail",

  // === ULTRA PREMIUM FEEL ===
  "prepium", "acemium", "drillium", "quizmium", "learnium",
  "prepara", "aceara", "drillara", "quizara", "learnara",
  "prepova", "aceova", "drillova", "quizova", "learnova",
  "prepero", "acerro", "drillero", "quizero", "learnero",

  // === TRENDING NAMING STYLES ===
  "preply", "acely", "drilly", "quizly", "learnly",
  "prepfy", "acefy", "drillfy", "quizfy", "learnfy",
  "prepio", "aceio", "drillio", "quizio", "learnio",
  "prepso", "aceso", "drillso", "quizso", "learnso",
  "prepha", "aceha", "drillha", "quizha", "learnha",

  // === UNIQUE ABSTRACT ===
  "zyphra", "krixel", "plexum", "traxen", "vyndel",
  "zorpha", "cruxen", "plexia", "traxia", "vyndra",
  "nexuma", "fluxia", "sparqa", "voltia", "surgia",
];

const unique = [...new Set(candidates)];
console.error(`Checking ${unique.length} domain candidates (round 3)...`);

const CONCURRENCY = 10;
const DELAY_MS = 100;
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
      console.error(`  ✓ AVAILABLE: ${domain} (${checked}/${unique.length})`);
    } else {
      if (checked % 50 === 0) console.error(`  ... checked ${checked}/${unique.length} (${available.length} available)`);
    }
  } catch (err) {
    checked++;
    console.error(`  ? ERROR: ${domain} - ${err.message}`);
  }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  for (let i = 0; i < unique.length; i += CONCURRENCY) {
    const batch = unique.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(checkDomain));
    if (i + CONCURRENCY < unique.length) await sleep(DELAY_MS);
  }
  console.error(`\nRound 3 done: ${available.length} available out of ${checked}`);
  console.log(JSON.stringify(available, null, 2));
}

main().catch(console.error);
