import type { DoorStateLook } from './DoorStateLook.ts';
import type { MaterialFamily } from './MaterialFamily.ts';

/**
 * How a door looks: its material and its state by their names on their lists (`Heavy Bulkhead`, `Frozen`), and the
 * keys a picture draws them by — the material's family and the state's look (their lists' key column). Plain data.
 */
export interface DoorLook {
  readonly material: string;
  readonly state: string;
  readonly family: MaterialFamily;
  readonly stateLook: DoorStateLook;
}
