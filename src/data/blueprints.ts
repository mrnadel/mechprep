/**
 * SVG blueprint path data for each chapter's mechanical component.
 * Each blueprint contains multiple drawing paths that animate in sequence,
 * dimension lines, and labels.
 */

export interface BlueprintPath {
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

export interface BlueprintData {
  name: string;
  title: string;
  paths: BlueprintPath[];
  dimensions: DimensionLine[];
  viewBox: string;
}

export const blueprints: BlueprintData[] = [
  // Unit 0: Statics — Structural Truss Frame
  {
    name: 'structural-frame',
    title: 'STRUCTURAL TRUSS FRAME',
    viewBox: '0 0 400 300',
    paths: [
      // Base beam
      { d: 'M 40 240 L 360 240', strokeWidth: 3 },
      // Left support triangle
      { d: 'M 40 240 L 40 260 L 20 260 L 60 260 L 40 240' },
      // Right support (roller)
      { d: 'M 360 240 L 360 255 M 350 258 A 8 8 0 1 0 366 258' },
      // Vertical members
      { d: 'M 120 240 L 120 160', strokeWidth: 2 },
      { d: 'M 200 240 L 200 100', strokeWidth: 2 },
      { d: 'M 280 240 L 280 160', strokeWidth: 2 },
      // Top chord
      { d: 'M 40 240 L 120 160 L 200 100 L 280 160 L 360 240', strokeWidth: 2.5 },
      // Diagonal bracing
      { d: 'M 40 240 L 200 100', strokeWidth: 1.5 },
      { d: 'M 360 240 L 200 100', strokeWidth: 1.5 },
      // Cross bracing
      { d: 'M 120 160 L 200 240 L 280 160', strokeWidth: 1 },
      // Force arrows
      { d: 'M 200 60 L 200 95 M 192 85 L 200 95 L 208 85', strokeWidth: 2 },
    ],
    dimensions: [
      { x1: 40, y1: 275, x2: 360, y2: 275, label: '4000 mm' },
      { x1: 25, y1: 240, x2: 25, y2: 100, label: '1400 mm' },
    ],
  },

  // Unit 1: Dynamics — Crankshaft + Pistons
  {
    name: 'crankshaft',
    title: 'CRANKSHAFT ASSEMBLY',
    viewBox: '0 0 400 300',
    paths: [
      // Main journal bearing
      { d: 'M 60 150 A 40 40 0 1 1 60 150.01', strokeWidth: 2.5 },
      // Crankpin circle
      { d: 'M 140 110 A 20 20 0 1 1 140 110.01', strokeWidth: 2 },
      // Crank arm
      { d: 'M 80 130 L 122 115 M 80 170 L 122 145' },
      // Connecting rod
      { d: 'M 155 105 L 260 80 L 265 70 L 255 70 L 260 80 L 265 90 L 255 90 L 260 80', strokeWidth: 2 },
      // Piston
      { d: 'M 240 55 L 290 55 L 290 100 L 240 100 Z', strokeWidth: 2.5 },
      // Piston rings
      { d: 'M 238 65 L 292 65 M 238 75 L 292 75' },
      // Cylinder bore
      { d: 'M 235 35 L 235 120 M 295 35 L 295 120', strokeWidth: 1.5 },
      // Second throw
      { d: 'M 80 170 L 140 200' },
      { d: 'M 140 190 A 20 20 0 1 1 140 190.01', strokeWidth: 2 },
      // Counterweight
      { d: 'M 60 190 A 55 55 0 0 1 20 150 L 40 150 A 35 35 0 0 0 60 180', strokeWidth: 2 },
      // Flywheel outline
      { d: 'M 60 80 A 70 70 0 0 1 60 220', strokeWidth: 1 },
    ],
    dimensions: [
      { x1: 60, y1: 270, x2: 260, y2: 270, label: '280 mm stroke' },
      { x1: 310, y1: 55, x2: 310, y2: 100, label: '∅ 85 mm' },
    ],
  },

  // Unit 2: Strength of Materials — Reinforced I-Beam Housing
  {
    name: 'reinforced-housing',
    title: 'REINFORCED I-BEAM SECTION',
    viewBox: '0 0 400 300',
    paths: [
      // I-Beam cross section (centered)
      // Top flange
      { d: 'M 120 60 L 280 60 L 280 80 L 120 80 Z', strokeWidth: 2.5 },
      // Web
      { d: 'M 185 80 L 185 220 L 215 220 L 215 80 Z', strokeWidth: 2 },
      // Bottom flange
      { d: 'M 120 220 L 280 220 L 280 240 L 120 240 Z', strokeWidth: 2.5 },
      // Fillet radii
      { d: 'M 185 80 Q 180 80 180 85 M 215 80 Q 220 80 220 85' },
      { d: 'M 185 220 Q 180 220 180 215 M 215 220 Q 220 220 220 215' },
      // Cross-hatch pattern (stress visualization)
      { d: 'M 190 100 L 210 110 M 190 120 L 210 130 M 190 140 L 210 150 M 190 160 L 210 170 M 190 180 L 210 190' },
      // Neutral axis
      { d: 'M 100 150 L 300 150', strokeWidth: 1 },
      // Stress distribution arrows (tension)
      { d: 'M 310 220 L 340 220 M 330 215 L 340 220 L 330 225', strokeWidth: 2 },
      { d: 'M 310 190 L 330 190 M 323 185 L 330 190 L 323 195' },
      // Stress distribution arrows (compression)
      { d: 'M 340 60 L 310 60 M 320 55 L 310 60 L 320 65', strokeWidth: 2 },
      { d: 'M 330 90 L 310 90 M 320 85 L 310 90 L 320 95' },
    ],
    dimensions: [
      { x1: 120, y1: 260, x2: 280, y2: 260, label: 'b = 160 mm' },
      { x1: 90, y1: 60, x2: 90, y2: 240, label: 'h = 180 mm' },
      { x1: 185, y1: 45, x2: 215, y2: 45, label: 'tw = 30' },
    ],
  },

  // Unit 3: Thermodynamics — Combustion Chamber / Heat Engine
  {
    name: 'combustion-chamber',
    title: 'FOUR-STROKE ENGINE CYCLE',
    viewBox: '0 0 400 300',
    paths: [
      // Cylinder walls
      { d: 'M 130 50 L 130 230 M 270 50 L 270 230', strokeWidth: 2.5 },
      // Cylinder head
      { d: 'M 125 50 L 275 50', strokeWidth: 3 },
      // Piston at TDC
      { d: 'M 135 120 L 265 120 L 265 145 L 135 145 Z', strokeWidth: 2 },
      // Piston rings
      { d: 'M 132 125 L 268 125 M 132 133 L 268 133', strokeWidth: 1 },
      // Connecting rod
      { d: 'M 200 145 L 200 210', strokeWidth: 2.5 },
      // Wrist pin
      { d: 'M 190 145 L 210 145', strokeWidth: 3 },
      // Intake valve
      { d: 'M 155 50 L 155 35 M 148 35 L 162 35 M 155 35 L 155 20', strokeWidth: 2 },
      // Exhaust valve
      { d: 'M 245 50 L 245 35 M 238 35 L 252 35 M 245 35 L 245 20', strokeWidth: 2 },
      // Spark plug
      { d: 'M 200 50 L 200 60 M 195 60 L 205 60 M 197 63 L 203 57', strokeWidth: 1.5 },
      // Combustion lines (heat)
      { d: 'M 165 70 Q 175 85 165 100 M 200 70 Q 210 85 200 100 M 235 70 Q 245 85 235 100', strokeWidth: 1 },
      // Crankshaft circle
      { d: 'M 200 230 A 25 25 0 1 1 200 230.01', strokeWidth: 2 },
    ],
    dimensions: [
      { x1: 130, y1: 270, x2: 270, y2: 270, label: '∅ 86 mm bore' },
      { x1: 110, y1: 50, x2: 110, y2: 230, label: '86 mm stroke' },
    ],
  },

  // Unit 4: Heat Transfer — Cooling System / Heat Exchanger
  {
    name: 'cooling-system',
    title: 'SHELL & TUBE HEAT EXCHANGER',
    viewBox: '0 0 400 300',
    paths: [
      // Outer shell
      { d: 'M 60 80 L 340 80 L 340 220 L 60 220 Z', strokeWidth: 2.5 },
      // Left tube sheet
      { d: 'M 80 80 L 80 220', strokeWidth: 2 },
      // Right tube sheet
      { d: 'M 320 80 L 320 220', strokeWidth: 2 },
      // Tubes (4 rows)
      { d: 'M 80 110 L 320 110', strokeWidth: 1.5 },
      { d: 'M 80 140 L 320 140', strokeWidth: 1.5 },
      { d: 'M 80 170 L 320 170', strokeWidth: 1.5 },
      { d: 'M 80 200 L 320 200', strokeWidth: 1.5 },
      // Baffles
      { d: 'M 140 80 L 140 185', strokeWidth: 2 },
      { d: 'M 200 115 L 200 220', strokeWidth: 2 },
      { d: 'M 260 80 L 260 185', strokeWidth: 2 },
      // Shell-side inlet/outlet
      { d: 'M 100 80 L 100 55 L 85 55 L 115 55', strokeWidth: 2 },
      { d: 'M 300 220 L 300 245 L 285 245 L 315 245', strokeWidth: 2 },
      // Flow arrows (shell side — zigzag)
      { d: 'M 100 40 L 100 55 M 95 48 L 100 40 L 105 48', strokeWidth: 1.5 },
      { d: 'M 300 245 L 300 260 M 295 253 L 300 260 L 305 253', strokeWidth: 1.5 },
    ],
    dimensions: [
      { x1: 60, y1: 270, x2: 340, y2: 270, label: 'L = 2800 mm' },
      { x1: 45, y1: 80, x2: 45, y2: 220, label: '∅ 600 mm' },
    ],
  },

  // Unit 5: Fluid Mechanics — Hydraulic Pump / Turbine
  {
    name: 'hydraulic-pump',
    title: 'CENTRIFUGAL PUMP IMPELLER',
    viewBox: '0 0 400 300',
    paths: [
      // Volute casing
      { d: 'M 200 40 A 110 110 0 1 1 310 180 L 370 180 L 370 200 L 310 200 A 110 110 0 1 0 200 40', strokeWidth: 2.5 },
      // Impeller outer circle
      { d: 'M 200 70 A 80 80 0 1 1 200 70.01', strokeWidth: 2 },
      // Impeller hub
      { d: 'M 200 130 A 20 20 0 1 1 200 130.01', strokeWidth: 2 },
      // Impeller vanes (6 curved blades)
      { d: 'M 210 135 Q 240 120 250 85', strokeWidth: 1.5 },
      { d: 'M 215 145 Q 250 150 275 140', strokeWidth: 1.5 },
      { d: 'M 205 155 Q 230 180 245 210', strokeWidth: 1.5 },
      { d: 'M 190 155 Q 160 180 150 215', strokeWidth: 1.5 },
      { d: 'M 185 145 Q 150 150 125 140', strokeWidth: 1.5 },
      { d: 'M 190 135 Q 160 120 150 85', strokeWidth: 1.5 },
      // Eye inlet
      { d: 'M 190 40 L 190 20 L 210 20 L 210 40', strokeWidth: 2 },
      // Discharge arrow
      { d: 'M 340 190 L 360 190 M 353 185 L 360 190 L 353 195', strokeWidth: 2 },
      // Rotation arrow
      { d: 'M 240 60 A 50 50 0 0 1 260 90 M 252 82 L 260 90 L 255 80' },
    ],
    dimensions: [
      { x1: 120, y1: 270, x2: 280, y2: 270, label: '∅ imp = 320 mm' },
      { x1: 345, y1: 175, x2: 345, y2: 205, label: '∅ 50 mm' },
    ],
  },

  // Unit 6: Materials Science — Material-Selected Casing
  {
    name: 'material-casing',
    title: 'CAST ALLOY HOUSING',
    viewBox: '0 0 400 300',
    paths: [
      // Outer profile of housing
      { d: 'M 80 100 L 320 100 Q 340 100 340 120 L 340 200 Q 340 220 320 220 L 80 220 Q 60 220 60 200 L 60 120 Q 60 100 80 100', strokeWidth: 2.5 },
      // Inner cavity
      { d: 'M 100 120 L 300 120 Q 310 120 310 130 L 310 190 Q 310 200 300 200 L 100 200 Q 90 200 90 190 L 90 130 Q 90 120 100 120', strokeWidth: 2 },
      // Bolt holes (4 corners)
      { d: 'M 75 110 A 8 8 0 1 1 75 110.01 M 325 110 A 8 8 0 1 1 325 110.01 M 75 210 A 8 8 0 1 1 75 210.01 M 325 210 A 8 8 0 1 1 325 210.01', strokeWidth: 1.5 },
      // Ribs / internal stiffeners
      { d: 'M 150 120 L 150 200 M 200 120 L 200 200 M 250 120 L 250 200' },
      // Wall hatch pattern (material indication)
      { d: 'M 65 115 L 85 130 M 65 130 L 85 145 M 65 145 L 85 160 M 65 160 L 85 175 M 65 175 L 85 190' },
      { d: 'M 315 115 L 335 130 M 315 130 L 335 145 M 315 145 L 335 160 M 315 160 L 335 175 M 315 175 L 335 190' },
      // Mounting flange
      { d: 'M 50 155 L 60 155 M 50 165 L 60 165 M 340 155 L 350 155 M 340 165 L 350 165', strokeWidth: 2 },
      // Port opening
      { d: 'M 180 100 L 180 85 L 220 85 L 220 100', strokeWidth: 2 },
      // Surface finish symbol
      { d: 'M 155 85 L 160 80 L 165 85 M 160 80 L 160 75' },
      // Material callout line
      { d: 'M 120 160 L 50 250 L 90 250', strokeWidth: 1 },
    ],
    dimensions: [
      { x1: 60, y1: 250, x2: 340, y2: 250, label: '280 × 120 mm' },
      { x1: 370, y1: 100, x2: 370, y2: 220, label: 'wall: 10 mm' },
    ],
  },

  // Unit 7: Machine Design — Gear Train
  {
    name: 'gear-train',
    title: 'SPUR GEAR MESH',
    viewBox: '0 0 400 300',
    paths: [
      // Driving gear pitch circle
      { d: 'M 150 70 A 80 80 0 1 1 150 70.01', strokeWidth: 1 },
      // Driving gear hub
      { d: 'M 150 135 A 15 15 0 1 1 150 135.01', strokeWidth: 2 },
      // Driving gear teeth (simplified 12 teeth)
      { d: 'M 150 70 L 147 62 L 153 62 L 150 70 M 222 112 L 228 107 L 230 113 L 222 112 M 222 188 L 228 193 L 230 187 L 222 188 M 150 230 L 147 238 L 153 238 L 150 230 M 78 188 L 72 193 L 70 187 L 78 188 M 78 112 L 72 107 L 70 113 L 78 112', strokeWidth: 1.5 },
      // Driven gear pitch circle
      { d: 'M 290 120 A 50 50 0 1 1 290 120.01', strokeWidth: 1 },
      // Driven gear hub
      { d: 'M 290 160 A 12 12 0 1 1 290 160.01', strokeWidth: 2 },
      // Driven gear teeth (simplified)
      { d: 'M 290 120 L 288 113 L 292 113 L 290 120 M 336 145 L 342 142 L 342 148 L 336 145 M 336 185 L 342 182 L 342 188 L 336 185 M 290 210 L 288 217 L 292 217 L 290 210 M 244 185 L 238 188 L 238 182 L 244 185 M 244 145 L 238 148 L 238 142 L 244 145', strokeWidth: 1.5 },
      // Addendum circles
      { d: 'M 150 60 A 90 90 0 1 1 150 60.01', strokeWidth: 0.5 },
      { d: 'M 290 110 A 60 60 0 1 1 290 110.01', strokeWidth: 0.5 },
      // Center line
      { d: 'M 150 150 L 290 170', strokeWidth: 1 },
      // Shaft keyways
      { d: 'M 145 140 L 145 150 L 155 150 L 155 140', strokeWidth: 1.5 },
      { d: 'M 286 162 L 286 170 L 294 170 L 294 162', strokeWidth: 1.5 },
      // Pressure angle line
      { d: 'M 220 140 L 235 155 M 220 140 L 225 155', strokeWidth: 1 },
    ],
    dimensions: [
      { x1: 70, y1: 260, x2: 230, y2: 260, label: 'Z₁ = 24, m = 6' },
      { x1: 240, y1: 240, x2: 340, y2: 240, label: 'Z₂ = 16' },
    ],
  },

  // Unit 8: GD&T — Tolerance-Marked Assembly Drawing
  {
    name: 'gdt-assembly',
    title: 'GD&T FEATURE CONTROL',
    viewBox: '0 0 400 300',
    paths: [
      // Shaft cross-section
      { d: 'M 60 130 L 340 130 L 340 170 L 60 170 Z', strokeWidth: 2.5 },
      // Shoulder steps
      { d: 'M 120 110 L 120 130 M 120 170 L 120 190 M 120 110 L 280 110 L 280 130 M 280 170 L 280 190 L 120 190', strokeWidth: 2 },
      // Bearing journal
      { d: 'M 280 120 L 320 120 L 320 180 L 280 180', strokeWidth: 2 },
      // Keyway
      { d: 'M 160 130 L 160 125 L 200 125 L 200 130', strokeWidth: 1.5 },
      // Feature control frames
      // Cylindricity
      { d: 'M 280 85 L 280 95 M 265 85 L 330 85 L 330 100 L 265 100 Z', strokeWidth: 1.5 },
      // Position
      { d: 'M 180 210 L 180 195 M 140 210 L 260 210 L 260 225 L 140 225 Z', strokeWidth: 1.5 },
      // Datum indicators
      { d: 'M 60 150 L 40 150 L 40 135 L 40 165 M 35 140 L 35 160', strokeWidth: 2 },
      // Perpendicularity symbol in frame
      { d: 'M 155 213 L 155 222 L 160 222 M 170 215 L 185 215 M 200 215 L 210 215', strokeWidth: 1 },
      // Surface finish symbols
      { d: 'M 140 110 L 145 105 L 150 110 M 145 105 L 145 98', strokeWidth: 1 },
      { d: 'M 300 120 L 305 115 L 310 120 M 305 115 L 305 108' },
      // Centerline
      { d: 'M 50 150 L 350 150', strokeWidth: 0.5 },
    ],
    dimensions: [
      { x1: 120, y1: 250, x2: 280, y2: 250, label: '∅ 45 h6 (-0.016)' },
      { x1: 280, y1: 70, x2: 320, y2: 70, label: '∅ 40 g6' },
    ],
  },

  // Unit 9: Interview Prep — Certification / Professional Stamp
  {
    name: 'certification',
    title: 'PROFESSIONAL ENGINEER SEAL',
    viewBox: '0 0 400 300',
    paths: [
      // Outer circle
      { d: 'M 200 30 A 120 120 0 1 1 200 30.01', strokeWidth: 3 },
      // Inner circle
      { d: 'M 200 60 A 90 90 0 1 1 200 60.01', strokeWidth: 2 },
      // Inner ring
      { d: 'M 200 80 A 70 70 0 1 1 200 80.01', strokeWidth: 1.5 },
      // Gear/cog teeth around outside (8 teeth)
      { d: 'M 200 25 L 195 15 L 205 15 Z M 285 65 L 292 58 L 295 68 Z M 325 150 L 335 147 L 335 153 Z M 285 235 L 295 232 L 292 242 Z M 200 275 L 205 285 L 195 285 Z M 115 235 L 108 242 L 105 232 Z M 75 150 L 65 153 L 65 147 Z M 115 65 L 105 68 L 108 58 Z', strokeWidth: 1.5 },
      // Center emblem — wrench & gear
      { d: 'M 185 130 L 175 160 L 180 165 L 190 140 M 215 130 L 225 160 L 220 165 L 210 140', strokeWidth: 2 },
      // Center gear
      { d: 'M 200 120 A 18 18 0 1 1 200 120.01', strokeWidth: 2 },
      { d: 'M 200 130 A 8 8 0 1 1 200 130.01', strokeWidth: 1.5 },
      // Banner / ribbon
      { d: 'M 120 175 Q 150 165 200 170 Q 250 175 280 170 L 285 185 Q 250 180 200 185 Q 150 190 115 180 Z', strokeWidth: 1.5 },
      // Stars
      { d: 'M 160 105 L 163 112 L 170 112 L 164 117 L 167 124 L 160 120 L 153 124 L 156 117 L 150 112 L 157 112 Z M 240 105 L 243 112 L 250 112 L 244 117 L 247 124 L 240 120 L 233 124 L 236 117 L 230 112 L 237 112 Z', strokeWidth: 1 },
      // Signature line
      { d: 'M 155 215 L 245 215 M 160 225 L 240 225', strokeWidth: 1 },
    ],
    dimensions: [],
  },
];
