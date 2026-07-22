import React from 'react';

/**
 * Input - text field primitive. 44px control height (the shell's
 * modal-control-height), square corners, hairline border. Focus draws the
 * emerald ring + soft halo; error swaps to the error palette.
 */

export function Input({ label, hint, error, size = 'md', disabled = false, style, id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const height = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const borderColor = error
    ? 'var(--error-500)'
    : focus
      ? 'var(--brand-500)'
      : 'var(--border-strong)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          height,
          boxSizing: 'border-box',
          padding: '0 12px',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: 'var(--text-primary)',
          background: disabled ? 'var(--neutral-100)' : 'var(--surface-default)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-sharp)',
          outline: 'none',
          boxShadow: focus && !error ? '0 0 0 2px var(--brand-100)' : error && focus ? '0 0 0 2px var(--error-100)' : 'none',
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: error ? 'var(--error-600)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
