import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  checked?: boolean;
  /** Show the indeterminate dash. */
  indeterminate?: boolean;
  disabled?: boolean;
}

/**
 * Square checkbox with emerald checked fill + indeterminate state.
 * @dsCard group="Components"
 */
export function Checkbox(props: CheckboxProps): JSX.Element;
