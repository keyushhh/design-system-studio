# Design Principles

Design System Studio adheres to six visual and technical principles.

---

## 1. High Contrast & Selective Accent

High contrast neutral scales (`--neutral-50` through `--neutral-950`) drive layout structures. Accent colors (`--brand-500`) are used intentionally for focal points—such as interactive focus rings, active tab indicators, data callouts, and key action buttons.

## 2. Sharp & Crisp Geometry

In-product surfaces prefer crisp, structured boundaries (`--radius-sharp: 0` or `--radius-sm: 2px` / `--radius-md: 4px`). Sharp edges give dashboards and editorial decks an executive, print-like feel.

## 3. Typographic Hierarchy & Purposeful Roles

Typography uses three font families, each assigned a specific role:
- **Display (`Space Grotesk`)**: Headlines, oversized data numerals, slide titles. Set with tight tracking.
- **Interface & Body (`Satoshi`)**: Navigation items, form labels, card body text, buttons.
- **Metadata & Code (`JetBrains Mono`)**: Status indicators, labels, numerical tables, HUD overlays. Always uppercase with wide letter-spacing.

## 4. Subdued Elevation & Border-Driven Division

Component separation relies on single hairline borders (`1px solid var(--border-subtle)`) rather than heavy drop shadows. Shadows are reserved for floating overlays (`Toast`, `Tooltip`, dropdown popovers).

## 5. Seamless Dark Mode Adaptation

Dark mode is implemented as a single CSS override layer. Components do not contain hardcoded theme logic—they target semantic token variables, allowing surfaces and contrast levels to adapt automatically.

## 6. Zero-Compromise Performance

The system prioritizes native CSS variables, standard DOM nodes, and zero extra bundle dependencies. Pages render fast, respond instantly to theme shifts, and can be served statically.
