#!/usr/bin/env node
/**
 * Round 2: Shorter, punchier, more brandable names
 */

const candidates = [
  // === SHORT INVENTED WORDS (5-7 chars, most valuable) ===
  "preplr", "quizly", "drilr", "acely", "grindr",
  "prepzi", "quizzi", "drilzi", "learzi", "studzi",
  "prepko", "quizko", "drilko", "learko", "studko",
  "prepyo", "quizyo", "drilyo", "learyo", "studyo",
  "prepex", "quizex", "drilex", "learex", "studex",
  "prepix", "quizix", "drilix", "learix", "studix",
  "prepra", "quizra", "drilra", "learra", "studra",
  "prepsy", "quizsy", "drilsy", "learsy", "studsy",
  "preply", "quizly", "drilly", "learly", "studly",

  // === ABSTRACT SINGLE WORDS ===
  "acero", "drilln", "prept", "quizn", "learnd",
  "prepd", "quizd", "driild", "studyd", "skilld",
  "prepo", "quizo", "drillo", "learno", "stuudo",
  "prevu", "brainvu", "mindvu", "studvu", "quizvu",

  // === CATCHY BRAND NAMES (startup-style) ===
  "cerebro", "synaptik", "cognito", "axoniq", "dendrix",
  "neurix", "cortiq", "brainly", "mindly", "thinkly",
  "logiqo", "reasonix", "deducto", "inferra", "cognica",
  "mentalix", "brainio", "mindio", "thinkio", "logicio",

  // === DUOLINGO-INSPIRED (playful mascot vibes) ===
  "owlprep", "foxlearn", "beequiz", "antdrill", "apequiz",
  "elklearn", "ramprep", "hawkprep", "lynxprep", "wolfprep",
  "bearquiz", "eagleprep", "falcprep", "lionprep", "tigerprep",

  // === ACTION WORDS ===
  "cramit", "acethis", "nailit", "crushit", "smashit",
  "sendit", "makeit", "passit", "landit", "gotit",
  "tackleit", "solvedit", "provedit", "ownedit", "earnedit",

  // === MODERN TECH BRANDS ===
  "prepflow", "drillflow", "quizflow", "learnflow", "skillflow",
  "prepio", "drillio", "quizio", "learnio", "skillio",
  "prepfy", "drillfy", "quizfy", "learnfy", "skillfy",
  "preply", "drillly", "quizly", "learnly", "skillly",
  "prepmx", "drillmx", "quizmx", "learnmx", "skillmx",

  // === REALLY SHORT (4-5 chars) ===
  "prpd", "qzly", "drlr", "acly", "grnd",
  "kewl", "aced", "drld", "qzzd", "lrnd",
  "acee", "dril", "quix", "lern", "stdy",
  "pryp", "qriz", "drul", "lurm", "skyl",
  "kram", "cram", "grok", "gruk", "druk",

  // === VOWEL-ENDING BRANDABLE ===
  "preppie", "drilloe", "quizoo", "learnee", "studee",
  "preppoo", "drillee", "quizzee", "learnoo", "studoo",
  "prepha", "drillha", "quizha", "learnha", "studha",

  // === METAPHORICAL ===
  "vaultprep", "arsenalprep", "armoryprep", "bastionprep",
  "citadelprep", "fortressprep", "bunkerprep", "towerprep",
  "beaconprep", "compassprep", "anchorprep", "shieldprep",

  // === CREATIVE COMBOS ===
  "prepjam", "drilljam", "quizjam", "learnjam", "skilljam",
  "preptap", "drilltap", "quiztap", "learntap", "skilltap",
  "prepzen", "drillzen", "quizzen", "learnzen", "skillzen",
  "prepnow", "drillnow", "quiznow", "learnnow", "skillnow",
  "prepup", "drillup", "quizup", "learnup", "skillup",

  // === PREMIUM SOUNDING ===
  "luminary", "meridian", "zenithprep", "apexprep", "pinnacleprep",
  "ascendprep", "elevateprep", "catalystprep", "empowerprep",
  "amplifyprep", "magnifyprep", "accelerateprep",

  // === WORDPLAY ===
  "prepception", "quizception", "learnception", "drillception",
  "prepulous", "quizulous", "learnulous", "drillulous",
  "preptastic", "quiztastic", "learntastic", "drilltastic",
  "preplicious", "quizlicious", "learnlicious", "drilllicious",

  // === FRESH SINGLE WORDS ===
  "snaplearn", "zipquiz", "flashdrill", "boltprep", "dartprep",
  "sprintlearn", "daskquiz", "swoopprep", "glidelearn",
  "voomprep", "zestlearn", "punchquiz", "popdrill", "buzzprep",

  // === APP-STYLE NAMES ===
  "getprepped", "goprepare", "beprepped", "iamprepped",
  "justprepped", "wellprepped", "fullyprepped", "superprepped",
  "overprepped", "ultraprepped", "maxprepped", "megaprepped",

  // === DOMAIN-SPECIFIC BUT EXPANDABLE ===
  "techprept", "stemprep", "sciprep", "engprep", "coreprep",
  "fundprep", "basixprep", "rootprep", "atomprep", "ionprep",
  "protonprep", "electronprep", "quantprep", "nanoprep", "microprep",

  // === UNIQUE SOUNDS ===
  "zyphir", "krypton", "phazon", "nexora", "vextra",
  "zoltar", "kruxle", "plexin", "traxon", "vyndex",
  "zorbit", "cruxly", "plexor", "traxly", "vyndra",
  "zephon", "kruxor", "plexra", "traxor", "vyndor",

  // === EDUCATION-FOCUSED ===
  "tutorly", "coachly", "mentorly", "guidely", "teachly",
  "trainly", "drillly", "practicly", "reviewly", "testly",
  "examly", "gradely", "scorely", "passly", "certly",

  // === MORE CREATIVE SHORT NAMES ===
  "oquiz", "uprep", "adrill", "elearn", "istudy",
  "yquiz", "oprep", "edrill", "alearn", "ustudy",
  "xquiz", "wprep", "zdrill", "qlearn", "jstudy",
];

const unique = [...new Set(candidates)];
console.error(`Checking ${unique.length} domain candidates (round 2)...`);

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
  console.error(`\nRound 2 done: ${available.length} available out of ${checked}`);
  console.log(JSON.stringify(available, null, 2));
}

main().catch(console.error);
