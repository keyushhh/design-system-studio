# PROJECT.md

## Overview

**Design System Studio** is a standalone, production-grade design system engine, UI component library, and editorial presentation platform. Designed for high performance and zero-overhead distribution, it operates entirely with modern native web standards (CSS Custom Properties, ES6 modules, and lightweight browser primitives).

---

## Core Objectives

1. **Brand-Agnostic Token Architecture**: Provide a robust, multi-theme design token foundation (light and dark mode) that can be easily customized or extended.
2. **Editorial Component Standard**: Deliver crisp, accessible UI components and full slide-frame presentation layouts suitable for production web apps and executive decks.
3. **Zero Heavy-Build Overhead**: Maintain instant local serving capabilities using standard browser features, React UMD/ESM compatibility, and clean modular structures.

---

## Repository Structure

```
.
├── PROJECT.md               # High-level project summary and goals
├── AGENTS.md                # Agent instructions & constraints for AI contributors
├── CHANGELOG.md             # Project version history and changes
├── DesignSystem.html        # Interactive documentation SPA entry point
├── designsystem.app.jsx    # React application driving the interactive studio
├── styles.css               # Main CSS entry point importing all design tokens
├── theme-init.js            # Instant inline theme loader (prevents dark mode flash)
├── assets/                  # Fonts, brand assets, icons, and static binaries
├── components/              # UI components grouped by tier (core, forms, feedback, navigation, presentation)
├── docs/                    # Technical architecture, design principles, roadmap, and contributing guides
├── guidelines/              # Interactive HTML specimens for tokens and guidelines
├── presets/                 # Grid glow and background visual utilities
├── slides/                  # 14 Master Presentation slide templates and renderers
├── templates/               # Presentation starter decks and PPTX assets
└── tokens/                  # Modular CSS design tokens (colors, typography, spacing, dark overrides)
```

---

## Technology Stack

- **Markup & Layout**: HTML5, Semantic Elements, CSS Grid, Flexbox
- **Design Tokens**: CSS Custom Properties (`var(--brand-*)`, `var(--neutral-*)`, `var(--space-*)`)
- **Interactive UI**: React 18, Babel Standalone (for browser-native JSX rendering)
- **Typography**: Space Grotesk (Display), Satoshi (Body/Interface), JetBrains Mono (Code/Metadata)
- **Iconography**: Lucide SVG line icon system
