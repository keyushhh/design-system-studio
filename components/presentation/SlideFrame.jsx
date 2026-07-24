import React from 'react';

/**
 * SlideFrame - the 1920×1080 slide shell. Renders the exact editorial canvas
 * the Master Presentation uses (white or pure-black), with the optional
 * hairline grid overlay and radial emerald glow, then auto-scales to fit its
 * container width so slides can preview at any size. `fit="none"` renders at
 * full 1920px (for export). Children lay out against the real 1920×1080 box.
 */

export function SlideFrame({ children, dark = false, showGrid = true, glow = false, fit = 'width', style, ...rest }) {
  const wrapRef = React.useRef(null);
  const [scale, setScale] = React.useState(fit === 'none' ? 1 : 0.001);

  React.useLayoutEffect(() => {
    if (fit === 'none') return;
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / 1920);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  const frame = (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: dark ? 'var(--presentation-dark)' : 'var(--presentation-light)',
        color: dark ? '#ffffff' : 'var(--text-primary)',
        overflow: 'hidden',
        isolation: 'isolate',
        boxShadow: 'var(--shadow-soft)',
        transformOrigin: 'top left',
        transform: fit === 'none' ? undefined : `scale(${scale})`,
        fontFamily: 'var(--font-sans)',
      }}
    >
      {showGrid && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(var(--grid-line-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px)',
          backgroundSize: 'var(--grid-cell-size, 120px) var(--grid-cell-size, 120px)',
        }} />
      )}
      {glow && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 900, height: 900, zIndex: -1, pointerEvents: 'none',
          background: 'var(--glow-bg)', filter: 'var(--glow-filter)',
        }} />
      )}
      {children}
    </div>
  );

  if (fit === 'none') return frame;
  return (
    <div ref={wrapRef} style={{ width: '100%', height: 1080 * scale, ...style }} {...rest}>
      {frame}
    </div>
  );
}
