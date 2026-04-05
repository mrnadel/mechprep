import type { Unit } from '../../types';

export const psychologyCourseMeta: Unit[] = [

  // ── Section 1: Welcome to Your Mind (8 units from section-1-mind-part1 and part2) ──
  {
    id: 'psy-sec1-u1',
    title: 'What Is Psychology?',
    description: 'Discover what psychologists actually study and why it matters for your everyday life.',
    color: '#A78BFA',
    icon: '🧠',
    sectionIndex: 1,
    sectionTitle: 'Welcome to Your Mind',
    lessons: [
      { id: 'psy-sec1-u1-L1', title: 'More Than Mind Reading', description: 'What psychology really is and why most people get it wrong.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec1-u1-L2', title: 'The Many Faces of Psychology', description: 'The surprising range of topics psychologists actually study.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec1-u1-L3', title: 'How Psychologists Find Answers', description: 'The basic tools psychologists use to separate fact from fiction.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u1-L4', title: 'What Is Psychology? Blitz', description: 'Race the clock on everything from this unit.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec1-u2',
    title: 'A Brief History: Freud to fMRI',
    description: 'How psychology evolved from philosophy to brain scanners in just 150 years.',
    color: '#818CF8',
    icon: '📜',
    sectionIndex: 1,
    sectionTitle: 'Welcome to Your Mind',
    lessons: [
      { id: 'psy-sec1-u2-L1', title: 'The Birth of Psychology', description: 'How psychology split from philosophy and became its own science.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec1-u2-L2', title: 'Freud and the Unconscious', description: 'The controversial doctor who changed how we think about hidden thoughts.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u2-L3', title: 'Three Big Shifts in Psychology', description: 'How behaviorism, humanism, and cognitive science transformed the field.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u2-L4', title: 'Modern Psychology and Brain Imaging', description: 'How technology lets us watch the brain in action.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u2-L5', title: 'History of Psychology Blitz', description: 'Race the clock on the key figures and ideas that shaped psychology.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec1-u3',
    title: 'Brain Anatomy: The 3-Pound Universe',
    description: 'Explore the major parts of your brain and what each one does.',
    color: '#C084FC',
    icon: '🧬',
    sectionIndex: 1,
    sectionTitle: 'Welcome to Your Mind',
    lessons: [
      { id: 'psy-sec1-u3-L1', title: 'Meet Your Brain', description: 'The basics of what lives inside your skull and why it matters.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec1-u3-L2', title: 'The Brain Stem and Cerebellum', description: 'The parts that keep you alive and moving without you even thinking about it.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u3-L3', title: 'The Cerebrum and Its Lobes', description: 'The wrinkly outer layer where thinking, planning, and personality live.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u3-L4', title: 'Left Brain, Right Brain', description: 'What the two hemispheres actually do and why the popular myth is mostly wrong.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u3-L5', title: 'Brain Anatomy Blitz', description: 'Race the clock on brain parts, lobes, and myths.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec1-u4',
    title: 'Section 1 Review',
    description: 'Pull together everything you\'ve learned about psychology, its history, and the brain.',
    color: '#7C3AED',
    icon: '🎯',
    sectionIndex: 1,
    sectionTitle: 'Welcome to Your Mind',
    lessons: [
      { id: 'psy-sec1-u4-L1', title: 'Psychology Foundations Review', description: 'Test your knowledge of what psychology is and how it works.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u4-L2', title: 'Brain Anatomy Review', description: 'Test your knowledge of brain parts, lobes, and what they do.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec1-u4-L3', title: 'Welcome to Your Mind: Final Blitz', description: 'The ultimate speed round covering everything from Section 1.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec1-u5',
    title: 'The Brain\'s Messaging System',
    description: 'How billions of tiny cells use electricity and chemicals to create every thought you have.',
    color: '#A78BFA',
    icon: '⚡',
    sectionIndex: 1,
    sectionTitle: 'Welcome to Your Mind',
    lessons: [
      { id: 'psy-sec1-u5-L1', title: 'What Is a Neuron?', description: 'The basic building block of your brain and nervous system.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec1-u5-L2', title: 'How Neurons Fire', description: 'The electrical spark that travels down every neuron when it sends a message.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u5-L3', title: 'The Synapse', description: 'The tiny gap between neurons where chemical messages jump across.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u5-L4', title: 'Meet the Neurotransmitters', description: 'The key chemical messengers in your brain and what each one does.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u5-L5', title: 'Neural Networks and Plasticity', description: 'How your brain rewires itself every time you learn something new.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec1-u6',
    title: 'Left Brain, Right Brain: Myth vs Reality',
    description: 'Why the popular idea that people are "left-brained" or "right-brained" is wrong.',
    color: '#A78BFA',
    icon: '🧩',
    sectionIndex: 1,
    sectionTitle: 'Welcome to Your Mind',
    lessons: [
      { id: 'psy-sec1-u6-L1', title: 'The Two Hemispheres', description: 'Your brain has two halves, and they do have some specializations.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec1-u6-L2', title: 'The Split-Brain Experiments', description: 'What happens when the connection between brain halves is cut.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u6-L3', title: 'Busting the Left-Brain/Right-Brain Myth', description: 'Why calling yourself left-brained or right-brained is not supported by science.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u6-L4', title: 'How the Hemispheres Actually Differ', description: 'The real differences between hemispheres and why they matter.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u6-L5', title: 'Lateralization Around the World', description: 'How handedness, culture, and individual differences affect brain organization.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec1-u7',
    title: 'The Conscious and Unconscious Mind',
    description: 'Most of what your brain does happens without you knowing it.',
    color: '#A78BFA',
    icon: '🌊',
    sectionIndex: 1,
    sectionTitle: 'Welcome to Your Mind',
    lessons: [
      { id: 'psy-sec1-u7-L1', title: 'What Is Consciousness?', description: 'The experience of being aware of yourself and your surroundings.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec1-u7-L2', title: 'The Unconscious Mind', description: 'The vast mental activity happening below your awareness every second.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u7-L3', title: 'Automatic vs Controlled Processing', description: 'Why some things require focus and others happen on autopilot.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u7-L4', title: 'Sleep and Altered States', description: 'What happens to consciousness when you sleep, dream, or meditate.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u7-L5', title: 'Attention and Its Limits', description: 'Why you can only focus on a few things at once and what that means for daily life.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec1-u8',
    title: 'Your Mind: The Complete Picture',
    description: 'Test your knowledge of neurons, hemispheres, consciousness, and everything from Section 1.',
    color: '#A78BFA',
    icon: '🏆',
    sectionIndex: 1,
    sectionTitle: 'Welcome to Your Mind',
    lessons: [
      { id: 'psy-sec1-u8-L1', title: 'Neurons and Brain Communication Review', description: 'Revisit how neurons fire, connect, and communicate using chemicals.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u8-L2', title: 'Hemispheres and the Left/Right Myth Review', description: 'Test what you know about how the two brain halves really work.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec1-u8-L3', title: 'Consciousness, Attention, and Processing Review', description: 'Test your understanding of awareness, automatic processing, and altered states.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec1-u8-L4', title: 'Section 1 Speed Round', description: 'Race the clock on everything from Welcome to Your Mind.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  // ── Section 2: How You Sense the World (9 units) ──
  {
    id: "psy-s2-u1",
    title: "How You See the World",
    description: "Your senses are your only window to reality. Find out how they work.",
    color: "#F472B6",
    icon: "👁️",
    sectionIndex: 2,
    sectionTitle: "How You Sense the World",
    lessons: [
      { id: "psy-s2-u1-L1", title: "Your Senses Are Translators", description: "How your body converts light, sound, and pressure into brain signals.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-s2-u1-L2", title: "Thresholds: What Can You Detect?", description: "The minimum amount of energy your senses need to notice something.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u1-L3", title: "Why You Stop Noticing", description: "Your brain tunes out things that stay the same.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u1-L4", title: "How Your Eyes Work", description: "From light entering your eye to signals reaching your brain.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-s2-u1-L5", title: "Color and Light", description: "How your brain creates the experience of color from wavelengths of light.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },


  {
    id: "psy-s2-u2",
    title: "Optical Illusions and Perception Tricks",
    description: "Your brain takes shortcuts when building reality. Sometimes those shortcuts backfire.",
    color: "#F472B6",
    icon: "🎭",
    sectionIndex: 2,
    sectionTitle: "How You Sense the World",
    lessons: [
      { id: "psy-s2-u2-L1", title: "Your Brain Fills in the Gaps", description: "Gestalt principles: how your brain groups things to make sense of the world.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-s2-u2-L2", title: "Figure and Ground", description: "How your brain decides what is the object and what is the background.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u2-L3", title: "Size and Shape Constancy", description: "Why a door still looks like a door even when it changes shape on your retina.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u2-L4", title: "Famous Illusions Explained", description: "Why the Muller-Lyer, Ponzo, and other illusions fool your brain.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-s2-u2-L5", title: "Top-Down vs Bottom-Up", description: "Does your brain build perception from data or from expectations?", icon: "📝", xpReward: 20, questions: [] },
    ],
  },


  {
    id: "psy-s2-u3",
    title: "Hearing, Touch, Taste, Smell",
    description: "Vision gets all the attention, but your other senses shape your world just as much.",
    color: "#F472B6",
    icon: "👂",
    sectionIndex: 2,
    sectionTitle: "How You Sense the World",
    lessons: [
      { id: "psy-s2-u3-L1", title: "How Hearing Works", description: "Sound waves, eardrums, and how your brain turns vibrations into music.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-s2-u3-L2", title: "Touch and Temperature", description: "How pressure, heat, and cold become signals your brain can read.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u3-L3", title: "Taste and Smell", description: "The chemical senses that detect molecules floating in air and dissolved in saliva.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u3-L4", title: "Your Senses Work Together", description: "Multisensory integration and how senses influence each other.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },


  {
    id: "psy-s2-u4",
    title: "Review: Senses",
    description: "Test what you remember about sensation, perception, and your senses.",
    color: "#F472B6",
    icon: "🔄",
    sectionIndex: 2,
    sectionTitle: "How You Sense the World",
    lessons: [
      { id: "psy-s2-u4-L1", title: "Key Concepts Review", description: "Revisit the core ideas from sensation and perception.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u4-L2", title: "Perception Principles Review", description: "Review Gestalt principles, depth cues, and perceptual constancy.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u4-L3", title: "Apply What You Know", description: "Use your knowledge to solve real-world sensory scenarios.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },


  {
    id: "psy-s2-u5",
    title: "Pain and Pleasure",
    description: "How your brain decides what hurts, what feels good, and why it sometimes gets it wrong.",
    color: "#F472B6",
    icon: "🔥",
    sectionIndex: 2,
    sectionTitle: "How You Sense the World",
    lessons: [
      { id: "psy-s2-u5-L1", title: "What Is Pain?", description: "Pain is not just about damage. Your brain has a say in how much it hurts.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-s2-u5-L2", title: "The Placebo Effect", description: "Your brain can reduce pain just because you believe treatment is working.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u5-L3", title: "Pleasure and Reward", description: "How your brain creates the feeling of pleasure and why it matters.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-s2-u5-L4", title: "Chronic Pain and the Brain", description: "When pain persists long after the injury is healed.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },


  {
    id: "psy-s2-u6",
    title: "Attention: Your Brain's Spotlight",
    description: "You cannot process everything at once. Your brain picks what matters.",
    color: "#F472B6",
    icon: "🔦",
    sectionIndex: 2,
    sectionTitle: "How You Sense the World",
    lessons: [
      { id: "psy-s2-u6-L1", title: "What Is Attention?", description: "Your brain gets flooded with information. Attention is how it picks what to process.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-s2-u6-L2", title: "Focused vs Divided Attention", description: "Why multitasking is mostly a myth.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u6-L3", title: "What Grabs Your Attention", description: "Some things capture your focus without you trying. Why?", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u6-L4", title: "The Stroop Effect", description: "When automatic reading fights with color naming, your brain slows down.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-s2-u6-L5", title: "Sustained Attention and Mind-Wandering", description: "Why your mind drifts and what happens when it does.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },


  {
    id: "psy-s2-u7",
    title: "Change Blindness and Inattention",
    description: "You think you see everything, but you miss far more than you realize.",
    color: "#F472B6",
    icon: "🙈",
    sectionIndex: 2,
    sectionTitle: "How You Sense the World",
    lessons: [
      { id: "psy-s2-u7-L1", title: "Inattentional Blindness", description: "When you look right at something and still do not see it.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-s2-u7-L2", title: "Change Blindness", description: "Big changes happen right in front of you, and you do not notice.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u7-L3", title: "The Illusion of Complete Awareness", description: "Why you think you see everything when you actually see very little.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-s2-u7-L4", title: "Real-World Consequences", description: "How inattention and change blindness affect driving, eyewitness testimony, and more.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },


  {
    id: "psy-s2-u8",
    title: "The Body and Perception",
    description: "Your brain's map of your body is surprisingly flexible and sometimes wrong.",
    color: "#F472B6",
    icon: "🫀",
    sectionIndex: 2,
    sectionTitle: "How You Sense the World",
    lessons: [
      { id: "psy-s2-u8-L1", title: "Proprioception: Where Is Your Body?", description: "The hidden sense that tells you where your limbs are without looking.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-s2-u8-L2", title: "Your Brain's Body Map", description: "How your brain represents your body, and why some parts get more space.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u8-L3", title: "The Rubber Hand Illusion", description: "How your brain can be tricked into thinking a fake hand is yours.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u8-L4", title: "Sensing Inside Your Body", description: "Your brain monitors your internal organs and uses that information more than you realize.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-s2-u8-L5", title: "Putting It All Together", description: "How all your body senses create your unified experience of being you.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },


  {
    id: "psy-s2-u9",
    title: "Review + Checkpoint",
    description: "Final review of everything in Section 2. Prove you understand sensation and perception.",
    color: "#F472B6",
    icon: "🏁",
    sectionIndex: 2,
    sectionTitle: "How You Sense the World",
    lessons: [
      { id: "psy-s2-u9-L1", title: "Sensation Foundations Review", description: "Review transduction, thresholds, adaptation, and the senses.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u9-L2", title: "Perception and Attention Review", description: "Review illusions, Gestalt principles, attention, and perceptual failures.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-s2-u9-L3", title: "Body and Perception Review", description: "Review pain, pleasure, body senses, and the big picture.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-s2-u9-L4", title: "Section Checkpoint", description: "Prove your mastery of sensation and perception across all units.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  // ── Section 3: Learning (Part 1, 5 units) ──
  {
    id: 'psy-sec3-u1', title: 'Pavlov\'s Dogs and Learned Reactions',
    description: 'How your brain learns to connect unrelated things through repeated pairing.',
    color: '#8B5CF6', icon: '🐕', sectionIndex: 2, sectionTitle: 'Learning',
    lessons: [
      { id: 'psy-sec3-u1-L1', title: 'What Is Learning?', description: 'Learning means a lasting change in behavior based on experience.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec3-u1-L2', title: 'Pavlov\'s Discovery', description: 'How a Russian scientist stumbled onto one of psychology\'s biggest findings.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec3-u1-L3', title: 'The Building Blocks of Conditioning', description: 'Learn the 4 key terms that describe every classical conditioning situation.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u1-L4', title: 'Extinction and Spontaneous Recovery', description: 'Conditioned responses can fade and then surprise you by coming back.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u1-L5', title: 'Generalization and Discrimination', description: 'Why similar things trigger the same response, and how you learn to tell them apart.', icon: '📝', xpReward: 20, questions: [] },
    ],
  },

  {
    id: 'psy-sec3-u2', title: 'Skinner\'s Box and Learning by Consequences',
    description: 'How rewards and punishments shape the behaviors you repeat or avoid.',
    color: '#8B5CF6', icon: '🐀', sectionIndex: 2, sectionTitle: 'Learning',
    lessons: [
      { id: 'psy-sec3-u2-L1', title: 'What Is Operant Conditioning?', description: 'Learning from consequences: you repeat what works and stop what doesn\'t.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec3-u2-L2', title: 'Reinforcement: Adding and Removing', description: 'Two ways to make a behavior happen more often.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u2-L3', title: 'Punishment: Adding and Removing', description: 'Two ways to make a behavior happen less often.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u2-L4', title: 'Shaping Behavior Step by Step', description: 'How to build complex behaviors by reinforcing small steps toward the goal.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u2-L5', title: 'The Full Operant Picture', description: 'Combine reinforcement, punishment, and shaping to analyze real behavior.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec3-u3', title: 'Reinforcement Schedules',
    description: 'When and how often you deliver rewards changes how people behave.',
    color: '#8B5CF6', icon: '📊', sectionIndex: 2, sectionTitle: 'Learning',
    lessons: [
      { id: 'psy-sec3-u3-L1', title: 'Continuous vs. Partial Reinforcement', description: 'Rewarding every time vs. rewarding sometimes creates very different patterns.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec3-u3-L2', title: 'Ratio Schedules: Counting Responses', description: 'Reinforcement based on how many times you do something.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u3-L3', title: 'Interval Schedules: Watching the Clock', description: 'Reinforcement based on how much time has passed.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u3-L4', title: 'Comparing All Four Schedules', description: 'See how the 4 reinforcement schedules differ in speed, pattern, and extinction resistance.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec3-u3-L5', title: 'Schedules in the Real World', description: 'Spot reinforcement schedules in everyday life, apps, and workplaces.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec3-u4', title: 'Learning Foundations Review',
    description: 'Test your knowledge of classical conditioning, operant conditioning, and reinforcement schedules.',
    color: '#8B5CF6', icon: '🔄', sectionIndex: 2, sectionTitle: 'Learning',
    lessons: [
      { id: 'psy-sec3-u4-L1', title: 'Classical Conditioning Review', description: 'Revisit Pavlov\'s key concepts: conditioning, extinction, generalization, and discrimination.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u4-L2', title: 'Operant Conditioning Review', description: 'Revisit reinforcement, punishment, shaping, and the key differences from classical conditioning.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u4-L3', title: 'Reinforcement Schedules Review', description: 'Test your ability to identify and compare all 4 reinforcement schedules.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec3-u5', title: 'Bandura\'s Bobo Doll and Learning by Watching',
    description: 'How you learn new behaviors just by observing other people.',
    color: '#8B5CF6', icon: '👀', sectionIndex: 2, sectionTitle: 'Learning',
    lessons: [
      { id: 'psy-sec3-u5-L1', title: 'Learning Without Direct Experience', description: 'You don\'t need rewards or punishments to learn. Watching is enough.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec3-u5-L2', title: 'The Bobo Doll Experiment', description: 'The famous study that proved children imitate aggression they observe.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u5-L3', title: 'The Four Steps of Modeling', description: 'Attention, retention, reproduction, and motivation: the full process of learning by watching.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u5-L4', title: 'Prosocial and Antisocial Modeling', description: 'Observation can teach kindness or cruelty, depending on the model.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u5-L5', title: 'Observational Learning Everywhere', description: 'Recognize how modeling shapes language, culture, skills, and social norms around you.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },


  // ── Section 3: Learning (Part 2, 4 units) ──
  {
    id: 'psy-sec3-u6', title: 'Habituation and Sensitization',
    description: 'Why you stop noticing your watch but flinch harder at a sudden noise.',
    color: '#6366F1', icon: '🔕', sectionIndex: 2, sectionTitle: 'Learning',
    lessons: [
      { id: 'psy-sec3-u6-L1', title: 'What Is Habituation?', description: 'How your brain learns to tune out things that don\'t matter.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec3-u6-L2', title: 'Dishabituation and Spontaneous Recovery', description: 'What brings a habituated response back to life.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u6-L3', title: 'What Is Sensitization?', description: 'When your brain turns the volume up instead of down.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u6-L4', title: 'Habituation in Research and Everyday Life', description: 'How scientists and everyday situations reveal the power of habituation.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec3-u7', title: 'Habits: Formation, Loops, and Breaking Them',
    description: 'How behaviors become automatic and what it takes to change them.',
    color: '#8B5CF6', icon: '🔄', sectionIndex: 2, sectionTitle: 'Learning',
    lessons: [
      { id: 'psy-sec3-u7-L1', title: 'What Makes a Habit?', description: 'Why some behaviors become effortless and automatic.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec3-u7-L2', title: 'The Habit Loop', description: 'The three-part cycle that drives every habit.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u7-L3', title: 'How Habits Form', description: 'The process that turns new behaviors into automatic routines.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u7-L4', title: 'Breaking and Replacing Habits', description: 'Why willpower alone fails and what actually works.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec3-u7-L5', title: 'Habits and Operant Conditioning', description: 'How rewards and reinforcement connect to habit formation.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec3-u8', title: 'Learning Transfer and Generalization',
    description: 'How skills and knowledge from one situation apply to another.',
    color: '#EC4899', icon: '🔀', sectionIndex: 2, sectionTitle: 'Learning',
    lessons: [
      { id: 'psy-sec3-u8-L1', title: 'What Is Learning Transfer?', description: 'How knowledge from one context helps in a completely different one.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec3-u8-L2', title: 'Near and Far Transfer', description: 'Why some skills transfer easily and others barely transfer at all.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u8-L3', title: 'Generalization in Conditioning', description: 'How conditioned responses spread to similar stimuli and situations.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u8-L4', title: 'Analogical Reasoning and Transfer', description: 'How spotting similarities between different problems enables far transfer.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec3-u8-L5', title: 'Barriers to Transfer', description: 'What prevents learning from carrying over to new situations.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec3-u9', title: 'Learning: Full Section Review',
    description: 'Test your knowledge across all learning concepts from classical conditioning to transfer.',
    color: '#F59E0B', icon: '🏆', sectionIndex: 2, sectionTitle: 'Learning',
    lessons: [
      { id: 'psy-sec3-u9-L1', title: 'Conditioning Foundations Review', description: 'Revisit classical conditioning, operant conditioning, and reinforcement schedules.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u9-L2', title: 'Observational and Non-Associative Learning Review', description: 'Revisit Bandura\'s observational learning, habituation, and sensitization.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec3-u9-L3', title: 'Habits and Transfer Review', description: 'Revisit habit formation, the habit loop, and learning transfer.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec3-u9-L4', title: 'Section 3 Comprehensive Checkpoint', description: 'A challenging test spanning all learning concepts from this section.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },


  // ── Section 4: How Your Memory Works (10 units from section-4-memory-part1 and part2) ──
  {
    id: 'psy-sec4-u1', title: 'How Memories Form',
    description: 'Learn how your brain transforms experiences into lasting memories through encoding.',
    color: '#3B82F6', icon: '🧠', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u1-L1', title: 'What Is Encoding?', description: 'Encoding is how your brain converts experiences into memory traces.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec4-u1-L2', title: 'Attention and Memory', description: 'Why paying attention is the gateway to forming memories.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec4-u1-L3', title: 'Levels of Processing', description: 'Deeper thinking leads to stronger memories.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u1-L4', title: 'Elaborative Rehearsal', description: 'Connecting new information to what you already know strengthens memory.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u1-L5', title: 'Helping a Friend Study Better', description: 'Apply your knowledge of encoding to help a friend improve their study habits.', icon: '💬', type: 'conversation' as const, xpReward: 20, questions: [] },
    ],
  },

  {
    id: 'psy-sec4-u2', title: 'Short-Term and Working Memory',
    description: 'Explore the limits of short-term memory and how working memory lets you think.',
    color: '#10B981', icon: '💭', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u2-L1', title: 'Sensory Memory', description: 'The ultra-brief first stage of memory that captures everything for a split second.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec4-u2-L2', title: 'Short-Term Memory Limits', description: 'Your short-term memory can only hold about 7 items at once.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u2-L3', title: 'Chunking', description: 'How grouping information lets you hold more in short-term memory.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u2-L4', title: 'Working Memory Model', description: "Working memory isn't just storage. It's your brain's mental workspace.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u2-L5', title: 'Short-Term Memory Blitz', description: "Race the clock on everything you've learned about short-term and working memory.", icon: '⚡', type: 'speed-round' as const, xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec4-u3', title: 'Long-Term Memory Types',
    description: 'Discover the different kinds of long-term memory and how they shape your life.',
    color: '#FBBF24', icon: '📚', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u3-L1', title: 'Explicit vs Implicit Memory', description: 'Some memories you can describe in words. Others you can only show through actions.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec4-u3-L2', title: 'Episodic vs Semantic Memory', description: 'Personal experiences vs general knowledge: two different systems in your brain.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u3-L3', title: 'Procedural Memory', description: 'How your brain stores skills you perform on autopilot.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u3-L4', title: 'Priming', description: 'How past exposure influences your responses without you realizing it.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u3-L5', title: 'Sorting Out Memory Types', description: 'Practice identifying different memory types in real-life situations.', icon: '💬', type: 'conversation' as const, xpReward: 20, questions: [] },
    ],
  },

  {
    id: 'psy-sec4-u4', title: 'Review: Memory Foundations',
    description: 'Test your knowledge of encoding, memory types, and working memory.',
    color: '#8B5CF6', icon: '🔄', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u4-L1', title: 'Memory Concepts Review', description: 'Review the core concepts of encoding, storage, and memory types.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u4-L2', title: 'Memory Scenarios', description: 'Apply your memory knowledge to real-world situations.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u4-L3', title: 'Memory Foundations Blitz', description: 'Race the clock on everything from units 1 through 3.', icon: '⚡', type: 'speed-round' as const, xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec4-u5', title: 'Why You Forget',
    description: 'Explore the science behind forgetting: decay, interference, and retrieval failure.',
    color: '#EC4899', icon: '🤔', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u5-L1', title: 'Decay Theory', description: "Memories can fade over time if they aren't used or rehearsed.", icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec4-u5-L2', title: 'Interference', description: 'How similar memories compete with and block each other.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u5-L3', title: 'Retrieval Failure', description: "Sometimes the memory is there but you just can't access it.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u5-L4', title: 'Tip of the Tongue', description: "That frustrating feeling when you almost remember something but can't quite get it.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u5-L5', title: "Why Can't I Remember?", description: 'Help a friend understand why they keep forgetting things.', icon: '💬', type: 'conversation' as const, xpReward: 20, questions: [] },
    ],
  },

  {
    id: 'psy-sec4-u6', title: 'False Memories',
    description: "Your memory isn't a recording. Learn how false memories form and why they feel real.",
    color: '#EF4444', icon: '🪞', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u6-L1', title: 'How False Memories Form', description: 'Your brain reconstructs memories each time you recall them, and errors creep in.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec4-u6-L2', title: 'The Misinformation Effect', description: 'How misleading information after an event can change your memory of it.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u6-L3', title: 'Eyewitness Reliability', description: 'Why confident eyewitnesses can still be wrong.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u6-L4', title: 'Implanted Memories', description: "How entirely false memories can be created in someone's mind.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u6-L5', title: 'False Memory Blitz', description: 'Race the clock on everything about false memories and memory distortion.', icon: '⚡', type: 'speed-round' as const, xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec4-u7', title: 'Memory Strategies That Work',
    description: 'Learn evidence-based techniques to remember more and forget less.',
    color: '#14B8A6', icon: '🎯', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u7-L1', title: 'Spaced Repetition', description: 'Why spreading study sessions over time beats cramming.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec4-u7-L2', title: 'Method of Loci', description: 'An ancient technique that uses mental imagery of familiar places to boost memory.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u7-L3', title: 'Mnemonics', description: 'Memory tricks like acronyms, rhymes, and visual associations.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u7-L4', title: 'The Testing Effect', description: 'Testing yourself is one of the most powerful ways to strengthen memory.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u7-L5', title: 'Advising a Study Group', description: 'Help a study group use evidence-based memory strategies.', icon: '💬', type: 'conversation' as const, xpReward: 20, questions: [] },
    ],
  },

  {
    id: 'psy-sec4-u8', title: 'Memory Across the Lifespan',
    description: 'How memory develops in childhood, peaks in young adulthood, and changes with aging.',
    color: '#F97316', icon: '📈', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u8-L1', title: 'Childhood Amnesia', description: "Why you can't remember being a baby.", icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec4-u8-L2', title: 'Peak Memory Years', description: 'When memory is at its strongest and why.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u8-L3', title: 'Age-Related Decline', description: 'What changes about memory as you age, and what stays the same.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u8-L4', title: 'Memory Across the Lifespan Blitz', description: 'Race the clock on memory development, peak years, and aging.', icon: '⚡', type: 'speed-round' as const, xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec4-u9', title: 'Memory in the Real World',
    description: 'Explore how memory works in everyday life, from flashbulb memories to digital devices.',
    color: '#6366F1', icon: '🌍', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u9-L1', title: 'Flashbulb Memories', description: 'Why some moments feel permanently burned into your brain.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec4-u9-L2', title: 'Trauma and Memory', description: 'How traumatic experiences affect the way memories are stored and recalled.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u9-L3', title: 'Prospective Memory', description: 'Remembering to do things in the future, not just recalling the past.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec4-u9-L4', title: 'Technology and Memory', description: 'How phones, search engines, and social media change how you remember.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u9-L5', title: 'Memory in Daily Life', description: 'Apply memory science to everyday situations.', icon: '💬', type: 'conversation' as const, xpReward: 20, questions: [] },
    ],
  },

  {
    id: 'psy-sec4-u10', title: 'Section 4 Review',
    description: 'Prove your mastery of memory science across all units in this section.',
    color: '#8B5CF6', icon: '🏆', sectionIndex: 3, sectionTitle: 'How Your Memory Works',
    lessons: [
      { id: 'psy-sec4-u10-L1', title: 'Memory Science Review', description: 'Test your knowledge across all memory topics from this section.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec4-u10-L2', title: 'Applied Memory Scenarios', description: 'Apply memory concepts to complex real-world situations.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec4-u10-L3', title: 'The Memory Expert', description: 'Demonstrate your expertise by answering challenging memory questions.', icon: '💬', type: 'conversation' as const, xpReward: 25, questions: [] },
      { id: 'psy-sec4-u10-L4', title: 'Memory Section Final Blitz', description: 'One last speed round covering everything from this entire section.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  // ── Section 5: Thinking & Intelligence (Part 1, 5 units) ──
  {
    id: 'psy-sec5-u1', title: 'What Is Intelligence?',
    description: 'Explore the major theories about what intelligence really is and why psychologists still debate it.',
    color: '#8B5CF6', icon: '🧠', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u1-L1', title: 'Defining Intelligence', description: 'Why intelligence is one of the hardest things in psychology to define.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec5-u1-L2', title: 'Fluid vs. Crystallized Intelligence', description: 'Two types of intelligence that change in opposite directions as we age.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u1-L3', title: 'Nature vs. Nurture in Intelligence', description: 'How much of intelligence is genetic and how much comes from environment.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u1-L4', title: 'The Intelligence Controversy', description: 'Why intelligence research has been so politically and ethically charged.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u1-L5', title: 'Modern Views on Intelligence', description: 'How current researchers think about intelligence beyond the old "one number" model.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec5-u2', title: 'IQ Tests: What They Measure',
    description: 'Understand how IQ tests work, what they predict well, and what they miss entirely.',
    color: '#7C3AED', icon: '📊', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u2-L1', title: 'The History of IQ Testing', description: 'How intelligence testing began and why it was created.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec5-u2-L2', title: 'How Modern IQ Tests Work', description: 'What today\'s IQ tests actually measure and how scores are calculated.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u2-L3', title: 'What IQ Predicts and Misses', description: 'IQ correlates with some outcomes but fails to capture many important abilities.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u2-L4', title: 'Giftedness and Intellectual Disability', description: 'How psychologists define the extremes of the IQ distribution.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u2-L5', title: 'Criticisms and Alternatives to IQ', description: 'Why some psychologists think IQ tests need to be rethought or replaced.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec5-u3', title: 'Multiple Intelligences and Creativity',
    description: 'Explore Gardner\'s theory of multiple intelligences and what psychologists know about creative thinking.',
    color: '#6D28D9', icon: '🎨', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u3-L1', title: 'Gardner\'s Multiple Intelligences', description: 'The theory that intelligence comes in at least 8 different forms.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec5-u3-L2', title: 'Debate Over Multiple Intelligences', description: 'Why many psychologists question Gardner\'s theory despite its popularity.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u3-L3', title: 'What Is Creativity?', description: 'How psychologists define and study creative thinking.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u3-L4', title: 'Fostering and Blocking Creativity', description: 'What helps and what kills creative thinking, according to research.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u3-L5', title: 'The 10,000-Hour Debate', description: 'Does practice alone make you an expert, or does talent matter too?', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec5-u4', title: 'Thinking & Intelligence Review',
    description: 'Revisit key concepts from intelligence theories, IQ testing, creativity, and multiple intelligences.',
    color: '#5B21B6', icon: '🔄', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u4-L1', title: 'Intelligence Theories Recap', description: 'Review the major theories of intelligence from Spearman to the CHC model.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u4-L2', title: 'IQ Testing Review', description: 'Revisit the history, mechanics, and limitations of IQ testing.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u4-L3', title: 'Creativity and Practice Review', description: 'Revisit what drives creativity and the role of deliberate practice in expertise.', icon: '📝', xpReward: 20, questions: [] },
    ],
  },

  {
    id: 'psy-sec5-u5', title: 'Problem Solving and Reasoning',
    description: 'Learn the mental tools humans use to solve problems and why we sometimes get stuck.',
    color: '#4C1D95', icon: '🧩', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u5-L1', title: 'Types of Problems', description: 'Well-defined vs. ill-defined problems and why the distinction matters.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec5-u5-L2', title: 'Heuristics and Mental Shortcuts', description: 'The most common mental shortcuts and when they lead us astray.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u5-L3', title: 'Cognitive Biases in Reasoning', description: 'Systematic errors in thinking that affect everyone.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u5-L4', title: 'Barriers to Good Reasoning', description: 'Mental set, sunk cost fallacy, and other traps that block clear thinking.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u5-L5', title: 'System 1 and System 2 Thinking', description: 'The two systems your brain uses to make decisions, and when each one leads.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },


  // ── Section 5: Thinking & Intelligence (Part 2, 5 units) ──
  {
    id: 'psy-sec5-u6', title: 'Does Language Shape Your Thoughts?',
    description: 'How the words you speak might change the way you think about the world.',
    color: '#8B5CF6', icon: '🗣️', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u6-L1', title: 'The Sapir-Whorf Hypothesis', description: 'The bold idea that language controls or influences how you perceive reality.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u6-L2', title: 'Color, Space, and Time Across Languages', description: 'How speakers of different languages literally see colors, directions, and time differently.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u6-L3', title: 'Bilingualism and Cognitive Flexibility', description: 'How speaking two languages reshapes the brain and sharpens mental agility.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u6-L4', title: 'Thinking Without Words', description: 'Evidence that thought can exist independently of language, from deaf children to animal cognition.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u6-L5', title: 'Language, Labels, and Real-World Impact', description: 'How language shapes stereotypes, legal decisions, and everyday judgments.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec5-u7', title: 'How Babies Learn to Talk',
    description: 'The remarkable journey from first cries to full sentences in just a few years.',
    color: '#EC4899', icon: '👶', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u7-L1', title: 'From Coos to Conversations', description: 'The predictable stages every child passes through on the way to fluent speech.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u7-L2', title: 'Born to Talk or Taught to Talk?', description: 'The great debate: is language ability built into the brain, or is it entirely learned?', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u7-L3', title: 'Critical Periods and Missed Windows', description: 'What happens when children miss the window for language, and what that teaches us about the brain.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u7-L4', title: 'How Parents Shape Language Growth', description: 'The role of baby talk, reading aloud, and conversational turns in building young brains.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u7-L5', title: 'When Language Development Stalls', description: 'Understanding language delays, disorders, and how early intervention changes outcomes.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec5-u8', title: 'Consciousness: The Mystery Inside Your Head',
    description: 'What it means to be aware, why it matters, and why science still cannot fully explain it.',
    color: '#6366F1', icon: '🧠', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u8-L1', title: 'What Is Consciousness?', description: 'How psychologists and philosophers define awareness, and why it is so hard to study.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u8-L2', title: 'Theories of Consciousness', description: 'The leading scientific theories attempting to explain how awareness arises in the brain.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u8-L3', title: 'The Power of the Unconscious', description: 'How much of your thinking happens outside your awareness, from priming to blindsight.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u8-L4', title: 'Attention: The Gatekeeper of Consciousness', description: 'How attention filters what enters your awareness and why you miss so much of reality.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u8-L5', title: 'Do You Actually Choose Your Choices?', description: 'What neuroscience reveals about free will, the timing of decisions, and the limits of self-awareness.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec5-u9', title: 'Altered States of Consciousness',
    description: 'How sleep, dreams, meditation, and hypnosis change your awareness in fascinating ways.',
    color: '#7C3AED', icon: '🌙', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u9-L1', title: 'What Happens When You Sleep', description: 'The stages your brain cycles through every night and why each one matters.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec5-u9-L2', title: 'Why We Dream', description: 'The major theories about why the sleeping brain creates vivid stories, images, and emotions.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u9-L3', title: 'Meditation and the Science of Mindfulness', description: 'What happens in the brain during meditation and what the evidence actually shows.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u9-L4', title: 'Hypnosis: Separating Myth from Science', description: 'What hypnosis actually is, who it works for, and what it cannot do.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u9-L5', title: 'Substances That Alter Consciousness', description: 'How drugs change brain chemistry and conscious experience, from caffeine to psychedelics.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec5-u10', title: 'Thinking & Intelligence: Full Review',
    description: 'Test your knowledge across all of Section 5, from problem-solving to consciousness.',
    color: '#A78BFA', icon: '🏆', sectionIndex: 4, sectionTitle: 'Thinking & Intelligence',
    lessons: [
      { id: 'psy-sec5-u10-L1', title: 'Thinking and Intelligence Recap', description: 'Review key concepts from problem-solving, creativity, and intelligence theory.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u10-L2', title: 'Language, Thought, and Acquisition Recap', description: 'Review linguistic relativity, bilingualism, and how children learn language.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u10-L3', title: 'Consciousness and Altered States Recap', description: 'Review consciousness theories, sleep, dreams, meditation, and hypnosis.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec5-u10-L4', title: 'Section 5 Speed Round', description: 'Rapid-fire recall across all of Thinking & Intelligence.', icon: '⚡', type: 'speed-round', xpReward: 35, questions: [] },
    ],
  },


  // ── Section 6: Cognitive Biases (10 units from section-6-biases-part1 and part2) ──
  {
    id: 'psy-sec6-u1', title: 'Your Brain Takes Shortcuts',
    description: 'Discover why your brain uses mental shortcuts and when they help or hurt your thinking.',
    color: '#F59E0B', icon: '🧠', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u1-L1', title: 'What Are Heuristics?', description: 'Why your brain uses mental shortcuts to make decisions faster.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec6-u1-L2', title: 'Why Shortcuts Exist', description: 'The evolutionary reasons your brain developed mental shortcuts.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u1-L3', title: 'System 1 vs. System 2', description: 'The two thinking systems that drive every decision you make.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u1-L4', title: 'When Shortcuts Fail', description: 'How mental shortcuts turn into predictable thinking errors.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u1-L5', title: 'Shortcuts in Everyday Life', description: 'Practice identifying heuristics and biases in realistic conversations.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec6-u2', title: 'Anchoring and Framing',
    description: 'Learn how the first number you see and how information is presented can warp your judgment.',
    color: '#3B82F6', icon: '⚓', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u2-L1', title: 'Anchoring Bias', description: 'How the first number you see hijacks every number that follows.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u2-L2', title: 'The Framing Effect', description: "Why the same information leads to different decisions depending on how it's presented.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u2-L3', title: 'Loss Aversion', description: 'Why losing $100 hurts more than gaining $100 feels good.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u2-L4', title: 'Price Anchoring in Stores', description: 'How retailers use anchoring and framing to make you spend more.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u2-L5', title: 'Anchoring and Framing Speed Round', description: 'Rapid recall of anchoring, framing, and loss aversion concepts.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec6-u3', title: 'Confirmation and Availability Bias',
    description: 'Learn how you search for evidence that proves you right and overestimate what comes to mind easily.',
    color: '#10B981', icon: '🔍', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u3-L1', title: 'Confirmation Bias', description: 'Why you unconsciously seek evidence that supports what you already believe.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u3-L2', title: 'Echo Chambers', description: 'How confirmation bias creates bubbles where you only hear your own views reflected back.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u3-L3', title: 'The Availability Heuristic', description: 'Why you overestimate the likelihood of things that come to mind easily.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u3-L4', title: 'Media and Availability', description: "How news coverage warps your sense of what's common and dangerous.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u3-L5', title: 'Biases in the News', description: 'Practice spotting confirmation and availability biases in everyday media consumption.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec6-u4', title: 'Review: Core Biases',
    description: 'Test your knowledge of heuristics, anchoring, framing, confirmation bias, and availability.',
    color: '#8B5CF6', icon: '🔄', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u4-L1', title: 'Core Bias Review', description: 'Review all the major biases from the first 3 units.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u4-L2', title: 'Bias Scenarios', description: 'Apply your knowledge to identify biases in real-world situations.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u4-L3', title: 'Core Biases Speed Round', description: 'Rapid recall of all biases covered so far.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec6-u5', title: 'The Dunning-Kruger Effect',
    description: 'Why beginners overestimate their skills and experts underestimate theirs.',
    color: '#EC4899', icon: '📊', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u5-L1', title: 'What Is the Dunning-Kruger Effect?', description: 'The surprising relationship between knowledge and confidence.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u5-L2', title: 'The Overconfidence Trap', description: 'How overconfidence leads to poor decisions in everyday life.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u5-L3', title: 'The Expertise Curve', description: 'How confidence changes as you move from beginner to expert.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u5-L4', title: 'Imposter Syndrome', description: 'When competent people feel like frauds despite clear evidence of success.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u5-L5', title: 'The Confidence Conversation', description: 'Practice navigating conversations about expertise and overconfidence.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec6-u6', title: 'Sunk Cost and Status Quo Bias',
    description: 'Learn why people throw good money after bad and resist change even when it would help them.',
    color: '#EF4444', icon: '💸', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u6-L1', title: 'The Sunk Cost Fallacy', description: 'Why past investments trap you into continuing bad decisions.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u6-L2', title: 'Throwing Good Money After Bad', description: 'How sunk costs trap businesses, governments, and individuals.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u6-L3', title: 'Status Quo Bias', description: 'Why people prefer things to stay the same even when change would help.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u6-L4', title: 'The Default Effect', description: 'How pre-selected choices shape major life decisions without you noticing.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u6-L5', title: 'Sunk Cost and Status Quo Speed Round', description: 'Rapid recall of sunk cost, status quo, and default effect concepts.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec6-u7', title: 'Social Biases',
    description: 'Discover how your brain makes unfair judgments about people based on groups, appearances, and first impressions.',
    color: '#14B8A6', icon: '👥', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u7-L1', title: 'In-Group Bias', description: 'Why you automatically favor people who belong to your group.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u7-L2', title: 'The Halo Effect', description: 'How one positive trait makes you assume everything else is positive too.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u7-L3', title: 'Fundamental Attribution Error', description: 'Why you blame people for their behavior but blame circumstances for your own.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u7-L4', title: 'Stereotyping as a Cognitive Shortcut', description: 'How the brain uses group-level assumptions as a mental shortcut for individuals.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u7-L5', title: 'Social Biases at Work', description: 'Practice identifying social biases in workplace scenarios.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec6-u8', title: 'Decision Fatigue and Choice Overload',
    description: 'Learn why too many choices paralyze you and why your decisions get worse as the day goes on.',
    color: '#F97316', icon: '😵', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u8-L1', title: 'Decision Fatigue', description: 'Why your brain makes worse decisions after making too many in a row.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u8-L2', title: 'Choice Paralysis', description: 'Why having too many options makes it harder to choose at all.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u8-L3', title: 'Satisficing vs. Maximizing', description: 'Two decision styles and why "good enough" often beats "the best."', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u8-L4', title: 'Decision Fatigue Speed Round', description: 'Rapid recall of decision fatigue, choice overload, and satisficing concepts.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec6-u9', title: 'Debiasing: Fighting Your Own Brain',
    description: 'Learn practical strategies to reduce the impact of cognitive biases on your decisions.',
    color: '#6366F1', icon: '🛡️', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u9-L1', title: 'Can You Debias Yourself?', description: 'The honest truth about whether knowing your biases can fix them.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u9-L2', title: 'Consider the Opposite', description: 'A simple technique that fights confirmation bias and overconfidence.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec6-u9-L3', title: 'Pre-Mortems', description: 'Imagine failure before it happens to catch biases that blind you to risk.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u9-L4', title: 'Checklists and Structures', description: "How simple tools can outsmart your brain's automatic biases.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u9-L5', title: 'Debiasing in Practice', description: 'Practice applying debiasing strategies in realistic decision-making scenarios.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec6-u10', title: 'Section 6 Review',
    description: 'Test your mastery of all cognitive biases, from heuristics to debiasing strategies.',
    color: '#8B5CF6', icon: '🏆', sectionIndex: 5, sectionTitle: 'Cognitive Biases',
    lessons: [
      { id: 'psy-sec6-u10-L1', title: 'Comprehensive Bias Review', description: 'Review all the major cognitive biases from this section.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec6-u10-L2', title: 'Bias Detective Scenarios', description: 'Apply your knowledge to identify biases in complex real-world situations.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec6-u10-L3', title: 'The Bias Detective', description: 'Put all your bias knowledge together in one comprehensive scenario.', icon: '💬', type: 'conversation' as const, xpReward: 35, questions: [] },
      { id: 'psy-sec6-u10-L4', title: 'Cognitive Biases Section Speed Round', description: 'The ultimate rapid-fire review of everything in this section.', icon: '⚡', type: 'speed-round' as const, xpReward: 35, questions: [] },
    ],
  },

  // ── Section 7: Emotions & Motivation (10 units from section-7-emotions-part1 and part2) ──
  {
    id: 'psy-sec7-u1', title: 'What Are Emotions?',
    description: 'Discover what emotions actually are, why you have them, and how they differ from feelings and moods.',
    color: '#EF4444', icon: '❤️', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u1-L1', title: 'Emotions Defined', description: 'What psychologists mean when they talk about emotions.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec7-u1-L2', title: 'Basic Emotions', description: 'The core emotions that researchers believe are universal across all cultures.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u1-L3', title: 'Emotions, Feelings, and Moods', description: 'These three terms sound alike but mean different things in psychology.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u1-L4', title: 'Why Emotions Exist', description: 'Emotions are not random noise. They evolved to keep you alive and connected.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u1-L5', title: 'Identifying Emotions in Action', description: 'Practice distinguishing emotions, feelings, and moods in realistic situations.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec7-u2', title: 'Theories of Emotion',
    description: 'Explore the major theories that explain how and why emotions happen.',
    color: '#3B82F6', icon: '🧪', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u2-L1', title: 'James-Lange Theory', description: 'The idea that your body reacts first and your brain interprets the emotion second.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u2-L2', title: 'Cannon-Bard Theory', description: 'The theory that says body reactions and emotions happen at the same time.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u2-L3', title: 'Schachter-Singer Two-Factor Theory', description: 'The theory that says you need both arousal and a label to feel an emotion.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u2-L4', title: 'Cognitive Appraisal Theory', description: 'How your thinking shapes what you feel, not just your body.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u2-L5', title: 'Emotion Theories Speed Round', description: 'Rapid recall of all four emotion theories covered in this unit.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec7-u3', title: 'The Neuroscience of Feeling',
    description: 'How your brain creates, processes, and regulates emotional experiences.',
    color: '#10B981', icon: '🧠', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u3-L1', title: 'The Amygdala and Fear', description: "Meet the brain's alarm system and its role in processing threats.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u3-L2', title: 'The Prefrontal Cortex', description: 'How the front of your brain helps you manage and control emotions.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u3-L3', title: 'Neurotransmitters and Emotion', description: 'The brain chemicals that shape how you feel every day.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u3-L4', title: 'Emotion Regulation Circuits', description: 'How different brain regions work together to manage emotional responses.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u3-L5', title: 'Brain and Emotion Scenarios', description: 'Apply your neuroscience knowledge to real-life emotional situations.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec7-u4', title: 'Emotions Foundations Review',
    description: 'Revisit key concepts from emotions, emotion theories, and the neuroscience of feeling.',
    color: '#8B5CF6', icon: '🔄', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u4-L1', title: 'Emotions and Theories Recap', description: 'Review what emotions are, the basic emotions, and the major theories.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u4-L2', title: 'Brain and Emotion Scenarios', description: 'Apply neuroscience concepts to real-world emotional situations.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u4-L3', title: 'Emotions Foundations Speed Round', description: 'Rapid-fire review of all emotions and neuroscience concepts from units 1-3.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec7-u5', title: 'Motivation: What Drives You',
    description: 'Explore what motivates human behavior, from basic needs to personal goals.',
    color: '#FBBF24', icon: '🔥', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u5-L1', title: 'Intrinsic vs Extrinsic Motivation', description: 'The two main types of motivation and why the source matters.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u5-L2', title: 'Drive Theory', description: 'How biological needs create drives that push you to act.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u5-L3', title: "Maslow's Hierarchy of Needs", description: 'The famous pyramid that ranks human needs from survival to self-fulfillment.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u5-L4', title: 'Self-Determination Theory', description: 'The three psychological needs that fuel lasting motivation.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u5-L5', title: 'Motivation in Real Life', description: 'Apply motivation concepts to realistic workplace and school situations.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec7-u6', title: 'Goal Setting and Achievement',
    description: 'How setting the right goals, finding flow, and building grit drive success.',
    color: '#EC4899', icon: '🎯', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u6-L1', title: 'SMART Goals', description: 'A proven framework for setting goals that actually work.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u6-L2', title: 'Flow State', description: 'The psychology behind being "in the zone" and why it matters.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u6-L3', title: 'Grit and Perseverance', description: 'Why long-term passion and persistence matter more than talent alone.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u6-L4', title: 'The Psychology of Procrastination', description: 'Why you delay important tasks and what science says about fixing it.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u6-L5', title: 'Goal Setting Speed Round', description: 'Rapid recall of SMART goals, flow, grit, and procrastination.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec7-u7', title: 'Stress and Coping',
    description: 'Understand what stress is, how it affects your body and mind, and how to cope.',
    color: '#14B8A6', icon: '😤', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u7-L1', title: 'What Stress Really Is', description: "How psychologists define stress and why it's not always bad.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u7-L2', title: 'The Fight-or-Flight Response', description: "Your body's emergency system and how it prepares you for action.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u7-L3', title: 'Acute vs Chronic Stress', description: 'Short bursts of stress help. Long-term stress destroys.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u7-L4', title: 'Coping Strategies', description: 'The different ways people handle stress and which ones actually work.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u7-L5', title: 'Stress Management Advice', description: 'Help someone choose the right coping strategy for their situation.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec7-u8', title: 'Emotional Intelligence',
    description: 'The ability to recognize, understand, manage, and use emotions effectively.',
    color: '#F97316', icon: '💡', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u8-L1', title: 'What Is Emotional Intelligence?', description: 'Why understanding emotions matters as much as raw intelligence.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u8-L2', title: 'Self-Awareness', description: 'The foundation of emotional intelligence: knowing what you feel and why.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u8-L3', title: 'Empathy', description: 'Understanding and sharing the feelings of others.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u8-L4', title: 'Social Skills and EQ', description: 'How emotional intelligence powers effective communication and relationships.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u8-L5', title: 'Emotional Intelligence Speed Round', description: 'Rapid recall of EQ concepts, empathy types, and social skills.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec7-u9', title: 'Happiness and Well-Being',
    description: 'What science says about lasting happiness and the psychology of a good life.',
    color: '#6366F1', icon: '😊', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u9-L1', title: 'Two Types of Happiness', description: 'Pleasure-based vs meaning-based happiness and why both matter.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u9-L2', title: 'Set Point Theory', description: 'Why your happiness tends to return to a baseline level no matter what happens.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec7-u9-L3', title: 'The Science of Gratitude', description: 'How gratitude practices produce measurable improvements in well-being.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u9-L4', title: 'Positive Psychology', description: 'The scientific study of what makes life worth living.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u9-L5', title: 'Happiness and Well-Being Advice', description: 'Apply positive psychology to help someone build lasting happiness.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec7-u10', title: 'Section 7 Review',
    description: 'Comprehensive review of emotions, motivation, stress, EQ, and well-being.',
    color: '#8B5CF6', icon: '🏆', sectionIndex: 6, sectionTitle: 'Emotions & Motivation',
    lessons: [
      { id: 'psy-sec7-u10-L1', title: 'Emotions and Motivation Review', description: 'Revisit the major concepts from the entire section.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec7-u10-L2', title: 'Real-World Scenarios', description: 'Apply concepts from across the entire section to complex situations.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec7-u10-L3', title: 'The Emotion Coach', description: "Use everything you've learned to coach someone through emotional challenges.", icon: '💬', type: 'conversation' as const, xpReward: 35, questions: [] },
      { id: 'psy-sec7-u10-L4', title: 'Section 7 Speed Round', description: 'Rapid-fire review across all of Section 7: Emotions and Motivation.', icon: '⚡', type: 'speed-round' as const, xpReward: 35, questions: [] },
    ],
  },

  // ── Section 8: Social Psychology (10 units from section-8-social-part1 and part2) ──
  {
    id: 'psy-sec8-u1', title: 'How Others Influence You',
    description: 'Why you change your behavior, opinions, and decisions when other people are around.',
    color: '#3B82F6', icon: '👥', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u1-L1', title: 'What Is Social Influence?', description: 'How the presence of others shapes your thoughts, feelings, and actions.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec8-u1-L2', title: 'Understanding Conformity', description: 'Why people change their behavior to match the group, even when the group is wrong.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u1-L3', title: 'The Asch Conformity Experiments', description: 'How Solomon Asch proved that people will deny what their own eyes tell them.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u1-L4', title: 'Why People Actually Conform', description: 'The two core reasons people go along with the group.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u1-L5', title: 'Spotting Conformity in Daily Life', description: 'Practice identifying different types of conformity and influence in real situations.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec8-u2', title: 'Obedience and Authority',
    description: 'Why ordinary people follow orders that go against their own conscience.',
    color: '#EF4444', icon: '🏛️', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u2-L1', title: 'The Milgram Experiment', description: 'How Stanley Milgram showed that regular people will obey shocking orders.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u2-L2', title: 'Why People Obey', description: 'The psychological mechanisms that make obedience feel natural.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u2-L3', title: 'Factors That Affect Obedience', description: 'What makes people more or less likely to follow orders.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u2-L4', title: 'Ethics of Obedience Research', description: "Why Milgram's experiment changed how psychologists conduct research.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u2-L5', title: 'Obedience Speed Round', description: 'Rapid recall of obedience concepts from Milgram and beyond.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec8-u3', title: 'Persuasion Techniques',
    description: 'The science of changing minds, from advertising to everyday conversations.',
    color: '#10B981', icon: '🗣️', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u3-L1', title: 'Two Routes to Persuasion', description: 'How the brain processes persuasive messages in two different ways.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u3-L2', title: "Cialdini's 6 Influence Principles", description: 'The 6 weapons of influence that marketers and salespeople use every day.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u3-L3', title: 'The Foot-in-the-Door Technique', description: 'How a small yes leads to a big yes.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u3-L4', title: 'The Door-in-the-Face Technique', description: 'How an outrageously big ask makes a smaller one seem reasonable.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u3-L5', title: 'Analyzing Persuasion in Action', description: 'Identify persuasion techniques in everyday scenarios.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec8-u4', title: 'Review: Social Influence',
    description: 'Test your knowledge of conformity, obedience, and persuasion.',
    color: '#8B5CF6', icon: '🔄', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u4-L1', title: 'Influence, Conformity, and Obedience Review', description: 'Review key concepts from conformity, obedience, and persuasion.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u4-L2', title: 'Social Influence Scenarios', description: 'Apply your knowledge of social influence to complex real-world situations.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec8-u4-L3', title: 'Social Influence Speed Round', description: 'Rapid-fire questions on conformity, obedience, and persuasion.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec8-u5', title: 'Group Dynamics',
    description: 'How being in a group can make you work harder, slack off, or make terrible decisions.',
    color: '#FBBF24', icon: '🤝', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u5-L1', title: 'Social Facilitation', description: 'Why you perform better on easy tasks but worse on hard tasks when others are watching.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u5-L2', title: 'Social Loafing', description: 'Why people put in less effort when working in a group.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u5-L3', title: 'Groupthink', description: 'When the desire for harmony leads groups to make catastrophically bad decisions.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u5-L4', title: 'Deindividuation', description: 'What happens when people lose their sense of individual identity in a group.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u5-L5', title: 'Analyzing Group Behavior', description: 'Identify group dynamics concepts in realistic workplace and social scenarios.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec8-u6', title: 'Attitudes and Attitude Change',
    description: "What attitudes are, how they form, and why they don't always match your behavior.",
    color: '#EC4899', icon: '💭', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u6-L1', title: 'What Attitudes Are', description: 'How psychologists define and measure the way you feel about things.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u6-L2', title: 'Cognitive Dissonance', description: "The uncomfortable tension when your actions and beliefs don't match.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u6-L3', title: 'Self-Perception Theory', description: 'The alternative explanation for why actions shape attitudes.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u6-L4', title: 'The Attitude-Behavior Gap', description: "Why people don't always practice what they preach.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u6-L5', title: 'Attitudes Speed Round', description: 'Rapid recall of attitude formation, dissonance, and behavior.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec8-u7', title: 'Prejudice and Discrimination',
    description: 'How biased attitudes form, how they affect behavior, and what can reduce them.',
    color: '#14B8A6', icon: '⚖️', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u7-L1', title: 'What Prejudice Is', description: 'How psychologists distinguish between stereotypes, prejudice, and discrimination.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u7-L2', title: 'Implicit Bias', description: 'The unconscious biases that influence your judgments without your awareness.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u7-L3', title: 'Stereotype Threat', description: 'How awareness of stereotypes can make them come true.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u7-L4', title: 'Reducing Prejudice', description: 'Evidence-based strategies for breaking down bias between groups.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u7-L5', title: 'Recognizing and Addressing Bias', description: 'Practice identifying types of bias and recommending evidence-based solutions.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec8-u8', title: 'Attraction and Relationships',
    description: "The psychology of who we're drawn to, why we connect, and what makes relationships last.",
    color: '#F97316', icon: '💕', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u8-L1', title: 'Proximity and Familiarity', description: "Why you're most likely to become friends with people who are physically close to you.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u8-L2', title: 'Similarity and Attraction', description: "Why we're attracted to people who are like us, not our opposites.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u8-L3', title: 'Attachment Styles in Adults', description: 'How your childhood attachment patterns show up in your adult relationships.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u8-L4', title: 'Psychological Theories of Love', description: 'How psychologists have tried to explain the most complex human emotion.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u8-L5', title: 'Relationships Speed Round', description: 'Rapid recall of attraction, attachment, and love concepts.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec8-u9', title: 'Prosocial Behavior and Aggression',
    description: 'Why people sometimes help strangers at great cost and other times hurt without reason.',
    color: '#6366F1', icon: '🤲', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u9-L1', title: 'The Bystander Effect', description: 'Why more witnesses can mean less help in an emergency.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u9-L2', title: 'Why People Help Others', description: 'The debate over whether truly selfless helping exists.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u9-L3', title: 'Aggression Theories', description: 'Why people act aggressively and what makes it worse.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec8-u9-L4', title: 'Frustration and Aggression', description: 'How blocked goals can lead to hostile behavior.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec8-u9-L5', title: 'When and Why People Help', description: 'Analyze scenarios about prosocial behavior and the bystander effect.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec8-u10', title: 'Section 8 Review',
    description: 'Comprehensive review of all social psychology concepts from this section.',
    color: '#8B5CF6', icon: '🏆', sectionIndex: 7, sectionTitle: 'Social Psychology',
    lessons: [
      { id: 'psy-sec8-u10-L1', title: 'Social Psychology Comprehensive Review', description: 'Review the key concepts across all of social psychology.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec8-u10-L2', title: 'Social Psychology in Real Life', description: 'Apply social psychology concepts to complex, real-world situations.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec8-u10-L3', title: 'Social Psychologist for a Day', description: 'Apply your social psychology expertise to complex real-world consultations.', icon: '💬', type: 'conversation' as const, xpReward: 35, questions: [] },
      { id: 'psy-sec8-u10-L4', title: 'Social Psychology Speed Round', description: 'Rapid-fire questions covering all of Section 8.', icon: '⚡', type: 'speed-round' as const, xpReward: 35, questions: [] },
    ],
  },

  // ── Section 9: Personality (10 units from section-9-personality-part1 and part2) ──
  {
    id: 'psy-sec9-u1', title: 'What Is Personality?',
    description: 'What personality means in psychology and what shapes it.',
    color: '#EC4899', icon: '🎭', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u1-L1', title: 'Personality Defined', description: 'What psychologists mean when they talk about personality.', icon: '📝', xpReward: 15, questions: [] },
      { id: 'psy-sec9-u1-L2', title: 'Nature vs Nurture in Personality', description: 'How genes and environment both shape who you become.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u1-L3', title: 'Stability and Change Across the Lifespan', description: 'Whether personality stays fixed or shifts as you age.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u1-L4', title: 'How Psychologists Measure Personality', description: 'The main tools psychologists use to assess personality.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u1-L5', title: 'Personality Intro Conversation', description: 'Apply your understanding of personality basics in a realistic scenario.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec9-u2', title: 'Freud and the Psychodynamic Approach',
    description: "Freud's theory of personality and the unconscious mind.",
    color: '#8B5CF6', icon: '🛋️', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u2-L1', title: 'Id, Ego, and Superego', description: "Freud's three-part model of the mind.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u2-L2', title: 'Defense Mechanisms', description: 'How the ego protects itself from anxiety.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u2-L3', title: 'Psychosexual Stages of Development', description: "Freud's controversial theory of childhood personality development.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u2-L4', title: 'Neo-Freudians: Beyond Freud', description: "How Adler, Jung, and Horney revised Freud's ideas.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u2-L5', title: 'Freud Speed Round', description: 'Rapid recall of Freud and the psychodynamic approach.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec9-u3', title: 'The Big Five',
    description: 'The most widely accepted model of personality traits.',
    color: '#3B82F6', icon: '5️⃣', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u3-L1', title: 'The OCEAN Model', description: 'The five broad dimensions that describe personality.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u3-L2', title: 'Openness and Conscientiousness', description: 'The first two Big Five traits and what they predict.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u3-L3', title: 'Extraversion and Agreeableness', description: 'The social and interpersonal dimensions of personality.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u3-L4', title: 'Neuroticism and Emotional Stability', description: 'The trait that measures emotional reactivity and stress response.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u3-L5', title: 'Big Five Conversation', description: 'Apply your Big Five knowledge to real personality profiles.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec9-u4', title: 'Review: Personality Theories',
    description: 'Test your knowledge of all personality theories covered so far.',
    color: '#8B5CF6', icon: '🔄', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u4-L1', title: 'Theories Review', description: 'Compare and contrast the psychodynamic and trait approaches to personality.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u4-L2', title: 'Personality Theories in Action', description: 'Apply different personality theories to real-world situations.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u4-L3', title: 'Personality Theories Speed Round', description: 'Rapid recall of all personality theories covered so far.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec9-u5', title: 'Humanistic Psychology',
    description: 'The humanistic approach to personality and self-actualization.',
    color: '#10B981', icon: '🌱', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u5-L1', title: 'Rogers and Unconditional Positive Regard', description: "Carl Rogers' theory of personality and the importance of acceptance.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u5-L2', title: "Maslow's Hierarchy Revisited", description: "How Maslow's needs hierarchy connects to personality development.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u5-L3', title: 'Self-Actualization', description: 'What it means to reach your full potential, according to Maslow.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u5-L4', title: 'The Fully Functioning Person', description: "Rogers' vision of optimal psychological health.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u5-L5', title: 'Humanistic Conversation', description: 'Apply humanistic concepts to a real-world scenario.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec9-u6', title: 'Social-Cognitive Approach',
    description: 'How learning, thinking, and social context shape personality.',
    color: '#FBBF24', icon: '🔄', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u6-L1', title: 'Bandura and Self-Efficacy', description: 'How your belief in your own abilities shapes your personality.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u6-L2', title: 'Locus of Control', description: 'Whether you believe you control your own outcomes.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u6-L3', title: 'Learned Helplessness', description: 'What happens when people believe they have no control.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u6-L4', title: 'Reciprocal Determinism', description: 'How person, behavior, and environment shape each other.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u6-L5', title: 'Social-Cognitive Speed Round', description: 'Rapid recall of the social-cognitive approach to personality.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec9-u7', title: 'Personality Assessment',
    description: 'The tools psychologists use to measure personality and their limitations.',
    color: '#F97316', icon: '📋', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u7-L1', title: 'Self-Report Inventories', description: 'The most common way to measure personality traits.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u7-L2', title: 'Projective Tests', description: 'How inkblots and ambiguous pictures reveal personality.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u7-L3', title: 'Reliability and Validity in Assessment', description: 'The two essential qualities of any good personality test.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u7-L4', title: 'The MBTI: Popular but Problematic', description: "Why the world's most popular personality test falls short scientifically.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u7-L5', title: 'Assessment Conversation', description: 'Navigate a conversation about personality testing.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec9-u8', title: 'Personality and Culture',
    description: 'How culture shapes personality and whether traits are universal.',
    color: '#14B8A6', icon: '🌍', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u8-L1', title: 'Individualism vs Collectivism', description: 'How cultural values shape the way personality is expressed.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u8-L2', title: 'Cultural Personality Differences', description: 'What research reveals about personality across different cultures.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u8-L3', title: 'Universal vs Culture-Specific Traits', description: 'Whether personality traits exist everywhere or vary by culture.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u8-L4', title: 'Culture Speed Round', description: 'Rapid recall of personality and culture concepts.', icon: '⚡', type: 'speed-round' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec9-u9', title: 'Personality Disorders Overview',
    description: 'When personality patterns become rigid and cause significant distress.',
    color: '#EF4444', icon: '⚠️', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u9-L1', title: 'What Personality Disorders Are', description: 'The difference between personality traits and personality disorders.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u9-L2', title: 'Cluster A, B, and C', description: 'The three clusters of personality disorders.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec9-u9-L3', title: 'Borderline and Narcissistic Personality', description: 'Two of the most studied Cluster B personality disorders.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u9-L4', title: 'Antisocial Personality Disorder', description: 'The personality disorder most linked to criminal behavior.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u9-L5', title: 'Personality Disorders Conversation', description: 'Navigate a conversation about personality disorders with sensitivity.', icon: '💬', type: 'conversation' as const, xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec9-u10', title: 'Section 9 Review',
    description: 'Test your mastery of all personality concepts from this section.',
    color: '#8B5CF6', icon: '🏆', sectionIndex: 8, sectionTitle: 'Personality',
    lessons: [
      { id: 'psy-sec9-u10-L1', title: 'Comprehensive Review', description: 'Review all major personality theories and concepts.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec9-u10-L2', title: 'Personality Scenarios', description: 'Apply all personality concepts to complex real-world situations.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec9-u10-L3', title: 'Personality Expert Conversation', description: 'Demonstrate your mastery by advising on personality topics.', icon: '💬', type: 'conversation' as const, xpReward: 35, questions: [] },
      { id: 'psy-sec9-u10-L4', title: 'Section 9 Speed Round', description: 'Rapid recall across all of Section 9: Personality.', icon: '⚡', type: 'speed-round' as const, xpReward: 35, questions: [] },
    ],
  },

  // ── Section 10: Developmental Psychology (11 units) ──
  {
    id: "psy-sec10-u1", title: "From Conception to First Breath",
    description: "How a single cell becomes a newborn with remarkable built-in abilities.",
    color: "#F59E0B", icon: "👶", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u1-L1", title: "The Three Prenatal Stages", description: "How human development unfolds from fertilization to birth.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u1-L2", title: "Teratogens and Critical Periods", description: "Why timing matters when it comes to prenatal harm.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u1-L3", title: "What Newborns Can Do", description: "Babies arrive with built-in reflexes and surprising perceptual abilities.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u1-L4", title: "Nature, Nurture, and Interaction", description: "The age-old debate and why the answer is always both.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u1-L5", title: "Culture Shapes Early Development", description: "How different cultures approach pregnancy, birth, and infancy.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u2", title: "How Children Think: Piaget",
    description: "Four stages of cognitive development from infancy to adolescence.",
    color: "#F59E0B", icon: "🧩", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u2-L1", title: "Sensorimotor Stage", description: "How babies learn by touching, looking, and putting things in their mouths.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u2-L2", title: "Preoperational Stage", description: "Language explodes but logic lags behind.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u2-L3", title: "Concrete Operational Stage", description: "Logical thinking arrives but stays tied to physical reality.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u2-L4", title: "Formal Operational Stage", description: "Abstract thinking, hypothetical reasoning, and metacognition.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u2-L5", title: "Piaget Under the Microscope", description: "What Piaget got right, what he got wrong, and what came after.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u2-L6", title: "Piaget in Practice", description: "How Piaget's stages show up in parenting, teaching, and design.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u3", title: "Attachment: The Bond That Shapes Us",
    description: "How early relationships wire the brain for trust, love, and resilience.",
    color: "#F59E0B", icon: "🤝", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u3-L1", title: "Bowlby's Attachment Theory", description: "Why babies are biologically programmed to bond.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u3-L2", title: "Ainsworth's Strange Situation", description: "The experiment that revealed four attachment styles.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u3-L3", title: "Secure vs Insecure Attachment", description: "What each style looks like and why it matters.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u3-L4", title: "Attachment Across the Lifespan", description: "How childhood attachment shapes adult relationships.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u3-L5", title: "Can Attachment Change?", description: "Earned security and the plasticity of attachment.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u3-L6", title: "Culture and Attachment", description: "How collectivist and individualist cultures shape caregiving.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u4", title: "Review: Early Development and Attachment",
    description: "Test your knowledge of prenatal development, Piaget, and attachment.",
    color: "#F59E0B", icon: "🔄", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u4-L1", title: "Prenatal and Newborn Review", description: "Revisit stages, teratogens, and newborn capabilities.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u4-L2", title: "Piaget Review", description: "Test your grasp of the four cognitive stages.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u4-L3", title: "Attachment Review", description: "Bowlby, Ainsworth, and attachment styles revisited.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u5", title: "Learning with Help: Vygotsky",
    description: "Why what you can do with guidance matters more than what you can do alone.",
    color: "#F59E0B", icon: "🪜", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u5-L1", title: "The Zone of Proximal Development", description: "The sweet spot between too easy and too hard.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u5-L2", title: "Scaffolding", description: "How skilled helpers build temporary support structures.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u5-L3", title: "Language as a Tool for Thought", description: "How inner speech shapes cognitive development.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u5-L4", title: "Vygotsky vs Piaget", description: "Two giants, two views of how children learn.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u5-L5", title: "Vygotsky in the Classroom", description: "Cooperative learning, peer tutoring, and guided discovery.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u6", title: "Erikson's 8 Life Challenges",
    description: "A roadmap of psychosocial crises from infancy to old age.",
    color: "#F59E0B", icon: "🗺️", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u6-L1", title: "Trust vs Mistrust and Autonomy vs Shame", description: "The first two crises of infancy and toddlerhood.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u6-L2", title: "Initiative, Industry, and Identity", description: "Childhood through adolescence: three crises that build the self.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u6-L3", title: "Intimacy, Generativity, and Integrity", description: "Adulthood's three challenges: love, legacy, and meaning.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u6-L4", title: "Erikson in Real Life", description: "Spotting psychosocial crises in yourself and others.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u6-L5", title: "Critiques and Cultural Limits", description: "Where Erikson's model falls short and what came after.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u6-L6", title: "Erikson Applied", description: "Using psychosocial stages in parenting, education, and therapy.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u7", title: "Moral Development: Kohlberg and Gilligan",
    description: "How our sense of right and wrong develops from childhood through adulthood.",
    color: "#8B5CF6", icon: "⚖️", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u7-L1", title: "Kohlberg's Moral Reasoning", description: "Three levels, six stages, and the famous Heinz dilemma.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u7-L2", title: "Gilligan's Ethics of Care", description: "A different voice: why justice is not the only moral framework.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u7-L3", title: "Moral Emotions and Intuitions", description: "Haidt's moral foundations and the limits of pure reasoning.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u7-L4", title: "Culture and Moral Development", description: "How moral priorities differ across societies.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u7-L5", title: "Moral Development in Practice", description: "Applying moral development theory to real dilemmas.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u8", title: "Adolescent Brain and Identity Formation",
    description: "Why teenagers take risks, seek independence, and struggle to find themselves.",
    color: "#8B5CF6", icon: "🧠", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u8-L1", title: "The Teenage Brain", description: "Prefrontal cortex lag, synaptic pruning, and why risk feels rewarding.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u8-L2", title: "Identity: Erikson and Marcia", description: "Four identity statuses and the search for self.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u8-L3", title: "Peer Influence and Conformity", description: "Why friends matter more than parents during adolescence.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u8-L4", title: "Risk, Reward, and Decision Making", description: "Why teens know the risks but take them anyway.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u8-L5", title: "Emerging Adulthood", description: "The new life stage between adolescence and full adulthood.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u9", title: "Adult Development and Aging",
    description: "How cognition, personality, and social roles evolve through adulthood.",
    color: "#8B5CF6", icon: "🌳", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u9-L1", title: "Erikson's Adult Stages", description: "Intimacy, generativity, and integrity revisited in depth.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u9-L2", title: "Cognitive Changes in Adulthood", description: "Fluid vs crystallized intelligence and the aging brain.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u9-L3", title: "Physical Aging", description: "What happens to the body and what science says about slowing it.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u9-L4", title: "Social and Emotional Changes", description: "Socioemotional selectivity and the positivity effect.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u9-L5", title: "Successful Aging", description: "What predicts well-being in later life.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u10", title: "Death, Dying, and Grief",
    description: "How we understand, face, and cope with the end of life.",
    color: "#8B5CF6", icon: "🕊️", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u10-L1", title: "Facing Death", description: "How understanding of death develops across the lifespan.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u10-L2", title: "Kubler-Ross and Beyond", description: "The five responses and why they are not universal stages.", icon: "📝", xpReward: 10, questions: [] },
      { id: "psy-sec10-u10-L3", title: "Grief Is Not Linear", description: "Why the stage model fails and what actually helps.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u10-L4", title: "Culture and Death", description: "How different traditions approach dying and mourning.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u10-L5", title: "Complicated Grief", description: "When grief becomes prolonged and how to recognize it.", icon: "📝", xpReward: 15, questions: [] },
    ],
  },

  {
    id: "psy-sec10-u11", title: "Developmental Psychology Review",
    description: "Comprehensive review across all developmental psychology topics.",
    color: "#8B5CF6", icon: "🏁", sectionIndex: 9, sectionTitle: "Developmental Psychology",
    lessons: [
      { id: "psy-sec10-u11-L1", title: "Foundations Review", description: "Prenatal development, Piaget, and attachment revisited.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u11-L2", title: "Theories Review", description: "Vygotsky, Erikson, and Kohlberg side by side.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u11-L3", title: "Adolescence Through Aging", description: "The teenage brain, adult development, and end of life.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec10-u11-L4", title: "Section Checkpoint", description: "Full section challenge across all developmental topics.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },


  // ── Section 11: Mental Health & Abnormal Psychology (15 units) ──
  {
    id: "psy-sec11-u1", title: "What Is Mental Illness?",
    description: "How psychologists define, classify, and diagnose mental disorders using the DSM.",
    color: "#8B5CF6", icon: "📋", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u1-L1", title: "Defining Abnormal Behavior", description: "What makes behavior \"abnormal\" and why the line is harder to draw than you think.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u1-L2", title: "The DSM Explained", description: "What the Diagnostic and Statistical Manual is and how clinicians use it.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u1-L3", title: "How Clinicians Make a Diagnosis", description: "The process clinicians follow to identify a mental disorder.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u1-L4", title: "Models of Mental Illness", description: "How different frameworks explain the origins of mental disorders.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u1-L5", title: "How Common Are Mental Disorders?", description: "The prevalence of mental illness and why mental health literacy matters.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u2", title: "Anxiety Disorders",
    description: "How normal worry becomes a disorder, from generalized anxiety to panic attacks to phobias.",
    color: "#8B5CF6", icon: "😰", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u2-L1", title: "When Worry Crosses the Line", description: "The difference between normal anxiety and an anxiety disorder.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u2-L2", title: "Generalized Anxiety Disorder", description: "When worry becomes chronic and uncontrollable.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u2-L3", title: "Panic Disorder and Panic Attacks", description: "What panic attacks are and when they become panic disorder.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u2-L4", title: "Specific Phobias", description: "Intense, irrational fears of specific objects or situations.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u2-L5", title: "Social Anxiety Disorder", description: "When fear of judgment controls your social life.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u2-L6", title: "The Biology of Anxiety", description: "How the brain and body create anxiety responses.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u3", title: "Depression: Causes, Biology, and Experience",
    description: "Understanding major depressive disorder, its biological roots, and what it feels like.",
    color: "#8B5CF6", icon: "🌧️", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u3-L1", title: "What Depression Really Is", description: "Major depressive disorder is more than sadness.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u3-L2", title: "The Biology Behind Depression", description: "How brain chemistry, genetics, and the body contribute to depression.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u3-L3", title: "Thinking Patterns and Depression", description: "How cognitive distortions and learned helplessness fuel depression.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u3-L4", title: "Social Roots of Depression", description: "How relationships, loss, and inequality affect depression risk.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u3-L5", title: "Beyond Major Depression", description: "Other depressive disorders and how they differ from MDD.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u3-L6", title: "Who Gets Depressed?", description: "How depression varies by gender, age, and culture.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u4", title: "Review: Foundations of Mental Health",
    description: "Consolidate your knowledge of diagnosis, anxiety disorders, and depression.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u4-L1", title: "Diagnosis and the DSM Review", description: "Test your recall of abnormality criteria, the DSM, and models of mental illness.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u4-L2", title: "Anxiety Disorders Review", description: "Distinguish between GAD, panic disorder, phobias, and social anxiety.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u4-L3", title: "Depression Review", description: "Synthesize biological, psychological, and social perspectives on depression.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u5", title: "Bipolar Disorder",
    description: "Understanding the mood swings of bipolar disorder, from mania to depression.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u5-L1", title: "What Is Bipolar Disorder?", description: "How bipolar disorder differs from regular mood changes.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u5-L2", title: "Bipolar I vs. Bipolar II", description: "The important differences between the two main types of bipolar disorder.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u5-L3", title: "The Biology of Bipolar Disorder", description: "Genetics, brain chemistry, and the biological roots of bipolar mood episodes.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u5-L4", title: "Living with Bipolar Disorder", description: "Treatment approaches and what day-to-day management looks like.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u5-L5", title: "Cyclothymia and Bipolar Myths", description: "A milder bipolar variant and common misconceptions that harm understanding.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u6", title: "PTSD and Trauma",
    description: "How traumatic experiences can reshape the brain and behavior, and how people recover.",
    color: "#8B5CF6", icon: "🛡️", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u6-L1", title: "What Is Psychological Trauma?", description: "How exposure to traumatic events affects mental health.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u6-L2", title: "Recognizing PTSD Symptoms", description: "The 4 symptom clusters of post-traumatic stress disorder.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u6-L3", title: "How Trauma Changes the Brain", description: "The neuroscience behind PTSD and why trauma memories are different.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u6-L4", title: "Complex Trauma and ACEs", description: "How prolonged or repeated trauma, especially in childhood, creates lasting effects.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u6-L5", title: "Treating PTSD", description: "Evidence-based treatments that help people recover from trauma.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u6-L6", title: "Trauma-Informed Care", description: "How understanding trauma changes the way we support people.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u7", title: "OCD and Related Disorders",
    description: "Understanding obsessive-compulsive disorder, body dysmorphia, and hoarding.",
    color: "#8B5CF6", icon: "🔁", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u7-L1", title: "What Is OCD?", description: "The cycle of obsessions and compulsions that defines OCD.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u7-L2", title: "Common OCD Themes", description: "The most frequent obsession types and their associated compulsions.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u7-L3", title: "Treating OCD", description: "The gold standard treatment and why it works.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u7-L4", title: "Body Dysmorphic Disorder", description: "When perceived flaws become an obsession.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u7-L5", title: "Hoarding Disorder", description: "When difficulty discarding possessions creates dangerous living conditions.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u8", title: "Schizophrenia and Psychosis",
    description: "Understanding psychotic disorders, from hallucinations and delusions to treatment and recovery.",
    color: "#8B5CF6", icon: "🧠", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u8-L1", title: "What Is Psychosis?", description: "Understanding the loss of contact with reality that defines psychotic experiences.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u8-L2", title: "Understanding Schizophrenia", description: "The positive and negative symptoms that define schizophrenia.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u8-L3", title: "What Causes Schizophrenia?", description: "Genetics, brain differences, and environmental triggers.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u8-L4", title: "Treating Schizophrenia", description: "Antipsychotic medications, psychosocial treatments, and recovery.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u8-L5", title: "Fighting Stigma Around Psychosis", description: "Addressing harmful stereotypes about schizophrenia and psychotic disorders.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u8-L6", title: "Beyond Schizophrenia", description: "Brief psychotic disorder, schizoaffective disorder, and the psychosis spectrum.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u9", title: "Review: Mood, Trauma, and Psychotic Disorders",
    description: "Reinforce your knowledge of bipolar disorder, PTSD, OCD, and schizophrenia.",
    color: "#6366F1", icon: "🔄", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u9-L1", title: "Bipolar Disorder and PTSD Revisited", description: "Test your recall of mood episodes and trauma responses.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u9-L2", title: "OCD and Schizophrenia Revisited", description: "Test your understanding of obsessive-compulsive and psychotic disorders.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u9-L3", title: "Cross-Disorder Comparisons", description: "Distinguish between conditions that share overlapping features.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u10", title: "Personality Disorders: Clusters A, B, C",
    description: "How enduring patterns of behavior and thinking can become personality disorders.",
    color: "#EC4899", icon: "🎭", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u10-L1", title: "What Are Personality Disorders?", description: "How personality patterns become disorders when they cause lasting distress.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u10-L2", title: "Cluster A: Odd and Eccentric Patterns", description: "Paranoid, schizoid, and schizotypal personality disorders.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u10-L3", title: "Cluster B: Dramatic and Erratic Patterns", description: "Antisocial, borderline, histrionic, and narcissistic personality disorders.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u10-L4", title: "Cluster C: Anxious and Fearful Patterns", description: "Avoidant, dependent, and obsessive-compulsive personality disorders.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u11", title: "Eating Disorders",
    description: "How distorted relationships with food and body image become serious clinical conditions.",
    color: "#F472B6", icon: "🍽️", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u11-L1", title: "Understanding Eating Disorders", description: "Why eating disorders are serious mental health conditions, not lifestyle choices.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u11-L2", title: "Anorexia Nervosa", description: "The psychology and medical dangers of severe food restriction.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u11-L3", title: "Bulimia and Binge Eating Disorder", description: "Binge-purge cycles and recurrent binge eating without compensation.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u11-L4", title: "Eating Disorder Treatment and Recovery", description: "Evidence-based approaches to treating eating disorders.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u12", title: "Substance Use Disorders and Addiction",
    description: "How the brain's reward system gets hijacked and what makes recovery so challenging.",
    color: "#EF4444", icon: "🧪", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u12-L1", title: "The Brain Science of Addiction", description: "How substances change the brain's reward circuitry.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u12-L2", title: "Types of Substance Use Disorders", description: "How the DSM classifies substance-related conditions.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u12-L3", title: "The Opioid Crisis and Behavioral Addictions", description: "How prescription drugs became an epidemic and why behavior can be addictive too.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u12-L4", title: "Addiction Treatment and Recovery", description: "Evidence-based approaches to treating substance use disorders.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u12-L5", title: "Supporting Someone in Recovery", description: "Practice responding to real situations involving substance use.", icon: "💬", xpReward: 30, questions: [] },
      { id: "psy-sec11-u12-L6", title: "Substance Use Disorders Speed Round", description: "Rapid recall of addiction science, treatment, and key concepts.", icon: "⚡", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u13", title: "Neurodevelopmental: ADHD and Autism Spectrum",
    description: "Understanding conditions that shape how the brain develops from early childhood.",
    color: "#14B8A6", icon: "🧠", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u13-L1", title: "What Are Neurodevelopmental Disorders?", description: "Conditions that begin in early development and affect brain functioning.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u13-L2", title: "ADHD: More Than Inattention", description: "How ADHD affects attention, impulse control, and executive function.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u13-L3", title: "Autism Spectrum Disorder", description: "Understanding the wide range of experiences on the autism spectrum.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u13-L4", title: "Living with ADHD and Autism", description: "Strengths, challenges, and how support makes the difference.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u14", title: "Stigma and Mental Health Advocacy",
    description: "How stigma harms people with mental health conditions and what we can do about it.",
    color: "#8B5CF6", icon: "📢", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u14-L1", title: "Understanding Mental Health Stigma", description: "What stigma is and how it prevents people from getting help.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec11-u14-L2", title: "Media, Culture, and Stigma", description: "How media portrayals shape public attitudes toward mental illness.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u14-L3", title: "Reducing Stigma and Advocacy", description: "Evidence-based strategies for fighting mental health stigma.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec11-u15", title: "Section 11 Review and Checkpoint",
    description: "Prove your mastery of mental health and abnormal psychology across all units.",
    color: "#6366F1", icon: "🏆", sectionIndex: 10, sectionTitle: "Mental Health & Abnormal Psychology",
    lessons: [
      { id: "psy-sec11-u15-L1", title: "Diagnostic Foundations Review", description: "Review the DSM, diagnosis, and the major disorder categories from Section 11.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec11-u15-L2", title: "Cross-Category Synthesis", description: "Apply your knowledge across multiple disorder categories.", icon: "📝", xpReward: 30, questions: [] },
      { id: "psy-sec11-u15-L3", title: "Applying Anti-Stigma Knowledge", description: "Use everything you have learned to challenge stigma across conditions.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  // ── Section 12: Therapy & Treatment (13 units) ──
  {
    id: "psy-sec12-u1", title: "From Asylums to Evidence-Based Care",
    description: "How society has treated mental illness across centuries and what drove reform.",
    color: "#8B5CF6", icon: "🏥", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u1-L1", title: "Ancient Views of Mental Illness", description: "How early civilizations explained and treated psychological distress.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec12-u1-L2", title: "The Rise and Fall of Asylums", description: "How institutions for the mentally ill went from reform to abuse and back.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u1-L3", title: "The Birth of Modern Psychotherapy", description: "How Freud, behaviorists, and humanists shaped the therapies we use today.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u1-L4", title: "Harmful \"Treatments\" in History", description: "Lobotomies, forced sterilization, and other dark chapters in mental health care.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u1-L5", title: "Therapy Today Is Not What You Think", description: "Busting the biggest misconception about what modern therapy actually looks like.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u2", title: "CBT: Changing Thoughts to Change Feelings",
    description: "The most widely studied therapy and how it rewires unhelpful thinking patterns.",
    color: "#8B5CF6", icon: "🧠", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u2-L1", title: "What CBT Is and Why It Works", description: "The core model of CBT and why it became the gold standard in psychotherapy.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec12-u2-L2", title: "Cognitive Distortions", description: "The common thinking traps that CBT teaches you to spot and challenge.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u2-L3", title: "CBT Techniques in Action", description: "The practical tools CBT therapists use: thought records, behavioral experiments, and more.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u2-L4", title: "CBT for Specific Disorders", description: "How CBT adapts its techniques for depression, anxiety, OCD, and PTSD.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u2-L5", title: "Limitations and Criticisms of CBT", description: "When CBT is not the best fit and what its critics say.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u2-L6", title: "CBT in the Real World", description: "Digital CBT, self-help applications, and how CBT is accessed globally.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u3", title: "DBT: Balancing Acceptance and Change",
    description: "A therapy built for the hardest-to-treat conditions, now used far beyond its origins.",
    color: "#8B5CF6", icon: "⚖️", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u3-L1", title: "What DBT Is and Where It Came From", description: "How Marsha Linehan built a therapy for people other treatments had failed.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec12-u3-L2", title: "The Four DBT Skill Modules", description: "Mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u3-L3", title: "How DBT Is Delivered", description: "The four components of a comprehensive DBT program.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u3-L4", title: "Validation in DBT", description: "Why validation is as important as skill-building in DBT.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u3-L5", title: "DBT vs. CBT and When to Choose Which", description: "Comparing the two therapies and understanding which fits different situations.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u4", title: "Review: History, CBT, and DBT",
    description: "Consolidate your knowledge of therapy history, cognitive behavioral therapy, and dialectical behavior therapy.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u4-L1", title: "History of Treatment Review", description: "Test your recall of how mental health treatment has evolved over centuries.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u4-L2", title: "CBT Concepts and Techniques Review", description: "Test your understanding of cognitive distortions, CBT techniques, and applications.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u4-L3", title: "DBT Concepts and Skills Review", description: "Test your grasp of DBT philosophy, skill modules, and how it differs from CBT.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u5", title: "Psychodynamic Therapy: The Modern Descendant of Freud",
    description: "How Freud's ideas evolved into a modern, evidence-supported therapy approach.",
    color: "#8B5CF6", icon: "🔍", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u5-L1", title: "What Psychodynamic Therapy Is", description: "How modern psychodynamic therapy differs from classical psychoanalysis.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec12-u5-L2", title: "Key Psychodynamic Concepts", description: "Transference, countertransference, and the unconscious in therapy.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u5-L3", title: "Defense Mechanisms in Depth", description: "The psychological strategies we all use to manage uncomfortable feelings.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u5-L4", title: "Short-Term Psychodynamic Therapy", description: "Modern time-limited approaches that make psychodynamic work more accessible.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u5-L5", title: "Choosing Psychodynamic Therapy Wisely", description: "When this approach shines and when other therapies may be more appropriate.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u6", title: "Person-Centered Therapy: The Power of Being Heard",
    description: "Carl Rogers' approach and why empathy, genuineness, and acceptance are therapeutic.",
    color: "#8B5CF6", icon: "💚", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u6-L1", title: "Carl Rogers and the Humanistic Revolution", description: "How one psychologist put the client at the center of therapy.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec12-u6-L2", title: "The Three Core Conditions", description: "Empathy, genuineness, and unconditional positive regard explained.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u6-L3", title: "Conditions of Worth and Self-Concept", description: "How conditional acceptance in childhood shapes who we think we are.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u6-L4", title: "Strengths and Limitations of Humanistic Therapy", description: "Where person-centered therapy excels and where it falls short.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u6-L5", title: "Existential Therapy and Beyond", description: "How the humanistic tradition expanded into existential questions about meaning and mortality.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u7", title: "Group Therapy and Family Systems",
    description: "Why healing sometimes happens best in the company of others.",
    color: "#8B5CF6", icon: "👥", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u7-L1", title: "How Group Therapy Works", description: "The unique healing factors that only exist when people work together.", icon: "📝", xpReward: 15, questions: [] },
      { id: "psy-sec12-u7-L2", title: "Types of Group Therapy", description: "From support groups to psychoeducation to process groups.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u7-L3", title: "Family Systems Therapy", description: "Why therapists sometimes treat the whole family instead of just one person.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u7-L4", title: "Key Family Therapy Concepts", description: "Triangulation, homeostasis, and intergenerational patterns.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u7-L5", title: "Matching Format to Need", description: "How therapists decide whether individual, group, or family therapy is the best fit.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u8", title: "Psychopharmacology: How Medications Treat Mental Health",
    description: "How psychiatric medications work in the brain and when they are used.",
    color: "#8B5CF6", icon: "💊", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u8-L1", title: "How Psychiatric Medications Work", description: "The basics of how medications affect brain chemistry to treat mental health conditions.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u8-L2", title: "SSRIs: The Most Prescribed Antidepressants", description: "How selective serotonin reuptake inhibitors work and what conditions they treat.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u8-L3", title: "SNRIs and Other Antidepressants", description: "How SNRIs differ from SSRIs and what other antidepressant classes exist.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u8-L4", title: "Antipsychotic Medications", description: "How antipsychotics work and the difference between first-generation and second-generation types.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u8-L5", title: "Mood Stabilizers and Anti-anxiety Medications", description: "How lithium, benzodiazepines, and other medications stabilize mood and reduce anxiety.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u8-L6", title: "Medication Myths and Responsible Use", description: "Common misconceptions about psychiatric medication and principles of responsible use.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u9", title: "Therapy Approaches and Medications Review",
    description: "Test your knowledge of psychodynamic therapy, humanistic therapy, group therapy, and psychopharmacology.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u9-L1", title: "Psychodynamic and Humanistic Approaches", description: "Review the core principles of psychodynamic and person-centered therapy.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u9-L2", title: "Group and Family Therapy Approaches", description: "Review how group and family therapy work and when they are used.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u9-L3", title: "Medication Classes and Mechanisms", description: "Review SSRIs, SNRIs, antipsychotics, and other psychiatric medications.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u10", title: "When to Seek Help and Finding a Therapist",
    description: "Recognize when professional help is needed and learn how to find the right therapist for you.",
    color: "#8B5CF6", icon: "🧭", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u10-L1", title: "Signs That Professional Help Could Be Beneficial", description: "How to recognize when everyday struggles become something worth discussing with a professional.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u10-L2", title: "Types of Mental Health Professionals", description: "The differences between psychiatrists, psychologists, counselors, and social workers.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u10-L3", title: "How to Find the Right Therapist", description: "Practical steps for searching, evaluating, and choosing a therapist.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u10-L4", title: "What to Expect in Your First Session", description: "How a first therapy session typically works and how to prepare.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u10-L5", title: "Overcoming Barriers to Seeking Help", description: "Common obstacles to starting therapy and practical strategies for overcoming them.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u11", title: "Evidence-Based Practice: What Works",
    description: "How researchers determine which therapies are effective and what the evidence says.",
    color: "#8B5CF6", icon: "🔬", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u11-L1", title: "What Makes a Therapy Evidence-Based", description: "How clinical trials and research determine whether a therapy actually works.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u11-L2", title: "Therapies with the Strongest Evidence", description: "Which therapies have the most research support and for which conditions.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u11-L3", title: "Common Factors in Effective Therapy", description: "The shared ingredients that make all effective therapies work.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u11-L4", title: "How to Evaluate Therapy Claims", description: "Critical thinking skills for distinguishing proven therapies from pseudoscience.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u11-L5", title: "Integrative and Combined Treatments", description: "How combining therapy with medication or other approaches can improve outcomes.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u12", title: "Cultural Competence in Therapy",
    description: "Why culture matters in mental health treatment and how therapists can be more inclusive.",
    color: "#8B5CF6", icon: "🌍", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u12-L1", title: "Why Culture Matters in Therapy", description: "How cultural background shapes the experience of mental health and treatment.", icon: "📝", xpReward: 20, questions: [] },
      { id: "psy-sec12-u12-L2", title: "Disparities in Mental Health Care", description: "How systemic inequities affect access to and quality of mental health treatment.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u12-L3", title: "Adapting Therapy Across Cultures", description: "Practical ways therapists adapt evidence-based treatments for diverse populations.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u12-L4", title: "Intersectionality and Identity in Therapy", description: "How overlapping identities shape mental health experiences and treatment.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u12-L5", title: "Building an Inclusive Mental Health System", description: "What needs to change to make mental health care work for everyone.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "psy-sec12-u13", title: "Therapy & Treatment: Complete Review",
    description: "Test your knowledge across all therapy and treatment topics.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 11, sectionTitle: "Therapy & Treatment",
    lessons: [
      { id: "psy-sec12-u13-L1", title: "History and Core Therapy Approaches", description: "Review the history of mental health treatment, CBT, and DBT.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u13-L2", title: "Medication and Psychopharmacology", description: "Review psychiatric medication classes, mechanisms, and responsible use.", icon: "📝", xpReward: 25, questions: [] },
      { id: "psy-sec12-u13-L3", title: "Access, Evidence, and Cultural Competence", description: "Review seeking help, evidence-based practice, and cultural competence in therapy.", icon: "📝", xpReward: 30, questions: [] },
      { id: "psy-sec12-u13-L4", title: "Therapy and Treatment Synthesis", description: "Apply everything you learned to complex, real-world scenarios.", icon: "📝", xpReward: 35, questions: [] },
    ],
  },


  // ── Section 13: Applied & Industrial Psychology (Part 1, 6 units) ──
  {
    id: 'psy-sec13-u1', title: 'Why Consumers Act Irrationally',
    description: 'How cognitive biases lead people to make predictably irrational economic decisions.',
    color: '#6366F1', icon: '🧠', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u1-L1', title: 'Bounded Rationality and Heuristics', description: 'Why people settle for "good enough" instead of perfectly rational choices.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec13-u1-L2', title: 'The Anchoring Effect', description: 'How the first number you see changes every number that follows.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec13-u1-L3', title: 'Loss Aversion and the Endowment Effect', description: 'Why losing $100 hurts more than gaining $100 feels good.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u1-L4', title: 'Framing Effects and Prospect Theory', description: 'How the same information leads to different choices depending on presentation.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u1-L5', title: 'Choice Overload and Decision Fatigue', description: 'Why more options often lead to worse decisions or no decision at all.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'psy-sec13-u2', title: 'The Psychology Behind Pricing',
    description: 'How marketers use cognitive biases to influence what you buy and how much you pay.',
    color: '#EC4899', icon: '💰', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u2-L1', title: 'Price Perception and Charm Pricing', description: 'Why $9.99 feels dramatically cheaper than $10.00.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec13-u2-L2', title: 'The Decoy Effect and Asymmetric Dominance', description: 'How adding a worse option makes another option look better.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u2-L3', title: 'Scarcity, Urgency, and Social Proof', description: 'The persuasion triggers that make people buy faster and more impulsively.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u2-L4', title: 'The Psychology of Free and Bundling', description: 'Why "free" is the most powerful word in marketing and how bundles change value perception.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u2-L5', title: 'Nudge Theory and Choice Architecture', description: 'How small design changes can guide better decisions without restricting freedom.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec13-u3', title: 'Mental Accounting and Financial Behavior',
    description: 'How people mentally categorize money and why it leads to irrational financial decisions.',
    color: '#14B8A6', icon: '🏦', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u3-L1', title: 'Mental Accounting Basics', description: 'Why people treat money differently depending on where it came from or what it is for.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec13-u3-L2', title: 'The Sunk Cost Fallacy', description: 'Why people throw good money after bad because of what they already spent.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u3-L3', title: 'Payment Pain and Spending Psychology', description: 'Why credit cards make you spend more and how payment methods change behavior.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u3-L4', title: 'Temporal Discounting and Instant Gratification', description: 'Why we consistently choose smaller rewards now over larger rewards later.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u3-L5', title: 'Behavioral Finance in Investing', description: 'How cognitive biases cause investors to buy high, sell low, and overestimate their skills.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec13-u4', title: 'Behavioral Economics in Action',
    description: 'Review and apply key concepts from behavioral economics, pricing psychology, and financial behavior.',
    color: '#F97316', icon: '🔄', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u4-L1', title: 'Bias Identification Challenge', description: 'Identify which cognitive bias is at work in real-world consumer and financial scenarios.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u4-L2', title: 'Marketing Psychology Synthesis', description: 'Connect pricing strategies, persuasion principles, and consumer psychology into a unified framework.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u4-L3', title: 'Applied Behavioral Economics', description: 'Integrate all behavioral economics concepts into real-world analysis and debiasing strategies.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec13-u5', title: 'Workplace Motivation and Leadership',
    description: 'What drives people at work and what separates effective leaders from ineffective ones.',
    color: '#8B5CF6', icon: '💼', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u5-L1', title: 'Intrinsic vs. Extrinsic Motivation', description: 'Why some rewards increase motivation and others destroy it.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec13-u5-L2', title: 'Self-Determination Theory at Work', description: 'How fulfilling three basic psychological needs creates engaged, motivated employees.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u5-L3', title: 'Herzberg and Job Satisfaction', description: 'Why removing dissatisfaction and creating satisfaction are two completely different things.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u5-L4', title: 'Leadership Styles and Effectiveness', description: 'The major leadership theories and which styles work best in different situations.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u5-L5', title: 'Emotional Intelligence in Leadership', description: 'Why the best leaders manage emotions, not just tasks.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec13-u6', title: 'Organizational Behavior and Team Dynamics',
    description: 'How groups, teams, and organizational cultures shape individual behavior at work.',
    color: '#059669', icon: '👥', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u6-L1', title: 'Group Dynamics and Social Loafing', description: 'Why people work differently in groups than alone, and not always for the better.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec13-u6-L2', title: 'Groupthink and Decision-Making Failures', description: 'How the desire for harmony can lead smart groups to make catastrophic decisions.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u6-L3', title: 'Organizational Culture and Climate', description: 'How shared values, norms, and assumptions shape behavior throughout an organization.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u6-L4', title: 'Psychological Safety and High-Performance Teams', description: 'Google\'s research on what makes teams succeed and why feeling safe to fail is the key factor.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u6-L5', title: 'Conflict, Negotiation, and Organizational Justice', description: 'How workplace conflict can be productive, and why perceived fairness determines employee commitment.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },


  // ── Section 13: Applied & Industrial Psychology (Part 2, 5 units) ──
  {
    id: 'psy-sec13-u7', title: 'Hiring Right and Giving Better Feedback',
    description: 'How psychology improves hiring decisions, performance reviews, and constructive feedback.',
    color: '#8B5CF6', icon: '📋', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u7-L1', title: 'Structured vs Unstructured Interviews', description: 'Why the format of an interview matters more than gut instinct.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u7-L2', title: 'Performance Appraisal and Rater Bias', description: 'Why performance reviews often fail and how to make them accurate.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u7-L3', title: 'Constructive Feedback That Works', description: 'Evidence-based strategies for giving feedback that changes behavior.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u7-L4', title: 'Job Satisfaction and Engagement', description: 'What actually makes people satisfied at work, and what does not.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u7-L5', title: 'Fairness, Justice, and Psychological Contracts', description: 'How perceived fairness shapes trust, motivation, and turnover.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec13-u8', title: 'The Psychology Behind Great Design',
    description: 'How cognitive principles shape user experience, interfaces, and product decisions.',
    color: '#EC4899', icon: '🎨', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u8-L1', title: 'Cognitive Load and Interface Design', description: 'Why simple interfaces win and how working memory limits design.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u8-L2', title: 'Gestalt Principles in Visual Design', description: 'How the brain organizes visual information and why designers use grouping.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u8-L3', title: 'Persuasion Patterns and Dark Patterns', description: 'When design nudges help users versus when they manipulate them.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u8-L4', title: 'Decision Architecture and Choice Framing', description: 'How the presentation of choices shapes what people decide.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u8-L5', title: 'Accessibility and Inclusive Design', description: 'Why designing for diverse abilities improves the experience for everyone.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec13-u9', title: 'The Mental Game of Sports',
    description: 'How psychology shapes athletic performance, from visualization to choking under pressure.',
    color: '#F97316', icon: '🏅', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u9-L1', title: 'Mental Imagery and Visualization', description: 'Why imagining a perfect performance actually improves the real one.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u9-L2', title: 'Arousal, Anxiety, and the Zone', description: 'Why some pressure helps performance while too much destroys it.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u9-L3', title: 'Choking Under Pressure', description: 'Why skilled performers suddenly fail and how to prevent it.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u9-L4', title: 'Goal Setting and Self-Talk', description: 'How goal types and internal dialogue affect athletic performance.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u9-L5', title: 'Team Dynamics and Group Motivation', description: 'Why some teams perform above their talent level and others collapse.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec13-u10', title: 'Changing Health Behaviors for Good',
    description: 'How psychology explains why health habits are hard to change and what actually works.',
    color: '#10B981', icon: '💚', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u10-L1', title: 'The Stages of Behavior Change', description: 'Why change happens in stages and why most people are not ready to act yet.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u10-L2', title: 'The Health Belief Model', description: 'Why people ignore health risks and what makes them take action.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec13-u10-L3', title: 'Habit Formation and Breaking', description: 'The science of how habits form, persist, and can be changed.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u10-L4', title: 'Stress, Coping, and the Biopsychosocial Model', description: 'How biological, psychological, and social factors interact in health.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u10-L5', title: 'Adherence and the Intention-Action Gap', description: 'Why people know what to do for their health but still do not do it.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec13-u11', title: 'Applied Psychology: Full Section Review',
    description: 'Test your knowledge across all of applied and industrial psychology.',
    color: '#6366F1', icon: '🏁', sectionIndex: 12, sectionTitle: 'Applied & Industrial Psychology',
    lessons: [
      { id: 'psy-sec13-u11-L1', title: 'Behavioral Economics and Consumer Review', description: 'Review key concepts from behavioral economics, pricing, and mental accounting.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u11-L2', title: 'Workplace and Organizational Review', description: 'Review motivation, leadership, teams, hiring, and feedback.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u11-L3', title: 'UX, Sports, and Health Review', description: 'Review design psychology, athletic performance, and behavior change.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec13-u11-L4', title: 'Applied Psychology Speed Challenge', description: 'Rapid-fire questions covering all of Section 13.', icon: '⚡', type: 'speed-round', xpReward: 35, questions: [] },
    ],
  },


  // ── Section 14: Research Methods (Part 1, 5 units) ──
  {
    id: 'psy-sec14-u1', title: 'Why Science Matters in Psychology',
    description: 'How the scientific method transforms psychology from opinion into evidence.',
    color: '#3B82F6', icon: '🔬', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u1-L1', title: 'Psychology as a Science', description: 'Why psychology relies on data instead of guesses.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u1-L2', title: 'Common Sense vs Evidence', description: 'Why everyday intuition often misleads us about human behavior.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u1-L3', title: 'The Scientific Method', description: 'The step-by-step process psychologists use to test ideas.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u1-L4', title: 'Peer Review and Publishing', description: 'How psychologists share findings and ensure quality control.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u1-L5', title: 'Evaluating Claims Like a Scientist', description: 'Practice applying scientific thinking to everyday claims.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec14-u2', title: 'Research Designs',
    description: 'The main approaches psychologists use to study behavior and mental processes.',
    color: '#10B981', icon: '📋', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u2-L1', title: 'Experiments', description: 'The gold standard for establishing cause and effect.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u2-L2', title: 'Correlational Studies', description: 'Finding relationships between variables without establishing cause.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u2-L3', title: 'Case Studies', description: 'Deep investigation of a single person or small group.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u2-L4', title: 'Naturalistic Observation', description: 'Studying behavior where it naturally happens.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u2-L5', title: 'Research Design Speed Round', description: 'Rapid recall of all four major research designs.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec14-u3', title: 'Variables and Hypotheses',
    description: 'How researchers define, measure, and predict the factors they study.',
    color: '#FBBF24', icon: '🔍', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u3-L1', title: 'Independent vs Dependent Variables', description: 'The two core variables in every experiment.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u3-L2', title: 'Confounding Variables', description: 'Hidden factors that can ruin an experiment.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u3-L3', title: 'Operational Definitions', description: 'How researchers turn abstract concepts into measurable quantities.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u3-L4', title: 'Writing Hypotheses', description: 'How to write predictions that research can actually test.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u3-L5', title: 'Designing Your First Experiment', description: 'Practice identifying variables and writing hypotheses for a real study.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec14-u4', title: 'Review: Research Foundations',
    description: 'Consolidate everything you have learned about research methods fundamentals.',
    color: '#8B5CF6', icon: '🔄', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u4-L1', title: 'Research Methods Review', description: 'Revisit key concepts from the scientific method, designs, and variables.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u4-L2', title: 'Research Scenarios', description: 'Apply your knowledge to realistic research situations.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec14-u4-L3', title: 'Research Foundations Speed Round', description: 'Rapid recall of all research foundations concepts.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec14-u5', title: 'Sampling and Bias',
    description: 'How to choose participants and avoid biased results.',
    color: '#EC4899', icon: '👥', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u5-L1', title: 'Populations and Samples', description: 'The difference between everyone and the group you actually study.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u5-L2', title: 'Random Sampling', description: 'How giving everyone an equal chance creates fair samples.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u5-L3', title: 'Selection Bias', description: 'How flawed participant selection distorts research results.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u5-L4', title: 'Sample Size', description: 'Why the number of participants matters for reliable results.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u5-L5', title: 'Advising on Study Sampling', description: 'Help a classmate fix their sampling strategy for a research project.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },


  // ── Section 14: Research Methods (Part 2, 5 units) ──
  {
    id: 'psy-sec14-u6', title: 'Statistics Essentials',
    description: 'The basic numbers researchers use to summarize and interpret data.',
    color: '#14B8A6', icon: '📊', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u6-L1', title: 'Mean, Median, Mode', description: 'Three ways to describe the center of a data set.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u6-L2', title: 'Standard Deviation', description: 'How spread out data points are from the average.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u6-L3', title: 'Correlation Coefficients', description: 'Putting a number on the strength and direction of a relationship.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u6-L4', title: 'Statistical Significance', description: 'How researchers decide if results are real or just chance.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u6-L5', title: 'Statistics Speed Round', description: 'Rapid recall of essential statistics concepts.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec14-u7', title: 'Experiments in Detail',
    description: 'Advanced experimental design concepts that strengthen causal claims.',
    color: '#F97316', icon: '🧪', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u7-L1', title: 'Control Groups', description: 'Why every experiment needs a baseline for comparison.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u7-L2', title: 'Random Assignment', description: 'How chance placement eliminates systematic group differences.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u7-L3', title: 'Single and Double Blind', description: 'How hiding information prevents bias in experiments.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u7-L4', title: 'The Placebo Effect', description: 'How believing in a treatment can produce real improvements.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u7-L5', title: 'Designing a Clinical Trial', description: 'Help design a rigorous experiment for a new therapy.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec14-u8', title: 'Ethics in Research',
    description: 'The rules that protect participants and ensure responsible science.',
    color: '#EF4444', icon: '⚖️', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u8-L1', title: 'Informed Consent', description: 'Why participants must understand and agree to what they are joining.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u8-L2', title: 'Deception in Research', description: 'When is it acceptable to mislead participants, and what safeguards are required?', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u8-L3', title: 'Animal Research Ethics', description: 'The rules and debates around using animals in psychological research.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u8-L4', title: 'Ethics Speed Round', description: 'Rapid recall of research ethics principles.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec14-u9', title: 'Reading and Evaluating Research',
    description: 'How to critically assess whether a study\'s findings are trustworthy.',
    color: '#6366F1', icon: '📰', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u9-L1', title: 'Anatomy of a Study', description: 'The key sections of a published research paper.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec14-u9-L2', title: 'Spotting Bad Research', description: 'Red flags that indicate a study may not be trustworthy.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u9-L3', title: 'The Replication Crisis', description: 'Why many famous findings failed to hold up when retested.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u9-L4', title: 'Effect Sizes', description: 'Why the size of an effect matters more than whether it is statistically significant.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec14-u9-L5', title: 'Evaluating a News Story About Research', description: 'Practice critically analyzing a media report about a psychology study.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec14-u10', title: 'Section 14 Review',
    description: 'Bring together everything you have learned about research methods in psychology.',
    color: '#8B5CF6', icon: '🏆', sectionIndex: 13, sectionTitle: 'Research Methods',
    lessons: [
      { id: 'psy-sec14-u10-L1', title: 'Comprehensive Review', description: 'Test your knowledge across all research methods topics.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec14-u10-L2', title: 'Research Method Scenarios', description: 'Apply everything you know to complex research situations.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec14-u10-L3', title: 'Your Research Advisor', description: 'A professor asks you to evaluate and improve a flawed study proposal.', icon: '💬', type: 'conversation', xpReward: 35, questions: [] },
      { id: 'psy-sec14-u10-L4', title: 'Research Methods Speed Round', description: 'Rapid recall of all research methods concepts.', icon: '⚡', type: 'speed-round', xpReward: 35, questions: [] },
    ],
  },


  // ── Section 15: Influence & Dark Patterns (11 units from section-15-capstone-part1 and part2) ──

  {
    id: 'psy-sec15-u1',
    title: 'Advertising and Emotional Manipulation',
    description: 'How advertisers use psychological principles to shape your decisions.',
    color: '#EF4444',
    icon: '📺',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u1-L1', title: 'Emotional Appeals in Advertising', description: 'How ads bypass rational thinking by triggering feelings.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec15-u1-L2', title: 'Scarcity and Urgency Tactics', description: 'Why "limited time" and "only 3 left" make you buy faster.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u1-L3', title: 'Social Proof in Advertising', description: 'How ads use other people\'s behavior to influence yours.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u1-L4', title: 'Targeting Psychological Vulnerabilities', description: 'How ads exploit insecurity, identity, and cognitive biases.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u1-L5', title: 'Analyzing Ads Together', description: 'Practice identifying manipulation tactics in real-world advertising.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u2',
    title: 'Social Media and Attention Hijacking',
    description: 'How platforms are designed to capture and hold your attention.',
    color: '#3B82F6',
    icon: '📱',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u2-L1', title: 'Dopamine Loops and Variable Rewards', description: 'Why you keep checking your phone even when nothing new is there.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec15-u2-L2', title: 'Infinite Scroll and Time Distortion', description: 'How bottomless feeds steal hours you did not intend to spend.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u2-L3', title: 'Social Comparison and Self-Esteem', description: 'Why social media makes you feel worse about your own life.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u2-L4', title: 'FOMO, Outrage, and Engagement Traps', description: 'How platforms profit from your fear and anger.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u2-L5', title: 'Social Media Tactics Speed Round', description: 'Rapid recall of attention hijacking tactics and defenses.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u3',
    title: 'Propaganda and Political Persuasion',
    description: 'How political messaging uses psychology to shape public opinion.',
    color: '#10B981',
    icon: '📢',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u3-L1', title: 'Classic Propaganda Techniques', description: 'The time-tested methods used to shape public opinion.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec15-u3-L2', title: 'Emotional vs Rational Persuasion', description: 'Why emotional political messages outperform logical ones.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u3-L3', title: 'Group Polarization and Echo Chambers', description: 'How groups push people to more extreme positions.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u3-L4', title: 'Spotting Political Manipulation', description: 'Practical tools for identifying manipulation in political messaging.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u3-L5', title: 'Recognizing Propaganda in Action', description: 'Practice identifying propaganda techniques in real situations.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u4',
    title: 'Review: Manipulation Tactics',
    description: 'Prove your mastery of advertising, social media, and propaganda psychology.',
    color: '#8B5CF6',
    icon: '🔄',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u4-L1', title: 'Manipulation Tactics Review', description: 'Test your knowledge across advertising, social media, and propaganda.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u4-L2', title: 'Manipulation in Everyday Life', description: 'Apply your knowledge to realistic everyday scenarios.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u4-L3', title: 'Manipulation Tactics Speed Round', description: 'Rapid recall of manipulation tactics from advertising, social media, and propaganda.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u5',
    title: 'Dark UX Patterns',
    description: 'How websites and apps use design to trick you into doing things you did not intend.',
    color: '#F59E0B',
    icon: '🖥️',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u5-L1', title: 'Confirmshaming and Guilt Trips', description: 'How websites make you feel bad for saying no.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec15-u5-L2', title: 'Hidden Fees and Drip Pricing', description: 'How prices magically increase between browsing and checkout.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u5-L3', title: 'Roach Motels and Forced Continuity', description: 'Why it is easy to sign up but nearly impossible to cancel.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u5-L4', title: 'Misdirection and Visual Tricks', description: 'How design hides the option you actually want.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u5-L5', title: 'Spotting Dark Patterns Together', description: 'Practice identifying dark UX patterns in everyday websites and apps.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u6',
    title: 'Cults and Radicalization',
    description: 'How groups use psychological tactics to control members and radicalize recruits.',
    color: '#EC4899',
    icon: '⚠️',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u6-L1', title: 'Cult Tactics and the BITE Model', description: 'The four types of control that define a cult.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec15-u6-L2', title: 'The Radicalization Pipeline', description: 'How gradual steps lead people from curiosity to extremism.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u6-L3', title: 'Love Bombing and Manipulation', description: 'How overwhelming attention is used to control new recruits.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u6-L4', title: 'Deradicalization and Recovery', description: 'How people leave extremist groups and rebuild their lives.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u6-L5', title: 'Cult Awareness Speed Round', description: 'Rapid recall of cult tactics, radicalization, and deradicalization concepts.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u7',
    title: 'Building Your Psychological Defense',
    description: 'Develop practical tools to protect yourself from manipulation.',
    color: '#14B8A6',
    icon: '🛡️',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u7-L1', title: 'Your Critical Thinking Toolkit', description: 'The core skills that protect you from manipulation.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec15-u7-L2', title: 'Emotional Regulation as Defense', description: 'Managing your emotions so they cannot be used against you.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u7-L3', title: 'Media Literacy and Source Evaluation', description: 'How to evaluate information sources in the digital age.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u7-L4', title: 'Inoculation Against Manipulation', description: 'How small doses of manipulation build lasting resistance.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u7-L5', title: 'Building Defenses Together', description: 'Practice applying your full psychological defense toolkit.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u8',
    title: 'Cross-Cultural Psychology',
    description: 'How culture shapes the way people think, feel, and behave.',
    color: '#F97316',
    icon: '🌍',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u8-L1', title: 'Cultural Dimensions', description: 'How cultures differ on key psychological dimensions.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'psy-sec15-u8-L2', title: 'The WEIRD Problem in Psychology', description: 'Why most psychology research may not apply to most humans.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u8-L3', title: 'Universal vs Culture-Specific Phenomena', description: 'Which psychological findings hold true everywhere and which vary by culture.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u8-L4', title: 'Cross-Cultural Communication', description: 'How cultural differences affect understanding and misunderstanding.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u8-L5', title: 'Cross-Cultural Psychology Speed Round', description: 'Rapid recall of cross-cultural psychology concepts.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u9',
    title: 'Famous Experiments: Full Analysis',
    description: 'Critically examine psychology\'s most influential and controversial experiments.',
    color: '#6366F1',
    icon: '🔬',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u9-L1', title: 'Stanford Prison Experiment Revisited', description: 'A critical look at one of psychology\'s most famous studies.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u9-L2', title: 'Milgram Obedience Study Revisited', description: 'Reexamining what the obedience experiments actually proved.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u9-L3', title: 'The Marshmallow Test Reexamined', description: 'Why the famous delayed gratification study may be wrong.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'psy-sec15-u9-L4', title: 'Rosenhan: Being Sane in Insane Places', description: 'The study that questioned whether psychiatry can tell sane from insane.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u9-L5', title: 'Debating Famous Experiments', description: 'Discuss the value and limitations of psychology\'s most famous studies.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u10',
    title: 'Review: Advanced Topics',
    description: 'Prove your mastery of cults, defenses, culture, and famous experiments.',
    color: '#8B5CF6',
    icon: '🔄',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u10-L1', title: 'Advanced Topics Review', description: 'Test your knowledge across cults, defenses, culture, and experiments.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u10-L2', title: 'Advanced Scenario Analysis', description: 'Apply advanced concepts to complex real-world scenarios.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u10-L3', title: 'Advanced Topics Speed Round', description: 'Rapid recall across cults, defenses, culture, and famous experiments.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'psy-sec15-u11',
    title: 'Psychology Capstone: Comprehensive Challenge',
    description: 'The ultimate test of everything you\'ve learned across the entire course.',
    color: '#FBBF24',
    icon: '🏆',
    sectionIndex: 14,
    sectionTitle: 'Influence & Dark Patterns',
    lessons: [
      { id: 'psy-sec15-u11-L1', title: 'Biases Meet Social Psychology', description: 'Combine cognitive biases with social influence for deeper analysis.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u11-L2', title: 'Personality, Clinical, and Development', description: 'Connect personality theory with mental health and developmental psychology.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u11-L3', title: 'Research Methods Meet Everything', description: 'Apply research methodology to evaluate claims from every section.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'psy-sec15-u11-L4', title: 'The Complete Psychology Interview', description: 'Apply knowledge from every section in a comprehensive case analysis.', icon: '💬', type: 'conversation', xpReward: 35, questions: [] },
      { id: 'psy-sec15-u11-L5', title: 'Psychology Capstone Speed Round', description: 'The final challenge: rapid recall spanning every section of the course.', icon: '⚡', type: 'speed-round', xpReward: 35, questions: [] },
    ],
  },
];
