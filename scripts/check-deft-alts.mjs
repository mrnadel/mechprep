#!/usr/bin/env node
/**
 * Replace "deft" with better synonyms in the patterns user liked:
 * X+pop, X+joy, X+play, day+X, X+bloom, X+zen, X+path, X+leap, etc.
 */

const roots = [
  "adept", "keen", "apt", "nimble", "savvy", "swift", "able",
  "agile", "slick", "sharp", "bright", "quick", "smart", "clever",
  "nifty", "handy", "ready", "prime", "fluid", "supple",
  "droit", "habil", "pronto", "prest", "adroit",
];

const suffixes = [
  "pop", "joy", "play", "bloom", "zen", "path", "leap", "rise",
  "snap", "buzz", "way", "step", "seed", "bud", "spark", "mind",
  "wit", "quest", "level", "flow", "den", "cove", "mint", "dash",
  "hive", "nest", "root", "trail", "ride", "flash", "snack",
];

const prefixes = [
  "day", "play", "fun", "joy", "pop", "spark", "flash", "bite",
  "zen", "go", "up", "my", "re", "ever", "any", "all",
  "mini", "tiny", "micro", "daily",
];

const candidates = new Set();

// root + suffix
for (const r of roots) {
  for (const s of suffixes) {
    const name = r + s;
    if (name.length >= 6 && name.length <= 11) candidates.add(name);
  }
}

// prefix + root
for (const p of prefixes) {
  for (const r of roots) {
    const name = p + r;
    if (name.length >= 6 && name.length <= 11) candidates.add(name);
  }
}

// Also try knack/hone/forge combos with new suffixes
const skillRoots = ["knack", "hone", "forge", "craft", "guild", "skill", "prowl", "merit"];
const funSuffixes = ["pop", "joy", "play", "snap", "buzz", "dash", "zip", "hop", "skip", "bounce", "groove"];
for (const r of skillRoots) {
  for (const s of funSuffixes) {
    const name = r + s;
    if (name.length >= 6 && name.length <= 10) candidates.add(name);
    const name2 = s + r;
    if (name2.length >= 6 && name2.length <= 10) candidates.add(name2);
  }
}

const unique = [...candidates];
console.error(`Checking ${unique.length} deft-alternative candidates...`);

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
      if (checked % 80 === 0) console.error(`  ... ${checked}/${unique.length} (${available.length} avail)`);
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
