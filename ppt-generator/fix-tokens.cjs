const fs = require('fs');
const file = 'src/features/generator/pptxNative.ts';
let content = fs.readFileSync(file, 'utf8');

const constants = [
  'FONT_DISPLAY', 'FONT_MONO',
  'NEUTRAL_50', 'NEUTRAL_100', 'NEUTRAL_200', 'NEUTRAL_300',
  'NEUTRAL_400', 'NEUTRAL_500', 'NEUTRAL_900',
  'EMERALD_400', 'EMERALD_500', 'EMERALD_600',
  'WHITE', 'BLACK'
];

// First, remove the const definitions
constants.forEach(c => {
  const regex = new RegExp(`const ${c}\\s*=\\s*['"][^'"]+['"];\\n?`, 'g');
  content = content.replace(regex, '');
});

// Insert the new T object and helpers
const newTokens = `
function getCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return val || fallback;
}
function getFont(name: string, fallback: string): string {
  const val = getCssVar(name, fallback);
  const match = val.match(/^['"]([^'"]+)['"]/);
  return match ? match[1] : val.split(',')[0].trim();
}
function getHex(name: string, fallback: string): string {
  const val = getCssVar(name, fallback);
  if (val.startsWith('#')) return val.substring(1).toUpperCase();
  return fallback;
}
function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return \`rgba(\${num >> 16 & 255},\${num >> 8 & 255},\${num & 255},\${alpha})\`;
}

const T = {
  get FONT_DISPLAY() { return getFont('--font-display', 'Space Grotesk'); },
  get FONT_MONO() { return getFont('--font-mono', 'JetBrains Mono'); },
  get NEUTRAL_50() { return getHex('--neutral-50', 'FBFBFB'); },
  get NEUTRAL_100() { return getHex('--neutral-100', 'F5F5F5'); },
  get NEUTRAL_200() { return getHex('--neutral-200', 'E5E5E5'); },
  get NEUTRAL_300() { return getHex('--neutral-300', 'D4D4D4'); },
  get NEUTRAL_400() { return getHex('--neutral-400', 'A3A3A3'); },
  get NEUTRAL_500() { return getHex('--neutral-500', '737373'); },
  get NEUTRAL_900() { return getHex('--neutral-900', '171717'); },
  get EMERALD_400() { return getHex('--emerald-400', '34D399'); },
  get EMERALD_500() { return getHex('--emerald-500', '10B981'); },
  get EMERALD_600() { return getHex('--emerald-600', '059669'); },
  get WHITE() { return 'FFFFFF'; },
  get BLACK() { return '000000'; }
};
`;

content = content.replace(/function estimateWrappedLines/, newTokens + '\nfunction estimateWrappedLines');

// Now replace all usages of the constants with T.CONSTANT
constants.forEach(c => {
  const usageRegex = new RegExp(`\\b${c}\\b`, 'g');
  // Avoid replacing T.CONSTANT with T.T.CONSTANT if script ran twice
  content = content.replace(usageRegex, (match, offset, string) => {
    // Only replace if it doesn't already have a 'T.' in front of it
    if (string.slice(Math.max(0, offset - 2), offset) === 'T.') {
      return match;
    }
    return `T.${c}`;
  });
});

// Also replace the hardcoded glow rgb colors
content = content.replace(/'rgba\(16,185,129,([0-9.]+)\)'/g, (match, p1) => {
  return `hexToRgba(T.EMERALD_500, ${p1})`;
});

fs.writeFileSync(file, content);
