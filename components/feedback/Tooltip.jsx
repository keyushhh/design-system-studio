import React from 'react';

/**
 * Tooltip - dark hover label. Wraps its trigger children; shows on hover/focus.
 * Positions above by default.
 */
export function Tooltip({ label, placement = 'top', children, style, ...rest }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
  }[placement];
  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      {...rest}
    >
      {children}
      {show && (
        <span style={{
          position: 'absolute', ...pos, zIndex: 'var(--z-toast)', whiteSpace: 'nowrap',
          background: 'var(--surface-inverse)', color: 'var(--text-inverse)',
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
          padding: '6px 10px', borderRadius: 'var(--radius-sharp)', boxShadow: 'var(--shadow-md)',
          pointerEvents: 'none',
        }}>
          {label}
        </span>
      )}
    </span>
  );
}
