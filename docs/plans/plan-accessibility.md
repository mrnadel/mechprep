# Gap 14: Accessibility Gaps in Lesson Components

## Overview & Motivation

The lesson components are the core interactive experience of Octokeen, but they have significant WCAG AA compliance gaps. The primary issues:

1. **Color-only feedback:** Correct answers are shown as green, wrong as red, with no icon or text fallback for color-blind users.
2. **Missing aria-labels:** All `motion.button` elements for answer options across 11+ card components lack `aria-label` attributes.
3. **No screen-reader announcements:** Answer feedback ("Correct!" / "Incorrect") in the bottom bar has `aria-live="assertive"` (good), but individual card components don't announce results.
4. **Keyboard navigation gaps:** Some interactive card types (drag-to-sort, swipe, slider) have no keyboard alternative.
5. **Missing focus management:** After answering a question, focus doesn't move to the feedback bar or continue button.

This plan provides a complete audit and remediation for all lesson-related components to achieve WCAG AA compliance.

---

## Complete Accessibility Audit

### Components Audited

| Component | File | Issues Found |
|---|---|---|
| LessonView | `LessonView.tsx` | Focus management missing after answer; exit confirm dialog missing focus trap |
| QuestionCard | `QuestionCard.tsx` | MC options: no aria-label; T/F buttons: no aria-label; fill-blank buttons: no aria-label; correct/wrong uses color only |
| SortBucketsCard | `SortBucketsCard.tsx` | Drag items: no aria-label, no keyboard alternative for drag, no role |
| MatchPairsCard | `MatchPairsCard.tsx` | Match buttons: no aria-label, no role; matched state not announced |
| OrderStepsCard | `OrderStepsCard.tsx` | Reorder items: no aria-label, no keyboard reorder alternative |
| MultiSelectCard | `MultiSelectCard.tsx` | Toggle buttons: no aria-label, no aria-pressed; no checkbox role |
| SliderEstimateCard | `SliderEstimateCard.tsx` | Custom slider: no role="slider", no aria-valuemin/max/now, no keyboard control |
| ScenarioCard | `ScenarioCard.tsx` | Option buttons: no aria-label; scenario text not in landmark |
| CategorySwipeCard | `CategorySwipeCard.tsx` | Swipe: no keyboard alternative; no aria-label on items |
| RankOrderCard | `RankOrderCard.tsx` | Reorder: no keyboard alternative; no aria-label |
| PickTheBestCard | `PickTheBestCard.tsx` | Option buttons: no aria-label |
| ImageTapCard | `ImageTapCard.tsx` | Tap zones: no aria-label; image has no alt text |
| TeachingCard | `TeachingCard.tsx` | "Got it" button: OK; expand button: no aria-expanded; mascot image: decorative (OK) |
| LessonProgressBar | `LessonProgressBar.tsx` | Has role="progressbar" + aria-label (GOOD) |
| AdaptiveToast | `AdaptiveToast.tsx` | No role="status", no aria-live |
| ResultScreen | `ResultScreen.tsx` | Uses FullScreenModal with role="dialog" + aria-labelledby (GOOD); stats not labelled |
| HeartDisplay | `HeartDisplay.tsx` | No aria-label on container; heart count not announced |
| GameButton | `GameButton.tsx` | No focus-visible styling; disabled state has no aria-disabled |
| MicroCelebration | `MicroCelebration.tsx` | (New file from Gap 13 — needs role="status" + aria-live from day one) |

### What's Already Good

- `LessonProgressBar`: has `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`
- `LessonView` outer container: has `role="main"` + `aria-label`
- Exit confirm dialog: has `role="dialog"`, `aria-modal`, `aria-labelledby`
- Answer feedback bar: has `role="status"` + `aria-live="assertive"`
- Close/exit button: has `aria-label`
- Calculator button: has `aria-label`
- `FullScreenModal`: has `role="dialog"`, `aria-modal`, close button has `aria-label`
- Skip-to-content link in root layout (line 171 of layout.tsx)
- `InviteShare`: buttons have `aria-label` (good pattern to follow)
- `prefers-reduced-motion` media query exists in globals.css and space-stars background

---

## Remediation Plan

### Phase 1: Icon Fallbacks for Color-Only Feedback (High Priority)

**Problem:** Correct = green, wrong = red throughout. Color-blind users (8% of males) cannot distinguish these.

**Solution:** Add checkmark and X icons alongside color changes in all card components.

#### 1a. QuestionCard.tsx — Multiple Choice Options

After answer reveal, when `answered && localCorrect !== null`:

- **Correct option:** Add a checkmark icon (Lucide `Check`) inside the letter badge, replacing the letter. Badge turns green with white check.
- **Wrong selected option:** Add an X icon (Lucide `X`) inside the letter badge. Badge turns red with white X.
- **Unselected wrong options:** Fade as currently (OK — not confusing since they were not selected).

Implementation in the MC option render block (around line 437):

```tsx
<motion.span
  className="flex-shrink-0 flex items-center justify-center"
  style={{
    width: 28, height: 28, borderRadius: 8,
    background: badgeBg, color: badgeColor,
    fontSize: 12, fontWeight: 800,
  }}
>
  {answered && localCorrect !== null ? (
    isCorrectOption ? (
      <Check className="w-3.5 h-3.5" strokeWidth={3} />
    ) : isSelected && !isCorrectOption ? (
      <X className="w-3.5 h-3.5" strokeWidth={3} />
    ) : (
      String.fromCharCode(65 + displayIndex)
    )
  ) : (
    String.fromCharCode(65 + displayIndex)
  )}
</motion.span>
```

Add import at top: `import { Check, X } from 'lucide-react';`

#### 1b. QuestionCard.tsx — True/False Options

After answer reveal:
- **Correct option:** Prepend a checkmark icon before the text.
- **Wrong selected option:** Prepend an X icon before the text.

```tsx
<span className="flex items-center gap-2">
  {answered && localCorrect !== null && isCorrectOption && (
    <Check className="w-4 h-4" strokeWidth={3} />
  )}
  {answered && localCorrect !== null && isSelected && !isCorrectOption && (
    <X className="w-4 h-4" strokeWidth={3} />
  )}
  {value ? 'True' : 'False'}
</span>
```

#### 1c. QuestionCard.tsx — Fill-in-the-Blank

After answer reveal, each blank slot shows green (correct) or red (wrong). Add a small icon after the word inside the blank:

```tsx
<span className="flex items-center gap-1">
  {filledBlanks[i] || '\u00A0'}
  {answered && localCorrect !== null && (
    filledBlanks[i]?.toLowerCase() === question.blanks![i]?.toLowerCase()
      ? <Check className="w-3 h-3" strokeWidth={3} />
      : <X className="w-3 h-3" strokeWidth={3} />
  )}
</span>
```

#### 1d. Apply to All Other Card Components

The same pattern applies to every card component that uses color to indicate correct/wrong:

| Component | Where to add icons |
|---|---|
| `SortBucketsCard` | Each item in its bucket — add check/X based on `results[i]` |
| `MatchPairsCard` | Each matched pair — add check/X based on `results[i]` |
| `OrderStepsCard` | Each step position — add check/X based on position correctness |
| `MultiSelectCard` | Each option — add check/X after reveal |
| `SliderEstimateCard` | The value display — add check/X/~ based on closeness |
| `ScenarioCard` | Same as MC pattern — badge icon swap |
| `PickTheBestCard` | Same as MC pattern — badge icon swap |
| `CategorySwipeCard` | Each categorized item — add check/X |
| `RankOrderCard` | Each ranked item — add check/X based on position |
| `ImageTapCard` | Selected zone — add check/X overlay |

Each component uses `localCorrect` or `results` state to determine correctness. The icon is always `<Check>` for correct and `<X>` for wrong, using `lucide-react`.

---

### Phase 2: Aria Labels on All Interactive Elements (High Priority)

#### 2a. QuestionCard.tsx — Multiple Choice

Add `aria-label` to each MC option button:

```tsx
aria-label={`Option ${String.fromCharCode(65 + displayIndex)}: ${option}${
  answered ? (isCorrectOption ? ', correct answer' : isSelected ? ', incorrect' : '') : ''
}`}
```

#### 2b. QuestionCard.tsx — True/False

Add `aria-label` to each T/F button:

```tsx
aria-label={`${value ? 'True' : 'False'}${
  answered ? (isCorrectOption ? ', correct answer' : isSelected ? ', incorrect' : '') : ''
}`}
```

#### 2c. QuestionCard.tsx — Fill-in-the-Blank Word Bank

Add `aria-label` to each word bank button:

```tsx
aria-label={`Word: ${word}${available ? '' : ', already placed'}`}
```

Add `aria-label` to each blank slot button:

```tsx
aria-label={`Blank ${i + 1} of ${blankCount}${filledBlanks[i] ? `: ${filledBlanks[i]}` : ', empty'}`}
```

#### 2d. SortBucketsCard

Add to each draggable item:

```tsx
aria-label={`Item: ${items[originalIdx]}. ${assignments[originalIdx] >= 0 ? `In bucket ${bucketLabels[assignments[originalIdx]]}` : 'Not sorted yet'}`}
role="option"
```

Add to each bucket drop zone:

```tsx
aria-label={`Bucket: ${label}. Contains ${itemsInBucket.length} items`}
role="listbox"
```

#### 2e. MatchPairsCard

Left column items:

```tsx
aria-label={`${leftItems[i]}${matches[i] !== null ? `, matched with ${rightItems[matches[i]!]}` : ', not matched'}`}
role="option"
aria-selected={selectedLeft === i}
```

Right column items:

```tsx
aria-label={`${rightItems[actualIdx]}${isMatched ? ', already matched' : ''}`}
role="option"
```

#### 2f. OrderStepsCard / RankOrderCard

Each reorder item:

```tsx
aria-label={`Step ${position + 1}: ${stepText}. Use arrow keys to reorder.`}
role="option"
aria-roledescription="sortable item"
```

#### 2g. MultiSelectCard

Each toggle button — use checkbox semantics:

```tsx
role="checkbox"
aria-checked={selected.has(originalIdx)}
aria-label={`${options[originalIdx]}${answered ? (correctIndices.includes(originalIdx) ? ', correct' : selected.has(originalIdx) ? ', incorrect' : '') : ''}`}
```

#### 2h. SliderEstimateCard

The custom slider track/thumb:

```tsx
role="slider"
aria-valuemin={min}
aria-valuemax={max}
aria-valuenow={value}
aria-label={`Estimate: ${value}${unit}`}
```

#### 2i. ScenarioCard / PickTheBestCard

Same pattern as MC options in QuestionCard — add `aria-label` with option text and correctness state.

#### 2j. CategorySwipeCard

Each swipe card:

```tsx
aria-label={`Item: ${items[originalIdx]}. Swipe left for ${categories[0]}, right for ${categories[1]}. Or use arrow keys.`}
```

#### 2k. ImageTapCard

Each tap zone:

```tsx
aria-label={`Zone: ${zone.label || zone.id}`}
role="radio"
aria-checked={selectedZone === zone.id}
```

The diagram container:

```tsx
aria-label={question.question || 'Diagram with tap zones'}
role="img"
```

#### 2l. TeachingCard

The "Tell me more" expand button:

```tsx
aria-expanded={expanded}
aria-label={expanded ? 'Show less detail' : 'Show more detail'}
```

---

### Phase 3: Aria-Live Regions for Feedback (Medium Priority)

#### 3a. AdaptiveToast.tsx

Add to the outer `motion.div`:

```tsx
role="status"
aria-live="polite"
```

This ensures screen readers announce "You're on fire! Bonus XP!" etc.

#### 3b. MicroCelebration.tsx (from Gap 13)

Ensure it has from day one:

```tsx
role="status"
aria-live="polite"
```

#### 3c. HeartDisplay.tsx

Add `aria-label` to the container:

```tsx
<div className="flex items-center gap-1" aria-label={`${isUnlimited() ? 'Unlimited' : current} hearts remaining`}>
```

#### 3d. Answer feedback in LessonView.tsx

Already has `role="status" aria-live="assertive"` on line 1184. This is correct and covers the "Correct!" / "Incorrect" announcements. No change needed.

---

### Phase 4: Keyboard Navigation (Medium Priority)

#### 4a. Focus management after answer

In LessonView.tsx `handleAnswer`, after the answer is submitted and the feedback bar appears, move focus to the Continue button:

```tsx
// After setting lastAnswerCorrect, schedule focus move
requestAnimationFrame(() => {
  const continueBtn = document.querySelector('[data-testid="continue-button"]') as HTMLElement;
  continueBtn?.focus();
});
```

Add `data-testid="continue-button"` to the Continue/Finish GameButton in the feedback bar.

#### 4b. Focus management on question transition

In `handleContinue`, after advancing to the next question, move focus to the question area:

```tsx
requestAnimationFrame(() => {
  const questionArea = document.querySelector('.question-card') as HTMLElement;
  questionArea?.focus();
});
```

Add `tabIndex={-1}` to the `.question-card` div in QuestionCard.tsx so it can receive programmatic focus.

#### 4c. OrderStepsCard / RankOrderCard — keyboard reorder

Framer Motion's `<Reorder>` component supports drag but not keyboard reorder. Add keyboard handlers:

```tsx
onKeyDown={(e) => {
  if (answered) return;
  const idx = currentOrder.indexOf(itemId);
  if (e.key === 'ArrowUp' && idx > 0) {
    e.preventDefault();
    const newOrder = [...currentOrder];
    [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
    setCurrentOrder(newOrder);
  }
  if (e.key === 'ArrowDown' && idx < currentOrder.length - 1) {
    e.preventDefault();
    const newOrder = [...currentOrder];
    [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
    setCurrentOrder(newOrder);
  }
}
```

Add `tabIndex={0}` to each reorder item so it's keyboard-focusable.

Add screen reader instruction text (sr-only):

```tsx
<span className="sr-only">Use up and down arrow keys to reorder items</span>
```

#### 4d. SortBucketsCard — keyboard alternative for drag-to-sort

Items already support tap-to-assign via `selectedItem` state. Enhance with keyboard:

- Add `tabIndex={0}` to each unsorted item
- Add `onKeyDown` handler: Enter/Space selects the item, then Enter/Space on a bucket assigns it
- Add `tabIndex={0}` to bucket headers as assignment targets

#### 4e. CategorySwipeCard — keyboard alternative for swipe

Add keyboard handlers to the current card:

```tsx
onKeyDown={(e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    assignCategory(0); // Left category
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    assignCategory(1); // Right category
  }
}
tabIndex={0}
```

Add sr-only instruction: "Use left/right arrow keys to categorize."

#### 4f. SliderEstimateCard — keyboard control

The custom slider likely uses mouse/touch events. Add keyboard support:

```tsx
onKeyDown={(e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    e.preventDefault();
    setValue(v => Math.max(min, v - step));
    setHasInteracted(true);
  }
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    e.preventDefault();
    setValue(v => Math.min(max, v + step));
    setHasInteracted(true);
  }
}
tabIndex={0}
```

Where `step = Math.max(1, Math.round((max - min) / 100))`.

#### 4g. ImageTapCard — keyboard selection

Add `tabIndex={0}` and `onKeyDown` (Enter/Space selects) to each tap zone overlay button. Zones should already be `<button>` elements; if they're divs, convert them.

#### 4h. Exit confirm dialog — focus trap

The exit confirm dialog (line 1318) has `role="dialog"` and `aria-modal="true"` but no focus trap. When the dialog opens, focus should move to "Keep going" button. When it closes, focus returns to the exit button.

```tsx
// On dialog open
useEffect(() => {
  if (showExitConfirm) {
    const keepGoing = document.querySelector('[data-testid="keep-going-button"]') as HTMLElement;
    keepGoing?.focus();
  }
}, [showExitConfirm]);
```

Add `data-testid="keep-going-button"` to the "Keep going" button.

Add tab-trapping: on the last focusable element in the dialog, Tab wraps to first. On the first, Shift+Tab wraps to last. Or use a simple focus-trap approach:

```tsx
onKeyDown={(e) => {
  if (e.key === 'Tab') {
    const focusable = dialogRef.current?.querySelectorAll('button') ?? [];
    if (focusable.length === 0) return;
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
```

---

### Phase 5: GameButton Focus Styles (Low Priority)

`GameButton.tsx` lacks visible focus indicators for keyboard users.

Add focus-visible styles:

```tsx
className={cn(
  'w-full py-4 rounded-2xl text-sm font-extrabold',
  'flex items-center justify-center gap-2',
  'select-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white',
  v.bg, v.shadow, v.text,
  disabled && 'opacity-50 cursor-not-allowed',
  className,
)}
```

This adds a clear white ring on keyboard focus that works against any button color variant.

---

### Phase 6: ResultScreen Stats Labelling (Low Priority)

The XP and Accuracy stat cards in ResultScreen.tsx are visual but not labelled for screen readers.

Add `aria-label` to each stat card:

```tsx
// XP card
<motion.div
  className="flex-1 rounded-2xl overflow-hidden"
  style={{ border: '3px solid rgba(255,255,255,0.3)' }}
  aria-label={`Total XP earned: ${lessonResult.xpEarned}`}
>
```

```tsx
// Accuracy card
<motion.div
  className="flex-1 rounded-2xl overflow-hidden"
  style={{ border: '3px solid rgba(255,255,255,0.3)' }}
  aria-label={`Accuracy: ${lessonResult.accuracy} percent, ${getAccuracyLabel()}`}
>
```

---

## WCAG AA Checklist

| Criterion | Status Before | Status After |
|---|---|---|
| 1.1.1 Non-text Content | PARTIAL — some images lack alt | PASS — all images and icons have alt/aria-label |
| 1.3.1 Info and Relationships | FAIL — no roles on interactive widgets | PASS — proper roles on all controls |
| 1.4.1 Use of Color | FAIL — correct/wrong uses color only | PASS — check/X icons added alongside color |
| 1.4.3 Contrast (Minimum) | PASS — existing colors meet 4.5:1 | PASS |
| 2.1.1 Keyboard | FAIL — drag/swipe/slider not keyboard-accessible | PASS — all interactions have keyboard alternatives |
| 2.4.3 Focus Order | PARTIAL — some widgets not in tab order | PASS — all interactive elements focusable |
| 2.4.7 Focus Visible | FAIL — no focus indicators on GameButton | PASS — focus-visible ring added |
| 3.3.1 Error Identification | PARTIAL — wrong answers shown by color | PASS — wrong answers have X icon + text |
| 4.1.2 Name, Role, Value | FAIL — buttons lack accessible names | PASS — aria-labels on all buttons |
| 4.1.3 Status Messages | PARTIAL — feedback bar has aria-live | PASS — all toasts/status updates use aria-live |

---

## Implementation Order

### High Priority (do first)
1. Add Check/X icons to QuestionCard.tsx (MC, T/F, fill-blank)
2. Add aria-labels to QuestionCard.tsx (all three question types)
3. Add role="status" + aria-live to AdaptiveToast.tsx
4. Add aria-label to HeartDisplay.tsx
5. Add Check/X icons to remaining card components (SortBuckets, MatchPairs, OrderSteps, MultiSelect, Slider, Scenario, CategorySwipe, RankOrder, PickTheBest, ImageTap)
6. Add aria-labels to remaining card components

### Medium Priority (do second)
7. Add keyboard reorder to OrderStepsCard and RankOrderCard
8. Add keyboard categorization to SortBucketsCard and CategorySwipeCard
9. Add keyboard control to SliderEstimateCard
10. Add keyboard selection to ImageTapCard
11. Add focus management to LessonView (move focus to Continue button after answer)
12. Add focus trap to exit confirm dialog
13. Add aria-expanded to TeachingCard "Tell me more" button

### Low Priority (do last)
14. Add focus-visible styles to GameButton
15. Add aria-labels to ResultScreen stat cards
16. Add tabIndex and focus management for question transitions

---

## Testing Strategy

### Automated Testing

1. **eslint-plugin-jsx-a11y** — Run the existing ESLint config (or add the plugin if missing) to catch missing alt text, missing roles, etc. Add to the project if not already present:
   ```
   npm install -D eslint-plugin-jsx-a11y
   ```
   Add to ESLint config: `extends: ['plugin:jsx-a11y/recommended']`

2. **Vitest component tests** — For each card component, render with `answered=true` and assert:
   - Check icon is present for correct options: `screen.getByRole('img', { name: /correct/ })` or by test ID
   - X icon is present for wrong selected options
   - All buttons have `aria-label` attributes: `screen.getAllByRole('button').forEach(btn => expect(btn).toHaveAttribute('aria-label'))`

3. **axe-core in tests** — Use `vitest-axe` or `@axe-core/react` to run automated a11y checks on rendered components:
   ```tsx
   import { axe } from 'vitest-axe';
   const { container } = render(<QuestionCard ... />);
   expect(await axe(container)).toHaveNoViolations();
   ```

### Manual Testing

1. **Keyboard-only navigation:**
   - Tab through an entire lesson without using mouse
   - Verify all buttons are reachable via Tab
   - Verify Enter/Space activates all buttons
   - Verify arrow keys work for reorder, slider, swipe
   - Verify Escape opens exit dialog, Escape again closes it
   - Verify focus moves to Continue button after answering

2. **Screen reader testing (VoiceOver on Mac / NVDA on Windows):**
   - Start a lesson and verify "Lesson view" is announced
   - Navigate to a question — verify question text is read
   - Navigate to answer options — verify option text + letter are read
   - Select an option and check — verify "Correct!" or "Incorrect" is announced
   - Verify correct answer is announced when wrong
   - Navigate to Continue button — verify it's announced
   - Complete lesson — verify result screen stats are announced

3. **Color-blind simulation:**
   - Use Chrome DevTools > Rendering > "Emulate vision deficiencies" (Protanopia, Deuteranopia)
   - Verify correct/wrong answers are distinguishable by icon alone, not just color
   - Verify all essential information is conveyed without relying on color

4. **Reduced motion:**
   - Enable "Reduce motion" in OS accessibility settings
   - Verify lesson still functions, animations are reduced/removed
   - Verify micro-celebrations (Gap 13) still display text

---

## Files Modified Summary

| File | Changes |
|---|---|
| `src/components/lesson/QuestionCard.tsx` | Add Check/X icons, aria-labels on all buttons, tabIndex on card |
| `src/components/lesson/SortBucketsCard.tsx` | Add Check/X icons, aria-labels, keyboard assign, roles |
| `src/components/lesson/MatchPairsCard.tsx` | Add Check/X icons, aria-labels, roles |
| `src/components/lesson/OrderStepsCard.tsx` | Add Check/X icons, aria-labels, keyboard reorder, roles |
| `src/components/lesson/MultiSelectCard.tsx` | Add Check/X icons, aria-labels, role="checkbox", aria-checked |
| `src/components/lesson/SliderEstimateCard.tsx` | Add Check/X/~ icon, role="slider", aria-value*, keyboard control |
| `src/components/lesson/ScenarioCard.tsx` | Add Check/X icons, aria-labels |
| `src/components/lesson/CategorySwipeCard.tsx` | Add Check/X icons, aria-labels, keyboard left/right |
| `src/components/lesson/RankOrderCard.tsx` | Add Check/X icons, aria-labels, keyboard reorder |
| `src/components/lesson/PickTheBestCard.tsx` | Add Check/X icons, aria-labels |
| `src/components/lesson/ImageTapCard.tsx` | Add aria-labels, keyboard select, role="radio" |
| `src/components/lesson/TeachingCard.tsx` | Add aria-expanded to expand button |
| `src/components/lesson/AdaptiveToast.tsx` | Add role="status", aria-live="polite" |
| `src/components/lesson/LessonView.tsx` | Focus management after answer, focus trap in exit dialog |
| `src/components/lesson/ResultScreen.tsx` | Add aria-labels to stat cards |
| `src/components/ui/GameButton.tsx` | Add focus-visible ring styles |
| `src/components/ui/HeartDisplay.tsx` | Add aria-label to container |
| `src/components/lesson/MicroCelebration.tsx` | (from Gap 13) Add role="status", aria-live="polite" |

---

## No New Files

All changes are modifications to existing files. No new components or utilities are needed for the accessibility remediation.

---

## Critic Resolutions

The following issues were identified during critical review and are now resolved in this plan.

### CR-1 [IMPORTANT] `eslint-plugin-jsx-a11y` may already be installed

**Issue:** `package-lock.json` contains references to `eslint-plugin-jsx-a11y`, suggesting it may be a transitive dependency. Installing it again is harmless but the ESLint config extension may conflict.

**Resolution:** Check before installing:

```bash
# Check if already a direct dependency:
npm ls eslint-plugin-jsx-a11y

# Check if already in ESLint config:
grep -r "jsx-a11y" eslint.config.* .eslintrc*
```

If it's already a dependency, just add the config extension. If it's only a transitive dependency, install it as a direct dev dependency. If the existing ESLint config uses the flat config format (Next.js 16 uses `eslint.config.mjs`), use:

```javascript
// eslint.config.mjs
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // ... existing config ...
  jsxA11y.flatConfigs.recommended,
];
```

### CR-2 [IMPORTANT] Focus management uses `document.querySelector` — fragile in React

**Issue:** `document.querySelector('[data-testid="continue-button"]')` is brittle and may return null if the component hasn't rendered yet.

**Resolution:** Use React refs instead of `document.querySelector`:

```tsx
// In LessonView.tsx:
const continueBtnRef = useRef<HTMLButtonElement>(null);

// After answer submission:
useEffect(() => {
  if (lastAnswerCorrect !== null && continueBtnRef.current) {
    continueBtnRef.current.focus();
  }
}, [lastAnswerCorrect]);

// Pass ref to GameButton:
<GameButton ref={continueBtnRef} variant="primary" onClick={handleContinue}>
  Continue
</GameButton>
```

`GameButton` needs to forward refs. Add `React.forwardRef` to `GameButton.tsx`:

```tsx
const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ children, ...props }, ref) => {
    return <button ref={ref} {...props}>{children}</button>;
  }
);
GameButton.displayName = 'GameButton';
```

For the question area focus on transition, use a similar ref approach:
```tsx
const questionAreaRef = useRef<HTMLDivElement>(null);

// In handleContinue, after advancing question:
requestAnimationFrame(() => questionAreaRef.current?.focus());

// In QuestionCard wrapper:
<div ref={questionAreaRef} tabIndex={-1} className="question-card outline-none">
```

### CR-3 [IMPORTANT] Focus trap implementation is too naive

**Issue:** The focus trap only queries `button` elements, missing links, inputs, and elements with `tabIndex`.

**Resolution:** Use a comprehensive focusable selector:

```typescript
const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// In exit confirm dialog focus trap:
onKeyDown={(e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    setShowExitConfirm(false);
    return;
  }
  if (e.key === 'Tab') {
    const focusable = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? [];
    if (focusable.length === 0) return;
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
```

Also add Escape key handling (close dialog) which was missing from the original plan.

### CR-4 [IMPORTANT] `vitest-axe` may not exist

**Issue:** The package `vitest-axe` may not be available on npm. The standard approach is `jest-axe` or `axe-core` directly.

**Resolution:** Use `axe-core` directly, which is a well-maintained, framework-agnostic library:

```bash
npm install -D axe-core
```

In tests:
```tsx
import axe from 'axe-core';

it('has no accessibility violations', async () => {
  const { container } = render(<QuestionCard ... />);
  const results = await axe.run(container);
  expect(results.violations).toHaveLength(0);
});
```

This avoids any compatibility issues with Vitest-specific wrappers.

### CR-5 [IMPORTANT] Keyboard reorder may conflict with Framer Motion `<Reorder>` internal state

**Issue:** Calling `setCurrentOrder(newOrder)` from a keyboard handler may conflict with Framer Motion's internal drag state in `<Reorder.Group>`.

**Resolution:** Use the `onReorder` callback prop instead of directly setting state:

```tsx
// The Reorder.Group already has an onReorder prop:
<Reorder.Group values={currentOrder} onReorder={setCurrentOrder}>

// For keyboard, trigger the same state update:
onKeyDown={(e) => {
  if (answered) return;
  const idx = currentOrder.indexOf(itemId);
  let newOrder: typeof currentOrder | null = null;

  if (e.key === 'ArrowUp' && idx > 0) {
    e.preventDefault();
    newOrder = [...currentOrder];
    [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
  }
  if (e.key === 'ArrowDown' && idx < currentOrder.length - 1) {
    e.preventDefault();
    newOrder = [...currentOrder];
    [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
  }

  if (newOrder) {
    setCurrentOrder(newOrder);
    // Announce reorder to screen readers
    const position = newOrder.indexOf(itemId) + 1;
    announceRef.current?.textContent = `Moved to position ${position} of ${newOrder.length}`;
  }
}
```

Add a live region for screen reader announcements:
```tsx
<div ref={announceRef} aria-live="assertive" className="sr-only" />
```

Test this carefully — if Framer Motion fights the update, wrap the keyboard reorder in `flushSync` to force synchronous state update, or set `layout={false}` on individual items during keyboard reorder.

### CR-6 [MINOR] Non-standard lesson types not audited

**Issue:** `ConversationView`, `SpeedRoundView`, `TimelineView`, and `CaseStudyView` are not included in the audit.

**Resolution:** Extend the audit to include these components. Add to the Phase 2 (aria-labels) work:

| Component | Key Interactive Elements | Needed |
|-----------|------------------------|--------|
| `ConversationView.tsx` | Option buttons for dialogue choices | `aria-label` with option text |
| `SpeedRoundView.tsx` | Timed answer buttons, timer display | `aria-label`, `role="timer"` on countdown |
| `TimelineView.tsx` | Timeline event placement buttons | `aria-label`, keyboard arrow navigation |
| `CaseStudyView.tsx` | Checkpoint answer buttons | `aria-label` same as MC pattern |

These follow the same patterns as the standard card components. Estimate: +30 minutes of work.

### CR-7 [MINOR] `MicroCelebration.tsx` from Plan 13 needs accessibility from day one

**Issue:** The accessibility plan lists `MicroCelebration.tsx` as needing `role="status" aria-live="polite"` but this file doesn't exist yet (created by Plan 13).

**Resolution:** This is a dependency, not a bug. Plan 13's critic resolution CR-7 already specifies that `MicroCelebration` must include `role="status"` and `aria-live="polite"` from day one. Implementation order recommendation: implement Plan 14 (accessibility) FIRST to establish patterns, then Plan 13 (micro-celebrations) follows those patterns.

### CR-8 [CROSS-CUTTING] WCAG compliance target

**Open product question:** Is WCAG AA or WCAG AAA the target? The plan says AA, but `focus-visible` styling is technically part of the AA requirements (2.4.7 Focus Visible). Some items like enhanced contrast (1.4.6) are AAA. **Recommendation:** Target WCAG AA. The focus-visible work IS AA-required (2.4.7). Enhanced contrast (AAA) is not targeted. Clarify this at the top of the plan.

### CR-9 [CROSS-CUTTING] Implementation should come BEFORE Plans 9-13

**Resolution:** Agreed. The accessibility plan establishes patterns (aria-labels, keyboard handling, focus management, icon fallbacks) that all new UI components should follow. Implement Plan 14 FIRST. Then Plans 9-13's new components naturally follow the established patterns. This is reflected in `MASTER-PLAN.md`'s recommended implementation order.
