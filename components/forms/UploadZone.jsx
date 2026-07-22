import React from 'react';
import { Icon } from '../core/Icon';

/**
 * UploadZone - the shell's Source Material dropzone. Dashed border, upload
 * glyph, bold filename/title + mono subline. Hover and dragging states tint
 * to the emerald wash. Square corners, explicit min-height.
 */

export function UploadZone({ title, filename, subtext, validating = false, onFileSelect, accept = '.md,.markdown', style, ...rest }) {
  const [dragging, setDragging] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const inputRef = React.useRef(null);
  const active = dragging;
  const displayTitle = validating ? 'Parsing Document…' : filename || title || 'Upload Document';
  const displaySub = filename ? 'Click to replace' : subtext || 'Markdown (.md)';

  return (
    <div
      onClick={() => inputRef.current && inputRef.current.click()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files && e.dataTransfer.files[0];
        if (f && onFileSelect) onFileSelect(f);
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: 140,
        padding: '32px 20px',
        border: `1.5px dashed ${active || hover ? 'var(--brand-500)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-sharp)',
        background: active || hover ? 'var(--brand-50)' : 'transparent',
        cursor: 'pointer',
        transition: 'border-color var(--duration-fast) var(--ease-standard), background var(--duration-fast) var(--ease-standard)',
        ...style,
      }}
      {...rest}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f && onFileSelect) onFileSelect(f); }}
      />
      <Icon name="upload" size={20} strokeWidth={1.5} style={{ marginBottom: 12, color: active ? 'var(--brand-500)' : 'var(--text-faint)' }} />
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
        {displayTitle}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
        {displaySub}
      </div>
    </div>
  );
}
