# Master Presentation - slide templates

The editorial slide language the Master Template Generator produces. Fourteen templates, recreated from `PresentationCanvas.tsx` and populated with the PlanView sample Business Record.

- **`deck.html`** - the full 14-slide deck, vertically stacked (open this to view).
- **`slideRenderers.jsx`** - all 14 slide components, exported to `window.Design System StudioSlides`. Depends on the DS bundle (`SlideFrame`, `Eyebrow`, `HudBar`, `MetricValue`). Plain `React.createElement` (no JSX transform needed).
- **`<Name>.html`** - one card per template for the Design System → Slides tab.

## The 14 templates

| # | Template | Group | Notes |
|---|----------|-------|-------|
| 01 | Cover | Introduction | Client + title + tagline, corner glow |
| 02 | Index / Contents | Introduction | Four navigation parts |
| 03 | Executive Summary | Introduction | Objective + proof-point panel |
| 04 | Section Divider | Context | **Dark** full-bleed marker, ghost numeral |
| 05 | Two-Column Context | Context | Current vs target state |
| 06 | Data Monument | Context | Oversized statistic, emerald unit |
| 07 | Metrics Dashboard | Performance | Bar chart + KPI row |
| 08 | Comparative Table | Performance | Benchmark table, emerald outcome column |
| 09 | Strategic Roadmap | Performance | Phased timeline, dots |
| 10 | Image Editorial | Strategy | Text + image slot |
| 11 | Process Architecture | Strategy | Numbered step cards |
| 12 | Global Reach Map | Strategy | Geo placeholder + sectors |
| 13 | Featured Quote | Closing | Large pull quote + author |
| 14 | Exit / Thank You | Closing | **Dark** closing + contacts |

## Geometry

Every slide is **1920×1080**. `SlideFrame` auto-scales to its container (`fit="width"`) for preview; pass `fit="none"` to render at true size for PDF/PPTX export. Editorial margins: 140px side, 160px top. Only two templates are dark (Section Divider, Exit); everything else is white with a 120px hairline grid.
