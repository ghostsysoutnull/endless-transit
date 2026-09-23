import { ARTERY_KIND } from '#engine/model/Artery.ts';
import type { Building } from '#engine/model/Building.ts';
import { Layer, LAYER_KIND } from '#engine/model/Layer.ts';
import type { Location } from '#engine/model/Location.ts';
import type { LocationKind } from '#engine/model/LocationKind.ts';
import type { Origin } from '#engine/model/Origin.ts';
import type { FactoryLookup } from './FactoryLookup.ts';
import type { LocationFactory } from './LocationFactory.ts';
import { Progeny } from './Progeny.ts';

/** Every Layer is told in the same sentence (Floor.groovy:118-120). */
const SENTENCE = 'The air is thick with oily static and the hum of abyssal substrate.';

/** A Layer of a building's substrate: child `floors + k − 1` is Layer −k (Building.groovy:252-261); one child, its Artery. */
export class LayerFactory implements LocationFactory<Layer, Building> {
  readonly #artery: Progeny;

  constructor(world: FactoryLookup) {
    this.#artery = new Progeny(world, undefined, () => world.factoryFor(ARTERY_KIND));
  }

  kind(): LocationKind {
    return LAYER_KIND;
  }

  create(origin: Origin<Building>): Layer {
    return new Layer(origin, { number: origin.parent.floors() - 1 - origin.index, sentence: SENTENCE });
  }

  populate(parent: Layer): readonly Location[] {
    return this.#artery.exactly(parent, 1);
  }
}
