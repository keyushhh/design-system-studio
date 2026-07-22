import React from 'react';

/**
 * Radio - circular single-choice control with an emerald dot.
 */
export function Radio({ label, checked, disabled = false, onChange, name, value, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-primary)', ...style }}>
      <span style={{ position: 'relative', display: 'inline-flex', width: 18, height: 18, flexShrink: 0 }}>
        <input type="radio" name={name} value={value} checked={!!checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', margin: 0, cursor: 'inherit' }} {...rest} />
        <span style={{
          width: 18, height: 18, borderRadius: '50%',
          border: `1.5px solid ${checked ? 'var(--brand-500)' : 'var(--border-strong)'}`,
          background: 'var(--surface-default)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color var(--duration-fast) var(--ease-standard)',
        }}>
          {checked && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-500)' }} />}
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
