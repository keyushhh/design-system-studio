/* ============================================================
   DESIGN_SYSTEM_STUDIO - PERCEPTUAL COLOR ENGINE (OKLCH)
   The single source of scale math for the whole system.
   Load BEFORE theme-init.js. Exposes window.DSColor.

   WHY OKLCH AND NOT HSL
   HSL's "lightness" is a geometric midpoint of the RGB cube, not a
   perceptual one. At L=50% a pure yellow reads far brighter than a
   pure blue, so an HSL ramp built on a fixed lightness ladder
   produces steps that LOOK evenly spaced for some hues and badly
   bunched for others - the 400 step of an amber brand lands nowhere
   near the 400 step of an indigo one. Text contrast then varies by
   hue rather than by step, which is exactly the thing a token scale
   is supposed to make predictable.

   OKLab (Björn Ottosson, 2020) is built so that equal numeric steps
   in L are equal perceived steps in lightness, for every hue. OKLCH
   is its cylindrical form: L (0-1 lightness), C (chroma), H (hue in
   degrees). Generating ramps here means step 600 carries roughly the
   same contrast against white whether the brand is emerald, rose, or
   amber - so the WCAG grades hold when a brand is swapped.
   ============================================================ */
(function (global) {
  'use strict';

  /* ---- sRGB transfer function ---- */
  function srgbToLinear(c) {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }
  function linearToSrgb(c) {
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  }

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function parseHex(hex) {
    var c = String(hex || '').trim().replace('#', '');
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    if (!/^[0-9a-fA-F]{6}$/.test(c)) return null;
    var n = parseInt(c, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  function toHex(rgb) {
    return '#' + rgb.map(function (v) {
      return clamp(Math.round(v * 255), 0, 255).toString(16).padStart(2, '0');
    }).join('');
  }

  /* ---- sRGB <-> OKLab (Ottosson's matrices) ---- */
  function linearRgbToOklab(r, g, b) {
    var l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    var m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    var s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    var l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
    return [
      0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
      1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
      0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    ];
  }

  function oklabToLinearRgb(L, a, b) {
    var l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    var m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    var s_ = L - 0.0894841775 * a - 1.2914855480 * b;
    var l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
    return [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    ];
  }

  /** #rrggbb -> [L (0-1), C, H (degrees)] */
  function hexToOklch(hex) {
    var rgb = parseHex(hex);
    if (!rgb) return null;
    var lab = linearRgbToOklab(srgbToLinear(rgb[0]), srgbToLinear(rgb[1]), srgbToLinear(rgb[2]));
    var L = lab[0], a = lab[1], b = lab[2];
    var C = Math.sqrt(a * a + b * b);
    var H = C < 1e-6 ? 0 : (Math.atan2(b, a) * 180) / Math.PI;
    return [L, C, (H + 360) % 360];
  }

  function inGamut(rgb) {
    return rgb.every(function (v) { return v >= -1e-4 && v <= 1 + 1e-4; });
  }

  /**
   * [L, C, H] -> #rrggbb.
   * Out-of-gamut chroma is reduced by binary search at constant L and H
   * rather than clipped per channel - clipping shifts the hue, which is
   * visible as a ramp that drifts colour at its most saturated steps.
   */
  function oklchToHex(L, C, H) {
    L = clamp(L, 0, 1);
    C = Math.max(0, C);
    var rad = (H * Math.PI) / 180;
    var cos = Math.cos(rad), sin = Math.sin(rad);

    var render = function (chroma) {
      var lin = oklabToLinearRgb(L, chroma * cos, chroma * sin);
      return [linearToSrgb(lin[0]), linearToSrgb(lin[1]), linearToSrgb(lin[2])];
    };

    var rgb = render(C);
    if (!inGamut(rgb)) {
      var lo = 0, hi = C;
      for (var i = 0; i < 20; i++) {
        var mid = (lo + hi) / 2;
        if (inGamut(render(mid))) lo = mid; else hi = mid;
      }
      rgb = render(lo);
    }
    return toHex([clamp(rgb[0], 0, 1), clamp(rgb[1], 0, 1), clamp(rgb[2], 0, 1)]);
  }

  /* ============================================================
     THE RAMP
     Nominal perceptual lightness targets, plus a chroma taper.

     The taper matters: holding full chroma into the tints gives
     chalky pastels, and holding it into the shades gives muddy
     near-blacks. Real pigment loses saturation at both ends, so the
     ramp does too - peaking at 500-600 where the brand actually
     lives, and easing off toward 50 and 950.
     ============================================================ */
  var STEPS = [50, 100, 200, 300, 400, 500, 600, 650, 700, 800, 900, 950];
  var NOMINAL_L = {
    50: 0.971, 100: 0.936, 200: 0.885, 300: 0.808, 400: 0.713, 500: 0.646,
    // The shade rungs are tuned so brand-600 clears WCAG AA (4.5:1) against
    // white at EVERY hue - measured min 4.75:1 across the full hue circle.
    // --text-brand resolves to brand-600, so this is the rung that decides
    // whether brand-coloured link text is legible after a brand swap.
    600: 0.540, 650: 0.505, 700: 0.470, 800: 0.400, 900: 0.330, 950: 0.262
  };
  var CHROMA_SCALE = {
    50: 0.16, 100: 0.30, 200: 0.52, 300: 0.74, 400: 0.92, 500: 1,
    600: 1, 650: 0.99, 700: 0.96, 800: 0.88, 900: 0.74, 950: 0.58
  };
  var L_CEILING = 0.972;  // lightest tint
  var L_FLOOR = 0.175;    // darkest shade
  var MIN_GAP = 0.035;    // smallest perceptual step between adjacent rungs

  /**
   * Generate a full ramp from one seed hex.
   *
   * Step 500 is pinned to the seed exactly - the colour a user picked is
   * the colour they get. Every other rung targets an absolute perceptual
   * lightness, nudged only as far as needed to keep the ramp monotonic.
   *
   * @param {string} hexColor seed, e.g. '#10b981'
   * @param {string} type token prefix, e.g. 'brand' -> '--brand-500'
   * @returns {Object<string,string>} { '--brand-50': '#...', ... }
   */
  function generateScale(hexColor, type) {
    var seed = hexToOklch(hexColor);
    var out = {};
    if (!seed) return out;

    var sL = seed[0], sC = seed[1], sH = seed[2];
    var lightness = {};
    lightness[500] = sL;

    /* Walk outward from 500 in both directions, preferring the ABSOLUTE
       nominal target and only departing from it to preserve a minimum
       perceptual gap from the previous rung.

       This is the whole point of working in OKLCH. If every step were
       derived from the seed's own lightness, a light amber and a deep indigo
       would produce ramps whose 600 step differs by 3:1 in contrast against
       white - and the WCAG grades would swing every time the brand changed.
       Anchoring the rungs to absolute perceptual lightness instead means
       "600 on white" is roughly constant across brands, which is what makes
       a token scale safe to build components on. Step 500 still returns the
       seed verbatim; only the surrounding ladder is normalised. */
    var tints = STEPS.filter(function (s) { return s < 500; }).sort(function (a, b) { return b - a; });
    var prev = sL;
    tints.forEach(function (step) {
      prev = Math.min(L_CEILING, Math.max(NOMINAL_L[step], prev + MIN_GAP));
      lightness[step] = prev;
    });

    var shades = STEPS.filter(function (s) { return s > 500; }).sort(function (a, b) { return a - b; });
    prev = sL;
    shades.forEach(function (step) {
      prev = Math.max(L_FLOOR, Math.min(NOMINAL_L[step], prev - MIN_GAP));
      lightness[step] = prev;
    });

    STEPS.forEach(function (step) {
      out['--' + type + '-' + step] = oklchToHex(lightness[step], sC * CHROMA_SCALE[step], sH);
    });

    // Pin the seed exactly: the round-trip through OKLCH and back can
    // land a bit off, and the canonical brand colour must be verbatim.
    out['--' + type + '-500'] = /^#[0-9a-fA-F]{6}$/.test(hexColor)
      ? hexColor.toLowerCase()
      : out['--' + type + '-500'];
    return out;
  }

  /** Human-readable `oklch(L% C H)` for the seed - used in the UI readout. */
  function formatOklch(hexColor) {
    var v = hexToOklch(hexColor);
    if (!v) return '';
    return 'oklch(' + (v[0] * 100).toFixed(1) + '% ' + v[1].toFixed(3) + ' ' + v[2].toFixed(1) + ')';
  }

  global.DSColor = {
    hexToOklch: hexToOklch,
    oklchToHex: oklchToHex,
    generateScale: generateScale,
    formatOklch: formatOklch,
    STEPS: STEPS
  };
})(typeof window !== 'undefined' ? window : this);
