import type { TemplateResult } from 'lit-html';
import type { CardParts } from './CardParts.ts';
import type { HudVM } from './HudVM.ts';
import type { RoomCardVM } from './RoomCardVM.ts';

/** What the world screen asks of the room's card (U03e): told each step, forgotten with the screen, and drawn. */
export interface RoomCard {
  /** A step of the game: a new room shows its picture; one that brought a `panel` shows the back, where panels are. */
  step(vm: HudVM, panel: boolean): void;
  /** The screen is gone: the next room starts on its picture. */
  forget(): void;
  /** Shows the picture, then runs `then`: at once when it is up, after the turn when the card lies on its back. */
  reveal(target: EventTarget | null, then: () => void): void;
  /** The card and the strip of keys under it. */
  template(vm: HudVM, card: RoomCardVM, parts: CardParts): TemplateResult;
}
