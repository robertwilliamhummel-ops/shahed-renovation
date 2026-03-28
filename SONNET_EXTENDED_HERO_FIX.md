# SONNET 4.6 EXTENDED - HERO BUTTON LAYOUT FIX

## PROBLEM STATEMENT

The hero section on index.html has 3 call-to-action buttons that need proper responsive behavior:

1. **Phone button** - "Call 416-575-8791" (orange, primary CTA)
2. **Get Free Estimate button** (orange)
3. **See Our Work button** (white outline)

### Current Issue:
- On **mobile** (<768px): Buttons should stack vertically with phone button FIRST
- On **desktop** (≥768px): All 3 buttons should be in ONE horizontal row, evenly spaced

### What's Not Working:
The buttons are not displaying in a single horizontal row on desktop. They appear stacked or misaligned.

---

## FILES TO ANALYZE

### Primary Files:
1. `index.html` - Lines 55-79 (Hero section HTML structure)
2. `assets/css/styles.css` - Lines 400-500 (Hero base styles)
3. `assets/css/styles.css` - Lines 1350-1450 (Responsive media queries)

### Current HTML Structure (index.html lines 62-73):
```html
<div class="hero__content">
  <span class="hero__label">Scarborough's Trusted Renovation Contractor</span>
  <h1 class="hero__title">Quality Home Renovations<br>You Can Trust</h1>
  <p class="hero__tagline">Clean Work. Fair Price. Free Estimate.</p>
  <div class="hero__buttons">
    <a href="tel:4165758791" class="hero__phone">
      <i class="fas fa-phone"></i> Call 416-575-8791
    </a>
    <a href="contact.html" class="button button--primary button--lg">Get Free Estimate</a>
    <a href="gallery.html" class="button button--outline-white button--lg">See Our Work</a>
  </div>
</div>
```

### Current CSS (styles.css):

**Base Styles (lines ~439-464):**
```css
.hero__buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
}

.hero__phone {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--white);
  background: var(--primary);
  padding: 16px 40px;
  border-radius: var(--border-radius);
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: 100%;
  max-width: 350px;
}
```

**Desktop Media Query (lines ~1364-1375):**
```css
@media (min-width: 768px) {
  .hero__buttons {
    flex-direction: row;
    margin-bottom: var(--spacing-lg);
  }
  
  .hero__phone {
    font-size: 1.5rem;
    padding: 18px 50px;
    max-width: none;
    width: auto;
  }
}
```

---

## REQUIREMENTS

### Mobile Layout (<768px):
- `.hero__buttons` container uses `flex-direction: column`
- All 3 buttons stack vertically
- Phone button appears FIRST (top)
- Each button is full width (or max-width: 350px)
- Vertical gap between buttons: `var(--spacing-md)` (1.5rem)

### Desktop Layout (≥768px):
- `.hero__buttons` container uses `flex-direction: row`
- All 3 buttons in ONE horizontal line
- Buttons should be evenly spaced with gap
- Phone button appears FIRST (leftmost)
- Buttons should NOT wrap to multiple lines
- Each button auto-sizes to content (no forced width)

---

## YOUR TASK

1. **Analyze** the current HTML structure and CSS
2. **Identify** why the desktop layout is not working (buttons not in one row)
3. **Fix** both HTML and CSS to achieve the requirements above
4. **Ensure** mobile-first approach is maintained
5. **Test** that the solution works for both breakpoints

### Possible Issues to Check:
- Is the HTML structure correct? (Are all buttons inside `.hero__buttons`?)
- Are there conflicting CSS rules?
- Is `flex-wrap` set somewhere causing wrapping?
- Are button widths too large for desktop viewport?
- Is `align-items` or `justify-content` causing issues?
- Are there other media queries interfering?

---

## CSS VARIABLES REFERENCE

```css
:root {
  --primary: #E8751A;
  --primary-dark: #C5601A;
  --white: #FFFFFF;
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --border-radius: 8px;
  --transition: 0.3s ease;
  --font-heading: 'Montserrat', sans-serif;
}
```

---

## EXPECTED OUTPUT

Provide:
1. **Root cause analysis** - What's causing the layout issue?
2. **Complete fixed HTML** for the hero section (lines 62-73)
3. **Complete fixed CSS** for `.hero__buttons` and `.hero__phone` (base + media query)
4. **Explanation** of what changed and why

---

## CONSTRAINTS

- **NO frameworks** - Pure HTML/CSS only
- **Mobile-first** - Base styles for mobile, enhance for desktop
- **Use CSS variables** - Don't hardcode colors or spacing
- **Clean code** - Remove any redundant or conflicting rules
- **Maintain accessibility** - Keep proper HTML structure and ARIA labels

---

## CURRENT PROJECT CONTEXT

- Project: Contractor website for Shahed Home Renovation
- Location: c:/Users/Reggie/Documents/Websites/Shahed
- Browser testing: Chrome on Windows 11
- Viewport sizes to test: 375px (mobile), 768px (tablet), 1024px+ (desktop)

---

## PRIORITY

🔴 **CRITICAL** - This is blocking deployment. The site cannot be sent to the client until this is fixed properly.

The user has attempted multiple fixes but the layout is still not working correctly on desktop. This needs a deep analysis and a clean, proper solution.