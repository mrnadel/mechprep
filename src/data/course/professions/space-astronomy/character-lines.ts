import type { CharacterLines } from '../../character-lines';

export const spaceCharacterLines: CharacterLines[] = [
  {
    characterId: 'space-nova',
    teachingLines: [
      { match: 'orbit', line: 'When I looked out the cupola during my 3,000th orbit, I finally understood what "falling around the Earth" really means.' },
      { match: 'star', line: 'From the ISS, stars do not twinkle. They burn steady and sharp. That changes how you think about them.' },
      { match: 'planet', line: 'Every planet in our system has a story. Learning those stories is the first step to understanding our own.' },
      { match: 'gravity', line: 'Gravity is not a force pulling you down. It is the shape of space itself. That took me years to truly feel.' },
      { match: 'light', line: 'When we look at distant galaxies, we are looking back in time. The light left before humans even existed.' },
      { match: 'rocket', line: 'Launch day is controlled chaos. Six million parts all doing exactly what they should, at exactly the right moment.' },
      { match: 'moon', line: 'The Moon is more than a neighbor. It stabilizes our axis, drives our tides, and lit the path for every explorer before us.' },
      { match: null, line: 'Take a moment with this one. In space, patience and precision keep you alive.' },
    ],
    resultLines: [
      { minAccuracy: 100, line: 'Mission complete, no errors. That is the kind of precision we trained for at the agency.' },
      { minAccuracy: 90, line: 'Strong performance. You would do well in mission control with that accuracy.' },
      { minAccuracy: 70, line: 'Good foundation. A few course corrections needed, but you are heading in the right direction.' },
      { minAccuracy: 50, line: 'Space is vast and complex. Review the areas that tripped you up and come back stronger.' },
      { minAccuracy: 0, line: 'Every astronaut fails simulations before they fly. This is your simulation. You will get there.' },
    ],
    celebrationLines: [
      { type: 'halfway', line: 'Halfway through the mission. Maintain focus and we will finish strong.' },
      { type: 'last-question', line: 'Final approach. Stay locked in and bring it home.' },
      { type: 'streak', line: 'Consistent work compounds like orbital velocity. You are building real momentum.' },
    ],
  },
  {
    characterId: 'space-kai',
    teachingLines: [
      { match: 'orbit', line: 'Dude, so the ISS is basically falling around Earth at 17,000 mph and just... never hits the ground? That is insane.' },
      { match: 'star', line: 'I pointed my scope at Betelgeuse last night and it was this deep orange color. Stars are not all white!' },
      { match: 'planet', line: 'Jupiter through a telescope is unreal. You can actually see the cloud bands with your own eyes.' },
      { match: 'gravity', line: 'So gravity bends space itself? That is like the universe is playing on a curved screen. Wild.' },
      { match: 'light', line: 'When I look at Andromeda, I am seeing light from 2.5 million years ago. My brain cannot even handle that.' },
      { match: 'rocket', line: 'The Saturn V had 7.5 million pounds of thrust. That is like strapping yourself to a controlled explosion.' },
      { match: 'moon', line: 'The Moon through my 8-inch Dob is incredible. You can see craters inside of craters. I stayed up until 3 AM.' },
      { match: null, line: 'Okay let me think about this one. Space facts always turn out to be way crazier than you expect.' },
    ],
    resultLines: [
      { minAccuracy: 100, line: 'Wait, perfect?! I got every single one?! This is the best day of my life, no exaggeration.' },
      { minAccuracy: 90, line: 'Dude, I am actually getting good at this! Space knowledge level: increasing rapidly.' },
      { minAccuracy: 70, line: 'Pretty solid! A few of those were super tricky but I am learning so much.' },
      { minAccuracy: 50, line: 'Some of those got me. Space is full of things that sound wrong but are totally true.' },
      { minAccuracy: 0, line: 'Okay that was tough. But honestly I learned a ton from the ones I got wrong.' },
    ],
    celebrationLines: [
      { type: 'halfway', line: 'Halfway already! This is like binge-watching a space documentary but I actually remember stuff.' },
      { type: 'last-question', line: 'Last question! Let me channel my inner astronaut and nail this.' },
      { type: 'streak', line: 'This streak is longer than a comet tail. Okay maybe not but it still feels amazing.' },
    ],
  },
];
