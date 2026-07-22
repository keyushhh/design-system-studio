import React from 'react';

/**
 * Switch - pill toggle. Emerald track when on. This is the one deliberately
 * rounded control in an otherwise square system (a toggle reads as a switch).
 */
export function Switch({ label, checked, disabled = false, onChange, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-primary)', ...style }}>
      <span style={{ position: 'relative', width: 40, height: 22, flexShrink: 0 }}>
        <input type="checkbox" checked={!!checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', margin: 0, cursor: 'inherit' }} {...rest} />
        <span style={{
          position: 'absolute', inset: 0, borderRadius: 'var(--radius-full)',
          background: checked ? 'var(--brand-500)' : 'var(--neutral-300)',
          transition: 'background var(--duration-normal) var(--ease-standard)',
        }} />
        <span style={{
          position: 'absolute', top: 3, left: checked ? 21 : 3, width: 16, height: 16, borderRadius: '50%',
          background: '#fff', boxShadow: 'var(--shadow-sm)',
          transition: 'left var(--duration-normal) var(--ease-standard)',
        }} />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
