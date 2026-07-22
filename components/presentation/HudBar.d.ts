import React from 'react';

export interface HudBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left label (slide section, e.g. "Executive Summary"). */
  label?: React.ReactNode;
  /** Right slide number, e.g. "04". */
  num?: React.ReactNode;
  /** Use light-on-dark styling for dark slides. */
  dark?: boolean;
  /** `absolute` (default, inset into a SlideFrame) or `static`. */
  position?: 'absolute' | 'static';
}

/**
 * Slide top HUD - mono label + number over a hairline rule.
 * @dsCard group="Components"
 */
export function HudBar(props: HudBarProps): JSX.Element;
