import React from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The tooltip text. */
  label: React.ReactNode;
  /** Side to show on. Default `top`. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

/**
 * Dark hover/focus tooltip that wraps its trigger.
 * @dsCard group="Components"
 */
export function Tooltip(props: TooltipProps): JSX.Element;
