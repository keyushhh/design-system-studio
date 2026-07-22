import React from 'react';

/**
 * 1920×1080 editorial slide shell - the base every deck template builds on.
 */
export interface SlideFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dark slide (pure-black, white text) - Section Divider / Exit templates. */
  dark?: boolean;
  /** Show the 120px hairline grid overlay (light slides only). Default true. */
  showGrid?: boolean;
  /** Add the corner radial emerald glow. */
  glow?: boolean;
  /** `width` auto-scales to the container; `none` renders at full 1920px. */
  fit?: 'width' | 'none';
}

/**
 * 1920×1080 editorial slide shell - the base every deck template builds on.
 * @dsCard group="Components"
 * @startingPoint section="Presentation" subtitle="1920×1080 editorial slide shell - grid, glow, light/dark" viewport="1280x720"
 */
export function SlideFrame(props: SlideFrameProps): JSX.Element;
