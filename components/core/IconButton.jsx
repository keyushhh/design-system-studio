import React from 'react';
import { Icon } from './Icon';

/**
 * Square icon-only button - the hover-action control used in the slide nav
 * (hide/show, duplicate, delete) and toolbars. 24–28px hit area, neutral by
 * default with tone variants.
 */

const TONES = {
  neutral: { color: 'var(--text-faint)', hoverColor: 'var(--text-primary)', hoverBg: 'var(--neutral-200)' },
  brand: { color: 'var(--text-faint)', hoverColor: 'var(--brand-700)', hoverBg: 'var(--brand-50)' },
  danger: { color: 'var(--text-faint)', hoverColor: 'var(--error-600)', hoverBg: 'var(--error-50)' },
};

export function IconButton({ icon, tone = 'neutral', size = 24, label, active = false, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-sharp)',
        background: hover || active ? t.hoverBg : 'transparent',
        color: hover || active ? t.hoverColor : t.color,
        transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)',
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={Math.round(size * 0.54)} />
    </button>
  );
}
