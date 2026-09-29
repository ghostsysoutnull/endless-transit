import type { Position } from './Position.ts';

/** How a kind counts a place among its siblings: under its label, or not at all. */
export interface IndexLabel {
  position(index: number, total: number): Position;
}
