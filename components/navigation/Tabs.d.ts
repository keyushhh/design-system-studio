import React from 'react';

export interface TabItem { value: string; label: string; }
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab list - plain strings or {value,label}. */
  tabs?: (string | TabItem)[];
  /** Controlled active value. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

/**
 * Underline tab bar with an emerald active indicator.
 * @dsCard group="Components"
 */
export function Tabs(props: TabsProps): JSX.Element;
