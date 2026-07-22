import React from 'react';
import type { IconName } from './Icon';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Glyph name. */
  icon: IconName;
  /** Hover tone. */
  tone?: 'neutral' | 'brand' | 'danger';
  /** Square hit area in px. Default 24. */
  size?: number;
  /** Accessible label (also the tooltip). */
  label?: string;
  /** Keep the hover fill on (selected state). */
  active?: boolean;
}

/**
 * Square, icon-only control for row/toolbar actions (hide, duplicate, delete).
 * @dsCard group="Components"
 */
export function IconButton(props: IconButtonProps): JSX.Element;
