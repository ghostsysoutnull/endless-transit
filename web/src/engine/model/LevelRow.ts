import type { CorridorShape } from './CorridorShape.ts';
import type { DoorLook } from './DoorLook.ts';
import type { Level } from './Level.ts';

/**
 * A floor's row on its building's tower (U02): its address, the level it stands at, how its corridor runs and how
 * each of its doors looks, in the corridor's order — peeked, never a corridor made. Plain data around the engine's
 * value objects.
 */
export interface LevelRow {
  readonly address: string;
  readonly level: Level;
  readonly shape: CorridorShape;
  readonly looks: readonly DoorLook[];
}
