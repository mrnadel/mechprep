#!/usr/bin/env node
/**
 * Round 1: Premium generic learning platform names
 * Quirky, cute, fun — like Duolingo, Kahoot, Quizlet vibes
 */

const candidates = [
  // === PLAYFUL INVENTED WORDS (Duolingo/Kahoot energy) ===
  "quizlo", "learnlo", "studlo", "braino", "crambo",
  "quizmo", "learnmo", "studmo", "brainmo", "crammo",
  "quizzo", "learzzo", "stuzzo", "braizzo", "cramzo",
  "quizzy", "learzy", "stuzy", "braizzy", "cramzy",
  "quibble", "nibbler", "gobbler", "wobbler", "bobbler",
  "zappie", "snappie", "crammie", "brainee", "learnee",
  "quizzle", "drizzle", "fizzle", "sizzle", "nuzzle",
  "wuzzle", "puzzly", "fuzzly", "buzzly", "muzzly",

  // === CUTE ANIMAL/MASCOT VIBES ===
  "quizpup", "learnpup", "studpup", "brainpup", "crampup",
  "quizbun", "learnbun", "studbun", "brainbun", "crambun",
  "quizbug", "learnbug", "studbug", "brainbug", "crambug",
  "studyowl", "learnowl", "quizowl", "brainowl", "cramowl",
  "studyfox", "quizfox", "brainfox", "learnfox", "cramfox",
  "studybee", "quizbee", "brainbee", "learnbee", "crambee",
  "cleverpaw", "smartpaw", "quickpaw", "brightpaw", "keenpaw",

  // === SHORT & SNAPPY (5-7 chars) ===
  "zesti", "peppo", "snappo", "zippo", "buzzi",
  "fizzi", "poppo", "boppo", "hippo", "zipzi",
  "quzi", "lrni", "stdi", "brni", "crmi",
  "noodl", "doodl", "boostr", "scootr", "hootr",
  "bloop", "plonk", "bonk", "zonk", "clonk",

  // === MODERN APP NAMES (-ly, -fy, -io, -er) ===
  "studify", "quizify", "learnify", "brainify", "cramify",
  "studly", "quizly", "learnly", "brainly", "cramly",
  "studer", "quizer", "learner", "brainer", "cramer",
  "studio", "quizio", "learnio", "brainio", "cramio",

  // === FUN SOUNDS ===
  "kapow", "kazoo", "wahoo", "whoopee", "yippee",
  "bazinga", "eureka", "bravoo", "presto", "voila",
  "tadaa", "woohoo", "yeehaw", "booyah", "zing",
  "zingo", "bingo", "lingo", "dingo", "flamingo",

  // === DUOLINGO-STYLE (playful + learning) ===
  "leaplingo", "studlingo", "quizlingo", "bramlingo", "cramlingo",
  "sparkl", "twinkl", "crackl", "snappl", "giggl",
  "wobbly", "bubbly", "wiggly", "jiggly", "squiggly",

  // === ASPIRATIONAL BUT FUN ===
  "cleverly", "smartly", "brightly", "keenly", "nimbly",
  "swiftly", "deftly", "aptly", "savvily", "handily",
  "bravely", "boldly", "gladly", "proudly", "eagerly",

  // === COMPOUND CUTE ===
  "brainpop", "brainzap", "brainjam", "brainbop", "brainzip",
  "learnzap", "learnjam", "learnbop", "learnzip", "learnpop",
  "studyzap", "studyjam", "studybop", "studyzip", "studypop",
  "quizzap", "quizjam", "quizbop", "quizzip", "quizpop",
  "crammzap", "crammjam", "crammbop", "crammzip", "crammpop",

  // === QUIRKY REAL WORDS ===
  "noodle", "pickle", "waffle", "muffin", "cookie",
  "pretzel", "nugget", "biscuit", "crumpet", "pancake",
  "sprout", "pebble", "acorn", "berry", "maple",
  "clover", "daisy", "poppy", "tulip", "lotus",

  // === ENERGY / SPARK ===
  "sparkly", "glowy", "shiny", "gleamy", "flashy",
  "zippy", "snappy", "peppy", "perky", "chirpy",
  "bouncy", "jumpy", "frisky", "plucky", "spunky",

  // === BRANDABLE NONSENSE (easy to say) ===
  "quorbi", "zestly", "brinko", "flombo", "grinko",
  "plonko", "snorbo", "whammo", "blammo", "kaboom",
  "voxley", "pixley", "foxley", "boxley", "doxley",
  "zuply", "cuply", "tuply", "nuply", "buply",
  "wibble", "tribble", "skibble", "dribble", "scribble",

  // === LEARNING + CUTE SUFFIX ===
  "studypal", "quizpal", "learnpal", "brainpal", "crampal",
  "studykit", "quizkit", "learnkit", "brainkit", "cramkit",
  "studyjoy", "quizjoy", "learnjoy", "brainjoy", "cramjoy",
  "studywiz", "quizwiz", "learnwiz", "brainwiz", "cramwiz",

  // === ABSTRACT SHORT ===
  "kuroo", "morbi", "fenlo", "gulpo", "helva",
  "jolbi", "kelma", "lumpi", "nimbo", "pelto",
  "quilma", "rolbi", "silvo", "tulbi", "umbra",
  "velmo", "wilto", "xelbi", "yolmo", "zelbi",

  // === MORE CREATIVE ===
  "leapwise", "stepwise", "pathwise", "mindwise", "corewiise",
  "toplearn", "golearn", "uplearn", "maxlearn", "prolearn",
  "topquiz", "goquiz", "upquiz", "maxquiz", "proquiz",
  "topstudy", "gostudy", "upstudy", "maxstudy", "prostudy",

  // === FUN MASHUPS ===
  "quirkle", "sparkle", "twinkle", "crinkle", "wrinkle",
  "sprinkle", "tinkle", "prickle", "freckle", "heckle",
  "chuckle", "buckle", "knuckle", "suckle", "truckle",

  // === CUTE + TECH ===
  "bytebun", "pixelpup", "codecub", "bitbird", "datadog",
  "chipchip", "clickpup", "tapbird", "swipefox", "scrollpup",
  "boopbop", "beepbop", "bloopbop", "bleepbop", "blipbop",

  // === PUNCHY TWO-SYLLABLE ===
  "sunup", "popup", "mixup", "linkup", "lineup",
  "mashup", "markup", "hookup", "backup", "checkup",
  "pickup", "kickoff", "liftoff", "takeoff", "blastoff",

  // === FRESH BATCH ===
  "quippy", "snippy", "nippy", "yappy", "zappy",
  "sappy", "happy", "snappy", "scrappy", "preppy",
  "groovy", "loopy", "goofy", "kooky", "wacky",
  "funky", "quirky", "perky", "dorky", "nerdy",

  // === GAMIFICATION VIBES ===
  "xplvl", "xpboost", "lvlup", "rankup", "powerup",
  "bonusxp", "questxp", "lootbox", "gemquest", "starquest",
  "coinflip", "goldstar", "stargold", "starburst", "starbloom",

  // === UNIQUE SHORT BRANDS ===
  "quorra", "nexxa", "pixxa", "fizzo", "buzza",
  "poppa", "zippa", "snappa", "cramma", "grilla",
  "drilla", "skilla", "thrilla", "brilla", "frilla",

  // === WISDOM / KNOWLEDGE (but cute) ===
  "wiselet", "knowlet", "thinklet", "mindlet", "brainlet",
  "wisebit", "knowbit", "thinkbit", "mindbit", "brainbit",
  "wisebud", "knowbud", "thinkbud", "mindbud", "brainbud",
  "wisepod", "knowpod", "thinkpod", "mindpod", "brainpod",

  // === CATCHY VERBS ===
  "crunchy", "munchy", "punchy", "scrunchy", "grouchy",
  "slouchy", "touchy", "pouchy", "smoochy", "moochy",
  "swooshy", "squishy", "mushy", "gushy", "bushy",

  // === PURE BRAND NAMES ===
  "zabble", "wabble", "rabble", "babble", "gabble",
  "dabble", "fabble", "jabble", "nabble", "tabble",
  "yabble", "pabble", "cabble", "habble", "labble",

  // === FRESH ROUND ===
  "cramble", "studdle", "learndle", "quizdle", "braindle",
  "cramster", "studster", "learnster", "quizster", "brainster",
  "cramwise", "studwise", "learnwise", "quizwise", "brainwise",
  "cramnova", "studnova", "learnnova", "quiznova", "brainnova",
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
    console.error(`  ? ERROR: ${domain}`);
  }
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  for (let i = 0; i < unique.length; i += CONCURRENCY) {
    const batch = unique.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(checkDomain));
    if (i + CONCURRENCY < unique.length) await sleep(DELAY_MS);
  }
  console.error(`\nDone: ${available.length} available out of ${checked}`);
  console.log(JSON.stringify(available, null, 2));
}

main().catch(console.error);
