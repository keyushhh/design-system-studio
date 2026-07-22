import React from 'react';

/**
 * HudBar - the slide top HUD: mono label on the left, slide number on the
 * right, separated from the body by a hairline rule. Absolutely positioned
 * inside a SlideFrame by default; pass `static` to flow it inline.
 */

export function HudBar({ label, num, dark = false, position = 'absolute', style, ...rest }) {
  return (
    <div
      style={{
        position: position === 'static' ? 'static' : 'absolute',
        ...(position === 'static' ? {} : { top: 60, left: 80, right: 80 }),
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-label)',
        color: dark ? 'rgba(255,255,255,0.6)' : 'var(--neutral-500)',
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : 'var(--neutral-200)'}`,
        paddingBottom: 20,
        zIndex: 10,
        ...style,
      }}
      {...rest}
    >
      <span>{label}</span>
      <span>{num}</span>
    </div>
  );
}
