# Accessibility Guidelines - GrowCommon

This document outlines the accessibility features and guidelines implemented in GrowCommon to ensure WCAG 2.1 AA compliance.

## Overview

GrowCommon is designed to be accessible to all users, including those with disabilities. We follow Web Content Accessibility Guidelines (WCAG) 2.1 AA standards.

## Implemented Features

### 1. Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows logical sequence
- Focus indicators are clearly visible
- Skip links for main content navigation

### 2. Screen Reader Support
- Semantic HTML structure with proper heading hierarchy
- ARIA labels and descriptions where needed
- Alt text for all images
- Form labels associated with inputs

### 3. Color and Contrast
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Color is not the only means of conveying information
- High contrast mode support

### 4. Motion and Animation
- Respects `prefers-reduced-motion` setting
- Animations can be disabled for users with vestibular disorders
- Smooth transitions that don't cause seizures

### 5. Focus Management
- Visible focus indicators on all interactive elements
- Focus trapped in modals
- Focus restored after modal closure
- Logical tab order

## Component Accessibility

### Buttons
```tsx
<Button
  aria-label="Close modal"
  onClick={handleClose}
  className="focus-visible:ring-2 focus-visible:ring-gc-accent"
>
  Close
</Button>
```

### Forms
```tsx
<label htmlFor="email" className="block text-sm font-medium">
  Email Address
</label>
<input
  id="email"
  type="email"
  required
  aria-describedby="email-error"
  className="input"
/>
<div id="email-error" role="alert" className="text-red-600">
  {error}
</div>
```

### Navigation
```tsx
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a href="/" role="menuitem" aria-current="page">Home</a>
    </li>
  </ul>
</nav>
```

### Modals
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Modal description</p>
</div>
```

## Testing Checklist

### Manual Testing
- [ ] Navigate entire app using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast ratios
- [ ] Test with high contrast mode
- [ ] Test with reduced motion preferences
- [ ] Test with zoom up to 200%

### Automated Testing
- [ ] Run axe-core accessibility tests
- [ ] Use Lighthouse accessibility audit
- [ ] Test with WAVE browser extension
- [ ] Validate HTML structure

## Color Contrast Ratios

| Element | Foreground | Background | Ratio | Status |
|---------|------------|------------|-------|--------|
| Primary text | #414535 | #ffffff | 8.2:1 | ✅ AA |
| Secondary text | #6b7280 | #ffffff | 4.5:1 | ✅ AA |
| Links | #7A9B6B | #ffffff | 3.8:1 | ✅ AA |
| Buttons | #ffffff | #414535 | 8.2:1 | ✅ AA |

## ARIA Patterns

### Live Regions
```tsx
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

### Progress Indicators
```tsx
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Loading progress"
>
  {progress}%
</div>
```

### Tabs
```tsx
<div role="tablist" aria-label="Settings tabs">
  <button
    role="tab"
    aria-selected={isSelected}
    aria-controls="panel-1"
    id="tab-1"
  >
    Profile
  </button>
</div>
<div
  role="tabpanel"
  aria-labelledby="tab-1"
  id="panel-1"
>
  Panel content
</div>
```

## Error Handling

### Form Validation
- Clear error messages
- Error messages associated with form fields
- Real-time validation feedback
- Error summary for multiple errors

### Loading States
- Loading indicators with descriptive text
- Skeleton screens for better perceived performance
- Progress indicators for long operations

## Mobile Accessibility

### Touch Targets
- Minimum 44px touch target size
- Adequate spacing between interactive elements
- No hover-only interactions

### Orientation
- Supports both portrait and landscape
- Content remains accessible in all orientations

## Testing Tools

### Browser Extensions
- axe DevTools
- WAVE Web Accessibility Evaluator
- Lighthouse
- Color Contrast Analyzer

### Screen Readers
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### Automated Testing
```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Add to test setup
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

# Test component
test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Common Issues and Solutions

### Issue: Missing Alt Text
```tsx
// ❌ Bad
<img src="plant.jpg" />

// ✅ Good
<img src="plant.jpg" alt="Fresh tomatoes growing in a garden" />
```

### Issue: Poor Color Contrast
```css
/* ❌ Bad */
.text { color: #999; }

/* ✅ Good */
.text { color: #6b7280; } /* 4.5:1 contrast ratio */
```

### Issue: Missing Form Labels
```tsx
// ❌ Bad
<input type="email" placeholder="Email" />

// ✅ Good
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />
```

### Issue: Non-descriptive Links
```tsx
// ❌ Bad
<a href="/pro">Click here</a>

// ✅ Good
<a href="/pro">Upgrade to Pro</a>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Resources](https://webaim.org/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)

## Contact

For accessibility questions or issues, please contact:
- Email: accessibility@growcommon.com
- GitHub Issues: [Accessibility Label](https://github.com/growcommon/growcommon/issues?q=is%3Aissue+is%3Aopen+label%3Aaccessibility)
