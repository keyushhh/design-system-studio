/* Design System Studio - single-page documentation site.
   Renders foundations (token tables w/ copy + Figma export), the full
   component library across states, and pattern links. Depends on the DS
   bundle (window.Design System StudioDesignSystem_e71b95). */
const NS = window.DesignSystemStudio || window.DesignSystemStudioDesignSystem || {};
const { Button, IconButton, Badge, Card, Icon, Input, Select, Checkbox, Radio, Switch, Tabs, Tooltip, Toast, Eyebrow, HudBar, SlideFrame, MetricValue } = NS;
const { useState, useEffect, useRef } = React;

/* ----------------------------- token data ----------------------------- */
const HEX = {
  brand: { 50:'#ecfdf5',100:'#d1fae5',200:'#a7f3d0',300:'#6ee7b7',400:'#34d399',500:'#10b981',600:'#059669',700:'#047857',800:'#065f46',900:'#064e3b',950:'#022c22' },
  neutral: { 0:'#ffffff',50:'#fbfbfb',100:'#f5f5f5',150:'#eeeeee',200:'#e5e5e5',300:'#d4d4d4',400:'#a3a3a3',500:'#737373',600:'#525252',700:'#404040',800:'#262626',900:'#171717',950:'#0a0a0a' },
  accent: { 50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d' },
  success: { 50:'#f0fdf4',100:'#dcfce7',500:'#22c55e',600:'#16a34a',700:'#15803d' },
  warning: { 50:'#fffbeb',100:'#fef3c7',500:'#f59e0b',600:'#d97706',700:'#b45309' },
  error: { 50:'#fef2f2',100:'#fee2e2',500:'#ef4444',600:'#dc2626',700:'#b91c1c' },
  info: { 50:'#f0f9ff',100:'#e0f2fe',500:'#0ea5e9',600:'#0284c7',700:'#0369a1' },
};
const hexToRgb = (h) => { const n = parseInt(h.slice(1), 16); return h.length === 7 ? `${(n>>16)&255} · ${(n>>8)&255} · ${n&255}` : h; };
const scaleRows = (group, steps) => steps.map((s) => ({ token: `--${group}-${s}`, hex: HEX[group][s], rgb: hexToRgb(HEX[group][s]) }));

const ALIASES = [
  ['--surface-canvas','neutral-50','App background'],
  ['--surface-default','#ffffff','Cards, panels'],
  ['--surface-subtle','#faf9f6','Warm editorial panel'],
  ['--text-primary','neutral-900','Headings, body'],
  ['--text-secondary','neutral-600','Supporting copy'],
  ['--text-muted','neutral-500','Captions, meta'],
  ['--text-brand','brand-600','Emphasis, links'],
  ['--border-default','neutral-200','Hairline borders'],
  ['--border-strong','neutral-300','Inputs, dividers'],
  ['--action-primary','neutral-900','Primary CTA'],
  ['--action-brand','brand-600','Emerald action'],
  ['--focus-ring','brand-500','Focus outline'],
];

const TYPE_SCALE = [
  ['Display / H1','Space Grotesk',700,'96px','0.85','−0.05em','Hero titles, slide covers'],
  ['Headline / H2','Space Grotesk',600,'48px','1.0','−0.03em','Section headers'],
  ['Title / H3','Space Grotesk',600,'30px','1.1','−0.02em','Card & block titles'],
  ['Subtitle / H4','Space Grotesk',500,'20px','1.25','−0.01em','Sub-headers'],
  ['Body Large','Satoshi',400,'18px','1.6','0','Intros, lead paragraphs'],
  ['Body','Satoshi',400,'16px','1.6','0','Default reading text'],
  ['Small','Satoshi',400,'14px','1.5','0','Captions, help text'],
  ['Label / Mono','JetBrains Mono',500,'12px','1.4','0.12em','Eyebrows, metadata, numbers'],
];
const famOf = (name) => name === 'Satoshi' ? 'var(--font-sans)' : name === 'JetBrains Mono' ? 'var(--font-mono)' : 'var(--font-display)';
const SPACING = [['1','4px','0.25rem'],['2','8px','0.5rem'],['3','12px','0.75rem'],['4','16px','1rem'],['5','20px','1.25rem'],['6','24px','1.5rem'],['8','32px','2rem'],['10','40px','2.5rem'],['12','48px','3rem'],['16','64px','4rem'],['20','80px','5rem'],['24','96px','6rem']];
const RADII = [['sharp','0px','All containers - cards, inputs, buttons, dialogs, panels'],['full','9999px','Only round elements - avatars, status dots, the switch']];
const SHADOWS = [['xs','0 1px 2px rgb(0 0 0 / .05)'],['sm','0 1px 3px rgb(0 0 0 / .1)'],['md','0 4px 6px rgb(0 0 0 / .1)'],['soft','0 1px 2px …, 0 12px 32px -12px …'],['lift','0 2px 4px …, 0 24px 48px -16px …']];
const MOTION = [['fast','150ms','micro - hover, color'],['normal','200ms','controls, toggles'],['slow','300ms','panels, overlays'],['slower','500ms','page / route transitions']];
const EASING = [['standard','cubic-bezier(.4,0,.2,1)','Default - most transitions'],['entrance','cubic-bezier(0,0,.2,1)','Elements arriving / fading in'],['exit','cubic-bezier(.4,0,1,1)','Elements leaving / fading out']];
const GLYPHS = { upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower:'abcdefghijklmnopqrstuvwxyz', num:'0123456789', punct:'& # $ € % @ ! ? * - · ( ) / +' };
const ICONS = ['share','download','upload','eye','eye-off','plus','trash','edit','reset','chevron-down','chevron-right','check','check-circle','link','external-link','x','copy','search','filter','settings','user','bell','mail','calendar','clock','folder','bar-chart','star','info','alert-triangle','arrow-right','arrow-left','more-horizontal'];

const NAV = [
  ['Overview','overview'],
  ['Foundations', null],
  ['Color','color'],['Typography','type'],['Spacing','spacing'],['Radius','radius'],['Elevation','elevation'],['Motion','motion'],['Iconography','icons'],
  ['Components', null],
  ['Buttons','buttons'],['Inputs & Selection','forms'],['Badges & Tags','badges'],['Cards','cards'],['Tabs','tabs'],['Feedback','feedback'],['Presentation','presentation'],
  ['Patterns', null],
  ['Slide Templates','generator'],
];

/* ----------------------------- primitives ----------------------------- */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const push = (t) => { const id = Math.random(); setToasts((x) => [...x, { ...t, id }]); setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), 2200); };
  const node = React.createElement('div', { style: { position: 'fixed', bottom: 28, right: 28, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 999 } },
    toasts.map((t) => React.createElement(Toast, { key: t.id, tone: t.tone || 'success', title: t.title, message: t.message })));
  return [push, node];
}
const copy = (text, push) => { navigator.clipboard && navigator.clipboard.writeText(text); push && push({ title: 'Copied', message: text, tone: 'brand' }); };

function Section({ id, kicker, title, intro, children }) {
  return React.createElement('section', { id, style: { scrollMarginTop: 24, marginBottom: 96 } },
    React.createElement('div', { style: { marginBottom: 28 } },
      kicker && React.createElement(Eyebrow, { size: 11, style: { marginBottom: 14 } }, kicker),
      React.createElement('h2', { style: { fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', margin: 0 } }, title),
      intro && React.createElement('p', { style: { fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 640, marginTop: 12 } }, intro)),
    children);
}
function Sub({ children }) {
  return React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-faint)', margin: '36px 0 16px' } }, children);
}
function Panel({ children, style }) {
  return React.createElement('div', { style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)', padding: 28, ...style } }, children);
}

/* ------------------------------ sections ------------------------------ */
function ColorTable({ rows, push, theme }) {
  const ref = useRef(null);
  const [resolved, setResolved] = useState({});
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const out = {};
    el.querySelectorAll('[data-swatch]').forEach((s) => {
      const m = getComputedStyle(s).backgroundColor.match(/\d+(\.\d+)?/g);
      if (m && m.length >= 3) {
        const [r, g, b] = m.slice(0, 3).map((n) => Math.round(+n));
        out[s.getAttribute('data-swatch')] = {
          hex: '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase(),
          rgb: `${r} · ${g} · ${b}`,
        };
      }
    });
    setResolved(out);
  }, [theme, rows]);
  return React.createElement('div', { ref, style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)' } },
    rows.map((r, i) => {
      const rv = resolved[r.token] || { hex: r.hex, rgb: r.rgb };
      return React.createElement('div', {
        key: r.token, onClick: () => copy(r.token, push), title: 'Copy token',
        style: { display: 'grid', gridTemplateColumns: '48px 1fr 130px 130px 24px', alignItems: 'center', gap: 16, padding: '12px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 13 } },
        React.createElement('span', { 'data-swatch': r.token, style: { width: 34, height: 34, borderRadius: 0, background: `var(${r.token})`, border: '1px solid var(--border-default)', boxShadow: 'inset 0 0 0 1px rgba(128,128,128,0.12)' } }),
        React.createElement('span', { style: { color: 'var(--text-primary)', fontWeight: 500 } }, r.token),
        React.createElement('span', { style: { color: 'var(--text-secondary)', textTransform: 'uppercase' } }, rv.hex),
        React.createElement('span', { style: { color: 'var(--text-muted)' } }, rv.rgb),
        React.createElement('span', { style: { color: 'var(--text-faint)', display: 'inline-flex' } }, React.createElement(Icon, { name: 'copy', size: 14 })));
    }));
}
function AliasTable({ push }) {
  return React.createElement('div', { style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)' } },
    ALIASES.map((a, i) => React.createElement('div', {
      key: a[0], onClick: () => copy(a[0], push), title: 'Copy token',
      style: { display: 'grid', gridTemplateColumns: '48px 1fr 160px 24px', alignItems: 'center', gap: 16, padding: '12px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 13 } },
      React.createElement('span', { style: { width: 34, height: 34, borderRadius: 0, background: `var(${a[0]})`, border: '1px solid var(--border-default)' } }),
      React.createElement('span', { style: { color: 'var(--text-primary)', fontWeight: 500 } }, a[0]),
      React.createElement('span', { style: { color: 'var(--text-muted)' } }, '→ ' + a[1]),
      React.createElement('span', { style: { color: 'var(--text-faint)', display: 'inline-flex' } }, React.createElement(Icon, { name: 'copy', size: 14 })))));
}

function ColorSection({ push, theme }) {
  return React.createElement(Section, { id: 'color', kicker: 'Foundations', title: 'Color', intro: 'Emerald is the single brand accent; everything else is a near-monochrome neutral scale. Swatches and values reflect the active theme - the light tint steps resolve to dark washes in dark mode. Click any row to copy its token.' },
    React.createElement(Sub, null, 'Brand · Emerald (primary)'),
    React.createElement(ColorTable, { rows: scaleRows('brand', [50,100,200,300,400,500,600,700,800,900,950]), push, theme }),
    React.createElement(Sub, null, 'Accent · Leaf (secondary)'),
    React.createElement(ColorTable, { rows: scaleRows('accent', [50,100,200,300,400,500,600,700,800,900]), push, theme }),
    React.createElement(Sub, null, 'Neutral'),
    React.createElement(ColorTable, { rows: scaleRows('neutral', [0,50,100,150,200,300,400,500,600,700,800,900,950]), push, theme }),
    React.createElement(Sub, null, 'Semantic'),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 } },
      ['success','warning','error','info'].map((g) => React.createElement('div', { key: g },
        React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-faint)', margin: '0 0 6px 2px' } }, g),
        React.createElement(ColorTable, { rows: scaleRows(g, [50,100,500,600,700]), push, theme })))),
    React.createElement(Sub, null, 'Semantic aliases'),
    React.createElement(AliasTable, { push }));
}

function TypeTester({ push }) {
  const [text, setText] = useState('Amplify authentic voices at scale.');
  const [size, setSize] = useState(48);
  const [weight, setWeight] = useState(600);
  const fams = [
    ['Space Grotesk', 'var(--font-display)', 'Display · headlines · large editorial titles', '-0.03em'],
    ['Satoshi', 'var(--font-sans)', 'Interface · body · navigation · forms', '0'],
    ['JetBrains Mono', 'var(--font-mono)', 'Labels · metadata · numbers · IDs', '0'],
  ];
  return React.createElement(Panel, { style: { marginBottom: 24, background: 'var(--neutral-50)' } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement(Sub, { }, 'Type tester - see how it feels'),
      React.createElement('button', { onClick: () => copy(text, push), style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' } }, React.createElement(Icon, { name: 'copy', size: 13 }), 'Copy text')),
    React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '16px 0 20px' } },
      React.createElement('div', { style: { flex: '1 1 320px' } }, React.createElement(Input, { label: 'Your text', value: text, onChange: (e) => setText(e.target.value), placeholder: 'Type anything…' })),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6, minWidth: 190 } },
        React.createElement('label', { style: { fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' } }, 'Size · ' + size + 'px'),
        React.createElement('input', { type: 'range', min: 14, max: 120, value: size, onChange: (e) => setSize(+e.target.value), style: { accentColor: 'var(--brand-500)', height: 44 } })),
      React.createElement('div', { style: { minWidth: 150 } }, React.createElement(Select, { label: 'Weight', value: String(weight), onChange: (e) => setWeight(+e.target.value), options: [{ value: '400', label: 'Regular 400' }, { value: '500', label: 'Medium 500' }, { value: '600', label: 'Semibold 600' }, { value: '700', label: 'Bold 700' }] }))),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
      fams.map(([name, fam, role, tr]) => React.createElement('div', { key: name, style: { padding: '18px 0', borderTop: '1px solid var(--border-subtle)' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 } },
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-primary)' } }, name),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, role)),
        React.createElement('div', { style: { fontFamily: fam, fontSize: size, fontWeight: weight, letterSpacing: tr, lineHeight: 1.1, color: 'var(--text-primary)', wordBreak: 'break-word' } }, text || 'Type something above…')))));
}

function FontDownload({ href, name }) {
  const [h, setH] = React.useState(false);
  return React.createElement('a', { href, download: true, onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), title: 'Download the ' + name + ' family (.zip - OTF/TTF/WebFonts + license)', style: { display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: h ? 'var(--pure-white)' : 'var(--text-primary)', background: h ? 'var(--brand-600)' : 'transparent', border: '1px solid ' + (h ? 'var(--brand-600)' : 'var(--border-strong)'), padding: '9px 16px', transition: 'background .15s ease, color .15s ease, border-color .15s ease', cursor: 'pointer' } },
    'Download',
    React.createElement('span', { style: { fontSize: 14, lineHeight: 1, color: h ? 'var(--pure-white)' : 'var(--text-brand)' } }, '↓'));
}

function FileDownload({ href, label, hint, target, rel, download = true }) {
  const [h, setH] = React.useState(false);
  return React.createElement('a', { href, download, target, rel, onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), title: hint, style: { display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: h ? 'var(--pure-white)' : 'var(--text-primary)', background: h ? 'var(--brand-600)' : 'transparent', border: '1px solid ' + (h ? 'var(--brand-600)' : 'var(--border-strong)'), padding: '9px 16px', transition: 'background .15s ease, color .15s ease, border-color .15s ease', cursor: 'pointer' } },
    label,
    React.createElement('span', { style: { fontSize: 14, lineHeight: 1, color: h ? 'var(--pure-white)' : 'var(--text-brand)' } }, '↓'));
}

function TypeSection({ push }) {
  const fonts = [['Space Grotesk','var(--font-display)','Display · headlines · numerals','assets/fonts/SpaceGrotesk.zip'],['Satoshi','var(--font-sans)','Interface · body · forms','assets/fonts/Satoshi.zip'],['JetBrains Mono','var(--font-mono)','Labels · metadata · numbers','assets/fonts/JetBrainsMono.zip']];
  return React.createElement(Section, { id: 'type', kicker: 'Foundations', title: 'Typography', intro: 'Three families, three strict roles. Space Grotesk leads, Satoshi carries the reading, JetBrains Mono handles metadata. Try the tester below.' },
    React.createElement(TypeTester, { push }),
    fonts.map(([name, fam, role, zip]) => React.createElement(Panel, { key: name, style: { marginBottom: 16 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: fam, fontSize: 30, fontWeight: 600, color: 'var(--text-primary)' } }, name),
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 } }, role)),
        React.createElement(FontDownload, { href: zip, name })),
      React.createElement('div', { style: { fontFamily: fam, color: 'var(--text-primary)', lineHeight: 1.5 } },
        React.createElement('div', { style: { fontSize: 22 } }, GLYPHS.upper),
        React.createElement('div', { style: { fontSize: 22 } }, GLYPHS.lower),
        React.createElement('div', { style: { fontSize: 22, color: 'var(--text-secondary)' } }, GLYPHS.num + '   ' + GLYPHS.punct)))),
    React.createElement(Sub, null, 'Type scale - each role in its real family'),
    React.createElement('div', { style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)' } },
      TYPE_SCALE.map((t, i) => React.createElement('div', { key: t[0], style: { display: 'grid', gridTemplateColumns: '210px 1fr 210px', alignItems: 'center', gap: 20, padding: '16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 } }, t[0]),
          React.createElement('div', { style: { fontSize: 11, color: 'var(--text-muted)', marginTop: 3 } }, t[6])),
        React.createElement('span', { style: { fontFamily: famOf(t[1]), fontSize: Math.min(parseInt(t[3]), 34), fontWeight: t[2], letterSpacing: t[5], lineHeight: 1.1, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, t[1] === 'JetBrains Mono' ? 'REACH · 15,000+' : 'Design System Studio'),
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'right' } }, `${t[1].split(' ')[0]} · ${t[2]} · ${t[3]} · ${t[5]}`)))));
}

function SpacingSection() {
  return React.createElement(Section, { id: 'spacing', kicker: 'Foundations', title: 'Spacing', intro: 'A 4px base grid drives every gap, pad, and margin. Consistent rhythm is what makes layouts feel engineered.' },
    React.createElement('div', { style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)' } },
      SPACING.map((s, i) => React.createElement('div', { key: s[0], style: { display: 'grid', gridTemplateColumns: '90px 1fr 140px', alignItems: 'center', gap: 20, padding: '10px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' } },
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' } }, 'space-' + s[0]),
        React.createElement('span', { style: { height: 16, width: s[1], background: 'var(--brand-500)' } }),
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'right' } }, `${s[1]} · ${s[2]}`)))));
}
function RadiusSection() {
  return React.createElement(Section, { id: 'radius', kicker: 'Foundations', title: 'Corner Radius', intro: 'The system is sharp by design; every container is 0 for an editorial, print-like feel. The only exception is genuinely round elements (avatars, dots, the switch), which use full.' },
    React.createElement('div', { style: { display: 'flex', gap: 20, flexWrap: 'wrap' } },
      RADII.map((r) => React.createElement('div', { key: r[0], style: { textAlign: 'center' } },
        React.createElement('div', { style: { width: 92, height: 68, background: 'var(--neutral-100)', border: '1px solid var(--border-strong)', borderRadius: r[1] === '9999px' ? 34 : r[1] } }),
        React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)', marginTop: 10 } }, r[0] + ' · ' + r[1]),
        React.createElement('div', { style: { fontSize: 11, color: 'var(--text-muted)', marginTop: 2 } }, r[2])))));
}
function ElevationSection() {
  return React.createElement(Section, { id: 'elevation', kicker: 'Foundations', title: 'Elevation', intro: 'The interface leans on spacing and contrast. Shadows stay soft and rare - two editorial lifts for raised surfaces.' },
    React.createElement('div', { style: { display: 'flex', gap: 28, flexWrap: 'wrap', background: 'var(--neutral-50)', padding: 32, border: '1px solid var(--border-default)' } },
      SHADOWS.map((s) => React.createElement('div', { key: s[0], style: { textAlign: 'center' } },
        React.createElement('div', { style: { width: 130, height: 78, background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 0, boxShadow: `var(--shadow-${s[0]})` } }),
        React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)', marginTop: 12 } }, 'shadow-' + s[0])))));
}
function MotionSection() {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setInterval(() => setGo((g) => !g), 900); return () => clearInterval(t); }, []);
  return React.createElement(Section, { id: 'motion', kicker: 'Foundations', title: 'Motion', intro: 'Subtle, intentional, premium. 150–300ms with a standard ease - fades and gentle shifts, never bounces.' },
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 } },
        React.createElement('div', { style: { position: 'relative', flex: 1, height: 8, background: 'var(--neutral-100)' } },
          React.createElement('div', { style: { position: 'absolute', top: -6, left: go ? 'calc(100% - 20px)' : 0, width: 20, height: 20, background: 'var(--brand-500)', borderRadius: '50%', transition: 'left 300ms cubic-bezier(.4,0,.2,1)' } })),
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' } }, '300ms · standard')),
      React.createElement('div', { style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)' } },
        MOTION.map((m, i) => React.createElement('div', { key: m[0], style: { display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 16, padding: '10px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', fontFamily: 'var(--font-mono)', fontSize: 12 } },
          React.createElement('span', { style: { color: 'var(--text-primary)' } }, m[0]),
          React.createElement('span', { style: { color: 'var(--text-secondary)' } }, m[1]),
          React.createElement('span', { style: { color: 'var(--text-muted)' } }, m[2]))))),
    React.createElement(Sub, null, 'Easing curves'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 } },
        EASING.map((e) => React.createElement('div', { key: e[0], style: { border: '1px solid var(--border-default)', padding: 16 } },
          React.createElement('div', { style: { position: 'relative', height: 64, marginBottom: 14 } },
            React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'var(--neutral-50)' } }),
            React.createElement('div', { style: { position: 'absolute', bottom: 8, left: 8, width: 12, height: 12, background: 'var(--brand-500)', borderRadius: '50%', transform: go ? 'translate(180px,-40px)' : 'none', transition: `transform 700ms ${e[1]}` } })),
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)', fontWeight: 500 } }, e[0]),
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 } }, e[1]),
          React.createElement('div', { style: { fontSize: 12, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 } }, e[2]))))),
    React.createElement(Sub, null, 'Interaction states \u2014 hover, focus, fade'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' } },
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' } },
          React.createElement(Button, { variant: 'primary' }, 'Hover me'),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, 'darken \u00b7 150ms')),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' } },
          React.createElement('input', { placeholder: 'Focus me', style: { height: 44, padding: '0 14px', border: '1px solid var(--border-default)', fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none', color: 'var(--text-primary)' }, onFocus: (ev) => { ev.target.style.borderColor = 'var(--brand-500)'; ev.target.style.boxShadow = '0 0 0 2px var(--brand-100)'; }, onBlur: (ev) => { ev.target.style.borderColor = 'var(--border-default)'; ev.target.style.boxShadow = 'none'; } }),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, 'ring \u00b7 emerald')),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' } },
          React.createElement('div', { style: { width: 120, height: 44, background: 'var(--brand-500)', opacity: go ? 1 : 0.15, transition: 'opacity 500ms cubic-bezier(0,0,.2,1)' } }),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, 'fade \u00b7 entrance')))));
}
function IconsSection({ push }) {
  return React.createElement(Section, { id: 'icons', kicker: 'Foundations', title: 'Iconography', intro: 'Lucide line icons - 2px stroke, round caps, currentColor. Click a glyph to copy its name.' },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 } },
      ICONS.map((n) => React.createElement('button', { key: n, onClick: () => copy(n, push), style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 8px', border: '1px solid var(--border-default)', background: 'var(--surface-default)', cursor: 'pointer', color: 'var(--text-primary)' } },
        React.createElement(Icon, { name: n, size: 22 }),
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, n)))));
}

/* --------------------------- component sections --------------------------- */
function Swatch({ label, children }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' } },
    React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-faint)' } }, label), children);
}
function ButtonsSection() {
  const variants = ['primary','brand','secondary','outline','ghost','danger'];
  return React.createElement(Section, { id: 'buttons', kicker: 'Components', title: 'Buttons', intro: 'The action primitive. Hover, focus, and press are live; interact with them. Six variants, three sizes, sharp corners.' },
    React.createElement(Sub, null, 'Variants (hover / focus / press are live)'),
    React.createElement(Panel, null, React.createElement('div', { style: { display: 'flex', gap: 12, flexWrap: 'wrap' } }, variants.map((v) => React.createElement(Button, { key: v, variant: v }, v[0].toUpperCase() + v.slice(1))))),
    React.createElement(Sub, null, 'Sizes'),
    React.createElement(Panel, null, React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' } },
      React.createElement(Button, { size: 'sm' }, 'Small'), React.createElement(Button, { size: 'md' }, 'Medium'), React.createElement(Button, { size: 'lg' }, 'Large'))),
    React.createElement(Sub, null, 'With icons · disabled · icon buttons'),
    React.createElement(Panel, null, React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' } },
      React.createElement(Button, { iconLeft: 'upload' }, 'Upload'),
      React.createElement(Button, { variant: 'brand', iconRight: 'chevron-down' }, 'Generate'),
      React.createElement(Button, { variant: 'outline', iconLeft: 'download' }, 'Export PDF'),
      React.createElement(Button, { disabled: true }, 'Disabled'),
      React.createElement('span', { style: { width: 1, height: 28, background: 'var(--border-default)' } }),
      React.createElement(IconButton, { icon: 'eye', label: 'Hide' }),
      React.createElement(IconButton, { icon: 'plus', label: 'Duplicate' }),
      React.createElement(IconButton, { icon: 'trash', tone: 'danger', label: 'Delete' }))));
}
function FormsSection() {
  const [c, setC] = useState(true), [r, setR] = useState('p'), [s, setS] = useState(true);
  return React.createElement(Section, { id: 'forms', kicker: 'Components', title: 'Inputs & Selection', intro: 'Form primitives at 44px control height with an emerald focus ring. Everything below is interactive.' },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 } },
      React.createElement(Panel, null,
        React.createElement(Sub, null, 'Text & select'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
          React.createElement(Input, { label: 'Deck title', defaultValue: 'Design System Studio' }),
          React.createElement(Input, { label: 'Contact email', defaultValue: 'hello@', error: 'Enter a valid email' }),
          React.createElement(Select, { label: 'Template', options: ['Business Record','Executive Brief','Proposal'] }))),
      React.createElement(Panel, null,
        React.createElement(Sub, null, 'Selection controls'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          React.createElement(Checkbox, { label: 'Enable per-partner leaderboards', checked: c, onChange: () => setC(!c) }),
          React.createElement(Checkbox, { label: 'Indeterminate', indeterminate: true }),
          React.createElement('div', { style: { display: 'flex', gap: 20 } },
            React.createElement(Radio, { name: 'g', label: 'Partners', checked: r === 'p', onChange: () => setR('p') }),
            React.createElement(Radio, { name: 'g', label: 'Employees', checked: r === 'e', onChange: () => setR('e') })),
          React.createElement(Switch, { label: 'Redirection on share', checked: s, onChange: () => setS(!s) })))));
}
function BadgesSection() {
  const tones = ['brand','neutral','success','warning','error','info'];
  return React.createElement(Section, { id: 'badges', kicker: 'Components', title: 'Badges & Tags', intro: 'Compact status and category labels. Subtle soft-fill by default; solid for emphasis.' },
    React.createElement(Panel, null,
      React.createElement(Sub, null, 'Subtle'), React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } }, tones.map((t) => React.createElement(Badge, { key: t, tone: t }, t))),
      React.createElement(Sub, null, 'Solid · with dot · square'), React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
        tones.map((t) => React.createElement(Badge, { key: t, tone: t, variant: 'solid' }, t)),
        React.createElement(Badge, { tone: 'success', dot: true }, 'Active'), React.createElement(Badge, { tone: 'neutral', shape: 'square' }, 'Draft'))));
}
function CardsSection() {
  return React.createElement(Section, { id: 'cards', kicker: 'Components', title: 'Cards', intro: 'Flat container surfaces - hairline borders, shadow only when raised. Structure from spacing, not elevation.' },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 } },
      [['default','flat','Default surface'],['subtle','flat','Warm editorial panel'],['default','soft','Soft elevation']].map(([s, e, l], i) =>
        React.createElement(Card, { key: i, surface: s, elevation: e, radius: 'sharp' },
          React.createElement('div', { style: { fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' } }, l),
          React.createElement('p', { style: { fontSize: 13, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 } }, 'Surface ' + s + ' · elevation ' + e)))));
}
function TabsSection() {
  const [t, setT] = useState('Campaigns');
  return React.createElement(Section, { id: 'tabs', kicker: 'Components', title: 'Tabs', intro: 'Underline navigation with an emerald active indicator. Controlled and interactive.' },
    React.createElement(Panel, null, React.createElement(Tabs, { tabs: ['Overview','Advocates','Campaigns','Analytics','Settings'], value: t, onChange: setT }),
      React.createElement('div', { style: { padding: '20px 4px 4px', fontSize: 14, color: 'var(--text-secondary)' } }, 'Active tab: ', React.createElement('strong', { style: { color: 'var(--text-primary)' } }, t))));
}
function FeedbackSection() {
  return React.createElement(Section, { id: 'feedback', kicker: 'Components', title: 'Feedback', intro: 'Tooltips and toasts. Hover the button for a tooltip; toasts carry a tone keyline.' },
    React.createElement(Panel, null,
      React.createElement(Sub, null, 'Tooltip (hover)'),
      React.createElement(Tooltip, { label: 'Copies the deck URL' }, React.createElement(Button, { variant: 'outline', size: 'sm', iconLeft: 'link' }, 'Copy Share Link')),
      React.createElement(Sub, null, 'Toasts'),
      React.createElement('div', { style: { display: 'flex', gap: 14, flexWrap: 'wrap' } },
        React.createElement(Toast, { tone: 'success', title: 'Deck generated', message: '14 slides built from your Business Record.' }),
        React.createElement(Toast, { tone: 'error', title: 'Import failed', message: 'Missing required frontmatter: client.' }))));
}
function PresentationSection({ dark = false }) {
  return React.createElement(Section, { id: 'presentation', kicker: 'Components', title: 'Presentation primitives', intro: 'The editorial building blocks of the Master Presentation; the deck is its own design system on top of these.' },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 } },
      React.createElement(Panel, null, React.createElement(Sub, null, 'Eyebrow'), React.createElement(Eyebrow, null, 'Executive Summary'), React.createElement('div', { style: { height: 10 } }), React.createElement(Eyebrow, { size: 10 }, 'Part 01')),
      React.createElement(Panel, { style: { position: 'relative' } }, React.createElement(Sub, null, 'HUD bar'), React.createElement('div', { style: { position: 'relative', height: 40 } }, React.createElement(HudBar, { label: 'Strategic Context', num: '05', position: 'static' })))),
    React.createElement(Sub, null, 'Slide frame + metric monument'),
    React.createElement(SlideFrame, { glow: true, dark: dark },
      React.createElement(HudBar, { label: 'Performance Metric', num: '06' }),
      React.createElement('div', { style: { padding: '260px 140px 0' } }, React.createElement(Eyebrow, null, 'Data Monument'),
        React.createElement('div', { style: { marginTop: 40 } }, React.createElement(MetricValue, { value: '2.0', unit: 'M', heading: 'Total potential reach in one campaign week.' })))));
}
function PatternCard({ href, title, desc, tag, target, rel }) {
  return React.createElement('a', { href, target, rel, style: { display: 'block', border: '1px solid var(--border-default)', background: 'var(--surface-default)', padding: 24, textDecoration: 'none', color: 'inherit', transition: 'border-color .15s' },
    onMouseEnter: (e) => e.currentTarget.style.borderColor = 'var(--brand-500)', onMouseLeave: (e) => e.currentTarget.style.borderColor = 'var(--border-default)' },
    React.createElement(Badge, { tone: 'brand' }, tag),
    React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, margin: '14px 0 8px', color: 'var(--text-primary)' } }, title),
    React.createElement('p', { style: { fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 } }, desc),
    React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-brand)' } }, 'Open', React.createElement(Icon, { name: 'chevron-down', size: 12, style: { transform: 'rotate(-90deg)' } })));
}

/* ------------------------------- app shell ------------------------------- */
function figmaExport() {
  /* Figma-native Variables import format: $type/$value objects with sRGB
     components + hex, nested groups, com.figma.* extensions. Matches the
     shape Figma's own "Import variables" accepts. */
  let vid = 5;
  const id = () => ({ 'com.figma.variableId': `VariableID:2002:${vid++}`, 'com.figma.scopes': ['ALL_SCOPES'] });
  const comps = (hex) => { const n = parseInt(hex.slice(1), 16); return [((n>>16)&255)/255, ((n>>8)&255)/255, (n&255)/255]; };
  const col = (hex) => ({ $type: 'color', $value: { colorSpace: 'srgb', components: comps(hex), alpha: 1, hex: hex.toUpperCase() }, $extensions: id() });
  const num = (v) => ({ $type: 'number', $value: v, $extensions: id() });
  const str = (v) => ({ $type: 'string', $value: v, $extensions: { ...id(), 'com.figma.type': 'string' } });
  const cScale = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, col(v)]));
  const nScale = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, num(v)]));

  const brand = { 50:'#ECFDF5',100:'#D1FAE5',200:'#A7F3D0',300:'#6EE7B7',400:'#34D399',500:'#10B981',600:'#059669',650:'#047857',700:'#047857',800:'#065F46',900:'#064E3B',950:'#07070A' };
  const accent = { 50:'#F0FDF4',100:'#DCFCE7',200:'#BBF7D0',300:'#86EFAC',400:'#4ADE80',500:'#22C55E',600:'#16A34A',650:'#15803D',700:'#15803D',800:'#166534',900:'#14532D',950:'#07070A' };
  const neutral = { 50:'#FBFBFB',100:'#F5F5F5',200:'#E5E5E5',300:'#D4D4D4',400:'#A3A3A3',500:'#737373',600:'#525252',700:'#404040',800:'#262626',900:'#171717',950:'#0A0A0A' };
  const success = { 50:'#F0FDF4',100:'#DCFCE7',500:'#22C55E',600:'#16A34A',700:'#15803D' };
  const warning = { 50:'#FFFBEB',100:'#FEF3C7',500:'#F59E0B',600:'#D97706',700:'#B45309' };
  const error = { 50:'#FEF2F2',100:'#FEE2E2',500:'#EF4444',600:'#DC2626',700:'#B91C1C' };
  const info = { 50:'#F0F9FF',100:'#E0F2FE',500:'#0EA5E9',600:'#0284C7',700:'#0369A1' };

  const tokens = {
    color: {
      brand: { primary: cScale(brand), secondary: cScale(brand), accent: cScale(accent) },
      neutral: cScale(neutral),
      success: cScale(success), warning: cScale(warning), error: cScale(error), info: cScale(info),
      fixed: { white: col('#FFFFFF'), light: col('#C7C7D1'), muted: col('#9696A3'), dark: col('#141418') },
    },
    typography: {
      fontFamily: {
        sans: str('Satoshi, Inter, ui-sans-serif, system-ui, sans-serif'),
        display: str('Space Grotesk, Inter, sans-serif'),
        mono: str('JetBrains Mono, ui-monospace, SFMono-Regular, monospace'),
      },
      fontSize: nScale({ xs:12, sm:14, base:16, lg:18, xl:20, '2xl':24, '3xl':30, '4xl':36, '5xl':48, '6xl':60 }),
      fontWeight: nScale({ regular:400, medium:500, semibold:600, bold:700, black:900 }),
      lineHeight: nScale({ tight:1.1, snug:1.25, normal:1.5, relaxed:1.625 }),
    },
    spacing: nScale({ 0:0, 1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 8:32, 10:40, 12:48, 16:64, 20:80, 24:96 }),
    radius: nScale({ sharp:0, full:9999 }),
    $extensions: { 'com.figma.modeName': 'Design System Studio Emerald Light' },
  };
  const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = 'design-system-studio-design.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
function App() {
  const [push, toastNode] = useToast();
  const [active, setActive] = useState('overview');
  const mainRef = useRef(null);

  /* --- Multi-Theme Ready Data Model Architecture --- */
  const DEFAULT_THEME_ID = 'default';

  // Helper to load or initialize workspace structure with Theme model
  const loadWorkspaceState = () => {
    const STORAGE_KEY = 'design-system-studio-workspace';
    const LEGACY_TOKEN_KEY = 'design-system-studio-token-overrides';

    let savedWorkspace = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) savedWorkspace = JSON.parse(raw);
    } catch (e) {}

    // Auto-migrate legacy token overrides if present
    let legacyOverrides = {};
    try {
      const legacyRaw = localStorage.getItem(LEGACY_TOKEN_KEY);
      if (legacyRaw) {
        legacyOverrides = JSON.parse(legacyRaw);
      }
    } catch (e) {}

    if (savedWorkspace && savedWorkspace.themes && savedWorkspace.themes.length > 0) {
      return savedWorkspace;
    }

    const getThemeHelper = () => window.DesignSystemStudioTheme || window.ThemeInit;

    // Default Theme Model setup
    const defaultTheme = {
      id: DEFAULT_THEME_ID,
      name: 'Default',
      isDefault: true,
      mode: getThemeHelper() ? getThemeHelper().get() : 'light',
      tokenOverrides: legacyOverrides || {}
    };

    return {
      id: 'workspace-default',
      name: 'Default Workspace',
      activeThemeId: DEFAULT_THEME_ID,
      themes: [defaultTheme]
    };
  };

  const [workspace, setWorkspace] = useState(loadWorkspaceState);

  const getThemeHelper = () => window.DesignSystemStudioTheme || window.ThemeInit;

  // Derive active theme & active token overrides from workspace model
  const activeTheme = workspace.themes.find((t) => t.id === workspace.activeThemeId) || workspace.themes[0];
  const themeMode = activeTheme.mode || (getThemeHelper() ? getThemeHelper().get() : 'light');

  // Sync workspace state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('design-system-studio-workspace', JSON.stringify(workspace));
    } catch (e) {}
  }, [workspace]);

  // Keep theme manager sync with activeTheme.mode
  const toggleTheme = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    const helper = getThemeHelper();
    const updatedMode = helper ? helper.set(nextMode) : nextMode;

    setWorkspace((prev) => ({
      ...prev,
      themes: prev.themes.map((t) =>
        t.id === prev.activeThemeId ? { ...t, mode: updatedMode } : t
      )
    }));
  };

  const theme = themeMode;

  useEffect(() => {
    const ids = NAV.filter((n) => n[1]).map((n) => n[1]);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { root: mainRef.current, rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const goto = (id) => { const el = document.getElementById(id); const c = mainRef.current; if (el && c) c.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' }); };

  return React.createElement('div', { style: { display: 'flex', height: '100vh', background: 'transparent' } },
    /* sidebar */
    React.createElement('aside', { style: { width: 272, flexShrink: 0, borderRight: '1px solid var(--border-default)', background: 'var(--surface-default)', display: 'flex', flexDirection: 'column', height: '100%' } },
      React.createElement('div', { style: { padding: '24px 24px 20px', borderBottom: '1px solid var(--border-subtle)' } },
        React.createElement('img', { src: theme === 'dark' ? 'assets/logo-white.png' : 'assets/logo-black.png', alt: 'Design System Studio', style: { height: 26 } }),
        React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.16em', color: 'var(--text-muted)', marginTop: 12 } }, 'Design System · v1.0')),
      React.createElement('nav', { style: { flex: 1, overflowY: 'auto', padding: '16px 12px' } },
        NAV.map((n, i) => n[1] === null
          ? React.createElement('div', { key: i, style: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.16em', color: 'var(--text-faint)', padding: '18px 12px 8px' } }, n[0])
          : React.createElement('a', { key: i, href: '#' + n[1], onClick: (e) => { e.preventDefault(); goto(n[1]); },
              style: { display: 'block', padding: '8px 12px', fontFamily: 'var(--font-sans)', fontSize: 13.5, textDecoration: 'none', fontWeight: active === n[1] ? 600 : 500, color: active === n[1] ? 'var(--state-selected-fg)' : 'var(--text-secondary)', background: active === n[1] ? 'var(--state-selected)' : 'transparent', borderLeft: `2px solid ${active === n[1] ? 'var(--brand-500)' : 'transparent'}` } }, n[0]))),
      React.createElement('div', { style: { padding: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 8 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 2px 8px' } },
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--text-muted)' } }, 'Dark mode'),
          React.createElement(Switch, { checked: theme === 'dark', onChange: toggleTheme, 'aria-label': 'Toggle dark mode' })),
        React.createElement(Button, { variant: 'primary', size: 'sm', fullWidth: true, iconLeft: 'download', onClick: figmaExport }, 'Export Figma Tokens'),
        React.createElement('a', { href: 'Brand Guidelines.html', style: { textDecoration: 'none' } }, React.createElement(Button, { variant: 'outline', size: 'sm', fullWidth: true, style: { pointerEvents: 'none' } }, 'Brand Guidelines')))),
    /* main */
    React.createElement('main', { ref: mainRef, style: { flex: 1, overflowY: 'auto', height: '100%' } },
      React.createElement('div', { style: { maxWidth: 960, margin: '0 auto', padding: '72px 56px 120px' } },
        /* overview */
        React.createElement('section', { id: 'overview', style: { scrollMarginTop: 24, marginBottom: 88 } },
          React.createElement(Eyebrow, { size: 12, style: { marginBottom: 20 } }, 'Design System Studio'),
          React.createElement('h1', { style: { fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text-primary)', margin: 0 } }, 'Design Systems,', React.createElement('br'), 'Built Better.'),
          React.createElement('p', { style: { fontSize: 19, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 620, marginTop: 24 } }, 'One source of truth for every Design System Studio screen, presentation, and component. Emerald-led, light-mode, editorial. Tokens copy straight to code and export to Figma variables.'),
          React.createElement('div', { style: { display: 'flex', gap: 40, marginTop: 40, flexWrap: 'wrap' } },
            [['18','Components'],['182','Design tokens'],['14','Slide templates'],['3','Type families']].map(([n, l]) => React.createElement('div', { key: l },
              React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--brand-600)' } }, n),
              React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginTop: 4 } }, l)))),
          React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 40 } },
            React.createElement(Button, { variant: 'primary', iconLeft: 'download', onClick: figmaExport }, 'Export Figma Tokens'),
            React.createElement(Button, { variant: 'outline', onClick: () => goto('color') }, 'Browse foundations'))),
        React.createElement(ColorSection, { push, theme }),
        React.createElement(TypeSection, { push }),
        React.createElement(SpacingSection, null),
        React.createElement(RadiusSection, null),
        React.createElement(ElevationSection, null),
        React.createElement(MotionSection, null),
        React.createElement(IconsSection, { push }),
        React.createElement(ButtonsSection, null),
        React.createElement(FormsSection, null),
        React.createElement(BadgesSection, null),
        React.createElement(CardsSection, null),
        React.createElement(TabsSection, null),
        React.createElement(FeedbackSection, null),
        React.createElement(PresentationSection, { dark: theme === 'dark' }),
        React.createElement(Section, { id: 'generator', kicker: 'Patterns', title: 'Master Template Generator', intro: 'The live application - sidebar, slide nav, presentation canvas, and edit toolbar - turning a Business Record into the 14-template Master Presentation.' },
          React.createElement(PatternCard, { href: 'https://design-system-studio-ppt.vercel.app', target: '_blank', rel: 'noopener', tag: 'App', title: 'Master Template Generator', desc: 'The live, actively-developed generator - opens in a new tab.' }),
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 } },
            React.createElement(FileDownload, { href: 'templates/master-presentation/MasterPresentation.pptx', label: 'Download .pptx', hint: 'Download the 14-template Master Presentation as an editable, font-embedded PowerPoint file - opens in PowerPoint, Google Slides, and Canva.' }),
            React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' } }, 'Editable starting point - fonts embedded, real text boxes, ready for PowerPoint / Google Slides / Canva'))),
        React.createElement('footer', { style: { borderTop: '1px solid var(--border-default)', paddingTop: 28, marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', display: 'flex', justifyContent: 'space-between' } },
          React.createElement('span', null, 'DESIGN_SYSTEM_STUDIO DESIGN SYSTEM'),
          React.createElement('span', null, 'PROPRIETARY AND CONFIDENTIAL'))),
      toastNode));
}
const __rootEl = document.getElementById('root');
window.DesignSystemStudioDSRoot = window.DesignSystemStudioDSRoot || ReactDOM.createRoot(__rootEl);
window.DesignSystemStudioDSRoot.render(React.createElement(App));
