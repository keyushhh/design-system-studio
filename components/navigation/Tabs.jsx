import React from 'react';

/**
 * Tabs - underline tab bar. Active tab carries an emerald underline + ink
 * label; the rest are muted. Controlled via `value`/`onChange` or uncontrolled.
 */
export function Tabs({ tabs = [], value, defaultValue, onChange, style, ...rest }) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && (tabs[0].value ?? tabs[0])));
  const active = value !== undefined ? value : internal;
  const select = (v) => { if (value === undefined) setInternal(v); if (onChange) onChange(v); };
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-default)', ...style }} {...rest}>
      {tabs.map((t) => {
        const val = t.value ?? t;
        const lbl = t.label ?? t;
        const on = val === active;
        return (
          <button
            key={val}
            onClick={() => select(val)}
            style={{
              position: 'relative', border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: on ? 600 : 500,
              color: on ? 'var(--text-primary)' : 'var(--text-muted)',
              padding: '10px 14px', marginBottom: -1,
              borderBottom: `2px solid ${on ? 'var(--brand-500)' : 'transparent'}`,
              transition: 'color var(--duration-fast) var(--ease-standard)',
            }}
          >
            {lbl}
          </button>
        );
      })}
    </div>
  );
}
