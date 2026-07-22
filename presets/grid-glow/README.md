# Grid Glow — cursor-reactive grid background (preset)

A reusable background effect: a faint editorial grid whose cells softly **glow up as the cursor passes over them**. The hovered cell lights and holds; each cell you leave fades out in place, leaving a gentle trail of glowing boxes. Emerald by default, theme-aware, zero dependencies.

> Extracted from the **Design System Studio**. Copy `grid-glow.js` into any project.

## Quick start

1. Drop `grid-glow.js` into your project and include it after your content:
   ```html
   <script src="grid-glow.js"></script>
   ```
2. Ensure your app/content renders **above** the background (the layers use `z-index: 0`):
   ```css
   #root { position: relative; z-index: 1; }
   ```
3. (Optional) Edit the `CONFIG` block at the top of `grid-glow.js`.

That's all — it injects the grid background *and* the hover glow itself.

## Config

| Option | Default | What it does |
|---|---|---|
| `color` | `#10b981` | Glow + grid accent (any CSS color) |
| `cellSize` | `120` | Grid cell size (px) |
| `gridLineLight` | `rgba(0,0,0,0.03)` | Grid line color, light theme |
| `gridLineDark` | `rgba(255,255,255,0.055)` | Grid line color, dark theme |
| `glowCenter` | `0.09` | Alpha (0–1) of the central bloom — **the main "brightness" dial** |
| `glowBase` | `0.03` | Alpha (0–1) of the full-cell base fill (fills corners so it's a square, not a circle) |
| `fadeIn` | `300` | ms — how fast a cell lights up |
| `fadeOut` | `850` | ms — trail length (how long a left cell takes to fade) |
| `zIndex` | `0` | Stacking level of the background layers |
| `darkSelector` | `html[data-theme="dark"]` | When this matches, the grid line uses `gridLineDark` |

## Notes

- **Why JS and not CSS `:hover`?** The grid is a background layer behind the content, so CSS `:hover` can't reach it. The script tracks the pointer, maps it to the 120px cell, and lights that cell.
- **Square, not circle:** the glow is a soft central bloom layered over a faint full-cell base, so it fills the box shape instead of reading as a circle or a flat color slab.
- **Performance:** pointer handling is `requestAnimationFrame`-throttled and glow elements are pooled/reused, so fast sweeps stay cheap.
- **Accessibility:** honors `prefers-reduced-motion` (near-instant fades, no long trail).
- **Dark mode:** only the grid line color swaps; the emerald glow works on both. Toggle by setting `data-theme="dark"` on `<html>` (or change `darkSelector`).

## Tuning cheatsheet

- Too bright / harsh → lower `glowCenter` (e.g. `0.06`).
- Want a longer, dreamier trail → raise `fadeOut` (e.g. `1200`).
- Denser/looser grid → change `cellSize`.
- Different brand → change `color`.
