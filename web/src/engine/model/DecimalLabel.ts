import type { LevelLabel } from './LevelLabel.ts';

/** A floor's number as it is: `0`, `12`. */
export class DecimalLabel implements LevelLabel {
  of(number: number): string {
    return String(number);
  }
}
