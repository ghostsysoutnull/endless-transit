import type { DoorStateLook } from '#engine/model/DoorStateLook.ts';

/** What the corridor asks of `DoorLooks`: the ink a door's state is drawn in, by the look's key. */
export interface DoorInks {
  ink(look: DoorStateLook): string;
}
