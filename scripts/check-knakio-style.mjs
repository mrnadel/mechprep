#!/usr/bin/env node
/**
 * Names like "knakio" — short, abstract, sounds like a creature/character,
 * skill-evoking, fun to say. 5-7 chars.
 */

const candidates = [
  // === KNACK/SKILL ROOT + CUTE SUFFIX ===
  "knakly", "knaksy", "knakee", "knakoo", "knakzi",
  "knakvo", "knakmo", "knakra", "knakva", "knakpo",
  "knakfy", "knakly", "knakbi", "knakdo", "knakzo",
  "knakui", "knakea", "knakai", "knakoi", "knakuu",

  // === SKILL/DEFT/ADEPT ROOTS ===
  "deftio", "deftly", "deftsy", "deftee", "deftoo",
  "deftvo", "deftmo", "deftra", "deftva", "deftpo",
  "adeptio", "adeptly", "adeptsy", "adeptee",
  "ablimo", "ablivo", "ablioo", "ablisy", "ablizy",
  "aptivo", "aptimo", "aptisy", "aptioo", "aptizy",

  // === SOUNDS LIKE A CREATURE (Pikachu/Totoro energy) ===
  "skilbo", "forglo", "gildio", "honeki", "dexiro",
  "craftio", "makeno", "builzo", "shapeo", "moldio",
  "praxio", "teknio", "ergono", "werkio", "labrio",
  "skilki", "forgki", "gildki", "honeko", "dexiko",
  "craftki", "makeki", "builki", "shapki", "moldki",
  "skilnu", "forgnu", "gildnu", "honenu", "dexinu",

  // === ABSTRACT 5-6 CHAR (Figma/Canva style) ===
  "kniko", "krako", "griko", "priko", "triko",
  "kneko", "kreko", "greko", "preko", "treko",
  "knuko", "kruko", "gruko", "pruko", "truko",
  "knako", "krako", "grako", "prako", "trako",
  "knoko", "kroko", "groko", "proko", "troko",

  // === -IO ENDING (app-like, mascot-like) ===
  "skilio", "crafio", "forgeo", "guildo", "honeio",
  "dexrio", "knakio", "flairo", "taleno", "merlio",
  "prowio", "grizio", "huslio", "gritio", "nervio",
  "plukio", "spukio", "moxio", "guilio", "vervio",
  "skillr", "kraftr", "forgir", "guildr", "honer",

  // === JAPANESE-INSPIRED SHORT ===
  "takumo", "wazako", "shokai", "renkio", "kyokai",
  "shugio", "doukio", "gakuio", "kunrio", "senrio",
  "jutsko", "waziko", "takiko", "shogio", "rensio",
  "kyokio", "shukio", "doukmo", "gakumo", "kunrmo",

  // === PURE INVENTED (easy mouth-feel, creature-like) ===
  "quibly", "zuplio", "brinko", "flombi", "glimpo",
  "krimbo", "plinto", "snorko", "twinko", "vrombi",
  "ziklio", "bilmio", "crimio", "drimio", "frimio",
  "grimio", "krimio", "primio", "trimio", "wrimio",
  "zirbio", "birbio", "cirbio", "dirbio", "firbio",
  "girbio", "kirbio", "mirbio", "nirbio", "pirbio",

  // === BLEND: SKILL WORD + CHARACTER NAME ===
  "skilpo", "honero", "dexilo", "crafeo", "forgeo",
  "guileo", "makelo", "buileo", "shapeo", "honelo",
  "skileo", "knakeo", "flaero", "talelo", "merleo",

  // === VOWEL-RICH (easy to say globally) ===
  "akuio", "ekuio", "ikuio", "okuio", "ukuio",
  "azuio", "ezuio", "izuio", "ozuio", "uzuio",
  "akilo", "ekilo", "ikilo", "okilo", "ukilo",
  "azilo", "ezilo", "izilo", "ozilo", "uzilo",
  "akimo", "ekimo", "ikimo", "okimo", "ukimo",

  // === -KI / -KO ENDING (Japanese cute) ===
  "skilki", "crafki", "forgki", "guilki", "honeki",
  "dexiki", "flairki", "taleki", "merkki", "prowki",
  "skilko", "crafko", "forgko", "guilko", "honeko",
  "dexiko", "flairko", "taleko", "merkko", "prowko",

  // === 5 CHAR GEMS ===
  "knaki", "krafi", "gildi", "forgi", "honei",
  "dexi", "skili", "masei", "bildi", "moldi",
  "knaku", "krafu", "gildu", "forgu", "honeu",
  "dexu", "skilu", "maseu", "bildu", "moldu",
  "knaxa", "kraxa", "gilda", "forga", "honea",
  "dexa", "skila", "masea", "bilda", "molda",

  // === RHYMING WITH KNAKIO ===
  "brakio", "crakio", "drakio", "frakio", "grakio",
  "prakio", "trakio", "wrakio", "strakio",
  "blakio", "clakio", "flakio", "glakio", "plakio",
  "slakio", "snakio", "stakio", "swakio",

  // === -INO / -INI (Italian cute) ===
  "skilino", "crafino", "forgino", "gildino", "honeino",
  "dexino", "makino", "bildino", "shapino", "moldino",
  "skilini", "crafini", "forgini", "gildini", "honeini",

  // === FRESH ABSTRACT ===
  "vexlio", "zexlio", "bexlio", "rexlio", "nexlio",
  "voklio", "zoklio", "boklio", "roklio", "noklio",
  "vulkio", "zulkio", "bulkio", "rulkio", "nulkio",
  "vynkio", "zynkio", "bynkio", "rynkio", "nynkio",
  "vormio", "zormio", "bormio", "rormio", "normio",

  // === PLAYFUL COMPOUNDS ===
  "zapskl", "popkrf", "bopgld", "hipfrg", "ziphnr",
  "zoplio", "boplio", "poplio", "toplio", "hoplio",
  "ziplio", "siplio", "tiplio", "riplio", "diplio",
  "zuplio", "buplio", "kuplio", "ruplio", "duplio",
];

const unique = [...new Set(candidates)];
console.error(`Checking ${unique.length} knakio-style candidates...`);

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
