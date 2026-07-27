/**
 * studioTheme
 * One place that knows how the parent Design System Studio persists its theme.
 *
 * The studio writes the same value under two keys (`ds-theme` is the newer one,
 * `design-system-studio-theme` is what theme-init.js reads before first paint).
 * Reading only one of them is how the generator ended up rendering light chrome
 * after the studio was switched to dark, so always consult both.
 */

export type StudioTheme = 'light' | 'dark' | 'hc';

const THEME_KEYS = ['ds-theme', 'design-system-studio-theme'] as const;

/** Fired by the studio (and by us) when brand/accent/theme change in this tab. */
export const TOKENS_UPDATED_EVENT = 'ds-tokens-updated';

export function readStudioTheme(): StudioTheme {
  try {
    for (const key of THEME_KEYS) {
      const value = localStorage.getItem(key);
      if (value === 'dark' || value === 'hc' || value === 'light') return value;
    }
  } catch {
    /* private mode - fall through to the default */
  }
  return 'light';
}

/** True for any theme whose canvas is dark (dark and high-contrast both are). */
export function isStudioThemeDark(theme: StudioTheme = readStudioTheme()): boolean {
  return theme === 'dark' || theme === 'hc';
}

/**
 * Subscribe to theme/token changes from either another tab (`storage`) or this
 * one (`ds-tokens-updated`). Returns an unsubscribe function.
 */
export function subscribeStudioTokens(onChange: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key.startsWith('ds-') || e.key === 'design-system-studio-theme') onChange();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(TOKENS_UPDATED_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(TOKENS_UPDATED_EVENT, onChange);
  };
}
