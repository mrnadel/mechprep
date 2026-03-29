import type { Unit } from '../../types';

export const psychologyCourseMeta: Unit[] = [
  // ── Unit 1: Your Amazing Brain ──
  {
    id: "psy-u1-brain",
    title: "Your Amazing Brain",
    description: "How your brain works, what neurons do, and why attention is your superpower.",
    color: "#A78BFA",
    icon: "🧠",
    lessons: [
      { id: "psy-u1-L1", title: "Meet Your Brain", description: "The three-pound universe inside your skull and what it does all day.", icon: "🧠", xpReward: 10, questions: [] },
      { id: "psy-u1-L2", title: "Neurons & Signals", description: "How brain cells talk to each other using electricity and chemicals.", icon: "⚡", xpReward: 10, questions: [] },
      { id: "psy-u1-L3", title: "Left Brain, Right Brain (Myth vs Reality)", description: "What the two hemispheres actually do and why the popular myth is wrong.", icon: "🔀", xpReward: 15, questions: [] },
      { id: "psy-u1-L4", title: "Attention & Focus", description: "Why your brain filters 99% of what's around you and how to control what gets through.", icon: "🎯", xpReward: 15, questions: [] },
      { id: "psy-u1-L5", title: "The Conscious & Unconscious Mind", description: "The iceberg model: what you're aware of vs what happens behind the scenes.", icon: "🧊", xpReward: 15, questions: [] },
      { id: "psy-u1-L6", title: "Brain Basics Blitz", description: "Race the clock on everything you've learned about your brain.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 2: Thinking Traps ──
  {
    id: "psy-u2-biases",
    title: "Thinking Traps",
    description: "Cognitive biases that fool everyone, every day, without them even noticing.",
    color: "#F472B6",
    icon: "🪤",
    lessons: [
      { id: "psy-u2-L1", title: "What Are Cognitive Biases?", description: "Your brain takes shortcuts. Sometimes they help. Sometimes they don't.", icon: "🔍", xpReward: 10, questions: [] },
      { id: "psy-u2-L2", title: "Confirmation Bias", description: "Why you only notice evidence that supports what you already believe.", icon: "✅", xpReward: 15, questions: [] },
      { id: "psy-u2-L3", title: "Anchoring & Framing", description: "How the first number you see changes every decision that follows.", icon: "⚓", xpReward: 15, questions: [] },
      { id: "psy-u2-L4", title: "The Availability Heuristic", description: "Why you think plane crashes are common and car accidents are rare.", icon: "📰", xpReward: 15, questions: [] },
      { id: "psy-u2-L5", title: "Dunning-Kruger & Impostor Syndrome", description: "Why beginners feel like experts and experts feel like fakes.", icon: "🎭", xpReward: 15, questions: [] },
      { id: "psy-u2-L6", title: "Sunk Cost Fallacy", description: "Why you finish bad movies, stay in bad relationships, and hold losing stocks.", icon: "💸", xpReward: 15, questions: [] },
      { id: "psy-u2-L7", title: "Bias Spotter Challenge", description: "Can you identify the bias hiding in each real-world scenario?", icon: "🏆", xpReward: 20, questions: [] },
      { id: "psy-u2-L8", title: "Thinking Traps Speed Round", description: "Race the clock on cognitive biases and thinking traps.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 3: Memory & Learning ──
  {
    id: "psy-u3-memory",
    title: "Memory & Learning",
    description: "How memories form, why you forget, and science-backed tricks to learn anything faster.",
    color: "#60A5FA",
    icon: "💾",
    lessons: [
      { id: "psy-u3-L1", title: "How Memories Form", description: "From sensation to short-term to long-term: the journey of a memory.", icon: "🧩", xpReward: 10, questions: [] },
      { id: "psy-u3-L2", title: "Short-Term vs Long-Term Memory", description: "Why you can remember your childhood but forgot what you ate yesterday.", icon: "📦", xpReward: 15, questions: [] },
      { id: "psy-u3-L3", title: "The Forgetting Curve", description: "You lose 50% of new info within an hour. Here's how to beat it.", icon: "📉", xpReward: 15, questions: [] },
      { id: "psy-u3-L4", title: "Spaced Repetition & Active Recall", description: "The two most powerful study techniques science has ever found.", icon: "🔁", xpReward: 15, questions: [] },
      { id: "psy-u3-L5", title: "False Memories & Eyewitness Errors", description: "Your memory isn't a camera. It rewrites itself every time you remember.", icon: "📷", xpReward: 20, questions: [] },
      { id: "psy-u3-L6", title: "Sleep, Stress & Memory", description: "Why pulling all-nighters destroys your ability to learn.", icon: "😴", xpReward: 15, questions: [] },
      { id: "psy-u3-L7", title: "Memory Lab Conversation", description: "Help a friend fix their terrible study habits using memory science.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "psy-u3-L8", title: "Memory Speed Round", description: "Race the clock on everything you've learned about memory and learning.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 4: Emotions & Motivation ──
  {
    id: "psy-u4-emotions",
    title: "Emotions & Motivation",
    description: "What emotions are, why they exist, and the surprising science of what drives you.",
    color: "#F59E0B",
    icon: "🔥",
    lessons: [
      { id: "psy-u4-L1", title: "What Are Emotions?", description: "Not just feelings. Emotions are your brain's rapid-response system.", icon: "💡", xpReward: 10, questions: [] },
      { id: "psy-u4-L2", title: "The Big Six Emotions", description: "Happiness, sadness, anger, fear, surprise, and disgust. Why exactly these six?", icon: "🎭", xpReward: 15, questions: [] },
      { id: "psy-u4-L3", title: "Fight, Flight, Freeze", description: "Your stress response: the ancient survival system that still runs your life.", icon: "🏃", xpReward: 15, questions: [] },
      { id: "psy-u4-L4", title: "Intrinsic vs Extrinsic Motivation", description: "Why paying people sometimes makes them perform worse.", icon: "🎯", xpReward: 15, questions: [] },
      { id: "psy-u4-L5", title: "Dopamine & Reward", description: "The brain's motivation molecule: why likes, games, and junk food feel so good.", icon: "🍬", xpReward: 15, questions: [] },
      { id: "psy-u4-L6", title: "Emotional Intelligence", description: "Reading emotions in yourself and others. The skill that predicts success.", icon: "🤝", xpReward: 20, questions: [] },
      { id: "psy-u4-L7", title: "Emotions at Work Conversation", description: "Navigate an emotionally tricky workplace situation using EQ.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "psy-u4-L8", title: "Emotions & Motivation Speed Round", description: "Race the clock on emotions, motivation, dopamine, and EQ.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 5: Social Psychology ──
  {
    id: "psy-u5-social",
    title: "Social Psychology",
    description: "How other people change what you think, feel, and do, often without you knowing.",
    color: "#34D399",
    icon: "👥",
    lessons: [
      { id: "psy-u5-L0", title: "From Feelings to Social Forces", description: "Your emotions don't exist in a vacuum. Other people shape them constantly.", icon: "🌉", xpReward: 10, questions: [] },
      { id: "psy-u5-L1", title: "Conformity & Peer Pressure", description: "The Asch experiment: why you'll agree with a group you know is wrong.", icon: "🐑", xpReward: 10, questions: [] },
      { id: "psy-u5-L2", title: "Obedience to Authority", description: "Milgram's experiment: how ordinary people do extraordinary harm when told to.", icon: "👔", xpReward: 15, questions: [] },
      { id: "psy-u5-L3", title: "The Bystander Effect", description: "Why more witnesses means less help. The Kitty Genovese lesson.", icon: "👀", xpReward: 15, questions: [] },
      { id: "psy-u5-L4", title: "First Impressions & Stereotypes", description: "Your brain judges people in 100 milliseconds. Is it right?", icon: "🤔", xpReward: 15, questions: [] },
      { id: "psy-u5-L5", title: "Groupthink & Echo Chambers", description: "When smart groups make terrible decisions. From boardrooms to social media.", icon: "🔊", xpReward: 20, questions: [] },
      { id: "psy-u5-L6", title: "Persuasion & Influence", description: "Cialdini's six principles: reciprocity, scarcity, authority, consistency, liking, consensus.", icon: "🎤", xpReward: 20, questions: [] },
      { id: "psy-u5-L7", title: "Social Psychology in Action", description: "Help a friend navigate social pressure at work.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "psy-u5-L8", title: "Social Psych Speed Round", description: "Race the clock on conformity, obedience, bystanders, and persuasion.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 6: Personality & Identity ──
  {
    id: "psy-u6-personality",
    title: "Personality & Identity",
    description: "What makes you 'you'? Traits, types, nature vs nurture, and the science of self.",
    color: "#818CF8",
    icon: "🪞",
    lessons: [
      { id: "psy-u6-L0", title: "From Groups to the Individual", description: "You've seen how groups shape behavior. Now let's look at what makes each person unique.", icon: "🌉", xpReward: 10, questions: [] },
      { id: "psy-u6-L1", title: "The Big Five Personality Traits", description: "OCEAN: the five dimensions that science actually agrees on.", icon: "🌊", xpReward: 10, questions: [] },
      { id: "psy-u6-L2", title: "Myers-Briggs: Popular but Problematic", description: "Why MBTI is everywhere and why psychologists don't trust it.", icon: "📊", xpReward: 15, questions: [] },
      { id: "psy-u6-L3", title: "Nature vs Nurture", description: "Genes load the gun, environment pulls the trigger. How much is each?", icon: "🧬", xpReward: 15, questions: [] },
      { id: "psy-u6-L4", title: "Self-Concept & Self-Esteem", description: "How you see yourself shapes everything you do. Can you change it?", icon: "🪞", xpReward: 15, questions: [] },
      { id: "psy-u6-L5", title: "Growth Mindset vs Fixed Mindset", description: "Dweck's research: believing you can improve actually makes you improve.", icon: "🌱", xpReward: 15, questions: [] },
      { id: "psy-u6-L6", title: "Personality Advice Chat", description: "Help a friend understand their personality test results.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "psy-u6-L7", title: "Personality Speed Round", description: "Race the clock on Big Five, MBTI, nature vs nurture, and mindsets.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 7: Decision Making ──
  {
    id: "psy-u7-decisions",
    title: "Decision Making",
    description: "How your brain makes choices, why it often gets them wrong, and how to decide better.",
    color: "#F472B6",
    icon: "🔀",
    lessons: [
      { id: "psy-u7-L1", title: "System 1 & System 2", description: "Kahneman's two systems: fast intuition vs slow reasoning.", icon: "⚡", xpReward: 15, questions: [] },
      { id: "psy-u7-L2", title: "Loss Aversion", description: "Losing $100 hurts twice as much as gaining $100 feels good. Why?", icon: "📉", xpReward: 15, questions: [] },
      { id: "psy-u7-L3", title: "The Paradox of Choice", description: "More options make you less happy and less likely to choose at all.", icon: "🛒", xpReward: 15, questions: [] },
      { id: "psy-u7-L4", title: "Heuristics: Mental Shortcuts", description: "Rules of thumb that save time but cost accuracy.", icon: "🧭", xpReward: 15, questions: [] },
      { id: "psy-u7-L5", title: "Prospect Theory & Risk", description: "Why people buy lottery tickets and insurance on the same day.", icon: "🎰", xpReward: 20, questions: [] },
      { id: "psy-u7-L6", title: "Nudges & Choice Architecture", description: "How small design changes lead to big behavior shifts.", icon: "👉", xpReward: 20, questions: [] },
      { id: "psy-u7-L7", title: "Decision Dilemmas Chat", description: "Help a friend make better decisions using what you've learned.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "psy-u7-L8", title: "Decision Making Speed Round", description: "Race the clock on System 1 and 2, loss aversion, heuristics, and nudges.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 8: Behavioral Economics ──
  {
    id: "psy-u8-behavioral-econ",
    title: "Behavioral Economics",
    description: "Where psychology meets money. Why humans are predictably irrational with cash.",
    color: "#10B981",
    icon: "💰",
    lessons: [
      { id: "psy-u8-L0", title: "From Decisions to Dollars", description: "How decision-making biases show up every time you open your wallet.", icon: "🌉", xpReward: 10, questions: [] },
      { id: "psy-u8-L1", title: "Rational vs Real Humans", description: "Economics assumes you're rational. Psychology proves you're not.", icon: "🤖", xpReward: 15, questions: [] },
      { id: "psy-u8-L2", title: "Mental Accounting", description: "Why $100 from a bonus feels different from $100 you earned. It shouldn't.", icon: "🧮", xpReward: 15, questions: [] },
      { id: "psy-u8-L3", title: "The Endowment Effect", description: "You value what you own more than what you don't. Sellers always overcharge.", icon: "🏠", xpReward: 15, questions: [] },
      { id: "psy-u8-L4", title: "Pricing Psychology", description: "Why $9.99 beats $10 and why decoy options change your pick.", icon: "🏷️", xpReward: 15, questions: [] },
      { id: "psy-u8-L5", title: "Hyperbolic Discounting", description: "Why you'd take $50 today over $100 in a year. Your future self loses.", icon: "⏳", xpReward: 20, questions: [] },
      { id: "psy-u8-L6", title: "Scarcity & FOMO", description: "Limited time! Only 3 left! Why urgency hacks your brain.", icon: "⏰", xpReward: 15, questions: [] },
      { id: "psy-u8-L7", title: "The Impulse Buy Dilemma", description: "Help a friend navigate a classic behavioral economics trap.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "psy-u8-L8", title: "Behavioral Economics Blitz", description: "Race the clock on mental accounting, pricing tricks, and irrational behavior.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 9: Mental Models & Critical Thinking ──
  {
    id: "psy-u9-mental-models",
    title: "Mental Models & Critical Thinking",
    description: "Frameworks for thinking clearly, spotting BS, and making better judgments.",
    color: "#6366F1",
    icon: "🔬",
    lessons: [
      { id: "psy-u9-L0", title: "From Money Traps to Thinking Tools", description: "You learned to spot irrational behavior. Now let's build frameworks for thinking clearly.", icon: "🌉", xpReward: 10, questions: [] },
      { id: "psy-u9-L1", title: "First Principles Thinking", description: "Break problems down to fundamentals instead of reasoning by analogy.", icon: "🧱", xpReward: 15, questions: [] },
      { id: "psy-u9-L2", title: "Inversion: Think Backwards", description: "Instead of 'how do I succeed?', ask 'what would guarantee failure?'", icon: "🔄", xpReward: 15, questions: [] },
      { id: "psy-u9-L3", title: "Correlation vs Causation", description: "Ice cream sales and drownings both rise in summer. Connected? No.", icon: "📊", xpReward: 15, questions: [] },
      { id: "psy-u9-L4", title: "Base Rate Neglect", description: "Why your positive test result is probably wrong. The math that saves lives.", icon: "🎲", xpReward: 20, questions: [] },
      { id: "psy-u9-L5", title: "Logical Fallacies", description: "Ad hominem, straw man, slippery slope. Spot bad arguments instantly.", icon: "💬", xpReward: 15, questions: [] },
      { id: "psy-u9-L6", title: "Debiasing Your Thinking", description: "Pre-mortems, red teams, and other tools to outsmart your own brain.", icon: "🛡️", xpReward: 20, questions: [] },
      { id: "psy-u9-L7", title: "The Argument Clinic", description: "Spot logical fallacies and bad reasoning in a heated online debate.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "psy-u9-L8", title: "Mental Models Blitz", description: "Race the clock on first principles, fallacies, and reasoning traps.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 10: Influence & Dark Patterns ──
  {
    id: "psy-u10-influence",
    title: "Influence & Dark Patterns",
    description: "How advertising, social media, and bad actors exploit your psychology, and how to defend yourself.",
    color: "#EF4444",
    icon: "🛡️",
    lessons: [
      { id: "psy-u10-L0", title: "From Clear Thinking to Self-Defense", description: "You've built your critical thinking toolkit. Now let's see who's trying to bypass it.", icon: "🌉", xpReward: 10, questions: [] },
      { id: "psy-u10-L1", title: "Advertising & Your Brain", description: "How ads bypass your rational mind and speak directly to your emotions.", icon: "📺", xpReward: 15, questions: [] },
      { id: "psy-u10-L2", title: "Social Media & Dopamine Loops", description: "Infinite scroll, notifications, likes. Designed to be addictive.", icon: "📱", xpReward: 15, questions: [] },
      { id: "psy-u10-L3", title: "Propaganda & Misinformation", description: "Repetition, emotional triggers, and us-vs-them framing. How to spot it.", icon: "📢", xpReward: 20, questions: [] },
      { id: "psy-u10-L4", title: "Dark UX Patterns", description: "Confirmshaming, hidden fees, roach motels. When design manipulates you.", icon: "🕸️", xpReward: 15, questions: [] },
      { id: "psy-u10-L5", title: "Building Your Defense System", description: "Practical tools to protect your attention, decisions, and mental health.", icon: "🏰", xpReward: 20, questions: [] },
    ],
  },
];
