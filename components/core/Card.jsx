import React from 'react';

/**
 * Card - flat surface primitive. Hairline border, white or subtle fill, soft
 * shadow only when raised. Square corners for in-product/editorial contexts;
 * pass radius="lg" for web surfaces.
 */

export function Card({ children, surface = 'default', elevation = 'flat', radius = 'lg', padding = 20, style, ...rest }) {
  const bg = surface === 'subtle' ? 'var(--surface-subtle)' : surface === 'sunken' ? 'var(--surface-sunken)' : 'var(--surface-default)';
  const shadow = elevation === 'soft' ? 'var(--shadow-soft)' : elevation === 'lift' ? 'var(--shadow-lift)' : 'none';
  const radiusVal = radius === 'sharp' ? 'var(--radius-sharp)' : radius === 'xl' ? 'var(--radius-xl)' : radius === 'md' ? 'var(--radius-md)' : 'var(--radius-lg)';
  return (
    <div
      style={{
        background: bg,
        border: '1px solid var(--border-default)',
        borderRadius: radiusVal,
        boxShadow: shadow,
        padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
