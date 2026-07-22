/* ============================================================
   GRID GLOW — cursor-reactive grid background
   ------------------------------------------------------------
   A faint editorial grid behind your content whose cells softly
   glow as the cursor passes over them: the hovered cell lights
   up and holds, and each cell you leave fades out in place,
   leaving a gentle trail of glowing boxes.

   • Zero dependencies. One file. Vanilla JS + injected CSS.
   • Works in light & dark (grid line color swaps on a root attr).
   • Respects prefers-reduced-motion.
   • Cheap: rAF-throttled, elements are pooled and reused.

   USAGE
   -----
   1. Include after your content mounts:
        <script src="grid-glow.js"></script>
   2. Make sure your app/content sits ABOVE the background layers
      (they render at z-index 0), e.g. give your root wrapper:
        position: relative; z-index: 1;
   3. Tweak the CONFIG block below. That's it.

   Dark mode: set `data-theme="dark"` on <html> (or change
   CONFIG.darkSelector) and the grid line color swaps automatically.

   These are the exact values used in the Design System Studio.
   ============================================================ */
(function () {
  var CONFIG = {
    color:         '#10b981',            // glow + grid accent (any CSS color)
    cellSize:      120,                  // grid cell size in px
    gridLineLight: 'rgba(0,0,0,0.03)',   // grid line color (light theme)
    gridLineDark:  'rgba(255,255,255,0.055)', // grid line color (dark theme)
    glowCenter:    0.09,                 // 0–1 alpha of the central bloom
    glowBase:      0.03,                 // 0–1 alpha of the full-cell base fill
    fadeIn:        300,                  // ms — cell lights up
    fadeOut:       850,                  // ms — cell fades after you leave it (trail length)
    zIndex:        0,                    // stacking level of the background layers
    darkSelector:  'html[data-theme="dark"]', // when this matches, use gridLineDark
  };

  function init() {
    var C = CONFIG;
    var CELL = C.cellSize;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fadeIn = reduce ? 120 : C.fadeIn;
    var fadeOut = reduce ? 200 : C.fadeOut;
    var pct = function (a) { return (a * 100) + '%'; };

    // Orb-style fill: soft central bloom over a faint full-cell base,
    // so the whole square glows without a hard circle edge.
    var GLOW_BG =
      'radial-gradient(circle at center, color-mix(in srgb, ' + C.color + ' ' + pct(C.glowCenter) + ', transparent) 0%, transparent 72%),' +
      'linear-gradient(color-mix(in srgb, ' + C.color + ' ' + pct(C.glowBase) + ', transparent), color-mix(in srgb, ' + C.color + ' ' + pct(C.glowBase) + ', transparent))';

    // --- Grid background layer + line-color theming ---
    var style = document.createElement('style');
    style.textContent =
      '.design-system-studio-grid-layer{position:fixed;inset:0;z-index:' + C.zIndex + ';pointer-events:none;' +
        '--wg-line:' + C.gridLineLight + ';' +
        'background-image:linear-gradient(var(--wg-line) 1px,transparent 1px),linear-gradient(90deg,var(--wg-line) 1px,transparent 1px);' +
        'background-size:' + CELL + 'px ' + CELL + 'px}' +
      C.darkSelector + ' .design-system-studio-grid-layer{--wg-line:' + C.gridLineDark + '}' +
      '.design-system-studio-grid-glow{position:fixed;inset:0;z-index:' + C.zIndex + ';pointer-events:none;overflow:hidden}';
    document.head.appendChild(style);

    var grid = document.createElement('div');
    grid.className = 'design-system-studio-grid-layer';
    grid.setAttribute('aria-hidden', 'true');
    document.body.appendChild(grid);

    var layer = document.createElement('div');
    layer.className = 'design-system-studio-grid-glow';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);

    // --- Per-cell glow with pooled elements ---
    var pool = [];
    function acquire() {
      var el = pool.pop();
      if (!el) {
        el = document.createElement('div');
        el.style.cssText = 'position:absolute;top:0;left:0;width:' + CELL + 'px;height:' + CELL + 'px;background:' + GLOW_BG + ';opacity:0;will-change:opacity';
        layer.appendChild(el);
      }
      return el;
    }
    function makeGlow(cx, cy) {
      var el = acquire();
      el.style.transition = 'none';
      el.style.transform = 'translate(' + (cx * CELL) + 'px,' + (cy * CELL) + 'px)';
      el.style.opacity = '0';
      void el.offsetWidth; // commit start state before fading in
      el.style.transition = 'opacity ' + fadeIn + 'ms ease';
      el.style.opacity = '1';
      return el;
    }
    function fadeOut_(el) {
      if (!el) return;
      el.style.transition = 'opacity ' + fadeOut + 'ms linear';
      el.style.opacity = '0';
      setTimeout(function () { pool.push(el); }, fadeOut + 40);
    }

    var current = null, curKey = null, raf = 0, mx = 0, my = 0;
    function tick() {
      raf = 0;
      var cx = Math.floor(mx / CELL), cy = Math.floor(my / CELL), key = cx + ',' + cy;
      if (key === curKey) return;
      curKey = key;
      fadeOut_(current);           // the cell we just left fades out in place
      current = makeGlow(cx, cy);  // the cell we entered lights up and holds
    }
    function leave() { fadeOut_(current); current = null; curKey = null; }

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });
    document.addEventListener('mouseleave', leave);
    window.addEventListener('blur', leave);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
