import { useEffect, useState } from 'react';

/**
 * Small-screen notice.
 *
 * Below 720px the layout drops the sidebar (see BrandGuidelines.css), which
 * takes deck switching, theming, source import, and export with it. Until now
 * that just happened silently: on a phone you got a scrollable wall of slides
 * and no way to do anything with them, plus a fixed toolbar overlapping itself.
 *
 * Rather than pretend the editor works at that size or hide the deck entirely,
 * this says plainly what's missing and offers the two things someone on a phone
 * actually wants: look at the slides, or go back. Dismissal is remembered for
 * the session only - a new visit explains itself again rather than silently
 * dropping someone into a crippled editor.
 */
const BREAKPOINT = '(max-width: 720px)';
const DISMISS_KEY = 'ds-generator-small-screen-ack';

export function SmallScreenNotice() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(BREAKPOINT).matches
  );
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISS_KEY) === '1'; } catch { return false; }
  });

  useEffect(() => {
    const mq = window.matchMedia(BREAKPOINT);
    const onChange = (e: MediaQueryListEvent) => setNarrow(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Rotating a phone to landscape is a legitimate way to get the editor back,
  // so re-evaluate rather than latching the dismissal to the whole session.
  if (!narrow) return null;

  const dismiss = () => {
    try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch { /* private mode */ }
    setDismissed(true);
  };

  /* Once the notice is dismissed the viewport is nothing but slides: the
     sidebar is hidden at this breakpoint and it carries the only link back to
     the studio, so there was no way out except the browser's back button.
     Leave a persistent bar behind. */
  if (dismissed) return <SmallScreenBackBar />;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="small-screen-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background: 'var(--surface-canvas, var(--neutral-50))',
      }}
    >
      <div style={{ maxWidth: 420, width: '100%' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--neutral-500)',
            marginBottom: 14,
          }}
        >
          Master PPT Generator
        </div>

        <h1
          id="small-screen-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 30,
            lineHeight: 1.12,
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: 'var(--neutral-900)',
            margin: '0 0 14px',
          }}
        >
          This one needs a bigger screen.
        </h1>

        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--neutral-600)', margin: '0 0 10px' }}>
          The deck editor puts a full 16:9 slide canvas next to its tools, and there
          isn't room for both on a phone. Open it on a laptop or desktop to build,
          edit, and export decks.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--neutral-600)', margin: '0 0 26px' }}>
          You can still scroll through the slides here — they just aren't editable
          at this size.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={dismiss}
            style={{
              height: 46,
              padding: '0 18px',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              borderRadius: 'var(--radius-sharp)',
              background: 'var(--neutral-900)',
              color: 'var(--pure-white)',
            }}
          >
            Preview the slides anyway
          </button>
          <a
            href="/"
            style={{
              height: 46,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: 'var(--radius-sharp)',
              border: '1px solid var(--neutral-300)',
              background: 'var(--pure-white)',
              color: 'var(--neutral-900)',
            }}
          >
            Back to Design System Studio
          </a>
        </div>
      </div>
    </div>
  );
}

/** Slim fixed header shown while previewing slides on a small screen. */
function SmallScreenBackBar() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        height: 'calc(52px + env(safe-area-inset-top, 0px))',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: 'env(safe-area-inset-top, 0px) 14px 0',
        background: 'var(--pure-white)',
        borderBottom: '1px solid var(--neutral-200)',
      }}
    >
      <a
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          height: 36,
          padding: '0 12px 0 8px',
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
          color: 'var(--neutral-900)',
          borderRadius: 'var(--radius-sharp)',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Design System Studio
      </a>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--neutral-500)',
          whiteSpace: 'nowrap',
        }}
      >
        Preview only
      </span>
    </header>
  );
}
