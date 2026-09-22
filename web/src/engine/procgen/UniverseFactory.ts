import { FILAMENT_KIND } from '#engine/model/CosmicFilament.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import { Universe, UNIVERSE_KIND } from '#engine/model/Universe.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { Progeny } from './Progeny.ts';

/** The universe: 3 to 7 cosmic filaments. */
export class UniverseFactory implements LocationFactory {
  readonly #filaments: Progeny;

  constructor(world: FactoryLookup) {
    this.#filaments = new Progeny(world, { min: 3, max: 7 }, () => world.factoryFor(FILAMENT_KIND));
  }

  kind(): LocationKind {
    return UNIVERSE_KIND;
  }

  create(origin: Origin): Universe {
    return new Universe(origin);
  }

  populate(parent: Location): readonly Location[] {
    return this.#filaments.of(parent);
  }
}
