export interface CharacterTeachingLine {
  match: string | null; // keyword match against question text. null = fallback
  line: string;
}

export interface CharacterResultLine {
  minAccuracy: number; // 0-100, checked high-to-low
  line: string;
}

export interface CharacterCelebrationLine {
  type: 'halfway' | 'last-question' | 'streak';
  line: string;
}

export interface CharacterLines {
  characterId: string;
  teachingLines: CharacterTeachingLine[];
  resultLines: CharacterResultLine[];
  celebrationLines: CharacterCelebrationLine[];
}
