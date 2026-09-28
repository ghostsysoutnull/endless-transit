import type { Level } from '#engine/model/Level.ts';
import type { PadGroup } from './PadGroup.ts';

/** A floor falls in its ten: 0–9, 10–19 … */
export class FloorsByTen implements PadGroup {
  of(level: Level): number {
    return Math.floor(level.number() / 10);
  }
}
