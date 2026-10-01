import type { TemplateResult } from 'lit-html';
import type { CardParts } from './CardParts.ts';
import type { HudVM } from './HudVM.ts';
import type { RoomCardVM } from './RoomCardVM.ts';

/** What the world screen asks of the room's card (U03e): told each step, forgotten with the screen, and drawn. */
export interface RoomCard {
  /** A step of the game: a new room shows its picture, a step that brings a panel shows the back. */
  step(vm: HudVM): void;
  /** The screen is gone: the next room starts on its picture. */
  forget(): void;
  /** The card and the strip of keys under it. */
  template(vm: HudVM, card: RoomCardVM, parts: CardParts): TemplateResult;
}
