import React from 'react';

/**
 * Flat container surface - hairline border, optional soft elevation.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fill role. */
  surface?: 'default' | 'subtle' | 'sunken';
  /** Elevation - flat by default (system prefers spacing over shadow). */
  elevation?: 'flat' | 'soft' | 'lift';
  /** Corner scale. `sharp` for in-product editorial contexts. */
  radius?: 'sharp' | 'md' | 'lg' | 'xl';
  /** Inner padding in px. */
  padding?: number;
}

/**
 * Flat container surface - hairline border, optional soft elevation.
 * @dsCard group="Components"
 * @startingPoint section="Core" subtitle="Flat card surface - hairline border, spacing over shadow" viewport="700x220"
 */
export function Card(props: CardProps): JSX.Element;
