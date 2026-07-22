---
name: design-system-studio-design
description: Use this skill to generate well-branded interfaces and assets for Design System Studio, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

Design System Studio is an advocacy marketing platform; its flagship internal product is the **Master Template Generator**, which turns a structured Business Record into an editorial slide deck. The brand is **emerald-green, light-mode, editorial-consulting** - clarity over decoration, near-monochrome neutrals with emerald as the single accent, oversized Space Grotesk display type, Satoshi for interface/body, JetBrains Mono for labels and numbers, and mostly sharp (square) corners in-product.

## What's here
- `styles.css` - the one stylesheet to link; imports all tokens + webfonts (`tokens/*.css`).
- `readme.md` - full brand, content, visual, and iconography guidance + source repos.
- `guidelines/*.html` - foundation specimen cards (type, color, spacing, brand).
- `components/**` - React primitives (Button, IconButton, Badge, Card, Icon, Input, UploadZone, Eyebrow, HudBar, SlideFrame, MetricValue). Each has a `.d.ts` (props), `.prompt.md` (usage), and a card HTML.
- `slides/` - the 14 Master Presentation templates (`slideRenderers.jsx` + per-slide cards + a full deck `index.html`).
- `ui_kits/master-template-generator/` - the interactive app-shell recreation.
- `templates/master-presentation/` - an editable proposal-deck starting point (`MasterPresentation.dc.html` reference + a downloadable `MasterPresentation.pptx` - fully editable, font-embedded, opens in PowerPoint/Google Slides/Canva).
- `assets/` - Design System Studio wordmark (black/white), logo mark, avatars, India map, LinkedIn glyph.

## How to work
If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

Load fonts from the same CDNs (`tokens/fonts.css`) - Space Grotesk & JetBrains Mono (Google Fonts), Satoshi (Fontshare). Use the emerald scale (`--brand-*`, 500 is canonical) as the single accent; keep everything else neutral. End headlines with a period. Never use emoji, aggressive gradients, or heavy shadows.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
