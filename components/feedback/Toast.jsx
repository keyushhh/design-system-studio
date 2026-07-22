import React from 'react';
import { Icon } from '../core/Icon';

/**
 * Toast - flat status notification. Tone-tinted left keyline + icon, ink body.
 * A single inline toast card (compose your own stack/timer around it).
 */
const TONES = {
  success: { icon: 'check', color: 'var(--success-600)' },
  error: { icon: 'x', color: 'var(--error-600)' },
  info: { icon: 'link', color: 'var(--info-600)' },
  brand: { icon: 'check', color: 'var(--brand-600)' },
};

export function Toast({ title, message, tone = 'success', onClose, style, ...rest }) {
  const t = TONES[tone] || TONES.success;
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      minWidth: 300, maxWidth: 420, padding: '14px 16px',
      background: 'var(--surface-default)', border: '1px solid var(--border-default)',
      borderLeft: `3px solid ${t.color}`, borderRadius: 'var(--radius-sharp)',
      boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-sans)', ...style,
    }} {...rest}>
      <span style={{ color: t.color, display: 'inline-flex', marginTop: 1 }}><Icon name={t.icon} size={16} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>}
        {message && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: title ? 2 : 0, lineHeight: 1.45 }}>{message}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-faint)', display: 'inline-flex', padding: 0 }}>
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}
