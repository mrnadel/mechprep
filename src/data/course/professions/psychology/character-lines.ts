import type { CharacterLines } from '../../character-lines';

export const psychologyCharacterLines: CharacterLines[] = [
  {
    characterId: 'psy-maya',
    teachingLines: [
      { match: 'bias', line: 'Cognitive biases are not flaws. They are shortcuts your brain takes when processing gets expensive.' },
      { match: 'memory', line: 'Memory is not a recording. It is a reconstruction, and that changes everything about how we understand it.' },
      { match: 'emotion', line: 'Emotions are data, not noise. Researchers have shown they shape every decision we think is rational.' },
      { match: 'behavior', line: 'What if the behavior you find puzzling in others makes perfect sense from their perspective?' },
      { match: 'social', line: 'We are social creatures first. Even our concept of "self" is built in relation to others.' },
      { match: 'decision', line: 'Most decisions happen before your conscious mind gets involved. The research on that is fascinating.' },
      { match: 'condition', line: 'Classical conditioning is everywhere. Notice how you feel when your phone buzzes? That is Pavlov at work.' },
      { match: null, line: 'Think about this one carefully. The obvious answer in psychology is rarely the complete one.' },
    ],
    resultLines: [
      { minAccuracy: 100, line: 'Flawless. You are thinking like a researcher now, questioning assumptions and finding the real answers.' },
      { minAccuracy: 90, line: 'Excellent work. That level of precision tells me you are genuinely engaging with the material.' },
      { minAccuracy: 70, line: 'Solid understanding forming here. The nuances will click with a bit more practice.' },
      { minAccuracy: 50, line: 'Psychology is counterintuitive by nature. Revisit the ones that surprised you.' },
      { minAccuracy: 0, line: 'This is a tough subject. The good news? Struggling with it means your brain is doing real learning.' },
    ],
    celebrationLines: [
      { type: 'halfway', line: 'Halfway through. You are building a mental framework that will change how you see people.' },
      { type: 'last-question', line: 'Final question. Trust your understanding and commit to your answer.' },
      { type: 'streak', line: 'Consistent practice rewires your brain. That is not a metaphor, it is neuroscience.' },
    ],
  },
  {
    characterId: 'psy-sam',
    teachingLines: [
      { match: 'bias', line: 'Wait, so my brain is basically lying to me on a regular basis? That explains so much.' },
      { match: 'memory', line: 'So you are telling me my memory of last summer might be partly made up? That is wild.' },
      { match: 'emotion', line: 'I always thought I was being logical. Turns out emotions are running the show behind the scenes.' },
      { match: 'behavior', line: 'This is like getting cheat codes for understanding why people do what they do.' },
      { match: 'social', line: 'No way, so peer pressure is literally wired into our brains? That explains high school.' },
      { match: 'decision', line: 'I thought I was choosing my lunch. Turns out like twelve subconscious things chose it for me.' },
      { match: 'condition', line: 'I just realized I am basically Pavlov-ed by my notification sounds. That is both cool and concerning.' },
      { match: null, line: 'Okay this is actually really interesting. I thought psych was just common sense but it is way deeper.' },
    ],
    resultLines: [
      { minAccuracy: 100, line: 'No way, perfect score! I am actually understanding this stuff. Mind officially blown.' },
      { minAccuracy: 90, line: 'Okay I am kind of crushing this? Psych is becoming my thing.' },
      { minAccuracy: 70, line: 'Not bad! Some of those were tricky but I am starting to see the patterns.' },
      { minAccuracy: 50, line: 'Some of those totally got me. Psychology is sneaky like that.' },
      { minAccuracy: 0, line: 'Yeah okay that was humbling. But at least now I know what I do not know, right?' },
    ],
    celebrationLines: [
      { type: 'halfway', line: 'Already halfway! This is way more interesting than I expected it to be.' },
      { type: 'last-question', line: 'One more! Let me focus and actually think about this one.' },
      { type: 'streak', line: 'Look at me being all consistent. My past self would never believe this.' },
    ],
  },
];
