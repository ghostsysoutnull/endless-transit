import type { nothing, TemplateResult } from 'lit-html';
import type { OptionVM } from '#ui/OptionVM.ts';

/** What the world screen hands the room's card to lay out (U03e): its own parts, drawn as on every place, and its calls. */
export interface CardParts {
  /** The host of the place's picture. */
  readonly picture: TemplateResult;
  /** The place's kind and name. */
  readonly head: TemplateResult;
  /** The line that says what just happened. */
  readonly status: TemplateResult;
  /** The place's chips, words and rows. */
  readonly words: TemplateResult;
  /** What the place holds, and its readouts. */
  readonly lists: TemplateResult | typeof nothing;
  /** The panels a step brings. */
  readonly panels: TemplateResult;
  /** An option as the screen's button. */
  button(option: OptionVM): TemplateResult;
  /** Whether the option is lit, in the picture or the list. */
  lit(id: string): boolean;
  /** Draws the screen again: the card changed face. */
  repaint(): void;
}
