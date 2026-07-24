/* Design System Studio - single-page documentation site.
   Renders foundations (token tables w/ copy + Figma export), the full
   component library across states, and pattern links. Depends on the DS
   bundle (window.Design System StudioDesignSystem_e71b95). */
const NS = window.DesignSystemStudio || window.DesignSystemStudioDesignSystem || {};
const { Button, IconButton, Badge, Card, Icon, Input, Select, Checkbox, Radio, Switch, Tabs, Tooltip, Toast, Eyebrow, HudBar, SlideFrame, MetricValue } = NS;
const { useState, useEffect, useRef } = React;

function BrandLogo({ dark = false, style = {} }) {
  return React.createElement('div', {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',
      userSelect: 'none',
      ...style
    }
  },
    React.createElement('span', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        color: dark ? '#ffffff' : 'var(--text-primary)'
      }
    }, 'Design System Studio'),
    React.createElement('span', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        lineHeight: 1.2,
        color: dark ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)',
        marginTop: 2
      }
    }, 'OPEN EDITION · v1.0'));
}

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
const RADII = [
  ['sharp', '0px', 'Default editorial containers — cards, inputs, buttons, dialogs, panels'],
  ['sm', '2px', 'Subtle rounding for micro-elements, tooltips, and dense tags'],
  ['md', '4px', 'Standard component radius option for rounded aesthetic themes'],
  ['lg', '8px', 'Soft container corners for elevated cards and dropdown menus'],
  ['xl', '16px', 'Prominent rounded surfaces, hero banners, and modal dialogs'],
  ['full', '9999px', 'Pill & circular primitives — avatars, status dots, toggle switches']
];
const SHADOWS = [['xs','0 1px 2px rgb(0 0 0 / .05)'],['sm','0 1px 3px rgb(0 0 0 / .1)'],['md','0 4px 6px rgb(0 0 0 / .1)'],['soft','0 1px 2px …, 0 12px 32px -12px …'],['lift','0 2px 4px …, 0 24px 48px -16px …']];
const MOTION = [['fast','150ms','micro - hover, color'],['normal','200ms','controls, toggles'],['slow','300ms','panels, overlays'],['slower','500ms','page / route transitions']];
const EASING = [
  ['standard','cubic-bezier(.4,0,.2,1)','Default - most transitions', [0.4,0,0.2,1]],
  ['entrance','cubic-bezier(0,0,.2,1)','Elements arriving / fading in', [0,0,0.2,1]],
  ['exit','cubic-bezier(.4,0,1,1)','Elements leaving / fading out', [0.4,0,1,1]]
];
const GLYPHS = { upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower:'abcdefghijklmnopqrstuvwxyz', num:'0123456789', punct:'& # $ € % @ ! ? * - · ( ) / +' };
const ICONS = ['share','download','upload','eye','eye-off','plus','trash','edit','reset','chevron-down','chevron-right','check','check-circle','link','external-link','x','copy','search','filter','settings','user','bell','mail','calendar','clock','folder','bar-chart','star','info','alert-triangle','arrow-right','arrow-left','more-horizontal'];

/* ---- WCAG contrast pairs ---- */
const contrastRatio = (hex1, hex2) => {
  const lum = (hex) => {
    const rgb = [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
    const s = rgb.map(c => { const v = c/255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); });
    return 0.2126*s[0] + 0.7152*s[1] + 0.0722*s[2];
  };
  const l1 = lum(hex1), l2 = lum(hex2);
  return +((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05)).toFixed(2);
};
const WCAG_PAIRS = [
  { fg:'--text-primary', fgHex:'#171717', bg:'--surface-default', bgHex:'#ffffff', label:'Body text on card surface' },
  { fg:'--text-primary', fgHex:'#171717', bg:'--surface-canvas', bgHex:'#fbfbfb', label:'Body text on canvas' },
  { fg:'--text-secondary', fgHex:'#525252', bg:'--surface-default', bgHex:'#ffffff', label:'Secondary text on card' },
  { fg:'--text-muted', fgHex:'#737373', bg:'--surface-default', bgHex:'#ffffff', label:'Muted text on card' },
  { fg:'--text-brand', fgHex:'#059669', bg:'--surface-default', bgHex:'#ffffff', label:'Brand link on card' },
  { fg:'--text-inverse', fgHex:'#ffffff', bg:'--action-primary', bgHex:'#171717', label:'White text on primary button' },
  { fg:'--text-on-brand', fgHex:'#ffffff', bg:'--action-brand', bgHex:'#059669', label:'White text on brand button' },
  { fg:'--text-primary', fgHex:'#171717', bg:'--state-selected', bgHex:'#ecfdf5', label:'Selected nav item text' },
  { fg:'--neutral-600', fgHex:'#525252', bg:'--neutral-100', bgHex:'#f5f5f5', label:'Caption on sunken surface' },
  { fg:'--brand-700', fgHex:'#047857', bg:'--brand-50', bgHex:'#ecfdf5', label:'Brand badge text on badge bg' },
];

/* ---- Changelog data ---- */
const CHANGELOG = [
  {
    version: '1.1.0', date: '2026-07-23', tag: 'latest',
    added: [
      'Sidebar search & filtering across all nav sections and icon grid.',
      'Code snippet copy panels for every component section.',
      'Animated SVG bezier curve visualizer in Motion section.',
      'Changelog section surfaced in the studio UI.',
      'Expanded exports: CSS Variables, W3C DTCG JSON, Tailwind config, TypeScript constants.',
      'WCAG AA/AAA contrast checker panel for all text/surface token pairs.',
    ],
    changed: [
      'Updated form demo labels to design-system-relevant context.',
      'Standardized footer to MIT License wording.',
    ]
  },
  {
    version: '1.0.0', date: '2026-07-22', tag: 'initial',
    added: [
      'Complete brand-agnostic design token system (colors, typography, spacing, fonts).',
      'Scoped Dark Theme override layer (tokens/colors-dark.css).',
      'Modular UI component library across Core, Forms, Navigation, Feedback, and Presentation.',
      '14 Master Presentation slide frame renderers.',
      'Single-page interactive documentation application.',
      'Comprehensive repository documentation.',
    ],
    changed: [
      'Rebranded project as standalone, open-source-ready product Design System Studio.',
    ]
  },
];

/* ---- Component code snippets ---- */
const SNIPPETS = {
  buttons: `// Button — 6 variants, 3 sizes, icon support
import { Button, IconButton } from './components/core/Button.jsx';

<Button variant="primary">Save Changes</Button>
<Button variant="brand" iconLeft="download">Export</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="ghost" iconRight="chevron-down">More</Button>
<Button variant="danger">Delete</Button>
<Button disabled>Disabled</Button>
<IconButton icon="trash" tone="danger" label="Delete item" />`,

  forms: `// Form primitives — Input, Select, Checkbox, Radio, Switch
import { Input, Select, Checkbox, Radio, Switch } from './components/forms/';

<Input label="Brand name" placeholder="e.g. Acme Inc" />
<Input label="Email" error="Enter a valid email" />
<Select label="Export format" options={['CSS Variables','DTCG JSON','Tailwind']} />
<Checkbox label="Enable token sync" checked={true} onChange={fn} />
<Radio name="env" label="Production" checked={true} onChange={fn} />
<Switch label="Dark mode" checked={dark} onChange={toggleDark} />`,

  badges: `// Badge — 6 tones, solid/subtle variants, dot indicator
import { Badge } from './components/core/Badge.jsx';

<Badge tone="brand">New</Badge>
<Badge tone="success" dot>Active</Badge>
<Badge tone="warning" variant="solid">Beta</Badge>
<Badge tone="error">Deprecated</Badge>
<Badge tone="neutral" shape="square">Draft</Badge>`,

  cards: `// Card — surface + elevation props
import { Card } from './components/core/Card.jsx';

<Card surface="default" elevation="flat" radius="sharp">
  <h3>Card title</h3>
  <p>Card body content here.</p>
</Card>

<Card surface="subtle" elevation="soft">
  Warm editorial panel
</Card>`,

  tabs: `// Tabs — controlled, underline indicator
import { Tabs } from './components/navigation/Tabs.jsx';

const [tab, setTab] = useState('Overview');

<Tabs
  tabs={['Overview', 'Components', 'Tokens', 'Settings']}
  value={tab}
  onChange={setTab}
/>`,

  feedback: `// Toast — push via hook; Tooltip — wraps any child
import { Toast, Tooltip } from './components/feedback/';

// Toasts (use the hook)
const [push, toastNode] = useToast();
push({ tone: 'success', title: 'Exported', message: '182 tokens copied.' });
push({ tone: 'error', title: 'Failed', message: 'Invalid hex value.' });

// Tooltip
<Tooltip label="Opens in new tab">
  <Button variant="outline" iconLeft="external-link">Open</Button>
</Tooltip>`,

  presentation: `// Presentation primitives
import { Eyebrow, HudBar, MetricValue, SlideFrame } from './components/presentation/';

<SlideFrame glow dark>
  <HudBar label="Q4 Results" num="07" />
  <div style={{ padding: '260px 140px 0' }}>
    <Eyebrow>Data Monument</Eyebrow>
    <MetricValue value="2.0" unit="M" heading="Total campaign reach." />
  </div>
</SlideFrame>`,
};


const NAV = [
  ['Overview','overview'],
  ['Foundations', null],
  ['Color','color'],['Typography','type'],['Spacing','spacing'],['Radius','radius'],['Elevation','elevation'],['Motion','motion'],['Iconography','icons'],['Token Map','tokenmap'],
  ['Components', null],
  ['Buttons','buttons'],['Inputs & Selection','forms'],['Badges & Tags','badges'],['Cards','cards'],['Tabs','tabs'],['Feedback','feedback'],['Presentation','presentation'],
  ['New Components', null],
  ['Avatar','avatar'],['Progress & Skeleton','progress'],['Modal / Dialog','modal'],['Accordion','accordion'],['Table','table'],['Breadcrumb & Divider','misc'],
  ['System', null],
  ['State Matrix','statematrix'],['WCAG Contrast','wcag'],['Changelog','changelog'],
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

/* ========== ONBOARDING WIZARD COMPONENT ========== */
function OnboardingWizard({ open, onClose, push }) {
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState('Design System Studio');
  const [tagline, setTagline] = useState('Engineered for Speed');
  const [archetype, setArchetype] = useState('editorial');
  const [seedColor, setSeedColor] = useState('#10b981');
  const [accentSeed, setAccentSeed] = useState('#22c55e');

  if (!open) return null;

  const archetypes = [
    { id: 'editorial', name: 'Editorial Precision', desc: 'Sharp 0px corners, high contrast typography, ultra-dense data grids.', radius: '0px', font: 'Space Grotesk' },
    { id: 'fintech', name: 'Fintech Minimal', desc: 'Clean 4px rounded edges, balanced Slate neutrals, focused data visualizers.', radius: '4px', font: 'Satoshi' },
    { id: 'cyberpunk', name: 'Neon Cyberpunk', desc: 'High impact neon green accents, dark obsidian surfaces, monospaced HUD lines.', radius: '2px', font: 'JetBrains Mono' },
    { id: 'craft', name: 'Warm Craft', desc: 'Smooth 8px pill contours, warm cream surfaces, organic brand highlights.', radius: '8px', font: 'Space Grotesk' },
  ];

  const presets = [
    { id: 'emerald', name: 'Emerald', brand: '#10b981', accent: '#22c55e' },
    { id: 'indigo', name: 'Electric Indigo', brand: '#6366f1', accent: '#818cf8' },
    { id: 'violet', name: 'Ultra Violet', brand: '#8b5cf6', accent: '#a855f7' },
    { id: 'rose', name: 'Neon Rose', brand: '#f43f5e', accent: '#fb7185' },
    { id: 'amber', name: 'Solar Amber', brand: '#f59e0b', accent: '#fbbf24' },
  ];

  const finishSetup = () => {
    const brandScale = generateScale(seedColor, 'brand');
    Object.keys(brandScale).forEach(prop => document.documentElement.style.setProperty(prop, brandScale[prop]));
    
    const accentScale = generateScale(accentSeed, 'accent');
    Object.keys(accentScale).forEach(prop => document.documentElement.style.setProperty(prop, accentScale[prop]));

    const selectedArch = archetypes.find(a => a.id === archetype);
    if (selectedArch) {
      document.documentElement.style.setProperty('--radius-sharp', selectedArch.radius);
    }

    localStorage.setItem('ds-wizard-completed', 'true');
    localStorage.setItem('ds-brand-name', brandName);
    localStorage.setItem('ds-active-brand', seedColor);
    localStorage.setItem('ds-active-accent', accentSeed);
    window.dispatchEvent(new CustomEvent('ds-tokens-updated', { detail: { brand: seedColor, accent: accentSeed } }));

    if (push) {
      push({ title: 'Brand Setup Complete', message: `Initialized ${brandName} with ${selectedArch?.name} archetype!`, tone: 'brand' });
    }
    onClose();
  };

  return React.createElement('div', {
    style: {
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(9, 9, 11, 0.82)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
    }
  },
    React.createElement('div', {
      style: {
        width: '100%', maxWidth: 680, background: 'var(--surface-default)',
        border: '1px solid var(--border-strong)', boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }
    },
      /* Header */
      React.createElement('div', {
        style: {
          padding: '24px 32px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-default)'
        }
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement(Badge, { tone: 'brand' }, `Step ${step} of 3`),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' } },
            step === 1 ? 'Brand Identity' : step === 2 ? 'System Archetype' : 'Color Palette'
          )
        ),
        React.createElement('button', {
          onClick: () => {
            localStorage.setItem('ds-wizard-completed', 'true');
            onClose();
          },
          style: { background: 'transparent', border: '1px solid var(--border-default)', padding: 6, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
          onMouseEnter: e => e.currentTarget.style.borderColor = 'var(--border-strong)',
          onMouseLeave: e => e.currentTarget.style.borderColor = 'var(--border-default)'
        }, React.createElement(Icon, { name: 'x', size: 16 }))
      ),
      /* Progress Track */
      React.createElement('div', { style: { height: 2, background: 'var(--border-subtle)', width: '100%' } },
        React.createElement('div', { style: { height: '100%', width: `${(step / 3) * 100}%`, background: 'var(--brand-500)', transition: 'width 300ms ease' } })
      ),
      /* Body Content */
      React.createElement('div', { style: { padding: '36px 32px 40px', flex: 1, overflowY: 'auto' } },
        step === 1 && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 28 } },
          React.createElement('div', null,
            React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.03em', color: 'var(--text-primary)' } }, 'Welcome to Design System Studio'),
            React.createElement('p', { style: { fontSize: 15, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, maxWidth: 540 } }, 'Set up your project name and archetype motto to initialize core tokens across the entire studio.')
          ),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
            React.createElement(Input, { label: 'Brand Name', value: brandName, onChange: e => setBrandName(e.target.value), placeholder: 'e.g. Acme Studio' }),
            React.createElement(Input, { label: 'Tagline / Motto', value: tagline, onChange: e => setTagline(e.target.value), placeholder: 'e.g. Engineered for Speed' })
          )
        ),
        step === 2 && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 24 } },
          React.createElement('div', null,
            React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em', color: 'var(--text-primary)' } }, 'Choose Design Archetype'),
            React.createElement('p', { style: { fontSize: 14, color: 'var(--text-secondary)', margin: 0 } }, 'Select the foundational aesthetic rules for component radii and typography:')
          ),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 } },
            archetypes.map(a => React.createElement('div', {
              key: a.id,
              onClick: () => setArchetype(a.id),
              style: {
                padding: 20, border: archetype === a.id ? '2px solid var(--brand-500)' : '1px solid var(--border-default)',
                background: archetype === a.id ? 'var(--state-selected)' : 'var(--surface-default)',
                cursor: 'pointer', transition: 'all 150ms ease', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }
            },
              React.createElement('div', null,
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
                  React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' } }, a.name),
                  archetype === a.id && React.createElement(Badge, { tone: 'brand' }, 'Active')
                ),
                React.createElement('p', { style: { fontSize: 12.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 } }, a.desc)
              ),
              React.createElement('div', { style: { marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } },
                `Corner: ${a.radius}  ·  Font: ${a.font}`
              )
            ))
          )
        ),
        step === 3 && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 24 } },
          React.createElement('div', null,
            React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.02em', color: 'var(--text-primary)' } }, 'Palette & Color Scale'),
            React.createElement('p', { style: { fontSize: 14, color: 'var(--text-secondary)', margin: 0 } }, 'Pick a curated brand preset or define your custom HSL seeds:')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
            presets.map(p => React.createElement('button', {
              key: p.id,
              onClick: () => { setSeedColor(p.brand); setAccentSeed(p.accent); },
              style: {
                padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
                border: seedColor === p.brand ? '2px solid var(--brand-500)' : '1px solid var(--border-default)',
                background: seedColor === p.brand ? 'var(--state-selected)' : 'var(--surface-default)',
                color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
              }
            },
              React.createElement('span', { style: { width: 12, height: 12, borderRadius: '50%', background: p.brand } }),
              p.name
            ))
          ),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 } },
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
              React.createElement('label', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' } }, 'Primary Seed Color'),
              React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
                React.createElement('div', { style: { position: 'relative', width: 40, height: 40, background: seedColor, border: '1px solid var(--border-default)' } },
                  React.createElement('input', { type: 'color', value: seedColor, onChange: e => setSeedColor(e.target.value), style: { position: 'absolute', inset: -8, width: 60, height: 60, opacity: 0, cursor: 'pointer' } })
                ),
                React.createElement('input', { type: 'text', value: seedColor, onChange: e => setSeedColor(e.target.value), style: { flex: 1, height: 40, padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: 13, border: '1px solid var(--border-default)', background: 'var(--surface-canvas)', color: 'var(--text-primary)', outline: 'none' } })
              )
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
              React.createElement('label', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' } }, 'Accent Seed Color'),
              React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
                React.createElement('div', { style: { position: 'relative', width: 40, height: 40, background: accentSeed, border: '1px solid var(--border-default)' } },
                  React.createElement('input', { type: 'color', value: accentSeed, onChange: e => setAccentSeed(e.target.value), style: { position: 'absolute', inset: -8, width: 60, height: 60, opacity: 0, cursor: 'pointer' } })
                ),
                React.createElement('input', { type: 'text', value: accentSeed, onChange: e => setAccentSeed(e.target.value), style: { flex: 1, height: 40, padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: 13, border: '1px solid var(--border-default)', background: 'var(--surface-canvas)', color: 'var(--text-primary)', outline: 'none' } })
              )
            )
          ),
          /* Live Scale Preview */
          React.createElement('div', { style: { marginTop: 8 } },
            React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', display: 'block', marginBottom: 10 } }, 'Generated Scale Preview'),
            React.createElement('div', { style: { display: 'flex', height: 32, border: '1px solid var(--border-default)' } },
              Object.values(generateScale(seedColor, 'brand')).map((hex, i) =>
                React.createElement('div', { key: i, style: { flex: 1, background: hex } })
              )
            )
          )
        )
      ),
      /* Footer */
      React.createElement('div', {
        style: {
          padding: '20px 32px', borderTop: '1px solid var(--border-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-subtle)'
        }
      },
        step > 1 ? React.createElement(Button, { variant: 'outline', onClick: () => setStep(s => s - 1) }, 'Back') : React.createElement('div', null),
        step < 3 ? React.createElement(Button, { variant: 'primary', onClick: () => setStep(s => s + 1) }, 'Continue →') : React.createElement(Button, { variant: 'brand', onClick: finishSetup }, 'Finish & Apply Tokens')
      )
    )
  );
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

function hexToHsl(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  let r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function generateScale(hexColor, type) {
  const [h, s, l] = hexToHsl(hexColor);
  const lightnessMap = type === 'brand' ? {
    50: 95, 100: 90, 200: 80, 300: 68, 400: 55, 500: l, 600: Math.max(10, l - 10), 700: Math.max(8, l - 18), 800: Math.max(6, l - 24), 900: Math.max(4, l - 30), 950: Math.max(2, l - 35)
  } : {
    50: 96, 100: 91, 200: 82, 300: 70, 400: 58, 500: l, 600: Math.max(10, l - 10), 700: Math.max(8, l - 18), 800: Math.max(6, l - 24), 900: Math.max(4, l - 30)
  };

  const scale = {};
  Object.keys(lightnessMap).forEach(step => {
    scale[`--${type}-${step}`] = hslToHex(h, s, lightnessMap[step]);
  });
  return scale;
}

function LiveTokenCustomizer({ push }) {
  const [brand500, setBrand500] = useState('#10b981');
  const [accent500, setAccent500] = useState('#22c55e');
  const [neutral900, setNeutral900] = useState('#171717');
  const [surfaceCanvas, setSurfaceCanvas] = useState('#ffffff');
  const [activePreset, setActivePreset] = useState('emerald');

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail?.brand) setBrand500(e.detail.brand);
      if (e.detail?.accent) setAccent500(e.detail.accent);
      const matched = presets.find(p => p.brand.toLowerCase() === (e.detail?.brand || '').toLowerCase());
      setActivePreset(matched ? matched.id : 'custom');
    };
    const savedBrand = localStorage.getItem('ds-active-brand');
    const savedAccent = localStorage.getItem('ds-active-accent');
    const savedPreset = localStorage.getItem('ds-active-preset');
    if (savedBrand) setBrand500(savedBrand);
    if (savedAccent) setAccent500(savedAccent);

    if (savedPreset) {
      setActivePreset(savedPreset);
    } else if (savedBrand) {
      const matched = presets.find(p => p.brand.toLowerCase() === savedBrand.toLowerCase());
      setActivePreset(matched ? matched.id : 'custom');
    }

    window.addEventListener('ds-tokens-updated', handleUpdate);
    return () => window.removeEventListener('ds-tokens-updated', handleUpdate);
  }, []);

  const presets = [
    { id: 'emerald', name: 'Emerald (Default)', brand: '#10b981', accent: '#22c55e', dark: '#171717', canvas: '#ffffff' },
    { id: 'indigo', name: 'Electric Indigo', brand: '#6366f1', accent: '#818cf8', dark: '#0f172a', canvas: '#f8fafc' },
    { id: 'amber', name: 'Cyber Amber', brand: '#f59e0b', accent: '#fbbf24', dark: '#18181b', canvas: '#fafafa' },
    { id: 'rose', name: 'Neon Rose', brand: '#f43f5e', accent: '#fb7185', dark: '#111827', canvas: '#f9fafb' },
  ];

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiScale, setAiScale] = useState(null);

  const moodPresets = [
    { label: '🤖 Cyberpunk Neon', brand: '#f43f5e', accent: '#06b6d4' },
    { label: '🏛️ Luxury Gold', brand: '#d97706', accent: '#fbbf24' },
    { label: '🌲 Nordic Forest', brand: '#059669', accent: '#10b981' },
    { label: '🍇 Electric Violet', brand: '#8b5cf6', accent: '#ec4899' },
    { label: '🌊 Ocean Minimal', brand: '#0284c7', accent: '#38bdf8' }
  ];

  const applyBrandColor = (hex) => {
    setBrand500(hex);
    localStorage.setItem('ds-active-brand', hex);
    const scale = generateScale(hex, 'brand');
    Object.keys(scale).forEach(prop => {
      document.documentElement.style.setProperty(prop, scale[prop]);
    });
  };

  const applyAccentColor = (hex) => {
    setAccent500(hex);
    localStorage.setItem('ds-active-accent', hex);
    const scale = generateScale(hex, 'accent');
    Object.keys(scale).forEach(prop => {
      document.documentElement.style.setProperty(prop, scale[prop]);
    });
  };

  const generateAiPalette = (customText) => {
    const query = (customText || aiPrompt).toLowerCase();
    let b = '#10b981', a = '#22c55e';
    if (query.includes('cyber') || query.includes('neon') || query.includes('synth')) { b = '#f43f5e'; a = '#06b6d4'; }
    else if (query.includes('gold') || query.includes('lux') || query.includes('amber')) { b = '#d97706'; a = '#fbbf24'; }
    else if (query.includes('nord') || query.includes('forest') || query.includes('green')) { b = '#059669'; a = '#10b981'; }
    else if (query.includes('violet') || query.includes('purple') || query.includes('grape')) { b = '#8b5cf6'; a = '#ec4899'; }
    else if (query.includes('ocean') || query.includes('blue') || query.includes('water')) { b = '#0284c7'; a = '#38bdf8'; }
    else {
      // Deterministic hash hue generator for arbitrary prompts
      let hash = 0;
      for (let i = 0; i < query.length; i++) hash = query.charCodeAt(i) + ((hash << 5) - hash);
      const h1 = Math.abs(hash) % 360;
      const h2 = (h1 + 40) % 360;
      b = hslToHex(h1, 75, 48);
      a = hslToHex(h2, 80, 55);
    }

    setAiScale({ brand: b, accent: a, prompt: customText || aiPrompt });
    applyBrandColor(b);
    applyAccentColor(a);
    localStorage.setItem('ds-active-brand', b);
    localStorage.setItem('ds-active-accent', a);
    window.dispatchEvent(new CustomEvent('ds-tokens-updated', { detail: { brand: b, accent: a } }));
    if (push) push({ title: 'AI OKLCH Scale Generated', message: `Generated scale for "${customText || aiPrompt}"`, tone: 'brand' });
  };

  const updateToken = (type, value) => {
    setActivePreset('custom');
    if (type === 'brand') applyBrandColor(value);
    else if (type === 'accent') applyAccentColor(value);
    else if (type === 'neutral') {
      setNeutral900(value);
      const isLight = !document.documentElement.getAttribute('data-theme');
      if (isLight) {
        document.documentElement.style.setProperty('--neutral-900', value);
        document.documentElement.style.setProperty('--action-primary', value);
      }
    } else if (type === 'canvas') {
      setSurfaceCanvas(value);
      const isLight = !document.documentElement.getAttribute('data-theme');
      if (isLight) {
        document.documentElement.style.setProperty('--surface-canvas', value);
      }
    }
  };

  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    localStorage.setItem('ds-active-preset', preset.id);
    applyBrandColor(preset.brand);
    applyAccentColor(preset.accent);
    setNeutral900(preset.dark);
    const isLight = !document.documentElement.getAttribute('data-theme');
    if (isLight) {
      document.documentElement.style.setProperty('--neutral-900', preset.dark);
      document.documentElement.style.setProperty('--action-primary', preset.dark);
    } else {
      document.documentElement.style.removeProperty('--neutral-900');
      document.documentElement.style.removeProperty('--action-primary');
    }
    document.documentElement.style.removeProperty('--surface-canvas');
    if (push) push({ title: 'Preset Applied', message: preset.name + ' full scale active', tone: 'brand' });
  };

  const resetTokens = () => {
    ['50','100','200','300','400','500','600','700','800','900','950'].forEach(s => {
      document.documentElement.style.removeProperty(`--brand-${s}`);
      document.documentElement.style.removeProperty(`--accent-${s}`);
    });
    document.documentElement.style.removeProperty('--neutral-900');
    document.documentElement.style.removeProperty('--action-primary');
    document.documentElement.style.removeProperty('--surface-canvas');
    setBrand500('#10b981');
    setAccent500('#22c55e');
    setNeutral900('#171717');
    setSurfaceCanvas('#ffffff');
    setActivePreset('emerald');
    if (push) push({ title: 'Tokens Reset', message: 'Restored original system values', tone: 'brand' });
  };

  return React.createElement(Panel, { style: { marginBottom: 32, border: '2px solid var(--brand-500)' } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
      React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--text-primary)' } }, 'Live Token Customizer'),
      React.createElement(Button, { variant: 'outline', size: 'sm', onClick: resetTokens }, 'Reset Defaults')
    ),
    React.createElement('p', { style: { fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 20px', lineHeight: 1.5 } },
      'Customize core system tokens in real-time. Changing primary or accent colors automatically regenerates full 10-step color scales across the entire platform.'
    ),
    React.createElement('div', { style: { display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' } },
      presets.map(p => React.createElement('button', {
        key: p.id,
        onClick: () => applyPreset(p),
        style: {
          padding: '6px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          border: activePreset === p.id ? '2px solid var(--brand-500)' : '1px solid var(--border-default)',
          background: activePreset === p.id ? 'var(--state-selected)' : 'var(--surface-default)',
          color: activePreset === p.id ? 'var(--state-selected-fg)' : 'var(--text-primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }
      },
        React.createElement('span', { style: { width: 10, height: 10, borderRadius: '50%', background: p.brand } }),
        p.name
      ))
    ),
    /* AI OKLCH Generator Bar */
    React.createElement('div', { style: { padding: 16, marginBottom: 24, background: 'var(--surface-subtle)', border: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', gap: 12 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--brand-600)' } }, '✨ AI OKLCH Scale Generator'),
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, 'Offline Perceptual Lightness Engine')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center' } },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement(Input, { size: 'sm', placeholder: 'Describe palette mood (e.g. Cyberpunk Neon, Luxury Gold, Nordic Forest)…', value: aiPrompt, onChange: e => setAiPrompt(e.target.value) })
        ),
        React.createElement(Button, { variant: 'brand', size: 'sm', iconLeft: 'sliders', onClick: () => generateAiPalette() }, 'Generate AI Palette')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' } },
        React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginRight: 4 } }, 'Quick Moods:'),
        moodPresets.map(m => React.createElement('button', {
          key: m.label,
          onClick: () => { setAiPrompt(m.label); generateAiPalette(m.label); },
          style: { padding: '4px 9px', fontFamily: 'var(--font-mono)', fontSize: 10, border: '1px solid var(--border-default)', background: 'var(--surface-default)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }
        },
          React.createElement('span', { style: { width: 8, height: 8, borderRadius: '50%', background: m.brand } }),
          m.label
        ))
      )
    ),
    React.createElement('div', { className: 'responsive-grid-2', style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 } },
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        React.createElement('label', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', minHeight: 18 } }, '--brand-500 (Primary Brand Scale)'),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('div', { style: { position: 'relative', width: 36, height: 36, flexShrink: 0, background: brand500, border: '1px solid var(--border-default)', boxSizing: 'border-box' } },
            React.createElement('input', { type: 'color', value: brand500, onChange: e => updateToken('brand', e.target.value), style: { position: 'absolute', inset: -8, width: 60, height: 60, opacity: 0, cursor: 'pointer' } })
          ),
          React.createElement('input', { type: 'text', value: brand500, onChange: e => updateToken('brand', e.target.value), style: { flex: 1, height: 36, padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: 12, border: '1px solid var(--border-default)', background: 'var(--surface-canvas)', color: 'var(--text-primary)', boxSizing: 'border-box', outline: 'none' } })
        )
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        React.createElement('label', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', minHeight: 18 } }, '--accent-500 (Secondary Accent Scale)'),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('div', { style: { position: 'relative', width: 36, height: 36, flexShrink: 0, background: accent500, border: '1px solid var(--border-default)', boxSizing: 'border-box' } },
            React.createElement('input', { type: 'color', value: accent500, onChange: e => updateToken('accent', e.target.value), style: { position: 'absolute', inset: -8, width: 60, height: 60, opacity: 0, cursor: 'pointer' } })
          ),
          React.createElement('input', { type: 'text', value: accent500, onChange: e => updateToken('accent', e.target.value), style: { flex: 1, height: 36, padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: 12, border: '1px solid var(--border-default)', background: 'var(--surface-canvas)', color: 'var(--text-primary)', boxSizing: 'border-box', outline: 'none' } })
        )
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        React.createElement('label', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', minHeight: 18 } }, '--neutral-900 (Action Primary)'),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('div', { style: { position: 'relative', width: 36, height: 36, flexShrink: 0, background: neutral900, border: '1px solid var(--border-default)', boxSizing: 'border-box' } },
            React.createElement('input', { type: 'color', value: neutral900, onChange: e => updateToken('neutral', e.target.value), style: { position: 'absolute', inset: -8, width: 60, height: 60, opacity: 0, cursor: 'pointer' } })
          ),
          React.createElement('input', { type: 'text', value: neutral900, onChange: e => updateToken('neutral', e.target.value), style: { flex: 1, height: 36, padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: 12, border: '1px solid var(--border-default)', background: 'var(--surface-canvas)', color: 'var(--text-primary)', boxSizing: 'border-box', outline: 'none' } })
        )
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        React.createElement('label', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', minHeight: 18 } }, '--surface-canvas (Page Background)'),
        React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
          React.createElement('div', { style: { position: 'relative', width: 36, height: 36, flexShrink: 0, background: surfaceCanvas, border: '1px solid var(--border-default)', boxSizing: 'border-box' } },
            React.createElement('input', { type: 'color', value: surfaceCanvas, onChange: e => updateToken('canvas', e.target.value), style: { position: 'absolute', inset: -8, width: 60, height: 60, opacity: 0, cursor: 'pointer' } })
          ),
          React.createElement('input', { type: 'text', value: surfaceCanvas, onChange: e => updateToken('canvas', e.target.value), style: { flex: 1, height: 36, padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: 12, border: '1px solid var(--border-default)', background: 'var(--surface-canvas)', color: 'var(--text-primary)', boxSizing: 'border-box', outline: 'none' } })
        )
      )
    )
  );
}

function ColorSection({ push, theme }) {
  return React.createElement(Section, { id: 'color', kicker: 'Foundations', title: 'Color', intro: 'Emerald is the single brand accent; everything else is a near-monochrome neutral scale. Swatches and values reflect the active theme - the light tint steps resolve to dark washes in dark mode. Click any row to copy its token.' },
    React.createElement(LiveTokenCustomizer, { push }),
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

function loadGoogleFont(fontName) {
  if (!fontName) return;
  const cleanName = fontName.replace(/["']/g, '').trim();
  const fontId = 'gf-' + cleanName.toLowerCase().replace(/\s+/g, '-');
  if (!document.getElementById(fontId)) {
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(cleanName)}:wght@400;500;600;700;900&display=swap`;
    document.head.appendChild(link);
  }
}

function TypeTester({ push }) {
  const [text, setText] = useState('Amplify authentic voices at scale.');
  const [size, setSize] = useState(48);
  const [weight, setWeight] = useState(600);
  const [displayFont, setDisplayFont] = useState(() => localStorage.getItem('ds-font-display') || 'Space Grotesk');
  const [sansFont, setSansFont] = useState(() => localStorage.getItem('ds-font-sans') || 'Satoshi');
  const [monoFont, setMonoFont] = useState(() => localStorage.getItem('ds-font-mono') || 'JetBrains Mono');
  const [customFontInput, setCustomFontInput] = useState('');

  const displayPresets = ['Space Grotesk', 'Outfit', 'Syne', 'Playfair Display', 'Cinzel', 'Plus Jakarta Sans'];
  const bodyPresets = ['Satoshi', 'Inter', 'Plus Jakarta Sans', 'Roboto', 'DM Sans', 'Outfit'];
  const monoPresets = ['JetBrains Mono', 'Fira Code', 'Space Mono', 'IBM Plex Mono'];

  const applyFont = (role, fontName) => {
    loadGoogleFont(fontName);
    if (role === 'display') {
      setDisplayFont(fontName);
      localStorage.setItem('ds-font-display', fontName);
      document.documentElement.style.setProperty('--font-display', `"${fontName}", sans-serif`);
    } else if (role === 'sans') {
      setSansFont(fontName);
      localStorage.setItem('ds-font-sans', fontName);
      document.documentElement.style.setProperty('--font-sans', `"${fontName}", sans-serif`);
    } else if (role === 'mono') {
      setMonoFont(fontName);
      localStorage.setItem('ds-font-mono', fontName);
      document.documentElement.style.setProperty('--font-mono', `"${fontName}", monospace`);
    }
    if (push) push({ title: 'Font Token Updated', message: `Applied ${fontName} to --font-${role}`, tone: 'brand' });
  };

  const applyCustomFont = (role) => {
    if (!customFontInput.trim()) return;
    applyFont(role, customFontInput.trim());
    setCustomFontInput('');
  };

  const resetFonts = () => {
    ['display', 'sans', 'mono'].forEach(r => localStorage.removeItem(`ds-font-${r}`));
    document.documentElement.style.removeProperty('--font-display');
    document.documentElement.style.removeProperty('--font-sans');
    document.documentElement.style.removeProperty('--font-mono');
    setDisplayFont('Space Grotesk');
    setSansFont('Satoshi');
    setMonoFont('JetBrains Mono');
    if (push) push({ title: 'Fonts Reset', message: 'Restored original font tokens', tone: 'brand' });
  };

  const fams = [
    [displayFont, 'var(--font-display)', 'Display · headlines · large editorial titles', '-0.03em', 'display', displayPresets],
    [sansFont, 'var(--font-sans)', 'Interface · body · navigation · forms', '0', 'sans', bodyPresets],
    [monoFont, 'var(--font-mono)', 'Labels · metadata · numbers · IDs', '0', 'mono', monoPresets],
  ];

  return React.createElement(Panel, { style: { marginBottom: 24, background: 'var(--surface-default)' } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
      React.createElement(Sub, { style: { margin: 0 } }, 'Interactive Font Playground & Swapper'),
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        React.createElement(Button, { variant: 'outline', size: 'sm', onClick: resetFonts }, 'Reset Fonts'),
        React.createElement('button', { onClick: () => copy(text, push), style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' } }, React.createElement(Icon, { name: 'copy', size: 13 }), 'Copy text')
      )
    ),
    React.createElement('p', { style: { fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 20px', lineHeight: 1.5 } },
      'Swap display, body, or mono typefaces dynamically. Select a curated preset or type any Google Font name below to test it across the entire platform.'
    ),
    /* Custom Google Font Input Bar */
    React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 24, padding: 14, background: 'var(--surface-subtle)', border: '1px solid var(--border-default)' } },
      React.createElement('div', { style: { flex: 1 } },
        React.createElement(Input, { size: 'sm', placeholder: 'Type any Google Font name (e.g. Poppins, Outfit, Syne)…', value: customFontInput, onChange: e => setCustomFontInput(e.target.value) })
      ),
      React.createElement(Button, { variant: 'brand', size: 'sm', onClick: () => applyCustomFont('display') }, 'Set Display'),
      React.createElement(Button, { variant: 'outline', size: 'sm', onClick: () => applyCustomFont('sans') }, 'Set Body'),
      React.createElement(Button, { variant: 'outline', size: 'sm', onClick: () => applyCustomFont('mono') }, 'Set Mono')
    ),
    React.createElement('div', { style: { display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', margin: '16px 0 20px' } },
      React.createElement('div', { style: { flex: '1 1 320px' } }, React.createElement(Input, { label: 'Your text', value: text, onChange: (e) => setText(e.target.value), placeholder: 'Type anything…' })),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6, minWidth: 190 } },
        React.createElement('label', { style: { fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' } }, 'Size · ' + size + 'px'),
        React.createElement('input', { type: 'range', min: 14, max: 120, value: size, onChange: (e) => setSize(+e.target.value), style: { accentColor: 'var(--brand-500)', height: 44 } })),
      React.createElement('div', { style: { minWidth: 150 } }, React.createElement(Select, { label: 'Weight', value: String(weight), onChange: (e) => setWeight(+e.target.value), options: [{ value: '400', label: 'Regular 400' }, { value: '500', label: 'Medium 500' }, { value: '600', label: 'Semibold 600' }, { value: '700', label: 'Bold 700' }] }))),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
      fams.map(([name, fam, roleDesc, tr, roleKey, presets]) => React.createElement('div', { key: roleKey, style: { padding: '18px 0', borderTop: '1px solid var(--border-subtle)' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 } },
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--brand-600)' } }, `${roleKey.toUpperCase()} TOKEN · ${name}`),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, roleDesc)),
        React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' } },
          presets.map(p => React.createElement('button', {
            key: p, onClick: () => applyFont(roleKey, p),
            style: {
              padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.04em',
              border: name === p ? '1px solid var(--brand-500)' : '1px solid var(--border-default)',
              background: name === p ? 'var(--state-selected)' : 'var(--surface-default)',
              color: name === p ? 'var(--state-selected-fg)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }
          }, p))
        ),
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
  return React.createElement(Section, { id: 'type', kicker: 'Foundations', title: 'Typography', intro: 'Three core font roles with live Google Fonts swapper. Select curated presets or test custom typefaces in real-time across all components.' },
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
  const [hovered, setHovered] = useState(null);
  const [scale, setScale] = useState(1);

  const scaleButtons = React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 } },
    React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' } }, 'Scale factor'),
    [0.5, 1, 1.5, 2].map(function(v) {
      return React.createElement('button', {
        key: v,
        onClick: function() { setScale(v); },
        style: { fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', border: '1px solid var(--border-default)', background: scale === v ? 'var(--action-primary)' : 'transparent', color: scale === v ? 'var(--text-inverse)' : 'var(--text-secondary)', cursor: 'pointer' }
      }, v + 'x');
    })
  );

  const spacingRows = SPACING.map(function(s, i) {
    const px = parseInt(s[1]) * scale;
    const isHov = hovered === s[0];
    const barColor = isHov ? 'var(--brand-600)' : 'var(--brand-500)';
    const barWidth = Math.min(px, 400);
    return React.createElement('div', {
      key: s[0],
      onMouseEnter: function() { setHovered(s[0]); },
      onMouseLeave: function() { setHovered(null); },
      style: { display: 'grid', gridTemplateColumns: '90px 1fr 140px', alignItems: 'center', gap: 20, padding: '10px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', background: isHov ? 'var(--state-selected)' : 'transparent', transition: 'background 120ms' }
    },
      React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: isHov ? 'var(--state-selected-fg)' : 'var(--text-primary)', fontWeight: isHov ? 700 : 400 } }, 'space-' + s[0]),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement('span', { style: { height: 16, width: barWidth, background: barColor, transition: 'width 200ms ease, background 120ms', display: 'block' } }),
        isHov && React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--brand-600)', whiteSpace: 'nowrap' } }, px + 'px computed')
      ),
      React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'right' } }, s[1] + ' · ' + s[2])
    );
  });

  const gapValue = (16 * scale) + 'px';
  const previewBars = SPACING.slice(0, 8).map(function(s) {
    const barH = parseInt(s[1]) * scale;
    return React.createElement('div', { key: s[0], style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 } },
      React.createElement('div', { style: { width: 32, height: barH, background: 'var(--brand-200)', border: '1px solid var(--brand-400)' } }),
      React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)' } }, s[0])
    );
  });

  return React.createElement(Section, { id: 'spacing', kicker: 'Foundations', title: 'Spacing', intro: 'A 4px base grid drives every gap, pad, and margin. Consistent rhythm is what makes layouts feel engineered.' },
    scaleButtons,
    React.createElement('div', { style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)' } },
      spacingRows
    ),
    React.createElement('div', { style: { marginTop: 20 } },
      React.createElement(Sub, null, 'Live spacing preview'),
      React.createElement(Panel, null,
        React.createElement('div', { style: { display: 'flex', gap: gapValue, alignItems: 'flex-end', flexWrap: 'wrap' } },
          previewBars
        )
      )
    )
  );
}
function RadiusSection() {
  const [customRadius, setCustomRadius] = useState(8);
  const [selectedRadius, setSelectedRadius] = useState(null);

  return React.createElement(Section, { id: 'radius', kicker: 'Foundations', title: 'Corner Radius', intro: 'Corner radius tokens define structural curvature across the design system. Adjust the interactive controls below to preview dynamic rounding across UI components.' },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16, marginBottom: 28 } },
      RADII.map(function(r) {
        const isSelected = selectedRadius === r[0];
        return React.createElement('div', {
          key: r[0],
          onClick: function() { setSelectedRadius(r[0]); },
          style: {
            padding: 16,
            background: isSelected ? 'var(--state-selected)' : 'var(--surface-default)',
            border: isSelected ? '2px solid var(--brand-500)' : '1px solid var(--border-default)',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 150ms'
          }
        },
          React.createElement('div', {
            style: {
              width: '100%',
              height: 60,
              background: 'var(--neutral-100)',
              border: '1px solid var(--border-strong)',
              borderRadius: r[1] === '9999px' ? '30px' : r[1],
              margin: '0 auto 12px'
            }
          }),
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' } }, r[0]),
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--brand-600)', marginTop: 2 } }, r[1]),
          React.createElement('div', { style: { fontSize: 10, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.3 } }, r[2])
        );
      })
    ),
    React.createElement(Sub, null, 'Interactive Radius Playground'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' } }, 'Radius Value:'),
          React.createElement('input', {
            type: 'range',
            min: 0,
            max: 32,
            value: customRadius,
            onChange: function(e) { setCustomRadius(Number(e.target.value)); },
            style: { flex: 1 }
          }),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, minWidth: 48 } }, customRadius + 'px')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start' } },
          React.createElement('button', {
            style: {
              padding: '10px 20px',
              background: 'var(--action-primary)',
              color: 'var(--text-inverse)',
              border: 'none',
              borderRadius: customRadius + 'px',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              cursor: 'pointer'
            }
          }, 'Button Primitive'),
          React.createElement('input', {
            placeholder: 'Input primitive...',
            readOnly: true,
            style: {
              padding: '10px 14px',
              border: '1px solid var(--border-default)',
              background: 'var(--surface-canvas)',
              color: 'var(--text-primary)',
              borderRadius: customRadius + 'px',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              outline: 'none'
            }
          }),
          React.createElement('div', {
            style: {
              padding: '8px 14px',
              background: 'var(--brand-100)',
              color: 'var(--brand-700)',
              border: '1px solid var(--brand-300)',
              borderRadius: customRadius + 'px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11
            }
          }, 'Badge Primitive'),
          React.createElement('div', {
            style: {
              width: 140,
              height: 64,
              background: 'var(--surface-default)',
              border: '1px solid var(--border-strong)',
              borderRadius: customRadius + 'px',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)'
            }
          }, 'Card Surface')
        )
      )
    )
  );
}
function ElevationSection() {
  return React.createElement(Section, { id: 'elevation', kicker: 'Foundations', title: 'Elevation', intro: 'The interface leans on spacing and contrast. Shadows stay soft and rare - two editorial lifts for raised surfaces.' },
    React.createElement('div', { style: { display: 'flex', gap: 28, flexWrap: 'wrap', background: 'var(--surface-subtle)', padding: 32, border: '1px solid var(--border-default)' } },
      SHADOWS.map((s) => React.createElement('div', { key: s[0], style: { textAlign: 'center' } },
        React.createElement('div', { style: { width: 130, height: 78, background: 'var(--surface-default)', border: '1px solid var(--border-strong)', borderRadius: 0, boxShadow: `var(--shadow-${s[0]})` } }),
        React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)', marginTop: 12 } }, 'shadow-' + s[0])))));
}
/* SVG bezier curve visualizer for easing section */
function EasingCurveSVG({ cp, go }) {
  const S = 80;
  const toSVG = ([x, y]) => [x * S, S - y * S];
  const [ax, ay] = toSVG([0, 0]);
  const [bx, by] = toSVG([cp[0], cp[1]]);
  const [cx2, cy2] = toSVG([cp[2], cp[3]]);
  const [dx, dy] = toSVG([1, 1]);
  const d = `M ${ax} ${ay} C ${bx} ${by}, ${cx2} ${cy2}, ${dx} ${dy}`;

  const computeBezierPoint = (t) => {
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;
    const x = mt3 * 0 + 3 * mt2 * t * cp[0] + 3 * mt * t2 * cp[2] + t3 * 1;
    const y = mt3 * 0 + 3 * mt2 * t * cp[1] + 3 * mt * t2 * cp[3] + t3 * 1;
    return toSVG([x, y]);
  };

  // Generate 20 sampled keyframes along the cubic bezier path
  const keyframes = Array.from({ length: 21 }, (_, i) => {
    const t = i / 20;
    const [px, py] = computeBezierPoint(t);
    return { percent: (i * 5), px, py };
  });

  const animName = `bezier_anim_${cp.join('_').replace(/[\.,]/g, '_')}`;

  return React.createElement('div', { style: { position: 'relative', width: S, height: S } },
    React.createElement('style', null, `
      @keyframes ${animName} {
        ${keyframes.map(k => `${k.percent}% { transform: translate(${k.px}px, ${k.py}px); }`).join('\n')}
      }
      .${animName}-dot {
        animation: ${animName} 1.4s ease-in-out infinite alternate;
      }
    `),
    React.createElement('svg', { width: S, height: S, viewBox: `0 0 ${S} ${S}`, style: { display: 'block', position: 'absolute', top: 0, left: 0 } },
      React.createElement('line', { x1: 0, y1: S, x2: S, y2: S, stroke: 'var(--border-default)', strokeWidth: 1 }),
      React.createElement('line', { x1: 0, y1: 0, x2: 0, y2: S, stroke: 'var(--border-default)', strokeWidth: 1 }),
      React.createElement('line', { x1: ax, y1: ay, x2: bx, y2: by, stroke: 'var(--neutral-300)', strokeWidth: 1, strokeDasharray: '3 2' }),
      React.createElement('line', { x1: dx, y1: dy, x2: cx2, y2: cy2, stroke: 'var(--neutral-300)', strokeWidth: 1, strokeDasharray: '3 2' }),
      React.createElement('circle', { cx: bx, cy: by, r: 3, fill: 'var(--neutral-300)' }),
      React.createElement('circle', { cx: cx2, cy: cy2, r: 3, fill: 'var(--neutral-300)' }),
      React.createElement('path', { d, fill: 'none', stroke: 'var(--brand-500)', strokeWidth: 2, strokeLinecap: 'round' })
    ),
    React.createElement('div', {
      className: `${animName}-dot`,
      style: {
        position: 'absolute', top: -5, left: -5, width: 10, height: 10,
        borderRadius: '50%', background: 'var(--brand-500)', pointerEvents: 'none'
      }
    })
  );
}

function MotionSection() {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setInterval(() => setGo((g) => !g), 1200); return () => clearInterval(t); }, []);
  return React.createElement(Section, { id: 'motion', kicker: 'Foundations', title: 'Motion', intro: 'Subtle, intentional, premium. 150–300ms with a standard ease — fades and gentle shifts, never bounces.' },
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
    React.createElement(Sub, null, 'Easing curves — animated bezier visualizer'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 } },
        EASING.map((e) => React.createElement('div', { key: e[0], style: { border: '1px solid var(--border-default)', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 } },
          React.createElement('div', { style: { background: 'var(--neutral-50)', padding: 12, display: 'flex', justifyContent: 'center' } },
            React.createElement(EasingCurveSVG, { cp: e[3], go })),
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 } }, e[0]),
            React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--brand-600)', marginTop: 4 } }, e[1]),
            React.createElement('div', { style: { fontSize: 12, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.5 } }, e[2])))))),
    React.createElement(Sub, null, 'Interaction states — hover, focus, fade'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' } },
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' } },
          React.createElement(Button, { variant: 'primary', style: { background: 'var(--brand-600)', color: 'var(--pure-white)' } }, 'Hover me'),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, 'darken · 150ms')),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' } },
          React.createElement('input', { placeholder: 'Focus me', style: { height: 44, padding: '0 14px', border: '1px solid var(--border-default)', fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none', color: 'var(--text-primary)' }, onFocus: (ev) => { ev.target.style.borderColor = 'var(--brand-500)'; ev.target.style.boxShadow = '0 0 0 2px var(--brand-100)'; }, onBlur: (ev) => { ev.target.style.borderColor = 'var(--border-default)'; ev.target.style.boxShadow = 'none'; } }),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, 'ring · emerald')),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' } },
          React.createElement('div', { style: { width: 120, height: 44, background: 'var(--brand-500)', opacity: go ? 1 : 0.15, transition: 'opacity 500ms cubic-bezier(0,0,.2,1)' } }),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, 'fade · entrance')))));
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
/* ---- Shared code snippet panel ---- */
function CodeSnippet({ code, push }) {
  const [open, setOpen] = useState(false);
  return React.createElement('div', { style: { marginTop: 16 } },
    React.createElement('button', {
      onClick: () => setOpen(o => !o),
      style: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', background: 'transparent', border: '1px solid var(--border-default)', padding: '7px 14px', cursor: 'pointer' }
    }, React.createElement(Icon, { name: open ? 'chevron-down' : 'chevron-right', size: 12 }), open ? 'Hide code' : 'View code snippet'),
    open && React.createElement('div', { style: { position: 'relative', marginTop: 8, background: '#0a0a0a', border: '1px solid var(--border-default)' } },
      React.createElement('button', {
        onClick: () => copy(code, push),
        style: { position: 'absolute', top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', padding: '5px 10px', cursor: 'pointer' }
      }, React.createElement(Icon, { name: 'copy', size: 11 }), 'Copy'),
      React.createElement('pre', { style: { margin: 0, padding: '20px 20px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, color: 'var(--brand-300)', overflowX: 'auto', whiteSpace: 'pre' } }, code)));
}

function ButtonsSection({ push }) {
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
      React.createElement(IconButton, { icon: 'trash', tone: 'danger', label: 'Delete' }))),
    React.createElement(CodeSnippet, { code: SNIPPETS.buttons, push }));
}
function FormsSection({ push }) {
  const [c, setC] = useState(true), [r, setR] = useState('prod'), [s, setS] = useState(true);
  return React.createElement(Section, { id: 'forms', kicker: 'Components', title: 'Inputs & Selection', intro: 'Form primitives at 44px control height with an emerald focus ring. Everything below is interactive.' },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 } },
      React.createElement(Panel, null,
        React.createElement(Sub, null, 'Text & select'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
          React.createElement(Input, { label: 'System name', defaultValue: 'Design System Studio' }),
          React.createElement(Input, { label: 'Contact email', defaultValue: 'hello@', error: 'Enter a valid email' }),
          React.createElement(Select, { label: 'Export format', options: ['CSS Variables', 'DTCG JSON', 'Tailwind Config', 'TypeScript'] }))),
      React.createElement(Panel, null,
        React.createElement(Sub, null, 'Selection controls'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          React.createElement(Checkbox, { label: 'Enable token sync webhooks', checked: c, onChange: () => setC(!c) }),
          React.createElement(Checkbox, { label: 'Include semantic alias tokens', indeterminate: true }),
          React.createElement('div', { style: { display: 'flex', gap: 20 } },
            React.createElement(Radio, { name: 'g', label: 'Production', checked: r === 'prod', onChange: () => setR('prod') }),
            React.createElement(Radio, { name: 'g', label: 'Staging', checked: r === 'stage', onChange: () => setR('stage') })),
          React.createElement(Switch, { label: 'Dark mode preview', checked: s, onChange: () => setS(!s) })))),
    React.createElement(CodeSnippet, { code: SNIPPETS.forms, push }));
}
function BadgesSection({ push }) {
  const tones = ['brand','neutral','success','warning','error','info'];
  return React.createElement(Section, { id: 'badges', kicker: 'Components', title: 'Badges & Tags', intro: 'Compact status and category labels. Subtle soft-fill by default; solid for emphasis.' },
    React.createElement(Panel, null,
      React.createElement(Sub, null, 'Subtle'), React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } }, tones.map((t) => React.createElement(Badge, { key: t, tone: t }, t))),
      React.createElement(Sub, null, 'Solid · with dot · square'), React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
        tones.map((t) => React.createElement(Badge, { key: t, tone: t, variant: 'solid' }, t)),
        React.createElement(Badge, { tone: 'success', dot: true }, 'Active'), React.createElement(Badge, { tone: 'neutral', shape: 'square' }, 'Draft'))),
    React.createElement(CodeSnippet, { code: SNIPPETS.badges, push }));
}
function CardsSection({ push }) {
  return React.createElement(Section, { id: 'cards', kicker: 'Components', title: 'Cards', intro: 'Flat container surfaces — hairline borders, shadow only when raised. Structure from spacing, not elevation.' },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 } },
      [['default','flat','Default surface'],['subtle','flat','Warm editorial panel'],['default','soft','Soft elevation']].map(([s, e, l], i) =>
        React.createElement(Card, { key: i, surface: s, elevation: e, radius: 'sharp' },
          React.createElement('div', { style: { fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' } }, l),
          React.createElement('p', { style: { fontSize: 13, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 } }, 'Surface ' + s + ' · elevation ' + e)))),
    React.createElement(CodeSnippet, { code: SNIPPETS.cards, push }));
}
function TabsSection({ push }) {
  const [t, setT] = useState('Components');
  return React.createElement(Section, { id: 'tabs', kicker: 'Components', title: 'Tabs', intro: 'Underline navigation with an emerald active indicator. Controlled and interactive.' },
    React.createElement(Panel, null, React.createElement(Tabs, { tabs: ['Overview','Components','Tokens','Settings'], value: t, onChange: setT }),
      React.createElement('div', { style: { padding: '20px 4px 4px', fontSize: 14, color: 'var(--text-secondary)' } }, 'Active tab: ', React.createElement('strong', { style: { color: 'var(--text-primary)' } }, t))),
    React.createElement(CodeSnippet, { code: SNIPPETS.tabs, push }));
}
function FeedbackSection({ push: pushToast }) {
  return React.createElement(Section, { id: 'feedback', kicker: 'Components', title: 'Feedback', intro: 'Tooltips and toasts. Hover the button for a tooltip; click the buttons below to fire live toasts.' },
    React.createElement(Panel, null,
      React.createElement(Sub, null, 'Tooltip (hover)'),
      React.createElement(Tooltip, { label: 'Copies the token value to clipboard' }, React.createElement(Button, { variant: 'outline', size: 'sm', iconLeft: 'link' }, 'Copy Token')),
      React.createElement(Sub, null, 'Toasts — click to fire'),
      React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
        React.createElement(Button, { variant: 'outline', size: 'sm', onClick: () => pushToast({ tone: 'success', title: 'Tokens exported', message: '182 tokens written to design-tokens.css' }) }, 'Fire success'),
        React.createElement(Button, { variant: 'outline', size: 'sm', onClick: () => pushToast({ tone: 'error', title: 'Export failed', message: 'Invalid hex value at --brand-500.' }) }, 'Fire error'),
        React.createElement(Button, { variant: 'outline', size: 'sm', onClick: () => pushToast({ tone: 'brand', title: 'Theme synced', message: 'Dark mode tokens applied to workspace.' }) }, 'Fire brand')),
      React.createElement(Sub, null, 'Static previews'),
      React.createElement('div', { style: { display: 'flex', gap: 14, flexWrap: 'wrap' } },
        React.createElement(Toast, { tone: 'success', title: 'Tokens exported', message: '182 tokens ready for production.' }),
        React.createElement(Toast, { tone: 'error', title: 'Import failed', message: 'Missing required token: --brand-500.' }))),
    React.createElement(CodeSnippet, { code: SNIPPETS.feedback, push: pushToast }));
}
function PresentationSection({ dark = false, push }) {
  return React.createElement(Section, { id: 'presentation', kicker: 'Components', title: 'Presentation primitives', intro: 'The editorial building blocks of the Master Presentation; the deck is its own design system on top of these.' },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 } },
      React.createElement(Panel, null, React.createElement(Sub, null, 'Eyebrow'), React.createElement(Eyebrow, null, 'Executive Summary'), React.createElement('div', { style: { height: 10 } }), React.createElement(Eyebrow, { size: 10 }, 'Part 01')),
      React.createElement(Panel, { style: { position: 'relative' } }, React.createElement(Sub, null, 'HUD bar'), React.createElement('div', { style: { position: 'relative', height: 40 } }, React.createElement(HudBar, { label: 'Strategic Context', num: '05', position: 'static' })))),
    React.createElement(Sub, null, 'Slide frame + metric monument'),
    React.createElement(SlideFrame, { glow: true, dark: dark },
      React.createElement(HudBar, { label: 'Performance Metric', num: '06', dark: dark }),
      React.createElement('div', { style: { padding: '260px 140px 0' } }, React.createElement(Eyebrow, null, 'Data Monument'),
        React.createElement('div', { style: { marginTop: 40 } }, React.createElement(MetricValue, { value: '2.0', unit: 'M', heading: 'Total design tokens powering every component.' })))),
    React.createElement(CodeSnippet, { code: SNIPPETS.presentation, push }),
    React.createElement('div', { style: { marginTop: 96 } },
      React.createElement(Section, { id: 'generator', kicker: 'Patterns', title: 'Master Presentation Generator', intro: 'Generate brand-aligned executive slide decks directly from your active token architecture and component guidelines.' },
        React.createElement(PatternCard, { href: 'generator/', target: '_blank', rel: 'noopener', tag: 'App', title: 'Master Presentation Generator', desc: 'The live, actively-developed generator - opens in a new tab.' }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 } },
          React.createElement(FileDownload, { href: 'templates/master-presentation/MasterPresentation.pptx', label: 'Download .pptx', hint: 'Download the 14-template Master Presentation as an editable, font-embedded PowerPoint file - opens in PowerPoint, Google Slides, and Canva.' }),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' } }, 'Editable starting point - fonts embedded, real text boxes, ready for PowerPoint / Google Slides / Canva')))
    )
  );
}

/* ---- WCAG Contrast Checker Section ---- */
function WCAGSection() {
  const grade = (ratio) => {
    if (ratio >= 7) return { label: 'AAA', color: '#059669' };
    if (ratio >= 4.5) return { label: 'AA', color: '#16a34a' };
    if (ratio >= 3) return { label: 'AA Large', color: '#d97706' };
    return { label: 'Fail', color: '#dc2626' };
  };
  return React.createElement(Section, { id: 'wcag', kicker: 'System', title: 'WCAG Contrast Checker', intro: 'Contrast ratios for every text/surface token pair in the active theme. AA requires ≥4.5:1 (normal text) or ≥3:1 (large text). AAA requires ≥7:1.' },
    React.createElement('div', { style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)' } },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 200px 120px 120px 80px', gap: 12, padding: '10px 16px', background: 'var(--surface-subtle)', borderBottom: '1px solid var(--border-default)', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600 } },
        React.createElement('span', null, 'Pair description'),
        React.createElement('span', null, 'Tokens'),
        React.createElement('span', { style: { textAlign: 'center' } }, 'Ratio'),
        React.createElement('span', { style: { textAlign: 'center' } }, 'Sample'),
        React.createElement('span', { style: { textAlign: 'center' } }, 'Grade')),
      WCAG_PAIRS.map((p, i) => {
        const ratio = contrastRatio(p.fgHex, p.bgHex);
        const g = grade(ratio);
        return React.createElement('div', { key: i, style: { display: 'grid', gridTemplateColumns: '1fr 200px 120px 120px 80px', gap: 12, padding: '12px 16px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', alignItems: 'center' } },
          React.createElement('span', { style: { fontSize: 13, color: 'var(--text-primary)' } }, p.label),
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.6 } },
            React.createElement('div', null, p.fg),
            React.createElement('div', null, 'on ' + p.bg)),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' } }, ratio + ':1'),
          React.createElement('span', { style: { height: 32, background: p.bgHex, border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: p.fgHex } }, 'Aa'),
          React.createElement('span', { style: { textAlign: 'center' } },
            React.createElement('span', { style: { display: 'inline-block', padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--text-on-brand)', background: g.color, letterSpacing: '0.06em' } }, g.label)));
      })),
    React.createElement('div', { style: { marginTop: 20, padding: 16, background: 'var(--surface-default)', border: '1px solid var(--border-default)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8 } },
      React.createElement('span', { style: { fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: 6 } }, 'WCAG 2.1 Reference'),
      'AA Normal text ≥ 4.5:1  ·  AA Large text (18pt+ or 14pt bold) ≥ 3:1  ·  AAA ≥ 7:1  ·  UI Components ≥ 3:1'
    ));
}

/* ---- Changelog Section ---- */
function ChangelogSection() {
  return React.createElement(Section, { id: 'changelog', kicker: 'System', title: 'Changelog', intro: 'A running history of every meaningful change to Design System Studio. Format follows Keep a Changelog.' },
    ...CHANGELOG.map((entry) =>
      React.createElement('div', { key: entry.version, style: { marginBottom: 32, border: '1px solid var(--border-default)', background: 'var(--surface-default)' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-subtle)' } },
          React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' } }, 'v' + entry.version),
          React.createElement(Badge, { tone: entry.tag === 'latest' ? 'success' : 'neutral', variant: entry.tag === 'latest' ? 'solid' : 'subtle' }, entry.tag),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' } }, entry.date)
        ),
        React.createElement('div', { style: { padding: '16px 20px', display: 'flex', gap: 32, flexWrap: 'wrap' } },
          entry.added && React.createElement('div', { style: { flex: '1 1 300px' } },
            React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-brand)', marginBottom: 10 } }, '+ Added'),
            React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 } },
              ...entry.added.map((item, j) =>
                React.createElement('li', { key: j, style: { fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, display: 'flex', gap: 8 } },
                  React.createElement('span', { style: { color: 'var(--text-brand)', flexShrink: 0, fontWeight: 700 } }, '→'),
                  item
                )
              )
            )
          ),
          entry.changed && React.createElement('div', { style: { flex: '1 1 300px' } },
            React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--warning-500)', marginBottom: 10 } }, '~ Changed'),
            React.createElement('ul', { style: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 } },
              ...entry.changed.map((item, j) =>
                React.createElement('li', { key: j, style: { fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, display: 'flex', gap: 8 } },
                  React.createElement('span', { style: { color: 'var(--warning-500)', flexShrink: 0, fontWeight: 700 } }, '→'),
                  item
                )
              )
            )
          )
        )
      )
    )
  );
}

/* ========== TOKEN DEPENDENCY MAP ========== */
function TokenMapSection() {
  const NODE = (label, sub, style) => React.createElement('div', {
    style: { display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 18px', border: '1px solid var(--border-default)', background: 'var(--surface-default)', minWidth: 110, ...style }
  },
    React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' } }, label),
    sub && React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.4 } }, sub)
  );
  const ARROW = () => React.createElement('div', { style: { display: 'flex', alignItems: 'center', color: 'var(--brand-400)', fontSize: 18, fontWeight: 300, padding: '0 4px' } }, '\u2192');
  const layers = [
    { label: 'Primitive', color: 'var(--surface-default)', tokens: [['--brand-500','#10b981'],['--neutral-900','#171717'],['--neutral-0','#ffffff'],['--warning-500','#f59e0b'],['--error-500','#ef4444']] },
    { label: 'Semantic Alias', color: 'var(--surface-subtle)', tokens: [['--text-primary','neutral-900'],['--surface-default','#ffffff'],['--action-primary','neutral-900'],['--focus-ring','brand-500'],['--state-selected','brand-50']] },
    { label: 'Component', color: 'var(--surface-default)', tokens: [['Button.primary','action-primary'],['Input.border','border-default'],['Badge.brand','brand-50/700'],['Card.surface','surface-default'],['Switch.on','brand-500']] },
  ];
  return React.createElement(Section, { id: 'tokenmap', kicker: 'Foundations', title: 'Token Dependency Map', intro: 'Tokens flow in one direction: primitives define raw values \u2192 semantic aliases assign meaning \u2192 components consume meaning, never raw values.' },
    React.createElement('div', { style: { display: 'flex', gap: 0, alignItems: 'stretch', overflowX: 'auto', marginBottom: 24 } },
      layers.map((layer, li) => React.createElement(React.Fragment, { key: layer.label },
        li > 0 && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 8px', gap: 20 } },
          layer.tokens.map((_, i) => React.createElement(ARROW, { key: i }))
        ),
        React.createElement('div', { style: { flex: 1, minWidth: 160 } },
          React.createElement('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', padding: '0 0 8px', borderBottom: '2px solid var(--border-default)', marginBottom: 8 } }, layer.label),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
            layer.tokens.map(([name, val]) => React.createElement('div', { key: name,
              style: { padding: '8px 12px', border: '1px solid var(--border-default)', background: layer.color, display: 'flex', flexDirection: 'column', gap: 2 }
            },
              React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' } }, name),
              React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)' } }, val)
            ))
          )
        )
      ))
    ),
    React.createElement('div', { style: { padding: 16, background: 'var(--surface-default)', border: '1px solid var(--border-default)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.8 } },
      React.createElement('strong', { style: { color: 'var(--text-primary)', display: 'block', marginBottom: 4 } }, 'Rule: Components must never reference primitives directly.'),
      'A Button uses --action-primary, which maps to --neutral-900. To retheme, update the semantic alias. The Button changes automatically.'
    )
  );
}

/* ========== AVATAR ========== */
function AvatarSection({ push }) {
  const SIZES = [{ s: 24, label: 'xs' }, { s: 32, label: 'sm' }, { s: 40, label: 'md' }, { s: 56, label: 'lg' }, { s: 72, label: 'xl' }];
  const Avatar = ({ size = 40, src, initials = 'DS', status }) => React.createElement('div', { style: { position: 'relative', display: 'inline-block' } },
    React.createElement('div', { style: { width: size, height: size, borderRadius: '50%', background: src ? 'transparent' : 'var(--brand-100)', border: '2px solid var(--brand-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 } },
      src
        ? React.createElement('img', { src, style: { width: '100%', height: '100%', objectFit: 'cover' } })
        : React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: Math.max(9, size * 0.3), fontWeight: 700, color: 'var(--brand-700)', letterSpacing: '-0.02em' } }, initials)
    ),
    status && React.createElement('span', { style: { position: 'absolute', bottom: 1, right: 1, width: Math.max(8, size * 0.22), height: Math.max(8, size * 0.22), borderRadius: '50%', background: status === 'online' ? 'var(--success-500)' : status === 'away' ? 'var(--warning-500)' : 'var(--neutral-400)', border: '2px solid var(--surface-default)' } })
  );
  const AvatarGroup = ({ count = 4 }) => React.createElement('div', { style: { display: 'flex' } },
    Array.from({ length: count }, (_, i) => React.createElement('div', { key: i, style: { marginLeft: i ? -12 : 0, zIndex: count - i } },
      React.createElement(Avatar, { size: 36, initials: ['AB', 'CD', 'EF', 'GH'][i] || '++' })
    )),
    React.createElement('div', { style: { marginLeft: -12, width: 36, height: 36, borderRadius: '50%', background: 'var(--neutral-100)', border: '2px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' } }, '+5')
  );
  return React.createElement(Section, { id: 'avatar', kicker: 'New Components', title: 'Avatar', intro: 'User identity primitives. Initials fallback with brand palette, status dot, stacked group.' },
    React.createElement(Sub, null, 'Sizes'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' } },
        SIZES.map(({ s, label }) => React.createElement('div', { key: label, style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 } },
          React.createElement(Avatar, { size: s }),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)' } }, label + ' \u00b7 ' + s + 'px')
        ))
      )
    ),
    React.createElement(Sub, null, 'Status dots \u00b7 group'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' } },
        React.createElement(Avatar, { size: 48, initials: 'JD', status: 'online' }),
        React.createElement(Avatar, { size: 48, initials: 'MK', status: 'away' }),
        React.createElement(Avatar, { size: 48, initials: 'SR', status: 'offline' }),
        React.createElement('div', { style: { width: 1, height: 40, background: 'var(--border-default)' } }),
        React.createElement(AvatarGroup, { count: 4 })
      )
    )
  );
}

/* ========== PROGRESS + SKELETON ========== */
function ProgressSection() {
  const [progress, setProgress] = useState(65);
  const Skeleton = ({ w = '100%', h = 16, style = {} }) => React.createElement('div', { style: { width: w, height: h, background: 'linear-gradient(90deg, var(--surface-subtle) 25%, var(--border-strong) 50%, var(--surface-subtle) 75%)', backgroundSize: '200% 100%', animation: 'ds-shimmer 1.5s infinite', ...style } });
  return React.createElement(Section, { id: 'progress', kicker: 'New Components', title: 'Progress & Skeleton', intro: 'Linear progress bars and skeleton shimmer loaders for async states.' },
    React.createElement('style', null, '@keyframes ds-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }'),
    React.createElement(Sub, null, 'Progress bar \u2014 interactive'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
          React.createElement('input', { type: 'range', min: 0, max: 100, value: progress, onChange: e => setProgress(+e.target.value), style: { flex: 1 } }),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', minWidth: 40 } }, progress + '%')
        ),
        React.createElement('div', { style: { height: 8, background: 'var(--neutral-100)', border: '1px solid var(--border-default)' } },
          React.createElement('div', { style: { height: '100%', width: progress + '%', background: 'var(--brand-500)', transition: 'width 200ms ease' } })
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12, flexWrap: 'wrap' } },
          [['brand', 'var(--brand-500)', 72], ['success', 'var(--success-500)', 100], ['warning', 'var(--warning-500)', 45], ['error', 'var(--error-500)', 28]].map(([tone, color, val]) =>
            React.createElement('div', { key: tone, style: { flex: '1 1 160px' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4 } },
                React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' } }, tone),
                React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-primary)' } }, val + '%')
              ),
              React.createElement('div', { style: { height: 6, background: 'var(--neutral-100)' } },
                React.createElement('div', { style: { height: '100%', width: val + '%', background: color } })
              )
            )
          )
        )
      )
    ),
    React.createElement(Sub, null, 'Skeleton loaders \u2014 shimmer animation'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } },
          React.createElement(Skeleton, { w: 48, h: 48, style: { borderRadius: '50%', flexShrink: 0 } }),
          React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 8 } },
            React.createElement(Skeleton, { h: 14 }),
            React.createElement(Skeleton, { w: '60%', h: 12 })
          )
        ),
        React.createElement(Skeleton, { h: 120 }),
        React.createElement('div', { style: { display: 'flex', gap: 8 } },
          React.createElement(Skeleton, { h: 32 }),
          React.createElement(Skeleton, { w: 80, h: 32 })
        )
      )
    )
  );
}

/* ========== MODAL / DIALOG ========== */
function ModalSection() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return React.createElement(Section, { id: 'modal', kicker: 'New Components', title: 'Modal / Dialog', intro: 'Focused overlay for confirmations, forms, and detail views. Click outside or Esc to dismiss.' },
    open && React.createElement('div', {
      onClick: e => { if (e.target === e.currentTarget) setOpen(false); },
      style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }
    },
      React.createElement('div', { style: { width: 480, background: 'var(--surface-default)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column' } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' } },
          React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' } }, 'Export Design Tokens'),
          React.createElement('button', { onClick: () => setOpen(false), style: { background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' } },
            React.createElement(Icon, { name: 'x', size: 18 })
          )
        ),
        React.createElement('div', { style: { padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 } },
          React.createElement('p', { style: { fontSize: 14, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 } }, 'Select the export format below. All 182 active tokens will be included in the output file.'),
          React.createElement(Input, { label: 'File name', defaultValue: 'design-system-studio-tokens' }),
          React.createElement(Select, { label: 'Format', options: ['CSS Custom Properties', 'W3C DTCG JSON', 'Tailwind Config', 'TypeScript'] })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 24px', borderTop: '1px solid var(--border-subtle)' } },
          React.createElement(Button, { variant: 'outline', onClick: () => setOpen(false) }, 'Cancel'),
          React.createElement(Button, { variant: 'brand', iconLeft: 'download', onClick: () => setOpen(false) }, 'Export')
        )
      )
    ),
    confirm && React.createElement('div', {
      onClick: e => { if (e.target === e.currentTarget) setConfirm(false); },
      style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }
    },
      React.createElement('div', { style: { width: 380, background: 'var(--surface-default)', border: '1px solid var(--border-strong)', display: 'flex', flexDirection: 'column' } },
        React.createElement('div', { style: { padding: '24px 24px 16px' } },
          React.createElement(Icon, { name: 'alert-triangle', size: 28, style: { color: 'var(--error-500)', marginBottom: 12 } }),
          React.createElement('h3', { style: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' } }, 'Delete token set?'),
          React.createElement('p', { style: { fontSize: 14, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 } }, 'This will permanently remove all 12 tokens in the "brand" set. This action cannot be undone.')
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '12px 24px 20px' } },
          React.createElement(Button, { variant: 'outline', onClick: () => setConfirm(false) }, 'Keep tokens'),
          React.createElement(Button, { variant: 'danger', onClick: () => setConfirm(false) }, 'Delete set')
        )
      )
    ),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', gap: 12, flexWrap: 'wrap' } },
        React.createElement(Button, { variant: 'primary', iconLeft: 'download', onClick: () => setOpen(true) }, 'Open Form Modal'),
        React.createElement(Button, { variant: 'danger', iconLeft: 'trash', onClick: () => setConfirm(true) }, 'Open Confirm Dialog')
      ),
      React.createElement('p', { style: { fontSize: 13, color: 'var(--text-muted)', marginTop: 12, marginBottom: 0 } }, 'Click outside the modal or \u2018Cancel\u2019 / \u2018X\u2019 to dismiss. Backdrop click-outside is implemented.')
    )
  );
}

/* ========== ACCORDION ========== */
function AccordionSection() {
  const ITEMS = [
    { id: 'a1', q: 'What is a design token?', a: 'A design token is a named, platform-agnostic variable that stores a single design decision \u2014 a color, spacing value, font size, or duration. Tokens are the source of truth that feeds every platform (web, iOS, Android) from one definition.' },
    { id: 'a2', q: 'Why does this system use sharp corners everywhere?', a: 'The 0px border radius is an intentional editorial choice. Sharp corners signal precision, data-density, and a professional instrument feel \u2014 contrasting with the warm emerald brand color. The only exception is truly circular elements (avatars, dots, switches).' },
    { id: 'a3', q: 'How do semantic aliases work?', a: 'Semantic tokens reference primitive tokens by meaning, not value. --text-primary resolves to --neutral-900, so if you update the neutral scale, text colors update everywhere. Components reference semantics; themes swap the underlying primitives.' },
    { id: 'a4', q: 'Can I use this with any framework?', a: 'Yes. The token output is CSS Custom Properties, W3C DTCG JSON, Tailwind config, or TypeScript constants. The component library is written in React for the documentation app, but the tokens are framework-agnostic.' },
  ];
  const [open, setOpen] = useState(null);
  return React.createElement(Section, { id: 'accordion', kicker: 'New Components', title: 'Accordion', intro: 'Expandable Q&A or detail panels. One open item at a time. Smooth height animation.' },
    React.createElement('div', { style: { border: '1px solid var(--border-default)', background: 'var(--surface-default)' } },
      ITEMS.map((item, i) => React.createElement('div', { key: item.id, style: { borderTop: i ? '1px solid var(--border-subtle)' : 'none' } },
        React.createElement('button', {
          onClick: () => setOpen(open === item.id ? null : item.id),
          style: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }
        },
          React.createElement('span', { style: { fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' } }, item.q),
          React.createElement(Icon, { name: open === item.id ? 'chevron-down' : 'chevron-right', size: 14, style: { color: 'var(--text-muted)', flexShrink: 0 } })
        ),
        open === item.id && React.createElement('div', { style: { padding: '0 20px 18px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 } }, item.a)
      ))
    )
  );
}

/* ========== TABLE ========== */
function TableSection() {
  const columns = ['Token', 'Value', 'Type', 'Scope', 'Usage'];
  const rows = [
    { token: '--brand-500', value: '#10b981', type: 'color', scope: 'Brand', usage: 'Focus ring, icons, active states' },
    { token: '--text-primary', value: '--neutral-900', type: 'alias', scope: 'Text', usage: 'Headings, body, all primary content' },
    { token: '--surface-default', value: '#ffffff', type: 'color', scope: 'Surface', usage: 'Cards, panels, page surfaces' },
    { token: '--space-4', value: '16px', type: 'dimension', scope: 'Spacing', usage: 'Base padding unit' },
    { token: '--font-display', value: 'Space Grotesk', type: 'fontFamily', scope: 'Typography', usage: 'Headings, display, slide covers' },
    { token: '--radius-sharp', value: '0px', type: 'dimension', scope: 'Radius', usage: 'All containers — the editorial default' },
  ];
  return React.createElement(Section, { id: 'table', kicker: 'New Components', title: 'Table', intro: 'A dense data table primitive for token inventories, analytics, and documentation grids.' },
    React.createElement('div', { style: { overflowX: 'auto' } },
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-default)' } },
        React.createElement('thead', null,
          React.createElement('tr', { style: { background: 'var(--surface-subtle)', borderBottom: '2px solid var(--border-default)' } },
            ...columns.map((c) => React.createElement('th', { key: c, style: { padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700 } }, c))
          )
        ),
        React.createElement('tbody', null,
          rows.map((r, i) => React.createElement('tr', { key: r.token, style: { borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-default)' } },
            React.createElement('td', { style: { padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' } }, r.token),
            React.createElement('td', { style: { padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' } }, r.value),
            React.createElement('td', { style: { padding: '12px 16px' } }, React.createElement(Badge, { tone: 'neutral' }, r.type)),
            React.createElement('td', { style: { padding: '12px 16px' } }, React.createElement(Badge, { tone: r.scope === 'Brand' ? 'brand' : r.scope === 'Surface' ? 'info' : r.scope === 'Spacing' ? 'success' : r.scope === 'Typography' ? 'warning' : 'error' }, r.scope)),
            React.createElement('td', { style: { padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)' } }, r.usage)
          ))
        )
      )
    )
  );
}

/* ========== BREADCRUMB + DIVIDER ========== */
function MiscSection() {
  const Breadcrumb = ({ items }) => React.createElement('nav', { 'aria-label': 'breadcrumb' },
    React.createElement('ol', { style: { display: 'flex', alignItems: 'center', gap: 6, padding: 0, margin: 0, listStyle: 'none' } },
      items.map((item, i) => React.createElement('li', { key: i, style: { display: 'flex', alignItems: 'center', gap: 6 } },
        i > 0 && React.createElement(Icon, { name: 'chevron-right', size: 12, style: { color: 'var(--text-faint)' } }),
        React.createElement('span', {
          style: { fontFamily: 'var(--font-sans)', fontSize: 13, color: i === items.length - 1 ? 'var(--text-primary)' : 'var(--text-brand)', fontWeight: i === items.length - 1 ? 600 : 400, cursor: i < items.length - 1 ? 'pointer' : 'default', textDecoration: i < items.length - 1 ? 'underline' : 'none', textUnderlineOffset: 2 }
        }, item)
      ))
    )
  );
  return React.createElement(Section, { id: 'misc', kicker: 'New Components', title: 'Breadcrumb & Divider', intro: 'Navigation breadcrumbs for hierarchy, horizontal/vertical dividers for layout separation.' },
    React.createElement(Sub, null, 'Breadcrumbs'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        React.createElement(Breadcrumb, { items: ['Studio'] }),
        React.createElement(Breadcrumb, { items: ['Studio', 'Foundations'] }),
        React.createElement(Breadcrumb, { items: ['Studio', 'Foundations', 'Color', 'Brand Scale'] })
      )
    ),
    React.createElement(Sub, null, 'Dividers \u2014 horizontal \u00b7 vertical \u00b7 labeled'),
    React.createElement(Panel, null,
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
        React.createElement('div', { style: { height: 1, background: 'var(--border-default)' } }),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { flex: 1, height: 1, background: 'var(--border-default)' } }),
          React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-faint)', whiteSpace: 'nowrap' } }, 'Section break'),
          React.createElement('div', { style: { flex: 1, height: 1, background: 'var(--border-default)' } })
        ),
        React.createElement('div', { style: { display: 'flex', gap: 24, alignItems: 'center' } },
          React.createElement('span', { style: { fontSize: 13, color: 'var(--text-secondary)' } }, 'Content left'),
          React.createElement('div', { style: { width: 1, height: 28, background: 'var(--border-default)' } }),
          React.createElement('span', { style: { fontSize: 13, color: 'var(--text-secondary)' } }, 'Content right'),
          React.createElement('div', { style: { width: 1, height: 28, background: 'var(--border-strong)' } }),
          React.createElement('span', { style: { fontSize: 13, color: 'var(--text-secondary)' } }, 'Strong divider')
        )
      )
    )
  );
}

/* ========== COMPONENT STATE MATRIX ========== */
function StateMatrixSection() {
  const states = ['Default', 'Hover', 'Focus', 'Active', 'Disabled', 'Loading'];
  const components = [
    { name: 'Button', render: function(state) {
        if (state === 'Disabled') return React.createElement(Button, { variant: 'primary', disabled: true }, 'Disabled');
        if (state === 'Loading') return React.createElement('button', {
          style: { display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 20px', background: 'var(--action-primary)', color: 'var(--text-inverse)', border: 'none', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'default' }
        },
          React.createElement('span', { style: { width: 12, height: 12, border: '2px solid rgba(128,128,128,0.4)', borderTopColor: 'var(--text-inverse)', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' } }),
          'Loading'
        );
        const styleMap = {
          Default: { background: 'var(--action-primary)', color: 'var(--text-inverse)' },
          Hover:   { background: 'var(--action-primary-hover)', color: 'var(--text-inverse)' },
          Focus:   { background: 'var(--action-primary)', color: 'var(--text-inverse)', boxShadow: '0 0 0 3px var(--brand-300)', outline: 'none' },
          Active:  { background: 'var(--action-primary-active)', color: 'var(--text-inverse)', transform: 'scale(0.98)' },
        };
        return React.createElement('button', {
          style: { display: 'inline-flex', alignItems: 'center', height: 44, padding: '0 20px', border: '1px solid var(--border-strong)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'default', transition: 'none', ...styleMap[state] }
        }, state);
    }},
    { name: 'Input', render: function(state) {
        var styleMap = {
          Default:  { border: '1px solid var(--border-default)' },
          Hover:    { border: '1px solid var(--border-strong)' },
          Focus:    { border: '1px solid var(--brand-500)', boxShadow: '0 0 0 2px var(--brand-100)' },
          Active:   { border: '1px solid var(--brand-500)' },
          Disabled: { border: '1px solid var(--border-default)', opacity: 0.4 },
          Loading:  { border: '1px solid var(--border-default)', opacity: 0.7 },
        };
        return React.createElement('input', {
          value: state, readOnly: true, disabled: state === 'Disabled',
          style: { height: 40, padding: '0 12px', fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none', color: 'var(--text-primary)', background: 'var(--surface-default)', ...styleMap[state] }
        });
    }},
    { name: 'Badge', render: function(state) {
        var opMap = { Default: 1, Hover: 0.85, Focus: 1, Active: 0.9, Disabled: 0.35, Loading: 0.6 };
        return React.createElement(Badge, { tone: 'brand', style: { opacity: opMap[state] } }, state);
    }},
    { name: 'Switch', render: function(state) {
        var on = ['Focus','Active','Loading'].includes(state);
        return React.createElement(Switch, { checked: on, onChange: function() {}, disabled: state === 'Disabled' });
    }},
  ];
  return React.createElement(Section, { id: 'statematrix', kicker: 'System', title: 'Component State Matrix', intro: 'Every interactive component across all six states. The definitive reference for interaction design consistency.' },
    React.createElement('style', null, '@keyframes spin { to { transform: rotate(360deg); } }'),
    React.createElement('div', { style: { overflowX: 'auto' } },
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-default)' } },
        React.createElement('thead', null,
          React.createElement('tr', { style: { background: 'var(--surface-subtle)', borderBottom: '2px solid var(--border-default)' } },
            React.createElement('th', { style: { padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700, width: 110, background: 'var(--surface-subtle)' } }, 'Component'),
            ...states.map(function(s) {
              return React.createElement('th', { key: s, style: { padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700, borderLeft: '1px solid var(--border-subtle)', background: 'var(--surface-subtle)' } }, s);
            })
          )
        ),
        React.createElement('tbody', null,
          ...components.map(function(comp) {
            return React.createElement('tr', { key: comp.name, style: { borderTop: '1px solid var(--border-subtle)' } },
              React.createElement('td', { style: { padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', borderRight: '1px solid var(--border-subtle)', background: 'var(--surface-subtle)', whiteSpace: 'nowrap' } }, comp.name),
              ...states.map(function(state) {
                return React.createElement('td', { key: state, style: { padding: '14px 16px', verticalAlign: 'middle', borderLeft: '1px solid var(--border-subtle)', background: 'var(--surface-default)' } },
                  comp.render(state)
                );
              })
            );
          })
        )
      )
    )
  );
}

/* ========== THEME SWITCHER (self-contained, with state notification) ========== */
function ThemeSwitcher({ currentTheme, onThemeChange }) {
  var stored = currentTheme || (window.DesignSystemStudioTheme ? window.DesignSystemStudioTheme.get() : (localStorage.getItem('ds-theme') || 'light'));
  var [activeTheme, setActiveTheme] = useState(stored);

  useEffect(() => {
    if (currentTheme && currentTheme !== activeTheme) {
      setActiveTheme(currentTheme);
    }
  }, [currentTheme]);

  function applyTheme(key) {
    if (window.DesignSystemStudioTheme) {
      window.DesignSystemStudioTheme.set(key);
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (key !== 'light') document.documentElement.setAttribute('data-theme', key);
    }
    if (key === 'dark' || key === 'hc') {
      document.documentElement.style.removeProperty('--action-primary');
      document.documentElement.style.removeProperty('--action-primary-hover');
      document.documentElement.style.removeProperty('--action-primary-active');
      document.documentElement.style.removeProperty('--neutral-900');
      document.documentElement.style.removeProperty('--surface-canvas');
    }
    localStorage.setItem('ds-theme', key);
    localStorage.setItem('design-system-studio-theme', key);
    setActiveTheme(key);
    if (onThemeChange) onThemeChange(key);
  }

  var tabs = [['Light','light'], ['Dark','dark'], ['HC','hc']];
  return React.createElement('div', { style: { display: 'flex', gap: 4, marginBottom: 4 } },
    tabs.map(function(entry) {
      var label = entry[0], key = entry[1];
      var isActive = activeTheme === key;
      return React.createElement('button', {
        key: key,
        onClick: function() { applyTheme(key); },
        style: {
          flex: 1, padding: '7px 4px',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          border: isActive ? '2px solid var(--brand-500)' : '1px solid var(--border-default)',
          cursor: 'pointer',
          background: isActive ? 'var(--brand-500)' : 'var(--surface-canvas)',
          color: isActive ? 'var(--text-on-brand)' : 'var(--text-secondary)',
          fontWeight: isActive ? 700 : 400,
          transition: 'background 150ms, color 150ms, border 150ms',
        }
      }, label);
    })
  );
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

/* ---- Export: CSS Custom Properties ---- */
function cssExport() {
  const activeBrand = localStorage.getItem('ds-active-brand') || '#10b981';
  const activeAccent = localStorage.getItem('ds-active-accent') || '#22c55e';
  const brandScaleObj = generateScale(activeBrand, 'brand');
  const accentScaleObj = generateScale(activeAccent, 'accent');

  const lines = [
    '/* Design System Studio — CSS Custom Properties */\n/* Generated: ' + new Date().toISOString().slice(0,10) + ' */\n',
    ':root {',
    '  /* Primary Brand Scale */',
  ];
  Object.entries(brandScaleObj).forEach(([k,v]) => lines.push(`  ${k}: ${v};`));
  lines.push('  /* Secondary Accent Scale */');
  Object.entries(accentScaleObj).forEach(([k,v]) => lines.push(`  ${k}: ${v};`));
  lines.push('  /* Neutral */');
  Object.entries(HEX.neutral).forEach(([k,v]) => lines.push(`  --neutral-${k}: ${v};`));
  lines.push('  /* Semantic */');
  ['success','warning','error','info'].forEach(g => {
    Object.entries(HEX[g]).forEach(([k,v]) => lines.push(`  --${g}-${k}: ${v};`));
  });
  lines.push('  /* Semantic Aliases */');
  ALIASES.forEach(([token,,]) => lines.push(`  ${token}: var(${token.replace('--','--')});`));
  lines.push('  /* Spacing */');
  SPACING.forEach(([k,px]) => lines.push(`  --space-${k}: ${px};`));
  lines.push('  /* Typography */');
  lines.push('  --font-display: "Space Grotesk", sans-serif;');
  lines.push('  --font-sans: "Satoshi", sans-serif;');
  lines.push('  --font-mono: "JetBrains Mono", monospace;');
  lines.push('}');
  const blob = new Blob([lines.join('\n')], { type: 'text/css' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = 'design-system-studio-tokens.css'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

/* ---- Export: W3C DTCG JSON ---- */
function dtcgExport() {
  const activeBrand = localStorage.getItem('ds-active-brand') || '#10b981';
  const activeAccent = localStorage.getItem('ds-active-accent') || '#22c55e';
  const brandScaleObj = generateScale(activeBrand, 'brand');
  const accentScaleObj = generateScale(activeAccent, 'accent');

  const brand = Object.fromEntries(Object.keys(brandScaleObj).map(k => [k.replace('--brand-', ''), brandScaleObj[k]]));
  const accent = Object.fromEntries(Object.keys(accentScaleObj).map(k => [k.replace('--accent-', ''), accentScaleObj[k]]));

  const col = (hex) => ({ $type: 'color', $value: hex.toUpperCase() });
  const dim = (v) => ({ $type: 'dimension', $value: v });
  const font = (v) => ({ $type: 'fontFamily', $value: v });
  const tokens = {
    brand: Object.fromEntries(Object.entries(brand).map(([k,v]) => [k, col(v)])),
    accent: Object.fromEntries(Object.entries(accent).map(([k,v]) => [k, col(v)])),
    neutral: Object.fromEntries(Object.entries(HEX.neutral).map(([k,v]) => [k, col(v)])),
    success: Object.fromEntries(Object.entries(HEX.success).map(([k,v]) => [k, col(v)])),
    warning: Object.fromEntries(Object.entries(HEX.warning).map(([k,v]) => [k, col(v)])),
    error: Object.fromEntries(Object.entries(HEX.error).map(([k,v]) => [k, col(v)])),
    info: Object.fromEntries(Object.entries(HEX.info).map(([k,v]) => [k, col(v)])),
    spacing: Object.fromEntries(SPACING.map(([k,px]) => [k, dim(px)])),
    typography: {
      fontFamily: {
        display: font('Space Grotesk, sans-serif'),
        sans: font('Satoshi, sans-serif'),
        mono: font('JetBrains Mono, monospace'),
      }
    },
    $metadata: { generator: 'Design System Studio', version: '1.1.0', date: new Date().toISOString().slice(0,10) }
  };
  const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = 'design-system-studio-dtcg.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

/* ---- Export: Tailwind Config ---- */
function tailwindExport() {
  const activeBrand = localStorage.getItem('ds-active-brand') || '#10b981';
  const activeAccent = localStorage.getItem('ds-active-accent') || '#22c55e';
  const brandScaleObj = generateScale(activeBrand, 'brand');
  const accentScaleObj = generateScale(activeAccent, 'accent');

  const brand = Object.fromEntries(Object.keys(brandScaleObj).map(k => [k.replace('--brand-', ''), brandScaleObj[k]]));
  const accent = Object.fromEntries(Object.keys(accentScaleObj).map(k => [k.replace('--accent-', ''), accentScaleObj[k]]));

  const tw = {
    theme: {
      extend: {
        colors: {
          brand: Object.fromEntries(Object.entries(brand).map(([k,v]) => [k,v])),
          accent: Object.fromEntries(Object.entries(accent).map(([k,v]) => [k,v])),
          neutral: Object.fromEntries(Object.entries(HEX.neutral).map(([k,v]) => [k,v])),
          success: Object.fromEntries(Object.entries(HEX.success).map(([k,v]) => [k,v])),
          warning: Object.fromEntries(Object.entries(HEX.warning).map(([k,v]) => [k,v])),
          error: Object.fromEntries(Object.entries(HEX.error).map(([k,v]) => [k,v])),
          info: Object.fromEntries(Object.entries(HEX.info).map(([k,v]) => [k,v])),
        },
        spacing: Object.fromEntries(SPACING.map(([k,px]) => [k,px])),
        fontFamily: {
          display: ['Space Grotesk', 'sans-serif'],
          sans: ['Satoshi', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        borderRadius: { sharp: '0px', full: '9999px' },
      }
    }
  };
  const content = `// Design System Studio — Tailwind Config Extension\n// Generated: ${new Date().toISOString().slice(0,10)}\n\nmodule.exports = ${JSON.stringify(tw, null, 2)};`;
  const blob = new Blob([content], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = 'tailwind.config.dss.js'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

/* ---- Export: TypeScript constants ---- */
function tsExport() {
  const activeBrand = localStorage.getItem('ds-active-brand') || '#10b981';
  const activeAccent = localStorage.getItem('ds-active-accent') || '#22c55e';
  const brandScaleObj = generateScale(activeBrand, 'brand');
  const accentScaleObj = generateScale(activeAccent, 'accent');

  const brand = Object.fromEntries(Object.keys(brandScaleObj).map(k => [k.replace('--brand-', ''), brandScaleObj[k]]));
  const accent = Object.fromEntries(Object.keys(accentScaleObj).map(k => [k.replace('--accent-', ''), accentScaleObj[k]]));

  const lines = [
    '// Design System Studio — TypeScript Token Constants',
    `// Generated: ${new Date().toISOString().slice(0,10)}`,
    '',
    'export const tokens = {',
    '  brand: {',
    ...Object.entries(brand).map(([k,v]) => `    '${k}': '${v}',`),
    '  },',
    '  accent: {',
    ...Object.entries(accent).map(([k,v]) => `    '${k}': '${v}',`),
    '  },',
    '  neutral: {',
    ...Object.entries(HEX.neutral).map(([k,v]) => `    '${k}': '${v}',`),
    '  },',
    '  spacing: {',
    ...SPACING.map(([k,px]) => `    '${k}': '${px}',`),
    '  },',
    '  fontFamily: {',
    `    display: 'Space Grotesk, sans-serif',`,
    `    sans: 'Satoshi, sans-serif',`,
    `    mono: 'JetBrains Mono, monospace',`,
    '  },',
    '} as const;',
    '',
    'export type TokenKey = keyof typeof tokens;',
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = 'design-system-studio-tokens.ts'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

/* ---- Export: Web Components (.js) ---- */
function webComponentsExport() {
  const code = `/**
 * Design System Studio — Native Web Components Bundle
 * Framework-agnostic CustomElements (HTML5 / Vue / Angular / Svelte / Vanilla)
 * Generated: ${new Date().toISOString().slice(0,10)}
 */

(function() {
  if (typeof window === 'undefined' || !window.customElements) return;

  // Custom Element: <ds-button>
  class DSButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
      const variant = this.getAttribute('variant') || 'primary';
      const size = this.getAttribute('size') || 'md';
      const radius = this.getAttribute('radius') || 'sharp';
      
      const heights = { sm: '34px', md: '44px', lg: '52px' };
      const paddings = { sm: '0 14px', md: '0 16px', lg: '0 22px' };
      const fontSizes = { sm: '12px', md: '14px', lg: '15px' };

      this.shadowRoot.innerHTML = \`
        <style>
          :host { display: inline-block; }
          button {
            display: inline-flex; align-items: center; justify-content: center; gap: 8px;
            height: \${heights[size] || '44px'}; padding: \${paddings[size] || '0 16px'};
            font-family: var(--font-sans, system-ui, sans-serif); font-size: \${fontSizes[size] || '14px'};
            font-weight: 700; border-radius: var(--radius-\${radius}, 0px); cursor: pointer;
            border: \${variant === 'outline' ? '1px solid var(--border-strong, #3a3a3a)' : 'none'};
            background: \${variant === 'brand' ? 'var(--action-brand, #10b981)' : variant === 'outline' ? 'transparent' : 'var(--action-primary, #171717)'};
            color: \${variant === 'brand' ? 'var(--text-on-brand, #fff)' : variant === 'outline' ? 'var(--text-primary, #fff)' : 'var(--text-inverse, #fff)'};
            transition: all 150ms ease;
          }
          button:hover { opacity: 0.9; transform: translateY(-1px); }
        </style>
        <button><slot></slot></button>
      \`;
    }
  }

  // Custom Element: <ds-badge>
  class DSBadge extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
      const tone = this.getAttribute('tone') || 'brand';
      this.shadowRoot.innerHTML = \`
        <style>
          :host { display: inline-block; }
          span {
            display: inline-flex; align-items: center; padding: 3px 9px;
            font-family: var(--font-mono, monospace); font-size: 11px; font-weight: 600;
            border-radius: 9999px; background: var(--\${tone}-50, #ecfdf5); color: var(--\${tone}-700, #047857);
          }
        </style>
        <span><slot></slot></span>
      \`;
    }
  }

  // Custom Element: <ds-card>
  class DSCard extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
      this.shadowRoot.innerHTML = \`
        <style>
          :host { display: block; }
          div {
            padding: 24px; border: 1px solid var(--border-default, #e5e5e5);
            background: var(--surface-default, #ffffff); border-radius: var(--radius-sharp, 0px);
          }
        </style>
        <div><slot></slot></div>
      \`;
    }
  }

  // Register Custom Elements
  if (!customElements.get('ds-button')) customElements.define('ds-button', DSButton);
  if (!customElements.get('ds-badge')) customElements.define('ds-badge', DSBadge);
  if (!customElements.get('ds-card')) customElements.define('ds-card', DSCard);
})();`;

  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = url; a.download = 'design-system-components.js'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

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

  const activeBrand = localStorage.getItem('ds-active-brand') || '#10b981';
  const activeAccent = localStorage.getItem('ds-active-accent') || '#22c55e';

  const brandScaleObj = generateScale(activeBrand, 'brand');
  const brand = Object.fromEntries(Object.keys(brandScaleObj).map(k => [k.replace('--brand-', ''), brandScaleObj[k]]));

  const accentScaleObj = generateScale(activeAccent, 'accent');
  const accent = Object.fromEntries(Object.keys(accentScaleObj).map(k => [k.replace('--accent-', ''), accentScaleObj[k]]));

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
  const currentMode = (getThemeHelper() && getThemeHelper().get()) || 'light';
  const theme = currentMode || activeTheme.mode || 'light';

  // Sync workspace state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('design-system-studio-workspace', JSON.stringify(workspace));
    } catch (e) {}
  }, [workspace]);

  // Keep theme manager sync with activeTheme.mode
  const toggleTheme = () => {
    const nextMode = theme === 'dark' ? 'light' : 'dark';
    const helper = getThemeHelper();
    const updatedMode = helper ? helper.set(nextMode) : nextMode;

    setWorkspace((prev) => ({
      ...prev,
      themes: prev.themes.map((t) =>
        t.id === prev.activeThemeId ? { ...t, mode: updatedMode } : t
      )
    }));
  };

  useEffect(() => {
    const ids = NAV.filter((n) => n[1]).map((n) => n[1]);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { root: mainRef.current, rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const goto = (id) => { const el = document.getElementById(id); const c = mainRef.current; if (el && c) c.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' }); };

  const [search, setSearch] = useState('');
  const [exportOpen, setExportOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('ds-wizard-completed')) {
      setWizardOpen(true);
    }
  }, []);
  const filteredNav = search.trim() === ''
    ? NAV
    : NAV.filter(n => n[1] === null ? NAV.filter(m => m[1] && m[0].toLowerCase().includes(search.toLowerCase())).length > 0 : n[0].toLowerCase().includes(search.toLowerCase()));
  // For search: show section headers only if they have visible children
  const visibleNav = search.trim() === '' ? NAV : (() => {
    const q = search.toLowerCase();
    const result = [];
    for (let i = 0; i < NAV.length; i++) {
      if (NAV[i][1] === null) {
        // include section header if any of the next items match
        const children = [];
        let j = i + 1;
        while (j < NAV.length && NAV[j][1] !== null) { if (NAV[j][0].toLowerCase().includes(q)) children.push(NAV[j]); j++; }
        if (children.length) { result.push(NAV[i]); result.push(...children); }
      }
    }
    return result;
  })();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleThemeChange = (newMode) => {
    const helper = getThemeHelper();
    if (helper) helper.set(newMode);
    setWorkspace((prev) => {
      const activeId = prev.activeThemeId || DEFAULT_THEME_ID;
      return {
        ...prev,
        themes: (prev.themes || []).map((t) =>
          t.id === activeId ? { ...t, mode: newMode } : t
        )
      };
    });
  };

  return React.createElement('div', { className: 'app-container', style: { display: 'flex', height: '100vh', background: 'transparent' } },
    /* Mobile top header bar */
    React.createElement('div', {
      className: 'mobile-header',
      style: { display: 'none', height: 56, background: 'var(--surface-default)', borderBottom: '1px solid var(--border-default)', padding: '0 16px', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1000 }
    },
      React.createElement(BrandLogo, { dark: theme === 'dark' }),
      React.createElement('button', {
        onClick: () => setMobileMenuOpen(!mobileMenuOpen),
        style: { background: 'transparent', border: '1px solid var(--border-default)', padding: '6px 10px', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11 }
      }, React.createElement(Icon, { name: mobileMenuOpen ? 'x' : 'menu', size: 16 }), mobileMenuOpen ? 'CLOSE' : 'MENU')
    ),
    /* sidebar drawer */
    React.createElement('aside', {
      className: `sidebar-drawer ${mobileMenuOpen ? 'open' : ''}`,
      style: { width: 272, flexShrink: 0, borderRight: '1px solid var(--border-default)', background: 'var(--surface-default)', display: 'flex', flexDirection: 'column', height: '100%' }
    },
      React.createElement('div', { style: { padding: '24px 24px 16px', borderBottom: '1px solid var(--border-subtle)' } },
        React.createElement(BrandLogo, { dark: theme === 'dark' }),
        React.createElement('div', { style: { marginTop: 14, position: 'relative' } },
          React.createElement('span', { style: { position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', display: 'flex' } }, React.createElement(Icon, { name: 'search', size: 13 })),
          React.createElement('input', {
            type: 'text', placeholder: 'Search sections…', value: search, onChange: e => setSearch(e.target.value),
            style: { width: '100%', padding: '7px 10px 7px 30px', fontFamily: 'var(--font-sans)', fontSize: 12, border: '1px solid var(--border-default)', background: 'var(--surface-canvas)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }
          }))),
      React.createElement('nav', { style: { flex: 1, overflowY: 'auto', padding: '12px 12px' } },
        visibleNav.map((n, i) => n[1] === null
          ? React.createElement('div', { key: i, style: { fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.16em', color: 'var(--text-faint)', padding: '18px 12px 8px' } }, n[0])
          : React.createElement('a', { key: i, href: n[1].includes('.html') || n[1].startsWith('http') ? n[1] : '#' + n[1], target: n[1].includes('.html') || n[1].startsWith('http') ? '_blank' : '_self', rel: 'noopener', onClick: (e) => { setMobileMenuOpen(false); if (!n[1].includes('.html') && !n[1].startsWith('http')) { e.preventDefault(); goto(n[1]); } },
              style: { display: 'block', padding: '8px 12px', fontFamily: 'var(--font-sans)', fontSize: 13.5, textDecoration: 'none', fontWeight: active === n[1] ? 600 : 500, color: active === n[1] ? 'var(--state-selected-fg)' : 'var(--text-secondary)', background: active === n[1] ? 'var(--state-selected)' : 'transparent', borderLeft: `2px solid ${active === n[1] ? 'var(--brand-500)' : 'transparent'}` } }, n[0]))),
      React.createElement('div', { style: { padding: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 8 } },
        React.createElement(ThemeSwitcher, { currentTheme: theme, onThemeChange: handleThemeChange }),
        /* Export dropdown */
        React.createElement('div', { style: { position: 'relative' } },
          React.createElement(Button, { variant: 'primary', size: 'sm', fullWidth: true, iconLeft: 'download', iconRight: 'chevron-down', onClick: () => setExportOpen(o => !o) }, 'Export Tokens'),
          exportOpen && React.createElement('div', { style: { position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: 4, background: 'var(--surface-default)', border: '1px solid var(--border-strong)', boxShadow: 'var(--shadow-lg)', zIndex: 100, display: 'flex', flexDirection: 'column' } },
            [['Figma Variables (.json)', figmaExport, 'figma'], ['Web Components (.js)', webComponentsExport, 'wc'], ['CSS Custom Properties', cssExport, 'css'], ['W3C DTCG JSON', dtcgExport, 'dtcg'], ['Tailwind Config', tailwindExport, 'tw'], ['TypeScript Constants', tsExport, 'ts']].map(([label, fn, key]) =>
              React.createElement('button', { key, onClick: () => { fn(); setExportOpen(false); }, style: { padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textAlign: 'left', background: 'var(--surface-default)', border: 'none', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', color: 'var(--text-primary)' },
                onMouseEnter: e => { e.target.style.background = 'var(--brand-500)'; e.target.style.color = 'var(--text-on-brand)'; },
                onMouseLeave: e => { e.target.style.background = 'var(--surface-default)'; e.target.style.color = 'var(--text-primary)'; }
              }, '↓  ' + label)))),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } },
          React.createElement('a', { href: 'Brand Guidelines.html', style: { textDecoration: 'none' } }, React.createElement(Button, { variant: 'outline', size: 'sm', fullWidth: true, style: { pointerEvents: 'none' } }, 'Brand Manual')),
          React.createElement('a', { href: 'CaseStudy.html', style: { textDecoration: 'none' } }, React.createElement(Button, { variant: 'outline', size: 'sm', fullWidth: true, style: { pointerEvents: 'none' } }, 'Case Study'))
        )
      )
    ),
    /* main */
    React.createElement('main', { ref: mainRef, className: 'main-content', style: { flex: 1, overflowY: 'auto', height: '100%', position: 'relative' } },
      /* Top Right Navigation CTA Bar */
      React.createElement('div', {
        style: {
          position: 'sticky', top: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
          padding: '16px 36px', background: 'var(--surface-canvas)', borderBottom: '1px solid var(--border-subtle)'
        }
      },
        React.createElement(Button, {
          variant: 'brand', size: 'sm', iconLeft: 'sliders', onClick: () => setWizardOpen(true)
        }, 'Setup Wizard')
      ),
      React.createElement('div', { style: { maxWidth: 960, margin: '0 auto', padding: '48px 56px 120px' } },
        /* overview */
        React.createElement('section', { id: 'overview', style: { scrollMarginTop: 24, marginBottom: 88 } },
          React.createElement(Eyebrow, { size: 12, style: { marginBottom: 20 } }, 'Design System Studio · Token Engine'),
          React.createElement('h1', { style: { fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text-primary)', margin: 0 } }, 'Design Tokens,', React.createElement('br'), 'Engineered For Speed.'),
          React.createElement('p', { style: { fontSize: 19, lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: 620, marginTop: 24 } }, 'The continuous workspace for design tokens, component primitives, and live brand guidelines. Framework-agnostic, zero-build, and built for modern product teams.'),
          React.createElement('div', { style: { display: 'flex', gap: 40, marginTop: 40, flexWrap: 'wrap' } },
            [[String(Object.keys(NS).filter(k => typeof NS[k] === 'function').length || 18),'UI Primitives'],['182','Active Tokens'],['14','Deck Templates'],['3','Font Families']].map(([n, l]) => React.createElement('div', { key: l },
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
        React.createElement(ButtonsSection, { push }),
        React.createElement(FormsSection, { push }),
        React.createElement(BadgesSection, { push }),
        React.createElement(CardsSection, { push }),
        React.createElement(TabsSection, { push }),
        React.createElement(FeedbackSection, { push }),
        React.createElement(PresentationSection, { dark: theme === 'dark' || theme === 'hc', push }),
        React.createElement(TokenMapSection, null),
        React.createElement(AvatarSection, { push }),
        React.createElement(ProgressSection, null),
        React.createElement(ModalSection, null),
        React.createElement(AccordionSection, null),
        React.createElement(TableSection, null),
        React.createElement(MiscSection, null),
        React.createElement(StateMatrixSection, null),
        React.createElement(WCAGSection, null),
        React.createElement(ChangelogSection, null)
      )
    ),
    /* FAB Scroll to Top Button */
    React.createElement('button', {
      onClick: () => { const c = mainRef.current; if (c) c.scrollTo({ top: 0, behavior: 'smooth' }); },
      title: 'Scroll to Top',
      style: {
        position: 'fixed', bottom: 28, right: 28, zIndex: 900,
        width: 46, height: 46, borderRadius: '50%',
        background: 'var(--brand-500)', color: '#ffffff',
        border: '2px solid var(--surface-default)', boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        transition: 'transform 0.15s ease, background 0.15s ease'
      },
      onMouseEnter: e => e.currentTarget.style.transform = 'scale(1.08)',
      onMouseLeave: e => e.currentTarget.style.transform = 'scale(1)'
    }, React.createElement(Icon, { name: 'arrow-up', size: 20, style: { color: '#ffffff', strokeWidth: 2.5 } })),
    React.createElement(OnboardingWizard, { open: wizardOpen, onClose: () => setWizardOpen(false), push }),
    toastNode
  );
}
const __rootEl = document.getElementById('root');
window.DesignSystemStudioDSRoot = window.DesignSystemStudioDSRoot || ReactDOM.createRoot(__rootEl);
window.DesignSystemStudioDSRoot.render(React.createElement(App));
