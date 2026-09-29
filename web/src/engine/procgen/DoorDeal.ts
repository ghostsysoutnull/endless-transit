import type { Door } from '#engine/model/Door.ts';
import type { DoorLook } from '#engine/model/DoorLook.ts';
import type { RoomCategory } from '#engine/model/RoomCategory.ts';
import type { Seed } from '#engine/rng/Seed.ts';

/** What an apartment and a floor's peek ask of `Doors`: the door dealt on an apartment's seed, or only its look. */
export interface DoorDeal {
  of(apartmentSeed: Seed, behind: RoomCategory): Door;
  look(apartmentSeed: Seed): DoorLook;
}
