#!/usr/bin/env node
/**
 * Round 3: Highly curated brandable names
 * Thinking like a naming agency — Figma, Canva, Notion quality
 */

const candidates = [
  // === TIER 1: INVENTED WORDS THAT SOUND LIKE REAL PRODUCTS ===
  // (modeled after: Duolingo, Quizlet, Canva, Figma, Notion)
  "studra", "quorvo", "lernia", "revuo", "cogniq",
  "praxio", "memora", "cortva", "syntra", "fluxa",
  "clevra", "knowva", "witza", "braina", "thinka",
  "leapra", "sparkra", "questia", "levlia", "ranqo",
  "streaka", "cruxia", "nexvia", "pivra", "corvia",
  "brightio", "keenva", "adera", "zestia", "vimla",

  // === TIER 2: REAL WORDS WITH A TWIST ===
  "leapday", "snapday", "sparkday", "questday", "zestday",
  "cleverly", "deftiq", "adeptly", "handily", "readil",
  "earnest", "avidity", "aplenty", "acuity", "acumen",

  // === TIER 3: PORTMANTEAU NAMES ===
  "learnova", "quizora", "studiva", "brainova", "prepova",
  "learnex", "quizex", "studex", "brainex", "prepex",
  "learnica", "quiznica", "studica", "brainica", "prepica",
  "learnily", "quizzily", "studily", "brainily", "preppily",

  // === TIER 4: FUN SOUNDS (Kahoot energy) ===
  "kablammo", "kazango", "zapango", "whomple", "boomba",
  "zoomla", "whamza", "kapingo", "bazango", "fandango",
  "zipplo", "snapplo", "bopplo", "popplo", "hipplo",
  "toodloo", "yahoola", "hubbloo", "bimbloo", "zimbloo",

  // === TIER 5: CUTE BUT PROFESSIONAL ===
  "pebbly", "acorny", "seedling", "sproutly", "budling",
  "bloomy", "leafly", "rootsy", "stemmy", "vinezy",
  "nestled", "cozily", "warmly", "brightly", "kindly",

  // === TIER 6: ABSTRACT PREMIUM ===
  "velora", "zelkova", "ondera", "trimba", "stelvio",
  "aldora", "bernix", "celvio", "delvra", "elvora",
  "felvix", "gelvra", "helvio", "jelvra", "kelvio",
  "lelvra", "melvio", "nelvra", "pelvio", "relvra",

  // === TIER 7: DIRECTION/MOVEMENT NAMES ===
  "upwrd", "onwrd", "frwrd", "nxtlvl", "stpup",
  "leapfwd", "pushfwd", "movefwd", "goahead", "stepfwd",
  "riseup", "climbup", "moveup", "goupnow", "keepup",

  // === TIER 8: GAMIFICATION BRAND NAMES ===
  "xpquest", "xplevel", "xpboost", "xpbloom", "xpgrind",
  "gemquest", "gemboost", "gembloom", "gemgrind", "gemlevel",
  "starbloom", "starquest", "starlevel", "starboost", "stargrind",

  // === TIER 9: FRESH INVENTED (soft sounds, easy mouth feel) ===
  "lumeno", "clarivo", "mentivo", "cultivo", "instruo",
  "docendo", "sapiva", "erudivo", "cognivo", "prudiva",
  "amico", "facilo", "rapido", "pronto", "subito",
  "allegro", "vivace", "bravura", "virtuoso", "maestro",

  // === TIER 10: QUIRKY COMPOUND ===
  "smartbean", "cleverbean", "brainbean", "studybean", "learnbean",
  "smartpea", "cleverpea", "brainpea", "studypea", "learnpea",
  "smartseed", "cleverseed", "brainseed", "studyseed", "learnseed",
  "smartbud", "cleverbud", "brainbud", "studybud", "learnbud",

  // === TIER 11: -ISH / -LET / -KIN (endearing diminutives) ===
  "brainish", "studish", "learnish", "quizish", "cleverish",
  "brainkin", "studkin", "learnkin", "quizkin", "cleverkin",
  "brainlet", "studlet", "learnlet", "quizlet", "cleverlet",

  // === TIER 12: NATURE + LEARNING ===
  "oakmind", "pinemind", "cedarmind", "willowmind", "birchind",
  "stonewise", "flintwise", "peakwise", "rivermind", "oceanmind",
  "skymind", "sunmind", "moonmind", "starmind", "rainmind",

  // === TIER 13: PLAYFUL -O ENDING (like Figma, Jira) ===
  "quizmo", "learnmo", "studmo", "brainmo", "thinkmo",
  "quizvo", "learnvo", "studvo", "brainvo", "thinkvo",
  "quizpo", "learnpo", "studpo", "brainpo", "thinkpo",
  "quizro", "learnro", "studro", "brainro", "thinkro",
  "quizto", "learnto", "studto", "brainto", "thinkto",

  // === TIER 14: PREMIUM FEEL (like Notion, Linear) ===
  "meridia", "zenitha", "apogeea", "nadiria", "verticx",
  "horizova", "prismia", "spectra", "luminia", "radiova",
  "aurorix", "eclipsa", "nebuliq", "orbitva", "cosmica",

  // === TIER 15: SIMPLE REAL WORD COMBOS ===
  "dailydrill", "dailyquiz", "dailylearn", "dailystudy", "dailygrind",
  "everlearn", "everquiz", "everstudy", "everdrill", "evergrind",
  "quickmind", "quickwit", "quicklearn", "quickstudy", "quickgrind",

  // === TIER 16: ONE-WORD ENERGY ===
  "ignitra", "kindlra", "sparkra", "blazera", "flashra",
  "surgera", "pulsera", "burstera", "boomera", "crashra",
  "thrivera", "bloomera", "growera", "risera", "leapera",

  // === TIER 17: SUPER SHORT INVENTED ===
  "quvo", "stuvo", "lrno", "brano", "crmo",
  "zevo", "kevo", "revo", "devo", "nevo",
  "zimu", "kimu", "rimu", "dimu", "nimu",
  "zako", "kako", "rako", "dako", "nako",
  "zupo", "kupo", "rupo", "dupo", "nupo",

  // === TIER 18: TRENDING STYLE (2025-2026 startup names) ===
  "learnably", "studyably", "quizably", "thinkably", "growably",
  "learnfully", "studyfully", "quizfully", "thinkfully", "growfully",
  "learnwise", "quizwise", "thinkwise", "growwise", "mindwise",

  // === TIER 19: FRESH MASHUPS ===
  "wisdomo", "knowledgio", "intellecta", "scholarix", "savanica",
  "mentorva", "tutoriq", "guideva", "coachix", "trainova",
  "practico", "rehearso", "reviewix", "reviseva", "retainova",

  // === TIER 20: FINAL CREATIVE BATCH ===
  "zulearn", "kilearn", "rilearn", "dilearn", "nilearn",
  "ziquiz", "kiquiz", "riquiz", "diquiz", "niquiz",
  "zustudy", "kistudy", "ristudy", "distudy", "nistudy",
  "zumind", "kimind", "rimind", "dimind", "nimind",
  "zuknow", "kiknow", "riknow", "diknow", "niknow",
];

const unique = [...new Set(candidates)];
console.error(`Checking ${unique.length} candidates...`);

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
      if (checked % 50 === 0) console.error(`  ... ${checked}/${unique.length} (${available.length} avail)`);
    }
  } catch (err) {
    checked++;
  }
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
