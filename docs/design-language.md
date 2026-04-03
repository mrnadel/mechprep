# Octokeen Design Language

> Comprehensive visual design system for Octokeen — a Duolingo-inspired gamified multi-profession interview prep app.
> This document is the single source of truth for Claude (or any AI) designing pages, screens, and components.

---

## 1. Philosophy

Octokeen adapts Duolingo's design philosophy for engineering education:

- **Playful, not childish** — Bright colors and friendly shapes, but the content is serious engineering. The UI makes hard material feel approachable.
- **Simple over clever** — Every element earns its place. Fewer shapes, fewer colors, fewer words. If removing something doesn't break understanding, remove it.
- **Consistent over unique** — Every page should feel like it belongs to the same app. Same spacing, same radii, same animation timing. Deviation = confusion.
- **Gamified, not gimmicky** — XP, streaks, leagues, and achievements are core engagement loops, not decorations. Give them visual weight.
- **Mobile-first, desktop-enhanced** — Design for phone screens first. Desktop adds space and sidebars, not fundamentally different layouts.

---

## 2. Color System

### 2.1 Core Brand Colors

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| **Primary** | Indigo | `#6366F1` | Buttons, links, active states, primary actions |
| **Primary dark** | Deep Indigo | `#4F46E5` | Hover states, pressed buttons |
| **Primary deeper** | Dark Indigo | `#4338CA` | Active nav items, emphasis |
| **Brand/Gold** | Vibrant Gold | `#FFB800` | Premium content, XP, achievements, celebrations |
| **Brand dark** | Deep Gold | `#CC9400` | Gold button hover, gold shadows |
| **Accent** | Emerald | `#10B981` | Success, correct answers, streaks, positive feedback |
| **Background** | Off-White | `#FAFAFA` | Page background (never pure white) |

### 2.2 Duolingo-Derived Palette

These colors come directly from Duolingo's design system and are used for illustrations, icons, and thematic accents:

**Greens:**
| Name | Hex | Use |
|------|-----|-----|
| Feather Green | `#58CC02` | Success states, statics topic, correct answers |
| Mask Green | `#89E219` | Green highlights |
| Tree Frog | `#58A700` | Dark green accent |
| Turtle | `#A5ED6E` | Light green fill |
| Sea Sponge | `#D7FFB8` | Green pastel background |

**Blues:**
| Name | Hex | Use |
|------|-----|-----|
| Macaw | `#1CB0F6` | Learning, fluids topic, informational |
| Whale | `#1899D6` | Mid-blue accent |
| Humpback | `#2B70C9` | Dark blue, quest icons |
| Blue Jay | `#84D8FF` | Light blue highlight |

**Reds/Pinks:**
| Name | Hex | Use |
|------|-----|-----|
| Cardinal | `#FF4B4B` | Wrong answers, hearts, danger, strength topic |
| Crab | `#FF7878` | Soft red |
| Flamingo | `#FFB2B2` | Pink pastel |

**Yellows/Oranges:**
| Name | Hex | Use |
|------|-----|-----|
| Bee | `#FFC800` | Achievement gold, stars |
| Fox | `#FF9600` | Streak fire, thermodynamics topic |
| Lion | `#FFB100` | Warm yellow accent |

**Purples:**
| Name | Hex | Use |
|------|-----|-----|
| Beetle | `#CE82FF` | Dynamics topic, special content |
| Betta | `#9069CD` | Purple mid-tone |
| Butterfly | `#6F4EA1` | Deep purple |

**Outline:**
| Name | Hex | Use |
|------|-----|-----|
| Eel | `#4B4B4B` | SVG icon outlines, dark text accents |

### 2.3 Surface/Gray Scale (Slate)

| Token | Hex | Usage |
|-------|-----|-------|
| surface-50 | `#F8FAFC` | Lightest surface |
| surface-100 | `#F1F5F9` | Card backgrounds, hover states |
| surface-200 | `#E2E8F0` | Borders, dividers |
| surface-300 | `#CBD5E1` | Input borders, scrollbar thumb |
| surface-400 | `#94A3B8` | Placeholder text, muted icons |
| surface-500 | `#64748B` | Secondary text |
| surface-600 | `#475569` | Body text |
| surface-700 | `#334155` | Heading text |
| surface-800 | `#1E293B` | Strong headings |
| surface-900 | `#0F172A` | Maximum contrast text |

### 2.4 Unit Theme Colors

Each course unit has its own color scheme for visual variety on the course map:

| Unit | Color | Hex | Dark |
|------|-------|-----|------|
| 0 | Sapphire | `#3B82F6` | `#1D4ED8` |
| 1 | Fuchsia | `#D946EF` | `#A21CAF` |
| 2 | Emerald | `#10B981` | `#047857` |
| 3 | Amber | `#F59E0B` | `#B45309` |
| 4 | Violet | `#8B5CF6` | `#6D28D9` |
| 5 | Rose | `#F43F5E` | `#BE123C` |
| 6 | Teal | `#14B8A6` | `#0F766E` |
| 7 | Orange | `#F97316` | `#C2410C` |
| 8 | Lime | `#84CC16` | `#4D7C0F` |
| 9 | Indigo | `#6366F1` | `#4338CA` |

Themes cycle: `UNIT_THEMES[unitIndex % 10]`.

### 2.5 Color Rules

- **Never use pure white `#FFFFFF` as a page background** — use `#FAFAFA`
- **Never use gray for illustrations** — use tinted neutrals from the Duolingo palette
- **Never freestyle colors** — always pull from the palette above
- **2-3 colors max per component** (plus surface grays)
- **Primary indigo for interactive elements** — buttons, links, toggles
- **Gold for rewards** — XP, achievements, premium, celebrations
- **Green for success** — correct answers, streaks, positive feedback
- **Red for errors** — wrong answers, hearts lost, destructive actions
- No dark mode — app is light-only

---

## 3. Typography

### 3.1 Font Stack

| Role | Font | Source | Fallback |
|------|------|--------|----------|
| **Primary** | Nunito | Google Fonts (variable) | system-ui, sans-serif |
| **Monospace** | JetBrains Mono | Google Fonts (variable) | monospace |

Nunito is Duolingo's recommended substitute for their proprietary Feather Bold. It's rounded, friendly, and highly legible.

### 3.2 Type Scale

| Element | Size | Weight | Line Height | Use |
|---------|------|--------|-------------|-----|
| **Page title** | 24px (1.5rem) | 800 (extrabold) | 1.2 | Top of page headings |
| **Section title** | 20px (1.25rem) | 700 (bold) | 1.3 | Card headers, section labels |
| **Card title** | 16px (1rem) | 700 (bold) | 1.4 | Within cards |
| **Body** | 14px (0.875rem) | 400-600 | 1.5 | General text, descriptions |
| **Small body** | 12px (0.75rem) | 500-600 | 1.4 | Captions, labels, badges |
| **Stat value** | 24px (1.5rem) | 800 | 1.1 | XP count, streak number, score |
| **Stat label** | 14px (0.875rem) | 600 | 1.3 | Below stat values |
| **Button text** | 14px (0.875rem) | 800 | 1 | All button labels |
| **Code/Formula** | 14px | 400 | 1.4 | JetBrains Mono, equations |

### 3.3 Typography Rules

- **Always lowercase for branding** — Duolingo uses lowercase for headlines. Octokeen follows suit for playful elements (achievement names, quest titles)
- **Sentence case for UI text** — buttons, labels, navigation
- **Never use ALL CAPS** except single-word badges (e.g., "PRO")
- **Font feature settings:** `cv02, cv03, cv04, cv11` (enables Nunito's stylistic alternates)
- **Minimum text size:** 12px (never go smaller)
- **Bold for emphasis**, not italic (italic Nunito loses character)

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Based on 4px grid:

| Token | Value | Use |
|-------|-------|-----|
| 1 | 4px | Minimal gaps (icon-to-text in tight layouts) |
| 1.5 | 6px | Small component internal padding |
| 2 | 8px | Standard gap between related items |
| 3 | 12px | Medium gap, card internal padding |
| 4 | 16px | Standard card padding, section gaps |
| 5 | 20px | Sidebar padding, comfortable spacing |
| 6 | 24px | Section separation |
| 8 | 32px | Page section breaks, modal padding |

### 4.2 Page Layout

```
┌──────────────────────────────────────────────┐
│  Desktop (≥1024px / lg)                      │
│  ┌────────┐  ┌──────────────────────────┐    │
│  │        │  │                          │    │
│  │ Sidebar│  │   Main Content           │    │
│  │ 224px  │  │   max-width: 768px       │    │
│  │ sticky │  │   centered               │    │
│  │        │  │                          │    │
│  │ Nav    │  │                          │    │
│  │ items  │  │                          │    │
│  │        │  │                          │    │
│  └────────┘  └──────────────────────────┘    │
└──────────────────────────────────────────────┘

┌──────────────────────┐
│  Mobile (<1024px)    │
│  ┌──────────────────┐│
│  │                  ││
│  │  Main Content    ││
│  │  full width      ││
│  │  px-3 to px-5    ││
│  │                  ││
│  │                  ││
│  │  pb-16 (bottom   ││
│  │  nav clearance)  ││
│  └──────────────────┘│
│  ┌──────────────────┐│
│  │ Bottom Nav (64px)││
│  │ fixed, 5 tabs    ││
│  └──────────────────┘│
└──────────────────────┘
```

| Property | Value |
|----------|-------|
| Desktop sidebar width | 224px (`w-56`) |
| Main content max-width | 768px (`max-w-3xl`) |
| Mobile horizontal padding | 12-20px (`px-3` to `px-5`) |
| Bottom nav height | 64px (16×4) |
| Mobile bottom padding | 64px (`pb-16`) for nav clearance |

### 4.3 Responsive Breakpoints

| Breakpoint | Width | What changes |
|------------|-------|-------------|
| Default | <640px | Mobile layout, single column, bottom nav |
| sm | 640px | Minor spacing adjustments |
| md | 768px | Some flex-row layouts |
| lg | 1024px | **Primary break**: sidebar nav replaces bottom nav |
| xl | 1280px | More generous spacing |

---

## 5. Components

### 5.1 Buttons

**Primary Button (indigo):**
```
Background: #6366F1
Text: white, 14px, extrabold
Padding: 10px 20px
Radius: 8px (rounded-lg)
Hover: #4F46E5, slight shadow
Active: translateY(2px)
Disabled: opacity 50%
```

**GameButton (main CTA — Duolingo-style 3D):**
```
Width: 100%
Padding: 16px vertical
Radius: 16px (rounded-2xl)
Text: 14px, extrabold
Shadow: 0 4px 0 [darkColor] (creates 3D depth)
Active: translateY(4px), shadow removed (press effect)
Disabled: opacity 50%

Variants:
- indigo: bg #6366F1, shadow #4338CA
- gold:   bg #FFB800, shadow #996E00
- purple: bg #CE82FF, shadow #7B2FBE
- green:  bg #58CC02, shadow #3B8700
- red:    bg #FF4B4B, shadow #CC3333
- goldDark: bg #E5A800, shadow #996E00
```

**Secondary Button:**
```
Background: white
Text: #475569, 14px, semibold
Border: 1px #E2E8F0
Radius: 8px
Hover: border darkens, lift 1px
```

**Ghost Button:**
```
Background: transparent
Text: #64748B
No border
Hover: bg #F1F5F9
```

### 5.2 Cards

```
Background: white (#FFFFFF)
Border: 1px #E2E8F0
Radius: 12px (rounded-xl)
Padding: 16px (p-4)
Shadow: 0 1px 2px rgba(0,0,0,0.05)

Hover variant (card-hover):
  Hover: lift 2px, border shift to primary-200
```

**Stat Card:**
```
Same as card base
Internal: flex column, centered
Value: 24px, extrabold, primary-600 or themed color
Label: 14px, semibold, surface-500
```

### 5.3 Inputs

```
Background: white
Border: 1px #CBD5E1
Radius: 8px (rounded-lg)
Padding: 10px 16px
Placeholder: #94A3B8
Focus: border transparent, 2px shadow ring in primary-600
```

### 5.4 Badges / Pills

```
Padding: 4px 10px
Radius: 9999px (fully rounded)
Text: 12px, semibold

Variants:
- primary: bg #EEF2FF, text #4338CA
- success: bg #D1FAE5, text #047857
- warning: bg #FEF3C7, text #B45309
- error:   bg #FFE0E0, text #CC3333
```

### 5.5 Modals

```
Mobile: full-screen, h-screen
Desktop (sm+): max-width 448px (max-w-md), rounded-2xl
Backdrop: black/40 with backdrop-blur-sm
Background: white
Padding: header 20px, content 20px-32px, footer sticky
Animation: y:60 + opacity:0 + scale:0.96 → y:0 + opacity:1 + scale:1 (0.25s)
```

### 5.6 Toast Notifications

```
Max width: 340px
Border: 2px #E5E5E5
Radius: 16px
Padding: 10px 16px 10px 12px
Shadow: 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)
Entry: y:-30, opacity:0, scale:0.92 → spring animation
Draggable: horizontal (swipe to dismiss)
```

### 5.7 Progress Bars

```
Track: surface-200, height 8px, rounded-full
Fill: themed color (primary, green, gold), rounded-full
Transition: width 0.5s ease-out
```

### 5.8 Navigation

**Desktop Sidebar:**
```
Width: 224px
Background: white
Border-right: 1px #E2E8F0
Padding: 20px
Items: flex row, gap 12px, padding 10px, rounded-xl
Active: bg primary-50, text primary-700
Icon: 20px, matching text color
```

**Mobile Bottom Nav:**
```
Position: fixed bottom
Height: 64px
Background: white
Border-top: 1px #E2E8F0
5 tabs, evenly distributed
Active: colored icon + bold label, scale 110%
Inactive: surface-400 icon, surface-500 text
Label: 10px, semibold
Min touch target: 44px
```

---

## 6. Shadows & Depth

| Level | Value | Use |
|-------|-------|-----|
| **Subtle** | `0 1px 2px rgba(0,0,0,0.05)` | Cards at rest |
| **Medium** | `0 4px 6px rgba(0,0,0,0.1)` | Card hover, dropdowns |
| **Large** | `0 8px 32px rgba(0,0,0,0.10)` | Modals, toasts |
| **3D Button** | `0 4px 0 [color]` | GameButton depth illusion |
| **Golden glow** | `0 0 20px rgba(255,184,0,0.3)` | Premium content pulse |

---

## 7. Animation & Motion

### 7.1 Timing

| Animation | Duration | Easing |
|-----------|----------|--------|
| Fade in | 300ms | ease-out |
| Slide up | 400ms | ease-out |
| Scale in | 300ms | ease-out |
| Modal enter | 250ms | spring (stiffness 300, damping 25) |
| Toast enter | spring | natural spring |
| Button press | instant | — |
| Page transition | 200ms | ease-out |

### 7.2 Common Patterns

**Modal entry:**
```
from: { y: 60, opacity: 0, scale: 0.96 }
to:   { y: 0, opacity: 1, scale: 1 }
```

**Toast entry:**
```
from: { opacity: 0, y: -30, scale: 0.92 }
to:   { opacity: 1, y: 0, scale: 1 }
```

**Button interactions:**
```
whileTap: { scale: 0.97, y: 2 }
whileHover: { scale: 1.015 }
```

**Staggered list items:**
```
delay: index * 0.05s
```

**Pulse (glow) — for CTAs and golden elements:**
```
keyframes: scale 1 → 1.05 → 1
duration: 2.5s
repeat: infinite
```

### 7.3 Motion Rules

- **Always use Framer Motion** for component-level animation (not CSS @keyframes for runtime)
- **CSS @keyframes** for decorative infinite loops (shimmer, pulse, glow)
- **Respect `prefers-reduced-motion`** — all animations disable when user requests
- **No animation >500ms** unless celebration (confetti, level-up)
- **Stagger max 50ms** per item — faster keeps things snappy
- **Spring physics** for toasts and modals — feels natural
- **AnimatePresence** for enter/exit transitions (never just mount/unmount)

---

## 8. Golden / Premium Effects

Octokeen's premium (Pro) tier uses a distinctive golden visual language:

```
Base gold: #FFB800
Shadow gold: #996E00
Text gold: #5D4200

Golden shimmer animation:
  - 105° diagonal gradient
  - White stripe (15-30% opacity) sweeps left to right
  - 3s duration, triggers on hover or periodically

Applied to:
  - Premium lesson nodes on course map
  - Pro badge
  - Golden buttons (purchase/upgrade CTAs)
  - Achievement celebrations
  - Gem/coin currency
```

---

## 9. Icons & Illustrations

### 9.1 Lucide React (UI icons)

Used for navigation, actions, and utility icons:
- Size: 20px (nav), 16px (inline), 24px (standalone)
- Color: matches surrounding text color
- Stroke: default 2px

### 9.2 Custom SVG Icons (illustrations)

All custom icons follow the SVG Design Language documented in `docs/svg-design-language.md`:
- **64×64 viewBox**, scales freely
- **Flat fills only** (no gradients)
- **Eel (#4B4B4B) outline**, 2.5px stroke
- **Rounded everything** — stroke-linecap="round", stroke-linejoin="round"
- **~15 shapes max** per icon
- **Standalone shapes** — no enclosing background circles/squares
- Built from three shapes: rounded rectangles, circles, rounded triangles
- Grouped with `data-part` attributes for animation

### 9.3 Emoji

Used for unit/lesson identifiers in course metadata:
- Displayed at 16-20px alongside text
- Used in: unit icons, lesson labels, topic markers
- Do NOT use emoji as primary visual identity — use custom SVGs

---

## 10. Accessibility

| Standard | Implementation |
|----------|---------------|
| **Touch targets** | Minimum 44×44px on all interactive elements |
| **Focus rings** | 2px primary shadow ring on keyboard focus |
| **Skip to content** | Link at top of page, visible on focus |
| **Semantic HTML** | `<nav>`, `<main>`, `<footer>`, `<button>` (never div-as-button) |
| **ARIA labels** | On icon-only buttons, toggles, progress bars |
| **Color contrast** | Body text on #FAFAFA bg = WCAG AA compliant |
| **Reduced motion** | All animations respect `prefers-reduced-motion: reduce` |
| **Font sizing** | Minimum 12px, base 14px |
| **Selection color** | Primary-200 bg, primary-900 text |

---

## 11. Page & Screen Templates

### 11.1 Course Map (Home)

```
Layout: Vertical scrolling list of units
Each unit: colored header band (unit theme) + vertical node path
Lesson nodes: circular, 48-56px, connected by dotted line
Active node: unit color fill, slight glow pulse
Completed: checkmark overlay, muted color
Locked: surface-300, lock icon
Golden (Pro-only): #FFB800 with shimmer
```

### 11.2 Practice Session

```
Layout: Full-screen, no nav (immersive)
Top bar: progress bar (fill with unit color) + close button
Question area: centered text/diagram, max-width 600px
Answer area: 2-4 GameButtons stacked vertically
Feedback: slide-up overlay (green correct / red incorrect)
```

### 11.3 Stats / Progress Dashboard

```
Layout: Grid of stat cards (2 columns on mobile, 3 on desktop)
Each card: white, rounded-xl, centered stat value + label
Charts: simple bar/donut, colored by topic
Header: section title with icon
```

### 11.4 Achievement / Quest Screen

```
Layout: Grid of cards (2-3 columns)
Each card: custom SVG icon (64px) + name + description + progress
Locked: reduced opacity (0.4), surface color
Unlocked: full color, subtle celebration animation
```

### 11.5 Shop / Store

```
Layout: Categorized grid
Item card: icon (64px) + name + description + price (gem icon + number)
Purchase button: GameButton (gold variant)
Owned items: "Equipped" badge
```

### 11.6 Profile

```
Layout: header (avatar + name + level) + stats grid + recent activity
Avatar: 80px circle with frame (custom SVG frame)
Stats: XP, streak, accuracy, lessons completed
```

### 11.7 Settings

```
Layout: vertical form sections
Section title: 16px, bold, surface-700
Form groups: label + input/toggle, gap 12px
Save button: GameButton (indigo)
```

---

## 12. Scrollbar Styling

```css
width/height: 6px
track: transparent
thumb: #CBD5E1 (surface-300)
thumb:hover: #94A3B8 (surface-400)
border-radius: 9999px
```

---

## 13. Do's and Don'ts

### DO
- Use the spacing scale (4px grid)
- Use GameButton for primary CTAs
- Use Framer Motion for component animations
- Use unit theme colors on the course map
- Use golden effects for premium content
- Use Eel outlines on custom SVG icons
- Use Nunito for all text
- Group related items with cards
- Test at mobile width first

### DON'T
- Don't use pure white (#FFF) as page background
- Don't use gray in illustrations (use tinted neutrals)
- Don't use gradients on SVG icons
- Don't put icons inside background circles/squares
- Don't use custom fonts beyond Nunito and JetBrains Mono
- Don't make touch targets smaller than 44px
- Don't animate longer than 500ms (except celebrations)
- Don't use CSS animations for component enter/exit (use Framer Motion)
- Don't add dark mode (light-only app)
- Don't mix more than 3 colors per component

---

## 14. File Reference

| File | What |
|------|------|
| `src/app/globals.css` | All CSS custom properties, @theme tokens, component classes |
| `src/app/layout.tsx` | Font imports (Nunito, JetBrains Mono), providers |
| `src/app/(app)/layout.tsx` | Sidebar nav (desktop) + bottom nav (mobile) |
| `src/components/ui/GameButton.tsx` | Duolingo-style 3D press button |
| `src/lib/unitThemes.ts` | Unit color theme definitions |
| `docs/svg-design-language.md` | SVG icon construction rules |
| `public/svg-gallery.html` | Living SVG icon gallery |
| `src/components/icons/*.tsx` | React icon components |
