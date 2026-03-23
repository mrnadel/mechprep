/**
 * SVG blueprint path data for each chapter's mechanical component.
 *
 * ALL 10 chapters are layers of ONE coherent single-cylinder engine assembly.
 * They share a common viewBox (0 0 400 520) and, when drawn together, form
 * the complete machine.
 *
 * Layout (top to bottom):
 *   - Cylinder head, valves, spark plug  (Thermo)
 *   - Cylinder walls, cooling jacket     (Heat Transfer)
 *   - Piston & rings                     (Strength of Materials)
 *   - Connecting rod                     (Dynamics — kinematics)
 *   - Crankshaft & flywheel              (Statics — equilibrium)
 *   - Oil sump & passages               (Fluids)
 *   - Outer housing / material hatch     (Materials)
 *   - Timing gears                       (Machine Elements)
 *   - GD&T annotations                  (GD&T)
 *   - Title block / PE seal              (Interview Prep)
 */

interface BlueprintPath {
  d: string;
  strokeWidth?: number;
  label?: string;
}

export interface DimensionLine {
  x1: number; y1: number;
  x2: number; y2: number;
  label: string;
  offset?: number;
}

interface BlueprintData {
  name: string;
  title: string;
  paths: BlueprintPath[];
  dimensions: DimensionLine[];
  viewBox: string;
}

const SHARED_VIEWBOX = '0 0 400 520';

export const blueprints: BlueprintData[] = [
  // ── Unit 0: Statics — Crankshaft, Counterweight & Bearings ──
  {
    name: 'crankshaft',
    title: 'CRANKSHAFT ASSEMBLY',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Main journal bearing (lower center)
      { d: 'M 200 380 A 28 28 0 1 1 200 380.01', strokeWidth: 2.5 },
      // Crankpin (offset)
      { d: 'M 200 340 A 14 14 0 1 1 200 340.01', strokeWidth: 2 },
      // Crank arms connecting journal to pin
      { d: 'M 188 370 L 190 348 M 212 370 L 210 348', strokeWidth: 2.5 },
      // Counterweight (below journal)
      { d: 'M 170 395 A 40 25 0 0 1 230 395 L 220 410 Q 200 420 180 410 Z', strokeWidth: 2 },
      // Flywheel rim (partial arc, right side)
      { d: 'M 255 345 A 55 55 0 0 1 255 415', strokeWidth: 1.5 },
      { d: 'M 260 350 A 60 60 0 0 1 260 410', strokeWidth: 1 },
      // Bearing caps (left + right)
      { d: 'M 155 372 L 155 390 L 170 390 M 245 372 L 245 390 L 230 390', strokeWidth: 2 },
    ],
    dimensions: [
      { x1: 170, y1: 440, x2: 230, y2: 440, label: '∅ 56 mm' },
    ],
  },

  // ── Unit 1: Dynamics — Connecting Rod & Wrist Pin ──
  {
    name: 'connecting-rod',
    title: 'CONNECTING ROD',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Rod body (tapered I-section)
      { d: 'M 193 335 L 189 270 L 195 270 L 195 335 Z', strokeWidth: 1.5 },
      { d: 'M 207 335 L 211 270 L 205 270 L 205 335 Z', strokeWidth: 1.5 },
      // Big end (around crankpin)
      { d: 'M 182 330 A 22 22 0 0 1 218 330 L 218 345 A 22 22 0 0 1 182 345 Z', strokeWidth: 2 },
      // Big end cap bolts
      { d: 'M 180 338 L 175 338 M 220 338 L 225 338', strokeWidth: 2.5 },
      // Small end (wrist pin bore)
      { d: 'M 191 265 A 12 12 0 1 1 209 265 A 12 12 0 1 1 191 265', strokeWidth: 2 },
      // Wrist pin
      { d: 'M 183 265 L 217 265', strokeWidth: 3 },
      // Oil hole in rod
      { d: 'M 200 300 A 3 3 0 1 1 200 300.01', strokeWidth: 1 },
    ],
    dimensions: [
      { x1: 160, y1: 265, x2: 160, y2: 340, label: '152 mm' },
    ],
  },

  // ── Unit 2: Strength of Materials — Piston & Rings ──
  {
    name: 'piston',
    title: 'PISTON ASSEMBLY',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Piston crown (flat top)
      { d: 'M 162 215 L 238 215', strokeWidth: 3 },
      // Piston skirt (cylinder shape)
      { d: 'M 162 215 L 162 270 M 238 215 L 238 270', strokeWidth: 2.5 },
      // Ring grooves (3 rings)
      { d: 'M 160 222 L 240 222 M 160 226 L 240 226', strokeWidth: 1 },
      { d: 'M 160 232 L 240 232 M 160 236 L 240 236', strokeWidth: 1 },
      { d: 'M 160 244 L 240 244 M 160 248 L 240 248', strokeWidth: 1 },
      // Wrist pin bosses
      { d: 'M 180 255 L 180 275 L 188 275 L 188 255', strokeWidth: 1.5 },
      { d: 'M 212 255 L 212 275 L 220 275 L 220 255', strokeWidth: 1.5 },
      // Bottom of skirt with chamfer
      { d: 'M 162 270 L 166 274 L 234 274 L 238 270', strokeWidth: 1.5 },
    ],
    dimensions: [
      { x1: 250, y1: 215, x2: 250, y2: 274, label: '59 mm' },
    ],
  },

  // ── Unit 3: Thermodynamics — Cylinder Head & Combustion Chamber ──
  {
    name: 'cylinder-head',
    title: 'COMBUSTION CHAMBER',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Head deck (flat bottom)
      { d: 'M 140 140 L 260 140', strokeWidth: 3 },
      // Head top profile
      { d: 'M 140 90 L 140 140 M 260 90 L 260 140', strokeWidth: 2.5 },
      { d: 'M 140 90 L 260 90', strokeWidth: 3 },
      // Combustion chamber dome
      { d: 'M 165 140 Q 200 118 235 140', strokeWidth: 1.5 },
      // Intake valve
      { d: 'M 178 140 L 178 115 M 170 115 L 186 115', strokeWidth: 2 },
      { d: 'M 178 100 L 178 115', strokeWidth: 1.5 },
      // Exhaust valve
      { d: 'M 222 140 L 222 115 M 214 115 L 230 115', strokeWidth: 2 },
      { d: 'M 222 100 L 222 115', strokeWidth: 1.5 },
      // Spark plug (center)
      { d: 'M 200 90 L 200 108 M 196 108 L 204 108 M 198 112 L 202 104', strokeWidth: 1.5 },
      // Head bolts
      { d: 'M 148 90 L 148 85 M 252 90 L 252 85', strokeWidth: 2.5 },
    ],
    dimensions: [
      { x1: 140, y1: 80, x2: 260, y2: 80, label: '120 mm' },
    ],
  },

  // ── Unit 4: Heat Transfer — Cylinder Walls & Cooling Jacket ──
  {
    name: 'cooling-jacket',
    title: 'COOLING JACKET',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Inner cylinder bore walls
      { d: 'M 160 140 L 160 285', strokeWidth: 2.5 },
      { d: 'M 240 140 L 240 285', strokeWidth: 2.5 },
      // Outer jacket walls (with gap for coolant)
      { d: 'M 145 140 L 145 290 L 160 290', strokeWidth: 2 },
      { d: 'M 255 140 L 255 290 L 240 290', strokeWidth: 2 },
      // Coolant passages (wavy lines suggesting flow)
      { d: 'M 148 160 Q 152 170 148 180 Q 144 190 148 200 Q 152 210 148 220', strokeWidth: 1 },
      { d: 'M 252 165 Q 256 175 252 185 Q 248 195 252 205 Q 256 215 252 225', strokeWidth: 1 },
      // Coolant inlet (right side)
      { d: 'M 255 170 L 275 170 L 275 160 L 285 170 L 275 180 L 275 170', strokeWidth: 1.5 },
      // Coolant outlet (right side, upper)
      { d: 'M 255 150 L 270 150', strokeWidth: 1.5 },
    ],
    dimensions: [
      { x1: 270, y1: 140, x2: 270, y2: 290, label: '150 mm' },
    ],
  },

  // ── Unit 5: Fluid Mechanics — Oil Sump & Lubrication ──
  {
    name: 'oil-system',
    title: 'LUBRICATION SYSTEM',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Oil pan / sump profile
      { d: 'M 130 420 L 130 445 Q 130 470 160 470 L 240 470 Q 270 470 270 445 L 270 420', strokeWidth: 2.5 },
      // Oil level
      { d: 'M 140 450 Q 160 445 180 450 Q 200 455 220 450 Q 240 445 260 450', strokeWidth: 1 },
      // Oil pickup tube
      { d: 'M 200 455 L 200 435 L 190 430 L 190 415', strokeWidth: 1.5 },
      // Oil pump body (small circle)
      { d: 'M 185 410 A 10 10 0 1 1 185 410.01', strokeWidth: 2 },
      // Oil gallery (passage going up)
      { d: 'M 145 400 L 145 370 M 145 370 L 150 365', strokeWidth: 1 },
      // Drain plug
      { d: 'M 195 470 L 195 478 L 205 478 L 205 470', strokeWidth: 2 },
    ],
    dimensions: [
      { x1: 130, y1: 485, x2: 270, y2: 485, label: '140 mm' },
    ],
  },

  // ── Unit 6: Materials — Engine Block Outer Shell ──
  {
    name: 'engine-block',
    title: 'ENGINE BLOCK',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Block outer profile (left)
      { d: 'M 130 90 L 130 420', strokeWidth: 3 },
      // Block outer profile (right)
      { d: 'M 270 90 L 270 420', strokeWidth: 3 },
      // Block top mating surface
      { d: 'M 130 90 L 140 90 M 260 90 L 270 90', strokeWidth: 2 },
      // Block bottom flange
      { d: 'M 120 420 L 280 420', strokeWidth: 3 },
      // Bolt bosses (mounting flange)
      { d: 'M 120 420 L 120 415 L 130 415 M 280 420 L 280 415 L 270 415', strokeWidth: 2 },
      // Material hatch pattern (left wall section)
      { d: 'M 132 160 L 142 170 M 132 180 L 142 190 M 132 200 L 142 210 M 132 220 L 142 230 M 132 240 L 142 250', strokeWidth: 0.8 },
      // Material hatch (right wall)
      { d: 'M 258 160 L 268 170 M 258 180 L 268 190 M 258 200 L 268 210 M 258 220 L 268 230 M 258 240 L 268 250', strokeWidth: 0.8 },
      // Material callout
      { d: 'M 135 300 L 105 330 L 95 330', strokeWidth: 1 },
    ],
    dimensions: [
      { x1: 110, y1: 90, x2: 110, y2: 420, label: '330 mm' },
    ],
  },

  // ── Unit 7: Machine Elements — Timing Gears & Chain ──
  {
    name: 'timing-gears',
    title: 'TIMING DRIVE',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Crank sprocket (at crankshaft, right side)
      { d: 'M 290 380 A 18 18 0 1 1 290 380.01', strokeWidth: 2 },
      // Crank sprocket teeth (simplified)
      { d: 'M 290 360 L 288 356 L 292 356 Z M 310 375 L 314 373 L 312 377 Z M 310 385 L 314 387 L 312 383 Z M 290 400 L 288 404 L 292 404 Z', strokeWidth: 1.5 },
      // Cam sprocket (top, right side — 2:1 ratio so bigger)
      { d: 'M 290 115 A 28 28 0 1 1 290 115.01', strokeWidth: 2 },
      // Cam sprocket teeth
      { d: 'M 290 85 L 288 80 L 292 80 Z M 320 110 L 325 108 L 323 114 Z M 320 120 L 325 122 L 323 116 Z M 290 145 L 288 150 L 292 150 Z M 260 120 L 255 122 L 257 116 Z M 260 110 L 255 108 L 257 114 Z', strokeWidth: 1 },
      // Timing chain (connecting both sprockets)
      { d: 'M 308 375 L 318 140 M 272 375 L 262 140', strokeWidth: 1.5 },
      // Chain links (dashed)
      { d: 'M 310 200 L 312 200 M 310 240 L 312 240 M 310 280 L 312 280 M 310 320 L 312 320', strokeWidth: 2 },
      // Tensioner
      { d: 'M 265 250 L 258 250 L 258 280 L 265 280', strokeWidth: 1.5 },
    ],
    dimensions: [
      { x1: 330, y1: 115, x2: 330, y2: 380, label: 'chain: 265 mm' },
    ],
  },

  // ── Unit 8: GD&T — Tolerance Annotations ──
  {
    name: 'gdt-annotations',
    title: 'GD&T CALLOUTS',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Bore cylindricity frame (on cylinder wall)
      { d: 'M 105 190 L 100 190 L 100 180 L 100 200', strokeWidth: 1.5 },
      { d: 'M 68 182 L 105 182 L 105 198 L 68 198 Z', strokeWidth: 1.5 },
      // Surface finish on head deck
      { d: 'M 170 140 L 175 134 L 180 140 M 175 134 L 175 128', strokeWidth: 1 },
      // Position tolerance on wrist pin
      { d: 'M 200 280 L 200 290 L 230 290', strokeWidth: 1 },
      { d: 'M 230 284 L 280 284 L 280 296 L 230 296 Z', strokeWidth: 1.5 },
      // Datum A indicator (block bottom)
      { d: 'M 200 420 L 200 430 L 195 435 L 205 435 Z', strokeWidth: 1.5 },
      // Perpendicularity on bore to datum A
      { d: 'M 72 188 L 76 188 L 76 192 M 82 190 L 92 190 M 96 190 L 102 190', strokeWidth: 1 },
      // Concentricity on crankshaft journals
      { d: 'M 200 408 L 170 450 L 160 450', strokeWidth: 1 },
    ],
    dimensions: [
      { x1: 160, y1: 145, x2: 240, y2: 145, label: '∅ 80 H7' },
      { x1: 295, y1: 365, x2: 295, y2: 395, label: '∅ 56 g6' },
    ],
  },

  // ── Unit 9: Interview Prep — Title Block & Engineer Seal ──
  {
    name: 'title-block',
    title: 'APPROVED DRAWING',
    viewBox: SHARED_VIEWBOX,
    paths: [
      // Title block border (bottom-right)
      { d: 'M 280 490 L 395 490 L 395 510 L 280 510 Z', strokeWidth: 2 },
      { d: 'M 280 500 L 395 500', strokeWidth: 1 },
      { d: 'M 340 490 L 340 510', strokeWidth: 1 },
      // Drawing border
      { d: 'M 5 5 L 395 5 L 395 515 L 5 515 Z', strokeWidth: 1.5 },
      // Center marks
      { d: 'M 195 2 L 195 8 M 205 2 L 205 8 M 195 512 L 195 518 M 205 512 L 205 518', strokeWidth: 0.8 },
      { d: 'M 2 255 L 8 255 M 2 265 L 8 265 M 392 255 L 398 255 M 392 265 L 398 265', strokeWidth: 0.8 },
      // Scale note
      { d: 'M 282 502 L 282 502', strokeWidth: 0 },
    ],
    dimensions: [],
  },
];
