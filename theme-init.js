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
        Object.keys(lightnessMap).forEach(step => {
          document.documentElement.style.setProperty(`--${type}-${step}`, hslToHex(h, s, lightnessMap[step]));
        });
        document.documentElement.style.setProperty(`--${type}-500`, hexColor);
      }

      if (savedBrand) generateScale(savedBrand, 'brand');
      if (savedAccent) generateScale(savedAccent, 'accent');

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
