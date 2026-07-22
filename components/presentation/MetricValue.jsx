import React from 'react';

/**
 * MetricValue - the oversized "data monument" numeral with an emerald unit and
 * a display heading. The presentation's signature statistic treatment.
 */

export function MetricValue({ value, unit, heading, valueSize = 420, headingSize = 64, style, ...rest }) {
  return (
    <div style={style} {...rest}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: valueSize,
        fontWeight: 700,
        lineHeight: 0.8,
        letterSpacing: '-0.07em',
        display: 'flex',
        alignItems: 'baseline',
        color: 'var(--neutral-900)',
      }}>
        {value}
        {unit && <span style={{ color: 'var(--brand-500)', fontSize: '0.3em', marginLeft: 10 }}>{unit}</span>}
      </div>
      {heading && (
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: headingSize,
          fontWeight: 600,
          lineHeight: 0.85,
          letterSpacing: '-0.05em',
          marginTop: 24,
          color: 'var(--neutral-900)',
        }}>
          {heading}
        </h3>
      )}
    </div>
  );
}
