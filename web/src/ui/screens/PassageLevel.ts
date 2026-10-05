import type { Drawing } from './Drawing.ts';

/** A level of the way into the game or out of it: its picture, the place in it the way goes through, and its words. */
export interface PassageLevel {
  readonly drawing: Drawing;
  readonly into: string;
  /** Its mark on the passage's rail. */
  readonly icon: string;
  /** Its kind's title (`Galaxy`). */
  readonly kind: string;
  readonly name: string;
}
