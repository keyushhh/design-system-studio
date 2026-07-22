import React from 'react';

/**
 * Eyebrow - the editorial label with a leading rule that opens nearly every
 * slide and section. Mono, uppercase, emerald, wide tracking.
 */

export function Eyebrow({ children, center = false, size = 14, color = 'var(--brand-600)', style, ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: center ? 'center' : 'flex-start',
        gap: 15,
        fontFamily: 'var(--font-mono)',
        fontSize: size,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-eyebrow)',
        color,
        ...style,
      }}
      {...rest}
    >
      <span style={{ display: 'inline-block', width: 40, height: 1, background: 'var(--brand-500)', flexShrink: 0 }} />
      {children}
    </div>
  );
}
