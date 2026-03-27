#!/usr/bin/env node
/**
 * Round 2: Truly creative invented names — fun, pronounceable, unique
 * Targeting names that FEEL like a product but don't exist yet
 */

const candidates = [
  // === INVENTED 2-SYLLABLE (like Spotify, Shopify, Canva) ===
  "studra", "quorra", "lemvo", "blinko", "plunko",
  "crambo", "grinko", "flinko", "whambo", "slambo",
  "jombo", "vimbo", "rimbo", "dimbo", "limbo",
  "fumbo", "tumbo", "kumbo", "zumbo", "rumbo",
  "fonzo", "bonzo", "gonzo", "donzo", "monzo",
  "trinko", "drinko", "clinko", "shrinko", "stinko",
  "blanko", "cranko", "franko", "stanko", "thanko",
  "blurbo", "churbo", "slurbo", "spurbo", "sturbo",

  // === CUTE SOUND WORDS (like TikTok, Bumble) ===
  "bopple", "topple", "popple", "hopple", "mopple",
  "bimble", "dimble", "fimble", "gimble", "himble",
  "jimble", "kimble", "nimble", "rimble", "wimble",
  "bumble", "fumble", "tumble", "mumble", "rumble",
  "brambo", "crambo", "flambo", "glambo", "trambo",
  "blinky", "clinky", "flinky", "plinky", "slinky",
  "blippy", "clippy", "drippy", "flippy", "snippy",
  "blonky", "clonky", "flonky", "plonky", "slonky",
  "blurpy", "slurpy", "churpy", "plurpy", "thurpy",

  // === -LE ENDING (playful, like Google, Apple, Tumble) ===
  "studdle", "quibble", "learnle", "brammle", "crumble",
  "fundle", "gundle", "hundle", "jundle", "kundle",
  "lundle", "mundle", "nundle", "pundle", "rundle",
  "sundle", "tundle", "vundle", "wundle", "yundle",
  "bamble", "camble", "damble", "famble", "gamble",
  "hamble", "jamble", "lamble", "mamble", "pamble",
  "ramble", "tamble", "wamble", "zamble", "namble",

  // === FOOD/CUTE MASHUPS (like Cookie, Muffin — but unique) ===
  "studmuffin", "quizcake", "learnberry", "brainberry",
  "smartcookie", "clevercake", "brightberry", "keenberry",
  "quizberry", "studberry", "learnmuffin", "brainmuffin",
  "quiznugget", "studnugget", "learnnugget", "brainnugget",
  "quizpickle", "studpickle", "learnpickle", "brainpickle",

  // === -LING SUFFIX (cute, small, endearing) ===
  "studling", "quizling", "learnling", "brainling", "cramling",
  "sparklings", "smartling", "brightling", "cleverling", "keenling",
  "nimbling", "swiftling", "boldling", "braveling", "pluckling",

  // === -ETTE SUFFIX (elegant, French vibes) ===
  "studette", "quizette", "learnette", "brainette", "cramette",
  "smartette", "cleverette", "brightette", "keenette", "nimblette",

  // === JAPANESE/ASIAN CUTE (like Anki, Kaizen) ===
  "benkyou", "gakusei", "manabi", "narau", "oboeru",
  "renshu", "shiken", "tokugi", "unten", "wakaru",
  "dekiru", "ganbare", "jouzu", "katsura", "tensai",

  // === -OOT / -OOF / -OON (fun sounds) ===
  "studoot", "quizoot", "learnoot", "brainoot", "cramoot",
  "studoof", "quizoof", "learnoof", "brainoof", "cramoof",
  "studoon", "quizoon", "learnoon", "brainoon", "cramoon",

  // === PORTMANTEAU (learning + fun) ===
  "learnacle", "studacle", "quizacle", "brainacle",
  "learnapus", "studapus", "quizapus", "brainapus",
  "learninja", "studinja", "quizinja", "braininja",
  "learnosaur", "studosaur", "quizosaur", "brainosaur",

  // === ALLITERATIVE ===
  "brainybird", "clevercub", "smartsnail", "quickquail",
  "learnylamb", "studyseal", "quizzygaze", "brainybat",
  "pluckypal", "keenkid", "brightbud", "nimblenote",

  // === MADE-UP WITH NICE MOUTH-FEEL ===
  "quorvo", "zelpo", "brimba", "glendo", "frumpo",
  "skalto", "plimbo", "vorta", "klungo", "drongo",
  "grumpo", "blimpo", "frotho", "stumpo", "clampo",
  "zivvo", "bivvo", "kivvo", "nivvo", "rivvo",
  "dazlo", "fazlo", "gazlo", "hazlo", "jazlo",
  "kazlo", "mazlo", "nazlo", "pazlo", "razlo",
  "flumpo", "grumble", "stumble", "crumble", "fumble",

  // === PREFIX + CORE (un-, re-, up-, go-) ===
  "unlearnit", "relearning", "uplearnit", "golearnit",
  "unstudied", "restudied", "upstudied", "gostudied",
  "uncramped", "recrammed", "upcrammed", "gocrammed",
  "getsmarts", "gosmarts", "besmarts", "dosmarts",

  // === PLAYFUL VERBS ===
  "swooplearn", "zoomlearn", "dashlearn", "leaplearn",
  "bouncestudy", "tumblelearn", "gigglelearn", "wobblelearn",
  "jigglelearn", "wigglelearn", "fumblelearn", "stumblelearn",

  // === ONOMATOPOEIA ===
  "pinglearn", "ponglearn", "dingstudy", "donglearn",
  "bingstudy", "bonglearn", "tingstudy", "tonglearn",
  "zingstudy", "zonglearn", "bamstudy", "bamlearn",

  // === UNIQUE COMBOS ===
  "quizcraft", "learnavore", "studynaut", "brainaut",
  "quiznaut", "cramnaut", "learnopod", "studopod",
  "brainstew", "mindstew", "thinkstew", "learnstew",
  "quizstew", "studystew", "cramstew", "brainbroth",

  // === SHORT UNIQUE (5-6 chars) ===
  "qwizo", "stuvo", "lurno", "breno", "cremo",
  "flixo", "glymo", "hyxlo", "jynko", "klymo",
  "pluxo", "qrymo", "slyfo", "tryxo", "vlymo",
  "wraxo", "xyleo", "zyngo", "blepo", "crepo",
  "drepo", "frepo", "grepo", "prepo", "trepo",

  // === -STER SUFFIX (hipster, cool) ===
  "learnster", "brainster", "cramster", "quizster", "smartster",
  "thinkster", "mindster", "cleverster", "keenster", "nimblester",

  // === COMBO FRESH ===
  "studyhoot", "quizhoot", "learnhoot", "brainhoot", "cramhoot",
  "studyplop", "quizplop", "learnplop", "brainplop", "crampleop",
  "studywink", "quizwink", "learnwink", "brainwink", "cramwink",
  "studyblip", "quizblip", "learnblip", "brainblip", "cramblip",
  "studynook", "quiznook", "learnnook", "brainnook", "cramnook",
  "studytrip", "quiztrip", "learntrip", "braintrip", "cramtrip",
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
