import React from 'react';
import { Icon } from '../core/Icon';

/**
 * Select - native select wrapped for brand styling. 44px control height,
 * square corners, emerald focus ring, mono chevron.
 */
export function Select({ label, hint, error, options = [], value, onChange, disabled = false, size = 'md', style, id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const selId = id || (label ? `sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const height = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;
  const borderColor = error ? 'var(--error-500)' : focus ? 'var(--brand-500)' : 'var(--border-strong)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <label htmlFor={selId} style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <select
          id={selId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%', height, boxSizing: 'border-box', padding: '0 40px 0 12px',
            fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-primary)',
            background: disabled ? 'var(--neutral-100)' : 'var(--surface-default)',
            border: `1px solid ${borderColor}`, borderRadius: 'var(--radius-sharp)', outline: 'none',
            appearance: 'none', WebkitAppearance: 'none',
            boxShadow: focus && !error ? '0 0 0 2px var(--brand-100)' : 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
          }}
          {...rest}
        >
          {options.map((o) => {
            const val = typeof o === 'string' ? o : o.value;
            const lbl = typeof o === 'string' ? o : o.label;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
        <Icon name="chevron-down" size={14} strokeWidth={2.5} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
      </div>
      {(hint || error) && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: error ? 'var(--error-600)' : 'var(--text-muted)' }}>{error || hint}</span>}
    </div>
  );
}
