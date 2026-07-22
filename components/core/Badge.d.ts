import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone. */
  tone?: 'brand' | 'neutral' | 'success' | 'warning' | 'error' | 'info';
  /** `subtle` soft fill (default) or `solid`. */
  variant?: 'subtle' | 'solid';
  /** Show a leading status dot. */
  dot?: boolean;
  /** `pill` (default) or `square` for the editorial in-product look. */
  shape?: 'pill' | 'square';
}

/**
 * Compact status / category label (badge, tag, pill).
 * @dsCard group="Components"
 */
export function Badge(props: BadgeProps): JSX.Element;
