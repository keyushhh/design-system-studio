import React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  message?: React.ReactNode;
  /** Tone - sets keyline + icon. */
  tone?: 'success' | 'error' | 'info' | 'brand';
  /** Show a dismiss button. */
  onClose?: () => void;
}

/**
 * Flat status toast with a tone keyline + icon.
 * @dsCard group="Components"
 */
export function Toast(props: ToastProps): JSX.Element;
