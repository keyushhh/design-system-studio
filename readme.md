# Design System Studio

Design System Studio is an open-source, production-grade design system, token engine, and component library built with modern CSS standards, modular UI primitives, and flexible presentation tools.

> **Design System Studio** provides a complete design foundation for web applications and editorial presentations. It pairs a light/dark token architecture with clean typographic rules, crisp layouts, and responsive component primitives.

---

## Features

- **Token Engine**: Complete color system (light & opt-in dark mode), typography scales, spatial system, radii, shadows, and layout grids.
- **Core UI Primitives**: Production-ready React & CSS components including Buttons, Inputs, Cards, Badges, Tabs, Tooltips, Toasts, and Upload Zones.
- **Master Presentation Framework**: 14 editorial slide templates tailored for executive summaries, comparative tables, metrics dashboards, and roadmaps.
- **Dark Mode Support**: Seamless dark theme override layer (`tokens/colors-dark.css`) respecting contrast ratios and component tokens.
- **Figma & Design Tooling Integration**: Exportable token specs (`.json`) compatible with modern design tools.
- **Interactive Documentation SPA**: Standalone browser-based studio to preview components, view token specs, and test interactive states.

---

## Tech Stack

- **Core**: Vanilla HTML5, JavaScript (ES6+), React 18
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid, CSS Color Module Level 4)
- **Typography**: Space Grotesk (Display), Satoshi (Body/Interface), JetBrains Mono (Code/Metadata)
- **Icons**: Lucide SVG System
- **Bundling / Runtime**: Native ES Modules & Babel Standalone (No heavy node build pipeline required)

---

## Local Development

Since Design System Studio relies on native browser ES modules and CSS custom properties, no node installation or build step is strictly required to get started.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/keyushhh/design-system-studio.git
   cd design-system-studio
   ```

2. **Serve locally**:
   Use any standard static file server (e.g. Python, `npx serve`, or VS Code Live Server):
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**:
   Navigate to `http://localhost:8000/` or `http://localhost:8000/DesignSystem.html`.

---

## Build Instructions & Usage

To integrate Design System Studio into an existing web project:

1. Import global styles and token definitions in your HTML header:
   ```html
   <link rel="stylesheet" href="styles.css">
   <script src="theme-init.js"></script>
   ```

2. Use CSS variables directly in your application:
   ```css
   .my-card {
     background-color: var(--surface-card);
     border: 1px solid var(--border-subtle);
     border-radius: var(--radius-md);
     padding: var(--space-4);
   }
   ```

---

## Deployment

Deploying Design System Studio is straight-forward as it consists of static web assets.

### Vercel / Netlify / GitHub Pages
- **Build Command**: None (Static)
- **Output Directory**: `./` (Root directory)

---

## Folder Structure

```
.
├── assets/         # Font archives, logo assets, and static media
├── components/     # UI component definitions (Core, Forms, Feedback, Navigation)
├── guidelines/     # Specimen pages for colors, typography, spacing, and brand rules
├── presets/        # Utility scripts (Grid glow, interactive background effects)
├── slides/         # 14 Master Presentation slide templates and renderers
├── templates/      # Master Presentation starter decks and PPTX templates
├── tokens/         # CSS design tokens (Colors, Typography, Spacing, Dark Theme)
├── DesignSystem.html # Single-page documentation studio
├── designsystem.app.jsx # Main React app for the interactive studio
├── styles.css      # Core entry point importing all design tokens
└── theme-init.js   # Instant theme detection and application script
```

---

## Roadmap

- [ ] **v1.1**: Expand accessibility (a11y) automated auditing and ARIA patterns.
- [ ] **v1.2**: Web Components (Custom Elements) wrapper export.
- [ ] **v1.3**: Automated Figma Token Sync via GitHub Actions.
- [ ] **v1.4**: Storybook integration package.

---

## License

MIT License. See [LICENSE](LICENSE) for more details.
