# Architecture Overview

This document describes the architectural layout, token flow, component layers, and theme runtime of **Design System Studio**.

---

## Technical Foundations

Design System Studio is built around zero-compilation browser primitives, utilizing native CSS Custom Properties for tokens and standalone React rendering for interactive studio components.

```
┌─────────────────────────────────────────────────────────────┐
│                      DesignSystem.html                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────┐             ┌───────────────────────┐
│     theme-init.js     │             │      styles.css       │
│ (Inline Theme Loader) │             │ (CSS Token Aggregator)│
└───────────────────────┘             └───────────┬───────────┘
                                                  │
                                 ┌────────────────┴────────────────┐
                                 ▼                                 ▼
                     ┌───────────────────────┐         ┌───────────────────────┐
                     │     tokens/*.css      │         │   tokens/colors-dark  │
                     │ (Base Design Tokens)  │         │ (Theme Override Layer)│
                     └───────────────────────┘         └───────────────────────┘
```

---

## 1. Design Token Layer (`tokens/`)

The design token system is split into modular CSS files:
- **`tokens/colors.css`**: Defines primitive color scales (neutral, brand emerald, semantic status steps) and maps them to `--surface-*`, `--text-*`, and `--border-*` semantic aliases.
- **`tokens/colors-dark.css`**: Scoped theme overrides under `:root[data-theme="dark"]`. Remaps neutral ladders, adjusts background surfaces, and lightens contrast pairs without changing primary accent hues.
- **`tokens/typography.css`**: Defines font families (`--font-display`, `--font-sans`, `--font-mono`), font-size steps, line heights, and letter-spacing values.
- **`tokens/spacing.css`**: Spatial scale (`--space-1` through `--space-24`), border-radius definitions (`--radius-sharp`, `--radius-md`, `--radius-lg`), box shadows, and grid structures.
- **`tokens/fonts.css`**: Loads typography web fonts via Google Fonts and Fontshare CDNs.

---

## 2. Component Layer (`components/`)

Components follow a layered hierarchy:
- **Core (`components/core/`)**: Atomic controls (`Button`, `IconButton`, `Badge`, `Card`, `Icon`).
- **Forms (`components/forms/`)**: Data entry primitives (`Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `UploadZone`).
- **Feedback (`components/feedback/`)**: Status overlay elements (`Toast`, `Tooltip`).
- **Navigation (`components/navigation/`)**: Content structure primitives (`Tabs`).
- **Presentation (`components/presentation/`)**: Executive presentation building blocks (`Eyebrow`, `HudBar`, `SlideFrame`, `MetricValue`).

---

## 3. Presentation Engine (`slides/` & `templates/`)

The presentation layer provides 14 slide frame renderers tailored for data visualization, executive briefs, comparative matrices, and process flows. 
- Slide renderers accept structured JSON/object props to generate pixel-precise 1920x1080 slide layouts.
- Templates under `templates/master-presentation/` allow quick exports to standalone presentation formats.

---

## 4. Theme & Runtime State

Theme selection is managed via local storage (`studio-theme`) and applied dynamically to the `:root` element (`data-theme="dark"| "light"`). 

To prevent theme flickering on initial page load, `theme-init.js` runs synchronously in the HTML `<head>` before DOM rendering.
