#!/usr/bin/env node
/**
 * Round 4: Final push — maximum creativity, minimum pattern repetition
 * Each name individually considered for real product viability
 */

const candidates = [
  // === INVENTED WORDS THAT SOUND DELIGHTFUL ===
  "quibly", "studra", "bimble", "fundle", "bopplo",
  "plimby", "snorka", "wiblix", "gumblo", "fribbly",
  "quobbi", "flobbi", "stribbly", "grimbly", "plombly",
  "flimsly", "quambly", "blimsly", "trimsly", "wombly",
  "snazzlo", "bizzly", "fizzly", "pizzly", "tizzly",
  "wizzly", "dizzly", "gizzly", "rizzly", "mizzly",
  "flombi", "grumbi", "stumbi", "blimbi", "crimbi",
  "frumbi", "plumbi", "slumbi", "trumbi", "drumbi",

  // === CUTE MINI WORDS (5-6 chars) ===
  "quilp", "bivvy", "plonk", "twerp", "gonzo",
  "gumbo", "limbo", "mambo", "turbo", "jumbo",
  "cozmo", "jazmo", "fizmo", "buzmo", "wazmo",
  "kippo", "nippo", "sippo", "tippo", "wippo",
  "yippo", "zippo", "dippo", "hippo", "rippo",
  "boppa", "coppa", "doppa", "foppa", "goppa",
  "hoppa", "koppa", "loppa", "moppa", "noppa",
  "poppa", "roppa", "soppa", "toppa", "woppa",

  // === -LY BRAND NAMES (like Grammarly, Smartly) ===
  "quizibly", "learnibly", "studibly", "thinkibly", "growibly",
  "crammably", "trainably", "practily", "guidably", "tutorly",
  "coachably", "drillably", "levelably", "questably", "gainably",
  "climbably", "reachably", "graspably", "achievaly", "succeedaly",

  // === ANIMAL + LEARNING (mascot potential) ===
  "quizpaca", "studpaca", "learnpaca", "brainpaca",
  "quizroo", "studroo", "learnroo", "brainroo",
  "quizmunk", "studmunk", "learnmunk", "brainmunk",
  "quizphin", "studphin", "learnphin", "brainphin",
  "quizcoon", "studcoon", "learncoon", "braincoon",
  "quizmoose", "studmoose", "learnmoose", "brainmoose",
  "quizgoose", "studgoose", "learngoose", "braingoose",

  // === EMOTION + BRAND ===
  "gleamify", "sparkify", "bloomify", "glowify", "beamify",
  "cheerify", "bravify", "boldify", "zestify", "joyify",
  "gleamly", "bloomly", "glowly", "beamly", "cheerily",
  "bravely", "boldly", "joyfully", "zestly", "sparkily",

  // === FOOD + CUTE (unexpected, memorable) ===
  "quiztaco", "studtaco", "learntaco", "braintaco",
  "quizdumpling", "studmochi", "learnmochi", "brainmochi",
  "quizwaffle", "studwaffle", "learnwaffle", "brainwaffle",
  "quizramen", "studramen", "learnramen", "brainramen",
  "quizpasta", "studpasta", "learnpasta", "brainpasta",

  // === SOUNDS LIKE SUCCESS ===
  "aceva", "winova", "topmark", "firstmark", "goldmark",
  "highmark", "starmark", "peakmark", "primespot", "topspot",
  "bestspot", "goldspot", "starspot", "crownspot", "peakspot",

  // === MYTHOLOGICAL/FANTASY ===
  "quixora", "studixor", "learnixor", "mindixor",
  "cerebrix", "logixor", "mentixor", "thinkixor",
  "sapiexor", "eruditxor", "clevixor", "smartixor",

  // === -LING (tiny cute things) ===
  "sparklings", "starlings", "quizlings", "studlings",
  "mindlings", "brainlings", "thinklings", "learnlings",
  "cleverlings", "smartlings", "brightlings", "keenlings",

  // === PURE NONSENSE THAT SOUNDS GREAT ===
  "zooply", "booply", "gooply", "hooply", "looply",
  "mooply", "nooply", "rooply", "tooply", "wooply",
  "yooply", "fooply", "dooply", "cooply", "jooply",
  "poopla", "goopla", "loopla", "moopla", "noopla",
  "bimbly", "dimbly", "fimbly", "gimbly", "himbly",
  "jimbly", "kimbly", "limbly", "mimbly", "nimbly",
  "pimbly", "rimbly", "simbly", "timbly", "wimbly",

  // === COMBO: ACTION + CUTE ===
  "leapling", "dashling", "zoomling", "swooplin",
  "bouncling", "flipling", "hoppling", "skippling",
  "tumbling", "jumbling", "fumbling", "rumbling",
  "sparklet", "zestlet", "boltlet", "dashlet",
  "flashlet", "ziplet", "snaplet", "poplet",

  // === RHYMING / MUSICAL ===
  "quiztastic", "learntastic", "studtastic", "braintastic",
  "quizaroo", "learnaroo", "studaroo", "brainaroo",
  "quizaboo", "learnaboo", "studaboo", "brainaboo",
  "quizahoo", "learnahoo", "studahoo", "brainahoo",
  "quizadoo", "learnadoo", "studadoo", "brainadoo",

  // === TECHY BUT APPROACHABLE ===
  "codeberry", "pixelberry", "byteberry", "nodeberry",
  "codesprout", "pixelsprout", "bytesprout", "nodesprout",
  "codecub", "pixelcub", "bytecub", "nodecub",
  "codefawn", "pixelfawn", "bytefawn", "nodefawn",

  // === TRULY UNIQUE INVENTED (no common roots) ===
  "vronki", "glytch", "splyff", "crymba", "thrymb",
  "skwirl", "flymph", "grynth", "plynch", "brynth",
  "stymbo", "flymbo", "grymbo", "plymbo", "brymbo",
  "skymbo", "trymbo", "crymbo", "drymbo", "prymbo",
  "vexily", "nexily", "rexily", "dexily", "flexily",
  "mexily", "hexily", "texily", "lexily", "pexily",

  // === INTERNATIONAL CUTE ===
  "sachiko", "naruhodo", "benkyodo", "ganbatte", "sugoine",
  "kawaiiq", "chikara", "genki", "yatta", "kirei",
  "takaiq", "hoshiq", "kumori", "hikari", "sakura",

  // === FINAL WILD CARDS ===
  "quizberry", "studberry", "learnberry", "brainberry",
  "quizspark", "studspark", "learnspark", "brainspark",
  "quizbloom", "studbloom", "learnbloom", "brainbloom",
  "quizsprout", "studsprout", "learnsprout", "brainsprout",
  "quizpetal", "studpetal", "learnpetal", "brainpetal",
  "quizclover", "studclover", "learnclover", "brainclover",
  "quizdaisy", "studdaisy", "learndaisy", "braindaisy",
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
