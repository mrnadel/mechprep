# Engineering Calculator — Design Spec

## Problem

During question-answering (both course lessons and practice sessions), engineers often need to do quick calculations — unit conversions, trig, basic arithmetic with the values given in the question. Currently they must switch to an external calculator app, losing sight of the question.

## Design Decision: Side Panel Calculator

**Approach chosen:** A collapsible side panel that slides out from the right edge of the screen. On desktop, it sits *beside* the question content (which is `max-w-3xl` / 768px centered), using the empty space that already exists. On mobile, it becomes a draggable bottom sheet that covers the lower portion of the screen while leaving the question text visible above.

**Why this over alternatives:**

| Approach | Pros | Cons |
|----------|------|------|
| **Side panel (chosen)** | Doesn't cover question content on desktop; always visible alongside question; natural position | Needs responsive handling for mobile |
| Floating draggable window | User can position anywhere | Fiddly on mobile; can cover content; complex drag logic |
| Modal/dialog | Simple to implement | Covers the question — defeats the whole purpose |

## Architecture

### New Component: `EngineeringCalculator`

**Location:** `src/components/calculator/EngineeringCalculator.tsx`

A self-contained `'use client'` component with:
- Expression input display (shows what you're typing)
- Result display (live evaluation as you type)
- Button grid for input
- Calculation history (last 5 results, persisted in sessionStorage)

### Calculator Capabilities

Mechanical engineers need:

| Category | Operations |
|----------|-----------|
| **Basic** | `+`, `-`, `×`, `÷`, `(`, `)` |
| **Powers** | `x²`, `xⁿ`, `√` |
| **Trig** | `sin`, `cos`, `tan` (degrees by default, toggle to radians) |
| **Logarithms** | `log` (base 10), `ln` (natural) |
| **Constants** | `π` (3.14159...), `e` (2.71828...), `g` (9.81 m/s²) |
| **Utility** | `AC` (clear all), `DEL` (backspace), `ANS` (last result), `±` (negate) |

**Expression evaluation:** Use a safe custom expression parser (no `eval`). The parser handles operator precedence, parentheses, and function calls. This is a contained ~80-line recursive descent parser — simple and safe.

**Error handling:** Malformed expressions (unmatched parens, division by zero, missing arguments) display `"Error"` in the result line. The expression remains fully editable so the user can fix it. The result line shows live evaluation as you type — if the current expression is incomplete/invalid, the result line is blank (not "Error") until the user explicitly presses `=`/`Enter`.

**ANS behavior:** `ANS` inserts the last evaluated result. If no previous result exists (fresh calculator), the `ANS` button is disabled (grayed out).

### Layout Integration

Both `LessonView` and `SessionView` are `fixed inset-0 z-50` with a centered `max-w-3xl` content column.

**Desktop (lg+ / ≥1024px):**
```
┌──────────────────────────────────────────────────┐
│  [X] ████████████████████ progress █████  +XP  [🔢] │  ← calc toggle in top bar
├──────────────────────────────────────────────────┤
│                │                    │  Calculator  │
│    (empty)     │   Question Card    │  ┌────────┐ │
│                │   + diagram        │  │ 3+4×2  │ │
│                │   + hint           │  │ = 11   │ │
│                │   + options        │  │        │ │
│                │                    │  │ [7][8] │ │
│                │                    │  │ [4][5] │ │
│                │                    │  │ [1][2] │ │
│                │                    │  └────────┘ │
├──────────────────────────────────────────────────┤
│              [ CHECK / CONTINUE ]                │
└──────────────────────────────────────────────────┘
```

**DOM structure:** The calculator panel is a **sibling** of the `max-w-3xl` content wrapper, both inside the `fixed inset-0` container. It is **not** inside the `max-w-3xl` div. The panel uses `position: fixed; right: 0; top: <top-bar-height>; bottom: <bottom-bar-height>; width: 280px; z-index: 55` (above the lesson content at z-50). The centered content column keeps its existing positioning — the calculator simply overlays the empty right margin without shifting anything.

```
<!-- Inside the fixed inset-0 container -->
<div className="max-w-3xl ...">  <!-- existing, unchanged -->
  {/* top bar, question area, bottom bar */}
</div>
<CalculatorPanel />  <!-- NEW: sibling, position:fixed right:0 -->
```

The calculator panel is **280px wide**. On screens ≥1304px (768px content + 2×268px margins), the panel fits entirely in the right margin with no overlap. On screens 1024–1304px, minor overlap with the question area is acceptable — the panel has a white background and left border, so it simply covers a sliver of the right edge.

**Mobile (<1024px):**
```
┌─────────────────────┐
│ [X] ████████ +XP [🔢]│  ← calc toggle
├─────────────────────┤
│   Question Card     │  ← scrollable, visible above sheet
│   + diagram         │
│   + hint            │
│─────────────────────│  ← bottom sheet slides up from here
│  Calculator         │
│  ┌─────────────────┐│
│  │ expression + =  ││
│  │ [button grid]   ││
│  └─────────────────┘│
│  [ CHECK / CONTINUE]│  ← check button INSIDE the bottom sheet area
└─────────────────────┘
```

The bottom sheet takes ~55% of screen height. The question area above it scrolls independently, keeping the question text and diagram accessible. The **Check/Continue button is repositioned inside the bottom sheet footer** when the calculator is open on mobile, so both calculator and check remain visible. When the calculator closes, the check button returns to its normal bottom-bar position.

### Toggle Button

A small calculator icon button added to the **top bar** of both `LessonView` and `SessionView`, next to the XP counter. Matches the existing button styling (36×36px, rounded-12, `#F5F5F5` background).

**Keyboard shortcut:** Backtick `` ` `` key toggles the calculator open/closed. This key has no conflict with existing shortcuts (`a-d` for MC options, `t/f` for T/F, `1-9` for word bank, `Enter/Space` for check/continue, `Esc` for exit). Note: `c` was considered but conflicts with selecting option C in multiple-choice questions.

### State Management

**No Zustand store needed.** Calculator state is local to the component:
- `expression: string` — current input
- `result: string` — evaluated result
- `history: Array<{expr: string, result: string}>` — last 5
- `isOpen: boolean` — panel visibility (lifted to LessonView/SessionView)
- `isDegrees: boolean` — angle mode toggle

History persists via `sessionStorage` so it survives within a session but clears on tab close.

### Component Tree

```
LessonView / SessionView
├── Top bar
│   └── CalculatorToggle (icon button)
├── Question area (existing)
│   └── QuestionCard (existing)
├── CalculatorPanel (new, conditionally rendered)
│   ├── CalculatorDisplay (expression + result)
│   ├── CalculatorHistory (collapsible, last 5)
│   └── CalculatorKeypad (button grid)
├── Bottom bar (existing)
└── Exit modal (existing)
```

### New Files

| File | Purpose |
|------|---------|
| `src/components/calculator/EngineeringCalculator.tsx` | Main panel component (display + keypad + history) |
| `src/components/calculator/calcEngine.ts` | Pure expression parser/evaluator (no React, easily testable) |

### Button Grid Layout

5 columns, 6 rows. 280px panel with 12px padding = 256px usable. Each button: ~46px wide with 4px gaps.

```
Row 1: [ sin ] [ cos ] [ tan ] [ (  ] [ )  ]     ← functions + parens
Row 2: [ ln  ] [ log ] [  √  ] [ x² ] [ xⁿ ]     ← scientific
Row 3: [  7  ] [  8  ] [  9  ] [  ÷ ] [ DEL ]     ← digits + ops
Row 4: [  4  ] [  5  ] [  6  ] [  × ] [  π  ]     ← digits + ops + const
Row 5: [  1  ] [  2  ] [  3  ] [  − ] [  e  ]     ← digits + ops + Euler's
Row 6: [  0  ] [  .  ] [ ±  ] [  + ] [  =  ]      ← digits + equals
```

`AC`, `ANS`, and `g` (gravity, 9.81) are in the display header area (above the grid), not in the grid itself. This keeps the grid clean at 5×6 = 30 buttons.

### Visual Design

Matches the existing Duolingo-style aesthetic:
- **Panel background:** white with left border `2px solid #E5E5E5`
- **Button style:** Rounded-12, `#F5F5F5` bg, `#3C3C3C` text, 800 weight. Active: scale 0.95 press effect
- **Operator buttons:** Slightly tinted (indigo-50 bg, indigo-700 text)
- **Function buttons** (sin/cos/etc): Smaller text (11px), same style
- **Constants** (π/e/g): Amber-tinted like the hint banners
- **Equals button:** Unit color (indigo for practice, unit theme for lessons)
- **Display:** Mono font (`font-mono`), right-aligned expression, result below in lighter color
- **Panel header:** "Calculator" label + close button + DEG/RAD toggle pill

### Keyboard Input

**Focus-based routing:** Keyboard input routes to the calculator **only when the calculator has focus** (user clicked a calculator button or the display area), not merely when the panel is open. This means a user can have the calculator panel open while still using question shortcuts (a-d, 1-9, t/f, Enter) to answer the question. Clicking into the calculator switches keyboard routing; clicking back on the question area (or pressing Escape) returns it to question shortcuts.

Implementation: the calculator panel listens for keyboard events via its own `onKeyDown` handler on the panel container (with `tabIndex={0}`). The existing global `handleKeyDown` in LessonView/SessionView checks `document.activeElement` — if it's inside the calculator panel, it bails early and lets the calculator handle the event.

Calculator-specific keys (when calculator is focused):
- `0-9`, `.` — digit input
- `+`, `-`, `*`, `/` — operators
- `(`, `)` — parentheses
- `=` or `Enter` — evaluate (add to history, move result to expression)
- `Backspace` — delete last character
- `Escape` — blur the calculator (returns focus/keyboard control to question shortcuts; does NOT close the panel)

### Accessibility

- Panel has `role="complementary"` and `aria-label="Engineering calculator"`
- Buttons have appropriate `aria-label` (e.g., "square root", "pi")
- Focus trapped within panel when open on mobile (bottom sheet)
- `Escape` closes and returns focus to the question area

### Animation

- **Desktop:** Slide in from right (translateX), 200ms spring
- **Mobile:** Slide up from bottom (translateY), 250ms spring
- Uses Framer Motion `AnimatePresence` consistent with existing patterns

## Out of Scope

- Unit conversion tool (separate feature if needed later)
- Graphing capability
- Programmable/stored expressions
- Integration with question values (auto-extracting numbers from question text)
