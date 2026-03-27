#!/usr/bin/env node
/**
 * Deep exploration of apt, keen, adept + every meaningful combo
 * Also exploring: nifty, savvy, nimble, handy, slick, agile
 */

const meaningfulWords = [
  // Fun/Play
  "pop", "joy", "play", "fun", "snap", "buzz", "zip", "hop", "skip",
  "bounce", "groove", "vibe", "dash", "rush", "zap", "zing", "boom",
  "wham", "bam", "pow", "kick", "flip", "spin", "twist", "swing",

  // Growth
  "bloom", "bud", "seed", "sprout", "root", "grow", "rise", "leaf",
  "vine", "stem", "petal", "blossom",

  // Journey/Progress
  "path", "way", "step", "leap", "trail", "ride", "stride", "pace",
  "trek", "roam", "go", "run", "fly", "soar", "climb", "reach",

  // Spark/Energy
  "spark", "flash", "glow", "beam", "ray", "bolt", "fire", "blaze",
  "flame", "light", "shine", "flare",

  // Mind/Knowledge
  "wit", "mind", "brain", "think", "know", "learn", "wise", "sage",

  // Gamification
  "quest", "level", "rank", "tier", "score", "gem", "star", "coin",
  "loot", "badge", "streak", "combo", "boost",

  // Community/Place
  "den", "cove", "nest", "hive", "hub", "lab", "camp", "yard",
  "dock", "port", "bay", "grove", "glen", "vale", "nook",

  // Fresh/New
  "mint", "fresh", "new", "prime", "first", "crisp",

  // Time/Daily
  "day", "daily", "dawn", "morn",

  // Misc positive
  "ace", "pro", "top", "max", "peak", "core", "craft", "knack",
  "hone", "forge", "guild", "skill", "trade", "art", "make",
];

// Roots that mean "skillful" — replacing "deft"
const skillRoots = [
  "apt",      // naturally able, fitting
  "keen",     // sharp, eager, enthusiastic
  "adept",    // highly skilled
  "nifty",    // cleverly skillful
  "savvy",    // practical know-how
  "nimble",   // quick and light
  "handy",    // good with hands, useful
  "agile",    // quick, flexible
  "slick",    // smooth, expert
  "fluid",    // flowing, natural skill
  "supple",   // flexible, adaptable
  "able",     // capable
  "sharp",    // keen, quick-minded
  "swift",    // fast, agile
  "bright",   // intelligent, promising
  "quick",    // fast learner
  "clever",   // smart, ingenious
  "smart",    // intelligent
  "ready",    // prepared, willing
  "prime",    // first-rate
  "ace",      // expert
];

const candidates = new Set();

// root + meaningful word
for (const r of skillRoots) {
  for (const w of meaningfulWords) {
    if (w === r) continue;
    const name = r + w;
    if (name.length >= 5 && name.length <= 10) candidates.add(name);
  }
}

// meaningful word + root
for (const w of meaningfulWords) {
  for (const r of skillRoots) {
    if (w === r) continue;
    const name = w + r;
    if (name.length >= 5 && name.length <= 10) candidates.add(name);
  }
}

const unique = [...candidates];
console.error(`Checking ${unique.length} meaningful combos...`);

const CONCURRENCY = 12;
const DELAY_MS = 70;
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
      if (checked % 100 === 0) console.error(`  ... ${checked}/${unique.length} (${available.length} avail)`);
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
