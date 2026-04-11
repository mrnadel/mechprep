/**
 * Voice configuration for Kokoro TTS — maps each course character
 * to a Kokoro voice name and language code.
 *
 * Used by:
 *  - scripts/export-lesson-json.ts (embeds voice info into lesson JSON)
 *  - scripts/generate-tts.py       (reads voice from lesson JSON)
 */

export interface VoiceConfig {
  voice: string;
  langCode: string;
}

export const CHARACTER_VOICES: Record<string, VoiceConfig> = {
  'space-nova': { voice: 'af_bella', langCode: 'a' },
  'space-kai': { voice: 'am_puck', langCode: 'a' },
  'pf-alex': { voice: 'am_fenrir', langCode: 'a' },
  'pf-jordan': { voice: 'af_heart', langCode: 'a' },
  'psy-maya': { voice: 'bf_emma', langCode: 'b' },
  'psy-sam': { voice: 'am_michael', langCode: 'a' },
};

export const DEFAULT_VOICE: VoiceConfig = { voice: 'af_heart', langCode: 'a' };

export function getVoiceForCharacter(characterId: string | null): VoiceConfig {
  if (!characterId) return DEFAULT_VOICE;
  return CHARACTER_VOICES[characterId] ?? DEFAULT_VOICE;
}
