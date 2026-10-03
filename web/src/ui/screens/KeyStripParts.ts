import type { nothing, TemplateResult } from 'lit-html';

/** What a screen hands the strip of keys to draw with (U03e): what stands in its middle, and the screen's calls. */
export interface KeyStripParts {
  /** What stands between the lead keys and the trail: the slot of the picture's MAP key on a room's card, nothing elsewhere. */
  readonly slot: TemplateResult | typeof nothing;
  /** Whether the option is lit, in the picture or the list. */
  lit(id: string): boolean;
  /** Draws the screen again: the MORE sheet opened or closed. */
  repaint(): void;
}
