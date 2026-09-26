import type { DoorLook } from './DoorLook.ts';

/**
 * A floor's corridor as it will be, read from the seeds when the floor is made (U02, the peek): how it runs
 * (its words' key: `long`, `service`, `curved`, `static`) and how each door looks, in the corridor's order —
 * neither the corridor nor its apartments made. Plain data; a Layer has none (empty).
 */
export interface Passage {
  readonly shape: string;
  readonly looks: readonly DoorLook[];
}
