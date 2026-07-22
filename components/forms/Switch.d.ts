import React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}

/**
 * Pill toggle switch - emerald track when on.
 * @dsCard group="Components"
 */
export function Switch(props: SwitchProps): JSX.Element;
