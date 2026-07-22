import React from 'react';

/**
 * Checkbox - square control with an emerald checked fill. Supports indeterminate.
 */
export function Checkbox({ label, checked, indeterminate = false, disabled = false, onChange, style, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  const on = checked || indeterminate;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-primary)', ...style }}>
      <span style={{ position: 'relative', display: 'inline-flex', width: 18, height: 18, flexShrink: 0 }}>
        <input ref={ref} type="checkbox" checked={!!checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', margin: 0, cursor: 'inherit' }} {...rest} />
        <span style={{
          width: 18, height: 18, borderRadius: 'var(--radius-sharp)',
          border: `1.5px solid ${on ? 'var(--brand-500)' : 'var(--border-strong)'}`,
          background: on ? 'var(--brand-500)' : 'var(--surface-default)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
        }}>
          {indeterminate
            ? <span style={{ width: 9, height: 2, background: '#fff' }} />
            : checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
