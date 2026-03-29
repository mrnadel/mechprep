/**
 * Lightweight course structure -- unit/lesson metadata WITHOUT question content.
 *
 * The full course data (~5 MB) contains inline SVG diagrams in every question.
 * Most UI components (CourseMap, CourseHeader, skills page) only need titles,
 * IDs, icons, and xpReward -- never the question text or diagrams.
 *
 * This module provides a Unit[]-compatible structure where each lesson's
 * `questions` array is empty.  Components that display the course map or
 * header import from here instead of the heavy `@/data/course` barrel.
 *
 * Full question data is loaded on demand via dynamic import() in the store's
 * startLesson action.
 *
 * Generated from actual course data -- keep in sync when lessons are added.
 */

import type { Unit } from './types';
import { financeCourseMeta } from './professions/personal-finance/meta';
import { psychologyCourseMeta } from './professions/psychology/meta';
import { spaceCourseMeta } from './professions/space-astronomy/meta';

const meCourseMeta: Unit[] = [
  {
    id: 'u1-statics',
    title: 'Statics & Equilibrium',
    description: 'Forces, moments, trusses, friction, and centroids \u2014 the foundation of mechanical analysis.',
    color: '#10B981',
    icon: '\u2696\uFE0F',
    topicId: 'engineering-mechanics',
    lessons: [
      { id: 'u1-L1', title: 'Force Systems & Resultants', description: 'Resultant forces, vector addition, components, concurrent and non-concurrent forces.', icon: "📝", xpReward: 20, questions: [] },
      { id: 'u1-L2', title: 'Free Body Diagrams', description: 'Drawing FBDs, reaction forces, constraints, and distributed loads.', icon: "📝", xpReward: 20, questions: [] },
      { id: 'u1-L3', title: 'Trusses & Frames', description: 'Method of joints, method of sections, zero-force members, and statical determinacy.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u1-L4', title: 'Friction & Wedges', description: 'Static and kinetic friction, friction coefficient, self-locking, and wedge analysis.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u1-L5', title: 'Centroids & Moments of Inertia', description: 'Centroid calculation, parallel axis theorem, composite shapes, and radius of gyration.', icon: "📝", xpReward: 25, questions: [] },
    ],
  },
  {
    id: 'u2-dynamics',
    title: 'Dynamics & Kinematics',
    description: 'Motion, forces, energy, momentum, and rotational dynamics for particles and rigid bodies.',
    color: '#3B82F6',
    icon: '\uD83D\uDE80',
    topicId: 'engineering-mechanics',
    lessons: [
      { id: 'u2-L1', title: 'Particle Kinematics', description: 'Position, velocity, acceleration, relative motion, curvilinear motion, and projectile motion.', icon: "📝", xpReward: 20, questions: [] },
      { id: 'u2-L2', title: "Newton's Laws Applied", description: 'F=ma applications, normal/tangential coordinates, pulleys, and inclined planes.', icon: "📝", xpReward: 20, questions: [] },
      { id: 'u2-L3', title: 'Work, Energy & Power', description: 'Work-energy theorem, conservation of energy, potential energy, and power calculations.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u2-L4', title: 'Impulse & Momentum', description: 'Linear and angular momentum, collisions, and coefficient of restitution.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u2-L5', title: 'Rotational Dynamics', description: 'Mass moment of inertia, angular momentum, gyroscopic effects, and rolling without slipping.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u2-L6', title: 'Free & Forced Vibration', description: 'Natural frequency, damping, resonance, transmissibility, and vibration isolation for SDOF systems.', icon: "📝", xpReward: 30, questions: [] },
    ],
  },
  {
    id: 'u3-strength',
    title: 'Strength of Materials',
    description: 'Stress, strain, bending, torsion, combined loading, and failure theories for structural design.',
    color: '#8B5CF6',
    icon: '\uD83D\uDCAA',
    topicId: 'strength-of-materials',
    lessons: [
      { id: 'u3-L1', title: 'Stress & Strain Fundamentals', description: "Normal and shear stress, engineering and true strain, stress-strain diagrams, elastic modulus, and Poisson's ratio.", icon: "📝", xpReward: 20, questions: [] },
      { id: 'u3-L2', title: 'Beam Bending', description: 'Bending stress formula, neutral axis, section modulus, and deflection formulas.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u3-L3', title: 'Shear & Bending Diagrams', description: 'SFD/BMD construction, distributed loads, concentrated loads, and maximum bending moment location.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u3-L4', title: 'Torsion', description: 'Torsion formula, polar moment, angle of twist, and power transmission.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u3-L5', title: "Mohr's Circle & Combined Loading", description: 'Principal stresses, maximum shear, plane stress transformation, and combined loading analysis.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u3-L6', title: 'Failure Theories', description: 'Von Mises, Tresca, Maximum Normal Stress, fatigue, S-N curves, endurance limit, and safety factors.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u3-L7', title: 'Column Buckling & Pressure Vessels', description: "Euler's critical load, effective length factors, slenderness ratio, Johnson's formula, and thin/thick-wall pressure vessel stress analysis.", icon: "📝", xpReward: 30, questions: [] },
    ],
  },
  {
    id: 'u4-thermo',
    title: 'Thermodynamics',
    description: 'Laws of thermodynamics, properties, cycles, and energy systems for mechanical engineers.',
    color: '#F59E0B',
    icon: '\uD83D\uDD25',
    topicId: 'thermodynamics',
    lessons: [
      { id: 'u4-L1', title: 'Properties & State', description: 'Intensive/extensive properties, phase diagrams, quality, ideal gas law, and specific heats.', icon: "📝", xpReward: 20, questions: [] },
      { id: 'u4-L2', title: 'First Law & Energy Balance', description: 'Closed and open systems, enthalpy, steady flow energy equation, and polytropic processes.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u4-L3', title: 'Second Law & Entropy', description: 'Clausius and Kelvin-Planck statements, Carnot cycle, entropy generation, and irreversibility.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u4-L4', title: 'Power Cycles', description: 'Rankine, Brayton, Otto, Diesel cycles, reheat, regeneration, and efficiency calculations.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u4-L5', title: 'Refrigeration & Heat Pumps', description: 'Vapor compression, COP, refrigerants, absorption cycle, and heat pump vs. air conditioner.', icon: "📝", xpReward: 25, questions: [] },
    ],
  },
  {
    id: 'u5-heat',
    title: 'Heat Transfer',
    description: 'Conduction, convection, radiation, heat exchangers, and extended surfaces for thermal design.',
    color: '#EF4444',
    icon: '\uD83C\uDF21\uFE0F',
    topicId: 'heat-transfer',
    lessons: [
      { id: 'u5-L1', title: 'Conduction', description: "Fourier's law, thermal resistance, composite walls, contact resistance, and critical radius of insulation.", icon: "📝", xpReward: 20, questions: [] },
      { id: 'u5-L2', title: 'Convection', description: "Newton's cooling law, dimensionless numbers, forced vs. natural convection, and correlations.", icon: "📝", xpReward: 25, questions: [] },
      { id: 'u5-L3', title: 'Radiation', description: 'Stefan-Boltzmann law, emissivity, view factors, blackbody and graybody, and radiation shields.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u5-L4', title: 'Heat Exchangers', description: 'LMTD method, NTU-effectiveness, parallel/counter/cross flow, fouling, and overall U.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u5-L5', title: 'Fins & Extended Surfaces', description: 'Fin efficiency, fin effectiveness, heat dissipation, fin types, and thermal design considerations.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u5-L6', title: 'Transient Conduction', description: 'Biot number, lumped capacitance method, time constant, semi-infinite solids, Heisler charts, and practical transient thermal problems.', icon: "📝", xpReward: 30, questions: [] },
    ],
  },
  {
    id: 'u6-fluids',
    title: 'Fluid Mechanics',
    description: 'Fluid properties, pipe flow, pumps, and dimensional analysis for mechanical engineering applications.',
    color: '#06B6D4',
    icon: '\uD83C\uDF0A',
    topicId: 'fluid-mechanics',
    lessons: [
      { id: 'u6-L1', title: 'Fluid Properties & Statics', description: "Viscosity, density, surface tension, Pascal's law, manometers, and hydrostatic forces on surfaces.", icon: "📝", xpReward: 20, questions: [] },
      { id: 'u6-L2', title: 'Bernoulli & Energy Equation', description: 'Bernoulli equation, venturi meter, pitot tube, energy line/HGL, assumptions and limitations.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u6-L3', title: 'Pipe Flow & Losses', description: 'Reynolds number, laminar vs turbulent, Moody chart, major/minor losses, Darcy-Weisbach, pipe networks.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u6-L4', title: 'Pumps & Turbomachinery', description: 'Pump curves, system curves, NPSH, cavitation, specific speed, affinity laws, pump selection.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u6-L5', title: 'Dimensional Analysis', description: 'Buckingham Pi theorem, dimensional homogeneity, similitude, Reynolds/Froude/Mach numbers, model testing.', icon: "📝", xpReward: 25, questions: [] },
    ],
  },
  {
    id: 'u7-how-things-work',
    title: 'How Things Work',
    description: 'Real-world engineering in everyday objects \u2014 from kitchen appliances to car engines, connecting theory to the mechanisms all around us.',
    color: '#78716C',
    icon: '\uD83D\uDD27',
    topicId: 'real-world-mechanisms',
    lessons: [
      { id: 'htw-L1', title: 'Kitchen Engineering', description: 'How pressure cookers, refrigerators, faucets, and kitchen knives use core engineering principles.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'htw-L2', title: 'The Car You Drive', description: 'How engines, brakes, suspension, tires, and transmissions apply thermodynamics, dynamics, and solid mechanics.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'htw-L3', title: 'Around the House', description: 'Discover the mechanical engineering principles hiding in everyday household items \u2014 from door hinges to AC units.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'htw-L4', title: 'Tools & Workshop', description: 'Analyze the engineering mechanics behind common hand tools and workshop equipment \u2014 torque, leverage, hydraulics, and more.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'htw-L5', title: 'Sports & Outdoors', description: 'Gear ratios on a bike, sweet spots on a racket, energy on a roller coaster \u2014 real sports equipment decoded through engineering.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'htw-L6', title: 'Buildings & Infrastructure', description: 'Elevators, bridges, cranes, and dams \u2014 the engineering principles hidden in the structures all around us.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'htw-L7', title: 'Everyday Failures', description: 'Why pipes burst, bolts loosen, chains break, and tires blow out \u2014 real-world failure analysis through everyday objects.', icon: "📝", xpReward: 25, questions: [] },
    ],
  },
  {
    id: 'u7-materials',
    title: 'Materials & Manufacturing',
    description: 'Material properties, phase diagrams, heat treatment, casting, forming, machining, and modern manufacturing processes.',
    color: '#F97316',
    icon: '\uD83C\uDFED',
    topicId: 'materials-engineering',
    lessons: [
      { id: 'u7-L1', title: 'Material Properties & Testing', description: 'Tensile test, hardness tests (Rockwell/Brinell/Vickers), impact testing, creep, fatigue properties.', icon: "📝", xpReward: 20, questions: [] },
      { id: 'u7-L2', title: 'Phase Diagrams & Heat Treatment', description: 'Iron-carbon diagram, TTT/CCT diagrams, annealing/normalizing/quenching/tempering, martensite/austenite/pearlite.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u7-L3', title: 'Casting & Forming', description: 'Sand/investment/die casting, forging, rolling, extrusion, drawing, defects, shrinkage allowance.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u7-L4', title: 'Machining & CNC', description: 'Turning/milling/drilling, cutting speed/feed/depth, tool wear, surface finish, CNC programming basics, G-code.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u7-L5', title: 'Modern Manufacturing', description: 'SLA/SLS/FDM/DMLS, design for additive, injection molding, sheet metal, DFM principles.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u7-L6', title: 'Welding & Joining', description: 'Welding processes (MIG/MAG, TIG, stick, laser), HAZ metallurgy, weld defects, joint design, fillet weld sizing, weldability, residual stresses and distortion control.', icon: "📝", xpReward: 30, questions: [] },
    ],
  },
  {
    id: 'u8-machine',
    title: 'Machine Design',
    description: 'Shafts, bearings, gears, fasteners, springs, and seals \u2014 core machine element design for mechanical engineers.',
    color: '#3B82F6',
    icon: '\u2699\uFE0F',
    topicId: 'machine-elements',
    lessons: [
      { id: 'u8-L1', title: 'Shafts & Keys', description: 'Shaft design for bending+torsion, keyway stress concentration, ASME shaft code, critical speed, whirling.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u8-L2', title: 'Bearings & Lubrication', description: 'Ball/roller/plain bearings, L10 life calculation, bearing selection, viscosity, lubrication regimes.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u8-L3', title: 'Gears & Power Transmission', description: 'Spur/helical/bevel/worm gears, Lewis equation, gear ratios, tooth contact stress, gear trains, efficiency.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u8-L4', title: 'Fasteners & Joints', description: 'Bolt preload, bolt stiffness, gasket factors, welded joints (fillet/butt), adhesive bonding, joint design.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u8-L5', title: 'Springs & Seals', description: 'Helical spring design, Wahl factor, spring rate, O-ring/lip seal/mechanical seal selection, PV limits.', icon: "📝", xpReward: 25, questions: [] },
    ],
  },
  {
    id: 'u9-gdt',
    title: 'GD&T & Tolerancing',
    description: 'Geometric dimensioning and tolerancing, datum systems, tolerance stack-ups, surface finish, and metrology.',
    color: '#EC4899',
    icon: '\uD83D\uDCCF',
    topicId: 'design-tolerancing',
    lessons: [
      { id: 'u9-L1', title: 'Tolerance Fundamentals', description: 'Tolerance/allowance, clearance/interference/transition fits, ISO/ANSI tolerance grades, bilateral/unilateral.', icon: "📝", xpReward: 20, questions: [] },
      { id: 'u9-L2', title: 'Geometric Tolerancing', description: 'Form (flatness, cylindricity, circularity, straightness), orientation (perpendicularity, angularity, parallelism), MMC/LMC, bonus tolerance.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u9-L3', title: 'Datum Systems', description: 'Datum features, datum reference frame, primary/secondary/tertiary datums, datum targets, fixturing.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u9-L4', title: 'Tolerance Stack-Up', description: 'Worst-case analysis, RSS (statistical), 1D chain analysis, gap analysis, tolerance allocation.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u9-L5', title: 'Surface Finish & Metrology', description: 'Ra/Rz/Rq, surface lay symbols, CMM basics, profilometry, measurement uncertainty.', icon: "📝", xpReward: 25, questions: [] },
    ],
  },
  {
    id: 'u10-interview',
    title: 'Interview Problem Solving',
    description: 'Estimation problems, failure analysis, design trade-offs, FEA interpretation, and real-world engineering case studies.',
    color: '#14B8A6',
    icon: '\uD83E\uDDE0',
    lessons: [
      { id: 'u10-L1', title: 'Estimation Problems', description: 'Back-of-envelope calculations, order-of-magnitude estimation, Fermi problems, quick sanity checks.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u10-L2', title: 'Failure Analysis', description: 'Root cause analysis, failure modes (fatigue, corrosion, overload, creep), fractography basics, 8D/fishbone.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u10-L3', title: 'Design Trade-offs', description: 'Material selection (Ashby charts), cost vs performance, weight optimization, DFM vs DFA, Pugh matrix.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u10-L4', title: 'FEA & Simulation', description: 'Mesh quality, boundary conditions, convergence, element types, interpreting stress results, singularities.', icon: "📝", xpReward: 25, questions: [] },
      { id: 'u10-L5', title: 'Case Studies & Scenarios', description: 'Real-world engineering problems, troubleshooting scenarios, design review situations, cross-disciplinary thinking.', icon: "📝", xpReward: 30, questions: [] },
      { id: 'u10-L6', title: 'Standards & Professional Practice', description: 'ISO/ASME standards, quality management systems, engineering change management, risk assessment, and project management for engineers.', icon: "📝", xpReward: 25, questions: [] },
    ],
  },
];

/** Backward-compatible alias — always points to ME course data */
export const courseMeta: Unit[] = meCourseMeta;

/**
 * Return course metadata for a given profession.
 * Lightweight (no question content), safe to import anywhere.
 */
export function getCourseMetaForProfession(professionId: string): Unit[] {
  switch (professionId) {
    case 'personal-finance': return financeCourseMeta;
    case 'psychology': return psychologyCourseMeta;
    case 'space-astronomy': return spaceCourseMeta;
    case 'mechanical-engineering':
    default: return meCourseMeta;
  }
}

export function getTotalLessonsMeta(professionId?: string): number {
  const meta = professionId ? getCourseMetaForProfession(professionId) : meCourseMeta;
  return meta.reduce((sum, unit) => sum + unit.lessons.length, 0);
}

export function getLessonByIdMeta(lessonId: string, professionId?: string): { unit: Unit; lesson: Unit['lessons'][number]; unitIndex: number; lessonIndex: number } | null {
  const meta = professionId ? getCourseMetaForProfession(professionId) : meCourseMeta;
  for (let ui = 0; ui < meta.length; ui++) {
    for (let li = 0; li < meta[ui].lessons.length; li++) {
      if (meta[ui].lessons[li].id === lessonId) {
        return { unit: meta[ui], lesson: meta[ui].lessons[li], unitIndex: ui, lessonIndex: li };
      }
    }
  }
  return null;
}

/**
 * Dynamically import the full Unit data (with questions) for a given unit index.
 * Returns the full Unit object including all question content.
 * Each unit file is loaded as a separate chunk (~60-600 KB each).
 */
export async function loadUnitData(unitIndex: number, professionId?: string): Promise<Unit> {
  if (professionId === 'personal-finance') {
    return loadFinanceUnit(unitIndex);
  }

  if (professionId === 'psychology') {
    return loadPsychologyUnit(unitIndex);
  }

  if (professionId === 'space-astronomy') {
    return loadSpaceUnit(unitIndex);
  }

  // Default: mechanical-engineering
  const loaders: (() => Promise<{ default?: Unit; [key: string]: any }>)[] = [
    () => import('./units/unit-1-statics').then(m => ({ ...m, default: m.unit1 })),
    () => import('./units/unit-2-dynamics').then(m => ({ ...m, default: m.unit2 })),
    () => import('./units/unit-3-strength').then(m => ({ ...m, default: m.unit3 })),
    () => import('./units/unit-4-thermo').then(m => ({ ...m, default: m.unit4 })),
    () => import('./units/unit-5-heat').then(m => ({ ...m, default: m.unit5 })),
    () => import('./units/unit-6-fluids').then(m => ({ ...m, default: m.unit6 })),
    () => import('./units/unit-7-how-things-work').then(m => ({ ...m, default: m.unitHowThingsWork })),
    () => import('./units/unit-7-materials').then(m => ({ ...m, default: m.unit7 })),
    () => import('./units/unit-8-machine').then(m => ({ ...m, default: m.unit8 })),
    () => import('./units/unit-9-gdt').then(m => ({ ...m, default: m.unit9 })),
    () => import('./units/unit-10-interview').then(m => ({ ...m, default: m.unit10 })),
  ];

  if (unitIndex < 0 || unitIndex >= loaders.length) {
    throw new Error(`Invalid unit index: ${unitIndex}`);
  }

  const mod = await loaders[unitIndex]();
  return mod.default!;
}

async function loadFinanceUnit(unitIndex: number): Promise<Unit> {
  const loaders: (() => Promise<Unit>)[] = [
    () => import('./professions/personal-finance/units/unit-0').then(m => m.unit0),
    () => import('./professions/personal-finance/units/unit-1').then(m => m.unit1),
    () => import('./professions/personal-finance/units/unit-5').then(m => m.unit5),
    () => import('./professions/personal-finance/units/unit-2').then(m => m.unit2),
    () => import('./professions/personal-finance/units/unit-11').then(m => m.unit11),
    () => import('./professions/personal-finance/units/unit-3').then(m => m.unit3),
    () => import('./professions/personal-finance/units/unit-4').then(m => m.unit4),
    () => import('./professions/personal-finance/units/unit-6').then(m => m.unit6),
    () => import('./professions/personal-finance/units/unit-10').then(m => m.unit10),
    () => import('./professions/personal-finance/units/unit-7').then(m => m.unit7),
    () => import('./professions/personal-finance/units/unit-9').then(m => m.unit9),
    () => import('./professions/personal-finance/units/unit-8').then(m => m.unit8),
    () => import('./professions/personal-finance/units/unit-12').then(m => m.unit12),
  ];

  // Units beyond what has full content files fall back to lightweight metadata
  if (unitIndex < 0 || unitIndex >= financeCourseMeta.length) {
    throw new Error(`Invalid finance unit index: ${unitIndex}`);
  }

  if (unitIndex >= loaders.length) {
    return financeCourseMeta[unitIndex];
  }

  return loaders[unitIndex]();
}

/**
 * Generic loader for professions that don't have full unit content files yet.
 * Returns lightweight metadata (no questions). Once unit files are created,
 * add profession-specific loaders like loadFinanceUnit above.
 */
async function loadPsychologyUnit(unitIndex: number): Promise<Unit> {
  const loaders: (() => Promise<Unit>)[] = [
    () => import('./professions/psychology/units/unit-1').then(m => m.unit1),
    () => import('./professions/psychology/units/unit-2').then(m => m.unit2),
    () => import('./professions/psychology/units/unit-3').then(m => m.unit3),
    () => import('./professions/psychology/units/unit-4').then(m => m.unit4),
    () => import('./professions/psychology/units/unit-5').then(m => m.unit5),
    () => import('./professions/psychology/units/unit-6').then(m => m.unit6),
    () => import('./professions/psychology/units/unit-7').then(m => m.unit7),
    () => import('./professions/psychology/units/unit-8').then(m => m.unit8),
    () => import('./professions/psychology/units/unit-9').then(m => m.unit9),
    () => import('./professions/psychology/units/unit-10').then(m => m.unit10),
  ];
  if (unitIndex < 0 || unitIndex >= loaders.length) {
    throw new Error(`Invalid psychology unit index: ${unitIndex}`);
  }
  return loaders[unitIndex]();
}

async function loadSpaceUnit(unitIndex: number): Promise<Unit> {
  const loaders: (() => Promise<Unit>)[] = [
    () => import('./professions/space-astronomy/units/unit-1').then(m => m.unit1),
    () => import('./professions/space-astronomy/units/unit-2').then(m => m.unit2),
    () => import('./professions/space-astronomy/units/unit-3').then(m => m.unit3),
    () => import('./professions/space-astronomy/units/unit-4').then(m => m.unit4),
    () => import('./professions/space-astronomy/units/unit-5').then(m => m.unit5),
    () => import('./professions/space-astronomy/units/unit-6').then(m => m.unit6),
    () => import('./professions/space-astronomy/units/unit-7').then(m => m.unit7),
    () => import('./professions/space-astronomy/units/unit-8').then(m => m.unit8),
    () => import('./professions/space-astronomy/units/unit-9').then(m => m.unit9),
    () => import('./professions/space-astronomy/units/unit-10').then(m => m.unit10),
  ];
  if (unitIndex < 0 || unitIndex >= loaders.length) {
    throw new Error(`Invalid space unit index: ${unitIndex}`);
  }
  return loaders[unitIndex]();
}
