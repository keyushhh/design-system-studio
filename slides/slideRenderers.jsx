/* Design System Studio Master Presentation - the 14 slide templates, faithfully recreated from
   PresentationCanvas.tsx and populated with the PlanView sample Business Record.
   Exposes window.Design System StudioSlides. Depends on the DS bundle (SlideFrame, Eyebrow,
   HudBar, MetricValue) being loaded first. */
(function () {
  const NS = window.DesignSystemStudio || {};
  const { SlideFrame, Eyebrow, HudBar, MetricValue } = NS;
  const h = React.createElement;
  const AB = window.DESIGN_SYSTEM_STUDIO_ASSET_BASE || '../assets/';

  const DISPLAY = { fontFamily: 'var(--font-display)', lineHeight: 0.85, letterSpacing: '-0.05em' };
  const bodyMuted = { fontSize: 32, lineHeight: 1.5, color: 'var(--neutral-500)', whiteSpace: 'pre-line' };
  const PAD = '160px 140px';

  /* ---- s1 Cover ---- */
  function TitleSlide() {
    return h(SlideFrame, { glow: true },
      h(HudBar, { label: 'Design System Studio', num: '2026 // Q3 Architecture' }),
      h('div', { style: { padding: '280px 140px', position: 'relative', zIndex: 10 } },
        h(Eyebrow, null, 'Enterprise UI Platform Proposal'),
        h('h1', { style: { ...DISPLAY, fontSize: 180, fontWeight: 700, color: 'var(--neutral-900)', marginTop: 30 } },
          'Design Token', h('br'), h('span', { style: { color: 'var(--neutral-300)' } }, 'Architecture.')),
        h('div', { style: { marginTop: 100, display: 'flex', alignItems: 'center', gap: 40 } },
          h('div', { style: { width: 120, height: 1, background: 'var(--brand-500)' } }),
          h('p', { style: { fontFamily: 'var(--font-mono)', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--neutral-500)', maxWidth: 720 } },
            'Scaling design token adoption across cross-functional engineering and product teams.'))),
      h('div', { style: { position: 'absolute', bottom: 60, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--neutral-400)', zIndex: 10 } },
        h('span', null, 'MIT LICENSE · STANDALONE SAAS EDITION'),
        h('span', { style: { fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--neutral-900)' } }, 'Design System Studio')));
  }

  /* ---- s2 Index ---- */
  function IndexSlide() {
    const parts = [
      { t: 'Context', d: 'Section Divider, Two-Column Context, Data Monument' },
      { t: 'Performance', d: 'Metrics Dashboard, Comparative Table, Strategic Roadmap' },
      { t: 'Strategy', d: 'Process Architecture, Global Reach Map' },
      { t: 'Closing', d: 'Featured Quote, Exit' },
    ];
    return h(SlideFrame, null,
      h(HudBar, { label: 'Agenda', num: '02' }),
      h('div', { style: { padding: '160px 140px', display: 'flex', gap: 140, position: 'relative', zIndex: 10 } },
        h('div', { style: { flex: 1 } },
          h(Eyebrow, null, 'Navigation'),
          h('h2', { style: { ...DISPLAY, fontSize: 100, fontWeight: 600, marginTop: 30, color: 'var(--neutral-900)', whiteSpace: 'pre-line' } }, 'Presentation\nStructure.')),
        h('div', { style: { flex: 1.5, paddingTop: 20 } },
          h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 } },
            parts.map((p, i) => h('div', { key: i, style: { borderLeft: `2px solid ${i === 0 ? 'var(--brand-500)' : 'var(--neutral-200)'}`, paddingLeft: 30 } },
              h(Eyebrow, { size: 10 }, 'Part 0' + (i + 1)),
              h('h4', { style: { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, margin: '10px 0', color: 'var(--neutral-900)' } }, p.t),
              h('p', { style: { fontSize: 18, color: 'var(--neutral-500)', lineHeight: 1.5 } }, p.d)))))));
  }

  /* ---- s3 Executive Summary ---- */
  function ExecutiveSummarySlide() {
    return h(SlideFrame, null,
      h(HudBar, { label: 'Executive Summary', num: '03' }),
      h('div', { style: { padding: PAD, position: 'relative', zIndex: 10 } },
        h('h2', { style: { ...DISPLAY, fontSize: 100, fontWeight: 600, marginBottom: 80, color: 'var(--neutral-900)', whiteSpace: 'pre-line' } }, 'Core Strategic\nObjective.'),
        h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120 } },
          h('p', { style: bodyMuted }, 'Fragmented UI components and hardcoded style overrides increase technical debt. This proposal establishes a central token architecture to unify design and engineering teams across all digital products.'),
          h('div', { style: { background: 'var(--neutral-50)', border: '1px solid var(--neutral-200)', padding: 60 } },
            h(Eyebrow, null, 'Proof Point'),
            h('p', { style: { color: 'var(--neutral-900)', fontSize: 32, fontWeight: 500, lineHeight: 1.5, marginTop: 24 } }, 'Centralizing design tokens reduces frontend UI development cycles by up to 40% across engineering sprints.')))));
  }

  /* ---- s4 Section Divider (dark) ---- */
  function SectionDividerSlide() {
    return h(SlideFrame, { dark: true, showGrid: false },
      h('div', { style: { position: 'absolute', top: 60, left: 80, zIndex: 10 } },
        h('span', { style: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff' } }, 'Design System Studio')),
      h('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 10 } },
        h(Eyebrow, { center: true }, 'Section Marker'),
        h('h1', { style: { ...DISPLAY, fontSize: 240, fontWeight: 700, color: '#fff', marginTop: 30 } }, 'Design Architecture.'),
        h('p', { style: { color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.38em', textTransform: 'uppercase', marginTop: 40, fontSize: 20, maxWidth: 1400 } },
          'Establishing a single source of truth for design tokens, component primitives, and brand guidelines.')),
      h('div', { style: { fontFamily: 'var(--font-display)', fontSize: 600, fontWeight: 700, color: 'rgba(255,255,255,0.02)', position: 'absolute', bottom: -100, right: -50, lineHeight: 1, zIndex: 0 } }, '04'));
  }

  /* ---- s5 Two-Column Context ---- */
  function TwoColumnSlide() {
    const attrs = ['Design tokens stored in scattered JSON files', 'Inconsistent component state styling in web apps', 'Manual handoffs creating continuous UI drift'];
    return h(SlideFrame, null,
      h(HudBar, { label: 'Strategic Context', num: '05' }),
      h('div', { style: { display: 'flex', height: '100%', position: 'relative', zIndex: 10 } },
        h('div', { style: { flex: 1, padding: '160px 100px 140px 140px', borderRight: '1px solid var(--neutral-200)', display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
          h(Eyebrow, null, 'Current State'),
          h('h2', { style: { ...DISPLAY, fontSize: 72, fontWeight: 600, margin: '30px 0 40px', color: 'var(--neutral-900)', whiteSpace: 'pre-line' } }, 'Fragmented\nEnvironment.'),
          h('p', { style: { ...bodyMuted, marginBottom: 40 } }, 'Product teams spend significant bandwidth manually updating visual styling and reconciling component variations across web applications.'),
          h('ul', { style: { listStyle: 'none', margin: 0, padding: 0, fontSize: 20, fontFamily: 'var(--font-mono)', color: 'var(--neutral-400)' } },
            attrs.map((a, i) => h('li', { key: i, style: { marginBottom: 10 } }, `[${String(i + 1).padStart(2, '0')}] ${a}`)))),
        h('div', { style: { flex: 1, padding: '160px 140px 140px 100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--neutral-50)' } },
          h(Eyebrow, null, 'Target State'),
          h('h2', { style: { ...DISPLAY, fontSize: 72, fontWeight: 600, margin: '30px 0 40px', color: 'var(--neutral-900)', whiteSpace: 'pre-line' } }, 'Continuous\nGovernance.'),
          h('p', { style: { fontSize: 32, lineHeight: 1.5, color: 'var(--neutral-900)' } }, 'With Design System Studio, every product component consumes tokenized design decisions—ensuring instant accessibility compliance, seamless theme switching, and automated code export.'))));
  }

  /* ---- s6 Data Monument ---- */
  function DataMonumentSlide() {
    return h(SlideFrame, { glow: true },
      h('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 140, position: 'relative', zIndex: 10 } },
        h(Eyebrow, null, 'Performance Metric'),
        h('div', { style: { marginTop: 40 } },
          h(MetricValue, { value: '100', unit: '%', heading: 'Token coverage across core component primitives.' })),
        h('p', { style: { marginTop: 60, maxWidth: 800, ...bodyMuted } }, 'All visual properties (colors, typography, spacing, radii) map directly to centralized design tokens without hardcoded values.')),
      h('div', { style: { fontFamily: 'var(--font-display)', fontSize: 600, fontWeight: 700, color: 'rgba(0,0,0,0.02)', position: 'absolute', bottom: -100, right: -50, lineHeight: 1, zIndex: 0 } }, '06'));
  }

  /* ---- s7 Metrics Dashboard ---- */
  function MetricsSlide() {
    const bars = [{ l: 'Sprint 1', p: 30 }, { l: 'Sprint 2', p: 45 }, { l: 'Sprint 3', p: 70 }, { l: 'Sprint 4', p: 95, a: true }];
    const kpis = [{ l: 'Active Tokens', v: '182' }, { l: 'UI Primitives', v: '18' }, { l: 'WCAG Pass Rate', v: '100%' }];
    return h(SlideFrame, null,
      h(HudBar, { label: 'Metrics Dashboard', num: '07' }),
      h('div', { style: { padding: PAD, position: 'relative', zIndex: 10 } },
        h(Eyebrow, null, 'Temporal Performance'),
        h('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 20, height: 350, borderBottom: '2px solid var(--neutral-900)', marginTop: 60 } },
          bars.map((b, i) => h('div', { key: i, style: { flex: 1, background: b.a ? 'var(--brand-500)' : 'var(--neutral-200)', height: `${b.p}%`, position: 'relative' } },
            h('span', { style: { position: 'absolute', top: -40, left: 0, width: '100%', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--neutral-500)' } }, b.l)))),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 80, gap: 40 } },
          kpis.map((k, i) => h('div', { key: i },
            h(Eyebrow, { size: 10 }, k.l),
            h('h3', { style: { ...DISPLAY, fontSize: 64, fontWeight: 600, marginTop: 12, color: 'var(--neutral-900)' } }, k.v))))));
  }

  /* ---- s8 Comparative Table ---- */
  function ComparativeTableSlide() {
    const rows = [
      ['Token Governance', 'Manual JSON', 'Central Workbench', 'Automated'],
      ['Theme Support', 'Hardcoded', 'Light & Dark Sync', 'Dynamic'],
      ['Code Export', 'Manual Handoff', 'CSS & W3C DTCG JSON', 'Instant'],
      ['Accessibility', 'Ad-hoc Audits', 'WCAG Contrast Shield', 'Built-in'],
    ];
    const cell = { padding: '35px 0', borderBottom: '1px solid var(--neutral-200)', fontSize: 28, color: 'var(--neutral-900)', textAlign: 'left' };
    return h(SlideFrame, null,
      h(HudBar, { label: 'Comparative Framework', num: '08' }),
      h('div', { style: { padding: PAD, position: 'relative', zIndex: 10 } },
        h(Eyebrow, null, 'Benchmark Comparison'),
        h('table', { style: { width: '100%', borderCollapse: 'collapse', marginTop: 40 } },
          h('thead', null, h('tr', null,
            ['Analysis Category', 'Current', 'Target', 'Outcome'].map((hd) =>
              h('th', { key: hd, style: { textAlign: 'left', padding: '25px 0', borderBottom: '2px solid var(--neutral-900)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '0.12em' } }, hd)))),
          h('tbody', null, rows.map((r, i) => h('tr', { key: i },
            h('td', { style: cell }, r[0]),
            h('td', { style: cell }, r[1]),
            h('td', { style: cell }, r[2]),
            h('td', { style: { ...cell, color: 'var(--brand-600)' } }, r[3])))))));
  }

  /* ---- s9 Strategic Roadmap ---- */
  function RoadmapSlide() {
    const phases = [
      { t: 'Foundations', d: 'Establish primitive token architecture, typography scales, and spatial grid systems.', done: true },
      { t: 'Components', d: 'Build accessibility-compliant core UI primitives and interactive staging previews.', done: false },
      { t: 'Scale & Export', d: 'Deploy multi-theme switching, DTCG JSON token exports, and team documentation.', done: false },
    ];
    return h(SlideFrame, null,
      h(HudBar, { label: 'Execution Timeline', num: '09' }),
      h('div', { style: { padding: PAD, position: 'relative', zIndex: 10 } },
        h(Eyebrow, null, 'Milestone Projection'),
        h('h2', { style: { ...DISPLAY, fontSize: 100, fontWeight: 600, margin: '30px 0 120px', color: 'var(--neutral-900)' } }, 'Pathway to Execution.'),
        h('div', { style: { position: 'relative', paddingTop: 60 } },
          h('div', { style: { position: 'absolute', top: 12, left: 0, right: 0, height: 2, background: 'var(--neutral-200)', zIndex: 1 } }),
          h('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            phases.map((p, i) => h('div', { key: i, style: { width: 500, position: 'relative' } },
              h('div', { style: { width: 24, height: 24, background: p.done ? 'var(--brand-500)' : 'var(--neutral-300)', borderRadius: '50%', position: 'relative', zIndex: 2 } }),
              h('div', { style: { marginTop: 30 } },
                h(Eyebrow, { size: 12 }, 'Phase ' + String(i + 1).padStart(2, '0')),
                h('h4', { style: { ...DISPLAY, fontSize: 32, fontWeight: 600, margin: '12px 0 15px', color: 'var(--neutral-900)' } }, p.t),
                h('p', { style: { fontSize: 18, lineHeight: 1.5, color: 'var(--neutral-500)' } }, p.d))))))));
  }

  /* ---- s10 Image Editorial ---- */
  function ImageEditorialSlide() {
    return h(SlideFrame, null,
      h('div', { style: { display: 'flex', height: '100%', position: 'relative', zIndex: 10 } },
        h('div', { style: { flex: 1, padding: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
          h(Eyebrow, null, 'Insight'),
          h('h2', { style: { ...DISPLAY, fontSize: 100, fontWeight: 600, margin: '30px 0', color: 'var(--neutral-900)' } }, 'Single Source of Truth.'),
          h('p', { style: bodyMuted }, 'Tokens define design decisions once, powering components, themes, documentation, and exports simultaneously.')),
        h('div', { style: { flex: 1.2, background: 'var(--neutral-100)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.12em' } }, 'System Architecture Diagram'),
          h('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#fff 0%,transparent 20%)' } }))));
  }

  /* ---- s11 Process Architecture ---- */
  function ProcessSlide() {
    const steps = [
      { t: 'Define', d: 'Establish global primitives for color scales, spatial tokens, and typography.' },
      { t: 'Compose', d: 'Bind semantic tokens to reusable UI component primitives with state management.' },
      { t: 'Export', d: 'Generate production-ready CSS variables and DTCG JSON tokens for web applications.' },
    ];
    return h(SlideFrame, null,
      h(HudBar, { label: 'System Logic', num: '10' }),
      h('div', { style: { padding: PAD, position: 'relative', zIndex: 10 } },
        h(Eyebrow, null, 'Architectural Protocol'),
        h('h2', { style: { ...DISPLAY, fontSize: 100, fontWeight: 600, margin: '30px 0 80px', color: 'var(--neutral-900)' } }, 'Operational Flow.'),
        h('div', { style: { display: 'flex', gap: 40, alignItems: 'flex-start' } },
          steps.map((s, i) => h('div', { key: i, style: { flex: 1, border: `1px solid ${i === 1 ? 'var(--brand-500)' : 'var(--neutral-200)'}`, padding: 40, marginTop: i * 40 } },
            h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 48, color: 'var(--brand-500)', marginBottom: 20 } }, String(i + 1).padStart(2, '0')),
            h('h4', { style: { ...DISPLAY, fontSize: 32, fontWeight: 600, marginBottom: 15, color: 'var(--neutral-900)' } }, s.t),
            h('p', { style: { fontSize: 18, lineHeight: 1.5, color: 'var(--neutral-500)' } }, s.d))))));
  }

  /* ---- s12 Global Reach Map ---- */
  function GlobalMapSlide() {
    const sectors = [{ l: 'Americas', v: 'Production Ready' }, { l: 'EMEA', v: 'Token Standard' }, { l: 'APAC', v: 'Multi-Theme Sync' }];
    return h(SlideFrame, null,
      h(HudBar, { label: 'Reach Distribution', num: '11' }),
      h('div', { style: { padding: PAD, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 } },
        h('h2', { style: { ...DISPLAY, fontSize: 100, fontWeight: 600, marginBottom: 60, color: 'var(--neutral-900)' } }, 'Global Deployment.'),
        h('div', { style: { flex: 1, position: 'relative', background: 'var(--neutral-100)', border: '1px solid var(--neutral-200)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.12em' } }, 'Geographic Visualisation Placeholder'),
          [{ top: '35%', left: '22%' }, { top: '45%', left: '62%' }].map((pos, i) => h('div', { key: i, style: { position: 'absolute', ...pos, width: 20, height: 20, background: 'var(--brand-500)', borderRadius: '50%', boxShadow: '0 0 40px var(--brand-500)' } }))),
        h('div', { style: { display: 'flex', gap: 100, marginTop: 40 } },
          sectors.map((s, i) => h('div', { key: i },
            h(Eyebrow, { size: 10 }, s.l),
            h('h4', { style: { ...DISPLAY, fontSize: 24, fontWeight: 600, marginTop: 12, color: 'var(--neutral-900)' } }, s.v))))));
  }

  /* ---- s13 Featured Quote ---- */
  function QuoteSlide() {
    return h(SlideFrame, { glow: true },
      h('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 140px', position: 'relative', zIndex: 10 } },
        h(Eyebrow, null, 'Key Insight'),
        h('h1', { style: { ...DISPLAY, fontSize: 110, fontWeight: 700, margin: '30px 0 60px', color: 'var(--neutral-900)' } },
          '"Establishing token-first architecture eliminated design drift and cut UI handoff friction across product teams."'),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 30 } },
          h('div', { style: { width: 80, height: 80, background: 'var(--neutral-200)', borderRadius: '50%' } }),
          h('div', null,
            h('h4', { style: { ...DISPLAY, fontSize: 28, fontWeight: 700, color: 'var(--neutral-900)' } }, 'Design System Team'),
            h('p', { style: { fontSize: 18, fontFamily: 'var(--font-mono)', color: 'var(--neutral-500)' } }, 'Design System Studio Platform')))));
  }

  /* ---- s14 Exit (dark) ---- */
  function ExitSlide() {
    const contacts = ['hello@design-system-studio.com', '@design-system-studio', 'www.design-system-studio.com'];
    return h(SlideFrame, { dark: true, showGrid: false },
      h('div', { style: { position: 'absolute', top: 60, left: 80, zIndex: 10 } },
        h('span', { style: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff' } }, 'Design System Studio')),
      h('div', { style: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 140, position: 'relative', zIndex: 10 } },
        h(Eyebrow, null, 'Next Steps'),
        h('h1', { style: { ...DISPLAY, fontSize: 240, fontWeight: 700, color: '#fff', margin: '30px 0' } }, 'Thank You.'),
        h('p', { style: { fontSize: 28, color: 'rgba(255,255,255,0.5)', maxWidth: 1000, lineHeight: 1.5, marginBottom: 60 } },
          'Proposal and commercials to follow, including system architecture docs and component specification sheets.'),
        h('div', { style: { display: 'flex', gap: 100 } },
          contacts.map((c, i) => h('span', { key: i, style: { fontFamily: 'var(--font-mono)', fontSize: 20, color: '#fff', letterSpacing: '0.05em' } }, c)))));
  }

  window.DesignSystemStudioSlides = {
    TitleSlide, IndexSlide, ExecutiveSummarySlide, SectionDividerSlide, TwoColumnSlide,
    DataMonumentSlide, MetricsSlide, ComparativeTableSlide, RoadmapSlide, ImageEditorialSlide,
    ProcessSlide, GlobalMapSlide, QuoteSlide, ExitSlide,
    order: [
      ['TitleSlide', 'Cover'], ['IndexSlide', 'Index / Contents'], ['ExecutiveSummarySlide', 'Executive Summary'],
      ['SectionDividerSlide', 'Section Divider'], ['TwoColumnSlide', 'Two-Column Context'], ['DataMonumentSlide', 'Data Monument'],
      ['MetricsSlide', 'Metrics Dashboard'], ['ComparativeTableSlide', 'Comparative Table'], ['RoadmapSlide', 'Strategic Roadmap'],
      ['ImageEditorialSlide', 'Image Editorial'], ['ProcessSlide', 'Process Architecture'], ['GlobalMapSlide', 'Global Reach Map'],
      ['QuoteSlide', 'Featured Quote'], ['ExitSlide', 'Exit / Thank You'],
    ],
  };
})();
