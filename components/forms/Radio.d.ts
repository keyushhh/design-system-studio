import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}

/**
 * Circular radio with emerald dot for single-choice groups.
 * @dsCard group="Components"
 */
export function Radio(props: RadioProps): JSX.Element;
