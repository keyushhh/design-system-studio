import React from 'react';
import type { IconName } from './Icon';

/**
 * Primary action control for the Design System Studio shell and deck chrome.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual role. `primary` = neutral-900 CTA; `brand` = emerald. */
  variant?: 'primary' | 'brand' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** sm 34px · md 44px · lg 52px. */
  size?: 'sm' | 'md' | 'lg';
  /** Corner style - product/deck default is `sharp`. */
  radius?: 'sharp' | 'md' | 'full';
  /** Leading icon glyph name. */
  iconLeft?: IconName;
  /** Trailing icon glyph name. */
  iconRight?: IconName;
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * Primary action control for the Design System Studio shell and deck chrome.
 * @dsCard group="Components"
 * @startingPoint section="Core" subtitle="Editorial action button - primary, brand, outline, ghost, danger" viewport="700x220"
 */
export function Button(props: ButtonProps): JSX.Element;
