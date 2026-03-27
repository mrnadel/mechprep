#!/usr/bin/env node
/**
 * FINAL ROUND: 6-8 char names evoking skill/craft/mastery + fun
 * Every name hand-considered for pronounceability
 */

const candidates = [
  // === CRAFT/FORGE/BUILD + FUN TWIST ===
  "craftly", "forgely", "buildly", "makerly", "shapely",
  "craftiq", "forgeiq", "buildiq", "makeriq", "shapeiq",
  "craftsy", "forgesy", "buildsy", "makersy", "shapesy",
  "craftoo", "forgeoo", "buildoo", "makeroo", "shapeoo",
  "craftee", "forgee", "buildee", "makeree", "shapee",
  "crafta", "forgea", "builda", "makera", "shapea",

  // === SKILL/KNACK/TALENT + CUTE ===
  "skillzy", "knackly", "talntly", "flairly", "savvyly",
  "skillsy", "knacksy", "talntsy", "flairsy", "savvysy",
  "skilly", "knacky", "talenty", "flairy", "savvyy",
  "skillup", "knackup", "talntup", "flairup", "savvyup",
  "skillee", "knackee", "talntee", "flairee", "savvyee",

  // === GUILD/TRADE/MASTER ===
  "guildly", "tradely", "mastrly", "guildsy", "tradesy",
  "guildee", "tradee", "mastree", "guildoo", "tradeoo",
  "guildup", "tradeup", "mastrup", "guildiq", "tradeiq",
  "gildify", "tradify", "mastify", "gildify", "tridify",

  // === HONE/POLISH/REFINE ===
  "honedly", "polisly", "refinly", "honedsy", "polissy",
  "honedee", "polisee", "refinee", "honediq", "polisiq",
  "honedup", "polisup", "refinup", "honedoo", "polisoo",

  // === WORKSHOP/ATELIER/LAB ===
  "workshy", "ateliee", "labbly", "worksy", "atelisy",
  "worksho", "atelieo", "labboo", "workiq", "atelieq",
  "labify", "shopify", "werkly", "werksy", "werkoo",

  // === LEVEL/RANK/TIER + FUN ===
  "levlify", "rankify", "tierify", "gradify", "classfy",
  "levlup", "rankupy", "tierupy", "gradupy", "classupy",
  "levlsy", "ranksy", "tiersy", "gradsy", "classy",

  // === QUIRKY INVENTED (pronounceable 6-7) ===
  "forjy", "gildy", "skilra", "crafva", "knakra",
  "forgva", "buildva", "makerva", "honeva", "tradva",
  "forjix", "gildix", "skilix", "crafx", "knakix",
  "forgix", "buildix", "makerix", "honeix", "tradix",
  "forjio", "gildio", "skilio", "crafio", "knakio",

  // === CUTE ANIMAL + SKILL ===
  "foxcraft", "owlskill", "beeguild", "pupforge",
  "foxguild", "owlforge", "beecraft", "pupskill",
  "foxhone", "owlhone", "beehone", "puphone",
  "foxmake", "owlmake", "beemake", "pupmake",

  // === LESS OBVIOUS MASHUPS ===
  "apterra", "dextera", "praxima", "teknika",
  "aptifly", "dextifly", "praxfly", "teknifly",
  "aptikly", "dextily", "praxily", "teknily",
  "aptivo", "dextivo", "praxivo", "teknivo",

  // === ACTION + MASTERY ===
  "drillzy", "buildzy", "forgezy", "shapezy", "grindzy",
  "drillva", "buildva", "forgeva", "shapeva", "grindva",
  "drillix", "buildix", "forgeix", "shapeix", "grindix",

  // === GAMIFIED SKILL ===
  "xpcraft", "xpforge", "xpguild", "xpskill", "xpmaker",
  "xphone", "xptrade", "xplevel", "xprank", "xptier",
  "gemcraft", "gemforge", "gemguild", "gemskill", "gemmaker",

  // === MODERN STARTUP (6-7 chars) ===
  "skilra", "crafra", "forgra", "tradra", "gildra",
  "skilvo", "crafvo", "forgvo", "tradvo", "gildvo",
  "skilva", "crafva", "forgva", "tradva", "gildva",
  "skilmo", "crafmo", "forgmo", "tradmo", "gildmo",
  "skilno", "crafno", "forgno", "tradno", "gildno",
  "skilpo", "crafpo", "forgpo", "tradpo", "gildpo",
  "skiltx", "craftx", "forgtx", "tradtx", "gildtx",

  // === JAPANESE + SKILL ===
  "wazaly", "jutsuly", "takumly", "shokunly",
  "wazafy", "jutsufy", "takumfy", "shokunfy",
  "wazaiq", "jutsuiq", "takumiq", "shokuniq",

  // === REALLY FRESH COMBOS ===
  "nexskil", "pixskil", "voxskil", "foxskil",
  "nexkraf", "pixkraf", "voxkraf", "foxkraf",
  "nexgild", "pixgild", "voxgild", "foxgild",
  "nxforge", "pxforge", "vxforge", "fxforge",

  // === COMPOUND TIGHT (7-8 char) ===
  "upcraft", "gocraft", "mycraft", "reforge",
  "upguild", "goguild", "myguild", "reguild",
  "upskill", "goskill", "myskill", "reskill",
  "uphoned", "gohoned", "myhoned", "rehoned",
  "uptrade", "gotrade", "mytrade", "retrade",

  // === -IZE/-ISE PATTERN ===
  "craftize", "forgize", "guildize", "skillize",
  "tradeize", "learnize", "buildize", "shapeize",

  // === FRESH 6 CHAR ===
  "skilzy", "crafzy", "forgzy", "tradzy", "gildzy",
  "skilvy", "crafvy", "forgvy", "tradvy", "gildvy",
  "skilby", "crafby", "forgby", "tradby", "gildby",
  "skildy", "crafdy", "forgdy", "traddy", "gilddy",
  "skilfy", "craffi", "forgfy", "tradfy", "gildfy",
  "skilgy", "crafgy", "forggy", "tradgy", "gildgy",
  "skilhy", "crafhy", "forghy", "tradhy", "gildhy",
  "skilky", "crafky", "forgky", "tradky", "gildky",
  "skilmy", "crafmy", "forgmy", "tradmy", "gildmy",
  "skilny", "crafny", "forgny", "tradny", "gildny",
  "skilpy", "crafpy", "forgpy", "tradpy", "gildpy",
  "skilry", "crafry", "forgry", "tradry", "gildry",
  "skilty", "crafty", "forgty", "tradty", "gildty",
  "skilwy", "crafwy", "forgwy", "tradwy", "gildwy",
];

const unique = [...new Set(candidates)];
console.error(`Checking ${unique.length} candidates...`);

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
