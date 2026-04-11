import type { StoryUnlockEntry } from '../../character-arcs';

export const psychologyStoryUnlocks: StoryUnlockEntry[] = [
  // ── After Section 1: Welcome to Your Mind ──────────────────────
  {
    id: 'psy-story-1',
    afterSectionIndex: 1,
    characterId: 'psy-sam',
    dialogue:
      "OK, hold on. I signed up for this class thinking I already knew how my brain works. Turns out I didn't even know what a neurotransmitter does. My brain has been running my life and I had zero clue how.",
    gemReward: 10,
  },
  {
    id: 'psy-story-2',
    afterSectionIndex: 1,
    characterId: 'psy-maya',
    dialogue:
      "I became a psychologist because of a question I couldn't stop asking: why do smart people do irrational things? 20 years of research later, the question only got more interesting. That restless curiosity you're feeling right now? Follow it.",
    gemReward: 10,
  },

  // ── After Section 2: How You Sense the World + Learning ────────
  {
    id: 'psy-story-3',
    afterSectionIndex: 2,
    characterId: 'psy-sam',
    dialogue:
      "I was walking past a mural today and my brain autocompleted a face that wasn't there. Gestalt grouping, right? I literally pointed at a wall and said 'closure principle' out loud. My roommate thinks I've lost it.",
    gemReward: 10,
  },
  {
    id: 'psy-story-4',
    afterSectionIndex: 2,
    characterId: 'psy-sam',
    dialogue:
      "I was scrolling my feed and my friend changed her profile pic 3 days ago. Didn't notice until she told me. That's change blindness. I thought I was paying attention to everything on my screen. Nope. My brain was filtering the whole time.",
    callbackLine: 'Sam went from "I see everything" to realizing his brain skips more than it catches.',
    gemReward: 10,
  },
  {
    id: 'psy-story-5',
    afterSectionIndex: 2,
    characterId: 'psy-maya',
    dialogue:
      "Every time your phone buzzes, your brain gets a tiny dopamine hit. Pavlov didn't need a phone to prove this, just a bell and some dog food. The principle is the same: pair a stimulus with a reward often enough and your body responds automatically.",
    gemReward: 10,
  },
  {
    id: 'psy-story-6',
    afterSectionIndex: 2,
    characterId: 'psy-sam',
    dialogue:
      "So I've been re-reading my notes right before bed thinking that's studying. Turns out that's massed practice, the worst kind. Spaced repetition, interleaving, active recall. Everything I thought I knew about studying was backwards.",
    callbackLine: 'The guy who thought psych was "just common sense" is rewriting his entire study routine.',
    gemReward: 10,
  },
  {
    id: 'psy-story-7',
    afterSectionIndex: 2,
    characterId: 'psy-sam',
    dialogue:
      "I used to bite my nails every time I opened a textbook. Cue, routine, reward, right? I replaced the nail-biting with clicking a pen. It took 2 weeks, but the old habit is gone. I broke a 10-year loop using something I learned in a phone app. That's wild.",
    callbackLine: 'Sam went from learning about habits to actually changing one.',
    gemReward: 10,
  },

  // ── After Section 3: How Your Memory Works ─────────────────────
  {
    id: 'psy-story-8',
    afterSectionIndex: 3,
    characterId: 'psy-maya',
    dialogue:
      "In 1984, a man was wrongly convicted based on an eyewitness who was completely certain. Her memory was vivid, detailed, and wrong. False memories don't feel false. That's what makes them dangerous, and why this research matters so much.",
    gemReward: 10,
  },
  {
    id: 'psy-story-9',
    afterSectionIndex: 3,
    characterId: 'psy-sam',
    dialogue:
      "Finals are in 2 weeks and I'm actually using the method of loci for my bio exam. I turned the Krebs cycle into a walk through my apartment. Couch is citrate, fridge is isocitrate. It sounds ridiculous but I remembered every step on the first try.",
    callbackLine: 'From "psychology is common sense" to using memory palaces for organic chemistry.',
    gemReward: 10,
  },
  {
    id: 'psy-story-10',
    afterSectionIndex: 3,
    characterId: 'psy-maya',
    dialogue:
      "Sam, you started this course thinking you already knew how your mind works. Now you know why eyewitnesses get it wrong, how habits hijack your brain, and why your senses lie to you every day. The mind isn't simple. But you're no longer fooled by it.",
    callbackLine: "Dr. Maya's first question was 'why do smart people do irrational things?' Sam can finally answer it.",
    gemReward: 10,
  },
];
