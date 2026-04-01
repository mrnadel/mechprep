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
    description: 'Forces, moments, trusses, friction, and centroids: the foundation of mechanical analysis.',
    color: '#10B981',
    icon: '\u2696\uFE0F',
    topicId: 'engineering-mechanics',
    lessons: [
      { id: 'u1-L1', title: 'Forces as Vectors', description: 'Break forces into components and combine them using vector math.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u1-L1b', title: 'Moments and Couples', description: "Calculate moments using cross products, Varignon's theorem, and couple pairs.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'u1-L1c', title: 'Equilibrium Equations', description: 'Apply equilibrium conditions to solve for unknown forces in 2D and 3D.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u1-L2', title: 'Drawing Free Body Diagrams', description: 'Isolate objects and draw all external forces, reactions, and loads.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u1-L2b', title: 'Support Reactions', description: 'Identify support types and compute reaction forces using equilibrium.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u1-L2c', title: 'Solving Beam Problems', description: 'Use moment equations, internal forces, and determinacy checks on beams.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u1-L3', title: 'Truss Fundamentals', description: 'Understand truss assumptions, determinacy, and zero-force members.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u1-L3b', title: 'Method of Joints', description: 'Solve for member forces by analyzing equilibrium at each joint.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u1-L3c', title: 'Method of Sections & Frames', description: 'Cut through trusses to find specific members, and analyze frames.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u1-L4', title: 'Static Friction Basics', description: 'Compare driving forces to friction limits on flat and inclined surfaces.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u1-L4b', title: 'Wedges and Tipping', description: 'Analyze wedge forces, self-locking conditions, and tip-vs-slide problems.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u1-L4c', title: 'Belt Friction and Screws', description: 'Apply the capstan equation and screw thread analysis.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u1-L5', title: 'Centroids of Simple Shapes', description: 'Find the geometric center of rectangles, triangles, and circles.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u1-L5b', title: 'Moment of Inertia', description: 'Calculate second moments of area and apply the parallel axis theorem.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u1-L5c', title: 'Composite Sections', description: 'Combine shapes to find centroids and moments of inertia for real beams.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u1-L-conv', title: 'Forces on the Job', description: 'Help a junior engineer solve a real statics problem.', icon: '💬', type: 'conversation', xpReward: 20, questions: [] },
      { id: 'u1-L-speed', title: 'Statics Speed Round', description: 'Race the clock on forces, moments, and equilibrium.', icon: '⚡', type: 'speed-round', xpReward: 20, questions: [] },
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
      { id: 'u2-L1', title: 'Position, Velocity & Acceleration', description: 'Differentiation and integration of motion: position, velocity, and acceleration relationships.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L1b', title: 'Curvilinear & Relative Motion', description: 'Normal-tangential components, polar coordinates, and velocity of one object relative to another.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L1c', title: 'Projectiles & Advanced Kinematics', description: 'Projectile trajectories, integration techniques, and velocity as a function of position.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L2', title: "Newton's Laws Fundamentals", description: 'The three laws of motion, free body diagrams, and friction on flat surfaces.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L2b', title: 'Circular Motion & Banked Curves', description: 'Centripetal force, banked curves, and vertical circles.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L2c', title: 'Connected Systems & Real Problems', description: 'Pulleys, multiple bodies, conveyor belts, and tug-of-war physics.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L3', title: 'Work & Kinetic Energy', description: 'Work by constant and variable forces, the work-energy theorem.', icon: '⚡', xpReward: 20, questions: [] },
      { id: 'u2-L3b', title: 'Conservation of Energy', description: 'Converting between kinetic, potential, and spring energy in frictionless and frictional systems.', icon: '⚡', xpReward: 20, questions: [] },
      { id: 'u2-L3c', title: 'Power & Efficiency', description: 'Power as the rate of energy transfer, motor sizing, and machine efficiency.', icon: '⚡', xpReward: 20, questions: [] },
      { id: 'u2-L4', title: 'Momentum & Impulse Basics', description: 'Linear momentum, impulse-momentum theorem, and conservation of momentum.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L4b', title: 'Collisions & Restitution', description: 'Elastic and inelastic collisions, coefficient of restitution, and 2D impacts.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L4c', title: 'Momentum in Systems & Machines', description: 'Rocket propulsion, impact forces, ballistic pendulums, and angular impulse.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L5', title: 'Torque & Moment of Inertia', description: 'Rotational analog of F=ma, mass distribution effects, and the parallel axis theorem.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L5b', title: 'Angular Momentum & Gyroscopes', description: 'Conservation of angular momentum, gyroscopic precession, and spinning stability.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L5c', title: 'Rolling & Rotational Applications', description: 'Rolling without slipping, energy in rotation, and flywheels.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u2-L6', title: 'Natural Frequency & Free Vibration', description: 'Spring-mass systems, natural frequency, and the effects of damping on free vibration.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u2-L6b', title: 'Forced Vibration & Resonance', description: 'Resonance, frequency ratio, and why operating near natural frequency is dangerous.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u2-L6c', title: 'Vibration Isolation & Absorbers', description: 'Transmissibility, vibration isolation design, and tuned mass dampers.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u2-L-conv', title: 'The Vibrating Machine Mystery', description: 'Help a plant engineer diagnose why a new compressor is shaking the building.', icon: '💬', type: 'conversation', xpReward: 20, questions: [] },
      { id: 'u2-L-speed', title: 'Dynamics Speed Round', description: 'Race the clock: 15 rapid-fire questions on dynamics, kinematics, and vibration.', icon: '⚡', type: 'speed-round', xpReward: 20, questions: [] },
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
      { id: 'u3-L1', title: 'Stress & Strain Fundamentals', description: "Normal and shear stress, engineering and true strain, stress-strain diagrams, elastic modulus, and Poisson's ratio.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'u3-L1b', title: 'Thermal Stress, Composites & Toughness', description: 'Elastic vs plastic behavior, thermal stress in restrained members, composite bar load sharing, and toughness from the stress-strain curve.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u3-L1c', title: 'Stress Concentrations & Elastic Constants', description: 'Stress concentration factors, compressive vs tensile behavior, elastic constant relationships, bearing stress, and bolt preload analysis.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u3-L2', title: 'Beam Bending', description: 'Bending stress formula, neutral axis, section modulus, and deflection formulas.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u3-L2b', title: 'I-Beams, Section Modulus & Deflection', description: 'Efficient cross-sections, cantilever moments, section modulus formulas for common shapes, and beam deflection calculations.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u3-L2c', title: 'Deflection Formulas & Superposition', description: 'Standard deflection formulas for common beam cases, the superposition method, and deflection limits in design.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u3-L3', title: 'Shear & Bending Diagrams', description: 'SFD/BMD construction, distributed loads, concentrated loads, and maximum bending moment location.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u3-L3b', title: 'Drawing SFD & BMD Step by Step', description: 'Constructing shear and bending moment diagrams from support reactions, locating maximum moments, and combining multiple loads.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u3-L3c', title: 'Indeterminate Beams & Moment Envelopes', description: 'Statically indeterminate beams, moment envelopes for moving loads, SFD/BMD differential relationships, and propped cantilevers.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u3-L4', title: 'Torsion', description: 'Torsion formula, polar moment, angle of twist, and power transmission.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u3-L4b', title: 'Shaft Sizing & Power Transmission', description: 'Power-torque relationship, twist angle calculations, series shafts, and minimum shaft diameter sizing from allowable stress.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u3-L4c', title: 'Polar Moments & Open vs Closed Sections', description: 'Polar moment of inertia formulas, open vs closed section torsional stiffness, and statically indeterminate torsion problems.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u3-L5', title: "Mohr's Circle & Combined Loading", description: 'Principal stresses, maximum shear, plane stress transformation, and combined loading analysis.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u3-L5b', title: "Mohr's Circle Construction & Pressure Vessels", description: "Building Mohr's circle from a stress element, principal stresses in pressure vessels, pure shear transformation, and combined bending-torsion analysis.", icon: '📝', xpReward: 30, questions: [] },
      { id: 'u3-L5c', title: 'Combined Loading & Plane Stress vs Strain', description: 'Combined bending-torsion on shafts, principal stress direction, plane stress vs plane strain assumptions, and failure pattern recognition.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u3-L6', title: 'Failure Theories', description: 'Von Mises, Tresca, Maximum Normal Stress, fatigue, S-N curves, endurance limit, and safety factors.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u3-L6b', title: 'Safety Factors, S-N Curves & Fatigue Criteria', description: 'Factor of safety in practice, S-N curve interpretation, endurance limit correction factors, and Goodman fatigue criterion.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u3-L6c', title: 'Fatigue Life & Endurance Limit Estimation', description: 'High-cycle vs low-cycle fatigue, endurance limit estimation from UTS, surface/size/reliability correction factors, and von Mises physical basis.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u3-L7', title: 'Column Buckling & Pressure Vessels', description: "Euler's critical load, effective length factors, slenderness ratio, Johnson's formula, and thin/thick-wall pressure vessel stress analysis.", icon: '📝', xpReward: 30, questions: [] },
      { id: 'u3-L7b', title: 'Effective Length & Thin-Wall Vessel Stresses', description: "Euler buckling with different end conditions, Johnson's parabolic formula, and hoop/axial stress in thin-walled cylindrical and spherical vessels.", icon: '📝', xpReward: 30, questions: [] },
      { id: 'u3-L7c', title: 'Thick-Walled Vessels & Combined Vessel Loads', description: "Lame's equations for thick cylinders, autofrettage, pressure vessels under combined external loads, and slenderness ratio in column design.", icon: '📝', xpReward: 30, questions: [] },
      { id: 'u3-L-conv', title: 'The Failing Bracket', description: 'Help an engineer diagnose and fix a bracket that keeps cracking in service.', icon: '💬', type: 'conversation', xpReward: 20, questions: [] },
      { id: 'u3-L-speed', title: 'Strength of Materials Blitz', description: 'Race the clock on stress, strain, bending, torsion, and failure concepts.', icon: '⚡', type: 'speed-round', xpReward: 20, questions: [] },
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
      { id: 'u4-L1', title: 'Properties & State: Basics', description: 'Thermodynamic state, intensive vs extensive properties, and the state postulate.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u4-L1b', title: 'Properties & State: Phases', description: 'Phase diagrams, quality, critical point, triple point, and subcooled liquid.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u4-L1c', title: 'Properties & State: Gases', description: 'Ideal gas law, specific heats, van der Waals equation, and compressibility factor.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u4-L2', title: 'First Law: Foundations', description: 'Energy conservation, closed system energy balance, enthalpy, and work.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u4-L2b', title: 'First Law: Open Systems', description: 'Steady-flow devices, nozzles, turbines, compressors, and mixing chambers.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u4-L2c', title: 'First Law: Processes', description: 'Polytropic processes, boundary work, free expansion, and isentropic efficiency.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u4-L3', title: 'Second Law: Fundamentals', description: 'Entropy, Clausius and Kelvin-Planck statements, reversibility, and the Carnot cycle.', icon: '🔀', xpReward: 25, questions: [] },
      { id: 'u4-L3b', title: 'Second Law: Entropy Math', description: 'Entropy changes, T-s diagrams, isentropic processes, and entropy balance.', icon: '🔀', xpReward: 25, questions: [] },
      { id: 'u4-L3c', title: 'Second Law: Applications', description: 'Exergy, irreversibility, entropy in devices, and perpetual motion machines.', icon: '🔀', xpReward: 25, questions: [] },
      { id: 'u4-L4', title: 'Power Cycles: Rankine', description: 'The Rankine cycle for steam power plants, reheat, regeneration, and efficiency.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u4-L4b', title: 'Power Cycles: Gas Engines', description: 'Otto, Diesel, Brayton cycles, compression ratio, and thermal efficiency.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u4-L4c', title: 'Power Cycles: Efficiency', description: 'Real vs ideal cycles, combined cycles, MEP, and cycle improvements.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u4-L5', title: 'Refrigeration: Basics', description: 'Vapor compression cycle, COP, components, and their roles.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u4-L5b', title: 'Refrigeration: Advanced', description: 'Refrigerants, absorption, cascade systems, subcooling, and superheating.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u4-L5c', title: 'Refrigeration: Real Systems', description: 'AC systems, heat pump sizing, defrost, troubleshooting, and optimization.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u4-L-conv', title: 'Power Plant Troubleshooting', description: 'Diagnose efficiency problems in a steam power plant with your senior engineer.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
      { id: 'u4-L-speed', title: 'Thermo Speed Round', description: '15 rapid-fire thermodynamics questions in 60 seconds.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
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
      { id: 'u5-L1', title: 'Conduction Basics', description: "Fourier's law, thermal conductivity, and the direction of heat flow.", icon: '📝', xpReward: 20, questions: [] },
      { id: 'u5-L1b', title: 'Composite Walls', description: 'Series and parallel thermal resistance, contact resistance, and thermal circuits.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u5-L1c', title: 'Cylinders & Critical Radius', description: 'Cylindrical conduction, the logarithmic resistance formula, and the critical radius of insulation.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u5-L2', title: 'Convection Fundamentals', description: "Newton's cooling law, the convection coefficient h, and forced vs. natural convection.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'u5-L2b', title: 'Dimensionless Numbers', description: 'Reynolds, Nusselt, Prandtl, and Grashof numbers for convection analysis.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u5-L2c', title: 'Convection Correlations', description: 'Applying Nu correlations for common geometries: flat plates, pipes, and cylinders.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u5-L3', title: 'Radiation Basics', description: 'Stefan-Boltzmann law, emissivity, blackbody radiation, and the electromagnetic spectrum.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u5-L3b', title: 'View Factors', description: 'View factors, radiation exchange between surfaces, and enclosure analysis.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u5-L3c', title: 'Radiation Shields', description: 'Radiation shields, greenhouse effect, and practical radiation control.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u5-L4', title: 'Heat Exchanger Basics', description: 'Types of heat exchangers, overall heat transfer coefficient U, and flow arrangements.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u5-L4b', title: 'LMTD Method', description: 'Log mean temperature difference, correction factors, and heat exchanger sizing.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u5-L4c', title: 'NTU-Effectiveness', description: 'NTU method, effectiveness, capacity ratio, and heat exchanger rating.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u5-L5', title: 'Fin Fundamentals', description: 'Why fins work, the fin equation, and fin temperature distribution.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u5-L5b', title: 'Fin Efficiency', description: 'Fin efficiency, fin effectiveness, and overall surface efficiency.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u5-L5c', title: 'Fin Design', description: 'Fin optimization, fin arrays, and practical heat sink design.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u5-L6', title: 'Transient Conduction Basics', description: 'The Biot number, lumped capacitance method, and time constant.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u5-L6b', title: 'Spatial Effects', description: 'Heisler charts, one-term approximations, and semi-infinite solids for Bi > 0.1.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u5-L6c', title: 'Transient Applications', description: 'Multi-dimensional conduction, product solutions, and real-world transient thermal problems.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u5-L-conv', title: 'Heat Sink Design Chat', description: 'Walk through a real heat sink design conversation with your team lead.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
      { id: 'u5-L-speed', title: 'Heat Transfer Speed Round', description: '15 rapid-fire heat transfer questions in 60 seconds.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
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
      { id: 'u6-L1', title: 'Fluid Properties & Statics (1/3)', description: 'What makes a fluid, viscosity, density, and the hydrostatic pressure equation.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u6-L1b', title: 'Fluid Properties & Statics (2/3)', description: 'Manometers, gauge vs absolute pressure, and buoyancy forces.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u6-L1c', title: 'Fluid Properties & Statics (3/3)', description: 'Floating stability, non-Newtonian fluids, vapor pressure, and advanced hydrostatics.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u6-L2', title: 'Bernoulli & Energy Equation (1/3)', description: "Bernoulli's equation, key assumptions, and common pitfalls.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'u6-L2b', title: 'Bernoulli & Energy Equation (2/3)', description: "Venturi meters, Torricelli's theorem, energy lines, and HGL.", icon: '📝', xpReward: 25, questions: [] },
      { id: 'u6-L2c', title: 'Bernoulli & Energy Equation (3/3)', description: 'Modified Bernoulli, real flow corrections, and the full energy equation.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u6-L3', title: 'Pipe Flow & Losses (1/3)', description: 'Reynolds number, laminar vs turbulent flow, and the Darcy-Weisbach equation.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u6-L3b', title: 'Pipe Flow & Losses (2/3)', description: 'Minor losses, fittings, equivalent length, and pipe networks.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u6-L3c', title: 'Pipe Flow & Losses (3/3)', description: 'Advanced pipe problems, velocity profiles, entrance length, and water hammer.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u6-L4', title: 'Pumps & Turbomachinery (1/3)', description: 'Centrifugal vs positive displacement pumps, pump head, and cavitation basics.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u6-L4b', title: 'Pumps & Turbomachinery (2/3)', description: 'Pump curves, system curves, operating points, and the affinity laws.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u6-L4c', title: 'Pumps & Turbomachinery (3/3)', description: 'Pump selection, turbines, hydraulic power, and real-world pump problems.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u6-L5', title: 'Dimensional Analysis (1/3)', description: 'Buckingham Pi theorem, dimensional homogeneity, and forming dimensionless groups.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u6-L5b', title: 'Dimensional Analysis (2/3)', description: 'Similitude, model testing, and applying dimensionless numbers in practice.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u6-L5c', title: 'Dimensional Analysis (3/3)', description: 'Drag coefficients, power correlations, and real-world applications of Pi groups.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u6-L-conv', title: 'Sizing a Pump for a Building', description: "Help a senior engineer size a pump for a new office building's water supply system.", icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
      { id: 'u6-L-speed', title: 'Fluids Speed Round', description: '15 rapid-fire fluid mechanics questions. You have 60 seconds.', icon: '⚡', type: 'speed-round', xpReward: 25, questions: [] },
    ],
  },
  {
    id: 'u7-how-things-work',
    title: 'How Things Work',
    description: 'Real-world engineering in everyday objects -- from kitchen appliances to car engines, connecting theory to the mechanisms all around us.',
    color: '#78716C',
    icon: '\uD83D\uDD27',
    topicId: 'real-world-mechanisms',
    lessons: [
      { id: 'htw-L1', title: 'Kitchen Engineering', description: 'How pressure cookers, refrigerators, faucets, and kitchen knives use core engineering principles.', icon: '🍳', xpReward: 25, questions: [] },
      { id: 'htw-L2', title: 'The Car You Drive', description: 'How engines, brakes, suspension, tires, and transmissions apply thermodynamics, dynamics, and solid mechanics.', icon: '🚗', xpReward: 25, questions: [] },
      { id: 'htw-L3', title: 'Around the House', description: 'Discover the mechanical engineering principles hiding in everyday household items -- from door hinges to AC units.', icon: '🏠', xpReward: 25, questions: [] },
      { id: 'htw-L4', title: 'Tools & Workshop', description: 'Analyze the engineering mechanics behind common hand tools and workshop equipment -- torque, leverage, hydraulics, and more.', icon: '🔧', xpReward: 25, questions: [] },
      { id: 'htw-L5', title: 'Sports & Outdoors', description: 'Gear ratios on a bike, sweet spots on a racket, energy on a roller coaster -- real sports equipment decoded through engineering.', icon: '⚽', xpReward: 25, questions: [] },
      { id: 'htw-L6', title: 'Buildings & Infrastructure', description: 'Elevators, bridges, cranes, and dams -- the engineering principles hidden in the structures all around us.', icon: '🏗️', xpReward: 25, questions: [] },
      { id: 'htw-L7', title: 'Everyday Failures', description: 'Why pipes burst, bolts loosen, chains break, and tires blow out -- real-world failure analysis through everyday objects.', icon: '💥', xpReward: 25, questions: [] },
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
      { id: 'u7-L1', title: 'Tensile Test Basics', description: 'Stress-strain curves, yield strength, UTS, ductility measures.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u7-L1b', title: 'Hardness, Creep, and Fatigue', description: 'Hardness tests, creep at high temperature, fatigue S-N curves.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u7-L1c', title: 'Fracture and Toughness', description: 'Fracture toughness K_IC, impact testing, material selection.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u7-L2', title: 'Iron-Carbon Diagram', description: 'Phases, eutectoid reaction, carbon solubility limits.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u7-L2b', title: 'Heat Treatment Processes', description: 'Quenching, tempering, annealing, normalizing, hardenability.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u7-L2c', title: 'Advanced Heat Treatment', description: 'Case hardening, CCT vs TTT, precipitation hardening.', icon: '📝', xpReward: 35, questions: [] },
      { id: 'u7-L3', title: 'Casting Processes', description: 'Sand, investment, and die casting, defects, shrinkage.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u7-L3b', title: 'Forming Processes', description: 'Forging, rolling, extrusion, drawing, formability.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u7-L3c', title: 'Casting and Forming Defects', description: 'Porosity, hot tears, grain flow, DFM for cast/formed parts.', icon: '📝', xpReward: 35, questions: [] },
      { id: 'u7-L4', title: 'Turning, Milling, and Drilling', description: 'Basic machining operations, cutting parameters.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u7-L4b', title: 'Tool Wear and Surface Finish', description: 'Tool life, crater/flank wear, surface roughness.', icon: '📝', xpReward: 35, questions: [] },
      { id: 'u7-L4c', title: 'CNC and Process Planning', description: 'G-code basics, speeds and feeds, process selection.', icon: '📝', xpReward: 40, questions: [] },
      { id: 'u7-L5', title: 'Additive Manufacturing', description: '3D printing processes: FDM, SLA, SLS, DMLS.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u7-L5b', title: 'Injection Molding and Sheet Metal', description: 'Mold design, gate placement, bending, DFM.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u7-L5c', title: 'Design for Manufacturing', description: 'Tolerances, process selection, cost considerations.', icon: '📝', xpReward: 35, questions: [] },
      { id: 'u7-L6', title: 'Welding Processes', description: 'MIG, TIG, stick, laser welding fundamentals.', icon: '⚡', xpReward: 30, questions: [] },
      { id: 'u7-L6b', title: 'HAZ and Weld Defects', description: 'Heat-affected zone metallurgy, porosity, cracking.', icon: '⚡', xpReward: 35, questions: [] },
      { id: 'u7-L6c', title: 'Joint Design and Inspection', description: 'Fillet sizing, weld symbols, NDE methods.', icon: '⚡', xpReward: 40, questions: [] },
      { id: 'u7-L-conv', title: 'Materials Selection Meeting', description: 'Help an engineer choose the right material for a critical component.', icon: '💬', type: 'conversation', xpReward: 25, questions: [] },
      { id: 'u7-L-speed', title: 'Materials Rapid Fire', description: '15 quick questions on materials and manufacturing. 60 seconds.', icon: '⚡', type: 'speed-round', xpReward: 20, questions: [] },
    ],
  },
  {
    id: 'u8-machine',
    title: 'Machine Design',
    description: 'Shafts, bearings, gears, fasteners, springs, and seals: core machine element design for mechanical engineers.',
    color: '#3B82F6',
    icon: '\u2699\uFE0F',
    topicId: 'machine-elements',
    lessons: [
      { id: 'u8-L1', title: 'Shaft Basics', description: 'What shafts do, torque transmission, and basic sizing.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L1b', title: 'Keys & Critical Speed', description: 'Key types, spline connections, critical speed, and Dunkerley formula.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L1c', title: 'Shaft Fatigue Design', description: 'Fatigue criteria (Soderberg, Goodman, Gerber), Marin factors, and advanced shaft sizing.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L2', title: 'Bearing Types', description: 'Rolling vs. plain bearings, ball, roller, needle, and angular contact types.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L2b', title: 'Bearing Life & Selection', description: 'L10 life calculation, dynamic load ratings, equivalent loads, and reliability adjustments.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L2c', title: 'Lubrication & Journal Bearings', description: 'Hydrodynamic lubrication, Stribeck curve, Sommerfeld number, and journal bearing design.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L3', title: 'Gear Basics', description: 'Gear ratios, speed and torque relationships, module, and pitch circle diameter.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u8-L3b', title: 'Gear Types', description: 'Spur, helical, bevel, and worm gears: characteristics, trade-offs, and selection.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u8-L3c', title: 'Gear Tooth Design', description: 'Lewis equation, AGMA bending and contact stress, form factor, and gear sizing.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u8-L4', title: 'Bolt Basics', description: 'How bolted joints work, preload, and bolt grades.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L4b', title: 'Bolt Design & Analysis', description: 'Joint stiffness, separation load, bolt fatigue, and gasket factors.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L4c', title: 'Welded & Adhesive Joints', description: 'Fillet and butt welds, weld sizing, adhesive joint design, and joint selection.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L5', title: 'Spring Basics', description: 'Helical spring design, spring rate, spring index, and the Wahl correction factor.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L5b', title: 'Spring Fatigue & Seals', description: 'Spring fatigue, surge, buckling, and an introduction to O-rings, lip seals, and mechanical seals.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L5c', title: 'Advanced Spring & Seal Design', description: 'Spring material selection, end types, seal materials, and failure analysis.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u8-L-conv', title: 'Gearbox Bearing Selection', description: 'Walk through a real bearing selection scenario for an industrial gearbox.', icon: '💬', type: 'conversation', xpReward: 30, questions: [] },
      { id: 'u8-L-speed', title: 'Machine Design Speed Round', description: '15 rapid-fire questions on shafts, bearings, gears, fasteners, springs, and seals.', icon: '⚡', type: 'speed-round', xpReward: 30, questions: [] },
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
      { id: 'u9-L1', title: 'Tolerance Fundamentals', description: 'Tolerance basics, clearance/interference/transition fits, bilateral vs unilateral.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u9-L1b', title: 'ISO Fit System', description: 'Hole-basis vs shaft-basis, ISO designation, H/h fundamentals, tolerance grades.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u9-L1c', title: 'Applied Fits & Standards', description: 'Selecting fits, ASME Rule #1, ISO 2768, process capability, thermal effects.', icon: '📝', xpReward: 20, questions: [] },
      { id: 'u9-L2', title: 'GD&T Basics', description: 'Feature control frames, 5 categories, form tolerances, MMC/LMC basics.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u9-L2b', title: 'Orientation & Position', description: 'Perpendicularity, parallelism, angularity, position tolerance, virtual condition.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u9-L2c', title: 'Advanced GD&T', description: 'Runout, profile, composite position, concentricity, projected tolerance zones.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u9-L3', title: 'Datum Basics', description: 'Datum features vs datums, the 3-2-1 rule, datum reference frame, DOF constraint.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u9-L3b', title: 'Datum Targets & Applications', description: 'Datum targets, datum shift at MMC, common datums, flexible part inspection.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u9-L3c', title: 'Datum Systems in Practice', description: 'Fixture alignment, flange datums, cones, patterns, simultaneous requirement.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u9-L4', title: 'Stack-Up Basics', description: 'Worst-case analysis, dimension chains, positive/negative contributors, gap analysis.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u9-L4b', title: 'RSS & Monte Carlo', description: 'RSS calculations, Monte Carlo simulation, Cpk, sensitivity factors, modified RSS.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u9-L4c', title: 'Stack-Up Solutions', description: 'Tolerance allocation, selective assembly, shims, 2D effects, GD&T in stack-ups.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u9-L5', title: 'Surface Roughness', description: 'Ra, Rz, Rq, surface lay symbols, process capability, roughness vs function.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u9-L5b', title: 'Metrology Fundamentals', description: 'CMM, profilometry, measurement uncertainty, gauge R&R, Abbe principle, 20 C reference.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u9-L5c', title: 'Applied Metrology', description: 'Optical comparators, profilometer types, legacy drawing review, bearing area curves.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u9-L-conv', title: 'Drawing Review', description: 'Help a colleague interpret a GD&T drawing and troubleshoot a tolerance issue.', icon: '💬', type: 'conversation', xpReward: 20, questions: [] },
      { id: 'u9-L-speed', title: 'GD&T Speed Round', description: 'Race the clock on tolerancing, GD&T symbols, datums, and metrology.', icon: '⚡', type: 'speed-round', xpReward: 20, questions: [] },
    ],
  },
  {
    id: 'u10-interview',
    title: 'Interview Problem Solving',
    description: 'Estimation problems, failure analysis, design trade-offs, FEA interpretation, and real-world engineering case studies.',
    color: '#14B8A6',
    icon: '\uD83E\uDDE0',
    topicId: 'interview-skills',
    lessons: [
      { id: 'u10-L1', title: 'Fermi Problems Basics', description: 'What Fermi problems are, how to decompose big unknowns, and your first estimation attempts.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u10-L1b', title: 'Anchor Values & Sanity Checks', description: 'Key reference numbers every engineer should know, plus how to sanity-check your estimates.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u10-L1c', title: 'Scaling Laws & Advanced Estimation', description: 'Scaling laws, combined estimation problems, and real interview-level Fermi challenges.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u10-L2', title: 'Failure Modes & Fracture Surfaces', description: 'The three main failure modes, reading fracture surfaces, and identifying fatigue vs overload.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u10-L2b', title: 'Root Cause Analysis Tools', description: 'Fishbone diagrams, 5 Whys, FMEA, and systematic problem-solving approaches.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u10-L2c', title: 'Environment-Assisted Failures', description: 'Corrosion types, hydrogen embrittlement, stress corrosion cracking, and environment-driven failures.', icon: '📝', xpReward: 35, questions: [] },
      { id: 'u10-L3', title: 'Material Selection Basics', description: 'Ashby charts, material indices, and how to pick the right material for the loading type.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u10-L3b', title: 'DFM, DFA & Cost Reduction', description: 'Design for Manufacturing, Design for Assembly, and systematic cost reduction approaches.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u10-L3c', title: 'Decision Matrices & Optimization', description: 'Pugh matrices, weighted decision tables, and multi-objective optimization in design.', icon: '📝', xpReward: 35, questions: [] },
      { id: 'u10-L4', title: 'FEA Mesh & Elements', description: 'Element types, mesh quality metrics, and how mesh density affects accuracy.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u10-L4b', title: 'Boundary Conditions & Convergence', description: 'Applying boundary conditions correctly, checking convergence, and common modeling mistakes.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u10-L4c', title: 'Interpreting FEA Results', description: 'Reading stress plots, handling singularities, and validating FEA results against hand calcs.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u10-L5', title: 'Engineering Case Studies', description: 'Real-world engineering failures, troubleshooting frameworks, and systematic investigation.', icon: '📋', xpReward: 30, questions: [] },
      { id: 'u10-L5b', title: 'Troubleshooting Scenarios', description: 'Debugging field failures, interpreting test data, and making recommendations under uncertainty.', icon: '📋', xpReward: 30, questions: [] },
      { id: 'u10-L5c', title: 'Cross-Disciplinary Design', description: 'Cross-disciplinary thinking, systems engineering, and holistic design problem-solving.', icon: '📋', xpReward: 35, questions: [] },
      { id: 'u10-L6', title: 'Standards & Quality Systems', description: 'ISO standards, ASME codes, and quality management systems every engineer should know.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u10-L6b', title: 'Risk Assessment & Change Control', description: 'FMEA risk assessment, engineering change orders, and configuration management.', icon: '📝', xpReward: 25, questions: [] },
      { id: 'u10-L6c', title: 'Project Management for Engineers', description: 'Project scheduling, resource planning, and professional communication for engineers.', icon: '📝', xpReward: 30, questions: [] },
      { id: 'u10-L-conv', title: 'Mock Technical Interview', description: 'Practice a realistic technical interview scenario with an engineering manager.', icon: '💬', type: 'conversation', xpReward: 20, questions: [] },
      { id: 'u10-L-speed', title: 'Interview Rapid Fire', description: 'Race the clock on estimation, failure analysis, design, FEA, and standards questions.', icon: '⚡', type: 'speed-round', xpReward: 20, questions: [] },
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
  // Index 0-12: Original 13 units (unit-0 through unit-12)
  // Index 13-18: Section 13 Part 1 - Estate Planning (6 units)
  // Index 19-23: Section 13 Part 2 - Estate Planning (5 units)
  // Index 24-34: Section 14 - Business & Self-Employment (11 units)
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
    () => import('./professions/personal-finance/units/section-13-estate-part1').then(m => m.financeSection13Part1[0]),
    () => import('./professions/personal-finance/units/section-13-estate-part1').then(m => m.financeSection13Part1[1]),
    () => import('./professions/personal-finance/units/section-13-estate-part1').then(m => m.financeSection13Part1[2]),
    () => import('./professions/personal-finance/units/section-13-estate-part1').then(m => m.financeSection13Part1[3]),
    () => import('./professions/personal-finance/units/section-13-estate-part1').then(m => m.financeSection13Part1[4]),
    () => import('./professions/personal-finance/units/section-13-estate-part1').then(m => m.financeSection13Part1[5]),
    () => import('./professions/personal-finance/units/section-13-estate-part2').then(m => m.financeSection13Part2[0]),
    () => import('./professions/personal-finance/units/section-13-estate-part2').then(m => m.financeSection13Part2[1]),
    () => import('./professions/personal-finance/units/section-13-estate-part2').then(m => m.financeSection13Part2[2]),
    () => import('./professions/personal-finance/units/section-13-estate-part2').then(m => m.financeSection13Part2[3]),
    () => import('./professions/personal-finance/units/section-13-estate-part2').then(m => m.financeSection13Part2[4]),
    // Index 24-34: Section 14 - Business & Self-Employment (11 units)
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[0]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[1]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[2]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[3]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[4]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[5]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[6]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[7]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[8]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[9]),
    () => import('./professions/personal-finance/units/section-14-business').then(m => m.financeSection14Business[10]),
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
  // Index 0: Section 1 - Brain (unit-1)
  // Index 1-9: Section 2 - Perception (section-2-perception, 9 units)
  // Index 10-18: Section 1 continued - units 2-10
  const loaders: (() => Promise<Unit>)[] = [
    () => import('./professions/psychology/units/unit-1').then(m => m.unit1),
    () => import('./professions/psychology/units/section-2-perception').then(m => m.psychologySection2[0]),
    () => import('./professions/psychology/units/section-2-perception').then(m => m.psychologySection2[1]),
    () => import('./professions/psychology/units/section-2-perception').then(m => m.psychologySection2[2]),
    () => import('./professions/psychology/units/section-2-perception').then(m => m.psychologySection2[3]),
    () => import('./professions/psychology/units/section-2-perception').then(m => m.psychologySection2[4]),
    () => import('./professions/psychology/units/section-2-perception').then(m => m.psychologySection2[5]),
    () => import('./professions/psychology/units/section-2-perception').then(m => m.psychologySection2[6]),
    () => import('./professions/psychology/units/section-2-perception').then(m => m.psychologySection2[7]),
    () => import('./professions/psychology/units/section-2-perception').then(m => m.psychologySection2[8]),
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

  if (unitIndex < 0 || unitIndex >= psychologyCourseMeta.length) {
    throw new Error(`Invalid psychology unit index: ${unitIndex}`);
  }

  if (unitIndex >= loaders.length) {
    return psychologyCourseMeta[unitIndex];
  }

  return loaders[unitIndex]();
}

async function loadSpaceUnit(unitIndex: number): Promise<Unit> {
  // Index 0-2: Section 1-3 (unit-1 to unit-3)
  // Index 3-14: Section 4 - Light & Telescopes (section-4-light, 12 units)
  // Index 15-21: Section 5-10 (unit-4 to unit-10, original stars onwards)
  // Index 22-32: Section 12 - Astrophotography & Amateur Astronomy (section-12-amateur, 11 units)
  const loaders: (() => Promise<Unit>)[] = [
    () => import('./professions/space-astronomy/units/unit-1').then(m => m.unit1),
    () => import('./professions/space-astronomy/units/unit-2').then(m => m.unit2),
    () => import('./professions/space-astronomy/units/unit-3').then(m => m.unit3),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[0]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[1]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[2]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[3]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[4]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[5]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[6]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[7]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[8]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[9]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[10]),
    () => import('./professions/space-astronomy/units/section-4-light').then(m => m.spaceSection4[11]),
    () => import('./professions/space-astronomy/units/unit-4').then(m => m.unit4),
    () => import('./professions/space-astronomy/units/unit-5').then(m => m.unit5),
    () => import('./professions/space-astronomy/units/unit-6').then(m => m.unit6),
    () => import('./professions/space-astronomy/units/unit-7').then(m => m.unit7),
    () => import('./professions/space-astronomy/units/unit-8').then(m => m.unit8),
    () => import('./professions/space-astronomy/units/unit-9').then(m => m.unit9),
    () => import('./professions/space-astronomy/units/unit-10').then(m => m.unit10),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[0]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[1]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[2]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[3]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[4]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[5]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[6]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[7]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[8]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[9]),
    () => import('./professions/space-astronomy/units/section-12-amateur').then(m => m.spaceSection12[10]),
  ];

  if (unitIndex < 0 || unitIndex >= spaceCourseMeta.length) {
    throw new Error(`Invalid space unit index: ${unitIndex}`);
  }

  if (unitIndex >= loaders.length) {
    return spaceCourseMeta[unitIndex];
  }

  return loaders[unitIndex]();
}
