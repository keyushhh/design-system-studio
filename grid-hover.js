/* ============================================================
   DESIGN_SYSTEM_STUDIO - GRID CELL HOVER GLOW
   The background grid is a CSS layer (not real boxes) and it sits
   behind the app, so CSS :hover can't reach it. Instead we track
   the pointer and light up whichever 120px cell it's in: the cell
   under the cursor holds a soft emerald glow, and as the pointer
   moves, each cell it leaves fades out in place - a gentle trail of
   glowing boxes rather than one cursor-following light.
   ============================================================ */
(function () {
  function init() {
    var CELL = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--grid-cell-size'), 10) || 120;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var FADE_IN = reduce ? 120 : 300;   // cell lights up
    var FADE_OUT = reduce ? 200 : 850;   // cell fades after you leave it (slow, fluid)

    // Orb-style fill: soft central bloom over a faint full-cell base,
    // so the whole square glows without a hard circle edge.
    var GLOW_BG = 'radial-gradient(circle at center, color-mix(in srgb, var(--brand-500) 9%, transparent) 0%, transparent 72%), linear-gradient(color-mix(in srgb, var(--brand-500) 3%, transparent), color-mix(in srgb, var(--brand-500) 3%, transparent))';

    var layer = document.createElement('div');
    layer.id = 'design-system-studio-grid-glow';
    layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden';
    document.body.appendChild(layer);

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
      void el.offsetWidth; // commit the starting state before fading in
      el.style.transition = 'opacity ' + FADE_IN + 'ms ease';
      el.style.opacity = '1';
      return el;
    }
    function fadeOut(el) {
      if (!el) return;
      el.style.transition = 'opacity ' + FADE_OUT + 'ms linear';
      el.style.opacity = '0';
      setTimeout(function () { pool.push(el); }, FADE_OUT + 40);
    }

    var current = null, curKey = null, raf = 0, mx = 0, my = 0;
    function tick() {
      raf = 0;
      var cx = Math.floor(mx / CELL), cy = Math.floor(my / CELL), key = cx + ',' + cy;
      if (key === curKey) return;
      curKey = key;
      fadeOut(current);          // the cell we just left fades out in place
      current = makeGlow(cx, cy); // the cell we entered lights up and holds
    }
    function leave() { fadeOut(current); current = null; curKey = null; }

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
