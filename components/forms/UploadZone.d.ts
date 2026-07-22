import React from 'react';

export interface UploadZoneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  /** Idle title. Default "Upload Document". */
  title?: string;
  /** Selected filename - shown bold with a "Click to replace" subline. */
  filename?: string;
  /** Idle subline. Default "Markdown (.md)". */
  subtext?: string;
  /** Show the parsing state. */
  validating?: boolean;
  /** Accepted file types. Default ".md,.markdown". */
  accept?: string;
  /** Called with the chosen/dropped File. */
  onFileSelect?: (file: File) => void;
}

/**
 * Dashed drag-and-drop upload zone - the shell's Source Material input.
 * @dsCard group="Components"
 */
export function UploadZone(props: UploadZoneProps): JSX.Element;
