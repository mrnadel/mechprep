/**
 * Export lesson data as JSON for the TTS generator.
 *
 * Usage:
 *   npx tsx scripts/export-lesson-json.ts sp-sec1-u1-L1          # single lesson
 *   npx tsx scripts/export-lesson-json.ts                         # all lessons
 *   npx tsx scripts/export-lesson-json.ts > scripts/tts-input.json
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

import { getVoiceForCharacter } from '../src/data/voice-config';
import type { SectionCharacterMap } from '../src/data/course/character-arcs';

// ---------------------------------------------------------------------------
// Character maps per profession (section → characterId)
// ---------------------------------------------------------------------------

async function loadSectionCharacterMaps(): Promise<Record<string, SectionCharacterMap>> {
  const maps: Record<string, SectionCharacterMap> = {};

  const professionsDir = path.join(__dirname, '../src/data/course/professions');

  // space-astronomy
  const spaceMod = await import(
    pathToFileURL(path.join(professionsDir, 'space-astronomy/characters.ts')).href
  );
  maps['space-astronomy'] = spaceMod.spaceSectionCharacters;

  // personal-finance
  const financeMod = await import(
    pathToFileURL(path.join(professionsDir, 'personal-finance/characters.ts')).href
  );
  maps['personal-finance'] = financeMod.financeSectionCharacters;

  // psychology
  const psychMod = await import(
    pathToFileURL(path.join(professionsDir, 'psychology/characters.ts')).href
  );
  maps['psychology'] = psychMod.psychologySectionCharacters;

  return maps;
}

// ---------------------------------------------------------------------------
// Load all units across all professions
// ---------------------------------------------------------------------------

async function loadAllUnits(sectionMaps: Record<string, SectionCharacterMap>) {
  const professionsDir = path.join(__dirname, '../src/data/course/professions');
  const professions = fs.readdirSync(professionsDir).filter(d =>
    fs.statSync(path.join(professionsDir, d)).isDirectory()
  );

  const allLessons: any[] = [];

  for (const prof of professions) {
    const unitsDir = path.join(professionsDir, prof, 'units');
    if (!fs.existsSync(unitsDir)) continue;

    const sectionMap = sectionMaps[prof] ?? {};

    const unitFiles = fs.readdirSync(unitsDir).filter(f => f.endsWith('.ts'));
    for (const uf of unitFiles) {
      try {
        const fullPath = path.join(unitsDir, uf);
        const mod = await import(pathToFileURL(fullPath).href);
        // Each file exports an array of Unit or a single Unit
        const exports = Object.values(mod);
        for (const exp of exports) {
          const units = Array.isArray(exp) ? exp : [exp];
          for (const unit of units) {
            if (!unit?.lessons) continue;

            const sectionIndex: number | undefined = unit.sectionIndex;
            const characterId: string | null =
              sectionIndex != null ? (sectionMap[sectionIndex] ?? null) : null;
            const voiceCfg = getVoiceForCharacter(characterId);

            for (const lesson of unit.lessons) {
              allLessons.push({
                id: lesson.id,
                title: lesson.title,
                description: lesson.description,
                unitId: unit.id,
                unitTitle: unit.title,
                profession: prof,
                characterId: characterId,
                voice: voiceCfg.voice,
                langCode: voiceCfg.langCode,
                questions: lesson.questions.map((q: any) => ({
                  id: q.id,
                  type: q.type,
                  question: q.question,
                  explanation: q.explanation,
                  hint: q.hint,
                })),
              });
            }
          }
        }
      } catch (e) {
        console.error(`Failed to load ${uf}:`, (e as Error).message);
      }
    }
  }

  return allLessons;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const lessonId = process.argv[2];
  const sectionMaps = await loadSectionCharacterMaps();
  const lessons = await loadAllUnits(sectionMaps);

  if (lessonId) {
    const filtered = lessons.filter(l => l.id === lessonId);
    if (filtered.length === 0) {
      console.error(`Lesson "${lessonId}" not found. Available:`, lessons.map(l => l.id).join(', '));
      process.exit(1);
    }
    console.log(JSON.stringify(filtered, null, 2));
  } else {
    console.log(JSON.stringify(lessons, null, 2));
  }
}

main();
