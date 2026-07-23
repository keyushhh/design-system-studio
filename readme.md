# Design System Studio

> An open-source, production-grade **Design System Engine**, **Token Studio**, and **Component Library** built with modern web standards, OKLCH color spaces, zero-build ES module architecture, and brand guidelines PDF generation.

---

## Key Highlights & Features

### 1. Perceptual Token Engine & AI Scale Generator
- **OKLCH Algorithmic Color Engine**: Uniform 10-step primary (`50`–`950`) and secondary accent scales generated in perceptual color space.
- **AI Mood Palette Generator**: Describe any palette mood (*Cyberpunk Neon*, *Luxury Gold*, *Nordic Forest*, *Electric Violet*, *Ocean Minimal*) or seed color to generate complete brand scales instantly.
- **Live Token Customizer**: Real-time hex color pickers and swatch customizers with instant platform-wide style cascade.

### 2. Multi-Theme Architecture (Light, Dark, High-Contrast AAA)
- **3-Way Theme Switcher**: Toggle seamlessly between Light Mode, Dark Mode, and High Contrast (WCAG AAA accessibility mode with high-contrast surfaces).
- **Automated WCAG Auditor**: Built-in real-time WCAG contrast checker rating surface/text pairs with AA/AAA compliance badges.

### 3. Interactive Font Playground & Google Fonts Swapper
- **Dynamic Google Fonts Injection**: Swap display (`--font-display`), body (`--font-sans`), and mono (`--font-mono`) typefaces on the fly.
- **Type Tester & Custom Search**: Test curated presets (*Space Grotesk*, *Satoshi*, *JetBrains Mono*, *Outfit*, *Inter*, *Syne*, *Playfair Display*) or type any font name from Google Fonts.

### 4. Exportable PDF Brand Guidelines
- **Live Identity Manual**: Standalone 9-page visual identity manual (`Brand Guidelines.html`) reflecting real-time token selections, color swatches, typography rules, and logo clear-space specs.
- **One-Click PDF Export**: Built-in print CSS rules to download the full brand book as a PDF with a single click.

### 5. Multi-Format Export Engine
- **Figma Variables (.json)**: Compatible with Figma native variable import specs.
- **Web Components (.js)**: Framework-agnostic native HTML5 Custom Elements (`<ds-button>`, `<ds-badge>`, `<ds-card>`) with Shadow DOM encapsulation.
- **W3C DTCG JSON**: Standard design token format.
- **Tailwind CSS Config**: Automated `tailwind.config.js` extension output.
- **TypeScript Constants**: Type-safe design token constants for TS codebases.
- **CSS Custom Properties**: Native `--brand-500`, `--neutral-900` variables.

---

## Tech Stack

- **Core**: Vanilla HTML5, ES6 Modules, React 18
- **Styling**: Vanilla CSS (CSS Variables, Color Module Level 4, Flexbox, Grid)
- **Typography**: Google Fonts API, Space Grotesk, Satoshi, JetBrains Mono
- **Icons**: Lucide SVG System
- **Architecture**: Zero-Build Browser Compatible (ES Modules & Babel Standalone)

---

## Getting Started Locally

Design System Studio requires **zero Node compilation or build pipelines**.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/keyushhh/design-system-studio.git
   cd design-system-studio
   ```

2. **Run local server**:
   ```bash
   npx serve .
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000/DesignSystem.html` (Studio Engine) or `http://localhost:3000/Brand%20Guidelines.html` (Brand Book PDF).

---

## Project Structure

```text
.
├── assets/                  # Font archives, logos, and static media
├── components/              # React UI primitives (Buttons, Cards, Inputs, Badges, Tabs)
│   ├── core/
│   ├── forms/
│   ├── feedback/
│   └── navigation/
├── tokens/                  # CSS token layers
│   ├── colors.css           # Base color variables & light theme
│   ├── colors-dark.css      # Dark mode override layer
│   └── colors-hc.css        # High contrast WCAG AAA mode
├── DesignSystem.html        # Interactive Single-Page Studio Application
├── designsystem.app.jsx     # Main React Studio App & Token Engine
├── Brand Guidelines.html    # 9-page PDF Brand Manual
├── theme-init.js            # Blocking theme & token restoration script
└── styles.css               # Global stylesheet entry point
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
