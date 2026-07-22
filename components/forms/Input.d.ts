import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message - swaps border/halo to the error palette. */
  error?: string;
  /** sm 36px · md 44px · lg 52px. */
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/**
 * Text input with label, hint, error and emerald focus ring.
 * @dsCard group="Components"
 */
export function Input(props: InputProps): JSX.Element;
