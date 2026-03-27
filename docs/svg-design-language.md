# MechReady SVG Design Language

> Duolingo-inspired illustration system for mechanical engineering education.
> Every icon in MechReady follows these rules to create a cohesive, friendly, and instantly recognizable visual library.

---

## 1. Philosophy

- **Simple over detailed** — Every icon must be recognizable at 24×24px. If you can't tell what it is at that size, it's too complex.
- **Bold over delicate** — Thick strokes, confident shapes. No hairlines, no fussy detail.
- **Warm over clinical** — Even engineering concepts should feel approachable and fun. Rounded corners, vibrant colors, friendly proportions.
- **Consistent over unique** — Every icon feels like it belongs to the same family. Shared stroke widths, corner radii, color system, and proportions.

---

## 2. Grid & Canvas

| Property | Value |
|---|---|
| **ViewBox** | `0 0 64 64` |
| **Safe area** | 4px inset (content within 4–60) |
| **Center point** | `32, 32` |
| **Default render size** | 64×64px (scales freely) |

All coordinates are designed on the 64×64 grid. Icons scale proportionally.

---

## 3. Stroke Rules

| Property | Value |
|---|---|
| **Primary stroke** | `2.5px` |
| **Secondary stroke** | `1.5px` (inner details) |
| **Stroke cap** | `round` (always) |
| **Stroke join** | `round` (always) |
| **Minimum gap** | `3px` between parallel strokes |

Never use `butt` or `miter`. Every line end and corner is rounded.

---

## 4. Shape Vocabulary

### 4.1 Base Shapes (per category)

| Category | Base Shape | Notes |
|---|---|---|
| **Topics** | Circle (r=28, cx/cy=32) | Colored circle with 2px stroke, centered symbol |
| **Leagues** | Shield | Pointed bottom, symmetric, 2px stroke |
| **Levels** | Circle badge | Like topics but with hex/octagon accent and level number |
| **Achievements** | Medal | Circle with ribbon on top, category-colored |
| **Quests** | Rounded square | `rx=14`, 56×56 at offset (4,4) |
| **Streak** | Flame medal | Medal base with flame centerpiece |
| **Shop** | Rounded square | Same as quests, themed per item |
| **Frames** | Ring/border | Circular frame that wraps avatar |
| **Currency** | Faceted shape | Gem = hexagonal, Coin = circle |

### 4.2 Symbol Rules

- Symbols sit **centered** in the base shape
- Maximum symbol size: **60%** of base shape area
- Symbols use **no more than 3 colors** (base, dark, light/white)
- All symbols have a **2px white or light highlight** at top-left for dimensionality
- No text smaller than `7px` font-size at 64×64

---

## 5. Color System

### 5.1 Core Palette

```
GREEN       #58CC02  (primary, success, statics)
  dark:     #3B8700
  light:    #D0F0B0

PURPLE      #CE82FF  (dynamics, special)
  dark:     #7B2FBE
  light:    #F3E6FF

RED         #FF4B4B  (strength, wrong, danger)
  dark:     #CC3333
  light:    #FFE0E0

ORANGE      #FF9600  (thermo, streak, fire)
  dark:     #CC6B00
  light:    #FFF0D4

BLUE        #1CB0F6  (fluids, learning)
  dark:     #0F85BD
  light:    #D6F0FF

GOLD        #FFD900  (achievements, premium)
  dark:     #CC9900
  light:    #FFF8D4

CYAN        #06B6D4  (exploration, heat transfer)
  dark:     #0E7490
  light:    #CFFAFE

INDIGO      #6366F1  (knowledge, quests)
  dark:     #4338CA
  light:    #E0E7FF

AMBER       #F59E0B  (challenges)
  dark:     #B45309
  light:    #FEF3C7

STEEL       #94A3B8  (neutral, beginner)
  dark:     #64748B
  light:    #E2E8F0
```

### 5.2 Metallic Palette (Leagues & Frames)

```
BRONZE      #CD7F32 → #8B5722  (linear gradient)
SILVER      #C0C0C0 → #808080
GOLD-METAL  #FFD700 → #B8860B
PLATINUM    #14B8A6 → #0F766E
MASTERS     #A855F7 → #6D28D9
```

### 5.3 Level Tier Colors

| Levels | Color | Name |
|---|---|---|
| 1–5 | Steel (#94A3B8) | Beginner |
| 6–10 | Green (#58CC02) | Junior |
| 11–15 | Blue (#1CB0F6) | Mid |
| 16–20 | Purple (#CE82FF) | Senior |
| 21–25 | Gold (#FFD900) | Expert |
| 26–30 | Red (#FF4B4B) | Legendary |

### 5.4 Color Usage Rules

- **Background fills** use the `light` variant
- **Strokes and outlines** use the `dark` variant
- **Main shapes** use the base color
- **Highlights** are always `white` or `rgba(255,255,255,0.3)`
- **Never mix category colors** — each icon uses ONE color family plus white

---

## 6. Gradients

### 6.1 Standard Top-Down Gradient

Every filled shape uses a subtle top-to-bottom linear gradient:
- Top: base color
- Bottom: dark variant

This creates a gentle 3D effect without being skeuomorphic.

```svg
<linearGradient id="example" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stop-color="#58CC02" />
  <stop offset="100%" stop-color="#3B8700" />
</linearGradient>
```

### 6.2 Shine Gradient

A white-to-transparent diagonal sweep for metallic surfaces:

```svg
<linearGradient id="shine" x1="0.2" y1="0" x2="0.8" y2="1">
  <stop offset="0%" stop-color="white" stop-opacity="0.4" />
  <stop offset="50%" stop-color="white" stop-opacity="0" />
  <stop offset="100%" stop-color="white" stop-opacity="0.1" />
</linearGradient>
```

---

## 7. Animation Structure

Every icon is composed of **named groups** (`<g>` elements) that serve as animation targets. Each group has a logical `data-part` attribute and its elements are positioned relative to a clear transform origin.

### 7.1 Standard Parts

```svg
<svg viewBox="0 0 64 64">
  <g data-part="base">       <!-- Background shape (circle, shield, etc.) -->
  <g data-part="body">       <!-- Main symbol body -->
  <g data-part="detail">     <!-- Secondary details (bolts, lines) -->
  <g data-part="highlight">  <!-- Shine, sparkle, glow effects -->
  <g data-part="badge">      <!-- Number badge, label (optional) -->
</svg>
```

### 7.2 Pivot Points

| Part | Transform Origin | Typical Animation |
|---|---|---|
| `base` | `32 32` (center) | Scale pulse, rotate |
| `body` | Center of symbol | Bounce, wiggle, spin |
| `detail` | Varies per element | Subtle movement, fade |
| `highlight` | `32 16` (top-center) | Shimmer, fade in/out |
| `badge` | Center of badge | Pop-in, bounce |

### 7.3 Animation-Friendly Conventions

- All rotatable elements are centered at origin `(0,0)` and positioned via `translate()`
- Compound shapes use `<g>` wrappers (never animate individual path elements)
- Sparkle/highlight elements are separate so they can fade independently
- Badge numbers are separate groups for pop-in animations

---

## 8. Icon Naming Convention

```
{category}-{name}
```

Examples:
- `topic-statics`
- `league-bronze`
- `level-1`
- `achievement-first-principles`
- `quest-double-up`
- `streak-week-warrior`
- `shop-streak-freeze`
- `frame-gold-ring`

Names are lowercase, kebab-case, no abbreviations.

---

## 9. Do's and Don'ts

### DO ✓
- Use the 64×64 viewBox
- Keep strokes at 2.5px (primary) or 1.5px (detail)
- Use `round` cap and join everywhere
- Include a highlight (white arc or dot) for 3D feel
- Group elements by animation purpose
- Test readability at 24×24
- Use the color palette — never freestyle colors

### DON'T ✗
- No hairline strokes (< 1px)
- No sharp corners (miter joins)
- No complex gradients (max 2 stops)
- No drop shadows or blur filters
- No text below 7px
- No more than 15 SVG elements per icon
- No colors outside the palette
- No ungrouped elements (everything in a `<g data-part>`)

---

## 10. Adding New Icons

1. Choose the correct **base shape** for the category
2. Pick the **color family** from the palette
3. Design the **symbol** using simple geometric shapes
4. Test at **24px, 48px, 64px, 128px**
5. Name the icon following the convention
6. Add to the SVG library gallery HTML
7. Export as React component for the app

---

## 11. File Reference

| File | Purpose |
|---|---|
| `public/svg-gallery.html` | Living gallery — view all SVGs, search, copy, preview at sizes |
| `src/components/icons/*.tsx` | React components for app usage |
| `docs/svg-design-language.md` | This document |
