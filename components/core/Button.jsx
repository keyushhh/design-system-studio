import React from 'react';
import { Icon } from './Icon';

/**
 * Design System Studio Button - the product's action primitive. Editorial, mostly square
 * (radius-sharp) corners; the primary CTA is neutral-900, the brand variant
 * carries emerald. Values lifted verbatim from GeneratorSidebar / toolbar.
 */

const SIZES = {
  sm: { height: 34, padding: '0 14px', fontSize: 12, gap: 6, icon: 12 },
  md: { height: 44, padding: '0 16px', fontSize: 14, gap: 8, icon: 15 },
  lg: { height: 52, padding: '0 22px', fontSize: 15, gap: 9, icon: 16 },
};

const VARIANTS = {
  primary: { background: 'var(--action-primary)', color: 'var(--text-inverse)', border: '1px solid transparent', hoverBg: 'var(--action-primary-hover)' },
  brand: { background: 'var(--action-brand)', color: 'var(--text-on-brand)', border: '1px solid transparent', hoverBg: 'var(--action-brand-hover)' },
  secondary: { background: 'var(--surface-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border-default)', hoverBg: 'var(--state-hover)' },
  outline: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)', hoverBg: 'var(--state-hover)' },
  ghost: { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid transparent', hoverBg: 'var(--state-hover)' },
  danger: { background: 'var(--error-600)', color: 'var(--text-inverse)', border: '1px solid transparent', hoverBg: 'var(--error-700)' },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  radius = 'sharp',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const [hover, setHover] = React.useState(false);
  const radiusVal = radius === 'sharp' ? 'var(--radius-sharp)' : radius === 'full' ? 'var(--radius-full)' : 'var(--radius-md)';

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        width: fullWidth ? '100%' : undefined,
        height: s.height,
        padding: s.padding,
        fontFamily: 'var(--font-sans)',
        fontSize: s.fontSize,
        fontWeight: 700,
        lineHeight: 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: radiusVal,
        border: v.border,
        background: disabled ? 'var(--state-disabled-bg)' : hover && !disabled ? v.hoverBg : v.background,
        color: disabled ? 'var(--state-disabled-fg)' : v.color,
        opacity: disabled ? 0.9 : 1,
        transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={s.icon} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.icon} />}
    </button>
  );
}
