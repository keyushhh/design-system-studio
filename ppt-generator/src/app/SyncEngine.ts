/**
 * SyncEngine
 * Synchronizes the Master PPT Generator's visual styling (tokens, themes, fonts)
 * with the parent Design System Studio via localStorage events.
 */

import { readStudioTheme, subscribeStudioTokens } from './studioTheme';

export class SyncEngine {
  /**
   * Initialize the sync engine. Applies current styles immediately,
   * then listens for cross-window/iframe storage events.
   */
  static init() {
    this.apply();
    subscribeStudioTokens(() => this.apply());
    // localStorage writes made while this page was hidden don't fire `storage`
    // here, so re-sync whenever the tab comes back to the foreground.
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.apply();
    });
  }

  private static apply() {
    this.applyDynamicTokens();
    this.applyTheme();
  }

  private static applyTheme() {
    const theme = readStudioTheme();
    const root = document.documentElement;

    // The generator has no dedicated high-contrast sheet; `hc` is a dark canvas
    // in the studio, so render it as dark rather than silently falling back to
    // light chrome (which is what produced unreadable controls).
    if (theme === 'dark' || theme === 'hc') {
      root.setAttribute('data-theme', 'dark');
      root.setAttribute('data-studio-theme', theme);
    } else {
      root.setAttribute('data-theme', 'light');
      root.setAttribute('data-studio-theme', 'light');
    }
  }

  private static applyDynamicTokens() {
    try {
      const savedBrand = localStorage.getItem('ds-active-brand');
      const savedAccent = localStorage.getItem('ds-active-accent');

      if (savedBrand) this.generateScale(savedBrand, 'emerald'); // Maps to PPT generator's primary color
      if (savedAccent) {
        // `secondary` and `accent` are two names for the same studio accent
        // seed in this app's token map; drive both so no component is left
        // painting the stale built-in indigo.
        this.generateScale(savedAccent, 'secondary');
        this.generateScale(savedAccent, 'accent');
      }

      const savedDisplayFont = localStorage.getItem('ds-font-display');
      const savedSansFont = localStorage.getItem('ds-font-sans');
      const savedMonoFont = localStorage.getItem('ds-font-mono');

      if (savedDisplayFont) {
        this.loadFont(savedDisplayFont);
        document.documentElement.style.setProperty('--font-display', `"${savedDisplayFont}", sans-serif`);
      }
      if (savedSansFont) {
        this.loadFont(savedSansFont);
        document.documentElement.style.setProperty('--font-sans', `"${savedSansFont}", sans-serif`);
      }
      if (savedMonoFont) {
        this.loadFont(savedMonoFont);
        document.documentElement.style.setProperty('--font-mono', `"${savedMonoFont}", monospace`);
      }
    } catch (e) {
      // Ignore
    }
  }

  private static loadFont(fontName: string) {
    if (!fontName) return;
    const cleanName = fontName.replace(/["']/g, '').trim();
    const fontId = 'gf-' + cleanName.toLowerCase().replace(/\s+/g, '-');
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(cleanName) + ':wght@400;500;600;700;900&display=swap';
      document.head.appendChild(link);
    }
  }

  private static hexToHsl(hex: string): [number, number, number] {
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

  private static hslToHex(h: number, s: number, l: number): string {
    s /= 100; l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  }

  private static generateScale(hexColor: string, type: 'emerald' | 'secondary' | 'accent') {
    const [h, s, l] = this.hexToHsl(hexColor);

    // Use the same lightness mapping as the parent Design System Studio
    // 650 is a real step in this app's token map (--color-*-650); leaving it out
    // pinned those surfaces to the built-in emerald no matter what brand was picked.
    const lightnessMap: Record<string, number> = type === 'emerald' ? {
      50: 95, 100: 90, 200: 80, 300: 68, 400: 55, 500: l, 600: Math.max(10, l - 10), 650: Math.max(9, l - 14), 700: Math.max(8, l - 18), 800: Math.max(6, l - 24), 900: Math.max(4, l - 30), 950: Math.max(2, l - 35)
    } : {
      50: 96, 100: 91, 200: 82, 300: 70, 400: 58, 500: l, 600: Math.max(10, l - 10), 650: Math.max(9, l - 14), 700: Math.max(8, l - 18), 800: Math.max(6, l - 24), 900: Math.max(4, l - 30), 950: Math.max(2, l - 35)
    };

    Object.keys(lightnessMap).forEach(step => {
      document.documentElement.style.setProperty(`--${type}-${step}`, this.hslToHex(h, s, lightnessMap[step]));
    });
    
    document.documentElement.style.setProperty(`--${type}-500`, hexColor);
  }
}
