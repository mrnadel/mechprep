import type { StoryUnlockEntry } from '../../character-arcs';

export const financeStoryUnlocks: StoryUnlockEntry[] = [
  // ── After Section 1: What Is Money? ──
  {
    id: 'pf-story-1',
    afterSectionIndex: 1,
    characterId: 'pf-alex',
    dialogue: "So I looked at my bank account today. Like, actually looked. I have a checking account, a savings account with $11 in it, and zero clue where my last paycheck went. This is fine.",
    gemReward: 10,
  },
  {
    id: 'pf-story-2',
    afterSectionIndex: 1,
    characterId: 'pf-jordan',
    dialogue: "I always thought I understood money because I track everything in a spreadsheet. But learning about inflation made me realize my $38K in loans is actually growing while I make minimum payments. That number keeps me up at night.",
    gemReward: 10,
  },

  // ── After Section 2: Spending & Budgeting (early: spending awareness) ──
  {
    id: 'pf-story-3',
    afterSectionIndex: 2,
    characterId: 'pf-jordan',
    dialogue: "I tracked every single purchase for 30 days. Groceries, gas, diapers, the $4.50 oat milk latte I pretend I don't buy every morning. Seeing the totals was uncomfortable, but now I know exactly where $127 a month in 'mystery spending' was going.",
    gemReward: 10,
  },

  // ── After Section 2: Spending & Budgeting (late: budgeting methods) ──
  {
    id: 'pf-story-4',
    afterSectionIndex: 2,
    characterId: 'pf-alex',
    dialogue: "I tried the 50/30/20 thing. 50% needs, 30% wants, 20% savings. Turns out my 'wants' were eating like 65% of my paycheck. Subscriptions I forgot about, random impulse stuff at Target. I cancelled 4 subscriptions today. That's $47 a month I just got back.",
    callbackLine: "Alex went from 'I have no idea where my money goes' to cancelling subscriptions. Baby steps.",
    gemReward: 10,
  },

  // ── After Section 3: Saving & Emergency Planning (early: saving fundamentals) ──
  {
    id: 'pf-story-5',
    afterSectionIndex: 3,
    characterId: 'pf-jordan',
    dialogue: "I opened a high-yield savings account today and set up a $50 auto-transfer every payday. It's not much on a lab tech salary, but I did the math. That's $1,200 by next year without even thinking about it. For once, the numbers are working for me instead of against me.",
    gemReward: 10,
  },

  // ── After Section 3: Saving & Emergency Planning (mid: resisting impulse buys) ──
  {
    id: 'pf-story-6',
    afterSectionIndex: 3,
    characterId: 'pf-alex',
    dialogue: "Ok so there was this jacket. $180. Limited edition. I had it in my cart and everything. But then I thought about that lesson on impulse buying and I closed the tab. I literally closed the tab. Who even am I right now? Future Alex is going to be so grateful.",
    callbackLine: "The same Alex who couldn't find his last paycheck just walked away from a $180 jacket.",
    gemReward: 10,
  },

  // ── After Section 3: Saving & Emergency Planning (late: hitting $500 goal) ──
  {
    id: 'pf-story-7',
    afterSectionIndex: 3,
    characterId: 'pf-jordan',
    dialogue: "I just checked my savings account and it hit $512. My first real emergency fund. It's not 3 months of expenses yet, but when my car needed a $200 repair last week, I paid it without panic. No credit card, no borrowing from mom. Just paid it. I almost cried in the parking lot.",
    callbackLine: "Jordan went from anxiety spreadsheets to paying a car repair in cash.",
    gemReward: 10,
  },

  // ── After Section 4: Banking & Financial Systems ──
  {
    id: 'pf-story-8',
    afterSectionIndex: 4,
    characterId: 'pf-alex',
    dialogue: "I finally paid off my credit card. The whole thing. $1,400 and three months of saying no to stuff. I screenshot the $0 balance and sent it to my mom. She said 'proud of you.' I'm not crying, you're crying.",
    callbackLine: "From 'this is fine' with $11 in savings to zero credit card debt. Alex is growing up.",
    gemReward: 10,
  },

  // ── After Section 6: Debt Mastery ──
  {
    id: 'pf-story-9',
    afterSectionIndex: 6,
    characterId: 'pf-jordan',
    dialogue: "I refinanced my student loans from 6.8% to 4.2% and switched to the avalanche method. My payoff date moved up by 14 months. I made a little chart on my fridge. Every time I make a payment, my daughter puts a star sticker on it. She thinks it's a game. Honestly, it kind of is.",
    callbackLine: "The same Jordan who couldn't sleep over $38K in debt now has a star chart on her fridge.",
    gemReward: 10,
  },

  // ── After Section 7: Credit & Investing ──
  {
    id: 'pf-story-10',
    afterSectionIndex: 7,
    characterId: 'pf-alex',
    dialogue: "I opened a brokerage account and bought my first index fund. $200. It's not life-changing money, but a year ago I didn't know what an index fund was. Or a budget. Or where my paycheck went. Jordan texted me 'welcome to the club' and honestly that hit different.",
    callbackLine: "Alex and Jordan both started from zero. Look at them now.",
    gemReward: 10,
  },
];
