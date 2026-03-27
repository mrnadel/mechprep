#!/usr/bin/env node
/**
 * Short domains round 2: unusual combos, less obvious patterns
 * Targeting 5-8 chars that evoke skill/craft/mastery
 */

const candidates = [
  // === UNUSUAL INVENTED (high availability chance) ===
  "sklyft", "krafiq", "dexium", "guilvo", "renkly",
  "praxly", "tekniq", "ergoly", "aretiq", "sophiq",
  "gnozly", "metizq", "nouzly", "poiema", "praxiq",
  "dexira", "skelta", "krafna", "guilma", "renkva",
  "praxna", "tekyla", "ergova", "aretva", "sophva",

  // === XZ/QK COMBOS (rarely taken) ===
  "skixel", "kraxel", "dexqo", "guilxo", "renqo",
  "praxqo", "tekxo", "ergxo", "arxel", "sphxo",
  "skizmo", "krazmo", "dexzmo", "guilzm", "renzmo",
  "praxzm", "tekzmo", "ergzmo", "arxmo", "sphzmo",

  // === VOWEL-HEAVY (pronounceable, less squatted) ===
  "skuily", "kraevi", "dexoia", "guilia", "renioa",
  "prauio", "tekeui", "ergoai", "areoia", "sopiea",
  "dexaui", "guilei", "skiluo", "kraoia", "reniuo",
  "kurzio", "praxio", "teknio", "gildia", "krafia",

  // === -IFY PATTERN ===
  "dexify", "guilify", "rankify", "skilly", "krafiy",
  "mastify", "honefy", "primfy", "forgfy", "tempfy",
  "praxfy", "grokfy", "grndfy", "hackfy", "drltfy",

  // === DOUBLE LETTER BRANDS ===
  "skkill", "kraaft", "dexxtr", "guuild", "rannk",
  "prooff", "mastrr", "kraffr", "guuldr", "rannkr",
  "dexxy", "guildy", "skillr", "krafft", "ranqqr",

  // === RARE SUFFIX PATTERNS ===
  "skilux", "krafux", "dexlux", "guillux", "ranqux",
  "skilvx", "krafvx", "dexvyx", "guilvx", "ranqvx",
  "skilmx", "krafmx", "dexpmx", "guilmx", "ranqmx",
  "skilnx", "krafnx", "dexqnx", "guilnx", "ranqnx",

  // === CRAFT + CUTE MINI SUFFIX ===
  "skilzy", "krafzy", "dexzy", "guilzy", "rankzy",
  "skilvy", "krafvy", "dexvy", "guilvy", "rankvy",
  "skilxy", "krafxy", "dexxy", "guilxy", "rankxy",
  "skildq", "krafdq", "dexdq", "guildq", "rankdq",

  // === TOTALLY ABSTRACT (Vercel/Figma style) ===
  "vexlr", "zylka", "brynq", "crylx", "dryfn",
  "frylq", "grylx", "hrylx", "jrylx", "krylx",
  "prylx", "srylx", "trylx", "vrylx", "wrylx",
  "xylvr", "zyxvr", "bxylr", "cxylr", "dxylr",
  "blynk", "crynk", "drynk", "frynk", "grynk",
  "plynk", "prynk", "srynk", "trynk", "wrynk",

  // === MASTERY-THEMED SHORT ===
  "prolu", "mastu", "xprtu", "vetru", "adptu",
  "hondu", "gildu", "forju", "tempu", "quellu",
  "virtu", "probu", "mertu", "talnu", "flairu",

  // === SKILL + UNIQUE ENDER ===
  "dexyl", "skilyr", "krafyl", "guilyr", "rankyl",
  "proflr", "maslyr", "tesyr", "drilyr", "quiyr",
  "skiliq", "krafiq", "dexaiq", "guiliq", "rankiq",
  "profiq", "masriq", "tesriq", "driliq", "quiriq",

  // === RANDOM UNIQUE 5-7 ===
  "zunly", "kupro", "rivex", "dimex", "nifex",
  "vexon", "zexon", "bexon", "gexon", "rexon",
  "vorix", "zorix", "borix", "gorix", "rorix",
  "vulky", "zulky", "bulky", "gulky", "rulky",
  "vynex", "zynex", "bynex", "gynex", "rynex",
  "vokra", "zokra", "bokra", "gokra", "rokra",
  "vulna", "zulna", "bulna", "gulna", "rulna",

  // === FRESH: SKILL VIBE + LESS COMMON ===
  "dexly", "abtly", "gildy", "forjy", "tempy",
  "wyzrd", "sagio", "cogno", "litho", "nexio",
  "voxel", "pixly", "cybrn", "digtl", "syntx",
  "bytly", "codly", "hackr", "devly", "gitly",
  "nxlvl", "uplvl", "golvl", "rxlvl", "mxlvl",

  // === -ORA / -IRA / -URA (elegant) ===
  "dexora", "gilora", "forora", "temora", "quiora",
  "dexira", "gilira", "forira", "temira", "quiira",
  "dexura", "gilura", "forura", "temura", "quiura",
  "lexora", "vexora", "rexora", "hexora", "nexora",

  // === COMPOUND: action + simple ===
  "makdex", "bilgil", "forjit", "hackiq", "grokly",
  "drlyit", "testly", "pracly", "honeur", "adptly",

  // === TOTALLY NEW APPROACH: non-English roots ===
  "provi", "studo", "docea", "erudy", "sapir",
  "kulto", "tekno", "artos", "makos", "ergos",
  "praxs", "ludos", "scilo", "litea", "lexis",

  // === MEGA SHORT: 4 chars ===
  "dxly", "skly", "krfy", "gldy", "rnky",
  "prxy", "tkny", "rgny", "arty", "spry",
  "qlfy", "drly", "prly", "tsky", "grky",
  "vxly", "zxly", "bxly", "mxly", "nxly",
  "vrbi", "zrbi", "brbi", "mrbi", "nrbi",

  // === SKILL BUT FUN/CUTE ===
  "skilbee", "skilpup", "kraffox", "gildowl",
  "dexbee", "dexfox", "dexpup", "dexowl",
  "forjbee", "forjfox", "forjpup", "forjowl",
  "hackbee", "hackfox", "hackpup", "hackowl",
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
