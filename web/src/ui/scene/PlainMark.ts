import type { DoorMark } from './DoorMark.ts';

/** Every other state: nothing moves on the door. */
export class PlainMark implements DoorMark {
  draw(): void {
    // Plain: no mark.
  }
}
