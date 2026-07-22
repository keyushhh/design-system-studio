import React from 'react';

export interface SelectOption { value: string; label: string; }
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  /** Option list - plain strings or {value,label}. */
  options?: (string | SelectOption)[];
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Native select, brand-styled - 44px, square, emerald focus ring.
 * @dsCard group="Components"
 */
export function Select(props: SelectProps): JSX.Element;
