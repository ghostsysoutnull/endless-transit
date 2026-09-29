import type { LevelLabel } from './LevelLabel.ts';

/** A Layer's number in hex, as the game names it (Floor.groovy:110-112): `-0x1`, `-0x1A`. */
export class HexLabel implements LevelLabel {
  of(number: number): string {
    return `-0x${Math.abs(number).toString(16).toUpperCase()}`;
  }
}
