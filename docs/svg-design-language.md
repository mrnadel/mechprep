# Octokeen SVG Design Language

> Based on [Duolingo's illustration system](https://design.duolingo.com/illustration/shape-language).
> Icons that feel playful, approachable, and instantly recognizable.

---

## 1. Philosophy

Borrowed directly from Duolingo:
- **Simple** — Target ~15 shapes per icon. If it has ~30, it's too complex.
- **Bold** — Thick Eel (#4B4B4B) outlines, confident shapes, no fussy detail.
- **Playful** — Rounded everything, vibrant colors, friendly proportions.
- **Flat** — No gradients. No drop shadows. No blur. Flat fills only.
- **Standalone** — Icons ARE the shape. No enclosing circles, squares, or badges. The object itself is the icon.

---

## 2. Construction: Three Shapes Only

All icons are built from **three basic shapes**:

1. **Rounded rectangle** (most common)
2. **Circle**
3. **Rounded triangle** (via paths with round joins)

You may cut and combine shapes with pathfinder operations, but **every resulting edge must remain rounded**. No pointy shapes. No sharp corners. Ever.

---

## 3. Grid & Canvas

| Property | Value |
|---|---|
| **ViewBox** | `0 0 64 64` |
| **Safe area** | 4px inset (content within 4–60) |
| **Center point** | `32, 32` |
| **Default render size** | 64×64px (scales freely) |

---

## 4. Stroke Rules

| Property | Value |
|---|---|
| **Outline stroke** | `2.5px` in Eel `#4B4B4B` |
| **Detail stroke** | `1.5px` in Eel `#4B4B4B` |
| **Stroke cap** | `round` (always) |
| **Stroke join** | `round` (always) |
| **Minimum gap** | `3px` between parallel strokes |

The Eel outline is what gives all icons the Duolingo family feel. Never omit it.

---

## 5. Color Rules

### NEVER:
- **Never use gradients** — all fills are flat solid colors
- **Never use white (#FFF) as a base fill** — use light pastels (Iguana, Sea Sponge, Canary, etc.)
- **Never use gray** — it appears lifeless. Use Anchovy #D2E4E8 or tinted neutrals instead
- **Never use colors outside the palette**

### DO:
- Use **2-3 colors max** per icon (plus Eel outline and optional white highlight)
- Be **playful and vibrant** — lean into saturated colors
- Use **white highlight spots** (small circles) sparingly for dimensionality

---

## 6. Color Palette (from Duolingo)

### Core Brand
| Name | Hex | Use |
|---|---|---|
| **Feather Green** | `#58CC02` | Primary, success, statics |
| **Mask Green** | `#89E219` | Secondary green, highlights |
| **Tree Frog** | `#58A700` | Dark green accent |

### Secondary
| Name | Hex | Use |
|---|---|---|
| **Macaw** | `#1CB0F6` | Blue, fluids, learning |
| **Cardinal** | `#FF4B4B` | Red, strength, wrong |
| **Bee** | `#FFC800` | Yellow, achievements |
| **Fox** | `#FF9600` | Orange, streak, thermo |
| **Beetle** | `#CE82FF` | Purple, dynamics, special |
| **Humpback** | `#2B70C9` | Dark blue, quests |

### Extended
| Name | Hex | Use |
|---|---|---|
| **Whale** | `#1899D6` | Mid blue |
| **Narwhal** | `#1453A3` | Deep blue |
| **Blue Jay** | `#84D8FF` | Light blue |
| **Moon Jelly** | `#7AF0F2` | Cyan/teal |
| **Turtle** | `#A5ED6E` | Light green |
| **Duck** | `#FBE56D` | Soft yellow |
| **Lion** | `#FFB100` | Warm yellow |
| **Camel** | `#E7A601` | Gold |
| **Guinea Pig** | `#CD7900` | Bronze |
| **Monkey** | `#E5A259` | Warm brown |
| **Grizzly** | `#A56644` | Dark brown |
| **Crab** | `#FF7878` | Soft red |
| **Flamingo** | `#FFB2B2` | Pink |
| **Starfish** | `#FFAADE` | Bright pink |
| **Betta** | `#9069CD` | Mid purple |
| **Butterfly** | `#6F4EA1` | Deep purple |
| **Fire Ant** | `#EA2B2B` | Dark red |

### Pastels (for light fills — NEVER use white)
| Name | Hex |
|---|---|
| **Sea Sponge** | `#D7FFB8` |
| **Canary** | `#FFF5D3` |
| **Walking Fish** | `#FFDFE0` |
| **Iguana** | `#DDF4FF` |
| **Beluga** | `#BBF2FF` |
| **Cheetah** | `#FFCE8E` |
| **Squid** | `#EBE3E3` |

### Outline
| Name | Hex | Use |
|---|---|---|
| **Eel** | `#4B4B4B` | ALL outlines and strokes |

---

## 7. Shadows

- Shadows are **pill-shaped** (rounded rectangles), placed directly **below** the object
- Shadow color: Eel `#4B4B4B` at `10-15%` opacity
- Shadow width: ~60-80% of object width
- Never use ovals (implies perspective) — always use `rx` rounded rects
- Shadow is optional for small icons

---

## 8. Animation Structure

Every icon uses **named groups** for animation targets:

```svg
<svg viewBox="0 0 64 64">
  <g data-part="shadow">    <!-- Pill shadow below object -->
  <g data-part="body">      <!-- Main shape (the icon itself) -->
  <g data-part="detail">    <!-- Inner details, accents -->
  <g data-part="highlight"> <!-- White shine spots -->
  <g data-part="badge">     <!-- Number or label (optional) -->
</svg>
```

### Pivot Points

| Part | Transform Origin | Animation |
|---|---|---|
| `shadow` | Center of shadow | Scale with body |
| `body` | Center of icon | Bounce, wiggle, spin |
| `detail` | Varies | Subtle movement |
| `highlight` | Top-left of icon | Shimmer, fade |
| `badge` | Center of badge | Pop-in, bounce |

---

## 9. Naming

```
{category}-{name}
```

Lowercase, kebab-case. Examples: `topic-statics`, `league-bronze`, `level-1`, `quest-double-up`.

---

## 10. Adding New Icons

1. Build from **rounded rectangles, circles, and rounded triangles** only
2. Pick **2-3 colors** from the palette + Eel outline
3. Keep it to **~15 shapes** maximum
4. Ensure every edge is **rounded**
5. Add a **white highlight circle** (optional, for dimensionality)
6. Group elements into `data-part` groups
7. Test at **24px, 48px, 64px, 128px**
8. Add to `public/svg-gallery.html`

---

## 11. File Reference

| File | Purpose |
|---|---|
| `public/svg-gallery.html` | Living SVG gallery — view, search, copy, add icons |
| `src/components/icons/*.tsx` | React components consumed by the app |
| `docs/svg-design-language.md` | This document |
