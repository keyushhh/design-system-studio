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
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme'); // light = absence of the attribute
  }

  // Apply saved preference immediately (before paint). Default: light.
  var saved = read() === 'dark' ? 'dark' : 'light';
  apply(saved);

  window.Design System StudioTheme = {
    get: function () { return read() === 'dark' ? 'dark' : 'light'; },
    set: function (theme) {
      var t = theme === 'dark' ? 'dark' : 'light';
      write(t);
      apply(t);
      return t;
    },
    toggle: function () {
      return window.Design System StudioTheme.set(window.Design System StudioTheme.get() === 'dark' ? 'light' : 'dark');
    },
  };
})();
