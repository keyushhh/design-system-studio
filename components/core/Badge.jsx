import React from 'react';

/**
 * Badge / Tag / Pill - compact status + category label. Rounded-full pill by
 * default (matches the source's rounded-[9999px] chips). Tones map to the
 * semantic + brand palettes; `subtle` is the soft-fill variant used most.
 */

const TONES = {
  brand: { bg: 'var(--brand-50)', fg: 'var(--brand-700)', solidBg: 'var(--brand-600)' },
  neutral: { bg: 'var(--neutral-150)', fg: 'var(--neutral-700)', solidBg: 'var(--neutral-800)' },
  success: { bg: 'var(--success-50)', fg: 'var(--success-700)', solidBg: 'var(--success-600)' },
  warning: { bg: 'var(--warning-50)', fg: 'var(--warning-700)', solidBg: 'var(--warning-600)' },
  error: { bg: 'var(--error-50)', fg: 'var(--error-700)', solidBg: 'var(--error-600)' },
  info: { bg: 'var(--info-50)', fg: 'var(--info-700)', solidBg: 'var(--info-600)' },
};

export function Badge({ children, tone = 'brand', variant = 'subtle', dot = false, shape = 'pill', style, ...rest }) {
  const t = TONES[tone] || TONES.brand;
  const solid = variant === 'solid';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 700,
        lineHeight: 1,
        padding: '4px 10px',
        borderRadius: shape === 'pill' ? 'var(--radius-full)' : 'var(--radius-sharp)',
        background: solid ? t.solidBg : t.bg,
        color: solid ? '#fff' : t.fg,
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: solid ? '#fff' : t.solidBg, flexShrink: 0 }} />
      )}
      {children}
    </span>
  );
}
