# Design System Studio

> A brand-agnostic **design token engine**, **component workbench**, and **presentation generator**. Pick a brand seed and the entire system — 180+ tokens, every component, three themes, and a 14-slide deck template — re-derives itself live, then exports to Figma, Tailwind, W3C DTCG, TypeScript, Web Components, and native `.pptx`.

Two applications share one token layer:

| | | |
|---|---|---|
| **Studio** | `index.html` | Single-file React 18 SPA, no framework or router. Token foundations, 20+ component sections, live customizer, WCAG auditor, multi-format export. |
| **Master PPT Generator** | `/generator` | React 19 + TypeScript + Vite app. Turns a structured document into a 14-slide deck and exports editable PowerPoint. |

---

## Key Features

### 1. Perceptual Token Engine (OKLCH)
- **Algorithmic color scales**: A single hex seed generates a full 12-step ramp (`50`–`950`) for brand and accent, in the **OKLCH perceptual color space** ([`ds-color.js`](ds-color.js)).
- **Why OKLCH**: HSL lightness is a geometric midpoint of the RGB cube, not a perceptual one — so a fixed lightness ladder puts step `600` at a very different perceived brightness for amber than for indigo, and brand-coloured text passes contrast for one brand and fails for another. OKLab is built so equal steps in `L` are equal *perceived* steps at every hue. The switch took the spread in "brand-600 against white" across seven test hues from **3.00 to 1.06**, and the shade rungs are tuned so every hue clears WCAG AA (worst case 4.78:1).
- **Seed fidelity vs. predictability**: step `500` returns the seed verbatim; every other rung targets an absolute perceptual lightness and is nudged only as far as needed to keep the ladder monotonic. You get your exact colour *and* stable contrast.
- **Gamut mapping**: out-of-gamut chroma is reduced by binary search at constant lightness and hue, rather than clipped per channel — clipping is cheaper but shifts the hue.
- **Mood palette generator**: Type a mood (*Cyberpunk Neon*, *Luxury Gold*, *Nordic Forest*, *Electric Violet*, *Ocean Minimal*) and get a matched brand + accent pair. Unrecognized prompts fall through to a deterministic string-hash hue generator, so any input yields a stable, repeatable palette. No model involved — the same prompt always returns the same colours, which is the useful property here.
- **One-click brand swap**: five curated seeds sit in the hero. Pressing one re-derives every token, component, theme, and slide in place.
- **Live Token Customizer**: Hex pickers for brand, accent, neutral, and canvas, with an instant platform-wide cascade. Changes broadcast on a `ds-tokens-updated` event and persist to `localStorage`, so the studio, the brand book, and the PPT generator stay in lockstep.

### 2. Three Themes on One Token Contract
- **Light / Dark / High-Contrast**, switched by a `data-theme` attribute on `:root`. Components never branch on theme — they target semantic aliases (`--text-primary`, `--surface-default`, `--action-brand`), and each theme re-points those aliases.
- Dark mode remaps the neutral ladder rather than inverting it, and expresses subtle brand fills as `color-mix()` overlays so they composite correctly on any surface.
- A blocking `theme-init.js` in `<head>` restores the saved theme and brand scale before first paint — no flash.

### 3. WCAG Contrast Auditor
- Resolves every text/surface token pair **from the live cascade at render time**, so it reports the theme and brand that are actually active. Values are normalised through a 1×1 canvas, which parses any colour syntax the browser supports (`color-mix()` serialises as `color(srgb …)`, not `rgba()`), and translucent tokens are composited over their real backdrop before measuring.
- Grades each pair AA / AA Large / AAA / Fail, and re-measures automatically when the theme or brand changes.
- **All 30 audited pairs currently meet AA or better across light, dark, and high-contrast.** Getting there meant fixing three real failures the auditor surfaced once it stopped reporting frozen values.

### 3b. Accessibility Baseline
- `--focus-ring` applied via `:focus-visible` across both apps, in every theme, with a contrast halo so the indicator survives on brand-coloured surfaces. Element selectors (not `:where()`) so a utility class can't outrank it, and transitions are disabled on focus so the ring appears instantly.
- `prefers-reduced-motion` honoured; skip link on the studio; an accessible name on every interactive control in both apps; `forced-colors` fallback for Windows High Contrast.

### 4. Font Playground
- Swap `--font-display`, `--font-sans`, and `--font-mono` at runtime, with on-demand Google Fonts injection. Curated presets (Space Grotesk, Satoshi, JetBrains Mono, Outfit, Inter, Syne, Playfair Display) or any Google Fonts family by name. Selections persist across pages.

### 5. Multi-Format Export
| Format | Output |
|---|---|
| Figma Variables | `.json` matching Figma's native variable import spec |
| W3C DTCG | Standard design-token JSON |
| Tailwind Config | Ready-to-paste `tailwind.config.js` extension |
| TypeScript | Type-safe token constants |
| CSS | Native custom properties |
| Web Components | Framework-agnostic `<ds-button>`, `<ds-badge>`, `<ds-card>` with Shadow DOM |

### 6. Brand Guidelines Book
- `Brand Guidelines.html` — a standalone visual identity manual that reads the same live tokens: color swatches, type scale, logo clear-space, spacing rhythm. Print CSS is tuned for one-click PDF export.

### 7. Master PPT Generator
- **Token sync**: Inherits the studio's active brand, accent, fonts, and theme through `localStorage` + a `SyncEngine`, including cross-tab updates.
- **Document → deck**: A hand-written lexer/parser/validator turns a structured "Business Record" document into an AST, then routes each section to one of 14 slide templates by heading classification. Coverage analysis reports what filled and what got dropped, so nothing is silently lost.
- **Native export**: Editable `.pptx` (real text boxes, embedded fonts) generated fully client-side, plus PDF and PNG. No server.
- **Auto-fit**: Measures bounding boxes and rebalances type so varied content lengths don't overflow or collide.
- **Deck theming**: `hybrid` / `light` / `dark`, per-deck or per-slide. A new deck follows the studio theme; once you pick explicitly, your choice is pinned.

---

## Tech Stack

**Studio** — React 18 (UMD, production build) · vanilla CSS custom properties · esbuild (JSX transform only, no bundling)
**PPT Generator** — React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · pptxgenjs · jspdf · html2canvas · framer-motion · react-router
**Shared** — CSS Color Module Level 4 (`color-mix`), Google Fonts, Lucide icons

---

## Running Locally

### Studio

```bash
git clone https://github.com/keyushhh/design-system-studio.git
cd design-system-studio
npm install
npm run build     # compile designsystem.app.jsx -> designsystem.app.js
npm run serve     # http://localhost:3000
```

Open `http://localhost:3000/` for the studio, or `/Brand%20Guidelines.html` for the brand book.
`DesignSystem.html` is a legacy alias for the same app.

The studio is still authored as a **single JSX file with no imports** — that constraint hasn't changed. What changed is that the compiler no longer ships to visitors: the page used to load Babel Standalone plus React's development build and transform 175KB of JSX on every view. Compiling once here cut first render from **1357ms to 706ms** and cleared the console.

```bash
npm run dev        # rebuild on save
npm run build:all  # studio + PPT generator
```

> **Edit `designsystem.app.jsx`, never `designsystem.app.js`** — the latter is generated, and `npm run build` warns if it's older than its source.

> Serve over HTTP rather than opening the file directly — `styles.css` uses `@import` and the studio reads `localStorage`, both of which behave differently under `file://`.

### PPT Generator (requires Node)

```bash
cd ppt-generator
npm install
npm run dev      # dev server on :5173
npm run build    # type-checks, then emits to ../generator
```

`npm run build` writes its output into `/generator`, which is what the studio links to and what ships in the repo. **Commit `/generator` whenever you rebuild** — the asset filenames are content-hashed, so stale files must be removed together with the new ones added.

---

## Project Structure

```text
.
├── index.html                 # Studio entry point
├── designsystem.app.jsx       # Studio app SOURCE — edit this
├── designsystem.app.js        # Compiled bundle (generated; commit it)
├── build.mjs                  # esbuild JSX transform
├── ds-color.js                # OKLCH perceptual scale engine (shared)
├── theme-init.js              # Blocking theme + token restore (runs before paint)
├── styles.css                 # Global entry: @imports the token layer
├── Brand Guidelines.html      # Standalone brand manual (print-to-PDF)
│
├── tokens/                    # The token contract — single source of truth
│   ├── colors.css             # Primitives + semantic aliases (light)
│   ├── colors-dark.css        # data-theme="dark" overrides
│   ├── colors-hc.css          # data-theme="hc" overrides
│   ├── typography.css
│   ├── spacing.css
│   └── fonts.css
│
├── components/                # Component specs + type definitions
│   ├── core/  forms/  feedback/  navigation/  presentation/
│
├── ppt-generator/             # Master PPT Generator — source
│   └── src/
│       ├── app/               # Shell, routing, SyncEngine, studioTheme, dsColor
│       ├── features/
│       │   ├── deck/          # Deck model, builder, store, theme resolution
│       │   ├── generator/     # Canvas, sidebar, review, present, exporters
│       │   ├── business-record/  # Lexer → parser → validator → AST → viewer
│       │   └── toast/
│       ├── theme/             # tokens.css, BrandGuidelines.css
│       └── styles/globals.css # Theme engine for chrome and slides
│
├── generator/                 # Built PPT Generator (committed, served at /generator)
├── slides/                    # Standalone slide template references
├── guidelines/                # Per-foundation specimen pages
├── docs/                      # Architecture, product spec, roadmap, changelog
└── assets/fonts/              # Self-hosted Satoshi woff2 + source archives
```

---

## Architecture Notes

**One token contract, two apps.** Components address meaning (`--action-brand`), never a palette step. Themes re-point aliases; nothing downstream changes. This is why a brand swap propagates to a PowerPoint export without a single component knowing a brand exists.

**Theme state lives in one place.** `theme-init.js` owns the studio's theme; the generator's `SyncEngine` mirrors it and re-derives its own scales. Both read the same `localStorage` keys, and both listen for same-tab (`ds-tokens-updated`) and cross-tab (`storage`) changes.

**Theme-relative "paper".** `--pure-white` is not white — it's whichever end of the value range reads as the background in the active theme, flipping to near-black under `data-theme="dark"`. Slides carry their own `data-theme`, so a light slide inside dark chrome resolves its own tints correctly.

**One scale engine, verified twice.** `ds-color.js` (studio global) and `ppt-generator/src/app/dsColor.ts` (bundled module) are deliberate duplicates — the generator is a Vite build and can't share a browser global. They are checked byte-for-byte identical against the same seeds; edit them together.

**No hardcoded color in chrome.** Any literal hex in a component is a bug: it's a value that can't follow a brand swap or a theme change. Status colors (danger / warning / success) are brand-independent but theme-dependent, and live as their own token group.

See `docs/Architecture.md` for the full write-up.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
