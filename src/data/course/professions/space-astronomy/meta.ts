import type { Unit } from '../../types';

export const spaceCourseMeta: Unit[] = [
  // ── Unit 1: Look Up! ──
  {
    id: "sp-u1-night-sky",
    title: "Look Up!",
    description: "The night sky basics: constellations, planets visible to the naked eye, and how to start stargazing.",
    color: "#818CF8",
    icon: "🌟",
    lessons: [
      { id: "sp-u1-L1", title: "Welcome to the Universe", description: "You're on a tiny rock hurtling through space at 67,000 mph. Let's explore.", icon: "🌍", xpReward: 10, questions: [] },
      { id: "sp-u1-L2", title: "Stars, Planets & Satellites", description: "That bright dot in the sky: how to tell if it's a star, a planet, or the ISS.", icon: "✨", xpReward: 10, questions: [] },
      { id: "sp-u1-L3", title: "Constellations & Star Maps", description: "Orion, Ursa Major, the Southern Cross. Ancient patterns we still use today.", icon: "🗺️", xpReward: 15, questions: [] },
      { id: "sp-u1-L4", title: "Light-Years & Cosmic Distances", description: "When you look at a star, you're looking back in time. Here's why.", icon: "📏", xpReward: 15, questions: [] },
      { id: "sp-u1-L5", title: "Your First Stargazing Session", description: "What to look for tonight, no telescope needed.", icon: "🔭", xpReward: 15, questions: [] },
      { id: "sp-u1-L6", title: "Stargazing with a Friend", description: "Help a friend identify objects in the night sky.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u1-L7", title: "Night Sky Speed Round", description: "Race the clock on stars, planets, constellations, and light-years.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 2: Our Solar System ──
  {
    id: "sp-u2-solar-system",
    title: "Our Solar System",
    description: "The Sun, eight planets, dwarf planets, moons, and the debris in between.",
    color: "#F59E0B",
    icon: "☀️",
    lessons: [
      { id: "sp-u2-L1", title: "The Sun: Our Star", description: "A giant nuclear reactor 93 million miles away that makes life possible.", icon: "☀️", xpReward: 10, questions: [] },
      { id: "sp-u2-L2", title: "Rocky Planets: Mercury to Mars", description: "Small, dense, and close to the Sun. The four inner worlds.", icon: "🪨", xpReward: 15, questions: [] },
      { id: "sp-u2-L3", title: "Gas Giants: Jupiter & Saturn", description: "Massive, ringed, and full of storms. The solar system's heavyweights.", icon: "🪐", xpReward: 15, questions: [] },
      { id: "sp-u2-L4", title: "Ice Giants: Uranus & Neptune", description: "The cold, distant worlds we've only visited once.", icon: "🧊", xpReward: 15, questions: [] },
      { id: "sp-u2-L5", title: "Dwarf Planets & the Asteroid Belt", description: "Pluto, Ceres, Eris, and the billions of rocks between Mars and Jupiter.", icon: "💎", xpReward: 15, questions: [] },
      { id: "sp-u2-L6", title: "Moons of the Solar System", description: "Europa's hidden ocean, Titan's thick atmosphere, and Io's volcanoes.", icon: "🌙", xpReward: 20, questions: [] },
      { id: "sp-u2-L7", title: "Solar System Explorer Chat", description: "Help a friend plan which planet to research for a school project.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u2-L8", title: "Solar System Speed Round", description: "Race the clock on planets, moons, and solar system facts.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 3: Earth & Moon ──
  {
    id: "sp-u3-earth-moon",
    title: "Earth & Moon",
    description: "Tides, eclipses, seasons, and the relationship between our planet and its only natural satellite.",
    color: "#3B82F6",
    icon: "🌎",
    lessons: [
      { id: "sp-u3-L1", title: "Why We Have Seasons", description: "It's not because we're closer to the Sun in summer. The real reason.", icon: "🍂", xpReward: 10, questions: [] },
      { id: "sp-u3-L2", title: "The Moon's Phases", description: "New, crescent, quarter, gibbous, full. What causes each phase.", icon: "🌓", xpReward: 15, questions: [] },
      { id: "sp-u3-L3", title: "Eclipses: Solar & Lunar", description: "When the Sun, Earth, and Moon line up perfectly. A cosmic coincidence.", icon: "🌑", xpReward: 15, questions: [] },
      { id: "sp-u3-L4", title: "Tides & Gravity", description: "The Moon pulls our oceans. Two high tides a day, and here's why.", icon: "🌊", xpReward: 15, questions: [] },
      { id: "sp-u3-L5", title: "Earth's Magnetic Field & Auroras", description: "The invisible shield protecting you from solar radiation, and the light show it creates.", icon: "🌌", xpReward: 20, questions: [] },
      { id: "sp-u3-L6", title: "Explaining Eclipses", description: "Help explain an upcoming eclipse to someone who's never seen one.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u3-L7", title: "Earth & Moon Speed Round", description: "Race the clock on seasons, phases, eclipses, tides, and auroras.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 4: The Sun & Stars ──
  {
    id: "sp-u4-stars",
    title: "The Sun & Stars",
    description: "How stars are born, how they shine, and the spectacular ways they die.",
    color: "#EF4444",
    icon: "⭐",
    lessons: [
      { id: "sp-u4-L0", title: "From Our Star to All Stars", description: "You know the Sun. Now meet the billions of stars beyond it.", icon: "🌉", xpReward: 10, questions: [] },
      { id: "sp-u4-L1", title: "How Stars Are Born", description: "Gravity pulls gas together, temperature rises, and nuclear fusion ignites.", icon: "👶", xpReward: 15, questions: [] },
      { id: "sp-u4-L2", title: "Star Colors & Temperature", description: "Red stars are cool, blue stars are scorching. Color tells you everything.", icon: "🌈", xpReward: 15, questions: [] },
      { id: "sp-u4-L3", title: "The HR Diagram", description: "The single most important chart in astronomy. Main sequence, giants, dwarfs.", icon: "📊", xpReward: 20, questions: [] },
      { id: "sp-u4-L4", title: "How Stars Die", description: "Red giants, white dwarfs, supernovae, neutron stars. Size determines fate.", icon: "💥", xpReward: 20, questions: [] },
      { id: "sp-u4-L5", title: "Pulsars & Neutron Stars", description: "A teaspoon weighs a billion tons. The densest objects that aren't black holes.", icon: "💫", xpReward: 20, questions: [] },
      { id: "sp-u4-L6", title: "Stargazing with a Friend", description: "Help a friend understand the stars they're looking at.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u4-L7", title: "Stars Blitz", description: "Race through everything you've learned about stars.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 5: Rockets & Orbits ──
  {
    id: "sp-u5-rockets",
    title: "Rockets & Orbits",
    description: "How rockets work, what keeps satellites up, and the physics of getting to space.",
    color: "#F97316",
    icon: "🚀",
    lessons: [
      { id: "sp-u5-L0", title: "From Stars to Spacecraft", description: "You've studied the stars. Now let's figure out how to reach them.", icon: "🌉", xpReward: 10, questions: [] },
      { id: "sp-u5-L1", title: "Newton's Third Law & Rockets", description: "Every action has an equal and opposite reaction. That's how rockets fly.", icon: "🚀", xpReward: 15, questions: [] },
      { id: "sp-u5-L2", title: "Escape Velocity", description: "How fast you need to go to leave Earth: 11.2 km/s. No shortcuts.", icon: "💨", xpReward: 15, questions: [] },
      { id: "sp-u5-L3", title: "Orbits & Gravity", description: "Satellites are falling around the Earth. That's what an orbit is.", icon: "🛰️", xpReward: 15, questions: [] },
      { id: "sp-u5-L4", title: "Types of Orbits", description: "LEO, GEO, polar, Molniya. Different heights for different missions.", icon: "🌐", xpReward: 20, questions: [] },
      { id: "sp-u5-L5", title: "Rocket Fuel & Staging", description: "Why rockets drop pieces of themselves on the way up.", icon: "🔥", xpReward: 15, questions: [] },
      { id: "sp-u5-L6", title: "Landing Rockets: The SpaceX Revolution", description: "How reusable rockets changed the economics of space forever.", icon: "🎯", xpReward: 20, questions: [] },
      { id: "sp-u5-L7", title: "Mission Control Chat", description: "Help plan a satellite launch by choosing the right orbit and rocket.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u5-L8", title: "Rockets & Orbits Blitz", description: "Race through rocket science, orbital mechanics, and launch facts.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 6: Space Exploration ──
  {
    id: "sp-u6-exploration",
    title: "Space Exploration",
    description: "From Sputnik to the ISS, Voyager to Mars rovers. Humanity's greatest adventure.",
    color: "#14B8A6",
    icon: "🛸",
    lessons: [
      { id: "sp-u6-L0", title: "We Built the Rockets. Now Where Did We Go?", description: "From learning how rockets work to the missions they made possible.", icon: "🌉", xpReward: 10, questions: [] },
      { id: "sp-u6-L1", title: "The Space Race", description: "USA vs USSR: Sputnik, Gagarin, Apollo. The competition that launched an era.", icon: "🏁", xpReward: 15, questions: [] },
      { id: "sp-u6-L2", title: "Apollo: Walking on the Moon", description: "12 humans walked on another world. The engineering, the risks, the legacy.", icon: "👨‍🚀", xpReward: 15, questions: [] },
      { id: "sp-u6-L3", title: "The International Space Station", description: "A football-field-sized lab orbiting at 17,500 mph. 24 years of science.", icon: "🏠", xpReward: 15, questions: [] },
      { id: "sp-u6-L4", title: "Mars Rovers & Landers", description: "Curiosity, Perseverance, Ingenuity. Driving robots on another planet.", icon: "🤖", xpReward: 15, questions: [] },
      { id: "sp-u6-L5", title: "Voyager: The Farthest Journey", description: "Launched in 1977, still transmitting from interstellar space. 15 billion miles out.", icon: "📡", xpReward: 20, questions: [] },
      { id: "sp-u6-L6", title: "Telescopes: Hubble to JWST", description: "How space telescopes see the invisible and look back in time.", icon: "🔭", xpReward: 20, questions: [] },
      { id: "sp-u6-L7", title: "Space Museum Guide", description: "Help a visitor understand the greatest space missions in history.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u6-L8", title: "Space Exploration Blitz", description: "Race through the greatest moments in space exploration history.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 7: Exoplanets & Alien Life ──
  {
    id: "sp-u7-exoplanets",
    title: "Exoplanets & Alien Life",
    description: "Planets beyond our solar system, habitable zones, and the search for life out there.",
    color: "#8B5CF6",
    icon: "👽",
    lessons: [
      { id: "sp-u7-L1", title: "What Are Exoplanets?", description: "Planets orbiting other stars. We've found over 5,000 so far.", icon: "🪐", xpReward: 15, questions: [] },
      { id: "sp-u7-L2", title: "How We Find Them", description: "Transit method, radial velocity, direct imaging. Detecting worlds we can't see.", icon: "🔍", xpReward: 15, questions: [] },
      { id: "sp-u7-L3", title: "The Habitable Zone", description: "The 'Goldilocks zone' where water can exist as a liquid. Not too hot, not too cold.", icon: "🌡️", xpReward: 15, questions: [] },
      { id: "sp-u7-L4", title: "Types of Exoplanets", description: "Hot Jupiters, super-Earths, rogue planets. Worlds stranger than fiction.", icon: "🌍", xpReward: 15, questions: [] },
      { id: "sp-u7-L5", title: "The Drake Equation", description: "A famous formula for estimating how many civilizations might be out there.", icon: "🔢", xpReward: 20, questions: [] },
      { id: "sp-u7-L6", title: "Biosignatures & SETI", description: "What would alien life look like? What signals are we searching for?", icon: "📻", xpReward: 20, questions: [] },
      { id: "sp-u7-L7", title: "Exoplanet Explorers", description: "Help a fellow space enthusiast understand the search for alien worlds.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u7-L8", title: "Exoplanet Speed Round", description: "Race the clock on exoplanets, habitable zones, and the search for life.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 8: Galaxies & Black Holes ──
  {
    id: "sp-u8-galaxies",
    title: "Galaxies & Black Holes",
    description: "The Milky Way, galaxy collisions, and the most extreme objects in the universe.",
    color: "#6366F1",
    icon: "🌀",
    lessons: [
      { id: "sp-u8-L1", title: "The Milky Way: Our Home Galaxy", description: "200 billion stars, a supermassive black hole at the center, and you are here.", icon: "🌌", xpReward: 15, questions: [] },
      { id: "sp-u8-L2", title: "Types of Galaxies", description: "Spirals, ellipticals, irregulars. How galaxies are classified.", icon: "🔮", xpReward: 15, questions: [] },
      { id: "sp-u8-L3", title: "Galaxy Collisions", description: "Andromeda is heading our way at 110 km/s. What happens when galaxies merge.", icon: "💥", xpReward: 15, questions: [] },
      { id: "sp-u8-L4", title: "What Is a Black Hole?", description: "A region where gravity is so strong that nothing, not even light, can escape.", icon: "🕳️", xpReward: 20, questions: [] },
      { id: "sp-u8-L5", title: "Event Horizons & Spaghettification", description: "Cross the line and you're gone. What happens as you fall into a black hole.", icon: "🍝", xpReward: 20, questions: [] },
      { id: "sp-u8-L6", title: "Supermassive Black Holes & Quasars", description: "Millions to billions of solar masses. The engines at the heart of galaxies.", icon: "⚡", xpReward: 20, questions: [] },
      { id: "sp-u8-L7", title: "Galaxy Chat", description: "Discuss galaxies and black holes with a curious friend.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u8-L8", title: "Galaxies & Black Holes Speed Round", description: "Race the clock on galaxies, black holes, and the most extreme objects in space.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 9: The Universe ──
  {
    id: "sp-u9-universe",
    title: "The Universe",
    description: "The Big Bang, dark matter, dark energy, and the ultimate fate of everything.",
    color: "#EC4899",
    icon: "🌌",
    lessons: [
      { id: "sp-u9-L1", title: "The Big Bang", description: "13.8 billion years ago, everything began from an infinitely dense point.", icon: "💥", xpReward: 15, questions: [] },
      { id: "sp-u9-L2", title: "Cosmic Microwave Background", description: "The oldest light in the universe. A baby photo from 380,000 years after the Big Bang.", icon: "📡", xpReward: 20, questions: [] },
      { id: "sp-u9-L3", title: "Dark Matter", description: "27% of the universe is made of something we can't see. We know it's there.", icon: "🔮", xpReward: 20, questions: [] },
      { id: "sp-u9-L4", title: "Dark Energy & Expansion", description: "The universe is expanding faster and faster. Something mysterious is pushing it apart.", icon: "💨", xpReward: 20, questions: [] },
      { id: "sp-u9-L5", title: "The Fate of the Universe", description: "Big Freeze, Big Crunch, or Big Rip? How does everything end?", icon: "🔮", xpReward: 20, questions: [] },
      { id: "sp-u9-L6", title: "Cosmic Questions", description: "Tackle the universe's biggest mysteries in conversation.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u9-L7", title: "Universe Speed Round", description: "Race the clock on the Big Bang, dark matter, dark energy, and the fate of everything.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },

  // ── Unit 10: Space Frontiers ──
  {
    id: "sp-u10-frontiers",
    title: "Space Frontiers",
    description: "The cutting edge: Moon bases, Mars colonization, space tourism, and what comes next.",
    color: "#10B981",
    icon: "🏗️",
    lessons: [
      { id: "sp-u10-L1", title: "Artemis: Return to the Moon", description: "NASA's plan to put humans back on the Moon, this time to stay.", icon: "🌙", xpReward: 15, questions: [] },
      { id: "sp-u10-L2", title: "Mars Colonization", description: "What it would take to live on Mars: air, water, radiation, and psychology.", icon: "🔴", xpReward: 15, questions: [] },
      { id: "sp-u10-L3", title: "Space Tourism", description: "Blue Origin, Virgin Galactic, SpaceX. Space is opening up to civilians.", icon: "🎟️", xpReward: 15, questions: [] },
      { id: "sp-u10-L4", title: "Space Mining & Resources", description: "Asteroids contain trillions of dollars in metals. How do we get them?", icon: "⛏️", xpReward: 15, questions: [] },
      { id: "sp-u10-L5", title: "Interstellar Travel", description: "Light sails, generation ships, warp drives. Can we ever reach another star?", icon: "🌟", xpReward: 20, questions: [] },
      { id: "sp-u10-L6", title: "The Fermi Paradox", description: "If the universe is so big, where is everyone? The great silence.", icon: "🤫", xpReward: 20, questions: [] },
      { id: "sp-u10-L7", title: "Space Frontiers Chat", description: "Debate the future of space exploration with a fellow enthusiast.", icon: "💬", type: "conversation", xpReward: 20, questions: [] },
      { id: "sp-u10-L8", title: "Space Frontiers Speed Round", description: "Race the clock on Artemis, Mars, space tourism, mining, and the Fermi Paradox.", icon: "⚡", type: "speed-round", xpReward: 20, questions: [] },
    ],
  },
];
