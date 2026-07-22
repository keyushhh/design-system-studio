import React from 'react';

export type IconName =
  | 'share' | 'download' | 'upload' | 'eye' | 'eye-off' | 'plus' | 'trash'
  | 'edit' | 'reset' | 'chevron-down' | 'check' | 'link' | 'x' | 'copy'
  | 'search' | 'settings' | 'user' | 'bell' | 'mail' | 'calendar' | 'clock'
  | 'folder' | 'filter' | 'bar-chart' | 'star' | 'info' | 'alert-triangle'
  | 'check-circle' | 'arrow-right' | 'arrow-left' | 'chevron-right'
  | 'external-link' | 'more-horizontal';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Which glyph to render. */
  name: IconName;
  /** Square px size. Default 16. */
  size?: number;
  /** Stroke weight - 2 default; 1.5 for large glyphs, 2.5 for chevrons. */
  strokeWidth?: number;
}

/**
 * Curated Lucide line-icon wrapper. Renders currentColor, round caps/joins.
 * @dsCard group="Components"
 */
export function Icon(props: IconProps): JSX.Element;
