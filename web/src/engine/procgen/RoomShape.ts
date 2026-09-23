import type { Apartment } from '#engine/model/Apartment.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { Room } from '#engine/model/Room.ts';

/**
 * What a `RoomFactory` makes: the kind it registers as and the class it constructs — the room above the
 * bedrock and the Shard below it are two registry entries of one factory, never a branch in it.
 */
export interface RoomShape {
  readonly kind: LocationKind;
  make(origin: Origin<Apartment>, facts: ConstructorParameters<typeof Room>[1]): Room;
}
