import type { Door } from '#engine/model/Door.ts';
import type { DoorLook } from '#engine/model/DoorLook.ts';
import type { RoomCategory } from '#engine/model/RoomCategory.ts';
import type { DoorSlot } from './DoorSlot.ts';

/** What an apartment and a floor's peek ask of `Doors`: the door that stands in a slot of a corridor, or only its look. */
export interface DoorDeal {
  of(slot: DoorSlot, behind: RoomCategory): Door;
  look(slot: DoorSlot): DoorLook;
}
