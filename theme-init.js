/* ============================================================
   DESIGN_SYSTEM_STUDIO - THEME INIT
   Single source of theme state for every page in the system.
   Load this as a BLOCKING <script> in <head> (before <body>) so
   the saved theme is applied before first paint — no flash.

   Default is LIGHT: dark mode is opt-in. A fresh visitor with no
   saved preference sees light (we intentionally do NOT follow the
   OS prefers-color-scheme). Once a user toggles, the choice is
   remembered in localStorage and shared across every page.
   ============================================================ */
(function () {
  var KEY = 'design-system-studio-theme';
  var global_DSColor = window.DSColor;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode, ignore */ }
  }
  function apply(theme) {
    var root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      root.style.removeProperty('--action-primary');
      root.style.removeProperty('--action-primary-hover');
      root.style.removeProperty('--action-primary-active');
      root.style.removeProperty('--neutral-900');
      root.style.removeProperty('--surface-canvas');
    } else if (theme === 'hc') {
      root.setAttribute('data-theme', 'hc');
      root.style.removeProperty('--action-primary');
      root.style.removeProperty('--action-primary-hover');
      root.style.removeProperty('--action-primary-active');
      root.style.removeProperty('--neutral-900');
      root.style.removeProperty('--surface-canvas');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function applyDynamicTokens() {
    try {
      var savedBrand = localStorage.getItem('ds-active-brand');
      var savedAccent = localStorage.getItem('ds-active-accent');
      
      /* Scale math lives in ds-color.js (OKLCH). If that script failed to
         load, skip regeneration rather than fall back to a different colour
         space - a silently different ramp is worse than the CSS defaults. */
      function applyScale(seedHex, type) {
        if (!global_DSColor || !seedHex) return;
        var scale = global_DSColor.generateScale(seedHex, type);
        Object.keys(scale).forEach(function (prop) {
          document.documentElement.style.setProperty(prop, scale[prop]);
        });
      }

      applyScale(savedBrand, 'brand');
      applyScale(savedAccent, 'accent');

      // Dynamic Font Restoration
      var savedDisplayFont = localStorage.getItem('ds-font-display');
      var savedSansFont = localStorage.getItem('ds-font-sans');
      var savedMonoFont = localStorage.getItem('ds-font-mono');

      function loadFont(fontName) {
        if (!fontName) return;
        var cleanName = fontName.replace(/["']/g, '').trim();
        var fontId = 'gf-' + cleanName.toLowerCase().replace(/\s+/g, '-');
        if (!document.getElementById(fontId)) {
          var link = document.createElement('link');
          link.id = fontId;
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(cleanName) + ':wght@400;500;600;700;900&display=swap';
          document.head.appendChild(link);
        }
      }

      if (savedDisplayFont) {
        loadFont(savedDisplayFont);
        document.documentElement.style.setProperty('--font-display', '"' + savedDisplayFont + '", sans-serif');
      }
      if (savedSansFont) {
        loadFont(savedSansFont);
        document.documentElement.style.setProperty('--font-sans', '"' + savedSansFont + '", sans-serif');
      }
      if (savedMonoFont) {
        loadFont(savedMonoFont);
        document.documentElement.style.setProperty('--font-mono', '"' + savedMonoFont + '", monospace');
      }
    } catch(e) {}
  }

  // Apply saved preference immediately (before paint).
  var saved = read() || 'light';
  apply(saved);
  applyDynamicTokens();

  window.DesignSystemStudioTheme = {
    get: function () { return read() || 'light'; },
    set: function (theme) {
      write(theme);
      apply(theme);
      applyDynamicTokens();
      return theme;
    },
    restoreDynamicTokens: applyDynamicTokens,
  };
})();
