import type { CharacterLines } from '../../character-lines';

export const financeCharacterLines: CharacterLines[] = [
  {
    characterId: 'pf-alex',
    teachingLines: [
      { match: 'budget', line: 'Budgets used to scare me. Then I realized my bank account scared me more.' },
      { match: 'save', line: 'Past Alex thought savings meant whatever was left after takeout. Do not be Past Alex.' },
      { match: 'credit', line: 'I got my first credit card and thought it was free money. Narrator: it was not free.' },
      { match: 'invest', line: 'Investing felt like a rich-people thing until someone showed me you can start with ten bucks.' },
      { match: 'debt', line: 'Fun fact: debt does not care that you forgot about it. It remembers everything.' },
      { match: 'tax', line: 'Taxes are like that group project where the government does the grading.' },
      { match: 'emergency', line: 'My emergency fund used to be "call mom." Turns out that is not a financial strategy.' },
      { match: null, line: 'Alright, let me learn this so I stop making the same mistakes on repeat.' },
    ],
    resultLines: [
      { minAccuracy: 100, line: 'Perfect score?! Who even am I right now? Future millionaire vibes.' },
      { minAccuracy: 90, line: 'Dude, that was solid. I actually understood most of that.' },
      { minAccuracy: 70, line: 'Not bad! A few stumbles but honestly way better than my actual finances.' },
      { minAccuracy: 50, line: 'Okay that was rough, but at least I showed up. That counts for something.' },
      { minAccuracy: 0, line: 'Well... at least I did not spend money while getting these wrong? Silver lining.' },
    ],
    celebrationLines: [
      { type: 'halfway', line: 'Halfway there! I am learning more here than I did in four years of college.' },
      { type: 'last-question', line: 'Last one! Let me lock in and finish strong for once.' },
      { type: 'streak', line: 'Look at this streak! My bank account wishes I was this consistent.' },
    ],
  },
  {
    characterId: 'pf-jordan',
    teachingLines: [
      { match: 'budget', line: 'A budget is not about restriction. It is about knowing where every dollar goes.' },
      { match: 'save', line: 'I save $50 per paycheck. It is not glamorous, but in 12 months that is $1,200.' },
      { match: 'credit', line: 'Your credit score follows you everywhere. I learned that the hard way during apartment hunting.' },
      { match: 'invest', line: 'Even small investments grow over time. That is compound interest working for you, not against you.' },
      { match: 'debt', line: 'I mapped out every dollar I owe. Seeing the real number was terrifying, but it was the first step.' },
      { match: 'tax', line: 'Tax refunds are not bonus money. That was your money all along, just returned late.' },
      { match: 'loan', line: 'Student loans taught me that borrowing money costs way more than the sticker price.' },
      { match: null, line: 'Let us break this down step by step. The numbers always make more sense that way.' },
    ],
    resultLines: [
      { minAccuracy: 100, line: 'Every single one correct. That kind of precision is exactly how you build real security.' },
      { minAccuracy: 90, line: 'Really strong. You clearly put the work in and it shows.' },
      { minAccuracy: 70, line: 'Good progress. A few gaps to review, but you are building a solid foundation.' },
      { minAccuracy: 50, line: 'Some of these are tricky. Write down what tripped you up and revisit it.' },
      { minAccuracy: 0, line: 'Rough round, but showing up matters. Review the ones you missed and try again.' },
    ],
    celebrationLines: [
      { type: 'halfway', line: 'Halfway through! Steady progress beats perfect sprints every time.' },
      { type: 'last-question', line: 'One more question. Stay focused and finish what you started.' },
      { type: 'streak', line: 'That streak is proof you are building real habits. Keep it going.' },
    ],
  },
];
