/**
 * Machine parts image mapping for chapter completion celebrations.
 * Each chapter unlocks one robot part. Completing all chapters reveals
 * the fully assembled machine (a bulldozer robot).
 *
 * Images are cropped from a single sprite sheet and stored in /public/parts/.
 */

export interface MachinePart {
  /** Image filename in /public/parts/ */
  image: string;
  /** Display name shown during celebration */
  name: string;
}

/**
 * Maps chapter index (0–10) to a machine part.
 * Part 8 in the sprite sheet is the assembled machine (skipped here).
 */
export const machineParts: MachinePart[] = [
  { image: '/parts/part-0.png', name: 'Gripper Arm' },
  { image: '/parts/part-1.png', name: 'Hydraulic Arm' },
  { image: '/parts/part-2.png', name: 'Control Panel' },
  { image: '/parts/part-3.png', name: 'Inspector Bot' },
  { image: '/parts/part-4.png', name: 'Track Assembly' },
  { image: '/parts/part-5.png', name: 'Chassis Module' },
  { image: '/parts/part-6.png', name: 'Spider Crawler' },
  { image: '/parts/part-7.png', name: 'Power Claw' },
  { image: '/parts/part-9.png', name: 'Precision Arm' },
  { image: '/parts/part-10.png', name: 'Saw Blade' },
  { image: '/parts/part-11.png', name: 'Filter Core' },
];

/** The fully assembled machine shown when all chapters are complete */
export const assembledMachine = '/parts/part-8.png';
