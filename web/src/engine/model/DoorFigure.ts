import type { DoorLook } from './DoorLook.ts';

/** An apartment's door as its corridor draws it (U02): the apartment's address, the door's look and the word written on it (empty when none). */
export interface DoorFigure {
  readonly address: string;
  readonly look: DoorLook;
  readonly words: string;
}
