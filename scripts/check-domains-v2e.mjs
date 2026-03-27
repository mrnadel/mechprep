#!/usr/bin/env node
/**
 * Round 5: Targeted gap-fill — cute mascots, short brands, food mashups
 * These patterns have been most successful at finding available + good names
 */

const candidates = [
  // === ANIMAL MASCOT NAMES (alpaca/roo style worked great) ===
  "quizotto", "studotto", "learnotto", "brainotto",  // otter
  "quizunny", "studunny", "learnunny", "brainunny",  // bunny
  "quizilla", "studilla", "learnilla", "brainilla",  // gorilla
  "quizimu", "studimu", "learnimu", "brainimu",      // emu
  "quizala", "studala", "learnala", "brainala",       // koala
  "quizingo", "studingo", "learningo", "braingo",     // flamingo
  "quizmoo", "studmoo", "learnmoo", "brainmoo",      // cow, cute
  "quizpaw", "studpaw", "learnpaw", "brainpaw",
  "quizbear", "studbear", "learnbear", "brainbear",
  "quizcrow", "studcrow", "learncrow", "braincrow",
  "quizduck", "studduck", "learnduck", "brainduck",
  "quizwren", "studwren", "learnwren", "brainwren",
  "quizlark", "studlark", "learnlark", "brainlark",
  "quizfinch", "studfinch", "learnfinch", "brainfinch",

  // === FOOD MASHUPS (quirky, memorable) ===
  "quizmatcha", "studmatcha", "learnmatcha", "brainmatcha",
  "quizlatte", "studlatte", "learnlatte", "brainlatte",
  "quizpeach", "studpeach", "learnpeach", "brainpeach",
  "quizmango", "studmango", "learnmango", "brainmango",
  "quizmelon", "studmelon", "learnmelon", "brainmelon",
  "quizberry", "studberry", "learnberry", "brainberry",
  "quizcookie", "studcookie", "learncookie", "braincookie",
  "quizbento", "studbento", "learnbento", "brainbento",
  "quizpancake", "studpancake", "learnpancake", "brainpancake",

  // === SHORT INVENTED BRANDS (5-7 chars, Canva/Figma style) ===
  "quilbi", "stumbi", "lerba", "brenvo", "cramvo",
  "flixl", "glumo", "hymba", "jynka", "klyva",
  "pluxo", "qyrma", "slora", "tryba", "vloma",
  "wrexo", "xylba", "zyngo", "bleva", "creva",
  "drova", "frola", "grova", "trova", "vrola",
  "zulia", "kimba", "rilba", "dimba", "nimba",
  "vorly", "morly", "korly", "jorly", "gorly",
  "borly", "dorly", "forly", "horly", "lorly",
  "norly", "porly", "rorly", "sorly", "torly",
  "worly", "yorly", "zurly", "kurly", "rurly",

  // === CUTE SOUNDS (TikTok/Bumble energy) ===
  "bopsy", "popsy", "topsy", "hopsy", "mopsy",
  "wipsy", "tipsy", "nipsy", "sipsy", "dipsy",
  "bipsy", "kipsy", "lipsy", "ripsy", "zipsy",
  "bumpy", "lumpy", "dumpy", "pumpy", "stumpy",
  "blobby", "globby", "knobby", "snobby", "slobby",

  // === -NAUT PATTERN (worked well) ===
  "studnaut", "learnnaut", "brainnaut", "thinkaut",
  "mindnaut", "clevernaut", "smartnaut", "brightnaut",
  "keennaut", "swiftnaut", "boldnaut", "bravnaut",

  // === -BLOOM / -SPROUT / -PETAL (growth, beautiful) ===
  "mindbloom", "thinkbloom", "cleverbloom", "smartbloom",
  "mindsprout", "thinksprout", "cleversprout", "smartsprout",
  "mindpetal", "thinkpetal", "cleverpetal", "smartpetal",
  "growbloom", "risebloom", "leapbloom", "soarbloom",

  // === PLAYFUL JAPANESE-INSPIRED ===
  "quizado", "studado", "learnado", "brainado",
  "quiziyo", "studiyo", "learniyo", "brainiyo",
  "quizumi", "studumi", "learnumi", "brainumi",

  // === CLEAN COMPOUND (2 real words) ===
  "learnhive", "studyhive", "mindhive", "brainhive",
  "learngrove", "studygrove", "mindgrove", "braingrove",
  "learnmeadow", "studymeadow", "mindmeadow", "brainmeadow",
  "learncove", "studycove", "mindcove", "braincove",
  "learnmoss", "studymoss", "mindmoss", "brainmoss",
  "learnfern", "studyfern", "mindfern", "brainfern",
  "learnhollow", "studyhollow", "mindhollow", "brainhollow",
  "learnpond", "studypond", "mindpond", "brainpond",

  // === MORE QUIRKY ===
  "quizwhale", "studwhale", "learnwhale", "brainwhale",
  "quizsquid", "studsquid", "learnsquid", "brainsquid",
  "quizjellyfish", "studjellyfish",
  "quizoctopus", "studoctopus", "learnoctopus",
  "quiznarwhal", "studnarwhal", "learnnarwhal",

  // === LATIN/GREEK ELEGANT ===
  "discova", "cogniva", "lumiva", "floreva", "vivida",
  "practica", "studexa", "sapienta", "eruditia", "mentoriva",
  "doctiva", "magistra", "scholarva", "acadiva", "pedagogia",
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
