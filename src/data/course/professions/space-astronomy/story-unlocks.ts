import type { StoryUnlockEntry } from '../../character-arcs';

export const spaceStoryUnlocks: StoryUnlockEntry[] = [
  // After Section 1 "Looking Up": Kai's first real stargazing session
  {
    id: 'space-story-1',
    afterSectionIndex: 1,
    characterId: 'space-kai',
    dialogue: "Dude. I went outside last night with just my eyes and spotted Jupiter, Orion's belt, and the Andromeda galaxy as a tiny smudge. No telescope, no app. Just me and 4,000 stars. I stood there for an hour and forgot it was freezing.",
    gemReward: 10,
  },
  // After Section 2 "The Solar System": Captain Nova remembers her first launch
  {
    id: 'space-story-2',
    afterSectionIndex: 2,
    characterId: 'space-nova',
    dialogue: "I remember the moment the engines lit. Eight minutes of violent shaking, then silence. When I looked out the cupola for the first time, I saw the Sahara sliding past below us. The whole desert in one glance. Nothing prepares you for how thin the line is between Earth and space.",
    gemReward: 10,
  },
  // After Section 3 "Earth & Moon" early: Kai spots Mars through his telescope
  {
    id: 'space-story-3',
    afterSectionIndex: 3,
    characterId: 'space-kai',
    dialogue: "I pointed my Dobsonian at Mars last night and saw an actual tiny orange disk. Not a dot. A disk. With a darker patch that might've been Syrtis Major. That's insane. I'm looking at a volcano bigger than Everest from my backyard.",
    callbackLine: 'Kai went from naked-eye stargazing to resolving surface features on another planet.',
    gemReward: 10,
  },
  // After Section 4 "Light & Telescopes": Nova on seeing Saturn's rings from the ISS
  {
    id: 'space-story-4',
    afterSectionIndex: 4,
    characterId: 'space-nova',
    dialogue: "We had a small telescope on the ISS, a Celestron 8-inch. On a quiet shift I pointed it at Saturn. No atmosphere to blur it, no light pollution. The rings were knife-sharp, the Cassini Division perfectly clear. I floated there, mouth open, like a kid. Some things never get old.",
    gemReward: 10,
  },
  // After Section 5 "Galaxies": Kai watches his first lunar eclipse
  {
    id: 'space-story-5',
    afterSectionIndex: 5,
    characterId: 'space-kai',
    dialogue: "I stayed up for the total lunar eclipse last month. Watched the Moon turn this deep copper red over about an hour. My mom came out and asked why the Moon looked broken. I explained Earth's shadow and Rayleigh scattering, and she actually listened. First time astronomy made me feel like I knew something real.",
    callbackLine: 'Kai used to ask the questions. Now he is answering them.',
    gemReward: 10,
  },
  // After Section 6 "Black Holes & Extreme Physics": Nova on the Overview Effect
  {
    id: 'space-story-6',
    afterSectionIndex: 6,
    characterId: 'space-nova',
    dialogue: "Astronauts call it the Overview Effect. You orbit Earth 16 times a day, and after a while something shifts. Borders disappear. You stop seeing countries and start seeing one planet, wrapped in a paper-thin atmosphere. I came back with a different relationship to the word 'home.'",
    gemReward: 10,
  },
  // After Section 7 "Cosmology": Kai upgrades his understanding of his own scope
  {
    id: 'space-story-7',
    afterSectionIndex: 7,
    characterId: 'space-kai',
    dialogue: "I always thought my telescope just 'magnified stuff.' Now I get that my 8-inch mirror is collecting 800 times more light than my eye. That's why I can see galaxies 50 million light-years away from my driveway. My scope isn't a magnifier. It's a time machine.",
    callbackLine: 'The kid who said "that\'s insane" about Mars now understands why his telescope works.',
    gemReward: 10,
  },
  // After Section 8 "Rockets & Orbital Mechanics": Nova on JWST's first deep field
  {
    id: 'space-story-8',
    afterSectionIndex: 8,
    characterId: 'space-nova',
    dialogue: "When the JWST team released its first deep field image, I cried. I don't say that lightly. A mirror the size of a tennis court, parked 1.5 million kilometers from Earth, staring at a patch of sky smaller than a grain of sand at arm's length. And in that grain: thousands of galaxies. Some from 13 billion years ago. We built that.",
    gemReward: 10,
  },
  // After Section 9 "Space Exploration History": Kai realizes stars die
  {
    id: 'space-story-9',
    afterSectionIndex: 9,
    characterId: 'space-kai',
    dialogue: "This is the part that wrecked me. Stars die. Betelgeuse, that bright orange shoulder in Orion I spotted on my first night out, it's going to explode. Maybe tomorrow, maybe in 100,000 years. And when it does, it'll be visible in daylight. The sky I thought was permanent is actually a snapshot.",
    callbackLine: 'Kai stared at Betelgeuse on his first night. Now he knows what he was really looking at.',
    gemReward: 10,
  },
  // After Section 10 "Exoplanets & Astrobiology": Nova on a supernova remnant
  {
    id: 'space-story-10',
    afterSectionIndex: 10,
    characterId: 'space-nova',
    dialogue: "I observed the Crab Nebula through a ground scope once, and it looked like a fuzzy smudge. Boring, right? Then I learned that smudge is the shattered remains of a star that exploded in 1054 AD. Chinese astronomers recorded it as a 'guest star' bright enough to read by. That smudge is a graveyard and a nursery. New stars will form from its debris.",
    gemReward: 10,
  },
  // After Section 11 "Astrophotography & Amateur Astronomy": Kai grasps the Milky Way
  {
    id: 'space-story-11',
    afterSectionIndex: 11,
    characterId: 'space-kai',
    dialogue: "I drove 2 hours to a dark sky site last weekend. When my eyes adjusted, the Milky Way was so bright it cast a shadow. No way. A shadow from starlight. And every single one of those stars is inside our galaxy. There are 200 billion more galaxies out there. My brain kind of short-circuited.",
    callbackLine: 'The kid who stood in his backyard in the cold now drives 2 hours for darker skies.',
    gemReward: 10,
  },
  // Final: Nova and Kai look up together one last time
  {
    id: 'space-story-12',
    afterSectionIndex: 13,
    characterId: 'space-nova',
    dialogue: "Kai asked me once if going to space ruined the night sky for him, since I'd seen it without the atmosphere in the way. I told him the opposite. When I look up now, I remember what it felt like from the other side. The stars didn't change. I did. And so did you, Kai. You started with a telescope and some curiosity. Now you understand what you're looking at. That's not a small thing.",
    callbackLine: 'From "dude, I can see Jupiter\'s moons" to understanding your place in the cosmos.',
    gemReward: 10,
  },
];
