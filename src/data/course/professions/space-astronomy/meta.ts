import type { Unit } from '../../types';

export const spaceCourseMeta: Unit[] = [

  // ── Section 1: Looking Up (8 units from section-1-lookingup-part1 and part2) ──
  {
    id: "sp-sec1-u1",
    title: "Welcome to the Universe",
    description: "Discover where you are in space and why the night sky is one of the greatest shows on Earth.",
    color: "#818CF8",
    icon: "🌌",
    sectionIndex: 1,
    sectionTitle: "Looking Up",
    lessons: [
      { id: "sp-sec1-u1-L1", title: "You Are Here", description: "Your address in the universe, from your street to the edge of the observable cosmos.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec1-u1-L2", title: "What's Out There", description: "The basic types of objects you can spot in the night sky and what makes each one different.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec1-u1-L3", title: "Light Pollution and Dark Skies", description: "Why city lights hide the stars and how to find better views of the night sky.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u1-L4", title: "The Scale of It All", description: "Get a feel for how enormous the universe really is, from Earth to the edge of what we can observe.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "sp-sec1-u2",
    title: "Stars, Planets, and Satellites by Eye",
    description: "Learn to tell the difference between stars, planets, and human-made satellites without any equipment.",
    color: "#A78BFA",
    icon: "⭐",
    sectionIndex: 1,
    sectionTitle: "Looking Up",
    lessons: [
      { id: "sp-sec1-u2-L1", title: "How Stars Behave in the Sky", description: "Why stars twinkle, why they come in different colors, and how to spot the brightest ones.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec1-u2-L2", title: "Spotting Planets with Your Eyes", description: "How to tell a planet from a star without a telescope, and which planets are easiest to find.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u2-L3", title: "Satellites and the ISS", description: "How to spot human-made objects in orbit, including the International Space Station.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u2-L4", title: "Telling Them All Apart", description: "A quick-reference guide to identifying stars, planets, satellites, meteors, and airplanes at a glance.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u2-L5", title: "Night Sky Safari", description: "Put everything together and plan your first real stargazing outing.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec1-u3",
    title: "Constellations and the Celestial Sphere",
    description: "Learn the star patterns that ancient cultures named and the imaginary sphere astronomers use to map the sky.",
    color: "#6366F1",
    icon: "✨",
    sectionIndex: 1,
    sectionTitle: "Looking Up",
    lessons: [
      { id: "sp-sec1-u3-L1", title: "What Are Constellations", description: "The patterns humans drew in the stars and why they still matter today.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec1-u3-L2", title: "Famous Constellations You Can Find Tonight", description: "The most recognizable star patterns and how to locate them in the sky.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u3-L3", title: "The Celestial Sphere", description: "The imaginary dome astronomers use to describe where objects are in the sky.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u3-L4", title: "Navigation by the Stars", description: "How ancient travelers and modern adventurers use stars to find their way.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec1-u3-L5", title: "Why the Sky Changes with the Seasons", description: "Why different constellations are visible at different times of year.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec1-u4",
    title: "Looking Up: Review",
    description: "Test your knowledge of the night sky, sky objects, constellations, and celestial navigation from Units 1 through 3.",
    color: "#7C3AED",
    icon: "🔄",
    sectionIndex: 1,
    sectionTitle: "Looking Up",
    lessons: [
      { id: "sp-sec1-u4-L1", title: "Universe and Sky Objects Review", description: "Review cosmic scales, stars, planets, satellites, and meteors.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u4-L2", title: "Constellations and Celestial Sphere Review", description: "Review constellation identification, the celestial sphere, and seasonal sky changes.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec1-u4-L3", title: "Looking Up: Full Challenge", description: "A tougher mix pulling from all three previous units to test your complete understanding.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec1-u5",
    title: "Cosmic Distances",
    description: "Learn the three distance units astronomers use: AU, light-year, and parsec.",
    color: "#818CF8",
    icon: "📏",
    sectionIndex: 1,
    sectionTitle: "Looking Up",
    lessons: [
      { id: "sp-sec1-u5-L1", title: "Why Miles Fall Short", description: "Ordinary distance units break down when space gets involved.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec1-u5-L2", title: "The Astronomical Unit", description: "The AU: astronomy's yardstick for measuring our solar system.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u5-L3", title: "What Is a Light-Year?", description: "The distance light travels in one year, and why it matters.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u5-L4", title: "Introducing the Parsec", description: "The distance unit professional astronomers love, built from geometry.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec1-u5-L5", title: "AU, Light-Year, and Parsec Together", description: "Compare the three cosmic rulers and know when to use each one.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec1-u6",
    title: "Your First Stargazing Session",
    description: "A practical, hands-on guide to seeing the night sky tonight, no equipment required.",
    color: "#818CF8",
    icon: "🔭",
    sectionIndex: 1,
    sectionTitle: "Looking Up",
    lessons: [
      { id: "sp-sec1-u6-L1", title: "Getting Ready to Stargaze", description: "What you need, what to wear, and when to go for the best sky views.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec1-u6-L2", title: "Finding a Dark Sky", description: "How light pollution works and where to escape it.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u6-L3", title: "Your First Objects in the Sky", description: "Start with the Moon, planets, and the brightest stars. Build from there.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u6-L4", title: "Using a Star App", description: "How phone apps can help you identify anything in the sky instantly.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u6-L5", title: "Your Stargazing Checklist", description: "A quick recap of everything you need for a successful night under the stars.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec1-u7",
    title: "Why Stars Rise and Set",
    description: "Understand why the sky seems to spin and how Earth's rotation creates the show.",
    color: "#818CF8",
    icon: "🌍",
    sectionIndex: 1,
    sectionTitle: "Looking Up",
    lessons: [
      { id: "sp-sec1-u7-L1", title: "Earth Spins, the Stars Stay Put", description: "Why it looks like the sky rotates when really it is Earth that spins.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec1-u7-L2", title: "The Pole Star and the Sky", description: "How Polaris marks the North Celestial Pole and why it barely moves.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u7-L3", title: "Stars That Never Set", description: "Some stars circle the pole all night and never dip below the horizon.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec1-u7-L4", title: "Why the Sky Changes with the Seasons", description: "How Earth's orbit causes different constellations to appear at different times of year.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec1-u7-L5", title: "The Sun's Path Across the Sky", description: "How the Sun moves through the sky during the day and why it changes with the seasons.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec1-u8",
    title: "Looking Up: Review and Checkpoint",
    description: "Test everything you've learned in Section 1, from constellations to cosmic distances to sky motion.",
    color: "#818CF8",
    icon: "🏁",
    sectionIndex: 1,
    sectionTitle: "Looking Up",
    lessons: [
      { id: "sp-sec1-u8-L1", title: "Distances and Scales Review", description: "Revisit AU, light-years, parsecs, and cosmic scales from Section 1.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec1-u8-L2", title: "Stargazing Skills Review", description: "Review practical stargazing skills, sky objects, and observation techniques.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec1-u8-L3", title: "Sky Motion Review", description: "Review Earth rotation, star trails, circumpolar stars, and seasonal changes.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec1-u8-L4", title: "Looking Up Speed Round", description: "15 rapid-fire questions covering everything from Section 1.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  // ── Section 2: The Solar System (Part 1, 5 units) ──
  {
    id: "sp-sec2-u1", title: "Our Cosmic Neighborhood",
    description: "Learn what the solar system is, how it formed, and the incredible scale of our Sun's family.",
    color: "#F59E0B", icon: "🌞", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u1-L1", title: "What the Solar System Is", description: "Meet the Sun's family of planets, moons, and smaller objects.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u1-L2", title: "The Sun as a Star", description: "Discover why the Sun is just a regular star that happens to be very close to us.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u1-L3", title: "Scale of the Solar System", description: "Understand just how vast the distances are between planets.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u1-L4", title: "How the Solar System Formed", description: "The story of how a cloud of gas and dust became our solar system.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u1-L5", title: "Solar System Conversation", description: "Help a curious friend understand the basics of our solar system.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec2-u2", title: "Rocky Planets: Mercury and Venus",
    description: "Explore the two planets closest to the Sun and discover why Venus is the hottest planet in the solar system.",
    color: "#EF4444", icon: "🪨", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u2-L1", title: "Mercury Up Close", description: "Meet the smallest, fastest planet in our solar system.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u2-L2", title: "Venus the Greenhouse Planet", description: "Explore the planet with crushing pressure and scorching temperatures.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u2-L3", title: "Comparing the Two", description: "See how Mercury and Venus differ in size, atmosphere, and temperature.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u2-L4", title: "Why Venus Is Hotter Than Mercury", description: "Dive deeper into the greenhouse effect and why distance from the Sun isn't everything.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u2-L5", title: "Rocky Planets Speed Round", description: "15 rapid-fire questions about Mercury and Venus.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec2-u3", title: "Earth and Mars",
    description: "Compare our home planet with the red planet and explore the search for water on Mars.",
    color: "#3B82F6", icon: "🌍", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u3-L1", title: "What Makes Earth Special", description: "Discover the features that make Earth the only known planet with life.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u3-L2", title: "Mars the Red Planet", description: "Explore the rust-colored world with the tallest volcano and deepest canyon in the solar system.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u3-L3", title: "Water on Mars", description: "Discover the evidence that Mars once had rivers, lakes, and possibly oceans.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u3-L4", title: "Mars Exploration", description: "Learn about the rovers, landers, and missions that have explored the red planet.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u3-L5", title: "Earth vs Mars Conversation", description: "Help a friend understand the key differences between Earth and Mars.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec2-u4", title: "Review: Inner Planets",
    description: "Test your knowledge of Mercury, Venus, Earth, and Mars with review questions, scenarios, and a speed round.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u4-L1", title: "Inner Planets Review", description: "Review key facts about all four rocky planets.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec2-u4-L2", title: "Inner Planets Scenarios", description: "Apply what you've learned to real-world scenarios about the inner planets.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec2-u4-L3", title: "Inner Planets Speed Round", description: "15 rapid-fire questions covering Mercury, Venus, Earth, and Mars.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec2-u5", title: "Gas Giants: Jupiter and Saturn",
    description: "Meet the two largest planets in the solar system and their incredible moons, rings, and storms.",
    color: "#FBBF24", icon: "🪐", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u5-L1", title: "Jupiter the King", description: "Explore the largest planet in the solar system and its famous storms.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u5-L2", title: "Saturn's Rings", description: "Discover the most spectacular ring system in the solar system.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u5-L3", title: "Moons of Jupiter and Saturn", description: "Meet the most fascinating moons orbiting the two gas giants.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u5-L4", title: "Gas Giant Weather", description: "Discover storms, winds, and weather systems on Jupiter and Saturn.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u5-L5", title: "Gas Giants Conversation", description: "Discuss Jupiter and Saturn with a curious friend.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  // ── Section 2: The Solar System (Part 2, 5 units) ──
  {
    id: "sp-sec2-u6", title: "Ice Giants: Uranus and Neptune",
    description: "Explore the two most distant planets in the solar system and discover what makes ice giants different from gas giants.",
    color: "#14B8A6", icon: "🧊", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u6-L1", title: "Uranus the Sideways Planet", description: "Meet the planet that rolls on its side as it orbits the Sun.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u6-L2", title: "Neptune the Windy World", description: "Discover the planet with the fastest winds in the solar system.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u6-L3", title: "Ice Giant Composition", description: "Learn what ice giants are made of and how they differ from gas giants.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u6-L4", title: "Moons of the Ice Giants", description: "Discover the unusual moons orbiting Uranus and Neptune.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u6-L5", title: "Ice Giants Speed Round", description: "15 rapid-fire questions about Uranus and Neptune.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec2-u7", title: "Dwarf Planets and the Kuiper Belt",
    description: "Explore the icy worlds beyond Neptune, including Pluto, and discover the vast Kuiper Belt.",
    color: "#EC4899", icon: "⭐", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u7-L1", title: "What Dwarf Planets Are", description: "Learn the definition of a dwarf planet and why it matters.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u7-L2", title: "Pluto's Story", description: "From planet to dwarf planet, and the New Horizons mission that revealed its secrets.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u7-L3", title: "Eris and Makemake", description: "Meet the other dwarf planets lurking in the outer solar system.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u7-L4", title: "The Kuiper Belt", description: "Explore the vast ring of icy objects beyond Neptune's orbit.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u7-L5", title: "Dwarf Planets Conversation", description: "Discuss Pluto's reclassification and the outer solar system with a friend.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec2-u8", title: "Asteroids, Comets, and Meteors",
    description: "Learn about the space rocks, icy wanderers, and fiery streaks that share our solar system.",
    color: "#F97316", icon: "☄️", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u8-L1", title: "The Asteroid Belt", description: "Explore the rocky debris field between Mars and Jupiter.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u8-L2", title: "Comets and Their Tails", description: "Learn what comets are and why they develop spectacular tails.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u8-L3", title: "Meteors vs Meteorites", description: "Learn the difference between meteors, meteoroids, and meteorites.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u8-L4", title: "Impact Threats", description: "Learn how scientists track dangerous asteroids and what could be done about them.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u8-L5", title: "Space Rocks Speed Round", description: "15 rapid-fire questions about asteroids, comets, and meteors.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec2-u9", title: "Moons of the Solar System",
    description: "Explore the most fascinating moons in the solar system, from our own Moon to the volcanic Io.",
    color: "#6366F1", icon: "🌙", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u9-L1", title: "Earth's Moon Recap", description: "Review what makes our Moon special and how it affects life on Earth.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u9-L2", title: "Europa and Enceladus", description: "Explore the two ocean moons that might harbor life.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u9-L3", title: "Titan", description: "Explore the only moon with a thick atmosphere and liquid on its surface.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec2-u9-L4", title: "Io", description: "Visit the most volcanically active world in the solar system.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec2-u9-L5", title: "Moon Exploration Conversation", description: "Discuss which moons we should explore next and why.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec2-u10", title: "Section 2 Review",
    description: "Test everything you've learned about the solar system, from the Sun to the Kuiper Belt.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 2, sectionTitle: "The Solar System",
    lessons: [
      { id: "sp-sec2-u10-L1", title: "Comprehensive Review", description: "Review key facts from every unit in Section 2.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec2-u10-L2", title: "Solar System Scenarios", description: "Apply your knowledge to challenging scenarios across the entire solar system.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec2-u10-L3", title: "Space Guide Conversation", description: "Act as a space guide for someone learning about the solar system for the first time.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
      { id: "sp-sec2-u10-L4", title: "Section 2 Speed Round", description: "15 rapid-fire questions covering everything from Section 2.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  // ── Section 3: Earth & Moon (Part 1, 5 units) ──
  {
    id: "sp-sec3-u1", title: "Why Earth Has Seasons",
    description: "Discover why we have summer and winter, and why it has nothing to do with Earth's distance from the Sun.",
    color: "#F59E0B", icon: "🌎", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u1-L1", title: "Axial Tilt", description: "Earth's tilt is the real reason we have seasons.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u1-L2", title: "Solstices and Equinoxes", description: "The four key moments in Earth's yearly orbit around the Sun.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u1-L3", title: "Why Southern Seasons Are Opposite", description: "When it's summer in New York, it's winter in Sydney. Here's why.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u1-L4", title: "Seasons Misconceptions", description: "Bust the most common myths about why seasons happen.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec3-u1-L5", title: "Explaining Seasons", description: "Help a curious friend understand why seasons happen.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec3-u2", title: "The Moon: Our Nearest Neighbor",
    description: "Meet the only world humans have visited beyond Earth, from how it formed to what its surface looks like.",
    color: "#C0C0C0", icon: "🌕", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u2-L1", title: "Moon Basics", description: "Size, distance, and what makes the Moon special.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u2-L2", title: "How the Moon Formed", description: "The dramatic collision that created our Moon billions of years ago.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u2-L3", title: "Lunar Surface Features", description: "Craters, maria, and highlands: what you see when you look at the Moon.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u2-L4", title: "Moon Facts and Myths", description: "Separate what's real from what's made up about our Moon.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec3-u2-L5", title: "Moon Speed Round", description: "Race the clock on everything about our Moon.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec3-u3", title: "Moon Phases",
    description: "Understand why the Moon appears to change shape throughout the month and learn all eight phases.",
    color: "#3B82F6", icon: "🌗", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u3-L1", title: "Why the Moon Changes Shape", description: "The Moon doesn't actually change. Our view of its sunlit side does.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u3-L2", title: "The 8 Phases", description: "Learn the names and order of all eight Moon phases.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec3-u3-L3", title: "Waxing vs Waning", description: "Learn to tell whether the Moon is growing or shrinking in the sky.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u3-L4", title: "The Synodic Month", description: "Why the phase cycle takes 29.5 days instead of the Moon's 27.3-day orbit.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec3-u3-L5", title: "Explaining Moon Phases", description: "Help someone understand why the Moon changes shape each month.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec3-u4", title: "Review: Earth and Moon Basics",
    description: "Test what you've learned about seasons, the Moon, and lunar phases.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u4-L1", title: "Earth & Moon Review", description: "Review seasons, Moon formation, phases, and surface features.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec3-u4-L2", title: "Earth & Moon Scenarios", description: "Apply what you've learned to real-world situations.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec3-u4-L3", title: "Earth & Moon Speed Round", description: "Race the clock on seasons, Moon facts, and lunar phases.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec3-u5", title: "Tides",
    description: "Discover how the Moon and Sun pull on Earth's oceans to create the daily rise and fall of tides.",
    color: "#14B8A6", icon: "🌊", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u5-L1", title: "What Causes Tides", description: "How the Moon's gravity creates two bulges of water on Earth.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u5-L2", title: "Spring and Neap Tides", description: "When the Sun and Moon team up or work against each other.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u5-L3", title: "Tidal Locking", description: "How tides slowed the Moon's rotation and always show us the same face.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec3-u5-L4", title: "Tides Around the World", description: "Why tidal ranges vary dramatically depending on where you are.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u5-L5", title: "Explaining Tides", description: "Help a beachgoer understand why the ocean rises and falls.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  // ── Section 3: Earth & Moon (Part 2, 5 units) ──
  {
    id: "sp-sec3-u6", title: "Eclipses",
    description: "Learn how the Sun, Moon, and Earth line up to create the most dramatic events in the sky.",
    color: "#1E1B4B", icon: "🌑", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u6-L1", title: "Solar Eclipses", description: "When the Moon passes between Earth and the Sun, blocking out daylight.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u6-L2", title: "Lunar Eclipses", description: "When Earth's shadow falls on the Moon and turns it red.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u6-L3", title: "Why Eclipses Are Rare", description: "If eclipses need new/full moons, why don't they happen every month?", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec3-u6-L4", title: "Eclipse Safety", description: "How to safely watch solar eclipses and protect your eyes.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u6-L5", title: "Eclipse Speed Round", description: "Race the clock on everything about solar and lunar eclipses.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec3-u7", title: "Earth's Atmosphere and Magnetic Field",
    description: "Explore the invisible shields that make life on Earth possible.",
    color: "#10B981", icon: "🛡️", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u7-L1", title: "Atmosphere Layers", description: "Earth's atmosphere has five main layers, each with a different job.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u7-L2", title: "The Greenhouse Effect", description: "How certain gases trap heat and keep Earth warm enough for life.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u7-L3", title: "The Ozone Layer", description: "The thin shield that blocks most of the Sun's harmful ultraviolet radiation.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u7-L4", title: "The Magnetosphere", description: "Earth's magnetic field deflects solar wind and makes auroras glow.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec3-u7-L5", title: "Explaining Earth's Shields", description: "Help someone understand why Earth is protected and Mars isn't.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec3-u8", title: "Earth in Space",
    description: "Understand Earth's orbit, long-term cycles, and our place in the solar system.",
    color: "#EC4899", icon: "🌐", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u8-L1", title: "Earth's Orbit", description: "How Earth moves around the Sun and what that journey looks like.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u8-L2", title: "Precession and Milankovitch Cycles", description: "Earth wobbles like a spinning top, and that wobble changes climate over millennia.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec3-u8-L3", title: "Earth's Place in the Solar System", description: "Why Earth is perfectly positioned for life in our solar system.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u8-L4", title: "Earth in Space Speed Round", description: "Race the clock on Earth's orbit, Milankovitch cycles, and the habitable zone.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec3-u9", title: "The Moon and Space Exploration",
    description: "From the Apollo missions to Artemis, explore humanity's journey to the Moon and back.",
    color: "#F97316", icon: "🚀", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u9-L1", title: "Apollo Missions", description: "The historic program that put humans on the Moon for the first time.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u9-L2", title: "Lunar Samples", description: "What the 382 kg of Moon rocks told us about the Moon and Earth.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u9-L3", title: "Modern Moon Missions", description: "Robotic spacecraft from many countries have rediscovered the Moon.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec3-u9-L4", title: "The Artemis Program", description: "NASA's plan to return humans to the Moon and build a permanent presence.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec3-u9-L5", title: "Discussing Lunar Exploration", description: "Help a friend understand why we're going back to the Moon.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec3-u10", title: "Section 3 Review",
    description: "Test everything you've learned about Earth, the Moon, eclipses, atmosphere, and space exploration.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 3, sectionTitle: "Earth & Moon",
    lessons: [
      { id: "sp-sec3-u10-L1", title: "Earth & Moon Comprehensive Review", description: "Review all major topics from Section 3 in one big lesson.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec3-u10-L2", title: "Section 3 Scenarios", description: "Apply your knowledge from the entire section to real-world situations.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec3-u10-L3", title: "Teaching Earth & Moon Science", description: "Explain complex Earth and Moon concepts to a curious student.", icon: "💬", type: "conversation", xpReward: 30, questions: [] },
      { id: "sp-sec3-u10-L4", title: "Section 3 Speed Round", description: "15 rapid-fire questions covering everything from Section 3.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  // ── Section 4: Light & Telescopes (12 units) ──
  {
    id: "sp-s4-u1",
    title: "What Is Light?",
    description: "Discover the dual nature of light: it behaves as both a wave and a particle.",
    color: "#F59E0B",
    icon: "💡",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u1-L1", title: "Light Is Energy You Can See", description: "What light actually is and why it matters for astronomy.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-s4-u1-L2", title: "Waves, Particles, or Both?", description: "Light has a dual nature that puzzled scientists for centuries.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u1-L3", title: "Wavelength and Frequency", description: "How wavelength and frequency are connected and what they determine.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u1-L4", title: "How Light Travels Through Space", description: "Reflection, refraction, and the inverse square law.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u1-L5", title: "Why Astronomers Obsess Over Light", description: "How astronomers extract temperature, speed, and composition from starlight.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-s4-u2",
    title: "The Electromagnetic Spectrum",
    description: "From radio waves to gamma rays, explore the full range of light.",
    color: "#F59E0B",
    icon: "🌈",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u2-L1", title: "Beyond What Your Eyes Can See", description: "Visible light is just a tiny slice of a much larger spectrum.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-s4-u2-L2", title: "Radio Waves and Microwaves", description: "The longest wavelengths reveal cold gas, pulsars, and the echo of the Big Bang.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u2-L3", title: "Infrared: Seeing Heat", description: "How infrared reveals hidden stars, cool planets, and dusty regions.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u2-L4", title: "The High-Energy Universe", description: "Ultraviolet, X-rays, and gamma rays reveal the most violent events in space.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u2-L5", title: "What Gets Through the Atmosphere", description: "Earth's atmosphere blocks most wavelengths, which is why we launch space telescopes.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u2-L6", title: "Seeing the Universe in Every Color", description: "Combining all wavelengths reveals a more complete picture of any object.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-s4-u3",
    title: "How Telescopes Work: Refractors",
    description: "Learn how lenses bend light to make distant objects appear closer.",
    color: "#F59E0B",
    icon: "🔭",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u3-L1", title: "What a Telescope Actually Does", description: "Telescopes collect light, not just magnify things.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-s4-u3-L2", title: "Bending Light With Lenses", description: "How a convex lens focuses parallel light rays to a single point.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u3-L3", title: "The Color Problem With Lenses", description: "Why refractors split light into unwanted rainbows and how to fix it.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u3-L4", title: "Famous Refractors in History", description: "From Galileo's simple tube to the great observatory refractors.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u3-L5", title: "Inside a Refractor Telescope", description: "Understand the optical path from starlight entering the lens to your eye.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-s4-u4",
    title: "Reflectors and Compound Telescopes",
    description: "Mirrors replaced lenses to build the largest telescopes in the world.",
    color: "#F59E0B",
    icon: "🪞",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u4-L1", title: "Why Mirrors Beat Lenses", description: "How reflectors solve the size and color problems of refractors.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-s4-u4-L2", title: "Newtonian, Cassegrain, and More", description: "Different mirror arrangements produce different telescope designs.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u4-L3", title: "Compound Telescopes: Best of Both", description: "Schmidt-Cassegrain and Maksutov designs combine lenses and mirrors.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u4-L4", title: "The Biggest Telescopes on Earth", description: "From Palomar to the ELT, how professional telescopes grew enormous.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u4-L5", title: "Refractor, Reflector, or Compound?", description: "When to choose each telescope type and why.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-s4-u5",
    title: "Review: Light and Optics",
    description: "Test your understanding of light, the spectrum, and telescope fundamentals.",
    color: "#F59E0B",
    icon: "🔄",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u5-L1", title: "Review: Light Fundamentals", description: "Revisit electromagnetic radiation, wavelength, frequency, and the speed of light.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u5-L2", title: "Review: Telescope Types", description: "Refractors, reflectors, and compounds compared side by side.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u5-L3", title: "Review: Light and Optics Calculations", description: "Practice the math of magnification, inverse square law, and light speed.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-s4-u6",
    title: "Telescope Specs: Aperture, Focal Length, Magnification",
    description: "Master the numbers that define a telescope's performance.",
    color: "#F59E0B",
    icon: "📐",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u6-L1", title: "Aperture: The Most Important Number", description: "Why aperture is the single most important telescope specification.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u6-L2", title: "Focal Length and Focal Ratio", description: "How focal length affects magnification, image brightness, and field of view.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u6-L3", title: "Magnification: When More Is Not Better", description: "Learn why high magnification has strict limits.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u6-L4", title: "Reading a Telescope Spec Sheet", description: "Decode the numbers on telescope listings like a pro.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u6-L5", title: "Beyond the Eyepiece: CCD Detectors", description: "How electronic sensors replaced the human eye for serious astronomy.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u6-L6", title: "Specs in Action: Real Telescopes Compared", description: "Compare real telescope models and see how specs translate to performance.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-s4-u7",
    title: "Radio Telescopes and Interferometry",
    description: "Explore how radio dishes detect invisible signals from space and how arrays act like one giant telescope.",
    color: "#F59E0B",
    icon: "📡",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u7-L1", title: "Listening to the Universe", description: "How radio telescopes detect invisible electromagnetic waves from space.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u7-L2", title: "Famous Radio Observatories", description: "Meet the biggest and most important radio telescopes on Earth.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u7-L3", title: "Interferometry: Linked Dishes", description: "How multiple small dishes work together to act like one enormous telescope.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u7-L4", title: "VLBI and Imaging a Black Hole", description: "How dishes on different continents created an Earth-sized telescope.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u7-L5", title: "What Radio Astronomy Found", description: "Pulsars, quasars, and the cosmic microwave background: radio's greatest hits.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-s4-u8",
    title: "Space Telescopes: Hubble to JWST",
    description: "Learn why we launch telescopes into space and how Hubble and JWST changed our view of the cosmos.",
    color: "#F59E0B",
    icon: "🛰️",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u8-L1", title: "Why Launch a Telescope to Space?", description: "Earth's atmosphere blocks, blurs, and absorbs light. Space solves all three problems.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u8-L2", title: "Hubble: The People's Telescope", description: "How a blurry mistake became one of humanity's greatest scientific tools.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u8-L3", title: "JWST: The Infrared Giant", description: "How Webb's golden mirror and sunshield let it see the universe's first light.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u8-L4", title: "Hubble vs JWST: Side by Side", description: "Compare the two greatest space telescopes ever built.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u8-L5", title: "Beyond Hubble and Webb", description: "Chandra, Spitzer, Kepler, and the fleet of space observatories.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u8-L6", title: "Modern Telescope Technology", description: "Adaptive optics, CCD detectors, and the tech that makes modern astronomy possible.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-s4-u9",
    title: "Spectroscopy: Reading Starlight",
    description: "Learn how splitting light into a spectrum reveals a star's temperature, composition, and motion.",
    color: "#F59E0B",
    icon: "🌈",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u9-L1", title: "Splitting Light into Colors", description: "How prisms and diffraction gratings spread light into a rainbow of wavelengths.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u9-L2", title: "Continuous, Emission, and Absorption", description: "The three spectral patterns and what each one tells you about the source.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u9-L3", title: "Fingerprints of the Elements", description: "Every element absorbs and emits unique wavelengths. This is how we know what stars are made of.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u9-L4", title: "Hot Stars, Cool Stars, and Color", description: "Why hot stars look blue and cool stars look red.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u9-L5", title: "OBAFGKM: The Spectral Classes", description: "How astronomers classify stars by their spectra and the famous mnemonic.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u9-L6", title: "What Spectra Reveal Beyond Chemistry", description: "Spectral lines also reveal motion, rotation, magnetic fields, and more.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-s4-u10",
    title: "Redshift, Blueshift, and Doppler Effect",
    description: "How the Doppler effect in light reveals whether objects are approaching or receding, and what that means for the universe.",
    color: "#F59E0B",
    icon: "🔴",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u10-L1", title: "Light Stretches and Squeezes", description: "When a light source moves, its wavelengths change. This is the Doppler effect.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u10-L2", title: "Calculating Speed from Shift", description: "How astronomers measure exactly how fast things move using the Doppler formula.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u10-L3", title: "The Expanding Universe", description: "Why almost every galaxy is redshifted and what that tells us about the universe.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u10-L4", title: "Gravity Bends Light Too", description: "Light loses energy escaping strong gravity, causing gravitational redshift.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u10-L5", title: "Redshift as a Distance Tool", description: "How astronomers use redshift to measure the distance and age of the universe.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-s4-u11",
    title: "Choosing Your First Telescope",
    description: "Practical advice for picking a beginner telescope that matches your goals, budget, and expectations.",
    color: "#F59E0B",
    icon: "🔭",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u11-L1", title: "What Beginners Actually Need", description: "Forget the marketing hype. Here's what actually matters when buying your first telescope.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u11-L2", title: "Refractor, Reflector, or Compound?", description: "Which telescope design is best for a beginner and why.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u11-L3", title: "Mounts, Eyepieces, and Accessories", description: "The telescope tube is only half the story. Mounts and eyepieces make or break the experience.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u11-L4", title: "Mistakes Every Beginner Makes", description: "Avoid these traps and your first telescope experience will be much better.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-s4-u11-L5", title: "Building Your Stargazing Toolkit", description: "Beyond the telescope: apps, accessories, and habits that make stargazing better.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-s4-u12",
    title: "Review + Checkpoint",
    description: "Test everything you've learned about light, telescopes, spectroscopy, and the Doppler effect.",
    color: "#F59E0B",
    icon: "🏁",
    sectionIndex: 4,
    sectionTitle: "Light & Telescopes",
    lessons: [
      { id: "sp-s4-u12-L1", title: "Review: Light and Telescope Fundamentals", description: "Revisit key concepts from electromagnetic radiation, optics, and telescope design.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u12-L2", title: "Review: Spectroscopy and Redshift", description: "Revisit spectral lines, the Doppler effect, and what they reveal about the universe.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u12-L3", title: "Review: Space and Radio Telescopes", description: "Test your knowledge of radio telescopes, interferometry, and space observatories.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-s4-u12-L4", title: "Section 4 Checkpoint Challenge", description: "A comprehensive challenge covering all of Light and Telescopes. Prove your mastery.", icon: "📝", xpReward: 35, questions: [] },
    ],
  },


  // ── Section 5: Stars (Part 1, 5 units) ──
  {
    id: "sp-sec5-u1", title: "What Makes a Star",
    description: "Stars are giant nuclear furnaces powered by hydrogen fusion. Learn what keeps them shining.",
    color: "#F59E0B", icon: "⭐", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u1-L1", title: "Stars Are Nuclear Furnaces", description: "What stars actually are and why they produce so much energy.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec5-u1-L2", title: "How Hydrogen Becomes Helium", description: "The proton-proton chain and how stars convert mass into energy.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u1-L3", title: "How Energy Escapes a Star", description: "Energy's long journey from the core to the surface.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u1-L4", title: "Why Stars Shine", description: "Putting it all together: from fusion to the light we see.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u1-L5", title: "Explaining Star Basics", description: "Help a curious friend understand what makes stars shine.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec5-u2", title: "How Stars Are Born",
    description: "From cold gas clouds to blazing protostars, discover how new stars form.",
    color: "#EC4899", icon: "🌫️", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u2-L1", title: "The Stellar Nursery", description: "Nebulae are the giant clouds of gas and dust where stars are born.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec5-u2-L2", title: "Gravity Takes Over", description: "How a quiet cloud of gas starts collapsing into a future star.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u2-L3", title: "The Protostar Stage", description: "The collapsing gas heats up and forms a protostar, almost but not quite a star.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u2-L4", title: "T Tauri Stars: Almost There", description: "The turbulent final stage before a protostar becomes a true star.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u2-L5", title: "Star Birth Speed Round", description: "Race the clock on nebulae, protostars, and stellar birth.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec5-u3", title: "Star Colors and Temperature",
    description: "Why stars glow different colors and what the spectral classification system tells us.",
    color: "#EF4444", icon: "🔴", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u3-L1", title: "Color Reveals Temperature", description: "A star's color tells you exactly how hot its surface is.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec5-u3-L2", title: "OBAFGKM: The Spectral Classes", description: "How astronomers classify stars by their spectra and temperature.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u3-L3", title: "Where the Sun Fits In", description: "Our Sun is a G2V star. Learn what that means.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u3-L4", title: "How Bright Stars Really Are", description: "Luminosity measures a star's true energy output, not just how bright it looks from Earth.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u3-L5", title: "Star Classification Chat", description: "Help explain star classification to a curious observer.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec5-u4", title: "Review: Star Fundamentals",
    description: "Test your knowledge of fusion, star birth, colors, and classification before moving on.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u4-L1", title: "Star Fundamentals Review", description: "Review fusion, star formation, spectral classes, and luminosity.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec5-u4-L2", title: "Stellar Scenarios", description: "Apply your star knowledge to real-world situations.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec5-u4-L3", title: "Star Fundamentals Speed Round", description: "Race the clock on star basics, birth, and classification.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec5-u5", title: "The H-R Diagram",
    description: "The Hertzsprung-Russell diagram maps every star by temperature and luminosity. It's the most important chart in all of astronomy.",
    color: "#3B82F6", icon: "📊", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u5-L1", title: "Plotting Stars by Temperature and Luminosity", description: "How the H-R diagram organizes every star in the sky.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec5-u5-L2", title: "The Main Sequence", description: "Most stars fall on a diagonal band called the main sequence.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u5-L3", title: "Red Giants on the H-R Diagram", description: "Where red giants sit and what their position tells us.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u5-L4", title: "White Dwarfs on the H-R Diagram", description: "Where white dwarfs sit and why they're hot but dim.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u5-L5", title: "The H-R Diagram Chat", description: "Help someone understand the H-R diagram and what it reveals.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  // ── Section 5: Stars (Part 2, 5 units) ──
  {
    id: "sp-sec5-u6", title: "Stellar Evolution: Low-Mass Stars",
    description: "Follow the life cycle of a Sun-like star from main sequence to white dwarf.",
    color: "#14B8A6", icon: "🌟", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u6-L1", title: "Life on the Main Sequence", description: "How long a star fuses hydrogen and what determines its lifespan.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec5-u6-L2", title: "Becoming a Red Giant", description: "What happens when a Sun-like star runs out of hydrogen in its core.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u6-L3", title: "Shedding the Outer Layers", description: "A dying low-mass star puffs off its outer layers as a beautiful planetary nebula.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u6-L4", title: "The White Dwarf Endpoint", description: "The final fate of low-mass stars: a slowly cooling ember.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u6-L5", title: "Low-Mass Evolution Speed Round", description: "Race the clock on red giants, planetary nebulae, and white dwarfs.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec5-u7", title: "Stellar Evolution: Massive Stars",
    description: "Massive stars live fast, burn bright, and die in spectacular explosions.",
    color: "#1E1B4B", icon: "💥", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u7-L1", title: "Burning Through the Elements", description: "Massive stars fuse heavier and heavier elements in their cores.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec5-u7-L2", title: "Supergiant Stars", description: "The largest stars in the universe and how they got that way.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u7-L3", title: "Supernova: The Grand Finale", description: "The most powerful explosion in the universe, triggered by iron in the core.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u7-L4", title: "Neutron Stars: The Densest Objects", description: "What's left after a supernova: an incredibly dense ball of neutrons.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec5-u7-L5", title: "Massive Star Evolution Chat", description: "Help explain the dramatic life and death of massive stars.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec5-u8", title: "Binary and Variable Stars",
    description: "Many stars have partners, and some change brightness over time. Discover these dynamic systems.",
    color: "#F97316", icon: "👯", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u8-L1", title: "Stars in Pairs", description: "More than half of all stars have a companion. Welcome to binary systems.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec5-u8-L2", title: "Eclipsing Binary Stars", description: "When one star passes in front of another, the brightness dips reveal hidden information.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u8-L3", title: "Variable Stars and Cepheids", description: "Some stars pulsate, changing brightness on their own. Cepheids are cosmic yardsticks.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u8-L4", title: "Binary and Variable Stars Speed Round", description: "Race the clock on binary systems, eclipsing binaries, and Cepheids.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec5-u9", title: "Measuring Stars",
    description: "How astronomers determine the distance, brightness, and properties of stars across the universe.",
    color: "#6366F1", icon: "📏", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u9-L1", title: "Parallax: The Thumb Trick", description: "The simplest way to measure the distance to nearby stars.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec5-u9-L2", title: "Standard Candles", description: "Objects with known luminosity let us measure distances far beyond parallax.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u9-L3", title: "The Magnitude System", description: "How astronomers measure brightness using an ancient numbering system.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec5-u9-L4", title: "The Cosmic Distance Ladder", description: "How astronomers chain distance methods together to reach the edge of the observable universe.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec5-u9-L5", title: "Measuring the Universe Chat", description: "Help explain how we know the distances to faraway stars.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec5-u10", title: "Section 5 Review",
    description: "Test your knowledge across all of Section 5: stellar birth, evolution, classification, binaries, and distance measurement.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 4, sectionTitle: "Stars",
    lessons: [
      { id: "sp-sec5-u10-L1", title: "Stars: The Complete Picture", description: "Review everything from stellar birth to death, classification to measurement.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec5-u10-L2", title: "Stellar Scenarios Challenge", description: "Apply your knowledge of stars to complex real-world situations.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec5-u10-L3", title: "Talking Stars with an Astronomer", description: "Answer an astronomer's questions about everything you've learned about stars.", icon: "💬", type: "conversation", xpReward: 30, questions: [] },
      { id: "sp-sec5-u10-L4", title: "Section 5 Speed Round", description: "15 rapid-fire questions covering everything from Section 5.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  // ── Section 6: Galaxies (Part 1, 5 units) ──
  {
    id: 'sp-sec6-u1', title: 'What Is a Galaxy?',
    description: 'Learn what galaxies are and how astronomers classify them by shape.',
    color: '#8B5CF6', icon: '🌌', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u1-L1', title: 'Billions of Stars Together', description: 'What a galaxy is and why galaxies matter in astronomy.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u1-L2', title: 'The Hubble Tuning Fork', description: 'How Edwin Hubble organized galaxies by their shape.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u1-L3', title: 'Elliptical Galaxies: The Quiet Giants', description: 'Why elliptical galaxies are full of old stars and low on gas.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u1-L4', title: 'Spiral Galaxies: Arms of Star Formation', description: 'How spiral arms form and why barred spirals are so common.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u1-L5', title: 'Irregular Galaxies and Putting It Together', description: 'Explore irregular galaxies and practice classifying all types.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec6-u2', title: 'The Milky Way: Our Home Galaxy',
    description: 'Explore the structure, size, and place of our home galaxy in the universe.',
    color: '#7C3AED', icon: '🌀', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u2-L1', title: 'Welcome to the Milky Way', description: 'Basic facts about our galaxy: type, size, and star count.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u2-L2', title: 'Inside the Milky Way\'s Structure', description: 'The bulge, disk, halo, and spiral arms of our galaxy.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u2-L3', title: 'Where Are We in the Galaxy?', description: 'The Sun\'s location in the Milky Way and how we orbit the galactic center.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u2-L4', title: 'The Milky Way\'s Neighborhood', description: 'Satellite galaxies and the Local Group of galaxies.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u2-L5', title: 'How We Map a Galaxy From Inside', description: 'The challenges and methods of mapping a galaxy while living inside it.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u2-L6', title: 'The Milky Way\'s Future', description: 'What will happen to our galaxy over the next few billion years.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec6-u3', title: 'Dark Matter: The Invisible Glue',
    description: 'Discover the mysterious invisible substance that holds galaxies together.',
    color: '#6D28D9', icon: '🔮', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u3-L1', title: 'The Missing Mass Problem', description: 'Why galaxies seem to have far more mass than we can see.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u3-L2', title: 'How Dark Matter Shapes the Universe', description: 'The gravitational role dark matter plays in galaxies and beyond.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u3-L3', title: 'How Much Dark Matter Is There?', description: 'The staggering proportion of dark matter in galaxies and the universe.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u3-L4', title: 'What Could Dark Matter Be?', description: 'The leading theories about dark matter\'s identity and the search to detect it.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u3-L5', title: 'Dark Matter vs. Dark Energy', description: 'Two mysterious forces that sound similar but work in opposite ways.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec6-u4', title: 'Galaxies: Review',
    description: 'Test your knowledge of galaxy types, the Milky Way, and dark matter.',
    color: '#5B21B6', icon: '🔄', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u4-L1', title: 'Galaxy Types Refresher', description: 'Review galaxy classification and key features of each type.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u4-L2', title: 'Milky Way Knowledge Check', description: 'Review our galaxy\'s structure, size, and place in the Local Group.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u4-L3', title: 'Dark Matter Knowledge Check', description: 'Review dark matter evidence, its role, and how it differs from dark energy.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'sp-sec6-u5', title: 'Galaxy Collisions and Mergers',
    description: 'What happens when galaxies crash into each other and reshape the universe.',
    color: '#4C1D95', icon: '💥', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u5-L1', title: 'How Galaxies Collide', description: 'Why galaxy collisions are common and how gravity drives them.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u5-L2', title: 'Tidal Tails and Bridges', description: 'How gravity distorts galaxies during close encounters.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u5-L3', title: 'Major and Minor Mergers', description: 'The difference between equal-sized collisions and a big galaxy eating a small one.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u5-L4', title: 'Starbursts: Collisions That Ignite', description: 'How galaxy collisions trigger explosive waves of new star formation.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u5-L5', title: 'Famous Merging Galaxies', description: 'A tour of the most spectacular colliding galaxy systems astronomers have found.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },


  // ── Section 6: Galaxies (Part 2, 5 units) ──
  {
    id: 'sp-sec6-u6', title: 'The Local Group and Galaxy Clusters',
    description: 'Explore our galactic neighborhood and the massive structures galaxies form together.',
    color: '#8B5CF6', icon: '🏘️', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u6-L1', title: 'Our Galactic Neighborhood', description: 'Meet the Local Group: the collection of galaxies that includes the Milky Way.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u6-L2', title: 'Galaxy Clusters and Beyond', description: 'How groups of galaxies form clusters containing hundreds or thousands of members.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u6-L3', title: 'Andromeda Is Coming', description: 'The Milky Way and Andromeda are on a collision course billions of years from now.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u6-L4', title: 'Explaining the Local Group', description: 'Help a curious friend understand our galactic neighborhood.', icon: '💬', type: 'conversation', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u6-L5', title: 'Local Group Speed Round', description: 'Race the clock on galaxy groups, clusters, and the cosmic web.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'sp-sec6-u7', title: 'Active Galactic Nuclei and Quasars',
    description: 'Discover the most powerful engines in the universe: supermassive black holes devouring matter at galaxy centers.',
    color: '#EC4899', icon: '💥', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u7-L1', title: 'What Is an Active Galaxy?', description: 'Some galaxies have extraordinarily bright centers powered by feeding black holes.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u7-L2', title: 'Types of Active Galaxies', description: 'Seyferts, radio galaxies, blazars, and how they\'re connected.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u7-L3', title: 'Quasars: Beacons of the Early Universe', description: 'The most luminous persistent objects in the cosmos and what they tell us about the early universe.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u7-L4', title: 'Relativistic Jets of Energy', description: 'How supermassive black holes launch jets traveling close to the speed of light.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u7-L5', title: 'AGN Feedback and Galaxy Evolution', description: 'How active black holes shape the galaxies around them.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec6-u7-L6', title: 'AGN and Quasars Speed Round', description: 'Race the clock on active galaxies, quasars, jets, and AGN feedback.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'sp-sec6-u8', title: 'Deep Sky Objects: Nebulae, Clusters, Galaxies',
    description: 'Learn to identify and understand the fuzzy objects that fill the night sky beyond our solar system.',
    color: '#14B8A6', icon: '🌌', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u8-L1', title: 'What Are Deep Sky Objects?', description: 'A tour of everything beyond the solar system that isn\'t an individual star.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u8-L2', title: 'Nebulae: Stellar Nurseries and Graveyards', description: 'Emission, reflection, dark, and planetary nebulae each tell a different story.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u8-L3', title: 'Star Clusters: Open and Globular', description: 'Two types of star clusters reveal different chapters of a galaxy\'s history.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u8-L4', title: 'Famous Deep Sky Showpieces', description: 'The most stunning and scientifically important DSOs you should know.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u8-L5', title: 'Deep Sky Objects Speed Round', description: 'Race the clock on nebulae, clusters, galaxies, and famous DSOs.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'sp-sec6-u9', title: 'The Cosmic Distance Ladder',
    description: 'How astronomers measure distances from nearby stars to the edge of the observable universe.',
    color: '#F59E0B', icon: '📏', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u9-L1', title: 'The Problem of Cosmic Distances', description: 'Why measuring distances in space is one of the hardest problems in astronomy.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u9-L2', title: 'Parallax: The Foundation', description: 'How Earth\'s orbit gives us a baseline for measuring stellar distances.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec6-u9-L3', title: 'Standard Candles: Cepheids and Beyond', description: 'Objects with known brightness let us measure distances to other galaxies.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u9-L4', title: 'Supernovae, Redshift, and Hubble\'s Law', description: 'How exploding stars and expanding space measure the most distant reaches of the cosmos.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec6-u9-L5', title: 'Explaining the Distance Ladder', description: 'Help a science student understand how astronomers measure cosmic distances.', icon: '💬', type: 'conversation', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u9-L6', title: 'Cosmic Distance Ladder Speed Round', description: 'Race the clock on parallax, Cepheids, supernovae, and Hubble\'s law.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'sp-sec6-u10', title: 'Section 6 Review and Checkpoint',
    description: 'Test your knowledge across all of Section 6: galaxies, AGNs, deep sky objects, and the cosmic distance ladder.',
    color: '#F59E0B', icon: '🏆', sectionIndex: 5, sectionTitle: 'Galaxies',
    lessons: [
      { id: 'sp-sec6-u10-L1', title: 'Galaxies and the Local Group Review', description: 'Review galaxy types, formation, collisions, and the Local Group.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u10-L2', title: 'AGN, Quasars, and Deep Sky Review', description: 'Review active galaxies, quasars, jets, nebulae, and star clusters.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec6-u10-L3', title: 'Cosmic Distance Ladder Review', description: 'Review parallax, standard candles, Hubble\'s law, and dark energy.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec6-u10-L4', title: 'Section 6 Final Speed Round', description: 'Race the clock across everything in Section 6: galaxies, AGNs, DSOs, and the distance ladder.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
    ],
  },


  // ── Section 7: Black Holes & Extreme Physics (10 units) ──
  {
    id: "sp-sec7-u1", title: "What Is a Black Hole?",
    description: "Discover how black holes form, why nothing escapes them, and the different types lurking in space.",
    color: "#1E1B4B", icon: "🕳️", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u1-L1", title: "Gravity's Ultimate Trap", description: "What a black hole actually is and why it's the strangest object in space.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec7-u1-L2", title: "How Stars Die to Make Black Holes", description: "The dramatic death of massive stars and why only the biggest ones create black holes.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u1-L3", title: "Stellar, Intermediate, and Supermassive", description: "Black holes come in different sizes, from a few solar masses to billions.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u1-L4", title: "Detecting the Invisible", description: "How astronomers find objects that emit no light at all.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u1-L5", title: "Myths vs. Reality", description: "Separating science fiction from science fact about black holes.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec7-u2", title: "Event Horizons and Singularities",
    description: "Explore the boundary of no return and the mysterious point at the center of every black hole.",
    color: "#312E81", icon: "⚫", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u2-L1", title: "The Point of No Return", description: "What the event horizon is and why crossing it changes everything.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u2-L2", title: "What Happens When You Cross?", description: "The strange experience of falling through the event horizon.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u2-L3", title: "The Singularity: Where Physics Breaks", description: "The point of infinite density at the heart of every black hole.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u2-L4", title: "How Black Holes Bend Spacetime", description: "Gravity isn't a force pulling you in. It's the shape of space pushing you forward.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u2-L5", title: "The Photon Ring and Shadow", description: "Why black holes have a distinctive glowing ring around a dark center.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u2-L6", title: "Where Time Slows to a Crawl", description: "How black holes stretch, slow, and warp the flow of time itself.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec7-u3", title: "Spaghettification and Hawking Radiation",
    description: "What happens to objects falling in and the surprising way black holes can slowly evaporate.",
    color: "#4C1D95", icon: "🍝", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u3-L1", title: "Tidal Forces and Stretching", description: "Why gravity can pull you apart when it's stronger at your feet than your head.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u3-L2", title: "Stephen Hawking's Breakthrough", description: "How Hawking proved that black holes aren't completely black after all.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u3-L3", title: "Can Black Holes Die?", description: "Given enough time, every black hole will evaporate completely.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u3-L4", title: "The Information Paradox", description: "What happens to information that falls into a black hole?", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec7-u3-L5", title: "Black Hole Thermodynamics", description: "Black holes obey the same laws as engines and refrigerators.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec7-u4", title: "Review: Black Holes So Far",
    description: "Test your knowledge of black hole formation, event horizons, singularities, and Hawking radiation.",
    color: "#3730A3", icon: "🔄", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u4-L1", title: "Review: Formation and Types", description: "Revisit how black holes form and the different categories by mass.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u4-L2", title: "Review: Event Horizons and Spacetime", description: "Revisit event horizons, singularities, time dilation, and the first black hole image.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u4-L3", title: "Review: Radiation, Evaporation, and Paradoxes", description: "Revisit spaghettification, Hawking radiation, evaporation, and the information paradox.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec7-u5", title: "Supermassive Black Holes: Galaxy Engines",
    description: "How the giant black holes at galaxy centers shape the evolution of entire galaxies.",
    color: "#1E1B4B", icon: "🌌", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u5-L1", title: "A Monster in Every Galaxy", description: "Nearly every large galaxy has a supermassive black hole at its center.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u5-L2", title: "Quasars: The Brightest Objects in the Universe", description: "When a supermassive black hole feeds actively, it can outshine its entire galaxy.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u5-L3", title: "Black Holes Shape Their Galaxies", description: "How supermassive black holes regulate star formation across an entire galaxy.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u5-L4", title: "When Black Holes Collide", description: "What happens when two supermassive black holes merge during a galaxy collision.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec7-u5-L5", title: "Sagittarius A*: Our Galaxy's Giant", description: "What we know about the supermassive black hole at the center of the Milky Way.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec7-u6", title: "The First Black Hole Image",
    description: "How the Event Horizon Telescope captured the shadow of a black hole for the first time.",
    color: "#F97316", icon: "📸", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u6-L1", title: "Why Photographing a Black Hole Is Hard", description: "The enormous challenges of imaging something that emits no light.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u6-L2", title: "Building an Earth-Sized Telescope", description: "How VLBI links telescopes across continents into one virtual dish.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u6-L3", title: "M87's Shadow Revealed", description: "The historic 2019 image and what it showed us.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u6-L4", title: "Sagittarius A* and Our Galactic Center", description: "How the EHT imaged the Milky Way's own supermassive black hole.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u6-L5", title: "The Future of Black Hole Imaging", description: "Next-generation plans to make sharper, real-time movies of black holes.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec7-u7", title: "Gravitational Waves: LIGO and Merging Black Holes",
    description: "Hear the universe ripple as colliding black holes shake the fabric of spacetime.",
    color: "#8B5CF6", icon: "🌊", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u7-L1", title: "What Are Gravitational Waves?", description: "Ripples in spacetime predicted by Einstein and finally detected a century later.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u7-L2", title: "How LIGO Detects the Invisible", description: "Laser beams, mirrors, and the most sensitive measurement ever made.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u7-L3", title: "The First Detection: GW150914", description: "September 14, 2015: the day we heard the universe for the first time.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u7-L4", title: "The Global Detector Network", description: "Virgo, KAGRA, and the worldwide effort to triangulate gravitational wave sources.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u7-L5", title: "Multi-Messenger Astronomy", description: "When gravitational waves and light arrive from the same event, the payoff is enormous.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec7-u7-L6", title: "What Gravitational Waves Have Taught Us", description: "New discoveries from nearly a decade of gravitational wave observations.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec7-u8", title: "Neutron Stars and Pulsars",
    description: "The densest objects with a surface: city-sized remnants spinning hundreds of times per second.",
    color: "#06B6D4", icon: "💫", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u8-L1", title: "What Is a Neutron Star?", description: "When a massive star dies but isn't quite heavy enough to become a black hole.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u8-L2", title: "Pulsars: Cosmic Lighthouses", description: "Rapidly spinning neutron stars that sweep beams of radiation across the sky.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u8-L3", title: "Millisecond Pulsars and Extreme Spin", description: "Neutron stars that spin hundreds of times per second, faster than a kitchen blender.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u8-L4", title: "Magnetars and Extreme Magnetic Fields", description: "Neutron stars with magnetic fields a quadrillion times stronger than Earth's.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u8-L5", title: "Neutron Stars as Physics Laboratories", description: "Why neutron stars are the best natural laboratories for extreme physics.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec7-u9", title: "Wormholes, White Holes, and Theoretical Extremes",
    description: "The wildest predictions of general relativity: tunnels through spacetime and objects that can't exist, or can they?",
    color: "#EC4899", icon: "🕳️", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u9-L1", title: "What Is a Wormhole?", description: "Theoretical tunnels through spacetime that connect distant points in the universe.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec7-u9-L2", title: "White Holes: Time-Reversed Black Holes", description: "A mathematical mirror of a black hole where nothing can enter and everything must leave.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u9-L3", title: "Time Travel and Closed Timelike Curves", description: "Does general relativity actually allow time travel? The math says maybe.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u9-L4", title: "Naked Singularities and Cosmic Censorship", description: "What if a singularity had no event horizon to hide behind?", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec7-u9-L5", title: "The Frontier of Extreme Physics", description: "Where general relativity meets quantum mechanics, and the biggest unsolved questions.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec7-u10", title: "Section 7 Review and Checkpoint",
    description: "Test your knowledge across all of Section 7: black holes, gravitational waves, neutron stars, and extreme physics.",
    color: "#F59E0B", icon: "🏆", sectionIndex: 6, sectionTitle: "Black Holes & Extreme Physics",
    lessons: [
      { id: "sp-sec7-u10-L1", title: "Black Holes and Imaging Review", description: "Review formation, types, event horizons, and the historic first images.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u10-L2", title: "Gravitational Waves and Detection Review", description: "Review LIGO, Virgo, key detections, and multi-messenger astronomy.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u10-L3", title: "Neutron Stars and Theoretical Physics Review", description: "Review pulsars, magnetars, wormholes, and the frontiers of extreme physics.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec7-u10-L4", title: "Section 7 Speed Round", description: "15 rapid-fire questions covering all of Section 7.", icon: "⚡", xpReward: 35, questions: [] },
    ],
  },


  // ── Section 8: Cosmology (Part 1, 5 units) ──
  {
    id: "sp-sec8-u1", title: "The Big Bang",
    description: "Explore how the universe began, the evidence that supports it, and what happened in the first moments.",
    color: "#EF4444", icon: "💥", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u1-L1", title: "The Big Bang Theory", description: "What the Big Bang actually means and how it started everything.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec8-u1-L2", title: "Evidence for the Big Bang", description: "Three key pieces of evidence that support the Big Bang theory.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u1-L3", title: "The Cosmic Microwave Background", description: "The faint glow left over from the Big Bang that fills the entire sky.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u1-L4", title: "The First Three Minutes", description: "What happened in the earliest moments after the Big Bang.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u1-L5", title: "The Big Bang Conversation", description: "Help a friend understand the Big Bang and its evidence.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec8-u2", title: "The Expanding Universe",
    description: "Learn how Hubble discovered the expanding universe, how redshift works, and why expansion is speeding up.",
    color: "#3B82F6", icon: "🌌", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u2-L1", title: "Hubble's Discovery", description: "How Edwin Hubble proved the universe is expanding.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec8-u2-L2", title: "Redshift", description: "How stretching space makes light change color.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u2-L3", title: "Hubble's Law", description: "The simple equation that describes how fast the universe expands.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u2-L4", title: "Accelerating Expansion", description: "The shocking discovery that the universe's expansion is speeding up.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u2-L5", title: "Expansion Speed Round", description: "Race the clock on the expanding universe.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec8-u3", title: "Dark Matter",
    description: "Discover the invisible substance that makes up most of the matter in the universe.",
    color: "#1E1B4B", icon: "🔮", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u3-L1", title: "The Galaxy Rotation Problem", description: "Why galaxies spin too fast for the matter we can see.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec8-u3-L2", title: "Evidence for Dark Matter", description: "Multiple independent observations that confirm dark matter exists.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u3-L3", title: "What Dark Matter Might Be", description: "Exploring the properties of this invisible substance.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u3-L4", title: "Dark Matter Candidates", description: "The leading theoretical particles that could explain dark matter.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u3-L5", title: "Dark Matter Conversation", description: "Explain dark matter to a skeptical friend.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec8-u4", title: "Review: Cosmology Foundations",
    description: "Test your knowledge of the Big Bang, expansion, redshift, and dark matter.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u4-L1", title: "Big Bang and Expansion Review", description: "Revisit the Big Bang, CMB, Hubble's Law, and the expanding universe.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec8-u4-L2", title: "Cosmology Scenarios", description: "Apply your knowledge to real-world cosmology situations.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec8-u4-L3", title: "Foundations Speed Round", description: "Race the clock on Big Bang, expansion, and dark matter.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec8-u5", title: "Dark Energy",
    description: "Explore the mysterious force accelerating the expansion of the universe and shaping its ultimate fate.",
    color: "#6366F1", icon: "⚡", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u5-L1", title: "What Dark Energy Is", description: "The mysterious force that makes up most of the universe.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec8-u5-L2", title: "The Cosmological Constant", description: "Einstein's 'biggest blunder' turned out to be prophetic.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u5-L3", title: "Dark Energy vs Dark Matter", description: "Two 'dark' things with very different roles in the universe.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u5-L4", title: "The Fate of the Universe", description: "How dark energy determines the ultimate destiny of everything.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u5-L5", title: "Dark Energy Conversation", description: "Help someone understand the difference between dark matter and dark energy.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  // ── Section 8: Cosmology (Part 2, 5 units) ──
  {
    id: "sp-sec8-u6", title: "The Shape and Fate of the Universe",
    description: "Is the universe flat, curved, or closed? How its shape determines its destiny.",
    color: "#EC4899", icon: "🌐", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u6-L1", title: "Flat, Open, or Closed", description: "The three possible shapes of the universe and what each one means.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec8-u6-L2", title: "Critical Density", description: "The density that determines whether the universe is flat, open, or closed.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u6-L3", title: "Big Freeze vs Big Crunch", description: "The two classic endings for the universe.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u6-L4", title: "Multiverse Ideas", description: "Could there be other universes beyond our own?", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u6-L5", title: "Fate Speed Round", description: "Race the clock on the shape and fate of the universe.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec8-u7", title: "Cosmic Timeline",
    description: "Walk through the major eras of the universe from the first fraction of a second to the first galaxies.",
    color: "#F59E0B", icon: "⏰", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u7-L1", title: "The Inflation Epoch", description: "The universe expanded faster than light in a tiny fraction of a second.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec8-u7-L2", title: "Recombination", description: "When the first atoms formed and light was set free.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u7-L3", title: "The Dark Ages", description: "The long, dark era before the first stars lit up.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u7-L4", title: "First Stars and Galaxies", description: "The birth of the first stars and how they changed everything.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u7-L5", title: "Cosmic Timeline Conversation", description: "Walk a student through the entire history of the universe.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec8-u8", title: "Measuring the Universe",
    description: "The techniques cosmologists use to measure cosmic distances and the expansion rate.",
    color: "#14B8A6", icon: "📏", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u8-L1", title: "The Cosmic Distance Ladder", description: "How astronomers measure distances at every scale in the universe.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec8-u8-L2", title: "Type Ia Supernovae", description: "The 'standard candles' that revealed the accelerating universe.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u8-L3", title: "Baryon Acoustic Oscillations", description: "Sound waves from the early universe that serve as a cosmic ruler.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec8-u8-L4", title: "Measuring Speed Round", description: "Race the clock on cosmic measurement techniques.", icon: "⚡", type: "speed-round", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec8-u9", title: "Unsolved Mysteries in Cosmology",
    description: "The biggest unanswered questions about the origin, structure, and fate of the universe.",
    color: "#F97316", icon: "❓", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u9-L1", title: "Matter-Antimatter Asymmetry", description: "Why does matter exist at all when the Big Bang should have made equal amounts of matter and antimatter?", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec8-u9-L2", title: "The Hubble Tension", description: "Two ways of measuring the expansion rate give different answers.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u9-L3", title: "What Caused the Big Bang?", description: "The deepest question in cosmology: why did the universe begin?", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u9-L4", title: "Are We Alone?", description: "The cosmic context for the question of life in the universe.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec8-u9-L5", title: "Cosmology Mysteries Conversation", description: "Discuss the biggest unsolved questions with a curious friend.", icon: "💬", type: "conversation", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec8-u10", title: "Section 8 Review",
    description: "Test your knowledge across all of Section 8: the Big Bang, dark matter, dark energy, cosmic timeline, and unsolved mysteries.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 7, sectionTitle: "Cosmology",
    lessons: [
      { id: "sp-sec8-u10-L1", title: "Cosmology Comprehensive Review", description: "Review the Big Bang, expansion, dark matter, dark energy, and cosmic structure.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec8-u10-L2", title: "Cosmology Scenarios", description: "Apply your knowledge to complex cosmological situations.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec8-u10-L3", title: "Cosmologist Conversation", description: "Have a wide-ranging conversation about the cosmos.", icon: "💬", type: "conversation", xpReward: 30, questions: [] },
      { id: "sp-sec8-u10-L4", title: "Section 8 Speed Round", description: "15 rapid-fire questions covering all of Section 8: Cosmology.", icon: "⚡", type: "speed-round", xpReward: 35, questions: [] },
    ],
  },

  // ── Section 9: Rockets & Orbital Mechanics (10 units from section-9-rockets-part1 and part2) ──
  {
    id: "sp-sec9-u1", title: "Newton's Laws in Space",
    description: "Learn how Newton's 3 laws of motion explain everything from floating astronauts to rocket launches.",
    color: "#EF4444", icon: "🚀", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u1-L1", title: "Objects in Motion Stay in Motion", description: "Discover why things keep moving in space unless a force stops them.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec9-u1-L2", title: "Force Equals Mass Times Acceleration", description: "Learn how force, mass, and acceleration work together to move rockets.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec9-u1-L3", title: "Every Action Has a Reaction", description: "Understand why pushing gas backward makes a rocket go forward.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "sp-sec9-u2", title: "How Rockets Work",
    description: "Explore the basic components of a rocket and how combustion creates the thrust to leave Earth.",
    color: "#3B82F6", icon: "🔥", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u2-L1", title: "What Is Thrust?", description: "Learn what thrust is and how rockets generate the force to lift off the ground.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec9-u2-L2", title: "Parts of a Rocket", description: "Identify the main sections of a rocket and what each one does.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec9-u2-L3", title: "Why Rockets Have Stages", description: "Discover why rockets drop empty sections during flight to reach orbit.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "sp-sec9-u3", title: "Orbits Explained",
    description: "Understand what keeps satellites circling Earth and why orbiting is really just falling and missing the ground.",
    color: "#F59E0B", icon: "🌐", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u3-L1", title: "Falling Around the Earth", description: "Learn why an orbit is just falling sideways fast enough to miss the ground.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec9-u3-L2", title: "Low, Medium, and High Orbits", description: "Explore the different orbital altitudes and what each one is used for.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec9-u3-L3", title: "Kepler's Laws of Orbital Motion", description: "Discover the 3 laws that describe how objects move in orbit.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec9-u4", title: "Review: Rocket Foundations",
    description: "Test your knowledge of Newton's laws, rocket anatomy, staging, and orbital mechanics.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u4-L1", title: "Newton's Laws and Thrust Review", description: "Review how Newton's 3 laws apply to rockets and thrust generation.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec9-u4-L2", title: "Staging and Orbits Review", description: "Review rocket staging, orbit types, and Kepler's laws.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec9-u5", title: "Getting to Orbit",
    description: "Learn the physics of launching a rocket from the ground to a stable orbit around Earth.",
    color: "#10B981", icon: "📡", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u5-L1", title: "Orbital Speed vs. Escape Speed", description: "Understand the difference between orbiting Earth and leaving it entirely.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec9-u5-L2", title: "Delta-V: The Currency of Space Travel", description: "Learn why velocity change is the most important number in mission planning.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec9-u5-L3", title: "From Pad to Orbit", description: "Follow a rocket from ignition to orbit insertion step by step.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec9-u6", title: "Orbital Maneuvers",
    description: "Learn how spacecraft change orbits, rendezvous with other craft, and transfer between different altitudes.",
    color: "#EC4899", icon: "🔄", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u6-L1", title: "How Spacecraft Change Orbits", description: "Discover the counterintuitive truth about speeding up and slowing down in orbit.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec9-u6-L2", title: "The Hohmann Transfer Orbit", description: "Learn the most fuel-efficient way to move between two circular orbits.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec9-u6-L3", title: "Meeting Another Spacecraft", description: "Learn how two spacecraft in orbit catch up to each other and dock.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec9-u7", title: "Rocket Engines and Fuel",
    description: "Explore different types of rocket engines, fuels, and how engineers choose the right one for each mission.",
    color: "#F97316", icon: "⛽", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u7-L1", title: "Solid and Liquid Rocket Fuel", description: "Compare the two main types of chemical rocket propellant.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec9-u7-L2", title: "Kerosene, Hydrogen, and Methane", description: "Meet the most popular liquid rocket fuels and what makes each one special.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec9-u7-L3", title: "Specific Impulse: Engine Efficiency", description: "Understand the key number that tells you how efficient a rocket engine really is.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec9-u8", title: "Reusable Rockets",
    description: "Learn how landing and reusing rocket boosters is revolutionizing space travel by slashing costs.",
    color: "#14B8A6", icon: "♻️", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u8-L1", title: "Why Throwing Away Rockets Is Wasteful", description: "Understand the economics of expendable rockets and why reusability is a game-changer.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec9-u8-L2", title: "Landing a Rocket on Its Tail", description: "Learn the engineering behind SpaceX's propulsive landing technique.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec9-u9", title: "Interplanetary Travel",
    description: "Explore how spacecraft travel between planets using gravity assists, transfer windows, and deep-space navigation.",
    color: "#6366F1", icon: "🪐", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u9-L1", title: "Why Timing Is Everything", description: "Learn why you can only launch to other planets at specific times.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec9-u9-L2", title: "Free Speed from Planets", description: "Discover how spacecraft steal speed from planets without using any fuel.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec9-u9-L3", title: "Finding Your Way Between Planets", description: "Learn how spacecraft navigate millions of kilometers from Earth.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec9-u10", title: "Section 9 Review",
    description: "Test everything you've learned about rockets, orbits, maneuvers, engines, and interplanetary travel.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 8, sectionTitle: "Rockets & Orbital Mechanics",
    lessons: [
      { id: "sp-sec9-u10-L1", title: "Rockets and Orbits Review", description: "Review Newton's laws, thrust, staging, orbit types, and Kepler's laws.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec9-u10-L2", title: "Maneuvers, Engines, and Reusability", description: "Review orbital maneuvers, fuel types, specific impulse, and reusable rockets.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  // ── Section 10: Space Exploration History (10 units from section-10-exploration-part1 and part2) ──
  {
    id: "sp-sec10-u1", title: "The Space Race Begins",
    description: "Learn how Sputnik, Explorer 1, and Yuri Gagarin launched the era of space exploration.",
    color: "#3B82F6", icon: "🛰️", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u1-L1", title: "Sputnik Changes Everything", description: "How a small Soviet satellite shocked the world and launched the Space Age.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec10-u1-L2", title: "America Responds with Explorer 1", description: "How the US raced to launch its own satellite and made a major discovery.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec10-u1-L3", title: "The First Human in Space", description: "Yuri Gagarin's historic flight aboard Vostok 1 and what it meant for humanity.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "sp-sec10-u2", title: "Apollo: To the Moon",
    description: "From JFK's bold speech to Neil Armstrong's first steps on the Moon.",
    color: "#F59E0B", icon: "🌕", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u2-L1", title: "JFK's Moon Challenge", description: "How one speech changed the direction of American space exploration.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec10-u2-L2", title: "Walking on the Moon", description: "The Apollo 11 mission and humanity's first steps on another world.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec10-u2-L3", title: "Apollo 13 and Later Missions", description: "The famous rescue of Apollo 13 and what the later Apollo missions achieved.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec10-u3", title: "Space Shuttles",
    description: "Explore the reusable spacecraft that defined 30 years of American spaceflight.",
    color: "#10B981", icon: "🚀", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u3-L1", title: "The Shuttle Concept", description: "Why NASA built a reusable spacecraft and how the shuttle design worked.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec10-u3-L2", title: "What the Shuttle Accomplished", description: "The Hubble telescope, ISS construction, and other shuttle achievements.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec10-u3-L3", title: "Lessons from Tragedy", description: "How the Challenger and Columbia disasters changed space safety forever.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec10-u4", title: "Review: Early Space Age",
    description: "Test your knowledge of the Space Race, Apollo, and the Space Shuttle.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u4-L1", title: "Space Race Refresher", description: "Review the early milestones that launched the Space Age.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec10-u4-L2", title: "Apollo and Shuttle Knowledge Check", description: "Review the Apollo Moon missions and the Space Shuttle program.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec10-u5", title: "Space Stations",
    description: "From Skylab to the ISS, learn how humans built homes in orbit.",
    color: "#EC4899", icon: "🏠", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u5-L1", title: "Skylab: America's First Station", description: "How NASA turned leftover Apollo hardware into a space station.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec10-u5-L2", title: "Mir: The Soviet Outpost", description: "How the Soviet Union built a modular space station that orbited for 15 years.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec10-u5-L3", title: "The International Space Station", description: "How 16 countries built the largest structure ever assembled in space.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec10-u6", title: "Robotic Explorers",
    description: "Discover how robotic probes have visited every planet and pushed beyond the solar system.",
    color: "#14B8A6", icon: "🤖", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u6-L1", title: "The Voyager Grand Tour", description: "How two spacecraft visited four planets and left the solar system.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec10-u6-L2", title: "Roving Across Mars", description: "From Sojourner to Perseverance, how rovers explored the Red Planet.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec10-u6-L3", title: "Saturn, Pluto, and Beyond", description: "How Cassini explored Saturn for 13 years and New Horizons revealed Pluto.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec10-u7", title: "Modern Space Agencies",
    description: "Meet the world's major space agencies and what each one brings to space exploration.",
    color: "#F97316", icon: "🌍", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u7-L1", title: "NASA: Leading Space Science", description: "How NASA evolved from the Apollo era to modern deep space missions.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec10-u7-L2", title: "Europe and Japan in Space", description: "How ESA and JAXA contribute to space exploration worldwide.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec10-u7-L3", title: "India and China Reach for Space", description: "How ISRO and CNSA became major players in space exploration.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec10-u8", title: "Private Space Companies",
    description: "How SpaceX, Blue Origin, and others transformed spaceflight from government monopoly to commercial industry.",
    color: "#EF4444", icon: "💼", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u8-L1", title: "SpaceX and Reusable Rockets", description: "How SpaceX made rocket landing a reality and slashed launch costs.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec10-u8-L2", title: "Blue Origin and Beyond", description: "Meet the other private companies shaping the future of spaceflight.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "sp-sec10-u9", title: "The New Space Race",
    description: "Explore the Artemis program, China's space station, and the race to Mars.",
    color: "#6366F1", icon: "🏁", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u9-L1", title: "Artemis: Back to the Moon", description: "NASA's plan to return humans to the Moon for the first time in over 50 years.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec10-u9-L2", title: "China's Growing Ambitions", description: "How China built its own space station and plans to send astronauts to the Moon.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec10-u9-L3", title: "The Race to Mars", description: "Who will send humans to Mars first, and what are the biggest challenges?", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec10-u10", title: "Section 10 Review",
    description: "Test your mastery of space exploration history, from Sputnik to Starship.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 9, sectionTitle: "Space Exploration History",
    lessons: [
      { id: "sp-sec10-u10-L1", title: "Crewed Spaceflight Through History", description: "Review key milestones in human spaceflight from Gagarin to the ISS.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec10-u10-L2", title: "Robots and Agencies Knowledge Check", description: "Review robotic missions, space agencies, and private companies.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  // ── Section 11: Exoplanets & Astrobiology (10 units from section-11-exoplanets-part1 and part2) ──
  {
    id: "sp-sec11-u1", title: "What Are Exoplanets?",
    description: "Discover worlds beyond our solar system and why they matter for understanding our place in the cosmos.",
    color: "#6366F1", icon: "🪐", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u1-L1", title: "Planets Around Other Stars", description: "What an exoplanet is and why their discovery changed astronomy forever.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec11-u1-L2", title: "Types of Exoplanets", description: "From gas giants to rocky worlds, exoplanets come in surprising variety.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u1-L3", title: "How Many Are Out There?", description: "The staggering number of worlds in our galaxy and how astronomers estimate the total.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "sp-sec11-u2", title: "How We Find Exoplanets",
    description: "Master the clever techniques astronomers use to detect invisible worlds around distant stars.",
    color: "#3B82F6", icon: "🔭", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u2-L1", title: "The Transit Method", description: "How watching stars dim reveals hidden planets passing in front of them.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec11-u2-L2", title: "The Radial Velocity Method", description: "How a wobbling star reveals an invisible planet tugging on it.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u2-L3", title: "Direct Imaging and Other Methods", description: "Photographing exoplanets directly and other creative detection techniques.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "sp-sec11-u3", title: "Famous Exoplanet Systems",
    description: "Explore TRAPPIST-1, Kepler-186f, hot Jupiters, and the most exciting worlds found so far.",
    color: "#F59E0B", icon: "⭐", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u3-L1", title: "The TRAPPIST-1 System", description: "Seven Earth-sized planets around one tiny star, several in the habitable zone.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u3-L2", title: "Kepler-186f and Habitable Candidates", description: "The first Earth-sized planet found in a habitable zone and other promising worlds.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u3-L3", title: "Hot Jupiters and Weird Worlds", description: "The strangest exoplanets discovered, from scorching gas giants to diamond planets.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec11-u4", title: "Review: Exoplanet Detection",
    description: "Test your knowledge of exoplanet types, detection methods, and famous planetary systems.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u4-L1", title: "Review: Exoplanet Types and Numbers", description: "Revisit the different categories of exoplanets and how common they are.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u4-L2", title: "Review: Detection Methods", description: "Revisit transit, radial velocity, direct imaging, and other techniques.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec11-u4-L3", title: "Review: Famous Exoplanet Systems", description: "Revisit TRAPPIST-1, Kepler-186f, hot Jupiters, and extreme exoplanets.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec11-u5", title: "The Habitable Zone",
    description: "Explore the Goldilocks zone, tidal locking, ocean worlds, and what makes a planet truly livable.",
    color: "#10B981", icon: "🌍", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u5-L1", title: "The Goldilocks Zone", description: "Why distance from a star determines whether liquid water can exist on a planet's surface.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec11-u5-L2", title: "Tidal Locking and Habitable Worlds", description: "How many exoplanets keep one face permanently toward their star and what that means for life.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u5-L3", title: "Ocean Worlds and Water Everywhere", description: "Planets covered entirely by water and subsurface oceans beneath ice shells.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "sp-sec11-u6", title: "What Is Life?",
    description: "Explore how scientists define life, the building blocks it needs, and organisms that thrive in extreme environments.",
    color: "#EC4899", icon: "🧬", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u6-L1", title: "Defining Life", description: "Why defining life is surprisingly difficult and what most scientists agree on.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec11-u6-L2", title: "The Building Blocks of Life", description: "Carbon, water, and the essential ingredients that life seems to require.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u6-L3", title: "Life in Extreme Places", description: "Organisms that thrive in boiling water, acid, radiation, and other environments once thought impossible for life.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec11-u7", title: "Life in Our Solar System",
    description: "Investigate Mars, Europa, Enceladus, and Titan as potential homes for life closer to home.",
    color: "#14B8A6", icon: "🔬", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u7-L1", title: "Mars: The Best Candidate?", description: "Why Mars is the most studied target in the search for past or present life.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec11-u7-L2", title: "Europa: Ocean Beneath the Ice", description: "Jupiter's moon Europa hides a salty ocean that could harbor life.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u7-L3", title: "Enceladus and Titan", description: "Saturn's moons offer two very different paths to potential life.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec11-u8", title: "SETI and the Fermi Paradox",
    description: "Investigate why we haven't found intelligent life yet, and the strategies we use to search for it.",
    color: "#F97316", icon: "📡", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u8-L1", title: "The Drake Equation", description: "A famous formula that estimates how many communicating civilizations might exist in our galaxy.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u8-L2", title: "The Fermi Paradox", description: "If the galaxy should be teeming with life, why haven't we found any evidence?", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec11-u8-L3", title: "SETI and the Search for Signals", description: "How scientists actively search for messages or signs of intelligent extraterrestrial life.", icon: "📝", xpReward: 20, questions: [] },
    ],
  },

  {
    id: "sp-sec11-u9", title: "Biosignatures and Future Missions",
    description: "Learn how we search for signs of life in exoplanet atmospheres and what future telescopes will reveal.",
    color: "#EF4444", icon: "🛰️", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u9-L1", title: "What Is a Biosignature?", description: "Chemical clues in a planet's atmosphere that suggest life might be present.", icon: "📝", xpReward: 15, questions: [] },
      { id: "sp-sec11-u9-L2", title: "JWST and Exoplanet Atmospheres", description: "How the James Webb Space Telescope is revolutionizing our ability to study distant worlds.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec11-u9-L3", title: "Future Telescopes and Missions", description: "Next-generation observatories designed specifically to image and characterize Earth-like exoplanets.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec11-u10", title: "Section 11 Review",
    description: "Test everything you've learned about exoplanets, astrobiology, and the search for life beyond Earth.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 10, sectionTitle: "Exoplanets & Astrobiology",
    lessons: [
      { id: "sp-sec11-u10-L1", title: "Review: Exoplanets and Detection", description: "Revisit exoplanet types, detection methods, and famous systems across the section.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec11-u10-L2", title: "Review: Astrobiology and the Search for Life", description: "Revisit the definition of life, extremophiles, solar system targets, and the Fermi paradox.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  // ── Section 12: Astrophotography & Amateur Astronomy (11 units) ──
  {
    id: "sp-sec12-u1",
    title: "Planning an Observation Night",
    description: "Learn how to pick the best night, location, and targets for a successful stargazing session.",
    color: "#7C3AED",
    icon: "🌙",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u1-L1", title: "Why Planning Matters", description: "A great observation night starts long before you step outside.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec12-u1-L2", title: "Moon Phase and Sky Conditions", description: "How the Moon and atmosphere affect what you can see.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec12-u1-L3", title: "Choosing Your Targets", description: "How to build a target list that matches the season, your equipment, and sky conditions.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u1-L4", title: "Building a Session Plan", description: "How to organize targets, set up a schedule, and maximize your time under the stars.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u1-L5", title: "Essential Gear Checklist", description: "What to bring, what to wear, and what most beginners forget.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u2",
    title: "Telescope Setup and Alignment",
    description: "Learn how to set up your telescope properly and align it for accurate tracking.",
    color: "#7C3AED",
    icon: "🔭",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u2-L1", title: "Setting Up Your Mount", description: "The mount is just as important as the telescope. Here's how to set it up right.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec12-u2-L2", title: "Polar Alignment Basics", description: "How to point your equatorial mount's axis at the celestial pole.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u2-L3", title: "Finder Scopes and Alignment Stars", description: "How to use finder scopes and perform star alignment for accurate GoTo pointing.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u2-L4", title: "Focusing and Collimation", description: "Get the sharpest images by mastering focus and optical alignment.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u2-L5", title: "Thermal Equilibrium and Troubleshooting", description: "Why your telescope needs to cool down and how to fix common setup problems.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u3",
    title: "Finding Objects: Star Hopping and GoTo Mounts",
    description: "Master two methods of finding deep sky objects: manual star hopping and computerized GoTo systems.",
    color: "#7C3AED",
    icon: "🧭",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u3-L1", title: "Star Hopping Fundamentals", description: "Navigate the sky by jumping from star to star to reach your target.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec12-u3-L2", title: "Classic Star Hops Everyone Should Know", description: "Practice star hopping with the most popular routes to famous deep sky objects.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u3-L3", title: "GoTo Mount Technology", description: "How computerized mounts find objects automatically and when to rely on them.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u3-L4", title: "Setting Circles and Digital Tools", description: "Alternative methods to find objects using coordinates and smartphone apps.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u3-L5", title: "Finding Techniques in Practice", description: "Combine star hopping and technology for efficient observing sessions.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u4",
    title: "Review: Planning, Setup, and Finding Objects",
    description: "Test your knowledge of observation planning, telescope setup, and object finding techniques.",
    color: "#7C3AED",
    icon: "🔄",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u4-L1", title: "Review: Planning and Sky Conditions", description: "Revisit Moon phases, Bortle scale, seeing, transparency, and session planning.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u4-L2", title: "Review: Telescope Setup and Alignment", description: "Test your knowledge of mounts, polar alignment, focusing, and collimation.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u4-L3", title: "Review: Finding Objects in the Sky", description: "Test star hopping skills, GoTo knowledge, and object-finding strategies.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u5",
    title: "Smartphone and DSLR Astrophotography",
    description: "Take your first photos of the night sky using a phone or DSLR camera.",
    color: "#7C3AED",
    icon: "📷",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u5-L1", title: "Your Phone Can Photograph the Sky", description: "Modern smartphones can capture surprisingly good images of the Moon, planets, and even star trails.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec12-u5-L2", title: "DSLR Basics for Astrophotography", description: "How to set up a DSLR or mirrorless camera for your first night sky photos.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u5-L3", title: "The 500 Rule and Tracking", description: "How long you can expose before stars trail, and how tracking mounts help.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u5-L4", title: "Widefield Milky Way Photography", description: "Capture stunning panoramas of our home galaxy with just a camera and tripod.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u5-L5", title: "Planetary and Lunar Photography", description: "Capture detailed images of the Moon and planets through your telescope.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u6",
    title: "Long Exposure and Stacking Techniques",
    description: "Master the core techniques that reveal invisible detail in deep sky objects.",
    color: "#7C3AED",
    icon: "⏱️",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u6-L1", title: "Why Long Exposures Matter", description: "How collecting more photons reveals structure invisible to your eyes.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec12-u6-L2", title: "Stacking: Many Frames Beat One", description: "Why astrophotographers take dozens of short exposures and combine them.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u6-L3", title: "Calibration Frames Explained", description: "Dark frames, flat frames, and bias frames improve your final image dramatically.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u6-L4", title: "Processing Your Stacked Image", description: "Basic post-processing to bring out detail in your stacked astrophoto.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u6-L5", title: "Autoguiding for Longer Exposures", description: "How a small guide camera keeps your telescope locked on target during long exposures.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u7",
    title: "Filters and Narrowband Imaging",
    description: "How filters isolate specific light to enhance views and fight light pollution.",
    color: "#7C3AED",
    icon: "🔴",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u7-L1", title: "Why Filters Help in Astronomy", description: "Filters block unwanted light and pass the light you want, improving contrast and detail.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec12-u7-L2", title: "Narrowband Filters Explained", description: "How hydrogen-alpha and oxygen-III filters reveal nebulae even in light-polluted skies.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u7-L3", title: "The Hubble Palette and Color Mapping", description: "How astrophotographers create stunning color images from narrowband data.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u7-L4", title: "Solar and Planetary Filters", description: "Filters for safe solar viewing and enhanced planetary detail.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u7-L5", title: "Building a Filter Collection", description: "Which filters to buy first and how to build a useful collection over time.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u8",
    title: "Review: Astrophotography Techniques",
    description: "Test your knowledge of camera settings, stacking, filters, and imaging workflows.",
    color: "#7C3AED",
    icon: "🔄",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u8-L1", title: "Review: Camera Settings and Techniques", description: "Revisit the 500 rule, exposure settings, and planetary vs. deep sky imaging.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u8-L2", title: "Review: Stacking and Processing", description: "Test your understanding of calibration frames, stacking workflow, and image processing.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u8-L3", title: "Review: Filters and Narrowband", description: "Test your knowledge of filter types, the Hubble Palette, and filter selection strategy.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u9",
    title: "Citizen Science Projects in Astronomy",
    description: "Contribute real data to scientific research using your telescope, camera, or even just your computer.",
    color: "#7C3AED",
    icon: "🔬",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u9-L1", title: "What Is Citizen Science?", description: "How amateur astronomers contribute real data to professional research.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec12-u9-L2", title: "Variable Star Observing", description: "Measure the changing brightness of stars and submit data to the AAVSO.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u9-L3", title: "Asteroid and Comet Monitoring", description: "How amateurs track asteroids, time occultations, and even discover new comets.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u9-L4", title: "Online Classification Projects", description: "Classify galaxies, hunt for exoplanets, and count craters from your computer.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u9-L5", title: "Reporting and Contributing Data", description: "How to submit observations properly so they have real scientific value.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u10",
    title: "Building a Home Observatory",
    description: "Design and build a permanent observing setup, from simple shelters to roll-off roof observatories.",
    color: "#7C3AED",
    icon: "🏠",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u10-L1", title: "Why a Home Observatory?", description: "The benefits of a permanent setup and whether it's right for you.", icon: "📝", xpReward: 20, questions: [] },
      { id: "sp-sec12-u10-L2", title: "Site Selection and Pier Design", description: "Choosing the best spot in your yard and building a stable telescope pier.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u10-L3", title: "Roll-Off Roof Observatories", description: "Design and build the most popular type of amateur home observatory.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec12-u10-L4", title: "Remote and Automated Observing", description: "Control your telescope and camera from inside the house or anywhere in the world.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec12-u10-L5", title: "Maintenance and Best Practices", description: "Keep your observatory running smoothly year after year.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  {
    id: "sp-sec12-u11",
    title: "Review + Checkpoint: Astrophotography & Amateur Astronomy",
    description: "Comprehensive review covering all topics from planning and setup to imaging, filters, citizen science, and observatories.",
    color: "#7C3AED",
    icon: "🏁",
    sectionIndex: 11,
    sectionTitle: "Astrophotography & Amateur Astronomy",
    lessons: [
      { id: "sp-sec12-u11-L1", title: "Review: The Complete Observer", description: "Test your knowledge of planning, setup, and finding objects.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec12-u11-L2", title: "Review: Astrophotography Mastery", description: "Test your understanding of imaging techniques, stacking, processing, and filters.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec12-u11-L3", title: "Review: Citizen Science and Observatories", description: "Test your knowledge of citizen science, data reporting, and observatory design.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec12-u11-L4", title: "Section 12 Checkpoint Challenge", description: "A comprehensive challenge covering all of Astrophotography and Amateur Astronomy. Prove your mastery.", icon: "📝", xpReward: 35, questions: [] },
    ],
  },


  // ── Section 14: Space Frontiers (10 units from section-14-frontiers-part1 and part2) ──
  {
    id: "sp-sec14-u1", title: "Mars Colonization",
    description: "Explore why Mars is the top destination for human settlement and what it takes to live there.",
    color: "#EF4444", icon: "🏠", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u1-L1", title: "Why Mars?", description: "What makes Mars the best candidate for humanity's first off-world colony.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u1-L2", title: "Challenges of Living on Mars", description: "The dangers colonists will face from radiation, thin air, cold, and isolation.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u1-L3", title: "Terraforming Mars", description: "Could we transform Mars into a world with breathable air and flowing water?", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u1-L4", title: "Designing a Mars Base", description: "What a functioning Mars settlement needs to keep people alive and productive.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec14-u2", title: "Moon as a Stepping Stone",
    description: "Learn why returning to the Moon is the first step toward deeper space exploration.",
    color: "#C0C0C0", icon: "🌙", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u2-L1", title: "Why Return to the Moon?", description: "The Moon is close, resource-rich, and the perfect place to practice for Mars.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u2-L2", title: "Mining the Moon", description: "The valuable resources hidden on and beneath the lunar surface.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u2-L3", title: "The Lunar Gateway Station", description: "A small space station orbiting the Moon as a waypoint for deep space missions.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u2-L4", title: "Building a Lunar Base", description: "How to construct permanent shelters on the Moon using local materials and robots.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec14-u3", title: "Space Mining",
    description: "Discover how mining asteroids and other bodies could fuel the space economy and protect Earth's resources.",
    color: "#F59E0B", icon: "⛏️", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u3-L1", title: "Why Mine Asteroids?", description: "The case for extracting resources from space rocks instead of Earth.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u3-L2", title: "How Asteroid Mining Works", description: "The techniques and technology needed to extract resources from space rocks.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u3-L3", title: "Water: The Oil of Space", description: "Why water is the most valuable resource for building a space economy.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u3-L4", title: "Rare Earth Metals from Space", description: "How space mining could supply the critical materials our technology depends on.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec14-u4", title: "Review: Near-Future Space",
    description: "Test your knowledge of Mars colonization, lunar bases, and space mining.",
    color: "#8B5CF6", icon: "🔄", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u4-L1", title: "Review: Mars and the Moon", description: "Revisit Mars colonization, lunar resources, and Gateway.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u4-L2", title: "Review: Space Mining", description: "Test your knowledge of asteroid mining, water economy, and rare metals from space.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec14-u5", title: "Space Elevators and Megastructures",
    description: "Imagine the most ambitious engineering projects humanity might build in the future.",
    color: "#3B82F6", icon: "🏗️", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u5-L1", title: "The Space Elevator Concept", description: "A cable from Earth to space that replaces rockets with a simple ride up.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u5-L2", title: "O'Neill Cylinders", description: "Giant rotating habitats that bring Earth-like living to deep space.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u5-L3", title: "Dyson Spheres and Megastructures", description: "The ultimate engineering challenge: capturing all of a star's energy.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u5-L4", title: "Building the Impossible", description: "The engineering barriers standing between us and megastructures.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec14-u6", title: "Interstellar Travel",
    description: "Explore the enormous challenges of traveling between stars and the concepts that might make it possible.",
    color: "#6366F1", icon: "✨", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u6-L1", title: "The Vastness of Interstellar Space", description: "Understanding why traveling to other stars is so incredibly difficult.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u6-L2", title: "Generation Ships", description: "Spacecraft where multiple generations live and die during the journey to another star.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u6-L3", title: "Propulsion for the Stars", description: "The propulsion concepts that might one day carry us between stars.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec14-u6-L4", title: "Warp Drives and Exotic Physics", description: "Could we bend space itself to travel faster than light?", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec14-u7", title: "The Future of Space Telescopes",
    description: "Discover the next generation of space telescopes and observatories that will reveal the universe's deepest secrets.",
    color: "#14B8A6", icon: "🔭", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u7-L1", title: "Beyond James Webb", description: "The next generation of space telescopes being planned and built.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u7-L2", title: "Gravitational Wave Observatories", description: "Listening to the universe through ripples in spacetime itself.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u7-L3", title: "Telescope Technology Breakthroughs", description: "New technologies that will push telescope capabilities to their limits.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec14-u8", title: "Space Law and Governance",
    description: "Learn the international laws, treaties, and challenges that govern how humanity uses space.",
    color: "#F97316", icon: "⚖️", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u8-L1", title: "The Outer Space Treaty", description: "The foundational international treaty governing space activities since 1967.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u8-L2", title: "Property Rights in Space", description: "Who owns the resources mined from asteroids or the Moon?", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u8-L3", title: "Space Debris Law", description: "The legal challenges of managing millions of pieces of orbital junk.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u8-L4", title: "Governing Off-World Settlements", description: "What laws apply when humans live permanently on another world?", icon: "📝", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec14-u9", title: "Becoming a Space Professional",
    description: "Discover the many career paths in the space industry and how anyone can contribute to exploration.",
    color: "#10B981", icon: "🧑‍🚀", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u9-L1", title: "Careers in the Space Industry", description: "The space industry needs far more than just astronauts.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u9-L2", title: "Citizen Science in Space", description: "How ordinary people contribute real discoveries to space science.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u9-L3", title: "Education and Skills for Space", description: "What to study and what skills to build for a career in the space industry.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec14-u9-L4", title: "Contributing Without a Space Job", description: "Ways anyone can support and participate in space exploration.", icon: "📝", xpReward: 25, questions: [] },
    ],
  },

  {
    id: "sp-sec14-u10", title: "Section 14 Review",
    description: "Test your knowledge across all of Section 14: Mars, Moon, mining, interstellar travel, telescopes, law, and careers.",
    color: "#8B5CF6", icon: "🏆", sectionIndex: 13, sectionTitle: "Space Frontiers",
    lessons: [
      { id: "sp-sec14-u10-L1", title: "Space Frontiers Comprehensive Review", description: "Review everything from Mars colonization to space careers.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec14-u10-L2", title: "Space Frontiers Scenarios", description: "Apply your knowledge to complex situations spanning the entire section.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },


  // ── Section 13: Space Technology & Engineering (Part 1, 5 units) ──
  {
    id: 'sp-sec13-u1', title: 'Satellite Design and Orbits',
    description: 'Learn how satellites are built, how they stay in orbit, and why different missions need different altitudes.',
    color: '#6366F1', icon: '🛰️', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u1-L1', title: 'What Makes a Satellite', description: 'The basic building blocks every satellite needs to work in space.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec13-u1-L2', title: 'Why Satellites Stay Up', description: 'The physics of orbits and why satellites do not fall straight down.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec13-u1-L3', title: 'Choosing the Right Orbit', description: 'Different missions need different orbits, from low Earth to geostationary and beyond.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u1-L4', title: 'Changing Orbits with Delta-V', description: 'How spacecraft change their orbits using thrust and the concept of delta-v.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u1-L5', title: 'Surviving the Space Environment', description: 'The extreme conditions satellites must endure: vacuum, radiation, temperature swings, and debris.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec13-u2', title: 'How We Talk to Spacecraft',
    description: 'Understand how radio signals travel between Earth and spacecraft across millions of kilometers.',
    color: '#3B82F6', icon: '📡', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u2-L1', title: 'Radio Waves Across Space', description: 'Why radio waves are the primary method for communicating with spacecraft.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec13-u2-L2', title: 'The Deep Space Network', description: 'NASA\'s global array of giant dish antennas that keeps contact with distant spacecraft.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec13-u2-L3', title: 'Uplink, Downlink, and Data Rates', description: 'How commands travel up and science data comes down, and why bandwidth matters.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u2-L4', title: 'Antennas and Signal Processing', description: 'Different antenna designs and how spacecraft extract clean data from noisy signals.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u2-L5', title: 'Laser Links and Future Communications', description: 'How optical communication could revolutionize data rates from deep space.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec13-u3', title: 'Solar, RTGs, and Batteries',
    description: 'Explore the three main power sources that keep spacecraft alive, from sunlit panels to nuclear generators.',
    color: '#F59E0B', icon: '⚡', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u3-L1', title: 'Solar Panels in Space', description: 'How solar panels work, their efficiency, and why they are the most common spacecraft power source.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec13-u3-L2', title: 'Nuclear Power with RTGs', description: 'How radioactive decay provides reliable electricity for missions far from the Sun.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u3-L3', title: 'Batteries for Eclipse and Peaks', description: 'How spacecraft store energy for when the Sun is blocked or demand spikes.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u3-L4', title: 'Choosing the Right Power Source', description: 'How engineers pick between solar, RTG, and other options based on mission needs.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u3-L5', title: 'Real-World Power Tradeoffs', description: 'Advanced considerations engineers face when designing spacecraft power systems.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec13-u4', title: 'Review: Satellites, Comms, and Power',
    description: 'Test your knowledge across satellite design, communication systems, and power sources.',
    color: '#8B5CF6', icon: '🔄', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u4-L1', title: 'Satellites and Orbits Recap', description: 'Review satellite subsystems, orbital mechanics, and orbit types.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u4-L2', title: 'Space Communication Recap', description: 'Review how we send commands and receive data across the solar system.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u4-L3', title: 'Power Systems Recap', description: 'Review solar panels, RTGs, batteries, and how engineers choose between them.', icon: '📝', xpReward: 25, questions: [] },
    ],
  },

  {
    id: 'sp-sec13-u5', title: 'Life Support and Habitation',
    description: 'Discover how engineers keep humans alive in space with air, water, food, and radiation shielding.',
    color: '#10B981', icon: '🏠', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u5-L1', title: 'Keeping Humans Alive in Space', description: 'The fundamental requirements for human survival and how spacecraft provide them.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'sp-sec13-u5-L2', title: 'Breathing in Space', description: 'How spacecraft generate oxygen, remove CO2, and manage atmospheric pressure.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u5-L3', title: 'Water Recycling and Feeding a Crew', description: 'How spacecraft recycle water and provide nutrition for long-duration missions.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u5-L4', title: 'Shielding Crews from Radiation', description: 'The radiation threats in space and how engineers protect astronauts from them.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u5-L5', title: 'Designing a Home in Space', description: 'How engineers design living spaces for crews spending months or years away from Earth.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },


  // ── Section 13: Space Technology & Engineering (Part 2, 5 units) ──
  {
    id: 'sp-sec13-u6', title: 'Space Debris & Orbital Traffic Management',
    description: 'Learn why millions of debris fragments threaten active satellites and how agencies track and avoid them.',
    color: '#6366F1', icon: '🛰️', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u6-L1', title: 'The Growing Debris Problem', description: 'Why orbital junk is one of the biggest threats to spaceflight today.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u6-L2', title: 'Kessler Syndrome and Cascading Collisions', description: 'How one collision can trigger a chain reaction that threatens entire orbital zones.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u6-L3', title: 'Tracking and Conjunction Assessment', description: 'How ground-based and space-based sensors track debris and predict close approaches.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u6-L4', title: 'Active Debris Removal and Mitigation', description: 'Technologies and policies being developed to clean up orbit and prevent future debris.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u6-L5', title: 'Mega-Constellations and Orbital Safety', description: 'How large satellite constellations change the debris risk landscape and what safeguards are needed.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec13-u7', title: 'In-Space Manufacturing & 3D Printing',
    description: 'Explore how microgravity enables new manufacturing processes and why building in space could transform exploration.',
    color: '#8B5CF6', icon: '🏭', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u7-L1', title: 'Why Manufacture in Space?', description: 'The advantages of building things in microgravity instead of launching them from Earth.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u7-L2', title: '3D Printing in Microgravity', description: 'How additive manufacturing works in space and what\'s been printed on the ISS.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u7-L3', title: 'Materials and Metal Printing in Space', description: 'Advanced materials and metal printing that push space manufacturing beyond plastic parts.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u7-L4', title: 'Orbital Factories and Commercial Applications', description: 'How companies plan to build commercial factories in orbit and what products they aim to produce.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u7-L5', title: 'Building Habitats from Local Resources', description: 'How 3D printing with regolith and ISRU could build lunar and Martian structures.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec13-u8', title: 'Space Tourism: Engineering for Passengers',
    description: 'Discover the engineering challenges of carrying paying passengers to space safely and comfortably.',
    color: '#EC4899', icon: '🎟️', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u8-L1', title: 'From Astronauts to Tourists', description: 'How spaceflight is being redesigned for people without years of training.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u8-L2', title: 'G-Forces and Passenger Comfort', description: 'How engineers manage acceleration loads to keep untrained passengers safe and comfortable.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u8-L3', title: 'Life Support for Short Missions', description: 'How tourist vehicles provide breathable air, temperature control, and emergency systems for civilians.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u8-L4', title: 'Space Hotels and Extended Tourist Stays', description: 'Engineering challenges of hosting tourists in orbit for days or weeks.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u8-L5', title: 'Regulation and Space Tourism\'s Future', description: 'How governments regulate commercial spaceflight and what the industry might look like in coming decades.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec13-u9', title: 'Future Propulsion: Ion Drives, Solar Sails, Nuclear',
    description: 'Explore advanced propulsion technologies that could carry spacecraft faster and farther than chemical rockets.',
    color: '#F97316', icon: '🚀', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u9-L1', title: 'Why Chemical Rockets Aren\'t Enough', description: 'The limitations of chemical propulsion and why we need alternatives for deep space.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u9-L2', title: 'Ion Drives and Hall Thrusters', description: 'How electric propulsion accelerates ions to extreme speeds for efficient space travel.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'sp-sec13-u9-L3', title: 'Solar Sails: Sailing on Sunlight', description: 'How spacecraft can accelerate using nothing but the pressure of sunlight.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u9-L4', title: 'Nuclear Propulsion for Deep Space', description: 'How nuclear reactors could power faster trips to Mars and beyond.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u9-L5', title: 'Exotic Propulsion Concepts', description: 'From antimatter engines to laser sails, the propulsion ideas that could reach other stars.', icon: '📝', xpReward: 30, questions: [] },
    ],
  },

  {
    id: 'sp-sec13-u10', title: 'Space Technology Review',
    description: 'Test your mastery of spacecraft design, life support, debris, manufacturing, tourism, and advanced propulsion.',
    color: '#10B981', icon: '🏆', sectionIndex: 12, sectionTitle: 'Space Technology & Engineering',
    lessons: [
      { id: 'sp-sec13-u10-L1', title: 'Checkpoint: Debris and Orbital Safety', description: 'Prove your knowledge of space debris, Kessler syndrome, tracking, and mitigation.', icon: '✅', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u10-L2', title: 'Checkpoint: In-Space Manufacturing', description: 'Prove your knowledge of 3D printing, ISRU, orbital factories, and material processing.', icon: '✅', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u10-L3', title: 'Checkpoint: Space Tourism Engineering', description: 'Prove your knowledge of tourist vehicle design, safety, g-forces, and regulation.', icon: '✅', xpReward: 30, questions: [] },
      { id: 'sp-sec13-u10-L4', title: 'Checkpoint: Advanced Propulsion', description: 'Prove your mastery of ion drives, solar sails, nuclear propulsion, and exotic concepts.', icon: '✅', xpReward: 30, questions: [] },
    ],
  },


  // ── Section 15: Mastery & Synthesis (8 units from section-15-capstone-part1 and part2) ──

  {
    id: "sp-sec15-u1",
    title: "Science Communication",
    description: "Learn how to explain space concepts clearly so anyone can understand and get excited about the cosmos.",
    color: "#3B82F6",
    icon: "🗣️",
    sectionIndex: 14,
    sectionTitle: "Mastery & Synthesis",
    lessons: [
      { id: "sp-sec15-u1-L1", title: "Explaining Space to Non-Experts", description: "How to take complex astronomy and make it understandable for anyone.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u1-L2", title: "Analogies That Work", description: "The best analogies for explaining scale, distance, and cosmic phenomena.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u1-L3", title: "Common Misconceptions to Correct", description: "The most common space myths and how to debunk them effectively.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u1-L4", title: "Science Communication Conversation", description: "Practice explaining space concepts to a non-expert audience.", icon: "💬", type: "conversation", xpReward: 30, questions: [] },
      { id: "sp-sec15-u1-L5", title: "Public Engagement Speed Round", description: "Race the clock on science communication concepts.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec15-u2",
    title: "Evaluating Space News",
    description: "Learn to separate real discoveries from hype and clickbait in space reporting.",
    color: "#10B981",
    icon: "📰",
    sectionIndex: 14,
    sectionTitle: "Mastery & Synthesis",
    lessons: [
      { id: "sp-sec15-u2-L1", title: "Clickbait vs. Real Discoveries", description: "How to tell genuine breakthroughs from exaggerated headlines.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u2-L2", title: "Reading Press Releases", description: "How to read between the lines of space agency announcements.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u2-L3", title: "Peer Review in Astronomy", description: "How the scientific review process works and why it matters.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u2-L4", title: "Media Literacy for Space Conversation", description: "Practice evaluating real space news stories for accuracy.", icon: "💬", type: "conversation", xpReward: 30, questions: [] },
      { id: "sp-sec15-u2-L5", title: "Space News Speed Round", description: "Race the clock on media literacy for space news.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec15-u3",
    title: "The Overview Effect",
    description: "Explore how seeing Earth from space transforms astronauts' perspectives on life.",
    color: "#6366F1",
    icon: "🌍",
    sectionIndex: 14,
    sectionTitle: "Mastery & Synthesis",
    lessons: [
      { id: "sp-sec15-u3-L1", title: "What the Overview Effect Is", description: "The cognitive shift astronauts experience when seeing Earth from space.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u3-L2", title: "Astronaut Perspectives", description: "How individual astronauts describe their transformative experience.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u3-L3", title: "Space and Philosophy", description: "How space exploration connects to humanity's biggest philosophical questions.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u3-L4", title: "Overview Effect Conversation", description: "Discuss how the overview effect might change your own perspective.", icon: "💬", type: "conversation", xpReward: 30, questions: [] },
      { id: "sp-sec15-u3-L5", title: "Cosmic Perspective Speed Round", description: "Race the clock on overview effect and cosmic perspective concepts.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec15-u4",
    title: "Review: Communication and Perspective",
    description: "Prove your mastery of science communication, media literacy, and cosmic perspective.",
    color: "#8B5CF6",
    icon: "🔄",
    sectionIndex: 14,
    sectionTitle: "Mastery & Synthesis",
    lessons: [
      { id: "sp-sec15-u4-L1", title: "Checkpoint: Communication and Media", description: "Test your knowledge of science communication and media evaluation.", icon: "✅", xpReward: 30, questions: [] },
      { id: "sp-sec15-u4-L2", title: "Applied Scenarios: Communicate and Evaluate", description: "Apply communication and evaluation skills to realistic scenarios.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec15-u4-L3", title: "Communication Review Speed Round", description: "Rapid recall of communication and perspective concepts.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec15-u5",
    title: "Space Careers",
    description: "Explore the many career paths that contribute to space exploration and discovery.",
    color: "#F59E0B",
    icon: "🧑‍🚀",
    sectionIndex: 14,
    sectionTitle: "Mastery & Synthesis",
    lessons: [
      { id: "sp-sec15-u5-L1", title: "The Astronaut Path", description: "What it actually takes to become an astronaut and what they do every day.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u5-L2", title: "Engineering and Mission Control", description: "The engineers and controllers who make spaceflight possible from the ground.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u5-L3", title: "Astronomy and Research Careers", description: "How to turn a passion for space into a research career.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u5-L4", title: "Career Planning Conversation", description: "Explore which space career path fits your interests and skills.", icon: "💬", type: "conversation", xpReward: 30, questions: [] },
      { id: "sp-sec15-u5-L5", title: "Space Careers Speed Round", description: "Race the clock on space career knowledge.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec15-u6",
    title: "Cross-Domain Synthesis",
    description: "See how physics, chemistry, and biology all connect through space science.",
    color: "#EC4899",
    icon: "🔗",
    sectionIndex: 14,
    sectionTitle: "Mastery & Synthesis",
    lessons: [
      { id: "sp-sec15-u6-L1", title: "Physics in Space", description: "How the fundamental laws of physics govern everything in the cosmos.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u6-L2", title: "Chemistry in Space", description: "How chemistry builds the elements and molecules that make up the universe.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u6-L3", title: "Biology in Space", description: "How life adapts to, and is shaped by, the conditions of space.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u6-L4", title: "Combining Disciplines Conversation", description: "Discuss how multiple sciences work together in space exploration.", icon: "💬", type: "conversation", xpReward: 30, questions: [] },
      { id: "sp-sec15-u6-L5", title: "Cross-Domain Speed Round", description: "Race the clock on cross-domain space science.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec15-u7",
    title: "Biggest Unsolved Questions",
    description: "Explore the mysteries that keep astronomers searching for answers.",
    color: "#EF4444",
    icon: "❓",
    sectionIndex: 14,
    sectionTitle: "Mastery & Synthesis",
    lessons: [
      { id: "sp-sec15-u7-L1", title: "Dark Matter and Dark Energy", description: "The invisible forces that make up most of the universe.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u7-L2", title: "The Origin of Life", description: "How life might have started on Earth and whether it exists elsewhere.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u7-L3", title: "Are We Alone?", description: "The search for extraterrestrial intelligence and what we might find.", icon: "📝", xpReward: 25, questions: [] },
      { id: "sp-sec15-u7-L4", title: "Mysteries of the Cosmos Conversation", description: "Discuss the biggest unsolved questions in space science.", icon: "💬", type: "conversation", xpReward: 30, questions: [] },
      { id: "sp-sec15-u7-L5", title: "Unsolved Mysteries Speed Round", description: "Race the clock on unsolved questions in astronomy.", icon: "⚡", type: "speed-round", xpReward: 30, questions: [] },
    ],
  },

  {
    id: "sp-sec15-u8",
    title: "Final Capstone: Comprehensive Challenge",
    description: "The ultimate test of everything you've learned across the entire course.",
    color: "#FBBF24",
    icon: "🏆",
    sectionIndex: 14,
    sectionTitle: "Mastery & Synthesis",
    lessons: [
      { id: "sp-sec15-u8-L1", title: "Solar System and Stars Synthesis", description: "Synthesize your knowledge of the solar system and stellar physics.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec15-u8-L2", title: "Galaxies and Cosmology Synthesis", description: "Synthesize your knowledge of galaxies, dark matter, and the universe.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec15-u8-L3", title: "Rockets and Exploration Synthesis", description: "Synthesize your knowledge of rockets, missions, and space technology.", icon: "📝", xpReward: 30, questions: [] },
      { id: "sp-sec15-u8-L4", title: "Comprehensive Challenge Conversation", description: "Apply everything to a comprehensive space science case study.", icon: "💬", type: "conversation", xpReward: 35, questions: [] },
      { id: "sp-sec15-u8-L5", title: "Final Comprehensive Speed Round", description: "The ultimate speed round covering every section of the course.", icon: "⚡", type: "speed-round", xpReward: 35, questions: [] },
    ],
  },
];
