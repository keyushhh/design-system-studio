import React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Center the label + rule (used on divider slides). */
  center?: boolean;
  /** Font size in px. Default 14 (use 10 for sub-labels). */
  size?: number;
  /** Override color (defaults to emerald). */
  color?: string;
}

/**
 * Editorial eyebrow label with a leading emerald rule.
 * @dsCard group="Components"
 */
export function Eyebrow(props: EyebrowProps): JSX.Element;
