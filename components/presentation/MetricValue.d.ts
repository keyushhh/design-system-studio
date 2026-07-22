import React from 'react';

export interface MetricValueProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The big number, e.g. "2.0". */
  value: React.ReactNode;
  /** Unit suffix in emerald, e.g. "M". */
  unit?: React.ReactNode;
  /** Display heading under the numeral. */
  heading?: React.ReactNode;
  /** Numeral font size in px. Default 420 (full-slide). */
  valueSize?: number;
  /** Heading font size in px. Default 64. */
  headingSize?: number;
}

/**
 * Oversized data-monument statistic with emerald unit.
 * @dsCard group="Components"
 */
export function MetricValue(props: MetricValueProps): JSX.Element;
