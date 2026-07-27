/**
 * SyncEngine
 * Synchronizes the Master PPT Generator's visual styling (tokens, themes, fonts)
 * with the parent Design System Studio via localStorage events.
 */

import { readStudioTheme, subscribeStudioTokens } from './studioTheme';
import { generateScale } from './dsColor';

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

      if (savedBrand) this.applyScale(savedBrand, 'emerald'); // Maps to PPT generator's primary color
      if (savedAccent) {
        // `secondary` and `accent` are two names for the same studio accent
        // seed in this app's token map; drive both so no component is left
        // painting the stale built-in indigo.
        this.applyScale(savedAccent, 'secondary');
        this.applyScale(savedAccent, 'accent');
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

  /**
   * Ramp generation is delegated to the shared OKLCH engine so this app and
   * the studio derive byte-identical scales from the same seed. A second
   * implementation here is how the two drifted apart before.
   */
  private static applyScale(hexColor: string, type: 'emerald' | 'secondary' | 'accent') {
    const scale = generateScale(hexColor, type);
    Object.keys(scale).forEach((prop) => {
      document.documentElement.style.setProperty(prop, scale[prop]);
    });
  }
}
