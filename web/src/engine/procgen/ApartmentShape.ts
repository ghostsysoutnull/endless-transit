import type { Apartment } from '#engine/model/Apartment.ts';
import type { Corridor } from '#engine/model/Corridor.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';

/**
 * What an `ApartmentFactory` makes: the kind it registers as, the kind of room it populates with, and the
 * class it constructs — so the apartment above the bedrock and the Crypt below it are two registry entries
 * of one factory, never a branch in it.
 */
export interface ApartmentShape {
  readonly kind: LocationKind;
  readonly rooms: LocationKind;
  make(origin: Origin<Corridor>, facts: ConstructorParameters<typeof Apartment>[1]): Apartment;
}
