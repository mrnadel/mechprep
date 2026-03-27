#!/usr/bin/env node
/**
 * Domain availability checker using Verisign RDAP API
 * Returns 200 = registered, 404 = available
 */

const candidates = [
  // === ONE-WORD POWER NAMES (most marketable) ===
  // Knowledge / Mastery
  "drillwise", "prepforged", "grindprep", "skillforge", "brainrig",
  "quizzical", "learnrig", "drillbit", "masterly", "prepmint",
  "aceprep", "skillmint", "grindwell", "studyrig", "quizrig",

  // Confidence / Achievement
  "aceable", "nailit", "crushprep", "crunchprep", "snapprep",
  "readyace", "sureprep", "boldprep", "peakprep", "sharpprep",

  // Progress / Growth
  "levlup", "rankprep", "climbprep", "riseprep", "boostprep",
  "growprep", "stepprep", "leapprep", "jumpprep", "sprintprep",

  // Gamification / Fun
  "questprep", "streakprep", "xplearn", "xpprep", "badgeprep",
  "lootlearn", "gemprep", "coinlearn", "arcadeprep", "playprep",

  // Speed / Efficiency
  "quickprep", "flashprep", "rapidprep", "swiftprep", "turboprep",
  "zipprep", "dashprep", "blitzprep", "rushprep", "paceprep",

  // Smart / Intelligence
  "smartrig", "cleverprep", "witprep", "briteprep", "geniusprep",
  "savvyprep", "sharprig", "keenprep", "astutely", "shrewdly",

  // Interview specific
  "intervu", "hireready", "offerprep", "jobrig", "careerrig",
  "hireprep", "talentrig", "offerrig", "placedprep", "landprep",

  // Engineering flavor (but generic enough)
  "forgeprep", "torqueprep", "gearprep", "pivotprep", "axisprep",
  "vectorprep", "pulseprep", "signalprep", "circuitprep", "nodalprep",

  // === CATCHY SINGLE WORDS ===
  "prepli", "studion", "questly", "learnly", "drillr",
  "prepzen", "acezen", "studyzen", "quizzen", "learnzen",
  "prepnova", "skillnova", "studynova", "quiznova", "learnnova",
  "prepvolt", "skillvolt", "studyvolt", "learnvolt", "quizvolt",
  "preploom", "skillloom", "studyloom", "learnloom", "quizloom",
  "prepspark", "skillspark", "studyspark", "learnspark", "quizspark",
  "prepflux", "skillflux", "studyflux", "learnflux", "quizflux",
  "preppulse", "skillpulse", "studypulse", "learnpulse", "quizpulse",
  "prepsurge", "skillsurge", "studysurge", "learnsurge", "quizsurge",
  "prepbloom", "skillbloom", "studybloom", "learnbloom", "quizbloom",

  // === INVENTED / BRANDABLE WORDS ===
  "preplo", "drillzy", "quizora", "learniq", "studyo",
  "acecraft", "prepsmith", "skillhive", "quizhub", "learnhive",
  "prepnest", "skillnest", "studynest", "quiznest", "learnnest",
  "preplabs", "skilllabs", "studylabs", "quizlabs", "learnlabs",
  "prepwise", "skillwise", "studywise", "quizwise", "learnwise",
  "prepmode", "skillmode", "studymode", "quizmode", "learnmode",
  "prepbase", "skillbase", "studybase", "quizbase", "learnbase",
  "prepcrew", "skillcrew", "studycrew", "quizcrew", "learncrew",
  "preppeak", "skillpeak", "studypeak", "quizpeak", "learnpeak",
  "preppath", "skillpath", "studypath", "quizpath", "learnpath",

  // === SHORT & PUNCHY (Premium feel) ===
  "tryprep", "doprep", "goprep", "myprep", "weprep",
  "upprep", "onprep", "inprep", "atprep", "byprep",
  "reprep", "unprep", "exprep", "oxprep", "axprep",

  // === DUOLINGO-STYLE (playful, memorable) ===
  "prepowl", "quizpanda", "studyfox", "learnfox", "prepfox",
  "quizfrog", "studybear", "learnbee", "prepbee", "quizbee",
  "studyotter", "learnmonkey", "prepparrot", "quizlion", "studycat",

  // === ABSTRACT / MODERN ===
  "zestly", "grindly", "drillio", "quizzly", "preppify",
  "studifi", "learnifi", "quizifi", "prepster", "skillster",
  "drillster", "quizster", "studster", "learnster", "acester",
  "prepify", "skillify", "studify", "learnify", "quizify",
  "preptide", "skilltide", "studytide", "learntide", "quiztide",
  "prepdash", "skilldash", "studydash", "learndash", "quizdash",

  // === COMPOUND WORDS ===
  "prepcraft", "studycraft", "quizcraft", "learncraft", "skillcraft",
  "prepstack", "skillstack", "studystack", "quizstack", "learnstack",
  "prepforge", "skillforge2", "studyforge", "quizforge", "learnforge",
  "prepvault", "skillvault", "studyvault", "quizvault", "learnvault",
  "prepyard", "skillyard", "studyyard", "quizyard", "learnyard",

  // === MOTIVATIONAL ===
  "unstoppableprep", "relentlessprep", "fearlessprep", "dauntlessprep",
  "readysetprep", "readyornot", "bringitprep", "crushedprep",
  "naileditprep", "smashprep", "dominateprep", "conquestprep",

  // === PREMIUM SHORT DOMAINS ===
  "prepd", "quizd", "drilld", "learnd", "skilld",
  "prepo", "quizo", "drillo", "learno", "skillo",
  "prepi", "quizi", "drilli", "learni", "skilli",
  "prepa", "quiza", "drilla", "learna", "skilla",
  "prepu", "quizu", "drillu", "learnu", "skillu",

  // === TECH-INSPIRED ===
  "prepai", "quizai", "studyai", "learnai", "skillai",
  "prepbot", "quizbot", "studybot", "learnbot", "skillbot",
  "prepgpt", "quizgpt", "studygpt", "learngpt", "skillgpt",
  "prepcode", "quizcode", "studycode", "learncode", "skillcode",
  "prephq", "quizhq", "studyhq", "learnhq", "skillhq",

  // === DOMAIN HACKS / CREATIVE ===
  "prepify", "learnably", "studyable", "quizable", "skillably",
  "prepable", "drillable", "aceably", "crammable", "grindable",

  // === ENERGY / ACTION ===
  "firestarter", "rocketprep", "launchprep", "igniteprep", "sparkprep",
  "blazeprep", "thunderprep", "stormprep", "voltprep", "amperprep",

  // === CLEAN SINGLE WORDS ===
  "drillpad", "preppad", "quizpad", "studypad", "learnpad",
  "drillhub", "prephub", "studyhub", "learnhub",
  "drillbox", "prepbox", "quizbox", "studybox", "learnbox",
  "drillcamp", "prepcamp", "quizcamp", "studycamp", "learncamp",
  "drillzone", "prepzone", "quizzone", "studyzone", "learnzone",

  // === UNIQUE BRANDABLE ===
  "prezly", "quozzle", "drillix", "learnova", "studion",
  "prepella", "quizella", "skillara", "learnara", "studyara",
  "prepium", "quizium", "drillium", "learnium", "skillium",
  "prepion", "quizion", "drillion", "learnion", "skillion",
  "prepora", "quizorama", "drillorama", "learnora", "skillora",

  // === PROFESSIONAL / SERIOUS ===
  "prepacademy", "quizacademy", "studyacademy",
  "prepcollege", "studycollege", "learncollab",
  "prepinstitute", "studyinstitute", "learninstitute",
  "prepmentor", "quizmentor", "studymentor", "learnmentor",
  "preptutor", "quiztutor", "studytutor", "learntutor",

  // === FRESH BATCH - MORE CREATIVE ===
  "acedrill", "brainprep", "cortexprep", "synapslearn",
  "neuronprep", "dendrilearn", "cognifyprep", "mindrig",
  "thinkrig", "brainhive", "mindforge", "thinkforge",
  "cogniq", "cerebriq", "mentiq", "logicrig",
  "reasonprep", "deduceprep", "inferprep", "hypotheprep",

  // === MOTIVATIONAL SINGLE WORDS ===
  "grindstone", "whetstone", "keystone", "capstone",
  "milestone", "lodestone", "cornerstone", "touchstone",
  "steppingstone", "hearthstone",

  // === PURE INVENTED (no meaning, pure brand) ===
  "prezura", "quozzify", "drillant", "learnux", "studoux",
  "prepzilla", "quizilla", "drillzilla", "learnzilla", "skillzilla",
  "preptonic", "quiztonic", "drilltonic", "learntonic", "skilltonic",
  "prepwave", "quizwave", "drillwave", "learnwave", "skillwave",
  "prepedge", "quizedge", "drilledge", "learnedge", "skilledge",
  "prepline", "quizline", "drillline", "learnline", "skillline",
  "preplink", "quizlink", "drilllink", "learnlink", "skilllink",

  // === MORE SINGLE-WORD BRANDABLE ===
  "aptly", "deftly", "keenly", "crisply", "dually",
  "bravely", "boldly", "adeptly", "handily", "readil",
  "primely", "fitlyprep", "nimblyprep", "ableprep", "adroit",

  // === COMPOUND FRESH ===
  "topnotch", "firstrate", "highmark", "goldprep", "starprep",
  "crownprep", "trophyprep", "medalprep", "ribbonprep", "laurelprep",
  "primeprep", "eliteprep", "alphaprep", "omegaprep", "deltaprep",
  "sigmaprep", "thetaprep", "gammaprep", "betaprep", "zetaprep",

  // === EARTHY / NATURE ===
  "oakprep", "pineprep", "cedarprep", "maplprep", "willowprep",
  "stoneprep", "flintprep", "peaklearn", "summitprep", "ridgeprep",
  "cliffprep", "creekprep", "brookprep", "riverprep", "lakeprep",
];

// Deduplicate
const unique = [...new Set(candidates)];
console.error(`Checking ${unique.length} domain candidates...`);

const CONCURRENCY = 10;
const DELAY_MS = 100; // be nice to the API

const available = [];
const registered = [];
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
      registered.push(name);
      if (checked % 50 === 0) {
        console.error(`  ... checked ${checked}/${unique.length} (${available.length} available so far)`);
      }
    }
  } catch (err) {
    checked++;
    // On timeout/error, mark as unknown (skip)
    console.error(`  ? ERROR: ${domain} - ${err.message}`);
    registered.push(name); // conservative: assume taken
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  // Process in batches
  for (let i = 0; i < unique.length; i += CONCURRENCY) {
    const batch = unique.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(checkDomain));
    if (i + CONCURRENCY < unique.length) {
      await sleep(DELAY_MS);
    }
  }

  console.error(`\n=== RESULTS ===`);
  console.error(`Total checked: ${checked}`);
  console.error(`Available: ${available.length}`);
  console.error(`Registered: ${registered.length}`);

  // Output available domains as JSON
  console.log(JSON.stringify(available, null, 2));
}

main().catch(console.error);
