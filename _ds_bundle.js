/* @ds-bundle: {"format":4,"namespace":"Design System StudioDesignSystem_e71b95","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"UploadZone","sourcePath":"components/forms/UploadZone.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Eyebrow","sourcePath":"components/presentation/Eyebrow.jsx"},{"name":"HudBar","sourcePath":"components/presentation/HudBar.jsx"},{"name":"MetricValue","sourcePath":"components/presentation/MetricValue.jsx"},{"name":"SlideFrame","sourcePath":"components/presentation/SlideFrame.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"ab61340d3833","components/core/Button.jsx":"657f977793e9","components/core/Card.jsx":"f9b70afda207","components/core/Icon.jsx":"54b295f2f9fd","components/core/IconButton.jsx":"ffe2cc24d957","components/feedback/Toast.jsx":"3abb6ddcc1f1","components/feedback/Tooltip.jsx":"e4bec5c1dd78","components/forms/Checkbox.jsx":"0114f8786dc8","components/forms/Input.jsx":"2f35def02ef8","components/forms/Radio.jsx":"0395b06da280","components/forms/Select.jsx":"1461c17605c1","components/forms/Switch.jsx":"4a2ab1380db2","components/forms/UploadZone.jsx":"10b22e2b2593","components/navigation/Tabs.jsx":"227f4daa0d2a","components/presentation/Eyebrow.jsx":"1591a5b72bb6","components/presentation/HudBar.jsx":"f4bcc659ba74","components/presentation/MetricValue.jsx":"56d8f588d961","components/presentation/SlideFrame.jsx":"29d8c3ac7f46","designsystem.app.jsx":"42e465a79d7c","slides/slideRenderers.jsx":"55696c241cc3","ui_kits/master-template-generator/Sidebar.jsx":"5406da66c3cf"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystemStudio = window.DesignSystemStudio || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge / Tag / Pill — compact status + category label. Rounded-full pill by
 * default (matches the source's rounded-[9999px] chips). Tones map to the
 * semantic + brand palettes; `subtle` is the soft-fill variant used most.
 */

const TONES = {
  brand: {
    bg: 'var(--brand-50)',
    fg: 'var(--brand-700)',
    solidBg: 'var(--brand-600)'
  },
  neutral: {
    bg: 'var(--neutral-150)',
    fg: 'var(--neutral-700)',
    solidBg: 'var(--neutral-800)'
  },
  success: {
    bg: 'var(--success-50)',
    fg: 'var(--success-700)',
    solidBg: 'var(--success-600)'
  },
  warning: {
    bg: 'var(--warning-50)',
    fg: 'var(--warning-700)',
    solidBg: 'var(--warning-600)'
  },
  error: {
    bg: 'var(--error-50)',
    fg: 'var(--error-700)',
    solidBg: 'var(--error-600)'
  },
  info: {
    bg: 'var(--info-50)',
    fg: 'var(--info-700)',
    solidBg: 'var(--info-600)'
  }
};
function Badge({
  children,
  tone = 'brand',
  variant = 'subtle',
  dot = false,
  shape = 'pill',
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.brand;
  const solid = variant === 'solid';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 1,
      padding: '4px 10px',
      borderRadius: shape === 'pill' ? 'var(--radius-full)' : 'var(--radius-sharp)',
      background: solid ? t.solidBg : t.bg,
      color: solid ? '#fff' : t.fg,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: solid ? '#fff' : t.solidBg,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — flat surface primitive. Hairline border, white or subtle fill, soft
 * shadow only when raised. Square corners for in-product/editorial contexts;
 * pass radius="lg" for web surfaces.
 */

function Card({
  children,
  surface = 'default',
  elevation = 'flat',
  radius = 'lg',
  padding = 20,
  style,
  ...rest
}) {
  const bg = surface === 'subtle' ? 'var(--surface-subtle)' : surface === 'sunken' ? 'var(--surface-sunken)' : 'var(--surface-default)';
  const shadow = elevation === 'soft' ? 'var(--shadow-soft)' : elevation === 'lift' ? 'var(--shadow-lift)' : 'none';
  const radiusVal = radius === 'sharp' ? 'var(--radius-sharp)' : radius === 'xl' ? 'var(--radius-xl)' : radius === 'md' ? 'var(--radius-md)' : 'var(--radius-lg)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: bg,
      border: '1px solid var(--border-default)',
      borderRadius: radiusVal,
      boxShadow: shadow,
      padding,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Design System Studio icon wrapper — a small, curated set of Lucide line glyphs used across
 * the product, exposed by name so kits reference `<Icon name="share" />`
 * instead of inlining SVG. Stroke-based, currentColor, 24-viewport.
 */

const PATHS = {
  share: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "19",
    r: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8.59",
    y1: "13.51",
    x2: "15.42",
    y2: "17.49"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15.41",
    y1: "6.51",
    x2: "8.59",
    y2: "10.49"
  })),
  download: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  })),
  upload: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })),
  eye: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  'eye-off': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9.88 9.88a3 3 0 1 0 4.24 4.24"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "2",
    x2: "22",
    y2: "22"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  trash: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "11",
    x2: "10",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "11",
    x2: "14",
    y2: "17"
  })),
  edit: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
  })),
  reset: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 3v5h5"
  })),
  'chevron-down': /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }),
  check: /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }),
  link: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
  })),
  x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })),
  settings: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
  })),
  user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })),
  bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })),
  mail: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "4",
    width: "20",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 7-10 5L2 7"
  })),
  calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  })),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  folder: /*#__PURE__*/React.createElement("path", {
    d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
  }),
  filter: /*#__PURE__*/React.createElement("polygon", {
    points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
  }),
  'bar-chart': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "16"
  })),
  star: /*#__PURE__*/React.createElement("polygon", {
    points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
  }),
  info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  })),
  'alert-triangle': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12.01",
    y2: "17"
  })),
  'check-circle': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })),
  'arrow-right': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 5 19 12 12 19"
  })),
  'arrow-left': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "12",
    x2: "5",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 19 5 12 12 5"
  })),
  'arrow-up': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", { x1: "12", y1: "19", x2: "12", y2: "5" }), /*#__PURE__*/React.createElement("polyline", { points: "5 12 12 5 19 12" })),
  'chevron-right': /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  }),
  'external-link': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "15 3 21 3 21 9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "14",
    x2: "21",
    y2: "3"
  })),
  'more-horizontal': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1"
  })),
  sliders: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", { x1: "4", y1: "21", x2: "4", y2: "14" }), /*#__PURE__*/React.createElement("line", { x1: "4", y1: "10", x2: "4", y2: "3" }), /*#__PURE__*/React.createElement("line", { x1: "12", y1: "21", x2: "12", y2: "12" }), /*#__PURE__*/React.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "3" }), /*#__PURE__*/React.createElement("line", { x1: "20", y1: "21", x2: "20", y2: "16" }), /*#__PURE__*/React.createElement("line", { x1: "20", y1: "12", x2: "20", y2: "3" }), /*#__PURE__*/React.createElement("line", { x1: "1", y1: "14", x2: "7", y2: "14" }), /*#__PURE__*/React.createElement("line", { x1: "9", y1: "8", x2: "15", y2: "8" }), /*#__PURE__*/React.createElement("line", { x1: "17", y1: "16", x2: "23", y2: "16" }))
};
function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  style,
  ...rest
}) {
  const path = PATHS[name];
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      flexShrink: 0,
      ...style
    }
  }, rest), path);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Design System Studio Button — the product's action primitive. Editorial, mostly square
 * (radius-sharp) corners; the primary CTA is neutral-900, the brand variant
 * carries emerald. Values lifted verbatim from GeneratorSidebar / toolbar.
 */

const SIZES = {
  sm: {
    height: 34,
    padding: '0 14px',
    fontSize: 12,
    gap: 6,
    icon: 12
  },
  md: {
    height: 44,
    padding: '0 16px',
    fontSize: 14,
    gap: 8,
    icon: 15
  },
  lg: {
    height: 52,
    padding: '0 22px',
    fontSize: 15,
    gap: 9,
    icon: 16
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--action-primary)',
    color: 'var(--text-inverse)',
    border: '1px solid transparent',
    hoverBg: 'var(--action-primary-hover)'
  },
  brand: {
    background: 'var(--action-brand)',
    color: 'var(--text-on-brand)',
    border: '1px solid transparent',
    hoverBg: 'var(--action-brand-hover)'
  },
  secondary: {
    background: 'var(--surface-subtle)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-default)',
    hoverBg: 'var(--state-hover)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)',
    hoverBg: 'var(--state-hover)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent',
    hoverBg: 'var(--state-hover)'
  },
  danger: {
    background: 'var(--error-600)',
    color: 'var(--text-inverse)',
    border: '1px solid transparent',
    hoverBg: 'var(--error-700)'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  radius = 'sharp',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const [hover, setHover] = React.useState(false);
  const radiusVal = radius === 'sharp' ? 'var(--radius-sharp)' : radius === 'full' ? 'var(--radius-full)' : 'var(--radius-md)';
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      width: fullWidth ? '100%' : undefined,
      height: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fontSize,
      fontWeight: 700,
      lineHeight: 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderRadius: radiusVal,
      border: v.border,
      background: disabled ? 'var(--state-disabled-bg)' : hover && !disabled ? v.hoverBg : v.background,
      color: disabled ? 'var(--state-disabled-fg)' : v.color,
      opacity: disabled ? 0.9 : 1,
      transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.icon
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button — the hover-action control used in the slide nav
 * (hide/show, duplicate, delete) and toolbars. 24–28px hit area, neutral by
 * default with tone variants.
 */

const TONES = {
  neutral: {
    color: 'var(--text-faint)',
    hoverColor: 'var(--text-primary)',
    hoverBg: 'var(--neutral-200)'
  },
  brand: {
    color: 'var(--text-faint)',
    hoverColor: 'var(--brand-700)',
    hoverBg: 'var(--brand-50)'
  },
  danger: {
    color: 'var(--text-faint)',
    hoverColor: 'var(--error-600)',
    hoverBg: 'var(--error-50)'
  }
};
function IconButton({
  icon,
  tone = 'neutral',
  size = 24,
  label,
  active = false,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      border: 'none',
      cursor: 'pointer',
      borderRadius: 'var(--radius-sharp)',
      background: hover || active ? t.hoverBg : 'transparent',
      color: hover || active ? t.hoverColor : t.color,
      transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.54)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Toast — flat status notification. Tone-tinted left keyline + icon, ink body.
 * A single inline toast card (compose your own stack/timer around it).
 */
const TONES = {
  success: {
    icon: 'check',
    color: 'var(--success-600)'
  },
  error: {
    icon: 'x',
    color: 'var(--error-600)'
  },
  info: {
    icon: 'link',
    color: 'var(--info-600)'
  },
  brand: {
    icon: 'check',
    color: 'var(--brand-600)'
  }
};
function Toast({
  title,
  message,
  tone = 'success',
  onClose,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.success;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      minWidth: 300,
      maxWidth: 420,
      padding: '14px 16px',
      background: 'var(--surface-default)',
      border: '1px solid var(--border-default)',
      borderLeft: `3px solid ${t.color}`,
      borderRadius: 'var(--radius-sharp)',
      boxShadow: 'var(--shadow-lg)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.color,
      display: 'inline-flex',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)',
      marginTop: title ? 2 : 0,
      lineHeight: 1.45
    }
  }, message)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      display: 'inline-flex',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tooltip — dark hover label. Wraps its trigger children; shows on hover/focus.
 * Positions above by default.
 */
function Tooltip({
  label,
  placement = 'top',
  children,
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 8
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, rest), children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 'var(--z-toast)',
      whiteSpace: 'nowrap',
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.04em',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sharp)',
      boxShadow: 'var(--shadow-md)',
      pointerEvents: 'none'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — square control with an emerald checked fill. Supports indeterminate.
 */
function Checkbox({
  label,
  checked,
  indeterminate = false,
  disabled = false,
  onChange,
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const on = checked || indeterminate;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: 18,
      height: 18,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    type: "checkbox",
    checked: !!checked,
    readOnly: !onChange,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-sharp)',
      border: `1.5px solid ${on ? 'var(--brand-500)' : 'var(--border-strong)'}`,
      background: on ? 'var(--brand-500)' : 'var(--surface-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)'
    }
  }, indeterminate ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 2,
      background: '#fff'
    }
  }) : checked && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field primitive. 44px control height (the shell's
 * modal-control-height), square corners, hairline border. Focus draws the
 * emerald ring + soft halo; error swaps to the error palette.
 */

function Input({
  label,
  hint,
  error,
  size = 'md',
  disabled = false,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const height = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const borderColor = error ? 'var(--error-500)' : focus ? 'var(--brand-500)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height,
      boxSizing: 'border-box',
      padding: '0 12px',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      background: disabled ? 'var(--neutral-100)' : 'var(--surface-default)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-sharp)',
      outline: 'none',
      boxShadow: focus && !error ? '0 0 0 2px var(--brand-100)' : error && focus ? '0 0 0 2px var(--error-100)' : 'none',
      cursor: disabled ? 'not-allowed' : 'text',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)'
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: error ? 'var(--error-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Radio — circular single-choice control with an emerald dot.
 */
function Radio({
  label,
  checked,
  disabled = false,
  onChange,
  name,
  value,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: 18,
      height: 18,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: !!checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      border: `1.5px solid ${checked ? 'var(--brand-500)' : 'var(--border-strong)'}`,
      background: 'var(--surface-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border-color var(--duration-fast) var(--ease-standard)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--brand-500)'
    }
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — native select wrapped for brand styling. 44px control height,
 * square corners, emerald focus ring, mono chevron.
 */
function Select({
  label,
  hint,
  error,
  options = [],
  value,
  onChange,
  disabled = false,
  size = 'md',
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selId = id || (label ? `sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const height = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const borderColor = error ? 'var(--error-500)' : focus ? 'var(--brand-500)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      height,
      boxSizing: 'border-box',
      padding: '0 40px 0 12px',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      background: disabled ? 'var(--neutral-100)' : 'var(--surface-default)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-sharp)',
      outline: 'none',
      appearance: 'none',
      WebkitAppearance: 'none',
      boxShadow: focus && !error ? '0 0 0 2px var(--brand-100)' : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)'
    }
  }, rest), options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lbl = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14,
    strokeWidth: 2.5,
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-muted)',
      pointerEvents: 'none'
    }
  })), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: error ? 'var(--error-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switch — pill toggle. Emerald track when on. This is the one deliberately
 * rounded control in an otherwise square system (a toggle reads as a switch).
 */
function Switch({
  label,
  checked,
  disabled = false,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 40,
      height: 22,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: !!checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'var(--radius-full)',
      background: checked ? 'var(--brand-500)' : 'var(--neutral-300)',
      transition: 'background var(--duration-normal) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 21 : 3,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--duration-normal) var(--ease-standard)'
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/UploadZone.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * UploadZone — the shell's Source Material dropzone. Dashed border, upload
 * glyph, bold filename/title + mono subline. Hover and dragging states tint
 * to the emerald wash. Square corners, explicit min-height.
 */

function UploadZone({
  title,
  filename,
  subtext,
  validating = false,
  onFileSelect,
  accept = '.md,.markdown',
  style,
  ...rest
}) {
  const [dragging, setDragging] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const inputRef = React.useRef(null);
  const active = dragging;
  const displayTitle = validating ? 'Parsing Document…' : filename || title || 'Upload Document';
  const displaySub = filename ? 'Click to replace' : subtext || 'Markdown (.md)';
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: () => inputRef.current && inputRef.current.click(),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onDragOver: e => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: e => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f && onFileSelect) onFileSelect(f);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: 140,
      padding: '32px 20px',
      border: `1.5px dashed ${active || hover ? 'var(--brand-500)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-sharp)',
      background: active || hover ? 'var(--brand-50)' : 'transparent',
      cursor: 'pointer',
      transition: 'border-color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: accept,
    style: {
      display: 'none'
    },
    onChange: e => {
      const f = e.target.files && e.target.files[0];
      if (f && onFileSelect) onFileSelect(f);
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "upload",
    size: 20,
    strokeWidth: 1.5,
    style: {
      marginBottom: 12,
      color: active ? 'var(--brand-500)' : 'var(--text-faint)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-primary)',
      marginBottom: 6
    }
  }, displayTitle), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-muted)'
    }
  }, displaySub));
}
Object.assign(__ds_scope, { UploadZone });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/UploadZone.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tabs — underline tab bar. Active tab carries an emerald underline + ink
 * label; the rest are muted. Controlled via `value`/`onChange` or uncontrolled.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && (tabs[0].value ?? tabs[0])));
  const active = value !== undefined ? value : internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    if (onChange) onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border-default)',
      ...style
    }
  }, rest), tabs.map(t => {
    const val = t.value ?? t;
    const lbl = t.label ?? t;
    const on = val === active;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      onClick: () => select(val),
      style: {
        position: 'relative',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--text-primary)' : 'var(--text-muted)',
        padding: '10px 14px',
        marginBottom: -1,
        borderBottom: `2px solid ${on ? 'var(--brand-500)' : 'transparent'}`,
        transition: 'color var(--duration-fast) var(--ease-standard)'
      }
    }, lbl);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/presentation/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the editorial label with a leading rule that opens nearly every
 * slide and section. Mono, uppercase, emerald, wide tracking.
 */

function Eyebrow({
  children,
  center = false,
  size = 14,
  color = 'var(--text-brand)',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: center ? 'center' : 'flex-start',
      gap: 15,
      fontFamily: 'var(--font-mono)',
      fontSize: size,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-eyebrow)',
      color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 40,
      height: 1,
      background: 'var(--brand-500)',
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/presentation/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/presentation/HudBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * HudBar — the slide top HUD: mono label on the left, slide number on the
 * right, separated from the body by a hairline rule. Absolutely positioned
 * inside a SlideFrame by default; pass `static` to flow it inline.
 */

function HudBar({
  label,
  num,
  dark = false,
  position = 'absolute',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: position === 'static' ? 'static' : 'absolute',
      ...(position === 'static' ? {} : {
        top: 60,
        left: 80,
        right: 80
      }),
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-label)',
      color: dark ? 'rgba(255,255,255,0.6)' : 'var(--neutral-500)',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'var(--neutral-200)'}`,
      paddingBottom: 20,
      zIndex: 10,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, num));
}
Object.assign(__ds_scope, { HudBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/presentation/HudBar.jsx", error: String((e && e.message) || e) }); }

// components/presentation/MetricValue.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MetricValue — the oversized "data monument" numeral with an emerald unit and
 * a display heading. The presentation's signature statistic treatment.
 */

function MetricValue({
  value,
  unit,
  heading,
  valueSize = 420,
  headingSize = 64,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: valueSize,
      fontWeight: 700,
      lineHeight: 0.8,
      letterSpacing: '-0.07em',
      display: 'flex',
      alignItems: 'baseline',
      color: 'inherit'
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand-500)',
      fontSize: '0.3em',
      marginLeft: 10
    }
  }, unit)), heading && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: headingSize,
      fontWeight: 600,
      lineHeight: 0.85,
      letterSpacing: '-0.05em',
      marginTop: 24,
      color: 'inherit'
    }
  }, heading));
}
Object.assign(__ds_scope, { MetricValue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/presentation/MetricValue.jsx", error: String((e && e.message) || e) }); }

// components/presentation/SlideFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SlideFrame — the 1920×1080 slide shell. Renders the exact editorial canvas
 * the Master Presentation uses (white or pure-black), with the optional
 * hairline grid overlay and radial emerald glow, then auto-scales to fit its
 * container width so slides can preview at any size. `fit="none"` renders at
 * full 1920px (for export). Children lay out against the real 1920×1080 box.
 */

function SlideFrame({
  children,
  dark = false,
  showGrid = true,
  glow = false,
  fit = 'width',
  style,
  ...rest
}) {
  const wrapRef = React.useRef(null);
  const [scale, setScale] = React.useState(fit === 'none' ? 1 : 0.001);
  React.useLayoutEffect(() => {
    if (fit === 'none') return;
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / 1920);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);
  const frame = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 1920,
      height: 1080,
      background: dark ? 'var(--presentation-dark)' : 'var(--presentation-light)',
      color: dark ? '#ffffff' : 'var(--text-primary)',
      overflow: 'hidden',
      isolation: 'isolate',
      boxShadow: 'var(--shadow-soft)',
      transformOrigin: 'top left',
      transform: fit === 'none' ? undefined : `scale(${scale})`,
      fontFamily: 'var(--font-sans)'
    }
  }, showGrid && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: -1,
      pointerEvents: 'none',
      backgroundImage: 'linear-gradient(var(--grid-line-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px)',
      backgroundSize: 'var(--grid-cell-size, 120px) var(--grid-cell-size, 120px)'
    }
  }), glow && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 900,
      height: 900,
      zIndex: -1,
      pointerEvents: 'none',
      background: 'var(--glow-bg)',
      filter: 'var(--glow-filter)'
    }
  }), children);
  if (fit === 'none') return frame;
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: wrapRef,
    style: {
      width: '100%',
      height: 1080 * scale,
      ...style
    }
  }, rest), frame);
}
Object.assign(__ds_scope, { SlideFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/presentation/SlideFrame.jsx", error: String((e && e.message) || e) }); }

// designsystem.app.jsx
try { (() => {
/* Design System Studio — single-page documentation site.
   Renders foundations (token tables w/ copy + Figma export), the full
   component library across states, and pattern links. Depends on the DS
const NS = window.DesignSystemStudio || {};
const {
  Button,
  IconButton,
  Badge,
  Card,
  Icon,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  Tabs,
  Tooltip,
  Toast,
  Eyebrow,
  HudBar,
  SlideFrame,
  MetricValue
} = NS;
const {
  useState,
  useEffect,
  useRef
} = React;

/* ----------------------------- token data ----------------------------- */
const HEX = {
  brand: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22'
  },
  neutral: {
    0: '#ffffff',
    50: '#fbfbfb',
    100: '#f5f5f5',
    150: '#eeeeee',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a'
  },
  accent: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309'
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c'
  },
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1'
  }
};
const hexToRgb = h => {
  const n = parseInt(h.slice(1), 16);
  return h.length === 7 ? `${n >> 16 & 255} · ${n >> 8 & 255} · ${n & 255}` : h;
};
const scaleRows = (group, steps) => steps.map(s => ({
  token: `--${group}-${s}`,
  hex: HEX[group][s],
  rgb: hexToRgb(HEX[group][s])
}));
const ALIASES = [['--surface-canvas', 'neutral-50', 'App background'], ['--surface-default', '#ffffff', 'Cards, panels'], ['--surface-subtle', '#faf9f6', 'Warm editorial panel'], ['--text-primary', 'neutral-900', 'Headings, body'], ['--text-secondary', 'neutral-600', 'Supporting copy'], ['--text-muted', 'neutral-500', 'Captions, meta'], ['--text-brand', 'brand-600', 'Emphasis, links'], ['--border-default', 'neutral-200', 'Hairline borders'], ['--border-strong', 'neutral-300', 'Inputs, dividers'], ['--action-primary', 'neutral-900', 'Primary CTA'], ['--action-brand', 'brand-600', 'Emerald action'], ['--focus-ring', 'brand-500', 'Focus outline']];
const TYPE_SCALE = [['Display / H1', 'Space Grotesk', 700, '96px', '0.85', '−0.05em', 'Hero titles, slide covers'], ['Headline / H2', 'Space Grotesk', 600, '48px', '1.0', '−0.03em', 'Section headers'], ['Title / H3', 'Space Grotesk', 600, '30px', '1.1', '−0.02em', 'Card & block titles'], ['Subtitle / H4', 'Space Grotesk', 500, '20px', '1.25', '−0.01em', 'Sub-headers'], ['Body Large', 'Satoshi', 400, '18px', '1.6', '0', 'Intros, lead paragraphs'], ['Body', 'Satoshi', 400, '16px', '1.6', '0', 'Default reading text'], ['Small', 'Satoshi', 400, '14px', '1.5', '0', 'Captions, help text'], ['Label / Mono', 'JetBrains Mono', 500, '12px', '1.4', '0.12em', 'Eyebrows, metadata, numbers']];
const famOf = name => name === 'Satoshi' ? 'var(--font-sans)' : name === 'JetBrains Mono' ? 'var(--font-mono)' : 'var(--font-display)';
const SPACING = [['1', '4px', '0.25rem'], ['2', '8px', '0.5rem'], ['3', '12px', '0.75rem'], ['4', '16px', '1rem'], ['5', '20px', '1.25rem'], ['6', '24px', '1.5rem'], ['8', '32px', '2rem'], ['10', '40px', '2.5rem'], ['12', '48px', '3rem'], ['16', '64px', '4rem'], ['20', '80px', '5rem'], ['24', '96px', '6rem']];
const RADII = [['sharp', '0px', 'All containers — cards, inputs, buttons, dialogs, panels'], ['full', '9999px', 'Only round elements — avatars, status dots, the switch']];
const SHADOWS = [['xs', '0 1px 2px rgb(0 0 0 / .05)'], ['sm', '0 1px 3px rgb(0 0 0 / .1)'], ['md', '0 4px 6px rgb(0 0 0 / .1)'], ['soft', '0 1px 2px …, 0 12px 32px -12px …'], ['lift', '0 2px 4px …, 0 24px 48px -16px …']];
const MOTION = [['fast', '150ms', 'micro — hover, color'], ['normal', '200ms', 'controls, toggles'], ['slow', '300ms', 'panels, overlays'], ['slower', '500ms', 'page / route transitions']];
const EASING = [['standard', 'cubic-bezier(.4,0,.2,1)', 'Default — most transitions'], ['entrance', 'cubic-bezier(0,0,.2,1)', 'Elements arriving / fading in'], ['exit', 'cubic-bezier(.4,0,1,1)', 'Elements leaving / fading out']];
const GLYPHS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  num: '0123456789',
  punct: '& # $ € % @ ! ? * — · ( ) / +'
};
const ICONS = ['share', 'download', 'upload', 'eye', 'eye-off', 'plus', 'trash', 'edit', 'reset', 'chevron-down', 'chevron-right', 'check', 'check-circle', 'link', 'external-link', 'x', 'copy', 'search', 'filter', 'settings', 'user', 'bell', 'mail', 'calendar', 'clock', 'folder', 'bar-chart', 'star', 'info', 'alert-triangle', 'arrow-right', 'arrow-left', 'more-horizontal'];
const NAV = [['Overview', 'overview'], ['Foundations', null], ['Color', 'color'], ['Typography', 'type'], ['Spacing', 'spacing'], ['Radius', 'radius'], ['Elevation', 'elevation'], ['Motion', 'motion'], ['Iconography', 'icons'], ['Components', null], ['Buttons', 'buttons'], ['Inputs & Selection', 'forms'], ['Badges & Tags', 'badges'], ['Cards', 'cards'], ['Tabs', 'tabs'], ['Feedback', 'feedback'], ['Presentation', 'presentation'], ['Patterns', null], ['App Shell', 'appshell'], ['Slide Templates', 'slidetemplates']];

/* ----------------------------- primitives ----------------------------- */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const push = t => {
    const id = Math.random();
    setToasts(x => [...x, {
      ...t,
      id
    }]);
    setTimeout(() => setToasts(x => x.filter(y => y.id !== id)), 2200);
  };
  const node = React.createElement('div', {
    style: {
      position: 'fixed',
      bottom: 28,
      right: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      zIndex: 999
    }
  }, toasts.map(t => React.createElement(Toast, {
    key: t.id,
    tone: t.tone || 'success',
    title: t.title,
    message: t.message
  })));
  return [push, node];
}
const copy = (text, push) => {
  navigator.clipboard && navigator.clipboard.writeText(text);
  push && push({
    title: 'Copied',
    message: text,
    tone: 'brand'
  });
};
function Section({
  id,
  kicker,
  title,
  intro,
  children
}) {
  return React.createElement('section', {
    id,
    style: {
      scrollMarginTop: 24,
      marginBottom: 96
    }
  }, React.createElement('div', {
    style: {
      marginBottom: 28
    }
  }, kicker && React.createElement(Eyebrow, {
    size: 11,
    style: {
      marginBottom: 14
    }
  }, kicker), React.createElement('h2', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 38,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, title), intro && React.createElement('p', {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      maxWidth: 640,
      marginTop: 12
    }
  }, intro)), children);
}
function Sub({
  children
}) {
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: 'var(--text-faint)',
      margin: '36px 0 16px'
    }
  }, children);
}
function Panel({
  children,
  style
}) {
  return React.createElement('div', {
    style: {
      border: '1px solid var(--border-default)',
      background: 'var(--surface-default)',
      padding: 28,
      ...style
    }
  }, children);
}

/* ------------------------------ sections ------------------------------ */
function ColorTable({
  rows,
  push
}) {
  return React.createElement('div', {
    style: {
      border: '1px solid var(--border-default)'
    }
  }, rows.map((r, i) => React.createElement('div', {
    key: r.token,
    onClick: () => copy(r.token, push),
    title: 'Copy token',
    style: {
      display: 'grid',
      gridTemplateColumns: '48px 1fr 130px 130px 24px',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-mono)',
      fontSize: 13
    }
  }, React.createElement('span', {
    style: {
      width: 34,
      height: 34,
      borderRadius: 6,
      background: r.hex,
      border: '1px solid var(--border-default)'
    }
  }), React.createElement('span', {
    style: {
      color: 'var(--text-primary)',
      fontWeight: 500
    }
  }, r.token), React.createElement('span', {
    style: {
      color: 'var(--text-secondary)',
      textTransform: 'uppercase'
    }
  }, r.hex), React.createElement('span', {
    style: {
      color: 'var(--text-muted)'
    }
  }, r.rgb), React.createElement('span', {
    style: {
      color: 'var(--text-faint)',
      display: 'inline-flex'
    }
  }, React.createElement(Icon, {
    name: 'copy',
    size: 14
  })))));
}
function AliasTable({
  push
}) {
  return React.createElement('div', {
    style: {
      border: '1px solid var(--border-default)'
    }
  }, ALIASES.map((a, i) => React.createElement('div', {
    key: a[0],
    onClick: () => copy(a[0], push),
    title: 'Copy token',
    style: {
      display: 'grid',
      gridTemplateColumns: '48px 1fr 160px 24px',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-mono)',
      fontSize: 13
    }
  }, React.createElement('span', {
    style: {
      width: 34,
      height: 34,
      borderRadius: 6,
      background: `var(${a[0]})`,
      border: '1px solid var(--border-default)'
    }
  }), React.createElement('span', {
    style: {
      color: 'var(--text-primary)',
      fontWeight: 500
    }
  }, a[0]), React.createElement('span', {
    style: {
      color: 'var(--text-muted)'
    }
  }, '→ ' + a[1]), React.createElement('span', {
    style: {
      color: 'var(--text-faint)',
      display: 'inline-flex'
    }
  }, React.createElement(Icon, {
    name: 'copy',
    size: 14
  })))));
}
function ColorSection({
  push
}) {
  return React.createElement(Section, {
    id: 'color',
    kicker: 'Foundations',
    title: 'Color',
    intro: 'Emerald is the single brand accent; everything else is a near-monochrome neutral scale. Click any row to copy its token.'
  }, React.createElement(Sub, null, 'Brand · Emerald (primary)'), React.createElement(ColorTable, {
    rows: scaleRows('brand', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]),
    push
  }), React.createElement(Sub, null, 'Accent · Leaf (secondary)'), React.createElement(ColorTable, {
    rows: scaleRows('accent', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
    push
  }), React.createElement(Sub, null, 'Neutral'), React.createElement(ColorTable, {
    rows: scaleRows('neutral', [0, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 950]),
    push
  }), React.createElement(Sub, null, 'Semantic'), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, ['success', 'warning', 'error', 'info'].map(g => React.createElement('div', {
    key: g
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      color: 'var(--text-faint)',
      margin: '0 0 6px 2px'
    }
  }, g), React.createElement(ColorTable, {
    rows: scaleRows(g, [50, 100, 500, 600, 700]),
    push
  })))), React.createElement(Sub, null, 'Semantic aliases'), React.createElement(AliasTable, {
    push
  }));
}
function TypeTester({
  push
}) {
  const [text, setText] = useState('Amplify authentic voices at scale.');
  const [size, setSize] = useState(48);
  const [weight, setWeight] = useState(600);
  const fams = [['Space Grotesk', 'var(--font-display)', 'Display · headlines · large editorial titles', '-0.03em'], ['Satoshi', 'var(--font-sans)', 'Interface · body · navigation · forms', '0'], ['JetBrains Mono', 'var(--font-mono)', 'Labels · metadata · numbers · IDs', '0']];
  return React.createElement(Panel, {
    style: {
      marginBottom: 24,
      background: 'var(--neutral-50)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, React.createElement(Sub, {}, 'Type tester — see how it feels'), React.createElement('button', {
    onClick: () => copy(text, push),
    style: {
      border: '1px solid var(--border-default)',
      background: 'var(--surface-default)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 10px',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-secondary)'
    }
  }, React.createElement(Icon, {
    name: 'copy',
    size: 13
  }), 'Copy text')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      margin: '16px 0 20px'
    }
  }, React.createElement('div', {
    style: {
      flex: '1 1 320px'
    }
  }, React.createElement(Input, {
    label: 'Your text',
    value: text,
    onChange: e => setText(e.target.value),
    placeholder: 'Type anything…'
  })), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      minWidth: 190
    }
  }, React.createElement('label', {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, 'Size · ' + size + 'px'), React.createElement('input', {
    type: 'range',
    min: 14,
    max: 120,
    value: size,
    onChange: e => setSize(+e.target.value),
    style: {
      accentColor: 'var(--brand-500)',
      height: 44
    }
  })), React.createElement('div', {
    style: {
      minWidth: 150
    }
  }, React.createElement(Select, {
    label: 'Weight',
    value: String(weight),
    onChange: e => setWeight(+e.target.value),
    options: [{
      value: '400',
      label: 'Regular 400'
    }, {
      value: '500',
      label: 'Medium 500'
    }, {
      value: '600',
      label: 'Semibold 600'
    }, {
      value: '700',
      label: 'Bold 700'
    }]
  }))), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, fams.map(([name, fam, role, tr]) => React.createElement('div', {
    key: name,
    style: {
      padding: '18px 0',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 12
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      color: 'var(--text-primary)'
    }
  }, name), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, role)), React.createElement('div', {
    style: {
      fontFamily: fam,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: tr,
      lineHeight: 1.1,
      color: 'var(--text-primary)',
      wordBreak: 'break-word'
    }
  }, text || 'Type something above…')))));
}
function FontDownload({
  href,
  name
}) {
  const [h, setH] = React.useState(false);
  return React.createElement('a', {
    href,
    download: true,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    title: 'Download the ' + name + ' family (.zip — OTF/TTF/WebFonts + license)',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      textDecoration: 'none',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      color: h ? 'var(--pure-white)' : 'var(--text-primary)',
      background: h ? 'var(--brand-600)' : 'transparent',
      border: '1px solid ' + (h ? 'var(--brand-600)' : 'var(--border-strong)'),
      padding: '9px 16px',
      transition: 'background .15s ease, color .15s ease, border-color .15s ease',
      cursor: 'pointer'
    }
  }, 'Download', React.createElement('span', {
    style: {
      fontSize: 14,
      lineHeight: 1,
      color: h ? 'var(--pure-white)' : 'var(--text-brand)'
    }
  }, '↓'));
}
function TypeSection({
  push
}) {
  const fonts = [['Space Grotesk', 'var(--font-display)', 'Display · headlines · numerals', 'assets/fonts/SpaceGrotesk.zip'], ['Satoshi', 'var(--font-sans)', 'Interface · body · forms', 'assets/fonts/Satoshi.zip'], ['JetBrains Mono', 'var(--font-mono)', 'Labels · metadata · numbers', 'assets/fonts/JetBrainsMono.zip']];
  return React.createElement(Section, {
    id: 'type',
    kicker: 'Foundations',
    title: 'Typography',
    intro: 'Three families, three strict roles. Space Grotesk leads, Satoshi carries the reading, JetBrains Mono handles metadata. Try the tester below.'
  }, React.createElement(TypeTester, {
    push
  }), fonts.map(([name, fam, role, zip]) => React.createElement(Panel, {
    key: name,
    style: {
      marginBottom: 16
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 18
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontFamily: fam,
      fontSize: 30,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, name), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, role)), React.createElement(FontDownload, {
    href: zip,
    name
  })), React.createElement('div', {
    style: {
      fontFamily: fam,
      color: 'var(--text-primary)',
      lineHeight: 1.5
    }
  }, React.createElement('div', {
    style: {
      fontSize: 22
    }
  }, GLYPHS.upper), React.createElement('div', {
    style: {
      fontSize: 22
    }
  }, GLYPHS.lower), React.createElement('div', {
    style: {
      fontSize: 22,
      color: 'var(--text-secondary)'
    }
  }, GLYPHS.num + '   ' + GLYPHS.punct)))), React.createElement(Sub, null, 'Type scale — each role in its real family'), React.createElement('div', {
    style: {
      border: '1px solid var(--border-default)'
    }
  }, TYPE_SCALE.map((t, i) => React.createElement('div', {
    key: t[0],
    style: {
      display: 'grid',
      gridTemplateColumns: '210px 1fr 210px',
      alignItems: 'center',
      gap: 20,
      padding: '16px',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none'
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-primary)',
      fontWeight: 500
    }
  }, t[0]), React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--text-muted)',
      marginTop: 3
    }
  }, t[6])), React.createElement('span', {
    style: {
      fontFamily: famOf(t[1]),
      fontSize: Math.min(parseInt(t[3]), 34),
      fontWeight: t[2],
      letterSpacing: t[5],
      lineHeight: 1.1,
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, t[1] === 'JetBrains Mono' ? 'REACH · 15,000+' : 'Advocacy at scale'), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      textAlign: 'right'
    }
  }, `${t[1].split(' ')[0]} · ${t[2]} · ${t[3]} · ${t[5]}`)))));
}
function SpacingSection() {
  return React.createElement(Section, {
    id: 'spacing',
    kicker: 'Foundations',
    title: 'Spacing',
    intro: 'A 4px base grid drives every gap, pad, and margin. Consistent rhythm is what makes layouts feel engineered.'
  }, React.createElement('div', {
    style: {
      border: '1px solid var(--border-default)'
    }
  }, SPACING.map((s, i) => React.createElement('div', {
    key: s[0],
    style: {
      display: 'grid',
      gridTemplateColumns: '90px 1fr 140px',
      alignItems: 'center',
      gap: 20,
      padding: '10px 16px',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none'
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-primary)'
    }
  }, 'space-' + s[0]), React.createElement('span', {
    style: {
      height: 16,
      width: s[1],
      background: 'var(--brand-500)'
    }
  }), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      textAlign: 'right'
    }
  }, `${s[1]} · ${s[2]}`)))));
}
function RadiusSection() {
  return React.createElement(Section, {
    id: 'radius',
    kicker: 'Foundations',
    title: 'Corner Radius',
    intro: 'The system is sharp by design — every container is 0 for an editorial, print-like feel. The only exception is genuinely round elements (avatars, dots, the switch), which use full.'
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, RADII.map(r => React.createElement('div', {
    key: r[0],
    style: {
      textAlign: 'center'
    }
  }, React.createElement('div', {
    style: {
      width: 92,
      height: 68,
      background: 'var(--neutral-100)',
      border: '1px solid var(--border-strong)',
      borderRadius: r[1] === '9999px' ? 34 : r[1]
    }
  }), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-primary)',
      marginTop: 10
    }
  }, r[0] + ' · ' + r[1]), React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, r[2])))));
}
function ElevationSection() {
  return React.createElement(Section, {
    id: 'elevation',
    kicker: 'Foundations',
    title: 'Elevation',
    intro: 'The interface leans on spacing and contrast. Shadows stay soft and rare — two editorial lifts for raised surfaces.'
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap',
      background: 'var(--neutral-50)',
      padding: 32,
      border: '1px solid var(--border-default)'
    }
  }, SHADOWS.map(s => React.createElement('div', {
    key: s[0],
    style: {
      textAlign: 'center'
    }
  }, React.createElement('div', {
    style: {
      width: 130,
      height: 78,
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 0,
      boxShadow: `var(--shadow-${s[0]})`
    }
  }), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-primary)',
      marginTop: 12
    }
  }, 'shadow-' + s[0])))));
}
function MotionSection() {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setGo(g => !g), 900);
    return () => clearInterval(t);
  }, []);
  return React.createElement(Section, {
    id: 'motion',
    kicker: 'Foundations',
    title: 'Motion',
    intro: 'Subtle, intentional, premium. 150–300ms with a standard ease — fades and gentle shifts, never bounces.'
  }, React.createElement(Panel, null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 24
    }
  }, React.createElement('div', {
    style: {
      position: 'relative',
      flex: 1,
      height: 8,
      background: 'var(--neutral-100)'
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      top: -6,
      left: go ? 'calc(100% - 20px)' : 0,
      width: 20,
      height: 20,
      background: 'var(--brand-500)',
      borderRadius: '50%',
      transition: 'left 300ms cubic-bezier(.4,0,.2,1)'
    }
  })), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, '300ms · standard')), React.createElement('div', {
    style: {
      border: '1px solid var(--border-default)'
    }
  }, MOTION.map((m, i) => React.createElement('div', {
    key: m[0],
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr 1fr',
      gap: 16,
      padding: '10px 16px',
      borderTop: i ? '1px solid var(--border-subtle)' : 'none',
      fontFamily: 'var(--font-mono)',
      fontSize: 12
    }
  }, React.createElement('span', {
    style: {
      color: 'var(--text-primary)'
    }
  }, m[0]), React.createElement('span', {
    style: {
      color: 'var(--text-secondary)'
    }
  }, m[1]), React.createElement('span', {
    style: {
      color: 'var(--text-muted)'
    }
  }, m[2]))))), React.createElement(Sub, null, 'Easing curves'), React.createElement(Panel, null, React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, EASING.map(e => React.createElement('div', {
    key: e[0],
    style: {
      border: '1px solid var(--border-default)',
      padding: 16
    }
  }, React.createElement('div', {
    style: {
      position: 'relative',
      height: 64,
      marginBottom: 14
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--neutral-50)'
    }
  }), React.createElement('div', {
    style: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      width: 12,
      height: 12,
      background: 'var(--brand-500)',
      borderRadius: '50%',
      transform: go ? 'translate(180px,-40px)' : 'none',
      transition: `transform 700ms ${e[1]}`
    }
  })), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-primary)',
      fontWeight: 500
    }
  }, e[0]), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, e[1]), React.createElement('div', {
    style: {
      fontSize: 12,
      color: 'var(--text-secondary)',
      marginTop: 8,
      lineHeight: 1.5
    }
  }, e[2]))))), React.createElement(Sub, null, 'Interaction states \u2014 hover, focus, fade'), React.createElement(Panel, null, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 40,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'center'
    }
  }, React.createElement(Button, {
    variant: 'primary'
  }, 'Hover me'), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, 'darken \u00b7 150ms')), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'center'
    }
  }, React.createElement('input', {
    placeholder: 'Focus me',
    style: {
      height: 44,
      padding: '0 14px',
      border: '1px solid var(--border-default)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      outline: 'none',
      color: 'var(--text-primary)'
    },
    onFocus: ev => {
      ev.target.style.borderColor = 'var(--brand-500)';
      ev.target.style.boxShadow = '0 0 0 2px var(--brand-100)';
    },
    onBlur: ev => {
      ev.target.style.borderColor = 'var(--border-default)';
      ev.target.style.boxShadow = 'none';
    }
  }), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, 'ring \u00b7 emerald')), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'center'
    }
  }, React.createElement('div', {
    style: {
      width: 120,
      height: 44,
      background: 'var(--brand-500)',
      opacity: go ? 1 : 0.15,
      transition: 'opacity 500ms cubic-bezier(0,0,.2,1)'
    }
  }), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, 'fade \u00b7 entrance')))));
}
function IconsSection({
  push
}) {
  return React.createElement(Section, {
    id: 'icons',
    kicker: 'Foundations',
    title: 'Iconography',
    intro: 'Lucide line icons — 2px stroke, round caps, currentColor. Click a glyph to copy its name.'
  }, React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 12
    }
  }, ICONS.map(n => React.createElement('button', {
    key: n,
    onClick: () => copy(n, push),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      padding: '20px 8px',
      border: '1px solid var(--border-default)',
      background: 'var(--surface-default)',
      cursor: 'pointer',
      color: 'var(--text-primary)'
    }
  }, React.createElement(Icon, {
    name: n,
    size: 22
  }), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, n)))));
}

/* --------------------------- component sections --------------------------- */
function Swatch({
  label,
  children
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'flex-start'
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      color: 'var(--text-faint)'
    }
  }, label), children);
}
function ButtonsSection() {
  const variants = ['primary', 'brand', 'secondary', 'outline', 'ghost', 'danger'];
  return React.createElement(Section, {
    id: 'buttons',
    kicker: 'Components',
    title: 'Buttons',
    intro: 'The action primitive. Hover, focus, and press are live — interact with them. Six variants, three sizes, sharp corners.'
  }, React.createElement(Sub, null, 'Variants (hover / focus / press are live)'), React.createElement(Panel, null, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, variants.map(v => React.createElement(Button, {
    key: v,
    variant: v
  }, v[0].toUpperCase() + v.slice(1))))), React.createElement(Sub, null, 'Sizes'), React.createElement(Panel, null, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, React.createElement(Button, {
    size: 'sm'
  }, 'Small'), React.createElement(Button, {
    size: 'md'
  }, 'Medium'), React.createElement(Button, {
    size: 'lg'
  }, 'Large'))), React.createElement(Sub, null, 'With icons · disabled · icon buttons'), React.createElement(Panel, null, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, React.createElement(Button, {
    iconLeft: 'upload'
  }, 'Upload'), React.createElement(Button, {
    variant: 'brand',
    iconRight: 'chevron-down'
  }, 'Generate'), React.createElement(Button, {
    variant: 'outline',
    iconLeft: 'download'
  }, 'Export PDF'), React.createElement(Button, {
    disabled: true
  }, 'Disabled'), React.createElement('span', {
    style: {
      width: 1,
      height: 28,
      background: 'var(--border-default)'
    }
  }), React.createElement(IconButton, {
    icon: 'eye',
    label: 'Hide'
  }), React.createElement(IconButton, {
    icon: 'plus',
    label: 'Duplicate'
  }), React.createElement(IconButton, {
    icon: 'trash',
    tone: 'danger',
    label: 'Delete'
  }))));
}
function FormsSection() {
  const [c, setC] = useState(true),
    [r, setR] = useState('p'),
    [s, setS] = useState(true);
  return React.createElement(Section, {
    id: 'forms',
    kicker: 'Components',
    title: 'Inputs & Selection',
    intro: 'Form primitives at 44px control height with an emerald focus ring. Everything below is interactive.'
  }, React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, React.createElement(Panel, null, React.createElement(Sub, null, 'Text & select'), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, React.createElement(Input, {
    label: 'Deck title',
    defaultValue: 'Partner Advocacy Program'
  }), React.createElement(Input, {
    label: 'Contact email',
    defaultValue: 'hello@',
    error: 'Enter a valid email'
  }), React.createElement(Select, {
    label: 'Template',
    options: ['Business Record', 'Executive Brief', 'Proposal']
  }))), React.createElement(Panel, null, React.createElement(Sub, null, 'Selection controls'), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, React.createElement(Checkbox, {
    label: 'Enable per-partner leaderboards',
    checked: c,
    onChange: () => setC(!c)
  }), React.createElement(Checkbox, {
    label: 'Indeterminate',
    indeterminate: true
  }), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 20
    }
  }, React.createElement(Radio, {
    name: 'g',
    label: 'Partners',
    checked: r === 'p',
    onChange: () => setR('p')
  }), React.createElement(Radio, {
    name: 'g',
    label: 'Employees',
    checked: r === 'e',
    onChange: () => setR('e')
  })), React.createElement(Switch, {
    label: 'Redirection on share',
    checked: s,
    onChange: () => setS(!s)
  })))));
}
function BadgesSection() {
  const tones = ['brand', 'neutral', 'success', 'warning', 'error', 'info'];
  return React.createElement(Section, {
    id: 'badges',
    kicker: 'Components',
    title: 'Badges & Tags',
    intro: 'Compact status and category labels. Subtle soft-fill by default; solid for emphasis.'
  }, React.createElement(Panel, null, React.createElement(Sub, null, 'Subtle'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, tones.map(t => React.createElement(Badge, {
    key: t,
    tone: t
  }, t))), React.createElement(Sub, null, 'Solid · with dot · square'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, tones.map(t => React.createElement(Badge, {
    key: t,
    tone: t,
    variant: 'solid'
  }, t)), React.createElement(Badge, {
    tone: 'success',
    dot: true
  }, 'Active'), React.createElement(Badge, {
    tone: 'neutral',
    shape: 'square'
  }, 'Draft'))));
}
function CardsSection() {
  return React.createElement(Section, {
    id: 'cards',
    kicker: 'Components',
    title: 'Cards',
    intro: 'Flat container surfaces — hairline borders, shadow only when raised. Structure from spacing, not elevation.'
  }, React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, [['default', 'flat', 'Default surface'], ['subtle', 'flat', 'Warm editorial panel'], ['default', 'soft', 'Soft elevation']].map(([s, e, l], i) => React.createElement(Card, {
    key: i,
    surface: s,
    elevation: e,
    radius: 'sharp'
  }, React.createElement('div', {
    style: {
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--text-primary)'
    }
  }, l), React.createElement('p', {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 6,
      lineHeight: 1.5
    }
  }, 'Surface ' + s + ' · elevation ' + e)))));
}
function TabsSection() {
  const [t, setT] = useState('Campaigns');
  return React.createElement(Section, {
    id: 'tabs',
    kicker: 'Components',
    title: 'Tabs',
    intro: 'Underline navigation with an emerald active indicator. Controlled and interactive.'
  }, React.createElement(Panel, null, React.createElement(Tabs, {
    tabs: ['Overview', 'Advocates', 'Campaigns', 'Analytics', 'Settings'],
    value: t,
    onChange: setT
  }), React.createElement('div', {
    style: {
      padding: '20px 4px 4px',
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, 'Active tab: ', React.createElement('strong', {
    style: {
      color: 'var(--text-primary)'
    }
  }, t))));
}
function FeedbackSection() {
  return React.createElement(Section, {
    id: 'feedback',
    kicker: 'Components',
    title: 'Feedback',
    intro: 'Tooltips and toasts. Hover the button for a tooltip; toasts carry a tone keyline.'
  }, React.createElement(Panel, null, React.createElement(Sub, null, 'Tooltip (hover)'), React.createElement(Tooltip, {
    label: 'Copies the deck URL'
  }, React.createElement(Button, {
    variant: 'outline',
    size: 'sm',
    iconLeft: 'link'
  }, 'Copy Share Link')), React.createElement(Sub, null, 'Toasts'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, React.createElement(Toast, {
    tone: 'success',
    title: 'Deck generated',
    message: '14 slides built from your Business Record.'
  }), React.createElement(Toast, {
    tone: 'error',
    title: 'Import failed',
    message: 'Missing required frontmatter: client.'
  }))));
}
function PresentationSection() {
  return React.createElement(Section, {
    id: 'presentation',
    kicker: 'Components',
    title: 'Presentation primitives',
    intro: 'The editorial building blocks of the Master Presentation — the deck is its own design system on top of these.'
  }, React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 16
    }
  }, React.createElement(Panel, null, React.createElement(Sub, null, 'Eyebrow'), React.createElement(Eyebrow, null, 'Executive Summary'), React.createElement('div', {
    style: {
      height: 10
    }
  }), React.createElement(Eyebrow, {
    size: 10
  }, 'Part 01')), React.createElement(Panel, {
    style: {
      position: 'relative'
    }
  }, React.createElement(Sub, null, 'HUD bar'), React.createElement('div', {
    style: {
      position: 'relative',
      height: 40
    }
  }, React.createElement(HudBar, {
    label: 'Strategic Context',
    num: '05',
    position: 'static'
  })))), React.createElement(Sub, null, 'Slide frame + metric monument'), React.createElement(SlideFrame, {
    glow: true
  }, React.createElement(HudBar, {
    label: 'Performance Metric',
    num: '06'
  }), React.createElement('div', {
    style: {
      padding: '260px 140px 0'
    }
  }, React.createElement(Eyebrow, null, 'Data Monument'), React.createElement('div', {
    style: {
      marginTop: 40
    }
  }, React.createElement(MetricValue, {
    value: '2.0',
    unit: 'M',
    heading: 'Total potential reach in one campaign week.'
  })))));
}
function PatternCard({
  href,
  title,
  desc,
  tag
}) {
  return React.createElement('a', {
    href,
    style: {
      display: 'block',
      border: '1px solid var(--border-default)',
      background: 'var(--surface-default)',
      padding: 24,
      textDecoration: 'none',
      color: 'inherit',
      transition: 'border-color .15s'
    },
    onMouseEnter: e => e.currentTarget.style.borderColor = 'var(--brand-500)',
    onMouseLeave: e => e.currentTarget.style.borderColor = 'var(--border-default)'
  }, React.createElement(Badge, {
    tone: 'brand'
  }, tag), React.createElement('h3', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      fontWeight: 600,
      margin: '14px 0 8px',
      color: 'var(--text-primary)'
    }
  }, title), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      lineHeight: 1.5,
      margin: 0
    }
  }, desc), React.createElement('div', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 16,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-brand)'
    }
  }, 'Open', React.createElement(Icon, {
    name: 'chevron-down',
    size: 12,
    style: {
      transform: 'rotate(-90deg)'
    }
  })));
}

/* ------------------------------- app shell ------------------------------- */
function figmaExport() {
  /* Figma-native Variables import format: $type/$value objects with sRGB
     components + hex, nested groups, com.figma.* extensions. Matches the
     shape Figma's own "Import variables" accepts. */
  let vid = 5;
  const id = () => ({
    'com.figma.variableId': `VariableID:2002:${vid++}`,
    'com.figma.scopes': ['ALL_SCOPES']
  });
  const comps = hex => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  };
  const col = hex => ({
    $type: 'color',
    $value: {
      colorSpace: 'srgb',
      components: comps(hex),
      alpha: 1,
      hex: hex.toUpperCase()
    },
    $extensions: id()
  });
  const num = v => ({
    $type: 'number',
    $value: v,
    $extensions: id()
  });
  const str = v => ({
    $type: 'string',
    $value: v,
    $extensions: {
      ...id(),
      'com.figma.type': 'string'
    }
  });
  const cScale = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, col(v)]));
  const nScale = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, num(v)]));
  const brand = {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    650: '#047857',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
    950: '#07070A'
  };
  const accent = {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    650: '#15803D',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#07070A'
  };
  const neutral = {
    50: '#FBFBFB',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A'
  };
  const success = {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D'
  };
  const warning = {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309'
  };
  const error = {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C'
  };
  const info = {
    50: '#F0F9FF',
    100: '#E0F2FE',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1'
  };
  const tokens = {
    color: {
      brand: {
        primary: cScale(brand),
        secondary: cScale(brand),
        accent: cScale(accent)
      },
      neutral: cScale(neutral),
      success: cScale(success),
      warning: cScale(warning),
      error: cScale(error),
      info: cScale(info),
      fixed: {
        white: col('#FFFFFF'),
        light: col('#C7C7D1'),
        muted: col('#9696A3'),
        dark: col('#141418')
      }
    },
    typography: {
      fontFamily: {
        sans: str('Satoshi, Inter, ui-sans-serif, system-ui, sans-serif'),
        display: str('Space Grotesk, Inter, sans-serif'),
        mono: str('JetBrains Mono, ui-monospace, SFMono-Regular, monospace')
      },
      fontSize: nScale({
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
        '6xl': 60
      }),
      fontWeight: nScale({
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900
      }),
      lineHeight: nScale({
        tight: 1.1,
        snug: 1.25,
        normal: 1.5,
        relaxed: 1.625
      })
    },
    spacing: nScale({
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      8: 32,
      10: 40,
      12: 48,
      16: 64,
      20: 80,
      24: 96
    }),
    radius: nScale({
      sharp: 0,
      full: 9999
    }),
    $extensions: {
      'com.figma.modeName': 'Design System Studio Emerald Light'
    }
  };
  const blob = new Blob([JSON.stringify(tokens, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'design-system-studio-design.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
function App() {
  const [push, toastNode] = useToast();
  const [active, setActive] = useState('overview');
  const mainRef = useRef(null);
  useEffect(() => {
    const ids = NAV.filter(n => n[1]).map(n => n[1]);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      root: mainRef.current,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  const goto = id => {
    const el = document.getElementById(id);
    const c = mainRef.current;
    if (el && c) c.scrollTo({
      top: el.offsetTop - 20,
      behavior: 'smooth'
    });
  };
  return React.createElement('div', {
    style: {
      display: 'flex',
      height: '100vh',
      background: 'var(--surface-canvas)'
    }
  }, /* sidebar */
  React.createElement('aside', {
    style: {
      width: 272,
      flexShrink: 0,
      borderRight: '1px solid var(--border-default)',
      background: 'var(--surface-default)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, React.createElement('div', {
    style: {
      padding: '24px 24px 20px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, React.createElement('div', {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      userSelect: 'none'
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: 'var(--text-primary)'
    }
  }, 'Design System Studio'), React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, 'OPEN EDITION · v1.0'))), React.createElement('nav', {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 12px'
    }
  }, NAV.map((n, i) => n[1] === null ? React.createElement('div', {
    key: i,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '.16em',
      color: 'var(--text-faint)',
      padding: '18px 12px 8px'
    }
  }, n[0]) : React.createElement('a', {
    key: i,
    href: '#' + n[1],
    onClick: e => {
      e.preventDefault();
      goto(n[1]);
    },
    style: {
      display: 'block',
      padding: '8px 12px',
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      textDecoration: 'none',
      fontWeight: active === n[1] ? 600 : 500,
      color: active === n[1] ? 'var(--brand-700)' : 'var(--text-secondary)',
      background: active === n[1] ? 'var(--brand-50)' : 'transparent',
      borderLeft: `2px solid ${active === n[1] ? 'var(--brand-500)' : 'transparent'}`
    }
  }, n[0]))), React.createElement('div', {
    style: {
      padding: 16,
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, React.createElement(Button, {
    variant: 'primary',
    size: 'sm',
    fullWidth: true,
    iconLeft: 'download',
    onClick: figmaExport
  }, 'Export Figma Tokens'), React.createElement('a', {
    href: 'Brand Guidelines.html',
    style: {
      textDecoration: 'none'
    }
  }, React.createElement(Button, {
    variant: 'outline',
    size: 'sm',
    fullWidth: true,
    style: {
      pointerEvents: 'none'
    }
  }, 'Brand Guidelines')))), /* main */
  React.createElement('main', {
    ref: mainRef,
    style: {
      flex: 1,
      overflowY: 'auto',
      height: '100%'
    }
  }, React.createElement('div', {
    style: {
      maxWidth: 960,
      margin: '0 auto',
      padding: '72px 56px 120px'
    }
  }, /* overview */
  React.createElement('section', {
    id: 'overview',
    style: {
      scrollMarginTop: 24,
      marginBottom: 88
    }
  }, React.createElement(Eyebrow, {
    size: 12,
    style: {
      marginBottom: 20
    }
  }, 'Design System Studio'), React.createElement('h1', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 72,
      fontWeight: 700,
      letterSpacing: '-0.04em',
      lineHeight: 0.95,
      color: 'var(--text-primary)',
      margin: 0
    }
  }, 'The Design System Studio', React.createElement('br'), 'Design System.'), React.createElement('p', {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      maxWidth: 620,
      marginTop: 24
    }
  }, 'One source of truth for every Design System Studio screen, presentation, and component. Emerald-led, light-mode, editorial. Tokens copy straight to code and export to Figma variables.'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 40,
      marginTop: 40,
      flexWrap: 'wrap'
    }
  }, [['18', 'Components'], ['182', 'Design tokens'], ['14', 'Slide templates'], ['3', 'Type families']].map(([n, l]) => React.createElement('div', {
    key: l
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 44,
      fontWeight: 700,
      letterSpacing: '-0.04em',
      color: 'var(--brand-600)'
    }
  }, n), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, l)))), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 40
    }
  }, React.createElement(Button, {
    variant: 'primary',
    iconLeft: 'download',
    onClick: figmaExport
  }, 'Export Figma Tokens'), React.createElement(Button, {
    variant: 'outline',
    onClick: () => goto('color')
  }, 'Browse foundations'))), React.createElement(ColorSection, {
    push
  }), React.createElement(TypeSection, {
    push
  }), React.createElement(SpacingSection, null), React.createElement(RadiusSection, null), React.createElement(ElevationSection, null), React.createElement(MotionSection, null), React.createElement(IconsSection, {
    push
  }), React.createElement(ButtonsSection, null), React.createElement(FormsSection, null), React.createElement(BadgesSection, null), React.createElement(CardsSection, null), React.createElement(TabsSection, null), React.createElement(FeedbackSection, null), React.createElement(PresentationSection, null), React.createElement(Section, {
    id: 'appshell',
    kicker: 'Patterns',
    title: 'App Shell',
    intro: 'The Master Template Generator — sidebar, slide nav, presentation canvas, and edit toolbar.'
  }, React.createElement(PatternCard, {
    href: 'ui_kits/master-template-generator/index.html',
    tag: 'UI Kit',
    title: 'Master Template Generator',
    desc: 'The full interactive application shell, composed from these components.'
  })), React.createElement(Section, {
    id: 'slidetemplates',
    kicker: 'Patterns',
    title: 'Slide Templates',
    intro: 'The 14-template Master Presentation — the editorial deck the product generates.'
  }, React.createElement(PatternCard, {
    href: 'slides/index.html',
    tag: 'Deck',
    title: 'Master Presentation · 14 templates',
    desc: 'Cover, Executive Summary, Data Monument, Metrics, Roadmap, Quote, Exit and more.'
  })), React.createElement('footer', {
    style: {
      borderTop: '1px solid var(--border-default)',
      paddingTop: 28,
      marginTop: 24,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-faint)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, React.createElement('span', null, 'DESIGN_SYSTEM_STUDIO DESIGN SYSTEM'), React.createElement('span', null, 'PROPRIETARY AND CONFIDENTIAL'))), toastNode));
}
const __rootEl = document.getElementById('root');
window.DesignSystemStudioDSRoot = window.DesignSystemStudioDSRoot || ReactDOM.createRoot(__rootEl);
window.DesignSystemStudioDSRoot.render(React.createElement(App));
})(); } catch (e) { __ds_ns.__errors.push({ path: "designsystem.app.jsx", error: String((e && e.message) || e) }); }

// slides/slideRenderers.jsx
try { (() => {
/* Design System Studio Master Presentation — the 14 slide templates, faithfully recreated from
   PresentationCanvas.tsx and populated with the PlanView sample Business Record.
   Exposes window.DesignSystemStudioSlides. Depends on the DS bundle (SlideFrame, Eyebrow,
   HudBar, MetricValue) being loaded first. */
(function () {
  const NS = window.DesignSystemStudio || {};
  const {
    SlideFrame,
    Eyebrow,
    HudBar,
    MetricValue
  } = NS;
  const h = React.createElement;
  const AB = window.DESIGN_SYSTEM_STUDIO_ASSET_BASE || '../assets/';
const DISPLAY = {
    fontFamily: 'var(--font-display)',
    lineHeight: 0.85,
    letterSpacing: '-0.05em'
  };
  const bodyMuted = {
    fontSize: 32,
    lineHeight: 1.5,
    color: 'var(--neutral-500)',
    whiteSpace: 'pre-line'
  };
  const PAD = '160px 140px';

  /* ---- s1 Cover ---- */
  function TitleSlide() {
    return h(SlideFrame, {
      glow: true
    }, h(HudBar, {
      label: 'Design System Studio',
      num: '2026 // Q3 Architecture'
    }), h('div', {
      style: {
        padding: '280px 140px',
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, null, 'Enterprise UI Platform Proposal'), h('h1', {
      style: {
        ...DISPLAY,
        fontSize: 180,
        fontWeight: 700,
        color: 'var(--neutral-900)',
        marginTop: 30
      }
    }, 'Design Token', h('br'), h('span', {
      style: {
        color: 'var(--neutral-300)'
      }
    }, 'Architecture.')), h('div', {
      style: {
        marginTop: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 40
      }
    }, h('div', {
      style: {
        width: 120,
        height: 1,
        background: 'var(--brand-500)'
      }
    }), h('p', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: '0.25em',
        color: 'var(--neutral-500)',
        maxWidth: 720
      }
    }, 'Scaling design token adoption across cross-functional engineering and product teams.'))), h('div', {
      style: {
        position: 'absolute',
        bottom: 60,
        left: 80,
        right: 80,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--neutral-400)',
        zIndex: 10
      }
    }, h('span', null, 'MIT LICENSE · STANDALONE SAAS EDITION'), h('span', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--neutral-900)'
      }
    }, 'Design System Studio')));
  }

  /* ---- s2 Index ---- */
  function IndexSlide() {
    const parts = [{
      n: '01',
      t: 'Executive Summary',
      d: 'High-level objective and alignment metrics.'
    }, {
      n: '02',
      t: 'Context & Landscape',
      d: 'Current vs. target operational environment.'
    }, {
      n: '03',
      t: 'Performance Engine',
      d: 'Reach, engagement, and temporal metrics.'
    }, {
      n: '04',
      t: 'Execution Pathway',
      d: 'Phased rollout roadmap and architectural protocol.'
    }];
    return h(SlideFrame, null, h(HudBar, {
      label: 'Index // Contents',
      num: '02'
    }), h('div', {
      style: {
        padding: PAD,
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, null, 'Structural Overview'), h('h2', {
      style: {
        ...DISPLAY,
        fontSize: 100,
        fontWeight: 600,
        margin: '30px 0 80px',
        color: 'var(--neutral-900)'
      }
    }, 'Agenda & Framing.'), h('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px 80px'
      }
    }, parts.map(p => h('div', {
      key: p.n,
      style: {
        borderTop: '1px solid var(--neutral-200)',
        paddingTop: 24
      }
    }, h('div', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 14,
        color: 'var(--brand-500)',
        marginBottom: 8
      }
    }, p.n), h('h4', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 32,
        fontWeight: 600,
        margin: '10px 0',
        color: 'var(--neutral-900)'
      }
    }, p.t), h('p', {
      style: {
        fontSize: 18,
        color: 'var(--neutral-500)',
        lineHeight: 1.5
      }
    }, p.d))))));
  }

  /* ---- s3 Executive Summary ---- */
  function ExecutiveSummarySlide() {
    return h(SlideFrame, null, h(HudBar, {
      label: 'Executive Summary',
      num: '03'
    }), h('div', {
      style: {
        padding: PAD,
        position: 'relative',
        zIndex: 10
      }
    }, h('h2', {
      style: {
        ...DISPLAY,
        fontSize: 100,
        fontWeight: 600,
        marginBottom: 80,
        color: 'var(--neutral-900)',
        whiteSpace: 'pre-line'
      }
    }, 'Core Strategic\nObjective.'), h('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 120
      }
    }, h('p', {
      style: bodyMuted
    }, 'Fragmented UI components and hardcoded style overrides increase technical debt. This proposal establishes a central token architecture to unify design and engineering teams across all digital products.'), h('div', {
      style: {
        background: 'var(--neutral-50)',
        border: '1px solid var(--neutral-200)',
        padding: 60
      }
    }, h(Eyebrow, null, 'Proof Point'), h('p', {
      style: {
        color: 'var(--neutral-900)',
        fontSize: 32,
        fontWeight: 500,
        lineHeight: 1.5,
        marginTop: 24
      }
    }, 'Centralizing design tokens reduces frontend UI development cycles by up to 40% across engineering sprints.')))));
  }

  /* ---- s4 Section Divider (dark) ---- */
  function SectionDividerSlide() {
    return h(SlideFrame, {
      dark: true,
      showGrid: false
    }, h('div', {
      style: {
        position: 'absolute',
        top: 60,
        left: 80,
        zIndex: 10
      }
    }, h('span', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        fontWeight: 700,
        color: '#fff'
      }
    }, 'Design System Studio')), h('div', {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, {
      center: true
    }, 'Section Marker'), h('h1', {
      style: {
        ...DISPLAY,
        fontSize: 240,
        fontWeight: 700,
        color: '#fff',
        marginTop: 30
      }
    }, 'Design Architecture.'), h('p', {
      style: {
        color: 'rgba(255,255,255,0.4)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.38em',
        textTransform: 'uppercase',
        marginTop: 40,
        fontSize: 20,
        maxWidth: 1400
      }
    }, 'Establishing a single source of truth for design tokens, component primitives, and brand guidelines.')), h('div', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 600,
        fontWeight: 700,
        color: 'rgba(255,255,255,0.02)',
        position: 'absolute',
        bottom: -100,
        right: -50,
        lineHeight: 1,
        zIndex: 0
      }
    }, '04'));
  }

  /* ---- s5 Two-Column Context ---- */
  function TwoColumnSlide() {
    const attrs = ['Design tokens stored in scattered JSON files', 'Inconsistent component state styling in web apps', 'Manual handoffs creating continuous UI drift'];
    return h(SlideFrame, null, h(HudBar, {
      label: 'Strategic Context',
      num: '05'
    }), h('div', {
      style: {
        display: 'flex',
        height: '100%',
        position: 'relative',
        zIndex: 10
      }
    }, h('div', {
      style: {
        flex: 1,
        padding: '160px 100px 140px 140px',
        borderRight: '1px solid var(--neutral-200)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    }, h(Eyebrow, null, 'Current State'), h('h2', {
      style: {
        ...DISPLAY,
        fontSize: 72,
        fontWeight: 600,
        margin: '30px 0 40px',
        color: 'var(--neutral-900)',
        whiteSpace: 'pre-line'
      }
    }, 'Fragmented\nEnvironment.'), h('p', {
      style: {
        ...bodyMuted,
        marginBottom: 40
      }
    }, 'Product teams spend significant bandwidth manually updating visual styling and reconciling component variations across web applications.'), h('ul', {
      style: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        fontSize: 20,
        fontFamily: 'var(--font-mono)',
        color: 'var(--neutral-400)'
      }
    }, attrs.map((a, i) => h('li', {
      key: i,
      style: {
        marginBottom: 10
      }
    }, `[${String(i + 1).padStart(2, '0')}] ${a}`)))), h('div', {
      style: {
        flex: 1,
        padding: '160px 140px 140px 100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--neutral-50)'
      }
    }, h(Eyebrow, null, 'Target State'), h('h2', {
      style: {
        ...DISPLAY,
        fontSize: 72,
        fontWeight: 600,
        margin: '30px 0 40px',
        color: 'var(--neutral-900)',
        whiteSpace: 'pre-line'
      }
    }, 'Continuous\nGovernance.'), h('p', {
      style: {
        fontSize: 32,
        lineHeight: 1.5,
        color: 'var(--neutral-900)'
      }
    }, 'With Design System Studio, every product component consumes tokenized design decisions—ensuring instant accessibility compliance, seamless theme switching, and automated code export.'))));
  }

  /* ---- s6 Data Monument ---- */
  function DataMonumentSlide() {
    return h(SlideFrame, {
      glow: true
    }, h('div', {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 140,
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, null, 'Performance Metric'), h('div', {
      style: {
        marginTop: 40
      }
    }, h(MetricValue, {
      value: '100',
      unit: '%',
      heading: 'Token coverage across core component primitives.'
    })), h('p', {
      style: {
        marginTop: 60,
        maxWidth: 800,
        ...bodyMuted
      }
    }, 'All visual properties (colors, typography, spacing, radii) map directly to centralized design tokens without hardcoded values.')), h('div', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 600,
        fontWeight: 700,
        color: 'rgba(0,0,0,0.02)',
        position: 'absolute',
        bottom: -100,
        right: -50,
        lineHeight: 1,
        zIndex: 0
      }
    }, '06'));
  }

  /* ---- s7 Metrics Dashboard ---- */
  function MetricsSlide() {
    const bars = [{
      l: 'Sprint 1',
      p: 30
    }, {
      l: 'Sprint 2',
      p: 45
    }, {
      l: 'Sprint 3',
      p: 70
    }, {
      l: 'Sprint 4',
      p: 95,
      a: true
    }];
    const kpis = [{
      l: 'Active Tokens',
      v: '182'
    }, {
      l: 'UI Primitives',
      v: '18'
    }, {
      l: 'WCAG Pass Rate',
      v: '100%'
    }];
    return h(SlideFrame, null, h(HudBar, {
      label: 'Metrics Dashboard',
      num: '07'
    }), h('div', {
      style: {
        padding: PAD,
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, null, 'Temporal Performance'), h('div', {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 20,
        height: 350,
        borderBottom: '2px solid var(--neutral-900)',
        marginTop: 60
      }
    }, bars.map((b, i) => h('div', {
      key: i,
      style: {
        flex: 1,
        background: b.a ? 'var(--brand-500)' : 'var(--neutral-200)',
        height: `${b.p}%`,
        position: 'relative'
      }
    }, h('span', {
      style: {
        position: 'absolute',
        top: -40,
        left: 0,
        width: '100%',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 14,
        color: 'var(--neutral-500)'
      }
    }, b.l)))), h('div', {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        marginTop: 80,
        gap: 40
      }
    }, kpis.map((k, i) => h('div', {
      key: i
    }, h(Eyebrow, {
      size: 10
    }, k.l), h('h3', {
      style: {
        ...DISPLAY,
        fontSize: 64,
        fontWeight: 600,
        marginTop: 12,
        color: 'var(--neutral-900)'
      }
    }, k.v))))));
  }

  /* ---- s8 Comparative Table ---- */
  function ComparativeTableSlide() {
    const rows = [['Token Governance', 'Manual JSON', 'Central Workbench', 'Automated'], ['Theme Support', 'Hardcoded', 'Light & Dark Sync', 'Dynamic'], ['Code Export', 'Manual Handoff', 'CSS & W3C DTCG JSON', 'Instant'], ['Accessibility', 'Ad-hoc Audits', 'WCAG Contrast Shield', 'Built-in']];
    const cell = {
      padding: '35px 0',
      borderBottom: '1px solid var(--neutral-200)',
      fontSize: 28,
      color: 'var(--neutral-900)',
      textAlign: 'left'
    };
    return h(SlideFrame, null, h(HudBar, {
      label: 'Comparative Framework',
      num: '08'
    }), h('div', {
      style: {
        padding: PAD,
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, null, 'Benchmark Comparison'), h('table', {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: 40
      }
    }, h('thead', null, h('tr', null, ['Analysis Category', 'Current', 'Target', 'Outcome'].map(hd => h('th', {
      key: hd,
      style: {
        textAlign: 'left',
        padding: '25px 0',
        borderBottom: '2px solid var(--neutral-900)',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--neutral-500)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em'
      }
    }, hd)))), h('tbody', null, rows.map((r, i) => h('tr', {
      key: i
    }, h('td', {
      style: cell
    }, r[0]), h('td', {
      style: cell
    }, r[1]), h('td', {
      style: cell
    }, r[2]), h('td', {
      style: {
        ...cell,
        color: 'var(--brand-600)'
      }
    }, r[3])))))));
  }

  /* ---- s9 Strategic Roadmap ---- */
  function RoadmapSlide() {
    const phases = [{
      t: 'Foundations',
      d: 'Establish primitive token architecture, typography scales, and spatial grid systems.',
      done: true
    }, {
      t: 'Components',
      d: 'Build accessibility-compliant core UI primitives and interactive staging previews.',
      done: false
    }, {
      t: 'Scale & Export',
      d: 'Deploy multi-theme switching, DTCG JSON token exports, and team documentation.',
      done: false
    }];
    return h(SlideFrame, null, h(HudBar, {
      label: 'Execution Timeline',
      num: '09'
    }), h('div', {
      style: {
        padding: PAD,
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, null, 'Milestone Projection'), h('h2', {
      style: {
        ...DISPLAY,
        fontSize: 100,
        fontWeight: 600,
        margin: '30px 0 120px',
        color: 'var(--neutral-900)'
      }
    }, 'Pathway to Execution.'), h('div', {
      style: {
        position: 'relative',
        paddingTop: 60
      }
    }, h('div', {
      style: {
        position: 'absolute',
        top: 12,
        left: 0,
        right: 0,
        height: 2,
        background: 'var(--neutral-200)',
        zIndex: 1
      }
    }), h('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, phases.map((p, i) => h('div', {
      key: i,
      style: {
        width: 500,
        position: 'relative'
      }
    }, h('div', {
      style: {
        width: 24,
        height: 24,
        background: p.done ? 'var(--brand-500)' : 'var(--neutral-300)',
        borderRadius: '50%',
        position: 'relative',
        zIndex: 2
      }
    }), h('div', {
      style: {
        marginTop: 30
      }
    }, h(Eyebrow, {
      size: 12
    }, 'Phase ' + String(i + 1).padStart(2, '0')), h('h4', {
      style: {
        ...DISPLAY,
        fontSize: 32,
        fontWeight: 600,
        margin: '12px 0 15px',
        color: 'var(--neutral-900)'
      }
    }, p.t), h('p', {
      style: {
        fontSize: 18,
        lineHeight: 1.5,
        color: 'var(--neutral-500)'
      }
    }, p.d))))))));
  }

  /* ---- s10 Image Editorial ---- */
  function ImageEditorialSlide() {
    return h(SlideFrame, null, h('div', {
      style: {
        display: 'flex',
        height: '100%',
        position: 'relative',
        zIndex: 10
      }
    }, h('div', {
      style: {
        flex: 1,
        padding: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    }, h(Eyebrow, null, 'Insight'), h('h2', {
      style: {
        ...DISPLAY,
        fontSize: 100,
        fontWeight: 600,
        margin: '30px 0',
        color: 'var(--neutral-900)'
      }
    }, 'Single Source of Truth.'), h('p', {
      style: bodyMuted
    }, 'Tokens define design decisions once, powering components, themes, documentation, and exports simultaneously.')), h('div', {
      style: {
        flex: 1.2,
        background: 'var(--neutral-100)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, h('span', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--neutral-400)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em'
      }
    }, 'System Architecture Diagram'), h('div', {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg,#fff 0%,transparent 20%)'
      }
    }))));
  }

  /* ---- s11 Process Architecture ---- */
  function ProcessSlide() {
    const steps = [{
      t: 'Define',
      d: 'Establish global primitives for color scales, spatial tokens, and typography.'
    }, {
      t: 'Compose',
      d: 'Bind semantic tokens to reusable UI component primitives with state management.'
    }, {
      t: 'Export',
      d: 'Generate production-ready CSS variables and DTCG JSON tokens for web applications.'
    }];
    return h(SlideFrame, null, h(HudBar, {
      label: 'System Logic',
      num: '10'
    }), h('div', {
      style: {
        padding: PAD,
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, null, 'Architectural Protocol'), h('h2', {
      style: {
        ...DISPLAY,
        fontSize: 100,
        fontWeight: 600,
        margin: '30px 0 80px',
        color: 'var(--neutral-900)'
      }
    }, 'Operational Flow.'), h('div', {
      style: {
        display: 'flex',
        gap: 40,
        alignItems: 'flex-start'
      }
    }, steps.map((s, i) => h('div', {
      key: i,
      style: {
        flex: 1,
        border: `1px solid ${i === 1 ? 'var(--brand-500)' : 'var(--neutral-200)'}`,
        padding: 40,
        marginTop: i * 40
      }
    }, h('div', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 48,
        color: 'var(--brand-500)',
        marginBottom: 20
      }
    }, String(i + 1).padStart(2, '0')), h('h4', {
      style: {
        ...DISPLAY,
        fontSize: 32,
        fontWeight: 600,
        marginBottom: 15,
        color: 'var(--neutral-900)'
      }
    }, s.t), h('p', {
      style: {
        fontSize: 18,
        lineHeight: 1.5,
        color: 'var(--neutral-500)'
      }
    }, s.d))))));
  }

  /* ---- s12 Global Reach Map ---- */
  function GlobalMapSlide() {
    const sectors = [{
      l: 'Americas',
      v: 'Production Ready'
    }, {
      l: 'EMEA',
      v: 'Token Standard'
    }, {
      l: 'APAC',
      v: 'Multi-Theme Sync'
    }];
    return h(SlideFrame, null, h(HudBar, {
      label: 'Reach Distribution',
      num: '11'
    }), h('div', {
      style: {
        padding: PAD,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10
      }
    }, h('h2', {
      style: {
        ...DISPLAY,
        fontSize: 100,
        fontWeight: 600,
        marginBottom: 60,
        color: 'var(--neutral-900)'
      }
    }, 'Global Deployment.'), h('div', {
      style: {
        flex: 1,
        position: 'relative',
        background: 'var(--neutral-100)',
        border: '1px solid var(--neutral-200)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, h('span', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--neutral-400)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em'
      }
    }, 'Geographic Visualisation Placeholder'), [{
      top: '35%',
      left: '22%'
    }, {
      top: '45%',
      left: '62%'
    }].map((pos, i) => h('div', {
      key: i,
      style: {
        position: 'absolute',
        ...pos,
        width: 20,
        height: 20,
        background: 'var(--brand-500)',
        borderRadius: '50%',
        boxShadow: '0 0 40px var(--brand-500)'
      }
    }))), h('div', {
      style: {
        display: 'flex',
        gap: 100,
        marginTop: 40
      }
    }, sectors.map((s, i) => h('div', {
      key: i
    }, h(Eyebrow, {
      size: 10
    }, s.l), h('h4', {
      style: {
        ...DISPLAY,
        fontSize: 24,
        fontWeight: 600,
        marginTop: 12,
        color: 'var(--neutral-900)'
      }
    }, s.v))))));
  }

  /* ---- s13 Featured Quote ---- */
  function QuoteSlide() {
    return h(SlideFrame, {
      glow: true
    }, h('div', {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 140px',
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, null, 'Key Insight'), h('h1', {
      style: {
        ...DISPLAY,
        fontSize: 110,
        fontWeight: 700,
        margin: '30px 0 60px',
        color: 'var(--neutral-900)'
      }
    }, '"Establishing token-first architecture eliminated design drift and cut UI handoff friction across product teams."'), h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 30
      }
    }, h('div', {
      style: {
        width: 80,
        height: 80,
        background: 'var(--neutral-200)',
        borderRadius: '50%'
      }
    }), h('div', null, h('h4', {
      style: {
        ...DISPLAY,
        fontSize: 28,
        fontWeight: 700,
        color: 'var(--neutral-900)'
      }
    }, 'Design System Team'), h('p', {
      style: {
        fontSize: 18,
        fontFamily: 'var(--font-mono)',
        color: 'var(--neutral-500)'
      }
    }, 'Design System Studio Platform')))));
  }

  /* ---- s14 Exit (dark) ---- */
  function ExitSlide() {
    const contacts = ['hello@design-system-studio.com', '@design-system-studio', 'www.design-system-studio.com'];
    return h(SlideFrame, {
      dark: true,
      showGrid: false
    }, h('div', {
      style: {
        position: 'absolute',
        top: 60,
        left: 80,
        zIndex: 10
      }
    }, h('span', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        fontWeight: 700,
        color: '#fff'
      }
    }, 'Design System Studio')), h('div', {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 140,
        position: 'relative',
        zIndex: 10
      }
    }, h(Eyebrow, null, 'Next Steps'), h('h1', {
      style: {
        ...DISPLAY,
        fontSize: 240,
        fontWeight: 700,
        color: '#fff',
        margin: '30px 0'
      }
    }, 'Thank You.'), h('p', {
      style: {
        fontSize: 28,
        color: 'rgba(255,255,255,0.5)',
        maxWidth: 1000,
        lineHeight: 1.5,
        marginBottom: 60
      }
    }, 'Proposal and commercials to follow, including the Veeam partner-network case study and masked Salesforce campaign dashboards.'), h('div', {
      style: {
        display: 'flex',
        gap: 100
      }
    }, contacts.map((c, i) => h('span', {
      key: i,
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 20,
        color: '#fff',
        letterSpacing: '0.05em'
      }
    }, c)))));
  }
  window.DesignSystemStudioSlides = {
    TitleSlide,
    IndexSlide,
    ExecutiveSummarySlide,
    SectionDividerSlide,
    TwoColumnSlide,
    DataMonumentSlide,
    MetricsSlide,
    ComparativeTableSlide,
    RoadmapSlide,
    ImageEditorialSlide,
    ProcessSlide,
    GlobalMapSlide,
    QuoteSlide,
    ExitSlide,
    order: [['TitleSlide', 'Cover'], ['IndexSlide', 'Index / Contents'], ['ExecutiveSummarySlide', 'Executive Summary'], ['SectionDividerSlide', 'Section Divider'], ['TwoColumnSlide', 'Two-Column Context'], ['DataMonumentSlide', 'Data Monument'], ['MetricsSlide', 'Metrics Dashboard'], ['ComparativeTableSlide', 'Comparative Table'], ['RoadmapSlide', 'Strategic Roadmap'], ['ImageEditorialSlide', 'Image Editorial'], ['ProcessSlide', 'Process Architecture'], ['GlobalMapSlide', 'Global Reach Map'], ['QuoteSlide', 'Featured Quote'], ['ExitSlide', 'Exit / Thank You']]
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/slideRenderers.jsx", error: String((e && e.message) || e) }); }

// ui_kits/master-template-generator/Sidebar.jsx
try { (() => {
/* Master Template Generator — sidebar. Grouped slide nav with hover row
   actions, Source Material upload, Generate + Share. Exposes window.DesignSystemStudioKit.Sidebar. */
(function () {
  const NS = window.DesignSystemStudio || {};
  const {
    Button,
    IconButton,
    UploadZone
  } = NS;
  const h = React.createElement;
  function groupBy(slides) {
    const out = [];
    slides.forEach(s => {
      const last = out[out.length - 1];
      if (last && last.label === s.group) last.slides.push(s);else out.push({
        label: s.group,
        slides: [s]
      });
    });
    return out;
  }
  function NavRow({
    slide,
    num,
    active,
    onNav,
    onToggleHidden
  }) {
    const [hover, setHover] = React.useState(false);
    return h('div', {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick: () => !slide.hidden && onNav(slide.idx),
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: active ? 'var(--brand-50)' : hover ? 'var(--neutral-100)' : 'transparent',
        cursor: slide.hidden ? 'default' : 'pointer',
        transition: 'background .15s'
      }
    }, h('div', {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 12,
        padding: '9px 12px',
        flex: 1,
        minWidth: 0
      }
    }, h('span', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.1em',
        minWidth: 24,
        color: active ? 'var(--brand-600)' : slide.hidden ? 'var(--neutral-300)' : 'var(--neutral-400)'
      }
    }, slide.hidden ? '—' : num), h('span', {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textDecoration: slide.hidden ? 'line-through' : 'none',
        fontWeight: active ? 600 : 400,
        color: active ? 'var(--brand-700)' : slide.hidden ? 'var(--neutral-300)' : hover ? 'var(--neutral-900)' : 'var(--neutral-500)'
      }
    }, slide.title)), (hover || slide.hidden) && h('div', {
      onClick: e => e.stopPropagation(),
      style: {
        position: 'absolute',
        right: 4,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: 2,
        background: active ? 'var(--brand-50)' : 'var(--neutral-100)',
        paddingLeft: 4
      }
    }, h(IconButton, {
      icon: slide.hidden ? 'eye-off' : 'eye',
      label: slide.hidden ? 'Show' : 'Hide',
      onClick: () => onToggleHidden(slide.idx)
    }), h(IconButton, {
      icon: 'plus',
      label: 'Duplicate'
    }), h(IconButton, {
      icon: 'trash',
      tone: 'danger',
      label: 'Delete'
    })));
  }
  function Sidebar({
    slides,
    activeIndex,
    onNav,
    onToggleHidden,
    hasDoc,
    filename,
    onFile,
    shareOpen,
    onToggleShare
  }) {
    let vis = 0;
    const numbering = slides.map(s => s.hidden ? null : String(++vis).padStart(2, '0'));
    return h('aside', {
      style: {
        width: 236,
        flexShrink: 0,
        background: 'var(--pure-white)',
        borderRight: '1px solid var(--neutral-150)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    }, h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '22px 20px 18px',
        borderBottom: '1px solid var(--neutral-150)'
      }
    }, h('div', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--text-primary)'
      }
    }, 'Design System Studio')), h('div', {
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: '16px 12px'
      }
    }, groupBy(slides).map((g, gi) => h('div', {
      key: gi,
      style: {
        marginTop: gi === 0 ? 0 : 32
      }
    }, h('div', {
      style: {
        padding: '0 12px',
        marginBottom: 12,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: 'var(--neutral-400)'
      }
    }, g.label), h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, g.slides.map(s => h(NavRow, {
      key: s.idx,
      slide: s,
      num: numbering[s.idx],
      active: s.idx === activeIndex && !s.hidden,
      onNav,
      onToggleHidden
    })))))), h('div', {
      style: {
        padding: 16,
        borderTop: '1px solid var(--neutral-150)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        background: 'color-mix(in srgb, var(--neutral-50) 50%, transparent)'
      }
    }, h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, h('div', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--neutral-400)'
      }
    }, 'Source Material'), h(UploadZone, {
      filename,
      onFileSelect: onFile
    })), h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, h(Button, {
      variant: 'primary',
      fullWidth: true,
      disabled: !hasDoc
    }, 'Generate Deck'), h(Button, {
      variant: 'secondary',
      fullWidth: true,
      iconLeft: 'share',
      iconRight: 'chevron-down',
      disabled: !hasDoc,
      onClick: onToggleShare
    }, 'Share'), shareOpen && hasDoc && h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        marginTop: 2
      }
    }, h(Button, {
      variant: 'outline',
      size: 'sm',
      fullWidth: true,
      iconLeft: 'download',
      style: {
        justifyContent: 'flex-start',
        fontWeight: 600
      }
    }, 'Export PDF'), h(Button, {
      variant: 'outline',
      size: 'sm',
      fullWidth: true,
      iconLeft: 'download',
      style: {
        justifyContent: 'flex-start',
        fontWeight: 600
      }
    }, 'Export PPTX'), h(Button, {
      variant: 'outline',
      size: 'sm',
      fullWidth: true,
      iconLeft: 'link',
      style: {
        justifyContent: 'flex-start',
        fontWeight: 600
      }
    }, 'Copy Share Link')))));
  }
  window.DesignSystemStudioKit = {
    Sidebar
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/master-template-generator/Sidebar.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.UploadZone = __ds_scope.UploadZone;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.HudBar = __ds_scope.HudBar;

__ds_ns.MetricValue = __ds_scope.MetricValue;

__ds_ns.SlideFrame = __ds_scope.SlideFrame;

})();
